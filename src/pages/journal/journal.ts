import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { _JournalPage } from '../_journal/_journal';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html'
})
export class JournalPage {

  public entries = [];
  public staticEntries = [];

  public direction = 'asc';
  public column = 'rating';
  public type = "All";

  public showSearch = false;

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    private socialSharing: SocialSharing,
    private navParams: NavParams
  ) {
      
  }

  addEntry(){
    this.navCtrl.push(_JournalPage);
  }

  editEntry(entry){
    this.navCtrl.push(_JournalPage, {entry: entry});
  }

  ionViewWillEnter() {
    this.initEntries();
    this.direction = 'asc';
    this.column = 'rating';
    this.type = "All";
    
  }

  toggleType() {
    if(this.type == 'All') {
      this.type = 'Recipe';
    } else if(this.type == 'Recipe') {
      this.type = 'Review';
    } else {
      this.type = 'All'
    }
    this.resetEntries();
    if(this.type != 'All') {
      this.entries = this.entries.filter((entry) => {
        if(entry.type.toLowerCase().indexOf(this.type.toLowerCase()) > -1)
          return true;
        else
          return false;        
      })
    }

    
  }


  sort(type) {
    this.column = type;
    // this.type = 'All';
    if(type == 'rating') {
      if(this.direction == 'asc') {
        this.direction = 'desc';
        this.entries.sort(function(a, b) {
            return parseFloat(a.rating) - parseFloat(b.rating);
        });
      } else if (this.direction == 'desc') {
        this.direction = 'asc';
        this.entries.sort(function(a, b) {
            return parseFloat(b.rating) - parseFloat(a.rating);
        });
      }
    }
    else if (type == 'date') {
      if(this.direction == 'asc') {
        this.direction = 'desc';
        this.entries.sort(function(a, b) {
          return parseFloat(a.id) - parseFloat(b.id);
        });
      } else if (this.direction == 'desc') {
        this.direction = 'asc';
        this.entries.sort(function(a, b) {
          return parseFloat(b.id) - parseFloat(a.id);
        });
      }
      }
    }
  
  initEntries() {
    this.storage.ready().then(() => {
      this.storage.get('entries').then((data) => {
        this.entries = data;
        this.entries.reverse();
        this.staticEntries = this.entries;
      })
    });
  }

  resetEntries() {
    this.entries = this.staticEntries;
  }

  searchEntries(e){
    // Reset items back to all of the items
    this.resetEntries();

    // set val to the value of the searchbar
    let val = e.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.entries = this.entries.filter((entry) => {
        if(entry.description != null) {
           if(entry.title.toLowerCase().indexOf(val.toLowerCase()) > -1 || entry.description.toLowerCase().indexOf(val.toLowerCase()) > -1)
              return true;
            else
              return false;    
        } else {
          if(entry.title.toLowerCase().indexOf(val.toLowerCase()) > -1)
            return true;
          else
            return false;
        }
           
      })
    }
  }

  share(message, image){
    this.socialSharing.shareViaFacebook(message, image, null).then(() => {
    }).catch(() => {
    });
  }

  closeKeyboard(){ 
    // this.keyboard.close();
    let activeElement = <HTMLElement>document.activeElement;
    activeElement && activeElement.blur && activeElement.blur();
    console.log('test');
  }

  showSearchBar() {
    if (this.showSearch == false) {
      this.showSearch = true;
    } else {
      this.showSearch =false;
    }
    }
  }