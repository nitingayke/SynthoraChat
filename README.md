# Synthora – Generative AI Q&A Platform

![Synthora AI Banner](./assets/aiAnswerPoster.png)

## 📌 About the Project

**Synthora** is a next-generation **AI-powered Q&A platform** that blends **community-driven knowledge sharing with Generative AI intelligence**.

### It enables users to ask questions, receive answers from people, and leverage AI to:
- Evaluate answer quality
- Generate summaries
- Provide intelligent suggestions
- Deliver real-time interactive experiences


> 🚀 Designed to simulate a StackOverflow + ChatGPT hybrid system with real-time collaboration, AI evaluation, and personalized recommendations.

---

# 🎯 Project Goal
### To build a scalable system that:
- Enhances knowledge sharing
- Improves answer quality using AI
- Provides summarized and reliable insights
- Enables real-time collaboration

# 🖼️ UI Preview
 AI Chat | User Questions | Admin Dashboard |
|--------------|----------------|-----------------|
| ![ai chat](./assets/aiChatSection.png) | ![home page](./assets/homePage.png) | ![answer tracking](./assets/answerTracking.png) |

| Question Interface | Create Question | Explore |
|--------------|-----------------|----------------|
| ![question interface](./assets/problemSolving.png) | ![new question](./assets/questionCreate.png) | ![about app](./assets/explore.png) |

| Create Answer | Password Update | New Password |
|--------------|-----------------|----------------|
| ![Create Answer](./assets/createAnswer.png) | ![Password Update](./assets/passwordUpd.png) | ![New Password](./assets/newPassword.png) |


> # 🚀 Tech Stack
## 🖥️ Frontend (React + Vite)
- React 19 + Vite
- Tailwind CSS + Material UI
- Framer Motion (animations)
- Chart.js / Recharts (analytics)
- React Markdown + Highlight.js
- Socket.IO Client (real-time updates)
- Google OAuth
- EmailJS (OTP / communication)

## ⚙️ Backend (Node.js + Express)
- Node.js + Express 5
- MongoDB + Mongoose
- JWT Authentication + bcrypt
- Socket.IO (real-time system)
- Cloudinary (media uploads)
- Modular architecture (MVC + services)

## 🤖 AI Server (FastAPI + LangChain)
- FastAPI
- LangChain Agents
- Google Gemini API
- Streaming responses (real-time AI output)
- Tool integrations (Tavily, Weather API, YoutubeLoader, etc.)

---

## 🌐 Hosted Links

> 🚧 Deployment in progress — full-stack + AI services will be available soon.

- 🚀 Frontend (React): Coming Soon
- 🌐 Backend (Node.js): Coming Soon
- 🤖 AI Server (FastAPI): Coming Soon
  
---

> # 🔥 Core Features

## 💬 1. Community Answers + AI Evaluation
- Users can answer and discuss
- AI evaluates answers based on:
- Accuracy
- Completeness
- Relevance

## 🧠 2. AI Summarization
### Generates:
- Short summaries
- Detailed explanations
- Bullet-point insights
- Creates a consensus answer

## 🤖 3. AI-Generated Responses
- Instant AI answers
- Context-aware responses
- Follow-up question suggestions

## 📊 4. Recommendation System (Partially Pending)
- Personalized feed
- Suggested questions & topics (in progress)

## 🔍 5. Filtering & Search
### Sort by:
- AI rating
- Popularity
- Recency
- Advanced filtering
- Natural language search

# 🛡️ 6. Quality & Reliability
- AI fact-checking
- Confidence scoring
- Highlight conflicting answers

# 💬 7. Real-Time Collaboration
- Live updates via Socket.IO
- Online/offline user tracking

# 🎨 8. User Experience
- Dark/Light mode
- Responsive UI
- AI autocomplete
- Profile analytics

![Learning Exp](./assets/learningExp.png)


> # ⚙️ Installation Guide (Local Setup)

## 1️⃣ Clone Repository
```bash
git clone https://github.com/nitingayke/SynthoraChat.git
cd SynthoraChat
```

## 🖥️ Frontend Setup
```bash
cd client
npm install
npm run dev
```

## 🔐 Client Environment Variables
```env
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
VITE_GOOGLE_CLIENT_ID=
```

## ⚙️ Backend Setup (Node.js Server)
```bash
cd server
npm install
npm run dev
```

## 🔐 Server Environment Variables
```env
PORT=9090
JWT_SECRET=

DATABASE_USERNAME=
MONGO_PASSWORD=
MONGODB_URL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## 🤖 AI Server Setup (FastAPI)
### 1. Navigate to AI Server
```bash
cd ai-server
```

### 2. Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run Server
```bash
uvicorn main:app --reload --port 8000
```

# 🔐 AI Server Environment Variables
```bash
GEMINI_API_KEY=
GEMINI_MODEL_NAME=

WEATHERSTACK_API_KEY=
TAVILY_API_KEY=
```

> # 🔌 API Overview
- Auth APIs → Login, Register, OAuth
- Question APIs → Create, Fetch, Tagging
- Answer APIs → Post, Evaluate
- AI APIs → Chat, Summarization, Evaluation
- User APIs → Profile, Activity
- Analytics APIs → Engagement tracking

> 📊 Total APIs implemented: 38+

---

##  Connect With Me
If you're working on something similar, have questions, or want to collaborate, feel free to connect! I’d love to hear from you. 🚀

-  [LinkedIn](https://www.linkedin.com/in/nitin-gayke92/)
-  [Portfolio](https://nitin-portfolio-gilt.vercel.app/)
-  gaykenitin975@gmail.com
