var socket = io.connect(window.location.protocol+'//'+document.domain+':'+location.port+'/kiosk',{});
playertotals = {}
totals = {}
questions = [];
function setupQuestions(){
	question1 = {
		title: "\"Can't Stop the Feeling\" comes on at a dance. What do you do?",
		data: {
			quiz1: "Pride",
			quiz2: "Vanity",
			quiz3: "Prejudice",
			quiz4: "Ignorance",
			text1: "Just stand there because you hate this song.",
			text2: "Look around to see what everyone else is doing.",
			text3: "Get mad at the DJ and start booing.",
			text4: "Mosh like there's no tomorrow."
		}
	}
	questions.push(question1);
}
question = 0;
questionnumber = 0;
function createChart(position, total, number, title){
	var ctx = document.getElementById("chart"+position.toString());
var data = {
    datasets: [
        {
            data: [number,total-number],
            backgroundColor: [
                "#673ab7",
                "#bdbdbd"
            ],
            hoverBackgroundColor: [
                "#673ab7",
                "#bdbdbd"
            ]
        }]
};
var options = {
	tooltips: {
		enabled:false
	},
	title:{
		display:true,
		text:title
	},
	animation:{
		duration:0
	}
}
var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options:options
});
}

socket.on("error",function(){
	document.getElementById("header").style.display = "none";
	document.getElementById("loading").style.display = "none";
	document.getElementById("already").style.display = "block";

});
socket.on("connect",function(){
	document.getElementById("header").style.display = "block";
	document.getElementById("already").style.display = "none";
	document.getElementById("loading").style.display = "none";
});
socket.on("disconnect",function(){
	document.getElementById("header").style.display = "none";
	document.getElementById("already").style.display = "none";
	document.getElementById("loading").style.display = "block";
});
socket.on("update",function(data){
	questionnumber++;
	if(!totals.hasOwnProperty(data[1])){
		totals[data[1]] = 0;
	}
	totals[data[1]]++;
	if(!playertotals.hasOwnProperty(data[1])){
		playertotals[data[1]] = {};
	}
	if(!playertotals[data[1]].hasOwnProperty(data[0])){
		playertotals[data[1]][data[0]] = 0;
	}
	playertotals[data[1]][data[0]]++;
	updateGraphs();
});
function updateGraphs(){
	var i = 0;
	for (var key in totals) {
  	if (totals.hasOwnProperty(key)) {
    	createChart(i, questionnumber, totals[key], key);
    	i++;
  	}
	}
}
function action(){
	if(question == questions.length){
		finish();
	}
	else if(question == questions.length -1){
		document.getElementById("headertext").innerHTML = questions[question]["title"];
		document.getElementById("button").innerHTML = "view results";
		socket.emit("next",questions[question]["data"]);
		question++;
	}
	else{
		document.getElementById("headertext").innerHTML = questions[question]["title"];
		document.getElementById("button").innerHTML = "next";
		socket.emit("next",questions[question]["data"]);
		question++;
	}
}
function finish(){

}
function reform(){
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET",window.location.protocol+'//'+document.domain+':'+location.port+'/reform/',true);
	xhttp.send();
	location.reload();
}
setupQuestions();