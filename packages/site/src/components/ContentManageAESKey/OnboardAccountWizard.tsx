import React, { useState, useRef } from 'react';
import { useAccount } from 'wagmi';

import EditIcon from '../../assets/edit.svg';
import { COTI_FAUCET_LINK, ONBOARD_CONTRACT_LINK } from '../../config/onboard';
import { useWrongChain } from '../../hooks';
import { useSnap } from '../../hooks/SnapContext';
import { Button } from '../Button';
import { ContentConnectYourWallet } from '../ContentConnectYourWallet';
import { ContentSwitchNetwork } from '../ContentSwitchNetwork';
import { Loading } from '../Loading';
import { ContentText, ContentTitle } from '../styles';
import {
  ContentButtons,
  ContentErrorText,
  ContentInput,
  Edit,
  EditableInput,
  EditableInputContainer,
  Link,
} from './styles';

interface OnboardAccountWizardProps {
  readonly handleOnboardAccount: () => void;
}

export const OnboardAccountWizard: React.FC<OnboardAccountWizardProps> = ({
  handleOnboardAccount,
}) => {
  const {
    setAESKey,
    loading,
    settingAESKeyError,
    onboardContractAddress,
    handleOnChangeContactAddress,
    handleCancelOnboard,
  } = useSnap();

  const [isEditable, setIsEditable] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = (): void => {
    setIsEditable(true);
    // Focus the input after making it editable
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleBlur = (): void => {
    setIsEditable(false);
  };

  const handleCancel = (): void => {
    try {
      handleCancelOnboard();
      handleOnboardAccount();
    } catch (error) {
      console.error('Error during onboarding cancellation:', error);
    }
  };

  const handleOnboardClick = async (): Promise<void> => {
    try {
      await setAESKey();
    } catch (error) {
      console.error('Error during AES key setup:', error);
    }
  };

  const { isConnected } = useAccount();
  const { wrongChain } = useWrongChain();

  if (isConnected && wrongChain) {
    return <ContentSwitchNetwork />;
  }

  return isConnected ? (
    loading ? (
      <Loading title="Onboard account" actionText="Onboarding account" />
    ) : (
      <>
        <ContentTitle>Onboard account</ContentTitle>
        <ContentText>
          You are about to interact with the{' '}
          <Link target="_blank" href={ONBOARD_CONTRACT_LINK}>
            AccountOnboard.sol
          </Link>{' '}
          contract.
        </ContentText>
        <ContentInput>
          <ContentText id="contract-address-description">AccountOnboard.sol address</ContentText>
          <EditableInputContainer
            $isEditable={isEditable}
            $isError={settingAESKeyError}
          >
            <EditableInput
              ref={inputRef}
              type="text"
              value={onboardContractAddress}
              $isEditable={isEditable}
              readOnly={!isEditable}
              onChange={(e) => handleOnChangeContactAddress(e)}
              onBlur={handleBlur}
              aria-label="AccountOnboard contract address"
              aria-describedby="contract-address-description"
            />
            <Edit 
              onClick={handleIconClick}
              aria-label="Edit contract address"
              title="Click to edit contract address"
            >
              <EditIcon />
            </Edit>
          </EditableInputContainer>
        </ContentInput>
        <ContentButtons>
          <Button 
            text="Cancel" 
            fullWith={true} 
            onClick={handleCancel}
            aria-label="Cancel onboarding"
          />
          <Button 
            primary 
            text="Onboard" 
            fullWith={true} 
            onClick={handleOnboardClick}
            aria-label="Start onboarding process"
          />
        </ContentButtons>

        {settingAESKeyError === 'accountBalanceZero' && (
          <ContentErrorText>
            Error onboarding account: Insufficient funds. Fund your account and
            try again. Testnet funds available at{' '}
            <Link target="_blank" href={COTI_FAUCET_LINK}>
              https://faucet.coti.io
            </Link>
          </ContentErrorText>
        )}
        {settingAESKeyError === 'invalidAddress' && (
          <ContentErrorText>
            Error to onboard account, check the contract address
          </ContentErrorText>
        )}
        {settingAESKeyError === 'unknownError' && (
          <ContentErrorText>
            Error to onboard account, try again
          </ContentErrorText>
        )}
      </>
    )
  ) : (
    <ContentConnectYourWallet />
  );
};
