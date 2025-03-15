import { createConfig, http } from "wagmi";
import { mainnet, polygon, bsc } from "wagmi/chains";
import { injected } from "wagmi/connectors";

// Configuration de Wagmi
export const config = createConfig({
  autoConnect: true,
  connectors: [injected()],
  chains: [mainnet, polygon, bsc],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [bsc.id]: http(),
  },
});
