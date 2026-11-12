/* Kendali dan fisika */
const st={ni:0,x:0,z:0,h:Math.atan2(TG[0].x,TG[0].z),v:0,steer:0,auto:false,cam:0},K={},wrap=a=>Math.atan2(Math.sin(a),Math.cos(a)),cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const s0=at(0,-2.2);st.x=s0.x;st.z=s0.z;
cam.position.set(st.x-Math.sin(st.h)*10,4.6,st.z-Math.cos(st.h)*10);
function step(dt){
 let thr=0,str=0,best=0,bd=1e12,pb=false;
 for(let o=-40;o<=40;o++){const i=((st.ni+o)%N+N)%N,dx=P[i].x-st.x,dz=P[i].z-st.z,d=dx*dx+dz*dz;if(d<bd){bd=d;best=i}}st.ni=best;
 const dist=Math.sqrt(bd);
 if(st.auto){ /* autopilot: ikuti jalur kanan, kurangi gas di tikungan */
  const t=at(best+6+Math.round(Math.abs(st.v)*.55),-2.2),df=wrap(Math.atan2(t.x-st.x,t.z-st.z)-st.h);
  str=cl(df*2.4,-1,1);thr=cl((22-Math.min(9,Math.abs(df)*18)-st.v)*.5,-1,1)
 }else{thr=(K.up?1:0)-(K.down?1:0);str=(K.left?1:0)-(K.right?1:0);
  const gp=(navigator.getGamepads?navigator.getGamepads():[])[0]; /* gamepad: stik kiri setir, R2 gas, L2 rem, A rem tangan */
  if(gp){const ax=gp.axes[0]||0,bt=i=>gp.buttons[i]?gp.buttons[i].value:0;if(Math.abs(ax)>.12)str=-ax;if(Math.abs(bt(7)-bt(6))>.05)thr=bt(7)-bt(6);pb=bt(0)>.5}}
 st.steer+=(str-st.steer)*Math.min(1,dt*7);
 let a=0;if(thr>0)a=thr*10*(1-Math.max(0,st.v)/36);else if(thr<0)a=st.v>.5?thr*24:thr*5;
 a-=st.v*.1;if(dist>7.8)a-=st.v*.9;
 if(K.brake||pb)st.v*=Math.max(0,1-3*dt);
 st.v=cl(st.v+a*dt,-9,36);if(!thr&&Math.abs(st.v)<.15)st.v=0;
 st.h+=st.steer*1.3*cl(st.v/7,-1,1)/(1+Math.abs(st.v)/20)*dt;
 st.x+=Math.sin(st.h)*st.v*dt;st.z+=Math.cos(st.h)*st.v*dt;
 car.position.set(st.x,0,st.z);car.rotation.y=st.h;car.rotation.z=-st.steer*Math.min(1,Math.abs(st.v)/25)*.04;
 wheels.forEach((w,i)=>{w.s.rotation.x+=st.v*dt/.42;if(i<2)w.y.rotation.y=st.steer*.45});
 mills.forEach(m=>m.rotation.z+=dt*.7);
 const fx=Math.sin(st.h),fz=Math.cos(st.h);car.visible=st.cam!==1;
 if(st.cam===1){cam.position.set(st.x+fx*.5,1.3,st.z+fz*.5);cam.lookAt(st.x+fx*30,1.1,st.z+fz*30)}
 else{const u=st.cam===2,d=u?14:10,e=new T.Vector3(st.x-fx*d,u?42:4.6,st.z-fz*d);cam.position.lerp(e,1-Math.exp(-dt*4));cam.lookAt(u?st.x:st.x+fx*6,u?0:1,u?st.z:st.z+fz*6)}
 sun.position.set(st.x+60,100,st.z+40);sun.target.position.set(st.x,0,st.z);
 const kmh=Math.round(Math.abs(st.v)*3.6);if($('kmh').textContent!=kmh){$('kmh').textContent=kmh;$('hud').classList.toggle('over',kmh>80)}
}
let last=performance.now(),fa=0,fn=0;
function loop(now){requestAnimationFrame(loop);const raw=now-last,dt=Math.min(.05,raw/1000);last=now;step(dt);R.render(S,cam);
 if(raw<250){fa+=raw;fn++}  /* resolusi dinamis: turun saat FPS rendah, naik lagi saat lancar */
 if(fa>2000){const f=fn*1000/fa,mx=QP[qi].pr;fa=fn=0;
  if(f<40&&prs>.6){prs=Math.max(.6,prs-.15);R.setPixelRatio(prs);rs()}else if(f>57&&prs<mx){prs=Math.min(mx,prs+.1);R.setPixelRatio(prs);rs()}}}

