import { NextRequest, NextResponse } from "next/server";
import { contractsDB } from "@/lib/contractsDB";
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const userId = formData.get("userId") as string;
    const contractType = formData.get("contractType") as string; // "expected" or "official"
    const contractValue = parseFloat(formData.get("contractValue") as string);
    const dealCount = parseInt(formData.get("dealCount") as string);
    const evidence = formData.get("evidence") as File | null;
    if (!userId || !contractValue || !dealCount) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }
    // Store evidence file info (in production, upload to cloud storage)
    let evidenceInfo = null;
    if (evidence) {
      evidenceInfo = {
        name: evidence.name,
        size: evidence.size,
        type: evidence.type,
        // In production, store the actual file and return URL
        url: `/uploads/${Date.now()}_${evidence.name}`,
      };
    }
    const newContract = {
      id: `contract_${Date.now()}`,
      userId,
      contractType,
      contractValue,
      dealCount,
      evidence: evidenceInfo,
      status: "pending", // pending, verified, rejected
      createdAt: new Date().toISOString(),
      verifiedAt: null,
      verifiedBy: null,
    };
    contractsDB.push(newContract);
    return NextResponse.json({
      success: true,
      contract: newContract,
      message: "Contract submitted successfully. Awaiting admin verification.",
    });
  } catch (error) {
    console.error("Contract submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit contract" },
      { status: 500 }
    );
  }
}
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    
    console.log("=== GET CONTRACTS REQUEST ===");
    console.log("User ID:", userId);
    console.log("Total contracts in DB:", contractsDB.length);
    console.log("Contracts:", contractsDB);
    
    if (userId) {
      // Get contracts for specific user
      const userContracts = contractsDB.filter((c) => c.userId === userId);
      console.log("User contracts found:", userContracts.length);
      return NextResponse.json({
        success: true,
        contracts: userContracts,
      });
    }
    // Get all contracts (for admin)
    console.log("Returning all contracts");
    return NextResponse.json({
      success: true,
      contracts: contractsDB,
    });
  } catch (error) {
    console.error("Contract fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch contracts" },
      { status: 500 }
    );
  }
}
