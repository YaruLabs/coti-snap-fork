import React, { useState, useCallback, useMemo } from 'react';
import { QRCode } from 'react-qrcode-logo';
import CopyIcon from '../../assets/copy.svg';
import CopySuccessIcon from '../../assets/copy-success.svg';
import MetamaskLogo from '../../assets/images/metamask-fox.png';
import {
  DepositModalContainer,
  DepositCloseButton,
  DepositTitle,
  DepositQRWrapper,
  DepositAccountName,
  DepositAccountAddress,
  DepositCopyIconWrapper,
  DepositCopyButton
} from './styles';

interface DepositTokensProps {
  onClose: () => void;
  address: string;
  accountName?: string;
}

const COPY_TIMEOUT = 1500;
const QR_SIZE = 150;
const LOGO_SIZE = 32;
const LOGO_PADDING = 5;

const useCopyToClipboard = (text: string, timeout: number = COPY_TIMEOUT) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      
      const timer = setTimeout(() => {
        setCopied(false);
      }, timeout);
      
      return () => clearTimeout(timer);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      
      try {
        const clipboardItem = new ClipboardItem({
          'text/plain': new Blob([text], { type: 'text/plain' })
        });
        await navigator.clipboard.write([clipboardItem]);
        setCopied(true);
      } catch (fallbackError) {
        console.error('Fallback clipboard method failed:', fallbackError);
        alert('No se pudo copiar al portapapeles. Por favor, copia manualmente la dirección.');
        return;
      }
      
      const timer = setTimeout(() => {
        setCopied(false);
      }, timeout);
      
      return () => clearTimeout(timer);
    }
  }, [text, timeout]);

  return { copied, copyToClipboard };
};

export const DepositTokens: React.FC<DepositTokensProps> = React.memo(({ 
  onClose, 
  address, 
  accountName 
}) => {
  const { copied, copyToClipboard } = useCopyToClipboard(address);

  const formattedAddress = useMemo(() => {
    if (!address) return '';
    return address;
  }, [address]);

  const qrCodeValue = useMemo(() => address, [address]);

  const handleCopy = useCallback(() => {
    copyToClipboard();
  }, [copyToClipboard]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleClose();
    }
  }, [handleClose]);

  if (!address) {
    return null;
  }

  return (
    <DepositModalContainer onKeyDown={handleKeyDown} tabIndex={-1}>
      <DepositCloseButton 
        aria-label="Cerrar modal de depósito" 
        onClick={handleClose}
        type="button"
      >
        ×
      </DepositCloseButton>
      
      <DepositTitle>Recibir</DepositTitle>
      
      <DepositQRWrapper>
        <QRCode 
          value={qrCodeValue} 
          size={QR_SIZE} 
          logoImage={MetamaskLogo} 
          logoWidth={LOGO_SIZE} 
          logoHeight={LOGO_SIZE} 
          logoPadding={LOGO_PADDING}
          logoPaddingStyle='square'
          qrStyle="dots"
          eyeRadius={8}
          quietZone={10}
        />
      </DepositQRWrapper>
      
      {accountName && (
        <DepositAccountName>{accountName}</DepositAccountName>
      )}
      
      <DepositAccountAddress title={address}>
        {formattedAddress}
      </DepositAccountAddress>
      
      <DepositCopyButton 
        onClick={handleCopy}
        $copied={copied}
        type="button"
        aria-label={copied ? "Address copied" : "Copy address"}
      >
        <DepositCopyIconWrapper>
          {copied ? <CopySuccessIcon /> : <CopyIcon />}
        </DepositCopyIconWrapper>
        {copied ? 'Copied' : 'Copy address'}
      </DepositCopyButton>
    </DepositModalContainer>
  );
});

DepositTokens.displayName = 'DepositTokens';