import { RestApiService } from './../shared/rest-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  preserveWhitespaces: true,
})
export class EmployeeListComponent implements OnInit {
  Employee: any = [];

  constructor(public restApi: RestApiService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    return this.restApi.getEmployees().subscribe((data: {}) => {
      this.Employee = data;
    });
  }

  deleteEmployee(id: any) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.restApi.deleteEmployee(id).subscribe((data) => {
        this.loadEmployees();
      });
    }
  }
}
