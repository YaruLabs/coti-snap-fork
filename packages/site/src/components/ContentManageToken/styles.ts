import styled, { keyframes } from 'styled-components';

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

const colors = {
  primary: '#4664ff',
  primaryHover: '#3350e6',
  primaryDark: '#2946c7',
  secondary: '#3d5afe',
  secondaryHover: '#2946c7',
  success: '#10b981',
  successHover: '#059669',
  error: '#e53935',
  text: {
    primary: '#18191d',
    secondary: '#6b7280',
    tertiary: '#8a8f98',
    muted: '#bfc2c6',
    light: '#9ca3af'
  },
  background: {
    primary: '#fff',
    secondary: '#f7f7f7',
    tertiary: '#f3f5fa',
    success: '#ecfdf5',
    hover: '#f8fafc'
  },
  border: {
    primary: '#e5e7eb',
    secondary: '#d0d0d0'
  }
};

const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  xxl: '24px',
  xxxl: '32px',
  xxxxl: '40px'
};

const typography = {
  sizes: {
    xs: '1.1rem',
    sm: '1.2rem',
    base: '1.4rem',
    md: '1.5rem',
    lg: '1.6rem',
    xl: '1.7rem',
    xxl: '1.8rem',
    xxxl: '2rem',
    xxxxl: '2.1rem',
    xxxxxl: '2.4rem',
    huge: '3.4rem'
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  }
};

const borderRadius = {
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '20px',
  xxl: '24px',
  xxxl: '32px',
  xxxxl: '24px',
  full: '50%'
};

const shadows = {
  sm: '0 1px 4px rgba(0,0,0,0.04)',
  md: '0 2px 8px rgba(0, 0, 0, 0.1)',
  lg: '0 4px 32px 0 rgba(0,0,0,0.12)',
  dropdown: '0 2px 12px rgba(0,0,0,0.10)'
};

const transitions = {
  fast: '0.15s ease',
  normal: '0.2s ease',
  slow: '0.32s cubic-bezier(0.4, 0.8, 0.4, 1)'
};

const buttonBase = `
  border: none;
  outline: none;
  cursor: pointer;
  font-weight: ${typography.weights.semibold};
  transition: all ${transitions.normal};
  
  &:focus {
    outline: 2px solid ${colors.primary};
    outline-offset: 2px;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const inputBase = `
  border: 1.5px solid ${colors.border.primary};
  border-radius: ${borderRadius.md};
  font-size: ${typography.sizes.lg};
  color: ${colors.text.primary};
  background: ${colors.background.secondary};
  outline: none;
  transition: border-color ${transitions.fast}, background-color ${transitions.fast};
  
  &:focus {
    border-color: ${colors.primary};
    background: ${colors.background.primary};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const MainStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xxxl};
`;

export const QuickAccessGroup = styled.nav`
  display: flex;
  gap: ${spacing.xxxxl};
  justify-content: center;
  align-items: flex-start;
`;

export const QuickAccessItem = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.lg};
`;

export const QuickAccessButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: ${borderRadius.full};
  background: ${colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.background.primary};
  font-weight: ${typography.weights.semibold};
  font-size: ${typography.sizes.xs};
  ${buttonBase}
  
  &:hover:not(:disabled) {
    background: ${colors.primaryHover};
  }
  
  svg {
    width: ${spacing.xl};
    height: ${spacing.xl};
    color: ${colors.background.primary};
    stroke: ${colors.background.primary};
    fill: none;
    stroke-width: 2.2;
  }
`;

export const QuickAccessLabel = styled.span`
  color: ${colors.text.primary};
  font-size: ${typography.sizes.md};
  font-weight: ${typography.weights.normal};
  text-align: center;
`;

export const BalanceAmount = styled.span`
  font-size: ${typography.sizes.huge};
  font-weight: ${typography.weights.bold};
  color: ${colors.text.primary};
  letter-spacing: 0.01em;
  text-align: center;
