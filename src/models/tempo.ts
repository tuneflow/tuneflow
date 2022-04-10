export class TempoEvent {
  private ticks: number;
  private bpm: number;
  private time: number;

  constructor({
    ticks,
    bpm,
    time,
  }: {
    /** The tick at which this event happens. */
    ticks: number;
    /** The new tempo in BPM(Beats-per-minute) format. */
    bpm: number;
    /** The time at which this event happens. */
    time: number;
  }) {
    this.ticks = ticks;
    this.bpm = bpm;
    this.time = time;
  }

  getTicks(): number {
    return this.ticks;
  }

  getBpm(): number {
    return this.bpm;
  }

  /**
   * In most cases you don't need to (and shouldn't) call this method.
   * To update the BPM of a tempo event, call `updateTempo` from the `Song` instance.
   * @param bpm The new tempo in BPM(Beats-per-minute) format.
   */
  setBpmInternal(bpm: number) {
    this.bpm = bpm;
  }

  getTime(): number {
    return this.time;
  }

  /**
   * In most cases you don't need to (and shouldn't) call this method.
   * @param time The time at which this event happens.
   */
  setTimeInternal(time: number) {
    this.time = time;
  }
}
