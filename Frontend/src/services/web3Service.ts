import { ethers } from 'ethers';

export class Web3Service {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.Signer | null = null;

  async connect(): Promise<boolean> {
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed');
      }

      this.provider = new ethers.BrowserProvider(window.ethereum);
      await this.provider.send('eth_requestAccounts', []);
      this.signer = await this.provider.getSigner();
      return true;
    } catch (error) {
      console.error('Failed to connect to Web3:', error);
      return false;
    }
  }

  async getAddress(): Promise<string | null> {
    try {
      if (!this.signer) {
        throw new Error('Not connected to Web3');
      }
      return await this.signer.getAddress();
    } catch (error) {
      console.error('Failed to get address:', error);
      return null;
    }
  }

  async getBalance(address: string): Promise<string | null> {
    try {
      if (!this.provider) {
        throw new Error('Not connected to Web3');
      }
      const balance = await this.provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('Failed to get balance:', error);
      return null;
    }
  }
}

export const web3Service = new Web3Service();