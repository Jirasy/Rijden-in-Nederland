if(!window.THREE){document.body.innerHTML='<p style="padding:24px">Library 3D gagal dimuat. Periksa koneksi internet lalu muat ulang halaman.</p>';throw 0}
const T=THREE,$=id=>document.getElementById(id),rnd=(a,b)=>a+Math.random()*(b-a),L=c=>new T.MeshLambertMaterial({color:c}),B=(w,h,d)=>new T.BoxGeometry(w,h,d);
const MOBILE=matchMedia('(pointer:coarse)').matches||Math.min(innerWidth,innerHeight)<600,dpr=devicePixelRatio||1;
const QP=[{n:'Rendah',pr:1,sh:0,tr:.35,cl:6},{n:'Sedang',pr:Math.min(dpr,1.5),sh:1,tr:.7,cl:14},{n:'Tinggi',pr:Math.min(dpr,2),sh:1,tr:1,cl:22}];
let qi=MOBILE?0:2;try{const s=localStorage.getItem('rin-q');if(s!==null&&QP[+s])qi=+s}catch(e){}
let prs=QP[qi].pr;
const R=new T.WebGLRenderer({canvas:$('c'),antialias:!MOBILE,powerPreference:'high-performance'});R.setPixelRatio(prs);R.shadowMap.enabled=true;
const SKY=0x9cc9ee,S=new T.Scene();S.background=new T.Color(SKY);S.fog=new T.Fog(SKY,150,800);
const cam=new T.PerspectiveCamera(62,1,1,1600);
S.add(new T.HemisphereLight(0xffffff,0x7a9a58,.95));
const sun=new T.DirectionalLight(0xfff1d6,.85);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);
Object.assign(sun.shadow.camera,{left:-35,right:35,top:35,bottom:-35,near:1,far:300});sun.shadow.camera.updateProjectionMatrix();S.add(sun,sun.target);
const cv=(w,h,f)=>{const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'));const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.anisotropy=8;return t};

