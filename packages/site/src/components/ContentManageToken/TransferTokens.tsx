import React, { useState, useRef, useCallback, useMemo } from 'react';
import { BrowserProvider } from '@coti-io/coti-ethers';
import { ContentTitle } from '../styles';
import { IconButton, TransferContainer } from './styles';
import {
  HeaderBar,
  TokenRow,
  TokenInfo,
  TokenName,
  TokenLogos,
  TokenLogoBig,
  TokenLogoSmall,
  SendAmount
} from './styles';
import { Alert } from './Alert';
import {
  SectionTitle,
  AccountBox,
  AccountIcon,
  AccountDetails,
  AccountAddress,
  InputBox,
  AddressInput,
  AmountInput,
  BottomActions,
  CancelButton,
  ContinueButton,
  HeaderBarSlotLeft,
  HeaderBarSlotTitle,
  HeaderBarSlotRight,
  BalanceRow,
  BalanceSub,
  MaxButton,
  TokenRowFlex,
  ArrowDownStyled,
  ClearIconButton,
  CloseButton,
  TokenModalBackdrop,
  TokenModalContainer,
  TokenModalHeader,
  TokenModalClose,
  TokenTabs,
  TokenTab,
  TokenSearchBox,
  TokenSearchInput,
  TokenList,
  TokenListItemBar,
  TokenListItem,
  TokenListInfo,
  TokenListName,
  TokenListSymbol,
  TokenListAmount,
  TokenListValue,
  NoNFTsWrapper,
  NoNFTsText,
  LearnMoreLink
} from './TransferTokens.styles';
import { useTokenOperations } from '../../hooks/useTokenOperations';
import { useMetaMaskContext } from '../../hooks/MetamaskContext';
import { normalizeAddress } from '../../utils/normalizeAddress';
import { truncateString } from '../../utils';
import ArrowBack from '../../assets/arrow-back.svg';
import XIcon from '../../assets/x.svg';

interface TransferTokensProps {
  onBack: () => void;
  address: string;
  balance: string;
}

interface Token {
  symbol: string;
  name: string;
  amount: number;
  usd: number;
}

type AddressStatus = 'idle' | 'loading' | 'error';
type TokenTab = 'tokens' | 'nfts';
type TransactionStatus = 'idle' | 'loading' | 'success' | 'error';

const ADDRESS_VALIDATION_DELAY = 800;

const validateAddress = (address: string): boolean => {
  const normalized = normalizeAddress(address);
  return !!normalized;
};

const parseAmount = (amount: string): number => {
  return parseFloat(amount) || 0;
};

