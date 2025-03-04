import React, { useState } from 'react';

interface PlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (player: PlayerData) => void;
}

interface PlayerData {
  id: string;
  interests: string[];
  communicationStyle: string;
  platformPreference: string;
  playTimes: string[];
  language: string;
  skillLevel: number;
  contentTolerance: number;
  themePreference: string;
}

export const PlayerModal: React.FC<PlayerModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<PlayerData>({
    id: `player${Date.now()}`,
    interests: [],
    communicationStyle: 'moderate',
    platformPreference: 'pc',
    playTimes: [],
    language: 'english',
    skillLevel: 5,
    contentTolerance: 5,
    themePreference: 'Neutral'
  });

  const [newInterest, setNewInterest] = useState('');
  const [newPlayTime, setNewPlayTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const addInterest = () => {
    if (newInterest.trim()) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim().toLowerCase()]
      }));
      setNewInterest('');
    }
  };

  const addPlayTime = () => {
    if (newPlayTime.trim()) {
      setFormData(prev => ({
        ...prev,
        playTimes: [...prev.playTimes, newPlayTime.trim().toLowerCase()]
      }));
      setNewPlayTime('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Create New Player</h2>
        <form onSubmit={handleSubmit}>
          {/* Player ID */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Player ID
            </label>
            <input
              type="text"
              value={formData.id}
              onChange={e => setFormData(prev => ({ ...prev, id: e.target.value }))}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Interests */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interests
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newInterest}
                onChange={e => setNewInterest(e.target.value)}
                className="flex-1 p-2 border rounded"
                placeholder="Add an interest"
              />
              <button
                type="button"
                onClick={addInterest}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      interests: prev.interests.filter((_, i) => i !== index)
                    }))}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Communication Style */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Communication Style
            </label>
            <select
              value={formData.communicationStyle}
              onChange={e => setFormData(prev => ({ ...prev, communicationStyle: e.target.value }))}
              className="w-full p-2 border rounded"
            >
              <option value="quiet">Quiet</option>
              <option value="moderate">Moderate</option>
              <option value="chatty">Chatty</option>
            </select>
          </div>

          {/* Platform Preference */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Platform Preference
            </label>
            <select
              value={formData.platformPreference}
              onChange={e => setFormData(prev => ({ ...prev, platformPreference: e.target.value }))}
              className="w-full p-2 border rounded"
            >
              <option value="pc">PC</option>
              <option value="console">Console</option>
              <option value="mobile">Mobile</option>
            </select>
          </div>

          {/* Play Times */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Play Times
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newPlayTime}
                onChange={e => setNewPlayTime(e.target.value)}
                className="flex-1 p-2 border rounded"
                placeholder="Add a play time"
              />
              <button
                type="button"
                onClick={addPlayTime}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.playTimes.map((time, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {time}
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      playTimes: prev.playTimes.filter((_, i) => i !== index)
                    }))}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Language */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <input
              type="text"
              value={formData.language}
              onChange={e => setFormData(prev => ({ ...prev, language: e.target.value }))}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Skill Level */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skill Level (1-10)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.skillLevel}
              onChange={e => setFormData(prev => ({ ...prev, skillLevel: parseInt(e.target.value) }))}
              className="w-full"
            />
            <div className="text-center">{formData.skillLevel}</div>
          </div>

          {/* Content Tolerance */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content Tolerance (1-10)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.contentTolerance}
              onChange={e => setFormData(prev => ({ ...prev, contentTolerance: parseInt(e.target.value) }))}
              className="w-full"
            />
            <div className="text-center">{formData.contentTolerance}</div>
          </div>

          {/* Theme Preference */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Theme Preference
            </label>
            <select
              value={formData.themePreference}
              onChange={e => setFormData(prev => ({ ...prev, themePreference: e.target.value }))}
              className="w-full p-2 border rounded"
            >
              <option value="Action">Action</option>
              <option value="Neutral">Neutral</option>
              <option value="Soothing">Soothing</option>
            </select>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create Player
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 