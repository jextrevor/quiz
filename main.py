from flask import Flask, render_template
from flask_socketio import SocketIO, emit
#import eventlet
#from gevent import monkey
#monkey.patch_all()
#eventlet.monkey_patch()
app = Flask(__name__)
socketio = SocketIO(app)
#voting = {}
readyy = False
@socketio.on('vote', namespace="/vote")
def voter(json):
#	for key,value in json.items():
#		if key not in voting:
#			voting[key] = []
#		voting[key].append(value)
	emit('update', json, namespace="/kiosk")
@socketio.on('connect', namespace='/vote')
def connectw():
	emit('kiosk', readyy)
@socketio.on('connect', namespace="/kiosk")
def connectd():
	if readyy == False:
		readyy = True
	#if ready == False:
	#	ready = True
	#	emit('kiosk', ready, namespace="/vote")
	#	print "Connected"
	#else:
	#	print "Fail Connect"
	#	return False
	#pass
@socketio.on('disconnect', namespace="/kiosk")
def disconnect():
	print "Disconnected"
	ready = False
	emit('kiosk', readyy, namespace="/vote")
@app.route("/vote/")
def vote():
	templateData = {}
	return render_template("vote.html",**templateData)
@app.route("/kiosk/")
def kiosk():
	templateData = {}
	return render_template("kiosk.html",**templateData)
if __name__ == '__main__':
    socketio.run(app, "0.0.0.0", 3000)
