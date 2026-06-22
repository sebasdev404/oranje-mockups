/* =====================================================================
   Oranje — Colaborador · lógica del mockup
   ===================================================================== */
/* ============================ ESTADO ============================ */
const SEM = {
  blanco:{c:'var(--st-blanco)',b:'#D8CFC4',label:'Pre-asignación',desc:'Subiste tus datos en la app; falta que tu reclutadora los valide.'},
  'verde-manzana':{c:'var(--st-verde-manzana)',b:'#5FBF2E',label:'Día 1-2',desc:'Primeros días en el hotel. El Inspector verifica tu llegada.'},
  'azul-claro':{c:'var(--st-azul-claro)',b:'#2A9BC8',label:'Día 3+',desc:'Ponchaste al tercer día. El Inspector te entregó tu uniforme.'},
  naranja:{c:'var(--st-naranja)',b:'#D96400',label:'Fijo',desc:'Completaste una semana. Eres colaborador fijo del hotel.'},
  verde:{c:'var(--st-verde)',b:'#178A3C',label:'Disponible',desc:'Disponible para asignación.'},
  amarillo:{c:'var(--st-amarillo)',b:'#E6C000',label:'Disponible voluntario',desc:'Te declaraste disponible para turnos extra durante tu descanso.'},
  cafe:{c:'var(--st-cafe)',b:'#6E4A29',label:'Asignación temporal',desc:'Asignado temporalmente a cubrir una jornada.'},
  rosa:{c:'var(--st-rosa)',b:'#D11079',label:'Stand-by',desc:'El hotel te mandó a descansar (vacaciones / temporada baja).'},
  morado:{c:'var(--st-morado)',b:'#5E1F94',label:'No regresó',desc:'Inasistencia registrada.'},
  rojo:{c:'var(--st-rojo)',b:'#B31313',label:'Reportado',desc:'El hotel te reportó; el Inspector revisa el caso.'},
  gris:{c:'var(--st-gris)',b:'#6E635A',label:'Accidentado',desc:'En incapacidad médica por accidente laboral. Protegido de la regla de 3 inasistencias.'},
  negro:{c:'var(--st-negro)',b:'#000',label:'Blacklist',desc:'Bloqueado de la plataforma.'}
};
const COL = {
  nombre:'Carlos Ruiz Méndez', alias:'Carlos Ruiz', ini:'CR',
  posicion:'Housekeeper', hotel:'Hotel Costa del Sol', zona:'Zona Centro',
  modalidad:'Por horas', ingles:'Básico', experiencia:'2 años',
  estado:'naranja', disponible:false,
  email:'carlos.ruiz@email.com', tel:'+1 555 0142', edad:38, genero:'Masculino',
  domicilio:'Calle Juárez 120, Centro',
  ssn:'•••-••-4821', itin:'—', transporte:'Transporte público',
  emerg:{nombre:'Andrés Ruiz', tel:'+1 555 0199', parentesco:'Hermano'},
  sangre:'O+', alergias:'Ninguna',
  schedule:[
    {dia:'Lun',num:16,turno:'07:00 – 15:00',hotel:'Costa del Sol',pos:'Housekeeper'},
    {dia:'Mar',num:17,turno:'07:00 – 15:00',hotel:'Costa del Sol',pos:'Housekeeper'},
    {dia:'Mié',num:18,turno:'07:00 – 15:00',hotel:'Costa del Sol',pos:'Housekeeper',hoy:true},
    {dia:'Jue',num:19,turno:'07:00 – 15:00',hotel:'Costa del Sol',pos:'Housekeeper'},
    {dia:'Vie',num:20,turno:'07:00 – 15:00',hotel:'Costa del Sol',pos:'Housekeeper'},
    {dia:'Sáb',num:21,off:true},{dia:'Dom',num:22,off:true}
  ],
  timesheet:[
    {dia:'Lun 16',ent:'06:58',sal:'15:03',lunch:'30 min',bruto:'8.08',neto:'7.58'},
    {dia:'Mar 17',ent:'06:55',sal:'15:01',lunch:'42 min',bruto:'8.10',neto:'7.40'},
    {dia:'Mié 18',ent:'06:59',sal:'—',lunch:'—',bruto:'—',neto:'—',hoy:true},
    {dia:'Jue 19',ent:'—',sal:'—',lunch:'—',bruto:'—',neto:'—'},
    {dia:'Vie 20',ent:'—',sal:'—',lunch:'—',bruto:'—',neto:'—'}
  ],
  pago:{
    recibidosAnio:22, total30:'$ 2,219.00', ultimo:{monto:'$ 560.00', fecha:'17 Jun'},
    historial:[
      {sem:'09 – 15 Jun', hotel:'Hotel Costa del Sol', horas:'40.0 h', monto:'$ 560.00', fecha:'17 Jun'},
      {sem:'02 – 08 Jun', hotel:'Hotel Costa del Sol', horas:'38.5 h', monto:'$ 539.00', fecha:'10 Jun'},
      {sem:'26 May – 01 Jun', hotel:'Costa del Sol · Punta Vista', horas:'42.0 h', monto:'$ 602.00', fecha:'03 Jun'},
      {sem:'19 – 25 May', hotel:'Hotel Costa del Sol', horas:'37.0 h', monto:'$ 518.00', fecha:'27 May'}
    ]
  },
  ponchesHoy:[
    {k:'Entrada',t:'06:59',hecho:true,ic:'login'},
    {k:'Salida Lunch',t:'11:30',hecho:true,ic:'lunch_dining'},
    {k:'Entrada Lunch',t:'—',hecho:false,ic:'lunch_dining'},
    {k:'Salida Break',t:'—',hecho:false,ic:'free_breakfast'},
    {k:'Entrada Break',t:'—',hecho:false,ic:'free_breakfast'},
    {k:'Salida',t:'—',hecho:false,ic:'logout'}
  ],
  notifs:[
    {id:1,unread:true,ic:'assignment_ind',cl:'green',t:'Schedule actualizado',x:'Tu schedule de la semana 16–22 Jun fue confirmado por el hotel.',tm:'Hace 2 h'},
    {id:2,unread:true,ic:'verified',cl:'orange',t:'Validación aprobada',x:'Tu reclutadora validó tu alta. Ya perteneces a Oranje (estado Disponible).',tm:'Ayer'},
    {id:3,unread:true,ic:'schedule',cl:'blue',t:'Recordatorio de ponche',x:'No olvides ponchar tu salida al terminar tu turno de hoy.',tm:'Hace 5 h'},
    {id:4,unread:false,ic:'payments',cl:'green',t:'Pago liberado',x:'Tu pago de la semana 09–15 Jun fue procesado por Contabilidad.',tm:'Hace 3 días'},
    {id:5,unread:false,ic:'badge',cl:'orange',t:'Uniforme entregado',x:'El Inspector registró la entrega de tu uniforme (Día 3).',tm:'Hace 6 días'}
  ]
};
const ICW={green:'var(--green)',orange:'var(--o-600)',blue:'var(--blue)',red:'var(--red)',purple:'var(--purple)'};
const ICBG={green:'#E9F9EF',orange:'var(--o-50)',blue:'#EEF5FF',red:'#FDECEC',purple:'#F3EAFB'};

