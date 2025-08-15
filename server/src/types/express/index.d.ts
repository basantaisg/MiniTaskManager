import { User } from '../../users/user.entity';

declare global {
  namespace Express {
    export interface Request {
      user?: User | any; // any if you don't want strict typing
    }
  }
}
