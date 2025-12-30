import { Component, inject } from '@angular/core';
import { Chats } from '../../service/chats';

@Component({
  selector: 'app-title-chat',
  imports: [],
  templateUrl: './title-chat.html',
  styleUrl: './title-chat.scss',
})
export class TitleChat {

  private readonly chats = inject(Chats);
  nameDoctor: string = '';
  chatId: any = '';
  ngOnInit(): void {
    this.chats.selectedChatId$.subscribe((converstionId) => {
      if (converstionId) {
        this.chatId = converstionId;
        console.log('id from body', converstionId);
        this.getNameDoctor();
      }
    });
  }
  getNameDoctor() {
    this.chats.getCahtHistory(this.chatId).subscribe({
      next: (res: any) => {
        console.log(res.other_user);
        this.nameDoctor = res.other_user.name;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  
}
