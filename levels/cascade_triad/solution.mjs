import {go,interact,until,waitFlag} from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,5000,id);}
const fire=function*(c){
 yield* gate(c,"f1");yield* go(c,14);yield* interact(c);
 yield* gate(c,"f2");yield* go(c,24);yield* interact(c);
 yield* go(c,14);yield* interact(c);
 yield* gate(c,"f3");yield* go(c,32);yield* interact(c);
 yield* waitFlag(c,"W3");yield* waitFlag(c,"E2");yield* go(c,14);yield* interact(c);
 yield* gate(c,"f4");yield* go(c,38);
};
const water=function*(c){
 yield* go(c,35);yield* interact(c);
 yield* gate(c,"w1");yield* go(c,24);yield* interact(c);
 yield* gate(c,"w2");yield* go(c,14);yield* interact(c);
 yield* gate(c,"w3");yield* go(c,8);yield* interact(c);c.flag("W3");
 yield* gate(c,"w4");yield* go(c,2);
};
const earth=function*(c){
 yield* gate(c,"e1");yield* go(c,14);yield* interact(c);
 yield* gate(c,"e2");yield* go(c,24);yield* interact(c);
 yield* gate(c,"e3");yield* go(c,32);yield* interact(c);c.flag("E2");
 yield* gate(c,"e4");yield* go(c,38);
};
const direct={fire:function*(c){yield* go(c,38);},water:function*(c){yield* go(c,2);},earth:function*(c){yield* go(c,38);}};
const noReverse={fire:function*(c){yield* gate(c,"f1");yield* go(c,14);yield* interact(c);yield* gate(c,"f2");yield* go(c,24);yield* interact(c);yield* go(c,38);},water,earth};
export const solutions={sets:[{elements:["fire","water","earth"],scripts:{fire,water,earth},shortcuts:[{name:"walk directly to exits",scripts:direct},{name:"never restore power to B",scripts:noReverse,maxTicks:10000}]}]};