import React, { useState, useCallback, useMemo } from 'react';
import { BrowserProvider } from '@coti-io/coti-ethers';
import { useImportedTokens } from '../../hooks/useImportedTokens';
import { useTokenOperations } from '../../hooks/useTokenOperations';
import { 
  HeaderBar, 
  NetworkBadge, 
  HeaderActions, 
  CenteredTabsWrapper, 
  TabsWrapper, 
  Tab, 
  TokenRow, 
  TokenInfo, 
  TokenLogos, 
  TokenLogoBig, 
  TokenLogoSmall, 
  TokenName, 
  TokenValues, 
  TokenAmount, 
  NFTGrid, 
  NFTCard, 
  NFTImagePattern, 
  NFTLogo, 
  NFTActionsWrapper, 
  NFTActionButton, 
  IconButton, 
  MenuDropdown, 
  MenuItem, 
  SortDropdown, 
  SortOption 
} from './styles';
import { ContentContainer } from '../styles';
import { TransferContainer } from './styles';
import { ImportTokenModal } from './ImportTokenModal';
import { ImportNFTModal } from './ImportNFTModal';
import { useSnap } from '../../hooks/SnapContext';
import { useDropdown } from '../../hooks/useDropdown';
import { ImportedToken } from '../../types/token';

import {
  DownArrow,
  FilterIcon,
  MenuIcon,
  PlusIcon,
  RefreshIcon,
  NFTImageIcon,
  PlusBlueIcon,
  RefreshBlueIcon
} from '../../assets/icons';


interface TokensProps {
  balance: string;
  provider: BrowserProvider;
  aesKey?: string | null | undefined;
}

type TabType = 'tokens' | 'nfts';
type SortType = 'az' | 'decline';

const MAX_BALANCE_LENGTH = 12;
const NFT_PLACEHOLDER_COUNT = 3;
const NFT_PATTERN_SIZE = 9;

const formatBalance = (balance: string): string => {
  if (!balance) return '0';
  return balance.length > MAX_BALANCE_LENGTH 
    ? `${balance.slice(0, MAX_BALANCE_LENGTH)}...`
    : balance;
};

const sortTokens = (tokens: ImportedToken[], sortType: SortType): ImportedToken[] => {
  const sortedTokens = [...tokens];
  
  if (sortType === 'az') {
    return sortedTokens.sort((a, b) => a.name.localeCompare(b.name));
  }
  
  // For balance sorting, we'll just return alphabetical order since decrypting 
  // all balances would be expensive. Could be enhanced later with caching.
  return sortedTokens.sort((a, b) => a.name.localeCompare(b.name));
};

const TokenRowComponent: React.FC<{ 
  token: ImportedToken; 
  index: number; 
  provider: BrowserProvider;
  cotiBalance?: string | undefined;
  propAESKey?: string | null | undefined;
}> = React.memo(({ token, index, provider, cotiBalance, propAESKey }) => {
  const { userAESKey } = useSnap();
  
  // Use prop AES key if available, otherwise use context AES key
  const effectiveAESKey = propAESKey || userAESKey;
  const { decryptERC20Balance } = useTokenOperations(provider);
  const [decryptedBalance, setDecryptedBalance] = useState<string>('');
  const [isDecrypting, setIsDecrypting] = useState(false);

  const decryptBalance = useCallback(async () => {
    // Special case for COTI native token (address is empty)
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
      // Decrypt balance directly from the blockchain using the token address and AES key
      const balance = await decryptERC20Balance(token.address, effectiveAESKey);
      setDecryptedBalance(`${balance}`);
    } catch (error) {
      console.error('Error decrypting balance:', error);
      setDecryptedBalance('(encrypted)');
    } finally {
      setIsDecrypting(false);
    }
  }, [token.address, effectiveAESKey, decryptERC20Balance, cotiBalance]);

  React.useEffect(() => {
    // Reset state when token changes
    setDecryptedBalance('');
    setIsDecrypting(false);
  }, [token.address]);

  React.useEffect(() => {
    decryptBalance();
  }, [decryptBalance]);


  const formattedBalance = useMemo(() => {
    if (isDecrypting) return 'Loading...';
    return formatBalance(decryptedBalance || '0');
  }, [decryptedBalance, isDecrypting]);

  
  const tokenKey = useMemo(() => 
    token.address || `${token.symbol}-${index}`, 
    [token.address, token.symbol, index]
  );

  return (
    <TokenRow key={tokenKey}>
      <TokenInfo>
        <TokenLogos>
          <TokenLogoBig>{token.symbol[0]}</TokenLogoBig>
          <TokenLogoSmall>{token.symbol[0]}</TokenLogoSmall>
        </TokenLogos>
        <TokenName>{token.name}</TokenName>
      </TokenInfo>
      <TokenValues>
        <TokenAmount>
          {formattedBalance} {token.symbol}
        </TokenAmount>
      </TokenValues>
    </TokenRow>
  );
});

