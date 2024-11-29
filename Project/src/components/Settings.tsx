import React from 'react';
import useEditorStore from '../store/editorStore';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

const Settings: React.FC = () => {
  const {
    isSettingsOpen,
    setSettingsOpen,
    theme,
    setTheme,
    livePreview,
    setLivePreview,
    customCSS,
    setCustomCSS,
    versions,
    restoreVersion,
  } = useEditorStore();

  if (!isSettingsOpen) return null;

  const handleRestoreVersion = (version: typeof versions[0]) => {
    restoreVersion(version);
    toast.success('Version restored successfully');
    setSettingsOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
            <button
              onClick={() => setSettingsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Theme Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Theme
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            {/* Live Preview Toggle */}
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={livePreview}
                  onChange={(e) => setLivePreview(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Enable Live Preview
                </span>
              </label>
            </div>

            {/* Custom CSS */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Custom CSS
              </label>
              <textarea
                value={customCSS}
                onChange={(e) => setCustomCSS(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white h-32 font-mono"
                placeholder=".wmde-markdown { /* Your custom styles */ }"
              />
            </div>

            {/* Version History */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Version History
              </h3>
              <div className="space-y-2">
                {versions.map((version) => (
                  <div
                    key={version.id}
                    className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md"
                  >
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {new Date(version.timestamp).toLocaleString()}
                    </span>
                    <button
                      onClick={() => handleRestoreVersion(version)}
                      className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Restore
                    </button>
                  </div>
                ))}
                {versions.length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No versions saved yet
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;