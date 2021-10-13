export const trimSentenceAtLen = (str: string, len: number): string => {
  if (str.length > len) {
    return str.substring(0, len).concat('...');
  }
  return str;
};
