// Shared in-memory database for contracts
// In production, this would be replaced with a real database
// Using globalThis to persist data across hot reloads in development

const initialContracts = [
  // Mock data 1: 5 triệu (< 50 triệu) -> Fee: 800,000 VNĐ
  {
    id: "contract_1765797338941",
    userId: "1765795838114",
    contractType: "official",
    contractValue: 5000000, // 5 triệu VNĐ
    dealCount: 1,
    evidence: {
      name: "Btap 02 Nhóm 5 (HaHa).pdf",
      size: 123456,
      type: "application/pdf",
      url: "/uploads/1765797338941_Btap 02 Nhóm 5 (HaHa).pdf"
    },
    status: "pending",
    createdAt: "2025-12-15T18:15:38.941Z",
    verifiedAt: null,
    verifiedBy: null
  },
  // Mock data 2: 50 triệu (50-100 triệu) -> Fee: 2,500,000 VNĐ
  {
    id: "contract_1765799252945",
    userId: "1765798812003",
    contractType: "expected",
    contractValue: 50000000, // 50 triệu VNĐ
    dealCount: 1,
    evidence: {
      name: "Btap 02 Nhóm 5 (HaHa).pdf",
      size: 123456,
      type: "application/pdf",
      url: "/uploads/1765799252945_Btap 02 Nhóm 5 (HaHa).pdf"
    },
    status: "pending",
    createdAt: "2025-12-15T18:47:32.945Z",
    verifiedAt: null,
    verifiedBy: null
  },
  // Mock data 3: 99.999 triệu (50-100 triệu) -> Fee: 2,500,000 VNĐ
  {
    id: "contract_1765799292478",
    userId: "1765798812003",
    contractType: "expected",
    contractValue: 99999999, // ~100 triệu VNĐ
    dealCount: 1,
    evidence: {
      name: "Btap 02 Nhóm 5 (HaHa).pdf",
      size: 123456,
      type: "application/pdf",
      url: "/uploads/1765799292478_Btap 02 Nhóm 5 (HaHa).pdf"
    },
    status: "pending",
    createdAt: "2025-12-15T18:48:12.478Z",
    verifiedAt: null,
    verifiedBy: null
  }
];

// Initialize global database if it doesn't exist
if (!(globalThis as any).contractsDB) {
  (globalThis as any).contractsDB = [...initialContracts];
}

// Export the global database
export const contractsDB: any[] = (globalThis as any).contractsDB;
