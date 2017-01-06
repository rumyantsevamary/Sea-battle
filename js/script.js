(function (global){
    'use strict';

    function randomInt(min, max) { //функция, генерирующая счучайное число в заданом 
        if (arguments.length < 2) {
            max = min;
            min = 0;
        }
        return Math.floor(Math.random() * (max - min )) + min;
    }

    //пример создания события, его наблюдателя

    function EventEmmitter() {
        this.handlers = {};

        this.on = function (eventName, handler) {
            if (!(eventName in this.handlers)) {
                this.handlers[eventName] = [];
            }

            this.handlers[eventName].push(handler);
        };

        this.off = function (eventName, handler) {
            var name,
                i;

            if (eventName && (eventName in this.handlers)) {
                if (!handler) {
                    delete this.handlers[eventName];//удаляем свойство из объекта
                    return;
                }
                i = this.handlers[eventName].indexOf(handler);
                this.handlers[name].splice(i, 1);//нужна проверка на -1
                return;
            }

            for (name in this.handlers) {
                i = this.handlers[name].indexOf(handler);
                this.handlers[name].splice(i, 1);//нужна проверка на -1
            }
        };

        this.emit = function (eventName) {
            var handlers,
                i,
                len;
            if (eventName in this.handlers) {
                handlers = this.handlers[eventName];

                for (i=0, len = handlers.length; i < len; i++) {
                    handlers[i].apply(this, Array.prototype.slice.call(arguments, 1));//правращаем аргументы в массив
                }
            }
        };
    }

    function Subject() {}

    EventEmmitter.call(Subject.prototype);//примесь

    Subject.prototype.send = function () {
        this.emit('sended');
    };

    function Observer() {}

    Observer.prototype.onSend = function () {
        console.log(arguments);
    };

    var subject1 = new Subject(),
        observer1 = new Observer();

    subject1.on('sended', observer1.onSend);   
        
    //конец примера

    function Ship(type, coordinates, orientation) {
        this.type = type;
        this.health = type;
        this.coordinates = coordinates;
        this.orientation = orientation;
    }

    Ship.prototype.checkStatus = function () { //проверка здоровья

    };

    Ship.prototype.attack = function () { //атака корабля
        
    };

    function Player(name) {
        this.ships = [];
        this.name = name;        
    }

   

    Player.prototype.attackEnemy = function (){//атака чужого корабля

    };

    Player.prototype.attack = function (){//нас атакуют

    };

    function Field(width, height) {
        this.width = width;
        this.height = height;
        this.createField();
    }

    Field.prototype.createField = function () {
        this.map = [];
        for (var i = 0; i < this.width; i++) {
            this.map[i] = [];
            for (var j=0; j < this.height; j++) {
                this.map[i][j] = 0;
            }
        }        
    };

    function Game(shots) {
        this.shots = shots;
        this.player1 = null;
        this.player2 = null;
    }

    Game.prototype.start = function (width, height, shots) {//начать игру
        var field1 = new Field(width, height);   
        field1.createField();
        var game1 = new Game(shots);
        game1.createShips(field1, fleet);
        field1.addReaction();
    };

    Game.prototype.end = function () {//закончить игру
        
    };

    var fleet = [1, 2, 3, 4]; //количество краблей различного типа
    
    Game.prototype.createShips = function (field, array){//создание кораблей
        var shipLength = array.length;
        var ships = [];
        for (var i = 0 ; i < array.length ; i++) {            
            for (var j = 0; j < array[i]; j++ ){
                var rcoord;                
                do {
                    rcoord = [randomInt(field.width), randomInt(field.height)];
                } while (field.validateCoord(rcoord[0], rcoord[1]) === false)

                var coordinate = rcoord;

                var rorient;
                do {
                    rorient = randomInt(4);//0 - вверх, 1 - вправо, 2 - вниз, 3 - влево  
                } while (field.validateOrientation(coordinate[0], coordinate[1], rorient, shipLength) === false)

                var orientation = rorient;                

                ships.push(new Ship(shipLength, coordinate, orientation));
                field.fillMap(coordinate[0], coordinate[1], shipLength, orientation);                      
            }
            shipLength--;            
        }
        console.log(ships);
        console.log(field.map);
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

    

    Field.prototype.addReaction = function () {
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
                    var i = parseInt(rowClass.substr(4)) - 1;
                    var j = parseInt(colClass.substr(4)) - 1;
                    //console.log(i, j);  
                    
                                  
                    this.classList.add('attackedShip');                   
                };

                function attackNone() {
                    this.classList.add('attackedNone');
                };
            }
        }
    };

    var field1 = new Field(10, 10);   
    field1.createField();
    var game1 = new Game(50);
    game1.createShips(field1, fleet);
    field1.addReaction();
    
}(window));