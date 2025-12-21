import { SlicePipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Chats } from '../../service/chats';

@Component({
  selector: 'app-chat-list',
  imports: [RouterModule, SlicePipe, DatePipe, FormsModule],
  templateUrl: './chat-list.html',
  styleUrl: './chat-list.scss',
})
export class ChatList {
CoversationsList :any[] = []
searchWord:string =''
isFavourite: boolean = false
isArchived: boolean = false
chatTitle = ""
mode:string = ''
constructor(private _Chat:Chats) { }

  ngOnInit(): void {
    this.getAllConversations()
  }

getAllConversations(){
  this._Chat.GettAllConversation().subscribe({
    next:(res)=>{console.log(res)
    console.log(res.data[0]?.last_message?.body,
     this.CoversationsList= res.data,
     this.chatTitle = 'Chats'
    )

    },
    error:(err)=>{console.log(err)},
  });
  
}


OnSearch(searchWord:string){
  this._Chat.searchConversation(searchWord).subscribe({
    next:(res)=>{
      console.log(res)
      this.CoversationsList = res.data
    },
    error:(err)=>{console.log(err)}
  })
}

getFavouriteList(){
  this._Chat.getFavouriteChats().subscribe({
    next:(res)=>{
      console.log(res)
      this.CoversationsList = res.data
       this.chatTitle = 'Favourites'
    },
    error:(err)=>{console.log(err)}
  })
}

getArchiveList(){
  this._Chat.getArchiveChats().subscribe({
    next:(res)=>{
      this.CoversationsList = res.data
      this.chatTitle = 'Archive'
    },
    error:(err)=>{console.log(err)},
  })
}

toggleFavourite(id:any , IsFavourite:boolean){
  this._Chat.toggleFavourite(id).subscribe({
     next:(res)=>{
      if(!IsFavourite && this.chatTitle == 'Chats'){
        this.getAllConversations()
      }
      if(IsFavourite && this.chatTitle == 'Chats'){
        this.getAllConversations()
      }
      else if (IsFavourite && this.chatTitle == 'Archive'){
        this.getArchiveList()
      }
      else if (!IsFavourite && this.chatTitle == 'Archive'){
        this.getArchiveList()
      }
      else if(IsFavourite && this.chatTitle == 'Favourites'){
          this.getFavouriteList()
      }
    },
    error:(err)=>{console.log(err)}
  })
}

toggleArchive(id:any , IsArchive:boolean){
  this._Chat.toggleArchive(id).subscribe({
     next:(res)=>{
     console.log(res)
    console.log(IsArchive)
    if(!IsArchive && this.chatTitle == 'Chats'){
     this.getAllConversations()
    }
    else if(IsArchive && this.chatTitle == 'favourite'){
      this.getFavouriteList
    }
    else if(!IsArchive && this.chatTitle == 'favourite'){
      this.getFavouriteList
    }
    else if(IsArchive && this.chatTitle == 'Archive' ){
     this.getArchiveList()
    }

    },
    error:(err)=>{console.log(err)} 
  })
}

MarkAsRead(chatId:any){
  this._Chat.MarkAsRead(chatId).subscribe({
    next:(res)=>{console.log(res)},
    error:(err)=>{console.log(err)},
  })
}


selectChat(chatId: number) {
  this._Chat.selectedChatId$.next(chatId);
  console.log(chatId)
}
}
