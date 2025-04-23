import { OnchainKit } from 'base-onchainkit';

// Initialize Base OnchainKit
const onchain = new OnchainKit({
  network: 'base-mainnet', // or 'base-testnet' for testing
});

export const blockchainService = {
  async storeJournalEntry(metadata) {
    try {
      // Store the IPFS hash and metadata on Base blockchain
      const transaction = await onchain.createTransaction({
        data: JSON.stringify(metadata),
        type: 'journal_entry'
      });

      // Wait for transaction confirmation
      const receipt = await transaction.wait();
      return receipt;
    } catch (error) {
      console.error('Error storing data on blockchain:', error);
      throw error;
    }
  },

  async getJournalEntries() {
    try {
      // Query journal entries from the blockchain
      const entries = await onchain.queryTransactions({
        type: 'journal_entry'
      });

      return entries.map(entry => ({
        ...JSON.parse(entry.data),
        transactionHash: entry.hash,
        blockNumber: entry.blockNumber
      }));
    } catch (error) {
      console.error('Error fetching entries from blockchain:', error);
      throw error;
    }
  },

  async verifyEntry(transactionHash) {
    try {
      // Verify the entry's authenticity on the blockchain
      const transaction = await onchain.getTransaction(transactionHash);
      return transaction !== null;
    } catch (error) {
      console.error('Error verifying entry:', error);
      throw error;
    }
  }
};