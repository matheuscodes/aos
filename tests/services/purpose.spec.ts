import Purpose from '../../src/services/purpose';
import Epic from '../../src/services/epic';

describe('Purpose', () => {
  describe('constructor', () => {
    it('should create a purpose with basic data', () => {
      const data = {
        uuid: 'purpose-1',
        definition: 'Test Purpose'
      };
      const purpose = new Purpose(data);
      
      expect(purpose).toBeTruthy();
      expect(purpose.uuid).toBe('purpose-1');
      expect(purpose.definition).toBe('Test Purpose');
      expect(purpose.epics).toEqual({});
    });

    it('should create with epics', () => {
      const data = {
        uuid: 'purpose-1',
        definition: 'Test Purpose',
        epics: {
          'epic-1': {
            uuid: 'epic-1',
            title: 'Test Epic',
            notes: 'Epic notes'
          }
        }
      };
      const purpose = new Purpose(data);
      
      expect(Object.keys(purpose.epics).length).toBe(1);
      expect(purpose.epics['epic-1']).toBeInstanceOf(Epic);
      expect(purpose.epics['epic-1'].title).toBe('Test Epic');
    });
  });

  describe('total_time', () => {
    it('should return 0 for no epics', () => {
      const purpose = new Purpose({
        uuid: 'purpose-1',
        definition: 'Test'
      });
      
      expect(purpose.total_time).toBe(0);
    });

    it('should calculate total time from epics', () => {
      const data = {
        uuid: 'purpose-1',
        definition: 'Test',
        epics: {
          'epic-1': {
            uuid: 'epic-1',
            title: 'Epic 1',
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
          },
          'epic-2': {
            uuid: 'epic-2',
            title: 'Epic 2',
            notes: 'Notes',
            objectives: {
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
          }
        }
      };
      const purpose = new Purpose(data);
      
      expect(purpose.total_time).toBe(180);
    });

    it('should cache total_time calculation', () => {
      const purpose = new Purpose({
        uuid: 'purpose-1',
        definition: 'Test',
        epics: {
          'epic-1': {
            uuid: 'epic-1',
            title: 'Epic 1',
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
          }
        }
      });
      
      const firstCall = purpose.total_time;
      const secondCall = purpose.total_time;
      
      expect(firstCall).toBe(secondCall);
      expect(firstCall).toBe(60);
    });
  });

  describe('completion', () => {
    it('should return NaN for no epics', () => {
      const purpose = new Purpose({
        uuid: 'purpose-1',
        definition: 'Test'
      });
      
      expect(purpose.completion).toBeNaN();
    });

    it('should calculate average completion from epics', () => {
      const data = {
        uuid: 'purpose-1',
        definition: 'Test',
        epics: {
          'epic-1': {
            uuid: 'epic-1',
            title: 'Epic 1',
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
          },
          'epic-2': {
            uuid: 'epic-2',
            title: 'Epic 2',
            notes: 'Notes',
            objectives: {
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
          }
        }
      };
      const purpose = new Purpose(data);
      
      expect(purpose.completion).toBe(0.75);
    });

    it('should cache completion calculation', () => {
      const purpose = new Purpose({
        uuid: 'purpose-1',
        definition: 'Test',
        epics: {
          'epic-1': {
            uuid: 'epic-1',
            title: 'Epic 1',
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
          }
        }
      });
      
      const firstCall = purpose.completion;
      const secondCall = purpose.completion;
      
      expect(firstCall).toBe(secondCall);
      expect(firstCall).toBe(0.5);
    });
  });

  describe('report', () => {
    it('should generate monthly report from epics', () => {
      const data = {
        uuid: 'purpose-1',
        definition: 'Test',
        epics: {
          'epic-1': {
            uuid: 'epic-1',
            title: 'Epic 1',
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
          }
        }
      };
      const purpose = new Purpose(data);
      
      const report = purpose.report;
      
      expect(report.monthly).toBeDefined();
      expect(report.monthly['2024-01']).toBeDefined();
      expect(report.monthly['2024-01'].total_time).toBe(60);
      expect(report.monthly['2024-01'].total_money).toBe(100);
    });

    it('should aggregate multiple epics', () => {
      const data = {
        uuid: 'purpose-1',
        definition: 'Test',
        epics: {
          'epic-1': {
            uuid: 'epic-1',
            title: 'Epic 1',
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
              }
            }
          },
          'epic-2': {
            uuid: 'epic-2',
            title: 'Epic 2',
            notes: 'Notes',
            objectives: {
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
          }
        }
      };
      const purpose = new Purpose(data);
      
      const report = purpose.report;
      
      expect(report.monthly['2024-01'].total_time).toBe(180);
    });

    it('should cache report calculation', () => {
      const purpose = new Purpose({
        uuid: 'purpose-1',
        definition: 'Test',
        epics: {
          'epic-1': {
            uuid: 'epic-1',
            title: 'Epic 1',
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
          }
        }
      });
      
      const firstReport = purpose.report;
      const secondReport = purpose.report;
      
      // The monthly data should be the same reference (cached)
      expect(firstReport.monthly).toBe(secondReport.monthly);
    });
  });

  describe('clearCache', () => {
    it('should clear all cached values', () => {
      const purpose = new Purpose({
        uuid: 'purpose-1',
        definition: 'Test',
        epics: {
          'epic-1': {
            uuid: 'epic-1',
            title: 'Epic 1',
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
          }
        }
      });
      
      purpose.total_time;
      purpose.completion;
      purpose.report;
      
      purpose.clearCache();
      
      expect(purpose['cached_total_time']).toBeUndefined();
      expect(purpose['cached_completion_sum']).toBeUndefined();
      expect(purpose['monthly']).toBeUndefined();
    });
  });

  describe('completionTillMonth', () => {
    it('should return 0 for no completed work', () => {
      const purpose = new Purpose({
        uuid: 'purpose-1',
        definition: 'Test'
      });
      
      expect(purpose.completionTillMonth('2024-06')).toBe(0);
    });

    it('should calculate completion till specified month', () => {
      const data = {
        uuid: 'purpose-1',
        definition: 'Test',
        epics: {
          'epic-1': {
            uuid: 'epic-1',
            title: 'Epic 1',
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
          }
        }
      };
      const purpose = new Purpose(data);
      
      const completion = purpose.completionTillMonth('2024-02');
      
      expect(completion).toBeGreaterThan(0);
    });

    it('should only include months up to specified month', () => {
      const data = {
        uuid: 'purpose-1',
        definition: 'Test',
        epics: {
          'epic-1': {
            uuid: 'epic-1',
            title: 'Epic 1',
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
          }
        }
      };
      const purpose = new Purpose(data);
      
      const completionJan = purpose.completionTillMonth('2024-03');
      const completionJun = purpose.completionTillMonth('2024-08');
      
      expect(completionJun).toBeGreaterThan(completionJan);
    });
  });
});
