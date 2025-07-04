const ctxs = ['layer1','layer2','layer3'].map(id => {
  const c = document.getElementById(id);
  c.width = innerWidth; c.height = innerHeight;
  return c.getContext('2d');
});

let mouse = { x:innerWidth/2, y:innerHeight/2 };
const layers = [
  { ctx:ctxs[0], r:400, col:'rgba(255,69,0,', a:0.06, pos:{...mouse}, speed:0.03 },
  { ctx:ctxs[1], r:250, col:'rgba(255,20,147,', a:0.1, pos:{...mouse}, speed:0.05 },
  { ctx:ctxs[2], r:120, col:'rgba(255,215,0,', a:0.2, pos:{...mouse}, speed:0.08 }
];

function resize(){
  ctxs.forEach(c => {
    c.canvas.width = innerWidth;
    c.canvas.height = innerHeight;
  });
}
window.addEventListener('resize', resize);

document.addEventListener('mousemove', e=>{
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  layers.forEach(l=> gsap.to(l.pos, {
    x: mouse.x, y: mouse.y,
    duration: 0.5,
    ease: 'power2.out'
  }));
});

function draw(){
  ctxs.forEach(c => c.clearRect(0, 0, innerWidth, innerHeight));

  layers.forEach(l => {
    l.pos.x += (mouse.x - l.pos.x) * l.speed;
    l.pos.y += (mouse.y - l.pos.y) * l.speed;

    const { ctx, r, col, a, pos } = l;
    const g = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, r);
    g.addColorStop(0, `${col}${a})`);
    g.addColorStop(0.6, `${col}${a * 0.4})`);
    g.addColorStop(1, `${col}0)`);

    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(draw);
}
draw();