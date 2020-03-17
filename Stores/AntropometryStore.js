import { observable, computed } from 'mobx';
import { persist } from 'mobx-persist';

class AntropometryStore {
    @persist
    @observable
    Gender = 'не указан';

    @persist
    @observable
    Height = 0;

    @persist
    @observable
    CurrentWeight = 0;

    @persist
    @observable
    BirtDate = 0;

    @persist
    @observable
    CurrentGoal = 'не задано';

    @computed
    get Age() {
        const unixTimeDiff = Date.now() - this.BirtDate;
        const ageDate = new Date(unixTimeDiff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    @computed
    get DCI() {
        if (this.Gender === 'не указан') {
            return 0;
        }

        let res = this.CurrentWeight * 10 + this.Height * 6.25 - this.Age * 5;

        if (this.Gender === 'мужской') {
            res += 5;
        } else if (this.Gender === 'женский') {
            res -= 161;
        }

        res *= 1.38;

        return res;
    }
}

export default AntropometryStore;
