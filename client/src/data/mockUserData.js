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

// Sample answers data
export const sampleAnswers = [
  {
    id: 1,
    questionTitle: "What's the best way to learn machine learning in 2024?",
    answerContent: "Based on my experience, I recommend starting with Python fundamentals, then moving to scikit-learn for practical implementation. Focus on understanding core concepts like cross-validation and feature engineering before diving into deep learning. Build projects early - they're the best way to learn.",
    questionTopics: ["Machine Learning", "Education", "Python"],
    upvotes: 24,
    accepted: true,
    views: 156,
    timestamp: "3 hours ago",
    questionUser: {
      _id: "672bc14f5ed2c93a10f485v5",
      name: "Learning Student",
      avatar: "LS"
    },
    answerMetrics: {
      helpful: 18,
      clarity: 4.8
    }
  },
  {
    id: 2,
    questionTitle: "How to handle state management in large React applications?",
    answerContent: "For large React apps, I suggest using Redux Toolkit with RTK Query. It provides excellent TypeScript support and reduces boilerplate. Combine this with React Context for local state and consider Zustand for simpler cases. Remember to normalize your state shape for better performance.",
    questionTopics: ["React", "State Management", "Redux"],
    upvotes: 15,
    accepted: false,
    views: 89,
    timestamp: "1 day ago",
    questionUser: {
      _id: "672bc14f5ed2c93a10f485v5",
      name: "React Developer",
      avatar: "RD"
    },
    answerMetrics: {
      helpful: 12,
      clarity: 4.5
    }
  },
  {
    id: 3,
    questionTitle: "What are the ethical implications of using AI in healthcare?",
    answerContent: "AI in healthcare raises important ethical considerations: data privacy, algorithmic bias, and accountability. We must ensure diverse training data to prevent bias, implement robust security measures, and maintain human oversight for critical decisions. Transparency in AI decision-making is crucial for patient trust.",
    questionTopics: ["AI Ethics", "Healthcare", "Responsible AI"],
    upvotes: 42,
    accepted: true,
    views: 234,
    timestamp: "2 days ago",
    questionUser: {
      _id: "672bc14f5ed2c93a10f485v5",
      name: "Healthcare Professional",
      avatar: "HP"
    },
    answerMetrics: {
      helpful: 35,
      clarity: 4.9
    }
  },
  {
    id: 4,
    questionTitle: "Best practices for REST API design in Node.js",
    answerContent: "Here are key practices I follow: Use consistent naming conventions, implement proper status codes, add rate limiting, include comprehensive error handling, and version your APIs from the start. Also, consider using OpenAPI specification for documentation and input validation with Joi or Zod.",
    questionTopics: ["Node.js", "API Design", "Backend"],
    upvotes: 18,
    accepted: false,
    views: 127,
    timestamp: "3 days ago",
    questionUser: {
      _id: "672bc14f5ed2c93a10f485v5",
      name: "Backend Engineer",
      avatar: "BE"
    },
    answerMetrics: {
      helpful: 14,
      clarity: 4.6
    }
  },
  {
    id: 5,
    questionTitle: "How does gradient descent work in neural networks?",
    answerContent: "Gradient descent optimizes neural networks by iteratively adjusting weights to minimize loss. Think of it like descending a mountain: at each step, you move in the direction of steepest descent. The learning rate controls step size - too large and you might overshoot, too small and convergence is slow.",
    questionTopics: ["Neural Networks", "Deep Learning", "Optimization"],
    upvotes: 31,
    accepted: true,
    views: 198,
    timestamp: "1 week ago",
    questionUser: {
      _id: "672bc14f5ed2c93a10f485v5",
      name: "AI Enthusiast",
      avatar: "AE"
    },
    answerMetrics: {
      helpful: 28,
      clarity: 4.7
    }
  },
  {
    id: 6,
    questionTitle: "What's the difference between microservices and monolith architecture?",
    answerContent: "Monoliths are single, unified applications while microservices break functionality into independent, loosely coupled services. Microservices offer better scalability and team autonomy but add complexity in deployment and inter-service communication. Start with monolith and extract services as needed.",
    questionTopics: ["Architecture", "Microservices", "System Design"],
    upvotes: 22,
    accepted: false,
    views: 167,
    timestamp: "1 week ago",
    questionUser: {
      _id: "672bc14f5ed2c93a10f485v5",
      name: "System Architect",
      avatar: "SA"
    },
    answerMetrics: {
      helpful: 19,
      clarity: 4.8
    }
  }
];

