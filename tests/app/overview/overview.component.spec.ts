import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OverviewComponent } from '../../../src/app/overview/overview.component';
import { DataService } from '../../../src/app/data.service';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;
  let dataService: jasmine.SpyObj<DataService>;

  const mockData: any = {
    'purpose-1': {
      uuid: 'purpose-1',
      definition: 'Test Purpose 1'
    },
    'purpose-2': {
      uuid: 'purpose-2',
      definition: 'Test Purpose 2'
    }
  };

  const mockYearlyData: any = {
    2024: {
      year: 2024,
      objectives: []
    }
  };

  beforeEach(async () => {
    const dataServiceSpy = jasmine.createSpyObj('DataService', [
      'getData',
      'getYearly',
      'clearCache',
      'submit'
    ]);

    await TestBed.configureTestingModule({
      declarations: [ OverviewComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: DataService, useValue: dataServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
  });

  describe('component creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should be defined', () => {
      expect(component).toBeDefined();
    });

    it('should be an instance of OverviewComponent', () => {
      expect(component instanceof OverviewComponent).toBe(true);
    });
  });

  describe('constructor', () => {
    it('should initialize queuedEfforts as empty array', () => {
      expect(component.queuedEfforts).toBeDefined();
      expect(Array.isArray(component.queuedEfforts)).toBe(true);
      expect(component.queuedEfforts.length).toBe(0);
    });

    it('should initialize data as empty array', () => {
      expect(component.data).toBeDefined();
      expect(Array.isArray(component.data)).toBe(true);
      expect(component.data.length).toBe(0);
    });

    it('should inject DataService', () => {
      expect(component['dataService']).toBeDefined();
    });
  });

  describe('getData', () => {
    it('should call dataService.getData', () => {
      dataService.getData.and.returnValue(mockData);
      const result = component.getData();
      expect(dataService.getData).toHaveBeenCalled();
    });

    it('should return data from dataService', () => {
      dataService.getData.and.returnValue(mockData);
      const result = component.getData();
      expect(result).toBe(mockData);
    });

    it('should add new items to data array', () => {
      dataService.getData.and.returnValue(mockData);
      component.getData();
      expect(component.data.length).toBe(2);
    });

    it('should not add duplicate items to data array', () => {
      dataService.getData.and.returnValue(mockData);
      component.getData();
      component.getData();
      expect(component.data.length).toBe(2);
    });

    it('should check uuid to prevent duplicates', () => {
      const dataWithUuid: any = {
        'purpose-1': { uuid: 'uuid-1', definition: 'Test 1' },
        'purpose-2': { uuid: 'uuid-2', definition: 'Test 2' }
      };
      dataService.getData.and.returnValue(dataWithUuid);
      component.getData();
      component.getData();
      expect(component.data.length).toBe(2);
    });
  });

  describe('getDataArray', () => {
    it('should return data array', () => {
      const result = component.getDataArray();
      expect(result).toBe(component.data);
    });

    it('should return empty array initially', () => {
      const result = component.getDataArray();
      expect(result).toEqual([]);
    });

    it('should return populated data array after getData call', () => {
      dataService.getData.and.returnValue(mockData);
      component.getData();
      const result = component.getDataArray();
      expect(result.length).toBe(2);
    });
  });

  describe('getYearly', () => {
    it('should call dataService.getYearly', () => {
      dataService.getYearly.and.returnValue(mockYearlyData);
      const result = component.getYearly();
      expect(dataService.getYearly).toHaveBeenCalled();
    });

    it('should return yearly data from dataService', () => {
      dataService.getYearly.and.returnValue(mockYearlyData);
      const result = component.getYearly();
      expect(result).toBe(mockYearlyData);
    });
  });

  describe('ngOnInit', () => {
    it('should be defined', () => {
      expect(component.ngOnInit).toBeDefined();
    });

    it('should execute without errors', () => {
      expect(() => component.ngOnInit()).not.toThrow();
    });
  });

  describe('addQueuedEffort', () => {
    it('should add new effort to queuedEfforts', () => {
      const initialLength = component.queuedEfforts.length;
      component.addQueuedEffort();
      expect(component.queuedEfforts.length).toBe(initialLength + 1);
    });

    it('should add effort with empty effort object', () => {
      component.addQueuedEffort();
      const lastEffort = component.queuedEfforts[component.queuedEfforts.length - 1];
      expect(lastEffort.effort).toBeDefined();
      expect(lastEffort.effort).toEqual({});
    });

    it('should add multiple efforts', () => {
      component.addQueuedEffort();
      component.addQueuedEffort();
      component.addQueuedEffort();
      expect(component.queuedEfforts.length).toBe(3);
    });
  });

  describe('selectObjective', () => {
    it('should set effort.objective from objectives array', () => {
      const mockEvent = { target: { value: 'obj-1' } };
      const effort = { effort: {} };
      const objectives = [
        { uuid: 'obj-1', title: 'Objective 1' },
        { uuid: 'obj-2', title: 'Objective 2' }
      ];

      component.selectObjective(mockEvent as any, effort, objectives);
      expect(effort['objective']).toBe(objectives[0]);
    });

    it('should find correct objective by uuid', () => {
      const mockEvent = { target: { value: 'obj-2' } };
      const effort = { effort: {} };
      const objectives = [
        { uuid: 'obj-1', title: 'Objective 1' },
        { uuid: 'obj-2', title: 'Objective 2' }
      ];

      component.selectObjective(mockEvent as any, effort, objectives);
      expect(effort['objective'].uuid).toBe('obj-2');
    });

    it('should handle non-existent uuid', () => {
      const mockEvent = { target: { value: 'obj-999' } };
      const effort = { effort: {} };
      const objectives = [
        { uuid: 'obj-1', title: 'Objective 1' }
      ];

      component.selectObjective(mockEvent as any, effort, objectives);
      expect(effort['objective']).toBeUndefined();
    });
  });

  describe('selectResult', () => {
    it('should set effort.result from results object', () => {
      const mockEvent = { target: { value: 'result-1' } };
      const effort = { effort: {} };
      const results = {
        'result-1': { uuid: 'result-1', title: 'Result 1' },
        'result-2': { uuid: 'result-2', title: 'Result 2' }
      };

      component.selectResult(mockEvent as any, effort, results);
      expect(effort['result']).toBe(results['result-1']);
    });

    it('should find correct result by uuid', () => {
      const mockEvent = { target: { value: 'result-2' } };
      const effort = { effort: {} };
      const results = {
        'result-1': { uuid: 'result-1', title: 'Result 1' },
        'result-2': { uuid: 'result-2', title: 'Result 2' }
      };

      component.selectResult(mockEvent as any, effort, results);
      expect(effort['result'].uuid).toBe('result-2');
    });

    it('should handle non-existent uuid', () => {
      const mockEvent = { target: { value: 'result-999' } };
      const effort = { effort: {} };
      const results = {
        'result-1': { uuid: 'result-1', title: 'Result 1' }
      };

      component.selectResult(mockEvent as any, effort, results);
      expect(effort['result']).toBeUndefined();
    });
  });

  describe('saveEfforts', () => {
    beforeEach(() => {
      (window as any).Effort = class MockEffort {
        constructor(effort: any, result: any) {
          if (!effort.date) throw new Error('Invalid Date');
        }
      };
    });

    it('should call dataService.clearCache', () => {
      const validEffort = {
        effort: { date: '2024-01-01' },
        result: { addEffort: jasmine.createSpy('addEffort') }
      };
      component.queuedEfforts = [validEffort];
      component.saveEfforts();
      expect(dataService.clearCache).toHaveBeenCalled();
    });

    it('should call dataService.submit', () => {
      component.queuedEfforts = [];
      component.saveEfforts();
      expect(dataService.submit).toHaveBeenCalled();
    });

    it('should add effort to result', () => {
      const addEffortSpy = jasmine.createSpy('addEffort');
      const validEffort = {
        effort: { date: '2024-01-01' },
        result: { addEffort: addEffortSpy }
      };
      component.queuedEfforts = [validEffort];
      component.saveEfforts();
      expect(addEffortSpy).toHaveBeenCalled();
    });

    it('should clear queuedEfforts on success', () => {
      const validEffort = {
        effort: { date: '2024-01-01' },
        result: { addEffort: jasmine.createSpy('addEffort') }
      };
      component.queuedEfforts = [validEffort];
      component.saveEfforts();
      expect(component.queuedEfforts.length).toBe(0);
    });

    it('should keep failed efforts in queuedEfforts', () => {
      const invalidEffort = {
        effort: {},
        result: { addEffort: jasmine.createSpy('addEffort') }
      };
      component.queuedEfforts = [invalidEffort];
      component.saveEfforts();
      expect(component.queuedEfforts.length).toBe(1);
      expect(component.queuedEfforts[0]).toBe(invalidEffort);
    });

    it('should handle mixed valid and invalid efforts', () => {
      const validEffort = {
        effort: { date: '2024-01-01' },
        result: { addEffort: jasmine.createSpy('addEffort') }
      };
      const invalidEffort = {
        effort: {},
        result: { addEffort: jasmine.createSpy('addEffort') }
      };
      component.queuedEfforts = [validEffort, invalidEffort];
      component.saveEfforts();
      expect(component.queuedEfforts.length).toBe(1);
      expect(component.queuedEfforts[0]).toBe(invalidEffort);
    });
  });

  describe('ViewChild references', () => {
    it('should have chart ViewChild property', () => {
      expect(component.chart).toBeDefined();
    });
  });

  describe('properties', () => {
    it('should have downloadedData property', () => {
      expect(component.downloadedData).toBeDefined();
    });

    it('should have queuedEfforts property', () => {
      expect(component.queuedEfforts).toBeDefined();
    });

    it('should have data property', () => {
      expect(component.data).toBeDefined();
    });
  });
});
