import { ApiProperty } from '@nestjs/swagger';

export class JwtTokensDto {
  constructor({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
