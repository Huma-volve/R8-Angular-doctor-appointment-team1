export interface Chat {
  id: number;
  conversation_id: number;
  sender_id: number;
  sender_name: string;
  sender_avatar: string | null;
  body: string;
  type: 'text' | 'image' | 'file' | 'audio' | 'video';
  created_at: string; // ISO Date String
}
