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
      { name: "Thực phẩm & Đồ uống", percentage: 28.5 },
      { name: "Bán lẻ", percentage: 22.1 },
      { name: "Sức khỏe & Thể hình", percentage: 18.3 },
      { name: "Dịch vụ doanh nghiệp", percentage: 15.7 },
      { name: "Công nghệ", percentage: 15.4 }
    ]
  },
  recentActivity: [
    {
      id: "1",
      type: "match",
      description: "Sarah Johnson (QuickBite) đã match với David Park (Park Investment)",
      timestamp: new Date("2024-01-15T14:30:00"),
      status: "success"
    },
    {
      id: "2",
      type: "signup",
      description: "Đăng ký thương hiệu mới: TechFix Solutions",
      timestamp: new Date("2024-01-15T13:15:00"),
      status: "pending"
    },
    {
      id: "3",
      type: "deal",
      description: "Chốt deal thành công: FitZone Studios + Smith Capital Partners",
      timestamp: new Date("2024-01-15T11:45:00"),
      status: "success"
    },
    {
      id: "4",
      type: "report",
      description: "Báo cáo người dùng: Hành vi không phù hợp từ user ID 1847",
      timestamp: new Date("2024-01-15T10:20:00"),
      status: "warning"
    }
  ]
};

// Contract Verification Component
function ContractVerificationSection() {
  const [contracts, setContracts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch contracts on mount
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
        alert(`Hợp đồng đã được ${status === "verified" ? "xác minh" : "từ chối"} thành công!`);
        fetchContracts();
      } else {
        alert(`Lỗi: ${result.error || "Không thể xác minh hợp đồng"}`);
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
            <CardTitle className="text-sm font-medium text-gray-600">Chờ xác minh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingContracts.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Đã xác minh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{verifiedContracts.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Đã từ chối</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{rejectedContracts.length}</div>
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
            <div className="text-center py-8 text-gray-500">Chưa có hợp đồng nào được gửi</div>
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
                        <h3 className="font-semibold text-gray-900">Hợp đồng #{contract.id}</h3>
                        {getStatusBadge(contract.status)}
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Mã người dùng:</span>
                          <span className="ml-2 font-medium">{contract.userId}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Loại:</span>
                          <span className="ml-2 font-medium">
                            {contract.contractType === "expected" ? "Dự kiến" : "Chính thức"}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Giá trị:</span>
                          <span className="ml-2 font-medium">{formatCurrency(contract.contractValue)}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Số giao dịch:</span>
                          <span className="ml-2 font-medium">{contract.dealCount}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Ngày gửi:</span>
                          <span className="ml-2 font-medium">{formatDate(contract.createdAt)}</span>
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

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("vi-VN", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "match":
        return "💕";
      case "signup":
        return "👋";
      case "deal":
        return "🤝";
      case "report":
        return "⚠️";
      default:
        return "📊";
    }
  };

  const getActivityStatusText = (status: string) => {
    switch (status) {
      case "success":
        return "Thành công";
      case "warning":
        return "Cảnh báo";
      case "pending":
        return "Đang chờ";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Admin Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <img src="/logo.svg" alt="Logo Frago" className="h-16 w-auto" />
            </div>
            <Badge className="bg-red-100 text-red-800">Quyền quản trị</Badge>
          </div>

          <div className="flex items-center space-x-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Khoảng thời gian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 ngày gần đây</SelectItem>
                <SelectItem value="30d">30 ngày gần đây</SelectItem>
                <SelectItem value="90d">90 ngày gần đây</SelectItem>
                <SelectItem value="1y">1 năm gần đây</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm">
              Xuất báo cáo
            </Button>

            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Quay lại ứng dụng
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="users">Người dùng</TabsTrigger>
            <TabsTrigger value="matching">Ghép đôi</TabsTrigger>
            <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
            <TabsTrigger value="contracts">Hợp đồng</TabsTrigger>
            <TabsTrigger value="moderation">Kiểm duyệt</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Tổng người dùng</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatNumber(analyticsData.overview.totalUsers)}</div>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-green-600">+{analyticsData.overview.monthlyGrowth}%</span>
                    <span className="text-sm text-gray-500 ml-1">so với tháng trước</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Match đang hoạt động</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.overview.activeMatches}</div>
                  <div className="text-sm text-gray-500 mt-2">{analyticsData.overview.totalMatches} match tổng</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Deal thành công</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.overview.successfulDeals}</div>
                  <div className="text-sm text-gray-500 mt-2">
                    {((analyticsData.overview.successfulDeals / analyticsData.overview.totalMatches) * 100).toFixed(1)}%
                    tỷ lệ chuyển đổi
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Doanh thu tháng</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(analyticsData.overview.revenueThisMonth)}</div>
                  <div className="text-sm text-green-600 mt-2">+12.3% tăng trưởng</div>
                </CardContent>
              </Card>
            </div>

            {/* User Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Phân bổ người dùng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Thương hiệu nhượng quyền</span>
                    <span className="text-sm text-gray-600">{analyticsData.overview.totalBrands}</span>
                  </div>
                  <Progress value={(analyticsData.overview.totalBrands / analyticsData.overview.totalUsers) * 100} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Nhà đầu tư</span>
                    <span className="text-sm text-gray-600">{analyticsData.overview.totalInvestors}</span>
                  </div>
                  <Progress value={(analyticsData.overview.totalInvestors / analyticsData.overview.totalUsers) * 100} className="h-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ngành nổi bật</CardTitle>
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
                <CardTitle>Hoạt động gần đây</CardTitle>
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
                        {getActivityStatusText(activity.status)}
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
                  <CardTitle>Hoạt động người dùng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Hoạt động mỗi ngày</span>
                    <span className="font-medium">{formatNumber(analyticsData.userActivity.dailyActiveUsers)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Hoạt động mỗi tuần</span>
                    <span className="font-medium">{formatNumber(analyticsData.userActivity.weeklyActiveUsers)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Hoạt động mỗi tháng</span>
                    <span className="font-medium">{formatNumber(analyticsData.userActivity.monthlyActiveUsers)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Chỉ số tương tác</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Thời gian phiên TB</span>
                    <span className="font-medium">{analyticsData.userActivity.avgSessionTime} phút</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Số lượt vuốt / phiên</span>
                    <span className="font-medium">{analyticsData.userActivity.swipesPerSession}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tin nhắn đã gửi</span>
                    <span className="font-medium">{formatNumber(analyticsData.userActivity.messagesSent)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lượt xem hồ sơ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{formatNumber(analyticsData.userActivity.profileViews)}</div>
                  <p className="text-sm text-gray-600">Tổng lượt xem hồ sơ trong tháng</p>
                  <p className="text-sm text-green-600 mt-1">+15.2% so với tháng trước</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Matching Tab */}
          <TabsContent value="matching" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Tỷ lệ match</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{analyticsData.matchingStats.matchRate}%</div>
                  <p className="text-sm text-gray-600 mt-1">Match thành công</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Tỷ lệ bắt đầu chat</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{analyticsData.matchingStats.chatInitiationRate}%</div>
                  <p className="text-sm text-gray-600 mt-1">Match có bắt đầu trò chuyện</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Tỷ lệ chốt deal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">{analyticsData.matchingStats.dealClosureRate}%</div>
                  <p className="text-sm text-gray-600 mt-1">Chat dẫn đến chốt deal</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Thời gian để match</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{analyticsData.matchingStats.avgTimeToMatch} ngày</div>
                  <p className="text-sm text-gray-600 mt-1">Thời gian TB để có match đầu tiên</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tổng quan doanh thu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-green-600 mb-4">{formatCurrency(analyticsData.overview.revenueThisMonth)}</div>
                <p className="text-gray-600 mb-6">Doanh thu định kỳ theo tháng</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{formatCurrency(45600)}</div>
                    <p className="text-sm text-gray-600">Gói Premium</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(52900)}</div>
                    <p className="text-sm text-gray-600">Phí thành công</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{formatCurrency(26000)}</div>
                    <p className="text-sm text-gray-600">Gói nổi bật</p>
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
                  <CardTitle>Kiểm duyệt nội dung</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Chờ duyệt</span>
                    <Badge className="bg-yellow-100 text-yellow-800">12</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Hồ sơ bị gắn cờ</span>
                    <Badge className="bg-red-100 text-red-800">5</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tin nhắn bị báo cáo</span>
                    <Badge className="bg-orange-100 text-orange-800">8</Badge>
                  </div>
                  <Button className="w-full mt-4">Xem hàng chờ</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quản lý người dùng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Người dùng đang hoạt động</span>
                    <span className="font-medium">{analyticsData.overview.totalUsers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tài khoản bị khóa</span>
                    <Badge className="bg-red-100 text-red-800">23</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Chờ xác minh</span>
                    <Badge className="bg-blue-100 text-blue-800">47</Badge>
                  </div>
                  <Button variant="outline" className="w-full mt-4">Quản lý người dùng</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
