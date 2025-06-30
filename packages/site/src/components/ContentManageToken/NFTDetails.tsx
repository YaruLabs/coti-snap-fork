import React, { useCallback, useState } from 'react';
import { BrowserProvider } from '@coti-io/coti-ethers';
import { ImportedToken } from '../../types/token';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { parseNFTAddress, formatAddressForDisplay } from '../../utils/tokenValidation';
import { 
  NFTCard, 
  NFTCardImage, 
  NFTCornerIcon,
  NFTDetailsContainer,
  DetailsBackButton,
  NFTDetailsImageContainer,
  NFTDetailsContent,
  NFTDetailsRow,
  NFTDetailsLabel,
  NFTDetailsValue,
  NFTDetailsDisclaimer,
  SendButton,
  AddressBadge,
  AddressCopyButton,
  TokenDetailsLink,
} from './styles';
import DefaultNFTImage from '../../assets/images/default_nft.png';
import ArrowBack from '../../assets/arrow-back.svg';
import CopyIcon from '../../assets/copy.svg';
import CopySuccessIcon from '../../assets/copy-success.svg';

interface NFTDetailModalProps {
  nft: ImportedToken | null;
  open: boolean;
  onClose: () => void;
  setActiveTab: React.Dispatch<React.SetStateAction<'tokens' | 'nfts'>>;
  setSelectedNFT: React.Dispatch<React.SetStateAction<ImportedToken | null>>;
  provider?: BrowserProvider;
}

const NFTDetails: React.FC<NFTDetailModalProps> = ({ nft, open, onClose, setActiveTab, setSelectedNFT, provider }) => {
  const { copyToClipboard, copied } = useCopyToClipboard();
  const [showSendModal, setShowSendModal] = useState(false);

  if (!open || !nft) return null;

  const { contractAddress: contract, tokenId } = parseNFTAddress(nft.address);
  
  const shortAddress = contract ? formatAddressForDisplay(contract) : '';

  const handleCopy = useCallback((text: string) => {
    copyToClipboard(text);
  }, [copyToClipboard]);

  const handleSendClick = useCallback(() => {
    setShowSendModal(true);
  }, []);

  const handleCloseSendModal = useCallback(() => {
    setShowSendModal(false);
  }, []);

  return (
    <NFTDetailsContainer>
      <DetailsBackButton onClick={onClose} style={{ marginRight: 12 }}>
        <ArrowBack />
      </DetailsBackButton>
      <NFTDetailsImageContainer>
        <NFTCard style={{ width: 140, height: 140, borderRadius: 16 }}>
          <NFTCardImage src={DefaultNFTImage} alt="NFT" />
          <NFTCornerIcon>C</NFTCornerIcon>
        </NFTCard>
      </NFTDetailsImageContainer>
      <NFTDetailsContent>
        <NFTDetailsRow>
          <NFTDetailsLabel>Contract address</NFTDetailsLabel>
          <AddressBadge onClick={() => handleCopy(contract)}>
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
        </NFTDetailsRow>
        <NFTDetailsRow>
          <NFTDetailsLabel>Token ID</NFTDetailsLabel>
          <NFTDetailsValue>{tokenId}</NFTDetailsValue>
        </NFTDetailsRow>
        <NFTDetailsRow>
          <NFTDetailsLabel>Token Standard</NFTDetailsLabel>
          <NFTDetailsValue>ERC721</NFTDetailsValue>
        </NFTDetailsRow>
        <NFTDetailsDisclaimer>
          Disclaimer: MetaMask pulls the media file from the source url. This url sometimes gets changed by the marketplace on which the NFT was minted.
        </NFTDetailsDisclaimer>
        <SendButton onClick={handleSendClick} disabled={!provider}>
          Send
        </SendButton>
      </NFTDetailsContent>
      
      
    </NFTDetailsContainer>
  );
};

export default NFTDetails;