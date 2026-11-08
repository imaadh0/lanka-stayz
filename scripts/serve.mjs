import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
const root = path.resolve(process.env.SITE_DIRECTORY || "out");
const port = Number(process.env.PORT || 3000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};
http
  .createServer(async (req, res) => {
    try {
      const url = new URL(req.url, "http://localhost");
      const decoded = decodeURIComponent(url.pathname);
      let file = path.resolve(root, `.${decoded}`);
      if (file !== root && !file.startsWith(root + path.sep)) {
        res.writeHead(403);
        res.end();
        return;
      }
      if ((await fs.stat(file).catch(() => null))?.isDirectory())
        file = path.join(file, "index.html");
      let data = await fs.readFile(file).catch(() => null);
      // Compatibility for cached pages from the earlier .jpg asset paths.
      if (!data && decoded.startsWith("/images/") && file.endsWith(".jpg")) {
        const png = file.replace(/\.jpg$/, ".png");
        data = await fs.readFile(png).catch(() => null);
        if (data) file = png;
      }
      if (!data) {
        res.statusCode = 404;
        file = path.join(root, "404.html");
        data = await fs.readFile(file).catch(() => Buffer.from("Not found"));
      }
      res.setHeader(
        "Content-Type",
        types[path.extname(file)] || "application/octet-stream",
      );
      res.end(data);
    } catch {
      res.writeHead(400);
      res.end("Bad request");
    }
  })
  .listen(port, "127.0.0.1", () =>
    console.log(`Lanka Stayz: http://127.0.0.1:${port}`),
  );
