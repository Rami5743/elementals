import { go, interact, until, waitFlag, jump } from "../../kit.mjs";
const full = (c,id) => c.ent(id).s.open>=96;
function* gate(c,id){yield* until(c,()=>full(c,id),0,3000,id);}
function* floor(c,row){yield* until(c,()=>c.me.grounded && c.bottom===row*32,0,3000,"floor "+row);}
const fire = function* (c) {
 yield* gate(c,"f_upper");
 yield* go(c,29);
 yield* floor(c,15);
 yield* go(c,15);
 yield* interact(c);
 c.flag("lower");
 yield* go(c,29);
 c.flag("aboard");
 yield* floor(c,9);
 yield* gate(c,"f_right");
 yield* go(c,36);
 yield* interact(c);
 c.flag("upper");
 yield* go(c,32);
 yield* waitFlag(c,"rewrite");
 yield* go(c,29);
 yield* floor(c,15);
 yield* go(c,16);
 c.flag("rewritten");
 yield* waitFlag(c,"c_set");
 yield* go(c,29);
 c.flag("last_aboard");
 yield* floor(c,9);
 yield* go(c,13);
 c.flag("fire_home_side");
 yield* until(c,()=>c.ent("recall").s.y===9*32,0,1800,"return lift");
 yield* go(c,10);
 yield* gate(c,"f_exit");
 yield* go(c,2);
};
const water=function*(c){
 yield* gate(c,"w_first");yield* go(c,15);
 yield* waitFlag(c,"aboard");yield* waitFlag(c,"D_on");yield* interact(c);
 yield* gate(c,"w_second");yield* go(c,26);
 yield* waitFlag(c,"upper");yield* go(c,15);yield* interact(c);
 c.flag("rewrite");
 yield* gate(c,"w_final");yield* go(c,32);yield* interact(c);c.flag("c_set");
 yield* go(c,15);yield* waitFlag(c,"last_aboard");yield* interact(c);c.flag("B_on");
 yield* waitFlag(c,"fire_home_side");yield* gate(c,"w_high");yield* go(c,35);yield* interact(c);yield* go(c,15);yield* interact(c);yield* gate(c,"w_finish");yield* go(c,37);
};
const earth=function*(c){
 yield* go(c,9);yield* interact(c);
 yield* gate(c,"e1");yield* go(c,19);yield* interact(c);
 yield* waitFlag(c,"rewrite");yield* go(c,9);yield* interact(c);
 yield* waitFlag(c,"B_on");yield* interact(c);
 yield* waitFlag(c,"fire_home_side");yield* interact(c);
 yield* gate(c,"e_exit");yield* go(c,23);
};
const air=function*(c){
 yield* gate(c,"air_start");yield* go(c,30);yield* interact(c);c.flag("D_on");
 yield* waitFlag(c,"fire_home_side");yield* interact(c);
 yield* gate(c,"e_inv");yield* gate(c,"e2");yield* go(c,36);yield* interact(c);yield* go(c,37);
};
const straight={fire:function*(c){yield* go(c,29);yield* floor(c,15);yield* go(c,2);},water:function*(c){yield* go(c,37);},earth:function*(c){yield* go(c,23);},air:function*(c){yield* go(c,37);}};
const noErase={fire,earth,air,water:function*(c){yield* gate(c,"w_first");yield* go(c,15);yield* waitFlag(c,"aboard");yield* go(c,26);}};
export const solutions={sets:[{elements:["fire","water","earth","air"],scripts:{fire,water,earth,air},shortcuts:[{name:"walk directly to exits",scripts:straight},{name:"leave rope at bottom",scripts:noErase,maxTicks:10000}]}]};
