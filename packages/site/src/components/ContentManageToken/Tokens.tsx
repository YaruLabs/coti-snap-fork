import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { HeaderBar, NetworkBadge, HeaderActions, CenteredTabsWrapper, TabsWrapper, Tab, TokenRow, TokenInfo, TokenLogos, TokenLogoBig, TokenLogoSmall, TokenName, TokenValues, TokenUsd, TokenAmount, NFTGrid, NFTCard, NFTImagePattern, NFTLogo, NFTActionsWrapper, NFTActionButton, IconButton, MenuDropdown, MenuItem, SortDropdown, SortOption} from "./styles";   
import { ContentContainer } from "../styles";

const DownArrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8a8f98" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
);

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#18191d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
);

const MenuIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#18191d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
);

const PlusIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#18191d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

const RefreshIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#18191d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0114.13-3.36L23 10"></path><path d="M20.49 15a9 9 0 01-14.13 3.36L1 14"></path></svg>
);

const TokensTabContent = () => {
  return (
    <ContentContainer style={{boxShadow:'none', padding:'0', background:'none', width:'100%', maxWidth:'100%'}}>
      <TokenRow>
        <TokenInfo>
          <TokenLogos>
            <TokenLogoBig>C</TokenLogoBig>
            <TokenLogoSmall>C</TokenLogoSmall>
          </TokenLogos>
          <TokenName>COTI</TokenName>
        </TokenInfo>
        <TokenValues>
          <TokenUsd>&lt;$0.01</TokenUsd>
          <TokenAmount>0.03171 COTI</TokenAmount>
        </TokenValues>
      </TokenRow>
    </ContentContainer>
  );
};

const NFTImageIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cfd2d6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
);

const PlusBlueIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3559ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

const RefreshBlueIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3559ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0114.13-3.36L23 10"></path><path d="M20.49 15a9 9 0 01-14.13 3.36L1 14"></path></svg>
);

const NFTsTabContent = () => {
  return (
    <ContentContainer style={{boxShadow:'none', padding:'0', background:'none', width:'100%', maxWidth:'100%'}}>
      <NFTGrid>
        {[1,2,3].map((n) => (
          <NFTCard key={n}>
            <NFTImagePattern>
              {[...Array(9)].map((_,i) => <span key={i} style={{margin:2}}><NFTImageIcon /></span>)}
            </NFTImagePattern>
            <NFTLogo>C</NFTLogo>
          </NFTCard>
        ))}
      </NFTGrid>
      <NFTActionsWrapper>
        <NFTActionButton><PlusBlueIcon />Import NFT</NFTActionButton>
        <NFTActionButton><RefreshBlueIcon />Refresh list</NFTActionButton>
      </NFTActionsWrapper>
    </ContentContainer>
  );
};

export const Tokens = () => {
  const [activeTab, setActiveTab] = useState<'tokens' | 'nfts'>('tokens');
  const [menuOpen, setMenuOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState<'az' | 'decline'>('decline');
  const menuRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
    }
    if (menuOpen || sortOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen, sortOpen]);

  return (
    <>
      <CenteredTabsWrapper>
        <TabsWrapper>
          <Tab
            active={activeTab === 'tokens'}
            onClick={() => setActiveTab('tokens')}
          >
            Tokens
          </Tab>
          <Tab
            active={activeTab === 'nfts'}
            onClick={() => setActiveTab('nfts')}
          >
            NFTs
          </Tab>
        </TabsWrapper>

        <HeaderBar>
          <NetworkBadge>
            COTI TESTNET <DownArrow />
          </NetworkBadge>
          <HeaderActions style={{position:'relative'}}>
            <IconButton onClick={() => setSortOpen((v) => !v)} selected={sortOpen}><FilterIcon /></IconButton>
            <IconButton onClick={() => setMenuOpen((v) => !v)} selected={menuOpen}><MenuIcon /></IconButton>
            {menuOpen && (
              <MenuDropdown ref={menuRef}>
                <MenuItem><PlusIcon />Import tokens</MenuItem>
                <MenuItem><RefreshIcon />Refresh list</MenuItem>
              </MenuDropdown>
            )}
            {sortOpen && (
              <SortDropdown ref={sortRef}>
                <SortOption
                  selected={sort === 'az'}
                  onClick={() => { setSort('az'); setSortOpen(false); }}
                >
                  Alphabetically (A-Z)
                </SortOption>
                <SortOption
                  selected={sort === 'decline'}
                  onClick={() => { setSort('decline'); setSortOpen(false); }}
                >
                  Declining balance ($ high-low)
                </SortOption>
              </SortDropdown>
            )}
          </HeaderActions>
        </HeaderBar>

        {activeTab === 'tokens' ? (
          <TokensTabContent />
        ) : (
          <NFTsTabContent />
        )}
      </CenteredTabsWrapper>
    </>
  );
};