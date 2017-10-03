import {Observable, Subscription} from 'rxjs'

export class Main {
    private action$: Subscription

    constructor() {
        this.action$ = Observable.interval(1000)
            .startWith(0)
            .map(() => 'tick')
            .subscribe(
                x => console.log(x),
                err => console.error(err),
                () => console.log('done')
            )
    }

    start() {}
}

const app = new Main()