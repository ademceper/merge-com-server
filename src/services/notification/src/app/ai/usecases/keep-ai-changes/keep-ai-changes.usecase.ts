import { Injectable, NotFoundException } from '@nestjs/common';
import { PinoLogger } from 'libs/application-generic';
import { AiChatRepository } from 'libs/dal';
import { KeepAiChangesCommand } from './keep-ai-changes.command';

@Injectable()
export class KeepAiChangesUseCase {
  constructor(
    private readonly logger: PinoLogger,
    private readonly aiChatRepository: AiChatRepository
  ) {}

  async execute(command: KeepAiChangesCommand): Promise<void> {
    const chat = await this.aiChatRepository.findOne({
      _id: command.chatId,
      _environmentId: command.user.environmentId,
      _organizationId: command.user.organizationId,
      _userId: command.user._id,
    });
    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    await this.aiChatRepository.updateOne(
      {
        _id: command.chatId,
        _environmentId: command.user.environmentId,
        _organizationId: command.user.organizationId,
        _userId: command.user._id,
      },
      { $set: { hasPendingChanges: false } }
    );

    this.logger.info({ chatId: command.chatId }, 'AI changes kept');
  }
}
