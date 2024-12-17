import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { Payload } from '../interfaces/payload.interface';
import { Tokens } from '../interfaces/tokens.interface';
import { IUserSession } from 'src/utils/interfaces/auth/user.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // LOGIN AUTH //

  private getExpirationInSeconds(expiresIn: string): number {
    const expiresInInSeconds = parseInt(expiresIn, 10) * 60;

    return expiresInInSeconds;
  }

  private async generateTokens(user: Partial<IUserSession>): Promise<Tokens> {
    const jwtUserPayload: Payload = {
      sub: user.id,
      name: user.name,
      principal_email: user.principal_email,
      user_id_type: user.user_id_type,
      id_number: user.id_number,
      role: user.role,
      permissions: user.permissions,
    };

    const [accessToken, refreshToken, accessTokenExpiresIn] = await Promise.all(
      [
        await this.jwtService.signAsync(jwtUserPayload, {
          secret: process.env.JWT_CONSTANTS_SECRET,
          expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        }),

        await this.jwtService.signAsync(jwtUserPayload, {
          secret: process.env.JWT_CONSTANTS_SECRET,
          expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
        }),

        await this.getExpirationInSeconds(process.env.ACCESS_TOKEN_EXPIRES_IN),
      ],
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      access_token_expires_in: accessTokenExpiresIn,
    };
  }

  async refreshToken(refreshToken: string): Promise<any> {
    try {
      const user: Partial<IUserSession> = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_CONSTANTS_SECRET,
      });

      const payload: Payload = {
        sub: user.id,
        name: user.name,
        principal_email: user.principal_email,
        user_id_type: user.user_id_type,
        id_number: user.id_number,
        role: user.role,
        permissions: user.permissions,
      };

      const { access_token, refresh_token, access_token_expires_in } =
        await this.generateTokens(payload);

      return {
        access_token,
        refresh_token,
        access_token_expires_in,
        status: HttpStatus.CREATED,
        message: '¡Refresh Token Successfully!',
      };
    } catch (error) {
      throw new UnauthorizedException(`¡Refresh Token Failed!`);
    }
  }
}
