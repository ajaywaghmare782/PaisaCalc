/**
 * Utility functions for PaisaCalc Indian Personal Finance Calculators
 */

// Format numbers according to the Indian Numbering System: e.g., ₹1,00,000 instead of ₹100,000
export function formatCurrency(amount: number): string {
  if (isNaN(amount) || amount === null) return '₹0';
  return '₹' + Math.round(amount).toLocaleString('en-IN');
}

// ----------------------------------------------------
// 1. EMI Calculations
// ----------------------------------------------------
export interface EmiScheduleRow {
  period: number; // Year or Month index
  principalPaid: number;
  interestPaid: number;
  balanceRemaining: number;
}

export function calculateEmi(principal: number, annualRate: number, tenureMonths: number) {
  const r = annualRate / 12 / 100;
  const n = tenureMonths;
  
  if (r === 0) {
    return {
      monthlyEmi: principal / n,
      totalAmountPayable: principal,
      totalInterestPayable: 0
    };
  }

  const monthlyEmi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalAmountPayable = monthlyEmi * n;
  const totalInterestPayable = totalAmountPayable - principal;

  return {
    monthlyEmi,
    totalAmountPayable,
    totalInterestPayable
  };
}

export function getEmiAmortizationSchedule(principal: number, annualRate: number, tenureMonths: number): {
  yearlySchedule: EmiScheduleRow[];
  monthlySchedule: EmiScheduleRow[];
} {
  const r = annualRate / 12 / 100;
  const emi = calculateEmi(principal, annualRate, tenureMonths).monthlyEmi;
  
  let balance = principal;
  const monthlySchedule: EmiScheduleRow[] = [];
  
  for (let m = 1; m <= tenureMonths; m++) {
    const interest = balance * r;
    const principalPaid = emi - interest;
    balance = Math.max(0, balance - principalPaid);
    
    monthlySchedule.push({
      period: m,
      principalPaid,
      interestPaid: interest,
      balanceRemaining: balance
    });
  }

  // Aggregate by year
  const yearlySchedule: EmiScheduleRow[] = [];
  let currentYearPrincipal = 0;
  let currentYearInterest = 0;
  
  monthlySchedule.forEach((row, index) => {
    currentYearPrincipal += row.principalPaid;
    currentYearInterest += row.interestPaid;
    
    // Every 12 months or at the very end of tenure, push year data
    if ((index + 1) % 12 === 0 || index === monthlySchedule.length - 1) {
      const yearNum = Math.ceil((index + 1) / 12);
      yearlySchedule.push({
        period: yearNum,
        principalPaid: currentYearPrincipal,
        interestPaid: currentYearInterest,
        balanceRemaining: row.balanceRemaining
      });
      currentYearPrincipal = 0;
      currentYearInterest = 0;
    }
  });

  return { yearlySchedule, monthlySchedule };
}

// ----------------------------------------------------
// 2. SIP Calculations (with optional Step-Up)
// ----------------------------------------------------
export interface SipGrowthRow {
  year: number;
  totalDeposited: number;
  interestEarned: number;
  totalBalance: number;
}

export function calculateSip(
  monthlyInvestment: number, 
  expectedReturnRate: number, 
  durationYears: number,
  stepUpPercent: number = 0,
  stepUpEnabled: boolean = false
): {
  totalInvested: number;
  estimatedReturns: number;
  totalValue: number;
  yearlyGrowth: SipGrowthRow[];
} {
  const r = expectedReturnRate / 12 / 100;
  let totalInvested = 0;
  let totalBalance = 0;
  
  const yearlyGrowth: SipGrowthRow[] = [];
  let currentContribution = monthlyInvestment;

  for (let year = 1; year <= durationYears; year++) {
    let yearDeposits = 0;
    
    for (let month = 1; month <= 12; month++) {
      totalInvested += currentContribution;
      yearDeposits += currentContribution;
      
      // Calculate earnings + compounding
      totalBalance += currentContribution;
      totalBalance = totalBalance * (1 + r);
    }
    
    yearlyGrowth.push({
      year,
      totalDeposited: totalInvested,
      interestEarned: Math.max(0, totalBalance - totalInvested),
      totalBalance: totalBalance
    });

    if (stepUpEnabled && stepUpPercent > 0) {
      currentContribution = currentContribution * (1 + stepUpPercent / 100);
    }
  }

  const totalValue = totalBalance;
  const estimatedReturns = Math.max(0, totalValue - totalInvested);

  return {
    totalInvested,
    estimatedReturns,
    totalValue,
    yearlyGrowth
  };
}

