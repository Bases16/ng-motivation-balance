import {Component, OnInit, ViewChild} from '@angular/core';
import {EmployeesService} from '../../employees.service';
import {NgForm} from '@angular/forms';
import {EmployeeDto} from '../../models-container.model';

@Component({
  selector: 'app-search-employees',
  templateUrl: './search-employees.component.html'
})
export class SearchEmployeesComponent implements OnInit {
  @ViewChild('ngForm') searchEmpsForm: NgForm;
  foundEmployees: EmployeeDto[];
  error: string;

  constructor(private employeeService: EmployeesService) {}

  ngOnInit() {
    this.employeeService.getAllManagers()
      .subscribe(
        () => {},
        error => this.error = error
      )
  }

  onSubmit() {
    const searchString = this.searchEmpsForm.value.searchQuery;
    let strings = searchString.trim().split(/\b\s+\b/);

    this.employeeService.searchEmployee(strings[0], strings[1])
      .subscribe(
        employees => {
          this.foundEmployees = employees;
        },
        error => this.error = error
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
