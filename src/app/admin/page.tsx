"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

// Mock analytics data
const analyticsData = {
  overview: {
    totalUsers: 2847,
    totalBrands: 1023,
    totalInvestors: 1824,
    activeMatches: 456,
    totalMatches: 3672,
    successfulDeals: 89,
    monthlyGrowth: 23.5,
    revenueThisMonth: 124500
  },
  userActivity: {
    dailyActiveUsers: 1245,
    weeklyActiveUsers: 2156,
    monthlyActiveUsers: 2847,
    avgSessionTime: 18.5,
    swipesPerSession: 12.3,
    messagesSent: 8934,
    profileViews: 15672
  },
  matchingStats: {
    matchRate: 34.6,
    chatInitiationRate: 78.2,
    dealClosureRate: 12.4,
    avgTimeToMatch: 3.2,
    topIndustries: [
      { name: "Food & Beverage", percentage: 28.5 },
      { name: "Retail", percentage: 22.1 },
      { name: "Health & Fitness", percentage: 18.3 },
      { name: "Business Services", percentage: 15.7 },
      { name: "Technology", percentage: 15.4 }
    ]
  },
  recentActivity: [
    {
      id: "1",
      type: "match",
      description: "Sarah Johnson (QuickBite) matched with David Park (Park Investment)",
      timestamp: new Date("2024-01-15T14:30:00"),
      status: "success"
    },
    {
      id: "2",
      type: "signup",
      description: "New brand registration: TechFix Solutions",
      timestamp: new Date("2024-01-15T13:15:00"),
      status: "pending"
    },
    {
      id: "3",
      type: "deal",
      description: "Deal closed: FitZone Studios + Smith Capital Partners",
      timestamp: new Date("2024-01-15T11:45:00"),
      status: "success"
    },
    {
      id: "4",
      type: "report",
      description: "User report: Inappropriate behavior by user ID 1847",
      timestamp: new Date("2024-01-15T10:20:00"),
      status: "warning"
    }
  ]
};
//Contract Verification Component
function ContractVerificationSection() {
  const [contracts, setContracts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchContracts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchContracts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/contracts");
      const result = await response.json();
      if (result.success) {
        setContracts(result.contracts);
      }
    } catch (error) {
      console.error("Error fetching contracts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (contractId: string, status: "verified" | "rejected") => {
    try {
      const response = await fetch("/api/contracts/verify", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contractId,
          status,
          adminId: "admin-user",
        }),
      });

      const result = await response.json();
      if (result.success) {
        // Show success message
        alert(`Hợp đồng đã được ${status === "verified" ? "xác minh" : "từ chối"} thành công!`);
        // Refresh contracts list
        fetchContracts();
      }
    } catch (error) {
      console.error("Error verifying contract:", error);
      alert("Có lỗi xảy ra khi xác minh hợp đồng");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("vi-VN");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Chờ xác minh</Badge>;
      case "verified":
        return <Badge className="bg-green-100 text-green-800">Đã xác minh</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Đã từ chối</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const pendingContracts = contracts.filter((c) => c.status === "pending");
  const verifiedContracts = contracts.filter((c) => c.status === "verified");
  const rejectedContracts = contracts.filter((c) => c.status === "rejected");

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Chờ xác minh
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {pendingContracts.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Đã xác minh
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {verifiedContracts.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Đã từ chối
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {rejectedContracts.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contracts List */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách hợp đồng</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Đang tải...</p>
            </div>
          ) : contracts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Chưa có hợp đồng nào được gửi
            </div>
          ) : (
            <div className="space-y-4">
              {contracts.map((contract) => (
                <div
                  key={contract.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-gray-900">
                          Hợp đồng #{contract.id}
                        </h3>
                        {getStatusBadge(contract.status)}
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">User ID:</span>
                          <span className="ml-2 font-medium">{contract.userId}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Loại:</span>
                          <span className="ml-2 font-medium">
                             {contract.contractType === "expected"
                              ? "Dự kiến"
                              : "Chính thức"}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Giá trị:</span>
                          <span className="ml-2 font-medium">
                            {formatCurrency(contract.contractValue)}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Số giao dịch:</span>
                          <span className="ml-2 font-medium">
                            {contract.dealCount}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Ngày gửi:</span>
                          <span className="ml-2 font-medium">
                            {formatDate(contract.createdAt)}
                          </span>
                        </div>
                        {contract.evidence && (
                          <div>
                            <span className="text-gray-500">Bằng chứng:</span>
                            <a
                              href={contract.evidence.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-2 text-blue-600 hover:underline"
                            >
                              {contract.evidence.name}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    {contract.status === "pending" && (
                      <div className="flex space-x-2 ml-4">
                        <Button
                          size="sm"
                          onClick={() => handleVerify(contract.id, "verified")}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Xác minh
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleVerify(contract.id, "rejected")}
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          Từ chối
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedMetric, setSelectedMetric] = useState("users");

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "bg-green-100 text-green-800";
      case "warning": return "bg-yellow-100 text-yellow-800";
      case "pending": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "match": return "💕";
      case "signup": return "👋";
      case "deal": return "🤝";
      case "report": return "⚠️";
      default: return "📊";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Admin Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <img
                src="/logo.svg"
                alt="Frago Logo"
                className="h-16 w-auto"
              />
            </div>
            <Badge className="bg-red-100 text-red-800">Admin Access</Badge>
          </div>

          <div className="flex items-center space-x-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              Export Report
            </Button>
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Back to App
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
           <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="matching">Matching</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatNumber(analyticsData.overview.totalUsers)}</div>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-green-600">+{analyticsData.overview.monthlyGrowth}%</span>
                    <span className="text-sm text-gray-500 ml-1">vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Active Matches</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.overview.activeMatches}</div>
                  <div className="text-sm text-gray-500 mt-2">
                    {analyticsData.overview.totalMatches} total matches
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Successful Deals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.overview.successfulDeals}</div>
                  <div className="text-sm text-gray-500 mt-2">
                    {((analyticsData.overview.successfulDeals / analyticsData.overview.totalMatches) * 100).toFixed(1)}% conversion rate
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(analyticsData.overview.revenueThisMonth)}</div>
                  <div className="text-sm text-green-600 mt-2">+12.3% growth</div>
                </CardContent>
              </Card>
            </div>

            {/* User Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Franchise Brands</span>
                    <span className="text-sm text-gray-600">{analyticsData.overview.totalBrands}</span>
                  </div>
                  <Progress value={(analyticsData.overview.totalBrands / analyticsData.overview.totalUsers) * 100} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Investors</span>
                    <span className="text-sm text-gray-600">{analyticsData.overview.totalInvestors}</span>
                  </div>
                  <Progress value={(analyticsData.overview.totalInvestors / analyticsData.overview.totalUsers) * 100} className="h-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Industries</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {analyticsData.matchingStats.topIndustries.map((industry, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{industry.name}</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={industry.percentage} className="h-2 w-20" />
                        <span className="text-sm text-gray-600 w-12">{industry.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                      <div className="text-lg">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatDate(activity.timestamp)}</p>
                      </div>
                      <Badge className={getStatusColor(activity.status)}>
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Daily Active</span>
                    <span className="font-medium">{formatNumber(analyticsData.userActivity.dailyActiveUsers)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Weekly Active</span>
                    <span className="font-medium">{formatNumber(analyticsData.userActivity.weeklyActiveUsers)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Monthly Active</span>
                    <span className="font-medium">{formatNumber(analyticsData.userActivity.monthlyActiveUsers)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Engagement Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avg Session Time</span>
                    <span className="font-medium">{analyticsData.userActivity.avgSessionTime} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Swipes per Session</span>
                    <span className="font-medium">{analyticsData.userActivity.swipesPerSession}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Messages Sent</span>
                    <span className="font-medium">{formatNumber(analyticsData.userActivity.messagesSent)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Profile Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {formatNumber(analyticsData.userActivity.profileViews)}
                  </div>
                  <p className="text-sm text-gray-600">Total profile views this month</p>
                  <p className="text-sm text-green-600 mt-1">+15.2% vs last month</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Matching Tab */}
          <TabsContent value="matching" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Match Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {analyticsData.matchingStats.matchRate}%
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Successful matches</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Chat Initiation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {analyticsData.matchingStats.chatInitiationRate}%
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Matches that start chatting</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Deal Closure</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">
                    {analyticsData.matchingStats.dealClosureRate}%
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Chats that close deals</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Time to Match</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">
                    {analyticsData.matchingStats.avgTimeToMatch} days
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Average time to first match</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-green-600 mb-4">
                  {formatCurrency(analyticsData.overview.revenueThisMonth)}
                </div>
                <p className="text-gray-600 mb-6">Monthly recurring revenue</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{formatCurrency(45600)}</div>
                    <p className="text-sm text-gray-600">Premium Subscriptions</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(52900)}</div>
                    <p className="text-sm text-gray-600">Success Fees</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{formatCurrency(26000)}</div>
                    <p className="text-sm text-gray-600">Featured Listings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          {/* Contracts Tab */}
          <TabsContent value="contracts" className="space-y-6">
            <ContractVerificationSection />
          </TabsContent>
          {/* Moderation Tab */}
          <TabsContent value="moderation" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Content Moderation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pending Reviews</span>
                    <Badge className="bg-yellow-100 text-yellow-800">12</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Flagged Profiles</span>
                    <Badge className="bg-red-100 text-red-800">5</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Reported Messages</span>
                    <Badge className="bg-orange-100 text-orange-800">8</Badge>
                  </div>
                  <Button className="w-full mt-4">Review Queue</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Users</span>
                    <span className="font-medium">{analyticsData.overview.totalUsers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Suspended Accounts</span>
                    <Badge className="bg-red-100 text-red-800">23</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Verification Pending</span>
                    <Badge className="bg-blue-100 text-blue-800">47</Badge>
                  </div>
                  <Button variant="outline" className="w-full mt-4">Manage Users</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}