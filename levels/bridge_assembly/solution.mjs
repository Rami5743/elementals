import {go,interact,until,waitFlag} from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,5000,id);}
function* at(c,y){yield* until(c,()=>Math.abs(c.ent("bridge").s.y-y*32)<0.1,0,1800,"bridge at deck");}
function* pull(c,x){yield* go(c,x);yield* interact(c);}
const fire=function*(c){
 yield* pull(c,30);yield* go(c,19);c.flag("aboard1");yield* at(c,5);
 yield* pull(c,32);yield* go(c,19);c.flag("down1");yield* at(c,12);
 yield* gate(c,"west_lower");yield* pull(c,4);yield* go(c,19);c.flag("aboard2");yield* at(c,5);
 yield* gate(c,"west_upper");yield* pull(c,3);yield* go(c,19);c.flag("down2");yield* at(c,12);
 yield* gate(c,"east_exit");yield* go(c,38);
};
const water=function*(c){
 yield* gate(c,"control_access");yield* go(c,26);yield* waitFlag(c,"aboard1");yield* interact(c);
 yield* waitFlag(c,"down2");yield* interact(c);yield* gate(c,"water_inverse");yield* pull(c,34);yield* gate(c,"water_exit");yield* go(c,38);
};
const earth=function*(c){
 yield* go(c,15);yield* waitFlag(c,"aboard1");yield* interact(c);
 yield* waitFlag(c,"down1");yield* interact(c);
 yield* gate(c,"earth_inverse");yield* gate(c,"ack_access");yield* pull(c,6);
 yield* go(c,15);yield* waitFlag(c,"aboard2");yield* interact(c);
 yield* waitFlag(c,"down2");yield* interact(c);yield* gate(c,"earth_inverse");yield* gate(c,"earth_exit");yield* go(c,2);
};
const direct={fire:function*(c){yield* go(c,38);},water:function*(c){yield* go(c,38);},earth:function*(c){yield* go(c,2);}};
const noRelease={fire,water,earth:function*(c){yield* go(c,15);yield* waitFlag(c,"aboard1");yield* interact(c);yield* waitFlag(c,"down1");yield* go(c,6);yield* interact(c);yield* go(c,2);}};
const noWaterRelease={fire,earth,water:function*(c){yield* gate(c,"control_access");yield* go(c,26);yield* waitFlag(c,"aboard1");yield* interact(c);yield* waitFlag(c,"down2");yield* go(c,34);yield* interact(c);yield* go(c,38);}};
export const solutions={sets:[{elements:["fire","water","earth"],scripts:{fire,water,earth},shortcuts:[{name:"walk directly",scripts:direct},{name:"retain Earth approval",scripts:noRelease},{name:"retain Water approval",scripts:noWaterRelease}]}]};