// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { MessageSquare, Edit3, Users, Brain, ThumbsUp } from 'lucide-react';
import PropTypes from 'prop-types';
import StatCard from './shared/StatCard';

const ProfileStats = ({ user }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 md:grid-cols-3 gap-4"
    >
      <StatCard
        icon={MessageSquare}
        label="Questions"
        value={user.stats.questions}
        color="from-blue-500 to-cyan-500"
      />
      <StatCard
        icon={Edit3}
        label="Answers"
        value={user.stats.answers}
        color="from-green-500 to-emerald-500"
      />
      <StatCard
        icon={Users}
        label="Followers"
        value={user.stats.followers}
        color="from-purple-500 to-pink-500"
      />
      <StatCard
        icon={Users}
        label="Following"
        value={user.stats.following}
        color="from-orange-500 to-red-500"
      />
      <StatCard
        icon={Brain}
        label="AI Sessions"
        value={user.stats.aiSessions}
        color="from-indigo-500 to-purple-500"
      />
      <StatCard
        icon={ThumbsUp}
        label="Upvotes"
        value={user.stats.upvotes}
        color="from-yellow-500 to-orange-500"
      />
    </motion.div>
  );
};

ProfileStats.propTypes = {
  user: PropTypes.object.isRequired
};

export default ProfileStats;