import { TabsPage } from '../tabs/tabs';
import { Injectable,Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';




@Component({
    templateUrl: 'login.html'
})

@Injectable()  
export class LoginPage {
    //signalR connection reference
    private connection: SignalR;

    //signalR proxy reference
    private proxy: SignalR.Hub.Proxy;
    loginForm: FormGroup;
    username: any;
    password: any;
    constructor(public navCtrl: NavController, private formBuilder: FormBuilder) {
        this.loginForm = formBuilder.group({
            username: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        })
        this.username = this.loginForm.controls['username'];
        this.password = this.loginForm.controls['password'];
        //initialize connection
        $.connection.hub.url = "http://localhost/webrtc/signalr";
        this.connection = $.connection;

        //to create proxy give your hub class name as parameter. IMPORTANT: notice that I followed camel casing in giving class name
        this.proxy = $.connection.hub.createHubProxy('userHub');

        //define a callback method for proxy
        this.proxy.on('messageReceived', (latestMsg) => this.onMessageReceived(latestMsg));

        this.connection.hub.start();

    }

    private onMessageReceived(latestMsg: string) {
        console.log('New message received: ' + latestMsg);
    }

    //method for sending message
    broadcastMessage(msg: string) {
        //invoke method by its name using proxy 
        this.proxy.invoke('sendMessage', msg);
    }

    login(value) {
        this.navCtrl.push(TabsPage);

    }

}

