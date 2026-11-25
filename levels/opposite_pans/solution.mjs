import {go,interact,until,waitFlag} from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,7000,id);}
function* pull(c,x){yield* go(c,x);yield* interact(c);}
function* sensor(c,id){yield* until(c,()=>c.ent(id).s.on===1,0,2000,id);}
const fire=function*(c){
 yield* pull(c,3);yield* gate(c,"f1");yield* pull(c,14);c.flag("F1");
 yield* waitFlag(c,"W1");yield* pull(c,3);yield* gate(c,"f2");yield* pull(c,24);
 yield* waitFlag(c,"W2");yield* pull(c,3);yield* gate(c,"f3");yield* pull(c,32);c.flag("F3");
 yield* waitFlag(c,"W3");yield* pull(c,3);c.flag("reset");
 yield* waitFlag(c,"W4");yield* pull(c,3);yield* gate(c,"fexit");yield* pull(c,37);yield* go(c,38);c.flag("Fhome");
};
const water=function*(c){
 yield* pull(c,30);yield* gate(c,"w1");yield* pull(c,24);c.flag("W1");
 yield* gate(c,"w2");yield* pull(c,14);c.flag("W2");
 yield* gate(c,"w3");yield* pull(c,8);c.flag("W3");
 yield* waitFlag(c,"reset");yield* gate(c,"w2");yield* gate(c,"wback");yield* pull(c,35);
 yield* go(c,14);c.flag("W4");yield* gate(c,"wexit");yield* pull(c,3);yield* go(c,2);c.flag("Whome");
};
const earth=function*(c){
 yield* pull(c,3);yield* gate(c,"e1");yield* pull(c,14);
 yield* gate(c,"e2");yield* pull(c,24);
 yield* gate(c,"e3");yield* pull(c,32);
 yield* waitFlag(c,"Fhome");yield* waitFlag(c,"Whome");yield* pull(c,3);
 yield* gate(c,"eexit");yield* pull(c,37);yield* go(c,38);
};
const air=function*(c){yield* pull(c,13);yield* gate(c,"air_middle");yield* pull(c,23);yield* gate(c,"air_exit");yield* go(c,28);};
const direct={air:function*(c){yield* go(c,28);},earth:function*(c){yield* go(c,38);},fire:function*(c){yield* go(c,38);},water:function*(c){yield* go(c,2);}};
const noReset={earth,air,fire:function*(c){yield* pull(c,3);yield* gate(c,"f1");yield* pull(c,14);c.flag("F1");yield* waitFlag(c,"W1");yield* go(c,24);},water};
const noReturn={earth,air,fire,water:function*(c){yield* pull(c,30);yield* gate(c,"w1");yield* pull(c,24);c.flag("W1");yield* gate(c,"w2");yield* pull(c,14);c.flag("W2");yield* gate(c,"w3");yield* pull(c,8);c.flag("W3");yield* go(c,2);}};
export const solutions={sets:[{elements:["fire","water","earth","air"],scripts:{fire,water,earth,air},shortcuts:[{name:"walk directly",scripts:direct},{name:"never reverse the rope",scripts:noReset,maxTicks:10000},{name:"skip the return to the east workshop",scripts:noReturn,maxTicks:10000},{name:"keep all four inputs on for the final exit",scripts:{fire,water,air,earth:function*(c){yield* pull(c,3);yield* gate(c,"e1");yield* pull(c,14);yield* gate(c,"e2");yield* pull(c,24);yield* gate(c,"e3");yield* pull(c,32);yield* go(c,38);}},maxTicks:10000}]}]};
