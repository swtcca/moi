<script setup>
import { useContract, useContracts } from '../composables/useContract';

const props = defineProps({
  standard: { type: String, default: 'erc721' },
  chain: { type: String, default: 'polygon' },
  address: { type: String, default: '0x67Baa8575168623822106dee880a2c63B0EBE705' },
  index: { type: Number, default: 1 },
  list_tokens: { type: Boolean, default: false}
})
const {contract, sync_contract, read_contract} = useContract(props.address, props.standard, props.chain)
useContracts().then(async () => {
  read_contract(contract)
})

const load_more = async () => {
  await sync_contract(contract)
}

</script>

<template lang='pug'>
.flex.flex-col.gap-2.max-w-sm.bg-white.rounded-xl.shadow-lg(v-if="contract.total_supply > 0")
  .flex.justify-center.items-center.gap-4.text-blue-600.bg-cyan-400
    p {{ standard }}
    p {{ chain }}
    p {{ contract.name }}
  .mx-auto total {{ contract.total_supply }}
  .font-mono.tracking-tight.px-1.mx-auto {{ address }}
.bg-white.dark_bg-gray-800.grid.grid-col.grid-cols-1.gap-2.min-w-xs.place-content-center.sm_px-2.sm_gap-4.md_px-4.md_gap-6.md_grid-cols-2.lg_gap-8.lg_grid-cols-3.xl_grid-cols-4.text-center.text-gray-700.dark_text-gray-200(v-if="list_tokens")
  div(v-for="(token,index) in contract.tokens" :key="index")
    NftToken(:token="token")
.text-xl.mx-auto
  button.button(@click="load_more()" v-if="Object.keys(contract.tokens).length < contract.total_supply") load more
</template>