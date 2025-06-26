import { useState, useEffect, useCallback } from 'react';
import {
  getImportedTokens,
  addImportedToken,
  removeImportedToken,
  setImportedTokens
} from '../utils/localStorage';
import { ImportedToken } from '../types/token';

export const useImportedTokens = () => {
  const [importedTokens, setImportedTokensState] = useState<ImportedToken[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load tokens from localStorage on hook initialization
  useEffect(() => {
    const loadTokens = () => {
      try {
        const tokens = getImportedTokens();
        setImportedTokensState(tokens);
      } catch (error) {
        console.error('Error loading imported tokens:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTokens();
  }, []);

  // Add a new token
  const addToken = useCallback((token: ImportedToken) => {
    try {
      addImportedToken(token);
      // Reload tokens from localStorage to ensure consistency
      const updatedTokens = getImportedTokens();
      setImportedTokensState(updatedTokens);
      console.log('Updated tokens:', updatedTokens);
    } catch (error) {
      console.error('Error adding token:', error);
    }
  }, []);

  // Remove a token
  const removeToken = useCallback((address: string) => {
    try {
      removeImportedToken(address);
      // Reload tokens from localStorage to ensure consistency
      const updatedTokens = getImportedTokens();
      setImportedTokensState(updatedTokens);
      console.log('Updated tokens:', updatedTokens);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  }, []);

  // Update token balance
  const updateTokenBalance = useCallback((address: string, balance: string) => {
    setImportedTokensState(prev => {
      const updated = prev.map(token => 
        token.address.toLowerCase() === address.toLowerCase()
          ? { ...token, balance }
          : token
      );
      
      // Persist the updated tokens to localStorage
      try {
        setImportedTokens(updated);
      } catch (error) {
        console.error('Error updating token balance in localStorage:', error);
      }
      
      return updated;
    });
  }, []);

  // Clear all tokens
  const clearAllTokens = useCallback(() => {
    try {
      setImportedTokens([]);
      setImportedTokensState([]);
    } catch (error) {
      console.error('Error clearing tokens:', error);
    }
  }, []);

  // Check if a token exists
  const hasToken = useCallback((address: string) => {
    return importedTokens.some(
      token => token.address.toLowerCase() === address.toLowerCase()
    );
  }, [importedTokens]);

  // Refresh tokens from localStorage
  const refreshTokens = useCallback(() => {
    try {
      const tokens = getImportedTokens();
      setImportedTokensState(tokens);
    } catch (error) {
      console.error('Error refreshing tokens:', error);
    }
  }, []);

  return {
    importedTokens,
    isLoading,
    addToken,
    removeToken,
    updateTokenBalance,
    clearAllTokens,
    hasToken,
    refreshTokens
  };
};