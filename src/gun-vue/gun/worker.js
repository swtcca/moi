console.log('Worker initiated')

// import { Gun, SEA } from "../../gun-es/dist/gun-es.js";
import Gun from 'gun';
import "gun/lib/then";
import "gun/lib/radix";
import "gun/lib/radisk";
import "gun/lib/rindexed";
import "gun/lib/webrtc";

const window = {
  crypto: self.crypto,
  TextEncoder: self.TextEncoder,
  TextDecoder: self.TextDecoder,
  WebSocket: self.WebSocket,
  Gun,
}

import { default as SEA } from 'gun/sea.js';

onmessage = async m => {
  console.log('Worker question:', m.data)
  const gun = Gun()
  const pair = await SEA.pair()
  console.log(gun, pair)
  if (!gun?.user) {
    console.warn("Still can't enable `gun.user()` in a web worker context. Help needed! 👀")
  }
  gun.get('check').get('time').once(d => console.log(d))
  gun.get('check').get('time').put(Date.now())
  postMessage(`Worker answer: ${m.data} - OK`)
}

