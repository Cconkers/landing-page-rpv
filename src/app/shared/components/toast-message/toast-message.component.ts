import { Component, effect, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ToastMessage, ToastMessageService } from '../../services/toast-message-service/toast-message.service';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-toast-message',
    standalone: true,
    imports: [NgClass],
    templateUrl: './toast-message.component.html',
    styleUrl: './toast-message.component.scss'
})
export class ToastMessageComponent {
  messages: ToastMessage[] = [];
  @ViewChildren('toastText') toastTextElements!: QueryList<ElementRef<HTMLParagraphElement>>;
  constructor(private toastMessageService: ToastMessageService) {
    effect(() => {
      this.messages = this.toastMessageService._messages();
    });
  }

  toggleExpand(toast: ToastMessage): void {
    const toastElement = this.getToastElement(toast);
    if (toastElement && this.hasEllipsis(toastElement)) {
      toast.expanded = !toast.expanded;
    } else {
      toast.expanded = false;
    }
  }

  private getToastElement(toast: ToastMessage): HTMLElement | null {
    // Encuentra el elemento <p> correspondiente al toast
    const index = this.messages.indexOf(toast);
    return this.toastTextElements.get(index)?.nativeElement || null;
  }
  private hasEllipsis(element: HTMLElement): boolean {
    return element.scrollWidth > element.clientWidth;
  }
}
