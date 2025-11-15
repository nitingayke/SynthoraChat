import AuthContext from "./AuthContext";
import { useMemo, useState } from "react";

export const AuthProvider = ({ children }) => {

    const [loginUser, setLoginUser] = useState(
        {
            "username": "nitin_gayke",
            "email": "nitin@example.com",
            "password": "$2b$10$ZzZzZzZzZzZzZzZzZzZzO6b8kR7g3oE8m5xW7kMZzO",
            "profile": {
                "firstName": "Nitin",
                "lastName": "Gayke",
                "bio": "Full-Stack Developer | Building real-time chat apps and solving DSA problems daily.",
                "location": "Pune, India",
                "website": "https://nitin-portfolio.dev",
                "profilePicture": "https://images.unsplash.com/photo-1693011726259-cc6b89c90d62?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym95JTIwc3R1ZGVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
                "coverPicture": "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
            },
            "credentials": ["Full-Stack Developer", "Problem Solver", "Tech Enthusiast"],
            "topicsOfInterest": ["JavaScript", "Web Development", "AI", "DSA"],
            "knowsAbout": ["React", "Node.js", "MongoDB", "WebSockets", "Java"],
            "notifications": [
                {
                    "title": "New Answer Received",
                    "description": "Someone answered your question: 'How to optimize WebRTC calls?'",
                    "date": "2025-11-01T09:21:00.000Z"
                },
                {
                    "title": "Profile Viewed",
                    "description": "Your profile was viewed 12 times today.",
                    "date": "2025-11-01T08:10:00.000Z"
                },
                {
                    "title": "Post Saved",
                    "description": "Someone saved your post about 'Scaling Socket.IO + Redis'.",
                    "date": "2025-11-01T07:42:00.000Z"
                },
                {
                    "title": "New Follower",
                    "description": "John Doe started following you.",
                    "date": "2025-11-01T05:30:00.000Z"
                },
                {
                    "title": "AI Chat Summary Ready",
                    "description": "Your AI chat session summary is now available.",
                    "date": "2025-10-31T22:00:00.000Z"
                }
            ],
            "followers": [
                {
                    "user": "671fb9c3a18c8a5c0d6e8b01",
                    "followedAt": "2025-10-20T14:22:00.000Z"
                }
            ],
            "following": [
                {
                    "user": "671fb9c3a18c8a5c0d6e8b02",
                    "followedAt": "2025-10-22T09:15:00.000Z"
                }
            ],
            "blockedUsers": [
                {
                    "user": "671fb9c3a18c8a5c0d6e8b03",
                    "blockedAt": "2025-10-25T17:00:00.000Z"
                }
            ],
            "answers": [
                "671fb9c3a18c8a5c0d6e8b04",
                "671fb9c3a18c8a5c0d6e8b05"
            ],
            "questions": [
                "671fb9c3a18c8a5c0d6e8b06",
                "671fb9c3a18c8a5c0d6e8b07"
            ],
            "savedQuestions": [
                {
                    "question": "671fb9c3a18c8a5c0d6e8b08",
                    "savedAt": "2025-10-28T12:00:00.000Z"
                },
                {
                    "question": "671fb9c3a18c8a5c0d6e8b09",
                    "savedAt": "2025-10-29T16:30:00.000Z"
                }
            ],
            "aiInteractions": [
                {
                    "sessionId": "671fb9c3a18c8a5c0d6e8b10",
                    "title": "AI Chat: Solving DSA Doubts",
                    "timestamp": "2025-10-30T10:00:00.000Z"
                },
                {
                    "sessionId": "671fb9c3a18c8a5c0d6e8b11",
                    "title": "AI Chat: React Performance Optimization",
                    "timestamp": "2025-10-31T08:45:00.000Z"
                }
            ],
            "upvotesCount": 152,
            "helpfulAnswers": 45,
            "isVerified": true,
            "lastActive": "2025-11-01T14:15:00.000Z"
        }
    );

    // const [loginUser, setLoginUser] = useState(null);

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