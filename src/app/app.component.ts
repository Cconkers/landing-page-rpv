import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { AgentComponent } from './shared/agent/agent.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, TranslateModule, NavbarComponent, AgentComponent],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


}
