import { Component, OnInit   } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html'
})
export class StartComponent implements OnInit {

  constructor(private authenticationService: AuthService,
   private StatisticsService:StatisticsService) { 
  
  }


  ngOnInit() {
   // this.authenticationService.startTokenTimer()
  this.GetMainStatics()
  }
 
 GetMainStatics(){
   this.StatisticsService.MainStatics().subscribe(res=>{
     console.log(res)
   })
 }
}
