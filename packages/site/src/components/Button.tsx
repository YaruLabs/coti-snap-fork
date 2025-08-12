import React from 'react';
import styled from 'styled-components';

type ButtonProps = {
  text: string;
  primary?: boolean;
  error?: boolean;
  fullWith?: boolean;
  onClick?: (() => void) | (() => Promise<void>);
  disabled?: boolean;
  icon?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

const getBackgroundColor = (props: any) => {
  if (props.$error) {
    return 'rgba(248, 110, 110, 0.2)';
  }
  if (props.$primary) {
    return 'rgba(255, 255, 255, 0.2)';
  }
  if (props.$disabled) {
    return 'rgba(255, 255, 255, 0.1)';
  }
  return 'rgba(255, 255, 255, 0.15)';
};

const getColor = (props: any) => {
  return '#FFFFFF';
};

const getBorder = (props: any) => {
  if (props.$error || props.$primary) {
    return 'none';
  }
  return '1px solid rgba(255, 255, 255, 0.3)';
};

const getHoverBackgroundColor = (props: any) => {
  if (props.$error) {
    return 'rgba(248, 110, 110, 0.3)';
  }
  if (props.$primary) {
    return 'rgba(255, 255, 255, 0.3)';
  }
  return 'rgba(255, 255, 255, 0.25)';
};

const getHoverBorder = (props: any) => {
  if (props.$error || props.$primary || props.$disabled) {
    return 'none';
  }
  return '1px solid rgba(255, 255, 255, 0.5)';
};

const getHoverColor = (props: any) => {
  return '#FFFFFF';
};

const getActionHoverBackgroundColor = (props: any) => {
  return 'rgba(30, 41, 246, 0.8)'; // #1E29F6 with soft opacity
};

const ButtonStyle = styled.button<{
  $primary?: boolean;
  $error?: boolean;
  $fullWith?: boolean;
  $disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSizes.small};
  line-height: 1.2;
  border-radius: ${(props) => props.theme.radii.button};
  background-color: ${getBackgroundColor};
  color: ${getColor};
  border: ${getBorder};
  font-weight: 500;
  font-size: 'Sofia Pro';
  flex: ${(props) => (props.$fullWith ? '1' : 'none')};
  padding: 12px 40px;
  min-height: 4.2rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${getHoverBackgroundColor};
    border: ${getHoverBorder};
    color: ${getHoverColor};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: rgba(255, 255, 255, 0.1);
    color: #000000;
    opacity: 0.5;
  }
`;

const ButtonActionStyle = styled.button<{
  $primary?: boolean;
  $error?: boolean;
  $fullWith?: boolean;
  $disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSizes.small};
  line-height: 1.2;
  border-radius: ${(props) => props.theme.radii.small};
  background-color: #1E29F6;
  color: ${getColor};
  border: ${getBorder};
  font-weight: 500;
  font-size: 'Sofia Pro';
  flex: ${(props) => (props.$fullWith ? '1' : 'none')};
  padding: 15px 40px;
  min-height: 4.2rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${getActionHoverBackgroundColor};
    border: ${getHoverBorder};
    color: ${getHoverColor};
  }

  &:disabled {
    cursor: not-allowed;
    background-color:  ${getActionHoverBackgroundColor};
    color: ${getHoverColor};
    opacity: 0.5;
  }
`;


export const Button: React.FC<ButtonProps> = ({
  text,
  primary = false,
  error = false,
  fullWith = false,
  onClick,
  disabled = false,
  icon,
  iconLeft,
  iconRight,
}) => {
  return (
    <ButtonStyle
      $primary={primary}
      $error={error}
      $fullWith={fullWith}
      onClick={onClick}
      disabled={disabled}
    >
      {(iconLeft || icon) && <span style={{ marginRight: '8px' }}>{iconLeft || icon}</span>}
      {text}
      {iconRight && <span style={{ marginLeft: '8px' }}>{iconRight}</span>}
    </ButtonStyle>
  );
};

export const ButtonAction: React.FC<ButtonProps> = ({
  text,
  primary = false,
  error = false,
  fullWith = false,
  onClick,
  disabled = false,
  icon,
  iconLeft,
  iconRight,
}) => {
  return (
    <ButtonActionStyle
      $primary={primary}
      $error={error}
      $fullWith={fullWith}
      onClick={onClick}
      disabled={disabled}
    >
      {(iconLeft || icon) && <span style={{ marginRight: '8px' }}>{iconLeft || icon}</span>}
      {text}
      {iconRight && <span style={{ marginLeft: '8px' }}>{iconRight}</span>}
    </ButtonActionStyle>
  );
};