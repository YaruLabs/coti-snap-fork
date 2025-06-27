import React from 'react';
import { BalanceAmount } from './styles';
import EyeIcon from '../../assets/eye.svg';
import EyeOffIcon from '../../assets/eye-off.svg';

interface BalanceProps {
  balance: string;
  currency?: string;
  className?: string;
  showCurrency?: boolean;
  isDecrypted?: boolean;
  onToggleDecryption?: () => void;
}

const DEFAULT_CURRENCY = 'COTI';

export const Balance: React.FC<BalanceProps> = ({ 
  balance, 
  currency = DEFAULT_CURRENCY,
  className,
  showCurrency = true,
  isDecrypted = false,
  onToggleDecryption
}) => {
  const formattedBalance = React.useMemo(() => {
    if (!balance || balance === '0' || typeof balance !== 'string') return '0';
    return balance;
  }, [balance]);

  const displayText = React.useMemo(() => {
    if (!showCurrency) return formattedBalance;
    return `${formattedBalance} ${currency}`;
  }, [formattedBalance, currency, showCurrency]);

  return (
    <BalanceAmount className={className}>
      {displayText}
      {onToggleDecryption && (
        <span 
          onClick={onToggleDecryption}
          style={{ 
            marginLeft: '12px', 
            cursor: 'pointer', 
            color: '#007bff',
            fontSize: '16px',
            display: 'inline-flex',
            alignItems: 'center',
            width: '16px',
            height: '16px'
          }}
          title={isDecrypted ? "Hide token balances" : "Show token balances"}
        >
          {isDecrypted ? <EyeOffIcon /> : <EyeIcon />}
        </span>
      )}
    </BalanceAmount>
  );
};