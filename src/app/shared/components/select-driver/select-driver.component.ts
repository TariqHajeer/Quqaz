import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Driver from 'src/app/Models/common/Driver';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-select-driver',
  templateUrl: './select-driver.component.html',
  styleUrls: ['./select-driver.component.scss']
})
export class SelectDriverComponent implements OnInit {
  
  constructor(private userService: UserService) { }
  drivers: NameAndIdDto[] = [];
  ngOnInit(): void {
    this.getDrivers();
  }
  @Input() driver?: Driver;
  @Output() driverChange?= new EventEmitter<Driver>();
  changeValue(event) { 
    this.driver.driverId = event.id;
    this.driver.driverName = event.name;
    this.driverChange.emit(this.driver);
  }
  getDrivers() {
    this.userService.Driver().subscribe(res => {
      this.drivers = res;
    })
  }
  addDriver = (term: string) => {
    if (term.length <= 50)
      return { id: null, name: term };
    return null;
  };
}
