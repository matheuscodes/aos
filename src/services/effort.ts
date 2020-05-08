export default class Effort {
  date: Date;
  time: string;
  comment: string;
  modifier: number;
  time_spent: number; //minutes
  money_spent: number;
  thought_spent: number;
  thew_spent: number;

  cached_parent: any;

  constructor(data: any, parent: any) {
    this.date = new Date(data.date);
    if(this.date.toString() == "Invalid Date") throw new Error('Invalid Date');
    this.time = data.time;
    this.comment = data.comment;
    this.modifier = parseFloat(data.modifier) || 0;
    this.time_spent = parseInt(data.time_spent) || 0;
    this.money_spent = parseInt(data.money_spent) || 0;
    this.thought_spent = parseInt(data.thought_spent) || 0;
    this.thew_spent = parseInt(data.thew_spent) || 0;

    if(parent) {
      this.cached_parent = parent;
    }
  }

  get parent() {
    return this.cached_parent;
  }
}
