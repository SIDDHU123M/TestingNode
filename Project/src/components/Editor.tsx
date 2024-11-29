import React, { useCallback, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import useEditorStore from '../store/editorStore';
import debounce from '../utils/debounce';
import Settings from './Settings';

const Editor: React.FC = () => {
  const { markdown, setMarkdown, theme, livePreview, customCSS, addVersion } = useEditorStore();

  const debouncedSetMarkdown = useCallback(
    debounce((value: string) => {
      setMarkdown(value);
      addVersion();
    }, 500),
    []
  );

  const handleChange = (value?: string) => {
    if (value !== undefined) {
      if (livePreview) {
        debouncedSetMarkdown(value);
      } else {
        setMarkdown(value);
      }
    }
  };

  useEffect(() => {
    if (customCSS) {
      const styleId = 'custom-markdown-styles';
      let styleElement = document.getElementById(styleId);
      
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = styleId;
        document.head.appendChild(styleElement);
      }
      
      styleElement.textContent = customCSS;
      
      return () => {
        styleElement.remove();
      };
    }
  }, [customCSS]);

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        addVersion();
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, []);

  return (
    <div data-color-mode={theme} className="flex-1 min-h-0">
      <MDEditor
        value={markdown}
        onChange={handleChange}
        height="100%"
        preview={livePreview ? 'live' : 'edit'}
        className="w-full h-full"
      />
      <Settings />
    </div>
  );
};

export default Editor;