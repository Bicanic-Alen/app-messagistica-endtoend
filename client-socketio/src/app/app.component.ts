import { Component } from '@angular/core';
import { SocketService } from './socket.service';
import { CesarService } from './cesar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messageList:  string[] = [];
  key : number;

  constructor(private socketService: SocketService, private cesarService: CesarService) {
  }

   sendMessage(message: HTMLInputElement, k: HTMLInputElement) {
    let encoded = this.cesarService.encode(message.value, k.valueAsNumber);
    this.key = k.valueAsNumber;
    this.socketService.sendMessage(encoded);
    //console.log("sent: " + message.value)
    message.value="";
  }
  ngOnInit() {
    this.socketService.getMessage()
      .subscribe((message: string) => {
        this.messageList.push("messaggio criptato: "+message+" messaggio decriptato: "+ this.cesarService.decode(message, this.key));
        console.log("messagereceived: " + message)
      });
  }
}
