import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchDetailsService {
  currentBranch = new BehaviorSubject<any>(null);
  constructor() { }
  setBranch(venue: any) {
    this.currentBranch.next(venue);
  }
  getBranch(): Observable<any> {
    return this.currentBranch.asObservable();
  }
}
