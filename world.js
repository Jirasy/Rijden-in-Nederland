/* Tanah polder */
const gt=cv(128,128,g=>{g.fillStyle='#78b04a';g.fillRect(0,0,128,128);for(let i=0;i<500;i++){g.fillStyle=`hsl(${90+rnd(-8,8)},45%,${rnd(36,52)}%)`;g.fillRect(rnd(0,128),rnd(0,128),3,3)}});gt.repeat.set(300,300);
const ground=new T.Mesh(new T.PlaneGeometry(3000,3000),new T.MeshLambertMaterial({map:gt}));ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;S.add(ground);

/* Lintasan tertutup */
const pts=[];for(let i=0;i<14;i++){const a=i/14*Math.PI*2,r=190+30*Math.sin(2*a+.5)+18*Math.sin(3*a);pts.push(new T.Vector3(Math.cos(a)*r,0,Math.sin(a)*r))}
const curve=new T.CatmullRomCurve3(pts,true,'catmullrom',.5),N=500,P=curve.getSpacedPoints(N);P.pop();
const TG=P.map((p,i)=>{const q=P[(i+1)%N];return new T.Vector3(q.x-p.x,0,q.z-p.z).normalize()}),NL=TG.map(t=>new T.Vector3(t.z,0,-t.x));
const K_=Math.round(curve.getLength()/24);
const mk=(o1,o2,y,mat)=>{const p=[],u=[],ix=[];for(let i=0;i<=N;i++){const j=i%N,a=P[j],n=NL[j];p.push(a.x+n.x*o1,y,a.z+n.z*o1,a.x+n.x*o2,y,a.z+n.z*o2);u.push(0,i/N*K_,1,i/N*K_);if(i<N){const k=i*2;ix.push(k,k+2,k+1,k+1,k+2,k+3)}}
 const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setAttribute('uv',new T.Float32BufferAttribute(u,2));g.setIndex(ix);g.computeVertexNormals();const m=new T.Mesh(g,mat);m.receiveShadow=true;S.add(m)};
const rt=cv(128,256,g=>{g.fillStyle='#3b3e44';g.fillRect(0,0,128,256);for(let i=0;i<900;i++){g.fillStyle=`rgba(255,255,255,${rnd(.02,.07)})`;g.fillRect(rnd(0,128),rnd(0,256),2,2)}g.fillStyle='#f4f4f0';g.fillRect(6,0,4,256);g.fillRect(118,0,4,256);g.fillRect(62,20,4,90)});
mk(-4,4,.06,new T.MeshLambertMaterial({map:rt}));
const red=L(0xb8453a);mk(-6.6,-4,.04,red);mk(4,6.6,.04,red);   /* jalur sepeda merah */
mk(15,24,.03,new T.MeshPhongMaterial({color:0x2f7fc1,shininess:80}));  /* kanal */
const at=(i,o)=>{i=((i%N)+N)%N;return new T.Vector3(P[i].x+NL[i].x*o,0,P[i].z+NL[i].z*o)};
const face=(m,i,o)=>{const s=-Math.sign(o);m.rotation.y=Math.atan2(NL[((i%N)+N)%N].x*s,NL[((i%N)+N)%N].z*s)};

/* Rumah bata */
const brick=[0xa8483a,0x9a5a3c,0xb86a4a,0xd9cdb4,0x7d4a3a],rg=new T.CylinderGeometry(3.8,3.8,8.6,3);rg.rotateX(Math.PI/2);rg.rotateZ(Math.PI);rg.scale(1,.6,1);
function house(){const g=new T.Group(),h=rnd(6,9),b=new T.Mesh(B(6,h,8),L(brick[Math.random()*brick.length|0])),r=new T.Mesh(rg,L(0x4b3b38)),w=L(0xeaf3f8);
 b.position.y=h/2;r.position.y=h+1.14;g.add(b,r);
 [[-1.5,h-2.2,1.1,1.5,w],[1.5,h-2.2,1.1,1.5,w],[1.5,2.6,1.1,1.5,w],[-1.5,1.2,1.1,2.4,L(0x5a3a2a)]].forEach(([x,y,a,c,m])=>{const q=new T.Mesh(B(a,c,.1),m);q.position.set(x,y,4.02);g.add(q)});return g}
for(let i=10;i<N;i+=70)for(let k=0;k<3;k++){const h=house();h.position.copy(at(i+k*3,-28));face(h,i+k*3,-28);S.add(h)}

