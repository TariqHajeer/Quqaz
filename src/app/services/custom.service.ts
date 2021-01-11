import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment.prod'
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { ConditionalExpr } from '@angular/compiler';
import { redirectLoggedInTo } from '@angular/fire/auth-guard';
@Injectable({

  providedIn: 'root'
})
export class CustomService {


  constructor(private http: HttpClient) { }
  baseUrl: string = environment.baseUrl;

  addOrUpdate(apiName, item, status, id?): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });
    if (status == 'add')
      return this.http.post(this.baseUrl + 'api/' + apiName, item);
    else if (status == 'update')
      return this.http.patch(this.baseUrl + 'api/' + apiName, item);
  }
  Create(apiName, item): Observable<any> {
    return this.http.post(this.baseUrl + 'api/' + apiName, item);
  }
  exitsstudent(newstudent): Observable<any> {
    let item = new FormData();
    item.append('firstName', newstudent.firstName);
    item.append('middleName', newstudent.middleName);
    item.append('lastName', newstudent.lastName);
    item.append('mobileNumber', newstudent.mobileNumber);
    item.append('phoneNumber', newstudent.phoneNumber);
    return this.http.post(this.baseUrl + 'api/StudentExist', item);

  }
  delete(apiName, id): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/' + apiName + '/' + id);
  }
  getAll(apiName): Observable<any> {
    return this.http.get(this.baseUrl + 'api/' + apiName);
  }
  getAllsy(apiName): Observable<[]> {
    return this.http.get(this.baseUrl + 'api/' + apiName).pipe(
      map(
        (res: any) => {
          console.log('pipe');
          console.log(res);
          let a: [] = [];
          a = res.data[0];
          return a;
        }
      )
    );
  }
  getById(apiName, id): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(this.baseUrl + 'api/' + apiName + '/' + id, { headers });
  }

  getById2(apiName1, id, apiName2): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(this.baseUrl + 'api/' + apiName1 + '/' + id + '/' + apiName2, { headers });
  }
  getWithParam(apiName, param: any[]): Observable<any> {
    let params = new HttpParams();
    for (let p of param) {
      params = params.append(p.k, p.v);
    }
    return this.http.get(this.baseUrl + 'api/' + apiName, { params: params });
  }
  addWithParam(apiName, param: any[]): Observable<any> {
    let params = new HttpParams();
    for (let p of param) {
      params = params.append(p.k, p.v);
    }
    return this.http.post(this.baseUrl + 'api/' + apiName, {}, { params: params });
  }

  sendmessage(message, title, member, file, length): Observable<any> {
    console.log(member);
    console.log(message);
    console.log(title);
    console.log(member);
    console.log(file);
    const form = new FormData();

    for (let i = 0; i < length; i++) {
      //select type student
      if (member[i].sender == 'students') {
        form.append('loginable_type_id[' + i + ']', 'Student');
        // is_class true
        if (member[i].all_class == true) {
          form.append('is_all_section[' + i + ']', '0');
          form.append('is_all_student[' + i + ']', '0');
          form.append('is_all_class[' + i + ']', '1');
        }
        // is_class false
        else {
          form.append('is_all_class[' + i + ']', '0');
          form.append('class_id[' + i + '][0]', member[i].class_id.grade_name.id);
          // is_section true
          if (member[i].all_section == true) {
            form.append('is_all_section[' + i + ']', '1'); form.append('is_all_student[' + i + ']', '0');

          }
          // is_section false
          else {
            form.append('is_all_section[' + i + ']', '0');
            form.append('section_id[' + i + '][0]', member[i].section.id);
            // is_student true
            if (member[i].all_student == true) {
              form.append('is_all_student[' + i + ']', '1');
            }
            // is_student false
            else {
              form.append('is_all_student[' + i + ']', '0');
              form.append('student_id[' + i + '][0]', member[i].student.id);
            }
          }
        }
      }
      /// end select type
      else if (member.sender == 'Staff') { }
    }



    // form.append('loginable_type_id[0]','Student');
    // form.append('is_all_class[0]','1');
    // form.append('is_all_student[0]','1');
    // form.append('is_all_section[0]','1');
    form.append('title', title);
    form.append('content', message);
    for (let i = 0; i < file.file.length; i++) {
      form.append('file_name[' + i + ']', file.file[i].File);
    }


    return this.http.post(this.baseUrl + 'api' + '/sendMessageToAudiences', form);
  }



  disable(id, a): Observable<any> {
    console.log(a);
    let form = new FormData();
    form.append('is_disabled', a);
    return this.http.post(this.baseUrl + 'api/disabledStudent/' + id, form);
  }


  getexambyid(id): Observable<any> {
    return this.http.get(this.baseUrl + 'api' + '/Exam/' + id);

  }

  acceptmessage(id): Observable<any> {
    return this.http.post(this.baseUrl + 'api' + '/acceptMessage/' + id, {});
  }
  archivemessage(id): Observable<any> {
    return this.http.post(this.baseUrl + 'api' + '/archiveMessage/' + id, {});
  }
  deletemessage(id): Observable<any> {
    return this.http.post(this.baseUrl + 'api' + '/deleteMessageFromMe/' + id, {});
  }

}
