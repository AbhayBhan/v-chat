interface messageSendUser {
  senderId: string;
  text: string;
}

export interface ServerToClientEvents {
  getMessage: (res: messageSendUser) => void;
}

export interface ClientToServerEvents {
  addUser: (userId: string) => void;
  sendMessage: (senderId: string, receiverId: string|number|undefined, text: string) => void;
  disconnect: () => void;
}
