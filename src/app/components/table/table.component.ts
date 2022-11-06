import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NotificationsService } from 'angular2-notifications';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() displayedColumns: string[];
  @Input() dataSource;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  noDataFound: boolean = false;

  constructor(
    private notifications: NotificationsService
  ) { }
  selection = new SelectionModel<any>(true, []);
  selectOrders: any[] = [];
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.selectOrders = [];
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => {
        this.selection.select(row);
      });
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    this.checkboxId(row);
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1
      }`;
  }
  checkboxId(row) {
    if (this.selection.isSelected(row))
      if (this.selectOrders.filter((d) => d == row).length > 0) return;
      else {
        this.selectOrders.push(row);
      }
    if (!this.selection.isSelected(row)) {
      this.selectOrders = this.selectOrders.filter((o) => o != row);
    }
  }
  ngOnInit(): void {
  }
}
