import {Component, OnInit} from '@angular/core';
import {EstimationPairDto, StatsService} from '../../stats.service';

class FactorStat {
  factorName: string;
  likePercent: number;
  dislikePercent: number;
  neutralPercent: number;
}

class Factor {
  name: string;
  estimationsSize: number;
}

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  allRelevPairs: EstimationPairDto[] = [];
  factorStats: FactorStat[] = [];
  activeFactors: Factor[] = [];

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    this.statsService.getAllRelevEstimPairs()
      .subscribe(
        pairs => {
          this.allRelevPairs = pairs;
          this.calcStat();
        },
        error => {
          console.log(error);
        });
  }

  private calcStat() {
    for (let pair of this.allRelevPairs) {
      let factor = this.activeFactors.find(factor => factor.name == pair.factorName);
      if (factor == undefined) {
        let newFactor: Factor = {name: pair.factorName, estimationsSize: 1};
        this.activeFactors.push(newFactor);
      } else {
        factor.estimationsSize++;
      }
    }

    for (let factor of this.activeFactors) {
      let likes = 0;
      let dislikes = 0;
      let neutrals = 0;

      for (let pair of this.allRelevPairs) {
        if (pair.factorName === factor.name) {
          switch (pair.estimation) {
            case 'LIKE': likes++; break;
            case 'DISLIKE': dislikes++; break;
            case 'NEUTRAL': neutrals++;
          }
        }
      }
      this.factorStats.push({
        factorName: factor.name,
        likePercent: Math.round((likes / factor.estimationsSize) * 100 * 10) / 10,
        neutralPercent: Math.round((neutrals / factor.estimationsSize) * 100 * 10) / 10,
        dislikePercent: Math.round((dislikes / factor.estimationsSize) * 100 * 10) / 10
      });
    }
  }

}
