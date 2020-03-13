import { decorate, observable, action } from "mobx";

class TickStore {
    @observable
    current = 0;

    @action
    inc() {
        this.current += 1;
    }

    @action
    dec() {
        this.current -= 1;
    }
}

export default TickStore;