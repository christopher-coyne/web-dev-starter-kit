export class StandardResponse<T> {
  status: number;
  data: T;

  constructor(status: number, data: T) {
    this.status = status;
    this.data = data;
  }

  static ok<T>(data: T): StandardResponse<T> {
    return new StandardResponse(200, data);
  }
}
