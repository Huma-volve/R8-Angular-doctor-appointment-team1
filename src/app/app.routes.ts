import { Chat } from './features/chat/pages/chat-layout/chat';
import { ContactUs } from './features/contact-us/contact-us';
import { Routes } from '@angular/router';




export const routes: Routes = [
  {
    path: 'chat',
    component: Chat
  },
  {
    path: 'contactUs',
    component: ContactUs,
  },
];
