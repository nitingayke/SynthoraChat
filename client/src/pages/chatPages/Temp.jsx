import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Globe,
  Users,
  Image,
  X,
  Sparkles,
  Eye,
  EyeOff,
  Send,
  Save,
  Trash2,
  Zap,
  Lightbulb,
  TrendingUp,
  Hash,
  MessageCircle,
  Bot,
  Bell,
  Smile,
  FileText,
  Video,
  File
} from 'lucide-react';

// Emoji Picker Component
const EmojiPicker = ({ onEmojiSelect, isOpen, onClose }) => {
  const emojiCategories = {
    'People': ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇'],
    'Objects': ['💡', '🔧', '📱', '💻', '📚', '📝', '🔍', '💎', '🎯', '⚡'],
    'Symbols': ['❤️', '⭐', '🔥', '✨', '🎉', '✅', '❌', '❓', '❗', '💭'],
    'Nature': ['🌱', '🚀', '🌈', '⭐', '🔥', '💧', '🌍', '💫', '🌸', '🌙']
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      className="absolute top-full left-0 mt-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl z-50 p-4 w-80"
    >
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold text-gray-900 dark:text-white">Choose an emoji</h4>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="max-h-60 overflow-y-auto">
        {Object.entries(emojiCategories).map(([category, emojis]) => (
          <div key={category} className="mb-4">
            <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              {category}
            </h5>
            <div className="grid grid-cols-5 gap-2">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => onEmojiSelect(emoji)}
                  className="text-2xl p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors transform hover:scale-110 duration-200"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Title Input Component
const TitleInput = ({ value, onChange, onEmojiSelect }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-xl">
          <FileText className="w-5 h-5 text-blue-500 dark:text-[#07C5B9]" />
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white">Question Title</h3>
      </div>

      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ask your question in one sentence..."
          className="w-full p-6 text-2xl font-semibold border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#07C5B9] bg-white dark:bg-[#161616] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all resize-none pr-12"
        />

        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
        >
          <Smile className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>

        <EmojiPicker
          isOpen={showEmojiPicker}
          onClose={() => setShowEmojiPicker(false)}
          onEmojiSelect={(emoji) => {
            onChange(value + emoji);
            setShowEmojiPicker(false);
          }}
        />
      </div>

      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {value.length}/120 characters
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Be specific and clear
        </span>
      </div>
    </motion.div>
  );
};

// Description Input Component
const DescriptionInput = ({ value, onChange, onEmojiSelect, showPreview, onTogglePreview }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const wordCount = value.split(/\s+/).filter(word => word.length > 0).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 dark:bg-purple-500/20 rounded-xl">
            <FileText className="w-5 h-5 text-purple-500 dark:text-purple-400" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Problem Description</h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
          >
            <Smile className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>

          <button
            onClick={onTogglePreview}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-[#202020] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#2a2a2a] transition-colors"
          >
            {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showPreview ? 'Edit' : 'Preview'}
          </button>
        </div>
      </div>

      <div className="relative">
        {showPreview ? (
          <div className="prose dark:prose-invert max-w-none p-6 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl min-h-[200px] border-2 border-gray-200 dark:border-gray-700">
            {value || (
              <p className="text-gray-500 dark:text-gray-400 italic">Nothing to preview yet...</p>
            )}
          </div>
        ) : (
          <>
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Describe your problem in detail. Include what you've tried, error messages, or specific requirements..."
              rows={12}
              className="w-full p-6 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#07C5B9] bg-white dark:bg-[#161616] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all resize-none"
            />

            <EmojiPicker
              isOpen={showEmojiPicker}
              onClose={() => setShowEmojiPicker(false)}
              onEmojiSelect={(emoji) => {
                onChange(value + emoji);
                setShowEmojiPicker(false);
              }}
            />
          </>
        )}
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {wordCount} / 2000 words
        </div>
        <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span>Markdown supported</span>
          <span>•</span>
          <span>Code blocks available</span>
        </div>
      </div>
    </motion.div>
  );
};

// Media Upload Component with Max 6 Files
const MediaUpload = ({ media, onMediaAdd, onMediaRemove }) => {
  const fileInputRef = useRef(null);
  const maxFiles = 6;

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = maxFiles - media.length;
    const filesToAdd = files.slice(0, remainingSlots);

    if (filesToAdd.length === 0) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const newMedia = filesToAdd.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image') ? 'image' :
        file.type.startsWith('video') ? 'video' : 'document',
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
    }));

    onMediaAdd(newMedia);
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'image': return <Image className="w-5 h-5" />;
      case 'video': return <Video className="w-5 h-5" />;
      default: return <File className="w-5 h-5" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 dark:bg-green-500/20 rounded-xl">
            <Image className="w-5 h-5 text-green-500 dark:text-green-400" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Attachments ({media.length}/{maxFiles})
          </h3>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Images, Videos, PDFs
        </span>
      </div>

      {/* Upload Area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 text-center hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-all cursor-pointer group"
      >
        <div className="max-w-sm mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Image className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-2 font-medium">
            Drag and drop files here
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">
            or click to browse files
          </p>
          <div className="text-xs text-gray-400 dark:text-gray-600 space-y-1">
            <p>Supports JPG, PNG, GIF, MP4, PDF, DOC</p>
            <p>Max 10MB per file • Max {maxFiles} files</p>
          </div>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        multiple
        accept="image/*,video/*,.pdf,.doc,.docx"
        className="hidden"
      />

      {/* Media Previews */}
      <AnimatePresence>
        {media.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 space-y-4"
          >
            <h4 className="font-medium text-gray-900 dark:text-white">Selected Files</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {media.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="relative group bg-gray-50 dark:bg-[#1a1a1a] rounded-xl p-4 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white dark:bg-[#2a2a2a] rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-700">
                      {getFileIcon(item.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.size} • {item.type}
                      </p>
                    </div>

                    <button
                      onClick={() => onMediaRemove(item.id)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 text-red-500 dark:text-red-400 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Preview for images and videos */}
                  {(item.type === 'image' || item.type === 'video') && (
                    <div className="mt-3 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                      {item.type === 'image' ? (
                        <img
                          src={item.url}
                          alt="Preview"
                          className="w-full h-24 object-cover"
                        />
                      ) : (
                        <video
                          src={item.url}
                          className="w-full h-24 object-cover"
                        />
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress indicator */}
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>
                {media.length} of {maxFiles} files selected
              </span>
              <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 dark:bg-[#07C5B9] transition-all duration-300"
                  style={{ width: `${(media.length / maxFiles) * 100}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main Create Post Component
const Temp = () => {
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    topics: [],
    media: [],
    visibility: 'public',
    allowComments: true,
    allowAIAnswers: true,
    notifyFollowers: true,
    isDraft: false
  });

  const [newTopic, setNewTopic] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleMediaAdd = (newMedia) => {
    setPostData(prev => ({
      ...prev,
      media: [...prev.media, ...newMedia]
    }));
  };

  const handleMediaRemove = (mediaId) => {
    setPostData(prev => ({
      ...prev,
      media: prev.media.filter(media => media.id !== mediaId)
    }));
  };

  const handlePublish = () => {
    console.log('Publishing post:', postData);
    // Add your publish logic here
  };

  const handleSaveDraft = () => {
    setPostData(prev => ({ ...prev, isDraft: true }));
    console.log('Saving draft:', { ...postData, isDraft: true });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold dark:text-white mb-4 bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-[#07C5B9] bg-clip-text text-transparent">
            Ask Your Question
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get help from the community and AI assistants. Be specific and provide details for better answers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Title Component */}
              <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                <TitleInput
                  value={postData.title}
                  onChange={(title) => setPostData(prev => ({ ...prev, title }))}
                />
              </div>

              {/* Description Component */}
              <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                <DescriptionInput
                  value={postData.content}
                  onChange={(content) => setPostData(prev => ({ ...prev, content }))}
                  showPreview={showPreview}
                  onTogglePreview={() => setShowPreview(!showPreview)}
                />
              </div>

              {/* Media Upload Component */}
              <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                <MediaUpload
                  media={postData.media}
                  onMediaAdd={handleMediaAdd}
                  onMediaRemove={handleMediaRemove}
                />
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex gap-4 pt-6"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePublish}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
                >
                  <Send className="w-5 h-5" />
                  Publish Question
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSaveDraft}
                  className="px-6 py-4 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-all flex items-center gap-3"
                >
                  <Save className="w-5 h-5" />
                  Save Draft
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-xl">
                  <Zap className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Quick Tips</h3>
              </div>
              <div className="space-y-3 text-sm">
                {[
                  "Include code snippets if relevant",
                  "Describe what you've already tried",
                  "Add specific error messages",
                  "Use clear, descriptive titles",
                  "Tag relevant technologies"
                ].map((tip, index) => (
                  <div key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                    <div className="w-1.5 h-1.5 bg-blue-500 dark:bg-[#07C5B9] rounded-full mt-1.5 flex-shrink-0" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* File Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Upload Status</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Files</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {postData.media.length}/6
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(postData.media.length / 6) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  {6 - postData.media.length} slots remaining
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Temp;