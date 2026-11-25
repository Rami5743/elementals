import {go,interact,until,waitFlag,wait,pound,IN_JUMP,IN_DOWN} from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,10000,id);}
function* on(c,id){yield* until(c,()=>c.ent(id).s.on===1,0,10000,id);}
function* pull(c,x){yield* go(c,x);yield* interact(c);}
function* earthMode(c,mode){yield* gate(c,"e_access");yield* go(c,22);if(mode==="noDrop"){yield* wait(c,5000);return;}for(let i=0;i<14;i++)yield IN_JUMP;yield* pound(c);yield* until(c,()=>c.ent("slab").s.gone===1,0,800,"slab");for(let i=0;i<30;i++)yield IN_DOWN;yield* go(c,26);yield* gate(c,"e_east");yield* pull(c,34);yield* gate(c,"e_exit");yield* go(c,38);}
function* fireMode(c,mode){yield* gate(c,"f_access");yield* pull(c,15);if(mode==="early"){yield* pull(c,18);yield* on(c,"east");yield* interact(c);}yield* gate(c,"f_inverse");yield* gate(c,"f_west");yield* pull(c,28);yield* pull(c,18);yield* gate(c,"f_late");yield* pull(c,33);yield* go(c,18);if(mode!=="retain")yield* interact(c);yield* gate(c,"f_exit");yield* go(c,38);}
const fire=c=>fireMode(c,"normal"),earth=c=>earthMode(c,"normal");
export const solutions={sets:[{elements:["fire","earth"],scripts:{fire,earth},shortcuts:[{name:"keep the upper floor intact",scripts:{fire,earth:c=>earthMode(c,"noDrop")}},{name:"leave the register at the east end",scripts:{fire:c=>fireMode(c,"retain"),earth}}]}]};