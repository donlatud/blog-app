export const EXCERPT_MAX = 500;

export function validateExcerpt(excerpt: string): string | null {
  if (excerpt.trim().length > EXCERPT_MAX) {
    return `Excerpt must be at most ${EXCERPT_MAX} characters.`;
  }

  return null;
}
