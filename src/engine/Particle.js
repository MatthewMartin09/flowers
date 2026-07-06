export default class Particle {
  constructor(x, y, tx, ty, color) {
    this.x = x;
    this.y = y;

    this.tx = tx;
    this.ty = ty;

    this.vx = 0;
    this.vy = 0;

    this.size = Math.random() * 2 + 1;
    this.color = color;

    this.friction = 0.90;
    this.ease = 0.08;
  }

  update(mouse) {
    const dx = this.tx - this.x;
    const dy = this.ty - this.y;

    this.vx += dx * this.ease;
    this.vy += dy * this.ease;

    if (mouse) {
      const mx = this.x - mouse.x;
      const my = this.y - mouse.y;

      const dist = Math.sqrt(mx * mx + my * my);

      if (dist < mouse.radius) {
        const angle = Math.atan2(my, mx);
        const force = (mouse.radius - dist) / mouse.radius;

        this.vx += Math.cos(angle) * force * 8;
        this.vy += Math.sin(angle) * force * 8;
      }
    }

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx) {
    ctx.beginPath();

    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 12;

    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

    ctx.fill();
  }
}