var mongoose = require('mongoose');

//change this connection to whatever it needs to be later.
mongoose.connect('mongodb://localhost:27017/ormInputs');
//mongoose.connect('arn:aws:dynamodb:us-east-2:635892192309:table/ORMinputs')

var Schema = mongoose.Schema;


var scoreSchema = new Schema( {
  cs: String,
  date: Date,
  ac: String,
  to: Number,
  sortie: String,
  plan: String,
  form: Array,
  ll: Array,
  check: Array,
  mission: Array,
  cdd: Array,
  cfd: Array,
  mp: Array,
  wx: Array,
  temp: Array,
  winds: Array,
  rwy: Array,
  rd: Array,
  ts: Array,
  ents: Array,
  ice: Array,
  hs: Array,
  fatigue: Array,
  mountains: Array,
  birds: Array,
  turbs: Array,
  thermal: Array,
  cat: Array,
  issues: Array,
  ip_currency: Array,
  currency: Array,
  exp: Array,
  airspace: Array,
  climb: Array,
  flight_cond: Array,
  jump: Array,
  night: Number,
  cp: Number,
  acsig: String,
  supsig: String,
  sqsig: String,
  ogsig: String,
  supApp: String,
  logged: String
});

module.exports = mongoose.model('ormscore', scoreSchema);
