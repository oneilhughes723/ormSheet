  //javascript file that will be imported to html

/////////////////////////////////////////
 //global variables
/////////////////////////////////////////

var csList = [];
var todayScore = [];
var archiveList = [];
var csList_today = [];
var cs;
var ac;
var to;
var sortie;
var plan;

//row ids that correspond to score object properties
var props_toScore = ['form', 'll', 'check', 'mission', 'cdd', 'cfd',
'mp', 'wx', 'temp', 'winds', 'rwy', 'rd', 'ts', 'ents', 'ice', 'hs',
'fatigue', 'mountains', 'birds', 'turbs', 'thermal', 'cat', 'issues',
'ip_currency', 'currency', 'exp', 'airspace', 'climb', 'flight_cond',
'jump'];

//object that will record score values for each row
var score ={
 cs: '',
 ac: '',
 to: '',
 sortie: '',
 plan: '',
 form: {},
 ll: {},
 check: {},
 mission: {},
 cdd: {},
 cfd: {},
 mp: {},
 wx: {},
 temp: {},
 winds: {},
 rwy: {},
 rd: {},
 ts: {},
 ents: {},
 ice: {},
 hs: {},
 fatigue: {},
 mountains: {},
 birds: {},
 turbs: {},
 thermal: {},
 cat: {},
 issues: {},
 ip_currency: {},
 currency: {},
 exp: {},
 airspace: {},
 climb: {},
 flight_cond: {},
 jump: {},
 acsig: '',
 supsig: '',
 sqsig: '',
 ogsig: '',
 supapp: '',
 logged: '',
 night: 0,
 cp: 0,
};

var date = new Date();
var day = date.getDate();
day = ("000" + day).slice(-2);
var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
var month = months[date.getMonth()];
var year = date.getFullYear().toString().slice(-2);
var dateOutput = day + " " + month + " " + year




///////////////////////////////////////////////////////////////////
//functions that will be called by events in html file
///////////////////////////////////////////////////////////////////


function ormInfo(){
  acPrompt();
  csPrompt();
  toPrompt();
  sortiePrompt();
  planPrompt();
};

function acPrompt() {
   ac = prompt('Enter the last name of the Aircraft Commander', 'AC Last Name');
   score.ac = ac;
   if (ac == null || ac == "") {
       exit;
   };
   displayAC = "AIRCRAFT COMMANDER:" + "  " + ac;
   document.getElementById('ac').innerHTML = displayAC;
   document.getElementById('ac').value = ac;
};

function csPrompt() {
 cs = prompt('Enter your callsign', 'Rake XX');
 score.cs = cs;
 if (cs == null || cs == "") {
     exit;
 }
 displayCS = "CALLSIGN:" + "  " + cs;
 document.getElementById('cs').innerHTML = displayCS;
 document.getElementById('cs').value = cs
 var csval = document.getElementById('cs').value;
};

function toPrompt(){
 do{
   var valid = false;
   to = prompt('Enter your takeoff time in Local time', '0000');
   score.to = to;
   if (to == null || to == "") {
       exit;
   };
   if (to.length == 4 && isNaN(to) == false && to != "    ") {
       valid = true;
   };

 }
 while (valid == false);

 var toInt = parseInt(to);
 var earlyShow = false;
 if (toInt < 801) {
     earlyShow = true;
 }
 displayTO = "TAKEOFF TIME/DATE:" + "  " + to;
 document.getElementById('to').innerHTML = displayTO + " " + month + " " + day + " " + year;
 document.getElementById('to').value = to
 var toval = document.getElementById('to').value;
};


function sortiePrompt(){
 sortie = prompt('Enter Sortie Identifier', 'T5005');
 score.sortie = sortie;
 if (sortie == null || sortie == "") {
     exit;
 }
 displaySortie = "SORTIE:" + "  " + sortie;
 document.getElementById('sortie').innerHTML = displaySortie;
 document.getElementById('sortie').value = sortie
 var sortieval = document.getElementById('sortie').value;
};

function planPrompt(){
 plan = prompt('Enter Sortie Itinerary', 'KDLF-KSJT');
 score.plan = plan;
 if (plan == null || plan == "") {
     plan = "Update sortie itinerary";
 }
 displayPlan = "ITINERARY:" + " " + plan;
 document.getElementById('plan').innerHTML = displayPlan;
 document.getElementById('plan').value = plan
 var planval = document.getElementById('plan').value;
};

