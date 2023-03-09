
export class Random {
  _seed: string
  _offset: number

  constructor(seed: string) {
    this._seed = seed;
    this._offset = this._seed.split('').reduce(
      (hashCode, currentVal) =>
        (hashCode = currentVal.charCodeAt(0) + (hashCode << 6) + (hashCode << 16) - hashCode),
      0
    );
  }

  get(min: number, max: number) {
    var x = Math.sin(this._offset++) * 10000;
    return Math.floor((x - Math.floor(x)) * (max - min) + min);
  }
}

