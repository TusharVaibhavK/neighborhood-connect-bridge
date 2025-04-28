
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  Home, 
  TicketIcon, 
  Calendar, 
  Users, 
  Settings, 
  UserCog
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const { user } = useAuth();

  // Define navigation items based on user role
  const getNavItems = () => {
    const items = [
      { label: "Home", icon: Home, href: "/" }
    ];

    if (!user) {
      return items;
    }

    // Items for all authenticated users
    items.push({ label: "Service Tickets", icon: TicketIcon, href: "/tickets" });
    items.push({ label: "Events", icon: Calendar, href: "/events" });

    // Role-specific items
    if (user.role === "leader") {
      items.push({ label: "Manage Users", icon: Users, href: "/users" });
      items.push({ label: "Settings", icon: Settings, href: "/settings" });
    } else if (user.role === "service-provider") {
      items.push({ label: "My Schedule", icon: Calendar, href: "/schedule" });
      items.push({ label: "Service Settings", icon: Settings, href: "/service-settings" });
    } else if (user.role === "resident") {
      items.push({ label: "Service Providers", icon: UserCog, href: "/providers" });
    }

    return items;
  };

  const navItems = getNavItems();

  return (
    <div
      className={`fixed inset-y-0 left-0 z-20 flex h-full flex-col bg-sidebar border-r shadow-sm transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      } md:relative`}
    >
      {/* Sidebar Header */}
      <div className="flex h-16 items-center border-b px-4">
        {isOpen ? (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
              CC
            </div>
            <span className="text-lg font-semibold">Community Connect</span>
          </div>
        ) : (
          <div className="flex h-8 w-8 mx-auto items-center justify-center rounded-lg bg-primary text-white">
            CC
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="absolute -right-4 top-5 hidden h-8 w-8 rounded-full border shadow-sm md:flex"
      >
        <ChevronLeft
          className={`h-4 w-4 transition-transform ${
            !isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      {/* User Info (if logged in and sidebar is open) */}
      {user && isOpen && (
        <div className="flex flex-col items-center gap-1 border-b py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="h-10 w-10 rounded-full" 
              />
            ) : (
              <span className="text-lg font-medium text-primary">
                {user.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground capitalize">{user.role.replace('-', ' ')}</span>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.href}
                className="flex h-10 items-center gap-3 rounded-md px-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <item.icon className={`h-5 w-5 ${isOpen ? "" : "mx-auto"}`} />
                {isOpen && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="border-t p-4">
        {isOpen ? (
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium">Community Connect</span>
            <span className="text-xs text-muted-foreground">v1.0.0</span>
          </div>
        ) : (
          <div className="text-center">
            <span className="text-xs font-medium">v1.0</span>
          </div>
        )}
      </div>
    </div>
  );
}
