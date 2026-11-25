import {go,interact,until,waitFlag} from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,4000,id);}
function* stone(c,x){yield* until(c,()=>c.ent("stone").s.x===x*32,0,3000,"stone at "+x);}
const fire=function*(c){
yield* waitFlag(c,"p1");yield* go(c,3);yield* interact(c);c.flag("p2");
yield* waitFlag(c,"p2");yield* stone(c,2);c.flag("p3");
yield* waitFlag(c,"p4");yield* go(c,3);yield* interact(c);c.flag("p5");
yield* waitFlag(c,"p5");yield* stone(c,10);c.flag("p6");
yield* waitFlag(c,"p10");yield* gate(c,"gate2");yield* go(c,14);yield* interact(c);c.flag("p11");
yield* waitFlag(c,"p16");yield* go(c,3);yield* interact(c);c.flag("p17");
yield* waitFlag(c,"p17");yield* stone(c,2);c.flag("p18");
yield* waitFlag(c,"p19");yield* go(c,3);yield* interact(c);c.flag("p20");
yield* waitFlag(c,"p20");yield* stone(c,10);c.flag("p21");
yield* waitFlag(c,"p21");yield* gate(c,"gate5");yield* go(c,23);yield* interact(c);c.flag("p22");
yield* waitFlag(c,"p30");yield* go(c,3);yield* interact(c);c.flag("p31");
yield* waitFlag(c,"p31");yield* stone(c,2);c.flag("p32");
yield* waitFlag(c,"p32");yield* gate(c,"gate8");yield* go(c,34);c.flag("p33");
yield* waitFlag(c,"p33");yield* go(c,37);c.flag("p34");
};
const water=function*(c){
yield* waitFlag(c,"p0");yield* go(c,36);yield* interact(c);c.flag("p1");
yield* waitFlag(c,"p3");yield* gate(c,"gate0");yield* go(c,25);yield* interact(c);c.flag("p4");
yield* waitFlag(c,"p7");yield* go(c,25);yield* interact(c);c.flag("p8");
yield* waitFlag(c,"p8");yield* go(c,36);yield* interact(c);c.flag("p9");
yield* waitFlag(c,"p9");yield* stone(c,19);c.flag("p10");
yield* waitFlag(c,"p13");yield* gate(c,"gate3");yield* go(c,16);yield* interact(c);c.flag("p14");
yield* waitFlag(c,"p15");yield* go(c,36);yield* interact(c);c.flag("p16");
yield* waitFlag(c,"p22");yield* go(c,36);yield* interact(c);c.flag("p23");
yield* waitFlag(c,"p23");yield* stone(c,19);c.flag("p24");
yield* waitFlag(c,"p24");yield* gate(c,"gate6");yield* go(c,5);yield* interact(c);c.flag("p25");
yield* waitFlag(c,"p29");yield* go(c,36);yield* interact(c);c.flag("p30");
yield* waitFlag(c,"p34");yield* go(c,2);c.flag("p35");
};
const earth=function*(c){
yield* go(c,3);yield* interact(c);c.flag("p0");
yield* waitFlag(c,"p6");yield* gate(c,"gate1");yield* go(c,14);yield* interact(c);c.flag("p7");
yield* waitFlag(c,"p11");yield* go(c,3);yield* interact(c);c.flag("p12");
yield* waitFlag(c,"p12");yield* stone(c,28);c.flag("p13");
yield* waitFlag(c,"p14");yield* go(c,3);yield* interact(c);c.flag("p15");
yield* waitFlag(c,"p18");yield* gate(c,"gate4");yield* go(c,23);yield* interact(c);c.flag("p19");
yield* waitFlag(c,"p25");yield* go(c,3);yield* interact(c);c.flag("p26");
yield* waitFlag(c,"p26");yield* stone(c,28);c.flag("p27");
yield* waitFlag(c,"p27");yield* gate(c,"gate7");yield* go(c,34);yield* interact(c);c.flag("p28");
yield* waitFlag(c,"p28");yield* go(c,3);yield* interact(c);c.flag("p29");
yield* waitFlag(c,"p35");yield* go(c,37);c.flag("p36");
};
const leaveRelay=function*(c){
yield* waitFlag(c,"p0");yield* go(c,36);yield* interact(c);c.flag("p1");
yield* waitFlag(c,"p3");yield* gate(c,"gate0");yield* go(c,25);yield* interact(c);c.flag("p4");
yield* waitFlag(c,"p7");yield* go(c,25);c.flag("p8");
yield* waitFlag(c,"p8");yield* go(c,36);yield* interact(c);c.flag("p9");
yield* waitFlag(c,"p9");yield* stone(c,19);c.flag("p10");
yield* waitFlag(c,"p13");yield* gate(c,"gate3");yield* go(c,16);yield* interact(c);c.flag("p14");
yield* waitFlag(c,"p15");yield* go(c,36);yield* interact(c);c.flag("p16");
yield* waitFlag(c,"p22");yield* go(c,36);yield* interact(c);c.flag("p23");
yield* waitFlag(c,"p23");yield* stone(c,19);c.flag("p24");
yield* waitFlag(c,"p24");yield* gate(c,"gate6");yield* go(c,5);yield* interact(c);c.flag("p25");
yield* waitFlag(c,"p29");yield* go(c,36);yield* interact(c);c.flag("p30");
yield* waitFlag(c,"p34");yield* go(c,2);c.flag("p35");
};
const straight={fire:function*(c){yield* go(c,37)},water:function*(c){yield* go(c,2)},earth:function*(c){yield* go(c,37)}};
const keepRelay={fire:fire,water:leaveRelay,earth:earth};
export const solutions={sets:[{elements:["fire","water","earth"],scripts:{fire,water,earth},shortcuts:[{name:"walk straight",scripts:straight},{name:"retain the first live permission",scripts:keepRelay,maxTicks:16000}]}]};
