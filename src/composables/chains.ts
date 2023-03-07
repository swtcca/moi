import { getRandomElement } from "../api/utils"
import { useUser } from "../gun-vue/user/useUser"
import { save_user_safe } from "./userSafe"
import { useSwtc } from "./useSwtc"
const {load: import_swtc } = useSwtc()

const { user } = useUser()
export const chains = reactive({
  ethereum: {
    chain: "ethereum",
    algorithm: "ecdsa",
    need_activation: false,
    lib_name: "Web3",
    lib_url: "https://unpkg.com/web3@latest/dist/web3.min.js",
    endpoints: ['https://cloudflare-eth.com',],
    load_library: async (wallet = {} as any) => {
      const lib_name = wallet.chainobj.lib_name
      const { load } = useScriptTag(wallet.chainobj.lib_url, () => {}, { manual: true })
      if (!globalThis.hasOwnProperty(lib_name)) {
        console.log(`import library`)
        try {
          await load()
          console.log(`loaded ${lib_name}`)
        } catch (e) {
          console.log(e)
        }
      }
      await wallet.chainobj.wallet_init(wallet)
      if (user.is) wallet.balance_raw = JSON.parse(user.safe.wallets[wallet.chain]?.balance || "{}")
    },
    wallet_init: async (wallet = {} as any) => {
      console.log(`wallet init`)
      if (!wallet.initiated) {
        try {
          wallet.api = new globalThis.Web3(getRandomElement(wallet.chainobj.endpoints))
          if (!wallet.address) {
            console.log(`address`)
            wallet.address = wallet.api.eth.accounts.privateKeyToAccount(Buffer.from(user?.pair()?.priv, "base64").toString("hex"))?.address
            await save_user_safe({chain: wallet.chain, address: wallet.address, algorithm: wallet.chainobj.algorithm }, ["wallets", wallet.chain])
          }
          wallet.chainobj.update_balance(wallet)
        } catch (e) {}
      }
    },
    update_balance: async (wallet = {} as any) => {
      await wallet.chainobj.wallet_init(wallet)
      wallet.querying = true
      try {
        const b = await wallet.api.eth.getBalance(wallet.address)
        const r = {sequence: 1, balances: [{currency: "ether", value: b, issuer: ""}]}
        wallet.activated = true
        wallet.querying = false
        await save_user_safe({ address: wallet.address, activated: true, sequence: r.sequence, balance: JSON.stringify(r)}, ["wallets", wallet.chain])
        wallet.balance_raw = r
      } catch (e) {
        wallet.querying = false
        console.log(`error get account balances`)
        wallet.api = new globalThis.Web3(getRandomElement(wallet.chainobj.endpoints))
      }
    } 
  },
  polygon: {
    chain: "polygon",
    algorithm: "ecdsa",
    need_activation: false,
    lib_name: "Web3",
    lib_url: "https://unpkg.com/web3@latest/dist/web3.min.js",
    endpoints: ['https://polygon-rpc.com',],
    load_library: async (wallet = {} as any) => {
      const lib_name = wallet.chainobj.lib_name
      const { load } = useScriptTag(wallet.chainobj.lib_url, () => {}, { manual: true })
      if (!globalThis.hasOwnProperty(lib_name)) {
        console.log(`import library`)
        try {
          await load()
          console.log(`loaded ${lib_name}`)
        } catch (e) {
          console.log(e)
        }
      }
      // await wallet.chainobj.wallet_init(wallet)
      if (user.is) wallet.balance_raw = JSON.parse(user.safe.wallets[wallet.chain]?.balance || "{}")
    },
    wallet_init: async (wallet = {} as any) => {
      await wallet.chainobj.load_library(wallet)
      console.log(`wallet init`)
      if (!wallet.initiated) {
        try {
          wallet.api = new globalThis.Web3(getRandomElement(wallet.chainobj.endpoints))
          if (!wallet.address) {
            console.log(`address`)
            wallet.address = wallet.api.eth.accounts.privateKeyToAccount(Buffer.from(user?.pair()?.priv, "base64").toString("hex"))?.address
            await save_user_safe({chain: wallet.chain, address: wallet.address, algorithm: wallet.chainobj.algorithm }, ["wallets", wallet.chain])
          }
          wallet.chainobj.update_balance(wallet)
        } catch (e) {}
      }
    },
    update_balance: async (wallet = {} as any) => {
      await wallet.chainobj.wallet_init(wallet)
      wallet.querying = true
      try {
        const b = await wallet.api.eth.getBalance(wallet.address)
        const r = {sequence: 1, balances: [{currency: "matic", value: b, issuer: ""}]}
        wallet.activated = true
        wallet.querying = false
        await save_user_safe({ address: wallet.address, activated: true, sequence: r.sequence, balance: JSON.stringify(r) }, ["wallets", wallet.chain])
        wallet.balance_raw = r
      } catch (e) {
        wallet.querying = false
        console.log(`error get account balances`)
        wallet.api = new globalThis.Web3(getRandomElement(wallet.chainobj.endpoints))
      }
    } 
  },
  moac: {
    chain: "moac",
    algorithm: "ecdsa",
    need_activation: false,
    lib_name: "Web3",
    lib_url: "https://unpkg.com/web3@latest/dist/web3.min.js",
    endpoints: ['https://gateway.moac.io/mainnet',],
    load_library: async (wallet = {} as any) => {
      const lib_name = wallet.chainobj.lib_name
      const { load } = useScriptTag(wallet.chainobj.lib_url, () => {}, { manual: true })
      if (!globalThis.hasOwnProperty(lib_name)) {
        console.log(`import library`)
        try {
          await load()
          console.log(`loaded ${lib_name}`)
        } catch (e) {
          console.log(e)
        }
      }
      await wallet.chainobj.wallet_init(wallet)
      if (user.is) wallet.balance_raw = JSON.parse(user.safe.wallets[wallet.chain]?.balance || "{}")
    },
    wallet_init: async (wallet = {} as any) => {
      console.log(`wallet init`)
      if (!wallet.initiated) {
        try {
          wallet.api = new globalThis.Web3(getRandomElement(wallet.chainobj.endpoints))
          if (!wallet.address) {
            console.log(`address`)
            wallet.address = wallet.api.eth.accounts.privateKeyToAccount(Buffer.from(user?.pair()?.priv, "base64").toString("hex"))?.address
            await save_user_safe({chain: wallet.chain, address: wallet.address, algorithm: wallet.chainobj.algorithm }, ["wallets", wallet.chain])
          }
          wallet.chainobj.update_balance(wallet)
        } catch (e) {}
      }
    },
    update_balance: async (wallet = {} as any) => {
      await wallet.chainobj.wallet_init(wallet)
      wallet.querying = true
      try {
        const b = await wallet.api.eth.getBalance(wallet.address)
        const r = {sequence: 1, balances: [{currency: "moac", value: b, issuer: ""}]}
        wallet.activated = true
        wallet.querying = false
        await save_user_safe({ address: wallet.address, activated: true, sequence: r.sequence, balance: JSON.stringify(r) }, ["wallets", wallet.chain])
        wallet.balance_raw = r
      } catch (e) {
        wallet.querying = false
        console.log(`error get account balances`)
        wallet.api = new globalThis.Web3(getRandomElement(wallet.chainobj.endpoints))
      }
    } 
  },
  jingtum: {
    chain: "jingtum",
    need_activation: true,
    algorithm: "ed25519",
    lib_name: "swtc_rpc",
    endpoints: ['https://srje115qd43qw2.swtc.top', 'https://srje071qdew231.swtc.top'],
    load_library: async (wallet= {} as any) => {
      const lib_name = wallet.chainobj.lib_name
      await import_swtc()
      wallet.Remote = (globalThis[lib_name]).Remote
      wallet.Wallet = wallet.Remote.Wallet
      await wallet.chainobj.wallet_init(wallet)
      if (user.is) wallet.balance_raw = JSON.parse(user.safe.wallets[wallet.chain]?.balance || "{}")
    },
    wallet_init: async (wallet = {} as any) => {
      if (!wallet.initiated) {
        try {
          wallet.api = new wallet.Remote({server: getRandomElement(wallet.chainobj.endpoints)})
          if (!wallet.address) {
            wallet.address = wallet.Wallet?.fromSecret(Buffer.from(user?.pair()?.priv, "base64").toString("hex"), wallet.algorithm)?.address
            await save_user_safe({chain: wallet.chain, address: wallet.address, algorithm: wallet.chainobj.algorithm }, ["wallets", wallet.chain])
          }
          wallet.chainobj.update_balance(wallet)
          setTimeout(() => {
            if (!wallet.activated && user.safe.wallets?.jingtum?.activated) {
              wallet.activated = true
            }
          }, 500)
        } catch (e) {}
      }
    },
    update_balance: async (wallet = {} as any) => {
      await wallet.chainobj.wallet_init(wallet)
      wallet.querying = true
      try {
        const r = await wallet.api.getAccountBalances(wallet.address)
        wallet.activated = true
        r.balances.forEach(t => {
          if (t.issuer === "") {
            t.value = (t.value).toFixed(4)
          } else {
            t.value = parseFloat(t.value).toFixed(4)
          }
        })
        wallet.querying = false
        await save_user_safe({ address: wallet.address, activated: true, sequence: r.sequence, balance: JSON.stringify(r) }, ["wallets", wallet.chain])
        wallet.balance_raw = r
      } catch (e) {
        wallet.querying = false
        if (e && e.error && e.error === "actNotFound") {
          wallet.activated = false
          wallet.balance_raw = {}
          await save_user_safe({ address: wallet.address, activated: false, sequence: 1, balance: JSON.stringify("{}") }, ["wallets", wallet.chain])
        } else {
          console.log(`error get account balances`)
          console.log(e)
          wallet.api = new wallet.Remote({server: getRandomElement(wallet.chainobj.endpoints)})
        }
      }
    } 
  },
  ripple: {
    chain: "ripple",
    need_activation: true,
    algorithm: "ecdsa",
    lib_name: "swtc_rpc",
    endpoints: ['https://xrplcluster.com'],
    load_library: async (wallet= {} as any) => {
      const lib_name = wallet.chainobj.lib_name
      await import_swtc()
      wallet.Remote = (globalThis[lib_name]).Factory("ripple")
      wallet.Wallet = wallet.Remote.Wallet
      await wallet.chainobj.wallet_init(wallet)
      if (user.is) wallet.balance_raw = JSON.parse(user.safe.wallets[wallet.chain]?.balance || "{}")
    },
    wallet_init: async (wallet = {} as any) => {
      if (!wallet.initiated) {
        try {
          wallet.api = new wallet.Remote({server: getRandomElement(wallet.chainobj.endpoints)})
          if (!wallet.address) {
            wallet.address = wallet.Wallet?.fromSecret(Buffer.from(user?.pair()?.priv, "base64").toString("hex"), wallet.algorithm)?.address
            await save_user_safe({chain: wallet.chain, address: wallet.address, algorithm: wallet.chainobj.algorithm }, ["wallets", wallet.chain])
          }
          wallet.chainobj.update_balance(wallet)
          setTimeout(() => {
            if (!wallet.activated && user.safe.wallets?.ripple?.activated) {
              wallet.activated = true
            }
          }, 500)
        } catch (e) {}
      }
    },
    update_balance: async (wallet = {} as any) => {
      await wallet.chainobj.wallet_init(wallet)
      wallet.querying = true
      try {
        const r = await wallet.api.rpcAccountInfo({account: wallet.address})
        wallet.activated = true
        r.sequence = r.account_data.Sequence
        r.balances =  [
            { value: +r.account_data.Balance / 1000000, currency: 'XRP', issuer: '', freezed: 40 },
          ],
        r.balances.forEach(t => {
          if (t.issuer === "") {
            t.value = (t.value).toFixed(4)
          } else {
            t.value = parseFloat(t.value).toFixed(4)
          }
        })
        delete r.account_data
        delete r.warnings
        delete r.validated
        delete r.status
        delete r.ledger_index
        delete r.ledger_hash
        wallet.querying = false
        await save_user_safe({address: wallet.address, activated: true, sequence: r.sequence, balance: JSON.stringify(r) }, ["wallets", wallet.chain])
        wallet.balance_raw = r
      } catch (e) {
        wallet.querying = false
        console.log(e)
        if (e && e.error && e.error === "actNotFound") {
          wallet.activated = false
          wallet.balance_raw = {}
          await save_user_safe({ address: wallet.address, activated: false, sequence: 1, balance: "{}" }, ["wallets", wallet.chain])
        } else {
          console.log(`error get account balances`)
          wallet.api = new wallet.Remote({server: getRandomElement(wallet.chainobj.endpoints)})
        }
      }
    } 
  },
})