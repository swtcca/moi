<script setup lang="ts">
import { useUser } from '../gun-vue/composables';
import { default_chain_name, useWallet, useWallets } from '../composables/useWallet'
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'
const { user } = useUser()
// const { wallet } = useWallet()
const { wallets, chains } = useWallets()
const noop = () => {console.log(`...debug doing nothing`)}

const chain_names = [
  { name: 'ethereum' },
  { name: 'moac' },
  { name: 'jingtum' },
]
const selectedChain = ref(chain_names.find(e => e.name === default_chain_name.value))

const balances = computed(() => {
  const balances = {} as any
  Object.keys(chains).forEach(chain => {
    console.log(chain)
    const balance = {sequence: 0, native: {} as any, tokens: {} as any} as any
    try {
      const balance_raw = JSON.parse(user.wallets[chain]?.balance || "{}")
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

onBeforeMount(() => {
  Object.keys(wallets).forEach(key => {
    const wallet = wallets[key]
    wallet.chainobj.load_library(wallet)
  })
  if (!user.is) {
    user.auth = true
  }
})
const { t } = useI18n()
</script>

<template lang="pug">
.w-72(v-if="false")
  Listbox
    .relative.mt-1
      ListboxButton.relative.w-full.py-2.pl-3.pr-10.text-left.bg-white.rounded-lg.shadow-md.cursor-default.focus_outline-none.focus-visible_ring-2.focus-visible_ring-opacity-75.focus-visible_ring-white.focus-visible_ring-offset-orange-300.focus-visible_ring-offset-2.focus-visible_border-indigo-500.sm_text-sm
        span.block.truncate {{ selectedChain.name }}
        span.absolute.inset-y-0.right-0.flex.items-center.pr-2.pointer-events-none
          SelectorIcon.w-5.h-5.text-gray-400(aria-hidden="true")
.grid.grid-col-1.place-content-around.gap-2.p-4.min-h-90vh
  div(v-for="(wallet, chain) in wallets", :key="chain")
    .flex.flex-col.gap-2.max-w-sm.p-2.bg-white.rounded-xl.shadow-lg(v-if="user.is")
      .flex.justify-center.items-center.gap-4.text-blue-600
        p {{ wallet.chain }}
        mdi-wallet.w-12.h-12
        p {{ wallet.algorithm }}
      .mx-auto(v-if="balances[chain].native?.value") {{ t('wallets.balance') }} {{ balances[chain].native?.value }} {{ balances[chain].native?.token }}
      .font-mono.tracking-tight.mx-auto {{ wallet.address }}
      .flex.flex-col.gap-2(v-if="user.wallets[chain]?.activated")
        .border-b
        div(v-if="Object.keys(balances[chain].tokens).length > 0")
          p {{ t('wallets.tokens') }}
          ul.pl-4(v-for="(value, token) of balances[chain].tokens" :key="token")
            li {{ value.value }} {{ token }}
        .flex.place-content-around
          button.button.text-green-800
            ph-spinner-bold.text-yellow-500(v-if="wallet.querying" @click="noop()")
            carbon-update-now(v-else @click="wallet.chainobj.update_balance(wallet)")
      div(v-else)
        .flex.place-content-around
          p {{ t('wallets.not_activated') }}
          button.button.text-green-800(@click="wallet.chainobj.update_balance(wallet)")
            ph-spinner-bold.text-yellow-500(v-if="wallet.querying" @click="noop()")
            carbon-update-now(v-else @click="wallet.chainobj.update_balance(wallet)")
    .flex.flex-col.gap-2.max-w-sm.p-2.bg-white.rounded-xl.shadow-lg(v-else)
      p {{ t('wallets.login_first') }}
</template>