import {go,interact,until,waitFlag,wait} from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,12000,id);}
function* on(c,id){yield* until(c,()=>c.ent(id).s.on===1,0,12000,id);}
function* launch(c){yield* go(c,10);yield* interact(c);}
function* runner(c,p){yield* gate(c,p+"_work");yield* go(c,35);yield* go(c,34);yield* interact(c);yield* go(c,7);yield* gate(c,p+"_exit");yield* go(c,1);}
function* fireMode(c,mode){yield* launch(c);c.flag("first");if(mode==="recover"){yield* until(c,()=>c.ent("slow_home").s.on===0,0,1000,"slow departed");yield* on(c,"slow_home");yield* on(c,"fast_home");if(c.ent("A_gate").s.open>0)throw Error("simultaneous launch unexpectedly passed");yield* launch(c);c.flag("second");}yield* runner(c,"F");}
function* waterMode(c,mode){yield* waitFlag(c,"first");if(mode==="recover"){yield* launch(c);yield* waitFlag(c,"second");}if(mode!=="same")yield* on(c,"cue");if(mode==="late")yield* wait(c,90);yield* launch(c);yield* runner(c,"W");}
function* earthMode(c,mode){yield* go(c,19);yield* gate(c,"E_silence");yield* go(c,mode==="noHeavy"?22:24);yield* gate(c,"A_gate");yield* waitFlag(c,"A_on");yield* go(c,34);yield* gate(c,"E_exit");yield* waitFlag(c,"A_exit");yield* go(c,37);}
function* air(c){yield* go(c,17);yield* gate(c,"E_silence");yield* go(c,29);yield* gate(c,"A_gate");yield* go(c,33);yield* on(c,"A_cert");c.flag("A_on");yield* gate(c,"E_exit");yield* go(c,38);c.flag("A_exit");}
const fire=c=>fireMode(c,"normal"),water=c=>waterMode(c,"normal"),earth=c=>earthMode(c,"normal");
export const solutions={sets:[{elements:["fire","water","earth","air"],scripts:{fire,water,earth,air},shortcuts:[{name:"launch both stones simultaneously",scripts:{fire,water:c=>waterMode(c,"same"),earth,air},maxTicks:6500},{name:"Air tries the heavy gate without Earth",scripts:{fire,water,earth:c=>earthMode(c,"noHeavy"),air},maxTicks:6500}]}]};