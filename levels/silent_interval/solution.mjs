import {go,interact,until,waitFlag,wait} from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,12000,id);}
function* on(c,id){yield* until(c,()=>c.ent(id).s.on===1,0,12000,id);}
function* launch(c){yield* go(c,10);yield* interact(c);}
function* runner(c,p){yield* gate(c,p+"_work");yield* go(c,35);yield* go(c,34);yield* interact(c);yield* go(c,7);yield* gate(c,p+"_exit");yield* go(c,1);}
function* fireMode(c,mode){yield* launch(c);c.flag("first");if(mode==="recover"){yield* until(c,()=>c.ent("slow_home").s.on===0,0,1000,"slow departed");yield* on(c,"slow_home");yield* on(c,"fast_home");if(c.ent("E_cert").s.on)throw Error("simultaneous launch unexpectedly passed");yield* launch(c);c.flag("second");}yield* runner(c,"F");}
function* waterMode(c,mode){yield* waitFlag(c,"first");if(mode==="recover"){yield* launch(c);yield* waitFlag(c,"second");}if(mode!=="same")yield* on(c,"cue");if(mode==="late")yield* wait(c,90);yield* launch(c);yield* runner(c,"W");}
function* earth(c){yield* go(c,18);yield* gate(c,"E_silence");yield* go(c,28);yield* interact(c);yield* go(c,34);yield* gate(c,"E_exit");yield* go(c,38);}
const fire=c=>fireMode(c,"normal"),water=c=>waterMode(c,"normal");
const idle=function*(c){yield* wait(c,6000);yield* go(c,1);};
export const solutions={sets:[{elements:["fire","water","earth"],scripts:{fire,water,earth},shortcuts:[{name:"launch both stones together",scripts:{fire,water:c=>waterMode(c,"same"),earth},maxTicks:6500},{name:"leave one veto permanently active",scripts:{fire,water:idle,earth},maxTicks:6500}]}]};