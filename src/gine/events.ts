import { Gine } from './core'
import { Subject, Observable } from 'rxjs'
import { share } from 'rxjs/operators'

export class Events {
  public readonly events: Observable<string>
  private readonly eventsSubject: Subject<string> = new Subject<string>()

  constructor() {
    this.events = this.eventsSubject.asObservable().pipe(share())
  }

  public sendEvent(event: string) {
    this.eventsSubject.next(event)
  }
}
