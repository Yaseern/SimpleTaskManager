import { Directive, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Directive()
export class SubscriptionAdapter implements OnDestroy {
    subs = new Subscription();
    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}