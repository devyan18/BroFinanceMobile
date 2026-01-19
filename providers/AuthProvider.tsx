import { create } from "zustand";

type UserInfo = {
  id: string;
  username: string;
  avatarUrl: string;
  email: string;
  provider: "local" | "google" | "github";
  balance: number;
};

type AuthUser = {
  user: UserInfo | null;
  signIn: (user: UserInfo) => void;
  signOut: () => void;
};

const useAuth = create<AuthUser>()((set) => ({
  user: null,
  signIn: (user) => {
    set({ user });
  },
  signOut: () => {
    set({ user: null });
  },
}));

export { useAuth };
