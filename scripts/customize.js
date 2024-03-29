const fsp = require('fs/promises')
const fs = require('fs')
const AsyncForEach = require('async-await-foreach')
const chalk = require('chalk')

const customize = {
  './src/gun-vue/files/useMd.ts': {
    replaces: [
      [`linkify: true`, `html: true,\n      linkify: true`],
      [`import . parse . from 'ultramatter'`,
       `import { parse } from 'ultramatter'\n\nimport { preWrapperPlugin } from '../../composables/file/plugins/preWrapper'\nimport { containerPlugin } from '../../composables/file/plugins/containers'\nimport anchorPlugin from 'markdown-it-anchor'\nimport emojiPlugin from 'markdown-it-emoji'\nimport { slugify } from '@mdit-vue/shared'\nimport { tocPlugin } from '@mdit-vue/plugin-toc'\nimport hljs from "highlight.js"\nimport highlightPlugin from "markdown-it-highlightjs"\nimport 'highlight.js/styles/github.css'`],
      [`md.use\\(externalLinks, {`, `md.use(preWrapperPlugin)\n      .use(containerPlugin)\n      .use(anchorPlugin, { slugify })\n      .use(tocPlugin)\n      .use(emojiPlugin)\n      .use(highlightPlugin, {auto: true, inline: true, hljs})\n    md.use(externalLinks, {\n      externalRel: 'noreferrer',`]
    ],
  },
  './src/gun-vue/components.ts': {
    replaces: [
      [`^import ['"]`, `// import '`],
    ],
  },
  './src/components/NavBar.vue': {
    replaces: [
      [`../components`, `#components`]
    ],
  },
  './src/gun-vue/gun/useGun.ts': {
    replaces: [
      ['import "gun/lib/webrtc"', 'import "gun/lib/open";\nimport "gun/lib/load";\nimport "gun/lib/webrtc"'],
    ],
  },
  './src/gun-vue/user/useUser.ts': {
    replaces: [
      ['rooms: object', 'moiapp: object\n\t\twallets: object\n\t\trooms: object\n\t\t[key: string]: any'],
      [`rooms: {}`, `moiapp: {},\n\t\twallets: {jingtum: {chain: "jingtum"}, moac: {chain: "moac"}, ethereum: {chain: "ethereum"}},\n\t\trooms: {}`],
      ['gun.user\\(\\).leave\\(\\);', 'user.safe.wallets = {jingtum: {chain: "jingtum"}, moac: {chain: "moac"}, ethereum: {chain: "ethereum"}};\n\tgun.user().leave();'],
      // ['pair\\(\\): ISEAPair {', 'wallets: {jingtum: {chain: "jingtum"}, moac: {chain: "moac"}, ethereum: {chain: "ethereum"}},\n\tpair(): ISEAPair {'],
    ],
  },
  './src/gun-vue/post/PostList.vue': {
    replaces: [
      ['\\(title="Upload feed"', '(v-if="1 > 2" title="Upload feed"'],
      ['v-if="0<countPosts"', 'v-if="countPosts > 0"'],
    // [`v-if="countPosts > 0"`, `v-if="-1 > countPosts"`],
    // [`{{ tag }}`, "{{ t(`tags.${tag}`) }}"]
    ],
  },
  './src/gun-vue/space/SpaceDraw.vue': {
    replaces: [
      ['<.i-carbon-erase />', '<div class="i-carbon-erase"></div>'],
    // [`z-10.absolute`, `z-500.absolute`]
    ],
  },
  './src/gun-vue/space/SpacePlane.vue': {
    replaces: [
      ['fedropshadow', 'feDropShadow']
    ],
  },
  './src/gun-vue/room/RoomForm.vue': {
    replaces: [
      [`const create = reactive`, `const enabled = computed(() => Object.keys(user.safe?.rooms).length < 2 || user.safe?.wallets?.jingtum?.activated && Object.keys(user.safe?.rooms).length < 5)\n\nconst create = reactive`],
      [`click="genPair\\(\\)"`, `click="genPair()", :disabled="!enabled"`],
    ],
  },
  './src/gun-vue/room/RoomPage.vue': {
    replaces: [
      ['pt-32.px-2', 'pt-12.px-2'],
      ['gun.config.json', 'room.config'],
      [`:key="c"`, `v-show="features?.[c]?.enabled"\n        :key="c"`],
      [`\\(\\) => features`, '() => features.value'],
      [`:title="title"`, `:title="t('customize.room_' + c)"`]
    ],
  },
  './src/gun-vue/room/RoomFeatureIcon.vue': {
    replaces: [
      ['icon.includes', 'icon.toLowerCase().includes'],
    ],
  },
  './src/gun-vue/room/RoomFeature.vue': {
    // i18n: true,
    replaces: [
      [`.bg-light-700`, ``],
    ],
  },
  './src/gun-vue/dict/dict.vue': {
    i18n: true,
    replaces: [
      [` My`, ` {{ t('customize.dict_my') }}`],
      [` Authors`, ` {{ t('customize.dict_authors') }}`],
    ],
  },
  './src/gun-vue/dict/DictPanel.vue': {
    i18n: true,
    replaces: [
      [` Dictionary`, ` {{ t('customize.dict_dictionary') }}`],
    ],
  },
  './src/gun-vue/dict/DictAuthors.vue': {
    i18n: true,
    replaces: [
      [`Dictionary authors`, ` {{ t('customize.dict_authors') }}`],
    ],
  },
  './src/gun-vue/dict/word/DictWordList.vue': {
    i18n: true,
    replaces: [
      [` Words`, ` {{ t('customize.dict_words') }}`],
      [` Add`, ` {{ t('button.add') }}`],
    ],
  },
  './src/gun-vue/dict/def/DictDefList.vue': {
    i18n: true,
    replaces: [
      [` Definitions`, ` {{ t('customize.dict_definitions') }}`],
      [` Add`, ` {{ t('button.add') }}`],
      [`{{ p }}`, `{{ t('customize.dict_' + p) }}`],
    ],
  },
  './src/gun-vue/files/TorrentUpload.vue': {
    i18n: true,
    replaces: [
      [` Share`, ` {{ t('customize.torrent_share') }}`],
      [`'Copied!'`, `t('customize.torrent_copied')`],
      [`'Copy'`, `t('customize.torrent_copy')`],
    ],
  },
  './src/gun-vue/chat/ChatTopics.vue': {
    i18n: true,
    replaces: [
      ['{{ title }}', `{{ t('customize.chat_' + title.toLowerCase())}}`],
    ],
  },
  './src/gun-vue/chat/ChatInput.vue': {
    replaces: [
      // ['textarea.p-2.rounded-xl.bg-light-200', 'textarea.px-2.rounded-xl.bg-light-200'],
      ['p-4.flex.flex-col.items-center', 'p-2.flex.flex-col.items-center'],
    ],
  },
  './src/gun-vue/chat/ChatMessages.vue': {
    replaces: [
      ['flex.flex-col.bg-opacity-80.p-4.gap-2', 'flex.flex-col.bg-opacity-80.p-2.gap-1'],
    ],
  },
  './src/gun-vue/chat/ChatRoom.vue': {
    replaces: [
      ['flex.flex-col.overflow-y-scroll.*', 'flex.flex-col.w-full.h-full('],
      // ['p-4.bg-dark-50.bg-opacity-80', 'p-1.bg-dark-50.bg-opacity-80'],
    ],
  },
  './src/gun-vue/post/PostForm.vue': {
    replaces: [
      ['text: false', 'ipfs: false,\n  text: false'],
      ['ui-layer\\(:open="add.text"', 'ui-layer(:open="add.ipfs" @close="add.ipfs = false" :offset="\'22vh\'")\n  ui-layer(:open="add.text"'],
      ['form-youtube\\(@update="postData.youtube = \\$event"\\)', 'form-youtube(@update="postData.youtube = $event")\n    form-ipfs(@update="postData.ipfs = $event")'],
    ],
  },
  './src/gun-vue/post/PostCard.vue': {
    replaces: [
      ['.i-mdi-text-long.mx-1', '.i-simple-icons-ipfs.mx-1(v-if="post?.ipfs")\n        .i-mdi-text-long.mx-1'],
    ],
  },
  './src/gun-vue/post/PostLine.vue': {
    replaces: [
      ['.i-mdi-text-long', '.i-simple-icons-ipfs(v-if="post?.ipfs")\n          .i-mdi-text-long'],
    ],
  },
  './src/gun-vue/post/PostPage.vue': {
    replaces: [
      ['rounded-lg.max-w-65ch.flex', 'rounded-lg.max-w-65ch.mx-auto.flex'],
      ['button.button.flex.items-center\\(@click', 'button.button.flex.items-center(v-if="false" @click'],
      ['v-if="post\\?.cover \\|\\| post\\?.youtube', 'v-if="post?.cover || post?.youtube || post?.ipfs'],
      ['embed-youtube.mb-6', 'embed-ipfs.mb-6.shadow-xl.flex-1(\n        v-if="post?.ipfs"\n        :video="post?.ipfs"\n        )\n      embed-youtube.mb-6'],
    ],
  },
  './src/gun-vue/user/UserAvatar.vue': {
    replaces: [
    // [`form-picture.absolute\\(\n    :options`, `form-picture.absolute(\n    v-if="false"\n    :options`],
      ['form-picture.absolute\\(', 'form-picture.absolute(\n    v-if="user.wallets?.jingtum?.activated"'],
    ],
  },
  './src/gun-vue/chat/chat.vue': {
    replaces: [
      ['max-h-90vh.min-h-90vh', 'w-full.h-full'],
    ],
  },
  './src/gun-vue/user/UserGraph.vue': {
    replaces: [
      ['w-full.max-w-90vw.max-h-90vh', 'w-full.max-h-99vh'],
    ],
  },
  './src/gun-vue/auth/AuthForm.vue': {
    replaces: [
      ['  console.log\\(p\\)', '// console.log(p)'],
      ["includes\\('#/auth/'\\)", "includes('/auth/')"],
    ],
  },
  './src/gun-vue/auth/useAuth.ts': {
    replaces: [
      ['auth_url = "#\\/auth\\/"', 'auth_url = "/auth/"'], // history mode
    ],
  },
  // "./src/gun-vue/composables/src/user/useAccount.ts": { replaces: [
  //   [`db: gun.user`, `wallets: {jingtum: {chain: "jingtum"}, moac: {chain: "moac"}, ethereum: {chain: "ethereum"}},\n      db: gun.user`],
  //   [`return obj;`, `gun.user(pub.value)\n      .get("wallets")\n      .get("defaults")\n      .map()\n      .on((d, k) => {\n        delete d._\n        delete d["#"]\n        delete d[">"]\n        obj.wallets[k] = d;\n      });\n    return obj;`]
  // ]},
  './src/gun-vue/ui/Uilayer.vue': {
    replaces: [
      ['10vh', '5vh'],
    ],
  },
  './src/gun-vue/space/space.vue': {
    replaces: [
      [`space-plane.h-90vh`, `space-plane.h-99vh`],
      [':key="currentRoom.pub" @enter=', ':key="currentRoom.pub" :pad="20" @enter='],
    ],
  },
  './src/gun-vue/user/UserHome.vue': {
    i18n: true,
    replaces: [
      ['chat-private-list\\(@chat', 'chat-private-list(:title="t(\'customize.chat_title\')" @chat'],
    ],
  },
  // "./src/gun-vue/chat/chats.vue": { i18n: true, replaces: [
  //   [`chat-private-list\\(@chat`, `chat-private-list(:title="t('customize.chat_title')" @chat`],
  // ]},
  './src/gun-vue/styles/index.css': {
    replaces: [
      ['10px', '0'],
    ],
  },
  './src/gun-vue/my/my.vue': {
    i18n: true,
    replaces: [
      [`import { useUser } from.*`, `import { useUser } from '#composables';`],
      ['Home', '{{ t(\'customize.my_home\') }}'],
      ['Profile', '{{ t(\'customize.my_profile\') }}'],
      ['Chat', '{{ t(\'customize.my_chat\') }}'],
      ['Mates', '{{ t(\'customize.my_mates\') }}'],
      ['Wallets', '{{ t(\'customize.my_wallets\') }}'],
      ['flex.flex-wrap.bg', 'flex.flex-wrap.justify-around.bg']
    ],
  },
  './src/gun-vue/private/empty.vue': {
    i18n: true,
    replaces: [
      ['chat-private-list\\(@chat', 'chat-private-list(:title="t(\'customize.chat_title\')" @chat'],
      ['Select a user to start a private e2e encrypted chat', '{{ t(\'customize.my_startchat\') }}'],
    ],
  },
}

