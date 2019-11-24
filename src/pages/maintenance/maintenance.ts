import { Component, ViewChild } from '@angular/core';
import { App, Content, NavController, NavParams, PopoverController, ViewController, reorderArray } from 'ionic-angular';

import { AddMaintenancePage } from '../maintenance/addmaintenance';
import { AddHistoryPage } from '../history/addhistory';

class DateCalc
{
  year: any = 0;
  month: any = 0;
  day: any = 0;
	
  constructor() {
	this.year = 0;
	this.month = 0;
	this.day = 0;
  }
  setupUsingDate(date: Date) {
	this.year = date.getFullYear();
	this.month = date.getMonth();
	this.day = date.getDay();
  }
  setupUsingString(text: string) {
	var splitedText = text.split("-");
	this.year = parseInt(splitedText[0]);
	this.month = parseInt(splitedText[1]) - 1;
	this.day = parseInt(splitedText[2]);
  }
  getString() {
	var yearstr =   "" + this.year;
	var monthstr = ((this.month < 10)?"0":"") + (this.month + 1);
	var daystr =   ((this.day < 10)?"0":"") + this.day;
    return "" + yearstr + "-" + monthstr + "-" + daystr;
  }
  toInt() {
	return this.year * 10000 + this.month * 100 + this.day;
  }
  addMonth(inMonth) {
	this.month += inMonth;

	if (this.month >= 12) {
	  var yearplus = Math.floor(this.month / 12);
	  this.year += yearplus;
	  this.month = this.month - yearplus * 12;
	}
  }
  minMonth(tar: DateCalc) {
	var yearDiff = this.year - tar.year;
	var monthDiff = this.month - tar.month;
	return yearDiff * 12 + monthDiff;
  }
  diffMonth(tar: DateCalc) {
	return (this.year - tar.year) * 12 + (this.month - tar.month);
  }
}

@Component({
  template: "<ion-list><button ion-item>Test</button></ion-list>"
})
export class MaintenanceSortPage {
  constructor(public viewCtrl: ViewController) {}
}

@Component({
  selector:'page-maintenance',
  templateUrl:'maintenance.html',
})
export class MaintenancePage
{
  @ViewChild('MaintenanceGraph') MaintenanceGraph;
	
