declare global {
  interface Window {
    // Adjust type based on actual library structure
    mispell?: {
      bimbofy: (text: string, iq: number) => string;
      // other functions/properties?
    };
  }
}
export {}; // Ensure this file is treated as a module
