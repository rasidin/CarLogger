import { Component, ViewChild } from '@angular/core';
import { Content, NavController, NavParams } from 'ionic-angular';

@Component({
	selector:'page-addcheckitem',
	templateUrl:'addcheckitem.html',
})
export class AddCheckItemPage
{
  @ViewChild("Name") Name;
  @ViewChild("Repeat") Repeat;
  @ViewChild("NextDate") NextDate;
  
  db: any = null;
  item: any = null;
  postcancel: any = null;
  isModified: any = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.data.item;
    this.db = this.navParams.data.db;
	this.postcancel = this.navParams.data.postcancel;
  }
  ionViewWillLeave() {
	if (!this.isModified) {
	  this.postcancel();
	}
  }
  submit() {
    this.item.Name     = this.Name.value;
    this.item.Repeat   = this.Repeat.value;
	this.item.NextDate = this.NextDate._text;
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