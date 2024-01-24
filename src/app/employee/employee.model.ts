

export interface IEmployee {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthdate: Date;
  basicSalary: number;
  status: number;
  group: string;
  description: string;
}
export class Employee implements IEmployee {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthdate: Date;
  basicSalary: number;
  status: number;
  group: string;
  description: string;

  constructor(obj?: any) {
    this.id = obj.id || null;
    this.username = obj.username || '';
    this.firstName = obj.firstName || '';
    this.lastName = obj.lastName || '';
    this.email = obj.email || '';
    this.birthdate = this.jsonToDate(obj.birthDate) || null;
    this.basicSalary = obj.basicSalary || 0;
    this.status = obj.status || null;
    this.group = obj.group || '';
    this.description = obj.description || '';
  }

  private jsonToDate(date: string): Date {
    const splitDate = date.split('/');
    return new Date([splitDate[2], splitDate[0], splitDate[1]].join('-'));
  }

  getbirthdateString(): string {
    return this.birthdate.toISOString().split('T')[0];
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getRupiahBasicSalary(): string {
    return `Rp ${this.basicSalary.toLocaleString('id-ID')}`;
  }

  isContain(keyword: string): boolean {
    keyword = keyword.toLowerCase();
    return (
      keyword == '' ||
      this.getFullName().toLowerCase().includes(keyword) ||
      this.username.toLowerCase().includes(keyword) ||
      this.group.toLowerCase().includes(keyword)
    );
  }
}
