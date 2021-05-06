import { Color } from "types";

export class ColorStorage {
  private key: string;

  constructor(key: string) {
    this.key = key;

    const initialValue = localStorage.getItem(key);

    if (!initialValue) {
      localStorage.setItem(key, JSON.stringify([]));
    }
  }

  public addColor(color: Color) {
    const lastValue = JSON.parse(localStorage.getItem(this.key) as string);

    lastValue.push(color);

    localStorage.setItem(this.key, JSON.stringify(lastValue));
  }

  public remove(id: string) {
    let lastValue = JSON.parse(localStorage.getItem(this.key) as string);

    lastValue = lastValue.filter((color: Color) => color.id !== id);

    localStorage.setItem(this.key, JSON.stringify(lastValue));
  }

  public getAllColors() {
    const colors = JSON.parse(localStorage.getItem(this.key) as string);

    return colors ?? [];
  }
}
