import Efforts from '../../src/services/efforts';
import Effort from '../../src/services/effort';
import Result from '../../src/services/result';
import Objective from '../../src/services/objective';

describe('Efforts', () => {
  describe('constructor', () => {
    it('should create an empty efforts table', () => {
      const efforts = new Efforts();
      
      expect(efforts).toBeTruthy();
      expect(efforts.table).toEqual([]);
      expect(efforts.table.length).toBe(0);
    });
  });

  describe('addEffort', () => {
    it('should add effort with result and objective', () => {
      const efforts = new Efforts();
      
      const effortData = {
        date: '2024-01-15',
        time: '10:30',
        comment: 'Test effort',
        modifier: '5'
      };
      const effort = new Effort(effortData, null);
      
      const resultData = {
        uuid: 'result-1',
        definition: 'Test result',
        target: 100,
        initial: 0
      };
      const result = new Result(resultData, null);
      
      const objectiveData = {
        uuid: 'objective-1',
        title: 'Test objective',
        time_planned: 480,
        due_date: '2024-12-31'
      };
      const objective = new Objective(objectiveData, null);
      
      efforts.addEffort(effort, result, objective);
      
      expect(efforts.table.length).toBe(1);
      expect(efforts.table[0].effort).toBe(effort);
      expect(efforts.table[0].result).toBe(result);
      expect(efforts.table[0].objective).toBe(objective);
    });

    it('should add multiple efforts', () => {
      const efforts = new Efforts();
      
      const effort1 = new Effort({
        date: '2024-01-15',
        time: '10:00',
        comment: 'First',
        modifier: '5'
      }, null);
      
      const effort2 = new Effort({
        date: '2024-01-16',
        time: '11:00',
        comment: 'Second',
        modifier: '3'
      }, null);
      
      const result = new Result({
        uuid: 'result-1',
        definition: 'Test',
        target: 100,
        initial: 0
      }, null);
      
      const objective = new Objective({
        uuid: 'obj-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31'
      }, null);
      
      efforts.addEffort(effort1, result, objective);
      efforts.addEffort(effort2, result, objective);
      
      expect(efforts.table.length).toBe(2);
      expect(efforts.table[0].effort).toBe(effort1);
      expect(efforts.table[1].effort).toBe(effort2);
    });

    it('should maintain effort row structure', () => {
      const efforts = new Efforts();
      
      const effort = new Effort({
        date: '2024-01-15',
        time: '10:30',
        comment: 'Test',
        modifier: '5'
      }, null);
      
      const result = new Result({
        uuid: 'result-1',
        definition: 'Test result',
        target: 100,
        initial: 0
      }, null);
      
      const objective = new Objective({
        uuid: 'objective-1',
        title: 'Test objective',
        time_planned: 480,
        due_date: '2024-12-31'
      }, null);
      
      efforts.addEffort(effort, result, objective);
      
      const row = efforts.table[0];
      expect(row).toBeDefined();
      expect(row.effort).toBeDefined();
      expect(row.result).toBeDefined();
      expect(row.objective).toBeDefined();
    });
  });
});
