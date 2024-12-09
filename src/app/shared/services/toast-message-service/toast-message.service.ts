import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  id?: number;
  duration?: number; // en milisegundos
  expanded?: boolean;
  removing?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {

  constructor() { }
  _messages = signal<ToastMessage[]>([]);

  showToast(toast: ToastMessage): void {
    const currentMessages = this._messages();
    const newToast = { ...toast, removing: false, id: Math.random() };
    this._messages.update(() => [...currentMessages, newToast]);

    // Elimina automáticamente el mensaje después de `duration` (por defecto 3000ms)
    setTimeout(() => this.initiateRemoveToast(newToast), newToast.duration || 3000);
  }

  private initiateRemoveToast(toast: ToastMessage): void {
    // Marca el toast como "removing" para aplicar la animación de fade-out
    const currentMessages = this._messages();
    const updatedMessages = currentMessages.map((message) =>
      // Si el mensaje es el actual, marca su estado como "removing"
      message === toast ? { ...message, removing: true } : message
    );

    this._messages.update(() => updatedMessages);

    // Espera a que termine la animación antes de eliminar el mensaje
    setTimeout(() => this.finalizeRemoveToast(toast), 400); // Debe coincidir con el tiempo de la animación CSS
  }

  private finalizeRemoveToast(toast: ToastMessage): void {
    const currentMessages = this._messages();


    this._messages.update(() => currentMessages.filter((message) => message.id !== toast.id));
  }
}
