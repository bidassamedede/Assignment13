import { WagmiConfig } from "wagmi";
import { config } from "./wagmi";
import WalletManager from "./WalletManager"; 

export default function App() {
  return (
    <WagmiConfig config={config}>
      <WalletManager />
    </WagmiConfig>
  );
}
