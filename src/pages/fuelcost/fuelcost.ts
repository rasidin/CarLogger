import { Component, ViewChild } from '@angular/core';
import { App, Content, NavController, NavParams } from 'ionic-angular';

import { AddFuelCostPage } from '../fuelcost/addfuelcost';

@Component({
	selector:'page-fuelcost',
	templateUrl:'fuelcost.html',
})
export class FuelCostPage
{
  @ViewChild("GraphCard") GraphCard;
  @ViewChild("GraphCanvas") GraphCanvas;

  db: any;
  fuelcosts: any;
  graphCanvas: any;
  constructor(public appCtrl: App, public navCtrl: NavController, public navParams: NavParams) {
    this.db = this.navParams.data.db;
    this.fuelcosts = this.navParams.data.fuelcosts;
	
	for(var fcidx=0;fcidx<this.fuelcosts.length;fcidx++) {
	  if (this.fuelcosts[fcidx].Date == undefined || this.fuelcosts[fcidx].Date == null || this.fuelcosts[fcidx].Date == '') {
		this.fuelcosts.splice(fcidx, 1);
	  }
	}
	
	this.fuelcosts.sort((a,b)=>{if (parseInt(a.Date.replace('-','')) < parseInt(b.Date.replace('-',''))) return 1; else return -1;});
  }
  ionViewDidLoad() {
    this.graphCanvas = this.GraphCanvas.nativeElement;

    this.drawGraph();
  }
  drawGraph() {
    var ctx = this.graphCanvas.getContext('2d');
	this.graphCanvas.width = this.GraphCard.nativeElement.clientWidth;
	this.graphCanvas.height = 100;
	
    var width = this.graphCanvas.width;
    var height = this.graphCanvas.height;
	  
  }
  addFuelCost() {
    var newItem = {
      "Date": "",
	  "Cost": 0
	};
	this.fuelcosts.push(newItem);
    this.appCtrl.getRootNav().push(AddFuelCostPage, {db: this.db, item: newItem, postcancel: ()=>{ this.fuelcosts.splice(this.fuelcosts.indexOf(newItem), 1); }});
  }
  removeFuelCost(item) {
    var indexOfFuelCost = this.fuelcosts.indexOf(item);
	if (indexOfFuelCost >= 0) {
      this.fuelcosts.splice(indexOfFuelCost, 1);
	  this.db.save();
	}
  }
  modifyFuelCost(item) {
    this.appCtrl.getRootNav().push(AddFuelCostPage, {db: this.db, item: item});
  }
}