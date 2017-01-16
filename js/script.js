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
    
    function Player(name) {
        this.name = name;
        this.shots = 0;        
    }   

    function GameZone(width, height, fleet, player, status, containerID) {
        this.width = width;
        this.height = height;
        this.ships = [];
        this.player = player;
        this.status = status;
        this.containerID = containerID;
        this.fleet = fleet;//var fleet = [1, 2, 3, 4]; //количество краблей различного типа
        this.map = [];
    }

    GameZone.prototype.setStatus = function (values) {
        this.status = values;
    };

    GameZone.prototype.getStatus = function () {
        return this.status;
    };

    GameZone.prototype.initMap = function () {
        for (var i = 0; i < this.width; i++) {
            this.map[i] = [];
            for (var j = 0; j < this.height; j++) {
                this.map[i][j] = -1;
            }
        }
    };

    GameZone.prototype.render = function () {//создание поля
        var parent = document.getElementById(this.containerID);
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                var elem = this.createDOMelement('div', {'i' : i, 'j' : j, id : this.map[i][j], class : 'field'});
                parent.appendChild(elem);
            }
        }
        
    };

    GameZone.prototype.createDOMelement = function (tag, attr) {
        var elem = document.createElement(tag);
        for (var key in attr) {
            elem.setAttribute(key, attr[key]);
        }
        return elem;
    };
        

    GameZone.prototype.createShips = function () {//создание флота
        var shipLength = this.fleet.length;        
        for (var i = 0 ; i < this.fleet.length ; i++) {            
            for (var j = 0; j < this.fleet[i]; j++ ){
                this.ships.push(new Ship(shipLength));                
            }
            shipLength--;            
        }
    };
    
    GameZone.prototype.shipPlacement = function (){//размещение кораблей на поле
        var shipLength = this.fleet.length;
        var id = 0;
        for (var i = 0 ; i < this.fleet.length ; i++) {            
            for (var j = 0; j < this.fleet[i]; j++ ){
                var coordinate;                
                do {
                    coordinate = [randomInt(this.width), randomInt(this.height)];
                } while (this.validateCoord(coordinate[0], coordinate[1]) === false)

                var orientation;
                do {
                    orientation = randomInt(4);//0 - вверх, 1 - вправо, 2 - вниз, 3 - влево  
                } while (this.validateOrientation(coordinate[0], coordinate[1], orientation, shipLength) === false)
                
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
                
                this.ships[id].sections = sections;
                this.ships[id].id = id;                
                this.fillMap(coordinate[0], coordinate[1], shipLength, orientation, id); 
                id += 1;                     
            }
            shipLength--;            
        }
        console.log(this.ships);
        console.log(this.map);
        return this.ships;
    };

    GameZone.prototype.validateCoord = function (x, y) {//проверка первой координаты
        var n = 0;
        for (var i = 0; i < 3; i++){
            for (var j = 0; j < 3; j++){
                if (x - 1 + i < this.width && x - 1 + i >= 0 && y - 1 + j < this.height && y - 1 + j >= 0) {
                    if (this.map[x - 1 + i][y - 1 + j] === -1) {
                            n += 1;
                    }                                                   
                } else {
                    n += 1;
                }
            }
        }
        if (n === 9) {
            return true;
        } return false;
    };

    GameZone.prototype.validateOrientation = function (x, y, orientation, length) { // проверка ориентации в пространстве
        if (length === 1) {
            return true;
        } else {
            if (orientation === 0) {//вверх
                if (y > this.height - length) {
                    return false;
                } else {
                    var n = 0;
                    for (var i = 0; i < 3; i++){
                        for (var j = 0; j < length - 1; j++){
                            if (x - 1 + i >= 0 && x - 1 + i < this.width && y + 2 + j >=0 && y + 2 + j < this.height) {
                                if (this.map[x - 1 + i][y + 2 + j] === -1) {
                                    n += 1;
                                }
                            } else {
                                n += 1;
                            }
                        }
                    }
                }
            } else if (orientation === 1) {//вправо
                if (x > this.width - length) {
                    return false;
                } else {
                    var n = 0;
                    for (var i = 0; i < length - 1; i++){
                        for (var j = 0; j < 3; j++){
                            if (x + 2 + i >= 0 && x + 2 + i < this.width && y - 1 + j >=0 && y - 1 + j < this.height) {
                                if (this.map[x + 2 + i][y - 1 + j] === -1) {
                                    n += 1;
                                }
                            } else {
                                n += 1;
                            }
                        }
                    }
                }
            } else if (orientation === 2) {//вниз
                if (y < length - 1) {
                    return false;
                } else {
                    var n = 0;
                    for (var i = 0; i < 3; i++){
                        for (var j = 0; j < length - 1; j++){
                            if (x - 1 + i >= 0 && x - 1 + i < this.width && y - 2 - j >=0 && y - 2 - j < this.height) {
                                if (this.map[x - 1 + i][y - 2 - j] === -1) {
                                    n += 1;
                                }
                            } else {
                                n += 1;
                            }
                        }
                    }
                }
            } else {//влево
                if (x < length - 1) {
                    return false;
                } else {
                    var n = 0;
                    for (var i = 0; i < length - 1; i++){
                        for (var j = 0; j < 3; j++){
                            if (x - 2 - i >= 0 && x - 2 - i < this.width && y - 1 + j >=0 && y - 1 + j < this.height) {
                                if (this.map[x - 2 - i][y - 1 + j] === -1) {
                                    n += 1;
                                }
                            } else {
                                n += 1;
                            }
                        }
                    }
                }
            }
            if (n === ((length - 1) * 3)) {
                return true;
            } else {
                return false;
            }
       }
    };

    GameZone.prototype.fillMap = function (x, y, length, orientation, id) {
        if (orientation === 0) {
                for (var j = y; j < y + length; j++) {//up
                    var i = x;
                    this.map[i][j] = id;
                };
        }  else if (orientation === 1)  {//right
                for (var i = x; i < x + length; i++) {//right
                    var j = y;
                    this.map[i][j] = id;
                };
        }  else if (orientation === 2)  {//down
                for (var j = y; j > y - length; j--) {//down
                    var i = x;
                    this.map[i][j] = id;
                };
        } else {
                for (var i = x; i > x - length; i--) {//left
                    var j = y;
                    this.map[i][j] = id;
               };
        };
    };

    GameZone.prototype.showShips = function () {
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                if (this.map[i][j] != -1) {                    
                    var selector = "#" + this.containerID + " div[i=\"" + i + "\"][j=\"" + j + "\"]";
                    var elem = document.querySelector(selector);
                    elem.classList.add("ship");
                }
            }
        }
    };

    

    

    var fleet = [1, 2, 3, 4];
    var player1 = new Player('Jack');
    var game1 = new GameZone(10, 10, fleet, player1, true, 'gameField1');    
    game1.initMap();    
    game1.createShips();
    game1.shipPlacement();
    game1.render();
    game1.showShips();

    var player2 = new Player('Jess');
    var game2 = new GameZone(10, 10, fleet, player2, false, 'gameField2');
    game2.createShips();
    game2.initMap();
    game2.shipPlacement();  
    game2.render();
    game2.showShips();

    
    
}(window));