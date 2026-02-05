import Objective from '../../src/services/objective';
import Result from '../../src/services/result';

describe('Objective', () => {
  describe('constructor', () => {
    it('should create an objective with basic data', () => {
      const data = {
        uuid: 'obj-1',
        title: 'Test Objective',
        time_planned: 480,
        due_date: '2024-12-31'
      };
      const objective = new Objective(data, null);
      
      expect(objective).toBeTruthy();
      expect(objective.uuid).toBe('obj-1');
      expect(objective.title).toBe('Test Objective');
      expect(objective.time_planned).toBe(480);
      expect(objective.due_date).toEqual(new Date('2024-12-31'));
      expect(objective.results).toEqual({});
    });

    it('should create with results', () => {
      const data = {
        uuid: 'obj-1',
        title: 'Test Objective',
        time_planned: 480,
        due_date: '2024-12-31',
        results: {
          'result-1': {
            uuid: 'result-1',
            definition: 'Test Result',
            target: 100,
            initial: 0
          }
        }
      };
      const objective = new Objective(data, null);
      
      expect(Object.keys(objective.results).length).toBe(1);
      expect(objective.results['result-1']).toBeInstanceOf(Result);
      expect(objective.results['result-1'].definition).toBe('Test Result');
    });

    it('should store parent reference', () => {
      const parent = { uuid: 'parent-id' };
      const data = {
        uuid: 'obj-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31'
      };
      const objective = new Objective(data, parent);
      
      expect(objective.parent).toBe(parent);
    });
  });

  describe('total_time', () => {
    it('should return 0 for no results', () => {
      const objective = new Objective({
        uuid: 'obj-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31'
      }, null);
      
      expect(objective.total_time).toBe(0);
    });

    it('should calculate total time from results', () => {
      const data = {
        uuid: 'obj-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31',
        results: {
          'result-1': {
            uuid: 'result-1',
            definition: 'Result 1',
            target: 100,
            initial: 0,
            efforts: [
              {
                date: '2024-01-15',
                time: '10:00',
                comment: 'Work',
                modifier: '10',
                time_spent: '60'
              }
            ]
          },
          'result-2': {
            uuid: 'result-2',
            definition: 'Result 2',
            target: 100,
            initial: 0,
            efforts: [
              {
                date: '2024-01-16',
                time: '11:00',
                comment: 'More work',
                modifier: '10',
                time_spent: '120'
              }
            ]
          }
        }
      };
      const objective = new Objective(data, null);
      
      expect(objective.total_time).toBe(180);
    });

    it('should cache total_time calculation', () => {
      const objective = new Objective({
        uuid: 'obj-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31',
        results: {
          'result-1': {
            uuid: 'result-1',
            definition: 'Result 1',
            target: 100,
            initial: 0,
            efforts: [
              {
                date: '2024-01-15',
                time: '10:00',
                comment: 'Work',
                modifier: '10',
                time_spent: '60'
              }
            ]
          }
        }
      }, null);
      
      const firstCall = objective.total_time;
      const secondCall = objective.total_time;
      
      expect(firstCall).toBe(secondCall);
      expect(firstCall).toBe(60);
    });
  });

  describe('completion', () => {
    it('should return NaN for no results', () => {
      const objective = new Objective({
        uuid: 'obj-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31'
      }, null);
      
      expect(objective.completion).toBeNaN();
    });

    it('should calculate average completion from results', () => {
      const data = {
        uuid: 'obj-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31',
        results: {
          'result-1': {
            uuid: 'result-1',
            definition: 'Result 1',
            target: 100,
            initial: 0,
            efforts: [
              {
                date: '2024-01-15',
                time: '10:00',
                comment: 'Work',
                modifier: '50'
              }
            ]
          },
          'result-2': {
            uuid: 'result-2',
            definition: 'Result 2',
            target: 100,
            initial: 0,
            efforts: [
              {
                date: '2024-01-16',
                time: '11:00',
                comment: 'More work',
                modifier: '100'
              }
            ]
          }
        }
      };
      const objective = new Objective(data, null);
      
      expect(objective.completion).toBe(0.75);
    });

    it('should cache completion calculation', () => {
      const objective = new Objective({
        uuid: 'obj-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31',
        results: {
          'result-1': {
            uuid: 'result-1',
            definition: 'Result 1',
            target: 100,
            initial: 0,
            efforts: [
              {
                date: '2024-01-15',
                time: '10:00',
                comment: 'Work',
                modifier: '50'
              }
            ]
          }
        }
      }, null);
      
      const firstCall = objective.completion;
      const secondCall = objective.completion;
      
      expect(firstCall).toBe(secondCall);
      expect(firstCall).toBe(0.5);
    });
  });

  describe('report', () => {
    it('should generate monthly report from results', () => {
      const data = {
        uuid: 'obj-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31',
        results: {
          'result-1': {
            uuid: 'result-1',
            definition: 'Result 1',
            target: 100,
            initial: 0,
            time_estimate: 240,
            efforts: [
              {
                date: '2024-01-15',
                time: '10:00',
                comment: 'Work',
                modifier: '50',
                time_spent: '60',
                money_spent: '100',
                thought_spent: '30',
                thew_spent: '10'
              }
            ]
          }
        }
      };
      const objective = new Objective(data, null);
      
      const report = objective.report;
      
      expect(report.monthly).toBeDefined();
      expect(report.monthly['2024-01']).toBeDefined();
      expect(report.monthly['2024-01'].total_time).toBe(60);
      expect(report.monthly['2024-01'].total_money).toBe(100);
    });

    it('should aggregate multiple results', () => {
      const data = {
        uuid: 'obj-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31',
        results: {
          'result-1': {
            uuid: 'result-1',
            definition: 'Result 1',
            target: 100,
            initial: 0,
            efforts: [
              {
                date: '2024-01-15',
                time: '10:00',
                comment: 'Work 1',
                modifier: '50',
                time_spent: '60'
              }
            ]
          },
          'result-2': {
            uuid: 'result-2',
            definition: 'Result 2',
            target: 100,
            initial: 0,
            efforts: [
              {
                date: '2024-01-16',
                time: '11:00',
                comment: 'Work 2',
                modifier: '50',
                time_spent: '120'
              }
            ]
          }
        }
      };
      const objective = new Objective(data, null);
      
      const report = objective.report;
      
      expect(report.monthly['2024-01'].total_time).toBe(180);
    });

    it('should cache report calculation', () => {
      const objective = new Objective({
        uuid: 'obj-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31',
        results: {
          'result-1': {
            uuid: 'result-1',
            definition: 'Result 1',
            target: 100,
            initial: 0,
            efforts: [
              {
                date: '2024-01-15',
                time: '10:00',
                comment: 'Work',
                modifier: '50',
                time_spent: '60'
              }
            ]
          }
        }
      }, null);
      
      const firstReport = objective.report;
      const secondReport = objective.report;
      
      // The monthly data should be the same reference (cached)
      expect(firstReport.monthly).toBe(secondReport.monthly);
    });
  });

  describe('efforts', () => {
    it('should aggregate efforts from all results', () => {
      const data = {
        uuid: 'obj-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31',
        results: {
          'result-1': {
            uuid: 'result-1',
            definition: 'Result 1',
            target: 100,
            initial: 0,
            efforts: [
              {
                date: '2024-01-15',
                time: '10:00',
                comment: 'Work 1',
                modifier: '50'
              }
            ]
          },
          'result-2': {
            uuid: 'result-2',
            definition: 'Result 2',
            target: 100,
            initial: 0,
            efforts: [
              {
                date: '2024-01-16',
                time: '11:00',
                comment: 'Work 2',
                modifier: '50'
              }
            ]
          }
        }
      };
      const objective = new Objective(data, null);
      
      const efforts = objective.efforts;
      
      expect(efforts.table.length).toBe(2);
    });

    it('should sort efforts by date descending', () => {
      const data = {
        uuid: 'obj-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31',
        results: {
          'result-1': {
            uuid: 'result-1',
            definition: 'Result 1',
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
                date: '2024-01-20',
                time: '11:00',
                comment: 'Second',
                modifier: '10'
              },
              {
                date: '2024-01-10',
                time: '09:00',
                comment: 'Third',
                modifier: '10'
              }
            ]
          }
        }
      };
      const objective = new Objective(data, null);
      
      const efforts = objective.efforts;
      
      expect(efforts.table[0].effort.comment).toBe('Second');
      expect(efforts.table[1].effort.comment).toBe('First');
      expect(efforts.table[2].effort.comment).toBe('Third');
    });

    it('should cache efforts calculation', () => {
      const objective = new Objective({
        uuid: 'obj-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31',
        results: {
          'result-1': {
            uuid: 'result-1',
            definition: 'Result 1',
            target: 100,
            initial: 0,
            efforts: [
              {
                date: '2024-01-15',
                time: '10:00',
                comment: 'Work',
                modifier: '50'
              }
            ]
          }
        }
      }, null);
      
      const firstCall = objective.efforts;
      const secondCall = objective.efforts;
      
      expect(firstCall).toBe(secondCall);
    });
  });

  describe('clearCache', () => {
    it('should clear all cached values', () => {
      const objective = new Objective({
        uuid: 'obj-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31',
        results: {
          'result-1': {
            uuid: 'result-1',
            definition: 'Result 1',
            target: 100,
            initial: 0,
            efforts: [
              {
                date: '2024-01-15',
                time: '10:00',
                comment: 'Work',
                modifier: '50',
                time_spent: '60'
              }
            ]
          }
        }
      }, null);
      
      objective.total_time;
      objective.completion;
      objective.report;
      objective.efforts;
      
      objective.clearCache();
      
      expect(objective['cached_total_time']).toBeUndefined();
      expect(objective['cached_completion_sum']).toBeUndefined();
      expect(objective['monthly']).toBeUndefined();
      expect(objective['cached_efforts']).toBeUndefined();
    });
  });

  describe('completionTillMonth', () => {
    it('should return 0 for no completed work', () => {
      const objective = new Objective({
        uuid: 'obj-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31'
      }, null);
      
      expect(objective.completionTillMonth('2024-06')).toBe(0);
    });

    it('should calculate completion till specified month', () => {
      const data = {
        uuid: 'obj-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31',
        results: {
          'result-1': {
            uuid: 'result-1',
            definition: 'Result 1',
            target: 100,
            initial: 0,
            efforts: [
              {
                date: '2024-01-15',
                time: '10:00',
                comment: 'Jan work',
                modifier: '25'
              },
              {
                date: '2024-03-15',
                time: '10:00',
                comment: 'Mar work',
                modifier: '25'
              }
            ]
          }
        }
      };
      const objective = new Objective(data, null);
      
      const completion = objective.completionTillMonth('2024-02');
      
      expect(completion).toBeGreaterThan(0);
    });

    it('should only include months up to specified month', () => {
      const data = {
        uuid: 'obj-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31',
        results: {
          'result-1': {
            uuid: 'result-1',
            definition: 'Result 1',
            target: 100,
            initial: 0,
            efforts: [
              {
                date: '2024-01-15',
                time: '10:00',
                comment: 'Jan',
                modifier: '30'
              },
              {
                date: '2024-06-15',
                time: '10:00',
                comment: 'Jun',
                modifier: '30'
              }
            ]
          }
        }
      };
      const objective = new Objective(data, null);
      
      const completionJan = objective.completionTillMonth('2024-03');
      const completionJun = objective.completionTillMonth('2024-08');
      
      expect(completionJun).toBeGreaterThan(completionJan);
    });
  });

  describe('parent getter', () => {
    it('should return parent when set', () => {
      const parent = { uuid: 'parent-id' };
      const objective = new Objective({
        uuid: 'obj-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31'
      }, parent);
      
      expect(objective.parent).toBe(parent);
    });
  });
});
