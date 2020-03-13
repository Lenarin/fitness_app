import { decorate, observable, action } from "mobx";

class WaterStore {
    @observable
    current = 0;

    @action
    inc() {
        this.current++;
    }

    @action
    dec() {
        if (this.current === 0)
            return;

        this.current--;
    }
}

export default WaterStore;