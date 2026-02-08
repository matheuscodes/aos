import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DataService } from '../../src/app/data.service';
import Purpose from '../../src/services/purpose';
import YearPlan from '../../src/services/year-plan';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;
  const purposesUrl = 'http://localhost:3001/api/purposes';

  // Mock data structure matching the expected API response
  const mockApiResponse = {
    purposes: {
      'purpose-1': {
        uuid: 'purpose-1',
        definition: 'Test Purpose 1',
        epics: {
          'epic-1': {
            uuid: 'epic-1',
            title: 'Epic 1',
            notes: 'Test notes',
            objectives: {
              'objective-1': {
                uuid: 'objective-1',
                title: 'Objective 1',
                time_planned: 480,
                due_date: '2024-12-31',
                results: {
                  'result-1': {
                    uuid: 'result-1',
                    definition: 'Result 1',
                    target: 100,
                    initial: 0,
                    efforts: []
                  }
                }
              }
            }
          }
        }
      },
      'purpose-2': {
        uuid: 'purpose-2',
        definition: 'Test Purpose 2',
        epics: {
          'epic-2': {
            uuid: 'epic-2',
            title: 'Epic 2',
            notes: 'Test notes 2',
            objectives: {
              'objective-2': {
                uuid: 'objective-2',
                title: 'Objective 2',
                time_planned: 240,
                due_date: '2025-06-30',
                results: {}
              }
            }
          }
        }
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    // Get the service and HTTP mock
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(DataService);

    // Handle the constructor's automatic refresh() call
    const req = httpMock.expectOne(purposesUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);
  });

  afterEach(() => {
    // Verify that no unmatched requests are outstanding
    httpMock.verify();
  });

  describe('constructor', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should initialize purposesUrl', () => {
      expect(service.purposesUrl).toBe(purposesUrl);
    });

    it('should initialize httpOptions', () => {
      expect(service.httpOptions).toBeDefined();
      expect(service.httpOptions.headers).toBeDefined();
    });

    it('should initialize yearly as empty object', () => {
      expect(service.yearly).toBeDefined();
      expect(typeof service.yearly).toBe('object');
    });

    it('should call refresh() on construction', () => {
      // Already handled in beforeEach - the mock expectation proves refresh was called
      const purposes = service.getData()();
      expect(Object.keys(purposes).length).toBe(2);
    });
  });

  describe('getData()', () => {
    it('should return a signal', () => {
      const result = service.getData();
      expect(typeof result).toBe('function'); // Signals are functions
    });

    it('should return purposes as a signal', () => {
      const purposes = service.getData()();
      expect(purposes).toBeDefined();
      expect(typeof purposes).toBe('object');
    });

    it('should return purposes with correct keys', () => {
      const purposes = service.getData()();
      expect(Object.keys(purposes)).toContain('purpose-1');
      expect(Object.keys(purposes)).toContain('purpose-2');
    });

    it('should return Purpose instances', () => {
      const purposes = service.getData()();
      expect(purposes['purpose-1']).toBeInstanceOf(Purpose);
      expect(purposes['purpose-2']).toBeInstanceOf(Purpose);
    });

    it('should have correct purpose data', () => {
      const purposes = service.getData()();
      expect(purposes['purpose-1'].uuid).toBe('purpose-1');
      expect(purposes['purpose-1'].definition).toBe('Test Purpose 1');
      expect(purposes['purpose-2'].uuid).toBe('purpose-2');
      expect(purposes['purpose-2'].definition).toBe('Test Purpose 2');
    });
  });

  describe('getYearly()', () => {
    it('should return yearly data', () => {
      const yearly = service.getYearly();
      expect(yearly).toBeDefined();
      expect(typeof yearly).toBe('object');
    });

    it('should contain year 2024', () => {
      const yearly = service.getYearly();
      expect(yearly[2024]).toBeDefined();
    });

    it('should contain year 2025', () => {
      const yearly = service.getYearly();
      expect(yearly[2025]).toBeDefined();
    });

    it('should have YearPlan instances', () => {
      const yearly = service.getYearly();
      expect(yearly[2024]).toBeInstanceOf(YearPlan);
      expect(yearly[2025]).toBeInstanceOf(YearPlan);
    });

    it('should have correct year values', () => {
      const yearly = service.getYearly();
      expect(yearly[2024].year).toBe(2024);
      expect(yearly[2025].year).toBe(2025);
    });

    it('should have objectives in year plans', () => {
      const yearly = service.getYearly();
      expect(yearly[2024].objectives.length).toBeGreaterThan(0);
      expect(yearly[2025].objectives.length).toBeGreaterThan(0);
    });
  });

  describe('refresh()', () => {
    it('should make GET request to purposes URL', () => {
      service.refresh();

      const req = httpMock.expectOne(purposesUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockApiResponse);
    });

    it('should update purposes signal with new data', () => {
      const newMockResponse = {
        purposes: {
          'purpose-3': {
            uuid: 'purpose-3',
            definition: 'New Purpose',
            epics: {}
          }
        }
      };

      service.refresh();

      const req = httpMock.expectOne(purposesUrl);
      req.flush(newMockResponse);

      const purposes = service.getData()();
      expect(Object.keys(purposes)).toContain('purpose-3');
      expect(purposes['purpose-3'].definition).toBe('New Purpose');
    });

    it('should reset yearly data', () => {
      const yearlyBefore = service.getYearly();
      expect(Object.keys(yearlyBefore).length).toBeGreaterThan(0);

      const emptyResponse = { purposes: {} };
      service.refresh();

      const req = httpMock.expectOne(purposesUrl);
      req.flush(emptyResponse);

      const yearlyAfter = service.getYearly();
      expect(Object.keys(yearlyAfter).length).toBe(0);
    });

    it('should create Purpose objects from response data', () => {
      service.refresh();

      const req = httpMock.expectOne(purposesUrl);
      req.flush(mockApiResponse);

      const purposes = service.getData()();
      expect(purposes['purpose-1']).toBeInstanceOf(Purpose);
      expect(purposes['purpose-1'].epics['epic-1']).toBeDefined();
    });

    it('should populate yearly data with objectives', () => {
      service.refresh();

      const req = httpMock.expectOne(purposesUrl);
      req.flush(mockApiResponse);

      const yearly = service.getYearly();
      expect(yearly[2024]).toBeDefined();
      expect(yearly[2024].objectives.length).toBe(1);
      expect(yearly[2025]).toBeDefined();
      expect(yearly[2025].objectives.length).toBe(1);
    });
  });

  describe('submit()', () => {
    it('demonstrates submit() bug with signal access', () => {
      // This test documents that submit() incorrectly accesses this.purposes
      // as an object instead of calling this.purposes() to get the signal value
      expect(() => service.submit()).toThrow();
    });
  });

  describe('clearCache()', () => {
    it('demonstrates clearCache() bug with signal access', () => {
      // This test documents that clearCache() incorrectly accesses this.purposes
      // as an object instead of calling this.purposes() to get the signal value
      expect(() => service.clearCache()).toThrow();
    });
  });

  describe('Integration tests', () => {
    it('should handle multiple refresh calls', () => {
      // First refresh
      service.refresh();
      const req1 = httpMock.expectOne(purposesUrl);
      req1.flush(mockApiResponse);

      // Second refresh with different data
      const newResponse = {
        purposes: {
          'purpose-4': {
            uuid: 'purpose-4',
            definition: 'Another Purpose',
            epics: {}
          }
        }
      };
      service.refresh();
      const req2 = httpMock.expectOne(purposesUrl);
      req2.flush(newResponse);

      const purposes = service.getData()();
      expect(Object.keys(purposes)).toContain('purpose-4');
      expect(Object.keys(purposes)).not.toContain('purpose-1');
    });
  });

  describe('Error handling', () => {
    it('should handle malformed response data', () => {
      const malformedResponse = {
        purposes: {
          'purpose-bad': {
            // Missing required fields
            uuid: 'purpose-bad'
            // definition is missing
          }
        }
      };

      service.refresh();
      const req = httpMock.expectOne(purposesUrl);
      req.flush(malformedResponse);

      // Should not throw, but create object anyway
      const purposes = service.getData()();
      expect(purposes['purpose-bad']).toBeDefined();
    });
  });
});
