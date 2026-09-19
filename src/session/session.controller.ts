import { Controller, Get, Delete, Param, Post, Req, Query, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SessionService } from './session.service';

@ApiTags('User Session Management')
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('active')
  @ApiOperation({ summary: 'Get all currently active user sessions' })
  async getActiveSessions(@Query('userId') userId?: string) {
    const sessions = await this.sessionService.getActiveSessions(userId);
    return {
      success: true,
      count: sessions.length,
      data: sessions,
    };
  }

  @Get('all')
  @ApiOperation({ summary: 'Get session audit history' })
  async getAllSessions() {
    const sessions = await this.sessionService.getAllSessions();
    return {
      success: true,
      count: sessions.length,
      data: sessions,
    };
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get session analytics (active, expired, revoked count)' })
  async getSessionStats() {
    const stats = await this.sessionService.getSessionStats();
    return {
      success: true,
      data: stats,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Force revoke a specific user session' })
  async revokeSession(@Param('id') id: string, @Body() body: { reason?: string }) {
    const revoked = await this.sessionService.revokeSession(id, body?.reason || 'ADMIN_MANUAL_REVOCATION');
    return {
      success: true,
      message: 'Session successfully revoked.',
      data: revoked,
    };
  }

  @Post('revoke-others')
  @ApiOperation({ summary: 'Revoke all other sessions for a user' })
  async revokeOthers(@Body() body: { userId: string; currentToken: string }) {
    const result = await this.sessionService.revokeOtherSessions(body.userId, body.currentToken);
    return {
      success: true,
      message: `Revoked ${result.count} other active sessions.`,
      count: result.count,
    };
  }

  @Post('revoke-all')
  @ApiOperation({ summary: 'Revoke all sessions for a user (force logout)' })
  async revokeAll(@Body() body: { userId: string; reason?: string }) {
    const result = await this.sessionService.revokeAllUserSessions(body.userId, body.reason);
    return {
      success: true,
      message: `Revoked ${result.count} sessions for user.`,
      count: result.count,
    };
  }
}
