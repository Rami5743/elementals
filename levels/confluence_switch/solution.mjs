import {go,interact,until,waitFlag} from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,6000,id);}
function* state(c,id){yield* until(c,()=>c.ent(id).s.on===1,0,6000,id);}
const fire=function*(c){
 yield* gate(c,"f1");yield* go(c,14);yield* interact(c);
 yield* waitFlag(c,"W1");yield* go(c,3);yield* interact(c);
 yield* gate(c,"f2");yield* go(c,24);yield* interact(c);
 yield* waitFlag(c,"R");yield* go(c,3);yield* interact(c);
 yield* gate(c,"f3");yield* go(c,32);yield* interact(c);
 yield* waitFlag(c,"Wfinal");yield* go(c,3);yield* interact(c);
 yield* gate(c,"f4");yield* go(c,38);
};
const water=function*(c){
 yield* gate(c,"w1");yield* go(c,24);yield* interact(c);c.flag("W1");
 yield* gate(c,"w2");yield* go(c,14);yield* interact(c);
 yield* go(c,35);yield* interact(c);c.flag("R");
 yield* gate(c,"w3");yield* go(c,8);yield* interact(c);
 yield* go(c,35);yield* interact(c);
 yield* gate(c,"w4");yield* go(c,3);yield* interact(c);c.flag("Wfinal");yield* go(c,2);
};
const direct={fire:function*(c){yield* go(c,38);},water:function*(c){yield* go(c,2);}};
const divergent={fire:function*(c){yield* gate(c,"f1");yield* go(c,14);yield* interact(c);yield* waitFlag(c,"W1");yield* go(c,3);yield* interact(c);yield* gate(c,"f2");yield* go(c,24);yield* interact(c);yield* waitFlag(c,"R");yield* go(c,38);},water};
export const solutions={sets:[{elements:["fire","water"],scripts:{fire,water},shortcuts:[{name:"walk directly to exits",scripts:direct},{name:"reverse only the far belt while the near belt still points outward",scripts:divergent,maxTicks:14000}]}]};