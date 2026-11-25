import { go, interact, until, waitFlag, wait } from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,3000,id);}
function* ride(c,i,from,to){const X=x=>i?39-x:x;yield* go(c,X(33));yield* until(c,()=>c.ent("lift"+i).s.y===from*32,0,1800,"lift");yield* go(c,X(36));yield* until(c,()=>c.me.grounded&&c.bottom===to*32,0,1800,"other floor");yield* go(c,X(33));}
const fire = function*(c){
 yield* go(c,14);yield* interact(c);
 yield* gate(c,"f1");yield* go(c,26);yield* interact(c);
 yield* gate(c,"f2a");yield* gate(c,"f2b");yield* ride(c,0,5,10);
 yield* go(c,25);yield* interact(c);
 yield* ride(c,0,10,5);yield* go(c,26);yield* interact(c);
 c.flag("l2_off");yield* ride(c,0,5,10);
 yield* go(c,34);c.flag("B_ready");yield* waitFlag(c,"A");
 yield* wait(c,100);yield* interact(c);
 yield* gate(c,"f3");yield* go(c,11);
 yield* gate(c,"f4");yield* go(c,3);yield* interact(c);yield* go(c,2);
};
const water = function*(c){
 yield* gate(c,"w0");yield* go(c,25);yield* interact(c);
 yield* gate(c,"w1");yield* go(c,13);yield* interact(c);
 yield* go(c,25);yield* interact(c);
 yield* go(c,13);c.flag("W_ready");
 yield* waitFlag(c,"l2_off");yield* gate(c,"w2a");yield* gate(c,"w2b");
 yield* ride(c,1,15,20);yield* go(c,5);yield* waitFlag(c,"B_ready");yield* interact(c);c.flag("A");
 yield* gate(c,"w3");yield* go(c,28);yield* gate(c,"w4");yield* go(c,37);
};
const straight={fire:function*(c){yield* go(c,33);yield* ride(c,0,5,10);yield* go(c,2);},water:function*(c){yield* go(c,6);yield* ride(c,1,15,20);yield* go(c,37);}};
const noUndo={fire,water:function*(c){yield* gate(c,"w0");yield* go(c,25);yield* interact(c);yield* gate(c,"w1");yield* go(c,13);yield* interact(c);yield* go(c,6);}};
const simultaneous = function*(c){
 yield* go(c,14);yield* interact(c);
 yield* gate(c,"f1");yield* go(c,26);yield* interact(c);
 yield* gate(c,"f2a");yield* gate(c,"f2b");yield* ride(c,0,5,10);
 yield* go(c,25);yield* interact(c);
 yield* ride(c,0,10,5);yield* go(c,26);yield* interact(c);
 c.flag("l2_off");yield* ride(c,0,5,10);
 yield* go(c,34);c.flag("B_ready");yield* waitFlag(c,"A");
 yield* interact(c);
 yield* gate(c,"f3");yield* go(c,11);
 yield* gate(c,"f4");yield* go(c,3);yield* interact(c);yield* go(c,2);
};
export const solutions={sets:[{elements:["fire","water"],scripts:{fire,water},shortcuts:[{name:"walk straight",scripts:straight},{name:"leave earlier levers on",scripts:noUndo,maxTicks:10000},{name:"start both clocks simultaneously",scripts:{fire:simultaneous,water},maxTicks:10000}]}]};
