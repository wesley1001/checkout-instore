import path from 'path';
import express from 'express';
import webpack from 'webpack';
import httpProxy from 'http-proxy';
import config from './webpack.config';

const app = express();
const compiler = webpack(config);
const proxy = new httpProxy.createProxyServer();

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/checkout/instore', (req, res) => {
  res.sendFile(path.join(__dirname, './src/index.html'));
});

if (config.proxy) {
  let paths = Object.keys(config.proxy);
  paths.forEach(function (somePath) {
    console.log(somePath);
    let proxyOptions;
    if (typeof config.proxy[somePath] === 'string') {
      proxyOptions = {target: config.proxy[somePath], ws: true};
    } else {
      proxyOptions = config.proxy[somePath];
    }
    app.all(somePath, (req, res) => {
      proxy.web(req, res, proxyOptions);

      proxy.on('error', (error, req, res) => {
        res.end();
      });
    });
  });
}

app.listen(3000, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
