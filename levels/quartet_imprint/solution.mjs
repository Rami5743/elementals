import {go,interact,until,waitFlag} from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,4000,id);}
function* sensor(c,id){yield* until(c,()=>c.ent(id).s.on,0,2000,id);}
function* lift(c,row){yield* go(c,3);yield* interact(c);yield* until(c,()=>c.ent("hoist").s.y===row*32,0,2000,"hoist");}
const fire=function*(c){
 yield* waitFlag(c,"A_on1");yield* lift(c,2);yield* sensor(c,"top");c.flag("high1");yield* waitFlag(c,"W_a");yield* waitFlag(c,"E_a");yield* waitFlag(c,"A_a");
 yield* lift(c,4);c.flag("low1");
 yield* gate(c,"f0");yield* go(c,14);yield* interact(c);c.flag("F_a");
 yield* waitFlag(c,"press_open2");yield* waitFlag(c,"A_on2");yield* lift(c,2);
 yield* gate(c,"f1");yield* go(c,23);yield* interact(c);c.flag("F_b");
 yield* lift(c,4);c.flag("low2");
 yield* waitFlag(c,"press_open3");yield* waitFlag(c,"A_on3");yield* lift(c,2);
 yield* gate(c,"f2");c.flag("high3");yield* go(c,37);
};
const water=function*(c){
 yield* gate(c,"w0");yield* go(c,25);yield* interact(c);c.flag("W_a");
 yield* gate(c,"w1");yield* go(c,16);yield* interact(c);yield* waitFlag(c,"F_b");
 yield* interact(c);yield* go(c,34);yield* interact(c);c.flag("returned");
 yield* gate(c,"w2");yield* go(c,5);yield* interact(c);c.flag("W_c");yield* go(c,2);
};
const earth=function*(c){
 yield* gate(c,"e0");yield* go(c,14);yield* interact(c);c.flag("E_a");
 yield* go(c,3);yield* waitFlag(c,"low1");yield* interact(c);yield* sensor(c,"bottom");
 yield* gate(c,"e1");yield* go(c,23);yield* interact(c);
 yield* go(c,3);yield* interact(c);c.flag("press_open2");
 yield* waitFlag(c,"low2");yield* waitFlag(c,"returned");yield* interact(c);yield* sensor(c,"bottom");
 yield* gate(c,"e2");yield* go(c,34);yield* interact(c);c.flag("E_c");
 yield* go(c,3);yield* waitFlag(c,"W_c");yield* interact(c);c.flag("press_open3");yield* go(c,37);
};
const air=function*(c){
 yield* go(c,36);yield* interact(c);c.flag("A_on1");yield* waitFlag(c,"high1");yield* interact(c);
 yield* gate(c,"a0");yield* go(c,25);yield* interact(c);c.flag("A_a");
 yield* gate(c,"a1");yield* go(c,16);yield* interact(c);yield* go(c,36);yield* interact(c);c.flag("A_on2");
 yield* waitFlag(c,"F_b");yield* interact(c);yield* gate(c,"a2");yield* go(c,5);yield* interact(c);
 yield* go(c,36);yield* interact(c);c.flag("A_on3");yield* waitFlag(c,"high3");yield* interact(c);yield* go(c,2);
};
const straight={fire:function*(c){yield* go(c,37)},water:function*(c){yield* go(c,2)},earth:function*(c){yield* go(c,37)},air:function*(c){yield* go(c,2)}};
const keepAir={fire,water,earth,air:function*(c){yield* go(c,36);yield* interact(c);c.flag("A_on1");yield* waitFlag(c,"high1");yield* go(c,25);}};
const noPress={fire,water,air,earth:function*(c){yield* gate(c,"e0");yield* go(c,14);yield* interact(c);c.flag("E_a");yield* go(c,3);yield* waitFlag(c,"low1");yield* sensor(c,"bottom");}};
export const solutions={sets:[{elements:["fire","water","earth","air"],scripts:{fire,water,earth,air},shortcuts:[{name:"walk directly",scripts:straight},{name:"retain the hoist permission",scripts:keepAir,maxTicks:12000},{name:"lower hoist without using press",scripts:noPress,maxTicks:12000}]}]};
