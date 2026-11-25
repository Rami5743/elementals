import {go,interact,until,waitFlag} from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,4000,id);}
function* stone(c,x){yield* until(c,()=>c.ent("stone").s.x===x*32,0,3000,"stone at "+x);}
const fire=function*(c){
yield* waitFlag(c,"p2");yield* go(c,3);yield* interact(c);c.flag("p3");
yield* waitFlag(c,"p3");yield* stone(c,2);c.flag("p4");
yield* waitFlag(c,"p5");yield* go(c,3);yield* interact(c);c.flag("p6");
yield* waitFlag(c,"p6");yield* stone(c,9);c.flag("p7");
yield* waitFlag(c,"p14");yield* gate(c,"gate3");yield* go(c,14);yield* interact(c);c.flag("p15");
yield* waitFlag(c,"p21");yield* go(c,3);yield* interact(c);c.flag("p22");
yield* waitFlag(c,"p22");yield* stone(c,2);c.flag("p23");
yield* waitFlag(c,"p24");yield* go(c,3);yield* interact(c);c.flag("p25");
yield* waitFlag(c,"p25");yield* stone(c,9);c.flag("p26");
yield* waitFlag(c,"p29");yield* gate(c,"gate7");yield* go(c,23);yield* interact(c);c.flag("p30");
yield* waitFlag(c,"p39");yield* go(c,3);yield* interact(c);c.flag("p40");
yield* waitFlag(c,"p40");yield* stone(c,2);c.flag("p41");
yield* waitFlag(c,"p42");yield* go(c,3);yield* interact(c);c.flag("p43");
yield* waitFlag(c,"p43");yield* stone(c,9);c.flag("p44");
yield* waitFlag(c,"p44");yield* gate(c,"gate11");yield* go(c,34);c.flag("p45");
yield* waitFlag(c,"p45");yield* go(c,37);c.flag("p46");
};
const water=function*(c){
yield* waitFlag(c,"p1");yield* go(c,36);yield* interact(c);c.flag("p2");
yield* waitFlag(c,"p4");yield* gate(c,"gate0");yield* go(c,25);yield* interact(c);c.flag("p5");
yield* waitFlag(c,"p8");yield* go(c,25);yield* interact(c);c.flag("p9");
yield* waitFlag(c,"p9");yield* go(c,36);yield* interact(c);c.flag("p10");
yield* waitFlag(c,"p10");yield* stone(c,16);c.flag("p11");
yield* waitFlag(c,"p17");yield* gate(c,"gate4");yield* go(c,16);yield* interact(c);c.flag("p18");
yield* waitFlag(c,"p20");yield* go(c,36);yield* interact(c);c.flag("p21");
yield* waitFlag(c,"p27");yield* go(c,36);yield* interact(c);c.flag("p28");
yield* waitFlag(c,"p28");yield* stone(c,16);c.flag("p29");
yield* waitFlag(c,"p32");yield* gate(c,"gate8");yield* go(c,5);yield* interact(c);c.flag("p33");
yield* waitFlag(c,"p38");yield* go(c,36);yield* interact(c);c.flag("p39");
yield* waitFlag(c,"p46");yield* go(c,2);c.flag("p47");
};
const earth=function*(c){
yield* waitFlag(c,"p0");yield* go(c,3);yield* interact(c);c.flag("p1");
yield* waitFlag(c,"p11");yield* gate(c,"gate2");yield* go(c,14);yield* interact(c);c.flag("p12");
yield* waitFlag(c,"p12");yield* go(c,3);yield* interact(c);c.flag("p13");
yield* waitFlag(c,"p13");yield* stone(c,23);c.flag("p14");
yield* waitFlag(c,"p19");yield* go(c,3);yield* interact(c);c.flag("p20");
yield* waitFlag(c,"p26");yield* gate(c,"gate6");yield* go(c,23);yield* interact(c);c.flag("p27");
yield* waitFlag(c,"p30");yield* go(c,3);yield* interact(c);c.flag("p31");
yield* waitFlag(c,"p31");yield* stone(c,23);c.flag("p32");
yield* waitFlag(c,"p37");yield* go(c,3);yield* interact(c);c.flag("p38");
yield* waitFlag(c,"p41");yield* gate(c,"gate10");yield* go(c,34);yield* interact(c);c.flag("p42");
yield* waitFlag(c,"p47");yield* go(c,37);c.flag("p48");
};
const air=function*(c){
yield* go(c,36);yield* interact(c);c.flag("p0");
yield* waitFlag(c,"p7");yield* gate(c,"gate1");yield* go(c,25);yield* interact(c);c.flag("p8");
yield* waitFlag(c,"p15");yield* go(c,36);yield* interact(c);c.flag("p16");
yield* waitFlag(c,"p16");yield* stone(c,30);c.flag("p17");
yield* waitFlag(c,"p18");yield* go(c,36);yield* interact(c);c.flag("p19");
yield* waitFlag(c,"p23");yield* gate(c,"gate5");yield* go(c,16);yield* interact(c);c.flag("p24");
yield* waitFlag(c,"p33");yield* go(c,36);yield* interact(c);c.flag("p34");
yield* waitFlag(c,"p34");yield* stone(c,30);c.flag("p35");
yield* waitFlag(c,"p35");yield* gate(c,"gate9");yield* go(c,5);yield* interact(c);c.flag("p36");
yield* waitFlag(c,"p36");yield* go(c,36);yield* interact(c);c.flag("p37");
yield* waitFlag(c,"p48");yield* go(c,2);c.flag("p49");
};
const leaveRelay=function*(c){
yield* waitFlag(c,"p1");yield* go(c,36);yield* interact(c);c.flag("p2");
yield* waitFlag(c,"p4");yield* gate(c,"gate0");yield* go(c,25);yield* interact(c);c.flag("p5");
yield* waitFlag(c,"p8");yield* go(c,25);c.flag("p9");
yield* waitFlag(c,"p9");yield* go(c,36);yield* interact(c);c.flag("p10");
yield* waitFlag(c,"p10");yield* stone(c,16);c.flag("p11");
yield* waitFlag(c,"p17");yield* gate(c,"gate4");yield* go(c,16);yield* interact(c);c.flag("p18");
yield* waitFlag(c,"p20");yield* go(c,36);yield* interact(c);c.flag("p21");
yield* waitFlag(c,"p27");yield* go(c,36);yield* interact(c);c.flag("p28");
yield* waitFlag(c,"p28");yield* stone(c,16);c.flag("p29");
yield* waitFlag(c,"p32");yield* gate(c,"gate8");yield* go(c,5);yield* interact(c);c.flag("p33");
yield* waitFlag(c,"p38");yield* go(c,36);yield* interact(c);c.flag("p39");
yield* waitFlag(c,"p46");yield* go(c,2);c.flag("p47");
};
const straight={fire:function*(c){yield* go(c,37)},water:function*(c){yield* go(c,2)},earth:function*(c){yield* go(c,37)},air:function*(c){yield* go(c,2)}};
const keepRelay={fire:fire,water:leaveRelay,earth:earth,air:air};
export const solutions={sets:[{elements:["fire","water","earth","air"],scripts:{fire,water,earth,air},shortcuts:[{name:"walk straight",scripts:straight},{name:"retain the first live permission",scripts:keepRelay,maxTicks:16000}]}]};
