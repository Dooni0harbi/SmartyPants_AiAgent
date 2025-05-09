export const validateApiKey = (key) => {
    return key.startsWith("sk-") && key.length > 20;
  };
  