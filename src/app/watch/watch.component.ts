import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent {
  private static readonly URL_REGEX = /youtube\.com\/watch\?v=([^&]+)/;
  video: SafeResourceUrl;
  form = this.formBuilder.group({
    url: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private sanitizer: DomSanitizer) { }

  onSubmit(): void {
    if (this.form.valid) {
      const match = this.form.value.url.match(WatchComponent.URL_REGEX);
      if (match) {
        const videoUrl = `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
        this.video = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
      }
    }
  }
}
