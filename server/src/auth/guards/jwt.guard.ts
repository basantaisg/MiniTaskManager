import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
const jwt = require('jsonwebtoken');

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.cookies['jwt'];
    if (!token) throw new UnauthorizedException('No token!');
    try {
      const decoded = jwt.verify(token, 'JWT_SECRET');
      req.user = decoded;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token!');
    }
  }
}
