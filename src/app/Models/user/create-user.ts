export class CreateUser {
  Id: number;
  Name: string;
  DepartmentId: number;
  Experince: string;
  Address: string;
  HireDate: Date = new Date();
  Note: string;
  CanWorkAsAgent: boolean;
  CountryId?: number;
  Salary: number;
  UserName: string;
  Password: any;
  GroupsId: number[];
  Phones: string[];
  Countries: number[];
  branchesIds: number[]=[];
}
