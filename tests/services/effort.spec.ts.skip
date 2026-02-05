import Effort from '../../src/services/effort';

describe('Effort', () => {
  describe('constructor', () => {
    it('should create an instance with valid date', () => {
      const data = {
        date: '2024-01-15',
        time: '10:00',
        comment: 'Test effort',
        modifier: '5',
        time_spent: '120',
        money_spent: '100',
        thought_spent: '50',
        thew_spent: '30'
      };
      const parent = { id: 'parent-1' };
      const effort = new Effort(data, parent);
      
      expect(effort).toBeTruthy();
      expect(effort.date).toEqual(new Date('2024-01-15'));
      expect(effort.time).toBe('10:00');
      expect(effort.comment).toBe('Test effort');
      expect(effort.modifier).toBe(5);
      expect(effort.time_spent).toBe(120);
      expect(effort.money_spent).toBe(100);
      expect(effort.thought_spent).toBe(50);
      expect(effort.thew_spent).toBe(30);
      expect(effort.cached_parent).toBe(parent);
    });

    it('should throw error when date is invalid', () => {
      const data = {
        date: 'invalid-date',
        time: '10:00',
        comment: 'Test effort'
      };
      expect(() => new Effort(data, null)).toThrowError('Invalid Date');
    });

    it('should handle missing optional numeric fields with defaults', () => {
      const data = {
        date: '2024-01-15',
        time: '10:00',
        comment: 'Test effort'
      };
      const effort = new Effort(data, null);
      
      expect(effort.modifier).toBe(0);
      expect(effort.time_spent).toBe(0);
      expect(effort.money_spent).toBe(0);
      expect(effort.thought_spent).toBe(0);
      expect(effort.thew_spent).toBe(0);
    });

    it('should parse string numbers correctly', () => {
      const data = {
        date: '2024-01-15',
        time: '10:00',
        comment: 'Test',
        modifier: '10.5',
        time_spent: '60',
        money_spent: '200',
        thought_spent: '75',
        thew_spent: '45'
      };
      const effort = new Effort(data, null);
      
      expect(effort.modifier).toBe(10.5);
      expect(effort.time_spent).toBe(60);
      expect(effort.money_spent).toBe(200);
      expect(effort.thought_spent).toBe(75);
      expect(effort.thew_spent).toBe(45);
    });

    it('should create without parent', () => {
      const data = {
        date: '2024-01-15',
        time: '10:00',
        comment: 'Test'
      };
      const effort = new Effort(data, null);
      
      expect(effort.cached_parent).toBeNull();
    });
  });

  describe('parent getter', () => {
    it('should return the cached parent', () => {
      const parent = { id: 'parent-1', name: 'Test Parent' };
      const data = {
        date: '2024-01-15',
        time: '10:00',
        comment: 'Test'
      };
      const effort = new Effort(data, parent);
      
      expect(effort.parent).toBe(parent);
      expect(effort.parent.id).toBe('parent-1');
    });

    it('should return null when no parent provided', () => {
      const data = {
        date: '2024-01-15',
        time: '10:00',
        comment: 'Test'
      };
      const effort = new Effort(data, null);
      
      expect(effort.parent).toBeNull();
    });
  });

  describe('date handling', () => {
    it('should accept various valid date formats', () => {
      const formats = [
        '2024-01-15',
        '2024-01-15T10:00:00Z',
        '2024-01-15T10:00:00.000Z'
      ];
      
      formats.forEach(dateStr => {
        const data = { date: dateStr, time: '10:00', comment: 'Test' };
        const effort = new Effort(data, null);
        expect(effort.date).toBeInstanceOf(Date);
        expect(effort.date.toString()).not.toBe('Invalid Date');
      });
    });
  });
});
