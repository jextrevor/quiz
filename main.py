from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit
import eventlet
from gevent import monkey
monkey.patch_all()
eventlet.monkey_patch()
app = Flask(__name__)
socketio = SocketIO(app, async_mode="eventlet")
#voting = {}
ready = False
@socketio.on('next', namespace="/kiosk")
def next(json):
	socketio.emit('next', json, namespace="/vote")
@socketio.on('vote', namespace="/vote")
def voter(json):
#	for key,value in json.items():
#		if key not in voting:
#			voting[key] = []
#		voting[key].append(value)
	socketio.emit('update', json, namespace="/kiosk")
@socketio.on('connect', namespace='/vote')
def connectw():
	emit('kiosk', ready)
@socketio.on('connect', namespace="/kiosk")
def connectd():
	global ready
	if ready == False:
		ready = True
		socketio.emit('kiosk', ready, namespace="/vote")
		print "Connected"
	else:
		print "Fail Connect"
		return False
@socketio.on('disconnect', namespace="/kiosk")
def disconnect():
	global ready
	print "Disconnected"
	ready = False
	socketio.emit('kiosk', ready, namespace="/vote")
@app.route("/reform/")
def reform():
	global ready
	print "Reform"
	ready = False
	socketio.emit('kiosk', ready, namespace="/vote")
	return ""
@app.route("/vote/")
def vote():
	templateData = {}
	return render_template("vote.html",**templateData)
@app.route("/kiosk/")
def kiosk():
	templateData = {}
	return render_template("kiosk.html",**templateData)
@app.after_request
def no_cache(response):
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'no-cache, no-store'
    response.headers['Pragma'] = 'no-cache'
    return response
if __name__ == '__main__':
    socketio.run(app, "0.0.0.0", 3000)
