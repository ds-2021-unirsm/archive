class MetaBall {
  constructor(pos, vel, radius) {
    this.pos = new p5.Vector(
      random(100, width - 100),
      random(100, height - 100)
    );

    const size = Math.pow(Math.random(), 2);
    this.radius = 100 * size + 30;
    this.vel = p5.Vector.random2D().mult(0.1 * (1 - size) + 1);
  }

  update() {
    //per spostare i cerchi aggiungo alla posizione la velocità
    this.pos.add(this.vel);
    //attraverso questi due if non permettiamo al cerchio di uscire dalla canvas
    if (this.pos.x < this.radius || this.pos.x > width - this.radius)
      this.vel.x *= -1;
    if (this.pos.y < this.radius || this.pos.y > height - this.radius)
      this.vel.y *= -1;

    stroke(255, 100);
    circle(this.pos.x, this.pos.y, 2 * this.radius);
  }
}

class Scape {
  constructor(res, metaballs) {
    this.res = res;
    this.metaballs = metaballs;

    this.grid = [];

    for (let i = 0; i < width / res + 1; i++) {
      this.grid.push(Array(int(height / res + 1)).fill(0));
    }
  }

  update() {
    stroke(255);

    for (let x = 0; x < this.grid.length; x++) {
      for (let y = 0; y < this.grid[x].length; y++) {
        //sum serve per creare il perimetro attorno alle balls
        this.grid[x][y] = sum(this.metaballs.map((b) => 
            Math.pow(b.radius, 2) / (Math.pow(b.pos.x - x * this.res, 2) + Math.pow(b.pos.y - y * this.res, 2))
          ) //The pow() function is an efficient way of multiplying numbers by themselves
        );
      }
    }

    for (let x = 0; x < this.grid.length - 1; x++) {
      for (let y = 0; y < this.grid[x].length - 1; y++) {
        const around = [
            Math.sign(Math.floor(this.grid[x][y])),
            Math.sign(Math.floor(this.grid[x + 1][y])),
            Math.sign(Math.floor(this.grid[x][y + 1])),
            Math.sign(Math.floor(this.grid[x + 1][y + 1])),
          ], //The Math.sign() function returns either a positive or negative +/- 1, indicating the sign of a number passed into the argument.
          s = sum(around);

        if (
          s === 0 || s === 4 || (around[0] && around[3] && !around[1] && !around[2]) || (!around[0] && !around[3] && around[1] && around[2])) continue;

        let x1, x2, y1, y2;
        if (
          (around[0] && around[1] && !around[2] && !around[3]) ||
          (!around[0] && !around[1] && around[2] && around[3])
        ) {
          // 3/12
          x1 = x * this.res;
          x2 =
            y * this.res +
            this.res *
              ((1 - this.grid[x][y]) / (this.grid[x][y + 1] - this.grid[x][y]));
          y1 = x * this.res + this.res;
          y2 =
            y * this.res +
            this.res *
              ((1 - this.grid[x + 1][y]) /
                (this.grid[x + 1][y + 1] - this.grid[x + 1][y]));
        } else if (
          (around[0] && around[2] && !around[1] && !around[3]) ||
          (!around[0] && !around[2] && around[1] && around[3])
        ) {
          // 6/9
          x1 =
            x * this.res +
            this.res *
              ((1 - this.grid[x][y]) / (this.grid[x + 1][y] - this.grid[x][y]));
          x2 = y * this.res;
          y1 =
            x * this.res +
            this.res *
              ((1 - this.grid[x][y + 1]) /
                (this.grid[x + 1][y + 1] - this.grid[x][y + 1]));
          y2 = y * this.res + this.res;
        } else if (
          (around[3] && !around[0] && !around[1] && !around[2]) ||
          (!around[3] && around[0] && around[1] && around[2])
        ) {
          // 2/13
          x1 = (x + 1) * this.res;
          x2 =
            y * this.res +
            ((y + 1) * this.res - y * this.res) *
              ((1 - this.grid[x + 1][y]) /
                (this.grid[x + 1][y + 1] - this.grid[x + 1][y]));
          y1 =
            x * this.res +
            ((x + 1) * this.res - x * this.res) *
              ((1 - this.grid[x][y + 1]) /
                (this.grid[x + 1][y + 1] - this.grid[x][y + 1]));
          y2 = y * this.res + this.res;
        } else if (
          (around[0] && !around[1] && !around[2] && !around[3]) ||
          (!around[0] && around[1] && around[2] && around[3])
        ) {
          // 7/8
          x1 =
            x * this.res +
            this.res *
              ((1 - this.grid[x][y]) / (this.grid[x + 1][y] - this.grid[x][y]));
          x2 = y * this.res;
          y1 = x * this.res;
          y2 =
            y * this.res +
            this.res *
              ((1 - this.grid[x][y]) / (this.grid[x][y + 1] - this.grid[x][y]));
        } else if (
          (around[1] && !around[0] && !around[2] && !around[3]) ||
          (!around[1] && around[0] && around[2] && around[3])
        ) {
          // 4/11
          x1 =
            x * this.res +
            this.res *
              ((1 - this.grid[x][y]) / (this.grid[x + 1][y] - this.grid[x][y]));
          x2 = y * this.res;
          y1 = x * this.res + this.res;
          y2 =
            y * this.res +
            this.res *
              ((1 - this.grid[x + 1][y]) /
                (this.grid[x + 1][y + 1] - this.grid[x + 1][y]));
        } else if (
          (around[2] && !around[0] && !around[1] && !around[3]) ||
          (!around[2] && around[0] && around[1] && around[3])
        ) {
          // 3/14
          x1 = x * this.res;
          x2 =
            y * this.res +
            this.res *
              ((1 - this.grid[x][y]) / (this.grid[x][y + 1] - this.grid[x][y]));
          y1 =
            x * this.res +
            this.res *
              ((1 - this.grid[x][y + 1]) /
                (this.grid[x + 1][y + 1] - this.grid[x][y + 1]));
          y2 = y * this.res + this.res;
        }

        line(x1, x2, y1, y2);
      }
    }
  }
}
