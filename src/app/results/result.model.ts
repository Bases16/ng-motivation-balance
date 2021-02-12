export class ResultModel {

  constructor(public empId: string,
              public datetime: Date,
              public pairs: {factorName: string, estimation: string}[]) {
  }
}
