export class TimeSignatureEvent {
  private ticks: number;
  private numerator: number;
  private denominator: number;

  constructor({
    ticks,
    numerator,
    denominator,
  }: {
    /** The tick at which this event happens. */
    ticks: number;
    numerator: number;
    denominator: number;
  }) {
    this.ticks = ticks;
    this.numerator = numerator;
    this.denominator = denominator;
  }

  getTicks(): number {
    return this.ticks;
  }

  /**
   *
   * @param ticks The tick at which this event happens.
   */
  setTicks(ticks: number) {
    this.ticks = ticks;
  }

  getNumerator(): number {
    return this.numerator;
  }

  setNumerator(numerator: number) {
    this.numerator = numerator;
  }

  getDenominator(): number {
    return this.denominator;
  }

  setDenominator(denominator: number) {
    this.denominator = denominator;
  }
}
