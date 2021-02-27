import {Component, OnInit} from '@angular/core';
import {StatsService} from '../../stats.service';
import {EstimationPairDto, Factor, FactorStat} from '../../models-container.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  allRelevPairs: EstimationPairDto[] = [];
  factorStats: FactorStat[] = [];
  activeFactors: Factor[] = [];
  error: string;

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.statsService.getAllRelevEstimPairs()
      .subscribe(
        pairs => {
          this.allRelevPairs = pairs;
          this.calcStat();
        },
        (errorMessage) => this.error = errorMessage
      );
  }

  private calcStat(): void {
    for (const pair of this.allRelevPairs) {
      const factor = this.activeFactors.find(f => f.name === pair.factorName);
      if (factor === undefined) {
        const newFactor: Factor = {name: pair.factorName, estimationsSize: 1};
        this.activeFactors.push(newFactor);
      } else {
        factor.estimationsSize++;
      }
    }

    for (const factor of this.activeFactors) {
      let likes = 0;
      let dislikes = 0;
      let neutrals = 0;

      for (const pair of this.allRelevPairs) {
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

    this.factorStats
      .sort((fs1, fs2) => {
        if (fs1.factorName < fs2.factorName) { return -1; }
        if (fs1.factorName > fs2.factorName) { return 1; }
      });
  }

}
