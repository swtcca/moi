import { reactive, watch } from "vue"
import { read_user_safe, save_user_safe } from "../composables/userSafe"

export const tokens = reactive({
  youtube: "",
  openai: "",
  github: ""
})

watch(tokens, (value, old_value) => {
  console.log(`tokens changed`)
  Object.keys(value).forEach(token => {
    if (value[token] !== old_value[token])
      console.log(`${token} = ${old_value[token]} -> ${value[token]}`)
  })
})

export const get_tokens = async () => {
  Object.keys(tokens).forEach(name => {
    read_user_safe(["moiapp", "tokens", name], {encrypt: true}).then(token => {
      if (token) { tokens[name] = token}
    })
  })
}

export const save_tokens = async () => {
  Object.keys(tokens).forEach(name => {
    save_user_safe(tokens[name], ["moiapp", "tokens", name], {encrypt: true}).then(() => console.log(`token ${name} saved`))
  })
}