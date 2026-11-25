import {go,interact,until,waitFlag,wait,IN_RIGHT,TILE,runJump} from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,8000,id);}
function* pull(c,x){yield* go(c,x);yield* interact(c);}
function* push(c,x){yield* until(c,()=>c.ent("stone").s.x>=x*TILE,IN_RIGHT,1800,"push stone to "+x);}
function carrier(mode="normal"){return function*(c){
 yield* push(c,5);yield* push(c,6.4);c.flag("ready");
 yield* gate(c,"in1");if(mode==="delay")yield* wait(c,90);if(mode==="miss"){yield* gate(c,"out1");c.flag("retry1");yield* gate(c,"in1");}
 yield* push(c,12);yield* gate(c,"out1");yield* push(c,19);c.flag("middle");
 yield* gate(c,"in2");if(mode==="delay")yield* wait(c,90);if(mode==="miss"){yield* gate(c,"out2");c.flag("retry2");yield* gate(c,"in2");}
 yield* push(c,26);yield* gate(c,"out2");
 if(mode==="body"){yield* runJump(c,23,24.8,28.5);yield* go(c,31);c.flag("stone_park");yield* gate(c,"final_door");yield* go(c,37);return;}
 yield* push(c,31.2);c.flag("stone_park");yield* gate(c,"final_door");yield* runJump(c,28,29.7,33.5);yield* go(c,37);
};}
function operator(mode="normal"){return function*(c){
 yield* gate(c,"clock_access");yield* go(c,2);yield* waitFlag(c,"ready");yield* interact(c);
 if(mode==="miss"){yield* waitFlag(c,"retry1");yield* interact(c);}
 yield* gate(c,"stage_access");yield* pull(c,31);if(mode==="one")return;
 yield* go(c,2);yield* waitFlag(c,"middle");yield* interact(c);
 if(mode==="miss"){yield* waitFlag(c,"retry2");yield* interact(c);}
 yield* waitFlag(c,"stone_park");if(mode!=="retain")yield* pull(c,31);yield* gate(c,"stage_inverse");yield* gate(c,"final_access");yield* pull(c,37);yield* go(c,2);
};}
const earth=carrier(),water=operator();
const direct={earth:function*(c){yield* go(c,37);},water:function*(c){yield* go(c,37);yield* interact(c);yield* go(c,2);}};
const early={earth,water:operator("one")};
const retain={earth,water:operator("retain")};
export const solutions={sets:[{elements:["water","earth"],scripts:{earth,water},shortcuts:[{name:"direct",scripts:direct},{name:"only one pulse",scripts:early},{name:"retain selector",scripts:retain},{name:"use Earth instead of the final cargo",scripts:{earth:carrier("body"),water}}]}]};
