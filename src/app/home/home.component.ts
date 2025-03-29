import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { fadeIn, fadeUp, fadeLeft, zoomIn } from '../shared/animations/animations';
import { AnimateOnScrollDirective } from '../shared/directives/animated-on-scroll.directive';
import { AnimateOnScrollAutoDirective } from '../shared/directives/animated-on-scroll-auto.directive';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faRobot,
  faWrench,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';
import { ChatWidgetComponent } from '../shared/components/chat-widget/chat-widget.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, AnimateOnScrollDirective, AnimateOnScrollAutoDirective, FontAwesomeModule, ChatWidgetComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [fadeIn, fadeUp, fadeLeft, zoomIn]
})

export class HomeComponent {
  faRobot = faRobot;
  faWrench = faWrench;
  faChartLine = faChartLine;
  public currentYear: number = new Date().getFullYear();

}
