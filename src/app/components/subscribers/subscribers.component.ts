import { Component, OnInit } from '@angular/core';
import { SubscribersService } from 'src/app/services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {

  subscribersData: Array<object> = []

  constructor(private subService: SubscribersService){}

  ngOnInit(): void {
    this.subService.getSubscribersData().subscribe(val => {
      this.subscribersData = val
    })
  }

  deleteSubscriber(subscriberId: string){
    this.subService.deleteSelectedSubscriber(subscriberId)
  }

}