Promise.resolve().then(async () => {
  Object.keys(customize).forEach((file) => {
    replace(file, customize[file])
  })
  special('./src/gun-vue/user/useUser.ts')
  special('./src/gun-vue/room/useRoom.ts')
})

function log(message = '', color = 'green') {
  console.log(chalk[color](message))
}

function replace(file, config = []) {
  log(`... processing ${file}`)
  let content = fs.readFileSync(file, 'utf8').split('\n')
  config.replaces.forEach((replacer) => {
    content = content.map(line => line.replace(new RegExp(replacer[0], 'g'), replacer[1]))
  })
  if (config.i18n) {
    log(`... ... replace i18n ${file}`)
    const index = content.findIndex(line => line === '</script>')
    if (index !== -1) { // has script section in sfc
      const exists = content.findIndex(line => /useI18n/.test(line))
      if (exists === -1)
        content.splice(index, 0, 'const { t } = useI18n()')
    }
    else {
      content.unshift('</script>')
      content.unshift('const { t } = useI18n')
      content.unshift('<script setup>')
    }
  }
  fs.writeFileSync(file, content.join('\n'), 'utf8')
}

function i18n(file, i18n = false) {

}

function special(file, multiline = true) {
  const content = fs.readFileSync(file, "utf8")
  let new_content = content.replace(/get\("safe"\)[\s\S]+.map\(\)[\s\S]+.on\(\(d, k\) => {[\s\S]+user.safe\[k\] = d;/m, `get("safe")
		.open(d => {
			user.safe = Object.assign({
				saved: false,
				password: '',
				enc: '',
				pass: '',
				moiapp: {},
				wallets: {jingtum: {chain: "jingtum"}, moac: {chain: "moac"}, ethereum: {chain: "ethereum"}},
				rooms: {}
			}, d)`)
  // new_content = new_content.replace(/gun\n    .user\(pub\)\n    .get\("profile"\)\n    .map\(\)\n    .on\(\(d, k\) => {\n      room.profile\[k\] = d;/m, `gun
  //   .user(pub)
  //   .get("profile")
  //   .open(d => {
  //     room.profile = d;`)
  //  new_content = new_content.replace(/gun\n    .user\(pub\)\n    .get\("hosts"\)\n    .map\(\)\n    .once\(\(d, k\) => {\n      room.hosts\[k\] = d;/m, `gun
  //   .user(pub)
  //   .get("hosts")
  //   .load(d => {
  //     room.hosts = d;`)
  //  new_content = new_content.replace(/gun\n    .user\(pub\)\n    .get\("features"\)\n    .map\(\)\n    .once\(\(d, k\) => {\n      room.features\[k\] = d;/m, `gun
  //   .user(pub)
  //   .get("features")
  //   .load(d => {
  //     room.features = d;`)
  if (new_content !== content) {
    console.log(`... special replaced ${file}`)
    fs.writeFileSync(file, new_content, 'utf8')
  }
}
