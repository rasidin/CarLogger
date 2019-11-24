import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DataBase } from '../../database/database';
import { AddCarPage } from '../car/addcar';
import { CarPage } from '../car/car';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  db: any;
  cars: any;
  constructor(public navCtrl: NavController, private storage: Storage) {
    this.db = new DataBase(storage, ()=>{ this.cars = this.db.cars; });
  }
  addCar() {
    var newCar = {
      "Name":"",
	  "Code":""
	};
	this.cars.push(newCar);
    this.navCtrl.push(AddCarPage, {db: this.db, car: newCar});
  }
  selectCar(item) {
    if (item.histories == undefined || item.histories == null)
      item.histories = [];
    if (item.checkitems == undefined || item.checkitems == null)
      item.checkitems = [];
    if (item.maintenances == undefined || item.maintenances == null)
      item.maintenances = [];
    if (item.tuninglist == undefined || item.tuninglist == null)
	  item.tuninglist = [];
    if (item.fuelcosts == undefined || item.fuelcosts == null)
      item.fuelcosts = [];
    this.navCtrl.push(CarPage, {db: this.db, car: item, histories: item.histories, checkitems: item.checkitems, maintenances: item.maintenances, tuninglist: item.tuninglist, fuelcosts: item.fuelcosts});
  }
  modifyCar(item) {
    this.navCtrl.push(AddCarPage, {db: this.db, car: item});
  }
  removeCar(item) {
    var indexOfCar = this.cars.indexOf(item);
	if (indexOfCar >= 0)
      this.cars.splice(indexOfCar, 1);
      this.db.save();
  }
}
