import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchChatList'
})
export class SearchChatListPipe implements PipeTransform {

  transform(chatList: any[], searchWord: string): any[] {

   return chatList.filter((chat) => chat.other_user.name.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase()));
  }

}
