import Effort from '../../src/services/effort';

describe('Effort', () => {
  describe('constructor', () => {
    it('should create an effort with valid data', () => {
      const data = {
        date: '2024-01-15',
        time: '10:30',
        comment: 'Test comment',
        modifier: '5.5',
        time_spent: '120',
        money_spent: '100',
        thought_spent: '50',
        thew_spent: '30'
      };
      const effort = new Effort(data, null);
      
      expect(effort).toBeTruthy();
      expect(effort.date).toEqual(new Date('2024-01-15'));
      expect(effort.time).toBe('10:30');
      expect(effort.comment).toBe('Test comment');
      expect(effort.modifier).toBe(5.5);
      expect(effort.time_spent).toBe(120);
      expect(effort.money_spent).toBe(100);
      expect(effort.thought_spent).toBe(50);
      expect(effort.thew_spent).toBe(30);
    });

    it('should throw error for invalid date', () => {
      const data = {
        date: 'invalid-date',
        time: '10:30',
        comment: 'Test',
        modifier: '1',
        time_spent: '60',
        money_spent: '0',
        thought_spent: '0',
        thew_spent: '0'
      };
      
      expect(() => new Effort(data, null)).toThrowError('Invalid Date');
    });

    it('should handle default values for missing numeric fields', () => {
      const data = {
        date: '2024-01-15',
        time: '10:30',
        comment: 'Test'
      };
      const effort = new Effort(data, null);
      
      expect(effort.modifier).toBe(0);
      expect(effort.time_spent).toBe(0);
      expect(effort.money_spent).toBe(0);
      expect(effort.thought_spent).toBe(0);
      expect(effort.thew_spent).toBe(0);
    });

    it('should store parent reference', () => {
      const parent = { uuid: 'parent-id' };
      const data = {
        date: '2024-01-15',
        time: '10:30',
        comment: 'Test',
        modifier: '1'
      };
      const effort = new Effort(data, parent);
      
      expect(effort.parent).toBe(parent);
    });

    it('should handle null parent', () => {
      const data = {
        date: '2024-01-15',
        time: '10:30',
        comment: 'Test',
        modifier: '1'
      };
      const effort = new Effort(data, null);
      
      expect(effort.parent).toBeUndefined();
    });

    it('should parse float modifiers correctly', () => {
      const data = {
        date: '2024-01-15',
        time: '10:30',
        comment: 'Test',
        modifier: '10.75'
      };
      const effort = new Effort(data, null);
      
      expect(effort.modifier).toBe(10.75);
    });

    it('should parse integer time values correctly', () => {
      const data = {
        date: '2024-01-15',
        time: '10:30',
        comment: 'Test',
        time_spent: '150',
        money_spent: '200',
        thought_spent: '75',
        thew_spent: '50'
      };
      const effort = new Effort(data, null);
      
      expect(effort.time_spent).toBe(150);
      expect(effort.money_spent).toBe(200);
      expect(effort.thought_spent).toBe(75);
      expect(effort.thew_spent).toBe(50);
    });
  });

  describe('parent getter', () => {
    it('should return parent when set', () => {
      const parent = { name: 'parent-object' };
      const data = {
        date: '2024-01-15',
        time: '10:30',
        comment: 'Test'
      };
      const effort = new Effort(data, parent);
      
      expect(effort.parent).toBe(parent);
    });
  });
});
