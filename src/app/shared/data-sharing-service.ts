import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private sharedArray: any[] = [];

  setSearchResults(data: any[]): void {
    this.sharedArray = data;
  }

  getSearchResults(): any[] {
    return this.sharedArray;
  }
}
