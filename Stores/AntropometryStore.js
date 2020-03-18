import { observable, computed } from 'mobx';
import { persist, create } from 'mobx-persist';
import { AsyncStorage } from 'react-native';

class AntropometryStore {
    @observable
    hydrated = false;

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
    BirtDate = Date.now();

    @persist
    @observable
    DailyActivityCoefficient = 1.0;

    @computed
    get Age() {
        const unixTimeDiff = Date.now() - this.BirtDate;
        const ageDate = new Date(unixTimeDiff);

        const res = Math.abs(ageDate.getUTCFullYear() - 1970);

        console.log(unixTimeDiff);
        console.log(`BirtDate = ${new Date(this.BirtDate)}`);
        console.log(`Age = ${res}`);
        return res;
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

    @computed
    get CanCalculateDCI() {
        return this.Age > 0 && this.CurrentWeight > 0 && this.Height > 0;
    }
}

const antropometryStore = new AntropometryStore();

const hydrate = create({
    storage: AsyncStorage,
});

hydrate('Antropometry', antropometryStore);

export default antropometryStore;
