  //javascript file that will be imported to html


/////////////////////////////////////////
 //global variables
/////////////////////////////////////////

//var csList_today = [];
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
 personal_health: {}
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


function ormInfo(newInfo){

  var test = 0;
  test += acPrompt();
  if (test < 1) {
    test += csPrompt();
  } else {
    return;
  };
  if (test < 1) {
    test += toPrompt();
  } else {
    return;
  };
  if (test < 1) {
    test += sortiePrompt();
  } else {
    return;
  };
  if (test < 1) {
    planPrompt();

  } else {
    return;
  }
  };

function acPrompt() {
   ac = prompt('Enter the last name of the Aircraft Commander', 'AC Last Name');
   score.ac = ac;
   if (ac == null || ac == "") {
       return 1;
   };
   document.getElementById('ac').value = ac;
   return 0;
};

function csPrompt() {
 cs = prompt('Enter your callsign', 'Rake XX');
 score.cs = cs;
 if (cs == null || cs == "") {
     return 1;
 }
 document.getElementById('cs').value = cs
 var csval = document.getElementById('cs').value;
 return 0;
};

function toPrompt(){
 do{
   var valid = false;
   to = prompt('Enter your takeoff time in Local time', '0000');
   score.to = to;
   if (to == null || to == "") {
    return 1;
   };
   if (to.length == 4 && isNaN(to) == false && to != "    ") {
       valid = true;
   };

 }
 while (valid == false);

 var toInt = parseInt(to);
 var earlyShow = false;
 if (toInt < 801) {
     document.getElementById('cdd3').checked = true;
     let early = document.querySelector("#cdd3");
     highlight(early);
 }
 document.getElementById('to').value = to
 var toval = document.getElementById('to').value;
 return 0;
};


function sortiePrompt(){
 sortie = prompt('Enter Sortie Identifier', 'T5005');
 score.sortie = sortie;
 if (sortie == null || sortie == "") {
  return 1;
 }
 document.getElementById('sortie').value = sortie
 var sortieval = document.getElementById('sortie').value;
 return 0;
};

function planPrompt(){
 plan = prompt('Enter Sortie Itinerary', 'KDLF-KSJT');
 score.plan = plan;
 if (plan == null || plan == "") {
     plan = "Update sortie itinerary";
 }
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

//highlight function to be used to store scores and highlight parent element boxes
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
 alert("Your submission has been recorded");
 

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


//Press Enter in INPUT moves cursor to next INPUT
//ac, cs, to, sortie, plan, supapp
////////////////////////////////////////////
//////////////////////////////////////////////
////////////////////////////////////////////

function stopTags(e) {
  if (e.which == 60 || e.which == 62) {

    alert("< or > keys prohibited");
    e.preventDefault();
  }
}



//move from ac to cs
document.getElementById('ac').onkeypress = (function(e) {
  if (e.which == 13) {
    document.getElementById('cs').focus();
    return false;
  };

  stopTags(e);

});

//move from cs to to
document.getElementById('cs').onkeypress = (function(e) {
  if (e.which == 13) {
    document.getElementById('to').focus();
    return false;
  }

  stopTags(e);
});

//move from to to sortie

document.getElementById('to').onkeypress = (function(e) {
  if (e.which == 13) {
    document.getElementById('sortie').focus();
    return false;
  }

  if (isNaN(e.key)) {

    alert("Takeoff time must be a number");
    e.preventDefault();
  }

  stopTags(e);


});

//move from sortie to plan
document.getElementById('sortie').onkeypress = (function(e) {
  if (e.which == 13) {
    document.getElementById('plan').focus();
    return false;
  }

  stopTags(e);
});

//move from plan to sup app

document.getElementById('plan').onkeypress = (function(e) {
  if (e.which == 13) {
    document.getElementById('supapp').focus();
    return false;
  }

  stopTags(e);
});

document.getElementById('supapp').onkeypress = (function(e) {
  if (e.which == 13) {
    document.getElementById('supapp').focus();
    return false;
  }

  stopTags(e);
});


//prevent certain keys on the input boxes below

['supapp', 'acbox', 'supbox', 'sqbox', 'ogbox'].forEach(function(id) {
  document.getElementById(id).onkeypress = (function(e) {
    stopTags(e);
  });
});


//require password for sup signature
function supSign(el) {
    var pw = prompt('Please enter the Sup Password', '****')
    if (pw == "nacho"){
      var cell = document.getElementById('supappButton').parentElement;
      cell.style.background = "#90ee90";
      document.getElementById('supappButton').value = 1;
      alert(selectObject.cs.concat(" ,TO: ").concat(selectObject.to).concat(" has been stepped"));
    }
    else {
        var cell = document.getElementById('supappButton').parentElement;
        cell.style.background = "#ffcccb";
        document.getElementById('supapp').value = "";
        document.getElementById('supappButton').value = 3;

    }


}

function deleteAlert(val) {

  if (confirm('Are you sure you want to delete the entry associated with Callsign: '.concat(selectObject.cs).concat(", TO: ").concat(selectObject.to))) {
    document.getElementById('deleteForm').submit()

    // Delete it

  } else {
    //'<%=csIn%>'.concat('<%=to%>')
    val.preventDefault()
    return false;
  }

};


////////////////////////////////////////////
//////////////////////////////////////////////
////////////////////////////////////////////





////////////////////////////////////////////
//// run when opening the PAGE/////////////
//fumctions that will on initializing the page

clearCells();
