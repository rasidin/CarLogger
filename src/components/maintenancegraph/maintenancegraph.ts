import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'maintenancegraph',
  template: '<canvas #MainCanvas></canvas>'
})
export class MaintenanceGraphComponent {
  @Input('data') data;
  @ViewChild('MainCanvas') MainCanvas;
  
  GraphLineWidth: any = 10;
  
  maincanvas: any;
  constructor() {
  }
  ngOnInit() {
	this.maincanvas = this.MainCanvas.nativeElement;
	this.drawGraph(this.data);
  }
  public drawGraph(data) {
	if (this.maincanvas == null || this.maincanvas == undefined || data == null || data == undefined || data.length == 0)
	  return;

	console.log(data);

	var ctx = this.maincanvas.getContext('2d');
	var width = this.maincanvas.width;
	var height = this.maincanvas.height;

	ctx.clearRect(0, 0, width, height);
	ctx.moveTo(this.GraphLineWidth, 0);
	ctx.lineTo(this.GraphLineWidth, height);
	ctx.moveTo(0, height - this.GraphLineWidth);
	ctx.lineTo(width, height - this.GraphLineWidth);
	
	var gpidx = 0;
	var maxValue = 0;
	for (gpidx=0;gpidx<data.length;gpidx++) {
	  maxValue = Math.max(maxValue, data[gpidx]);
	}
	
	var graphPointPerPixel = (width - this.GraphLineWidth) / data.length;
       	for (gpidx=0;gpidx<data.length;gpidx++) {
	  var graphX = this.GraphLineWidth + gpidx * graphPointPerPixel;
	  var graphY = (height - this.GraphLineWidth) * (maxValue - data[gpidx]) / maxValue;
//	  console.log(graphX + " / " + graphY);
	  if (gpidx == 0)
		ctx.moveTo(graphX, graphY);
	  else {
		ctx.lineTo(graphX, graphY);
	  }
	}
	ctx.stroke();
  }
}