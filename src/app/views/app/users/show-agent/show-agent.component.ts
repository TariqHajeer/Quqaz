import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Models/user/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-show-agent',
  templateUrl: './show-agent.component.html',
  styleUrls: ['./show-agent.component.scss']
})
export class ShowAgentComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    public userService:UserService) { }
  id
  userStatics:{
    orderInStore:0
    ,orderInWay:0
  }
  agent:User=new User
  ngOnInit(): void {
    this.route.params.subscribe(par => {
      this.id = par['id'] as string
    });
    this.userService.GetById(this.id).subscribe(res=>{
      console.log(res)
      this.userStatics=res.userStatics
      this.agent=res
    })
  }

}
