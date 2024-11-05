import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());

app.use(
  '/fred/series',
  createProxyMiddleware({
    target: 'https://api.stlouisfed.org/fred/series',
    pathRewrite: { '^/fred/series': '' },
    changeOrigin: true,
  })
);

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
