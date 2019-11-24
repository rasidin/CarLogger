import { Component, ViewChild } from '@angular/core';
import { Content, NavController, NavParams } from 'ionic-angular';

@Component({
	selector:'page-addfuelcost',
	templateUrl:'addfuelcost.html',
})
export class AddFuelCostPage
{
  @ViewChild("Cost") Cost;
  @ViewChild("Date") Date;
  
  db: any = null;
  item: any = null;
  postcancel: any = null;
  isModified: any = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.data.item;
    this.db = this.navParams.data.db;
	this.postcancel = this.navParams.data.postcancel;
  }
  ionViewDidLoad() {
    this.Date._text = this.item.Date;
  }
  ionViewWillLeave() {
	if (!this.isModified) {
	  this.postcancel();
	}
  }
  submit() {
    this.item.Cost = this.Cost.value;
    this.item.Date = this.Date._text;
    this.db.save();

	this.isModified = true;
    this.navCtrl.pop();
  }
  cancel() {
	if (this.postcancel != null && this.postcancel != undefined) {
      this.postcancel();
	}
	this.isModified = true;
    this.navCtrl.pop();
  }
}