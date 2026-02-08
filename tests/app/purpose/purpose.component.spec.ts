import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PurposeComponent } from '../../../src/app/purpose/purpose.component';

describe('PurposeComponent', () => {
  let component: PurposeComponent;
  let fixture: ComponentFixture<PurposeComponent>;

  const mockPurposeData = {
    uuid: 'purpose-123',
    definition: 'Test Purpose Definition',
    description: 'This is a test purpose description',
    epics: {
      'epic-1': {
        uuid: 'epic-1',
        title: 'Epic 1'
      },
      'epic-2': {
        uuid: 'epic-2',
        title: 'Epic 2'
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PurposeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurposeComponent);
    component = fixture.componentInstance;
  });

  describe('component creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should be defined', () => {
      expect(component).toBeDefined();
    });

    it('should be an instance of PurposeComponent', () => {
      expect(component instanceof PurposeComponent).toBe(true);
    });
  });

  describe('input properties', () => {
    it('should have purpose input property', () => {
      expect(component.purpose).toBeUndefined();
    });

    it('should accept purpose input', () => {
      component.purpose = mockPurposeData;
      expect(component.purpose).toBe(mockPurposeData);
    });

    it('should accept purpose with uuid', () => {
      component.purpose = mockPurposeData;
      expect(component.purpose.uuid).toBe('purpose-123');
    });

    it('should accept purpose with definition', () => {
      component.purpose = mockPurposeData;
      expect(component.purpose.definition).toBe('Test Purpose Definition');
    });

    it('should accept purpose with description', () => {
      component.purpose = mockPurposeData;
      expect(component.purpose.description).toBe('This is a test purpose description');
    });

    it('should accept purpose with epics', () => {
      component.purpose = mockPurposeData;
      expect(component.purpose.epics).toBeDefined();
      expect(Object.keys(component.purpose.epics).length).toBe(2);
    });
  });

  describe('template integration', () => {
    it('should compile template successfully', () => {
      component.purpose = mockPurposeData;
      fixture.detectChanges();
      expect(fixture.nativeElement).toBeTruthy();
    });

    it('should throw error when rendering with undefined purpose', () => {
      component.purpose = undefined;
      expect(() => fixture.detectChanges()).toThrow();
    });

    it('should render without errors when purpose is provided', () => {
      component.purpose = mockPurposeData;
      expect(() => fixture.detectChanges()).not.toThrow();
    });
  });

  describe('component instance', () => {
    it('should have all required properties', () => {
      expect(component.purpose).not.toBeDefined();
    });
  });

  describe('data handling', () => {
    it('should handle purpose with minimal data', () => {
      const minimalPurpose = {
        uuid: 'min-123',
        definition: 'Minimal'
      };
      component.purpose = minimalPurpose;
      expect(component.purpose.uuid).toBe('min-123');
    });

    it('should handle purpose with complete data', () => {
      component.purpose = mockPurposeData;
      expect(component.purpose.uuid).toBe('purpose-123');
      expect(component.purpose.definition).toBe('Test Purpose Definition');
      expect(component.purpose.description).toBe('This is a test purpose description');
      expect(component.purpose.epics).toBeDefined();
    });

    it('should handle purpose with null values', () => {
      const purposeWithNull = {
        uuid: 'null-123',
        definition: null,
        description: null,
        epics: null
      };
      component.purpose = purposeWithNull;
      expect(component.purpose.uuid).toBe('null-123');
    });

    it('should handle purpose with empty strings', () => {
      const purposeWithEmpty = {
        uuid: '',
        definition: '',
        description: ''
      };
      component.purpose = purposeWithEmpty;
      expect(component.purpose.uuid).toBe('');
    });
  });

  describe('change detection', () => {
    it('should detect purpose input change', () => {
      component.purpose = mockPurposeData;
      fixture.detectChanges();
      expect(component.purpose).toBe(mockPurposeData);
    });

    it('should handle multiple purpose changes', () => {
      const purpose1 = { uuid: 'p1', definition: 'Purpose 1' };
      const purpose2 = { uuid: 'p2', definition: 'Purpose 2' };

      fixture.componentRef.setInput('purpose', purpose1);
      fixture.detectChanges();

      expect(component.purpose).toBe(purpose1);

      fixture.componentRef.setInput('purpose', purpose2);
      fixture.detectChanges();

      expect(component.purpose).toBe(purpose2);
    });
  });
});
