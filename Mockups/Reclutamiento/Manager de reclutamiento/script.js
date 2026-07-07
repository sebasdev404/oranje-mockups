/* =====================================================================
   Oranje — Manager de Reclutamiento · lógica del mockup
   ===================================================================== */
/* ============================ DATOS MOCK ============================ */
const MGR={name:'Hugo Marín',ini:'HM',role:'Manager de Reclutamiento',zona:'Reclutamiento Nacional'};

const ZONAS=[
  {z:'Centro',cob:88,total:34,cub:30,parc:3,pend:1,riesgo:false},
  {z:'Sur',cob:79,total:28,cub:22,parc:4,pend:2,riesgo:true},
  {z:'Este',cob:83,total:21,cub:17,parc:3,pend:1,riesgo:false},
  {z:'Oeste',cob:91,total:25,cub:23,parc:2,pend:0,riesgo:false},
  {z:'Noroeste',cob:72,total:19,cub:14,parc:3,pend:2,riesgo:true},
  {z:'Sureste',cob:80,total:15,cub:12,parc:2,pend:1,riesgo:false}
];

const LIDERES=[
  {id:'L1',nombre:'Juanita López',ini:'JL',zona:'Centro',grupo:'Grupo Centro-Sur',cob:87,esc:1,tiempo:'2.4 d',estado:'Activo',
   recl:[{nombre:'Ana López',ini:'AL',zona:'Centro',cob:85,tiempo:'2.1 d',esc:0},{nombre:'Lucía Fernández',ini:'LF',zona:'Centro',cob:90,tiempo:'1.9 d',esc:1}]},
  {id:'L2',nombre:'Marco Díaz',ini:'MD',zona:'Sur',grupo:'Grupo Litoral Sur',cob:79,esc:2,tiempo:'3.1 d',estado:'Activo',
   recl:[{nombre:'Beatriz Cruz',ini:'BC',zona:'Sur',cob:92,tiempo:'2.0 d',esc:1},{nombre:'Karla Mena',ini:'KM',zona:'Sur',cob:81,tiempo:'2.8 d',esc:1}]},
  {id:'L3',nombre:'Elena Ruiz',ini:'ER',zona:'Oeste',grupo:'Grupo Pacífico',cob:91,esc:0,tiempo:'2.0 d',estado:'Activo',
   recl:[{nombre:'Sofía Marín',ini:'SM',zona:'Oeste',cob:88,tiempo:'2.2 d',esc:0}]},
  {id:'L4',nombre:'Tomás Vela',ini:'TV',zona:'Noroeste',grupo:'Grupo Frontera',cob:72,esc:1,tiempo:'3.6 d',estado:'Activo',
   recl:[{nombre:'Daniela Soto',ini:'DS',zona:'Noroeste',cob:68,tiempo:'4.0 d',esc:1,alerta:'Sobrecarga'}]}
];

// Urgencia de requisición: roja / ambar / verde
const URG={roja:{c:'var(--red)',b:'#B31313',label:'Urgente'},ambar:{c:'#E6B800',b:'#9A7B00',label:'Media'},verde:{c:'var(--green)',b:'#178A3C',label:'Cubierta'},vip:{c:'var(--purple)',b:'#5E1F94',label:'VIP'}};
/* ---- Modelo y helpers de Requisiciones (alineado al diseño del Líder de Grupo) ---- */
const escR=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const URG_LABELS={high:'Urgente',med:'Pronto',low:'Normal'};
const URG_COLOR={high:'#E11919',med:'#FFCC33',low:'#1FA84A'};
const SUBSTATES={autorizada:{lbl:'Autorizada',cls:'autorizada'},proceso:{lbl:'En proceso',cls:'proceso'},cubierta:{lbl:'Cubierta',cls:'cubierta'},parcial:{lbl:'Parcial',cls:'parcial'}};
const buildPositions=arr=>arr.map(p=>({pos:p.pos,total:p.total,cubierto:p.cubierto,proceso:p.proceso||0,vacante:p.total-p.cubierto-(p.proceso||0)}));
function posSemaforo(p){if(p.cubierto>=p.total)return 'verde';if(p.cubierto===0&&(p.proceso||0)===0)return 'naranja';return 'rojo';}
function domSemaforo(r){const order={rojo:0,naranja:1,amarillo:2,verde:3};let w='verde';for(const p of r.positions){const s=posSemaforo(p);if(order[s]<order[w])w=s;}return w;}
function totals(r){let cub=0,total=0;for(const p of r.positions){cub+=p.cubierto;total+=p.total;}return {cub,total,pct:total?Math.round(cub/total*100):0};}
function reqDerive(r){return {reqContratos:[r.contrato||'Fijo'],reqMods:[r.shift||'Tiempo completo']};}
function reqContext(r){const t=totals(r);const otros=r.takers?r.takers.length:0;if(otros)return {key:'colab',lbl:'En colaboración',sub:otros+' reclutador'+(otros>1?'es':'')+' trabajándola',ic:'groups'};if(t.cub>=t.total)return null;return {key:'nueva',lbl:'Autorizada',sub:'Ya puede recibir colaboradores',ic:'fiber_new'};}
let REQS=[
  {id:'REQ #001',hotel:'Hotel Costa del Sol',zona:'Centro',lider:'Juanita López',urg:'high',state:'autorizada',age:'Hace 6 h',period:'01–07 Dic',contrato:'Fijo',shift:'Tiempo completo',tab:'criticas',nota:'Varada 6 h',positions:buildPositions([{pos:'Housekeeper',total:6,cubierto:4},{pos:'Mesero',total:4,cubierto:4}])},
  {id:'REQ #014',hotel:'Hotel Bahía',zona:'Noroeste',lider:'Tomás Vela',urg:'high',vip:true,state:'autorizada',age:'Hace 1 d',period:'02–06 Dic',contrato:'Temporal',shift:'Medio tiempo',tab:'criticas',nota:'VIP sin tomar',positions:buildPositions([{pos:'Recepción',total:6,cubierto:2}])},
  {id:'REQ #002',hotel:'Hotel Punta Vista',zona:'Sur',lider:'Marco Díaz',urg:'med',state:'proceso',age:'Hace 18 h',period:'03–10 Dic',contrato:'Fijo',shift:'Tiempo completo',tab:'todas',takers:[{id:'r1'},{id:'r2'}],positions:buildPositions([{pos:'Chef',total:5,cubierto:3},{pos:'Steward',total:3,cubierto:2}])},
  {id:'REQ #021',hotel:'Hotel Sierra',zona:'Oeste',lider:'Elena Ruiz',urg:'low',state:'cubierta',age:'Cerrada hoy',period:'05–08 Dic',contrato:'Fijo',shift:'Tiempo completo',tab:'todas',positions:buildPositions([{pos:'Mantenimiento',total:6,cubierto:6}])},
  {id:'REQ #033',hotel:'Hotel Marea Azul',zona:'Este',lider:'—',urg:'med',state:'autorizada',age:'Hace 2 h',period:'07–12 Dic',contrato:'Temporal',shift:'Medio tiempo',tab:'todas',positions:buildPositions([{pos:'Mesero',total:7,cubierto:3}])},
  {id:'REQ #040',hotel:'Hotel Mirador',zona:'Noroeste',lider:'Tomás Vela',urg:'high',state:'autorizada',age:'Hace 9 h',period:'04–10 Dic',contrato:'Fijo',shift:'Tiempo completo',tab:'criticas',nota:'Cobertura 68%',positions:buildPositions([{pos:'Housekeeper',total:5,cubierto:2},{pos:'Laundry',total:3,cubierto:1}])},
  {id:'REQ #052',hotel:'Hotel Pacífico',zona:'Oeste',lider:'Elena Ruiz',urg:'low',state:'proceso',age:'Hace 1 h',period:'08–14 Dic',contrato:'Temporal',shift:'Por horas',tab:'todas',takers:[{id:'r3'}],positions:buildPositions([{pos:'Steward',total:8,cubierto:5}])}
];

// (Los datos de Blacklist viven ahora en blacklist.js — módulo portado del Líder de Grupo.)

let INC=[
  {id:'INC-31',tipo:'Sobrecarga de Reclutadora',origen:'Líder · Marco Díaz',zona:'Sur',prio:'alta',estado:'Abierto',fecha:'18 Jun',hotel:'',desc:'El Líder reporta que una de sus reclutadoras supera el umbral de carga (cobertura cayendo) y pide redistribuir requisiciones o apoyo temporal.'},
  {id:'INC-29',tipo:'Conflicto candidato / hotel',origen:'Inspector',zona:'Noroeste',prio:'alta',estado:'En investigación',fecha:'17 Jun',hotel:'Hotel Bahía',desc:'El Inspector de zona detectó un conflicto entre un candidato asignado y el personal del hotel durante una visita. Adjunta su investigación.'},
  {id:'INC-27',tipo:'Disputa de cobertura comercial',origen:'Líder · Elena Ruiz',zona:'Este',prio:'crit',estado:'Abierto',fecha:'16 Jun',hotel:'Hotel Sierra',desc:'Disputa de cobertura con el área comercial: el hotel exige más colaboradores de los autorizados en la requisición. Riesgo de pérdida de cliente.'},
  {id:'INC-25',tipo:'Disputa de cobertura comercial',origen:'Líder · Juanita López',zona:'Centro',prio:'alta',estado:'Escalado a comercial',fecha:'14 Jun',hotel:'Hotel Costa del Sol',desc:'Queja recurrente del Manager de Área sobre la cobertura del fin de semana. Escalado al BD del hotel para alinear expectativas comerciales.'},
  {id:'INC-24',tipo:'Conflicto candidato / hotel',origen:'Inspector',zona:'Sur',prio:'media',estado:'En investigación',fecha:'13 Jun',hotel:'Hotel Punta Vista',desc:'Inconsistencia entre la asignación reportada y lo que el hotel confirma. El Inspector solicita validación del expediente del colaborador.'},
  {id:'INC-22',tipo:'Incumplimiento de SLA en zona',origen:'Sistema',zona:'Noroeste',prio:'media',estado:'Abierto',fecha:'15 Jun',hotel:'',desc:'Alerta automática del sistema: la zona acumula requisiciones urgentes sin tomar por encima del umbral configurado. Requiere intervención del Manager.'}
];
// Ciclo de vida documentado (RF-30/RF-31): Abierto → Investigar → En investigación → decisión.
const INC_STATES=[
  {key:'Abierto',             c:'#E11919', ic:'inbox',         sub:'Recién escalado · sin investigar'},
  {key:'En investigación',    c:'#3B7DDD', ic:'search',        sub:'El Manager revisa el caso'},
  {key:'Esperando info',      c:'#E6B422', ic:'hourglass_top', sub:'Solicitó más información'},
  {key:'Escalado a comercial',c:'#7B2CBF', ic:'north_east',    sub:'Notificado a BD/BDC (RF-31)'},
  {key:'Escalado a Dirección',c:'#FF7A00', ic:'arrow_upward',  sub:'Enviado al Director'},
];
const INC_INSPECTORES={Centro:'Roberto Salinas',Sur:'Renata Páez',Noroeste:'Mónica Ibarra',Este:'Diego Fuentes',Oeste:'Héctor Villalba',Sureste:'Laura Bravo'};
// Involucrados del caso (RF-30): Líder, Reclutadora, Inspector, hotel — según el origen y la zona.
function incInvolucrados(c){
  const out=[];
  const lider=/^Líder/i.test(c.origen)?(c.origen.split('·')[1]||'').trim():(LIDERES.find(l=>l.zona===c.zona)||{}).nombre;
  if(lider){const L=LIDERES.find(l=>l.nombre===lider);out.push({rol:'Líder de Grupo',nombre:lider,ini:lider.split(' ').map(x=>x[0]).slice(0,2).join(''),kind:'lider',sub:L?L.grupo:'Líder de Grupo'});
    if(L&&L.recl&&L.recl[0])out.push({rol:'Reclutadora',nombre:L.recl[0].nombre,ini:L.recl[0].ini,kind:'recl',sub:'Reclutadora · '+L.recl[0].zona});}
  if(/Inspector/i.test(c.origen)||/Conflicto|SLA/i.test(c.tipo)){out.push({rol:'Inspector de zona',nombre:INC_INSPECTORES[c.zona]||'Inspector de zona',ic:'verified_user',kind:'insp',sub:'Inspector · '+c.zona});}
  if(c.hotel){out.push({rol:'Hotel afectado',nombre:c.hotel,ic:'apartment',kind:'hotel',sub:c.zona});}
  if(/Sistema/i.test(c.origen))out.unshift({rol:'Origen',nombre:'Sistema Oranje',ic:'bolt',kind:'sys',sub:'Escalamiento automático'});
  return out;
}

/* ---- Pool: estados del kanban (alineado al Líder de Grupo) ---- */
const STATUSES=[
  {key:'verdef',  color:'#1FA84A', label:'Disponible',       sub:'Listo para asignar'},
  {key:'amarillo',color:'#FFD500', label:'Disp. voluntario', sub:'Por horas / fin de semana'},
  {key:'naranja', color:'#FF7A00', label:'Fijo',             sub:'En requisición permanente'},
  {key:'cafe',    color:'#8B5A2B', label:'Asignación temp.', sub:'Cobertura corta'},
  {key:'verdem',  color:'#7CDB45', label:'Onboarding D1-2',  sub:'Inducción inicial'},
  {key:'azul',    color:'#3FB8E6', label:'Día 3+ uniforme',  sub:'En entrega de uniforme'},
  {key:'blanco',  color:'#E8E0D5', label:'Pre-asignación',   sub:'Captura sin asignar'},
  {key:'rosa',    color:'#FF1493', label:'Stand by',         sub:'Pausa temporal'},
  {key:'morado',  color:'#7B2CBF', label:'No regresó',       sub:'Falta sin aviso'},
  {key:'rojo',    color:'#E11919', label:'Reportado',        sub:'Incidencia abierta'},
  {key:'gris',    color:'#5A5E63', label:'Accidentado',      sub:'Incapacidad médica · protegido'},
  {key:'negro',   color:'#1A1108', label:'Blacklist',        sub:'Vetado'},
];
const GR=['','gradB','gradC','gradD','gradE','gradF','gradG'];
function poolGrad(id){return GR[(id.charCodeAt(2)+id.charCodeAt(3))%GR.length];}
function stColor(k){return (STATUSES.find(s=>s.key===k)||{}).color||'#FF8E00';}
function stLabel(k){return (STATUSES.find(s=>s.key===k)||{}).label||k;}
const _mk=(id,nm,pos,zona,mod,eng,st,hot,d,lider)=>({id,ini:nm.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase(),nombre:nm,pos,zona,mod,eng,st,hoteles:hot,docs:{ID:d>0,SSN:d>1,Foto:d>2},bl:st==='negro',lider:lider||'—'});
let POOL=[
  _mk('C-4521','María López','Housekeeper','Centro','Tiempo completo',3,'verdef',2,3,'Juanita López'),
  _mk('C-7812','Carlos Ruiz','Chef','Sur','Tiempo completo',4,'verdef',1,3,'Marco Díaz'),
  _mk('C-3398','Ana Reyes','Mesero','Centro','Medio tiempo',3,'verdef',2,2,'Juanita López'),
  _mk('C-9023','Luis Pérez','Steward','Sur','Tiempo completo',2,'verdef',1,2,'Marco Díaz'),
  _mk('C-5562','Julia Mendoza','Housekeeper','Oeste','Por horas',2,'amarillo',1,3,'Elena Ruiz'),
  _mk('C-6841','Pedro Salas','Hoseman','Este','Por horas',2,'amarillo',1,1,'—'),
  _mk('C-6620','Rosa Lima','Laundry','Noroeste','Medio tiempo',1,'amarillo',0,2,'Tomás Vela'),
  _mk('C-1108','Rosario Flores','Housekeeper','Sur','Tiempo completo',3,'naranja',2,3,'Marco Díaz'),
  _mk('C-2299','Diego Hernández','Chef','Noroeste','Tiempo completo',2,'naranja',1,2,'Tomás Vela'),
  _mk('C-1190','Karla Vega','Recepción','Centro','Tiempo completo',4,'naranja',2,3,'Juanita López'),
  _mk('C-7741','Laura Castillo','Laundry','Centro','Por horas',2,'cafe',1,3,'Juanita López'),
  _mk('C-7752','Mario Castillo','Steward','Sur','Tiempo completo',2,'cafe',1,2,'Marco Díaz'),
  _mk('C-7760','Nadia Ruiz','Mesero','Oeste','Medio tiempo',3,'cafe',0,1,'Elena Ruiz'),
  _mk('C-9901','Mariana Solís','Mesero','Centro','Tiempo completo',3,'verdem',0,2,'Juanita López'),
  _mk('C-9912','José Aguilar','Steward','Oeste','Medio tiempo',2,'verdem',0,1,'Elena Ruiz'),
  _mk('C-9920','Brenda Mora','Housekeeper','Sur','Tiempo completo',1,'verdem',0,2,'Marco Díaz'),
  _mk('C-3344','Roberto Cruz','Hoseman','Sur','Tiempo completo',2,'azul',1,2,'Marco Díaz'),
  _mk('C-3357','Lorena Bañuelos','Mesero','Centro','Medio tiempo',2,'azul',0,1,'Juanita López'),
  _mk('C-3360','Hugo Lara','Mantenimiento','Este','Tiempo completo',1,'azul',1,2,'—'),
  _mk('C-7700','Sandra Vázquez','Housekeeper','Oeste','Tiempo completo',2,'blanco',0,0,'Elena Ruiz'),
  _mk('C-7705','Tomás Ríos','Mantenimiento','Sureste','Tiempo completo',1,'blanco',0,0,'—'),
  _mk('C-7710','Paula Gil','Recepción','Centro','Medio tiempo',3,'blanco',0,0,'Juanita López'),
  _mk('C-4012','Patricia Núñez','Housekeeper','Centro','Tiempo completo',4,'rosa',1,3,'Juanita López'),
  _mk('C-7780','Daniel Díaz','Mantenimiento','Sureste','Tiempo completo',2,'rosa',0,2,'—'),
  _mk('C-4020','Lucía Parra','Laundry','Sur','Medio tiempo',1,'rosa',1,2,'Marco Díaz'),
  _mk('C-2233','Fernando Lozano','Steward','Centro','Por horas',2,'morado',0,2,'Juanita López'),
  _mk('C-2240','Sofía Ramos','Mesero','Oeste','Medio tiempo',2,'morado',0,1,'Elena Ruiz'),
  _mk('C-2250','Iván Cano','Hoseman','Noroeste','Tiempo completo',1,'morado',0,2,'Tomás Vela'),
  _mk('C-4023','Raúl Treviño','Hoseman','Sur','Tiempo completo',3,'rojo',1,2,'Marco Díaz'),
  _mk('C-2244','Brenda Olivares','Housekeeper','Este','Medio tiempo',2,'rojo',0,2,'—'),
  _mk('C-4030','Diego Lara','Chef','Centro','Tiempo completo',2,'rojo',1,3,'Juanita López'),
  _mk('C-7740','Sofía Cano','Housekeeper','Oeste','Tiempo completo',2,'gris',1,3,'Elena Ruiz'),
  _mk('C-8852','Marcos Vidal','Steward','Sur','Medio tiempo',3,'gris',1,2,'Marco Díaz'),
  _mk('C-5050','Iván Rodríguez','Hoseman','Noroeste','Tiempo completo',2,'negro',2,2,'Tomás Vela'),
  _mk('C-5061','Rocío Méndez','Mesero','Centro','Medio tiempo',2,'negro',2,2,'Juanita López')
];
const SEMCOL={'blanco':{c:'#FFFFFF',b:'#D8CFC4',l:'Pre-asignación'},'verde-manzana':{c:'#7CDB45',b:'#5FBF2E',l:'Día 1-2'},'azul-claro':{c:'#3FB8E6',b:'#2A9BC8',l:'Día 3+'},'naranja':{c:'#FF7A00',b:'#D96400',l:'Fijo'},'verde':{c:'#1FA84A',b:'#178A3C',l:'Disponible'},'amarillo':{c:'#FFD500',b:'#E6C000',l:'Disp. voluntario'},'rosa':{c:'#FF1493',b:'#D11079',l:'Stand-by'},'rojo':{c:'#E11919',b:'#B31313',l:'Reportado'},'gris':{c:'#9A8C7E',b:'#6E635A',l:'Accidentado'},'negro':{c:'#1A1108',b:'#000',l:'Blacklist'}};

let NOTIFS=[
  {id:1,unread:true,ic:'report_problem',cl:'orange',t:'Escalamiento de Líder',x:'Marco Díaz escaló un caso de sobrecarga (INC-31).',tm:'Hace 20 min'},
  {id:2,unread:true,ic:'fact_check',cl:'blue',t:'Investigación adjunta',x:'El Inspector adjuntó la investigación a INC-29.',tm:'Hace 1 h'},
  {id:3,unread:true,ic:'priority_high',cl:'red',t:'Requisición varada',x:'REQ #001 lleva 6 h varada en Centro.',tm:'Hace 2 h'},
  {id:4,unread:true,ic:'block',cl:'purple',t:'Disputa de Blacklist',x:'Jorge Pérez disputó su entrada en Blacklist.',tm:'Hace 3 h'},
  {id:5,unread:true,ic:'insert_chart',cl:'green',t:'Reporte recibido',x:'Reporte semanal de Elena Ruiz recibido.',tm:'Ayer'},
  {id:6,unread:true,ic:'trending_up',cl:'orange',t:'Umbral de carga',x:'Daniela Soto supera el umbral de carga.',tm:'Ayer'}
];
const ICW={green:'var(--green)',orange:'var(--o-600)',blue:'var(--blue)',red:'var(--red)',purple:'var(--purple)'};
const ICBG={green:'#E9F9EF',orange:'var(--o-50)',blue:'#EEF5FF',red:'#FDECEC',purple:'#F3EAFB'};

/* ============================ HELPERS ============================ */
function toast(msg,ic){const t=document.getElementById('toast');const m=document.getElementById('toastMsg');m.textContent=msg;if(typeof LANG!=='undefined'&&LANG==='en')_i18nWalk(m,true);t.querySelector('.mi').textContent=ic||'check_circle';t.classList.add('show');clearTimeout(window._tt);window._tt=setTimeout(()=>t.classList.remove('show'),2800);}
function openModal(html){const b=document.getElementById('modalBg');b.innerHTML=`<div class="modal">${html}</div>`;b.classList.add('show');}
function closeModal(){document.getElementById('modalBg').classList.remove('show');}
function urgChip(k){const u=URG[k];return `<span class="st-chip" style="border-color:${u.b};color:${u.b}"><span class="pip" style="background:${u.c}"></span>${u.label}</span>`;}
function semColChip(k){const s=SEMCOL[k];return `<span class="st-chip" style="border-color:${s.b};color:${s.b};${k==='blanco'?'background:#fff':''}"><span class="pip" style="background:${s.c}"></span>${s.l}</span>`;}
function bar(pct,color){return `<div class="bar"><i style="width:${pct}%;background:${color||'var(--o-500)'}"></i></div>`;}
function cobColor(p){return p>=85?'var(--green)':p>=75?'var(--o-500)':'var(--red)';}

/* Drawer lateral */
function openDrawer(html){
  let bg=document.getElementById('drawerBg');
  if(!bg){bg=document.createElement('div');bg.id='drawerBg';bg.className='drawer-bg';bg.onclick=function(e){if(e.target===bg)closeDrawer();};document.body.appendChild(bg);
    const d=document.createElement('div');d.id='drawer';d.className='drawer';document.body.appendChild(d);}
  document.getElementById('drawer').innerHTML=html;
  document.getElementById('drawerBg').classList.add('show');
  setTimeout(()=>document.getElementById('drawer').classList.add('show'),10);
}
function closeDrawer(){const d=document.getElementById('drawer');if(d)d.classList.remove('show');const b=document.getElementById('drawerBg');if(b)b.classList.remove('show');}
function drawerTab(el,id){el.parentElement.querySelectorAll('.drawer-tab').forEach(t=>t.classList.remove('active'));el.classList.add('active');document.querySelectorAll('#drawer [data-pane]').forEach(p=>p.style.display='none');const pane=document.querySelector('#drawer [data-pane="'+id+'"]');if(pane)pane.style.display='';}

