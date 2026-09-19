import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { SessionAuthGuard } from './guards/session-auth.guard';

@Injectable()
export class JwtAuthGuard extends SessionAuthGuard {}
