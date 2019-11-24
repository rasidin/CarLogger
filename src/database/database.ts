export class DataBase {
  storage: any;
  cars: any;
  constructor(inStorage, postLoadFunc) {
    this.storage = inStorage;
	this.cars = [];
	this.storage.get('cars').then((val) => {
      if (val != null)
		this.cars = val;
	  else
		this.cars = [];
      postLoadFunc();
	});
  }
  public addCar(car) {
    this.cars.push(car);
	this.save();
  }
  public save() {
    this.storage.set('cars', this.cars);
  }
};