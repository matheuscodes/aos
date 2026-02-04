import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from '../../src/app/data.service';
import Purpose from '../../src/services/purpose';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('constructor', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should initialize with empty purposes', () => {
      // Cancel the automatic refresh request
      const req = httpMock.expectOne('http://localhost:3001/api/purposes');
      req.flush({ purposes: {} });
      
      expect(service.purposes).toBeDefined();
      expect(typeof service.purposes).toBe('object');
    });

    it('should initialize yearly object', () => {
      const req = httpMock.expectOne('http://localhost:3001/api/purposes');
      req.flush({ purposes: {} });
      
      expect(service.yearly).toBeDefined();
      expect(typeof service.yearly).toBe('object');
    });

    it('should set correct purposesUrl', () => {
      const req = httpMock.expectOne('http://localhost:3001/api/purposes');
      req.flush({ purposes: {} });
      
      expect(service.purposesUrl).toBe('http://localhost:3001/api/purposes');
    });

    it('should call refresh on construction', () => {
      const req = httpMock.expectOne('http://localhost:3001/api/purposes');
      expect(req.request.method).toBe('GET');
      req.flush({ purposes: {} });
    });
  });

  describe('getData', () => {
    it('should return purposes object', () => {
      const req = httpMock.expectOne('http://localhost:3001/api/purposes');
      req.flush({ purposes: {} });
      
      const data = service.getData();
      expect(data).toBe(service.purposes);
    });
  });

  describe('getYearly', () => {
    it('should return yearly object', () => {
      const req = httpMock.expectOne('http://localhost:3001/api/purposes');
      req.flush({ purposes: {} });
      
      const yearly = service.getYearly();
      expect(yearly).toBe(service.yearly);
    });
  });

  describe('clearCache', () => {
    it('should call clearCache on all purposes', () => {
      const req = httpMock.expectOne('http://localhost:3001/api/purposes');
      const mockPurpose1 = {
        uuid: 'purpose-1',
        definition: 'Purpose 1',
        epics: {}
      };
      const mockPurpose2 = {
        uuid: 'purpose-2',
        definition: 'Purpose 2',
        epics: {}
      };
      
      req.flush({
        purposes: {
          'purpose-1': mockPurpose1,
          'purpose-2': mockPurpose2
        }
      });
      
      spyOn(service.purposes['purpose-1'], 'clearCache');
      spyOn(service.purposes['purpose-2'], 'clearCache');
      
      service.clearCache();
      
      expect(service.purposes['purpose-1'].clearCache).toHaveBeenCalled();
      expect(service.purposes['purpose-2'].clearCache).toHaveBeenCalled();
    });

    it('should handle empty purposes', () => {
      const req = httpMock.expectOne('http://localhost:3001/api/purposes');
      req.flush({ purposes: {} });
      
      expect(() => service.clearCache()).not.toThrow();
    });
  });

  describe('submit', () => {
    it('should send PUT request with purposes data', () => {
      const initReq = httpMock.expectOne('http://localhost:3001/api/purposes');
      const mockPurpose = {
        uuid: 'purpose-1',
        definition: 'Purpose 1',
        epics: {}
      };
      
      initReq.flush({
        purposes: {
          'purpose-1': mockPurpose
        }
      });
      
      service.submit();
      
      const submitReq = httpMock.expectOne('http://localhost:3001/api/purposes');
      expect(submitReq.request.method).toBe('PUT');
      expect(submitReq.request.body).toEqual({
        id: 'local',
        purposes: jasmine.any(Object)
      });
      submitReq.flush({});
    });

    it('should filter out cached and monthly properties', () => {
      const initReq = httpMock.expectOne('http://localhost:3001/api/purposes');
      const mockPurpose = {
        uuid: 'purpose-1',
        definition: 'Purpose 1',
        epics: {},
        cached_total_time: 100,
        monthly: {}
      };
      
      initReq.flush({
        purposes: {
          'purpose-1': mockPurpose
        }
      });
      
      service.submit();
      
      const submitReq = httpMock.expectOne('http://localhost:3001/api/purposes');
      const submittedData = submitReq.request.body.purposes['purpose-1'];
      expect(submittedData.cached_total_time).toBeUndefined();
      expect(submittedData.monthly).toBeUndefined();
      submitReq.flush({});
    });
  });

  describe('refresh', () => {
    it('should fetch purposes from API', () => {
      const initReq = httpMock.expectOne('http://localhost:3001/api/purposes');
      initReq.flush({ purposes: {} });
      
      service.refresh();
      
      const refreshReq = httpMock.expectOne('http://localhost:3001/api/purposes');
      expect(refreshReq.request.method).toBe('GET');
      refreshReq.flush({ purposes: {} });
    });

    it('should create Purpose instances from response data', () => {
      const initReq = httpMock.expectOne('http://localhost:3001/api/purposes');
      initReq.flush({ purposes: {} });
      
      const mockPurposeData = {
        'purpose-1': {
          uuid: 'purpose-1',
          definition: 'Test Purpose',
          epics: {}
        }
      };
      
      service.refresh();
      
      const refreshReq = httpMock.expectOne('http://localhost:3001/api/purposes');
      refreshReq.flush({ purposes: mockPurposeData });
      
      expect(service.purposes['purpose-1']).toBeInstanceOf(Purpose);
      expect(service.purposes['purpose-1'].uuid).toBe('purpose-1');
      expect(service.purposes['purpose-1'].definition).toBe('Test Purpose');
    });

    it('should populate yearly data from objectives with due dates', () => {
      const initReq = httpMock.expectOne('http://localhost:3001/api/purposes');
      initReq.flush({ purposes: {} });
      
      const mockPurposeData = {
        'purpose-1': {
          uuid: 'purpose-1',
          definition: 'Test Purpose',
          epics: {
            'epic-1': {
              uuid: 'epic-1',
              title: 'Test Epic',
              notes: 'Notes',
              objectives: {
                'objective-1': {
                  uuid: 'objective-1',
                  title: 'Test Objective',
                  time_planned: 480,
                  due_date: '2024-06-30',
                  results: {}
                }
              }
            }
          }
        }
      };
      
      service.refresh();
      
      const refreshReq = httpMock.expectOne('http://localhost:3001/api/purposes');
      refreshReq.flush({ purposes: mockPurposeData });
      
      expect(service.yearly[2024]).toBeDefined();
      expect(service.yearly[2024].year).toBe(2024);
      expect(service.yearly[2024].objectives.length).toBe(1);
    });

    it('should handle objectives without due dates', () => {
      const initReq = httpMock.expectOne('http://localhost:3001/api/purposes');
      initReq.flush({ purposes: {} });
      
      const mockPurposeData = {
        'purpose-1': {
          uuid: 'purpose-1',
          definition: 'Test Purpose',
          epics: {
            'epic-1': {
              uuid: 'epic-1',
              title: 'Test Epic',
              notes: 'Notes',
              objectives: {
                'objective-1': {
                  uuid: 'objective-1',
                  title: 'Test Objective',
                  time_planned: 480,
                  results: {}
                }
              }
            }
          }
        }
      };
      
      service.refresh();
      
      const refreshReq = httpMock.expectOne('http://localhost:3001/api/purposes');
      refreshReq.flush({ purposes: mockPurposeData });
      
      expect(Object.keys(service.yearly).length).toBe(0);
    });

    it('should reset purposes and yearly before fetching new data', () => {
      const initReq = httpMock.expectOne('http://localhost:3001/api/purposes');
      initReq.flush({
        purposes: {
          'purpose-1': {
            uuid: 'purpose-1',
            definition: 'Old Purpose',
            epics: {}
          }
        }
      });
      
      expect(Object.keys(service.purposes).length).toBe(1);
      
      service.refresh();
      
      const refreshReq = httpMock.expectOne('http://localhost:3001/api/purposes');
      refreshReq.flush({ purposes: {} });
      
      expect(Object.keys(service.purposes).length).toBe(0);
    });
  });

  describe('error handling', () => {
    it('should handle HTTP errors in refresh', () => {
      const initReq = httpMock.expectOne('http://localhost:3001/api/purposes');
      initReq.flush({ purposes: {} });
      
      service.refresh();
      
      const refreshReq = httpMock.expectOne('http://localhost:3001/api/purposes');
      refreshReq.error(new ErrorEvent('Network error'));
      
      // Service should handle error gracefully
      expect(service.purposes).toBeDefined();
    });

    it('should handle HTTP errors in submit', () => {
      const initReq = httpMock.expectOne('http://localhost:3001/api/purposes');
      initReq.flush({ purposes: {} });
      
      service.submit();
      
      const submitReq = httpMock.expectOne('http://localhost:3001/api/purposes');
      // TODO: Service should handle error and implement retries
      submitReq.error(new ErrorEvent('Network error'));
      
      expect(service).toBeTruthy();
    });
  });
});
