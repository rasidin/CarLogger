import { Component, ViewChild } from '@angular/core';
import { Content, NavController, NavParams } from 'ionic-angular';

@Component({
	selector:'page-addcar',
	templateUrl:'addcar.html',
})
export class AddCarPage
{
	@ViewChild("Name") Name;
	@ViewChild("Code") Code;
	@ViewChild("Image") Image;
	
	db: any = null;
	car: any = null;
	
	isNew: any = true;
	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.car = this.navParams.data.car;
		this.db = this.navParams.data.db;
	}
	submit() {
		this.car.Name = this.Name.value;
		this.car.Code = this.Code.value;
		this.car.Image = this.Image.value;

		this.db.save();
		this.navCtrl.pop();
	}
}