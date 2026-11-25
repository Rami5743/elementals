import {go,interact,until,waitFlag,wait,IN_RIGHT,TILE,runJump} from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,5000,id);}
function* pull(c,x){yield* go(c,x);yield* interact(c);}
function* push(c,x){yield* until(c,()=>c.ent("stone").s.x>=x*TILE,IN_RIGHT,1800,"push stone to "+x);}
const fire=function*(c){
 yield* pull(c,6);yield* go(c,7);c.flag("start");
 yield* gate(c,"in1");yield* go(c,14);yield* gate(c,"out1");yield* pull(c,20);yield* go(c,21);c.flag("middle");
 yield* gate(c,"in2");yield* go(c,28);yield* gate(c,"out2");yield* go(c,35);c.flag("fire_clear");
 yield* gate(c,"final_door");yield* go(c,38);
};
const earth=function*(c){
 yield* waitFlag(c,"start");yield* gate(c,"in1");yield* push(c,12);yield* gate(c,"out1");yield* push(c,19);c.flag("earth_mid");
 yield* gate(c,"in2");yield* push(c,26);yield* gate(c,"out2");yield* waitFlag(c,"fire_clear");yield* push(c,31.2);c.flag("stone_park");
 yield* gate(c,"final_door");yield* runJump(c,28,29.7,33.5);yield* go(c,37);
};
const water=function*(c){
 yield* gate(c,"clock_access");yield* go(c,5);yield* waitFlag(c,"start");yield* interact(c);
 yield* gate(c,"stage_access");yield* pull(c,28);yield* go(c,5);yield* waitFlag(c,"earth_mid");yield* waitFlag(c,"air_ready");yield* interact(c);
 yield* waitFlag(c,"stone_park");yield* pull(c,28);yield* gate(c,"stage_inverse");yield* gate(c,"final_access");yield* pull(c,37);yield* go(c,2);
};
const air=function*(c){yield* pull(c,4);yield* gate(c,"air_access");yield* pull(c,20);c.flag("air_ready");yield* waitFlag(c,"stone_park");yield* interact(c);yield* gate(c,"air_inverse");yield* gate(c,"air_final_access");yield* pull(c,37);yield* go(c,2);};
const direct={air:function*(c){yield* go(c,2);},fire:function*(c){yield* go(c,38);},earth:function*(c){yield* go(c,37);},water:function*(c){yield* go(c,2);}};
const oneClock={fire,earth,air,water:function*(c){yield* gate(c,"clock_access");yield* go(c,5);yield* waitFlag(c,"start");yield* interact(c);yield* gate(c,"stage_access");yield* pull(c,28);yield* go(c,37);}};
const leaveSelector={fire,earth,air,water:function*(c){yield* gate(c,"clock_access");yield* go(c,5);yield* waitFlag(c,"start");yield* interact(c);yield* gate(c,"stage_access");yield* pull(c,28);yield* go(c,5);yield* waitFlag(c,"earth_mid");yield* interact(c);yield* waitFlag(c,"stone_park");yield* go(c,37);yield* interact(c);yield* go(c,2);}};
const earthAsStone=function*(c){
 yield* waitFlag(c,"start");yield* gate(c,"in1");yield* push(c,12);yield* gate(c,"out1");yield* push(c,19);c.flag("earth_mid");
 yield* gate(c,"in2");yield* push(c,26);yield* gate(c,"out2");yield* waitFlag(c,"fire_clear");yield* runJump(c,24,25.1,28.6);yield* go(c,31);c.flag("stone_park");yield* gate(c,"final_door");yield* go(c,37);
};
export const solutions={sets:[{elements:["fire","water","earth","air"],scripts:{fire,water,earth,air},shortcuts:[{name:"use Earth rather than the stone as the final contact",scripts:{fire,water,air,earth:earthAsStone}},{name:"direct",scripts:direct},{name:"only one clock cycle",scripts:oneClock},{name:"leave selector armed",scripts:leaveSelector},{name:"retain Air selector",scripts:{fire,water,earth,air:function*(c){yield* pull(c,4);yield* gate(c,"air_access");yield* pull(c,20);c.flag("air_ready");yield* waitFlag(c,"stone_park");yield* go(c,37);yield* interact(c);yield* go(c,2);}}}]}]};