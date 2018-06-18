import { Component } from '@angular/core';
import { NavController , NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { Storage } from '@ionic/storage';
import { ActionSheetController } from 'ionic-angular';



@Component({
  selector: 'page-njournal',
  templateUrl: '_journal.html',
})


export class _JournalPage {

  private entries = [];
  private entry : FormGroup;
  private image = false;
  private _entry = null;

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    private formBuilder: FormBuilder,
    private geolocation: Geolocation,
    private navParams: NavParams,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
  ) {
      this.entry = this.formBuilder.group({
        id: [null],
        title: [null, Validators.required],
        description: [null],
        src:[null],
        type:['review'],
        rating:['1'],
        location_long:[null],
        location_lat:[null],
        date: [Date]
        
      });
  }

  ionViewWillEnter() {
    this._entry = this.navParams.get('entry');

    if(this._entry != null){
      this.entry.get('title').setValue(this._entry.title);
      this.entry.get('description').setValue(this._entry.description);
      this.entry.get('src').setValue(this._entry.src);
      this.entry.get('type').setValue(this._entry.type);
      this.entry.get('rating').setValue(this._entry.rating);
      this.entry.get('location_long').setValue(this._entry.location_long);
      this.entry.get('location_lat').setValue(this._entry.location_lat);
      this.entry.get('date').setValue(this._entry.date);

      if(this._entry.src != null){
        this.image=true;
      }
    }

    this.storage.ready().then(() => {
        this.storage.get('entries').then((data) => {
          this.entries = data;
        });
    });

    
  }

  saveEntry() {
    

    if (this._entry == null){
      // Push new entry into storage     
      if(this.entries.length > 0){

        // var lastEntry = this.entries[this.entries.length-1];
        // var newID = parseInt(lastEntry.id) + 1;
        // this.entry.get('id').setValue(String(newID));

        var largest = 0;
        this.entries.forEach((entry)=>{
          if(entry.id > largest){
            largest = parseInt(entry.id);
          }
        });
        this.entry.get('id').setValue(String(largest+1));

      } else if(this.entries.length == 0) {
        this.entry.get('id').setValue('1');
      }
      this.entries.push(this.entry.value);
      
    } else if(this._entry != null) {
        this.entries.forEach((entry)=>{
          if(entry.id == this._entry.id){
            entry.title=this.entry.value.title;
            entry.description=this.entry.value.description;
            entry.src=this.entry.value.src;
            entry.type=this.entry.value.type;
            entry.rating=this.entry.value.rating;
            entry.location_long=this.entry.value.location_long;
            entry.location_lat=this.entry.value.location_lat;
            entry.date=this.entry.value.date;
          }
        });
    };
    this.storage.ready().then(() => {
      this.storage.set('entries', this.entries);
      this.navCtrl.pop();
    });
  }

  deleteEntry() {
    this.entries.forEach((entry, index)=>{
      if(entry.id == this._entry.id){
        this.entries.splice(index, 1);

        this.storage.ready().then(() => {
          this.storage.set('entries', this.entries);
          this.navCtrl.pop();
        });
      }
    });
  }

  getLoc(){
    this.geolocation.getCurrentPosition().then((loc) => {
      this.entry.get('location_lat').setValue(loc.coords.latitude);
      this.entry.get('location_long').setValue(loc.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  openCamera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(base64Image);

      this.entry.get('src').setValue(base64Image);
      }, (err) => {
      // Handle error
    });
  }

  openPhotoLibrary(){
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(base64Image);

      this.entry.get('src').setValue(base64Image);
      }, (err) => {
      // Handle error
    });
  }

  chooseImage() {
   let actionSheet = this.actionSheetCtrl.create({
    //  title: 'Choose method',
     buttons: [
       {
         text: 'Camera',
         role: 'camera',
         handler: () => {
           this.openCamera();
         }
       },
       {
         text: 'Photo Gallery',
         handler: () => {
           
           this.openPhotoLibrary();
         }
       }
     ]
   });

   actionSheet.present();
 }

  //  change(){
  //   // get elements
  //   var element   = document.getElementById('description');
  //   var textarea  = element.getElementsByTagName('textarea')[0];

  //   // set default style for textarea
  //   // textarea.style.minHeight  = '1';
  //   // textarea.style.height     = '1';

  //   // limit size to 80 pixels (4 lines of text) 20px per line
  //   var scroll_height = textarea.scrollHeight;
  //   if(scroll_height > 80)
  //     scroll_height = 80;

  //   // apply new style
  //   element.style.height      = scroll_height + "px";
  //   textarea.style.minHeight  = scroll_height + "px";
  //   textarea.style.height     = scroll_height + "px";
  // }


}
