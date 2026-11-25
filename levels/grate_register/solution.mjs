import {go,interact,until,waitFlag} from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,4000,id);}
function* sensor(c,id){yield* until(c,()=>c.ent(id).s.on,0,2000,id);}
function* lift(c,x,row){yield* go(c,x);yield* interact(c);yield* until(c,()=>c.ent("hoist").s.y===row*32,0,2000,"hoist");}
const fire=function*(c){
 yield* lift(c,3,2);yield* sensor(c,"top");
 yield* waitFlag(c,"w0");yield* lift(c,3,9);c.flag("lift_low");
 yield* gate(c,"g0_0");yield* go(c,14);yield* interact(c);c.flag("f0");
 yield* waitFlag(c,"press_open2");yield* lift(c,3,2);
 yield* gate(c,"g0_1");yield* go(c,23);yield* interact(c);c.flag("f1");
 yield* lift(c,3,9);c.flag("lift_low2");
 yield* waitFlag(c,"press_open3");yield* lift(c,3,2);
 yield* gate(c,"g0_2");yield* go(c,37);
};
const water=function*(c){
 yield* gate(c,"g1_0");yield* go(c,25);yield* interact(c);c.flag("w0");
 yield* go(c,36);yield* waitFlag(c,"lift_low");yield* interact(c);yield* sensor(c,"bottom");
 yield* waitFlag(c,"f0");yield* interact(c);c.flag("press_open2");
 yield* gate(c,"g1_1");yield* go(c,16);yield* interact(c);
 yield* waitFlag(c,"f1");yield* interact(c);
 yield* go(c,36);yield* waitFlag(c,"lift_low2");yield* interact(c);yield* sensor(c,"bottom");
 yield* gate(c,"g1_2");yield* go(c,5);yield* interact(c);
 yield* go(c,36);yield* interact(c);c.flag("press_open3");
 yield* go(c,2);
};
const straight={fire:function*(c){yield* go(c,37)},water:function*(c){yield* go(c,2)}};
const noErase={fire,water:function*(c){yield* gate(c,"g1_0");yield* go(c,25);yield* interact(c);c.flag("w0");yield* go(c,2)}};
const noPressWater=function*(c){
 yield* gate(c,"g1_0");yield* go(c,25);yield* interact(c);c.flag("w0");
 yield* go(c,36);yield* waitFlag(c,"lift_low");yield* sensor(c,"bottom");
 yield* waitFlag(c,"f0");yield* interact(c);c.flag("press_open2");
 yield* gate(c,"g1_1");yield* go(c,16);yield* interact(c);
 yield* waitFlag(c,"f1");yield* interact(c);
 yield* go(c,36);yield* waitFlag(c,"lift_low2");yield* interact(c);yield* sensor(c,"bottom");
 yield* gate(c,"g1_2");yield* go(c,5);yield* interact(c);
 yield* go(c,36);yield* interact(c);c.flag("press_open3");
 yield* go(c,2);
};
export const solutions={sets:[{elements:["fire","water"],scripts:{fire,water},shortcuts:[{name:"walk directly",scripts:straight},{name:"keep press open after lowering lift",scripts:{fire,water:noPressWater},maxTicks:10000}]}]};
