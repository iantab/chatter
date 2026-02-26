import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
import { Inject, UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { CreateMessageInput } from './dto/create-message.input';
import { CurrentUser } from '../../auth/current-user.decorator';
import { TokenPayload } from '../../auth/token-payload.inferface';
import { GetMessagesArgs } from './dto/get-messages.args';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(
    private readonly messagesService: MessagesService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) { }

  @Mutation(() => Message)
  @UseGuards(GqlAuthGuard)
  async createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
    @CurrentUser() user: TokenPayload,
  ) {
    const message = await this.messagesService.createMessage(
      createMessageInput,
      user._id,
    );
    this.pubSub.publish('messageAdded', {
      messageAdded: message,
      chatId: createMessageInput.chatId,
    });
    return message;
  }

  @Query(() => [Message], { name: 'messages' })
  @UseGuards(GqlAuthGuard)
  async getMessages(
    @Args() getMessageArgs: GetMessagesArgs,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.messagesService.getMessages(getMessageArgs, user._id);
  }
  @Subscription(() => Message, {
    filter: (payload, variables) => {
      return payload.chatId === variables.chatId;
    },
  })
  messageAdded(@Args('chatId') chatId: string) {
    return this.pubSub.asyncIterableIterator('messageAdded');
  }
}
