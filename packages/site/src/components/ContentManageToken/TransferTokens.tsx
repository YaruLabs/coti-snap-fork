import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { BrowserProvider } from '@coti-io/coti-ethers';
import { ContentTitle } from '../styles';
import { IconButton, SendButton, TransferContainer } from './styles';
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
import { useImportedTokens } from '../../hooks/useImportedTokens';
import { JazziconComponent } from '../common';
import ArrowBack from '../../assets/arrow-back.svg';
import XIcon from '../../assets/x.svg';
import SearchIcon from '../../assets/icons/search.svg';

interface TransferTokensProps {
  onBack: () => void;
  address: string;
  balance: string;
  aesKey?: string | null | undefined;
}

interface Token {
  symbol: string;
  name: string;
  amount: string;
  usd: number;
  address?: string;
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

const TokenBalanceDisplay: React.FC<{
  token: Token;
  getTokenBalance: (token: Token) => Promise<string>;
}> = React.memo(({ token, getTokenBalance }) => {
  const [balance, setBalance] = useState<string>(token.amount);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (token.amount === '0' && !loading) {
      setLoading(true);
      getTokenBalance(token).then(result => {
        setBalance(result);
        setLoading(false);
      }).catch(() => {
        setBalance('0');
        setLoading(false);
      });
    } else {
      setBalance(token.amount);
    }
  }, [token, getTokenBalance, loading]);

  if (loading) {
    return <TokenListValue>Loading...</TokenListValue>;
  }

  return <TokenListValue>{balance} {token.symbol}</TokenListValue>;
});

TokenBalanceDisplay.displayName = 'TokenBalanceDisplay';

const TokenModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  tokens: Token[];
  onTokenSelect: (token: Token) => void;
  selectedToken: Token | null;
  getTokenBalance: (token: Token) => Promise<string>;
}> = React.memo(({ isOpen, onClose, tokens, onTokenSelect, selectedToken, getTokenBalance }) => {
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

  const handleTokenSelect = useCallback((token: Token) => {
    onTokenSelect(token);
    onClose();
  }, [onTokenSelect, onClose]);

  // Filter tokens based on search query
  const filteredTokens = useMemo(() => {
    if (!search || search.trim() === '') {
      return tokens;
    }

    const searchTerm = search.toLowerCase().trim();
    
    return tokens.filter(token => {
      // Search by token name (partial match)
      const nameMatch = token.name.toLowerCase().includes(searchTerm);
      
      // Search by token symbol (partial match)
      const symbolMatch = token.symbol.toLowerCase().includes(searchTerm);
      
      // Search by token address (if exists)
      let addressMatch = false;
      if (token.address) {
        // For address searches, be more flexible
        if (searchTerm.startsWith('0x')) {
          // If search starts with 0x, match exactly
          addressMatch = token.address.toLowerCase().startsWith(searchTerm);
        } else {
          // Otherwise, allow partial matches in the address
          addressMatch = token.address.toLowerCase().includes(searchTerm);
        }
      }
      
      return nameMatch || symbolMatch || addressMatch;
    });
  }, [tokens, search]);

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
          <SearchIcon />
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
            filteredTokens.length > 0 ? (
              filteredTokens.map((token, idx) => {
                const isSelected = selectedToken?.symbol === token.symbol || (idx === 0 && !selectedToken && !search);
                return (
                  <TokenListItem 
                    key={token.symbol} 
                    selected={isSelected} 
                    type="button"
                    onClick={() => handleTokenSelect(token)}
                  >
                    {isSelected && <TokenListItemBar />}
                    <TokenLogos>
                      <TokenLogoBig>{token.symbol[0]}</TokenLogoBig>
                      <TokenLogoSmall>{token.symbol[0]}</TokenLogoSmall>
                    </TokenLogos>
                    <TokenListInfo>
                      <TokenListName>{token.name}</TokenListName>
                      <TokenListSymbol>{token.symbol}</TokenListSymbol>
                    </TokenListInfo>
                    <TokenListAmount>
                      <TokenBalanceDisplay token={token} getTokenBalance={getTokenBalance} />
                    </TokenListAmount>
                  </TokenListItem>
                );
              })
            ) : (
              <NoNFTsWrapper>
                <NoNFTsText>No token found</NoNFTsText>
              </NoNFTsWrapper>
            )
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
  balance,
  aesKey 
}) => {
  console.log('TransferTokens - AES Key:', aesKey);
  const [addressInput, setAddressInput] = useState('');
  const [amount, setAmount] = useState('');
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [currentBalance, setCurrentBalance] = useState<string>(balance);
  const [loadingBalance, setLoadingBalance] = useState(false);
  const [loadedTokenAddress, setLoadedTokenAddress] = useState<string>('');
  const [tokenBalances, setTokenBalances] = useState<Record<string, string>>({});
  const [txStatus, setTxStatus] = useState<TransactionStatus>('idle');
  const [txError, setTxError] = useState<string | null>(null);
  const { getERC20TokensList } = useImportedTokens();

  const accountBoxRef = useRef<HTMLDivElement>(null);

  const { provider } = useMetaMaskContext();
  const addressValidation = useAddressValidation();

  const browserProvider = useMemo(() => {
    if (!provider) return null;
    return new BrowserProvider(provider as any);
  }, [provider]);

  const tokenOps = browserProvider ? useTokenOperations(browserProvider) : null;

  const tokens: Token[] = useMemo(() => {
    const erc20Tokens = getERC20TokensList();
    const cotiTokenKey = 'COTI-';
    const cotiToken = { 
      symbol: 'COTI', 
      name: 'COTI', 
      amount: tokenBalances[cotiTokenKey] || balance || '0', 
      usd: 0, 
      address: '' 
    };
    
    const importedTokensFormatted = erc20Tokens.map(token => {
      const tokenKey = `${token.symbol}-${token.address}`;
      return {
        symbol: token.symbol,
        name: token.name,
        amount: tokenBalances[tokenKey] || '0',
        usd: 0,
        address: token.address
      };
    });

    const allTokens = [cotiToken, ...importedTokensFormatted];
    
    // If a token is selected, move it to the front
    if (selectedToken) {
      const otherTokens = allTokens.filter(t => t.symbol !== selectedToken.symbol);
      return [selectedToken, ...otherTokens];
    }
    
    return allTokens;
  }, [getERC20TokensList, selectedToken, tokenBalances, balance]);

  // Initialize with COTI as default selected token
  const currentToken = selectedToken || tokens[0] || { symbol: 'COTI', name: 'COTI', amount: '0', usd: 0 };

  const balanceNum = useMemo(() => parseAmount(currentBalance), [currentBalance]);
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
    setAmount(currentBalance || '0');
  }, [currentBalance]);

  const handleClearAmount = useCallback(() => {
    setAmount('');
  }, []);

  const handleOpenTokenModal = useCallback(() => {
    setShowTokenModal(true);
  }, []);

  const handleCloseTokenModal = useCallback(() => {
    setShowTokenModal(false);
  }, []);

  // Function to get balance for a specific token (for modal display)
  const getTokenBalance = useCallback(async (token: Token): Promise<string> => {
    if (!browserProvider || !tokenOps) return '0';
    
    const tokenKey = `${token.symbol}-${token.address || ''}`;
    
    // Return cached balance if available
    if (tokenBalances[tokenKey]) {
      return tokenBalances[tokenKey];
    }
    
    try {
      let tokenBalance: string;
      
      if (token.symbol === 'COTI' || !token.address) {
        tokenBalance = balance;
      } else {
        const result = await tokenOps.decryptERC20Balance(token.address, aesKey || '');
        tokenBalance = result.toString();
      }
      
      // Cache the balance
      setTokenBalances(prev => ({
        ...prev,
        [tokenKey]: tokenBalance
      }));
      
      return tokenBalance;
    } catch (error) {
      console.error('Error fetching token balance for modal:', error);
      return '0';
    }
  }, [browserProvider, tokenOps, balance, aesKey, tokenBalances]);

  const fetchTokenBalance = useCallback(async (token: Token) => {
    if (!browserProvider || !tokenOps) return;
    
    console.log('fetchTokenBalance - Token:', token.symbol, 'Address:', token.address, 'AES Key:', aesKey);
    setLoadingBalance(true);
    try {
      if (token.symbol === 'COTI' || !token.address) {
        // For COTI (native token), use the provided balance
        console.log('Using COTI balance:', balance);
        setCurrentBalance(balance);
      } else {
        // For ERC20 tokens, fetch the balance
        console.log('Fetching ERC20 balance for:', token.address, 'with AES key:', aesKey);
        const tokenBalance = await tokenOps.decryptERC20Balance(token.address, aesKey || '');
        console.log('Received token balance:', tokenBalance);
        setCurrentBalance(tokenBalance.toString());
      }
    } catch (error) {
      console.error('Error fetching token balance:', error);
      setCurrentBalance('0');
    } finally {
      setLoadingBalance(false);
    }
  }, [browserProvider, tokenOps, balance, aesKey]);

  const handleTokenSelect = useCallback((token: Token) => {
    setSelectedToken(token);
    setAmount(''); // Clear amount when changing tokens
    setLoadedTokenAddress(''); // Reset to force reload of balance
    fetchTokenBalance(token);
  }, [fetchTokenBalance]);

  // Initialize balance when component mounts or when current token changes
  useEffect(() => {
    const tokenKey = `${currentToken?.symbol || 'COTI'}-${currentToken?.address || ''}`;
    
    // Only load balance if we haven't loaded this token before or if it's different
    if (currentToken && browserProvider && tokenOps && loadedTokenAddress !== tokenKey) {
      const loadBalance = async () => {
        console.log('useEffect - Loading balance for token:', currentToken.symbol);
        setLoadingBalance(true);
        try {
          if (currentToken.symbol === 'COTI' || !currentToken.address) {
            console.log('Using COTI balance:', balance);
            setCurrentBalance(balance);
          } else {
            console.log('Fetching ERC20 balance for:', currentToken.address, 'with AES key:', aesKey);
            const tokenBalance = await tokenOps.decryptERC20Balance(currentToken.address, aesKey || '');
            console.log('Received token balance:', tokenBalance);
            setCurrentBalance(tokenBalance.toString());
          }
          setLoadedTokenAddress(tokenKey);
        } catch (error) {
          console.error('Error fetching token balance:', error);
          setCurrentBalance('0');
          setLoadedTokenAddress(tokenKey);
        } finally {
          setLoadingBalance(false);
        }
      };
      
      loadBalance();
    }
  }, [currentToken?.symbol, currentToken?.address, browserProvider, tokenOps, balance, aesKey, loadedTokenAddress]);

  const handleContinue = useCallback(async () => {
    if (!provider || !canContinue || !tokenOps) return;

    setTxStatus('loading');
    setTxError(null);

    try {
      let success = false;
      
      if (currentToken.symbol === 'COTI' || !currentToken.address) {
        // Transfer native COTI
        success = await tokenOps.transferCOTI({ 
          to: addressInput, 
          amount 
        });
      } else {
        // Transfer ERC20 token
        success = await tokenOps.transferERC20({
          tokenAddress: currentToken.address,
          to: addressInput,
          amount
        });
      }

      if (success) {
        setTxStatus('success');
        // Refresh balance after successful transfer
        fetchTokenBalance(currentToken);
        onBack();
      } else {
        setTxStatus('error');
        setTxError(tokenOps.error || `Error transferring ${currentToken.symbol}`);
      }
    } catch (error: any) {
      setTxStatus('error');
      setTxError(error.message || `Error transferring ${currentToken.symbol}`);
    }
  }, [provider, canContinue, tokenOps, addressInput, amount, currentToken, fetchTokenBalance, onBack]);

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
        <JazziconComponent address={address} />
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
                  <TokenLogoBig>{currentToken.symbol[0]}</TokenLogoBig>
                  <TokenLogoSmall>{currentToken.symbol[0]}</TokenLogoSmall>
                </TokenLogos>
                <TokenName>{currentToken.symbol}</TokenName>
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
                {currentToken.symbol}
              </SendAmount>
            </TokenRowFlex>
          </AccountBox>
          
          <BalanceRow>
            <BalanceSub error={insufficientFunds}>
              {loadingBalance ? 'Loading balance...' : `Balance: ${currentBalance}`}
              {insufficientFunds && (
                <span style={{ color: '#e53935', marginLeft: 8 }}>
                  Insufficient funds
                </span>
              )}
            </BalanceSub>
            {amount === currentBalance && amount !== '' ? (
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
          <JazziconComponent address={addressInput} />
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
                <TokenLogoBig>{currentToken.symbol[0]}</TokenLogoBig>
                <TokenLogoSmall>{currentToken.symbol[0]}</TokenLogoSmall>
              </TokenLogos>
              <TokenName>{currentToken.name}</TokenName>
            </TokenInfo>
            <SendAmount>
              {amount || '0'} {currentToken.symbol}
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
        <SendButton 
          onClick={handleCancel} 
          type="button"
          backgroundColor="#fff"
          textColor="#4664ff"
        >
          Cancel
        </SendButton>
        <SendButton 
          disabled={!canContinue} 
          onClick={handleContinue}
          type="button"
          backgroundColor="#4664ff"
          textColor="#fff"
        >
          {txStatus === 'loading' ? 'Sending...' : 'Continue'}
        </SendButton>
      </BottomActions>

      <TokenModal
        isOpen={showTokenModal}
        onClose={handleCloseTokenModal}
        tokens={tokens}
        onTokenSelect={handleTokenSelect}
        selectedToken={selectedToken}
        getTokenBalance={getTokenBalance}
      />
    </TransferContainer>
  );
});

TransferTokens.displayName = 'TransferTokens';