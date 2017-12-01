import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

interface MousePosition {
  x: number;
  y: number;
}

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements AfterViewInit {
  @ViewChild('canvas') private canvas: ElementRef;
  private context: CanvasRenderingContext2D;
  private drawing = false;

  ngAfterViewInit(): void {
    const canv = this.canvas.nativeElement as HTMLCanvasElement;
    this.context = canv.getContext('2d');
    this.context.fillStyle = 'white';
    this.context.strokeStyle = 'black';
    this.clear();
  }

  onMouseDown(event: MouseEvent): void {
    if (!this.drawing && event.button === 0) {
      const pos = this.getMousePosition(event);
      this.context.beginPath();
      this.context.moveTo(pos.x, pos.y);
      this.drawing = true;
    }
  }

  onMouseMove(event: MouseEvent): void {
    if (this.drawing) {
      const pos = this.getMousePosition(event);
      this.context.lineTo(pos.x, pos.y);
      this.context.stroke();
    }
  }

  onMouseUp(event: MouseEvent): void {
    if (this.drawing && event.button === 0) {
      const pos = this.getMousePosition(event);
      this.context.stroke();
      this.context.closePath();
      this.drawing = false;
    }
  }

  onMouseLeave(event: MouseEvent): void {
    if (this.drawing) {
      this.context.closePath();
      this.drawing = false;
    }
  }

  clear(): void {
    const canv = this.canvas.nativeElement as HTMLCanvasElement;
    this.context.fillRect(0, 0, canv.width, canv.height);
  }

  private getMousePosition(event: MouseEvent): MousePosition {
    const rect = (this.canvas.nativeElement as HTMLCanvasElement).getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }
}
