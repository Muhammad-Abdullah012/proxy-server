const http = require("http");
const https = require("https");
const url = require("url");

const proxyServer = http.createServer((clientReq, clientRes) => {
  if (clientReq.method === "OPTIONS") {
    clientRes.writeHead(204, {
      "Access-Control-Allow-Origin": "*", // Allow all origins
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", // Allowed methods
      "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allowed headers
    });
    clientRes.end();
    return;
  }
  console.log(`Proxying request: ${clientReq.method} ${clientReq.url}`);
  const parsedUrl = url.parse(clientReq.url);
  const queryParams = new URLSearchParams(parsedUrl.query);
  const targetServer = queryParams.get("url");

  if (!targetServer) {
    clientRes.writeHead(400, { "Content-Type": "text/plain" });
    clientRes.end("Target server URL is required.");
    return;
  }

  try {
    const targetUrl = new URL(targetServer);
    const isHttps = targetUrl.protocol === "https:";

    const options = {
      hostname: targetUrl.hostname,
      port: targetUrl.port || (isHttps ? 443 : 80),
      path: targetUrl.pathname + (targetUrl.search || ""),
      method: clientReq.method,
      headers: {
        ...clientReq.headers,
        host: targetUrl.hostname,
      },
    };

    // Use https.request for HTTPS and http.request for HTTP
    const proxyModule = isHttps ? https : http;

    const proxyReq = proxyModule.request(options, (targetRes) => {
      clientRes.writeHead(targetRes.statusCode, {
        ...targetRes.headers,
        "Access-Control-Allow-Origin": "*",
      });
      targetRes.pipe(clientRes, { end: true });
    });

    proxyReq.on("error", (err) => {
      console.error(`Error while proxying request: ${err.message}`);
      clientRes.writeHead(500, { "Content-Type": "text/plain" });
      clientRes.end("Proxy server error.");
    });

    clientReq.pipe(proxyReq, { end: true });
  } catch (err) {
    console.error(`Invalid target server URL: ${err.message}`);
    clientRes.writeHead(400, { "Content-Type": "text/plain" });
    clientRes.end("Invalid target server URL.");
  }
});

// Start the proxy server on a specific port
const PORT = process.env.PORT || 4000; // Change this to your desired port
if (!PORT) {
  console.log("Please provide a port number");
  process.exit(1);
}
proxyServer.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
