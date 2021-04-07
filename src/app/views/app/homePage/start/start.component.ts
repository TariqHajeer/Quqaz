import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { StatisticsService } from 'src/app/services/statistics.service';
import { MainStatics } from 'src/app/Models/main-statics.model';
import { ChartTheme, ILoadedEventArgs } from '@syncfusion/ej2-angular-charts';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  constructor(private authenticationService: AuthService,
    private StatisticsService: StatisticsService,
    private spinner: NgxSpinnerService,
    private router: Router) {

  }
  public data: Object[] = []
  //Initializing Primary X Axis
  public primaryXAxis: Object = {
    majorGridLines: { width: 0 },
    minorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    interval: 1,
    lineStyle: { width: 0 },
    labelIntersectAction: 'Rotate45',
    valueType: 'Category'
  };
  //Initializing Primary Y Axis
  public primaryYAxis: Object = {
    title: 'العدد',
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
    majorGridLines: { width: 1 },
    minorGridLines: { width: 1 },
    minorTickLines: { width: 0 },
    labelFormat: '{value}',
  };
  public tooltip: Object = {
    enable: false
  };
  // custom code start
  public load(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    this.GetMainStatics()
  };
  // custom code end
  public title: string = 'الإحصائيات';
  public chartArea: Object = {
    border: {
      width: 0
    }
  };
  public width: string = '100%';


  public MainStatics: MainStatics
  ngOnInit() {
    this.MainStatics = new MainStatics()
    this.GetMainStatics()


    // this.datalabel = { visible: true };
    // this.piedata = [
    //             { 'x': 'Chrome', y: 37 }, { 'x': 'UC Browser', y: 17 },
    //             { 'x': 'iPhone', y: 19 }, { 'x': 'Others', y: 4 }, { 'x': 'Opera', y: 11 }
    //         ];
    // this.authenticationService.startTokenTimer()
  }

  GetMainStatics() {
    this.spinner.show()
    this.StatisticsService.MainStatics().subscribe((res) => {
      this.spinner.hide()
      this.MainStatics = res
      this.data = [
        { x: ' المندوبين', y: this.MainStatics.totalAgent },
        { x: ' العملاء', y1: this.MainStatics.totalClient },
        { x: 'شحنات تم توصيلها', y2: this.MainStatics.totalOrderDiliverd },
        { x: 'شحنات في المخزن', y3: this.MainStatics.totalOrderInSotre },
        { x: 'شحنات خارج المخزن', y4: this.MainStatics.totalOrderOutStore },
        { x: 'الشحنات', y5: this.MainStatics.totlaOrder },
      ];
    }, err => {
      this.spinner.hide()
    })
  }
  //reports
  ShipmentInStock() {
    this.router.navigate(['/app/reports/ShipmentInStock'])
  }
  Shipmentonway() {
    this.router.navigate(['/app/reports/Shipmentonway'])
  }
  printsetprintnumberagentpreview() {
    this.router.navigate(['/app/reports/printsetprintnumberagentpreview'])
  }
  Shipmentsnotbeendelivered() {
    this.router.navigate(['/app/reports/Shipmentsnotbeendelivered'])
  }
  printsetprintnumberclientpreview() {
    this.router.navigate(['/app/reports/printsetprintnumberclientpreview'])
  }
  ProfitsOfOrders() {
    this.router.navigate(['/app/reports/ProfitsOfOrders'])
  }
  Statistics() {
    this.router.navigate(['/app/reports/Statistics'])
  }
  StatisticsForAgent() {
    this.router.navigate(['/app/reports/AgentStatistics'])
  }

  //order
  neworders() {
    this.router.navigate(['/app/order/neworders'])
  }
  order() {
    this.router.navigate(['/app/order/'])
  }
  ReceiptShipmentAgentComponent() {
    this.router.navigate(['/app/reports/ReceiptShipmentAgentComponent'])
  }
  addorder() {
    this.router.navigate(['/app/order/addorder'])
  }
  addMulitpleOrders() {
    this.router.navigate(['/app/order/addMulitpleOrders'])
  }
  addMulitpleOrdersfromClient() {
    this.router.navigate(['/app/order/addMulitpleOrdersfromClient'])
  }
  //client
  client() {
    this.router.navigate(['/app/client'])
  }
  //income
  income() {
    this.router.navigate(['/app/income'])
  }
  //outcome
  outcome() {
    this.router.navigate(['/app/outcome'])
  }
   //user
   user() {
    this.router.navigate(['/app/user'])
  }
  //دائرة
  // public piedata: Object[];
  // public datalabel: Object;
  //progres par mat
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
}
