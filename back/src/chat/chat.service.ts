import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createChatDto: CreateChatDto) {
    const { message, date, userId } = createChatDto;

    await this.prisma.chat.create({
      data: {
        message,
        date,
        user: { connect: { id: userId } },
      },
    });
  }

  async findAll() {
    const messages = await this.prisma.chat.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    return messages.flat();
  }
}
