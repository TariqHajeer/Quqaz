export class User {
      id:any 
      name:string 
      department
      userName :string
      canWorkAsAgent :boolean = true
      phones:string[]
      employeeType:string = this.canWorkAsAgent==true?"مندوب":"عميل"
}
