const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "ws",
    createProxyMiddleware({
      target: `${process.env.REACT_APP_SERVER_URL}`,
      ws: true,  // 웹소켓을 사용하겠다!
    })
  );
};