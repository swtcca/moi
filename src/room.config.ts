import { ref } from "vue"
import gun_config from "./gun.config.json"

const config = JSON.parse(JSON.stringify(gun_config))
delete config.features
const features = ref({} as any)

Object.keys(gun_config.features).forEach(feature => {
  features.value[feature] = {name: gun_config.features[feature], enabled: /projects|gifts|apps/.test(feature) ? false : true}
})

// features.value.users = {name: "Users", enabled: true}
config.features = features

export { config, features }
