import {
    observable, action,
} from 'mobx';
import { persist } from 'mobx-persist';

class WeightStore {
    @persist('list')
    @observable
    MeasurementHistory = [];

    @action
    addMeasurement(measure) {
        this.MeasurementHistory.push(measure);
    }

    @action
    removeMeasure(measure) {
        this.MeasurementHistory.remove(measure);
    }
}

export default WeightStore;
