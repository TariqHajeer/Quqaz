import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { ChartComponent } from '@syncfusion/ej2-angular-charts';
import { Internationalization, DateFormatOptions } from '@syncfusion/ej2-base';
import { ChangeEventArgs as NumericChange } from '@syncfusion/ej2-inputs';
import { NumericTextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { IScrollEventArgs, ILoadedEventArgs } from '@syncfusion/ej2-charts';
import { ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DateFiter, Paging } from 'src/app/Models/paging';
import { Order } from 'src/app/Models/order/order.model';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
@Component({
    selector: 'app-profits-of-orders',
    templateUrl: './profits-of-orders.component.html',
    styleUrls: ['./profits-of-orders.component.scss']
})
export class ProfitsOfOrdersComponent implements OnInit {

    //#region  range chart
    //#region  range date
    public month: number = new Date().getMonth();
    public fullYear: number = new Date().getFullYear();
    public start: Date = new Date(this.fullYear, this.month - 1, 7);
    public end: Date = new Date(this.fullYear, this.month, 25);
    public startAndEnd = [this.start, this.end]
    //#endregion

    public intl: Internationalization = new Internationalization();
    @ViewChild('point')
    private pointslength: NumericTextBoxComponent;
    public value: number = 1000;
    public step: number = 100;
    public enabled: boolean = false;
    public format: string = 'n';
    public dropValue: string = 'Range';
    public minValue: Date = new Date();
    public maxValue: Date = new Date(2020, 4, 8);
    public dateValue: Date = new Date();
    public dropDownData: Object = [
        { value: 'Range' },
        { value: 'Points Length' }

    ];
    public fields: Object = { text: 'value', value: 'value' };
    public data: Object[] = this.GetNumericData(new Date(2020, 1, 1));
    @ViewChild('chart')
    public chart: ChartComponent;
    // Initializing Primary X Axis
    public primaryXAxis: Object = {
        title: 'اليوم',
        valueType: 'DateTime',
        edgeLabelPlacement: 'Shift',
        skeleton: 'yMMM',
        skeletonType: 'Date',
        scrollbarSettings: {
            range: {
                minimum: this.startAndEnd[0],
                maximum: this.startAndEnd[1]
            },
            enable: true,
            pointsLength: 1000
        }
    };
    public height: string = '450';
    public width: string = '100%';
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'الأرباح',
        labelFormat: '{value}$'
    };
    public tooltip: Object = {
        enable: true, shared: true,
        header: "<b>${point.x}</b>", format: "Server load : <b>${point.y}</b>"
    };
    public legend: Object = {
        visible: false
    };
    public title: string = 'أرباح الطلبيات';
    public animation: Object = { enable: false };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    changeData() {
        this.chart.series[0].dataSource = this.GetNumericData(new Date(this.minValue));
        this.chart.dataBind();
    }

    public scrollEnd(args: IScrollEventArgs): void {
        this.chart.series[0].dataSource = this.GetNumericData(new Date(args.currentRange.maximum));
        this.chart.dataBind();
    };
    public GetNumericData(date: Date): { x: Date, y: number }[] {
        var series1 = [];
        var value = 30;
        for (var i = 0; i <= 60; i++) {
            if (Math.random() > .5) {
                value += (Math.random() * 10 - 5);
            }
            else {
                value -= (Math.random() * 10 - 5);
            }
            if (value < 0) {
                value = this.getRandomInt(20, 40);
            }
            date = new Date(date.setMinutes(date.getMinutes() + 1));
            var point = { x: date, y: Math.round(value) };
            series1.push(point);
        }
        return series1;
    }
    public getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //#endregion

    constructor(private orderservice: OrderService,
        private router: Router,) { }
    displayedColumns: string[];
    dataSource
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @Input() totalCount: number;
    pageEvent: PageEvent;
    paging: Paging
    filtering: DateFiter
    orders: Order[] = []
    noDataFound: boolean = false
    totalEarinig
    ngOnInit(): void {
        this.paging = new Paging
        this.filtering = new DateFiter
        this.get()
        // this.allfiltering()

    }
    get() {
        this.dataSource = new MatTableDataSource(this.orders);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.displayedColumns = ['code', 'cost', 'oldCost', 'deliveryCost', 'deliveryCostClient'];
    }
    switchPage(event: PageEvent) {

        this.paging.allItemsLength = event.length
        this.paging.RowCount = event.pageSize
        this.paging.Page = event.pageIndex + 1
        this.allfiltering()
    }
    showcount=false
    allfiltering() {
        this.orderservice.GetEarning(this.paging, this.filtering).subscribe(res => {
            if (res.data && res.data.orders.length == 0)
                this.noDataFound = true
            else this.noDataFound = false
            this.dataSource = new MatTableDataSource(res.data.orders)
            this.totalCount = res.total
            if (res.data.totalEarinig) {
                this.totalEarinig = res.data.totalEarinig
                this.showcount = true
            }else
            this.showcount=false
            console.log(res)
        })
    }
    changeRange() {
        // this.primaryXAxis = {
        //     title: 'اليوم',
        //     valueType: 'DateTime',
        //     edgeLabelPlacement: 'Shift',
        //     skeleton: 'yMMM',
        //     skeletonType: 'Date',
        //     scrollbarSettings: {
        //         range: {
        //             minimum: this.filtering.FromDate,
        //             maximum: this.filtering.ToDate
        //         },
        //         enable: true,
        //         pointsLength: 1000
        //     }
        // };
        if (this.filtering.FromDate != undefined || this.filtering.FromDate != null)
            this.filtering.FromDate = formatDate(this.filtering.FromDate, 'yyyy-MM-dd', 'en-US');
        if (this.filtering.ToDate != undefined || this.filtering.ToDate != null)
            this.filtering.ToDate = formatDate(this.filtering.ToDate, 'yyyy-MM-dd', 'en-US');

        this.allfiltering()
    }
}
