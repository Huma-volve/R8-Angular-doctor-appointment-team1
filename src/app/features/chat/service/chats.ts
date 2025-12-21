import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Chats {
  constructor(private _HttpClient: HttpClient) {}
  private readonly httpClient = inject(HttpClient);

  private messagesSubject = new BehaviorSubject<any[]>([]);
  selectedChatId$ = new BehaviorSubject<number | null>(null);
  messages$ = this.messagesSubject.asObservable();
  GettAllConversation(): Observable<any> {
    return this._HttpClient.get('conversations');
  }

  searchConversation(searchWord: string): Observable<any> {
    return this._HttpClient.get(`conversations?search=${searchWord}`);
  }

  getFavouriteChats(): Observable<any> {
    return this._HttpClient.get('conversations?type=favorites');
  }

  getArchiveChats(): Observable<any> {
    return this._HttpClient.get('conversations?type=archived');
  }

  MarkAsRead(consersationId: any): Observable<any> {
    return this._HttpClient.post(`conversations/${consersationId}/mark-read`, {});
  }

  toggleFavourite(id: any): Observable<any> {
    return this._HttpClient.patch(`conversations/${id}/favorite`, {});
  }
  toggleArchive(id: any): Observable<any> {
    return this._HttpClient.patch(`conversations/${id}/archive`, {});
  }

   // Update messages
  setMessages(messages: any[]) {
    this.messagesSubject.next(messages);
  }

  appendMessage(message: any) {
    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, message]);
  }
  getCahtHistory(id: string) {
    return this._HttpClient.get(`conversations/${id}`);
  }
  sendMessage(id: string, data: any) {
    return this._HttpClient.post(`conversations/${id}/messages`, data);
  }
}
