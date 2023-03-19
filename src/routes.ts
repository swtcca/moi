import routes_gun_vue from './gun-vue/routes'

export default [
    {
        path: "/youtube",
        name: "youtube",
        component: () => import('./components/YoutubeVideos.vue')
    },
    {
        path: "/wallets",
        name: "cryptowallets",
        component: () => import('./components/Wallet.vue')
    },
    {
        path: "/chatgpt",
        name: "chatgpt",
        component: () => import('./components/ChatGpt.vue')
    },
    ...routes_gun_vue
]