/* ============================ HELPERS ============================ */
function stChip(key){const s=SEM[key];return `<span class="st-chip" style="border-color:${s.b};color:${s.b};${key==='blanco'?'background:#fff':''}"><span class="pip" style="background:${s.c}"></span>${s.label}</span>`;}
function toast(msg,ic){const t=document.getElementById('toast');document.getElementById('toastMsg').textContent=msg;t.querySelector('.mi').textContent=ic||'check_circle';t.classList.add('show');clearTimeout(window._tt);window._tt=setTimeout(()=>t.classList.remove('show'),2600);}
function openModal(html){const b=document.getElementById('modalBg');b.innerHTML=`<div class="modal">${html}</div>`;b.classList.add('show');}
function closeModal(){document.getElementById('modalBg').classList.remove('show');}

/* ============================ NAVIGATION ============================ */
function navigate(el,name){
  document.querySelectorAll('.sb-item').forEach(i=>i.classList.toggle('active',i.dataset.page===name));
  document.getElementById('crumb').textContent = ({Inicio:'Inicio',Schedule:'Mi Schedule',Ponche:'Ponche',Timesheet:'Mi Timesheet',Pago:'Mi Pago',Disponibilidad:'Disponibilidad',Accidente:'Reportar accidente',Notificaciones:'Notificaciones',Perfil:'Mi Perfil'})[name]||name;
  (RENDER[name]||function(){})();
  document.getElementById('content').scrollTop=0;
}

/* ============================ RENDERS ============================ */
const RENDER={};

RENDER.Inicio=function(){
  const s=SEM[COL.estado];
  const next=COL.schedule.find(d=>d.hoy)||COL.schedule[0];
  document.getElementById('content').innerHTML=`
  <div class="hero">
    <div class="hero-left">
      <div class="avatar xl">${COL.ini}</div>
      <div>
        <h2>Hola, ${COL.alias.split(' ')[0]} 👋</h2>
        <div class="subm">${COL.posicion} · ${COL.hotel}</div>
        <div style="margin-top:9px">${stChip(COL.estado)}</div>
      </div>
    </div>
    <div style="text-align:right">
      <div style="font-size:12px;color:var(--ink-3);font-weight:600">TU ESTADO</div>
      <div style="font-size:13px;color:var(--ink-2);max-width:260px;margin-top:4px">${s.desc}</div>
    </div>
  </div>

  <div class="grid g4" style="margin-bottom:22px">
    <div class="kpi" style="border-color:rgba(255,142,0,.18);background:linear-gradient(135deg,rgba(255,142,0,.06),rgba(255,142,0,.01))">
      <div class="kh"><div class="ki" style="background:var(--o-50);color:var(--o-600)"><span class="mi">schedule</span></div><span class="trend up"><span class="mi">arrow_upward</span>+2 días</span></div>
      <div class="val" style="color:var(--o-700)">14.98<span class="suf">h</span></div><div class="lbl">Horas esta semana</div>
      <div class="foot">Meta semanal <strong>40 h</strong></div>
    </div>
    <div class="kpi" style="border-color:rgba(59,125,221,.18);background:linear-gradient(135deg,rgba(59,125,221,.06),rgba(59,125,221,.01))">
      <div class="kh"><div class="ki" style="background:rgba(59,125,221,.12);color:var(--blue)"><span class="mi">event</span></div></div>
      <div class="val" style="color:var(--blue)">5</div><div class="lbl">Turnos asignados</div>
      <div class="foot"><strong>2</strong> completados esta semana</div>
    </div>
    <div class="kpi" style="border-color:rgba(31,168,74,.18);background:linear-gradient(135deg,rgba(31,168,74,.07),rgba(31,168,74,.02))">
      <div class="kh"><div class="ki" style="background:rgba(31,168,74,.12);color:var(--green)"><span class="mi">payments</span></div></div>
      <div class="val" style="color:var(--green)">${COL.pago.ultimo.monto}</div><div class="lbl">Último pago recibido</div>
      <div class="foot">Pagado el <strong>${COL.pago.ultimo.fecha}</strong></div>
    </div>
    <div class="kpi" style="border-color:rgba(230,180,34,.22);background:linear-gradient(135deg,rgba(230,180,34,.1),rgba(230,180,34,.02))">
      <div class="kh"><div class="ki" style="background:rgba(230,180,34,.16);color:#C79400"><span class="mi">event_available</span></div></div>
      <div class="val" style="color:#C79400">2<span class="suf">/ 5</span></div><div class="lbl">Días completados</div>
      <div class="foot"><strong>3</strong> turnos restantes</div>
    </div>
  </div>

  <div class="grid g2">
    <div class="card">
      <div class="card-h"><h3>Tu próximo turno</h3><span class="mi">today</span></div>
      <div class="card-b">
        <div class="shift">
          <div class="day"><div class="d">${next.num}</div><div class="m">${next.dia}</div></div>
          <div class="info">
            <div class="t">${next.turno||'Descanso'}</div>
            <div class="meta"><span class="meta-pill"><span class="mi" style="font-size:14px">hotel</span>${next.hotel}</span><span class="meta-pill"><span class="mi" style="font-size:14px">work_outline</span>${next.pos}</span></div>
          </div>
          <button class="btn ghost sm" onclick="navigate(document.querySelector('[data-page=Schedule]'),'Schedule')">Ver semana</button>
        </div>
        <div class="banner info" style="margin-top:16px">
          <span class="mi">qr_code_scanner</span>
          <div>El <b>ponche</b> se hace desde la <b>app móvil</b> escaneando el QR del hotel. <a style="color:inherit;text-decoration:underline;cursor:pointer" onclick="navigate(document.querySelector('[data-page=Ponche]'),'Ponche')">Ver estado de hoy</a>.</div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-h"><h3>Accesos rápidos</h3></div>
      <div class="card-b">
        <div class="qa-hero" style="margin-bottom:12px">
          <div class="lbl">ASISTENCIA DEL MES</div>
          <div class="v">100%</div>
          <div class="v2">Sin faltas registradas · ¡sigue así!</div>
          <span class="mi mi-big">verified</span>
        </div>
        <div class="qa-grid">
          <button class="qa primary" onclick="navigate(null,'Disponibilidad')">
            <div class="qa-ic"><span class="mi">event_available</span></div>
            <div class="qa-txt"><div class="qa-title">Disponibilidad para turnos extra</div><div class="qa-sub">Actívate como disponible voluntario</div></div>
            <span class="mi qa-arrow">chevron_right</span>
          </button>
          <button class="qa soft" onclick="navigate(null,'Pago')">
            <div class="qa-ic"><span class="mi">payments</span></div>
            <div class="qa-txt"><div class="qa-title">Mi historial de pagos</div><div class="qa-sub">Consulta tus pagos recibidos</div></div>
            <span class="mi qa-arrow">chevron_right</span>
          </button>
          <button class="qa line" onclick="navigate(null,'Schedule')">
            <div class="qa-ic"><span class="mi">calendar_month</span></div>
            <div class="qa-txt"><div class="qa-title">Ver mi schedule</div><div class="qa-sub">Tus turnos de la semana</div></div>
            <span class="mi qa-arrow">chevron_right</span>
          </button>
          <button class="qa line" onclick="navigate(null,'Accidente')">
            <div class="qa-ic"><span class="mi">health_and_safety</span></div>
            <div class="qa-txt"><div class="qa-title">Reportar un accidente</div><div class="qa-sub">Notifica de inmediato al Inspector</div></div>
            <span class="mi qa-arrow">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  </div>`;
};

