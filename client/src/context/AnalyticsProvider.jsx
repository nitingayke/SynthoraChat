import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchAnalytics } from "../services/analytics.service";
import AnalyticsContext from "./AnalyticsContext";

export const AnalyticsProvider = ({ children }) => {

    const [days, setDays] = useState(30);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(false);

    const loadAnalytics = useCallback(async (customDays = days) => {
        try {
            setLoading(true);
            const res = await fetchAnalytics(customDays);

            if (res?.success) {
                setAnalytics(res.data);
                setDays(customDays);
            }
        } catch (err) {
            console.error(err?.response?.data?.message || "Failed to load analytics");
        } finally {
            setLoading(false);
        }
    }, [days]);

    useEffect(() => {
        loadAnalytics(days);
    }, [days, loadAnalytics]);

    const values = useMemo(() => ({
        analytics,
        loading,
        days,
        setDays,
        reloadAnalytics: loadAnalytics,
    }), [analytics, days, loadAnalytics, loading]);

    return (
        <AnalyticsContext.Provider
            value={values}
        >
            {children}
        </AnalyticsContext.Provider>
    );
}