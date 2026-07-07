/* ============================================================
   SCHEDULE — vista semanal del hotel (SOLO LECTURA).
   Contexto previo a tomar/distribuir una requisición.
   Sin acciones de gestión (eso lo hace el Manager del Hotel).
   ============================================================ */
(function(){
  const DAYS = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
  const DAY_NUMS = ['12','13','14','15','16','17','18']; // semana del 12 al 18 de may
  const TODAY = 2; // miércoles resaltado

  // pool de nombres para iniciales (deterministico)
  const NM = ['María L.','José R.','Ana T.','Carlos M.','Lucía P.','Pedro S.','Sofía D.','Diego F.','Camila R.','Andrés V.','Valeria N.','Miguel C.','Paula H.','Jorge A.','Gabriela L.','Luis G.','Rosa M.','Daniel B.','Elena V.','Marco T.'];
  let nmi = 0;
  function pick(n){ const out=[]; for(let i=0;i<n;i++){ out.push(NM[nmi%NM.length]); nmi++; } return out; }
  function initials(full){ return full.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase(); }

  // construye 7 días a partir de un patrón de requeridos y de cubiertos
  function week(reqPat, covPat){
    nmi = (reqPat[0]*7 + covPat[0]); // semilla suave
    return reqPat.map((req,i)=>{
      const cov = Math.min(covPat[i], req);
      return { req, names: req>0 ? pick(cov) : [] };
    });
  }

  const POS_DEF = {
    house: {name:'Camarista (Housekeeping)', ic:'cleaning_services', color:'#3FB8E6', turno:'Matutino · 07–15h'},
    recep: {name:'Recepción', ic:'room_service', color:'#7B2CBF', turno:'Mixto · turnos rotativos'},
    cocina:{name:'Cocina', ic:'restaurant', color:'#FF7A00', turno:'Partido · 06–11 / 17–22h'},
    meser: {name:'Mesero (A&B)', ic:'local_bar', color:'#1FA84A', turno:'Vespertino · 14–22h'},
    mant:  {name:'Mantenimiento', ic:'engineering', color:'#5A4A3A', turno:'Matutino · 08–16h'},
    botn:  {name:'Botones / Valet', ic:'luggage', color:'#E6B422', turno:'Nocturno · 22–06h'},
  };

  const HOTELS = [
    {
      id:'costa', name:'Hotel Costa del Sol', zona:'Zona Centro',
      positions:[
        {def:'house', days:week([4,4,4,4,5,6,5],[4,4,2,4,3,4,5])},
        {def:'recep', days:week([2,2,2,2,3,3,2],[2,2,2,2,2,3,2])},
        {def:'cocina',days:week([3,3,3,3,4,4,3],[3,3,3,3,4,2,3])},
        {def:'meser', days:week([3,3,3,3,5,6,4],[3,2,3,3,3,4,4])},
        {def:'mant',  days:week([2,2,2,0,2,2,0],[2,2,2,0,2,2,0])},
        {def:'botn',  days:week([2,2,2,2,3,3,2],[1,2,2,2,2,2,2])},
      ]
    },
    {
      id:'punta', name:'Hotel Punta Vista', zona:'Zona Costera',
      positions:[
        {def:'house', days:week([5,5,5,5,6,7,6],[5,4,5,5,6,5,6])},
        {def:'recep', days:week([3,3,3,3,3,4,3],[3,3,3,3,3,4,3])},
        {def:'cocina',days:week([4,4,4,4,5,5,4],[4,3,4,2,5,5,4])},
        {def:'meser', days:week([4,4,4,4,6,7,5],[4,4,4,4,4,5,5])},
        {def:'mant',  days:week([2,2,2,2,2,2,0],[2,2,2,2,2,2,0])},
        {def:'botn',  days:week([3,3,3,3,4,4,3],[2,3,2,3,3,3,3])},
      ]
    },
    {
      id:'palmas', name:'Hotel Las Palmas', zona:'Zona Norte',
      positions:[
        {def:'house', days:week([3,3,3,3,4,4,3],[3,3,3,3,4,4,3])},
        {def:'recep', days:week([2,2,2,2,2,3,2],[2,1,2,2,2,2,2])},
        {def:'cocina',days:week([2,2,2,2,3,3,2],[2,2,2,2,3,3,2])},
        {def:'meser', days:week([2,2,2,2,4,5,3],[2,2,2,2,3,3,3])},
        {def:'mant',  days:week([1,1,1,1,1,1,0],[1,1,1,1,1,1,0])},
        {def:'botn',  days:week([1,1,1,1,2,2,1],[1,1,1,1,2,2,1])},
      ]
    },
  ];

  const state = { hotel:'costa', onlyPend:false, menuOpen:false };

  function hotel(){ return HOTELS.find(h=>h.id===state.hotel); }

  function totals(h){
    let req=0,cov=0,pendCells=0,pendCount=0;
    h.positions.forEach(p=>p.days.forEach(d=>{
      req+=d.req; cov+=d.names.length;
      if(d.req-d.names.length>0){ pendCells++; pendCount += d.req-d.names.length; }
    }));
    return { req, cov, pendCells, pendCount, pct: req? Math.round(cov/req*100):0 };
  }

  function cellHTML(d, dayIdx){
    const today = dayIdx===TODAY ? ' today':'';
    if(d.req===0){
      return `<div class="sched-cell rest${today}"><span class="rest-dash">—</span><span style="font-size:9px;color:var(--ink-4);font-weight:600">Descanso</span></div>`;
    }
    const cov = d.names.length;
    const gap = d.req - cov;
    const klass = gap<=0 ? 'full' : (cov===0 ? 'none' : 'part');
    const pend = gap>0 ? ' pend':'';
    const avs = d.names.slice(0,3).map(n=>`<span class="av" title="${n}">${initials(n)}</span>`).join('')
      + (cov>3?`<span class="av more">+${cov-3}</span>`:'');
    const gapTag = gap>0 ? `<span class="gap" title="Posición pendiente de cubrir"><span class="mi">priority_high</span>Falta ${gap}</span>` : '';
    return `<div class="sched-cell${pend}${today}">
      <span class="cov ${klass}">${cov}/${d.req}</span>
      ${cov>0?`<span class="avs">${avs}</span>`:''}
      ${gapTag}
    </div>`;
  }

  function render(){
    const root = document.getElementById('sched-root');
    if(!root) return;
    const h = hotel();
    const t = totals(h);
    const cols = `260px repeat(7, minmax(96px,1fr))`;

    const headCells = DAYS.map((d,i)=>`<div class="gh${i===TODAY?' today':''}">${d}<small>${DAY_NUMS[i]} may${i===TODAY?' · hoy':''}</small></div>`).join('');

    const rows = h.positions.map(p=>{
      const def = POS_DEF[p.def];
      const pend = p.days.reduce((a,d)=>a + Math.max(0,d.req-d.names.length),0);
      return `<div class="sched-row" style="display:contents">
        <div class="sched-pos">
          <div class="p-ic" style="background:${def.color}"><span class="mi">${def.ic}</span></div>
          <div class="p-txt">
            <div class="nm">${def.name}</div>
            <div class="mt"><span class="mi">schedule</span>${def.turno}</div>
          </div>
          ${pend>0?`<span class="p-pend">${pend} por cubrir</span>`:''}
        </div>
        ${p.days.map((d,i)=>cellHTML(d,i)).join('')}
      </div>`;
    }).join('');

    const menu = HOTELS.map(hh=>`
      <div class="sched-hotel-opt${hh.id===state.hotel?' active':''}" onclick="window.__schedPick('${hh.id}')">
        <div class="oi"><span class="mi">hotel</span></div>
        <div class="ot"><div class="nm">${hh.name}</div><div class="zn">${hh.zona}</div></div>
        <span class="ck mi">check</span>
      </div>`).join('');

    root.innerHTML = `
      <!-- HERO -->
      <div class="recl-hero">
        <div class="recl-hero-left" style="height:160px">
          <div class="eyebrow"><span class="pulse"></span>Contexto operativo · Solo lectura</div>
          <h1>Revisa el <span class="accent">schedule semanal</span> del hotel antes de tomar la requisición.</h1>
          <div class="lead">Vista de cobertura por posición y día. Identifica los huecos pendientes para decidir qué requisición tomar o cómo distribuirla. La gestión del schedule la realiza el Manager del Hotel.</div>
        </div>
        <div class="recl-hero-right" style="height:160px">
          <div class="recl-stat">
            <div class="rs-top"><div class="rs-ic" style="background:rgba(63,184,230,.14);color:#1583B0"><span class="mi">event_seat</span></div>
              <div class="rs-val">${t.req}</div><div class="rs-trend up"><span class="mi">groups</span>sem.</div></div>
            <div class="rs-lbl">Posiciones · semana</div>
          </div>
          <div class="recl-stat">
            <div class="rs-top"><div class="rs-ic" style="background:rgba(31,168,74,.12);color:#1F8F50"><span class="mi">check_circle</span></div>
              <div class="rs-val">${t.cov}</div><div class="rs-trend up"><span class="mi">done</span>${t.pct}%</div></div>
            <div class="rs-lbl">Cubiertas</div>
          </div>
          <div class="recl-stat" style="cursor:pointer" onclick="window.__schedToggle(true)">
            <div class="rs-top"><div class="rs-ic" style="background:rgba(225,25,25,.1);color:var(--red)"><span class="mi">priority_high</span></div>
              <div class="rs-val" style="color:var(--red)">${t.pendCount}</div><div class="rs-trend down"><span class="mi">warning</span>${t.pendCells} días</div></div>
            <div class="rs-lbl">Pendientes de cubrir</div>
          </div>
          <div class="recl-stat">
            <div class="rs-top"><div class="rs-ic" style="background:rgba(255,142,0,.12);color:var(--o-600)"><span class="mi">donut_large</span></div>
              <div class="rs-val">${t.pct}<span style="font-size:14px;color:var(--ink-3);font-weight:600">%</span></div><div class="rs-trend ${t.pct>=90?'up':'warn'}"><span class="mi">insights</span>cob.</div></div>
            <div class="rs-lbl">Cobertura semanal</div>
          </div>
        </div>
      </div>

      <!-- BARRA: hotel + semana + toggle pendientes + read-only -->
      <div class="sched-bar">
        <div class="sched-hotel" onclick="window.__schedMenu(event)">
          <div class="sh-ic"><span class="mi">hotel</span></div>
          <div class="sh-txt"><div class="nm">${h.name}</div><div class="zn"><span class="mi">location_on</span>${h.zona}</div></div>
          <span class="mi chev">expand_more</span>
          <div class="sched-hotel-menu${state.menuOpen?' open':''}" onclick="event.stopPropagation()">${menu}</div>
        </div>

        <div class="sched-week">
          <div class="wk-nav" onclick="window.toast&&window.toast('Vista de semana — solo lectura','calendar_month')"><span class="mi">chevron_left</span></div>
          <div class="wk-lbl">12 – 18 may 2026<small>SEMANA EN CURSO</small></div>
          <div class="wk-nav" onclick="window.toast&&window.toast('Vista de semana — solo lectura','calendar_month')"><span class="mi">chevron_right</span></div>
        </div>

        <div class="sched-spacer"></div>

        <div class="recl-segmented" style="background:var(--surface-3)">
          <button class="${!state.onlyPend?'active':''}" onclick="window.__schedToggle(false)"><span class="mi">grid_view</span>Todo</button>
          <button class="${state.onlyPend?'active':''}" onclick="window.__schedToggle(true)"><span class="mi">priority_high</span>Solo pendientes</button>
        </div>

        <div class="sched-readonly"><span class="mi">visibility</span>Solo lectura — gestión a cargo del Manager del Hotel</div>
      </div>

      <!-- LEYENDA -->
      <div class="sched-legend">
        <span class="lg"><span class="sw full"></span>Cubierto</span>
        <span class="lg"><span class="sw part"></span>Parcial</span>
        <span class="lg"><span class="sw none"></span>Sin cubrir</span>
        <span class="lg"><span class="sw rest"></span>Descanso</span>
        <span style="margin-left:auto;display:inline-flex;align-items:center;gap:5px"><span class="mi" style="font-size:14px;color:var(--ink-4)">touch_app</span>Los huecos en rojo marcan posiciones pendientes de cubrir.</span>
      </div>

      <!-- MATRIZ -->
      <div class="sched-matrix-wrap${state.onlyPend?' only-pend':''}">
        <div class="sched-grid" style="grid-template-columns:${cols}">
          <div class="gh pos-h">Posición<small>${h.positions.length} posiciones activas</small></div>
          ${headCells}
          ${rows}
        </div>
      </div>
    `;
  }

  window.__schedPick = function(id){ state.hotel=id; state.menuOpen=false; render(); };
  window.__schedToggle = function(v){ state.onlyPend=v; render(); };
  window.__schedMenu = function(ev){ ev.stopPropagation(); state.menuOpen=!state.menuOpen; render(); };
  document.addEventListener('click', e=>{
    if(state.menuOpen && !e.target.closest('.sched-hotel')){ state.menuOpen=false; if(document.getElementById('sched-root')) render(); }
  });

  window.__renderSched = render;
  setTimeout(()=>{ const pv=document.querySelector('[data-page-view="Schedule"]'); if(pv && pv.style.display!=='none') render(); }, 60);
})();
