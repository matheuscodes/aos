import YearPlan from '../../src/services/year-plan';
import Objective from '../../src/services/objective';

describe('YearPlan', () => {
  describe('constructor', () => {
    it('should create an instance with year and empty objectives', () => {
      const yearPlan = new YearPlan(2024);
      
      expect(yearPlan).toBeTruthy();
      expect(yearPlan.year).toBe(2024);
      expect(yearPlan.objectives).toEqual([]);
      expect(Array.isArray(yearPlan.objectives)).toBe(true);
    });

    it('should accept different year values', () => {
      const yearPlan2023 = new YearPlan(2023);
      const yearPlan2025 = new YearPlan(2025);
      
      expect(yearPlan2023.year).toBe(2023);
      expect(yearPlan2025.year).toBe(2025);
    });
  });

  describe('addObjective', () => {
    it('should add objective with matching year', () => {
      const yearPlan = new YearPlan(2024);
      const objectiveData = {
        uuid: 'objective-1',
        title: 'Test Objective',
        time_planned: 480,
        due_date: '2024-06-30'
      };
      const objective = new Objective(objectiveData, null);
      
      yearPlan.addObjective(objective);
      
      expect(yearPlan.objectives.length).toBe(1);
      expect(yearPlan.objectives[0]).toBe(objective);
    });

    it('should throw error when objective year does not match', () => {
      const yearPlan = new YearPlan(2024);
      const objectiveData = {
        uuid: 'objective-1',
        title: 'Test Objective',
        time_planned: 480,
        due_date: '2023-06-30'
      };
      const objective = new Objective(objectiveData, null);
      
      expect(() => yearPlan.addObjective(objective)).toThrowError('Cannot add objective not due to 2024');
    });

    it('should add multiple objectives with same year', () => {
      const yearPlan = new YearPlan(2024);
      
      const objective1 = new Objective({
        uuid: 'objective-1',
        title: 'First',
        time_planned: 480,
        due_date: '2024-03-31'
      }, null);
      
      const objective2 = new Objective({
        uuid: 'objective-2',
        title: 'Second',
        time_planned: 240,
        due_date: '2024-09-30'
      }, null);
      
      yearPlan.addObjective(objective1);
      yearPlan.addObjective(objective2);
      
      expect(yearPlan.objectives.length).toBe(2);
      expect(yearPlan.objectives[0]).toBe(objective1);
      expect(yearPlan.objectives[1]).toBe(objective2);
    });

    it('should accept objectives with full timestamp dates', () => {
      const yearPlan = new YearPlan(2024);
      const objectiveData = {
        uuid: 'objective-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-12-31T23:59:59.999Z'
      };
      const objective = new Objective(objectiveData, null);
      
      yearPlan.addObjective(objective);
      
      expect(yearPlan.objectives.length).toBe(1);
    });
  });

  describe('epics getter', () => {
    it('should return unique epics from objectives', () => {
      const yearPlan = new YearPlan(2024);
      
      const epicParent = {
        uuid: 'epic-1',
        title: 'Test Epic'
      };
      
      const objective1 = new Objective({
        uuid: 'objective-1',
        title: 'First',
        time_planned: 480,
        due_date: '2024-03-31'
      }, epicParent);
      
      const objective2 = new Objective({
        uuid: 'objective-2',
        title: 'Second',
        time_planned: 240,
        due_date: '2024-09-30'
      }, epicParent);
      
      yearPlan.addObjective(objective1);
      yearPlan.addObjective(objective2);
      
      const epics = yearPlan.epics;
      
      expect(Object.keys(epics).length).toBe(1);
      expect(epics['epic-1']).toBe(epicParent);
    });

    it('should return multiple epics when objectives have different parents', () => {
      const yearPlan = new YearPlan(2024);
      
      const epic1 = { uuid: 'epic-1', title: 'Epic 1' };
      const epic2 = { uuid: 'epic-2', title: 'Epic 2' };
      
      const objective1 = new Objective({
        uuid: 'objective-1',
        title: 'First',
        time_planned: 480,
        due_date: '2024-03-31'
      }, epic1);
      
      const objective2 = new Objective({
        uuid: 'objective-2',
        title: 'Second',
        time_planned: 240,
        due_date: '2024-09-30'
      }, epic2);
      
      yearPlan.addObjective(objective1);
      yearPlan.addObjective(objective2);
      
      const epics = yearPlan.epics;
      
      expect(Object.keys(epics).length).toBe(2);
      expect(epics['epic-1']).toBe(epic1);
      expect(epics['epic-2']).toBe(epic2);
    });

    it('should return empty object when no objectives', () => {
      const yearPlan = new YearPlan(2024);
      const epics = yearPlan.epics;
      
      expect(Object.keys(epics).length).toBe(0);
    });
  });

  describe('purposes getter', () => {
    it('should return unique purposes from epics', () => {
      const yearPlan = new YearPlan(2024);
      
      const purpose = { uuid: 'purpose-1', definition: 'Test Purpose' };
      const epic = { uuid: 'epic-1', title: 'Test Epic', parent: purpose };
      
      const objective = new Objective({
        uuid: 'objective-1',
        title: 'First',
        time_planned: 480,
        due_date: '2024-03-31'
      }, epic);
      
      yearPlan.addObjective(objective);
      
      const purposes = yearPlan.purposes;
      
      expect(Object.keys(purposes).length).toBe(1);
      expect(purposes['purpose-1']).toBe(purpose);
    });

    it('should return multiple purposes when epics have different parents', () => {
      const yearPlan = new YearPlan(2024);
      
      const purpose1 = { uuid: 'purpose-1', definition: 'Purpose 1' };
      const purpose2 = { uuid: 'purpose-2', definition: 'Purpose 2' };
      const epic1 = { uuid: 'epic-1', title: 'Epic 1', parent: purpose1 };
      const epic2 = { uuid: 'epic-2', title: 'Epic 2', parent: purpose2 };
      
      const objective1 = new Objective({
        uuid: 'objective-1',
        title: 'First',
        time_planned: 480,
        due_date: '2024-03-31'
      }, epic1);
      
      const objective2 = new Objective({
        uuid: 'objective-2',
        title: 'Second',
        time_planned: 240,
        due_date: '2024-09-30'
      }, epic2);
      
      yearPlan.addObjective(objective1);
      yearPlan.addObjective(objective2);
      
      const purposes = yearPlan.purposes;
      
      expect(Object.keys(purposes).length).toBe(2);
      expect(purposes['purpose-1']).toBe(purpose1);
      expect(purposes['purpose-2']).toBe(purpose2);
    });
  });

  describe('report getter', () => {
    it('should generate report with epics, purposes, and objectives', () => {
      const yearPlan = new YearPlan(2024);
      
      const purpose = {
        uuid: 'purpose-1',
        definition: 'Test Purpose',
        completionTillMonth: (month: string) => 0.5
      };
      const epic = {
        uuid: 'epic-1',
        title: 'Test Epic',
        parent: purpose,
        completionTillMonth: (month: string) => 0.3
      };
      
      const objective = new Objective({
        uuid: 'objective-1',
        title: 'Test Objective',
        time_planned: 480,
        due_date: '2024-06-30',
        results: {}
      }, epic);
      
      yearPlan.addObjective(objective);
      
      const report = yearPlan.report;
      
      expect(report).toBeDefined();
      expect(report.epics).toBeDefined();
      expect(report.purposes).toBeDefined();
      expect(report.objectives).toBeDefined();
      expect(Array.isArray(report.epics)).toBe(true);
      expect(Array.isArray(report.purposes)).toBe(true);
      expect(Array.isArray(report.objectives)).toBe(true);
    });

    it('should include quarterly completion data for epics', () => {
      const yearPlan = new YearPlan(2024);
      
      const purpose = {
        uuid: 'purpose-1',
        definition: 'Test Purpose',
        completionTillMonth: (month: string) => 0.5
      };
      const epic = {
        uuid: 'epic-1',
        title: 'Test Epic',
        parent: purpose,
        completionTillMonth: (month: string) => {
          if (month <= '2023-12') return 0.1;
          if (month <= '2024-03') return 0.2;
          if (month <= '2024-06') return 0.4;
          if (month <= '2024-09') return 0.6;
          return 0.8;
        }
      };
      
      const objective = new Objective({
        uuid: 'objective-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-06-30'
      }, epic);
      
      yearPlan.addObjective(objective);
      
      const report = yearPlan.report;
      
      expect(report.epics.length).toBe(1);
      expect(report.epics[0].epic).toBe(epic);
      expect(report.epics[0].previous.completion).toBe(0.1);
      expect(report.epics[0].Q1.completion).toBe(0.2);
      expect(report.epics[0].Q2.completion).toBe(0.4);
      expect(report.epics[0].Q3.completion).toBe(0.6);
      expect(report.epics[0].Q4.completion).toBe(0.8);
    });

    it('should include quarterly completion data for purposes', () => {
      const yearPlan = new YearPlan(2024);
      
      const purpose = {
        uuid: 'purpose-1',
        definition: 'Test Purpose',
        completionTillMonth: (month: string) => {
          if (month <= '2023-12') return 0.2;
          if (month <= '2024-03') return 0.3;
          if (month <= '2024-06') return 0.5;
          if (month <= '2024-09') return 0.7;
          return 0.9;
        }
      };
      const epic = {
        uuid: 'epic-1',
        title: 'Test Epic',
        parent: purpose,
        completionTillMonth: (month: string) => 0.5
      };
      
      const objective = new Objective({
        uuid: 'objective-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-06-30'
      }, epic);
      
      yearPlan.addObjective(objective);
      
      const report = yearPlan.report;
      
      expect(report.purposes.length).toBe(1);
      expect(report.purposes[0].purpose).toBe(purpose);
      expect(report.purposes[0].previous.completion).toBe(0.2);
      expect(report.purposes[0].Q1.completion).toBe(0.3);
      expect(report.purposes[0].Q2.completion).toBe(0.5);
      expect(report.purposes[0].Q3.completion).toBe(0.7);
      expect(report.purposes[0].Q4.completion).toBe(0.9);
    });

    it('should include quarterly completion data for objectives', () => {
      const yearPlan = new YearPlan(2024);
      
      const purpose = {
        uuid: 'purpose-1',
        definition: 'Test Purpose',
        completionTillMonth: (month: string) => 0.5
      };
      const epic = {
        uuid: 'epic-1',
        title: 'Test Epic',
        parent: purpose,
        completionTillMonth: (month: string) => 0.5
      };
      
      const objective = new Objective({
        uuid: 'objective-1',
        title: 'Test',
        time_planned: 480,
        due_date: '2024-06-30',
        results: {}
      }, epic);
      
      yearPlan.addObjective(objective);
      
      const report = yearPlan.report;
      
      expect(report.objectives.length).toBe(1);
      expect(report.objectives[0].objective).toBe(objective);
      expect(report.objectives[0]).toHaveProperty('Q1');
      expect(report.objectives[0]).toHaveProperty('Q2');
      expect(report.objectives[0]).toHaveProperty('Q3');
      expect(report.objectives[0]).toHaveProperty('Q4');
    });
  });
});
