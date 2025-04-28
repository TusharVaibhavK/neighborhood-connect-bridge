
export type TicketStatus = 'pending' | 'assigned' | 'in-progress' | 'completed' | 'cancelled';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketCategory = 'water' | 'electricity' | 'plumbing' | 'road' | 'garbage' | 'security' | 'other';

export interface Comment {
  id: string;
  ticketId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: Date;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: TicketCategory;
  status: TicketStatus;
  priority: TicketPriority;
  createdBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  assignedTo?: {
    id: string;
    name: string;
    avatar?: string;
  };
  location?: string;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
  attachments?: string[];
}
