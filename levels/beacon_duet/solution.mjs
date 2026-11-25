import {go,interact,until,waitFlag} from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,9000,id);}
function* pull(c,x){yield* go(c,x);yield* interact(c);}
function* bridge(c,id,t){yield* until(c,()=>c.ent(id).s.open<=0&&c.ent(t).s.on,0,9000,id);}
function* fall(c,r){yield* go(c,4);yield* until(c,()=>c.me.grounded&&c.bottom===r*32,0,900,"lower floor");}
function fireRun(mode="normal"){return function*(c){yield* gate(c,"f_east");yield* go(c,36);if(mode==="detour"){yield* go(c,29);yield* go(c,36);}yield* gate(c,"f_west");yield* pull(c,2);yield* fall(c,10);c.flag("Fdown");yield* gate(c,"f_start2");if(mode!=="skip2")yield* go(c,35);yield* gate(c,"f_west2");yield* pull(c,1);yield* gate(c,"f_finish");yield* go(c,38);};}
function waterRun(mode="normal"){return function*(c){yield* pull(c,9);if(mode!=="early")yield* bridge(c,"bridge1","torch1");yield* pull(c,36);yield* waitFlag(c,"Fdown");if(mode!=="retain")yield* interact(c);yield* gate(c,"w_inverse");yield* fall(c,19);yield* pull(c,7);yield* bridge(c,"bridge2","torch2");yield* pull(c,36);yield* gate(c,"w_finish");yield* go(c,1);};}
const fire=fireRun(),water=waterRun();
export const solutions={sets:[{elements:["fire","water"],scripts:{fire,water},shortcuts:[{name:"cross the first gap before the beacon",scripts:{fire,water:waterRun("early")}},{name:"retain the temporary authorization",scripts:{fire,water:waterRun("retain")}},{name:"omit the second beacon",scripts:{fire:fireRun("skip2"),water}}]}]};