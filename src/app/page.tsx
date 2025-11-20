"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FG</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Frago</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors">
              Pricing
            </Link>
            <Link href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">
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
                The first B2B platform that uses swipe mechanics to connect franchise brands 
                with potential investors. Find your perfect business match today.
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

              {/* Hero Image Placeholder */}
              <div className="relative max-w-4xl mx-auto">
                <img 
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/59ed1d92-2fe4-4b29-aa92-be56c6047079.png"
                  alt="FranchiseSwipe platform dashboard showing swipe interface for B2B franchise matching"
                  className="w-full h-auto rounded-xl shadow-2xl border"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Frago?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform revolutionizes franchise-investor connections with intelligent matching and seamless communication.
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
                    AI-powered algorithm matches franchises with investors based on budget, location, industry, and business goals.
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
                    Instant messaging with matched partners. Share documents, schedule meetings, and negotiate deals directly in-platform.
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
                    Track your matching success, analyze market trends, and optimize your franchise or investment strategy with detailed insights.
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
                How It Works
              </h2>
              <p className="text-lg text-gray-600">
                Simple steps to find your perfect franchise match
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">Create Profile</h3>
                <p className="text-gray-600">Set up your franchise brand or investor profile with detailed information</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">Browse & Swipe</h3>
                <p className="text-gray-600">Swipe through potential matches based on your preferences and criteria</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">Match & Chat</h3>
                <p className="text-gray-600">When both parties swipe right, start chatting and sharing business details</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  4
                </div>
                <h3 className="text-lg font-semibold mb-2">Close Deal</h3>
                <p className="text-gray-600">Negotiate terms and finalize your franchise partnership agreement</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Find Your Perfect Match?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of franchise brands and investors already using our platform
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
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FS</span>
                </div>
                <h3 className="text-lg font-bold">FranchiseSwipe</h3>
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
            <p>&copy; 2024 FranchiseSwipe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}