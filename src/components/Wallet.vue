<script setup lang="ts">
import { useUser } from '#composables';
import { default_chain_name, useWallet, useWallets } from '../composables/useWallet'
const { user } = useUser()
// const { wallet } = useWallet()
const { wallets, chains } = useWallets()
const noop = () => {console.log(`...debug doing nothing`)}

const chain_names = []
for (const chain in wallets) {
  chain_names.push({name: chain, text: chain})
}

const balances = computed(() => {
  const balances = {} as any
  Object.keys(chains).forEach(chain => {
    console.log(chain)
    const balance = {sequence: 0, native: {} as any, tokens: {} as any} as any
    try {
      const balance_raw = JSON.parse(user.safe.wallets[chain]?.balance || "{}")
      console.log(balance_raw)
      balance.sequence = balance_raw.sequence || 0
      const natives = (balance_raw.balances || []).filter(t => t.issuer === "")
      if (natives.length === 1) {
        const native = natives[0]
        balance.native.token = native.currency
        balance.native.value = native.value
        balance.native.freezed = native.freezed || 0
        balance_raw.balances.filter(t => t.issuer).forEach(token => {
          if (token.value > 0.01) {
            balance.tokens[token.currency] = token
          }
        })
      }
    } catch (e) { console.log(e) }
    balances[chain] = balance
  })
  return balances
})

const selectedChain = ref(chain_names.find(e => e.name === default_chain_name.value))
const wallet = ref(useWallet())
const chain = ref(default_chain_name.value)
watch(selectedChain, () => {
  wallet.value = useWallet(selectedChain.value.name)
  chain.value = selectedChain.value.name
})


onBeforeMount(() => {
  Object.keys(wallets).forEach(key => {
    const wallet = wallets[key]
    wallet.chainobj.load_library(wallet).then(() => {wallet.chainobj.wallet_init(wallet)})
  })
  if (!user.is) {
    user.auth = true
  }
})
const { t } = useI18n()
</script>

<template lang="pug">
.container.h-100vh
  h1.pt-8.text-center.font-bold.text-2xl {{ t('wallets.wallets') }}
  .container.overflow-x-hidden
    .grid.grid-col-1.place-content-around.gap-2.p-4.min-h-85vh
      .flex.flex-col.gap-2.max-w-full.sm-max-w-sm.rounded-xl.shadow-lg(v-if="user.is")
        .flex.justify-center.items-center.gap-4
          p {{ wallet.chain }}
          .i-mdi-wallet.w-24.h-24
          p {{ wallet.algorithm }}
        .mx-auto(v-if="balances[chain]?.native?.value") {{ t('wallets.balance') }} {{ balances[chain]?.native?.value }} {{ balances[chain]?.native?.token }}
        .font-mono.tracking-tight.px-1.mx-auto {{ wallet.address }}
        .flex.flex-col.gap-2(v-if="user.safe.wallets[chain]?.activated")
          .border-b
          div(v-if="Object.keys(balances[chain].tokens).length > 0")
            p {{ t('wallets.tokens') }}
            ul.pl-4(v-for="(value, token) of balances[chain].tokens" :key="token")
              li {{ value.value }} {{ token }}
          .flex.place-content-around
            button.button
              .i-ph-spinner-bold(v-if="wallet.querying" @click="noop()")
              .i-carbon-update-now(v-else @click="wallet.chainobj.update_balance(wallet)")
        div(v-else)
          .flex.place-content-around
            p {{ t('wallets.not_activated') }}
            button.button(@click="wallet.chainobj.update_balance(wallet)")
              .i-ph-spinner-bold(v-if="wallet.querying" @click="noop()")
              .i-carbon-update-now(v-else @click="wallet.chainobj.update_balance(wallet)")
      .flex.flex-col.gap-2.max-w-full.sm-max-w-sm.p-2.rounded-xl.shadow-lg(v-else)
        p {{ t('wallets.login_first') }}
      .grid-row.justify-items-stretch
        ASelect(
          v-model="selectedChain"
          :options="chain_names"
          )
</template>
