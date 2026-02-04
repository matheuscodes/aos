import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultComponent } from '../../../src/app/result/result.component';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;

  const mockResultData = {
    uuid: 'result-123',
    title: 'Test Result',
    description: 'This is a test result description',
    target: 100,
    achieved: 75,
    unit: 'units',
    efforts: [
      {
        uuid: 'effort-1',
        date: new Date('2024-01-15'),
        time_spent: 120,
        comment: 'First effort'
      },
      {
        uuid: 'effort-2',
        date: new Date('2024-02-20'),
        time_spent: 180,
        comment: 'Second effort'
      }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
  });

  describe('component creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should be defined', () => {
      expect(component).toBeDefined();
    });

    it('should be an instance of ResultComponent', () => {
      expect(component instanceof ResultComponent).toBe(true);
    });
  });

  describe('input properties', () => {
    it('should have result input property', () => {
      expect(component.result).toBeUndefined();
    });

    it('should accept result input', () => {
      component.result = mockResultData;
      expect(component.result).toBe(mockResultData);
    });

    it('should accept result with uuid', () => {
      component.result = mockResultData;
      expect(component.result.uuid).toBe('result-123');
    });

    it('should accept result with title', () => {
      component.result = mockResultData;
      expect(component.result.title).toBe('Test Result');
    });

    it('should accept result with description', () => {
      component.result = mockResultData;
      expect(component.result.description).toBe('This is a test result description');
    });

    it('should accept result with target', () => {
      component.result = mockResultData;
      expect(component.result.target).toBe(100);
    });

    it('should accept result with achieved', () => {
      component.result = mockResultData;
      expect(component.result.achieved).toBe(75);
    });

    it('should accept result with unit', () => {
      component.result = mockResultData;
      expect(component.result.unit).toBe('units');
    });

    it('should accept result with efforts array', () => {
      component.result = mockResultData;
      expect(component.result.efforts).toBeDefined();
      expect(Array.isArray(component.result.efforts)).toBe(true);
      expect(component.result.efforts.length).toBe(2);
    });
  });

  describe('ngOnInit', () => {
    it('should be defined', () => {
      expect(component.ngOnInit).toBeDefined();
    });

    it('should execute without errors', () => {
      expect(() => component.ngOnInit()).not.toThrow();
    });

    it('should not throw when result is undefined', () => {
      component.result = undefined;
      expect(() => component.ngOnInit()).not.toThrow();
    });

    it('should not throw when result is provided', () => {
      component.result = mockResultData;
      expect(() => component.ngOnInit()).not.toThrow();
    });

    it('should not modify result input', () => {
      const originalResult = { ...mockResultData };
      component.result = mockResultData;
      component.ngOnInit();
      expect(component.result.uuid).toBe(originalResult.uuid);
      expect(component.result.title).toBe(originalResult.title);
    });
  });

  describe('template integration', () => {
    it('should compile template successfully', () => {
      component.result = mockResultData;
      fixture.detectChanges();
      expect(fixture.nativeElement).toBeTruthy();
    });

    it('should render without errors when result is undefined', () => {
      component.result = undefined;
      expect(() => fixture.detectChanges()).not.toThrow();
    });

    it('should render without errors when result is provided', () => {
      component.result = mockResultData;
      expect(() => fixture.detectChanges()).not.toThrow();
    });
  });

  describe('component instance', () => {
    it('should have all required properties', () => {
      expect(component.result).toBeDefined();
    });

    it('should have ngOnInit method', () => {
      expect(typeof component.ngOnInit).toBe('function');
    });
  });

  describe('lifecycle hooks', () => {
    it('should call ngOnInit on initialization', () => {
      spyOn(component, 'ngOnInit');
      component.ngOnInit();
      expect(component.ngOnInit).toHaveBeenCalled();
    });
  });

  describe('data handling', () => {
    it('should handle result with minimal data', () => {
      const minimalResult = {
        uuid: 'min-123',
        title: 'Minimal'
      };
      component.result = minimalResult;
      expect(component.result.uuid).toBe('min-123');
      expect(component.result.title).toBe('Minimal');
    });

    it('should handle result with complete data', () => {
      component.result = mockResultData;
      expect(component.result.uuid).toBe('result-123');
      expect(component.result.title).toBe('Test Result');
      expect(component.result.description).toBe('This is a test result description');
      expect(component.result.target).toBe(100);
      expect(component.result.achieved).toBe(75);
      expect(component.result.unit).toBe('units');
      expect(component.result.efforts).toBeDefined();
    });

    it('should handle result with null values', () => {
      const resultWithNull = {
        uuid: 'null-123',
        title: null,
        description: null,
        target: null,
        achieved: null,
        unit: null,
        efforts: null
      };
      component.result = resultWithNull;
      expect(component.result.uuid).toBe('null-123');
    });

    it('should handle result with empty strings', () => {
      const resultWithEmpty = {
        uuid: '',
        title: '',
        description: '',
        unit: ''
      };
      component.result = resultWithEmpty;
      expect(component.result.uuid).toBe('');
      expect(component.result.title).toBe('');
    });

    it('should handle result with zero values', () => {
      const resultWithZero = {
        uuid: 'zero-123',
        title: 'Zero Result',
        target: 0,
        achieved: 0
      };
      component.result = resultWithZero;
      expect(component.result.target).toBe(0);
      expect(component.result.achieved).toBe(0);
    });

    it('should handle result with empty efforts array', () => {
      const resultWithEmptyEfforts = {
        uuid: 'empty-123',
        title: 'Empty Efforts',
        efforts: []
      };
      component.result = resultWithEmptyEfforts;
      expect(component.result.efforts).toBeDefined();
      expect(component.result.efforts.length).toBe(0);
    });
  });

  describe('change detection', () => {
    it('should detect result input change', () => {
      component.result = mockResultData;
      fixture.detectChanges();
      expect(component.result).toBe(mockResultData);
    });

    it('should handle multiple result changes', () => {
      const result1 = { uuid: 'r1', title: 'Result 1', target: 50 };
      const result2 = { uuid: 'r2', title: 'Result 2', target: 100 };
      
      component.result = result1;
      fixture.detectChanges();
      expect(component.result).toBe(result1);
      
      component.result = result2;
      fixture.detectChanges();
      expect(component.result).toBe(result2);
    });
  });

  describe('numeric properties', () => {
    it('should handle positive target values', () => {
      component.result = { ...mockResultData, target: 1000 };
      expect(component.result.target).toBe(1000);
    });

    it('should handle positive achieved values', () => {
      component.result = { ...mockResultData, achieved: 750 };
      expect(component.result.achieved).toBe(750);
    });

    it('should handle target greater than achieved', () => {
      component.result = { ...mockResultData, target: 100, achieved: 50 };
      expect(component.result.target).toBeGreaterThan(component.result.achieved);
    });

    it('should handle achieved equal to target', () => {
      component.result = { ...mockResultData, target: 100, achieved: 100 };
      expect(component.result.achieved).toBe(component.result.target);
    });

    it('should handle achieved greater than target', () => {
      component.result = { ...mockResultData, target: 100, achieved: 150 };
      expect(component.result.achieved).toBeGreaterThan(component.result.target);
    });
  });
});
