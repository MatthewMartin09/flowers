export default function createFlower(cx, cy) {
  const points = [];

  const petals = 8;

  for (let p = 0; p < petals; p++) {
    const petalAngle = (Math.PI * 2 * p) / petals;

    for (let i = 0; i < 450; i++) {
      const r = Math.random() * 45;

      const a =
        petalAngle +
        (Math.random() - 0.5) * 0.7;

      points.push({
        x: cx + Math.cos(a) * r,
        y: cy + Math.sin(a) * r,
        color: "#b47cff",
      });
    }
  }

  // flower center
  for (let i = 0; i < 900; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.random() * 18;

    points.push({
      x: cx + Math.cos(a) * r,
      y: cy + Math.sin(a) * r,
      color: "#ffe066",
    });
  }

  // stem
  for (let y = cy; y < cy + 220; y += 2) {
    for (let i = 0; i < 5; i++) {
      points.push({
        x: cx + (Math.random() - .5) * 6,
        y,
        color: "#5fd35f",
      });
    }
  }

  return points;
}