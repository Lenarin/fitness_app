class Measure {
    Weight = 0;
    MeasureDate = new Date();
    Id = '_' + Math.random().toString(36).substr(2, 9);
}

export default Measure;