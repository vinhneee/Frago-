import { NextRequest, NextResponse } from "next/server";
import { contractsDB } from "@/lib/contractsDB";

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { contractId, status, adminId } = body;

    console.log("=== VERIFY CONTRACT REQUEST ===");
    console.log("Request body:", { contractId, status, adminId });
    console.log("Current contracts in DB:", contractsDB.length);
    console.log("Contracts:", contractsDB.map(c => ({ id: c.id, status: c.status })));

    if (!contractId || !status || !adminId) {
      console.log("Missing required fields");
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (status !== "verified" && status !== "rejected") {
      console.log("Invalid status:", status);
      return NextResponse.json(
        { success: false, error: "Invalid status. Must be 'verified' or 'rejected'" },
        { status: 400 }
      );
    }

    // Find the contract
    const contractIndex = contractsDB.findIndex((c) => c.id === contractId);
    console.log("Contract index found:", contractIndex);

    if (contractIndex === -1) {
      console.log("Contract not found. Looking for:", contractId);
      console.log("Available contracts:", contractsDB.map(c => c.id));
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

    console.log("Contract updated successfully:", contractsDB[contractIndex]);

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
