import {go,interact,until,waitFlag,IN_LEFT,IN_RIGHT} from "../../kit.mjs";
function* gate(c,id,n=96){yield* until(c,()=>c.ent(id).s.open>=n,0,4000,id);}
function* rise(c,x,dir){yield* go(c,x);yield* until(c,()=>c.bottom<=4*32,0,1000,"up the shaft");yield* until(c,()=>c.me.grounded&&c.bottom===4*32,dir,500,"upper gallery");}
function* fall(c,id,x,dir){yield* until(c,()=>!c.ent(id).s.on,0,2000,"wind stopped");yield* until(c,()=>c.me.grounded&&c.bottom===10*32,dir,500,"side balcony");}
const fire=function*(c){
 yield* go(c,3);yield* interact(c);c.flag("start");yield* rise(c,9,IN_RIGHT);
 yield* gate(c,"top_gate");yield* go(c,25);c.flag("right_ready");
 yield* fall(c,"rightwind",30,IN_RIGHT);yield* go(c,35);yield* interact(c);c.flag("right_done");
 yield* until(c,()=>c.ent("rightwind").s.on,0,1000,"right wind restarts");yield* rise(c,29,IN_LEFT);
 yield* gate(c,"top_gate");yield* go(c,13);c.flag("left_ready");
 yield* fall(c,"leftwind",8,IN_LEFT);yield* go(c,4);yield* interact(c);c.flag("left_done");
 yield* gate(c,"f_exit");yield* go(c,1);
};
const water=function*(c){
 yield* go(c,33);yield* interact(c);yield* gate(c,"w0");yield* go(c,25);yield* waitFlag(c,"right_ready");yield* interact(c);
 yield* gate(c,"w1");yield* go(c,19);yield* waitFlag(c,"left_ready");yield* go(c,33);yield* interact(c);
 yield* gate(c,"w_inv");yield* go(c,15);yield* interact(c);
 yield* gate(c,"ack_gate");yield* go(c,37);yield* interact(c);yield* gate(c,"w2");yield* go(c,5);yield* interact(c);
 yield* go(c,33);yield* interact(c);yield* gate(c,"f_exit");yield* interact(c);yield* gate(c,"w_inv");yield* gate(c,"w_exit");yield* go(c,1);
};
const earth=function*(c){yield* gate(c,"e_gate");yield* go(c,22);yield* waitFlag(c,"left_ready");yield* interact(c);yield* gate(c,"e_exit");yield* go(c,25);yield* interact(c);yield* go(c,26);};
const air=function*(c){yield* gate(c,"a_gate",64);yield* go(c,22);yield* waitFlag(c,"right_ready");yield* interact(c);yield* gate(c,"a_exit",64);yield* go(c,25);yield* interact(c);yield* go(c,26);};
const straight={air:function*(c){yield* go(c,26)},earth:function*(c){yield* go(c,26)},fire:function*(c){yield* go(c,1)},water:function*(c){yield* go(c,1)}};
const noDrop={fire,earth,air,water:function*(c){yield* go(c,33);yield* interact(c);yield* gate(c,"w0");yield* go(c,25);yield* waitFlag(c,"right_ready");yield* gate(c,"w1");}};
const earlyClose={fire,earth,air,water:function*(c){yield* go(c,33);yield* interact(c);yield* gate(c,"w0");yield* go(c,25);yield* waitFlag(c,"right_ready");yield* interact(c);yield* gate(c,"w1");yield* go(c,33);yield* interact(c);yield* go(c,15);yield* interact(c);}};
export const solutions={sets:[{elements:["fire","water","earth","air"],scripts:{fire,water,earth,air},shortcuts:[{name:"walk straight",scripts:straight},{name:"keep the upward wind on",scripts:noDrop,maxTicks:10000},{name:"release the selector before Fire returns",scripts:earlyClose,maxTicks:10000}]}]};
