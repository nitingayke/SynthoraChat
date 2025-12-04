import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Brain, Users, ChevronRight } from 'lucide-react';
import AuthContext from '../../../context/AuthContext';

export default function QuickActions() {
    
    const { loginUser } = useContext(AuthContext);

    return (
        <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-lg p-4 text-white shadow-xl">
            <h3 className="text-xl font-bold mb-4">Get Started</h3>
            <div className="space-y-3">
                <Link
                    to="/main/ai-chat"
                    className="flex items-center gap-4 p-4 bg-white/20 rounded-lg hover:bg-white/30 transition-all group backdrop-blur-sm border border-white/20"
                >
                    <MessageSquare className="w-5 h-5" />
                    <span className="font-semibold">Ask a Question</span>
                    <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link
                    to="/main/ai-chat" 
                    className="flex items-center gap-4 p-4 bg-white/20 rounded-lg hover:bg-white/30 transition-all group backdrop-blur-sm border border-white/20"
                >
                    <Brain className="w-5 h-5" />
                    <span className="font-semibold">Chat with AI</span>
                    <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                {!loginUser && (
                    <Link
                        to="/auth"
                        className="flex items-center gap-4 p-4 bg-white/20 rounded-lg hover:bg-white/30 transition-all group backdrop-blur-sm border border-white/20"
                    >
                        <Users className="w-5 h-5" />
                        <span className="font-semibold">Join Community</span>
                        <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                )}
            </div>
        </div>
    );
}