import { ImportedToken } from '../types/token';

export type SortType = 'az' | 'decline';

/**
 * Sorts tokens based on the specified sort type
 */
export const sortTokens = (tokens: ImportedToken[], sortType: SortType): ImportedToken[] => {
  const sortedTokens = [...tokens];
  
  if (sortType === 'az') {
    return sortedTokens.sort((a, b) => a.name.localeCompare(b.name));
  }
  
  // For balance sorting, we'll just return alphabetical order since decrypting 
  // all balances would be expensive. Could be enhanced later with caching.
  return sortedTokens.sort((a, b) => a.name.localeCompare(b.name));
};