export default class Effort {
  date: Date;
  time: string;
  comment: string;
  modifier: number;
  time_spent: number; //minutes
  money_spent: number;
  thought_spent: number;
  thew_spent: number;

  constructor(data: any) {
    this.date = new Date(data.date);
    this.time = data.time;
    this.comment = data.comment;
    this.modifier = data.modifier || 0;
    this.time_spent = data.time_spent || 0;
    this.money_spent = data.money_spent || 0;
    this.thought_spent = data.thought_spent || 0;
    this.thew_spent = data.thew_spent || 0;
  }
}
