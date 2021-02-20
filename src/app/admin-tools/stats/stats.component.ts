import {Component, OnInit} from '@angular/core';
import {EstimationPairDto, StatsService} from '../../stats.service';

class FactorStat {
  factorName: string;
  likePercent: number;
  notLikePercent: number;
  neutralPercent: number;
}

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  allRelevPairs: EstimationPairDto[] = [];
  activeFactors: string[] = [];
  factorStats: FactorStat[] = [];

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    this.statsService.getAllRelevEstimPairs()
      .subscribe(
        pairs => {
          console.log(pairs);
          this.allRelevPairs = pairs;
          this.calcStat();
        },
        error => {
          console.log(error);
        });
  }

  private calcStat() {
    for (let pair of this.allRelevPairs) {
      if (!this.activeFactors.includes(pair.factorName)) {
        this.activeFactors.push(pair.factorName);
      }
    }
    const factorsSize = this.activeFactors.length;
    const estimationsOnEachFactorSize = this.allRelevPairs.length / factorsSize;

    for (let factor of this.activeFactors) {
      let likes = 0;
      let notLikes = 0;
      let neutrals = 0;

      for (let pair of this.allRelevPairs) {
        if (pair.factorName === factor) {
          switch (pair.estimation) {
            case 'LIKE': likes++; break;
            case 'NOT_LIKE': notLikes++; break;
            case 'NEUTRAL': neutrals++;
          }
        }
      }
      this.factorStats.push({
        factorName: factor,
        likePercent: (likes / estimationsOnEachFactorSize) * 100,
        neutralPercent: (neutrals / estimationsOnEachFactorSize) * 100,
        notLikePercent: (notLikes / estimationsOnEachFactorSize) * 100
      });
    }
  }

}
