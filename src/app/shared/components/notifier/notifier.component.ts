import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.css']
})
export class NotifierComponent implements OnInit {

  constructor() { }

  @Input() message: Message;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message'] && this.message && this.message.text) {
      window.setTimeout(() => this.message.text = '', 3000);
    }
  }

}
