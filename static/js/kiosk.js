var socket = io.connect(window.location.protocol+'//'+document.domain+':'+location.port+'/kiosk',{});
socket.on("error",function(){
	document.getElementById("loading").style.display = "none";
	document.getElementById("already").style.display = "block";

});
socket.on("connect",function(){
	document.getElementById("already").style.display = "none";
	document.getElementById("loading").style.display = "none";
});
socket.on("disconnect",function(){
	document.getElementById("already").style.display = "none";
	document.getElementById("loading").style.display = "block";
});
socket.on("update",function(data){
	console.log("hi");
});
function reform(){
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET",window.location.protocol+'//'+document.domain+':'+location.port+'/reform/',true);
	xhttp.send();
	location.reload();
}