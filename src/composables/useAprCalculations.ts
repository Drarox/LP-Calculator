/**
 * Composable for APR calculations
 */

import { calculateDaysBetween } from '@/utils/datetime';

export interface APRCalculationParams {
  initialAmount: number;
  totalFees: number;
  startDate: string;
  endDate: string;
}

export interface APRResults {
  apr: number;
  totalReturn: number;
  returnPercentage: number;
  dailyRate: number;
  monthlyRate: number;
  daysActive: number;
}

export function useAprCalculations() {
  /**
   * Calculate APR using simple interest formula
   * @param params - Calculation parameters
   * @returns APR calculation results
   */
  const calculateAPR = (params: APRCalculationParams): APRResults => {
    const { initialAmount, totalFees, startDate, endDate } = params;

    if (initialAmount <= 0 || totalFees < 0) {
      return {
        apr: 0,
        totalReturn: 0,
        returnPercentage: 0,
        dailyRate: 0,
        monthlyRate: 0,
        daysActive: 0
      };
    }

    const daysActive = calculateDaysBetween(startDate, endDate);
    const returnPercentage = (totalFees / initialAmount) * 100;
    
    // Simple APR calculation: (Total Fees / Initial Investment) * (365 / Days) * 100
    const apr = (totalFees / initialAmount) * (365 / daysActive) * 100;
    
    // Daily and monthly rates (simple interest)
    const dailyRate = (totalFees / initialAmount) * (1 / daysActive) * 100;
    const monthlyRate = (totalFees / initialAmount) * (30 / daysActive) * 100;

    return {
      apr,
      totalReturn: totalFees,
      returnPercentage,
      dailyRate,
      monthlyRate,
      daysActive
    };
  };

  /**
   * Format APR result for display
   * @param value - Numeric value to format
   * @param decimals - Number of decimal places
   * @returns Formatted string
   */
  const formatAPRValue = (value: number, decimals: number = 2): string => {
    return value.toFixed(decimals);
  };

  return {
    calculateAPR,
    formatAPRValue
  };
}