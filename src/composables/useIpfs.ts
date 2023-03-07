import { ref } from 'vue'

const loaded = ref(false)

const { load } = useScriptTag(
  "https://cdn.jsdelivr.net/npm/ipfs/dist/index.min.js",
  () => {},
  { manual: true },
)

export function useIpfs() {
  return {loaded, load}
}