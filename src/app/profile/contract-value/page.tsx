"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function ContractValuePage() {
  const router = useRouter();
  const [contractType, setContractType] = useState<"expected" | "official">("expected");
  const [contractValue, setContractValue] = useState("");
  const [dealCount, setDealCount] = useState("");
  const [evidence, setEvidence] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEvidence(e.target.files[0]);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contractValue || !dealCount || !evidence) {
      alert("Vui lòng điền đầy đủ thông tin và tải lên bằng chứng");
      return;
    }
    setIsSubmitting(true);
    try {
      // Get current user data
      const userData = localStorage.getItem("user");
      const userId = userData ? JSON.parse(userData).id : "current-user";
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("contractType", contractType);
      formData.append("contractValue", contractValue);
      formData.append("dealCount", dealCount);
      formData.append("evidence", evidence);
      const response = await fetch("/api/contracts", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        // Show success message
        const successDiv = document.createElement("div");
        successDiv.innerHTML = `
          <div style="position: fixed; top: 20px; right: 20px; background: #10B981; color: white; padding: 16px 24px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 1000; font-family: system-ui;">
            ✅ Đã gửi thông tin hợp đồng! Đang chờ xác minh từ admin...
          </div>
        `;
        document.body.appendChild(successDiv);
        setTimeout(() => {
          document.body.removeChild(successDiv);
          router.push("/dashboard");
        }, 2500);
      } else {
        alert("Lỗi khi gửi thông tin. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Contract submission error:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <img src="/logo.svg" alt="Frago Logo" className="h-16 w-auto" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Thông tin giá trị hợp đồng
          </h1>
          <p className="text-gray-600">
            Vui lòng cung cấp thông tin giá trị hợp đồng và bằng chứng để xác minh
          </p>
        </div>
        {/* Main Form Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Nhập thông tin hợp đồng</CardTitle>
            <CardDescription>
              Thông tin này sẽ được gửi đến admin để xác minh trước khi kích hoạt tính năng kết nối
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contract Type */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Loại hợp đồng</Label>
                <RadioGroup
                  value={contractType}
                  onValueChange={(value: "expected" | "official") => setContractType(value)}
                >
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="expected" id="expected" />
                    <Label htmlFor="expected" className="flex-1 cursor-pointer">
                      <div className="font-medium">Giá trị hợp đồng dự kiến</div>
                      <div className="text-sm text-gray-500">
                        Trước khi match với đối tác
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="official" id="official" />
                    <Label htmlFor="official" className="flex-1 cursor-pointer">
                      <div className="font-medium">Giá trị hợp đồng chính thức</div>
                      <div className="text-sm text-gray-500">
                        Sau khi ký kết (yêu cầu bằng chứng/đối soát)
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              {/* Contract Value */}
              <div className="space-y-2">
                <Label htmlFor="contractValue" className="text-base font-semibold">
                  Giá trị hợp đồng (VND)
                </Label>
                <div className="relative">
                  <Input
                    id="contractValue"
                    type="number"
                    placeholder="Ví dụ: 50000000"
                    value={contractValue}
                    onChange={(e) => setContractValue(e.target.value)}
                    min="0"
                    required
                    className="text-base"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Tổng giá trị hợp đồng bằng VND
                </p>
              </div>
              {/* Deal Count */}
              <div className="space-y-2">
                <Label htmlFor="dealCount" className="text-base font-semibold">
                  Số lượng giao dịch
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="dealCount"
                    type="number"
                    placeholder="Ví dụ: 1"
                    value={dealCount}
                    onChange={(e) => setDealCount(e.target.value)}
                    min="1"
                    required
                    className="text-base"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Số lượng giao dịch/deal trong hợp đồng này
                </p>
              </div>
              {/* Evidence Upload */}
              <div className="space-y-2">
                <Label htmlFor="evidence" className="text-base font-semibold">
                  Bằng chứng / Tài liệu đối soát
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    id="evidence"
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    className="hidden"
                    required
                  />
                  <Label
                    htmlFor="evidence"
                    className="cursor-pointer flex flex-col items-center space-y-2"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">📄</span>
                    </div>
                    {evidence ? (
                      <div className="text-sm">
                        <p className="font-medium text-blue-600">{evidence.name}</p>
                        <p className="text-gray-500">
                          {(evidence.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div className="text-sm">
                        <p className="font-medium text-gray-700">
                          Nhấp để tải lên tài liệu
                        </p>
                        <p className="text-gray-500">
                          PDF, JPG, PNG, DOC (tối đa 10MB)
                        </p>
                      </div>
                    )}
                  </Label>
                </div>
                <p className="text-sm text-gray-500">
                  Tải lên hợp đồng, biên bản, hoặc tài liệu xác nhận giá trị giao dịch
                </p>
              </div>
              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <span className="text-blue-600 text-xl">ℹ️</span>
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">Lưu ý quan trọng:</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Thông tin sẽ được admin xác minh trong vòng 24-48 giờ</li>
                      <li>Sau khi xác minh, chi phí kết nối sẽ được hiển thị khi bạn match</li>
                      <li>Chi phí được tính dựa trên số lượng giao dịch theo bảng giá</li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Quay lại
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang gửi..." : "Xác nhận và gửi"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        {/* Pricing Reference */}
      </div>
    </div>
  );
}