import { Component, OnInit } from '@angular/core';
import{EditRequestService}from 'src/app/services/edit-request.service'
@Component({
  selector: 'app-edit-client-orders',
  templateUrl: './edit-client-orders.component.html',
  styleUrls: ['./edit-client-orders.component.scss']
})
export class EditClientOrdersComponent implements OnInit {

  constructor(private editrequestService:EditRequestService) { }

  ngOnInit(): void {
    this.Get()
  }
Get(){
  this.editrequestService.NewEditReuqet().subscribe(res=>{
    console.log(res)
  })
}
}