// ----------------------------------------------------
// 3. FD & RD Calculations
// ----------------------------------------------------
// FD compounding modes: 12 = Monthly, 4 = Quarterly, 2 = Half-yearly, 1 = Yearly
export function calculateFd(
  principal: number,
  annualRate: number,
  years: number,
  months: number,
  compoundingFrequency: 12 | 4 | 2 | 1,
  isSenior: boolean
) {
  const rateMultiplier = isSenior ? 0.5 : 0;
  const r = (annualRate + rateMultiplier) / 100;
  const t = years + (months / 12);
  const n = compoundingFrequency;

  // Formula: A = P * (1 + r/n)^(n*t)
  const maturityAmount = principal * Math.pow(1 + (r / n), n * t);
  const interestEarned = maturityAmount - principal;
  const effectiveYield = t > 0 ? (interestEarned / (principal * t)) * 100 : annualRate;

  return {
    maturityAmount,
    interestEarned,
    effectiveYield
  };
}

export function calculateRd(monthlyDeposit: number, annualRate: number, tenureMonths: number) {
  const r = annualRate / 100;
  const n = 4; // RD Compounding in India is typically quarterly as per RBI guidelines
  
  // Formula for maturity value of RD:
  // Each monthly payment compounds quarterly
  let maturityAmount = 0;
  const monthlyRate = annualRate / 12 / 100;
  
  for (let m = 1; m <= tenureMonths; m++) {
    // Number of months to maturity for interest calculation
    const monthsRemaining = tenureMonths - m + 1;
    // Standard approximation of quarterly compound for RD
    // A = P * (1 + r/n)^(n * (months/12))
    const compoundFactor = Math.pow(1 + (r / n), n * (monthsRemaining / 12));
    maturityAmount += monthlyDeposit * compoundFactor;
  }
  
  const totalDeposited = monthlyDeposit * tenureMonths;
  const interestEarned = Math.max(0, maturityAmount - totalDeposited);

  return {
    totalDeposited,
    interestEarned,
    maturityAmount
  };
}

// ----------------------------------------------------
// 4. PPF Calculations
// ----------------------------------------------------
export interface PpfYearRow {
  year: number;
  openingBalance: number;
  deposit: number;
  interestEarned: number;
  closingBalance: number;
}

export function calculatePpf(yearlyDeposit: number, annualRate: number, tenureYears: number): {
  totalInvested: number;
  totalInterestEarned: number;
  maturityValue: number;
  yearByYearTable: PpfYearRow[];
} {
  let openingBalance = 0;
  const r = annualRate / 100;
  const yearByYearTable: PpfYearRow[] = [];
  let totalInvested = 0;
  let totalInterestEarned = 0;

  for (let y = 1; y <= tenureYears; y++) {
    // PPF interest computes on closing balance after deposit is usually cleared
    // Formula standard: Interest is credited at end of year
    const interestEarned = (openingBalance + yearlyDeposit) * r;
    const closingBalance = openingBalance + yearlyDeposit + interestEarned;
    
    totalInvested += yearlyDeposit;
    totalInterestEarned += interestEarned;

    yearByYearTable.push({
      year: y,
      openingBalance,
      deposit: yearlyDeposit,
      interestEarned,
      closingBalance
    });

    openingBalance = closingBalance;
  }

  return {
    totalInvested,
    totalInterestEarned,
    maturityValue: openingBalance,
    yearByYearTable
  };
}

// ----------------------------------------------------
// 5. HRA Exemption Calculator
// ----------------------------------------------------
export function calculateHraExemption(
  monthlyBasic: number,
  monthlyHraReceived: number,
  monthlyRentPaid: number,
  isMetro: boolean
) {
  const basic = monthlyBasic;
  const hra = monthlyHraReceived;
  const rent = monthlyRentPaid;

  // Rule 2: Rent Paid - 10% of Basic
  const rule2Amount = Math.max(0, rent - (0.1 * basic));
  
  // Rule 3: 50% for Metro, 40% for Non-metro
  const rule3Percentage = isMetro ? 0.5 : 0.4;
  const rule3Amount = basic * rule3Percentage;

  // HRA Exemption is minimum of the three
  const exemptionVal = Math.min(hra, rule2Amount, rule3Amount);
  const taxableHra = Math.max(0, hra - exemptionVal);

  return {
    rule1Label: 'Actual HRA Received',
    rule1Val: hra,
    rule2Label: 'Rent Paid Minus 10% of Basic Salary',
    rule2Val: rule2Amount,
    rule3Label: `${isMetro ? '50%' : '40%'} of Basic Salary (Metro/Non-Metro Rule)`,
    rule3Val: rule3Amount,
    hraExemption: exemptionVal,
    taxableHra
  };
}