TokenRowComponent.displayName = 'TokenRowComponent';

const TokensTabContent: React.FC<{ 
  tokens: ImportedToken[]; 
  userHasAESKey: boolean;
  userAESKey: string | null; 
  getAESKey: () => void;
  provider: BrowserProvider;
  cotiBalance?: string | undefined;
  propAESKey?: string | null | undefined;
}> = React.memo(({ tokens, provider, cotiBalance, propAESKey }) => (
  <TransferContainer>
    {tokens.map((token, index) => (
      <TokenRowComponent 
        key={`${token.address}-${index}`} 
        token={token} 
        index={index}
        provider={provider}
        cotiBalance={cotiBalance}
        propAESKey={propAESKey}
      />
    ))}
  </TransferContainer>
));

TokensTabContent.displayName = 'TokensTabContent';

const NFTCardComponent: React.FC<{ index: number }> = React.memo(({ index }) => (
  <NFTCard>
    <NFTImagePattern>
      {Array.from({ length: NFT_PATTERN_SIZE }, (_, i) => (
        <span key={i} style={{ margin: 2 }}>
          <NFTImageIcon />
        </span>
      ))}
    </NFTImagePattern>
    <NFTLogo>C</NFTLogo>
  </NFTCard>
));

NFTCardComponent.displayName = 'NFTCardComponent';

const NFTsTabContent: React.FC<{ 
  onOpenImportNFTModal: () => void;
  onRefreshNFTs: () => void;
}> = React.memo(({ onOpenImportNFTModal, onRefreshNFTs }) => {
  const handleRefreshList = useCallback(() => {
    onRefreshNFTs();
  }, [onRefreshNFTs]);

  const containerStyle = useMemo(() => ({
    boxShadow: 'none', 
    padding: '0', 
    background: 'none', 
    width: '100%', 
    maxWidth: '100%'
  }), []);

  return (
    <ContentContainer style={containerStyle}>
      <NFTGrid>
        {Array.from({ length: NFT_PLACEHOLDER_COUNT }, (_, index) => (
          <NFTCardComponent key={index} index={index} />
        ))}
      </NFTGrid>
      <NFTActionsWrapper>
        <NFTActionButton onClick={onOpenImportNFTModal}>
          <PlusBlueIcon />
          Import NFT
        </NFTActionButton>
        <NFTActionButton onClick={handleRefreshList}>
          <RefreshBlueIcon />
          Refresh list
        </NFTActionButton>
      </NFTActionsWrapper>
    </ContentContainer>
  );
});

NFTsTabContent.displayName = 'NFTsTabContent';

const SortOptions: React.FC<{
  sort: SortType;
  onSortChange: (sort: SortType) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}> = React.memo(({ sort, onSortChange, dropdownRef }) => (
  <SortDropdown ref={dropdownRef}>
    <SortOption
      selected={sort === 'az'}
      onClick={() => onSortChange('az')}
      type="button"
    >
      Alphabetically (A-Z)
    </SortOption>
    <SortOption
      selected={sort === 'decline'}
      onClick={() => onSortChange('decline')}
      type="button"
    >
      Declining balance ($ high-low)
    </SortOption>
  </SortDropdown>
));

SortOptions.displayName = 'SortOptions';

const MenuOptions: React.FC<{
  onImportTokens: () => void;
  onRefreshTokens: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}> = React.memo(({ onImportTokens, onRefreshTokens, dropdownRef }) => (
  <MenuDropdown ref={dropdownRef}>
    <MenuItem onClick={onImportTokens} type="button">
      <PlusIcon /> Import tokens
    </MenuItem>
    <MenuItem onClick={onRefreshTokens} type="button">
      <RefreshIcon /> Refresh list
    </MenuItem>
  </MenuDropdown>
));

MenuOptions.displayName = 'MenuOptions';

