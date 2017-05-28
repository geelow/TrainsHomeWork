/* create a train schedule application that incorporates 
Firebase to host arrival and departure data. 
Your app will retrieve and manipulate this information 
with Moment.js. This website will provide up-to-date 
information about various trains, namely their arrival times
 and how many minutes remain until they arrive at their 
 station.

* Make sure that your app suits this basic spec:
  * When adding trains, administrators should be able to 
  submit the following:
    * Train Name
    * Destination 
    * First Train Time -- in military time
    * Frequency -- in minutes
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
	var arrivalTime = $("#arrival-time").val().trim();
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

})  

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().destination;
	var arrivalTime = childSnapshot.val().arrive;
	var trainFrequency = childSnapshot.val().frequency;

	var frqncy = moment(trainFrequency, "minutes");
	var arrivalTimeConverted = moment(arrivalTime, "hh:mm:ss a");
	var currentTime = moment();
	var diffTime = moment().diff(moment(arrivalTimeConverted), "minutes")
	var timeApart = diffTime % trainFrequency;

	var minutesToNextTrain = trainFrequency - timeApart;
	var nextTrain = moment().add(minutesToNextTrain, "minutes");



 $("#trains-table> tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  nextTrain + "</td><td>" + frqncy + "<tr><td>" + minutesToNextTrain);
}, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
});	



