import { go, interact, until, waitFlag, wait } from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,5000,id);}
const fire=function*(c){
 yield* gate(c,"f_lower");yield* go(c,31);yield* interact(c);c.flag("F_lower");
 yield* go(c,34);yield* waitFlag(c,"B_ready");yield* waitFlag(c,"C_ready");
 yield* interact(c);c.flag("A");
 yield* gate(c,"f_latch");yield* go(c,26);yield* gate(c,"f_off");yield* go(c,6);yield* interact(c);c.flag("F_done");yield* go(c,2);
};
const air=function*(c){
 yield* gate(c,"f1");yield* go(c,17);yield* interact(c);
 yield* gate(c,"f2");yield* go(c,27);yield* interact(c);c.flag("lf1");
 yield* gate(c,"f3");yield* go(c,33);yield* interact(c);
 yield* waitFlag(c,"F_lower");yield* go(c,17);yield* interact(c);
 yield* gate(c,"air_end");yield* go(c,37);
};
const water=function*(c){
 yield* go(c,36);yield* interact(c);
 yield* gate(c,"w1");yield* go(c,27);yield* interact(c);
 yield* waitFlag(c,"lf1");yield* interact(c);yield* go(c,36);yield* interact(c);
 yield* gate(c,"w2a");yield* gate(c,"w2b");yield* go(c,20);c.flag("B_ready");
 yield* waitFlag(c,"A");yield* wait(c,210);yield* interact(c);c.flag("B");
 yield* gate(c,"w_latch");yield* go(c,17);yield* gate(c,"w_off");yield* go(c,3);yield* interact(c);c.flag("W_done");yield* go(c,2);
};
const earth=function*(c){
 yield* gate(c,"e1");yield* go(c,12);yield* interact(c);
 yield* gate(c,"e2a");yield* gate(c,"e2b");yield* go(c,20);yield* interact(c);
 yield* gate(c,"e3");yield* go(c,26);c.flag("C_ready");
 yield* waitFlag(c,"B");yield* wait(c,210);yield* interact(c);
 yield* waitFlag(c,"F_done");yield* waitFlag(c,"W_done");
 if(!c.ent("e_final").s.on && !c.ent("c").s.on)yield* interact(c);
 yield* gate(c,"e_final");yield* go(c,35);yield* interact(c);yield* go(c,37);
};
const straight={fire:function*(c){yield* go(c,2);},water:function*(c){yield* go(c,2);},earth:function*(c){yield* go(c,37);},air:function*(c){yield* go(c,37);}};
const noUndo={fire,earth,air,water:function*(c){yield* go(c,36);yield* interact(c);yield* gate(c,"w1");yield* go(c,27);yield* interact(c);yield* go(c,20);}};
const wSim=function*(c){
 yield* go(c,36);yield* interact(c);
 yield* gate(c,"w1");yield* go(c,27);yield* interact(c);
 yield* waitFlag(c,"lf1");yield* interact(c);yield* go(c,36);yield* interact(c);
 yield* gate(c,"w2a");yield* gate(c,"w2b");yield* go(c,20);c.flag("B_ready");
 yield* waitFlag(c,"A");yield* wait(c,0);yield* interact(c);c.flag("B");
 yield* gate(c,"w_latch");yield* go(c,17);yield* gate(c,"w_off");yield* go(c,3);yield* interact(c);c.flag("W_done");yield* go(c,2);
};
const eSim=function*(c){
 yield* gate(c,"e1");yield* go(c,12);yield* interact(c);
 yield* gate(c,"e2a");yield* gate(c,"e2b");yield* go(c,20);yield* interact(c);
 yield* gate(c,"e3");yield* go(c,26);c.flag("C_ready");
 yield* waitFlag(c,"B");yield* wait(c,0);yield* interact(c);
 yield* waitFlag(c,"F_done");yield* waitFlag(c,"W_done");
 if(!c.ent("e_final").s.on && !c.ent("c").s.on)yield* interact(c);
 yield* gate(c,"e_final");yield* go(c,35);yield* interact(c);yield* go(c,37);
};
export const solutions={sets:[{elements:["fire","water","earth","air"],scripts:{fire,water,earth,air},shortcuts:[{name:"walk straight",scripts:straight},{name:"leave old relays on",scripts:noUndo,maxTicks:10000},{name:"start all clocks together",scripts:{fire,water:wSim,earth:eSim,air},maxTicks:10000}]}]};
