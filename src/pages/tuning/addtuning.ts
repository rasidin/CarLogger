import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
	selector:'page-addtuning',
	templateUrl:'addtuning.html',
})
export class AddTuningPage
{
  @ViewChild("PartName") PartName;
  @ViewChild("Name") Name;
  @ViewChild("Price") Price;
  
  db: any = null;
  tuning: any = null;
  postcancel: any = null;
  isModified: any = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tuning = this.navParams.data.tuning;
    this.db = this.navParams.data.db;
	this.postcancel = this.navParams.data.postcancel;
  }
  ionViewWillLeave() {
	if (!this.isModified) {
	  this.postcancel();
	}
  }
  submit() {
    this.tuning.PartName = this.PartName.value;
    this.tuning.Name     = this.Name.value;
    this.tuning.Price    = this.Price.value;
    this.db.save();

    this.isModified = true;    
    this.navCtrl.pop();
  }
  cancel() {
	if (this.postcancel != null && this.postcancel != undefined)
	  this.postcancel();
    this.isModified = true;
    this.navCtrl.pop();
  }
}