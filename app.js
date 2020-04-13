var express = require('express');
var app = express();

app.set('view engine', 'ejs');

const fs = require('fs');




var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


var Score = require('./score.js');




app.use('/create', (req, res) => {
	var newScore = new Score ({
		cs: req.body.cs,
		date: Date(),
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

		fs.appendFileSync("data.json", newScore);

	newScore.save( (err) => {
		if (err) {
		    res.type('html').status(500);
		    res.send('Error: ' + err);
		}
		else {
		    //res.redirect('/public/index.html');
				res.render('created', {
					score: newScore
				})
		}
	    } );

    });

//////////////////////////////////////////////////////////////////
//////////////////////This is the mongo query ////////////////////
/////////////////////////////////////////////////////////////////

var archiveScores;
var today = new Date();
today.setHours(0,0,0,0);
var csList_today = [];
var todayScore = [];
var csfill;



//Score.find((err, allScores) => console.log(allScores));
app.use('/test', (req, res) => {
	Score.find((err, allScores) => {

		//copied java Script
		////////////////////////
		for (archiveScore of allScores) {
		 archiveScore.date = Date.parse(archiveScore.date);

		 if (archiveScore.date >= Date.parse(today)) {
			 todayScore.push(archiveScore);
		 }
		};
		for (obj of todayScore) {
		 csList_today.push(obj.cs + obj.to);
		};

		if (csList_today.length == 0){
		 csfill = "<option>Callsign</option>";
		}
		else {
			 var csOptions = "";
			 for (obj of todayScore) {
				 csOptions += "<option>" + obj.cs + ", TO: "+ obj.to + "</option>";
			 };
			 csfill = "<option>Callsign</option>" + csOptions;
		};

		res.render('testdropdown', {
			csList_today: csList_today,
			csfill: csfill

	})
});
});


app.use('/archivetest', (req, res) => {
	Score.find((err, allScores) => {

		//copied java Script
		////////////////////////

		res.render('testdropdown', {
			allScores: allScores

	})
});
});





app.use('/public', express.static('public'));

app.use('/', (req, res) => { res.redirect('/public/index.html'); } );



app.listen(3000,  () => {
	console.log('Listening on port 3000');
    });
