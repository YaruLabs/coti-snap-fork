import { useState, useMemo } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { formatUnits } from 'ethers';
import { BrowserProvider } from '@coti-io/coti-ethers';
import styled, { keyframes } from 'styled-components';
import { QuickAccessButton, QuickAccessGroup, QuickAccessItem, QuickAccessLabel, MainStack } from './styles';
import { Balance } from './Balance';
import { Tokens } from './Tokens';
import { TransferTokens } from './TransferTokens';
import { DepositTokens } from './DepositTokens';
import SendIcon from '../../assets/send.svg';
import ReceiveIcon from '../../assets/receive.svg';
import { useMetaMaskContext } from '../../hooks/MetamaskContext';
import { truncateString } from '../../utils';
import { Loading } from '../Loading';

interface ModalState {
  transfer: boolean;
  deposit: boolean;
}

const slideUpFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(48px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(24, 25, 29, 0.18);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AnimatedModalWrapper = styled.div`
  animation: ${slideUpFadeIn} 0.32s cubic-bezier(0.4, 0.8, 0.4, 1) both;
`;

const QuickAccessActions = ({ onSendClick, onReceiveClick }: {
  onSendClick: () => void;
  onReceiveClick: () => void;
}) => (
  <QuickAccessGroup>
    <QuickAccessItem>
      <QuickAccessButton onClick={onSendClick} aria-label="Send tokens">
        <SendIcon />
      </QuickAccessButton>
      <QuickAccessLabel>Send</QuickAccessLabel>
    </QuickAccessItem>
    <QuickAccessItem>
      <QuickAccessButton onClick={onReceiveClick} aria-label="Receive tokens">
        <ReceiveIcon />
      </QuickAccessButton>
      <QuickAccessLabel>Receive</QuickAccessLabel>
    </QuickAccessItem>
  </QuickAccessGroup>
);

const DepositModal = ({ isOpen, onClose, address }: {
  isOpen: boolean;
  onClose: () => void;
  address: string;
}) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <AnimatedModalWrapper>
        <DepositTokens onClose={onClose} address={address} />
      </AnimatedModalWrapper>
    </ModalBackdrop>
  );
};

export const ContentManageToken = () => {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { provider } = useMetaMaskContext();

  const [modalState, setModalState] = useState<ModalState>({
    transfer: false,
    deposit: false
  });

  const formattedBalance = useMemo(() => {
    if (!balance) return '0';
    try {
      const formatted = formatUnits(balance.value, 18);
      return formatted || '0';
    } catch (error) {
      console.error('Error formatting balance:', error);
      return '0';
    }
  }, [balance]);

  const browserProvider = useMemo(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      return new BrowserProvider(window.ethereum);
    }
    return null;
  }, []);

  const isWalletConnected = address && balance && provider;
  const shouldShowConnectWallet = !isWalletConnected;

  const handleSendClick = () => {
    setModalState(prev => ({ ...prev, transfer: true }));
  };

  const handleReceiveClick = () => {
    setModalState(prev => ({ ...prev, deposit: true }));
  };

  const handleCloseTransfer = () => {
    setModalState(prev => ({ ...prev, transfer: false }));
  };

  const handleCloseDeposit = () => {
    setModalState(prev => ({ ...prev, deposit: false }));
  };

  if (shouldShowConnectWallet) {
    return <Loading title="Loading..." actionText="" />;
  }

  if (modalState.transfer) {
    return (
      <TransferTokens 
        onBack={handleCloseTransfer} 
        address={truncateString(address!)} 
        balance={formattedBalance} 
      />
    );
  }

  return (
    <>
      <MainStack>
        <Balance balance={formattedBalance} />
        
        <QuickAccessActions 
          onSendClick={handleSendClick}
          onReceiveClick={handleReceiveClick}
        />
        
        {browserProvider && (
          <Tokens 
            balance={formattedBalance} 
            provider={browserProvider} 
          />
        )}
      </MainStack>

      <DepositModal 
        isOpen={modalState.deposit}
        onClose={handleCloseDeposit}
        address={address!}
      />
    </>
  );
};