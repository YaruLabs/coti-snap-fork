import React, { useState, useMemo } from 'react';

import { Button } from '../Button';
import { ContentText, ContentTitle } from '../styles';
import { OnboardAccountWizard } from './OnboardAccountWizard';

interface OnboardAccountProps {
  readonly onOnboardingComplete?: () => void;
}

interface OnboardingState {
  readonly isOnboarding: boolean;
  readonly isCompleted: boolean;
}

const ONBOARDING_DESCRIPTION = `Start with onboarding your account so that your wallet could interact with private chain data, for example: your balance in a private ERC20 token.`;

export const OnboardAccount: React.FC<OnboardAccountProps> = ({ 
  onOnboardingComplete 
}) => {
  const [onboardingState, setOnboardingState] = useState<OnboardingState>({
    isOnboarding: false,
    isCompleted: false
  });

  const shouldShowWizard = useMemo(() => 
    onboardingState.isOnboarding && !onboardingState.isCompleted, 
    [onboardingState]
  );

  const shouldShowOnboardingIntro = useMemo(() => 
    !onboardingState.isOnboarding && !onboardingState.isCompleted, 
    [onboardingState]
  );

  const handleStartOnboarding = (): void => {
    setOnboardingState(prev => ({
      ...prev,
      isOnboarding: true
    }));
  };

  const handleOnboardingComplete = (): void => {
    setOnboardingState({
      isOnboarding: false,
      isCompleted: true
    });
    
    onOnboardingComplete?.();
  };


  if (shouldShowWizard) {
    return (
      <OnboardAccountWizard 
        handleOnboardAccount={handleOnboardingComplete}
      />
    );
  }

  if (shouldShowOnboardingIntro) {
    return (
      <>
        <ContentTitle>Onboard Account</ContentTitle>
        <ContentText>
          {ONBOARDING_DESCRIPTION}
        </ContentText>
        <Button 
          primary 
          text="Onboard account" 
          onClick={handleStartOnboarding}
          aria-label="Start account onboarding process"
        />
      </>
    );
  }

  return null;
};
