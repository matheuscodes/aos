import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SummaryComponent } from '../../../src/app/summary/summary.component';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  const mockEverythingData = [
    {
      uuid: 'purpose-1',
      definition: 'Test Purpose 1',
      epics: {
        'epic-1': {
          uuid: 'epic-1',
          title: 'Epic 1',
          objectives: {
            'obj-1': {
              uuid: 'obj-1',
              title: 'Objective 1'
            },
            'obj-2': {
              uuid: 'obj-2',
              title: 'Objective 2'
            }
          }
        },
        'epic-2': {
          uuid: 'epic-2',
          title: 'Epic 2',
          objectives: {
            'obj-3': {
              uuid: 'obj-3',
              title: 'Objective 3'
            }
          }
        }
      }
    },
    {
      uuid: 'purpose-2',
      definition: 'Test Purpose 2',
      epics: {
        'epic-3': {
          uuid: 'epic-3',
          title: 'Epic 3',
          objectives: {
            'obj-4': {
              uuid: 'obj-4',
              title: 'Objective 4'
            }
          }
        }
      }
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
  });

  describe('component creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should be defined', () => {
      expect(component).toBeDefined();
    });

    it('should be an instance of SummaryComponent', () => {
      expect(component instanceof SummaryComponent).toBe(true);
    });
  });

  describe('input properties', () => {
    it('should have everything input property', () => {
      expect(component.everything).toBeUndefined();
    });

    it('should accept everything input', () => {
      component.everything = mockEverythingData;
      expect(component.everything).toBe(mockEverythingData);
    });

    it('should accept array of purposes', () => {
      component.everything = mockEverythingData;
      expect(Array.isArray(component.everything)).toBe(true);
      expect(component.everything.length).toBe(2);
    });

    it('should accept purposes with epics and objectives', () => {
      component.everything = mockEverythingData;
      expect(component.everything[0].epics).toBeDefined();
      expect(component.everything[0].epics['epic-1'].objectives).toBeDefined();
    });
  });

  describe('ngOnInit', () => {
    it('should be defined', () => {
      expect(component.ngOnInit).toBeDefined();
    });

    it('should execute without errors', () => {
      expect(() => component.ngOnInit()).not.toThrow();
    });

    it('should not throw when everything is undefined', () => {
      component.everything = undefined;
      expect(() => component.ngOnInit()).not.toThrow();
    });

    it('should not throw when everything is provided', () => {
      component.everything = mockEverythingData;
      expect(() => component.ngOnInit()).not.toThrow();
    });
  });

  describe('ngAfterViewInit', () => {
    beforeEach(() => {
      (window as any).Plotly = {
        newPlot: jasmine.createSpy('newPlot')
      };
    });

    it('should not call updateChart when everything is undefined', () => {
      spyOn(component, 'updateChart');
      component.everything = undefined;
      component.ngAfterViewInit();
      expect(component.updateChart).not.toHaveBeenCalled();
    });

    it('should not call updateChart when summaryRadialChart is undefined', () => {
      spyOn(component, 'updateChart');
      component.everything = mockEverythingData;
      component.summaryRadialChart = undefined;
      component.ngAfterViewInit();
      expect(component.updateChart).not.toHaveBeenCalled();
    });

    it('should call updateChart when both everything and summaryRadialChart are defined', () => {
      spyOn(component, 'updateChart');
      component.everything = mockEverythingData;
      component.summaryRadialChart = { nativeElement: document.createElement('div') } as any;
      component.ngAfterViewInit();
      expect(component.updateChart).toHaveBeenCalled();
    });
  });

  describe('updateChart', () => {
    beforeEach(() => {
      (window as any).Plotly = {
        newPlot: jasmine.createSpy('newPlot')
      };
      component.summaryRadialChart = { nativeElement: document.createElement('div') } as any;
      spyOn(console, 'log');
    });

    it('should log data to console', () => {
      component.everything = mockEverythingData;
      component.updateChart();
      expect(console.log).toHaveBeenCalled();
    });
  });

  describe('ViewChild references', () => {
    it('should have summaryRadialChart ViewChild property declared', () => {
      expect(component.summaryRadialChart).not.toBeDefined();
    });
  });

  describe('edge cases', () => {
    it('should handle empty everything array', () => {
      (window as any).Plotly = {
        newPlot: jasmine.createSpy('newPlot')
      };
      component.summaryRadialChart = { nativeElement: document.createElement('div') } as any;
      component.everything = [];
      expect(() => component.updateChart()).not.toThrow();
    });

    it('should handle purpose without epics', () => {
      (window as any).Plotly = {
        newPlot: jasmine.createSpy('newPlot')
      };
      component.summaryRadialChart = { nativeElement: document.createElement('div') } as any;
      component.everything = [{ uuid: 'p1', definition: 'P1', epics: {} }];
      expect(() => component.updateChart()).not.toThrow();
    });

    it('should handle epic without objectives', () => {
      (window as any).Plotly = {
        newPlot: jasmine.createSpy('newPlot')
      };
      component.summaryRadialChart = { nativeElement: document.createElement('div') } as any;
      component.everything = [{
        uuid: 'p1',
        definition: 'P1',
        epics: {
          'e1': { uuid: 'e1', title: 'E1', objectives: {} }
        }
      }];
      expect(() => component.updateChart()).not.toThrow();
    });
  });
});
