import AuthContext from "./AuthContext";
import { useMemo, useState } from "react";

export const AuthProvider = ({ children }) => {

    const [loginUser, setLoginUser] = useState(
        // {
        //     "username": "nitin_gayke",
        //     "email": "nitin@example.com",
        //     "password": "$2b$10$ZzZzZzZzZzZzZzZzZzZzO6b8kR7g3oE8m5xW7kMZzO",
        //     "profile": {
        //         "firstName": "Nitin",
        //         "lastName": "Gayke",
        //         "bio": "Full-Stack Developer | Building real-time chat apps and solving DSA problems daily.",
        //         "location": "Pune, India",
        //         "website": "https://nitin-portfolio.dev",
        //         "profilePicture": "https://images.unsplash.com/photo-1693011726259-cc6b89c90d62?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym95JTIwc3R1ZGVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
        //         "coverPicture": "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
        //     },
        //     "credentials": ["Full-Stack Developer", "Problem Solver", "Tech Enthusiast"],
        //     "topicsOfInterest": ["JavaScript", "Web Development", "AI", "DSA"],
        //     "knowsAbout": ["React", "Node.js", "MongoDB", "WebSockets", "Java"],
        //     "notifications": [
        //         {
        //             "title": "New Answer Received",
        //             "description": "Someone answered your question: 'How to optimize WebRTC calls?'",
        //             "date": "2025-11-01T09:21:00.000Z"
        //         },
        //         {
        //             "title": "Profile Viewed",
        //             "description": "Your profile was viewed 12 times today.",
        //             "date": "2025-11-01T08:10:00.000Z"
        //         },
        //         {
        //             "title": "Post Saved",
        //             "description": "Someone saved your post about 'Scaling Socket.IO + Redis'.",
        //             "date": "2025-11-01T07:42:00.000Z"
        //         },
        //         {
        //             "title": "New Follower",
        //             "description": "John Doe started following you.",
        //             "date": "2025-11-01T05:30:00.000Z"
        //         },
        //         {
        //             "title": "AI Chat Summary Ready",
        //             "description": "Your AI chat session summary is now available.",
        //             "date": "2025-10-31T22:00:00.000Z"
        //         }
        //     ],
        //     "followers": [
        //         {
        //             "user": "671fb9c3a18c8a5c0d6e8b01",
        //             "followedAt": "2025-10-20T14:22:00.000Z"
        //         }
        //     ],
        //     "following": [
        //         {
        //             "user": "671fb9c3a18c8a5c0d6e8b02",
        //             "followedAt": "2025-10-22T09:15:00.000Z"
        //         }
        //     ],
        //     "blockedUsers": [
        //         {
        //             "user": "671fb9c3a18c8a5c0d6e8b03",
        //             "blockedAt": "2025-10-25T17:00:00.000Z"
        //         }
        //     ],
        //     "answers": [
        //         "671fb9c3a18c8a5c0d6e8b04",
        //         "671fb9c3a18c8a5c0d6e8b05"
        //     ],
        //     "questions": [
        //         "671fb9c3a18c8a5c0d6e8b06",
        //         "671fb9c3a18c8a5c0d6e8b07"
        //     ],
        //     "savedQuestions": [
        //         {
        //             "question": "671fb9c3a18c8a5c0d6e8b08",
        //             "savedAt": "2025-10-28T12:00:00.000Z"
        //         },
        //         {
        //             "question": "671fb9c3a18c8a5c0d6e8b09",
        //             "savedAt": "2025-10-29T16:30:00.000Z"
        //         }
        //     ],
        //     "aiInteractions": [
        //         {
        //             _id: "673ef21c8b2d56c1a9f4e001",
        //             user: "673eeff48b2d56c1a9f4dfd8", // userId reference
        //             title: "Understanding React useEffect",
        //             sessionType: "general_chat",
        //             messages: [
        //                 {
        //                     role: "user",
        //                     content: "Hey Synthora, can you explain how useEffect works in React?",
        //                     timestamp: "2025-11-12T10:15:30.000Z",
        //                 },
        //                 {
        //                     role: "assistant",
        //                     content:
        //                         "Of course! useEffect lets you perform side effects like data fetching or DOM updates after render. You can control when it runs by providing a dependency array.",
        //                     timestamp: "2025-11-12T10:15:35.000Z",
        //                     metadata: {
        //                         modelUsed: "GPT-5",
        //                         tokens: 58,
        //                         responseTime: 1340,
        //                         confidenceScore: 0.94,
        //                     },
        //                 },
        //                 {
        //                     role: "user",
        //                     content:
        //                         "Got it! So if I pass an empty array, it runs only once, right?",
        //                     timestamp: "2025-11-12T10:15:50.000Z",
        //                 },
        //                 {
        //                     role: "assistant",
        //                     content:
        //                         "Exactly ✅ — with an empty array, it behaves like componentDidMount and runs only once after the first render.",
        //                     timestamp: "2025-11-12T10:15:53.000Z",
        //                     metadata: {
        //                         modelUsed: "GPT-5",
        //                         tokens: 42,
        //                         responseTime: 980,
        //                         confidenceScore: 0.97,
        //                     },
        //                 },
        //             ],
        //             createdAt: "2025-11-12T10:15:25.000Z",
        //             updatedAt: "2025-11-12T10:16:00.000Z",
        //         },

        //         {
        //             _id: "673ef22b8b2d56c1a9f4e002",
        //             user: "673eeff48b2d56c1a9f4dfd8",
        //             title: "Summarize AI impact on jobs",
        //             sessionType: "summarization",
        //             messages: [
        //                 {
        //                     role: "user",
        //                     content:
        //                         "Can you summarize how AI is affecting job markets worldwide?",
        //                     timestamp: "2025-11-11T18:40:00.000Z",
        //                 },
        //                 {
        //                     role: "assistant",
        //                     content:
        //                         "AI is transforming job markets by automating repetitive tasks, creating demand for tech-related roles, and requiring new skills. While some jobs are displaced, new ones are emerging in data science, AI governance, and robotics.",
        //                     timestamp: "2025-11-11T18:40:08.000Z",
        //                     metadata: {
        //                         modelUsed: "GPT-5",
        //                         tokens: 77,
        //                         responseTime: 1620,
        //                         confidenceScore: 0.91,
        //                     },
        //                 },
        //             ],
        //             createdAt: "2025-11-11T18:39:58.000Z",
        //             updatedAt: "2025-11-11T18:40:10.000Z",
        //         },

       );
    
    const logout = () => {
        setLoginUser(null);
    }

    const values = useMemo(() => ({
        loginUser,
        setLoginUser,
        logout
    }), [loginUser]);

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}