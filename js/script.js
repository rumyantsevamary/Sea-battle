(function (global){
    'use strict';

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

    function Ship(type, health, coordinates, orientation) {
        this.type = type;
        this.health = health;
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

    Player.prototype.createShips = function (){//создание кораблей

    };

    Player.prototype.attackEnemy = function (){//атака чужого корабля

    };

    Player.prototype.attack = function (){//нас атакуют

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
}(window));