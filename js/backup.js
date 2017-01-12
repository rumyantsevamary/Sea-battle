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

    

    Field.prototype.showShips = function (field) {
        for (var i = 0; i < field.width; i++) {
            for (var j = 0; j < field1.height; j++) {
                if (field.map[i][j] === 1) {
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

    
            Field.prototype.validateCoord = function (x, y) {//new version
                var n = 0;
                for (var i = 0; i < 3; i++){
                    for (var j = 0; j < 3; j++){
                        if (x - 1 + i < this.width && x - 1 + i >= 0 && y - 1 + j < this.height && y - 1 + j >= 0) {
                                if (this.map[x - 1 + i][y - 1 + j] === 0) {
                                    n += 1;
                                }                                                   
                        } else {
                            n += 1;
                        }
                    }
                }
                console.log(n);
                if (n === 9) {
                    return true;
                } return false;
            };

            Field.prototype.validateCoord = function (x, y) {//old version
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

    Field.prototype.validateOrientation = function (x, y, orientation, length) //old version
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

    Field.prototype.validateOrientation = function (x, y, orientation, length) {//new version
        if (length === 1) {
            return true;
        } else {
            if (orientation === 0) {//вверх
                var n = 0;
                for (var i = 0; i < 3; i++){
                    for (var j = 0; j < length - 1; j++){
                        if (x - 1 + i >= 0 && x - 1 + i < this.width && y + 2 + j >=0 && y + 2 + j < this.height) {
                            if (this.map[x - 1 + i][y + 2 + j]) {
                                n += 1;
                            }
                        } else {
                            n += 1;
                        }
                    }
                }
            } else if (orientation === 1) {//вправо
                var n = 0;
                for (var i = 0; i < length - 1; i++){
                    for (var j = 0; j < 3; j++){
                        if (x + 2 + i >= 0 && x + 2 + i < this.width && y - 1 + j >=0 && y - 1 + j < this.height) {
                            if (this.map[x + 2 + i][y - 1 + j]) {
                                n += 1;
                            }
                        } else {
                            n += 1;
                        }
                    }
                }
            } else if (orientation === 2) {//вниз
                var n = 0;
                for (var i = 0; i < 3; i++){
                    for (var j = 0; j < length - 1; j++){
                        if (x - 1 + i >= 0 && x - 1 + i < this.width && y - 2 - j >=0 && y - 2 - j < this.height) {
                            if (this.map[x - 1 + i][y - 2 - j]) {
                                n += 1;
                            }
                        } else {
                            n += 1;
                        }
                    }
                }
            } else {//влево
                var n = 0;
                for (var i = 0; i < length - 1; i++){
                    for (var j = 0; j < 3; j++){
                        if (x - 2 - i >= 0 && x - 2 - i < this.width && y - 1 + j >=0 && y - 1 + j < this.height) {
                            if (this.map[x - 2 - i][y - 1 + j]) {
                                n += 1;
                            }
                        } else {
                            n += 1;
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