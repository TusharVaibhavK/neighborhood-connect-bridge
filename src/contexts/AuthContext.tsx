
import React, { createContext, useContext, useState, ReactNode } from "react";
import { User, UserRole, LeaderRole, ServiceCategory } from "../types/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  isLeaderWithRole: (leaderRole: LeaderRole) => boolean;
  isServiceProviderWithCategory: (category: ServiceCategory) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const mockUsers: User[] = [
  {
    id: "user1",
    email: "resident@example.com",
    name: "Alex Resident",
    role: "resident",
    verified: true,
    joinedAt: new Date("2023-01-15"),
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
  },
  {
    id: "user2",
    email: "leader@example.com",
    name: "Jordan Leader",
    role: "leader",
    leaderRoles: ["president", "treasurer"],
    verified: true,
    joinedAt: new Date("2022-11-05"),
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan"
  },
  {
    id: "user3",
    email: "provider@example.com",
    name: "Casey Provider",
    role: "service-provider",
    serviceCategories: ["plumber", "handyman"],
    verified: true,
    joinedAt: new Date("2023-03-22"),
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Casey"
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (foundUser) {
        console.log("User logged in:", foundUser);
        setUser(foundUser);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      const newUser: User = {
        id: `user${mockUsers.length + 1}`,
        email,
        name,
        role,
        verified: false, // Would require verification in real app
        joinedAt: new Date(),
      };
      
      console.log("User signed up:", newUser);
      setUser(newUser);
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const hasPermission = (permission: string) => {
    if (!user) return false;

    // Simple permission check based on role
    // In a real app, this would be more sophisticated
    const rolePermissions = {
      resident: ["view-tickets", "create-ticket", "view-events", "rsvp-events", "view-providers"],
      leader: ["view-tickets", "create-ticket", "assign-tickets", "view-events", "create-events", "manage-users", "view-providers"],
      "service-provider": ["view-assigned-tickets", "update-tickets", "view-bookings", "manage-availability"]
    };

    const userPermissions = rolePermissions[user.role] || [];
    return userPermissions.includes(permission);
  };

  const isLeaderWithRole = (leaderRole: LeaderRole) => {
    if (!user || user.role !== 'leader') return false;
    return user.leaderRoles?.includes(leaderRole) || false;
  };

  const isServiceProviderWithCategory = (category: ServiceCategory) => {
    if (!user || user.role !== 'service-provider') return false;
    return user.serviceCategories?.includes(category) || false;
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    hasPermission,
    isLeaderWithRole,
    isServiceProviderWithCategory
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