/* ============================ i18n (ES / EN) ============================ */
let LANG='es';
const _i18nOrig=new WeakMap(), _i18nPh=new WeakMap();
const I18N={
  // Tema (modo claro/oscuro)
  'Tema':'Theme','Claro':'Light','Oscuro':'Dark',
  // Sidebar / nav
  'Principal':'Main','Requisiciones':'Requisitions','Reclutamiento':'Recruitment','Supervisión':'Supervision',
  'Mi Equipo':'My Team','Incidencias':'Incidents','Reportes':'Reports','Cerrar sesión':'Log out',
  // Perfil / Mi información (estilo Líder)
  'Cuenta':'Account','Mi información':'My information','Mi alcance':'My scope','Mis métricas globales':'My global metrics','Mis métricas':'My metrics','Mi equipo':'My team','Seguridad':'Security','Preferencias':'Preferences','Volver':'Back','Mi cuenta':'My account','Configuración':'Settings',
  'Depto. completo':'Whole dept.','Departamento de Reclutamiento':'Recruitment Department',
  'Consulta los datos de tu perfil o cambia tu foto de perfil.':'View your profile data or change your profile photo.',
  'Mi información de perfil':'My profile information','Nombre completo':'Full name','Correo electrónico':'Email address','Rol':'Role',
  'Tu ámbito de supervisión: todo el departamento de Reclutamiento.':'Your supervision scope: the entire Recruitment department.',
  'Alcance':'Scope','Líderes de Grupo a cargo':'Group Leaders in charge',
  'Indicadores globales de tu gestión como Manager del departamento.':'Global indicators of your management as department Manager.',
  'Casos escalados abiertos':'Open escalated cases','Requisiciones activas':'Active requisitions','Líderes activos':'Active Leaders',
  'Administra tu contraseña y la seguridad de tu cuenta.':'Manage your password and account security.',
  'Contraseña':'Password','Cambiar contraseña':'Change password','Autenticación de dos factores':'Two-factor authentication','Configurar 2FA':'Set up 2FA','Sesiones activas':'Active sessions','Ver dispositivos conectados':'View connected devices',
  'Personaliza tu experiencia en la plataforma.':'Customize your platform experience.',
  'Notificaciones':'Notifications','Email, push y en la app':'Email, push and in-app','Idioma':'Language','Español (México)':'Spanish (Mexico)','Tema':'Theme','Claro':'Light',
  'Subir nueva foto…':'Upload new photo…','Cambiar foto':'Change photo','Próximamente':'Coming soon',
  // Header / perfil
  'Manager de Reclutamiento':'Recruitment Manager','Reclutamiento Nacional':'National Recruitment',
  'Buscar requisiciones, líderes, reclutadoras, zonas, blacklist…':'Search requisitions, leaders, recruiters, zones, blacklist…',
  'Mi información':'My information','Mi equipo':'My team','Mis métricas globales':'My global metrics','Configuración':'Settings','Idioma':'Language',
  'Notificaciones':'Notifications','Marcar todas como leídas':'Mark all as read',
  // Notificaciones (títulos + cuerpos)
  'Escalamiento de Líder':'Leader escalation','Investigación adjunta':'Investigation attached','Requisición varada':'Stranded requisition',
  'Disputa de Blacklist':'Blacklist dispute','Reporte recibido':'Report received','Umbral de carga':'Workload threshold',
  'Marco Díaz escaló un caso de sobrecarga (INC-31).':'Marco Díaz escalated an overload case (INC-31).',
  'El Inspector adjuntó la investigación a INC-29.':'The Inspector attached the investigation to INC-29.',
  'REQ #001 lleva 6 h varada en Centro.':'REQ #001 has been stranded 6 h in Central.',
  'Jorge Pérez disputó su entrada en Blacklist.':'Jorge Pérez disputed his Blacklist entry.',
  'Reporte semanal de Elena Ruiz recibido.':'Weekly report from Elena Ruiz received.',
  'Daniela Soto supera el umbral de carga.':'Daniela Soto exceeds the workload threshold.','Ayer':'Yesterday',
  // Buscador (dd)
  'Líderes de Grupo':'Group Leaders','Zonas':'Zones','Líder':'Leader','Zona':'Zone',
  // Zonas (nombres)
  'Centro':'Central','Sur':'South','Este':'East','Oeste':'West','Noroeste':'Northwest','Sureste':'Southeast',
  // Dashboard
  'PANORAMA DEL DEPARTAMENTO':'DEPARTMENT OVERVIEW','Cobertura global 84%':'Global coverage 84%',
  '3 zonas en riesgo · 6 casos escalados pendientes · 5 semáforos rojos activos':'3 zones at risk · 6 escalated cases pending · 5 active red flags',
  'Cobertura global':'Global coverage','requisiciones activas':'active requisitions','Cubiertas':'Covered',
  'parciales ·':'partial ·','pendientes':'pending','Casos escalados abiertos':'Open escalated cases','semáforos rojos activos':'active red flags',
  'Indicador de calidad':'Quality indicator','Líderes activos':'Active Leaders','Bandeja de acción':'Action tray',
  'Escalamientos':'Escalations','Equipo':'Team','Ranking de Líderes':'Leaders ranking','Ver Mi Equipo':'See My Team',
  'Cobertura por zona':'Coverage by zone','En riesgo':'At risk',
  'Cobertura global · últimas 6 semanas':'Global coverage · last 6 weeks','Requisiciones por urgencia':'Requisitions by urgency','Ver todas':'See all',
  'Pipeline de Entrevistas':'Interviews pipeline','Ver Entrevistas':'See Interviews','Actual':'Current','Requisiciones filtradas por urgencia':'Requisitions filtered by urgency',
  'Requisición':'Requisition','Cobertura':'Coverage','Parciales':'Partial','Pendientes':'Pending',
  'Intervenir':'Intervene','Abrir caso':'Open case','Ver equipo':'See team','Ver':'View',
  'Daniela Soto supera el umbral de carga':'Daniela Soto exceeds the workload threshold',
  // Requisiciones
  'Vista global del departamento. Intervención excepcional del Manager (modelo Self-Pick).':'Department-wide view. Exceptional Manager intervention (Self-Pick model).',
  'Activas (global)':'Active (global)','Críticas / varadas':'Critical / stranded','VIP pendientes':'VIP pending',
  'Todas (global)':'All (global)','Críticas / Varadas':'Critical / Stranded','Mis tomadas':'My taken',
  'Hotel · Zona':'Hotel · Zone','Urgencia':'Urgency','Sin requisiciones en esta bandeja':'No requisitions in this tray',
  'Sin requisiciones con esos filtros':'No requisitions with those filters','Toda urgencia':'Any urgency','Toda posición':'Any position','Buscar por ID o hotel…':'Search by ID or hotel…',
  // Posiciones
  'Recepción':'Reception','Mantenimiento':'Maintenance','Mesero':'Waiter',
  // Urgencia (chips)
  'Urgente':'Urgent','Media':'Medium','Cubierta':'Covered',
  // Drawer requisición
  'Detalle':'Detail','Historial':'History','Participantes':'Participants',
  'Posiciones cubiertas':'Positions covered','Líder de zona':'Zone leader',
  'Requisición autorizada':'Requisition authorized','Tomada por reclutadora':'Taken by recruiter','Progreso actual':'Current progress',
  'Modelo colaborativo (RR-15): varios reclutadores pueden participar. Sin estado "Liberada".':'Collaborative model (RR-15): several recruiters can participate. No "Released" status.',
  'Participante':'Participant','Apoyo':'Support',
  'Tomar como Manager':'Take as Manager','Asignar a Reclutadora':'Assign to Recruiter','Reasignar':'Reassign','Forzar semáforo':'Force status flag',
  // Modales requisición
  'Intervención excepcional. Te registras como participante (no bloquea, RR-15). Queda en log auditable.':'Exceptional intervention. You register as a participant (no blocking, RR-15). Logged for audit.',
  'Justificación':'Justification','Motivo de la intervención (obligatorio)…':'Reason for the intervention (required)…',
  'Cancelar':'Cancel','Confirmar':'Confirm','Reclutadora':'Recruiter','Selecciona…':'Select…','Modo':'Mode',
  'Agregar como participante':'Add as participant','Se suma al equipo de la requisición (RR-15)':'Joins the requisition team (RR-15)',
  'Transferir':'Transfer','Entrega completa de la requisición':'Full handover of the requisition','Motivo (obligatorio)…':'Reason (required)…','Asignar':'Assign',
  'Nueva reclutadora':'New recruiter','La original pierde acceso':'The original loses access','Agregar como apoyo':'Add as support',
  'La original sigue como participante':'The original stays as participant','Motivo':'Reason',
  'Override manual. Prevalece hasta el próximo recálculo. Queda en log auditable (RR-12) y notifica al Líder y a la Reclutadora.':'Manual override. Prevails until the next recalculation. Logged for audit (RR-12) and notifies the Leader and the Recruiter.',
  'Semáforo':'Status flag','Semáforo de Requisición':'Requisition status flag','Semáforo de Urgencia':'Urgency status flag','Semáforo de Posiciones':'Positions status flag',
  'Valor destino':'Target value','Verde':'Green','Ámbar':'Amber','Rojo':'Red','Motivo del override (obligatorio)…':'Override reason (required)…','Aplicar override':'Apply override',
  // Reclutamiento
  'Pool global del departamento (todas las zonas). Visor y apoyo operativo excepcional.':'Department-wide pool (all zones). Viewer and exceptional operational support.',
  'Nuevo colaborador':'New collaborator','Pool global':'Global pool','Disponibles':'Available','Pendientes de validar':'Pending validation','Disp. voluntarios':'Voluntary available',
  'Colaborador':'Collaborator','Posición':'Position','Estado':'Status',
  // Semáforo (labels)
  'Pre-asignación':'Pre-assignment','Día 1-2':'Day 1-2','Día 3+':'Day 3+','Fijo':'Fixed','Disponible':'Available','Disp. voluntario':'Voluntary available',
  'Stand-by':'Stand-by','Reportado':'Reported','Accidentado':'Injured',
  'Líder de grupo':'Group leader','Estado del semáforo':'Status flag',
  'El Manager ve el pool global como supervisor. Las acciones operativas son de apoyo excepcional.':'The Manager sees the global pool as a supervisor. Operational actions are exceptional support.',
  'Editar':'Edit','Asignar a hotel':'Assign to hotel',
  // Blacklist (claves base; el módulo portado del Líder añade las suyas más abajo)
  'Agregar a Blacklist':'Add to Blacklist','Colaboradores vetados':'Banned collaborators',
  'Propuesto por':'Proposed by','3 inasistencias':'3 absences','Falta grave':'Serious misconduct',
  'Vetado':'Banned',
  'Motivo del veto':'Reason for ban','Fecha del veto':'Ban date','Caso':'Case',
  'Evidencia':'Evidence','comentario del proponente':"proposer's comment",'reporte-asistencia.pdf':'attendance-report.pdf','investigacion.pdf':'investigation.pdf',
  // === Blacklist · módulo portado del Líder (vistas/filtros/drawer/alta) ===
  'Control de calidad · Vetados y disputas':'Quality control · Banned & disputes',
  'Control de calidad · Vetados del departamento':'Quality control · Department bans','Hoteles con reportes':'Hotels with reports','reportes':'reports',
  'Consulta global de la blacklist del departamento, su motivo y quién lo propuso. Cualquier rol de Reclutamiento puede agregar con su justificación. El veto es permanente; las disputas las resuelve el Inspector de zona.':'Department-wide view of the blacklist, its reason and who proposed it. Any Recruitment role can add with their justification. The ban is permanent; disputes are resolved by the Zone Inspector.',
  'de la plataforma.':'from the platform.','Colaboradores':'Collaborators',
  'Total vetados':'Total banned','Por 3 faltas':'For 3 absences','3 faltas':'3 absences','3 faltas (inasistencias)':'3 absences (no-shows)',
  'Automático · sistema · 3ª inasistencia':'Automatic · system · 3rd absence','Crítico · baja inmediata':'Critical · immediate termination',
  'Sin colaboradores':'No collaborators','Sin colaboradores para los filtros aplicados':'No collaborators for the applied filters',
  'Todos los motivos':'All reasons','Todos los vetados':'All banned','Reclutador':'Recruiter','Sistema':'System',
  'Vetado por':'Banned by','Periodo':'Period','Cualquiera':'Any','Cualquier fecha':'Any date','Personalizado':'Custom','Limpiar':'Clear',
  'Último mes':'Last month','Últimos 3 meses':'Last 3 months','Últimos 6 meses':'Last 6 months','Último año':'Last year','3 meses':'3 months','6 meses':'6 months',
  'Todas las zonas':'All zones','Todos':'All','QA':'QA','QA · Operaciones':'QA · Operations','Control de calidad':'Quality control',
  'Buscar por teléfono, nombre o documento (SSN)…':'Search by phone, name or document (SSN)…','Agregar a blacklist':'Add to blacklist',
  'Vetado · Blacklist':'Banned · Blacklist',
  // drawer — Datos / Laboral / Blacklist
  'Datos del candidato':'Candidate data','Datos de emergencia':'Emergency data','Solo lectura':'Read-only',
  'El colaborador proporcionó estos datos en su app durante el onboarding. La información es':'The collaborator provided this data in their app during onboarding. The information is','de solo lectura':'read-only',
  'Género':'Gender','Correo electrónico':'Email address','Domicilio':'Address',
  'Contacto de emergencia':'Emergency contact','Tipo de sangre':'Blood type','Alergias o condiciones':'Allergies or conditions',
  'Datos laborales':'Work data','Nivel de inglés':'English level','Experiencia':'Experience','Tipo de transporte':'Transport type',
  'Justificación':'Justification','Pruebas / evidencia':'Evidence / proof','Ingreso a blacklist':'Blacklist entry','Ingreso a Blacklist':'Blacklist entry',
  'Origen del registro':'Record origin','Escalamiento automático del sistema':'Automatic system escalation','Fecha de ingreso':'Entry date','Registrado por':'Registered by','Sistema Oranje':'Oranje System','Escalamiento automático · 3ª inasistencia':'Automatic escalation · 3rd absence',
  'Reportado por':'Reported by','Investigado y vetado por':'Investigated and banned by','Investigado y resuelto por':'Investigated and resolved by','Hotel donde ocurrió':'Hotel where it occurred','Responsables':'Responsible parties','Registro':'Record',
  'Estado Negro · veto permanente':'Black status · permanent ban',
  'No existe proceso de rehabilitación ni instancia de apelación. El registro se conserva íntegro para consulta interna y':'There is no rehabilitation process or appeal instance. The record is kept intact for internal reference and',
  'no aparece en búsquedas activas':'does not appear in active searches','de reclutamiento.':'of recruitment.',
  // drawer — timeline (Historial) labels + comentarios fijos
  'Fecha:':'Date:','Responsable:':'Responsible:','Hotel:':'Hotel:','Reporte del hotel':'Hotel report','Investigación · Inspector':'Investigation · Inspector',
  '"Falta grave reportada en la operación."':'"Serious misconduct reported in operations."',
  '"Caso investigado y validado a favor del hotel."':'"Case investigated and validated in favor of the hotel."',
  '"Veto permanente · estado Negro · sin apelación."':'"Permanent ban · Black status · no appeal."',
  '"3ª inasistencia sin justificar — escalamiento automático a Blacklist (estado Negro)."':'"3rd unjustified absence — automatic escalation to Blacklist (Black status)."',
  // modal de alta multipaso (Agregar a blacklist)
  'El colaborador quedará vetado de la plataforma. Esta acción se registra con tu nombre y requiere una justificación.':'The collaborator will be banned from the platform. This action is recorded under your name and requires a justification.',
  'Colaborador':'Collaborator','Estado':'Status','Todas':'All',
  'Buscar en el pool por nombre, DOC o zona…':'Search the pool by name, DOC or zone…','Ver perfil':'View profile','Seleccionar para vetar':'Select to ban',
  'Sin coincidencias en el pool de colaboradores':'No matches in the collaborator pool',
  'Conducta grave · baja inmediata. El veto manual aplica solo a faltas graves; las 3 inasistencias las escala el sistema automáticamente.':'Serious conduct · immediate termination. Manual banning applies only to serious misconduct; the 3 absences are escalated automatically by the system.',
  'Tipo de falta grave':'Type of serious misconduct','Selecciona el tipo de falta grave…':'Select the type of serious misconduct…',
  'Otro (especificar)':'Other (specify)','Especifica el motivo de la falta grave…':'Specify the reason for the serious misconduct…',
  'Robo':'Theft','Agresión / violencia':'Assault / violence','Acoso':'Harassment','Abandono de puesto':'Job abandonment','Falta a la seguridad':'Safety violation','Consumo de sustancias':'Substance use',
  'Describe brevemente lo ocurrido (mínimo 8 caracteres). Quedará en el historial del colaborador.':"Briefly describe what happened (minimum 8 characters). It will be kept in the collaborator's history.",
  'Ej. Reincidencia en inasistencias sin aviso durante el turno asignado en Costa del Sol…':'E.g. Repeated absences without notice during the assigned shift at Costa del Sol…',
  'Adjunta fotos, reportes o documentos que respalden el veto. Quedarán en el expediente del colaborador.':"Attach photos, reports or documents supporting the ban. They will be kept in the collaborator's file.",
  'Adjunta pruebas o documentos de soporte':'Attach proof or supporting documents','Capturas, correos, comprobantes · PDF, JPG, PNG · máx. 10 MB c/u':'Screenshots, emails, receipts · PDF, JPG, PNG · max. 10 MB each','Examinar':'Browse','Confirmar veto':'Confirm ban',
  'Alemán':'German','Francés':'French','Italiano':'Italian','Portugués':'Portuguese','Básico':'Basic','Intermedio':'Intermediate','Avanzado':'Advanced',
  // Requisiciones — Tablero (columnas + tarjeta rica)
  'Estado de urgencia':'Urgency status','Menos de 72 horas':'Less than 72 hours','Entre 72 y 120 horas':'Between 72 and 120 hours','Más de 120 horas':'More than 120 hours',
  'Cobertura de vacantes':'Vacancy coverage','Ver detalle':'View detail','Sin requisiciones':'No requisitions',
  'Autorizada':'Authorized','En colaboración':'In collaboration','Ya puede recibir colaboradores':'Ready to receive collaborators','Prioridad alta':'High priority',
  'Decisión':'Decision','Mantener veto':'Keep ban','Comentario':'Comment',
  'Fundamento de la decisión (mín. 30 caracteres)…':'Basis for the decision (min. 30 characters)…',
  'Se notifica al colaborador y a la reclutadora proponente.':'The collaborator and the proposing recruiter are notified.',
  'Notificar a las partes':'Notify the parties','Resolver':'Resolve',
  'Al remover, el colaborador se reactiva en el Pool con estado':'On removal, the collaborator is reactivated in the Pool with status',
  'Verde fuerte':'Strong green','(<1 min). Queda en log auditable.':'(<1 min). Logged for audit.',
  'Motivo de la remoción (obligatorio)…':'Reason for removal (required)…','Remover':'Remove',
  'Buscar por nombre o documento…':'Search by name or document…','Descripción detallada':'Detailed description',
  'Describe el motivo (mín. 30 caracteres)…':'Describe the reason (min. 30 characters)…','Adjunta evidencia':'Attach evidence',
  'PDF, JPG, PNG · máx. 10 MB c/u':'PDF, JPG, PNG · max. 10 MB each','Agregar':'Add',
  // Mi Equipo
  'Gestión de Líderes de Grupo y sus Reclutadoras (RF-29).':'Management of Group Leaders and their Recruiters (RF-29).',
  'Supervisión del departamento · RF-29':'Department supervision · RF-29',
  'Gestiona Líderes de Grupo y sus Reclutadoras: alta, edición, movimiento entre grupos y cambio de estado. Métricas individuales por reclutadora sin importar su Líder (RF-23).':'Manage Group Leaders and their Recruiters: create, edit, move between groups and change status. Individual metrics per recruiter regardless of their Leader (RF-23).',
  'Mi':'My','Líderes de Grupo':'Group Leaders','Reclutadoras del grupo':'Recruiters of the group',
  'cobertura':'coverage','asignación':'assignment','escalados':'escalated',
  'Nueva Reclutadora':'New Recruiter','Nuevo Líder':'New Leader','Reclutadoras':'Recruiters','Cobertura promedio':'Average coverage','Casos escalados':'Escalated cases',
  'Líder · Grupo':'Leader · Group','Escalados':'Escalated','Sobrecarga':'Overload',
  'Métricas':'Metrics','Mover':'Move','Editar Líder':'Edit Leader','Cambiar estado':'Change status',
  'Métricas individuales (RF-23). El Manager ve a cualquier reclutadora sin importar su Líder.':'Individual metrics (RF-23). The Manager can see any recruiter regardless of her Leader.',
  'Cobertura del mes':'Coverage this month','Tiempo prom. asignación':'Avg. assignment time','Requisiciones cubiertas':'Requisitions covered',
  'Exportar':'Export','Enviar al Líder':'Send to Leader',
  'Alta de Líder de Grupo':'New Group Leader','Alta de Reclutadora':'New Recruiter','Nombre completo':'Full name','Documento':'Document','Correo':'Email','Teléfono':'Phone',
  'Nombre del grupo':'Group name','Líder de Grupo':'Group Leader','Crear':'Create',
  'Puedes editar rol, zona y grupo. No puedes editar tu propio rol.':'You can edit role, zone and group. You cannot edit your own role.','Guardar':'Save',
  'Líder destino':'Target Leader','Activo':'Active','Inactivo':'Inactive','Vacaciones':'Vacation','Baja':'Termination','Motivo…':'Reason…',
  'Si es un Líder con reclutadoras activas, reasigna primero su grupo.':'If it is a Leader with active recruiters, reassign their group first.','Aplicar':'Apply',
  'Ya existe un usuario con ese correo':'A user with that email already exists','Reasigna primero las reclutadoras de este Líder':"Reassign this Leader's recruiters first",
  'Demo: usa juanita.lopez@oranje.com para ver la validación de duplicado.':'Demo: use juanita.lopez@oranje.com to see the duplicate validation.',
  // Reportes
  'Reportes del departamento · RF-24':'Department reports · RF-24','y analítica':'& analytics',
  'Revisa los reportes que envían los Líderes de Grupo y genera reportes globales de tu departamento para tu seguimiento y supervisión —cobertura, comparativas, tiempos y casos escalados— con vista previa y envío recurrente.':'Review the reports sent by Group Leaders and generate global department reports for your own tracking and supervision —coverage, comparatives, times and escalated cases— with preview and recurring delivery.',
  'Mi supervisión':'My supervision','Accidentado':'Injured','Incapacidad médica · protegido':'Medical leave · protected',
  'Recibidos esta semana':'Received this week','Sin revisar':'Unreviewed','Envíos programados':'Scheduled sends','Cobertura global':'Global coverage',
  'Reportes recibidos de los Líderes':'Reports received from Leaders','Generar reporte global':'Generate global report','Tipo de reporte':'Report type',
  'Filtrar por zona':'Filter by zone','Filtrar por Líder':'Filter by Leader','(opcional)':'(optional)',
  'Formato':'Format','Destinatario':'Recipient','Solo yo':'Only me','Comercial (BD/BDC)':'Sales (BD/BDC)','Dirección':'Management',
  'Vista previa':'Preview','Vista previa del reporte':'Report preview','Programar envío':'Schedule send','Programar envío recurrente':'Schedule recurring send',
  'Envíos programados (recurrentes)':'Scheduled sends (recurring)','Sin envíos programados':'No scheduled sends',
  'Frecuencia':'Frequency','Cuándo':'When','Ej. Lunes 08:00':'E.g. Monday 08:00','Semanal':'Weekly','Quincenal':'Biweekly','Mensual':'Monthly','Programar':'Schedule','Quitar':'Remove',
  'El reporte':'The report','se generará y enviará automáticamente con la frecuencia que elijas.':'will be generated and sent automatically at the frequency you choose.',
  'Reporte semanal enviado por el Líder de Grupo. Resumen de su grupo para tu revisión.':'Weekly report sent by the Group Leader. Summary of their group for your review.',
  'Indicadores del grupo':'Group indicators','Descargar':'Download','Ver grupo en Mi Equipo':'View group in My Team','Semana actual':'Current week','Periodo':'Period','Grupo':'Group',
  'Comparativa de Líderes':'Leaders comparison','Comparativa de zonas':'Zones comparison','Tiempos de asignación':'Assignment times',
  // Incidencias
  'Casos escalados desde Líderes, Inspectores y el sistema. Decisión final del Manager.':'Cases escalated from Leaders, Inspectors and the system. Final decision by the Manager.',
  'Supervisión · Decisión final del Manager':'Supervision · Manager final decision',
  'Casos escalados desde Líderes, Inspectores y el sistema. El Manager los recibe, investiga y decide: resolver (RF-30), escalar a comercial (RF-31) o escalar a Dirección.':'Cases escalated from Leaders, Inspectors and the system. The Manager receives, investigates and decides: resolve (RF-30), escalate to sales (RF-31) or escalate to Management.',
  'Casos escalados':'Escalated cases','Buscar por ID, tipo, origen o zona…':'Search by ID, type, origin or zone…','Fecha':'Date',
  'Sin incidencias que coincidan':'No matching incidents',
  // Incidencias — tablero (subtítulos de estado) + drawer (expediente RF-30/RF-31)
  'Recién escalado · sin investigar':'Recently escalated · not investigated','El Manager revisa el caso':'The Manager reviews the case',
  'Solicitó más información':'Requested more information','Notificado a BD/BDC (RF-31)':'Notified to BD/BDC (RF-31)','Enviado al Director':'Sent to the Director',
  'Sin casos':'No cases','Sin involucrados registrados':'No registered parties',
  'Descripción del caso':'Case description','Hotel afectado':'Affected hotel','Involucrados':'Involved parties','Origen':'Origin',
  'Investigar caso':'Investigate case','Investigación iniciada':'Investigation started','El Manager revisa evidencia e involucrados':'The Manager reviews evidence and involved parties',
  'Partes involucradas. El cierre del caso las notifica a todas (RF-30).':'Involved parties. Closing the case notifies them all (RF-30).',
  'Evidencia del caso. El Manager la revisa al investigar y la adjunta si escala a comercial (RF-31).':'Case evidence. The Manager reviews it when investigating and attaches it if escalating to sales (RF-31).',
  // banners por estado (fragmentos separados por <strong>)
  'Recién escalado.':'Recently escalated.','En investigación.':'Under investigation.','Esperando información.':'Awaiting information.','Escalado a comercial (RF-31).':'Escalated to sales (RF-31).','Escalado a Dirección.':'Escalated to Management.',
  'La incidencia llegó al Manager en menos de 1 min. Pulsa':'The incidence reached the Manager in under 1 min. Click',
  'para revisar evidencia, involucrados e historial antes de decidir (RF-30).':'to review evidence, involved parties and history before deciding (RF-30).',
  'Revisa la evidencia y decide: Resolver, Escalar a comercial (RF-31) o Solicitar más información. Toda decisión exige comentario y queda en log auditable.':'Review the evidence and decide: Resolve, Escalate to sales (RF-31) or Request more information. Every decision requires a comment and is recorded in the audit log.',
  'Solicitaste más datos a las partes; el caso sigue abierto a la espera de respuesta.':'You requested more data from the parties; the case stays open awaiting a response.',
  'El BD/BDC del hotel fue notificado con el caso. Puedes resolver o escalar a Dirección.':'The hotel BD/BDC was notified with the case. You can resolve or escalate to Management.',
  'El caso completo fue enviado al Director; queda registro.':'The full case was sent to the Director; a record is kept.',
  // timeline del drawer
  'Asignado al Manager':'Assigned to the Manager','Hace < 1 min · automático (RF-30)':'< 1 min ago · automatic (RF-30)',
  'A la espera de respuesta de las partes':'Awaiting a response from the parties',
  'Escalado a comercial · BD/BDC notificado':'Escalated to sales · BD/BDC notified','RF-31 · queda en log auditable':'RF-31 · recorded in the audit log','Caso completo enviado al Director':'Full case sent to the Director',
  // descripciones de los casos
  'El Líder reporta que una de sus reclutadoras supera el umbral de carga (cobertura cayendo) y pide redistribuir requisiciones o apoyo temporal.':'The Leader reports that one of their recruiters exceeds the workload threshold (coverage dropping) and asks to redistribute requisitions or get temporary support.',
  'El Inspector de zona detectó un conflicto entre un candidato asignado y el personal del hotel durante una visita. Adjunta su investigación.':'The Zone Inspector detected a conflict between an assigned candidate and the hotel staff during a visit. Their investigation is attached.',
  'Disputa de cobertura con el área comercial: el hotel exige más colaboradores de los autorizados en la requisición. Riesgo de pérdida de cliente.':'Coverage dispute with the sales area: the hotel demands more collaborators than authorized in the requisition. Risk of losing the client.',
  'Queja recurrente del Manager de Área sobre la cobertura del fin de semana. Escalado al BD del hotel para alinear expectativas comerciales.':'Recurring complaint from the Area Manager about weekend coverage. Escalated to the hotel BD to align commercial expectations.',
  'Inconsistencia entre la asignación reportada y lo que el hotel confirma. El Inspector solicita validación del expediente del colaborador.':'Inconsistency between the reported assignment and what the hotel confirms. The Inspector requests validation of the collaborator file.',
  'Alerta automática del sistema: la zona acumula requisiciones urgentes sin tomar por encima del umbral configurado. Requiere intervención del Manager.':'Automatic system alert: the zone has urgent untaken requisitions above the configured threshold. Requires Manager intervention.',
  'Inspector':'Inspector','Inspector de zona':'Zone Inspector','Líder de Grupo':'Group Leader','Escalamiento automático':'Automatic escalation','Media':'Medium',
  'Casos abiertos':'Open cases','En investigación':'Under investigation','Escalados a comercial':'Escalated to sales','SLA en riesgo':'SLA at risk',
  'Origen':'Origin','Prioridad':'Priority','Sistema':'System',
  'Abierto':'Open','Escalado a comercial':'Escalated to sales','Escalado a Dirección':'Escalated to Management','Esperando info':'Awaiting info',
  'Crítica':'Critical','Alta':'High','Baja':'Low',
  'Tipo':'Type','capturas (3)':'screenshots (3)','Caso escalado':'Case escalated','Asignado al Manager':'Assigned to the Manager','Mismo día':'Same day',
  'Escalar a comercial':'Escalate to sales','Escalar a Dirección':'Escalate to Management',
  'Resolver caso':'Resolve case','Solicitar más información':'Request more information','Resolución / instrucciones (obligatorio)…':'Resolution / instructions (required)…',
  'Destinatario (BD / BDC)':'Recipient (BD / BDC)','Business Developer Coordinator':'Business Developer Coordinator','Contexto':'Context',
  'Contexto del escalamiento…':'Escalation context…','Adjuntar evidencia':'Attach evidence','Escalar':'Escalate',
  'Resumen / contexto':'Summary / context','Resumen del caso para Dirección (obligatorio)…':'Case summary for Management (required)…',
  // Reportes
  'Reportes recibidos de los Líderes y generación de reportes globales para Dirección.':'Reports received from Leaders and generation of global reports for Management.',
  'Generar reporte global':'Generate global report','Reportes recibidos de Líderes':'Reports received from Leaders',
  'Tipo de reporte':'Report type','Comparativa de Líderes':'Leaders comparison','Comparativa de zonas':'Zones comparison',
  'Tiempos de asignación':'Assignment times','Desde':'From','Hasta':'To','Formato':'Format','Vista previa':'Preview','Programar':'Schedule',
  'Vista previa · Cobertura global':'Preview · Global coverage','Enviar a Dirección':'Send to Management',
  // Reclutamiento — Pool + Entrevistas
  'Pool de Colaboradores':'Collaborator Pool','Entrevistas':'Interviews',
  'Vista global del departamento (todas las zonas). El Manager supervisa el Pool y las Entrevistas; las acciones operativas son apoyo excepcional.':'Department-wide view (all zones). The Manager supervises the Pool and the Interviews; operational actions are exceptional support.',
  'Todos los Líderes':'All Leaders','Todas las zonas':'All zones','Todas las Reclutadoras':'All Recruiters',
  'Buscar colaborador por nombre…':'Search collaborator by name…','Buscar candidato por nombre…':'Search candidate by name…',
  'Sin colaboradores con esos filtros':'No collaborators with those filters','Sin candidatos en esta bandeja con los filtros aplicados':'No candidates in this tray with the applied filters',
  '🌐 Histórico global del depto':'🌐 Department-wide history','👤 Mis entrevistas':'👤 My interviews','Exportar lista':'Export list',
  'Candidatos en proceso':'Candidates in process','Atascados (>7 días)':'Stuck (>7 days)','Conversión F1 → Pool':'F1 → Pool conversion',
  'Pendientes de App':'Pending app','Pendientes de Validar':'Pending validation','Borradores':'Drafts','Abandonados':'Abandoned','Validados':'Validated',
  'Candidato':'Candidate','Días en estado':'Days in status',
  // Entrevistas — drawer
  'Fase 1':'Phase 1','Fase 2':'Phase 2','Fase 3':'Phase 3','Comunicación':'Communication','Documentos':'Documents','Bitácora':'Log','Validación':'Validation',
  'Reclutadora responsable':'Responsible recruiter','Desempeño':'Performance','Validador':'Validator',
  'El Manager ve este expediente como supervisor / auditor. La gestión rutinaria la hace la Reclutadora; cualquier acción del Manager queda en log auditable (RR-12).':'The Manager sees this file as a supervisor / auditor. Routine handling is done by the Recruiter; any Manager action is recorded in the audit log (RR-12).',
  'Posición prevista':'Expected position','Modalidad prevista':'Expected modality','Fecha de entrevista':'Interview date',
  'Nivel de inglés':'English level','Intermedio':'Intermediate','Experiencia':'Experience','1–2 años':'1–2 years','Transporte':'Transport','Transporte público':'Public transport','Modalidad':'Modality','Proporcionado':'Provided',
  'Aún no completada por el colaborador':'Not completed by the collaborator yet',
  'Contacto de emergencia':'Emergency contact','Registrado':'Registered','Parentesco':'Relationship','Familiar':'Relative','Tipo de sangre':'Blood type','Alergias':'Allergies','Ninguna':'None',
  'Link de la app enviado':'App link sent','Recordatorio enviado':'Reminder sent','App aún no abierta':'App not opened yet','Abrió la app':'Opened the app',
  'identificacion.pdf':'identification.pdf','foto-perfil.jpg':'profile-photo.jpg',
  'Expediente creado':'File created','Fase 1 registrada':'Phase 1 recorded','Alta validada':'Sign-up validated',
  // Entrevistas — acciones / modales
  'Validar alta':'Validate sign-up','Comentar':'Comment','Solicitar acción':'Request action','Marcar abandonado':'Mark abandoned','Rechazar':'Reject',
  // Supervisión Entrevistas — reformuladas sin chat (nota al log + solicitud estructurada)
  'Nota interna':'Internal note','Nota':'Note','Guardar nota':'Save note',
  'Observación interna sobre el expediente. Queda en el':'Internal observation about the file. It is kept in the','log auditable':'audit log','(RR-12); no se envía como mensaje a nadie.':'(RR-12); it is not sent as a message to anyone.',
  'Ej. revisar inconsistencia en documentos antes de validar…':'E.g. review document inconsistency before validating…',
  'Nota registrada en el log del expediente':'Note recorded in the file log','Escribe la nota':'Write the note',
  'Solicitud estructurada: el sistema':'Structured request: the system','notifica':'notifies','a la reclutadora la acción requerida. No es un chat.':'the recruiter of the required action. It is not a chat.',
  'Acción solicitada':'Requested action','Detalle de la solicitud':'Request details','Qué se necesita (ej. lleva 8 días, reenviar el link)…':'What is needed (e.g. 8 days elapsed, resend the link)…','Indica el detalle de la solicitud':'Provide the request details',
  'Reenviar link de la app':'Resend the app link','Llamar al candidato':'Call the candidate','Acelerar validación':'Speed up validation','Otro':'Other','Enviar solicitud':'Send request',
  'Acción':'Action','Reenviar link de la app':'Resend app link','Llamar al candidato':'Call the candidate','Acelerar validación':'Speed up validation',
  'Ej. lleva 8 días, reenvía el link…':'E.g. it has been 8 days, resend the link…','Enviar solicitud':'Send request',
  'Intervención excepcional (Reclutadora o Líder no disponible, balanceo). Queda en log auditable (RR-12).':'Exceptional intervention (Recruiter or Leader unavailable, balancing). Recorded in the audit log (RR-12).',
  'Validación excepcional del Manager. Normalmente la hace la Reclutadora responsable. Queda en log auditable (RR-12) y el colaborador ingresa al Pool.':'Exceptional Manager validation. Normally done by the responsible Recruiter. Recorded in the audit log (RR-12) and the collaborator enters the Pool.',
  'Motivo del rechazo':'Reason for rejection','Rechazar alta':'Reject sign-up',
  'El candidato se mueve a Abandonados. Normalmente lo marca la Reclutadora; el Manager lo hace de forma excepcional.':'The candidate moves to Abandoned. Normally the Recruiter marks it; the Manager does it exceptionally.',
  'Motivo (opcional)…':'Reason (optional)…',
  // Toasts (Entrevistas)
  'Exportando lista filtrada (CSV)…':'Exporting filtered list (CSV)…','Sin métricas: entrevista del Manager':'No metrics: Manager interview',
  'Escribe un comentario':'Write a comment','Comentario agregado al expediente':'Comment added to the file','Selecciona una acción':'Select an action','Escribe el mensaje':'Write the message',
  'Selecciona la Reclutadora':'Select the Recruiter','La validación en intervención requiere justificación':'Validation in intervention requires justification','El rechazo requiere motivo':'Rejection requires a reason',
  // === Diseño alineado al Líder (Requisiciones / Reclutamiento / Blacklist) ===
  'Vista global del departamento · Self-pick activo':'Department-wide view · Self-pick active',
  'del departamento':'department-wide',
  'El flujo normal es Self-Pick (RR-15): Reclutadoras y Líderes las toman libremente. El Manager solo interviene en casos excepcionales.':'The normal flow is Self-Pick (RR-15): Recruiters and Leaders take them freely. The Manager only steps in for exceptional cases.',
  'Todas':'All','Todos':'All','Tabla':'Table','Tarjetas':'Cards',
  'Bandeja del departamento':'Department inbox','Mis requisiciones':'My requisitions',
  'Hotel · Zona · Líder':'Hotel · Zone · Leader','Período':'Period','Contrato · Modalidad':'Contract · Modality','Posiciones':'Positions','Edad':'Age',
  'En colaboración':'In collaboration','Autorizada':'Authorized','En proceso':'In process','Parcial':'Partial','Pronto':'Soon',
  'Cerrada hoy':'Closed today','Cobertura por posición':'Coverage by position',
  'Sin requisiciones que coincidan':'No matching requisitions','Ajusta los filtros o limpia la búsqueda.':'Adjust the filters or clear the search.',
  'Sin reclutadores activos aún':'No active recruiters yet',
  'Buscar por ID, hotel, posición o zona…':'Search by ID, hotel, position or zone…',
  // Reclutamiento (Pool + Entrevistas)
  'Vista global del departamento · Pool vivo':'Department-wide view · Live pool',
  'Pool de':'Pool of','colaboradores':'collaborators','Pool de colaboradores':'Collaborator pool',
  'El Manager supervisa el pool de todas las zonas. Las acciones operativas (crear / editar / asignar) son apoyo excepcional.':'The Manager supervises the pool across all zones. Operational actions (create / edit / assign) are exceptional support.',
  'Seguimiento de altas · Auditoría del depto':'Sign-up tracking · Dept audit',
  'Supervisa todas las altas de candidatos del depto. El expediente es de solo lectura; tus acciones son intervención excepcional (log auditable, RR-12).':'Supervises all candidate sign-ups in the dept. The file is read-only; your actions are exceptional intervention (audit log, RR-12).',
  'Histórico global':'Global history','Mis entrevistas':'My interviews',
  'Inglés':'English','Apto':'Eligible','Sin grupo':'No group','Sin candidatos':'No candidates','Ajusta los filtros o cambia de bandeja.':'Adjust the filters or switch tray.','Sin colaboradores':'No collaborators',
  'Básico':'Basic','Avanzado':'Advanced','Conversacional':'Conversational','Tiempo completo':'Full time','Medio tiempo':'Part time','Por horas':'Hourly',
  // Blacklist
  'Control de calidad · Vetados':'Quality control · Banned',
  'Colaboradores':'Collaborators','vetados':'banned',
  'Buscar por teléfono, nombre o documento…':'Search by phone, name or document…','Agregar a blacklist':'Add to blacklist',
  'Vetados de la plataforma':'Banned from the platform','Fecha de ingreso':'Date added','3 faltas':'3 absences','Automático':'Automatic','Total vetados':'Total banned',
  // Pool — tablero kanban (columnas + subs + vistas + drawer)
  'Asignación temp.':'Temp. assignment','Día 3+ uniforme':'Day 3+ uniform','No regresó':'No-show',
  'Listo para asignar':'Ready to assign','Por horas / fin de semana':'Hourly / weekend','En requisición permanente':'In permanent requisition','Cobertura corta':'Short coverage','Inducción inicial':'Initial induction','En entrega de uniforme':'Uniform handover','Captura sin asignar':'Captured, unassigned','Pausa temporal':'Temporary pause','Falta sin aviso':'No-show, no notice','Incidencia abierta':'Open incident',
  'Tablero':'Board','Por zona':'By zone','Ver detalle':'View detail','Pendiente':'Pending',
  'Datos':'Data','Laboral':'Work','Hoteles en historial':'Hotels in history','Identificación':'Identification','Alta en el pool':'Added to the pool','Asignaciones previas':'Previous assignments','Capturado por su reclutadora':'Captured by their recruiter','Semáforo del colaborador':'Collaborator status light',
  // Entrevistas — expediente (drawer) + filtros + modal
  'Días':'Days','Ver desempeño':'View performance','Reasignar candidato':'Reassign candidate',
  'Fases del proceso':'Process phases','Datos del candidato':'Candidate data','Estado actual':'Current status','ID interno':'Internal ID','Modalidad prevista':'Expected modality',
  'Fase 1 · Entrevista presencial':'Phase 1 · In-person interview','Fase 2 · Datos personales en app':'Phase 2 · Personal data in app','Fase 3 · Carga de documentos':'Phase 3 · Document upload','Validación · RF-08':'Validation · RF-08',
  'Completada':'Completed','Incompleta':'Incomplete','En seguimiento':'In tracking',
  'Pendiente · esperando validación':'Pending · awaiting validation','Pendiente · esperando datos':'Pending · awaiting data','Pendiente · bloqueada por F2':'Pending · blocked by P2',
  'Validar y enviar al Pool':'Validate and send to Pool','Validado · pasó al Pool':'Validated · moved to Pool',
  'El Manager ve el expediente como supervisor / auditor (solo lectura). Sus acciones son intervención excepcional y quedan en log auditable (RR-12).':'The Manager sees the file as a supervisor / auditor (read-only). Their actions are exceptional intervention and are recorded in the audit log (RR-12).',
  'Alta de apoyo excepcional. Normalmente la captura la Reclutadora; el alta del Manager queda en log auditable (RR-12).':'Exceptional support sign-up. Normally captured by the Recruiter; the Manager sign-up is recorded in the audit log (RR-12).',
  'Crear y enviar registro':'Create and send record','Colaborador creado · registro enviado para Fase 2':'Collaborator created · record sent for Phase 2',
  // Entrevistas — tablero kanban
  'Entrevistas en seguimiento':'Interviews in tracking','Validados (30 días)':'Validated (30 days)',
  'Fase 1 hecha · esperando descarga + Fase 2':'Phase 1 done · awaiting download + Phase 2','Fase 2+3 completas · esperando RF-08':'Phase 2+3 complete · awaiting RF-08','>X días sin completar la app':'>X days without completing the app','Histórico reciente · ya pasaron al Pool':'Recent history · already moved to Pool',
  'Enviar recordatorio':'Send reminder','Validar':'Validate','Reactivar':'Reactivate','Ver historial':'View history','En Pool':'In Pool',
  // Toasts estáticos
  'Cerrando sesión…':'Logging out…','Abriendo ayuda…':'Opening help…','Abriendo configuración…':'Opening settings…',
  'Todas marcadas como leídas':'All marked as read','Modal: Nuevo colaborador (apoyo)':'Modal: New collaborator (support)',
  'Editar colaborador (apoyo)':'Edit collaborator (support)','Asignar a hotel (excepcional)':'Assign to hotel (exceptional)',
  'La intervención manual requiere justificación':'Manual intervention requires justification','Selecciona una reclutadora':'Select a recruiter',
  'La asignación manual requiere justificación':'Manual assignment requires justification','Selecciona la nueva reclutadora':'Select the new recruiter',
  'Debe indicar motivo':'You must provide a reason','Selecciona el valor destino':'Select the target value','El override requiere justificación':'The override requires justification',
  'Selecciona una decisión':'Select a decision','El comentario debe tener al menos 30 caracteres':'The comment must be at least 30 characters',
  'Indica el colaborador':'Specify the collaborator','Selecciona el motivo':'Select the reason',
  'Debe describir el motivo (mín. 30 caracteres)':'You must describe the reason (min. 30 characters)','Configura el reporte global a la derecha':'Configure the global report on the right',
  'Exportando métricas…':'Exporting metrics…','Completa los campos obligatorios':'Complete the required fields','Debe asignar un Líder':'You must assign a Leader',
  'Selecciona el Líder destino':'Select the target Leader','Indica el motivo':'Provide the reason','El comentario es obligatorio':'The comment is required',
  'Selecciona el destinatario':'Select the recipient','Indica el contexto':'Provide the context','Dirección requiere un resumen':'Management requires a summary',
  'Reporte exportado (PDF)':'Report exported (PDF)','Reporte enviado a Dirección':'Report sent to Management',
  'Programación de envío recurrente (demo)':'Recurring delivery schedule (demo)','Selector de archivos (demo)':'File picker (demo)'
};
const I18N_PAT=[
  // Títulos de modal dinámicos (PRIMERO: prefijos completos antes que patrones genéricos de "Líder ·")
  [/Tomar como Manager · /g,'Take as Manager · '],[/Asignar a Reclutadora · /g,'Assign to Recruiter · '],[/Reasignar · /g,'Reassign · '],
  [/Forzar semáforo · /g,'Force status flag · '],
  [/Editar · /g,'Edit · '],[/Mover a otro Líder · /g,'Move to another Leader · '],[/Cambiar estado · /g,'Change status · '],
  [/^Este Líder tiene (\d+) reclutadora\(s\) activa\(s\)\. Para darlo de baja, reasigna primero su grupo\.$/,'This Leader has $1 active recruiter(s). To terminate them, reassign their group first.'],
  [/Resolver · /g,'Resolve · '],[/Escalar a comercial · /g,'Escalate to sales · '],[/Escalar a Dirección · /g,'Escalate to Management · '],
  [/Nota interna · /g,'Internal note · '],[/Solicitar acción · /g,'Request action · '],[/Reasignar candidato · /g,'Reassign candidate · '],
  [/Validar alta \(intervención\) · /g,'Validate sign-up (intervention) · '],[/Rechazar alta · /g,'Reject sign-up · '],[/Marcar como abandonado · /g,'Mark as abandoned · '],
  // Grupos (antes que zonas)
  [/Grupo Centro-Sur/g,'Central-South Group'],[/Grupo Litoral Sur/g,'South Coast Group'],[/Grupo Pacífico/g,'Pacific Group'],[/Grupo Frontera/g,'Border Group'],
  // Tipos de incidencia
  [/Sobrecarga de Reclutadora/g,'Recruiter overload'],[/Conflicto candidato ?\/ ?hotel/g,'Candidate / hotel conflict'],
  [/Disputa de cobertura comercial/g,'Commercial coverage dispute'],[/Incumplimiento de SLA en zona/g,'SLA breach in zone'],
  // Frases compuestas (subtítulos / banners dinámicos)
  [/Requiere intervención del Manager\./g,'Requires Manager intervention.'],
  [/Reporte semanal/g,'Weekly report'],[/Supervisor del hotel/g,'Hotel supervisor'],
  [/(\d+) posiciones cubiertas/g,'$1 positions covered'],[/grupo de /g,'group of '],[/\bpendiente\b/g,'pending'],
  // Posiciones (en cadenas compuestas)
  [/Recepción/g,'Reception'],[/Mantenimiento/g,'Maintenance'],[/Mesero/g,'Waiter'],
  // Orígenes de candidato + varios (en cadenas compuestas)
  [/Mensaje a /g,'Message to '],[/Aplicación directa/g,'Direct application'],[/Reclutamiento activo/g,'Active recruiting'],[/Intervención Manager/g,'Manager intervention'],[/Referido/g,'Referral'],[/automático/g,'automatic'],[/completó Fase 1/g,'completed Phase 1'],
  // Roles / personas
  [/Líder · /g,'Leader · '],[/Líder ([A-ZÁÉÍÓÚÑ])/g,'Leader $1'],[/Reclutadora/g,'Recruiter'],
  // Zonas dentro de cadenas compuestas
  [/\bNoroeste\b/g,'Northwest'],[/\bSureste\b/g,'Southeast'],[/\bCentro\b/g,'Central'],[/\bSur\b/g,'South'],[/\bEste\b/g,'East'],[/\bOeste\b/g,'West'],
  // Tokens varios
  [/Varada (\d+) h/g,'Stranded $1 h'],[/varada/g,'stranded'],[/VIP sin tomar/g,'VIP untaken'],
  [/veto: /g,'ban: '],[/Zona /g,'Zone '],[/en investigación/g,'under investigation'],
  // Blacklist — roles / timeline interpolado (antes de patrones genéricos de fecha/zona)
  [/Manager de Reclutamiento/g,'Recruitment Manager'],[/\(Inspector de zona\)/g,'(Zone Inspector)'],[/Inspector de zona/g,'Zone Inspector'],
  [/Transición automática\./g,'Automatic transition.'],[/ se convierte en colaborador fijo del /g,' becomes a permanent collaborator at '],
  [/(\d+) días completados \(Fijo\)/g,'$1 days completed (Permanent)'],[/Inasistencia (\d+) de 3/g,'Absence $1 of 3'],
  [/No se presentó al turno matutino/g,'Did not show up for the morning shift'],[/No se presentó/g,'Did not show up'],[/Inasistencia sin aviso/g,'Absence without notice'],
  [/3ª inasistencia sin justificar — escalamiento automático a Blacklist \(estado Negro\)\./g,'3rd unjustified absence — automatic escalation to Blacklist (Black status).'],
  [/3ª inasistencia — escalado automático/g,'3rd absence — automatic escalation'],
  [/estado Negro/g,'Black status'],[/Veto permanente/g,'Permanent ban'],
  // Modal de alta — pool meta / niveles de idioma interpolados
  [/Inglés Básico/g,'English Basic'],[/Inglés Intermedio/g,'English Intermediate'],[/Inglés Avanzado/g,'English Advanced'],
  [/colaboradores en el pool/g,'collaborators in the pool'],[/colaborador en el pool/g,'collaborator in the pool'],[/· seleccionado:/g,'· selected:'],
  [/(\d+) años exp\./g,'$1 years exp.'],[/(\d+) año exp\./g,'$1 year exp.'],
  // Requisiciones — tarjeta rica (filas de posición)
  [/faltan (\d+) \((\d+)%\)/g,'$1 missing ($2%)'],[/(\d+) puestos · esperando/g,'$1 positions · waiting'],[/(\d+) puesto · esperando/g,'$1 position · waiting'],[/(\d+) en proceso/g,'$1 in progress'],
  [/Cobertura (\d+)% · en riesgo/g,'Coverage $1% · at risk'],[/[Cc]obertura (\d+)%/g,(m,n)=>m[0]==='C'?'Coverage '+n+'%':'coverage '+n+'%'],[/en riesgo/g,'at risk'],
  [/Escalado por /g,'Escalated by '],
  // Numéricos / conteos
  [/(\d+) reclutadoras/g,'$1 recruiters'],[/(\d+) reclutadora\b/g,'$1 recruiter'],[/(\d+) escalados/g,'$1 escalated'],[/(\d+) escalado\b/g,'$1 escalated'],[/(\d+) líderes/g,'$1 leaders'],[/(\d+) casos/g,'$1 cases'],[/(\d+) caso\b/g,'$1 case'],
  [/Escalado por /g,'Escalated by '],[/Sistema \(automático\)/g,'System (automatic)'],
  // Perfil — contadores compuestos
  [/(\d+) Líderes/g,'$1 Leaders'],[/[Tt]odas las zonas/g,m=>m[0]==='T'?'All zones':'all zones'],[/(\d+) activas/g,'$1 active'],[/· Depto\. completo/g,'· Whole dept.'],
  // Reportes — contadores, recurrencia, destinatarios y toasts
  [/(\d+) sin revisar/g,'$1 unreviewed'],[/\bSemanal\b/g,'Weekly'],[/\bQuincenal\b/g,'Biweekly'],[/\bMensual\b/g,'Monthly'],[/\bLunes\b/g,'Monday'],[/Día (\d+)/g,'Day $1'],
  [/→ Dirección/g,'→ Management'],[/→ Solo yo/g,'→ Only me'],[/Comercial \(BD\/BDC\)/g,'Sales (BD/BDC)'],
  [/Reporte exportado \((PDF|Excel|CSV)\)/g,'Report exported ($1)'],[/Reporte enviado a Dirección/g,'Report sent to Management'],[/Reporte enviado a Comercial \(BD\/BDC\)/g,'Report sent to Sales (BD/BDC)'],[/Reporte enviado a Solo yo/g,'Report sent to Only me'],
  [/Reporte descargado \(PDF\)/g,'Report downloaded (PDF)'],[/Envío recurrente programado/g,'Recurring send scheduled'],[/Envío programado eliminado/g,'Scheduled send removed'],
  // Tiempos
  [/Hace (\d+) min/g,'$1 min ago'],[/Hace (\d+) h\b/g,'$1 h ago'],[/Hace (\d+) días/g,'$1 days ago'],[/Hace (\d+) día\b/g,'$1 day ago'],
  [/^S-(\d)$/,'W-$1'],
  // Toasts dinámicos (mensaje completo)
  [/^(.+) tomada como Manager · registrada en Mis tomadas$/,"$1 taken as Manager · registered in My taken"],
  [/^(.+) asignada a (.+) \(marcada 'Asignada por Manager'\)$/,"$1 assigned to $2 (marked 'Assigned by Manager')"],
  [/^(.+) reasignada a (.+) · partes notificadas$/,'$1 reassigned to $2 · parties notified'],
  [/^Semáforo forzado en (.+) · registrado en log$/,'Status flag forced on $1 · logged'],
  [/^Disputa resuelta: (.+) · partes notificadas$/,'Dispute resolved: $1 · parties notified'],
  [/^(.+) removido de Blacklist · reactivado en Pool$/,'$1 removed from Blacklist · reactivated in Pool'],
  [/^(.+) agregado a Blacklist$/,'$1 added to Blacklist'],
  [/^Enviado al Líder (.+)$/,'Sent to Leader $1'],
  [/^Líder creada · credenciales enviadas por correo$/,'Leader created · credentials emailed'],
  [/^Reclutadora creada · credenciales enviadas por correo$/,'Recruiter created · credentials emailed'],
  [/^Estado de (.+) actualizado$/,'Status of $1 updated'],[/^(.+) actualizado$/,'$1 updated'],
  [/^(.+) movida de grupo · ambos Líderes notificados$/,'$1 moved between groups · both Leaders notified'],
  [/^(INC-\d+): Resolver caso$/,'$1: Resolve case'],[/^(INC-\d+): Escalar a comercial$/,'$1: Escalate to sales'],[/^(INC-\d+): Solicitar más información$/,'$1: Request more information'],
  [/^(INC-\d+) escalado a comercial · BD\/BDC notificado$/,'$1 escalated to sales · BD/BDC notified'],
  [/^(INC-\d+) escalado a Dirección$/,'$1 escalated to Management'],
  [/^Drill-down de zona (.+) \(demo\)$/,'Zone $1 drill-down (demo)'],
  [/^Abriendo reporte de (.+)$/,'Opening report from $1'],
  [/^Solicitud enviada a (.+)$/,'Request sent to $1'],
  [/^(.+) reasignado a (.+) · partes notificadas$/,'$1 reassigned to $2 · parties notified'],
  [/^(.+) validado e ingresado al Pool$/,'$1 validated and added to the Pool'],
  [/^Alta de (.+) rechazada · responsable notificado$/,"$1's sign-up rejected · owner notified"],
  [/^(.+) marcado como abandonado$/,'$1 marked as abandoned'],
  [/Hace (\d+) d\b/g,'$1 d ago'],
  [/(\d+) requisiciones/g,'$1 requisitions'],[/(\d+) requisici[oó]n\b/g,'$1 requisition'],
  [/(\d+) colaboradores/g,'$1 collaborators'],[/(\d+) colaborador\b/g,'$1 collaborator'],
  [/Reclutador (\d+)/g,'Recruiter $1'],
  [/ en pool · (\d+) estados/g,' in pool · $1 statuses'],[/(\d+) hoteles/g,'$1 hotels'],[/(\d+) hotel\b/g,'$1 hotel'],[/(\d+) disponibles/g,'$1 available'],[/ en historial/g,' in history'],[/Estado actual: /g,'Current status: '],
  [/Disp\. voluntario/g,'Voluntary available'],[/Asignación temp\./g,'Temp. assignment'],[/Día 3\+ uniforme/g,'Day 3+ uniform'],[/No regresó/g,'No-show'],[/Pre-asignación/g,'Pre-assignment'],[/\bDisponible\b/g,'Available'],[/\bFijo\b/g,'Fixed'],[/\bReportado\b/g,'Reported'],
  [/EN Básico/g,'EN Basic'],[/EN Intermedio/g,'EN Intermediate'],[/EN Avanzado/g,'EN Advanced'],[/EN Conversacional/g,'EN Conversational'],
  [/Completada · /g,'Completed · '],[/Validado por /g,'Validated by '],[/· urgente/g,'· urgent'],[/ en estado/g,' in status'],[/(\d+) candidatos/g,'$1 candidates'],[/(\d+) candidato\b/g,'$1 candidate'],[/ · (\d+) estados/g,' · $1 statuses'],[/\bdías\b/g,'days'],[/\bdía\b/g,'day'],
  [/^Requisiciones de la zona (.+)$/,'Requisitions for zone $1'],
];
const _i18nSkip=node=>{const p=node.parentElement;return !p||p.closest('.mi,.mio,script,style,svg,.lang-seg');};
function _i18nTxtEN(node){
  if(_i18nSkip(node))return;
  const raw=node.nodeValue,key=raw.trim();
  if(!key)return;
  let en=(I18N[key]!==undefined)?I18N[key]:I18N[key.replace(/\s+/g,' ')];
  if(en===undefined){let out=key;for(let i=0;i<I18N_PAT.length;i++){out=out.replace(I18N_PAT[i][0],I18N_PAT[i][1]);}if(out!==key)en=out;}
  if(en!==undefined&&en!==key){if(!_i18nOrig.has(node))_i18nOrig.set(node,raw);const v=en;node.nodeValue=raw.replace(key,function(){return v;});}
}
function _i18nTxtES(node){if(_i18nOrig.has(node)){node.nodeValue=_i18nOrig.get(node);_i18nOrig.delete(node);}}
function _i18nWalk(root,toEN){
  if(root.nodeType===3){toEN?_i18nTxtEN(root):_i18nTxtES(root);return;}
  if(root.nodeType!==1)return;
  const tw=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const list=[];let n;while(n=tw.nextNode())list.push(n);
  list.forEach(toEN?_i18nTxtEN:_i18nTxtES);
  (root.querySelectorAll?root.querySelectorAll('input[placeholder],textarea[placeholder]'):[]).forEach(inp=>{
    if(toEN){const en=I18N[(inp.placeholder||'').trim()];if(en!==undefined){if(!_i18nPh.has(inp))_i18nPh.set(inp,inp.placeholder);inp.placeholder=en;}}
    else if(_i18nPh.has(inp)){inp.placeholder=_i18nPh.get(inp);_i18nPh.delete(inp);}
  });
}
window.setLang=function(lang){
  LANG=(lang==='en')?'en':'es';
  _i18nWalk(document.body,LANG==='en');
  document.querySelectorAll('.lang-opt').forEach(b=>b.classList.toggle('active',b.dataset.lang===LANG));
  document.documentElement.setAttribute('lang',LANG);
};

