import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private _studentId;
  constructor() { }

  set studentId(id){
    this._studentId=id;
    localStorage.setItem('studentId',this._studentId);
  }
  get studentId()
  {
    this._studentId=localStorage.getItem('studentId');
    return this._studentId;
  }
}
