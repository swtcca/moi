import { ref } from 'vue'
import { sleep } from '../api/utils'

const loaded = ref(false)
const loading = ref(false)
const tries = ref(0)
const message = ref('')
const url = ref("https://unpkg.com/@swtc/rpc@1.1.3/dist/swtc-rpc.js")


export function useSwtc(lib_url = url.value, manual: true) {
  const { load: load_lib } = useScriptTag(url.value, () => {}, {manual})
  async function load() {
    if (!loaded.value && !loading.value) {
      loading.value = true
      try {
        await load_lib()
        console.log(`... swtc loaded`)
        loaded.value = true
        loading.value = false
      } catch (e) {
        console.log(`... swtc failed to load`)
        console.log(e)
        loading.value = false
        loaded.value = false
        message.value = `... swtc failed to load ${e}`
        tries.value += 1
      }
    } else {
      while (!loaded.value && loading.value) {
        console.log(`... waiting swtc lib`)
        await sleep(500)
      }
    }
  }

  return {url, loaded, load, message, tries}
}