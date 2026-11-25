import {go,interact,until,waitFlag,IN_LEFT,IN_RIGHT} from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,6000,id);}
function* state(c,id){yield* until(c,()=>c.ent(id).s.on===1,0,6000,id);}
const fire=function*(c){
 yield* until(c,()=>c.tx>=13.8,IN_RIGHT,2400,"counterflow belt");yield* go(c,14);yield* interact(c);
 yield* gate(c,"f1");yield* go(c,24);yield* interact(c);
 yield* waitFlag(c,"Eisland");yield* go(c,14);yield* interact(c);
 yield* gate(c,"f2");yield* go(c,32);yield* interact(c);
 yield* waitFlag(c,"Efinal");yield* go(c,14);yield* interact(c);
 yield* gate(c,"f3");yield* go(c,38);
};
const earth=function*(c){
 yield* until(c,()=>c.ent("reverse").s.on===1,0,6000,"first reversal");
 yield* go(c,24);yield* interact(c);
 yield* gate(c,"e_mid");yield* go(c,18);c.flag("Eisland");
 yield* until(c,()=>c.ent("reverse").s.on===0,0,6000,"second reversal");
 yield* go(c,8);yield* interact(c);
 yield* gate(c,"e_final");yield* go(c,2);c.flag("Efinal");
};
const noUndo={fire:function*(c){yield* until(c,()=>c.tx>=13.8,IN_RIGHT,2400,"counterflow belt");yield* go(c,14);yield* interact(c);yield* gate(c,"f1");yield* go(c,24);yield* interact(c);yield* until(c,()=>false,0,10000,"wait for upstream shortcut");},earth:function*(c){yield* until(c,()=>c.ent("reverse").s.on===1,0,6000,"first reversal");yield* go(c,24);yield* interact(c);yield* gate(c,"e_mid");yield* go(c,8);yield* interact(c);yield* go(c,2);}};
const direct={fire:function*(c){yield* until(c,()=>false,0,10000,"wait for upstream shortcut");},earth:function*(c){yield* go(c,2);}};
export const solutions={sets:[{elements:["fire","earth"],scripts:{fire,earth},shortcuts:[{name:"Earth tries to walk against the initial belt",scripts:direct,maxTicks:8000},{name:"keep the first reversal engaged and walk upstream on the second belt",scripts:noUndo,maxTicks:12000}]}]};