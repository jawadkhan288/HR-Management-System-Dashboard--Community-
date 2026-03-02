import { useState } from "react";
import { Search, UserPlus, Shield, ShieldCheck, Edit, Trash2, X, Check, Users, ChevronRight, UserMinus, UserRoundPlus, AlertTriangle } from "lucide-react";
import { toast } from "sonner@2.0.3";

const allPermissions = [
  "View Candidates",
  "Edit Candidates",
  "Delete Candidates",
  "View Jobs",
  "Create Jobs",
  "Edit Jobs",
  "Delete Jobs",
  "Schedule Interviews",
  "View Reports",
  "Export Reports",
  "Manage Users",
  "Manage Roles",
  "System Settings",
  "Billing Access",
];

const rolesData = [
  { id: 1, role: "Super Admin", permissions: ["All Access"], grantedPermissions: allPermissions, color: "bg-red-100 text-red-700", description: "Full system access with all administrative privileges" },
  { id: 2, role: "HR Manager", permissions: ["View", "Edit", "Delete"], grantedPermissions: ["View Candidates", "Edit Candidates", "Delete Candidates", "View Jobs", "Create Jobs", "Edit Jobs", "Delete Jobs", "Schedule Interviews", "View Reports", "Export Reports"], color: "bg-purple-100 text-purple-700", description: "Manage hiring processes, candidates, and reporting" },
  { id: 3, role: "Recruiter", permissions: ["View", "Edit"], grantedPermissions: ["View Candidates", "Edit Candidates", "View Jobs", "Create Jobs", "Edit Jobs", "Schedule Interviews", "View Reports"], color: "bg-blue-100 text-blue-700", description: "Source, screen, and manage candidate pipelines" },
  { id: 4, role: "Interviewer", permissions: ["View", "Schedule"], grantedPermissions: ["View Candidates", "View Jobs", "Schedule Interviews"], color: "bg-green-100 text-green-700", description: "Conduct interviews and provide candidate feedback" },
  { id: 5, role: "Viewer", permissions: ["View Only"], grantedPermissions: ["View Candidates", "View Jobs", "View Reports"], color: "bg-gray-100 text-gray-700", description: "Read-only access to recruitment data" },
];

interface Employee {
  id: number;
  name: string;
  email: string;
  jobTitle: string;
  role: string;
  status: string;
  statusColor: string;
  securityStatus: string;
  avatar: string;
}

