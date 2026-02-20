export const TOKEN_ESTIMATE_FACTOR = 4;

export const estimateTokens = (text = "") => {
  if (!text) return 0;
  return Math.ceil(text.length / 4);
};

export function buildTokenLimitedContext(oldMessages, newMessage, maxTokens) {
  let totalTokens = estimateTokens(newMessage.content);
  const selectedMessages = [newMessage];

  for (let i = oldMessages.length - 1; i >= 0; i--) {
    const msg = oldMessages[i];
    const tokens = estimateTokens(msg.content);

    if (totalTokens + tokens > maxTokens) break;

    selectedMessages.unshift(msg);
    totalTokens += tokens;
  }

  return selectedMessages;
}
