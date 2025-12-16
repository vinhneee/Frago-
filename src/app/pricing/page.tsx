"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: "starter",
      name: "Starter",
      description: "Dành cho các brand/investor mới bắt đầu",
      monthlyPrice: 0,
      annualPrice: 0,
      features: ["Xem profile cơ bản", "Chat cơ bản", "Hỗ trợ email"],
      limitations: ["Không có AI recommendations", "Không có advanced filters", "Không có analytics"],
      buttonText: "Bắt đầu miễn phí",
      popular: false,
      color: "border-gray-200",
    },
    {
      id: "professional",
      name: "Professional",
      description: "Cho các doanh nghiệp muốn mở rộng nghiêm túc",
      monthlyPrice: 99,
      annualPrice: 990,
      features: [
        "Xem profile đầy đủ",
        "Advanced chat features",
        "AI-powered recommendations",
        "Advanced filtering",
        "Basic analytics",
        "Priority support",
        "Profile verification badge",
      ],
      limitations: [],
      buttonText: "Chọn Professional",
      popular: true,
      color: "border-blue-500",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Giải pháp toàn diện cho tập đoàn lớn",
      monthlyPrice: 299,
      annualPrice: 2990,
      features: [
        "Tất cả tính năng Professional",
        "Multi-user accounts",
        "Advanced analytics dashboard",
        "Custom branding",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
        "White-label options",
        "SLA guarantee",
        "24/7 phone support",
      ],
      limitations: [],
      buttonText: "Liên hệ Sales",
      popular: false,
      color: "border-purple-500",
    },
  ];

  const addOnServices = [
    {
      name: "Featured Profile",
      description: "Đẩy profile lên top kết quả tìm kiếm",
      price: "$199",
      detail: "Mỗi tháng, tăng visibility 300%",
    },
    {
      name: "Background Check",
      description: "Kiểm tra background business partner",
      price: "$99",
      detail: "Mỗi lần check, báo cáo chi tiết",
    },
    {
      name: "Market Analysis",
      description: "Phân tích thị trường custom theo yêu cầu",
      price: "$499",
      detail: "Báo cáo 20-30 trang, 1-2 tuần",
    },
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    alert(`Đã chọn gói ${plans.find((p) => p.id === planId)?.name}. Chuyển đến thanh toán...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Frago Logo" className="h-16 w-auto" />
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost">Đăng nhập</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Đăng ký ngay</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Chọn Gói Phù Hợp</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Từ startup đến tập đoàn, chúng tôi có giải pháp phù hợp với mọi quy mô kinh doanh
          </p>

          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm ${!isAnnual ? "text-gray-900 font-medium" : "text-gray-500"}`}>
              Thanh toán hàng tháng
            </span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
            <span className={`text-sm ${isAnnual ? "text-gray-900 font-medium" : "text-gray-500"}`}>
              Thanh toán hàng năm
            </span>
            <Badge className="bg-green-100 text-green-800">Tiết kiệm 17%</Badge>
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${plan.popular ? "ring-2 ring-blue-500 scale-105" : ""} ${plan.color} hover:shadow-lg transition-all`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white">Phổ biến nhất</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-gray-600">{plan.description}</CardDescription>

                <div className="mt-4">
                  <div className="text-4xl font-bold text-gray-900">
                    ${isAnnual ? Math.floor(plan.annualPrice / 12) : plan.monthlyPrice}
                    <span className="text-lg text-gray-500 font-normal">/tháng</span>
                  </div>
                  {isAnnual && plan.annualPrice > 0 && (
                    <p className="text-sm text-gray-500 mt-1">Thanh toán ${plan.annualPrice}/năm</p>
                  )}
                  {plan.monthlyPrice === 0 && <p className="text-sm text-green-600 font-medium">Miễn phí mãi mãi</p>}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Tính năng bao gồm:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.limitations.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Giới hạn:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-500">
                          <span className="text-gray-400 mr-2">✗</span>
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button
                  className={`w-full mt-6 ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-700"
                      : plan.id === "enterprise"
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "bg-gray-600 hover:bg-gray-700"
                  }`}
                  onClick={() => handleSelectPlan(plan.id)}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add-ons */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Dịch Vụ Bổ Sung</h2>
            <p className="text-gray-600">Tăng cường hiệu quả với các dịch vụ chuyên biệt</p>
          </div>

          {/* ✅ card đều nhau */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {addOnServices.map((item) => (
              <Card key={item.name} className="h-full flex flex-col text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <div className="text-2xl font-bold text-blue-600 mt-2">{item.price}</div>
                </CardHeader>

                <CardContent className="flex-1">
                  <p className="text-gray-600 text-sm">{item.description}</p>
                  <p className="text-xs text-gray-500 mt-2">{item.detail}</p>

                  <Button className="mt-6 w-full bg-blue-600 hover:bg-blue-700">Chọn gói</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Câu Hỏi Thường Gặp</h2>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Tôi có thể thay đổi gói dịch vụ không?</h3>
                <p className="text-gray-600">
                  Có, bạn có thể upgrade hoặc downgrade bất cứ lúc nào. Thay đổi sẽ có hiệu lực từ chu kỳ thanh toán tiếp theo.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Success fee được tính như thế nào?</h3>
                <p className="text-gray-600">Success fee 5% chỉ được thu khi deal thực sự được ký kết thành công. Không có deal = không có phí.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Có hỗ trợ setup và training không?</h3>
                <p className="text-gray-600">
                  Gói Enterprise bao gồm dedicated account manager và training. Các gói khác có hỗ trợ qua email và tài liệu hướng dẫn.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Có cam kết về số lượng matches không?</h3>
                <p className="text-gray-600">
                  Chúng tôi không cam kết số lượng matches nhưng đảm bảo quality matches thông qua AI matching algorithm và verification process.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Sẵn sàng bắt đầu?</h2>
          <p className="text-lg opacity-90 mb-6">Hàng nghìn brand và investor đã tin tưởng sử dụng FranchiseSwipe</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Bắt đầu miễn phí
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Tư vấn Enterprise
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
