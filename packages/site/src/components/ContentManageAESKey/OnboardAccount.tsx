import { useState, useMemo } from 'react';
import { Button } from '../Button';
import { ContentText, ContentTitle } from '../styles';
import { OnboardAccountWizzard } from './OnboardAccountWizzard';

interface OnboardAccountProps {
  onOnboardingComplete?: () => void;
}

interface OnboardingState {
  isOnboarding: boolean;
  isCompleted: boolean;
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

  const handleStartOnboarding = () => {
    setOnboardingState(prev => ({
      ...prev,
      isOnboarding: true
    }));
  };

  const handleOnboardingComplete = () => {
    setOnboardingState({
      isOnboarding: false,
      isCompleted: true
    });
    
    onOnboardingComplete?.();
  };

  const handleOnboardingCancel = () => {
    setOnboardingState({
      isOnboarding: false,
      isCompleted: false
    });
  };

  if (shouldShowWizard) {
    return (
      <OnboardAccountWizzard 
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
