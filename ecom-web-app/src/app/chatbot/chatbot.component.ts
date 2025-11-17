import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  messages: { text: string, isUser: boolean }[] = [];
  newMessage: string = '';
  chatServiceUrl = 'http://localhost:8089'; // URL of your chat service
  selectedFile: File | null = null;

  constructor(private http: HttpClient) { }

  sendMessage() {
    if (this.newMessage.trim() || this.selectedFile) {
      const userMessage = this.newMessage;
      if (userMessage.trim()) {
        this.messages.push({ text: userMessage, isUser: true });
      }
      this.newMessage = '';

      const formData = new FormData();
      formData.append('question', userMessage);

      if (this.selectedFile) {
        let questionToSend = userMessage.trim();
        if (!questionToSend) {
          questionToSend = "What is this document about?"; // Default question if user doesn't provide one
        }
        formData.append('question', questionToSend);
        formData.append('file', this.selectedFile);
        this.http.post(`${this.chatServiceUrl}/chat/ask`, formData, { responseType: 'text' })
          .subscribe(response => {
            this.messages.push({ text: response, isUser: false });
            this.clearFileSelection(); // Clear file after successful upload
          }, error => {
            console.error('Error sending message with file:', error);
            this.messages.push({ text: 'Sorry, something went wrong while processing your file.', isUser: false });
            this.clearFileSelection();
          });
      } else {
        const formData = new FormData();
        formData.append('question', userMessage);
        this.http.post(`${this.chatServiceUrl}/chat/direct-ask`, formData, { responseType: 'text' })
          .subscribe(response => {
            this.messages.push({ text: response, isUser: false });
          }, error => {
            console.error('Error sending message:', error);
            this.messages.push({ text: 'Sorry, something went wrong.', isUser: false });
          });
      }
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // The actual upload will happen when sendMessage is called, if a file is selected
    }
  }

  clearFileSelection() {
    this.selectedFile = null;
    // Optionally, clear the file input element as well
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}
