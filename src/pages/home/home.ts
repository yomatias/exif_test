import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as exif from 'exif-js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  image: any;

  constructor(public navCtrl: NavController) {
    
  }

  clicked(e) {
    console.log('clicked');
    exif.getData(e.target, function() {
      console.log(e.target);
      var allMetaData = exif.getAllTags(this);
      console.log(allMetaData.Orientation);
  });
  }

}
