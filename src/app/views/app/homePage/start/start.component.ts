import { Component, OnInit   } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { StatisticsService } from 'src/app/services/statistics.service';
import { MainStatics } from 'src/app/Models/main-statics.model';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html'
})
export class StartComponent implements OnInit {

  constructor(private authenticationService: AuthService,
   private StatisticsService:StatisticsService) { 
  
  }

  MainStatics:MainStatics=new MainStatics()
  ngOnInit() {
   // this.authenticationService.startTokenTimer()
  this.GetMainStatics()
  }
 
 GetMainStatics(){
   this.StatisticsService.MainStatics().subscribe(res=>{
     this.MainStatics=res as MainStatics
   })
 }
}
