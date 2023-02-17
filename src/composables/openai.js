import { ref, watch } from "vue"
import { Configuration, OpenAIApi } from "openai"
export const apiKey = ref("")
export const model_completion = ref('text-davinci-002')
export const max_tokens = ref(512)
export const size_image = ref("512x512")

let configuration = new Configuration({
  apiKey: apiKey.value
})
let openai = new OpenAIApi(configuration)

export const openai_create_completion = async (prompt, options = {}) => {
  const completions = await openai.createCompletion(
    Object.assign(
      { prompt },
      {model: model_completion.value, max_tokens: max_tokens.value},
      options
    )
  )
  return completions
}
export const openai_create_image = async (prompt, options = {}) => {
    const images = await openai.createImage(
      Object.assign(
        { prompt },
        {n: 1, size: size_image.value},
        options
      )
    )
    return images
}

watch(apiKey, () => {
  configuration = new Configuration({apiKey: apiKey.value})
  openai = new OpenAIApi(configuration)
})