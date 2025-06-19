import React, { useState, useCallback, useMemo } from 'react';
import { normalizeAddress } from '../../utils/normalizeAddress';
import { useTokenOperations } from '../../hooks/useTokenOperations';
import { BrowserProvider } from '@coti-io/coti-ethers';
import InfoIcon from '../../assets/info.svg';
import { Tooltip } from '../Tooltip';
import {
  ModalBackdrop,
  AnimatedModalContainer,
  ModalHeader,
  ModalClose,
  LabelRow,
  ModalInput,
  ErrorMsg,
  ModalActions,
  ModalActionButton
} from './styles';

interface ImportNFTModalProps {
  open: boolean;
  onClose: () => void;
  provider: BrowserProvider;
}

interface FormData {
  address: string;
  tokenId: string;
}

interface FormErrors {
  address: string;
  tokenId: string;
}

const TOKEN_ID_REGEX = /^\d*$/;

const useImportNFTForm = () => {
  const [formData, setFormData] = useState<FormData>({
    address: '',
    tokenId: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({
    address: '',
    tokenId: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const updateField = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors((prev: FormErrors) => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  const validateField = useCallback((field: keyof FormData, value: string): string => {
    switch (field) {
      case 'address':
        if (!value) return '';
        return normalizeAddress(value) ? '' : 'Invalid address';
      case 'tokenId':
        if (!value) return 'Token ID required';
        return TOKEN_ID_REGEX.test(value) ? '' : 'Token ID must be a number';
      default:
        return '';
    }
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {
      address: validateField('address', formData.address),
      tokenId: validateField('tokenId', formData.tokenId)
    };
    
    setErrors(newErrors);
    return !newErrors.address && !newErrors.tokenId;
  }, [formData, validateField]);

  const resetForm = useCallback(() => {
    setFormData({ address: '', tokenId: '' });
    setErrors({ address: '', tokenId: '' });
    setIsLoading(false);
  }, []);

  return {
    formData,
    errors,
    isLoading,
    updateField,
    validateField,
    validateForm,
    setIsLoading,
    resetForm,
    setErrors
  };
};

export const ImportNFTModal: React.FC<ImportNFTModalProps> = React.memo(({ 
  open, 
  onClose, 
  provider 
}) => {
  const { addNFTToMetaMask } = useTokenOperations(provider);
  const {
    formData,
    errors,
    isLoading,
    updateField,
    validateField,
    validateForm,
    setIsLoading,
    resetForm,
    setErrors
  } = useImportNFTForm();

  const isFormValid = useMemo(() => {
    return formData.address && formData.tokenId && !errors.address && !errors.tokenId;
  }, [formData, errors]);

  const isButtonDisabled = useMemo(() => {
    return !isFormValid || isLoading;
  }, [isFormValid, isLoading]);

  const handleAddressChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateField('address', e.target.value);
  }, [updateField]);

  const handleTokenIdChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (TOKEN_ID_REGEX.test(value)) {
      updateField('tokenId', value);
    }
  }, [updateField]);

  const handleAddressBlur = useCallback(() => {
    const error = validateField('address', formData.address);
    setErrors((prev: FormErrors) => ({ ...prev, address: error }));
  }, [formData.address, validateField, setErrors]);

  const handleTokenIdBlur = useCallback(() => {
    const error = validateField('tokenId', formData.tokenId);
    setErrors((prev: FormErrors) => ({ ...prev, tokenId: error }));
  }, [formData.tokenId, validateField, setErrors]);

  const handleImport = useCallback(async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await addNFTToMetaMask({ 
        address: formData.address, 
        symbol: 'NFT', 
        decimals: 0, 
        image: '', 
        tokenId: formData.tokenId 
      });
      resetForm();
      onClose();
    } catch (error) {
      console.error('Failed to import NFT:', error);
    } finally {
      setIsLoading(false);
    }
  }, [validateForm, addNFTToMetaMask, formData, resetForm, onClose]);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }, [handleClose]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  }, [handleClose]);

  if (!open) return null;

  return (
    <ModalBackdrop onClick={handleBackdropClick}>
      <AnimatedModalContainer onClick={e => e.stopPropagation()} onKeyDown={handleKeyDown} tabIndex={-1}>
        <ModalHeader>
          Import NFT
          <ModalClose 
            onClick={handleClose} 
            aria-label="Close modal"
            type="button"
          >
            ×
          </ModalClose>
        </ModalHeader>
        
        <LabelRow>
          Address{' '}
          <Tooltip text="On OpenSea, for example, on the NFT's page under Details, there is a blue hyperlinked value labeled 'Contract Address'. If you click on this, it will take you to the contract's address on Etherscan; at the top-left of that page, there should be an icon labeled 'Contract', and to the right, a long string of letters and numbers. This is the address of the contract that created your NFT. Click on the 'copy' icon to the right of the address, and you'll have it on your clipboard.">
            <InfoIcon />
          </Tooltip>
        </LabelRow>
        
        <ModalInput
          placeholder="0x..."
          value={formData.address}
          onChange={handleAddressChange}
          onBlur={handleAddressBlur}
          disabled={isLoading}
          aria-describedby={errors.address ? 'address-error' : undefined}
        />
        <ErrorMsg id="address-error" role="alert">
          {errors.address}
        </ErrorMsg>
        
        <LabelRow>
          Token ID{' '}
          <Tooltip text="An NFT's ID is a unique identifier since no two NFTs are alike. Again, on OpenSea this number is under 'Details'. Make a note of it, or copy it onto your clipboard.">
            <InfoIcon />
          </Tooltip>
        </LabelRow>
        
        <ModalInput
          placeholder="Enter the token ID"
          value={formData.tokenId}
          onChange={handleTokenIdChange}
          onBlur={handleTokenIdBlur}
          type="number"
          disabled={isLoading}
          aria-describedby={errors.tokenId ? 'tokenid-error' : undefined}
        />
        <ErrorMsg id="tokenid-error" role="alert">
          {errors.tokenId}
        </ErrorMsg>
        
        <ModalActions>
          <ModalActionButton 
            onClick={handleClose}
            disabled={isLoading}
            type="button"
          >
            Cancel
          </ModalActionButton>
          <ModalActionButton 
            primary 
            onClick={handleImport} 
            disabled={isButtonDisabled}
            type="button"
          >
            {isLoading ? 'Importing...' : 'Import'}
          </ModalActionButton>
        </ModalActions>
      </AnimatedModalContainer>
    </ModalBackdrop>
  );
});

ImportNFTModal.displayName = 'ImportNFTModal'; 