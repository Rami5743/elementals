import {go,interact,until,waitFlag,wait,IN_RIGHT,IN_LEFT} from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,9000,id);}
function* pull(c,x){yield* go(c,x);yield* interact(c);}
function* bridge(c,id,t){yield* until(c,()=>c.ent(id).s.open<=0&&c.ent(t).s.on,0,9000,id);}
function fireRun(mode="normal"){return function*(c){yield* gate(c,"f_start");yield* go(c,34);yield* gate(c,"f_west");if(mode!=="skip")yield* go(c,2);if(mode==="retry"){yield* go(c,10);yield* go(c,2);}yield* gate(c,"f_final");yield* pull(c,38);yield* go(c,38);};}
function waterRun(mode="normal"){return function*(c){if(mode!=="early")yield* bridge(c,"water_bridge","torch1");yield* pull(c,35);yield* gate(c,"w_west");yield* pull(c,3);yield* gate(c,"w_exit");yield* go(c,1);};}
function earthRun(mode="normal"){return function*(c){if(mode!=="early")yield* bridge(c,"earth_bridge","torch2");yield* pull(c,3);yield* gate(c,"e_east");yield* pull(c,36);yield* gate(c,"e_exit");yield* go(c,38);};}
const air=function*(c){yield* pull(c,6);yield* gate(c,"a_east");yield* pull(c,36);yield* gate(c,"a_west");yield* pull(c,2);yield* go(c,1);};
const fire=fireRun(),water=waterRun(),earth=earthRun();
export const solutions={sets:[{elements:["fire","water","earth","air"],scripts:{fire,water,earth,air},shortcuts:[{name:"cross Water's bridge before the beacon",scripts:{fire,water:waterRun("early"),earth,air}},{name:"cross Earth's bridge before the second beacon",scripts:{fire,water,earth:earthRun("early"),air}},{name:"skip lighting the second beacon",scripts:{fire:fireRun("skip"),water,earth,air}}]}]};