`;

export const BalanceEye = styled.button`
  background: none;
  padding: 0;
  margin-left: ${spacing.xs};
  display: flex;
  align-items: center;
  ${buttonBase}
  
  svg {
    width: 22px;
    height: 22px;
    color: ${colors.text.muted};
    stroke: ${colors.text.muted};
    fill: ${colors.background.primary};
  }
`;

export const BalanceSub = styled.div`
  font-size: ${typography.sizes.sm};
  color: ${colors.text.primary};
  font-weight: ${typography.weights.normal};
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
`;

export const BalancePortfolioLink = styled.a`
  color: ${colors.primary};
  font-weight: ${typography.weights.semibold};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: ${spacing.sm};
  font-size: ${typography.sizes.xxl};
  line-height: 1;
  vertical-align: middle;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const BalancePortfolioIcon = styled.span`
  display: flex;
  align-items: center;
  height: ${typography.sizes.xxl};
  
  svg {
    width: ${typography.sizes.xxl};
    height: ${typography.sizes.xxl};
    color: ${colors.primary};
    stroke: ${colors.primary};
    fill: none;
    stroke-width: 2.2;
    display: block;
  }
`;

export const BalanceChange = styled.span`
  color: ${colors.text.muted};
  font-size: ${typography.sizes.xxl};
  font-weight: ${typography.weights.normal};
  margin-right: ${spacing.sm};
`;

export const TabsWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${colors.border.primary};
  width: 100%;
  justify-content: center;
`;

export const Tab = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active: boolean }>`
  background: none;
  border: none;
  outline: none;
  font-size: ${typography.sizes.xl};
  font-weight: ${({ active }) => (active ? typography.weights.bold : typography.weights.medium)};
  color: ${({ active }) => (active ? colors.text.primary : colors.text.tertiary)};
  border-bottom: 3px solid ${({ active }) => (active ? colors.text.primary : colors.border.primary)};
  padding: 0 ${spacing.xl} ${spacing.lg} ${spacing.xl};
  cursor: pointer;
  transition: color ${transitions.normal}, border-bottom ${transitions.normal};
  flex: 1;
  text-align: center;
`;

export const CenteredTabsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${spacing.lg};
  width: 100%;
`;

export const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 0 ${spacing.lg} 0;
`;

export const NetworkBadge = styled.div`
  background: none;
  color: ${colors.text.tertiary};
  font-size: ${typography.sizes.lg};
  font-weight: ${typography.weights.medium};
  border-radius: ${spacing.lg};
  padding: ${spacing.sm};
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  transition: background ${transitions.fast};
  cursor: pointer;
  
  &:hover {
    background: ${colors.background.tertiary};
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xxl};
`;

export const IconButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'selected'
})<{ selected?: boolean }>`
  background: ${({ selected }) => (selected ? colors.background.tertiary : 'none')};
  border: none;
  padding: ${spacing.lg};
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${colors.text.primary};
  border-radius: ${spacing.lg};
  transition: background ${transitions.fast};
  
  &:hover {
    background: ${colors.background.tertiary};
  }
`;

export const MenuDropdown = styled.div`
  position: absolute;
  top: 42px;
  right: 0;
  background: ${colors.background.primary};
  box-shadow: ${shadows.dropdown};
  border-radius: ${spacing.lg};
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
  gap: ${spacing.lg};
  width: 100%;
  background: ${colors.background.primary};
  border: none;
  outline: none;
  font-size: ${typography.sizes.lg};
  color: ${colors.text.primary};
  font-weight: ${typography.weights.medium};
  padding: ${spacing.xl};
  cursor: pointer;
  transition: background ${transitions.fast};
  
  &:hover {
    background: ${colors.background.secondary};
  }