// Mock following data
 export const followingData = {
  total: 89,
  recentlyAdded: 12,
  mutual: 45,
  users: [
    {
      _id: "672bc14f5ed2c93a10f485v5",
      name: "Sarah Chen",
      username: "sarahchen",
      bio: "Senior AI Researcher at Google | Machine Learning Expert",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      isVerified: true,
      isFollowing: true,
      isMutual: true,
      location: "San Francisco, CA",
      profession: "AI Researcher",
      followers: 1247,
      following: 89,
      joinedDate: "2022-03-15",
      lastActive: "2 hours ago",
      expertise: ["Machine Learning", "Python", "TensorFlow", "AI Ethics"]
    },
    {
      _id: "672bc14f5ed2c93a10f485v5",
      name: "Mike Rodriguez",
      username: "miker",
      bio: "Full-Stack Developer | React & Node.js Specialist",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      isVerified: false,
      isFollowing: true,
      isMutual: true,
      location: "New York, NY",
      profession: "Software Engineer",
      followers: 892,
      following: 156,
      joinedDate: "2021-11-08",
      lastActive: "1 day ago",
      expertise: ["React", "Node.js", "TypeScript", "AWS"]
    },
    {
      _id: "672bc14f5ed2c93a10f485v5",
      name: "Dr. Emma Wilson",
      username: "emmaw",
      bio: "PhD in Computer Science | AI Ethics Researcher",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      isVerified: true,
      isFollowing: true,
      isMutual: false,
      location: "Boston, MA",
      profession: "Research Scientist",
      followers: 2341,
      following: 67,
      joinedDate: "2020-07-22",
      lastActive: "3 hours ago",
      expertise: ["AI Ethics", "Research", "Data Science", "Python"]
    },
    {
      _id: "672bc14f5ed2c93a10f485v5",
      name: "Alex Kumar",
      username: "alexk",
      bio: "Tech Lead | System Architecture & Cloud Computing",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      isVerified: true,
      isFollowing: true,
      isMutual: true,
      location: "Seattle, WA",
      profession: "Tech Lead",
      followers: 1876,
      following: 234,
      joinedDate: "2019-05-14",
      lastActive: "5 hours ago",
      expertise: ["System Design", "Cloud", "Microservices", "DevOps"]
    },
    {
      _id: "672bc14f5ed2c93a10f485v5",
      name: "David Park",
      username: "davidp",
      bio: "Frontend Architect | React & Vue.js Expert",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      isVerified: false,
      isFollowing: true,
      isMutual: false,
      location: "Austin, TX",
      profession: "Frontend Architect",
      followers: 1567,
      following: 189,
      joinedDate: "2021-02-28",
      lastActive: "12 hours ago",
      expertise: ["React", "Vue.js", "JavaScript", "UI/UX"]
    },
    {
      _id: "672bc14f5ed2c93a10f485v5",
      name: "Lisa Thompson",
      username: "lisat",
      bio: "Product Manager | AI Products & Strategy",
      avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      isVerified: true,
      isFollowing: true,
      isMutual: true,
      location: "Chicago, IL",
      profession: "Product Manager",
      followers: 2987,
      following: 145,
      joinedDate: "2020-09-11",
      lastActive: "1 day ago",
      expertise: ["Product Management", "AI Strategy", "UX Research", "Analytics"]
    }
  ]
};

// Mock followers data
export const followersData = {
  total: 1242,
  newThisWeek: 24,
  mutual: 89,
  users: [
    {
      _id: "672bc14f5ed2c93a10f485v5",
      name: "Jennifer Lopez",
      username: "jenniferl",
      bio: "Data Scientist | Machine Learning Enthusiast",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      isVerified: true,
      isFollowing: false,
      isMutual: false,
      location: "Los Angeles, CA",
      profession: "Data Scientist",
      followers: 567,
      following: 234,
      joinedDate: "2023-01-10",
      lastActive: "1 hour ago",
      expertise: ["Python", "SQL", "Machine Learning", "Data Analysis"],
      isNew: true
    },
    {
      id: "672bc14f5ed2c93a10f485v5",
      name: "Robert Kim",
      username: "robertk",
      bio: "DevOps Engineer | Cloud Infrastructure Specialist",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      isVerified: false,
      isFollowing: true,
      isMutual: true,
      location: "Denver, CO",
      profession: "DevOps Engineer",
      followers: 789,
      following: 156,
      joinedDate: "2022-08-15",
      lastActive: "3 hours ago",
      expertise: ["AWS", "Docker", "Kubernetes", "Terraform"],
      isNew: false
    },
    {
      id: "672bc14f5ed2c93a10f485v5",
      name: "Dr. Maria Garcia",
      username: "mariag",
      bio: "AI Research Scientist | NLP Expert",
      avatar: "https://images.unsplash.com/photo-1489883671924-8d0d445b891d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      isVerified: true,
      isFollowing: false,
      isMutual: false,
      location: "Seattle, WA",
      profession: "Research Scientist",
      followers: 1345,
      following: 89,
      joinedDate: "2021-11-20",
      lastActive: "5 hours ago",
      expertise: ["NLP", "Deep Learning", "Research", "Python"],
      isNew: true
    },
    {
      id: "672bc14f5ed2c93a10f485v5",
      name: "James Wilson",
      username: "jamesw",
      bio: "Mobile Developer | React Native & Flutter",
      avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      isVerified: false,
      isFollowing: true,
      isMutual: true,
      location: "Miami, FL",
      profession: "Mobile Developer",
      followers: 923,
      following: 278,
      joinedDate: "2022-03-05",
      lastActive: "1 day ago",
      expertise: ["React Native", "Flutter", "iOS", "Android"],
      isNew: false
    },
    {
      id: "672bc14f5ed2c93a10f485v5",
      name: "Amanda Chen",
      username: "amandac",
      bio: "UX Designer | Product Design Specialist",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      isVerified: true,
      isFollowing: false,
      isMutual: false,
      location: "Portland, OR",
      profession: "UX Designer",
      followers: 1567,
      following: 345,
      joinedDate: "2020-12-18",
      lastActive: "2 days ago",
      expertise: ["UX Design", "Figma", "User Research", "Prototyping"],
      isNew: false
    },
    {
      id: "672bc14f5ed2c93a10f485v5",
      name: "Daniel Brown",
      username: "danielb",
      bio: "Backend Engineer | System Architecture",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      isVerified: false,
      isFollowing: true,
      isMutual: true,
      location: "Chicago, IL",
      profession: "Backend Engineer",
      followers: 1123,
      following: 189,
      joinedDate: "2021-07-22",
      lastActive: "6 hours ago",
      expertise: ["Java", "Spring Boot", "Microservices", "SQL"],
      isNew: true
    }
  ]
};