export const Tokens: React.FC<TokensProps> = React.memo(({ balance, provider, aesKey }) => {
  const [activeTab, setActiveTab] = useState<TabType>('tokens');
  const [sort, setSort] = useState<SortType>('decline');
  const [showImportTokenModal, setShowImportTokenModal] = useState(false);
  const [showImportNFTModal, setShowImportNFTModal] = useState(false);

  const { userAESKey, userHasAESKey, getAESKey } = useSnap();
  const { importedTokens, isLoading, refreshTokens } = useImportedTokens();
  const menuDropdown = useDropdown();
  const sortDropdown = useDropdown();


  const allTokens = useMemo(() => {
    const cotiToken: ImportedToken = {
      address: '',
      name: 'COTI',
      symbol: 'COTI',
      decimals: 18,
    };
    return [cotiToken, ...importedTokens];
  }, [importedTokens]);

  const sortedTokens = useMemo(() => 
    sortTokens(allTokens, sort), 
    [allTokens, sort]
  );

  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab);
  }, []);

  const handleSortChange = useCallback((newSort: SortType) => {
    setSort(newSort);
    sortDropdown.close();
  }, [sortDropdown]);


  const handleImportTokensClick = useCallback(() => {
    setShowImportTokenModal(true);
    menuDropdown.close();
  }, [menuDropdown]);

  const handleOpenImportNFTModal = useCallback(() => {
    setShowImportNFTModal(true);
  }, []);

  const handleCloseImportTokenModal = useCallback(() => {
    setShowImportTokenModal(false);
  }, []);

  const handleTokenImport = useCallback((_importedToken: ImportedToken) => {
    // The token is already added by the modal, just refresh the list
    refreshTokens();
  }, [refreshTokens]);

  const handleCloseImportNFTModal = useCallback(() => {
    setShowImportNFTModal(false);
  }, []);

  const handleRefreshTokens = useCallback(() => {
    refreshTokens();
    menuDropdown.close();
  }, [refreshTokens, menuDropdown]);

  const headerActionsStyle = useMemo(() => ({ position: 'relative' as const }), []);

  return (
    <>
      <CenteredTabsWrapper>
        <TabsWrapper>
          <Tab
            active={activeTab === 'tokens'}
            onClick={() => handleTabChange('tokens')}
            type="button"
          >
            Tokens
          </Tab>
          <Tab
            active={activeTab === 'nfts'}
            onClick={() => handleTabChange('nfts')}
            type="button"
          >
            NFTs
          </Tab>
        </TabsWrapper>

        <HeaderBar>
          <NetworkBadge>
            COTI TESTNET <DownArrow />
          </NetworkBadge>
          <HeaderActions style={headerActionsStyle}>
            <IconButton 
              onClick={sortDropdown.toggle} 
              selected={sortDropdown.isOpen}
              type="button"
              aria-label="Sort options"
            >
              <FilterIcon />
            </IconButton>
            <IconButton 
              onClick={menuDropdown.toggle} 
              selected={menuDropdown.isOpen}
              type="button"
              aria-label="Menu options"
            >
              <MenuIcon />
            </IconButton>
            
            {menuDropdown.isOpen && activeTab === 'tokens' && (
              <MenuOptions
                onImportTokens={handleImportTokensClick}
                onRefreshTokens={handleRefreshTokens}
                dropdownRef={menuDropdown.ref}
              />
            )}
            
            {sortDropdown.isOpen && (
              <SortOptions
                sort={sort}
                onSortChange={handleSortChange}
                dropdownRef={sortDropdown.ref}
              />
            )}
          </HeaderActions>
        </HeaderBar>

        {activeTab === 'tokens' ? (
          isLoading ? (
            <TransferContainer>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                Loading tokens...
              </div>
            </TransferContainer>
          ) : (
            <TokensTabContent 
              tokens={sortedTokens}
              userHasAESKey={userHasAESKey}
              userAESKey={userAESKey}
              getAESKey={getAESKey}
              provider={provider}
              cotiBalance={balance}
              propAESKey={aesKey}
            />
          )
        ) : (
          <NFTsTabContent 
            onOpenImportNFTModal={handleOpenImportNFTModal} 
            onRefreshNFTs={refreshTokens}
          />
        )}
      </CenteredTabsWrapper>

      <ImportTokenModal 
        open={showImportTokenModal} 
        onClose={handleCloseImportTokenModal} 
        provider={provider}
        onImport={handleTokenImport}
      />
      <ImportNFTModal 
        open={showImportNFTModal} 
        onClose={handleCloseImportNFTModal} 
        provider={provider} 
      />
    </>
  );
});

Tokens.displayName = 'Tokens';