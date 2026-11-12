/* Antarmuka */
const COL=[['Oranye','#f26a1b'],['Merah','#d62828'],['Biru','#1d5fd1'],['Kuning','#f4c20d'],['Hijau','#2a9d4a'],['Putih','#f2f2f2'],['Hitam','#1b1b1f'],['Ungu','#7b3fc4']],sw=$('sw');let ci=0;
COL.forEach(([n,c],i)=>{const b=document.createElement('button');b.className='sw';b.style.background=c;b.title=n;b.setAttribute('aria-label','Warna '+n);b.onclick=()=>setColor(c,i);sw.appendChild(b)});
const cp=document.createElement('input');cp.type='color';cp.id='cp';cp.title='Warna sendiri';cp.setAttribute('aria-label','Pilih warna sendiri');cp.oninput=()=>setColor(cp.value,-1);sw.appendChild(cp);
function setColor(c,i){bodyMat.color.set(c);ci=i;cp.value=c;[...sw.querySelectorAll('.sw')].forEach((b,j)=>b.classList.toggle('on',j===i))}
function setAuto(b){st.auto=b;$('qA').classList.toggle('on',b);$('bA').classList.toggle('on',b);$('bM').classList.toggle('on',!b);$('modeTxt').textContent=b?'Otomatis':'Manual'}
const camN=['Belakang','Kap mobil','Udara'];
function nextCam(){st.cam=(st.cam+1)%3;$('bC').textContent=camN[st.cam]}
$('bM').onclick=()=>setAuto(false);$('bA').onclick=()=>setAuto(true);$('bC').onclick=nextCam;
$('panel').addEventListener('click',e=>{const b=e.target.closest('button');if(b)b.blur()});
const KM={arrowup:'up',w:'up',arrowdown:'down',s:'down',arrowleft:'left',a:'left',arrowright:'right',d:'right',' ':'brake'};
addEventListener('keydown',e=>{const k=e.key.toLowerCase(),n=KM[k];if(n){K[n]=true;e.preventDefault()}else if(k==='m')setAuto(!st.auto);else if(k==='v')nextCam();else if(k==='c')setColor(COL[(ci+1)%COL.length][1],(ci+1)%COL.length)});
addEventListener('keyup',e=>{const n=KM[e.key.toLowerCase()];if(n)K[n]=false});
addEventListener('blur',()=>{for(const n in K)K[n]=false});
document.querySelectorAll('#touch [data-k]').forEach(b=>{const n=b.dataset.k,on=e=>{K[n]=true;try{b.setPointerCapture(e.pointerId)}catch(x){}e.preventDefault()},off=()=>K[n]=false;b.addEventListener('pointerdown',on);['pointerup','pointercancel'].forEach(t=>b.addEventListener(t,off))});
function rs(){const w=innerWidth,h=innerHeight;R.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}
addEventListener('resize',rs);
/* Kualitas grafis */
function applyQuality(i){qi=i;const q=QP[i];prs=q.pr;R.setPixelRatio(prs);rs();sun.castShadow=!!q.sh;
 const m=i>1?1024:512;sun.shadow.mapSize.set(m,m);if(sun.shadow.map){sun.shadow.map.dispose();sun.shadow.map=null}
 cm.count=tk.count=Math.floor(tp.length*q.tr);clouds.forEach((c,j)=>c.visible=j<q.cl);S.fog.far=i?800:600;
 [...$('qual').children].forEach((b,j)=>b.classList.toggle('on',j===i));try{localStorage.setItem('rin-q',i)}catch(e){}}
QP.forEach((q,i)=>{const b=document.createElement('button');b.textContent=q.n;b.onclick=()=>applyQuality(i);$('qual').appendChild(b)});
/* Menu, tombol cepat, layar penuh */
const menu=$('panel'),mb=$('menuBtn'),toggleMenu=o=>{menu.classList.toggle('closed',!o);mb.setAttribute('aria-expanded',o)};
mb.onclick=()=>toggleMenu(menu.classList.contains('closed'));toggleMenu(!MOBILE);
$('qA').onclick=()=>setAuto(!st.auto);$('qC').onclick=nextCam;
const de=document.documentElement,fs=$('fsBtn');
if(de.requestFullscreen)fs.onclick=()=>document.fullscreenElement?document.exitFullscreen():de.requestFullscreen().catch(()=>{});else fs.hidden=true;
addEventListener('contextmenu',e=>e.preventDefault());
const hint=$('hint'),hide=()=>hint.classList.add('off');
hint.textContent=MOBILE?'Tekan Gas untuk melaju. Menu ada di kiri atas.':'Tekan W atau panah atas untuk melaju.';
setTimeout(hide,7000);addEventListener('keydown',hide,{once:true});addEventListener('pointerdown',hide,{once:true});
rs();setColor('#f26a1b',0);applyQuality(qi);requestAnimationFrame(loop);
