// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import CreateQuestionForm from "../../components/main/createPost/CreateQuestionForm"
import { AlertTriangle, CheckCircle, ChevronRight, ClipboardCheck, ImageIcon, Lightbulb, Sparkles, Wand2, Zap } from "lucide-react"
import { useContext } from "react";
import PostContext from "../../context/PostContext";
import MediaProgress from "../../components/main/createPost/MediaProgress";
export default function CreatePostPage() {

  const { title, content, topics, media } = useContext(PostContext);

  const tips = [
    "Write a clear and descriptive title",
    "Mention exact errors or console logs",
    "Add all important details like OS, tech stack, workflow",
    "Break long descriptions into paragraphs",
    "Upload clean, readable, high-resolution images",
    "Use AI suggestions to make your post more clear",
    "Let AI generate topic tags for better visibility",
  ];

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
              <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-xl">
                <Zap className="text-orange-500" />
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

            <MediaProgress />
          </div>

          <div className="bg-white dark:bg-[#161616] p-4 rounded-lg">

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-xl">
                <ClipboardCheck className="text-orange-500" />
              </div>
              <h3 className="font-semibold dark:text-white">Post Quality Check</h3>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                {title.length < 20 ? (
                  <AlertTriangle size={18} className="text-red-500" />
                ) : (
                  <CheckCircle size={18} className="text-green-500" />
                )}

                <span className={`${title.length < 20 ? "text-red-500" : "text-green-500"}`}>
                  {title.length < 20 ? "Title may be too short" : "Title looks good"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {content.length < 80 ? (
                  <AlertTriangle size={18} className="text-red-500" />
                ) : (
                  <CheckCircle size={18} className="text-green-500" />
                )}

                <span className={`${content.length < 80 ? "text-red-500" : "text-green-500"}`}>
                  {content.length < 80 ? "Add more details" : "Good description length"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {topics.length === 0 ? (
                  <AlertTriangle size={18} className="text-red-500" />
                ) : (
                  <CheckCircle size={18} className="text-green-500" />
                )}

                <span className={`${topics.length === 0 ? "text-red-500" : "text-green-500"}`}>
                  {topics.length === 0 ? "Add at least one topic" : "Topics added"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {media.length > 7 ? (
                  <AlertTriangle size={18} className="text-red-500" />
                ) : (
                  <ImageIcon size={18} className="text-green-500" />
                )}

                <span className={`${media.length > 7 ? "text-red-500" : "text-green-500"}`}>
                  {media.length > 7 ? "Too many files!" : "Media usage okay"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}