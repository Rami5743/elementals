import {go,interact,until,waitFlag,wait} from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,9000,id);}
function* pull(c,x){yield* go(c,x);yield* interact(c);}
function* descent(c){yield* go(c,10);yield* until(c,()=>c.me.grounded&&c.bottom===20*32,0,9000,"bottom landing");}
function* ride(c,i){yield* go(c,4);yield* until(c,()=>c.me.grounded&&c.bottom===20*32,0,1000,"return lift");c.flag("aboard"+i);yield* until(c,()=>c.me.grounded&&c.bottom===4*32,0,2000,"top landing");yield* go(c,6);c.flag("top"+i);}
function runner(retry=false){return function*(c){const n=retry?4:2;for(let i=1;i<=n;i++){yield* waitFlag(c,"ready"+i);yield* descent(c);if(i===1)yield* pull(c,10);c.flag("land"+i);if(i<n)yield* ride(c,i);}yield* gate(c,"f_exit");yield* go(c,1);};}
function recipient(mode="normal"){return function*(c){yield* go(c,24);c.flag("Eready");if(mode==="retry")yield* waitFlag(c,"land1");yield* gate(c,"e_pulse");if(mode==="late")yield* waitFlag(c,"land1");if(mode==="delay")yield* wait(c,90);yield* pull(c,29);yield* pull(c,15);c.flag("Eback");yield* gate(c,"e_exit");yield* go(c,38);};}
function* restore(c,i){yield* gate(c,"w_access");yield* go(c,24);yield* waitFlag(c,"aboard"+i);yield* interact(c);yield* waitFlag(c,"top"+i);yield* interact(c);yield* pull(c,21);}
function operator(mode="normal"){return function*(c){yield* waitFlag(c,"Eready");yield* pull(c,21);c.flag("ready1");yield* waitFlag(c,"land1");if(mode!=="keep")yield* pull(c,21);yield* gate(c,"w_inspect");yield* gate(c,"w_inverse");yield* pull(c,14);yield* restore(c,1);
 if(mode==="retry"){c.flag("ready2");yield* waitFlag(c,"land2");yield* pull(c,21);yield* restore(c,2);}
 yield* gate(c,"w_phase");yield* go(c,32);let i=mode==="retry"?3:2;c.flag("ready"+i);
 if(mode==="retry"){yield* waitFlag(c,"land3");yield* pull(c,21);yield* restore(c,3);yield* go(c,32);i=4;c.flag("ready4");}
 yield* gate(c,"w_pulse");if(mode==="late")yield* waitFlag(c,"land"+i);if(mode==="delay")yield* wait(c,90);yield* pull(c,35);yield* waitFlag(c,"land"+i);yield* pull(c,21);yield* gate(c,"w_exit");yield* go(c,38);};}
const fire=runner(),earth=recipient(),water=operator();
const direct={fire:function*(c){yield* go(c,1)},water:function*(c){yield* go(c,38)},earth:function*(c){yield* go(c,38)}};
export const solutions={sets:[{elements:["fire","water","earth"],scripts:{fire,water,earth},shortcuts:[{name:"direct",scripts:direct},{name:"keep first wind authorization",scripts:{fire,earth,water:operator("keep")}},{name:"miss first contact without retry",scripts:{fire,earth:recipient("late"),water}},{name:"miss second contact without retry",scripts:{fire,earth,water:operator("late")}}]}]};
