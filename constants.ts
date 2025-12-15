import { Event, EventCategory } from './types';

export const EVENTS: Event[] = [
  {
    id: '1',
    organizerId: 'manager1',
    title: 'THE SUMMER FORMAL CONCERT',
    category: EventCategory.CONCERT,
    date: '20.06.2023',
    price: 127.99,
    location: 'Central Park Arena, NY',
    image: 'https://picsum.photos/600/600?random=1',
    description: 'Experience the best classical and modern fusion in an open-air setting.',
    longDescription: 'The Summer Formal Concert is an annual gala featuring the New York Philharmonic Orchestra joined by contemporary pop artists. Dress code is semi-formal. Gates open at 5 PM. No outside food allowed. The event will end with a fireworks display.'
  },
  {
    id: '2',
    organizerId: 'manager1',
    title: 'DESIGN THINKING WORKSHOP',
    category: EventCategory.WORKSHOP,
    date: '27.06.2023',
    price: 85.00,
    location: 'Design Society, Copenhagen',
    image: 'https://picsum.photos/600/600?random=2',
    description: 'A two-day workshop that teaches participants how to use design thinking.',
    longDescription: 'Led by industry experts from top Scandinavian design firms, this workshop covers empathy mapping, prototyping, and user testing. Laptop required. Lunch is provided. Ideal for product managers and UX designers.'
  },
  {
    id: '3',
    organizerId: 'manager2',
    title: 'FUTURE TECH SUMMIT',
    category: EventCategory.CONFERENCE,
    date: '15.08.2023',
    price: 299.00,
    location: 'Convention Center, San Francisco',
    image: 'https://picsum.photos/600/600?random=3',
    description: 'Explore the boundaries of AI, VR, and Quantum Computing.',
    longDescription: 'The Future Tech Summit brings together visionaries from Silicon Valley. Keynote speakers include CEOs of major tech companies. Networking sessions available for VIP ticket holders. Topics include Generative AI, Sustainable Tech, and Space Exploration.'
  },
  {
    id: '4',
    organizerId: 'manager1',
    title: 'MIDNIGHT JAZZ CAFE',
    category: EventCategory.CONCERT,
    date: '02.07.2023',
    price: 45.50,
    location: 'The Blue Note, Chicago',
    image: 'https://picsum.photos/600/600?random=4',
    description: 'Smooth jazz, dimmed lights, and signature cocktails.',
    longDescription: 'An intimate evening with the Chicago Jazz Quartet. 21+ only. Two drink minimum. The venue is historic, known for hosting legends since 1950. Casual elegance attire recommended.'
  }
];