`;

export const SortDropdown = styled.div`
  position: absolute;
  top: 42px;
  right: 0;
  background: ${colors.background.primary};
  box-shadow: ${shadows.dropdown};
  border-radius: ${spacing.lg};
  min-width: 270px;
  z-index: 101;
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const SortOption = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'selected'
})<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  background: ${({ selected }) => (selected ? '#eef1ff' : colors.background.primary)};
  border: none;
  outline: none;
  font-size: ${typography.sizes.lg};
  color: ${colors.text.primary};
  font-weight: ${typography.weights.medium};
  padding: ${spacing.xl};
  cursor: pointer;
  transition: background ${transitions.fast};
  position: relative;
  gap: ${spacing.lg};
  
  &:hover {
    background: ${({ selected }) => (selected ? '#eef1ff' : colors.background.secondary)};
  }
  
  &::before {
    content: '';
    display: ${({ selected }) => (selected ? 'block' : 'none')};
    position: absolute;
    left: 0;
    top: ${spacing.sm};
    bottom: ${spacing.sm};
    width: ${spacing.xs};
    border-radius: ${spacing.xs};
    background: ${colors.primary};
  }
`;

export const TokenRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: auto;
  min-height: 80px;
  cursor: pointer;
  
  &:hover {
    background: ${colors.background.secondary};
  }
`;

export const TokenInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  
  &:hover {
    cursor: pointer;
  }
`;

export const TokenLogos = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
`;

export const TokenLogoBig = styled.div`
  width: 35px;
  height: 35px;
  background: ${colors.background.tertiary};
  border-radius: ${borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${typography.sizes.xl};
  color: ${colors.text.primary};
  font-weight: ${typography.weights.medium};
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
`;

export const TokenLogoSmall = styled.div`
  width: 18px;
  height: 18px;
  background: ${colors.background.primary};
  border-radius: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${typography.sizes.base};
  color: ${colors.text.primary};
  font-weight: ${typography.weights.medium};
  position: absolute;
  left: 18px;
  top: 18px;
  z-index: 2;
  border: 2px solid ${colors.border.primary};
  box-shadow: ${shadows.sm};
`;

export const TokenName = styled.span`
  font-size: ${typography.sizes.lg};
  font-weight: ${typography.weights.bold};
  color: ${colors.text.primary};
`;

export const TokenValues = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  min-width: 110px;
`;

export const TokenUsd = styled.span`
  font-size: ${typography.sizes.xxxxl};
  font-weight: ${typography.weights.bold};
  color: ${colors.text.primary};
  line-height: 1.1;
`;

export const TokenAmount = styled.span`
  font-size: ${typography.sizes.md};
  font-weight: ${typography.weights.bold};
  color: ${colors.text.secondary};
  letter-spacing: 0.01em;
  word-break: break-all;
  overflow-wrap: break-word;
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
`;

export const NFTGrid = styled.div`
  display: flex;
  gap: ${spacing.xxxl};
  justify-content: flex-start;
  width: 100%;
`;

export const NFTCard = styled.div`
  background: ${colors.background.tertiary};
  border-radius: ${spacing.lg};
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
  right: ${spacing.lg};
  bottom: ${spacing.lg};
  width: 32px;
  height: 32px;
  background: ${colors.background.primary};
  border-radius: ${borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${typography.sizes.md};
  color: ${colors.text.primary};
  font-weight: ${typography.weights.medium};
  box-shadow: ${shadows.sm};
  border: 1.5px solid ${colors.border.primary};
`;

export const NFTActionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${spacing.xxl};
  margin-top: ${spacing.xxxl};
`;

export const NFTActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 7px;
  background: none;
  border: none;
  outline: none;
  color: ${colors.primary};
  font-size: ${typography.sizes.md};
  font-weight: ${typography.weights.semibold};
  cursor: pointer;
  padding: 0;
  transition: text-decoration ${transitions.fast};
  
  &:hover {
    text-decoration: underline;
    text-underline-offset: ${spacing.xs};
  }
`;

export const TransferContainer = styled.div`
  box-shadow: none;
  padding: 0 ${spacing.lg};
  background: none;
  width: 100%;
  max-width: 100%;
`;

export const SendAmount = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${spacing.xs};
  font-size: ${typography.sizes.lg};
  font-weight: ${typography.weights.normal};
  color: ${colors.text.primary};
`;

export const AccountBox = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active?: boolean }>`
  display: flex;
  align-items: center;
  background: ${colors.background.primary};
  border-radius: ${spacing.lg};
  border: 1.5px solid ${({ active }) => (active ? colors.primary : colors.border.primary)};
  padding: ${spacing.md} ${spacing.xxl};
  gap: ${spacing.md};
  width: 100%;
  margin-bottom: ${spacing.sm};
`;

