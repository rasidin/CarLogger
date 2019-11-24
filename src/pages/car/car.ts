import { Component, ViewChild } from '@angular/core';
import { Content, NavController, NavParams } from 'ionic-angular';

import { HistoryPage } from '../history/history';
import { MaintenancePage } from '../maintenance/maintenance';
import { CheckListPage } from '../checklist/checklist';
import { TuningPage } from '../tuning/tuning';
import { FuelCostPage } from '../fuelcost/fuelcost';

@Component({
	selector:'page-car',
	templateUrl:'car.html',
})
export class CarPage
{
  HistoryTab = HistoryPage;
  MaintenanceTab = MaintenancePage;
  CheckListTab = CheckListPage;
  TuningTab = TuningPage;
  FuelCostTab = FuelCostPage;
  CarName: any;

  car: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.car = this.navParams.data.car;
    this.CarName = this.car.Name;
  }
}