import {go,until,interact,wait,waitFlag,TILE} from "../../kit.mjs";
function* gate(c,id,n=96){yield* until(c,()=>c.ent(id).s.open>=n,0,15000,id);}
function* pull(c,x){yield* go(c,x);yield* interact(c);}
function* floor(c,row){yield* until(c,()=>c.me.grounded&&c.bottom===row*TILE,0,3000,"floor "+row);}
function* ride(c){yield* go(c,18);yield* until(c,()=>c.ent("lift").s.y===9*TILE,0,3000,"lift bottom");yield* go(c,20);yield* floor(c,5);yield* go(c,17);}
function* pulse(c){yield* go(c,10);yield* interact(c);yield* floor(c,9);}
const fireMode=(mode="normal")=>function*(c){
 yield* go(c,19);c.flag("fire_ready");yield* waitFlag(c,"first_pulse");
 if(mode==="miss"){yield* waitFlag(c,"retry_pulse");}
 if(mode==="delay"){yield* wait(c,90);}
 yield* gate(c,"Fgate");yield* pull(c,33);c.flag("Freceipt");yield* go(c,25);c.flag("fire_return");
 yield* waitFlag(c,"second_pulse");if(mode==="delay")yield* wait(c,90);yield* gate(c,"Fgate");yield* go(c,9);yield* gate(c,"Fend");yield* go(c,2);
};
const waterMode=(mode="normal")=>function*(c){
 yield* go(c,19);c.flag("water_ready");yield* waitFlag(c,"second_pulse");if(mode==="delay")yield* wait(c,90);yield* gate(c,"Wgate");if(mode!=="skip")yield* pull(c,35);else yield* go(c,35);yield* gate(c,"Wend");yield* go(c,38);
};
const earthMode=(mode="normal")=>function*(c){
 yield* pull(c,30);c.flag("armed");yield* waitFlag(c,"Areceipt");if(mode!=="retain")yield* interact(c);yield* gate(c,"Eoff");yield* gate(c,"EreceiptGate");yield* pull(c,2);c.flag("second_armed");yield* gate(c,"Eend");yield* pull(c,37);yield* go(c,38);
};
const airMode=(mode="normal")=>function*(c){
 yield* gate(c,"Astart");yield* waitFlag(c,"fire_ready");yield* pulse(c);c.flag("first_pulse");
 if(mode==="miss"){yield* ride(c);yield* until(c,()=>c.ent("drop").s.open===0,0,1500,"floor restored");yield* pulse(c);c.flag("retry_pulse");}
 yield* waitFlag(c,"Freceipt");yield* gate(c,"Alower");yield* pull(c,30);c.flag("Areceipt");
 yield* go(c,22);yield* until(c,()=>c.ent("lift").s.y===9*TILE,0,3000,"lift bottom");yield* go(c,20);yield* floor(c,5);yield* go(c,17);
 yield* waitFlag(c,"second_armed");yield* waitFlag(c,"fire_return");yield* waitFlag(c,"water_ready");yield* until(c,()=>c.ent("drop").s.open===0,0,1500,"floor restored");
 if(mode!=="skip")yield* pulse(c);c.flag("second_pulse");yield* gate(c,"Aend");yield* pull(c,37);yield* go(c,38);
};
const fire=fireMode(),water=waterMode(),earth=earthMode(),air=airMode();
export const solutions={sets:[{elements:["fire","water","earth","air"],scripts:{fire,water,earth,air},shortcuts:[{name:"never revoke first permit",scripts:{fire,water,earth:earthMode("retain"),air}},{name:"omit second pulse",scripts:{fire,water,earth,air:airMode("skip")}},{name:"omit Water's final receipt",scripts:{fire,water:waterMode("skip"),earth,air}}]}]};
