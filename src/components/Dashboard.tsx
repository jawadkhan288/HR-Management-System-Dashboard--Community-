import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Users, Eye, UserPlus, UserMinus, UserCheck, Video, RefreshCw, SlidersHorizontal } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

const statsData = [
  {
    title: "Total Employees",
    value: "856",
    subtitle: "Employees",
    change: 22.0,
    trend: "up",
    icon: Users,
  },
  {
    title: "Job View",
    value: "3,342",
    subtitle: "Viewers",
    change: 22.0,
    trend: "up",
    icon: Eye,
  },
  {
    title: "Job Applied",
    value: "30",
    subtitle: "Applicants",
    change: 12.0,
    trend: "up",
    icon: UserPlus,
  },
  {
    title: "Resigned Employees",
    value: "30",
    subtitle: "Employee",
    change: -7.0,
    trend: "down",
    icon: UserMinus,
  },
];

const chartData = [
  { month: "Jan", value: 6 },
  { month: "Feb", value: 8 },
  { month: "Mar", value: 9 },
  { month: "Apr", value: 7 },
  { month: "May", value: 0 },
  { month: "Jun", value: 7 },
  { month: "Jul", value: 8 },
  { month: "Aug", value: 10 },
];

const employeeStatusData = [
  {
    id: 1,
    name: "Efrat",
    email: "Efrat@example.com",
    jobTitle: "Designer",
    status: "Permanent",
    statusColor: "bg-purple-100 text-purple-700",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Tarik Aziz",
    email: "Tarik@example.com",
    jobTitle: "Frontend Developer",
    status: "Decline",
    statusColor: "bg-red-100 text-red-700",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Nafiul Basar",
    email: "Nafiul@example.com@example",
    jobTitle: "User",
    status: "Onboarding",
    statusColor: "bg-teal-100 text-teal-700",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

export function Dashboard() {
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 1,
    minutes: 24,
    seconds: 21,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all">
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="rounded-2xl bg-card p-6 shadow-sm border border-border"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-foreground mb-1">{stat.value}</h3>
                  <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                </div>
                <div className="rounded-lg bg-primary/10 p-2">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span
                  className={`text-sm font-semibold ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.trend === "up" ? "+" : ""}{stat.change}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Reminders Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Job Statistics Chart */}
        <div className="lg:col-span-2 rounded-2xl bg-card p-6 shadow-sm border border-border">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">Job Statistics</h2>
            <select className="rounded-lg border border-input bg-input-background px-3 py-1.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} barSize={40}>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                ticks={[0, 2, 4, 6, 8, 10]}
              />
              <Bar dataKey="value" radius={[20, 20, 20, 20]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.month === "Aug" ? "#6B5CE7" : entry.value === 0 ? "#E5E7EB" : "#6B5CE7"}
                    fillOpacity={entry.month === "Aug" ? 1 : entry.value === 0 ? 0.3 : 0.6}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          {chartData[chartData.length - 1] && (
            <div className="mt-4 flex items-center justify-end gap-2">
              <div className="rounded-lg bg-primary px-3 py-1 text-sm font-semibold text-white">
                {chartData[chartData.length - 1].value}
              </div>
            </div>
          )}
        </div>

        {/* Reminders Card */}
        <div className="rounded-2xl bg-card p-6 shadow-sm border border-border">
          <h2 className="text-sm font-semibold text-muted-foreground mb-4">Reminders</h2>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">Interview Meeting</h3>
            <p className="text-sm text-muted-foreground">Time 3:00pm-4:00pm</p>
            <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 py-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">
                  {formatTime(timeRemaining.hours)}:{formatTime(timeRemaining.minutes)}:
                  {formatTime(timeRemaining.seconds)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">Time Remaining</div>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all">
              <Video className="h-4 w-4" />
              Start Meeting
            </button>
            <button className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-primary py-3 text-sm font-semibold text-primary hover:bg-primary/5 transition-all">
              <RefreshCw className="h-4 w-4" />
              Reschedule Meeting
            </button>
          </div>
        </div>
      </div>

      {/* Employee Status and Project Progress */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Employee Status Table */}
        <div className="lg:col-span-2 rounded-2xl bg-card p-6 shadow-sm border border-border">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">Employee Status</h2>
            <button className="flex items-center gap-2 rounded-lg border border-input bg-input-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-accent transition-all">
              <SlidersHorizontal className="h-4 w-4" />
              Filter & Short
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left text-xs font-semibold text-muted-foreground">
                    Employee Name
                  </th>
                  <th className="pb-3 text-left text-xs font-semibold text-muted-foreground">
                    Email
                  </th>
                  <th className="pb-3 text-left text-xs font-semibold text-muted-foreground">
                    Job Title
                  </th>
                  <th className="pb-3 text-left text-xs font-semibold text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {employeeStatusData.map((employee) => (
                  <tr key={employee.id} className="border-b border-border last:border-0">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="h-9 w-9 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium text-foreground">
                          {employee.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">{employee.email}</td>
                    <td className="py-4 text-sm text-foreground">{employee.jobTitle}</td>
                    <td className="py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${employee.statusColor}`}
                      >
                        {employee.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Project Progress */}
        <div className="rounded-2xl bg-card p-6 shadow-sm border border-border">
          <h2 className="text-sm font-semibold text-muted-foreground mb-6">Project Progress</h2>
          <div className="flex flex-col items-center justify-center">
            <div className="relative h-52 w-52">
              <svg className="h-full w-full" style={{ transform: 'rotate(-90deg)' }}>
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9D8FF0" />
                    <stop offset="50%" stopColor="#7B5FED" />
                    <stop offset="100%" stopColor="#5932EA" />
                  </linearGradient>
                </defs>
                {/* Background Circle */}
                <circle
                  cx="104"
                  cy="104"
                  r="85"
                  stroke="#F3F4F6"
                  strokeWidth="18"
                  fill="none"
                />
                {/* Progress Circle with Gradient */}
                <circle
                  cx="104"
                  cy="104"
                  r="85"
                  stroke="url(#progressGradient)"
                  strokeWidth="18"
                  fill="none"
                  strokeDasharray={534.07}
                  strokeDashoffset={534.07 * (1 - 0.41)}
                  strokeLinecap="round"
                  style={{
                    filter: 'drop-shadow(0px 4px 12px rgba(89, 50, 234, 0.4))',
                    transition: 'stroke-dashoffset 1s ease-in-out'
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-5xl font-bold text-primary">41%</div>
                <div className="text-xs text-muted-foreground mt-2">Project Ended</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}