import YearPlan from '../../src/services/year-plan';
import Objective from '../../src/services/objective';
import Epic from '../../src/services/epic';
import Purpose from '../../src/services/purpose';

describe('YearPlan', () => {
  describe('constructor', () => {
    it('should create a year plan with year', () => {
      const yearPlan = new YearPlan(2024);
      
      expect(yearPlan).toBeTruthy();
      expect(yearPlan.year).toBe(2024);
      expect(yearPlan.objectives).toEqual([]);
    });
  });

  describe('addObjective', () => {
    it('should add objective with matching year', () => {
      const yearPlan = new YearPlan(2024);
      
      const objective = new Objective({
        uuid: 'obj-1',
        title: 'Test Objective',
        time_planned: 480,
        due_date: '2024-12-31'
      }, null);
      
      yearPlan.addObjective(objective);
      
      expect(yearPlan.objectives.length).toBe(1);
      expect(yearPlan.objectives[0]).toBe(objective);
    });

    it('should throw error for objective with wrong year', () => {
      const yearPlan = new YearPlan(2024);
      
      const objective = new Objective({
        uuid: 'obj-1',
        title: 'Test Objective',
        time_planned: 480,
        due_date: '2025-12-31'
      }, null);
      
      expect(() => yearPlan.addObjective(objective)).toThrowError('Cannot add objective not due to 2024');
    });

    it('should add multiple objectives', () => {
      const yearPlan = new YearPlan(2024);
      
      const obj1 = new Objective({
        uuid: 'obj-1',
        title: 'Objective 1',
        time_planned: 480,
        due_date: '2024-06-30'
      }, null);
      
      const obj2 = new Objective({
        uuid: 'obj-2',
        title: 'Objective 2',
        time_planned: 480,
        due_date: '2024-12-31'
      }, null);
      
      yearPlan.addObjective(obj1);
      yearPlan.addObjective(obj2);
      
      expect(yearPlan.objectives.length).toBe(2);
    });
  });

  describe('epics getter', () => {
    it('should return empty object for no objectives', () => {
      const yearPlan = new YearPlan(2024);
      
      const epics = yearPlan.epics;
      
      expect(epics).toEqual({});
    });

    it('should return unique epics from objectives', () => {
      const yearPlan = new YearPlan(2024);
      
      const epic = new Epic({
        uuid: 'epic-1',
        title: 'Test Epic',
        notes: 'Notes'
      }, null);
      
      const obj1 = new Objective({
        uuid: 'obj-1',
        title: 'Objective 1',
        time_planned: 480,
        due_date: '2024-06-30'
      }, epic);
      
      const obj2 = new Objective({
        uuid: 'obj-2',
        title: 'Objective 2',
        time_planned: 480,
        due_date: '2024-12-31'
      }, epic);
      
      yearPlan.addObjective(obj1);
      yearPlan.addObjective(obj2);
      
      const epics = yearPlan.epics;
      
      expect(Object.keys(epics).length).toBe(1);
      expect(epics['epic-1']).toBe(epic);
    });

    it('should return multiple epics', () => {
      const yearPlan = new YearPlan(2024);
      
      const epic1 = new Epic({
        uuid: 'epic-1',
        title: 'Epic 1',
        notes: 'Notes'
      }, null);
      
      const epic2 = new Epic({
        uuid: 'epic-2',
        title: 'Epic 2',
        notes: 'Notes'
      }, null);
      
      const obj1 = new Objective({
        uuid: 'obj-1',
        title: 'Objective 1',
        time_planned: 480,
        due_date: '2024-06-30'
      }, epic1);
      
      const obj2 = new Objective({
        uuid: 'obj-2',
        title: 'Objective 2',
        time_planned: 480,
        due_date: '2024-12-31'
      }, epic2);
      
      yearPlan.addObjective(obj1);
      yearPlan.addObjective(obj2);
      
      const epics = yearPlan.epics;
      
      expect(Object.keys(epics).length).toBe(2);
    });
  });

  describe('purposes getter', () => {
    it('should return empty object for no objectives', () => {
      const yearPlan = new YearPlan(2024);
      
      const purposes = yearPlan.purposes;
      
      expect(purposes).toEqual({});
    });

    it('should return unique purposes from epics', () => {
      const yearPlan = new YearPlan(2024);
      
      const purpose = new Purpose({
        uuid: 'purpose-1',
        definition: 'Test Purpose'
      });
      
      const epic = new Epic({
        uuid: 'epic-1',
        title: 'Test Epic',
        notes: 'Notes'
      }, purpose);
      
      const obj1 = new Objective({
        uuid: 'obj-1',
        title: 'Objective 1',
        time_planned: 480,
        due_date: '2024-06-30'
      }, epic);
      
      const obj2 = new Objective({
        uuid: 'obj-2',
        title: 'Objective 2',
        time_planned: 480,
        due_date: '2024-12-31'
      }, epic);
      
      yearPlan.addObjective(obj1);
      yearPlan.addObjective(obj2);
      
      const purposes = yearPlan.purposes;
      
      expect(Object.keys(purposes).length).toBe(1);
      expect(purposes['purpose-1']).toBe(purpose);
    });

    it('should return multiple purposes', () => {
      const yearPlan = new YearPlan(2024);
      
      const purpose1 = new Purpose({
        uuid: 'purpose-1',
        definition: 'Purpose 1'
      });
      
      const purpose2 = new Purpose({
        uuid: 'purpose-2',
        definition: 'Purpose 2'
      });
      
      const epic1 = new Epic({
        uuid: 'epic-1',
        title: 'Epic 1',
        notes: 'Notes'
      }, purpose1);
      
      const epic2 = new Epic({
        uuid: 'epic-2',
        title: 'Epic 2',
        notes: 'Notes'
      }, purpose2);
      
      const obj1 = new Objective({
        uuid: 'obj-1',
        title: 'Objective 1',
        time_planned: 480,
        due_date: '2024-06-30'
      }, epic1);
      
      const obj2 = new Objective({
        uuid: 'obj-2',
        title: 'Objective 2',
        time_planned: 480,
        due_date: '2024-12-31'
      }, epic2);
      
      yearPlan.addObjective(obj1);
      yearPlan.addObjective(obj2);
      
      const purposes = yearPlan.purposes;
      
      expect(Object.keys(purposes).length).toBe(2);
    });
  });

  describe('report getter', () => {
    it('should return empty report for no objectives', () => {
      const yearPlan = new YearPlan(2024);
      
      const report = yearPlan.report;
      
      expect(report.epics).toEqual([]);
      expect(report.purposes).toEqual([]);
      expect(report.objectives).toEqual([]);
    });

    it('should generate report with objectives', () => {
      const yearPlan = new YearPlan(2024);
      
      const purpose = new Purpose({
        uuid: 'purpose-1',
        definition: 'Test Purpose'
      });
      
      const epic = new Epic({
        uuid: 'epic-1',
        title: 'Test Epic',
        notes: 'Notes'
      }, purpose);
      
      const objective = new Objective({
        uuid: 'obj-1',
        title: 'Test Objective',
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
      }, epic);
      
      yearPlan.addObjective(objective);
      
      const report = yearPlan.report;
      
      expect(report.objectives.length).toBe(1);
      expect(report.objectives[0].objective).toBe(objective);
      expect(report.objectives[0].Q1).toBeDefined();
      expect(report.objectives[0].Q2).toBeDefined();
      expect(report.objectives[0].Q3).toBeDefined();
      expect(report.objectives[0].Q4).toBeDefined();
    });

    it('should generate report with epics', () => {
      const yearPlan = new YearPlan(2024);
      
      const purpose = new Purpose({
        uuid: 'purpose-1',
        definition: 'Test Purpose'
      });
      
      const epic = new Epic({
        uuid: 'epic-1',
        title: 'Test Epic',
        notes: 'Notes'
      }, purpose);
      
      const objective = new Objective({
        uuid: 'obj-1',
        title: 'Test Objective',
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
      }, epic);
      
      yearPlan.addObjective(objective);
      
      const report = yearPlan.report;
      
      expect(report.epics.length).toBe(1);
      expect(report.epics[0].epic).toBe(epic);
      expect(report.epics[0].previous).toBeDefined();
      expect(report.epics[0].Q1).toBeDefined();
      expect(report.epics[0].Q2).toBeDefined();
      expect(report.epics[0].Q3).toBeDefined();
      expect(report.epics[0].Q4).toBeDefined();
    });

    it('should generate report with purposes', () => {
      const yearPlan = new YearPlan(2024);
      
      const purpose = new Purpose({
        uuid: 'purpose-1',
        definition: 'Test Purpose'
      });
      
      const epic = new Epic({
        uuid: 'epic-1',
        title: 'Test Epic',
        notes: 'Notes'
      }, purpose);
      
      const objective = new Objective({
        uuid: 'obj-1',
        title: 'Test Objective',
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
      }, epic);
      
      yearPlan.addObjective(objective);
      
      const report = yearPlan.report;
      
      expect(report.purposes.length).toBe(1);
      expect(report.purposes[0].purpose).toBe(purpose);
      expect(report.purposes[0].previous).toBeDefined();
      expect(report.purposes[0].Q1).toBeDefined();
      expect(report.purposes[0].Q2).toBeDefined();
      expect(report.purposes[0].Q3).toBeDefined();
      expect(report.purposes[0].Q4).toBeDefined();
    });

    it('should handle multiple objectives with same epic', () => {
      const yearPlan = new YearPlan(2024);
      
      const purpose = new Purpose({
        uuid: 'purpose-1',
        definition: 'Test Purpose'
      });
      
      const epic = new Epic({
        uuid: 'epic-1',
        title: 'Test Epic',
        notes: 'Notes'
      }, purpose);
      
      const obj1 = new Objective({
        uuid: 'obj-1',
        title: 'Objective 1',
        time_planned: 480,
        due_date: '2024-06-30'
      }, epic);
      
      const obj2 = new Objective({
        uuid: 'obj-2',
        title: 'Objective 2',
        time_planned: 480,
        due_date: '2024-12-31'
      }, epic);
      
      yearPlan.addObjective(obj1);
      yearPlan.addObjective(obj2);
      
      const report = yearPlan.report;
      
      expect(report.objectives.length).toBe(2);
      expect(report.epics.length).toBe(1);
    });
  });
});
