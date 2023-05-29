import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createNotificationDto: CreateNotificationDto) {
    const data = createNotificationDto;

    await this.prisma.notification.create({
      data,
    });
  }

  async findAll() {
    const messages = await this.prisma.notification.findMany();
    return messages.flat();
  }
}
