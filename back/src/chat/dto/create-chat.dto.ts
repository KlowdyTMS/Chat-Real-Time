import { IsDate, IsString } from 'class-validator';

export class CreateChatDto {
  @IsString()
  message: string;
  @IsDate()
  date: Date;
  @IsString()
  userId: string;
}
