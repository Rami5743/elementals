import {go,interact,until,waitFlag} from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,4000,id);}
function* sensor(c,id){yield* until(c,()=>c.ent(id).s.on,0,4000,id);}
function* berth(c){yield* until(c,()=>c.ent("stone").s.x>=4*32&&c.ent("stone").s.x<5*32&&c.ent("stone").s.y>=3*32,0,3000,"stone at loading berth");}
function* lift(c,on){yield* go(c,3);yield* interact(c);yield* until(c,()=>c.ent("lift").s.x===(on?30:2)*32&&c.ent("lift").s.y===(on?2:4)*32,0,3000,"shuttle at "+(on?"far":"home"));}
const fire=function*(c){
 yield* waitFlag(c,"loaded1");yield* lift(c,true);yield* sensor(c,"lower_right");c.flag("stripped1");
 yield* lift(c,false);c.flag("home1");
 yield* waitFlag(c,"loaded2");yield* lift(c,true);yield* sensor(c,"upper_right");
 yield* gate(c,"f0");yield* go(c,14);yield* interact(c);c.flag("F_a");
 yield* waitFlag(c,"strip_closed");yield* lift(c,false);yield* sensor(c,"lower_right");c.flag("stripped2");
 yield* gate(c,"f1");yield* go(c,23);yield* interact(c);c.flag("F_b");
 yield* waitFlag(c,"loaded3");yield* lift(c,true);yield* sensor(c,"upper_right");
 yield* gate(c,"f2");yield* go(c,37);
};
const water=function*(c){
 yield* go(c,36);yield* interact(c);yield* berth(c);c.flag("loaded1");
 yield* gate(c,"w0");yield* go(c,25);yield* interact(c);yield* waitFlag(c,"strip_open1");
 yield* go(c,36);yield* interact(c);yield* sensor(c,"left");
 yield* waitFlag(c,"home1");yield* interact(c);yield* berth(c);c.flag("loaded2");
 yield* gate(c,"w1");yield* go(c,16);yield* interact(c);c.flag("W_b");
 yield* waitFlag(c,"F_b");yield* go(c,36);yield* interact(c);yield* sensor(c,"left");
 yield* gate(c,"w2");yield* go(c,5);yield* interact(c);c.flag("W_c");
 yield* waitFlag(c,"strip_open2");yield* go(c,36);yield* interact(c);yield* berth(c);c.flag("loaded3");yield* go(c,2);
};
const earth=function*(c){yield* gate(c,"e0");yield* go(c,14);yield* interact(c);c.flag("strip_open1");yield* gate(c,"e1");yield* go(c,23);yield* interact(c);yield* waitFlag(c,"W_b");yield* go(c,14);yield* interact(c);c.flag("strip_closed");yield* gate(c,"e2");yield* go(c,34);yield* interact(c);yield* waitFlag(c,"W_c");yield* go(c,14);yield* interact(c);c.flag("strip_open2");yield* go(c,37);};
const straight={fire:function*(c){yield* go(c,37)},water:function*(c){yield* go(c,2)},earth:function*(c){yield* go(c,37)}};
const noStrip={fire,water,earth:function*(c){yield* gate(c,"e0");yield* go(c,14);yield* interact(c);c.flag("strip_open1");yield* gate(c,"e1");yield* go(c,23);yield* interact(c);yield* waitFlag(c,"W_b");c.flag("strip_closed");yield* gate(c,"e2");}};
const noReload={fire,earth,water:function*(c){yield* go(c,36);yield* interact(c);yield* berth(c);c.flag("loaded1");yield* gate(c,"w0");yield* go(c,25);yield* interact(c);yield* waitFlag(c,"strip_open1");yield* go(c,36);yield* interact(c);yield* sensor(c,"left");yield* waitFlag(c,"home1");c.flag("loaded2");yield* gate(c,"w1");}};
export const solutions={sets:[{elements:["fire","water","earth"],scripts:{fire,water,earth},shortcuts:[{name:"walk straight",scripts:straight},{name:"keep stripper open on return",scripts:noStrip,maxTicks:12000},{name:"send the shuttle empty",scripts:noReload,maxTicks:12000}]}]};
