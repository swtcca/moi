import { ref } from 'vue'

const loaded = ref(false)
const tries = ref(0)
const message = ref('')
const url = ref("https://unpkg.com/@swtc/rpc@1.1.3/dist/swtc-rpc.js")


export function useSwtc(lib_url = "https://unpkg.com/@swtc/rpc@1.1.3/dist/swtc-rpc.js", manual: true) {
  const { load: load_lib } = useScriptTag(url.value, () => {}, {manual})
  async function load() {
    if (!loaded.value) {
      console.log(`... swtc loading`)
      try {
        await load_lib()
        console.log(`... swtc loaded`)
        loaded.value = true
      } catch (e) {
        console.log(`... swtc failed to load`)
        console.log(e)
        message.value = `... swtc failed to load ${e}`
        loaded.value = false
        tries.value += 1
      }
    } else {
      console.log(`... swtc loaded already`)
    }
  }

  return {url, loaded, load, message, tries}
}