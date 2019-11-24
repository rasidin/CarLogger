import { Component, ViewChild } from '@angular/core';
import { Content, NavController, NavParams } from 'ionic-angular';

@Component({
	selector:'page-addhistory',
	templateUrl:'addhistory.html',
})
export class AddHistoryPage
{
  @ViewChild("Name") Name;
  @ViewChild("ODO") ODO;
  @ViewChild("Date") Date;
  @ViewChild("Price") Price;
  
  db: any = null;
  history: any = null;
  postok: any = null;
  postcancel: any = null;
  isModified: any = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.history = this.navParams.data.history;
    this.db = this.navParams.data.db;
	this.postok = this.navParams.data.postok;
	this.postcancel = this.navParams.data.postcancel;
  }
  ionViewDidLoad() {
    this.Date._text = this.history.Date;
  }
  ionViewWillLeave() {
	if (!this.isModified) {
	  this.postcancel();
	}
  }
  submit() {
    this.history.Name = this.Name.value;
    this.history.ODO = this.ODO.value;
    this.history.Date = this.Date._text;
    this.history.Price = this.Price.value;
    this.db.save();

	if (this.postok != undefined && this.postok != null) {
	  this.postok();
	}

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