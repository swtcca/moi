import gun_config from "./gun.config.json"

const config = JSON.parse(JSON.stringify(gun_config))

Object.keys(gun_config.features).forEach(feature => {
  config.features[feature] = {name: gun_config.features[feature], enabled: /dict|projects|gifts|apps/.test(feature) ? false : true}
})
// config.features.apps = {name: "Apps", enabled: false}

export { config }
