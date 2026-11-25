import {go,interact,until,waitFlag,wait} from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,10000,id);}
function* pull(c,x){yield* go(c,x);yield* interact(c);}
function* on(c,id){yield* until(c,()=>c.ent(id).s.on===1,0,10000,id);}
function fireRun(mode="normal"){return function*(c){yield* pull(c,6);c.flag("launch1");if(mode==="missWater"){yield* wait(c,2800);yield* interact(c);c.flag("launch2");}yield* gate(c,"f_access");yield* gate(c,"f_inverse");yield* go(c,23);if(mode==="missFire"){yield* on(c,"home");yield* pull(c,6);yield* gate(c,"f_inverse");yield* go(c,23);}yield* gate(c,"f_mid");if(mode==="delay")yield* wait(c,90);yield* pull(c,31);yield* gate(c,"f_final");yield* go(c,38);};}
function waterRun(mode="normal"){return function*(c){yield* go(c,10);if(mode==="missWater")yield* waitFlag(c,"launch2");yield* gate(c,"w_mid");if(mode==="delay")yield* wait(c,90);yield* pull(c,18);yield* gate(c,"w_far");if(mode!=="skip")yield* pull(c,30);yield* gate(c,"w_west");yield* pull(c,2);yield* go(c,1);};}
const fire=fireRun(),water=waterRun();
const noClock=function*(c){yield* go(c,6);yield* wait(c,3000);yield* go(c,38);};
const earlyFire=function*(c){yield* pull(c,6);yield* go(c,38);};
export const solutions={sets:[{elements:["fire","water"],scripts:{fire,water},shortcuts:[{name:"leave the clock off",scripts:{fire:noClock,water}},{name:"omit the far certificate",scripts:{fire,water:waterRun("skip")}},{name:"Fire walks through during outward stroke",scripts:{fire:earlyFire,water}}]}]};