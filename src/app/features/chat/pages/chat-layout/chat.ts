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
export class Chat implements OnInit {
  private readonly chats = inject(Chats);
  chat: Chat[] = [];
  mediaRecorder: any;
  audioChunks: any[] = [];
  isRecording = false;
  chatId: any = '';
  isMobileChatActive = false;

  ngOnInit(): void {
    this.chats.selectedChatId$.subscribe((converstionId) => {
      if (converstionId) {
        this.chatId = converstionId;
        this.isMobileChatActive = true; // لما نختار شات، فعل وضع الـ body
        console.log('id from body', converstionId);
      }
    });
  }
  send(data: string) {
    if (!data || data.trim() === '') return;

    const formData = new FormData();
    formData.append('body', data);

    this.uploadMessage(formData);
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    // فحص نوع الملف قبل الإرسال
    const allowedTypes = ['image', 'audio', 'video'];
    const fileType = file.type.split('/')[0]; // بيجيب اول كلمة زي image/png -> image

    if (!allowedTypes.includes(fileType)) {
      alert('عفواً، السيرفر يقبل الصور والفيديوهات والتسجيلات الصوتية فقط');
      return;
    }

    const formData = new FormData();
    formData.append('attachment', file);
    formData.append('body', '');

    this.uploadMessage(formData);
    input.value = '';
  }

  private uploadMessage(formData: FormData) {
    console.log('🚀 جاري إرسال الـ Request للـ API...');

    this.chats.sendMessage(this.chatId, formData).subscribe({
      next: (res: any) => {
        console.log('✔ رد السيرفر:', res);
        if (res && res.data) {
          this.chats.appendMessage(res.data);
        }
      },
      error: (err) => {
        console.error('❌ فشل الإرسال:', err);
      },
    });
  }

  // ===> voice message recording logic <===
  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event: any) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        const audioFile = new File([audioBlob], 'voice-message.wav', { type: 'audio/wav' });

        const formData = new FormData();
        formData.append('attachment', audioFile);
        formData.append('body', '');

        console.log('✅ تم تجهيز تسجيل الصوت للإرسال');
        this.uploadMessage(formData);
      };

      this.mediaRecorder.start();
      this.isRecording = true;
    } catch (err) {
      console.error('❌ لم يتم الوصول للمايك:', err);
      alert('برجاء السماح بالوصول للمايك');
    }
  }

  // ==> stop voice message recording logic <===
  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;
      this.mediaRecorder.stream.getTracks().forEach((track: any) => track.stop());
    }
  }

  backToList() {
    this.isMobileChatActive = false; // لما ندوس رجوع، نرجع للـ list
  }
}