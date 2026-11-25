import {go,interact,until,waitFlag,wait} from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,8000,id);}
function* pull(c,x){yield* go(c,x);yield* interact(c);}
function home(mode="normal"){return function*(c){yield* gate(c,"f1");yield* pull(c,16);yield* gate(c,"f2");yield* go(c,36);if(mode==="retry"){yield* wait(c,40);yield* go(c,30);yield* go(c,36);}if(mode==="stay")return;yield* waitFlag(c,"leftCert");yield* waitFlag(c,"Eleft");yield* go(c,7);yield* gate(c,"fback");yield* pull(c,2);if(mode==="never")return;yield* waitFlag(c,"lastCert");yield* go(c,36);};}
const fire=home();
const water=function*(c){yield* pull(c,3);yield* gate(c,"w1");yield* pull(c,16);yield* gate(c,"w2");yield* pull(c,25);c.flag("leftCert");yield* gate(c,"w3");yield* pull(c,32);c.flag("lastCert");yield* gate(c,"wfinal");yield* go(c,38);};
const earth=function*(c){yield* gate(c,"e1");yield* pull(c,12);yield* gate(c,"e_left");yield* pull(c,24);c.flag("Eleft");yield* gate(c,"e_last");yield* pull(c,34);yield* go(c,38);};
const air=function*(c){yield* gate(c,"a1");yield* pull(c,13);yield* gate(c,"a_back");yield* pull(c,26);yield* gate(c,"a_exit");yield* go(c,38);};
const direct={fire:function*(c){yield* go(c,36)},water:function*(c){yield* go(c,38)},earth:function*(c){yield* go(c,38)},air:function*(c){yield* go(c,38)}};
export const solutions={sets:[{elements:["fire","water","earth","air"],scripts:{fire,water,earth,air},shortcuts:[{name:"direct",scripts:direct},{name:"stay home after first arrival",scripts:{fire:home("stay"),water,earth,air}},{name:"never return home",scripts:{fire:home("never"),water,earth,air}}]}]};
