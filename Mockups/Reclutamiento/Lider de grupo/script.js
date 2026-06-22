// =====================================================================
// Oranje — Líder de Grupo · Lógica de la aplicación
// Extraído del bloque <script> del mockup. Script clásico (funciones globales).
// =====================================================================
  // SIDEBAR
  function toggleSidebar(){
    document.getElementById('sidebar').classList.toggle('collapsed');
  }
  function navigate(el,name){
    document.querySelectorAll('.sb-item').forEach(x=>x.classList.remove('active'));
    if(el) el.classList.add('active');
    document.getElementById('crumb').textContent = name;
    // swap page-view
    document.querySelectorAll('.page-view').forEach(p=>{
      p.style.display = (p.dataset.pageView===name) ? '' : 'none';
    });
    if(name==='Reclutamiento' && window.__renderRecl) window.__renderRecl();
    if(name==='Requisiciones' && window.__renderRequi) window.__renderRequi();
    if(name==='Blacklist' && window.__renderBl) window.__renderBl();
    // scroll content to top
    const c = document.querySelector('.content'); if(c) c.scrollTop=0;
  }

  // DROPDOWNS
  function toggleDd(id){
    const all=['notifDd','profDd','searchDd'];
    all.forEach(x=>{ if(x!==id) document.getElementById(x).classList.remove('open'); });
    document.getElementById(id).classList.toggle('open');
  }
  function openSearch(){
    document.getElementById('notifDd').classList.remove('open');
    document.getElementById('profDd').classList.remove('open');
    document.getElementById('searchDd').classList.add('open');
  }
  document.addEventListener('click',e=>{
    if(!e.target.closest('#notifWrap')) document.getElementById('notifDd').classList.remove('open');
    if(!e.target.closest('#profWrap')) document.getElementById('profDd').classList.remove('open');
    if(!e.target.closest('#searchWrap')) document.getElementById('searchDd').classList.remove('open');
  });

  // TABS (bandejas)
  function switchTab(el){
    el.parentElement.querySelectorAll('.tray-tab').forEach(x=>x.classList.remove('active'));
    el.classList.add('active');
  }

  // ===================================================================
  // DASHBOARD (Líder de Grupo) — acciones de los widgets
  // ===================================================================
  function lgToast(msg){
    const t=document.getElementById('toast'), m=document.getElementById('toastMsg'), a=document.getElementById('toastAction');
    if(!t||!m){ return; }
    m.textContent = msg;
    if(a){ a.style.display='none'; a.onclick=null; }
    t.classList.add('show');
    clearTimeout(window.__lgToastT);
    window.__lgToastT = setTimeout(()=>t.classList.remove('show'), 2600);
  }
  // Navegación desde los widgets del dashboard hacia las páginas reales
  function lgGoPool(){
    navigate(document.querySelector('.sb-item[data-page="Reclutamiento"]'),'Reclutamiento');
  }
  function lgGoMisRequis(){
    navigate(document.querySelector('.sb-item[data-page="Requisiciones"]'),'Requisiciones');
    if(window.__requiSetTab) window.__requiSetTab('mias');
  }

  // ---- Bandejas de acción (tabla con pestañas reales) ----
  const LG_GRADS = {
    orange:'linear-gradient(135deg,#FF8E00,#C85F00)', purple:'linear-gradient(135deg,#8B55D6,#3C1A6E)',
    green:'linear-gradient(135deg,#2FD6A3,#0F8E6C)',  blue:'linear-gradient(135deg,#3B7DDD,#1E4C9E)',
    red:'linear-gradient(135deg,#E44A4A,#9A2020)'
  };
  const LG_BADGES = {
    done:{cls:'done', ic:'check_circle', lbl:'Completa'},
    wait:{cls:'wait', ic:'schedule',     lbl:'Pendiente docs'},
    info:{cls:'info', ic:'info',         lbl:'En revisión'},
    upd: {cls:'info', ic:'sync',         lbl:'Datos actualizados'},
    appr:{cls:'wait', ic:'how_to_reg',   lbl:'Espera aprobación'}
  };
  const LG_ACTS = {
    view:    {ic:'visibility', title:'Ver perfil'},
    reject:  {ic:'close',      title:'Rechazar'},
    validate:{ic:'check',      title:'Validar', primary:true},
    remind:  {ic:'send',       title:'Enviar recordatorio'},
    approve: {ic:'check',      title:'Aprobar', primary:true}
  };
  const LG_TRAY = {
    candidatos: [
      {ini:'ML', grad:'orange', nm:'María López',     ps:'Housekeeper · 4.8 ★', req:'#001', pos:'Housekeeper', badge:'done', when:'Hoy · 08:24',  acts:['view','reject','validate'],
        prof:{zona:'Centro', tel:'310 555 0142', mail:'maria.lopez@oranje.app', mod:'Tiempo completo', ing:'Intermedio', exp:'3 años en housekeeping (Hotel Andino, Hotel Real).', docs:[['Cédula',true],['Hoja de vida',true],['Certificado EPS',true],['Antecedentes',true]]}},
      {ini:'CR', grad:'purple', nm:'Carlos Ruiz',     ps:'Chef · 4.6 ★',        req:'#002', pos:'Chef',        badge:'done', when:'Hoy · 07:55',  acts:['view','reject','validate'],
        prof:{zona:'Sur', tel:'320 555 0188', mail:'carlos.ruiz@oranje.app', mod:'Tiempo completo', ing:'Avanzado', exp:'5 años como chef de línea (Hotel Marina, Restaurante Sal).', docs:[['Cédula',true],['Hoja de vida',true],['Certificado EPS',true],['Antecedentes',true]]}},
      {ini:'AS', grad:'green',  nm:'Ana Sánchez',     ps:'Hoseman · 4.4 ★',     req:'#003', pos:'Hoseman',     badge:'wait', when:'Ayer · 17:30', acts:['view','remind','validate'],
        prof:{zona:'Este', tel:'315 555 0273', mail:'ana.sanchez@oranje.app', mod:'Medio tiempo', ing:'Básico', exp:'2 años en steward / hoseman (Hotel Aurora).', docs:[['Cédula',true],['Hoja de vida',true],['Certificado EPS',false],['Antecedentes',false]]}},
      {ini:'DH', grad:'blue',   nm:'Daniel Herrera',  ps:'Housekeeper · 4.9 ★', req:'#001', pos:'Housekeeper', badge:'done', when:'Ayer · 14:10', acts:['view','reject','validate'],
        prof:{zona:'Norte', tel:'301 555 0319', mail:'daniel.herrera@oranje.app', mod:'Tiempo completo', ing:'Intermedio', exp:'4 años en housekeeping (Hotel Bahía, Hotel Sol).', docs:[['Cédula',true],['Hoja de vida',true],['Certificado EPS',true],['Antecedentes',true]]}},
      {ini:'LM', grad:'red',    nm:'Luis Morales',    ps:'Chef · 4.5 ★',        req:'#002', pos:'Chef',        badge:'info', when:'Ayer · 11:02', acts:['view','reject','validate'],
        prof:{zona:'Oeste', tel:'318 555 0402', mail:'luis.morales@oranje.app', mod:'Tiempo completo', ing:'Conversacional', exp:'3 años como cocinero (Hotel Las Brisas).', docs:[['Cédula',true],['Hoja de vida',true],['Certificado EPS',true],['Antecedentes',false]]}}
    ],
    actualizaciones: [
      {ini:'PT', grad:'green',  nm:'Paola Torres',    ps:'Subió documento faltante', req:'#008', pos:'Recepción',   badge:'upd', when:'Hoy · 09:10',  acts:['view']},
      {ini:'JR', grad:'blue',   nm:'Jorge Ramírez',   ps:'Actualizó disponibilidad', req:'#002', pos:'Chef',        badge:'upd', when:'Hoy · 08:02',  acts:['view']},
      {ini:'NM', grad:'orange', nm:'Nadia Mejía',     ps:'Renovó cédula / RUT',      req:'#001', pos:'Housekeeper', badge:'upd', when:'Ayer · 19:40', acts:['view']}
    ],
    aprobaciones: [
      {ini:'AL', grad:'purple', nm:'Reasignar · Ana → Bea',     ps:'Solicitado por Ana López',   req:'#002', pos:'Chef',        badge:'appr', when:'Hoy · 07:30',  acts:['view','reject','approve']},
      {ini:'CS', grad:'orange', nm:'Reasignar · Carlos → Diana', ps:'Solicitado por Carlos Ruiz', req:'#003', pos:'Hoseman',     badge:'appr', when:'Ayer · 16:15', acts:['view','reject','approve']},
      {ini:'MV', grad:'green',  nm:'Rebalanceo de carga',        ps:'Solicitado por Marina Vega', req:'#001', pos:'Housekeeper', badge:'appr', when:'Ayer · 10:05', acts:['view','reject','approve']}
    ]
  };
  function lgTrayRow(r){
    const nm = String(r.nm).replace(/'/g,'');
    const acts = r.acts.map(a=>{
      const A = LG_ACTS[a];
      return `<button class="row-action-btn${A.primary?' primary':''}" title="${A.title}" onclick="lgTrayAct(this,'${a}','${nm}')"><span class="mi">${A.ic}</span></button>`;
    }).join('');
    const b = LG_BADGES[r.badge] || LG_BADGES.info;
    return `<tr>
      <td><div class="cand-cell"><div class="avatar sm" style="background:${LG_GRADS[r.grad]||LG_GRADS.orange}">${r.ini}</div><div><div class="nm">${r.nm}</div><div class="ps">${r.ps}</div></div></div></td>
      <td><strong style="color:var(--ink)">${r.req}</strong> · ${r.pos}</td>
      <td><span class="badge-pill ${b.cls}"><span class="mi">${b.ic}</span>${b.lbl}</span></td>
      <td>${r.when}</td>
      <td><div class="row-actions">${acts}</div></td>
    </tr>`;
  }
  function lgRenderTray(key){
    const body = document.getElementById('lgTrayBody');
    if(!body) return;
    if(key==='blacklist'){
      body.innerHTML = `<tr><td colspan="5"><div class="lg-tray-note"><span class="mi">block</span><div class="t"><strong>Módulo de Blacklist en definición</strong><span>Cualquier persona de reclutamiento podrá reportar colaboradores. El flujo se habilitará cuando se valide con ingeniería.</span></div></div></td></tr>`;
      return;
    }
    const rows = LG_TRAY[key] || [];
    body.innerHTML = rows.length
      ? rows.map(lgTrayRow).join('')
      : `<tr><td colspan="5"><div class="lg-tray-note"><span class="mi">inbox</span><div class="t"><strong>Sin pendientes</strong><span>No hay elementos en esta bandeja por ahora.</span></div></div></td></tr>`;
  }
  function lgTrayTab(el, key){
    el.parentElement.querySelectorAll('.tray-tab').forEach(x=>x.classList.remove('active'));
    el.classList.add('active');
    lgRenderTray(key);
  }
  // Descontar el contador de la pestaña activa al resolver un item
  function lgDecActiveCount(){
    const num = document.querySelector('.tray-tabs .tray-tab.active .num');
    if(num){ const n = parseInt(num.textContent,10)||0; if(n>0) num.textContent = String(n-1).padStart(2,'0'); }
  }
  // Lógica central de cada acción (la fila puede ser null si se dispara desde el modal)
  function lgDoAct(tr, action, name){
    const drop = ()=>{
      if(tr){
        tr.style.transition='opacity .24s, transform .24s'; tr.style.opacity='0'; tr.style.transform='translateX(10px)';
        setTimeout(()=>{ const tb=tr.parentElement; lgDecActiveCount(); tr.remove(); if(tb && !tb.children.length) lgRenderTray('__empty'); },230);
      } else { lgDecActiveCount(); }
    };
    if(action==='view'){     lgOpenCand(name); return; }
    if(action==='remind'){   lgToast('Recordatorio de documentos enviado a '+name); return; }
    if(action==='reject'){   drop(); lgToast(name+' · descartado de la bandeja'); return; }
    if(action==='validate'){ drop(); lgToast('✓ '+name+' validado · enviado a asignación'); return; }
    if(action==='approve'){  drop(); lgToast('✓ Aprobado · '+name); return; }
  }
  function lgTrayAct(btn, action, name){
    // "Enviar recordatorio": feedback visible en el propio botón
    if(action==='remind' && btn && btn.tagName==='BUTTON'){
      btn.innerHTML='<span class="mi">done</span>'; btn.classList.add('sent'); btn.disabled=true; btn.title='Recordatorio enviado';
      lgToast('Recordatorio de documentos enviado a '+name); return;
    }
    lgDoAct(btn ? btn.closest('tr') : null, action, name);
  }
  // Disparar una acción buscando la fila por nombre (usado desde el modal de perfil)
  function lgTrayActByName(action, name){
    const body = document.getElementById('lgTrayBody');
    let tr = null;
    if(body){ tr = Array.prototype.slice.call(body.querySelectorAll('tr')).find(t=>{ const e=t.querySelector('.cand-cell .nm'); return e && e.textContent.trim()===name; }) || null; }
    lgDoAct(tr, action, name);
  }
  // ---- Modal de perfil del candidato ----
  function lgFindRow(name){
    let r=null;
    Object.keys(LG_TRAY).forEach(k=>{ const f=(LG_TRAY[k]||[]).find(x=>String(x.nm).replace(/'/g,'')===name); if(f) r=f; });
    return r;
  }
  function lgCloseCand(){ const o=document.getElementById('lgCandOverlay'); if(o) o.remove(); }
  function lgOpenCand(name){
    const r = lgFindRow(name); if(!r) return;
    lgCloseCand();
    const b = LG_BADGES[r.badge] || LG_BADGES.info;
    const grad = LG_GRADS[r.grad] || LG_GRADS.orange;
    const p = r.prof;
    let body, foot;
    if(p){
      const fields = [['Posición', r.pos],['Zona', p.zona],['Teléfono', p.tel],['Correo', p.mail],['Modalidad', p.mod],['Inglés', p.ing]]
        .map(f=>`<div class="lg-cand-field"><div class="k">${f[0]}</div><div class="v">${f[1]}</div></div>`).join('');
      const docs = p.docs.map(d=>`<li class="${d[1]?'ok':'no'}"><span class="mi">${d[1]?'check_circle':'cancel'}</span>${d[0]}</li>`).join('');
      const faltan = p.docs.filter(d=>!d[1]).length;
      body = `
        <div class="lg-cand-sec">
          <div class="lg-cand-sec-t">Aplicó a</div>
          <div class="lg-cand-applied"><span class="mi">assignment</span><strong>${r.req}</strong> · ${r.pos} <span class="dot-sep">·</span> ${r.when}</div>
        </div>
        <div class="lg-cand-grid">${fields}</div>
        <div class="lg-cand-sec">
          <div class="lg-cand-sec-t">Experiencia</div>
          <div class="lg-cand-exp">${p.exp}</div>
        </div>
        <div class="lg-cand-sec">
          <div class="lg-cand-sec-t">Documentos ${faltan?`<span class="lg-cand-warn">· faltan ${faltan}</span>`:'<span class="lg-cand-ok">· completos</span>'}</div>
          <ul class="lg-cand-docs">${docs}</ul>
        </div>`;
      foot = `
        <button class="btn ghost" onclick="lgCloseCand()">Cerrar</button>
        <button class="btn ghost danger" onclick="lgCloseCand();lgTrayActByName('reject','${name}')"><span class="mi">close</span>Rechazar</button>
        <button class="btn primary" onclick="lgCloseCand();lgTrayActByName('validate','${name}')"><span class="mi">check</span>Validar candidato</button>`;
    } else {
      body = `
        <div class="lg-cand-sec">
          <div class="lg-cand-applied"><span class="mi">assignment</span><strong>${r.req}</strong> · ${r.pos} <span class="dot-sep">·</span> ${r.when}</div>
        </div>
        <div class="lg-cand-exp">${r.ps}</div>`;
      foot = `<button class="btn primary" onclick="lgCloseCand()">Cerrar</button>`;
    }
    const ov = document.createElement('div');
    ov.id = 'lgCandOverlay'; ov.className = 'lg-cand-overlay';
    ov.onclick = (e)=>{ if(e.target===ov) lgCloseCand(); };
    ov.innerHTML = `<div class="lg-cand-modal" role="dialog" aria-modal="true">
      <div class="lg-cand-head">
        <div class="avatar lg" style="background:${grad}">${r.ini}</div>
        <div class="lg-cand-id"><div class="nm">${r.nm}</div><div class="ps">${r.ps}</div></div>
        <span class="badge-pill ${b.cls}"><span class="mi">${b.ic}</span>${b.lbl}</span>
        <button class="lg-cand-x" title="Cerrar" onclick="lgCloseCand()"><span class="mi">close</span></button>
      </div>
      <div class="lg-cand-body">${body}</div>
      <div class="lg-cand-foot">${foot}</div>
    </div>`;
    document.body.appendChild(ov);
  }
  // Render inicial de la bandeja (el DOM ya está parseado: script va al final del body)
  try { lgRenderTray('candidatos'); } catch(e){}

  // ===================================================================
  // i18n — Toggle de idioma ES / EN (demo)
  // Traduce por nodo de texto usando un diccionario. Un MutationObserver
  // re-traduce el contenido renderizado dinámicamente (cards, drawers, modales).
  // Los íconos (.mi/.mio), <svg>, <script> y <style> se omiten.
  // ===================================================================
  let LANG = 'es';
  const _i18nOrig = new WeakMap();     // textNode -> texto original (ES)
  const _i18nPh = new WeakMap();       // input -> placeholder original (ES)
  const I18N = {
    // Sidebar
    'Principal':'Main', 'Reclutamiento':'Recruitment', 'Requisiciones':'Requisitions',
    'Supervisión':'Supervision', 'Mi Grupo':'My Group', 'Reportes':'Reports', 'Soporte':'Support',
    // Header / perfil
    'Líder de Grupo · Zona Centro':'Group Leader · Centro Zone',
    'Zona Centro · Líder de Grupo':'Centro Zone · Group Leader',
    'Cuenta':'Account', 'Mi información':'My information', 'Mi zona asignada':'My assigned zone',
    'Mis métricas':'My metrics', 'Mi grupo':'My group', 'Grupo Centro-Sur':'Centro-Sur Group',
    '6 reclutadoras a cargo · Zonas Centro y Sur':'6 recruiters managed · Centro and Sur zones',
    'Cobertura 87%':'Coverage 87%', '32 distribuidas':'32 placed', '2 escalados':'2 escalated',
    'T. prom. 2.4d':'Avg. time 2.4d', 'Ver Mi Grupo':'View My Group', 'Configuración':'Settings',
    'Cambiar contraseña':'Change password', 'Preferencias de notificación':'Notification preferences',
    'Cerrar sesión':'Log out', 'Idioma':'Language',
    'Buscar requisiciones, colaboradores, hoteles, blacklist…':'Search requisitions, collaborators, hotels, blacklist…',
    'Buscar por nombre, documento, teléfono o ID…':'Search by name, document, phone or ID…',
    'Buscar por ID, hotel, posición o zona…':'Search by ID, hotel, position or zone…',
    'Notificaciones':'Notifications', 'Marcar todas como leídas':'Mark all as read',
    // Dashboard
    'Bienvenida a Oranje, Juanita López':'Welcome to Oranje, Juanita López',
    'Esto es lo que está pasando hoy, 24 de abril con tu naranjitas.':"Here's what's happening today, April 24, with your naranjitas.",
    'Abril 2026':'April 2026', 'Exportar':'Export',
    'Requisiciones abiertas':'Open requisitions', '3 propiedades':'3 properties', 'activas':'active',
    'Requisiciones urgentes':'Urgent requisitions', 'antes de 24 hrs':'within 24 hrs', 'Atiende':'Attend',
    'Candidatos pendientes validar':'Candidates pending validation', 'aplicaciones completas':'complete applications',
    'Alertas críticas':'Critical alerts', 'Alta':'High', 'Vencidas':'Overdue',
    'Acciones rápidas':'Quick actions', 'Atajos más usados':'Most used shortcuts',
    'Eficiencia esta semana':'Efficiency this week', 'más que la semana pasada':'more than last week',
    'Nuevo colaborador':'New collaborator', 'Crear perfil manualmente':'Create profile manually',
    'Buscar en pool':'Search in pool', '47 candidatos disponibles':'47 available candidates',
    'Consultar blacklist':'Check blacklist', 'Verificar historial':'Check history',
    'Tomar requisición':'Take requisition', '08 en la bandeja de autorizadas':'08 in the authorized inbox',
    'Generar reporte':'Generate report', 'Cobertura del grupo':'Group coverage',
    'Resumen del grupo':'Group summary', '6 reclutadoras · Zonas Centro y Sur':'6 recruiters · Centro and Sur zones',
    'Meta mensual':'Monthly goal', 'Cubiertas · pendientes':'Covered · pending',
    'requisiciones en proceso':'requisitions in progress', 'Reclutadoras activas':'Active recruiters',
    'en vacaciones':'on vacation', 'Casos escalados':'Escalated cases', 'Pendientes de atención':'Pending attention',
    'Pool de candidatos':'Candidate pool', 'Disponibilidad por posición · en tiempo real':'Availability by position · real-time',
    'Ver pool completo':'View full pool', 'Candidatos totales disponibles':'Total available candidates',
    'Mis requisiciones':'My requisitions', '5 activas · ordenadas por prioridad':'5 active · sorted by priority',
    'Filtrar':'Filter', 'Ver todas las requisiciones (08)':'View all requisitions (08)',
    'Bandejas de acción':'Action trays', 'Requieren tu revisión ahora':'Require your review now',
    'Candidatos listos':'Ready candidates', 'Actualizaciones':'Updates', 'Aprobaciones':'Approvals',
    'Candidato':'Candidate', 'Requisición':'Requisition', 'Estado app':'App status', 'Aplicó':'Applied', 'Acciones':'Actions',
    'Completa':'Complete', 'Pendiente docs':'Pending docs', 'En revisión':'Under review', 'Hoy':'Today', 'Ayer':'Yesterday',
    'Comodín':'Wildcard', 'Stand by':'Stand by',
    // Reclutamiento (Pool)
    'Pool de colaboradores · Vivo':'Collaborator pool · Live',
    'Da de alta nuevos colaboradores, mantén su semáforo actualizado y consulta su historial. Las asignaciones se registran automáticamente en el Schedule del hotel.':'Add new collaborators, keep their status updated and check their history. Assignments are recorded automatically in the hotel Schedule.',
    'Colaboradores en pool':'Collaborators in pool', 'Disponibles ahora':'Available now',
    'En onboarding / pre-asignación':'In onboarding / pre-assignment', 'Casos críticos / blacklist':'Critical cases / blacklist',
    'Pool de colaboradores':'Collaborator pool', 'Posición':'Position', 'Zona':'Zone', 'Modalidad':'Modality',
    'Inglés':'English', 'Estado':'Status', 'Hotel':'Hotel', 'Todas':'All', 'Todos':'All',
    'Tablero':'Board', 'Tarjetas':'Cards', 'Tabla':'Table', 'Lista':'List', 'Ver detalle':'View detail',
    'Disponible':'Available', 'Disp. voluntario':'Voluntary avail.', 'Fijo':'Fixed', 'Asignación temp.':'Temp. assignment',
    'Onboarding D1-2':'Onboarding D1-2', 'Día 3+ uniforme':'Day 3+ uniform', 'Pre-asignación':'Pre-assignment',
    'No regresó':'Did not return', 'Reportado':'Reported', 'Vetado':'Banned',
    'Listo para asignar':'Ready to assign', 'Por horas / fin de semana':'Hourly / weekend',
    'En requisición permanente':'Permanent requisition', 'Cobertura corta':'Short coverage',
    'Inducción inicial':'Initial induction', 'En entrega de uniforme':'Uniform handout', 'Captura sin asignar':'Captured, unassigned',
    'Pausa temporal':'Temporary pause', 'Falta sin aviso':'No-show', 'Incidencia abierta':'Open incident',
    'Asignar temporalmente':'Assign temporarily', 'Cancelar asignación temporal':'Cancel temporary assignment',
    'Asignación temporal':'Temporary assignment', 'Hotel destino':'Destination hotel', 'Duración (días)':'Duration (days)',
    'Confirmar asignación':'Confirm assignment', 'Cancelar':'Cancel', 'Cerrar':'Close',
    'Entrevistas':'Interviews', 'Mis Entrevistas':'My Interviews', 'Historial del Grupo':'Group History',
    'Validar y enviar al Pool':'Validate and send to Pool', 'Rechazar candidato':'Reject candidate',
    'Datos del candidato':'Candidate data', 'Editar':'Edit', 'Reclutadora responsable':'Responsible recruiter',
    // Requisiciones
    'Bandeja de Autorizadas':'Authorized Inbox', 'Estado de urgencia':'Urgency status',
    'Urgentes':'Urgent', 'Pronto':'Soon', 'Normales':'Normal', 'Menos de 72 horas':'Less than 72 hours',
    'Entre 72 y 120 horas':'Between 72 and 120 hours', 'Más de 120 horas':'More than 120 hours',
    'Autorizadas':'Authorized', 'En colaboración':'In collaboration', 'Listas para recibir colaboradores':'Ready to receive collaborators',
    'Compartidas entre reclutadores':'Shared between recruiters', 'Cobertura de vacantes':'Vacancy coverage',
    'Tomar requisición':'Take requisition', 'Unirme':'Join', 'Ver requisición':'View requisition',
    'Ver detalles':'View details', 'Asignar colaboradores':'Assign collaborators',
    'Tipo de requisicion':'Requisition type', 'Tipo de contrato':'Contract type', 'Filtros':'Filters',
    // Niveles de inglés y modalidades (valores de card)
    'Básico':'Basic', 'Intermedio':'Intermediate', 'Avanzado':'Advanced', 'Conversacional':'Conversational',
    'Tiempo completo':'Full time', 'Medio tiempo':'Part time', 'Por hora':'Hourly', 'Por horas':'Hourly', 'Según solicitud':'On request',
    // Hero de Reclutamiento (fragmentos del h1)
    'Captura y mantén el':'Capture and keep the', 'pool de colaboradores':'collaborator pool', 'al día.':'up to date.',
    // ===== Expansión i18n (cobertura completa) =====
    // Header / dropdowns
    'Hoteles':'Hotels','Búsquedas recientes':'Recent searches','Reclutadoras del grupo':'Group recruiters',
    'Ver todas las notificaciones':'View all notifications','Grupo':'Group',
    'Nueva requisición asignada':'New requisition assigned','Candidato completó la App':'Candidate completed the App',
    'Requisición con urgencia Red':'Requisition with Red urgency','Caso escalado por QA':'Case escalated by QA',
    'Reclutadora cubrió al 100%':'Recruiter reached 100% coverage','Reclutadora reportó un problema':'Recruiter reported a problem',
    'Solicitud de reporte del Manager':'Report request from the Manager','Requiere atención inmediata':'Requires immediate attention',
    // Reclutamiento pool
    'Pool de colaboradores · Vivo':'Collaborator pool · Live','Pool de colaboradores':'Collaborator pool',
    'En onboarding / pre-asignación':'In onboarding / pre-assignment','Casos críticos / blacklist':'Critical cases / blacklist',
    'Por zona':'By zone','hoy':'today',
    'Disponible':'Available','Listo para asignar':'Ready to assign','Por horas / fin de semana':'Hourly / weekend',
    'En requisición permanente':'Permanent requisition','Asignación temp.':'Temp. assignment','Cobertura corta':'Short coverage',
    'Inducción inicial':'Initial induction','Día 3+ uniforme':'Day 3+ uniform','En entrega de uniforme':'Uniform handout',
    'Pre-asignación':'Pre-assignment','Captura sin asignar':'Captured, unassigned','No regresó':'Did not return',
    'Disp. voluntario':'Voluntary avail.','Fijo':'Fixed','Onboarding D1-2':'Onboarding D1-2','Stand by':'Stand by',
    'Reportado':'Reported','Recepción':'Reception','Mantenimiento':'Maintenance','Mesero':'Waiter','Cocinero':'Cook','Chef / Cocinero':'Chef / Cook',
    // Ficha colaborador (drawer)
    'Datos':'Data','Laboral':'Work','Historial de asignaciones':'Assignment history','Documentos':'Documents','Identificación':'ID',
    'Estado en blacklist':'Blacklist status','Sin registro de blacklist':'No blacklist record','Apto para ser asignado a hotel.':'Eligible to be assigned to a hotel.',
    'Asignar temporalmente':'Assign temporarily','Cancelar asignación temporal':'Cancel temporary assignment',
    'Asignación temporal':'Temporary assignment','Hotel destino':'Destination hotel','Duración (días)':'Duration (days)','Confirmar asignación':'Confirm assignment',
    'Nombre completo':'Full name','Documentos del colaborador':'Collaborator documents','Identificación oficial':'Official ID','Currículum / Hoja de vida':'Résumé / CV',
    // Candidate modal (bandeja de acción)
    'Aplicó a':'Applied to','Teléfono':'Phone','Correo':'Email','Experiencia':'Experience',
    'Cédula':'ID card','Hoja de vida':'Résumé','Certificado EPS':'Health certificate','Antecedentes':'Background check',
    'Cerrar':'Close','Rechazar':'Reject','Validar candidato':'Validate candidate','Cancelar':'Cancel',
    '· completos':'· complete','Posición':'Position','Modalidad':'Modality',
    // Requisiciones — hero / kpis / filtros / tabs
    'BANDEJA DE HOY · SELF-PICK ACTIVO':'TODAY INBOX · SELF-PICK ACTIVE',
    'Toma requisiciones autorizadas y cubre la posición.':'Take authorized requisitions and cover the position.',
    'Las urgentes (rojo) entran primero. Toma las que puedas cubrir, asigna colaboradores del pool y cierra cuando estén completas.':'Urgent ones (red) come first. Take the ones you can cover, assign collaborators from the pool and close them when complete.',
    'Bandeja autorizadas':'Authorized inbox','Urgentes (24h)':'Urgent (24h)','Tasa cobertura (mes)':'Coverage rate (month)',
    'Estados de urgencias':'Urgency states','Estado de la requisición':'Requisition status','Tipo de requisicion':'Requisition type','Tipo de contrato':'Contract type',
    'Bandeja de Autorizadas':'Authorized Inbox','Mis requisiciones':'My requisitions','Todas':'All','Todos':'All',
    'Tablero':'Board','Tarjetas':'Cards','Tabla':'Table',
    // Requisiciones — board columnas
    'ESTADO DE URGENCIA':'URGENCY STATUS','ESTADO DE LA REQUISICIÓN':'REQUISITION STATUS','Estado de urgencia':'Urgency status',
    'Urgentes':'Urgent','Menos de 72 horas':'Less than 72 hours','Pronto':'Soon','Entre 72 y 120 horas':'Between 72 and 120 hours','Normales':'Normal','Más de 120 horas':'More than 120 hours',
    'En proceso':'In progress','Asignando colaboradores':'Assigning collaborators','Parciales':'Partial','Cerradas con faltantes de puestos':'Closed with missing positions','Cubiertas':'Covered','100% completas':'100% complete',
    'Autorizadas':'Authorized','En colaboración':'In collaboration','Listas para recibir colaboradores':'Ready to receive collaborators','Compartidas entre reclutadores':'Shared between recruiters','Ya puede recibir colaboradores':'Can now receive collaborators',
    // Requisiciones — card
    'Mixto · Fijo y Temporal':'Mixed · Fixed and Temporary','Varias modalidades':'Various modalities','Temporal':'Temporary',
    'URGENTE':'URGENT','PRONTO':'SOON','Cobertura de vacantes':'Vacancy coverage',
    'Tomar requisición':'Take requisition','Unirme':'Join','Ver requisición':'View requisition','Ver detalles':'View details','Ver detalle':'View detail','Asignar colaboradores':'Assign collaborators',
    'Auto-asignada por el sistema':'Auto-assigned by the system',
    // Dashboard — group summary
    'Resumen del grupo':'Group summary','Cobertura del grupo':'Group coverage','Meta mensual':'Monthly goal','Cubiertas · pendientes':'Covered · pending','requisiciones en proceso':'requisitions in progress','Reclutadoras activas':'Active recruiters','en vacaciones':'on vacation','Casos escalados':'Escalated cases','Pendientes de atención':'Pending attention',
    'más que la semana pasada':'more than last week',
    // Mi información panels
    'Mi información de perfil':'My profile information','Consulta los datos de tu perfil o cambia tu foto de perfil.':'View your profile data or change your profile photo.',
    'Correo electrónico':'Email','Zona geográfica y propiedades que tienes a tu cargo.':'Geographic zone and properties under your charge.',
    'Indicadores de desempeño de tu gestión como reclutadora.':'Performance indicators of your work as a recruiter.','Tasa de cobertura':'Coverage rate','Tiempo promedio de asignación':'Average assignment time',
    'Administra tu contraseña y la seguridad de tu cuenta.':'Manage your password and account security.','Contraseña':'Password','Autenticación de dos factores':'Two-factor authentication',
    'Personaliza tu experiencia en la plataforma.':'Customize your platform experience.','Email, push y en la app':'Email, push and in-app','Español (México)':'Spanish (Mexico)','Tono del logo':'Logo tone','Saludo del dashboard':'Dashboard greeting',
    'Líder de Grupo de Reclutadoras':'Recruiters Group Leader',
    // Modales (rechazar / recordatorio / nuevo colaborador / cobertura)
    'Enviar recordatorio al candidato':'Send reminder to candidate','descargue la app de Oranje':'download the Oranje app','al número registrado':'to the registered number','con link directo de descarga':'with a direct download link','con instrucciones paso a paso':'with step-by-step instructions','Aceptar y enviar':'Accept and send','Rechazar candidato':'Reject candidate',
    'Motivo del rechazo':'Reason for rejection','Documentos incompletos o inválidos':'Incomplete or invalid documents','Inconsistencias entre datos y documentos':'Inconsistencies between data and documents','No cumple con el perfil de la posición':'Does not meet the position profile','Experiencia insuficiente':'Insufficient experience','Zona geográfica no cubierta':'Geographic zone not covered','Explicación / detalles':'Explanation / details',
    'Registro creado y enviado con éxito':'Record created and sent successfully','Correo con liga al colaborador':'Email with link to the collaborator','Pendiente: completa su información':'Pending: complete their information','El colaborador debe llenar su perfil en la app':'The collaborator must fill out their profile in the app',
    'Cobertura de vacantes':'Vacancy coverage','Gris · Sin asignar':'Gray · Unassigned','Verde · Puestos autorizados cubierto':'Green · Authorized positions covered',
    // Hero requisiciones (fragmentos) + pills + posiciones
    'Bandeja de hoy · Self-pick activo':'Today inbox · Self-pick active',
    'Toma':'Take','requisiciones autorizadas':'authorized requisitions','y cubre la posición.':'and cover the position.',
    'Urgente':'Urgent','Normal':'Normal','Electricista':'Electrician',
    // Experiencias del modal de candidato
    '3 años en housekeeping (Hotel Andino, Hotel Real).':'3 years in housekeeping (Hotel Andino, Hotel Real).',
    '5 años como chef de línea (Hotel Marina, Restaurante Sal).':'5 years as line chef (Hotel Marina, Restaurante Sal).',
    '2 años en steward / hoseman (Hotel Aurora).':'2 years in steward / hoseman (Hotel Aurora).',
    '4 años en housekeeping (Hotel Bahía, Hotel Sol).':'4 years in housekeeping (Hotel Bahía, Hotel Sol).',
    '3 años como cocinero (Hotel Las Brisas).':'3 years as cook (Hotel Las Brisas).',
    // Reportes
    'Reportes del grupo':'Group reports','Genera y envía reportes formales al Manager de Reclutamiento':'Generate and send formal reports to the Recruitment Manager',
    'Programar envío':'Schedule send','Generar reporte':'Generate report','Tipo de reporte':'Report type','Rango de fechas':'Date range',
    'Esta semana':'This week','Este mes':'This month','Personalizado':'Custom','Todo el grupo':'Whole group','Destinatario':'Recipient',
    'Manager de Reclutamiento (automático)':'Recruitment Manager (automatic)','Generar vista previa':'Generate preview','Vista previa':'Preview',
    'Desglose por reclutadora':'Breakdown by recruiter','Enviar al Manager':'Send to Manager','Borrador':'Draft',
    'Histórico de reportes enviados':'History of sent reports','Desempeño individual':'Individual performance','Tiempo promedio de cobertura':'Average coverage time','Distribución de requisiciones':'Requisition distribution',
    'Reutilizar':'Reuse','Enviado':'Sent','Leído':'Read','Cobertura':'Coverage','Requisiciones':'Requisitions','Tiempo prom.':'Avg. time','Escalados':'Escalated','Reclutadora':'Recruiter','Cubiertas':'Covered',
    'Fecha':'Date','Tipo':'Type',
    // Ribbons de grupo del tablero
    '· Listas para recibir colaboradores':'· Ready to receive collaborators',
    '· Compartidas entre reclutadores':'· Shared between recruiters',
    // Dropdown de notificaciones (meta + cuerpos)
    'Atajo para abrir rápido:':'Quick-open shortcut:',
    'Hace 22 min · Ir a Nuevo Candidato ▸ Validar':'22 min ago · Go to New Candidate ▸ Validate',
    'Hace 1 hr · Requiere atención inmediata':'1 hr ago · Requires immediate attention',
    'Hace 3 hrs · Ver detalle':'3 hrs ago · View detail',
    'Hace 35 min · Cobertura del grupo +1':'35 min ago · Group coverage +1',
    'Hace 1 hr · Mi Grupo ▸ Carlos Mena':'1 hr ago · My Group ▸ Carlos Mena',
    'Hace 2 hrs · Reportes ▸ Generar':'2 hrs ago · Reports ▸ Generate',
    'Hace 4 min · Hotel Costa del Sol':'4 min ago · Hotel Costa del Sol',
    'Ayer · 17:40':'Yesterday · 17:40',
    '— El Manager de Reclutamiento te distribuyó':'— The Recruitment Manager distributed to you',
    '— María López terminó Fase 2, listo para validar en Fase 3':'— María López finished Phase 2, ready to validate in Phase 3',
    '— REQ #001 pasó al umbral crítico (<72h)':'— REQ #001 crossed the critical threshold (<72h)',
    '— Nuevo colaborador vetado agregado por QA':'— New banned collaborator added by QA',
    '— Investigación de Rojo cerrada para Carlos Ruiz':'— Red investigation closed for Carlos Ruiz',
    '— Fátima Soto cubrió REQ #0418 (Housekeeper) · ¡felicítala!':'— Fátima Soto covered REQ #0418 (Housekeeper) · congratulate her!',
    '— Carlos Mena escaló un caso · requiere tu atención de 1er nivel':'— Carlos Mena escalated a case · needs your 1st-level attention',
    '— Te pidió el reporte de cobertura del grupo':'— Requested the group coverage report from you',
    // Modales de ayuda / nuevo colaborador / rechazar / auto-asignada / cobertura
    'Se envió el acceso al colaborador por correo electrónico.':'The collaborator was sent access by email.',
    'Queda pendiente que complete su información en la app para continuar con la validación.':'It remains pending for them to complete their information in the app to continue with validation.',
    'Se notificará al candidato para que':'The candidate will be notified to',
    'y complete su registro (Fase 2: datos personales y Fase 3: carga de documentos).':'and complete their registration (Phase 2: personal data and Phase 3: document upload).',
    'Esta acción marca al candidato como':'This action marks the candidate as',
    'y lo retira del proceso. El motivo y la explicación quedarán registrados en su historial.':'and removes them from the process. The reason and explanation will be recorded in their history.',
    'Mínimo 15 caracteres — sé específico para futuras referencias.':'Minimum 15 characters — be specific for future reference.',
    'Cuando una requisición lleva':'When a requisition has been',
    'más de 24 horas':'more than 24 hours',
    'en la bandeja sin que ningún reclutador la tome, el sistema la asigna automáticamente a la reclutadora con':'in the inbox without any recruiter taking it, the system automatically assigns it to the recruiter with',
    'Meta KPI · Tasa de auto-asignación':'KPI goal · Auto-assignment rate',
    '1 de 3 requisiciones auto-asignadas — supera la meta. Toma requisiciones de la bandeja antes de las 24h para mantener la tasa baja.':'1 of 3 requisitions auto-assigned — beats the goal. Take requisitions from the inbox before 24h to keep the rate low.',
    'Cada puesto vacante se colorea según su estado de cobertura.':'Each vacant position is colored according to its coverage status.',
    'Puesto autorizado y aún no se le ha asignado ningún colaborador. Típico en requisiciones nuevas recién autorizadas.':'Authorized position with no collaborator assigned yet. Typical in newly authorized requisitions.',
    'Rojo · Faltan puestos  autorizados por cubrir':'Red · Authorized positions still to cover',
    'También está autorizada, pero todavía hay puestos pendientes para asignar colaboradores.':'It is also authorized, but there are still positions pending to assign collaborators.',
    'Puesto ya asignado — listo para arrancar.':'Position already assigned — ready to start.',
    'Cómoda':'Comfortable',
    // ===== Módulo Blacklist =====
    'Control de calidad · Vetados':'Quality control · Banned','Control de calidad':'Quality control',
    'Colaboradores vetados de la plataforma.':'Collaborators banned from the platform.','de la plataforma.':'from the platform.','Colaboradores vetados':'Banned collaborators',
    'Consulta el listado completo de blacklist, su motivo y quién lo propuso. Cualquier reclutador puede agregar a un colaborador con la justificación correspondiente.':'Check the full blacklist, its reason and who proposed it. Any recruiter can add a collaborator with the corresponding justification.',
    'Falta grave':'Serious offense','Hoteles con reportes':'Hotels with reports','crít.':'crit.',
    'Agregar a blacklist':'Add to blacklist','Zona':'Zone','Motivo':'Reason','Vetado por':'Banned by','Todos los vetados':'All banned',
    'Colaborador':'Collaborator','Motivo del veto':'Ban reason','Fecha de ingreso':'Entry date','Propuesto por':'Proposed by',
    'Todas las zonas':'All zones','Todos los motivos':'All reasons','3 faltas':'3 absences','QA · Operaciones':'QA · Operations',
    'Escalamiento automático · 3ª inasistencia':'Automatic escalation · 3rd absence','Sistema Oranje':'Oranje System',
    'Vetado · Blacklist':'Banned · Blacklist','Veto':'Ban','Blacklist actualizado':'Blacklist updated',
    'Buscar por teléfono, nombre o documento (SSN)…':'Search by phone, name or document (SSN)…',
    // Drawer del veto
    'Género':'Gender','Datos de emergencia':'Emergency data','Contacto de emergencia':'Emergency contact','Tipo de sangre':'Blood type','Alergias o condiciones':'Allergies or conditions',
    'El colaborador proporcionó estos datos en su app durante el onboarding. La información es':'The collaborator provided this data in their app during onboarding. The information is','de solo lectura':'read-only',
    '7 días completados (Fijo)':'7 days completed (Fixed)','Fecha:':'Date:','Inasistencia 1 de 3':'Absence 1 of 3','Inasistencia 2 de 3':'Absence 2 of 3','Inasistencia 3 de 3':'Absence 3 of 3','Ingreso a Blacklist':'Entry to Blacklist',
    // Modal agregar veto
    'El colaborador quedará vetado de la plataforma. Esta acción se registra con tu nombre y requiere una justificación.':'The collaborator will be banned from the platform. This action is recorded under your name and requires a justification.',
    'Alemán':'German','Francés':'French','Portugués':'Portuguese',
    'Inglés Intermedio':'English Intermediate','Inglés Avanzado':'English Advanced','Inglés Básico':'English Basic','Alemán Avanzado':'German Advanced','Alemán Básico':'German Basic','Francés Avanzado':'French Advanced','Portugués Avanzado':'Portuguese Advanced',
    'Conducta grave · baja inmediata. El veto manual aplica solo a faltas graves; las 3 inasistencias las escala el sistema automáticamente.':'Serious misconduct · immediate removal. Manual ban applies only to serious offenses; the 3 absences are escalated automatically by the system.',
    'Tipo de falta grave':'Type of serious offense','Selecciona el tipo de falta grave…':'Select the type of serious offense…',
    'Agresión / violencia':'Assault / violence','Abandono de puesto':'Job abandonment','Falta a la seguridad':'Safety violation','Consumo de sustancias':'Substance use',
    'Justificación':'Justification','Describe brevemente lo ocurrido (mínimo 8 caracteres). Quedará en el historial del colaborador.':'Briefly describe what happened (minimum 8 characters). It will stay in the collaborator history.',
    'Pruebas / evidencia':'Evidence / proof','Adjunta fotos, reportes o documentos que respalden el veto. Quedarán en el expediente del colaborador.':'Attach photos, reports or documents supporting the ban. They will stay in the collaborator file.',
    'Adjunta pruebas o documentos de soporte':'Attach evidence or supporting documents','Capturas, correos, comprobantes · PDF, JPG, PNG · máx. 10 MB c/u':'Screenshots, emails, receipts · PDF, JPG, PNG · max. 10 MB each',
    'Confirmar veto':'Confirm ban','Ver perfil':'View profile','Selecciona un motivo…':'Select a reason…','Datos del candidato':'Candidate data',
    'Seguridad':'Security','Otro motivo (especificar abajo)':'Other reason (specify below)',
    '"Transición automática. Ramón Gutiérrez se convierte en colaborador fijo del Las Palmas."':'"Automatic transition. Ramón Gutiérrez becomes a permanent collaborator at Las Palmas."',
    '"No se presentó al turno matutino · Costa del Sol"':'"Did not show up for the morning shift · Costa del Sol"',
    '"Inasistencia sin aviso · Costa del Sol"':'"Absence without notice · Costa del Sol"',
    '"3ª inasistencia — escalado automático"':'"3rd absence — automatic escalation"',
    '"3ª inasistencia sin justificar — escalamiento automático a Blacklist (estado Negro)."':'"3rd unjustified absence — automatic escalation to Blacklist (Black status)."',
    // ----- Blacklist: motivos / falta grave -----
    'Abandono del puesto durante el turno':'Job abandonment during the shift','Agresión física o verbal':'Physical or verbal assault',
    'Violación grave de los protocolos de seguridad':'Serious violation of safety protocols','Especifica el motivo de la falta grave…':'Specify the reason for the serious offense…',
    '3 inasistencias sin justificación':'3 unjustified absences','Falta grave reportada en la operación.':'Serious offense reported in the operation.',
    'Caso investigado y validado a favor del hotel.':'Case investigated and validated in favor of the hotel.',
    // ----- Blacklist: estados / semáforo -----
    'Crítico · baja inmediata':'Critical · immediate removal','Estado Negro · veto permanente':'Black status · permanent ban',
    'Veto permanente · estado Negro · sin apelación.':'Permanent ban · Black status · no appeal.','Reportado · en revisión':'Reported · under review',
    'Investigación · Inspector':'Investigation · Inspector','Búsqueda activa':'Active search','Disponible para cobertura':'Available for coverage',
    'En stand by':'On stand by','Sin asignación':'No assignment','Difusión':'Outreach','Como está':'As is','Básico+':'Basic+',
    // ----- Blacklist: vistas / cabeceras -----
    'Colaboradores':'Collaborators','Colaborador fijo':'Permanent collaborator','Asignación actual':'Current assignment',
    'Asignación actual e historial':'Current assignment & history','Asignación actual reportada':'Reported current assignment',
    'Asignación actual · vigente':'Current assignment · active','Asignación anterior · finalizada':'Previous assignment · finished',
    'Situación actual':'Current situation','Origen del registro':'Record origin','Hoteles donde ha trabajado':'Hotels where they have worked',
    'Sin hoteles previos':'No previous hotels','Hotel del reporte':'Reporting hotel','Hotel donde ocurrió':'Hotel where it occurred',
    'Hotel al momento del reporte':'Hotel at the time of the report','Hotel al momento de las inasistencias':'Hotel at the time of the absences',
    'Reporte del hotel':'Hotel report','Schedule asignado · por':'Assigned schedule · by','Inspector de zona':'Zone Inspector',
    // ----- Blacklist: proponente / origen -----
    'Investigado y resuelto por':'Investigated and resolved by','Investigado y vetado por':'Investigated and banned by',
    'Veto registrado manualmente por el reclutador':'Ban registered manually by the recruiter','Escalamiento automático del sistema':'Automatic system escalation',
    'Automático · sistema · 3ª inasistencia':'Automatic · system · 3rd absence','Registrado por':'Registered by','Reportado por':'Reported by','Sistema':'System',
    // ----- Blacklist: schedule / datos -----
    'Día':'Day','Días':'Days','Horario':'Schedule','Horario fijo':'Fixed schedule','Horario fijo inamovible':'Fixed unmovable schedule',
    'Horario flexible':'Flexible schedule','Horario y modalidad':'Schedule and modality','Flexibilidad':'Flexibility',
    'Días por ley · al año':'Statutory days · per year','Próximo periodo vacacional':'Next vacation period','vacaciones de ley':'statutory vacation',
    'Tipo de transporte':'Transport type','Transporte público':'Public transport','Nivel de inglés':'English level','Nivel mínimo':'Minimum level',
    'Comprobante de domicilio':'Proof of address','Foto del colaborador':'Collaborator photo','Periodo':'Period',
    'Documento opcional subido por el colaborador · 860 KB':'Optional document uploaded by the collaborator · 860 KB',
    'Precargado automáticamente desde el alta del reclutador · PDF · 420 KB':'Preloaded automatically from the recruiter registration · PDF · 420 KB',
    'Aún no registra plazas anteriores en la plataforma.':'No previous positions registered on the platform yet.',
    // ----- Blacklist: filtros de periodo -----
    'Última asignación':'Last assignment','Último año':'Last year','Último mes':'Last month','Últimos 3 meses':'Last 3 months',
    'Últimos 6 meses':'Last 6 months','Cualquier fecha':'Any date','Selecciona la fecha de inicio':'Select the start date','Personalizado':'Custom',
    'Lun':'Mon','Mar':'Tue','Mié':'Wed','Jue':'Thu','Vie':'Fri','Sáb':'Sat','Dom':'Sun',
    // ----- Blacklist: pool de colaboradores (modal agregar) -----
    'Seleccionar para vetar':'Select to ban','Ver más pestañas':'See more tabs','Ver más':'See more','ver más':'see more',
    'Buscar en el pool por nombre, DOC o zona…':'Search the pool by name, DOC or zone…','Limpiar todos los filtros':'Clear all filters',
    'Sin coincidencias en el pool de colaboradores':'No matches in the collaborator pool','Sin colaboradores':'No collaborators',
    'Sin colaboradores para los filtros aplicados':'No collaborators for the applied filters',
    'colaboradores en el pool':'collaborators in the pool',
    // ----- Blacklist: situación del colaborador (narrativa) -----
    'Activó su disponibilidad voluntaria desde su app. Puede cubrir según solicitud del hotel.':'They activated their voluntary availability from their app. They can cover upon hotel request.',
    'Pausó temporalmente su disponibilidad desde su app. No tiene asignación activa.':'They temporarily paused their availability from their app. They have no active assignment.',
    'Completó su onboarding y está listo para ser asignado, pero aún no tiene una plaza activa.':'They completed onboarding and are ready to be assigned, but do not have an active position yet.',
    'Día 3+ con uniforme. Ya está operando en el hotel asignado.':'Day 3+ in uniform. Already operating at the assigned hotel.',
    'Colaborador fijo del hotel — su horario quedó bloqueado tras 7 días consecutivos.':'Permanent collaborator at the hotel — their schedule was locked after 7 consecutive days.',
    'Cubre una plaza de forma temporal, según solicitud del hotel.':'Covers a position temporarily, upon hotel request.',
    'En incapacidad médica por un accidente laboral. Conserva su plaza y queda protegido de la regla de 3 inasistencias.':'On medical leave due to a workplace accident. They keep their position and are protected from the 3-absence rule.',
    'Tiene un reporte abierto del hotel, en revisión por el Inspector de zona. Aún NO está vetado.':'Has an open hotel report, under review by the Zone Inspector. NOT banned yet.',
    'Está disponible en el pool. No tiene una asignación activa en este momento.':'Available in the pool. Has no active assignment at this moment.',
    // ----- Blacklist: narrativa de schedule (fragmentos) -----
    'Este es el horario que el colaborador eligió como':'This is the schedule the collaborator chose as','Este colaborador':'This collaborator',
    'El hotel ajustó el schedule de la cobertura.':'The hotel adjusted the coverage schedule.','El hotel respetó el schedule del colaborador.':'The hotel respected the collaborator schedule.',
    'Como su horario es':'Since their schedule is','Flexible dentro de los días y modalidad':'Flexible within the days and modality',
    'Se ofreció como disponible':'Offered as available','abierto a flexibilidad':'open to flexibility',
    ', calculadas desde su fecha de ingreso a la operación.':', calculated from their entry date into the operation.',
    ', la cobertura mantuvo exactamente los mismos días y horas que indicó en su app.':', the coverage kept exactly the same days and hours they indicated in their app.',
    ', la operación movió días u horas — manteniéndose dentro de la misma modalidad':', the operation moved days or hours — staying within the same modality',
    ': el hotel podía ajustarlo a otros días u horarios dentro de la misma modalidad según la operación.':': the hotel could adjust it to other days or schedules within the same modality as per the operation.',
    'No existe proceso de rehabilitación ni instancia de apelación. El registro se conserva íntegro para consulta interna y':'There is no rehabilitation process or appeal instance. The record is kept intact for internal reference and',
    'de reclutamiento.':'of recruitment.',
    // ----- Blacklist: segundo barrido -----
    'Ingreso a blacklist':'Entry to blacklist','Comentario:':'Comment:','Líder de Grupo':'Group Leader','Manager de Reclutamiento':'Recruitment Manager',
    '3ª inasistencia — escalado automático':'3rd absence — automatic escalation',
    'Ej. Reincidencia en inasistencias sin aviso durante el turno asignado en Costa del Sol…':'E.g. Repeated absences without notice during the assigned shift at Costa del Sol…',
    'consumir alcohol o sustancias prohibidas':'consuming alcohol or prohibited substances','pertenencias de huéspedes o bienes del hotel':'guests belongings or hotel property',
    'fue quitado de blacklist':'was removed from blacklist','fue su única plaza en la plataforma.':'was their only position on the platform.',
    'en este hotel, lo que disparó su ingreso':'at this hotel, which triggered their entry','no aparece en búsquedas activas':'does not appear in active searches',
    ', pero indicó estar':', but indicated being','. Activó su':'. Activated their',
    'para cubrir turnos extra en otros hoteles durante su tiempo libre, bajo el horario que mismo propuso — puede ser flexible dentro de los días y la modalidad acordados.':'to cover extra shifts at other hotels during their free time, under the schedule they proposed themselves — can be flexible within the agreed days and modality.',
    'para cubrir turnos extra en otros hoteles durante su tiempo libre, bajo el horario que misma propuso — puede ser flexible dentro de los días y la modalidad acordados.':'to cover extra shifts at other hotels during their free time, under the schedule they proposed themselves — can be flexible within the agreed days and modality.',
    // ----- Blacklist: tercer barrido (frase escalamiento + acumulado) -----
    'El colaborador acumuló':'The collaborator accumulated',
    '. El sistema lo escala a Blacklist (estado Negro) de forma':'. The system escalates them to Blacklist (Black status)',
    'automática':'automatically','tras la tercera falta, sin intervención manual.':'after the third absence, with no manual intervention.',
    'a Blacklist.':'to Blacklist.'
  };
  // Patrones para textos con partes variables (números, zonas, fechas)
  const I18N_PAT = [
    [/(\d+) colaboradores en pool · (\d+) estados/,'$1 collaborators in pool · $2 statuses'],
    [/(\d+) colaboradores en pool/,'$1 collaborators in pool'],
    [/(\d+) colaboradores en pool · (\d+) estados/,'$1 collaborators in pool · $2 statuses'],
    [/Promedio ([\d.]+)★ · (\d+) verificados/,'Average $1★ · $2 verified'],
    [/(\d+) verificados/,'$1 verified'],
    [/(\d+) hoteles/,'$1 hotels'],
    [/(\d+) colaboradores · Zonas/,'$1 collaborators · Zones'],
    [/abierta hace (\d+) días/,'opened $1 days ago'],
    [/abierta hace (\d+) día/,'opened $1 day ago'],
    [/abierta hoy/,'opened today'],
    [/Tomada hace (\d+)d (\d+)h/,'Taken $1d $2h ago'],
    [/Tomada hace (\d+)\s*d\b/,'Taken $1d ago'],
    [/Tomada hace (\d+)\s*h\b/,'Taken $1h ago'],
    [/Tomada hace (\d+)\s*min/,'Taken $1 min ago'],
    [/Cerrada hoy/,'Closed today'],[/Cerrada ayer/,'Closed yesterday'],[/Cerrada parcial/,'Closed partial'],
    [/(\d+) puestos · esperando/,'$1 positions · waiting'],
    [/(\d+) puesto · esperando/,'$1 position · waiting'],
    [/faltan (\d+) \((\d+)%\)/,'$1 missing ($2%)'],
    [/(\d+) en proceso/,'$1 in progress'],
    [/(\d+) reclutadores trabajándola/,'$1 recruiters working on it'],
    [/(\d+) reclutador trabajándola/,'$1 recruiter working on it'],
    [/Zona (Centro|Sur|Este|Oeste|Noroeste|Sureste)/g,'Zone $1'],
    [/(\d+) requisiciones · ordenadas por urgencia/,'$1 requisitions · sorted by urgency'],
    [/(\d+) requisición · ordenadas por urgencia/,'$1 requisition · sorted by urgency'],
    [/(\d+) requisiciones · tomadas por ti/,'$1 requisitions · taken by you'],
    [/(\d+) requisición · tomadas por ti/,'$1 requisition · taken by you'],
    [/(\d+) req\. activas · (\d+)% cobertura/,'$1 active req. · $2% coverage'],
    [/(\d+) requisiciones activas/,'$1 active requisitions'],
    [/(\d+) requisiciones/,'$1 requisitions'],
    [/Has validado/,'You have validated'],
    [/(\d+) candidatos/,'$1 candidates'],
    [/Hace (\d+) min/,'$1 min ago'],
    [/Hace (\d+) hrs/,'$1 hrs ago'],
    [/Hace (\d+) hr\b/,'$1 hr ago'],
    [/Hace (\d+) días/,'$1 days ago'],
    [/\bHoy\b/g,'Today'],[/\bAyer\b/g,'Yesterday'],
    [/· faltan (\d+)/,'· $1 missing'],
    [/faltan (\d+)/,'$1 missing'],
    [/(\d+) reclutadoras · Zonas Centro y Sur/,'$1 recruiters · Centro and Sur zones'],
    [/(\d+) años/,'$1 years'],
    [/\bDic\b/g,'Dec'],[/\bEne\b/g,'Jan'],[/\bAbr\b/g,'Apr'],[/\bAgo\b/g,'Aug'],
    [/(\d+) reclutadora(s?) trabajándola/,'$1 recruiter$2 working on it'],
    [/Hace (\d+)d (\d+)h/,'$1d $2h ago'],
    [/Hace (\d+)h\b/,'$1h ago'],
    [/Hace (\d+)d\b/,'$1d ago'],
    [/Zona Norte/g,'Zone Norte'],
    [/\bUrgente\b/g,'Urgent'],
    [/(\d+) años exp\./,'$1 years exp.'],[/1 año exp\./,'1 year exp.'],
    [/Manager de Área/g,'Area Manager'],[/Manager General/g,'General Manager'],
    [/Vetado · Motivo: /,'Banned · Reason: '],
    [/Por (\d+) faltas/,'For $1 absences'],
    // Blacklist: títulos de evento con hotel variable (hotel queda igual)
    [/No se presentó al turno matutino/g,'Did not show up for the morning shift'],
    [/No se presentó/g,'Did not show up'],
    [/Inasistencia sin aviso/g,'Absence without notice'],
    [/Reclutadora · Zona/g,'Recruiter · Zone'],
    [/Inspector de zona · Zona/g,'Zone Inspector · Zone'],
    [/(\d+) días a la semana/g,'$1 days per week'],[/(\d+) día a la semana/g,'$1 day per week'],
    [/(\d+) h totales/g,'$1 total h'],
    [/asignad[oa] de forma fija/g,'assigned on a fixed basis'],
    [/fij[oa] en\b/g,'fixed at'],
    [/Sistema · /g,'System · '],
    [/Botones · Zona/g,'Bellboy · Zone'],[/Mantenimiento · Zona/g,'Maintenance · Zone'],
    [/Mesero · Zona/g,'Waiter · Zone'],[/Recepción · Zona/g,'Reception · Zone'],
    [/Zona Costera/g,'Zone Costera'],[/Zona Poniente/g,'Zone Poniente'],[/Zona Oriente/g,'Zone Oriente'],
    // Blacklist: parentesco del contacto de emergencia
    [/\(esposo\)/g,'(husband)'],[/\(esposa\)/g,'(wife)'],[/\(madre\)/g,'(mother)'],[/\(padre\)/g,'(father)'],
    [/\(hermano\)/g,'(brother)'],[/\(hermana\)/g,'(sister)'],[/\(hijo\)/g,'(son)'],[/\(hija\)/g,'(daughter)'],
    [/\(amigo\)/g,'(friend)'],[/\(amiga\)/g,'(friend)'],[/\(hermano[ao]?\)/g,'(sibling)'],
  ];
  const _i18nSkip = node => { const p = node.parentElement; return !p || p.closest('.mi,.mio,script,style,svg,.wave,.lang-seg'); };
  function _i18nTxtEN(node){
    if(_i18nSkip(node)) return;
    const raw = node.nodeValue, key = raw.trim();
    if(!key) return;
    let en = (I18N[key] !== undefined) ? I18N[key] : I18N[key.replace(/\s+/g,' ')];
    if(en === undefined){
      let out = key;
      for(let i=0;i<I18N_PAT.length;i++){ out = out.replace(I18N_PAT[i][0], I18N_PAT[i][1]); }
      if(out !== key) en = out;
    }
    if(en !== undefined && en !== key){ if(!_i18nOrig.has(node)) _i18nOrig.set(node, raw); const v = en; node.nodeValue = raw.replace(key, function(){ return v; }); }
  }
  function _i18nTxtES(node){ if(_i18nOrig.has(node)){ node.nodeValue = _i18nOrig.get(node); _i18nOrig.delete(node); } }
  function _i18nWalk(root, toEN){
    if(root.nodeType === 3){ toEN ? _i18nTxtEN(root) : _i18nTxtES(root); return; }
    if(root.nodeType !== 1) return;
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const list = []; let n; while(n = tw.nextNode()) list.push(n);
    list.forEach(toEN ? _i18nTxtEN : _i18nTxtES);
    (root.querySelectorAll ? root.querySelectorAll('input[placeholder],textarea[placeholder]') : []).forEach(inp=>{
      if(toEN){ const en = I18N[(inp.placeholder||'').trim()]; if(en!==undefined){ if(!_i18nPh.has(inp)) _i18nPh.set(inp, inp.placeholder); inp.placeholder = en; } }
      else if(_i18nPh.has(inp)){ inp.placeholder = _i18nPh.get(inp); _i18nPh.delete(inp); }
    });
  }
  window.setLang = function(lang){
    LANG = (lang === 'en') ? 'en' : 'es';
    _i18nWalk(document.body, LANG === 'en');
    document.querySelectorAll('.lang-opt').forEach(b=> b.classList.toggle('active', b.dataset.lang === LANG));
    document.documentElement.setAttribute('lang', LANG);
  };
  try {
    const _i18nObs = new MutationObserver(muts=>{
      if(LANG !== 'en') return;
      muts.forEach(m=> m.addedNodes && m.addedNodes.forEach(node=> _i18nWalk(node, true)));
    });
    if(document.body) _i18nObs.observe(document.body, {childList:true, subtree:true});
  } catch(e){}

  // MI INFORMACION
  const MI_LABELS={
    info:'Mi información',
    zona:'Mi zona asignada',
    metricas:'Mis métricas',
    seguridad:'Seguridad',
    preferencias:'Preferencias'
  };
  let _prevCrumbHTML=null;
  function setMiCrumb(pane){
    const wrap=document.getElementById('crumbsWrap');
    wrap.innerHTML =
      '<span class="crumb crumb-root" style="cursor:pointer" onclick="closeMyInfoIfOpen()">Oranje</span>'+
      '<span class="mi sep">chevron_right</span>'+
      '<span class="crumb" style="cursor:pointer" onclick="miNavById(\'info\')">Mi cuenta</span>'+
      '<span class="mi sep">chevron_right</span>'+
      '<span class="current" id="crumb" style="font-weight:600">'+(MI_LABELS[pane]||'Mi información')+'</span>';
  }
  function restoreCrumb(){
    if(_prevCrumbHTML){
      document.getElementById('crumbsWrap').innerHTML=_prevCrumbHTML;
      _prevCrumbHTML=null;
    }
  }
  function openMyInfo(pane){
    document.getElementById('profDd').classList.remove('open');
    if(!_prevCrumbHTML) _prevCrumbHTML=document.getElementById('crumbsWrap').innerHTML;
    document.body.classList.add('mi-open');
    const target = pane || 'info';
    miNavById(target);
    window.scrollTo(0,0);
  }
  function closeMyInfo(){
    document.body.classList.remove('mi-open');
    restoreCrumb();
  }
  function closeMyInfoIfOpen(){
    if(document.body.classList.contains('mi-open')) closeMyInfo();
  }
  function miNav(el,pane){
    document.querySelectorAll('.mi-side .mi-nav').forEach(n=>n.classList.remove('active'));
    el.classList.add('active');
    document.querySelectorAll('.mi-pane').forEach(p=>p.classList.remove('active'));
    document.getElementById('miPane-'+pane).classList.add('active');
    setMiCrumb(pane);
  }
  function miNavById(pane){
    const el=document.querySelector('.mi-side .mi-nav[onclick*="\''+pane+'\'"]');
    if(el) miNav(el,pane);
  }
  document.addEventListener('keydown',e=>{if(e.key==='Escape' && document.body.classList.contains('mi-open')) closeMyInfo()});

  // TOAST
  let toastT;
  function toast(msg,icon){
    const t=document.getElementById('toast');
    document.getElementById('toastMsg').textContent=msg;
    t.querySelector('.mi').textContent=icon||'check_circle';
    t.classList.add('show');
    clearTimeout(toastT);
    toastT=setTimeout(()=>t.classList.remove('show'),2200);
  }

  // Global search focus w/ cmd+k
  document.addEventListener('keydown',e=>{
    if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){
      e.preventDefault();
      document.getElementById('gsearch').focus();
    }
    if(e.key==='Escape'){
      document.querySelectorAll('.dd.open').forEach(x=>x.classList.remove('open'));
    }
  });

  // ================= TWEAKS =================
  window.addEventListener('message',e=>{
    if(e.data?.type==='__activate_edit_mode') document.getElementById('tweaks').classList.add('open');
    if(e.data?.type==='__deactivate_edit_mode') document.getElementById('tweaks').classList.remove('open');
  });
  function closeTweaks(){
    document.getElementById('tweaks').classList.remove('open');
    window.parent.postMessage({type:'__edit_mode_dismissed'},'*');
  }
  document.getElementById('logoTone').addEventListener('click',e=>{
    const sw=e.target.closest('.tw-sw'); if(!sw) return;
    e.currentTarget.querySelectorAll('.tw-sw').forEach(x=>x.classList.remove('active'));
    sw.classList.add('active');
    document.querySelector('.sb-logo .dot').style.background=sw.dataset.tone;
  });
  document.getElementById('density').addEventListener('change',e=>{
    const v=e.target.value;
    document.documentElement.style.setProperty('--hd', v==='compact'?'56px':'64px');
  });
  document.getElementById('greet').addEventListener('change',e=>{
    const h=document.querySelector('.ph h1');
    h.innerHTML = e.target.value==='formal'
      ? 'Resumen ejecutivo'
      : 'Buenos días, Juanita Lopez <span class="wave"><svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="orangeGr2" cx="35%" cy="30%" r="75%"><stop offset="0%" stop-color="#FFCB70"/><stop offset="50%" stop-color="#FF8A1F"/><stop offset="100%" stop-color="#E85C00"/></radialGradient></defs><circle cx="20" cy="22" r="15" fill="url(#orangeGr2)"/><ellipse cx="15" cy="17" rx="4" ry="2.4" fill="#FFE1AE" opacity=".55"/><path d="M20 7 Q22 4 26 5 Q24 8 22 9" fill="#3FA84C"/><path d="M20 7 Q19 4 17 4" stroke="#7A4A1E" stroke-width="1.3" stroke-linecap="round" fill="none"/></svg></span>';
  });
  document.getElementById('sbState').addEventListener('change',e=>{
    const sb=document.getElementById('sidebar');
    if(e.target.value==='collapsed') sb.classList.add('collapsed'); else sb.classList.remove('collapsed');
  });

  // Announce edit-mode available after listener is ready
  setTimeout(()=>window.parent.postMessage({type:'__edit_mode_available'},'*'),100);

  /* ======================================================== */
  /* ============== MÓDULO RECLUTAMIENTO ==================== */
  /* ======================================================== */
  (function(){
    // ---- Datos de catálogos ----
    const STATUSES = [
      {key:'verdef',  color:'#1FA84A', label:'Disponible',        sub:'Listo para asignar',         desc:'Verde fuerte'},
      {key:'amarillo',color:'#FFD500', label:'Disp. voluntario',  sub:'Por horas / fin de semana',  desc:'Amarillo'},
      {key:'naranja', color:'#FF7A00', label:'Fijo',              sub:'En requisición permanente',  desc:'Naranja'},
      {key:'cafe',    color:'#8B5A2B', label:'Asignación temp.',  sub:'Cobertura corta',            desc:'Café'},
      {key:'verdem',  color:'#7CDB45', label:'Onboarding D1-2',   sub:'Inducción inicial',          desc:'Verde manzana'},
      {key:'azul',    color:'#3FB8E6', label:'Día 3+ uniforme',   sub:'En entrega de uniforme',     desc:'Azul claro'},
      {key:'blanco',  color:'#E8E0D5', label:'Pre-asignación',    sub:'Captura sin asignar',        desc:'Blanco'},
      {key:'rosa',    color:'#FF1493', label:'Stand by',          sub:'Pausa temporal',             desc:'Rosa'},
      {key:'morado',  color:'#7B2CBF', label:'No regresó',        sub:'Falta sin aviso',            desc:'Morado'},
      {key:'rojo',    color:'#E11919', label:'Reportado',         sub:'Incidencia abierta',         desc:'Rojo'},
      {key:'negro',   color:'#1A1108', label:'Blacklist',         sub:'Vetado',                     desc:'Negro'},
    ];
    const POSICIONES = ['Housekeeper','Hoseman','Chef','Laundry','Steward','Mesero','Mantenimiento'];
    const ZONAS = ['Centro','Sur','Este','Oeste','Noroeste','Sureste'];
    const MODALIDADES = ['Tiempo \ncompleto','Medio tiempo','Por hora'];
    const INGLES = [['basic','Básico',1],['inter','Intermedio',2],['avan','Avanzado',3],['conv','Conversacional',4]];

    const GR = ['','gradB','gradC','gradD','gradE','gradF','gradG'];

    // Mock data — colaboradores del Pool
    const PEOPLE = [
      // Verde fuerte (Disponible)
      {id:'C-4521', nm:'María López Hernández',     doc:'4521', tel:'+52 55 1234 5678', dom:'Av. Reforma 123, CDMX', pos:'Housekeeper', zone:'Centro',   mod:'Tiempo \ncompleto', eng:3, exp:'4 años', st:'verdef', hist:[{h:'Hotel Costa del Sol',role:'Housekeeper',from:'Mar 2024',to:'Mar 2026'},{h:'Hotel Punta Vista',role:'Housekeeper',from:'Ene 2023',to:'Feb 2024'}], docs:{ssn:true,itin:true,id:true,cv:false}, bl:false},
      {id:'C-7812', nm:'Carlos Ruiz Méndez',         doc:'7812', tel:'+52 55 9988 1122', dom:'Calle Zaragoza 45, Sur', pos:'Chef',        zone:'Sur',      mod:'Tiempo \ncompleto', eng:4, exp:'7 años', st:'verdef', hist:[{h:'Hotel Marina Bay',role:'Chef',from:'May 2023',to:'Feb 2026'}], docs:{ssn:true,itin:true,id:true,cv:true}, bl:false},
      {id:'C-3398', nm:'Ana Sofía Reyes',            doc:'3398', tel:'+52 55 5544 8810', dom:'Col. Roma Norte 88',    pos:'Mesero',      zone:'Centro',   mod:'Medio tiempo',    eng:3, exp:'2 años', st:'verdef', hist:[{h:'Hotel Costa del Sol',role:'Mesero',from:'Ago 2024',to:'Mar 2026'}], docs:{ssn:true,itin:false,id:true,cv:true}, bl:false},
      {id:'C-9023', nm:'Luis Pérez Gómez',           doc:'9023', tel:'+52 55 7711 0044', dom:'Tlalpan 220',           pos:'Steward',     zone:'Sur',      mod:'Tiempo \ncompleto', eng:2, exp:'3 años', st:'verdef', hist:[{h:'Hotel Punta Vista',role:'Steward',from:'Feb 2024',to:'Mar 2026'}], docs:{ssn:true,itin:true,id:true,cv:false}, bl:false},

      // Verde fuerte — Caso "Según solicitud" disponible temporalmente (sin asignación actual)
      {id:'C-7786', nm:'Renata Olvera Pacheco',      doc:'7786', tel:'+52 55 2210 6648', dom:'San Rafael 18',         pos:'Housekeeper', zone:'Centro',   mod:'Según \nsolicitud', eng:2, exp:'2 años',  st:'verdef',   ssAvailFrom:'12 may 2026', ssAvailTo:'12 jun 2026', ssMonths:1, hist:[], docs:{ssn:true,itin:true,id:true,cv:true}, bl:false},
      // Verde fuerte — Caso "Según solicitud" sin restricciones (abierto a todo, sin asignación actual)
      {id:'C-7790', nm:'Ramiro Cervantes Núñez',     doc:'7790', tel:'+52 55 5588 1124', dom:'Roma Norte 56',         pos:'Mesero',      zone:'Centro',   mod:'Según \nsolicitud', eng:3, exp:'3 años',  st:'verdef',   ssOpen:true, hist:[{h:'Hotel Vista Mar',role:'Mesero',from:'Sep 2025',to:'Feb 2026'},{h:'Hotel Costa del Sol',role:'Mesero',from:'Mar 2024',to:'Ago 2025'},{h:'Hotel Marina Bay',role:'Mesero',from:'Jun 2023',to:'Feb 2024'}], docs:{ssn:true,itin:true,id:true,cv:true}, bl:false},

      // Amarillo (Voluntario)
      {id:'C-5562', nm:'Julia Mendoza Torres',       doc:'5562', tel:'+52 55 4499 1100', dom:'Polanco 14',            pos:'Housekeeper', zone:'Oeste',    mod:'Medio tiempo',    eng:2, exp:'1.5 años', st:'amarillo', hist:[{h:'Hotel Marina Bay',role:'Housekeeper',from:'Sep 2024',to:'Mar 2025'}], docs:{ssn:true,itin:false,id:true,cv:false}, bl:false},
      {id:'C-6841', nm:'Pedro Salinas',              doc:'6841', tel:'+52 55 2218 7766', dom:'Iztapalapa 33',         pos:'Hoseman',     zone:'Este',     mod:'Por hora'   ,        eng:1, exp:'2 años', st:'amarillo', hist:[{h:'Hotel Sol & Mar',role:'Hoseman',from:'Ene 2025',to:'Mar 2025'}], docs:{ssn:true,itin:true,id:true,cv:false}, bl:false},

      // Amarillo extra (Voluntario)
      {id:'C-5571', nm:'Sandra Ortiz',               doc:'5571', tel:'+52 55 3344 9911', dom:'Del Valle 92',          pos:'Mesero',      zone:'Sur',      mod:'Por hora',          eng:2, exp:'2 años', st:'amarillo', hist:[{h:'Hotel Costa del Sol',role:'Mesero',from:'Feb 2025',to:'Abr 2025'}], docs:{ssn:true,itin:false,id:true,cv:true}, bl:false},
      {id:'C-5588', nm:'Ricardo Vega Núñez',         doc:'5588', tel:'+52 55 7700 6622', dom:'Tacubaya 17',           pos:'Steward',     zone:'Oeste',    mod:'Medio tiempo',      eng:2, exp:'3 años', st:'amarillo', hist:[{h:'Hotel Punta Vista',role:'Steward',from:'Mar 2025',to:'May 2025'}], docs:{ssn:true,itin:true,id:true,cv:false}, bl:false},

      // Naranja (Fijo)
      {id:'C-1108', nm:'Rosario Flores Díaz',        doc:'1108', tel:'+52 55 6622 3344', dom:'Coyoacán 87',           pos:'Housekeeper', zone:'Sur',      mod:'Tiempo \ncompleto', eng:2, exp:'8 años', st:'naranja',  hist:[{h:'Hotel Marina Bay',role:'Housekeeper',from:'Jun 2022',to:'Actual',curr:true}], docs:{ssn:true,itin:true,id:true,cv:true}, bl:false},
      {id:'C-2299', nm:'Diego Hernández Vega',       doc:'2299', tel:'+52 55 1188 9900', dom:'Lindavista 5',          pos:'Chef',        zone:'Noroeste', mod:'Tiempo \ncompleto', eng:3, exp:'10 años',st:'naranja',  hist:[{h:'Hotel Sol & Mar',role:'Chef',from:'Mar 2021',to:'Actual',curr:true}], docs:{ssn:true,itin:true,id:true,cv:true}, bl:false},
      {id:'C-2311', nm:'Beatriz Romero Lara',        doc:'2311', tel:'+52 55 9911 4488', dom:'Mixcoac 41',            pos:'Mantenimiento',zone:'Centro', mod:'Tiempo \ncompleto', eng:2, exp:'6 años', st:'naranja',  hist:[{h:'Hotel Costa del Sol',role:'Mantenimiento',from:'Ene 2023',to:'Actual',curr:true}], docs:{ssn:true,itin:true,id:true,cv:true}, bl:false},
      {id:'C-2345', nm:'Miguel Ángel Soto',          doc:'2345', tel:'+52 55 5566 7788', dom:'Coapa 8',               pos:'Recepción',   zone:'Sur',      mod:'Tiempo \ncompleto', eng:4, exp:'5 años', st:'naranja',  hist:[{h:'Hotel Marina Bay',role:'Recepción',from:'May 2023',to:'Actual',curr:true}], docs:{ssn:true,itin:true,id:true,cv:true}, bl:false},

      // Café (Asignación temporal)
      {id:'C-7741', nm:'Laura Castillo Ramos',       doc:'7741', tel:'+52 55 3344 8822', dom:'Doctores 12',           pos:'Laundry',     zone:'Centro',   mod:'Por hora',          eng:1, exp:'1 año',  st:'cafe',     hist:[{h:'Hotel Costa del Sol',role:'Laundry',from:'Abr 2026',to:'Actual',curr:true}], docs:{ssn:true,itin:false,id:true,cv:false}, bl:false},
      {id:'C-7752', nm:'Mario Castillo',             doc:'7752', tel:'+52 55 8822 1199', dom:'Escandón 5',            pos:'Steward',     zone:'Sur',      mod:'Tiempo \ncompleto', eng:2, exp:'2 años', st:'cafe',     hist:[{h:'Hotel Marina Bay',role:'Steward',from:'Mar 2026',to:'Actual',curr:true}], docs:{ssn:true,itin:true,id:true,cv:false}, bl:false},
      {id:'C-7763', nm:'Nora Estrada Vidal',         doc:'7763', tel:'+52 55 3311 9988', dom:'Portales 22',           pos:'Housekeeper', zone:'Este',     mod:'Medio tiempo',      eng:1, exp:'3 años', st:'cafe',     hist:[{h:'Hotel Punta Vista',role:'Housekeeper',from:'Abr 2026',to:'Actual',curr:true}], docs:{ssn:true,itin:true,id:true,cv:true}, bl:false},
      {id:'C-7774', nm:'Andrés Quintero',            doc:'7774', tel:'+52 55 4477 6611', dom:'Mixcalco 33',           pos:'Mesero',      zone:'Centro',   mod:'Por hora',          eng:2, exp:'1.5 años',st:'cafe',     hist:[{h:'Hotel Sol & Mar',role:'Mesero',from:'May 2026',to:'Actual',curr:true}], docs:{ssn:true,itin:false,id:true,cv:false}, bl:false},
      // Café — Caso "Según solicitud" / Por asignación (contrato Temporal acotado por fechas)
      {id:'C-7785', nm:'Patricio Salazar Bravo',     doc:'7785', tel:'+52 55 6628 5519', dom:'Iztacalco 47',          pos:'Mesero',      zone:'Sur',      mod:'Según \nsolicitud', eng:2, exp:'1.5 años',st:'cafe',     hist:[{h:'Hotel Marina Sur',role:'Mesero',from:'27 abr 2026',to:'27 may 2026',curr:true,asg:'temporal',contractFrom:'27 abr 2026',contractTo:'27 may 2026',months:1}], docs:{ssn:true,itin:true,id:true,cv:false}, bl:false},
      {id:'C-7788', nm:'Camila Aragón Téllez',       doc:'7788', tel:'+52 55 8847 1192', dom:'Narvarte 33',           pos:'Mesero',      zone:'Centro',   mod:'Según \nsolicitud', eng:3, exp:'2.5 años',st:'cafe',     hist:[{h:'Hotel Vista Mar',role:'Mesero',from:'18 abr 2026',to:'18 may 2026',curr:true,asg:'temporal',contractFrom:'18 abr 2026',contractTo:'18 may 2026',months:1}], docs:{ssn:true,itin:true,id:true,cv:true}, bl:false},

      // Verde manzana (Onboarding)
      {id:'C-9901', nm:'Mariana Solís',              doc:'9901', tel:'+52 55 8800 1144', dom:'Narvarte 71',           pos:'Mesero',      zone:'Centro',   mod:'Tiempo \ncompleto', eng:3, exp:'0.5 años',st:'verdem',  hist:[], docs:{ssn:true,itin:false,id:true,cv:true}, bl:false, on:'Día 2 de inducción'},
      {id:'C-9912', nm:'José Aguilar',               doc:'9912', tel:'+52 55 4521 7799', dom:'Anáhuac 33',            pos:'Steward',     zone:'Oeste',    mod:'Medio tiempo',      eng:2, exp:'0.3 años',st:'verdem',  hist:[], docs:{ssn:true,itin:false,id:true,cv:false}, bl:false, on:'Día 1 de inducción'},
      {id:'C-9925', nm:'Verónica Pineda',            doc:'9925', tel:'+52 55 6622 0099', dom:'Cuauhtémoc 12',         pos:'Housekeeper', zone:'Centro',   mod:'Tiempo \ncompleto', eng:2, exp:'0.4 años',st:'verdem',  hist:[], docs:{ssn:true,itin:true,id:true,cv:false}, bl:false, on:'Día 2 de inducción'},
      {id:'C-9938', nm:'Esteban Vázquez',            doc:'9938', tel:'+52 55 7788 3300', dom:'Tepito 19',             pos:'Hoseman',     zone:'Sur',      mod:'Por hora',          eng:1, exp:'0.2 años',st:'verdem',  hist:[], docs:{ssn:true,itin:false,id:true,cv:false}, bl:false, on:'Día 1 de inducción'},

      // Azul claro (Día 3+)
      {id:'C-3344', nm:'Roberto Cruz',               doc:'3344', tel:'+52 55 9988 7766', dom:'San Ángel 19',          pos:'Hoseman',     zone:'Sur',      mod:'Tiempo \ncompleto', eng:2, exp:'0.4 años',st:'azul',     hist:[{h:'Hotel Punta Vista',role:'Hoseman',from:'Abr 2026',to:'Actual',curr:true}], docs:{ssn:true,itin:true,id:true,cv:true}, bl:false, on:'Día 4 — uniforme entregado'},
      {id:'C-3357', nm:'Lorena Bañuelos',            doc:'3357', tel:'+52 55 1199 2244', dom:'Zona Rosa 8',           pos:'Mesero',      zone:'Centro',   mod:'Medio tiempo',      eng:3, exp:'0.5 años',st:'azul',     hist:[{h:'Hotel Costa del Sol',role:'Mesero',from:'Abr 2026',to:'Actual',curr:true}], docs:{ssn:true,itin:true,id:true,cv:true}, bl:false, on:'Día 5 — uniforme entregado'},
      {id:'C-3368', nm:'Hugo Méndez Salas',          doc:'3368', tel:'+52 55 3300 4422', dom:'Cuajimalpa 14',         pos:'Steward',     zone:'Oeste',    mod:'Tiempo \ncompleto', eng:1, exp:'0.3 años',st:'azul',     hist:[{h:'Hotel Marina Bay',role:'Steward',from:'Abr 2026',to:'Actual',curr:true}], docs:{ssn:true,itin:true,id:true,cv:false}, bl:false, on:'Día 3 — uniforme entregado'},
      {id:'C-3379', nm:'Karla Espinoza',             doc:'3379', tel:'+52 55 8800 5544', dom:'Magdalena 27',          pos:'Housekeeper', zone:'Sur',      mod:'Tiempo \ncompleto', eng:2, exp:'0.6 años',st:'azul',     hist:[{h:'Hotel Sol & Mar',role:'Housekeeper',from:'Abr 2026',to:'Actual',curr:true}], docs:{ssn:true,itin:true,id:true,cv:true}, bl:false, on:'Día 6 — uniforme entregado'},

      // Blanco (Pre-asignación)
      {id:'C-7700', nm:'Sandra Vázquez',             doc:'7700', tel:'+52 55 1199 4477', dom:'Polanco 245',           pos:'Housekeeper', zone:'Oeste',    mod:'Tiempo \ncompleto', eng:2, exp:'3 años', st:'blanco',   hist:[], docs:{ssn:false,itin:false,id:true,cv:false}, bl:false},
      {id:'C-7780', nm:'Tomás Ríos',                 doc:'7780', tel:'+52 55 2233 5566', dom:'Pedregal 102',          pos:'Mantenimiento',zone:'Sureste', mod:'Tiempo \ncompleto', eng:1, exp:'5 años', st:'blanco',   hist:[], docs:{ssn:true,itin:false,id:true,cv:true}, bl:false},
      {id:'C-7791', nm:'Daniela Carrasco',           doc:'7791', tel:'+52 55 4422 8800', dom:'Roma Norte 14',         pos:'Chef',        zone:'Centro',   mod:'Medio tiempo',      eng:3, exp:'4 años', st:'blanco',   hist:[], docs:{ssn:true,itin:true,id:true,cv:false}, bl:false},
      {id:'C-7798', nm:'Felipe Aguirre',             doc:'7798', tel:'+52 55 9911 7733', dom:'Tlatelolco 56',         pos:'Mesero',      zone:'Norte',    mod:'Por hora',          eng:2, exp:'2 años', st:'blanco',   hist:[], docs:{ssn:false,itin:false,id:true,cv:false}, bl:false},

      // Rosa (Stand by)
      {id:'C-4012', nm:'Patricia Núñez',             doc:'4012', tel:'+52 55 6677 8899', dom:'Roma Sur 88',           pos:'Housekeeper', zone:'Centro',   mod:'Tiempo \ncompleto', eng:3, exp:'4 años', st:'rosa',     hist:[{h:'Hotel Costa del Sol',role:'Housekeeper',from:'Ene 2024',to:'Mar 2025'}], docs:{ssn:true,itin:true,id:true,cv:true}, bl:false, note:'Pausa por maternidad — disponible Sep 2026'},
      {id:'C-4023', nm:'Raúl Treviño',               doc:'4023', tel:'+52 55 2244 1188', dom:'Ajusco 33',             pos:'Hoseman',     zone:'Sur',      mod:'Tiempo \ncompleto', eng:1, exp:'5 años', st:'rosa',     hist:[{h:'Hotel Marina Bay',role:'Hoseman',from:'Feb 2023',to:'Abr 2026'}], docs:{ssn:true,itin:true,id:true,cv:false}, bl:false, note:'Pausa médica — incapacidad 60 días'},
      {id:'C-4034', nm:'Mónica Beltrán',             doc:'4034', tel:'+52 55 8833 5511', dom:'Lomas 8',               pos:'Mesero',      zone:'Oeste',    mod:'Medio tiempo',      eng:2, exp:'3 años', st:'rosa',     hist:[{h:'Hotel Punta Vista',role:'Mesero',from:'Mar 2024',to:'Abr 2026'}], docs:{ssn:true,itin:false,id:true,cv:true}, bl:false, note:'Stand by por mudanza — vuelve Jul 2026'},
      {id:'C-4045', nm:'Sergio Cervantes',           doc:'4045', tel:'+52 55 7744 9922', dom:'Mixcoac 19',            pos:'Steward',     zone:'Sur',      mod:'Tiempo \ncompleto', eng:2, exp:'4 años', st:'rosa',     hist:[{h:'Hotel Sol & Mar',role:'Steward',from:'May 2023',to:'May 2026'}], docs:{ssn:true,itin:true,id:true,cv:true}, bl:false, note:'Stand by por estudios — disponible Ago 2026'},

      // Morado (No regresó)
      {id:'C-2233', nm:'Fernando Lozano',            doc:'2233', tel:'+52 55 1010 2020', dom:'Tlatelolco 5',          pos:'Steward',     zone:'Centro',   mod:'Por hora',          eng:1, exp:'2 años', st:'morado',   hist:[{h:'Hotel Sol & Mar',role:'Steward',from:'Feb 2025',to:'Mar 2025'}], docs:{ssn:true,itin:false,id:true,cv:false}, bl:false, note:'No regresó después del fin de semana'},
      {id:'C-2244', nm:'Brenda Olivares',            doc:'2244', tel:'+52 55 4499 3322', dom:'Iztapalapa 78',         pos:'Housekeeper', zone:'Este',     mod:'Medio tiempo',      eng:1, exp:'1.5 años',st:'morado',   hist:[{h:'Hotel Costa del Sol',role:'Housekeeper',from:'Feb 2026',to:'Abr 2026'}], docs:{ssn:true,itin:false,id:true,cv:false}, bl:false, note:'Faltó 3 días sin aviso'},
      {id:'C-2255', nm:'Óscar Maldonado',            doc:'2255', tel:'+52 55 1133 6699', dom:'Pantitlán 14',          pos:'Hoseman',     zone:'Este',     mod:'Tiempo \ncompleto', eng:1, exp:'3 años', st:'morado',   hist:[{h:'Hotel Marina Bay',role:'Hoseman',from:'Ene 2026',to:'Abr 2026'}], docs:{ssn:true,itin:true,id:true,cv:false}, bl:false, note:'No regresó después de vacaciones'},
      {id:'C-2266', nm:'Yolanda Pacheco',            doc:'2266', tel:'+52 55 7722 0088', dom:'Vallejo 25',            pos:'Mesero',      zone:'Norte',    mod:'Por hora',          eng:1, exp:'2 años', st:'morado',   hist:[{h:'Hotel Punta Vista',role:'Mesero',from:'Mar 2026',to:'Abr 2026'}], docs:{ssn:true,itin:false,id:true,cv:false}, bl:false, note:'Dejó de responder a llamadas'},

      // Rojo (Reportado)
      {id:'C-5050', nm:'Iván Rodríguez',             doc:'5050', tel:'+52 55 4477 1188', dom:'Vallejo 78',            pos:'Hoseman',     zone:'Noroeste', mod:'Tiempo \ncompleto', eng:1, exp:'3 años', st:'rojo',     hist:[{h:'Hotel Marina Bay',role:'Hoseman',from:'Jun 2024',to:'Mar 2025'}], docs:{ssn:true,itin:true,id:true,cv:false}, bl:false, note:'Incidencia operativa abierta — investigación en curso'},
      {id:'C-5061', nm:'Claudia Mora',               doc:'5061', tel:'+52 55 6611 9988', dom:'Doctores 41',           pos:'Housekeeper', zone:'Centro',   mod:'Medio tiempo',      eng:1, exp:'2 años', st:'rojo',     hist:[{h:'Hotel Costa del Sol',role:'Housekeeper',from:'Ene 2025',to:'Abr 2026'}], docs:{ssn:true,itin:true,id:true,cv:true}, bl:false, note:'Reporte de huésped — pendiente de validación'},
      {id:'C-5072', nm:'Arturo Galván',              doc:'5072', tel:'+52 55 3344 1199', dom:'Aragón 17',             pos:'Steward',     zone:'Norte',    mod:'Tiempo \ncompleto', eng:2, exp:'4 años', st:'rojo',     hist:[{h:'Hotel Sol & Mar',role:'Steward',from:'Feb 2024',to:'May 2026'}], docs:{ssn:true,itin:true,id:true,cv:false}, bl:false, note:'Incidencia con compañero — RH en seguimiento'},
      {id:'C-5083', nm:'Itzel Quiroz',               doc:'5083', tel:'+52 55 8800 7744', dom:'Tláhuac 22',            pos:'Mesero',      zone:'Sureste',  mod:'Por hora',          eng:1, exp:'1 año',  st:'rojo',     hist:[{h:'Hotel Punta Vista',role:'Mesero',from:'Mar 2026',to:'May 2026'}], docs:{ssn:true,itin:false,id:true,cv:false}, bl:false, note:'Reporte de supervisor — actitud agresiva'},

      // Negro (Blacklist)
      {id:'C-3311', nm:'Jorge Pérez Mata',           doc:'3311', tel:'+52 55 5500 1010', dom:'Iztacalco 4',           pos:'Housekeeper', zone:'Este',     mod:'Tiempo \ncompleto', eng:1, exp:'4 años', st:'negro',    hist:[{h:'Hotel Costa del Sol',role:'Housekeeper',from:'Ene 2023',to:'Feb 2025'}], docs:{ssn:true,itin:true,id:true,cv:false}, bl:true, note:'Vetado — ausentismo reiterado y reporte de cliente'},
      {id:'C-3322', nm:'Rocío Sandoval',             doc:'3322', tel:'+52 55 6677 2244', dom:'Cerro del Agua 9',      pos:'Mesero',      zone:'Sur',      mod:'Medio tiempo',      eng:1, exp:'3 años', st:'negro',    hist:[{h:'Hotel Marina Bay',role:'Mesero',from:'May 2023',to:'Ene 2025'}], docs:{ssn:true,itin:true,id:true,cv:true}, bl:true, note:'Vetado — robo confirmado en habitación'},
      {id:'C-3333', nm:'Alejandro Vargas',           doc:'3333', tel:'+52 55 9911 5566', dom:'Aragón 78',             pos:'Hoseman',     zone:'Noroeste', mod:'Tiempo \ncompleto', eng:2, exp:'5 años', st:'negro',    hist:[{h:'Hotel Sol & Mar',role:'Hoseman',from:'Mar 2022',to:'Dic 2024'}], docs:{ssn:true,itin:true,id:true,cv:false}, bl:true, note:'Vetado — agresión a compañero documentada'},
      {id:'C-3344b', nm:'Lilia Estrada',             doc:'3344b',tel:'+52 55 4488 1199', dom:'Coyoacán 13',           pos:'Steward',     zone:'Sur',      mod:'Por hora',          eng:1, exp:'2 años', st:'negro',    hist:[{h:'Hotel Punta Vista',role:'Steward',from:'Jun 2024',to:'Mar 2026'}], docs:{ssn:true,itin:false,id:true,cv:false}, bl:true, note:'Vetado — falsificación de documentos'},
    ];

    // Requisiciones abiertas (para asignar)
    const REQS = [
      {id:'REQ #001', pos:'Housekeeper', hotel:'Hotel Costa del Sol', cov:'8/10', urg:'high', sub:'Hace 3 días · Centro'},
      {id:'REQ #014', pos:'Mantenimiento',hotel:'Hotel Marina Bay',  cov:'1/2',  urg:'high', sub:'Hace 4 días · Oeste'},
      {id:'REQ #002', pos:'Chef',         hotel:'Hotel Punta Vista', cov:'5/8',  urg:'med',  sub:'Hace 1 día · Sur'},
      {id:'REQ #007', pos:'Steward',      hotel:'Hotel Sol & Mar',   cov:'3/4',  urg:'low',  sub:'Hoy · Noroeste'},
    ];

    // ---- estado ----
    let state = {
      subtab:'pool',         // 'pool' | 'entrevistas'
      view:'board',          // 'board'|'list'|'map'
      filterPos:'',
      filterZone:'',
      filterMod:'',
      filterEng:'',
      query:'',
      selected:null,         // person id
      drawerTab:'datos',     // datos|laboral|historial|docs
      openFilter:null,       // grp key del dropdown abierto
      filterStatus:'',       // semaforo activo (key)
      // Entrevistas
      eView:'board',         // 'board'|'list'|'table'
      eFilterPos:'',
      eFilterZone:'',
      eFilterMod:'',
      eFilterDays:'',        // ''|'1-3'|'4-7'|'>7'
      eFilterOrigen:'',
      eFilterEstado:'',     // pendApp|pendVal|aband|valid
      eFilterFromISO:'',    // fecha desde (YYYY-MM-DD)
      eFilterToISO:'',      // fecha hasta (YYYY-MM-DD)
      eQuery:'',
      eSelected:null,
    };

    function gradFor(id){
      const n = (id.charCodeAt(2)+id.charCodeAt(3))%GR.length;
      return GR[n];
    }
    function initials(name){
      return name.split(' ').slice(0,2).map(s=>s[0]).join('').toUpperCase();
    }
    function stColor(key){ return STATUSES.find(s=>s.key===key)?.color || '#FF8E00'; }
    function stLabel(key){ return STATUSES.find(s=>s.key===key)?.label || key; }

    function filtered(){
      const q = state.query.trim().toLowerCase();
      return PEOPLE.filter(p=>{
        if(state.filterPos && p.pos!==state.filterPos) return false;
        if(state.filterZone && p.zone!==state.filterZone) return false;
        if(state.filterMod && p.mod!==state.filterMod) return false;
        if(state.filterEng && INGLES[p.eng-1][0]!==state.filterEng) return false;
        if(state.filterStatus && p.st!==state.filterStatus) return false;
        if(q && !(p.nm.toLowerCase().includes(q) || p.doc.includes(q) || p.tel.includes(q) || p.id.toLowerCase().includes(q))) return false;
        return true;
      });
    }

    // ---- HTML helpers ----
    const esc = s => String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

    // Normaliza una modalidad (Tiempo completo / Medio tiempo / Por horas)
    // a su clave de color (tc/mt/ph) y label limpio sin saltos de línea.
    // Usado por las cards del Pool y de Entrevistas para mostrar el pill
    // de modalidad con el mismo código de color de Requisiciones:
    //   tc → verde · mt → naranja · ph → amarillo
    function modPillInfo(mod){
      const m = String(mod||'').replace(/\s+/g,' ').trim();
      if(m === 'Medio tiempo') return {k:'mt', lbl:'Medio tiempo'};
      if(m === 'Por hora' || m === 'Por horas') return {k:'ph', lbl:'Por horas'};
      if(m === 'Según solicitud') return {k:'ss', lbl:'Según solicitud'};
      return {k:'tc', lbl:'Tiempo completo'};
    }

    function cardHTML(p){
      const eng = INGLES[p.eng-1] || INGLES[0];
      const ebars = [1,2,3,4].map(i=>`<span class="eb ${i<=p.eng?'on':''}"></span>`).join('');
      const mp = modPillInfo(p.mod);
      // Pool context: candidatos "Según solicitud" actualmente asignados
      // por contrato temporal se muestran como "Por asignación" en vez de
      // exponer su modalidad (no aplica TC/MT/PH — la jornada la define la
      // operación del hotel para esa cobertura puntual).
      const isPorAsg = p.ssContract === 'temporal' && p.mod === 'Según \nsolicitud';
      const mpLbl = isPorAsg ? 'Por asignación' : mp.lbl;
      const mpIcon = isPorAsg ? 'assignment_ind' : 'schedule';
      return `
        <div class="recl-card ${state.selected===p.id?'selected':''}" style="--card-st:${stColor(p.st)}" onclick="window.__reclSelect('${p.id}')">
          <div class="recl-card-top">
            <div class="recl-avatar ${gradFor(p.id)}">
              ${esc(initials(p.nm))}
              <span class="recl-st-ring"></span>
            </div>
            <div class="nm">
              <div class="name">${esc(p.nm)}</div>
              <div class="doc">ID ${esc(p.id)}</div>
            </div>
          </div>
          <div class="recl-card-meta">
            <span class="meta-pill pos"><span class="mi">work_outline</span>${esc(p.pos)}</span>
            <span class="meta-pill zone"><span class="mi">place</span>${esc(p.zone)}</span>
            <span class="meta-pill modw" data-m="${mp.k}"><span class="mi">${mpIcon}</span>${esc(mpLbl)}</span>
          </div>
          <div class="recl-eng">
            <span>EN</span>
            <div class="eng-bars">${ebars}</div>
            <span style="margin-left:auto;color:rgb(83,59,23);font-weight:600">${esc(eng[1])}</span>
          </div>
          <div class="recl-card-foot">
            <div class="info"><span class="mi">history</span>${p.hist.length} hotel${p.hist.length===1?'':'es'}</div>
            ${p.st==='negro'
              ? `<span class="assign-btn" style="background:rgba(225,25,25,.08);color:var(--red);border-color:rgba(225,25,25,.2)" onclick="event.stopPropagation();window.__reclSelect('${p.id}')"><span class="mi">block</span>Blacklist</span>`
              : `<button class="assign-btn" style="background:transparent;color:var(--ink-2);border-color:var(--line-2)" onclick="event.stopPropagation();window.__reclSelect('${p.id}')"><span class="mi">visibility</span>Ver detalle</button>`
            }
          </div>
        </div>`;
    }

    // ---- Vista TABLERO (kanban por semáforo) ----
    function renderBoard(){
      const list = filtered();
      const cols = STATUSES.map(s=>{
        const ppl = list.filter(p=>p.st===s.key);
        const cards = ppl.length
          ? ppl.map(cardHTML).join('')
          : `<div class="recl-col-empty"><span class="mi">person_off</span><div class="e-txt">Sin colaboradores</div></div>`;
        return `
          <div class="recl-col">
            <div class="recl-col-head">
              <span class="recl-col-dot" style="background:${s.color}"></span>
              <div class="recl-col-name">${esc(s.label)}<span class="sub-st">${esc(s.sub)}</span></div>
              <span class="recl-col-count">${String(ppl.length).padStart(2,'0')}</span>
            </div>
            ${cards}
          </div>`;
      }).join('');
      return `
        <div class="recl-board-title">
          <h2><span class="recl-board-ic"><span class="mi">groups</span></span>Pool de colaboradores</h2>
          <div class="recl-board-sub">${list.length} colaboradores en pool · ${STATUSES.length} estados</div>
        </div>
        <div class="recl-board">${cols}</div>
      `;
    }

    // ---- Vista LISTA (grid de tarjetas amplias) ----
    function renderList(){
      const list = filtered();
      if(!list.length) return `<div style="padding:40px;text-align:center;color:var(--ink-3)"><span class="mi" style="font-size:42px;color:var(--ink-4)">person_search</span><div style="margin-top:8px;font-weight:500">Sin resultados con los filtros aplicados</div></div>`;
      return `<div class="recl-list">${list.map(cardHTML).join('')}</div>`;
    }

    // ---- Vista TABLA (filas densas) ----
    function renderTable(){
      const list = filtered();
      if(!list.length) return `<div style="padding:40px;text-align:center;color:var(--ink-3)"><span class="mi" style="font-size:42px;color:var(--ink-4)">person_search</span><div style="margin-top:8px;font-weight:500">Sin resultados con los filtros aplicados</div></div>`;
      const rows = list.map(p => {
        const docsCount = Object.values(p.docs).filter(Boolean).length;
        const docsTotal = Object.keys(p.docs).length;
        const docsComplete = docsCount === docsTotal;
        const blPill = p.bl
          ? `<span class="t-pill t-pill-warn"><span class="mi">block</span>Blacklist</span>`
          : `<span class="t-pill t-pill-ok"><span class="mi">check</span>Apto</span>`;
        return `
          <tr onclick="window.__reclSelect('${p.id}')">
            <td>
              <div class="t-person">
                <div class="recl-avatar ${gradFor(p.id)}" style="--card-st:${stColor(p.st)};width:34px;height:34px;font-size:12px">${esc(initials(p.nm))}<span class="recl-st-ring" style="border-width:2px"></span></div>
                <div class="t-person-txt">
                  <div class="t-name">${esc(p.nm)}</div>
                  <div class="t-doc">ID ${esc(p.id)}</div>
                </div>
              </div>
            </td>
            <td><span class="t-pill t-pos">${esc(p.pos)}</span></td>
            <td>${esc(p.zone)}</td>
            <td>${esc(p.mod)}</td>
            <td><span class="t-state"><span class="dot" style="background:${stColor(p.st)}"></span>${esc(stLabel(p.st))}</span></td>
            <td><span class="t-eng">EN ${esc(['Básico','Intermedio','Avanzado','Conversacional'][p.eng-1] || '—')}</span></td>
            <td><span class="t-docs ${docsComplete?'ok':'pending'}"><span class="mi">${docsComplete?'task_alt':'pending'}</span>${docsCount}/${docsTotal}</span></td>
            <td>${blPill}</td>
            <td class="t-actions">
              <button class="t-act" title="Ver detalle" onclick="event.stopPropagation();window.__reclSelect('${p.id}')"><span class="mi">visibility</span></button>
              <button class="t-act" title="Más opciones" onclick="event.stopPropagation();toast('Más opciones','more_horiz')"><span class="mi">more_horiz</span></button>
            </td>
          </tr>`;
      }).join('');
      return `
        <div class="recl-table-wrap">
          <table class="recl-table">
            <thead>
              <tr>
                <th>Colaborador</th>
                <th>Posición</th>
                <th>Zona</th>
                <th>Modalidad</th>
                <th>Estado</th>
                <th>Inglés</th>
                <th>Documentos</th>
                <th>Blacklist</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>`;
    }

    // ---- Vista MAPA (agrupado por zona) ----
    function renderMap(){
      const list = filtered();
      const zones = ZONAS.map(z=>{
        const ppl = list.filter(p=>p.zone===z);
        const rows = ppl.length ? ppl.map(p=>`
          <div class="recl-zone-row" onclick="window.__reclSelect('${p.id}')">
            <div class="recl-avatar ${gradFor(p.id)}" style="--card-st:${stColor(p.st)}">
              ${esc(initials(p.nm))}<span class="recl-st-ring"></span>
            </div>
            <div class="nm">
              <div class="name">${esc(p.nm)}</div>
              <div class="doc">DOC ${esc(p.doc)} · ${esc(stLabel(p.st))}</div>
            </div>
            <span class="pos">${esc(p.pos)}</span>
            <span class="mi chev">chevron_right</span>
          </div>`).join('') : `<div style="padding:14px;text-align:center;color:var(--ink-4);font-size:12px">Sin colaboradores en esta zona</div>`;
        return `
          <div class="recl-zone">
            <div class="recl-zone-head">
              <div class="recl-zone-ic"><span class="mi">place</span></div>
              <div class="recl-zone-name">${esc(z)}<span class="meta">${ppl.length} colaborador${ppl.length===1?'':'es'} · ${ppl.filter(p=>p.st==='verdef').length} disponibles</span></div>
              <div class="recl-zone-tot">${String(ppl.length).padStart(2,'0')}</div>
            </div>
            <div class="recl-zone-stack">${rows}</div>
          </div>`;
      }).join('');
      return `<div class="recl-map">${zones}</div>`;
    }

    // ---- Filtros bar ----
    function filterChip(grp,label,val,opts){
      const active = !!val;
      const optsJSON = JSON.stringify(opts).replace(/"/g,'&quot;');
      const isOpen = state.openFilter===grp;
      return `
        <div class="recl-filter-grp ${active?'active':''} ${isOpen?'open':''}" onclick="event.stopPropagation();window.__reclToggleDD('${grp}')">
          <span class="lbl-grp">${esc(label)}</span>
          <span class="val">${esc(val||'Todas')}</span>
          <span class="mi">${isOpen?'expand_less':'expand_more'}</span>
          <div class="recl-fdd" onclick="event.stopPropagation()">
            <div class="recl-fdd-item all" onclick="window.__reclPickFilter('${grp}','')">
              <span>Todas</span>
            </div>
            ${opts.map(o=>{
              const sel = (grp==='filterEng')
                ? (INGLES.find(i=>i[1]===o)?.[0]===state.filterEng)
                : (state[grp]===o);
              return `<div class="recl-fdd-item ${sel?'selected':''}" onclick="window.__reclPickFilter('${grp}','${esc(o).replace(/'/g,"\\'")}')"><span>${esc(o)}</span><span class="mi">check</span></div>`;
            }).join('')}
          </div>
        </div>`;
    }

    function statusChip(){
      const grp = 'filterStatus';
      const active = !!state.filterStatus;
      const isOpen = state.openFilter===grp;
      const cur = STATUSES.find(s=>s.key===state.filterStatus);
      const valLabel = cur ? cur.label : 'Todos';
      const dotHTML = cur ? `<span class="recl-fdd-dot" style="background:${cur.color}"></span>` : '';
      return `
        <div class="recl-filter-grp ${active?'active':''} ${isOpen?'open':''}" onclick="event.stopPropagation();window.__reclToggleDD('${grp}')">
          <span class="lbl-grp">Estado</span>
          <span class="val">${dotHTML}${esc(valLabel)}</span>
          <span class="mi">${isOpen?'expand_less':'expand_more'}</span>
          <div class="recl-fdd recl-fdd-status" onclick="event.stopPropagation()">
            <div class="recl-fdd-item all" onclick="window.__reclPickFilter('${grp}','')">
              <span>Todos</span>
            </div>
            ${STATUSES.map(s=>{
              const sel = state.filterStatus===s.key;
              return `<div class="recl-fdd-item ${sel?'selected':''}" onclick="window.__reclPickFilter('${grp}','${s.key}')">
                <span class="recl-fdd-dot" style="background:${s.color}"></span>
                <span class="recl-fdd-lbl">${esc(s.label)}<small>${esc(s.sub)}</small></span>
                <span class="mi">check</span>
              </div>`;
            }).join('')}
          </div>
        </div>`;
    }

    // ---- Render principal ----
    window.__renderRecl = function(){
      const root = document.getElementById('recl-root');
      // Sincroniza clase de vista en body para CSS dependiente de vista
      document.body.classList.remove('recl-view-board','recl-view-list','recl-view-table','recl-view-map');
      document.body.classList.add('recl-view-'+state.view);
      const total = PEOPLE.length;
      const dispo = PEOPLE.filter(p=>p.st==='verdef').length;
      const onb   = PEOPLE.filter(p=>['verdem','azul','blanco'].includes(p.st)).length;
      const alert = PEOPLE.filter(p=>['rojo','negro','morado'].includes(p.st)).length;

      let body = '';
      if(state.view==='board') body = renderBoard();
      else if(state.view==='list') body = renderList();
      else if(state.view==='table') body = renderTable();
      else body = renderMap();

      // Tabs (Entrevistas / Pool de colaboradores) — full-width estilo Requisiciones
      const tabsHtml = `
        <div class="recl-subtabs-wrap">
          <div class="recl-segmented requi-tabs-full" id="recl-subtabs">
            <button class="${state.subtab==='entrevistas'?'active':''}" data-tab="entrevistas" onclick="window.__reclSetSubtab('entrevistas')">
              <span class="mi">how_to_reg</span>
              <span class="requi-tab-label">Entrevistas</span>
              <span class="requi-tab-count" data-tone="info">${(window.__entrevList?window.__entrevList():[]).length || 0}</span>
            </button>
            <button class="${state.subtab==='pool'?'active':''}" data-tab="pool" onclick="window.__reclSetSubtab('pool')">
              <span class="mi">groups</span>
              <span class="requi-tab-label">Pool de colaboradores</span>
              <span class="requi-tab-count" data-tone="ok">${total}</span>
            </button>
          </div>
        </div>
      `;

      if(state.subtab==='entrevistas'){
        root.innerHTML = (window.__entrevHero? window.__entrevHero() : '') + tabsHtml + (window.__entrevRender? window.__entrevRender() : '');
        if(window.__entrevBindSearch) window.__entrevBindSearch();
        return;
      }

      root.innerHTML = `
        <!-- HERO -->
        <div class="recl-hero">
          <div class="recl-hero-left" style="height:160px">
            <div class="eyebrow"><span class="pulse"></span>Pool de colaboradores · Vivo</div>
            <h1>Captura y mantén el <span class="accent">pool de colaboradores</span> al día.</h1>
            <div class="lead">Da de alta nuevos colaboradores, mantén su semáforo actualizado y consulta su historial. Las asignaciones se registran automáticamente en el Schedule del hotel.</div>
          </div>
          <div class="recl-hero-right" style="height:160px">
            <div class="recl-stat">
              <div class="rs-top">
                <div class="rs-ic" style="background:rgba(255,142,0,.12);color:var(--o-600)"><span class="mi">groups</span></div>
                <span class="rs-trend up"><span class="mi">arrow_upward</span>+4</span>
              </div>
              <div class="rs-val">${total}</div>
              <div class="rs-lbl">Colaboradores en pool</div>
            </div>
            <div class="recl-stat">
              <div class="rs-top">
                <div class="rs-ic" style="background:rgba(31,168,74,.12);color:#1F8F50"><span class="mi">check_circle</span></div>
                <span class="rs-trend up"><span class="mi">arrow_upward</span>2</span>
              </div>
              <div class="rs-val">${dispo}</div>
              <div class="rs-lbl">Disponibles ahora</div>
            </div>
            <div class="recl-stat">
              <div class="rs-top">
                <div class="rs-ic" style="background:rgba(63,184,230,.14);color:#1583B0"><span class="mi">school</span></div>
                <span class="rs-trend warn"><span class="mi">schedule</span>hoy</span>
              </div>
              <div class="rs-val">${onb}</div>
              <div class="rs-lbl">En onboarding / pre-asignación</div>
            </div>
            <div class="recl-stat">
              <div class="rs-top">
                <div class="rs-ic" style="background:rgba(225,25,25,.1);color:var(--red)"><span class="mi">warning_amber</span></div>
                <span class="rs-trend down"><span class="mi">arrow_upward</span>+1</span>
              </div>
              <div class="rs-val">${alert}</div>
              <div class="rs-lbl">Casos críticos / blacklist</div>
            </div>
          </div>
        </div>

        ${tabsHtml}

        <!-- TOOLBAR -->
        <div class="recl-toolbar">
          <div class="recl-search">
            <span class="mi">search</span>
            <input type="text" id="recl-search-input" placeholder="Buscar por nombre, documento, teléfono o ID…" value="${esc(state.query)}">
            <span class="kbd">⌘F</span>
          </div>
        </div>

        <!-- FILTROS + view switcher -->
        <div class="recl-filters">
          <div class="recl-filters-left">
            ${filterChip('filterPos','Posición', state.filterPos, POSICIONES)}
            ${filterChip('filterZone','Zona', state.filterZone, ZONAS)}
            ${filterChip('filterMod','Modalidad', state.filterMod, MODALIDADES)}
            ${filterChip('filterEng','Inglés', INGLES.find(i=>i[0]===state.filterEng)?.[1] || '', INGLES.map(i=>i[1]))}
            ${statusChip()}
            ${(()=>{
              const n = (state.filterPos?1:0)+(state.filterZone?1:0)+(state.filterMod?1:0)+(state.filterEng?1:0)+(state.filterStatus?1:0)+(state.query?1:0);
              return n>0
                ? `<span class="recl-filter-clear" onclick="window.__reclClear()" title="Limpiar todos los filtros"><span class="mi" style="font-size:15px">filter_alt_off</span> Limpiar todo <span class="badge-n">${n}</span></span>`
                : '';
            })()}
          </div>
          <div class="recl-filters-right">
            <div class="recl-segmented recl-segmented-inline">
              <button class="${state.view==='board'?'active':''}" onclick="window.__reclSetView('board')"><span class="mi">view_kanban</span>Tablero</button>
              <button class="${state.view==='list'?'active':''}" onclick="window.__reclSetView('list')"><span class="mi">grid_view</span>Tarjetas</button>
              <button class="${state.view==='table'?'active':''}" onclick="window.__reclSetView('table')"><span class="mi">table_rows</span>Tabla</button>
              <button class="${state.view==='map'?'active':''}" onclick="window.__reclSetView('map')"><span class="mi">map</span>Por zona</button>
            </div>
          </div>
        </div>

        ${body}
      `;

      // bind search input
      const inp = document.getElementById('recl-search-input');
      if(inp){
        inp.addEventListener('input',e=>{ state.query=e.target.value; window.__renderRecl(); setTimeout(()=>document.getElementById('recl-search-input')?.focus(),0); });
      }
    };

    // ---- Filtros & vista ----
    window.__reclSetSubtab = t => {
      state.subtab = t;
      // cuando se entra a entrevistas, cerrar drawer pool si abierto
      if(t==='entrevistas'){
        state.selected = null;
        const root = document.getElementById('recl-root');
        if(root) root.classList.remove('drawer-open');
        document.getElementById('recl-drawer-bg')?.classList.remove('open');
        document.getElementById('recl-drawer')?.classList.remove('open');
      } else {
        state.eSelected = null;
        document.getElementById('entrev-drawer-bg')?.classList.remove('open');
        document.getElementById('entrev-drawer')?.classList.remove('open');
      }
      window.__renderRecl();
    };
    window.__reclSetView = v => {
      state.view=v;
      const root = document.getElementById('recl-root');
      if(root){
        root.classList.remove('view-board','view-list','view-table','view-map');
        root.classList.add('view-'+v);
      }
      document.body.classList.remove('recl-view-board','recl-view-list','recl-view-table','recl-view-map');
      document.body.classList.add('recl-view-'+v);
      window.__renderRecl();
    };
    window.__reclToggleDD = grp => {
      state.openFilter = (state.openFilter===grp) ? null : grp;
      window.__renderRecl();
    };
    window.__reclPickFilter = (grp, val) => {
      if(grp==='filterEng'){
        state.filterEng = val ? (INGLES.find(i=>i[1]===val)?.[0] || '') : '';
      } else {
        state[grp] = val;
      }
      state.openFilter = null;
      window.__renderRecl();
    };
    window.__reclCycle = (key, opts) => {
      const cur = state[key];
      const idx = opts.indexOf(cur);
      // For inglés, match label-> key
      if(key==='filterEng'){
        const cur2 = INGLES.find(i=>i[0]===state.filterEng)?.[1] || '';
        const idx2 = opts.indexOf(cur2);
        const next = opts[(idx2+1)%(opts.length+1)] || '';
        state.filterEng = INGLES.find(i=>i[1]===next)?.[0] || '';
      } else {
        const next = opts[(idx+1)%(opts.length+1)] || '';
        state[key]=next;
      }
      window.__renderRecl();
    };
    window.__reclClear = ()=>{
      state.filterPos=state.filterZone=state.filterMod=state.filterEng=state.filterStatus='';
      state.query='';
      window.__renderRecl();
    };
    window.__reclSetFilter = (k,v)=>{
      if(k==='view'){ state.view='board'; window.__renderRecl(); return; }
      if(v==='disp'){ state.view='board'; window.__renderRecl(); }
      if(v==='onb'){ state.view='board'; window.__renderRecl(); }
      if(v==='alert'){ state.view='board'; window.__renderRecl(); }
    };

    // ---- Drawer detalle ----
    window.__reclSelect = id => {
      state.selected = id;
      state.drawerTab = 'datos';
      renderDrawer();
      document.getElementById('recl-drawer').classList.add('open');
      const root = document.getElementById('recl-root');
      if(root) root.classList.add('drawer-open');
      window.__renderRecl();
    };
    window.__reclCloseDrawer = () => {
      state.selected=null;
      document.getElementById('recl-drawer').classList.remove('open');
      const root = document.getElementById('recl-root');
      if(root) root.classList.remove('drawer-open');
      window.__renderRecl();
    };
    window.__reclSetDrawerTab = t => { state.drawerTab=t; renderDrawer(); };

    function renderDrawer(){
      const p = PEOPLE.find(x=>x.id===state.selected);
      if(!p) return;
      const eng = INGLES[p.eng-1];
      const drw = document.getElementById('recl-drawer');
      const bg  = document.getElementById('recl-drawer-bg');

      let bodyHTML = '';
      if(state.drawerTab==='datos'){
        bodyHTML = `
          <div class="dr-section">
            <div class="dr-section-title">Datos personales</div>
            <div class="dr-fields">
              <div class="dr-field"><div class="fic"><span class="mi">person</span></div><div class="ftxt"><div class="flbl">Nombre completo</div><div class="fval">${esc(p.nm)}</div></div></div>
              <div class="dr-field"><div class="fic"><span class="mi">badge</span></div><div class="ftxt"><div class="flbl">Identificación</div><div class="fval">ID ${esc(p.id)}</div></div></div>
              <div class="dr-field"><div class="fic"><span class="mi">phone</span></div><div class="ftxt"><div class="flbl">Teléfono</div><div class="fval">${esc(p.tel)}</div></div></div>
              <div class="dr-field"><div class="fic"><span class="mi">home</span></div><div class="ftxt"><div class="flbl">Domicilio</div><div class="fval">${esc(p.dom)}</div></div></div>
            </div>
          </div>
          <div class="dr-section">
            <div class="dr-section-title">Estado en blacklist</div>
            ${p.bl
              ? `<div class="dr-blacklist-card danger"><div class="dr-bl-ic"><span class="mi">block</span></div><div class="dr-bl-txt"><div class="ttl">En blacklist</div><div class="meta">${esc(p.note||'Vetado por incumplimiento.')}</div></div></div>`
              : `<div class="dr-blacklist-card clean"><div class="dr-bl-ic"><span class="mi">check</span></div><div class="dr-bl-txt"><div class="ttl">Sin registro de blacklist</div><div class="meta">Apto para ser asignado a hotel.</div></div></div>`
            }
          </div>
          ${p.note && !p.bl ? `<div class="dr-section">
            <div class="dr-section-title">Historial</div>
            <div class="req-info-list" style="padding:8px 12px">
              <div class="req-tl-item" style="padding:7px 0">
                <div class="when">Hoy</div>
                <div class="what"><strong>Fecha:</strong> 2026-05-21 · <strong>Responsable:</strong> Sistema · <strong>Comentario:</strong> "${esc(p.nm)} marcada por inasistencia sin justificación. ${esc(p.note)}"</div>
              </div>
            </div>
          </div>` : ''}
          ${p.st === 'blanco' ? `<div class="dr-section">
            <div class="dr-section-title">Historial</div>
            <div class="req-info-list" style="padding:8px 12px">
              <div class="req-tl-item" style="padding:7px 0">
                <div class="when">Hace 1 día</div>
                <div class="what"><strong>Fecha:</strong> 2026-05-19 · <strong>Responsable:</strong> Daniela Ríos (Reclutadora) · <strong>Comentario:</strong> "${esc(p.nm)} aprueba las 4 fases del Flujo de Reclutamiento. Blacklist negativa confirmada."</div>
              </div>
            </div>
          </div>` : ''}
          ${p.st === 'naranja' ? (()=>{
            // Naranja (Fijo) — Transición automática del sistema cuando el
            // colaborador completa 7 días consecutivos y pasa a ser fijo.
            const hotelFijo = (p.hist && p.hist[0] && p.hist[0].h) || 'Hotel asignado';
            // Heurística de género para concordancia ("fija" vs "fijo"):
            // primer nombre termina en "a" → femenino.
            const first = (p.nm||'').split(' ')[0] || '';
            const fem   = /a$/i.test(first);
            const rol   = fem ? 'colaboradora fija' : 'colaborador fijo';
            return `<div class="dr-section">
              <div class="dr-section-title">Historial</div>
              <div class="req-info-list" style="padding:8px 12px">
                <div class="req-tl-item" style="padding:7px 0">
                  <div class="when">7 días completados (Fijo)</div>
                  <div class="what"><strong>Fecha:</strong> 2026-05-28 · <strong>Responsable:</strong> Sistema · <strong>Comentario:</strong> "Transición automática. ${esc(p.nm)} se convierte en ${rol} del ${esc(hotelFijo)}."</div>
                </div>
              </div>
            </div>`;
          })() : ''}
          ${p.st === 'azul' ? (()=>{
            // Azul claro (Día 3+ uniforme) — Inspector confirma que ponchó
            // sus días consecutivos y se le entrega el uniforme.
            const INSPECTORES_HOTEL = {
              'Norte':'Roberto Salinas','Sur':'Mariana Ortega','Este':'Fernando Aguilar',
              'Oeste':'Patricia Núñez','Centro':'Ricardo Domínguez','Noroeste':'Javier Torres',
              'Sureste':'Javier Torres',
            };
            const inspector = INSPECTORES_HOTEL[p.zone] || 'Javier Torres';
            // Extrae el día del campo `on` ("Día N — uniforme entregado").
            const dayMatch = (p.on||'').match(/Día\s+(\d+)/i);
            const dia      = dayMatch ? parseInt(dayMatch[1],10) : 3;
            return `<div class="dr-section">
              <div class="dr-section-title">Historial</div>
              <div class="req-info-list" style="padding:8px 12px">
                <div class="req-tl-item" style="padding:7px 0">
                  <div class="when">Día ${dia}, uniforme entregado</div>
                  <div class="what"><strong>Fecha:</strong> 2026-05-23 · <strong>Responsable:</strong> ${esc(inspector)} (Inspector) · <strong>Comentario:</strong> "${esc(p.nm)} ponchó ${dia} días consecutivos. Uniforme entregado."</div>
                </div>
              </div>
            </div>`;
          })() : ''}
          ${p.st === 'verdem' ? (()=>{
            // Onboarding (verde manzana) — Inspector verifica al colaborador
            // en sitio durante su primer día en el hotel asignado.
            const INSPECTORES_HOTEL = {
              'Norte':'Roberto Salinas','Sur':'Mariana Ortega','Este':'Fernando Aguilar',
              'Oeste':'Patricia Núñez','Centro':'Ricardo Domínguez','Noroeste':'Javier Torres',
            };
            const inspector = INSPECTORES_HOTEL[p.zone] || 'Javier Torres';
            const hotelOnb  = (p.hist && p.hist[0] && p.hist[0].h) || 'Hotel asignado';
            return `<div class="dr-section">
              <div class="dr-section-title">Historial</div>
              <div class="req-info-list" style="padding:8px 12px">
                <div class="req-tl-item" style="padding:7px 0">
                  <div class="when">Hoy</div>
                  <div class="what"><strong>Fecha:</strong> 2026-05-21 · <strong>Responsable:</strong> ${esc(inspector)} (Inspector) · <strong>Comentario:</strong> "${esc(p.nm)} verificada en sitio. Primer día en ${esc(hotelOnb)}."</div>
                </div>
              </div>
            </div>`;
          })() : ''}
        `;
      } else if(state.drawerTab==='laboral'){
        bodyHTML = `
          <div class="dr-section">
            <div class="dr-section-title">Datos laborales</div>
            <div class="dr-fields">
              <div class="dr-field"><div class="fic"><span class="mi">work_outline</span></div><div class="ftxt"><div class="flbl">Posición</div><div class="fval">${esc(p.pos)}</div></div></div>
              <div class="dr-field"><div class="fic"><span class="mi">place</span></div><div class="ftxt"><div class="flbl">Zona</div><div class="fval">${esc(p.zone)}</div></div></div>
              <div class="dr-field"><div class="fic"><span class="mi">schedule</span></div><div class="ftxt"><div class="flbl">Modalidad</div><div class="fval">${esc(p.mod)}</div></div></div>
              <div class="dr-field"><div class="fic"><span class="mi">translate</span></div><div class="ftxt"><div class="flbl">Nivel de inglés</div><div class="fval">${esc(eng[1])}</div></div></div>
              <div class="dr-field"><div class="fic"><span class="mi">military_tech</span></div><div class="ftxt"><div class="flbl">Experiencia previa</div><div class="fval">${esc(p.exp)}</div></div></div>
            </div>
          </div>
          <div class="dr-section">
            <div class="dr-section-title">Semáforo actual</div>
            <div style="display:flex;align-items:center;gap:14px;background:#fff;border:1px solid var(--line);border-radius:12px;padding:14px">
              <div style="width:48px;height:48px;border-radius:12px;background:${stColor(p.st)};box-shadow:0 4px 14px ${stColor(p.st)}55;flex-shrink:0"></div>
              <div style="flex:1">
                <div style="font-size:14px;font-weight:700;color:rgb(83,59,23)">${esc(stLabel(p.st))}</div>
                <div style="font-size:11.5px;color:var(--ink-3);margin-top:2px">${esc(STATUSES.find(s=>s.key===p.st)?.sub||'')}</div>
                ${p.on?`<div style="font-size:11.5px;color:var(--o-700);font-weight:600;margin-top:6px"><span class="mi" style="font-size:13px;vertical-align:-2px">school</span> ${esc(p.on)}</div>`:''}
              </div>
            </div>
          </div>
        `;
      } else if(state.drawerTab==='historial'){
        // Historial de asignaciones — solo hoteles en los que ha trabajado.
        // (El Historial de actividad del candidato vive en la pestaña
        //  "Datos", bajo Estado en blacklist.)
        // Banner informativo: colaborador disponible temporalmente para fechas específicas
        const availBanner = (p.ssAvailFrom && p.ssAvailTo) ? `
          <div class="dr-avail-banner">
            <div class="ab-ic"><span class="mi">event_available</span></div>
            <div class="ab-txt">
              <div class="ab-title">Disponible temporalmente</div>
              <div class="ab-sub">Este colaborador indicó estar <strong>disponible para asignaciones temporales</strong> dentro de la siguiente ventana de fechas${p.ssMonths?` (máximo ${p.ssMonths} mes${p.ssMonths===1?'':'es'})`:''}:</div>
              <div class="ab-range">
                <span class="ab-pill"><span class="mi">event</span>${esc(p.ssAvailFrom)}</span>
                <span class="ab-arr"><span class="mi">arrow_forward</span></span>
                <span class="ab-pill"><span class="mi">event_available</span>${esc(p.ssAvailTo)}</span>
              </div>
            </div>
          </div>
        ` : '';
        // Banner informativo: colaborador "Según solicitud" abierto a cualquier modalidad/contrato
        const openBanner = p.ssOpen ? `
          <div class="dr-open-banner">
            <div class="ob-ic"><span class="mi">info</span></div>
            <div class="ob-txt">
              Este colaborador <strong>no eligió un horario fijo deseado</strong>. Indicó estar
              <strong>abierto a cualquier modalidad de tiempo y contrato</strong> que ofrezca el hotel —
              la asignación se define <strong>según solicitud</strong> de la operación.
            </div>
          </div>
        ` : '';
        bodyHTML = `
          ${availBanner}
          ${openBanner}
          ${p.hist.length ? `<div class="dr-section">
            <div class="dr-section-title">Hoteles donde ha trabajado</div>
            <div class="dr-history">
              ${p.hist.map(h=>`
                <div class="dr-history-row ${h.asg==='temporal'?'asg-temp':''}">
                  <div class="h-ic"><span class="mi">${h.asg==='temporal'?'assignment':'hotel'}</span></div>
                  <div class="h-meta">
                    <div class="h-name">${esc(h.h)}</div>
                    <div class="h-sub">${esc(h.role)}${h.asg==='temporal'?` · <span class="h-asg-badge">Asignación temporal${h.months?` · ${h.months} mes${h.months===1?'':'es'}`:''}</span>`:''}</div>
                    ${h.asg==='temporal' && h.contractFrom && h.contractTo ? `
                      <div class="h-asg-range">
                        <span class="h-asg-pill"><span class="mi">event</span>${esc(h.contractFrom)}</span>
                        <span class="h-asg-arr"><span class="mi">arrow_forward</span></span>
                        <span class="h-asg-pill"><span class="mi">event_available</span>${esc(h.contractTo)}</span>
                      </div>
                    ` : ''}
                  </div>
                  <div class="h-date">${esc(h.from)} → ${esc(h.to)}${h.curr?'<span class="badge curr">Actual</span>':'<span class="badge" style="visibility:hidden">_</span>'}</div>
                </div>
              `).join('')}
            </div>
          </div>` : `<div style="padding:30px;text-align:center;color:var(--ink-3)"><span class="mi" style="font-size:38px;color:var(--ink-4)">history_toggle_off</span><div style="margin-top:6px;font-size:13px;font-weight:500">Sin asignaciones previas</div><div style="font-size:11.5px;color:var(--ink-4);margin-top:3px">${p.ssAvailFrom?'Sin hoteles previos. Disponible para nueva asignación temporal.':p.ssOpen?'Sin hoteles previos. Abierto a cualquier modalidad de tiempo y contrato.':'Es la primera asignación de este colaborador.'}</div></div>`}
        `;
      } else if(state.drawerTab==='docs'){
        const d = p.docs;
        const item = (have,name,sub)=>`
          <div class="dr-doc">
            <div class="d-ic ${have?'':'miss'}"><span class="mi">${have?'description':'upload_file'}</span></div>
            <div class="d-txt"><div class="d-name">${esc(name)}</div><div class="d-sub ${have?'':'miss'}">${have?esc(sub):''}</div></div>
            <div class="d-actions">
              <div class="d-act" title="Ver" onclick="event.stopPropagation();toast('Vista previa de ${esc(name)}','visibility')"><span class="mi">visibility</span></div>
              <div class="d-act" title="Descargar" onclick="event.stopPropagation();toast('Descargando ${esc(name)}','download')"><span class="mi">download</span></div>
            </div>
          </div>`;
        bodyHTML = `
          <div class="dr-section">
            <div class="dr-section-title">Documentos del colaborador</div>
            <div class="dr-docs">
              ${item(d.ssn,'SSN','Cargado · 2.3 MB')}
              ${item(d.itin,'ITIN','Cargado · 1.8 MB')}
              ${item(d.id,'Identificación oficial','Frente y reverso')}
              ${item(d.cv,'Currículum / Hoja de vida','PDF firmado')}
            </div>
          </div>`;
      }

      drw.innerHTML = `
        <div class="recl-drawer-head">
          <div class="recl-drawer-close" onclick="window.__reclCloseDrawer()"><span class="mi">close</span></div>
          <div class="recl-drawer-id">
            ID ${esc(p.id)}
            <span class="recl-st-pill"><span class="dot" style="background:${stColor(p.st)}"></span>${esc(stLabel(p.st))}</span>
          </div>
          <div class="recl-drawer-name-row">
            <div class="recl-avatar ${gradFor(p.id)}" style="--card-st:${stColor(p.st)}">${esc(initials(p.nm))}<span class="recl-st-ring" style="border-width:3px"></span></div>
            <div>
              <div class="recl-drawer-name">${esc(p.nm)}</div>
              <div class="recl-drawer-meta">
                <span class="recl-meta-item"><span class="mi">work_outline</span>${esc(p.pos)}</span>
                <span class="recl-meta-sep"></span>
                <span class="recl-meta-item"><span class="mi">place</span>${esc(p.zone)}</span>
                <span class="recl-meta-sep"></span>
                <span class="recl-meta-item"><span class="mi">schedule</span>${esc(p.mod)}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="recl-drawer-tabs">
          ${[['datos','Datos','badge'],['laboral','Laboral','work_outline'],['historial','Historial de asignaciones','history'],['docs','Documentos','description']].map(t=>`
            <div class="recl-drawer-tab ${state.drawerTab===t[0]?'active':''}" onclick="window.__reclSetDrawerTab('${t[0]}')"><span class="mi">${t[2]}</span>${t[1]}</div>
          `).join('')}
        </div>
        <div class="recl-drawer-body">${bodyHTML}</div>
        ${(p.st==='verdef'||p.st==='amarillo')
          ? `<div class="recl-drawer-foot"><button class="btn primary" style="flex:1;justify-content:center" onclick="window.__reclAsignarTemp('${p.id}')"><span class="mi">swap_horiz</span>Asignar temporalmente</button></div>`
          : p.st==='cafe'
            ? `<div class="recl-drawer-foot"><button class="btn ghost danger" style="flex:1;justify-content:center" onclick="window.__reclCancelTemp('${p.id}')"><span class="mi">undo</span>Cancelar asignación temporal</button></div>`
            : ''}
      `;
      drw.classList.add('open');
      const root = document.getElementById('recl-root');
      if(root) root.classList.add('drawer-open');
    }

    // (Se eliminó la lógica de asignar a requisición — ese flujo no corresponde al rol Reclutador.
    //  La acción principal queda registrada automáticamente en el Schedule del hotel cuando el
    //  Manager mueve el semáforo desde su módulo. Aquí sólo se captura y consulta.)

    // ---- Asignación temporal (Café) — transición Verde fuerte / Amarillo → Café ----
    // El colaborador disponible se asigna a un hotel por una cantidad de días.
    // Al vencer regresa automáticamente a su estado previo (regla del Semáforo
    // del Colaborador). También puede cancelarse manualmente antes de vencer.
    const HOTELES_TEMP = ['Hotel Costa del Sol','Hotel Marina Bay','Hotel Punta Vista','Hotel Vista Mar','Hotel Sol & Mar','Hotel Las Brisas'];
    const MESES_ABR = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
    const fmtFecha = d => `${d.getDate()} ${MESES_ABR[d.getMonth()]} ${d.getFullYear()}`;
    function __reclCloseTempModal(){ const o=document.getElementById('recl-temp-ov'); if(o) o.remove(); }
    window.__reclAsignarTemp = (id)=>{
      const p = PEOPLE.find(x=>x.id===id); if(!p) return;
      __reclCloseTempModal();
      const prevLbl = stLabel(p.st);
      const ov = document.createElement('div');
      ov.id = 'recl-temp-ov'; ov.className = 'lg-cand-overlay';
      ov.onclick = (e)=>{ if(e.target===ov) __reclCloseTempModal(); };
      ov.innerHTML = `<div class="lg-cand-modal" style="width:min(460px,100%)">
        <div class="lg-cand-head">
          <div class="avatar lg" style="background:#8B5A2B"><span class="mi" style="color:#fff">swap_horiz</span></div>
          <div class="lg-cand-id"><div class="nm">Asignación temporal</div><div class="ps">${esc(p.nm)} · ${esc(prevLbl)}</div></div>
          <button class="lg-cand-x" onclick="__reclCloseTempModal()"><span class="mi">close</span></button>
        </div>
        <div class="lg-cand-body">
          <div class="recl-temp-field"><label>Hotel destino</label>
            <select id="recl-temp-hotel" class="recl-temp-input">${HOTELES_TEMP.map(h=>`<option>${h}</option>`).join('')}</select>
          </div>
          <div class="recl-temp-field"><label>Duración (días)</label>
            <input id="recl-temp-dias" class="recl-temp-input" type="number" min="1" max="180" value="30">
          </div>
          <div class="recl-temp-note"><span class="mi">info</span><span>Al confirmar, <strong>${esc(p.nm.split(' ')[0])}</strong> pasa a <strong>Café · Asignación temporal</strong>. Al vencer los días regresa automáticamente a <strong>${esc(prevLbl)}</strong>.</span></div>
        </div>
        <div class="lg-cand-foot">
          <button class="btn ghost" onclick="__reclCloseTempModal()">Cancelar</button>
          <button class="btn primary" onclick="window.__reclConfirmTemp('${p.id}')"><span class="mi">check</span>Confirmar asignación</button>
        </div>
      </div>`;
      document.body.appendChild(ov);
    };
    window.__reclConfirmTemp = (id)=>{
      const p = PEOPLE.find(x=>x.id===id); if(!p) return;
      const hotel = document.getElementById('recl-temp-hotel')?.value || HOTELES_TEMP[0];
      let dias = parseInt(document.getElementById('recl-temp-dias')?.value, 10); if(!dias || dias<1) dias = 30;
      const today = new Date(2026,3,24), end = new Date(2026,3,24+dias);
      const months = Math.max(1, Math.round(dias/30));
      p._tempPrev = p.st;
      p.st = 'cafe';
      p.hist = p.hist || [];
      p.hist.unshift({h:hotel, role:p.pos, from:fmtFecha(today), to:fmtFecha(end), curr:true, asg:'temporal', contractFrom:fmtFecha(today), contractTo:fmtFecha(end), months});
      __reclCloseTempModal();
      window.__reclCloseDrawer && window.__reclCloseDrawer();
      window.__renderRecl && window.__renderRecl();
      if(typeof toast==='function') toast(`✓ ${p.nm.split(' ')[0]} asignada temporalmente a ${hotel} · ${dias} días`, 'swap_horiz');
    };
    window.__reclCancelTemp = (id)=>{
      const p = PEOPLE.find(x=>x.id===id); if(!p) return;
      p.st = p._tempPrev || 'verdef';
      delete p._tempPrev;
      if(p.hist && p.hist.length){ const t = p.hist.find(h=>h.curr && h.asg==='temporal'); if(t) t.curr = false; }
      window.__reclCloseDrawer && window.__reclCloseDrawer();
      window.__renderRecl && window.__renderRecl();
      if(typeof toast==='function') toast(`Asignación temporal cancelada · ${p.nm.split(' ')[0]} regresó a ${stLabel(p.st)}`, 'undo');
    };

    // ---- Modal Nuevo Colaborador (form simple, sin pasos) ----
    window.__reclOpenNew = ()=>{
      document.getElementById('recl-modal-bg').classList.add('open');
      renderModal();
    };
    window.__reclCloseNew = ()=>{
      document.getElementById('recl-modal-bg').classList.remove('open');
    };
    window.__reclSaveNew = ()=>{
      const modal = document.getElementById('recl-modal');
      if(!modal) return;

      // Limpiar errores previos
      modal.querySelectorAll('.recl-field.error').forEach(f=>f.classList.remove('error'));

      const errors = [];
      const setErr = (fieldKey, msg)=>{
        const f = modal.querySelector(`[data-field="${fieldKey}"]`);
        if(!f) return;
        f.classList.add('error');
        if(msg){
          const txt = f.querySelector('.err-msg .txt');
          if(txt) txt.textContent = msg;
        }
        errors.push(fieldKey);
      };
      const getVal = (n)=>{
        const el = modal.querySelector(`[name="${n}"]`);
        return el ? (el.value || '').trim() : '';
      };

      // Validaciones
      // Origen (paso previo, gatea el resto)
      const origenChecked = modal.querySelector('input[name="origen"]:checked');
      const origen = origenChecked ? origenChecked.value : '';
      const origenSection = modal.querySelector('.recl-origen-section');
      if(!origen){
        if(origenSection) origenSection.classList.add('error');
        errors.push('origen');
      }

      const nombre = getVal('nombre');
      if(!nombre) setErr('nombre','Ingresa el nombre completo del colaborador');
      else if(nombre.length<3) setErr('nombre','El nombre debe tener al menos 3 caracteres');

      const fechanac = getVal('fechanac');
      if(!fechanac) setErr('fechanac','Selecciona la fecha de nacimiento');

      const telefono = getVal('telefono');
      const telDigits = telefono.replace(/\D/g,'');
      if(!telefono) setErr('telefono','Ingresa el teléfono del colaborador');
      else if(telDigits.length<10) setErr('telefono','El teléfono debe tener al menos 10 dígitos');

      const correo = getVal('correo');
      if(correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)){
        setErr('correo','Formato de correo inválido (ej. nombre@correo.com)');
      }

      const domicilio = getVal('domicilio');
      if(!domicilio) setErr('domicilio','Captura el domicilio completo');
      else if(domicilio.length<8) setErr('domicilio','Captura calle, número y colonia');

      if(errors.length){
        toast(`Faltan ${errors.length} campo${errors.length>1?'s':''} por completar`,'error');
        // Scroll al primer error
        const first = modal.querySelector('.recl-origen-section.error, .recl-field.error');
        if(first){
          const body = modal.querySelector('.recl-modal-body');
          if(body){
            const top = first.offsetTop - 12;
            body.scrollTo({top, behavior:'smooth'});
          }
        }
        return;
      }

      toast('Colaborador registrado · Pendiente de validación','check_circle');
      window.__reclCloseNew();
      // Mostrar modal de éxito con contexto de la acción realizada
      window.__reclOpenSuccess();
    };

    // ===== Modal de éxito: "Registro creado y enviado" =====
    window.__reclOpenSuccess = ()=>{
      const bg = document.getElementById('recl-success-bg');
      if(bg) bg.classList.add('open');
    };
    window.__reclCloseSuccess = ()=>{
      const bg = document.getElementById('recl-success-bg');
      if(bg) bg.classList.remove('open');
    };

    // Limpiar error al editar el campo
    window.__reclCalcEdad = function(input){
      const modal = document.getElementById('recl-modal');
      const edad = modal && modal.querySelector('input[name="edad"]');
      if(!edad) return;
      if(!input.value){ edad.value=''; return; }
      const b = new Date(input.value + 'T00:00:00');
      const now = new Date(2026, 3, 24); // "hoy" del mock = 24 abril 2026
      let age = now.getFullYear() - b.getFullYear();
      const mo = now.getMonth() - b.getMonth();
      if(mo < 0 || (mo === 0 && now.getDate() < b.getDate())) age--;
      edad.value = (age >= 0 && age < 120) ? (age + ' años') : '';
    };
    window.__reclClearErr = (input)=>{
      const f = input.closest('.recl-field');
      if(f) f.classList.remove('error');
    };

    // Selección de Origen (paso 0 del modal Nuevo colaborador)
    window.__reclPickOrigen = (input)=>{
      const modal = document.getElementById('recl-modal');
      if(!modal) return;
      // Marcar la opción elegida y limpiar las demás
      modal.querySelectorAll('.recl-origen-opt').forEach(opt=>{
        opt.classList.toggle('checked', opt.contains(input));
      });
      // Quitar estado de error en la sección
      const sec = modal.querySelector('.recl-origen-section');
      if(sec) sec.classList.remove('error');
    };

    // Mock upload de cédula
    window.__reclMockUpload = (el)=>{
      const f = el.closest('.recl-field');
      if(!f) return;
      f.dataset.uploaded = '1';
      f.classList.remove('error');
      el.querySelector('.t').textContent = 'cedula_maria_lopez.pdf';
      el.querySelector('.s').textContent = '✓ Archivo cargado · 1.2 MB';
      el.querySelector('.mi').textContent = 'check_circle';
      el.querySelector('.mi').style.color = '#1FA84A';
      el.querySelector('.mi').style.background = 'rgba(31,168,74,.1)';
      el.querySelector('.browse').textContent = 'Cambiar';
    };

    // Custom select handlers (modal de nuevo colaborador)
    window.__reclToggleSel = (id)=>{
      const el = document.getElementById(id);
      if(!el) return;
      // Cerrar otros selects abiertos
      document.querySelectorAll('.recl-select.open').forEach(s=>{ if(s!==el) s.classList.remove('open'); });
      el.classList.toggle('open');
    };
    window.__reclPickSel = (id, optEl, label)=>{
      const el = document.getElementById(id);
      if(!el) return;
      const val = optEl.dataset.val || '';
      el.dataset.value = val;
      const btn = el.querySelector('.recl-select-btn');
      btn.textContent = label;
      btn.classList.toggle('placeholder', !val);
      el.querySelectorAll('.recl-select-opt').forEach(o=>o.classList.remove('selected'));
      optEl.classList.add('selected');
      el.classList.remove('open');
    };
    document.addEventListener('click', (e)=>{
      if(!e.target.closest('.recl-select')){
        document.querySelectorAll('.recl-select.open').forEach(s=>s.classList.remove('open'));
      }
    });

    function renderModal(){
      const m = document.getElementById('recl-modal');
      const body = `
        <!-- BLOQUE 0: Origen del candidato (pre-paso, gate antes de los 3 bloques) -->
        <div class="recl-form-section recl-origen-section">
          <div class="recl-origen-h">
            <div class="recl-origen-h-l">
              <div class="recl-origen-eyebrow"><span class="mi">flag</span>Antes de empezar</div>
              <div class="recl-origen-title">¿De dónde viene este candidato?</div>
              <div class="recl-origen-sub">Selecciona la fuente por la que llegó. Define en qué campaña o canal contabilizamos su ingreso al Pool.</div>
            </div>
          </div>
          <div class="recl-origen-grid" data-field="origen">
            <label class="recl-origen-opt" data-val="Referido">
              <input type="radio" name="origen" value="Referido" onchange="window.__reclPickOrigen(this)">
              <span class="ic"><span class="mi">group</span></span>
              <span class="lbl">
                <span class="nm">Referido</span>
                <span class="det">Recomendado por un colaborador, hotel o aliado.</span>
              </span>
              <span class="chk"><span class="mi">check_circle</span></span>
            </label>
            <label class="recl-origen-opt" data-val="Aplicación directa">
              <input type="radio" name="origen" value="Aplicación directa" onchange="window.__reclPickOrigen(this)">
              <span class="ic"><span class="mi">person_search</span></span>
              <span class="lbl">
                <span class="nm">Aplicación directa</span>
                <span class="det">Se acercó por iniciativa propia (walk-in, llamada, mensaje).</span>
              </span>
              <span class="chk"><span class="mi">check_circle</span></span>
            </label>
            <label class="recl-origen-opt" data-val="Reclutamiento activo">
              <input type="radio" name="origen" value="Reclutamiento activo" onchange="window.__reclPickOrigen(this)">
              <span class="ic"><span class="mi">campaign</span></span>
              <span class="lbl">
                <span class="nm">Reclutamiento activo</span>
                <span class="det">Búsqueda dirigida por el equipo de reclutamiento.</span>
              </span>
              <span class="chk"><span class="mi">check_circle</span></span>
            </label>
            <label class="recl-origen-opt" data-val="Canales de difusión">
              <input type="radio" name="origen" value="Canales de difusión" onchange="window.__reclPickOrigen(this)">
              <span class="ic"><span class="mi">share</span></span>
              <span class="lbl">
                <span class="nm">Canales de difusión</span>
                <span class="det">Bolsas de trabajo, redes sociales, ferias, publicidad.</span>
              </span>
              <span class="chk"><span class="mi">check_circle</span></span>
            </label>
          </div>
          <div class="err-msg" style="margin-top:8px"><span class="mi">error</span><span class="txt">Selecciona el origen del candidato antes de continuar</span></div>
        </div>

        <div class="recl-origen-divider">
          <span class="recl-origen-divider-lbl">Datos del colaborador</span>
        </div>

        <!-- BLOQUE 1: Información personal -->
        <div class="recl-form-section">
          <div class="recl-form-section-title"><span class="num">1</span>Información personal</div>
          <div class="recl-form-grid">
            <div class="recl-field span2" data-field="nombre">
              <label>Nombre completo<span class="req">*</span></label>
              <div class="input-w-ic"><span class="mi">person</span><input name="nombre" placeholder="Ej. María López Hernández" oninput="window.__reclClearErr(this)"></div>
              <div class="err-msg"><span class="mi">error</span><span class="txt">Ingresa el nombre completo del colaborador</span></div>
            </div>
            <div class="recl-field span2" data-field="fechanac">
              <label>Fecha de nacimiento<span class="req">*</span></label>
              <div class="input-w-ic"><span class="mi">cake</span><input name="fechanac" type="date" max="2008-01-01" oninput="window.__reclClearErr(this);window.__reclCalcEdad(this)"></div>
              <div class="err-msg"><span class="mi">error</span><span class="txt">Selecciona la fecha de nacimiento</span></div>
            </div>
            <div class="recl-field" data-field="edad">
              <label>Edad <span style="color:var(--ink-3);font-weight:400;font-size:11px">· calculada</span></label>
              <input name="edad" type="text" placeholder="—" readonly style="background:var(--surface-2);cursor:default">
            </div>
            <div class="recl-field" data-field="genero">
              <label>Género</label>
              <div class="recl-select" id="rsel-gender" data-value="">
                <button type="button" class="recl-select-btn placeholder" onclick="event.stopPropagation();window.__reclToggleSel('rsel-gender')">Selecciona…</button>
                <div class="recl-select-pop">
                  <div class="recl-select-opt" data-val="" onclick="window.__reclPickSel('rsel-gender',this,'Selecciona…')">Selecciona…<span class="mi">check</span></div>
                  <div class="recl-select-opt" data-val="Femenino" onclick="window.__reclPickSel('rsel-gender',this,'Femenino')">Femenino<span class="mi">check</span></div>
                  <div class="recl-select-opt" data-val="Masculino" onclick="window.__reclPickSel('rsel-gender',this,'Masculino')">Masculino<span class="mi">check</span></div>
                  <div class="recl-select-opt" data-val="Otro" onclick="window.__reclPickSel('rsel-gender',this,'Otro')">Otro<span class="mi">check</span></div>
                  <div class="recl-select-opt" data-val="Prefiero no decir" onclick="window.__reclPickSel('rsel-gender',this,'Prefiero no decir')">Prefiero no decir<span class="mi">check</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- BLOQUE 2: Contacto -->
        <div class="recl-form-section">
          <div class="recl-form-section-title"><span class="num">2</span>Información de contacto</div>
          <div class="recl-form-grid">
            <div class="recl-field" data-field="telefono">
              <label>Teléfono<span class="req">*</span></label>
              <div class="input-w-ic"><span class="mi">phone</span><input name="telefono" placeholder="+52 55 1234 5678" oninput="window.__reclClearErr(this)"></div>
              <div class="err-msg"><span class="mi">error</span><span class="txt">Ingresa un teléfono válido (mín. 10 dígitos)</span></div>
            </div>
            <div class="recl-field" data-field="correo">
              <label>Correo electrónico</label>
              <div class="input-w-ic"><span class="mi">email</span><input name="correo" type="email" placeholder="nombre@correo.com" oninput="window.__reclClearErr(this)"></div>
              <div class="err-msg"><span class="mi">error</span><span class="txt">Formato de correo inválido</span></div>
            </div>
            <div class="recl-field span2" data-field="domicilio">
              <label>Domicilio<span class="req">*</span></label>
              <div class="input-w-ic"><span class="mi">home</span><input name="domicilio" placeholder="Calle, número, colonia, ciudad" oninput="window.__reclClearErr(this)"></div>
              <div class="err-msg"><span class="mi">error</span><span class="txt">Captura el domicilio completo</span></div>
            </div>
          </div>
        </div>`;

      m.innerHTML = `
        <div class="recl-modal-head">
          <div class="recl-modal-close" onclick="window.__reclCloseNew()"><span class="mi">close</span></div>
          <div class="eyebrow">Nuevo colaborador</div>
          <h2>Alta en pool de talento</h2>
          <div class="lead">Completa los datos básicos del candidato tras la entrevista inicial.</div>
        </div>
        <div class="recl-modal-body">
          ${body}
        </div>
        <div class="recl-modal-foot" style="justify-content:flex-start">
          <div class="actions">
            <button class="btn primary recl-modal-cta-sm" onclick="window.__reclSaveNew()"><span class="mi">check</span>Crear y enviar registro al colaborador</button>
          </div>
        </div>
      `;
    }

    // ---- Insertar drawer y modal en DOM si no existen ----
    if(!document.getElementById('recl-drawer')){
      const wrap = document.createElement('div');
      wrap.innerHTML = `
        <div class="recl-drawer-bg" id="recl-drawer-bg" onclick="window.__reclCloseDrawer()"></div>
        <div class="recl-drawer" id="recl-drawer"></div>
        <div class="recl-modal-bg" id="recl-modal-bg" onclick="if(event.target===this)window.__reclCloseNew()">
          <div class="recl-modal" id="recl-modal"></div>
        </div>
        <div class="recl-modal-bg recl-success-bg" id="recl-success-bg" onclick="if(event.target===this)window.__reclCloseSuccess()">
          <div class="recl-success-card">
            <div class="recl-success-ic"><span class="mi">mark_email_read</span></div>
            <h2 class="recl-success-title">Registro creado y enviado con éxito</h2>
            <p class="recl-success-lead">Se envió el acceso al colaborador por correo electrónico.</p>
            <div class="recl-success-note">
              <span class="mi">info</span>
              <span>Queda pendiente que complete su información en la app para continuar con la validación.</span>
            </div>
            <div class="recl-success-steps">
              <div class="rss-step done">
                <span class="rss-dot"><span class="mi">send</span></span>
                <div class="rss-txt"><strong>Acceso enviado</strong><span>Correo con liga al colaborador</span></div>
              </div>
              <div class="rss-step pending">
                <span class="rss-dot"><span class="mi">hourglass_top</span></span>
                <div class="rss-txt"><strong>Pendiente: completa su información</strong><span>El colaborador debe llenar su perfil en la app</span></div>
              </div>
            </div>
            <button class="btn primary recl-success-cta" onclick="window.__reclCloseSuccess()"><span class="mi">check</span>Entendido</button>
          </div>
        </div>
        <div class="entrev-drawer-bg" id="entrev-drawer-bg" onclick="window.__entrevCloseDrawer()"></div>
        <div class="entrev-drawer" id="entrev-drawer"></div>

        <!-- Modal confirmación: Enviar recordatorio -->
        <div class="entrev-rem-bg" id="entrev-rem-bg" onclick="window.__entrevCloseRemind(event)">
          <div class="entrev-rem-modal" onclick="event.stopPropagation()">
            <div class="entrev-rem-head">
              <div class="entrev-rem-icon"><span class="mi">send</span></div>
              <div class="entrev-rem-titles">
                <h3>Enviar recordatorio al candidato</h3>
                <div class="sub" id="entrev-rem-sub">—</div>
              </div>
            </div>
            <div class="entrev-rem-body">
              <p>Se notificará al candidato para que <strong>descargue la app de Oranje</strong> y complete su registro (Fase 2: datos personales y Fase 3: carga de documentos).</p>
              <div class="entrev-rem-channels">
                <div class="ch-row"><span class="mi">sms</span><strong>SMS</strong>al número registrado</div>
                <div class="ch-row"><span class="mi">chat</span><strong>WhatsApp</strong>con link directo de descarga</div>
                <div class="ch-row"><span class="mi">mail</span><strong>Email</strong>con instrucciones paso a paso</div>
              </div>
            </div>
            <div class="entrev-rem-foot">
              <button class="btn ghost" onclick="window.__entrevCloseRemind()">Cancelar</button>
              <button class="btn primary" id="entrev-rem-confirm"><span class="mi">send</span>Aceptar y enviar</button>
            </div>
          </div>
        </div>

        <!-- Modal confirmación: Rechazar candidato -->
        <div class="entrev-rej-bg" id="entrev-rej-bg" onclick="window.__entrevCloseReject(event)">
          <div class="entrev-rej-modal" onclick="event.stopPropagation()">
            <div class="entrev-rej-head">
              <div class="entrev-rej-icon"><span class="mi">cancel</span></div>
              <div class="entrev-rej-titles">
                <h3>Rechazar candidato</h3>
                <div class="sub" id="entrev-rej-sub">—</div>
              </div>
            </div>
            <div class="entrev-rej-body">
              <p class="intro">Esta acción marca al candidato como <strong>rechazado</strong> y lo retira del proceso. El motivo y la explicación quedarán registrados en su historial.</p>
              <div class="entrev-rej-field">
                <label>Motivo del rechazo<span class="req">*</span></label>
                <select class="entrev-rej-select" id="entrev-rej-motivo">
                  <option value="">Selecciona un motivo…</option>
                  <option value="docs_incompletos">Documentos incompletos o inválidos</option>
                  <option value="docs_inconsistentes">Inconsistencias entre datos y documentos</option>
                  <option value="no_cumple_perfil">No cumple con el perfil de la posición</option>
                  <option value="exp_insuficiente">Experiencia insuficiente</option>
                  <option value="dispon_horaria">Disponibilidad horaria no compatible</option>
                  <option value="zona_geografica">Zona geográfica no cubierta</option>
                  <option value="referencias_negativas">Referencias negativas</option>
                  <option value="duplicado">Candidato duplicado en el sistema</option>
                  <option value="otro">Otro motivo (especificar abajo)</option>
                </select>
              </div>
              <div class="entrev-rej-field">
                <label>Explicación / detalles<span class="req">*</span></label>
                <textarea class="entrev-rej-textarea" id="entrev-rej-detalle" placeholder="Describe con más detalle por qué se rechaza al candidato. Esta información quedará registrada en su historial y será visible para auditoría."></textarea>
                <div class="entrev-rej-helper">Mínimo 15 caracteres — sé específico para futuras referencias.</div>
              </div>
            </div>
            <div class="entrev-rej-foot">
              <button class="btn ghost" onclick="window.__entrevCloseReject()">Cancelar</button>
              <button class="btn danger" id="entrev-rej-confirm" disabled><span class="mi">cancel</span>Confirmar rechazo</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(wrap);
    }

    // Cerrar dropdowns al hacer click fuera
    document.addEventListener('click', (e)=>{
      if(state.openFilter && !e.target.closest('.recl-filter-grp')){
        state.openFilter = null;
        window.__renderRecl();
      }
    });

    // ===========================================================
    // ============== ENTREVISTAS (sub-módulo) ===================
    // ===========================================================
    const E_STATES = [
      { key:'pendApp',   color:'#FF7A00', name:'Pendientes de App',   sub:'Fase 1 hecha · esperando descarga + Fase 2' },
      { key:'pendVal',   color:'#FFC800', name:'Pendientes de Validar', sub:'Fase 2+3 completas · esperando RF-08' },
      { key:'aband',     color:'#1A1108', name:'Abandonados',         sub:'>X días sin completar la app' },
      { key:'valid',     color:'#1FA84A', name:'Validados (30 días)', sub:'Histórico reciente · ya pasaron al Pool' },
    ];
    const E_ORIGEN = ['Referido','Aplicación directa','Reclutamiento activo'];

    // Mock candidatos
    // schedV = 0..3 → variante del schedule deseado (días/horario) que el
    // candidato eligió en su app, dentro de la modalidad indicada.
    const ENTREV = [
      // Pendientes de App
      { id:'E-9821', name:'Carmen Rodríguez Vega',   doc:'DOC 9821', phone:'+52 55 1432 8810', pos:'Housekeeper', zone:'Centro',  hotel:'Hotel Costa del Sol',     mod:'Tiempo \ncompleto', origen:'Referido',             entrevista:'Hace 2 días',  fecha:'22 abr 2026', dias:2, st:'pendApp', schedV:0 },
      { id:'E-9822', name:'Luis Hernández Ortiz',    doc:'DOC 9822', phone:'+52 55 2210 4456', pos:'Hoseman',     zone:'Sur',     hotel:'Hotel Marina Sur',         mod:'Tiempo \ncompleto', origen:'Aplicación directa',   entrevista:'Hace 4 días',  fecha:'20 abr 2026', dias:4, st:'pendApp', schedV:1 },
      { id:'E-9825', name:'Diana Méndez Torres',     doc:'DOC 9825', phone:'+52 55 8821 9982', pos:'Laundry',     zone:'Este',    hotel:'Hotel Casa Verde',         mod:'Medio tiempo',     origen:'Referido',             entrevista:'Hace 1 día',   fecha:'23 abr 2026', dias:1, st:'pendApp', schedV:0 },
      { id:'E-9831', name:'Roberto Aguilar Ruiz',    doc:'DOC 9831', phone:'+52 55 3349 7782', pos:'Chef',        zone:'Noroeste',hotel:'Hotel Oranje Premier',     mod:'Por horas',         origen:'Reclutamiento activo', entrevista:'Hace 5 días',  fecha:'19 abr 2026', dias:5, st:'pendApp', schedV:0 },

      // Pendientes de Validar
      { id:'E-9810', name:'Ana Patricia Suárez',     doc:'DOC 9810', phone:'+52 55 6677 1029', pos:'Housekeeper', zone:'Centro',  hotel:'Hotel Costa del Sol',     mod:'Tiempo \ncompleto', origen:'Referido',             entrevista:'Hace 6 días',  fecha:'18 abr 2026', dias:6, st:'pendVal', schedV:0, noFlex:true },
      { id:'E-9811', name:'Javier Castro Núñez',     doc:'DOC 9811', phone:'+52 55 1109 7723', pos:'Steward',     zone:'Sur',     hotel:'Hotel Marina Sur',         mod:'Tiempo \ncompleto', origen:'Aplicación directa',   entrevista:'Hace 3 días',  fecha:'21 abr 2026', dias:3, st:'pendVal', schedV:1 },
      { id:'E-9815', name:'Patricia Morales Díaz',   doc:'DOC 9815', phone:'+52 55 9921 4471', pos:'Hoseman',     zone:'Oeste',   hotel:'Hotel Bahía Blanca',       mod:'Medio tiempo',     origen:'Reclutamiento activo', entrevista:'Hace 2 días',  fecha:'22 abr 2026', dias:2, st:'pendVal', schedV:1 },
      { id:'E-9816', name:'Daniel Vega Ortiz',       doc:'DOC 9816', phone:'+52 55 3382 4017', pos:'Mesero',      zone:'Este',    hotel:'Hotel Caribe Plaza',       mod:'Por horas',         origen:'Aplicación directa',   entrevista:'Hace 4 días',  fecha:'20 abr 2026', dias:4, st:'pendVal', schedV:0 },
      // Pendientes de Validar — "Según solicitud" (sin horario fijo, flexible a TC/MT/PH)
      { id:'E-9817', name:'Lorena Méndez Rojas',     doc:'DOC 9817', phone:'+52 55 4471 2208', pos:'Housekeeper', zone:'Centro',  hotel:'Hotel Costa del Sol',     mod:'Según \nsolicitud', origen:'Referido',             entrevista:'Hace 3 días',  fecha:'21 abr 2026', dias:3, st:'pendVal' },
      // Caso especial: Según solicitud + contrato Temporal acotado (1 mes)
      { id:'E-9818', name:'Patricio Salazar Bravo',  doc:'DOC 9818', phone:'+52 55 6628 5519', pos:'Mesero',      zone:'Sur',     hotel:'Hotel Marina Sur',         mod:'Según \nsolicitud', origen:'Reclutamiento activo',   entrevista:'Hace 5 días',  fecha:'19 abr 2026', dias:5, st:'pendVal', ssContract:'temporal', ssMonths:1, ssFrom:'27 abr 2026', ssTo:'27 may 2026' },

      // Abandonados (>7 días)
      { id:'E-9745', name:'Mario Rivera Lozano',     doc:'DOC 9745', phone:'+52 55 7711 0098', pos:'Mantenimiento', zone:'Sureste', hotel:'Hotel Costa del Sol',   mod:'Tiempo \ncompleto', origen:'Aplicación directa',   entrevista:'Hace 12 días', fecha:'12 abr 2026', dias:12, st:'aband', schedV:0 },
      { id:'E-9750', name:'Lucía Fernández Cruz',    doc:'DOC 9750', phone:'+52 55 4423 1199', pos:'Mesero',       zone:'Centro',  hotel:'Hotel Bahía Blanca',     mod:'Medio tiempo',     origen:'Referido',             entrevista:'Hace 9 días',  fecha:'15 abr 2026', dias:9,  st:'aband', schedV:0 },
      { id:'E-9755', name:'Jorge Salinas Treviño',   doc:'DOC 9755', phone:'+52 55 2208 5566', pos:'Hoseman',      zone:'Sur',     hotel:'Hotel Marina Sur',       mod:'Por horas',         origen:'Reclutamiento activo', entrevista:'Hace 10 días', fecha:'14 abr 2026', dias:10, st:'aband', schedV:1 },
      { id:'E-9762', name:'Karina López Espinoza',   doc:'DOC 9762', phone:'+52 55 7102 9943', pos:'Housekeeper',  zone:'Oeste',   hotel:'Hotel Bahía Blanca',     mod:'Tiempo \ncompleto', origen:'Aplicación directa',   entrevista:'Hace 8 días',  fecha:'16 abr 2026', dias:8,  st:'aband', schedV:1 },

      // Validados
      { id:'E-9700', name:'Sofía Ramírez Quiroga',   doc:'DOC 9700', phone:'+52 55 5512 8836', pos:'Housekeeper', zone:'Centro',  hotel:'Hotel Costa del Sol',     mod:'Tiempo \ncompleto', origen:'Referido',             entrevista:'Hace 14 días', fecha:'10 abr 2026', dias:14, st:'valid', schedV:0, noFlex:true },
      { id:'E-9702', name:'Eduardo Gutiérrez Pino',  doc:'DOC 9702', phone:'+52 55 8843 7762', pos:'Hoseman',     zone:'Sur',     hotel:'Hotel Marina Sur',         mod:'Medio tiempo',     origen:'Reclutamiento activo', entrevista:'Hace 18 días', fecha:'06 abr 2026', dias:18, st:'valid', schedV:0 },
      { id:'E-9710', name:'Andrea Villalobos León',  doc:'DOC 9710', phone:'+52 55 1102 4498', pos:'Chef',        zone:'Noroeste',hotel:'Hotel Oranje Premier',     mod:'Por horas',         origen:'Aplicación directa',   entrevista:'Hace 25 días', fecha:'30 mar 2026', dias:25, st:'valid', schedV:0 },
      { id:'E-9712', name:'Tomás Bravo Casanova',    doc:'DOC 9712', phone:'+52 55 6645 8821', pos:'Steward',     zone:'Centro',  hotel:'Hotel Vista Mar',          mod:'Tiempo \ncompleto', origen:'Referido',             entrevista:'Hace 20 días', fecha:'04 abr 2026', dias:20, st:'valid', schedV:1 },
      // Validados — "Según solicitud"
      { id:'E-9714', name:'Hugo Estrada Quintero',   doc:'DOC 9714', phone:'+52 55 4422 7708', pos:'Hoseman',     zone:'Este',    hotel:'Hotel Caribe Plaza',       mod:'Según \nsolicitud', origen:'Aplicación directa',   entrevista:'Hace 16 días', fecha:'08 abr 2026', dias:16, st:'valid' },
      // Caso especial: Según solicitud + contrato Temporal acotado (1 mes)
      { id:'E-9716', name:'Marisol Padilla Cano',    doc:'DOC 9716', phone:'+52 55 8833 2294', pos:'Mesero',      zone:'Sur',     hotel:'Hotel Marina Sur',         mod:'Según \nsolicitud', origen:'Referido',             entrevista:'Hace 22 días', fecha:'02 abr 2026', dias:22, st:'valid', ssContract:'temporal', ssMonths:1, ssFrom:'15 may 2026', ssTo:'15 jun 2026' },
    ];

    // Modo supervisión del Líder (RF-23): cada entrevista tiene una RECLUTADORA RESPONSABLE.
    // "Tú (Líder)" = entrevistas que el propio Líder hizo (modo operativo); el resto, su grupo.
    const E_RECS = ['Tú (Líder)','Ana López','Beatriz Cruz','Carlos Mena','Diana Ríos','Fátima Soto'];
    ENTREV.forEach((c,i)=>{ if(!c.reclutadora) c.reclutadora = E_RECS[i % E_RECS.length]; });

    // Devuelve el schedule deseado del candidato — los días/horario que él
    // mismo seleccionó en la app, dentro de la modalidad indicada. Hay 2
    // variantes por modalidad para que distintos candidatos tengan distintos
    // schedules realistas.
    const E_DAY_LBLS = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
    function entrevSched(c){
      // "Según solicitud" — candidatos sin horario fijo deseado, abiertos a
      // cualquier modalidad (TC/MT/PH). No tienen schedule que mostrar.
      if(c.mod === 'Según \nsolicitud') return null;
      const v = c.schedV || 0;
      const isTC = c.mod === 'Tiempo \ncompleto';
      const isMT = c.mod === 'Medio tiempo';
      const isPH = c.mod === 'Por horas';
      // Cada variante: { hours, start, end, conLbl, daysOn (array de índices 0..6) }
      const profiles = {
        TC0: { modLbl:'Tiempo completo', hours:8, start:'09:00', end:'17:00', conLbl:'Fijo recurrente', daysOn:[0,1,2,3,4] },
        TC1: { modLbl:'Tiempo completo', hours:8, start:'07:00', end:'15:00', conLbl:'Fijo recurrente', daysOn:[1,2,3,4,5] },
        MT0: { modLbl:'Medio tiempo',    hours:5, start:'14:00', end:'19:00', conLbl:'Fijo recurrente', daysOn:[0,2,4] },
        MT1: { modLbl:'Medio tiempo',    hours:4, start:'08:00', end:'12:00', conLbl:'Fijo recurrente', daysOn:[1,3,5] },
        PH0: { modLbl:'Por horas',       hours:6, start:'18:00', end:'00:00', conLbl:'Por bloques',     daysOn:[4,5,6] },
        PH1: { modLbl:'Por horas',       hours:4, start:'10:00', end:'14:00', conLbl:'Por bloques',     daysOn:[5,6] },
      };
      const key = (isTC?'TC':isMT?'MT':'PH') + (v % 2);
      return profiles[key];
    }

    function eFilter(){
      // Reference "today" anchored to mock data: 24 abril 2026
      const ref = new Date(2026, 3, 24); // mes 0-index → abril
      const fromD = state.eFilterFromISO ? new Date(state.eFilterFromISO+'T00:00:00') : null;
      const toD   = state.eFilterToISO   ? new Date(state.eFilterToISO+'T23:59:59')   : null;
      return ENTREV.filter(c=>{
        const eMode = state.eMode || 'mias';
        if(eMode==='mias' && c.reclutadora !== 'Tú (Líder)') return false;
        if(eMode==='grupo' && state.eFilterRec && c.reclutadora !== state.eFilterRec) return false;
        if(state.eFilterPos && c.pos!==state.eFilterPos) return false;
        if(state.eFilterZone && c.zone!==state.eFilterZone) return false;
        if(state.eFilterMod && c.mod!==state.eFilterMod) return false;
        if(state.eFilterOrigen && c.origen!==state.eFilterOrigen) return false;
        if(state.eFilterEstado && c.st!==state.eFilterEstado) return false;
        if(fromD || toD){
          const d = new Date(ref); d.setDate(d.getDate() - c.dias);
          if(fromD && d < fromD) return false;
          if(toD && d > toD) return false;
        }
        if(state.eFilterDays==='1-3' && !(c.dias>=1 && c.dias<=3)) return false;
        if(state.eFilterDays==='4-7' && !(c.dias>=4 && c.dias<=7)) return false;
        if(state.eFilterDays==='>7'  && !(c.dias>7)) return false;
        if(state.eQuery){
          const q = state.eQuery.toLowerCase();
          if(!(c.name.toLowerCase().includes(q) || c.doc.toLowerCase().includes(q) || c.phone.includes(q))) return false;
        }
        return true;
      });
    }
    window.__entrevList = eFilter;
    window.__entrevSetMode = m => { state.eMode = m; if(m!=='grupo') state.eFilterRec=''; window.__renderRecl && window.__renderRecl(); };
    window.__entrevSetRec = v => { state.eFilterRec = (state.eFilterRec===v?'':v); window.__renderRecl && window.__renderRecl(); };

    function eFilterChip(grp,label,active,opts){
      const open = state.openFilter===grp;
      const items = opts.map(o=>{
        const isAct = active===o;
        return `<div class="recl-fdd-item ${isAct?'active':''}" onclick="window.__entrevPickFilter('${grp}','${o.replace(/'/g,"\\'")}')"><span>${o}</span><span class="mi">check</span></div>`;
      }).join('');
      return `
        <div class="recl-filter-grp ${open?'open':''} ${active?'active':''}" onclick="event.stopPropagation();window.__reclToggleDD('${grp}')">
          <span class="lbl-grp">${label}</span>
          <span class="val">${active||'Todas'}</span>
          <span class="mi">expand_more</span>
          <div class="recl-fdd" onclick="event.stopPropagation()">
            <div class="recl-fdd-item all ${!active?'active':''}" onclick="window.__entrevPickFilter('${grp}','')"><span>Todas</span></div>
            ${items}
          </div>
        </div>
      `;
    }

    window.__entrevPickFilter = (grp,val)=>{
      state[grp] = val;
      state.openFilter = null;
      window.__renderRecl();
    };
    window.__entrevSetDays = v => {
      state.eFilterDays = v;
      window.__renderRecl();
    };
    window.__entrevSetDate = (which, val)=>{
      if(which==='from') state.eFilterFromISO = val || '';
      else state.eFilterToISO = val || '';
    };
    window.__entrevDateApply = ()=>{
      state.openFilter = null;
      window.__renderRecl();
    };
    window.__entrevDateClear = ()=>{
      state.eFilterFromISO = '';
      state.eFilterToISO = '';
      state.openFilter = null;
      window.__renderRecl();
    };
    window.__entrevClear = ()=>{
      state.eFilterPos = state.eFilterZone = state.eFilterMod = state.eFilterDays = state.eFilterOrigen = state.eFilterEstado = state.eFilterFromISO = state.eFilterToISO = '';
      state.eQuery='';
      window.__renderRecl();
    };

    // HERO Entrevistas — 4 stats
    window.__entrevHero = ()=>{
      const total = ENTREV.length;
      const pendApp = ENTREV.filter(c=>c.st==='pendApp').length;
      const pendVal = ENTREV.filter(c=>c.st==='pendVal').length;
      const aband = ENTREV.filter(c=>c.st==='aband').length;
      return `
        <div class="recl-hero">
          <div class="recl-hero-left" style="height:160px">
            <div class="eyebrow"><span class="pulse"></span>Entrevistas · seguimiento de todas las fases → Pool</div>
            <h1>Sigue de cerca a los <span class="accent">candidatos en cola</span> a unirse al Pool.</h1>
            <div class="lead">Mira quiénes ya pasaron entrevista pero aún no completan la app, valida los que están listos y detecta abandonos a tiempo.</div>
          </div>
          <div class="recl-hero-right" style="height:160px">
            <div class="recl-stat" style="cursor:pointer">
              <div class="rs-top">
                <div class="rs-ic" style="background:rgba(255,142,0,.12);color:var(--o-600)"><span class="mi">how_to_reg</span></div>
                <span class="rs-trend up"><span class="mi">arrow_upward</span>+3</span>
              </div>
              <div class="rs-val">${total}</div>
              <div class="rs-lbl">Candidatos en seguimiento</div>
            </div>
            <div class="recl-stat" style="cursor:pointer">
              <div class="rs-top">
                <div class="rs-ic" style="background:rgba(255,122,0,.12);color:#FF7A00"><span class="mi">phonelink_setup</span></div>
                <span class="rs-trend warn"><span class="mi">schedule</span>hoy</span>
              </div>
              <div class="rs-val">${pendApp}</div>
              <div class="rs-lbl">Pendientes de App</div>
            </div>
            <div class="recl-stat" style="cursor:pointer">
              <div class="rs-top">
                <div class="rs-ic" style="background:rgba(255,200,0,.18);color:#A66B00"><span class="mi">verified_user</span></div>
                <span class="rs-trend up"><span class="mi">arrow_upward</span>+1</span>
              </div>
              <div class="rs-val">${pendVal}</div>
              <div class="rs-lbl">Pendientes de validar</div>
            </div>
            <div class="recl-stat" style="cursor:pointer">
              <div class="rs-top">
                <div class="rs-ic" style="background:rgba(26,17,8,.10);color:#1A1108"><span class="mi">person_off</span></div>
                <span class="rs-trend down"><span class="mi">warning</span>${aband}</span>
              </div>
              <div class="rs-val">${aband}</div>
              <div class="rs-lbl">Abandonados (>7 días)</div>
            </div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;margin:14px 0 0;flex-wrap:wrap">
          <span class="lg-seg ${(state.eMode||'mias')==='mias'?'on':''}" onclick="window.__entrevSetMode('mias')" style="cursor:pointer"><span class="mi" style="font-size:16px;vertical-align:-3px">person</span> Mis Entrevistas</span>
          <span class="lg-seg ${(state.eMode||'mias')==='grupo'?'on':''}" onclick="window.__entrevSetMode('grupo')" style="cursor:pointer"><span class="mi" style="font-size:16px;vertical-align:-3px">groups</span> Historial del Grupo</span>
          ${(state.eMode||'mias')==='grupo' ? `<span style="font-size:12px;color:var(--ink-3);margin-left:4px">Filtrar por reclutadora:</span>`+['Ana López','Beatriz Cruz','Carlos Mena','Diana Ríos','Fátima Soto'].map(r=>`<span class="lg-chip ${state.eFilterRec===r?'g':'n'}" style="cursor:pointer" onclick="window.__entrevSetRec('${r}')">${r}</span>`).join('') : ''}
        </div>
      `;
    };

    // RENDER body Entrevistas
    window.__entrevRender = ()=>{
      const filtered = eFilter();
      const POSICIONES_E = ['Housekeeper','Hoseman','Chef','Laundry','Steward','Mesero','Mantenimiento'];
      const ZONAS_E = ['Centro','Sur','Este','Oeste','Noroeste','Sureste'];
      const MODS_E = ['Tiempo \ncompleto','Medio tiempo','Por horas','Según \nsolicitud'];
      const nClear = (state.eFilterPos?1:0)+(state.eFilterZone?1:0)+(state.eFilterMod?1:0)+(state.eFilterDays?1:0)+(state.eFilterOrigen?1:0)+(state.eFilterEstado?1:0)+((state.eFilterFromISO||state.eFilterToISO)?1:0)+(state.eQuery?1:0);

      // Custom Estado chip con bolitas de color
      const estadoActive = E_STATES.find(s=>s.key===state.eFilterEstado);
      const estadoChip = (()=>{
        const open = state.openFilter==='eFilterEstado';
        const items = E_STATES.map(s=>{
          const isAct = state.eFilterEstado===s.key;
          return `<div class="recl-fdd-item ${isAct?'active':''}" onclick="window.__entrevPickFilter('eFilterEstado','${s.key}')">
            <span class="recl-fdd-dot" style="background:${s.color}"></span>
            <span class="recl-fdd-lbl">${s.name}<small>${s.sub}</small></span>
            <span class="mi">check</span>
          </div>`;
        }).join('');
        return `
          <div class="recl-filter-grp ${open?'open':''} ${estadoActive?'active':''}" onclick="event.stopPropagation();window.__reclToggleDD('eFilterEstado')">
            <span class="lbl-grp">Estado</span>
            <span class="val">${estadoActive ? `<span style="display:inline-flex;align-items:center;gap:5px"><span style="width:7px;height:7px;border-radius:50%;background:${estadoActive.color};display:inline-block"></span>${estadoActive.name}</span>` : 'Todos'}</span>
            <span class="mi">expand_more</span>
            <div class="recl-fdd recl-fdd-status" onclick="event.stopPropagation()">
              <div class="recl-fdd-item all ${!state.eFilterEstado?'active':''}" onclick="window.__entrevPickFilter('eFilterEstado','')"><span>Todos</span></div>
              ${items}
            </div>
          </div>
        `;
      })();

      const toolbar = `
        <!-- TOOLBAR: search + Nuevo colaborador (igual layout que Pool) -->
        <div class="recl-toolbar">
          <div class="recl-search">
            <span class="mi">search</span>
            <input type="text" id="entrev-search-input" placeholder="Buscar por nombre, documento o teléfono…" value="${esc(state.eQuery)}">
            <span class="kbd">⌘F</span>
          </div>
          <div class="recl-toolbar-divider"></div>
          <button class="btn primary" onclick="window.__reclOpenNew()"><span class="mi">person_add</span>Nuevo colaborador</button>
        </div>
        <div class="recl-filters entrev-filters" style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:0 0 16px">
          <div class="recl-filters-left" style="display:contents">
            ${eFilterChip('eFilterPos','Posición', state.eFilterPos, POSICIONES_E)}
            ${eFilterChip('eFilterZone','Zona', state.eFilterZone, ZONAS_E)}
            ${eFilterChip('eFilterMod','Modalidad', state.eFilterMod, MODS_E)}
            ${eFilterChip('eFilterOrigen','Origen', state.eFilterOrigen, E_ORIGEN)}
            ${(()=>{
              const open = state.openFilter==='eFilterDate';
              const fmt = (iso)=>{
                if(!iso) return '';
                const d = new Date(iso+'T00:00:00');
                return d.toLocaleDateString('es-MX',{day:'2-digit',month:'short'});
              };
              const active = state.eFilterFromISO || state.eFilterToISO;
              const lbl = active
                ? (state.eFilterFromISO && state.eFilterToISO
                    ? `${fmt(state.eFilterFromISO)} – ${fmt(state.eFilterToISO)}`
                    : state.eFilterFromISO
                      ? `Desde ${fmt(state.eFilterFromISO)}`
                      : `Hasta ${fmt(state.eFilterToISO)}`)
                : 'Cualquier fecha';
              return `
                <div class="recl-filter-grp ${open?'open':''} ${active?'active':''}" onclick="event.stopPropagation();window.__reclToggleDD('eFilterDate')">
                  <span class="lbl-grp"><span class="mi" style="font-size:14px;vertical-align:-2px">event</span> Fecha entrevista</span>
                  <span class="val">${lbl}</span>
                  <span class="mi">expand_more</span>
                  <div class="recl-fdd fdd-daterange" onclick="event.stopPropagation()">
                    <div class="dr-row">
                      <div class="dr-lbl">Desde</div>
                      <input type="date" id="entrev-date-from" value="${esc(state.eFilterFromISO)}" max="${esc(state.eFilterToISO||'')}" onchange="window.__entrevSetDate('from',this.value)">
                    </div>
                    <div class="dr-row">
                      <div class="dr-lbl">Hasta</div>
                      <input type="date" id="entrev-date-to" value="${esc(state.eFilterToISO)}" min="${esc(state.eFilterFromISO||'')}" onchange="window.__entrevSetDate('to',this.value)">
                    </div>
                    <div class="dr-actions">
                      <button class="btn-mini" onclick="window.__entrevDateClear()">Limpiar</button>
                      <button class="btn-mini primary" onclick="window.__entrevDateApply()">Aplicar</button>
                    </div>
                  </div>
                </div>
              `;
            })()}
            ${estadoChip}
            ${(()=>{
              const dayOpts = [
                {key:'',     label:'Todos'},
                {key:'1-3',  label:'1 a 3 días'},
                {key:'4-7',  label:'4 a 7 días'},
                {key:'>7',   label:'Más de 7 días', warn:true},
              ];
              const open = state.openFilter==='eFilterDays';
              const active = dayOpts.find(o=>o.key===state.eFilterDays && o.key!=='');
              const items = dayOpts.slice(1).map(o=>{
                const isAct = state.eFilterDays===o.key;
                return `<div class="recl-fdd-item ${isAct?'active':''}" onclick="window.__entrevPickFilter('eFilterDays','${o.key}')">
                  ${o.warn?'<span class="recl-fdd-dot" style="background:#E11919"></span>':''}
                  <span>${o.label}</span><span class="mi">check</span>
                </div>`;
              }).join('');
              return `
                <div class="recl-filter-grp ${open?'open':''} ${active?'active':''}" onclick="event.stopPropagation();window.__reclToggleDD('eFilterDays')">
                  <span class="lbl-grp">Días en estado</span>
                  <span class="val">${active ? (active.warn?`<span style="display:inline-flex;align-items:center;gap:5px"><span style="width:7px;height:7px;border-radius:50%;background:#E11919;display:inline-block"></span>${active.label}</span>`:active.label) : 'Todos'}</span>
                  <span class="mi">expand_more</span>
                  <div class="recl-fdd" onclick="event.stopPropagation()">
                    <div class="recl-fdd-item all ${!state.eFilterDays?'active':''}" onclick="window.__entrevPickFilter('eFilterDays','')"><span>Todos</span></div>
                    ${items}
                  </div>
                </div>
              `;
            })()}
            ${nClear>0 ? `<span class="recl-filter-clear" onclick="window.__entrevClear()" title="Limpiar todos los filtros"><span class="mi" style="font-size:15px">filter_alt_off</span> Limpiar todo <span class="badge-n">${nClear}</span></span>` : ''}
          </div>
        </div>

        <div class="recl-board-title">
          <h2>
            <span class="recl-board-ic"><span class="mi">how_to_reg</span></span>
            <span>Entrevistas en seguimiento</span>
            <span class="recl-board-sub">${filtered.length} candidatos · ${E_STATES.length} estados</span>
          </h2>
          <div class="recl-segmented recl-segmented-inline" style="flex-shrink:0">
            <button class="${state.eView==='board'?'active':''}" onclick="window.__entrevSetView('board')"><span class="mi">view_kanban</span>Tablero</button>
            <button class="${state.eView==='list'?'active':''}" onclick="window.__entrevSetView('list')"><span class="mi">grid_view</span>Tarjetas</button>
            <button class="${state.eView==='table'?'active':''}" onclick="window.__entrevSetView('table')"><span class="mi">table_rows</span>Tabla</button>
          </div>
        </div>
      `;

      // Render según vista
      let bodyHtml;
      if(state.eView==='list'){
        bodyHtml = renderEntrevList(filtered);
      } else if(state.eView==='table'){
        bodyHtml = renderEntrevTable(filtered);
      } else {
        const cols = E_STATES.map(st=>{
          const list = filtered.filter(c=>c.st===st.key);
          const cards = list.length === 0
            ? `<div class="entrev-empty" style="padding:24px 12px;font-size:12px">Sin candidatos</div>`
            : list.map(c=>renderEntrevCard(c)).join('');
          const count = String(list.length).padStart(2,'0');
          return `
            <div class="recl-col">
              <div class="recl-col-head">
                <span class="recl-col-dot" style="background:${st.color}"></span>
                <div class="recl-col-name">${st.name}<span class="sub-st">${st.sub}</span></div>
                <span class="recl-col-count">${count}</span>
              </div>
              ${cards}
            </div>
          `;
        }).join('');
        bodyHtml = `<div class="recl-board entrev-board">${cols}</div>`;
      }

      return toolbar + bodyHtml;
    };

    window.__entrevSetView = v => {
      state.eView = v;
      window.__renderRecl();
    };

    function renderEntrevList(list){
      if(list.length===0) return `<div class="entrev-empty" style="padding:60px 30px">Sin candidatos para los filtros aplicados</div>`;
      // Grid de tarjetas (3 cols), agrupadas por estado con encabezado
      const groups = E_STATES.map(st=>{
        const arr = list.filter(c=>c.st===st.key);
        if(arr.length===0) return '';
        return `
          <div style="margin-bottom:18px">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
              <span class="recl-col-dot" style="background:${st.color};width:10px;height:10px;border-radius:50%;display:inline-block"></span>
              <span style="font-size:13.5px;font-weight:700;color:rgb(83,59,23)">${st.name}</span>
              <span style="font-size:11.5px;color:var(--ink-3);font-weight:500">· ${st.sub}</span>
              <span style="margin-left:auto;font-size:11.5px;font-weight:700;color:var(--ink-2)">${arr.length}</span>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:10px">
              ${arr.map(c=>renderEntrevCard(c)).join('')}
            </div>
          </div>
        `;
      }).join('');
      return groups;
    }

    function renderEntrevTable(list){
      if(list.length===0) return `<div class="entrev-empty" style="padding:60px 30px">Sin candidatos para los filtros aplicados</div>`;
      const rows = list.map(c=>{
        const st = E_STATES.find(s=>s.key===c.st);
        const initials = c.name.split(' ').slice(0,2).map(x=>x[0]).join('').toUpperCase();
        const daysAlert = c.dias>7;
        return `
          <tr onclick="window.__entrevSelect('${c.id}')">
            <td class="col-id">${c.id}</td>
            <td>
              <div style="display:flex;align-items:center;gap:10px">
                <div class="recl-avatar gradC" style="width:32px;height:32px;font-size:11px">${initials}</div>
                <div>
                  <div style="font-weight:700;color:rgb(83,59,23);font-size:13px">${c.name}</div>
                  <div style="font-size:11px;color:var(--ink-3)">${c.doc} · ${c.phone}</div>
                </div>
              </div>
            </td>
            <td>${c.pos}</td>
            <td>${c.zone}</td>
            <td>${c.mod}</td>
            <td>${c.origen}</td>
            <td>
              <span style="display:inline-flex;align-items:center;gap:5px;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:700;background:${st.color}1A;color:${st.color}">
                <span style="width:7px;height:7px;border-radius:50%;background:${st.color};display:inline-block"></span>${st.name}
              </span>
            </td>
            <td>
              <span class="entrev-days ${daysAlert?'alert':''}" style="font-size:11.5px"><span class="mi">${daysAlert?'warning':'event'}</span>${c.dias}d</span>
            </td>
            <td>${c.fecha}</td>
          </tr>
        `;
      }).join('');
      return `
        <div class="req-table-wrap">
          <table class="req-table">
            <thead>
              <tr>
                <th class="col-id">ID</th>
                <th>Candidato</th>
                <th>Posición</th>
                <th>Zona</th>
                <th>Modalidad</th>
                <th>Origen</th>
                <th>Estado</th>
                <th>Días</th>
                <th>Entrevista</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      `;
    }

    function renderEntrevCard(c){
      const st = E_STATES.find(s=>s.key===c.st);
      const initials = c.name.split(' ').slice(0,2).map(x=>x[0]).join('').toUpperCase();
      const daysAlert = c.dias > 7;
      const ctaLabel = c.st==='pendApp' ? 'Enviar recordatorio'
                    : c.st==='pendVal' ? 'Validar'
                    : c.st==='aband'   ? 'Reactivar'
                    : 'Ver historial';
      const ctaIcon  = c.st==='pendApp' ? 'send'
                    : c.st==='pendVal' ? 'verified'
                    : c.st==='aband'   ? 'restart_alt'
                    : 'history';
      const ctaAction = c.st==='pendApp' ? 'remind'
                    : c.st==='pendVal' ? 'validate'
                    : c.st==='aband'   ? 'reactivate'
                    : 'view';
      return `
        <div class="recl-card" style="--card-st:${st.color}" onclick="window.__entrevSelect('${c.id}')">
          <div class="recl-card-top">
            <div class="recl-avatar gradC">
              ${initials}
              <span class="recl-st-ring"></span>
            </div>
            <div class="nm">
              <div class="name">${c.name}</div>
              <div class="doc">ID ${c.id}${(state.eMode==='grupo') ? ` · <span style="color:var(--o-700);font-weight:600">${c.reclutadora}</span>` : ''}</div>
            </div>
          </div>
          <div class="recl-card-meta">
            <span class="meta-pill pos"><span class="mi">work_outline</span>${c.pos}</span>
            <span class="meta-pill zone"><span class="mi">place</span>${c.zone}</span>
            ${c.st==='pendApp'
              ? `<span class="meta-pill origen ${c.origen==='Referido'?'og-ref':c.origen==='Aplicación directa'?'og-dir':c.origen==='Reclutamiento activo'?'og-rec':'og-dif'}"><span class="mi">${c.origen==='Referido'?'group':c.origen==='Aplicación directa'?'person_search':c.origen==='Reclutamiento activo'?'campaign':'share'}</span>${c.origen}</span>`
              : (()=>{ const _mp = modPillInfo(c.mod); return `<span class="meta-pill modw" data-m="${_mp.k}"><span class="mi">schedule</span>${_mp.lbl}</span>`; })()
            }
          </div>
          ${c.st==='pendApp' ? '' : `<div class="entrev-card-meta" style="margin-top:6px">
            <span class="entrev-tag ${c.origen==='Referido'?'ok':c.origen==='Aplicación directa'?'origen-app':'origen-rec'}"><span class="mi">${c.origen==='Referido'?'group':c.origen==='Aplicación directa'?'person':'campaign'}</span>${c.origen}</span>
            ${c.ssContract==='temporal' ? `<span class="entrev-tag ctr-temp" title="Solo contrato temporal"><span class="mi">assignment</span>Temporal${c.ssMonths?` · ${c.ssMonths} mes${c.ssMonths===1?'':'es'}`:''}</span>` : ''}
          </div>`}
          <div class="entrev-card-foot">
            ${c.st==='valid'
              ? `<span class="entrev-days valid-ok"><span class="mi">verified</span>En Pool</span>`
              : `<span class="entrev-days ${daysAlert?'alert':''}"><span class="mi">${daysAlert?'warning':'event'}</span>${c.dias} día${c.dias===1?'':'s'} en estado</span>`
            }
            <span class="entrev-cta" ${c.st==='pendApp' ? `onclick="event.stopPropagation();window.__entrevAskRemind('${c.id}')" style="cursor:pointer"` : ''}><span class="mi">${ctaIcon}</span>${ctaLabel}</span>
          </div>
        </div>
      `;
    }

    window.__entrevBindSearch = ()=>{
      const inp = document.getElementById('entrev-search-input');
      if(inp){
        inp.addEventListener('input', e=>{
          state.eQuery = e.target.value;
          window.__renderRecl();
          setTimeout(()=>document.getElementById('entrev-search-input')?.focus(),0);
        });
      }
    };

    window.__entrevValidateAll = ()=>{
      if(typeof showToast==='function'){
        showToast(`✓ Abriendo lote de validación`, {icon:'verified'});
      }
    };

    // ===== Drawer detalle candidato =====
    window.__entrevSelect = id => {
      const c = ENTREV.find(x=>x.id===id);
      if(!c) return;
      state.eSelected = id;
      renderEntrevDrawer(c);
      document.getElementById('entrev-drawer-bg').classList.add('open');
      document.getElementById('entrev-drawer').classList.add('open');
    };
    window.__entrevCloseDrawer = ()=>{
      state.eSelected = null;
      document.getElementById('entrev-drawer-bg').classList.remove('open');
      document.getElementById('entrev-drawer').classList.remove('open');
    };

    // -------- Modal confirmación: Enviar recordatorio --------
    // Abre un modal informativo que explica al reclutador qué se enviará
    // y por qué canales. Al confirmar, dispara la acción 'remind' real.
    window.__entrevAskRemind = (id)=>{
      const c = ENTREV.find(x=>x.id===id);
      if(!c) return;
      const sub = document.getElementById('entrev-rem-sub');
      const btn = document.getElementById('entrev-rem-confirm');
      if(sub) sub.textContent = `${c.name} · ${c.id}`;
      if(btn){
        btn.onclick = ()=>{
          window.__entrevCloseRemind();
          window.__entrevAct('remind', id);
        };
      }
      document.getElementById('entrev-rem-bg')?.classList.add('open');
    };
    window.__entrevCloseRemind = (e)=>{
      // Solo cerrar si el click vino del fondo (no del modal interior)
      if(e && e.target && e.currentTarget && e.target !== e.currentTarget) return;
      document.getElementById('entrev-rem-bg')?.classList.remove('open');
    };

    // -------- Modal "Rechazar candidato" --------
    // Modal con dropdown de motivo + textarea para explicación libre.
    // El botón "Confirmar rechazo" permanece deshabilitado hasta que ambos
    // campos estén llenos (motivo seleccionado + ≥15 caracteres).
    window.__entrevAskReject = (id)=>{
      const c = ENTREV.find(x=>x.id===id);
      if(!c) return;
      const sub = document.getElementById('entrev-rej-sub');
      const motivo = document.getElementById('entrev-rej-motivo');
      const det = document.getElementById('entrev-rej-detalle');
      const btn = document.getElementById('entrev-rej-confirm');
      if(sub) sub.textContent = `${c.name} · ${c.id}`;
      if(motivo) motivo.value = '';
      if(det) det.value = '';
      if(btn) btn.disabled = true;
      const check = ()=>{
        if(!btn) return;
        const ok = (motivo?.value || '') && ((det?.value || '').trim().length >= 15);
        btn.disabled = !ok;
      };
      if(motivo) motivo.onchange = check;
      if(det) det.oninput = check;
      if(btn){
        btn.onclick = ()=>{
          if(btn.disabled) return;
          window.__entrevCloseReject();
          window.__entrevAct('reject', id);
        };
      }
      document.getElementById('entrev-rej-bg')?.classList.add('open');
    };
    window.__entrevCloseReject = (e)=>{
      if(e && e.target && e.currentTarget && e.target !== e.currentTarget) return;
      document.getElementById('entrev-rej-bg')?.classList.remove('open');
    };

    // Editar datos del candidato — reabre el mismo modal de "Nuevo
    // colaborador" en modo edición, con los campos prellenados a partir
    // de los datos capturados durante la alta.
    window.__entrevEditCandidato = (id)=>{
      const c = ENTREV.find(x=>x.id===id);
      if(!c) return;
      const core = (typeof CORE_BY_ID !== 'undefined' && CORE_BY_ID[id]) || {};
      // Abrir el modal normal
      window.__reclOpenNew();
      // Esperar a que renderice y luego mutar a modo edición + prefill
      requestAnimationFrame(()=>{
        const modal = document.getElementById('recl-modal');
        if(!modal) return;
        const eyebrow = modal.querySelector('.recl-modal-head .eyebrow');
        const h2 = modal.querySelector('.recl-modal-head h2');
        const lead = modal.querySelector('.recl-modal-head .lead');
        const cta = modal.querySelector('.recl-modal-cta-sm');
        if(eyebrow) eyebrow.textContent = 'Editar candidato';
        if(h2) h2.textContent = `Actualizar datos · ${c.name}`;
        if(lead) lead.textContent = 'Modifica los datos capturados durante la alta del candidato.';
        if(cta) cta.innerHTML = '<span class="mi">check</span>Guardar cambios';
        // Prefill campos
        const setInput = (name, val)=>{
          const el = modal.querySelector(`input[name="${name}"], textarea[name="${name}"]`);
          if(el && val!=null) el.value = val;
        };
        // Nombre completo (probable name="nombre")
        setInput('nombre', c.name);
        setInput('documento', core.ssn || c.doc);
        setInput('edad', core.edad || '');
        setInput('telefono', c.phone);
        setInput('correo', core.correo || '');
        setInput('domicilio', core.domicilio || '');
        // Género (custom select)
        if(core.genero){
          const gSel = modal.querySelector('#rsel-gender');
          if(gSel){
            gSel.setAttribute('data-value', core.genero);
            const btn = gSel.querySelector('.recl-select-btn');
            if(btn){ btn.textContent = core.genero; btn.classList.remove('placeholder'); }
          }
        }
      });
    };

    // Toggle del card de "Disponibilidad horaria deseada" en el drawer
    window.__entrevToggleSched = (headerEl)=>{
      const card = headerEl.closest('.entrev-sched-card');
      if(card) card.classList.toggle('open');
    };

    function renderEntrevSchedSection(c){
      // Candidatos "Según solicitud" — sin schedule fijo, abiertos a cualquier
      // modalidad y contrato. Se renderiza un bloque informativo en vez del
      // calendario semanal.
      if(c.mod === 'Según \nsolicitud'){
        const isTempLimited = c.ssContract === 'temporal';
        const monthsLbl = c.ssMonths ? `${c.ssMonths} mes${c.ssMonths===1?'':'es'}` : '';
        return `<div class="entrev-section">
          <div class="entrev-section-h">
            <span class="ic" data-mod="ss"><span class="mi">event_available</span></span>
            <h4>Disponibilidad horaria</h4>
            <span class="entrev-sched-flex-pill opensched"><span class="mi">all_inclusive</span>Según solicitud</span>
          </div>
          <div class="entrev-ss-card">
          <div class="entrev-sched-flex-note opensched">
            <span class="mi">info</span>
            <div>Este colaborador <strong>no eligió un horario fijo deseado</strong>. Indicó estar <strong>abierto a cualquier modalidad de tiempo y contrato</strong> que ofrezca el hotel — la asignación se define <strong>según solicitud</strong> de la operación.</div>
          </div>
          ${isTempLimited ? `<div class="entrev-ss-alert">
            <span class="mi">schedule</span>
            <div>
              <strong>Restricción de contrato:</strong> aunque está abierto a cualquier modalidad,
              el candidato indicó que <strong>solo puede trabajar bajo contrato Temporal</strong>
              por un máximo de <strong>${monthsLbl}</strong>. Considerar para asignaciones cortas o coberturas puntuales.
            </div>
          </div>` : ''}
          <div class="entrev-ss-grid">
            <div class="entrev-ss-chip" data-mod="tc">
              <div class="ic"><span class="mi">schedule</span></div>
              <div>
                <div class="lbl">Tiempo completo</div>
                <div class="sub">8h / día</div>
              </div>
            </div>
            <div class="entrev-ss-chip" data-mod="mt">
              <div class="ic"><span class="mi">schedule</span></div>
              <div>
                <div class="lbl">Medio tiempo</div>
                <div class="sub" style="text-align: left">4–5h / día y noche</div>
              </div>
            </div>
            <div class="entrev-ss-chip" data-mod="ph">
              <div class="ic"><span class="mi">schedule</span></div>
              <div>
                <div class="lbl">Por horas</div>
                <div class="sub">Bloques</div>
              </div>
            </div>
          </div>
          <div style="margin-top:12px">
            <div class="entrev-ss-row">
              <div class="k">Días</div>
              <div class="v">Cualquier día de la semana</div>
            </div>
            <div class="entrev-ss-row">
              <div class="k">Contrato</div>
              <div class="entrev-ss-pills">
                ${isTempLimited
                  ? `<span class="pill" data-ck="temp"><span class="mi">assignment</span>Temporal · ${monthsLbl}</span>
                     <span class="pill pill-off" data-ck="fijo-off" title="No disponible para contrato Fijo"><span class="mi">block</span>Fijo · no aplica</span>`
                  : `<span class="pill" data-ck="fijo"><span class="mi">assignment_ind</span>Fijo</span>
                     <span class="pill" data-ck="temp"><span class="mi">assignment</span>Temporal</span>`}
              </div>
            </div>
            ${isTempLimited && c.ssFrom && c.ssTo ? `<div class="entrev-ss-row">
              <div class="k">Ventana</div>
              <div class="entrev-ss-range">
                <span class="entrev-ss-range-pill"><span class="mi">event</span>${c.ssFrom}</span>
                <span class="entrev-ss-range-arr"><span class="mi">arrow_forward</span></span>
                <span class="entrev-ss-range-pill"><span class="mi">event_available</span>${c.ssTo}</span>
              </div>
            </div>` : ''}
            <div class="entrev-ss-row">
              <div class="k">Turno</div>
              <div class="v">Sin preferencia · matutino, vespertino o nocturno</div>
            </div>
          </div>
          <div class="entrev-sched-note" style="margin-top:10px">
            <span class="mi">info</span>
            <div>${isTempLimited
              ? `Útil para <strong>coberturas temporales</strong> (vacaciones, incapacidades, eventos) donde la modalidad de tiempo importa menos que la duración del contrato.`
              : `Útil para <strong>cubrir vacantes con schedules variados</strong> o requisiciones que aún no tienen modalidad definida. Confirmar disponibilidad concreta con el candidato antes de asignar.`}</div>
          </div>
          </div>
        </div>`;
      }
      const s = entrevSched(c);
      if(!s) return '';
      const daysSet = new Set(s.daysOn);
      const totalHoras = s.daysOn.length * s.hours;
      const isPH = c.mod === 'Por horas';
      const isMT = c.mod === 'Medio tiempo';
      const modKey = isPH ? 'ph' : (isMT ? 'mt' : 'tc');
      // Tipografía de bullet/leyenda de días
      const daysLbl = (()=>{
        const ds = s.daysOn.map(i=>E_DAY_LBLS[i]);
        return ds.join(', ');
      })();
      return `<div class="entrev-section">
        <div class="entrev-section-h">
          <span class="ic" data-mod="${modKey}"><span class="mi">event_available</span></span>
          <h4>${c.noFlex ? 'Disponibilidad horaria fija' : 'Disponibilidad horaria deseada'}</h4>
          ${c.noFlex
            ? `<span class="entrev-sched-flex-pill noflex"><span class="mi">lock</span>Horario fijo</span>`
            : `<span class="entrev-sched-flex-pill"><span class="mi">swap_horiz</span>Flexible</span>`}
        </div>
        ${c.noFlex
          ? `<div class="entrev-sched-flex-note noflex">
              <span class="mi">lock</span>
              <div>El candidato indicó que <strong>solo puede trabajar bajo este horario</strong>. Es un schedule <strong>fijo</strong> dentro de su modalidad ${s.modLbl.toLowerCase()} y, por el momento, <strong>no está disponible</strong> para días u horarios distintos a los seleccionados.</div>
            </div>`
          : `<div class="entrev-sched-flex-note">
              <span class="mi">info</span>
              <div>Este es el horario que el candidato eligió como <strong>ideal</strong>, pero indicó estar <strong>abierto a flexibilidad</strong>: puede ajustarse a otros días u horarios dentro de la misma modalidad si la operación del hotel lo requiere.</div>
            </div>`}
        <div class="entrev-sched-card open" data-mod="${modKey}">
          <div class="entrev-sched-h" onclick="window.__entrevToggleSched(this)">
            <div class="entrev-sched-ic"><span class="mi">schedule</span></div>
            <div class="entrev-sched-info">
              <div class="nm">${s.modLbl} · ${s.hours}h/día</div>
              <div class="det">${s.conLbl} · ${s.daysOn.length} día${s.daysOn.length===1?'':'s'} a la semana · ${totalHoras}h totales</div>
            </div>
            <span class="entrev-sched-pill">${daysLbl}</span>
            <div class="entrev-sched-chev"><span class="mi">expand_more</span></div>
          </div>
          <div class="entrev-sched-body">
            <div class="rsd-tbl entrev-sched-tbl">
            <div class="rsd-tbl-head">
              <div>Día</div>
              <div>Frecuencia</div>
              <div>Horario<br>propuesto</div>
              <div>Estado</div>
              <div>Horas</div>
            </div>
            ${E_DAY_LBLS.map((dlbl, di)=>{
              const on = daysSet.has(di);
              if(!on){
                return `<div class="rsd-tbl-row off">
                  <div class="rsd-day">${dlbl}</div>
                  <div><span class="rsd-pill rsd-pill-off">No<br>disponible</span></div>
                  <div class="rsd-time off">—</div>
                  <div><span class="rsd-pill rsd-pill-off">No<br>aplica</span></div>
                  <div class="rsd-cnt off">0</div>
                </div>`;
              }
              return `<div class="rsd-tbl-row">
                <div class="rsd-day on">${dlbl}</div>
                <div>${isPH
                  ? `<span class="rsd-pill rsd-pill-tmp">Por<br>bloques</span>`
                  : `<span class="rsd-pill rsd-pill-freq">Cada<br>semana</span>`}</div>
                <div class="rsd-time">${s.start} – ${s.end}</div>
                <div><span class="rsd-pill rsd-pill-req" style="background:rgba(31,168,74,.14);color:#1F8F50">Disponible</span></div>
                <div class="rsd-cnt on">${s.hours}h</div>
              </div>`;
            }).join('')}
          </div>
          <div class="rsd-legend entrev-sched-legend">
            <div class="rsd-lg-row"><span class="mi">schedule</span><strong>${s.modLbl} (${s.hours}h)</strong><span class="rsd-lg-sub">· Jornada diaria propuesta por el candidato</span></div>
            <div class="rsd-lg-row"><span class="mi rsd-lg-ok">check_circle</span><strong>Disponible</strong><span class="rsd-lg-sub">· Día y horario seleccionado en su app</span></div>
            <div class="rsd-lg-row"><span class="mi">sync</span><strong>${s.conLbl}</strong><span class="rsd-lg-sub">· ${isPH?'Bloques específicos según solicitud del hotel':'Se repite cada semana de forma estable'}</span></div>
            <div class="rsd-lg-row"><span class="mi rsd-lg-off">cancel</span><strong>No disponible</strong><span class="rsd-lg-sub">· El candidato no eligió ese día</span></div>
          </div>
          <div class="entrev-sched-note">
            <span class="mi">info</span>
            <div>Schedule <strong>deseado por el candidato</strong>: días y horario que seleccionó en su app dentro de la modalidad <strong>${s.modLbl.toLowerCase()}</strong>. Útil para emparejarlo contra los schedules de las requisiciones abiertas.</div>
          </div>
          </div>
        </div>
      </div>`;
    }

    // Datos básicos capturados en el modal "Nuevo colaborador" durante la
    // alta del candidato. Mismos campos del formulario: identificación
    // (SSN/ID interno), edad, género, correo y domicilio. Disponibles
    // desde el inicio (alta) y editables desde el drawer.
    const CORE_BY_ID = {
      // pendApp
      'E-9821':{ ssn:'SSN-9821', edad:34, genero:'Femenino',  correo:'carmen.rodriguez@gmail.com',  domicilio:'Av. Insurgentes Sur 1245, Del Valle, CDMX' },
      'E-9822':{ ssn:'SSN-9822', edad:28, genero:'Masculino', correo:'luis.hernandez@hotmail.com',   domicilio:'Calle Pino 88, Coyoacán, CDMX' },
      'E-9825':{ ssn:'SSN-9825', edad:42, genero:'Femenino',  correo:'diana.mendez@gmail.com',       domicilio:'Av. Tláhuac 220, Iztapalapa, CDMX' },
      'E-9831':{ ssn:'SSN-9831', edad:36, genero:'Masculino', correo:'roberto.aguilar@outlook.com',  domicilio:'Cda. Reforma 14, Polanco, CDMX' },
      // pendVal
      'E-9810':{ ssn:'SSN-9810', edad:26, genero:'Femenino',  correo:'ana.suarez@gmail.com',         domicilio:'Av. Universidad 332, Narvarte, CDMX' },
      'E-9811':{ ssn:'SSN-9811', edad:31, genero:'Masculino', correo:'javier.castro@gmail.com',      domicilio:'Calle Zaragoza 45, Tlalpan, CDMX' },
      'E-9815':{ ssn:'SSN-9815', edad:38, genero:'Femenino',  correo:'patricia.morales@hotmail.com', domicilio:'Tacubaya 17, Miguel Hidalgo, CDMX' },
      'E-9816':{ ssn:'SSN-9816', edad:24, genero:'Masculino', correo:'daniel.vega@gmail.com',        domicilio:'Av. Pantitlán 9, Iztacalco, CDMX' },
      'E-9817':{ ssn:'SSN-9817', edad:33, genero:'Femenino',  correo:'lorena.mendez@gmail.com',      domicilio:'Cda. Roma 88, Cuauhtémoc, CDMX' },
      'E-9818':{ ssn:'SSN-9818', edad:29, genero:'Masculino', correo:'patricio.salazar@outlook.com', domicilio:'Iztacalco 47, Iztacalco, CDMX' },
      // aband
      'E-9745':{ ssn:'SSN-9745', edad:45, genero:'Masculino', correo:'mario.rivera@gmail.com',       domicilio:'Av. Tláhuac 1101, Tláhuac, CDMX' },
      'E-9750':{ ssn:'SSN-9750', edad:27, genero:'Femenino',  correo:'lucia.fernandez@hotmail.com',  domicilio:'Reforma 423, Cuauhtémoc, CDMX' },
      'E-9755':{ ssn:'SSN-9755', edad:30, genero:'Masculino', correo:'jorge.salinas@gmail.com',      domicilio:'Calz. Tlalpan 1980, Coyoacán, CDMX' },
      'E-9762':{ ssn:'SSN-9762', edad:35, genero:'Femenino',  correo:'karina.lopez@gmail.com',       domicilio:'Av. Constituyentes 510, M. Hidalgo, CDMX' },
      // valid
      'E-9700':{ ssn:'SSN-9700', edad:32, genero:'Femenino',  correo:'sofia.ramirez@gmail.com',      domicilio:'Av. Insurgentes 220, Roma Norte, CDMX' },
      'E-9702':{ ssn:'SSN-9702', edad:39, genero:'Masculino', correo:'eduardo.gutierrez@gmail.com',  domicilio:'Tlalpan 220, Tlalpan, CDMX' },
      'E-9710':{ ssn:'SSN-9710', edad:44, genero:'Masculino', correo:'andrea.villalobos@gmail.com',  domicilio:'Reforma 1500, M. Hidalgo, CDMX' },
      'E-9712':{ ssn:'SSN-9712', edad:29, genero:'Masculino', correo:'tomas.bravo@hotmail.com',      domicilio:'Vista Mar 88, B. Juárez, CDMX' },
      'E-9714':{ ssn:'SSN-9714', edad:27, genero:'Masculino', correo:'hugo.estrada@gmail.com',       domicilio:'Av. Pacífico 213, Coyoacán, CDMX' },
      'E-9716':{ ssn:'SSN-9716', edad:33, genero:'Femenino',  correo:'marisol.padilla@gmail.com',    domicilio:'Periférico Sur 4020, Tlalpan, CDMX' },
    };

    // Datos adicionales que solo están disponibles cuando el candidato
    // completa la Fase 2 en su app (Pendientes de Validar y Validados).
    // Idioma, experiencia y transporte — útiles para evaluar fit con la
    // requisición durante la validación.
    const EXTRA_BY_ID = {
      // pendVal
      'E-9810':{ idioma:'Básico',      exp:'1 año',  transp:'Transporte público' },
      'E-9811':{ idioma:'Intermedio',  exp:'3 años', transp:'Auto propio' },
      'E-9815':{ idioma:'Avanzado',    exp:'5 años', transp:'Auto propio' },
      'E-9816':{ idioma:'Básico',      exp:'2 años', transp:'Motocicleta' },
      'E-9817':{ idioma:'Intermedio',  exp:'2 años', transp:'Transporte público' },
      'E-9818':{ idioma:'Básico',      exp:'1.5 años', transp:'Motocicleta' },
      // valid
      'E-9700':{ idioma:'Intermedio',  exp:'2 años', transp:'Auto propio' },
      'E-9702':{ idioma:'Básico',      exp:'4 años', transp:'Transporte público' },
      'E-9710':{ idioma:'Avanzado',    exp:'7 años', transp:'Auto propio' },
      'E-9712':{ idioma:'Intermedio',  exp:'3 años', transp:'Bicicleta' },
      'E-9714':{ idioma:'Básico',      exp:'2 años', transp:'Transporte público' },
      'E-9716':{ idioma:'Intermedio',  exp:'3 años', transp:'Auto propio' },
    };

    // Datos de emergencia — solo aparecen una vez que el candidato completa
    // la Fase 2 en la app (Pendientes de Validar y Validados). Son de SOLO
    // LECTURA: vienen del onboarding del propio candidato y el reclutador
    // únicamente los consulta para validación / contacto de emergencia.
    const EMERG_BY_ID = {
      // pendVal
      'E-9810':{ contacto:'María Cruz (madre)',        tel:'+52 55 6677 1030', sangre:'O+',  alergias:'Ninguna' },
      'E-9811':{ contacto:'Roberto Castro (hermano)',  tel:'+52 55 1109 7724', sangre:'A+',  alergias:'Polvo · leve' },
      'E-9815':{ contacto:'Diego Morales (esposo)',    tel:'+52 55 9921 4472', sangre:'B+',  alergias:'Ninguna' },
      'E-9816':{ contacto:'Carmen Ortiz (madre)',      tel:'+52 55 3382 4018', sangre:'O-',  alergias:'Penicilina' },
      'E-9817':{ contacto:'Andrés Méndez (esposo)',    tel:'+52 55 4471 2209', sangre:'A+',  alergias:'Ninguna' },
      'E-9818':{ contacto:'Sofía Salazar (madre)',     tel:'+52 55 6628 5520', sangre:'O+',  alergias:'Polvo · leve' },
      // valid
      'E-9700':{ contacto:'José Ramírez (esposo)',     tel:'+52 55 5512 8837', sangre:'A+',  alergias:'Ninguna' },
      'E-9702':{ contacto:'Carla Gutiérrez (esposa)',  tel:'+52 55 8843 7763', sangre:'O+',  alergias:'Mariscos' },
      'E-9710':{ contacto:'Luis Villalobos (padre)',   tel:'+52 55 1102 4499', sangre:'AB+', alergias:'Ninguna' },
      'E-9712':{ contacto:'Ana Bravo (hermana)',       tel:'+52 55 6645 8822', sangre:'B-',  alergias:'Polen estacional' },
      'E-9714':{ contacto:'Laura Estrada (madre)',     tel:'+52 55 4422 7709', sangre:'O+',  alergias:'Ninguna' },
      'E-9716':{ contacto:'Diego Padilla (hermano)',   tel:'+52 55 8833 2295', sangre:'A-',  alergias:'Ninguna' },
    };

    function renderEntrevEmergSection(c){
      const e = EMERG_BY_ID[c.id];
      if(!e) return '';
      return `<div class="entrev-section">
        <div class="entrev-section-h">
          <h4>Datos de emergencia</h4>
          <span class="pill"><span class="mi">lock</span>Solo lectura</span>
        </div>
        <div class="entrev-emerg-note">
          <span class="mi">info</span>
          <div>El candidato proporcionó estos datos en su app durante el onboarding. La información es <strong>de solo lectura</strong>; cualquier corrección debe hacerla el propio colaborador desde su perfil.</div>
        </div>
        <div class="entrev-emerg-card">
          <div class="entrev-emerg-row" data-c="contact">
            <div class="ic"><span class="mi">contact_emergency</span></div>
            <div class="txt">
              <div class="lbl">Contacto de emergencia</div>
              <div class="val">${e.contacto}<span class="sub">${e.tel}</span></div>
            </div>
          </div>
          <div class="entrev-emerg-row" data-c="blood">
            <div class="ic"><span class="mi">bloodtype</span></div>
            <div class="txt">
              <div class="lbl">Tipo de sangre</div>
              <div class="val">${e.sangre}</div>
            </div>
          </div>
          <div class="entrev-emerg-row" data-c="aller">
            <div class="ic"><span class="mi">medication</span></div>
            <div class="txt">
              <div class="lbl">Alergias o condiciones</div>
              <div class="val">${e.alergias}</div>
            </div>
          </div>
        </div>
      </div>`;
    }

    // Historial de eventos del candidato — varía según el estado en el que
    // se encuentre. Devuelve un timeline cronológico inverso (más reciente
    // primero) con eventos relevantes: link enviado, recordatorios, acceso
    // a la app, carga de docs, validaciones, etc.
    function renderEntrevHistorial(c){
      const reclutador = 'María González';
      const fechaEnt   = c.fecha;
      const tel        = c.phone;
      const events = []; // {type, ic, title, meta, time, actor}

      // Tipos:
      //   'create'   gris  · person_add — captura inicial
      //   'message'  azul  · send       — link / SMS
      //   'remind'   ámbar · notifications — recordatorios
      //   'app'      morado · phone_iphone — actividad en la app
      //   'doc'      teal · upload_file — carga de docs
      //   'valid'    verde · verified — validación
      //   'warn'     rojo · warning — alertas, sin actividad
      //   'abandon'  rojo · person_off — abandono confirmado

      // Evento común a todos: captura inicial en entrevista
      const baseEnt = [
        { type:'create', ic:'person_add',      title:'Captura inicial en entrevista presencial', meta:`Datos básicos registrados por ${reclutador}`, time:`${fechaEnt} · 09:14`, actor:reclutador },
        { type:'message', ic:'send',           title:'Link de descarga de app enviado',          meta:`SMS a ${tel} con link para completar Fase 2 y 3`, time:`${fechaEnt} · 09:18`, actor:'Sistema' },
      ];

      if(c.st === 'pendApp'){
        // Pendientes de App — esperando que descargue/abra la app
        events.push(...baseEnt);
        if(c.dias >= 2){
          events.push({ type:'remind', ic:'notifications', title:'Recordatorio automático #1', meta:'WhatsApp: "Te queda 1 paso para completar tu registro"', time:`Hace ${c.dias-1} día${c.dias-1===1?'':'s'}`, actor:'Sistema' });
        }
        if(c.dias >= 4){
          events.push({ type:'remind', ic:'notifications', title:'Recordatorio automático #2', meta:'SMS: "No olvides terminar tu registro en Oranje"', time:`Hace ${Math.max(1,c.dias-3)} día${Math.max(1,c.dias-3)===1?'':'s'}`, actor:'Sistema' });
        }
        if(c.dias >= 1){
          events.push({ type:'warn', ic:'warning', title:'Sin actividad en la app', meta:`Han pasado ${c.dias} día${c.dias===1?'':'s'} sin que el candidato abra la app`, time:'Hoy · 08:00', actor:'Sistema' });
        }
      } else if(c.st === 'pendVal'){
        // Pendientes de Validar — completó la app, espera validación de reclutadora
        events.push(...baseEnt);
        events.push(
          { type:'app',   ic:'phone_iphone',   title:'App descargada y abierta',      meta:'Primer acceso al onboarding · iOS',              time:`Hace ${c.dias+3} días`, actor:c.name },
          { type:'app',   ic:'person',         title:'Datos personales completados',  meta:'Fase 2 · Cierre de sesión exitoso',              time:`Hace ${c.dias+2} días`, actor:c.name },
          { type:'doc',   ic:'upload_file',    title:'Documentos cargados',           meta:'SSN, ITIN y foto del colaborador subidos · comprobante opcional pendiente', time:`Hace ${c.dias+1} días`, actor:c.name },
          { type:'message',ic:'mark_email_read',title:'Notificación a reclutadora',   meta:`${reclutador} fue avisada para iniciar validación`, time:`Hace ${c.dias} día${c.dias===1?'':'s'}`, actor:'Sistema' },
        );
        if(c.dias >= 2){
          events.push({ type:'remind', ic:'priority_high', title:'En espera de validación', meta:'Pendiente de revisión de documentos por reclutadora', time:'Hoy · 07:30', actor:'Sistema' });
        }
      } else if(c.st === 'aband'){
        // Abandonados — pasaron >7 días sin completar la app
        events.push(...baseEnt);
        events.push(
          { type:'remind',  ic:'notifications', title:'Recordatorio automático #1',       meta:'WhatsApp: "Te queda 1 paso para completar tu registro"', time:`Hace ${c.dias-1} días`, actor:'Sistema' },
          { type:'remind',  ic:'notifications', title:'Recordatorio automático #2',       meta:'SMS: "No olvides terminar tu registro en Oranje"',        time:`Hace ${c.dias-3} días`, actor:'Sistema' },
          { type:'remind',  ic:'notifications', title:'Recordatorio automático #3 (final)',meta:'Email + SMS: último aviso antes de marcar abandono',     time:`Hace ${c.dias-5} días`, actor:'Sistema' },
        );
        if(c.dias >= 8){
          events.push(
            { type:'app',     ic:'phone_iphone',  title:'Acceso parcial a la app',          meta:'Abrió la app, pero no subió SSN ni ITIN',                time:`Hace ${c.dias-6} días`, actor:c.name },
          );
        }
        events.push(
          { type:'warn',    ic:'warning',         title:'Sin actividad por más de 7 días', meta:'El sistema marca el caso como riesgo de abandono',      time:'Hace 7 días',           actor:'Sistema' },
          { type:'abandon', ic:'person_off',      title:'Candidato marcado como abandonado',meta:`${reclutador} confirmó abandono · ${c.dias} días sin actividad`, time:'Hoy · 06:00',       actor:reclutador },
        );
      } else if(c.st === 'valid'){
        // Validados — proceso completo, en Pool
        const valDays = Math.max(1, c.dias - 3);
        events.push(...baseEnt);
        events.push(
          { type:'app',     ic:'phone_iphone',     title:'App descargada y abierta',         meta:'Primer acceso al onboarding · Android',                 time:`Hace ${c.dias+2} días`, actor:c.name },
          { type:'app',     ic:'person',           title:'Datos personales completados',     meta:'Fase 2 · Cierre de sesión exitoso',                     time:`Hace ${c.dias+1} días`, actor:c.name },
          { type:'doc',     ic:'upload_file',      title:'Documentos cargados',              meta:'SSN, ITIN, foto del colaborador y comprobante opcional subidos', time:`Hace ${valDays+2} días`, actor:c.name },
          { type:'message', ic:'mark_email_read',  title:'Notificación a reclutadora',       meta:`${reclutador} fue avisada para iniciar validación`,     time:`Hace ${valDays+1} días`, actor:'Sistema' },
          { type:'valid',   ic:'fact_check',       title:'Documentos revisados y aprobados', meta:`${reclutador} verificó SSN, ITIN, foto y comprobante opcional en RF-08`, time:`Hace ${valDays} día${valDays===1?'':'s'}`, actor:reclutador },
          { type:'valid',   ic:'verified',         title:'Candidato validado · pasó al Pool',meta:'Disponible para asignación a requisiciones abiertas',   time:`Hace ${valDays} día${valDays===1?'':'s'}`,   actor:reclutador },
        );
      }

      // Cronológico inverso: más reciente arriba
      events.reverse();

      // Mapeo de tipos a clases CSS
      return `<div class="entrev-section">
        <div class="entrev-section-h">
          <h4>Historial</h4>
          <span class="pill"><span class="mi">history</span>${events.length} evento${events.length===1?'':'s'}</span>
        </div>
        <div class="entrev-hist">
          ${events.map((e, i)=>`
            <div class="entrev-hist-row" data-t="${e.type}">
              <div class="entrev-hist-line">
                <div class="entrev-hist-dot"><span class="mi">${e.ic}</span></div>
                ${i < events.length-1 ? '<div class="entrev-hist-conn"></div>' : ''}
              </div>
              <div class="entrev-hist-body">
                <div class="entrev-hist-top">
                  <div class="entrev-hist-title">${e.title}</div>
                  <div class="entrev-hist-time">${e.time}</div>
                </div>
                <div class="entrev-hist-meta">${e.meta}</div>
                <div class="entrev-hist-actor"><span class="mi">${e.actor==='Sistema'?'smart_toy':e.actor===c.name?'person':'support_agent'}</span>${e.actor}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>`;
    }

    function renderEntrevDrawer(c){
      const st = E_STATES.find(s=>s.key===c.st);
      const initials = c.name.split(' ').slice(0,2).map(x=>x[0]).join('').toUpperCase();
      const daysAlert = c.dias > 7;

      // Phases: F1 entrevista → F2 datos en app → F3 docs en app → Validación
      const phases = [
        { key:'f1', name:'Fase 1 · Entrevista presencial', meta:`Completada · ${c.fecha}`, state:'done' },
        { key:'f2', name:'Fase 2 · Datos personales en app',
                    meta: c.st==='pendApp'?'Pendiente · esperando descarga':'Completada',
                    state: c.st==='pendApp'?'current':'done' },
        { key:'f3', name:'Fase 3 · Carga de documentos',
                    meta: c.st==='pendApp'?'Pendiente · bloqueada por F2':(c.st==='pendVal'?'Completada':(c.st==='aband'?'Incompleta':'Completada')),
                    state: c.st==='pendApp'?'pending':(c.st==='pendVal'?'done':(c.st==='aband'?'pending':'done')) },
        { key:'v',  name:'Validación · RF-08',
                    meta: c.st==='valid'?'Validado · pasó al Pool':(c.st==='pendVal'?'Pendiente · esperando reclutadora':'Pendiente'),
                    state: c.st==='valid'?'done':(c.st==='pendVal'?'current':'pending') },
      ];

      const phasesHtml = phases.map(p=>`
        <div class="entrev-phase ${p.state==='done'?'done':p.state==='current'?'current':''}">
          <div class="entrev-phase-ic"><span class="mi">${p.state==='done'?'check':p.state==='current'?'pending':'radio_button_unchecked'}</span></div>
          <div class="entrev-phase-txt">
            <div class="entrev-phase-name">${p.name}</div>
            <div class="entrev-phase-meta">${p.meta}</div>
          </div>
        </div>
      `).join('');

      const primaryAction = c.st==='pendVal'
        ? `<button class="btn primary" onclick="window.__entrevAct('validate','${c.id}')"><span class="mi">verified</span>Validar y enviar al Pool</button>`
        : c.st==='pendApp'
          ? `<button class="btn primary" onclick="window.__entrevAskRemind('${c.id}')"><span class="mi">send</span>Enviar recordatorio</button>`
          : c.st==='aband'
            ? `<button class="btn primary" onclick="window.__entrevAct('reactivate','${c.id}')"><span class="mi">restart_alt</span>Reactivar candidato</button>`
            : `<button class="btn primary" onclick="window.__entrevAct('view','${c.id}')"><span class="mi">badge</span>Ver perfil en Pool</button>`;

      const secondaryAction = c.st==='aband'
        ? `<button class="btn ghost" onclick="window.__entrevAct('blacklist','${c.id}')"><span class="mi">block</span>Marcar bloqueo</button>`
        : c.st==='valid'
          ? `<button class="btn ghost" onclick="window.__entrevCloseDrawer()"><span class="mi">close</span>Cerrar</button>`
          : c.st==='pendVal'
            ? `<button class="btn ghost danger" onclick="window.__entrevAskReject('${c.id}')"><span class="mi">cancel</span>Rechazar candidato</button>`
            : ``;
      // Nota: en estados "Pendientes de App" y "Pendientes de Validar" NO
      // hay acción secundaria — el sistema marca abandono automáticamente
      // cuando se rebasa el SLA, así que el reclutador no debería tener que
      // hacerlo manualmente. Solo queda la acción primaria, a todo ancho.

      const html = `
        <div class="entrev-dr-head">
          <div class="close" onclick="window.__entrevCloseDrawer()"><span class="mi">close</span></div>
          <div class="eyebrow" data-st="${c.st}">${st.name}</div>
          <h2>${c.name}</h2>
          <div class="doc">ID ${c.id} · ${c.phone}</div>
          <div class="head-row">
            <span class="h-pill"><span class="mi" style="font-size:13px">work</span>${c.pos}</span>
            <span class="h-pill zone"><span class="mi" style="font-size:13px">place</span>${c.zone}</span>
            <span class="h-pill mod" data-mod="${c.mod==='Tiempo \ncompleto'?'tc':c.mod==='Medio tiempo'?'mt':c.mod==='Según \nsolicitud'?'ss':'ph'}"><span class="mi" style="font-size:13px">schedule</span>${(c.mod||'').replace(/\n/g,' ')}</span>
          </div>
        </div>
        <div class="entrev-dr-body">
          <div class="entrev-section" style="margin-bottom:14px">
            <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--o-50);border:1px solid var(--o-200);border-radius:10px">
              <span class="mi" style="color:var(--o-600)">badge</span>
              <div style="flex:1"><div style="font-size:11px;color:var(--ink-3);font-weight:600;text-transform:uppercase;letter-spacing:.04em">Reclutadora responsable</div><div style="font-weight:600;color:var(--ink)">${c.reclutadora}</div></div>
            </div>
            ${c.reclutadora!=='Tú (Líder)' ? `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">
              <button class="btn ghost" style="font-size:12px;padding:7px 11px" onclick="navigate(document.querySelector('.sb-item[data-page=&quot;Mi Grupo&quot;]'),'Mi Grupo');toast('Abriendo desempeño de ${c.reclutadora}','insights')"><span class="mi" style="font-size:16px">insights</span>Ver desempeño</button>
              <button class="btn ghost" style="font-size:12px;padding:7px 11px" onclick="toast('Comentario agregado al expediente · visible para ${c.reclutadora}','comment')"><span class="mi" style="font-size:16px">comment</span>Comentar</button>
              <button class="btn ghost" style="font-size:12px;padding:7px 11px" onclick="toast('Reasignar candidato a otra reclutadora del grupo…','swap_horiz')"><span class="mi" style="font-size:16px">swap_horiz</span>Reasignar candidato</button>
            </div>` : ''}
          </div>
          <div class="entrev-section">
            <div class="entrev-section-h">
              <h4>Datos del candidato</h4>
              <button class="entrev-edit-btn" onclick="window.__entrevEditCandidato('${c.id}')" title="Editar datos del candidato"><span class="mi">edit</span>Editar</button>
            </div>
            ${(()=>{ const core = CORE_BY_ID[c.id] || {}; return `
            <div class="entrev-detail-grid">
              <div class="entrev-detail-row" data-c="ssn">
                <div class="ic"><span class="mi">badge</span></div>
                <div class="txt"><div class="lbl">SSN / ID interno</div><div class="val">${core.ssn || c.doc}</div></div>
              </div>
              <div class="entrev-detail-row" data-c="edad">
                <div class="ic"><span class="mi">cake</span></div>
                <div class="txt"><div class="lbl">Edad</div><div class="val">${core.edad ? core.edad+' años' : '—'}</div></div>
              </div>
              <div class="entrev-detail-row" data-c="genero">
                <div class="ic"><span class="mi">${core.genero==='Femenino'?'female':core.genero==='Masculino'?'male':'person'}</span></div>
                <div class="txt"><div class="lbl">Género</div><div class="val">${core.genero || '—'}</div></div>
              </div>
              <div class="entrev-detail-row" data-c="phone">
                <div class="ic"><span class="mi">phone</span></div>
                <div class="txt"><div class="lbl">Teléfono</div><div class="val">${c.phone}</div></div>
              </div>
              <div class="entrev-detail-row full" data-c="correo">
                <div class="ic"><span class="mi">email</span></div>
                <div class="txt"><div class="lbl">Correo electrónico</div><div class="val">${core.correo || '—'}</div></div>
              </div>
              <div class="entrev-detail-row full" data-c="domicilio">
                <div class="ic"><span class="mi">home</span></div>
                <div class="txt"><div class="lbl">Domicilio</div><div class="val">${core.domicilio || '—'}</div></div>
              </div>
              <div class="entrev-detail-row" data-c="pos">
                <div class="ic"><span class="mi">work</span></div>
                <div class="txt"><div class="lbl">Posición</div><div class="val">${c.pos}</div></div>
              </div>
              <div class="entrev-detail-row" data-c="zone">
                <div class="ic"><span class="mi">place</span></div>
                <div class="txt"><div class="lbl">Zona</div><div class="val">${c.zone}</div></div>
              </div>
              <div class="entrev-detail-row" data-c="mod" data-mod="${c.mod==='Tiempo \ncompleto'?'tc':c.mod==='Medio tiempo'?'mt':c.mod==='Según \nsolicitud'?'ss':'ph'}">
                <div class="ic"><span class="mi">schedule</span></div>
                <div class="txt"><div class="lbl">Modalidad prevista</div><div class="val">${(c.mod||'').replace(/\n/g,' ')}</div></div>
              </div>
              <div class="entrev-detail-row" data-c="origen">
                <div class="ic"><span class="mi">${c.origen==='Referido'?'group':c.origen==='Aplicación directa'?'person_search':c.origen==='Reclutamiento activo'?'campaign':'share'}</span></div>
                <div class="txt"><div class="lbl">Origen</div><div class="val">${c.origen}</div></div>
              </div>

              ${(()=>{
                const ex = EXTRA_BY_ID[c.id];
                if(!ex) return '';
                return `
                  <div class="entrev-detail-row" data-c="lang">
                    <div class="ic"><span class="mi">translate</span></div>
                    <div class="txt"><div class="lbl">Nivel de inglés</div><div class="val">${ex.idioma}</div></div>
                  </div>
                  <div class="entrev-detail-row" data-c="exp">
                    <div class="ic"><span class="mi">workspace_premium</span></div>
                    <div class="txt"><div class="lbl">Nivel de experiencia</div><div class="val">${ex.exp}</div></div>
                  </div>
                  <div class="entrev-detail-row full" data-c="transp">
                    <div class="ic"><span class="mi">directions_car</span></div>
                    <div class="txt"><div class="lbl">Tipo de transporte</div><div class="val">${ex.transp}</div></div>
                  </div>
                `;
              })()}
              <div class="entrev-detail-row full" data-c="date">
                <div class="ic"><span class="mi">event</span></div>
                <div class="txt"><div class="lbl">Fecha entrevista</div><div class="val">${c.fecha}<span class="sub">${c.entrevista}</span></div></div>
              </div>
            </div>
            `;})()}
          </div>

          ${renderEntrevEmergSection(c)}

          <div class="entrev-section">
            <div class="entrev-section-h">
              <h4>Estado actual</h4>
            </div>
            <div class="entrev-status-panel" style="--st-color:${st.color}">
              <div class="entrev-status-ic"><span class="mi">${c.st==='valid'?'check_circle':c.st==='aband'?'warning':c.st==='pendVal'?'hourglass_top':'phone_iphone'}</span></div>
              <div class="entrev-status-body">
                <div class="entrev-status-eyebrow">Estado</div>
                <div class="entrev-status-name">${st.name}</div>
                <div class="entrev-status-sub">${st.sub}</div>
              </div>
              <div class="entrev-status-days ${c.st==='valid' ? 'ok' : (daysAlert?'warn':'')}">
                <div class="num">${c.dias}</div>
                <div class="lbl">${c.dias===1?'día':'días'}${c.st!=='valid' && daysAlert?' · urgente':''}</div>
              </div>
            </div>
          </div>

          ${(c.st==='pendVal' || c.st==='valid') ? renderEntrevSchedSection(c) : ''}

          ${(()=>{
            const doneCount = phases.filter(p=>p.state==='done').length;
            const total = phases.length;
            const pct = Math.round((doneCount/total)*100);
            const allDone = doneCount===total;
            const current = phases.find(p=>p.state==='current') || phases[phases.findIndex(p=>p.state==='done') + 1] || phases[phases.length-1];
            return `<div class="entrev-section">
              <div class="entrev-section-h">
                <h4>Progreso del onboarding</h4>
                <span class="pill"><span class="mi">checklist</span>${doneCount}/${total} fases</span>
              </div>
              <div class="entrev-progress-card">
                <div class="entrev-progress-top">
                  <div class="entrev-progress-info">
                    <div class="entrev-progress-stage">${allDone?'Onboarding completo':`En curso · ${current?current.name.split(' · ')[0]:''}`}</div>
                    <div class="entrev-progress-meta">${allDone?'El candidato ya pasó al Pool de talento':(current?current.meta:'')}</div>
                  </div>
                </div>
                <div class="entrev-timeline">
                  ${phasesHtml}
                </div>
              </div>
            </div>`;
          })()}

          ${(()=>{
            const docs = [
              {key:'ssn',  name:'SSN',                          ic:'badge',          sub:'Social Security Number',                size:'180 KB', optional:false},
              {key:'itin', name:'ITIN',                         ic:'description',    sub:'Individual Taxpayer Identification',    size:'180 KB', optional:false},
              {key:'foto', name:'Foto del colaborador',         ic:'photo_camera',   sub:'Imagen reciente · JPG/PNG',             size:'1.2 MB', optional:false},
              {key:'opt',  name:'Comprobante o diploma',        ic:'school',         sub:'Documento opcional subido por el colaborador', size:'860 KB', optional:true},
            ];
            const docState = (key)=>{
              if(c.st==='pendApp') return 'pending';
              if(c.st==='aband'){
                if(key==='itin') return 'missed';
                if(key==='opt')  return 'missed';
                return 'done';
              }
              if(c.st==='pendVal') return key==='opt'?'pending':'done';
              return 'done'; // valid
            };
            const completedCount = docs.filter(d=>docState(d.key)==='done').length;
            return `<div class="entrev-section">
              <div class="entrev-section-h">
                <h4>Documentos</h4>
                <span class="pill"><span class="mi">attach_file</span>${completedCount}/${docs.length} recibidos</span>
              </div>
              <div class="entrev-docs-list">
                ${docs.map(d=>{
                  const ds = docState(d.key);
                  const stLbl = ds==='done'?'Recibido':ds==='missed'?'No completó':'Pendiente';
                  const stIc  = ds==='done'?'check_circle':ds==='missed'?'cancel':'hourglass_top';
                  const subTxt = ds==='done'?`${d.sub} · ${d.size}`:(ds==='missed'?'El candidato no subió este documento':'Esperando carga en la app');
                  return `<div class="entrev-doc-row ${ds}">
                    <div class="ic"><span class="mi">${d.ic}</span></div>
                    <div class="txt">
                      <div class="nm">${d.name}${d.optional?' <span class="entrev-doc-opt">Opcional</span>':''}</div>
                      <div class="sub">${subTxt}</div>
                    </div>
                    <span class="stat"><span class="mi">${stIc}</span>${stLbl}</span>
                    ${ds==='done'?`<div class="act" title="Ver documento" onclick="event.stopPropagation();typeof showToast==='function'&&showToast('Vista previa de ${d.name}',{icon:'visibility'})"><span class="mi">visibility</span></div>`:''}
                  </div>`;
                }).join('')}
              </div>
            </div>`;
          })()}

          ${renderEntrevHistorial(c)}
        </div>
        <div class="entrev-dr-foot${secondaryAction ? '' : ' solo'}">
          ${secondaryAction}
          ${primaryAction}
        </div>
      `;
      document.getElementById('entrev-drawer').innerHTML = html;
    }

    window.__entrevAct = (action, id)=>{
      const c = ENTREV.find(x=>x.id===id);
      if(!c) return;
      const msgs = {
        validate: `✓ ${c.name} validada — pasó al Pool`,
        remind:   `✓ Recordatorio enviado a ${c.name} — descargar la app y completar su registro`,
        reactivate: `↻ ${c.name} reactivada — recordatorio enviado para descargar la app y completar su registro`,
        abandon:  `⊘ ${c.name} marcada como abandono`,
        blacklist:`🚫 ${c.name} marcada como bloqueada`,
        reject:   `⊘ ${c.name} rechazada — motivo registrado en su historial`,
        view:     `Abriendo perfil en Pool…`,
      };
      const icons = { validate:'verified', remind:'send', reactivate:'restart_alt', abandon:'person_off', blacklist:'block', reject:'cancel', view:'badge' };
      const msg = msgs[action] || 'Acción aplicada';
      const ic  = icons[action] || 'check';
      // Toast global de éxito (definido en el header de la plataforma)
      if(typeof toast === 'function')      toast(msg, ic);
      else if(typeof showToast === 'function') showToast(msg, {icon:ic});
      // Para "remind" no cerramos el drawer — el reclutador suele querer
      // verificar el historial actualizado tras enviar el recordatorio.
      if(action !== 'remind') window.__entrevCloseDrawer();
    };

    // Init: si la página activa al cargar es Reclutamiento (caso por defecto),
    // disparamos el render dinámico para reemplazar el HTML estático del Pool
    // por la versión generada desde el array PEOPLE (con 4 cards por columna,
    // semáforo completo, modalidades coloreadas, etc.).
    setTimeout(()=>{
      const active = document.querySelector('[data-page-view="Reclutamiento"]');
      if(active && active.style.display !== 'none') window.__renderRecl();
    }, 50);

  })();

  // ============================================================
  // REQUISICIONES MODULE — reusa estilos recl-*
  // ============================================================
  (function(){
    const escR = s => String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

    const POSITIONS = ['Housekeeper','Mesero','Chef','Steward','Hoseman','Laundry','Mantenimiento','Recepción'];
    const ZONES = ['Centro','Sur','Este','Oeste','Noroeste','Sureste'];
    const URG_LABELS = {high:'Urgente', med:'Pronto', low:'Normal'};
    const URG_COLOR = {high:'#E11919', med:'#FFCC33', low:'#1FA84A'};
    const SUBSTATES = {
      autorizada:  {lbl:'Autorizada',  cls:'autorizada'},
      proceso:     {lbl:'En proceso',  cls:'proceso'},
      cubierta:    {lbl:'Cubierta',    cls:'cubierta'},
      parcial:     {lbl:'Parcial',     cls:'parcial'},
    };
    const POS_GRADIENTS = ['linear-gradient(135deg,#FF7A00,#C53D1F)','linear-gradient(135deg,#22C55E,#15803D)','linear-gradient(135deg,#3B82F6,#1D4ED8)','linear-gradient(135deg,#A855F7,#7C3AED)','linear-gradient(135deg,#F59E0B,#D97706)','linear-gradient(135deg,#EC4899,#BE185D)'];
    const gradFor = seed => POS_GRADIENTS[String(seed).split('').reduce((a,c)=>a+c.charCodeAt(0),0) % POS_GRADIENTS.length];
    const initials = nm => nm.split(' ').slice(0,2).map(s=>s[0]).join('').toUpperCase();

    const buildPositions = arr => arr.map(p=>{
      const segs=[];
      for(let i=0;i<p.cubierto;i++) segs.push({st:'cubierto'});
      for(let i=0;i<p.proceso;i++) segs.push({st:'proceso'});
      for(let i=0;i<(p.total-p.cubierto-p.proceso);i++) segs.push({st:'vacante'});
      return {...p, segs, vacante:p.total-p.cubierto-p.proceso};
    });

    // Semáforo de Posiciones (por posición individual)
    // 🟠 naranja: autorizada esperando (cubierto=0, proceso=0)
    // 🟢 verde: 100% cubierta
    // 🟢 verde: cubierto 100%
    // 🟠 naranja: 0 cubiertos, sin proceso (recién autorizada)
    // 🔴 rojo: cualquier faltante (con cobertura parcial)
    function posSemaforo(p){
      if(p.cubierto >= p.total) return 'verde';
      if(p.cubierto===0 && p.proceso===0) return 'naranja';
      return 'rojo';
    }
    // ============================================================
    // URGENCIA POR VACANTE — granularidad fina dentro de una requi
    // ============================================================
    // Una misma requisición puede traer vacantes con distinta urgencia
    // operacional (p. ej. HK/HM no se pueden cubrir mañana → "Urgente",
    // Chef puede esperar 1-2 días → "Pronto", Mesero o Steward son
    // normales). Aunque a nivel requi el estado dominante sea "Urgente"
    // (peor caso), el reclutador necesita saber cuáles vacantes
    // específicas atacar primero al tomarla.
    //
    // Heurística por tipo de posición:
    //   Operativo crítico (HK, HM, Mantenimiento) → high (Urgente)
    //   Cocina / técnico  (Chef, Cocinero, Electricista) → med (Pronto)
    //   Resto (Mesero, Steward, Laundry, Recepción) → low (Normal)
    const POS_URG_BASE = {
      'Housekeeper':'high','Hoseman':'high','Mantenimiento':'high',
      'Chef':'med','Cocinero':'med','Electricista':'med',
      'Mesero':'low','Steward':'low','Laundry':'low','Recepción':'low',
    };
    // Urgencia de la vacante `vi` dentro de la posición `p`.
    // - `reqUrg` (opcional) actúa como TECHO: la urgencia de una vacante
    //   nunca puede exceder la urgencia de la requisición que la contiene.
    //   Si la requi es Pronto, sus vacantes pueden ser Pronto o Normal,
    //   pero NUNCA Urgente (la requi ya sería Urgente en ese caso).
    // - Para posiciones grandes (≥4 vacantes) diversifica la urgencia
    //   para reflejar que las primeras cubren el turno crítico y las
    //   siguientes son refuerzo.
    function vacUrgency(p, vi, reqUrg){
      const rank = {high:3, med:2, low:1};
      const base = POS_URG_BASE[p.pos] || 'low';
      const cap  = reqUrg ? (rank[base] > rank[reqUrg] ? reqUrg : base) : base;
      if(p.total < 4) return cap;
      const ladder = cap==='high' ? ['high','high','med','med','low','low','low','low']
                   : cap==='med'  ? ['med','med','med','low','low','low','low','low']
                                  : ['low','low','low','low','low','low','low','low'];
      return ladder[vi % ladder.length];
    }
    // Wrapper que GARANTIZA consistencia con r.urg: si la requisición
    // está etiquetada como Urgente (o Pronto) pero ninguna de sus
    // vacantes alcanza ese nivel por la heurística natural, fuerza la
    // PRIMERA vacante empty del requi a r.urg. Así nunca se ve una requi
    // Urgente sin al menos una vacante Urgente.
    function vacUrgRequi(r, pi, p, vi){
      // Cachea el mapa de overrides por requi para no recalcular cada vez.
      if(!r._vacUrgBoost){
        const rank = {high:3, med:2, low:1};
        const reqRank = rank[r.urg||'low'];
        let maxFound = 0;
        const boost = {};
        for(const pp of r.positions){
          const startVi = pp.cubierto + pp.proceso;
          const empty = pp.total - startVi;
          for(let i=0;i<empty;i++){
            const u = vacUrgency(pp, startVi+i, r.urg);
            if(rank[u] > maxFound) maxFound = rank[u];
          }
        }
        if(reqRank > maxFound){
          // Boost la primera vacante empty del requi a r.urg
          for(let ppi=0; ppi<r.positions.length; ppi++){
            const pp = r.positions[ppi];
            const startVi = pp.cubierto + pp.proceso;
            if(pp.total - startVi > 0){
              boost[`${ppi}:${startVi}`] = r.urg;
              break;
            }
          }
        }
        r._vacUrgBoost = boost;
      }
      const k = `${pi}:${vi}`;
      return r._vacUrgBoost[k] || vacUrgency(p, vi, r.urg);
    }
    function posUrgBreakdown(p, reqUrg, r, pi){
      const empty = Math.max(0, p.total - p.cubierto - p.proceso);
      const out = {high:0, med:0, low:0, total:empty};
      const startVi = p.cubierto + p.proceso;
      for(let i=0;i<empty;i++){
        const u = (r && pi!=null) ? vacUrgRequi(r, pi, p, startVi + i) : vacUrgency(p, startVi + i, reqUrg);
        out[u]++;
      }
      return out;
    }
    function reqUrgBreakdown(r){
      const out = {high:0, med:0, low:0, total:0};
      r.positions.forEach((p, pi) => {
        const b = posUrgBreakdown(p, r.urg, r, pi);
        out.high  += b.high;
        out.med   += b.med;
        out.low   += b.low;
        out.total += b.total;
      });
      return out;
    }
    // Renderiza chips compactos con el breakdown de urgencias.
    // Solo muestra los tiers con count > 0.
    function urgChipsHTML(b){
      const parts = [];
      if(b.high>0) parts.push(`<span class="req-vac-urg-chip high" title="${b.high} ${b.high===1?'vacante urgente':'vacantes urgentes'}"><span class="dot"></span>${b.high}</span>`);
      if(b.med>0)  parts.push(`<span class="req-vac-urg-chip med" title="${b.med} ${b.med===1?'vacante pronto':'vacantes pronto'}"><span class="dot"></span>${b.med}</span>`);
      if(b.low>0)  parts.push(`<span class="req-vac-urg-chip low" title="${b.low} ${b.low===1?'vacante normal':'vacantes normales'}"><span class="dot"></span>${b.low}</span>`);
      return parts.join('');
    }

    // Estado dominante de la requisición (peor caso entre sus posiciones)
    // rojo > naranja > amarillo > verde
    function domSemaforo(r){
      const order = {rojo:0, naranja:1, amarillo:2, verde:3};
      let worst = 'verde';
      for(const p of r.positions){
        const s = posSemaforo(p);
        if(order[s] < order[worst]) worst = s;
      }
      return worst;
    }

    const REQUIS = [
      // 4 NARANJA — autorizadas, esperando colaboradores (cubierto:0, proceso:0)
      {id:'REQ-2451', hotel:'Hotel Costa del Sol', zone:'Centro', urg:'high', state:'autorizada', age:'Hace 2d 6h', positions:buildPositions([{pos:'Housekeeper',total:6,cubierto:0,proceso:0},{pos:'Mesero',total:3,cubierto:0,proceso:0}]), period:'01–07 Dic', shift:'Tiempo \ncompleto'},
      {id:'REQ-2459', hotel:'Hotel Marina Bay', zone:'Oeste', urg:'high', state:'autorizada', age:'Hace 1d 18h', positions:buildPositions([{pos:'Mantenimiento',total:4,cubierto:0,proceso:0},{pos:'Electricista',total:2,cubierto:0,proceso:0}]), period:'02–05 Dic', shift:'Medio tiempo'},
      {id:'REQ-2474', hotel:'Hotel Vista Mar', zone:'Centro', urg:'low', state:'autorizada', age:'Hace 4h', positions:buildPositions([{pos:'Laundry',total:5,cubierto:0,proceso:0}]), period:'06–13 Dic', shift:'Tiempo \ncompleto'},
      {id:'REQ-2479', hotel:'Hotel Caribe Plaza', zone:'Este', urg:'low', state:'autorizada', age:'Hace 1h', positions:buildPositions([{pos:'Steward',total:8,cubierto:0,proceso:0},{pos:'Laundry',total:3,cubierto:0,proceso:0}]), period:'08–14 Dic', shift:'Tiempo \ncompleto'},
      // 2 AMARILLO — faltante ≤25% (ej. 8/10 = 20%)
      {id:'REQ-2462', hotel:'Hotel Punta Vista', zone:'Sur', urg:'high', state:'autorizada', age:'Hace 1d 9h', positions:buildPositions([{pos:'Chef',total:6,cubierto:5,proceso:0},{pos:'Steward',total:4,cubierto:3,proceso:0}]), period:'03–10 Dic', shift:'Tiempo \ncompleto'},
      {id:'REQ-2471', hotel:'Hotel Las Brisas', zone:'Oeste', urg:'med', state:'autorizada', age:'Hace 8h', positions:buildPositions([{pos:'Hoseman',total:8,cubierto:7,proceso:0}]), period:'05–08 Dic', shift:'Medio tiempo'},
      {id:'REQ-2483', hotel:'Hotel Mirador del Valle', zone:'Norte', urg:'med', state:'autorizada', age:'Hace 16h', positions:buildPositions([{pos:'Housekeeper',total:5,cubierto:0,proceso:0},{pos:'Mesero',total:4,cubierto:0,proceso:0},{pos:'Steward',total:2,cubierto:0,proceso:0}]), period:'04–10 Dic', shift:'Tiempo \ncompleto'},
      // 2 ROJO — faltante >25% (ej. 4/10 = faltan 60%)
      {id:'REQ-2468', hotel:'Hotel Aurora Beach', zone:'Este', urg:'med', state:'autorizada', age:'Hace 14h', positions:buildPositions([{pos:'Electricista',total:3,cubierto:1,proceso:0},{pos:'Chef',total:4,cubierto:2,proceso:0},{pos:'Mesero',total:3,cubierto:1,proceso:0}]), period:'04–11 Dic', shift:'Tiempo \ncompleto'},
      {id:'REQ-2477', hotel:'Hotel Bahía Real', zone:'Sureste', urg:'low', state:'autorizada', age:'Hace 2h', positions:buildPositions([{pos:'Mesero',total:6,cubierto:2,proceso:0},{pos:'Steward',total:4,cubierto:2,proceso:0},{pos:'Recepción',total:2,cubierto:1,proceso:0}]), period:'07–10 Dic', shift:'Medio tiempo'},
      // 9 MIS REQUISICIONES — espejo exacto de la bandeja, todas "En proceso" (mine:true)
      // Mismos hoteles/zonas/urgencias/posiciones/periodos/modalidad que la bandeja para mantener paridad de casos.
      {id:'REQ-2551', mine:true, hotel:'Hotel Costa del Sol', zone:'Centro', urg:'high', state:'proceso', age:'Tomada hace 2h', positions:buildPositions([{pos:'Housekeeper',total:6,cubierto:0,proceso:0},{pos:'Mesero',total:3,cubierto:0,proceso:0}]), period:'01–07 Dic', shift:'Tiempo \ncompleto', took:'Hoy 13:10'},
      {id:'REQ-2559', mine:true, hotel:'Hotel Marina Bay', zone:'Oeste', urg:'high', state:'proceso', age:'Tomada hace 3h', positions:buildPositions([{pos:'Mantenimiento',total:4,cubierto:0,proceso:0},{pos:'Electricista',total:2,cubierto:0,proceso:0}]), period:'02–05 Dic', shift:'Medio tiempo', took:'Hoy 12:05'},
      {id:'REQ-2574', mine:true, hotel:'Hotel Vista Mar', zone:'Centro', urg:'low', state:'proceso', age:'Tomada hace 30min', positions:buildPositions([{pos:'Laundry',total:5,cubierto:0,proceso:0}]), period:'06–13 Dic', shift:'Tiempo \ncompleto', took:'Hoy 14:42'},
      {id:'REQ-2579', mine:true, hotel:'Hotel Caribe Plaza', zone:'Este', urg:'low', state:'proceso', age:'Tomada hace 15min', positions:buildPositions([{pos:'Steward',total:8,cubierto:0,proceso:0},{pos:'Laundry',total:3,cubierto:0,proceso:0}]), period:'08–14 Dic', shift:'Tiempo \ncompleto', took:'Hoy 14:55'},
      {id:'REQ-2562', mine:true, wasLiberada:true, hotel:'Hotel Punta Vista', zone:'Sur', urg:'high', state:'proceso', age:'Tomada hace 1d 5h', positions:buildPositions([{pos:'Chef',total:6,cubierto:5,proceso:0},{pos:'Steward',total:4,cubierto:3,proceso:0}]), period:'03–10 Dic', shift:'Tiempo \ncompleto', took:'Ayer 10:00'},
      {id:'REQ-2571', mine:true, wasLiberada:true, hotel:'Hotel Las Brisas', zone:'Oeste', urg:'med', state:'proceso', age:'Tomada hace 4h', positions:buildPositions([{pos:'Hoseman',total:8,cubierto:7,proceso:0}]), period:'05–08 Dic', shift:'Medio tiempo', took:'Hoy 11:00'},
      {id:'REQ-2583', mine:true, hotel:'Hotel Mirador del Valle', zone:'Norte', urg:'med', state:'proceso', age:'Tomada hace 10h', positions:buildPositions([{pos:'Housekeeper',total:5,cubierto:0,proceso:0},{pos:'Mesero',total:4,cubierto:0,proceso:0},{pos:'Steward',total:2,cubierto:0,proceso:0}]), period:'04–10 Dic', shift:'Tiempo \ncompleto', took:'Hoy 05:00'},
      {id:'REQ-2568', mine:true, wasLiberada:true, hotel:'Hotel Aurora Beach', zone:'Este', urg:'med', state:'proceso', age:'Tomada hace 8h', positions:buildPositions([{pos:'Electricista',total:3,cubierto:1,proceso:0},{pos:'Chef',total:4,cubierto:2,proceso:0},{pos:'Mesero',total:3,cubierto:1,proceso:0}]), period:'04–11 Dic', shift:'Tiempo \ncompleto', took:'Hoy 07:00'},
      {id:'REQ-2577', mine:true, wasLiberada:true, hotel:'Hotel Bahía Real', zone:'Sureste', urg:'low', state:'proceso', age:'Tomada hace 1h', positions:buildPositions([{pos:'Mesero',total:6,cubierto:2,proceso:0},{pos:'Steward',total:4,cubierto:2,proceso:0},{pos:'Recepción',total:2,cubierto:1,proceso:0}]), period:'07–10 Dic', shift:'Medio tiempo', took:'Hoy 14:00'},
      // Hotel Ejemplo Parcial — En proceso CON MISMATCH DE MODALIDAD.
      // Caso ejemplo paralelo al REQ-2402 (Marina Bay parcial) pero todavía
      // en proceso: la requi venía liberada con 3 cubiertos (Mantenimiento 2,
      // Electricista 1) en los que el reclutador anterior asignó colaboradores
      // que NO cumplen el 100% de los requisitos (TC requerido vs MT/PH
      // asignado). Sirve para mostrar el caso ejemplo en proceso de mismatch
      // heredado por liberación + asignaciones del reclutador en curso.
      {id:'REQ-2598', mine:true, wasLiberada:true, pinLast:true, hotel:'Hotel Ejemplo Parcial', zone:'Centro', urg:'high', state:'proceso', age:'Tomada hace 6h', positions:buildPositions([{pos:'Mantenimiento',total:4,cubierto:2,proceso:0},{pos:'Electricista',total:2,cubierto:1,proceso:0}]), period:'02–05 Dic', shift:'Medio tiempo', took:'Hoy 09:00'},
      // ─────────────────────────────────────────────────────────────────────
      // 9 PARCIALES — duplicados de los 9 "En proceso" pero ya cerrados como
      // parcial. Preservan hotel/zona/urgencia/posiciones/periodo/modalidad y
      // los flags de contexto (wasLiberada) del original. Cubierto > 0 y
      // vacantes pendientes > 0 en cada caso (definición de "parcial").
      // ─────────────────────────────────────────────────────────────────────
      {id:'REQ-2401', mine:true, hotel:'Hotel Costa del Sol', zone:'Centro', urg:'high', state:'parcial', age:'Cerrada hoy', positions:buildPositions([{pos:'Housekeeper',total:6,cubierto:4,proceso:0},{pos:'Mesero',total:3,cubierto:1,proceso:0}]), period:'01–07 Dic', shift:'Tiempo \ncompleto', took:'Hoy 13:10'},
      {id:'REQ-2402', mine:true, hotel:'Hotel Marina Bay', zone:'Oeste', urg:'high', state:'parcial', age:'Cerrada hoy', positions:buildPositions([{pos:'Mantenimiento',total:4,cubierto:2,proceso:0},{pos:'Electricista',total:2,cubierto:1,proceso:0}]), period:'02–05 Dic', shift:'Medio tiempo', took:'Hoy 12:05'},
      {id:'REQ-2403', mine:true, hotel:'Hotel Vista Mar', zone:'Centro', urg:'low', state:'parcial', age:'Cerrada ayer', positions:buildPositions([{pos:'Laundry',total:5,cubierto:3,proceso:0}]), period:'06–13 Dic', shift:'Tiempo \ncompleto', took:'Hoy 14:42'},
      {id:'REQ-2404', mine:true, hotel:'Hotel Caribe Plaza', zone:'Este', urg:'low', state:'parcial', age:'Cerrada ayer', positions:buildPositions([{pos:'Steward',total:8,cubierto:5,proceso:0},{pos:'Laundry',total:3,cubierto:2,proceso:0}]), period:'08–14 Dic', shift:'Tiempo \ncompleto', took:'Hoy 14:55'},
      {id:'REQ-2405', mine:true, wasLiberada:true, hotel:'Hotel Punta Vista', zone:'Sur', urg:'high', state:'parcial', age:'Cerrada parcial', positions:buildPositions([{pos:'Chef',total:6,cubierto:6,proceso:0},{pos:'Steward',total:4,cubierto:3,proceso:0}]), period:'03–10 Dic', shift:'Tiempo \ncompleto', took:'Ayer 10:00'},
      {id:'REQ-2406', mine:true, wasLiberada:true, hotel:'Hotel Las Brisas', zone:'Oeste', urg:'med', state:'parcial', age:'Cerrada ayer', positions:buildPositions([{pos:'Hoseman',total:8,cubierto:7,proceso:0}]), period:'05–08 Dic', shift:'Medio tiempo', took:'Hoy 11:00'},
      {id:'REQ-2407', mine:true, hotel:'Hotel Mirador del Valle', zone:'Norte', urg:'med', state:'parcial', age:'Cerrada ayer', positions:buildPositions([{pos:'Housekeeper',total:5,cubierto:3,proceso:0},{pos:'Mesero',total:4,cubierto:2,proceso:0},{pos:'Steward',total:2,cubierto:1,proceso:0}]), period:'04–10 Dic', shift:'Tiempo \ncompleto', took:'Hoy 05:00'},
      {id:'REQ-2408', mine:true, wasLiberada:true, hotel:'Hotel Aurora Beach', zone:'Este', urg:'med', state:'parcial', age:'Cerrada hoy', positions:buildPositions([{pos:'Electricista',total:3,cubierto:2,proceso:0},{pos:'Chef',total:4,cubierto:3,proceso:0},{pos:'Mesero',total:3,cubierto:2,proceso:0}]), period:'04–11 Dic', shift:'Tiempo \ncompleto', took:'Hoy 07:00'},
      {id:'REQ-2409', mine:true, wasLiberada:true, hotel:'Hotel Bahía Real', zone:'Sureste', urg:'low', state:'parcial', age:'Cerrada parcial', positions:buildPositions([{pos:'Mesero',total:6,cubierto:5,proceso:0},{pos:'Steward',total:4,cubierto:3,proceso:0},{pos:'Recepción',total:2,cubierto:2,proceso:0}]), period:'07–10 Dic', shift:'Medio tiempo', took:'Hoy 14:00'},
      // ─────────────────────────────────────────────────────────────────────
      // 9 CUBIERTAS — espejo "happy path" de los 9 En proceso / 9 Parciales.
      // Mismos hoteles/zonas/urgencias/posiciones/periodo/modalidad/flags
      // (wasLiberada, took). Todas las vacantes cerradas exitosamente
      // (cubierto = total en cada posición).
      //
      // EXCEPCIÓN — REQ-2302 Hotel Marina Bay: cerrada exitosamente y
      // operativa, pero conserva visualmente el "match parcial" heredado
      // del caso original (mismatch de modalidad en 2 de las 4 vacantes
      // de Mantenimiento). Ver MOD_MISMATCH_OVERRIDES y
      // MISMATCH_ASIG_SCHEDULES (entrada REQ-2302) más abajo.
      // ─────────────────────────────────────────────────────────────────────
      {id:'REQ-2301', mine:true, hotel:'Hotel Costa del Sol', zone:'Centro', urg:'high', state:'cubierta', age:'Cerrada hoy', positions:buildPositions([{pos:'Housekeeper',total:6,cubierto:6,proceso:0},{pos:'Mesero',total:3,cubierto:3,proceso:0}]), period:'01–07 Dic', shift:'Tiempo \ncompleto', took:'Hoy 13:10'},
      {id:'REQ-2302', mine:true, hotel:'Hotel Marina Bay', zone:'Oeste', urg:'high', state:'cubierta', age:'Cerrada hoy', positions:buildPositions([{pos:'Mantenimiento',total:4,cubierto:4,proceso:0},{pos:'Electricista',total:2,cubierto:2,proceso:0}]), period:'02–05 Dic', shift:'Medio tiempo', took:'Hoy 12:05'},
      {id:'REQ-2303', mine:true, hotel:'Hotel Vista Mar', zone:'Centro', urg:'low', state:'cubierta', age:'Cerrada ayer', positions:buildPositions([{pos:'Laundry',total:5,cubierto:5,proceso:0}]), period:'06–13 Dic', shift:'Tiempo \ncompleto', took:'Hoy 14:42'},
      {id:'REQ-2304', mine:true, hotel:'Hotel Caribe Plaza', zone:'Este', urg:'low', state:'cubierta', age:'Cerrada ayer', positions:buildPositions([{pos:'Steward',total:8,cubierto:8,proceso:0},{pos:'Laundry',total:3,cubierto:3,proceso:0}]), period:'08–14 Dic', shift:'Tiempo \ncompleto', took:'Hoy 14:55'},
      {id:'REQ-2305', mine:true, wasLiberada:true, hotel:'Hotel Punta Vista', zone:'Sur', urg:'high', state:'cubierta', age:'Cerrada hoy', positions:buildPositions([{pos:'Chef',total:6,cubierto:6,proceso:0},{pos:'Steward',total:4,cubierto:4,proceso:0}]), period:'03–10 Dic', shift:'Tiempo \ncompleto', took:'Ayer 10:00'},
      {id:'REQ-2306', mine:true, wasLiberada:true, hotel:'Hotel Las Brisas', zone:'Oeste', urg:'med', state:'cubierta', age:'Cerrada ayer', positions:buildPositions([{pos:'Hoseman',total:8,cubierto:8,proceso:0}]), period:'05–08 Dic', shift:'Medio tiempo', took:'Hoy 11:00'},
      {id:'REQ-2307', mine:true, hotel:'Hotel Mirador del Valle', zone:'Norte', urg:'med', state:'cubierta', age:'Cerrada ayer', positions:buildPositions([{pos:'Housekeeper',total:5,cubierto:5,proceso:0},{pos:'Mesero',total:4,cubierto:4,proceso:0},{pos:'Steward',total:2,cubierto:2,proceso:0}]), period:'04–10 Dic', shift:'Tiempo \ncompleto', took:'Hoy 05:00'},
      {id:'REQ-2308', mine:true, wasLiberada:true, hotel:'Hotel Aurora Beach', zone:'Este', urg:'med', state:'cubierta', age:'Cerrada hoy', positions:buildPositions([{pos:'Electricista',total:3,cubierto:3,proceso:0},{pos:'Chef',total:4,cubierto:4,proceso:0},{pos:'Mesero',total:3,cubierto:3,proceso:0}]), period:'04–11 Dic', shift:'Tiempo \ncompleto', took:'Hoy 07:00'},
      {id:'REQ-2309', mine:true, wasLiberada:true, hotel:'Hotel Bahía Real', zone:'Sureste', urg:'low', state:'cubierta', age:'Cerrada hoy', positions:buildPositions([{pos:'Mesero',total:6,cubierto:6,proceso:0},{pos:'Steward',total:4,cubierto:4,proceso:0},{pos:'Recepción',total:2,cubierto:2,proceso:0}]), period:'07–10 Dic', shift:'Medio tiempo', took:'Hoy 14:00'},
      // Caso ejemplo cerrado parcial — se conserva para mantener visible al
      // final el caso de referencia (Hotel Ejemplo Parcial).
      {id:'REQ-2410', mine:true, hotel:'Hotel Ejemplo Parcial', zone:'Este', urg:'low', state:'parcial', age:'Cerrada parcial', positions:buildPositions([{pos:'Mantenimiento',total:3,cubierto:2,proceso:0},{pos:'Hoseman',total:2,cubierto:1,proceso:0}]), period:'25–30 Nov', shift:'Tiempo \ncompleto', took:'Domingo 18:45'},
    ];

    // ===== Modelo COLABORATIVO de requisición: reclutadores participantes + historial =====
    // Una requisición ya no tiene dueño único: r.takers[] son los reclutadores que la trabajan.
    // r.history[] es el timeline con actor (quién tomó/se unió/asignó/salió). r.mine = soy taker.
    const ME = {id:'me', nm:'Tú', rol:'Líder de Grupo'};
    const REC_ANA = {id:'al', nm:'Ana López', rol:'Reclutadora'};
    const REC_CARLOS = {id:'cr', nm:'Carlos Ruiz', rol:'Reclutadora'};
    const REC_BEA = {id:'bc', nm:'Beatriz Cruz', rol:'Reclutadora'};
    const _now = Date.now();
    const mins = m => _now - m*60000;
    function pushHist(r, ev){ if(!r.history) r.history=[]; r.history.push({ts: ev.ts!=null?ev.ts:Date.now(), ...ev}); }
    REQUIS.forEach(r=>{
      if(!r.history) r.history=[];
      if(!r.takers) r.takers = r.mine ? [{...ME, ts:mins(120)}] : [];
      if(r.mine && !r.history.length) r.history.push({ts:mins(120), who:ME, type:'take'});
    });
    // Demo colaborativo: requisiciones de la BANDEJA ya trabajadas por OTROS reclutadores
    // (aparecen con badge "En colaboración · N" y botón "Unirme"), y una MÍA con co-reclutador.
    (function seedColab(){
      const set = (id, takers, hist) => { const r=REQUIS.find(x=>x.id===id); if(r){ r.takers=takers; r.history=hist; } };
      set('REQ-2462', [{...REC_ANA, ts:mins(300)}], [
        {ts:mins(300), who:REC_ANA, type:'take'},
        {ts:mins(280), who:REC_ANA, type:'assign', pos:'Chef', names:['Diego Fuentes','Marcela Ruiz','Iván Soto','Paola Méndez','Luis Cano']},
        {ts:mins(120), who:REC_ANA, type:'assign', pos:'Steward', names:['Jorge Lima','Ana Vega','Saúl Ortiz']},
      ]);
      set('REQ-2471', [{...REC_CARLOS, ts:mins(480)}], [
        {ts:mins(480), who:REC_CARLOS, type:'take'},
        {ts:mins(60), who:REC_CARLOS, type:'assign', pos:'Hoseman', names:['Pedro Salinas','Mario Gil','Tomás Bravo','Rocío Paz','Hugo Lara','Sara Mena','Beto Ríos']},
      ]);
      set('REQ-2468', [{...REC_ANA, ts:mins(840)},{...REC_BEA, ts:mins(200)}], [
        {ts:mins(840), who:REC_ANA, type:'take'},
        {ts:mins(800), who:REC_ANA, type:'assign', pos:'Chef', names:['Nadia Cruz','Omar Téllez']},
        {ts:mins(200), who:REC_BEA, type:'take'},
        {ts:mins(180), who:REC_BEA, type:'assign', pos:'Electricista', names:['Raúl Pinto']},
        {ts:mins(160), who:REC_BEA, type:'assign', pos:'Mesero', names:['Karla Díaz']},
      ]);
      // Bahía Real: venía con avance parcial; ahora la trabaja Bea → "En colaboración"
      set('REQ-2477', [{...REC_BEA, ts:mins(360)}], [
        {ts:mins(360), who:REC_BEA, type:'take'},
        {ts:mins(330), who:REC_BEA, type:'assign', pos:'Mesero', names:['Lucía Parra','Iker Sosa']},
        {ts:mins(150), who:REC_BEA, type:'assign', pos:'Steward', names:['Noa Frías','Beni Mar']},
        {ts:mins(90), who:REC_BEA, type:'assign', pos:'Recepción', names:['Sara Mena']},
      ]);
      // Una MÍA con co-reclutador (Carlos también participa) → timeline multi-actor en "Mis requisiciones"
      set('REQ-2562', [{...ME, ts:mins(1500)},{...REC_CARLOS, ts:mins(90)}], [
        {ts:mins(1500), who:ME, type:'take'},
        {ts:mins(1400), who:ME, type:'assign', pos:'Chef', names:['Sergio Vidal','Lucía Parra','Iker Sosa','Noa Frías','Beni Mar']},
        {ts:mins(90), who:REC_CARLOS, type:'take'},
        {ts:mins(60), who:REC_CARLOS, type:'assign', pos:'Steward', names:['Karen Ruiz','Diana Cruz','Saúl Vela']},
      ]);
    })();

    const POOL = [
      {id:'C-4521', nm:'María López Hernández', pos:'Housekeeper', zone:'Centro', eng:'Avanzado', exp:'4 años'},
      {id:'C-3398', nm:'Ana Sofía Reyes', pos:'Mesero', zone:'Centro', eng:'Avanzado', exp:'2 años'},
      {id:'C-7741', nm:'Laura Castillo Ramos', pos:'Laundry', zone:'Centro', eng:'Básico', exp:'1 año'},
      {id:'C-9901', nm:'Mariana Solís', pos:'Mesero', zone:'Centro', eng:'Avanzado', exp:'3 años'},
      {id:'C-4012', nm:'Patricia Núñez', pos:'Housekeeper', zone:'Centro', eng:'Intermedio', exp:'2 años'},
      {id:'C-7812', nm:'Carlos Ruiz Méndez', pos:'Chef', zone:'Sur', eng:'Conversacional', exp:'6 años'},
      {id:'C-9023', nm:'Luis Pérez Gómez', pos:'Steward', zone:'Sur', eng:'Intermedio', exp:'2 años'},
      {id:'C-1108', nm:'Rosario Flores Díaz', pos:'Housekeeper', zone:'Sur', eng:'Intermedio', exp:'5 años'},
      {id:'C-3344', nm:'Roberto Cruz', pos:'Hoseman', zone:'Sur', eng:'Intermedio', exp:'2 años'},
      {id:'C-5582', nm:'Julia Mendoza Torres', pos:'Housekeeper', zone:'Oeste', eng:'Intermedio', exp:'3 años'},
      {id:'C-9912', nm:'José Aguilar', pos:'Steward', zone:'Oeste', eng:'Intermedio', exp:'1 año'},
      {id:'C-5841', nm:'Pedro Salinas', pos:'Hoseman', zone:'Este', eng:'Básico', exp:'1 año'},
      {id:'C-2299', nm:'Diego Hernández Vega', pos:'Chef', zone:'Noroeste', eng:'Avanzado', exp:'5 años'},
      {id:'C-7700', nm:'Sandra Vázquez', pos:'Housekeeper', zone:'Oeste', eng:'Intermedio', exp:'2 años'},
      {id:'C-7780', nm:'Tomás Ramírez', pos:'Mantenimiento', zone:'Sureste', eng:'Básico', exp:'1 año'},
      {id:'C-6841', nm:'Pedro Salgado', pos:'Hoseman', zone:'Este', eng:'Básico', exp:'2 años'},
      // Recepción · Zona Sureste — perfect matches para REQ-2577 pi=2
      {id:'C-8201', nm:'Valeria Ortiz Cano', pos:'Recepción', zone:'Sureste', eng:'Avanzado', exp:'3 años'},
      {id:'C-8214', nm:'Andrés Morales Téllez', pos:'Recepción', zone:'Sureste', eng:'Avanzado', exp:'2 años'},
      {id:'C-8227', nm:'Camila Rivero', pos:'Recepción', zone:'Sureste', eng:'Avanzado', exp:'3 años'},
      {id:'C-8235', nm:'Iván Quintero Soto', pos:'Recepción', zone:'Sureste', eng:'Avanzado', exp:'2 años'},
      {id:'C-8246', nm:'Sofía Beltrán Núñez', pos:'Recepción', zone:'Sureste', eng:'Avanzado', exp:'3 años'},
      {id:'C-8258', nm:'Daniel Espinoza', pos:'Recepción', zone:'Sureste', eng:'Avanzado', exp:'2 años'},
    ];

    const state = {
      tab:'autorizadas', view:'board',
      query:'', fUrg:'', fPos:'', fZone:'', fHotel:'', fSem:'', fEstado:'', fContrato:'', fMod:'', fSub:'todas',
      openDD:null, selected:null,
      assignReqId:null, assignPosIdx:null, assignSel:null,
    };
    const HOTELS = [...new Set(REQUIS.map(r=>r.hotel))].sort();

    const listForTab = () => REQUIS.filter(r => state.tab==='autorizadas' ? !r.mine : r.mine);
    function applyFilters(arr){
      const q = state.query.trim().toLowerCase();
      return arr.filter(r=>{
        if(state.fUrg && r.urg !== state.fUrg) return false;
        if(state.fPos && !r.positions.some(p=>p.pos===state.fPos)) return false;
        if(state.fZone && r.zone !== state.fZone) return false;
        if(state.fHotel && r.hotel !== state.fHotel) return false;
        if(state.fSem){
          const ctx = reqContext(r);
          if(state.fSem==='nueva' && ctx?.key !== 'nueva') return false;
          if(state.fSem==='colab' && ctx?.key !== 'colab') return false;
        }
        if(state.fEstado){
          if(r.state !== state.fEstado) return false;
        }
        if(state.fContrato){
          const dd = reqDerive(r);
          if(!dd.reqContratos.includes(state.fContrato)) return false;
        }
        if(state.fMod){
          const dd = reqDerive(r);
          if(!dd.reqMods.includes(state.fMod)) return false;
        }
        if(state.tab==='mias' && state.fSub && state.fSub!=='todas' && r.state !== state.fSub) return false;
        if(q){
          const blob = (r.id+' '+r.hotel+' '+r.zone+' '+r.positions.map(p=>p.pos).join(' ')).toLowerCase();
          if(!blob.includes(q)) return false;
        }
        return true;
      });
    }
    const urgRank = u => u==='high'?0:u==='med'?1:2;
    // Inserta cards "nuevas" en el centro del grupo de "liberadas".
    // Si hay 4 liberadas y 1 nueva → [L, L, N, L, L]
    // Si hay 2 liberadas y 2 nuevas → [L, N, L, N]
    // Si hay 1 liberada y 1 nueva → [L, N]
    const distributeCenter = (base, inserts) => {
      if(!inserts.length) return base.slice();
      if(!base.length) return inserts.slice();
      const out = base.slice();
      const total = base.length + inserts.length;
      // Calcula la posición ideal de cada insert dentro del array final
      inserts.forEach((it, i) => {
        // posiciones equiespaciadas en el centro
        const pos = Math.round(((i + 1) * total) / (inserts.length + 1));
        out.splice(Math.min(pos, out.length), 0, it);
      });
      return out;
    };
    // Orden dentro de columna: las requisiciones activas (Autorizadas + En
    // colaboración) van primero, ordenadas por urgencia. El resto (cards sin
    // contexto, p. ej. mías) van al final.
    // Cards con `pinLast:true` se fuerzan al final de la columna independiente
    // de su urgencia — útil para casos ejemplo que el usuario quiere conservar
    // como referencia visible al final de la lista.
    const sortReqs = arr => {
      const sorted = arr.slice().sort((a,b)=>{
        // pinLast siempre al final
        if(!!a.pinLast !== !!b.pinLast) return a.pinLast ? 1 : -1;
        return urgRank(a.urg)-urgRank(b.urg);
      });
      const activas = sorted.filter(r=> !r.mine && ['nueva','colab'].includes(reqContext(r)?.key) && !r.pinLast);
      const resto   = sorted.filter(r=> r.pinLast || r.mine || !['nueva','colab'].includes(reqContext(r)?.key));
      return [...activas, ...resto];
    };
    function totals(req){
      const total = req.positions.reduce((s,p)=>s+p.total,0);
      const cub   = req.positions.reduce((s,p)=>s+p.cubierto,0);
      const proc  = req.positions.reduce((s,p)=>s+p.proceso,0);
      return {total, cub, proc, vac:total-cub-proc, pct: total? Math.round(cub*100/total) : 0};
    }

    // ===== RENDER =====
    window.__renderRequi = function(){
      const root = document.getElementById('requi-root');
      if(!root) return;
      // Tabs
      document.querySelectorAll('#requi-tabs button').forEach(b=>b.classList.toggle('active', b.dataset.tab===state.tab));
      document.querySelectorAll('#requi-views button').forEach(b=>b.classList.toggle('active', b.dataset.view===state.view));

      // KPI counts
      const aut = REQUIS.filter(r=>!r.mine).length;
      const mias = REQUIS.filter(r=>r.mine).length;
      const urg = REQUIS.filter(r=>!r.mine && r.urg==='high').length;
      const setT=(id,v)=>{const el=document.getElementById(id); if(el) el.textContent=v};
      setT('kpi-aut-val', aut); setT('kpi-mias-val', mias); setT('kpi-urg-val', urg);
      setT('tab-aut-num', aut); setT('tab-mias-num', mias);

      renderFilters();
      renderSubtabs();

      // Title
      const filtered = sortReqs(applyFilters(listForTab()));
      const titleEl = document.getElementById('requi-section-title');
      const subEl = document.getElementById('requi-section-sub');
      const iconEl = document.getElementById('requi-section-icon');
      if(titleEl) titleEl.textContent = state.tab==='autorizadas' ? 'Bandeja de Autorizadas' : 'Mis requisiciones';
      if(iconEl) iconEl.textContent = state.tab==='autorizadas' ? 'inbox' : 'assignment_ind';
      if(subEl) subEl.textContent = `${filtered.length} requisicion${filtered.length===1?'':'es'} · ${state.tab==='autorizadas'?'ordenadas por urgencia':'tomadas por ti'}`;

      const cont = document.getElementById('requi-content');
      if(!cont) return;
      if(filtered.length===0){
        cont.innerHTML = `<div class="req-empty"><span class="mi">inbox</span><h3>Sin requisiciones que coincidan</h3><p>Ajusta los filtros o limpia la búsqueda.</p></div>`;
        return;
      }
      if(state.view==='cards') cont.innerHTML = renderCards(filtered);
      else if(state.view==='board') cont.innerHTML = renderBoard(filtered);
      else cont.innerHTML = renderTable(filtered);
    };

    // ===== SUB-TABS Mis Requisiciones =====
    function renderSubtabs(){
      const wrap = document.getElementById('requi-subtabs-wrap');
      if(!wrap) return;
      wrap.style.display='none'; wrap.innerHTML=''; return;
      const mine = REQUIS.filter(r=>r.mine);
      const counts = {
        todas: mine.length,
        proceso: mine.filter(r=>r.state==='proceso').length,
        cubierta: mine.filter(r=>r.state==='cubierta').length,
        parcial: mine.filter(r=>r.state==='parcial').length,
      };
      const subs = [
        {k:'todas',       lbl:'Todas',       ic:'inbox',         tone:'all'},
        {k:'proceso',     lbl:'En proceso',  ic:'autorenew',     tone:'proceso'},
        {k:'parcial',     lbl:'Parciales',   ic:'warning',       tone:'parcial'},
        {k:'cubierta',    lbl:'Cubiertas',   ic:'check_circle',  tone:'cubierta'},
      ];
      wrap.innerHTML = `<div class="recl-segmented requi-subtabs">${
        subs.map(s=>`<button class="${state.fSub===s.k?'active':''}" data-tone="${s.tone}" onclick="window.__requiSetSub('${s.k}')">
          <span class="mi">${s.ic}</span>
          <span>${s.lbl}</span>
          <span class="requi-tab-count" data-tone="${s.tone}">${counts[s.k]}</span>
        </button>`).join('')
      }</div>`;
    }

    // ===== FILTROS (estilo recl-filter-grp) =====
    function renderFilters(){
      const wrap = document.getElementById('requi-filters');
      if(!wrap) return;
      const cfg = [
        {key:'fUrg', lbl:'Estados de urgencias', opts:[['','Todas'],['high','Urgente'],['med','Pronto'],['low','Normal']]},
        {key:'fEstado', lbl:'Estado de la requisición', opts:[['','Todos'],['proceso','En proceso'],['parcial','Parciales'],['cubierta','Cubiertas']]},
        {key:'fSem', lbl:'Tipo de requisicion', opts:[['','Todas'],['nueva','Autorizadas|Ya puede recibir colaboradores'],['colab','En colaboración|Varios reclutadores trabajándola']]},
        {key:'fContrato', lbl:'Tipo de contrato', opts:[['','Todos'],['Fijo','Fijo|Recurrente'],['Temporal','Temporal|Por evento o fechas']]},
        {key:'fMod', lbl:'Modalidad', opts:[['','Todas'],['Tiempo \ncompleto','Tiempo \ncompleto'],['Medio tiempo','Medio tiempo'],['Por horas','Por horas']]},
        {key:'fPos', lbl:'Posición', opts:[['','Todas'], ...POSITIONS.map(p=>[p,p])]},
        {key:'fHotel', lbl:'Hotel', opts:[['','Todos'], ...HOTELS.map(h=>[h,h])]},
        {key:'fZone', lbl:'Zona', opts:[['','Todas'], ...ZONES.map(z=>[z,z])]},
      ].filter(c => {
        // "Estados de urgencias" y "Estado de la requisición" sólo aplican a Mis requisiciones.
        // El "Tipo de requisición" (nueva/liberada) sólo aplica a Bandeja autorizadas.
        if(state.tab === 'autorizadas' && c.key === 'fUrg') return false;
        if(state.tab === 'autorizadas' && c.key === 'fEstado') return false;
        if(state.tab === 'mias' && c.key === 'fSem') return false;
        return true;
      });
      const hasAny = cfg.some(c=>state[c.key]) || state.query;
      const filterCount = cfg.filter(c=>state[c.key]).length + (state.query?1:0);
      const searchHTML = `<div class="recl-search" style="width: ${hasAny?'320':'500'}px;transition:width .25s ease">
            <span class="mi">search</span>
            <input id="requi-search-input" placeholder="Buscar por ID, hotel, posición o zona…" oninput="window.__requiSearch(this.value)" value="${escR(state.query||'')}">
            <span class="kbd">⌘F</span>
          </div>`;
      wrap.innerHTML = searchHTML + cfg.map(c=>{
        const cur = state[c.key];
        const curLbl = cur ? (c.opts.find(o=>o[0]===cur)?.[1] || cur) : 'Todas';
        const fmtLbl = (raw) => {
          if(c.key==='fSem' && raw && raw.includes('|')){
            const [head, tail] = raw.split('|');
            return `<span class="sem-opt-head">${escR(head)}</span><span class="sem-opt-sub"> · ${escR(tail)}</span>`;
          }
          return escR(raw);
        };
        const open = state.openDD===c.key;
        const dotForUrg = c.key==='fUrg' && cur ? `<span class="recl-fdd-dot" style="background:${URG_COLOR[cur]}"></span>` : '';
        const SEM_COLOR = {nueva:'#FF8E00', colab:'#0D9488'};
        const dotForSem = c.key==='fSem' && cur ? `<span class="recl-fdd-dot" style="background:${SEM_COLOR[cur]}"></span>` : '';
        const EST_COLOR = {proceso:'#FFC128', parcial:'#3B7DDD', cubierta:'#1FA84A'};
        const dotForEst = c.key==='fEstado' && cur ? `<span class="recl-fdd-dot" style="background:${EST_COLOR[cur]}"></span>` : '';
        return `<div class="recl-filter-grp ${cur?'active':''} ${open?'open':''}" onclick="event.stopPropagation();window.__requiToggleDD('${c.key}')">
          <span class="lbl-grp">${c.lbl}</span>
          <span class="val">${dotForUrg}${dotForSem}${dotForEst}${fmtLbl(curLbl)}</span>
          <span class="mi">${open?'expand_less':'expand_more'}</span>
          ${open ? `<div class="recl-fdd" onclick="event.stopPropagation()">
            ${c.opts.map(o=>`<div class="recl-fdd-item ${o[0]===''?'all':''} ${cur===o[0]?'selected':''}" onclick="window.__requiPickFilter('${c.key}','${escR(o[0])}')">
              ${c.key==='fUrg' && o[0] ? `<span class="recl-fdd-dot" style="background:${URG_COLOR[o[0]]}"></span>` : ''}
              ${c.key==='fSem' && o[0] ? `<span class="recl-fdd-dot" style="background:${SEM_COLOR[o[0]]}"></span>` : ''}
              ${c.key==='fEstado' && o[0] ? `<span class="recl-fdd-dot" style="background:${EST_COLOR[o[0]]}"></span>` : ''}
              <span>${fmtLbl(o[1])}</span>
              <span class="mi">check</span>
            </div>`).join('')}
          </div>` : ''}
        </div>`;
      }).join('') + (hasAny ? `<button class="recl-filter-clear" onclick="window.__requiClearFilters()"><span class="mi">filter_alt_off</span>Limpiar todo<span class="badge-n">${filterCount}</span></button>` : '');
    }

    // ===== Contexto de la requisición autorizada =====
    // Modelo colaborativo (RR-15): una requisición autorizada solo tiene dos
    // contextos posibles en la bandeja —
    //   En colaboración → ya tiene otros reclutadores participando (r.takers)
    //   Autorizadas     → libre para recibir colaboradores (con o sin avance)
    // Ya NO existe "Liberada": nadie "libera" una requisición, los reclutadores
    // entran (RF-39) y salen (RF-03) sin bloquearla ni perderla.
    function reqContext(r){
      const t = totals(r);
      const otros = r.takers ? r.takers.filter(x=>x.id!=='me').length : 0;
      if(otros) return {key:'colab', lbl:'En colaboración', sub:`${otros} reclutador${otros>1?'es':''} trabajándola`, ic:'groups'};
      if(t.cub >= t.total) return null; // ya completa
      return {key:'nueva', lbl:'Autorizadas', sub:'Ya puede recibir colaboradores', ic:'fiber_new'};
    }

    // ===== CARD (recl-card adaptada) =====
    function cardHTML(r, opts){
      const hideRibbon = !!(opts && opts.hideRibbon);
      const t = totals(r);
      const sub = SUBSTATES[r.state];
      const stColor = URG_COLOR[r.urg];
      const isMine = !!r.mine;
      const othersN = r.takers ? r.takers.filter(x=>x.id!=='me').length : 0;
      const _d = reqDerive(r);
      // El ribbon de contexto (Autorizadas / Liberada) solo aplica en la Bandeja.
      // En "Mis requisiciones" no tiene sentido — ya las tomaste.
      const ctx = !isMine ? reqContext(r) : null;

      const footActions = isMine
        ? (r.state === 'proceso'
          ? `<button class="assign-btn" style="background:transparent;color:var(--ink-2);border-color:var(--line-2)" onclick="event.stopPropagation();window.__requiOpen('${r.id}','detalles')"><span class="mi">visibility</span>Ver detalles</button>
             <button class="req-take-btn" onclick="event.stopPropagation();window.__requiOpen('${r.id}','asignacion')"><span class="mi">person_add</span>Asignar colaboradores</button>`
          : `<button class="req-take-btn" onclick="event.stopPropagation();window.__requiOpen('${r.id}','detalles')"><span class="mi">visibility</span>Ver requisición</button>`)
        : `<button class="assign-btn" style="background:transparent;color:var(--ink-2);border-color:var(--line-2)" onclick="event.stopPropagation();window.__requiOpen('${r.id}','detalles')"><span class="mi">visibility</span>Ver detalle</button>
           <button class="req-take-btn" onclick="event.stopPropagation();window.__requiTake('${r.id}')"><span class="mi">${othersN?'group_add':'flag'}</span>${othersN?'Unirme':'Tomar requisición'}</button>`;

      // Badge especial: auto-asignación por menor carga (REQ-2598).
      // La requi estuvo 24h sin que ningún reclutador la tomara, así que
      // el sistema la asignó a la reclutadora con menor carga.
      const autoBadge = (r.id === 'REQ-2598') ? `
        <div class="req-auto-asg-banner">
          <span class="mi">bolt</span>
          <span class="lbl"><strong>Auto-asignada por el sistema</strong> · 24h sin self-pick</span>
          <button class="req-auto-asg-help" onclick="event.stopPropagation();window.__requiAutoAsgInfo()" aria-label="Más información"><span class="mi">help</span></button>
        </div>` : '';

      const showRibbon = ctx && !hideRibbon;
      const colabMini = (ctx && ctx.key==='colab')
        ? ` <span class="req-colab-mini" title="${othersN} reclutador${othersN>1?'es':''} trabajándola"><span class="mi">groups</span>${othersN}</span>`
        : '';
      return `<div class="recl-card requi${showRibbon?' has-ctx':''}" data-ctx="${ctx?ctx.key:''}" data-req-id="${r.id}" style="--card-st:${stColor}" onclick="window.__requiOpen('${r.id}')">
        ${showRibbon?`<div class="req-ctx-ribbon" data-ctx="${ctx.key}"><span class="mi">${ctx.ic}</span><span class="ctx-lbl">${ctx.lbl}</span><span class="ctx-sub">· ${ctx.sub}</span></div>`:''}
        ${autoBadge}
        <div class="recl-card-top">
          <div class="recl-avatar req-avatar"><span class="mi">apartment</span><span class="recl-st-ring"></span></div>
          <div class="nm">
            <div class="name">${escR(r.hotel)}</div>
            <div class="doc">${escR(r.id)}${colabMini}</div>
          </div>
          <span class="req-urg-pill ${r.urg}"><span class="dot"></span>${URG_LABELS[r.urg]}</span>
        </div>
        <div class="recl-card-meta">
          <span class="meta-pill mod"><span class="mi">event</span>${escR(r.period)}</span>
          <span class="meta-pill zone"><span class="mi">place</span>Zona ${escR(r.zone)}</span>
          ${(()=>{
            // Contrato a nivel requisición: si las posiciones tienen distintos contratos → Mixto.
            // El detalle por posición vive en "Schedule del hotel".
            const cs = (_d.reqContratos && _d.reqContratos.length) ? _d.reqContratos : ['Fijo'];
            if(cs.length > 1){
              return `<span class="meta-pill ctr" data-c="mix"><span class="mi">assignment_ind</span>Mixto · Fijo y Temporal</span>`;
            }
            const c = cs[0];
            const k = c==='Fijo'?'fijo':'temp';
            return `<span class="meta-pill ctr" data-c="${k}"><span class="mi">assignment_ind</span>${escR(c)}</span>`;
          })()}
          ${(()=>{
            // Modalidad a nivel requisición: si hay >1 modalidad entre posiciones → Varias modalidades.
            const ms = (_d.reqMods && _d.reqMods.length) ? _d.reqMods : [r.shift || 'Tiempo \ncompleto'];
            if(ms.length > 1){
              return `<span class="meta-pill modw" data-m="mix"><span class="mi">schedule</span>Varias modalidades</span>`;
            }
            const m = ms[0];
            const k = m==='Tiempo \ncompleto'?'tc' : (m==='Medio tiempo'?'mt':'ph');
            return `<span class="meta-pill modw" data-m="${k}"><span class="mi">schedule</span>${escR(m)}</span>`;
          })()}
        </div>
        <div class="req-cov-line">
          <div class="req-cov-line-top">
            ${(()=>{const d=domSemaforo(r);return `<span class="req-sem-icon" data-c="${d}" title="Semáforo: ${d}"><span class="mi">groups</span></span>`})()}
            <span class="lbl">Cobertura de vacantes <button class="req-sem-info-btn" onclick="event.stopPropagation();window.__requiSemInfo()" title="¿Qué significa cada color?"><span class="mi">help</span></button></span>
            <span class="req-cov-num-chip" data-c="${domSemaforo(r)}">${t.cub}/${t.total} <span class="pct">${t.pct}%</span></span>
          </div>
          <div class="req-cov-bar req-cov-bar-sem">${r.positions.map(p=>{
            const sem = posSemaforo(p);
            const segs = [];
            for(let i=0;i<p.cubierto;i++) segs.push('<span class="req-cov-seg" data-sem="verde"></span>');
            for(let i=0;i<(p.total-p.cubierto);i++) segs.push(`<span class="req-cov-seg" data-sem="${sem}"></span>`);
            return segs.join('');
          }).join('')}</div>
        </div>
        <div class="req-pos-sem">
          ${r.positions.map((p, _pi)=>{
            const sem = posSemaforo(p);
            const falta = p.total - p.cubierto;
            const pctFalta = Math.round((falta/p.total)*100);
            const ub = posUrgBreakdown(p, r.urg, r, _pi);
            let detail;
            if(p.cubierto>=p.total){
              detail = `${p.total}/${p.total} · 100%`;
            } else if(p.cubierto===0 && p.proceso===0){
              detail = `${p.total} ${p.total===1?'puesto':'puestos'} · esperando`;
            } else {
              const procStr = p.proceso>0 ? ` · ${p.proceso} en proceso` : '';
              detail = `${p.cubierto}/${p.total} · faltan ${falta} (${pctFalta}%)${procStr}`;
            }
            const urgChips = ub.total>0 ? `<span class="urg-chips">${urgChipsHTML(ub)}</span>` : '';
            return `<div class="req-pos-row" data-sem="${sem}">
              <span class="pos-ic"><span class="mi">work</span></span>
              <span class="nm">${escR(p.pos)}</span>
              <span class="cnt">${detail}</span>
              ${urgChips}
            </div>`;
          }).join('')}
        </div>
        <div class="recl-card-foot">
          <div class="info"><span class="mi">schedule</span>${escR(r.age)}</div>
          <div class="req-foot-actions">
            ${footActions}
          </div>
        </div>
      </div>`;
    }

    function renderCards(arr){
      return `<div class="req-grid">${arr.map(r=>cardHTML(r)).join('')}</div>`;
    }

    // Cuerpo de una columna del tablero: en vez de repetir la franja de estado
    // en CADA card (se veían "montadas"), agrupa las requisiciones por contexto
    // (Autorizadas / En colaboración) bajo UN solo encabezado por grupo. Las
    // cards se renderizan limpias (sin franja). El conteo por requisición de
    // "En colaboración" se conserva en el chip mini junto al ID.
    function renderColBody(items){
      if(!items.length) return `<div class="recl-col-empty"><span class="mi">inbox</span><div class="e-txt">Sin requisiciones</div></div>`;
      const order = ['nueva','colab'];
      const buckets = {nueva:[], colab:[]};
      const noCtx = [];
      items.forEach(r=>{
        const c = !r.mine ? reqContext(r) : null;
        if(c && buckets[c.key]) buckets[c.key].push(r); else noCtx.push(r);
      });
      const subFor = {nueva:'Listas para recibir colaboradores', colab:'Compartidas entre reclutadores'};
      let html = '';
      order.forEach(k=>{
        const g = buckets[k];
        if(!g.length) return;
        const meta = reqContext(g[0]);
        html += `<div class="req-col-group-head" data-ctx="${k}"><span class="mi">${meta.ic}</span><span class="g-lbl">${meta.lbl}</span><span class="g-sub">· ${subFor[k]}</span><span class="g-count">${g.length.toString().padStart(2,'0')}</span></div>`;
        html += g.map(r=>cardHTML(r,{hideRibbon:true})).join('');
      });
      html += noCtx.map(r=>cardHTML(r,{hideRibbon:true})).join('');
      return html;
    }

    // ===== BOARD (estilo recl-board / recl-col) =====
    function renderBoard(arr){
      let cols;
      if(state.tab==='autorizadas'){
        cols = [
          {key:'high', nm:'Urgentes', sub:'Menos de 72 horas',      dot:'#E11919', bg:'rgb(246,237,235)'},
          {key:'med',  nm:'Pronto',   sub:'Entre 72 y 120 horas',   dot:'#FFCC33', bg:'rgb(246,239,219)'},
          {key:'low',  nm:'Normales', sub:'Más de 120 horas',       dot:'#1FA84A', bg:'rgb(243,246,235)'},
        ];
        cols.forEach(c=> c.items = arr.filter(r=>r.urg===c.key));
      } else {
        cols = [
          {key:'proceso',     nm:'En proceso',  sub:'Asignando colaboradores', dot:'#FFCC33', bg:'rgb(246,239,219)'},
          {key:'parcial',     nm:'Parciales',   sub:'Cerradas con faltantes de puestos', dot:'#3B7DDD', bg:'rgb(235,241,249)'},
          {key:'cubierta',    nm:'Cubiertas',   sub:'100% completas',          dot:'#1FA84A', bg:'rgb(243,246,235)'},
        ];
        cols.forEach(c=> c.items = arr.filter(r=>r.state===c.key));
      }
      const eyebrow = state.tab==='autorizadas' ? 'Estado de urgencia' : 'Estado de la requisición';
      return `<div class="recl-board requi-board" data-tab="${state.tab}">${cols.map(col=>`
        <div class="recl-col" style="background:${col.bg}">
          <div class="recl-col-head" style="background:${col.bg}">
            <div class="recl-col-eyebrow">${eyebrow}</div>
            <div class="recl-col-head-row">
              <span class="recl-col-dot" style="background:${col.dot}"></span>
              <div class="recl-col-name">${escR(col.nm)}<span class="sub-st">${escR(col.sub)}</span></div>
              <span class="recl-col-count">${col.items.length.toString().padStart(2,'0')}</span>
            </div>
          </div>
          ${renderColBody(col.items)}
        </div>
      `).join('')}</div>`;
    }

    // ===== TABLE =====
    function renderTable(arr){
      return `<div class="req-table-wrap"><table class="req-table req-table-rich">
        <thead><tr>
          <th class="col-id">ID</th>
          <th>Hotel · Zona</th>
          <th>Tipo de requisición</th>
          <th>Urgencia</th>
          <th>Período</th>
          <th>Contrato · Modalidad</th>
          <th>Posiciones</th>
          <th>Cobertura</th>
          ${state.tab==='mias'?'<th>Estado</th>':''}
          <th>Edad</th>
          <th></th>
        </tr></thead>
        <tbody>
          ${arr.map(r=>{
            const t = totals(r);
            const sub = SUBSTATES[r.state];
            const isMine = !!r.mine;
            const _d = reqDerive(r);
            const sem = domSemaforo(r);
            const ctx = !isMine ? reqContext(r) : null;
            const othersN = r.takers ? r.takers.filter(x=>x.id!=='me').length : 0;
            const cta = isMine
              ? `<button class="req-take-btn" onclick="event.stopPropagation();window.__requiOpen('${r.id}')"><span class="mi">visibility</span>Ver</button>`
              : `<button class="req-take-btn" onclick="event.stopPropagation();window.__requiTake('${r.id}')"><span class="mi">${othersN?'group_add':'flag'}</span>${othersN?'Unirme':'Tomar requisición'}</button>`;

            // Contrato pill (Mixto si distintas posiciones tienen contratos diferentes)
            const conPill = (()=>{
              const cs = (_d.reqContratos && _d.reqContratos.length) ? _d.reqContratos : ['Fijo'];
              if(cs.length > 1){
                return `<span class="meta-pill ctr" data-c="mix" title="Mixto · Fijo y Temporal"><span class="mi">assignment_ind</span>Mixto</span>`;
              }
              const c = cs[0];
              const k = c==='Fijo'?'fijo':'temp';
              return `<span class="meta-pill ctr" data-c="${k}"><span class="mi">assignment_ind</span>${escR(c)}</span>`;
            })();
            // Modalidad pill (Varias si distintas posiciones tienen modalidades diferentes)
            const modPill = (()=>{
              const ms = (_d.reqMods && _d.reqMods.length) ? _d.reqMods : [r.shift || 'Tiempo \ncompleto'];
              if(ms.length > 1){
                return `<span class="meta-pill modw" data-m="mix" title="Varias modalidades"><span class="mi">schedule</span>Varias</span>`;
              }
              const m = ms[0];
              const k = m==='Tiempo \ncompleto'?'tc' : (m==='Medio tiempo'?'mt':'ph');
              const short = k==='tc'?'TC':(k==='mt'?'MT':'PH');
              return `<span class="meta-pill modw" data-m="${k}" title="${escR(m)}"><span class="mi">schedule</span>${short}</span>`;
            })();

            // Posiciones con conteos por posición (compacto)
            const posList = r.positions.map(p=>{
              const psem = posSemaforo(p);
              const cls = p.cubierto>=p.total ? 'ok' : (psem==='rojo' ? 'bad' : (psem==='amarillo' ? 'warn' : 'neutral'));
              return `<span class="req-tbl-pos ${cls}"><span class="nm">${escR(p.pos)}</span><span class="ct">${p.cubierto}/${p.total}</span></span>`;
            }).join('');

            // Cobertura
            const covBar = r.positions.map(p=>{
              const psem = posSemaforo(p);
              const segs = [];
              for(let i=0;i<p.cubierto;i++) segs.push('<span class="req-cov-seg" data-sem="verde"></span>');
              for(let i=0;i<(p.total-p.cubierto);i++) segs.push(`<span class="req-cov-seg" data-sem="${psem}"></span>`);
              return segs.join('');
            }).join('');

            // Hotel + sub-meta
            const hotelCell = `
              <div class="req-tbl-hotel">
                <div class="hm-name">${escR(r.hotel)}</div>
                <div class="hm-sub">
                  <span class="mi">place</span>${escR(r.zone)}
                </div>
              </div>`;

            const ctxCell = ctx
              ? `<span class="req-tbl-ctx" data-ctx="${ctx.key}"><span class="mi">${ctx.ic}</span>${ctx.lbl}</span>`
              : `<span class="req-tbl-ctx-empty">—</span>`;

            return `<tr data-req-id="${r.id}" onclick="window.__requiOpen('${r.id}')">
              <td class="col-id">${escR(r.id)}</td>
              <td class="col-hotel">${hotelCell}</td>
              <td>${ctxCell}</td>
              <td><span class="req-urg-pill ${r.urg}"><span class="dot"></span>${URG_LABELS[r.urg]}</span></td>
              <td><span class="req-tbl-period"><span class="mi">event</span>${escR(r.period)}</span></td>
              <td><div class="req-tbl-pills">${conPill}${modPill}</div></td>
              <td><div class="req-tbl-pos-wrap">${posList}</div></td>
              <td>
                <div class="req-tbl-cov">
                  <span class="req-sem-icon" data-c="${sem}" title="Semáforo: ${sem}"><span class="mi">groups</span></span>
                  <div class="req-cov-bar req-cov-bar-sem" style="flex:1;margin:0;min-width:90px">${covBar}</div>
                  <span class="req-tbl-cov-num" data-c="${sem}">${t.cub}/${t.total}<span class="pct">${t.pct}%</span></span>
                </div>
              </td>
              ${state.tab==='mias'?`<td><span class="req-substate ${sub.cls}"><span class="dot"></span>${sub.lbl}</span></td>`:''}
              <td style="font-size:11.5px;color:var(--ink-3);white-space:nowrap">${escR(r.age)}</td>
              <td>${cta}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table></div>`;
    }

    // ===== ACCIONES =====
    window.__requiSetTab = t => { state.tab=t; state.fSub='todas'; window.__renderRequi(); };
    window.__requiSemInfo = () => { document.getElementById('requi-sem-info')?.classList.add('open'); };
    window.__requiSemInfoClose = () => { document.getElementById('requi-sem-info')?.classList.remove('open'); };
    // Modal explicativo: auto-asignación por menor carga (KPI ≤ 5%).
    window.__requiAutoAsgInfo = () => { document.getElementById('requi-auto-asg-info')?.classList.add('open'); };
    window.__requiAutoAsgInfoClose = () => { document.getElementById('requi-auto-asg-info')?.classList.remove('open'); };
    window.__requiSetSub = k => { state.fSub=k; window.__renderRequi(); };
    window.__requiSetView = v => { state.view=v; window.__renderRequi(); };
    window.__requiSetUrg = v => { state.fUrg = state.fUrg===v?'':v; state.tab='autorizadas'; window.__renderRequi(); };
    window.__requiSearch = v => { state.query=v; window.__renderRequi(); setTimeout(()=>document.getElementById('requi-search-input')?.focus(),0); };
    window.__requiToggleDD = k => { state.openDD = state.openDD===k?null:k; window.__renderRequi(); };
    window.__requiPickFilter = (k,v) => { state[k]=v; state.openDD=null; window.__renderRequi(); };
    window.__requiClearFilters = () => {
      state.fUrg=state.fPos=state.fZone=state.fHotel=state.fSem=state.fEstado=state.fContrato=state.fMod=''; state.fSub='todas'; state.query='';
      const inp=document.getElementById('requi-search-input'); if(inp) inp.value='';
      window.__renderRequi();
    };

    window.__requiTake = id => {
      const r = REQUIS.find(x=>x.id===id);
      if(!r) return;
      if(!r.takers) r.takers = [];
      const yaSoy = r.takers.some(t=>t.id==='me');
      const otros = r.takers.filter(t=>t.id!=='me').length;
      if(!yaSoy){ r.takers.push({...ME, ts:Date.now()}); pushHist(r,{who:ME, type:'take'}); }
      r.mine = true; if(r.state==='autorizada') r.state='proceso'; r.took='Hace un momento'; r.age='Tomada hace 0h';
      state.tab='mias'; state.fSub='proceso'; window.__renderRequi();
      showToast(otros ? `✓ Te uniste a ${r.id} · ${otros+1} reclutadores trabajándola` : `✓ ${r.id} movida a Mis requisiciones`, {
        actionLabel: 'Ver',
        actionIcon: 'arrow_forward',
        onAction: () => { state.tab='mias'; window.__renderRequi(); window.__requiOpen(r.id); },
        duration: 5000
      });
    };
    window.__requiRelease = id => {
      const r = REQUIS.find(x=>x.id===id);
      if(!r) return;
      if(r.takers) r.takers = r.takers.filter(t=>t.id!=='me');
      r.mine=false; pushHist(r,{who:ME, type:'leave'});
      const quedan = r.takers ? r.takers.length : 0;
      if(quedan===0){
        r.state='autorizada'; r.age='Devuelta a bandeja';
        r.positions = r.positions.map(p=>({...p, cubierto:0, proceso:0, segs:p.segs.map(()=>({st:'vacante'})), vacante:p.total}));
        showToast(`↩ ${r.id} devuelta a la bandeja (saliste y no quedan reclutadores)`);
      } else {
        r.age='Saliste';
        showToast(`Saliste de ${r.id} · ${quedan} reclutador(es) siguen trabajándola`);
      }
      window.__requiCloseDrawer(); state.tab='autorizadas';
      window.__renderRequi();
    };
    window.__requiReport = id => {
      state.drawerMoreOpen = false;
      renderDrawer();
      showToast(`Reporte enviado para ${id}`, {actionLabel:'Ver detalles', actionIcon:'info'});
    };
    window.__requiToggleMore = () => {
      state.drawerMoreOpen = !state.drawerMoreOpen;
      renderDrawer();
    };
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', () => {
      if(state.drawerMoreOpen){ state.drawerMoreOpen=false; renderDrawer(); }
    });
    window.__requiClose = (id, mode) => {
      const r = REQUIS.find(x=>x.id===id);
      if(!r) return;
      // ============================================================
      // RF-05 · Marcar requisición como cubierta
      // Flow: Manual → solicita validación al Líder de Grupo (auto)
      //       → aprueba cierre (auto) → semáforo Azul claro + notif. hotel
      // ============================================================
      if(mode === 'cubierta'){
        // Solo aplica si todas las posiciones están al 100% (regla RR-04)
        const t = totals(r);
        if(t.cub < t.total){
          showToast(`⚠ No se puede cubrir: ${t.total - t.cub} vacantes pendientes`);
          return;
        }
        window.__requiCubOpen(r);
        return;
      }
      // Cierre parcial mantiene comportamiento original
      r.state = mode;
      window.__renderRequi(); renderDrawer();
      showToast(`⚠ ${r.id} cerrada parcial`);
    };

    // ============================================================
    // Marcar cubierta — Confirmación + animación de validación
    // ============================================================
    // Mantiene estado interno transitorio en `state.cubFlow` para saber
    // qué requisición se está cerrando y en qué paso del flow vamos.
    state.cubFlow = null; // { reqId, step: 0..3 }
    window.__requiCubOpen = (r) => {
      state.cubFlow = { reqId: r.id, step: 0, animating: false };
      window.__renderCubModal();
      document.getElementById('requi-cub-overlay')?.classList.add('open');
    };
    window.__requiCubCancel = () => {
      // No se permite cancelar mientras anima
      if(state.cubFlow?.animating) return;
      document.getElementById('requi-cub-overlay')?.classList.remove('open');
      document.getElementById('requi-cub-overlay')?.classList.remove('success');
      state.cubFlow = null;
    };
    window.__requiCubConfirm = () => {
      if(!state.cubFlow || state.cubFlow.animating) return;
      const r = REQUIS.find(x=>x.id===state.cubFlow.reqId);
      if(!r) return window.__requiCubCancel();
      // Cierre simplificado:
      // Al confirmar se cierra el modal de confirmación y se notifica
      // que el cierre quedó pendiente de aprobación por el Líder de Grupo.
      // El proceso de validación / notificación al hotel es manual y no se
      // muestra como animación — solo confirma envío de la solicitud.
      window.__requiCubCancel();
      // Marcamos la requi como "pendiente de aprobación" sin moverla aún a
      // Cubiertas — eso pasa cuando el Líder aprueba (off-platform en este demo).
      // Para el demo dejamos la requi en su estado actual y mostramos toast.
      showToast(`⏳ ${r.id} · Pendiente por aprobación del Líder de Grupo`, {duration:4200, actionIcon:'hourglass_top'});
    };
    window.__renderCubModal = () => {
      const card = document.getElementById('requi-cub-card');
      if(!card || !state.cubFlow) return;
      const r = REQUIS.find(x=>x.id===state.cubFlow.reqId);
      if(!r) return;
      const t = totals(r);
      const step = state.cubFlow.step;
      const stepCls = (n) => step > n ? 'done' : (step === n ? 'active' : '');
      const stepIc  = (n, defaultIc) => step > n ? '<span class="mi">check</span>' : `<span class="mi">${defaultIc}</span>`;
      const isAnim = state.cubFlow.animating;
      const isFinal = step >= 3;
      card.innerHTML = `
        <div class="req-cub-head">
          <div class="ic"><span class="mi">${isFinal ? 'celebration' : 'check_circle'}</span></div>
          <div style="flex:1;min-width:0">
            <div class="ttl">${isFinal ? 'Requisición cubierta exitosamente' : 'Marcar requisición como cubierta'}</div>
            <div class="sub">${escR(r.id)} · ${escR(r.hotel)} · ${t.cub}/${t.total} vacantes asignadas</div>
          </div>
          ${!isAnim ? `<button class="x" onclick="window.__requiCubCancel()" aria-label="Cerrar"><span class="mi">close</span></button>` : ''}
        </div>
        <div class="req-cub-body">
          <div class="req-cub-summary">
            <span class="mi">${isFinal ? 'verified' : 'task_alt'}</span>
            <div class="txt">${isFinal
              ? `<strong>Cierre aprobado.</strong> Los ${t.cub} colaboradores cambiaron a <strong>Azul claro</strong> en el pool y se envió notificación automática al hotel.`
              : `Estás a punto de cerrar <strong>${escR(r.id)}</strong>. Al confirmar, se enviará la solicitud al <strong>Líder de Grupo</strong> para validar el cierre.`}</div>
          </div>
          <div class="req-cub-steps-h">Flujo de cierre</div>
          <div class="req-cub-steps">
            <div class="req-cub-step ${stepCls(0)}">
              <div class="step-ic">${stepIc(0,'flag')}</div>
              <div class="step-body">
                <div class="step-ttl">Marcar cubierta o finalizada la operación</div>
                <div class="step-meta"><span>Reclutadora confirma el cierre</span></div>
              </div>
            </div>
            <div class="req-cub-step ${stepCls(1)}">
              <div class="step-ic">${stepIc(1,'hourglass_top')}</div>
              <div class="step-body">
                <div class="step-ttl">Solicita validación al Líder de Grupo</div>
                <div class="step-meta"><span>Se envía solicitud de aprobación</span></div>
              </div>
            </div>
            <div class="req-cub-step ${stepCls(2)}">
              <div class="step-ic">${stepIc(2,'how_to_reg')}</div>
              <div class="step-body">
                <div class="step-ttl">Líder de Grupo aprueba el cierre</div>
                <div class="step-meta"><span>Valida cobertura al 100%</span></div>
              </div>
            </div>
            <div class="req-cub-step ${stepCls(3)}">
              <div class="step-ic">${stepIc(3,'campaign')}</div>
              <div class="step-body">
                <div class="step-ttl">Semáforo Azul claro + notificación al hotel</div>
                <div class="step-meta"><span class="step-tag azul">Azul claro</span><span>Día 3+ entrega uniforme + Hotel notificado</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="req-cub-foot">
          ${isFinal
            ? `<button class="btn primary" onclick="window.__requiCubCancel()"><span class="mi">check</span>Listo</button>`
            : isAnim
              ? `<button class="btn ghost" disabled><span class="mi">hourglass_empty</span>Procesando…</button>`
              : `<button class="btn ghost" onclick="window.__requiCubCancel()">Cancelar</button>
                 <button class="btn primary" onclick="window.__requiCubConfirm()"><span class="mi">check_circle</span>Confirmar cierre</button>`}
        </div>`;
    };

    // ===== DRAWER =====
    state.drawerTab = 'detalles';     // 'detalles' | 'asignacion'
    state.posOpen   = {};             // { posIdx: bool } expandible
    state.collOpen  = { hosp:true, bre:false, own:false };
    state.assignFilters = [];         // chips removibles del modal

    window.__requiOpen = (id, tabOverride) => {
      state.selected = id;
      // default tab depende de si es mía
      const r = REQUIS.find(x=>x.id===id);
      if(tabOverride === 'detalles' || tabOverride === 'asignacion'){
        state.drawerTab = tabOverride;
      } else {
        // Click directo a la card → siempre abrir en detalles
        state.drawerTab = 'detalles';
      }
      state.posOpen = {0:true};        // primera posición abierta por default
      // Reset de dropdowns colapsables — al abrir/cambiar de card, todo cerrado.
      state.collOpen = {};
      renderDrawer();
      document.getElementById('requi-drawer')?.classList.add('open');
      document.getElementById('requi-root')?.classList.add('drawer-open');
      // Marcar visualmente la card seleccionada
      document.querySelectorAll('.recl-card.requi.is-selected, tr.is-selected').forEach(el=>el.classList.remove('is-selected'));
      document.querySelectorAll('[data-req-id="'+id+'"]').forEach(el=>el.classList.add('is-selected'));
      // Scroll suave hacia la card en lista (sin scrollIntoView)
      const tgt = document.querySelector('.recl-card.requi.is-selected, tr.is-selected');
      if(tgt){
        const rect = tgt.getBoundingClientRect();
        if(rect.top < 80 || rect.bottom > window.innerHeight - 40){
          const scroller = tgt.closest('.recl-cards-wrap, .recl-table-wrap, .req-list, .recl-content, main, body') || document.scrollingElement;
          if(scroller && scroller.scrollBy){
            scroller.scrollBy({top: rect.top - 120, behavior:'smooth'});
          }
        }
      }
    };
    window.__requiCloseDrawer = () => {
      state.selected = null;
      document.getElementById('requi-drawer')?.classList.remove('open');
      document.getElementById('requi-root')?.classList.remove('drawer-open');
      document.querySelectorAll('.recl-card.requi.is-selected, tr.is-selected').forEach(el=>el.classList.remove('is-selected'));
    };
    window.__requiDrawerSetTab = t => { state.drawerTab = t; renderDrawer(); };
    window.__requiTogglePos = idx => { state.posOpen[idx] = !state.posOpen[idx]; renderDrawer(); };
    window.__requiToggleColl = k => { state.collOpen[k] = !state.collOpen[k]; renderDrawer(); };
    // Toggle para cards de vacantes (default: abierto). Si el key nunca se tocó → !undefined = true → cierra.
    // Después alterna normal.
    window.__requiToggleVac = k => {
      // Estado: cerrado por default. Sólo es 'abierto' si fue activado explícitamente.
      const isOpen = state.collOpen[k] === true;
      state.collOpen[k] = !isOpen;
      renderDrawer();
    };
    // Bloques merged (asignados / sin asignar) — default ABIERTOS. Sólo cierran
    // si el usuario lo solicitó explícitamente.
    window.__requiToggleMerged = k => {
      const isOpen = state.collOpen[k] !== false;
      state.collOpen[k] = !isOpen;
      renderDrawer();
    };

    // ---- Helpers derivados (data real + relleno consistente) ----
    function reqHash(id){ let h=0; for(let i=0;i<id.length;i++) h=(h*31+id.charCodeAt(i))|0; return Math.abs(h); }

    // Parser del campo r.period — devuelve {start, end} con formato legible
    // ("01–07 Dic" → start "01 Dic" / end "07 Dic"; "28 Nov–02 Dic" → "28 Nov"/"02 Dic").
    function parseReqPeriod(period){
      if(!period) return {start:'—', end:'—'};
      const s = String(period).trim();
      let m = s.match(/^(\d+)\s+(\S+)\s*[–-]\s*(\d+)\s+(\S+)$/);
      if(m) return {start:`${m[1]} ${m[2]}`, end:`${m[3]} ${m[4]}`};
      m = s.match(/^(\d+)\s*[–-]\s*(\d+)\s+(\S+)$/);
      if(m) return {start:`${m[1]} ${m[3]}`, end:`${m[2]} ${m[3]}`};
      return {start:s, end:s};
    }

    // ===== CASO ESPECIAL: requisiciones con vacantes con requisitos DISTINTOS por puesto =====
    // Estructura: {reqId: {positionIndex: [variant, variant, ...]}}
    //   variant: {mod, con, eng, exp, days:[0..6], start, hours}
    // Si una posición tiene variantes definidas, las cards de "Detalles de colaboradores sin asignar"
    // y "Schedule del hotel" se re-renderizan con un layout por variante en lugar del perfil único.
    // (Solo REQ-2551 — Hotel Costa del Sol — por petición de negocio.)
    const REQ_VAC_PROFILES = {
      'REQ-2551': {
        // Posición 0: Housekeeper (6 vacantes con perfiles distintos)
        0: [
          {mod:'Tiempo \ncompleto', con:'Fijo',     eng:'Básico',     exp:'2+ años', days:[0,1,2,3,4,5,6], start:'08:00', hours:8, area:'Habitaciones · Pisos 1–3', skills:'Limpieza profunda, cambio de blancos'},
          {mod:'Tiempo \ncompleto', con:'Fijo',     eng:'Intermedio', exp:'3+ años', days:[0,1,2,3,4],     start:'08:00', hours:8, area:'Habitaciones · Pisos VIP',   skills:'Atención a huésped VIP, blancos premium'},
          {mod:'Tiempo \ncompleto', con:'Temporal', eng:'Avanzado',   exp:'5+ años', days:[1,2,3,4,5],     start:'06:00', hours:8, area:'Habitaciones · Turno matutino', skills:'Supervisión, reporte de daños'},
          {mod:'Medio tiempo',      con:'Fijo',     eng:'Básico',     exp:'1+ año',  days:[0,1,2],         start:'09:00', hours:4, area:'Áreas públicas · Lobby',     skills:'Limpieza general, dotación de amenidades'},
          {mod:'Medio tiempo',      con:'Temporal', eng:'Intermedio', exp:'2+ años', days:[3,4,5],         start:'14:00', hours:4, area:'Habitaciones · Turno tarde', skills:'Cambio rápido, cierre de habitación'},
          {mod:'Medio tiempo',      con:'Fijo',     eng:'Básico',     exp:'1+ año',  days:[4,5,6],         start:'10:00', hours:4, area:'Habitaciones · Fines de semana', skills:'Limpieza profunda, atención al detalle'},
        ],
        // (Mesero NO tiene variantes: se mantiene la lógica original — perfil único.)
      },
      // REQ-2401 — versión parcial de REQ-2551 (Costa del Sol). Conserva la
      // misma estructura de variantes para que el bloque "sin asignar" se
      // renderice con el layout por variante en las vacantes que quedaron.
      'REQ-2401': {
        0: [
          {mod:'Tiempo \ncompleto', con:'Fijo',     eng:'Básico',     exp:'2+ años', days:[0,1,2,3,4,5,6], start:'08:00', hours:8, area:'Habitaciones · Pisos 1–3', skills:'Limpieza profunda, cambio de blancos'},
          {mod:'Tiempo \ncompleto', con:'Fijo',     eng:'Intermedio', exp:'3+ años', days:[0,1,2,3,4],     start:'08:00', hours:8, area:'Habitaciones · Pisos VIP',   skills:'Atención a huésped VIP, blancos premium'},
          {mod:'Tiempo \ncompleto', con:'Temporal', eng:'Avanzado',   exp:'5+ años', days:[1,2,3,4,5],     start:'06:00', hours:8, area:'Habitaciones · Turno matutino', skills:'Supervisión, reporte de daños'},
          {mod:'Medio tiempo',      con:'Fijo',     eng:'Básico',     exp:'1+ año',  days:[0,1,2],         start:'09:00', hours:4, area:'Áreas públicas · Lobby',     skills:'Limpieza general, dotación de amenidades'},
          {mod:'Medio tiempo',      con:'Temporal', eng:'Intermedio', exp:'2+ años', days:[3,4,5],         start:'14:00', hours:4, area:'Habitaciones · Turno tarde', skills:'Cambio rápido, cierre de habitación'},
          {mod:'Medio tiempo',      con:'Fijo',     eng:'Básico',     exp:'1+ año',  days:[4,5,6],         start:'10:00', hours:4, area:'Habitaciones · Fines de semana', skills:'Limpieza profunda, atención al detalle'},
        ],
      },
    };

    // ============================================================
    // MOD_MISMATCH_OVERRIDES — Vacantes asignadas con modalidad distinta a la requerida
    // ============================================================
    // Caso de negocio: el reclutador asigna a la vacante un colaborador que
    // cumple el perfil, pero su MODALIDAD difiere de la requerida (ej. la
    // vacante pide Tiempo completo y solo había Medio tiempo disponibles en
    // el pool — amarillo / disp. voluntario). Se asigna a sabiendas y debe
    // quedar marcado en la UI para que el reclutador (o quien revise) sepa
    // que el requerimiento original NO se cumple al 100%.
    //
    // Aplica en 3 vistas (todas dentro del drawer):
    //   1) Detalles → Vacantes asignadas (celda Modalidad muestra req → asig)
    //   2) Detalles → Colaboradores asignados (pill MT en amarillo + ≠ TC)
    //   3) Gestión de colaboradores (mismo tratamiento que arriba)
    //
    // Estructura: {reqId: {positionIdx: {itemIdx: {required, assigned}}}}
    // — itemIdx 0..cubierto-1 corresponden a las vacantes que SÍ están
    //   cubiertas (orden estable con el resto del UI).
    const MOD_MISMATCH_OVERRIDES = {
      // REQ-2402 · Hotel Marina Bay · Mantenimiento (pi=0):
      // Las 2 vacantes cubiertas requieren Tiempo completo (8h/día), pero
      // solo había Medio tiempo disponibles en el pool. El reclutador
      // asignó a sabiendas — cada vacante con horas diarias distintas
      // según la disponibilidad real del colaborador (4h vs 2h por día).
      // Ambas siguen trabajando Lun–Vie; solo cambian las horas diarias.
      'REQ-2402': {
        0: {
          0: { required: 'Tiempo \ncompleto', assigned: 'Medio tiempo', assignedHours: 4 },
          1: { required: 'Tiempo \ncompleto', assigned: 'Por horas',    assignedHours: 2 },
        },
      },
      // REQ-2598 · Hotel Ejemplo Parcial · Mantenimiento (pi=0):
      // Mismo caso que REQ-2402 pero en estado "En proceso" (no cerrada
      // todavía). Las 2 vacantes cubiertas requieren TC y el reclutador
      // (o el anterior, en una liberación previa) asignó MT/PH del pool.
      'REQ-2598': {
        0: {
          0: { required: 'Tiempo \ncompleto', assigned: 'Medio tiempo', assignedHours: 4 },
          1: { required: 'Tiempo \ncompleto', assigned: 'Por horas',    assignedHours: 2 },
        },
      },
      // REQ-2302 · Hotel Marina Bay · Mantenimiento (pi=0):
      // Caso cubierto exitosamente (4/4 Mantenimiento, 2/2 Electricista)
      // pero con MATCH PARCIAL heredado: 2 de las 4 vacantes de
      // Mantenimiento fueron cubiertas con modalidad distinta a la
      // requerida (TC pedido vs MT/PH asignado). Las otras 2 sí cumplen
      // 100%. Sirve para mostrar el happy path con badges informativos
      // de mismatch operativo flexible.
      'REQ-2302': {
        0: {
          0: { required: 'Tiempo \ncompleto', assigned: 'Medio tiempo', assignedHours: 4 },
          1: { required: 'Tiempo \ncompleto', assigned: 'Por horas',    assignedHours: 2 },
        },
      },
    };

    // ============================================================
    // MISMATCH_ASIG_SCHEDULES — Schedule específico por vacante asignada
    // ============================================================
    // Cuando una posición tiene mismatch de modalidad (REQ-2402 Mantenimiento),
    // cada colaborador asignado opera un schedule DISTINTO porque su modalidad
    // real (Por horas) requiere horarios reducidos y variables. Mirror conceptual
    // de REQ_VAC_PROFILES — pero para los "cubiertos" en lugar de los "sin asignar".
    // El render del Schedule del hotel detecta esta override y arma cards
    // por vacante (Vacante 1, Vacante 2…) en lugar de un solo schedule único.
    //
    // Estructura: {reqId: {posIdx: [variant, variant, ...]}}
    //   variant: {mod, con, days:[0..6], start, hours, label, personName}
    const MISMATCH_ASIG_SCHEDULES = {
      // REQ-2402 · Marina Bay · Mantenimiento (pi=0)
      // Ambas vacantes operan Lun–Vie (mismo schedule semanal que la requi).
      // Lo único que cambia es la cantidad de horas diarias del colaborador,
      // y eso define también la modalidad real del asignado:
      //   V1 (Gabriela Vega): MT 4h/día × 5 días = 20h/semana
      //   V2 (José López)   : PH 2h/día × 5 días = 10h/semana
      'REQ-2402': {
        0: [
          {mod:'Medio tiempo', con:'Fijo', days:[0,1,2,3,4], start:'09:00', hours:4, totalSem:20},
          {mod:'Por horas',    con:'Fijo', days:[0,1,2,3,4], start:'09:00', hours:2, totalSem:10},
        ],
      },
      // REQ-2598 · Hotel Ejemplo Parcial · Mantenimiento (pi=0)
      // Espejo de REQ-2402: dos vacantes cubiertas con MT 4h/día y PH 2h/día.
      'REQ-2598': {
        0: [
          {mod:'Medio tiempo', con:'Fijo', days:[0,1,2,3,4], start:'09:00', hours:4, totalSem:20},
          {mod:'Por horas',    con:'Fijo', days:[0,1,2,3,4], start:'09:00', hours:2, totalSem:10},
        ],
      },
      // REQ-2302 · Hotel Marina Bay · Mantenimiento (pi=0)
      // Caso cubierto exitosamente con match parcial heredado: 2 de las 4
      // vacantes operan con horas reducidas (MT 4h y PH 2h) vs TC requerido.
      // Las otras 2 vacantes (itemIdx 2 y 3) sí cumplen 100% y no aparecen
      // en MOD_MISMATCH_OVERRIDES → toman el schedule estándar de la
      // posición. Sólo aparecen como cards aparte las que tienen mismatch.
      'REQ-2302': {
        0: [
          {mod:'Medio tiempo', con:'Fijo', days:[0,1,2,3,4], start:'09:00', hours:4, totalSem:20},
          {mod:'Por horas',    con:'Fijo', days:[0,1,2,3,4], start:'09:00', hours:2, totalSem:10},
        ],
      },
    };

    // Helper: ¿este item (posición, índice de vacante) tiene mismatch?
    // Devuelve {required, assigned} o null. Usa el orden estable de itemIdx
    // (0..total-1) para que coincida con el orden en que se renderizan las
    // vacantes en "Vacantes asignadas" y los colaboradores en la tabla.
    function modMismatchFor(reqId, pi, itemIdx){
      return MOD_MISMATCH_OVERRIDES?.[reqId]?.[pi]?.[itemIdx] || null;
    }
    // Convertidor a clase corta (tc/mt/ph) usado en pills
    function modShortKey(m){
      return m==='Tiempo \ncompleto' ? 'tc' : (m==='Medio tiempo' ? 'mt' : 'ph');
    }
    function modShortLbl(m){
      return m==='Tiempo \ncompleto' ? 'TC' : (m==='Medio tiempo' ? 'MT' : 'PH');
    }
    // Devuelve etiqueta de horas asociada a la modalidad. Si pasamos
    // `explicitHours` (override per-vacancy del mismatch), gana sobre
    // los defaults típicos del pool. Defaults: TC=8h, MT=4h, PH=variable.
    function modHoursLbl(m, explicitHours){
      if(explicitHours != null) return `${explicitHours}h/día`;
      if(m==='Tiempo \ncompleto') return `8h/día`;
      if(m==='Medio tiempo') return `4h/día`;
      return 'Por horas';
    }
    // Cuando una posición tiene vacantes con perfiles distintos (caso REQ_VAC_PROFILES),
    // el sistema pre-selecciona N "mejores opciones" del pool — una por vacante — con
    // un score y razón de match que el reclutador puede revisar antes de asignar.
    // (Mock data: deterministico por reqId + positionIndex.)
    const MULTI_CANDIDATES = {
      'REQ-2551': {
        // Housekeeper (pi=0) — 6 vacantes con perfiles distintos
        0: [
          {id:'C-4521', nm:'María López Hernández',  doc:'4521', pos:'Housekeeper', zone:'Centro', eng:'Básico',     mod:'Tiempo completo', exp:'2 años exp.', dispo:'Disponible',           history:'2 hoteles', score:100, reason:'Cumple todos los requisitos'},
          {id:'C-4012', nm:'Patricia Núñez',          doc:'4012', pos:'Housekeeper', zone:'Centro', eng:'Intermedio', mod:'Tiempo completo', exp:'3 años exp.', dispo:'Disponible',           history:'1 hotel',  score:100, reason:'Cumple todos los requisitos'},
          {id:'C-6173', nm:'Valentina Cruz',          doc:'6173', pos:'Housekeeper', zone:'Centro', eng:'Avanzado',   mod:'Tiempo completo', exp:'5 años exp.', dispo:'Disponible',           history:'2 hoteles', score:100, reason:'Cumple todos los requisitos'},
          {id:'C-1108', nm:'Rosario Flores Díaz',     doc:'1108', pos:'Housekeeper', zone:'Centro', eng:'Básico',     mod:'Medio tiempo',    exp:'1 año exp.',  dispo:'Disponible voluntario', history:'1 hotel',  score:75,  partial:true, reason:'Modalidad distinta (medio tiempo)', note:'Asignada por disponibilidad operativa.'},
          {id:'C-3245', nm:'Carlos Méndez',           doc:'3245', pos:'Housekeeper', zone:'Centro', eng:'Intermedio', mod:'Tiempo completo', exp:'1 año exp.',  dispo:'Disponible',           history:'2 hoteles', score:75,  partial:true, reason:'Experiencia menor a la requerida', note:'Perfil cercano al requerido.'},
          {id:'C-4408', nm:'Roberto Castillo',        doc:'4408', pos:'Todero / Houseman', related:true, zone:'Centro', eng:'Básico', mod:'Tiempo completo', exp:'1 año exp.', dispo:'Disponible', history:'1 hotel', score:70, partial:true, reason:'Rol relacionado, no exacto', note:'Rol relacionado, cubre la operación.'},
        ],
        // Mesero (pi=1) — 3 candidatos (perfil único, sin variantes)
        1: [
          {id:'C-3398', nm:'Ana Sofía Reyes',         doc:'3398', pos:'Mesero', zone:'Centro', eng:'Intermedio', mod:'Tiempo completo', exp:'2 años exp.', dispo:'Disponible', history:'2 hoteles', score:100, reason:'Cumple todos los requisitos'},
          {id:'C-9901', nm:'Mariana Solís',           doc:'9901', pos:'Mesero', zone:'Centro', eng:'Básico',     mod:'Tiempo completo', exp:'3 años exp.', dispo:'Disponible', history:'1 hotel',  score:75,  partial:true, reason:'Inglés básico (requiere Intermedio)', note:'Cumple el resto del perfil.'},
          {id:'C-7250', nm:'Andrés Vargas',           doc:'7250', pos:'Todero / Houseman', related:true, zone:'Centro', eng:'Intermedio', mod:'Tiempo completo', exp:'2 años exp.', dispo:'Disponible', history:'1 hotel', score:70, partial:true, reason:'Rol relacionado (Todero / Houseman)', note:'Rol cercano, cubre la operación.'},
        ],
      },
      'REQ-2577': {
        // Mesero (pi=0) — 4 vacantes con mismo perfil, sólo varía el horario
        0: [
          {id:'C-5572', nm:'Diego Hernández Vega',    doc:'5572', pos:'Mesero', zone:'Sureste', eng:'Intermedio', mod:'Tiempo completo', exp:'2 años exp.', dispo:'Disponible',           history:'3 hoteles', score:100, reason:'Cumple todos los requisitos'},
          {id:'C-6014', nm:'Carolina Torres',         doc:'6014', pos:'Mesero', zone:'Sureste', eng:'Intermedio', mod:'Tiempo completo', exp:'2 años exp.', dispo:'Disponible',           history:'2 hoteles', score:100, reason:'Cumple todos los requisitos'},
          {id:'C-7733', nm:'Pedro Salazar',           doc:'7733', pos:'Todero / Houseman', related:true, zone:'Sureste', eng:'Intermedio', mod:'Tiempo completo', exp:'2 años exp.', dispo:'Disponible', history:'1 hotel', score:70, partial:true, reason:'Rol relacionado (Todero / Houseman)', note:'Rol cercano, cubre la operación.'},
          {id:'C-8190', nm:'Liliana Rojas',           doc:'8190', pos:'Mesero', zone:'Sureste', eng:'Intermedio', mod:'Medio tiempo',    exp:'1 año exp.',  dispo:'Disponible voluntario', history:'1 hotel',  score:75,  partial:true, modWarn:true, reason:'Voluntaria de medio tiempo (requiere TC)', note:'Disponibilidad operativa, modalidad distinta.'},
        ],
      },
    };

    // ===== Overrides de SCHEDULE por vacante (sin tocar perfil) =====
    // Estructura: {reqId: {positionIndex: [override, override, ...]}}
    //   override: {days:[0..6], hours, start}   ← null para vacantes ya asignadas
    // El perfil (modalidad/contrato/inglés/experiencia) NO cambia — sigue el de la
    // posición. SOLO se modifica el schedule (días + horas + start) por vacante.
    // Caso REQ-2577 (Hotel Bahía Real): los 4 Mesero y 2 Steward faltantes comparten
    // perfil pero cada uno opera un día/horario distinto.
    const REQ_VAC_SCHED_OVERRIDES = {
      'REQ-2577': {
        // Mesero (pi 0) — TC (8h) en TODAS las vacantes; solo cambian los días y el horario.
        0: [
          null, null,
          {days:[0,1,2,3,4], start:'06:00', hours:8},  // Lun–Vie · matutino
          {days:[0,1,2,3,4], start:'14:00', hours:8},  // Lun–Vie · vespertino
          {days:[1,2,3,4,5], start:'16:00', hours:8},  // Mar–Sáb · noche
          {days:[2,3,4,5,6], start:'12:00', hours:8},  // Mié–Dom · corrido
        ],
        // Steward (pi 1) — MT (4h) en TODAS las vacantes; solo cambian los días y el horario.
        1: [
          null, null,
          {days:[0,2,4], start:'08:00', hours:4},      // Lun-Mié-Vie · matutino
          {days:[1,3,5], start:'16:00', hours:4},      // Mar-Jue-Sáb · tarde
        ],
        // Recepción (pi 2): sin override → schedule único de la posición.
      },
    };

    // REQ-2559 (Hotel Marina Bay · Oeste) — smart-match curado por posición:
    //  • Mantenimiento (pi=0) → 4 vacantes faltantes, 3 candidatos: 1× 100% + 2× 75%.
    //    Cobertura parcial intencional para mostrar el caso de "más vacantes que matches".
    //  • Electricista  (pi=1) → 2 vacantes faltantes, 5 candidatos: 3× 100% + 2× 75%.
    //    El sistema pre-selecciona los 2 mejores (cupo = vacantes faltantes); ver
    //    lógica de límite en __requiMultiTogglePick.
    MULTI_CANDIDATES['REQ-2559'] = {
      // Mantenimiento (pi=0) — 4 vacantes faltantes. Resultados curados:
      //   1× 100% match perfecto + 2× 75% match parcial = 3 resultados.
      // Es intencional que haya MENOS candidatos que vacantes faltantes para mostrar
      // el caso de cobertura parcial (el reclutador deberá buscar más en el Pool).
      0: [
        {id:'C-6201', nm:'Tomás Aguirre Rendón',   doc:'6201', pos:'Mantenimiento', zone:'Oeste', eng:'Básico',     mod:'Medio tiempo',    exp:'3 años exp.', dispo:'Disponible',           history:'2 hoteles', score:100, reason:'Cumple todos los requisitos'},
        {id:'C-6218', nm:'Hugo Bermúdez Salas',    doc:'6218', pos:'Mantenimiento', zone:'Oeste', eng:'Básico',     mod:'Tiempo completo', exp:'2 años exp.', dispo:'Disponible voluntario',history:'1 hotel',  score:75, partial:true, modWarn:true, reason:'Voluntario de tiempo completo (requiere MT)', note:'Disponibilidad operativa, modalidad distinta.'},
        {id:'C-6235', nm:'Iván Cortés Navarro',    doc:'6235', pos:'Todero / Houseman', related:true, zone:'Oeste', eng:'Básico', mod:'Medio tiempo', exp:'2 años exp.', dispo:'Disponible', history:'2 hoteles', score:75, partial:true, reason:'Rol relacionado (Todero / Houseman)', note:'Rol cercano, cubre la operación.'},
      ],
      1: [
        {id:'C-5111', nm:'Ricardo Vargas Peña',    doc:'5111', pos:'Electricista', zone:'Oeste', eng:'Básico',     mod:'Medio tiempo',    exp:'2 años exp.', dispo:'Disponible',           history:'2 hoteles', score:100, reason:'Cumple todos los requisitos'},
        {id:'C-5124', nm:'Sergio Mendoza Lara',    doc:'5124', pos:'Electricista', zone:'Oeste', eng:'Básico',     mod:'Medio tiempo',    exp:'3 años exp.', dispo:'Disponible',           history:'1 hotel',  score:100, reason:'Cumple todos los requisitos'},
        {id:'C-5132', nm:'Felipe Aranda Soto',     doc:'5132', pos:'Electricista', zone:'Oeste', eng:'Básico',     mod:'Medio tiempo',    exp:'2 años exp.', dispo:'Disponible',           history:'3 hoteles', score:100, reason:'Cumple todos los requisitos'},
        {id:'C-5137', nm:'Mónica Treviño',         doc:'5137', pos:'Electricista', zone:'Oeste', eng:'Intermedio', mod:'Tiempo completo', exp:'2 años exp.', dispo:'Disponible voluntario',history:'1 hotel',  score:75, partial:true, modWarn:true, reason:'Voluntaria de tiempo completo (requiere MT)', note:'Disponibilidad operativa, modalidad distinta.'},
        {id:'C-5149', nm:'Andrés Pacheco Solís',   doc:'5149', pos:'Mantenimiento', related:true, zone:'Oeste', eng:'Básico', mod:'Medio tiempo', exp:'2 años exp.', dispo:'Disponible', history:'2 hoteles', score:75, partial:true, reason:'Rol relacionado (Mantenimiento)', note:'Rol cercano, cubre la operación.'},
      ],
    };

    // Steward (pi=1) en REQ-2577 — sin candidatos compatibles en el pool.
    // Se mantiene como array vacío (no como undefined) para que "Asignar" en cada vacante
    // use el mismo modal smart-match y muestre el empty state visual ("No hay candidatos
    // que coincidan con los filtros · Puedes buscar manualmente en el Pool completo").
    MULTI_CANDIDATES['REQ-2577'][1] = [];

    // Recepción (pi=2) en REQ-2577 — 6 candidatos con 100% match para vacante única.
    MULTI_CANDIDATES['REQ-2577'][2] = [
      {id:'C-8201', nm:'Valeria Ortiz Cano',     doc:'8201', pos:'Recepción', zone:'Sureste', eng:'Avanzado', mod:'Medio tiempo', exp:'3 años exp.', dispo:'Disponible', history:'2 hoteles', score:100, reason:'Cumple todos los requisitos'},
      {id:'C-8214', nm:'Andrés Morales Téllez',  doc:'8214', pos:'Recepción', zone:'Sureste', eng:'Avanzado', mod:'Medio tiempo', exp:'2 años exp.', dispo:'Disponible', history:'1 hotel',  score:100, reason:'Cumple todos los requisitos'},
      {id:'C-8227', nm:'Camila Rivero',          doc:'8227', pos:'Recepción', zone:'Sureste', eng:'Avanzado', mod:'Medio tiempo', exp:'3 años exp.', dispo:'Disponible', history:'3 hoteles', score:100, reason:'Cumple todos los requisitos'},
      {id:'C-8235', nm:'Iván Quintero Soto',     doc:'8235', pos:'Recepción', zone:'Sureste', eng:'Avanzado', mod:'Medio tiempo', exp:'2 años exp.', dispo:'Disponible', history:'1 hotel',  score:100, reason:'Cumple todos los requisitos'},
      {id:'C-8246', nm:'Sofía Beltrán Núñez',    doc:'8246', pos:'Recepción', zone:'Sureste', eng:'Avanzado', mod:'Medio tiempo', exp:'3 años exp.', dispo:'Disponible', history:'2 hoteles', score:100, reason:'Cumple todos los requisitos'},
      {id:'C-8258', nm:'Daniel Espinoza',        doc:'8258', pos:'Recepción', zone:'Sureste', eng:'Avanzado', mod:'Medio tiempo', exp:'2 años exp.', dispo:'Disponible', history:'1 hotel',  score:100, reason:'Cumple todos los requisitos'},
    ];

    // =================================================================
    // SMART-MATCH HAPPY CASE — 6 hoteles restantes
    // Costa del Sol · Marina Bay · Bahía Real ya tienen casos particulares
    // (curados arriba). Para el resto, todas las posiciones tienen suficientes
    // candidatos para cubrir las vacantes faltantes, con mix:
    //   ~70-80% al 100% match + ~20-30% al 75% match parcial.
    // El cupo de selección sigue ligado a vacantes faltantes.
    // =================================================================

    // REQ-2574 Hotel Vista Mar · Centro · Por horas — Laundry (pi=0) × 5 faltantes
    // 6 candidatos: 4× 100% + 2× 75% (suficiente cobertura + opciones).
    MULTI_CANDIDATES['REQ-2574'] = {
      0: [
        {id:'C-3401', nm:'Carmen Robles Vidal',    doc:'3401', pos:'Laundry', zone:'Centro', eng:'Básico',     mod:'Por horas',       exp:'2 años exp.', dispo:'Disponible',           history:'2 hoteles', score:100, reason:'Cumple todos los requisitos'},
        {id:'C-3414', nm:'Beatriz Salinas',        doc:'3414', pos:'Laundry', zone:'Centro', eng:'Básico',     mod:'Por horas',       exp:'1 año exp.',  dispo:'Disponible',           history:'1 hotel',  score:100, reason:'Cumple todos los requisitos'},
        {id:'C-3427', nm:'Norma Castañeda',        doc:'3427', pos:'Laundry', zone:'Centro', eng:'Básico',     mod:'Por horas',       exp:'3 años exp.', dispo:'Disponible',           history:'3 hoteles', score:100, reason:'Cumple todos los requisitos'},
        {id:'C-3439', nm:'Esther Loza Pacheco',    doc:'3439', pos:'Laundry', zone:'Centro', eng:'Básico',     mod:'Por horas',       exp:'2 años exp.', dispo:'Disponible',           history:'2 hoteles', score:100, reason:'Cumple todos los requisitos'},
        {id:'C-3446', nm:'Gloria Acevedo',         doc:'3446', pos:'Laundry', zone:'Centro', eng:'Básico',     mod:'Medio tiempo',    exp:'1 año exp.',  dispo:'Disponible voluntario',history:'1 hotel',  score:75, partial:true, modWarn:true, reason:'Voluntaria de medio tiempo (requiere PH)', note:'Disponibilidad operativa, modalidad distinta.'},
        {id:'C-3458', nm:'Marta Ibáñez Soriano',   doc:'3458', pos:'Hoseman', related:true, zone:'Centro', eng:'Básico', mod:'Por horas', exp:'2 años exp.', dispo:'Disponible', history:'2 hoteles', score:75, partial:true, reason:'Rol relacionado (Hoseman)', note:'Rol cercano, cubre la operación.'},
      ],
    };

    // REQ-2579 Hotel Caribe Plaza · Este · Tiempo completo
    //   Steward  (pi=0) × 8 faltantes → 10 candidatos (8× 100% + 2× 75%)
    //   Laundry  (pi=1) × 3 faltantes →  4 candidatos (3× 100% + 1× 75%)
    MULTI_CANDIDATES['REQ-2579'] = {
      0: [
        {id:'C-4501', nm:'Joaquín Tovar Ríos',     doc:'4501', pos:'Steward', zone:'Este', eng:'Básico',     mod:'Tiempo completo', exp:'2 años exp.', dispo:'Disponible',           history:'2 hoteles', score:100, reason:'Cumple todos los requisitos'},
        {id:'C-4514', nm:'Manuel Espino Aguilar',  doc:'4514', pos:'Steward', zone:'Este', eng:'Básico',     mod:'Tiempo completo', exp:'3 años exp.', dispo:'Disponible',           history:'1 hotel',  score:100, reason:'Cumple todos los requisitos'},
        {id:'C-4523', nm:'Ramiro Cisneros',        doc:'4523', pos:'Steward', zone:'Este', eng:'Básico',     mod:'Tiempo completo', exp:'2 años exp.', dispo:'Disponible',           history:'3 hoteles', score:100, reason:'Cumple todos los requisitos'},
        {id:'C-4535', nm:'Esteban Padilla',        doc:'4535', pos:'Steward', zone:'Este', eng:'Intermedio', mod:'Tiempo completo', exp:'4 años exp.', dispo:'Disponible',           history:'2 hoteles', score:100, reason:'Cumple todos los requisitos'},
        {id:'C-4548', nm:'Lorena Cabrera Téllez',  doc:'4548', pos:'Steward', zone:'Este', eng:'Básico',     mod:'Tiempo completo', exp:'1 año exp.',  dispo:'Disponible',           history:'1 hotel',  score:100, reason:'Cumple todos los requisitos'},
        {id:'C-4557', nm:'Héctor Lozano Vera',     doc:'4557', pos:'Steward', zone:'Este', eng:'Básico',     mod:'Tiempo completo', exp:'2 años exp.', dispo:'Disponible',           history:'2 hoteles', score:100, reason:'Cumple todos los requisitos'},
        {id:'C-4569', nm:'Diana Mares Trujillo',   doc:'4569', pos:'Steward', zone:'Este', eng:'Básico',     mod:'Tiempo completo', exp:'3 años exp.', dispo:'Disponible',           history:'1 hotel',  score:100, reason:'Cumple todos los requisitos'},
        {id:'C-4578', nm:'Federico Vargas Rey',    doc:'4578', pos:'Steward', zone:'Este', eng:'Intermedio', mod:'Tiempo completo', exp:'2 años exp.', dispo:'Disponible',           history:'2 hoteles', score:100, reason:'Cumple todos los requisitos'},
        {id:'C-4588', nm:'Yolanda Reséndiz',       doc:'4588', pos:'Steward', zone:'Este', eng:'Básico',     mod:'Medio tiempo',    exp:'2 años exp.', dispo:'Disponible voluntario',history:'1 hotel',  score:75, partial:true, modWarn:true, reason:'Voluntaria de medio tiempo (requiere TC)', note:'Disponibilidad operativa, modalidad distinta.'},
        {id:'C-4599', nm:'Cristian Olvera',        doc:'4599', pos:'Mesero', related:true, zone:'Este', eng:'Básico', mod:'Tiempo completo', exp:'2 años exp.', dispo:'Disponible', history:'2 hoteles', score:75, partial:true, reason:'Rol relacionado (Mesero)', note:'Rol cercano, cubre la operación.'},
      ],
      1: [
        {id:'C-4710', nm:'Rosaura Galván',         doc:'4710', pos:'Laundry', zone:'Este', eng:'Básico',     mod:'Tiempo completo', exp:'2 años exp.', dispo:'Disponible',           history:'2 hoteles', score:100, reason:'Cumple todos los requisitos'},
        {id:'C-4722', nm:'Pilar Maldonado',        doc:'4722', pos:'Laundry', zone:'Este', eng:'Básico',     mod:'Tiempo completo', exp:'3 años exp.', dispo:'Disponible',           history:'1 hotel',  score:100, reason:'Cumple todos los requisitos'},
        {id:'C-4734', nm:'Rebeca Olivares Hoyos',  doc:'4734', pos:'Laundry', zone:'Este', eng:'Básico',     mod:'Tiempo completo', exp:'2 años exp.', dispo:'Disponible',           history:'3 hoteles', score:100, reason:'Cumple todos los requisitos'},
        {id:'C-4745', nm:'Carlos Mejía Solórzano', doc:'4745', pos:'Hoseman', related:true, zone:'Este', eng:'Básico', mod:'Tiempo completo', exp:'2 años exp.', dispo:'Disponible', history:'2 hoteles', score:75, partial:true, reason:'Rol relacionado (Hoseman)', note:'Rol cercano, cubre la operación.'},
      ],
    };

    // REQ-2562 Hotel Punta Vista · Sur · Tiempo completo
    //   Chef    (pi=0) — 1 vacante faltante (5/6 cubierto) → 3 candidatos (2× 100% + 1× 75%)
    //   Steward (pi=1) — 1 vacante faltante (3/4 cubierto) → 3 candidatos (2× 100% + 1× 75%)
    MULTI_CANDIDATES['REQ-2562'] = {
      0: [
        {id:'C-5301', nm:'Roberto Fuentes Alva',   doc:'5301', pos:'Chef',    zone:'Sur',   eng:'Intermedio', mod:'Tiempo completo', exp:'5 años exp.', dispo:'Disponible',           history:'3 hoteles', score:100, reason:'Cumple todos los requisitos'},
        {id:'C-5314', nm:'Mariela Cano Quintero',  doc:'5314', pos:'Chef',    zone:'Sur',   eng:'Intermedio', mod:'Tiempo completo', exp:'4 años exp.', dispo:'Disponible',           history:'2 hoteles', score:100, reason:'Cumple todos los requisitos'},
        {id:'C-5325', nm:'Iván Salgado Pacheco',   doc:'5325', pos:'Chef',    zone:'Sur',   eng:'Básico',     mod:'Tiempo completo', exp:'4 años exp.', dispo:'Disponible',           history:'1 hotel',  score:75, partial:true, reason:'Inglés básico (requiere Intermedio)', note:'Cumple el resto del perfil.'},
      ],
      1: [
        {id:'C-5401', nm:'Tania Vergara Loaiza',   doc:'5401', pos:'Steward', zone:'Sur',   eng:'Básico',     mod:'Tiempo completo', exp:'2 años exp.', dispo:'Disponible',           history:'2 hoteles', score:100, reason:'Cumple todos los requisitos'},
        {id:'C-5413', nm:'Pablo Carmona Ruiz',     doc:'5413', pos:'Steward', zone:'Sur',   eng:'Básico',     mod:'Tiempo completo', exp:'3 años exp.', dispo:'Disponible',           history:'1 hotel',  score:100, reason:'Cumple todos los requisitos'},
        {id:'C-5424', nm:'Lucero Téllez Brito',    doc:'5424', pos:'Laundry', related:true, zone:'Sur', eng:'Básico', mod:'Tiempo completo', exp:'2 años exp.', dispo:'Disponible', history:'2 hoteles', score:75, partial:true, reason:'Rol relacionado (Laundry)', note:'Rol cercano, cubre la operación.'},
      ],
    };

    // REQ-2571 Hotel Las Brisas · Oeste · Medio tiempo
    //   Hoseman (pi=0) — 1 vacante faltante (7/8 cubierto) → 3 candidatos (2× 100% + 1× 75%)
    MULTI_CANDIDATES['REQ-2571'] = {
      0: [
        {id:'C-6101', nm:'Esteban Carrillo',       doc:'6101', pos:'Hoseman', zone:'Oeste', eng:'Básico',     mod:'Medio tiempo',    exp:'2 años exp.', dispo:'Disponible',           history:'2 hoteles', score:100, reason:'Cumple todos los requisitos'},
        {id:'C-6114', nm:'Damián Vargas Soto',     doc:'6114', pos:'Hoseman', zone:'Oeste', eng:'Básico',     mod:'Medio tiempo',    exp:'1 año exp.',  dispo:'Disponible',           history:'1 hotel',  score:100, reason:'Cumple todos los requisitos'},
        {id:'C-6125', nm:'Adriana Padilla',        doc:'6125', pos:'Housekeeper', related:true, zone:'Oeste', eng:'Básico', mod:'Medio tiempo', exp:'2 años exp.', dispo:'Disponible', history:'2 hoteles', score:75, partial:true, reason:'Rol relacionado (Housekeeper)', note:'Rol cercano, cubre la operación.'},
      ],
    };

    // REQ-2583 Hotel Mirador del Valle · Norte · Tiempo completo
    //   Housekeeper (pi=0) × 5 faltantes → 6 candidatos (4× 100% + 2× 75%)
    //   Mesero      (pi=1) × 4 faltantes → 5 candidatos (4× 100% + 1× 75%)
    //   Steward     (pi=2) × 2 faltantes → 3 candidatos (2× 100% + 1× 75%)
    MULTI_CANDIDATES['REQ-2583'] = {
      0: [
        {id:'C-7101', nm:'Adriana Cervantes',      doc:'7101', pos:'Housekeeper', zone:'Norte', eng:'Básico',     mod:'Tiempo completo', exp:'2 años exp.', dispo:'Disponible',           history:'2 hoteles', score:100, reason:'Cumple todos los requisitos'},
        {id:'C-7114', nm:'Marisol Aguilar Brito',  doc:'7114', pos:'Housekeeper', zone:'Norte', eng:'Básico',     mod:'Tiempo completo', exp:'3 años exp.', dispo:'Disponible',           history:'1 hotel',  score:100, reason:'Cumple todos los requisitos'},
        {id:'C-7125', nm:'Estela Romero Vega',     doc:'7125', pos:'Housekeeper', zone:'Norte', eng:'Intermedio', mod:'Tiempo completo', exp:'4 años exp.', dispo:'Disponible',           history:'3 hoteles', score:100, reason:'Cumple todos los requisitos'},
        {id:'C-7137', nm:'Lucía Pineda',           doc:'7137', pos:'Housekeeper', zone:'Norte', eng:'Básico',     mod:'Tiempo completo', exp:'2 años exp.', dispo:'Disponible',           history:'2 hoteles', score:100, reason:'Cumple todos los requisitos'},
        {id:'C-7146', nm:'Verónica Toledo',        doc:'7146', pos:'Housekeeper', zone:'Norte', eng:'Básico',     mod:'Medio tiempo',    exp:'1 año exp.',  dispo:'Disponible voluntario',history:'1 hotel',  score:75, partial:true, modWarn:true, reason:'Voluntaria de medio tiempo (requiere TC)', note:'Disponibilidad operativa, modalidad distinta.'},
        {id:'C-7158', nm:'Esperanza Yáñez',        doc:'7158', pos:'Hoseman', related:true, zone:'Norte', eng:'Básico', mod:'Tiempo completo', exp:'2 años exp.', dispo:'Disponible', history:'2 hoteles', score:75, partial:true, reason:'Rol relacionado (Hoseman)', note:'Rol cercano, cubre la operación.'},
      ],
      1: [
        {id:'C-7201', nm:'Gerardo Beltrán Cano',   doc:'7201', pos:'Mesero',  zone:'Norte', eng:'Intermedio', mod:'Tiempo completo', exp:'2 años exp.', dispo:'Disponible',           history:'2 hoteles', score:100, reason:'Cumple todos los requisitos'},
        {id:'C-7214', nm:'Daniela Pérez Vásquez',  doc:'7214', pos:'Mesero',  zone:'Norte', eng:'Intermedio', mod:'Tiempo completo', exp:'3 años exp.', dispo:'Disponible',           history:'1 hotel',  score:100, reason:'Cumple todos los requisitos'},
        {id:'C-7223', nm:'Mateo Solano Trujillo',  doc:'7223', pos:'Mesero',  zone:'Norte', eng:'Intermedio', mod:'Tiempo completo', exp:'2 años exp.', dispo:'Disponible',           history:'2 hoteles', score:100, reason:'Cumple todos los requisitos'},
        {id:'C-7234', nm:'Renata Aguirre',         doc:'7234', pos:'Mesero',  zone:'Norte', eng:'Avanzado',   mod:'Tiempo completo', exp:'4 años exp.', dispo:'Disponible',           history:'3 hoteles', score:100, reason:'Cumple todos los requisitos'},
        {id:'C-7245', nm:'Sebastián Calderón',     doc:'7245', pos:'Mesero',  zone:'Norte', eng:'Básico',     mod:'Tiempo completo', exp:'2 años exp.', dispo:'Disponible',           history:'1 hotel',  score:75, partial:true, reason:'Inglés básico (requiere Intermedio)', note:'Cumple el resto del perfil.'},
      ],
      2: [
        {id:'C-7301', nm:'Fernanda Murillo',       doc:'7301', pos:'Steward', zone:'Norte', eng:'Básico',     mod:'Tiempo completo', exp:'2 años exp.', dispo:'Disponible',           history:'2 hoteles', score:100, reason:'Cumple todos los requisitos'},
        {id:'C-7313', nm:'Roberto Bravo Acuña',    doc:'7313', pos:'Steward', zone:'Norte', eng:'Básico',     mod:'Tiempo completo', exp:'3 años exp.', dispo:'Disponible',           history:'1 hotel',  score:100, reason:'Cumple todos los requisitos'},
        {id:'C-7324', nm:'Sandra Quiroz Lara',     doc:'7324', pos:'Laundry', related:true, zone:'Norte', eng:'Básico', mod:'Tiempo completo', exp:'2 años exp.', dispo:'Disponible', history:'2 hoteles', score:75, partial:true, reason:'Rol relacionado (Laundry)', note:'Rol cercano, cubre la operación.'},
      ],
    };

    // REQ-2568 Hotel Aurora Beach · Este · Tiempo completo (hotel con modalidades mixtas)
    //   Electricista (pi=0) — 2 vacantes faltantes (1/3 cubierto) → 3 candidatos (2× 100% + 1× 75%)
    //   Chef         (pi=1) — 2 vacantes faltantes (2/4 cubierto) → 3 candidatos (2× 100% + 1× 75%)
    //   Mesero       (pi=2) — 2 vacantes faltantes (1/3 cubierto) → 3 candidatos (2× 100% + 1× 75%)
    MULTI_CANDIDATES['REQ-2568'] = {
      0: [
        {id:'C-8301', nm:'Octavio Mendoza Soto',   doc:'8301', pos:'Electricista', zone:'Este', eng:'Básico',     mod:'Tiempo completo', exp:'3 años exp.', dispo:'Disponible',           history:'2 hoteles', score:100, reason:'Cumple todos los requisitos'},
        {id:'C-8314', nm:'Ricardo Cisneros Vela',  doc:'8314', pos:'Electricista', zone:'Este', eng:'Básico',     mod:'Tiempo completo', exp:'4 años exp.', dispo:'Disponible',           history:'1 hotel',  score:100, reason:'Cumple todos los requisitos'},
        {id:'C-8325', nm:'Javier Ortega Brizuela', doc:'8325', pos:'Mantenimiento', related:true, zone:'Este', eng:'Básico', mod:'Tiempo completo', exp:'2 años exp.', dispo:'Disponible', history:'2 hoteles', score:75, partial:true, reason:'Rol relacionado (Mantenimiento)', note:'Rol cercano, cubre la operación.'},
      ],
      1: [
        {id:'C-8401', nm:'Camilo Reyes Aguirre',   doc:'8401', pos:'Chef',    zone:'Este', eng:'Intermedio', mod:'Medio tiempo',    exp:'4 años exp.', dispo:'Disponible',           history:'3 hoteles', score:100, reason:'Cumple todos los requisitos'},
        {id:'C-8414', nm:'Susana Otero Linares',   doc:'8414', pos:'Chef',    zone:'Este', eng:'Intermedio', mod:'Medio tiempo',    exp:'5 años exp.', dispo:'Disponible',           history:'2 hoteles', score:100, reason:'Cumple todos los requisitos'},
        {id:'C-8425', nm:'Bruno Carrasco',         doc:'8425', pos:'Chef',    zone:'Este', eng:'Básico',     mod:'Medio tiempo',    exp:'3 años exp.', dispo:'Disponible',           history:'1 hotel',  score:75, partial:true, reason:'Inglés básico (requiere Intermedio)', note:'Cumple el resto del perfil.'},
      ],
      2: [
        {id:'C-8501', nm:'Valeria Sandoval',       doc:'8501', pos:'Mesero',  zone:'Este', eng:'Intermedio', mod:'Tiempo completo', exp:'2 años exp.', dispo:'Disponible',           history:'2 hoteles', score:100, reason:'Cumple todos los requisitos'},
        {id:'C-8514', nm:'Tomás Aguilar Ruiz',     doc:'8514', pos:'Mesero',  zone:'Este', eng:'Intermedio', mod:'Tiempo completo', exp:'3 años exp.', dispo:'Disponible',           history:'1 hotel',  score:100, reason:'Cumple todos los requisitos'},
        {id:'C-8525', nm:'Karla Domínguez',        doc:'8525', pos:'Mesero',  zone:'Este', eng:'Intermedio', mod:'Medio tiempo',    exp:'2 años exp.', dispo:'Disponible voluntario',history:'1 hotel',  score:75, partial:true, modWarn:true, reason:'Voluntaria de medio tiempo (requiere TC)', note:'Disponibilidad operativa, modalidad distinta.'},
      ],
    };

    const DAY_LBLS = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
    function fmtVariantDayRange(days){
      if(!days || !days.length) return '—';
      const sorted = [...days].sort((a,b)=>a-b);
      if(sorted.length===7) return 'Lun – Dom';
      let cont = true;
      for(let i=1;i<sorted.length;i++) if(sorted[i]-sorted[i-1]!==1){cont=false;break;}
      if(cont && sorted.length>1) return `${DAY_LBLS[sorted[0]]} – ${DAY_LBLS[sorted[sorted.length-1]]}`;
      return sorted.map(i=>DAY_LBLS[i]).join(', ');
    }
    function addVariantHours(start, h){
      const [hh, mm] = start.split(':').map(Number);
      const total = hh*60 + mm + h*60;
      const eh = Math.floor(total/60) % 24, em = total % 60;
      return `${String(eh).padStart(2,'0')}:${String(em).padStart(2,'0')}`;
    }
    function variantModKey(m){ return m==='Tiempo \ncompleto'?'tc' : (m==='Medio tiempo'?'mt':'ph'); }
    function variantEngKey(e){ const k=(e||'').toLowerCase(); if(k.startsWith('básico')||k.startsWith('basico'))return'basic'; if(k.startsWith('inter'))return'inter'; return'adv'; }

    function reqDerive(r){
      const h = reqHash(r.id);
      const t = totals(r);
      // Modalidades por posición (deterministico por HOTEL+pos para que la requi en bandeja
      // y su contraparte en "Mis requisiciones" compartan exactamente la misma distribución).
      const MODS_LIST = ['Tiempo \ncompleto','Medio tiempo','Por horas'];
      // Distribución ponderada: ~50% TC, ~30% MT, ~20% PH
      const pickMod = (n) => {
        const x = n % 100;
        if(x < 50) return 'Tiempo \ncompleto';
        if(x < 80) return 'Medio tiempo';
        return 'Por horas';
      };
      // Overrides explícitos de modalidad por hotel (caso fijo del demo).
      const HOTELS_FORCE_PORHORAS = ['Hotel Vista Mar'];
      const posMods = r.positions.map((p, pi)=>{
        // SOLO estos 4 hoteles tienen modalidades distintas entre posiciones (Varias modalidades).
        // El resto comparte una sola modalidad por hotel.
        const HOTELS_VARIAS_MODS = ['Hotel Costa del Sol','Hotel Marina Bay','Hotel Aurora Beach','Hotel Bahía Real','Hotel Ejemplo Parcial'];
        if(HOTELS_VARIAS_MODS.includes(r.hotel)){
          // Alternar por índice: pos 0 → TC, 1 → MT, 2 → PH (determinístico, garantiza Mixto)
          const cycle = ['Tiempo \ncompleto','Medio tiempo','Por horas'];
          return {pos:p.pos, mods:[cycle[pi % cycle.length]]};
        }
        if(HOTELS_FORCE_PORHORAS.includes(r.hotel)){
          return {pos:p.pos, mods:['Por horas']};
        }
        // Hoteles "uniformes": una sola modalidad por hotel, igual en todas sus posiciones.
        const ph = reqHash(r.hotel + '|m');
        const single = pickMod(ph);
        return {pos:p.pos, mods:[single]};
      });
      // Set agregado a nivel requisición (orden estable: TC, MT, PH)
      const modSet = new Set();
      posMods.forEach(pm => pm.mods.forEach(m => modSet.add(m)));
      const reqMods = MODS_LIST.filter(m => modSet.has(m));

      // Tipos de contrato por posición.
      // SOLO 4 hoteles tienen contratos mixtos (Fijo + Temporal entre sus posiciones):
      //   Costa del Sol · Marina Bay · Aurora Beach · Bahía Real.
      // Punta Vista y Las Brisas son Fijo en todas las posiciones.
      // El resto: TODAS las posiciones del hotel comparten el mismo contrato (Fijo o Temporal).
      const CONTRATOS_LIST = ['Fijo','Temporal'];
      const HOTELS_FORCE_FIJO = ['Hotel Punta Vista','Hotel Las Brisas','Hotel Vista Mar'];
      const HOTELS_MIXTO = ['Hotel Costa del Sol','Hotel Marina Bay','Hotel Aurora Beach','Hotel Bahía Real','Hotel Ejemplo Parcial'];
      const posContratos = r.positions.map((p, pi)=>{
        if(HOTELS_FORCE_FIJO.includes(r.hotel)) return {pos:p.pos, contratos:['Fijo']};
        if(HOTELS_MIXTO.includes(r.hotel)){
          // Alternar por índice: pos 0 → Fijo, pos 1 → Temporal, pos 2 → Fijo… (garantiza mixto)
          return {pos:p.pos, contratos:[pi % 2 === 0 ? 'Fijo' : 'Temporal']};
        }
        // Hotel "uniforme": un solo contrato, igual en todas sus posiciones.
        const ph = reqHash(r.hotel + '|c');
        const single = (ph % 100) < 60 ? 'Fijo' : 'Temporal';
        return {pos:p.pos, contratos:[single]};
      });
      const cSet = new Set();
      posContratos.forEach(pc => pc.contratos.forEach(c => cSet.add(c)));
      const reqContratos = CONTRATOS_LIST.filter(c => cSet.has(c));
      // Modalidades distribuidas: hospedaje (mayoría), breakfast, propios
      const cub = t.cub, proc = t.proc;
      const hospN = Math.max(0, Math.round(cub*0.55) + Math.round(proc*0.5));
      const breN  = Math.max(0, Math.round(cub*0.30) + Math.round(proc*0.3));
      const ownN  = Math.max(0, cub + proc - hospN - breN);
      // Schedule del hotel: 7 días por POSICIÓN (matriz)
      // La lógica debe casar con la cobertura real: faltantes por día ≤ vacantes totales de la posición.
      const days = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
      // Patrones de días aplicables por modalidad (deterministico por id+pos)
      // TC: lun-vie (8h), MT: 3 días alternos (4h), PH: 2-3 días (2h)
      const schedByPos = r.positions.map((p, pi)=>{
        const vacReales = Math.max(0, p.total - p.cubierto); // faltantes reales = lo que NO está cubierto
        const ph = reqHash(r.id + p.pos);
        const primMod = posMods[pi]?.mods[0] || 'Tiempo \ncompleto';
        // Horas y patrón de días por modalidad
        let hours, pattern;
        if(primMod === 'Tiempo \ncompleto'){
          hours = 8;
          // Lun-Vie por defecto, 60% chance de incluir sábado
          pattern = [true,true,true,true,true, (ph%10)<6, false];
        } else if(primMod === 'Medio tiempo'){
          hours = 4;
          // 3 patrones rotando: L-X-V, M-J-S, L-M-J-V
          const patterns = [
            [true,false,true,false,true,false,false],
            [false,true,false,true,false,true,false],
            [true,true,false,true,true,false,false],
          ];
          pattern = patterns[ph % 3];
        } else { // Por horas
          hours = 2;
          // 2-3 días dispersos
          const patterns = [
            [false,true,false,true,false,false,true],
            [true,false,false,false,true,true,false],
            [false,false,true,false,false,true,true],
          ];
          pattern = patterns[ph % 3];
        }
        return {
          pos: p.pos,
          total: p.total,
          cubierto: p.cubierto,
          vacReales,
          modalidad: primMod,
          hours,
          days: days.map((d, di)=>{
            const applies = pattern[di];
            if(!applies) return {day:d, applies:false, hours:0, falta:0};
            if(vacReales===0) return {day:d, applies:true, hours, falta:0};
            // Distribución determinista por día (solo en días aplicables).
            const seed = (h>>(pi*3 + di)) & 7; // 0..7
            const weekendDip = di>=5 ? 1 : 0;
            if(vacReales<=2){
              const onDays = vacReales<=1 ? [0,2,4] : [0,1,3,4,6];
              const falta = onDays.includes(di) ? Math.min(1, vacReales) : 0;
              return {day:d, applies:true, hours, falta};
            }
            if(vacReales<=6){
              let falta;
              if(weekendDip) falta = (seed%3===0) ? 1 : 0;
              else falta = (seed%2===0) ? Math.min(2, vacReales) : 1;
              return {day:d, applies:true, hours, falta:Math.min(falta, vacReales)};
            }
            const base = Math.floor(vacReales/3);
            let falta = base + (seed%3) - weekendDip;
            falta = Math.max(0, Math.min(falta, vacReales));
            return {day:d, applies:true, hours, falta};
          })
        };
      });
      // Insights basados en estado real
      const insights = [];
      // Caso especial: requisición cerrada como parcial → único insight, amarillo claro.
      if(r.state === 'parcial'){
        insights.push({k:'warn', ic:'published_with_changes', txt:`La requisición fue <strong>cerrada parcialmente</strong> debido a falta de disponibilidad operativa para cubrir todas las vacantes requeridas.`});
      } else if(r.state === 'cubierta'){
        // Caso especial: cubierta CON match parcial heredado (ej. Marina Bay).
        // Si alguna vacante asignada tiene mismatch de modalidad registrado
        // en MOD_MISMATCH_OVERRIDES, comunicamos que la requi se cerró
        // exitosamente pero algunos asignados no cumplieron 100% — fue lo
        // disponible para mantener la operación del hotel.
        const _mmOv = (typeof MOD_MISMATCH_OVERRIDES !== 'undefined') ? MOD_MISMATCH_OVERRIDES[r.id] : null;
        const _hasMismatch = !!(_mmOv && Object.keys(_mmOv).length > 0);
        if(_hasMismatch){
          insights.push({
            k:'warn', ic:'published_with_changes',
            txt:`<strong>Requisición cubierta exitosamente.</strong> Algunas vacantes fueron completadas con <strong>perfiles de coincidencia parcial</strong> para mantener la continuidad operativa del hotel.`
          });
        } else {
          insights.push({k:'ok', ic:'check_circle', txt:`<strong>Requisición cubierta exitosamente.</strong> Todas las vacantes fueron asignadas dentro de los requisitos originales.`});
        }
      } else {
        // Caso especial: requisición liberada (con avance previo de otro reclutador).
        // En bandeja de autorización o cuando ya la tomé pero venía liberada.
        const _ctxIns = (typeof reqContext === 'function') ? reqContext(r) : null;
        const _isLiberada = (_ctxIns && _ctxIns.key === 'liberada') || (r.mine && r.wasLiberada);
        const _isAutorizadaNueva = (_ctxIns && _ctxIns.key === 'nueva');
        if(_isLiberada){
          insights.push({k:'purple', ic:'volunteer_activism', txt:`<strong>Requisición liberada</strong> con vacantes pendientes y posibles candidatos disponibles en el pool.`});
        } else if(_isAutorizadaNueva){
          insights.push({k:'tip', ic:'group_add', txt:`<strong>Pool sugiere colaboradores</strong> compatibles con esta requisición.`});
        }
        if(t.vac >= 5) insights.push({k:'alert', ic:'priority_high', txt:`<strong>${t.vac} vacantes sin asignar.</strong> Considera difundir en bolsa de talento.`});
        if(r.urg==='high' && t.pct<60) insights.push({k:'warn', ic:'schedule', txt:`<strong>Urgencia alta</strong> con cobertura ${t.pct}%. ${r.age}.`});
        if(t.proc>0) insights.push({k:'tip', ic:'sync', txt:`<strong>${t.proc} en onboarding.</strong> Verifica avance de documentos.`, meta:'Click en "Asignación" para ver detalle'});
        if(t.cub===t.total && t.total>0) insights.push({k:'ok', ic:'check_circle', txt:`<strong>Cobertura completa.</strong> Lista para marcar como cubierta.`});
      }
      // Vacantes detalladas por posición (deterministas)
      const vacantesByPos = r.positions.map((p, pi)=>{
        const arr = [];
        const modes = ['Tiempo \ncompleto','Medio tiempo','Por horas'];
        const langs = ['No requiere','Básico','Intermedio','Avanzado'];
        const exps  = ['Sin experiencia','6 meses+','1+ año','2+ años','3+ años'];
        // Contratos disponibles para esta posición (Fijo/Temporal o ambos en hoteles mixtos por posición)
        const posC = (posContratos[pi]?.contratos || ['Fijo']);
        for(let v=0; v<p.total; v++){
          const seed = (h + pi*17 + v*7);
          const stIdx = v < p.cubierto ? 0 : (v < p.cubierto+p.proceso ? 1 : 2);
          const modalidad = modes[seed%3];
          // Horas/día derivadas de la modalidad
          const hours = modalidad==='Tiempo \ncompleto' ? 8 : (modalidad==='Medio tiempo' ? 4 : 2);
          // Cantidad de días — TC se inclina a 5-6, MT a 3-4, PH a 2-3
          let dias;
          if(modalidad==='Tiempo \ncompleto') dias = 5 + ((seed>>6)%2);          // 5–6
          else if(modalidad==='Medio tiempo') dias = 3 + ((seed>>6)%2);            // 3–4
          else                                 dias = 2 + ((seed>>6)%2);           // 2–3
          // Rango de días determinista (índices 0..6 = Lun..Dom)
          let dayIndices;
          if(dias === 7) dayIndices = [0,1,2,3,4,5,6];
          else if(dias === 6) dayIndices = [0,1,2,3,4,5];
          else if(dias === 5) dayIndices = [0,1,2,3,4];
          else if(dias === 4) dayIndices = [(seed>>8)%2===0 ? [0,1,3,4] : [1,2,4,5]][0];
          else if(dias === 3) {
            const opts = [[0,2,4],[1,3,5],[0,3,5]];
            dayIndices = opts[(seed>>8)%3];
          }
          else if(dias === 2) {
            const opts = [[2,5],[1,4],[0,3]];
            dayIndices = opts[(seed>>8)%3];
          }
          else dayIndices = [5];
          arr.push({
            st: ['assigned','proc','empty'][stIdx],
            modalidad,
            contrato: posC.length>1 ? posC[v % posC.length] : posC[0],
            ingles: langs[(seed>>2)%4],
            exp: exps[(seed>>4)%5],
            dias,
            dayIndices,
            hours,
          });
        }
        return arr;
      });
      return {hospN, breN, ownN, schedByPos, insights, vacantesByPos, posMods, reqMods, posContratos, reqContratos};
    }

    function renderDrawer(){
      const drw = document.getElementById('requi-drawer');
      if(!drw || !state.selected) return;
      const r = REQUIS.find(x=>x.id===state.selected);
      if(!r) return;
      const t = totals(r);
      const sub = SUBSTATES[r.state];
      const d = reqDerive(r);
      const showAssign = !!(r.mine && r.state==='proceso');
      // Tab "Gestión de colaboradores": en mis requisiciones cerradas como
      // parcial o cubierta (siempre que ya haya cubiertos). Permite
      // reasignar / desasignar colaboradores ya asignados.
      const showGestion = !!(r.mine && (r.state==='parcial' || r.state==='cubierta') && t.cub > 0);
      // Si el tab actual no aplica a este estado, regrésalo a detalles.
      if(state.drawerTab==='asignacion' && !showAssign) state.drawerTab='detalles';
      if(state.drawerTab==='gestion' && !showGestion) state.drawerTab='detalles';

      // Preserva el scroll del pane activo entre re-renders. Sin esto, abrir
      // o cerrar un dropdown reemplaza el .req-drawer-pane y resetea scrollTop=0,
      // mandándote a la parte de arriba del drawer.
      const prevActivePane = drw.querySelector('.req-drawer-pane.active');
      const prevScrollTop = prevActivePane ? prevActivePane.scrollTop : 0;
      const prevTab = prevActivePane ? prevActivePane.getAttribute('data-pane') : null;

      drw.innerHTML = `
        ${renderDrawerHeader(r, t, sub)}
        ${renderDrawerTabs(r, t, showAssign, showGestion)}
        ${renderDetallesPane(r, t, d, showGestion)}
        ${showAssign ? renderAsignacionPane(r, d) : ''}
        ${showGestion ? renderGestionPane(r, d) : ''}
        ${renderDrawerFoot(r, t, showAssign)}
      `;

      // Restaura el scroll si seguimos en el mismo tab.
      if(prevTab && prevTab === state.drawerTab){
        const nextActivePane = drw.querySelector('.req-drawer-pane.active');
        if(nextActivePane) nextActivePane.scrollTop = prevScrollTop;
      }
    }

    function renderDrawerHeader(r, t, sub){
      // Si la requi está autorizada, refleja el contexto de la card (Autorizada/Liberada)
      const _d = reqDerive(r);
      // Contrato a nivel requisición: Mixto si las posiciones tienen contratos distintos.
      const _conSet = (_d.reqContratos && _d.reqContratos.length) ? _d.reqContratos : ['Fijo'];
      const conLabel = _conSet.length > 1 ? 'Mixto · Fijo y Temporal' : _conSet[0];
      let stLbl = sub.lbl, stCls = r.state;
      if(r.state==='autorizada'){
        stLbl = 'Autorizada'; stCls = 'autorizada';
      }
      const stPill = `<span class="req-drawer-pill state-${stCls}"><span class="dot"></span>${stLbl}</span>`;
      const urgPill = `<span class="req-drawer-pill urg-${r.urg}"><span class="dot"></span>${URG_LABELS[r.urg]}</span>`;
      const release = (r.mine && r.state==='proceso')
        ? `<button class="req-drawer-release" onclick="window.__requiRelease('${r.id}')" title="Devolver a la bandeja"><span class="mi">volunteer_activism</span>Liberar requisición</button>` : '';
      const moreOpen = state.drawerMoreOpen ? 'open' : '';
      const more = `
        <button class="req-drawer-more ${moreOpen}" onclick="event.stopPropagation();window.__requiToggleMore()" title="Más opciones"><span class="mi">more_horiz</span></button>
        ${state.drawerMoreOpen ? `<div class="req-drawer-more-menu" onclick="event.stopPropagation()">
          <button class="req-drawer-more-item" onclick="window.__requiReport('${r.id}')">
            <span class="mi">flag</span>Reportar problema
          </button>
        </div>` : ''}
      `;
      return `
        <div class="req-drawer-h">
          ${release}
          ${more}
          <div class="req-drawer-x" onclick="window.__requiCloseDrawer()" title="Cerrar"><span class="mi">close</span></div>
          <div class="req-drawer-pills">
            <span class="req-drawer-pill id">${escR(r.id)}</span>
            ${urgPill}
            ${stPill}
          </div>
          <div class="req-drawer-title">${escR(r.hotel)}</div>
          <div class="req-drawer-meta">
            <span><span class="mi">place</span>Zona ${escR(r.zone)}</span>
            <span class="sep"></span>
            <span><span class="mi">date_range</span>${escR(r.period)}</span>
            <span class="sep"></span>
            <span><span class="mi">assignment_ind</span>${escR(conLabel)}</span>
            <span class="sep"></span>
            <span><span class="mi">history</span>${escR(r.age)}</span>
          </div>
        </div>`;
    }

    function renderDrawerTabs(r, t, showAssign, showGestion){
      if(!showAssign && !showGestion) return ''; // Sin tabs si solo hay vista de detalle
      const A = state.drawerTab==='detalles' ? 'active':'';
      const B = state.drawerTab==='asignacion' ? 'active':'';
      const G = state.drawerTab==='gestion' ? 'active':'';
      const _gest = r._gestion || {};
      const gestBadge = (()=>{
        let count = 0;
        Object.keys(_gest).forEach(k=>{ count += (_gest[k].actions||[]).length; });
        return count;
      })();
      return `<div class="req-drawer-tabs">
        <div class="req-drawer-tab ${A}" onclick="window.__requiDrawerSetTab('detalles')"><span class="mi">description</span>Detalle</div>
        ${showAssign ? `<div class="req-drawer-tab ${B}" onclick="window.__requiDrawerSetTab('asignacion')"><span class="mi">person_add</span>Asignación<span class="badge">${t.vac+t.proc}</span></div>` : ''}
        ${showGestion ? `<div class="req-drawer-tab ${G}" onclick="window.__requiDrawerSetTab('gestion')"><span class="mi">manage_accounts</span>Gestión de colaboradores${gestBadge?`<span class="badge">${gestBadge}</span>`:''}</div>` : ''}
      </div>`;
    }

    function renderDetallesPane(r, t, d, showGestion){
      const hasTabs = (r.mine && r.state==='proceso') || showGestion;
      const isActive = state.drawerTab==='detalles' || !hasTabs;
      // Hint contextual
      let hint = '';
      if(!r.mine){
        hint = `<div class="req-hint"><span class="mi">info</span><div>Esta requisición está en la <strong>bandeja de autorizadas</strong>. Ya puedes tomarla para asignar colaboradores.</div></div>`;
      } else if(r.state==='proceso'){
        hint = `<div class="req-hint warn"><span class="mi">flag</span><div><strong>Tienes esta requisición.</strong> Ve a <strong>Asignación</strong> para cubrir las ${t.vac+t.proc} vacantes restantes.</div></div>`;
      } else if(r.state==='cubierta'){
        hint = `<div class="req-hint success"><span class="mi">check_circle</span><div>Requisición <strong>cubierta</strong>. ${escR(r.age)}.</div></div>`;
      } else if(r.state==='parcial'){
        hint = `<div class="req-hint warn"><span class="mi">published_with_changes</span><div>Cerrada como <strong>parcial</strong>. ${t.cub} de ${t.total} posiciones se cubrieron.</div></div>`;
      }

      // Lógica de color de vacantes (igual que las cards):
      //  - Autorizada nueva (0 cubiertos, cenefa naranja) → gris
      //  - Autorizada liberada (con avances, cenefa morada) → rojo
      //  - Nueva autorizada (sin avances)                  → gris neutro
      //  - Mía recién tomada con 0 cubiertos y 0 proceso    → gris neutro (todavía no se asigna nadie)
      //  - Liberada (autorizada con avances) / Parcial      → rojo (faltantes)
      //  - Mía con avances reales                           → rojo (faltantes)
      const ctx = reqContext(r);
      const segNeutral = (t.cub === 0 && t.proc === 0) && (r.state === 'autorizada' || r.state === 'proceso');
      const resumen = `
        <div class="req-pane-sec">
          <div class="req-pane-h"><span class="mi">flag</span>Resumen de la requisición</div>
          <div class="req-fact-grid">
            <div class="req-fact"><div class="lbl">Cobertura</div><div class="val"><span class="mi">groups</span>${t.cub}/${t.total} <span style="font-size:13px;color:var(--ink-3);font-weight:600">(${t.pct}%)</span></div></div>
            <div class="req-fact"><div class="lbl">Vacantes</div><div class="val"><span class="mi" style="color:${segNeutral?'var(--ink-3)':'var(--red)'}">priority_high</span>${t.vac}</div></div>
          </div>
          ${(()=>{
            // ============================================================
            // RESUMEN POR PUESTO — versión item-por-item
            // Cada fila representa UNA vacante específica (un "item") con su
            // modalidad / tipo de contrato / schedule particular. Cuando la
            // posición tiene variantes definidas en REQ_VAC_PROFILES, cada
            // item toma su info de la variante correspondiente. Si no hay
            // variantes, todos los items de esa posición comparten el mismo
            // default (modalidad/contrato/schedule del puesto).
            // En parciales se divide en 2 secciones:
            //   - Asignadas:    items 1..cub de cada posición
            //   - Sin asignar:  items (cub+proc+1)..total de cada posición
            // ============================================================
            const DAYS_LBL_RSM = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
            const fmtVarDays = arr => (arr||[]).slice().sort((a,b)=>a-b).map(i=>DAYS_LBL_RSM[i]).join(', ');

            // Construye UNA fila para un item específico (index 0-based dentro
            // de la posición). Si hay variante en REQ_VAC_PROFILES la usa; si
            // no, usa los defaults del puesto.
            const buildItemRow = (s, pi, itemIdx, hidden) => {
              const variants = (typeof REQ_VAC_PROFILES !== 'undefined') ? (REQ_VAC_PROFILES[r.id]?.[pi]) : null;
              const v = (Array.isArray(variants) && variants[itemIdx]) ? variants[itemIdx] : null;
              const conArr = (d.posContratos && d.posContratos[pi]) ? (d.posContratos[pi].contratos || []) : [];
              let modLbl, hoursLbl, conLbl, conKey, daysLbl;
              if(v){
                modLbl  = v.mod==='Tiempo \ncompleto' ? 'Tiempo \ncompleto' : v.mod==='Medio tiempo' ? 'Medio tiempo' : 'Por horas';
                hoursLbl = `${v.hours}h/día`;
                conLbl   = v.con==='Fijo' ? 'Fijo' : 'Temporal';
                conKey   = v.con==='Fijo' ? 'fijo' : 'temp';
                daysLbl  = fmtVarDays(v.days);
              } else {
                modLbl   = s.modalidad==='Tiempo \ncompleto' ? 'Tiempo \ncompleto' : s.modalidad==='Medio tiempo' ? 'Medio tiempo' : 'Por horas';
                hoursLbl = `${s.hours}h/día`;
                const con = conArr[0] || 'Fijo';
                conLbl   = con==='Fijo' ? 'Fijo' : 'Temporal';
                conKey   = con==='Fijo' ? 'fijo' : 'temp';
                daysLbl  = s.days.filter(x=>x.applies).map(x=>x.day).join(', ');
              }
              const conColor = conKey==='fijo' ? '#1F8F50' : '#A07000';
              const itemLabel = `${escR(s.pos)} <span style="font-weight:600;color:var(--ink-3);font-size:11px;margin-left:4px">#${itemIdx+1}</span>`;
              // MISMATCH — sólo aplica en bloque "asignadas". Si la vacante fue
              // cubierta pero con modalidad distinta a la requerida (REQ-2402
              // Mantenimiento), añadimos un sub-bloque amarillo dentro de la
              // celda Modalidad con req / asig en texto explícito.
              const mm = modMismatchFor(r.id, pi, itemIdx);
              // Si hay mismatch, la celda Modalidad se reemplaza por un
              // mini stack vertical (Requerida + Asignada) con fondo
              // amarillo y dashed. Resto del row se mantiene igual.
              const modCellHtml = mm ? `
                <div class="req-pos-sum-cell mm-cell" title="La vacante fue cubierta pero la modalidad asignada no coincide con la requerida">
                  <span class="lbl"><svg class="lbl-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><polyline points="12 7 12 12 15 14"></polyline></svg>Modalidad</span>
                  <div class="mm-cell-stack">
                    <div class="mm-cell-section">
                      <div class="mm-cell-lbl">Requerida</div>
                      <div class="mm-cell-val">${escR(mm.required.replace(/\n/g,' '))}</div>
                      <div class="mm-cell-pill mm-${modShortKey(mm.required)}">${modHoursLbl(mm.required, s.hours)}</div>
                    </div>
                    <div class="mm-cell-section">
                      <div class="mm-cell-lbl">Asignada</div>
                      <div class="mm-cell-val">${escR(mm.assigned.replace(/\n/g,' '))}</div>
                      <div class="mm-cell-pill mm-${modShortKey(mm.assigned)}">${modHoursLbl(mm.assigned, mm.assignedHours)}</div>
                    </div>
                  </div>
                </div>`
                : `<div class="req-pos-sum-cell"><span class="lbl"><svg class="lbl-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><polyline points="12 7 12 12 15 14"></polyline></svg>Modalidad</span><div class="val">${modLbl}<span class="sub">${hoursLbl}</span></div></div>`;
              return `<div class="req-pos-sum-row${hidden}">
                <div class="req-pos-sum-cell"><span class="lbl"><svg class="lbl-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"></rect><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>Puesto/s<br>requeridos</span><div class="val">${itemLabel}</div></div>
                ${modCellHtml}
                <div class="req-pos-sum-cell"><span class="lbl"><svg class="lbl-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="8" y1="13" x2="16" y2="13"></line><line x1="8" y1="17" x2="13" y2="17"></line></svg>Tipo de contrato</span><div class="val val-con val-con-${conKey}" data-c="${conKey}" style="color: ${conColor}">${conLbl}</div></div>
                <div class="req-pos-sum-cell"><span class="lbl"><svg class="lbl-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><line x1="7" y1="14" x2="9" y2="14"></line><line x1="11" y1="14" x2="17" y2="14"></line></svg>Schedule</span><div class="val">${daysLbl}</div></div>
              </div>`;
            };

            // Construye un .req-pos-sum a partir de items en posiciones filtradas.
            // section: 'asig' | 'vac' | 'all'
            const buildBlock = (filterFn, suffix, section) => {
              const positions = d.schedByPos.map((s,pi)=>({s,pi})).filter(({pi})=>filterFn(pi));
              if(positions.length===0) return '';
              const rowInfos = [];
              positions.forEach(({s,pi}) => {
                const posData = r.positions[pi] || {};
                const cub = posData.cubierto || 0;
                const proc = posData.proceso || 0;
                const total = posData.total || 0;
                let rangeStart, rangeEnd;
                if(section==='asig')      { rangeStart = 0;          rangeEnd = cub; }
                else if(section==='vac')  { rangeStart = cub + proc; rangeEnd = total; }
                else                      { rangeStart = 0;          rangeEnd = total; }
                for(let i = rangeStart; i < rangeEnd; i++){ rowInfos.push({s, pi, itemIdx: i}); }
              });
              if(rowInfos.length===0) return '';
              const collapse = rowInfos.length>2;
              const rows = rowInfos.map((info, idx)=>{
                const hidden = collapse && idx>=2 ? ' req-pos-sum-row-extra' : '';
                return buildItemRow(info.s, info.pi, info.itemIdx, hidden);
              }).join('');
              const toggle = collapse ? `<button class="req-pos-sum-toggle" onclick="event.stopPropagation();(function(b){const w=b.parentElement;const c=w.getAttribute('data-collapsed')==='1';w.setAttribute('data-collapsed',c?'0':'1');b.querySelector('.lbl').textContent=c?'Ver menos':'Ver todos ('+${rowInfos.length}+')';b.querySelector('.mi').textContent=c?'expand_less':'expand_more';})(this)"><span class="mi">expand_more</span><span class="lbl">Ver todos (${rowInfos.length})</span></button>` : '';
              return `<div class="req-pos-sum" data-collapsed="${collapse?'1':'0'}" data-req-id="${r.id}-${suffix}">${rows}${toggle}</div>`;
            };

            // Split asignados/sin-asignar — aplica cuando la requi ya está en
            // ejecución operativa (parcial cerrada, cubierta cerrada exitosa,
            // O en proceso con cubiertos previos por liberación o trabajo del
            // recruiter actual). En "Cubiertas" no hay sin-asignar, solo se
            // verá el bloque verde "Vacantes asignadas".
            const _hasAsig = (r.positions||[]).some(p => (p.cubierto||0) > 0);
            const isParcialMine = r.mine && (r.state==='parcial' || r.state==='cubierta' || (r.state==='proceso' && _hasAsig));
            // Bandeja de autorizadas: una "liberada" es una autorizada con cubiertos
            // previos (otro reclutador la dejó con avance). Mostrar el mismo split
            // verde/rojo para que el reclutador entienda de inmediato qué viene
            // cubierto y qué le queda por asignar.
            const isLiberadaBandeja = !r.mine && r.state==='autorizada' && _hasAsig;
            if(!isParcialMine && !isLiberadaBandeja){
              return `<div style="margin-top:14px">${buildBlock(()=>true,'all','all')}</div>`;
            }
            // Para parcial / proceso-con-avance: dos bloques separados (sin asignar / asignadas)
            // Un puesto puede aparecer en ambos si tiene cobertura parcial.
            const vacFilter = pi => {
              const p = r.positions[pi] || {};
              const vac = Math.max(0,(p.total||0)-(p.cubierto||0)-(p.proceso||0));
              return vac>0;
            };
            const asigFilter = pi => {
              const p = r.positions[pi] || {};
              return (p.cubierto||0)>0;
            };
            // Totales para los counters del subtítulo
            const vacTot = r.positions.reduce((a,p)=>a + Math.max(0,(p.total||0)-(p.cubierto||0)-(p.proceso||0)), 0);
            const asigTot = r.positions.reduce((a,p)=>a + (p.cubierto||0), 0);
            const vacBlock = buildBlock(vacFilter, 'vac', 'vac');
            const asigBlock = buildBlock(asigFilter, 'asig', 'asig');
            return `${asigBlock ? `<div class="req-pos-sum-section" data-kind="asig">
              <div class="req-pos-sum-sub-h" data-kind="asig"><span class="mi">check_circle</span>Vacantes asignadas<span class="count">${asigTot} ${asigTot===1?'asignado':'asignados'}</span></div>
              ${asigBlock}
            </div>` : ''}
            ${vacBlock ? `<div class="req-pos-sum-section" data-kind="vac">
              <div class="req-pos-sum-sub-h" data-kind="vac"><span class="mi">person_off</span>Vacantes sin asignar<span class="count">${vacTot} ${vacTot===1?'vacante':'vacantes'}</span></div>
              ${vacBlock}
            </div>` : ''}`;
          })()}
          <div class="req-cov-line-top" style="margin-top:22px;display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
            <span style="font-size:11px;font-weight:700;color:var(--ink-3);text-transform:uppercase;letter-spacing:.04em;display:inline-flex;align-items:center;gap:6px">
              Cobertura de vacantes
              <button class="req-sem-info-btn" onclick="event.stopPropagation();window.__requiSemInfo()" title="¿Qué significa cada color?" style="background:transparent;border:0;cursor:pointer;padding:0;display:inline-grid;place-items:center;width:16px;height:16px;border-radius:50%;color:var(--ink-3)"><span class="mi" style="font-size:14px">help_outline</span></button>
            </span>
            <span style="font-size:11px;font-weight:700;color:var(--ink-2)">${t.cub}/${t.total} <span style="color:var(--ink-3);font-weight:600">(${t.pct}%)</span></span>
          </div>
          <div class="req-cov-bar ${segNeutral?'neutral':''}" style="height:8px">
            ${r.positions.flatMap(p=>p.segs).map(s=>`<span class="req-cov-seg" data-st="${s.st}"></span>`).join('')}
          </div>
        </div>`;

      // Insights
      // Regla: en "Mis requisiciones" + estado en proceso, esta sección solo desaparece
      // cuando YO (en esta sesión) ya empecé a asignar al menos 1 colaborador.
      // Si la requi vino con cubiertos previos (otro reclutador la liberó), eso NO
      // cuenta — la sección se mantiene hasta que yo asigne algo.
      const _hideInsights = r.mine && r.state==='proceso'
        && r._assignLog && r._assignLog.length > 0;
      const insights = _hideInsights ? '' : `
        <div class="req-pane-sec">
          <div class="req-pane-h">Insights · Alertas</div>
          ${d.insights.map(i=>`<div class="req-ins ${i.k}"><span class="mi">${i.ic}</span><div class="req-ins-body">${i.txt}${i.meta?`<div class="meta">${i.meta}</div>`:''}</div></div>`).join('')}
        </div>`;

      // Colaboradores breakdown
      //  - En "Mis requisiciones" (mine): mostrar SOLO vacantes faltantes + perfil requerido
      //  - En la Bandeja: mostrar breakdown completo de colaboradores asignados
      const collabs = r.mine ? renderVacantesBreakdown(r, d) : renderCollabBreakdown(r, d);

      // Schedule (matriz: filas=días, columnas=posiciones)
      //  Si la requi es autorizada nueva → faltantes en gris (no rojo/amarillo).
      //  En "Mis requisiciones" → vista DETALLADA por puesto faltante (operativa).
      //  En "Bandeja autorizadas" → vista resumida/rápida (la actual).
      const ctxSch = reqContext(r);
      const schNeutral = (t.cub === 0 && t.proc === 0) && (r.state === 'autorizada' || r.state === 'proceso');
      const sch = r.mine ? renderScheduleDetallado(r, d) : `
        <div class="req-pane-sec">
          <div class="req-pane-h"><span class="mi">calendar_month</span>Resumen del Schedule
            <button class="req-sem-info-btn" onclick="event.stopPropagation()" title="Vista rápida de los días requeridos por posición" style="background:transparent;border:0;cursor:pointer;padding:0;display:inline-grid;place-items:center;width:18px;height:18px;border-radius:50%;color:var(--ink-3);margin-left:6px"><span class="mi" style="font-size:15px">help_outline</span></button>
          </div>
          <div class="req-sch-sub">Vista rápida de los días requeridos (se repite cada semana)</div>
          ${d.schedByPos.map(s=>{
            const modKey = s.modalidad==='Tiempo \ncompleto'?'tc' : (s.modalidad==='Medio tiempo'?'mt':'ph');
            // Lógica de conteo en el meta:
            //  - Autorizada nueva: muestra el total (nadie asignado todavía)
            //  - Otros estados: muestra vacantes restantes (faltantes reales)
            //    Si está cubierta al 100% → "Cubierta"
            let countTxt;
            if(schNeutral){
              countTxt = `${s.total} ${s.total===1?'vacante':'vacantes'}`;
            } else if(s.vacReales === 0){
              countTxt = 'Cubierta';
            } else {
              countTxt = `${s.vacReales} ${s.vacReales===1?'vacante restante':'vacantes restantes'}`;
            }
            return `<div class="req-sch2">
              <div class="req-sch2-head">
                <span class="req-sch2-pos">${escR(s.pos)}</span>
                <span class="req-sch2-meta"><span class="dot" data-m="${modKey}"></span>${escR(s.modalidad)} · ${s.hours}h · ${countTxt}</span>
              </div>
              <div class="req-sch2-grid">
                ${s.days.map(dd=>{
                  if(!dd.applies){
                    return `<div class="req-sch2-cell off">
                      <div class="d">${dd.day}</div>
                      <div class="chip off">No aplica</div>
                    </div>`;
                  }
                  // El chip refleja la MODALIDAD del puesto (TC verde / MT ámbar / PH mostaza).
                  // Las faltantes no afectan el color del chip — se reflejan en cobertura.
                  return `<div class="req-sch2-cell">
                    <div class="d">${dd.day}</div>
                    <div class="chip req" data-m="${modKey}">${dd.hours}h</div>
                    <div class="sub">Requerido</div>
                  </div>`;
                }).join('')}
              </div>
            </div>`;
          }).join('')}
          <div class="req-sch2-foot">
            <button class="req-take-btn" style="background:transparent;border:1.5px solid var(--accent);color:var(--accent)" onclick="event.stopPropagation()"><span class="mi">calendar_view_week</span>Ver schedule completo</button>
          </div>
        </div>`;

      // Tipo de contrato: usa la lógica unificada de reqDerive
      const _dInfo = reqDerive(r);
      // Tipo de contrato a nivel requisición: Mixto si hay posiciones con contratos distintos.
      const _ciSet = (_dInfo.reqContratos && _dInfo.reqContratos.length) ? _dInfo.reqContratos : ['Fijo'];
      const isMixto = _ciSet.length > 1;
      const tipoContrato = isMixto ? 'Mixto · Fijo y Temporal' : _ciSet[0];
      const isTemp = tipoContrato === 'Temporal';
      const periodoRow = isTemp
        ? `<div class="req-info-row"><span class="mi">date_range</span><div class="lbl">Periodo</div><div class="val">${escR(r.period)}</div></div>`
        : (isMixto
          ? `<div class="req-info-row"><span class="mi">date_range</span><div class="lbl">Periodo</div><div class="val" style="color:var(--ink-3);font-style:italic">Varía según tipo de contrato</div></div>`
          : '');

      // Área y observaciones derivadas por posición (varía según vacantes de la requisición)
      const AREA_BY_POS = {
        'Housekeeper':'Ama de llaves','Hoseman':'Ama de llaves','Laundry':'Lavandería',
        'Chef':'Alimentos y Bebidas','Cocinero':'Alimentos y Bebidas','Mesero':'Alimentos y Bebidas','Steward':'Alimentos y Bebidas','Botones':'Recepción',
        'Mantenimiento':'Mantenimiento','Eléctrico':'Mantenimiento','Electricista':'Mantenimiento','Plomero':'Mantenimiento',
        'Jardinero':'Áreas verdes','Seguridad':'Seguridad','Recepción':'Recepción'
      };
      const OBS_BY_POS = {
        'Housekeeper':'Apoyo en limpieza de habitaciones y áreas comunes',
        'Hoseman':'Tareas de soporte al equipo de housekeeping',
        'Laundry':'Manejo de ropa de cama, toallas y uniformes',
        'Chef':'Producción y supervisión de cocina caliente',
        'Cocinero':'Apoyo en línea y prep diaria',
        'Mesero':'Atención a comensales y servicio a la mesa',
        'Steward':'Lavado de loza, soporte a cocina y banquetes',
        'Botones':'Manejo de equipaje y atención al huésped',
        'Mantenimiento':'Mantenimiento preventivo y correctivo de instalaciones',
        'Eléctrico':'Instalaciones y reparaciones eléctricas',
        'Electricista':'Instalaciones y reparaciones eléctricas',
        'Plomero':'Reparaciones hidrosanitarias',
        'Jardinero':'Mantenimiento de áreas verdes y exteriores',
        'Seguridad':'Vigilancia perimetral y control de accesos',
        'Recepción':'Check-in, check-out y atención al huésped'
      };
      const posNames = (r.positions || []).map(p=>p.pos);
      const areas = [...new Set(posNames.map(p=>AREA_BY_POS[p]).filter(Boolean))];
      const areaText = areas.length === 0 ? '—' : (areas.length === 1 ? areas[0] : (areas.length === 2 ? areas.join(' · ') : `Mixto · ${areas.length} áreas`));
      const obsText = (() => {
        if(posNames.length === 0) return '—';
        if(posNames.length === 1) return OBS_BY_POS[posNames[0]] || `Tareas asociadas a ${posNames[0]}`;
        const items = posNames.slice(0,3).map(p=>OBS_BY_POS[p] || `Tareas de ${p}`);
        if(posNames.length > 3) items.push(`+${posNames.length-3} posiciones`);
        return items.join(' · ');
      })();

      // Historial / Timeline
      const tl = renderTimeline(r, t);

      // RF-40 — Reclutadores activos (modelo colaborativo): quiénes la trabajan AHORA.
      const _takers = r.takers || [];
      const recActivos = _takers.length ? `
        <div class="req-pane-sec" style="padding-bottom:14px">
          <div class="req-pane-h"><span class="mi">groups</span>Reclutadores activos<span class="count">${_takers.length}</span></div>
          <div style="display:flex;flex-direction:column;gap:9px;padding:8px 12px 0">
            ${_takers.map(tk=>{
              const me = tk.id==='me';
              const ini = (tk.nm||'?').split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
              return `<div style="display:flex;align-items:center;gap:10px">
                <div style="width:32px;height:32px;border-radius:50%;background:${me?'var(--o-500)':'var(--o-100)'};color:${me?'#fff':'var(--o-700)'};display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;flex:0 0 auto">${ini}</div>
                <div style="flex:1;min-width:0">
                  <div style="font-weight:600;color:var(--ink);font-size:13px">${escR(tk.nm)}${me?' <span style="color:var(--o-700);font-weight:500">(tú)</span>':''}</div>
                  <div style="font-size:11.5px;color:var(--ink-3)">${escR(tk.rol||'Reclutadora')}${tk.ts?' · se unió '+fmtAgo(tk.ts).toLowerCase():''}</div>
                </div>
                <span class="lg-chip g" style="font-size:10.5px">activo</span>
              </div>`;
            }).join('')}
          </div>
        </div>` : '';

      // Para parciales — añade un bloque de asignados (detalles + schedule)
      // Para parciales, cubiertas y para requis "En proceso" que ya tienen
      // avance (liberadas heredadas o asignaciones del recruiter en sesión),
      // añade el bloque de asignados (detalles + schedule) entre Insights y
      // "Detalles de colaboradores sin asignar". Misma lógica visual que el
      // happy case de Costa del Sol — sin las particularidades de mismatch
      // de Marina Bay (esas se controlan por MOD_MISMATCH_OVERRIDES y solo
      // aplican a REQs específicas).
      //
      // Ahora también aplica a "Cubiertas" (state==='cubierta'): el happy
      // path de cierre exitoso muestra el bloque verde "Colaboradores
      // asignados" + el schedule del hotel, mismo tratamiento que cuando
      // estaba en proceso pero con t.cub === total (sin sin-asignar).
      const hasAsignados = r.mine && (r.state==='parcial' || r.state==='cubierta' || (r.state==='proceso' && t.cub > 0));
      const isParcial = hasAsignados;
      const collabsAsig = isParcial ? renderAsignadosBreakdown(r, d) : '';
      const schAsig     = isParcial ? renderScheduleAsignadosDetallado(r, d) : '';

      // Bloques colapsables: "Colaboradores asignados" (verde) y "Sin asignar" (rojo)
      const asigOpen = state.collOpen['merged-asig'] !== false; // default abierto
      const vacOpen  = state.collOpen['merged-vac']  !== false; // default abierto
      const asigMerged = (collabsAsig || schAsig)
        ? `<div class="req-asig-merged${asigOpen?' open':''}" data-open="${asigOpen?'1':'0'}">
             <button class="req-merged-h" onclick="window.__requiToggleMerged('merged-asig')">
               <span class="ic"><span class="mi">groups</span></span>
               <span class="ttl">Colaboradores asignados</span>
               <span class="cnt">${t.cub} asignado${t.cub===1?'':'s'}</span>
               <span class="chev"><span class="mi">expand_more</span></span>
             </button>
             <div class="req-merged-body">${collabsAsig}${schAsig}</div>
           </div>`
        : '';
      const vacMerged = (t.vac > 0)
        ? `<div class="req-vac-merged${vacOpen?' open':''}" data-open="${vacOpen?'1':'0'}">
             <button class="req-merged-h" onclick="window.__requiToggleMerged('merged-vac')">
               <span class="ic"><span class="mi">person_off</span></span>
               <span class="ttl">Colaboradores sin asignar</span>
               <span class="cnt">${t.vac} sin cubrir</span>
               <span class="chev"><span class="mi">expand_more</span></span>
             </button>
             <div class="req-merged-body">${collabs}${sch}</div>
           </div>`
        : '';
        // Si no hay vacantes pendientes (caso típico de Cubiertas), no
        // renderizamos los placeholders "Sin vacantes faltantes" / "Sin
        // vacantes pendientes". La sección entera desaparece.
      
      return `<div class="req-drawer-pane ${isActive?'active':''}" data-pane="detalles">
        ${hint}
        ${resumen}
        ${recActivos}
        ${insights}
        ${asigMerged}
        ${vacMerged}
        ${tl}
      </div>`;
    }

    // Formatea una marca de tiempo como tiempo relativo en español:
    //   < 60s    → "Hace unos segundos"
    //   < 60min  → "Hace N min"
    //   < 24h    → "Hace N h"
    //   ≥ 24h    → "Hace Nd Mh"
    function fmtAgo(ts){
      const diff = Math.max(0, Date.now() - ts);
      const s = Math.floor(diff/1000);
      if(s < 30) return 'Hace unos segundos';
      const m = Math.floor(s/60);
      if(m < 1) return 'Hace 1 min';
      if(m < 60) return `Hace ${m} min`;
      const h = Math.floor(m/60);
      if(h < 24) return `Hace ${h}h`;
      const d = Math.floor(h/24);
      const rh = h - d*24;
      return rh > 0 ? `Hace ${d}d ${rh}h` : `Hace ${d}d`;
    }

    function renderTimeline(r, t){
      // Historial cronológico (más antiguo arriba → más reciente abajo).
      // El historial cambia según el caso de la requisición:
      //   · Bandeja "Nueva" (no mine, ctx=nueva)        → solicitó + autorizó
      //   · Bandeja "Liberada" (no mine, ctx=liberada)  → solicitó + autorizó + reclutador liberó
      //   · Mía tomada de autorizada (mine, !wasLiberada) → ... + tomaste autorizada + asignaciones propias
      //   · Mía tomada de liberada (mine, wasLiberada)  → ... + reclutador liberó + tomaste liberada
      //   · Cerrada (cubierta / parcial)                → cierra la línea
      const items = [];
      const ctx = reqContext(r);
      const wasLiberada = !!(r.mine && r.wasLiberada);
      const fromLiberada = wasLiberada || (ctx && ctx.key === 'liberada');

      // 1) Supervisor del hotel solicita las posiciones para su área
      items.push({when:'Hace 3 días', what:`<strong>Supervisor</strong> solicitó <strong>${t.total} posiciones</strong> en ${escR(r.hotel)}`, muted:true});

      // 2) Manager de área autoriza la requisición
      items.push({when:'Hace 2 días', what:`<strong>Manager de área autorizó</strong> la requisición`, muted:true});

      // 3) Inspector asignado a la zona (nombre determinista por zona)
      const INSPECTORES = {
        'Norte': 'Roberto Salinas',
        'Sur':   'Mariana Ortega',
        'Este':  'Fernando Aguilar',
        'Oeste': 'Patricia Núñez',
        'Centro':'Ricardo Domínguez',
        'CDMX':  'Ricardo Domínguez',
        'GDL':   'Sofía Camargo',
        'MTY':   'Andrés Villarreal',
        'BCS':   'Laura Pacheco',
        'QR':    'Hugo Cabrera',
      };
      const insp = INSPECTORES[r.zone] || 'Carlos Méndez';
      items.push({when:'Hace 2 días', what:`<strong>Inspector asignado</strong> a la zona ${escR(r.zone||'')} · <strong>${escR(insp)}</strong>`, muted:true});

      // 2-3) Historial COLABORATIVO multi-actor: toma/unión, asignaciones y salidas por reclutador.
      // Funciona tanto para "Mis requisiciones" como para las de la bandeja ya trabajadas por otros.
      const evs = (r.history || []).slice().sort((a,b)=>a.ts-b.ts);
      if(r.mine && !evs.some(e=>e.type==='take' && e.who && e.who.id==='me')){
        evs.push({ts:_now-7200000, who:ME, type:'take'}); evs.sort((a,b)=>a.ts-b.ts);
      }
      const firstTakeTs = (evs.find(e=>e.type==='take')||{}).ts;
      const loggedN = evs.filter(e=>e.type==='assign').reduce((s,e)=>s+(e.names?e.names.length:0),0);
      if(t.cub>loggedN){
        const inh = t.cub - loggedN;
        items.push({when:'Antes', what:`<strong>${inh} colaborador${inh>1?'es':''}</strong> ya asignado${inh>1?'s':''} previamente`, muted:true});
      }
      evs.forEach(ev=>{
        const isMe = ev.who && ev.who.id==='me';
        const nm = ev.who ? (isMe ? 'Tú' : ev.who.nm) : 'Sistema';
        let what='';
        if(ev.type==='take'){
          const first = ev.ts===firstTakeTs;
          what = isMe ? (first?`<strong>Tomaste</strong> la requisición`:`<strong>Te uniste</strong> a la requisición`)
                      : (first?`<strong>${escR(nm)}</strong> tomó la requisición`:`<strong>${escR(nm)}</strong> se unió a la requisición`);
        } else if(ev.type==='leave'){
          what = isMe ? `<strong>Saliste</strong> de la requisición` : `<strong>${escR(nm)}</strong> salió de la requisición`;
        } else if(ev.type==='assign'){
          const n = ev.names.length;
          const names = n<=3 ? ev.names.map(x=>`<strong>${escR(x)}</strong>`).join(', ')
                             : `<strong>${escR(ev.names[0])}</strong>, <strong>${escR(ev.names[1])}</strong> y <strong>${n-2} más</strong>`;
          const actor = isMe ? 'Asignaste' : `<strong>${escR(nm)}</strong> asignó`;
          const head = n===1 ? `${actor} a ${names}` : `${actor} ${n} colaboradores — ${names}`;
          what = `${head} <span style="color:var(--ink-3);font-weight:400">· ${escR(ev.pos)}</span>`;
        }
        if(what) items.push({when: fmtAgo(ev.ts), what});
      });
      if(t.proc>0){
        items.push({when:'Hace 30min', what: `${t.proc} colaborador${t.proc>1?'es':''} en <strong>onboarding</strong>`});
      }

      // 4) Cierre (si aplica)
      // Para el cierre se muestra una marca temporal en .when (no el label de
      // estado). r.age puede traer "Cerrada hoy"/"Cerrada ayer"/"Cerrada parcial";
      // mapeamos a un valor temporal legible.
      const cloWhen = r.age === 'Cerrada parcial' ? 'Hace 10 min'
                    : r.age === 'Cerrada hoy'     ? 'Hoy'
                    : r.age === 'Cerrada ayer'    ? 'Ayer'
                    : r.age;
      if(r.state==='cubierta'){
        items.push({when: cloWhen, what: `<strong>Requisición cubierta</strong> · ${t.cub}/${t.total} posiciones`});
      } else if(r.state==='parcial'){
        items.push({when: cloWhen, what: `<strong>Cerrada como parcial</strong> · ${t.cub}/${t.total} cubiertas`});
      }

      return `<div class="req-pane-sec" style="padding-bottom:18px">
        <div class="req-pane-h"><span class="mi">timeline</span>Historial</div>
        <div class="req-info-list" style="padding:8px 12px">
          ${items.map((it,i)=>`<div class="req-tl-item${it.muted?' muted':''}" style="padding:7px 0;${i<items.length-1?'border-bottom:1px dashed var(--line)':''}">
            <div class="when">${escR(it.when||'')}</div>
            <div class="what">${it.what}</div>
          </div>`).join('')}
        </div>
      </div>`;
    }

    // ===== SCHEDULE DETALLADO (solo "Mis requisiciones") =====
    // ============================================================
    // DETALLES DE COLABORADORES ASIGNADOS (solo "Mis requisiciones" parciales)
    // Mirror estructural de renderVacantesBreakdown — pero lista los
    // colaboradores REALMENTE asignados (con nombres deterministas, tags
    // de contrato/modalidad), agrupados por posición. Cada card es
    // colapsable; debajo de la tabla muestra el "Perfil del colaborador
    // asignado" para confirmar que cumple el requerimiento original.
    // ============================================================
    function renderAsignadosBreakdown(r, d){
      const t = totals(r);
      if(t.cub === 0){
        return `<div class="req-pane-sec">
          <div class="req-pane-h"><span class="mi">groups</span><span style="color:#9a8c7e">Detalles de colaboradores asignados</span><span class="count">0 asignados</span></div>
          <div class="req-coll-card empty" style="text-align:center;padding:18px 12px">
            <div class="mi" style="font-size:28px;color:var(--ink-4);margin-bottom:4px">groups_off</div>
            <div style="font-size:12px;color:var(--ink-2);font-weight:600">Sin colaboradores asignados</div>
            <div style="font-size:11px;color:var(--ink-3);margin-top:3px">No se asignó ningún colaborador antes de cerrar parcial.</div>
          </div>
        </div>`;
      }

      // Perfil de la posición (para mostrar contra qué se asignó)
      const PERFIL_BY_POS = {
        'Chef':          {area:'Cocina · A&B',                exp:'3 años en puestos similares', eng:'Intermedio', form:'Gastronomía / Artes culinarias',     skills:'Liderazgo, Gestión de cocina, Control de costos, BPM'},
        'Cocinero':      {area:'Cocina · A&B',                exp:'2 años en puestos similares', eng:'Básico',     form:'Gastronomía / Técnico culinario',    skills:'Cocción, prep diaria, organización'},
        'Mesero':        {area:'A&B · Servicio',              exp:'1 año en puestos similares',  eng:'Intermedio', form:'Bachillerato + curso de servicio',   skills:'Atención al cliente, manejo de bandejas, conocimiento de menú'},
        'Steward':       {area:'Stewarding · A&B',            exp:'1 año en puestos similares',  eng:'Básico',     form:'Bachillerato / Formación técnica',   skills:'Limpieza profunda, manejo de químicos, organización, BPM'},
        'Housekeeper':   {area:'Ama de llaves · Habitaciones',exp:'1 año en puestos similares',  eng:'Básico',     form:'Bachillerato',                       skills:'Limpieza profunda, cambio de blancos, atención al huésped'},
        'Hoseman':       {area:'Ama de llaves · Soporte',     exp:'1 año en puestos similares',  eng:'Básico',     form:'Bachillerato',                       skills:'Carga, organización, comunicación'},
        'Laundry':       {area:'Lavandería · A&B',            exp:'1 año en puestos similares',  eng:'Básico',     form:'Bachillerato técnico',               skills:'Manejo de químicos, equipos industriales, planchado'},
        'Mantenimiento': {area:'Mantenimiento · Operaciones', exp:'2 años en puestos similares', eng:'Básico',     form:'Técnico (electromecánica)',          skills:'Reparaciones, mantenimiento preventivo y correctivo'},
        'Electricista':  {area:'Mantenimiento · Eléctrico',   exp:'2 años en puestos similares', eng:'Básico',     form:'Técnico eléctrico certificado',      skills:'Instalación, reparación, lectura de planos'},
        'Recepción':     {area:'Recepción · Front desk',      exp:'1 año en puestos similares',  eng:'Avanzado',   form:'Hotelería / Bachillerato',           skills:'Atención al huésped, sistema de reservas, manejo de quejas'},
      };
      const DEFAULT_PERFIL = {area:'Operaciones', exp:'1 año en puestos similares', eng:'Básico', form:'Bachillerato', skills:'Trabajo en equipo, puntualidad, actitud'};

      const POS_IC = {
        'Housekeeper':'cleaning_services','Hoseman':'engineering','Chef':'restaurant_menu',
        'Laundry':'local_laundry_service','Steward':'room_service','Mesero':'restaurant',
        'Mantenimiento':'build','Recepción':'concierge','Electricista':'bolt'
      };
      const MOD_SHORT = {'Tiempo \ncompleto':'TC','Medio tiempo':'MT','Por hora':'PH','Por horas':'PH'};
      const ENG_TONE  = {'Básico':'basic','Intermedio':'inter','Avanzado':'adv','Conversacional':'adv'};

      // Colaboradores ya asignados (deterministas, mismos nombres que en Gestión)
      const groups = renderGestionCollabs(r);

      // Parser del campo r.period — hoisted (ver parseReqPeriod en helpers).

      const card = (g)=>{
        const p = r.positions[g.pi];
        const perfil = PERFIL_BY_POS[g.pos] || DEFAULT_PERFIL;
        const key = 'asig'+g.pi;
        const open = state.collOpen[key] === true; // cerrado por default
        const cubierto = p.cubierto;
        // Contrato por POSICIÓN (Fijo vs Temporal). Determina si la vacante
        // tiene sólo fecha de inicio (Fijo recurrente) o fecha de inicio +
        // fecha de finalización (Temporal por fechas específicas).
        const posConArrCard = (d.posContratos && d.posContratos[g.pi]) ? (d.posContratos[g.pi].contratos || ['Fijo']) : ['Fijo'];
        const isFijoPos = posConArrCard[0] === 'Fijo';
        const fechas = parseReqPeriod(r.period);
        return `<div class="req-coll-card ${open?'open':''}" data-mod="ok">
          <div class="req-coll-h" onclick="window.__requiToggleVac('${key}')">
            <div class="req-coll-ic"><span class="mi">${g.ic}</span></div>
            <div class="req-coll-info">
              <div class="nm">${escR(g.pos)}</div>
              <div class="det">${cubierto} asignado${cubierto===1?'':'s'} · ${p.total - cubierto} sin asignar</div>
            </div>
            <div class="req-coll-cnt">${cubierto}/${p.total}</div>
            <div class="req-coll-chev"><span class="mi">expand_more</span></div>
          </div>
          <div class="req-coll-list">
            <div class="req-coll-list-head">
              <div class="h-nm">Colaborador</div>
              <div class="h-col">Puesto</div>
              <div class="h-col">Tipo</div>
              <div class="h-col">Modalidad</div>
              <div class="h-col">Estado</div>
            </div>
            ${g.ppl.map(a=>{
              const modCls = a.mod==='Tiempo \ncompleto'?'tc':a.mod==='Medio tiempo'?'mt':'ph';
              // Mismatch: la pill mod conserva su color natural por modalidad
              // (MT=naranja, PH=ámbar). El aviso visual de mismatch vive en
              // el banner full-width debajo de la fila — la pill ya no se
              // pinta de amarillo (decisión del usuario por consistencia
              // de color por modalidad).
              const mmBanner = a.modMismatch ? `
                <div class="mm-banner" title="La vacante fue cubierta pero la modalidad asignada no coincide con la requerida">
                  <span class="mi">warning_amber</span>
                  <span class="mm-ttl">Mismatch de modalidad</span>
                  <span class="mm-pill mm-${modShortKey(a.modMismatch.required)}"><span class="lbl">Requerida</span><span class="val">${escR(a.modMismatch.required.replace(/\n/g,' '))}</span><span class="short">${modShortLbl(a.modMismatch.required)}</span></span>
                  <span class="mm-arrow">→</span>
                  <span class="mm-pill mm-${modShortKey(a.modMismatch.assigned)}"><span class="lbl">Asignada</span><span class="val">${escR(a.modMismatch.assigned.replace(/\n/g,' '))}</span><span class="short">${modShortLbl(a.modMismatch.assigned)}</span></span>
                </div>` : '';
              return `<div class="req-coll-row">
                <div class="av" style="background:${gradFor(a.nm)}">${initials(a.nm)}</div>
                <div class="nm">${escR(a.nm)}</div>
                <span class="pos-tag">${escR(g.pos)}</span>
                <span class="con-tag con-${a.con==='Fijo'?'fijo':'temporal'}">${a.con}</span>
                <span class="mod-tag mod-${modCls}">${MOD_SHORT[a.mod]||a.mod}</span>
                <span class="st ok">Asignado</span>
                ${mmBanner}
              </div>`;
            }).join('')}
            <div class="req-vac-perfil">
              <div class="req-vac-perfil-h">Perfil del colaborador asignado</div>
              <div class="req-vac-perfil-list">
                ${isFijoPos
                  ? `<div class="rvp-row"><span class="mi">event_available</span><div class="lbl">Fecha de inicio</div><div class="val">${escR(fechas.start)} <span style="color:var(--ink-3);font-weight:500;font-size:11px;margin-left:4px">· Fijo recurrente</span></div></div>`
                  : `<div class="rvp-row"><span class="mi">event_available</span><div class="lbl">Fecha de inicio</div><div class="val">${escR(fechas.start)}</div></div>
                     <div class="rvp-row"><span class="mi">event_busy</span><div class="lbl">Fecha de finalización</div><div class="val">${escR(fechas.end)} <span style="color:var(--ink-3);font-weight:500;font-size:11px;margin-left:4px">· Temporal por fechas</span></div></div>`}
                <div class="rvp-row"><span class="mi">apartment</span><div class="lbl">Área / Departamento</div><div class="val">${escR(perfil.area)}</div></div>
                <div class="rvp-row"><span class="mi">military_tech</span><div class="lbl">Experiencia mínima</div><div class="val">${escR(perfil.exp)}</div></div>
                <div class="rvp-row"><span class="mi">translate</span><div class="lbl">Nivel de inglés</div><div class="val"><span class="eng-pill eng-${ENG_TONE[perfil.eng]||'basic'}">${escR(perfil.eng)}</span></div></div>
                <div class="rvp-row"><span class="mi">school</span><div class="lbl">Formación</div><div class="val">${escR(perfil.form)}</div></div>
                <div class="rvp-row"><span class="mi">stars</span><div class="lbl">Habilidades clave</div><div class="val">${escR(perfil.skills)}</div></div>
              </div>
            </div>
          </div>
        </div>`;
      };

      return `<div class="req-pane-sec">
        <div class="req-pane-h"><span class="mi">groups</span><span style="color:#9a8c7e">Detalles de colaboradores asignados</span><span class="count">${t.cub} asignado${t.cub===1?'':'s'}</span></div>
        ${groups.map(card).join('')}
      </div>`;
    }

    // ============================================================
    // SCHEDULE DEL HOTEL DE COLABORADORES ASIGNADOS
    // Mirror de renderScheduleDetallado pero filtra posiciones con
    // colaboradores YA ASIGNADOS — sólo aparece en parciales.
    // ============================================================
    function renderScheduleAsignadosDetallado(r, d){
      const positionsWithCub = r.positions
        .map((p, pi) => ({...p, pi}))
        .filter(p => p.cubierto > 0);
      if(positionsWithCub.length === 0) return '';
      const POS_IC_SCH = {
        'Housekeeper':'cleaning_services','Hoseman':'engineering','Chef':'restaurant_menu',
        'Laundry':'local_laundry_service','Steward':'room_service','Mesero':'restaurant',
        'Mantenimiento':'build','Recepción':'concierge','Electricista':'bolt'
      };
      const START_BY_POS = {
        'Chef':'08:00','Cocinero':'08:00','Steward':'08:00',
        'Mesero':'14:00','Recepción':'07:00','Botones':'07:00',
        'Housekeeper':'08:00','Hoseman':'08:00','Laundry':'08:00',
        'Mantenimiento':'09:00','Electricista':'09:00','Plomero':'09:00',
        'Jardinero':'07:00','Seguridad':'06:00'
      };
      const addHours = (start, h) => {
        const [hh, mm] = start.split(':').map(Number);
        const total = hh*60 + mm + h*60;
        const eh = Math.floor(total/60) % 24, em = total % 60;
        return `${String(eh).padStart(2,'0')}:${String(em).padStart(2,'0')}`;
      };
      const card = (p)=>{
        const ic = POS_IC_SCH[p.pos] || 'work_outline';
        const key = 'schasig'+p.pi;
        const open = state.collOpen[key] === true;

        // ===== CASO ESPECIAL — schedules por vacante (mismatch de modalidad) =====
        // REQ-2402 Mantenimiento: cada vacante cubierta opera un schedule
        // distinto porque la modalidad asignada (PH) requiere horarios
        // reducidos. Renderizamos cards de variantes (Vacante 1, Vacante 2)
        // similares a las del bloque "Sin asignar" del REQ-2551.
        const mmScheds = MISMATCH_ASIG_SCHEDULES[r.id]?.[p.pi];
        if(mmScheds && mmScheds.length){
          const posConArr = (d.posContratos && d.posContratos[p.pi]) ? (d.posContratos[p.pi].contratos || []) : [];
          const posConDefault = posConArr[0] || 'Fijo';
          return `<div class="req-coll-card ${open?'open':''}" data-mod="ok">
            <div class="req-coll-h" onclick="window.__requiToggleVac('${key}')">
              <div class="req-coll-ic"><span class="mi">${ic}</span></div>
              <div class="req-coll-info">
                <div class="nm">${escR(p.pos)} <span style="font-weight:600;color:var(--ink-3);font-size:11px;margin-left:6px">· ${p.cubierto} asignado${p.cubierto===1?'':'s'}</span></div>
                <div class="det">Schedule Lun–Vie · <strong>Medio tiempo</strong> · cada vacante con horas diarias propias</div>
              </div>
              <span class="rsd-days-pill asig">${mmScheds.length} vacante${mmScheds.length===1?'':'s'}</span>
              <div class="req-coll-chev"><span class="mi">expand_more</span></div>
            </div>
            <div class="req-coll-list">
              <div class="rvar-intro mm-intro">
                <span class="mi">warning_amber</span>
                <div><strong>Mismatch de modalidad:</strong> esta posición requería <strong>Tiempo completo (8h/día)</strong>, pero el reclutador cubrió las vacantes con colaboradores <strong>Medio tiempo y por horas</strong> que estaban disponibles en el pool. Ambas trabajan Lun–Vie, pero con horas diarias distintas según la disponibilidad real del colaborador.</div>
              </div>
              ${mmScheds.map((v, vIdx)=>{
                const mk = variantModKey(v.mod);
                const modShort = v.mod==='Tiempo \ncompleto'?'Tiempo completo' : (v.mod==='Medio tiempo'?'Medio tiempo':'Por horas');
                const con = v.con || posConDefault;
                const ck = con==='Fijo'?'fijo':'temp';
                const dayRange = fmtVariantDayRange(v.days);
                const dayCount = v.days.length;
                const start = v.start;
                const end = addVariantHours(start, v.hours);
                const daySet = new Set(v.days);
                const totalSem = v.totalSem || (v.hours * v.days.length);
                return `<div class="rvar-card rvar-card-sch">
                  <div class="rvar-card-h">
                    <div class="rvar-num">Vacante ${vIdx+1}</div>
                    <span class="meta-pill modw" data-m="${mk}"><span class="mi">schedule</span>${escR(modShort)}</span>
                    <span class="meta-pill ctr" data-c="${ck}"><span class="mi">assignment_ind</span>${escR(con)}</span>
                    <span class="rvar-pill rvar-time"><span class="mi">access_time</span>${start} – ${end}</span>
                    <span class="rvar-pill rvar-days"><span class="mi">event</span>${escR(dayRange)} · ${dayCount} ${dayCount===1?'día':'días'}</span>
                    <span class="rvar-pill rvar-total"><span class="mi">hourglass_bottom</span>${v.hours}h/día</span>
                  </div>
                  <div class="rsd-tbl rvar-tbl">
                    <div class="rsd-tbl-head">
                      <div>Día</div>
                      <div>Frecuencia</div>
                      <div>Horario</div>
                      <div>Estado</div>
                      <div>Asignados<br>cubriendo</div>
                    </div>
                    ${DAY_LBLS.map((dlbl, di)=>{
                      const applies = daySet.has(di);
                      if(!applies){
                        return `<div class="rsd-tbl-row off">
                          <div class="rsd-day">${dlbl}</div>
                          <div><span class="rsd-pill rsd-pill-off">No<br>aplica</span></div>
                          <div class="rsd-time off">—</div>
                          <div><span class="rsd-pill rsd-pill-off">No<br>requerido</span></div>
                          <div class="rsd-cnt off">0</div>
                        </div>`;
                      }
                      return `<div class="rsd-tbl-row">
                        <div class="rsd-day on">${dlbl}</div>
                        <div>${con === 'Temporal'
                          ? `<span class="rsd-pill rsd-pill-tmp">Hasta<br>fecha fin</span>`
                          : `<span class="rsd-pill rsd-pill-freq">Cada<br>semana</span>`}</div>
                        <div class="rsd-time">${start} – ${end}</div>
                        <div><span class="rsd-pill rsd-pill-req">Cubierto</span></div>
                        <div class="rsd-cnt on" style="color:#1F8F50">1</div>
                      </div>`;
                    }).join('')}
                  </div>
                </div>`;
              }).join('')}
            </div>
          </div>`;
        }

        const sched = d.schedByPos.find(s => s.pos === p.pos) || d.schedByPos[p.pi] || {days:[]};
        const modShort = sched.modalidad==='Tiempo \ncompleto'?'Tiempo completo' : (sched.modalidad==='Medio tiempo'?'Medio tiempo':'Por horas');
        const start = START_BY_POS[p.pos] || '08:00';
        const end = addHours(start, sched.hours||8);
        const posCon = (d.posContratos && d.posContratos[p.pi]) ? (d.posContratos[p.pi].contratos || []) : [];
        const isFijo = posCon[0]==='Fijo';
        const conLbl = isFijo ? 'Fijo recurrente' : 'Temporal por fechas';
        const applies = (sched.days||[]).filter(dd => dd.applies);
        const requeridosCount = applies.length;
        return `<div class="req-coll-card ${open?'open':''}" data-mod="ok">
          <div class="req-coll-h" onclick="window.__requiToggleVac('${key}')">
            <div class="req-coll-ic"><span class="mi">${ic}</span></div>
            <div class="req-coll-info">
              <div class="nm">${escR(p.pos)} <span style="font-weight:600;color:var(--ink-3);font-size:11px;margin-left:6px">· ${p.cubierto} asignado${p.cubierto===1?'':'s'}</span></div>
              <div class="det">${escR(modShort)} · ${sched.hours||8}h · ${escR(conLbl)}</div>
            </div>
            <span class="rsd-days-pill asig">${requeridosCount} ${requeridosCount===1?'día':'días'}</span>
            <div class="req-coll-chev"><span class="mi">expand_more</span></div>
          </div>
          <div class="req-coll-list">
            <div class="rsd-tbl">
              <div class="rsd-tbl-head">
                <div>Día</div>
                <div>Frecuencia</div>
                <div>Horario</div>
                <div>Estado</div>
                <div>Asignados<br>cubriendo</div>
              </div>
              ${(sched.days||[]).map(dd=>{
                if(!dd.applies){
                  return `<div class="rsd-tbl-row off">
                    <div class="rsd-day">${dd.day}</div>
                    <div><span class="rsd-pill rsd-pill-off">No<br>aplica</span></div>
                    <div class="rsd-time off">—</div>
                    <div><span class="rsd-pill rsd-pill-off">No<br>requerido</span></div>
                    <div class="rsd-cnt off">0</div>
                  </div>`;
                }
                return `<div class="rsd-tbl-row">
                  <div class="rsd-day on">${dd.day}</div>
                  <div>${isFijo
                    ? `<span class="rsd-pill rsd-pill-freq">Cada<br>semana</span>`
                    : `<span class="rsd-pill rsd-pill-tmp">Hasta<br>fecha fin</span>`}</div>
                  <div class="rsd-time">${start} – ${end}</div>
                  <div><span class="rsd-pill rsd-pill-req">Cubierto</span></div>
                  <div class="rsd-cnt on" style="color:#1F8F50">${p.cubierto}</div>
                </div>`;
              }).join('')}
            </div>
            <div class="rsd-alert">
              <span class="mi">info</span>
              <div class="rsd-alert-body">
                Este puesto tiene <strong>${p.cubierto} colaborador${p.cubierto===1?'':'es'} asignado${p.cubierto===1?'':'s'}</strong> cumpliendo el schedule de ${escR(modShort.toLowerCase())} (${applies.map(a=>a.day).join(', ')}).
                <span class="rsd-alert-sub">${isFijo
                  ? `El Schedule del hotel se mantiene activo a partir del <strong>${escR(parseReqPeriod(r.period).start)}</strong> de forma indefinida (Fijo recurrente).`
                  : `El Schedule del hotel se mantiene activo para los días y horarios indicados durante el periodo <strong>${escR(r.period)}</strong> (Temporal por fechas).`}</span>
              </div>
            </div>
          </div>
        </div>`;
      };
      return `<div class="req-pane-sec">
        <div class="req-pane-h"><span class="mi">calendar_month</span>Schedule del hotel de colaboradores asignados</div>
        <div class="req-sch-sub">Días, frecuencia y horario que están cubriendo los colaboradores asignados</div>
        ${positionsWithCub.map(card).join('')}
      </div>`;
    }

    // Vista operativa por puesto faltante, alineada al estilo del sistema
    // (mismas cards .req-coll-card colapsables; tabla por día con pills).
    function renderScheduleDetallado(r, d){
      const t = totals(r);
      const positionsWithVac = r.positions
        .map((p, pi) => ({...p, pi, vac: p.total - p.cubierto - p.proceso}))
        .filter(p => p.vac > 0);
      if(positionsWithVac.length === 0){
        return `<div class="req-pane-sec">
          <div class="req-pane-h"><span class="mi">calendar_month</span>Schedule del hotel de colaboradores sin asignar</div>
          <div class="req-sch-sub">Detalle de días, frecuencia, horario de las vacantes requeridas</div>
          <div class="req-coll-card empty" style="text-align:center;padding:18px 12px">
            <div class="mi" style="font-size:28px;color:#1F8F50;margin-bottom:4px">check_circle</div>
            <div style="font-size:12px;color:var(--ink-2);font-weight:600">Sin vacantes pendientes</div>
            <div style="font-size:11px;color:var(--ink-3);margin-top:3px">Todas las posiciones están cubiertas.</div>
          </div>
        </div>`;
      }
      const POS_IC_SCH = {
        'Housekeeper':'cleaning_services','Hoseman':'engineering','Chef':'restaurant_menu',
        'Laundry':'local_laundry_service','Steward':'room_service','Mesero':'restaurant',
        'Mantenimiento':'build','Recepción':'concierge','Electricista':'bolt'
      };
      const START_BY_POS = {
        'Chef':'08:00','Cocinero':'08:00','Steward':'08:00',
        'Mesero':'14:00','Recepción':'07:00','Botones':'07:00',
        'Housekeeper':'08:00','Hoseman':'08:00','Laundry':'08:00',
        'Mantenimiento':'09:00','Electricista':'09:00','Plomero':'09:00',
        'Jardinero':'07:00','Seguridad':'06:00'
      };
      const addHours = (start, h) => {
        const [hh, mm] = start.split(':').map(Number);
        const total = hh*60 + mm + h*60;
        const eh = Math.floor(total/60) % 24, em = total % 60;
        return `${String(eh).padStart(2,'0')}:${String(em).padStart(2,'0')}`;
      };
      const card = (p) => {
        const variants = REQ_VAC_PROFILES[r.id]?.[p.pi];
        const ic = POS_IC_SCH[p.pos] || 'work_outline';
        const key = 'schd'+p.pi;
        const open = state.collOpen[key] === true;

        // ===== CASO ESPECIAL: schedule por variante (vacantes con horarios distintos) =====
        if(variants && variants.length){
          const totalAsign = p.cubierto + p.proceso;
          const variantsToShow = variants.slice(totalAsign, totalAsign + p.vac);
          return `<div class="req-coll-card ${open?'open':''}" data-mod="ok">
            <div class="req-coll-h" onclick="window.__requiToggleVac('${key}')">
              <div class="req-coll-ic"><span class="mi">${ic}</span></div>
              <div class="req-coll-info">
                <div class="nm">${escR(p.pos)}</div>
                <div class="det">${p.vac} vacante${p.vac>1?'s':''} con horarios distintos</div>
              </div>
              <span class="rsd-days-pill vac">${variantsToShow.length} variantes</span>
              <div class="req-coll-chev"><span class="mi">expand_more</span></div>
            </div>
            <div class="req-coll-list">
              <div class="rvar-intro">
                <span class="mi">info</span>
                <div>Cada vacante de <strong>${escR(p.pos)}</strong> opera un schedule independiente: distinta modalidad, días y horario.</div>
              </div>
              ${variantsToShow.map((v, vIdx)=>{
                const mk = variantModKey(v.mod);
                const modShort = v.mod==='Tiempo \ncompleto'?'Tiempo completo' : (v.mod==='Medio tiempo'?'Medio tiempo':'Por horas');
                const ck = v.con==='Fijo'?'fijo':'temp';
                const dayRange = fmtVariantDayRange(v.days);
                const dayCount = v.days.length;
                const start = v.start;
                const end = addVariantHours(start, v.hours);
                const daySet = new Set(v.days);
                return `<div class="rvar-card rvar-card-sch">
                  <div class="rvar-card-h">
                    <div class="rvar-num">Vacante ${vIdx+1}</div>
                    <span class="meta-pill modw" data-m="${mk}"><span class="mi">schedule</span>${escR(modShort)}</span>
                    <span class="meta-pill ctr" data-c="${ck}"><span class="mi">assignment_ind</span>${escR(v.con)}</span>
                    <span class="rvar-pill rvar-time"><span class="mi">access_time</span>${start} – ${end}</span>
                    <span class="rvar-pill rvar-days"><span class="mi">event</span>${escR(dayRange)} · ${dayCount} ${dayCount===1?'día':'días'}</span>
                  </div>
                  <div class="rsd-tbl rvar-tbl">
                    <div class="rsd-tbl-head">
                      <div>Día</div>
                      <div>Frecuencia</div>
                      <div>Horario<br>requerido</div>
                      <div>Estado</div>
                      <div>Vacantes<br>requeridas</div>
                    </div>
                    ${DAY_LBLS.map((dlbl, di)=>{
                      const applies = daySet.has(di);
                      if(!applies){
                        return `<div class="rsd-tbl-row off">
                          <div class="rsd-day">${dlbl}</div>
                          <div><span class="rsd-pill rsd-pill-off">No<br>aplica</span></div>
                          <div class="rsd-time off">—</div>
                          <div><span class="rsd-pill rsd-pill-off">No<br>requerido</span></div>
                          <div class="rsd-cnt off">0</div>
                        </div>`;
                      }
                      return `<div class="rsd-tbl-row">
                        <div class="rsd-day on">${dlbl}</div>
                        <div>${v.con === 'Temporal'
                          ? `<span class="rsd-pill rsd-pill-tmp">Hasta<br>fecha fin</span>`
                          : `<span class="rsd-pill rsd-pill-freq">Cada<br>semana</span>`}</div>
                        <div class="rsd-time">${start} – ${end}</div>
                        <div><span class="rsd-pill rsd-pill-req">Requerido</span></div>
                        <div class="rsd-cnt on">1</div>
                      </div>`;
                    }).join('')}
                  </div>
                </div>`;
              }).join('')}
            </div>
          </div>`;
        }

        const sched = d.schedByPos.find(s => s.pos === p.pos) || d.schedByPos[p.pi] || {days:[]};
        const modShort = sched.modalidad==='Tiempo \ncompleto'?'Tiempo completo' : (sched.modalidad==='Medio tiempo'?'Medio tiempo':'Por horas');
        const start = START_BY_POS[p.pos] || '08:00';
        const end = addHours(start, sched.hours||8);
        const posCon = (d.posContratos && d.posContratos[p.pi]) ? (d.posContratos[p.pi].contratos || []) : [];
        const isFijo = posCon[0]==='Fijo';
        const isTemp = posCon[0]==='Temporal';
        const conLbl = isFijo ? 'Fijo recurrente' : 'Temporal por fechas';
        const applies = (sched.days||[]).filter(dd => dd.applies);
        const requeridosCount = applies.length;
        const requeridosLbls = applies.map(dd=>dd.day).join(', ');
        const alertTxt = isFijo
          ? `Este puesto es de <strong>${modShort.toLowerCase()} fijo</strong> en los días requeridos (${requeridosLbls}). Inicia el <strong>${escR(parseReqPeriod(r.period).start)}</strong>. <span class="rsd-alert-sub">Se repite todos los días de forma indefinida como parte de la operación normal del hotel.</span>`
          : `Este puesto es <strong>${modShort.toLowerCase()} temporal por fechas específicas</strong> (${escR(r.period)}). <span class="rsd-alert-sub">Solo cubre las fechas exactas indicadas; no se repite indefinidamente.</span>`;

        // ===== CASO ESPECIAL: schedule por vacante (mismo perfil, distintos días/horas) =====
        // Sólo aplica cuando hay overrides definidos para esta posición.
        const schedOvs = REQ_VAC_SCHED_OVERRIDES[r.id]?.[p.pi];
        const totalAsignSch = p.cubierto + p.proceso;
        const vacOvs = schedOvs ? schedOvs.slice(totalAsignSch, totalAsignSch + p.vac).filter(Boolean) : null;
        if(vacOvs && vacOvs.length){
          return `<div class="req-coll-card ${open?'open':''}" data-mod="ok">
            <div class="req-coll-h" onclick="window.__requiToggleVac('${key}')">
              <div class="req-coll-ic"><span class="mi">${ic}</span></div>
              <div class="req-coll-info">
                <div class="nm">${escR(p.pos)}</div>
                <div class="det">${escR(modShort)} · ${escR(conLbl)} · <strong>Horarios distintos por vacante</strong></div>
              </div>
              <span class="rsd-days-pill vac">${vacOvs.length} vacante${vacOvs.length===1?'':'s'}</span>
              <div class="req-coll-chev"><span class="mi">expand_more</span></div>
            </div>
            <div class="req-coll-list">
              <div class="rsd-pervac-note">
                <span class="mi">info</span>
                <div>Mismo perfil de <strong>${escR(p.pos)}</strong> (${escR(modShort)} · ${posCon[0]||'Fijo'}), pero cada vacante opera su propio schedule.</div>
              </div>
              <div class="rsd-tbl rsd-tbl-pervac">
                <div class="rsd-tbl-head">
                  <div>Vacante</div>
                  <div>Días requeridos</div>
                  <div>Horario</div>
                  <div>Jornada</div>
                  <div>Estado</div>
                </div>
                ${vacOvs.map((ov, vi)=>{
                  const ovStart = ov.start || START_BY_POS[p.pos] || '08:00';
                  const ovEnd = addHours(ovStart, ov.hours||8);
                  const daysLbl = fmtVariantDayRange(ov.days);
                  return `<div class="rsd-tbl-row">
                    <div class="rsd-day on">Vacante ${vi+1}</div>
                    <div class="rsd-time">${escR(daysLbl)}</div>
                    <div class="rsd-time">${ovStart} – ${ovEnd}</div>
                    <div><span class="rsd-pill rsd-pill-freq">${ov.hours}h/día</span></div>
                    <div><span class="rsd-pill rsd-pill-req">Requerido</span></div>
                  </div>`;
                }).join('')}
              </div>
              <div class="rsd-alert">
                <span class="mi">info</span>
                <div class="rsd-alert-body">${alertTxt}</div>
              </div>
            </div>
          </div>`;
        }

        return `<div class="req-coll-card ${open?'open':''}" data-mod="ok">
          <div class="req-coll-h" onclick="window.__requiToggleVac('${key}')">
            <div class="req-coll-ic"><span class="mi">${ic}</span></div>
            <div class="req-coll-info">
              <div class="nm">${escR(p.pos)}</div>
              <div class="det">${escR(modShort)} · ${sched.hours||8}h · ${escR(conLbl)}</div>
            </div>
            <span class="rsd-days-pill vac">${requeridosCount} ${requeridosCount===1?'día':'días'}</span>
            <div class="req-coll-chev"><span class="mi">expand_more</span></div>
          </div>
          <div class="req-coll-list">
            <div class="rsd-tbl">
              <div class="rsd-tbl-head">
                <div>Día</div>
                <div>Frecuencia</div>
                <div>Horario<br>requerido</div>
                <div>Estado</div>
                <div>Vacantes<br>requeridas</div>
              </div>
              ${(sched.days||[]).map(dd=>{
                if(!dd.applies){
                  return `<div class="rsd-tbl-row off">
                    <div class="rsd-day">${dd.day}</div>
                    <div><span class="rsd-pill rsd-pill-off">No<br>aplica</span></div>
                    <div class="rsd-time off">—</div>
                    <div><span class="rsd-pill rsd-pill-off">No<br>requerido</span></div>
                    <div class="rsd-cnt off">0</div>
                  </div>`;
                }
                return `<div class="rsd-tbl-row">
                  <div class="rsd-day on">${dd.day}</div>
                  <div>${isTemp
                    ? `<span class="rsd-pill rsd-pill-tmp">Hasta<br>fecha fin</span>`
                    : `<span class="rsd-pill rsd-pill-freq">Cada<br>semana</span>`}</div>
                  <div class="rsd-time">${start} – ${end}</div>
                  <div><span class="rsd-pill rsd-pill-req">Requerido</span></div>
                  <div class="rsd-cnt on">${p.vac}</div>
                </div>`;
              }).join('')}
            </div>
            <div class="rsd-legend">
              <div class="rsd-lg-row"><span class="mi">schedule</span><strong>${escR(modShort)} (${sched.hours||8}h)</strong><span class="rsd-lg-sub">· Jornada diaria requerida</span></div>
              <div class="rsd-lg-row"><span class="mi rsd-lg-ok">check_circle</span><strong>Requerido</strong><span class="rsd-lg-sub">· Cobertura completa</span></div>
              <div class="rsd-lg-row"><span class="mi">sync</span><strong>${isTemp?'Temporal':'Fijo'}</strong><span class="rsd-lg-sub">· ${isTemp?'Aplica hasta la fecha de finalización':'Se repite cada semana'}</span></div>
              <div class="rsd-lg-row"><span class="mi rsd-lg-off">cancel</span><strong>No requerido</strong><span class="rsd-lg-sub">· Día no laborable</span></div>
            </div>
            <div class="rsd-alert">
              <span class="mi">info</span>
              <div class="rsd-alert-body">${alertTxt}</div>
            </div>
          </div>
        </div>`;
      };
      return `<div class="req-pane-sec">
        <div class="req-pane-h"><span class="mi">calendar_month</span>Schedule del hotel de colaboradores sin asignar</div>
        <div class="req-sch-sub">Detalle de días, frecuencia, horario de las vacantes requeridas</div>
        ${positionsWithVac.map(card).join('')}
      </div>`;
    }

    function renderCollabBreakdown(r, d){
      const t = totals(r);
      if(t.cub===0 && t.proc===0){
        return `<div class="req-pane-sec">
          <div class="req-pane-h"><span class="mi">groups</span>Colaboradores asignados<span class="count">0 de ${t.total}</span></div>
          <div class="req-coll-card empty" style="text-align:center;padding:18px 12px">
            <div class="mi" style="font-size:28px;color:var(--ink-4);margin-bottom:4px">groups</div>
            <div style="font-size:12px;color:var(--ink-3);font-weight:600">Sin colaboradores asignados aún</div>
            ${r.mine ? `<div style="font-size:11px;color:var(--ink-3);margin-top:3px">Ve a <strong style="color:var(--o-700)">Asignación</strong> para empezar</div>`:''}
          </div>
        </div>`;
      }
      // Generar lista determinista de quiénes están asignados, agrupados POR POSICIÓN
      const FIRST = ['María','José','Ana','Carlos','Lucía','Pedro','Sofía','Diego','Camila','Andrés','Valeria','Miguel','Paula','Jorge','Gabriela','Luis'];
      const LAST  = ['López','García','Martínez','Hernández','Pérez','Rodríguez','Sánchez','Ramírez','Torres','Flores','Díaz','Castro','Vargas','Mendoza','Ríos','Cruz'];
      let nameSeed = reqHash(r.id);
      const POS_IC = {
        'Housekeeper':'cleaning_services','Hoseman':'engineering','Chef':'restaurant_menu',
        'Laundry':'local_laundry_service','Steward':'room_service','Mesero':'restaurant',
        'Mantenimiento':'build','Recepción':'concierge','Electricista':'bolt'
      };
      // Distribuye contrato/modalidad por persona dentro de cada posición.
      // El "vacante faltante" siempre va con: contrato=Fijo, modalidad=Medio tiempo.
      const MOD_SHORT = {'Tiempo \ncompleto':'TC','Medio tiempo':'MT','Por hora':'PH','Por horas':'PH'};
      // Pool global de posiciones que rotan en la columna "Vacante"
      const ALL_POS = [
        'Mesero','Chef','Cocinero','Recepción','Bellboy','Bartender',
        'Housekeeper','Hoseman','Recamarista','Steward','Garrotero',
        'Laundry','Cajero','Anfitrión','Auditor','Ayudante',
        'Botones','Jardinero','Mantenimiento','Eléctrico','Plomero','Seguridad'
      ];
      const posCards = r.positions.map((p, pi)=>{
        const posMod = (d.posMods && d.posMods[pi]) ? (d.posMods[pi].mods || []) : [];
        const posCon = (d.posContratos && d.posContratos[pi]) ? (d.posContratos[pi].contratos || []) : [];
        const ph = reqHash(r.id + p.pos);
        const ppl = [];
        const totalAsign = p.cubierto + p.proceso;
        for(let i=0;i<p.cubierto;i++){
          const s = (nameSeed+=7);
          // contrato: alterna entre los disponibles para esta posición
          const con = posCon.length ? posCon[(ph+i) % posCon.length] : 'Fijo';
          const mod = posMod.length ? posMod[(ph+i*3) % posMod.length] : 'Tiempo \ncompleto';
          const variants = ALL_POS;
          const sub = variants[(ph+i+pi*3) % variants.length];
          ppl.push({nm:`${FIRST[s%FIRST.length]} ${LAST[(s>>3)%LAST.length]}`, st:'ok', con, mod, sub});
        }
        for(let i=0;i<p.proceso;i++){
          const s = (nameSeed+=11);
          const idx = p.cubierto + i;
          const con = posCon.length ? posCon[(ph+idx) % posCon.length] : 'Fijo';
          const mod = posMod.length ? posMod[(ph+idx*3) % posMod.length] : 'Tiempo \ncompleto';
          const variants = ALL_POS;
          const sub = variants[(ph+idx+pi*3) % variants.length];
          ppl.push({nm:`${FIRST[s%FIRST.length]} ${LAST[(s>>3)%LAST.length]}`, st:'proc', con, mod, sub});
        }
        // Contrato/modalidad por cada vacante faltante — derivado de la requisición (cycling)
        const vacCount = p.total - p.cubierto - p.proceso;
        const empties = [];
        for(let i=0;i<vacCount;i++){
          const vIdx = totalAsign + i;
          const eCon = posCon.length ? posCon[(ph+vIdx) % posCon.length] : 'Fijo';
          const eMod = posMod.length ? posMod[(ph+vIdx*3) % posMod.length] : 'Tiempo \ncompleto';
          empties.push({con:eCon, mod:eMod});
        }
        return {pos:p.pos, total:p.total, cubierto:p.cubierto, proceso:p.proceso, vac:vacCount, ppl, ic: POS_IC[p.pos] || 'work_outline', empties};
      });

      const card = (pi, c)=>{
        const key = 'pos'+pi;
        const open = state.collOpen[key];
        const cnt = c.ppl.length;
        // Sub-detalle: mostrar cubiertos / proceso / vacantes
        const detParts = [];
        if(c.cubierto>0) detParts.push(`${c.cubierto} asignado${c.cubierto>1?'s':''}`);
        if(c.proceso>0) detParts.push(`${c.proceso} en proceso`);
        if(c.vac>0) detParts.push(`${c.vac} vacante${c.vac>1?'s':''}`);
        const det = detParts.join(' · ');
        const dataMod = c.vac>0 ? 'gap' : (c.proceso>0 ? 'proc' : 'ok');
        // Caso: posición sin cubiertos ni proceso aún (solo vacantes faltantes)
        if(cnt===0){
          return `<div class="req-coll-card empty-pos" data-mod="${dataMod}">
            <div class="req-coll-h" style="cursor:default">
              <div class="req-coll-ic"><span class="mi">${c.ic}</span></div>
              <div class="req-coll-info">
                <div class="nm">${escR(c.pos)}</div>
                <div class="det">${c.vac} vacante${c.vac>1?'s':''} sin asignar</div>
              </div>
              <span class="req-coll-vac-pill">0/${c.total}</span>
            </div>
          </div>`;
        }
        return `<div class="req-coll-card ${open?'open':''}" data-mod="${dataMod}">
          <div class="req-coll-h" onclick="window.__requiToggleColl('${key}')">
            <div class="req-coll-ic"><span class="mi">${c.ic}</span></div>
            <div class="req-coll-info">
              <div class="nm">${escR(c.pos)}</div>
              <div class="det">${det}</div>
            </div>
            <div class="req-coll-cnt">${c.cubierto+c.proceso}/${c.total}</div>
            <div class="req-coll-chev"><span class="mi">expand_more</span></div>
          </div>
          <div class="req-coll-list">
            <div class="req-coll-list-head">
              <div class="h-nm">Colaborador</div>
              <div class="h-col">Vacante</div>
              <div class="h-col">Tipo</div>
              <div class="h-col">Modalidad</div>
              <div class="h-col">Estado</div>
            </div>
            ${c.ppl.map(a=>`<div class="req-coll-row">
              <div class="av" style="background:${gradFor(a.nm)}">${initials(a.nm)}</div>
              <div class="nm">${escR(a.nm)}</div>
              <span class="pos-tag">${escR(a.sub || c.pos)}</span>
              <span class="con-tag con-${a.con==='Fijo'?'fijo':a.con==='Temporal'?'temporal':a.con==='Por hora'?'ph':'temporal'}">${a.con}</span>
              <span class="mod-tag mod-${a.mod==='Tiempo \ncompleto'?'tc':a.mod==='Medio tiempo'?'mt':'ph'}">${MOD_SHORT[a.mod]||a.mod}</span>
              <span class="st ${a.st}">${a.st==='ok'?'Asignado':'Onboarding'}</span>
            </div>`).join('')}
            ${c.empties.map((e, vi)=>{
              const u = vacUrgRequi(r, pi, {pos:c.pos, total:c.total, cubierto:c.cubierto, proceso:c.proceso}, c.cubierto + c.proceso + vi);
              return `<div class="req-coll-row req-coll-row-empty">
              <div class="av empty-av urg-${u}" title="Prioridad: ${URG_LABELS[u]}"><span class="mi">person_off</span></div>
              <div class="nm urg-nm urg-${u}">${URG_LABELS[u]}</div>
              <span class="pos-tag">${escR(c.pos)}</span>
              <span class="con-tag con-${e.con==='Fijo'?'fijo':e.con==='Temporal'?'temporal':e.con==='Por hora'?'ph':'temporal'}">${e.con}</span>
              <span class="mod-tag mod-${e.mod==='Tiempo \ncompleto'?'tc':e.mod==='Medio tiempo'?'mt':'ph'}">${MOD_SHORT[e.mod]||e.mod}</span>
              <span class="st gap">Falta</span>
            </div>`;
            }).join('')}
          </div>
        </div>`;
      };

      return `<div class="req-pane-sec">
        <div class="req-pane-h"><span class="mi">groups</span>Colaboradores asignados<span class="count">${t.cub+t.proc} de ${t.total}</span></div>
        ${posCards.map((c,pi)=>card(pi,c)).join('')}
      </div>`;
    }

    // ===== VACANTES BREAKDOWN (solo "Mis requisiciones") =====
    // Reusa el mismo skeleton visual del breakdown de autorizadas:
    //   .req-coll-card / .req-coll-h / .req-coll-list / .req-coll-row
    // Pero muestra ÚNICAMENTE las filas de vacantes faltantes + un panel
    // "Perfil requerido" con la información necesaria para el reclutador.
    function renderVacantesBreakdown(r, d){
      const t = totals(r);
      if(t.vac === 0){
        return `<div class="req-pane-sec">
          <div class="req-pane-h"><span class="mi">person_off</span><span style="color:#9a8c7e">Detalles de colaboradores sin asignar</span><span class="count">0 sin cubrir</span></div>
          <div class="req-coll-card empty" style="text-align:center;padding:18px 12px">
            <div class="mi" style="font-size:28px;color:#1F8F50;margin-bottom:4px">check_circle</div>
            <div style="font-size:12px;color:var(--ink-2);font-weight:600">¡Sin vacantes faltantes!</div>
            <div style="font-size:11px;color:var(--ink-3);margin-top:3px">Todas las posiciones cuentan con colaborador.</div>
          </div>
        </div>`;
      }

      // Perfil por posición (mock contextual — se ajusta a cada puesto)
      const PERFIL_BY_POS = {
        'Chef':          {area:'Cocina · A&B',                exp:'3 años en puestos similares', eng:'Intermedio', form:'Gastronomía / Artes culinarias',     skills:'Liderazgo, Gestión de cocina, Control de costos, BPM', obs:'Manejo de personal y estándares de calidad.'},
        'Cocinero':      {area:'Cocina · A&B',                exp:'2 años en puestos similares', eng:'Básico',     form:'Gastronomía / Técnico culinario',    skills:'Cocción, prep diaria, organización',                   obs:'Limpieza y rapidez en línea.'},
        'Mesero':        {area:'A&B · Servicio',              exp:'1 año en puestos similares',  eng:'Intermedio', form:'Bachillerato + curso de servicio',   skills:'Atención al cliente, manejo de bandejas, conocimiento de menú', obs:'Excelente trato al huésped.'},
        'Steward':       {area:'Stewarding · A&B',            exp:'1 año en puestos similares',  eng:'Básico',     form:'Bachillerato / Formación técnica',   skills:'Limpieza profunda, Manejo de químicos, Organización, BPM', obs:'Disponibilidad para turnos rotativos y trabajo bajo presión.'},
        'Housekeeper':   {area:'Ama de llaves · Habitaciones',exp:'1 año en puestos similares',  eng:'Básico',     form:'Bachillerato',                       skills:'Limpieza profunda, cambio de blancos, atención al huésped', obs:'Atención al detalle y rapidez.'},
        'Hoseman':       {area:'Ama de llaves · Soporte',     exp:'1 año en puestos similares',  eng:'Básico',     form:'Bachillerato',                       skills:'Carga, organización, comunicación',                     obs:'Disponibilidad para apoyar varios pisos.'},
        'Laundry':       {area:'Lavandería · A&B',            exp:'1 año en puestos similares',  eng:'Básico',     form:'Bachillerato técnico',               skills:'Manejo de químicos, equipos industriales, planchado',    obs:'Cuidado en clasificación de blancos.'},
        'Mantenimiento': {area:'Mantenimiento · Operaciones', exp:'2 años en puestos similares', eng:'Básico',     form:'Técnico (electromecánica)',          skills:'Reparaciones, mant. preventivo y correctivo',           obs:'Disponibilidad inmediata para emergencias.'},
        'Electricista':  {area:'Mantenimiento · Eléctrico',   exp:'2 años en puestos similares', eng:'Básico',     form:'Técnico eléctrico certificado',      skills:'Instalación, reparación, lectura de planos',            obs:'Cumple normas de seguridad eléctrica.'},
        'Recepción':     {area:'Recepción · Front desk',      exp:'1 año en puestos similares',  eng:'Avanzado',   form:'Hotelería / Bachillerato',           skills:'Atención al huésped, sistema de reservas, manejo de quejas', obs:'Buena presentación y comunicación.'},
      };
      const DEFAULT_PERFIL = {area:'Operaciones', exp:'1 año en puestos similares', eng:'Básico', form:'Bachillerato', skills:'Trabajo en equipo, puntualidad, actitud', obs:'Compromiso y disponibilidad inmediata.'};

      const POS_IC = {
        'Housekeeper':'cleaning_services','Hoseman':'engineering','Chef':'restaurant_menu',
        'Laundry':'local_laundry_service','Steward':'room_service','Mesero':'restaurant',
        'Mantenimiento':'build','Recepción':'concierge','Electricista':'bolt'
      };
      const MOD_SHORT = {'Tiempo \ncompleto':'TC','Medio tiempo':'MT','Por hora':'PH','Por horas':'PH'};
      const ENG_TONE  = {'Básico':'basic','Intermedio':'inter','Avanzado':'adv','Conversacional':'adv'};

      // Periodo parseado de la requisición (para fecha inicio/fin coherentes con schedule)
      // monthIdx: Ene=0..Dic=11. Año fijo 2026 (igual que el resto del mock).
      const MONTH_MAP_R = {ene:0,feb:1,mar:2,abr:3,may:4,jun:5,jul:6,ago:7,sep:8,oct:9,nov:10,dic:11};
      const parsedPeriod = (() => {
        const m = (r.period||'').match(/(\d{1,2})\s*[–\-]\s*(\d{1,2})\s+(\w+)/);
        if(m){
          const mk = m[3].slice(0,3).toLowerCase();
          return {sDay:+m[1], eDay:+m[2], monthIdx: MONTH_MAP_R[mk] ?? 11, monthName:m[3]};
        }
        const m2 = (r.period||'').match(/(\d{1,2})\s+(\w+)/);
        if(m2){
          const mk = m2[2].slice(0,3).toLowerCase();
          return {sDay:+m2[1], eDay:+m2[1], monthIdx: MONTH_MAP_R[mk] ?? 11, monthName:m2[2]};
        }
        return null;
      })();
      const startDate = parsedPeriod
        ? `${String(parsedPeriod.sDay).padStart(2,'0')} ${parsedPeriod.monthName} 2026`
        : (r.period || '—');
      // Día-de-semana 0=Lun..6=Dom desde Date.getDay() (0=Dom..6=Sab)
      const dowMonStart = (jsDow) => (jsDow + 6) % 7;
      // Última fecha del periodo cuyo día-de-semana esté marcado como "aplica" en el schedule.
      // Si no hay schedule o nada coincide, devuelve el último día del periodo.
      const endDateForSchedule = (sched) => {
        if(!parsedPeriod) return '—';
        const {sDay, eDay, monthIdx, monthName} = parsedPeriod;
        const appliesByDow = sched && sched.days
          ? sched.days.map(d => !!d.applies)            // index 0=Lun..6=Dom
          : [true,true,true,true,true,true,true];
        for(let day = eDay; day >= sDay; day--){
          const dow = dowMonStart(new Date(2026, monthIdx, day).getDay());
          if(appliesByDow[dow]) return `${String(day).padStart(2,'0')} ${monthName} 2026`;
        }
        return `${String(eDay).padStart(2,'0')} ${monthName} 2026`;
      };

      const positionsWithVac = r.positions
        .map((p, pi) => ({...p, pi, vac: p.total - p.cubierto - p.proceso}))
        .filter(p => p.vac > 0);

      const card = (p) => {
        const posCon = (d.posContratos && d.posContratos[p.pi]) ? (d.posContratos[p.pi].contratos || []) : [];
        const posMod = (d.posMods && d.posMods[p.pi]) ? (d.posMods[p.pi].mods || []) : [];
        const perfil = PERFIL_BY_POS[p.pos] || DEFAULT_PERFIL;
        const ic = POS_IC[p.pos] || 'work_outline';
        const variants = REQ_VAC_PROFILES[r.id]?.[p.pi];

        // ===== CASO ESPECIAL: vacantes con perfiles individuales por variante =====
        if(variants && variants.length){
          const key = 'vacv'+p.pi;
          const open = state.collOpen[key] === true;
          const detParts = [];
          if(p.cubierto>0) detParts.push(`${p.cubierto} asignado${p.cubierto>1?'s':''}`);
          if(p.proceso>0) detParts.push(`${p.proceso} en proceso`);
          if(p.vac>0)     detParts.push(`${p.vac} vacante${p.vac>1?'s':''} con requisitos distintos`);
          const det = detParts.join(' · ');
          // Solo renderizar variantes que correspondan a vacantes faltantes
          const totalAsign = p.cubierto + p.proceso;
          const variantsToShow = variants.slice(totalAsign, totalAsign + p.vac);
          return `<div class="req-coll-card ${open?'open':''}" data-mod="gap">
            <div class="req-coll-h" onclick="window.__requiToggleVac('${key}')">
              <div class="req-coll-ic"><span class="mi">${ic}</span></div>
              <div class="req-coll-info">
                <div class="nm">${escR(p.pos)}</div>
                <div class="det">${det}</div>
              </div>
              <div class="req-coll-cnt">${p.cubierto+p.proceso}/${p.total}</div>
              <div class="req-coll-chev"><span class="mi">expand_more</span></div>
            </div>
            <div class="req-coll-list">
              <div class="rvar-intro">
                <span class="mi">info</span>
                <div>Cada vacante de <strong>${escR(p.pos)}</strong> tiene requisitos distintos. Revisa el perfil de cada una antes de asignar.</div>
              </div>
              ${variantsToShow.map((v, vIdx)=>{
                const mk = variantModKey(v.mod);
                const ck = v.con==='Fijo'?'fijo':'temp';
                const ek = variantEngKey(v.eng);
                const modShort = v.mod==='Tiempo \ncompleto'?'Tiempo completo' : (v.mod==='Medio tiempo'?'Medio tiempo':'Por horas');
                const dayRange = fmtVariantDayRange(v.days);
                const dayCount = v.days.length;
                const start = v.start;
                const end = addVariantHours(start, v.hours);
                return `<div class="rvar-card">
                  <div class="rvar-card-h">
                    <div class="rvar-num">Vacante ${vIdx+1}</div>
                    <span class="meta-pill modw" data-m="${mk}"><span class="mi">schedule</span>${escR(modShort)}</span>
                    <span class="meta-pill ctr" data-c="${ck}"><span class="mi">assignment_ind</span>${escR(v.con)}</span>
                    <span class="eng-pill eng-${ek}">Inglés ${escR(v.eng)}</span>
                    <span class="rvar-pill rvar-exp"><span class="mi">military_tech</span>${escR(v.exp)}</span>
                    <span class="rvar-status"><span class="mi">person_off</span>Sin asignar</span>
                  </div>
                  <div class="rvar-card-body">
                    <div class="rvar-row"><span class="mi">event</span><div class="lbl">Días</div><div class="val">${escR(dayRange)} · ${dayCount} ${dayCount===1?'día':'días'}</div></div>
                    <div class="rvar-row"><span class="mi">schedule</span><div class="lbl">Horario</div><div class="val">${start} – ${end} · ${v.hours}h</div></div>
                    ${(()=>{
                      // Fijo  → solo fecha de inicio (recurrente, sin fin)
                      // Temporal → fecha de inicio + fecha de finalización
                      if(v.con === 'Temporal'){
                        const appliesByDow = [0,1,2,3,4,5,6].map(i => (v.days||[]).includes(i));
                        const fakeSched = {days: appliesByDow.map(a=>({applies:a}))};
                        return `<div class="rvar-row"><span class="mi">event_available</span><div class="lbl">Fecha de inicio</div><div class="val">${escR(startDate)}</div></div>
                    <div class="rvar-row"><span class="mi">event_busy</span><div class="lbl">Fecha de finalización</div><div class="val">${escR(endDateForSchedule(fakeSched))} <span class="rvp-tmp-tag">Temporal</span></div></div>`;
                      }
                      return `<div class="rvar-row"><span class="mi">event_available</span><div class="lbl">Fecha de inicio</div><div class="val">${escR(startDate)} <span class="rvp-tmp-tag" style="background:rgba(20,134,130,.10);color:#0E6B68">Fijo recurrente</span></div></div>`;
                    })()}
                    <div class="rvar-row"><span class="mi">apartment</span><div class="lbl">Área</div><div class="val">${escR(v.area||perfil.area)}</div></div>
                    <div class="rvar-row"><span class="mi">stars</span><div class="lbl">Habilidades clave</div><div class="val">${escR(v.skills||perfil.skills)}</div></div>
                  </div>
                </div>`;
              }).join('')}
            </div>
          </div>`;
        }

        const ph = reqHash(r.id + p.pos);
        const totalAsign = p.cubierto + p.proceso;

        const vacRows = [];
        for(let i=0; i<p.vac; i++){
          const vIdx = totalAsign + i;
          const eCon = posCon.length ? posCon[(ph+vIdx) % posCon.length] : 'Fijo';
          const eMod = posMod.length ? posMod[(ph+vIdx*3) % posMod.length] : 'Tiempo \ncompleto';
          vacRows.push({con: eCon, mod: eMod});
        }

        const vKey = 'vac'+p.pi;
        const vOpen = state.collOpen[vKey] === true; // cerrado por default

        // Mensaje del subtítulo del header
        const detParts = [];
        if(p.cubierto>0) detParts.push(`${p.cubierto} asignado${p.cubierto>1?'s':''}`);
        if(p.proceso>0) detParts.push(`${p.proceso} en proceso`);
        if(p.vac>0)     detParts.push(`${p.vac} vacante${p.vac>1?'s':''}`);
        const det = detParts.join(' · ');

        return `<div class="req-coll-card ${vOpen?'open':''}" data-mod="gap">
          <div class="req-coll-h" onclick="window.__requiToggleVac('${vKey}')">
            <div class="req-coll-ic"><span class="mi">${ic}</span></div>
            <div class="req-coll-info">
              <div class="nm">${escR(p.pos)}</div>
              <div class="det">${det}</div>
            </div>
            <div class="req-coll-cnt">${p.cubierto+p.proceso}/${p.total}</div>
            <div class="req-coll-chev"><span class="mi">expand_more</span></div>
          </div>
          <div class="req-coll-list">
            <div class="req-coll-list-head">
              <div class="h-nm">Colaborador</div>
              <div class="h-col">Vacante</div>
              <div class="h-col">Tipo</div>
              <div class="h-col">Modalidad</div>
              <div class="h-col">Estado</div>
            </div>
            ${vacRows.map((e, vi)=>{
              const u = vacUrgRequi(r, p.pi, p, p.cubierto + p.proceso + vi);
              return `<div class="req-coll-row req-coll-row-empty">
              <div class="av empty-av urg-${u}" title="Prioridad: ${URG_LABELS[u]}"><span class="mi">person_off</span></div>
              <div class="nm urg-nm urg-${u}">${URG_LABELS[u]}</div>
              <span class="pos-tag">${escR(p.pos)}</span>
              <span class="con-tag con-${e.con==='Fijo'?'fijo':'temporal'}">${e.con}</span>
              <span class="mod-tag mod-${e.mod==='Tiempo \ncompleto'?'tc':e.mod==='Medio tiempo'?'mt':'ph'}">${MOD_SHORT[e.mod]||e.mod}</span>
              <span class="st gap">Falta</span>
            </div>`;
            }).join('')}
            <div class="req-vac-perfil">
              <div class="req-vac-perfil-h">Perfil requerido</div>
              <div class="req-vac-perfil-list">
                <div class="rvp-row"><span class="mi">event</span><div class="lbl">Fecha de inicio</div><div class="val">${escR(startDate)}</div></div>
                ${vacRows.some(e => e.con === 'Temporal') ? `<div class="rvp-row"><span class="mi">event_busy</span><div class="lbl">Fecha de finalización</div><div class="val">${escR(endDateForSchedule(d.schedByPos && d.schedByPos[p.pi]))} <span class="rvp-tmp-tag">Temporal</span></div></div>` : ''}
                <div class="rvp-row"><span class="mi">apartment</span><div class="lbl">Área / Departamento</div><div class="val">${escR(perfil.area)}</div></div>
                <div class="rvp-row"><span class="mi">military_tech</span><div class="lbl">Experiencia mínima</div><div class="val">${escR(perfil.exp)}</div></div>
                <div class="rvp-row"><span class="mi">translate</span><div class="lbl">Nivel de inglés</div><div class="val"><span class="eng-pill eng-${ENG_TONE[perfil.eng]||'basic'}">${escR(perfil.eng)}</span></div></div>
                <div class="rvp-row"><span class="mi">school</span><div class="lbl">Formación</div><div class="val">${escR(perfil.form)}</div></div>
                <div class="rvp-row"><span class="mi">stars</span><div class="lbl">Habilidades clave</div><div class="val">${escR(perfil.skills)}</div></div>
                <div class="rvp-row"><span class="mi">sticky_note_2</span><div class="lbl">Observaciones</div><div class="val">${escR(perfil.obs)}</div></div>
              </div>
            </div>
          </div>
        </div>`;
      };

      return `<div class="req-pane-sec">
        <div class="req-pane-h"><span class="mi">person_off</span><span style="color:#9a8c7e">Detalles de colaboradores sin asignar</span><span class="count">${t.vac} sin cubrir</span></div>
        ${positionsWithVac.map(card).join('')}
      </div>`;
    }

    // ============================================================
    // GESTIÓN DE COLABORADORES — Tab para requisiciones parciales
    // (mis requisiciones + state='parcial')
    // ============================================================
    // Genera la lista determinista de COLABORADORES YA ASIGNADOS a la
    // requisición, agrupados por posición. Cada fila ofrece:
    //   · Reasignar — mover a otro hotel (motivo + nuevo destino)
    //   · Desasignar — liberar la posición (motivo)
    // Las acciones se registran en r._gestion[pi] = { actions: [...] }
    // y la fila refleja el estado resultante (con opción de "Deshacer").
    function renderGestionCollabs(r){
      const FIRST = ['María','José','Ana','Carlos','Lucía','Pedro','Sofía','Diego','Camila','Andrés','Valeria','Miguel','Paula','Jorge','Gabriela','Luis','Rosa','Daniel','Elena','Marco'];
      const LAST  = ['López','García','Martínez','Hernández','Pérez','Rodríguez','Sánchez','Ramírez','Torres','Flores','Díaz','Castro','Vargas','Mendoza','Ríos','Cruz','Núñez','Salinas','Aguilar','Vega'];
      const d = reqDerive(r);
      const POS_IC = {
        'Housekeeper':'cleaning_services','Hoseman':'engineering','Chef':'restaurant_menu',
        'Laundry':'local_laundry_service','Steward':'room_service','Mesero':'restaurant',
        'Mantenimiento':'build','Recepción':'concierge','Electricista':'bolt'
      };
      let seed = reqHash(r.id);
      // Nombres fijos para las vacantes con MISMATCH de modalidad — usamos
      // los mismos personajes que el caso ejemplo original de Marina Bay
      // (V1=Gabriela Vega · MT, V2=José López · PH).
      // Estructura: { reqId: { posIdx: { itemIdx: 'Nombre Apellido', ... } } }
      const MISMATCH_NAMES = {
        'REQ-2402': { 0: { 0: 'Gabriela Vega', 1: 'José López' } },
        'REQ-2302': { 0: { 0: 'Gabriela Vega', 1: 'José López' } },
        'REQ-2598': { 0: { 0: 'Gabriela Vega', 1: 'José López' } },
      };
      return r.positions.map((p, pi)=>{
        if(p.cubierto <= 0) return null;
        const posMod = (d.posMods && d.posMods[pi]) ? (d.posMods[pi].mods || []) : [];
        const posCon = (d.posContratos && d.posContratos[pi]) ? (d.posContratos[pi].contratos || []) : [];
        const ph = reqHash(r.id + p.pos);
        const ppl = [];
        for(let i=0;i<p.cubierto;i++){
          const s = (seed+=7);
          const con = posCon.length ? posCon[(ph+i) % posCon.length] : 'Fijo';
          let mod = posMod.length ? posMod[(ph+i*3) % posMod.length] : 'Tiempo \ncompleto';
          // MISMATCH OVERRIDE — REQ-2402 Mantenimiento
          const mm = modMismatchFor(r.id, pi, i);
          if(mm) mod = mm.assigned;
          // Pool status (semáforo) — referencia visual de cada colaborador.
          // Regla de negocio: en Gestión de colaboradores solo se puede
          // reasignar / desasignar candidatos que al momento de asignarse
          // estaban "Disponible" (verde) o "Disp. voluntario" (amarillo).
          // Por eso TODAS las requis parciales muestran a sus colaboradores
          // como "Disponible" (verdef).
          //  · Excepción: las requis con MISMATCH de modalidad (Marina Bay
          //    parcial REQ-2402, Marina Bay cubierta REQ-2302, Ejemplo
          //    Parcial en proceso REQ-2598) son los casos ejemplo:
          //    - Las vacantes con mismatch fuerzan poolStatus = amarillo
          //      (Disp. voluntario) — coherente con el caso de negocio: el
          //      colaborador asignado era voluntario disponible con horas
          //      reducidas, por eso aceptó la vacante pese al mismatch.
          //    - Las vacantes que SÍ cumplen 100% se renderizan como
          //      verdef (Disponible) — perfiles que coincidían al 100%.
          let poolStatus;
          const _isMismatchReq = (r.id === 'REQ-2402' || r.id === 'REQ-2302' || r.id === 'REQ-2598');
          if(_isMismatchReq){
            poolStatus = mm ? 'amarillo' : 'verdef';
          } else {
            poolStatus = 'verdef';
          }
          // Override de nombre para vacantes con mismatch (Gabriela Vega / José López).
          const overrideName = (MISMATCH_NAMES[r.id]?.[pi]?.[i]) || null;
          const personName = overrideName || `${FIRST[s%FIRST.length]} ${LAST[(s>>3)%LAST.length]}`;
          ppl.push({
            idx:i,
            nm: personName,
            con, mod,
            modMismatch: mm || null,
            poolStatus,
          });
        }
        return {pi, pos:p.pos, ic: POS_IC[p.pos] || 'work_outline', total:p.total, ppl, posMod, posCon};
      }).filter(Boolean);
    }

    // Devuelve {label, sub} para una clave de estado del pool.
    function poolStatusInfo(key){
      const MAP = {
        verdef:   {label:'Disponible',         sub:'Listo para asignar'},
        amarillo: {label:'Disp. voluntario',   sub:'Por horas / fin de semana'},
        naranja:  {label:'Fijo',               sub:'En requisición permanente'},
        cafe:     {label:'Asignación temp.',   sub:'Cobertura corta'},
        verdem:   {label:'Onboarding D1-2',    sub:'Inducción inicial'},
        azul:     {label:'Día 3+ uniforme',    sub:'En entrega de uniforme'},
        blanco:   {label:'Pre-asignación',     sub:'Captura sin asignar'},
        rosa:     {label:'Stand by',           sub:'Pausa temporal'},
        morado:   {label:'No regresó',         sub:'Falta sin aviso'},
        rojo:     {label:'Reportado',          sub:'Incidencia abierta'},
      };
      return MAP[key] || MAP.naranja;
    }

    function renderGestionPane(r, d){
      const isActive = state.drawerTab==='gestion';
      const MOD_SHORT = {'Tiempo \ncompleto':'TC','Medio tiempo':'MT','Por hora':'PH','Por horas':'PH'};
      const groups = renderGestionCollabs(r);

      // Copy adaptativo según estado de cierre.
      // Parcial → "cerrada parcialmente" (operación incompleta).
      // Cubierta → "cubierta exitosamente" (operación completa, gestión post-cierre).
      const introLead = r.state==='cubierta'
        ? 'Gestiona los colaboradores activos en esta requisición <strong>cubierta exitosamente</strong>.'
        : 'Gestiona los colaboradores activos en esta requisición <strong>cerrada parcialmente</strong>.';

      const intro = `
        <div class="req-gest-intro">
          <span class="mi">manage_accounts</span>
          <div class="txt">
            ${introLead}
            Puedes <strong>reasignarlos a otro hotel</strong> o <strong>desasignarlos</strong> si terminan su asignación. Los cambios actualizan el Schedule de los hoteles y el historial del colaborador automáticamente.
          </div>
        </div>`;

      const body = groups.length === 0
        ? `<div class="req-pane-sec">
            <div class="req-coll-card empty" style="text-align:center;padding:24px 12px;margin:0 14px">
              <div class="mi" style="font-size:32px;color:var(--ink-4);margin-bottom:6px">groups_off</div>
              <div style="font-size:12.5px;color:var(--ink-2);font-weight:600">Sin colaboradores asignados</div>
              <div style="font-size:11.5px;color:var(--ink-3);margin-top:4px">No hay colaboradores que gestionar en esta requisición.</div>
            </div>
          </div>`
        : groups.map(g => {
            const gst = (r._gestion && r._gestion[g.pi]) ? r._gestion[g.pi].actions || [] : [];
            const actionFor = idx => gst.find(a => a.idx === idx);
            const activeCount = g.ppl.filter(p => !actionFor(p.idx)).length;
            const openKey = 'gest'+g.pi;
            // Por default abierto la primera posición; las demás cerradas.
            const isOpen = state.collOpen[openKey] !== undefined
              ? !!state.collOpen[openKey]
              : (g === groups[0]);
            return `<div class="req-gest-pos ${isOpen?'open':''}">
              <div class="req-gest-pos-h" onclick="window.__requiToggleColl('${openKey}')">
                <div class="req-gest-pos-ic"><span class="mi">${g.ic}</span></div>
                <div class="req-gest-pos-info">
                  <div class="req-gest-pos-nm">${escR(g.pos)}</div>
                  <div class="req-gest-pos-det">${activeCount} activo${activeCount===1?'':'s'} · ${g.ppl.length} asignado${g.ppl.length===1?'':'s'} originalmente</div>
                </div>
                <span class="req-gest-pos-asig" title="Colaboradores asignados activos"><span class="mi">check_circle</span>${activeCount} asignado${activeCount===1?'':'s'}</span>
                <span class="req-gest-pos-cnt">${activeCount}/${g.total}</span>
                <div class="req-gest-pos-chev"><span class="mi">expand_more</span></div>
              </div>
              <div class="req-gest-list">
              ${g.ppl.map(person => {
                const act = actionFor(person.idx);
                const rowCls = act ? (act.type==='reasignado' ? 'is-reasignado' : 'is-desasignado') : '';
                // Status sólo se renderiza cuando hay un cambio explícito
                // (reasignado / desasignado). El estado "Asignado" por default
                // ya está representado por la pill verde del header.
                const status = act
                  ? (act.type==='reasignado'
                    ? `<span class="req-gest-status reasignado"><span class="mi">swap_horiz</span>Reasignado</span>`
                    : `<span class="req-gest-status desasignado"><span class="mi">person_off</span>Desasignado</span>`)
                  : '';
                const actions = act
                  ? `<button class="req-gest-undo" onclick="window.__requiGestionUndo('${r.id}', ${g.pi}, ${person.idx})"><span class="mi">undo</span>Deshacer</button>`
                  : `<button class="req-gest-act" onclick="window.__requiOpenGestion('${r.id}', 'reasignar', ${g.pi}, ${person.idx})" title="Reasignar a otro hotel"><span class="mi">swap_horiz</span>Reasignar</button>
                     <button class="req-gest-act danger" onclick="window.__requiOpenGestion('${r.id}', 'desasignar', ${g.pi}, ${person.idx})" title="Desasignar de la requisición"><span class="mi">person_remove</span>Desasignar</button>`;
                const conCls = person.con==='Fijo' ? 'fijo' : 'temporal';
                const modCls = person.mod==='Tiempo \ncompleto' ? 'tc' : (person.mod==='Medio tiempo' ? 'mt' : 'ph');
                // Pool status — el reclutador necesita ver el semáforo del
                // colaborador (no la modalidad pedida en la requi). Mostramos
                // un tag con bolita de color del pool + label corto. El sub
                // ("Por horas / fin de semana", etc.) va en tooltip.
                const ps = poolStatusInfo(person.poolStatus);
                const psTag = `<span class="pool-status-tag" data-ps="${person.poolStatus}" title="${escR(ps.label)} — ${escR(ps.sub)}"><span class="ps-dot" style="background:${({verdef:'#1FA84A',amarillo:'#FFD500',naranja:'#FF7A00',cafe:'#8B5A2B',verdem:'#7CDB45',azul:'#3FB8E6',blanco:'#E8E0D5',rosa:'#FF1493',morado:'#7B2CBF',rojo:'#E11919'})[person.poolStatus]||'#FF7A00'}"></span>${escR(ps.label)}</span>`;
                const metaLine = act
                  ? (act.type==='reasignado'
                    ? `<div class="req-gest-meta-line"><strong>→ ${escR(act.hotel)}</strong> · ${escR(act.motivo)} · ${escR(act.when)}${act.sensitive?' · <span style="color:#A07000"><span class="mi" style="font-size:11px;vertical-align:-1px">verified</span> Notificado al Manager</span>':''}</div>`
                    : `<div class="req-gest-meta-line"><strong>Motivo:</strong> ${escR(act.motivo)} · ${escR(act.when)} · <em>Posición liberada en pool</em></div>`)
                  : '';
                return `<div class="req-gest-row ${rowCls}">
                  <div class="req-gest-av" style="background:${gradFor(person.nm)}">${initials(person.nm)}</div>
                  <div class="req-gest-info">
                    <div class="req-gest-nm">${escR(person.nm)}</div>
                    <div class="req-gest-tags">
                      <span class="req-gest-tag ${conCls}">${escR(person.con)}</span>
                      <span class="req-gest-tag ${modCls}">${escR(MOD_SHORT[person.mod] || person.mod)}</span>
                      ${psTag}
                    </div>
                  </div>
                  ${status}
                  <div class="req-gest-acts">${actions}</div>
                  ${metaLine}
                </div>`;
              }).join('')}
              </div>
            </div>`;
          }).join('');

      return `<div class="req-drawer-pane ${isActive?'active':''}" data-pane="gestion">
        ${intro}
        ${body}
        <div style="height:14px"></div>
      </div>`;
    }

    // Lista de hoteles destino para reasignación: otros hoteles activos (excluyendo el actual).
    function gestionDestinationHotels(currentHotel){
      const seen = new Set();
      const all = REQUIS.map(r=>r.hotel).filter(h=>{
        if(h===currentHotel) return false;
        if(seen.has(h)) return false;
        seen.add(h); return true;
      });
      // Marca algunos como "sensibles" (VIP) para activar el flujo de aprobación del Manager.
      const VIP = new Set(['Hotel Aurora Beach','Hotel Marina Bay','Hotel Punta Vista']);
      return all.map(h => ({nm:h, sensitive: VIP.has(h)}));
    }

    window.__requiOpenGestion = (reqId, action, posIdx, idx) => {
      const r = REQUIS.find(x=>x.id===reqId);
      if(!r) return;
      const groups = renderGestionCollabs(r);
      const g = groups.find(x=>x.pi===posIdx);
      const person = g && g.ppl.find(p=>p.idx===idx);
      if(!person) return;
      state.gest = { reqId, action, posIdx, idx, person, posName: g.pos };
      if(action==='reasignar'){
        const hotels = gestionDestinationHotels(r.hotel);
        state.gest.hotelChoice = hotels[0]?.nm || '';
        state.gest.motivoChoice = 'Solicitud del hotel';
      } else {
        state.gest.motivoChoice = 'Fin de asignación';
      }
      renderGestionModal();
      document.getElementById('requi-gest-modal-bg').classList.add('open');
    };

    window.__requiCloseGestion = () => {
      const bg = document.getElementById('requi-gest-modal-bg');
      if(bg) bg.classList.remove('open');
      state.gest = null;
    };

    window.__requiGestionChangeHotel = v => { if(state.gest){ state.gest.hotelChoice = v; renderGestionModal(); } };
    window.__requiGestionChangeMotivo = v => { if(state.gest){ state.gest.motivoChoice = v; renderGestionModal(); } };

    window.__requiGestionConfirm = () => {
      const g = state.gest; if(!g) return;
      const r = REQUIS.find(x=>x.id===g.reqId); if(!r) return;
      if(!r._gestion) r._gestion = {};
      if(!r._gestion[g.posIdx]) r._gestion[g.posIdx] = { actions: [] };
      const when = 'Hace un momento';
      if(g.action==='reasignar'){
        const hotels = gestionDestinationHotels(r.hotel);
        const target = hotels.find(h=>h.nm===g.hotelChoice);
        r._gestion[g.posIdx].actions.push({
          idx: g.idx, type:'reasignado',
          hotel: g.hotelChoice, motivo: g.motivoChoice,
          sensitive: !!(target && target.sensitive),
          when,
        });
        showToast(`✓ ${g.person.nm} reasignado a ${g.hotelChoice}`, {
          icon: target?.sensitive ? 'verified' : 'swap_horiz',
        });
      } else {
        r._gestion[g.posIdx].actions.push({
          idx: g.idx, type:'desasignado',
          motivo: g.motivoChoice, when,
        });
        showToast(`✓ ${g.person.nm} desasignado · ${g.motivoChoice}`, {icon:'person_remove'});
      }
      window.__requiCloseGestion();
      renderDrawer();
      window.__renderRequi();
    };

    window.__requiGestionUndo = (reqId, posIdx, idx) => {
      const r = REQUIS.find(x=>x.id===reqId);
      if(!r || !r._gestion || !r._gestion[posIdx]) return;
      const arr = r._gestion[posIdx].actions || [];
      const i = arr.findIndex(a=>a.idx===idx);
      if(i>=0) arr.splice(i,1);
      renderDrawer();
      showToast(`↩ Acción revertida`);
    };

    function renderGestionModal(){
      const m = document.getElementById('requi-gest-modal');
      if(!m) return;
      const g = state.gest; if(!g) return;
      const r = REQUIS.find(x=>x.id===g.reqId);
      const isRe = g.action==='reasignar';
      const hotels = isRe ? gestionDestinationHotels(r.hotel) : [];
      const target = isRe ? hotels.find(h=>h.nm===g.hotelChoice) : null;
      const sensitive = isRe && target && target.sensitive;
      const motivosRe = ['Solicitud del hotel','Decisión operativa','Solicitud del colaborador','Rotación programada'];
      const motivosDes = ['Fin de asignación','Fin de contrato','Problema operativo','Solicitud del colaborador','Solicitud del hotel'];
      const motivos = isRe ? motivosRe : motivosDes;
      const title = isRe ? 'Reasignar colaborador' : 'Desasignar colaborador';
      const sub = isRe ? 'Mueve al colaborador a otro hotel' : 'Libera la posición y devuelve al colaborador al Pool';
      m.innerHTML = `
        <div class="req-gest-modal-h">
          <div class="ic ${isRe?'re':'des'}"><span class="mi">${isRe?'swap_horiz':'person_remove'}</span></div>
          <div>
            <h3>${title}</h3>
            <div class="sub">${sub}</div>
          </div>
        </div>
        <div class="req-gest-modal-body">
          <div class="who">
            <div class="av" style="background:${gradFor(g.person.nm)}">${initials(g.person.nm)}</div>
            <div>
              <div class="nm">${escR(g.person.nm)}</div>
              <div class="pos">${escR(g.posName)} · ${escR(r.hotel)} · ${escR(r.id)}</div>
            </div>
          </div>
          ${isRe ? `
            <label>Nuevo hotel destino</label>
            <select onchange="window.__requiGestionChangeHotel(this.value)">
              ${hotels.map(h=>`<option value="${escR(h.nm)}" ${h.nm===g.hotelChoice?'selected':''}>${escR(h.nm)}${h.sensitive?' · VIP':''}</option>`).join('')}
            </select>
            <div style="height:12px"></div>
          ` : ''}
          <label>${isRe?'Motivo de reasignación':'Motivo de desasignación'}</label>
          <select onchange="window.__requiGestionChangeMotivo(this.value)">
            ${motivos.map(mt=>`<option value="${escR(mt)}" ${mt===g.motivoChoice?'selected':''}>${escR(mt)}</option>`).join('')}
          </select>
          ${sensitive ? `
            <div class="sensitive-note">
              <span class="mi">verified</span>
              <div><strong>Hotel VIP — requiere aprobación.</strong> Al confirmar, se notifica al Manager para aprobación antes de actualizar Schedules.</div>
            </div>
          ` : ''}
        </div>
        <div class="req-gest-modal-foot">
          <button class="btn ghost" onclick="window.__requiCloseGestion()">Cancelar</button>
          <button class="btn primary" onclick="window.__requiGestionConfirm()">
            <span class="mi">${isRe?'swap_horiz':'person_remove'}</span>${isRe?'Confirmar reasignación':'Confirmar desasignación'}
          </button>
        </div>
      `;
    }

    function renderAsignacionPane(r, d){
      const isActive = state.drawerTab==='asignacion';
      const hint = `<div class="req-hint"><span class="mi">person_add</span><div>Asigna colaboradores del <strong>Pool</strong>. Cuando todas las vacantes de una posición tengan los mismos requisitos, podrás asignar varios a la vez.</div></div>`;

      // Iconos por posición (mismo set que se usa en otras vistas)
      const POS_IC_ASIG = {
        'Housekeeper':'cleaning_services','Hoseman':'engineering','Chef':'restaurant_menu',
        'Laundry':'local_laundry_service','Steward':'room_service','Mesero':'restaurant',
        'Mantenimiento':'build','Recepción':'concierge','Electricista':'bolt'
      };
      // Perfiles por posición — MISMO source que renderVacantesBreakdown (detalles)
      // para garantizar paridad de datos entre el panel de detalles y asignación.
      const PERFIL_BY_POS_A = {
        'Chef':          {exp:'3 años en puestos similares', eng:'Intermedio'},
        'Cocinero':      {exp:'2 años en puestos similares', eng:'Básico'},
        'Mesero':        {exp:'1 año en puestos similares',  eng:'Intermedio'},
        'Steward':       {exp:'1 año en puestos similares',  eng:'Básico'},
        'Housekeeper':   {exp:'1 año en puestos similares',  eng:'Básico'},
        'Hoseman':       {exp:'1 año en puestos similares',  eng:'Básico'},
        'Laundry':       {exp:'1 año en puestos similares',  eng:'Básico'},
        'Mantenimiento': {exp:'2 años en puestos similares', eng:'Básico'},
        'Electricista':  {exp:'2 años en puestos similares', eng:'Básico'},
        'Recepción':     {exp:'1 año en puestos similares',  eng:'Avanzado'},
      };
      const DEFAULT_PERFIL_A = {exp:'1 año en puestos similares', eng:'Básico'};
      // "3 años en puestos similares" → "3 años"
      const shortExp = (s)=> {
        const m = (s||'').match(/^(\d+(?:\.\d+)?\s*(?:años?|meses?))/i);
        return m ? m[1] : (s||'—');
      };
      const DAYS_LBL_ASIG = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
      const fmtDayRangeAsig = (idxs)=>{
        if(!idxs || !idxs.length) return '—';
        const sorted = [...idxs].sort((a,b)=>a-b);
        let contig = true;
        for(let i=1;i<sorted.length;i++) if(sorted[i] !== sorted[i-1]+1){ contig = false; break; }
        if(contig && sorted.length>=3) return `${DAYS_LBL_ASIG[sorted[0]]} – ${DAYS_LBL_ASIG[sorted[sorted.length-1]]}`;
        return sorted.map(i=>DAYS_LBL_ASIG[i]).join(', ');
      };
      const cleanMod = (m)=> m==='Tiempo \ncompleto' ? 'Tiempo completo' : m;
      const hoursFor = (m)=> m==='Tiempo \ncompleto' ? 8 : (m==='Medio tiempo' ? 4 : 2);

      const positions = r.positions.map((p, pi)=>{
        const vacCount = p.total - p.cubierto - p.proceso; // SOLO vacantes faltantes
        if(vacCount <= 0) return ''; // Si ya están todas cubiertas → no se muestra

        const open = state.posOpen[pi] !== false; // abierto por default
        const ic = POS_IC_ASIG[p.pos] || 'work_outline';
        const perfil = PERFIL_BY_POS_A[p.pos] || DEFAULT_PERFIL_A;
        const posCon = (d.posContratos && d.posContratos[pi]) ? (d.posContratos[pi].contratos || ['Fijo']) : ['Fijo'];
        const posMod = (d.posMods && d.posMods[pi]) ? (d.posMods[pi].mods || ['Tiempo \ncompleto']) : ['Tiempo \ncompleto'];
        const sched = (d.schedByPos && d.schedByPos[pi]) ? d.schedByPos[pi] : null;
        // Días aplicables desde el schedule del hotel (paridad con detalles)
        const posDayIdxs = sched ? sched.days.map((dd,i)=>dd.applies?i:-1).filter(i=>i>=0) : [0,1,2,3,4];

        const variants = REQ_VAC_PROFILES[r.id]?.[pi];
        // Overrides de schedule por vacante (solo días/horas, mantiene perfil)
        const schedOverrides = REQ_VAC_SCHED_OVERRIDES[r.id]?.[pi];
        const totalAsign = p.cubierto + p.proceso;

        // Construir las vacantes faltantes — mismo data flow que detalles
        const empties = [];
        const ph = reqHash(r.id + p.pos);
        for(let i=0; i<vacCount; i++){
          const vIdx = totalAsign + i;
          if(variants && variants[vIdx]){
            // Variante con perfil propio
            const v = variants[vIdx];
            empties.push({
              modalidad: v.mod, contrato: v.con, ingles: v.eng, exp: v.exp,
              dayIndices: v.days, hours: v.hours,
            });
          } else {
            // Perfil compartido a nivel posición
            const eCon = posCon[(ph+vIdx) % posCon.length];
            const eMod = posMod[(ph+vIdx*3) % posMod.length];
            // Si hay override de schedule por vacante, sustituye SOLO días/horas.
            const ov = schedOverrides && schedOverrides[vIdx];
            empties.push({
              modalidad: eMod, contrato: eCon, ingles: perfil.eng, exp: shortExp(perfil.exp),
              dayIndices: ov ? ov.days  : posDayIdxs,
              hours:      ov ? ov.hours : (sched ? sched.hours : hoursFor(eMod)),
            });
          }
        }

        // Detectar si todas son uniformes para mostrar "asignar múltiples"
        const uniform = empties.length>1 && empties.every(v =>
          v.modalidad===empties[0].modalidad && v.ingles===empties[0].ingles &&
          v.exp===empties[0].exp && v.contrato===empties[0].contrato &&
          v.hours===empties[0].hours && JSON.stringify(v.dayIndices)===JSON.stringify(empties[0].dayIndices)
        );
        // Hoteles donde permitimos "asignar múltiples" aun cuando las vacantes
        // tienen requerimientos distintos: el sistema hace el best-match por vacante
        // bajo cada combinación de variables. El reclutador puede ir manual si quiere.
        const HOTELS_MULTI_DIVERSO = ['Hotel Costa del Sol'];
        const allowMultiDiverso = empties.length>1 && HOTELS_MULTI_DIVERSO.includes(r.hotel);
        // Caso "mismo perfil, distintos horarios" (p.ej. REQ-2577 Mesero/Steward): también
        // habilitamos asignar múltiples — los pills son uniformes y solo difiere el schedule.
        const hasSchedOnlyDiverso = empties.length>1 && !!REQ_VAC_SCHED_OVERRIDES[r.id]?.[pi];

        const vacantesHTML = empties.map((v, vi)=>{
          const mk = variantModKey(v.modalidad);
          const ck = v.contrato==='Fijo'?'fijo':'temp';
          const ek = variantEngKey(v.ingles);
          const modLbl = cleanMod(v.modalidad);
          const dayRange = fmtDayRangeAsig(v.dayIndices);
          const dayCount = v.dayIndices.length;
          const schedLine = `${dayRange} · ${dayCount} ${dayCount===1?'día':'días'} · ${v.hours}h/día`;
          const realVIdx = totalAsign + vi;

          const pills = `
            <span class="meta-pill modw" data-m="${mk}"><span class="mi">schedule</span>${escR(modLbl)}</span>
            <span class="meta-pill ctr" data-c="${ck}"><span class="mi">assignment_ind</span>${escR(v.contrato)}</span>
            <span class="eng-pill eng-asg eng-${ek}">Inglés ${escR(v.ingles)}</span>
            <span class="rvar-pill rvar-exp"><span class="mi">military_tech</span>${escR(v.exp)}</span>`;

          return `<div class="req-vac empty">
            <div class="req-vac-main">
              <div class="req-vac-circle">${vi+1}</div>
              <div class="req-vac-content">
                <div class="req-vac-pills">${pills}</div>
                <div class="req-vac-sched"><span class="mi">event</span>${escR(schedLine)}</div>
              </div>
              <div class="req-vac-actions">
                <button class="req-vac-act outline" onclick="window.__requiOpenAssign('${r.id}', ${pi}, ${realVIdx})"><span class="mi">add</span>Asignar</button>
              </div>
            </div>
          </div>`;
        }).join('');

        const multiInfo = ((uniform || allowMultiDiverso || hasSchedOnlyDiverso) && r.mine) ? (()=>{
          let variant = 'uniform', icon = 'flash_on', msg = `Las ${empties.length} vacantes faltantes son idénticas — puedes asignar varios a la vez`;
          if(hasSchedOnlyDiverso && !uniform){
            variant = 'sched';
            icon   = 'event_repeat';
            msg    = `Las ${empties.length} vacantes comparten el mismo perfil — sólo varía el <strong>horario</strong>. El sistema hará el mejor match a cada turno. Tú puedes ajustar manualmente.`;
          } else if(allowMultiDiverso && !uniform){
            variant = 'diverso';
            icon   = 'auto_awesome';
            msg    = `Las ${empties.length} vacantes tienen requisitos distintos — el sistema hará el <strong>mejor match</strong> por cada una, o puedes revisarlos en el Pool de colaboradores.`;
          }
          return {
            box: `<div class="req-pos-multi" data-variant="${variant}"><span class="mi">${icon}</span><span>${msg}</span></div>`,
            btn: `<button class="req-pos-multi-btn" onclick="window.__requiOpenAssign('${r.id}', ${pi}, 'multi')"><span class="mi">group_add</span>Asignar múltiples</button>`,
          };
        })() : null;

        return `<div class="req-pos ${open?'open':''}">
          <div class="req-pos-h" onclick="window.__requiTogglePos(${pi})">
            <div class="req-pos-ic"><span class="mi">${ic}</span></div>
            <div class="req-pos-info">
              <div class="nm">${escR(p.pos)}</div>
              <div class="det">${vacCount} ${vacCount===1?'vacante faltante':'vacantes faltantes'}</div>
            </div>
            ${(()=>{
              const ub = posUrgBreakdown(p, r.urg, r, pi);
              return '';
            })()}
            <span class="req-pos-cov empty">${p.cubierto}/${p.total} cubierta${p.total===1?'':'s'}</span>
            <div class="req-pos-chev"><span class="mi">expand_more</span></div>
          </div>
          <div class="req-pos-body">
            ${multiInfo ? multiInfo.box : ''}
            ${empties.length ? `<div class="req-vac-section-h">
              <span class="lbl">Vacantes</span>
              ${multiInfo ? multiInfo.btn : ''}
            </div>` : ''}
            ${vacantesHTML}
          </div>
        </div>`;
      }).join('');

      // Si no quedan vacantes faltantes en ninguna posición
      const totalVac = r.positions.reduce((s,p)=>s + Math.max(0, p.total - p.cubierto - p.proceso), 0);
      const emptyState = totalVac === 0 ? `
        <div class="req-coll-card empty" style="text-align:center;padding:18px 12px;margin:0">
          <div class="mi" style="font-size:28px;color:#1F8F50;margin-bottom:4px">check_circle</div>
          <div style="font-size:12px;color:var(--ink-2);font-weight:600">¡Sin vacantes faltantes!</div>
          <div style="font-size:11px;color:var(--ink-3);margin-top:3px">Todas las posiciones cuentan con colaborador.</div>
        </div>` : '';

      // Banner de prioridades — resume cuántas vacantes están en cada
      // tier (Urgente / Pronto / Normal) para que el reclutador sepa
      // por dónde empezar al asignar.
      const _ub = reqUrgBreakdown(r);
      const prioBanner = '';

      return `<div class="req-drawer-pane ${isActive?'active':''}" data-pane="asignacion">
        ${hint}
        ${prioBanner}
        <div class="req-pane-sec" style="padding-bottom:18px">
          <div class="req-pane-h"><span class="mi">person_off</span>Vacantes por asignar<span class="count">${totalVac} ${totalVac===1?'faltante':'faltantes'}</span></div>
          ${emptyState || positions}
        </div>
      </div>`;
    }

    function renderDrawerFoot(r, t, showAssign){
      let foot;
      if(!r.mine){
        const otrosN = r.takers ? r.takers.filter(x=>x.id!=='me').length : 0;
        foot = `<button class="btn primary" onclick="window.__requiTake('${r.id}')"><span class="mi">${otrosN?'group_add':'flag'}</span>${otrosN?'Unirme a la requisición':'Tomar requisición'}</button>`;
      } else if(r.state==='proceso'){
        if(state.drawerTab==='asignacion'){
          // En tab asignación viven las acciones de cierre.
          // "Cerrar parcial" va a la izquierda; "Marcar cubierta" (acción primaria) a la derecha.
          // Regla: si la requi ya está 100% cubierta, NO se puede cerrar parcial
          // (no tiene sentido cerrar parcial algo que está completo).
          // Si la requi tiene 0 cubiertos, NO se puede marcar cubierta.
          const isFull = t.cub >= t.total;
          const isEmpty = t.cub <= 0;
          const partialDisabled = isFull;
          const cubiertaDisabled = !isFull;
          foot = `<button class="btn ghost" onclick="window.__requiClose('${r.id}','parcial')" ${partialDisabled?'disabled style="opacity:.5;cursor:not-allowed" title="No se puede cerrar parcial: todas las vacantes están asignadas"':''}><span class="mi">published_with_changes</span>Cerrar parcial</button>
                  <button class="btn primary" onclick="window.__requiClose('${r.id}','cubierta')" ${cubiertaDisabled?`disabled style="opacity:.5;cursor:not-allowed" title="Faltan ${t.total - t.cub} vacantes por asignar"`:''}><span class="mi">check_circle</span>Marcar cubierta</button>`;
        } else {
          // En detalles / historial el drawer no tiene footer.
          return '';
        }
      } else {
        // Estados finales (cubierta / parcial): sin footer.
        return '';
      }
      return `<div class="req-drawer-foot">${foot}</div>`;
    }

    // ===== MODAL ASIGNAR =====
    window.__requiOpenAssign = (reqId, posIdx, vacIdx) => {
      const r = REQUIS.find(x=>x.id===reqId);
      if(!r) return;
      if(posIdx===undefined || posIdx===null){
        posIdx = r.positions.findIndex(p=>p.cubierto<p.total);
        if(posIdx<0) posIdx = 0;
      }
      state.assignReqId = reqId;
      state.assignPosIdx = posIdx;
      state.assignVacIdx = vacIdx; // numero, 'multi' o undefined
      state.assignSel = null;
      state.assignSearch = '';
      state.assignFilters = []; // chips activos
      // Marca si el flujo arrancó como "Asignar" (única vacante) vs "Asignar múltiples".
      // Aunque luego promovamos a la UI smart, mantenemos el copy específico de single-assign.
      state.assignFromSingle = (vacIdx !== 'multi' && vacIdx !== undefined);
      // Auto-promover a UI multi/smart cuando hay candidatos pre-clasificados para esa posición.
      // Mantiene los mismos componentes y estilos del modal de "Asignar múltiples" incluso
      // cuando se asigna a una sola vacante (el footer/título se adapta a 1 vacante).
      if(vacIdx !== 'multi' && MULTI_CANDIDATES[reqId]?.[posIdx]){
        vacIdx = 'multi';
        state.assignVacIdx = 'multi';
      }
      // Multi-assign: estado independiente
      if(vacIdx === 'multi'){
        const cands = (MULTI_CANDIDATES[reqId]?.[posIdx]) || [];
        const pos = r.positions[posIdx];
        const remaining = pos ? (pos.total - pos.cubierto - pos.proceso) : cands.length;
        // Pre-selección:
        //  - Si el flujo viene de "Asignar" (vacante única) → NO pre-seleccionar nada.
        //    El reclutador elige manualmente cuál candidato asignar.
        //  - Si viene de "Asignar múltiples" → pre-seleccionar hasta `remaining` (mejor score primero).
        const preSel = state.assignFromSingle
          ? []
          : [...cands].sort((a,b)=>b.score-a.score).slice(0, Math.max(0, remaining));
        state.multiSel = new Set(preSel.map(c=>c.id));
        state.multiSort = 'match';
        state.multiSortOpen = false;
        // Chips inteligentes — todos activos por defecto
        state.multiChips = new Set(['pos','related','zone','eng','exp','dispo','volunt']);
        state.multiNotes = {}; // {candId: comentario}
      }
      renderAssignModal();
      const bg = document.getElementById('requi-modal-bg');
      const md = document.getElementById('requi-modal');
      bg?.classList.add('open');
      if(md){
        if(vacIdx === 'multi') md.classList.add('multi'); else md.classList.remove('multi');
      }
    };
    window.__requiCloseAssign = () => {
      document.getElementById('requi-modal-bg')?.classList.remove('open');
    };
    window.__requiPickPool = id => { state.assignSel = state.assignSel===id?null:id; renderAssignModal(); };
    window.__requiAssignSearch = (v) => { state.assignSearch = v||''; renderAssignModal(); };
    window.__requiRemoveFilter = (k) => {
      state.assignFilters = state.assignFilters.filter(x=>x!==k);
      renderAssignModal();
    };

    // ===== MULTI-ASIGNAR — handlers =====
    window.__requiMultiTogglePick = (id) => {
      if(!state.multiSel) return;
      // Si ya está seleccionado, simplemente deselecciona.
      if(state.multiSel.has(id)){
        state.multiSel.delete(id);
        renderAssignModal();
        return;
      }
      // Si NO está seleccionado, validar que no excedamos el cupo:
      //  - Asignar (vacante única): cupo = 1
      //  - Asignar múltiples: cupo = vacantes faltantes
      const r = REQUIS.find(x=>x.id===state.assignReqId);
      const p = r ? r.positions[state.assignPosIdx] : null;
      const remaining = p ? (p.total - p.cubierto - p.proceso) : Infinity;
      const cap = state.assignFromSingle ? 1 : remaining;
      if(state.multiSel.size >= cap){
        // Bloqueo — el usuario debe deseleccionar a alguien antes de elegir otro.
        const msg = state.assignFromSingle
          ? 'Solo puedes asignar 1 colaborador para esta vacante. Deselecciona el actual antes de elegir otro.'
          : `Solo puedes asignar ${cap} colaborador${cap===1?'':'es'}. Deselecciona uno antes de elegir otro.`;
        window.toast && window.toast(msg, 'info');
        return;
      }
      state.multiSel.add(id);
      renderAssignModal();
    };
    window.__requiMultiToggleSortMenu = (e) => {
      if(e) e.stopPropagation();
      state.multiSortOpen = !state.multiSortOpen;
      renderAssignModal();
    };
    window.__requiMultiSetSort = (s) => {
      state.multiSort = s;
      state.multiSortOpen = false;
      renderAssignModal();
    };
    window.__requiMultiToggleChip = (k) => {
      if(!state.multiChips) return;
      if(state.multiChips.has(k)) state.multiChips.delete(k);
      else state.multiChips.add(k);
      renderAssignModal();
    };
    window.__requiMultiSetNote = (id, val) => {
      if(!state.multiNotes) state.multiNotes = {};
      state.multiNotes[id] = val;
    };
    // Registra una asignación en el historial cronológico de la requisición.
    // Cada entrada captura: timestamp + posición + lista de nombres asignados.
    // El timeline (renderTimeline) lee este log y muestra "Hace X · Asignaste a …"
    // por evento, en lugar de un agregado anónimo "Asignaste N colaboradores".
    function logAssign(r, posName, names){
      if(!r._assignLog) r._assignLog = [];
      const clean = names.filter(Boolean);
      r._assignLog.push({ts: Date.now(), pos: posName, names: clean});
      pushHist(r, {who: ME, type:'assign', pos: posName, names: clean});
    }
    window.__requiMultiConfirm = () => {
      const r = REQUIS.find(x=>x.id===state.assignReqId);
      if(!r) return;
      const p = r.positions[state.assignPosIdx];
      const n = state.multiSel?.size || 0;
      if(n===0) return;
      // Captura los IDs seleccionados ANTES de cerrar el modal (state.multiSel se reinicia).
      const selectedIds = [...state.multiSel];
      // Suma cubiertos hasta el total
      const room = p.total - p.cubierto - p.proceso;
      const add = Math.min(n, room);
      for(let i=0; i<add; i++){
        p.cubierto += 1;
        const idx = p.segs.findIndex(s=>s.st==='vacante');
        if(idx>=0) p.segs[idx].st='cubierto';
      }
      p.vacante = p.total - p.cubierto - p.proceso;
      // Resolver nombres desde MULTI_CANDIDATES (smart-match) o POOL como fallback.
      const cands = (MULTI_CANDIDATES[r.id]?.[state.assignPosIdx]) || [];
      const names = selectedIds.slice(0, add).map(id => {
        const c = cands.find(x=>x.id===id) || POOL.find(x=>x.id===id);
        return c?.nm || id;
      });
      logAssign(r, p.pos, names);
      window.__requiCloseAssign();
      renderDrawer();
      window.__renderRequi();
      showToast(`✓ ${add} colaborador${add>1?'es':''} asignado${add>1?'s':''} a ${p.pos} en ${r.id}`);
    };
    window.__requiConfirmAssign = () => {
      const r = REQUIS.find(x=>x.id===state.assignReqId);
      if(!r || !state.assignSel) return;
      const p = r.positions[state.assignPosIdx];
      if(p.cubierto<p.total){
        p.cubierto += 1;
        const idx = p.segs.findIndex(s=>s.st==='vacante');
        if(idx>=0) p.segs[idx].st='cubierto';
        p.vacante = p.total - p.cubierto - p.proceso;
      }
      const who = POOL.find(c=>c.id===state.assignSel);
      logAssign(r, p.pos, [who?.nm || state.assignSel]);
      window.__requiCloseAssign();
      renderDrawer();
      window.__renderRequi();
      showToast(`✓ ${who?.nm} asignado a ${p.pos} en ${r.id}`);
    };

    function matchScore(c, p){
      // Heurística simple: posición igual = 100, mismo eng/exp variantes
      let sc = c.pos===p.pos ? 90 : 30;
      if(c.eng==='Avanzado') sc += 8;
      if(c.exp && /3\s*años|2\s*años|3y|2y/.test(c.exp)) sc += 5;
      sc -= ((c.id?.length||0)%5);
      return Math.max(20, Math.min(100, sc));
    }

    function renderAssignModal(){
      const m = document.getElementById('requi-modal');
      if(!m) return;
      const r = REQUIS.find(x=>x.id===state.assignReqId);
      if(!r) return;
      const p = r.positions[state.assignPosIdx];
      const isMulti = state.assignVacIdx==='multi';
      if(isMulti){ return renderAssignModalMulti(m, r, p); }
      const search = (state.assignSearch||'').toLowerCase();

      let pool = POOL.filter(c=>c.pos===p.pos);
      if(search) pool = pool.filter(c => (c.nm||'').toLowerCase().includes(search) || (c.zone||'').toLowerCase().includes(search));
      // Aplicar chips de filtros activos
      state.assignFilters.forEach(f=>{
        if(f.startsWith('zone:')){ const z = f.slice(5); pool = pool.filter(c=>c.zone===z); }
        if(f.startsWith('eng:')){  const e = f.slice(4); pool = pool.filter(c=>c.eng===e); }
      });

      // Score + sort
      const scored = pool.map(c=>({c, s: matchScore(c, p)})).sort((a,b)=>b.s-a.s);

      // Chips activos por defecto: posición + zona del hotel
      const defaultChips = [
        {k:`pos:${p.pos}`, lbl:p.pos, lock:true},
        {k:`zone:${r.zone}`, lbl:`Zona ${r.zone}`}
      ];
      // Combinar con filtros del usuario
      const allChipsKeys = new Set([...defaultChips.map(c=>c.k), ...state.assignFilters]);
      const allChips = [...allChipsKeys].map(k=>{
        const def = defaultChips.find(c=>c.k===k);
        if(def) return def;
        if(k.startsWith('zone:')) return {k, lbl:`Zona ${k.slice(5)}`};
        if(k.startsWith('eng:')) return {k, lbl:`Inglés ${k.slice(4)}`};
        return {k, lbl:k};
      });

      const titleSuffix = isMulti
        ? ` · <strong>Asignar múltiples</strong> a ${p.total - p.cubierto - p.proceso} vacantes`
        : (state.assignVacIdx!==undefined ? ` · Vacante ${state.assignVacIdx+1}` : '');

      m.innerHTML = `
        <div class="req-modal-h">
          <div>
            <h3>${isMulti?'Asignar múltiples colaboradores':'Asignar colaborador'}</h3>
            <div class="sub">${escR(r.id)} · ${escR(r.hotel)} · <strong>${escR(p.pos)}</strong>${titleSuffix}</div>
          </div>
          <div class="req-modal-x" onclick="window.__requiCloseAssign()"><span class="mi">close</span></div>
        </div>
        <div class="req-modal-body">
          <div class="req-modal-search">
            <span class="mi">search</span>
            <input type="text" placeholder="Buscar por nombre, DOC o zona…" value="${escR(state.assignSearch||'')}" oninput="window.__requiAssignSearch(this.value)" />
          </div>
          <div class="req-modal-chips">
            ${allChips.map(c=>`<span class="req-modal-chip">${escR(c.lbl)}${c.lock?'':`<span class="x" onclick="window.__requiRemoveFilter('${c.k}')">close</span>`}</span>`).join('')}
            <span style="font-size:11px;color:var(--ink-3);align-self:center;margin-left:auto"><strong style="color:var(--ink-2)">${scored.length}</strong> compatibles</span>
          </div>
          ${scored.length ? scored.map(({c, s})=>{
            const matchCls = s>=80?'':(s>=60?'med':'low');
            return `<div class="req-pool-row ${state.assignSel===c.id?'selected':''}" onclick="window.__requiPickPool('${c.id}')">
              <div class="av" style="background:${gradFor(c.id)}">${initials(c.nm)}</div>
              <div class="info">
                <div class="nm">${escR(c.nm)} <span class="match ${matchCls}"><span class="mi">workspace_premium</span>${s}%</span></div>
                <div class="det">
                  <span class="tag">${escR(c.zone)}</span>
                  <span class="tag">${escR(c.eng)}</span>
                  <span class="tag">${escR(c.exp)}</span>
                  <span style="color:var(--ink-3);margin-left:4px">DOC ${escR((c.id||'').replace('C-',''))}</span>
                </div>
              </div>
              <div class="req-pool-check"></div>
            </div>`;
          }).join('') : `<div style="text-align:center;padding:30px;color:var(--ink-3);font-size:13px">
            <div class="mi" style="font-size:32px;color:var(--ink-4);margin-bottom:6px">person_off</div>
            No hay colaboradores compatibles.<br><span style="font-size:11px">Intenta quitar filtros o buscar en el Pool.</span>
          </div>`}
          <div class="req-modal-pool-link" onclick="window.__requiCloseAssign(); navigate(document.querySelector('.sb-item[data-page=Reclutamiento]'),'Reclutamiento'); window.toast('Abriendo Pool de colaboradores','groups')">
            <span class="mi">open_in_new</span>Buscar en el Pool completo
          </div>
        </div>
        <div class="req-modal-foot">
          <span class="req-modal-foot-info">${state.assignSel?'<strong>1</strong> seleccionado':'Selecciona un colaborador'}</span>
          <button class="btn ghost" onclick="window.__requiCloseAssign()">Cancelar</button>
          <button class="btn primary" onclick="window.__requiConfirmAssign()" ${!state.assignSel?'style="opacity:.5;pointer-events:none"':''}><span class="mi">person_add</span>Asignar</button>
        </div>
      `;
    }

    function renderAssignModalMulti(m, r, p){
      const cands = (MULTI_CANDIDATES[r.id]?.[state.assignPosIdx]) || [];
      const search = (state.assignSearch||'').toLowerCase();
      const sortKey = state.multiSort || 'match';
      const chips = state.multiChips || new Set();
      const sel = state.multiSel || new Set();

      const expYears = (s) => {
        const m = (s||'').match(/(\d+)/);
        return m ? +m[1] : 0;
      };

      // Filtros por chips
      let list = cands.filter(c=>{
        if(!chips.has('pos') && !c.related) return false;
        if(!chips.has('related') && c.related) return false;
        if(!chips.has('dispo') && c.dispo === 'Disponible') return false;
        if(!chips.has('volunt') && c.dispo === 'Disponible voluntario') return false;
        return true;
      });
      if(search){
        list = list.filter(c =>
          (c.nm||'').toLowerCase().includes(search) ||
          (c.doc||'').toLowerCase().includes(search)
        );
      }

      // Orden
      list = [...list].sort((a,b)=>{
        if(sortKey === 'match') return b.score - a.score;
        if(sortKey === 'exp')   return expYears(b.exp) - expYears(a.exp);
        if(sortKey === 'cercano') return (a.zone==='Centro'?0:1) - (b.zone==='Centro'?0:1);
        if(sortKey === 'dispo')   return (a.dispo==='Disponible'?0:1) - (b.dispo==='Disponible'?0:1);
        return 0;
      });

      const total = p.total - p.cubierto - p.proceso;
      const selN = sel.size;
      // Límite de selección:
      //  - Asignar (vacante única): 1 único colaborador
      //  - Asignar múltiples: tantas como vacantes faltantes
      const cap = state.assignFromSingle ? 1 : total;
      const atCap = selN >= cap;  // Si ya alcanzamos el cupo, los no-seleccionados quedan "locked".

      const sortLbls = {
        match:'Mejor match', exp:'Más experiencia', cercano:'Más cercano', dispo:'Disponibles primero'
      };
      const sortIcons = {
        match:'trending_up', exp:'work_history', cercano:'place', dispo:'event_available'
      };

      const ENG_K = (e) => {
        const k = (e||'').toLowerCase();
        if(k.startsWith('básico')||k.startsWith('basico')) return 'basic';
        if(k.startsWith('inter')) return 'inter';
        return 'adv';
      };

      const cardHTML = (c) => {
        const selected = sel.has(c.id);
        const locked = !selected && atCap;  // No se pueden agregar más: card aparece desactivado.
        const partial = !!c.partial;
        const ek = ENG_K(c.eng);
        const isModMismatch = /modalidad/i.test(c.reason || '');
        const isExpMismatch = /experiencia/i.test(c.reason || '');
        const isEngMismatch = /ingl[ée]s/i.test(c.reason || '');
        // Modalidad "amarilla" (advertencia suave, no mismatch crítico) — usado cuando el candidato
        // es voluntario y ofrece medio tiempo aunque la posición sea TC.
        const modClass = c.modWarn ? 'mod-warn'
                       : (isModMismatch ? 'mod-mismatch' : 'mod');
        return `<div class="ram-card ${selected?'selected':''} ${partial?'partial':''} ${locked?'locked':''}" onclick="window.__requiMultiTogglePick('${c.id}')">
          <div class="ram-card-h">
            <div class="ram-card-check"></div>
            <div class="ram-card-av" style="background:${gradFor(c.id)}">${initials(c.nm)}</div>
            <div class="ram-card-main">
              <div class="ram-card-name">
                ${escR(c.nm)}
                <span class="ram-card-doc">DOC ${escR(c.doc)}</span>
                <span class="ram-card-dispo ${c.dispo==='Disponible voluntario'?'volunt':''}">${escR(c.dispo)}</span>
                <span class="ram-card-history"><span class="mi">history</span>${escR(c.history)}</span>
              </div>
              <div class="ram-tags">
                <span class="ram-tag ${c.related?'pos-rel':'pos'}">
                  <span class="mi">${c.related?'handyman':'check_circle'}</span>${escR(c.pos)}
                </span>
                <span class="ram-tag zone"><span class="mi">place</span>${escR(c.zone)}</span>
                <span class="ram-tag ${isEngMismatch?'eng-mismatch':'eng-'+ek}">Inglés ${escR(c.eng)}</span>
                <span class="ram-tag ${modClass}">${escR(c.mod)}</span>
                <span class="ram-tag ${isExpMismatch?'exp-mismatch':'exp'}">${escR(c.exp)}</span>
              </div>
            </div>
            <div class="ram-card-right">
              <div class="ram-card-score">
                <div class="lbl ${partial?'partial':''}">${partial?'Match parcial':'Match'}</div>
                <div class="val ${partial?'partial':''}">${c.score}%</div>
              </div>
              <button class="ram-card-perfil" onclick="event.stopPropagation();window.toast&&window.toast('Abriendo perfil de ${escR(c.nm)}','badge')"><span class="mi">visibility</span>Ver perfil</button>
            </div>
          </div>
          ${selected ? `<div class="ram-match-banner">
            <div class="ram-match-h">
              <span class="mi">${partial?'favorite_border':'favorite'}</span>
              Match ${c.score}% · ${escR(c.reason)}
            </div>
            <div class="ram-match-input-wrap">
              ${partial
                ? `<input class="ram-match-input" type="text" value="${escR(state.multiNotes?.[c.id] ?? c.note ?? '')}" placeholder="Motivo o nota interna…" onclick="event.stopPropagation()" oninput="window.__requiMultiSetNote('${c.id}', this.value)" />`
                : `<span class="mi lead">edit</span><input class="ram-match-input with-icon" type="text" value="${escR(state.multiNotes?.[c.id] ?? '')}" placeholder="Agregar comentario para el hotel o líder…" onclick="event.stopPropagation()" oninput="window.__requiMultiSetNote('${c.id}', this.value)" />`}
            </div>
          </div>` : ''}
        </div>`;
      };

      m.innerHTML = `
        <div class="req-modal-h">
          <div>
            <h3>${state.assignFromSingle?'Asignar colaborador':'Asignar múltiples'} · ${escR(p.pos)}</h3>
            <div class="ram-sub">${escR(r.id)} · ${escR(r.hotel)} · <b>${total} ${total===1?'vacante':'vacantes'}</b> · sistema elige mejor match · <b>${cands.length} candidatos</b></div>
          </div>
          <div class="req-modal-x" onclick="window.__requiCloseAssign()"><span class="mi">close</span></div>
        </div>
        <div class="req-modal-body">
          <div class="ram-search-row">
            <div class="req-modal-search">
              <span class="mi">search</span>
              <input type="text" placeholder="Buscar por nombre o DOC…" value="${escR(state.assignSearch||'')}" oninput="window.__requiAssignSearch(this.value)" />
            </div>
            <div class="ram-sort ${state.multiSortOpen?'open':''}">
              <button class="ram-sort-btn" onclick="window.__requiMultiToggleSortMenu(event)">
                <span class="mi">sort</span>${sortLbls[sortKey]}<span class="mi ic-chev">expand_more</span>
              </button>
              <div class="ram-sort-menu">
                <div class="ram-sort-cap">Ordenar por</div>
                ${Object.keys(sortLbls).map(k=>`
                  <div class="ram-sort-opt ${sortKey===k?'active':''}" onclick="window.__requiMultiSetSort('${k}')">
                    <span class="mi">${sortIcons[k]}</span>${sortLbls[k]}<span class="mi check">check</span>
                  </div>`).join('')}
              </div>
            </div>
          </div>

          <div class="ram-banner">
            <div class="ic"><span class="mi">auto_awesome</span></div>
            <div>Pre-seleccionamos las <b>${cands.length} mejores opciones del pool</b> según cada vacante. Ajustá si querés.</div>
          </div>

          <div class="ram-chips-wrap">
            <div class="ram-chips-cap">Búsqueda inteligente</div>
            <div class="ram-chips">
              <span class="ram-chip ${chips.has('pos')?'active':''}" onclick="window.__requiMultiToggleChip('pos')">${escR(p.pos)}</span>
              <span class="ram-chip add ${chips.has('related')?'active':''}" onclick="window.__requiMultiToggleChip('related')">+ Roles relacionados</span>
              <span class="ram-chip ${chips.has('zone')?'active':''}" onclick="window.__requiMultiToggleChip('zone')">Zona ${escR(r.zone)}</span>
              <span class="ram-chip ${chips.has('eng')?'active':''}" onclick="window.__requiMultiToggleChip('eng')">Varios niveles de inglés</span>
              <span class="ram-chip ${chips.has('exp')?'active':''}" onclick="window.__requiMultiToggleChip('exp')">Varios años de experiencia</span>
              <span class="ram-chip ${chips.has('dispo')?'active':''}" onclick="window.__requiMultiToggleChip('dispo')">Disponibles</span>
              <span class="ram-chip ${chips.has('volunt')?'active':''}" onclick="window.__requiMultiToggleChip('volunt')">Disponible voluntario</span>
            </div>
          </div>

          <div class="ram-meta">
            <div class="left">
              <b>${list.length}</b> coinciden con los filtros
              <span class="pool-link" onclick="window.__requiCloseAssign(); navigate(document.querySelector('.sb-item[data-page=Reclutamiento]'),'Reclutamiento'); window.toast&&window.toast('Abriendo Pool completo','groups')">· Ver Pool completo <span class="mi">arrow_forward</span></span>
            </div>
            <div class="ram-legend">
              <span><span class="dot full"></span>match perfecto</span>
              <span><span class="dot partial"></span>parcial</span>
            </div>
          </div>

          <div class="ram-cards">
            ${list.map(cardHTML).join('')}
          </div>

          ${(() => {
            // 3 estados del card "no más candidatos":
            //  (a) Hay matches pero NO alcanzan para cubrir todas las vacantes faltantes
            //      → copy específico: "las vacantes que resten deben validarse en el Pool".
            //  (b) Hay matches suficientes (cobertura completa o vacante única)
            //      → copy estándar: "estos son los mejores candidatos".
            //  (c) No hay ningún match con los filtros actuales
            //      → copy de empty state: "no hay candidatos · Pool o cerrar parcial".
            //
            // Importante: el shortfall se calcula contra las vacantes FALTANTES de la
            // posición (total), no contra el cupo de selección actual. Así el copy de
            // "vacantes restantes" aparece igual cuando se entra por "Asignar" (vacante
            // única) y por "Asignar múltiples" — es la misma vacante / mismo resultado /
            // misma lógica de cobertura, sólo cambia cuántas se asignan en ese paso.
            const shortfall = list.length > 0 && list.length < total;
            if(shortfall){
              const falt = total - list.length;
              return `<div class="ram-no-more">
                <div class="ic"><span class="mi">person_search</span></div>
                <div class="body">
                  <strong>No encontramos más coincidencias automáticas que coincidan con los filtros</strong>
                  <span>Las <b>${falt} ${falt===1?'vacante restante':'vacantes restantes'}</b> deben validarse en el <b>Pool completo</b> para ver si existe alguna opción viable para el hotel. Si no se encuentra disponibilidad operativa, cerrá parcialmente la requisición.</span>
                </div>
                <button class="ram-no-more-btn" onclick="window.__requiCloseAssign(); navigate(document.querySelector('.sb-item[data-page=Reclutamiento]'),'Reclutamiento'); window.toast&&window.toast('Abriendo Pool completo','groups')"><span class="mi">open_in_new</span>Abrir Pool</button>
              </div>`;
            }
            if(list.length){
              return `<div class="ram-no-more">
                <div class="ic"><span class="mi">person_search</span></div>
                <div class="body">
                  <strong>Estos son los candidatos que mejor coinciden con los filtros</strong>
                  <span>Podés explorar el <b>Pool completo</b> si querés revisar más candidatos según filtros y criterio del reclutador</span>
                </div>
                <button class="ram-no-more-btn" onclick="window.__requiCloseAssign(); navigate(document.querySelector('.sb-item[data-page=Reclutamiento]'),'Reclutamiento'); window.toast&&window.toast('Abriendo Pool completo','groups')"><span class="mi">open_in_new</span>Abrir Pool</button>
              </div>`;
            }
            return `<div class="ram-no-more">
              <div class="ic"><span class="mi">person_off</span></div>
              <div class="body">
                <strong>No hay candidatos que coincidan con los filtros</strong>
                <span>Puedes buscar manualmente en el <b>Pool completo</b> — o Cerrar parcialmente la requisición</span>
              </div>
              <button class="ram-no-more-btn" onclick="window.__requiCloseAssign(); navigate(document.querySelector('.sb-item[data-page=Reclutamiento]'),'Reclutamiento'); window.toast&&window.toast('Abriendo Pool completo','groups')"><span class="mi">open_in_new</span>Abrir Pool</button>
            </div>`;
          })()}

          <div style="display:none"></div>

        </div>
        <div class="req-modal-foot">
          <span class="req-modal-foot-info">${state.assignFromSingle
            ? (selN===0 ? 'Selecciona un colaborador' : '<b>1</b> colaborador seleccionado')
            : `<b>${selN}</b> de <b>${total}</b> ${total===1?'vacante seleccionada':'vacantes seleccionadas'}`}</span>
          <button class="btn ghost" onclick="window.__requiCloseAssign()">Cancelar</button>
          <button class="btn primary" onclick="window.__requiMultiConfirm()" ${selN===0?'style="opacity:.5;pointer-events:none"':''}><span class="mi">group_add</span>${state.assignFromSingle?'Asignar colaborador':'Asignar colaboradores'}</button>
        </div>
      `;
    }

    function showToast(msg, opts){
      const t = document.getElementById('toast');
      const m = document.getElementById('toastMsg');
      const a = document.getElementById('toastAction');
      if(!t||!m) return;
      m.textContent = msg;
      if(a){
        if(opts && opts.actionLabel){
          a.style.display = 'inline-flex';
          a.innerHTML = (opts.actionIcon?`<span class="mi">${opts.actionIcon}</span>`:'') + opts.actionLabel;
          a.onclick = () => { t.classList.remove('show'); if(opts.onAction) opts.onAction(); };
        } else {
          a.style.display = 'none';
          a.onclick = null;
        }
      }
      t.classList.add('show');
      clearTimeout(window.__requiToastT);
      window.__requiToastT = setTimeout(()=>t.classList.remove('show'), (opts && opts.duration) || 3000);
    }

    // INIT: insertar drawer + modal
    if(!document.getElementById('requi-drawer')){
      const wrap = document.createElement('div');
      wrap.innerHTML = `
        <div class="req-drawer" id="requi-drawer"></div>
        <div class="req-modal-bg" id="requi-modal-bg" onclick="if(event.target===this)window.__requiCloseAssign()">
          <div class="req-modal" id="requi-modal"></div>
        </div>
        <div class="req-gest-modal-bg" id="requi-gest-modal-bg" onclick="if(event.target===this)window.__requiCloseGestion()">
          <div class="req-gest-modal" id="requi-gest-modal"></div>
        </div>
        <div class="req-cub-overlay" id="requi-cub-overlay" onclick="if(event.target===this)window.__requiCubCancel()">
          <div class="req-cub-card" id="requi-cub-card"></div>
        </div>
        <div class="req-sem-info-overlay" id="requi-auto-asg-info" onclick="if(event.target===this)window.__requiAutoAsgInfoClose()">
          <div class="req-sem-info-card">
            <div class="req-sem-info-head">
              <div class="ic" style="background:rgba(123,44,191,.16);color:#7B2CBF"><span class="mi">bolt</span></div>
              <h4 style="font-weight: 600">Auto-asignada por el sistema</h4>
              <button class="x" onclick="window.__requiAutoAsgInfoClose()" aria-label="Cerrar"><span class="mi">close</span></button>
            </div>
            <p class="req-sem-info-sub">Cuando una requisición lleva <strong>más de 24 horas</strong> en la bandeja sin que ningún reclutador la tome, el sistema la asigna automáticamente a la reclutadora con <strong>menor carga</strong>.</p>
            <div class="req-auto-asg-kpi">
              <div class="row">
                <span class="lbl">Meta KPI · Tasa de auto-asignación</span>
                <span class="val good">≤ 5%</span>
              </div>
              <div class="row">
                <span class="lbl">Tasa actual</span>
                <span class="val bad">33%</span>
              </div>
              <div class="bar">
                <div class="bar-fill" style="width:33%"></div>
                <div class="bar-target" style="left:5%" title="Meta · 5%"></div>
              </div>
              <div class="hint">1 de 3 requisiciones auto-asignadas — supera la meta. Toma requisiciones de la bandeja antes de las 24h para mantener la tasa baja.</div>
            </div>
          </div>
        </div>
        <div class="req-sem-info-overlay" id="requi-sem-info" onclick="if(event.target===this)window.__requiSemInfoClose()">
          <div class="req-sem-info-card">
            <div class="req-sem-info-head">
              <div class="ic"><span class="mi">insights</span></div>
              <h4 style="font-weight: 600">Cobertura de vacantes</h4>
              <button class="x" onclick="window.__requiSemInfoClose()" aria-label="Cerrar"><span class="mi">close</span></button>
            </div>
            <p class="req-sem-info-sub">Cada puesto vacante se colorea según su estado de cobertura.</p>
            <div class="req-sem-info-list">
              <div class="req-sem-info-row" data-sem="gris">
                <span class="dot"></span>
                <div class="txt"><strong>Gris · Sin asignar</strong><em>Puesto autorizado y aún no se le ha asignado ningún colaborador. Típico en requisiciones nuevas recién autorizadas.</em></div>
              </div>
              <div class="req-sem-info-row" data-sem="rojo">
                <span class="dot"></span>
                <div class="txt"><strong>Rojo · Faltan puestos  autorizados por cubrir</strong><em>También está autorizada, pero todavía hay puestos pendientes para asignar colaboradores.</em></div>
              </div>
              <div class="req-sem-info-row" data-sem="verde">
                <span class="dot"></span>
                <div class="txt"><strong>Verde · Puestos autorizados cubierto</strong><em>Puesto ya asignado — listo para arrancar.</em></div>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(wrap);
    }

    document.addEventListener('click', e => {
      if(state.openDD && !e.target.closest('.recl-filter-grp')){
        state.openDD = null;
        if(document.querySelector('#requi-content')) window.__renderRequi();
      }
      // Cerrar menú "Ordenar por" del modal multi al click fuera
      if(state.multiSortOpen && !e.target.closest('.ram-sort')){
        state.multiSortOpen = false;
        if(state.assignVacIdx === 'multi') renderAssignModal();
      }
    });

    setTimeout(()=>{ if(document.querySelector('[data-page-view="Requisiciones"]')) window.__renderRequi(); }, 50);
  })();


// =====================================================================
// MÓDULO MI GRUPO (exclusivo Líder · RF-22 / RF-23 / RF-05)
// Lista interactiva de reclutadoras + ficha de detalle dinámica + filtros
// =====================================================================
(function(){
  const GRUPO = [
    {id:'al',ini:'AL',nm:'Ana López',em:'ana.lopez@oranje.com',zona:'Centro',activas:3,cob:85,escal:0,estado:'Activa',tprom:'2.1 d',cub:17,parc:2,vs:'+6%',
     aprob:{req:'#0312',pos:'Housekeeper'},
     hist:[['#0312','Hotel Marbella · Centro','Housekeeper','02 Jun','Pendiente aprob.','a'],['#0298','Hotel Aurora · Centro','Hoseman','28 May','Cubierta','g'],['#0285','Hotel Sol · Centro','Chef','21 May','Parcial','n']]},
    {id:'bc',ini:'BC',nm:'Beatriz Cruz',em:'beatriz.cruz@oranje.com',zona:'Sur',activas:2,cob:92,escal:1,estado:'Activa',tprom:'1.8 d',cub:21,parc:1,vs:'+9%',
     aprob:null,
     hist:[['#0405','Hotel Palma · Sur','Housekeeper','01 Jun','Cubierta','g'],['#0388','Hotel Coral · Sur','Laundry','27 May','Cubierta','g'],['#0377','Hotel Brisa · Sur','Hoseman','20 May','Escalado','r']]},
    {id:'cm',ini:'CM',nm:'Carlos Mena',em:'carlos.mena@oranje.com',zona:'Centro',activas:1,cob:70,escal:1,estado:'Activa',tprom:'3.4 d',cub:9,parc:4,vs:'-3%',
     aprob:null,
     hist:[['#0410','Hotel Sol · Centro','Chef','30 May','Parcial','n'],['#0392','Hotel Marbella · Centro','Hoseman','24 May','Escalado','r'],['#0361','Hotel Aurora · Centro','Housekeeper','18 May','Cubierta','g']]},
    {id:'dr',ini:'DR',nm:'Diana Ríos',em:'diana.rios@oranje.com',zona:'Este',activas:4,cob:88,escal:0,estado:'Activa',tprom:'2.0 d',cub:24,parc:3,vs:'+4%',
     aprob:{req:'#0420',pos:'Hoseman'},
     hist:[['#0420','Hotel Mirador · Este','Hoseman','02 Jun','Pendiente aprob.','a'],['#0401','Hotel Lago · Este','Housekeeper','29 May','Cubierta','g'],['#0383','Hotel Bahía · Este','Chef','22 May','Cubierta','g']]},
    {id:'ev',ini:'EV',nm:'Esteban Vargas',em:'esteban.vargas@oranje.com',zona:'Oeste',activas:2,cob:79,escal:0,estado:'Vacaciones',tprom:'2.6 d',cub:12,parc:3,vs:'-1%',
     aprob:null,
     hist:[['#0399','Hotel Puesta · Oeste','Laundry','26 May','Cubierta','g'],['#0372','Hotel Roca · Oeste','Housekeeper','19 May','Parcial','n'],['#0350','Hotel Dunas · Oeste','Hoseman','12 May','Cubierta','g']]},
    {id:'fs',ini:'FS',nm:'Fátima Soto',em:'fatima.soto@oranje.com',zona:'Sur',activas:3,cob:95,escal:0,estado:'Activa',tprom:'1.6 d',cub:28,parc:0,vs:'+11%',
     aprob:null,
     hist:[['#0418','Hotel Palma · Sur','Housekeeper','01 Jun','Cubierta','g'],['#0395','Hotel Coral · Sur','Chef','28 May','Cubierta','g'],['#0369','Hotel Brisa · Sur','Laundry','21 May','Cubierta','g']]}
  ];
  const carga = a => a >= 4 ? 'Alta' : (a >= 2 ? 'Media' : 'Baja');
  const covColor = c => c >= 85 ? 'var(--green)' : (c >= 70 ? '#E6B422' : 'var(--red)');
  const escChip = n => n > 0 ? `<span class="lg-chip r">${n}</span>` : `<span class="lg-chip n">0</span>`;
  const estChip = s => s === 'Activa' ? `<span class="lg-chip g">Activa</span>` : `<span class="lg-chip a">Vacaciones</span>`;
  let sel = 'al';

  function filtered(){
    const v = id => { const el = document.getElementById(id); return el ? el.value : ''; };
    const q = v('mgSearch').toLowerCase(), z = v('mgZona'), e = v('mgEstado'), c = v('mgCarga');
    return GRUPO.filter(r =>
      (!q || r.nm.toLowerCase().indexOf(q) >= 0) &&
      (!z || r.zona === z) && (!e || r.estado === e) && (!c || carga(r.activas) === c)
    );
  }

  window.__grupoList = function(){
    const tb = document.getElementById('mgTbody'); if(!tb) return;
    const list = filtered();
    tb.innerHTML = list.length ? list.map(r => `
      <tr class="${r.id === sel ? 'mg-sel' : ''}" onclick="window.__grupoSelect('${r.id}')">
        <td><div class="lg-rec"><div class="lg-av">${r.ini}</div><div><div class="nm">${r.nm}</div><div class="em">${r.em}</div></div></div></td>
        <td>${r.zona}</td><td><strong>${r.activas}</strong></td>
        <td><div class="lg-cov"><div class="lg-bar"><i style="width:${r.cob}%;background:${covColor(r.cob)}"></i></div><span style="font-weight:600">${r.cob}%</span></div></td>
        <td>${escChip(r.escal)}</td><td>${estChip(r.estado)}</td>
        <td style="text-align:right"><button class="lg-btn" style="padding:6px 11px" onclick="event.stopPropagation();window.__grupoSelect('${r.id}')"><span class="mi" style="font-size:16px">visibility</span>Ver</button></td>
      </tr>`).join('') : `<tr><td colspan="7" style="text-align:center;color:var(--ink-3);padding:24px">Ninguna reclutadora coincide con los filtros.</td></tr>`;
  };

  window.__grupoSelect = function(id){
    const r = GRUPO.find(x => x.id === id); if(!r) return;
    sel = id;
    const d = document.getElementById('mgDetail'); if(!d) return;
    const aprob = r.aprob
      ? `<div class="lg-note" style="margin-bottom:18px"><span class="mi">verified</span><div><strong>1 cierre pendiente de tu aprobación</strong> — Req ${r.aprob.req} · ${r.aprob.pos}, marcada como cubierta por ${r.nm}. <span class="lg-link" onclick="window.__grupoAprobar('${r.aprob.req}','${r.aprob.pos}','${r.nm}')">Revisar y aprobar (RF-05) →</span></div></div>`
      : `<div class="lg-note" style="margin-bottom:18px;background:var(--surface-2);border-color:var(--line)"><span class="mi" style="color:var(--ink-3)">check_circle</span><div>Sin cierres pendientes de aprobación.</div></div>`;
    const dispLabel = r.estado === 'Activa' ? 'Marcar vacaciones' : 'Marcar disponible';
    const dispIcon = r.estado === 'Activa' ? 'beach_access' : 'event_available';
    d.innerHTML = `
      <div class="lg-card-h">
        <div class="lg-av" style="width:30px;height:30px">${r.ini}</div><h3>Detalle — ${r.nm}</h3>
        ${estChip(r.estado)}
        <span style="margin-left:auto;font-size:12px;color:var(--ink-3)">Zona ${r.zona} · ${r.activas} req. activas · ${r.em}</span>
      </div>
      <div style="padding:18px">
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:18px">
          <div class="lg-mini"><div class="n" style="color:${covColor(r.cob)}">${r.cob}%</div><div class="l">Cobertura del mes</div></div>
          <div class="lg-mini"><div class="n">${r.tprom}</div><div class="l">Tiempo prom. de asignación</div></div>
          <div class="lg-mini"><div class="n">${r.cub} <span style="font-size:13px;color:var(--ink-3)">/ ${r.parc}</span></div><div class="l">Cubiertas · parciales</div></div>
          <div class="lg-mini"><div class="n" style="color:${r.vs.charAt(0) === '-' ? 'var(--red)' : 'var(--green)'}">${r.vs}</div><div class="l">vs. mes anterior</div></div>
        </div>
        ${aprob}
        <div style="font-size:11.5px;font-weight:700;color:var(--ink-3);text-transform:uppercase;letter-spacing:.04em;margin-bottom:10px">Historial reciente de requisiciones</div>
        <table class="lg-tbl" style="border:1px solid var(--line);border-radius:var(--r-md);overflow:hidden;margin-bottom:18px">
          <thead><tr><th>Req.</th><th>Hotel · Zona</th><th>Posición</th><th>Cerrada</th><th>Resultado</th></tr></thead>
          <tbody>${r.hist.map(h => `<tr><td>${h[0]}</td><td>${h[1]}</td><td>${h[2]}</td><td>${h[3]}</td><td><span class="lg-chip ${h[5]}">${h[4]}</span></td></tr>`).join('')}</tbody>
        </table>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="lg-btn-pri" onclick="window.__grupoCarga('${r.id}')"><span class="mi">assignment</span>Ver carga detallada</button>
          <button class="lg-btn" onclick="window.__grupoReasignar('${r.id}')"><span class="mi">swap_horiz</span>Reasignar requisición</button>
          <button class="lg-btn" onclick="window.__grupoDisp('${r.id}')"><span class="mi">${dispIcon}</span>${dispLabel}</button>
          <button class="lg-btn" onclick="window.__reporteIndividual('${r.id}')"><span class="mi">insert_chart</span>Generar reporte individual</button>
        </div>
      </div>`;
    window.__grupoList();
  };

  window.__grupoDisp = function(id){
    const r = GRUPO.find(x => x.id === id); if(!r) return;
    r.estado = r.estado === 'Activa' ? 'Vacaciones' : 'Activa';
    if(typeof toast === 'function') toast(`${r.nm} → ${r.estado}`, r.estado === 'Vacaciones' ? 'beach_access' : 'event_available');
    window.__grupoSelect(id);
  };

  window.__grupoFilter = function(){ window.__grupoList(); };
  window.__grupoGet = function(id){ return GRUPO.find(x => x.id === id); };

  function init(){ if(document.getElementById('mgTbody')) window.__grupoSelect(sel); }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();


// =====================================================================
// MI GRUPO — Acciones del detalle: Ver carga detallada · Reasignar · Reporte individual
// + modal genérico ligero (lg-modal). Ver flujos en docs de arquitectura.
// =====================================================================
(function(){
  // Requisiciones activas (en proceso) por reclutadora = "carga actual"
  // [id, hotel·zona, posición, urgencia(red/yellow/green), %cobertura]
  const REQS = {
    al:[['#0451','Hotel Marbella · Centro','Housekeeper','red',55],['#0448','Hotel Aurora · Centro','Hoseman','yellow',80],['#0440','Hotel Sol · Centro','Chef','green',90]],
    bc:[['#0455','Hotel Palma · Sur','Housekeeper','yellow',75],['#0449','Hotel Coral · Sur','Laundry','green',100]],
    cm:[['#0458','Hotel Sol · Centro','Chef','red',40]],
    dr:[['#0461','Hotel Mirador · Este','Hoseman','red',50],['#0457','Hotel Lago · Este','Housekeeper','yellow',70],['#0452','Hotel Bahía · Este','Chef','green',95],['#0447','Hotel Cima · Este','Laundry','green',100]],
    ev:[['#0460','Hotel Puesta · Oeste','Laundry','yellow',65],['#0453','Hotel Roca · Oeste','Housekeeper','green',90]],
    fs:[['#0462','Hotel Palma · Sur','Housekeeper','yellow',80],['#0456','Hotel Coral · Sur','Chef','green',100],['#0450','Hotel Brisa · Sur','Laundry','green',95]]
  };
  const NAMES = {al:'Ana López',bc:'Beatriz Cruz',cm:'Carlos Mena',dr:'Diana Ríos',ev:'Esteban Vargas',fs:'Fátima Soto'};
  const urgTxt = {red:'Urgente',yellow:'Media',green:'A tiempo'};
  const urgIco = {red:'priority_high',yellow:'schedule',green:'check_circle'};
  const covColor = c => c >= 85 ? 'var(--green)' : (c >= 70 ? '#E6B422' : 'var(--red)');

  // ---------- Modal genérico ----------
  function modalEl(){
    let bg = document.getElementById('lgModalBg');
    if(!bg){
      bg = document.createElement('div');
      bg.id = 'lgModalBg';
      bg.className = 'lg-modal-bg';
      bg.addEventListener('click', e => { if(e.target === bg) close(); });
      document.body.appendChild(bg);
    }
    return bg;
  }
  function open(title, icon, bodyHtml){
    const bg = modalEl();
    bg.innerHTML = '<div class="lg-modal"><div class="lg-modal-h"><span class="mi">' + icon + '</span><h3>' + title + '</h3><div class="lg-modal-x" onclick="window.__lgModalClose()"><span class="mi">close</span></div></div><div class="lg-modal-b">' + bodyHtml + '</div></div>';
    bg.classList.add('open');
  }
  function close(){ const bg = document.getElementById('lgModalBg'); if(bg) bg.classList.remove('open'); }
  window.__lgModalClose = close;
  document.addEventListener('keydown', e => { if(e.key === 'Escape') close(); });

  // ---------- Ver carga detallada (requisiciones en proceso) ----------
  window.__grupoCarga = function(id){
    const r = window.__grupoGet(id); if(!r) return;
    const reqs = REQS[id] || [];
    const rows = reqs.map(q => `
      <tr>
        <td><strong>${q[0]}</strong></td><td>${q[1]}</td><td>${q[2]}</td>
        <td><span class="lg-urg ${q[3]}"><span class="mi" style="font-size:13px">${urgIco[q[3]]}</span>${urgTxt[q[3]]}</span></td>
        <td><div class="lg-cov"><div class="lg-bar"><i style="width:${q[4]}%;background:${covColor(q[4])}"></i></div><span style="font-weight:600">${q[4]}%</span></div></td>
      </tr>`).join('');
    open('Carga de ' + r.nm, 'assignment',
      `<div style="font-size:12.5px;color:var(--ink-2);margin-bottom:14px"><strong>${reqs.length} requisiciones en proceso</strong> · Zona ${r.zona}</div>
       <table class="lg-tbl" style="border:1px solid var(--line);border-radius:var(--r-md);overflow:hidden">
         <thead><tr><th>Req.</th><th>Hotel · Zona</th><th>Posición</th><th>Urgencia</th><th>Cobertura</th></tr></thead>
         <tbody>${rows || '<tr><td colspan="5" style="text-align:center;color:var(--ink-3);padding:18px">Sin requisiciones activas.</td></tr>'}</tbody>
       </table>`);
  };

  // ---------- Reasignar requisición a otra reclutadora ----------
  window.__grupoReasignar = function(id){
    const r = window.__grupoGet(id); if(!r) return;
    const reqs = REQS[id] || [];
    const reqOpts = reqs.map(q => `<option value="${q[0]}">${q[0]} · ${q[2]} · ${q[1]}</option>`).join('');
    const destOpts = Object.keys(NAMES).filter(k => k !== id).map(k => `<option value="${k}">${NAMES[k]} · Zona ${ (window.__grupoGet(k)||{}).zona || '' }</option>`).join('');
    open('Reasignar requisición de ' + r.nm, 'swap_horiz',
      `<div class="lg-field"><label>Requisición a reasignar</label><select class="lg-select" id="raReq">${reqOpts || '<option value="">Sin requisiciones activas</option>'}</select></div>
       <div class="lg-field"><label>Reasignar a</label><select class="lg-select" id="raDest">${destOpts}</select></div>
       <div class="lg-field"><label>Motivo</label><select class="lg-select" id="raMot"><option>Balanceo de carga</option><option>Reclutadora ausente</option><option>Especialización por zona</option><option>Otro</option></select></div>
       <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:6px">
         <button class="lg-btn" onclick="window.__lgModalClose()">Cancelar</button>
         <button class="lg-btn-pri" onclick="window.__grupoReasignarOk('${id}')"><span class="mi">swap_horiz</span>Reasignar</button>
       </div>`);
  };
  window.__grupoReasignarOk = function(id){
    const req = (document.getElementById('raReq') || {}).value || '';
    const destK = (document.getElementById('raDest') || {}).value || '';
    close();
    if(typeof toast === 'function') toast(req + ' reasignada de ' + NAMES[id] + ' a ' + (NAMES[destK] || ''), 'swap_horiz');
  };

  // ---------- Generar reporte individual → Reportes con datos de la persona ----------
  window.__reporteIndividual = function(id){
    const r = window.__grupoGet(id); if(!r) return;
    const sb = document.querySelector('.sb-item[data-page="Reportes"]');
    if(typeof navigate === 'function') navigate(sb, 'Reportes');
    const segs = document.getElementById('rpTipoSegs');
    if(segs) segs.querySelectorAll('.lg-seg').forEach(s => s.classList.toggle('on', s.textContent.trim() === 'Desempeño individual'));
    const sel = document.getElementById('rpRecl');
    if(sel) sel.value = r.nm;
    const tag = document.getElementById('rpTag');
    if(tag) tag.textContent = 'Desempeño individual · ' + r.nm;
    const data = document.getElementById('rpData');
    if(data){
      const w = [Math.max(40, r.cob - 14), Math.max(46, r.cob - 8), Math.max(52, r.cob - 4), r.cob];
      data.innerHTML = `
        <div style="display:flex;gap:24px;flex-wrap:wrap;margin-bottom:4px">
          <div class="lg-stat"><span class="n" style="color:${covColor(r.cob)}">${r.cob}%</span><span class="l">Cobertura</span></div>
          <div class="lg-stat"><span class="n">${r.cub + r.parc}</span><span class="l">Requisiciones</span></div>
          <div class="lg-stat"><span class="n">${r.tprom}</span><span class="l">Tiempo prom.</span></div>
          <div class="lg-stat"><span class="n" style="color:${r.escal > 0 ? 'var(--red)' : 'var(--ink)'}">${r.escal}</span><span class="l">Escalados</span></div>
        </div>
        <div class="lg-chart">
          <div class="b" style="height:${w[0]}%"><span>${w[0]}%</span><small>Sem 1</small></div>
          <div class="b" style="height:${w[1]}%"><span>${w[1]}%</span><small>Sem 2</small></div>
          <div class="b" style="height:${w[2]}%"><span>${w[2]}%</span><small>Sem 3</small></div>
          <div class="b" style="height:${w[3]}%"><span>${w[3]}%</span><small>Sem 4</small></div>
        </div>`;
    }
    if(typeof toast === 'function') toast('Reporte individual de ' + r.nm, 'insert_chart');
  };

  // ---------- RF-05 — Aprobar / rechazar cierre de cobertura del grupo ----------
  window.__grupoAprobar = function(req, pos, recNm){
    open('Aprobar cierre de cobertura', 'verified',
      `<div style="font-size:12.5px;color:var(--ink-2);margin-bottom:14px"><strong>${recNm}</strong> marcó la requisición <strong>${req}</strong> como cubierta. Revisa la cobertura antes de aprobar el cierre.</div>
       <div class="lg-mini" style="margin-bottom:14px"><div style="display:flex;justify-content:space-between;align-items:center">
         <div><div style="font-weight:600;color:var(--ink)">${req} · ${pos}</div><div class="l" style="margin-top:2px">Hotel Marbella · Centro · Schedule verificado</div></div>
         <span class="lg-chip g">100% cubierta</span>
       </div></div>
       <div style="font-size:11.5px;font-weight:700;color:var(--ink-3);text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px">Posiciones</div>
       <table class="lg-tbl" style="border:1px solid var(--line);border-radius:var(--r-md);overflow:hidden;margin-bottom:14px">
         <thead><tr><th>Posición</th><th>Cobertura</th><th>Estado</th></tr></thead>
         <tbody><tr><td>${pos}</td><td><span class="lg-chip g">6/6</span></td><td>Asignados y validados</td></tr></tbody>
       </table>
       <div class="lg-field"><label>Comentario (opcional)</label><textarea id="apComent" class="lg-select" rows="2" style="resize:vertical" placeholder="Comentario para la reclutadora…"></textarea></div>
       <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:4px">
         <button class="lg-btn" onclick="window.__grupoRechazar('${req}','${recNm}')"><span class="mi">close</span>Rechazar</button>
         <button class="lg-btn-pri" onclick="window.__grupoAprobarOk('${req}','${recNm}')"><span class="mi">check</span>Aprobar cierre</button>
       </div>`);
  };
  window.__grupoAprobarOk = function(req, recNm){
    close();
    if(typeof toast==='function') toast(`Cierre de ${req} aprobado · semáforo Azul claro · ${recNm} notificada`, 'verified');
  };
  window.__grupoRechazar = function(req, recNm){
    open('Rechazar cierre · ' + req, 'undo',
      `<div class="lg-field"><label>Motivo del rechazo (obligatorio)</label><textarea id="rzMot" class="lg-select" rows="3" style="resize:vertical" placeholder="Explica por qué la cobertura no es válida (faltan posiciones, mismatch de modalidad, etc.)…"></textarea></div>
       <div style="display:flex;gap:10px;justify-content:flex-end">
         <button class="lg-btn" onclick="window.__lgModalClose()">Cancelar</button>
         <button class="lg-btn-pri" onclick="window.__grupoRechazarOk('${req}','${recNm}')"><span class="mi">undo</span>Rechazar y devolver</button>
       </div>`);
  };
  window.__grupoRechazarOk = function(req, recNm){
    const el = document.getElementById('rzMot');
    if(!el || !el.value.trim()){ if(el){ el.style.borderColor='var(--red)'; el.focus(); } return; }
    close();
    if(typeof toast==='function') toast(`Cierre de ${req} rechazado · vuelve a En proceso (Amarillo) · ${recNm} notificada`, 'undo');
  };

  // ---------- Reportes: segmentos interactivos + programar + reutilizar ----------
  window.__lgModalOpen = open;
  window.__lgSeg = function(el){ const p = el.parentElement; if(p) Array.prototype.forEach.call(p.children, c=>c.classList.remove('on')); el.classList.add('on'); };
  window.__rpRango = function(el, custom){ window.__lgSeg(el); const c = document.getElementById('rpCustom'); if(c) c.style.display = custom ? 'block' : 'none'; };
  window.__rpProgramar = function(){
    open('Programar envío recurrente', 'schedule_send',
      `<div class="lg-field"><label>Frecuencia</label><select class="lg-select"><option>Semanal (cada lunes)</option><option>Quincenal</option><option>Mensual (día 1)</option></select></div>
       <div class="lg-field"><label>Tipo de reporte</label><select class="lg-select"><option>Cobertura del grupo</option><option>Desempeño individual</option><option>Casos escalados</option></select></div>
       <div class="lg-field"><label>Destinatario</label><select class="lg-select" disabled style="opacity:.65"><option>Manager de Reclutamiento (automático)</option></select></div>
       <div style="display:flex;gap:10px;justify-content:flex-end"><button class="lg-btn" onclick="window.__lgModalClose()">Cancelar</button><button class="lg-btn-pri" onclick="window.__lgModalClose();toast('Envío recurrente programado','schedule_send')"><span class="mi">check</span>Programar</button></div>`);
  };
  window.__rpReutilizar = function(btn){
    const tr = (btn && btn.closest) ? btn.closest('tr') : null;
    const tipo = (tr && tr.children[1]) ? tr.children[1].textContent.trim() : null;
    if(tipo){
      // 1) Activar el tipo en el generador (segmento que coincida con el del histórico)
      let matched = null;
      document.querySelectorAll('#rpTipoSegs .lg-seg').forEach(s=>{ if(s.textContent.trim() === tipo) matched = s; });
      if(matched && window.__lgSeg) window.__lgSeg(matched);
      // 2) Reflejarlo en el chip de la vista previa
      const tag = document.getElementById('rpTag');
      const rEl = document.querySelector('#rpRangoSegs .lg-seg.on');
      const rango = rEl ? rEl.textContent.trim() : '';
      if(tag) tag.textContent = rango ? (tipo + ' · ' + rango) : tipo;
      // 3) Llevar el foco al generador + destello para indicar que se cargó
      const gen = document.getElementById('rpTipoSegs');
      const card = gen ? gen.closest('.lg-card') : null;
      if(gen) gen.scrollIntoView({behavior:'smooth', block:'center'});
      if(card){ card.style.transition='box-shadow .3s ease'; card.style.boxShadow='0 0 0 2px var(--o-600, #FF8E00)'; setTimeout(function(){ card.style.boxShadow=''; }, 1200); }
    }
    if(typeof toast==='function') toast('Reporte recargado en el generador · ajusta filtros y vuelve a generar', 'content_copy');
  };

  // ===== Vista previa tipo PDF de reportes (RF-24) =====
  window.__rpPreviewClose = function(){ const o = document.getElementById('rpPdfOverlay'); if(o) o.remove(); };
  window.__rpDownload = function(name){
    if(typeof toast==='function') toast('Descargando '+name+'.pdf…', 'file_download');
    setTimeout(function(){ if(typeof toast==='function') toast('✓ '+name+'.pdf descargado', 'check_circle'); }, 1100);
  };
  window.__rpPreview = function(){
    const tipo  = (document.querySelector('#rpTipoSegs .lg-seg.on') || {}).textContent || 'Cobertura del grupo';
    const rEl   = document.querySelector('#rpRangoSegs .lg-seg.on');
    const rango = rEl ? rEl.textContent.trim() : 'Este mes';
    const recl  = (document.getElementById('rpRecl') || {}).value || 'Todo el grupo';
    const slug  = ('Reporte-' + tipo + '-' + rango).normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^A-Za-z0-9]+/g,'-').replace(/^-|-$/g,'');
    window.__rpPreviewClose();
    const rows = [
      ['Ana López','85%','g','17','2.1 d','0',''],
      ['Beatriz Cruz','92%','g','21','1.8 d','1','r'],
      ['Carlos Mena','70%','a','9','3.4 d','1','r'],
      ['Diana Ríos','88%','g','24','2.0 d','0',''],
      ['Esteban Vargas','79%','a','12','2.6 d','0',''],
      ['Fátima Soto','95%','g','28','1.6 d','0',''],
    ];
    const tbody = rows.map(r=>`<tr><td>${r[0]}</td><td><span class="rp-pdf-chip ${r[2]}">${r[1]}</span></td><td>${r[3]}</td><td>${r[4]}</td><td>${r[6]?`<span class="rp-pdf-chip r">${r[5]}</span>`:r[5]}</td></tr>`).join('');
    const ov = document.createElement('div');
    ov.id = 'rpPdfOverlay'; ov.className = 'rp-pdf-overlay';
    ov.onclick = function(e){ if(e.target === ov) window.__rpPreviewClose(); };
    ov.innerHTML = `
      <div class="rp-pdf-toolbar">
        <span class="rp-pdf-fname"><span class="mi">picture_as_pdf</span>${slug}.pdf</span>
        <div class="rp-pdf-tb-actions">
          <button class="lg-btn" onclick="window.print()"><span class="mi">print</span>Imprimir</button>
          <button class="lg-btn-pri" onclick="window.__rpDownload('${slug}')"><span class="mi">file_download</span>Descargar PDF</button>
          <button class="rp-pdf-x" title="Cerrar" onclick="window.__rpPreviewClose()"><span class="mi">close</span></button>
        </div>
      </div>
      <div class="rp-pdf-scroll">
        <div class="rp-pdf-page">
          <div class="rp-pdf-head">
            <div class="rp-pdf-brand"><span class="rp-pdf-logo">O</span><div><div class="rp-pdf-org">Oranje</div><div class="rp-pdf-org-sub">Reclutamiento · Reporte de grupo</div></div></div>
            <div class="rp-pdf-doc-meta"><div>Generado: 16 jun 2026</div><div>Folio: RPT-2026-0616</div></div>
          </div>
          <div class="rp-pdf-title">${tipo}</div>
          <div class="rp-pdf-sub">Periodo: ${rango} · Grupo Centro-Sur · ${recl}</div>
          <div class="rp-pdf-meta-row">
            <div><span class="k">Líder</span><span class="v">Juanita López</span></div>
            <div><span class="k">Reclutadoras</span><span class="v">6</span></div>
            <div><span class="k">Zonas</span><span class="v">Centro y Sur</span></div>
          </div>
          <div class="rp-pdf-kpis">
            <div class="rp-pdf-kpi"><span class="n" style="color:#1FA84A">87%</span><span class="l">Cobertura</span></div>
            <div class="rp-pdf-kpi"><span class="n">38</span><span class="l">Requisiciones</span></div>
            <div class="rp-pdf-kpi"><span class="n">2.4 d</span><span class="l">Tiempo prom.</span></div>
            <div class="rp-pdf-kpi"><span class="n" style="color:#E11919">2</span><span class="l">Escalados</span></div>
          </div>
          <div class="rp-pdf-sec">Evolución semanal de cobertura</div>
          <div class="rp-pdf-chart">
            <div class="b" style="height:62%"><span>72%</span><small>Sem 1</small></div>
            <div class="b" style="height:78%"><span>81%</span><small>Sem 2</small></div>
            <div class="b" style="height:70%"><span>76%</span><small>Sem 3</small></div>
            <div class="b on" style="height:92%"><span>87%</span><small>Sem 4</small></div>
          </div>
          <div class="rp-pdf-sec">Desglose por reclutadora</div>
          <table class="rp-pdf-tbl"><thead><tr><th>Reclutadora</th><th>Cobertura</th><th>Cubiertas</th><th>T. prom.</th><th>Escalados</th></tr></thead><tbody>${tbody}</tbody></table>
          <div class="rp-pdf-note"><strong>Resumen.</strong> El grupo alcanzó <strong>87% de cobertura</strong> en ${rango.toLowerCase()} (+4% vs. periodo anterior). Fátima Soto (95%) y Beatriz Cruz (92%) lideran; Carlos Mena requiere apoyo (70%, 2 casos escalados).</div>
          <div class="rp-pdf-foot"><span>Confidencial · Uso interno Oranje</span><span>Página 1 de 1</span></div>
        </div>
      </div>`;
    document.body.appendChild(ov);
  };
})();
