import { NextRequest, NextResponse } from "next/server";
import { contractsDB } from "@/lib/contractsDB";

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { contractId, status, adminId } = body;

    if (!contractId || !status || !adminId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (status !== "verified" && status !== "rejected") {
      return NextResponse.json(
        { success: false, error: "Invalid status. Must be 'verified' or 'rejected'" },
        { status: 400 }
      );
    }

    // Find the contract
    const contractIndex = contractsDB.findIndex((c) => c.id === contractId);

    if (contractIndex === -1) {
      return NextResponse.json(
        { success: false, error: "Contract not found" },
        { status: 404 }
      );
    }

    // Update the contract
    contractsDB[contractIndex] = {
      ...contractsDB[contractIndex],
      status,
      verifiedAt: new Date().toISOString(),
      verifiedBy: adminId,
    };

    return NextResponse.json({
      success: true,
      contract: contractsDB[contractIndex],
      message: `Contract ${status} successfully`,
    });
  } catch (error) {
    console.error("Contract verification error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to verify contract" },
      { status: 500 }
    );
  }
}
