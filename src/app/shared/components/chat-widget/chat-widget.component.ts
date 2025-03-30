import {
  AfterViewChecked,
  Component,
  DestroyRef,
  ElementRef,
  ViewChild,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faComments, faRobot, faPaperPlane, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule, TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ChatService } from './chat.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [CommonModule, FaIconComponent, TranslateModule, FormsModule],
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss']
})
export class ChatWidgetComponent implements AfterViewChecked {
  @ViewChild('chatInput') chatInputRef!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  faComments = faComments;
  faPaperPlane = faPaperPlane;
  faChevronDown = faChevronDown;
  botIcon = faRobot;

  isOpen = false;
  messageInput = '';
  animationClass = '';
  isBotTyping = false;
  messages: { from: 'user' | 'bot'; text: string }[] = [];

  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);

  constructor(private chatService: ChatService) {
    this.subscribeToWelcomeMessage();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    const el = this.messagesContainer?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }

  toggleChat() {
    if (this.isOpen) {
      this.animationClass = 'chat-out';
      setTimeout(() => {
        this.isOpen = false;
        this.animationClass = '';
      }, 300);
    } else {
      this.isOpen = true;
      this.animationClass = 'chat-in';
      if (this.messages.length === 0) {
        this.addWelcomeMessage();
      }
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
    this.isBotTyping = true;

    this.chatService.sendMessage(safeText).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.messages.push({ from: 'bot', text: res.reply });
        this.isBotTyping = false;
      },
      error: (err) => {
        console.log(err);

        this.messages.push({ from: 'bot', text: err.error.reply ?? '❌ Error al contactar con el asistente.' });
        this.isBotTyping = false;
      }
    });
  }

  private addWelcomeMessage() {
    this.translate.get('chatbot.responses.welcome').pipe(takeUntilDestroyed(this.destroyRef)).subscribe((text) => {
      this.messages.push({ from: 'bot', text });
    });
  }

  private subscribeToWelcomeMessage() {
    this.translate.onLangChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      if (this.messages.length && this.messages[0].from === 'bot') {
        this.translate.get('chatbot.responses.welcome').pipe(takeUntilDestroyed(this.destroyRef)).subscribe((text) => {
          this.messages[0].text = text;
        });
      }
    });
  }
}