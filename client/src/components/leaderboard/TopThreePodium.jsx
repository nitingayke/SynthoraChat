import { Crown } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function TopThreePodium({ users }) {
  if (!users || users.length < 3) return null;

  const [first, second, third] = users;

  return (
    <div className="relative flex justify-center items-end gap-6 max-w-6xl mx-auto py-20">

      <PodiumCard
        user={second}
        rank={2}
        className="z-10 mb-4 scale-95"
      />

      <PodiumCard
        user={first}
        rank={1}
        className="z-20 -mb-4 scale-105"
        isWinner
      />

      {/* 🥉 THIRD */}
      <PodiumCard
        user={third}
        rank={3}
        className="z-10 mb-4 scale-95"
      />
    </div>
  );
}

function PodiumCard({ user, rank, isWinner = false, className = "" }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 200 }}
      className={`relative w-72 rounded-3xl bg-white/10 backdrop-blur
        border border-white/20 text-center p-6 ${className}`}
    >
      {/* Crown */}
      {isWinner && (
        <Crown className="absolute -top-7 left-1/2 -translate-x-1/2 text-yellow-400 w-10 h-10" />
      )}

      {/* Avatar */}
      <div className="relative mx-auto mb-4">
        <img
          src={
            user.profile?.profilePicture ||
            "https://api.dicebear.com/7.x/identicon/svg?seed=" + user.username
          }
          alt={user.username}
          className={`w-24 h-24 rounded-full border-4 ${isWinner ? "border-yellow-400" : "border-white/30"
            } object-cover`}
        />
      </div>

      {/* Name */}
      <h3 className="text-xl font-bold text-white">
        @{user.username}
      </h3>

      {/* Accuracy */}
      <p className="text-sm text-gray-300 mb-4">
        Accuracy {user.accuracy}%
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 text-sm">
        <Stat label="Upvotes" value={user.upvotesCount} />
        <Stat label="Answers" value={user.answersCount} />
        <Stat label="Helpful" value={user.helpfulAnswers} />
      </div>

      {/* Rank Badge */}
      <div className="absolute top-4 right-4 text-sm font-bold text-white/80">
        #{rank}
      </div>
    </motion.div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="font-semibold text-white">{value}</div>
      <div className="text-xs text-gray-400">{label}</div>
    </div>
  );
}
