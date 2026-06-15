import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Aquí puedes implementar tu lógica de autenticación
    // Por ejemplo, verificar un token JWT en los headers de la solicitud
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    const token = this.tokenExtractor(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      request.user = { token }; // Aquí podrías decodificar el token y asignar el usuario a request.user
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }
  tokenExtractor(request: any): string | undefined {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return type === 'Bearer' ? token : undefined;
}
}
