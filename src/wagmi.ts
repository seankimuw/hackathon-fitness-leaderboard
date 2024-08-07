import { http, cookieStorage, createConfig, createStorage } from 'wagmi'
import { baseSepolia, mainnet, sepolia } from 'wagmi/chains'
import { coinbaseWallet, injected } from 'wagmi/connectors'

import '@rainbow-me/rainbowkit/styles.css';

export function getConfig() {
  return createConfig({
    chains: [baseSepolia],
    connectors: [
      injected(),
      coinbaseWallet(),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [baseSepolia.id]: http(),
    },
  })
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}
