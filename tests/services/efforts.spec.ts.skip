import Efforts from '../../src/services/efforts';
import Effort from '../../src/services/effort';
import Result from '../../src/services/result';
import Objective from '../../src/services/objective';

describe('Efforts', () => {
  let efforts: Efforts;
  let mockEffort: Effort;
  let mockResult: Result;
  let mockObjective: Objective;

  beforeEach(() => {
    efforts = new Efforts();
    
    const effortData = {
      date: '2024-01-15',
      time: '10:00',
      comment: 'Test effort',
      modifier: '5',
      time_spent: '120'
    };
    mockEffort = new Effort(effortData, null);
    
    const resultData = {
      uuid: 'result-1',
      definition: 'Test result',
      target: 100,
      initial: 0,
      time_estimate: 240
    };
    mockResult = new Result(resultData, null);
    
    const objectiveData = {
      uuid: 'objective-1',
      title: 'Test objective',
      time_planned: 480,
      due_date: '2024-12-31'
    };
    mockObjective = new Objective(objectiveData, null);
  });

  describe('constructor', () => {
    it('should create an instance with empty table', () => {
      expect(efforts).toBeTruthy();
      expect(efforts.table).toBeDefined();
      expect(efforts.table).toEqual([]);
      expect(Array.isArray(efforts.table)).toBe(true);
    });
  });

  describe('addEffort', () => {
    it('should add an effort with result and objective to table', () => {
      efforts.addEffort(mockEffort, mockResult, mockObjective);
      
      expect(efforts.table.length).toBe(1);
      expect(efforts.table[0].effort).toBe(mockEffort);
      expect(efforts.table[0].result).toBe(mockResult);
      expect(efforts.table[0].objective).toBe(mockObjective);
    });

    it('should add multiple efforts', () => {
      const effort2Data = {
        date: '2024-01-16',
        time: '11:00',
        comment: 'Second effort',
        modifier: '3',
        time_spent: '90'
      };
      const mockEffort2 = new Effort(effort2Data, null);
      
      efforts.addEffort(mockEffort, mockResult, mockObjective);
      efforts.addEffort(mockEffort2, mockResult, mockObjective);
      
      expect(efforts.table.length).toBe(2);
      expect(efforts.table[0].effort).toBe(mockEffort);
      expect(efforts.table[1].effort).toBe(mockEffort2);
    });

    it('should maintain references to provided objects', () => {
      efforts.addEffort(mockEffort, mockResult, mockObjective);
      
      const row = efforts.table[0];
      expect(row.effort.comment).toBe('Test effort');
      expect(row.result.definition).toBe('Test result');
      expect(row.objective.title).toBe('Test objective');
    });
  });

  describe('table structure', () => {
    it('should create EffortRow with all properties', () => {
      efforts.addEffort(mockEffort, mockResult, mockObjective);
      
      const row = efforts.table[0];
      expect(row).toHaveProperty('effort');
      expect(row).toHaveProperty('result');
      expect(row).toHaveProperty('objective');
    });

    it('should allow accessing effort properties through table', () => {
      efforts.addEffort(mockEffort, mockResult, mockObjective);
      
      expect(efforts.table[0].effort.time_spent).toBe(120);
      expect(efforts.table[0].result.uuid).toBe('result-1');
      expect(efforts.table[0].objective.uuid).toBe('objective-1');
    });
  });

  describe('edge cases', () => {
    it('should handle adding same effort multiple times', () => {
      efforts.addEffort(mockEffort, mockResult, mockObjective);
      efforts.addEffort(mockEffort, mockResult, mockObjective);
      
      expect(efforts.table.length).toBe(2);
      expect(efforts.table[0].effort).toBe(mockEffort);
      expect(efforts.table[1].effort).toBe(mockEffort);
    });

    it('should handle different results and objectives for same effort', () => {
      const result2Data = {
        uuid: 'result-2',
        definition: 'Second result',
        target: 200,
        initial: 0
      };
      const mockResult2 = new Result(result2Data, null);
      
      efforts.addEffort(mockEffort, mockResult, mockObjective);
      efforts.addEffort(mockEffort, mockResult2, mockObjective);
      
      expect(efforts.table.length).toBe(2);
      expect(efforts.table[0].result.uuid).toBe('result-1');
      expect(efforts.table[1].result.uuid).toBe('result-2');
    });
  });
});
