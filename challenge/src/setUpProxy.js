const { createProxyMiddleware } = require("http-proxy-middleware");

// the proxy middleware used to solve the CORS errors i was getting when making API requests
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api1", {
      target: "http://localhost:3001", // API endpoint 1
      changeOrigin: true,
      pathRewrite: {
        "^/api1": "",
      },
      headers: {
        Connection: "keep-alive",
      },
    })
  );
  app.use(
    createProxyMiddleware("/api2", {
      target: "http://localhost:3002", // API endpoint 2
      changeOrigin: true,
      pathRewrite: {
        "^/api2": "",
      },
      headers: {
        Connection: "keep-alive",
      },
    })
  );
};
