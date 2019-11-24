import { Component, ViewChild } from '@angular/core';
import { App, Content, NavController, NavParams } from 'ionic-angular';

import { AddCheckItemPage } from '../checklist/addcheckitem';

@Component({
	selector:'page-checklist',
	templateUrl:'checklist.html',
})
export class CheckListPage
{
  db: any;
  checkitems: any;
  constructor(public appCtrl: App, public navCtrl: NavController, public navParams: NavParams) {
    this.db = this.navParams.data.db;
    this.checkitems = this.navParams.data.checkitems;
  }
  getTodayDateString() {
    var todayDate = new Date();
	var todayYear = todayDate.getFullYear().toString();
	var todayMonth = ((todayDate.getMonth() < 10) ? "0" : "") + todayDate.getMonth();
	var todayDay = ((todayDate.getDay() < 10) ? "0" : "") + todayDate.getDay();
	return todayYear + "-" + todayMonth + "-" + todayDay;
  }
  addCheckItem() {
    var newItem = {
      "Name": "",
	  "Repeat": "",
	  "NextDate": this.getTodayDateString()
	};
	this.checkitems.push(newItem);
    this.appCtrl.getRootNav().push(AddCheckItemPage, {db: this.db, item: newItem, postcancel: ()=>{ this.checkitems.splice(this.checkitems.indexOf(newItem), 1); }});
  }
  removeCheckItem(item) {
    var indexOfCheckItem = this.checkitems.indexOf(item);
	if (indexOfCheckItem >= 0) {
      this.checkitems.splice(indexOfCheckItem, 1);
	  this.db.save();
	}
  }
  modifyCheckItem(item) {
    this.appCtrl.getRootNav().push(AddCheckItemPage, {db: this.db, item: item});
  }
}