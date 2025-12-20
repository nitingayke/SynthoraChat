export const filterAnswersByQuery = (answers = [], query = "") => {
  if (!query.trim()) return answers;

  const lowerQuery = query.toLowerCase();

  return answers.filter((a) => {
    const contentMatch = a.content?.toLowerCase().includes(lowerQuery);
    return contentMatch;
  });
};
