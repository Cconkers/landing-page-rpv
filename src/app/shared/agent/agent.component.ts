import { Component, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../../environments/environment.prod';


@Component({
  selector: 'app-agent',
  template: '',
})
export class AgentComponent {
  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    const script = this.renderer.createElement('script');
    script.type = 'module';
    script.src = 'https://agent.d-id.com/v1/index.js';
    script.setAttribute('data-name', 'did-agent');
    script.setAttribute('data-mode', 'fabio');
    script.setAttribute('data-client-key', environment.dIdClientKey);
    script.setAttribute('data-agent-id', environment.dIdAgentId);
    script.setAttribute('data-monitor', 'true');

    this.renderer.appendChild(this.document.body, script);
  }
}
