const express = require("express");
const path = require('path');
const next = require("next");
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./api/routes/routes');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();


var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};

app.prepare().then(() => {
  const server = express();
  server.use(cors(corsOption));
  // server.set('views', path.join(__dirname, 'views'));
  // server.set('view engine', 'jade');


  server.use(logger('dev'));
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(cookieParser());
  // server.use(express.static(path.join(__dirname, 'public')));

  server.use('/api/', routes);


  server.get("/", (req, res) => {
    return app.render(req, res, "/", req.query);
  });

  server.get("/about", (req, res) => {
    return app.render(req, res, "/about", req.query);
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});











// view engine setup

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// module.exports = app;
