import {go,interact,until,waitFlag,wait} from "../../kit.mjs";
function* on(c,id){yield* until(c,()=>c.ent(id).s.on===1,0,10000,id);}
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,10000,id);}
function* launch(c){yield* go(c,12);yield* interact(c);}
function* fireMode(c,mode){yield* launch(c);c.flag("first");
 if(mode==="recover"){yield* until(c,()=>c.ent("slow_home").s.on===0,0,1000,"slow departed");yield* on(c,"slow_home");yield* on(c,"fast_home");if(c.ent("F_cross").s.open>0)throw Error("early launch unexpectedly succeeded");yield* launch(c);c.flag("second");}
 yield* gate(c,"F_cross");yield* go(c,35);yield* go(c,34);yield* interact(c);yield* go(c,8);yield* gate(c,"F_exit");yield* go(c,2);}
function* waterMode(c,mode){yield* waitFlag(c,"first");if(mode==="recover"){yield* launch(c);yield* waitFlag(c,"second");}
 if(mode!=="same")yield* on(c,"cue");if(mode==="late")yield* wait(c,90);yield* launch(c);
 yield* gate(c,"W_cross");yield* go(c,35);yield* go(c,34);yield* interact(c);yield* go(c,8);yield* gate(c,"W_exit");yield* go(c,2);}
const fire=c=>fireMode(c,"normal"),water=c=>waterMode(c,"normal");
const noLaunch=function*(c){yield* wait(c,5000);yield* go(c,2);};
export const solutions={sets:[{elements:["fire","water"],scripts:{fire,water},shortcuts:[{name:"launch the two clocks together",scripts:{fire,water:c=>waterMode(c,"same")},maxTicks:6500},{name:"never launch the faster clock",scripts:{fire,water:noLaunch},maxTicks:6500}]}]};