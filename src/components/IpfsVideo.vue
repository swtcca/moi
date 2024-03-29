<script setup lang="ts">
import 'plyr/dist/plyr.css'
import type { IVideo } from "../types"
interface IVideoProp {
  video?: IVideo
}
import { globalState } from '../stores/globalState'
import { getRandomElement } from "../api/utils"
import Plyr from 'plyr'
import toStream from 'it-to-stream'
import {
  statusMessages,
  createVideoElement,
  log
} from '../services/videoStreamUtils'
import { playing, playingInList, playlist, featured, prefers, FEATURED } from "../stores"
const props = withDefaults(
  defineProps<IVideoProp>(), {
    video: getRandomElement(FEATURED),
  }
)

let stream, stream2, videoElement, mpxStream, plyrPlayer=ref(null)
const playingVideo = ref(props.video)

watch(playlist.playlist, async (value) => {
  console.log(`watched playlist change of #${value.length} items`)
  if (!playingInList.playing.hasOwnProperty("videoId") && playlist.playlist.length === 1) {
    playingInList.playing = playlist.playlist[0]
  }
})
watch(playingInList, async (value, old_value) => {
  console.log(`watched playingInList change`)
  console.log(value.playing)
  console.log(old_value.playing)
  if (playingInList.playing.hasOwnProperty("ipfs")) {
    playingVideo.value = JSON.parse(JSON.stringify(playingInList.playing))
  } else {
    console.log(`... no .ipfs property`)
  }
})
watch(playing, (value) => {
  console.log(`watched playing change`)
  console.log(value.playing)
  if (playing.playing.hasOwnProperty("ipfs")) {
    if (playing.playing.ipfs !== playingVideo.value.ipfs) {
      console.log(`setting playing.playing for hi priority`)
      plyrPlayer.value?.stop()
      plyrPlayer.value?.destroy()
      playingVideo.value = JSON.parse(JSON.stringify(playing.playing))
    }
  }
})

onMounted(async () => {
  if (prefers.youtubeAccess) {
    if (globalState.ipfs_online) {
      globalState.node.stop()
    }
  } else {
    // plyrPlayer.value = new Plyr('#player', {enabled: true, key: 'plyr', resetOnEnd: true})
    await globalState.ipfs_load()
    await globalState.ipfs_create()
    watch(playingVideo, videoIpfs)
    playingVideo.value = featured.playing || getRandomElement(globalState.FEATURED)
  }
})
async function videoIpfs () {
  console.log(`catched props.video change ${playingVideo.value.ipfs}`)
  try {
    plyrPlayer.value?.stop()
  } catch (e) {}
  try { 
    plyrPlayer.value?.destroy()
  } catch (e) {
    console.log(e)
  }
  videoElement = createVideoElement()
  if (!playingVideo.value.ipfs) {
    console.log(`ipfs no support`)
    return
  }
  if (!globalState.ipfs_supported) {
    console.log(`ipfs not supported`)
    return
  }
  // if (mpxStream && mpxStream.destroy) mpxStream.destroy()
  plyrPlayer.value = new Plyr('#player', {enabled: true, key: 'plyr'})
  globalThis.plyr = plyrPlayer.value
  plyrPlayer.value.once("ready", () => console.log(`plyr event ..... ready`))
  plyrPlayer.value.on("ratechange", () => console.log(`plyr event ..... ratechange`))
  plyrPlayer.value.once("ended", () => {
    console.log(`plyr event ..... ended`)
    const index = playlist.playlist.findIndex(v => v.videoId === playingVideo.value.videoId)
    if (index !== -1) {
      playlist.playlist.splice(index, 1)
    }
    if (playlist.playlist.length > 0) {
      playingVideo.value = JSON.parse(JSON.stringify(getRandomElement(playlist.playlist)))
    }
  })
  plyrPlayer.value.on("canplay", (event) => {
    console.log(`plyr event ..... canplay`)
    const instance = event.detail.plyr
    instance.speed = prefers.playbackRate
    instance.play()
  })
  if (!globalState.ipfs_online) {
    await globalThis.node.start()
  }
  mpxStream = new globalThis.videostream({
    createReadStream: function createReadStream (opts) {
      const start = opts.start
      const end = opts.end ? start + opts.end + 1 : undefined
      log(`Stream: Asked for data starting at byte ${start} and ending at byte ${end}`)
      stream2 = stream
      if (stream2 && stream2.destroy) {
        try { stream2.destroy() } catch (e) {}
      }
      stream = toStream.readable(globalThis.node.cat(to_ipfs_cid(playingVideo.value), {
        offset: start,
        length: end && end - start
      }))
      stream.on('error', console.log)
      if (start === 0) {
        statusMessages(stream, log)
      }
      return stream
    }
  }, videoElement)
}
function to_ipfs_cid(video: IVideo) {
  if (!video.ipfs) {
    console.log(`not ipfs compatible, need .ipfs property`)
  } else {
    return video.ipfs
  }
}
</script>

<template lang="pug">
.aspect-video(v-if="prefers.youtubeAccess" id="player")
  iframe.w-full.aspect-video.shadow-2xl.overflow-hidden(
    loading="lazy",
    :src="`https://youtube.com/embed/${video?.videoId}`",
    title="IPFS video player",
    frameborder="0",
    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    allowfullscreen
    )
.aspect-video(v-else)
  video.w-full.aspect-video(
    id="player"
    controls
    allowfullscren
    )
</template>