RENDER.Schedule=function(){
  document.getElementById('content').innerHTML=`
  <div class="ph"><div><h1>Mi Schedule</h1><div class="sub">Tus turnos asignados de la semana. Solo lectura — lo define el hotel.</div></div>
    <div class="ph-right"><span class="st-chip" style="border-color:var(--line-2);color:var(--ink-2)"><span class="mi" style="font-size:16px">date_range</span>Semana 16 – 22 Jun</span></div></div>
  <div class="card pad">
    <div class="week">
      ${COL.schedule.map(d=>`
        <div class="day-col ${d.hoy?'today':''}">
          <div class="dh"><div class="dn">${d.dia}</div><div class="dd">${d.num}</div></div>
          <div class="db">${d.off?`<div class="tg off">Descanso</div>`:`<div class="tg"><div class="h">${d.turno}</div><div class="p">${d.pos}</div><div class="p" style="color:var(--ink-3);margin-top:3px">${d.hotel}</div></div>`}</div>
        </div>`).join('')}
    </div>
    <div class="banner info" style="margin-top:18px"><span class="mi">info</span><div>Si necesitas un cambio en tu schedule, contacta a tu reclutadora o al hotel. Como colaborador no puedes editarlo directamente.</div></div>
  </div>`;
};

RENDER.Ponche=function(){
  const done=COL.ponchesHoy.filter(p=>p.hecho).length;
  document.getElementById('content').innerHTML=`
  <div class="ph"><div><h1>Ponche del día</h1><div class="sub">Registro de tu jornada de hoy · Miércoles 18 Jun.</div></div>
    <div class="ph-right"><span class="mobile-note"><span class="mi" style="font-size:15px">smartphone</span>El ponche se realiza en la app móvil</span></div></div>

  <div class="banner warn" style="margin-bottom:18px"><span class="mi">qr_code_scanner</span><div><b>El ponche es una acción móvil.</b> Escaneas el QR físico del hotel con la cámara de tu teléfono. Aquí en web solo ves el estado de tus ponches; el registro lo haces desde la app.</div></div>

  <div class="card">
    <div class="card-h"><h3>Tus ponches de hoy</h3><span class="meta-pill">${done}/6 registrados</span></div>
    <div class="card-b">
      <div class="grid g3">
        ${COL.ponchesHoy.map(p=>`
          <div class="shift" style="background:${p.hecho?'var(--surface-2)':'#fff'}">
            <div style="width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex:none;background:${p.hecho?'#E9F9EF':'var(--surface-3)'};color:${p.hecho?'var(--green)':'var(--ink-4)'}"><span class="mi">${p.ic}</span></div>
            <div class="info"><div class="t">${p.k}</div><div class="meta">${p.hecho?`<span style="color:var(--green);font-weight:700">${p.t}</span>`:`<span style="color:var(--ink-4)">Pendiente</span>`}</div></div>
            <span class="mi" style="color:${p.hecho?'var(--green)':'var(--ink-4)'}">${p.hecho?'check_circle':'radio_button_unchecked'}</span>
          </div>`).join('')}
      </div>
      <div class="divider"></div>
      <button class="btn primary" onclick="demoPonche()"><span class="mi">smartphone</span>Simular ponche desde la app</button>
      <span class="hint" style="margin-left:8px">Demostración — en producción se hace escaneando el QR.</span>
    </div>
  </div>`;
};
function demoPonche(){
  const next=COL.ponchesHoy.find(p=>!p.hecho);
  if(!next){toast('Ya registraste todos tus ponches de hoy','task_alt');return;}
  const idx=COL.ponchesHoy.indexOf(next);
  next.hecho=true; next.t=({2:'12:05',3:'14:50',4:'15:00',5:'15:05'})[idx]||'12:05';
  toast('Ponche registrado: '+next.k,'check_circle'); RENDER.Ponche();
}

RENDER.Timesheet=function(){
  document.getElementById('content').innerHTML=`
  <div class="ph"><div><h1>Mi Timesheet</h1><div class="sub">Tus horas registradas esta semana. La deducción de lunch se aplica automáticamente.</div></div></div>
  <div class="card pad0">
    <table class="tbl">
      <thead><tr><th>Día</th><th>Entrada</th><th>Salida</th><th>Lunch</th><th>Horas brutas</th><th>Horas netas</th></tr></thead>
      <tbody>
        ${COL.timesheet.map(d=>`<tr class="click" onclick="dayDetail('${d.dia}')" style="${d.hoy?'background:var(--o-50)':''}">
          <td><b>${d.dia}</b>${d.hoy?' <span class="meta-pill" style="background:var(--o-200);color:var(--o-700)">Hoy</span>':''}</td>
          <td class="num">${d.ent}</td><td class="num">${d.sal}</td><td>${d.lunch}</td>
          <td class="num">${d.bruto}</td><td class="num" style="color:var(--green)">${d.neto}</td></tr>`).join('')}
      </tbody>
    </table>
  </div>
  <div class="grid g3" style="margin-top:16px">
    <div class="kpi"><div class="kh"><div class="ki" style="background:rgba(31,168,74,.12);color:var(--green)"><span class="mi">timer</span></div></div><div class="val" style="color:var(--green)">14.98<span class="suf">h</span></div><div class="lbl">Horas netas acumuladas</div></div>
    <div class="kpi"><div class="kh"><div class="ki"><span class="mi">restaurant</span></div></div><div class="val">72<span class="suf">min</span></div><div class="lbl">Lunch deducido</div></div>
    <div class="kpi"><div class="kh"><div class="ki" style="background:rgba(230,180,34,.16);color:#C79400"><span class="mi">event_available</span></div></div><div class="val" style="color:#C79400">2<span class="suf">/ 5</span></div><div class="lbl">Días completados</div></div>
  </div>
  <div class="banner info" style="margin-top:16px"><span class="mi">info</span><div>Regla de lunch: si tu lunch dura menos de 30 min, se deducen 30 min mínimo. Después de 6 horas continuas debes tomar tu lunch.</div></div>`;
};
function dayDetail(dia){
  const d=COL.timesheet.find(x=>x.dia===dia);
  openModal(`<div class="modal-h"><h3>Detalle · ${dia}</h3><div class="x" onclick="closeModal()"><span class="mi">close</span></div></div>
  <div class="modal-b">
    ${d.ent==='—'?`<div class="banner info"><span class="mi">info</span><div>Aún no hay ponches registrados para este día.</div></div>`:`
    <div class="irow"><span class="k">Entrada</span><span class="v num">${d.ent}</span></div>
    <div class="irow"><span class="k">Salida</span><span class="v num">${d.sal}</span></div>
    <div class="irow"><span class="k">Tiempo de lunch</span><span class="v">${d.lunch}</span></div>
    <div class="irow"><span class="k">Horas brutas</span><span class="v num">${d.bruto} h</span></div>
    <div class="irow"><span class="k">Deducción lunch</span><span class="v num">- 0.50 h</span></div>
    <div class="irow"><span class="k">Horas netas</span><span class="v num" style="color:var(--green)">${d.neto} h</span></div>`}
  </div>`);
}

