import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public setItem(itemKey: string, item: any): void {
    window.localStorage.setItem(itemKey, JSON.stringify(item));
  }
  public removeItem(itemKey){
    localStorage.removeItem(itemKey);
  }

  private isItemExist(itemKey: string) {
    return window.localStorage.getItem(itemKey) != null;
  }

  public getItem(itemKey: string) {
    if (this.isItemExist(itemKey))
      return window.localStorage.getItem(itemKey);
    return {};
  }
}