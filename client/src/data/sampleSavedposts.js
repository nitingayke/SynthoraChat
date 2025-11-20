// Sample saved posts data with media
export const sampleSavedPosts = [
  {
    id: "64f9a7b2e18c4d23af71c9d4",
    title: "What are the latest advancements in quantum computing?",
    content:
      "I've been following quantum computing for a while and would like to understand the most recent breakthroughs in quantum supremacy, error correction, and practical applications. What are the key milestones achieved in 2024 and what can we expect in the next 2-3 years? Also, how are companies like IBM, Google, and startups pushing the boundaries of what's possible with quantum systems?",
    author: {
      _id: "672bc14f5ed2c93a10f485b9",
      profile: {
        firstName: "Sarah",
        lastName: "Chen",
        profilePicture:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      },
      username: "sarahchen",
      isVerified: true,
    },
    createdAt: "2024-01-15T10:30:00Z",
    topics: ["Quantum Computing", "Technology", "AI", "Physics"],
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        alt: "Quantum Computer",
      },
    ],
    stats: {
      views: 1247,
      upvotes: 89,
      answers: 23,
      saves: 45,
    },
    isBookmarked: true,
  },
  {
    id: "672bc14f5ed2c93a10f485b9",
    title: "How to build a scalable microservices architecture?",
    content:
      "Looking for best practices on designing microservices that can scale to millions of users. What patterns have worked best in production environments? I'm particularly interested in service discovery, API gateways, database per service pattern, and handling distributed transactions. Also, how do you manage monitoring and logging across multiple services?",
    author: {
      _id: "672bc14f5ed2c93a10f485v5",
      profile: {
        firstName: "Mike",
        lastName: "Rodriguez",
        profilePicture:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      },
      username: "miker",
      isVerified: false,
    },
    createdAt: "2024-01-14T15:20:00Z",
    topics: [
      "Microservices",
      "System Design",
      "Backend",
      "Scalability",
      "DevOps",
    ],
    media: [],
    stats: {
      views: 892,
      upvotes: 67,
      answers: 15,
      saves: 32,
    },
    isBookmarked: true,
  },
  {
    id: "5fa27bd19c4b3e72a88f35e1",
    title: "The future of renewable energy storage solutions",
    content:
      "With the global push towards renewable energy, what are the most promising energy storage technologies emerging in 2024? How close are we to solving the intermittency problem with solar and wind power? I'm interested in advancements in battery technology (solid-state, flow batteries), hydrogen storage, and gravitational storage systems. What's the current state of grid-scale storage and what breakthroughs are on the horizon?",
    author: {
      _id: "672bc14f5ed2c93a10f485y8",
      profile: {
        firstName: "Emma",
        lastName: "Wilson",
        profilePicture:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      },
      username: "emmaw",
      isVerified: true,
    },
    createdAt: "2024-01-13T09:15:00Z",
    topics: ["Renewable Energy", "Sustainability", "Technology", "Environment"],
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        alt: "Solar Panels",
      },
    ],
    stats: {
      views: 1567,
      upvotes: 124,
      answers: 34,
      saves: 78,
    },
    isBookmarked: true,
  },
  {
    id: "64f9a7b2e18c4d23af71c9d4",
    title: "Best practices for React performance optimization in 2024",
    content:
      "My React application is experiencing performance issues as it grows to handle complex state management and real-time features. What are the most effective optimization techniques I should implement in 2024? Looking for insights on React 18 features, code splitting strategies, memoization patterns, and bundle optimization. How do you handle large lists, expensive computations, and avoid unnecessary re-renders in production applications?",
    author: {
      _id: "672bc14f5ed2c93a10f485i9",
      profile: {
        firstName: "Alex",
        lastName: "Kumar",
        profilePicture:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      },
      username: "alexk",
      isVerified: true,
    },
    createdAt: "2024-01-12T14:45:00Z",
    topics: [
      "React",
      "Performance",
      "JavaScript",
      "Web Development",
      "Frontend",
    ],
    media: [],
    stats: {
      views: 2341,
      upvotes: 156,
      answers: 42,
      saves: 91,
    },
    isBookmarked: true,
  },
  {
    id: "6591c3e4bd02f19ab4e6a81c",
    title:
      "Understanding neural network architectures: CNNs, RNNs, and Transformers",
    content:
      "Can someone explain the fundamental differences between CNN, RNN, and Transformer architectures in simple terms? When should each architecture be used in practical applications? I'm particularly confused about when to choose Transformers over CNNs for computer vision tasks, and how attention mechanisms differ from convolutional operations. What are the computational requirements and typical use cases for each architecture?",
    author: {
      _id: "672bc14f5ed2c93a10f485f4",
      profile: {
        firstName: "David",
        lastName: "Park",
        profilePicture:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      },
      username: "davidp",
      isVerified: false,
    },
    createdAt: "2024-01-11T11:20:00Z",
    topics: [
      "Neural Networks",
      "Deep Learning",
      "AI",
      "Machine Learning",
      "Computer Vision",
    ],
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        alt: "Neural Network Visualization",
      },
    ],
    stats: {
      views: 1876,
      upvotes: 98,
      answers: 28,
      saves: 56,
    },
    isBookmarked: true,
  },
  {
    id: "67b2d1c4ef93a12f5087af62",
    title: "Ethical considerations in AI development and deployment",
    content:
      "What are the most important ethical considerations when developing and deploying AI systems in 2024? How can we ensure fairness, transparency, and accountability in machine learning models? I'm concerned about bias in training data, privacy implications of large language models, and the environmental impact of training massive AI systems. What frameworks and tools are available for responsible AI development, and how do companies implement ethical AI practices at scale?",
    author: {
      _id: "672bc14f5ed2c93a10f485hj",
      profile: {
        firstName: "Lisa",
        lastName: "Thompson",
        profilePicture:
          "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      },
      username: "lisat",
      isVerified: true,
    },
    createdAt: "2024-01-10T16:30:00Z",
    topics: [
      "AI Ethics",
      "Responsible AI",
      "Machine Learning",
      "Privacy",
      "Governance",
    ],
    media: [],
    stats: {
      views: 2987,
      upvotes: 203,
      answers: 67,
      saves: 124,
    },
    isBookmarked: true,
  },
];
