Field.prototype.fillMap = function (x, y, length, orientation) {
        if (orientation === 0) {
                for (j = y; j < y + length; j++) {//up
                    i = x;
                    field.map[i][j] = 1;
                };
        }  else if (orientation === 1)  {//right
                for (i = x; i < x + length; i++) {//right
                    j = y;
                    field.map[i][j] = 1;
                };
        }  else if (orientation === 2)  {//down
                for (j = y; j > y - length; j--) {//down
                    i = x;
                    field.map[i][j] = 1;
                };
        } else {
                for (i = x; i > x - length; i--) {//left
                    j = y;
                    field.map[i][j] = 1;
        };
    };

    Field.prototype.validateOrientation = function (x, y, orientation, length) {
        if (orientation === 0) {//up
            var k = 1;
            if (y === this.height - length) {
                for (var i = 1; i < length-1; i++) {
                    if ((x != 0 && x != 9 && 
                        this.map[x][y+i+1] === 0 &&
                        this.map[x+1][y+i+1] === 0 &&
                        this.map[x-1][y+i+1] === 0) ||
                        (x === 0 &&
                        this.map[x][y+i+1] === 0 &&
                        this.map[x+1][y+i+1] === 0) ||
                        (x === 9 &&
                        this.map[x][y+i+1] === 0 &&
                        this.map[x-1][y+i+1] === 0)) {
                            k += 1;
                        };            
                };
            } else {
                for (var i = 1; i < length; i++) {
                    if ((x != 0 && x != 9 && 
                        this.map[x][y+i+1] === 0 &&
                        this.map[x+1][y+i+1] === 0 &&
                        this.map[x-1][y+i+1] === 0) ||
                        (x === 0 &&
                        this.map[x][y+i+1] === 0 &&
                        this.map[x+1][y+i+1] === 0) ||
                        (x === 9 &&
                        this.map[x][y+i+1] === 0 &&
                        this.map[x-1][y+i+1] === 0)) {
                            k += 1;
                        };            
                };
            };
            if (k === length) {
                return true;
            }
            return false;
        } else if (orientation === 1) {//right
            var k = 1;
            if (x === this.width - length) {
                for (var i = 1; i < length-1; i++) {
                        if ((y != 0 && y != 9 && 
                            this.map[x+i+1][y] === 0 &&
                            this.map[x+1+i][y+1] === 0 &&
                            this.map[x+1+i][y-1] === 0) ||
                            (y === 0 &&
                            this.map[x+i+1][y] === 0 &&
                            this.map[x+i+1][y+1] === 0) ||
                            (y === 9 &&
                            this.map[x+i+1][y] === 0 &&
                            this.map[x+i+1][y-1] === 0)) {
                                k += 1;
                            };            
                    };
            } else {
                for (var i = 1; i < length; i++) {
                        if ((y != 0 && y != 9 && 
                            this.map[x+i+1][y] === 0 &&
                            this.map[x+1+i][y+1] === 0 &&
                            this.map[x+1+i][y-1] === 0) ||
                            (y === 0 &&
                            this.map[x+i+1][y] === 0 &&
                            this.map[x+i+1][y+1] === 0) ||
                            (y === 9 &&
                            this.map[x+i+1][y] === 0 &&
                            this.map[x+i+1][y-1] === 0)) {
                                k += 1;
                            };            
                    };
            };
            if (k === length) {
                return true;
            }
            return false;                
        } else if (orientation === 2) {//down
            var k = 1;
            if (y === length - 1) {
                for (var i = 1; i < length-1; i++) {
                    if ((x != 0 && x != 9 && 
                        this.map[x][y-i-1] === 0 &&
                        this.map[x+1][y-i-1] === 0 &&
                        this.map[x-1][y-i-1] === 0) ||
                        (x === 0 &&
                        this.map[x][y-i-1] === 0 &&
                        this.map[x+1][y-i-1] === 0) ||
                        (x === 9 &&
                        this.map[x][y-i-1] === 0 &&
                        this.map[x-1][y-i-1] === 0)) {
                            k += 1;
                        };            
                };
            } else {
                for (var i = 1; i < length; i++) {
                    if ((x != 0 && x != 9 && 
                        this.map[x][y-i-1] === 0 &&
                        this.map[x+1][y-i-1] === 0 &&
                        this.map[x-1][y-i-1] === 0) ||
                        (x === 0 &&
                        this.map[x][y-i-1] === 0 &&
                        this.map[x+1][y-i-1] === 0) ||
                        (x === 9 &&
                        this.map[x][y-i-1] === 0 &&
                        this.map[x-1][y-i-1] === 0)) {
                            k += 1;
                        };            
                };
            };
            if (k === length) {
                return true;
            }
            return false;
        } else if (orientation === 3) {//left
            var k = 1;
            if (x === length - 1) {
                for (var i = 1; i < length-1; i++) {
                        if ((y != 0 && y != 9 && 
                            this.map[x-i-1][y] === 0 &&
                            this.map[x-1-i][y+1] === 0 &&
                            this.map[x-1-i][y-1] === 0) ||
                            (y === 0 &&
                            this.map[x-i-1][y] === 0 &&
                            this.map[x-i-1][y+1] === 0) ||
                            (y === 9 &&
                            this.map[x-i-1][y] === 0 &&
                            this.map[x-i-1][y-1] === 0)) {
                                k += 1;
                            };            
                    };
            } else {
                for (var i = 1; i < length; i++) {
                        if ((y != 0 && y != 9 && 
                            this.map[x-i-1][y] === 0 &&
                            this.map[x-1-i][y+1] === 0 &&
                            this.map[x-1-i][y-1] === 0) ||
                            (y === 0 &&
                            this.map[x-i-1][y] === 0 &&
                            this.map[x-i-1][y+1] === 0) ||
                            (y === 9 &&
                            this.map[x-i-1][y] === 0 &&
                            this.map[x-i-1][y-1] === 0)) {
                                k += 1;
                            };            
                    };
            };
            if (k === length) {
                return true;
            }
            return false;
        }
    };