import styled, { keyframes } from 'styled-components';
import ArrowDown from '../../assets/arrow-down.svg';

const slideUpFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(48px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const SectionTitle = styled.div`
  font-size: 1.7rem;
  font-weight: 700;
  margin-top: 16px;
`;

export const AccountBox = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'error'
})<{ active?: boolean; error?: boolean }>`
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  border: 1.5px solid
    ${({ error, active }) =>
      error ? '#e53935' : active ? '#4664ff' : '#e5e7eb'};
  padding: 14px 18px;
  gap: 14px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: rgb(248, 248, 248);
  }
`;

export const AccountIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffe14d 60%, #4664ff 40%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
`;

export const AccountDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AccountAddress = styled.div`
  font-size: 1.5rem;
  color: #6b7280;
  font-weight: 400;
  margin-top: 8px;
`;

export const InputBox = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #d0d0d0;
  padding: 18px 16px;
  gap: 8px;
  max-width: 420px;
  margin-bottom: 8px;
  transition: border 0.2s;
  
  &:focus-within {
    border: 1.5px solid #4664ff;
  }
`;

export const AddressInput = styled.input`
  border: none;
  outline: none;
  font-size: 1.5rem;
  flex: 1;
  background: transparent;
`;

export const AmountInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  font-size: 1.5rem;
  font-weight: 400;
  color: #18191d;
  width: 100px;
  text-align: right;
  padding: 0 4px;
  appearance: textfield;
  
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const BottomActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 40px;
`;

export const CancelButton = styled.button`
  flex: 1;
  background: none;
  border: 2px solid #4664ff;
  color: #4664ff;
  font-size: 1.7rem;
  font-weight: 600;
  border-radius: 32px;
  padding: 18px 0;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  
  &:hover {
    background: #f3f5fa;
  }
`;

export const ContinueButton = styled.button`
  flex: 1;
  background: #4664ff;
  border: none;
  color: #fff;
  font-size: 1.7rem;
  font-weight: 600;
  border-radius: 32px;
  padding: 18px 0;
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s;
  
  &:hover {
    background: #3350e6;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #4664ff;
  }
`;

export const HeaderBarSlotLeft = styled.div`
  width: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const HeaderBarSlotTitle = styled.div`
  flex: 1;
  text-align: center;
  font-weight: 700;
  font-size: 2.1rem;
`;

export const HeaderBarSlotRight = styled.div`
  width: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const BalanceRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const BalanceSub = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'error'
})<{ error?: boolean }>`
  font-size: 1.4rem;
  color: ${({ error }) => (error ? '#e53935' : '#8a8f98')};
  font-weight: 400;
  flex: 1;
`;

export const MaxButton = styled.button`
  background: none;
  border: none;
  color: #3559ff;
  font-size: 1.4rem;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.8;
  }
`;

export const TokenRowFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ArrowDownStyled = styled(ArrowDown)`
  margin-left: 8px;
  width: 22px;
  height: 22px;
  color: #18191d;
`;

export const ClearIconButton = styled.button`
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  width: 20px;
  height: 20px;
  justify-content: center;
  border-radius: 35%;
  transition: background 0.15s;
  
  &:hover {
    background: #f3f5fa;
  }
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #18191d;
  cursor: pointer;
  border-radius: 35%;
  height: 32px;
  width: 32px;
  margin-left: auto;
  transition: background 0.15s;
  padding: 0;
  
  &:hover {
    background: #f3f5fa;
    border-radius: 35%;
  }
  
  svg {
    width: 22px;
    height: 22px;
    display: block;
  }
`;

export const TokenModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(24, 25, 29, 0.29);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TokenModalContainer = styled.div`
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 32px 0 rgba(0,0,0,0.12);
  width: 420px;
  max-width: 98vw;
  padding: 0 0 24px 0;
  position: relative;
  display: flex;
  flex-direction: column;
  animation: ${slideUpFadeIn} 0.32s cubic-bezier(0.4, 0.8, 0.4, 1) both;
`;

export const TokenModalHeader = styled.div`
  font-size: 2.1rem;
  font-weight: 700;
  text-align: center;
  padding: 32px 32px 0 32px;
`;

export const TokenModalClose = styled.button`
  position: absolute;
  top: 32px;
  right: 32px;
  background: none;
  border: none;
  font-size: 2.2rem;
  color: #18191d;
  cursor: pointer;
  
  &:hover {
    background: #f3f5fa;
    border-radius: 6px;
  }
`;

export const TokenTabs = styled.div`
  display: flex;
  width: 100%;
  margin-top: 24px;
  border-bottom: 0.5px solid rgb(205, 205, 205);
`;

export const TokenTab = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active: boolean }>`
  flex: 1;
  background: none;
  border: none;
  font-size: 1.7rem;
  font-weight: 600;
  color: ${({ active }) => (active ? '#222' : '#bfc2c6')};
  border-bottom: 3px solid ${({ active }) => (active ? '#222' : '#e5e7eb')};
  padding: 12px 0 10px 0;
  cursor: pointer;
  transition: color 0.2s, border-bottom 0.2s;
`;

export const TokenSearchBox = styled.div`
  display: flex;
  align-items: center;
  background: #FFFFFF;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  padding: 0 18px;
  margin: 14px 32px 18px 32px;
  transition: border 0.2s;
  
  &:hover,
  &.active {
    border: 2px solid #4664ff;
  }
`;

export const TokenSearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #00000;
  font-size: 1.5rem;
  margin-left: 12px;
  padding: 12px 0;
  
  &::placeholder {
    color: #bfc2c6;
    opacity: 1;
  }
`;

export const TokenList = styled.div`
  margin: 0 0px;
`;

export const TokenListItemBar = styled.div`
  position: absolute;
  left: 4px;
  top: 4px;
  bottom: 4px;
  width: 5px;
  border-radius: 8px;
  background: #3559ff;
`;

export const TokenListItem = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'selected'
})<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  background: ${({ selected }) => (selected ? '#e3e6fe' : 'none')};
  border: none;
  padding: 14px 14px 14px 22px;
  position: relative;
  margin-bottom: 8px;
  cursor: pointer;
  transition: background 0.15s;
`;

export const TokenListInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 18px;
`;

export const TokenListName = styled.div`
  font-size: 1.7rem;
  font-weight: 700;
  color: #18191d;
`;

export const TokenListSymbol = styled.div`
  font-size: 1.3rem;
  color: #bfc2c6;
  font-weight: 400;
`;

export const TokenListAmount = styled.div`
  margin-left: auto;
  text-align: right;
`;

export const TokenListValue = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: #18191d;
`;

export const NoNFTsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 180px;
  width: 100%;
`;

export const NoNFTsText = styled.div`
  color: #6b7280;
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 18px;
`;

export const LearnMoreLink = styled.a`
  color: #3559ff;
  font-size: 1.8rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`; 