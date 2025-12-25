// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import CreateQuestionForm from "../../components/main/createPost/CreateQuestionForm"
import { AlertTriangle, CheckCircle, ChevronRight, ClipboardCheck, ImageIcon, Lightbulb, Sparkles, Wand2, Zap } from "lucide-react"
import { useContext } from "react";
import PostContext from "../../context/PostContext";
import MediaProgress from "../../components/main/createPost/MediaProgress";

const POST_RULES = {
  TITLE_MIN: 10,
  TITLE_MAX: 120,
  CONTENT_MIN: 50,
  MAX_MEDIA: 7,
  MIN_TOPICS: 1,
};


export default function CreatePostPage() {

  const { title, content, topics, media } = useContext(PostContext);

  const safeTitle = title ?? "";
  const safeContent = content ?? "";
  const safeTopics = topics ?? [];
  const safeMedia = media ?? [];

  const postQuality = {
    title: {
      isValid:
        safeTitle.length >= POST_RULES.TITLE_MIN &&
        safeTitle.length <= POST_RULES.TITLE_MAX,
      error:
        safeTitle.length < POST_RULES.TITLE_MIN
          ? "Title may be too short"
          : "Title is too long",
      success: "Title looks good",
    },

    content: {
      isValid: safeContent.length >= POST_RULES.CONTENT_MIN,
      error: "Add more details to your description",
      success: "Good description length",
    },

    topics: {
      isValid: safeTopics.length >= POST_RULES.MIN_TOPICS,
      error: "Add at least one topic",
      success: "Topics added",
    },

    media: {
      isValid: safeMedia.length <= POST_RULES.MAX_MEDIA,
      error: "Too many files uploaded",
      success: "Media usage okay",
    },
  };

  const tips = [
    "Write a clear and descriptive title",
    "Mention exact errors or console logs",
    "Add all important details like OS, tech stack, workflow",
    "Break long descriptions into paragraphs",
    "Upload clean, readable, high-resolution images",
    "Use AI suggestions to make your post more clear",
    "Let AI generate topic tags for better visibility",
  ];

  const QualityRow = ({ isValid, error, success, icon }) => (
    <div className="flex items-center gap-2">
      {isValid ? (
        icon ?? <CheckCircle size={18} className="text-green-500" />
      ) : (
        <AlertTriangle size={18} className="text-red-500" />
      )}
      <span className={isValid ? "text-green-500" : "text-red-500"}>
        {isValid ? success : error}
      </span>
    </div>
  );


  return (
    <section className="max-w-5xl w-full mx-auto h-full px-1 sm:px-0">

      <motion.div initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-bold dark:text-white w-full flex justify-center pt-10 pb-5"
      >
        <h1>Create Your Question</h1>
      </motion.div>

      <div className="flex flex-wrap md:flex-nowrap gap-3 mb-5">
        <motion.div className="flex-1 pb-3">
          <CreateQuestionForm />
        </motion.div>

        <motion.div className="w-full md:w-70 space-y-4">
          <div className="bg-white dark:bg-[#161616] rounded-lg p-4">

            <h3 className="font-semibold dark:text-[#07C5B9] mb-3 text-orange-600">
              AI Assist Tools
            </h3>

            <button
              className="w-full p-2 text-sm rounded-lg flex items-center gap-2 bg-orange-500/10 dark:bg-[#07C5B9]/10 text-orange-500 dark:text-[#07C5B9] hover:bg-orange-500/20 dark:hover:bg-[#07C5B9]/20 mb-2 transition"
            >
              <Sparkles className="w-4 h-4" />
              Rewrite Title
            </button>

            <button
              className="w-full p-2 text-sm rounded-lg flex items-center gap-2 bg-orange-500/10 dark:bg-[#07C5B9]/10 text-orange-500 dark:text-[#07C5B9] hover:bg-orange-500/20 dark:hover:bg-[#07C5B9]/20 mb-2 transition"
            >
              <Wand2 className="w-4 h-4" />
              Improve Description
            </button>

            <button
              className="w-full p-2 text-sm rounded-lg flex items-center gap-2 bg-orange-500/10 dark:bg-[#07C5B9]/10 text-orange-500 dark:text-[#07C5B9] hover:bg-orange-500/20 dark:hover:bg-[#07C5B9]/20 transition"
            >
              <Lightbulb className="w-4 h-4" />
              Suggest Missing Details
            </button>
          </div>

          <div className="bg-white dark:bg-[#161616] rounded-lg p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-500/10 dark:bg-[#07C5B6]/10 rounded-xl">
                <Zap className="text-orange-500 dark:text-[#07C5B6]" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Quick Tips</h3>
            </div>

            <div className="space-y-4 text-sm">
              {tips.map((tip, index) => (
                <div key={index * 0.1458} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <div className="dark:text-[#07C5B9]"><ChevronRight size={18} /></div>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#161616] rounded-lg p-4">
            <h3 className="font-semibold mb-3 dark:text-white">Media Stats</h3>

            <MediaProgress MAX_MEDIA={POST_RULES.MAX_MEDIA} />
          </div>

          <div className="bg-white dark:bg-[#161616] p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-500/10 dark:bg-[#07C5B6]/10 rounded-xl">
                <ClipboardCheck className="text-orange-500 dark:text-[#07C5B6]" />
              </div>
              <h3 className="font-semibold dark:text-white">Post Quality Check</h3>
            </div>

            <div className="space-y-3 text-sm">
              <QualityRow {...postQuality.title} />
              <QualityRow {...postQuality.content} />
              <QualityRow {...postQuality.topics} />
              <QualityRow
                {...postQuality.media}
                icon={<ImageIcon size={18} className="text-green-500" />}
              />
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}