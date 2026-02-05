import Epic from '../../src/services/epic';
import Objective from '../../src/services/objective';

describe('Epic', () => {
  describe('constructor', () => {
    it('should create an epic with basic data', () => {
      const data = {
        uuid: 'epic-1',
        title: 'Test Epic',
        notes: 'Epic notes'
      };
      const epic = new Epic(data, null);
      
      expect(epic).toBeTruthy();
      expect(epic.uuid).toBe('epic-1');
      expect(epic.title).toBe('Test Epic');
      expect(epic.notes).toBe('Epic notes');
      expect(epic.objectives).toEqual({});
    });

    it('should create with objectives', () => {
      const data = {
        uuid: 'epic-1',
        title: 'Test Epic',
        notes: 'Notes',
        objectives: {
          'obj-1': {
            uuid: 'obj-1',
            title: 'Test Objective',
            time_planned: 480,
            due_date: '2024-12-31'
          }
        }
      };
      const epic = new Epic(data, null);
      
      expect(Object.keys(epic.objectives).length).toBe(1);
      expect(epic.objectives['obj-1']).toBeInstanceOf(Objective);
      expect(epic.objectives['obj-1'].title).toBe('Test Objective');
    });

    it('should store parent reference', () => {
      const parent = { uuid: 'parent-id' };
      const data = {
        uuid: 'epic-1',
        title: 'Test',
        notes: 'Notes'
      };
      const epic = new Epic(data, parent);
      
      expect(epic.parent).toBe(parent);
    });
  });

  describe('total_time', () => {
    it('should return 0 for no objectives', () => {
      const epic = new Epic({
        uuid: 'epic-1',
        title: 'Test',
        notes: 'Notes'
      }, null);
      
      expect(epic.total_time).toBe(0);
    });

    it('should calculate total time from objectives', () => {
      const data = {
        uuid: 'epic-1',
        title: 'Test',
        notes: 'Notes',
        objectives: {
          'obj-1': {
            uuid: 'obj-1',
            title: 'Objective 1',
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
          },
          'obj-2': {
            uuid: 'obj-2',
            title: 'Objective 2',
            time_planned: 480,
            due_date: '2024-12-31',
            results: {
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
          }
        }
      };
      const epic = new Epic(data, null);
      
      expect(epic.total_time).toBe(180);
    });

    it('should cache total_time calculation', () => {
      const epic = new Epic({
        uuid: 'epic-1',
        title: 'Test',
        notes: 'Notes',
        objectives: {
          'obj-1': {
            uuid: 'obj-1',
            title: 'Objective 1',
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
          }
        }
      }, null);
      
      const firstCall = epic.total_time;
      const secondCall = epic.total_time;
      
      expect(firstCall).toBe(secondCall);
      expect(firstCall).toBe(60);
    });
  });

  describe('completion', () => {
    it('should return NaN for no objectives', () => {
      const epic = new Epic({
        uuid: 'epic-1',
        title: 'Test',
        notes: 'Notes'
      }, null);
      
      expect(epic.completion).toBeNaN();
    });

    it('should calculate average completion from objectives', () => {
      const data = {
        uuid: 'epic-1',
        title: 'Test',
        notes: 'Notes',
        objectives: {
          'obj-1': {
            uuid: 'obj-1',
            title: 'Objective 1',
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
          },
          'obj-2': {
            uuid: 'obj-2',
            title: 'Objective 2',
            time_planned: 480,
            due_date: '2024-12-31',
            results: {
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
          }
        }
      };
      const epic = new Epic(data, null);
      
      expect(epic.completion).toBe(0.75);
    });

    it('should cache completion calculation', () => {
      const epic = new Epic({
        uuid: 'epic-1',
        title: 'Test',
        notes: 'Notes',
        objectives: {
          'obj-1': {
            uuid: 'obj-1',
            title: 'Objective 1',
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
          }
        }
      }, null);
      
      const firstCall = epic.completion;
      const secondCall = epic.completion;
      
      expect(firstCall).toBe(secondCall);
      expect(firstCall).toBe(0.5);
    });
  });

  describe('report', () => {
    it('should generate monthly report from objectives', () => {
      const data = {
        uuid: 'epic-1',
        title: 'Test',
        notes: 'Notes',
        objectives: {
          'obj-1': {
            uuid: 'obj-1',
            title: 'Objective 1',
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
          }
        }
      };
      const epic = new Epic(data, null);
      
      const report = epic.report;
      
      expect(report.monthly).toBeDefined();
      expect(report.monthly['2024-01']).toBeDefined();
      expect(report.monthly['2024-01'].total_time).toBe(60);
      expect(report.monthly['2024-01'].total_money).toBe(100);
    });

    it('should aggregate multiple objectives', () => {
      const data = {
        uuid: 'epic-1',
        title: 'Test',
        notes: 'Notes',
        objectives: {
          'obj-1': {
            uuid: 'obj-1',
            title: 'Objective 1',
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
              }
            }
          },
          'obj-2': {
            uuid: 'obj-2',
            title: 'Objective 2',
            time_planned: 480,
            due_date: '2024-12-31',
            results: {
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
          }
        }
      };
      const epic = new Epic(data, null);
      
      const report = epic.report;
      
      expect(report.monthly['2024-01'].total_time).toBe(180);
    });

    it('should cache report calculation', () => {
      const epic = new Epic({
        uuid: 'epic-1',
        title: 'Test',
        notes: 'Notes',
        objectives: {
          'obj-1': {
            uuid: 'obj-1',
            title: 'Objective 1',
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
          }
        }
      }, null);
      
      const firstReport = epic.report;
      const secondReport = epic.report;
      
      // The monthly data should be the same reference (cached)
      expect(firstReport.monthly).toBe(secondReport.monthly);
    });
  });

  describe('clearCache', () => {
    it('should clear all cached values', () => {
      const epic = new Epic({
        uuid: 'epic-1',
        title: 'Test',
        notes: 'Notes',
        objectives: {
          'obj-1': {
            uuid: 'obj-1',
            title: 'Objective 1',
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
          }
        }
      }, null);
      
      epic.total_time;
      epic.completion;
      epic.report;
      
      epic.clearCache();
      
      expect(epic['cached_total_time']).toBeUndefined();
      expect(epic['cached_completion_sum']).toBeUndefined();
      expect(epic['monthly']).toBeUndefined();
    });
  });

  describe('completionTillMonth', () => {
    it('should return 0 for no completed work', () => {
      const epic = new Epic({
        uuid: 'epic-1',
        title: 'Test',
        notes: 'Notes'
      }, null);
      
      expect(epic.completionTillMonth('2024-06')).toBe(0);
    });

    it('should calculate completion till specified month', () => {
      const data = {
        uuid: 'epic-1',
        title: 'Test',
        notes: 'Notes',
        objectives: {
          'obj-1': {
            uuid: 'obj-1',
            title: 'Objective 1',
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
          }
        }
      };
      const epic = new Epic(data, null);
      
      const completion = epic.completionTillMonth('2024-02');
      
      expect(completion).toBeGreaterThan(0);
    });

    it('should only include months up to specified month', () => {
      const data = {
        uuid: 'epic-1',
        title: 'Test',
        notes: 'Notes',
        objectives: {
          'obj-1': {
            uuid: 'obj-1',
            title: 'Objective 1',
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
          }
        }
      };
      const epic = new Epic(data, null);
      
      const completionJan = epic.completionTillMonth('2024-03');
      const completionJun = epic.completionTillMonth('2024-08');
      
      expect(completionJun).toBeGreaterThan(completionJan);
    });
  });

  describe('parent getter', () => {
    it('should return parent when set', () => {
      const parent = { uuid: 'parent-id' };
      const epic = new Epic({
        uuid: 'epic-1',
        title: 'Test',
        notes: 'Notes'
      }, parent);
      
      expect(epic.parent).toBe(parent);
    });
  });
});
