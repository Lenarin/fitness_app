import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';

class WaterStore {
    @persist
    @observable
    current = 0;

    @action
    increment() {
        this.current += 1;
    }

    @action
    decrement() {
        if (this.current === 0) { return; }

        this.current -= 1;
    }

    @action
    reset() {
        this.current = 0;
    }
}

export default WaterStore;
