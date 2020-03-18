import { observable } from "mobx";
import { persist } from "mobx-persist";

class Measure {
    @persist
    @observable
    Weight = 0;

    @persist
    @observable
    MeasureDate = (new Date()).getTime();

    @persist
    @observable
    Id = `_${Math.random().toString(36).substr(2, 9)}`;
}

export default Measure;
