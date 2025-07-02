import { useState } from 'react';

import CheckIcon from '../../assets/check.svg';
import CopyIcon from '../../assets/copy.svg';
import { useSnap } from '../../hooks/SnapContext';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { Button } from '../Button';
import { Loading } from '../Loading';
import { ContentText, ContentTitle } from '../styles';
import {
  AESInput,
  AESKeyContainer,
  ContentInput,
  IconContainer,
  SuccessAlertContainer,
  SuccessAlertIconContainer,
} from './styles';

interface ManageAESKeyProps {
  readonly handleShowDelete: () => void;
}

export const ManageAESKey: React.FC<ManageAESKeyProps> = ({
  handleShowDelete,
}) => {
  const { userAESKey, getAESKey, loading } = useSnap();

  const { copied: isCopied, copyToClipboard } = useCopyToClipboard({ 
    successDuration: 2000
  });

  const handleCopyClick = (): void => {
    if (userAESKey) {
      copyToClipboard(userAESKey);
    }
  };

  const handleRevealClick = async (): Promise<void> => {
    try {
      await getAESKey();
    } catch (error) {
      console.error('Error revealing AES key:', error);
    }
  };

  if (loading) {
    return (
      <Loading
        title="Manage your AES Key"
        actionText="Approve in your wallet to reveal your AES key"
      />
    );
  }

  return (
    <>
      <SuccessAlertContainer>
        <SuccessAlertIconContainer> 
        <CheckIcon />
        </SuccessAlertIconContainer>
        <ContentText>Account onboarded successfully</ContentText>
      </SuccessAlertContainer>
      <ContentTitle>Manage your AES Key</ContentTitle>
      <ContentInput>
        <ContentText>AES Key</ContentText>
        <AESKeyContainer>
          {userAESKey ? (
            <>
              <AESInput 
                type="text" 
                value={userAESKey ?? ''} 
                readOnly={true}
                aria-label="Your AES Key"
              />
              <IconContainer 
                onClick={handleCopyClick}
                aria-label={isCopied ? "AES Key copied to clipboard" : "Copy AES Key to clipboard"}
                title={isCopied ? "Copied!" : "Copy to clipboard"}
              >
                {isCopied ? <CheckIcon /> : <CopyIcon />}
              </IconContainer>
            </>
          ) : (
            <ContentText id="aes-key-description">Hidden AES key - click Reveal to show</ContentText>
          )}
        </AESKeyContainer>
      </ContentInput>
      <Button
        disabled={userAESKey !== null}
        text="Reveal AES Key"
        primary={true}
        onClick={handleRevealClick}
        aria-label="Reveal your AES key"
        aria-describedby="aes-key-description"
      />
      <Button 
        text="Delete" 
        primary={false} 
        onClick={handleShowDelete}
        aria-label="Delete AES key"
      />
    </>
  );
};