// ===== TEMA claro/oscuro (clase .dark-mode en <html>; override de tokens) =====
const THEME_KEY='oranje-theme';
const _prefersDark=window.matchMedia('(prefers-color-scheme: dark)');
function _applyTheme(theme,notify){
  const dark=theme==='dark';
  document.documentElement.classList.toggle('dark-mode',dark);
  document.querySelectorAll('[data-theme-seg] .theme-opt, [data-theme-seg-pref] .theme-opt').forEach(b=>b.classList.toggle('active',b.dataset.themeOpt===theme));
  const lbl=document.getElementById('themeLabel');
  if(lbl) lbl.textContent=dark?(LANG==='en'?'Dark':'Oscuro'):(LANG==='en'?'Light':'Claro');
  if(notify&&typeof toast==='function'){ toast(dark?(LANG==='en'?'Dark theme on':'Tema oscuro activado'):(LANG==='en'?'Light theme on':'Tema claro activado'),'brightness_4'); }
}
window.setTheme=function(theme){ if(theme!=='light'&&theme!=='dark')return; try{localStorage.setItem(THEME_KEY,theme);}catch(e){} _applyTheme(theme,true); };
(function _initTheme(){
  let saved=null; try{saved=localStorage.getItem(THEME_KEY);}catch(e){}
  const theme=saved||(_prefersDark.matches?'dark':'light');
  document.documentElement.classList.toggle('dark-mode',theme==='dark');
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>_applyTheme(theme,false)); else _applyTheme(theme,false);
  if(_prefersDark.addEventListener)_prefersDark.addEventListener('change',e=>{ let s=null;try{s=localStorage.getItem(THEME_KEY);}catch(err){} if(!s)_applyTheme(e.matches?'dark':'light',false); });
})();
try{const _o=new MutationObserver(muts=>{if(LANG!=='en')return;muts.forEach(m=>m.addedNodes&&m.addedNodes.forEach(node=>_i18nWalk(node,true)));});if(document.body)_o.observe(document.body,{childList:true,subtree:true});}catch(e){}

/* ============================ NAVIGATION ============================ */
function navigate(el,name){
  if(typeof closeMyInfoIfOpen==='function')closeMyInfoIfOpen();
  document.querySelectorAll('.sb-item').forEach(i=>i.classList.toggle('active',i.dataset.page===name));
  const _cr=({Dashboard:'Dashboard',Requisiciones:'Requisiciones',Reclutamiento:'Reclutamiento',Blacklist:'Blacklist',Equipo:'Mi Equipo',Incidencias:'Incidencias',Reportes:'Reportes'})[name]||name;
  const _ce=document.getElementById('crumb');_ce.textContent=_cr;if(LANG==='en')_i18nWalk(_ce,true);
  (RENDER[name]||function(){})();
  document.getElementById('content').scrollTop=0;
  closeDd();
}
const RENDER={};

