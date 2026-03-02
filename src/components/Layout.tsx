import { useState } from "react";
import { SharedProvider } from "./SharedContext";
import { Link, Outlet, useLocation } from "react-router";
import { Toaster } from "sonner@2.0.3";
import Frame35 from "../imports/Frame35";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Briefcase, 
  UserCheck, 
  Calendar,
  FileSearch,
  User,
  Settings as SettingsIcon,
  Search,
  Bell,
  Menu,
  X
} from "lucide-react";

export function Layout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { path: "/", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/report", icon: FileText, label: "Report" },
    { path: "/employees", icon: Users, label: "Employees" },
    { path: "/job-posting", icon: Briefcase, label: "Job Posting" },
    { path: "/candidate", icon: UserCheck, label: "Candidate" },
    { path: "/calendar", icon: Calendar, label: "Calendar" },
    { path: "/resume-parsing", icon: FileSearch, label: "Resume Parsing" },
    { path: "/profile", icon: User, label: "Profile" },
    { path: "/settings", icon: SettingsIcon, label: "Setting" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <SharedProvider>
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 bg-card border-r border-border transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center px-6 border-b border-border">
            <Frame35 />
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 border-b border-border px-6 py-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-primary" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-foreground truncate">Michael</div>
              <div className="text-xs text-muted-foreground truncate">HR Manager</div>
            </div>
            <button className="text-muted-foreground hover:text-foreground">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="8" cy="3" r="1.5" />
                <circle cx="8" cy="8" r="1.5" />
                <circle cx="8" cy="13" r="1.5" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                        active
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Navbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-card px-4 lg:px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-foreground lg:hidden"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-lg border border-input bg-input-background pl-9 pr-4 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          {/* Right side - empty space and notification */}
          <div className="flex-1"></div>
          
          {/* Notification */}
          <button className="relative rounded-full p-2 hover:bg-accent">
            <Bell className="h-5 w-5 text-foreground" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
          </button>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
    <Toaster position="top-right" richColors />
    </SharedProvider>
  );
}