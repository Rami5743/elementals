import {go,interact,until,wait,drop,pound,waitFlag,IN_LEFT,IN_RIGHT,IN_JUMP,IN_DOWN} from "../../kit.mjs";
function* gate(c,id,h=96){yield* until(c,()=>c.ent(id).s.open>=h,0,10000,id);}
function* pull(c,x){yield* go(c,x);yield* interact(c);}
function* creep(c,x){yield* go(c,x,{noHop:true,max:1500});}
function* earthMode(c,mode){
 yield* pull(c,34);yield* go(c,16);c.flag("atmouth");
 if(mode==="closed"){yield* drop(c);yield* creep(c,20);for(let j=0;j<30;j++){yield* wait(c,14,IN_JUMP);yield* wait(c,6,IN_DOWN);yield* wait(c,4);}if(c.ent("panel").s.gone)throw Error("closed roof pound unexpectedly worked");yield* wait(c,6000);return;}
 if(mode==="recover"){yield* drop(c);yield* creep(c,20);yield* wait(c,20,IN_JUMP);yield* wait(c,10,IN_DOWN);if(c.ent("panel").s.gone)throw Error("closed roof pound unexpectedly worked");c.flag("tried");}else{yield* gate(c,"slab",192);yield* drop(c);yield* creep(c,20);}
 yield* gate(c,"slab",192);yield* creep(c,21);yield* creep(c,20);yield* wait(c,14,IN_JUMP);yield* pound(c);yield* until(c,()=>c.ent("panel").s.gone===1,0,600,"panel");yield* until(c,()=>c.bottom>=18*32&&c.me.grounded,0,600,"pedestal");
 yield* until(c,()=>c.bottom>=19*32&&c.me.grounded,IN_LEFT,400,"hall");yield* pull(c,8);c.flag("Ewest");
 yield* gate(c,"Eroof");yield* gate(c,"E2gate");yield* go(c,18);yield* wait(c,30,IN_RIGHT|IN_JUMP);yield* go(c,22);yield* pull(c,34);yield* gate(c,"Eexit");yield* go(c,38);
}
function* fireMode(c,mode){yield* gate(c,"Faccess");yield* go(c,16);yield* waitFlag(c,"atmouth");if(mode==="closed"){yield* wait(c,6000);return;}if(mode==="recover")yield* waitFlag(c,"tried");yield* interact(c);yield* waitFlag(c,"Ewest");if(mode==="retain"){yield* wait(c,6000);return;}yield* interact(c);yield* gate(c,"F2gate");yield* pull(c,35);yield* pull(c,16);yield* waitFlag(c,"Wfar");yield* interact(c);yield* gate(c,"Freturn");yield* gate(c,"Fexit");yield* go(c,1);}
function* water(c){yield* gate(c,"W1gate");yield* pull(c,16);yield* gate(c,"W2gate");yield* gate(c,"Wroof");yield* pull(c,34);yield* gate(c,"Wfinalgate");yield* pull(c,37);c.flag("Wfar");yield* gate(c,"Wroof");yield* pull(c,3);yield* gate(c,"Wexit");yield* go(c,1);}
const fire=c=>fireMode(c,"normal"),earth=c=>earthMode(c,"normal");
export const solutions={sets:[{elements:["fire","water","earth"],scripts:{fire,water,earth},shortcuts:[{name:"try to pound beneath closed roof",scripts:{fire:c=>fireMode(c,"closed"),water,earth:c=>earthMode(c,"closed")},maxTicks:6500},{name:"keep the roof open after descent",scripts:{fire:c=>fireMode(c,"retain"),water,earth},maxTicks:6500}]}]};