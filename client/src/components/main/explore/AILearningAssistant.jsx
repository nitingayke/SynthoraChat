import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Bot } from "lucide-react";
import AnalyticsContext from "../../../context/AnalyticsContext";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

export default function AILearningAssistant() {
    const { loading, analytics } = useContext(AnalyticsContext);

    const LIGHT_PRIMARY = "#f97316";
    const DARK_PRIMARY = "#07C5B9";

    const chartData = useMemo(() => {
        const dailyUsage = analytics?.ai?.dailyUsage || [];

        return {
            labels: dailyUsage?.map(d => d?.date),
            datasets: [
                {
                    label: "AI Sessions",
                    data: dailyUsage?.map(d => d?.sessions),
                    borderColor: DARK_PRIMARY,
                    backgroundColor: "rgba(7,197,185,0.15)",
                    tension: 0.5,
                    borderWidth: 2.5,
                    pointRadius: 3,
                    pointHoverRadius: 6,
                    pointBackgroundColor: DARK_PRIMARY,
                    pointBorderColor: "#07C5B980",
                    yAxisID: "y",
                },
                {
                    label: "AI Messages",
                    data: dailyUsage?.map(d => d?.messages),
                    borderColor: LIGHT_PRIMARY,
                    backgroundColor: "rgba(249,115,22,0.2)",
                    tension: 0.5,
                    borderWidth: 2.5,
                    pointRadius: 3,
                    pointHoverRadius: 6,
                    pointBackgroundColor: LIGHT_PRIMARY,
                    pointBorderColor: "#f9731680",
                    yAxisID: "y1",
                },
            ],
        };
    }, [analytics?.ai?.dailyUsage]);


    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: "index",
            intersect: false,
        },
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    color: "#9ca3af",
                    padding: 20,
                    font: { weight: "600" },
                },
            },
            tooltip: {
                backgroundColor: "#020617",
                titleColor: "#ffffff",
                bodyColor: "#e5e7eb",
                borderWidth: 1,
                borderColor: "#334155",
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "#9ca3af",
                },
                grid: {
                    display: false,
                },
            },
            y: {
                position: "left",
                ticks: {
                    color: DARK_PRIMARY,
                },
                grid: {
                    color: "rgba(7,197,185,0.15)",
                },
            },
            y1: {
                position: "right",
                ticks: {
                    color: LIGHT_PRIMARY,
                },
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };


    return (
        <div className="bg-white dark:bg-[#191919] rounded-lg p-4 text-white shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg text-orange-500 dark:text-[#07C5B9] bg-orange-500/10 dark:bg-[#07C5B9]/10">
                    <Bot className="w-8 h-8" />
                </div>
                <div className="text-gray-900 dark:text-white">
                    <h3 className="text-2xl font-bold whitespace-normal line-clamp-1">AI Usage Insights</h3>
                    <p className="text-sm opacity-90">
                        Understand how users interact with AI daily
                    </p>
                </div>
            </div>

            {/* Chart Section */}
            <div className="relative w-full h-[300px] sm:h-[360px] sm:bg-gray-100 sm:dark:bg-[#202020] rounded-lg sm:p-4 backdrop-blur-sm">

                {!loading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center text-gray-700 dark:text-gray-300 opacity-[0.15]">
                        <p className="text-xl md:text-4xl font-bold tracking-wide">
                            AI ACTIVITY
                        </p>
                        <p className="text-xs md:text-lg">
                            Last 30 days usage insights
                        </p>
                    </div>
                )}

                {loading ? (
                    <p className="text-center text-sm opacity-80 mt-32">
                        Loading AI usage stats...
                    </p>
                ) : (
                    <Line data={chartData} options={chartOptions} />
                )}
            </div>

            <div className="relative z-10 mt-4 flex justify-end">
                <Link
                    to="/main/ai-chat"
                    className="inline-flex items-center gap-2 rounded-lg border bg-orange-500/10 dark:bg-[#07C5B9]/10 px-5 py-2.5 text-sm font-semibold text-orange-500 dark:text-[#07C5B9] hover:bg-orange-500/20 dark:hover:bg-[#07C5B9]/20 transition-all"
                >
                    Open AI Assistant
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
