import { Component, inject, OnInit } from '@angular/core';
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
export class Chat implements OnInit{
  conversationId:number = 0
  selectedFile: File | null = null;
  imagePhoto:any
  private readonly chatService = inject(Chats);
  ngOnInit(): void {
    this.chatService.selectedChatId$.subscribe(converstionId => {
    if (converstionId) {
        this.conversationId = converstionId
        console.log('id from layout' , converstionId)
    }
  });
  }

  chat: Chat[] = [];
  send(data: any) {
    var formData = new FormData();
  
    if(data) {
      formData.append('body', data);
    }
    
    if(this.selectedFile) {
      formData.append('attachment', this.selectedFile);
      this.imagePhoto = this.selectedFile
    }
    console.log(this.selectedFile)
    this.chatService.sendMessage(this.conversationId, formData).subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.chatService.appendMessage(res.data);
        this.selectedFile = null;
       },
      error: (err) => {
        console.log(err);
      },
    });
  }


onFileSelected(event: any) {
  this.selectedFile = event.target.files[0] ?? null;
  console.log(this.selectedFile)
}


}
