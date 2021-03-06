const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const PORT = 1337;
const AddToCart = 'http://13.52.238.216:3000';
const Review = 'http://3.233.240.212:1128';
const Images = 'http://3.135.185.185:8080';

app.use(express.static('client/dist'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/addtocart', createProxyMiddleware({
  target: AddToCart,
  changeOrigin: true,
}));

app.use('/findOne', createProxyMiddleware({
  target: Review,
  changeOrigin: true,
}));

app.use('/images', createProxyMiddleware({
  target: Images,
  changeOrigin: true,
}));

app.listen(PORT, () => {
  console.log(`Starting Proxy at PORT: ${PORT}`);
});

// curl -H "Authorization: DevonPoston" localhost:1337/json_placeholder/posts/1
