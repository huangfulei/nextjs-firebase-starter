import type { UserInfo } from "firebase/auth";
import type { Claims } from "next-firebase-auth-edge/lib/auth/claims";
import { create } from "zustand";

export interface User extends UserInfo {
  emailVerified: boolean;
  customClaims: Claims;
}

interface AuthStore {
  user?: User;
  setUser: (user?: User) => void;
  isAuthDialogOpen: boolean;
  toggleAuthDialog: (isOpen: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: undefined,
  setUser: (user?: User) => {
    set({ user });
  },
  isAuthDialogOpen: false,
  toggleAuthDialog: (isOpen: boolean) => {
    set({ isAuthDialogOpen: isOpen });
  },
}));
