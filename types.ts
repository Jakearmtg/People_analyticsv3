
export interface TurnoverData {
  resignations: number;
  activeEmployees: number;
  rate: number;
}

export interface TenureData {
  averageDays: number;
  observation: string;
}

export interface AbsenteeismData {
  unjustifiedAbsences: number;
  medicalAbsences: number;
  possibleDays: number;
  rate: number;
  byDepartment: Record<string, number>;
}

export interface OvertimeData {
  totalHours: string;
  totalCost: number;
}

export interface PayrollData {
  byCostCenter: Record<string, number>;
}

export interface VacationData {
  due: number;
  scheduled: number;
}

export interface LeaveData {
  maternity: number;
  sickness: number;
  accident: number;
}

export interface HiringData {
  admissions: number;
  resignations: number;
}

export interface AgeData {
  average: number;
  min: number;
  max: number;
  ageRanges: Record<string, number>;
}

export interface TimeBankData {
  averageBalance: number;
}

export interface MonthlyData {
  monthYear: string;
  turnover: TurnoverData;
  averageTenure: TenureData;
  absenteeism: AbsenteeismData;
  overtime: OvertimeData;
  payroll: PayrollData;
  vacations: VacationData;
  leaves: LeaveData;
  hiring: HiringData;
  ageDemographics: AgeData;
  timeBank: TimeBankData;
}

export type ViewMode = 'monthly' | 'general';
