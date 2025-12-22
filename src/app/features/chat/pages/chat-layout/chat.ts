import { Component, inject } from '@angular/core';
import { TitleChat } from '../title-chat/title-chat';
import { BodyChat } from '../body-chat/body-chat';
import { ChatList } from '../chat-list/chat-list';
import { Chats } from '../../service/chats';

@Component({
  selector: 'app-chat',
  imports: [ChatList, TitleChat, BodyChat],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class Chat {
  private readonly chatService = inject(Chats);
  chat: Chat[] = [];
  send(data: string) {
    if (!data || data.trim() === '') return;
    const messageBody = {
      body: data,
    };
    this.chatService.sendMessage('29', messageBody).subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.chatService.appendMessage(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
