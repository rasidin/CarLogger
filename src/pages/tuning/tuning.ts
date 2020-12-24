import { Component, ViewChild } from '@angular/core';
import { App, NavController, NavParams, reorderArray } from 'ionic-angular';

import { AddTuningPage } from '../tuning/addtuning';

@Component({
	selector:'page-tuning',
	templateUrl:'tuning.html',
})
export class TuningPage
{
  @ViewChild("GraphCard") GraphCard;
  @ViewChild("GraphCanvas") GraphCanvas;

  db: any;
  tuninglist: any;
  graphCanvas: any;
  reordername: any = 'SORT';
  reordering: any = false;
  constructor(public appCtrl: App, public navCtrl: NavController, public navParams: NavParams) {
    this.db = this.navParams.data.db;
    this.tuninglist = this.navParams.data.tuninglist;
  }
  ionViewDidLoad() {
    this.graphCanvas = this.GraphCanvas.nativeElement;
	this.graphCanvas.height = 20;

    this.drawProgress();
  }
  toggleReorder() {
    this.reordering = !this.reordering;
    if (this.reordering)
      this.reordername = 'OK';
    else
      this.reordername = 'SORT';
    if (this.reordering == false) {
      this.db.save();
    }
  }
  reorderData(indexes) {
    this.tuninglist = reorderArray(this.tuninglist, indexes);
    this.db.save();
  }
  checkTuning(item) {
    if (item == undefined || item == null) return;
    if (item.Equip == undefined || item.Equip == null) 
      item.Equip = false;
    item.Equip = !item.Equip;
    this.db.save();
    
    this.drawProgress();
  }
  drawProgress() {
    var ctx = this.graphCanvas.getContext('2d');
  	this.graphCanvas.width = this.GraphCard.nativeElement.clientWidth;
  	this.graphCanvas.height = 30;
	
    var width = this.graphCanvas.width;
	
	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, width, 10);
	
	var totalPrice = 0;
	var buyedPrice = 0;
	for(var tunidx=0;tunidx<this.tuninglist.length;tunidx++) {
      if (this.tuninglist[tunidx] == undefined || this.tuninglist[tunidx] == null) continue;
      totalPrice += parseInt(this.tuninglist[tunidx].Price);
      if (this.tuninglist[tunidx] != undefined && this.tuninglist[tunidx] != null && this.tuninglist[tunidx].Equip != undefined && this.tuninglist[tunidx].Equip != null)
      if (this.tuninglist[tunidx].Equip) {
        buyedPrice += parseInt(this.tuninglist[tunidx].Price);
      }
	}

	if (totalPrice) {
	  var graphWidth = width * buyedPrice / totalPrice;
	  ctx.fillStyle = '#00ff00';
	  ctx.fillRect(0, 0, graphWidth, 10);
	}
  }
  addTuning() {
    var newTuning = {
      "Equip": false,
      "PartName": "",
      "Name": "",
	  "Price": 0
	};
	this.tuninglist.push(newTuning);
	this.appCtrl.getRootNav().push(AddTuningPage, {db: this.db, tuning: newTuning, postcancel: ()=>{ this.tuninglist.splice(this.tuninglist.indexOf(newTuning), 1); }});
  }
  modifyTuning(item) {
    this.appCtrl.getRootNav().push(AddTuningPage, {db: this.db, tuning: item});
  }
  removeTuning(item) {
    var indexOfItem = this.tuninglist.indexOf(item);
	if (indexOfItem >= 0) {
      this.tuninglist.splice(indexOfItem, 1);
      this.db.save();
	}
  }
}