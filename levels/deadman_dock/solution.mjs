import {go,interact,until,waitFlag,runJump,leap,jump,wait,IN_LEFT,IN_RIGHT} from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,4000,id);}
function* dock(c,x){yield* until(c,()=>c.ent("ferry").s.x===x*32,0,4000,"ferry at "+x);}
const fire=function*(c){
 yield* go(c,10);yield* interact(c);c.flag("start");
 yield* waitFlag(c,"motor_on");
 yield* dock(c,15);yield* runJump(c,10,12,15.5);yield* until(c,()=>c.me.grounded&&c.bottom===8*32&&c.tx>=15,0,300,"aboard ferry");
 yield* dock(c,27);yield* go(c,31);c.flag("landed");
 yield* gate(c,"far_gate");yield* go(c,37);yield* interact(c);c.flag("far");
 yield* go(c,31);c.flag("back_at_dock");
 yield* waitFlag(c,"motor_again");yield* dock(c,27);yield* go(c,28);
 yield* dock(c,15);yield* go(c,15);yield* runJump(c,17,15,12);yield* until(c,()=>c.me.grounded&&c.bottom===8*32&&c.tx<13,0,300,"left bank");
 yield* gate(c,"home");yield* go(c,6);yield* interact(c);yield* go(c,5);
};
const water=function*(c){
 yield* gate(c,"w0");yield* go(c,25);yield* interact(c);c.flag("motor_on");
 yield* waitFlag(c,"landed");yield* interact(c);
 yield* gate(c,"w1");yield* go(c,13);yield* interact(c);c.flag("ack");
 yield* go(c,25);yield* waitFlag(c,"back_at_dock");yield* interact(c);c.flag("motor_again");
 yield* gate(c,"w2");yield* go(c,2);
};
const straight={fire:function*(c){yield* go(c,5)},water:function*(c){yield* go(c,2)}};
const keepOn={fire,water:function*(c){yield* gate(c,"w0");yield* go(c,25);yield* interact(c);c.flag("motor_on");yield* waitFlag(c,"landed");yield* go(c,13);}};
export const solutions={sets:[{elements:["fire","water"],scripts:{fire,water},shortcuts:[{name:"go directly home",scripts:straight},{name:"keep the motor running throughout",scripts:keepOn,maxTicks:12000}]}]};
