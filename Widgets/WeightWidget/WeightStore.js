import { decorate, observable, action, computed } from "mobx";
import { persist } from "mobx-persist";
import Measure from './Models/Measure';

class WeightStore {
    @persist('list')
    @observable
    measurementHistory = [
        {
            Weight: 0,
            MeasureDate: new Date()
        },
        {
            Weight: 0,
            MeasureDate: new Date(2020, 3, 14, 12, 4)
        },
        {
            Weight: 0,
            MeasureDate: new Date(2020, 3, 14, 12, 5)
        },
        {
            Weight: 0,
            MeasureDate: new Date(2020, 3, 14, 12, 6)
        },
        {
            Weight: 0,
            MeasureDate: new Date(2020, 3, 14, 12, 7)
        },
        {
            Weight: 0,
            MeasureDate: new Date(2020, 3, 14, 12, 8)
        },
        {
            Weight: 0,
            MeasureDate: new Date(2020, 3, 14, 12, 9)
        },
        {
            Weight: 0,
            MeasureDate: new Date(2020, 3, 14, 12, 10)
        },
        {
            Weight: 0,
            MeasureDate: new Date(2020, 3, 14, 12, 11)
        },
    ];

    @action
    addMeasurement(measure) {
        this.measurementHistory.push(measure);
    }

    @action
    removeMeasure(measure) {
        const res = this.measurementHistory.remove(measure);
        console.log(res);
        console.log(JSON.stringify(measure));
    }
}

export default WeightStore;