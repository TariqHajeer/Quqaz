import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from '../../client/client.service';

@Component({
  selector: 'app-receipts-and-exchanges',
  templateUrl: './receipts-and-exchanges.component.html',
  styleUrls: ['./receipts-and-exchanges.component.scss']
})
export class ReceiptsAndExchangesComponent implements OnInit {

  constructor(public clientservice: ClientService) { }
  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = ['Amount','About','createdby','Manager'
,'client','date','Note'];
  noDataFound: boolean = false
  ngOnInit(): void {
    this.Get()
  }
  Get() {
    this.clientservice.GetAccount().subscribe(res=>{
      this.dataSource = new MatTableDataSource(res as [])
    })
  }
}
