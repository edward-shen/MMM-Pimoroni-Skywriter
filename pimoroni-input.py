#!/usr/bin/python

import skywriter
import signal
from websocket import create_connection
import time

time.sleep(15) # This is run at start, we'll need to delay ourselves to let everything init

ws = create_connection("ws://localhost:42001")

# jesus fuck example wtf is this
some_value = 5000

@skywriter.move()
def move(x, y, z):
  pass

@skywriter.flick()
def flick(start,finish):
    ws.send(start + ", " + finish)

@skywriter.airwheel()
def spinny(delta):
  global some_value
  some_value += delta
  if some_value < 0:
  	some_value = 0
  if some_value > 10000:
    some_value = 10000
  print('Airwheel:', some_value/100)

@skywriter.double_tap()
def doubletap(position):
  print('Double tap!', position)

@skywriter.tap()
def tap(position):
  print('Tap!', position)

@skywriter.touch()
def touch(position):
  print('Touch!', position)
  

print(ws.recv())
signal.pause()

def close_scokets():
    ws.close()

import atexit
atexit.register(close_sockets)
