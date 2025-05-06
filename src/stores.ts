import { writable } from "svelte/store";

// Define the initial settings structure
const initialSettings = {
  selectedMode: "uwuifiy", // Default mode
  mispellSettings: {
    iq: 50, // Default IQ for mispell
  },
  uwuifierSettings: {
    spaces: {
      faces: 0.5,
      actions: 0.075,
      stutters: 0.1,
    },
    words: 1,
    exclamations: 1,
  },
};

// Create and export the writable store
export const textProcessorSettings = writable(initialSettings);

// Optional: Define the type for the settings object for better type safety
export type TextProcessorSettings = typeof initialSettings;
