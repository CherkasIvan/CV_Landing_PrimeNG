export interface IAuthState {
  isAuthenticated: boolean;
  isAnonymous: boolean;
  email: string | null;
  uid: string | null;
}