//put the prompt variables into score object



////////////////////////////////////////////////////
//nonfunction code that will build necessary variables
////////////////////////////////////////////////////

//retrieve submitted key entries to display on dropdown
//todays time in milliseconds for comparison and generating a list of
//scores that can be used for today;

var today = new Date();
today.setHours(0,0,0,0);

//grab ALl keys from local storage
for (var i = 0; i < localStorage.length; i++) {
   csList.push(localStorage.key(i));
};

//grab all objects from local storage
for (cs of csList) {
 var testNull = localStorage.getItem(cs).includes('form');

 if (testNull == false){
   console.log('there was an unidentified null key, so it was not added to archiveList');
 } else {
   var scoreObject = JSON.parse(localStorage.getItem(cs));
   archiveList.push(scoreObject);
 }

};

//sort through those objects to only return those with dates that are current
//this is pushed to the todayScore variable
for (archiveScore of archiveList) {
 archiveScore.date = Date.parse(archiveScore.date);

 if (archiveScore.date >= Date.parse(today)) {
   todayScore.push(archiveScore);
 }
};



for (obj of todayScore) {
 csList_today.push(obj.cs + obj.to);
};

if (csList_today.length == 0){
 document.getElementById("csdrop").innerHTML = "<option>Callsign</option>";
}
else {
   var csOptions = "";
   for (obj of todayScore) {
     csOptions += "<option>" + obj.cs + ", TO: "+ obj.to + "</option>";
   };
   document.getElementById("csdrop").innerHTML = "<option>Callsign</option>" + csOptions;
};

//inspect todays score
console.log(todayScore);

var innerScore = {
 one: 0,
 two: 0,
 three: 0
};

var runningSum = 0;


////////////////////////////////////////////////////
//More functions
////////////////////////////////////////////////////

//highlight function to be used to store scores and hghlight parent element boxes
function highlight (el) {

 var parID = el.parentElement.parentElement.parentElement.id;


 if (el.value == 1) {
   if (el.checked == true){
     el.parentElement.parentElement.style.background = "#90ee90";
     el.parentElement.style.background = "#90ee90";
     score[parID].one = 1;
   }
   else {
     el.parentElement.parentElement.style.background = '';
     el.parentElement.style.background = '';
     score[parID].one = 0;
   }
 }


 if (el.value == 2) {
   if (el.checked == true){
     el.parentElement.parentElement.style.background = "#FFFF33";
     el.parentElement.style.background = "#FFFF33";
     score[parID].two = 2;


   }

   else {
     el.parentElement.parentElement.style.background = '';
     el.parentElement.style.background = '';
     score[parID].two = 0;
  }
  };

 if (el.value == 3) {
   if (el.checked == true){
     el.parentElement.parentElement.style.background = "#ffcccb";
     el.parentElement.style.background = "#ffcccb ";
     score[parID].three = 3;
   }
   else {
     el.parentElement.parentElement.style.background = '';
     el.parentElement.style.background = '';
     score[parID].three = 0;

   }
 }


};

//highlight function to be used to store scores and hghlight parent element boxes
function highlightCell (elID) {
 var cell = document.getElementById(elID).parentElement;
 var parentCell = cell.parentElement;
 var strLength = elID.length
 var checkVal = elID.substr(strLength -1, 1);

 if (checkVal == 1) {
   cell.style.background = "#90ee90";
   parentCell.style.background = "#90ee90";
 };

 if (checkVal == 2) {
   cell.style.background = "#FFFF33";
   parentCell.style.background = "#FFFF33";
  };

 if (checkVal == 3) {
   cell.style.background = "#ffcccb";
   parentCell.style.background = "#ffcccb";
   }
};


