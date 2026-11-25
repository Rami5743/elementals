import {go,interact,until,waitFlag} from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=64,0,5000,id);}
function* state(c,id){yield* until(c,()=>c.ent(id).s.on===1,0,5000,id);}
const fire=function*(c){
 yield* go(c,3);yield* interact(c);
 yield* gate(c,"f1");yield* go(c,14);yield* interact(c);c.flag("mid_recorded");
 yield* gate(c,"f2");yield* go(c,24);yield* interact(c);
 yield* go(c,3);yield* interact(c);c.flag("reset");
 yield* waitFlag(c,"low_for_f");
 yield* go(c,3);yield* interact(c);c.flag("mid_again");
 yield* waitFlag(c,"W2");yield* waitFlag(c,"E2");yield* waitFlag(c,"A2");
 yield* go(c,3);yield* interact(c);
 yield* gate(c,"f3");yield* go(c,32);yield* interact(c);c.flag("F3");
 yield* go(c,3);yield* interact(c);c.flag("up_final");
 yield* waitFlag(c,"W3");yield* go(c,3);yield* interact(c);yield* state(c,"low");c.flag("low_final");
 yield* waitFlag(c,"ceiling_closed");yield* interact(c);
 yield* gate(c,"f4");yield* go(c,38);
};
const water=function*(c){
 yield* gate(c,"w1");yield* go(c,24);yield* interact(c);
 yield* gate(c,"w2");yield* go(c,14);yield* interact(c);c.flag("W2");
 yield* gate(c,"w3");yield* go(c,8);yield* interact(c);c.flag("W3");
 yield* gate(c,"w4");yield* go(c,2);
};
const earth=function*(c){
 yield* gate(c,"e1");yield* go(c,14);yield* interact(c);
 yield* gate(c,"e2");yield* go(c,24);yield* interact(c);
 yield* waitFlag(c,"reset");yield* state(c,"low");yield* go(c,14);yield* interact(c);c.flag("low_for_f");
 yield* gate(c,"e3");yield* go(c,32);yield* interact(c);c.flag("E2");
 yield* waitFlag(c,"up_final");yield* go(c,14);yield* interact(c);
 yield* waitFlag(c,"low_final");yield* go(c,14);yield* interact(c);c.flag("ceiling_closed");
 yield* gate(c,"e4");yield* go(c,38);
};
const air=function*(c){
 yield* gate(c,"a1");yield* go(c,14);yield* interact(c);
 yield* gate(c,"a2");yield* go(c,24);yield* interact(c);
 yield* gate(c,"a3");yield* go(c,32);yield* interact(c);c.flag("A2");
 yield* gate(c,"a4");yield* go(c,38);
};
const direct={fire:function*(c){yield* go(c,38);},water:function*(c){yield* go(c,2);},earth:function*(c){yield* go(c,38);},air:function*(c){yield* go(c,38);}};
const noStop={fire,water,air,earth:function*(c){yield* gate(c,"e1");yield* go(c,14);yield* interact(c);yield* gate(c,"e2");yield* go(c,24);yield* interact(c);yield* waitFlag(c,"reset");yield* state(c,"low");c.flag("low_for_f");yield* gate(c,"e3");yield* go(c,32);yield* interact(c);yield* go(c,38);}};
export const solutions={sets:[{elements:["fire","water","earth","air"],scripts:{fire,water,earth,air},shortcuts:[{name:"walk directly to exits",scripts:direct},{name:"leave ceiling open and use passing middle contact",scripts:noStop,maxTicks:15000}]}]};