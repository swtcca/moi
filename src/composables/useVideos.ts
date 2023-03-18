// import { computed, reactive, ref } from "vue";
import { useGun, useUser, currentRoom } from '../gun-vue/composables'
import { globalState } from '../stores/globalState'
import type { IVideo } from '../types'
import { IChannel } from '../types'
import { prefers, videos } from '../stores'
const NOW = useNow({interval: 1000 * 60 * 60 * 24})
const gun = useGun()
const { user } = useUser()
const pvideos = reactive({})
const gvideos = reactive({})
const tvideos = reactive({})
const gchannels = ref({})
const pref = gun.get('bcapps').get('moi').get('youtube').get('published')
const vref = gun.get('bcapps').get('moi').get('youtube').get('videos')

const cref = gun.get('moi').get('videos').get('youtube').get('channels')
const tref = gun.get('moi').get('videos').get('youtube').get(`${NOW.value.toJSON().substring(0, 7)}`)
// .get("by_video_id")
// structure tests
// /channels
// /channels/channel
// /channels/channel/videos/video
let listening = false

watch(gchannels, (value, old_value) => {
  console.log(`watched channels change ${Object.keys(value).length}`)
})
watch(tvideos, (value, old_value) => {
  // console.log(`watched test videos change ${Object.keys(value).length}`)
  Object.values(value).forEach((gvideo: IVideo) => {
    // if (gvideo.videoPublishedAt > `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}`) {
      // only count the last two months
      const video = { ...gvideo }
      if (gchannels.value.hasOwnProperty(gvideo.channelId)) {
        video.channel = gchannels.value[gvideo.channelId]
        videos.add(video) // direct store operation
      }
    // }
  })
})
// watch(pvideos, (value, old_value) => {
//   console.log(`watched videos change ${Object.keys(value).length}`)
//   Object.values(value).forEach((gvideo: IVideo) => {
//     if (gvideo.videoPublishedAt > `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, "0")}`) {
//       // only count the last two months
//       const video = { ...gvideo }
//       if (gchannels.hasOwnProperty(gvideo.channelId)) {
//         video.channel = gchannels[gvideo.channelId]
//         videos.add(video) // direct store operation
//       }
//     }
//   })
// })

export function initChannels() {
  console.log('init channels')
  cref.map().once((d, k) => {
    if (d && d._) {
      delete d._
      if (gchannels.value.hasOwnProperty(k)) {
        gchannels.value[k] = d
      } else {
        console.log(`channel ${d.name}`)
        gchannels.value[k] = d
      }
    }
  })
  setTimeout(() => prefers.channels_playlists.forEach(async (c) => {
    if (!gchannels.value[c.id])
      await put_channel({ id: c.id, name: c.name, title: c.title })
  }), 1000)
  return { gchannels, cref, tvideos, tref }
}

export function initVideos() {
  tref.map().once((d, k) => {
    if (d && d._) {
      delete d._
      if (tvideos.hasOwnProperty(k)) {
        Object.assign(tvideos[k], d)
      }
      else {
        if (d.videoId && d.videoPublishedAt) {
          tvideos[k] = d
        }
        else {
          console.log(`incomplete video ${k}`)
          console.log(d)
        }
      }
    }
  })
}

export function useVideos() {
  if (!listening) {
    listening = true
    tref.map().on((d, k) => {
      if (d && d._) {
        delete d._
        if (tvideos.hasOwnProperty(k)) {
          Object.assign(tvideos[k], d)
        } else {
          if (d.videoId && d.videoPublishedAt) {
            tvideos[k] = d
          } else {
            console.log(`${k} not video or incomplete ${d.videoId}`)
            console.log(d)
          }
        }
      }
    }, true) // delta value
    // })
    cref.map().on((d, k) => {
      if (d && d._) {
        delete d._
        if (gchannels.value.hasOwnProperty(k)) {
          gchannels.value[k] = d
        }
        else {
          console.log(`channel ${d.name}`)
          gchannels.value[k] = d
        }
      }
    }, true) // delta value
    // })
  }
}

