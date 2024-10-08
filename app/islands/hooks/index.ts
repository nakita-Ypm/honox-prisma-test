export class CommonHooks {
  /**
   * createOnChange<T>
   * @param setState
   * @param transform
   */
  static createOnChange<T>(setState: (value: T) => void, transform: (value: string) => T) {
    return function (e: Event) {
      if (e.target instanceof HTMLInputElement) {
        const value = transform(e.target.value)
        setState(value)
      }
    }
  }
}
