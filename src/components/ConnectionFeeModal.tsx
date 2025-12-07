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

export default function ConnectionFeeModal({
  isOpen,

  onClose,

  onConfirm,

  matchedCompany = "Business Partner",
}: ConnectionFeeModalProps) {
  const [contractValue, setContractValue] = useState<string>("");

  const [connectionFee, setConnectionFee] = useState<number>(0);

  const [totalCost, setTotalCost] = useState<number>(0);

  // Calculate fee whenever contract value changes

  useEffect(() => {
    const value = parseFloat(contractValue) || 0;

    const fee = value * 0.05; // 5% fee

    setConnectionFee(fee);

    setTotalCost(fee); // For MVP, total cost = fee
  }, [contractValue]);

  const handleConfirm = () => {
    const value = parseFloat(contractValue) || 0;

    if (value > 0) {
      onConfirm(value, connectionFee);

      handleClose();
    }
  };

  const handleClose = () => {
    setContractValue("");

    setConnectionFee(0);

    setTotalCost(0);

    onClose();
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",

      currency: "USD",

      minimumFractionDigits: 2,

      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Connection Fee Calculator
          </DialogTitle>

          <DialogDescription className="text-gray-600">
            This fee applies when two businesses match successfully.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Match Success Message */}

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">❤️</div>

            <p className="text-sm font-medium text-green-800">
              Connection Successful!
            </p>

            <p className="text-xs text-green-600 mt-1">
              You matched with{" "}
              <span className="font-semibold">{matchedCompany}</span>
            </p>
          </div>

          {/* Contract Value Input */}

          <div className="space-y-2">
            <Label
              htmlFor="contractValue"
              className="text-sm font-medium text-gray-700"
            >
              Contract Value (USD)
            </Label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>

              <Input
                id="contractValue"
                type="number"
                placeholder="0.00"
                value={contractValue}
                onChange={(e) => setContractValue(e.target.value)}
                className="pl-7 text-base"
                min="0"
                step="0.01"
              />
            </div>

            <p className="text-xs text-gray-500">
              Enter the total value of your business deal contract
            </p>
          </div>

          {/* Fee Calculation Display */}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Connection Fee (5%)</span>

              <span className="text-lg font-semibold text-blue-600">
                {formatCurrency(connectionFee)}
              </span>
            </div>

            <div className="border-t border-blue-200 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-gray-900">
                  Total Cost
                </span>

                <span className="text-xl font-bold text-gray-900">
                  {formatCurrency(totalCost)}
                </span>
              </div>
            </div>
          </div>

          {/* Info Note */}

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <p className="text-xs text-gray-600 leading-relaxed">
              <span className="font-semibold">Note:</span> The connection fee is
              calculated as 5% of your contract value. This fee enables our
              platform to facilitate successful business partnerships.
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={!contractValue || parseFloat(contractValue) <= 0}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
          >
            Confirm Connection Fee
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
