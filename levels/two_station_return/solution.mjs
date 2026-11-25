import {go,interact,until,waitFlag,TILE} from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,10000,id);}
function* board(c){yield* gate(c,"shaft_gate");yield* go(c,4);yield* until(c,()=>Math.abs(c.ent("hoist").s.y-20*TILE)<.01,0,6000,"bottom berth");yield* go(c,3);}
function* top(c){yield* until(c,()=>c.me.grounded===1&&c.bottom<=4*TILE+.01,0,10000,"top berth");}
const fire=function*(c){yield* go(c,19);yield* interact(c);yield* go(c,22);yield* gate(c,"f1");yield* go(c,28);yield* interact(c);yield* gate(c,"f2");yield* go(c,34);yield* interact(c);c.flag("Fdone");yield* gate(c,"f3");yield* go(c,38);};
const water=function*(c){yield* go(c,22);yield* gate(c,"w1");yield* go(c,28);yield* interact(c);yield* gate(c,"w2");yield* go(c,38);};
const earth=function*(c){yield* board(c);yield* waitFlag(c,"Fdone");yield* top(c);yield* go(c,5);yield* gate(c,"loft_gate");yield* go(c,10);yield* interact(c);yield* go(c,13);};
const empty={fire,water,earth:function*(c){yield* gate(c,"shaft_gate");yield* go(c,4);yield* until(c,()=>false,0,18000,"empty lift");}};
const leaveEarly={fire,water,earth:function*(c){yield* board(c);yield* top(c);yield* go(c,5);yield* gate(c,"loft_gate");yield* go(c,10);yield* interact(c);yield* go(c,13);}};
export const solutions={sets:[{elements:["fire","water","earth"],scripts:{fire,water,earth},maxTicks:20000,shortcuts:[{name:"leave the lift empty",scripts:empty,maxTicks:14000},{name:"leave the lift at the first upper berth",scripts:leaveEarly,maxTicks:18000}]}]};