/* ============================ DASHBOARD ============================ */
let _trayTab='req';
const TREND=[{w:'S-5',v:78},{w:'S-4',v:80},{w:'S-3',v:79},{w:'S-2',v:82},{w:'S-1',v:81},{w:'Actual',v:84}];
const URGDIST=[{k:'high',l:'Urgente',c:'#E11919',n:5},{k:'med',l:'Pronto',c:'#FFCC33',n:39},{k:'low',l:'Normal',c:'#1FA84A',n:96}];
function urgDrill(k){_reqF={urg:k,pos:'',zona:'',lider:'',q:''};_reqTab='todas';navigate(null,'Requisiciones');toast('Requisiciones filtradas por urgencia','filter_list');}
function entDrill(est){_reclView='entrevistas';_entToggle='global';_entView='board';_entF={lider:'',recl:'',pos:'',zona:'',mod:'',origen:'',estado:(est==='borrador'?'':est),dias:'',q:''};navigate(null,'Reclutamiento');}
function trendChart(){
  const d=TREND,n=d.length,vals=d.map(t=>t.v);
  const lo=Math.min(...vals)-4,hi=Math.max(...vals)+2;
  const X=i=>5+i*(90/(n-1));
  const Y=v=>16+(1-(v-lo)/(hi-lo))*64;
  const pts=d.map((t,i)=>[X(i),Y(t.v)]);
  const line=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(2)+' '+p[1].toFixed(2)).join(' ');
  const area=line+' L '+X(n-1).toFixed(2)+' 88 L '+X(0).toFixed(2)+' 88 Z';
  const grid=[26,48,70].map(g=>`<line x1="3" y1="${g}" x2="97" y2="${g}" stroke="var(--line)" stroke-width="1" vector-effect="non-scaling-stroke"/>`).join('');
  return `<div class="lchart-wrap">
    <svg class="lchart" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs><linearGradient id="trArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF8E00" stop-opacity=".24"/><stop offset="1" stop-color="#FF8E00" stop-opacity="0"/></linearGradient></defs>
      ${grid}
      <path d="${area}" fill="url(#trArea)"/>
      <path d="${line}" fill="none" stroke="var(--o-500)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
    </svg>
    ${d.map((t,i)=>`<div class="lval ${i===n-1?'cur':''}" style="left:${X(i).toFixed(2)}%;top:${(Y(t.v)-13).toFixed(2)}%">${t.v}%</div>`).join('')}
    ${d.map((t,i)=>`<div class="lpt ${i===n-1?'cur':''}" style="left:${X(i).toFixed(2)}%;top:${Y(t.v).toFixed(2)}%"></div>`).join('')}
    ${d.map((t,i)=>`<div class="lx-lab ${i===n-1?'cur':''}" style="left:${X(i).toFixed(2)}%">${t.w}</div>`).join('')}
  </div>`;
}
RENDER.Dashboard=function(){
  const umax=Math.max(...URGDIST.map(u=>u.n));
  const pipe=['pendApp','pendVal','abandonado','validado'];
  document.getElementById('content').innerHTML=`
  <div class="qa-hero" style="margin-bottom:20px">
    <div class="lbl">PANORAMA DEL DEPARTAMENTO</div>
    <div class="v">Cobertura global 84%</div>
    <div class="v2">3 zonas en riesgo · 6 casos escalados pendientes · 5 semáforos rojos activos</div>
    <span class="mi mi-big">insights</span>
  </div>

  <div class="grid g4" style="margin-bottom:20px">
    <div class="kpi click" onclick="navigate(null,'Requisiciones')" style="border-color:rgba(31,168,74,.18);background:linear-gradient(135deg,rgba(31,168,74,.07),rgba(31,168,74,.02))">
      <div class="kh"><div class="ki" style="background:rgba(31,168,74,.12);color:var(--green)"><span class="mi">donut_large</span></div><span class="trend up"><span class="mi">arrow_upward</span>+3%</span></div>
      <div class="val" style="color:var(--green)">84<span class="suf">%</span></div><div class="lbl">Cobertura global</div>
      <div class="foot"><strong>142</strong> requisiciones activas</div></div>
    <div class="kpi click" onclick="navigate(null,'Requisiciones')" style="border-color:rgba(255,142,0,.18);background:linear-gradient(135deg,rgba(255,142,0,.06),rgba(255,142,0,.01))">
      <div class="kh"><div class="ki" style="background:var(--o-50);color:var(--o-600)"><span class="mi">assignment</span></div></div>
      <div class="val" style="color:var(--o-700)">96<span class="suf">/142</span></div><div class="lbl">Cubiertas</div>
      <div class="foot"><strong>28</strong> parciales · <strong>18</strong> pendientes</div></div>
    <div class="kpi click" onclick="navigate(null,'Incidencias')" style="border-color:rgba(228,74,74,.18);background:linear-gradient(135deg,rgba(228,74,74,.07),rgba(228,74,74,.02))">
      <div class="kh"><div class="ki" style="background:rgba(228,74,74,.1);color:var(--red)"><span class="mi">report_problem</span></div></div>
      <div class="val" style="color:var(--red)">${INC.filter(c=>!/Resuelt/i.test(c.estado)).length}</div><div class="lbl">Casos escalados abiertos</div>
      <div class="foot"><strong>5</strong> semáforos rojos activos</div></div>
    <div class="kpi click" onclick="navigate(null,'Reportes')" style="border-color:rgba(59,125,221,.18);background:linear-gradient(135deg,rgba(59,125,221,.06),rgba(59,125,221,.01))">
      <div class="kh"><div class="ki" style="background:rgba(59,125,221,.12);color:var(--blue)"><span class="mi">verified</span></div></div>
      <div class="val" style="color:var(--blue)">92<span class="suf">%</span></div><div class="lbl">Indicador de calidad</div>
      <div class="foot"><strong>4</strong> Líderes activos</div></div>
  </div>

  <div class="grid g2" style="margin-bottom:16px">
    <div class="card"><div class="card-h"><h3>Cobertura global · últimas 6 semanas</h3><span class="trend up"><span class="mi">arrow_upward</span>+6 pts</span></div>
      <div class="card-b">
        ${trendChart()}
      </div>
    </div>
    <div class="card"><div class="card-h"><h3>Requisiciones por urgencia</h3><span class="link-more" onclick="navigate(null,'Requisiciones')">Ver todas</span></div>
      <div class="card-b" style="padding-top:4px">
        ${URGDIST.map(u=>`<div class="urow" onclick="urgDrill('${u.k}')">
          <span class="dotc" style="background:${u.c}"></span>
          <span class="ul">${u.l}</span>
          <span class="ubar">${bar(Math.round(u.n/umax*100),u.c)}</span>
          <span class="uc" style="color:${u.c}">${u.n}</span>
          <span class="mi" style="color:var(--ink-4)">chevron_right</span></div>`).join('')}
      </div>
    </div>
  </div>

  <div class="card" style="margin-bottom:16px"><div class="card-h"><h3>Pipeline de Entrevistas</h3><span class="link-more" onclick="entDrill('pendApp')">Ver Entrevistas</span></div>
    <div class="card-b">
      <div class="pipe">
        ${pipe.map((k,i)=>{const e=ESTCAND[k];const n=CANDIDATOS.filter(c=>c.estado===k).length;return `<div class="stage" onclick="entDrill('${k}')" style="border-color:${e.c}33;background:linear-gradient(150deg,${e.bg},#fff 78%)"><div class="pi" style="color:${e.c}"><span class="mi">${e.ic}</span></div><div class="pv" style="color:${e.c}">${n}</div><div class="pl">${e.l}</div></div>${i<4?'<div class="arrow"><span class="mi">chevron_right</span></div>':''}`;}).join('')}
      </div>
    </div>
  </div>

  <div class="grid g2">
    <div class="card"><div class="card-h"><h3>Bandeja de acción</h3><span class="mi">inbox</span></div>
      <div class="card-b">
        <div class="tray-tabs">
          <div class="tray-tab ${_trayTab==='req'?'active':''}" onclick="trayTab('req')">Requisiciones<span class="n">2</span></div>
          <div class="tray-tab ${_trayTab==='esc'?'active':''}" onclick="trayTab('esc')">Escalamientos<span class="n">2</span></div>
          <div class="tray-tab ${_trayTab==='equipo'?'active':''}" onclick="trayTab('equipo')">Equipo<span class="n">1</span></div>
        </div>
        <div id="trayBody">${trayBody()}</div>
      </div>
    </div>
    <div class="card"><div class="card-h"><h3>Ranking de Líderes</h3><span class="link-more" onclick="navigate(null,'Equipo')">Ver Mi Equipo</span></div>
      <div class="card-b" style="padding-top:0">
        ${LIDERES.slice().sort((a,b)=>b.cob-a.cob).map(l=>`<div class="tray-item" onclick="navigate(null,'Equipo')" style="cursor:pointer">
          <div class="avatar" style="width:40px;height:40px">${l.ini}</div>
          <div style="flex:1"><div class="t">${l.nombre}</div><div class="s">${l.grupo} · ${l.recl.length} reclutadoras · ${l.esc} escalados</div></div>
          <div style="text-align:right;min-width:96px"><div style="font-weight:800;color:${cobColor(l.cob)}">${l.cob}%</div>${bar(l.cob,cobColor(l.cob))}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>

  <div class="card" style="margin-top:16px"><div class="card-h"><h3>Cobertura por zona</h3><span class="mi">map</span></div>
    <div class="card-b" style="padding-top:0">
      <table class="tbl"><thead><tr><th>Zona</th><th>Requisiciones</th><th>Cubiertas</th><th>Parciales</th><th>Pendientes</th><th>Cobertura</th></tr></thead><tbody>
        ${ZONAS.map(z=>`<tr class="click" onclick="zoneDrill('${z.z}')">
          <td><b>${z.z}</b> ${z.riesgo?'<span class="pill alta">En riesgo</span>':''}</td>
          <td class="num">${z.total}</td><td class="num">${z.cub}</td><td class="num">${z.parc}</td><td class="num">${z.pend}</td>
          <td><div style="display:flex;align-items:center;gap:8px"><span class="num" style="color:${cobColor(z.cob)};min-width:34px">${z.cob}%</span>${bar(z.cob,cobColor(z.cob))}</div></td></tr>`).join('')}
      </tbody></table>
    </div>
  </div>`;
};
function trayTab(t){_trayTab=t;document.querySelectorAll('.tray-tab').forEach(x=>x.classList.remove('active'));event.target.closest('.tray-tab').classList.add('active');document.getElementById('trayBody').innerHTML=trayBody();}
function trayBody(){
  if(_trayTab==='req') return `
    <div class="tray-item"><div class="ic" style="background:#FDECEC;color:var(--red)"><span class="mi">priority_high</span></div><div style="flex:1"><div class="t">REQ #001 · Housekeeper · varada 6 h</div><div class="s">Hotel Costa del Sol · Centro · 8/10</div></div><button class="btn primary sm act" onclick="navigate(null,'Requisiciones')">Intervenir</button></div>
    <div class="tray-item"><div class="ic" style="background:#F3EAFB;color:var(--purple)"><span class="mi">star</span></div><div style="flex:1"><div class="t">REQ #014 · Recepción · VIP sin tomar</div><div class="s">Hotel Bahía · Noroeste · 2/6</div></div><button class="btn primary sm act" onclick="navigate(null,'Requisiciones')">Intervenir</button></div>`;
  if(_trayTab==='esc') return `
    <div class="tray-item"><div class="ic" style="background:var(--o-50);color:var(--o-600)"><span class="mi">report_problem</span></div><div style="flex:1"><div class="t">Sobrecarga de Reclutadora (INC-31)</div><div class="s">Escalado por Marco Díaz · Sur</div></div><button class="btn ghost sm act" onclick="navigate(null,'Incidencias')">Abrir caso</button></div>
    <div class="tray-item"><div class="ic" style="background:#EEF5FF;color:var(--blue)"><span class="mi">fact_check</span></div><div style="flex:1"><div class="t">Conflicto candidato/hotel (INC-29)</div><div class="s">Inspector · Noroeste · en investigación</div></div><button class="btn ghost sm act" onclick="navigate(null,'Incidencias')">Abrir caso</button></div>`;
  return `<div class="tray-item"><div class="ic" style="background:var(--o-50);color:var(--o-600)"><span class="mi">trending_up</span></div><div style="flex:1"><div class="t">Daniela Soto supera el umbral de carga</div><div class="s">Grupo Frontera · cobertura 68%</div></div><button class="btn ghost sm act" onclick="navigate(null,'Equipo')">Ver equipo</button></div>`;
}

/* ============================ REQUISICIONES ============================ */
let _reqTab='todas',_reqF={urg:'',pos:'',zona:'',lider:'',q:''},_reqDD=null,_reqView='board';
function reqList(){
  let l=REQS.filter(r=> _reqTab==='todas'?true : _reqTab==='mias'? !!r.mine : (r.urg==='high'||!!r.nota));
  if(_reqF.urg) l=l.filter(r=>r.urg===_reqF.urg);
  if(_reqF.pos) l=l.filter(r=>r.positions.some(p=>p.pos===_reqF.pos));
  if(_reqF.zona) l=l.filter(r=>r.zona===_reqF.zona);
  if(_reqF.lider) l=l.filter(r=>r.lider===_reqF.lider);
  if(_reqF.vip) l=l.filter(r=>r.vip);
  if(_reqF.q){const q=_reqF.q.toLowerCase();l=l.filter(r=>(r.id+' '+r.hotel+' '+r.zona+' '+r.positions.map(p=>p.pos).join(' ')).toLowerCase().includes(q));}
  return l;
}
function reqStat(which){ if(which==='crit'){_reqTab='criticas';_reqF={urg:'',pos:'',zona:'',lider:'',q:'',vip:false};} else if(which==='vip'){_reqTab='todas';_reqF={urg:'',pos:'',zona:'',lider:'',q:'',vip:true};} else {_reqTab='todas';_reqF={urg:'',pos:'',zona:'',lider:'',q:'',vip:false};} _reqDD=null; RENDER.Requisiciones(); }
const _REQ_FILTERS=()=>[
  {key:'urg',lbl:'Urgencia',opts:[['','Todas'],['high','Urgente'],['med','Pronto'],['low','Normal']],dot:URG_COLOR},
  {key:'pos',lbl:'Posición',opts:[['','Todas'],...[...new Set(REQS.flatMap(r=>r.positions.map(p=>p.pos)))].map(p=>[p,p])]},
  {key:'zona',lbl:'Zona',opts:[['','Todas'],...ZONAS.map(z=>[z.z,z.z])]},
  {key:'lider',lbl:'Líder',opts:[['','Todos'],...LIDERES.map(l=>[l.nombre,l.nombre])]},
];
function reqFiltersHTML(){
  const cfg=_REQ_FILTERS();
  const hasAny=cfg.some(c=>_reqF[c.key])||_reqF.q;
  const n=cfg.filter(c=>_reqF[c.key]).length+(_reqF.q?1:0);
  const search=`<div class="recl-search" style="width:${hasAny?'300':'420'}px"><span class="mi">search</span><input id="reqSearchInput" placeholder="Buscar por ID, hotel, posición o zona…" oninput="reqSearch(this.value)" value="${escR(_reqF.q)}"><span class="kbd">⌘F</span></div>`;
  const chips=cfg.map(c=>{
    const cur=_reqF[c.key];
    const curLbl=cur?(c.opts.find(o=>o[0]===cur)?.[1]||cur):c.opts[0][1];
    const open=_reqDD===c.key;
    const dot=(c.dot&&cur)?`<span class="recl-fdd-dot" style="background:${c.dot[cur]}"></span>`:'';
    return `<div class="recl-filter-grp ${cur?'active':''} ${open?'open':''}" onclick="event.stopPropagation();reqToggleDD('${c.key}')">
      <span class="lbl-grp">${c.lbl}</span><span class="val">${dot}${escR(curLbl)}</span><span class="mi">${open?'expand_less':'expand_more'}</span>
      ${open?`<div class="recl-fdd" onclick="event.stopPropagation()">${c.opts.map(o=>`<div class="recl-fdd-item ${o[0]===''?'all':''} ${cur===o[0]?'selected':''}" onclick="reqPickFilter('${c.key}','${escR(o[0])}')">${(c.dot&&o[0])?`<span class="recl-fdd-dot" style="background:${c.dot[o[0]]}"></span>`:''}<span>${escR(o[1])}</span><span class="mi">check</span></div>`).join('')}</div>`:''}
    </div>`;
  }).join('');
  const clear=hasAny?`<button class="recl-filter-clear" onclick="reqClearFilters()"><span class="mi">filter_alt_off</span>Limpiar todo<span class="badge-n">${n}</span></button>`:'';
  return `<div class="recl-toolbar">${search}</div>
    <div class="recl-filters"><div class="recl-filters-left">${chips}${clear}</div>
      <div class="recl-filters-right"><div class="recl-segmented recl-segmented-inline">
        <button class="${_reqView==='board'?'active':''}" onclick="reqSetView('board')"><span class="mi">view_kanban</span>Tablero</button>
        <button class="${_reqView==='cards'?'active':''}" onclick="reqSetView('cards')"><span class="mi">grid_view</span>Tarjetas</button>
        <button class="${_reqView==='table'?'active':''}" onclick="reqSetView('table')"><span class="mi">table_rows</span>Tabla</button>
      </div></div></div>`;
}
function reqUrgPill(r){return `<span class="req-urg-pill ${r.urg}"><span class="dot"></span>${URG_LABELS[r.urg]}</span>`;}
function reqMetaPills(r){const _d=reqDerive(r);const c=_d.reqContratos[0];const ck=c==='Fijo'?'fijo':'temp';const m=_d.reqMods[0];const mk=m==='Tiempo completo'?'tc':(m==='Medio tiempo'?'mt':'ph');const ms=mk==='tc'?'TC':(mk==='mt'?'MT':'PH');return `<span class="meta-pill ctr" data-c="${ck}"><span class="mi">assignment_ind</span>${escR(c)}</span><span class="meta-pill modw" data-m="${mk}" title="${escR(m)}"><span class="mi">schedule</span>${ms}</span>`;}
function reqPosCells(r){return r.positions.map(p=>{const psem=posSemaforo(p);const cls=p.cubierto>=p.total?'ok':(psem==='rojo'?'bad':(psem==='naranja'?'warn':'neutral'));return `<span class="req-tbl-pos ${cls}"><span class="nm">${escR(p.pos)}</span><span class="ct">${p.cubierto}/${p.total}</span></span>`;}).join('');}
function reqCovBar(r){return r.positions.map(p=>{const psem=posSemaforo(p);let s='';for(let i=0;i<p.cubierto;i++)s+='<span class="req-cov-seg" data-sem="verde"></span>';for(let i=0;i<(p.total-p.cubierto);i++)s+=`<span class="req-cov-seg" data-sem="${psem}"></span>`;return s;}).join('');}
function reqTableRich(arr){
  return `<div class="req-table-wrap"><table class="req-table req-table-rich"><thead><tr>
    <th class="col-id">ID</th><th>Hotel · Zona · Líder</th><th>Tipo</th><th>Urgencia</th><th>Período</th><th>Contrato · Modalidad</th><th>Posiciones</th><th>Cobertura</th><th>Edad</th><th></th>
  </tr></thead><tbody>
    ${arr.map(r=>{const t=totals(r);const sem=domSemaforo(r);const ctx=reqContext(r);
      const ctxCell=ctx?`<span class="req-tbl-ctx" data-ctx="${ctx.key}"><span class="mi">${ctx.ic}</span>${ctx.lbl}</span>`:(r.vip?`<span class="req-tbl-ctx" data-ctx="colab"><span class="mi">star</span>VIP</span>`:`<span class="req-tbl-ctx-empty">—</span>`);
      return `<tr data-req-id="${escR(r.id)}" onclick="reqDrawer('${escR(r.id)}')">
        <td class="col-id">${escR(r.id)}</td>
        <td class="col-hotel"><div class="req-tbl-hotel"><div class="hm-name">${escR(r.hotel)}</div><div class="hm-sub"><span class="mi">place</span>${escR(r.zona)} · ${escR(r.lider)}</div></div></td>
        <td>${ctxCell}</td>
        <td>${reqUrgPill(r)}</td>
        <td><span class="req-tbl-period"><span class="mi">event</span>${escR(r.period)}</span></td>
        <td><div class="req-tbl-pills">${reqMetaPills(r)}</div></td>
        <td><div class="req-tbl-pos-wrap">${reqPosCells(r)}</div></td>
        <td><div class="req-tbl-cov"><span class="req-sem-icon" data-c="${sem}"><span class="mi">groups</span></span><div class="req-cov-bar req-cov-bar-sem" style="flex:1;margin:0;min-width:90px">${reqCovBar(r)}</div><span class="req-tbl-cov-num" data-c="${sem}">${t.cub}/${t.total}<span class="pct">${t.pct}%</span></span></div></td>
        <td style="font-size:11.5px;color:var(--ink-3);white-space:nowrap">${escR(r.age)}</td>
        <td><button class="req-take-btn" onclick="event.stopPropagation();reqDrawer('${escR(r.id)}')"><span class="mi">visibility</span>Ver</button></td>
      </tr>`;}).join('')}
  </tbody></table></div>`;
}
// Tarjeta rica de requisición (estilo Líder: cardHTML) — usada en Tarjetas y Tablero.
function reqRichCard(r,opt){
  opt=opt||{};
  const t=totals(r),sem=domSemaforo(r),ctx=reqContext(r);
  const stColor=URG_COLOR[r.urg]||'#FFCC33';
  const othersN=r.takers?r.takers.length:0;
  const showRibbon=ctx&&ctx.key==='colab'&&!opt.hideRibbon;
  const colabMini=(ctx&&ctx.key==='colab')?` <span class="req-colab-mini" title="${othersN} reclutador${othersN>1?'es':''} trabajándola"><span class="mi">groups</span>${othersN}</span>`:'';
  const covBar=r.positions.map(p=>{const psem=posSemaforo(p);let s='';for(let i=0;i<p.cubierto;i++)s+='<span class="req-cov-seg" data-sem="verde"></span>';for(let i=0;i<(p.total-p.cubierto);i++)s+=`<span class="req-cov-seg" data-sem="${psem}"></span>`;return s;}).join('');
  const posRows=r.positions.map(p=>{
    const psem=posSemaforo(p);const falta=p.total-p.cubierto;const pctFalta=Math.round((falta/p.total)*100);
    let detail;
    if(p.cubierto>=p.total) detail=`${p.total}/${p.total} · 100%`;
    else if(p.cubierto===0&&(p.proceso||0)===0) detail=`${p.total} ${p.total===1?'puesto':'puestos'} · esperando`;
    else detail=`${p.cubierto}/${p.total} · faltan ${falta} (${pctFalta}%)${(p.proceso>0?` · ${p.proceso} en proceso`:'')}`;
    return `<div class="req-pos-row" data-sem="${psem}"><span class="pos-ic"><span class="mi">work</span></span><span class="nm">${escR(p.pos)}</span><span class="cnt">${detail}</span></div>`;
  }).join('');
  return `<div class="recl-card requi${showRibbon?' has-ctx':''}" data-ctx="${ctx?ctx.key:''}" data-req-id="${escR(r.id)}" style="--card-st:${stColor};cursor:pointer" onclick="reqDrawer('${escR(r.id)}')">
    ${showRibbon?`<div class="req-ctx-ribbon" data-ctx="${ctx.key}"><span class="mi">${ctx.ic}</span><span class="ctx-lbl">${ctx.lbl}</span><span class="ctx-sub">· ${ctx.sub}</span></div>`:''}
    ${r.vip?`<div class="req-ctx-ribbon" data-ctx="colab"><span class="mi">star</span><span class="ctx-lbl">VIP</span><span class="ctx-sub">· Prioridad alta</span></div>`:''}
    <div class="recl-card-top">
      <div class="recl-avatar req-avatar"><span class="mi">apartment</span><span class="recl-st-ring"></span></div>
      <div class="nm"><div class="name">${escR(r.hotel)}</div><div class="doc">${escR(r.id)}${colabMini}</div></div>
      ${reqUrgPill(r)}
    </div>
    <div class="recl-card-meta">
      <span class="meta-pill mod"><span class="mi">event</span>${escR(r.period)}</span>
      <span class="meta-pill zone"><span class="mi">place</span>Zona ${escR(r.zona)}</span>
      <span class="meta-pill"><span class="mi">badge</span>${escR(r.lider)}</span>
      ${reqMetaPills(r)}
    </div>
    <div class="req-cov-line">
      <div class="req-cov-line-top">
        <span class="req-sem-icon" data-c="${sem}" title="Semáforo: ${sem}"><span class="mi">groups</span></span>
        <span class="lbl">Cobertura de vacantes</span>
        <span class="req-cov-num-chip" data-c="${sem}">${t.cub}/${t.total} <span class="pct">${t.pct}%</span></span>
      </div>
      <div class="req-cov-bar req-cov-bar-sem">${covBar}</div>
    </div>
    <div class="req-pos-sem">${posRows}</div>
    <div class="recl-card-foot">
      <div class="info"><span class="mi">schedule</span>${escR(r.age)}</div>
      <div class="req-foot-actions"><button class="req-take-btn" onclick="event.stopPropagation();reqDrawer('${escR(r.id)}')"><span class="mi">visibility</span>Ver detalle</button></div>
    </div>
  </div>`;
}
function reqCards(arr){
  return `<div class="req-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:14px">${arr.map(r=>reqRichCard(r)).join('')}</div>`;
}
// Tablero (kanban por urgencia) — estilo recl-board / recl-col del Líder.
function reqBoard(arr){
  const cols=[
    {key:'high',nm:'Urgentes',sub:'Menos de 72 horas',dot:'#E11919',bg:'rgb(246,237,235)'},
    {key:'med', nm:'Pronto',  sub:'Entre 72 y 120 horas',dot:'#FFCC33',bg:'rgb(246,239,219)'},
    {key:'low', nm:'Normales',sub:'Más de 120 horas',dot:'#1FA84A',bg:'rgb(243,246,235)'},
  ];
  cols.forEach(c=>c.items=arr.filter(r=>r.urg===c.key));
  return `<div class="recl-board requi-board" data-tab="${_reqTab}">${cols.map(col=>`
    <div class="recl-col" style="background:${col.bg}">
      <div class="recl-col-head" style="background:${col.bg}">
        <div class="recl-col-eyebrow">Estado de urgencia</div>
        <div class="recl-col-head-row">
          <span class="recl-col-dot" style="background:${col.dot}"></span>
          <div class="recl-col-name">${escR(col.nm)}<span class="sub-st">${escR(col.sub)}</span></div>
          <span class="recl-col-count">${col.items.length.toString().padStart(2,'0')}</span>
        </div>
      </div>
      ${col.items.length?col.items.map(r=>reqRichCard(r,{hideRibbon:false})).join(''):`<div class="recl-col-empty"><span class="mi">inbox</span><div class="e-txt">Sin requisiciones</div></div>`}
    </div>`).join('')}</div>`;
}
function reqContentHTML(){const list=reqList();if(!list.length)return `<div class="req-empty"><span class="mi">inbox</span><h3>Sin requisiciones que coincidan</h3><p>Ajusta los filtros o limpia la búsqueda.</p></div>`;return _reqView==='board'?reqBoard(list):(_reqView==='cards'?reqCards(list):reqTableRich(list));}
RENDER.Requisiciones=function(){
  const list=reqList();
  const crit=REQS.filter(r=>r.urg==='high'||r.nota).length;
  const vip=REQS.filter(r=>r.vip).length;
  const tabs=[['todas','Todas (global)','inbox',REQS.length],['criticas','Críticas / Varadas','priority_high',crit],['mias','Mis tomadas','assignment_ind',REQS.filter(r=>r.mine).length]];
  document.getElementById('content').innerHTML=`
  <div class="recl-hero">
    <div class="recl-hero-left">
      <div class="eyebrow"><span class="pulse"></span>Vista global del departamento · Self-pick activo</div>
      <h1>Requisiciones <span class="accent">del departamento</span></h1>
      <div class="lead">El flujo normal es Self-Pick (RR-15): Reclutadoras y Líderes las toman libremente. El Manager solo interviene en casos excepcionales.</div>
    </div>
    <div class="recl-hero-right">
      <div class="recl-stat" onclick="reqStat('all')"><div class="rs-top"><div class="rs-ic" style="background:rgba(255,142,0,.12);color:var(--o-600)"><span class="mi">assignment</span></div><span class="rs-trend up"><span class="mi">arrow_upward</span>+3%</span></div><div class="rs-val">142</div><div class="rs-lbl">Activas (global)</div></div>
      <div class="recl-stat"><div class="rs-top"><div class="rs-ic" style="background:rgba(31,168,74,.12);color:#1F8F50"><span class="mi">task_alt</span></div></div><div class="rs-val">84%</div><div class="rs-lbl">Cobertura</div></div>
      <div class="recl-stat" onclick="reqStat('crit')"><div class="rs-top"><div class="rs-ic" style="background:rgba(225,25,25,.1);color:var(--red)"><span class="mi">warning_amber</span></div></div><div class="rs-val">${crit}</div><div class="rs-lbl">Críticas / varadas</div></div>
      <div class="recl-stat" onclick="reqStat('vip')"><div class="rs-top"><div class="rs-ic" style="background:rgba(123,44,191,.12);color:var(--purple)"><span class="mi">star</span></div></div><div class="rs-val">${vip}</div><div class="rs-lbl">VIP pendientes</div></div>
    </div>
  </div>
  <div class="recl-segmented requi-tabs-full" id="requi-tabs" style="margin:16px 0 6px">${tabs.map(t=>`<button class="${_reqTab===t[0]?'active':''}" onclick="reqTab('${t[0]}')"><span class="mi">${t[2]}</span><span>${t[1]}</span><span class="requi-tab-count">${t[3]}</span></button>`).join('')}</div>
  ${reqFiltersHTML()}
  <div class="recl-board-title"><div style="display:flex;align-items:center;gap:10px"><span class="recl-board-ic"><span class="mi">${_reqTab==='criticas'?'priority_high':(_reqTab==='mias'?'assignment_ind':'inbox')}</span></span><h3>${_reqTab==='criticas'?'Críticas / Varadas':(_reqTab==='mias'?'Mis requisiciones':'Bandeja del departamento')}</h3></div><span class="recl-board-sub">${list.length} requisicion${list.length===1?'':'es'}</span></div>
  <div id="reqContent">${reqContentHTML()}</div>`;
};
function reqTab(t){_reqTab=t;_reqDD=null;_reqF.vip=false;RENDER.Requisiciones();}
function reqSetView(v){_reqView=v;RENDER.Requisiciones();}
function reqToggleDD(k){_reqDD=_reqDD===k?null:k;RENDER.Requisiciones();}
function reqPickFilter(k,v){_reqF[k]=v;_reqDD=null;RENDER.Requisiciones();}
function reqClearFilters(){_reqF={urg:'',pos:'',zona:'',lider:'',q:''};_reqDD=null;RENDER.Requisiciones();}
function reqSearch(v){_reqF.q=v;const c=document.getElementById('reqContent');if(c)c.innerHTML=reqContentHTML();}
function zoneDrill(z){_reqF={urg:'',pos:'',zona:z,lider:'',q:''};_reqTab='todas';navigate(null,'Requisiciones');toast('Requisiciones de la zona '+z,'map');}
function reqDrawer(id){
  const r=REQS.find(x=>x.id===id);if(!r)return;const t=totals(r);const sem=domSemaforo(r);const sub=SUBSTATES[r.state]||SUBSTATES.autorizada;
  openDrawer(`<div class="req-drawer">
  <div class="req-drawer-h drawer-h"><div><div class="req-drawer-pills" style="display:flex;gap:6px;flex-wrap:wrap">${reqUrgPill(r)}<span class="req-substate ${sub.cls}"><span class="dot"></span>${sub.lbl}</span>${r.vip?'<span class="pill purple">VIP</span>':''}</div><h3 style="margin-top:8px">${escR(r.hotel)}</h3><div style="font-size:12.5px;color:var(--ink-3);margin-top:3px">${escR(r.id)} · ${escR(r.zona)} · Líder ${escR(r.lider)} · ${escR(r.period)} · ${escR(r.age)}</div></div><div class="x" onclick="closeDrawer()"><span class="mi">close</span></div></div>
  <div class="drawer-tabs"><div class="drawer-tab active" onclick="drawerTab(this,'det')">Detalle</div><div class="drawer-tab" onclick="drawerTab(this,'part')">Participantes</div><div class="drawer-tab" onclick="drawerTab(this,'hist')">Historial</div></div>
  <div class="drawer-b">
    <div data-pane="det">
      ${r.nota?`<div class="banner warn" style="margin-bottom:14px"><span class="mi">priority_high</span><div>${escR(r.nota)}. Requiere intervención del Manager.</div></div>`:''}
      <div class="sec-title">Cobertura por posición</div>
      ${r.positions.map(p=>{const psem=posSemaforo(p);return `<div class="irow"><span class="k">${escR(p.pos)}</span><span class="v"><span class="req-tbl-cov-num" data-c="${psem}">${p.cubierto}/${p.total}</span></span></div>`;}).join('')}
      <div class="irow"><span class="k">Total</span><span class="v">${t.cub} / ${t.total} · ${t.pct}%</span></div>
      <div class="irow"><span class="k">Contrato · Modalidad</span><span class="v">${escR(r.contrato)} · ${escR(r.shift)}</span></div>
      <div class="irow"><span class="k">Urgencia</span><span class="v">${URG_LABELS[r.urg]}</span></div>
    </div>
    <div data-pane="part" style="display:none">
      <div class="banner info" style="margin-bottom:12px"><span class="mi">groups</span><div>Modelo colaborativo (RR-15): varios reclutadores pueden participar. Sin estado "Liberada".</div></div>
      ${r.takers&&r.takers.length?r.takers.map((tk,i)=>`<div class="irow"><span class="k">Reclutador ${i+1}</span><span class="v"><span class="pill ${i?'blue':'green'}">${i?'Apoyo':'Participante'}</span></span></div>`).join(''):'<div class="empty"><span class="mi">person_off</span><div class="et">Sin reclutadores activos aún</div></div>'}
    </div>
    <div data-pane="hist" style="display:none"><div class="tl">
      <div class="tl-item"><div class="tt">Requisición autorizada</div><div class="ts">Hace 3 días · Supervisor del hotel</div></div>
      <div class="tl-item"><div class="tt">Tomada por reclutadora</div><div class="ts">Hace 2 días · ${r.lider!=='—'?'grupo de '+escR(r.lider):'pendiente'}</div></div>
      <div class="tl-item"><div class="tt">${t.cub} posiciones cubiertas</div><div class="ts">Progreso actual</div></div>
    </div></div>
  </div>
  <div class="drawer-f">
    <button class="btn primary" onclick="reqTomar('${escR(r.id)}')"><span class="mi">how_to_reg</span>Tomar como Manager</button>
    <button class="btn ghost" onclick="reqAsignar('${escR(r.id)}')"><span class="mi">person_add</span>Asignar a Reclutadora</button>
    <button class="btn ghost" onclick="reqReasignar('${escR(r.id)}')"><span class="mi">sync_alt</span>Reasignar</button>
    <button class="btn ghost" onclick="reqForzar('${escR(r.id)}')"><span class="mi">tune</span>Forzar semáforo</button>
  </div></div>`);
}
// RF-EXC-01
function reqTomar(id){openModal(`<div class="modal-h"><h3>Tomar como Manager · ${id}</h3><div class="x" onclick="closeModal()"><span class="mi">close</span></div></div>
  <div class="modal-b"><div class="banner info" style="margin-bottom:14px"><span class="mi">info</span><div>Intervención excepcional. Te registras como participante (no bloquea, RR-15). Queda en log auditable.</div></div>
  <div class="field"><label>Justificación <span class="req">*</span></label><textarea class="ta" id="jTomar" placeholder="Motivo de la intervención (obligatorio)…"></textarea></div></div>
  <div class="modal-f"><button class="btn ghost" onclick="closeModal()">Cancelar</button><button class="btn primary" onclick="(function(){if(document.getElementById('jTomar').value.trim().length<5){toast('La intervención manual requiere justificación','error');return;}var r=REQS.find(x=>x.id==='${id}');if(r)r.mine=true;closeModal();closeDrawer();toast('${id} tomada como Manager · registrada en Mis tomadas','how_to_reg');RENDER.Requisiciones();})()"><span class="mi">check</span>Confirmar</button></div>`);}
