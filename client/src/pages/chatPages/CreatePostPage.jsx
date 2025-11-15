import { useState, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
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
  Bell
} from 'lucide-react';

const CreatePostPage = () => {
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
  const [wordCount, setWordCount] = useState(0);
  const fileInputRef = useRef(null);

  const suggestedTopics = ['AI', 'MachineLearning', 'GenerativeAI', 'WebDevelopment', 'React', 'JavaScript', 'Python', 'DataScience'];
  const trendingTopics = [
    { name: 'AI', count: '2.5k' },
    { name: 'ChatGPT', count: '1.8k' },
    { name: 'WebDev', count: '1.2k' },
    { name: 'React', count: '890' },
    { name: 'TypeScript', count: '756' }
  ];

  const handleContentChange = (e) => {
    const content = e.target.value;
    setPostData(prev => ({ ...prev, content }));
    setWordCount(content.split(/\s+/).filter(word => word.length > 0).length);
  };

  const handleAddTopic = (topic) => {
    if (topic && !postData.topics.includes(topic)) {
      setPostData(prev => ({
        ...prev,
        topics: [...prev.topics, topic]
      }));
      setNewTopic('');
    }
  };

  const handleRemoveTopic = (topicToRemove) => {
    setPostData(prev => ({
      ...prev,
      topics: prev.topics.filter(topic => topic !== topicToRemove)
    }));
  };

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    const newMedia = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image') ? 'image' : 'video'
    }));

    setPostData(prev => ({
      ...prev,
      media: [...prev.media, ...newMedia]
    }));
  };

  const handleRemoveMedia = (mediaId) => {
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
    // Add your save draft logic here
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
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold dark:text-white mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Create a New Post
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ask a question, share an insight, or start a meaningful discussion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Left 3/4 */}
          <div className="lg:col-span-3">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Author Info Card */}
              <motion.div
                variants={itemVariants}
                className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                      JD
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">John Doe</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date().toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  <select
                    value={postData.visibility}
                    onChange={(e) => setPostData(prev => ({ ...prev, visibility: e.target.value }))}
                    className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#07C5B9] transition-all"
                  >
                    <option value="public">
                      <Globe className="w-4 h-4 inline mr-2" />
                      Public
                    </option>
                    <option value="followers">
                      <Users className="w-4 h-4 inline mr-2" />
                      Followers
                    </option>
                    <option value="private">
                      <Lock className="w-4 h-4 inline mr-2" />
                      Private
                    </option>
                  </select>
                </div>
              </motion.div>

              {/* Post Title Input */}
              <motion.div variants={itemVariants}>
                <input
                  type="text"
                  value={postData.title}
                  onChange={(e) => setPostData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="What's your question or post title?"
                  className="w-full p-6 text-2xl font-semibold border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#07C5B9] bg-white dark:bg-[#161616] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all resize-none"
                />
              </motion.div>

              {/* Post Content */}
              <motion.div variants={itemVariants}>
                <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Post Content</h3>
                    <button
                      onClick={() => setShowPreview(!showPreview)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-[#202020] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#2a2a2a] transition-colors"
                    >
                      {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      {showPreview ? 'Edit' : 'Preview'}
                    </button>
                  </div>

                  {showPreview ? (
                    <div className="prose dark:prose-invert max-w-none p-4 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl min-h-[200px]">
                      {postData.content || (
                        <p className="text-gray-500 dark:text-gray-400 italic">Nothing to preview yet...</p>
                      )}
                    </div>
                  ) : (
                    <textarea
                      value={postData.content}
                      onChange={handleContentChange}
                      placeholder="Share your thoughts, add examples, or explain your question in detail..."
                      rows={12}
                      className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#07C5B9] bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all resize-none"
                    />
                  )}

                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {wordCount} / 1000 words
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Markdown supported
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Topics/Tags Section */}
              <motion.div variants={itemVariants}>
                <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Topics & Tags</h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {postData.topics.map((topic) => (
                      <motion.span
                        key={topic}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-[#07C5B9]/20 text-blue-800 dark:text-[#07C5B9] rounded-full text-sm border border-blue-200 dark:border-[#07C5B9]/30"
                      >
                        #{topic}
                        <button
                          onClick={() => handleRemoveTopic(topic)}
                          className="hover:text-blue-600 dark:hover:text-[#07C5B9] transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newTopic}
                      onChange={(e) => setNewTopic(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTopic(newTopic)}
                      placeholder="Add a topic..."
                      className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#07C5B9] bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                    />
                    <button
                      onClick={() => handleAddTopic(newTopic)}
                      className="px-4 py-2 bg-gray-100 dark:bg-[#202020] text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-[#2a2a2a] transition-colors"
                    >
                      Add
                    </button>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Suggested topics:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedTopics.map(topic => (
                        <button
                          key={topic}
                          onClick={() => handleAddTopic(topic)}
                          className="px-3 py-1 bg-gray-100 dark:bg-[#202020] text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-[#2a2a2a] transition-colors"
                        >
                          #{topic}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Media Upload Section */}
              <motion.div variants={itemVariants}>
                <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Media Upload</h3>

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                  >
                    <div className="max-w-sm mx-auto">
                      <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        Drag and drop images or videos here, or click to browse
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        Supports JPG, PNG, MP4, MOV (Max 10MB each)
                      </p>
                    </div>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleMediaUpload}
                    multiple
                    accept="image/*,video/*"
                    className="hidden"
                  />

                  {/* Media Previews */}
                  <AnimatePresence>
                    {postData.media.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6"
                      >
                        <h4 className="font-medium text-gray-900 dark:text-white mb-4">Selected Media</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {postData.media.map(media => (
                            <motion.div
                              key={media.id}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="relative group"
                            >
                              {media.type === 'image' ? (
                                <img
                                  src={media.url}
                                  alt="Upload preview"
                                  className="w-full h-32 object-cover rounded-xl"
                                />
                              ) : (
                                <video
                                  src={media.url}
                                  className="w-full h-32 object-cover rounded-xl"
                                />
                              )}
                              <button
                                onClick={() => handleRemoveMedia(media.id)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* AI Writing Assistant */}
              <motion.div variants={itemVariants}>
                <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-2xl p-6 text-white shadow-xl">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">AI Writing Assistant</h3>
                      <p className="mb-4 opacity-95">
                        Need help phrasing your question? Let AI refine your title or summarize your content.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-white text-purple-600 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg"
                        >
                          ✨ Improve Clarity
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-white text-purple-600 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg"
                        >
                          📝 Generate Summary
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Post Options */}
              <motion.div variants={itemVariants}>
                <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Post Options</h3>

                  <div className="space-y-4">
                    <ToggleOption
                      label="Allow Comments"
                      description="Let others comment on your post"
                      enabled={postData.allowComments}
                      onChange={(enabled) => setPostData(prev => ({ ...prev, allowComments: enabled }))}
                      icon={MessageCircle}
                    />

                    <ToggleOption
                      label="Allow AI-generated Answers"
                      description="Enable AI to provide answers to your question"
                      enabled={postData.allowAIAnswers}
                      onChange={(enabled) => setPostData(prev => ({ ...prev, allowAIAnswers: enabled }))}
                      icon={Bot}
                    />

                    <ToggleOption
                      label="Notify Followers"
                      description="Send notifications to your followers about this post"
                      enabled={postData.notifyFollowers}
                      onChange={(enabled) => setPostData(prev => ({ ...prev, notifyFollowers: enabled }))}
                      icon={Bell}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Submit Buttons */}
              <motion.div variants={itemVariants} className="flex gap-4 pt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePublish}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
                >
                  <Send className="w-5 h-5" />
                  Publish Post
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSaveDraft}
                  className="px-6 py-4 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-all flex items-center gap-3"
                >
                  <Save className="w-5 h-5" />
                  Save Draft
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-4 text-red-500 dark:text-red-400 rounded-xl font-semibold hover:bg-red-50 dark:hover:bg-red-500/10 transition-all flex items-center gap-3"
                >
                  <Trash2 className="w-5 h-5" />
                  Discard
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Sidebar - Desktop */}
          <div className="lg:col-span-1 space-y-6">
            {/* Post Tips Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-blue-500 dark:text-[#07C5B9]" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Post Tips</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>Make your post clear and focused</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>Add examples to increase engagement</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>Use relevant tags for better reach</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>Keep titles under 120 characters</span>
                </li>
              </ul>
            </motion.div>

            {/* Trending Topics Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-500/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Trending Topics</h3>
              </div>
              <div className="space-y-3">
                {trendingTopics.map((topic) => (
                  <button
                    key={topic.name}
                    onClick={() => handleAddTopic(topic.name)}
                    className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Hash className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-[#07C5B9]">
                        {topic.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#202020] px-2 py-1 rounded-full">
                      {topic.count}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* AI Writing Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6" />
                <h3 className="font-semibold">AI Writing Tips</h3>
              </div>
              <div className="space-y-3 text-sm text-blue-100">
                <p>• Start with a clear question or statement</p>
                <p>• Provide context and background information</p>
                <p>• Use specific examples when possible</p>
                <p>• Break down complex topics into sections</p>
                <p>• End with a call-to-action or specific question</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Footer */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 p-4 shadow-2xl"
      >
        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handlePublish}
            className="flex-1 bg-white text-blue-600 py-3 px-4 rounded-xl font-semibold shadow-lg"
          >
            Publish
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSaveDraft}
            className="px-4 py-3 bg-white/20 text-white rounded-xl font-semibold backdrop-blur-sm"
          >
            Save
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

// Reusable Toggle Component
// eslint-disable-next-line no-unused-vars
const ToggleOption = ({icon: Icon, label, description, enabled, onChange }) => (
  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-all">
    <div className="flex items-center gap-4">
      <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
        <Icon className="w-4 h-4 text-blue-500 dark:text-[#07C5B9]" />
      </div>
      <div>
        <div className="font-medium text-gray-900 dark:text-white">{label}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{description}</div>
      </div>
    </div>
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? 'bg-blue-500 dark:bg-[#07C5B9]' : 'bg-gray-200 dark:bg-gray-700'
        }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
      />
    </button>
  </div>
);



export default CreatePostPage;