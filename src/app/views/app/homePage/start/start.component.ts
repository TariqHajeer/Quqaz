import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html'
})
export class StartComponent implements OnInit {

  constructor(private authenticationService: AuthService) { }

  ngOnInit() {
   // this.authenticationService.startTokenTimer()
  }
 
 
}