RENDER.Pago=function(){
  const p=COL.pago;
  document.getElementById('content').innerHTML=`
  <div class="ph"><div><h1>Mi Pago</h1><div class="sub">Tu historial de pagos recibidos. El monto del próximo pago lo calcula y confirma Contabilidad.</div></div></div>

  <div class="banner info" style="margin-bottom:18px"><span class="mi">lock</span><div>El pago de la <b>semana en curso</b> aún no está disponible: Contabilidad lo calcula y aprueba al cierre. No verás el monto hasta que el pago se libere.</div></div>

  <div class="grid g3" style="margin-bottom:18px">
    <div class="kpi"><div class="kh"><div class="ki" style="background:rgba(31,168,74,.12);color:var(--green)"><span class="mi">account_balance_wallet</span></div></div><div class="val" style="color:var(--green)">${p.ultimo.monto}</div><div class="lbl">Último pago recibido</div><div class="foot">Pagado el <strong>${p.ultimo.fecha}</strong></div></div>
    <div class="kpi"><div class="kh"><div class="ki"><span class="mi">payments</span></div></div><div class="val">${p.total30}</div><div class="lbl">Total pagado (últimos 30 días)</div></div>
    <div class="kpi"><div class="kh"><div class="ki"><span class="mi">receipt_long</span></div></div><div class="val">${p.recibidosAnio}</div><div class="lbl">Pagos recibidos este año</div></div>
  </div>

  <div class="card pad0">
    <div class="card-h" style="padding:18px 20px 12px"><h3>Historial de pagos</h3><span class="mi">history</span></div>
    <table class="tbl">
      <thead><tr><th>Semana</th><th>Hotel(es)</th><th>Horas</th><th>Monto</th><th>Fecha de pago</th><th style="text-align:right">Estado</th></tr></thead>
      <tbody>
        <tr style="background:var(--surface-2)">
          <td><b>16 – 22 Jun</b><div style="font-size:11px;color:var(--ink-3)">Semana en curso</div></td>
          <td>Hotel Costa del Sol</td><td class="num">—</td><td class="num">—</td><td>—</td>
          <td style="text-align:right"><span class="meta-pill" style="background:var(--o-50);color:var(--o-700)">En cálculo</span></td>
        </tr>
        ${p.historial.map(h=>`<tr>
          <td><b>${h.sem}</b></td><td>${h.hotel}</td><td class="num">${h.horas}</td>
          <td class="num" style="color:var(--green)">${h.monto}</td><td>${h.fecha}</td>
          <td style="text-align:right"><span class="meta-pill" style="background:rgba(31,168,74,.1);color:var(--green)">Pagado</span></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>

  <div class="banner warn" style="margin-top:18px"><span class="mi">visibility_off</span><div>No puedes ver el monto de tu <b>próximo pago</b> hasta que Contabilidad lo libere. El historial muestra solo pagos ya realizados; no incluye pay rate interno ni deducciones detalladas.</div></div>`;
};

RENDER.Disponibilidad=function(){
  const on=COL.disponible;
  document.getElementById('content').innerHTML=`
  <div class="ph"><div><h1>Disponibilidad</h1><div class="sub">Decláralo tú mismo cuando estés en descanso y quieras cubrir turnos extra.</div></div></div>

  <div class="card pad disp-card ${on?'disp-on':''}" id="dispCard" style="margin-bottom:16px">
    <div style="display:flex;align-items:center;gap:16px">
      <div class="disp-ic"><span class="mi">event_available</span></div>
      <div style="flex:1;min-width:0">
        <div style="font-weight:700;font-size:15.5px">Disponible para turnos extra</div>
        <div style="font-size:13px;color:var(--ink-3);margin-top:3px">Activa el estado <b>Amarillo (Disponible voluntario)</b>. Es la única acción que puedes activar tú mismo, sin aprobación.</div>
      </div>
      <div class="disp-ctrl">
        <label class="switch"><input type="checkbox" id="dispToggle" ${on?'checked':''} onchange="toggleDisp(this.checked)"><span class="tr"></span></label>
        <span class="switch-lbl ${on?'on':''}" id="dispLbl">${on?'Activo':'Inactivo'}</span>
      </div>
    </div>
    <div class="disp-state ${on?'on':''}" id="dispState">${dispStateHTML()}</div>
  </div>

  <div class="card" style="margin-bottom:16px">
    <div class="card-h"><h3>¿Cómo funciona?</h3><span class="mi">help_outline</span></div>
    <div class="card-b">
      <div class="flow">
        <div class="flow-step"><div class="flow-ic"><span class="flow-num">1</span><span class="mi">event_available</span></div><div class="flow-t">Te declaras disponible</div>${stChip('amarillo')}</div>
        <div class="flow-arrow"><span class="mi">arrow_forward</span></div>
        <div class="flow-step"><div class="flow-ic"><span class="flow-num">2</span><span class="mi">assignment_ind</span></div><div class="flow-t">Una reclutadora te asigna</div>${stChip('cafe')}</div>
        <div class="flow-arrow"><span class="mi">arrow_forward</span></div>
        <div class="flow-step"><div class="flow-ic"><span class="flow-num">3</span><span class="mi">qr_code_scanner</span></div><div class="flow-t">Trabajas y ponchas</div><div class="flow-s">Se genera tu Timesheet</div></div>
        <div class="flow-arrow"><span class="mi">arrow_forward</span></div>
        <div class="flow-step"><div class="flow-ic"><span class="mi">replay</span></div><div class="flow-t">Al terminar, regresas</div>${stChip('verde')}</div>
      </div>
      <div class="banner info" style="margin-top:18px"><span class="mi">info</span><div>Estar disponible <b>no</b> es una asignación: no tienes schedule ni ponche hasta que una reclutadora te asigne (estado Café).</div></div>
    </div>
  </div>

  <div class="grid g2">
    <div class="card pad0">
      <div class="card-h" style="padding:18px 20px 12px"><h3>Turnos extra recientes</h3><span class="mi">history</span></div>
      <table class="tbl">
        <thead><tr><th>Fecha</th><th>Hotel</th><th>Horas</th><th style="text-align:right">Estado</th></tr></thead>
        <tbody>
          <tr><td><b>12 Jun</b></td><td>Hotel Punta Vista</td><td class="num">6.0 h</td><td style="text-align:right"><span class="meta-pill" style="background:rgba(31,168,74,.1);color:var(--green)">Completado</span></td></tr>
          <tr><td><b>05 Jun</b></td><td>Hotel Costa del Sol</td><td class="num">8.0 h</td><td style="text-align:right"><span class="meta-pill" style="background:rgba(31,168,74,.1);color:var(--green)">Completado</span></td></tr>
        </tbody>
      </table>
      <div style="padding:12px 20px;font-size:12px;color:var(--ink-3);border-top:1px solid var(--line)">Cubriste <strong style="color:var(--ink)">14 h extra</strong> en los últimos 30 días.</div>
    </div>
    <div class="card"><div class="card-h"><h3>Cuándo activarla</h3><span class="mi">tips_and_updates</span></div>
      <div class="card-b" style="display:flex;flex-direction:column;gap:12px">
        <div style="display:flex;gap:10px"><span class="mi" style="color:var(--green)">check_circle</span><div style="font-size:13px;color:var(--ink-2)">Estás en tu <b>día de descanso</b> y quieres ganar horas extra.</div></div>
        <div style="display:flex;gap:10px"><span class="mi" style="color:var(--green)">check_circle</span><div style="font-size:13px;color:var(--ink-2)">Tu hotel principal no tiene turno para ti hoy.</div></div>
        <div style="display:flex;gap:10px"><span class="mi" style="color:var(--ink-4)">cancel</span><div style="font-size:13px;color:var(--ink-2)">No la actives si ya tienes turno asignado: <b>no</b> reemplaza tu schedule fijo.</div></div>
        <div class="banner ok" style="margin-top:2px"><span class="mi">savings</span><div>Los turnos extra se pagan aparte y suman a tu cobro semanal.</div></div>
      </div>
    </div>
  </div>`;
};
function dispStateHTML(){
  return COL.disponible
    ? `<span class="mi" style="color:#B8860B;font-size:18px">check_circle</span>${stChip('amarillo')}<span>Estás visible para asignaciones temporales. Te avisaremos si una reclutadora te asigna.</span>`
    : `<span class="mi" style="color:var(--ink-4);font-size:18px">info</span>${stChip(COL.estado)}<span>No estás declarado como disponible voluntario en este momento.</span>`;
}
function toggleDisp(v){
  COL.disponible=v;
  const card=document.getElementById('dispCard'); if(card) card.classList.toggle('disp-on',v);
  const st=document.getElementById('dispState'); if(st){st.className='disp-state'+(v?' on':'');st.innerHTML=dispStateHTML();}
  const lbl=document.getElementById('dispLbl'); if(lbl){lbl.textContent=v?'Activo':'Inactivo';lbl.classList.toggle('on',v);}
  toast(v?'Ahora estás disponible para turnos extra (Amarillo)':'Disponibilidad desactivada', v?'event_available':'event_busy');
}

RENDER.Accidente=function(){
  document.getElementById('content').innerHTML=`
  <div class="ph"><div><h1>Reportar accidente laboral</h1><div class="sub">Si sufriste un accidente en el trabajo, repórtalo aquí. Se notifica de inmediato al Inspector.</div></div></div>

  <div class="banner warn" style="margin-bottom:18px"><span class="mi">health_and_safety</span><div>Al enviar este reporte: se crea una <b>tarjeta de accidente</b>, tu estado pasa a <b>Gris (accidentado)</b> y quedas <b>protegido</b> de la regla de 3 inasistencias mientras dure tu incapacidad.</div></div>

  <div class="card pad">
    <div class="grid g2">
      <div class="field"><label>Tipo de accidente <span class="req">*</span></label>
        <select class="sel" id="accTipo"><option value="">Selecciona…</option><option>Caída / resbalón</option><option>Corte / herida</option><option>Quemadura</option><option>Esfuerzo / lesión muscular</option><option>Golpe / contusión</option><option>Otro</option></select></div>
      <div class="field"><label>Fecha y hora <span class="req">*</span></label><input class="inp" id="accFecha" type="datetime-local"></div>
    </div>
    <div class="field"><label>Lugar dentro del hotel <span class="req">*</span></label><input class="inp" id="accLugar" placeholder="Ej. Pasillo piso 3, cocina, área de lavandería…"></div>
    <div class="field"><label>¿Qué ocurrió? <span class="req">*</span></label><textarea class="ta" id="accDesc" placeholder="Describe brevemente cómo ocurrió el accidente…"></textarea><div class="hint">Mínimo 15 caracteres. Sé claro: esta descripción la revisa el Inspector.</div></div>
    <div class="grid g2">
      <div class="field"><label>¿Requiere atención médica? <span class="req">*</span></label>
        <select class="sel" id="accMed"><option value="">Selecciona…</option><option>Sí — ya recibí atención</option><option>Sí — la necesito</option><option>No por ahora</option></select></div>
      <div class="field"><label>Testigos (opcional)</label><input class="inp" id="accTest" placeholder="Nombre de compañeros que lo vieron"></div>
    </div>
    <div class="field"><label>Evidencia (opcional)</label>
      <div class="upload" onclick="toast('Selector de archivos (demo)','image')"><span class="mi" style="font-size:30px">add_a_photo</span><div style="margin-top:6px;font-weight:600">Adjunta una foto del lugar o la lesión</div><div class="hint">JPG, PNG · La geolocalización se adjunta automáticamente desde la app móvil</div></div>
    </div>
    <div class="divider"></div>
    <div style="display:flex;justify-content:flex-end;gap:10px">
      <button class="btn ghost" onclick="navigate(document.querySelector('[data-page=Inicio]'),'Inicio')">Cancelar</button>
      <button class="btn primary" onclick="enviarAccidente()"><span class="mi">send</span>Enviar reporte</button>
    </div>
  </div>`;
};
function enviarAccidente(){
  const tipo=document.getElementById('accTipo').value, lugar=document.getElementById('accLugar').value.trim(), desc=document.getElementById('accDesc').value.trim(), med=document.getElementById('accMed').value;
  if(!tipo||!lugar||desc.length<15||!med){toast('Completa los campos obligatorios (descripción ≥ 15 caracteres)','error');return;}
  COL.estado='gris'; updateUserUI();
  openModal(`<div class="modal-h"><h3>Reporte enviado</h3><div class="x" onclick="closeModal();navigate(document.querySelector('[data-page=Inicio]'),'Inicio')"><span class="mi">close</span></div></div>
  <div class="modal-b">
    <div style="text-align:center;padding:8px 0 16px"><div style="width:64px;height:64px;border-radius:50%;background:#E9F9EF;color:var(--green);display:flex;align-items:center;justify-content:center;margin:0 auto"><span class="mi" style="font-size:34px">check_circle</span></div></div>
    <div class="irow"><span class="k">Tarjeta de accidente</span><span class="v">Creada · ACC-0428</span></div>
    <div class="irow"><span class="k">Tu estado ahora</span><span class="v">${stChip('gris')}</span></div>
    <div class="irow"><span class="k">Notificado a</span><span class="v">Inspector de zona</span></div>
    <div class="irow"><span class="k">Protección</span><span class="v" style="color:var(--green)">Activa (3 inasistencias)</span></div>
    <div class="banner info" style="margin-top:16px"><span class="mi">info</span><div>El Inspector dará seguimiento. Tu estado volverá a <b>Disponible</b> cuando recibas el alta médica y se cierre la tarjeta.</div></div>
  </div>
  <div class="modal-f"><button class="btn primary" onclick="closeModal();navigate(document.querySelector('[data-page=Inicio]'),'Inicio')">Entendido</button></div>`);
}

RENDER.Notificaciones=function(){
  const un=COL.notifs.filter(n=>n.unread).length;
  document.getElementById('content').innerHTML=`
  <div class="ph"><div><h1>Notificaciones</h1><div class="sub">${un} sin leer.</div></div>
    <div class="ph-right"><button class="btn ghost sm" onclick="markAll();RENDER.Notificaciones()"><span class="mi">done_all</span>Marcar todas como leídas</button></div></div>
  <div class="card pad0">
    ${COL.notifs.map(n=>`<div class="notif ${n.unread?'unread':''}" onclick="readNotif(${n.id});RENDER.Notificaciones()">
      <div class="ic" style="background:${ICBG[n.cl]};color:${ICW[n.cl]}"><span class="mi">${n.ic}</span></div>
      <div style="flex:1"><div class="t">${n.t}</div><div class="x">${n.x}</div><div class="tm">${n.tm}</div></div>
      ${n.unread?'<div class="ud"></div>':''}
    </div>`).join('')}
  </div>`;
};
function readNotif(id){const n=COL.notifs.find(x=>x.id===id);if(n)n.unread=false;updateNotifBadge();}
function markAll(){COL.notifs.forEach(n=>n.unread=false);updateNotifBadge();toast('Todas marcadas como leídas','done_all');}
function updateNotifBadge(){const un=COL.notifs.filter(n=>n.unread).length;const b=document.getElementById('hdBadge');if(b){b.textContent=un;b.style.display=un?'':'none';}}

/* ===== Header dropdowns ===== */
function toggleDd(id){
  const dd=document.getElementById(id), willOpen=!dd.classList.contains('open');
  document.querySelectorAll('.dd.open').forEach(d=>d.classList.remove('open'));
  if(willOpen){ if(id==='notifDd')renderNotifDd(); if(id==='profDd')renderProfDd(); dd.classList.add('open'); }
}
function closeDd(){document.querySelectorAll('.dd.open').forEach(d=>d.classList.remove('open'));}
document.addEventListener('click',function(e){
  if(!e.target.closest('#notifWrap')&&!e.target.closest('#profWrap')) closeDd();
});
function renderNotifDd(){
  document.getElementById('notifDd').innerHTML=`
    <div class="dd-head"><h4>Notificaciones</h4><span class="act" onclick="markAll();renderNotifDd()">Marcar todas como leídas</span></div>
    <div class="dd-scroll">
      ${COL.notifs.map(n=>`<div class="notif-item ${n.unread?'unread':''}" onclick="readNotif(${n.id});renderNotifDd()">
        <div class="ni-ic ${n.cl}"><span class="mi">${n.ic}</span></div>
        <div class="txt"><div><strong>${n.t}</strong> — ${n.x}</div><div class="tm">${n.tm}</div></div>
        ${n.unread?'<div class="dot-unread"></div>':''}
      </div>`).join('')}
    </div>
    <div class="dd-foot"><span class="lk" onclick="closeDd();navigate(null,'Notificaciones')">Ver todas las notificaciones</span></div>`;
}
function renderProfDd(){
  document.getElementById('profDd').innerHTML=`
    <div class="prof-head">
      <div class="avatar lg">${COL.ini}</div>
      <div><div style="font-weight:700;font-size:14px">${COL.nombre}</div><div style="font-size:12px;color:var(--ink-3)">${COL.posicion}</div>
        <div class="prof-zone"><span class="mi">place</span>${COL.hotel}</div></div>
    </div>
    <div style="padding:12px 20px;border-bottom:1px solid var(--line)">${stChip(COL.estado)}</div>
    <div class="prof-menu">
      <div class="mi-item" onclick="closeDd();openPerfil('datos')"><span class="mi">person</span>Mi perfil y datos</div>
      <div class="mi-item" onclick="closeDd();openPerfil('estado')"><span class="mi">monitor_heart</span>Mi estado</div>
      <div class="mi-item" onclick="closeDd();toast('Abriendo configuración…','settings')"><span class="mi">settings</span>Configuración</div>
      <div class="dd-divider"></div>
      <div class="mi-item danger" onclick="closeDd();toast('Cerrando sesión…','logout')"><span class="mi">logout</span>Cerrar sesión</div>
    </div>`;
}
function openPerfil(tab){navigate(null,'Perfil');if(tab)perfilTab(tab);}

/* ============================ ONBOARDING (Fase 2 + Fase 3) ============================ */
const OB_CAT={
  pos:['Housekeeper','Houseman','Laundry','Chef'],
  eng:['Básico','Intermedio','Avanzado','Conversacional'],
  mod:['Tiempo completo','Medio tiempo','Temporal','Según solicitud'],
  exp:['Sin experiencia','Menos de 1 año','1–2 años','3–5 años','Más de 5 años'],
  trans:['Propio (auto)','Transporte público','Bicicleta','A pie','Otro'],
  par:['Madre','Padre','Esposo/a','Hermano/a','Hijo/a','Amigo/a','Otro'],
  sangre:['O+','O−','A+','A−','B+','B−','AB+','AB−']
};
const OB={step:1,data:{}};
function obSel(id,opts){return `<select class="sel" id="${id}"><option value="">Selecciona…</option>${opts.map(o=>`<option ${OB.data[id]===o?'selected':''}>${o}</option>`).join('')}</select>`;}
function obInp(id,ph,type){return `<input class="inp" id="${id}" type="${type||'text'}" placeholder="${ph||''}" value="${OB.data[id]||''}">`;}
function obTop(){return `<div class="ob-top"><div class="lg"><div class="dot"></div><span class="mark">ORANJE</span></div><button class="btn ghost sm" onclick="obExit()"><span class="mi">close</span>Salir del demo</button></div>`;}
function obStepsBar(){
  const steps=[['Datos laborales',1],['Emergencia',2],['Revisar',3]];
  return `<div class="ob-steps">${steps.map(function(s,i){var n=s[1],cls=OB.step>n?'done':(OB.step===n?'active':'');return (i?'<div class="ob-line"></div>':'')+'<div class="ob-step '+cls+'"><span class="n">'+(OB.step>n?'<span class="mi" style="font-size:16px">check</span>':n)+'</span><span class="t">'+s[0]+'</span></div>';}).join('')}</div>`;
}
function demoSeg(m){document.querySelectorAll('#demoSwitch .seg button').forEach(function(b){b.classList.toggle('active',b.dataset.m===m);});}
function setDemoMode(m){ if(m==='nuevo'){ startOnboarding(); } else { obExit(); navigate(null,'Inicio'); } }
function startOnboarding(){OB.step=1;OB.data={};demoSeg('nuevo');document.getElementById('onboarding').classList.add('show');obRender();}
function obExit(){document.getElementById('onboarding').classList.remove('show');demoSeg('activo');}
function obCollect(){document.querySelectorAll('#onboarding [id^="ob_"]').forEach(function(el){OB.data[el.id]=el.value;});}
function obBack(){obCollect();OB.step--;obRender();}
function obNext(){
  obCollect();
  const req=OB.step===1?['ob_pos','ob_eng','ob_mod']:['ob_emnom','ob_emtel','ob_empar','ob_sangre'];
  for(const r of req){ if(!OB.data[r]){ toast('Completa los campos obligatorios (*)','error'); return; } }
  OB.step++; obRender(); document.getElementById('onboarding').scrollTop=0;
}
function obSubmit(){OB.step='done';obRender();document.getElementById('onboarding').scrollTop=0;}
function obValidateDemo(){obExit();toast('Tu reclutadora validó tu alta — acceso habilitado','verified');navigate(null,'Inicio');}
function obReviewRow(k,v){return `<div class="irow"><span class="k">${k}</span><span class="v">${v||'—'}</span></div>`;}
function obDocHTML(){
  if(OB.data.ob_doc){
    return `<div class="upload done" onclick="obDocPick()"><span class="mi" style="font-size:26px">task</span><div style="margin-top:6px;font-weight:700">${OB.data.ob_doc}</div><div class="hint" style="color:var(--green)">Documento adjuntado · toca para cambiar</div></div>`;
  }
  const on=((OB.data.ob_ssn||'').trim()||(OB.data.ob_itin||'').trim());
  return `<div class="upload${on?'':' disabled'}" id="obDocUp" onclick="obDocPick()"><span class="mi" style="font-size:26px">upload_file</span><div style="margin-top:6px;font-weight:600">Adjunta tu documento (SSN / ITIN)</div><div class="hint" id="obDocHint">${on?'Recomendado: adjunta tu documento · JPG, PNG o PDF':'Disponible al ingresar tu SSN o ITIN'}</div></div>`;
}
function obHasFiscal(){return !!((OB.data.ob_ssn||'').trim()||(OB.data.ob_itin||'').trim());}
function obFiscalCheck(){
  const ssn=document.getElementById('ob_ssn'), itin=document.getElementById('ob_itin');
  const on=(ssn&&ssn.value.trim())||(itin&&itin.value.trim());
  if(!OB.data.ob_doc){
    const up=document.getElementById('obDocUp');
    if(up){ up.classList.toggle('disabled',!on); const h=document.getElementById('obDocHint'); if(h) h.textContent = on?'Recomendado: adjunta tu documento · JPG, PNG o PDF':'Disponible al ingresar tu SSN o ITIN'; }
  }
  const b=document.getElementById('obRetBanner'); if(b) b.style.display = on?'none':'';
}
function obDocPick(){
  const up=document.getElementById('obDocUp');
  if(up&&up.classList.contains('disabled')){ toast('Primero ingresa tu SSN o ITIN','info'); return; }
  obCollect(); OB.data.ob_doc='documento-ssn.jpg'; obRender(); toast('Documento adjuntado (demo)','attach_file');
}
function obRender(){
  const c=document.getElementById('onboarding');
  if(OB.step==='done'){
    c.innerHTML=obTop()+`<div class="ob-wrap"><div class="ob-card"><div class="ob-success">
      <div style="width:72px;height:72px;border-radius:50%;background:var(--surface-3);display:flex;align-items:center;justify-content:center;margin:0 auto"><span class="mi" style="font-size:40px;color:var(--ink-3)">hourglass_top</span></div>
      <h1 style="font-size:21px;font-weight:800;margin-top:16px">¡Información enviada!</h1>
      <p style="color:var(--ink-2);max-width:460px;margin:8px auto 0;font-size:13.5px">Completaste tu registro (Fase 2 y Fase 3). Tu cuenta está en <b>revisión</b>; tu reclutadora validará tus datos para habilitarte el acceso a la plataforma.</p>
      <div style="margin:16px 0">${stChip('blanco')}</div>
      <div class="banner warn" style="max-width:480px;margin:0 auto;text-align:left"><span class="mi">lock</span><div>Mientras estés en <b>Pre-asignación (Blanco)</b> aún no tienes acceso a los módulos ni puedes ser asignado a un hotel.</div></div>
      <div style="display:flex;gap:10px;justify-content:center;margin-top:22px;flex-wrap:wrap">
        <button class="btn ghost" onclick="obExit()">Salir del demo</button>
        <button class="btn primary" onclick="obValidateDemo()"><span class="mi">verified</span>Simular validación de reclutadora</button>
      </div>
    </div></div></div>`;
    return;
  }
  let body,head;
  if(OB.step===1){
    head=['Datos laborales','Cuéntanos sobre tu perfil de trabajo. Esta es tu Fase 2.'];
    body=`
    <div class="ob-readonly">
      <div><div class="k">NOMBRE (FASE 1)</div><div class="v">${COL.nombre}</div></div>
      <div><div class="k">TELÉFONO</div><div class="v">${COL.tel}</div></div>
      <div><div class="k">CAPTURADO POR</div><div class="v">Tu reclutadora</div></div>
    </div>
    <div class="ob-grid">
      <div class="field"><label>SSN</label><input class="inp" id="ob_ssn" placeholder="•••-••-••••" value="${OB.data.ob_ssn||''}" oninput="obFiscalCheck()"></div>
      <div class="field"><label>ITIN</label><input class="inp" id="ob_itin" placeholder="9XX-XX-XXXX" value="${OB.data.ob_itin||''}" oninput="obFiscalCheck()"></div>
      <div class="field"><label>Posición <span class="req">*</span></label>${obSel('ob_pos',OB_CAT.pos)}</div>
      <div class="field"><label>Nivel de inglés <span class="req">*</span></label>${obSel('ob_eng',OB_CAT.eng)}</div>
      <div class="field"><label>Nivel de experiencia</label>${obSel('ob_exp',OB_CAT.exp)}</div>
      <div class="field"><label>Tipo de transporte</label>${obSel('ob_trans',OB_CAT.trans)}</div>
      <div class="field"><label>Modalidad <span class="req">*</span></label>${obSel('ob_mod',OB_CAT.mod)}</div>
    </div>
    <div class="field"><label>Documento de SSN / ITIN</label>${obDocHTML()}</div>
    <div class="banner warn" id="obRetBanner" ${obHasFiscal()?'style="display:none"':''}><span class="mi">percent</span><div><b>Sin SSN ni ITIN</b> se te aplicará una <b>retención del 16%</b> sobre tu pago. Es <b>reembolsable</b>: se te devuelve cuando entregues tus documentos fiscales a Contabilidad.</div></div>`;
  } else if(OB.step===2){
    head=['Datos de emergencia','Por tu seguridad. Esta es tu Fase 3.'];
    body=`
    <div class="ob-grid">
      <div class="field"><label>Contacto de emergencia — nombre <span class="req">*</span></label>${obInp('ob_emnom','Nombre completo')}</div>
      <div class="field"><label>Teléfono del contacto <span class="req">*</span></label>${obInp('ob_emtel','+1 555 0000','tel')}</div>
      <div class="field"><label>Parentesco <span class="req">*</span></label>${obSel('ob_empar',OB_CAT.par)}</div>
      <div class="field"><label>Tipo de sangre <span class="req">*</span></label>${obSel('ob_sangre',OB_CAT.sangre)}</div>
    </div>
    <div class="field"><label>Alergias o condiciones médicas</label><textarea class="ta" id="ob_aler" placeholder="Opcional — escribe 'Ninguna' si no aplica">${OB.data.ob_aler||''}</textarea></div>`;
  } else {
    head=['Revisa y envía','Verifica tu información antes de enviarla a validación.'];
    const d=OB.data;
    body=`
    <div class="sec-title" style="margin-top:0">Fase 2 · Datos laborales</div>
    ${obReviewRow('SSN',d.ob_ssn)}${obReviewRow('ITIN',d.ob_itin)}${obReviewRow('Documento',d.ob_doc)}${obReviewRow('Retención 16%', obHasFiscal()?'No aplica':'Sí — sin SSN/ITIN (reembolsable)')}${obReviewRow('Posición',d.ob_pos)}${obReviewRow('Nivel de inglés',d.ob_eng)}${obReviewRow('Experiencia',d.ob_exp)}${obReviewRow('Transporte',d.ob_trans)}${obReviewRow('Modalidad',d.ob_mod)}
    <div class="sec-title">Fase 3 · Emergencia</div>
    ${obReviewRow('Contacto',d.ob_emnom)}${obReviewRow('Teléfono',d.ob_emtel)}${obReviewRow('Parentesco',d.ob_empar)}${obReviewRow('Tipo de sangre',d.ob_sangre)}${obReviewRow('Alergias',d.ob_aler)}
    <div class="banner info" style="margin-top:14px"><span class="mi">info</span><div>Al enviar, tu cuenta pasa a <b>revisión</b> (estado Blanco). Tu reclutadora validará tus datos para habilitarte el acceso.</div></div>`;
  }
  const footer = OB.step<3
    ? `<div class="ob-foot">${OB.step>1?'<button class="btn ghost" onclick="obBack()"><span class="mi">arrow_back</span>Atrás</button>':'<span></span>'}<button class="btn primary" onclick="obNext()">Continuar<span class="mi">arrow_forward</span></button></div>`
    : `<div class="ob-foot"><button class="btn ghost" onclick="obBack()"><span class="mi">arrow_back</span>Atrás</button><button class="btn primary" onclick="obSubmit()"><span class="mi">send</span>Enviar para validación</button></div>`;
  c.innerHTML=obTop()+`<div class="ob-wrap"><div class="ob-card">
    <div class="ob-head"><h1>${head[0]}</h1><p>${head[1]}</p></div>
    ${obStepsBar()}
    <div class="ob-body">${body}</div>
    ${footer}
  </div></div>`;
}

RENDER.Perfil=function(){
  document.getElementById('content').innerHTML=`
  <div class="ph"><div><h1>Mi Perfil</h1><div class="sub">Tu información personal. Algunos datos solo los puede cambiar tu reclutadora.</div></div></div>

  <div class="hero" style="margin-bottom:18px">
    <div class="hero-left">
      <div class="avatar xl">${COL.ini}</div>
      <div><h2>${COL.nombre}</h2><div class="subm">${COL.posicion} · ${COL.hotel} · ${COL.zona}</div><div style="margin-top:9px">${stChip(COL.estado)}</div></div>
    </div>
  </div>

  <div class="tabs" style="margin-bottom:18px">
    <div class="tab active" data-t="datos" onclick="perfilTab('datos')">Datos</div>
    <div class="tab" data-t="emergencia" onclick="perfilTab('emergencia')">Emergencia</div>
    <div class="tab" data-t="estado" onclick="perfilTab('estado')">Mi estado</div>
  </div>
  <div id="perfilBody"></div>`;
  perfilTab('datos');
};
function perfilTab(t){
  document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active',x.dataset.t===t));
  const b=document.getElementById('perfilBody');
  if(t==='datos'){
    b.innerHTML=`<div class="grid g2">
      <div class="card"><div class="card-h"><h3>Datos personales</h3><span class="mi">badge</span></div>
        <div class="card-b">
          <div class="irow"><span class="k">Nombre completo</span><span class="v">${COL.nombre}</span></div>
          <div class="irow"><span class="k">Edad</span><span class="v">${COL.edad} años</span></div>
          <div class="irow"><span class="k">Género</span><span class="v">${COL.genero}</span></div>
          <div class="irow"><span class="k">Domicilio</span><span class="v">${COL.domicilio}</span></div>
          <div class="irow"><span class="k">Teléfono</span><span class="v">${COL.tel} <button class="btn ghost sm" style="margin-left:6px" onclick="editContacto()"><span class="mi" style="font-size:15px">edit</span></button></span></div>
          <div class="irow"><span class="k">Correo</span><span class="v">${COL.email}</span></div>
        </div>
      </div>
      <div class="card"><div class="card-h"><h3>Datos laborales (Fase 2)</h3><span class="mi">work</span></div>
        <div class="card-b">
          <div class="irow"><span class="k">Posición</span><span class="v">${COL.posicion}</span></div>
          <div class="irow"><span class="k">Modalidad</span><span class="v">${COL.modalidad}</span></div>
          <div class="irow"><span class="k">Nivel de inglés</span><span class="v">${COL.ingles}</span></div>
          <div class="irow"><span class="k">Experiencia</span><span class="v">${COL.experiencia}</span></div>
          <div class="irow"><span class="k">Transporte</span><span class="v">${COL.transporte}</span></div>
          <div class="irow"><span class="k">SSN</span><span class="v">${COL.ssn}</span></div>
        </div>
      </div>
    </div>
    <div class="banner ok" style="margin-top:16px"><span class="mi">verified</span><div>Tu onboarding está completo (Fase 1, 2 y 3). Tu reclutadora validó tus datos.</div></div>`;
  } else if(t==='emergencia'){
    b.innerHTML=`<div class="grid g2">
      <div class="card"><div class="card-h"><h3>Contacto de emergencia (Fase 3)</h3><span class="mi">emergency</span></div>
        <div class="card-b">
          <div class="irow"><span class="k">Nombre</span><span class="v">${COL.emerg.nombre}</span></div>
          <div class="irow"><span class="k">Teléfono</span><span class="v">${COL.emerg.tel}</span></div>
          <div class="irow"><span class="k">Parentesco</span><span class="v">${COL.emerg.parentesco}</span></div>
        </div>
      </div>
      <div class="card"><div class="card-h"><h3>Datos médicos</h3><span class="mi">medical_information</span></div>
        <div class="card-b">
          <div class="irow"><span class="k">Tipo de sangre</span><span class="v">${COL.sangre}</span></div>
          <div class="irow"><span class="k">Alergias o condiciones</span><span class="v">${COL.alergias}</span></div>
        </div>
      </div>
    </div>
    <div style="margin-top:16px"><button class="btn ghost" onclick="editContacto()"><span class="mi">edit</span>Actualizar contacto de emergencia</button></div>`;
  } else {
    b.innerHTML=`<div class="card pad">
      <div style="display:flex;gap:14px;align-items:center;margin-bottom:6px;flex-wrap:wrap">${stChip(COL.estado)}<span style="font-weight:700;font-size:15px">${SEM[COL.estado].label}</span></div>
      <p style="color:var(--ink-2);font-size:13.5px">${SEM[COL.estado].desc}</p>
      <div class="divider"></div>
      <div class="sec-title" style="margin-top:0">Los 12 estados del semáforo</div>
      <div class="legend">${Object.keys(SEM).map(k=>`<span class="it"><span class="pip" style="background:${SEM[k].c};${k==='blanco'?'border:1px solid #ccc':''}"></span>${SEM[k].label}</span>`).join('')}</div>
    </div>`;
  }
}
function editContacto(){
  openModal(`<div class="modal-h"><h3>Actualizar contacto</h3><div class="x" onclick="closeModal()"><span class="mi">close</span></div></div>
  <div class="modal-b">
    <div class="banner info" style="margin-bottom:16px"><span class="mi">info</span><div>Como colaborador solo puedes editar tus <b>datos de contacto</b>. El resto lo gestiona tu reclutadora.</div></div>
    <div class="field"><label>Teléfono</label><input class="inp" id="edTel" value="${COL.tel}"></div>
    <div class="field"><label>Correo</label><input class="inp" id="edEmail" value="${COL.email}"></div>
    <div class="field"><label>Contacto de emergencia — teléfono</label><input class="inp" id="edEmTel" value="${COL.emerg.tel}"></div>
  </div>
  <div class="modal-f"><button class="btn ghost" onclick="closeModal()">Cancelar</button><button class="btn primary" onclick="saveContacto()"><span class="mi">save</span>Guardar</button></div>`);
}
function saveContacto(){
  COL.tel=document.getElementById('edTel').value; COL.email=document.getElementById('edEmail').value; COL.emerg.tel=document.getElementById('edEmTel').value;
  closeModal(); toast('Datos de contacto actualizados','check_circle');
  const active=document.querySelector('.tab.active'); if(active) perfilTab(active.dataset.t);
}

/* ============================ INIT ============================ */
function updateUserUI(){const n=document.getElementById('sbName');if(n)n.textContent=COL.alias;const a=document.getElementById('sbAv');if(a)a.textContent=COL.ini;}
updateNotifBadge();
navigate(document.querySelector('[data-page=Inicio]'),'Inicio');
