import {Component, OnInit, ViewChild} from '@angular/core';
import {FactorDto, FactorsService} from '../../factors.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-factors-managing',
  templateUrl: './factors-managing.component.html',
  styleUrls: ['./factors-managing.component.css']
})
export class FactorsManagingComponent implements OnInit {
  @ViewChild('ngForm') addButtonForm: NgForm;
  private _allFactors: FactorDto[] = [];

  constructor(private factorsService: FactorsService) {
  }

  ngOnInit() {
    this.factorsService.getAllFactors()
      .subscribe(factors => this.allFactors = factors);

  }

  set allFactors(factors: FactorDto[]) {
    factors.forEach(factor => {
      if (factor.status === 'ACTIVE') {
        this._allFactors.unshift(factor);
      }
      if (factor.status === 'REMOVED') {
        this._allFactors.push(factor);
      }
    });
  }

  get allFactors(): FactorDto[] {
    return this._allFactors;
  }

  onSubmit() {
    const newFactorName = this.addButtonForm.value.newFactorName;
    this.factorsService.createNewFactor(newFactorName)
      .subscribe(
        resp => {
          console.log(resp);
          this._allFactors.unshift({name: newFactorName, status: 'ACTIVE'});
        },
        error => {
          console.log('My Error:');
          console.log(error);
        });
  }

  onChangeStatusClick(factorName: string) {
    console.log(factorName);

    this.factorsService.changeFactorStatus(factorName)
      .subscribe(
        resp => {
          console.log(resp);
          let factorDto = this._allFactors.find(factor => {
            return factor.name == factorName;
          });
          factorDto.status = factorDto.status === 'ACTIVE' ? 'REMOVED' : 'ACTIVE';
        },
        error => {
          console.log('My Error:');
          console.log(error);
        });
  }


}