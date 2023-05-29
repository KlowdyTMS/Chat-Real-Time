import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';
import { UserPayload } from 'src/auth/models/UserPayload';
import { ChatService } from './chat.service';
import { NotificationsService } from 'src/notifications/notifications.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('ChatGateway');
  private connectedClients: Set<string> = new Set();

  constructor(
    private readonly chatService: ChatService,
    private readonly notifications: NotificationsService,
  ) {}

  @SubscribeMessage('chat')
  async handleMessage(client: Socket, payload: any): Promise<void> {
    const date = new Date();
    const data = { ...payload, date, userId: client.data.id };

    if (!this.connectedClients.has(client.data.id)) {
      await this.notifications.create({
        ...payload,
        isViewed: false,
        userId: client.data.id,
      });
    }
    await this.chatService.create(data);
    this.server.emit('chat', { ...payload, name: client.data.name });
  }

  async handleConnection(client: Socket) {
    const token = client.handshake.auth.token;
    try {
      const { name, sub } = verify(
        token,
        process.env.JWT_SECRET,
      ) as UserPayload;

      client.data.id = sub;
      client.data.name = name;
    } catch (error) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.connectedClients.delete(client.data.id);
    this.logger.log(`Client disconnected: ${client.data.id}`);
  }
}
