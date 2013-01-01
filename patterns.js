BulletML.dsl();

var patterns = {};
(function() {
    function pattern(dsl) {
        return new AttackPattern(new BulletML.Root(dsl));
    }

    patterns.zako1 = pattern({
        top: action(
            wait("$rand*5"),
            changeDirection(direction(45, "absolute"), 1),
            changeSpeed(speed(4), 60),
            wait(60),
            changeSpeed(speed(0), 10),
            wait(10),
            repeat(5 ,action(
                fire(direction("$rand*10-5"), speed("2+$rank"), bullet()),
                wait(2)
            )),
            changeDirection(direction(160, "absolute"), 1),
            changeSpeed(speed(4), 40)
        )
    });

    patterns.zako1d = pattern({
        top: action(
            wait("45+$rand*5"),
            changeDirection(direction(45, "absolute"), 1),
            changeSpeed(speed(4), 60),
            wait(60),
            changeSpeed(speed(0), 10),
            wait(10),
            repeat(5 ,action(
                fire(direction("$rand*10-5"), speed("2+$rank"), bullet()),
                wait(2)
            )),
            changeDirection(direction(160, "absolute"), 1),
            changeSpeed(speed(4), 40)
        )
    });

    patterns.zako2 = pattern({
        top: action(
            wait("$rand*5"),
            changeDirection(direction(-45, "absolute"), 1),
            changeSpeed(speed(4), 60),
            wait(60),
            changeSpeed(speed(0), 10),
            wait(10),
            repeat(5 ,action(
                fire(direction("$rand*10-5"), speed("2+$rank"), bullet()),
                wait(2)
            )),
            changeDirection(direction(-160, "absolute"), 1),
            changeSpeed(speed(4), 40)
        )
    });

    patterns.zako2d = pattern({
        top: action(
            wait("45+$rand*5"),
            changeDirection(direction(-45, "absolute"), 1),
            changeSpeed(speed(4), 60),
            wait(60),
            changeSpeed(speed(0), 10),
            wait(10),
            repeat(5 ,action(
                fire(direction("$rand*10-5"), speed("2+$rank"), bullet()),
                wait(2)
            )),
            changeDirection(direction(-160, "absolute"), 1),
            changeSpeed(speed(4), 40)
        )
    });

    patterns.zako3 = pattern({
        top: action(
            wait("$rand*5"),
            changeDirection(direction(0, "aim"), 1),
            changeSpeed(speed(4), 40),
            wait(20),
            repeat(3, action(
                fire(direction("$rand*10-5"), speed("2+$rank"), bullet()),
                wait(5)
            ))
        )
    });

    patterns.zako4 = pattern({
        top: action(
            wait("$rand*20"),
            changeDirection(direction(0, "absolute"), 1),
            changeSpeed(speed(3), 1),
            wait("5+$rand*20"),
            changeSpeed(speed(0.2), 30),
            wait(30),
            actionRef("attack"),
            changeSpeed(speed(-3), 30)
        ),
        attack: action(
            wait("5+$rand*20"),
            repeat(2, action(
                fire(direction(-3*2, "aim"),      speed("1.4+$rank"), bullet()),
                fire(direction( 2*2, "sequence"), speed("1.5+$rank"), bullet()),
                fire(direction( 2*2, "sequence"), speed("1.6+$rank"), bullet()),
                fire(direction( 2*2, "sequence"), speed("1.7+$rank"), bullet()),
                wait(90)
            ))
        )
    });

    patterns.zako5 = pattern({
        top: action(
            wait("$rand*20"),
            changeDirection(direction(0, "absolute"), 1),
            changeSpeed(speed(3), 1),
            wait("5+$rand*20"),
            changeSpeed(speed(0.2), 30),
            wait(30),
            actionRef("attack"),
            changeSpeed(speed(-3), 30)
        ),
        attack: action(
            wait("5+$rand*20"),
            repeat(2, action(
                fire(direction("$rand*10-5"), speed("2.2+$rank"), bullet()),
                repeat(12, action(
                    wait(3),
                    fire(direction(0, "sequence"), speed(0.2, "sequence"), bullet())
                )),
                wait(80)
            ))
        )
    });

    patterns.zako6 = pattern({
        top: action(
            changeDirection(direction(0, "absolute"), 1),
            changeSpeed(speed(3), 1),
            wait("5+$rand*20"),
            changeSpeed(speed(0.3), 30),
            wait(45),
            actionRef("attack"),
            changeSpeed(speed(-3), 30)
        ),
        attack: action(
            repeat(8, actionRef("firebit", "$rand*360")),
            wait(90),
            repeat(8, actionRef("firebit", "$rand*360")),
            wait(90)
        ),
        firebit: action(
            fire(direction("$1", "aim"), speed("0.5+$rand"), bulletRef("bit", "$1"))
        ),
        bit: bullet(
            action(
                wait("10+$rank*3"),
                fire(direction("$1*-1", "relative"), speed("3.4+$rank"), bullet()),
                vanish()
            )
        )
    });

    patterns.bigger = pattern({
        top: action(
            changeDirection(direction(0, "absolute"), 1),
            changeSpeed(speed(2), 1),
            wait(30),
            changeDirection(direction(90, "absolute"), 1),
            changeSpeed(speed(0.2), 1),
            actionRef("attack"),
            repeat(30, action(
                changeDirection(direction(-90, "absolute"), 1),
                actionRef("attack"),
                actionRef("attack"),
                changeDirection(direction(90, "absolute"), 1),
                actionRef("attack"),
                actionRef("attack")
            ))
        ),
        attack: action(
            repeat(2, action(
                repeat("1+$rank*5", action(
                    fire(direction(-30, "aim"), speed("2+$rank"), bullet()),
                    fire(direction(20, "sequence"), speed("2+$rank"), bullet()),
                    fire(direction(20, "sequence"), speed("2+$rank"), bullet()),
                    fire(direction(20, "sequence"), speed("2+$rank"), bullet()),
                    wait(5)
                )),
                wait(10),
                repeat("1+$rank*5", action(
                    fire(direction(-40, "aim"), speed("2+$rank"), bullet("g")),
                    fire(direction(20, "sequence"), speed("2+$rank"), bullet("g")),
                    fire(direction(20, "sequence"), speed("2+$rank"), bullet("g")),
                    fire(direction(20, "sequence"), speed("2+$rank"), bullet("g")),
                    fire(direction(20, "sequence"), speed("2+$rank"), bullet("g")),
                    wait(5)
                )),
                wait(10)
            ))
        )
    });

    patterns.tank1 = pattern({
        top: action(
            changeDirection(direction(80, "absolute"), 1),
            changeSpeed(speed(0.5), 1),
            wait("60+$rand*100"),
            repeat(30, action(
                fire(speed("1.5+$rank"), bullet()),
                wait("60+$rand*100")
            ))
        )
    });
    patterns.tank1d = pattern({
        top: action(
            wait(30),
            changeDirection(direction(80, "absolute"), 1),
            changeSpeed(speed(0.5), 1),
            wait("60+$rand*100"),
            repeat(30, action(
                fire(speed("1.5+$rank"), bullet()),
                wait("60+$rand*100")
            ))
        )
    });
    patterns.tank1dd = pattern({
        top: action(
            wait(60),
            changeDirection(direction(80, "absolute"), 1),
            changeSpeed(speed(0.5), 1),
            wait("60+$rand*100"),
            repeat(30, action(
                fire(speed("1.5+$rank"), bullet()),
                wait("60+$rand*100")
            ))
        )
    });

    patterns.tank2 = pattern({
        top: action(
            changeDirection(direction(-80, "absolute"), 1),
            changeSpeed(speed(0.5), 1),
            wait("60+$rand*100"),
            repeat(30, action(
                fire(speed("1.5+$rank"), bullet()),
                wait("60+$rand*100")
            ))
        )
    });
    patterns.tank2d = pattern({
        top: action(
            wait(30),
            changeDirection(direction(-80, "absolute"), 1),
            changeSpeed(speed(0.5), 1),
            wait("60+$rand*100"),
            repeat(30, action(
                fire(speed("1.5+$rank"), bullet()),
                wait("60+$rand*100")
            ))
        )
    });
    patterns.tank2dd = pattern({
        top: action(
            wait(60),
            changeDirection(direction(-80, "absolute"), 1),
            changeSpeed(speed(0.5), 1),
            wait("60+$rand*100"),
            repeat(30, action(
                fire(speed("1.5+$rank"), bullet()),
                wait("60+$rand*100")
            ))
        )
    });

    patterns.middle = pattern({
        top: action(
            changeDirection(direction(0, "absolute"), 1),
            changeSpeed(speed(0.8), 1),
            wait(40),
            repeat(2, action(
                fire(direction(-90, "aim"), speed(4), bulletRef("bit", 60)),
                fire(direction(-90, "aim"), speed(2), bulletRef("bit", 80)),
                fire(direction(90, "aim"), speed(2), bulletRef("bit", -80)),
                fire(direction(90, "aim"), speed(4), bulletRef("bit", -60)),
                wait(60)
            ))
        ),
        bit: bullet(
            action(
                wait(2),
                changeSpeed(0, 1),
                fire(direction("$1", "relative"), speed(3), bullet("g")),
                repeat("5+$rank*5", action(
                    wait(1),
                    fire(direction(0, "sequence"), speed(0, "sequence"), bullet("g"))
                )),
                vanish()
            )
        )
    });

    patterns.cannon = pattern({
        top1: action(
            wait(100),
            repeat(100, action(
                changeDirection(direction(180, "relative"), 600),
                repeat(30, action(
                    fire(direction(0, "relative"), speed(1.4), bullet("g")),
                    fire(direction(90, "sequence"), speed(1.4), bullet("g")),
                    fire(direction(90, "sequence"), speed(1.4), bullet("g")),
                    fire(direction(90, "sequence"), speed(1.4), bullet("g")),
                    wait(20)
                ))
            ))
        ),
        top2: action(
            changeDirection(direction(0, "absolute"), 1),
            changeSpeed(speed(0.2), 1)
        )
    });

    patterns.boss11 = pattern({
        top: action(
            actionRef("launch"),
            actionRef("attack1"),
            wait(30),
            actionRef("move2"),
            repeat(900, action(
                actionRef("attack2"),
                actionRef("move2"),
                actionRef("attack3"),
                actionRef("move2"),
                actionRef("attack4"),
                actionRef("move2"),
                actionRef("attack5"),
                actionRef("move2")
            ))
        ),
        launch: action(
            changeDirection(direction(0, "absolute"), 1),
            changeSpeed(speed(2), 1),
            wait(15),
            changeSpeed(speed(-0.5), 140),
            wait(140),
            changeSpeed(speed(0), 10)
        ),
        attack1: action(
            fire(direction(-125, "absolute"), speed(4), bulletRef("bit1", -1,  30)),
            fire(direction(-125, "absolute"), speed(4), bulletRef("bit1", -1, -30)),
            fire(direction( 125, "absolute"), speed(4), bulletRef("bit1",  1,  30)),
            fire(direction( 125, "absolute"), speed(4), bulletRef("bit1",  1, -30)),
            wait(10+360*3/10*2)
        ),
        bit1: bullet(
            action(
                wait(12),
                changeSpeed(0, 1),
                fire(direction("$2"), speed("0.3+$rank"), bullet()),
                repeat(360*4/10, action(
                    fire(direction("10*$1", "sequence"), speed(0.02, "sequence"), bullet()),
                    wait(2)
                )),
                vanish()
            )
        ),
        move2: action(
            changeSpeed(speed(1), 100),
            wait(60),
            changeSpeed(speed(-1), 100),
            wait(66),
            changeSpeed(speed(0), 100)
        ),
        attack2: action((function() {
            var result = [];
            for (var i = 0; i < 8; i++) {
                result.push(fire(direction(-125, "absolute"), speed(4), bulletRef("bit2", i* 10, i*0.1)));
                result.push(wait(60-i*5));
                result.push(fire(direction( 125, "absolute"), speed(4), bulletRef("bit2", i*-10, i*0.1)));
                result.push(wait(60-i*5));
            }
            return result;
        })()),
        bit2: bullet(
            action(
                wait(12),
                changeSpeed(0, 1),
                repeat(3, action(
                    actionRef("fire1", "$1+-80", "$2"),
                    actionRef("fire1", "$1+-40", "$2"),
                    actionRef("fire1", "$1+  0", "$2"),
                    actionRef("fire1", "$1+ 40", "$2"),
                    actionRef("fire1", "$1+ 80", "$2"),
                    wait(5)
                )),
                vanish()
            )
        ),
        fire1: action(
            fire(direction("$1-10", "absolute"), speed("1+$rank+$2"), bullet()),
            repeat(4, action(
                fire(direction(5, "sequence"), speed(0, "sequence"), bullet())
            ))
        ),
        attack3: action(
            fire(direction(-125, "absolute"), speed(4), bulletRef("bit3",  0)),
            fire(direction( 125, "absolute"), speed(4), bulletRef("bit3", "160*(1.1-$rank)/2")),
            repeat(25, action(
                fire(direction(0, "aim"), speed("0.8+$rank"), bullet("g")),
                fire(direction(0, "sequence"), speed("0.9+$rank"), bullet("g")),
                repeat("360/(40*(1.1-$rank))-1", action(
                    fire(direction("40*(1.1-$rank)", "sequence"), speed("0.8+$rank"), bullet("g")),
                    fire(direction(0, "sequence"), speed("0.9+$rank"), bullet("g"))
                )),
                wait(40)
            ))
        ),
        bit3: bullet(
            action(
                wait(12),
                changeSpeed(speed(0), 1),
                wait("$1"),
                repeat("6/(1.1-$rank)", action(
                    fire(direction("$rand*30-15"), bullet()),
                    fire(direction("$rand*30-15"), bullet()),
                    fire(direction("$rand*30-15"), bullet()),
                    wait("160*(1.1-$rank)")
                ))
            )
        ),
        attack4: action(
            fire(direction(-125, "absolute"), speed(4), bulletRef("bit4", -1, 180)),
            fire(direction(-125, "absolute"), speed(4), bulletRef("bit4", -1, 150)),
            fire(direction(-125, "absolute"), speed(4), bulletRef("bit4", -1, 120)),
            fire(direction(-125, "absolute"), speed(4), bulletRef("bit4", -1,  90)),
            fire(direction( 125, "absolute"), speed(4), bulletRef("bit4",  1,  90)),
            fire(direction( 125, "absolute"), speed(4), bulletRef("bit4",  1, 120)),
            fire(direction( 125, "absolute"), speed(4), bulletRef("bit4",  1, 150)),
            fire(direction( 125, "absolute"), speed(4), bulletRef("bit4",  1, 180)),
            repeat(600/40, action(
                fire(direction(-125, "absolute"), speed(4), bulletRef("bit42")),
                wait(40/2),
                fire(direction( 125, "absolute"), speed(4), bulletRef("bit42")),
                wait(40/2)
            ))
        ),
        bit4: bullet(
            action(
                wait(12),
                changeSpeed(speed(0), 1),
                changeDirection(direction("$2*$1", "absolute"), 1),
                wait(5),
                changeDirection(direction("($2-100)*$1", "absolute"), 600),
                repeat(150, action(
                    fire(direction(0, "relative"), speed(5), bullet("g")),
                    wait(4)
                )),
                vanish()
            )
        ),
        bit42: bullet(
            action(
                wait(12),
                changeSpeed(speed(0), 1),
                fire(direction("$rand*10-5"), speed("0.8+$rank"), bullet()),
                fire(direction(5, "sequence"), speed(0, "sequence"), bullet()),
                fire(direction(5, "sequence"), speed(0, "sequence"), bullet()),
                vanish()
            )
        ),
        attack5: action(
            fire(direction(-125, "absolute"), speed(4), bulletRef("bit5", -1,  30, 10)),
            fire(direction(-125, "absolute"), speed(4), bulletRef("bit5", -1, -30, 7)),
            fire(direction( 125, "absolute"), speed(4), bulletRef("bit5",  1,  30, 9)),
            fire(direction( 125, "absolute"), speed(4), bulletRef("bit5",  1, -30, 11)),
            wait(10+360*3/10*2)
        ),
        bit5: bullet(
            action(
                wait(12),
                changeSpeed(0, 1),
                fire(direction("$2"), speed("0.25+$rank"), bullet()),
                repeat(360*4/10, action(
                    fire(direction("$3*$1", "sequence"), speed(0.01, "sequence"), bullet()),
                    wait(2)
                )),
                vanish()
            )
        ),
        bitdummy: bullet(
            action(
                vanish()
            )
        )
    });

    patterns.boss12 = pattern({
        top: action(

        )
    });

})();