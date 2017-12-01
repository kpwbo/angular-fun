import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ChatService } from './chat.service';

interface Bubble {
  message: string;
  type: string;
}

class UserBubble implements Bubble {
  type = 'user';
  constructor(public message: string) { }
}

class BotBubble implements Bubble {
  type = 'bot';
  constructor(public message: string) { }
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewChecked {
  bubbles: Bubble[] = [];
  form = this.formBuilder.group({
    input: ['', Validators.required]
  });
  @ViewChild('list') private list: ElementRef;

  constructor(private formBuilder: FormBuilder, private chatService: ChatService) { }

  onSubmit(): void {
    if (this.form.valid) {
      const input = this.form.value.input;
      this.addUserBubble(input);
      this.chatService.getReply(input).subscribe((reply: string) => {
        this.addBotBubble(reply);
      });
      this.form.reset();
    }
  }

  private addUserBubble(text: string): void {
    this.bubbles.push(new UserBubble(text));
  }

  private addBotBubble(text: string): void {
    this.bubbles.push(new BotBubble(text));
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    const el = (this.list.nativeElement as HTMLUListElement);
    el.scrollTop = el.scrollHeight - el.clientHeight;
  }
}
