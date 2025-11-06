import { useMemo, useState } from "react"
import QuestionContext from "./QuestionContext"

export const QuestionProvider = ({ children }) => {

    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([
        {
            _id: "676a983197cd8b2b496ef001",
            author: {
                _id: "676a97bc97cd8b2b496e0001",
                username: "nitin_codes",
                email: "nitin@example.com",
                profile: {
                    firstName: "Nitin",
                    lastName: "Gayke",
                    bio: "Full Stack Developer | Loves problem solving",
                    location: "India",
                    profilePicture: "https://plus.unsplash.com/premium_photo-1682089892133-556bde898f2c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3R1ZGVudCUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000",
                },
            },
            title: "How to improve performance in a React application?",
            content: `
Improving performance in a React application requires focusing on preventing unnecessary re-renders and optimizing component rendering strategies.

Here are some techniques I used in my last project:

✅ Avoid unnecessary re-renders using:
• React.memo()
• useCallback()
• useMemo()

✅ Break down large components into smaller reusable components  
→ Helps React re-render only the necessary part of the UI

✅ Reduce expensive computations inside components  
→ Move heavy logic outside render or useMemo()

✅ Use lazy loading and dynamic imports
→ Load components only when needed

✅ Avoid passing inline functions as props unnecessarily  
→ Causes child components to re-render

✅ Monitor render behavior using React DevTools Profiler

Conclusion: Performance improvement is mostly about rendering only what matters and avoiding unnecessary updates. ✨
`,
            media: [
                {
                    type: "image",
                    url: "https://d2ms8rpfqc4h24.cloudfront.net/React_Performance_Optimization_Techniques_0bf4828f5a.jpg",
                },
                {
                    type: "image",
                    url: "https://miro.medium.com/1*PRSCPASXfR-Kc4sQ_0ZSKw.jpeg",
                },
                {
                    type: "video",
                    url: "https://cloudinary-marketing-res.cloudinary.com/video/upload/f_auto,q_auto/v1723678081/Captions-Subtitles.mp4",
                },
            ],
            topics: ["React", "Frontend", "Optimization"],
            likes: ["676a97bc97cd8b2b496e0002"],
            upvotes: ["676a97bc97cd8b2b496e0002", "676a97bc97cd8b2b496e0003"],
            saves: ["676a97bc97cd8b2b496e0001"],
            views: 120,
            shares: 5,
            status: "active",
            answers: [
                {
                    _id: "676a983197cd8b2b496ef101",
                    author: "676a97bc97cd8b2b496e0003",
                    content:
                        "Use `React.memo()`, `useCallback`, and `useMemo` to prevent unnecessary re-renders. Also use React Dev Tools profiler.",
                    media: [
                        {
                            type: "document",
                            url: "https://example.com/react-performance-guide.pdf",
                        },
                    ],
                    upvotes: ["676a97bc97cd8b2b496e0001"],
                    likes: ["676a97bc97cd8b2b496e0001"],
                    views: 45,
                    shares: 2,
                    aiAccuracy: 0,
                    comments: [
                        {
                            _id: "676a983197cd8b2b496ef111",
                            author: "676a97bc97cd8b2b496e0002",
                            content: "Great explanation!",
                            sentiment: "positive",
                            upvotes: ["676a97bc97cd8b2b496e0001"],
                            isAiGenerated: false,
                        },
                    ],
                    status: "published",
                },
                {
                    _id: "676a983197cd8b2b496ef102",
                    author: {
                        _id: "676a97bc97cd8b2b496e0002",
                        username: "tech_guru",
                        email: "guru@example.com",
                        profile: {
                            firstName: "Aman",
                            lastName: "Tech",
                            bio: "Backend Engineer | MongoDB expert",
                            location: "India",
                            profilePicture: "https://img.freepik.com/free-photo/horizontal-portrait-smiling-happy-young-pleasant-looking-female-wears-denim-shirt-stylish-glasses-with-straight-blonde-hair-expresses-positiveness-poses_176420-13176.jpg?semt=ais_hybrid&w=740&q=80",
                        },
                    },
                    content:
                        "Lazy loading and dynamic imports help tremendously when dealing with large bundles.",
                    media: [],
                    upvotes: ["676a97bc97cd8b2b496e0003"],
                    likes: [],
                    comments: [],
                    views: 21,
                    shares: 0,
                    aiAccuracy: 0,
                    status: "published",
                },
            ],
        },
        {
            _id: "676a983197cd8b2b496ef002",
            author: {
                _id: "676a97bc97cd8b2b496e0003",
                username: "frontend_queen",
                email: "frontend@example.com",
                profile: {
                    firstName: "Shradha",
                    lastName: "Khapra",
                    bio: "React Enthusiast | UI/UX designer",
                    location: "Delhi",
                    profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000",
                },
            },
            title: "What is the difference between SQL and NoSQL databases?",
            content: `
SQL vs NoSQL — quick comparison:

📌 **SQL (Structured Query Language)**
• Uses tables (rows & columns)
• Follows ACID properties (safe & consistent)
• Best for banking, financial apps, ERP
• Fixed schema

📌 **NoSQL (Not Only SQL)**
• Stores data as documents / key-value / graph / column
• Highly scalable and flexible
• Best for chat apps, real-time analytics, Big Data
• Dynamic schema

💡 Tip: If relationships and consistency matter → use SQL  
If flexibility and speed matter → use NoSQL
`,
            media: [
                {
                    type: "video",
                    url: "https://res.cloudinary.com/videoapi-demo/video/upload/f_auto,q_auto/l_price_tag/g_track_person:position_e;adaptivesize_50,fl_layer_apply/AdobeStock_553714343.mp4",
                },
            ],
            topics: ["Database", "SQL", "NoSQL"],
            likes: ["676a97bc97cd8b2b496e0003"],
            upvotes: ["676a97bc97cd8b2b496e0002"],
            saves: ["676a97bc97cd8b2b496e0003"],
            views: 200,
            shares: 12,
            status: "active",
            answers: [
                {
                    _id: "676a983197cd8b2b496ef201",
                    author: "676a97bc97cd8b2b496e0002",
                    content:
                        "Use SQL when data is structured and relationships matter (banking, CRM systems). Use NoSQL for flexibility and scalability (chat apps, logging systems).",
                    media: [
                        {
                            type: "image",
                            url: "https://example.com/sql-vs-nosql-chart.jpg",
                        },
                    ],
                    upvotes: ["676a97bc97cd8b2b496e0001"],
                    likes: [],
                    comments: [],
                    views: 88,
                    shares: 4,
                    status: "published",
                },
            ],
        },
        {
            _id: "676a983197cd8b2b496ef003",
            author: {
                _id: "676a97bc97cd8b2b496e0003",
                username: "frontend_queen",
                email: "frontend@example.com",
                profile: {
                    firstName: "Shradha",
                    lastName: "Khapra",
                    bio: "React Enthusiast | UI/UX designer",
                    location: "Delhi",
                    profilePicture: "https://img.freepik.com/free-photo/horizontal-portrait-smiling-happy-young-pleasant-looking-female-wears-denim-shirt-stylish-glasses-with-straight-blonde-hair-expresses-positiveness-poses_176420-13176.jpg?semt=ais_hybrid&w=740&q=80",
                },
            },
            title: "How does WebRTC work for real-time video calling?",
            content:
                "I am curious about WebRTC signaling, STUN/TURN servers, and peer-to-peer communication. Can somebody explain in simple words?",
            media: [
                {
                    type: "image",
                    url: "https://i.sstatic.net/nsnm1.png",
                },
            ],
            topics: ["WebRTC", "Real-Time Communication", "Networking"],
            likes: ["676a97bc97cd8b2b496e0001"],
            upvotes: ["676a97bc97cd8b2b496e0001", "676a97bc97cd8b2b496e0003"],
            saves: [],
            views: 90,
            shares: 3,
            status: "active",
            answers: [
                {
                    _id: "676a983197cd8b2b496ef301",
                    author: "676a97bc97cd8b2b496e0001",
                    content:
                        "WebRTC enables real-time communication by establishing a P2P connection between users using STUN/TURN servers for negotiation.",
                    media: [
                        {
                            type: "document",
                            url: "https://example.com/webrtc-notes.pdf",
                        },
                    ],
                    upvotes: ["676a97bc97cd8b2b496e0003"],
                    likes: [],
                    comments: [],
                    views: 57,
                    shares: 1,
                    status: "published",
                },
            ],
        },
    ]);

    const values = useMemo(() => ({
        questions,
        filteredQuestions
    }), [questions, filteredQuestions]);

    return (
        <QuestionContext.Provider value={values}>
            {children}
        </QuestionContext.Provider>
    )
}