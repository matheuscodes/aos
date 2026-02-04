import { ReportUnit, PeriodReport, Report } from '../../src/services/report';

describe('Report Interfaces', () => {
  describe('ReportUnit', () => {
    it('should define a valid report unit structure', () => {
      const reportUnit: ReportUnit = {
        total_time: 120,
        total_money: 500,
        total_thought: 80,
        total_thew: 60,
        dedication: 0.5,
        completion: 0.75
      };
      
      expect(reportUnit.total_time).toBe(120);
      expect(reportUnit.total_money).toBe(500);
      expect(reportUnit.total_thought).toBe(80);
      expect(reportUnit.total_thew).toBe(60);
      expect(reportUnit.dedication).toBe(0.5);
      expect(reportUnit.completion).toBe(0.75);
    });

    it('should allow numeric values for all properties', () => {
      const reportUnit: ReportUnit = {
        total_time: 0,
        total_money: 0,
        total_thought: 0,
        total_thew: 0,
        dedication: 0,
        completion: 0
      };
      
      expect(reportUnit).toBeDefined();
      expect(typeof reportUnit.total_time).toBe('number');
      expect(typeof reportUnit.completion).toBe('number');
    });

    it('should support fractional values', () => {
      const reportUnit: ReportUnit = {
        total_time: 120.5,
        total_money: 500.75,
        total_thought: 80.25,
        total_thew: 60.5,
        dedication: 0.333,
        completion: 0.666
      };
      
      expect(reportUnit.dedication).toBeCloseTo(0.333, 3);
      expect(reportUnit.completion).toBeCloseTo(0.666, 3);
    });
  });

  describe('PeriodReport', () => {
    it('should define a valid period report structure', () => {
      const periodReport: PeriodReport = {
        '2024-01': {
          total_time: 120,
          total_money: 500,
          total_thought: 80,
          total_thew: 60,
          dedication: 0.5,
          completion: 0.75
        },
        '2024-02': {
          total_time: 90,
          total_money: 400,
          total_thought: 60,
          total_thew: 45,
          dedication: 0.4,
          completion: 0.65
        }
      };
      
      expect(Object.keys(periodReport).length).toBe(2);
      expect(periodReport['2024-01']).toBeDefined();
      expect(periodReport['2024-02']).toBeDefined();
      expect(periodReport['2024-01'].total_time).toBe(120);
      expect(periodReport['2024-02'].total_time).toBe(90);
    });

    it('should support dynamic period keys', () => {
      const periodReport: PeriodReport = {};
      
      periodReport['2024-01'] = {
        total_time: 120,
        total_money: 500,
        total_thought: 80,
        total_thew: 60,
        dedication: 0.5,
        completion: 0.75
      };
      
      expect(periodReport['2024-01']).toBeDefined();
      expect(periodReport['2024-01'].total_time).toBe(120);
    });

    it('should allow various date formats as keys', () => {
      const periodReport: PeriodReport = {
        '2024-01': {
          total_time: 100,
          total_money: 0,
          total_thought: 0,
          total_thew: 0,
          dedication: 0,
          completion: 0
        },
        '2024-12': {
          total_time: 200,
          total_money: 0,
          total_thought: 0,
          total_thew: 0,
          dedication: 0,
          completion: 0
        }
      };
      
      expect(periodReport['2024-01'].total_time).toBe(100);
      expect(periodReport['2024-12'].total_time).toBe(200);
    });
  });

  describe('Report', () => {
    it('should define a valid report structure', () => {
      const report: Report = {
        monthly: {
          '2024-01': {
            total_time: 120,
            total_money: 500,
            total_thought: 80,
            total_thew: 60,
            dedication: 0.5,
            completion: 0.75
          }
        }
      };
      
      expect(report.monthly).toBeDefined();
      expect(report.monthly['2024-01']).toBeDefined();
      expect(report.monthly['2024-01'].total_time).toBe(120);
    });

    it('should support empty monthly reports', () => {
      const report: Report = {
        monthly: {}
      };
      
      expect(report.monthly).toBeDefined();
      expect(Object.keys(report.monthly).length).toBe(0);
    });

    it('should support multiple months', () => {
      const report: Report = {
        monthly: {
          '2024-01': {
            total_time: 120,
            total_money: 500,
            total_thought: 80,
            total_thew: 60,
            dedication: 0.5,
            completion: 0.75
          },
          '2024-02': {
            total_time: 90,
            total_money: 400,
            total_thought: 60,
            total_thew: 45,
            dedication: 0.4,
            completion: 0.65
          },
          '2024-03': {
            total_time: 150,
            total_money: 600,
            total_thought: 100,
            total_thew: 75,
            dedication: 0.6,
            completion: 0.85
          }
        }
      };
      
      expect(Object.keys(report.monthly).length).toBe(3);
      expect(report.monthly['2024-01'].total_time).toBe(120);
      expect(report.monthly['2024-02'].total_time).toBe(90);
      expect(report.monthly['2024-03'].total_time).toBe(150);
    });
  });

  describe('Type compatibility', () => {
    it('should allow ReportUnit to be used in PeriodReport', () => {
      const unit: ReportUnit = {
        total_time: 120,
        total_money: 500,
        total_thought: 80,
        total_thew: 60,
        dedication: 0.5,
        completion: 0.75
      };
      
      const period: PeriodReport = {
        '2024-01': unit
      };
      
      expect(period['2024-01']).toBe(unit);
    });

    it('should allow PeriodReport to be used in Report', () => {
      const period: PeriodReport = {
        '2024-01': {
          total_time: 120,
          total_money: 500,
          total_thought: 80,
          total_thew: 60,
          dedication: 0.5,
          completion: 0.75
        }
      };
      
      const report: Report = {
        monthly: period
      };
      
      expect(report.monthly).toBe(period);
    });
  });
});
