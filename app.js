var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.set('view engine', 'ejs');

const fs = require('fs');

global.selectObject = {};


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var date = new Date();
var day = date.getDate();
day = ("000" + day).slice(-2);
var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
var month = months[date.getMonth()];
var year = date.getFullYear().toString().slice(-2);



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
		supappButton: req.body.supappButton,
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
		supapp: req.body.supapp,
		logged: req.body.logged,
		personal_health: req.body.personal_health,
		long_days: req.body.long_days,
		family_stress: req.body.family_stress,
		combined_sleep: req.body.combined_sleep,
		work: req.body.work,
		awake: req.body.awake,
		pressure:req.body.pressure,
		last_sleep: req.body.last_sleep,
		sleepQual: req.body.sleepQual,
		supappButton: req.body.supappButton,

		});

		MongoClient.connect(url, function(err, db) {
			if (err) throw err;
			var dbo = db.db("ormInputs");
			if (global.selectObject != null){
				var newID = req.body.cs + req.body.to + day + month + year;
				if (global.selectObject.cs + global.selectObject.to + day + month + year == newID){
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





//Score.find((err, allScores) => console.log(allScores));
app.use('/86orm', (req, res) => {
		//variable declaration
	//////////////////
	var csfill;
	var selectObject;
	var today = new Date();
	today.setHours(0,0,0,0);

	var currentID = req.body.csdrop;
	if (currentID == undefined) {
		currentID = 'Callsign';
	}

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
			var todayScores = [];


			///////////////////////////
			//Determine CSFill/////////////
			////////////////////////
			for (archiveScore of allScores) {
			 if (archiveScore.dateTime >= today) {
				 console.log(archiveScore.dateTime);
				 console.log(today);
				 todayScores.push(archiveScore);
			 };
			};

			if (todayScores != undefined) {
				for (obj of todayScores) {
					csList_today.push(obj.cs + obj.to);
				   };

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


					console.log(currentID);
			  var dbo = db.db("ormInputs");
			  dbo.collection("ormscores").findOne({ _id: currentID }, function(err, result) {
				if (err) throw err;
					selectObject = result;
					global.selectObject = result;

				if (selectObject == null) {
					var ac = "";
					var cs = "";
					var to = "";
					var sortie = "";
					var cp = "0";
					var supapp = '';
					var acsig = "";
					var supsig = "";
					var sqsig = "";
					var ogsig = "";
					var night = 0;
					var plan = "";

				} else {
					var ac = selectObject.ac;
					var csIn = selectObject.cs;
					var to = selectObject.to;
					var sortie = selectObject.sortie;
					var cp = selectObject.cp;
					var supapp = selectObject.supapp;
					var acsig = selectObject.acsig;
					var supsig = selectObject.supsig;
					var sqsig = selectObject.sqsig;
					var ogsig = selectObject.ogsig;
					var night = selectObject.night;
					var plan = selectObject.plan;

				};
				db.close();
					res.render('testdropdown', {
						csfill: csfill,
						currentID: currentID,
						selectObject: selectObject,
						acfill: ac,
						csIn: csIn,
						to: to,
						sortie: sortie,
						cp: cp,
						supapp: supapp,
						acsig: acsig,
						supsig: supsig,
						sqsig: sqsig,
						ogsig: ogsig,
						night: night,
						plan: plan



					})
			  	});

				});

			})







			///////////////////////////////////////
		});

///SUP Historical Access /////////////////


app.use('/ormhistory', (req, res) => {
	//variable declaration
	var csfill;
	var selectObject;
	var currentID = req.body.csdrop;
	var csList = [];

	//if current ID is not selected
	if (currentID == undefined) {
		currentID = 'Callsign';
	}
	//mongo query
	function getDrop() {
		var scoreFinder = Score.find().exec();
		return scoreFinder;
	};

	var csfill = getDrop().then(function(allScores){
		for (score of allScores) {
			csList.push(score.cs + score.to);
		};

		if (csList.length == 0) {
			csfill = "<option>Callsign</option>";
		}
		else {
			var csOptions = "";
			for (score of allScores) {
				if (score._id == currentID) {
					csOptions += "<option value=\"" + score._id+ "\">" + score.cs + ", TO: "+ score.to + ", Date: " + score.date + "</option>";
				};
			};

			//get the currentID at top
			for (score of allScores) {
				if (score.id != currentID) {
					csOptions += "<option value=\"" + score._id+ "\">" + score.cs + ", TO: "+ score.to + ", Date: " + score.date + "</option>";
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

			if (selectObject == null) {
				var ac = "";
				var cs = "";
				var to = "";
				var sortie = "";
				var cp = "0";
				var supapp = '';
				var acsig = "";
				var supsig = "";
				var sqsig = "";
				var ogsig = "";
				var night = 0;
				var plan = "";
				var date = "";

			} else {
				var ac = selectObject.ac;
				var csIn = selectObject.cs;
				var to = selectObject.to;
				var sortie = selectObject.sortie;
				var cp = selectObject.cp;
				var supapp = selectObject.supapp;
				var acsig = selectObject.acsig;
				var supsig = selectObject.supsig;
				var sqsig = selectObject.sqsig;
				var ogsig = selectObject.ogsig;
				var night = selectObject.night;
				var plan = selectObject.plan;
				var date = selectObject.date;

			};
			db.close();
				res.render('supview', {
					csfill: csfill,
					currentID: currentID,
					selectObject: selectObject,
					acfill: ac,
					csIn: csIn,
					to: to,
					sortie: sortie,
					cp: cp,
					supapp: supapp,
					acsig: acsig,
					supsig: supsig,
					sqsig: sqsig,
					ogsig: ogsig,
					night: night,
					plan: plan,
					date: date
				})
			});
		});
	});

///////////////////////////////////////
////////end of supview/////////////////
///////////////////////////////////////
});



app.use('/public', express.static('public'));

app.use(express.static('public'))

app.use('/', (req, res) => { res.redirect('/public/index.html'); } );





app.listen(3000,  () => {
	console.log('Listening on port 3000');
    });
