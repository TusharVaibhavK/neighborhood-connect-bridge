
import React, { createContext, useContext, useState, useEffect } from "react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { User, UserRole, LeaderRole, ServiceCategory } from "../types/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
  isLeaderWithRole: (leaderRole: LeaderRole) => boolean;
  isServiceProviderWithCategory: (category: ServiceCategory) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user);
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await fetchUserProfile(session.user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*, leader_roles(role), service_categories(category)')
        .eq('id', supabaseUser.id)
        .single();

      if (error) throw error;

      if (profile) {
        const userData: User = {
          id: profile.id,
          email: supabaseUser.email!,
          name: profile.full_name,
          role: profile.role as UserRole,
          verified: profile.verified,
          joinedAt: new Date(profile.joined_at),
          avatar: profile.avatar,
          leaderRoles: profile.leader_roles?.map((lr: any) => lr.role),
          serviceCategories: profile.service_categories?.map((sc: any) => sc.category),
        };
        setUser(userData);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role: role,
          },
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const hasPermission = (permission: string) => {
    if (!user) return false;

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