// RF-EXC-02
function reqAsignar(id){openModal(`<div class="modal-h"><h3>Asignar a Reclutadora · ${id}</h3><div class="x" onclick="closeModal()"><span class="mi">close</span></div></div>
  <div class="modal-b">
  <div class="field"><label>Reclutadora <span class="req">*</span></label><select class="sel" id="aRecl"><option value="">Selecciona…</option>${LIDERES.flatMap(l=>l.recl).map(r=>`<option>${r.nombre} (${r.zona})</option>`).join('')}</select></div>
  <div class="field"><label>Modo</label><div class="radio-row"><div class="radio-opt sel" onclick="pickRadio(this)" data-v="part"><div class="rt">Agregar como participante</div><div class="rs">Se suma al equipo de la requisición (RR-15)</div></div><div class="radio-opt" onclick="pickRadio(this)" data-v="transf"><div class="rt">Transferir</div><div class="rs">Entrega completa de la requisición</div></div></div></div>
  <div class="field"><label>Justificación <span class="req">*</span></label><textarea class="ta" id="jAsig" placeholder="Motivo (obligatorio)…"></textarea></div></div>
  <div class="modal-f"><button class="btn ghost" onclick="closeModal()">Cancelar</button><button class="btn primary" onclick="(function(){var rc=document.getElementById('aRecl').value;if(!rc){toast('Selecciona una reclutadora','error');return;}if(document.getElementById('jAsig').value.trim().length<5){toast('La asignación manual requiere justificación','error');return;}closeModal();closeDrawer();toast('${id} asignada a '+rc+' (marcada \\'Asignada por Manager\\')','person_add');})()"><span class="mi">check</span>Asignar</button></div>`);}
// RF-EXC-03
function reqReasignar(id){openModal(`<div class="modal-h"><h3>Reasignar · ${id}</h3><div class="x" onclick="closeModal()"><span class="mi">close</span></div></div>
  <div class="modal-b">
  <div class="field"><label>Nueva reclutadora <span class="req">*</span></label><select class="sel" id="rNueva"><option value="">Selecciona…</option>${LIDERES.flatMap(l=>l.recl).map(r=>`<option>${r.nombre} (${r.zona})</option>`).join('')}</select></div>
  <div class="field"><label>Modo</label><div class="radio-row"><div class="radio-opt sel" onclick="pickRadio(this)" data-v="transf"><div class="rt">Transferir</div><div class="rs">La original pierde acceso</div></div><div class="radio-opt" onclick="pickRadio(this)" data-v="apoyo"><div class="rt">Agregar como apoyo</div><div class="rs">La original sigue como participante</div></div></div></div>
  <div class="field"><label>Motivo <span class="req">*</span></label><textarea class="ta" id="jReas" placeholder="Motivo (obligatorio)…"></textarea></div></div>
  <div class="modal-f"><button class="btn ghost" onclick="closeModal()">Cancelar</button><button class="btn primary" onclick="(function(){var rc=document.getElementById('rNueva').value;if(!rc){toast('Selecciona la nueva reclutadora','error');return;}if(document.getElementById('jReas').value.trim().length<5){toast('Debe indicar motivo','error');return;}closeModal();closeDrawer();toast('${id} reasignada a '+rc+' · partes notificadas','sync_alt');})()"><span class="mi">check</span>Reasignar</button></div>`);}
// RF-21
function reqForzar(id){openModal(`<div class="modal-h"><h3>Forzar semáforo · ${id}</h3><div class="x" onclick="closeModal()"><span class="mi">close</span></div></div>
  <div class="modal-b"><div class="banner warn" style="margin-bottom:14px"><span class="mi">tune</span><div>Override manual. Prevalece hasta el próximo recálculo. Queda en log auditable (RR-12) y notifica al Líder y a la Reclutadora.</div></div>
  <div class="field"><label>Semáforo <span class="req">*</span></label><select class="sel" id="fSem"><option>Semáforo de Requisición</option><option>Semáforo de Urgencia</option><option>Semáforo de Posiciones</option></select></div>
  <div class="field"><label>Valor destino <span class="req">*</span></label><select class="sel" id="fVal"><option value="">Selecciona…</option><option>Verde</option><option>Ámbar</option><option>Rojo</option></select></div>
  <div class="field"><label>Justificación <span class="req">*</span></label><textarea class="ta" id="jForz" placeholder="Motivo del override (obligatorio)…"></textarea></div></div>
  <div class="modal-f"><button class="btn ghost" onclick="closeModal()">Cancelar</button><button class="btn primary" onclick="(function(){if(!document.getElementById('fVal').value){toast('Selecciona el valor destino','error');return;}if(document.getElementById('jForz').value.trim().length<5){toast('El override requiere justificación','error');return;}closeModal();closeDrawer();toast('Semáforo forzado en ${id} · registrado en log','tune');})()"><span class="mi">check</span>Aplicar override</button></div>`);}
function pickRadio(el){el.parentElement.querySelectorAll('.radio-opt').forEach(o=>o.classList.remove('sel'));el.classList.add('sel');}

/* ============================ RECLUTAMIENTO (pool + entrevistas, vista global) ============================ */
/* Candidatos en proceso (sub-vista Entrevistas) */
const ESTCAND={
  pendApp:{l:'Pendientes de App',c:'#D96400',bg:'var(--o-50)',ic:'hourglass_top'},
  pendVal:{l:'Pendientes de Validar',c:'#8A5A00',bg:'#FFF7E6',ic:'fact_check'},
  borrador:{l:'Borradores',c:'#6E635A',bg:'var(--surface-3)',ic:'edit_note'},
  abandonado:{l:'Abandonados',c:'#1A1108',bg:'var(--surface-3)',ic:'person_off'},
  validado:{l:'Validados',c:'#1FA84A',bg:'rgba(31,168,74,.1)',ic:'verified'}
};
const ESTORDER=['pendApp','pendVal','borrador','abandonado','validado'];
const FASES=['Fase 1','Fase 2','Fase 3','Validación'];
function diasColor(d){return d<3?'var(--green)':d<=7?'#C79400':'var(--red)';}
let CANDIDATOS=[
  {id:'CAND-101',nombre:'Pedro Salas',ini:'PS',pos:'Housekeeper',zona:'Centro',recl:'Ana López',lider:'Juanita López',estado:'pendApp',dias:2,origen:'Referido',modalidad:'Tiempo completo',fecha:'21 Jun',fase:1},
  {id:'CAND-110',nombre:'Natalia Vega',ini:'NV',pos:'Housekeeper',zona:'Sur',recl:'Beatriz Cruz',lider:'Marco Díaz',estado:'pendApp',dias:9,origen:'Aplicación directa',modalidad:'Temporal',fecha:'14 Jun',fase:1},
  {id:'CAND-102',nombre:'Lorena Vargas',ini:'LV',pos:'Recepción',zona:'Centro',recl:'Lucía Fernández',lider:'Juanita López',estado:'pendApp',dias:5,origen:'Aplicación directa',modalidad:'Medio tiempo',fecha:'18 Jun',fase:1},
  {id:'CAND-103',nombre:'Diego Morales',ini:'DM',pos:'Chef',zona:'Sur',recl:'Beatriz Cruz',lider:'Marco Díaz',estado:'pendVal',dias:1,origen:'Reclutamiento activo',modalidad:'Tiempo completo',fecha:'22 Jun',fase:3},
  {id:'CAND-104',nombre:'Rocío Campos',ini:'RC',pos:'Mesero',zona:'Sur',recl:'Karla Mena',lider:'Marco Díaz',estado:'pendVal',dias:4,origen:'Referido',modalidad:'Temporal',fecha:'19 Jun',fase:3},
  {id:'CAND-105',nombre:'Andrés Ponce',ini:'AP',pos:'Mantenimiento',zona:'Oeste',recl:'Sofía Marín',lider:'Elena Ruiz',estado:'pendVal',dias:8,origen:'Aplicación directa',modalidad:'Tiempo completo',fecha:'15 Jun',fase:3},
  {id:'CAND-107',nombre:'Mateo Fuentes',ini:'MF',pos:'Recepción',zona:'Noroeste',recl:'Daniela Soto',lider:'Tomás Vela',estado:'pendApp',dias:1,origen:'Referido',modalidad:'Tiempo completo',fecha:'22 Jun',fase:1},
  {id:'CAND-106',nombre:'Valeria Ríos',ini:'VR',pos:'Housekeeper',zona:'Noroeste',recl:'Daniela Soto',lider:'Tomás Vela',estado:'abandonado',dias:12,origen:'Aplicación directa',modalidad:'Medio tiempo',fecha:'11 Jun',fase:1},
  {id:'CAND-112',nombre:'Paula Núñez',ini:'PN',pos:'Mantenimiento',zona:'Noroeste',recl:'Daniela Soto',lider:'Tomás Vela',estado:'abandonado',dias:15,origen:'Aplicación directa',modalidad:'Tiempo completo',fecha:'08 Jun',fase:1},
  {id:'CAND-108',nombre:'Camila Ortega',ini:'CO',pos:'Chef',zona:'Centro',recl:'Ana López',lider:'Juanita López',estado:'validado',dias:0,origen:'Reclutamiento activo',modalidad:'Tiempo completo',fecha:'20 Jun',fase:'val',validador:'Ana López'},
  {id:'CAND-109',nombre:'Sergio Lara',ini:'SL',pos:'Mesero',zona:'Oeste',recl:'Sofía Marín',lider:'Elena Ruiz',estado:'validado',dias:0,origen:'Referido',modalidad:'Medio tiempo',fecha:'17 Jun',fase:'val',validador:'Elena Ruiz'},
  {id:'CAND-111',nombre:'Hugo Reyes',ini:'HR',pos:'Recepción',zona:'Centro',recl:'Hugo Marín (Manager)',lider:'—',estado:'pendVal',dias:2,origen:'Intervención Manager',modalidad:'Tiempo completo',fecha:'21 Jun',fase:3,manager:true}
];
let _reclView='pool',_poolView='board',_entView='board',_entToggle='global',_entF={lider:'',recl:'',pos:'',zona:'',mod:'',origen:'',estado:'',dias:'',q:''},_poolF={pos:'',zona:'',mod:'',eng:'',lider:'',st:'',q:''},_poolDD=null,_entDD=null;
const _allRecl=()=>LIDERES.flatMap(l=>l.recl.map(r=>r.nombre));
const _email=n=>n.toLowerCase().replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u').replace(/ñ/g,'n').replace(/[^a-z ]/g,'').trim().split(/\s+/).slice(0,2).join('.')+'@oranje.com';
const REG_EMAILS=new Set([MGR.name,...LIDERES.map(l=>l.nombre),..._allRecl()].map(_email));
function reclLider(name){for(const l of LIDERES){if(l.recl.some(r=>r.nombre===name))return l.nombre;}return '—';}
function findRecl(name){for(let li=0;li<LIDERES.length;li++){const ri=LIDERES[li].recl.findIndex(r=>r.nombre===name);if(ri>=0)return [li,ri];}return null;}

RENDER.Reclutamiento=function(){
  document.body.classList.remove('recl-view-board','recl-view-list','recl-view-table','recl-view-map');
  document.body.classList.add('recl-view-'+(_reclView==='pool'?_poolView:_entView));
  document.getElementById('content').innerHTML = reclHero() + reclSubtabs() + (_reclView==='pool'?poolView():entrevistasView());
};
function reclSub(v){_reclView=v;_poolDD=null;_entDD=null;RENDER.Reclutamiento();}
function reclSubtabs(){
  return `<div class="recl-segmented requi-tabs-full" style="margin:16px 0 6px">
    <button class="${_reclView==='entrevistas'?'active':''}" onclick="reclSub('entrevistas')"><span class="mi">how_to_reg</span><span>Entrevistas</span><span class="requi-tab-count">${CANDIDATOS.length}</span></button>
    <button class="${_reclView==='pool'?'active':''}" onclick="reclSub('pool')"><span class="mi">groups</span><span>Pool de colaboradores</span><span class="requi-tab-count">${POOL.length}</span></button>
  </div>`;
}
function reclHero(){
  if(_reclView==='pool'){
    return `<div class="recl-hero"><div class="recl-hero-left">
      <div class="eyebrow"><span class="pulse"></span>Vista global del departamento · Pool vivo</div>
      <h1>Pool de <span class="accent">colaboradores</span></h1>
      <div class="lead">El Manager supervisa el pool de todas las zonas. Las acciones operativas (crear / editar / asignar) son apoyo excepcional.</div>
    </div><div class="recl-hero-right">
      <div class="recl-stat"><div class="rs-top"><div class="rs-ic" style="background:rgba(255,142,0,.12);color:var(--o-600)"><span class="mi">groups</span></div><span class="rs-trend up"><span class="mi">arrow_upward</span>+4</span></div><div class="rs-val">142</div><div class="rs-lbl">Pool global</div></div>
      <div class="recl-stat"><div class="rs-top"><div class="rs-ic" style="background:rgba(31,168,74,.12);color:#1F8F50"><span class="mi">check_circle</span></div></div><div class="rs-val">58</div><div class="rs-lbl">Disponibles</div></div>
      <div class="recl-stat"><div class="rs-top"><div class="rs-ic" style="background:rgba(59,125,221,.14);color:#1583B0"><span class="mi">how_to_reg</span></div></div><div class="rs-val">14</div><div class="rs-lbl">Pendientes de validar</div></div>
      <div class="recl-stat"><div class="rs-top"><div class="rs-ic" style="background:rgba(255,213,0,.18);color:#C79400"><span class="mi">event_available</span></div></div><div class="rs-val">9</div><div class="rs-lbl">Disp. voluntarios</div></div>
    </div></div>`;
  }
  const sc=entScoped();
  const enProceso=sc.filter(c=>['pendApp','pendVal','borrador'].includes(c.estado)).length;
  const atascados=sc.filter(c=>c.dias>7&&c.estado!=='validado').length;
  const pendVal=entCount('pendVal');
  return `<div class="recl-hero"><div class="recl-hero-left">
    <div class="eyebrow"><span class="pulse"></span>Seguimiento de altas · Auditoría del depto</div>
    <h1>Entrevistas <span class="accent">del departamento</span></h1>
    <div class="lead">Supervisa todas las altas de candidatos del depto. El expediente es de solo lectura; tus acciones son intervención excepcional (log auditable, RR-12).</div>
  </div><div class="recl-hero-right">
    <div class="recl-stat"><div class="rs-top"><div class="rs-ic" style="background:rgba(255,142,0,.12);color:var(--o-600)"><span class="mi">groups</span></div></div><div class="rs-val">${enProceso}</div><div class="rs-lbl">En proceso</div></div>
    <div class="recl-stat"><div class="rs-top"><div class="rs-ic" style="background:rgba(255,193,40,.18);color:#8A5A00"><span class="mi">fact_check</span></div></div><div class="rs-val">${pendVal}</div><div class="rs-lbl">Pendientes de validar</div></div>
    <div class="recl-stat"><div class="rs-top"><div class="rs-ic" style="background:rgba(225,25,25,.1);color:var(--red)"><span class="mi">timer_off</span></div></div><div class="rs-val">${atascados}</div><div class="rs-lbl">Atascados (&gt;7 días)</div></div>
    <div class="recl-stat"><div class="rs-top"><div class="rs-ic" style="background:rgba(31,168,74,.12);color:#1F8F50"><span class="mi">trending_up</span></div><span class="rs-trend up"><span class="mi">arrow_upward</span>+6%</span></div><div class="rs-val">64%</div><div class="rs-lbl">Conversión F1 → Pool</div></div>
  </div></div>`;
}
/* ---- Filtros chip compartidos (Pool + Entrevistas) ---- */
function reclChips(cfg,st,toggleFn,pickFn,openKey){
  return cfg.map(c=>{const cur=st[c.key];const curLbl=cur?(c.opts.find(o=>o[0]===cur)?.[1]||cur):c.opts[0][1];const open=openKey===c.key;const dot=(c.dot&&cur)?`<span class="recl-fdd-dot" style="background:${c.dot[cur]}"></span>`:'';
    return `<div class="recl-filter-grp ${cur?'active':''} ${open?'open':''}" onclick="event.stopPropagation();${toggleFn}('${c.key}')"><span class="lbl-grp">${c.lbl}</span><span class="val">${dot}${escR(curLbl)}</span><span class="mi">${open?'expand_less':'expand_more'}</span>${open?`<div class="recl-fdd" onclick="event.stopPropagation()">${c.opts.map(o=>`<div class="recl-fdd-item ${o[0]===''?'all':''} ${cur===o[0]?'selected':''}" onclick="${pickFn}('${c.key}','${escR(o[0])}')">${(c.dot&&o[0])?`<span class="recl-fdd-dot" style="background:${c.dot[o[0]]}"></span>`:''}<span>${escR(o[1])}</span><span class="mi">check</span></div>`).join('')}</div>`:''}</div>`;}).join('');
}
function reclClear(cfg,st,clearFn){const n=cfg.filter(c=>st[c.key]).length+(st.q?1:0);return n?`<button class="recl-filter-clear" onclick="${clearFn}()"><span class="mi">filter_alt_off</span>Limpiar todo<span class="badge-n">${n}</span></button>`:'';}
/* ---- Sub-vista POOL (recl-table) ---- */
const ENG_LBL=['Básico','Intermedio','Avanzado','Conversacional'];
function modPillInfo(mod){const m=String(mod||'').replace(/\s+/g,' ').trim();if(m==='Medio tiempo')return {k:'mt',lbl:'Medio tiempo'};if(m==='Por hora'||m==='Por horas')return {k:'ph',lbl:'Por horas'};return {k:'tc',lbl:'Tiempo completo'};}
function poolFiltered(){return POOL.filter(c=>(!_poolF.pos||c.pos===_poolF.pos)&&(!_poolF.zona||c.zona===_poolF.zona)&&(!_poolF.mod||c.mod===_poolF.mod)&&(!_poolF.eng||c.eng===+_poolF.eng)&&(!_poolF.lider||c.lider===_poolF.lider)&&(!_poolF.st||c.st===_poolF.st)&&(!_poolF.q||(c.nombre+' '+c.id).toLowerCase().includes(_poolF.q.toLowerCase())));}
/* Tarjeta de colaborador (recl-card del Líder) */
function reclCard(c){const eng=ENG_LBL[c.eng-1]||'—';const ebars=[1,2,3,4].map(i=>`<span class="eb ${i<=c.eng?'on':''}"></span>`).join('');const mp=modPillInfo(c.mod);const idx=POOL.indexOf(c);
  return `<div class="recl-card" style="--card-st:${stColor(c.st)}" onclick="poolDrawer(${idx})">
    <div class="recl-card-top"><div class="recl-avatar ${poolGrad(c.id)}">${c.ini}<span class="recl-st-ring"></span></div><div class="nm"><div class="name">${c.nombre}</div><div class="doc">ID ${c.id}</div></div></div>
    <div class="recl-card-meta"><span class="meta-pill pos"><span class="mi">work_outline</span>${c.pos}</span><span class="meta-pill zone"><span class="mi">place</span>${c.zona}</span><span class="meta-pill modw" data-m="${mp.k}"><span class="mi">schedule</span>${mp.lbl}</span></div>
    <div class="recl-eng"><span>EN</span><div class="eng-bars">${ebars}</div><span style="margin-left:auto;color:rgb(83,59,23);font-weight:600">${eng}</span></div>
    <div class="recl-card-foot"><div class="info"><span class="mi">history</span>${c.hoteles} hotel${c.hoteles===1?'':'es'}</div>${c.st==='negro'?`<span class="assign-btn" style="background:rgba(225,25,25,.08);color:var(--red);border-color:rgba(225,25,25,.2)" onclick="event.stopPropagation();poolDrawer(${idx})"><span class="mi">block</span>Blacklist</span>`:`<button class="assign-btn" style="background:transparent;color:var(--ink-2);border-color:var(--line-2)" onclick="event.stopPropagation();poolDrawer(${idx})"><span class="mi">visibility</span>Ver detalle</button>`}</div>
  </div>`;}
/* Vista Tablero (kanban por estado) */
function poolBoard(){const list=poolFiltered();const cols=STATUSES.map(s=>{const ppl=list.filter(c=>c.st===s.key);const cards=ppl.length?ppl.map(reclCard).join(''):`<div class="recl-col-empty"><span class="mi">person_off</span><div class="e-txt">Sin colaboradores</div></div>`;
  return `<div class="recl-col"><div class="recl-col-head"><span class="recl-col-dot" style="background:${s.color}"></span><div class="recl-col-name">${s.label}<span class="sub-st">${s.sub}</span></div><span class="recl-col-count">${String(ppl.length).padStart(2,'0')}</span></div>${cards}</div>`;}).join('');
  return `<div class="recl-board-title"><h2><span class="recl-board-ic"><span class="mi">groups</span></span>Pool de colaboradores</h2><div class="recl-board-sub">${list.length} colaboradores en pool · ${STATUSES.length} estados</div></div><div class="recl-board">${cols}</div>`;}
/* Vista Tarjetas */
function poolCards(){const list=poolFiltered();if(!list.length)return `<div class="req-empty"><span class="mi">person_search</span><h3>Sin colaboradores</h3><p>Ajusta los filtros o limpia la búsqueda.</p></div>`;return `<div class="recl-list">${list.map(reclCard).join('')}</div>`;}
/* Vista Por zona */
function poolMap(){const list=poolFiltered();const zones=ZONAS.map(z=>{const ppl=list.filter(c=>c.zona===z.z);const rows=ppl.length?ppl.map(c=>`<div class="recl-zone-row" onclick="poolDrawer(${POOL.indexOf(c)})"><div class="recl-avatar ${poolGrad(c.id)}" style="--card-st:${stColor(c.st)}">${c.ini}<span class="recl-st-ring"></span></div><div class="nm"><div class="name">${c.nombre}</div><div class="doc">${c.id} · ${stLabel(c.st)}</div></div><span class="pos">${c.pos}</span><span class="mi chev">chevron_right</span></div>`).join(''):`<div style="padding:14px;text-align:center;color:var(--ink-4);font-size:12px">Sin colaboradores en esta zona</div>`;
  return `<div class="recl-zone"><div class="recl-zone-head"><div class="recl-zone-ic"><span class="mi">place</span></div><div class="recl-zone-name">${z.z}<span class="meta">${ppl.length} colaborador${ppl.length===1?'':'es'} · ${ppl.filter(c=>c.st==='verdef').length} disponibles</span></div><div class="recl-zone-tot">${String(ppl.length).padStart(2,'0')}</div></div><div class="recl-zone-stack">${rows}</div></div>`;}).join('');
  return `<div class="recl-map">${zones}</div>`;}
/* Vista Tabla */
function poolTableRows(){const l=poolFiltered();if(!l.length)return `<tr><td colspan="9"><div class="req-empty"><span class="mi">person_search</span><h3>Sin colaboradores</h3><p>Ajusta los filtros o limpia la búsqueda.</p></div></td></tr>`;
  return l.map(c=>{const i=POOL.indexOf(c);const col=stColor(c.st);const dc=Object.values(c.docs).filter(Boolean).length,dt=Object.keys(c.docs).length;const bl=c.bl?`<span class="t-pill t-pill-warn"><span class="mi">block</span>Blacklist</span>`:`<span class="t-pill t-pill-ok"><span class="mi">check</span>Apto</span>`;
    return `<tr onclick="poolDrawer(${i})">
      <td><div class="t-person"><div class="recl-avatar ${poolGrad(c.id)}" style="--card-st:${col};width:34px;height:34px;font-size:12px">${c.ini}<span class="recl-st-ring" style="border-width:2px"></span></div><div class="t-person-txt"><div class="t-name">${c.nombre}</div><div class="t-doc">ID ${c.id}</div></div></div></td>
      <td><span class="t-pill t-pos">${c.pos}</span></td>
      <td>${c.zona}</td>
      <td>${c.mod}</td>
      <td><span class="t-state"><span class="dot" style="background:${col}"></span>${stLabel(c.st)}</span></td>
      <td><span class="t-eng">EN ${ENG_LBL[c.eng-1]||'—'}</span></td>
      <td><span class="t-docs ${dc===dt?'ok':'pending'}"><span class="mi">${dc===dt?'task_alt':'pending'}</span>${dc}/${dt}</span></td>
      <td>${bl}</td>
      <td class="t-actions"><button class="t-act" onclick="event.stopPropagation();poolDrawer(${i})"><span class="mi">visibility</span></button></td>
    </tr>`;}).join('');}
