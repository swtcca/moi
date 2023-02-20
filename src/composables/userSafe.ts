import { SEA } from "../gun-vue/gun/useGun"
import { useUser } from "../gun-vue/user/useUser"
const { user } = useUser()

export const save_user_safe = async (value, key: string[], options={encrypt: false}) => {
    if (user.initiated) {
      let encrypted = value.value || value
      try {
        if (options.encrypt) {
          encrypted = await SEA.encrypt(encrypted, user.pair())
        }
      } catch (e) {}
      user.db.get('safe').get(key.join("_")).put(encrypted)
    }
  }
export const read_user_safe = async (key: string[], options={encrypt: false}) => {
    let decrypted
    if (user.initiated) {
      if (user.safe.hasOwnProperty(key.join("_"))) {
        decrypted = user.safe[key.join("_")]
        try {
          if (options.encrypt) {
            decrypted = await SEA.decrypt(decrypted, user.pair().epriv)
          }
        } catch (e) {}
      }
    }
    return decrypted
  }