// ----------------------------------------------------
// 6. GST Calculator
// ----------------------------------------------------
export function calculateGst(amount: number, gstRatePercent: number, mode: 'add' | 'remove') {
  if (mode === 'add') {
    const rawGst = amount * (gstRatePercent / 100);
    const totalAmount = amount + rawGst;
    return {
      baseAmount: amount,
      cgst: rawGst / 2,
      sgst: rawGst / 2,
      totalGst: rawGst,
      finalAmount: totalAmount
    };
  } else {
    // Mode is remove: post-gst amount is input
    // baseAmount + (baseAmount * rate/100) = amount
    // baseAmount * (1 + rate/100) = amount
    const baseAmount = amount / (1 + (gstRatePercent / 100));
    const rawGst = amount - baseAmount;
    return {
      baseAmount,
      cgst: rawGst / 2,
      sgst: rawGst / 2,
      totalGst: rawGst,
      finalAmount: amount
    };
  }
}

// ----------------------------------------------------
// 7. Gratuity Calculator
// ----------------------------------------------------
export const MAX_GRATUITY_EXEMPT = 2000000; // ₹20 Lakhs max limit in India

export function calculateGratuity(
  monthlyBasicSalaryPlusDa: number,
  yearsOfService: number,
  employmentType: 'government' | 'private_covered' | 'private_uncovered'
) {
  // Eligibility: Must be at least 5 years of service
  const isEligible = yearsOfService >= 4.5; // Rounding or standard service threshold (normally full 5 years)
  
  if (!isEligible) {
    return {
      isEligible: false,
      gratuityAmount: 0,
      taxExemptPortion: 0,
      taxableGratuity: 0
    };
  }

  let gratuityAmount = 0;
  let taxExemptPortion = 0;

  if (employmentType === 'government') {
    // Government formula typically behaves similarly, or acts fully free of limit
    gratuityAmount = monthlyBasicSalaryPlusDa * (15 / 26) * yearsOfService;
    taxExemptPortion = gratuityAmount; // fully tax free
  } else if (employmentType === 'private_covered') {
    // Covered under Payment of Gratuity Act 1972
    // Formula: (Basic + DA) * 15 / 26 * Years of Service
    // For years, fractional service above 6 months is counted as an individual year (already factored)
    gratuityAmount = monthlyBasicSalaryPlusDa * (15 / 26) * yearsOfService;
    taxExemptPortion = Math.min(gratuityAmount, MAX_GRATUITY_EXEMPT);
  } else {
    // Private - Not covered under Gratuity Act
    // Formula: 15 / 30 * Monthly Basic & DA * Completed Years of Service (no rounding)
    const completedYears = Math.floor(yearsOfService);
    gratuityAmount = monthlyBasicSalaryPlusDa * 0.5 * completedYears;
    taxExemptPortion = Math.min(gratuityAmount, MAX_GRATUITY_EXEMPT);
  }

  const taxableGratuity = Math.max(0, gratuityAmount - taxExemptPortion);

  return {
    isEligible: true,
    gratuityAmount,
    taxExemptPortion,
    taxableGratuity
  };
}

// ----------------------------------------------------
// 8. Income Tax Calculator (FY 2025-26 & 2024-25)
// ----------------------------------------------------
// ANNUAL TAXCONFIG DATA FOR FUTURE PROOFING UPDATES
export const TAX_CONFIG = {
  fy2025_26: {
    standardDeductionNew: 75000,
    standardDeductionOld: 50000,
    rebateLimitNew: 1200000, // Zero tax up to 12L under new regime!
    rebateLimitOld: 500000, // Zero tax up to 5L under old regime
    newRegimeSlabs: [
      { upTo: 300000, rate: 0 },
      { upTo: 700000, rate: 0.05 },
      { upTo: 1000001, rate: 0.10 },
      { upTo: 1200001, rate: 0.15 },
      { upTo: 1500001, rate: 0.20 },
      { upTo: Infinity, rate: 0.30 }
    ],
    oldRegimeSlabs: [
      { upTo: 250000, rate: 0 },
      { upTo: 500000, rate: 0.05 },
      { upTo: 1000001, rate: 0.20 },
      { upTo: Infinity, rate: 0.30 }
    ]
  },
  fy2024_25: {
    standardDeductionNew: 75000,
    standardDeductionOld: 50000,
    rebateLimitNew: 700000,
    rebateLimitOld: 500000,
    newRegimeSlabs: [
      { upTo: 300000, rate: 0 },
      { upTo: 600000, rate: 0.05 },
      { upTo: 900000, rate: 0.10 },
      { upTo: 1200000, rate: 0.15 },
      { upTo: 1500000, rate: 0.20 },
      { upTo: Infinity, rate: 0.30 }
    ],
    oldRegimeSlabs: [
      { upTo: 250000, rate: 0 },
      { upTo: 500000, rate: 0.05 },
      { upTo: 1000000, rate: 0.20 },
      { upTo: Infinity, rate: 0.30 }
    ]
  }
};

