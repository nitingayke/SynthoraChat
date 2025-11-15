import { useState } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Bell, Shield, Bot, Palette, Settings,
  Mail, EyeOff, Trash2, 
  ChevronRight, Upload, Zap,
  Moon, Sun
} from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [settings, setSettings] = useState({
    profile: {
      username: 'john_doe',
      email: 'john@example.com',
      bio: 'AI enthusiast and full-stack developer',
      profilePicture: ''
    },
    preferences: {
      aiSuggestions: true,
      autoSummarize: true,
      expertFirst: false,
      language: 'en'
    },
    notifications: {
      email: true,
      mentions: true,
      aiUpdates: false,
      communityDigest: true
    },
    privacy: {
      privateProfile: false,
      twoFactor: false,
      dataCollection: true
    },
    ai: {
      creativity: 75,
      formality: 50,
      tone: 'friendly'
    },
    appearance: {
      theme: 'system',
      accentColor: 'blue'
    }
  });

  const tabs = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'ai', label: 'AI Personalization', icon: Bot },
    { id: 'appearance', label: 'Appearance', icon: Palette }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSettings(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          profilePicture: URL.createObjectURL(file)
        }
      }));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold dark:text-white mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Account Settings
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Manage your profile, preferences, and privacy in one place.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar - Navigation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-1"
        >
          <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm sticky top-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Settings</h3>
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    variants={itemVariants}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-left ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#202020]'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{tab.label}</span>
                    <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${
                      activeTab === tab.id ? 'rotate-90' : ''
                    }`} />
                  </motion.button>
                );
              })}
            </nav>
          </div>
        </motion.div>

        {/* Right Panel - Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-3"
        >
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <ProfileSettings
                settings={settings.profile}
                onChange={(updates) => setSettings(prev => ({
                  ...prev,
                  profile: { ...prev.profile, ...updates }
                }))}
                onFileUpload={handleFileUpload}
              />
            )}
            {activeTab === 'preferences' && (
              <PreferencesSettings
                settings={settings.preferences}
                onChange={(updates) => setSettings(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, ...updates }
                }))}
              />
            )}
            {activeTab === 'notifications' && (
              <NotificationSettings
                settings={settings.notifications}
                onChange={(updates) => setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, ...updates }
                }))}
              />
            )}
            {activeTab === 'privacy' && (
              <PrivacySettings
                settings={settings.privacy}
                onChange={(updates) => setSettings(prev => ({
                  ...prev,
                  privacy: { ...prev.privacy, ...updates }
                }))}
              />
            )}
            {activeTab === 'ai' && (
              <AISettings
                settings={settings.ai}
                onChange={(updates) => setSettings(prev => ({
                  ...prev,
                  ai: { ...prev.ai, ...updates }
                }))}
              />
            )}
            {activeTab === 'appearance' && (
              <AppearanceSettings
                settings={settings.appearance}
                onChange={(updates) => setSettings(prev => ({
                  ...prev,
                  appearance: { ...prev.appearance, ...updates }
                }))}
                isDarkMode={isDarkMode}
                onThemeChange={setIsDarkMode}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Footer Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Your settings are stored securely. Future updates will let you sync preferences across devices.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// Profile Settings Component
const ProfileSettings = ({ settings, onChange, onFileUpload }) => (
  <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile Settings</h2>
    
    <div className="space-y-6">
      {/* Profile Picture */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
            {settings.profilePicture ? (
              <img src={settings.profilePicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
            ) : (
              settings.username.charAt(0).toUpperCase()
            )}
          </div>
          <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
            <Upload className="w-4 h-4" />
            <input type="file" className="hidden" onChange={onFileUpload} accept="image/*" />
          </label>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Profile Picture</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Recommended: 500x500px, JPG or PNG</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Username
          </label>
          <input
          id='username'
            type="text"
            value={settings.username}
            onChange={(e) => onChange({ username: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            value={settings.email}
            onChange={(e) => onChange({ email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Bio
        </label>
        <textarea
          value={settings.bio}
          onChange={(e) => onChange({ bio: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          placeholder="Tell us about yourself..."
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
      >
        Save Changes
      </motion.button>
    </div>
  </div>
);

ProfileSettings.propTypes = {
  settings: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    profilePicture: PropTypes.string
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onFileUpload: PropTypes.func.isRequired
};

// Preferences Settings Component
const PreferencesSettings = ({ settings, onChange }) => (
  <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Preferences</h2>
    
    <div className="space-y-6">
      <ToggleSetting
        label="Enable AI Suggestions"
        description="Get AI-powered suggestions while writing questions and answers"
        enabled={settings.aiSuggestions}
        onChange={(enabled) => onChange({ aiSuggestions: enabled })}
        icon={Bot}
      />
      
      <ToggleSetting
        label="Auto Summarize Answers"
        description="Automatically generate summaries for long answers"
        enabled={settings.autoSummarize}
        onChange={(enabled) => onChange({ autoSummarize: enabled })}
        icon={Zap}
      />
      
      <ToggleSetting
        label="Show Expert Answers First"
        description="Prioritize answers from verified experts"
        enabled={settings.expertFirst}
        onChange={(enabled) => onChange({ expertFirst: enabled })}
        icon={User}
      />

      <div>
        <label htmlFor='language' className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Preferred Language
        </label>
        <select
          value={settings.language}
          onChange={(e) => onChange({ language: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>
    </div>
  </div>
);

PreferencesSettings.propTypes = {
  settings: PropTypes.shape({
    aiSuggestions: PropTypes.bool.isRequired,
    autoSummarize: PropTypes.bool.isRequired,
    expertFirst: PropTypes.bool.isRequired,
    language: PropTypes.string.isRequired
  }).isRequired,
  onChange: PropTypes.func.isRequired
};

// Notification Settings Component
const NotificationSettings = ({ settings, onChange }) => (
  <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Notifications</h2>
    
    <div className="space-y-6">
      <ToggleSetting
        label="Email Notifications"
        description="Receive updates and announcements via email"
        enabled={settings.email}
        onChange={(enabled) => onChange({ email: enabled })}
        icon={Mail}
      />
      
      <ToggleSetting
        label="Community Mentions"
        description="Get notified when someone mentions you"
        enabled={settings.mentions}
        onChange={(enabled) => onChange({ mentions: enabled })}
        icon={Bell}
      />
      
      <ToggleSetting
        label="AI Update Alerts"
        description="Notifications about new AI features and improvements"
        enabled={settings.aiUpdates}
        onChange={(enabled) => onChange({ aiUpdates: enabled })}
        icon={Bot}
      />
      
      <ToggleSetting
        label="Weekly Community Digest"
        description="Weekly summary of trending topics and your activity"
        enabled={settings.communityDigest}
        onChange={(enabled) => onChange({ communityDigest: enabled })}
        icon={User}
      />
    </div>
  </div>
);

NotificationSettings.propTypes = {
  settings: PropTypes.shape({
    email: PropTypes.bool.isRequired,
    mentions: PropTypes.bool.isRequired,
    aiUpdates: PropTypes.bool.isRequired,
    communityDigest: PropTypes.bool.isRequired
  }).isRequired,
  onChange: PropTypes.func.isRequired
};

// Privacy & Security Settings Component
const PrivacySettings = ({ settings, onChange }) => (
  <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Privacy & Security</h2>
    
    <div className="space-y-6">
      <ToggleSetting
        label="Make Profile Private"
        description="Only approved followers can see your activity"
        enabled={settings.privateProfile}
        onChange={(enabled) => onChange({ privateProfile: enabled })}
        icon={EyeOff}
      />
      
      <ToggleSetting
        label="Two-Factor Authentication"
        description="Add an extra layer of security to your account"
        enabled={settings.twoFactor}
        onChange={(enabled) => onChange({ twoFactor: enabled })}
        icon={Shield}
      />
      
      <ToggleSetting
        label="Data Collection for AI Improvement"
        description="Help improve our AI by sharing anonymous usage data"
        enabled={settings.dataCollection}
        onChange={(enabled) => onChange({ dataCollection: enabled })}
        icon={Bot}
      />

      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Delete Account
        </motion.button>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Permanently delete your account and all associated data
        </p>
      </div>
    </div>
  </div>
);

PrivacySettings.propTypes = {
  settings: PropTypes.shape({
    privateProfile: PropTypes.bool.isRequired,
    twoFactor: PropTypes.bool.isRequired,
    dataCollection: PropTypes.bool.isRequired
  }).isRequired,
  onChange: PropTypes.func.isRequired
};

// AI Personalization Settings Component
const AISettings = ({ settings, onChange }) => (
  <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">AI Personalization</h2>
    
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-4">
          <label htmlFor='creativityLevel' className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Creativity Level
          </label>
          <span className="text-sm text-blue-500 dark:text-[#07C5B9] font-medium">
            {settings.creativity}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={settings.creativity}
          onChange={(e) => onChange({ creativity: Number.parseInt(e.target.value) })}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Higher creativity means more diverse and innovative AI responses
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <label htmlFor='formalityLevel' className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Formality Level
          </label>
          <span className="text-sm text-blue-500 dark:text-[#07C5B9] font-medium">
            {settings.formality}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={settings.formality}
          onChange={(e) => onChange({ formality: Number.parseInt(e.target.value) })}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Adjust how formal or casual the AI responses should be
        </p>
      </div>

      <div>
        <label htmlFor='prefferedAiTone' className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Preferred AI Tone
        </label>
        <select
          value={settings.tone}
          onChange={(e) => onChange({ tone: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
          <option value="friendly">Friendly & Casual</option>
          <option value="professional">Professional</option>
          <option value="neutral">Neutral</option>
          <option value="enthusiastic">Enthusiastic</option>
        </select>
      </div>
    </div>
  </div>
);

AISettings.propTypes = {
  settings: PropTypes.shape({
    creativity: PropTypes.number.isRequired,
    formality: PropTypes.number.isRequired,
    tone: PropTypes.string.isRequired
  }).isRequired,
  onChange: PropTypes.func.isRequired
};

// Appearance Settings Component
const AppearanceSettings = ({ settings, onChange }) => (
  <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Appearance</h2>
    
    <div className="space-y-8">
      {/* Theme Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
          Theme
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'light', label: 'Light', icon: Sun },
            { id: 'dark', label: 'Dark', icon: Moon },
            { id: 'system', label: 'System', icon: Settings }
          ].map((theme) => {
            const IconComponent = theme.icon;
            return (
              <motion.button
                key={theme.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onChange({ theme: theme.id })}
                className={`p-4 rounded-xl border-2 transition-all ${
                  settings.theme === theme.id
                    ? 'border-blue-500 dark:border-[#07C5B9] bg-blue-50 dark:bg-blue-500/10'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <IconComponent className="w-6 h-6 mb-2 text-gray-600 dark:text-gray-300 mx-auto" />
                <span className="font-medium text-gray-900 dark:text-white">{theme.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Accent Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
          Accent Color
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { id: 'blue', label: 'Blue', color: 'bg-blue-500' },
            { id: 'purple', label: 'Purple', color: 'bg-purple-500' },
            { id: 'green', label: 'Green', color: 'bg-green-500' },
            { id: 'orange', label: 'Orange', color: 'bg-orange-500' }
          ].map((color) => (
            <motion.button
              key={color.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange({ accentColor: color.id })}
              className={`p-4 rounded-xl border-2 transition-all ${
                settings.accentColor === color.id
                  ? 'border-gray-300 dark:border-gray-600 ring-2 ring-blue-500 dark:ring-[#07C5B9]'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className={`w-8 h-8 rounded-full ${color.color} mx-auto mb-2`} />
              <span className="font-medium text-gray-900 dark:text-white">{color.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Preview Card */}
      <div className="bg-gradient-to-r from-gray-50 to-white dark:from-[#1a1a1a] dark:to-[#161616] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Preview</h3>
        <div className="bg-white dark:bg-[#161616] rounded-lg p-4 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Sample User</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">AI Assistant</div>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            This is how your theme will look with the selected settings.
          </p>
        </div>
      </div>
    </div>
  </div>
);

AppearanceSettings.propTypes = {
  settings: PropTypes.shape({
    theme: PropTypes.string.isRequired,
    accentColor: PropTypes.string.isRequired
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

// Reusable Toggle Component
// eslint-disable-next-line no-unused-vars
const ToggleSetting = ({ label, description, enabled, onChange, icon: Icon }) => (
  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-all">
    <div className="flex items-center gap-4">
      <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
        <Icon className="w-5 h-5 text-blue-500 dark:text-[#07C5B9]" />
      </div>
      <div>
        <div className="font-medium text-gray-900 dark:text-white">{label}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{description}</div>
      </div>
    </div>
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-blue-500 dark:bg-[#07C5B9]' : 'bg-gray-200 dark:bg-gray-700'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);

ToggleSetting.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.elementType.isRequired
};

export default SettingsPage;