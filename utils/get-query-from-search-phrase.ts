const tsquerySpecialChars = /[()|&:*!]/g;

export const getQueryFromSearchPhrase = (searchPhrase: string) =>
  searchPhrase
    .replace(tsquerySpecialChars, " ")
    .trim()
    .split(/\s+/)
    .join(" | ");