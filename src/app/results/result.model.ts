export class ResultModel {

  constructor(public empId: string,
              public passDatetime: Date,
              public pairs: {factorName: string, estimation: string}[]) {
  }
}
