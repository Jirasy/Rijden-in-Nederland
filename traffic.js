/* Lalu lintas dan kehidupan sekitar: kendaraan lain, pesepeda, pejalan kaki, sapi, kapal, burung */
const SPM=curve.getLength()/N,AG=[],hudEl=$('hud'),pick=a=>a[Math.random()*a.length|0],mc={},mat=c=>mc[c]||(mc[c]=L(c)),skin=mat(0xf0c8a0);let TT=0;
function pt(s,o){s=((s%N)+N)%N;const i=s|0,j=(i+1)%N,f=s-i;return[P[i].x*(1-f)+P[j].x*f+NL[i].x*o,P[i].z*(1-f)+P[j].z*f+NL[i].z*o,Math.atan2(TG[i].x,TG[i].z)]}
function add(m,o){S.add(m);const a=Object.assign({m,s:0,v:0,dir:1,off:0,r:Math.random(),ph:Math.random()*6.28},o);AG.push(a);return a}
const put=(g,geo,m,x,y,z)=>{const o=new T.Mesh(geo,m);o.position.set(x,y,z);g.add(o);return o};

function vehicle(k){const g=new T.Group(),bus=k==='bus',col=pick([0x1d5fd1,0xd62828,0xf4c20d,0xf2f2f2,0x2a9d4a,0x7b3fc4,0x444a52]),
 d=bus?{w:2.5,h:2.6,l:11,y:1.9,c:0xf4a300}:k==='van'?{w:2,h:1.9,l:5,y:1.5,c:0xf2f2f2}:{w:1.9,h:.7,l:4.2,y:.75,c:col},bm=mat(d.c);
 put(g,B(d.w,d.h,d.l),bm,0,d.y,0);
 if(k==='car'){put(g,B(1.7,.6,2),glass,0,1.4,-.2);put(g,B(1.76,.08,2.1),bm,0,1.74,-.2)}
 else put(g,B(d.w+.04,.75,bus?d.l*.82:1.1),glass,0,d.y+(bus?.45:.4),bus?0:d.l/2-.75);
 const z=d.l/2-1.1;[[1,z],[-1,z],[1,-z],[-1,-z]].forEach(([s,q])=>put(g,tG,tM,s*d.w/2,.42,q));return g}

function cyclist(){const g=new T.Group(),wg=new T.CylinderGeometry(.34,.34,.05,12).rotateZ(Math.PI/2);
 [.62,-.62].forEach(z=>put(g,wg,mat(0x222222),0,.34,z));
 put(g,B(.06,.5,1.25),mat(pick([0x222222,0x888c92,0xb8453a])),0,.62,0);
 put(g,B(.38,.62,.26),mat(pick([0xd62828,0x1d5fd1,0x2a9d4a,0xf4c20d,0x7b3fc4,0xf26a1b])),0,1.18,-.1).rotation.x=.25;
 put(g,new T.SphereGeometry(.15,8,6),skin,0,1.62,0);return g}

function walker(){const g=new T.Group();
 put(g,B(.45,.7,.28),mat(pick([0xd62828,0x1d5fd1,0x2a9d4a,0xeeeeee,0xf26a1b,0x444a52])),0,1.15,0);put(g,new T.SphereGeometry(.14,8,6),skin,0,1.65,0);
 g.userData.legs=[-.12,.12].map(x=>{const p=new T.Group();p.position.set(x,.8,0);put(p,B(.16,.8,.18),mat(0x2b3a55),0,-.4,0);g.add(p);return p});return g}

function boat(){const g=new T.Group();put(g,B(2.2,.7,6.5),mat(0xf2f2f2),0,.35,0);put(g,B(2.24,.18,6.54),mat(0x21468b),0,.5,0);put(g,B(1.5,.9,2.2),mat(0xe9e1d2),0,1,-.6);put(g,B(1.55,.35,1.4),glass,0,1.1,-.6);return g}

function cow(){const g=new T.Group(),k=mat(0x1b1b1f),w=mat(0xf4f4f0);
 put(g,B(1,.95,2),w,0,1,0);put(g,B(1.03,.5,.8),k,0,1.15,.35);put(g,B(1.03,.4,.6),k,0,.9,-.6);
 [[1,1],[-1,1],[1,-1],[-1,-1]].forEach(([a,b])=>put(g,B(.18,.7,.18),k,a*.35,.35,b*.75));
 const h=new T.Group();h.position.set(0,1.35,1);put(h,B(.5,.5,.6),w,0,-.15,.3);g.add(h);g.userData.head=h;return g}

