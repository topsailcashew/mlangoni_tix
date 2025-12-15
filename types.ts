export enum EventCategory {
  CONCERT = 'Concert',
  WORKSHOP = 'Workshop',
  CONFERENCE = 'Conference',
  THEATER = 'Theater'
}

export type UserRole = 'user' | 'manager' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Event {
  id: string;
  organizerId: string; // New field to link event to specific manager
  title: string;
  category: EventCategory;
  date: string;
  price: number;
  location: string;
  image: string;
  description: string;
  longDescription: string;
}

export interface Ticket {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  holderName: string;
  holderEmail: string;
  qrCodeUrl: string;
  purchaseDate: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}