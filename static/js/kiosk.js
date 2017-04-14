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
	question2 = {
		title: "You're hosting a party. How do you obtain food?",
		data: {
			quiz1: "Tackiness",
			quiz2: "Awkwardness",
			quiz3: "Dishonesty",
			quiz4: "Acceptance",
			text1: "Ask everyone to bring food, but provide none yourself.",
			text2: "Get McDonalds.",
			text3: "Have your friend make a cheesecake, and tell people you made it yourself.",
			text4: "Let your mom make her less-than-delicious boiled potatoes."
		}
	}
	question3 = {
		title: "A friend asks you for money because he left his wallet at home. What do you do?",
		data: {
			quiz1: "Prejudice",
			quiz2: "Acceptance",
			quiz3: "Pride",
			quiz4: "Tackiness",
			text1: "Don't give him anything.",
			text2: "Give him however much he wants.",
			text3: "Give him some, but make him pay it back with a high rate of interest.",
			text4: "Give him 1 dollar less than he needs."
		}
	}
	question4 = {
		title: "You find yourself third-wheeling with your friend and the person he/she likes. What do you do?",
		data: {
			quiz1: "Awkwardness",
			quiz2: "Dishonesty",
			quiz3: "Vanity",
			quiz4: "Ignorance",
			text1: "Nudge your friend conspicuously.",
			text2: "Make less-than-true statements about your friend to discredit him/her.",
			text3: "Drown out their conversation by talking about yourself.",
			text4: "Talk normally with your friend as if it were just you two."
		}
	}
	question5 = {
		title: "You're on a first date. What do you talk about?",
		data: {
			quiz1: "Vanity",
			quiz2: "Ignorance",
			quiz3: "Acceptance",
			quiz4: "",
			text1: "Yourself",
			text2: ""
		}
	}
	questions.push(question1);
	questions.push(question2);
	questions.push(question3);
	questions.push(question4);
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