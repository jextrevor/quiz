var socket = io.connect(window.location.protocol+'//'+document.domain+':'+location.port+'/vote',{});
socket.on("connect",function(){
	document.getElementById("loading").style.display = "none";
});
socket.on("disconnect",function(){
	document.getElementById("loading").style.display = "block";
});
socket.on("kiosk",function(){
	document.getElementById("";)
});