import {go,interact,until,waitFlag} from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,4000,id);}
function* stone(c,x){yield* until(c,()=>c.ent("stone").s.x===x*32,0,3000,"stone at "+x);}
const fire=function*(c){
 yield* go(c,3);yield* interact(c);c.flag("A_open");
 yield* waitFlag(c,"W_a");yield* go(c,3);yield* interact(c);yield* stone(c,10);c.flag("middle");
 yield* gate(c,"f0");yield* go(c,14);yield* interact(c);c.flag("F_a");
 yield* waitFlag(c,"W_b");yield* go(c,3);yield* interact(c);c.flag("A_open2");
 yield* gate(c,"f1");yield* go(c,23);yield* interact(c);c.flag("F_b");
 yield* go(c,3);yield* interact(c);yield* stone(c,10);c.flag("middle2");
 yield* gate(c,"f2");yield* go(c,37);
};
const water=function*(c){
 yield* waitFlag(c,"A_open");yield* go(c,36);yield* interact(c);yield* stone(c,2);
 yield* gate(c,"w0");yield* go(c,25);yield* interact(c);c.flag("W_a");
 yield* waitFlag(c,"F_a");yield* go(c,36);yield* interact(c);yield* stone(c,20);
 yield* gate(c,"w1");yield* go(c,16);yield* interact(c);c.flag("W_b");
 yield* go(c,36);yield* waitFlag(c,"A_open2");yield* interact(c);yield* stone(c,2);
 yield* gate(c,"w2");yield* go(c,5);yield* interact(c);c.flag("W_c");
 yield* go(c,36);yield* waitFlag(c,"middle2");yield* interact(c);yield* stone(c,20);
 yield* go(c,2);
};
const straight={fire:function*(c){yield* go(c,37)},water:function*(c){yield* go(c,2)}};
const wrongOrder={fire,water:function*(c){
 yield* waitFlag(c,"A_open");yield* go(c,36);yield* interact(c);yield* stone(c,2);
 yield* gate(c,"w0");yield* go(c,25);yield* interact(c);
 yield* go(c,36);yield* interact(c);c.flag("W_a");yield* gate(c,"w1");yield* go(c,2);
}};
export const solutions={sets:[{elements:["fire","water"],scripts:{fire,water},shortcuts:[{name:"walk straight",scripts:straight},{name:"close the long piston before the short piston",scripts:wrongOrder,maxTicks:10000}]}]};
