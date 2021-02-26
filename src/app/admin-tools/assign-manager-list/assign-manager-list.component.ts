import {Component, OnInit, Renderer2} from '@angular/core';
import {EmployeesService} from '../../employees.service';
import {ActivatedRoute, Data} from '@angular/router';
import {EmployeeDto} from '../../models-container.model';

@Component({
  selector: 'app-managers-list',
  templateUrl: './assign-manager-list.component.html',
  styleUrls: ['./assign-manager-list.component.css']
})
export class AssignManagerListComponent implements OnInit {
  managers: EmployeeDto[] = [];
  chosenManagerElement: Element;

  constructor(private employeesService: EmployeesService,
              private route: ActivatedRoute,
              private renderer: Renderer2) {}

  ngOnInit() {
    this.route.data
      .subscribe((data: Data) => {
        this.managers = data['managers'];
      });
  }

  onNewManagerChosen(event, empId) {
    if (this.chosenManagerElement) {
      this.renderer.removeClass(this.chosenManagerElement, 'list-group-item-info');
    }
    this.chosenManagerElement = event.toElement.offsetParent;
    this.renderer.addClass(this.chosenManagerElement,'list-group-item-info');

    this.employeesService.newManagerWasChosen.next(+empId);
  }
}
