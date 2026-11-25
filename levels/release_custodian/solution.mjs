import {go,interact,until,waitFlag,wait,pound,IN_JUMP,IN_DOWN} from "../../kit.mjs";
function* gate(c,id,h=96){yield* until(c,()=>c.ent(id).s.open>=h,0,15000,id);}
function* on(c,id){yield* until(c,()=>c.ent(id).s.on===1,0,15000,id);}
function* pull(c,x){yield* go(c,x);yield* interact(c);}
function* earth(c){yield* gate(c,"e_access");yield* go(c,22);for(let i=0;i<14;i++)yield IN_JUMP;yield* pound(c);yield* until(c,()=>c.ent("slab").s.gone===1,0,800,"slab");for(let i=0;i<30;i++)yield IN_DOWN;yield* go(c,26);yield* gate(c,"e_east",64);yield* pull(c,34);yield* gate(c,"e_exit",64);yield* go(c,38);}
function* fire(c){yield* gate(c,"f_access");yield* pull(c,15);yield* gate(c,"f_inverse");yield* gate(c,"f_west");yield* pull(c,28);c.flag("Fwest");yield* gate(c,"f_exit");yield* go(c,38);}
function* water(c){yield* gate(c,"w_access");yield* pull(c,22);yield* gate(c,"w_inverse");yield* gate(c,"w_west");yield* pull(c,10);c.flag("Wwest");yield* gate(c,"w_east");yield* pull(c,4);c.flag("Wlast");yield* gate(c,"w_exit");yield* go(c,1);}
function* airMode(c,mode){yield* gate(c,"a_access",64);yield* go(c,27);if(mode==="noApproval"){yield* wait(c,6000);return;}yield* pull(c,29);yield* go(c,25);if(mode==="early"){yield* interact(c);yield* on(c,"east");yield* interact(c);}yield* waitFlag(c,"Fwest");yield* waitFlag(c,"Wwest");yield* interact(c);yield* waitFlag(c,"Wlast");if(mode!=="retain")yield* interact(c);yield* gate(c,"a_exit",64);yield* go(c,38);}
const air=c=>airMode(c,"normal");
export const solutions={sets:[{elements:["fire","water","earth","air"],scripts:{fire,water,earth,air},shortcuts:[{name:"omit custodian approval",scripts:{fire,water,earth,air:c=>airMode(c,"noApproval")}},{name:"keep the register east",scripts:{fire,water,earth,air:c=>airMode(c,"retain")}}]}]};