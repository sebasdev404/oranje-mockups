/* ============================================================
   ORANJE · Motor de internacionalización ES → EN
   - Traducción en runtime sobre el DOM ya renderizado.
   - Cachea el español original por nodo para poder volver.
   - MutationObserver re-traduce contenido renderizado por JS.
   - No toca nombres propios, IDs, CURP, correos ni números
     (simplemente no están en el diccionario → se dejan igual).
   API:  OranjeI18n.set('en'|'es') · OranjeI18n.toggle() · OranjeI18n.get()
   ============================================================ */
(function(){
  'use strict';

  /* ---------- Diccionario de frases completas (ES → EN) ---------- */
  const DICT = {
    // —— Navegación / chrome ——
    "Principal":"Main","Dashboard":"Dashboard","Reclutamiento":"Recruitment",
    "Requisiciones":"Requisitions","Blacklist":"Blacklist","Soporte":"Support",
    "Colapsar":"Collapse","Todo":"All","Colaboradores":"Collaborators","Hoteles":"Hotels",
    "Búsquedas recientes":"Recent searches","Historial":"History",
    "Notificaciones":"Notifications","Marcar todas como leídas":"Mark all as read",
    "Todas":"All","Sin leer":"Unread","Ver todas las notificaciones":"See all notifications",
    "Atajo para abrir rápido:":"Shortcut to open quickly:",
    "Buscar requisiciones, colaboradores, hoteles, blacklist…":"Search requisitions, collaborators, hotels, blacklist…",
    "Req":"Req","Colab.":"Collab.","Hotel":"Hotel","Veto":"Veto","Vetado":"Banned",

    // —— Menú de usuario ——
    "Cuenta":"Account","Mi información":"My information","Mi zona asignada":"My assigned zone",
    "Mis métricas":"My metrics","Mis notificaciones":"My notifications","Configuración":"Settings",
    "Cambiar contraseña":"Change password","Preferencias":"Preferences","Cerrar sesión":"Log out",
    "Reclutadora":"Recruiter","Reclutador":"Recruiter","Idioma":"Language","Español (México)":"Spanish (Mexico)",
    "Inglés (EE. UU.)":"English (US)","Inglés":"English","Español":"Spanish","Tema":"Theme","Claro":"Light","Oscuro":"Dark",

    // —— Notificaciones (contenido) ——
    "Nueva requisición asignada":"New requisition assigned",
    "— El Manager de Reclutamiento te distribuyó":"— The Recruitment Manager distributed to you",
    "Candidato completó la App":"Candidate completed the App",
    "— María López terminó Fase 2, listo para validar en Fase 3":"— María López finished Phase 2, ready to validate in Phase 3",
    "Requisición con urgencia Red":"Requisition with Red urgency",
    "— REQ #001 pasó al umbral crítico (<72h)":"— REQ #001 reached the critical threshold (<72h)",
    "Requiere atención inmediata":"Requires immediate attention",
    "Blacklist actualizado":"Blacklist updated",
    "— Nuevo colaborador vetado agregado por QA":"— New banned collaborator added by QA",
    "Caso escalado por QA":"Case escalated by QA",
    "— Investigación de Rojo cerrada para Carlos Ruiz":"— Red investigation closed for Carlos Ruiz",
    "Ver detalle":"View detail","Ayer":"Yesterday",

    // —— Dashboard hero ——
    "Esto es lo que está pasando hoy,":"Here's what's happening today,",
    "con tu naranjitas.":"with your naranjitas.","Exportar":"Export",
    "Mis KPIs":"My KPIs","Indicadores clave del mes":"Key indicators of the month",
    "Requisiciones completadas":"Completed requisitions","Durante el mes":"During the month",
    "Última tomada hace":"Last taken","Requisiciones en proceso":"Requisitions in progress",
    "Estado de urgencia de las requisiciones abiertas":"Urgency status of open requisitions",
    "Urgente":"Urgent","Pronto":"Soon","Normal":"Normal",
    "Colaboradores asignados":"Assigned collaborators","Último asignamiento hace":"Last assignment",
    "Candidatos":"Candidates","Pendientes de validar la fase 2 y 3 de la app":"Pending validation of app phases 2 and 3",
    "Validados hoy":"Validated today","Requisiciones urgentes":"Urgent requisitions",
    "Para asignar desde mis requisiciones":"To assign from my requisitions",
    "Ver todas las urgentes":"See all urgent","Se cierran en menos de 72 hrs":"Closing in less than 72 hrs",
    "Alta":"High","Alertas criticas":"Critical alerts","Alertas críticas":"Critical alerts",
    "Ingresaron a blacklist":"Added to blacklist","Colaboradores vetados este mes":"Collaborators banned this month",
    "Abandonaron el proceso":"Dropped out of the process","Sin completar fase 2 y 3 · +10 días":"Without completing phases 2 and 3 · +10 days",
    "salidas del proceso de asignamiento":"exits from the assignment process",
    "Acciones rápidas":"Quick actions","Atajos más usados":"Most used shortcuts",
    "Nuevo candidato":"New candidate","Crear perfil manualmente":"Create profile manually",
    "Tomar requisición":"Take requisition","Buscar en pool":"Search in pool",
    "Consultar blacklist":"Check blacklist","Verificar historial del colaborador":"Verify collaborator history",
    "Pool de candidatos":"Candidate pool","Disponibilidad por posición · en tiempo real":"Availability by position · in real time",
    "listos para asignar":"ready to assign","Ver pool completo":"See full pool",
    "Disponible":"Available","Disp. voluntario":"Voluntary avail.","disp.":"avail.",
    "Sin disponibles ahora":"None available now",

    // —— Posiciones ——
    "Mesero":"Waiter","Mantenimiento":"Maintenance","Recepción":"Reception","Electricista":"Electrician",
    "Cocinero":"Cook","Limpieza":"Cleaning",

    // —— Zonas ——
    "Zona":"Zone","Centro":"Central","Norte":"North","Sur":"South","Este":"East","Oeste":"West",
    "Noroeste":"Northwest","Sureste":"Southeast","Noreste":"Northeast","Suroeste":"Southwest","Poniente":"West","Costera":"Coastal",
    "Todas las zonas":"All zones",

    // —— Bandejas / tablas ——
    "Bandejas y requisiciones":"Trays and requisitions","Acción de entrevistas · tu cartera del mes":"Interview actions · your portfolio for the month",
    "Bandejas de acción entrevistas":"Interview action trays","Requieren tu revisión ahora":"Require your review now",
    "Pendientes de app":"Pending app","Candidatos por validar":"Candidates to validate","Actualizaciones":"Updates",
    "Candidato":"Candidate","Requisición":"Requisition","Estado app":"App status","Aplicó":"Applied","Acciones":"Actions",
    "Fase 2+3 completa":"Phase 2+3 complete","Puesto y zona":"Position and zone","Esperando app":"Waiting for app",
    "Movimiento":"Movement","Tipo":"Type","Hace":"Ago",
    "Subió identificación oficial":"Uploaded official ID","Documento":"Document",
    "Completó datos de disponibilidad horaria":"Completed schedule availability data","Perfil":"Profile",
    "Corrigió número de Seguro Social":"Corrected Social Security number","Requiere revisión":"Requires review",
    "Llenó datos de contacto de emergencia":"Filled emergency contact data",
    "Validar":"Validate","Reenviar invitación":"Resend invitation","Revisar":"Review",
    "Marcar como inconcluso":"Mark as incomplete","Ver perfil":"View profile",

    // —— Mis requisiciones ——
    "Mis requisiciones":"My requisitions","Por estado · en lo que va del mes":"By status · so far this month",
    "Ver todas":"See all","En proceso":"In progress","Cerradas parcialmente":"Partially closed","Cubiertas (100%)":"Covered (100%)",
    "Compartidas":"Shared","Compartida":"Shared","Autoasignadas":"Auto-assigned","Autoasignada":"Auto-assigned","Autoasignada por el sistema":"Auto-assigned by the system",
    "Autorizada":"Authorized","Autorizadas":"Authorized","Tiempo completo":"Full time","Medio tiempo":"Part time",
    "cubiertas":"covered","Cerradas parcial":"Partially closed","Cerradas con vacantes faltantes":"Closed with missing vacancies",
    "Cerrada hoy":"Closed today","Ver las parciales":"See partial ones","Cubiertas":"Covered","Cerradas al 100%":"Closed at 100%",
    "Ver las cubiertas":"See covered ones","Bandeja de requisiciones autorizadas":"Authorized requisitions tray",
    "Autorizadas sin tomar · orden por urgencia":"Authorized untaken · ordered by urgency","Ver todo":"See all",
    "Mixto · Fijo y Temporal":"Mixed · Permanent and Temporary","Varias modalidades":"Multiple modalities",
    "Fijo":"Permanent","Temporal":"Temporary","Por horas":"Hourly","Por hora":"Per hour",

    // —— Pool de colaboradores ——
    "Pool de colaboradores · Vivo":"Collaborator pool · Live","Captura y mantén el":"Capture and keep the",
    "pool de colaboradores":"collaborator pool","al día.":"up to date.",
    "Da de alta nuevos colaboradores, mantén su semáforo actualizado y consulta su historial. Las asignaciones se registran automáticamente en el Schedule del hotel.":"Register new collaborators, keep their status light updated and check their history. Assignments are automatically recorded in the hotel Schedule.",
    "Colaboradores en pool":"Collaborators in pool","Disponibles ahora":"Available now",
    "En onboarding / pre-asignación":"In onboarding / pre-assignment","Casos críticos / blacklist":"Critical cases / blacklist",
    "Entrevistas":"Interviews","Pool de colaboradores":"Collaborator pool",
    "Posición":"Position","Modalidad":"Modality","Idiomas":"Languages","Idiomas · elige uno o varios":"Languages · choose one or more",
    "Alemán":"German","Francés":"French","Italiano":"Italian","Portugués":"Portuguese",
    "Estado":"Status","Todos":"All","Listo para asignar":"Ready to assign","Por horas / fin de semana":"Hourly / weekend",
    "En requisición permanente":"In permanent requisition","Asignación temp.":"Temp. assignment","Cobertura corta":"Short coverage",
    "Onboarding D1-2":"Onboarding D1-2","Inducción inicial":"Initial induction","Día 3+ uniforme":"Day 3+ uniform",
    "En entrega de uniforme":"In uniform delivery","Pre-asignación":"Pre-assignment","Captura sin asignar":"Captured unassigned",
    "Stand by":"Stand by","Pausa temporal":"Temporary pause","No regresó":"Did not return","Falta sin aviso":"Absence without notice",
    "Reportado":"Reported","Incidencia abierta":"Open incident","Accidentado":"Injured","Incapacidad médica":"Medical leave",
    "Tablero":"Board","Tarjetas":"Cards","Tabla":"Table","Por zona":"By zone",
    "Avanzado":"Advanced","Intermedio":"Intermediate","Básico":"Basic","Conversacional":"Conversational","Según solicitud":"On request",
    "Ver detalle":"View detail","Cambiar foto":"Change photo",

    // —— Bandeja autorizadas / self-pick ——
    "Bandeja de hoy · Self-pick activo":"Today's tray · Self-pick active","Toma":"Take",
    "requisiciones autorizadas":"authorized requisitions","y cubre la posición.":"and cover the position.",
    "Las urgentes (rojo) entran primero. Toma las que puedas cubrir, asigna colaboradores del pool y cierra cuando estén completas.":"Urgent ones (red) come first. Take the ones you can cover, assign collaborators from the pool and close them when complete.",
    "Bandeja autorizadas":"Authorized tray","Urgentes (24h)":"Urgent (24h)","Tasa cobertura (mes)":"Coverage rate (month)",
    "Bandeja de Autorizadas":"Authorized Tray","Tipo de requisicion":"Requisition type","Tipo de requisición":"Requisition type","Tipo de contrato":"Contract type",
    "Estado de urgencia":"Urgency status","Urgentes":"Urgent","Menos de 72 horas":"Less than 72 hours",
    "En colaboración":"In collaboration","Cobertura de vacantes":"Vacancy coverage","Unirme a la requisición":"Join the requisition",
    "· Ya puede recibir colaboradores":"· Can now receive collaborators","Entre 72 y 120 horas":"Between 72 and 120 hours",
    "Normales":"Normal","Más de 120 horas":"More than 120 hours","Electricista":"Electrician",

    // —— Mi cuenta / Mi información ——
    "Volver":"Back","Mi cuenta":"My account","Seguridad":"Security",
    "Consulta los datos de tu perfil o cambia tu foto de perfil.":"Check your profile data or change your profile photo.",
    "Mi información de perfil":"My profile information","Nombre completo":"Full name","Correo electrónico":"Email",
    "Teléfono":"Phone","Rol":"Role","Zona geográfica y propiedades que tienes a tu cargo.":"Geographic zone and properties under your charge.",
    "Propiedades asignadas":"Assigned properties","Propiedad 01":"Property 01","Propiedad 02":"Property 02","Propiedad 03":"Property 03",
    "Indicadores de desempeño de tu gestión como reclutadora.":"Performance indicators of your management as a recruiter.",
    "Requisiciones cubiertas (mes)":"Requisitions covered (month)","Tasa de cobertura":"Coverage rate",
    "Candidatos Validados":"Validated candidates","Tiempo promedio de asignación":"Average assignment time",
    "Todas tus alertas de requisiciones, candidatos, blacklist y sistema en un solo lugar.":"All your requisition, candidate, blacklist and system alerts in one place.",
    "Hoy":"Today","Esta semana":"This week","Este mes":"This month","No hay notificaciones para este filtro.":"No notifications for this filter.",
    "Administra tu contraseña y la seguridad de tu cuenta.":"Manage your password and account security.","Contraseña":"Password",
    "Volver a Seguridad":"Back to Security","Actualiza tu contraseña para mantener tu cuenta protegida.":"Update your password to keep your account protected.",
    "Verifica tu identidad":"Verify your identity","Contraseña actual":"Current password","Ingresa tu contraseña actual":"Enter your current password",
    "Crea tu nueva contraseña":"Create your new password","Nueva contraseña":"New password","Fuerza":"Strength",
    "Mínimo 8 caracteres":"Minimum 8 characters","1 letra mayúscula":"1 uppercase letter","1 letra minúscula":"1 lowercase letter",
    "1 número":"1 number","1 carácter especial":"1 special character","Distinta a la actual":"Different from current",
    "La contraseña no cumple los requisitos":"The password does not meet the requirements","Confirmar nueva contraseña":"Confirm new password",
    "Las contraseñas coinciden":"Passwords match","Las contraseñas no coinciden":"Passwords do not match",
    "Campos obligatorios":"Required fields","Guardar contraseña":"Save password","Contraseña actualizada":"Password updated",
    "Tu contraseña se actualizó correctamente. A partir de ahora deberás utilizar la nueva contraseña para iniciar sesión.":"Your password was updated successfully. From now on you must use the new password to log in.",
    "Entendido":"Got it","Crea una contraseña segura":"Create a secure password","Repite la nueva contraseña":"Repeat the new password",

    // —— Preferencias ——
    "Personaliza tu experiencia en la plataforma.":"Customize your experience on the platform.",

    // —— Tweaks ——
    "Tono del logo":"Logo tone","Densidad":"Density","Cómoda":"Comfortable","Compacta":"Compact",
    "Saludo del dashboard":"Dashboard greeting","Informal":"Informal","Formal":"Formal","Sidebar":"Sidebar",
    "Expandido":"Expanded","Colapsado":"Collapsed",

    // —— Modal: registro creado ——
    "Registro creado y enviado con éxito":"Record created and sent successfully",
    "Se envió el acceso al colaborador por correo electrónico.":"Access was sent to the collaborator by email.",
    "Queda pendiente que complete su información en la app para continuar con la validación.":"It remains pending for them to complete their information in the app to continue with validation.",
    "Acceso enviado":"Access sent","Correo con liga al colaborador":"Email with link to the collaborator",
    "Pendiente: completa su información":"Pending: complete their information","El colaborador debe llenar su perfil en la app":"The collaborator must fill out their profile in the app",

    // —— Modal: recordatorio ——
    "Enviar recordatorio al candidato":"Send reminder to candidate","Se notificará al candidato para que":"The candidate will be notified to",
    "descargue la app de Oranje":"download the Oranje app","y complete su registro (Fase 2: datos personales y Fase 3: carga de documentos).":"and complete their registration (Phase 2: personal data and Phase 3: document upload).",
    "Notificación app":"App notification","Notificacion push directa":"Direct push notification","Notificación push directa":"Direct push notification",
    "SMS":"SMS","al número registrado":"to the registered number","WhatsApp":"WhatsApp","con link directo de descarga":"with direct download link",
    "Email":"Email","con instrucciones paso a paso":"with step-by-step instructions","Cancelar":"Cancel","Aceptar y enviar":"Accept and send",

    // —— Modal: inconcluso / rechazo ——
    "El candidato pasará al estado":"The candidate will move to the status","Inconcluso":"Incomplete",
    ". Recibirá una notificación con el motivo para corregir la información requerida y volver a aplicar.":". They will receive a notification with the reason to correct the required information and reapply.",
    "Motivo de la decisión":"Reason for the decision","Selecciona un motivo…":"Select a reason…",
    "Documentación incompleta":"Incomplete documentation","Documentación borrosa o poco visible":"Blurry or barely visible documentation",
    "Información inconsistente entre datos y documentos":"Inconsistent information between data and documents",
    "No adjuntó foto del colaborador":"Did not attach collaborator photo","Candidato duplicado en el sistema":"Duplicate candidate in the system",
    "Otro motivo (especificar)":"Other reason (specify)","Explicación / detalles":"Explanation / details",
    "Mínimo 15 caracteres — sé específico para futuras referencias.":"Minimum 15 characters — be specific for future reference.",
    "Adjuntos / pruebas":"Attachments / evidence","(opcional)":"(optional)","Adjunta pruebas o documentos de soporte":"Attach evidence or supporting documents",
    "Capturas, correos, comprobantes · PDF, JPG, PNG · máx. 10 MB c/u":"Screenshots, emails, receipts · PDF, JPG, PNG · max. 10 MB each","Examinar":"Browse",
    "Describe el motivo. Esta información será enviada al candidato y registrada en su historial.":"Describe the reason. This information will be sent to the candidate and recorded in their history.",

    // —— Info: auto-asignada ——
    "Auto-asignada por el sistema":"Auto-assigned by the system","Cuando una requisición lleva":"When a requisition has been",
    "más de 24 horas":"more than 24 hours","en la bandeja sin que ningún reclutador la tome, el sistema la asigna automáticamente a la reclutadora con":"in the tray without any recruiter taking it, the system automatically assigns it to the recruiter with the",
    "menor carga":"lowest workload","Meta KPI · Tasa de auto-asignación":"KPI goal · Auto-assignment rate","Tasa actual":"Current rate",
    "1 de 3 requisiciones auto-asignadas — supera la meta. Toma requisiciones de la bandeja antes de las 24h para mantener la tasa baja.":"1 of 3 requisitions auto-assigned — exceeds the goal. Take requisitions from the tray before 24h to keep the rate low.",
    "Cada puesto vacante se colorea según su estado de cobertura.":"Each vacant position is colored according to its coverage status.",
    "Gris · Sin asignar":"Gray · Unassigned","Puesto autorizado y aún no se le ha asignado ningún colaborador. Típico en requisiciones nuevas recién autorizadas.":"Position authorized and no collaborator has been assigned yet. Typical in newly authorized requisitions.",
    "Rojo · Faltan puestos autorizados por cubrir":"Red · Authorized positions still to cover","También está autorizada, pero todavía hay puestos pendientes para asignar colaboradores.":"It is also authorized, but there are still positions pending to assign collaborators.",
    "Verde · Puestos autorizados cubierto":"Green · Authorized positions covered","Puesto ya asignado — listo para arrancar.":"Position already assigned — ready to start.",
    "Etiquetas de los tipos de requisiciones":"Requisition type labels","La cinta de color en la parte superior de cada tarjeta indica el estado de la requisición y quién puede trabajarla.":"The colored ribbon at the top of each card indicates the requisition status and who can work on it.",
    "En la Bandeja de Autorizadas":"In the Authorized Tray","La requisición ya fue":"The requisition was already",
    "autorizada por el manager":"authorized by the manager","y está disponible en la bandeja. Puedes":"and is available in the tray. You can",
    "tomarla tú o cualquier otro reclutador":"take it yourself or any other recruiter","Ya fue tomada por":"It was already taken by",
    "uno o más reclutadores":"one or more recruiters",". Si lo deseas,":". If you wish,","puedes unirte también":"you can join too",
    "y trabajarla en conjunto.":"and work on it together.","En Mis requisiciones":"In My requisitions",
    "Autorizadas · Tomadas por mí":"Authorized · Taken by me","La autorizó el manager y":"The manager authorized it and",
    "fuiste el primero en tomarla":"you were the first to take it",": por ahora eres el":": for now you are the",
    "único reclutador trabajándola":"only recruiter working on it",", pero con el tiempo pueden unirse más reclutadores.":", but over time more recruiters may join.",
    "Ya la tomaste y la trabajas":"You already took it and work on it","junto a otros reclutadores":"alongside other recruiters",
    ". Si entre todos ya no encuentran más candidatos por asignar, pónganse de acuerdo por chat: alguno la cierra como":". If together you no longer find more candidates to assign, agree via chat: someone closes it as",
    "parcial":"partial",". Si cubrieron todas las vacantes,":". If you covered all the vacancies,",
    "el último en asignar es quien la marca como cubierta":"the last to assign is the one who marks it as covered",

    // —— Asignación success ——
    "¡Ya está en la Pool!":"It's now in the Pool!","El colaborador fue enviado a la Pool en estado de pre-asignación":"The collaborator was sent to the Pool in pre-assignment status",
    "Toca para continuar":"Tap to continue","¡Asignado!":"Assigned!","El colaborador fue asignado al hotel":"The collaborator was assigned to the hotel",

    // —— Soporte ——
    "Reportar un problema":"Report a problem","Cuéntanos qué ocurrió y nuestro equipo de Soporte te responderá.":"Tell us what happened and our Support team will respond.",
    "Tu reporte se envía al":"Your report is sent to the","equipo de Soporte de Oranje":"Oranje Support team",". Recibirás una respuesta por":". You will receive a response by",
    "correo y dentro de la plataforma":"email and within the platform","en un plazo aproximado de":"within approximately","24 h hábiles":"24 business hours",
    ". Para urgencias operativas marca prioridad":". For operational emergencies mark priority","Tipo de problema":"Problem type",
    "Error o falla técnica":"Error or technical failure","Algo no carga, se traba o no funciona":"Something doesn't load, freezes or doesn't work",
    "Dato incorrecto":"Incorrect data","Info de un colaborador o requisición incorrecta":"Incorrect collaborator or requisition info",
    "Acceso o inicio de sesión":"Access or login","Contraseña, permisos o bloqueo":"Password, permissions or lockout",
    "Sugerencia o mejora":"Suggestion or improvement","Una idea para mejorar la plataforma":"An idea to improve the platform",
    "Prioridad":"Priority","Baja":"Low","Media":"Medium","Alta · urgente":"High · urgent","Asunto":"Subject","Descripción":"Description",
    "Mínimo 20 caracteres — entre más detalle, más rápido lo resolvemos.":"Minimum 20 characters — the more detail, the faster we resolve it.",
    "Adjuntar pruebas":"Attach evidence","Adjunta capturas o documentos":"Attach screenshots or documents",
    "Capturas de pantalla, PDF, JPG, PNG · máx. 10 MB c/u":"Screenshots, PDF, JPG, PNG · max. 10 MB each","Enviar reporte":"Send report",
    "Reporte enviado":"Report sent","Folio":"Reference","Gracias. Tu reporte llegó al":"Thank you. Your report reached the","y ya está en cola de atención.":"and is now in the support queue.",
    "Resume el problema en una frase":"Summarize the problem in one sentence",
    "¿Qué intentabas hacer? ¿Qué pasó? Incluye el módulo, el colaborador o la requisición involucrada (ID), y los pasos para reproducirlo.":"What were you trying to do? What happened? Include the module, the collaborator or requisition involved (ID), and the steps to reproduce it.",

    // —— Documentación migratoria ——
    "Documentación migratoria":"Immigration documentation","SSN — Social Security Number":"SSN — Social Security Number",
    "Retención del 16 % si no se adjunta":"16% withholding if not attached","Si el colaborador":"If the collaborator",
    "no sube este documento":"does not upload this document","en la app, se le retendrá automáticamente el":"in the app, the following will be automatically withheld:",
    "16 % de su sueldo por cheque o tranferencia.":"16% of their salary by check or transfer.",
    ". Esto se debe a que, sin este número, para efectos fiscales en EE.UU. el colaborador es clasificado como inmigrante sin documentación en regla y la ley obliga a aplicar esa retención.":". This is because, without this number, for US tax purposes the collaborator is classified as an immigrant without proper documentation and the law requires applying that withholding.",
    "El colaborador":"The collaborator","puede seguir trabajando con normalidad":"can keep working normally",
    ". La retención del 16 % se aplica únicamente mientras el documento no esté adjunto en la plataforma — en cuanto lo suba y sea validado, el descuento se elimina.":". The 16% withholding applies only while the document is not attached on the platform — once they upload it and it is validated, the deduction is removed.",

    // —— Tooltips / search placeholders ——
    "Ver mis requisiciones cerradas (parciales y cubiertas)":"See my closed requisitions (partial and covered)",
    "Requisiciones completadas hoy":"Requisitions completed today","Ir a Mis requisiciones":"Go to My requisitions",
    "Urgencia de mis requisiciones en proceso":"Urgency of my requisitions in progress",
    "Ver requisiciones en proceso · Urgente":"See requisitions in progress · Urgent","Ver requisiciones en proceso · Pronto":"See requisitions in progress · Soon",
    "Ver requisiciones en proceso · Normal":"See requisitions in progress · Normal","Colaboradores asignados en lo que va del mes":"Collaborators assigned so far this month",
    "Colaboradores asignados hoy":"Collaborators assigned today","Ver candidatos pendientes de validar en Entrevistas":"See candidates pending validation in Interviews",
    "Requisición urgente más próxima a cerrar":"Most urgent requisition closest to closing","Abrir y asignar":"Open and assign",
    "Ver en Blacklist · filtrado por este mes":"View in Blacklist · filtered by this month","Ver en Entrevistas · estado Abandonados":"View in Interviews · Dropped status",
    "Mostrar / ocultar detalle":"Show / hide detail","Buscar por nombre, documento, teléfono o ID…":"Search by name, document, phone or ID…",
    "Buscar por ID, hotel, posición o zona…":"Search by ID, hotel, position or zone…","Buscar por teléfono, nombre o documento (SSN)…":"Search by phone, name or document (SSN)…",
    "Filtrar por fecha precisa":"Filter by exact date","Quitar filtro de fecha":"Remove date filter",
    "¿Qué significa cada color?":"What does each color mean?","Semáforo: rojo":"Status light: red","Semáforo: naranja":"Status light: orange",
    "completadas hoy":"completed today","asignados hoy":"assigned today","hoy":"today",

    // —— Blacklist ——
    "Control de calidad · Vetados":"Quality control · Banned","vetados":"banned","de la plataforma.":"from the platform.",
    "Consulta el listado completo de blacklist, su motivo y quién lo propuso. Cualquier reclutador puede agregar a un colaborador con la justificación correspondiente.":"Check the full blacklist, the reason and who proposed it. Any recruiter can add a collaborator with the corresponding justification.",
    "total":"total","Total vetados":"Total banned","auto":"auto","Por 3 faltas":"For 3 absences","crít.":"crit.","Falta grave":"Serious misconduct",
    "reportes":"reports","Hoteles con reportes":"Hotels with reports","Agregar a blacklist":"Add to blacklist",
    "Motivo":"Reason","Todos los motivos":"All reasons","3 faltas":"3 absences","Vetado por":"Banned by","Inspector de zona":"Zone inspector",
    "Periodo":"Period","Cualquiera":"Any","Cualquier fecha":"Any date","Último mes":"Last month","Últimos 3 meses":"Last 3 months",
    "Últimos 6 meses":"Last 6 months","Último año":"Last year","Personalizado":"Custom","Todos los vetados":"All banned",
    "Colaborador":"Collaborator","Motivo del veto":"Ban reason","Fecha de ingreso":"Date added","Propuesto por":"Proposed by",
    "Sistema Oranje":"Oranje System","Escalamiento automático · 3ª inasistencia":"Automatic escalation · 3rd no-show",
    "Vetado · Motivo: ausentismo reiterado":"Banned · Reason: repeated absenteeism",
    "Supervisor":"Supervisor","Manager de Área":"Area Manager","Manager General":"General Manager","Manager de Reclutamiento":"Recruitment Manager",
    "Reclutadora · Zona Centro":"Recruiter · Central Zone","Zona Centro · Reclutadora":"Central Zone · Recruiter",
    "Robo o sustracción de bienes":"Theft or removal of property","Acoso":"Harassment",

    // —— Misc small ——
    "Meta · 5%":"Goal · 5%","OK":"OK",
  };

  /* ---------- Ampliación: drawers, modales, cards, narrativas ---------- */
  Object.assign(DICT, {
    // Tabs de detalle
    "Datos":"Data","Laboral":"Employment","Historial de asignaciones":"Assignment history",
    "Documentos":"Documents","Detalle":"Detail","Asignación":"Assignment","Ver más pestañas":"More tabs",
    // Datos del candidato / emergencia
    "Datos del candidato":"Candidate data","Datos del colaborador":"Collaborator data","Datos de emergencia":"Emergency data",
    "Datos personales":"Personal data","Solo lectura":"Read only","de solo lectura":"read only",
    "Contacto de emergencia":"Emergency contact","Tipo de sangre":"Blood type","Alergias o condiciones":"Allergies or conditions",
    "Edad":"Age","Género":"Gender","Femenino":"Female","Masculino":"Male","Prefiero no decir":"Prefer not to say",
    "Domicilio":"Address","Legal":"Legal","Pendiente":"Pending","Ninguna":"None","Penicilina":"Penicillin","Mariscos":"Shellfish",
    "El candidato proporcionó estos datos en su app durante el onboarding. La información es":"The candidate provided this data in their app during onboarding. The information is",
    "El colaborador proporcionó estos datos en su app durante el onboarding. La información es":"The collaborator provided this data in their app during onboarding. The information is",
    "Editar":"Edit","Editar datos del candidato":"Edit candidate data","Descargar":"Download",
    // Laboral
    "Posición":"Position","Nivel de inglés":"English level","Experiencia":"Experience","Tipo de transporte":"Transport type",
    "Información personal":"Personal information","Información de contacto":"Contact information","Información de seguimiento":"Tracking information",
    "Área":"Area","Área / Departamento":"Area / Department","Formación":"Education","Turno":"Shift","Jornada":"Workday","Frecuencia":"Frequency",
    "Horario":"Schedule","Horario y modalidad":"Schedule and modality","Horas":"Hours","Días":"Days","Día":"Day","día":"day",
    "Días requeridos":"Required days","Tipo de schedule":"Schedule type","Tipo de contrato":"Contract type","Contrato":"Contract","Período":"Period",
    "Sin historial laboral":"No employment history","Sin historial de asignaciones":"No assignment history","Sin hoteles previos":"No previous hotels",
    "Sin asignaciones previas":"No previous assignments","Hotel de origen":"Origin hotel",
    // Estado blacklist en pool drawer
    "Estado en blacklist":"Blacklist status","Sin registro de blacklist":"No blacklist record","Apto para ser asignado a hotel":"Eligible to be assigned to a hotel",
    "Apto":"Eligible","Situación actual":"Current situation","Semáforo actual":"Current status light",
    // Nuevo colaborador modal
    "Nuevo colaborador":"New collaborator","Completa los datos básicos del candidato tras la entrevista inicial.":"Complete the candidate's basic data after the initial interview.",
    "¿De dónde viene este candidato?":"Where does this candidate come from?","Origen":"Origin",
    "Referido":"Referral","Búsqueda activa":"Active search","Canales de difusión":"Outreach channels",
    "Recomendado por un colaborador, hotel o aliado.":"Referred by a collaborator, hotel or partner.",
    "Captación directa: llamadas, WhatsApp, perfiles en LinkedIn, base interna, etc.":"Direct sourcing: calls, WhatsApp, LinkedIn profiles, internal database, etc.",
    "Bolsas de trabajo externas, redes sociales, ferias, publicidad.":"External job boards, social media, fairs, advertising.",
    "Selecciona la fuente por la que llegó. Define en qué campaña o canal contabilizamos su ingreso al Pool.":"Select the source they came through. It defines which campaign or channel we count their entry to the Pool under.",
    "Selecciona el origen del candidato antes de continuar":"Select the candidate's origin before continuing",
    "Puesto del candidato":"Candidate position","Selecciona el puesto…":"Select the position…","Selecciona el puesto del candidato":"Select the candidate's position","Escribe el puesto del candidato":"Type the candidate's position",
    "Nombres":"First names","Primer apellido":"First surname","Segundo apellido":"Second surname",
    "Ej. María Fernanda":"e.g. María Fernanda","Ej. López":"e.g. López","Ej. Hernández":"e.g. Hernández",
    "Ingresa los nombres del colaborador":"Enter the collaborator's first names","Ingresa el primer apellido":"Enter the first surname","Ingresa el segundo apellido":"Enter the second surname",
    "Fecha de nacimiento":"Date of birth","Selecciona…":"Select…","Selecciona la fecha de nacimiento (edad entre 18 y 80 años)":"Select the date of birth (age between 18 and 80)",
    "Domicilio":"Address","Calle, número, colonia, ciudad":"Street, number, neighborhood, city","Captura el domicilio completo":"Enter the full address",
    "Zona del colaborador":"Collaborator zone","Selecciona la zona…":"Select the zone…","Selecciona la zona del colaborador":"Select the collaborator's zone",
    "Currículum del colaborador":"Collaborator resume","Sube el CV del candidato":"Upload the candidate's CV","Adjunta el CV del colaborador para continuar":"Attach the collaborator's CV to continue",
    "Arrastra el CV aquí o haz clic para buscarlo":"Drag the CV here or click to browse","Formatos aceptados: PDF, DOC, DOCX · máx. 10 MB":"Accepted formats: PDF, DOC, DOCX · max. 10 MB",
    "Crear y enviar registro al colaborador":"Create and send registration to the collaborator","Validar y enviar al Pool":"Validate and send to the Pool","Dar de baja manual al candidato":"Manually remove the candidate",
    "Ingresa un teléfono válido (mín. 10 dígitos)":"Enter a valid phone (min. 10 digits)","Formato de correo inválido":"Invalid email format",
    "Listo para precargar":"Ready to preload","precarga de manera automatica":"automatically preloaded","ya cargado":"already uploaded","como documento":"as a document",
    "Antes de empezar":"Before starting","Más información":"More information","Más opciones":"More options",
    "Información de contacto":"Contact information","Nivel de experiencia":"Experience level","Experiencia mínima":"Minimum experience","Nivel mínimo":"Minimum level",
    // Entrevistas hero
    "Entrevistas · seguimiento de todas las fases → Pool":"Interviews · tracking of all phases → Pool",
    "Sigue de cerca a los":"Closely track the","candidatos en cola":"candidates in queue","a unirse al Pool.":"to join the Pool.",
    "Mira quiénes ya pasaron entrevista pero aún no completan la app, valida los que están listos y revisa los rechazados a tiempo.":"See who already passed the interview but hasn't completed the app yet, validate those who are ready and review the rejected ones in time.",
    "Candidatos en seguimiento":"Candidates in tracking","Entrevistas en seguimiento":"Interviews in tracking","Pendientes de App":"Pending App","Pendientes de validar":"Pending validation",
    "Entrevista":"Interview","Buscar en entrevistas por nombre, ID, DOC o zona…":"Search interviews by name, ID, DOC or zone…",
    // Requisition summary / drawer
    "Resumen de la requisición":"Requisition summary","Resumen del Schedule":"Schedule summary","Cobertura":"Coverage","Vacantes":"Vacancies","Vacante":"Vacancy",
    "Puesto/s":"Position(s)","Puesto":"Position","Modalidad":"Modality","Esta requisición está en la":"This requisition is in the","bandeja de autorizadas":"authorized tray",
    "Ya puedes tomarla para asignar colaboradores.":"You can now take it to assign collaborators.","Tienes esta requisición.":"You have this requisition.","Tienes esta requisición. Ve a":"You have this requisition. Go to",
    "para cubrir las vacantes restantes.":"to cover the remaining vacancies.","Ve a":"Go to","Vacantes asignadas":"Assigned vacancies","Vacantes sin asignar":"Unassigned vacancies","Vacantes por asignar":"Vacancies to assign",
    "Colaboradores sin asignar":"Unassigned collaborators","Detalles de colaboradores sin asignar":"Unassigned collaborator details","Detalles de colaboradores asignados":"Assigned collaborator details",
    "Perfil del colaborador asignado":"Assigned collaborator profile","Gestión de colaboradores":"Collaborator management","sin cubrir":"uncovered","vacantes sin asignar.":"unassigned vacancies.",
    "Requisición en colaboración.":"Requisition in collaboration.","Requisición cubierta":"Requisition covered","Requisición cubierta exitosamente.":"Requisition covered successfully.","cubierta exitosamente":"covered successfully",
    "Asignar colaboradores":"Assign collaborators","Asignar":"Assign","Asignar múltiples":"Assign multiple","Ver requisición":"View requisition","Ver detalles":"View details","Volver a la requisición":"Back to the requisition",
    "Considera difundir en bolsa de talento.":"Consider sharing in the talent pool.","Pre-seleccionamos las":"We pre-selected the","mejores opciones del pool":"best options from the pool",
    "Estos son los candidatos que mejor coinciden con los filtros":"These are the candidates that best match the filters","Sin candidatos":"No candidates","Sin coincidencias":"No matches","Sin colaboradores":"No collaborators",
    "Sin colaboradores asignados":"No assigned collaborators","Sin colaboradores asignados aún":"No assigned collaborators yet","Sin colaboradores en esta zona":"No collaborators in this zone","Sin vacantes pendientes":"No pending vacancies",
    "Todas las posiciones cuentan con colaborador.":"All positions have a collaborator.","Todas las posiciones están cubiertas.":"All positions are covered.","¡Sin vacantes faltantes!":"No missing vacancies!",
    "No hay colaboradores que gestionar en esta requisición.":"There are no collaborators to manage in this requisition.","No hay colaboradores compatibles.":"There are no compatible collaborators.",
    "Días, frecuencia y horario que están cubriendo los colaboradores asignados":"Days, frequency and schedule the assigned collaborators are covering","Detalle de días, frecuencia, horario de las vacantes requeridas":"Detail of days, frequency, schedule of the required vacancies",
    "Schedule del hotel de colaboradores asignados":"Hotel schedule of assigned collaborators","Schedule del hotel de colaboradores sin asignar":"Hotel schedule of unassigned collaborators",
    "Schedule asignado por el hotel":"Schedule assigned by the hotel","Vista rápida de los días requeridos (se repite cada semana)":"Quick view of the required days (repeats every week)","Vista rápida de los días requeridos por posición":"Quick view of required days by position",
    "Horarios distintos por vacante":"Different schedules per vacancy","vacante con horarios distintos":"vacancy with different schedules","tiene requisitos distintos. Revisa el perfil de cada una antes de asignar.":"has different requirements. Check each one's profile before assigning.",
    // My requisitions board
    "Asignando colaboradores":"Assigning collaborators","Cerradas con faltantes de puestos":"Closed with missing positions","Tomadas por mí":"Taken by me","Tomaste":"You took","tomada por su":"taken by its",
    "Estados de urgencias":"Urgency statuses","Estado de la requisición":"Requisition status","Estado de urgencia":"Urgency status","Ordenar por":"Sort by",
    "Cerrada como":"Closed as","Cerrada como parcial":"Closed as partial","cerrada parcialmente":"partially closed","Flujo de cierre":"Closing flow","Responsable del cierre:":"Closing responsible:",
    // Blacklist board + add modal
    "Control de calidad":"Quality control","Agregar a blacklist":"Add to blacklist","Ingreso a blacklist":"Added to blacklist","Registrado por":"Registered by",
    "El colaborador quedará vetado de la plataforma. Esta acción se registra con tu nombre y requiere una justificación.":"The collaborator will be banned from the platform. This action is recorded under your name and requires a justification.",
    "Buscar en el pool por nombre, DOC o zona…":"Search the pool by name, DOC or zone…","Buscar en el Pool completo":"Search the full Pool","Buscar por nombre, DOC o zona…":"Search by name, DOC or zone…","Buscar por nombre o DOC…":"Search by name or DOC…","Buscar por nombre, documento o teléfono…":"Search by name, document or phone…",
    "Tipo de falta grave":"Type of serious misconduct","Falta grave":"Serious misconduct","falta grave":"serious misconduct","Falta":"Absence",
    "Conducta grave · baja inmediata. El veto manual aplica solo a faltas graves; las 3 inasistencias las escala el sistema automáticamente.":"Serious misconduct · immediate removal. Manual bans apply only to serious misconduct; the 3 no-shows are escalated automatically by the system.",
    "Justificación":"Justification","Describe brevemente lo ocurrido (mínimo 8 caracteres). Quedará en el historial del colaborador.":"Briefly describe what happened (minimum 8 characters). It will remain in the collaborator's history.",
    "Ej. Reincidencia en inasistencias sin aviso durante el turno asignado en Costa del Sol…":"e.g. Repeated no-shows without notice during the assigned shift at Costa del Sol…",
    "Reporte formal y evidencia":"Formal report and evidence","Motivo del reporte":"Report reason","Cabecera del reporte":"Report header","Detalle de inasistencias":"No-show detail","Detalle de inasistencias":"No-show detail",
    "Investigación del Inspector":"Inspector investigation","Investigación · Inspector de zona":"Investigation · Zone inspector","Inspector de zona.":"Zone inspector.","Información presencial":"On-site information","Información sobre retención fiscal":"Tax withholding information",
    "Reporte del hotel":"Hotel report","Reporte del hotel · en investigación":"Hotel report · under investigation","Reportado por":"Reported by","Reportada":"Reported","En investigación":"Under investigation","en investigación por el Inspector de zona":"under investigation by the zone inspector",
    "Vetado en entrevista por":"Banned during interview by","No existe proceso de rehabilitación ni instancia de apelación. El registro se conserva íntegro para consulta interna y":"There is no rehabilitation process or appeal instance. The record is kept intact for internal reference and",
    "Migrante":"Migrant","Migrante · sin SSN":"Migrant · no SSN","Sin documentación fisc.":"No tax docs",
    // Roles / categorías
    "Camarista":"Room Attendant","Botones":"Bellhop","Bartender":"Bartender","Valet":"Valet","Jardinería":"Gardening","Cocina":"Kitchen","Mesero (A&B)":"Waiter (F&B)","Recepción":"Reception",
    // Estados / semáforo narrativa (whole nodes)
    "Accidentado — en incapacidad médica":"Injured — on medical leave","Accidente":"Accident","accidente laboral":"work accident","incapacidad médica":"medical leave","incapacidad médica por accidente laboral":"medical leave due to work accident","alta médica":"medical discharge","hasta el alta médica.":"until medical discharge.",
    "En investigación":"Under investigation","En reposo":"At rest","Reportada":"Reported","Reportado al líder · pendiente decisión blacklist":"Reported to the lead · pending blacklist decision","reporte de blacklist":"blacklist report",
    "Asignación a hotel":"Hotel assignment","Asignación al hotel":"Hotel assignment","Sin asignación a hotel":"No hotel assignment","Asignación actual":"Current assignment","Asignación fija":"Permanent assignment","Asignación fija actual":"Current permanent assignment","Asignación fija · hotel base":"Permanent assignment · base hotel",
    "Asignación temporal":"Temporary assignment","Primera asignación":"First assignment","Primera asignación temporal":"First temporary assignment","Asignación a la que no regresó":"Assignment they did not return to","última asignación a la que no regresó":"last assignment they did not return to",
    "Disponibilidad — Según solicitud":"Availability — On request","Disponibilidad voluntaria · según solicitud":"Voluntary availability · on request","según solicitud":"on request","Según solicitud.":"On request.","Según operación":"Per operation","disponible para asignaciones temporales":"available for temporary assignments",
    "Cobertura":"Coverage","Cobertura temporal en":"Temporary coverage at","Fin de la cobertura":"End of coverage","Duración · día":"Duration · day","Progreso del onboarding":"Onboarding progress",
    "Día 1 · onboarding":"Day 1 · onboarding","Día 2 · onboarding":"Day 2 · onboarding","Día 3+ entrega uniforme + Hotel notificado":"Day 3+ uniform delivery + Hotel notified",
    "Salida del receso":"End of break","Posición liberada en pool":"Position released in pool","Schedule asignado por el hotel":"Schedule assigned by the hotel","Journal de la tarjeta":"Card journal","Observaciones":"Notes",
    // Soporte partials
    "Reporta un problema con esta requisición autorizada.":"Report a problem with this authorized requisition.","Reporta un problema relacionado con este colaborador del pool.":"Report a problem related to this pool collaborator.",
    "Tiempo estimado de respuesta:":"Estimated response time:","Te avisaremos por":"We'll notify you by","Recibirás una":"You will receive a","Se generó un":"A reference was generated:",
    // Notifs / misc whole nodes
    "Búsqueda inteligente":"Smart search","Búsqueda activa":"Active search","Roles relacionados":"Related roles","+ Roles relacionados":"+ Related roles",
    "Cerrar":"Close","Limpiar":"Clear","Limpiar todos los filtros":"Clear all filters","Quitar":"Remove","Aplicar":"Apply","Deshacer":"Undo","Reasignar":"Reassign","Reasignar a otro hotel":"Reassign to another hotel","Reemplazar":"Replace","Desasignar":"Unassign","Desasignar de la requisición":"Unassign from the requisition","Desasignado":"Unassigned","Reasignado":"Reassigned",
    "Ver perfil del colaborador":"View collaborator profile","Ver perfil en Pool":"View profile in Pool","Ver":"View","Puedes":"You can","Puedes buscar manualmente en el":"You can search manually in the","Podés explorar el":"You can explore the","Intenta quitar filtros o buscar en el Pool.":"Try removing filters or searching in the Pool.","Ajusta los filtros o limpia la búsqueda.":"Adjust the filters or clear the search.",
    "Sin candidatos en entrevistas para los filtros aplicados":"No candidates in interviews for the applied filters","Sin candidatos para los filtros aplicados":"No candidates for the applied filters","Sin colaboradores para los filtros aplicados":"No collaborators for the applied filters","Sin requisiciones que coincidan":"No matching requisitions","Sin resultados con los filtros aplicados":"No results with the applied filters","No hay candidatos que coincidan con los filtros":"No candidates match the filters","Sin coincidencias en el pool de colaboradores":"No matches in the collaborator pool","No encontramos más coincidencias automáticas que coincidan con los filtros":"We found no more automatic matches for the filters","coinciden con los filtros":"match the filters",
    "Requisitos de la contraseña":"Password requirements","Mostrar contraseña":"Show password","Tipo de problema":"Problem type",
    "Inconcluso · proceso no concluido, puede volver a aplicar":"Incomplete · process not concluded, can reapply","No completó registro en más de 3 días":"Did not complete registration in over 3 days","Abandono":"Drop-out",
    "No disponible":"Unavailable","No disponible para contrato Fijo":"Unavailable for Permanent contract","No aplica":"Not applicable","No requerido":"Not required","Fijo · no aplica":"Permanent · not applicable","Requerido":"Required","Requerida":"Required",
    "Tiempo completo (8h/día)":"Full time (8h/day)","Medio tiempo y por horas":"Part time and hourly","Varía según tipo de contrato":"Varies by contract type","Varios años de experiencia":"Several years of experience","Varios niveles de inglés":"Several English levels","Varias":"Several","Varios":"Several",
    "Mismatch de modalidad":"Modality mismatch","Mismatch de modalidad:":"Modality mismatch:","La vacante fue cubierta pero la modalidad asignada no coincide con la requerida":"The vacancy was filled but the assigned modality does not match the required one",
    "Stand by":"Stand by","Vacaciones":"Vacation","vacaciones de ley":"statutory vacation","Inasistencias":"No-shows","inasistencia sin justificación":"unjustified no-show","Sin justificación":"Unjustified","Urgencia":"Urgency","Pool":"Pool","Timesheet":"Timesheet","Schedule":"Schedule",
    "Sin preferencia · matutino, vespertino o nocturno":"No preference · morning, afternoon or night","Cualquier día de la semana":"Any day of the week",
    // Blacklist board columns + add modal extras
    "3 faltas (inasistencias)":"3 absences (no-shows)","Automático · sistema · 3ª inasistencia":"Automatic · system · 3rd no-show",
    "Crítico · baja inmediata":"Critical · immediate removal","Conducta grave · baja inmediata":"Serious misconduct · immediate removal",
    "Escalamiento automático · 3ª inasistencia":"Automatic escalation · 3rd no-show","Confirmar veto":"Confirm ban",
    "Sistema Oranje":"Oranje System","Sistema":"System",
    // Blacklist tabla — columnas + vía de ingreso
    "Vía de ingreso":"Entry path","Vetado por":"Banned by","Propuesto por":"Proposed by",
    "Automático":"Automatic","En entrevista":"In interview","En operación":"In operation",
    "Sistema · 3 faltas":"System · 3 absences","Hotel → Reclutadora":"Hotel → Recruiter","Hotel → Inspector":"Hotel → Inspector",
  });


  /* ---------- Tokens reutilizables dentro de segmentos ---------- */
  const MONTHS = {ene:"Jan",feb:"Feb",mar:"Mar",abr:"Apr",may:"May",jun:"Jun",jul:"Jul",ago:"Aug",sep:"Sep",oct:"Oct",nov:"Nov",dic:"Dec",
                  Ene:"Jan",Feb:"Feb",Mar:"Mar",Abr:"Apr",May:"May",Jun:"Jun",Jul:"Jul",Ago:"Aug",Sep:"Sep",Oct:"Oct",Nov:"Nov",Dic:"Dec"};
  const MONTHS_FULL = {enero:"January",febrero:"February",marzo:"March",abril:"April",mayo:"May",junio:"June",julio:"July",agosto:"August",septiembre:"September",octubre:"October",noviembre:"November",diciembre:"December"};

  function agoUnits(s){
    return s.replace(/\bdías\b/g,'days').replace(/\bdía\b/g,'day')
            .replace(/\bhrs\b/g,'hrs').replace(/\bhr\b/g,'hr')
            .replace(/\bmin\b/g,'min').replace(/\bsem\b/g,'wk');
  }

  /* ---------- Reglas (regex) para strings con números/datos ---------- */
  const RULES = [
    // "Hace 6 días", "Hace 1 hr", "Hace 2h", "Hace 1d 9h", "Hace 4 min"
    [/^Hace (.+)$/, m => agoUnits(m[1]) + ' ago'],
    // "Tomada hace 2h"
    [/^Tomada hace (.+)$/, m => 'Taken ' + agoUnits(m[1]) + ' ago'],
    // "En bandeja hace 2d 6h"
    [/^En bandeja hace (.+)$/, m => 'In tray ' + agoUnits(m[1]) + ' ago'],
    // "Junio 2026"
    [/^([A-Za-zÁÉÍÓÚáéíóú]+) (\d{4})$/, m => { const mo = MONTHS_FULL[m[1].toLowerCase()]; return mo ? (mo+' '+m[2]) : null; }],
    // "22 de junio"
    [/^(\d{1,2}) de ([a-záéíóú]+)$/, m => { const mo = MONTHS_FULL[m[2].toLowerCase()]; return mo ? (mo+' '+m[1]) : null; }],
    // "08 may 2026"
    [/^(\d{2}) ([a-zA-Z]{3}) (\d{4})$/, m => { const mo = MONTHS[m[2]]; return mo ? (m[1]+' '+mo+' '+m[3]) : null; }],
    // "01–07 Dic" / "03-10 Dic"
    [/^(\d{2})[–-](\d{2}) ([A-Za-z]{3})$/, m => { const mo = MONTHS[m[3]]; return mo ? (mo+' '+m[1]+'–'+m[2]) : null; }],
    // "46 de 64"
    [/^(\d+) de (\d+)$/, m => m[1]+' of '+m[2]],
    // "5/6 · faltan 1 (17%)"
    [/^(\d+\/\d+) · faltan (\d+) \((\d+)%\)$/, m => m[1]+' · '+m[2]+' missing ('+m[3]+'%)'],
    // "vacantes cubiertas (72%)"
    [/^vacantes cubiertas \((\d+)%\)$/, m => 'vacancies covered ('+m[1]+'%)'],
    // "X vacante(s) urgente(s)/normal(es)/pronto"
    [/^(\d+) vacantes? (urgentes?|normales?|pronto)$/, m => { const k={urgente:'urgent',urgentes:'urgent',normal:'normal',normales:'normal',pronto:'soon'}[m[2]]; return m[1]+' '+(m[1]==='1'?'vacancy':'vacancies')+' '+k; }],
    // "X puestos · esperando"
    [/^(\d+) puestos? · esperando$/, m => m[1]+' '+(m[1]==='1'?'position':'positions')+' · waiting'],
    // "X hoteles" / "X hotel"
    [/^(\d+) hoteles?$/, m => m[1]+' '+(m[1]==='1'?'hotel':'hotels')],
    // "X candidatos en pool"
    [/^(\d+) candidatos? en pool$/, m => m[1]+' '+(m[1]==='1'?'candidate':'candidates')+' in pool'],
    // "59 colaboradores en pool · 12 estados"
    [/^(\d+) colaboradores en pool · (\d+) estados$/, m => m[1]+' collaborators in pool · '+m[2]+' statuses'],
    // "16 colaboradores" / "N colaboradores"
    [/^(\d+) colaboradores$/, m => m[1]+' collaborators'],
    // "Zona Centro · 3 requisiciones activas" handled by split; but "3 requisiciones activas"
    [/^(\d+) requisiciones activas$/, m => m[1]+' active requisitions'],
    // "3 propiedades activas · CDMX"
    [/^(\d+) propiedades activas · (.+)$/, m => m[1]+' active properties · '+m[2]],
    // "09 en la bandeja de autorizadas"
    [/^0?(\d+) en la bandeja de autorizadas$/, m => m[1]+' in the authorized tray'],
    // "09 en bandeja" / "09 en la bandeja"
    [/^0?(\d+) en (la )?bandeja$/, m => m[1]+' in tray'],
    // "47 candidatos en pool" covered above; "X de Y" covered
    // "5 Autorizadas y tomada por mi" / "6 Autorizadas y tomada por mi"
    [/^(\d+) Autorizadas y tomada por mi$/, m => m[1]+' Authorized and taken by me'],
    // "Ver las 9 en proceso"
    [/^Ver las (\d+) en proceso$/, m => 'See the '+m[1]+' in progress'],
    // "Ver los 8 candidatos por validar"
    [/^Ver los (\d+) candidatos por validar$/, m => 'See the '+m[1]+' candidates to validate'],
    // "Ver los 4 pendientes de app"
    [/^Ver los (\d+) pendientes de app$/, m => 'See the '+m[1]+' pending app'],
    // "Ver los 14 movimientos"
    [/^Ver los (\d+) movimientos$/, m => 'See the '+m[1]+' movements'],
    // "Ver todas las urgentes" handled in DICT; "Ver las parciales"/"Ver las cubiertas" in DICT
    // "completadas hoy"/"asignados hoy" in DICT
    // "X requisiciones · ordenadas por urgencia"
    [/^(\d+) requisiciones · ordenadas por urgencia$/, m => m[1]+' requisitions · ordered by urgency'],
    // "· 2 reclutadores trabajándola"
    [/^· (\d+) reclutadores trabajándola$/, m => '· '+m[1]+' recruiters working on it'],
    // "+2 más"
    [/^\+(\d+) más$/, m => '+'+m[1]+' more'],
    // "Bienvenida/o a X"
    [/^Bienvenid[ao] a (.+)$/, m => 'Welcome to ' + m[1]],
    // "36 años" → "36 years"
    [/^(\d+) años$/, m => m[1]+' years'],
    // "1 año exp." / "3 años exp."
    [/^(\d+) años? exp\.$/, m => m[1]+(m[1]==='1'?' year':' years')+' exp.'],
    // "Inglés/Francés/... Intermedio/Avanzado/Básico/Conversacional"
    [/^(Inglés|Francés|Alemán|Italiano|Portugués) (Avanzado|Intermedio|Básico|Conversacional)$/, m => {
      const L={Inglés:'English',Francés:'French',Alemán:'German',Italiano:'Italian',Portugués:'Portuguese'};
      const N={Avanzado:'Advanced',Intermedio:'Intermediate','Básico':'Basic',Conversacional:'Conversational'};
      return L[m[1]]+' '+N[m[2]];
    }],
    // "8h/día" / "4h/día"
    [/^(\d+)h\/día$/, m => m[1]+'h/day'],
    // "Inasistencia 1 de 3"
    [/^Inasistencia (\d+) de (\d+)$/, m => 'No-show '+m[1]+' of '+m[2]],
    // "Ver todos (8)" / "Ver todas (8)"
    [/^Ver todos? \((\d+)\)$/, m => 'See all ('+m[1]+')'],
    // "8 asignados" / "1 asignado"
    [/^(\d+) asignados?$/, m => m[1]+(m[1]==='1'?' assigned':' assigned')],
    // "2 vacantes" / "1 vacante"
    [/^(\d+) vacantes?$/, m => m[1]+(m[1]==='1'?' vacancy':' vacancies')],
    // "9 sin cubrir"
    [/^(\d+) sin cubrir$/, m => m[1]+' uncovered'],
    // "6 vacantes con requisitos distintos"
    [/^(\d+) vacantes con requisitos distintos$/, m => m[1]+' vacancies with different requirements'],
    // "Ver las 9 en proceso"
    [/^Ver las (\d+) en proceso$/, m => 'See the '+m[1]+' in progress'],
    // "18 colaboradores en pool · 11 estados" (variant)
    [/^(\d+) colaboradores en pool · (\d+) estados$/, m => m[1]+' collaborators in pool · '+m[2]+' statuses'],
    // "29 requisiciones · tomadas por ti"
    [/^(\d+) requisiciones · tomadas por ti$/, m => m[1]+' requisitions · taken by you'],
    // "Requisiciones completadas en lo que va del mes: 29"
    [/^Requisiciones completadas en lo que va del mes: (\d+)$/, m => 'Requisitions completed so far this month: '+m[1]],
    [/^Colaboradores asignados en lo que va del mes: (\d+)$/, m => 'Collaborators assigned so far this month: '+m[1]],
    // "3 propiedades activas · CDMX" handled earlier
    // "22 de junio" handled; "10 de junio"
    // Day abbreviations: "Lun, Mar, Mié, Jue, Vie, Sáb" / "Lun–Dom" / "Lun – Dom"
    [/\b(Lun|Mar|Mié|Mie|Jue|Vie|Sáb|Sab|Dom)\b/, () => null], // placeholder, handled below by dayAbbrev
  ];

  // Día abreviado: traducir tokens dentro de strings de días
  const DAYS = {Lun:'Mon',Mar:'Tue','Mié':'Wed',Mie:'Wed',Jue:'Thu',Vie:'Fri','Sáb':'Sat',Sab:'Sat',Dom:'Sun'};
  // Inserta una regla real para listas de días (sobreescribe el placeholder)
  RULES[RULES.length-1] = [/^(?:Lun|Mar|Mié|Mie|Jue|Vie|Sáb|Sab|Dom)(?:\s*[–-]\s*|\s*,\s*)(?:Lun|Mar|Mié|Mie|Jue|Vie|Sáb|Sab|Dom).*$/,
    m => m[0].replace(/Lun|Mar|Mié|Mie|Jue|Vie|Sáb|Sab|Dom/g, d => DAYS[d] || d)];


  /* ---------- Traducción de un string (con split por separadores) ---------- */
  const SEP = ' · ';
  function translateString(raw){
    const trimmed = raw.trim();
    if(!trimmed) return null;
    const norm = trimmed.replace(/\s+/g, ' ');   // colapsa saltos de línea internos
    const lead = raw.match(/^\s*/)[0];
    const trail = raw.match(/\s*$/)[0];
    const out = translateCore(norm);
    if(out == null) return null;
    return lead + out + trail;
  }
  function translateCore(t){
    if(Object.prototype.hasOwnProperty.call(DICT, t)) return DICT[t];
    for(const [re, fn] of RULES){ const mm = re.exec(t); if(mm){ const r = fn(mm); if(r != null) return r; } }
    // split por " · " y traducir cada parte
    if(t.includes(SEP)){
      const parts = t.split(SEP);
      let any = false;
      const tr = parts.map(p => { const r = translateCore(p.trim()); if(r != null){ any = true; return r; } return p; });
      if(any) return tr.join(SEP);
    }
    return null;
  }

  /* ---------- Motor DOM ---------- */
  const ATTRS = ['placeholder','title','aria-label'];
  const SKIP_TAGS = {SCRIPT:1, STYLE:1, NOSCRIPT:1, TEXTAREA:1};
  const changedText = new Map();   // node -> original ES
  const changedAttr = [];          // {el, attr, original}
  let lang = 'es';
  let applying = false;
  let observer = null;

  function translateTextNode(node){
    if(changedText.has(node)) return;        // ya traducido
    const p = node.parentNode;
    if(!p || SKIP_TAGS[p.tagName]) return;
    if(p.classList && (p.classList.contains('mi') || p.classList.contains('mio') || p.classList.contains('material-icons'))) return;
    const v = node.nodeValue;
    if(!v || !/[A-Za-zÁÉÍÓÚáéíóúñ]/.test(v)) return;
    const en = translateString(v);
    if(en != null && en !== v){ changedText.set(node, v); node.nodeValue = en; }
  }

  function translateAttrs(el){
    if(!el.getAttribute) return;
    for(const a of ATTRS){
      if(!el.hasAttribute(a)) continue;
      const v = el.getAttribute(a);
      if(!v || !/[A-Za-zÁÉÍÓÚáéíóúñ]/.test(v)) continue;
      if(el.__i18nAttr && el.__i18nAttr[a] != null) continue;
      const en = translateString(v);
      if(en != null && en !== v){
        (el.__i18nAttr = el.__i18nAttr || {})[a] = v;
        changedAttr.push({el, attr:a, original:v});
        el.setAttribute(a, en);
      }
    }
  }

  function walkAndTranslate(root){
    if(root.nodeType === Node.TEXT_NODE){ translateTextNode(root); return; }
    if(root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;
    // attrs on root + descendants
    if(root.nodeType === Node.ELEMENT_NODE) translateAttrs(root);
    const els = root.querySelectorAll ? root.querySelectorAll('*') : [];
    els.forEach(translateAttrs);
    const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = []; let n;
    while(n = walk.nextNode()) nodes.push(n);
    nodes.forEach(translateTextNode);
  }

  function applyEN(root){
    applying = true;
    try{ walkAndTranslate(root || document.body); } finally { applying = false; }
  }

  function restoreES(){
    applying = true;
    try{
      changedText.forEach((orig, node) => { node.nodeValue = orig; });
      changedText.clear();
      changedAttr.forEach(({el, attr, original}) => { el.setAttribute(attr, original); if(el.__i18nAttr) delete el.__i18nAttr[attr]; });
      changedAttr.length = 0;
    } finally { applying = false; }
  }

  function startObserver(){
    if(observer) return;
    observer = new MutationObserver(muts => {
      if(applying || lang !== 'en') return;
      applying = true;
      try{
        for(const mu of muts){
          if(mu.type === 'childList'){
            mu.addedNodes.forEach(node => {
              if(node.nodeType === Node.TEXT_NODE) translateTextNode(node);
              else if(node.nodeType === Node.ELEMENT_NODE) walkAndTranslate(node);
            });
          } else if(mu.type === 'attributes'){
            translateAttrs(mu.target);
          }
        }
      } finally { applying = false; }
    });
    observer.observe(document.body, {childList:true, subtree:true, attributes:true, attributeFilter:ATTRS});
  }

  /* ---------- API pública ---------- */
  function setLang(next){
    next = (next === 'en') ? 'en' : 'es';
    if(next === lang){ syncUI(); return; }
    lang = next;
    try{ localStorage.setItem('oranjeLang', lang); }catch(e){}
    document.documentElement.setAttribute('lang', lang);
    if(lang === 'en'){ applyEN(document.body); startObserver(); }
    else { restoreES(); }
    syncUI();
    try{ window.dispatchEvent(new CustomEvent('oranjelangchange', {detail:{lang}})); }catch(e){}
  }
  function toggle(){ setLang(lang === 'en' ? 'es' : 'en'); }
  function get(){ return lang; }

  /* ---------- Sincroniza los controles de idioma de la UI ---------- */
  function syncUI(){
    document.querySelectorAll('[data-lang-seg]').forEach(seg => {
      seg.querySelectorAll('[data-lang-opt]').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang-opt') === lang);
        btn.setAttribute('aria-pressed', btn.getAttribute('data-lang-opt') === lang ? 'true' : 'false');
      });
    });
    // Texto del valor en Preferencias
    document.querySelectorAll('[data-lang-value]').forEach(el => {
      el.textContent = lang === 'en' ? 'English (US)' : 'Español (México)';
    });
  }

  window.OranjeI18n = {set:setLang, toggle, get, retranslate:()=>{ if(lang==='en') applyEN(document.body); }};

  /* ---------- Init ---------- */
  function init(){
    let saved = 'es';
    try{ saved = localStorage.getItem('oranjeLang') || 'es'; }catch(e){}
    // siempre arrancamos el observer para poder traducir lo que se renderice
    startObserver();
    if(saved === 'en'){ lang = 'es'; setLang('en'); }
    else { lang = 'es'; syncUI(); }
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
