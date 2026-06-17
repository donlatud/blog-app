export type UserProfile = {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string | null;
  role: "member" | "admin";
  createdAt: string;
};

export type AuthUser = UserProfile;
