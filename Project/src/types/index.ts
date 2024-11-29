export type Theme = 'light' | 'dark' | 'custom';
export type Version = {
  id: string;
  content: string;
  timestamp: number;
};

export interface EditorState {
  markdown: string;
  theme: Theme;
  livePreview: boolean;
  customCSS: string;
  isSettingsOpen: boolean;
  versions: Version[];
  setMarkdown: (markdown: string) => void;
  setTheme: (theme: Theme) => void;
  setLivePreview: (enabled: boolean) => void;
  setCustomCSS: (css: string) => void;
  setSettingsOpen: (open: boolean) => void;
  addVersion: () => void;
  restoreVersion: (version: Version) => void;
}