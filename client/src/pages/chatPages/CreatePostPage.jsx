// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import CreateQuestionForm from "../../components/main/createPost/CreateQuestionForm"
export default function CreatePostPage() {
  return (
    <section className="max-w-5xl w-full mx-auto h-full">

      <motion.div initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold dark:text-white w-full flex justify-center pt-10 pb-5"
      >
        <h1>Ask Your Question</h1>
      </motion.div>
 
      <div className="flex flex-wrap md:flex-nowrap gap-3">
        <motion.div className="flex-1 pb-3">
          <CreateQuestionForm />
        </motion.div>
        <motion.div className="w-70">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque placeat sunt illum labore aperiam fugit hic iste, facilis numquam, aliquam, ab quaerat ratione rem architecto cum quam suscipit iure cupiditate.
        </motion.div>
      </div>
    </section>
  )
}