"use client";

import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";

interface ConnectionFeeModalProps {
  isOpen: boolean;

  onClose: () => void;

  onConfirm: (contractValue: number, fee: number) => void;

  matchedCompany?: string;
}
// Calculate connection fee based on contract value tiers (in VND)
const calculateConnectionFee = (contractValue: number): number => {
  const valueInMillions = contractValue / 1000000; // Convert to millions
  
  if (valueInMillions < 50) return 800000;           // < 50 triệu
  if (valueInMillions >= 50 && valueInMillions < 100) return 2500000;   // 50-100 triệu
  if (valueInMillions >= 100 && valueInMillions < 300) return 3000000;  // 100-300 triệu
  if (valueInMillions >= 300 && valueInMillions < 700) return 10000000; // 300-700 triệu
  if (valueInMillions >= 700 && valueInMillions < 1000) return 12750000; // 700-1000 triệu
  return 14000000; // >= 1000 triệu (1 tỷ+)
};
export default function ConnectionFeeModal({
  isOpen,

  onClose,

  onConfirm,

  matchedCompany = "Business Partner",
}: ConnectionFeeModalProps) {
  const [contractValue, setContractValue] = useState<number>(0);
  const [dealCount, setDealCount] = useState<number>(0);
  const [connectionFee, setConnectionFee] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  useEffect(() => {

    if (isOpen) {
 
      fetchContractData();
 
    }
 
  }, [isOpen]);
 
 
 
  const fetchContractData = async () => {
 
    setIsLoading(true);
 
    try {
 
      // Get current user data
 
      const userData = localStorage.getItem("user");
 
      const userId = userData ? JSON.parse(userData).id : "current-user";
 
 
 
      const response = await fetch(`/api/contracts?userId=${userId}`);
 
      const result = await response.json();
 
 
 
      if (result.success && result.contracts.length > 0) {
 
        // Get the most recent verified contract
 
        const verifiedContract = result.contracts.find(
 
          (c: any) => c.status === "verified"
 
        );
 
 
 
        if (verifiedContract) {
          setContractValue(verifiedContract.contractValue);
          setDealCount(verifiedContract.dealCount);
          const fee = calculateConnectionFee(verifiedContract.contractValue);
          setConnectionFee(fee);
        } else {
 
          // No verified contract found
 
          setContractValue(0);
 
          setDealCount(0);
 
          setConnectionFee(0);
 
        }
 
      }
 
    } catch (error) {
 
      console.error("Error fetching contract data:", error);
 
    } finally {
 
      setIsLoading(false);
    }
  };
  const handleClose = () => {
    setContractValue(0);
    setDealCount(0);
    setConnectionFee(0);
    setIsLoading(true);
    setIsRedirecting(false);
    onClose();
  };
  const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN", {
      style: "currency",
       currency: "VND",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  const getTierDescription = (contractValue: number): string => {
    const valueInMillions = contractValue / 1000000;
    
    if (valueInMillions < 50) return "Dưới 50 triệu";
    if (valueInMillions >= 50 && valueInMillions < 100) return "50 - 100 triệu";
    if (valueInMillions >= 100 && valueInMillions < 300) return "100 - 300 triệu";
    if (valueInMillions >= 300 && valueInMillions < 700) return "300 - 700 triệu";
    if (valueInMillions >= 700 && valueInMillions < 1000) return "700 triệu - 1 tỷ";
    return "Trên 1 tỷ";
  };
  
  const getFeeForTier = (contractValue: number): string => {
    const valueInMillions = contractValue / 1000000;
    
    if (valueInMillions < 50) return "800,000 VNĐ";
    if (valueInMillions >= 50 && valueInMillions < 100) return "2,500,000 VNĐ";
    if (valueInMillions >= 100 && valueInMillions < 300) return "3,000,000 VNĐ";
    if (valueInMillions >= 300 && valueInMillions < 700) return "10,000,000 VNĐ";
    if (valueInMillions >= 700 && valueInMillions < 1000) return "12,750,000 VNĐ";
    return "14,000,000 VNĐ";
  };
  const handleConfirm = async () => {
    setIsRedirecting(true);
    
    try {
      // Call the parent's onConfirm callback with contract value and fee
      onConfirm(contractValue, connectionFee);
      
      // Create a payment record
      const userData = localStorage.getItem("user");
      const userId = userData ? JSON.parse(userData).id : "current-user";
      
      const paymentData = {
        userId,
        amount: connectionFee,
        currency: "VND",
        description: `Chi phí kết nối với ${matchedCompany}`,
        contractValue,
        dealCount,
        matchedCompany,
        type: "connection_fee",
        status: "pending",
      };
      
      // Store payment info in localStorage for the payment page
      localStorage.setItem("pendingPayment", JSON.stringify(paymentData));
      
      // Redirect to payments page after a short delay
      setTimeout(() => {
        window.location.href = "/payments";
      }, 1500);
    } catch (error) {
      console.error("Error processing connection fee:", error);
      setIsRedirecting(false);
      // Could show an error toast here
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-gray-50 border border-gray-200 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
           Chi phí kết nối
          </DialogTitle>

          <DialogDescription className="text-gray-600">
             Chi phí này được áp dụng khi hai doanh nghiệp kết nối thành công
          </DialogDescription>
        </DialogHeader>
         {isLoading ? (
          <div className="py-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải thông tin...</p>
          </div>
        ) : isRedirecting ? (
          <div className="py-8 text-center">
            <div className="text-4xl mb-4">💳</div>
            <p className="text-lg font-semibold text-blue-600">
              Đang chuyển đến phần thanh toán...
            </p>
          </div>
          ) : contractValue === 0 ? (
          <div className="py-8 text-center space-y-4">
            <div className="text-4xl mb-2">⚠️</div>
            <p className="text-gray-700 font-medium">
              Chưa có thông tin hợp đồng được xác minh
            </p>
             <p className="text-sm text-gray-600">
              Vui lòng cung cấp thông tin giá trị hợp đồng và chờ admin xác minh
            </p>
            <Button
              onClick={() => {
                handleClose();
                window.location.href = "/profile/contract-value";
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Nhập thông tin hợp đồng
            </Button>
          </div>
          ) : (
          <>
            <div className="space-y-6 py-4">
              {/* Match Success Message */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">❤️</div>
                <p className="text-sm font-medium text-green-800">
                  Kết nối thành công!
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Bạn đã kết nối với{" "}
                  <span className="font-semibold">{matchedCompany}</span>
                </p>
              </div>
              {/* Contract Value Display (Read-only) */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Giá trị hợp đồng (VND)
                </Label>
                <div className="bg-gray-100 border border-gray-300 rounded-lg p-3">
                  <p className="text-lg font-bold text-gray-900">
                    {formatCurrency(contractValue)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Mức giá trị: {getTierDescription(contractValue)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Số giao dịch: {dealCount}
                  </p>
                </div>
                <p className="text-xs text-gray-500">
                  Thông tin này đã được xác minh bởi admin
                </p>
              </div>
              {/* Fee Calculation Display */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">
                    Chi phí kết nối
                  </span>
                  <span className="text-lg font-semibold text-blue-600">
                    {formatCurrency(connectionFee)}
                  </span>
                </div>
                <div className="border-t border-blue-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-medium text-gray-900">
                      Tổng chi phí
                    </span>
                    <span className="text-xl font-bold text-gray-900">
                      {formatCurrency(connectionFee)}
                    </span>
                  </div>
                </div>
              </div>
          {/* Info Note */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-xs text-gray-600 leading-relaxed">
                  <span className="font-semibold">Lưu ý:</span> Chi phí kết nối
                  được tính dựa trên giá trị hợp đồng theo bảng giá. Chi phí này
                  giúp nền tảng duy trì và phát triển dịch vụ kết nối doanh nghiệp.
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  <p className="font-semibold mb-1">Bảng giá chi phí kết nối:</p>
                  <ul className="space-y-1 ml-2">
                    <li>• Dưới 50 triệu: 800,000 VNĐ</li>
                    <li>• 50 - 100 triệu: 2,500,000 VNĐ</li>
                    <li>• 100 - 300 triệu: 3,000,000 VNĐ</li>
                    <li>• 300 - 700 triệu: 10,000,000 VNĐ</li>
                    <li>• 700 triệu - 1 tỷ: 12,750,000 VNĐ</li>
                    <li>• Trên 1 tỷ: 14,000,000 VNĐ</li>
                  </ul>
                </div>
          </div>
        </div>
         <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="w-full sm:w-auto"
              >
                Hủy
              </Button>
              <Button
                type="button"
                onClick={handleConfirm}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
              >
                Xác nhận
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
