import {go,interact,until,waitFlag,wait} from "../../kit.mjs";
function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,9000,id);}
function* press(c,x){yield* go(c,x);yield* interact(c);}
function fireRun(mode="normal"){return function*(c){yield* gate(c,"f_start");yield* press(c,14);c.flag("launch1");if(mode==="retry"||mode==="missEarth"){yield* wait(c,mode==="retry"?1150:2000);yield* interact(c);c.flag("launch2");}yield* gate(c,"f_return");yield* press(c,33);yield* gate(c,"f_exit");yield* go(c,38);};}
function waterRun(mode="normal"){return function*(c){yield* gate(c,"w_feed");yield* go(c,17);if(mode==="retry"){yield* waitFlag(c,"launch2");yield* wait(c,350);}if(mode==="delay")yield* wait(c,90);if(mode!=="skip")yield* interact(c);if(mode==="missEarth"){yield* waitFlag(c,"launch2");yield* wait(c,350);yield* interact(c);c.flag("feed2");}yield* gate(c,"w_invert");yield* gate(c,"w_finish");yield* press(c,34);yield* gate(c,"w_exit");yield* go(c,38);};}
function earthRun(mode="normal"){return function*(c){if(mode==="missEarth")yield* waitFlag(c,"feed2");yield* gate(c,"e_cross");if(mode==="delay")yield* wait(c,90);yield* press(c,30);yield* gate(c,"e_exit");yield* go(c,38);};}
const air=function*(c){yield* press(c,5);yield* gate(c,"a_home");yield* gate(c,"a_finish");yield* press(c,34);yield* go(c,38);};
const fire=fireRun(),water=waterRun(),earth=earthRun();
const noLaunch=function*(c){yield* gate(c,"f_start");yield* go(c,14);yield* wait(c,2500);yield* go(c,38);};
export const solutions={sets:[{elements:["fire","water","earth","air"],scripts:{fire,water,earth,air},shortcuts:[{name:"omit the launch pulse",scripts:{fire:noLaunch,water,earth,air}},{name:"omit the handoff pulse",scripts:{fire,water:waterRun("skip"),earth,air}}]}]};