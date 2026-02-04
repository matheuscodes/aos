import Purpose from '../../src/services/purpose';
import Epic from '../../src/services/epic';

describe('Purpose', () => {
  describe('constructor', () => {
    it('should create an instance with all properties', () => {
      const data = {
        uuid: 'purpose-123',
        definition: 'Main purpose definition',
        epics: {}
      };
      const purpose = new Purpose(data);
      
      expect(purpose).toBeTruthy();
      expect(purpose.uuid).toBe('purpose-123');
      expect(purpose.definition).toBe('Main purpose definition');
      expect(purpose.epics).toEqual({});
    });

    it('should create epics from data', () => {
      const data = {
        uuid: 'purpose-1',
        definition: 'Test Purpose',
        epics: {
          'epic-1': {
            uuid: 'epic-1',
            title: 'First Epic',
            notes: 'Notes 1',
            objectives: {}
          },
          'epic-2': {
            uuid: 'epic-2',
            title: 'Second Epic',
            notes: 'Notes 2',
            objectives: {}
          }
        }
      };
      const purpose = new Purpose(data);
      
      expect(Object.keys(purpose.epics).length).toBe(2);
      expect(purpose.epics['epic-1']).toBeInstanceOf(Epic);
      expect(purpose.epics['epic-1'].title).toBe('First Epic');
      expect(purpose.epics['epic-2'].title).toBe('Second Epic');
    });

    it('should set purpose as parent for epics', () => {
      const data = {
        uuid: 'purpose-1',
        definition: 'Test Purpose',
        epics: {
          'epic-1': {
            uuid: 'epic-1',
            title: 'Test Epic',
            notes: 'Notes',
            objectives: {}
          }
        }
      };
      const purpose = new Purpose(data);
      
      expect(purpose.epics['epic-1'].parent).toBe(purpose);
    });
  });

  describe('total_time getter', () => {
    it('should calculate total time from all epics', () => {
      const data = {
        uuid: 'purpose-1',
        definition: 'Test Purpose',
        epics: {
          'epic-1': {
            uuid: 'epic-1',
            title: 'E1',
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
          },
          'epic-2': {
            uuid: 'epic-2',
            title: 'E2',
            notes: 'Notes',
            objectives: {
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
          }
        }
      };
      const purpose = new Purpose(data);
      
      expect(purpose.total_time).toBe(210);
    });

    it('should return 0 when no epics', () => {
      const data = {
        uuid: 'purpose-1',
        definition: 'Test Purpose'
      };
      const purpose = new Purpose(data);
      
      expect(purpose.total_time).toBe(0);
    });

    it('should cache the total_time calculation', () => {
      const data = {
        uuid: 'purpose-1',
        definition: 'Test Purpose',
        epics: {
          'epic-1': {
            uuid: 'epic-1',
            title: 'E1',
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
          }
        }
      };
      const purpose = new Purpose(data);
      
      const firstCall = purpose.total_time;
      expect(purpose.cached_total_time).toBe(120);
      
      const secondCall = purpose.total_time;
      expect(secondCall).toBe(firstCall);
    });
  });

  describe('completion getter', () => {
    it('should calculate average completion from all epics', () => {
      const data = {
        uuid: 'purpose-1',
        definition: 'Test Purpose',
        epics: {
          'epic-1': {
            uuid: 'epic-1',
            title: 'E1',
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
          },
          'epic-2': {
            uuid: 'epic-2',
            title: 'E2',
            notes: 'Notes',
            objectives: {
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
          }
        }
      };
      const purpose = new Purpose(data);
      
      expect(purpose.completion).toBe(0.75); // (0.5 + 1.0) / 2
    });

    it('should return NaN when no epics', () => {
      const data = {
        uuid: 'purpose-1',
        definition: 'Test Purpose'
      };
      const purpose = new Purpose(data);
      
      // TODO: Fix this edge case - should return 0 when no epics
      expect(isNaN(purpose.completion)).toBe(true);
    });

    it('should cache the completion calculation', () => {
      const data = {
        uuid: 'purpose-1',
        definition: 'Test Purpose',
        epics: {
          'epic-1': {
            uuid: 'epic-1',
            title: 'E1',
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
          }
        }
      };
      const purpose = new Purpose(data);
      
      const firstCall = purpose.completion;
      expect(purpose.cached_completion_sum).toBe(0.5);
      
      const secondCall = purpose.completion;
      expect(secondCall).toBe(firstCall);
    });
  });

  describe('report getter', () => {
    it('should generate monthly report from epics', () => {
      const data = {
        uuid: 'purpose-1',
        definition: 'Test Purpose',
        epics: {
          'epic-1': {
            uuid: 'epic-1',
            title: 'E1',
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
                      { date: '2024-01-15', time: '10:00', comment: 'E1', time_spent: '60' }
                    ]
                  }
                }
              }
            }
          }
        }
      };
      const purpose = new Purpose(data);
      const report = purpose.report;
      
      expect(report.monthly).toBeDefined();
      expect(report.monthly['2024-01']).toBeDefined();
      expect(report.monthly['2024-01'].total_time).toBe(60);
    });

    it('should aggregate epics across months', () => {
      const data = {
        uuid: 'purpose-1',
        definition: 'Test Purpose',
        epics: {
          'epic-1': {
            uuid: 'epic-1',
            title: 'E1',
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
          }
        }
      };
      const purpose = new Purpose(data);
      const report = purpose.report;
      
      expect(Object.keys(report.monthly).length).toBe(2);
      expect(report.monthly['2024-01'].total_time).toBe(60);
      expect(report.monthly['2024-02'].total_time).toBe(90);
    });
  });

  describe('clearCache', () => {
    it('should clear all cached values including epics', () => {
      const data = {
        uuid: 'purpose-1',
        definition: 'Test Purpose',
        epics: {
          'epic-1': {
            uuid: 'epic-1',
            title: 'E1',
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
          }
        }
      };
      const purpose = new Purpose(data);
      
      // Access cached values
      purpose.total_time;
      purpose.completion;
      purpose.report;
      
      expect(purpose.cached_total_time).toBeDefined();
      expect(purpose.cached_completion_sum).toBeDefined();
      
      purpose.clearCache();
      
      expect(purpose.cached_total_time).toBeUndefined();
      expect(purpose.cached_completion_sum).toBeUndefined();
    });
  });

  describe('completionTillMonth', () => {
    it('should calculate completion up to specified month', () => {
      const data = {
        uuid: 'purpose-1',
        definition: 'Test Purpose',
        epics: {
          'epic-1': {
            uuid: 'epic-1',
            title: 'E1',
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
                      { date: '2024-02-15', time: '11:00', comment: 'E2', modifier: '30' }
                    ]
                  }
                }
              }
            }
          }
        }
      };
      const purpose = new Purpose(data);
      
      const completionJan = purpose.completionTillMonth('2024-01');
      const completionFeb = purpose.completionTillMonth('2024-02');
      
      expect(completionJan).toBeGreaterThan(0);
      expect(completionFeb).toBeGreaterThan(completionJan);
    });

    it('should return 0 when no completion till specified month', () => {
      const data = {
        uuid: 'purpose-1',
        definition: 'Test Purpose',
        epics: {
          'epic-1': {
            uuid: 'epic-1',
            title: 'E1',
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
          }
        }
      };
      const purpose = new Purpose(data);
      
      const completionJan = purpose.completionTillMonth('2024-01');
      
      expect(completionJan).toBe(0);
    });
  });
});
