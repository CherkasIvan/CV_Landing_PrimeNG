import { User } from 'firebase/auth';

export interface IAuthResponse {
  user: User | null;
  error: string | null;
}
