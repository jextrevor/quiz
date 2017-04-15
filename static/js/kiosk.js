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
		title: "What's your favorite part about school?",
		data: {
			quiz1: "Dishonesty",
			quiz2: "Awkwardness",
			quiz3: "Pride",
			quiz4: "Vanity",
			text1: "I don't have a favorite part.",
			text2: "Super Smash Bros Club!",
			text3: "Who cares about school?",
			text4: "Lunch and people of the opposite gender."
		}
	}
	question6 = {
		title: "You're putting together songs for a dance, and the other DJ disagrees with your choices. What do you do?",
		data: {
			quiz1: "Prejudice",
			quiz2: "Ignorance",
			quiz3: "Tackiness",
			quiz4: "Acceptance",
			text1: "Gossip about him behind his back.",
			text2: "Don't do anything about it.",
			text3: "Pick dumb songs just to annoy him.",
			text4: "Let him do the songs that he wants."
		}
	}
	question7 = {
		title: "It's Sunday night and you remember that you probably have online homework. What do you do?",
		data: {
			quiz1: "Acceptance",
			quiz2: "Dishonesty",
			quiz3: "Ignorance",
			quiz4: "Pride",
			text1: "Admit defeat and stay up to finish it.",
			text2: "Do it late and tell your teacher that there was an error in the system.",
			text3: "Pretend like it doesn't exist.",
			text4: "Don't do it at all, because such homework is below you."
		}
	}
	question8 = {
		title: "You're going to a Halloween party. What do you wear?",
		data: {
			quiz1: "Prejudice",
			quiz2: "Tackiness",
			quiz3: "Vanity",
			quiz4: "Awkwardness",
			text1: "Wear something reasonable, and criticize everyone else's choice of costume.",
			text2: "Just wear your sports uniform because it's easy.",
			text3: "Wear your normal nice clothes just to look better than everyone else.",
			text4: "Put on your best suspenders and nerd glasses."
		}
	}
	questions.push(question1);
	questions.push(question2);
	questions.push(question3);
	questions.push(question4);
	questions.push(question5);
	questions.push(question6);
	questions.push(question7);
	questions.push(question8);
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
	document.getElementById("header").style.display = "none";
	var i = 1;
	for(var key in playertotals){
		if(playertotals.hasOwnProperty(key)){
			doStatistics(i,playertotals[key],key);
			i++;
		}
	}
	document.getElementById("info").style.display = "block";
}
function doStatistics(position,json,title){
	document.getElementById("title"+position.toString()).innerHTML = title;
	high = 0;
	low = 10000;
	for(var key in json){
		if(json.hasOwnProperty(key)){
			if(json[key] > high){
				high = json[key];
			}
			if(json[key] < low){
				low = json[key];
			}
		}
	}
	highplay = "";
	lowplay = "";
	for(var key in json){
		if(json.hasOwnProperty(key)){
			if(json[key] == high){
				if(highplay == ""){
					highplay = key;
				}
				else{
					highplay += ", ";
					highplay += key;
				}
			}
			if(json[key] == low){
				if(lowplay == ""){
					lowplay = key;
				}
				else{
					lowplay += ", ";
					lowplay += key;
				}
			}
		}
	}
	document.getElementById("content"+position.toString()).innerHTML = "Most: "+highplay+"<br />Least: "+lowplay;
}
function reform(){
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET",window.location.protocol+'//'+document.domain+':'+location.port+'/reform/',true);
	xhttp.send();
	location.reload();
}
setupQuestions();