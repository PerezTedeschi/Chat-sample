import { Component, OnInit } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { IncomingMessage } from 'http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public name: string;
  public message: Imessage = {
    date: '',
    text: '',
    name: ''
  };

  public messages: Imessage[] = [];
  public connection: HubConnection;

  ngOnInit() {    
    let hubRoute = "/echo";
    var options = {};

    this.connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.None)
      .withUrl(hubRoute, options)
      .build();    
    this.connection.on("Send", (msg) => {
      this.messages.push(msg);
    });
    this.connection.start()
      .then(() => { console.log("Connection started") })
      .catch(err => { console.log(err)});
  }

  echo() {
    this.connection.invoke("Echo", this.message);
    this.message.text = '';
  }
}

interface Imessage {
  date: string;
  text: string;  
  name: string;
}