  db: any;
  reordername: any;
  reorderflag: any;
  maintenances: any;
  maintenancecost: any;
  maintenancemincost: any;
  maintenancecosttable: any;
  histories: any;
  constructor(public appCtrl: App, public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
    this.db = this.navParams.data.db;
	this.reordername = "SORT";
	this.reorderflag = false;
	this.maintenancecost = 0;
	this.maintenancemincost = 0;
	this.maintenancecosttable = [];
    this.maintenances = this.navParams.data.maintenances;
	this.histories = this.navParams.data.histories;
  }
  ionViewDidLoad() {
	this.sortList();
	this.calculateMaintenanceCost();
	this.MaintenanceGraph.drawGraph(this.maintenancecosttable);
  }
  public getYearWord(DateWord) {
	return DateWord.split("-")[0];
  }
  public getMonthWord(DateWord) {
	return DateWord.split("-")[1] + "/" + DateWord.split("-")[2];
  }
  calculateMaintenanceCost() {
	this.maintenancecosttable = [];
	for (var priceIndex=0;priceIndex<60;priceIndex++) {
	  this.maintenancecosttable.push(0);
	}
	var todayDate = new DateCalc();
	todayDate.setupUsingDate(new Date());
	var endDate = new DateCalc();
	endDate.year = todayDate.year;
	endDate.month = todayDate.month;
	endDate.year += 5;
	for (var mainIndex=0;mainIndex<this.maintenances.length;mainIndex++) {
	  var maintenance = this.maintenances[mainIndex];
	  if (maintenance.Repeat > 0) {
		this.maintenancecost += maintenance.Price * (60 / maintenance.Repeat);
	  } else
		continue;
	  var currentDate = new DateCalc();
	  currentDate.setupUsingString(maintenance.NextDate);
	  var loopcount = 0;
	  while(endDate.toInt() > currentDate.toInt() && loopcount < 30) {
		if (todayDate.toInt() < currentDate.toInt()) {
		  var currentPriceIndex = currentDate.diffMonth(todayDate);
		  this.maintenancecosttable[currentPriceIndex] -= maintenance.Price;
		}
		currentDate.addMonth(parseInt(maintenance.Repeat));
		loopcount++;
	  }
	}
    this.maintenancecost = Math.round(this.maintenancecost / 60);
	var minPrice = this.maintenancecosttable[0];
	for (var priceIndex=1;priceIndex<60;priceIndex++) {
	  this.maintenancecosttable[priceIndex] += this.maintenancecost;
	  if (priceIndex > 0)
		this.maintenancecosttable[priceIndex] += this.maintenancecosttable[priceIndex-1];
	  minPrice = Math.min(this.maintenancecosttable[priceIndex], minPrice);
	}
	this.maintenancemincost = Math.abs(minPrice);
	if (minPrice < 0) {
	  for(var priceindex=0;priceindex<60;priceindex++) {
		this.maintenancecosttable[priceindex] += this.maintenancemincost;
	  }
	}
  }
  toggleReorder(e) {
	  console.log("test");
	let popover = this.popoverCtrl.create(MaintenanceSortPage);
	popover.present({
	  ev: e
	});
    // this.reorderflag = !this.reorderflag;
	// if (this.reorderflag) {
		// this.reordername = "OK";
	// } else {
		// this.reordername = "SORT";
	// }
  } 
  sortList() {
	this.maintenances = this.maintenances.sort((a,b)=>{ 
	  var adate = new DateCalc();
	  adate.setupUsingString(a.NextDate);
	  var bdate = new DateCalc();
	  bdate.setupUsingString(b.NextDate);
	  return adate.diffMonth(bdate);
	});
  }
  getColor(item) {
	var todayDateCalc = new DateCalc();
	todayDateCalc.setupUsingDate(new Date());
	var itemDateCalc = new DateCalc();
	itemDateCalc.setupUsingString(item.NextDate);
	return (todayDateCalc.diffMonth(itemDateCalc) > 0)?'danger':'';
  }
  getTodayDateString() {
    var todayDate = new Date();
	var todayYear = todayDate.getFullYear().toString();
	var todayMonth = ((todayDate.getMonth() < 10) ? "0" : "") + todayDate.getMonth();
	var todayDay = ((todayDate.getDay() < 10) ? "0" : "") + todayDate.getDay();
	return todayYear + "-" + todayMonth + "-" + todayDay;
  }
  addMaintenance() {
    var newMaintenance = {
      "Name": "",
	  "Maker": "",
	  "ProductName": "",
	  "ProductCode":"",
	  "Repeat": 0,
	  "NextDate": this.getTodayDateString(),
	  "Price": 0
	};
	this.maintenances.push(newMaintenance);
    this.appCtrl.getRootNav().push(AddMaintenancePage, {db: this.db, maintenance: newMaintenance, postok: () => {this.calculateMaintenanceCost();}, postcancel: () => {this.removeMaintenance(newMaintenance);}});
  }
  modifyMaintenance(item) {
    this.appCtrl.getRootNav().push(AddMaintenancePage, {db: this.db, postok: () => {this.calculateMaintenanceCost();}, maintenance:item});
  }
  removeMaintenance(item) {
    var indexOfItem = this.maintenances.indexOf(item);
	if (indexOfItem >= 0) {
      this.maintenances.splice(indexOfItem, 1);
	}
	this.calculateMaintenanceCost();
  }
  updateMaintenanceDate(item) {
	var mtDate = new DateCalc();
	mtDate.setupUsingString(item.NextDate);
	mtDate.addMonth(parseInt(item.Repeat));
	item.NextDate = mtDate.getString();
  }
  addHistory(item) {
    var newHistory = {
      "Name": item.Name,
	  "ODO": 0,
	  "Description": item.Maker + " - " + item.ProductName,
	  "Price": item.Price,
	  "Date": item.NextDate
	};
	this.histories.push(newHistory);
	this.appCtrl.getRootNav().push(AddHistoryPage, {
		db: this.db, 
		history:newHistory, 
		postok: ()=>{this.updateMaintenanceDate(item);},
		postcancel: ()=>{this.histories.splice(this.histories.length-1, 1);}
		});
  }
  reorderData(indexes) {
    this.maintenances = reorderArray(this.maintenances, indexes);
	this.db.save();
  }
}