"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

const MONTHLY_BASE = 1_500_000;
const DISCOUNT_RATE = 0.2;

export default function BrandOwnerPricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const searchParams = useSearchParams();
  const router = useRouter();

  const pricing = useMemo(() => {
    const annualTotal = MONTHLY_BASE * 12;
    const discountedAnnual = Math.round(annualTotal * (1 - DISCOUNT_RATE));
    const effectiveMonthly = Math.round(discountedAnnual / 12);

    return {
      monthly: {
        label: "Hàng tháng",
        price: MONTHLY_BASE,
        helper: "Thanh toán linh hoạt từng tháng",
      },
      yearly: {
        label: "Hàng năm",
        price: discountedAnnual,
        helper: "Tiết kiệm 20% khi thanh toán trước 12 tháng",
        strikePrice: annualTotal,
        effectiveMonthly,
      },
    } as const;
  }, []);

  const isYearly = billingCycle === "yearly";
  const currentPlan = pricing[billingCycle];
  const returnTo = searchParams.get("returnTo");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-lg font-bold text-white">
              FS
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Frago</p>
              <p className="text-base font-bold text-slate-900">Brand Owner Suite</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-slate-700">Đăng nhập</Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-blue-600 text-white hover:bg-blue-700">Bắt đầu</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <Badge className="mb-4 bg-blue-50 text-blue-700 hover:bg-blue-100">Dành riêng cho Franchise Brand Owner</Badge>
          <h1 className="text-4xl font-bold text-slate-900">Bảng tính phí mặt bằng & vận hành</h1>
          <p className="mt-4 text-lg text-slate-600">
            Chỉ từ 1.500.000đ/tháng cho một điểm kinh doanh, giảm ngay 20% khi thanh toán theo năm.
            Thiết kế tối ưu cho chủ thương hiệu muốn kiểm soát chi phí và mở rộng nhanh chóng.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3 text-sm font-medium text-slate-700">
            <span className={!isYearly ? "text-slate-900" : "text-slate-500"}>Thanh toán hàng tháng</span>
            <Switch
              checked={isYearly}
              onCheckedChange={(value) => setBillingCycle(value ? "yearly" : "monthly")}
            />
            <span className={isYearly ? "text-slate-900" : "text-slate-500"}>Thanh toán hàng năm</span>
            <Badge className="bg-emerald-50 text-emerald-700">Tiết kiệm 20%</Badge>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[2fr,1fr]">
          <Card className="shadow-lg shadow-blue-100">
            <CardHeader className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <CardTitle className="text-2xl">Phí mặt bằng cố định</CardTitle>
                <CardDescription className="text-base text-slate-600">
                  Áp dụng cho từng điểm kinh doanh trong hệ thống của bạn.
                </CardDescription>
              </div>
              {isYearly && (
                <Badge className="bg-amber-50 text-amber-700">Gói tiết kiệm nhất</Badge>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col gap-3 rounded-2xl bg-slate-50 p-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{currentPlan.label}</p>
                  <div className="mt-2 flex items-baseline gap-2 text-5xl font-bold text-slate-900">
                    {isYearly ? (
                      <>
                        <span>{currentPlan.price.toLocaleString("vi-VN")}đ</span>
                        <span className="text-lg font-semibold text-slate-500">/năm</span>
                      </>
                    ) : (
                      <>
                        <span>{currentPlan.price.toLocaleString("vi-VN")}đ</span>
                        <span className="text-lg font-semibold text-slate-500">/tháng</span>
                      </>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{currentPlan.helper}</p>
                  {isYearly && "strikePrice" in currentPlan && currentPlan.strikePrice && (
                    <p className="text-sm text-emerald-700">
                      Giá gốc {currentPlan.strikePrice.toLocaleString("vi-VN")}đ/năm · Bạn chỉ trả {currentPlan.effectiveMonthly.toLocaleString("vi-VN")}đ mỗi tháng
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-3 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">Ưu đãi</span>
                    <span>Giảm ngay 20% khi thanh toán trước</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">Linh hoạt</span>
                    <span>Hỗ trợ chuyển điểm kinh doanh bất kỳ lúc nào</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-semibold text-purple-700">Tối ưu</span>
                    <span>Bao gồm dashboard theo dõi chi phí và báo cáo ROI</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3 rounded-xl border border-slate-200 p-5">
                  <h3 className="text-lg font-semibold text-slate-900">Chi phí đã bao gồm</h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-center gap-2"><span className="text-emerald-500">•</span>Quản lý 01 điểm kinh doanh (POS, tồn kho, lịch bán)</li>
                    <li className="flex items-center gap-2"><span className="text-emerald-500">•</span>Hỗ trợ onboarding & checklist vận hành chuẩn hóa</li>
                    <li className="flex items-center gap-2"><span className="text-emerald-500">•</span>Báo cáo tài chính cơ bản & export dữ liệu</li>
                    <li className="flex items-center gap-2"><span className="text-emerald-500">•</span>Hỗ trợ email & chat trong giờ hành chính</li>
                  </ul>
                </div>
                <div className="space-y-3 rounded-xl border border-blue-100 bg-blue-50/80 p-5">
                  <h3 className="text-lg font-semibold text-slate-900">Tùy chọn mở rộng</h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-center gap-2"><span className="text-blue-600">•</span>Thêm điểm kinh doanh: 1.200.000đ/tháng/điểm</li>
                    <li className="flex items-center gap-2"><span className="text-blue-600">•</span>Marketing kit địa phương & landing page</li>
                    <li className="flex items-center gap-2"><span className="text-blue-600">•</span>Đào tạo quản lý & KPI theo ngành hàng</li>
                    <li className="flex items-center gap-2"><span className="text-blue-600">•</span>Tư vấn tối ưu thuê mặt bằng & định giá menu</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 border-t bg-white/60 py-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-slate-600">
                Giá đã bao gồm đầy đủ cho 01 điểm. Có thể nâng cấp thêm điểm bất cứ lúc nào.
              </div>
              <div className="flex gap-3">
                <Link href="/auth/register">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">Đăng ký Brand Owner</Button>
                </Link>
                {returnTo && (
                  <Button
                    variant="outline"
                    className="border-slate-200 text-slate-800 hover:bg-slate-100"
                    onClick={() => router.push(returnTo)}
                  >
                    Tiếp tục tạo hồ sơ
                  </Button>
                )}
                <Link href="/pricing">
                  <Button variant="outline" className="border-slate-200 text-slate-800 hover:bg-slate-100">Xem bảng giá chung</Button>
                </Link>
              </div>
            </CardFooter>
          </Card>

          <Card className="h-full border-0 bg-gradient-to-br from-slate-900 to-blue-900 text-white shadow-xl">
            <CardHeader className="space-y-3">
              <Badge className="w-fit bg-white/15 text-white">Quyền lợi nổi bật</Badge>
              <CardTitle className="text-2xl">Tối ưu cho Brand Owner</CardTitle>
              <CardDescription className="text-slate-200">
                Nhanh chóng triển khai điểm mới, kiểm soát chất lượng và bảo vệ biên lợi nhuận.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-slate-100">
              <div className="rounded-lg bg-white/5 p-3">
                <p className="font-semibold">01 dashboard cho toàn bộ hệ thống</p>
                <p className="text-slate-200">Theo dõi doanh thu, chi phí mặt bằng, ROI theo từng điểm và cảnh báo vượt ngưỡng.</p>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <p className="font-semibold">Quy trình chuẩn hóa</p>
                <p className="text-slate-200">Checklist vận hành, đào tạo nhân sự và tài liệu SOP giúp bạn nhân bản mô hình nhanh.</p>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <p className="font-semibold">Hỗ trợ chuyên gia</p>
                <p className="text-slate-200">Tư vấn chọn mặt bằng, thiết kế layout và tối ưu chi phí cố định/biến đổi.</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button size="lg" className="w-full bg-white text-slate-900 hover:bg-slate-100">
                Nhận tư vấn triển khai
              </Button>
              <p className="text-center text-xs text-slate-200">
                Chi phí đã bao gồm VAT. Hợp đồng điện tử, kích hoạt trong 24h sau thanh toán.
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}