function poolTableWrap(){return `<div class="recl-table-wrap"><table class="recl-table"><thead><tr><th>Colaborador</th><th>Posición</th><th>Zona</th><th>Modalidad</th><th>Estado</th><th>Inglés</th><th>Documentos</th><th>Blacklist</th><th></th></tr></thead><tbody id="poolTbody">${poolTableRows()}</tbody></table></div>`;}
function poolBodyHTML(){return _poolView==='board'?poolBoard():_poolView==='list'?poolCards():_poolView==='map'?poolMap():poolTableWrap();}
function poolView(){
  const POS=[...new Set(POOL.map(c=>c.pos))];
  const cfg=[
    {key:'pos',lbl:'Posición',opts:[['','Todas'],...POS.map(p=>[p,p])]},
    {key:'zona',lbl:'Zona',opts:[['','Todas'],...ZONAS.map(z=>[z.z,z.z])]},
    {key:'mod',lbl:'Modalidad',opts:[['','Todas'],['Tiempo completo','Tiempo completo'],['Medio tiempo','Medio tiempo'],['Por horas','Por horas']]},
    {key:'eng',lbl:'Inglés',opts:[['','Todas'],['1','Básico'],['2','Intermedio'],['3','Avanzado'],['4','Conversacional']]},
    {key:'lider',lbl:'Líder',opts:[['','Todos'],...LIDERES.map(l=>[l.nombre,l.nombre])]},
    {key:'st',lbl:'Estado',opts:[['','Todos'],...STATUSES.map(s=>[s.key,s.label])],dot:Object.fromEntries(STATUSES.map(s=>[s.key,s.color]))},
  ];
  return `<div class="recl-toolbar"><div class="recl-search" style="width:340px"><span class="mi">search</span><input id="poolSearchInput" placeholder="Buscar por nombre, documento, teléfono o ID…" oninput="poolSetFilter('q',this.value)" value="${escR(_poolF.q)}"><span class="kbd">⌘F</span></div>
    <div style="flex:1"></div><button class="btn primary" onclick="reclNuevoColab()"><span class="mi">person_add</span>Nuevo colaborador</button></div>
  <div class="recl-filters"><div class="recl-filters-left">${reclChips(cfg,_poolF,'poolToggleDD','poolPick',_poolDD)}${reclClear(cfg,_poolF,'poolClear')}</div>
    <div class="recl-filters-right"><div class="recl-segmented recl-segmented-inline">
      <button class="${_poolView==='board'?'active':''}" onclick="poolSetView('board')"><span class="mi">view_kanban</span>Tablero</button>
      <button class="${_poolView==='list'?'active':''}" onclick="poolSetView('list')"><span class="mi">grid_view</span>Tarjetas</button>
      <button class="${_poolView==='table'?'active':''}" onclick="poolSetView('table')"><span class="mi">table_rows</span>Tabla</button>
      <button class="${_poolView==='map'?'active':''}" onclick="poolSetView('map')"><span class="mi">map</span>Por zona</button>
    </div></div></div>
  <div id="poolBody">${poolBodyHTML()}</div>`;
}
function poolSetFilter(k,v){_poolF[k]=v;const b=document.getElementById('poolBody');if(b)b.innerHTML=poolBodyHTML();}
function poolSetView(v){_poolView=v;RENDER.Reclutamiento();}
function poolToggleDD(k){_poolDD=_poolDD===k?null:k;RENDER.Reclutamiento();}
function poolPick(k,v){_poolF[k]=v;_poolDD=null;RENDER.Reclutamiento();}
function poolClear(){_poolF={pos:'',zona:'',mod:'',eng:'',lider:'',st:'',q:''};_poolDD=null;RENDER.Reclutamiento();}
function poolDrawer(i){const c=POOL[i];const col=stColor(c.st);const dc=Object.values(c.docs).filter(Boolean).length,dt=Object.keys(c.docs).length;
  openDrawer(`<div class="req-drawer">
  <div class="drawer-h"><div style="display:flex;gap:12px;align-items:flex-start"><div class="recl-avatar ${poolGrad(c.id)}" style="--card-st:${col};width:46px;height:46px;font-size:15px;flex:none">${c.ini}<span class="recl-st-ring"></span></div><div><h3>${c.nombre}</h3><div style="font-size:12.5px;color:var(--ink-3);margin-top:3px">ID ${c.id} · ${c.zona}${c.lider!=='—'?' · Líder '+c.lider:''}</div><div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap"><span class="st-chip" style="border-color:${col};color:${col}"><span class="pip" style="background:${col}"></span>${stLabel(c.st)}</span><span class="t-pill t-pos">${c.pos}</span></div></div></div><div class="x" onclick="closeDrawer()"><span class="mi">close</span></div></div>
  <div class="drawer-tabs"><div class="drawer-tab active" onclick="drawerTab(this,'dat')">Datos</div><div class="drawer-tab" onclick="drawerTab(this,'lab')">Laboral</div><div class="drawer-tab" onclick="drawerTab(this,'his')">Historial</div><div class="drawer-tab" onclick="drawerTab(this,'doc')">Documentos</div></div>
  <div class="drawer-b">
    <div data-pane="dat">
      <div class="banner info" style="margin-bottom:12px"><span class="mi">visibility</span><div>El Manager ve el pool global como supervisor. Las acciones operativas son de apoyo excepcional.</div></div>
      <div class="irow"><span class="k">Posición</span><span class="v">${c.pos}</span></div>
      <div class="irow"><span class="k">Zona</span><span class="v">${c.zona}</span></div>
      <div class="irow"><span class="k">Modalidad</span><span class="v">${c.mod}</span></div>
      <div class="irow"><span class="k">Nivel de inglés</span><span class="v">${ENG_LBL[c.eng-1]||'—'}</span></div>
      <div class="irow"><span class="k">Estado</span><span class="v">${stLabel(c.st)}</span></div>
    </div>
    <div data-pane="lab" style="display:none">
      <div class="irow"><span class="k">Líder de grupo</span><span class="v">${c.lider}</span></div>
      <div class="irow"><span class="k">Hoteles en historial</span><span class="v">${c.hoteles}</span></div>
      <div class="irow"><span class="k">Documentos</span><span class="v">${dc}/${dt}</span></div>
      <div class="irow"><span class="k">Blacklist</span><span class="v">${c.bl?'Vetado':'Apto'}</span></div>
    </div>
    <div data-pane="his" style="display:none"><div class="tl">
      <div class="tl-item"><div class="tt">Alta en el pool</div><div class="ts">Capturado por su reclutadora</div></div>
      <div class="tl-item"><div class="tt">${c.hoteles} hotel${c.hoteles===1?'':'es'} en historial</div><div class="ts">Asignaciones previas</div></div>
      <div class="tl-item"><div class="tt">Estado actual: ${stLabel(c.st)}</div><div class="ts">Semáforo del colaborador</div></div>
    </div></div>
    <div data-pane="doc" style="display:none">
      <div class="irow"><span class="k">Identificación</span><span class="v">${c.docs.ID?'<span class="pill green">OK</span>':'<span class="pill">Pendiente</span>'}</span></div>
      <div class="irow"><span class="k">SSN / ITIN</span><span class="v">${c.docs.SSN?'<span class="pill green">OK</span>':'<span class="pill">Pendiente</span>'}</span></div>
      <div class="irow"><span class="k">Foto</span><span class="v">${c.docs.Foto?'<span class="pill green">OK</span>':'<span class="pill">Pendiente</span>'}</span></div>
    </div>
  </div>
  <div class="drawer-f"><button class="btn ghost" onclick="toast('Editar colaborador (apoyo)','edit')"><span class="mi">edit</span>Editar</button><button class="btn ghost" onclick="toast('Asignar a hotel (excepcional)','hotel')"><span class="mi">hotel</span>Asignar a hotel</button></div></div>`);}

function reclNuevoColab(){openModal(`<div class="modal-h"><h3>Nuevo colaborador</h3><div class="x" onclick="closeModal()"><span class="mi">close</span></div></div>
  <div class="modal-b"><div class="banner warn" style="margin-bottom:14px"><span class="mi">info</span><div>Alta de apoyo excepcional. Normalmente la captura la Reclutadora; el alta del Manager queda en log auditable (RR-12).</div></div>
  <div class="grid g2"><div class="field"><label>Nombre completo <span class="req">*</span></label><input class="inp" id="ncNom"></div><div class="field"><label>Teléfono <span class="req">*</span></label><input class="inp" id="ncTel"></div></div>
  <div class="grid g2"><div class="field"><label>Posición <span class="req">*</span></label><select class="sel">${[...new Set(POOL.map(c=>c.pos))].map(p=>`<option>${p}</option>`).join('')}</select></div><div class="field"><label>Zona <span class="req">*</span></label><select class="sel">${ZONAS.map(z=>`<option>${z.z}</option>`).join('')}</select></div></div>
  <div class="grid g2"><div class="field"><label>Modalidad</label><select class="sel"><option>Tiempo completo</option><option>Medio tiempo</option><option>Por horas</option></select></div><div class="field"><label>Origen</label><select class="sel"><option>Referido</option><option>Aplicación directa</option><option>Reclutamiento activo</option></select></div></div></div>
  <div class="modal-f"><button class="btn ghost" onclick="closeModal()">Cancelar</button><button class="btn primary" onclick="(function(){if(!document.getElementById('ncNom').value.trim()||!document.getElementById('ncTel').value.trim()){toast('Completa los campos obligatorios','error');return;}closeModal();toast('Colaborador creado · registro enviado para Fase 2','person_add');})()"><span class="mi">check</span>Crear y enviar registro</button></div>`);}
/* ---- Sub-vista ENTREVISTAS ---- */
function entScoped(){return CANDIDATOS.filter(c=>_entToggle==='mias'?c.manager:true);}
function entCount(est){return entScoped().filter(c=>c.estado===est).length;}
const E_STATES=[
  {key:'pendApp',color:'#FF7A00',name:'Pendientes de App',sub:'Fase 1 hecha · esperando descarga + Fase 2'},
  {key:'pendVal',color:'#FFC800',name:'Pendientes de Validar',sub:'Fase 2+3 completas · esperando RF-08'},
  {key:'abandonado',color:'#1A1108',name:'Abandonados',sub:'>X días sin completar la app'},
  {key:'validado',color:'#1FA84A',name:'Validados (30 días)',sub:'Histórico reciente · ya pasaron al Pool'},
];
function _diasRange(d){return d<=3?'1-3':d<=7?'4-7':d<=14?'8-14':'15+';}
function entList(){return entScoped().filter(c=>
  (!_entF.lider||c.lider===_entF.lider)&&(!_entF.recl||c.recl===_entF.recl)&&(!_entF.pos||c.pos===_entF.pos)&&(!_entF.zona||c.zona===_entF.zona)&&(!_entF.mod||c.modalidad===_entF.mod)
  &&(!_entF.origen||c.origen===_entF.origen)&&(!_entF.estado||c.estado===_entF.estado)&&(!_entF.dias||_diasRange(c.dias)===_entF.dias)
  &&(!_entF.q||(c.nombre+' '+c.id).toLowerCase().includes(_entF.q.toLowerCase())));}
function diasChip(d){const c=diasColor(d);return `<span class="dias-chip" style="background:${c}1a;color:${c}"><span class="pip" style="background:${c}"></span>${d} d</span>`;}
function entCard(c){const st=E_STATES.find(s=>s.key===c.estado)||E_STATES[0];const alert=c.dias>7;const og=c.origen==='Referido'?'group':c.origen==='Aplicación directa'?'person_search':c.origen==='Reclutamiento activo'?'campaign':'share';const mp=modPillInfo(c.modalidad);
  const cta=c.estado==='pendApp'?['Enviar recordatorio','send',`entSolicitar('${c.id}')`]:c.estado==='pendVal'?['Validar','verified',`entValidar('${c.id}')`]:c.estado==='abandonado'?['Reactivar','restart_alt',`entSolicitar('${c.id}')`]:['Ver historial','history',`entDrawer('${c.id}')`];
  return `<div class="recl-card" style="--card-st:${st.color}" onclick="entDrawer('${c.id}')">
    <div class="recl-card-top"><div class="recl-avatar ${poolGrad(c.id)}">${c.ini}<span class="recl-st-ring"></span></div><div class="nm"><div class="name">${c.nombre}</div><div class="doc">ID ${c.id}${_entToggle==='global'?` · <span style="color:var(--o-700);font-weight:600">${c.recl}</span>`:''}</div></div></div>
    <div class="recl-card-meta"><span class="meta-pill pos"><span class="mi">work_outline</span>${c.pos}</span><span class="meta-pill zone"><span class="mi">place</span>${c.zona}</span><span class="meta-pill modw" data-m="${mp.k}"><span class="mi">schedule</span>${mp.lbl}</span></div>
    <div class="entrev-card-meta" style="margin-top:6px"><span class="entrev-tag ${c.origen==='Referido'?'ok':c.origen==='Aplicación directa'?'origen-app':'origen-rec'}"><span class="mi">${og}</span>${c.origen}</span></div>
    <div class="entrev-card-foot">${c.estado==='validado'?`<span class="entrev-days valid-ok"><span class="mi">verified</span>En Pool</span>`:`<span class="entrev-days ${alert?'alert':''}"><span class="mi">${alert?'warning':'event'}</span>${c.dias} día${c.dias===1?'':'s'} en estado</span>`}<span class="entrev-cta" onclick="event.stopPropagation();${cta[2]}" style="cursor:pointer"><span class="mi">${cta[1]}</span>${cta[0]}</span></div>
  </div>`;}
function entBoard(){const list=entList();const cols=E_STATES.map(s=>{const arr=list.filter(c=>c.estado===s.key);const cards=arr.length?arr.map(entCard).join(''):`<div class="entrev-empty" style="padding:24px 12px;font-size:12px;text-align:center;color:var(--ink-4)">Sin candidatos</div>`;return `<div class="recl-col"><div class="recl-col-head"><span class="recl-col-dot" style="background:${s.color}"></span><div class="recl-col-name">${s.name}<span class="sub-st">${s.sub}</span></div><span class="recl-col-count">${String(arr.length).padStart(2,'0')}</span></div>${cards}</div>`;}).join('');
  return `<div class="recl-board entrev-board">${cols}</div>`;}
function entCards(){const list=entList();if(!list.length)return `<div class="req-empty"><span class="mi">person_search</span><h3>Sin candidatos</h3><p>Ajusta los filtros o cambia de bandeja.</p></div>`;return `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:10px">${list.map(entCard).join('')}</div>`;}
function entTableRows(){const l=entList();if(!l.length)return `<tr><td colspan="7"><div class="req-empty"><span class="mi">person_search</span><h3>Sin candidatos</h3><p>Ajusta los filtros o cambia de bandeja.</p></div></td></tr>`;
  return l.map(c=>{const col=(E_STATES.find(s=>s.key===c.estado)||{}).color;return `<tr onclick="entDrawer('${c.id}')">
    <td><div class="t-person"><div class="recl-avatar ${poolGrad(c.id)}" style="--card-st:${col};width:34px;height:34px;font-size:12px">${c.ini}<span class="recl-st-ring" style="border-width:2px"></span></div><div class="t-person-txt"><div class="t-name">${c.nombre}</div><div class="t-doc">ID ${c.id}</div></div></div></td>
    <td><span class="t-pill t-pos">${c.pos}</span></td><td>${c.zona}</td><td>${c.recl}</td><td>${c.lider}</td>
    <td>${diasChip(c.dias)}</td>
    <td class="t-actions"><button class="t-act" onclick="event.stopPropagation();entDrawer('${c.id}')"><span class="mi">visibility</span></button></td></tr>`;}).join('');}
