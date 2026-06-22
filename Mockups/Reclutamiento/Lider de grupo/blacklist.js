/* ============================================================
   BLACKLIST — colaboradores vetados.
   Lista + filtros + detalle (drawer) + acción "Agregar a blacklist".
   ============================================================ */
(function(){
  const MOTIVOS = {
    faltas: { lbl:'3 faltas', full:'3 faltas (inasistencias)', ic:'event_busy', sev:'Automático · sistema · 3ª inasistencia',
      desc:'El colaborador acumuló <strong>3 inasistencias sin justificación</strong>. El sistema lo escala a Blacklist (estado Negro) de forma <strong>automática</strong> tras la tercera falta, sin intervención manual.' },
    grave:  { lbl:'Falta grave', full:'Falta grave', ic:'gpp_bad', sev:'Crítico · baja inmediata',
      desc:'Conducta grave (robo, agresión, abandono de puesto, faltas a la seguridad) cometida en el hotel. El hotel lo reporta y el <strong>Inspector de zona</strong> lo resuelve, motivando el veto inmediato y permanente del colaborador.' },
  };

  // Tipos específicos de falta grave. El Inspector de zona tipifica el caso al resolverlo.
  const GRAVE_TYPES = [
    { key:'robo', lbl:'Robo', ic:'local_police',
      desc:'Sustracción comprobada de <strong>pertenencias de huéspedes o bienes del hotel</strong>. El caso fue documentado por el hotel y validado por el Inspector de zona, motivando el veto permanente.' },
    { key:'agresion', lbl:'Agresión / violencia', ic:'sentiment_very_dissatisfied',
      desc:'<strong>Agresión física o verbal</strong> hacia un huésped o compañero de trabajo dentro de las instalaciones. Conducta de cero tolerancia; el veto es inmediato y permanente.' },
    { key:'acoso', lbl:'Acoso', ic:'report_problem',
      desc:'<strong>Acoso u hostigamiento</strong> hacia personal o huéspedes. Reportado por el hotel y confirmado por el Inspector de zona tras la investigación correspondiente.' },
    { key:'abandono', lbl:'Abandono de puesto', ic:'directions_run',
      desc:'<strong>Abandono del puesto durante el turno</strong> sin autorización ni aviso, dejando la operación descubierta. Tipificado como falta grave por el Inspector de zona.' },
    { key:'seguridad', lbl:'Falta a la seguridad', ic:'gpp_maybe',
      desc:'<strong>Violación grave de los protocolos de seguridad</strong> del hotel, poniendo en riesgo a huéspedes, compañeros o instalaciones.' },
    { key:'sustancias', lbl:'Consumo de sustancias', ic:'no_drinks',
      desc:'Presentarse a laborar o <strong>consumir alcohol o sustancias prohibidas</strong> durante el turno. Conducta de cero tolerancia con veto inmediato.' },
  ];

  const PEOPLE = [
    {id:'BL-0418', nm:'Ramón Gutiérrez', doc:'CURP GURR8809', tel:'+52 322 145 8890', pos:'Camarista', zona:'Centro',  m:'faltas',  fecha:'08 may 2026', by:'María González', byrl:'Reclutadora · Zona Centro', faltas:[{d:'22 abr',s:'No se presentó al turno matutino · Costa del Sol'},{d:'29 abr',s:'Inasistencia sin aviso · Costa del Sol'},{d:'06 may',s:'3ª inasistencia — escalado automático'}]},
    {id:'BL-0417', nm:'Patricia Núñez', doc:'CURP NUPP9102', tel:'+52 322 778 1245', pos:'Recepción', zona:'Costera', m:'grave',   fecha:'06 may 2026', by:'Carlos Méndez', byrl:'Manager de Reclutamiento'},
    {id:'BL-0416', nm:'Esteban Ramírez', doc:'CURP RAEE8745', tel:'+52 322 901 3367', pos:'Mesero (A&B)', zona:'Centro', m:'grave', fecha:'03 may 2026', by:'QA · Operaciones', byrl:'Control de calidad'},
    {id:'BL-0415', nm:'Lorena Castillo', doc:'CURP CALL9433', tel:'+52 322 556 7781', pos:'Cocina', zona:'Norte',   m:'faltas',  fecha:'01 may 2026', by:'Ana Torres', byrl:'Reclutadora · Zona Norte', faltas:[{d:'14 abr',s:'No se presentó · Las Palmas'},{d:'21 abr',s:'Inasistencia sin aviso · Las Palmas'},{d:'28 abr',s:'3ª inasistencia — escalado automático'}]},
    {id:'BL-0414', nm:'Hugo Pereira', doc:'CURP PEHH8821', tel:'+52 322 334 9012', pos:'Botones', zona:'Costera', m:'grave',   fecha:'28 abr 2026', by:'Carlos Méndez', byrl:'Manager de Reclutamiento'},
    {id:'BL-0413', nm:'Daniela Fuentes', doc:'CURP FUDD9567', tel:'+52 322 612 4458', pos:'Camarista', zona:'Sur',  m:'faltas', fecha:'25 abr 2026', by:'Ana Torres', byrl:'Reclutadora · Zona Norte', faltas:[{d:'08 abr',s:'No se presentó · Bahía Príncipe'},{d:'15 abr',s:'Inasistencia sin aviso'},{d:'22 abr',s:'3ª inasistencia — escalado automático'}]},
    {id:'BL-0412', nm:'Iván Salgado', doc:'CURP SAII8690', tel:'+52 322 845 7723', pos:'Mantenimiento', zona:'Centro', m:'faltas', fecha:'22 abr 2026', by:'Ana Torres', byrl:'Reclutadora · Zona Norte', faltas:[{d:'05 abr',s:'No se presentó · Costa del Sol'},{d:'12 abr',s:'Inasistencia sin aviso'},{d:'19 abr',s:'3ª inasistencia — escalado automático'}]},
    {id:'BL-0411', nm:'Mariana Ortiz', doc:'CURP ORMM9248', tel:'+52 322 190 6634', pos:'Recepción', zona:'Poniente', m:'grave', fecha:'18 abr 2026', by:'QA · Operaciones', byrl:'Control de calidad'},
    {id:'BL-0410', nm:'Sergio Beltrán', doc:'CURP BESS8377', tel:'+52 322 477 2218', pos:'Mesero (A&B)', zona:'Costera', m:'faltas', fecha:'15 abr 2026', by:'Ana Torres', byrl:'Reclutadora · Zona Norte', faltas:[{d:'29 mar',s:'No se presentó · Marea Azul'},{d:'05 abr',s:'Inasistencia sin aviso'},{d:'12 abr',s:'3ª inasistencia — escalado automático'}]},
    {id:'BL-0409', nm:'Verónica Lara', doc:'CURP LAVV9711', tel:'+52 322 663 5590', pos:'Cocina', zona:'Norte', m:'faltas', fecha:'11 abr 2026', by:'Ana Torres', byrl:'Reclutadora · Zona Norte', faltas:[{d:'25 mar',s:'No se presentó · Las Palmas'},{d:'01 abr',s:'Inasistencia sin aviso'},{d:'08 abr',s:'3ª inasistencia — escalado automático'}]},
    {id:'BL-0408', nm:'Omar Vázquez', doc:'CURP VAOO8455', tel:'+52 322 228 8841', pos:'Botones', zona:'Centro', m:'grave', fecha:'07 abr 2026', by:'María González', byrl:'Reclutadora · Zona Centro'},
    {id:'BL-0407', nm:'Claudia Rentería', doc:'CURP RECC9082', tel:'+52 322 519 3376', pos:'Camarista', zona:'Sur', m:'faltas', fecha:'02 abr 2026', by:'Ana Torres', byrl:'Reclutadora · Zona Norte', faltas:[{d:'16 mar',s:'No se presentó · Vista Mar'},{d:'23 mar',s:'Inasistencia sin aviso'},{d:'30 mar',s:'3ª inasistencia — escalado automático'}]},
    {id:'BL-0406', nm:'Andrés Maldonado', doc:'CURP MAAA8233', tel:'+52 322 740 1198', pos:'Recepción', zona:'Centro', m:'grave', fecha:'30 mar 2026', by:'QA · Operaciones', byrl:'Control de calidad'},
    {id:'BL-0405', nm:'Teresa Aguirre', doc:'CURP AGTT9610', tel:'+52 322 365 8842', pos:'Cocina', zona:'Costera', m:'grave', fecha:'26 mar 2026', by:'QA · Operaciones', byrl:'Control de calidad'},
    {id:'BL-0404', nm:'Jorge Villanueva', doc:'CURP VIJJ8519', tel:'+52 322 902 6677', pos:'Mantenimiento', zona:'Norte', m:'faltas', fecha:'21 mar 2026', by:'Ana Torres', byrl:'Reclutadora · Zona Norte', faltas:[{d:'04 mar',s:'No se presentó · Puerto Sereno'},{d:'11 mar',s:'Inasistencia sin aviso'},{d:'18 mar',s:'3ª inasistencia — escalado automático'}]},
    {id:'BL-0403', nm:'Pilar Cervantes', doc:'CURP CEPP9374', tel:'+52 322 158 4420', pos:'Mesero (A&B)', zona:'Poniente', m:'grave', fecha:'17 mar 2026', by:'Carlos Méndez', byrl:'Manager de Reclutamiento'},
  ];

  // Semáforo de colaboradores (11 estados, sin contar Blacklist). Mismos colores
  // y etiquetas que el resto de módulos. Cualquiera de estos 11 estados puede ser
  // enviado a Blacklist manualmente por el reclutador.
  const SEMAFORO = {
    blanco:  { lbl:'Pre-asignación',      color:'#E8E0D5' },
    verdem:  { lbl:'Onboarding D1-2',     color:'#7CDB45' },
    azul:    { lbl:'Día 3+ uniforme',     color:'#3FB8E6' },
    naranja: { lbl:'Fijo',                color:'#FF7A00' },
    verdef:  { lbl:'Disponible',          color:'#1FA84A' },
    amarillo:{ lbl:'Disp. voluntario',    color:'#FFD500' },
    cafe:    { lbl:'Asignación temporal', color:'#8B5A2B' },
    rosa:    { lbl:'Stand by',            color:'#FF1493' },
    morado:  { lbl:'No regresó',          color:'#7B2CBF' },
    rojo:    { lbl:'Reportado',           color:'#E11919' },
    gris:    { lbl:'Accidentado',         color:'#5A5E63' },
  };
  const SEMAFORO_ORDER = ['blanco','verdem','azul','naranja','verdef','amarillo','cafe','rosa','morado','rojo','gris'];

  // pool para "Agregar a blacklist" (colaboradores activos, no vetados).
  // 11 colaboradores, uno por cada estado del semáforo (el 12.º estado, Blacklist,
  // no aparece: esos ya están vetados).
  const POOL = [
    {nm:'Fernanda Ríos',    doc:'CURP RIFF9233', pos:'Camarista · Zona Centro',       st:'verdef'},
    {nm:'Alberto Quiroz',   doc:'CURP QUAA8801', pos:'Mesero · Zona Costera',         st:'amarillo'},
    {nm:'Natalia Vega',     doc:'CURP VENN9476', pos:'Recepción · Zona Norte',        st:'naranja'},
    {nm:'Raúl Domínguez',   doc:'CURP DORR8612', pos:'Cocina · Zona Centro',          st:'cafe'},
    {nm:'Gabriela Soto',    doc:'CURP SOGG9159', pos:'Camarista · Zona Sur',          st:'verdem'},
    {nm:'Emilio Carrasco',  doc:'CURP CAEE8744', pos:'Mantenimiento · Zona Poniente', st:'azul'},
    {nm:'Lucía Mendoza',    doc:'CURP MELL9320', pos:'Botones · Zona Costera',        st:'blanco'},
    {nm:'Diego Salas',      doc:'CURP SADD9087', pos:'Steward · Zona Norte',          st:'rosa'},
    {nm:'Paola Ríos',       doc:'CURP RIPP8455', pos:'Housekeeper · Zona Centro',     st:'morado'},
    {nm:'Hugo Medina',      doc:'CURP MEHH9322', pos:'Mesero · Zona Sur',             st:'rojo'},
    {nm:'Sofía Lara',       doc:'CURP LASS8741', pos:'Recepción · Zona Costera',      st:'gris'},
  ];

  const ZONAS = ['Centro','Costera','Norte','Sur','Poniente'];
  const AV = ['#FF7A00','#7B2CBF','#1FA84A','#3FB8E6','#E6B422','#E11919','#FF1493'];
  const av = (s)=>AV[s.charCodeAt(0)%AV.length];
  // Mismos gradientes de avatar que el componente de requisiciones (gradFor), para
  // coherencia visual de las bolitas de perfil en el pool picker.
  const POS_GRADIENTS = ['linear-gradient(135deg,#FF7A00,#C53D1F)','linear-gradient(135deg,#22C55E,#15803D)','linear-gradient(135deg,#3B82F6,#1D4ED8)','linear-gradient(135deg,#A855F7,#7C3AED)','linear-gradient(135deg,#F59E0B,#D97706)','linear-gradient(135deg,#EC4899,#BE185D)'];
  const gradAv = (seed)=>POS_GRADIENTS[String(seed).split('').reduce((a,c)=>a+c.charCodeAt(0),0) % POS_GRADIENTS.length];
  const ini = (n)=>n.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase();

  // Inspectores por zona: investigan y resuelven los reportes de falta grave (autoridad propia).
  const INSPECTORES = { Centro:'Roberto Salinas', Costera:'Mónica Ibarra', Norte:'Diego Fuentes', Sur:'Renata Páez', Poniente:'Héctor Villalba' };
  // Hoteles de la cadena y responsables que reportan al colaborador.
  const HOTELES = ['Costa del Sol','Las Palmas','Marea Azul','Bahía Príncipe','Vista Mar','Puerto Sereno'];
  const REPORTERS = [
    {name:'Fernando Aguilar', role:'Manager General'},
    {name:'Lucía Mendoza',     role:'Manager de Área'},
    {name:'Raúl Esquivel',     role:'Supervisor'},
    {name:'Gabriela Ponce',    role:'Manager General'},
    {name:'Sergio Naranjo',    role:'Supervisor'},
    {name:'Daniela Ortega',    role:'Manager de Área'},
  ];
  // Normaliza el origen del registro según el proceso real de ingreso a Blacklist:
  //  · faltas (3 inasistencias) → escalamiento automático del sistema (sin intervención manual)
  //  · grave  (falta grave)     → reportado por un rol del hotel (Manager General / Manager de Área /
  //                               Supervisor) y resuelto/validado por el Inspector de zona.
  // Datos sintéticos para el detalle estilo Pool (onboarding del colaborador)
  const SANGRE = ['O+','A+','B+','O-','A-','AB+','B-'];
  const ALERG  = ['Ninguna','Penicilina','Mariscos','Polen','Ninguna','Lactosa','Ninguna'];
  const MODS   = ['Tiempo completo','Medio tiempo','Por horas'];
  const ORIGENES = ['Referido','Búsqueda activa','Difusión'];
  const EXPS   = ['Junior','Intermedio','Senior'];
  const TRANSP = ['Propio','Transporte público'];
  const ENGL   = ['Básico','Intermedio','Avanzado'];
  const CALLES = ['Av. Costera','Calle Hidalgo','Priv. Las Flores','Blvd. Marina','Calle Juárez','And. Palmeras'];
  const EMERG  = ['Carmen Díaz (madre)','Jorge Luna (padre)','Marisol Vega (esposa)','Andrés Gil (esposo)','Paola Ruiz (hermana)','Luis Mena (hermano)'];
  const FEM    = ['Pilar','Carmen','Beatriz','Mercedes','Soledad'];
  const hashStr = (s)=>{ let h=2166136261; for(let i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619); } return h>>>0; };
  const noAcc = (s)=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  PEOPLE.forEach(p=>{
    if(p.m==='faltas'){
      p.by = 'Sistema Oranje'; p.byrl = 'Escalamiento automático · 3ª inasistencia'; p.auto = true; p.regCat = 'sistema';
    } else {
      const h0 = HOTELES[p.nm.charCodeAt(0) % HOTELES.length];
      const rep = REPORTERS[(p.doc.charCodeAt(p.doc.length-1)) % REPORTERS.length];
      p.hotel = h0;
      p.reporter = rep;
      p.inspector = INSPECTORES[p.zona] || 'Inspector de zona';
      p.by = rep.name;
      p.byrl = rep.role + ' · ' + h0;
      // Tipo específico de falta grave (robo, violencia, etc.) — determinista por persona.
      p.gt = GRAVE_TYPES[hashStr(p.id + p.nm) % GRAVE_TYPES.length];
      // La falta grave la puede registrar el reclutador (manual, con tag
      // "Reclutador") o bien QA / Inspector de zona (sin tag). Varía por persona.
      p.manual = (hashStr(p.id + 'rec') % 2 === 0);
      if(p.manual){
        const RECR = ['María González','Ana Torres','Daniela Ríos'];
        p.vetadaPor = RECR[hashStr(p.id) % RECR.length];
        p.vetadaPorRol = 'Reclutadora · Zona ' + p.zona;
        p.regCat = 'reclutadora'; p.regName = p.vetadaPor; p.regRole = p.vetadaPorRol;
      } else {
        // No-manual: lo registra QA / Operaciones o el Manager de Reclutamiento.
        const isQA = ((+p.id.slice(-1)) % 2 === 0);
        p.regCat  = isQA ? 'qa' : 'manager';
        p.regName = isQA ? 'QA · Operaciones' : 'Carlos Méndez';
        p.regRole = isQA ? 'Control de calidad' : 'Manager de Reclutamiento';
      }
      p.nota = p.manual
        ? `Falta grave (${p.gt.lbl.toLowerCase()}) confirmada en ${h0}. El hotel documentó el incidente y el Inspector de zona lo validó; Yo como reclutadora lo veto y lo coloco en la Blacklist`
        : `Falta grave (${p.gt.lbl.toLowerCase()}) confirmada en ${h0}. El hotel documentó y reportó el incidente y el Inspector de zona lo investigó, validó y lo colocó en la Blacklist`;
      p.pruebas = ['Reporte_incidente.pdf','Evidencia_foto.jpg','Acta_de_hechos.pdf'].slice(0, 2 + (hashStr(p.id)%2));
    }
    // --- datos del candidato (sintéticos, deterministas) ---
    const h = hashStr(p.id + p.nm);
    const fn = noAcc(p.nm).split(' ');
    p.cid    = 'ID-' + String(2000 + (h % 7999));
    p.edad   = 22 + (h % 27);
    p.genero = (/a$/.test(p.nm.split(' ')[0]) || FEM.includes(p.nm.split(' ')[0])) ? 'Femenino' : 'Masculino';
    p.correo = fn[0] + '.' + (fn[1]||fn[0]) + '@gmail.com';
    p.dom    = CALLES[h % CALLES.length] + ' ' + (20 + (h % 180));
    p.ssn    = String(1000 + (h % 8999));
    p.emerg  = { contacto: EMERG[h % EMERG.length], tel:'+52 322 '+(100+(h%900))+' '+(1000+(h%9000)), sangre:SANGRE[h % SANGRE.length], alergias:ALERG[(h>>3) % ALERG.length] };
    p.mod    = MODS[h % MODS.length];
    p.origen = ORIGENES[(h>>2) % ORIGENES.length];
    p.engLbl = ENGL[(h>>4) % ENGL.length];
    p.exp    = EXPS[(h>>5) % EXPS.length];
    p.transp = TRANSP[(h>>6) % TRANSP.length];
    const nH = 1 + (h % 3);
    p.hist = Array.from({length:nH}, (_,i)=>{
      const hh = hashStr(p.id + i);
      const yr = 2022 + (hh % 4);
      return { h: HOTELES[hh % HOTELES.length], role: p.pos, from: String(yr), to: i===0 ? String(yr+1) : String(yr+1) };
    });
    // --- schedule fijo + asignación reportada (estilo Pool · Fijo) ---
    const MODHRS = { 'Tiempo completo':8, 'Medio tiempo':5, 'Por horas':4 };
    const MODST  = { 'Tiempo completo':'07:00', 'Medio tiempo':'08:00', 'Por horas':'16:00' };
    const MODEN  = { 'Tiempo completo':'15:00', 'Medio tiempo':'13:00', 'Por horas':'20:00' };
    const hrs = MODHRS[p.mod] || 8;
    const days = p.mod==='Por horas' ? [1,3,5] : (p.mod==='Medio tiempo' ? [0,1,2,3,4] : [0,1,2,3,4,5].slice(0, 5 + (h%2)));
    p.flex = (h % 2) === 0;   // ~mitad flexible, ~mitad fija
    p.sched = { modLbl:p.mod, hours:hrs, start:MODST[p.mod], end:MODEN[p.mod], conLbl: p.flex ? 'Flexible' : 'Fijo', daysOn:days };
    const ah = p.auto ? p.hist[0].h : p.hotel;
    // Si es flexible, el hotel pudo ajustar días/horario; si es fijo, lo respeta tal cual.
    let asgDays = days, asgStart = MODST[p.mod], asgEnd = MODEN[p.mod];
    if(p.flex && p.mod!=='Por horas'){
      asgDays = days.map(d=>(d+1)%6).sort((a,b)=>a-b);   // corre los días un lugar
      asgStart = p.mod==='Medio tiempo' ? '14:00' : '09:00';
      asgEnd   = p.mod==='Medio tiempo' ? '19:00' : '17:00';
    } else if(p.flex){
      asgDays = [2,4,6]; asgStart='17:00'; asgEnd='21:00';
    }
    p.asg = { h:ah, role:p.pos, from:p.hist[0].from, hours:hrs, start:asgStart, end:asgEnd, daysOn:asgDays, modLbl:p.mod, conLbl: p.flex ? 'Flexible' : 'Fijo' };
    p.prevHoteles = p.hist.filter(x=>x.h !== ah);
  });

  const state = { q:'', motivo:'all', zona:'', vetby:'all', periodo:'all', dateFrom:'', dateTo:'', calMonth:null, order:'recientes', view:'tabla', selected:null, openDD:null, drawerTab:'datos',
    poolView:null, poolTab:'datos',
    add:{ open:false, colab:null, motivo:null, nota:'', search:'', listOpen:false } };

  function fmtNum(n){ return String(n).padStart(2,'0'); }

  // ¿Quién registró el veto? Categoría derivada del rol (byrl/by).
  const MESN = {ene:0,feb:1,mar:2,abr:3,may:4,jun:5,jul:6,ago:7,sep:8,oct:9,nov:10,dic:11};
  function vetCat(p){ return p.regCat || 'sistema'; }
  function parseFecha(f){ const a=(f||'').split(' '); return new Date(+a[2], MESN[(a[1]||'').toLowerCase()]||0, +a[0]); }
  const NOW_BL = new Date(2026,5,4); // 04 jun 2026

  function filtered(){
    let list = PEOPLE.slice();
    const q = state.q.trim().toLowerCase();
    const qd = q.replace(/\D/g,'');
    if(q) list = list.filter(p=> p.nm.toLowerCase().includes(q) || p.doc.toLowerCase().includes(q) || (p.tel||'').toLowerCase().includes(q) || (qd && (p.tel||'').replace(/\D/g,'').includes(qd)));
    if(state.motivo!=='all') list = list.filter(p=>p.m===state.motivo);
    if(state.zona) list = list.filter(p=>p.zona===state.zona);
    if(state.vetby!=='all') list = list.filter(p=>vetCat(p)===state.vetby);
    if(state.periodo!=='all'){
      let from=null, to=null;
      if(state.periodo==='custom'){
        from = state.dateFrom ? new Date(state.dateFrom+'T00:00:00') : null;
        to   = state.dateTo   ? new Date(state.dateTo+'T23:59:59')   : null;
      } else {
        const mm = {'1m':1,'3m':3,'6m':6,'1y':12}[state.periodo] || 0;
        from = new Date(NOW_BL); from.setMonth(from.getMonth()-mm); to = NOW_BL;
      }
      list = list.filter(p=>{ const d=parseFecha(p.fecha); if(from&&d<from) return false; if(to&&d>to) return false; return true; });
    }
    list.sort((a,b)=> state.order==='recientes' ? b.id.localeCompare(a.id) : a.id.localeCompare(b.id));
    return list;
  }
  function counts(){
    const c = {all:PEOPLE.length, faltas:0, grave:0};
    PEOPLE.forEach(p=>c[p.m]++);
    return c;
  }

  // Colores de motivo (estados de la tarjeta, igual que Reclutamiento)
  const M_COLOR = { faltas:'#7B2CBF', grave:'#E11919' };

  // Tarjeta de colaborador — reusa los componentes recl-card de Reclutamiento
  function personCard(p){
    const m = MOTIVOS[p.m];
    const col = M_COLOR[p.m];
    return `<div class="recl-card bl-veto-card${state.selected===p.id?' selected':''}" data-blid="${p.id}" style="--card-st:${col}" onclick="window.__blOpen('${p.id}')">
      <div class="recl-card-top">
        <div class="recl-avatar" style="background:${av(p.nm)}">
          ${ini(p.nm)}
          <span class="recl-st-ring"></span>
          <span class="bl-av-blk"><span class="mi">block</span></span>
        </div>
        <div class="nm">
          <div class="name">${p.nm}</div>
          <div class="doc">${p.cid}</div>
        </div>
      </div>
      <div class="recl-card-meta">
        <span class="meta-pill pos"><span class="mi">work_outline</span>${p.pos}</span>
        <span class="meta-pill zone"><span class="mi">place</span>${p.zona}</span>
        <span class="bl-motivo" data-m="${p.m}"><span class="mi">${m.ic}</span>${m.lbl}</span>
        ${p.manual ? `<span class="bl-manual-tag" title="Veto registrado manualmente por el reclutador"><span class="mi">how_to_reg</span>Reclutador</span>` : ''}
      </div>
      <div class="entrev-card-foot">
        <span class="entrev-days"><span class="mi">event</span>${p.fecha}</span>
        <span class="bl-card-by-inline" title="${p.auto?p.byrl:('Reportado por '+p.by+' · '+p.reporter.role+' · '+p.hotel)}">
          <span class="av${p.auto?' sys':' hotel'}"><span class="mi">${p.auto?'bolt':'apartment'}</span></span>${p.auto?'Sistema':p.hotel}
        </span>
      </div>
    </div>`;
  }

  /* ---------------- LIST ---------------- */
  function render(){
    const root = document.getElementById('bl-root');
    if(!root) return;
    const c = counts();
    const list = filtered();

    const zonaMenu = `<div class="recl-filter-dd${state.openDD==='zona'?' open':''}" onclick="event.stopPropagation()" style="position:absolute;top:calc(100% + 6px);left:0;z-index:30;background:#fff;border:1px solid var(--line);border-radius:11px;box-shadow:var(--sh-lg);padding:6px;min-width:170px;display:${state.openDD==='zona'?'block':'none'}">
      <div class="bl-zona-opt" onclick="window.__blZona('')" style="padding:8px 10px;border-radius:8px;cursor:pointer;font-size:12.5px;font-weight:600;color:${!state.zona?'var(--o-700)':'var(--ink-2)'}">Todas las zonas</div>
      ${ZONAS.map(z=>`<div class="bl-zona-opt" onclick="window.__blZona('${z}')" style="padding:8px 10px;border-radius:8px;cursor:pointer;font-size:12.5px;font-weight:600;color:${state.zona===z?'var(--o-700)':'var(--ink-2)'}">${z}</div>`).join('')}
    </div>`;

    const MOTIVO_OPTS = [['all','Todos los motivos','filter_alt'],['faltas','3 faltas','event_busy'],['grave','Falta grave','gpp_bad']];
    const motivoMenu = `<div class="recl-filter-dd${state.openDD==='motivo'?' open':''}" onclick="event.stopPropagation()" style="position:absolute;top:calc(100% + 6px);left:0;z-index:30;background:#fff;border:1px solid var(--line);border-radius:11px;box-shadow:var(--sh-lg);padding:6px;min-width:180px;display:${state.openDD==='motivo'?'block':'none'}">
      ${MOTIVO_OPTS.map(([k,l,ic])=>`<div class="bl-zona-opt" onclick="window.__blMotivo('${k}')" style="display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;cursor:pointer;font-size:12.5px;font-weight:600;color:${(state.motivo===k||(k==='all'&&state.motivo==='all'))?'var(--o-700)':'var(--ink-2)'}"><span class="mi" style="font-size:16px">${ic}</span>${l}</div>`).join('')}
    </div>`;

    const VETBY_OPTS = [['all','Todos','groups'],['reclutadora','Reclutadora','badge'],['qa','QA · Operaciones','verified_user'],['manager','Manager','manage_accounts']];
    const VETBY_LBL = {all:'Todos',reclutadora:'Reclutadora',qa:'QA',manager:'Manager'};
    const vetbyMenu = `<div class="recl-filter-dd${state.openDD==='vetby'?' open':''}" onclick="event.stopPropagation()" style="position:absolute;top:calc(100% + 6px);left:0;z-index:30;background:#fff;border:1px solid var(--line);border-radius:11px;box-shadow:var(--sh-lg);padding:6px;min-width:190px;display:${state.openDD==='vetby'?'block':'none'}">
      ${VETBY_OPTS.map(([k,l,ic])=>`<div class="bl-zona-opt" onclick="window.__blVetby('${k}')" style="display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;cursor:pointer;font-size:12.5px;font-weight:600;color:${state.vetby===k?'var(--o-700)':'var(--ink-2)'}"><span class="mi" style="font-size:16px">${ic}</span>${l}</div>`).join('')}
    </div>`;

    const PERIODO_OPTS = [['all','Cualquier fecha'],['1m','Último mes'],['3m','Últimos 3 meses'],['6m','Últimos 6 meses'],['1y','Último año']];
    const PERIODO_LBL = {all:'Cualquiera','1m':'Último mes','3m':'3 meses','6m':'6 meses','1y':'Último año'};
    const periodoValLbl = state.periodo==='custom'
      ? (state.dateFrom||state.dateTo ? `${state.dateFrom||'…'} → ${state.dateTo||'…'}` : 'Personalizado')
      : PERIODO_LBL[state.periodo];
    // ---- Calendario rango (estilo reserva) ----
    const fmtISO = (d)=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    const isoLong = (s)=>{ if(!s) return '…'; const d=new Date(s+'T00:00:00'); const M=['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']; return `${d.getDate()} ${M[d.getMonth()]} ${d.getFullYear()}`; };
    if(state.periodo==='custom' && !state.calMonth){ const base = state.dateFrom ? new Date(state.dateFrom+'T00:00:00') : new Date(NOW_BL); state.calMonth = new Date(base.getFullYear(), base.getMonth(), 1); }
    const calendarHTML = (()=>{
      if(state.periodo!=='custom') return '';
      const cm = state.calMonth || new Date(NOW_BL.getFullYear(), NOW_BL.getMonth(), 1);
      const y=cm.getFullYear(), mo=cm.getMonth();
      const MES_FULL=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
      const lead=(new Date(y,mo,1).getDay()+6)%7; // lunes primero
      const ndays=new Date(y,mo+1,0).getDate();
      const from=state.dateFrom, to=state.dateTo, todayISO=fmtISO(NOW_BL);
      let cells='';
      for(let i=0;i<lead;i++) cells+=`<div class="bl-cal-cell empty"></div>`;
      for(let d=1;d<=ndays;d++){
        const iso=fmtISO(new Date(y,mo,d));
        const isFrom=iso===from, isTo=iso===to;
        const inRange = from&&to&&iso>from&&iso<to;
        let cls='bl-cal-cell';
        if(inRange) cls+=' in-range';
        if(isFrom) cls+=' end from';
        if(isTo) cls+=' end to';
        if((isFrom&&!to)||(isFrom&&isTo)) cls+=' single';
        if(iso===todayISO) cls+=' today';
        cells+=`<div class="${cls}" onclick="event.stopPropagation();window.__blCalPick('${iso}')"><span>${d}</span></div>`;
      }
      const rangeLbl = (from||to) ? `${isoLong(from)} → ${isoLong(to)}` : 'Selecciona la fecha de inicio';
      return `<div class="bl-cal" onclick="event.stopPropagation()">
        <div class="bl-cal-head">
          <button type="button" class="bl-cal-nav" onclick="event.stopPropagation();window.__blCalNav(-1)"><span class="mi">chevron_left</span></button>
          <div class="bl-cal-mo">${MES_FULL[mo]} ${y}</div>
          <button type="button" class="bl-cal-nav" onclick="event.stopPropagation();window.__blCalNav(1)"><span class="mi">chevron_right</span></button>
        </div>
        <div class="bl-cal-dow">${['L','M','M','J','V','S','D'].map(x=>`<span>${x}</span>`).join('')}</div>
        <div class="bl-cal-grid">${cells}</div>
        <div class="bl-cal-foot">
          <span class="bl-cal-range">${rangeLbl}</span>
          <button type="button" class="bl-cal-clear" onclick="event.stopPropagation();window.__blCalReset()">Limpiar</button>
        </div>
      </div>`;
    })();
    const periodoMenu = `<div class="recl-filter-dd${state.openDD==='periodo'?' open':''}" onclick="event.stopPropagation()" style="position:absolute;top:calc(100% + 6px);left:0;z-index:30;background:#fff;border:1px solid var(--line);border-radius:11px;box-shadow:var(--sh-lg);padding:6px;min-width:${state.periodo==='custom'?'288px':'215px'};display:${state.openDD==='periodo'?'block':'none'}">
      ${PERIODO_OPTS.map(([k,l])=>`<div class="bl-zona-opt" onclick="window.__blPeriodo('${k}')" style="padding:8px 10px;border-radius:8px;cursor:pointer;font-size:12.5px;font-weight:600;color:${state.periodo===k?'var(--o-700)':'var(--ink-2)'}">${l}</div>`).join('')}
      <div style="height:1px;background:var(--line);margin:5px 6px"></div>
      <div class="bl-zona-opt" onclick="window.__blPeriodo('custom')" style="display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;cursor:pointer;font-size:12.5px;font-weight:600;color:${state.periodo==='custom'?'var(--o-700)':'var(--ink-2)'}"><span class="mi" style="font-size:16px">date_range</span>Personalizado</div>
      ${calendarHTML}
    </div>`;

    const rows = list.length ? list.map(p=>{
      const m = MOTIVOS[p.m];
      return `<tr class="bl-row${state.selected===p.id?' row-selected':''}" onclick="window.__blOpen('${p.id}')">
        <td>
          <div class="bl-tbl-colab">
            <div class="av" style="background:${av(p.nm)}">${ini(p.nm)}<span class="blk"><span class="mi">block</span></span></div>
            <div><div class="nm">${p.nm}</div><div class="doc">${p.doc}</div></div>
          </div>
        </td>
        <td><span class="bl-motivo" data-m="${p.m}"><span class="mi">${m.ic}</span>${m.lbl}</span></td>
        <td><span class="bl-tbl-zona"><span class="mi">location_on</span>${p.zona}</span></td>
        <td><span class="bl-tbl-date">${p.fecha}<small>${p.id}</small></span></td>
        <td>
          <div class="bl-tbl-by">
            <div class="av">${ini(p.by)}</div>
            <div class="by-txt"><div class="nm">${p.by}</div><div class="rl">${p.byrl}</div></div>
          </div>
        </td>
        <td class="bl-row-chev"><span class="mi">chevron_right</span></td>
      </tr>`;
    }).join('') : `<tr><td colspan="6"><div class="bl-empty"><span class="mi">block</span><div style="margin-top:8px;font-weight:600">Sin colaboradores para los filtros aplicados</div></div></td></tr>`;

    // ---- VISTAS ----
    const tableHTML = `
      <div class="req-table-wrap">
        <table class="req-table req-table-rich">
          <thead><tr>
            <th style="width:30%">Colaborador</th>
            <th>Motivo del veto</th>
            <th>Zona</th>
            <th>Fecha de ingreso</th>
            <th>Propuesto por</th>
            <th></th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;

    const cardsHTML = list.length
      ? `<div class="bl-cards-grid">${list.map(personCard).join('')}</div>`
      : `<div class="bl-empty" style="background:#fff;border:1px solid var(--line);border-radius:14px"><span class="mi">block</span><div style="margin-top:8px;font-weight:600">Sin colaboradores para los filtros aplicados</div></div>`;

    const MORDER = ['faltas','grave'];
    const boardHTML = `<div class="recl-board bl-board">${MORDER.map(k=>{
      const col = list.filter(p=>p.m===k);
      const mm = MOTIVOS[k];
      const cards = col.length
        ? col.map(personCard).join('')
        : `<div class="recl-col-empty"><span class="mi">${mm.ic}</span><span class="e-txt">Sin colaboradores</span></div>`;
      return `<div class="recl-col bl-col" data-m="${k}">
        <div class="recl-col-head">
          <span class="recl-col-dot" style="background:${M_COLOR[k]}"></span>
          <div class="recl-col-name">${mm.full}<span class="sub-st">${mm.sev}</span></div>
          <span class="recl-col-count">${fmtNum(col.length)}</span>
        </div>
        <div class="bl-col-cards">${cards}</div>
      </div>`;
    }).join('')}</div>`;

    const body = state.view==='board' ? boardHTML : state.view==='cards' ? cardsHTML : tableHTML;

    root.innerHTML = `
      <!-- HERO -->
      <div class="recl-hero">
        <div class="recl-hero-left" style="height:160px;background:radial-gradient(135% 150% at 88% 6%, rgba(255,122,0,.32) 0%, rgba(255,122,0,0) 52%), linear-gradient(135deg,#4A3216 0%,#2C1D0F 55%,#1A1108 100%)">
          <div class="eyebrow"><span class="pulse"></span>Control de calidad · Vetados</div>
          <h1>Colaboradores <span class="accent">vetados</span> de la plataforma.</h1>
          <div class="lead">Consulta el listado completo de blacklist, su motivo y quién lo propuso. Cualquier reclutador puede agregar a un colaborador con la justificación correspondiente.</div>
        </div>
        <div class="recl-hero-right" style="height:160px">
          <div class="recl-stat" onclick="window.__blMotivo('all')">
            <div class="rs-top"><div class="rs-ic" style="background:rgba(26,17,8,.10);color:var(--ink)"><span class="mi">block</span></div>
              <div class="rs-val">${fmtNum(c.all)}</div><div class="rs-trend warn"><span class="mi">groups</span>total</div></div>
            <div class="rs-lbl">Total vetados</div>
          </div>
          <div class="recl-stat" onclick="window.__blMotivo('faltas')">
            <div class="rs-top"><div class="rs-ic" style="background:rgba(123,44,191,.12);color:#7B2CBF"><span class="mi">event_busy</span></div>
              <div class="rs-val">${fmtNum(c.faltas)}</div><div class="rs-trend" style="background:rgba(123,44,191,.12);color:#6D28D9"><span class="mi">bolt</span>auto</div></div>
            <div class="rs-lbl">Por 3 faltas</div>
          </div>
          <div class="recl-stat" onclick="window.__blMotivo('grave')">
            <div class="rs-top"><div class="rs-ic" style="background:rgba(225,25,25,.1);color:var(--red)"><span class="mi">gpp_bad</span></div>
              <div class="rs-val" style="color:var(--red)">${fmtNum(c.grave)}</div><div class="rs-trend down"><span class="mi">priority_high</span>crít.</div></div>
            <div class="rs-lbl">Falta grave</div>
          </div>
          <div class="recl-stat" style="cursor:default">
            <div class="rs-top"><div class="rs-ic" style="background:rgba(255,142,0,.12);color:var(--o-700)"><span class="mi">apartment</span></div>
              <div class="rs-val">${fmtNum(new Set(PEOPLE.filter(x=>x.hotel).map(x=>x.hotel)).size)}</div><div class="rs-trend warn"><span class="mi">flag</span>reportes</div></div>
            <div class="rs-lbl">Hoteles con reportes</div>
          </div>
        </div>
      </div>

      <!-- TOOLBAR: search + Agregar (igual layout que Entrevistas/Pool) -->
      <div class="recl-toolbar">
        <div class="recl-search">
          <span class="mi">search</span>
          <input type="text" placeholder="Buscar por teléfono, nombre o documento (SSN)…" value="${state.q.replace(/"/g,'&quot;')}" oninput="window.__blSearch(this.value)">
          <span class="kbd">⌘F</span>
        </div>
        <div class="recl-toolbar-divider"></div>
        <button class="bl-add-btn" onclick="window.__blAddOpen()"><span class="mi">person_add_disabled</span>Agregar a blacklist</button>
      </div>

      <!-- FILTROS -->
      <div class="recl-filters" style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:0 0 16px">
        <div class="recl-filter-grp${state.zona?' active':''}" style="position:relative" onclick="window.__blDD('zona',event)">
          <span class="mi">location_on</span><span class="lbl-grp">Zona</span><span class="val">${state.zona||'Todas'}</span><span class="mi">expand_more</span>
          ${zonaMenu}
        </div>
        <div class="recl-filter-grp${state.motivo!=='all'?' active':''}" style="position:relative" onclick="window.__blDD('motivo',event)">
          <span class="mi">block</span><span class="lbl-grp">Motivo</span><span class="val">${state.motivo==='all'?'Todos':MOTIVOS[state.motivo].lbl}</span><span class="mi">expand_more</span>
          ${motivoMenu}
        </div>
        <div class="recl-filter-grp${state.vetby!=='all'?' active':''}" style="position:relative" onclick="window.__blDD('vetby',event)">
          <span class="mi">how_to_reg</span><span class="lbl-grp">Vetado por</span><span class="val">${VETBY_LBL[state.vetby]}</span><span class="mi">expand_more</span>
          ${vetbyMenu}
        </div>
        <div class="recl-filter-grp${state.periodo!=='all'?' active':''}" style="position:relative" onclick="window.__blDD('periodo',event)">
          <span class="mi">calendar_month</span><span class="lbl-grp">Periodo</span><span class="val">${periodoValLbl}</span><span class="mi">expand_more</span>
          ${periodoMenu}
        </div>
        ${(()=>{ const n=(state.q?1:0)+(state.zona?1:0)+(state.motivo!=='all'?1:0)+(state.vetby!=='all'?1:0)+(state.periodo!=='all'?1:0); return n>0?`<div class="recl-filter-clear" onclick="window.__blClear()" title="Limpiar todos los filtros"><span class="mi" style="font-size:15px">filter_alt_off</span> Limpiar todo <span class="badge-n">${n}</span></div>`:''; })()}
      </div>

      <!-- TITULO + switcher de vista -->
      <div class="recl-board-title">
        <h2>
          <span class="recl-board-ic"><span class="mi">block</span></span>
          <span>${state.motivo==='all'?'Todos los vetados':MOTIVOS[state.motivo].full}</span>
          <span class="recl-board-sub">${list.length} ${list.length===1?'colaborador':'colaboradores'}${state.zona?' · '+state.zona:''}</span>
        </h2>
        <div class="recl-segmented recl-segmented-inline">
          <button class="${state.view==='board'?'active':''}" onclick="window.__blView('board')"><span class="mi">view_kanban</span>Tablero</button>
          <button class="${state.view==='cards'?'active':''}" onclick="window.__blView('cards')"><span class="mi">grid_view</span>Tarjetas</button>
          <button class="${state.view==='tabla'?'active':''}" onclick="window.__blView('tabla')"><span class="mi">table_rows</span>Tabla</button>
        </div>
      </div>

      <!-- VISTA (tabla / tarjetas / tablero) -->
      ${body}
    `;
  }

  /* ---------------- DETAIL DRAWER ---------------- */
  const DLBL = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];

  // Tabla semanal de schedule (reusa clases del Pool: rsd-tbl / entrev-sched-*)
  function schedRows(s){
    const daysSet = new Set(s.daysOn);
    const isPH = s.modLbl==='Por horas';
    return DLBL.map((dlbl,di)=>{
      const on = daysSet.has(di);
      if(!on){
        return `<div class="rsd-tbl-row off"><div class="rsd-day">${dlbl}</div><div><span class="rsd-pill rsd-pill-off">No<br>disponible</span></div><div class="rsd-time off">—</div><div><span class="rsd-pill rsd-pill-off">No<br>aplica</span></div><div class="rsd-cnt off">0</div></div>`;
      }
      return `<div class="rsd-tbl-row"><div class="rsd-day on">${dlbl}</div><div>${isPH?`<span class="rsd-pill rsd-pill-tmp">Por<br>bloques</span>`:`<span class="rsd-pill rsd-pill-freq">Cada<br>semana</span>`}</div><div class="rsd-time">${s.start} – ${s.end}</div><div><span class="rsd-pill rsd-pill-req" style="background:rgba(31,168,74,.14);color:#1F8F50">Disponible</span></div><div class="rsd-cnt on">${s.hours}h</div></div>`;
    }).join('');
  }
  function modKeyOf(mod){ return mod==='Por horas'?'ph':(mod==='Medio tiempo'?'mt':'tc'); }

  // Disponibilidad horaria (fija o flexible) — Laboral
  function renderBlSched(p, opts){
    const pool = opts && opts.pool;
    const s = p.sched, mk = modKeyOf(s.modLbl);
    const total = s.daysOn.length * s.hours;
    const daysLbl = s.daysOn.map(i=>DLBL[i]).join(', ');
    const flex = p.flex;
    return `
      <div class="dr-section">
        <div class="entrev-section-h" style="padding-bottom:8px">
          <span class="ic" data-mod="${mk}"><span class="mi">event_available</span></span>
          <h4 style="margin:0">${flex ? 'Disponibilidad horaria deseada' : 'Disponibilidad horaria fija'}</h4>
          ${flex
            ? `<span class="entrev-sched-flex-pill"><span class="mi">swap_horiz</span>Flexible</span>`
            : `<span class="entrev-sched-flex-pill noflex"><span class="mi">lock</span>Horario fijo</span>`}
        </div>
        ${flex
          ? `<div class="entrev-sched-flex-note">
              <span class="mi">info</span>
              <div>Este es el horario que el colaborador eligió como <strong>ideal</strong>, pero indicó estar <strong>abierto a flexibilidad</strong>: el hotel podía ajustarlo a otros días u horarios dentro de la misma modalidad según la operación.</div>
            </div>`
          : `<div class="entrev-sched-flex-note noflex">
              <span class="mi">lock</span>
              <div>${pool
                ? 'Es <strong>colaborador fijo</strong> — su horario quedó bloqueado tras 7 días consecutivos. Es el schedule que opera actualmente en su hotel.'
                : 'Era <strong>colaborador fijo</strong> del hotel — su horario quedó bloqueado tras 7 días consecutivos. Es el schedule que operaba antes de su ingreso a Blacklist.'}</div>
            </div>`}
        <div class="entrev-sched-card open" data-mod="${mk}">
          <div class="entrev-sched-h">
            <div class="entrev-sched-ic"><span class="mi">schedule</span></div>
            <div class="entrev-sched-info">
              <div class="nm">${s.modLbl} · ${s.hours}h/día</div>
              <div class="det">${s.conLbl} · ${s.daysOn.length} día${s.daysOn.length===1?'':'s'} a la semana · ${total}h totales</div>
            </div>
            <span class="entrev-sched-pill">${daysLbl}</span>
          </div>
          <div class="entrev-sched-body" style="display:block">
            <div class="rsd-tbl entrev-sched-tbl">
              <div class="rsd-tbl-head"><div>Día</div><div>Frecuencia</div><div>Horario</div><div>Estado</div><div>Horas</div></div>
              ${schedRows(s)}
            </div>
          </div>
        </div>
      </div>`;
  }

  // Mini-card del schedule asignado por el hotel (reusa dr-asg-sched)
  function scheduleMini(a, flex){
    const mk = modKeyOf(a.modLbl);
    const total = a.daysOn.length * a.hours;
    const daysLbl = a.daysOn.map(i=>DLBL[i]).join(', ');
    const matchNote = flex
      ? `<div class="dr-asg-note warn" style="margin:8px 0 10px"><span class="mi">swap_horiz</span><div><strong>El hotel ajustó el schedule de la cobertura.</strong> Como su horario es <strong>flexible</strong>, la operación movió días u horas — manteniéndose dentro de la misma modalidad <strong>${a.modLbl.toLowerCase()}</strong> — para encajar con la necesidad del hotel.</div></div>`
      : `<div class="dr-asg-note ok" style="margin:8px 0 10px"><span class="mi">check_circle</span><div><strong>El hotel respetó el schedule del colaborador.</strong> Como su horario es <strong>fijo</strong>, la cobertura mantuvo exactamente los mismos días y horas que indicó en su app.</div></div>`;
    return `
      <div class="dr-asg-sched" data-accent="${flex?'warn':'match'}">
        <div class="dr-asg-sched-eyebrow">Schedule asignado · por ${a.h}</div>
        <div class="dr-asg-sched-title">${flex?'Horario flexible':'Horario fijo'} · operado por el hotel</div>
        ${matchNote}
        <div class="entrev-sched-card open" data-mod="${mk}" style="margin-top:8px">
          <div class="entrev-sched-h">
            <div class="entrev-sched-ic"><span class="mi">schedule</span></div>
            <div class="entrev-sched-info">
              <div class="nm">${a.modLbl} · ${a.hours}h/día</div>
              <div class="det">${a.conLbl} · ${a.daysOn.length} día${a.daysOn.length===1?'':'s'} a la semana · ${total}h totales</div>
            </div>
            <span class="entrev-sched-pill">${daysLbl}</span>
          </div>
          <div class="entrev-sched-body" style="display:block">
            <div class="rsd-tbl entrev-sched-tbl">
              <div class="rsd-tbl-head"><div>Día</div><div>Frecuencia</div><div>Horario</div><div>Estado</div><div>Horas</div></div>
              ${schedRows(a)}
            </div>
          </div>
        </div>
      </div>`;
  }

  // Asignación actual reportada + hoteles previos (Historial)
  function renderBlAsignacion(p){
    const a = p.asg;
    const eyebrow = p.auto ? 'Hotel al momento de las inasistencias' : 'Hotel al momento del reporte';
    const noteIc = p.auto ? 'event_busy' : 'flag';
    const noteTxt = p.auto
      ? 'El colaborador acumuló <strong>3 inasistencias</strong> en este hotel, lo que disparó su ingreso <strong>automático</strong> a Blacklist.'
      : `El hotel reportó una <strong>falta grave</strong> en este hotel; el Inspector de zona validó el caso y lo escaló a Blacklist.`;
    const prev = p.prevHoteles;
    const prevSection = prev.length ? `
      <div class="dr-section">
        <div class="dr-section-title">Hoteles donde ha trabajado</div>
        <div class="dr-history">
          ${prev.map(hh=>`<div class="dr-history-row"><div class="h-ic"><span class="mi">hotel</span></div><div class="h-meta"><div class="h-name">${hh.h}</div><div class="h-sub">${hh.role} · Zona ${p.zona}</div></div><div class="h-date">${hh.from} → ${hh.to}<span class="badge" style="visibility:hidden">_</span></div></div>`).join('')}
        </div>
      </div>` : `
      <div class="dr-section">
        <div class="dr-section-title">Hoteles donde ha trabajado</div>
        <div style="padding:24px 18px;text-align:center;color:var(--ink-3);background:#fff;border:1px solid var(--line);border-radius:12px">
          <span class="mi" style="font-size:36px;color:var(--ink-4)">hotel</span>
          <div style="margin-top:6px;font-size:13px;font-weight:600;color:rgb(83,59,23)">Sin hoteles previos</div>
          <div style="margin-top:3px;font-size:11.5px;color:var(--ink-3)">${a.h} fue su única plaza en la plataforma.</div>
        </div>
      </div>`;
    return `
      <div class="dr-section dr-asg-onebox">
        <div class="dr-section-title">Asignación actual reportada</div>
        <div class="dr-asg-current" style="--card-st:${M_COLOR[p.m]}">
          <div class="dr-asg-current-ic"><span class="mi">hotel</span></div>
          <div class="dr-asg-current-txt">
            <div class="dr-asg-current-eyebrow">${eyebrow}</div>
            <div class="dr-asg-current-hotel">${a.h}</div>
            <div class="dr-asg-current-meta">${a.role} · zona <strong>${p.zona}</strong> · desde ${a.from}</div>
            <div class="dr-asg-current-pills">
              <span class="dr-asg-pill dr-asg-pill-curr"><span class="mi">push_pin</span>Reportada</span>
              <span class="dr-asg-pill"><span class="mi">workspace_premium</span>Colaborador fijo</span>
            </div>
          </div>
        </div>
        <div class="dr-asg-note warn">
          <span class="mi">${noteIc}</span>
          <div>${noteTxt}</div>
        </div>
        ${scheduleMini(a, p.flex)}
      </div>
      ${prevSection}`;
  }

  // Documentos (6/6 recibidos) — reusa entrev-docs-list del Pool
  function renderBlDocsList(){
    const ITEMS = [
      {name:'CV / Currículum',          ic:'description',  sub:'Precargado automáticamente desde el alta del reclutador · PDF · 420 KB', optional:false},
      {name:'SSN',                      ic:'badge',        sub:'Social Security Number · 180 KB', optional:false},
      {name:'ITIN',                     ic:'description',  sub:'Individual Taxpayer Identification · 180 KB', optional:true },
      {name:'Foto del colaborador',     ic:'photo_camera', sub:'Imagen reciente · JPG/PNG · 1.2 MB', optional:false},
      {name:'Comprobante de domicilio', ic:'home',         sub:'Recibo de servicios reciente (≤3 meses) · PDF/JPG · 540 KB', optional:false},
      {name:'Comprobante o diploma',    ic:'school',       sub:'Documento opcional subido por el colaborador · 860 KB', optional:true },
    ];
    return `
      <div class="dr-section">
        <div class="entrev-section-h" style="padding-bottom:8px">
          <h4 style="margin:0">Documentos</h4>
          <span class="pill"><span class="mi">attach_file</span>${ITEMS.length}/${ITEMS.length} recibidos</span>
        </div>
        <div class="entrev-docs-list">
          ${ITEMS.map(it=>`
            <div class="entrev-doc-row done">
              <div class="ic"><span class="mi">${it.ic}</span></div>
              <div class="txt">
                <div class="nm">${it.name}${it.optional?' <span class="entrev-doc-opt">OPCIONAL</span>':''}</div>
                <div class="sub">${it.sub}</div>
              </div>
              <span class="stat"><span class="mi">check_circle</span>Recibido</span>
              <button class="act" title="Ver" onclick="window.toast&&window.toast('Vista previa de ${it.name}','visibility')"><span class="mi">visibility</span></button>
              <button class="act" title="Descargar" onclick="window.toast&&window.toast('Descargando ${it.name}','download')"><span class="mi">download</span></button>
            </div>`).join('')}
        </div>
      </div>`;
  }

  // Historial de actividad (timeline) con contexto de blacklist — Datos
  function renderBlActividad(p){
    const items = [];
    items.push({ when:'7 días completados (Fijo)', what:`<strong>Fecha:</strong> ${p.asg.from}-02-10 · <strong>Responsable:</strong> Sistema · <strong>Comentario:</strong> "Transición automática. ${p.nm} se convierte en colaborador fijo del ${p.asg.h}."` });
    if(p.auto && p.faltas){
      p.faltas.forEach((f,i)=>{
        items.push({ when:`Inasistencia ${i+1} de 3`, what:`<strong>Fecha:</strong> ${f.d} · <strong>Responsable:</strong> Sistema · <strong>Hotel:</strong> ${p.asg.h} · <strong>Comentario:</strong> "${f.s}"` });
      });
      items.push({ when:'Ingreso a Blacklist', what:`<strong>Fecha:</strong> ${p.fecha} · <strong>Responsable:</strong> Sistema · <strong>Comentario:</strong> "3ª inasistencia sin justificar — escalamiento automático a Blacklist (estado Negro)."` });
    } else {
      items.push({ when:'Reporte del hotel', what:`<strong>Fecha:</strong> ${p.fecha} · <strong>Responsable:</strong> ${p.reporter.name} (${p.reporter.role}) · <strong>Hotel:</strong> ${p.hotel} · <strong>Comentario:</strong> "Falta grave reportada en la operación."` });
      items.push({ when:'Investigación · Inspector', what:`<strong>Responsable:</strong> ${p.inspector} (Inspector de zona) · <strong>Comentario:</strong> "Caso investigado y validado a favor del hotel."` });
      items.push({ when:'Ingreso a Blacklist', what:`<strong>Fecha:</strong> ${p.fecha} · <strong>Responsable:</strong> ${p.regName ? `${p.regName} (${p.regRole})` : 'Sistema'} · <strong>Comentario:</strong> "Veto permanente · estado Negro · sin apelación."` });
    }
    return `
      <div class="dr-section">
        <div class="dr-section-title">Historial</div>
        <div class="req-info-list" style="padding:8px 12px">
          ${items.map(it=>`<div class="req-tl-item" style="padding:7px 0"><div class="when">${it.when}</div><div class="what">${it.what}</div></div>`).join('')}
        </div>
      </div>`;
  }

  function renderDrawer(){
    const drw = document.getElementById('bl-drawer');
    const root = document.getElementById('bl-root');
    if(!drw) return;
    const p = PEOPLE.find(x=>x.id===state.selected);
    if(!p){ drw.classList.remove('open'); if(root) root.classList.remove('drawer-open'); return; }
    const m = MOTIVOS[p.m];

    const tab = state.drawerTab || 'datos';

    // ---------- TAB: Datos ----------
    const datosHTML = `
      <div class="dr-section">
        <div class="dr-section-title"><span class="mi">badge</span>Datos del candidato</div>
        <div class="entrev-detail-grid" style="margin:0">
          <div class="entrev-detail-row" data-c="ssn">
            <div class="ic"><span class="mi">badge</span></div>
            <div class="txt"><div class="lbl">SSN</div><div class="val">${p.ssn}</div></div>
            <span class="stat-tag legal"><span class="mi">verified</span>Legal</span>
          </div>
          <div class="entrev-detail-row" data-c="edad"><div class="ic"><span class="mi">cake</span></div><div class="txt"><div class="lbl">Edad</div><div class="val">${p.edad} años</div></div></div>
          <div class="entrev-detail-row" data-c="genero"><div class="ic"><span class="mi">${p.genero==='Femenino'?'female':'male'}</span></div><div class="txt"><div class="lbl">Género</div><div class="val">${p.genero}</div></div></div>
          <div class="entrev-detail-row" data-c="phone"><div class="ic"><span class="mi">phone</span></div><div class="txt"><div class="lbl">Teléfono</div><div class="val">${p.tel}</div></div></div>
          <div class="entrev-detail-row full" data-c="correo"><div class="ic"><span class="mi">email</span></div><div class="txt"><div class="lbl">Correo electrónico</div><div class="val">${p.correo}</div></div></div>
          <div class="entrev-detail-row full" data-c="domicilio"><div class="ic"><span class="mi">home</span></div><div class="txt"><div class="lbl">Domicilio</div><div class="val">${p.dom}</div></div></div>
        </div>
      </div>
      <div class="dr-section">
        <div class="entrev-section-h" style="padding-bottom:8px">
          <h4 style="margin:0">Datos de emergencia</h4>
          <span class="pill"><span class="mi">lock</span>Solo lectura</span>
        </div>
        <div class="entrev-emerg-note"><span class="mi">info</span><div>El colaborador proporcionó estos datos en su app durante el onboarding. La información es <strong>de solo lectura</strong>.</div></div>
        <div class="entrev-emerg-card">
          <div class="entrev-emerg-row" data-c="contact"><div class="ic"><span class="mi">contact_emergency</span></div><div class="txt"><div class="lbl">Contacto de emergencia</div><div class="val">${p.emerg.contacto}<span class="sub">${p.emerg.tel}</span></div></div></div>
          <div class="entrev-emerg-row" data-c="blood"><div class="ic"><span class="mi">bloodtype</span></div><div class="txt"><div class="lbl">Tipo de sangre</div><div class="val">${p.emerg.sangre}</div></div></div>
          <div class="entrev-emerg-row" data-c="aller"><div class="ic"><span class="mi">medication</span></div><div class="txt"><div class="lbl">Alergias o condiciones</div><div class="val">${p.emerg.alergias}</div></div></div>
        </div>
      </div>
      ${renderBlActividad(p)}`;

    // ---------- TAB: Laboral ----------
    const laboralHTML = `
      <div class="dr-section">
        <div class="dr-section-title"><span class="mi">work_outline</span>Datos laborales</div>
        <div class="entrev-detail-grid" style="margin:0">
          <div class="entrev-detail-row" data-c="pos"><div class="ic"><span class="mi">work</span></div><div class="txt"><div class="lbl">Posición</div><div class="val">${p.pos}</div></div></div>
          <div class="entrev-detail-row" data-c="zone"><div class="ic"><span class="mi">place</span></div><div class="txt"><div class="lbl">Zona</div><div class="val">${p.zona}</div></div></div>
          <div class="entrev-detail-row" data-c="mod"><div class="ic"><span class="mi">schedule</span></div><div class="txt"><div class="lbl">Modalidad</div><div class="val">${p.mod}</div></div></div>
          <div class="entrev-detail-row" data-c="origen"><div class="ic"><span class="mi">${p.origen==='Referido'?'group':p.origen==='Búsqueda activa'?'campaign':'share'}</span></div><div class="txt"><div class="lbl">Origen</div><div class="val">${p.origen}</div></div></div>
          <div class="entrev-detail-row" data-c="lang"><div class="ic"><span class="mi">translate</span></div><div class="txt"><div class="lbl">Nivel de inglés</div><div class="val">${p.engLbl}</div></div></div>
          <div class="entrev-detail-row" data-c="exp"><div class="ic"><span class="mi">workspace_premium</span></div><div class="txt"><div class="lbl">Experiencia</div><div class="val">${p.exp}</div></div></div>
          <div class="entrev-detail-row full" data-c="transp"><div class="ic"><span class="mi">directions_car</span></div><div class="txt"><div class="lbl">Tipo de transporte</div><div class="val">${p.transp}</div></div></div>
        </div>
      </div>
      ${renderBlSched(p)}`;

    // ---------- TAB: Historial de asignaciones ----------
    const histHTML = renderBlAsignacion(p);

    // ---------- TAB: Documentos ----------
    const docsHTML = renderBlDocsList();

    // ---------- TAB: Blacklist (motivo + ingreso + permanencia) ----------
    const MC = M_COLOR[p.m];
    // En faltas graves se muestra el tipo específico (robo, agresión, etc.) y su detalle.
    const motIc    = p.m==='grave' && p.gt ? p.gt.ic   : m.ic;
    const motTitle = p.m==='grave' && p.gt ? `Falta grave · ${p.gt.lbl}` : m.full;
    const motDesc  = p.m==='grave' && p.gt ? p.gt.desc : m.desc;
    const blacklistHTML = `
      <div class="dr-section">
        <div class="dr-section-title"><span class="mi">report</span>Motivo del veto</div>
        <div class="dr-asg-current" style="--card-st:${MC};border-left-color:#1A1108">
          <div class="dr-asg-current-ic" style="background:color-mix(in srgb, ${MC} 15%, #fff);color:${MC}"><span class="mi">${motIc}</span></div>
          <div class="dr-asg-current-txt">
            <div class="dr-asg-current-eyebrow" style="color:${MC}">${m.sev}</div>
            <div class="dr-asg-current-hotel">${motTitle}</div>
            <div class="dr-asg-current-meta">${motDesc}</div>
          </div>
        </div>
      </div>
      ${p.nota ? `<div class="dr-section">
        <div class="dr-section-title"><span class="mi">notes</span>Justificación</div>
        <div class="bl-just-card">${(p.nota||'').replace(/</g,'&lt;')}</div>
      </div>` : ''}
      ${(p.pruebas && p.pruebas.length) ? `<div class="dr-section">
        <div class="dr-section-title"><span class="mi">attach_file</span>Pruebas / evidencia</div>
        <div class="entrev-rej-files">${p.pruebas.map(f=>`<div class="entrev-rej-file"><span class="fic"><span class="mi">description</span></span><span class="nm">${f}</span><span class="sz">${f.endsWith('.pdf')?'320 KB':'1.2 MB'}</span></div>`).join('')}</div>
      </div>` : ''}
      <div class="dr-section">
        <div class="dr-section-title"><span class="mi">event_available</span>Ingreso a blacklist</div>
        <div class="entrev-detail-grid" style="margin:0 0 16px">
          ${p.auto
            ? `<div class="entrev-detail-row full"><div class="ic"><span class="mi">bolt</span></div><div class="txt"><div class="lbl">Origen del registro</div><div class="val">Escalamiento automático del sistema</div></div></div>
               <div class="entrev-detail-row full"><div class="ic"><span class="mi">calendar_today</span></div><div class="txt"><div class="lbl">Fecha de ingreso</div><div class="val">${p.fecha}</div></div></div>`
            : `<div class="entrev-detail-row"><div class="ic"><span class="mi">apartment</span></div><div class="txt"><div class="lbl">Hotel donde ocurrió</div><div class="val">${p.hotel}</div></div></div>
               <div class="entrev-detail-row"><div class="ic"><span class="mi">calendar_today</span></div><div class="txt"><div class="lbl">Fecha de ingreso</div><div class="val">${p.fecha}</div></div></div>`}
        </div>
        <div class="entrev-section-h" style="padding-bottom:8px">
          <h4 style="margin:0">${p.auto?'Registro':'Responsables'}</h4>
        </div>
        <div class="entrev-emerg-card">
          ${p.auto
            ? `<div class="entrev-emerg-row"><div class="ic"><span class="mi">bolt</span></div><div class="txt"><div class="lbl">Registrado por</div><div class="val">Sistema Oranje<span class="sub">Escalamiento automático · 3ª inasistencia</span></div></div></div>`
            : `<div class="entrev-emerg-row"><div class="ic"><span class="mi">flag</span></div><div class="txt"><div class="lbl">Reportado por</div><div class="val">${p.reporter.name}<span class="sub">${p.reporter.role} · ${p.hotel}</span></div></div></div>
               ${p.manual
                 ? `<div class="entrev-emerg-row"><div class="ic"><span class="mi">how_to_reg</span></div><div class="txt"><div class="lbl">Investigado y vetado por</div><div class="val">${p.vetadaPor}<span class="sub">${p.vetadaPorRol} · aprobó y registró el veto</span></div></div></div>`
                 : `<div class="entrev-emerg-row"><div class="ic"><span class="mi">how_to_reg</span></div><div class="txt"><div class="lbl">Investigado y resuelto por</div><div class="val">${p.inspector}<span class="sub">Inspector de zona · Zona ${p.zona}</span></div></div></div>`}`}
        </div>
      </div>
      <div class="dr-section">
        <div class="dr-blacklist-card danger">
          <div class="dr-bl-ic"><span class="mi">block</span></div>
          <div class="dr-bl-txt"><div class="ttl">Estado Negro · veto permanente</div><div class="meta">No existe proceso de rehabilitación ni instancia de apelación. El registro se conserva íntegro para consulta interna y <strong>no aparece en búsquedas activas</strong> de reclutamiento.</div></div>
        </div>
      </div>`;

    const bodyHTML = tab==='laboral' ? laboralHTML : tab==='historial' ? histHTML : tab==='docs' ? docsHTML : tab==='blacklist' ? blacklistHTML : datosHTML;
    const tabs = [['datos','Datos','badge'],['laboral','Laboral','work_outline'],['historial','Historial','history'],['docs','Documentos','description'],['blacklist','Blacklist','block']];

    drw.innerHTML = `
      <div class="recl-drawer-head bl-drawer-headv2">
        <div class="recl-drawer-close" onclick="window.__blClose()"><span class="mi">close</span></div>
        <div class="recl-drawer-id">
          ID ${p.id}
          <span class="recl-st-pill"><span class="dot" style="background:#1A1108"></span>Vetado · Blacklist</span>
          <span class="recl-st-pill"><span class="dot" style="background:${M_COLOR[p.m]}"></span>${m.lbl}</span>
        </div>
        <div class="recl-drawer-name-row">
          <div class="recl-avatar bl-veto-av" style="--card-st:${M_COLOR[p.m]};background:${av(p.nm)}">${ini(p.nm)}<span class="recl-st-ring" style="border-width:3px"></span><span class="bl-av-blk"><span class="mi">block</span></span></div>
          <div>
            <div class="recl-drawer-name">${p.nm}</div>
            <div class="recl-drawer-meta">
              <span class="recl-meta-item"><span class="mi">work_outline</span>${p.pos}</span>
              <span class="recl-meta-sep"></span>
              <span class="recl-meta-item"><span class="mi">place</span>${p.zona}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="recl-drawer-tabs-wrap">
        <div class="recl-drawer-tabs">
          ${tabs.map(t=>`<div class="recl-drawer-tab ${tab===t[0]?'active':''}" onclick="window.__blSetTab('${t[0]}')"><span class="mi">${t[2]}</span>${t[1]}</div>`).join('')}
        </div>
        <button class="recl-drawer-tabs-arrow hidden" onclick="window.__blTabsScroll(this)" aria-label="Ver más pestañas" title="Ver más pestañas"><span class="mi">chevron_right</span></button>
      </div>
      <div class="recl-drawer-body">${bodyHTML}</div>
    `;
    drw.classList.add('open');
    if(root) root.classList.add('drawer-open');
    // Tabs con overflow: muestra/oculta la flecha "ver más" y deja visible la pestaña activa.
    (()=>{
      const tabsEl = drw.querySelector('.recl-drawer-tabs');
      const arrowEl = drw.querySelector('.recl-drawer-tabs-arrow');
      if(!tabsEl) return;
      const upd = ()=>{
        if(!arrowEl) return;
        const more = (tabsEl.scrollWidth - tabsEl.clientWidth - tabsEl.scrollLeft) > 4;
        arrowEl.classList.toggle('hidden', !more);
      };
      tabsEl.addEventListener('scroll', upd);
      const act = tabsEl.querySelector('.recl-drawer-tab.active');
      if(act){
        const target = act.offsetLeft + act.offsetWidth - tabsEl.clientWidth + 16;
        if(target > 0) tabsEl.scrollLeft = target;
      }
      requestAnimationFrame(upd);
    })();
  }

  /* ---------------- POOL PROFILE (Ver perfil) ----------------
     Perfil completo de un colaborador del pool, ANTES de vetarlo.
     Reusa los mismos tabs y componentes que el detalle del Pool de
     Reclutamiento (Datos · Laboral · Historial · Documentos) y es
     coherente con la semaforización del colaborador. */
  const HOTELES_BL = (typeof HOTELES!=='undefined') ? HOTELES : ['Costa del Sol','Las Palmas','Marea Azul','Bahía Príncipe','Vista Mar','Puerto Sereno'];

  function enrichPool(x){
    const role = x.pos.split(' · ')[0];
    const zm = x.pos.match(/Zona\s+(.+)$/); const zona = zm ? zm[1].trim() : 'Centro';
    const hh = hashStr(x.nm + x.doc);
    const mod = MODS[hh % 3];
    const fn = noAcc(x.nm).split(' ');
    const pp = {
      nm:x.nm, doc:x.doc, st:x.st, cid:'ID-' + String(2000 + (hh % 7999)),
      pos:role, zona, mod,
      tel:'+52 322 ' + (100 + (hh % 900)) + ' ' + (1000 + (hh % 9000)),
      edad: 22 + (hh % 27),
      genero: (/a$/.test(x.nm.split(' ')[0]) || FEM.includes(x.nm.split(' ')[0])) ? 'Femenino' : 'Masculino',
      correo: fn[0] + '.' + (fn[1] || fn[0]) + '@gmail.com',
      dom: CALLES[hh % CALLES.length] + ' ' + (20 + (hh % 180)),
      ssn: String(1000 + (hh % 8999)),
      emerg: { contacto:EMERG[hh % EMERG.length], tel:'+52 322 ' + (100 + ((hh>>1) % 900)) + ' ' + (1000 + ((hh>>1) % 9000)), sangre:SANGRE[hh % SANGRE.length], alergias:ALERG[(hh>>3) % ALERG.length] },
      origen: ORIGENES[(hh>>2) % ORIGENES.length],
      engLbl: ENGL[(hh>>4) % ENGL.length],
      exp: EXPS[(hh>>5) % EXPS.length],
      transp: TRANSP[(hh>>6) % TRANSP.length],
    };
    const MODHRS = { 'Tiempo completo':8, 'Medio tiempo':5, 'Por horas':4 };
    const MODST  = { 'Tiempo completo':'07:00', 'Medio tiempo':'08:00', 'Por horas':'16:00' };
    const MODEN  = { 'Tiempo completo':'15:00', 'Medio tiempo':'13:00', 'Por horas':'20:00' };
    const hrs = MODHRS[mod] || 8;
    const days = mod==='Por horas' ? [1,3,5] : (mod==='Medio tiempo' ? [0,1,2,3,4] : [0,1,2,3,4,5].slice(0, 5 + (hh % 2)));
    pp.flex = (hh % 2) === 0;
    pp.sched = { modLbl:mod, hours:hrs, start:MODST[mod], end:MODEN[mod], conLbl: pp.flex ? 'Flexible' : 'Fijo', daysOn:days };
    const nH = 1 + (hh % 3);
    pp.hist = Array.from({length:nH}, (_,i)=>{ const h2 = hashStr(x.doc + i); const yr = 2022 + (h2 % 4); return { h:HOTELES_BL[h2 % HOTELES_BL.length], role, from:String(yr), to: i===0 ? 'Actual' : String(yr + 1) }; });
    pp.asg = { h:pp.hist[0].h, role, from:pp.hist[0].from, hours:hrs, start:pp.sched.start, end:pp.sched.end, daysOn:days, modLbl:mod, conLbl:pp.sched.conLbl };
    return pp;
  }

  // Cómo se presenta la "Asignación / situación actual" según el semáforo.
  // cur: true = hotel actual · 'last' = última asignación · false = sin asignación activa
  const POOL_STATE_DESC = {
    blanco:  { cur:false, ic:'pending',            eyebrow:'Sin asignación',          title:'Pre-asignación',            pill:'Listo para asignar',     note:'Completó su onboarding y está listo para ser asignado, pero aún no tiene una plaza activa.' },
    verdef:  { cur:false, ic:'check_circle',       eyebrow:'Disponible',              title:'Disponible para cobertura', pill:'Disponible',             note:'Está disponible en el pool. No tiene una asignación activa en este momento.' },
    amarillo:{ cur:false, ic:'volunteer_activism', eyebrow:'Disponibilidad voluntaria', title:'Se ofreció como disponible', pill:'Disp. voluntario',     note:'Activó su disponibilidad voluntaria desde su app. Puede cubrir según solicitud del hotel.' },
    rosa:    { cur:false, ic:'pause_circle',       eyebrow:'Stand by',                title:'En stand by',               pill:'Stand by',               note:'Pausó temporalmente su disponibilidad desde su app. No tiene asignación activa.' },
    verdem:  { cur:true,  ic:'hourglass_top', tone:'ok',   eyebrow:'Hotel actual',        pill:'Onboarding D1-2',        note:'Está en sus primeros días de onboarding (D1-2) en el hotel asignado.' },
    azul:    { cur:true,  ic:'badge',         tone:'ok',   eyebrow:'Hotel actual',        pill:'Día 3+ uniforme',        note:'Día 3+ con uniforme. Ya está operando en el hotel asignado.' },
    naranja: { cur:true,  ic:'workspace_premium', tone:'ok', eyebrow:'Hotel actual',      pill:'Colaborador fijo',       note:'Colaborador fijo del hotel — su horario quedó bloqueado tras 7 días consecutivos.' },
    cafe:    { cur:true,  ic:'schedule',      tone:'warn', eyebrow:'Asignación temporal', pill:'Cobertura temporal',     note:'Cubre una plaza de forma temporal, según solicitud del hotel.' },
    gris:    { cur:true,  ic:'healing',       tone:'warn', eyebrow:'Hotel actual',        pill:'Accidentado',            note:'En incapacidad médica por un accidente laboral. Conserva su plaza y queda protegido de la regla de 3 inasistencias.' },
    morado:  { cur:'last', ic:'event_busy',   tone:'warn', eyebrow:'Última asignación',   pill:'No regresó',             note:'No regresó a su última asignación. Acumula inasistencias; a la 3.ª sin justificar escalaría a Blacklist automáticamente.' },
    rojo:    { cur:'last', ic:'flag',         tone:'warn', eyebrow:'Hotel del reporte',   pill:'Reportado · en revisión', note:'Tiene un reporte abierto del hotel, en revisión por el Inspector de zona. Aún NO está vetado.' },
  };

  // Sección "Vacaciones" — calcula los días que le corresponden por ley (LFT)
  // según su antigüedad y el próximo periodo vacacional desde su fecha de
  // ingreso. Datos sintéticos deterministas; "Hoy" = jun 2026. Espejo de la
  // misma sección en el detalle del Pool de Reclutamiento.
  function poolVacacionesSection(pp){
    const MES_AB = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    const fem = /a$/i.test((pp.nm||'').split(' ')[0]||'');
    const hh = hashStr(pp.nm + pp.doc);
    const NOW = { m:5, y:2026 };
    // El colaborador fijo tiende a más antigüedad; el resto, menos.
    const antY = (pp.st==='naranja' ? 4 : 1) + (hh % (pp.st==='naranja' ? 6 : 9));
    const ingMonth = (hh >> 3) % 12;
    const ingreso = MES_AB[ingMonth] + ' ' + (NOW.y - antY);
    const lftDays = antY<=5 ? 12 + (antY-1)*2 : 20 + Math.ceil((antY-5)/5)*2;
    const prox = MES_AB[ingMonth] + ' ' + ((ingMonth <= NOW.m) ? NOW.y+1 : NOW.y);
    const row = (ic,lbl,val,full)=> `<div class="entrev-detail-row${full?' full':''}"><div class="ic"><span class="mi">${ic}</span></div><div class="txt"><div class="lbl">${lbl}</div><div class="val">${val}</div></div></div>`;
    return `<div class="dr-section dr-vac-section">
      <div class="dr-section-title">Vacaciones</div>
      <div class="dr-vol-context" style="margin-bottom:10px">
        <span class="mi">beach_access</span>
        <div>Como ${fem?'la colaboradora':'el colaborador'} está <strong>asignad${fem?'a':'o'} de forma fija</strong>, acumula antigüedad y le corresponden <strong>vacaciones de ley</strong>, calculadas desde su fecha de ingreso a la operación.</div>
      </div>
      <div class="entrev-detail-grid">
        ${row('login','Fecha de ingreso', ingreso)}
        ${row('timelapse','Antigüedad', antY + (antY===1?' año':' años'))}
        ${row('beach_access','Días por ley · al año', lftDays + ' días')}
        ${row('event','Próximo periodo vacacional', prox, true)}
      </div>
    </div>`;
  }

  // Fila de historial EXPANDIBLE (acordeón) — mismo componente que el tab
  // "Historial de asignaciones" del Pool de Reclutamiento (histAccRow): summary
  // con hotel / posición / periodo + detalle desplegable con tipo de contrato,
  // horario y modalidad. Reusa dr-hist-acc / dr-hist-sum / dr-hist-detail.
  function poolHistAccRow(pp, hh, isCurr){
    const DOW = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
    const daysFmt = (arr)=>{ if(!arr||!arr.length) return ''; const s=[...arr].sort((x,y)=>x-y); let cg=true; for(let i=1;i<s.length;i++) if(s[i]!==s[i-1]+1){cg=false;break;} return (cg&&s.length>1)?`${DOW[s[0]]}–${DOW[s[s.length-1]]}`:s.map(i=>DOW[i]).join(', '); };
    const row = (ic,lbl,val,full)=> val ? `<div class="entrev-detail-row${full?' full':''}"><div class="ic"><span class="mi">${ic}</span></div><div class="txt"><div class="lbl">${lbl}</div><div class="val">${val}</div></div></div>` : '';
    const sc = pp.sched || {};
    const dias = daysFmt(sc.daysOn);
    const horario = (sc.start && sc.end) ? `${sc.start}–${sc.end}${sc.hours?` · ${sc.hours}h`:''}` : '—';
    const noFlex = !pp.flex;
    const isTemp = isCurr && pp.st==='cafe';
    const contrato = isTemp ? 'Temporal' : 'Fijo';
    const flexLbl = noFlex ? 'Horario fijo inamovible' : 'Flexible dentro de los días y modalidad';
    const estado = isTemp ? 'Cobertura temporal · vigente'
      : isCurr ? 'Asignación actual · vigente'
      : 'Asignación anterior · finalizada';
    const dateBadge = isCurr ? '<span class="badge curr">Actual</span>' : '<span class="badge" style="visibility:hidden">_</span>';
    const detail = `<div class="dr-hist-detail">
      <div class="entrev-detail-grid">
        ${row('work_outline','Posición', hh.role)}
        ${row('badge','Tipo de contrato', contrato)}
        ${row('calendar_month', isCurr?'Vigencia':'Periodo', hh.from+' → '+hh.to, true)}
        ${row('history','Estado', estado, true)}
      </div>
      <div class="dr-section-title dr-hd-title">Horario y modalidad</div>
      <div class="entrev-detail-grid">
        ${dias ? row('event_repeat','Días', dias) : ''}
        ${row('schedule','Horario', horario)}
        ${row('work_history','Modalidad', sc.modLbl||pp.mod)}
        ${sc.conLbl ? row('assignment_turned_in','Tipo', sc.conLbl) : ''}
        ${row(noFlex?'lock':'lock_open','Flexibilidad', flexLbl, true)}
      </div>
    </div>`;
    return `<details class="dr-history-row dr-hist-acc"${isCurr?' open':''}>
      <summary class="dr-hist-sum">
        <div class="h-ic"><span class="mi">hotel</span></div>
        <div class="h-meta">
          <div class="h-name">${hh.h}</div>
          <div class="h-sub">${hh.role} · Zona ${pp.zona}</div>
        </div>
        <div class="h-date">${hh.from} → ${hh.to}${dateBadge}</div>
        <span class="mi dr-hist-chev">expand_more</span>
      </summary>
      ${detail}
    </details>`;
  }

  function renderPoolHistTab(pp){
    const sm = SEMAFORO[pp.st] || { lbl:'—', color:'#9A8C7E' };
    const d = POOL_STATE_DESC[pp.st] || { cur:false, ic:'info', eyebrow:'Estado', title:sm.lbl, pill:sm.lbl, note:'' };
    const cur = pp.hist[0];
    const hasCurrent = d.cur === true || d.cur === 'last';
    let block;
    if(hasCurrent){
      block = `
        <div class="dr-section dr-asg-onebox">
          <div class="dr-section-title">${d.cur==='last' ? 'Última asignación' : 'Asignación actual'}</div>
          <div class="dr-asg-current" style="--card-st:${sm.color}">
            <div class="dr-asg-current-ic" style="background:color-mix(in srgb, ${sm.color} 16%, #fff);color:${sm.color}"><span class="mi">hotel</span></div>
            <div class="dr-asg-current-txt">
              <div class="dr-asg-current-eyebrow" style="color:${sm.color}">${d.eyebrow}</div>
              <div class="dr-asg-current-hotel">${cur.h}</div>
              <div class="dr-asg-current-meta">${pp.pos} · zona <strong>${pp.zona}</strong> · desde ${cur.from}</div>
              <div class="dr-asg-current-pills">
                <span class="dr-asg-pill dr-asg-pill-curr"><span class="mi">${d.ic}</span>${d.pill}</span>
              </div>
            </div>
          </div>
          ${scheduleMini(pp.asg, pp.flex)}
        </div>`;
    } else {
      block = `
        <div class="dr-section">
          <div class="dr-section-title">Situación actual</div>
          <div class="dr-asg-current" style="--card-st:${sm.color}">
            <div class="dr-asg-current-ic" style="background:color-mix(in srgb, ${sm.color} 16%, #fff);color:${sm.color}"><span class="mi">${d.ic}</span></div>
            <div class="dr-asg-current-txt">
              <div class="dr-asg-current-eyebrow" style="color:${sm.color}">${d.eyebrow}</div>
              <div class="dr-asg-current-hotel">${d.title || sm.lbl}</div>
              <div class="dr-asg-current-meta">${d.note}</div>
              <div class="dr-asg-current-pills"><span class="dr-asg-pill"><span class="mi">${d.ic}</span>${d.pill}</span></div>
            </div>
          </div>
        </div>`;
    }
    const prev = hasCurrent ? pp.hist.slice(1) : pp.hist;
    // amarillo (Disp. voluntaria) conserva su plaza fija y suma su hotel actual
    // a la lista — igual que en el Pool de Reclutamiento, donde el encabezado es
    // "Asignación actual e historial" con un contexto de disponibilidad
    // voluntaria. El resto de estados solo lista hoteles previos.
    const fem = /a$/i.test((pp.nm||'').split(' ')[0]||'');
    const curHotel = (pp.hist.find(h=>h.to==='Actual')||{}).h || '';
    const histTitle = pp.st==='amarillo' ? 'Asignación actual e historial' : 'Hoteles donde ha trabajado';
    const volCtx = pp.st==='amarillo' ? `<div class="dr-vol-context" style="margin-bottom:10px">
          <span class="mi">push_pin</span>
          <div>${fem?'Esta colaboradora':'Este colaborador'} está <strong>fij${fem?'a':'o'} en ${curHotel}</strong>. Activó su <strong>Disp. voluntaria</strong> para cubrir turnos extra en otros hoteles durante su tiempo libre, bajo el horario que ${fem?'ella':'él'} mism${fem?'a':'o'} propuso — puede ser flexible dentro de los días y la modalidad acordados.</div>
        </div>` : '';
    const prevSection = prev.length ? `
      <div class="dr-section">
        <div class="dr-section-title">${histTitle}</div>
        ${volCtx}
        <div class="dr-history">
          ${prev.map(hh=>poolHistAccRow(pp, hh, hh.to==='Actual')).join('')}
        </div>
      </div>` : `
      <div class="dr-section">
        <div class="dr-section-title">Hoteles donde ha trabajado</div>
        <div style="padding:24px 18px;text-align:center;color:var(--ink-3);background:#fff;border:1px solid var(--line);border-radius:12px">
          <span class="mi" style="font-size:36px;color:var(--ink-4)">hotel</span>
          <div style="margin-top:6px;font-size:13px;font-weight:600;color:rgb(83,59,23)">Sin hoteles previos</div>
          <div style="margin-top:3px;font-size:11.5px;color:var(--ink-3)">Aún no registra plazas anteriores en la plataforma.</div>
        </div>
      </div>`;
    // Vacaciones (LFT) — replica la regla exacta del Pool de Reclutamiento:
    //  · Fija con plaza actual (verdem/azul/naranja) y Accidentado (gris) →
    //    ENTRE el schedule y los hoteles previos.
    //  · Disp. voluntaria (amarillo) y Reportado (rojo, salvo Por horas) →
    //    AL FINAL, después de la asignación actual e historial.
    //  · Cobertura temporal (cafe), Última asignación (morado) y los estados
    //    sin asignación activa (blanco/verdef/rosa) → NO muestran Vacaciones.
    const vacBetween = (pp.st==='verdem'||pp.st==='azul'||pp.st==='naranja'||pp.st==='gris') ? poolVacacionesSection(pp) : '';
    const vacEnd = (pp.st==='amarillo' || (pp.st==='rojo' && pp.mod!=='Por horas')) ? poolVacacionesSection(pp) : '';
    return block + vacBetween + prevSection + vacEnd;
  }

  function renderPoolProfile(){
    const drw = document.getElementById('bl-prof-drawer');
    const bg = document.getElementById('bl-prof-bg');
    if(!drw) return;
    const src = state.poolView;
    if(!src){ drw.classList.remove('open'); if(bg) bg.classList.remove('open'); return; }
    const pp = enrichPool(src);
    const sm = SEMAFORO[pp.st] || { lbl:'—', color:'#9A8C7E' };
    const tab = state.poolTab || 'datos';
    // Tag de requisición + modalidad en la cabecera (igual que el Pool de Reclutamiento).
    // Solo los estados con asignación activa muestran el tag de requisición; los
    // estados sin plaza activa (blanco/verdef/amarillo/rosa/morado) no lo llevan.
    const blReq = 'REQ-' + (2450 + (hashStr(pp.nm + pp.doc) % 150));
    const blShowReq = ['verdem','azul','naranja','cafe','gris','rojo'].includes(pp.st);

    const datosHTMLLocal = `
      <div class="dr-section">
        <div class="dr-section-title"><span class="mi">badge</span>Datos del candidato</div>
        <div class="entrev-detail-grid" style="margin:0">
          <div class="entrev-detail-row" data-c="ssn"><div class="ic"><span class="mi">badge</span></div><div class="txt"><div class="lbl">SSN</div><div class="val">${pp.ssn}</div></div><span class="stat-tag legal"><span class="mi">verified</span>Legal</span></div>
          <div class="entrev-detail-row" data-c="edad"><div class="ic"><span class="mi">cake</span></div><div class="txt"><div class="lbl">Edad</div><div class="val">${pp.edad} años</div></div></div>
          <div class="entrev-detail-row" data-c="genero"><div class="ic"><span class="mi">${pp.genero==='Femenino'?'female':'male'}</span></div><div class="txt"><div class="lbl">Género</div><div class="val">${pp.genero}</div></div></div>
          <div class="entrev-detail-row" data-c="phone"><div class="ic"><span class="mi">phone</span></div><div class="txt"><div class="lbl">Teléfono</div><div class="val">${pp.tel}</div></div></div>
          <div class="entrev-detail-row full" data-c="correo"><div class="ic"><span class="mi">email</span></div><div class="txt"><div class="lbl">Correo electrónico</div><div class="val">${pp.correo}</div></div></div>
          <div class="entrev-detail-row full" data-c="domicilio"><div class="ic"><span class="mi">home</span></div><div class="txt"><div class="lbl">Domicilio</div><div class="val">${pp.dom}</div></div></div>
        </div>
      </div>
      <div class="dr-section">
        <div class="entrev-section-h" style="padding-bottom:8px">
          <h4 style="margin:0">Datos de emergencia</h4>
          <span class="pill"><span class="mi">lock</span>Solo lectura</span>
        </div>
        <div class="entrev-emerg-note"><span class="mi">info</span><div>El colaborador proporcionó estos datos en su app durante el onboarding. La información es <strong>de solo lectura</strong>.</div></div>
        <div class="entrev-emerg-card">
          <div class="entrev-emerg-row" data-c="contact"><div class="ic"><span class="mi">contact_emergency</span></div><div class="txt"><div class="lbl">Contacto de emergencia</div><div class="val">${pp.emerg.contacto}<span class="sub">${pp.emerg.tel}</span></div></div></div>
          <div class="entrev-emerg-row" data-c="blood"><div class="ic"><span class="mi">bloodtype</span></div><div class="txt"><div class="lbl">Tipo de sangre</div><div class="val">${pp.emerg.sangre}</div></div></div>
          <div class="entrev-emerg-row" data-c="aller"><div class="ic"><span class="mi">medication</span></div><div class="txt"><div class="lbl">Alergias o condiciones</div><div class="val">${pp.emerg.alergias}</div></div></div>
        </div>
      </div>`;

    const laboralHTMLLocal = `
      <div class="dr-section">
        <div class="dr-section-title"><span class="mi">work_outline</span>Datos laborales</div>
        <div class="entrev-detail-grid" style="margin:0">
          <div class="entrev-detail-row" data-c="pos"><div class="ic"><span class="mi">work</span></div><div class="txt"><div class="lbl">Posición</div><div class="val">${pp.pos}</div></div></div>
          <div class="entrev-detail-row" data-c="zone"><div class="ic"><span class="mi">place</span></div><div class="txt"><div class="lbl">Zona</div><div class="val">${pp.zona}</div></div></div>
          <div class="entrev-detail-row" data-c="mod"><div class="ic"><span class="mi">schedule</span></div><div class="txt"><div class="lbl">Modalidad</div><div class="val">${pp.mod}</div></div></div>
          <div class="entrev-detail-row" data-c="origen"><div class="ic"><span class="mi">${pp.origen==='Referido'?'group':pp.origen==='Búsqueda activa'?'campaign':'share'}</span></div><div class="txt"><div class="lbl">Origen</div><div class="val">${pp.origen}</div></div></div>
          <div class="entrev-detail-row" data-c="lang"><div class="ic"><span class="mi">translate</span></div><div class="txt"><div class="lbl">Nivel de inglés</div><div class="val">${pp.engLbl}</div></div></div>
          <div class="entrev-detail-row" data-c="exp"><div class="ic"><span class="mi">workspace_premium</span></div><div class="txt"><div class="lbl">Experiencia</div><div class="val">${pp.exp}</div></div></div>
          <div class="entrev-detail-row full" data-c="transp"><div class="ic"><span class="mi">directions_car</span></div><div class="txt"><div class="lbl">Tipo de transporte</div><div class="val">${pp.transp}</div></div></div>
        </div>
      </div>
      ${renderBlSched(pp, {pool:true})}`;

    // Datos y Laboral — reutilizan EXACTAMENTE el mismo componente que el Pool de
    // colaboradores en Reclutamiento (Datos incluye Estado en blacklist + Historial;
    // Laboral incluye la leyenda del schedule + Semáforo actual), para todos los estados.
    const datosHTML = (typeof window.__reclPoolDatosBodyByState === 'function')
      ? (window.__reclPoolDatosBodyByState(pp.st) || datosHTMLLocal)
      : datosHTMLLocal;
    const laboralHTML = (typeof window.__reclPoolLaboralBodyByState === 'function')
      ? (window.__reclPoolLaboralBodyByState(pp.st) || laboralHTMLLocal)
      : laboralHTMLLocal;

    // Historial de asignaciones — reutiliza EXACTAMENTE el mismo componente que el
    // Pool de colaboradores en Reclutamiento (mismo render, misma información, todos
    // los estados del semáforo). Toma como ejemplo el primer colaborador de ese estado.
    // Fallback al render local si el módulo de Reclutamiento aún no expuso la función.
    const histHTML = (typeof window.__reclPoolHistBodyByState === 'function')
      ? (window.__reclPoolHistBodyByState(pp.st) || renderPoolHistTab(pp))
      : renderPoolHistTab(pp);
    const docsHTML = renderBlDocsList();

    const bodyHTML = tab==='laboral' ? laboralHTML : tab==='historial' ? histHTML : tab==='docs' ? docsHTML : datosHTML;
    const tabs = [['datos','Datos','badge'],['laboral','Laboral','work_outline'],['historial','Historial','history'],['docs','Documentos','description']];

    drw.innerHTML = `
      <div class="recl-drawer-head bl-drawer-headv2">
        <div class="recl-drawer-close" onclick="window.__blPoolProfileClose()"><span class="mi">close</span></div>
        <div class="recl-drawer-id">
          ${pp.cid}
          <span class="recl-st-pill"><span class="dot" style="background:${sm.color}"></span>${sm.lbl}</span>
          ${blShowReq ? `<span class="recl-st-pill recl-req-pill"><span class="mi" style="font-size:11px">assignment_ind</span>${blReq}</span>` : ''}
        </div>
        <div class="recl-drawer-name-row">
          <div class="recl-avatar" style="--card-st:${sm.color};background:${gradAv(pp.nm)}">${ini(pp.nm)}<span class="recl-st-ring" style="border-width:3px;border-color:${sm.color}"></span></div>
          <div>
            <div class="recl-drawer-name">${pp.nm}</div>
            <div class="recl-drawer-meta">
              <span class="recl-meta-item"><span class="mi">work_outline</span>${pp.pos}</span>
              <span class="recl-meta-sep"></span>
              <span class="recl-meta-item"><span class="mi">place</span>${pp.zona}</span>
              <span class="recl-meta-sep"></span>
              <span class="recl-meta-item"><span class="mi">schedule</span>${pp.mod}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="recl-drawer-tabs-wrap">
        <div class="recl-drawer-tabs">
          ${tabs.map(t=>`<div class="recl-drawer-tab ${tab===t[0]?'active':''}" onclick="window.__blPoolTab('${t[0]}')"><span class="mi">${t[2]}</span>${t[1]}</div>`).join('')}
        </div>
      </div>
      <div class="recl-drawer-body">${bodyHTML}</div>
      <div class="bl-prof-foot">
        <button class="bl-prof-foot-btn" onclick="window.__blPoolProfilePick()"><span class="mi">person_check</span>Seleccionar para vetar</button>
      </div>
    `;
    drw.classList.add('open');
    if(bg) bg.classList.add('open');
  }

  /* ---------------- ADD MODAL ---------------- */
  function renderAddModal(){
    const m = document.getElementById('bl-add-modal');
    const bg = document.getElementById('bl-add-modal-bg');
    if(!m) return;
    const a = state.add;
    a.flt = a.flt || {pos:'',zona:'',mod:'',eng:'',status:''};
    a.pruebas = a.pruebas || [];
    const q = a.search.trim().toLowerCase();

    // Metadatos sintéticos (deterministas) de cada colaborador del pool, para
    // que la reclutadora pueda filtrar/buscar igual que en "Asignar colaborador".
    const ING = ['Básico','Intermedio','Avanzado'];
    const MODS_F = ['Tiempo completo','Medio tiempo','Por horas'];
    // Idiomas del colaborador: todos hablan Inglés (con su nivel) + idiomas
    // adicionales deterministas, igual que el pool de Reclutamiento.
    const EXTRA_LANGS = ['Alemán','Francés','Italiano','Portugués'];
    const poolMeta = (x)=>{
      const role = x.pos.split(' · ')[0];
      const zm = x.pos.match(/Zona\s+(.+)$/);
      const zona = zm ? zm[1].trim() : 'Centro';
      const hh = hashStr(x.nm + x.doc);
      const engLvl = (hh % 3) + 1;                  // 1·Básico 2·Intermedio 3·Avanzado
      const langs = [{ name:'Inglés', lvl: engLvl }];
      if(hh % 2 === 0){ langs.push({ name: EXTRA_LANGS[hh % 4], lvl: 1 + (hh % 3) }); }
      if(hh % 5 === 0){ const n2 = EXTRA_LANGS[(hh + 2) % 4]; if(!langs.some(l=>l.name===n2)) langs.push({ name:n2, lvl: 1 + ((hh + 1) % 3) }); }
      return { role, zona, st: x.st, cid: 'ID-' + String(2000 + (hh % 7999)), mod: MODS_F[hh%3], ingles: ING[hh%3], langs, exp: 1 + (hh%5), hoteles: 1 + (hh%2) };
    };
    const POOL_X = POOL.map(x=>({ ...x, _m: poolMeta(x) }));
    const uniq = (arr)=>[...new Set(arr)];

    // Filtros dropdown — mismos que el pool de Reclutamiento: Posición, Zona,
    // Modalidad, Idiomas (multi-selección), Estado.
    const FILTERS = [
      ['pos',   'Posición', 'Todas', uniq(POOL_X.map(x=>x._m.role)).map(v=>[v,v])],
      ['zona',  'Zona',     'Todas', uniq(POOL_X.map(x=>x._m.zona)).map(v=>[v,v])],
      ['mod',   'Modalidad','Todas', MODS_F.map(v=>[v,v])],
      ['status','Estado',   'Todos', SEMAFORO_ORDER.filter(k=>POOL_X.some(x=>x._m.st===k)).map(k=>[k, SEMAFORO[k].lbl])],
    ];
    const flt = a.flt;
    const selLangs = a.langs || {};
    const fKey = { pos:'role', zona:'zona', mod:'mod', status:'st' };

    const filtered = POOL_X.filter(x=>{
      if(q && !(x.nm.toLowerCase().includes(q) || x.doc.toLowerCase().includes(q) || x._m.zona.toLowerCase().includes(q) || x._m.role.toLowerCase().includes(q))) return false;
      for(const k in fKey){ if(flt[k] && x._m[fKey[k]] !== flt[k]) return false; }
      // Idiomas: el colaborador debe cumplir TODOS los idiomas elegidos (AND),
      // cada uno con su nivel mínimo (0 = cualquiera).
      for(const name in selLangs){
        const l = (x._m.langs||[]).find(ll=>ll.name===name);
        if(!l) return false;
        const minLvl = selLangs[name];
        if(minLvl && l.lvl < minLvl) return false;
      }
      return true;
    });

    // Chip de Idiomas — multi-selección con nivel mínimo, idéntico al del pool.
    const LVL_LBL = ['','Básico','Intermedio','Avanzado'];
    const blLangChip = ()=>{
      const selKeys = Object.keys(selLangs);
      const active = selKeys.length>0;
      const open = a.openFilter==='lang';
      let valLabel = 'Todas';
      if(selKeys.length===1){ const n=selKeys[0], lv=selLangs[n]; valLabel = n + (lv?` · ${LVL_LBL[lv]}+`:''); }
      else if(selKeys.length>1){ valLabel = `${selKeys.length} idiomas`; }
      const lvls = [[0,'Cualquiera'],[1,'Básico+'],[2,'Intermedio+'],[3,'Avanzado+']];
      const row = (l)=>{
        const on = Object.prototype.hasOwnProperty.call(selLangs, l);
        const lv = selLangs[l] || 0;
        const lj = l.replace(/'/g,"\\'");
        return `<div class="lang-pick ${on?'sel':''}" onclick="window.__blAddToggleLang('${lj}')">
            <span class="cb mi">${on?'check_box':'check_box_outline_blank'}</span>
            <span class="mi recl-fdd-ic">${l==='Inglés'?'star':'language'}</span>
            <span class="ln">${l}</span>
          </div>${on?`<div class="lang-lvl">
            <span class="lvl-lbl">Nivel mínimo</span>
            <div class="lvl-grid">${lvls.map(([n,lbl])=>`<div class="lvl-pill ${lv===n?'sel':''}" onclick="event.stopPropagation();window.__blAddSetLangLvl('${lj}',${n})">${lbl}</div>`).join('')}</div>
          </div>`:''}`;
      };
      return `<div class="recl-filter-grp ${active?'active':''} ${open?'open':''}" onclick="event.stopPropagation();window.__blAddToggleFilterDD('lang')">
        <span class="lbl-grp">Idiomas</span>
        <span class="val">${valLabel}</span>
        <span class="mi">${open?'expand_less':'expand_more'}</span>
        <div class="recl-fdd recl-fdd-lang" onclick="event.stopPropagation()">
          <div class="recl-fdd-sec">Idiomas · elige uno o varios</div>
          ${['Inglés', ...EXTRA_LANGS].map(row).join('')}
          ${active?`<div class="lang-clear" onclick="window.__blAddClearLangs()"><span class="mi">close</span>Quitar idiomas</div>`:''}
        </div>
      </div>`;
    };

    const filterChipHTML = ([key,label,allLbl,opts])=>{
      const cur = flt[key];
      const curLbl = cur ? ((opts.find(o=>o[0]===cur)||[])[1] || allLbl) : allLbl;
      const open = a.openFilter===key;
      return `<div class="recl-filter-grp${cur?' active':''}${open?' open':''}" onclick="event.stopPropagation();window.__blAddToggleFilterDD('${key}')">
        <span class="lbl-grp">${label}</span>
        <span class="val">${key==='status'&&cur?`<span class="recl-fdd-dot" style="background:${(SEMAFORO[cur]||{}).color||'#9A8C7E'}"></span>`:''}${curLbl}</span>
        <span class="mi">expand_more</span>
        <div class="recl-fdd" onclick="event.stopPropagation()">
          <div class="recl-fdd-item all" onclick="window.__blAddPickFilter('${key}','')"><span>${allLbl}</span></div>
          ${opts.map(([v,l])=>`<div class="recl-fdd-item${cur===v?' selected':''}" onclick="window.__blAddPickFilter('${key}','${v}')">${key==='status'?`<span class="recl-fdd-dot" style="background:${(SEMAFORO[v]||{}).color||'#9A8C7E'}"></span>`:''}<span>${l}</span><span class="mi">check</span></div>`).join('')}
        </div>
      </div>`;
    };
    // Orden: Posición · Zona · Modalidad · Idiomas · Estado
    const filtersHTML = [
      filterChipHTML(FILTERS[0]),
      filterChipHTML(FILTERS[1]),
      filterChipHTML(FILTERS[2]),
      blLangChip(),
      filterChipHTML(FILTERS[3]),
    ].join('');
    const anyFlt = Object.values(flt).some(Boolean) || Object.keys(selLangs).length>0;
    const clearHTML = anyFlt ? `<div class="bl-pool-clearf" onclick="window.__blAddClearFilters()"><span class="mi">close</span>Limpiar</div>` : '';

    const rowsHTML = filtered.length ? filtered.map(x=>{
      const md = x._m, sel = a.colab && a.colab.nm===x.nm;
      const ek = md.ingles==='Básico'?'basic':(md.ingles==='Intermedio'?'inter':'adv');
      const sem = SEMAFORO[md.st] || { lbl:'—', color:'#9A8C7E' };
      const nmJs = x.nm.replace(/'/g,"\\'");
      return `<div class="ram-card${sel?' selected':''}" onclick="window.__blAddPickRow('${nmJs}')">
        <div class="ram-card-h">
          <div class="ram-card-check"></div>
          <div class="ram-card-av" style="background:${gradAv(x.nm)}">${ini(x.nm)}</div>
          <div class="ram-card-main">
            <div class="ram-card-name">
              ${x.nm}
              <span class="ram-card-doc">${md.cid}</span>
              <span class="ram-card-st"><span class="dot" style="background:${sem.color}"></span>${sem.lbl}</span>
              <span class="ram-card-history"><span class="mi">history</span>${md.hoteles} hotel${md.hoteles===1?'':'es'}</span>
            </div>
            <div class="ram-tags">
              <span class="ram-tag pos"><span class="mi">check_circle</span>${md.role}</span>
              <span class="ram-tag zone"><span class="mi">place</span>${md.zona}</span>
              <span class="ram-tag eng-${ek}">Inglés ${md.ingles}</span>
              ${(md.langs||[]).filter(l=>l.name!=='Inglés').map(l=>`<span class="ram-tag mod"><span class="mi">language</span>${l.name} ${LVL_LBL[l.lvl]}</span>`).join('')}
              <span class="ram-tag mod">${md.mod}</span>
              <span class="ram-tag exp">${md.exp} año${md.exp===1?'':'s'} exp.</span>
            </div>
          </div>
          <div class="ram-card-right">
            <button class="ram-card-perfil" onclick="event.stopPropagation();window.__blPoolProfile('${nmJs}')"><span class="mi">visibility</span>Ver perfil</button>
          </div>
        </div>
      </div>`;
    }).join('') : `<div class="bl-pool-empty">Sin coincidencias en el pool de colaboradores</div>`;

    const colabBlock = `
      <div class="bl-pool-search">
        <span class="mi">search</span>
        <input placeholder="Buscar en el pool por nombre, DOC o zona…" value="${a.search.replace(/"/g,'&quot;')}" oninput="window.__blAddSearch(this.value)">
      </div>
      <div class="bl-pool-filters">${filtersHTML}${clearHTML}</div>
      <div class="bl-pool-meta"><strong>${filtered.length}</strong> ${filtered.length===1?'colaborador':'colaboradores'} en el pool${a.colab?` · seleccionado: <strong>${a.colab.nm}</strong>`:''}</div>
      <div class="bl-pool-list">${rowsHTML}</div>`;

    // El veto manual SOLO aplica a faltas graves (las 3 inasistencias las escala
    // el sistema automáticamente). Se elige el tipo de falta grave en un dropdown
    // coherente con la vista de detalle; "Otro" habilita un input libre.
    const gt = a.graveType;
    const gtLabel = gt==='otro' ? 'Otro (especificar)' : (gt ? ((GRAVE_TYPES.find(g=>g.key===gt)||{}).lbl||'') : '');
    const graveSelOpts = GRAVE_TYPES.map(g=>`<div class="recl-select-opt${gt===g.key?' selected':''}" onclick="window.__blAddPickGrave('${g.key}')">${g.lbl}<span class="mi">check</span></div>`).join('')
      + `<div class="recl-select-opt${gt==='otro'?' selected':''}" onclick="window.__blAddPickGrave('otro')">Otro (especificar)<span class="mi">check</span></div>`;
    const motivoBlock = `
      <label class="recl-mig-opt checked" style="cursor:default">
        <span class="ic"><span class="mi">gpp_bad</span></span>
        <span class="lbl">
          <span class="nm">Falta grave</span>
          <span class="det">Conducta grave · baja inmediata. El veto manual aplica solo a faltas graves; las 3 inasistencias las escala el sistema automáticamente.</span>
        </span>
        <span class="chk"><span class="mi">check_circle</span></span>
      </label>
      <div class="bl-field-hint" style="margin:10px 0 6px">Tipo de falta grave</div>
      <div class="recl-select" id="bl-grave-sel" data-value="${gt||''}">
        <button type="button" class="recl-select-btn${gt?'':' placeholder'}" onclick="event.stopPropagation();window.__reclToggleSel('bl-grave-sel')">${gtLabel||'Selecciona el tipo de falta grave…'}</button>
        <div class="recl-select-pop">${graveSelOpts}</div>
      </div>
      ${gt==='otro' ? `<textarea class="bl-note" style="margin-top:8px;min-height:64px" placeholder="Especifica el motivo de la falta grave…" oninput="window.__blAddGraveOtro(this.value)">${(a.graveOtro||'').replace(/</g,'&lt;')}</textarea>` : ''}
    `;

    const graveOk = a.graveType && (a.graveType!=='otro' || (a.graveOtro||'').trim().length>=4);
    const valid = a.colab && graveOk && a.nota.trim().length>=8 && a.pruebas.length>=1;

    m.innerHTML = `
      <div class="bl-modal-h">
        <div class="x" onclick="window.__blAddClose()"><span class="mi">close</span></div>
        <div class="eyebrow">Control de calidad</div>
        <div class="ttl">Agregar a blacklist</div>
        <div class="sub">El colaborador quedará vetado de la plataforma. Esta acción se registra con tu nombre y requiere una justificación.</div>
      </div>
      <div class="bl-modal-body" onclick="window.__blAddBodyClick(event)">
        <div class="bl-field">
          <div class="bl-field-lbl"><span class="num">1</span>Colaborador <span class="req">*</span></div>
          ${colabBlock}
        </div>
        <div class="bl-field">
          <div class="bl-field-lbl"><span class="num">2</span>Motivo del veto <span class="req">*</span></div>
          ${motivoBlock}
        </div>
        <div class="bl-field" style="margin-bottom:18px">
          <div class="bl-field-lbl"><span class="num">3</span>Justificación <span class="req">*</span></div>
          <div class="bl-field-hint">Describe brevemente lo ocurrido (mínimo 8 caracteres). Quedará en el historial del colaborador.</div>
          <textarea class="bl-note" placeholder="Ej. Reincidencia en inasistencias sin aviso durante el turno asignado en Costa del Sol…" oninput="window.__blAddNota(this.value)">${a.nota.replace(/</g,'&lt;')}</textarea>
        </div>
        <div class="bl-field" style="margin-bottom:4px">
          <div class="bl-field-lbl"><span class="num">4</span>Pruebas / evidencia <span class="req">*</span></div>
          <div class="bl-field-hint">Adjunta fotos, reportes o documentos que respalden el veto. Quedarán en el expediente del colaborador.</div>
          <div class="entrev-rej-attach" onclick="window.__blAddEvidence()">
            <div class="ic"><span class="mi">attach_file</span></div>
            <div class="info">
              <div class="t">Adjunta pruebas o documentos de soporte</div>
              <div class="s">Capturas, correos, comprobantes · PDF, JPG, PNG · máx. 10 MB c/u</div>
            </div>
            <div class="browse">Examinar</div>
          </div>
          ${a.pruebas.length ? `<div class="entrev-rej-files">${a.pruebas.map((f,i)=>`<div class="entrev-rej-file"><span class="fic"><span class="mi">description</span></span><span class="nm">${f}</span><span class="sz">${f.endsWith('.pdf')?'320 KB':'1.2 MB'}</span><button class="rm" onclick="event.stopPropagation();window.__blAddRemoveEvidence(${i})"><span class="mi">close</span></button></div>`).join('')}</div>` : ''}
        </div>
      </div>
      <div class="bl-modal-foot">
        <button class="bl-modal-btn cancel" onclick="window.__blAddClose()">Cancelar</button>
        <button class="bl-modal-btn confirm" ${valid?'':'disabled'} onclick="window.__blAddConfirm()"><span class="mi">block</span>Confirmar veto</button>
      </div>
    `;
    if(bg) bg.classList.toggle('open', a.open);
  }

  /* ---------------- ACTIONS ---------------- */
  window.__blSearch = (v)=>{ state.q=v; render(); };
  window.__blMotivo = (k)=>{ state.motivo=k; state.openDD=null; render(); };
  window.__blZona = (z)=>{ state.zona=z; state.openDD=null; render(); };
  window.__blVetby = (v)=>{ state.vetby=v; state.openDD=null; render(); };
  window.__blPeriodo = (p)=>{ state.periodo=p; if(p!=='custom'){ state.openDD=null; } else { const base = state.dateFrom ? new Date(state.dateFrom+'T00:00:00') : new Date(NOW_BL); state.calMonth = new Date(base.getFullYear(), base.getMonth(), 1); } render(); };
  window.__blCalNav = (delta)=>{ const c = state.calMonth || new Date(NOW_BL.getFullYear(), NOW_BL.getMonth(), 1); state.calMonth = new Date(c.getFullYear(), c.getMonth()+delta, 1); render(); };
  window.__blCalPick = (iso)=>{
    const f=state.dateFrom, t=state.dateTo;
    if(!f || (f&&t)){ state.dateFrom=iso; state.dateTo=''; }
    else { if(iso<f){ state.dateTo=f; state.dateFrom=iso; } else { state.dateTo=iso; } }
    render();
  };
  window.__blCalReset = ()=>{ state.dateFrom=''; state.dateTo=''; render(); };
  window.__blOrder = ()=>{ state.order = state.order==='recientes'?'antiguos':'recientes'; render(); };
  window.__blView = (v)=>{ state.view=v; state.openDD=null; render(); };
  window.__blDD = (k,ev)=>{ ev.stopPropagation(); state.openDD = state.openDD===k?null:k; render(); };
  window.__blClear = ()=>{ state.q=''; state.zona=''; state.motivo='all'; state.vetby='all'; state.periodo='all'; state.dateFrom=''; state.dateTo=''; render(); };
  window.__blOpen = (id)=>{ state.selected=id; state.drawerTab='datos'; render(); renderDrawer(); };
  window.__blClose = ()=>{ state.selected=null; renderDrawer(); render(); };
  window.__blSetTab = (t)=>{ state.drawerTab=t; renderDrawer(); };
  window.__blTabsScroll = (btn)=>{ const t=btn.parentElement.querySelector('.recl-drawer-tabs'); if(t) t.scrollBy({left:180,behavior:'smooth'}); };
  window.__blRemove = (id)=>{
    const i = PEOPLE.findIndex(x=>x.id===id); if(i<0) return;
    const nm = PEOPLE[i].nm; PEOPLE.splice(i,1);
    state.selected=null; renderDrawer(); render();
    window.toast && window.toast(nm+' fue quitado de blacklist','restore');
  };

  // add modal
  window.__blAddOpen = ()=>{ state.add={open:true,colab:null,motivo:'grave',graveType:null,graveOtro:'',nota:'',search:'',flt:{pos:'',zona:'',mod:'',status:''},langs:{},openFilter:null,pruebas:[]}; renderAddModal(); };
  window.__blAddClose = ()=>{ state.add.open=false; renderAddModal(); };
  window.__blAddSearch = (v)=>{ state.add.search=v; renderAddModal(); };
  window.__blAddToggleFilterDD = (k)=>{ state.add.openFilter = state.add.openFilter===k?null:k; renderAddModal(); };
  window.__blAddPickFilter = (k,v)=>{ state.add.flt=state.add.flt||{}; state.add.flt[k]=v; state.add.openFilter=null; renderAddModal(); };
  window.__blAddClearFilters = ()=>{ state.add.flt={pos:'',zona:'',mod:'',status:''}; state.add.langs={}; state.add.openFilter=null; renderAddModal(); };
  // Idiomas (multi-selección + nivel mínimo por idioma), igual que el pool.
  window.__blAddToggleLang = (name)=>{ const a=state.add; a.langs=a.langs||{}; if(Object.prototype.hasOwnProperty.call(a.langs,name)) delete a.langs[name]; else a.langs[name]=0; renderAddModal(); };
  window.__blAddSetLangLvl = (name,n)=>{ const a=state.add; (a.langs||(a.langs={}))[name]=n; renderAddModal(); };
  window.__blAddClearLangs = ()=>{ state.add.langs={}; renderAddModal(); };
  window.__blAddBodyClick = (e)=>{ if(state.add.openFilter && !e.target.closest('.recl-filter-grp')){ state.add.openFilter=null; renderAddModal(); } };
  window.__blAddPickRow = (nm)=>{ state.add.colab = (state.add.colab && state.add.colab.nm===nm) ? null : (POOL.find(x=>x.nm===nm)||null); renderAddModal(); };
  window.__blPoolProfile = (nm)=>{ state.poolView = POOL.find(x=>x.nm===nm) || null; state.poolTab='datos'; renderPoolProfile(); };
  window.__blPoolProfileClose = ()=>{ state.poolView=null; renderPoolProfile(); };
  window.__blPoolTab = (t)=>{ state.poolTab=t; renderPoolProfile(); };
  window.__blPoolProfilePick = ()=>{ if(state.poolView){ state.add.colab = POOL.find(x=>x.nm===state.poolView.nm) || null; } state.poolView=null; renderPoolProfile(); renderAddModal(); };
  window.__blAddEvidence = ()=>{ const a=state.add; a.pruebas=a.pruebas||[]; const names=['Reporte_incidente.pdf','Evidencia_foto.jpg','Bitacora_turno.pdf','Acta_de_hechos.pdf','Captura_camara.png']; a.pruebas.push(names[a.pruebas.length % names.length]); renderAddModal(); };
  window.__blAddRemoveEvidence = (i)=>{ (state.add.pruebas||[]).splice(i,1); renderAddModal(); };
  window.__blAddPick = (nm)=>{ state.add.colab = POOL.find(x=>x.nm===nm)||null; renderAddModal(); };
  window.__blAddClearColab = ()=>{ state.add.colab=null; renderAddModal(); };
  window.__blAddMotivo = (k)=>{ state.add.motivo=k; renderAddModal(); };
  window.__blAddPickGrave = (k)=>{ state.add.graveType=k; renderAddModal(); };
  window.__blAddGraveOtro = (v)=>{ state.add.graveOtro=v; const b=document.querySelector('#bl-add-modal .bl-modal-btn.confirm'); const a=state.add; const graveOk=a.graveType&&(a.graveType!=='otro'||(a.graveOtro||'').trim().length>=4); const valid=a.colab&&graveOk&&a.nota.trim().length>=8&&(a.pruebas||[]).length>=1; if(b) b.disabled=!valid; };
  window.__blAddNota = (v)=>{ state.add.nota=v; const b=document.querySelector('#bl-add-modal .bl-modal-btn.confirm'); const a=state.add; const graveOk=a.graveType&&(a.graveType!=='otro'||(a.graveOtro||'').trim().length>=4); const valid=a.colab&&graveOk&&v.trim().length>=8&&(a.pruebas||[]).length>=1; if(b) b.disabled=!valid; };
  window.__blAddConfirm = ()=>{
    const a = state.add;
    const graveOk = a.graveType && (a.graveType!=='otro' || (a.graveOtro||'').trim().length>=4);
    if(!(a.colab&&graveOk&&a.nota.trim().length>=8&&(a.pruebas||[]).length>=1)) return;
    const nextId = 'BL-0'+(419 + (PEOPLE.length-12));
    const gtObj = a.graveType==='otro'
      ? { key:'otro', lbl:a.graveOtro.trim(), ic:'gpp_bad', desc:a.nota.trim() }
      : GRAVE_TYPES.find(g=>g.key===a.graveType);
    PEOPLE.unshift({
      id: nextId, nm:a.colab.nm, doc:a.colab.doc, tel:'+52 322 000 0000',
      pos:a.colab.pos.split(' · ')[0], zona:(a.colab.pos.split('Zona ')[1]||'Centro'),
      m:'grave', gt:gtObj, fecha:'12 may 2026', auto:false, manual:true,
      nota:a.nota.trim(), pruebas:a.pruebas.slice(),
      by:'Juanita López', byrl:'Líder de Grupo · Zona Centro',
      hotel:'Hotel asignado', reporter:{name:'Juanita López', role:'Líder de Grupo'}, inspector:'Inspector de zona'
    });
    state.add.open=false; renderAddModal(); render();
    window.toast && window.toast(a.colab.nm+' agregado a blacklist','block');
  };

  document.addEventListener('click', e=>{
    if(state.openDD && !e.target.closest('.recl-filter-grp')){ state.openDD=null; if(document.getElementById('bl-root')) render(); }
    if(state.add.listOpen && !e.target.closest('.bl-colab-search')){ state.add.listOpen=false; if(state.add.open) renderAddModal(); }
  });

  // INIT containers
  if(!document.getElementById('bl-drawer')){
    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <div class="req-drawer" id="bl-drawer"></div>
      <div class="bl-modal-bg" id="bl-add-modal-bg" onclick="if(event.target===this)window.__blAddClose()">
        <div class="bl-modal" id="bl-add-modal"></div>
      </div>
      <div class="bl-prof-bg" id="bl-prof-bg" onclick="if(event.target===this)window.__blPoolProfileClose()"></div>
      <div class="bl-prof-drawer" id="bl-prof-drawer"></div>`;
    document.body.appendChild(wrap);
  }

  window.__renderBl = render;
  setTimeout(()=>{ const pv=document.querySelector('[data-page-view="Blacklist"]'); if(pv && pv.style.display!=='none') render(); }, 60);
})();
