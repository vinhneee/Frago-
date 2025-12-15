"use client";
import { useState } from "react";
import Link from "next/link";
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PaymentStatusBadge } from "@/components/PaymentStatusBadge";
// Mock data - replace with API call
const mockPayments = [
    {
        id: "PAY-001",
        amount: 5000000,
        currency: "VND",
        status: "completed" as const,
        method: "Credit Card",
        description: "Gói Brand Owner - Tháng 11/2025",
        date: new Date("2025-05-01T10:30:00"),
        invoiceId: "inv_001",
    },
    {
        id: "PAY-002",
        amount: 5000000,
        currency: "VND",
        status: "pending" as const,
        method: "Bank Transfer",
        description: "Gói Brand Owner - Tháng 10/2025",
        date: new Date("2025-05-03T14:15:00"),
        invoiceId: "inv_002",
    },
    {
        id: "PAY-003",
        amount: 5000000,
        currency: "VND",
        status: "failed" as const,
        method: "Momo",
        description: "Gói Brand Owner - Tháng 11/2025",
        date: new Date("2025-05-05T09:45:00"),
        invoiceId: "inv_003",
    },
    {
        id: "PAY-004",
        amount: 5000000,
        currency: "VND",
        status: "refunded" as const,
        method: "Credit Card",
        description: "Gói Brand Owner - Tháng 12/2025(giảm 20%)",
        date: new Date("2025-06-01T11:00:00"),
        invoiceId: "inv_004",
    },
    {
        id: "PAY-005",
        amount: 5000000,
        currency: "VND",
        status: "failed" as const,
        method: "Credit Card",
        description: "Gói Brand Owner - Tháng 01/2025",
        date: new Date("2025-06-10T16:20:00"),
        invoiceId: "INV-005",
    },
];
export default function PaymentsPage() {
    const [filter, setFilter] = useState<"all" | "completed" | "pending" | "failed">("all");
    const filteredPayments = mockPayments.filter((payment) => {
         if (filter === "all") return true;
         return payment.status === filter;
         });
         const totalPaid = mockPayments
         .filter((p) => p.status === "completed")
         .reduce((sum, p) => sum + p.amount, 0);
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">     
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
           <Link href="/" className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <img src="/logo.svg" alt="Frago Logo" className="h-16 w-auto" />
            </div>
           </Link>
                <div className="flex items-center gap-3">
                <Link href="/dashboard">
                <Button variant="ghost" className="text-slate-700">
                    Dashboard
                    </Button>
                    </Link>
                    <Link href="/profile">
                    <Button variant="outline" className="border-slate-200">
                        Hồ sơ
                        </Button>
                        </Link>
                        </div>
                        </div>
                        </header>  
                    <main className="container mx-auto px-6 py-8">

                    {/* Page Header */}
                          <div className="mb-8">
                            <h1 className="text-3xl font-bold text-slate-900">Lịch sử thanh toán</h1>
                            <p className="mt-2 text-slate-600">
                                Quản lý và theo dõi tất cả các giao dịch thanh toán của bạn
                            </p>
                          </div>
                          {/* Stats Cards */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                            <Card>
                              <CardHeader>
                                <CardTitle>Tổng thanh toán</CardTitle>
                                <CardDescription>Tổng tiền đã thanh toán</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="text-2xl font-semibold">{totalPaid.toLocaleString()} VND</div>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader>
                                <CardTitle>Tổng giao dịch</CardTitle>
                                <CardDescription>Tổng số giao dịch</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="text-2xl font-semibold">{mockPayments.length}</div>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader>
                                <CardTitle>Trạng thái</CardTitle>
                                <CardDescription>Lọc theo trạng thái</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="flex gap-2">
                                  <Button variant={filter === "all" ? "default" : "ghost"} onClick={() => setFilter("all")}>Tất cả</Button>
                                  <Button variant={filter === "completed" ? "default" : "ghost"} onClick={() => setFilter("completed")}>Hoàn thành</Button>
                                  <Button variant={filter === "pending" ? "default" : "ghost"} onClick={() => setFilter("pending")}>Đang xử lý</Button>
                                  <Button variant={filter === "failed" ? "default" : "ghost"} onClick={() => setFilter("failed")}>Thất bại</Button>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                          {/* Payments Table */}
                          <Card>
                            <CardHeader>
                              <CardTitle>Danh sách giao dịch</CardTitle>
                              <CardDescription>Hiển thị các giao dịch gần đây</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Id</TableHead>
                                    <TableHead>Mô tả</TableHead>
                                    <TableHead>Ngày</TableHead>
                                    <TableHead>Phương thức</TableHead>
                                    <TableHead>Số tiền</TableHead>
                                    <TableHead className="text-center">Trạng thái</TableHead>
                                    <TableHead className="text-right">Hành động</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                {filteredPayments.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center text-slate-500">
                                         Không có giao dịch nào </TableCell>
                                    </TableRow>
                                    ) : (filteredPayments.map((payment) => (
                                      <TableRow key={payment.id}>
                                        <TableCell className="font-mono text-sm">{payment.id}</TableCell>
                                        <TableCell>
                                          <div>
                                            <p className="font-medium text-slate-900">
                                              {payment.description}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                              {payment.invoiceId}
                                            </p>
                                          </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-slate-600">
                                          {format(payment.date, "dd/MM/yyyy", { locale: vi })}
                                        </TableCell>
                                        <TableCell>
                                          <Badge variant="outline" className="text-xs">
                                            {payment.method}
                                          </Badge>
                                        </TableCell>
                                        <TableCell className="font-semibold text-slate-900">
                                          {payment.amount.toLocaleString("vi-VN")}đ
                                        </TableCell>
                                        <TableCell>
                                          <PaymentStatusBadge status={payment.status} />
                                        </TableCell>
                                        <TableCell className="text-right">
                                          <Link href={`/payments/${payment.id}`}>
                                            <Button variant="ghost" size="sm">
                                              Chi tiết
                                            </Button>
                                          </Link>
                                        </TableCell>
                                      </TableRow>
                                    ))
                                  )}
                                </TableBody>
                              </Table>
                            </CardContent>
                          </Card>
                    </main>
        </div>
    );
}