class CellAuto {

    constructor(size, rules, options) {
        this.size = size || 100;

        if (typeof rules === "function") this.rules = rules;
        else this.rules = ulamStanislawRules;

        if (!isEmpty(options)) this.options = options;
        else {
            this.options = {
                time: 10,
                xGap: 0,
                size: 5,
                gap: 0
            }
        }

        const filler = new Array(this.size ** 2);
        this.grid = fill2DarrFromArr(filler.fill(0));
    }

    setSize(size) {
        this.size = size || 100;
        const filler = new Array(this.size ** 2);
        this.grid = fill2DarrFromArr(filler.fill(0));
        return this;
    }

    changeValues(arr) {
        for (let i = 0; i < arr.length; i++) {
            this.grid[arr[i].y][arr[i].x] = 1;
        }
        return this;
    }

    changeValue(x, y) {
        this.grid[y][x] = 1;
        return this;
    }

    changeMid() {
        const mid = (this.size + 1) >> 1;
        this.changeValue(mid, mid);
        return this;
    }

    drawVertical(y1, y2, x) {
        for (let i = 0; i <= y2 - y1; i++) {
            this.changeValue(x, y1 + i);
        }
        return this;
    }

    drawHorizontal(y, x1, x2) {
        for (let i = 0; i <= x2 - x1; i++) {
            this.changeValue(x1 + i, y);
        }
        return this;
    }

    drawAngle(x, y, radius, up, right) {
        if (up && right) {
            this.drawVertical(y - radius, y, x);
            this.drawHorizontal(y, x, x + radius);
        } else if (!up && right) {
            this.drawVertical(y, y + radius, x);
            this.drawHorizontal(y, x, x + radius);
        } else if (up && !right) {
            this.drawVertical(y - radius, y, x);
            this.drawHorizontal(y, x - radius, x);
        } else {
            this.drawVertical(y, y + radius, x);
            this.drawHorizontal(y, x - radius, x);
        }
        return this;
    }

    drawCross(x, y, radius) {
        this.drawVertical(y - radius, y + radius, x);
        this.drawHorizontal(y, x - radius, x + radius);
        return this;
    }

    drawRect(x, y, l, L) {
        for (let i = 0; i < l; i++) {
            this.drawVertical(y - L, y, x + i);
        }
        return this;
    }

    show() {
        drawGrid(this.grid, this.options.xGap, this.options.size, this.options.gap, colorGOL);
        return this;
    }

    run() {
        return stepContinuousFromAlg(this.grid, this.options.time, this.options.xGap, this.options.size, this.options.gap, this.rules);
    }
}