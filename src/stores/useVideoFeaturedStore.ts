import { IVideo } from "../types"
import { defineStore } from "pinia"
import { getRandomElement } from "../api/utils"

export const FEATURED = [
  {videoId: "LJ7Y2MRV0kg", videoPublishedAt: "2019-11-26T04:07:54Z", channelId: "UC7Ky7FjJBI7ojx2Yqz2pkNQ", ipfs: "QmYkuAKeDQTHVk9wRCw8y1kkvdvyrs1KTJRRntHFRuADFu/video.mp4"},
  {videoId: "DPK7D_Q46YI", videoPublishedAt: "2020-04-18T09:01:31Z", channelId: "UC7Ky7FjJBI7ojx2Yqz2pkNQ", ipfs: "QmVFoaQCkXnjqv2TD3ciihLz8ejgNEauH8W9hCJLhr3nHF/video.mp4"},
  {
    videoId: 'W9n6Cg4ImEM',
    ipfs: 'Qmei9sWviWnSWBo5nuoN5nchME6vf1149FMetQYyqL59yJ/video.mp4',
    channelId: 'UC7Ky7FjJBI7ojx2Yqz2pkNQ',
    videoPublishedAt: '2022-03-18T09:01:31Z'
  },
  {
    videoId: 'NQjYXF-zM_o',
    ipfs: 'QmPEL4pL9zWZopYm4QopoeDcfidq5wmUy276TgbWMfJHdK/video.mp4',
    channelId: 'UCdXqCN_HtF_RjlsHzDSnJIQ',
    videoPublishedAt: '2022-03-18T09:01:31Z'
  },
  {
    videoId: 'RLtRuC5bf18',
    ipfs: 'QmRS35Mk3ckmDYX28XX4TAwcXiKrj7DwGAFyfy9X6GvfuD/video.mp4',
    channelId: 'UCdXqCN_HtF_RjlsHzDSnJIQ',
    videoPublishedAt: '2022-03-18T09:01:31Z'
  },
  {
    videoId: 'XqiN5ojm_aQ',
    ipfs: 'QmY7PLuzJLtQPkEQshybfJV9rhcUTxX1MMk3bGRDo1DgUJ/video.mp4',
    channelId: 'UCdXqCN_HtF_RjlsHzDSnJIQ',
    videoPublishedAt: '2022-03-18T09:01:31Z'
  },
  {
    videoId: '6OCVNro1SP8',
    ipfs: 'QmZWfHv3bjrraUAVK1MQuuuMefabD7z5QC3e1iDYypkdSK/video.mp4',
    channelId: 'UCE05tYKEsEk7Qmhwg5pqcKw',
    videoPublishedAt: '2022-03-18T09:01:31Z'
  },
  {
    videoId: 'KmQeDP6GfXI',
    ipfs: 'QmacAChRiga1rB4W5jugqMJymw9FpnHgxHnKY4LBZAeMzK/video.mp4',
    channelId: 'UCE05tYKEsEk7Qmhwg5pqcKw',
    videoPublishedAt: '2022-03-18T09:01:31Z'
  },
  {
    videoId: 'Tswq32x4hpQ',
    ipfs: 'QmQqc8hLHzMVwUdXYtpv1cMjPgo9X3a7jSTmStAV7VWtpe/video.mp4',
    channelId: 'UCE05tYKEsEk7Qmhwg5pqcKw',
    videoPublishedAt: '2022-03-18T09:01:31Z'
  },
  {
    videoId: 'gO-N4iAvnjg',
    ipfs: 'QmUtiWUM3qrKpD9pNeE4MJ3vFpDCGkVNZ4aJ7uGaxTYXjn/video.mp4',
    channelId: 'UCE05tYKEsEk7Qmhwg5pqcKw',
    videoPublishedAt: '2022-03-18T09:01:31Z'
  },
  {
    videoId: '1lIvHFQ5OrY',
    ipfs: 'QmXJ8CaEPoKN61c2tENJPzEV1SQ4hzaBRX1QP9o2LfvhU3/video.mp4',
    channelId: 'UCH2BtkEp1kHY7o9TCIhYaFA',
    videoPublishedAt: '2022-03-18T09:01:31Z'
  },
  {
    videoId: 'OJaCb0Nkt6U',
    ipfs: 'Qmdr58wn5sQDmaikVpyiKwWoCEMhNKbfuP4DbE8b1CCp5X/video.mp4',
    channelId: 'UCH2BtkEp1kHY7o9TCIhYaFA',
    videoPublishedAt: '2022-03-18T09:01:31Z'
  },
  {
    videoId: 'rEZ_apIMD9U',
    ipfs: 'QmV7Fs6Xfe1fnabH2EA4MjRS15ane9HbL7eLGfskT37M9t/video.mp4',
    channelId: 'UCH2BtkEp1kHY7o9TCIhYaFA',
    videoPublishedAt: '2022-03-18T09:01:31Z'
  },
  {
    videoId: '9-dDQYlbj1k',
    ipfs: 'QmWYFMmtrFAmhk26LgtDJLEfaKZ3sTr29Pw24kRvpA3XcE/video.mp4',
    channelId: 'UCkZ9vSvx7lg9FvZifpbH2FA',
    videoPublishedAt: '2022-03-18T09:01:31Z'
  },
  {
    videoId: 'pBJJmPQ5sXM',
    ipfs: 'Qma44WU8cTCXm8QnXPeMVkzHNJaq26QX4HoQw2nwxFGmZn/video.mp4',
    channelId: 'UCnyPxKrdrXDjlBBucRAIuuA',
    videoPublishedAt: '2022-03-18T09:01:31Z'
  },
  {
    videoId: 'dAA4cdrUuLk',
    ipfs: 'QmRobE413v7eFq6hmC4NA6BpGc6XKZPAL6C1Eyes8dfTaD/video.mp4',
    channelId: 'UCRByPS00RZsAUe2DTCoHuFQ',
    videoPublishedAt: '2022-03-18T09:01:31Z'
  },
  {
    videoId: '2VuUkKBtX5I',
    ipfs: 'QmV4BWqUPAJ3SqznCDmhz3y2ifp993ojvgm42yh1kio7Cr/video.mp4',
    channelId: 'UCwNGgFvBpxtU8JagZLzztzQ',
    videoPublishedAt: '2022-03-18T09:01:31Z'
  }
]

export const useVideoFeaturedStore = defineStore('featured', {
  state: () => {
    return { videos: FEATURED as IVideo[] }
  },
  actions: {
    add(video) {
      const index = this.videos.findIndex(v => v.videoId === video.videoId)
      if (index === -1) {
        this.videos.push(video)
      }
    },
    remove(video) {
      const index = this.videos.findIndex(v => v.videoId === video.videoId)
      if (index !== -1) {
        this.videos.splice(index, 1)
      }
    },
    playing() {
      return getRandomElement(this.videos)
    }
  },
})

