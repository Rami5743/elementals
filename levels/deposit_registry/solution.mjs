import {go,interact,until,waitFlag,wait} from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,7000,id);}
function* pull(c,x){yield* go(c,x);yield* interact(c);}
function first(mode="normal"){return function*(c){yield* gate(c,"f_lower");yield* pull(c,13);yield* gate(c,"f_control");yield* pull(c,20);
 if(mode==="interrupt"){yield* wait(c,25);yield* interact(c);yield* wait(c,110);yield* interact(c);}
 yield* waitFlag(c,"W2");yield* waitFlag(c,"E1");yield* waitFlag(c,"Ainspect");if(mode!=="raised")yield* interact(c);
 yield* gate(c,"f_inv");yield* gate(c,"f_Blower");yield* pull(c,31);yield* gate(c,"f_return");yield* pull(c,3);yield* gate(c,"f_high");yield* pull(c,35);c.flag("F3");yield* gate(c,"f_exit");yield* go(c,38);};}
const fire=first();
const water=function*(c){yield* gate(c,"w_lower");yield* pull(c,25);yield* gate(c,"w_high");yield* pull(c,18);c.flag("W2");yield* gate(c,"w_deposit");yield* gate(c,"w_Baccess");yield* pull(c,8);yield* waitFlag(c,"F3");yield* gate(c,"w_return");yield* pull(c,38);yield* gate(c,"w_inv");yield* pull(c,4);yield* gate(c,"w_exit");yield* go(c,1);};
function custodian(mode="normal"){return function*(c){yield* gate(c,"eA");yield* pull(c,12);c.flag("E1");yield* gate(c,"eBaccess");yield* pull(c,22);yield* waitFlag(c,"F3");if(mode!=="raised")yield* interact(c);yield* gate(c,"e_inverse");yield* gate(c,"e_certaccess");yield* pull(c,32);yield* gate(c,"e_exit");yield* go(c,38);};}
const earth=custodian();
const direct={fire:function*(c){yield* go(c,38)},water:function*(c){yield* go(c,1)},earth:function*(c){yield* go(c,38)}};
function registrar(mode="normal"){return function*(c){yield* until(c,()=>c.ent("a_low").s.open>=64,0,8000,"both lower contacts");if(mode==="skip")return;yield* pull(c,12);yield* until(c,()=>c.ent("a_high").s.open>=64,0,8000,"high inspection");yield* pull(c,21);c.flag("Ainspect");yield* until(c,()=>c.ent("a_deposit").s.open>=64,0,8000,"both deposits");yield* pull(c,30);yield* go(c,38);};}
const air=registrar();
export const solutions={sets:[{elements:["fire","water","earth","air"],scripts:{fire,water,earth,air},shortcuts:[{name:"direct",scripts:{...direct,air:function*(c){yield* go(c,38)}}},{name:"leave first hoist raised",scripts:{fire:first("raised"),water,earth,air}},{name:"leave second hoist raised",scripts:{fire,water,earth:custodian("raised"),air}},{name:"skip lower inspection",scripts:{fire,water,earth,air:registrar("skip")}}]}]};