export const AccountIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${borderRadius.full};
  background: linear-gradient(135deg, #ffe14d 60%, ${colors.primary} 40%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${typography.sizes.xxxxl};
`;

export const AccountDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AccountName = styled.div`
  font-size: ${typography.sizes.base};
  font-weight: ${typography.weights.semibold};
`;

export const AccountAddress = styled.div`
  font-size: ${typography.sizes.sm};
  color: ${colors.text.tertiary};
`;

export const DropdownIcon = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

export const InputBox = styled.div`
  display: flex;
  align-items: center;
  background: ${colors.background.primary};
  border-radius: ${spacing.lg};
  border: 1.5px solid ${colors.primary};
  padding: ${spacing.lg} ${spacing.md};
  gap: ${spacing.sm};
  width: 100%;
  margin-bottom: ${spacing.sm};
`;

export const AddressInput = styled.input`
  border: none;
  outline: none;
  font-size: ${typography.sizes.md};
  flex: 1;
  background: transparent;
`;

export const ScanButton = styled.button`
  background: none;
  border: none;
  color: ${colors.primary};
  font-size: ${typography.sizes.xl};
  cursor: pointer;
`;

export const BottomActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${spacing.lg};
  margin-top: ${spacing.xxxxl};
`;

export const CancelButton = styled.button`
  flex: 1;
  background: none;
  border: 2px solid ${colors.primary};
  color: ${colors.primary};
  font-size: ${typography.sizes.xl};
  font-weight: ${typography.weights.semibold};
  border-radius: ${borderRadius.xxl};
  padding: ${spacing.lg} 0;
  cursor: pointer;
  transition: background ${transitions.normal}, color ${transitions.normal};
  
  &:hover {
    background: ${colors.background.tertiary};
  }
`;

export const ContinueButton = styled.button`
  flex: 1;
  background: ${colors.primary};
  border: none;
  color: ${colors.background.primary};
  font-size: ${typography.sizes.xl};
  font-weight: ${typography.weights.semibold};
  border-radius: ${borderRadius.xxl};
  padding: ${spacing.lg} 0;
  cursor: pointer;
  transition: background ${transitions.normal};
  
  &:hover {
    background: ${colors.primaryHover};
  }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(24, 25, 29, 0.18);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AnimatedModalContainer = styled.div`
  background: ${colors.background.primary};
  border-radius: ${borderRadius.xxxxl};
  box-shadow: ${shadows.lg};
  width: 420px;
  max-width: 98vw;
  padding: 0 0 ${spacing.xxxl} 0;
  position: relative;
  display: flex;
  flex-direction: column;
  animation: ${slideUpFadeIn} ${transitions.slow} both;
`;

export const ModalHeader = styled.h2`
  font-size: ${typography.sizes.xxxxl};
  font-weight: ${typography.weights.bold};
  text-align: center;
  padding: ${spacing.xxxl} ${spacing.xxxl} 0 ${spacing.xxxl};
  margin: 0 0 ${spacing.xl} 0;
  color: ${colors.text.primary};
`;

export const ModalClose = styled.button`
  position: absolute;
  top: ${spacing.xxxl};
  right: ${spacing.xxxl};
  background: none;
  border: none;
  font-size: ${typography.sizes.xxxxl};
  color: ${colors.text.primary};
  cursor: pointer;
  transition: background-color ${transitions.fast};
  
  &:hover {
    background: ${colors.background.tertiary};
    border-radius: ${borderRadius.sm};
  }
  
  &:focus {
    outline: 2px solid ${colors.primary};
    outline-offset: 2px;
  }
`;

export const ModalLabel = styled.div`
  font-size: ${typography.sizes.md};
  font-weight: ${typography.weights.semibold};
  color: ${colors.text.primary};
  margin: 25px ${spacing.xxxl} 0 ${spacing.xxxl};
`;

export const ModalInput = styled.input`
  width: auto;
  margin: ${spacing.sm} ${spacing.xxxl} 0 ${spacing.xxxl};
  padding: ${spacing.md} ${spacing.lg};
  ${inputBase}
`;

export const ErrorMsg = styled.div`
  color: ${colors.error};
  font-size: ${typography.sizes.base};
  margin: ${spacing.sm} ${spacing.xxxl} 0 ${spacing.xxxl};
  min-height: ${typography.sizes.base};
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${spacing.lg};
  margin-top: ${spacing.xxxxl};
  padding: 0 ${spacing.xxl};
`;

export const ModalActionButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'primary' && prop !== 'disabled'
})<{ primary?: boolean; disabled?: boolean }>`
  flex: 1;
  background: ${({ primary, disabled }) => {
    if (disabled) return colors.background.tertiary;
    return primary ? colors.secondary : 'none';
  }};
  border: 2px solid ${({ disabled }) => disabled ? colors.background.tertiary : colors.secondary};
  color: ${({ primary, disabled }) => {
    if (disabled) return colors.text.light;
    return primary ? colors.background.primary : colors.secondary;
  }};
  font-size: ${typography.sizes.xl};
  font-weight: ${typography.weights.semibold};
  border-radius: ${borderRadius.xxxl};
  padding: ${spacing.xxl} 0;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: all ${transitions.normal};
  
  &:hover:not(:disabled) {
    background: ${({ primary }) => (primary ? colors.secondaryHover : colors.background.hover)};
    color: ${({ primary }) => (primary ? colors.background.primary : colors.secondaryHover)};
  }
  
  &:focus {
    outline: 2px solid ${colors.primary};
    outline-offset: 2px;
  }
`;

export const DepositModalContainer = styled.div`
  background: ${colors.background.primary};
  border-radius: ${borderRadius.xxxxl};
  box-shadow: ${shadows.lg};
  width: 300px;
  max-width: 98vw;
  margin: ${spacing.xxxxl} auto;
  gap: ${spacing.sm};
  padding: ${spacing.xxxl} ${spacing.xxl} ${spacing.xxxl} ${spacing.xxl};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const DepositCloseButton = styled.button`
  position: absolute;
  top: ${spacing.xxl};
  right: ${spacing.xxl};
  background: none;
  border: none;
  font-size: 3rem;
  color: ${colors.text.primary};
  cursor: pointer;
  transition: background-color ${transitions.fast};
  
  &:hover {
    background: ${colors.background.tertiary};
    border-radius: ${spacing.xs};
  }
  
  &:focus {
    outline: 2px solid ${colors.primary};
    outline-offset: 2px;
  }
`;

export const DepositTitle = styled.h2`
  font-size: ${typography.sizes.xxxxxl};
  font-weight: ${typography.weights.bold};
  text-align: center;
  margin: 0 0 ${spacing.xxxl} 0;
  color: ${colors.text.primary};
`;

export const DepositQRWrapper = styled.div`
  background: ${colors.background.primary};
  border-radius: ${spacing.xl};
  padding: ${spacing.lg};
  margin-bottom: ${spacing.sm};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.border.secondary};
  box-shadow: ${shadows.md};
`;

export const DepositAccountName = styled.div`
  font-size: ${typography.sizes.md};
  font-weight: ${typography.weights.semibold};
  color: ${colors.text.primary};
  margin: 18px 0 6px 0;
  text-align: center;
`;

export const DepositAccountAddress = styled.div`
  font-size: ${typography.sizes.md};
  color: ${colors.text.secondary};
  font-weight: ${typography.weights.normal};
  text-align: center;
  word-break: break-all;
  margin-bottom: 18px;
  max-width: 280px;
  line-height: 1.5;
`;

export const DepositCopyIconWrapper = styled.span`
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const DepositCopyButton = styled.button<{ $copied: boolean }>`
  display: flex;
  align-items: center;
  gap: ${spacing.lg};
  background: none;
  border: none;
  color: ${({ $copied }) => ($copied ? colors.success : colors.primary)};
  font-size: ${typography.sizes.base};
  font-weight: ${typography.weights.semibold};
  cursor: pointer;
  margin: 0 auto;
  padding: ${spacing.sm} ${spacing.lg};
  border-radius: ${borderRadius.sm};
  transition: all ${transitions.fast};
  
  &:hover {
    color: ${({ $copied }) => ($copied ? colors.successHover : colors.primaryHover)};
    background: ${({ $copied }) => ($copied ? colors.background.success : colors.background.hover)};
  }
  
  &:focus {
    outline: 2px solid ${colors.primary};
    outline-offset: 2px;
  }
  
  svg {
    color: inherit;
    fill: currentColor;
    stroke: currentColor;
    transition: all ${transitions.fast};
  }
`;

export const TabButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active: boolean }>`
  width: 100%;
  background: none;
  border: 2px solid ${colors.primary};
  color: ${({ active }) => (active ? colors.text.primary : colors.text.muted)};
  font-size: ${typography.sizes.xl};
  font-weight: ${typography.weights.semibold};
  border-radius: ${borderRadius.sm};
  padding: ${spacing.md} 0;
  margin: ${spacing.xxl} ${spacing.xxxl} 0 ${spacing.xxxl};
  cursor: pointer;
  transition: background ${transitions.normal}, color ${transitions.normal};
  
  &:hover, &:focus {
    background: ${colors.background.tertiary};
    color: ${colors.primary};
  }
`;

export const InfoAlert = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${spacing.lg};
  background: #f5f7ff;
  color: ${colors.text.primary};
  border-left: 5px solid ${colors.primary};
  border-radius: ${borderRadius.sm};
  padding: ${spacing.xxl} ${spacing.lg};
  margin: ${spacing.xxl} ${spacing.xxxl} 0 ${spacing.xxxl};
  font-size: ${typography.sizes.md};
`;

export const InfoIconWrapper = styled.span`
  margin-top: 2px;
  svg {
    width: 22px;
    height: 22px;
    color: ${colors.primary};
  }
`;

export const NetworkSelect = styled.button`
  width: 100%;
  background: ${colors.background.secondary};
  border: 1.5px solid ${colors.border.primary};
  color: ${colors.text.tertiary};
  font-size: ${typography.sizes.lg};
  font-weight: ${typography.weights.medium};
  border-radius: ${borderRadius.sm};
  padding: ${spacing.xxl} ${spacing.lg};
  margin: ${spacing.xxl} ${spacing.xxxl} 0 ${spacing.xxxl};
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: border-color ${transitions.fast};
  
  &:hover {
    border-color: ${colors.primary};
  }
  
  &:focus {
    outline: 2px solid ${colors.primary};
    outline-offset: 2px;
  }
`;

export const NextButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'disabled'
})<{ disabled: boolean }>`
  width: calc(100% - 64px);
  margin: ${spacing.xxxl} ${spacing.xxxl} 0 ${spacing.xxxl};
  padding: ${spacing.xxl} 0;
  border-radius: ${borderRadius.xxl};
  background: ${colors.primary};
  color: ${colors.background.primary};
  font-size: ${typography.sizes.xl};
  font-weight: ${typography.weights.semibold};
  border: none;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background ${transitions.normal}, opacity ${transitions.normal};
  
  &:hover:not(:disabled) {
    background: ${colors.primaryHover};
  }
  
  &:focus {
    outline: 2px solid ${colors.primary};
    outline-offset: 2px;
  }
`;

