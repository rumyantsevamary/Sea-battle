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