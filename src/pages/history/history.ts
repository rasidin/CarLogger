import { Component, ViewChild } from '@angular/core';
import { App, Content, NavController, NavParams } from 'ionic-angular';

import { AddHistoryPage } from '../history/addhistory';

@Component({
	selector:'page-history',
	templateUrl:'history.html',
})
export class HistoryPage
{
  db: any;
  histories: any;
  constructor(public appCtrl: App, public navCtrl: NavController, public navParams: NavParams) {
    this.db = this.navParams.data.db;
    this.histories = this.navParams.data.histories;
	this.histories.sort((a,b) => {
		var ADates = a.Date.split('-');
		var BDates = b.Date.split('-');
		var ADatesInt = parseInt(ADates[0] + ADates[1] + ADates[2]);
		var BDatesInt = parseInt(BDates[0] + BDates[1] + BDates[2]);
		return ADatesInt - BDatesInt;
	});
  }
  addHistory() {
    var todayDate = new Date();
	var todayYear = todayDate.getFullYear().toString();
	var todayMonth = ((todayDate.getMonth() < 10) ? "0" : "") + todayDate.getMonth();
	var todayDay = ((todayDate.getDay() < 10) ? "0" : "") + todayDate.getDay();
    var newHistory = {
	  "Name": "",
	  "ODO": 0,
	  "Price": 0,
	  "Date": todayYear + "-" + todayMonth + "-" + todayDay,
	  "Description": ""
	};
	this.histories.push(newHistory);
    this.appCtrl.getRootNav().push(AddHistoryPage, {db: this.db, history: newHistory, postcancel: () => {this.removeHistory(newHistory)}});
  }
  modifyHistory(item) {
    this.appCtrl.getRootNav().push(AddHistoryPage, {db: this.db, history: item});
  }
  removeHistory(item) {
    var indexOfItem = this.histories.indexOf(item);
	if (indexOfItem >= 0) {
      this.histories.splice(indexOfItem, 1);
	  this.db.save();
	}
  }
}