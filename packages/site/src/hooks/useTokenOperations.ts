import { useState } from 'react';
import { ethers } from 'ethers';

// ABI simplificado para ERC20, ERC721 y ERC1155
const ERC20_ABI = [
  'function transfer(address to, uint256 amount) returns (bool)',
  'function balanceOf(address account) view returns (uint256)',
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
];

const ERC721_ABI = [
  'function transferFrom(address from, address to, uint256 tokenId)',
  'function balanceOf(address owner) view returns (uint256)',
  'function name() view returns (string)',
  'function symbol() view returns (string)',
];

const ERC1155_ABI = [
  'function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data)',
  'function balanceOf(address account, uint256 id) view returns (uint256)',
  'function uri(uint256 id) view returns (string)',
];

/**
 * Custom hook for interacting with ERC20, ERC721, and ERC1155 tokens.
 * Provides functions for transferring tokens, checking balances, and retrieving contract details.
 * @param provider - The ethers provider to interact with the blockchain.
 * @returns An object containing loading state, error state, and functions for token operations.
 */
export const useTokenOperations = (provider: ethers.BrowserProvider) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to transfer ERC20 tokens
  const transferERC20 = async (tokenAddress: string, to: string, amount: string) => {
    setLoading(true);
    setError(null);
    try {
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
      const tx = await (contract as any).transfer(to, ethers.parseEther(amount));
      if (!tx) throw new Error('Transaction could not be initiated');
      await tx.wait();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error transferring ERC20 token');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Function to get ERC20 token balance
  const getERC20Balance = async (tokenAddress: string, account: string) => {
    setLoading(true);
    setError(null);
    try {
      const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
      const balance = await (contract as any).balanceOf(account);
      if (!balance) throw new Error('Could not retrieve balance');
      return ethers.formatEther(balance);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error retrieving ERC20 balance');
      return '0';
    } finally {
      setLoading(false);
    }
  };

  // Function to get ERC20 contract details
  const getERC20Details = async (tokenAddress: string) => {
    setLoading(true);
    setError(null);
    try {
      const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
      const name = await (contract as any).name();
      const symbol = await (contract as any).symbol();
      const decimals = await (contract as any).decimals();
      if (!name || !symbol || !decimals) throw new Error('Could not retrieve contract details');
      return { name, symbol, decimals };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error retrieving ERC20 details');
      return { name: '', symbol: '', decimals: 0 };
    } finally {
      setLoading(false);
    }
  };

  // Function to transfer ERC721 tokens
  const transferERC721 = async (tokenAddress: string, to: string, tokenId: string) => {
    setLoading(true);
    setError(null);
    try {
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, ERC721_ABI, signer);
      const tx = await (contract as any).transferFrom(await signer.getAddress(), to, tokenId);
      if (!tx) throw new Error('Transaction could not be initiated');
      await tx.wait();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error transferring ERC721 token');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Function to get ERC721 token balance
  const getERC721Balance = async (tokenAddress: string, account: string) => {
    setLoading(true);
    setError(null);
    try {
      const contract = new ethers.Contract(tokenAddress, ERC721_ABI, provider);
      const balance = await (contract as any).balanceOf(account);
      if (!balance) throw new Error('Could not retrieve balance');
      return balance.toString();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error retrieving ERC721 balance');
      return '0';
    } finally {
      setLoading(false);
    }
  };

  // Function to get ERC721 contract details
  const getERC721Details = async (tokenAddress: string) => {
    setLoading(true);
    setError(null);
    try {
      const contract = new ethers.Contract(tokenAddress, ERC721_ABI, provider);
      const name = await (contract as any).name();
      const symbol = await (contract as any).symbol();
      if (!name || !symbol) throw new Error('Could not retrieve contract details');
      return { name, symbol };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error retrieving ERC721 details');
      return { name: '', symbol: '' };
    } finally {
      setLoading(false);
    }
  };

  // Function to transfer ERC1155 tokens
  const transferERC1155 = async (tokenAddress: string, to: string, tokenId: string, amount: string) => {
    setLoading(true);
    setError(null);
    try {
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, ERC1155_ABI, signer);
      const tx = await (contract as any).safeTransferFrom(await signer.getAddress(), to, tokenId, amount, '0x');
      if (!tx) throw new Error('Transaction could not be initiated');
      await tx.wait();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error transferring ERC1155 token');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Function to get ERC1155 token balance
  const getERC1155Balance = async (tokenAddress: string, account: string, tokenId: string) => {
    setLoading(true);
    setError(null);
    try {
      const contract = new ethers.Contract(tokenAddress, ERC1155_ABI, provider);
      const balance = await (contract as any).balanceOf(account, tokenId);
      if (!balance) throw new Error('Could not retrieve balance');
      return balance.toString();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error retrieving ERC1155 balance');
      return '0';
    } finally {
      setLoading(false);
    }
  };

  // Function to get ERC1155 contract details
  const getERC1155Details = async (tokenAddress: string, tokenId: string) => {
    setLoading(true);
    setError(null);
    try {
      const contract = new ethers.Contract(tokenAddress, ERC1155_ABI, provider);
      const uri = await (contract as any).uri(tokenId);
      if (!uri) throw new Error('Could not retrieve token URI');
      return { uri };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error retrieving ERC1155 details');
      return { uri: '' };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    transferERC20,
    getERC20Balance,
    getERC20Details,
    transferERC721,
    getERC721Balance,
    getERC721Details,
    transferERC1155,
    getERC1155Balance,
    getERC1155Details,
  };
}; 