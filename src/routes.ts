import routes_gun_vue from './gun-vue/routes'

export default [
    {
        path: "/youtube/",
        name: "youtube",
        component: () => import('./components/YoutubeVideos.vue')
    },
    {
        path: "/wallets/",
        // meta: { requiresAuth: true },
        name: "cryptowallets",
        component: () => import('./components/Wallet.vue')
    },
    {
        path: "/chatgpt/",
        // meta: { requiresAuth: true },
        name: "chatgpt",
        component: () => import('./components/ChatGpt.vue')
    },
    ...routes_gun_vue
]