/* Mobil */
const bodyMat=new T.MeshPhongMaterial({color:0xf26a1b,shininess:90}),glass=new T.MeshPhongMaterial({color:0x1b2a3a,shininess:120,transparent:true,opacity:.88}),car=new T.Group(),wheels=[];
const part=(g,m,x,y,z)=>{const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;car.add(o)};
part(B(2,.7,4.3),bodyMat,0,.75,0);part(B(1.8,.62,2.1),glass,0,1.41,-.2);part(B(1.86,.08,2.2),bodyMat,0,1.76,-.2);
part(B(2.04,.3,.2),L(0x22252a),0,.5,2.15);part(B(2.04,.3,.2),L(0x22252a),0,.5,-2.15);
const hl=new T.MeshBasicMaterial({color:0xfff6c8}),tl=new T.MeshBasicMaterial({color:0xe5202e}),yp=L(0xf5c518);
[-.7,.7].forEach(x=>{part(B(.42,.18,.08),hl,x,.9,2.17);part(B(.42,.18,.08),tl,x,.9,-2.17)});
part(B(.8,.2,.06),yp,0,.55,2.27);part(B(.8,.2,.06),yp,0,.55,-2.27);
const tG=new T.CylinderGeometry(.42,.42,.32,18).rotateZ(Math.PI/2),hG=new T.CylinderGeometry(.24,.24,.34,12).rotateZ(Math.PI/2),tM=L(0x15171a),hM=L(0xcfd5da);
[[1,1.4],[-1,1.4],[1,-1.4],[-1,-1.4]].forEach(([sx,z])=>{const y=new T.Group(),s=new T.Group(),t=new T.Mesh(tG,tM);y.position.set(sx*1.02,.42,z);t.castShadow=true;s.add(t,new T.Mesh(hG,hM),new T.Mesh(B(.36,.8,.1),tM));y.add(s);car.add(y);wheels.push({y,s})});
S.add(car);

