export interface AuthResponseDto {
  empId: string;
  email: string;
  token: string;
}


export interface UserData {
  empId: number,
  email: string;
  role: string;
  _token: string;
  _tokenExpirationDate: string;
}


export class User {
  constructor(public empId: number,
              public email: string,
              public role: string,
              private _token: string,
              private _tokenExpirationDate: Date)  {
  }
  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}


export interface ResultDto {
  empId: string;
  passDatetime?: string;
  estimationPairs: { factorName: string, estimation: string }[]
}


export interface EstimationPairDto {
  factorName: string;
  estimation: string;
}


export interface FactorDto {
  name: string;
  status: string
}


export interface EmployeeDto {
  id: string;
  managerId: string;
  firstName: string;
  lastName: string;
  empRole: string;
}