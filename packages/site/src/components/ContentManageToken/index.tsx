import { QuickAccessButton, QuickAccessGroup, QuickAccessItem, QuickAccessLabel } from './styles';
import SendIcon from '../../assets/send.svg';
import ReceiveIcon from '../../assets/receive.svg';
import { Balance } from './Balance';
import { Tokens } from './Tokens';
import { MainStack } from './styles';

export const ContentManageToken = () => {
  return (
    <MainStack>
      <Balance />
      <QuickAccessGroup>
        <QuickAccessItem>
          <QuickAccessButton>
            <SendIcon />
          </QuickAccessButton>
          <QuickAccessLabel>Send</QuickAccessLabel>
        </QuickAccessItem>
        <QuickAccessItem>
          <QuickAccessButton>
            <ReceiveIcon />
          </QuickAccessButton>
          <QuickAccessLabel>Receive</QuickAccessLabel>
        </QuickAccessItem>
      </QuickAccessGroup>
      <Tokens />
    </MainStack>
  );
};