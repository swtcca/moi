import platform from 'platform-detect'
import pkg from "../../package.json"
const { load: load_swtc } = useScriptTag(
  "https://unpkg.com/@swtc/rpc@1.1.3/dist/swtc-rpc.js",
  () => {},
  { manual: true },
)
const { load: load_ipfs } = useScriptTag(
  "https://cdn.jsdelivr.net/npm/ipfs/dist/index.min.js",
  () => {},
  { manual: true },
)
const { load: load_videostream } = useScriptTag(
  "/videostream.js",
  () => {},
  { manual: true },
)

export const globalState = reactive({
  version: pkg.version,
  debug: true,
  platform,
  layout_classes: "mt-0",
  show_top: false,
  // gunPeer: "https://etogun.glitch.me/gun",
  gunPeer: "https://relay.129.153.59.37.nip.io/gun",
  show_tools: false,
  show_social: false,
  loaded_ipfs: false,
  loaded_swtc: false,
  loaded_videostream: false,
  VIDEOKEYS: {
    channelKeys: [
      "id",
      "name",
      "title",
    ],
    channelKeysRequired: [
      "id",
    ],
    videoKeys: [
      "videoId",
      "videoPublishedAt",
      "channelId",
      // "channel",
    ],
    videoKeysRequired: [
      "videoId",
      "videoPublishedAt"
    ],
  },
  node: null,
  ipfs: {
    support: computed(() => globalState.platform.desktop || globalState.platform.laptop),
    tries: 0
  },
  ipfs_supported: computed(() => globalState.ipfs.support || globalState.ipfs.tries < 3),
  ipfs_online: computed(() => globalState.ipfs_supported && globalState.node && globalState.node.isOnline()),
  async ipfs_create() {
    if (globalState.ipfs_supported && !globalState.ipfs_online) {
       globalThis.node = await globalThis.Ipfs.create({repo: `ipfs-${Math.floor(Math.random() * 10000000)}`})
       globalState.node = globalThis.node
    }
  },
  async videostream_load() {
    if (!globalState.loaded_videostream) {
      console.log(`videostream loading`)
      try {
        await load_videostream()
        globalState.loaded_videostream = true
      } catch (e) {
        console.log(e)
        globalState.loaded_videostream = false
      }
    }
  },
  async ipfs_load() {
    await globalState.videostream_load()
    if (globalState.ipfs.support && !globalState.loaded_ipfs) {
      console.log(`ipfs loading`)
      try {
        globalState.ipfs.tries += 1
        await load_ipfs()
        globalState.loaded_ipfs = true
        await globalState.ipfs_create()
      } catch (e) {
        console.log(e)
        globalState.loaded_ipfs = false
      }
    }
  },
  async swtc_load() {
    if (!globalState.loaded_swtc) {
      globalState.loaded_swtc = true
      console.log(`swtc loading`)
      try {
        await load_swtc()
      } catch (e) {
        console.log(e)
        globalState.loaded_swtc = false
      }
    }
  }
})
// export const ipfs_supported = computed(() => globalState.ipfs.support || globalState.ipfs.tries < 3 )
globalThis.globalState = globalState
