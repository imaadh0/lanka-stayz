"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealTargets = [
  ".intro > .eyebrow",
  ".intro > h2",
  ".intro > div",
  ".section-heading",
  ".stay-card",
  ".story-photo",
  ".story-copy",
  ".closing",
  ".detail-section",
  ".booking-panel",
  ".about-grid > *",
  ".contact-grid > section",
  ".footer-top > div",
].join(",");

/** Progressive motion: content remains visible when animation is unavailable. */
export function SiteMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const seen = new WeakSet<Element>();
    let intersection: IntersectionObserver | undefined;
    let mutations: MutationObserver | undefined;

    function stop() {
      intersection?.disconnect();
      mutations?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    }
    function animate(
      element: Element,
      keyframes: Keyframe[],
      options: KeyframeAnimationOptions,
    ) {
      if (element.contains(document.activeElement)) return;
      const animation = element.animate(keyframes, options);
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    }
    function start() {
      if (
        preference.matches ||
        !Element.prototype.animate ||
        !window.IntersectionObserver
      )
        return;
      const main = document.getElementById("main");
      if (!main) return;
      animate(main, [{ opacity: 0.65 }, { opacity: 1 }], {
        duration: 280,
        easing: "ease-out",
      });
      intersection = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            intersection?.unobserve(entry.target);
            const siblings = entry.target.parentElement?.querySelectorAll(
              ":scope > .stay-card",
            );
            const index = siblings
              ? Array.from(siblings).indexOf(entry.target)
              : 0;
            animate(
              entry.target,
              [
                { opacity: 0, transform: "translate3d(0, 22px, 0)" },
                { opacity: 1, transform: "translate3d(0, 0, 0)" },
              ],
              {
                duration: 680,
                delay: Math.max(0, index % 3) * 65,
                easing: "cubic-bezier(.2,.7,.2,1)",
                fill: "backwards",
              },
            );
          }
        },
        { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
      );
      function observe(root: ParentNode) {
        const candidates = Array.from(root.querySelectorAll(revealTargets));
        if (root instanceof Element && root.matches(revealTargets))
          candidates.unshift(root);
        for (const element of candidates) {
          if (seen.has(element)) continue;
          seen.add(element);
          intersection?.observe(element);
        }
      }
      observe(document);
      mutations = new MutationObserver((records) => {
        for (const record of records)
          for (const node of record.addedNodes) {
            if (node instanceof Element) observe(node);
          }
      });
      mutations.observe(main, { childList: true, subtree: true });
    }
    const onPreferenceChange = () => {
      stop();
      if (!preference.matches) start();
    };
    start();
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      stop();
      preference.removeEventListener("change", onPreferenceChange);
    };
  }, [pathname]);
  return null;
}
