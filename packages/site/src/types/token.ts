export type TokenType = 'ERC20' | 'ERC721' | 'ERC1155';

export interface ImportedToken {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  type: TokenType;
}

export interface NFTFormData {
  address: string;
  tokenId: string;
}

export interface NFTFormErrors {
  address: string;
  tokenId: string;
}

export interface TokenFormData {
  address: string;
  symbol: string;
  decimals: string;
}

export interface TokenFormErrors {
  address: string;
  symbol: string;
  decimals: string;
}