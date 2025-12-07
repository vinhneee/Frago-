"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
             <img 
              src="/logo.svg" 
              alt="Frago Logo" 
               className="h-16 w-auto"
            />
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Connect Frago with 
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Investors</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                Nền tảng B2B đầu tiên sử dụng cơ chế Swipe Mechanics để kết nối các thương hiệu nhượng quyền với nhà đầu tư tiềm năng.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Link href="/auth/register">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                    Start Matching Now
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 px-8 py-3 text-lg">
                    Watch Demo
                  </Button>
                </Link>
              </div>
              <div className="relative max-w-4xl mx-auto">
                <img 
                  src="Map.png"
                  alt="FranchiseSwipe platform dashboard showing swipe interface for B2B franchise matching"
                  className="h-300 w-250"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Tại sao chọn Frago?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Nền tảng của chúng tôi cách mạng hóa việc kết nối giữa thương hiệu nhượng quyền và nhà đầu tư bằng hệ thống ghép nối thông minh và giao tiếp liền mạch.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <CardTitle className="text-xl mb-2">Smart Matching</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    Thuật toán ứng dụng trí tuệ nhân tạo (AI) sẽ kết nối thương hiệu nhượng quyền với nhà đầu tư dựa trên ngân sách, vị trí, ngành nghề và mục tiêu kinh doanh.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💬</span>
                  </div>
                  <CardTitle className="text-xl mb-2">Real-time Chat</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    Nhắn tin tức thời với các đối tác đã được ghép nối.
Chia sẻ tài liệu, lên lịch họp và đàm phán thương vụ trực tiếp ngay trên nền tảng.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <CardTitle className="text-xl mb-2">Analytics Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    Theo dõi hiệu quả kết nối, phân tích xu hướng thị trường, và tối ưu hóa chiến lược nhượng quyền hoặc đầu tư của bạn bằng những báo cáo dữ liệu chi tiết.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
             Làm việc như thế nào
              </h2>
              <p className="text-lg text-gray-600">
                Các bước đơn giản để tìm thương hiệu nhượng quyền phù hợp nhất với bạn.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">Create Profile</h3>
                <p className="text-gray-600">Tạo hồ sơ thương hiệu nhượng quyền hoặc nhà đầu tư của bạn với đầy đủ thông tin chi tiết.</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">Browse & Swipe</h3>
                <p className="text-gray-600">Vuốt để xem các đối tác tiềm năng dựa trên nhu cầu và tiêu chí bạn đã chọn.</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">Match & Chat</h3>
                <p className="text-gray-600">Khi cả hai bên đều vuốt phải, quá trình trò chuyện và chia sẻ thông tin kinh doanh có thể được bắt đầu ngay lập tức.</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  4
                </div>
                <h3 className="text-lg font-semibold mb-2">Close Deal</h3>
                <p className="text-gray-600">Đàm phán các điều khoản và hoàn tất thỏa thuận hợp tác nhượng quyền của bạn.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sẵn sàng để tìm đối tác phù hợp nhất của bạn chưa?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Tham gia cùng hàng ngàn thương hiệu nhượng quyền và nhà đầu tư đang sử dụng nền tảng của chúng tôi.
            </p>
            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-2">
                  <img 
                    src="/logo.svg" 
                    alt="Frago Logo" 
                    className="h-16 w-auto"
                />
            </div> 
         </div>
              <p className="text-gray-400">
                The leading B2B platform for franchise-investor connections
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/demo">Demo</Link></li>
                <li><Link href="/api">API</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
                <li><Link href="/security">Security</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Frago. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}