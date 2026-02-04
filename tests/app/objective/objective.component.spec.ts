import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObjectiveComponent } from '../../../src/app/objective/objective.component';

describe('ObjectiveComponent', () => {
  let component: ObjectiveComponent;
  let fixture: ComponentFixture<ObjectiveComponent>;

  const mockObjectiveData = {
    uuid: 'obj-123',
    title: 'Test Objective',
    results: {
      'result-1': {
        uuid: 'result-1',
        title: 'Result 1'
      },
      'result-2': {
        uuid: 'result-2',
        title: 'Result 2'
      }
    },
    report: {
      monthly: {
        '2024-01': {
          total_time: 60,
          completion: 5,
          dedication: 3
        },
        '2024-02': {
          total_time: 90,
          completion: 8,
          dedication: 5
        },
        '2024-03': {
          total_time: 120,
          completion: 12,
          dedication: 7
        }
      }
    }
  };

  const mockObjectiveWithoutResults = {
    uuid: 'obj-456',
    title: 'Test Objective Without Results',
    report: {
      monthly: {
        '2024-01': {
          total_time: 60,
          completion: 5,
          dedication: 3
        }
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectiveComponent);
    component = fixture.componentInstance;
  });

  describe('component creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should be defined', () => {
      expect(component).toBeDefined();
    });

    it('should be an instance of ObjectiveComponent', () => {
      expect(component instanceof ObjectiveComponent).toBe(true);
    });
  });

  describe('input properties', () => {
    it('should have objective input property', () => {
      expect(component.objective).toBeUndefined();
    });

    it('should accept objective input', () => {
      component.objective = mockObjectiveData;
      expect(component.objective).toBe(mockObjectiveData);
    });

    it('should handle objective with results', () => {
      component.objective = mockObjectiveData;
      expect(component.objective.results).toBeDefined();
      expect(Object.keys(component.objective.results).length).toBe(2);
    });

    it('should handle objective without results', () => {
      component.objective = mockObjectiveWithoutResults;
      expect(component.objective.results).toBeUndefined();
    });
  });

  describe('ngOnInit', () => {
    it('should be defined', () => {
      expect(component.ngOnInit).toBeDefined();
    });

    it('should execute without errors', () => {
      expect(() => component.ngOnInit()).not.toThrow();
    });

    it('should not throw when objective is undefined', () => {
      component.objective = undefined;
      expect(() => component.ngOnInit()).not.toThrow();
    });

    it('should not throw when objective is provided', () => {
      component.objective = mockObjectiveData;
      expect(() => component.ngOnInit()).not.toThrow();
    });
  });

  describe('createChart', () => {
    beforeEach(() => {
      const mockCanvas = document.createElement('canvas');
      const mockContext = mockCanvas.getContext('2d');
      
      component.chart = {
        nativeElement: {
          getContext: jasmine.createSpy('getContext').and.returnValue(mockContext)
        }
      } as any;

      (window as any).Chart = jasmine.createSpy('Chart').and.returnValue({
        destroy: jasmine.createSpy('destroy'),
        update: jasmine.createSpy('update')
      });
    });

    it('should not create chart when objective has no results', () => {
      component.objective = mockObjectiveWithoutResults;
      component.createChart();
      expect((window as any).Chart).not.toHaveBeenCalled();
    });

    it('should call getContext when objective has results', () => {
      component.objective = mockObjectiveData;
      component.createChart();
      expect(component.chart.nativeElement.getContext).toHaveBeenCalledWith('2d');
    });
  });

  describe('ngAfterViewInit', () => {
    it('should call createChart', () => {
      spyOn(component, 'createChart');
      component.ngAfterViewInit();
      expect(component.createChart).toHaveBeenCalled();
    });
  });

  describe('ViewChild references', () => {
    it('should have chart ViewChild property declared', () => {
      expect(component.chart).not.toBeDefined();
    });
  });
});
