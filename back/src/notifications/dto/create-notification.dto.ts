import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  message: string;
  @IsBoolean()
  isViewed: boolean;
  @IsString()
  userId: string;
  @IsNumber()
  chatId?: number;
}
