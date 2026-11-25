import {go,interact,until,waitFlag,wait} from "../../kit.mjs";
function* gate(c,id,n=96){yield* until(c,()=>c.ent(id).s.open>=n,0,12000,id);}
function* pull(c,x){yield* go(c,x);yield* interact(c);}
function* shutter(c,id,open){yield* until(c,()=>c.ent(id).s.open===(open?192:0),0,12000,id);}
const fire=function*(c){
 yield* pull(c,19);c.flag("f_mid");
 yield* shutter(c,"shutterB",false);yield* pull(c,33);c.flag("f_far");
 yield* waitFlag(c,"w_return");yield* shutter(c,"shutterB",false);yield* go(c,19);c.flag("f_return");
 yield* shutter(c,"shutterA",false);yield* gate(c,"f_left_gate");yield* pull(c,3);c.flag("f_left");
 yield* waitFlag(c,"w_left");yield* shutter(c,"shutterA",false);yield* go(c,19);c.flag("f_mid2");
 yield* shutter(c,"shutterB",false);yield* gate(c,"f_final_gate");yield* pull(c,37);c.flag("f_final");
 yield* waitFlag(c,"w_final");yield* shutter(c,"shutterB",false);yield* go(c,19);c.flag("f_return2");
 yield* shutter(c,"shutterA",false);yield* gate(c,"f_exit");yield* go(c,1);
};
const water=function*(c){
 yield* shutter(c,"shutterA",true);yield* pull(c,19);c.flag("w_mid");
 yield* waitFlag(c,"f_far");yield* shutter(c,"shutterB",true);yield* gate(c,"w_far_gate",128);yield* pull(c,35);c.flag("w_far");
 yield* go(c,19);c.flag("w_return");
 yield* waitFlag(c,"f_left");yield* shutter(c,"shutterA",true);yield* gate(c,"w_left_gate",128);yield* pull(c,3);c.flag("w_left");
 yield* waitFlag(c,"f_mid2");yield* shutter(c,"shutterA",true);yield* go(c,19);c.flag("w_mid2");
 yield* waitFlag(c,"f_final");yield* shutter(c,"shutterB",true);yield* gate(c,"w_final_gate",128);yield* go(c,38);c.flag("w_final");
 yield* go(c,19);c.flag("w_return2");yield* waitFlag(c,"f_return2");yield* shutter(c,"shutterB",true);yield* go(c,38);
};
const earthMode=(mode="normal")=>function*(c){
 yield* gate(c,"Estart");yield* pull(c,12);yield* waitFlag(c,"f_return");yield* interact(c);
 yield* gate(c,"Eoff");yield* gate(c,"EreceiptGate");yield* gate(c,"Eother");if(mode!=="skip")yield* pull(c,28);else yield* go(c,28);
 yield* go(c,12);yield* waitFlag(c,"f_left");if(mode!=="retain")yield* interact(c);
 yield* waitFlag(c,"w_left");yield* interact(c);yield* waitFlag(c,"f_mid2");yield* interact(c);
 yield* waitFlag(c,"w_mid2");yield* interact(c);yield* waitFlag(c,"f_return2");yield* gate(c,"Eend");yield* go(c,38);
};
const airMode=(mode="normal")=>function*(c){
 yield* gate(c,"Astart");yield* pull(c,12);yield* waitFlag(c,"f_far");yield* interact(c);
 yield* gate(c,"Aoff");yield* gate(c,"AreceiptGate");yield* gate(c,"Aother");if(mode!=="skip")yield* pull(c,28);else yield* go(c,28);
 yield* go(c,12);yield* waitFlag(c,"w_return");yield* interact(c);
 yield* waitFlag(c,"f_return");yield* waitFlag(c,"f_final");yield* interact(c);
 yield* waitFlag(c,"w_return2");yield* interact(c);yield* waitFlag(c,"f_return2");yield* interact(c);
 yield* gate(c,"Aend");yield* go(c,38);
};
const earth=earthMode(),air=airMode();
export const solutions={sets:[{elements:["fire","water","earth","air"],scripts:{fire,water,earth,air},shortcuts:[{name:"omit lower shutter receipt",scripts:{fire,water,earth:earthMode("skip"),air}},{name:"omit second shutter receipt",scripts:{fire,water,earth,air:airMode("skip")}},{name:"keep first bridge closed",scripts:{fire,water,earth:earthMode("retain"),air}}]}]};