//For use when the user hits calculate
function Aggregate(score) {

var runningSum = 0;
console.log("begin aggregation");
console.log(score);


 for (prop of props_toScore) {
   if (Object.values(score[prop]).length != 0) {
     var maxVal = Math.max(...Object.values(score[prop]));
     runningSum += maxVal
   }


 };

 document.getElementById("total").innerHTML = runningSum;
 if (runningSum <= 13) {
   document.getElementById("total").style.background = "#90ee90";
   document.getElementById("low").style.background = "#90ee90";
   document.getElementById("mod").style.background = "";
   document.getElementById("high").style.background = "";
   document.getElementById("severe").style.background = "";
 } else if (runningSum <= 23){
   document.getElementById("total").style.background = "#FFFF33";
   document.getElementById("low").style.background = "#90ee90";
   document.getElementById("mod").style.background = "#FFFF33";
   document.getElementById("high").style.background = "";
   document.getElementById("severe").style.background = "";
 } else if (runningSum <= 32) {
   document.getElementById("total").style.background = "#fed8b1";
   document.getElementById("low").style.background = "#90ee90";
   document.getElementById("mod").style.background = "#FFFF33";
   document.getElementById("high").style.background = "#fed8b1";
   document.getElementById("severe").style.background = "";
 } else {
   document.getElementById("total").style.background = "#ffcccb";
   document.getElementById("low").style.background = "#90ee90";
   document.getElementById("mod").style.background = "#FFFF33";
   document.getElementById("high").style.background = "#fed8b1";
   document.getElementById("severe").style.background = "#ffcccb";
 };

};

//When the user hits the submit button
function Submit() {

 //only old entries will have a date value, so on resubmission, only an old entry will be deleted.
 if (score.date != null){
   console.log('did it go here?')
   var oldDate = new Date(score.date);
   var oldstrDate = oldDate.toString().substr(0,24);
   var oldKey = score.cs + oldstrDate;
   console.log(oldKey);
   localStorage.removeItem(oldKey);
   console.log(localStorage.removeItem(oldKey));
 };

//here is where the date value is added! ... my most creative solution if anyone ever reads this.
 score.date = new Date()
 var strDate = score.date.toString().substr(0,24);
 console.log("Following object has been added to the archive");
 console.log(score);
 localStorage.setItem(score.cs + strDate, JSON.stringify(score));
 alert("Your submission has been recorded");
}

//execute when the user hits the sign buttons
function signCard(el) {
 var sig = prompt('Enter your first and last name', 'John Doe');
 if (window.confirm("I understand that accepting to sign below with faulty/incorrect information is a violation of UCMJ Article 106: Impersonating an Officer")){
   id = el.parentElement.id;
   if (id == 'acsig'){
     var acsig = sig;
     document.getElementById(id).innerHTML = acsig;
     score.acsig = acsig;
     document.getElementById(id).value = acsig;
   }
   else if (id == 'supsig'){
     var supsig = sig;
     document.getElementById(id).innerHTML = supsig;
     score.supsig = supsig;
     document.getElementById(id).value = supsig;
   }
   else if (id == 'sqsig'){
     var sqsig = sig;
     document.getElementById(id).innerHTML = sqsig;
     score.sqsig = sqsig;
     document.getElementById(id).value = sqsig;
   }
   else if(id == 'ogsig'){
     var ogsig = sig;
     document.getElementById(id).innerHTML = ogsig;
     score.ogsig = ogsig;
     document.getElementById(id).value = score.ogsig;
   }
   else if(id == 'supApproval'){
     var supapp = sig;
     var pw = prompt('Please enter the Sup Password', '***')
     if (pw != "1qaz2wsx!QAZ@WSX"){
       exit;
     }
     document.getElementById(id).innerHTML = supapp;
     score.supapp = supapp;
     document.getElementById(id).value = score.supapp;
   }
   else if(id == 'logged'){
     var logged = sig;
     document.getElementById(id).innerHTML = logged;
     score.logged = logged;
     document.getElementById(id).value = score.loogged;
   }
     document.getElementById(id).style.fontFamily = 'cursive';
     document.getElementById(id).style.fontFamily = 'Brush Script MT, sans-serif';
     document.getElementById(id).style.fontSize = '32px';
   }
}

//function to refill data based on the callsign selected from the dropdown menu. Executed when user hits refill/reload

function clearCells(){
   for (prop of props_toScore) {
     var propList = [prop + "1", prop + "2", prop + "3"];

     for (val of propList){
       var clearcell = document.getElementById(val).parentElement;
       clearcell.style.background = "";
       clearcell.parentElement.style.background = "";
       document.getElementById(val).checked = false;
   };

 };
};

