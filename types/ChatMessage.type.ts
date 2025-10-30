export interface ChatBadge {
  type: string;
  text: string;
  count: number;
}

export interface SenderIdentity {
  color: string;
  badges: ChatBadge[];
}

export interface Sender {
  id: number;
  username: string;
  slug: string;
  identity: SenderIdentity;
}

export interface MessageMetadata {
  message_ref: string;
}

export interface ChatMessage {
  id: string;
  chatroom_id: number;
  content: string;
  type: string;
  created_at: string;
  sender: Sender;
  metadata: MessageMetadata;
}

export interface PusherChatEvent {
  event: string;
  data: string; // JSON string olarak geliyor
  channel: string;
}
