import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from '../../src/app/app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('component creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should be defined', () => {
      expect(component).toBeDefined();
    });
  });

  describe('title property', () => {
    it('should have title set to "app"', () => {
      expect(component.title).toBe('app');
    });

    it('should have title as a string', () => {
      expect(typeof component.title).toBe('string');
    });

    it('should maintain title value', () => {
      const initialTitle = component.title;
      expect(component.title).toBe(initialTitle);
    });
  });

  describe('template rendering', () => {
    it('should compile successfully', () => {
      expect(fixture.nativeElement).toBeTruthy();
    });

    it('should have a root element', () => {
      const compiled = fixture.nativeElement;
      expect(compiled).toBeDefined();
    });
  });

  describe('component instance', () => {
    it('should be an instance of AppComponent', () => {
      expect(component instanceof AppComponent).toBe(true);
    });

    it('should have all required properties', () => {
      expect(component.title).toBeDefined();
    });
  });
});
