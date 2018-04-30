var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Station = require('./api/models/stationModel'),
  bodyParser = require('body-parser'),
  cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/radio').catch(reason => {
  console.error(reason);
  process.exit(1);
}); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var routes = require('./api/routes/stationRoutes');
routes(app);

app.listen(port);

console.log('Server started on: ' + port);
