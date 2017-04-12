var socket = io.connect(window.location.protocol+'//'+document.domain+':'+location.port+'/kiosk',{});
socket.on("error",function(){
	alert("someone is already connected");

});