// Sample questions data
export const sampleQuestions = [
  {
    id: 1,
    title: "What are the key differences between supervised and unsupervised learning in machine learning?",
    content: "I'm trying to understand the fundamental differences between supervised and unsupervised learning. Could someone explain the key distinctions, use cases, and provide practical examples for each approach?",
    topics: ["Machine Learning", "AI", "Data Science"],
    answers: 12,
    upvotes: 47,
    views: 324,
    timestamp: "2 hours ago",
    isSolved: true,
    user: {
      name: "Sarah Chen",
      avatar: "SC"
    }
  },
  {
    id: 2,
    title: "How to implement authentication in React with JWT tokens?",
    content: "I'm building a React application and need to implement secure authentication using JWT tokens. What's the best practice for storing tokens, handling refresh tokens, and protecting routes?",
    topics: ["React", "JavaScript", "Web Development", "Authentication"],
    answers: 8,
    upvotes: 23,
    views: 156,
    timestamp: "1 day ago",
    isSolved: false,
    user: {
      name: "Mike Rodriguez",
      avatar: "MR"
    }
  },
  {
    id: 3,
    title: "What's the future of generative AI in creative industries?",
    content: "With the rapid advancement of generative AI models like GPT-4 and DALL-E, how do you see these technologies transforming creative fields such as writing, design, and music composition in the next 5 years?",
    topics: ["Generative AI", "AI Future", "Creative AI"],
    answers: 15,
    upvotes: 89,
    views: 542,
    timestamp: "3 days ago",
    isSolved: true,
    user: {
      name: "Emma Wilson",
      avatar: "EW"
    }
  },
  {
    id: 4,
    title: "Best practices for optimizing React application performance?",
    content: "My React app is getting slower as it grows. What are the most effective performance optimization techniques I should implement? Looking for both beginner and advanced strategies.",
    topics: ["React", "Performance", "Web Development"],
    answers: 6,
    upvotes: 34,
    views: 287,
    timestamp: "4 days ago",
    isSolved: false,
    user: {
      name: "Alex Kumar",
      avatar: "AK"
    }
  },
  {
    id: 5,
    title: "How does attention mechanism work in transformer models?",
    content: "I'm studying transformer architecture and having trouble understanding the attention mechanism. Can someone explain self-attention and multi-head attention in simple terms with examples?",
    topics: ["Transformers", "Neural Networks", "NLP"],
    answers: 9,
    upvotes: 41,
    views: 198,
    timestamp: "1 week ago",
    isSolved: true,
    user: {
      name: "David Park",
      avatar: "DP"
    }
  },
  {
    id: 6,
    title: "What are the ethical considerations when deploying AI systems?",
    content: "As we deploy more AI systems in production, what are the key ethical considerations we should address? Looking for insights on bias, transparency, accountability, and privacy concerns.",
    topics: ["AI Ethics", "Responsible AI", "AI Governance"],
    answers: 11,
    upvotes: 67,
    views: 423,
    timestamp: "1 week ago",
    isSolved: false,
    user: {
      name: "Lisa Thompson",
      avatar: "LT"
    }
  }
];