import { useState } from "react";
import { Camera, Mail, Phone, MapPin, Briefcase, Calendar, Shield, Key, Bell } from "lucide-react";

export function Profile() {
  const [activeTab, setActiveTab] = useState<"personal" | "security">("personal");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile Management</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your personal information and security settings
        </p>
      </div>

      {/* Profile Card */}
      <div className="rounded-2xl bg-card p-6 shadow-sm border border-border">
        <div className="flex flex-col items-center gap-4 pb-6 border-b border-border md:flex-row">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-purple-400 to-primary" />
            <button className="absolute bottom-0 right-0 rounded-full bg-primary p-2 text-white shadow-lg hover:bg-primary/90 transition-all">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-bold text-foreground">Michael Anderson</h2>
            <p className="text-sm text-muted-foreground">HR Manager</p>
            <div className="mt-2 flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                <Shield className="h-3 w-3" />
                Verified Account
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                Super Admin
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="rounded-xl border-2 border-input px-6 py-2 text-sm font-semibold text-foreground hover:bg-accent transition-all">
              Cancel
            </button>
            <button className="rounded-xl bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all">
              Save Changes
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 border-b border-border">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("personal")}
              className={`pb-3 text-sm font-semibold transition-all ${
                activeTab === "personal"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Personal Information
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`pb-3 text-sm font-semibold transition-all ${
                activeTab === "security"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Security Settings
            </button>
          </div>
        </div>

        {/* Personal Information Tab */}
        {activeTab === "personal" && (
          <div className="mt-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  First Name
                </label>
                <input
                  type="text"
                  defaultValue="Michael"
                  className="w-full rounded-lg border border-input bg-input-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Last Name
                </label>
                <input
                  type="text"
                  defaultValue="Anderson"
                  className="w-full rounded-lg border border-input bg-input-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Email Address
              </label>
              <input
                type="email"
                defaultValue="michael.anderson@company.com"
                className="w-full rounded-lg border border-input bg-input-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                Phone Number
              </label>
              <input
                type="tel"
                defaultValue="+1 (555) 123-4567"
                className="w-full rounded-lg border border-input bg-input-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                Location
              </label>
              <input
                type="text"
                defaultValue="New York, NY"
                className="w-full rounded-lg border border-input bg-input-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                Job Title
              </label>
              <input
                type="text"
                defaultValue="HR Manager"
                className="w-full rounded-lg border border-input bg-input-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Bio
              </label>
              <textarea
                rows={4}
                defaultValue="Experienced HR Manager with over 10 years in talent acquisition and employee relations. Passionate about building diverse teams and fostering inclusive workplace cultures."
                className="w-full rounded-lg border border-input bg-input-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        )}

        {/* Security Settings Tab */}
        {activeTab === "security" && (
          <div className="mt-6 space-y-6">
            {/* Change Password */}
            <div className="rounded-xl bg-muted/30 p-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Key className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">Change Password</h3>
                  <p className="text-sm text-muted-foreground">
                    Update your password to keep your account secure
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <button className="w-full rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all">
                Update Password
              </button>
            </div>

            {/* Two-Factor Authentication */}
            <div className="rounded-xl bg-muted/30 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-green-100 p-2">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      Two-Factor Authentication (2FA)
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" defaultChecked className="peer sr-only" />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20"></div>
                </label>
              </div>
              <p className="text-sm text-green-600 font-medium">
                ✓ Two-factor authentication is enabled
              </p>
            </div>

            {/* Session Management */}
            <div className="rounded-xl bg-muted/30 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">Active Sessions</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage devices where you're currently logged in
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Chrome on Windows - Current
                    </p>
                    <p className="text-xs text-muted-foreground">New York, NY • Just now</p>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    Active
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Safari on iPhone</p>
                    <p className="text-xs text-muted-foreground">New York, NY • 2 hours ago</p>
                  </div>
                  <button className="text-sm font-medium text-red-500 hover:text-red-600">
                    Revoke
                  </button>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="rounded-xl bg-muted/30 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    Security Notifications
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Get notified about important security events
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-medium text-foreground">
                    Login from new device
                  </span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-medium text-foreground">
                    Password change attempts
                  </span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-medium text-foreground">
                    Unusual account activity
                  </span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
