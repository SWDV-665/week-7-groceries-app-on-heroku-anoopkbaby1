import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title="Grocery List";

  items = [];
  errorMessage: string;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceriesServiceProvider, public inputDialogService: InputDialogServiceProvider,
     public SocialSharing: SocialSharing){
     dataService.dataChanged$.subscribe((dataChanged: boolean)=> {
      this.loadItems();
     });
  }

  ionViewDidLoad(){
    this.loadItems();
  }

  loadItems(){
    this.dataService.getItems()
    .subscribe(
      items=> this.items=items,
      error=> this.errorMessage = <any>error);
  }

  shareItem(item, index){
    console.log("Sharing Item -", item, index);
    const toast = this.toastCtrl.create({
      message: 'Sharing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present();

    let message = "Grocery Item - Name: " + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via Groceries app";
    this.SocialSharing.canShareViaEmail().then(() => {
      // Sharing via email is possible
      console.log("Shared successfully")
    }).catch((error) => {
      // Sharing via email is not possible
      console.error("Error while sharing", error);
    });

  }

  editItem(item, index){
    console.log("Edit Item -", item, index);
    console.log(item._id);
    const toast = this.toastCtrl.create({
      message: 'Editing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showPrompt(item,index);
  }


  addItem(item){
    console.log("Adding Item");
    this.inputDialogService.showPrompt();
  }

  removeItem(id){
    console.log(id);
    this.dataService.removeItem(id);
    }

}