/* Kincir angin */
const mills=[];
function windmill(){const g=new T.Group(),wood=L(0x6b4a2f),b=new T.Mesh(new T.CylinderGeometry(3.4,5.4,17,8),L(0xf0e6d2)),c=new T.Mesh(new T.ConeGeometry(4,5,8),L(0x4a3a2c)),bl=new T.Group();
 b.position.y=8.5;c.position.y=19.5;bl.position.set(0,15,4.4);
 for(let q=0;q<4;q++){const a=new T.Group();a.rotation.z=q*Math.PI/2;const m=new T.Mesh(B(1.5,16,.3),wood);m.position.y=9;a.add(m);bl.add(a)}
 bl.add(new T.Mesh(new T.SphereGeometry(1,8,6),wood));g.add(b,c,bl);mills.push(bl);return g}
[50,160,270,380,470].forEach((i,m)=>{const o=m%2?42:-48,w=windmill();w.position.copy(at(i,o));face(w,i,o);S.add(w)});

/* Ladang tulip */
const tt=cv(128,64,g=>{g.fillStyle='#3f7d2c';g.fillRect(0,0,128,64);['#e53935','#fdd835','#ec407a','#fafafa','#8e24aa','#ff7043'].forEach((c,i)=>{g.fillStyle=c;g.fillRect(i*21,0,17,64)})});tt.repeat.set(4,1);
const tm=new T.MeshLambertMaterial({map:tt});
[[115,-62],[235,-62],[345,-62],[455,-62],[20,55],[170,55],[300,55],[420,55]].forEach(([i,o])=>{const g=new T.Group(),f=new T.Mesh(new T.PlaneGeometry(45,70),tm);f.rotation.x=-Math.PI/2;g.add(f);g.position.copy(at(i,o));g.position.y=.04;g.rotation.y=Math.atan2(TG[i].x,TG[i].z);S.add(g)});

/* Pohon poplar */
const tp=[];for(let i=0;i<N;i+=5)tp.push(at(i,-9.5));for(let i=0;i<N;i+=7)tp.push(at(i+2,29));
for(let i=0;i<90;i++){const o=Math.random()<.5?-rnd(88,120):rnd(52,120);tp.push(at(Math.random()*N|0,o))}
const cm=new T.InstancedMesh(new T.ConeGeometry(1.7,10,7),L(0x3d7a34),tp.length),tk=new T.InstancedMesh(new T.CylinderGeometry(.25,.35,3,5),L(0x5a4030),tp.length),dm=new T.Object3D();
tp.forEach((p,i)=>{const s=rnd(.8,1.3);dm.position.set(p.x,6.5*s,p.z);dm.scale.set(s,s,s);dm.updateMatrix();cm.setMatrixAt(i,dm.matrix);dm.position.y=1.5*s;dm.updateMatrix();tk.setMatrixAt(i,dm.matrix)});
cm.frustumCulled=tk.frustumCulled=false;S.add(cm,tk);

/* Rambu batas kecepatan 80 */
const sgT=cv(128,128,g=>{g.fillStyle='#d71920';g.beginPath();g.arc(64,64,62,0,7);g.fill();g.fillStyle='#fff';g.beginPath();g.arc(64,64,45,0,7);g.fill();g.fillStyle='#111';g.font='bold 54px Arial Narrow,Arial,sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('80',64,68)});sgT.wrapS=sgT.wrapT=T.ClampToEdgeWrapping;
[20,140,260,380].forEach(i=>{const g=new T.Group(),p=new T.Mesh(new T.CylinderGeometry(.07,.07,3.2,6),L(0x888c92)),s=new T.Mesh(new T.CircleGeometry(.62,28),new T.MeshBasicMaterial({map:sgT}));p.position.y=1.6;s.position.set(0,3.3,.09);g.add(p,s);g.position.copy(at(i,7.6));g.rotation.y=Math.atan2(-TG[i].x,-TG[i].z);S.add(g)});

/* Awan */
const clouds=[];
const cmat=new T.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.9,fog:false});
for(let i=0;i<22;i++){const g=new T.Group();for(let k=0;k<4;k++){const s=new T.Mesh(new T.SphereGeometry(rnd(14,24),8,6),cmat);s.position.set(k*18-27,rnd(-3,3),rnd(-8,8));s.scale.y=.45;g.add(s)}g.position.set(rnd(-900,900),rnd(130,200),rnd(-900,900));S.add(g);clouds.push(g)}

