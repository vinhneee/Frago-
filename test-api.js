// Test script for contract verification API
const testVerifyContract = async () => {
  console.log("=== Testing Contract Verification API ===\n");
  
  // Test 1: Get all contracts
  console.log("1. Getting all contracts...");
  try {
    const response = await fetch("http://localhost:3000/api/contracts");
    const data = await response.json();
    console.log("Response:", JSON.stringify(data, null, 2));
    console.log(`Found ${data.contracts?.length || 0} contracts\n`);
  } catch (error) {
    console.error("Error:", error.message, "\n");
  }
  
  // Test 2: Verify first contract
  console.log("2. Verifying contract_1765797338941...");
  try {
    const response = await fetch("http://localhost:3000/api/contracts/verify", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contractId: "contract_1765797338941",
        status: "verified",
        adminId: "admin-test"
      })
    });
    const data = await response.json();
    console.log("Response:", JSON.stringify(data, null, 2));
    console.log();
  } catch (error) {
    console.error("Error:", error.message, "\n");
  }
  
  // Test 3: Get contracts again to verify update
  console.log("3. Getting contracts after verification...");
  try {
    const response = await fetch("http://localhost:3000/api/contracts");
    const data = await response.json();
    console.log("Response:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error:", error.message, "\n");
  }
};

// Run the test
testVerifyContract();
