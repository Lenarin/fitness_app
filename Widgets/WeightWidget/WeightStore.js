import {
    observable, action,
} from 'mobx';
import { persist } from 'mobx-persist';

class WeightStore {
    @persist('list')
    @observable
    measurementHistory = [];

    @action
    addMeasurement(measure) {
        this.measurementHistory.push(measure);
    }

    @action
    removeMeasure(measure) {
        this.measurementHistory.remove(measure);
    }
}

export default WeightStore;
