"use client";
import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { PaymentStatusBadge } from "@/components/PaymentStatusBadge";
// Inline fallback PaymentTimeline to avoid missing module error (replace with real component later)
const PaymentTimeline = ({ events = [] }: any) => {
    return (
        <div>
            {events.map((ev: any, idx: number) => (
                <div key={idx} className="text-sm text-muted-foreground">
                    {ev?.label ?? String(ev)}
                </div>
            ))}
        </div>
    );
};
// Mock data - replace with API call
const mockPaymentsData: Record<string, any> = {
    "PAY-001": {
        id: "PAY-001",
        amount: 1500000,
        currency: "VND",
         status: "completed" as const,
         method: "Thẻ tín dụng",
         cardLast4: "4242",
         description: "Gói Brand Owner - Tháng 11/2025",
         date: new Date("2025-11-01T10:30:00"),
          invoiceNumber: "INV-2025-001",
           billingEmail: "user@example.com",
           billingName: "Nguyễn Văn A",
           billingAddress: "123 Đường ABC, Quận 1, TP.HCM",
           taxId: "0123456789",
           subtotal: 1500000,
           tax: 0,
           total: 1500000,
            timeline: [
            { id: "1",
                 title: "Thanh toán thành công" ,
                 description: "Giao dịch đã được xử lý thành công",
                 timestamp: new Date("2025-11-01T10:30:15"),
                 type: "success" as const,
                },          
                {   id: "2",
                    title: "Đang xử lý thanh toán",
                    description: "Hệ thống đang xác thực thông tin thanh toán",
                     timestamp: new Date("2025-11-01T10:30:05"),
                     type: "success" as const,
                },   
                {   id: "2",
                    title: "Đang xử lý thanh toán",
                    description: "Hệ thống đang xác thực thông tin thanh toán",
                    timestamp: new Date("2025-11-01T10:30:05"),
                    type: "info" as const,
                },
                {   id: "3",
                    title: "Khởi tạo giao dịch",
                    description: "Yêu cầu thanh toán đã được tạo",
                    timestamp: new Date("2025-11-01T10:30:00"),
                    type: "info" as const,
                },
            ],
    },
    "PAY-002": {
        id: "PAY-002",
        amount: 1500000,
        currency: "VND",
        status: "completed" as const,
        method: "Chuyển khoản",
        bankName: "Vietcombank",
        accountNumber: "1234567890",
        description: "Gói Brand Owner - Tháng 10/2025",
        date: new Date("2025-10-01T14:20:00"),
        invoiceNumber: "INV-2025-002",
        billingEmail: "user@example.com",
        billingName: "Nguyễn Văn A",
        billingAddress: "123 Đường ABC, Quận 1, TP.HCM",
        taxId: "0123456789",
        subtotal: 1500000,
        tax: 0,
        total: 1500000,
        timeline: [
            {
                id: "1",
                title: "Thanh toán thành công",
                description: "Giao dịch đã được xử lý thành công",
                timestamp: new Date("2025-10-01T14:20:30"),
                type: "success" as const,
            },
            {
                id: "2",
                title: "Đang xử lý thanh toán",
                description: "Hệ thống đang xác thực thông tin thanh toán",
                timestamp: new Date("2025-10-01T14:20:15"),
                type: "success" as const,
            },
            {
                id: "3",
                title: "Khởi tạo giao dịch",
                description: "Yêu cầu thanh toán đã được tạo",
                timestamp: new Date("2025-10-01T14:20:00"),
                type: "info" as const,
            },
        ],
    },
    "PAY-003": {
        id: "PAY-003",
        amount: 1500000,
        currency: "VND",
        status: "pending" as const,
        method: "Thẻ tín dụng",
        cardLast4: "1234",
        description: "Gói Brand Owner - Tháng 12/2025",
        date: new Date("2025-12-01T09:15:00"),
        invoiceNumber: "INV-2024-003",
        billingEmail: "user@example.com",
        billingName: "Nguyễn Văn A",
        billingAddress: "123 Đường ABC, Quận 1, TP.HCM",
        taxId: "0123456789",
        subtotal: 1500000,
        tax: 0,
        total: 1500000,
        timeline: [
            {   id: "1",  
                title: "Đang xử lý thanh toán",
                description: "Hệ thống đang xác thực thông tin thanh toán",
                timestamp: new Date("2025-12-01T09:15:20"),
                type: "warning" as const,
            },
            {   id: "2",
                title: "Khởi tạo giao dịch",
                description: "Yêu cầu thanh toán đã được tạo",
                timestamp: new Date("2025-12-01T09:15:00"),
                type: "info" as const,
            },
        ],
    },
    "PAY-004": {
    id: "PAY-004",
    amount: 14400000,
    currency: "VND",
    status: "completed" as const,
    method: "Chuyển khoản",
    bankName: "Techcombank",
    accountNumber: "0987654321",
    description: "Gói Brand Owner - Năm 2025",
    date: new Date("2024-01-01T11:00:00"),
    invoiceNumber: "INV-2024-004",
    billingEmail: "user@example.com",
    billingName: "Nguyễn Văn A",
    billingAddress: "123 Đường ABC, Quận 1, TP.HCM",
    taxId: "0123456789",
    subtotal: 18000000,
     discount: 3600000,
     tax: 0,
     total: 14400000,
     timeline: [
        {
            id: "1",
            title: "Thanh toán thành công",
            description: "Giao dịch đã được xử lý thành công",
            timestamp: new Date("2025-01-01T11:00:30"),
            type: "success" as const,
        },     
        {
            id: "2",
            title: "Đang xử lý thanh toán",
            description: "Hệ thống đang xác thực thông tin thanh toán",
            timestamp: new Date("2025-01-01T11:00:15"),
            type: "success" as const,   
        },   
        {
            id: "3",         
            title: "Khởi tạo giao dịch",
            description: "Yêu cầu thanh toán đã được tạo",
            timestamp: new Date("2024-01-01T11:00:00"),
            type: "info" as const,
        },
     ],
    },
    "PAY-005": {
        id: "PAY-005",
        amount: 1500000,
        currency: "VND",
        status: "failed" as const,
        method: "Thẻ tín dụng",
        cardLast4: "5678",
        description: "Gói Brand Owner - Tháng 09/2024",
        date: new Date("2024-09-01T13:45:00"),
        invoiceNumber: "INV-2024-005",
        billingEmail: "user@example.com",
        billingName: "Nguyễn Văn A",
        billingAddress: "123 Đường ABC, Quận 1, TP.HCM",
        taxId: "0123456789",
        subtotal: 1500000,
        tax: 0,
        total: 1500000,
        failureReason: "Số dư không đủ",
        timeline: [
            {
                id: "1",
                title: "Thanh toán thất bại",
                description: "Giao dịch không thành công do lỗi xác thực",
                timestamp: new Date("2024-09-01T13:45:20"),
                type: "error" as const,
            },
            {
                id: "2",
                title: "Đang xử lý thanh toán",
                description: "Hệ thống đang xác thực thông tin thanh toán",
                timestamp: new Date("2024-09-01T13:45:10"),
                type: "info" as const,
            },
            {
                id: "3",
                title: "Khởi tạo giao dịch",
                description: "Yêu cầu thanh toán đã được tạo",
                timestamp: new Date("2024-09-01T13:45:00"),
                type: "info" as const,
            },
        ],
    },
};
export default function PaymentDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const router = useRouter();
    const { id } = use(params);
    const payment = mockPaymentsData[id];
    if (!payment) {
        return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Không tìm thấy giao dịch</CardTitle>
                <CardDescription>
                Giao dịch với ID <strong>{id}</strong> không tồn tại.
                </CardDescription>
            </CardHeader> 
            <CardContent>
                <Link href="/payments">
                <Button className="w-full">Quay lại danh sách</Button>
                </Link>
            </CardContent>
            </Card>
        </div>
        );
    }
    const handleDownloadInvoice = () => {
     // Implement invoice download logic
     alert("Tính năng tải hóa đơn sẽ được triển khai");
    };
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur">
              <div className="container mx-auto flex items-center justify-between px-6 py-4">
                <Link href="/" className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-lg font-bold text-white">FS</div>
                  <div>
                    <p className="text-sm font-semibold text-slate-500">Frago</p>
                    <p className="text-base font-bold text-slate-900">Chi tiết thanh toán</p>
                  </div>
                </Link>
                <div className="flex items-center gap-3"></div>
                <div className="flex items-center gap-2">
                  <Link href="/payments">
                    <Button variant="ghost" className="text-slate-700">quay lại</Button>
                  </Link>
                  <Button variant="outline" className="border-slate-200" onClick={handleDownloadInvoice}>Tải hóa đơn</Button>
                </div>
              </div>
            </header>
    
            <main className="container mx-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Thông tin giao dịch</CardTitle>
                    <CardDescription>Giao dịch {payment.id} — {format(payment.date, "PPpp", { locale: vi })}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-600">Số tiền</div>
                        <div className="font-medium">{payment.amount.toLocaleString("vi-VN")} {payment.currency}</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-600">Phương thức</div>
                        <div className="font-medium">{payment.method}</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-600">Trạng thái</div>
                        <PaymentStatusBadge status={payment.status} />
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Timeline</h4>
                      <PaymentTimeline events={payment.timeline} />
                    </div>
                  </CardContent>
                </Card>
    
                <Card>
                  <CardHeader>
                    <CardTitle>Hóa đơn</CardTitle>
                    <CardDescription>Chi tiết về giao dịch này</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                        <p className="text-sm font-medium text-slate-500">Mã giao dịch</p>
                        <p className="mt-1 font-mono text-sm font-semibold text-slate-900"> {payment.id} </p>
                         </div><div>
                             <p className="text-sm font-medium text-slate-500">Số hóa đơn</p>
                             <p className="mt-1 font-mono text-sm font-semibold text-slate-900">
                                 {payment.invoiceNumber}
                        </p>
                    </div>
                    <div>
                         <p className="text-sm font-medium text-slate-500">Phương thức</p>
                         <p className="mt-1 text-sm font-semibold text-slate-900"></p>
                                {payment.method}
                    </div>
                    <div><p className="text-sm font-medium text-slate-500">Ngày giao dịch</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                        {format(payment.date, "dd/MM/yyyy HH:mm", { locale: vi })}
                        </p>
                    </div>
                    <div> 
                    </div> <Separator />
                    {/* Payment Method Details */}
                    {payment.cardLast4 && (
                        <div className="rounded-lg bg-slate-50 p-4">
                            <p className="text-sm font-medium text-slate-700">Phương thức thanh toán</p>
                            <div className="mt-2 flex items-center gap-2">
                                <Badge variant="outline">{payment.cardBrand}</Badge>
                                <span className="font-mono text-sm">**** **** **** {payment.cardLast4}</span>
                            </div>
                        </div>
                    )}
                    {payment.bankName && (
                        <div className="rounded-lg bg-slate-50 p-4">
                            <p className="text-sm font-medium text-slate-700">Thông tin chuyển khoản</p>
                            <div className="mt-2 space-y-1">
                            <p className="text-sm text-slate-900">
                                <span className="font-medium">Ngân hàng:</span>{" "}{payment.bankName}
                            </p>
                            <p className="font-mono text-sm text-slate-900">
                                <span className="font-medium">STK:</span>{" "}  {payment.accountNumber}
                            </p>
                            </div>
                        </div>
                    )}
                    {payment.failureReason && (
                         <div className="rounded-lg bg-red-50 p-4">
                             <p className="text-sm font-medium text-red-700">
                                    Lý do thất bại
                             </p>
                             <p className="mt-1 text-sm text-red-600"> {payment.failureReason}</p>
                            </div>
                    )}
                    <Separator />
                    <div>
                        <p className="text-sm font-medium text-slate-500">Mô tả</p>
                         <p className="mt-1 text-sm text-slate-900">{payment.description}</p>
                    </div>
                  </CardContent>
                </Card>
                {/* Invoice Details */}
                <Card><CardHeader>
                    <CardTitle>Chi tiết hóa đơn</CardTitle>
                    <CardDescription>Thông tin thanh toán và hóa đơn</CardDescription>
                    </CardHeader>
                    <CardContent> className="space-y-4"
                        <div className="space-y-3">
                            <div> className="flex justify-between text-sm"
                                <span className="text-slate-600">Tạm tính</span>
                                <span className="font-semibold text-slate-900">{payment.subtotal.toLocaleString("vi-VN")}
                                {payment.subtotal.toLocaleString("vi-VN")}
                                </span>
                        </div>
                        {payment.discount && (
                            <div className="flex justify-between text-sm">
                                <span className="text-emerald-600">Giảm giá (20%)</span>
                                <span className="font-semibold text-emerald-600">
                                    -{payment.discount.toLocaleString("vi-VN")}
                                </span>
                            </div>
                        )}
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Thuế (VAT)</span>
                            <span className="font-semibold text-slate-900">
                                {payment.tax.toLocaleString("vi-VN")}
                            </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                            <span className="text-base font-semibold text-slate-900">
                                Tổng cộng
                            </span>
                             <span className="text-2xl font-bold text-slate-900">
                                {payment.total.toLocaleString("vi-VN")}
                             </span>
                        </div>
                        </div>
                        <Separator />
                        <div className="space-y-2 text-sm">
                             <div className="flex justify-between">
                                <span className="text-slate-600">Tên khách hàng</span>
                                <span className="font-medium text-slate-900">
                                    {payment.billingName}
                                </span>
                             </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Email</span>
                                    <span className="font-mono font-medium text-slate-900">
                                        {payment.taxid}
                                    </span>
                        </div>
                    <div className="flex justify-between">
                        <span className="text-slate-600">Địa chỉ</span>
                        <span className="text-right font-medium text-slate-900">
                            {payment.billingAddress} 
                        </span>
                    </div>
                    </div>
                    </CardContent>
                </Card>
                {/* Timeline */}
                <Card>
                    <CardHeader>
                        <CardTitle>Lịch sử giao dịch</CardTitle>
                        <CardDescription>Theo dõi trạng thái của giao dịch theo thời gian</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PaymentTimeline events={payment.timeline} />
                    </CardContent>
                </Card>
              </div>
              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card>
            <CardHeader>
                <CardTitle>Hành động</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleDownloadInvoice}>
                    Tải hóa đơn
                </Button>
                <Button className="w-full" variant="outline">
                    Gửi email hóa đơn
                </Button>
                 {payment.status !== "failed" && (
                    <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                        Thử lại thanh toán
                    </Button>
                    )}
                    {payment.status === "completed" && (
                    <Button className="w-full" variant="outline">
                        Yêu cầu hoàn tiền
                    </Button>
                    )}
            </CardContent>
        </Card>
         {/* Support */}
         <Card className="border-blue-200 bg-blue-50/50">
         <CardHeader><CardTitle className="text-blue-900">Cần hỗ trợ?</CardTitle>
         <CardDescription className="text-blue-700">
            Liên hệ với chúng tôi nếu bạn có bất kì câu hỏi nào</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                     Chat với hỗ trợ</Button>
                     <div className="text-center text-sm text-blue-700">
                        <p>Email: support@frago.vn</p>
                        <p>Hotline: 1900 xxxx</p>
                        </div>
                    </CardContent>
                </Card>
              </div>
            </main>
          </div>
        );
      }


