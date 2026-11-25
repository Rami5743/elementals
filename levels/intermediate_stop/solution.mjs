import {go,interact,until,waitFlag} from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,5000,id);}
function* state(c,id){yield* until(c,()=>c.ent(id).s.on===1,0,5000,id);}
const fire=function*(c){
 yield* go(c,3);yield* interact(c);
 yield* gate(c,"f1");yield* go(c,14);yield* interact(c);c.flag("mid_recorded");
 yield* gate(c,"f2");yield* go(c,24);yield* interact(c);
 yield* go(c,3);yield* interact(c);c.flag("reset");
 yield* waitFlag(c,"low_for_f");
 yield* go(c,3);yield* interact(c);c.flag("mid_again");
 yield* waitFlag(c,"W2");
 yield* go(c,3);yield* interact(c);
 yield* gate(c,"f3");yield* go(c,32);yield* interact(c);c.flag("F3");
 yield* go(c,3);yield* interact(c);c.flag("up_final");
 yield* waitFlag(c,"W3");yield* go(c,3);yield* interact(c);yield* state(c,"low");c.flag("low_final");
 yield* waitFlag(c,"ceiling_closed");yield* interact(c);
 yield* gate(c,"f4");yield* go(c,38);
};
const water=function*(c){
 yield* waitFlag(c,"mid_recorded");yield* go(c,35);yield* interact(c);
 yield* gate(c,"w1");yield* go(c,24);yield* interact(c);
 yield* waitFlag(c,"reset");yield* state(c,"low");yield* go(c,35);yield* interact(c);c.flag("low_for_f");
 yield* gate(c,"w2");yield* go(c,14);yield* interact(c);c.flag("W2");
 yield* waitFlag(c,"up_final");yield* go(c,35);yield* interact(c);
 yield* state(c,"high");
 yield* gate(c,"w3");yield* go(c,8);yield* interact(c);c.flag("W3");
 yield* waitFlag(c,"low_final");yield* go(c,35);yield* interact(c);
 yield* gate(c,"w4");yield* go(c,4);c.flag("ceiling_closed");yield* go(c,2);
};
const direct={fire:function*(c){yield* go(c,38);},water:function*(c){yield* go(c,2);}};
const noStop={fire,water:function*(c){yield* waitFlag(c,"mid_recorded");yield* go(c,35);yield* interact(c);yield* gate(c,"w1");yield* go(c,24);yield* interact(c);yield* waitFlag(c,"reset");yield* state(c,"low");yield* go(c,20);c.flag("low_for_f");yield* until(c,()=>c.ent("mid").s.on===1,0,1000,"stone passing middle");yield* go(c,14);yield* interact(c);c.flag("W2");yield* go(c,2);}};
export const solutions={sets:[{elements:["fire","water"],scripts:{fire,water},shortcuts:[{name:"walk directly to exits",scripts:direct},{name:"leave the stop open and try to race the passing middle contact",scripts:noStop,maxTicks:12000}]}]};