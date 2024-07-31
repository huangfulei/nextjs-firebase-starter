import type { UserInfo } from "firebase/auth";
import type { Claims } from "next-firebase-auth-edge/lib/auth/claims";

export interface User extends UserInfo {
  idToken: string;
  customToken: string;
  emailVerified: boolean;
  customClaims: Claims;
}
