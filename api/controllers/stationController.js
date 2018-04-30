'use strict';

var mongoose = require('mongoose'),
  Station = mongoose.model('Station'),
  cp = require('child_process');

var mplayerProcess = null;
var selectedStation = null;

function stop() {
  if (mplayerProcess)
    mplayerProcess.kill();
  mplayerProcess = null;
  selectedStation = null;
}

function isPlaying() {
  return !!mplayerProcess;
}

function play(url) {
  stop();
  mplayerProcess = cp.spawn("mplayer", [url]);
  console.log('pid', mplayerProcess.pid);
  /*mplayerProcess.on('close', (code, signal) => {
    console.log(mplayerProcess.pid, 'close', code, signal);
  });
  mplayerProcess.on('disconnect', () => {
    console.log(mplayerProcess.pid, 'disconnect')
  });
  mplayerProcess.on('error', (err) => {
    console.log(mplayerProcess.pid, 'error', err);
  });
  mplayerProcess.on('exit', (code, signal) => {
    console.log(mplayerProcess.pid, 'exit', code, signal);
  });
  mplayerProcess.on('message', (message) => {
    console.log(mplayerProcess.pid, 'message', message);
  })*/
  mplayerProcess.stdout.on('data', (chunk) => {});
  mplayerProcess.stderr.on('data', (chunk) => {});
}

exports.list_all = function (req, res) {
  Station.find({}, function (err, station) {
    if (err)
      res.send(err);
    res.json(station);
  });
};

exports.create = function (req, res) {
  var new_station = new Station(req.body);
  new_station.save(function (err, station) {
    if (err)
      res.status(400).send(err);
    res.json(station);
  });
};


exports.read = function (req, res) {
  Station.findById(req.params.stationId, function (err, station) {
    if (err)
      res.status(400).send(err);
    res.json(station);
  });
};

exports.play = function (req, res) {
  Station.findById(req.params.stationId, function (err, station) {
    if (err)
      res.status(400).send(err);

    play(station.url);
    selectedStation = station;
    res.status(200).send();
  });
}

exports.stop = function (req, res) {
  Station.findById(req.params.stationId, function (err, station) {
    stop();
    res.status(200).send();
  });
}

exports.status = function (req, res) {
  Station.findById(req.params.stationId, function (err, station) {
    res.json({ isPlaying: isPlaying(), selectedStation: selectedStation });
  });
}

exports.update = function (req, res) {
  Station.findOneAndUpdate({ _id: req.params.stationId }, req.body, { new: true }, function (err, station) {
    if (err)
      res.status(400).send(err);
    res.json(station);
  });
};

exports.delete = function (req, res) {
  Station.remove({
    _id: req.params.stationId
  }, function (err, result) {
    if (err)
      res.status(400).send(err);
    res.json(result);
  });
};
