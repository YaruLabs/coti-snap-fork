import React, { useState, useCallback, useEffect } from 'react';
import { BrowserProvider } from '@coti-io/coti-ethers';
import { ImportedToken } from '../../types/token';
import { useTokenOperations } from '../../hooks/useTokenOperations';
import { useSnap } from '../../hooks/SnapContext';
import { useImportedTokens } from '../../hooks/useImportedTokens';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { formatAddressForDisplay } from '../../utils/tokenValidation';
import { truncateBalance } from '../../utils/formatters';
import { 
  TokenDetailsContainer,
  TokenDetailsContent,
  TokenDetailsRow,
  TokenDetailsLabel,
  TokenDetailsValue,
  TokenDetailsLink,
  BalanceContainer,
  BalanceTitle,
  DetailsBackButton,
  TokenBalanceRow,
  TokenBalanceLeft,
  TokenBalanceLogoBox,
  TokenBalanceLogoBig,
  TokenBalanceLogoSmall,
  TokenBalanceName,
  TokenBalanceRight,
  TokenBalanceAmount,
  TokenBalanceSymbol,
  SendButton,
  TokenCircle,
  TokenNameRow,
  TokenNameText,
  AddressBadge,
  AddressCopyButton,
} from './styles';
import ArrowBack from '../../assets/arrow-back.svg';
import CopyIcon from '../../assets/copy.svg';
import CopySuccessIcon from '../../assets/copy-success.svg';

interface TokenDetailModalProps {
  token: ImportedToken | null;
  open: boolean;
  onClose: () => void;
  setActiveTab: React.Dispatch<React.SetStateAction<'tokens' | 'nfts'>>;
  setSelectedToken: React.Dispatch<React.SetStateAction<ImportedToken | null>>;
  provider: BrowserProvider;
  cotiBalance?: string;
  aesKey?: string | null | undefined;
}

const TokenDetails: React.FC<TokenDetailModalProps> = ({ 
  token, 
  open, 
  onClose,
  provider, 
  cotiBalance, 
  aesKey 
}) => {
  const { userAESKey } = useSnap();
  const { decryptERC20Balance } = useTokenOperations(provider);
  const { importedTokens } = useImportedTokens();
  const [decryptedBalance, setDecryptedBalance] = useState<string>('');
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const { copied, copyToClipboard } = useCopyToClipboard();

  const effectiveAESKey = aesKey || userAESKey;

  const decryptBalance = useCallback(async () => {
    if (!token) return;
    if (!token.address) {
      setDecryptedBalance(cotiBalance || '0');
      return;
    }
    if (!effectiveAESKey) {
      setDecryptedBalance('(encrypted)');
      return;
    }
    setIsDecrypting(true);
    try {
      const balance = await decryptERC20Balance(token.address, effectiveAESKey);
      setDecryptedBalance(`${balance}`);
    } catch (error) {
      setDecryptedBalance('(encrypted)');
    } finally {
      setIsDecrypting(false);
    }
  }, [token, effectiveAESKey, decryptERC20Balance, cotiBalance]);

  useEffect(() => {
    if (open && token) {
      decryptBalance();
    }
  }, [open, token, decryptBalance]);

  const handleCopy = useCallback((text: string) => {
    copyToClipboard(text);
  }, [copyToClipboard]);

  const handleSendClick = useCallback(() => {
    setShowSendModal(true);
  }, []);

  const handleCloseSendModal = useCallback(() => {
    setShowSendModal(false);
  }, []);

  if (!open || !token) return null;

  const importedToken = importedTokens.find(
    importedToken => importedToken.address.toLowerCase() === token.address.toLowerCase() ||
    (importedToken.name === token.name && importedToken.symbol === token.symbol)
  );
  
  const tokenAddress = importedToken?.address || token.address;

  const shortAddress = tokenAddress ? formatAddressForDisplay(tokenAddress) : 'Native Token';
  const formattedBalance = isDecrypting ? 'Loading...' : `${decryptedBalance}`;

  return (
    <TokenDetailsContainer>
      <DetailsBackButton onClick={onClose} style={{ marginRight: 12 }}>
        <ArrowBack />
      </DetailsBackButton>

      <BalanceContainer>
        <BalanceTitle>Your balance</BalanceTitle>
        <TokenBalanceRow>
          <TokenBalanceLeft>
            <TokenBalanceLogoBox>
              <TokenBalanceLogoBig>{token.symbol[0]}</TokenBalanceLogoBig>
              <TokenBalanceLogoSmall>{token.symbol[0]}</TokenBalanceLogoSmall>
            </TokenBalanceLogoBox>
            <TokenBalanceName>{token.name}</TokenBalanceName>
          </TokenBalanceLeft>
          <TokenBalanceRight>
            <TokenBalanceAmount title={formattedBalance}>
              {truncateBalance(formattedBalance)}
            </TokenBalanceAmount>
            <TokenBalanceSymbol>{token.symbol}</TokenBalanceSymbol>
          </TokenBalanceRight>
        </TokenBalanceRow>
      </BalanceContainer>

      <TokenDetailsContent>
      <BalanceTitle>Token details</BalanceTitle>
        <TokenDetailsRow>
          <TokenDetailsLabel>Network</TokenDetailsLabel>
          <TokenDetailsValue>
            <TokenNameRow>
              <TokenCircle>C</TokenCircle>
              <TokenNameText>COTI</TokenNameText>
            </TokenNameRow>
        </TokenDetailsValue>
        </TokenDetailsRow>
        {token.symbol !== 'COTI' && (
          <TokenDetailsRow>
            <TokenDetailsLabel>Contract address</TokenDetailsLabel>
            <AddressBadge onClick={() => handleCopy(tokenAddress)}>
              <TokenDetailsLink>
                {shortAddress}
              </TokenDetailsLink>
              <AddressCopyButton>
                {copied ? (
                  <CopySuccessIcon />
                ) : (
                  <CopyIcon />
                )}
              </AddressCopyButton>
            </AddressBadge>
          </TokenDetailsRow>
        )}
        <TokenDetailsRow>
          <TokenDetailsLabel>Token decimals</TokenDetailsLabel>
          <TokenDetailsValue>{token.decimals}</TokenDetailsValue>
        </TokenDetailsRow>
      </TokenDetailsContent>
      <SendButton onClick={handleSendClick}>Send</SendButton>
      
    </TokenDetailsContainer>
  );
};


export default TokenDetails;