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
                {
                    type: "image",
                    url: "https://images.unsplash.com/photo-1624280664758-4350adc906c1?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJlJTIwcGhvbmUlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D",
                },
                {
                    type: "image",
                    url: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
            ],
            topics: ["React", "Frontend", "Optimization"],
            likes: ["676a983197cd8b2b496ef789"],
            upvotes: ["676a983197cd8b2b496ef789", "676a97bc97cd8b2b496e0003"],
            saves: ["676a983197cd8b2b496ef789"],
            views: 120,
            shares: 5,
            status: "active",
            answers: [
                {
                    _id: "676a983197cd8b2b496ef789",
                    author: {
                        _id: "676a983197cd8b2b496ef789",
                        username: "alex_tech",
                        profile: {
                            firstName: "Alex",
                            lastName: "Johnson",
                            profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
                        },
                        credentials: ["Senior AI Engineer", "ML Specialist"]
                    },
                    content: "You can improve performance by caching the model output and using lazy loading. Also consider using a message queue for heavy AI tasks.",
                    media: [
                        {
                            type: "image",
                            url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                        },
                    ],
                    upvotes: ["673ab4c9f19c2d00126f1192", "673ab4c9f19c2d00126f1193"],
                    likes: ["673ab4c9f19c2d00126f1194"],
                    comments: [
                        {
                            author: {
                                _id: "676a983197cd8b2b496ef789",
                                username: "sarah_dev",
                                profile: {
                                    firstName: "Sarah",
                                    lastName: "Chen",
                                    profilePicture: "https://images.unsplash.com/photo-1693011726259-cc6b89c90d62?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym95JTIwc3R1ZGVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
                                }
                            },
                            content: "Great explanation! Caching really helps.",
                            sentiment: "positive",
                            upvotes: [],
                            isAiGenerated: false,
                            createdAt: new Date(),
                        },
                    ],
                    aiAccuracy: 85,
                    views: 120,
                    shares: 10,
                    status: "published",
                },
                {
                    author: {
                        _id: "673ab4c9f19c2d00126f1196",
                        username: "ai_assistant",
                        profile: {
                            firstName: "AI",
                            lastName: "Assistant",
                        }
                    },
                    content: "A better approach is to use vector embeddings and a similarity search tool like Pinecone or Weaviate. It improves Q&A precision.",
                    media: [
                        {
                            type: "video",
                            url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                        },
                    ],
                    upvotes: ["673ab4c9f19c2d00126f1197"],
                    likes: [],
                    comments: [
                        {
                            author: {
                                _id: "673ab4c9f19c2d00126f1197",
                                username: "mike_engineer",
                                profile: {
                                    firstName: "Mike",
                                    lastName: "Rodriguez",
                                }
                            },
                            content: "Thanks for the suggestion! Will try embeddings.",
                            sentiment: "positive",
                            upvotes: ["673ab4c9f19c2d00126f1199"],
                            isAiGenerated: false,
                            createdAt: new Date(),
                        },
                    ],
                    aiAccuracy: 92,
                    views: 300,
                    shares: 25,
                    status: "published",
                },
                {
                    author: {
                        _id: "673ab4c9f19c2d00126f1198",
                        username: "alex_tech",
                        profile: {
                            firstName: "Alex",
                            lastName: "Johnson",
                            profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
                        }
                    },
                    content: "Use a multi-pass summarization approach: extractive summary first, then refine using generative AI. This gives more accurate summaries.",
                    media: [
                        {
                            type: "document",
                            url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                        },
                    ],
                    upvotes: [],
                    likes: ["673ab4c9f19c2d00126f1201", "673ab4c9f19c2d00126f1202"],
                    comments: [],
                    aiAccuracy: 78,
                    views: 80,
                    shares: 2,
                    status: "published",
                },
                {
                    author: {
                        _id: "673ab4c9f19c2d00126f1196",
                        username: "dr_li",
                        profile: {
                            firstName: "Dr.",
                            lastName: "Li",
                            profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
                        },
                        credentials: ["PhD in Computer Science", "Vector Database Expert"]
                    },
                    content: "To handle moderation, integrate toxicity detection using OpenAI, Google Perspective API, or your custom fine-tuned classifier.",
                    media: [
                        {
                            type: "audio",
                            url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
                        },
                    ],
                    upvotes: [],
                    likes: [],
                    comments: [
                        {
                            author: {
                                _id: "673ab4c9f19c2d00126f1198",
                                username: "data_scientist",
                                profile: {
                                    firstName: "Emma",
                                    lastName: "Wilson",
                                }
                            },
                            content: "Nice, moderation is a must for a Q&A platform.",
                            sentiment: "neutral",
                            upvotes: [],
                            isAiGenerated: true,
                            createdAt: new Date(),
                        },
                    ],
                    aiAccuracy: 60,
                    views: 40,
                    shares: 1,
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
    const [filterOptions, setFilterOptions] = useState([
        {
            label: "Trending",
            link: "filter=trending"
        },
        {
            label: "Most Viewed",
            link: "filter=views"
        },
        {
            label: "Popular",
            link: "filter=popular"
        },
        {
            label: "Data Science",
            link: "topic=data-science"
        },
        {
            label: "Web Development",
            link: "topic=web-development"
        },
        {
            label: "Machine Learning",
            link: "topic=ml"
        }
    ]);
    const [loadingQuestions, setLoadingQuestions] = useState(false);

    const values = useMemo(() => ({
        questions,
        filteredQuestions,
        filterOptions,
        loadingQuestions
    }), [questions, filteredQuestions, filterOptions, loadingQuestions]);

    return (
        <QuestionContext.Provider value={values}>
            {children}
        </QuestionContext.Provider>
    )
}