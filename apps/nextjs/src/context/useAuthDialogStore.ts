import { create } from "zustand";

interface AuthStore {
  isAuthDialogOpen: boolean;
  toggleAuthDialog: (isOpen: boolean) => void;
}

export const useAuthDialogStore = create<AuthStore>((set, get) => ({
  isAuthDialogOpen: false,
  toggleAuthDialog: (isOpen: boolean) => {
    set({ isAuthDialogOpen: isOpen });
  },
}));
