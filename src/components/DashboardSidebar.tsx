"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_NAME, DASHBOARD_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  FileText,
  Image,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const iconMap = {
  LayoutDashboard,
  Users,
  GraduationCap,
  FileText,
  Image,
  Settings,
};

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white w-64">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <Link href="/dashboard/overview">
          <h2 className="text-xl font-bold">{APP_NAME}</h2>
          <p className="text-sm text-gray-400">Admin Dashboard</p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {DASHBOARD_LINKS.map((link) => {
          const Icon = iconMap[link.icon as keyof typeof iconMap];
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              )}
            >
              <Icon size={20} />
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
        >
          <LogOut size={20} className="mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
}
