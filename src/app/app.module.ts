import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CarPage } from '../pages/car/car';
import { AddCarPage } from '../pages/car/addcar';
import { HistoryPage } from '../pages/history/history';
import { AddHistoryPage } from '../pages/history/addhistory';
import { MaintenancePage } from '../pages/maintenance/maintenance';
import { AddMaintenancePage } from '../pages/maintenance/addmaintenance';
import { MaintenanceSortPage } from '../pages/maintenance/maintenance';
import { TuningPage } from '../pages/tuning/tuning';
import { AddTuningPage } from '../pages/tuning/addtuning';
import { FuelCostPage } from '../pages/fuelcost/fuelcost';
import { AddFuelCostPage } from '../pages/fuelcost/addfuelcost';
import { MaintenanceGraphComponent } from '../components/maintenancegraph/maintenancegraph';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
	AddCarPage,
	CarPage,
	HistoryPage,
	AddHistoryPage,
	MaintenancePage,
	AddMaintenancePage,
	MaintenanceSortPage,
	TuningPage,
	AddTuningPage,
	FuelCostPage,
	AddFuelCostPage,
	MaintenanceGraphComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
	IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	AddCarPage,
	CarPage,
	HistoryPage,
	AddHistoryPage,
	MaintenancePage,
	AddMaintenancePage,
	TuningPage,
	AddTuningPage,
	FuelCostPage,
	AddFuelCostPage
  ],
  providers: [
	StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
