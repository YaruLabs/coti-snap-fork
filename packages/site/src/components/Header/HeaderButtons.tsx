import { useAccount, useConnect } from 'wagmi';

import { config, CONNECTOR_MM, CONNECTOR_MM_FLASK_EXPORT, CONNECTOR_MM_REGULAR_EXPORT } from '../../config/wagmi';
import { useMetaMask } from '../../hooks';
import { Button } from '../Button';
import { ConnectedContainer, Link } from './styles';
import { WalletManager } from './WalletManager';

export const InstallWalletButton = () => (
  <Link href={CONNECTOR_MM.INSTALLATION_URL} target="_blank">
    Install Metamask
  </Link>
);

export const HeaderButtons = () => {
  const { isFlask, installedSnap } = useMetaMask();
  const { isConnected } = useAccount();
  const { connectors, connect } = useConnect({ config });

  const isMetaMaskInstalled =
    typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;

  // Determine which connector to use based on Flask detection
  const connectorId = isFlask ? CONNECTOR_MM_FLASK_EXPORT.ID : CONNECTOR_MM_REGULAR_EXPORT.ID;

  return (
    <ConnectedContainer>
      {isConnected ? (
        <WalletManager />
      ) : (
        <>
          {!isMetaMaskInstalled ? (
            <InstallWalletButton />
          ) : (
            connectors.map(
              (connector) =>
                connector.id === connectorId && (
                  <Button
                    key={connector.id}
                    text="Connect wallet"
                    primary
                    onClick={() => connect({ connector })}
                  />
                ),
            )
          )}
        </>
      )}
    </ConnectedContainer>
  );
};
