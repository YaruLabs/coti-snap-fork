import React, { useState, useCallback, useMemo } from 'react';
import { BrowserProvider } from '@coti-io/coti-ethers';
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

interface ImportedToken {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  balance: string;
}

interface TokensProps {
  balance: string;
  provider: BrowserProvider;
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
  
  return sortedTokens.sort((a, b) => {
    const balanceA = parseFloat(a.balance) || 0;
    const balanceB = parseFloat(b.balance) || 0;
    return balanceB - balanceA;
  });
};

const TokenRowComponent: React.FC<{ 
  token: ImportedToken; 
  index: number; 
}> = React.memo(({ token, index }) => {
  const formattedBalance = useMemo(() => formatBalance(token.balance), [token.balance]);
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
}> = React.memo(({ tokens }) => (
  <TransferContainer>
    {tokens.map((token, index) => (
      <TokenRowComponent 
        key={`${token.address}-${index}`} 
        token={token} 
        index={index} 
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
}> = React.memo(({ onOpenImportNFTModal }) => {
  const handleRefreshList = useCallback(() => {
    console.log('Refresh NFT list');
  }, []);

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

export const Tokens: React.FC<TokensProps> = React.memo(({ balance, provider }) => {
  const [activeTab, setActiveTab] = useState<TabType>('tokens');
  const [sort, setSort] = useState<SortType>('decline');
  const [showImportTokenModal, setShowImportTokenModal] = useState(false);
  const [showImportNFTModal, setShowImportNFTModal] = useState(false);
  const [importedTokens, setImportedTokens] = useState<ImportedToken[]>([]);

  const { userAESKey, userHasAESKey, getAESKey } = useSnap();
  const menuDropdown = useDropdown();
  const sortDropdown = useDropdown();

  const allTokens = useMemo(() => {
    const cotiToken: ImportedToken = {
      address: '',
      name: 'COTI',
      symbol: 'COTI',
      decimals: 18,
      balance: balance || '0',
    };
    return [cotiToken, ...importedTokens];
  }, [balance, importedTokens]);

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

  const handleImportToken = useCallback((token: ImportedToken) => {
    setImportedTokens(prev => [...prev, token]);
  }, []);

  const handleImportTokensClick = useCallback(() => {
    if (userHasAESKey && !userAESKey) {
      getAESKey();
    }
    setShowImportTokenModal(true);
    menuDropdown.close();
  }, [userHasAESKey, userAESKey, getAESKey, menuDropdown]);

  const handleOpenImportNFTModal = useCallback(() => {
    setShowImportNFTModal(true);
  }, []);

  const handleCloseImportTokenModal = useCallback(() => {
    setShowImportTokenModal(false);
  }, []);

  const handleCloseImportNFTModal = useCallback(() => {
    setShowImportNFTModal(false);
  }, []);

  const handleRefreshTokens = useCallback(() => {
    console.log('Refresh token list');
    menuDropdown.close();
  }, [menuDropdown]);

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
          <TokensTabContent 
            tokens={sortedTokens}
            userHasAESKey={userHasAESKey}
            userAESKey={userAESKey}
            getAESKey={getAESKey}
          />
        ) : (
          <NFTsTabContent onOpenImportNFTModal={handleOpenImportNFTModal} />
        )}
      </CenteredTabsWrapper>

      <ImportTokenModal 
        open={showImportTokenModal} 
        onClose={handleCloseImportTokenModal} 
        provider={provider} 
        onImport={handleImportToken} 
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