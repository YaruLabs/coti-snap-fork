export interface ImportedToken {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  balance: string;
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