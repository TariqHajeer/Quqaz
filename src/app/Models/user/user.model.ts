import { Phone } from '../phone.model'

export class User {
      id:any
      name:string 
      departmentId:number 
      department
      experince:string 
      address:string 
      hireDate:Date 
      note:string 
      canWorkAsAgent:boolean =true
      countryId?:number 
      salary:number 
      userName:string 
      password:any 
      groupsId:number[] 
      phones:Phone[]
      employeeType:string = this.canWorkAsAgent==true?"مندوب":"عميل"
}
