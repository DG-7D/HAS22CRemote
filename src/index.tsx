import { serve } from "bun";
import index from "./index.html";

const irServerAddress = "ir-server.local"

Bun.dns.prefetch(irServerAddress);
const server = serve({
  routes: {
    "/send/": (req: Bun.BunRequest) => {
      const url = new URL(req.url);
      return fetch(`http://${irServerAddress}/${url.search}`)
    },
    // Serve index.html for all unmatched routes.
    "/*": index,
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
