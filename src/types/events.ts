
export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  createdBy: {
    id: string;
    name: string;
  };
  image?: string;
  capacity?: number;
  attendees: {
    id: string;
    name: string;
    avatar?: string;
    rsvpStatus: 'attending' | 'maybe' | 'not-attending';
  }[];
}