function refill(){

 //this segment will clear all background colors
 clearCells();

 //

 var arrInd;
 var callsign = document.getElementById('csdrop').value;

 for (var i = todayScore.length -1; i >= 0; i--){

   if (todayScore[i].cs + ", TO: " + todayScore[i].to === callsign){
     arrInd = i;
     }
   }
 console.log(todayScore[arrInd]);
 for (var prop of props_toScore){
   var val = Object.values(todayScore[arrInd][prop]);
   for (eachVal of val) {
     if (eachVal > 0){
       var elid = prop + eachVal;
       document.getElementById(elid).checked = true;
       highlightCell(elid);
     }
   }

   }

//also aggregate
 Aggregate(todayScore[arrInd]);

//reassign values to global variable score
 for (prop in todayScore[arrInd]) {
   score[prop] = todayScore[arrInd][prop]
 }


 document.getElementById('ac').innerHTML = "AIRCRAFT COMMANDER:   " + todayScore[arrInd].ac
 document.getElementById('cs').innerHTML = "CALLSIGN:   " + todayScore[arrInd].cs
 document.getElementById('to').innerHTML = "TO TIME/DATE:   " + todayScore[arrInd].to + " " + dateOutput
 document.getElementById('plan').innerHTML = "ITINERARY:    " + todayScore[arrInd].plan
 document.getElementById('sortie').innerHTML = "SORTIE:    " + todayScore[arrInd].sortie
 document.getElementById('acsig').innerHTML = todayScore[arrInd].acsig + "<button class='btn btn-primary' style='float:right; font-family: arial, sans-serif' onclick='signCard(this)'>Change Signature</button>"
 document.getElementById('acsig').style.fontFamily = 'cursive';
 document.getElementById('acsig').style.fontFamily = 'Brush Script MT, sans-serif';
 document.getElementById('acsig').style.fontSize = '32px';
 document.getElementById('supsig').innerHTML = todayScore[arrInd].supsig + "<button class='btn btn-primary' style='float:right; font-family: arial, sans-serif' onclick='signCard(this)'>Change Signature</button>"
 document.getElementById('supsig').style.fontFamily = 'cursive';
 document.getElementById('supsig').style.fontFamily = 'Brush Script MT, sans-serif';
 document.getElementById('supsig').style.fontSize = '32px';
 document.getElementById('sqsig').innerHTML = todayScore[arrInd].sqsig + "<button class='btn btn-primary' style='float:right; font-family: arial, sans-serif' onclick='signCard(this)'>Change Signature</button>";
 document.getElementById('sqsig').style.fontFamily = 'cursive';
 document.getElementById('sqsig').style.fontFamily = 'Brush Script MT, sans-serif';
 document.getElementById('sqsig').style.fontSize = '32px';
 document.getElementById('ogsig').innerHTML = todayScore[arrInd].ogsig + "<button class='btn btn-primary' style='float:right; font-family: arial, sans-serif' onclick='signCard(this)'>Change Signature</button>";
 document.getElementById('ogsig').style.fontFamily = 'cursive';
 document.getElementById('ogsig').style.fontFamily = 'Brush Script MT, sans-serif';
 document.getElementById('ogsig').style.fontSize = '32px';

 if(todayScore[arrInd].night == 1){
   document.getElementById('night').checked = true;
 }
 if(todayScore[arrInd].cp != 0){
   document.getElementById('cp').value = todayScore[arrInd].cp;
 }
}


//function to delete entry from storage
function deleteInfo(){
 var callsign = document.getElementById('csdrop').value;
 console.log(callsign);
 for (i = todayScore.length -1; i >= 0; i--){
   if (todayScore[i].cs + ", TO: " + todayScore[i].to === callsign){
     let storageKey = todayScore[i].cs + new Date(todayScore[i].date).toString().substr(0,24);
     localStorage.removeItem(storageKey);
     alert("The entry " + todayScore[i].cs + ", TO: " + todayScore[i].to + " has been deleted")



   };
 };


}

function nightcpLog(el){
 var elid = el.id;
 if (elid == 'night'){
   if (document.getElementById(elid).checked == true){
     score.night = 1;
   }
   else{
     score.night = 0;
   }
   document.getElementById(elid).value = score.night;
 }
 else if(elid == 'cp'){
   var cpval = document.getElementById(elid);
   score.cp = cpval.options[cpval.selectedIndex].value;
   document.getElementById(elid).value = score.cp;
 }
}
