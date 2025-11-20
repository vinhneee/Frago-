"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const demoSteps = [
    {
      title: "Đăng ký và thiết lập profile",
      description: "Tạo tài khoản và hoàn thiện profile business của bạn",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3b1aa631-d40f-4c0a-aa98-b3219df8b385.png",
      details: [
        "Chọn loại tài khoản: Brand Owner hoặc Investor",
        "Điền thông tin công ty và kinh nghiệm",
        "Upload logo và hình ảnh business",
        "Set preferences và criteria matching"
      ]
    },
    {
      title: "AI Matching và Swipe Interface",
      description: "Hệ thống AI sẽ recommend các match phù hợp nhất",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/57630c74-9500-45bc-83f3-a6e44d432681.png",
      details: [
        "AI analyze profile để tìm compatibility",
        "Swipe right để show interest, left để pass",
        "Xem detailed info: financial, experience, location",
        "Filter theo industry, budget, region"
      ]
    },
    {
      title: "Match thành công và Chat",
      description: "Khi cả hai cùng swipe right, hệ thống tạo match và mở chat",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/514437bc-666a-46eb-b87b-26b8f18954d7.png",
      details: [
        "Instant notification khi có match mới",
        "Professional chat interface với business tools",
        "Share documents, schedule calls",
        "Track conversation history và progress"
      ]
    },
    {
      title: "Deal Negotiation và Closing",
      description: "Các công cụ hỗ trợ negotiate và close deal",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2d9cc594-ef70-4a35-9833-c81576b8e198.png",
      details: [
        "Template contracts và legal documents",
        "Financial calculator để estimate ROI",
        "Milestone tracking và progress monitoring",
        "Success celebration khi deal được ký!"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FS</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">FranchiseSwipe</h1>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link href="/about">
              <Button variant="ghost">About</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="ghost">Pricing</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Đăng ký ngay</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Demo FranchiseSwipe Platform
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá cách thức hoạt động của nền tảng kết nối franchise hàng đầu
          </p>
        </div>

        {/* Step Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-4 bg-white rounded-lg p-2 shadow-lg">
            {demoSteps.map((_, index) => (
              <Button
                key={index}
                variant={currentStep === index + 1 ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentStep(index + 1)}
                className="min-w-[100px]"
              >
                Bước {index + 1}
              </Button>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8 shadow-xl">
            <CardHeader className="text-center">
              <div className="text-sm text-blue-600 font-medium mb-2">
                BƯỚC {currentStep} / {demoSteps.length}
              </div>
              <CardTitle className="text-2xl mb-4">
                {demoSteps[currentStep - 1].title}
              </CardTitle>
              <p className="text-gray-600">
                {demoSteps[currentStep - 1].description}
              </p>
            </CardHeader>
            
            <CardContent>
              {/* Demo Screenshot */}
              <div className="mb-8">
                <img 
                  src={demoSteps[currentStep - 1].image}
                  alt={`Demo step ${currentStep}: ${demoSteps[currentStep - 1].title}`}
                  className="w-full h-auto rounded-lg border shadow-lg"
                />
              </div>

              {/* Step Details */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Tính năng chính:
                  </h3>
                  <ul className="space-y-3">
                    {demoSteps[currentStep - 1].details.map((detail, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="text-blue-600 font-bold">✓</span>
                        <span className="text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">
                    💡 Pro Tips:
                  </h3>
                  <div className="space-y-3 text-sm text-blue-800">
                    {currentStep === 1 && (
                      <div>
                        <p>• Profile hoàn chỉnh sẽ receive 3x nhiều matches hơn</p>
                        <p>• Upload hình ảnh chất lượng cao để tạo ấn tượng tốt</p>
                        <p>• Honest về financial metrics để build trust</p>
                      </div>
                    )}
                    {currentStep === 2 && (
                      <div>
                        <p>• AI learning từ swipe behavior để improve recommendations</p>
                        <p>• Take time đọc kỹ profile before swiping</p>
                        <p>• Use filters để narrow down exactly những gì bạn cần</p>
                      </div>
                    )}
                    {currentStep === 3 && (
                      <div>
                        <p>• Respond nhanh để maintain momentum</p>
                        <p>• Ask specific questions về business model</p>
                        <p>• Share relevant documents để build credibility</p>
                      </div>
                    )}
                    {currentStep === 4 && (
                      <div>
                        <p>• Use platform tools để standardize negotiation</p>
                        <p>• Keep all communication in-platform để track progress</p>
                        <p>• Celebrate success và refer platform cho network</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              ← Bước trước
            </Button>

            <div className="flex space-x-2">
              {demoSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    currentStep === index + 1 ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={() => setCurrentStep(Math.min(demoSteps.length, currentStep + 1))}
              disabled={currentStep === demoSteps.length}
            >
              Bước tiếp theo →
            </Button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Impressed với Demo?</h2>
          <p className="text-lg opacity-90 mb-6">
            Join 1000+ brands và investors đang sử dụng FranchiseSwipe để grow business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Bắt đầu miễn phí
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Xem Pricing Plans
              </Button>
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <Card className="text-center border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-2">Setup nhanh</h3>
              <p className="text-gray-600 text-sm">
                Chỉ cần 10 phút để setup profile và start matching
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="font-semibold text-gray-900 mb-2">AI-powered</h3>
              <p className="text-gray-600 text-sm">
                Machine learning algorithm improve theo thời gian sử dụng
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600 text-sm">
                Enterprise-grade security với full data encryption
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}