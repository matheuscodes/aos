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

    it('should call Plotly.newPlot', () => {
      component.everything = mockEverythingData;
      component.updateChart();
      expect((window as any).Plotly.newPlot).toHaveBeenCalled();
    });

    it('should pass element to Plotly.newPlot', () => {
      component.everything = mockEverythingData;
      component.updateChart();
      const plotlyCall = ((window as any).Plotly.newPlot as jasmine.Spy).calls.mostRecent();
      expect(plotlyCall.args[0]).toBe(component.summaryRadialChart.nativeElement);
    });

    it('should create sunburst chart data', () => {
      component.everything = mockEverythingData;
      component.updateChart();
      const plotlyCall = ((window as any).Plotly.newPlot as jasmine.Spy).calls.mostRecent();
      const data = plotlyCall.args[1];
      expect(data[0].type).toBe('sunburst');
    });

    it('should include all purposes in ids', () => {
      component.everything = mockEverythingData;
      component.updateChart();
      const plotlyCall = ((window as any).Plotly.newPlot as jasmine.Spy).calls.mostRecent();
      const data = plotlyCall.args[1];
      expect(data[0].ids).toContain('purpose-1');
      expect(data[0].ids).toContain('purpose-2');
    });

    it('should include all epics in ids', () => {
      component.everything = mockEverythingData;
      component.updateChart();
      const plotlyCall = ((window as any).Plotly.newPlot as jasmine.Spy).calls.mostRecent();
      const data = plotlyCall.args[1];
      expect(data[0].ids).toContain('epic-1');
      expect(data[0].ids).toContain('epic-2');
      expect(data[0].ids).toContain('epic-3');
    });

    it('should include all objectives in ids', () => {
      component.everything = mockEverythingData;
      component.updateChart();
      const plotlyCall = ((window as any).Plotly.newPlot as jasmine.Spy).calls.mostRecent();
      const data = plotlyCall.args[1];
      expect(data[0].ids).toContain('obj-1');
      expect(data[0].ids).toContain('obj-2');
      expect(data[0].ids).toContain('obj-3');
      expect(data[0].ids).toContain('obj-4');
    });

    it('should use definitions for purpose labels', () => {
      component.everything = mockEverythingData;
      component.updateChart();
      const plotlyCall = ((window as any).Plotly.newPlot as jasmine.Spy).calls.mostRecent();
      const data = plotlyCall.args[1];
      expect(data[0].labels).toContain('Test Purpose 1');
      expect(data[0].labels).toContain('Test Purpose 2');
    });

    it('should use titles for epic labels', () => {
      component.everything = mockEverythingData;
      component.updateChart();
      const plotlyCall = ((window as any).Plotly.newPlot as jasmine.Spy).calls.mostRecent();
      const data = plotlyCall.args[1];
      expect(data[0].labels).toContain('Epic 1');
      expect(data[0].labels).toContain('Epic 2');
      expect(data[0].labels).toContain('Epic 3');
    });

    it('should use titles for objective labels', () => {
      component.everything = mockEverythingData;
      component.updateChart();
      const plotlyCall = ((window as any).Plotly.newPlot as jasmine.Spy).calls.mostRecent();
      const data = plotlyCall.args[1];
      expect(data[0].labels).toContain('Objective 1');
      expect(data[0].labels).toContain('Objective 2');
      expect(data[0].labels).toContain('Objective 3');
      expect(data[0].labels).toContain('Objective 4');
    });

    it('should set empty parent for purposes', () => {
      component.everything = mockEverythingData;
      component.updateChart();
      const plotlyCall = ((window as any).Plotly.newPlot as jasmine.Spy).calls.mostRecent();
      const data = plotlyCall.args[1];
      const purpose1Index = data[0].ids.indexOf('purpose-1');
      expect(data[0].parents[purpose1Index]).toBe('');
    });

    it('should set purpose as parent for epics', () => {
      component.everything = mockEverythingData;
      component.updateChart();
      const plotlyCall = ((window as any).Plotly.newPlot as jasmine.Spy).calls.mostRecent();
      const data = plotlyCall.args[1];
      const epic1Index = data[0].ids.indexOf('epic-1');
      expect(data[0].parents[epic1Index]).toBe('purpose-1');
    });

    it('should set epic as parent for objectives', () => {
      component.everything = mockEverythingData;
      component.updateChart();
      const plotlyCall = ((window as any).Plotly.newPlot as jasmine.Spy).calls.mostRecent();
      const data = plotlyCall.args[1];
      const obj1Index = data[0].ids.indexOf('obj-1');
      expect(data[0].parents[obj1Index]).toBe('epic-1');
    });

    it('should have matching array lengths', () => {
      component.everything = mockEverythingData;
      component.updateChart();
      const plotlyCall = ((window as any).Plotly.newPlot as jasmine.Spy).calls.mostRecent();
      const data = plotlyCall.args[1];
      expect(data[0].ids.length).toBe(data[0].labels.length);
      expect(data[0].ids.length).toBe(data[0].parents.length);
    });

    it('should configure chart layout with correct height', () => {
      component.everything = mockEverythingData;
      component.updateChart();
      const plotlyCall = ((window as any).Plotly.newPlot as jasmine.Spy).calls.mostRecent();
      const layout = plotlyCall.args[2];
      expect(layout.height).toBe(1024);
    });

    it('should configure chart layout margins', () => {
      component.everything = mockEverythingData;
      component.updateChart();
      const plotlyCall = ((window as any).Plotly.newPlot as jasmine.Spy).calls.mostRecent();
      const layout = plotlyCall.args[2];
      expect(layout.margin).toBeDefined();
      expect(layout.margin.l).toBe(0);
      expect(layout.margin.r).toBe(0);
      expect(layout.margin.b).toBe(0);
      expect(layout.margin.t).toBe(0);
    });

    it('should configure text position as inside', () => {
      component.everything = mockEverythingData;
      component.updateChart();
      const plotlyCall = ((window as any).Plotly.newPlot as jasmine.Spy).calls.mostRecent();
      const data = plotlyCall.args[1];
      expect(data[0].textposition).toBe('inside');
    });

    it('should configure text orientation as radial', () => {
      component.everything = mockEverythingData;
      component.updateChart();
      const plotlyCall = ((window as any).Plotly.newPlot as jasmine.Spy).calls.mostRecent();
      const data = plotlyCall.args[1];
      expect(data[0].insidetextorientation).toBe('radial');
    });

    it('should configure marker line width', () => {
      component.everything = mockEverythingData;
      component.updateChart();
      const plotlyCall = ((window as any).Plotly.newPlot as jasmine.Spy).calls.mostRecent();
      const data = plotlyCall.args[1];
      expect(data[0].marker.line.width).toBe(2);
    });

    it('should log data to console', () => {
      component.everything = mockEverythingData;
      component.updateChart();
      expect(console.log).toHaveBeenCalled();
    });
  });

  describe('ViewChild references', () => {
    it('should have summaryRadialChart ViewChild property', () => {
      expect(component.summaryRadialChart).toBeDefined();
    });
  });

  describe('edge cases', () => {
    it('should handle empty everything array', () => {
      (window as any).Plotly = {
        newPlot: jasmine.createSpy('newPlot')
      };
      component.summaryRadialChart = { nativeElement: document.createElement('div') } as any;
      component.everything = [];
      component.updateChart();
      const plotlyCall = ((window as any).Plotly.newPlot as jasmine.Spy).calls.mostRecent();
      const data = plotlyCall.args[1];
      expect(data[0].ids.length).toBe(0);
    });

    it('should handle purpose without epics', () => {
      (window as any).Plotly = {
        newPlot: jasmine.createSpy('newPlot')
      };
      component.summaryRadialChart = { nativeElement: document.createElement('div') } as any;
      component.everything = [{ uuid: 'p1', definition: 'P1', epics: {} }];
      component.updateChart();
      const plotlyCall = ((window as any).Plotly.newPlot as jasmine.Spy).calls.mostRecent();
      const data = plotlyCall.args[1];
      expect(data[0].ids).toContain('p1');
      expect(data[0].ids.length).toBe(1);
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
      component.updateChart();
      const plotlyCall = ((window as any).Plotly.newPlot as jasmine.Spy).calls.mostRecent();
      const data = plotlyCall.args[1];
      expect(data[0].ids).toContain('p1');
      expect(data[0].ids).toContain('e1');
      expect(data[0].ids.length).toBe(2);
    });
  });
});