const useAddressValidation = () => {
  const [status, setStatus] = useState<AddressStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [isValid, setIsValid] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const validate = useCallback((address: string) => {
    if (!address) {
      setStatus('idle');
      setErrorMsg('');
      setIsValid(false);
      return;
    }

    setStatus('loading');
    setErrorMsg('');
    setIsValid(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (validateAddress(address)) {
        setStatus('idle');
        setErrorMsg('');
        setIsValid(true);
      } else {
        setStatus('error');
        setErrorMsg('Invalid address');
        setIsValid(false);
      }
    }, ADDRESS_VALIDATION_DELAY);
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setErrorMsg('');
    setIsValid(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  return { status, errorMsg, isValid, validate, reset };
};

const TokenModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  tokens: Token[];
}> = React.memo(({ isOpen, onClose, tokens }) => {
  const [tokenTab, setTokenTab] = useState<TokenTab>('tokens');
  const [search, setSearch] = useState('');
  const [searchActive, setSearchActive] = useState(false);

  const handleTabChange = useCallback((tab: TokenTab) => {
    setTokenTab(tab);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleSearchFocus = useCallback(() => {
    setSearchActive(true);
  }, []);

  const handleSearchBlur = useCallback(() => {
    setSearchActive(false);
  }, []);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <TokenModalBackdrop onClick={handleBackdropClick}>
      <TokenModalContainer onClick={e => e.stopPropagation()}>
        <TokenModalHeader>
          Select asset to send
          <TokenModalClose onClick={onClose} aria-label="Close">×</TokenModalClose>
        </TokenModalHeader>
        
        <TokenTabs>
          <TokenTab 
            active={tokenTab === 'tokens'} 
            onClick={() => handleTabChange('tokens')}
            type="button"
          >
            Tokens
          </TokenTab>
          <TokenTab 
            active={tokenTab === 'nfts'} 
            onClick={() => handleTabChange('nfts')}
            type="button"
          >
            NFTs
          </TokenTab>
        </TokenTabs>
        
        <TokenSearchBox className={searchActive || (search && search.length > 0) ? 'active' : ''}>
          <svg width="18" height="18" fill="none" stroke="#000" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <TokenSearchInput
            placeholder="Search tokens by name or address"
            value={search}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          />
        </TokenSearchBox>
        
        <TokenList>
          {tokenTab === 'tokens' ? (
            tokens.map((token, idx) => (
              <TokenListItem key={token.symbol} selected={idx === 0} type="button">
                {idx === 0 && <TokenListItemBar />}
                <TokenLogos>
                  <TokenLogoBig>C</TokenLogoBig>
                  <TokenLogoSmall>C</TokenLogoSmall>
                </TokenLogos>
                <TokenListInfo>
                  <TokenListName>{token.name}</TokenListName>
                  <TokenListSymbol>{token.symbol}</TokenListSymbol>
                </TokenListInfo>
                <TokenListAmount>
                  <TokenListValue>{token.amount} {token.symbol}</TokenListValue>
                </TokenListAmount>
              </TokenListItem>
            ))
          ) : (
            <NoNFTsWrapper>
              <NoNFTsText>No NFTs yet</NoNFTsText>
              <LearnMoreLink 
                href="https://support.metamask.io/manage-crypto/nfts/nft-tokens-in-your-metamask-wallet" 
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more
              </LearnMoreLink>
            </NoNFTsWrapper>
          )}
        </TokenList>
      </TokenModalContainer>
    </TokenModalBackdrop>
  );
});

TokenModal.displayName = 'TokenModal';

export const TransferTokens: React.FC<TransferTokensProps> = React.memo(({ 
  onBack, 
  address, 
  balance 
}) => {
  const [addressInput, setAddressInput] = useState('');
  const [amount, setAmount] = useState('');
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [txStatus, setTxStatus] = useState<TransactionStatus>('idle');
  const [txError, setTxError] = useState<string | null>(null);

  const accountBoxRef = useRef<HTMLDivElement>(null);

  const { provider } = useMetaMaskContext();
  const addressValidation = useAddressValidation();

  const browserProvider = useMemo(() => {
    if (!provider) return null;
    return new BrowserProvider(provider as any);
  }, [provider]);

  const tokenOps = browserProvider ? useTokenOperations(browserProvider) : null;

  const tokens: Token[] = useMemo(() => [
    { symbol: 'COTI', name: 'COTI', amount: 0, usd: 0 }
  ], []);

  const balanceNum = useMemo(() => parseAmount(balance), [balance]);
  const amountNum = useMemo(() => parseAmount(amount), [amount]);
  const insufficientFunds = useMemo(() => amountNum > balanceNum, [amountNum, balanceNum]);
  const isAmountValid = useMemo(() => 
    !!amount && !isNaN(amountNum) && amountNum > 0 && amountNum <= balanceNum,
    [amount, amountNum, balanceNum]
  );

  const canContinue = useMemo(() => 
    addressValidation.isValid && isAmountValid && txStatus !== 'loading',
    [addressValidation.isValid, isAmountValid, txStatus]
  );

  const handleAddressChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = e.target.value;
    setAddressInput(newAddress);
    addressValidation.validate(newAddress);
  }, [addressValidation]);

  const handleAddressBlur = useCallback(() => {
    if (!addressInput) return;
    addressValidation.validate(addressInput);
  }, [addressInput, addressValidation]);

  const handleClearAddress = useCallback(() => {
    setAddressInput('');
    addressValidation.reset();
  }, [addressValidation]);

  const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  }, []);

  const handleSetMaxAmount = useCallback(() => {
    setAmount(balance || '0');
  }, [balance]);

  const handleClearAmount = useCallback(() => {
    setAmount('');
  }, []);

  const handleOpenTokenModal = useCallback(() => {
    setShowTokenModal(true);
  }, []);

  const handleCloseTokenModal = useCallback(() => {
    setShowTokenModal(false);
  }, []);

  const handleContinue = useCallback(async () => {
    if (!provider || !canContinue || !tokenOps) return;

    setTxStatus('loading');
    setTxError(null);

    try {
      const success = await tokenOps.transferCOTI({ 
        to: addressInput, 
        amount 
      });

      if (success) {
        setTxStatus('success');
        onBack();
      } else {
        setTxStatus('error');
        setTxError(tokenOps.error || 'Error transferring COTI');
      }
    } catch (error: any) {
      setTxStatus('error');
      setTxError(error.message || 'Error transferring COTI');
    }
  }, [provider, canContinue, tokenOps, addressInput, amount, onBack]);

  const handleCancel = useCallback(() => {
    onBack();
  }, [onBack]);

  return (
    <TransferContainer>
      <HeaderBar>
        <HeaderBarSlotLeft>
          <IconButton onClick={onBack} type="button" aria-label="Go back">
            <ArrowBack />
          </IconButton>
        </HeaderBarSlotLeft>
        <HeaderBarSlotTitle>
          <ContentTitle>Send</ContentTitle>
        </HeaderBarSlotTitle>
        <HeaderBarSlotRight />
      </HeaderBar>

      <SectionTitle>From</SectionTitle>
      <AccountBox>
        <AccountIcon />
        <AccountDetails>
          <AccountAddress>{address}</AccountAddress>
        </AccountDetails>
      </AccountBox>

      {addressValidation.isValid && (
        <>
          <AccountBox ref={accountBoxRef}>
            <TokenRowFlex>
              <TokenInfo onClick={handleOpenTokenModal}>
                <TokenLogos>
                  <TokenLogoBig>C</TokenLogoBig>
                  <TokenLogoSmall>C</TokenLogoSmall>
                </TokenLogos>
                <TokenName>COTI</TokenName>
                <ArrowDownStyled />
              </TokenInfo>
              <SendAmount>
                <AmountInput
                  type="number"
                  min="0"
                  placeholder="0"
                  value={amount}
                  onChange={handleAmountChange}
                />
                COTI
              </SendAmount>
            </TokenRowFlex>
          </AccountBox>
          
          <BalanceRow>
            <BalanceSub error={insufficientFunds}>
              Balance: {balance}
              {insufficientFunds && (
                <span style={{ color: '#e53935', marginLeft: 8 }}>
                  Insufficient funds
                </span>
              )}
            </BalanceSub>
            {amount === balance && amount !== '' ? (
              <MaxButton onClick={handleClearAmount} type="button">
                Clear
              </MaxButton>
            ) : (
              <MaxButton onClick={handleSetMaxAmount} type="button">
                Max
              </MaxButton>
            )}
          </BalanceRow>
        </>
      )}

      <SectionTitle>To</SectionTitle>
      {!addressValidation.isValid && (
        <InputBox>
          <AddressInput
            placeholder="Enter public address (0x) or domain name"
            value={addressInput}
            onChange={handleAddressChange}
            onBlur={handleAddressBlur}
          />
        </InputBox>
      )}

      {addressValidation.isValid && (
        <AccountBox>
          <AccountIcon />
          <AccountDetails>
            <AccountAddress>{truncateString(addressInput)}</AccountAddress>
          </AccountDetails>
          <ClearIconButton
            onClick={handleClearAddress}
            aria-label="Clear address"
            type="button"
          >
            <CloseButton>
              <XIcon />
            </CloseButton>
          </ClearIconButton>
        </AccountBox>
      )}

      {addressValidation.isValid && (
        <AccountBox>
          <TokenRowFlex>
            <TokenInfo>
              <TokenLogos>
                <TokenLogoBig>C</TokenLogoBig>
                <TokenLogoSmall>C</TokenLogoSmall>
              </TokenLogos>
              <TokenName>COTI</TokenName>
            </TokenInfo>
            <SendAmount>
              {amount || '0'} COTI
            </SendAmount>
          </TokenRowFlex>
        </AccountBox>
      )}

      {addressValidation.status === 'loading' && addressInput && (
        <Alert type="loading">Loading...</Alert>
      )}
      
      {addressValidation.status === 'error' && addressInput && (
        <Alert type="error">No resolution for domain provided</Alert>
      )}

      <BottomActions>
        <CancelButton onClick={handleCancel} type="button">
          Cancel
        </CancelButton>
        <ContinueButton 
          disabled={!canContinue} 
          onClick={handleContinue}
          type="button"
        >
          {txStatus === 'loading' ? 'Sending...' : 'Continue'}
        </ContinueButton>
      </BottomActions>

      <TokenModal
        isOpen={showTokenModal}
        onClose={handleCloseTokenModal}
        tokens={tokens}
      />
    </TransferContainer>
  );
});

TransferTokens.displayName = 'TransferTokens';