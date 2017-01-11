(function (global){
    'use strict';

    function randomInt(min, max) { //функция, генерирующая счучайное число в заданом 
        if (arguments.length < 2) {
            max = min;
            min = 0;
        }
        return Math.floor(Math.random() * (max - min )) + min;
    }
    
    function Section(x, y) {
        this.x = x;
        this.y = y;
        this.status = true;
    }

    function Ship(sectionNumber, id, section) {
        this.sectionNumber = sectionNumber;
        this.health = sectionNumber;
        this.sections = [];
        this.id = id;
    
    }

    Ship.prototype.checkStatus = function () { //проверка здоровья

    };

    Ship.prototype.showAround = function () { //корабль убит, показать клетки вокруг него
        var y = this.coordinate[0] + 1;
        var x = this.coordinate[1] + 1;
        var orient = this.orientation;
        var shipLength = this.type;
        console.log(x, y, orient, shipLength);
        if (orient === 0) {
            for (var i = 0; i < 3; i ++){
                var row = y - 1 + i;
                if (row === y){
                    var col1 = x - 1;
                    var col2 = x + shipLength;
                    var selector1 = "." + "row-" + row + " " + "." + "col-" + col1;
                    var selector2 = "." + "row-" + row + " " + "." + "col-" + col2;
                    if (document.querySelector(selector1)) {
                            var elem = document.querySelector(selector1);
                            elem.classList.add('attackedNone');
                        }
                    if (document.querySelector(selector2)) {
                            var elem = document.querySelector(selector2);
                            elem.classList.add('attackedNone');
                        }

                } else {
                    for (var j = 0; j <= shipLength + 1; j ++) {
                        var col = x - 1 + j;
                        var selector = "." + "row-" + row + " " + "." + "col-" + col;
                        if (document.querySelector(selector)) {
                            var elem = document.querySelector(selector);
                            elem.classList.add('attackedNone');
                        }
                    }
                }
            }            
        } else if (orient === 2) {
            for (var i = 0; i < 3; i ++){
                var row = y - 1 + i;
                if (row === y){
                    var col1 = x + 1;
                    var col2 = x - shipLength;
                    var selector1 = "." + "row-" + row + " " + "." + "col-" + col1;
                    var selector2 = "." + "row-" + row + " " + "." + "col-" + col2;
                    if (document.querySelector(selector1)) {
                            var elem = document.querySelector(selector1);
                            elem.classList.add('attackedNone');
                        }
                    if (document.querySelector(selector2)) {
                            var elem = document.querySelector(selector2);
                            elem.classList.add('attackedNone');
                        }

                } else {
                    for (var j = 0; j <= shipLength + 1; j ++) {
                        var col = x + 1 - j;
                        var selector = "." + "row-" + row + " " + "." + "col-" + col;
                        if (document.querySelector(selector)) {
                            var elem = document.querySelector(selector);
                            elem.classList.add('attackedNone');
                        }
                    }
                }
            }
        } else if (orient === 1) {
            for (var i = 0; i < 3; i ++){
                var col = x - 1 + i;
                if (col === x){
                    var row1 = y - 1;
                    var row2 = y + shipLength;
                    var selector1 = "." + "row-" + row1 + " " + "." + "col-" + col;
                    var selector2 = "." + "row-" + row2 + " " + "." + "col-" + col;
                    if (document.querySelector(selector1)) {
                            var elem = document.querySelector(selector1);
                            elem.classList.add('attackedNone');
                        }
                    if (document.querySelector(selector2)) {
                            var elem = document.querySelector(selector2);
                            elem.classList.add('attackedNone');
                        }

                } else {
                    for (var j = 0; j <= shipLength + 1; j ++) {
                        var row = y - 1 + j;
                        var selector = "." + "row-" + row + " " + "." + "col-" + col;
                        if (document.querySelector(selector)) {
                            var elem = document.querySelector(selector);
                            elem.classList.add('attackedNone');
                        }
                    }
                }
            }
        } else if (orient === 3) {
            for (var i = 0; i < 3; i ++){
                var col = x - 1 + i;
                if (col === x){
                    var row1 = y + 1;
                    var row2 = y - shipLength;
                    var selector1 = "." + "row-" + row1 + " " + "." + "col-" + col;
                    var selector2 = "." + "row-" + row2 + " " + "." + "col-" + col;
                    if (document.querySelector(selector1)) {
                            var elem = document.querySelector(selector1);
                            elem.classList.add('attackedNone');
                        }
                    if (document.querySelector(selector2)) {
                            var elem = document.querySelector(selector2);
                            elem.classList.add('attackedNone');
                        }

                } else {
                    for (var j = 0; j <= shipLength + 1; j ++) {
                        var row = y + 1 - j;
                        var selector = "." + "row-" + row + " " + "." + "col-" + col;
                        if (document.querySelector(selector)) {
                            var elem = document.querySelector(selector);
                            elem.classList.add('attackedNone');
                        }
                    }
                }
            }
        }
       
    };

    function Player(name) {
        this.ships = [];
        this.name = name;        
    }

   

    function Field(width, height) {// конструктор поля
        this.width = width;
        this.height = height;
        this.map = [];
        this.generateField();
        this.createMap();
    }

    Field.prototype.createMap = function () {//создание карты поля
        for (var i = 0; i < this.width; i++) {
            this.map[i] = [];
            for (var j=0; j < this.height; j++) {
                this.map[i][j] = 0;
            }
        }        
    };

    Field.prototype.generateField = function() { //визуальное создание поля
        var elem = document.getElementById('field');
        for (var i = 1; i <= this.height ; i++) {
            var newRow = document.createElement('div');
            var rowClass = 'row-' + i;
            newRow.classList.add(rowClass);                        
            for (var j = 1; j <= this.width; j ++) {
                var newCol = document.createElement('div');
                var colClass = 'col-'+ j;
                newCol.classList.add(colClass);
                newRow.appendChild(newCol);
            }
            elem.appendChild(newRow);
        }
        
    };

    function GameZone(width, height, fleet, shots) {
        this.shots = shots;
        this.width = width;
        this.height = height;
        this.ships = [];
        this.player1 = null;
        this.player2 = null;
        this.fleet = fleet;//var fleet = [1, 2, 3, 4]; //количество краблей различного типа
    }
        

    GameZone.prototype.createShips = function () {//создание флота
        var shipLength = this.fleet.length;        
        for (var i = 0 ; i < this.fleet.length ; i++) {            
            for (var j = 0; j < this.fleet[i]; j++ ){
                this.ships.push(new Ship(shipLength));                
            }
            shipLength--;            
        }
    };
    
    GameZone.prototype.shipPlacement = function (field){//размещение кораблей на поле
        var shipLength = this.fleet.length;
        var id = 0;
        for (var i = 0 ; i < this.fleet.length ; i++) {            
            for (var j = 0; j < this.fleet[i]; j++ ){
                var coordinate;                
                do {
                    coordinate = [randomInt(field.width), randomInt(field.height)];
                } while (field.validateCoord(coordinate[0], coordinate[1]) === false)

                var orientation;
                do {
                    orientation = randomInt(4);//0 - вверх, 1 - вправо, 2 - вниз, 3 - влево  
                } while (field.validateOrientation(coordinate[0], coordinate[1], orientation, shipLength) === false)

                var sections = [];  
                if (orientation === 0) {
                    for (var k = 0; k < shipLength; k++) {
                        sections.push(new Section(coordinate[0], coordinate[1] + k));
                    }
                } else if (orientation === 1) {
                    for (var k = 0; k < shipLength; k++) {
                        sections.push(new Section(coordinate[0] + k, coordinate[1]));
                    }
                } else if (orientation === 2) {
                    for (var k = 0; k < shipLength; k++) {
                        sections.push(new Section(coordinate[0], coordinate[1] - k));
                    }
                } else {
                    for (var k = 0; k < shipLength; k++) {
                        sections.push(new Section(coordinate[0] - k, coordinate[1]));
                    }
                }

                id += 1;
                this.ships[id-1].sections = sections;
                this.ships[id-1].id = id;                
                field.fillMap(coordinate[0], coordinate[1], shipLength, orientation);                      
            }
            shipLength--;            
        }
        console.log(this.ships);
        console.log(field.map);
        return this.ships;
    };

    Field.prototype.validateCoord = function (x, y) {
       if (x === 0 && y > 0 && y < 9) {
           if (this.map[x][y] === 0 &&
               this.map[x][y+1] === 0 &&
               this.map[x][y-1] === 0 &&
               this.map[x+1][y] === 0 &&
               this.map[x+1][y+1] === 0 && 
               this.map[x+1][y-1] === 0) {
                   return true;
               } return false;
       } else if (x === 9 && y > 0 && y < 9) {
           if (this.map[x][y] === 0 &&
            this.map[x][y+1] === 0 &&
            this.map[x][y-1] === 0 &&
            this.map[x-1][y] === 0 && 
            this.map[x-1][y-1] === 0 && 
            this.map[x-1][y+1] === 0) {
                return true;
            } return false;
       } else if (y === 0 && x > 0 && x < 9) {
           if (this.map[x][y] === 0 &&
            this.map[x+1][y] === 0 &&
            this.map[x-1][y] === 0 &&
            this.map[x][y+1] === 0 &&
            this.map[x+1][y+1] === 0 &&
            this.map[x-1][y+1] === 0) {
                return true;
            } return false;
       } else if (y === 9 && x > 0 && x < 9) {
           if (this.map[x][y] === 0 &&
            this.map[x+1][y] === 0 && 
            this.map[x][y-1] === 0 && 
            this.map[x-1][y] === 0 &&
            this.map[x+1][y-1] === 0 && 
            this.map[x-1][y-1] === 0) {
                return true;
            } return false;
       } else if (x === 0 && y === 0) {
           if (this.map[x][y] === 0 &&
            this.map[x][y+1] === 0 &&
            this.map[x+1][y] === 0 &&
            this.map[x+1][y+1] === 0) {
                return true;
            } return false;
       } else if (x === 0 && y === 9) {
           if (this.map[x][y] === 0 &&
            this.map[x][y-1] === 0 &&
            this.map[x+1][y] === 0 &&
            this.map[x+1][y-1] === 0) {
                return true;
            } return false;
       } else if (x === 9 && y === 9) {
           if (this.map[x][y] === 0 &&
            this.map[x][y-1] === 0 &&
            this.map[x-1][y-1] === 0 &&
            this.map[x-1][y] === 0) {
                return true;
            } return false;
       } else if (x === 9 && y === 0) {
           if (this.map[x][y] === 0 &&
            this.map[x][y+1] === 0 &&
            this.map[x-1][y+1] === 0 &&
            this.map[x-1][y] === 0) {
                return true;
            } return false;
       } else {
           if (this.map[x][y] === 0 && 
            this.map[x][y+1] === 0 && 
            this.map[x+1][y] === 0 && 
            this.map[x][y-1] === 0 && 
            this.map[x-1][y] === 0 && 
            this.map[x+1][y+1] === 0 && 
            this.map[x+1][y-1] === 0 && 
            this.map[x-1][y-1] === 0 && 
            this.map[x-1][y+1] === 0) {
                return true;
            } return false; 
       }              
    };

    Field.prototype.validateOrientation = function (x, y, orientation, length) {
        if (orientation === 0) {//up
            var k = 1;
            if (y === this.height - length) {
                for (var i = 1; i < length-1; i++) {
                    if (x === 0) {
                        if (this.map[x][y+i+1] === 0 &&
                            this.map[x+1][y+i+1] === 0) {
                                k += 1;
                            }
                    } else if (x === 9) {
                        if ( this.map[x][y+i+1] === 0 &&
                            this.map[x-1][y+i+1] === 0) {
                                k += 1;  
                            }
                    } else {
                        if (this.map[x][y+i+1] === 0 &&
                            this.map[x+1][y+i+1] === 0 &&
                            this.map[x-1][y+i+1] === 0) {
                                k += 1;
                            }
                    }
                };
            } else if (y < this.height - length) {
                for (var i = 1; i < length; i++) {
                    if (x === 0) {
                        if ( this.map[x][y+i+1] === 0 &&
                            this.map[x+1][y+i+1] === 0) {
                                k += 1;
                            }
                    } else if (x === 9) {
                        if (this.map[x][y+i+1] === 0 &&
                            this.map[x-1][y+i+1] === 0) {
                                k += 1;
                        }
                    } else {
                        if (this.map[x][y+i+1] === 0 &&
                            this.map[x+1][y+i+1] === 0 &&
                            this.map[x-1][y+i+1] === 0) {
                                k += 1;
                            }
                    }        
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
                        if (y === 0) {
                            if (this.map[x+i+1][y] === 0 &&
                                this.map[x+i+1][y+1] === 0) {
                                     k += 1;
                                }
                        } else if (y === 9) {
                            if (this.map[x+i+1][y] === 0 &&
                                this.map[x+i+1][y-1] === 0) {
                                    k += 1;
                                }
                        } else {
                            if (this.map[x+i+1][y] === 0 &&
                                this.map[x+1+i][y+1] === 0 &&
                                this.map[x+1+i][y-1] === 0) {
                                    k += 1;
                                }
                        }           
                    };
            } else if (x < this.width - length) {
                for (var i = 1; i < length; i++) {
                        if (y === 0) {
                            if (this.map[x+i+1][y] === 0 &&
                                this.map[x+i+1][y+1] === 0) {
                                     k += 1;
                                }
                        } else if (y === 9) {
                            if (this.map[x+i+1][y] === 0 &&
                                this.map[x+i+1][y-1] === 0) {
                                    k += 1;
                                }
                        } else {
                            if (this.map[x+i+1][y] === 0 &&
                                this.map[x+1+i][y+1] === 0 &&
                                this.map[x+1+i][y-1] === 0) {
                                    k += 1;
                                }
                        }           
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
                    if (x === 0) {
                        if (this.map[x][y-i-1] === 0 &&
                            this.map[x+1][y-i-1] === 0) {
                                k += 1;
                            }
                    } else if (x === 9) {
                        if (this.map[x][y-i-1] === 0 &&
                            this.map[x-1][y-i-1] === 0) {
                               k += 1; 
                            }
                    } else {
                        if (this.map[x][y-i-1] === 0 &&
                            this.map[x+1][y-i-1] === 0 &&
                            this.map[x-1][y-i-1] === 0) {
                                k += 1;
                            }
                    }   
                };
            } else if (y > length - 1) {
                for (var i = 1; i < length; i++) {
                    if (x === 0) {
                        if (this.map[x][y-i-1] === 0 &&
                            this.map[x+1][y-i-1] === 0) {
                                k += 1;
                            }
                    } else if (x === 9) {
                        if (this.map[x][y-i-1] === 0 &&
                            this.map[x-1][y-i-1] === 0) {
                               k += 1; 
                            }
                    } else {
                        if (this.map[x][y-i-1] === 0 &&
                            this.map[x+1][y-i-1] === 0 &&
                            this.map[x-1][y-i-1] === 0) {
                                k += 1;
                            }
                    }            
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
                        if (y === 0) {
                            if (this.map[x-i-1][y] === 0 &&
                                this.map[x-i-1][y+1] === 0) {
                                    k += 1;
                                }
                        } else if (y === 9) {
                            if (this.map[x-i-1][y] === 0 &&
                                this.map[x-i-1][y-1] === 0) {
                                    k += 1;
                                }
                        } else {
                            if (this.map[x-i-1][y] === 0 &&
                                this.map[x-1-i][y+1] === 0 &&
                                this.map[x-1-i][y-1] === 0) {
                                    k += 1;
                                }
                        }          
                    };
            } else if (x > length - 1) {
                for (var i = 1; i < length; i++) {
                        if (y === 0) {
                            if (this.map[x-i-1][y] === 0 &&
                                this.map[x-i-1][y+1] === 0) {
                                    k += 1;
                                }
                        } else if (y === 9) {
                            if (this.map[x-i-1][y] === 0 &&
                                this.map[x-i-1][y-1] === 0) {
                                    k += 1;
                                }
                        } else {
                            if (this.map[x-i-1][y] === 0 &&
                                this.map[x-1-i][y+1] === 0 &&
                                this.map[x-1-i][y-1] === 0) {
                                    k += 1;
                                }
                        }            
                    };
            };
            if (k === length) {
                return true;
            }
            return false;
        }
    };

    Field.prototype.fillMap = function (x, y, length, orientation) {
        if (orientation === 0) {
                for (var j = y; j < y + length; j++) {//up
                    var i = x;
                    this.map[i][j] = 1;
                };
        }  else if (orientation === 1)  {//right
                for (var i = x; i < x + length; i++) {//right
                    var j = y;
                    this.map[i][j] = 1;
                };
        }  else if (orientation === 2)  {//down
                for (var j = y; j > y - length; j--) {//down
                    var i = x;
                    this.map[i][j] = 1;
                };
        } else {
                for (var i = x; i > x - length; i--) {//left
                    var j = y;
                    this.map[i][j] = 1;
               };
        };
    };

    

    Field.prototype.addReaction = function (ships) {  
        var ships = ships;      
        for (var i = 0; i < this.width; i++){
            for (var j = 0; j < this.height; j++) {
                var x = i + 1;
                var y = j + 1;
                var row = "row-" + x;
                var col = "col-" + y;
                var selector = "." + row + " " + "." + col;
                var elem = document.querySelector(selector);
                if (this.map[i][j] === 1) {
                    elem.addEventListener('click', attackShip);
                } else {
                    elem.addEventListener('click', attackNone);
                } 

                function attackShip() {                     
                    var colClass = this.classList[0];
                    var rowClass = this.parentNode.classList[0];
                    var j = parseInt(rowClass.substr(4)) - 1;
                    var i = parseInt(colClass.substr(4)) - 1;  
                    for (var l = 0; l < ships.length; l++) {
                        for (var k = 0; k < ships[l].body.length; k++) {
                            if (ships[l].body[k][0] === j && ships[l].body[k][1] === i) {
                                ships[l].health -= 1;
                                var ship = ships[l];  
                                console.log(ship);
                                if (ship.health === 0) {                                    
                                     ship.showAround();                                    
                                }                                 
                            }
                        }   
                    }
                   this.classList.add('attackedShip');                   
                };

                function attackNone() {
                    this.classList.add('attackedNone');
                };
            }
        }
    };

    var field1 = new Field(10, 10);   
    var game1 = new GameZone(10, 10, [1, 2, 3, 4], 50);
    game1.createShips();
    game1.shipPlacement(field1);

    Field.prototype.showShips = function () {
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                if (this.map[i][j] === 1) {
                    var x = i + 1;
                    var y = j + 1;
                    var row = "row-" + x;
                    var col = "col-" + y;
                    var selector = "." + row + " " + "." + col;
                    var elem = document.querySelector(selector);
                    elem.classList.add("ship");
                }
            }
        }
    };

    field1.showShips();
    
}(window));