import Result from '../../src/services/result';
import Effort from '../../src/services/effort';

describe('Result', () => {
  describe('constructor', () => {
    it('should create an instance with all properties', () => {
      const data = {
        uuid: 'result-123',
        definition: 'Complete the task',
        target: 100,
        initial: 0,
        time_estimate: 240,
        efforts: []
      };
      const parent = { id: 'parent-1' };
      const result = new Result(data, parent);
      
      expect(result).toBeTruthy();
      expect(result.uuid).toBe('result-123');
      expect(result.definition).toBe('Complete the task');
      expect(result.target).toBe(100);
      expect(result.initial).toBe(0);
      expect(result.time_estimate).toBe(240);
      expect(result.efforts).toEqual([]);
      expect(result.cached_parent).toBe(parent);
    });

    it('should handle missing optional fields', () => {
      const data = {
        uuid: 'result-123',
        definition: 'Test'
      };
      const result = new Result(data, null);
      
      expect(result.target).toBe(0);
      expect(result.initial).toBe(0);
      expect(result.time_estimate).toBeUndefined();
      expect(result.efforts).toEqual([]);
    });

    it('should support estimate as alias for time_estimate', () => {
      const dataWithEstimate = {
        uuid: 'result-1',
        definition: 'Test',
        estimate: 180
      };
      const result = new Result(dataWithEstimate, null);
      
      expect(result.time_estimate).toBe(180);
    });

    it('should prefer time_estimate over estimate when both provided', () => {
      const data = {
        uuid: 'result-1',
        definition: 'Test',
        time_estimate: 240,
        estimate: 180
      };
      const result = new Result(data, null);
      
      expect(result.time_estimate).toBe(240);
    });

    it('should create efforts from data', () => {
      const data = {
        uuid: 'result-1',
        definition: 'Test',
        efforts: [
          {
            date: '2024-01-15',
            time: '10:00',
            comment: 'First effort',
            modifier: '5',
            time_spent: '120'
          },
          {
            date: '2024-01-16',
            time: '11:00',
            comment: 'Second effort',
            modifier: '3',
            time_spent: '90'
          }
        ]
      };
      const result = new Result(data, null);
      
      expect(result.efforts.length).toBe(2);
      expect(result.efforts[0]).toBeInstanceOf(Effort);
      expect(result.efforts[0].comment).toBe('First effort');
      expect(result.efforts[1].comment).toBe('Second effort');
    });

    it('should set result as parent for efforts', () => {
      const data = {
        uuid: 'result-1',
        definition: 'Test',
        efforts: [
          {
            date: '2024-01-15',
            time: '10:00',
            comment: 'Test effort',
            modifier: '5'
          }
        ]
      };
      const result = new Result(data, null);
      
      expect(result.efforts[0].parent).toBe(result);
    });
  });

  describe('total_time getter', () => {
    it('should calculate total time from all efforts', () => {
      const data = {
        uuid: 'result-1',
        definition: 'Test',
        efforts: [
          { date: '2024-01-15', time: '10:00', comment: 'E1', time_spent: '120' },
          { date: '2024-01-16', time: '11:00', comment: 'E2', time_spent: '90' },
          { date: '2024-01-17', time: '12:00', comment: 'E3', time_spent: '60' }
        ]
      };
      const result = new Result(data, null);
      
      expect(result.total_time).toBe(270);
    });

    it('should return 0 when no efforts', () => {
      const data = { uuid: 'result-1', definition: 'Test' };
      const result = new Result(data, null);
      
      expect(result.total_time).toBe(0);
    });

    it('should cache the total_time calculation', () => {
      const data = {
        uuid: 'result-1',
        definition: 'Test',
        efforts: [
          { date: '2024-01-15', time: '10:00', comment: 'E1', time_spent: '120' }
        ]
      };
      const result = new Result(data, null);
      
      const firstCall = result.total_time;
      expect(result.cached_total_time).toBe(120);
      
      const secondCall = result.total_time;
      expect(secondCall).toBe(firstCall);
    });
  });

  describe('current getter', () => {
    it('should calculate current value from initial and modifiers', () => {
      const data = {
        uuid: 'result-1',
        definition: 'Test',
        initial: 10,
        efforts: [
          { date: '2024-01-15', time: '10:00', comment: 'E1', modifier: '5' },
          { date: '2024-01-16', time: '11:00', comment: 'E2', modifier: '3' },
          { date: '2024-01-17', time: '12:00', comment: 'E3', modifier: '2' }
        ]
      };
      const result = new Result(data, null);
      
      expect(result.current).toBe(20); // 10 + 5 + 3 + 2
    });

    it('should return initial when no efforts', () => {
      const data = {
        uuid: 'result-1',
        definition: 'Test',
        initial: 10
      };
      const result = new Result(data, null);
      
      expect(result.current).toBe(10);
    });

    it('should cache the current calculation', () => {
      const data = {
        uuid: 'result-1',
        definition: 'Test',
        initial: 10,
        efforts: [
          { date: '2024-01-15', time: '10:00', comment: 'E1', modifier: '5' }
        ]
      };
      const result = new Result(data, null);
      
      const firstCall = result.current;
      expect(result.cached_current).toBe(15);
      
      const secondCall = result.current;
      expect(secondCall).toBe(firstCall);
    });
  });

  describe('completion getter', () => {
    it('should calculate completion percentage correctly', () => {
      const data = {
        uuid: 'result-1',
        definition: 'Test',
        initial: 0,
        target: 100,
        efforts: [
          { date: '2024-01-15', time: '10:00', comment: 'E1', modifier: '50' }
        ]
      };
      const result = new Result(data, null);
      
      expect(result.completion).toBe(0.5); // 50/100
    });

    it('should return 0 when target equals initial', () => {
      const data = {
        uuid: 'result-1',
        definition: 'Test',
        initial: 50,
        target: 50
      };
      const result = new Result(data, null);
      
      expect(result.completion).toBe(0);
    });

    it('should use current as target when target is not set', () => {
      const data = {
        uuid: 'result-1',
        definition: 'Test',
        initial: 0,
        target: 0,
        efforts: [
          { date: '2024-01-15', time: '10:00', comment: 'E1', modifier: '50' }
        ]
      };
      const result = new Result(data, null);
      
      expect(result.completion).toBe(1); // (50-0)/(50-0) = 1
    });

    it('should handle negative progress', () => {
      const data = {
        uuid: 'result-1',
        definition: 'Test',
        initial: 100,
        target: 0,
        efforts: [
          { date: '2024-01-15', time: '10:00', comment: 'E1', modifier: '-50' }
        ]
      };
      const result = new Result(data, null);
      
      expect(result.completion).toBe(0.5); // (50-100)/(0-100) = 0.5
    });
  });

  describe('report getter', () => {
    it('should generate monthly report', () => {
      const data = {
        uuid: 'result-1',
        definition: 'Test',
        initial: 0,
        target: 100,
        time_estimate: 300,
        efforts: [
          { date: '2024-01-15', time: '10:00', comment: 'E1', modifier: '20', time_spent: '60' },
          { date: '2024-01-20', time: '11:00', comment: 'E2', modifier: '30', time_spent: '90' }
        ]
      };
      const result = new Result(data, null);
      const report = result.report;
      
      expect(report.monthly).toBeDefined();
      expect(report.monthly['2024-01']).toBeDefined();
      expect(report.monthly['2024-01'].total_time).toBe(150);
      expect(report.monthly['2024-01'].completion).toBe(0.5); // (20+30)/100
      expect(report.monthly['2024-01'].dedication).toBe(0.5); // 150/300
    });

    it('should aggregate efforts by month', () => {
      const data = {
        uuid: 'result-1',
        definition: 'Test',
        efforts: [
          { date: '2024-01-15', time: '10:00', comment: 'E1', time_spent: '60', money_spent: '100' },
          { date: '2024-01-20', time: '11:00', comment: 'E2', time_spent: '90', money_spent: '150' },
          { date: '2024-02-10', time: '12:00', comment: 'E3', time_spent: '120', money_spent: '200' }
        ]
      };
      const result = new Result(data, null);
      const report = result.report;
      
      expect(Object.keys(report.monthly).length).toBe(2);
      expect(report.monthly['2024-01'].total_time).toBe(150);
      expect(report.monthly['2024-01'].total_money).toBe(250);
      expect(report.monthly['2024-02'].total_time).toBe(120);
      expect(report.monthly['2024-02'].total_money).toBe(200);
    });

    it('should cache the monthly report', () => {
      const data = {
        uuid: 'result-1',
        definition: 'Test',
        efforts: [
          { date: '2024-01-15', time: '10:00', comment: 'E1', time_spent: '60' }
        ]
      };
      const result = new Result(data, null);
      
      const firstReport = result.report;
      const secondReport = result.report;
      
      expect(firstReport).toBe(secondReport);
    });
  });

  describe('addEffort', () => {
    it('should add effort to the efforts array', () => {
      const data = { uuid: 'result-1', definition: 'Test' };
      const result = new Result(data, null);
      
      const effortData = {
        date: '2024-01-15',
        time: '10:00',
        comment: 'New effort',
        modifier: '5',
        time_spent: '60'
      };
      const newEffort = new Effort(effortData, result);
      
      result.addEffort(newEffort);
      
      expect(result.efforts.length).toBe(1);
      expect(result.efforts[0]).toBe(newEffort);
    });

    it('should clear cache when adding effort', () => {
      const data = {
        uuid: 'result-1',
        definition: 'Test',
        initial: 0,
        efforts: [
          { date: '2024-01-15', time: '10:00', comment: 'E1', modifier: '5', time_spent: '60' }
        ]
      };
      const result = new Result(data, null);
      
      // Access cached values
      const initialCurrent = result.current;
      const initialTotalTime = result.total_time;
      
      // Add new effort
      const effortData = {
        date: '2024-01-16',
        time: '11:00',
        comment: 'E2',
        modifier: '3',
        time_spent: '90'
      };
      const newEffort = new Effort(effortData, result);
      result.addEffort(newEffort);
      
      // Cache should be cleared
      expect(result.cached_current).toBeUndefined();
      expect(result.cached_total_time).toBeUndefined();
      
      // New values should reflect added effort
      expect(result.current).toBe(8);
      expect(result.total_time).toBe(150);
    });
  });

  describe('clearCache', () => {
    it('should clear all cached values', () => {
      const data = {
        uuid: 'result-1',
        definition: 'Test',
        initial: 0,
        target: 100,
        efforts: [
          { date: '2024-01-15', time: '10:00', comment: 'E1', modifier: '5', time_spent: '60' }
        ]
      };
      const result = new Result(data, null);
      
      // Access cached values
      result.current;
      result.total_time;
      result.report;
      
      expect(result.cached_current).toBeDefined();
      expect(result.cached_total_time).toBeDefined();
      
      result.clearCache();
      
      expect(result.cached_current).toBeUndefined();
      expect(result.cached_total_time).toBeUndefined();
    });
  });

  describe('parent getter', () => {
    it('should return the cached parent', () => {
      const parent = { id: 'parent-1' };
      const data = { uuid: 'result-1', definition: 'Test' };
      const result = new Result(data, parent);
      
      expect(result.parent).toBe(parent);
    });
  });
});
