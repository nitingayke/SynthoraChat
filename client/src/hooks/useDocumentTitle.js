import { useEffect } from "react";

export default function useDocumentTitle(title, suffix = "Synthora Chat") {
  useEffect(() => {
    if (!title) return;

    const prevTitle = document.title;

    document.title = suffix ? `${title} | ${suffix}` : title;

    return () => {
      document.title = prevTitle;
    };
  }, [title, suffix]);
}
