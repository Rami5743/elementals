import {go,interact,until,waitFlag} from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,7000,id);}
function* pull(c,x){yield* go(c,x);yield* interact(c);}
function* sensor(c,id){yield* until(c,()=>c.ent(id).s.on===1,0,2000,id);}
const fire=function*(c){
 yield* pull(c,3);yield* gate(c,"f1");yield* pull(c,14);c.flag("F1");
 yield* waitFlag(c,"W1");yield* pull(c,3);yield* gate(c,"f2");yield* pull(c,24);
 yield* waitFlag(c,"W2");yield* pull(c,3);yield* gate(c,"f3");yield* pull(c,32);c.flag("F3");
 yield* waitFlag(c,"W3");yield* pull(c,3);c.flag("reset");
 yield* waitFlag(c,"W4");yield* pull(c,3);yield* gate(c,"fexit");yield* go(c,38);
};
const water=function*(c){
 yield* pull(c,30);yield* gate(c,"w1");yield* pull(c,24);c.flag("W1");
 yield* gate(c,"w2");yield* pull(c,14);c.flag("W2");
 yield* gate(c,"w3");yield* pull(c,8);c.flag("W3");
 yield* waitFlag(c,"reset");yield* gate(c,"w2");yield* gate(c,"wback");yield* pull(c,35);
 yield* go(c,14);c.flag("W4");yield* gate(c,"wexit");yield* go(c,2);
};
const direct={fire:function*(c){yield* go(c,38);},water:function*(c){yield* go(c,2);}};
const noReset={fire:function*(c){yield* pull(c,3);yield* gate(c,"f1");yield* pull(c,14);c.flag("F1");yield* waitFlag(c,"W1");yield* go(c,24);},water};
const noReturn={fire,water:function*(c){yield* pull(c,30);yield* gate(c,"w1");yield* pull(c,24);c.flag("W1");yield* gate(c,"w2");yield* pull(c,14);c.flag("W2");yield* gate(c,"w3");yield* pull(c,8);c.flag("W3");yield* go(c,2);}};
export const solutions={sets:[{elements:["fire","water"],scripts:{fire,water},shortcuts:[{name:"walk directly",scripts:direct},{name:"never reverse the rope",scripts:noReset,maxTicks:10000},{name:"skip the return to the east workshop",scripts:noReturn,maxTicks:10000}]}]};
