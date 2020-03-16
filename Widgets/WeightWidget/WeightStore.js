import { decorate, observable, action, computed, toJS } from "mobx";
import { persist } from "mobx-persist";
import Measure from './Models/Measure';

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