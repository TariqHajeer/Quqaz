import { Component, OnInit } from '@angular/core';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { AuthService } from 'src/app/shared/auth.service';
interface ListMenu {
  id: number;
  lable: string;
  visibl: boolean;
}
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userlogin: UserLogin = this.authService.getUser();
  constructor(private authService:AuthService) {}
  ngOnInit(): void {}
  listMenu: ListMenu[] = [{ id: 1, lable: 'حركات الصندوق', visibl: false }];
  visiblListMenu(id) {
    this.listMenu.forEach((list) => {
      if (list.id != id) list.visibl = false;
      else list.visibl = true;
    });
  }
}
