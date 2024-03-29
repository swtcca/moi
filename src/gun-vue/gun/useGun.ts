/**
 * Gun DB initialization and basic methods
 * @module Gun
 * @group Database
 */


import type { GunOptions, IGunInstance } from 'gun'

import Gun from "gun/gun";
import "gun/lib/then";
import "gun/lib/radix";
import "gun/lib/radisk";
import "gun/lib/store";
import "gun/lib/rindexed";
import "gun/lib/open";
import "gun/lib/load";
import "gun/lib/webrtc";

import GunWorker from './useGunWorker'

GunWorker.post('Welcome to Gun-Vue')


import { relay } from './useRelay'


// https://github.com/amark/gun/wiki/volunteer.dht
// https://github.com/draeder/gun-relays

/** The main Gun instance for database operations */
let gun: IGunInstance;

/**
 * Instantiate a Gun instance for DB manipulations
 * @example
 * import { useGun } from '@gun-vue/composables'
 * const gun = useGun()
 */

export function useGun(options: GunOptions = { localStorage: false }): IGunInstance {

  if (!gun) {
    const opts = { peers: [relay.peer] }
    if (typeof options === 'object') {
      Object.assign(opts, options)
    }
    console.log(opts.peers)
    gun = Gun(opts);
  }
  return gun;
}

export function useGunPath(...args: string[]) {
  const gun = useGun()
  let g
  for (let arg of args) {
    g = gun.get(arg)
  }
  return g || gun
}

export function useGunMap(...args: string[]) {

}

/**
 * get a secondary Gun instance for certificate management
 */

export function useGunSecondary(options: object = { localStorage: false }): IGunInstance {

  const gun2 = Gun({ peers: [relay.peer], ...options });

  return gun2;
}

/**
 * SEA library
 * @constant SEA
 */
export { default as SEA } from "gun/sea.js";

/**
 * **Get a soul for any given node**
 * A wrapper for `Gun.node.soul`
 * @function soul
 */

// @ts-ignore: Incorrect GUN types
export const soul = Gun?.node?.soul;

/**
 * **Generate a random UUID**
 * A wrapper for `Gun.text.random`
 * @function genUUID
 */

// @ts-ignore: Incorrect Gun types
export const genUUID: (num?: number) => string = Gun?.text?.random;