export function calculateIncomeTax(
  grossIncome: number,
  fy: '2024-25' | '2025-26',
  category: 'individual' | 'senior' | 'super_senior',
  deductionsOld: {
    sec80C: number; // Max 1,50,000
    sec80D: number; // Max 25,000 or 50,000 for seniors
    hraExemption: number;
    homeLoanInterest: number; // Max 2,00,000
    others: number;
  }
) {
  const config = fy === '2025-26' ? TAX_CONFIG.fy2025_26 : TAX_CONFIG.fy2024_25;

  // New Regime Standard Deduction & taxable income calculation
  const standardDeductionNew = config.standardDeductionNew;
  const taxableIncomeNew = Math.max(0, grossIncome - standardDeductionNew);

  // Old Regime Standard Deduction & deductions cap calculation
  const standardDeductionOld = config.standardDeductionOld;
  const c80C = Math.min(deductionsOld.sec80C, 150000);
  
  // Health insurance limits
  const max80D = category === 'individual' ? 25000 : 50000;
  const c80D = Math.min(deductionsOld.sec80D, max80D);
  
  const cHraExemption = deductionsOld.hraExemption;
  const cHomeLoanInterest = Math.min(deductionsOld.homeLoanInterest, 200000);
  const cOthers = deductionsOld.others;

  const totalDeductionsOld = standardDeductionOld + c80C + c80D + cHraExemption + cHomeLoanInterest + cOthers;
  const taxableIncomeOld = Math.max(0, grossIncome - totalDeductionsOld);

  // Let's compute Tax before Cess/Rebate
  let taxNew = computeSlabTax(taxableIncomeNew, config.newRegimeSlabs);
  let taxOld = computeSlabTax(taxableIncomeOld, config.oldRegimeSlabs);

  // Apply Section 87A Rebate
  // New Regime Rebate: Tax free up to rebateLimitNew
  if (taxableIncomeNew <= config.rebateLimitNew) {
    taxNew = 0;
  }
  // Old Regime Rebate: Tax free up to rebateLimitOld (usually 5,00,000)
  if (taxableIncomeOld <= config.rebateLimitOld) {
    taxOld = 0;
  }

  // Surcharges (standard rates above 50 Lakhs)
  const surchargeNew = calculateSurcharge(taxableIncomeNew, taxNew, true);
  const surchargeOld = calculateSurcharge(taxableIncomeOld, taxOld, false);

  const cessNew = (taxNew + surchargeNew) * 0.04;
  const cessOld = (taxOld + surchargeOld) * 0.04;

  const totalTaxPayableNew = taxNew + surchargeNew + cessNew;
  const totalTaxPayableOld = taxOld + surchargeOld + cessOld;

  return {
    newRegime: {
      grossIncome,
      standardDeduction: standardDeductionNew,
      otherDeductions: 0,
      taxableIncome: taxableIncomeNew,
      baseTax: taxNew,
      surcharge: surchargeNew,
      cess: cessNew,
      totalTax: totalTaxPayableNew
    },
    oldRegime: {
      grossIncome,
      standardDeduction: standardDeductionOld,
      otherDeductions: totalDeductionsOld - standardDeductionOld,
      taxableIncome: taxableIncomeOld,
      baseTax: taxOld,
      surcharge: surchargeOld,
      cess: cessOld,
      totalTax: totalTaxPayableOld
    }
  };
}

function computeSlabTax(taxableIncome: number, slabs: { upTo: number; rate: number }[]): number {
  let remainingIncome = taxableIncome;
  let tax = 0;
  let prevLimit = 0;

  for (let i = 0; i < slabs.length; i++) {
    const limit = slabs[i].upTo;
    const rate = slabs[i].rate;
    const slabRange = limit - prevLimit;

    if (remainingIncome <= 0) break;

    const incomeInThisSlab = Math.min(remainingIncome, slabRange);
    tax += incomeInThisSlab * rate;
    
    remainingIncome -= incomeInThisSlab;
    prevLimit = limit;
  }

  return tax;
}

function calculateSurcharge(income: number, baseTax: number, isNewRegime: boolean): number {
  if (income <= 5000000) return 0;
  
  if (income <= 10000000) {
    return baseTax * 0.10; // 10%
  } else if (income <= 20000000) {
    return baseTax * 0.15; // 15%
  } else if (income <= 50000000) {
    return baseTax * 0.25; // 25%
  } else {
    // Surcharge capped at 25% for New Regime, up to 37% for Old Regime
    const rate = isNewRegime ? 0.25 : 0.37;
    return baseTax * rate;
  }
}
