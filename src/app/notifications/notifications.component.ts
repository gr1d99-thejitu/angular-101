import { Component } from '@angular/core';
import {NotificationsService} from "../../services/notifications.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  constructor(public notificationsService: NotificationsService) {
  }
}
