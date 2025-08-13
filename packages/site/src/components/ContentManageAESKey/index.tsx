import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { ContentBorderWrapper, ContentContainer } from '../styles';
import { ContentManageToken } from '../ContentManageToken';
import { isLocal } from '../../config/snap';
import { DeleteAESKey } from './DeleteAESKey';
import { ManageAESKey } from './ManageAESKey';
import { OnboardAccount } from './OnboardAccount';

interface ContentManageAESKeyProps {
  readonly userHasAESKey: boolean;
  readonly userAESKey: string | null;
}

interface AESKeyState {
  readonly showDelete: boolean;
  readonly showManage: boolean;
}

export const ContentManageAESKey: React.FC<ContentManageAESKeyProps> = ({ userHasAESKey, userAESKey }) => {
  const navigate = useNavigate();
  const [aesKeyState, setAesKeyState] = useState<AESKeyState>({
    showDelete: false,
    showManage: false
  });

  const shouldShowOnboarding = useMemo(() => !userHasAESKey && isLocal(), [userHasAESKey]);
  const shouldShowTokenManagement = useMemo(() => userHasAESKey && !aesKeyState.showDelete && !aesKeyState.showManage, [userHasAESKey, aesKeyState]);

  const handleToggleDelete = () => {
    navigate('/delete');
  };

  const handleToggleManage = () => {
    setAesKeyState(prev => ({
      ...prev,
      showManage: !prev.showManage,
      showDelete: false
    }));
  };


  const renderContent = (): JSX.Element | null => {
    if (shouldShowOnboarding) {
      return <OnboardAccount />;
    }

    if (aesKeyState.showDelete) {
      return <DeleteAESKey handleShowDelete={handleToggleDelete} />;
    }

    if (aesKeyState.showManage) {
      return <ManageAESKey handleShowDelete={handleToggleManage} />;
    }

    if (shouldShowTokenManagement) {
      return <ContentManageToken aesKey={userAESKey} />;
    }

    return null;
  };

  return (
    <ContentBorderWrapper>
      <ContentContainer>
        {renderContent()}
      </ContentContainer>
    </ContentBorderWrapper>
  );
};
