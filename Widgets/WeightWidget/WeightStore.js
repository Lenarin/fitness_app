import { decorate, observable, action, computed, toJS } from "mobx";
import { persist } from "mobx-persist";
import Measure from './Models/Measure';

class WeightStore {
    @persist('list')
    @observable
    measurementHistory = [
        {
            Weight: 50,
            MeasureDate: new Date(2020, 2, 1),
            Id: '_' + Math.random().toString(36).substr(2, 9)
        },
        {
            Weight: 51,
            MeasureDate: new Date(2020, 2, 2),
            Id: '_' + Math.random().toString(36).substr(2, 9)
        },
        {
            Weight: 52,
            MeasureDate: new Date(2020, 2, 3),
            Id: '_' + Math.random().toString(36).substr(2, 9)
        },
        {
            Weight: 53,
            MeasureDate: new Date(2020, 2, 4),
            Id: '_' + Math.random().toString(36).substr(2, 9)
        },
        {
            Weight: 54,
            MeasureDate: new Date(2020, 2, 5),
            Id: '_' + Math.random().toString(36).substr(2, 9)
        },
        {
            Weight: 55,
            MeasureDate: new Date(2020, 2, 6),
            Id: '_' + Math.random().toString(36).substr(2, 9)
        },
        {
            Weight: 56,
            MeasureDate: new Date(2020, 2, 7),
            Id: '_' + Math.random().toString(36).substr(2, 9)
        },
        {
            Weight: 57,
            MeasureDate: new Date(2020, 2, 8),
            Id: '_' + Math.random().toString(36).substr(2, 9)
        },
        {
            Weight: 58,
            MeasureDate: new Date(2020, 2, 9),
            Id: '_' + Math.random().toString(36).substr(2, 9)
        },
        {
            Weight: 59,
            MeasureDate: new Date(2020, 2, 10),
            Id: '_' + Math.random().toString(36).substr(2, 9)
        },
    ];

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