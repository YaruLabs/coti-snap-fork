import {
  BalanceHeader,
  BalanceAmountRow,
  BalanceAmount,
  BalanceEye,
  BalanceSub,
  BalancePortfolioLink,
  BalancePortfolioIcon,
  BalanceChange,
} from './styles';
import EyeIcon from '../../assets/eye.svg';

// External link SVG (you can replace with a component if you have one)
const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
);

export const Balance = () => {
  return (
    <BalanceHeader>
      <BalanceAmountRow>
        <BalanceAmount>$0.00 USD</BalanceAmount>
        <BalanceEye aria-label="Show/hide balance">
          <EyeIcon />
        </BalanceEye>
      </BalanceAmountRow>
      <BalanceSub>
        <BalanceChange>+$0 (+0.00%)</BalanceChange>
        <BalancePortfolioLink href="https://portfolio.metamask.io/" target="_blank" rel="noopener noreferrer">
          Portfolio
          <BalancePortfolioIcon>
            <ExternalLinkIcon />
          </BalancePortfolioIcon>
        </BalancePortfolioLink>
      </BalanceSub>
    </BalanceHeader>
  );
};