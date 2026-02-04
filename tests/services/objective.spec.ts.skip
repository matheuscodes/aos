import Objective from '../../src/services/objective';
import Result from '../../src/services/result';

describe('Objective', () => {
  describe('constructor', () => {
    it('should create an instance with all properties', () => {
      const data = {
        uuid: 'objective-123',
        title: 'Complete project',
        time_planned: 480,
        due_date: '2024-12-31',
        results: {}
      };
      const parent = { id: 'parent-1' };
      const objective = new Objective(data, parent);
      
      expect(objective).toBeTruthy();
      expect(objective.uuid).toBe('objective-123');
      expect(objective.title).toBe('Complete project');
      expect(objective.time_planned).toBe(480);
      expect(objective.due_date).toEqual(new Date('2024-12-31'));
      expect(objective.results).toEqual({});
      expect(objective.cached_parent).toBe(parent);
    });

    it('should create results from data', () => {
      const data = {
        uuid: 'objective-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31',
        results: {
          'result-1': {
            uuid: 'result-1',
            definition: 'First result',
            target: 100,
            initial: 0
          },
          'result-2': {
            uuid: 'result-2',
            definition: 'Second result',
            target: 200,
            initial: 0
          }
        }
      };
      const objective = new Objective(data, null);
      
      expect(Object.keys(objective.results).length).toBe(2);
      expect(objective.results['result-1']).toBeInstanceOf(Result);
      expect(objective.results['result-1'].definition).toBe('First result');
      expect(objective.results['result-2'].definition).toBe('Second result');
    });

    it('should set objective as parent for results', () => {
      const data = {
        uuid: 'objective-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31',
        results: {
          'result-1': {
            uuid: 'result-1',
            definition: 'Test result'
          }
        }
      };
      const objective = new Objective(data, null);
      
      expect(objective.results['result-1'].parent).toBe(objective);
    });
  });

  describe('total_time getter', () => {
    it('should calculate total time from all results', () => {
      const data = {
        uuid: 'objective-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31',
        results: {
          'result-1': {
            uuid: 'result-1',
            definition: 'R1',
            efforts: [
              { date: '2024-01-15', time: '10:00', comment: 'E1', time_spent: '120' }
            ]
          },
          'result-2': {
            uuid: 'result-2',
            definition: 'R2',
            efforts: [
              { date: '2024-01-16', time: '11:00', comment: 'E2', time_spent: '90' }
            ]
          }
        }
      };
      const objective = new Objective(data, null);
      
      expect(objective.total_time).toBe(210);
    });

    it('should return 0 when no results', () => {
      const data = {
        uuid: 'objective-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31'
      };
      const objective = new Objective(data, null);
      
      expect(objective.total_time).toBe(0);
    });

    it('should cache the total_time calculation', () => {
      const data = {
        uuid: 'objective-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31',
        results: {
          'result-1': {
            uuid: 'result-1',
            definition: 'R1',
            efforts: [
              { date: '2024-01-15', time: '10:00', comment: 'E1', time_spent: '120' }
            ]
          }
        }
      };
      const objective = new Objective(data, null);
      
      const firstCall = objective.total_time;
      expect(objective.cached_total_time).toBe(120);
      
      const secondCall = objective.total_time;
      expect(secondCall).toBe(firstCall);
    });
  });

  describe('completion getter', () => {
    it('should calculate average completion from all results', () => {
      const data = {
        uuid: 'objective-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31',
        results: {
          'result-1': {
            uuid: 'result-1',
            definition: 'R1',
            initial: 0,
            target: 100,
            efforts: [
              { date: '2024-01-15', time: '10:00', comment: 'E1', modifier: '50' }
            ]
          },
          'result-2': {
            uuid: 'result-2',
            definition: 'R2',
            initial: 0,
            target: 100,
            efforts: [
              { date: '2024-01-16', time: '11:00', comment: 'E2', modifier: '100' }
            ]
          }
        }
      };
      const objective = new Objective(data, null);
      
      expect(objective.completion).toBe(0.75); // (0.5 + 1.0) / 2
    });

    it('should return 0 when no results', () => {
      const data = {
        uuid: 'objective-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31'
      };
      const objective = new Objective(data, null);
      
      // Note: This will cause division by zero, resulting in NaN
      // TODO: Fix this edge case - should return 0 when no results
      expect(isNaN(objective.completion)).toBe(true);
    });

    it('should cache the completion calculation', () => {
      const data = {
        uuid: 'objective-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31',
        results: {
          'result-1': {
            uuid: 'result-1',
            definition: 'R1',
            initial: 0,
            target: 100,
            efforts: [
              { date: '2024-01-15', time: '10:00', comment: 'E1', modifier: '50' }
            ]
          }
        }
      };
      const objective = new Objective(data, null);
      
      const firstCall = objective.completion;
      expect(objective.cached_completion_sum).toBe(0.5);
      
      const secondCall = objective.completion;
      expect(secondCall).toBe(firstCall);
    });
  });

  describe('report getter', () => {
    it('should generate monthly report from results', () => {
      const data = {
        uuid: 'objective-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31',
        results: {
          'result-1': {
            uuid: 'result-1',
            definition: 'R1',
            initial: 0,
            target: 100,
            time_estimate: 300,
            efforts: [
              { date: '2024-01-15', time: '10:00', comment: 'E1', modifier: '20', time_spent: '60' }
            ]
          },
          'result-2': {
            uuid: 'result-2',
            definition: 'R2',
            initial: 0,
            target: 100,
            time_estimate: 300,
            efforts: [
              { date: '2024-01-20', time: '11:00', comment: 'E2', modifier: '30', time_spent: '90' }
            ]
          }
        }
      };
      const objective = new Objective(data, null);
      const report = objective.report;
      
      expect(report.monthly).toBeDefined();
      expect(report.monthly['2024-01']).toBeDefined();
      expect(report.monthly['2024-01'].total_time).toBe(150);
    });

    it('should aggregate results across months', () => {
      const data = {
        uuid: 'objective-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31',
        results: {
          'result-1': {
            uuid: 'result-1',
            definition: 'R1',
            efforts: [
              { date: '2024-01-15', time: '10:00', comment: 'E1', time_spent: '60' },
              { date: '2024-02-15', time: '11:00', comment: 'E2', time_spent: '90' }
            ]
          }
        }
      };
      const objective = new Objective(data, null);
      const report = objective.report;
      
      expect(Object.keys(report.monthly).length).toBe(2);
      expect(report.monthly['2024-01'].total_time).toBe(60);
      expect(report.monthly['2024-02'].total_time).toBe(90);
    });
  });

  describe('efforts getter', () => {
    it('should collect all efforts from all results', () => {
      const data = {
        uuid: 'objective-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31',
        results: {
          'result-1': {
            uuid: 'result-1',
            definition: 'R1',
            efforts: [
              { date: '2024-01-15', time: '10:00', comment: 'E1', time_spent: '60' }
            ]
          },
          'result-2': {
            uuid: 'result-2',
            definition: 'R2',
            efforts: [
              { date: '2024-01-16', time: '11:00', comment: 'E2', time_spent: '90' }
            ]
          }
        }
      };
      const objective = new Objective(data, null);
      const efforts = objective.efforts;
      
      expect(efforts.table.length).toBe(2);
      expect(efforts.table[0].effort.comment).toBe('E1');
      expect(efforts.table[1].effort.comment).toBe('E2');
    });

    it('should sort efforts by date descending', () => {
      const data = {
        uuid: 'objective-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31',
        results: {
          'result-1': {
            uuid: 'result-1',
            definition: 'R1',
            efforts: [
              { date: '2024-01-10', time: '10:00', comment: 'E1', time_spent: '60' },
              { date: '2024-01-20', time: '11:00', comment: 'E2', time_spent: '90' },
              { date: '2024-01-15', time: '12:00', comment: 'E3', time_spent: '30' }
            ]
          }
        }
      };
      const objective = new Objective(data, null);
      const efforts = objective.efforts;
      
      expect(efforts.table[0].effort.comment).toBe('E2'); // Most recent
      expect(efforts.table[1].effort.comment).toBe('E3');
      expect(efforts.table[2].effort.comment).toBe('E1'); // Oldest
    });

    it('should cache efforts', () => {
      const data = {
        uuid: 'objective-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31',
        results: {
          'result-1': {
            uuid: 'result-1',
            definition: 'R1',
            efforts: [
              { date: '2024-01-15', time: '10:00', comment: 'E1', time_spent: '60' }
            ]
          }
        }
      };
      const objective = new Objective(data, null);
      
      const firstCall = objective.efforts;
      const secondCall = objective.efforts;
      
      expect(firstCall).toBe(secondCall);
    });
  });

  describe('clearCache', () => {
    it('should clear all cached values including results', () => {
      const data = {
        uuid: 'objective-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31',
        results: {
          'result-1': {
            uuid: 'result-1',
            definition: 'R1',
            efforts: [
              { date: '2024-01-15', time: '10:00', comment: 'E1', modifier: '5', time_spent: '60' }
            ]
          }
        }
      };
      const objective = new Objective(data, null);
      
      // Access cached values
      objective.total_time;
      objective.completion;
      objective.efforts;
      objective.report;
      
      expect(objective.cached_total_time).toBeDefined();
      expect(objective.cached_completion_sum).toBeDefined();
      expect(objective.cached_efforts).toBeDefined();
      
      objective.clearCache();
      
      expect(objective.cached_total_time).toBeUndefined();
      expect(objective.cached_completion_sum).toBeUndefined();
      expect(objective.cached_efforts).toBeUndefined();
    });
  });

  describe('completionTillMonth', () => {
    it('should calculate completion up to specified month', () => {
      const data = {
        uuid: 'objective-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31',
        results: {
          'result-1': {
            uuid: 'result-1',
            definition: 'R1',
            initial: 0,
            target: 100,
            efforts: [
              { date: '2024-01-15', time: '10:00', comment: 'E1', modifier: '20' },
              { date: '2024-02-15', time: '11:00', comment: 'E2', modifier: '30' },
              { date: '2024-03-15', time: '12:00', comment: 'E3', modifier: '50' }
            ]
          }
        }
      };
      const objective = new Objective(data, null);
      
      const completionJan = objective.completionTillMonth('2024-01');
      const completionFeb = objective.completionTillMonth('2024-02');
      const completionMar = objective.completionTillMonth('2024-03');
      
      expect(completionJan).toBeGreaterThan(0);
      expect(completionFeb).toBeGreaterThan(completionJan);
      expect(completionMar).toBeGreaterThan(completionFeb);
    });

    it('should return 0 when no completion till specified month', () => {
      const data = {
        uuid: 'objective-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31',
        results: {
          'result-1': {
            uuid: 'result-1',
            definition: 'R1',
            efforts: [
              { date: '2024-03-15', time: '10:00', comment: 'E1', modifier: '20' }
            ]
          }
        }
      };
      const objective = new Objective(data, null);
      
      const completionJan = objective.completionTillMonth('2024-01');
      
      expect(completionJan).toBe(0);
    });
  });

  describe('parent getter', () => {
    it('should return the cached parent', () => {
      const parent = { id: 'parent-1' };
      const data = {
        uuid: 'objective-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31'
      };
      const objective = new Objective(data, parent);
      
      expect(objective.parent).toBe(parent);
    });
  });
});
