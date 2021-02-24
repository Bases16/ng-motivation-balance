import {Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeDto, EmployeesService} from '../../employees.service';
import {NgForm} from '@angular/forms';
import {log} from 'util';

@Component({
  selector: 'app-search-employees',
  templateUrl: './search-employees.component.html',
  styleUrls: ['./search-employees.component.css']
})
export class SearchEmployeesComponent implements OnInit {
  @ViewChild('ngForm') searchEmpsForm: NgForm;
  foundEmployees: EmployeeDto[];

  constructor(private employeeService: EmployeesService) {}

  ngOnInit() {
    this.employeeService.getAllManagers()
      .subscribe(
        () => {},
        error => console.log(error)
      )
  }

  onSubmit() {
    const searchString = this.searchEmpsForm.value.searchQuery;
    let strings = searchString.trim().split(/\b\s+\b/);

    this.employeeService.searchEmployee(strings[0], strings[1])
      .subscribe(
        employees => {
          console.log(employees);
          this.foundEmployees = employees;
        },
        error => console.log(error)
      );
  }

  getManagerNameById(id: string) {
    if (id) {
      const manager = this.employeeService.getEmployeeById(id);
      return manager.firstName + ' ' + manager.lastName;
    } else {
      return ' - ';
    }
  }

}
