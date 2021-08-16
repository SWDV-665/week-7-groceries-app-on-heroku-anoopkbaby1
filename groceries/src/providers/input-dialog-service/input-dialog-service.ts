import { Placeholder } from "@angular/compiler/src/i18n/i18n_ast";
import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";
import { GroceriesServiceProvider } from "../groceries-service/groceries-service";

@Injectable()

export class InputDialogServiceProvider{
    constructor(public alertCtrl:AlertController, public dataService: GroceriesServiceProvider){
        console.log('Hello InputDialogServiceProvider Provider');
    }

    showPrompt(item?, index?){
        const prompt = this.alertCtrl.create({
            title: item ? 'Edit Item' : 'Add Item',
            message: item ? "Please edit item...": "Please enter item",
            inputs: [
                {
                name:'name',
                placeholder: 'Name',
                value: item ? item.name : null
                },
                {
                name:'quantity',
                placeholder:'Quantity',
                value: item ? item.quantity:null
                },

            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: data=>{
                        console.log("Save Handler", data);
                        if(index!==undefined){
                            item.name=data.name;
                            item.quantity=data.quantity;
                            this.dataService.editItem(item,index);

                        }
                        else{
                            this.dataService.addItem(data);
                        }
                    }
                }
            ]

        });

        prompt.present();
    }
}