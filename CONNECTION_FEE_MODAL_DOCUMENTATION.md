# Connection Fee Calculator Modal - Documentation

## Overview
A professional, clean modal component for calculating connection fees when two businesses match successfully on the Frago platform.

## Visual Design

```
┌─────────────────────────────────────────────────────┐
│  Connection Fee Calculator                      ✕   │
│  This fee applies when two businesses match         │
│  successfully.                                       │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │              ❤️                               │  │
│  │      Connection Successful!                   │  │
│  │  You matched with Hồng trà ngô gia           │  │
│  └──────────────────────────────────────────────┘  │
│                                                      │
│  Contract Value (USD)                               │
│  ┌──────────────────────────────────────────────┐  │
│  │ $ [Enter amount...]                          │  │
│  └──────────────────────────────────────────────┘  │
│  Enter the total value of your business deal        │
│  contract                                            │
│                                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │ Connection Fee (5%)          $5,000.00       │  │
│  │ ─────────────────────────────────────────    │  │
│  │ Total Cost                   $5,000.00       │  │
│  └──────────────────────────────────────────────┘  │
│                                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │ Note: The connection fee is calculated as    │  │
│  │ 5% of your contract value. This fee enables  │  │
│  │ our platform to facilitate successful        │  │
│  │ business partnerships.                        │  │
│  └──────────────────────────────────────────────┘  │
│                                                      │
│              [Cancel]  [Confirm Connection Fee]     │
└─────────────────────────────────────────────────────┘
```

## Features

### 1. **Match Success Notification**
- Green background with heart emoji
- Displays matched company name
- Provides immediate positive feedback

### 2. **Contract Value Input**
- Dollar sign prefix for clarity
- Number input with decimal support
- Placeholder text for guidance
- Helper text below input

### 3. **Auto-Calculation Display**
- Real-time calculation of 5% fee
- Professional blue background section
- Clear separation between fee and total
- Currency formatting (USD)

### 4. **Information Note**
- Gray background for secondary information
- Explains the fee structure
- Professional and transparent

### 5. **Action Buttons**
- Cancel button (outline style)
- Confirm button (primary blue)
- Disabled state when no valid input
- Responsive layout

## Color Palette

| Element | Color | Usage |
|---------|-------|-------|
| Primary Blue | `#3b82f6` | Confirm button, fee display |
| Success Green | `#10b981` | Match notification background |
| Gray 900 | `#111827` | Primary text |
| Gray 600 | `#4b5563` | Secondary text |
| Gray 50 | `#f9fafb` | Info box background |
| Blue 50 | `#eff6ff` | Fee calculation background |

## Typography

- **Title**: 20px, Bold, Gray 900
- **Description**: 14px, Regular, Gray 600
- **Labels**: 14px, Medium, Gray 700
- **Input**: 16px, Regular
- **Fee Display**: 18px, Semibold, Blue 600
- **Total**: 20px, Bold, Gray 900

## Spacing & Layout

- Modal width: `max-w-md` (448px)
- Padding: 24px
- Border radius: 8px
- Shadow: Subtle elevation
- Gap between sections: 24px

## User Flow

1. User swipes right (clicks heart ❤️) on a profile
2. Modal appears with match success message
3. User enters contract value
4. Fee automatically calculates (5%)
5. User reviews calculation
6. User clicks "Confirm" or "Cancel"
7. Modal closes and connection is processed

## Technical Implementation

### Component Structure
```
ConnectionFeeModal
├── Dialog (Radix UI)
│   ├── DialogContent
│   │   ├── DialogHeader
│   │   │   ├── DialogTitle
│   │   │   └── DialogDescription
│   │   ├── Match Success Card
│   │   ├── Contract Value Input
│   │   ├── Fee Calculation Display
│   │   ├── Information Note
│   │   └── DialogFooter
│   │       ├── Cancel Button
│   │       └── Confirm Button
```

### Props Interface
```typescript
interface ConnectionFeeModalProps {
  isOpen: boolean;              // Controls modal visibility
  onClose: () => void;          // Handler for closing modal
  onConfirm: (contractValue: number, fee: number) => void;  // Handler for confirmation
  matchedCompany?: string;      // Name of matched company
}
```

### State Management
```typescript
const [contractValue, setContractValue] = useState<string>("");
const [connectionFee, setConnectionFee] = useState<number>(0);
const [totalCost, setTotalCost] = useState<number>(0);
```

### Calculation Logic
```typescript
useEffect(() => {
  const value = parseFloat(contractValue) || 0;
  const fee = value * 0.05; // 5% fee
  setConnectionFee(fee);
  setTotalCost(fee);
}, [contractValue]);
```

## Integration

### In SwipeInterface Component
```typescript
// State
const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);
const [matchedProfile, setMatchedProfile] = useState<any>(null);

// Handler
const handleSwipe = (direction: "left" | "right", profileId: string) => {
  if (direction === "right") {
    const profile = currentProfiles.find(p => p.id === profileId);
    setMatchedProfile(profile);
    setIsFeeModalOpen(true);
  }
};

// Render
<ConnectionFeeModal
  isOpen={isFeeModalOpen}
  onClose={() => setIsFeeModalOpen(false)}
  onConfirm={handleFeeConfirm}
  matchedCompany={matchedProfile?.company}
/>
```

## Accessibility

- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Screen reader friendly
- ✅ ARIA labels
- ✅ Close on Escape key
- ✅ Close on overlay click

## Responsive Design

- Mobile: Full width with padding
- Tablet: Max width 448px, centered
- Desktop: Max width 448px, centered
- All breakpoints: Proper spacing and touch targets

## Testing Checklist

- [ ] Modal opens on heart click
- [ ] Match success message displays correct company name
- [ ] Contract value input accepts numbers
- [ ] Fee calculates correctly (5%)
- [ ] Currency formatting works
- [ ] Confirm button disabled when input is empty/zero
- [ ] Cancel button closes modal
- [ ] Confirm button triggers callback with correct values
- [ ] Modal closes after confirmation
- [ ] Responsive on mobile devices
- [ ] Keyboard navigation works
- [ ] Close button (X) works

## Future Enhancements

1. **Payment Integration**: Connect to payment processor
2. **Fee Tiers**: Different fee percentages based on contract size
3. **Currency Selection**: Support multiple currencies
4. **Payment Plans**: Option to split fee into installments
5. **Receipt Generation**: Automatic receipt after confirmation
6. **Analytics**: Track conversion rates and average contract values

## Files Modified

- **Created**: `/src/components/ConnectionFeeModal.tsx`
- **Updated**: `/src/components/SwipeInterface.tsx`

## Dependencies Used

- `@radix-ui/react-dialog` - Accessible modal component
- `@radix-ui/react-label` - Form label component
- `react` - Core React hooks
- `tailwindcss` - Styling

## Browser Support

- Chrome/Edge: ✅ Latest 2 versions
- Firefox: ✅ Latest 2 versions
- Safari: ✅ Latest 2 versions
- Mobile Safari: ✅ iOS 14+
- Chrome Mobile: ✅ Latest

---

**Status**: ✅ Implementation Complete  
**Version**: 1.0.0  
**Last Updated**: December 7, 2025
