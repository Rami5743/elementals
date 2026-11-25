import {go,interact,until,wait} from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,12000,id);}
function* on(c,id){yield* until(c,()=>c.ent(id).s.on===1,0,12000,id);}
function* launch(c,x){yield* go(c,x);yield* interact(c);}
function* fireMode(c,mode){
 yield* launch(c,10);yield* go(c,14);
 if(mode==="recover"){yield* interact(c);yield* until(c,()=>!c.ent("slow_home").s.on&&!c.ent("fast_home").s.on,0,1000,"both departed");yield* on(c,"slow_home");yield* on(c,"fast_home");if(c.ent("E_cert").s.on)throw Error("early pair passed");yield* launch(c,10);yield* go(c,14);}
 if(mode!=="same"&&mode!=="omit")yield* on(c,"cue");
 if(mode==="late")yield* wait(c,90);
 if(mode!=="omit")yield* interact(c);
 yield* gate(c,"F_work");yield* go(c,35);yield* go(c,34);yield* interact(c);yield* go(c,7);yield* gate(c,"F_exit");yield* go(c,1);
}
function* water(c){yield* go(c,18);yield* gate(c,"E_silence");yield* go(c,28);yield* interact(c);yield* go(c,34);yield* gate(c,"E_exit");yield* go(c,38);}
const fire=c=>fireMode(c,"normal");
export const solutions={sets:[{elements:["fire","water"],scripts:{fire,water},shortcuts:[{name:"start both clocks immediately",scripts:{fire:c=>fireMode(c,"same"),water},maxTicks:6500},{name:"leave the fast veto at home",scripts:{fire:c=>fireMode(c,"omit"),water},maxTicks:6500}]}]};