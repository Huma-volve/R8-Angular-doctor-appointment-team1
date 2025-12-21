import { Component, inject, OnInit } from '@angular/core';
import { Chats } from '../../service/chats';
import { Chat } from '../../models/chat';
@Component({
  selector: 'app-body-chat',
  imports: [],
  templateUrl: './body-chat.html',
  styleUrl: './body-chat.scss',
})
export class BodyChat implements OnInit {
  private readonly chatService = inject(Chats);
  chatId:any
  chat: Chat[] = [];
  ngOnInit(): void {
    this.chatService.messages$.subscribe((data) => {
      this.chat = data;
    });
    
    this.getChat();
    this.chatService.selectedChatId$.subscribe(converstionId => {
    if (converstionId) {
        this.chatId = converstionId
        console.log('id from body' , converstionId)
        this.getChat()
    }
  });
  }

  getChat() {
    this.chatService.getCahtHistory(this.chatId).subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.chat = res.data.sort((a: any, b: any) => a.id - b.id);
        this.chatService.setMessages(this.chat);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
