import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { File } from '@ionic-native/file/ngx';

@Component({
	selector:'page-addcar',
	templateUrl:'addcar.html',
	providers: [File]
})
export class AddCarPage
{
	@ViewChild("Name") Name;
	@ViewChild("Code") Code;
	@ViewChild("Image") Image;
	
	db: any = null;
	car: any = null;
	
	isNew: any = true;
	constructor(public navCtrl: NavController, public navParams: NavParams, private file: File) {
		this.car = this.navParams.data.car;
		this.db = this.navParams.data.db;
	}
	exportCarData() {
		console.log(this.file.dataDirectory);
		// console.log('file out : ' + this.file.dataDirectory + '/' + this.car.Name + '.json');
		// console.log(JSON.stringify(this.car));
		// this.file.writeFile('', this.car.Name + '.json', JSON.stringify(this.car));
		// this.file.writeFile('', this.car.Name + '.json', 'test');
	}
	submit() {
		this.car.Name = this.Name.value;
		this.car.Code = this.Code.value;
		this.car.Image = this.Image.value;

		this.db.save();
		this.navCtrl.pop();
	}
}