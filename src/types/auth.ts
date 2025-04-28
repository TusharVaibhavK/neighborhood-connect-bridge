
export type UserRole = 'resident' | 'leader' | 'service-provider' | 'guest';

export type LeaderRole = 'president' | 'treasurer' | 'event-coordinator' | 'committee-member';

export type ServiceCategory = 'plumber' | 'electrician' | 'gardener' | 'cleaner' | 'handyman' | 'other';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  leaderRoles?: LeaderRole[];
  serviceCategories?: ServiceCategory[];
  avatar?: string;
  verified: boolean;
  joinedAt: Date;
}
