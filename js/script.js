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
            map[i] = [];
            for (var j=0; j < this.height; j++) {
                map[i][j] = 0;
            }
        }
    };

    function Game(shots) {
        this.shots = shots;
        this.player1 = null;
        this.player2 = null;
    }

    Game.prototype.start = function () {//начать игру

    };

    Game.prototype.end = function () {//закончить игру
        
    };

    var fleet = [1, 2, 3, 4]; //количество краблей различного типа
    
    Game.prototype.createShips = function (width, height, array){//создание кораблей
        var shipLength = array.length;
        var ships = [];
        for (var i = 0 ; i < array.length ; i++) {            
            for (var j = 0; j < array[i]; j++ ){
                //console.log(i, j);  
                var coordinate =  [randomInt(width), randomInt(height)];
                Field.validateCoord(coordinate[0], coordinate[1]);
                var orientation = randomInt(4); //0 - вверх, 1 - вправо, 2 - вниз, 3 - влево

                ships.push(new Ship(shipLength, coordinate, orientation));                
            }
            shipLength--;            
        }
        console.log(ships);
    };

    Field.prototype.validateCoord = function (x, y) {
       if (this.map[x][y] === 0 && 
       this.map[x][y+1] && 
       this.map[x+1][y] && 
       this.map[x][y-1] && 
       this.map[x-1][y] && 
       this.map[x+1][y+1] && 
       this.map[x+1][y-1] && 
       this.map[x-1][y-1] && 
       this.map[x-1][y+1]) {
           return true;
       } 
       return false;               
    };

    var field1 = new Field(10, 10);   
    console.log( field1.createField());
    var game1 = new Game(50);
    game1.createShips(10, 10, fleet);
}(window));