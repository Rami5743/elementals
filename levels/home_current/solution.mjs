import {go,interact,until,waitFlag} from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,6000,id);}
function* pull(c,x){yield* go(c,x);yield* interact(c);}
const fire=function*(c){yield* gate(c,"f1");yield* pull(c,16);yield* gate(c,"f2");yield* go(c,36);yield* waitFlag(c,"leftCert");yield* gateBack(c);yield* pull(c,2);yield* waitFlag(c,"lastCert");yield* go(c,36);};
function* gateBack(c){yield* go(c,7);yield* gate(c,"fback");}
const water=function*(c){yield* pull(c,3);yield* gate(c,"w1");yield* pull(c,16);yield* gate(c,"w2");yield* pull(c,25);c.flag("leftCert");yield* gate(c,"w3");yield* pull(c,32);c.flag("lastCert");yield* gate(c,"wfinal");yield* go(c,38);};
const direct={fire:function*(c){yield* go(c,36);},water:function*(c){yield* go(c,38);}};
const stay={fire:function*(c){yield* gate(c,"f1");yield* pull(c,16);yield* gate(c,"f2");yield* go(c,36);},water};
const noReturn={fire:function*(c){yield* gate(c,"f1");yield* pull(c,16);yield* gate(c,"f2");yield* go(c,36);yield* waitFlag(c,"leftCert");yield* gateBack(c);yield* pull(c,2);},water};
export const solutions={sets:[{elements:["fire","water"],scripts:{fire,water},shortcuts:[{name:"walk directly",scripts:direct},{name:"stay at the exit after first arrival",scripts:stay},{name:"never return to the exit after the right certificate",scripts:noReturn}]}]};