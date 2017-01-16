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

    

    Field.prototype.generateField = function() { //визуальное создание поля
        var elem = document.getElementById('field');
        for (var i = this.height; i > 0; i--) {
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
                if (this.map[i][j] != 0) {
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