const initialEmployees: Employee[] = [
  {
    id: 1,
    name: "Samuel Johnson",
    email: "samuel.j@company.com",
    jobTitle: "Senior HR Manager",
    role: "HR Manager",
    status: "Permanent",
    statusColor: "bg-green-100 text-green-700",
    securityStatus: "Verified",
    avatar: "https://i.pravatar.cc/150?img=54",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.c@company.com",
    jobTitle: "Talent Acquisition Lead",
    role: "Recruiter",
    status: "Permanent",
    statusColor: "bg-green-100 text-green-700",
    securityStatus: "Verified",
    avatar: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: 3,
    name: "Eric Rodriguez",
    email: "eric.r@company.com",
    jobTitle: "Junior Recruiter",
    role: "Recruiter",
    status: "Onboarding",
    statusColor: "bg-teal-100 text-teal-700",
    securityStatus: "Pending",
    avatar: "https://i.pravatar.cc/150?img=55",
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.k@company.com",
    jobTitle: "Technical Interviewer",
    role: "Interviewer",
    status: "Permanent",
    statusColor: "bg-green-100 text-green-700",
    securityStatus: "Verified",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 5,
    name: "Jason Taylor",
    email: "jason.t@company.com",
    jobTitle: "HR Coordinator",
    role: "Viewer",
    status: "Declined",
    statusColor: "bg-red-100 text-red-700",
    securityStatus: "Revoked",
    avatar: "https://i.pravatar.cc/150?img=56",
  },
  {
    id: 6,
    name: "James Wilson",
    email: "james.w@company.com",
    jobTitle: "Recruitment Specialist",
    role: "Recruiter",
    status: "Permanent",
    statusColor: "bg-green-100 text-green-700",
    securityStatus: "Verified",
    avatar: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc3MjMwMTIyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function Employees() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedRoleDetail, setSelectedRoleDetail] = useState<typeof rolesData[0] | null>(null);
  const [showAddToRole, setShowAddToRole] = useState(false);
  const [removeConfirm, setRemoveConfirm] = useState<Employee | null>(null);

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "All" || employee.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleEmployees = (roleName: string) => employees.filter((e) => e.role === roleName);
  const getAvailableEmployees = (roleName: string) => employees.filter((e) => e.role !== roleName);

  const handleAssignRole = (empId: number, newRole: string) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === empId ? { ...emp, role: newRole } : emp))
    );
    const emp = employees.find((e) => e.id === empId);
    toast.success(`${emp?.name} assigned to ${newRole}`);
    setShowAddToRole(false);
  };

  const handleRemoveFromRole = (emp: Employee) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === emp.id ? { ...e, role: "Viewer" } : e))
    );
    toast.success(`${emp.name} removed from ${selectedRoleDetail?.role} and set to Viewer`);
    setRemoveConfirm(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Employee & User Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage access control and internal staff status
          </p>
        </div>
        <button
          onClick={() => setShowRoleModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all"
        >
          <UserPlus className="h-4 w-4" />
          Add User
        </button>
      </div>

      {/* Role-Based Access Control Cards */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-4">Role-Based Access Control (RBAC)</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {rolesData.map((role) => {
            const count = getRoleEmployees(role.role).length;
            return (
              <div
                key={role.id}
                onClick={() => {
                  setSelectedRoleDetail(role);
                  setShowAddToRole(false);
                  setRemoveConfirm(null);
                }}
                className="rounded-2xl bg-card p-5 shadow-sm border border-border hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="rounded-lg bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-1">{role.role}</h3>
                <p className="text-xs text-muted-foreground mb-3">{role.description}</p>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.map((permission, idx) => (
                      <span
                        key={idx}
                        className={`text-xs font-medium px-2 py-1 rounded-full ${role.color}`}
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Users className="h-3.5 w-3.5" />
                    <span>{count} users</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Employee Status Table */}
      <div className="rounded-2xl bg-card p-6 shadow-sm border border-border">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-bold text-foreground">Employee Status</h2>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 rounded-lg border border-input bg-input-background pl-9 pr-4 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="rounded-lg border border-input bg-input-background px-4 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="All">All Roles</option>
              {rolesData.map((role) => (
                <option key={role.id} value={role.role}>
                  {role.role}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 text-left text-xs font-semibold text-muted-foreground">Employee Name</th>
                <th className="pb-3 text-left text-xs font-semibold text-muted-foreground">Email</th>
                <th className="pb-3 text-left text-xs font-semibold text-muted-foreground">Job Title</th>
                <th className="pb-3 text-left text-xs font-semibold text-muted-foreground">Role</th>
                <th className="pb-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
                <th className="pb-3 text-left text-xs font-semibold text-muted-foreground">Security</th>
                <th className="pb-3 text-left text-xs font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b border-border last:border-0">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img src={employee.avatar} alt={employee.name} className="h-10 w-10 rounded-full object-cover" />
                      <span className="text-sm font-medium text-foreground">{employee.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-muted-foreground">{employee.email}</td>
                  <td className="py-4 text-sm text-foreground">{employee.jobTitle}</td>
                  <td className="py-4">
                    <span className="text-sm text-foreground">{employee.role}</span>
                  </td>
                  <td className="py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${employee.statusColor}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <ShieldCheck
                        className={`h-4 w-4 ${
                          employee.securityStatus === "Verified"
                            ? "text-green-500"
                            : employee.securityStatus === "Pending"
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      />
                      <span
                        className={`text-xs font-medium ${
                          employee.securityStatus === "Verified"
                            ? "text-green-700"
                            : employee.securityStatus === "Pending"
                            ? "text-yellow-700"
                            : "text-red-700"
                        }`}
                      >
                        {employee.securityStatus}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <button className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-all">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-all">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEmployees.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No employees found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-card p-6 shadow-xl">
            <h3 className="text-xl font-bold text-foreground mb-4">Add New User</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Full Name</label>
                <input type="text" placeholder="Enter full name" className="w-full rounded-lg border border-input bg-input-background px-4 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                <input type="email" placeholder="email@company.com" className="w-full rounded-lg border border-input bg-input-background px-4 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Job Title</label>
                <input type="text" placeholder="Enter job title" className="w-full rounded-lg border border-input bg-input-background px-4 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Role</label>
                <select className="w-full rounded-lg border border-input bg-input-background px-4 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
                  {rolesData.map((role) => (
                    <option key={role.id} value={role.role}>{role.role}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowRoleModal(false)} className="flex-1 rounded-xl border-2 border-input py-2.5 text-sm font-semibold text-foreground hover:bg-accent transition-all">Cancel</button>
                <button onClick={() => setShowRoleModal(false)} className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all">Add User</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Role Detail Modal */}
      {selectedRoleDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedRoleDetail(null)}>
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card shadow-xl" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-card border-b border-border px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2.5">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{selectedRoleDetail.role}</h3>
                  <p className="text-xs text-muted-foreground">{selectedRoleDetail.description}</p>
                </div>
              </div>
              <button onClick={() => setSelectedRoleDetail(null)} className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-all">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Permissions Grid */}
              <div>
                <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Permissions ({selectedRoleDetail.grantedPermissions.length}/{allPermissions.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {allPermissions.map((perm) => {
                    const granted = selectedRoleDetail.grantedPermissions.includes(perm);
                    return (
                      <div
                        key={perm}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3 border transition-colors ${
                          granted ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200 opacity-50"
                        }`}
                      >
                        <div className={`flex items-center justify-center h-5 w-5 rounded-full ${granted ? "bg-green-500" : "bg-gray-300"}`}>
                          {granted ? <Check className="h-3 w-3 text-white" /> : <X className="h-3 w-3 text-white" />}
                        </div>
                        <span className={`text-sm ${granted ? "text-green-800 font-medium" : "text-gray-500 line-through"}`}>{perm}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Employees with this Role */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    Employees with this Role ({getRoleEmployees(selectedRoleDetail.role).length})
                  </h4>
                  <button
                    onClick={() => setShowAddToRole(!showAddToRole)}
                    className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-all"
                  >
                    <UserRoundPlus className="h-3.5 w-3.5" />
                    Add Employee
                  </button>
                </div>

                {/* Add Employee Dropdown */}
                {showAddToRole && (
                  <div className="mb-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <p className="text-xs font-medium text-foreground mb-3">Select an employee to assign to <span className="text-primary">{selectedRoleDetail.role}</span>:</p>
                    {getAvailableEmployees(selectedRoleDetail.role).length === 0 ? (
                      <p className="text-xs text-muted-foreground text-center py-2">All employees are already assigned to this role</p>
                    ) : (
                      <div className="space-y-1.5 max-h-48 overflow-y-auto">
                        {getAvailableEmployees(selectedRoleDetail.role).map((emp) => (
                          <button
                            key={emp.id}
                            onClick={() => handleAssignRole(emp.id, selectedRoleDetail.role)}
                            className="w-full flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5 hover:border-primary/40 hover:bg-primary/5 transition-all text-left"
                          >
                            <img src={emp.avatar} alt={emp.name} className="h-8 w-8 rounded-full object-cover" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">{emp.name}</p>
                              <p className="text-xs text-muted-foreground truncate">Currently: {emp.role} &middot; {emp.jobTitle}</p>
                            </div>
                            <UserRoundPlus className="h-4 w-4 text-primary shrink-0" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {(() => {
                  const roleEmployees = getRoleEmployees(selectedRoleDetail.role);
                  if (roleEmployees.length === 0) {
                    return (
                      <div className="rounded-xl border border-dashed border-border py-8 text-center">
                        <Users className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">No employees currently assigned to this role</p>
                      </div>
                    );
                  }
                  return (
                    <div className="space-y-2">
                      {roleEmployees.map((emp) => (
                        <div key={emp.id} className="flex items-center justify-between rounded-xl border border-border bg-accent/30 px-4 py-3 hover:bg-accent/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <img src={emp.avatar} alt={emp.name} className="h-9 w-9 rounded-full object-cover" />
                            <div>
                              <p className="text-sm font-medium text-foreground">{emp.name}</p>
                              <p className="text-xs text-muted-foreground">{emp.jobTitle}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${emp.statusColor}`}>{emp.status}</span>
                            <div className="flex items-center gap-1">
                              <ShieldCheck className={`h-3.5 w-3.5 ${emp.securityStatus === "Verified" ? "text-green-500" : emp.securityStatus === "Pending" ? "text-yellow-500" : "text-red-500"}`} />
                              <span className={`text-xs font-medium ${emp.securityStatus === "Verified" ? "text-green-700" : emp.securityStatus === "Pending" ? "text-yellow-700" : "text-red-700"}`}>{emp.securityStatus}</span>
                            </div>
                            {selectedRoleDetail.role !== "Viewer" && (
                              <button
                                onClick={() => setRemoveConfirm(emp)}
                                className="ml-1 rounded-lg p-1.5 text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-all"
                                title="Remove from role"
                              >
                                <UserMinus className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Remove from Role Confirmation Modal */}
      {removeConfirm && selectedRoleDetail && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" onClick={() => setRemoveConfirm(null)}>
          <div className="w-full max-w-sm rounded-2xl bg-card p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-red-100 p-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Remove from Role</h3>
              <p className="text-sm text-muted-foreground mb-1">
                Are you sure you want to remove <span className="font-semibold text-foreground">{removeConfirm.name}</span> from the <span className="font-semibold text-primary">{selectedRoleDetail.role}</span> role?
              </p>
              <p className="text-xs text-muted-foreground mb-6">
                They will be reassigned to the Viewer role with read-only access.
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setRemoveConfirm(null)}
                  className="flex-1 rounded-xl border-2 border-input py-2.5 text-sm font-semibold text-foreground hover:bg-accent transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleRemoveFromRole(removeConfirm)}
                  className="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-all"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
