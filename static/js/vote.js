var socket = io.connect(window.location.protocol+'//'+document.domain+':'+location.port+'/vote',{});
quiz1 = 0;
quiz2 = 0;
quiz3 = 0;
quiz4 = 0;
name = "";
respond = false;
socket.on("connect",function(){
	document.getElementById("loading").style.display = "none";
	document.getElementById("waiting").style.display = "block";
});
socket.on("disconnect",function(){
	document.getElementById("loading").style.display = "block";
	document.getElementById("quizzes").style.display = "none";
	document.getElementById("waiting").style.display = "none";
});
socket.on("kiosk",function(data){
	if(data == true){
		name = prompt("Enter your name:","");
		document.getElementById("waiting").style.display = "none";
		document.getElementById("quizzes").style.display = "block";
	}
	else{
		document.getElementById("waiting").style.display = "block";
		document.getElementById("quizzes").style.display = "none";
	}
});
socket.on("next",function(data){
	document.getElementById("tquiz1").style.opacity = "1";
	document.getElementById("tquiz2").style.opacity = "1";
	document.getElementById("tquiz3").style.opacity = "1";
	document.getElementById("tquiz4").style.opacity = "1";
	document.getElementById("quiz1").innerHTML = data.text1;
	document.getElementById("quiz2").innerHTML = data.text2;
	document.getElementById("quiz3").innerHTML = data.text3;
	document.getElementById("quiz4").innerHTML = data.text4;
	quiz1 = data.quiz1;
	quiz2 = data.quiz2;
	quiz3 = data.quiz3;
	quiz4 = data.quiz4;
	respond = true;
});
function doquiz1(){
	if(respond){
document.getElementById("tquiz2").style.opacity = "0.5";
document.getElementById("tquiz3").style.opacity = "0.5";
document.getElementById("tquiz4").style.opacity = "0.5";
socket.emit("vote",[name,quiz1]);
}
}
function doquiz2(){
	if(respond){
document.getElementById("tquiz1").style.opacity = "0.5";
document.getElementById("tquiz3").style.opacity = "0.5";
document.getElementById("tquiz4").style.opacity = "0.5";
socket.emit("vote",[name,quiz2]);
respond = false;
}
}
function doquiz3(){
	if(respond){
document.getElementById("tquiz2").style.opacity = "0.5";
document.getElementById("tquiz1").style.opacity = "0.5";
document.getElementById("tquiz4").style.opacity = "0.5";
socket.emit("vote",[name,quiz3]);
respond = false;
}
}
function doquiz4(){
	if(respond){
document.getElementById("tquiz2").style.opacity = "0.5";
document.getElementById("tquiz3").style.opacity = "0.5";
document.getElementById("tquiz1").style.opacity = "0.5";
socket.emit("vote",[name,quiz4]);
respond = false;
}
}