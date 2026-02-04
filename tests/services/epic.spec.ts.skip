import Epic from '../../src/services/epic';
import Objective from '../../src/services/objective';

describe('Epic', () => {
  describe('constructor', () => {
    it('should create an instance with all properties', () => {
      const data = {
        uuid: 'epic-123',
        title: 'Epic Project',
        notes: 'Important notes',
        objectives: {}
      };
      const parent = { id: 'parent-1' };
      const epic = new Epic(data, parent);
      
      expect(epic).toBeTruthy();
      expect(epic.uuid).toBe('epic-123');
      expect(epic.title).toBe('Epic Project');
      expect(epic.notes).toBe('Important notes');
      expect(epic.objectives).toEqual({});
      expect(epic.cached_parent).toBe(parent);
    });

    it('should create objectives from data', () => {
      const data = {
        uuid: 'epic-1',
        title: 'Test Epic',
        notes: 'Notes',
        objectives: {
          'objective-1': {
            uuid: 'objective-1',
            title: 'First Objective',
            time_planned: 480,
            due_date: '2024-12-31'
          },
          'objective-2': {
            uuid: 'objective-2',
            title: 'Second Objective',
            time_planned: 240,
            due_date: '2024-06-30'
          }
        }
      };
      const epic = new Epic(data, null);
      
      expect(Object.keys(epic.objectives).length).toBe(2);
      expect(epic.objectives['objective-1']).toBeInstanceOf(Objective);
      expect(epic.objectives['objective-1'].title).toBe('First Objective');
      expect(epic.objectives['objective-2'].title).toBe('Second Objective');
    });

    it('should set epic as parent for objectives', () => {
      const data = {
        uuid: 'epic-1',
        title: 'Test Epic',
        notes: 'Notes',
        objectives: {
          'objective-1': {
            uuid: 'objective-1',
            title: 'Test Objective',
            time_planned: 480,
            due_date: '2024-12-31'
          }
        }
      };
      const epic = new Epic(data, null);
      
      expect(epic.objectives['objective-1'].parent).toBe(epic);
    });
  });

  describe('total_time getter', () => {
    it('should calculate total time from all objectives', () => {
      const data = {
        uuid: 'epic-1',
        title: 'Test Epic',
        notes: 'Notes',
        objectives: {
          'objective-1': {
            uuid: 'objective-1',
            title: 'O1',
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
          },
          'objective-2': {
            uuid: 'objective-2',
            title: 'O2',
            time_planned: 240,
            due_date: '2024-06-30',
            results: {
              'result-2': {
                uuid: 'result-2',
                definition: 'R2',
                efforts: [
                  { date: '2024-01-16', time: '11:00', comment: 'E2', time_spent: '90' }
                ]
              }
            }
          }
        }
      };
      const epic = new Epic(data, null);
      
      expect(epic.total_time).toBe(210);
    });

    it('should return 0 when no objectives', () => {
      const data = {
        uuid: 'epic-1',
        title: 'Test Epic',
        notes: 'Notes'
      };
      const epic = new Epic(data, null);
      
      expect(epic.total_time).toBe(0);
    });

    it('should cache the total_time calculation', () => {
      const data = {
        uuid: 'epic-1',
        title: 'Test Epic',
        notes: 'Notes',
        objectives: {
          'objective-1': {
            uuid: 'objective-1',
            title: 'O1',
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
          }
        }
      };
      const epic = new Epic(data, null);
      
      const firstCall = epic.total_time;
      expect(epic.cached_total_time).toBe(120);
      
      const secondCall = epic.total_time;
      expect(secondCall).toBe(firstCall);
    });
  });

  describe('completion getter', () => {
    it('should calculate average completion from all objectives', () => {
      const data = {
        uuid: 'epic-1',
        title: 'Test Epic',
        notes: 'Notes',
        objectives: {
          'objective-1': {
            uuid: 'objective-1',
            title: 'O1',
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
          },
          'objective-2': {
            uuid: 'objective-2',
            title: 'O2',
            time_planned: 240,
            due_date: '2024-06-30',
            results: {
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
          }
        }
      };
      const epic = new Epic(data, null);
      
      expect(epic.completion).toBe(0.75); // (0.5 + 1.0) / 2
    });

    it('should return NaN when no objectives', () => {
      const data = {
        uuid: 'epic-1',
        title: 'Test Epic',
        notes: 'Notes'
      };
      const epic = new Epic(data, null);
      
      // TODO: Fix this edge case - should return 0 when no objectives
      expect(isNaN(epic.completion)).toBe(true);
    });

    it('should cache the completion calculation', () => {
      const data = {
        uuid: 'epic-1',
        title: 'Test Epic',
        notes: 'Notes',
        objectives: {
          'objective-1': {
            uuid: 'objective-1',
            title: 'O1',
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
          }
        }
      };
      const epic = new Epic(data, null);
      
      const firstCall = epic.completion;
      expect(epic.cached_completion_sum).toBe(0.5);
      
      const secondCall = epic.completion;
      expect(secondCall).toBe(firstCall);
    });
  });

  describe('report getter', () => {
    it('should generate monthly report from objectives', () => {
      const data = {
        uuid: 'epic-1',
        title: 'Test Epic',
        notes: 'Notes',
        objectives: {
          'objective-1': {
            uuid: 'objective-1',
            title: 'O1',
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
    });

    it('should aggregate objectives across months', () => {
      const data = {
        uuid: 'epic-1',
        title: 'Test Epic',
        notes: 'Notes',
        objectives: {
          'objective-1': {
            uuid: 'objective-1',
            title: 'O1',
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
          }
        }
      };
      const epic = new Epic(data, null);
      const report = epic.report;
      
      expect(Object.keys(report.monthly).length).toBe(2);
      expect(report.monthly['2024-01'].total_time).toBe(60);
      expect(report.monthly['2024-02'].total_time).toBe(90);
    });
  });

  describe('clearCache', () => {
    it('should clear all cached values including objectives', () => {
      const data = {
        uuid: 'epic-1',
        title: 'Test Epic',
        notes: 'Notes',
        objectives: {
          'objective-1': {
            uuid: 'objective-1',
            title: 'O1',
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
          }
        }
      };
      const epic = new Epic(data, null);
      
      // Access cached values
      epic.total_time;
      epic.completion;
      epic.report;
      
      expect(epic.cached_total_time).toBeDefined();
      expect(epic.cached_completion_sum).toBeDefined();
      
      epic.clearCache();
      
      expect(epic.cached_total_time).toBeUndefined();
      expect(epic.cached_completion_sum).toBeUndefined();
    });
  });

  describe('completionTillMonth', () => {
    it('should calculate completion up to specified month', () => {
      const data = {
        uuid: 'epic-1',
        title: 'Test Epic',
        notes: 'Notes',
        objectives: {
          'objective-1': {
            uuid: 'objective-1',
            title: 'O1',
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
          }
        }
      };
      const epic = new Epic(data, null);
      
      const completionJan = epic.completionTillMonth('2024-01');
      const completionFeb = epic.completionTillMonth('2024-02');
      const completionMar = epic.completionTillMonth('2024-03');
      
      expect(completionJan).toBeGreaterThan(0);
      expect(completionFeb).toBeGreaterThan(completionJan);
      expect(completionMar).toBeGreaterThan(completionFeb);
    });

    it('should return 0 when no completion till specified month', () => {
      const data = {
        uuid: 'epic-1',
        title: 'Test Epic',
        notes: 'Notes',
        objectives: {
          'objective-1': {
            uuid: 'objective-1',
            title: 'O1',
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
          }
        }
      };
      const epic = new Epic(data, null);
      
      const completionJan = epic.completionTillMonth('2024-01');
      
      expect(completionJan).toBe(0);
    });
  });

  describe('parent getter', () => {
    it('should return the cached parent', () => {
      const parent = { id: 'parent-1' };
      const data = {
        uuid: 'epic-1',
        title: 'Test Epic',
        notes: 'Notes'
      };
      const epic = new Epic(data, parent);
      
      expect(epic.parent).toBe(parent);
    });
  });
});
