import { useState } from "react";
import {
  WagmiConfig,
  createConfig,
  useAccount,
  useConnect,
  useDisconnect,
} from "wagmi";
import { mainnet, polygon, bsc } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { http } from "wagmi";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Configuration de Wagmi
const config = createConfig({
  autoConnect: true,
  connectors: [injected()],
  chains: [mainnet, polygon, bsc],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [bsc.id]: http(),
  },
});

// Créer un QueryClient
const queryClient = new QueryClient();

// Composant du modal pour afficher les wallets disponibles
function WalletModal({ isOpen, onClose }) {
  const { connectors, connect, error } = useConnect();

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-md w-80">
          <h2 className="text-xl font-bold mb-4">Choisissez un Wallet</h2>
          {connectors.length > 0 ? (
            connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => connect({ connector })}
                className="block w-full p-2 bg-blue-500 text-white rounded mb-2"
              >
                {connector.name}
              </button>
            ))
          ) : (
            <p className="text-red-500">Aucun wallet détecté</p>
          )}
          {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
          <button
            onClick={onClose}
            className="mt-2 px-4 py-2 bg-gray-500 text-white rounded w-full"
          >
            Fermer
          </button>
        </div>
      </div>
    )
  );
}

// Composant principal pour gérer la connexion du wallet
function WalletManager() {
  const [modalOpen, setModalOpen] = useState(false);
  const { address, isConnected, chainId } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div className="p-6 bg-gray-900 text-white flex flex-col items-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Gestion du Wallet</h1>
      {isConnected ? (
        <div className="text-center">
          <p>🔗 Connecté: <span className="font-semibold">{address}</span></p>
          <p>🌐 Réseau: <strong>{chainId ? `ID ${chainId}` : "Inconnu"}</strong></p>
          <button
            className="mt-4 px-4 py-2 bg-red-500 rounded"
            onClick={disconnect}
          >
            ❌ Déconnecter
          </button>
        </div>
      ) : (
        <button
          className="px-6 py-3 bg-green-500 rounded text-white font-bold"
          onClick={() => setModalOpen(true)}
        >
          🔗 Connecter un Wallet
        </button>
      )}
      <WalletModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

// Composant App - Principal
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <WalletManager />
      </WagmiConfig>
    </QueryClientProvider>
  );
}   