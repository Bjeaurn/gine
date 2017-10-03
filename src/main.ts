import {Observable, Subscription} from 'rxjs'

export class Main {
    private action$: Subscription

    constructor() {
        this.action$ = Observable.from([1, 2, 3])
            .map(x => x)
            .subscribe(
                x => console.log(x),
                err => console.error(err),
                () => console.log('done')
            )
    }

    start() {
        
    }
}

const app = new Main()
app.start()