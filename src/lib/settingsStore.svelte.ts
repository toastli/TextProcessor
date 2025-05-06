export interface UwuifierSettings {
  spaces: {
    faces: number;
    actions: number;
    stutters: number;
  };
  words: number;
  exclamations: number;
}

export interface MispellSettings {
  iq: number;
}

export interface TextProcessorSettings {
  selectedMode: "uwuify" | "mispell";
  uwuifierSettings: UwuifierSettings;
  mispellSettings: MispellSettings;
}

const defaultSettings: TextProcessorSettings = {
  selectedMode: "uwuify",
  uwuifierSettings: {
    spaces: {
      faces: 0.5,
      actions: 0.075,
      stutters: 0.1,
    },
    words: 1,
    exclamations: 1,
  },
  mispellSettings: {
    iq: 100,
  },
};

// Create the reactive settings store using $state
export const textProcessorSettings = $state(defaultSettings);
