import { useCallback, useState } from 'react';

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

export const ManageAESKey = ({
  handleShowDelete,
}: {
  handleShowDelete: () => void;
}) => {
  const { userAESKey, setUserAesKEY, getAESKey, loading } = useSnap();

  const { copied: isCopied, copyToClipboard } = useCopyToClipboard({ 
    successDuration: 2000,
    onSuccess: () => setUserAesKEY(null)
  });

  if (loading) {
    <Loading
      title="Manage your AES Key"
      actionText="Approve in your wallet to reveal your AES key"
    />;
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
              <AESInput type="text" value={userAESKey ?? ''} readOnly={true} />
              <IconContainer onClick={() => copyToClipboard(userAESKey ?? '')}>
                {isCopied ? <CheckIcon /> : <CopyIcon />}
              </IconContainer>
            </>
          ) : (
            <ContentText>**************************************</ContentText>
          )}
        </AESKeyContainer>
      </ContentInput>
      <Button
        disabled={userAESKey !== null}
        text="Reveal AES Key"
        primary={true}
        onClick={getAESKey}
      />
      <Button text="Delete" primary={false} onClick={handleShowDelete} />
    </>
  );
};
