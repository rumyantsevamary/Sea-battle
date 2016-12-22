(function (global){
    'use strict';

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