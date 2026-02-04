import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { EpicComponent } from '../../../src/app/epic/epic.component';

describe('EpicComponent', () => {
  let component: EpicComponent;
  let fixture: ComponentFixture<EpicComponent>;

  const mockEpicData = {
    uuid: 'epic-123',
    title: 'Test Epic',
    objectives: {
      'obj-1': {
        uuid: 'obj-1',
        title: 'Objective 1',
        due_date: new Date('2024-12-31')
      },
      'obj-2': {
        uuid: 'obj-2',
        title: 'Objective 2',
        due_date: new Date('2023-06-15')
      },
      'obj-3': {
        uuid: 'obj-3',
        title: 'Objective 3',
        due_date: new Date('2025-03-20')
      }
    },
    report: {
      monthly: {
        '2024-01': {
          total_time: 120,
          completion: 10,
          dedication: 5
        },
        '2024-02': {
          total_time: 180,
          completion: 15,
          dedication: 8
        },
        '2024-03': {
          total_time: 240,
          completion: 20,
          dedication: 12
        }
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpicComponent);
    component = fixture.componentInstance;
  });

  describe('component creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should be defined', () => {
      expect(component).toBeDefined();
    });

    it('should be an instance of EpicComponent', () => {
      expect(component instanceof EpicComponent).toBe(true);
    });
  });

  describe('input properties', () => {
    it('should have epic input property', () => {
      expect(component.epic).toBeUndefined();
    });

    it('should accept epic input', () => {
      component.epic = mockEpicData;
      expect(component.epic).toBe(mockEpicData);
    });

    it('should have objectives property', () => {
      expect(component.objectives).toBeDefined();
    });
  });

  describe('ngOnInit', () => {
    it('should not throw error when epic is undefined', () => {
      expect(() => component.ngOnInit()).not.toThrow();
    });

    it('should process objectives when epic is provided', () => {
      component.epic = mockEpicData;
      component.ngOnInit();
      expect(component.objectives).toBeDefined();
      expect(Array.isArray(component.objectives)).toBe(true);
    });

    it('should convert objectives object to array', () => {
      component.epic = mockEpicData;
      component.ngOnInit();
      expect(component.objectives.length).toBe(3);
    });

    it('should sort objectives by due_date year in descending order', () => {
      component.epic = mockEpicData;
      component.ngOnInit();
      expect(component.objectives[0].uuid).toBe('obj-3'); // 2025
      expect(component.objectives[1].uuid).toBe('obj-1'); // 2024
      expect(component.objectives[2].uuid).toBe('obj-2'); // 2023
    });

    it('should extract year from due_date correctly', () => {
      component.epic = mockEpicData;
      component.ngOnInit();
      const years = component.objectives.map(obj => 
        parseInt(obj.due_date.toJSON().slice(0, 4))
      );
      expect(years).toEqual([2025, 2024, 2023]);
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

      // Mock Chart.js constructor
      (window as any).Chart = jasmine.createSpy('Chart').and.returnValue({
        destroy: jasmine.createSpy('destroy'),
        update: jasmine.createSpy('update')
      });
    });

    it('should call getContext on chart element', () => {
      component.epic = mockEpicData;
      component.ngOnInit();
      component.createChart();
      expect(component.chart.nativeElement.getContext).toHaveBeenCalledWith('2d');
    });

    it('should create Chart instance', () => {
      component.epic = mockEpicData;
      component.ngOnInit();
      component.createChart();
      expect((window as any).Chart).toHaveBeenCalled();
    });

    it('should create line chart', () => {
      component.epic = mockEpicData;
      component.ngOnInit();
      component.createChart();
      const chartCall = ((window as any).Chart as jasmine.Spy).calls.mostRecent();
      expect(chartCall.args[1].type).toBe('line');
    });

    it('should have three datasets', () => {
      component.epic = mockEpicData;
      component.ngOnInit();
      component.createChart();
      const chartCall = ((window as any).Chart as jasmine.Spy).calls.mostRecent();
      expect(chartCall.args[1].data.datasets.length).toBe(3);
    });

    it('should have correct dataset labels', () => {
      component.epic = mockEpicData;
      component.ngOnInit();
      component.createChart();
      const chartCall = ((window as any).Chart as jasmine.Spy).calls.mostRecent();
      const datasets = chartCall.args[1].data.datasets;
      expect(datasets[0].label).toBe('Time Spent');
      expect(datasets[1].label).toBe('Completion');
      expect(datasets[2].label).toBe('Dedications');
    });

    it('should sort monthly keys', () => {
      component.epic = mockEpicData;
      component.ngOnInit();
      component.createChart();
      const chartCall = ((window as any).Chart as jasmine.Spy).calls.mostRecent();
      const labels = chartCall.args[1].data.labels;
      expect(labels).toEqual(['2024-01', '2024-02', '2024-03']);
    });

    it('should convert time to hours', () => {
      component.epic = mockEpicData;
      component.ngOnInit();
      component.createChart();
      const chartCall = ((window as any).Chart as jasmine.Spy).calls.mostRecent();
      const timeData = chartCall.args[1].data.datasets[0].data;
      expect(timeData[0]).toBe(2); // 120/60
      expect(timeData[1]).toBe(3); // 180/60
      expect(timeData[2]).toBe(4); // 240/60
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
    it('should have chart ViewChild property', () => {
      expect(component.chart).toBeDefined();
    });
  });
});
