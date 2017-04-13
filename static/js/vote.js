var socket = io.connect(window.location.protocol+'//'+document.domain+':'+location.port+'/vote',{});
quiz1 = "";
quiz2 = "";
quiz3 = "";
quiz4 = "";
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
	document.getElementById("tquiz1").classList.remove("scale-out");
	document.getElementById("tquiz2").classList.remove("scale-out");
	document.getElementById("tquiz3").classList.remove("scale-out");
	document.getElementById("tquiz4").classList.remove("scale-out");
	document.getElementById("quiz1").innerHTML = "";
	document.getElementById("quiz2").innerHTML = "";
	document.getElementById("quiz3").innerHTML = "";
	document.getElementById("quiz4").innerHTML = "";
	quiz1 = "";
	quiz2 = "";
	quiz3 = "";
	quiz4 = "";
	respond = false;
});
socket.on("kiosk",function(data){
	if(data == true){
		document.getElementById("loading").style.display = "none";
		document.getElementById("waiting").style.display = "none";
		setTimeout(function(){do{name = prompt("Enter your name:","");}while(name == null || name == "" );document.getElementById("quizzes").style.display = "block";},1);
	}
	else{
		document.getElementById("loading").style.display = "block";
		document.getElementById("quizzes").style.display = "none";
		document.getElementById("waiting").style.display = "none";
		document.getElementById("tquiz1").classList.remove("scale-out");
		document.getElementById("tquiz2").classList.remove("scale-out");
		document.getElementById("tquiz3").classList.remove("scale-out");
		document.getElementById("tquiz4").classList.remove("scale-out");
		document.getElementById("quiz1").innerHTML = "";
		document.getElementById("quiz2").innerHTML = "";
		document.getElementById("quiz3").innerHTML = "";
		document.getElementById("quiz4").innerHTML = "";
		quiz1 = "";
		quiz2 = "";
		quiz3 = "";
		quiz4 = "";
		document.getElementById("waiting").style.display = "block";
		document.getElementById("quizzes").style.display = "none";
	}
});
socket.on("next",function(data){
	document.getElementById("tquiz1").classList.remove("scale-out");
	document.getElementById("tquiz2").classList.remove("scale-out");
	document.getElementById("tquiz3").classList.remove("scale-out");
	document.getElementById("tquiz4").classList.remove("scale-out");
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
document.getElementById("tquiz2").classList.add("scale-out");
document.getElementById("tquiz3").classList.add("scale-out");
document.getElementById("tquiz4").classList.add("scale-out");
socket.emit("vote",[name,quiz1]);
}
}
function doquiz2(){
	if(respond){
document.getElementById("tquiz1").classList.add("scale-out");
document.getElementById("tquiz3").classList.add("scale-out");
document.getElementById("tquiz4").classList.add("scale-out");
socket.emit("vote",[name,quiz2]);
respond = false;
}
}
function doquiz3(){
	if(respond){
document.getElementById("tquiz2").classList.add("scale-out");
document.getElementById("tquiz1").classList.add("scale-out");
document.getElementById("tquiz4").classList.add("scale-out");
socket.emit("vote",[name,quiz3]);
respond = false;
}
}
function doquiz4(){
	if(respond){
document.getElementById("tquiz2").classList.add("scale-out");
document.getElementById("tquiz3").classList.add("scale-out");
document.getElementById("tquiz1").classList.add("scale-out");
socket.emit("vote",[name,quiz4]);
respond = false;
}
}