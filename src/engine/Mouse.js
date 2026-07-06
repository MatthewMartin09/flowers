export default class Mouse {
  constructor(canvas) {
    this.x = -9999;
    this.y = -9999;
    this.radius = 120;

    canvas.addEventListener("mousemove", this.move.bind(this));
    canvas.addEventListener("mouseleave", this.leave.bind(this));
  }

  move(e) {
    const rect = e.target.getBoundingClientRect();

    this.x = e.clientX - rect.left;
    this.y = e.clientY - rect.top;
  }

  leave() {
    this.x = -9999;
    this.y = -9999;
  }
}