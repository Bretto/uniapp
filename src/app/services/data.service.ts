import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private contacts: any;//Contact[];

  private lastId: number = 20;

  constructor(private http: HttpClient) {}

  getContacts(): Observable<any[]> {
    if (this.contacts) {
      return of(this.contacts);
    } else {
      // fetch contacts
      return this.http.get<any[]>('./assets/contacts.json')
      .pipe(tap(contacts => {
        this.contacts = contacts;
      }));
    }
  }

  getContactsByCategory(category: string): Observable<any[]> {
    return this.getContacts().pipe(map(contacts => contacts.filter(contact => contact.category == category)));
  }

  getContactById(id: number): Observable< any> {
    return this.getContacts().pipe(map(contacts => contacts.find(contact => contact.id == id)));
  }

  createContact(contact: any) {
    contact.id = this.lastId + 1;
    // increment lastId value
    this.lastId = this.lastId + 1;
    this.contacts.push(contact);
  }

  updateContact(contact: any): any {
    let itemIndex = this.contacts.findIndex((item:any) => item.id == contact.id);
    this.contacts[itemIndex] = contact;
    return contact;
  }

  deleteContact(id: number): any {
    let itemIndex = this.contacts.findIndex((item: any) => item.id == id);
    return this.contacts.splice(itemIndex, 1)[0];
  }
}
