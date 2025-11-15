import { Trophy, Brain, Zap, ThumbsUp } from "lucide-react";

export const mockUserData = {
  _id: "1",
  name: "Alex Johnson",
  username: "alexjohnson",
  email: "alex@example.com",
  bio: "Senior AI Researcher & Full-Stack Developer. Passionate about machine learning, neural networks, and building intelligent systems that solve real-world problems.",
  location: "San Francisco, CA",
  website: "alexjohnson.dev",
  joinDate: "2023-01-15",
  lastActive: "2024-01-20",
  isVerified: true,
  coverPicture:
    "https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  profilePicture:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  stats: {
    questions: 47,
    answers: 156,
    followers: 1242,
    following: 89,
    aiSessions: 324,
    upvotes: 2847,
  },
  expertise: [
    "Machine Learning",
    "Deep Learning",
    "React",
    "Node.js",
    "Python",
    "TensorFlow",
  ],
  interests: [
    "AI Ethics",
    "Computer Vision",
    "Natural Language Processing",
    "Open Source",
  ],
  credentials: [
    { title: "PhD in Computer Science", institution: "Stanford University" },
    { title: "Senior AI Engineer", institution: "Google AI" },
    { title: "TensorFlow Certified Developer", institution: "Google" },
  ],
  achievements: [
    {
      id: 1,
      name: "Top Contributor",
      icon: Trophy,
      description: "Consistently provides high-quality answers",
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: 2,
      name: "AI Expert",
      icon: Brain,
      description: "Recognized AI specialist",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      name: "Rising Star",
      icon: Zap,
      description: "Fast-growing community member",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 4,
      name: "Helpful Hand",
      icon: ThumbsUp,
      description: "100+ helpful answers",
      color: "from-green-500 to-emerald-500",
    },
  ],
};
