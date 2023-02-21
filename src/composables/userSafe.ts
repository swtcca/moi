import { SEA } from "../gun-vue/gun/useGun"
import { useUser } from "../gun-vue/user/useUser"
const { user } = useUser()

export const user_safe_initial = {
  saved: false,
  password: '',
  enc: '',
  pass: '',
  moiapp: {},
  wallets: {jingtum: {chain: "jingtum"}, moac: {chain: "moac"}, ethereum: {chain: "ethereum"}},
  rooms: {}
}

export const save_user_safe = async (value, key: any[], options={encrypt: false}) => {
    if (user.initiated) {
      let encrypted = value.value || value
      try {
        if (options.encrypt) {
          encrypted = await SEA.encrypt(encrypted, user.pair())
        }
      } catch (e) {}
      key.push(encrypted)
      encrypted = key.reduceRight((x,y) => ({[y]: x}))
      // console.log(encrypted)
      user.db.get('safe').put(encrypted)
    }
  }
export const read_user_safe = async (key: string[], options={encrypt: false}) => {
    let decrypted
    if (user.initiated) {
      decrypted = user.safe
      key.forEach(keyname => {
        if (decrypted.hasOwnProperty(keyname)) {
          decrypted = decrypted[keyname]
        } else {
          decrypted = undefined
        }
      })
      if (decrypted){
        try {
          if (options.encrypt) {
            decrypted = await SEA.decrypt(decrypted, user.pair().epriv)
          }
        } catch (e) {}
      }
    }
    // console.log(decrypted)
    return decrypted
  }