export const TokenInfoBox = styled.div`
  margin: ${spacing.sm} ${spacing.xxxl} 0 ${spacing.xxxl};
  padding: ${spacing.md} ${spacing.lg};
  border-radius: ${borderRadius.sm};
  border: 1.5px solid ${colors.border.primary};
  font-size: ${typography.sizes.md};
  color: ${colors.text.primary};
  background: ${colors.background.secondary};
`;

export const TokenInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TokenInfoValue = styled.span`
  color: ${colors.text.primary};
  font-size: ${typography.sizes.md};
  align-items: center;
`;

export const TokenSummaryBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${spacing.lg};
  margin: ${spacing.xxxl} ${spacing.xxxl} 0 ${spacing.xxxl};
`;

export const TokenSummaryLogo = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${borderRadius.full};
  background: ${colors.background.tertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${typography.sizes.xxxxl};
  color: ${colors.text.primary};
  font-weight: ${typography.weights.bold};
  position: relative;
`;

export const TokenSummaryLogoSmall = styled.div`
  position: absolute;
  left: 28px;
  top: 28px;
  width: 20px;
  height: 20px;
  border-radius: ${borderRadius.full};
  background: ${colors.background.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${typography.sizes.xs};
  color: ${colors.text.primary};
  font-weight: ${typography.weights.bold};
  border: 2px solid ${colors.border.primary};
`;