export async function put_channel(pchannel) {
  if (!gchannels.value[pchannel.id]) {
    if (pchannel.id && pchannel.name && pchannel.title) {
      const channel = { id: pchannel.id, name: pchannel.name, title: pchannel.title }
      const node = await cref.get(channel.id).then()
      if (!node) {
        gchannels.value[channel.id] = channel
        // cref.get(channel.id).put(channel, null, {opt: {cert: globalState.cert}})
        cref.get(channel.id).put(channel)
        globalState.debug && console.log(`... put channel ${channel.id}`)
      }
    }
  }
}

export async function put_video(video_object) {
  if (gvideos[video_object.videoId] && gvideos[video_object.videoId].videoId)
    return
  if (video_object.videoId && video_object.videoPublishedAt && video_object.channel) {
    const video: IVideo = {
      videoId: video_object.videoId,
      videoPublishedAt: video_object.videoPublishedAt,
      channelId: video_object.channel.id,
    }
    if (video_object.ipfs)
      video.ipfs = video_object.ipfs
    if (!gchannels.value.hasOwnProperty(video.channelId))
      await put_channel(video_object.channel)

    const node = await vref.get(video.videoId).then()
    if (!node) { // video is already in gun, check if needs update
      // vref.get(video.videoId).put(video, null, {opt: {cert: globalState.cert}})
      vref.get(video.videoId).put(video)
    }
    else if (!node.videoId) {
      console.log(video)
      vref.get(video.videoId).put(video)
    }
    else {}
    gvideos[video.videoId] = video
  }
}

export async function put_video_published(video_object) {
  if (pvideos[video_object.videoPublishedAt] && pvideos[video_object.videoPublishedAt].videoPublishedAt)
    return
  if (video_object.videoId && video_object.videoPublishedAt && video_object.channel) {
    const video: IVideo = {
      videoId: video_object.videoId,
      videoPublishedAt: video_object.videoPublishedAt,
      channelId: video_object.channel.id,
    }
    if (video_object.ipfs)
      video.ipfs = video_object.ipfs
    if (!gchannels.value.hasOwnProperty(video.channelId))
      await put_channel(video_object.channel)

    const node = await pref.get(video.videoPublishedAt).then()
    if (!node) {
      // pref.get(video.videoId).put(video, null, {opt: {cert: globalState.cert}})
      pref.get(video.videoPublishedAt).put(video)
    }
    else if (!node.videoId && video.videoPublishedAt) {
      console.log(video)
      pref.get(video.videoPublished).put(video)
    }
    else {}
    pvideos[video.videoPublishedAt] = video
  }
}

export async function put_video_test(video_object) {
  // let cert
  // if (!currentRoom.hosts.hasOwnProperty(user.pub)) {
  //   console.log(`allow only room host to update videos`)
  //   return
  // } else {
  //   cert = currentRoom.hosts[user.pub].profile
  //   console.log(cert)
  // }
  // personalized video services
  // const cert = currentRoom.features.apps
  // if (!cert) {
  //   console.log(`need room certificate to write`)
  //   return
  // }
  if (tvideos[video_object.videoId] && tvideos[video_object.videoId].videoId)
    return
  if (video_object.videoId && video_object.videoPublishedAt && video_object.channel) {
    const video: IVideo = {
      videoId: video_object.videoId,
      videoPublishedAt: video_object.videoPublishedAt,
      channelId: video_object.channel.id,
    }
    if (video_object.ipfs) {
      video.ipfs = video_object.ipfs
    }
    if (!gchannels.value.hasOwnProperty(video.channelId)) {
      await put_channel(video_object.channel)
    }

    const node = await tref.get(video.videoId).then()
    console.log(video)
    tvideos[video.videoId] = video
    if (!node) {
      tref.get(video.videoId).put(video)
      // tref.get(video.videoId).put(video, undefined, {opt: {cert}})
    } else if (!node.videoId && video.videoId) {
      console.log(video)
      tref.get(video.videoId).put(video)
    } else {}
  }
}
