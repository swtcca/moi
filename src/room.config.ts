import { ref } from "vue"
import gun_config from "./gun.config.json"

const config = JSON.parse(JSON.stringify(gun_config))
delete config.features
const features = ref({})

Object.keys(gun_config.features).forEach(feature => {
  features.value[feature] = {name: gun_config.features[feature], enabled: /dict|projects|gifts|apps/.test(feature) ? false : true}
})

config.features = features
// config.features.apps = {name: "Apps", enabled: false}

export { config, features }
