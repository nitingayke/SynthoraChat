export const filterQuestionsByQuery = (questions = [], query = "") => {
  if (!query.trim()) return questions;

  const lowerQuery = query.toLowerCase();

  return questions.filter((q) => {
    const titleMatch = q.title?.toLowerCase().includes(lowerQuery);
    const contentMatch = q.content?.toLowerCase().includes(lowerQuery);
    const topicMatch = q.topics?.some((t) =>
      t.toLowerCase().includes(lowerQuery)
    );

    return titleMatch || contentMatch || topicMatch;
  });
};

export const filterUserQuestions = (
  allQuestions = [],
  userQuestionIds = []
) => {
  if (!userQuestionIds.length) return [];

  const idSet = new Set(userQuestionIds.map(String));

  return allQuestions.filter((q) => idSet.has(String(q._id)));
};
