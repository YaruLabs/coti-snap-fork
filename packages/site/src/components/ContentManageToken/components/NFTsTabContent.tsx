import React, { useCallback, useMemo } from 'react';
import { ImportedToken } from '../../../types/token';
import { ContentBorderWrapper, ContentContainer } from '../../styles';
import { NFTCardComponent } from './NFTCard';
import { NFTGrid } from '../styles';

interface NFTsTabContentProps {
  nfts: ImportedToken[];
  onOpenImportNFTModal: () => void;
  onRefreshNFTs: () => void;
  onSelectNFT: (nft: ImportedToken) => void;
}

export const NFTsTabContent: React.FC<NFTsTabContentProps> = React.memo(({ 
  nfts, 
  onOpenImportNFTModal, 
  onRefreshNFTs, 
  onSelectNFT 
}) => {
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
    <ContentBorderWrapper>
      <ContentContainer style={containerStyle}>
        <NFTGrid>
          {nfts.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '24px 0' }}>
              No NFTs imported.
            </div>
          ) : (
            nfts.map((nft) => (
              <NFTCardComponent key={nft.address} nft={nft} onClick={() => onSelectNFT(nft)} />
            ))
          )}
        </NFTGrid>
      </ContentContainer>
    </ContentBorderWrapper>
  );
});

NFTsTabContent.displayName = 'NFTsTabContent';