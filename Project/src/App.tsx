import React from 'react';
import Header from './components/Header';
import Editor from './components/Editor';
import useEditorStore from './store/editorStore';
import { Toaster } from 'react-hot-toast';

function App() {
  const { theme } = useEditorStore();

  return (
    <div className={`h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      <Toaster position="top-right" />
      <Header />
      <main className="flex-1 overflow-hidden">
        <Editor />
      </main>
    </div>
  );
}

export default App;