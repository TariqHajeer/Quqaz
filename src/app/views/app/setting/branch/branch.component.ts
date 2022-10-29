import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BranchesService } from '../../../../services/branches.service'

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {

  constructor(private branchesService: BranchesService) { }
  displayedColumns: string[] = ['name'];
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  noDataFound: boolean;
  elementCount: number;
  ngOnInit(): void {
    this.getAll()
  }
  getAll() {
    this.branchesService.Get().subscribe(res => {
      if (res) {
        this.dataSource = new MatTableDataSource(res);
        this.elementCount=res.length;
        this.noDataFound = false
      }
      else
        this.noDataFound = true
    })
  }
}
