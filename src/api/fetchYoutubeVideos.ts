import axios from 'axios'
import { IVideo, IChannel } from "../types"
import AsyncForEach from "async-await-foreach"
import { videos, prefers } from "../stores"
import { put_video_test, initChannels, initVideos, useVideos } from "../composables/useVideos"
import { read_user_safe, save_user_safe } from '../composables/userSafe'
const gapi = axios.create({ baseURL: 'https://youtube.googleapis.com/youtube/v3/' })
gapi.defaults.headers.common.Accept = 'application/json'
let inited = false

function makeParams(options = {}) {
  return {
    params: Object.assign({}, {
      part: 'snippet,contentDetails',
      maxResults: Math.min(50, prefers.maxResults),
      // maxResults: Math.min(2, prefers.maxResults),
    }, options),
  }
}

export async function fetchYoutubeVideos (channels: IChannel[] = []) {
  if (!inited) {
    initChannels()
    console.log('... init channels')
    initVideos()
    console.log('... init videos')
    useVideos()
    console.log('... use videos')
    inited = true
  }
  const youtubeKey = await read_user_safe(["moiapp", "tokens", "youtube"],{encrypt: true})
  if (!youtubeKey) {
    console.log(`... bypass fetching videos no api key`)
    return videos.videos
  }
  if (!prefers.youtubeAccess) {
    return videos.videos
  }
  setTimeout(async () => await AsyncForEach(channels.filter(channel => channel.id.length > 20), async (channel) => {
    console.log(`... handle channel playlist`)
    const is_channel = channel.id.startsWith('UC')
    let playlistId = channel.id
    const leagal = channel?.leagal
    try {
      if (is_channel) {
        const response = await gapi.get('channels', makeParams({ key: youtubeKey, id: channel.id }))
        if (response.data.pageInfo.totalResults === 1 ) {
          const item = response.data.items[0]
          if (item.kind === "youtube#channel") {
            if (!channel.hasOwnProperty("title")) {
              channel.title = item.snippet.title
            }
            if (item.contentDetails.relatedPlaylists.hasOwnProperty("uploads")) {
              playlistId = item.contentDetails.relatedPlaylists.uploads
            }
          } else {
            return
          }
        }
      }
      const resp = await gapi.get('playlistItems', makeParams({ key: youtubeKey, playlistId }))
      resp.data.items.forEach(async (item) => {
        if (!channel.hasOwnProperty("title")) {
          channel.title = item.snippet.channelTitle
        }
        const video: IVideo = item.contentDetails
        video.channel = channel
        const delta = new Date().valueOf() - new Date(video.videoPublishedAt).valueOf()
        if (delta < 5 * 24 * 60 * 60 * 1000) { // 2 day
          // await put_video(video) // put to gun
          // await put_video_published(video) // put to gun for lex
          await put_video_test(video) // put to gun for channel scoped
        }
      })
    } catch (e) {
      console.log(e)
    }
  }), 300)
  return videos.videos
}