var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.set('view engine', 'ejs');

const fs = require('fs');

var csfill;
global.selectObject = {};


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var date = new Date();
var day = date.getDate();
day = ("000" + day).slice(-2);
var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
var month = months[date.getMonth()];
var year = date.getFullYear().toString().slice(-2);



var selectObject = {};
var newScore = {};
var currentID;

var Score = require('./score.js');

app.use('/create', (req, res) => {


	var newScore = new Score ({
		_id: req.body.cs + req.body.to + Date(),
		cs: req.body.cs,
		date: day + "/" + month + "/" + year,
		dateTime: new Date(),
		ac: req.body.ac,
		to: req.body.to,
		sortie: req.body.sortie,
		plan: req.body.plan,
		form: req.body.form,
		ll: req.body.ll,
		check: req.body.check,
		mission: req.body.mission,
		cdd: req.body.cdd,
		cfd: req.body.cfd,
		mp: req.body.mp,
		wx: req.body.wx,
		temp: req.body.temp,
		winds: req.body.winds,
		rwy: req.body.rwy,
		rd: req.body.rd,
		ts: req.body.ts,
		ents: req.body.ents,
		ice: req.body.ice,
		hs: req.body.hs,
		fatigue: req.body.fatigue,
		mountains: req.body.mountains,
		birds: req.body.birds,
		turbs: req.body.turbs,
		thermal: req.body.thermal,
		cat: req.body.cat,
		issues: req.body.issues,
		ip_currency: req.body.ip_currency,
		currency: req.body.currency,
		exp: req.body.exp,
		airspace: req.body.airspace,
		climb: req.body.climb,
		flight_cond: req.body.flight_cond,
		jump: req.body.jump,
		night: req.body.night,
		cp: req.body.cp,
		acsig: req.body.acsig,
		supsig: req.body.supsig,
		sqsig: req.body.sqsig,
		ogsig: req.body.ogsig,
		supApp: req.body.supApp,
		logged: req.body.logged

		});

		MongoClient.connect(url, function(err, db) {
			if (err) throw err;
			var dbo = db.db("ormInputs");
			if (global.selectObject != null){
				console.log(global.selectObject.cs + global.selectObject.to, "this is not global-SO");
				var newID = req.body.cs + req.body.to;
				console.log(newID);
				if (global.selectObject.cs + global.selectObject.to == newID){
				console.log("entered for removal")
				dbo.collection("ormscores").deleteOne({ _id: global.selectObject._id }, function(err, result) {
				if (err) throw err;
					db.close();
					})
				}
			}
				newScore.save((err) => {
					if (err) {
						res.type('html').status(500);
						res.send('Error: ' + err);
					}
					else {
						res.redirect('/86orm');
					}
				} );
		} );
} );

//////////////////////////////////////////////////////////////////
//////////////////////////Delete Function/////////////////////////
//////////////////////////////////////////////////////////////////


app.use('/delete', (req, res) => {
	console.log('Delete the document associated with this ID')
	var deleteID = req.body.deleteEntry;
	console.log(deleteID);

	MongoClient.connect(url, function(err, db) {
	if (err) throw err;
		var dbo = db.db("ormInputs");
		dbo.collection("ormscores").deleteOne({ _id: deleteID }, function(err, result) {
			if (err) throw err;
			db.close();
		})
	});
	res.redirect('/86orm');
});


	
//////////////////////////////////////////////////////////////////
//////////////////////This is the mongo query ////////////////////
/////////////////////////////////////////////////////////////////

var archiveScores;
var today = new Date();
today.setHours(0,0,0,0);




//Score.find((err, allScores) => console.log(allScores));
app.use('/86orm', (req, res) => {
		//variable declaration
	//////////////////
	var csfill;
	var selectObject;
	
	var currentID = req.body.csdrop;
	if (currentID == undefined) {
		currentID = 'Callsign';
	}
	console.log(currentID);

	
	/*
	= {
		_id: "",
		cs: "",
		date: "",
		ac: "",
		to: "",
		sortie: "",
		plan: "",
		form: [],
		ll: [],
		check: [],
		mission: [],
		cdd: [],
		cfd: [],
		mp: [],
		wx: [],
		temp: [],
		winds: [],
		rwy: [],
		rd: [],
		ts: [],
		ents: [],
		ice: [],
		hs: [],
		fatigue: [],
		mountains: [],
		birds: [],
		turbs: [],
		thermal: [],
		cat: [],
		issues: [],
		ip_currency: [],
		currency: [],
		exp: [],
		airspace: [],
		climb: [],
		flight_cond: [],
		jump: [],
		night: "",
		cp: "",
		acsig: "",
		supsig: "",
		sqsig: "",
		ogsig: "",
		supApp: "",
		logged: ""
	  };
	*/

	var todayScores = [];
	var csList_today = [];

		////////////////////////////

		//mongo query
		function getDrop() {
			///////work with scores

			var scoreFinder = Score.find().exec();
			return scoreFinder;
		};


		//mongo query



		var csfill = getDrop().then(function(allScores){



			///////////////////////////
			//Determine CSFill/////////////
			////////////////////////
			for (archiveScore of allScores) {
			 archiveScore.date = Date.parse(archiveScore.date);
			 if (archiveScore.date >= Date.parse(today)) {
				 todayScores.push(archiveScore);
			 };
			};
			for (obj of todayScores) {
			 csList_today.push(obj.cs + obj.to);
			};
			if (csList_today.length == 0){
			 csfill = "<option>Callsign</option>";
			}
			else {
				var csOptions = "";
				for (obj of todayScores) {
					if (obj._id == currentID) {
						csOptions += "<option value=\"" + obj._id+ "\">" + obj.cs + ", TO: "+ obj.to + "</option>";
					}
				};

				//get the currentID at top
				for (obj of todayScores) {
					if (obj.id != currentID) {
						csOptions += "<option value=\"" + obj._id+ "\">" + obj.cs + ", TO: "+ obj.to + "</option>";
					};
				};
				if (currentID != "Callsign"){ 
					csfill = csOptions + "<option>Callsign</option>";
				} else {
					csfill = "<option>Callsign</option>" + csOptions;
				};
				 
			};
			return csfill;
			})

			/////////////////////////////////////////
			//////this is where the fill in function should be
			///////////////////////////////////////

			.then(function(csfill) {
				MongoClient.connect(url,{useNewUrlParser:true}, function(err, db) {
			  if (err) throw err;
			  


			  var dbo = db.db("ormInputs");
			  dbo.collection("ormscores").findOne({ _id: currentID }, function(err, result) {
				if (err) throw err;
					selectObject = result;
					global.selectObject = result;
				db.close();
					res.render('testdropdown', {
						csfill: csfill,
						currentID: currentID,
						selectObject: selectObject
					})
			  	});

				});

			})
			






			///////////////////////////////////////
		});





app.use('/public', express.static('public'));

app.use('/', (req, res) => { res.redirect('/public/index.html'); } );

//pp.use('/', (req, res) => { res.redirect('/public/index.html'); } );

app.listen(3000,  () => {
	console.log('Listening on port 3000');
    });
