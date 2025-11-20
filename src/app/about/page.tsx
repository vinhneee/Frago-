"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Nguyễn Văn Minh",
      role: "CEO & Co-founder",
      bio: "15+ năm kinh nghiệm trong lĩnh vực franchise và đầu tư. Từng làm việc tại các tập đoàn F&B lớn.",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3de505a5-5556-43d5-a5a3-0c3c21db30fc.png"
    },
    {
      name: "Trần Thị Lan",
      role: "CTO & Co-founder", 
      bio: "Chuyên gia công nghệ với background từ Google và Meta. Passion về AI và machine learning.",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ff9c37f4-1811-47dc-8d83-5a662f63e259.png"
    },
    {
      name: "Lê Hoàng Nam",
      role: "Head of Business Development",
      bio: "Veteran trong ngành nhượng quyền Việt Nam. Network rộng với các brand và investor hàng đầu.",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/590a64f1-a318-4b61-82ec-5d370af6c4aa.png"
    }
  ];

  const milestones = [
    {
      year: "2023",
      title: "Khởi nghiệp",
      description: "Ý tưởng FranchiseSwipe ra đời từ khó khăn trong việc kết nối brand và investor"
    },
    {
      year: "2024 Q1",
      title: "Product Development", 
      description: "Xây dựng MVP và test với 100+ brand và investor đầu tiên"
    },
    {
      year: "2024 Q2",
      title: "Seed Funding",
      description: "Gọi vốn thành công $2M từ các quỹ đầu tư hàng đầu Việt Nam"
    },
    {
      year: "2024 Q4",
      title: "Official Launch",
      description: "Ra mắt chính thức với 500+ brand và 1000+ investor tham gia"
    },
    {
      year: "2025",
      title: "Expansion",
      description: "Mở rộng sang thị trường Đông Nam Á và ra mắt AI matching 2.0"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.svg" 
            alt="Frago Logo" 
            className="w-8 h-8 object-contain"/>
            <h1 className="text-xl font-bold text-gray-900">Frago</h1>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link href="/pricing">
              <Button variant="ghost">Pricing</Button>
            </Link>
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
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Về frago
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chúng tôi tin rằng mỗi brand đều xứng đáng có cơ hội mở rộng, 
            và mỗi investor đều có quyền tìm được cơ hội đầu tư phù hợp.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600 mb-4">
                🎯 Sứ Mệnh
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Democratize franchise opportunities bằng cách tạo ra nền tảng 
                công nghệ tiên tiến giúp kết nối các brand nhượng quyền với 
                các investor một cách hiệu quả, minh bạch và đáng tin cậy.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-600 mb-4">
                🚀 Tầm Nhìn  
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Trở thành nền tảng số 1 Đông Nam Á cho ecosystem nhượng quyền, 
                nơi mọi giao dịch franchise đều bắt đầu từ FranchiseSwipe.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Problem & Solution */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Tại Sao Frago?
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                🚨 Vấn Đề Hiện Tại
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li>• <strong>Fragmented market:</strong> Brand và investor khó tìm thấy nhau</li>
                <li>• <strong>Thiếu minh bạch:</strong> Thông tin không đầy đủ và không chuẩn hóa</li>
                <li>• <strong>Process lâu:</strong> Từ khi tìm hiểu đến ký kết có thể mất 6-12 tháng</li>
                <li>• <strong>Chi phí cao:</strong> Phải qua nhiều intermediary và consultant</li>
                <li>• <strong>Risk cao:</strong> Thiếu công cụ đánh giá compatibility</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                ✅ Giải Pháp FranchiseSwipe
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li>• <strong>AI Matching:</strong> Thuật toán thông minh match dựa trên 50+ criteria</li>
                <li>• <strong>Verified Profiles:</strong> Tất cả thông tin được verify và chuẩn hóa</li>
                <li>• <strong>Streamlined Process:</strong> Từ match đến deal chỉ trong 2-4 tuần</li>
                <li>• <strong>Cost Effective:</strong> Giảm 60% chi phí so với traditional methods</li>
                <li>• <strong>Data-Driven:</strong> Analytics và insights để ra quyết định tốt hơn</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Đội Ngũ Founder
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="w-32 h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <img 
                      src={member.image}
                      alt={`${member.name} - ${member.role}`}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Hành Trình Phát Triển
          </h2>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start mb-8">
                <div className="flex-shrink-0 w-24 text-right mr-8">
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {milestone.year}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Giá Trị Cốt Lõi
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="text-4xl mb-4">🔒</div>
                <CardTitle className="text-lg">Trust & Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Bảo mật thông tin tuyệt đối và xây dựng lòng tin thông qua transparency
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="text-4xl mb-4">🚀</div>
                <CardTitle className="text-lg">Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Luôn đầu tư vào công nghệ mới để mang lại trải nghiệm tốt nhất
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="text-4xl mb-4">🎯</div>
                <CardTitle className="text-lg">Results-Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Thành công của khách hàng là thước đo duy nhất cho thành công của chúng tôi
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="text-4xl mb-4">🤝</div>
                <CardTitle className="text-lg">Partnership</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Đối tác lâu dài, không chỉ là vendor. Cùng growth và cùng success
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Những Con Số Ấn Tượng</h2>
            <p className="text-lg opacity-90">Thành tựu chúng tôi đạt được trong năm đầu</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Franchise Brands</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,000+</div>
              <div className="text-lg opacity-90">Active Investors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">89</div>
              <div className="text-lg opacity-90">Successful Deals</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$50M+</div>
              <div className="text-lg opacity-90">Total Deal Value</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Sẵn Sàng Tham Gia Cùng Chúng Tôi?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're a franchise brand looking for expansion partners or an investor seeking opportunities, 
            FranchiseSwipe is the place to be.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Đăng Ký Ngay
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">
                Xem Pricing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}