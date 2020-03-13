import { Component, ViewChild } from '@angular/core';
import { Content, NavController, NavParams } from 'ionic-angular';

@Component({
	selector:'page-addmaintenance',
	templateUrl:'addmaintenance.html',
})
export class AddMaintenancePage
{
  @ViewChild("Name") Name;
  @ViewChild("Repeat") Repeat;
  @ViewChild("NextDate") NextDate;
  @ViewChild("Price") Price;
  @ViewChild("Wage") Wage;
  @ViewChild("Maker") Maker;
  @ViewChild("ProductName") ProductName;
  @ViewChild("ProductCode") ProductCode;
  
  db: any = null;
  maintenance: any = null;
  postok: any = null;
  postcancel: any = null;
  isModified: any = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.maintenance = this.navParams.data.maintenance;
    this.db = this.navParams.data.db;
	this.postok = this.navParams.data.postok;
	this.postcancel = this.navParams.data.postcancel;
  }
  ionViewDidLoad() {
    this.NextDate._text = this.maintenance.NextDate;
	this.Repeat.value = this.maintenance.Repeat;
  }
  ionViewWillLeave() {
	if (!this.isModified && this.postcancel != null) {
	  this.postcancel();
	}
  }
  submit() {
    this.maintenance.Name     		= this.Name.value;
    this.maintenance.Repeat   		= this.Repeat.value;
    this.maintenance.NextDate 		= this.NextDate._text;
	this.maintenance.Maker 			= this.Maker.value;
	this.maintenance.ProductName 	= this.ProductName.value;
	this.maintenance.ProductCode 	= this.ProductCode.value;
    this.maintenance.Price    		= this.Price.value;
	this.maintenance.Wage			= this.Wage.value;
    this.db.save();

    if (this.postok != null && this.postok != undefined) {
	  this.postok();
	}
	
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