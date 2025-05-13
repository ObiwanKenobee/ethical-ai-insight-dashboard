
// Mock blockchain logging service
// In a real app, this would use ethers.js to interact with Ethereum
export const blockchainLogger = {
  // Log a hash of data to the blockchain
  logToBlockchain: async (data: any): Promise<string> => {
    // Create a hash for the data
    const hash = await createHash(data);
    
    console.log('Logging to blockchain:', { data, hash });
    
    // Simulate blockchain transaction
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, this would return a transaction hash
        const txHash = `0x${Math.random().toString(16).slice(2)}`;
        console.log(`Blockchain transaction: ${txHash}`);
        resolve(txHash);
      }, 1000);
    });
  },
  
  // Verify a hash exists on the blockchain
  verifyHash: async (hash: string): Promise<boolean> => {
    console.log('Verifying hash on blockchain:', hash);
    
    // Simulate blockchain verification
    return new Promise((resolve) => {
      setTimeout(() => {
        // Randomly return true or false for demo purposes
        const verified = Math.random() > 0.2;
        console.log(`Hash verification: ${verified ? 'Valid' : 'Invalid'}`);
        resolve(verified);
      }, 800);
    });
  }
};

// Helper function to create a hash
const createHash = async (data: any): Promise<string> => {
  // In a real app, use a proper hashing function
  const msgBuffer = new TextEncoder().encode(JSON.stringify(data));
  
  // Use crypto.subtle if available (in secure contexts)
  if (window.crypto && window.crypto.subtle) {
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return `0x${hashArray.map(b => b.toString(16).padStart(2, '0')).join('')}`;
  }
  
  // Fallback (not secure, just for demo)
  return `0x${Array.from(msgBuffer)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 64)}`;
};