function bird(){const g=new T.Group(),w=new T.PlaneGeometry(1.2,.35),m=new T.MeshBasicMaterial({color:0x333a44,side:T.DoubleSide});
 g.userData.wings=[1,-1].map(s=>{const p=new T.Group();put(p,w,m,s*.6,0,0).rotation.x=-Math.PI/2;g.add(p);return p});return g}

/* Kendaraan lajur kanan (searah) dan lajur kiri (berlawanan), kecepatan sama agar tidak saling menembus */
['car','van','car','bus'].forEach((k,i)=>add(vehicle(k),{s:i*N/4+rnd(0,20),v:19,off:-2.2,rad:k==='bus'?3.2:1.7,acc:1}));
['car','car','van','car'].forEach((k,i)=>add(vehicle(k),{s:i*N/4+30+rnd(0,15),v:19,dir:-1,off:2.2,rad:k==='van'?2:1.7}));
/* Pesepeda di jalur merah dan pejalan kaki di tepi jalan */
for(let i=0;i<8;i++){add(cyclist(),{s:i*N/8+rnd(0,25),v:5,off:-5.3,rad:.9});add(cyclist(),{s:i*N/8+rnd(10,30),v:5,dir:-1,off:5.3,rad:.9})}
for(let i=0;i<10;i++)[[-8.2,1],[8.2,-1]].forEach(([o,d])=>add(walker(),{s:i*N/10+rnd(0,20),v:1.4,dir:d,off:o+rnd(-.4,.4)}));
/* Kapal di kanal, sapi di padang, burung di langit */
for(let i=0;i<3;i++)add(boat(),{s:i*N/3+rnd(0,30),v:3,off:19.5,bob:1});
[60,100,210,250,340,460].forEach(i0=>{for(let k=0;k<2;k++){const c=cow();c.position.copy(at(i0+Math.floor(rnd(-4,4)),rnd(33,40)));c.rotation.y=rnd(0,6.28);add(c,{})}});
for(let i=0;i<10;i++){const c=at(Math.floor(rnd(0,N)),rnd(-30,30));add(bird(),{orb:1,cx:c.x,cz:c.z,rr:rnd(30,70),h:rnd(25,45),ang:rnd(0,6.28)})}

/* Batas jarak aman untuk mode otomatis: ikuti kendaraan di depan pada lajur yang sama */
function leadLimit(){let lim=99;for(const a of AG){if(!a.acc||!a.m.visible)continue;const g=(((a.s-st.ni)%N)+N)%N*SPM;if(g<45)lim=Math.min(lim,a.v+(g-12)*.7)}return Math.max(0,lim)}
function trafficLOD(f){AG.forEach(a=>a.m.visible=a.r<f)}

function updateTraffic(dt){TT+=dt;
 if(st.bumpT>0){st.bumpT-=dt;if(st.bumpT<=0){st.bumpT=0;hudEl.classList.remove('hit')}}
 for(const a of AG){const m=a.m;if(!m.visible)continue;
  if(a.v){a.s+=a.dir*a.v/SPM*dt;const p=pt(a.s,a.off);m.position.set(p[0],a.bob?.15+Math.sin(TT*1.4+a.ph)*.05:0,p[1]);m.rotation.y=p[2]+(a.dir<0?Math.PI:0)}
  else if(a.orb){a.ang+=dt*.25;const c=Math.cos(a.ang),s=Math.sin(a.ang);m.position.set(a.cx+c*a.rr,a.h+Math.sin(TT+a.ph)*1.5,a.cz+s*a.rr);m.rotation.y=Math.atan2(-s,c)}
  const lg=m.userData.legs;if(lg){const w=Math.sin(TT*6+a.ph)*.6;lg[0].rotation.x=w;lg[1].rotation.x=-w}
  const hd=m.userData.head;if(hd)hd.rotation.x=.5+Math.sin(TT*.9+a.ph)*.25;
  const wg=m.userData.wings;if(wg){const f=Math.sin(TT*9+a.ph)*.55;wg[0].rotation.z=f;wg[1].rotation.z=-f}
  if(a.rad){const dx=st.x-m.position.x,dz=st.z-m.position.z,mn=a.rad+1.5,d2=dx*dx+dz*dz;
   if(d2<mn*mn){const d=Math.sqrt(d2)||.01;st.x+=dx/d*(mn-d);st.z+=dz/d*(mn-d);if(!st.bumpT){st.v*=.55;st.bumpT=.6;hudEl.classList.add('hit')}}}
 }}