function entBodyHTML(){return _entView==='list'?entCards():_entView==='table'?`<div class="recl-table-wrap"><table class="recl-table"><thead><tr><th>Candidato</th><th>Posición</th><th>Zona</th><th>Reclutadora</th><th>Líder</th><th>Días en estado</th><th></th></tr></thead><tbody id="entTbody">${entTableRows()}</tbody></table></div>`:entBoard();}
function entrevistasView(){
  const cfg=[
    {key:'pos',lbl:'Posición',opts:[['','Todas'],...[...new Set(CANDIDATOS.map(c=>c.pos))].map(p=>[p,p])]},
    {key:'zona',lbl:'Zona',opts:[['','Todas'],...ZONAS.map(z=>[z.z,z.z])]},
    {key:'mod',lbl:'Modalidad',opts:[['','Todas'],['Tiempo completo','Tiempo completo'],['Medio tiempo','Medio tiempo'],['Por horas','Por horas']]},
    {key:'origen',lbl:'Origen',opts:[['','Todos'],['Referido','Referido'],['Aplicación directa','Aplicación directa'],['Reclutamiento activo','Reclutamiento activo'],['Intervención Manager','Intervención Manager']]},
    {key:'estado',lbl:'Estado',opts:[['','Todos'],...E_STATES.map(s=>[s.key,s.name])],dot:Object.fromEntries(E_STATES.map(s=>[s.key,s.color]))},
    {key:'dias',lbl:'Días',opts:[['','Todos'],['1-3','1-3 días'],['4-7','4-7 días'],['8-14','8-14 días'],['15+','15+ días']]},
    {key:'lider',lbl:'Líder',opts:[['','Todos'],...LIDERES.map(l=>[l.nombre,l.nombre])]},
    {key:'recl',lbl:'Reclutadora',opts:[['','Todas'],..._allRecl().map(r=>[r,r])]},
  ];
  const total=entList().length;
  return `<div class="recl-toolbar"><div class="recl-search" style="width:320px"><span class="mi">search</span><input id="entSearchInput" placeholder="Buscar por nombre, documento o teléfono…" oninput="entSetFilter('q',this.value)" value="${escR(_entF.q)}"><span class="kbd">⌘F</span></div>
    <div class="recl-segmented recl-segmented-inline" style="margin-left:auto"><button class="${_entToggle==='global'?'active':''}" onclick="entSetToggle('global')"><span class="mi">public</span>Histórico global</button><button class="${_entToggle==='mias'?'active':''}" onclick="entSetToggle('mias')"><span class="mi">person</span>Mis entrevistas</button></div>
    <button class="btn primary" onclick="reclNuevoColab()"><span class="mi">person_add</span>Nuevo colaborador</button></div>
  <div class="recl-filters"><div class="recl-filters-left">${reclChips(cfg,_entF,'entToggleDD','entPick',_entDD)}${reclClear(cfg,_entF,'entClear')}</div>
    <div class="recl-filters-right"><div class="recl-segmented recl-segmented-inline">
      <button class="${_entView==='board'?'active':''}" onclick="entSetView('board')"><span class="mi">view_kanban</span>Tablero</button>
      <button class="${_entView==='list'?'active':''}" onclick="entSetView('list')"><span class="mi">grid_view</span>Tarjetas</button>
      <button class="${_entView==='table'?'active':''}" onclick="entSetView('table')"><span class="mi">table_rows</span>Tabla</button>
    </div></div></div>
  <div class="recl-board-title"><h2><span class="recl-board-ic"><span class="mi">how_to_reg</span></span>Entrevistas en seguimiento</h2><div class="recl-board-sub">${total} candidato${total===1?'':'s'} · ${E_STATES.length} estados</div></div>
  <div id="entBody">${entBodyHTML()}</div>`;
}
function entToggleDD(k){_entDD=_entDD===k?null:k;RENDER.Reclutamiento();}
function entPick(k,v){_entF[k]=v;_entDD=null;RENDER.Reclutamiento();}
function entClear(){_entF={lider:'',recl:'',pos:'',zona:'',mod:'',origen:'',estado:'',dias:'',q:''};_entDD=null;RENDER.Reclutamiento();}
function entSetToggle(v){_entToggle=v;RENDER.Reclutamiento();}
function entSetView(v){_entView=v;RENDER.Reclutamiento();}
function entSetFilter(k,v){_entF[k]=v;const b=document.getElementById('entBody');if(b)b.innerHTML=entBodyHTML();}
function entPhases(c){const s=c.estado;return [
  {name:'Fase 1 · Entrevista presencial',meta:'Completada · '+c.fecha,state:'done'},
  {name:'Fase 2 · Datos personales en app',meta:(s==='pendApp'||s==='borrador')?'Pendiente · esperando datos':'Completada',state:(s==='pendApp'||s==='borrador')?'current':'done'},
  {name:'Fase 3 · Carga de documentos',meta:(s==='pendApp'||s==='borrador')?'Pendiente · bloqueada por F2':(s==='abandonado'?'Incompleta':'Completada'),state:(s==='pendApp'||s==='borrador')?'pending':(s==='abandonado'?'pending':'done')},
  {name:'Validación · RF-08',meta:s==='validado'?'Validado · pasó al Pool':(s==='pendVal'?'Pendiente · esperando validación':'Pendiente'),state:s==='validado'?'done':(s==='pendVal'?'current':'pending')},
];}
function entDrawer(id){const c=CANDIDATOS.find(x=>x.id===id);if(!c)return;const e=ESTCAND[c.estado];const dst={pendApp:'pendApp',pendVal:'pendVal',borrador:'pendApp',abandonado:'aband',validado:'valid'}[c.estado]||'pendApp';const mp=modPillInfo(c.modalidad);const alert=c.dias>7;const oi=c.origen==='Referido'?'group':c.origen==='Aplicación directa'?'person_search':c.origen==='Reclutamiento activo'?'campaign':'share';
  openDrawer(`
  <div class="entrev-dr-head">
    <div class="close" onclick="closeDrawer()"><span class="mi">close</span></div>
    <div class="eyebrow" data-st="${dst}">${e.l}</div>
    <h2>${c.nombre}</h2>
    <div class="doc">ID ${c.id} · Reclutadora ${c.recl}</div>
    <div class="head-row"><span class="h-pill"><span class="mi" style="font-size:13px">work</span>${c.pos}</span><span class="h-pill zone"><span class="mi" style="font-size:13px">place</span>${c.zona}</span><span class="h-pill mod" data-mod="${mp.k}"><span class="mi" style="font-size:13px">schedule</span>${mp.lbl}</span></div>
  </div>
  <div class="entrev-dr-body">
    <div class="entrev-section" style="margin-bottom:14px">
      <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--o-50);border:1px solid var(--o-200);border-radius:10px"><span class="mi" style="color:var(--o-600)">badge</span><div style="flex:1"><div style="font-size:11px;color:var(--ink-3);font-weight:600;text-transform:uppercase;letter-spacing:.04em">Reclutadora responsable</div><div style="font-weight:600;color:var(--ink)">${c.recl}</div></div></div>
      ${c.manager?'':`<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px"><button class="btn ghost" style="font-size:12px;padding:7px 11px" onclick="entVerDesempeno('${c.id}')"><span class="mi" style="font-size:16px">insights</span>Ver desempeño</button><button class="btn ghost" style="font-size:12px;padding:7px 11px" onclick="entComentar('${c.id}')"><span class="mi" style="font-size:16px">sticky_note_2</span>Nota interna</button><button class="btn ghost" style="font-size:12px;padding:7px 11px" onclick="entReasignar('${c.id}')"><span class="mi" style="font-size:16px">swap_horiz</span>Reasignar candidato</button></div>`}
    </div>
    <div class="entrev-section">
      <div class="entrev-section-h"><h4>Fases del proceso</h4></div>
      ${entPhases(c).map(p=>`<div class="entrev-phase ${p.state==='done'?'done':p.state==='current'?'current':''}"><div class="entrev-phase-ic"><span class="mi">${p.state==='done'?'check':p.state==='current'?'pending':'radio_button_unchecked'}</span></div><div class="entrev-phase-txt"><div class="entrev-phase-name">${p.name}</div><div class="entrev-phase-meta">${p.meta}</div></div></div>`).join('')}
    </div>
    <div class="entrev-section">
      <div class="entrev-section-h"><h4>Datos del candidato</h4></div>
      <div class="entrev-detail-grid">
        <div class="entrev-detail-row"><div class="ic"><span class="mi">badge</span></div><div class="txt"><div class="lbl">ID interno</div><div class="val">${c.id}</div></div></div>
        <div class="entrev-detail-row"><div class="ic"><span class="mi">work</span></div><div class="txt"><div class="lbl">Posición</div><div class="val">${c.pos}</div></div></div>
        <div class="entrev-detail-row"><div class="ic"><span class="mi">place</span></div><div class="txt"><div class="lbl">Zona</div><div class="val">${c.zona}</div></div></div>
        <div class="entrev-detail-row" data-mod="${mp.k}"><div class="ic"><span class="mi">schedule</span></div><div class="txt"><div class="lbl">Modalidad prevista</div><div class="val">${c.modalidad}</div></div></div>
        <div class="entrev-detail-row"><div class="ic"><span class="mi">${oi}</span></div><div class="txt"><div class="lbl">Origen</div><div class="val">${c.origen}</div></div></div>
        <div class="entrev-detail-row"><div class="ic"><span class="mi">badge</span></div><div class="txt"><div class="lbl">Validador</div><div class="val">${c.validador||'—'}</div></div></div>
        <div class="entrev-detail-row full"><div class="ic"><span class="mi">event</span></div><div class="txt"><div class="lbl">Fecha de entrevista</div><div class="val">${c.fecha}</div></div></div>
      </div>
    </div>
    <div class="entrev-section">
      <div class="entrev-section-h"><h4>Estado actual</h4></div>
      <div class="entrev-status-panel" style="--st-color:${e.c}"><div class="entrev-status-ic"><span class="mi">${c.estado==='validado'?'check_circle':c.estado==='abandonado'?'warning':c.estado==='pendVal'?'hourglass_top':'phone_iphone'}</span></div><div class="entrev-status-body"><div class="entrev-status-eyebrow">Estado</div><div class="entrev-status-name">${e.l}</div><div class="entrev-status-sub">${c.validador?'Validado por '+c.validador:'En seguimiento'}</div></div><div class="entrev-status-days ${c.estado==='validado'?'ok':(alert?'warn':'')}"><div class="num">${c.dias}</div><div class="lbl">${c.dias===1?'día':'días'}${c.estado!=='validado'&&alert?' · urgente':''}</div></div></div>
    </div>
    <div class="banner info" style="margin-top:6px"><span class="mi">visibility</span><div>El Manager ve el expediente como supervisor / auditor (solo lectura). Sus acciones son intervención excepcional y quedan en log auditable (RR-12).</div></div>
  </div>
  <div class="entrev-dr-foot">
    ${c.estado==='pendVal'?`<button class="btn primary" onclick="entValidar('${c.id}')"><span class="mi">verified</span>Validar y enviar al Pool</button><button class="btn ghost danger" onclick="entRechazar('${c.id}')"><span class="mi">cancel</span>Rechazar</button>`:(c.estado==='abandonado'?`<button class="btn ghost" onclick="entSolicitar('${c.id}')"><span class="mi">campaign</span>Solicitar acción</button>`:`<button class="btn primary" onclick="entSolicitar('${c.id}')"><span class="mi">send</span>Solicitar acción</button>${(c.estado!=='validado')?`<button class="btn ghost" onclick="entAbandonar('${c.id}')"><span class="mi">person_off</span>Marcar abandonado</button>`:''}`)}
  </div>`);
}
function entVerDesempeno(id){const c=CANDIDATOS.find(x=>x.id===id);const f=findRecl(c.recl);if(f){reclMetrics(f[0],f[1]);}else{toast('Sin métricas: entrevista del Manager','info');}}
// RF-23 desde expediente / acciones de supervisión
function entComentar(id){const c=CANDIDATOS.find(x=>x.id===id);openModal(`<div class="modal-h"><h3>Nota interna · ${c.nombre}</h3><div class="x" onclick="closeModal()"><span class="mi">close</span></div></div>
  <div class="modal-b">
    <div class="banner info" style="margin-bottom:14px"><span class="mi">sticky_note_2</span><div>Observación interna sobre el expediente. Queda en el <b>log auditable</b> (RR-12); no se envía como mensaje a nadie.</div></div>
    <div class="field"><label>Nota <span class="req">*</span></label><textarea class="ta" id="cCom" placeholder="Ej. revisar inconsistencia en documentos antes de validar…"></textarea></div></div>
  <div class="modal-f"><button class="btn ghost" onclick="closeModal()">Cancelar</button><button class="btn primary" onclick="(function(){if(document.getElementById('cCom').value.trim().length<3){toast('Escribe la nota','error');return;}closeModal();toast('Nota registrada en el log del expediente','sticky_note_2');})()"><span class="mi">check</span>Guardar nota</button></div>`);}
function entSolicitar(id){const c=CANDIDATOS.find(x=>x.id===id);openModal(`<div class="modal-h"><h3>Solicitar acción · ${c.nombre}</h3><div class="x" onclick="closeModal()"><span class="mi">close</span></div></div>
  <div class="modal-b">
  <div class="banner info" style="margin-bottom:14px"><span class="mi">campaign</span><div>Solicitud estructurada: el sistema <b>notifica</b> a la reclutadora la acción requerida. No es un chat.</div></div>
  <div class="field"><label>Acción solicitada <span class="req">*</span></label><select class="sel" id="sAcc"><option value="">Selecciona…</option><option>Reenviar link de la app</option><option>Llamar al candidato</option><option>Acelerar validación</option><option>Otro</option></select></div>
  <div class="field"><label>Detalle de la solicitud <span class="req">*</span></label><textarea class="ta" id="sMsg" placeholder="Qué se necesita (ej. lleva 8 días, reenviar el link)…"></textarea></div></div>
  <div class="modal-f"><button class="btn ghost" onclick="closeModal()">Cancelar</button><button class="btn primary" onclick="(function(){if(!document.getElementById('sAcc').value){toast('Selecciona una acción','error');return;}if(document.getElementById('sMsg').value.trim().length<3){toast('Indica el detalle de la solicitud','error');return;}closeModal();toast('Solicitud enviada a ${c.recl}','campaign');})()"><span class="mi">check</span>Enviar solicitud</button></div>`);}
function entReasignar(id){const c=CANDIDATOS.find(x=>x.id===id);openModal(`<div class="modal-h"><h3>Reasignar candidato · ${c.nombre}</h3><div class="x" onclick="closeModal()"><span class="mi">close</span></div></div>
  <div class="modal-b"><div class="banner info" style="margin-bottom:14px"><span class="mi">info</span><div>Intervención excepcional (Reclutadora o Líder no disponible, balanceo). Queda en log auditable (RR-12).</div></div>
  <div class="field"><label>Nueva Reclutadora <span class="req">*</span></label><select class="sel" id="rcDest"><option value="">Selecciona…</option>${_allRecl().map(r=>`<option>${r}</option>`).join('')}</select></div>
  <div class="field"><label>Motivo <span class="req">*</span></label><textarea class="ta" id="rcMot" placeholder="Motivo (obligatorio)…"></textarea></div></div>
  <div class="modal-f"><button class="btn ghost" onclick="closeModal()">Cancelar</button><button class="btn primary" onclick="(function(){var v=document.getElementById('rcDest').value;if(!v){toast('Selecciona la Reclutadora','error');return;}if(document.getElementById('rcMot').value.trim().length<5){toast('Indica el motivo','error');return;}var c=CANDIDATOS.find(x=>x.id==='${id}');if(c){c.recl=v;c.lider=reclLider(v);}closeModal();closeDrawer();toast('${c.nombre} reasignado a '+v+' · partes notificadas','swap_horiz');RENDER.Reclutamiento();})()"><span class="mi">check</span>Reasignar</button></div>`);}
function entValidar(id){const c=CANDIDATOS.find(x=>x.id===id);openModal(`<div class="modal-h"><h3>Validar alta (intervención) · ${c.nombre}</h3><div class="x" onclick="closeModal()"><span class="mi">close</span></div></div>
  <div class="modal-b"><div class="banner warn" style="margin-bottom:14px"><span class="mi">gavel</span><div>Validación excepcional del Manager. Normalmente la hace la Reclutadora responsable. Queda en log auditable (RR-12) y el colaborador ingresa al Pool.</div></div>
  <div class="field"><label>Justificación <span class="req">*</span></label><textarea class="ta" id="jVal" placeholder="Motivo de la intervención (obligatorio)…"></textarea></div></div>
  <div class="modal-f"><button class="btn ghost" onclick="closeModal()">Cancelar</button><button class="btn primary" onclick="(function(){if(document.getElementById('jVal').value.trim().length<5){toast('La validación en intervención requiere justificación','error');return;}var c=CANDIDATOS.find(x=>x.id==='${id}');if(c){c.estado='validado';c.fase='val';c.validador='Hugo Marín (Manager)';c.dias=0;}closeModal();closeDrawer();toast('${c.nombre} validado e ingresado al Pool','verified');RENDER.Reclutamiento();})()"><span class="mi">check</span>Validar alta</button></div>`);}
function entRechazar(id){const c=CANDIDATOS.find(x=>x.id===id);openModal(`<div class="modal-h"><h3>Rechazar alta · ${c.nombre}</h3><div class="x" onclick="closeModal()"><span class="mi">close</span></div></div>
  <div class="modal-b"><div class="field"><label>Motivo del rechazo <span class="req">*</span></label><textarea class="ta" id="jRech" placeholder="Motivo (obligatorio)…"></textarea></div></div>
  <div class="modal-f"><button class="btn ghost" onclick="closeModal()">Cancelar</button><button class="btn primary" onclick="(function(){if(document.getElementById('jRech').value.trim().length<5){toast('El rechazo requiere motivo','error');return;}var i=CANDIDATOS.findIndex(x=>x.id==='${id}');if(i>=0)CANDIDATOS.splice(i,1);closeModal();closeDrawer();toast('Alta de ${c.nombre} rechazada · responsable notificado','block');RENDER.Reclutamiento();})()"><span class="mi">block</span>Rechazar alta</button></div>`);}
function entAbandonar(id){const c=CANDIDATOS.find(x=>x.id===id);openModal(`<div class="modal-h"><h3>Marcar como abandonado · ${c.nombre}</h3><div class="x" onclick="closeModal()"><span class="mi">close</span></div></div>
  <div class="modal-b"><div class="banner warn" style="margin-bottom:14px"><span class="mi">person_off</span><div>El candidato se mueve a Abandonados. Normalmente lo marca la Reclutadora; el Manager lo hace de forma excepcional.</div></div>
  <div class="field"><label>Motivo</label><textarea class="ta" id="aMot" placeholder="Motivo (opcional)…"></textarea></div></div>
  <div class="modal-f"><button class="btn ghost" onclick="closeModal()">Cancelar</button><button class="btn primary" onclick="(function(){var c=CANDIDATOS.find(x=>x.id==='${id}');if(c)c.estado='abandonado';closeModal();closeDrawer();toast('${c.nombre} marcado como abandonado','person_off');RENDER.Reclutamiento();})()"><span class="mi">check</span>Marcar abandonado</button></div>`);}

/* ============================ BLACKLIST ============================ */
// El módulo completo vive en blacklist.js (portado del Líder de Grupo) y se monta en #bl-root:
// vistas Tablero/Tarjetas/Tabla, filtros (Zona · Motivo · Vetado por · Periodo con calendario),
// drawer de 5 pestañas y modal multipaso de alta. El Manager consulta y agrega igual que
// cualquier rol de reclutamiento; el veto es permanente y las disputas las resuelve el Inspector.
RENDER.Blacklist=function(){
  document.getElementById('content').innerHTML='<div id="bl-root"></div>';
  if(window.__renderBl) window.__renderBl();
};

/* ============================ MI EQUIPO ============================ */
let _openLider=null;
const TEAM_GRADS=['linear-gradient(135deg,#FF7A00,#C53D1F)','linear-gradient(135deg,#3B82F6,#1D4ED8)','linear-gradient(135deg,#22C55E,#15803D)','linear-gradient(135deg,#A855F7,#7C3AED)','linear-gradient(135deg,#F59E0B,#D97706)','linear-gradient(135deg,#EC4899,#BE185D)'];
RENDER.Equipo=function(){
  const totalRecl=LIDERES.reduce((s,l)=>s+l.recl.length,0);
  const totalEsc=LIDERES.reduce((s,l)=>s+l.esc,0);
  const cobProm=Math.round(LIDERES.reduce((s,l)=>s+l.cob,0)/LIDERES.length);
  document.getElementById('content').innerHTML=`
  <div class="recl-hero">
    <div class="recl-hero-left">
      <div class="eyebrow"><span class="pulse"></span>Supervisión del departamento · RF-29</div>
      <h1>Mi <span class="accent">Equipo</span></h1>
      <div class="lead">Gestiona Líderes de Grupo y sus Reclutadoras: alta, edición, movimiento entre grupos y cambio de estado. Métricas individuales por reclutadora sin importar su Líder (RF-23).</div>
    </div>
    <div class="recl-hero-right">
      <div class="recl-stat"><div class="rs-top"><div class="rs-ic" style="background:rgba(255,142,0,.12);color:var(--o-600)"><span class="mi">badge</span></div></div><div class="rs-val">${LIDERES.length}</div><div class="rs-lbl">Líderes activos</div></div>
      <div class="recl-stat"><div class="rs-top"><div class="rs-ic" style="background:rgba(59,125,221,.12);color:var(--blue)"><span class="mi">groups</span></div></div><div class="rs-val" style="color:var(--blue)">${totalRecl}</div><div class="rs-lbl">Reclutadoras</div></div>
      <div class="recl-stat"><div class="rs-top"><div class="rs-ic" style="background:rgba(31,168,74,.12);color:#1F8F50"><span class="mi">donut_large</span></div></div><div class="rs-val" style="color:#1F8F50">${cobProm}%</div><div class="rs-lbl">Cobertura promedio</div></div>
      <div class="recl-stat"><div class="rs-top"><div class="rs-ic" style="background:rgba(225,25,25,.1);color:var(--red)"><span class="mi">report_problem</span></div></div><div class="rs-val" style="color:var(--red)">${totalEsc}</div><div class="rs-lbl">Casos escalados</div></div>
    </div>
  </div>
  <div class="recl-board-title">
    <div style="display:flex;align-items:center;gap:10px"><span class="recl-board-ic"><span class="mi">account_tree</span></span><h3>Líderes de Grupo</h3><span class="recl-board-sub">${LIDERES.length} líderes · ${totalRecl} reclutadoras</span></div>
    <div style="display:flex;gap:8px"><button class="btn ghost" onclick="teamNuevo('recl')"><span class="mi">person_add</span>Nueva Reclutadora</button><button class="btn primary" onclick="teamNuevo('lider')"><span class="mi">badge</span>Nuevo Líder</button></div>
  </div>
  <div class="team-list" id="teamBody">${teamRows()}</div>`;
};
function teamRows(){
  return LIDERES.map((l,li)=>{
    const open=_openLider===li, cc=cobColor(l.cob), grad=TEAM_GRADS[li%TEAM_GRADS.length];
    const recls=l.recl.map((r,ri)=>{
      const rcc=cobColor(r.cob);
      return `<div class="team-recl">
        <div class="team-recl-av">${r.ini}</div>
        <div class="team-recl-id"><div class="nm">${r.nombre}</div><div class="sub"><span class="mi">place</span>${r.zona}${r.alerta?` · <span class="team-alert"><span class="mi">warning</span>${r.alerta}</span>`:''}</div></div>
        <div class="team-recl-metric"><div class="v" style="color:${rcc}">${r.cob}%</div><div class="k">cobertura</div></div>
        <div class="team-recl-metric"><div class="v">${r.tiempo}</div><div class="k">asignación</div></div>
        <div class="team-recl-metric"><div class="v" style="color:${r.esc?'var(--red)':'var(--ink-2)'}">${r.esc}</div><div class="k">escalados</div></div>
        <div class="team-recl-actions">
          <button class="btn ghost sm" onclick="event.stopPropagation();reclMetrics(${li},${ri})"><span class="mi">analytics</span>Métricas</button>
          <button class="btn ghost sm" onclick="event.stopPropagation();teamMover('${r.nombre}')"><span class="mi">swap_horiz</span>Mover</button>
        </div>
      </div>`;
    }).join('');
    return `<div class="team-card${open?' open':''}">
      <div class="team-head" onclick="teamToggle(${li})">
        <div class="team-av" style="background:${grad}">${l.ini}</div>
        <div class="team-id">
          <div class="nm">${l.nombre}<span class="team-estado ${l.estado==='Activo'?'on':'off'}">${l.estado}</span></div>
          <div class="sub">${l.grupo}</div>
        </div>
        <div class="team-meta">
          <span class="meta-pill zone"><span class="mi">place</span>${l.zona}</span>
          <span class="meta-pill"><span class="mi">groups</span>${l.recl.length} reclutadora${l.recl.length===1?'':'s'}</span>
          <span class="meta-pill${l.esc?' team-esc':''}"><span class="mi">report_problem</span>${l.esc} escalado${l.esc===1?'':'s'}</span>
        </div>
        <div class="team-cob">
          <div class="team-cob-top"><span class="team-cob-val" style="color:${cc}">${l.cob}%</span><span class="team-cob-lbl">cobertura</span></div>
          ${bar(l.cob,cc)}
        </div>
        <span class="team-chev mi">${open?'expand_less':'expand_more'}</span>
      </div>
      ${open?`<div class="team-body">
        <div class="team-body-h"><span class="mi">groups</span>Reclutadoras del grupo<span class="team-body-count">${l.recl.length}</span></div>
        <div class="team-recls">${recls}</div>
        <div class="team-foot">
          <button class="btn ghost sm" onclick="teamEditar('${l.nombre}')"><span class="mi">edit</span>Editar Líder</button>
          <button class="btn ghost sm" onclick="teamEstado('${l.nombre}')"><span class="mi">toggle_on</span>Cambiar estado</button>
        </div>
      </div>`:''}
    </div>`;
  }).join('');
}
function teamToggle(li){_openLider=_openLider===li?null:li;document.getElementById('teamBody').innerHTML=teamRows();}
// RF-23
function reclMetrics(li,ri){const r=LIDERES[li].recl[ri];openDrawer(`
  <div class="drawer-h"><div><h3>${r.nombre}</h3><div style="font-size:12.5px;color:var(--ink-3);margin-top:3px">Reclutadora · ${r.zona} · Líder ${LIDERES[li].nombre}</div></div><div class="x" onclick="closeDrawer()"><span class="mi">close</span></div></div>
  <div class="drawer-b">
    <div class="banner info" style="margin-bottom:14px"><span class="mi">analytics</span><div>Métricas individuales (RF-23). El Manager ve a cualquier reclutadora sin importar su Líder.</div></div>
    <div class="grid g2" style="margin-bottom:8px">
      <div class="kpi"><div class="kh"><div class="ki" style="background:rgba(31,168,74,.12);color:var(--green)"><span class="mi">donut_large</span></div></div><div class="val" style="color:${cobColor(r.cob)}">${r.cob}<span class="suf">%</span></div><div class="lbl">Cobertura del mes</div></div>
      <div class="kpi"><div class="kh"><div class="ki" style="background:var(--o-50);color:var(--o-600)"><span class="mi">timer</span></div></div><div class="val">${r.tiempo}</div><div class="lbl">Tiempo prom. asignación</div></div>
    </div>
    <div class="irow"><span class="k">Casos escalados</span><span class="v">${r.esc}</span></div>
    <div class="irow"><span class="k">Requisiciones cubiertas</span><span class="v">18</span></div>
    <div class="irow"><span class="k">Parciales</span><span class="v">3</span></div>
  </div>
  <div class="drawer-f"><button class="btn ghost" onclick="toast('Exportando métricas…','download')"><span class="mi">download</span>Exportar</button><button class="btn ghost" onclick="toast('Enviado al Líder ${LIDERES[li].nombre}','send')"><span class="mi">send</span>Enviar al Líder</button></div>`);}
function teamNuevo(tipo){const lider=tipo==='lider';openModal(`<div class="modal-h"><h3>${lider?'Alta de Líder de Grupo':'Alta de Reclutadora'}</h3><div class="x" onclick="closeModal()"><span class="mi">close</span></div></div>
  <div class="modal-b">
  <div class="grid g2"><div class="field"><label>Nombre completo <span class="req">*</span></label><input class="inp" id="nNom"></div><div class="field"><label>Documento <span class="req">*</span></label><input class="inp" id="nDoc"></div></div>
  <div class="grid g2"><div class="field"><label>Correo <span class="req">*</span></label><input class="inp" id="nMail" type="email"><div class="hint">Demo: usa juanita.lopez@oranje.com para ver la validación de duplicado.</div></div><div class="field"><label>Teléfono <span class="req">*</span></label><input class="inp" id="nTel"></div></div>
  <div class="grid g2"><div class="field"><label>Zona <span class="req">*</span></label><select class="sel" id="nZona">${ZONAS.map(z=>`<option>${z.z}</option>`).join('')}</select></div>
  ${lider?`<div class="field"><label>Nombre del grupo <span class="req">*</span></label><input class="inp" id="nGrupo"></div>`:`<div class="field"><label>Líder de Grupo <span class="req">*</span></label><select class="sel" id="nLider"><option value="">Selecciona…</option>${LIDERES.map(l=>`<option>${l.nombre}</option>`).join('')}</select></div>`}</div></div>
  <div class="modal-f"><button class="btn ghost" onclick="closeModal()">Cancelar</button><button class="btn primary" onclick="(function(){var nom=document.getElementById('nNom').value.trim();var mail=document.getElementById('nMail').value.trim().toLowerCase();if(!nom||!mail){toast('Completa los campos obligatorios','error');return;}if(REG_EMAILS.has(mail)){toast('Ya existe un usuario con ese correo','error');return;}${lider?'':"if(!document.getElementById('nLider').value){toast('Debe asignar un Líder','error');return;}"}REG_EMAILS.add(mail);closeModal();toast('${lider?'Líder':'Reclutadora'} creada · credenciales enviadas por correo','badge');})()"><span class="mi">check</span>Crear</button></div>`);}
function teamEditar(n){openModal(`<div class="modal-h"><h3>Editar · ${n}</h3><div class="x" onclick="closeModal()"><span class="mi">close</span></div></div><div class="modal-b"><div class="banner info" style="margin-bottom:14px"><span class="mi">info</span><div>Puedes editar rol, zona y grupo. No puedes editar tu propio rol.</div></div><div class="field"><label>Zona</label><select class="sel">${ZONAS.map(z=>`<option>${z.z}</option>`).join('')}</select></div></div><div class="modal-f"><button class="btn ghost" onclick="closeModal()">Cancelar</button><button class="btn primary" onclick="closeModal();toast('${n} actualizado','check')"><span class="mi">save</span>Guardar</button></div>`);}
function teamMover(n){openModal(`<div class="modal-h"><h3>Mover a otro Líder · ${n}</h3><div class="x" onclick="closeModal()"><span class="mi">close</span></div></div><div class="modal-b"><div class="field"><label>Líder destino <span class="req">*</span></label><select class="sel" id="mLider"><option value="">Selecciona…</option>${LIDERES.map(l=>`<option>${l.nombre}</option>`).join('')}</select></div><div class="field"><label>Motivo <span class="req">*</span></label><textarea class="ta" id="mMot" placeholder="Motivo (obligatorio)…"></textarea></div></div><div class="modal-f"><button class="btn ghost" onclick="closeModal()">Cancelar</button><button class="btn primary" onclick="(function(){if(!document.getElementById('mLider').value){toast('Selecciona el Líder destino','error');return;}if(document.getElementById('mMot').value.trim().length<5){toast('Indica el motivo','error');return;}closeModal();toast('${n} movida de grupo · ambos Líderes notificados','swap_horiz');})()"><span class="mi">check</span>Mover</button></div>`);}
function teamEstado(n){const li=LIDERES.find(l=>l.nombre===n);const reclN=li?li.recl.length:0;openModal(`<div class="modal-h"><h3>Cambiar estado · ${n}</h3><div class="x" onclick="closeModal()"><span class="mi">close</span></div></div><div class="modal-b"><div class="field"><label>Estado <span class="req">*</span></label><select class="sel" id="eEstado"><option>Activo</option><option>Inactivo</option><option>Vacaciones</option><option>Baja</option></select></div><div class="field"><label>Motivo</label><textarea class="ta" placeholder="Motivo…"></textarea></div>${reclN>0?`<div class="banner warn" style="margin-top:4px"><span class="mi">info</span><div>Este Líder tiene ${reclN} reclutadora(s) activa(s). Para darlo de baja, reasigna primero su grupo.</div></div>`:''}</div><div class="modal-f"><button class="btn ghost" onclick="closeModal()">Cancelar</button><button class="btn primary" onclick="(function(){var st=document.getElementById('eEstado').value;if(st==='Baja'&&${reclN}>0){toast('Reasigna primero las reclutadoras de este Líder','error');return;}closeModal();toast('Estado de ${n} actualizado','toggle_on');})()"><span class="mi">check</span>Aplicar</button></div>`);}

/* ============================ INCIDENCIAS ============================ */
let _incF={prio:'',estado:'',origen:'',zona:'',q:''},_incDD=null,_incView='board';
const INC_PRIO={crit:{lbl:'Crítica',c:'#E11919'},alta:{lbl:'Alta',c:'#FF7A00'},media:{lbl:'Media',c:'#E6B422'},baja:{lbl:'Baja',c:'#1FA84A'}};
function incIcon(t){if(/SLA/i.test(t))return'timer';if(/cobertura|comercial/i.test(t))return'storefront';if(/conflicto/i.test(t))return'gavel';if(/sobrecarga/i.test(t))return'groups';return'report_problem';}
function incOrigenKind(o){if(/^Líder/i.test(o))return'Líder';if(/Inspector/i.test(o))return'Inspector';if(/Sistema/i.test(o))return'Sistema';return o;}
function incEstadoColor(e){const s=INC_STATES.find(x=>x.key===e);return s?s.c:'#8B8178';}
function incOrigenCell(o){
  const k=incOrigenKind(o);
  if(k==='Líder'){const n=(o.split('·')[1]||'').trim()||o;const ini=n.split(' ').map(x=>x[0]).slice(0,2).join('');return `<div class="inc-origin"><div class="inc-origin-av lider">${ini}</div><div class="inc-origin-txt"><div class="nm">${n}</div><div class="rl">Líder de Grupo</div></div></div>`;}
  if(k==='Inspector')return `<div class="inc-origin"><div class="inc-origin-av role insp"><span class="mi">verified_user</span></div><div class="inc-origin-txt"><div class="nm">Inspector</div><div class="rl">Inspector de zona</div></div></div>`;
  if(k==='Sistema')return `<div class="inc-origin"><div class="inc-origin-av role sys"><span class="mi">bolt</span></div><div class="inc-origin-txt"><div class="nm">Sistema</div><div class="rl">Escalamiento automático</div></div></div>`;
  return `<div class="inc-origin"><div class="inc-origin-av role"><span class="mi">flag</span></div><div class="inc-origin-txt"><div class="nm">${o}</div></div></div>`;
}
function incList(){return INC.filter(c=>(!_incF.prio||c.prio===_incF.prio)&&(!_incF.estado||c.estado===_incF.estado)&&(!_incF.origen||incOrigenKind(c.origen)===_incF.origen)&&(!_incF.zona||c.zona===_incF.zona)&&(!_incF.q||(c.id+' '+c.tipo+' '+c.origen+' '+c.zona).toLowerCase().includes(_incF.q.toLowerCase())));}
function incRows(list){
  if(!list.length)return `<tr><td colspan="7"><div class="req-empty"><span class="mi">inbox</span><h3>Sin incidencias que coincidan</h3><p>Ajusta los filtros o limpia la búsqueda.</p></div></td></tr>`;
  return list.map(c=>{const i=INC.indexOf(c);const p=INC_PRIO[c.prio]||INC_PRIO.media;return `<tr class="inc-row" onclick="incDrawer(${i})">
    <td><div class="inc-case"><span class="inc-case-ic" style="--pc:${p.c}"><span class="mi">${incIcon(c.tipo)}</span></span><div><div class="inc-id">${c.id}</div><div class="inc-tipo">${c.tipo}</div></div></div></td>
    <td>${incOrigenCell(c.origen)}</td>
    <td><span class="meta-pill zone"><span class="mi">place</span>${c.zona}</span></td>
    <td><span class="inc-prio" style="--pc:${p.c}"><span class="dot"></span>${p.lbl}</span></td>
    <td><span class="inc-estado" style="--ec:${incEstadoColor(c.estado)}"><span class="dot"></span>${c.estado}</span></td>
    <td><span class="inc-date"><span class="mi">event</span>${c.fecha}</span></td>
    <td class="inc-chev-td"><span class="mi inc-chev">chevron_right</span></td>
  </tr>`;}).join('');
}
function incCard(c){
  const i=INC.indexOf(c),p=INC_PRIO[c.prio]||INC_PRIO.media,st=INC_STATES.find(s=>s.key===c.estado)||INC_STATES[0];
  return `<div class="recl-card inc-card" style="--card-st:${st.c}" onclick="incDrawer(${i})">
    <div class="inc-card-top">
      <span class="inc-case-ic" style="--pc:${p.c}"><span class="mi">${incIcon(c.tipo)}</span></span>
      <div class="inc-card-id"><div class="id">${c.id}</div><div class="tp">${c.tipo}</div></div>
      <span class="inc-prio" style="--pc:${p.c}"><span class="dot"></span>${p.lbl}</span>
    </div>
    <div class="inc-card-org">${incOrigenCell(c.origen)}</div>
    <div class="inc-card-foot"><span class="meta-pill zone"><span class="mi">place</span>${c.zona}</span><span class="inc-date"><span class="mi">event</span>${c.fecha}</span></div>
  </div>`;
}
function incBoard(list){
  return `<div class="recl-board inc-board">${INC_STATES.map(s=>{
    const col=list.filter(c=>c.estado===s.key);
    return `<div class="recl-col inc-col">
      <div class="recl-col-head">
        <span class="recl-col-dot" style="background:${s.c}"></span>
        <div class="recl-col-name">${s.key}<span class="sub-st">${s.sub}</span></div>
        <span class="recl-col-count">${col.length.toString().padStart(2,'0')}</span>
      </div>
      <div class="inc-col-cards">${col.length?col.map(incCard).join(''):`<div class="recl-col-empty"><span class="mi">${s.ic}</span><span class="e-txt">Sin casos</span></div>`}</div>
    </div>`;
  }).join('')}</div>`;
}
function incContentHTML(){
  const list=incList();
  const title=`<div class="recl-board-title"><div style="display:flex;align-items:center;gap:10px"><span class="recl-board-ic"><span class="mi">report_problem</span></span><h3>Casos escalados</h3></div><span class="recl-board-sub">${list.length} caso${list.length===1?'':'s'}</span></div>`;
  const body=_incView==='board'?incBoard(list):`<div class="req-table-wrap"><table class="req-table req-table-rich inc-table"><thead><tr><th style="width:26%">Caso</th><th>Origen</th><th>Zona</th><th>Prioridad</th><th>Estado</th><th>Fecha</th><th></th></tr></thead><tbody id="incTbody">${incRows(list)}</tbody></table></div>`;
  return title+body;
}
const _INC_FILTERS=()=>[
  {key:'prio',lbl:'Prioridad',opts:[['','Todas'],['crit','Crítica'],['alta','Alta'],['media','Media'],['baja','Baja']],dot:{crit:'#E11919',alta:'#FF7A00',media:'#E6B422',baja:'#1FA84A'}},
  {key:'estado',lbl:'Estado',opts:[['','Todos'],...[...new Set(INC.map(c=>c.estado))].map(e=>[e,e])]},
  {key:'origen',lbl:'Origen',opts:[['','Todos'],['Líder','Líder de Grupo'],['Inspector','Inspector'],['Sistema','Sistema']]},
  {key:'zona',lbl:'Zona',opts:[['','Todas'],...[...new Set(INC.map(c=>c.zona))].map(z=>[z,z])]},
];
RENDER.Incidencias=function(){
  const abiertos=INC.filter(c=>!/Resuelt/i.test(c.estado)).length;
  const investig=INC.filter(c=>c.estado==='En investigación').length;
  const comercial=INC.filter(c=>/comercial/i.test(c.estado)).length;
  const sla=INC.filter(c=>/SLA/i.test(c.tipo)).length;
  const cfg=_INC_FILTERS();
  const hasAny=cfg.some(c=>_incF[c.key])||_incF.q;
  const list=incList();
  document.getElementById('content').innerHTML=`
  <div class="recl-hero">
    <div class="recl-hero-left">
      <div class="eyebrow"><span class="pulse"></span>Supervisión · Decisión final del Manager</div>
      <h1>Incidencias <span class="accent">del departamento</span></h1>
      <div class="lead">Casos escalados desde Líderes, Inspectores y el sistema. El Manager los recibe, investiga y decide: resolver (RF-30), escalar a comercial (RF-31) o escalar a Dirección.</div>
    </div>
    <div class="recl-hero-right">
      <div class="recl-stat${!hasAny?' active':''}" onclick="incClear()"><div class="rs-top"><div class="rs-ic" style="background:rgba(255,142,0,.12);color:var(--o-600)"><span class="mi">report_problem</span></div></div><div class="rs-val">${abiertos}</div><div class="rs-lbl">Casos abiertos</div></div>
      <div class="recl-stat${_incF.estado==='En investigación'?' active':''}" onclick="incStat('estado','En investigación')"><div class="rs-top"><div class="rs-ic" style="background:rgba(59,125,221,.12);color:var(--blue)"><span class="mi">search</span></div></div><div class="rs-val" style="color:var(--blue)">${investig}</div><div class="rs-lbl">En investigación</div></div>
      <div class="recl-stat${_incF.estado==='Escalado a comercial'?' active':''}" onclick="incStat('estado','Escalado a comercial')"><div class="rs-top"><div class="rs-ic" style="background:rgba(123,44,191,.12);color:var(--purple)"><span class="mi">north_east</span></div></div><div class="rs-val" style="color:var(--purple)">${comercial}</div><div class="rs-lbl">Escalados a comercial</div></div>
      <div class="recl-stat${_incF.q==='SLA'?' active':''}" onclick="incStat('q','SLA')"><div class="rs-top"><div class="rs-ic" style="background:rgba(225,25,25,.1);color:var(--red)"><span class="mi">timer</span></div></div><div class="rs-val" style="color:var(--red)">${sla}</div><div class="rs-lbl">SLA en riesgo</div></div>
    </div>
  </div>
  <div class="recl-toolbar"><div class="recl-search" style="width:380px"><span class="mi">search</span><input id="incSearchInput" placeholder="Buscar por ID, tipo, origen o zona…" oninput="incSearch(this.value)" value="${escR(_incF.q)}"><span class="kbd">⌘F</span></div></div>
  <div class="recl-filters"><div class="recl-filters-left">${reclChips(cfg,_incF,'incToggleDD','incPick',_incDD)}${reclClear(cfg,_incF,'incClear')}</div>
    <div class="recl-filters-right"><div class="recl-segmented recl-segmented-inline">
      <button class="${_incView==='board'?'active':''}" onclick="incSetView('board')"><span class="mi">view_kanban</span>Tablero</button>
      <button class="${_incView==='table'?'active':''}" onclick="incSetView('table')"><span class="mi">table_rows</span>Tabla</button>
    </div></div></div>
  <div id="incContent">${incContentHTML()}</div>`;
  incSyncBadge();
};
function incToggleDD(k){_incDD=_incDD===k?null:k;RENDER.Incidencias();}
function incPick(k,v){_incF[k]=v;_incDD=null;RENDER.Incidencias();}
function incClear(){_incF={prio:'',estado:'',origen:'',zona:'',q:''};_incDD=null;RENDER.Incidencias();}
function incStat(k,v){_incF={prio:'',estado:'',origen:'',zona:'',q:''};_incF[k]=v;_incDD=null;RENDER.Incidencias();}
function incSetView(v){_incView=v;RENDER.Incidencias();}
function incSearch(v){_incF.q=v;const c=document.getElementById('incContent');if(c)c.innerHTML=incContentHTML();}
function incSyncBadge(){const el=document.querySelector('.sb-item[data-page="Incidencias"] .count');if(el)el.textContent=String(INC.length).padStart(2,'0');}
function incDrawer(i){
  const c=INC[i];const p=INC_PRIO[c.prio]||INC_PRIO.media;const st=c.estado;
  const inv=incInvolucrados(c);
  // Banner según estado (flujo RF-30/RF-31)
  const BAN={
    'Abierto':['info','bolt','<strong>Recién escalado.</strong> La incidencia llegó al Manager en menos de 1 min. Pulsa <strong>Investigar caso</strong> para revisar evidencia, involucrados e historial antes de decidir (RF-30).'],
    'En investigación':['warn','search','<strong>En investigación.</strong> Revisa la evidencia y decide: Resolver, Escalar a comercial (RF-31) o Solicitar más información. Toda decisión exige comentario y queda en log auditable.'],
    'Esperando info':['warn','hourglass_top','<strong>Esperando información.</strong> Solicitaste más datos a las partes; el caso sigue abierto a la espera de respuesta.'],
    'Escalado a comercial':['info','north_east','<strong>Escalado a comercial (RF-31).</strong> El BD/BDC del hotel fue notificado con el caso. Puedes resolver o escalar a Dirección.'],
    'Escalado a Dirección':['info','arrow_upward','<strong>Escalado a Dirección.</strong> El caso completo fue enviado al Director; queda registro.'],
  }[st]||['info','info',''];
  // Timeline
  const tl=[{tt:`Escalado por ${/^Líder/i.test(c.origen)?c.origen.replace('Líder · ','Líder ')+'':(/Inspector/i.test(c.origen)?'Inspector de zona':'Sistema (automático)')}`,ts:`${c.fecha} · ${c.zona}`}];
  tl.push({tt:'Asignado al Manager',ts:'Hace < 1 min · automático (RF-30)'});
  if(st!=='Abierto')tl.push({tt:'Investigación iniciada',ts:'El Manager revisa evidencia e involucrados'});
  if(st==='Esperando info')tl.push({tt:'Solicitó más información',ts:'A la espera de respuesta de las partes'});
  if(st==='Escalado a comercial')tl.push({tt:'Escalado a comercial · BD/BDC notificado',ts:'RF-31 · queda en log auditable'});
  if(st==='Escalado a Dirección')tl.push({tt:'Escalado a Dirección',ts:'Caso completo enviado al Director'});
  // Evidencia (origen distinto → set distinto)
  const files=/Inspector/i.test(c.origen)?[['investigacion_inspector.pdf','420 KB'],['acta_de_visita.pdf','180 KB'],['fotos_hotel.zip','1.4 MB']]
    :/Sistema/i.test(c.origen)?[['reporte_sistema.pdf','96 KB'],['log_alertas.csv','42 KB']]
    :[['reporte_lider.pdf','310 KB'],['capturas_turno.zip','1.1 MB']];
  // Footer según estado
  let footer;
  if(st==='Abierto') footer=`<button class="btn primary" onclick="incInvestigar(${i})"><span class="mi">search</span>Investigar caso</button>`;
  else if(st==='En investigación'||st==='Esperando info') footer=`<button class="btn primary" onclick="incResolver(${i})"><span class="mi">gavel</span>Resolver</button><button class="btn ghost" onclick="incEscalarComercial(${i})"><span class="mi">north_east</span>Escalar a comercial</button><button class="btn ghost" onclick="incEscalarDir(${i})"><span class="mi">arrow_upward</span>Escalar a Dirección</button>`;
  else if(st==='Escalado a comercial') footer=`<button class="btn primary" onclick="incResolver(${i})"><span class="mi">gavel</span>Resolver</button><button class="btn ghost" onclick="incEscalarDir(${i})"><span class="mi">arrow_upward</span>Escalar a Dirección</button>`;
  else footer=`<button class="btn primary" onclick="incResolver(${i})"><span class="mi">gavel</span>Resolver</button>`;
  openDrawer(`<div class="req-drawer">
  <div class="req-drawer-h drawer-h"><div>
    <div class="req-drawer-pills" style="display:flex;gap:6px;flex-wrap:wrap"><span class="inc-prio" style="--pc:${p.c}"><span class="dot"></span>${p.lbl}</span><span class="inc-estado" style="--ec:${incEstadoColor(st)}"><span class="dot"></span>${st}</span></div>
    <h3 style="margin-top:8px">${c.id} · ${c.tipo}</h3>
    <div style="font-size:12.5px;color:var(--ink-3);margin-top:3px"><span class="mi" style="font-size:14px;vertical-align:-2px">place</span>${c.zona}${c.hotel?' · '+c.hotel:''} · ${c.fecha}</div>
  </div><div class="x" onclick="closeDrawer()"><span class="mi">close</span></div></div>
  <div class="drawer-tabs"><div class="drawer-tab active" onclick="drawerTab(this,'det')">Detalle</div><div class="drawer-tab" onclick="drawerTab(this,'ev')">Evidencia</div><div class="drawer-tab" onclick="drawerTab(this,'inv')">Involucrados</div><div class="drawer-tab" onclick="drawerTab(this,'his')">Historial</div></div>
  <div class="drawer-b">
    <div data-pane="det">
      ${BAN[2]?`<div class="banner ${BAN[0]}" style="margin-bottom:14px"><span class="mi">${BAN[1]}</span><div>${BAN[2]}</div></div>`:''}
      <div class="sec-title">Descripción del caso</div>
      <div class="inc-desc">${c.desc}</div>
      <div class="irow"><span class="k">Tipo</span><span class="v">${c.tipo}</span></div>
      <div class="irow"><span class="k">Origen</span><span class="v">${c.origen}</span></div>
      <div class="irow"><span class="k">Zona</span><span class="v">${c.zona}</span></div>
      ${c.hotel?`<div class="irow"><span class="k">Hotel afectado</span><span class="v">${c.hotel}</span></div>`:''}
      <div class="irow"><span class="k">Prioridad</span><span class="v"><span class="inc-prio" style="--pc:${p.c}"><span class="dot"></span>${p.lbl}</span></span></div>
      <div class="irow"><span class="k">Estado</span><span class="v"><span class="inc-estado" style="--ec:${incEstadoColor(st)}"><span class="dot"></span>${st}</span></span></div>
    </div>
    <div data-pane="ev" style="display:none">
      <div class="banner info" style="margin-bottom:12px"><span class="mi">attach_file</span><div>Evidencia del caso. El Manager la revisa al investigar y la adjunta si escala a comercial (RF-31).</div></div>
      <div class="entrev-rej-files">${files.map(f=>`<div class="entrev-rej-file"><span class="fic"><span class="mi">description</span></span><span class="nm">${f[0]}</span><span class="sz">${f[1]}</span></div>`).join('')}</div>
    </div>
    <div data-pane="inv" style="display:none">
      <div class="banner info" style="margin-bottom:12px"><span class="mi">groups</span><div>Partes involucradas. El cierre del caso las notifica a todas (RF-30).</div></div>
      ${inv.length?inv.map(x=>`<div class="inc-inv"><div class="inc-inv-av ${x.kind}">${x.ini?x.ini:`<span class="mi">${x.ic}</span>`}</div><div class="inc-inv-txt"><div class="nm">${x.nombre}</div><div class="rl">${x.sub}</div></div><span class="inc-inv-rol">${x.rol}</span></div>`).join(''):'<div class="empty"><span class="mi">person_off</span><div class="et">Sin involucrados registrados</div></div>'}
    </div>
    <div data-pane="his" style="display:none"><div class="tl">${tl.map(t=>`<div class="tl-item"><div class="tt">${t.tt}</div><div class="ts">${t.ts}</div></div>`).join('')}</div></div>
  </div>
  <div class="drawer-f">${footer}</div></div>`);}
function incInvestigar(i){const c=INC[i];if(c.estado==='Abierto'){c.estado='En investigación';toast(`${c.id} · investigación iniciada`,'search');RENDER.Incidencias();incDrawer(i);}}
// RF-30
function incResolver(i){const c=INC[i];openModal(`<div class="modal-h"><h3>Resolver · ${c.id}</h3><div class="x" onclick="closeModal()"><span class="mi">close</span></div></div>
  <div class="modal-b"><div class="field"><label>Decisión <span class="req">*</span></label><select class="sel" id="iDec"><option value="">Selecciona…</option><option>Resolver caso</option><option>Escalar a comercial</option><option>Solicitar más información</option></select></div>
  <div class="field"><label>Comentario <span class="req">*</span></label><textarea class="ta" id="iCom" placeholder="Resolución / instrucciones (obligatorio)…"></textarea></div></div>
  <div class="modal-f"><button class="btn ghost" onclick="closeModal()">Cancelar</button><button class="btn primary" onclick="(function(){var d=document.getElementById('iDec').value;if(!d){toast('Selecciona una decisión','error');return;}if(document.getElementById('iCom').value.trim().length<5){toast('El comentario es obligatorio','error');return;}if(d==='Resolver caso'){INC.splice(${i},1);}else{INC[${i}].estado=d.indexOf('comercial')>=0?'Escalado a comercial':'Esperando info';}closeModal();closeDrawer();toast('${c.id}: '+d,'gavel');RENDER.Incidencias();})()"><span class="mi">check</span>Aplicar</button></div>`);}
// RF-31
function incEscalarComercial(i){const c=INC[i];openModal(`<div class="modal-h"><h3>Escalar a comercial · ${c.id}</h3><div class="x" onclick="closeModal()"><span class="mi">close</span></div></div>
  <div class="modal-b"><div class="field"><label>Destinatario (BD / BDC) <span class="req">*</span></label><select class="sel" id="eDest"><option value="">Selecciona…</option><option>Business Developer · Zona ${c.zona}</option><option>Business Developer Coordinator</option></select></div>
  <div class="field"><label>Contexto <span class="req">*</span></label><textarea class="ta" id="eCtx" placeholder="Contexto del escalamiento…"></textarea></div>
  <div class="field"><label>Evidencia</label><div class="upload" onclick="toast('Selector de archivos (demo)','image')"><span class="mi" style="font-size:24px">attach_file</span><div style="margin-top:4px;font-weight:600;font-size:13px">Adjuntar evidencia</div></div></div></div>
  <div class="modal-f"><button class="btn ghost" onclick="closeModal()">Cancelar</button><button class="btn primary" onclick="(function(){if(!document.getElementById('eDest').value){toast('Selecciona el destinatario','error');return;}if(document.getElementById('eCtx').value.trim().length<5){toast('Indica el contexto','error');return;}INC[${i}].estado='Escalado a comercial';closeModal();closeDrawer();toast('${c.id} escalado a comercial · BD/BDC notificado','north_east');RENDER.Incidencias();})()"><span class="mi">check</span>Escalar</button></div>`);}
function incEscalarDir(i){const c=INC[i];openModal(`<div class="modal-h"><h3>Escalar a Dirección · ${c.id}</h3><div class="x" onclick="closeModal()"><span class="mi">close</span></div></div>
  <div class="modal-b"><div class="field"><label>Resumen / contexto <span class="req">*</span></label><textarea class="ta" id="eDir" placeholder="Resumen del caso para Dirección (obligatorio)…"></textarea></div></div>
  <div class="modal-f"><button class="btn ghost" onclick="closeModal()">Cancelar</button><button class="btn primary" onclick="(function(){if(document.getElementById('eDir').value.trim().length<10){toast('Dirección requiere un resumen','error');return;}INC[${i}].estado='Escalado a Dirección';closeModal();closeDrawer();toast('${c.id} escalado a Dirección','arrow_upward');RENDER.Incidencias();})()"><span class="mi">check</span>Escalar</button></div>`);}

/* ============================ REPORTES ============================ */
const RP_TYPES=['Cobertura global','Comparativa de Líderes','Comparativa de zonas','Tiempos de asignación','Casos escalados'];
let RP_REC=LIDERES.map((l,i)=>({lider:l.nombre,ini:l.ini,grupo:l.grupo,zona:l.zona,cob:l.cob,esc:l.esc,recl:l.recl.length,fecha:['Hace 2 h','Ayer','Hace 2 d','Hace 3 d'][i%4],leido:i>1}));
let RP_PROG=[
  {tipo:'Cobertura global',frec:'Semanal',cuando:'Lunes 08:00',dest:'Mi supervisión',fmt:'PDF'},
  {tipo:'Comparativa de Líderes',frec:'Mensual',cuando:'Día 1 · 09:00',dest:'Mi supervisión',fmt:'Excel'},
];
let _rp={tipo:0,fmt:'PDF',zonas:[],lideres:[],dest:'Mi supervisión'};
function rpZonaChipsHTML(){return `<span class="rp-chip ${_rp.zonas.length===0?'on':''}" onclick="rpZonaTog('')">Todas</span>`+ZONAS.map(z=>`<span class="rp-chip ${_rp.zonas.includes(z.z)?'on':''}" onclick="rpZonaTog('${escR(z.z)}')">${escR(z.z)}</span>`).join('');}
function rpLiderChipsHTML(){return `<span class="rp-chip ${_rp.lideres.length===0?'on':''}" onclick="rpLiderTog('')">Todos</span>`+LIDERES.map(l=>`<span class="rp-chip ${_rp.lideres.includes(l.nombre)?'on':''}" onclick="rpLiderTog('${escR(l.nombre)}')">${escR(l.nombre)}</span>`).join('');}
function rpZonaTog(z){if(!z){_rp.zonas=[];}else{const k=_rp.zonas.indexOf(z);k>=0?_rp.zonas.splice(k,1):_rp.zonas.push(z);}const c=document.getElementById('rpZonaChips');if(c)c.innerHTML=rpZonaChipsHTML();}
function rpLiderTog(n){if(!n){_rp.lideres=[];}else{const k=_rp.lideres.indexOf(n);k>=0?_rp.lideres.splice(k,1):_rp.lideres.push(n);}const c=document.getElementById('rpLiderChips');if(c)c.innerHTML=rpLiderChipsHTML();}
function rpFmt(f){_rp.fmt=f;document.querySelectorAll('.rp-fmt .tab').forEach(t=>t.classList.toggle('active',t.textContent.trim()===f));}
RENDER.Reportes=function(){
  const noLeidos=RP_REC.filter(r=>!r.leido).length;
  const cobProm=Math.round(LIDERES.reduce((s,l)=>s+l.cob,0)/LIDERES.length);
  document.getElementById('content').innerHTML=`
  <div class="recl-hero">
    <div class="recl-hero-left">
      <div class="eyebrow"><span class="pulse"></span>Reportes del departamento · RF-24</div>
      <h1>Reportes <span class="accent">y analítica</span></h1>
      <div class="lead">Revisa los reportes que envían los Líderes de Grupo y genera reportes globales de tu departamento para tu seguimiento y supervisión —cobertura, comparativas, tiempos y casos escalados— con vista previa y envío recurrente.</div>
    </div>
    <div class="recl-hero-right">
      <div class="recl-stat"><div class="rs-top"><div class="rs-ic" style="background:rgba(255,142,0,.12);color:var(--o-600)"><span class="mi">inbox</span></div></div><div class="rs-val">${RP_REC.length}</div><div class="rs-lbl">Recibidos esta semana</div></div>
      <div class="recl-stat"><div class="rs-top"><div class="rs-ic" style="background:rgba(225,25,25,.1);color:var(--red)"><span class="mi">mark_email_unread</span></div></div><div class="rs-val" style="color:var(--red)">${noLeidos}</div><div class="rs-lbl">Sin revisar</div></div>
      <div class="recl-stat"><div class="rs-top"><div class="rs-ic" style="background:rgba(59,125,221,.12);color:var(--blue)"><span class="mi">schedule</span></div></div><div class="rs-val" style="color:var(--blue)">${RP_PROG.length}</div><div class="rs-lbl">Envíos programados</div></div>
      <div class="recl-stat"><div class="rs-top"><div class="rs-ic" style="background:rgba(31,168,74,.12);color:#1F8F50"><span class="mi">donut_large</span></div></div><div class="rs-val" style="color:#1F8F50">${cobProm}%</div><div class="rs-lbl">Cobertura global</div></div>
    </div>
  </div>
  <div class="grid g2" style="align-items:start;margin-top:16px">
    <div class="card"><div class="card-h"><h3>Reportes recibidos de los Líderes</h3>${noLeidos?`<span class="pill alta">${noLeidos} sin revisar</span>`:'<span class="mi">inbox</span>'}</div>
      <div class="card-b" style="padding-top:6px">
        ${RP_REC.map((r,i)=>`<div class="rp-rec${r.leido?'':' unread'}" onclick="rpVer(${i})">
          <div class="rp-rec-av">${r.ini}</div>
          <div class="rp-rec-txt"><div class="t">Reporte semanal · ${r.grupo}${r.leido?'':' <span class="rp-dot"></span>'}</div><div class="s"><span class="mi">person</span>${r.lider} · <span class="mi">place</span>${r.zona} · cobertura ${r.cob}%</div></div>
          <div class="rp-rec-meta"><span class="rp-date">${r.fecha}</span><span class="mi">chevron_right</span></div>
        </div>`).join('')}
      </div>
    </div>
    <div class="card"><div class="card-h"><h3>Generar reporte global <span class="rp-rf">RF-24</span></h3><span class="mi">insert_chart</span></div>
      <div class="card-b">
        <div class="field"><label>Tipo de reporte <span class="req">*</span></label><select class="sel" onchange="_rp.tipo=this.selectedIndex">${RP_TYPES.map((t,i)=>`<option ${i===_rp.tipo?'selected':''}>${t}</option>`).join('')}</select></div>
        <div class="grid g2"><div class="field"><label>Desde</label><input class="inp" type="date"></div><div class="field"><label>Hasta</label><input class="inp" type="date"></div></div>
        <div class="field"><label>Filtrar por zona <span class="rp-opt">(opcional)</span></label><div class="rp-chips" id="rpZonaChips">${rpZonaChipsHTML()}</div></div>
        <div class="field"><label>Filtrar por Líder <span class="rp-opt">(opcional)</span></label><div class="rp-chips" id="rpLiderChips">${rpLiderChipsHTML()}</div></div>
        <div class="grid g2">
          <div class="field"><label>Formato</label><div class="tabs rp-fmt">${['PDF','Excel','CSV'].map(f=>`<div class="tab ${_rp.fmt===f?'active':''}" onclick="rpFmt('${f}')">${f}</div>`).join('')}</div></div>
          <div class="field"><label>Destinatario</label><select class="sel" onchange="_rp.dest=this.value"><option ${_rp.dest==='Mi supervisión'?'selected':''}>Mi supervisión</option><option>Comercial (BD/BDC)</option><option>Solo yo</option></select></div>
        </div>
        <div class="rp-actions"><button class="btn primary" onclick="rpPreview()"><span class="mi">visibility</span>Vista previa</button><button class="btn ghost" onclick="rpProgramar()"><span class="mi">schedule_send</span>Programar envío</button></div>
      </div>
    </div>
  </div>
  <div class="card" style="margin-top:16px"><div class="card-h"><h3>Envíos programados (recurrentes)</h3><span class="mi">event_repeat</span></div>
    <div class="card-b" style="padding-top:6px">
      ${RP_PROG.length?RP_PROG.map((p,i)=>`<div class="rp-prog"><div class="rp-prog-ic"><span class="mi">event_repeat</span></div><div class="rp-prog-txt"><div class="t">${p.tipo}</div><div class="s">${p.frec} · ${p.cuando} · ${p.fmt} → ${p.dest}</div></div><span class="rp-prog-badge">${p.frec}</span><button class="btn ghost sm" onclick="rpUnprog(${i})"><span class="mi">delete</span>Quitar</button></div>`).join(''):'<div class="empty"><span class="mi">schedule</span><div class="et">Sin envíos programados</div></div>'}
    </div>
  </div>`;
};
function rpVer(i){const r=RP_REC[i];r.leido=true;RENDER.Reportes();openDrawer(`<div class="req-drawer">
  <div class="req-drawer-h drawer-h"><div>
    <div class="req-drawer-pills" style="display:flex;gap:6px;flex-wrap:wrap"><span class="pill" style="background:var(--o-50);color:var(--o-700)">Reporte semanal</span><span class="pill blue">${r.zona}</span></div>
    <h3 style="margin-top:8px">${r.grupo}</h3>
    <div style="font-size:12.5px;color:var(--ink-3);margin-top:3px">${r.lider} · enviado ${r.fecha}</div>
  </div><div class="x" onclick="closeDrawer()"><span class="mi">close</span></div></div>
  <div class="drawer-b">
    <div class="banner info" style="margin-bottom:14px"><span class="mi">description</span><div>Reporte semanal enviado por el Líder de Grupo. Resumen de su grupo para tu revisión.</div></div>
    <div class="sec-title">Indicadores del grupo</div>
    <div class="grid g3" style="margin-bottom:10px">
      <div class="kpi"><div class="val" style="color:${cobColor(r.cob)}">${r.cob}<span class="suf">%</span></div><div class="lbl">Cobertura</div></div>
      <div class="kpi"><div class="val">${r.recl}</div><div class="lbl">Reclutadoras</div></div>
      <div class="kpi"><div class="val" style="color:${r.esc?'var(--red)':'var(--ink-2)'}">${r.esc}</div><div class="lbl">Escalados</div></div>
    </div>
    <div class="irow"><span class="k">Grupo</span><span class="v">${r.grupo}</span></div>
    <div class="irow"><span class="k">Zona</span><span class="v">${r.zona}</span></div>
    <div class="irow"><span class="k">Periodo</span><span class="v">Semana actual</span></div>
    <div class="irow"><span class="k">Líder</span><span class="v">${r.lider}</span></div>
  </div>
  <div class="drawer-f"><button class="btn ghost" onclick="toast('Reporte descargado (PDF)','download')"><span class="mi">download</span>Descargar</button><button class="btn primary" onclick="closeDrawer();navigate(null,'Equipo')"><span class="mi">groups</span>Ver grupo en Mi Equipo</button></div></div>`);}
function rpPreview(){const t=RP_TYPES[_rp.tipo]||RP_TYPES[0];openModal(`<div class="modal-h"><h3>Vista previa · ${t}</h3><div class="x" onclick="closeModal()"><span class="mi">close</span></div></div>
  <div class="modal-b">
    <div class="banner info" style="margin-bottom:14px"><span class="mi">insert_chart</span><div>Vista previa del reporte <b>${t}</b>.</div></div>
    <div class="grid g3" style="margin-bottom:14px">
      <div class="kpi"><div class="val" style="color:var(--green)">84%</div><div class="lbl">Cobertura</div></div>
      <div class="kpi"><div class="val">142</div><div class="lbl">Requisiciones</div></div>
      <div class="kpi"><div class="val" style="color:var(--red)">${INC.filter(c=>!/Resuelt/i.test(c.estado)).length}</div><div class="lbl">Escalados</div></div>
    </div>
    <table class="tbl"><thead><tr><th>Zona</th><th>Cobertura</th></tr></thead><tbody>${ZONAS.map(z=>`<tr><td>${z.z}</td><td><div style="display:flex;align-items:center;gap:8px"><span class="num" style="min-width:34px;color:${cobColor(z.cob)}">${z.cob}%</span>${bar(z.cob,cobColor(z.cob))}</div></td></tr>`).join('')}</tbody></table>
  </div>
  <div class="modal-f"><button class="btn ghost" onclick="closeModal();toast('Reporte exportado (${_rp.fmt})','download')"><span class="mi">download</span>Exportar ${_rp.fmt}</button><button class="btn primary" onclick="closeModal();toast('Reporte enviado a ${_rp.dest}','send')"><span class="mi">send</span>Enviar a ${_rp.dest}</button></div>`);}
function rpProgramar(){const t=RP_TYPES[_rp.tipo]||RP_TYPES[0];openModal(`<div class="modal-h"><h3>Programar envío recurrente</h3><div class="x" onclick="closeModal()"><span class="mi">close</span></div></div>
  <div class="modal-b">
    <div class="banner info" style="margin-bottom:14px"><span class="mi">schedule_send</span><div>El reporte <b>${t}</b> se generará y enviará automáticamente con la frecuencia que elijas.</div></div>
    <div class="field"><label>Frecuencia <span class="req">*</span></label><select class="sel" id="rpFrec"><option>Semanal</option><option>Quincenal</option><option>Mensual</option></select></div>
    <div class="field"><label>Cuándo</label><input class="inp" id="rpCuando" placeholder="Ej. Lunes 08:00"></div>
    <div class="grid g2"><div class="field"><label>Formato</label><select class="sel" id="rpPfmt"><option ${_rp.fmt==='PDF'?'selected':''}>PDF</option><option ${_rp.fmt==='Excel'?'selected':''}>Excel</option><option ${_rp.fmt==='CSV'?'selected':''}>CSV</option></select></div><div class="field"><label>Destinatario</label><select class="sel" id="rpPdest"><option ${_rp.dest==='Mi supervisión'?'selected':''}>Mi supervisión</option><option>Comercial (BD/BDC)</option><option>Solo yo</option></select></div></div>
  </div>
  <div class="modal-f"><button class="btn ghost" onclick="closeModal()">Cancelar</button><button class="btn primary" onclick="(function(){RP_PROG.push({tipo:'${t}',frec:document.getElementById('rpFrec').value,cuando:document.getElementById('rpCuando').value.trim()||'Sin hora',dest:document.getElementById('rpPdest').value,fmt:document.getElementById('rpPfmt').value});closeModal();toast('Envío recurrente programado','schedule_send');RENDER.Reportes();})()"><span class="mi">check</span>Programar</button></div>`);}
function rpUnprog(i){const p=RP_PROG[i];RP_PROG.splice(i,1);toast('Envío programado eliminado','delete');RENDER.Reportes();}

/* ============================ HEADER DROPDOWNS ============================ */
function toggleDd(id){const dd=document.getElementById(id),open=!dd.classList.contains('open');document.querySelectorAll('.dd.open').forEach(d=>d.classList.remove('open'));if(open){if(id==='notifDd')renderNotifDd();if(id==='profDd')renderProfDd();dd.classList.add('open');}}
function closeDd(){document.querySelectorAll('.dd.open').forEach(d=>d.classList.remove('open'));}
document.addEventListener('click',function(e){if(!e.target.closest('#notifWrap')&&!e.target.closest('#profWrap')&&!e.target.closest('.hd-search'))closeDd();});
function readNotif(id){const n=NOTIFS.find(x=>x.id===id);if(n)n.unread=false;updateBadge();}
function markAllN(){NOTIFS.forEach(n=>n.unread=false);updateBadge();toast('Todas marcadas como leídas','done_all');}
function updateBadge(){const u=NOTIFS.filter(n=>n.unread).length;const b=document.getElementById('hdBadge');if(b){b.textContent=u;b.style.display=u?'':'none';}}
function renderNotifDd(){document.getElementById('notifDd').innerHTML=`<div class="dd-head"><h4>Notificaciones</h4><span class="act" onclick="markAllN();renderNotifDd()">Marcar todas como leídas</span></div><div class="dd-scroll">${NOTIFS.map(n=>`<div class="notif-item ${n.unread?'unread':''}" onclick="readNotif(${n.id});renderNotifDd()"><div class="ni-ic ${n.cl}"><span class="mi">${n.ic}</span></div><div class="txt"><div><strong>${n.t}</strong> — <span>${n.x}</span></div><div class="tm">${n.tm}</div></div>${n.unread?'<div class="dot-unread"></div>':''}</div>`).join('')}</div>`;}
function renderProfDd(){document.getElementById('profDd').innerHTML=`<div class="prof-head"><div class="avatar lg">${MGR.ini}</div><div><div class="pn">${MGR.name}</div><div class="prof-zone"><span class="mi">public</span>${MGR.role} · Depto. completo</div></div></div>
  <div class="prof-menu">
    <div class="prof-sect" style="padding-top:6px">Cuenta</div>
    <div class="mi-item" onclick="openMyInfo('info')"><span class="mio">person</span>Mi información</div>
    <div class="mi-item" onclick="openMyInfo('alcance')"><span class="mio">public</span>Mi alcance</div>
    <div class="mi-item" onclick="openMyInfo('metricas')"><span class="mio">insights</span>Mis métricas globales</div>
    <div class="divider"></div>
    <div class="prof-sect">Mi equipo</div>
    <div style="padding:4px 14px 8px">
      <div style="display:flex;align-items:center;gap:10px;padding:10px;background:var(--surface-2);border:1px solid var(--line);border-radius:10px">
        <span class="mi" style="color:var(--o-600)">groups</span>
        <div style="flex:1"><div style="font-weight:600;color:var(--ink);font-size:13px">Departamento de Reclutamiento</div><div style="font-size:11.5px;color:var(--ink-3)">4 Líderes · 6 reclutadoras · todas las zonas</div></div>
      </div>
      <div style="display:flex;gap:6px;margin-top:8px;flex-wrap:wrap">
        <span class="lg-chip g" style="font-size:10.5px">Cobertura 84%</span>
        <span class="lg-chip n" style="font-size:10.5px">142 activas</span>
        <span class="lg-chip r" style="font-size:10.5px">6 escalados</span>
      </div>
    </div>
    <div class="mi-item" onclick="navigate(null,'Equipo')"><span class="mio">arrow_forward</span>Ver Mi Equipo</div>
    <div class="divider"></div>
    <div class="prof-sect">Configuración</div>
    <div class="mi-item" onclick="openMyInfo('seguridad')"><span class="mio">lock</span>Seguridad</div>
    <div class="mi-item" onclick="openMyInfo('preferencias')"><span class="mio">tune</span>Preferencias</div>
    <div class="mi-item lang-item" onclick="event.stopPropagation()"><span class="mio">translate</span>Idioma<div class="lang-seg"><button class="lang-opt ${LANG==='es'?'active':''}" data-lang="es" onclick="event.stopPropagation();setLang('es')">ES</button><button class="lang-opt ${LANG==='en'?'active':''}" data-lang="en" onclick="event.stopPropagation();setLang('en')">EN</button></div></div>
    <div class="mi-item theme-item" onclick="event.stopPropagation()"><span class="mio">brightness_4</span><span class="theme-item-lbl">Tema</span><div class="theme-seg" data-theme-seg><button type="button" class="theme-opt ${document.documentElement.classList.contains('dark-mode')?'':'active'}" data-theme-opt="light" onclick="event.stopPropagation();setTheme('light')"><span class="mio">light_mode</span></button><button type="button" class="theme-opt ${document.documentElement.classList.contains('dark-mode')?'active':''}" data-theme-opt="dark" onclick="event.stopPropagation();setTheme('dark')"><span class="mio">dark_mode</span></button></div></div>
    <div class="divider"></div>
    <div class="mi-item danger" onclick="closeDd();toast('Cerrando sesión…','logout')"><span class="mio">logout</span>Cerrar sesión</div>
  </div>`;}
const MI_LABELS={info:'Mi información',alcance:'Mi alcance',metricas:'Mis métricas',seguridad:'Seguridad',preferencias:'Preferencias'};
let _prevCrumb=null;
function setMiCrumb(pane){const w=document.querySelector('.hd-crumbs');if(!w)return;w.innerHTML='<span class="crumb" style="cursor:pointer" onclick="closeMyInfo()">Oranje</span><span class="mi sep">chevron_right</span><span class="crumb" style="cursor:pointer" onclick="miNavById(\'info\')">Mi cuenta</span><span class="mi sep">chevron_right</span><span class="current" id="crumb">'+(MI_LABELS[pane]||'Mi información')+'</span>';if(typeof LANG!=='undefined'&&LANG==='en')_i18nWalk(w,true);}
function openMyInfo(pane){closeDd();if(_prevCrumb===null){const w=document.querySelector('.hd-crumbs');_prevCrumb=w?w.innerHTML:null;}document.body.classList.add('mi-open');miNavById(pane||'info');window.scrollTo(0,0);}
function closeMyInfo(){document.body.classList.remove('mi-open');if(_prevCrumb!==null){const w=document.querySelector('.hd-crumbs');if(w)w.innerHTML=_prevCrumb;_prevCrumb=null;}}
function closeMyInfoIfOpen(){if(document.body.classList.contains('mi-open'))closeMyInfo();}
function miNav(el,pane){document.querySelectorAll('.mi-side .mi-nav').forEach(n=>n.classList.remove('active'));if(el)el.classList.add('active');document.querySelectorAll('.mi-pane').forEach(p=>p.classList.remove('active'));const pe=document.getElementById('miPane-'+pane);if(pe)pe.classList.add('active');setMiCrumb(pane);}
function miNavById(pane){miNav(document.querySelector('.mi-side .mi-nav[data-pane="'+pane+'"]'),pane);}
function openSearch(){const dd=document.getElementById('searchDd');dd.innerHTML=`
  <div class="sdd-sec"><div class="sdd-label">Requisiciones</div>
    <div class="sdd-row" onclick="closeDd();navigate(null,'Requisiciones')"><div class="sdd-ic"><span class="mi">assignment</span></div><div><div class="sdd-name">REQ #001 · Housekeeper</div><div class="sdd-meta">Costa del Sol · Centro · varada</div></div><span class="sdd-kind">Req</span></div></div>
  <div class="sdd-sec"><div class="sdd-label">Líderes de Grupo</div>
    ${LIDERES.slice(0,2).map(l=>`<div class="sdd-row" onclick="closeDd();navigate(null,'Equipo')"><div class="sdd-ic" style="background:var(--o-100);color:var(--o-700)"><span class="mi">badge</span></div><div><div class="sdd-name">${l.nombre}</div><div class="sdd-meta">${l.grupo} · ${l.zona}</div></div><span class="sdd-kind">Líder</span></div>`).join('')}</div>
  <div class="sdd-sec"><div class="sdd-label">Zonas</div>
    <div class="sdd-row" onclick="closeDd();navigate(null,'Dashboard')"><div class="sdd-ic b"><span class="mi">map</span></div><div><div class="sdd-name">Noroeste</div><div class="sdd-meta">Cobertura 72% · en riesgo</div></div><span class="sdd-kind">Zona</span></div></div>`;
  dd.classList.add('open');
}

/* ============================ INIT ============================ */
updateBadge();
navigate(null,'Dashboard');
