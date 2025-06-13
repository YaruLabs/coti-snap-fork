import styled from 'styled-components';

export const MainStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const QuickAccessButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #4664ff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  cursor: pointer;
  transition: background 0.2s;
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;
  &:hover {
    background: #3350e6;
  }
  svg {
    width: 20px;
    height: 20px;
    color: #fff;
    stroke: #fff;
    fill: none;
    stroke-width: 2.2;
  }
`;

export const QuickAccessGroup = styled.nav`
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: flex-start;
`;

export const QuickAccessItem = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const QuickAccessLabel = styled.span`
  color: #18191d;
  font-size: 1.5rem;
  font-weight: 400;
  text-align: center;
`;

export const BalanceHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 8px;
`;

export const BalanceAmountRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const BalanceAmount = styled.span`
  font-size: 3.4rem;
  font-weight: 700;
  color: #18191d;
  letter-spacing: 0.01em;
`;

export const BalanceEye = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin-left: 2px;
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    width: 22px;
    height: 22px;
    color: #bfc2c6;
    stroke: #bfc2c6;
    fill: #fff;
  }
`;

export const BalanceSub = styled.div`
  font-size: 1.2rem;
  color: #18191d;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const BalancePortfolioLink = styled.a`
  color: #4664ff;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 1.8rem;
  line-height: 1;
  vertical-align: middle;
  &:hover {
    text-decoration: underline;
  }
`;

export const BalancePortfolioIcon = styled.span`
  display: flex;
  align-items: center;
  height: 1.8rem;
  svg {
    width: 1.8rem;
    height: 1.8rem;
    color: #4664ff;
    stroke: #4664ff;
    fill: none;
    stroke-width: 2.2;
    display: block;
  }
`;

export const BalanceChange = styled.span`
  color: #bfc2c6;
  font-size: 1.8rem;
  font-weight: 400;
  margin-right: 6px;
`;

export const TabsWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 16px;
  width: 100%;
  justify-content: center;
`;

export const Tab = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  outline: none;
  font-size: 2rem;
  font-weight: ${({ active }) => (active ? "bold" : "500")};
  color: ${({ active }) => (active ? "#222" : "#8a8f98")};
  border-bottom: 3px solid
    ${({ active }) => (active ? "#111" : "#e5e7eb")};
  padding: 0 20px 12px 20px;
  cursor: pointer;
  transition: color 0.2s, border-bottom 0.2s;
  flex: 1;
  text-align: center;
`;

export const CenteredTabsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
  width: 100%;
`;

export const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 0 12px 0;
`;

export const NetworkBadge = styled.div`
  background: none;
  color: #8a8f98;
  font-size: 1.6rem;
  font-weight: 500;
  border-radius: 12px;
  padding: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: background 0.15s;
  cursor: pointer;
  &:hover {
    background: #f3f5fa;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

export const IconButton = styled.button<{ selected?: boolean }>`
  background: ${({ selected }) => (selected ? '#f3f5fa' : 'none')};
  border: none;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #18191d;
  font-size: 2.1rem;
  border-radius: 12px;
  transition: background 0.15s;
  &:hover {
    background: #f3f5fa;
  }
`;

export const MenuDropdown = styled.div`
  position: absolute;
  top: 42px;
  right: 0;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.10);
  border-radius: 12px;
  min-width: 180px;
  z-index: 100;
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  background: #fff;
  border: none;
  outline: none;
  font-size: 1.6rem;
  color: #18191d;
  font-weight: 500;
  padding: 20px 20px 20px 20px;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: #f7f7f7;
  }
`;

export const SortDropdown = styled.div`
  position: absolute;
  top: 42px;
  right: 0;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.10);
  border-radius: 12px;
  min-width: 270px;
  z-index: 101;
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const SortOption = styled.button<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  background: ${({ selected }) => (selected ? '#eef1ff' : '#fff')};
  border: none;
  outline: none;
  font-size: 1.6rem;
  color: #18191d;
  font-weight: 500;
  padding: 20px 20px 20px 20px;
  cursor: pointer;
  transition: background 0.15s;
  position: relative;
  gap: 12px;
  &:hover {
    background: ${({ selected }) => (selected ? '#eef1ff' : '#f7f7f7')};
  }
  &::before {
    content: '';
    display: ${({ selected }) => (selected ? 'block' : 'none')};
    position: absolute;
    left: 0;
    top: 6px;
    bottom: 6px;
    width: 4px;
    border-radius: 4px;
    background: #3559ff;
  }
`;

export const TokenRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 100%;
  padding: 0 8px;
  min-height: 80px;
  transition: background 0.15s;
  cursor: pointer;
  &:hover {
    background: #f7f7f7;
  }
`;

export const TokenInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

export const TokenLogos = styled.div`
  position: relative;
  width: 48px;
  height: 40px;
  display: flex;
  align-items: center;
`;

export const TokenLogoBig = styled.div`
  width: 40px;
  height: 40px;
  background: #f3f5fa;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  color: #222;
  font-weight: 500;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
`;

export const TokenLogoSmall = styled.div`
  width: 22px;
  height: 22px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #222;
  font-weight: 500;
  position: absolute;
  left: 18px;
  top: 18px;
  z-index: 2;
  border: 1.5px solid #e5e7eb;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
`;

export const TokenName = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: #18191d;
  margin-left: 8px;
`;

export const TokenValues = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  min-width: 110px;
`;

export const TokenUsd = styled.span`
  font-size: 2.1rem;
  font-weight: 700;
  color: #18191d;
  line-height: 1.1;
`;

export const TokenAmount = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #6b7280;
  letter-spacing: 0.01em;
`;

export const NFTGrid = styled.div`
  display: flex;
  gap: 32px;
  justify-content: flex-start;
  width: 100%;
`;

export const NFTCard = styled.div`
  background: #f3f5fa;
  border-radius: 12px;
  width: 180px;
  aspect-ratio: 1 / 1;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const NFTImagePattern = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.5;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
`;
  
export const NFTLogo = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 32px;
  height: 32px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: #222;
  font-weight: 500;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  border: 1.5px solid #e5e7eb;
`;

export const NFTActionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
  margin-top: 28px;
`;

export const NFTActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 7px;
  background: none;
  border: none;
  outline: none;
  color: #3559ff;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  transition: text-decoration 0.15s;
  &:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;