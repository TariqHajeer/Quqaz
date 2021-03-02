import { Component, OnInit,ViewChild   } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { ChartComponent } from '@syncfusion/ej2-angular-charts';
import { Internationalization, DateFormatOptions } from '@syncfusion/ej2-base';
import { ChangeEventArgs as NumericChange } from '@syncfusion/ej2-inputs';
import { NumericTextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { IScrollEventArgs, ILoadedEventArgs } from '@syncfusion/ej2-charts';
import { ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
@Component({
  selector: 'app-profits-of-orders',
  templateUrl: './profits-of-orders.component.html',
  styleUrls: ['./profits-of-orders.component.scss']
})
export class ProfitsOfOrdersComponent implements OnInit {

  constructor() { }
//#region  range date
public month: number = new Date().getMonth();
public fullYear: number = new Date().getFullYear();
public start: Date = new Date(this.fullYear, this.month - 1 , 7);
public end: Date = new Date(this.fullYear, this.month, 25);
public startAndEnd=[this.start,this.end]
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
public maxValue: Date = new Date(2020,4,8);
public dateValue: Date = new Date();
public dropDownData: Object = [
    { value: 'Range' },
    { value: 'Points Length' }

];
public fields: Object = { text: 'value', value: 'value' };
public data: Object[] = this.GetNumericData( new Date(2020,1,1));
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
            minimum:new Date(2020,1,1),
            maximum:new Date(2025,1,1)
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
    header : "<b>${point.x}</b>", format : "Server load : <b>${point.y}</b>"
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
changeData(){
  this.chart.series[0].dataSource = this.GetNumericData(new Date(this.minValue));
  this.chart.dataBind();
}
changeRange(){
 this. primaryXAxis = {
      title: 'اليوم',
      valueType: 'DateTime',
      edgeLabelPlacement: 'Shift',
      skeleton: 'yMMM',
      skeletonType: 'Date',
      scrollbarSettings: {
          range: {
              minimum:this.startAndEnd[0],
              maximum:this.startAndEnd[1]
          },
          enable: true,
          pointsLength: 1000
      }
  }; 
}
public scrollEnd(args: IScrollEventArgs): void {
    this.chart.series[0].dataSource = this.GetNumericData(new Date(args.currentRange.maximum));
    this.chart.dataBind();
};
public GetNumericData(date: Date): {x: Date, y: number}[] {
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
  ngOnInit(): void {
  }

}
