import { AfterViewChecked, AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faComments, faRobot, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [CommonModule, FaIconComponent, TranslateModule, FormsModule],
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss']
})
export class ChatWidgetComponent implements AfterViewInit, AfterViewChecked {
  @ViewChild('chatInput') chatInputRef!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  faComments = faComments;
  botIcon = faRobot
  faPaperPlane = faPaperPlane;


  isOpen = false;
  messageInput = '';
  isBotTyping = false;

  messages: { from: string, text: string }[] = [];

  constructor(private translate: TranslateService) { }

  ngAfterViewInit(): void {
    this.simulateBotResponse();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.messagesContainer) {
      const el = this.messagesContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
  }
  toggleChat() {
    this.isOpen = !this.isOpen;
    // Esperamos al siguiente ciclo de renderizado para enfocar
    if (this.isOpen) {
      setTimeout(() => {
        this.chatInputRef?.nativeElement?.focus();
      }, 0);
    }
  }

  sendMessage(rawText: string) {
    const text = rawText.trim();
    if (!text || text.length > 1000) return;

    const safeText = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    this.messages.push({ from: 'user', text: safeText });
    this.messageInput = '';

    this.simulateBotResponse();
  }

  simulateBotResponse() {
    this.isBotTyping = true;
    // Muestra un mensaje de espera
    this.messages.push({ from: 'bot', text: '__typing__' });

    setTimeout(() => {
      // Reemplazamos el último mensaje por uno real
      this.messages = this.messages.filter(msg => msg.text !== '__typing__');

      this.translate.get('chatbot.responses.welcome').subscribe((msg) => {
        this.isBotTyping = false;
        this.messages.push({ from: 'bot', text: msg });
      });
    }, 1500);
  }
}
