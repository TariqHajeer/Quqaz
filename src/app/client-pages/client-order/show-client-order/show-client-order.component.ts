import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { COrderService } from 'src/app/client-pages/service/c-order.service';
import { Paging } from 'src/app/Models/paging';
import { CFilter } from 'src/app/client-pages/model/cfilter.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CsettingService } from 'src/app/client-pages/service/csetting.service';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';
import { City } from 'src/app/Models/Cities/city.Model';
import { Region } from 'src/app/Models/Regions/region.model';
import { User } from 'src/app/Models/user/user.model';

@Component({
  selector: 'app-show-client-order',
  templateUrl: './show-client-order.component.html',
  styleUrls: ['./show-client-order.component.scss']
})
export class ShowClientOrderComponent implements OnInit {

  constructor(private router: Router, private orderservic: COrderService,
  private settingservice:CsettingService) { }
  paging: Paging
  filtering:CFilter
  dataSource
  displayedColumns: string[];
  noDataFound: boolean = false
  orderPlace: NameAndIdDto[] = []
  MoenyPlaced: NameAndIdDto[] = []
  cities: City[] = []
  Region: Region[] = []
  Agents: User[] = []
  cityapi = "Country"
  regionapi = "Region"
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() totalCount: number;

  ngOnInit(): void {
    this.filtering=new CFilter
    this.paging=new Paging
    this.displayedColumns = ['code', 'deliveryCost', 'cost', 'oldCost', 'recipientName',
    'recipientPhones', 'client', 'clientPrintNumber', 'country'
    , 'region', 'agent', 'agentPrintNumber', 'monePlaced', 'orderplaced', 'address'
    , 'createdBy', 'date', 'diliveryDate', 'note', 'completelyReturn', 'Edit', 'Delete'];
    this.GetMoenyPlaced()
    this.GetorderPlace()
    this.GetRegion()
    this.Getcities()
    this.allFilter()
    
  }
  addorder() {
    this.router.navigate(['/clienthome/orders/addorder'])
  }
  allFilter() {
    this.orderservic.get(this.paging,this.filtering).subscribe(res => {
      console.log(res)
      if (res.data.length == 0)
        this.noDataFound = true
      else this.noDataFound = false
      res.data.forEach(element => {
        if (element.orderStateId == 2) {
          element.monePlaced.name = "لديك مبلغ مع العميل"
          element.orderplaced.name = "لديك مبلغ مع العميل"
        }
        else if (element.orderStateId == 3) {
        //element.monePlaced = this.MoenyPlaced.find(m => m.id == 4)
        //  element.orderplaced = this.orderPlace.find(o => o.id == 4)
        }
      });
      this.dataSource = new MatTableDataSource(res.data)
      this.totalCount = res.total
    })
  }
  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length
    this.paging.RowCount = event.pageSize
    this.paging.Page = event.pageIndex + 1
    this.allFilter();
  }
  GetorderPlace() {
    this.settingservice.orderPlace().subscribe(res => {
      this.orderPlace = res
    })
  }
  GetMoenyPlaced() {
    this.settingservice.MoenyPlaced().subscribe(res => {
      this.MoenyPlaced = res
    })
  }
  Getcities() {
    this.settingservice.GetCountries().subscribe(res => {
      this.cities = res
    })
  }

  GetRegion() {
    this.settingservice.GetRegions().subscribe(res => {
      this.Region = res
    })
  }
}
