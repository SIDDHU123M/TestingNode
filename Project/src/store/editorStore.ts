import { create } from 'zustand';
import { EditorState, Version } from '../types';
import { v4 as uuidv4 } from 'uuid';

const useEditorStore = create<EditorState>((set, get) => ({
  markdown: '# Welcome to Markdown Editor\n\nStart typing to see the magic happen!',
  theme: 'light',
  livePreview: true,
  customCSS: '',
  isSettingsOpen: false,
  versions: [],
  setMarkdown: (markdown) => set({ markdown }),
  setTheme: (theme) => set({ theme }),
  setLivePreview: (enabled) => set({ livePreview: enabled }),
  setCustomCSS: (css) => set({ customCSS: css }),
  setSettingsOpen: (open) => set({ isSettingsOpen: open }),
  addVersion: () => {
    const newVersion: Version = {
      id: uuidv4(),
      content: get().markdown,
      timestamp: Date.now(),
    };
    set((state) => ({
      versions: [newVersion, ...state.versions].slice(0, 10), // Keep last 10 versions
    }));
  },
  restoreVersion: (version: Version) => {
    set({ markdown: version.content });
  },
}))

export default useEditorStore;