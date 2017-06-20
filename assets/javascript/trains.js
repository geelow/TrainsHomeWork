/*
  * Code this app to calculate when the next train will 
  arrive; this should be relative to the current time.
  * Users from many different machines must be able to view same train times.
  * Styling and theme are completely up to you. Get Creative!
*/

var config = {
    apiKey: "AIzaSyA-14er7aI0Tn_q-ifNAYk9Dq07BK61b_g",
    /*authDomain: "train-schedules-e1556.firebaseapp.com",(causing issues with Authentication)*/
    databaseURL: "https://train-schedules-e1556.firebaseio.com",
    projectId: "train-schedules-e1556",
    storageBucket: "train-schedules-e1556.appspot.com",
    messagingSenderId: "282493438411"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

$("#run-submit").on("click", function(event) {
	event.preventDefault();

	var trainName = $("#train-name").val().trim();
	var destination = $("#destination").val().trim();
	var arrivalTime = moment($("#arrival-time").val().trim(), "HH:mm").subtract(1, "years").format("X");
	var trainFrequency = $("#train-frequency").val().trim();

var newTrain = {
	name: trainName,
	destination: destination,
	arrive: arrivalTime,
	frequency: trainFrequency
	};

database.ref().push(newTrain);


$("#train-name").val("");
$("#destination").val("");
$("#arrival-time").val("");
$("#train-frequency").val("");

return false;

})  

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().destination;
	var arrivalTime = childSnapshot.val().arrive;
	var trainFrequency = childSnapshot.val().frequency;

	var diffTimes = moment().diff(moment.unix(arrivalTime), "minutes");
	var remainder = moment().diff(moment.unix(arrivalTime), "minutes") % trainFrequency ;
	var arrival = moment().add(minutes, "m").format("hh:mm A"); 
    var minutes = moment().get('hour') - remainder;


 $("#trains-table> tbody").prepend("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  "every " + trainFrequency + " min" + "</td><td>" + arrival + "</td><td>" + minutes + " away" + "</td>");
}, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
});	

	