import React from 'react';
import { FileDown, FileUp, Download, Sun, Moon, Settings as SettingsIcon } from 'lucide-react';
import useEditorStore from '../store/editorStore';
import { Theme } from '../types';
import toast from 'react-hot-toast';

const Header: React.FC = () => {
  const { theme, setTheme, markdown, setSettingsOpen, addVersion } = useEditorStore();

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        useEditorStore.getState().setMarkdown(content);
        addVersion();
        toast.success('File imported successfully');
      };
      reader.readAsText(file);
    }
  };

  const handleFileExport = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('File exported successfully');
  };

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Markdown Editor
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".md"
                className="hidden"
                onChange={handleFileImport}
              />
              <FileUp className="h-5 w-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
            </label>
            
            <button onClick={handleFileExport}>
              <FileDown className="h-5 w-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
            </button>
            
            <button onClick={toggleTheme}>
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
              ) : (
                <Sun className="h-5 w-5 text-gray-400 hover:text-gray-200" />
              )}
            </button>
            
            <button onClick={() => setSettingsOpen(true)}>
              <SettingsIcon className="h-5 w-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;