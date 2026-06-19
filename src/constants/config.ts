export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

/** ตรงกับโจทย์ take-home และ `PAGINATION.DEFAULT_LIMIT` ฝั่ง backend */
export const BLOG_PAGE_SIZE = 10;

export const ADMIN_COMMENT_MODERATION_EVENT = "admin-comment-moderation";

export const AUTH_SESSION_EXPIRED_EVENT = "auth-session-expired";
