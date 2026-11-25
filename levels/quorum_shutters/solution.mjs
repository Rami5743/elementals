import {go,interact,until,waitFlag} from "../../kit.mjs";
function* gate(c,id,n){yield* until(c,()=>c.ent(id).s.open>=n,0,2000,id);}
function* state(c,a){yield* until(c,()=>c.ent("shutterA").s.open===(a?192:0)&&c.ent("shutterB").s.open===(a?0:192),0,2000,"shutters settled");}
const fire=function*(c){
 yield* waitFlag(c,"E_ready");yield* state(c,false);yield* go(c,19);yield* interact(c);c.flag("upper_on");
 yield* waitFlag(c,"lower_on");yield* interact(c);yield* state(c,true);
 yield* go(c,33);yield* interact(c);c.flag("F_far");
 yield* waitFlag(c,"lower_return");yield* state(c,true);yield* go(c,19);yield* interact(c);c.flag("upper_return");
 yield* waitFlag(c,"lower_left");yield* interact(c);yield* state(c,false);
 yield* gate(c,"f_left_gate",96);yield* go(c,3);yield* interact(c);c.flag("F_left");
 yield* waitFlag(c,"E_certified2");yield* go(c,19);yield* interact(c);c.flag("upper_on2");yield* waitFlag(c,"lower_on2");yield* interact(c);yield* state(c,true);
 yield* gate(c,"f_final_gate",96);yield* go(c,37);yield* interact(c);c.flag("F_final");
 yield* waitFlag(c,"lower_return2");yield* state(c,true);yield* go(c,19);c.flag("F_middle2");yield* state(c,false);yield* gate(c,"f_exit",96);yield* go(c,1);c.flag("F_home");
};
const water=function*(c){
 yield* waitFlag(c,"upper_on");yield* state(c,true);yield* go(c,19);yield* interact(c);c.flag("lower_on");
 yield* waitFlag(c,"F_far");yield* interact(c);yield* state(c,false);
 yield* gate(c,"w_far_gate",128);yield* go(c,35);yield* interact(c);c.flag("W_far");yield* waitFlag(c,"E_certified1");
 yield* go(c,19);yield* interact(c);c.flag("lower_return");
 yield* waitFlag(c,"upper_return");yield* interact(c);yield* state(c,true);
 yield* gate(c,"w_left_gate",128);yield* go(c,3);yield* interact(c);c.flag("lower_left");
 yield* waitFlag(c,"upper_on2");yield* state(c,true);yield* go(c,19);yield* interact(c);c.flag("lower_on2");
 yield* waitFlag(c,"F_final");yield* interact(c);yield* state(c,false);yield* gate(c,"w_final_gate",128);yield* go(c,38);yield* gate(c,"f_exit",96);
 yield* go(c,19);yield* interact(c);c.flag("lower_return2");yield* waitFlag(c,"F_middle2");yield* interact(c);yield* state(c,false);yield* go(c,38);
};
const earth=function*(c){yield* go(c,3);yield* interact(c);c.flag("E_ready");yield* waitFlag(c,"W_far");yield* interact(c);yield* gate(c,"e_first",96);yield* go(c,14);yield* interact(c);yield* go(c,3);yield* interact(c);c.flag("E_certified1");yield* waitFlag(c,"F_left");yield* waitFlag(c,"lower_left");yield* go(c,3);yield* interact(c);yield* gate(c,"e_second",96);yield* go(c,24);yield* interact(c);yield* go(c,3);yield* interact(c);c.flag("E_certified2");yield* waitFlag(c,"F_home");yield* interact(c);yield* gate(c,"e_exit",96);yield* go(c,37);};
const straight={earth:function*(c){yield* go(c,37)},fire:function*(c){yield* go(c,1)},water:function*(c){yield* go(c,38)}};
const noHandoff={fire,earth,water:function*(c){yield* waitFlag(c,"upper_on");yield* state(c,true);yield* go(c,19);c.flag("lower_on");yield* waitFlag(c,"F_far");yield* go(c,35)}};
const retainLower={fire,earth,water:function*(c){yield* waitFlag(c,"upper_on");yield* state(c,true);yield* go(c,19);yield* interact(c);c.flag("lower_on");yield* waitFlag(c,"F_far");yield* go(c,35)}};
export const solutions={sets:[{elements:["fire","water","earth"],scripts:{fire,water,earth},shortcuts:[{name:"go straight to exits",scripts:straight},{name:"release the upper key without a lower handoff",scripts:noHandoff,maxTicks:12000},{name:"retain the lower key during the lower crossing",scripts:retainLower,maxTicks:12000}]}]};
