'use strict';
module.exports = function(app) {
  var stationList = require('../controllers/stationController');

  // todoList Routes
  app.route('/stations')
    .get(stationList.list_all)
    .post(stationList.create);


  app.route('/stations/:stationId')
    .get(stationList.read)
    .put(stationList.update)
    .delete(stationList.delete);

  app.route('/play/:stationId')
    .get(stationList.play);
  app.route('/status')
    .get(stationList.status);
  app.route('/stop')
    .get(stationList.stop);
};