export const TokenSummaryInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const TokenSummaryName = styled.div`
  font-size: ${typography.sizes.xl};
  font-weight: ${typography.weights.bold};
  color: ${colors.text.primary};
`;

export const TokenSummaryAddress = styled.div`
  font-size: ${typography.sizes.md};
  color: ${colors.text.primary};
  word-break: break-all;
`;

export const TokenSummarySymbol = styled.div`
  font-size: ${typography.sizes.md};
  color: ${colors.text.primary};
  font-weight: ${typography.weights.medium};
`;

export const TokenSummaryBalance = styled.div`
  font-size: ${typography.sizes.md};
  color: rgb(179, 179, 179);
  font-weight: ${typography.weights.semibold};
  margin-top: ${spacing.sm};
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StepActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${spacing.lg};
  margin-top: 64px;
  padding: 0 ${spacing.xxl};
`;

export const StepButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'primary' && prop !== 'disabled'
})<{ primary?: boolean; disabled?: boolean }>`
  flex: 1;
  background: ${({ primary, disabled }) => {
    if (disabled) return colors.background.tertiary;
    return primary ? colors.secondary : 'none';
  }};
  border: 2px solid ${({ disabled }) => disabled ? colors.background.tertiary : colors.secondary};
  color: ${({ primary, disabled }) => {
    if (disabled) return colors.text.light;
    return primary ? colors.background.primary : colors.secondary;
  }};
  font-size: ${typography.sizes.xl};
  font-weight: ${typography.weights.semibold};
  border-radius: ${borderRadius.xxxl};
  padding: ${spacing.xxl} 0;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: all ${transitions.normal};
  
  &:hover:not(:disabled) {
    background: ${({ primary }) => (primary ? colors.secondaryHover : colors.background.hover)};
    color: ${({ primary }) => (primary ? colors.background.primary : colors.secondaryHover)};
  }
  
  &:focus {
    outline: 2px solid ${colors.primary};
    outline-offset: 2px;
  }
`;

export const CenteredText = styled.div`
  text-align: center;
  font-size: ${typography.sizes.xl};
  margin: ${spacing.xxl} 0 0 0;
  font-weight: ${typography.weights.normal};
  color: ${colors.text.primary};
`;

export const LabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  font-size: ${typography.sizes.md};
  font-weight: ${typography.weights.semibold};
  color: ${colors.text.primary};
  margin: 25px ${spacing.xxxl} 0 ${spacing.xxxl};
`;