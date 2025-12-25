import { fetchCurrentUser } from "../services/user.service";
import AuthContext from "./AuthContext";
import { useEffect, useMemo, useState } from "react";

export const AuthProvider = ({ children }) => {

    const [loginUser, setLoginUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    const logout = () => {
        localStorage.removeItem("token");
        setLoginUser(null);
    }

    useEffect(() => {
        const initAuth = async() => {
            const token = localStorage.getItem("token");

            if(!token) {
                setAuthLoading(false);
                return;
            }

            try {
                const res = await fetchCurrentUser();
                const user = res?.data?.user || null;
                setLoginUser(user);

            } catch {
                logout();
            } finally {
                setAuthLoading(false);
            }
        }

        initAuth();
    }, []);

    const values = useMemo(() => ({
        loginUser,
        setLoginUser,
        logout,
        authLoading
    }), [loginUser, authLoading]);

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

// {
//             "_id": "676a983197cd8b2b496ef789",
//             "username": "nitin_gayke",
//             "email": "nitin@example.com",
//             "password": "$2b$10$ZzZzZzZzZzZzZzZzZzZzO6b8kR7g3oE8m5xW7kMZzO",
//             "profile": {
//                 "firstName": "Nitin",
//                 "lastName": "Gayke",
//                 "bio": "Full-Stack Developer | Building real-time chat apps and solving DSA problems daily.",
//                 "location": "Pune, India",
//                 "website": "https://nitin-portfolio.dev",
//                 "profilePicture": "https://images.unsplash.com/photo-1693011726259-cc6b89c90d62?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym95JTIwc3R1ZGVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
//                 "coverPicture": "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
//             },
//             "credentials": ["Full-Stack Developer", "Problem Solver", "Tech Enthusiast"],
//             "topicsOfInterest": ["JavaScript", "Web Development", "AI", "DSA"],
//             "knowsAbout": ["React", "Node.js", "MongoDB", "WebSockets", "Java"],
//             "notifications": [
//                 {
//                     "title": "New Answer Received",
//                     "description": "Someone answered your question: 'How to optimize WebRTC calls?'",
//                     "date": "2025-11-01T09:21:00.000Z"
//                 },
//                 {
//                     "title": "Profile Viewed",
//                     "description": "Your profile was viewed 12 times today.",
//                     "date": "2025-11-01T08:10:00.000Z"
//                 },
//                 {
//                     "title": "Post Saved",
//                     "description": "Someone saved your post about 'Scaling Socket.IO + Redis'.",
//                     "date": "2025-11-01T07:42:00.000Z"
//                 },
//                 {
//                     "title": "New Follower",
//                     "description": "John Doe started following you.",
//                     "date": "2025-11-01T05:30:00.000Z"
//                 },
//                 {
//                     "title": "AI Chat Summary Ready",
//                     "description": "Your AI chat session summary is now available.",
//                     "date": "2025-10-31T22:00:00.000Z"
//                 }
//             ],
//             "followers": [
//                 {
//                     user: {
//                         _id: "671fb9c3a18c8a5c0d6e8b02",
//                         username: "ai_expert",
//                         profile: {
//                             firstName: "Alex",
//                             lastName: "Johnson",
//                             bio: "UX designer, Skilled in java CPP and have experience in MERN",
//                             location: "San Francisco, CA",
//                             website: "https://onepagelove.com/inspiration/portfolio",
//                             profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
//                         },
//                         "credentials": ["Software Engineer", "MERN Stack Developer"],
//                         "topicsOfInterest": ["JavaScript", "Web Development", "AI", "DSA"],
//                         "followers": [
//                             {
//                                 "user": "671fb9c3a18c8a5c0d6e8b02",
//                                 "followedAt": "2025-10-22T09:15:00.000Z"
//                             },
//                             {
//                                 "user": "671fb9c3a18c8a5c0d6e8b02",
//                                 "followedAt": "2025-10-22T09:15:00.000Z"
//                             }
//                         ],
//                         "following": [
//                             {
//                                 "user": "671fb9c3a18c8a5c0d6e8b02",
//                                 "followedAt": "2025-10-22T09:15:00.000Z"
//                             },
//                             {
//                                 "user": "671fb9c3a18c8a5c0d6e8b02",
//                                 "followedAt": "2025-10-22T09:15:00.000Z"
//                             }
//                         ],
//                         lastActive: Date.now(),
//                         createdAt: Date.now()
//                     },
//                     followedAt: "2025-10-22T09:15:00.000Z"
//                 },
//             ],
//             "following": [
//                 {
//                     user: {
//                         _id: "671fb9c3a18c8a5c0d6e8b01",
//                         username: "tech_guru",
//                         profile: {
//                             firstName: "John",
//                             lastName: "Doe",
//                             bio: "Senior Full Stack Developer with 8+ years experience in React, Node.js, and cloud technologies",
//                             location: "San Francisco, CA",
//                             website: "https://johndoe.dev",
//                             profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
//                         },
//                         credentials: ["Senior Full Stack Developer", "AWS Certified Solutions Architect"],
//                         topicsOfInterest: ["Web Development", "Cloud Computing", "DevOps", "AI"],
//                         followers: [
//                             { user: "671fb9c3a18c8a5c0d6e8b02", followedAt: "2024-10-20T14:22:00.000Z" },
//                             { user: "671fb9c3a18c8a5c0d6e8b03", followedAt: "2024-10-25T09:15:00.000Z" },
//                             { user: "671fb9c3a18c8a5c0d6e8b04", followedAt: "2024-11-01T16:30:00.000Z" }
//                         ],
//                         following: [
//                             { user: "671fb9c3a18c8a5c0d6e8b02", followedAt: "2024-10-22T09:15:00.000Z" },
//                             { user: "671fb9c3a18c8a5c0d6e8b05", followedAt: "2024-10-28T13:40:00.000Z" }
//                         ],
//                         lastActive: new Date("2024-12-24T14:30:00.000Z"),
//                         createdAt: new Date("2023-01-15T10:00:00.000Z"),
//                         isVerified: true
//                     },
//                     followedAt: "2024-10-22T09:15:00.000Z"
//                 },
//                 {
//                     user: {
//                         _id: "671fb9c3a18c8a5c0d6e8b02",
//                         username: "ai_expert",
//                         profile: {
//                             firstName: "Alex",
//                             lastName: "Johnson",
//                             bio: "AI/ML Engineer specializing in NLP and Computer Vision. Building cutting-edge AI solutions",
//                             location: "New York, NY",
//                             website: "https://alexjohnson.ai",
//                             profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
//                         },
//                         credentials: ["Senior AI Engineer", "PhD in Machine Learning, Stanford"],
//                         topicsOfInterest: ["Artificial Intelligence", "Machine Learning", "NLP", "Computer Vision"],
//                         followers: [
//                             { user: "671fb9c3a18c8a5c0d6e8b01", followedAt: "2024-10-20T14:22:00.000Z" },
//                             { user: "671fb9c3a18c8a5c0d6e8b03", followedAt: "2024-10-26T11:20:00.000Z" },
//                             { user: "671fb9c3a18c8a5c0d6e8b04", followedAt: "2024-11-02T15:45:00.000Z" }
//                         ],
//                         following: [
//                             { user: "671fb9c3a18c8a5c0d6e8b01", followedAt: "2024-10-25T09:15:00.000Z" },
//                             { user: "671fb9c3a18c8a5c0d6e8b05", followedAt: "2024-10-29T10:30:00.000Z" }
//                         ],
//                         lastActive: new Date("2024-12-24T12:15:00.000Z"),
//                         createdAt: new Date("2022-08-10T09:30:00.000Z"),
//                         isVerified: true
//                     },
//                     followedAt: "2024-10-25T09:15:00.000Z"
//                 },
//                 {
//                     user: {
//                         _id: "671fb9c3a18c8a5c0d6e8b03",
//                         username: "ui_ux_pro",
//                         profile: {
//                             firstName: "Sarah",
//                             lastName: "Chen",
//                             bio: "Frontend Developer & UI/UX Designer passionate about creating beautiful, accessible web experiences",
//                             location: "Seattle, WA",
//                             website: "https://sarahchen.design",
//                             profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
//                         },
//                         credentials: ["Senior Frontend Engineer at Figma", "UI/UX Design Specialist"],
//                         topicsOfInterest: ["UI/UX Design", "Frontend Development", "Web Accessibility", "Design Systems"],
//                         followers: [
//                             { user: "671fb9c3a18c8a5c0d6e8b01", followedAt: "2024-10-25T09:15:00.000Z" },
//                             { user: "671fb9c3a18c8a5c0d6e8b02", followedAt: "2024-10-26T11:20:00.000Z" },
//                             { user: "671fb9c3a18c8a5c0d6e8b04", followedAt: "2024-10-30T14:35:00.000Z" }
//                         ],
//                         following: [
//                             { user: "671fb9c3a18c8a5c0d6e8b01", followedAt: "2024-10-28T13:40:00.000Z" },
//                             { user: "671fb9c3a18c8a5c0d6e8b06", followedAt: "2024-11-01T10:25:00.000Z" }
//                         ],
//                         lastActive: new Date("2024-12-24T10:45:00.000Z"),
//                         createdAt: new Date("2023-03-20T08:45:00.000Z"),
//                         isVerified: true
//                     },
//                     followedAt: "2024-10-28T13:40:00.000Z"
//                 },
//             ],
//             "blockedUsers": [
//                 {
//                     "user": "671fb9c3a18c8a5c0d6e8b03",
//                     "blockedAt": "2025-10-25T17:00:00.000Z"
//                 }
//             ],
//             "answers": [
//                 "671fb9c3a18c8a5c0d6e8b04",
//                 "671fb9c3a18c8a5c0d6e8b05"
//             ],
//             "questions": [
//                 "671fb9c3a18c8a5c0d6e8b06",
//                 "671fb9c3a18c8a5c0d6e8b07"
//             ],
//             "savedQuestions": [
//                 {
//                     "question": "671fb9c3a18c8a5c0d6e8b08",
//                     "savedAt": "2025-10-28T12:00:00.000Z"
//                 },
//                 {
//                     "question": "671fb9c3a18c8a5c0d6e8b09",
//                     "savedAt": "2025-10-29T16:30:00.000Z"
//                 }
//             ],
//             "aiInteractions": [
//                 {
//                     _id: "673ef21c8b2d56c1a9f4e001",
//                     user: "673eeff48b2d56c1a9f4dfd8", // userId reference
//                     title: "Understanding React useEffect",
//                     sessionType: "general_chat",
//                     messages: [
//                         {
//                             role: "user",
//                             content: "Hey Synthora, can you explain how useEffect works in React?",
//                             timestamp: "2025-11-12T10:15:30.000Z",
//                         },
//                         {
//                             role: "assistant",
//                             content:
//                                 "Of course! useEffect lets you perform side effects like data fetching or DOM updates after render. You can control when it runs by providing a dependency array.",
//                             timestamp: "2025-11-12T10:15:35.000Z",
//                             metadata: {
//                                 modelUsed: "GPT-5",
//                                 tokens: 58,
//                                 responseTime: 1340,
//                                 confidenceScore: 0.94,
//                             },
//                         },
//                         {
//                             role: "user",
//                             content:
//                                 "Got it! So if I pass an empty array, it runs only once, right?",
//                             timestamp: "2025-11-12T10:15:50.000Z",
//                         },
//                         {
//                             role: "assistant",
//                             content:
//                                 "Exactly ✅ — with an empty array, it behaves like componentDidMount and runs only once after the first render.",
//                             timestamp: "2025-11-12T10:15:53.000Z",
//                             metadata: {
//                                 modelUsed: "GPT-5",
//                                 tokens: 42,
//                                 responseTime: 980,
//                                 confidenceScore: 0.97,
//                             },
//                         },
//                     ],
//                     createdAt: "2025-11-12T10:15:25.000Z",
//                     updatedAt: "2025-11-12T10:16:00.000Z",
//                 },

//                 {
//                     _id: "673ef22b8b2d56c1a9f4e002",
//                     user: "673eeff48b2d56c1a9f4dfd8",
//                     title: "Summarize AI impact on jobs",
//                     sessionType: "summarization",
//                     messages: [
//                         {
//                             role: "user",
//                             content:
//                                 "Can you summarize how AI is affecting job markets worldwide?",
//                             timestamp: "2025-11-11T18:40:00.000Z",
//                         },
//                         {
//                             role: "assistant",
//                             content:
//                                 "AI is transforming job markets by automating repetitive tasks, creating demand for tech-related roles, and requiring new skills. While some jobs are displaced, new ones are emerging in data science, AI governance, and robotics.",
//                             timestamp: "2025-11-11T18:40:08.000Z",
//                             metadata: {
//                                 modelUsed: "GPT-5",
//                                 tokens: 77,
//                                 responseTime: 1620,
//                                 confidenceScore: 0.91,
//                             },
//                         },
//                     ],
//                     createdAt: "2025-11-11T18:39:58.000Z",
//                     updatedAt: "2025-11-11T18:40:10.000Z",
//                 },

//                 {
//                     _id: "673ef2508b2d56c1a9f4e003",
//                     user: "673eeff48b2d56c1a9f4dfd8",
//                     title: "Fact check: Is AI replacing doctors?",
//                     sessionType: "fact_check",
//                     messages: [
//                         {
//                             role: "user",
//                             content: "I read that AI will replace doctors soon. Is that true?",
//                             timestamp: "2025-11-10T12:05:30.000Z",
//                         },
//                         {
//                             role: "assistant",
//                             content:
//                                 "Not exactly. AI supports doctors by analyzing scans and predicting outcomes faster, but it cannot replace human judgment and empathy in healthcare decisions.",
//                             timestamp: "2025-11-10T12:05:40.000Z",
//                             metadata: {
//                                 modelUsed: "GPT-5",
//                                 tokens: 68,
//                                 responseTime: 1210,
//                                 confidenceScore: 0.93,
//                             },
//                         },
//                     ],
//                     createdAt: "2025-11-10T12:05:25.000Z",
//                     updatedAt: "2025-11-10T12:05:42.000Z",
//                 },
//             ],
//             "upvotesCount": 152,
//             "helpfulAnswers": 45,
//             "isVerified": true,
//             "joinDate": "2025-11-01T14:15:00.000Z",
//             "lastActive": "2025-11-01T14:15:00.000Z"
//         }