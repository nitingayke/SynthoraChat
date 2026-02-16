export const TOKEN_ESTIMATE_FACTOR = 4;

export const estimateTokens = (text = "") => {
  return Math.ceil(text.length / TOKEN_ESTIMATE_FACTOR);
};

export const buildTokenLimitedContext = (allMessages, newMessage, maxTokens) => {
  let tokenCount = estimateTokens(newMessage.content);

  const context = [newMessage];

  for (let i = allMessages.length - 1; i >= 0; i--) {
    const msg = allMessages[i];
    const msgTokens = estimateTokens(msg.content);

    if (tokenCount + msgTokens > maxTokens) break;

    context.unshift(msg);
    tokenCount += msgTokens;
  }

  return context;
}