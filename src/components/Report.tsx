import { Download, TrendingUp, Users, Clock, Target } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const metricsData = [
  {
    title: "Average Time-to-Hire",
    value: "28 Days",
    change: -12,
    trend: "down",
    icon: Clock,
    color: "bg-blue-500",
  },
  {
    title: "Total Applications",
    value: "1,245",
    change: 34,
    trend: "up",
    icon: Users,
    color: "bg-green-500",
  },
  {
    title: "Conversion Rate",
    value: "18.5%",
    change: 8,
    trend: "up",
    icon: Target,
    color: "bg-purple-500",
  },
  {
    title: "Positions Filled",
    value: "87",
    change: 22,
    trend: "up",
    icon: TrendingUp,
    color: "bg-orange-500",
  },
];

const applicationTrendData = [
  { month: "Jan", applications: 145, hires: 24 },
  { month: "Feb", applications: 168, hires: 28 },
  { month: "Mar", applications: 192, hires: 35 },
  { month: "Apr", applications: 178, hires: 31 },
  { month: "May", applications: 210, hires: 38 },
  { month: "Jun", applications: 198, hires: 36 },
  { month: "Jul", applications: 225, hires: 42 },
  { month: "Aug", applications: 242, hires: 45 },
];

const sourceEffectivenessData = [
  { source: "LinkedIn", applications: 450, hires: 82 },
  { source: "BDJobs", applications: 380, hires: 68 },
  { source: "Indeed", applications: 290, hires: 48 },
  { source: "Company Site", applications: 220, hires: 42 },
  { source: "Referrals", applications: 180, hires: 65 },
  { source: "Job Fairs", applications: 125, hires: 28 },
];

const candidateConversionData = [
  { stage: "Applied", count: 1245, percentage: 100 },
  { stage: "Screened", count: 645, percentage: 51.8 },
  { stage: "Interviewed", count: 320, percentage: 25.7 },
  { stage: "Offered", count: 195, percentage: 15.7 },
  { stage: "Hired", count: 148, percentage: 11.9 },
];

export function Report() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Recruitment Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Comprehensive insights into your hiring performance
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all">
          <Download className="h-4 w-4" />
          Export Report
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metricsData.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className="rounded-2xl bg-card p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`rounded-xl ${metric.color} p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-semibold ${
                    metric.trend === "up" ? "text-green-500" : "text-blue-500"
                  }`}
                >
                  <TrendingUp
                    className={`h-4 w-4 ${metric.trend === "down" ? "rotate-180" : ""}`}
                  />
                  {Math.abs(metric.change)}%
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-1">{metric.value}</h3>
                <p className="text-sm text-muted-foreground">{metric.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Application Volume Trend */}
      <div className="rounded-2xl bg-card p-6 shadow-sm border border-border">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">Application Volume Over Time</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Track application trends and hiring patterns
            </p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Last 8 Months
            </button>
            <button className="rounded-lg border border-input px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-all">
              Last Year
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={applicationTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              axisLine={{ stroke: "#E5E7EB" }}
            />
            <YAxis tick={{ fill: "#9CA3AF", fontSize: 12 }} axisLine={{ stroke: "#E5E7EB" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              iconType="circle"
              formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
            />
            <Line
              type="monotone"
              dataKey="applications"
              stroke="#6B5CE7"
              strokeWidth={3}
              dot={{ fill: "#6B5CE7", r: 5 }}
              activeDot={{ r: 7 }}
              name="Applications"
            />
            <Line
              type="monotone"
              dataKey="hires"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ fill: "#10B981", r: 5 }}
              activeDot={{ r: 7 }}
              name="Hires"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Source Effectiveness and Conversion Rate */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Source Effectiveness */}
        <div className="rounded-2xl bg-card p-6 shadow-sm border border-border">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-foreground">Source Effectiveness</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Compare hiring channels performance
            </p>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={sourceEffectivenessData} layout="vertical" barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
              <YAxis
                dataKey="source"
                type="category"
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                width={100}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: "10px" }}
                iconType="circle"
                formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
              />
              <Bar dataKey="applications" fill="#A99FF7" radius={[0, 8, 8, 0]} name="Applications" />
              <Bar dataKey="hires" fill="#6B5CE7" radius={[0, 8, 8, 0]} name="Hires" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Candidate Conversion Funnel */}
        <div className="rounded-2xl bg-card p-6 shadow-sm border border-border">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-foreground">Candidate Conversion Rates</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Recruitment pipeline efficiency
            </p>
          </div>
          <div className="space-y-4">
            {candidateConversionData.map((stage, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{stage.stage}</span>
                  <span className="text-muted-foreground">
                    {stage.count} ({stage.percentage}%)
                  </span>
                </div>
                <div className="relative h-3 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-primary transition-all duration-500"
                    style={{ width: `${stage.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl bg-primary/5 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Conversion Rate</p>
                <p className="text-2xl font-bold text-primary">11.9%</p>
              </div>
              <div className="rounded-lg bg-primary p-3">
                <Target className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
