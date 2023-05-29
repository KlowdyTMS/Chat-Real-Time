import { IsString } from 'class-validator';

export class LoginRequestBody {
  @IsString()
  name: string;

  @IsString()
  password: string;
}
