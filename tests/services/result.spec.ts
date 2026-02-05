import Result from '../../src/services/result';
import Effort from '../../src/services/effort';

describe('Result', () => {
  describe('constructor', () => {
    it('should create a result with basic data', () => {
      const data = {
        uuid: 'result-1',
        definition: 'Test Result',
        target: 100,
        initial: 0,
        time_estimate: 480
      };
      const result = new Result(data, null);
      
      expect(result).toBeTruthy();
      expect(result.uuid).toBe('result-1');
      expect(result.definition).toBe('Test Result');
      expect(result.target).toBe(100);
      expect(result.initial).toBe(0);
      expect(result.time_estimate).toBe(480);
      expect(result.efforts).toEqual([]);
    });

    it('should handle default values for target and initial', () => {
      const data = {
        uuid: 'result-1',
        definition: 'Test Result'
      };
      const result = new Result(data, null);
      
      expect(result.target).toBe(0);
      expect(result.initial).toBe(0);
    });

    it('should use estimate as fallback for time_estimate', () => {
      const data = {
        uuid: 'result-1',
        definition: 'Test',
        estimate: 240
      };
      const result = new Result(data, null);
      
      expect(result.time_estimate).toBe(240);
    });

    it('should create with efforts array', () => {
      const data = {
        uuid: 'result-1',
        definition: 'Test Result',
        target: 100,
        initial: 0,
        efforts: [
          {
            date: '2024-01-15',
            time: '10:00',
            comment: 'First effort',
            modifier: '10',
            time_spent: '60'
          }
        ]
      };
      const result = new Result(data, null);
      
      expect(result.efforts.length).toBe(1);
      expect(result.efforts[0]).toBeInstanceOf(Effort);
      expect(result.efforts[0].comment).toBe('First effort');
    });

    it('should store parent reference', () => {
      const parent = { uuid: 'parent-id' };
      const data = {
        uuid: 'result-1',
        definition: 'Test'
      };
      const result = new Result(data, parent);
      
      expect(result.parent).toBe(parent);
    });
  });

  describe('total_time', () => {
    it('should return 0 for no efforts', () => {
      const result = new Result({
        uuid: 'result-1',
        definition: 'Test',
        target: 100,
        initial: 0
      }, null);
      
      expect(result.total_time).toBe(0);
    });

    it('should calculate total time from efforts', () => {
      const data = {
        uuid: 'result-1',
        definition: 'Test',
        target: 100,
        initial: 0,
        efforts: [
          {
            date: '2024-01-15',
            time: '10:00',
            comment: 'First',
            modifier: '5',
            time_spent: '60'
          },
          {
            date: '2024-01-16',
            time: '11:00',
            comment: 'Second',
            modifier: '5',
            time_spent: '120'
          }
        ]
      };
      const result = new Result(data, null);
      
      expect(result.total_time).toBe(180);
    });

    it('should cache total_time calculation', () => {
      const result = new Result({
        uuid: 'result-1',
        definition: 'Test',
        target: 100,
        initial: 0,
        efforts: [
          {
            date: '2024-01-15',
            time: '10:00',
            comment: 'First',
            modifier: '5',
            time_spent: '60'
          }
        ]
      }, null);
      
      const firstCall = result.total_time;
      const secondCall = result.total_time;
      
      expect(firstCall).toBe(secondCall);
      expect(firstCall).toBe(60);
    });
  });

  describe('current', () => {
    it('should return initial value when no efforts', () => {
      const result = new Result({
        uuid: 'result-1',
        definition: 'Test',
        target: 100,
        initial: 50
      }, null);
      
      expect(result.current).toBe(50);
    });

    it('should calculate current value from efforts', () => {
      const data = {
        uuid: 'result-1',
        definition: 'Test',
        target: 100,
        initial: 0,
        efforts: [
          {
            date: '2024-01-15',
            time: '10:00',
            comment: 'First',
            modifier: '10'
          },
          {
            date: '2024-01-16',
            time: '11:00',
            comment: 'Second',
            modifier: '15'
          }
        ]
      };
      const result = new Result(data, null);
      
      expect(result.current).toBe(25);
    });

    it('should cache current calculation', () => {
      const result = new Result({
        uuid: 'result-1',
        definition: 'Test',
        target: 100,
        initial: 10,
        efforts: [
          {
            date: '2024-01-15',
            time: '10:00',
            comment: 'First',
            modifier: '5'
          }
        ]
      }, null);
      
      const firstCall = result.current;
      const secondCall = result.current;
      
      expect(firstCall).toBe(secondCall);
      expect(firstCall).toBe(15);
    });
  });

  describe('completion', () => {
    it('should return 0 when target equals initial', () => {
      const result = new Result({
        uuid: 'result-1',
        definition: 'Test',
        target: 50,
        initial: 50
      }, null);
      
      expect(result.completion).toBe(0);
    });

    it('should calculate completion percentage', () => {
      const data = {
        uuid: 'result-1',
        definition: 'Test',
        target: 100,
        initial: 0,
        efforts: [
          {
            date: '2024-01-15',
            time: '10:00',
            comment: 'Progress',
            modifier: '50'
          }
        ]
      };
      const result = new Result(data, null);
      
      expect(result.completion).toBe(0.5);
    });

    it('should use current as target when target is 0', () => {
      const data = {
        uuid: 'result-1',
        definition: 'Test',
        target: 0,
        initial: 0,
        efforts: [
          {
            date: '2024-01-15',
            time: '10:00',
            comment: 'Progress',
            modifier: '50'
          }
        ]
      };
      const result = new Result(data, null);
      
      expect(result.completion).toBe(1);
    });

    it('should return 0 when no progress made and target equals initial', () => {
      const result = new Result({
        uuid: 'result-1',
        definition: 'Test',
        target: 0,
        initial: 0
      }, null);
      
      expect(result.completion).toBe(0);
    });
  });

  describe('report', () => {
    it('should generate monthly report from efforts', () => {
      const data = {
        uuid: 'result-1',
        definition: 'Test',
        target: 100,
        initial: 0,
        time_estimate: 480,
        efforts: [
          {
            date: '2024-01-15',
            time: '10:00',
            comment: 'January work',
            modifier: '20',
            time_spent: '60',
            money_spent: '100',
            thought_spent: '30',
            thew_spent: '10'
          }
        ]
      };
      const result = new Result(data, null);
      
      const report = result.report;
      
      expect(report.monthly).toBeDefined();
      expect(report.monthly['2024-01']).toBeDefined();
      expect(report.monthly['2024-01'].total_time).toBe(60);
      expect(report.monthly['2024-01'].total_money).toBe(100);
      expect(report.monthly['2024-01'].total_thought).toBe(30);
      expect(report.monthly['2024-01'].total_thew).toBe(10);
    });

    it('should aggregate multiple efforts in same month', () => {
      const data = {
        uuid: 'result-1',
        definition: 'Test',
        target: 100,
        initial: 0,
        time_estimate: 480,
        efforts: [
          {
            date: '2024-01-15',
            time: '10:00',
            comment: 'First',
            modifier: '10',
            time_spent: '60'
          },
          {
            date: '2024-01-20',
            time: '11:00',
            comment: 'Second',
            modifier: '10',
            time_spent: '120'
          }
        ]
      };
      const result = new Result(data, null);
      
      const report = result.report;
      
      expect(report.monthly['2024-01'].total_time).toBe(180);
    });

    it('should cache report calculation', () => {
      const result = new Result({
        uuid: 'result-1',
        definition: 'Test',
        target: 100,
        initial: 0,
        efforts: [
          {
            date: '2024-01-15',
            time: '10:00',
            comment: 'Test',
            modifier: '10',
            time_spent: '60'
          }
        ]
      }, null);
      
      const firstReport = result.report;
      const secondReport = result.report;
      
      // The monthly data should be the same reference (cached)
      expect(firstReport.monthly).toBe(secondReport.monthly);
    });
  });

  describe('addEffort', () => {
    it('should add effort to efforts array', () => {
      const result = new Result({
        uuid: 'result-1',
        definition: 'Test',
        target: 100,
        initial: 0
      }, null);
      
      const effort = new Effort({
        date: '2024-01-15',
        time: '10:00',
        comment: 'New effort',
        modifier: '10'
      }, result);
      
      result.addEffort(effort);
      
      expect(result.efforts.length).toBe(1);
      expect(result.efforts[0]).toBe(effort);
    });

    it('should clear cache when adding effort', () => {
      const result = new Result({
        uuid: 'result-1',
        definition: 'Test',
        target: 100,
        initial: 0,
        efforts: [
          {
            date: '2024-01-15',
            time: '10:00',
            comment: 'First',
            modifier: '10'
          }
        ]
      }, null);
      
      const initialCurrent = result.current;
      
      const newEffort = new Effort({
        date: '2024-01-16',
        time: '11:00',
        comment: 'Second',
        modifier: '10'
      }, result);
      
      result.addEffort(newEffort);
      
      const newCurrent = result.current;
      expect(newCurrent).toBe(20);
      expect(newCurrent).not.toBe(initialCurrent);
    });
  });

  describe('clearCache', () => {
    it('should clear all cached values', () => {
      const result = new Result({
        uuid: 'result-1',
        definition: 'Test',
        target: 100,
        initial: 0,
        efforts: [
          {
            date: '2024-01-15',
            time: '10:00',
            comment: 'Test',
            modifier: '10',
            time_spent: '60'
          }
        ]
      }, null);
      
      result.total_time;
      result.current;
      result.report;
      
      result.clearCache();
      
      expect(result.cached_total_time).toBeUndefined();
      expect(result.cached_current).toBeUndefined();
    });
  });

  describe('parent getter', () => {
    it('should return parent when set', () => {
      const parent = { uuid: 'parent-id' };
      const result = new Result({
        uuid: 'result-1',
        definition: 'Test'
      }, parent);
      
      expect(result.parent).toBe(parent);
    });
  });
});
