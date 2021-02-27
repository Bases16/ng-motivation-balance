/* tslint:disable:triple-equals */
import {Component, OnInit, ViewChild} from '@angular/core';
import {FactorsService} from '../../factors.service';
import {NgForm} from '@angular/forms';
import {FactorDto} from '../../models-container.model';

@Component({
  selector: 'app-factors-managing',
  templateUrl: './factors-managing.component.html'
})
export class FactorsManagingComponent implements OnInit {
  @ViewChild('ngForm') addButtonForm: NgForm;
  private _allFactors: FactorDto[] = [];
  error: string;

  constructor(private factorsService: FactorsService) {}

  ngOnInit(): void {
    this.factorsService.getAllFactors()
      .subscribe(
        factors => this.allFactors = factors,
        error => this.error = error
      );
  }

  get allFactors(): FactorDto[] {
    return this._allFactors;
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

  onSubmit(): void {
    this.error = null;
    const newFactorName = this.addButtonForm.value.newFactorName;

    const factor: FactorDto = this._allFactors
      .find(f => newFactorName.toLowerCase() == f.name.toLowerCase());
    if (factor) {
      this.addButtonForm.reset();
      if (factor.status === 'REMOVED') {
        alert('FACTOR WITH SUCH NAME ALREADY EXISTS BUT IS NOT ACTIVE. CLICK "ACTIVATE" ON IT!');
      }
      if (factor.status === 'ACTIVE') {
        alert('FACTOR WITH SUCH NAME ALREADY EXISTS AND WORKS FINE!');
      }
      return;
    }

    this.factorsService.createNewFactor(newFactorName)
      .subscribe(
        () => {
          this.addButtonForm.reset();
          this._allFactors.unshift({name: newFactorName, status: 'ACTIVE'});
        },
        (errorMessage) => this.error = errorMessage
      );
  }

  onChangeStatusClick(factorName: string): void {
    this.factorsService.changeFactorStatus(factorName)
      .subscribe(
        () => {
          const factorDto = this._allFactors.find(factor => {
            return factor.name === factorName;
          });
          factorDto.status = factorDto.status === 'ACTIVE' ? 'REMOVED' : 'ACTIVE';
        },
        error => {
          console.log(error);
        });
  }

}
