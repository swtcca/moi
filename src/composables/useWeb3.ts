import { ref } from 'vue'
import { sleep } from '../api/utils'

const loaded = ref(false)
const loading = ref(false)
const tries = ref(0)
const message = ref('')
const url = ref("https://unpkg.com/web3@latest/dist/web3.min.js")


export function useWeb3(lib_url = url.value, manual: true) {
  const { load: load_lib } = useScriptTag(url.value, () => {}, {manual})
  async function load() {
    if (!loaded.value && !loading.value) {
      loading.value = true
      try {
        await load_lib()
        console.log(`... web3 loaded`)
        loaded.value = true
        loading.value = false
      } catch (e) {
        console.log(`... web3 failed to load`)
        console.log(e)
        loading.value = false
        loaded.value = false
        message.value = `... web3 failed to load ${e}`
        tries.value += 1
      }
    } 
    while (!loaded.value && loading.value) {
      console.log(`... waiting web3 lib`)
      await sleep(200)
    }
  }

  return {url, loaded, load, message, tries}
}