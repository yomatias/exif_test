import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as exif from 'exif-js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  image: any;
  imageConverted: string = 'asdf';

  constructor(public navCtrl: NavController) {
    
  }

  clicked(e) {
    exif.getData(e.target, () => {
      let allMetaData = exif.getAllTags(e.target);

      let MAX_WIDTH = 500;
      let MAX_HEIGHT = 500;
      let width = e.target.width;
      let height = e.target.height;
      let canvas = document.createElement('canvas');

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext('2d');

      switch(allMetaData.Orientation){
        case 8:
          // 90° rotate left
          ctx.rotate(-0.5 * Math.PI);
          ctx.translate(-width, 0);
        break;
        case 3:
          // 180° rotate left
          ctx.translate(width, height);
          ctx.rotate(Math.PI);
          break;
        case 6:
          // 90° rotate right
        ctx.rotate(0.5 * Math.PI);
        ctx.translate(0, -height);
            break;
     }

    ctx.drawImage(e.target, 0, 0, width, height);
    
    this.imageConverted = canvas.toDataURL('image/jpeg', 80);

  });
  }

}
