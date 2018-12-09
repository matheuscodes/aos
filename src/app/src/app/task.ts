export class Task {

  id: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date;
  resolvedAt: Date;
  title: string;
  description: string;
  priority: string;
  status: string;

  constructor(data) {
    Object.assign(this,data);
  }

  validate() {
    if(!this.title) {
      throw new Error('Missing title');
    }
    if(!this.description) {
      throw new Error('Missing description');
    }
    if(!this.status) {
      throw new Error('Missing status');
    }
    if(!this.priority) {
      throw new Error('Missing priority');
    }
  }
}
