(this["webpackJsonp@minimal/minimal-kit-react"]=this["webpackJsonp@minimal/minimal-kit-react"]||[]).push([[107],{1332:function(e,t,a){"use strict";a.d(t,"a",(function(){return u}));var n=a(3),r=a(38),c=a(25),i=a(417),o=a(206),l=a(1303),s=a(35),d=a(0),b=["links","action","heading","moreLink","sx"];function u(e){var t=e.links,a=e.action,u=e.heading,j=e.moreLink,f=void 0===j?[]:j,p=e.sx,h=Object(r.a)(e,b);return Object(d.jsxs)(i.a,{sx:Object(n.a)({mb:5},p),children:[Object(d.jsxs)(i.a,{sx:{display:"flex",alignItems:"center"},children:[Object(d.jsxs)(i.a,{sx:{flexGrow:1},children:[Object(d.jsx)(o.a,{variant:"h4",gutterBottom:!0,children:u}),Object(d.jsx)(s.b,Object(n.a)({links:t},h))]}),a&&Object(d.jsx)(i.a,{sx:{flexShrink:0},children:a})]}),Object(d.jsx)(i.a,{sx:{mt:2},children:Object(c.isString)(f)?Object(d.jsx)(l.a,{href:f,target:"_blank",variant:"body2",children:f}):f.map((function(e){return Object(d.jsx)(l.a,{noWrap:!0,href:e,variant:"body2",target:"_blank",sx:{display:"table"},children:e},e)}))})]})}},1668:function(e,t,a){"use strict";a.d(t,"a",(function(){return p}));var n=a(3),r=a(38),c=a(26),i=a(1375),o=a.n(i),l=a(417),s=a(1284),d=a(1290),b=a(0),u=["sx"],j=["colors"];function f(e){var t=e.sx,a=Object(r.a)(e,u);return Object(b.jsx)(l.a,Object(n.a)(Object(n.a)({sx:Object(n.a)({width:20,height:20,display:"flex",borderRadius:"50%",position:"relative",alignItems:"center",justifyContent:"center",bgcolor:"currentColor",transition:function(e){return e.transitions.create("all",{duration:e.transitions.duration.shortest})}},t)},a),{},{children:Object(b.jsx)(c.a,{icon:o.a})}))}function p(e){var t=e.colors,a=Object(r.a)(e,j);return Object(b.jsx)(s.a,Object(n.a)(Object(n.a)({row:!0},a),{},{children:t.map((function(e){var t="#FFFFFF"===e||"white"===e;return Object(b.jsx)(d.a,{value:e,color:"default",icon:Object(b.jsx)(f,{sx:Object(n.a)({},t&&{border:function(e){return"solid 1px ".concat(e.palette.divider)}})}),checkedIcon:Object(b.jsx)(f,{sx:Object(n.a)({transform:"scale(1.4)","&:before":{opacity:.48,width:"100%",content:"''",height:"100%",borderRadius:"50%",position:"absolute",boxShadow:"4px 4px 8px 0 currentColor"},"& svg":{width:12,height:12,color:"common.white"}},t&&{border:function(e){return"solid 1px ".concat(e.palette.divider)},boxShadow:function(e){return"4px 4px 8px 0 ".concat(e.palette.grey[50024])},"& svg":{width:12,height:12,color:"common.black"}})}),sx:{color:e,"&:hover":{opacity:.72}}},e)}))}))}},2659:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return ke}));var n=a(14),r=a.n(n),c=a(23),i=a(17),o=a(2541),l=a(2443),s=a(1937),d=a(2446),b=a(2539),u=a(2449),j=a(26),f=a(171),p=a(1350),h=a.n(p),x=a(1),v=a(52),O=a(1266),g=a(1314),y=a(418),m=a(1327),w=a(1626),k=a(331),C=a(449),D=a(22),S=a(84),F=a(419),A=a(207),I=a(1332),R=a(3),W=a(251),E=a(25),M=a(1376),T=a.n(M),V=a(249),z=a(1209),B=a(1320),G=a(1325),L=a(1378),q=a(1493),N=a(1319),P=a(1305),U=a(417),J=a(2450),_=a(1329),H=a(1668),K=a(0),Q=["#00AB55","#1890FF","#94D82D","#FFC107","#FF4842","#04297A","#7A0C2E"],X=function(e,t){var a={title:"",description:"",textColor:"#1890FF",allDay:!1,start:t?new Date(t.start):new Date,end:t?new Date(t.end):new Date};return e||t?Object(E.merge)({},a,e):a};function Y(e){var t=e.event,a=e.range,n=e.onCancel,i=Object(f.useSnackbar)().enqueueSnackbar,o=Object(k.c)(),l=!t,s=W.f().shape({title:W.h().max(255).required("Title is required"),description:W.h().max(5e3),end:W.c().when("start",(function(e,t){return e&&t.min(e,"End date must be later than start date")})),start:W.c()}),d=Object(V.d)({initialValues:X(t,a),validationSchema:s,onSubmit:function(){var e=Object(c.a)(r.a.mark((function e(a,c){var l,s,d;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:l=c.resetForm,s=c.setSubmitting;try{d={title:a.title,description:a.description,textColor:a.textColor,allDay:a.allDay,start:a.start,end:a.end},t?(o(Object(C.i)(t.id,d)),i("Update event success",{variant:"success"})):(o(Object(C.b)(d)),i("Create event success",{variant:"success"})),l(),n(),s(!1)}catch(r){console.error(r)}case 2:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()}),b=d.values,u=d.errors,p=d.touched,h=d.handleSubmit,x=d.isSubmitting,v=d.getFieldProps,O=d.setFieldValue,g=function(){var e=Object(c.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{n(),o(Object(C.d)(t.id)),i("Delete event success",{variant:"success"})}catch(a){console.error(a)}case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(K.jsx)(V.b,{value:d,children:Object(K.jsxs)(V.a,{autoComplete:"off",noValidate:!0,onSubmit:h,children:[Object(K.jsxs)(z.a,{spacing:3,sx:{p:3},children:[Object(K.jsx)(B.a,Object(R.a)(Object(R.a)({fullWidth:!0,label:"Title"},v("title")),{},{error:Boolean(p.title&&u.title),helperText:p.title&&u.title})),Object(K.jsx)(B.a,Object(R.a)(Object(R.a)({fullWidth:!0,multiline:!0,maxRows:4,label:"Description"},v("description")),{},{error:Boolean(p.description&&u.description),helperText:p.description&&u.description})),Object(K.jsx)(G.a,{control:Object(K.jsx)(L.a,Object(R.a)({checked:b.allDay},v("allDay"))),label:"All day"}),Object(K.jsx)(J.a,{label:"Start date",value:b.start,inputFormat:"dd/MM/yyyy hh:mm a",onChange:function(e){return O("start",e)},renderInput:function(e){return Object(K.jsx)(B.a,Object(R.a)(Object(R.a)({},e),{},{fullWidth:!0}))}}),Object(K.jsx)(J.a,{label:"End date",value:b.end,inputFormat:"dd/MM/yyyy hh:mm a",onChange:function(e){return O("end",e)},renderInput:function(e){return Object(K.jsx)(B.a,Object(R.a)(Object(R.a)({},e),{},{fullWidth:!0,error:Boolean(p.end&&u.end),helperText:p.end&&u.end,sx:{mb:3}}))}}),Object(K.jsx)(H.a,Object(R.a)(Object(R.a)({},v("textColor")),{},{colors:Q}))]}),Object(K.jsxs)(q.a,{children:[!l&&Object(K.jsx)(N.a,{title:"Delete Event",children:Object(K.jsx)(P.a,{onClick:g,children:Object(K.jsx)(j.a,{icon:T.a,width:20,height:20})})}),Object(K.jsx)(U.a,{sx:{flexGrow:1}}),Object(K.jsx)(y.a,{type:"button",variant:"outlined",color:"inherit",onClick:n,children:"Cancel"}),Object(K.jsx)(_.a,{type:"submit",variant:"contained",loading:x,loadingIndicator:"Loading...",children:"Add"})]})]})})}var Z=a(38),$=a(7),ee=a(2451),te=a.n(ee),ae=a(2452),ne=a.n(ae),re=a(2453),ce=a.n(re),ie=a(2454),oe=a.n(ie),le=a(333),se=a.n(le),de=a(144),be=a.n(de),ue=a(8),je=a(2542),fe=a(206),pe=a(248),he=a(35),xe=["date","view","onNextDate","onPrevDate","onToday","onChangeView"],ve=[{value:"dayGridMonth",label:"Month",icon:oe.a},{value:"timeGridWeek",label:"Week",icon:ne.a},{value:"timeGridDay",label:"Day",icon:te.a},{value:"listWeek",label:"Agenda",icon:ce.a}],Oe=Object(ue.a)("div")((function(e){var t=e.theme;return Object($.a)({display:"flex",alignItems:"center",flexDirection:"column",padding:t.spacing(3,0)},t.breakpoints.up("sm"),{flexDirection:"row",padding:t.spacing(1.75,3),justifyContent:"space-between"})}));function ge(e){var t=e.date,a=e.view,n=e.onNextDate,r=e.onPrevDate,c=e.onToday,i=e.onChangeView,o=Object(Z.a)(e,xe);return Object(K.jsxs)(Oe,Object(R.a)(Object(R.a)({},o),{},{children:[Object(K.jsx)(he.d,{width:"smDown",children:Object(K.jsx)(z.a,{direction:"row",spacing:1.5,children:ve.map((function(e){return Object(K.jsx)(N.a,{title:e.label,children:Object(K.jsx)(je.a,{value:a,selected:e.value===a,onChange:function(){return i(e.value)},sx:{width:32,height:32,padding:0},children:Object(K.jsx)(j.a,{icon:e.icon,width:20,height:20})})},e.value)}))})}),Object(K.jsx)(fe.a,{variant:"h5",sx:{my:{xs:1,sm:0}},children:Object(pe.a)(t)}),Object(K.jsxs)(U.a,{sx:{display:"flex",alignItems:"center"},children:[Object(K.jsx)(P.a,{onClick:r,children:Object(K.jsx)(j.a,{icon:se.a,width:18,height:18})}),Object(K.jsx)(y.a,{size:"small",color:"error",variant:"contained",onClick:c,sx:{mx:.5},children:"Today"}),Object(K.jsx)(P.a,{onClick:n,children:Object(K.jsx)(j.a,{icon:be.a,width:18,height:18})})]})]}))}var ye=a(64),me=Object(ue.a)("div")((function(e){var t=e.theme;return{width:"calc(100% + 2px)",marginLeft:-1,marginBottom:-1,"& .fc":{"--fc-list-event-dot-width":"8px","--fc-border-color":t.palette.divider,"--fc-event-border-color":t.palette.info.light,"--fc-now-indicator-color":t.palette.error.main,"--fc-today-bg-color":t.palette.action.selected,"--fc-page-bg-color":t.palette.background.default,"--fc-neutral-bg-color":t.palette.background.neutral,"--fc-list-event-hover-bg-color":t.palette.action.hover,"--fc-highlight-color":Object(ye.a)(t.palette.primary.main,.08)},"& .fc .fc-license-message":{display:"none"},"& .fc a":{color:t.palette.text.primary},"& .fc .fc-col-header ":{boxShadow:"inset 0 -1px 0 ".concat(t.palette.divider),"& th":{borderColor:"transparent"},"& .fc-col-header-cell-cushion":Object(R.a)(Object(R.a)({},t.typography.subtitle2),{},{padding:"13px 0"})},"& .fc .fc-event":{borderColor:"transparent",backgroundColor:"transparent"},"& .fc .fc-event .fc-event-main":{padding:"2px 4px",borderRadius:4,backgroundColor:t.palette.common.white,transition:t.transitions.create("filter"),"&:hover":{filter:"brightness(0.92)"},"&:before,&:after":{top:0,left:0,width:"100%",height:"100%",content:"''",borderRadius:4,position:"absolute",boxSizing:"border-box"},"&:before":{zIndex:8,opacity:.32,border:"solid 1px currentColor"},"&:after":{zIndex:7,opacity:.24,backgroundColor:"currentColor"}},"& .fc .fc-event .fc-event-main-frame":{fontSize:13,lineHeight:"20px",filter:"brightness(0.24)"},"& .fc .fc-daygrid-event .fc-event-title":{overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"},"& .fc .fc-event .fc-event-time":{padding:0,overflow:"unset",fontWeight:t.typography.fontWeightBold},"& .fc .fc-popover":{border:0,overflow:"hidden",boxShadow:t.customShadows.z20,borderRadius:t.shape.borderRadius,backgroundColor:t.palette.background.paper},"& .fc .fc-popover-header":Object(R.a)(Object(R.a)({},t.typography.subtitle2),{},{padding:t.spacing(1),backgroundColor:t.palette.grey[50012],borderBottom:"solid 1px ".concat(t.palette.divider)}),"& .fc .fc-popover-close":{opacity:.48,transition:t.transitions.create("opacity"),"&:hover":{opacity:1}},"& .fc .fc-more-popover .fc-popover-body":{padding:t.spacing(1.5)},"& .fc .fc-popover-body":{"& .fc-daygrid-event.fc-event-start, & .fc-daygrid-event.fc-event-end":{margin:"2px 0"}},"& .fc .fc-day-other .fc-daygrid-day-top":{opacity:1,"& .fc-daygrid-day-number":{color:t.palette.text.disabled}},"& .fc .fc-daygrid-day-number":Object(R.a)(Object(R.a)({},t.typography.body2),{},{padding:t.spacing(1,1,0)}),"& .fc .fc-daygrid-event":{marginTop:4},"& .fc .fc-daygrid-event.fc-event-start, & .fc .fc-daygrid-event.fc-event-end":{marginLeft:4,marginRight:4},"& .fc .fc-daygrid-more-link":Object(R.a)(Object(R.a)({},t.typography.caption),{},{color:t.palette.text.secondary}),"& .fc .fc-timegrid-axis-cushion":Object(R.a)(Object(R.a)({},t.typography.body2),{},{color:t.palette.text.secondary}),"& .fc .fc-timegrid-slot-label-cushion":Object(R.a)({},t.typography.body2),"& .fc-direction-ltr .fc-list-day-text, .fc-direction-rtl .fc-list-day-side-text, .fc-direction-ltr .fc-list-day-side-text, .fc-direction-rtl .fc-list-day-text":Object(R.a)({},t.typography.subtitle2),"& .fc .fc-list-event":Object(R.a)(Object(R.a)({},t.typography.body2),{},{"& .fc-list-event-time":{color:t.palette.text.secondary}}),"& .fc .fc-list-table":{"& th, td":{borderColor:"transparent"}}}})),we=function(e){var t=e.calendar,a=t.events,n=t.selectedEventId;return n?a.find((function(e){return e.id===n})):null};function ke(){var e=Object(S.a)().themeStretch,t=Object(k.c)(),a=Object(v.a)(),n=Object(O.a)(a.breakpoints.down("sm")),p=Object(x.useRef)(null),R=Object(f.useSnackbar)().enqueueSnackbar,W=Object(x.useState)(new Date),E=Object(i.a)(W,2),M=E[0],T=E[1],V=Object(x.useState)(n?"listWeek":"dayGridMonth"),z=Object(i.a)(V,2),B=z[0],G=z[1],L=Object(k.d)(we),q=Object(k.d)((function(e){return e.calendar})),N=q.events,P=q.isOpenModal,U=q.selectedRange;Object(x.useEffect)((function(){t(Object(C.e)())}),[t]),Object(x.useEffect)((function(){var e=p.current;if(e){var t=e.getApi(),a=n?"listWeek":"dayGridMonth";t.changeView(a),G(a)}}),[n]);var J=function(){var e=Object(c.a)(r.a.mark((function e(a){var n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=a.event;try{t(Object(C.i)(n.id,{allDay:n.allDay,start:n.start,end:n.end})),R("Update event success",{variant:"success"})}catch(r){console.error(r)}case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),_=function(){var e=Object(c.a)(r.a.mark((function e(a){var n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=a.event;try{t(Object(C.i)(n.id,{allDay:n.allDay,start:n.start,end:n.end})),R("Update event success",{variant:"success"})}catch(r){console.error(r)}case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),H=function(){t(Object(C.a)())};return Object(K.jsx)(F.a,{title:"Calendar | Minimal-UI",children:Object(K.jsxs)(g.a,{maxWidth:!e&&"xl",children:[Object(K.jsx)(I.a,{heading:"Calendar",links:[{name:"Dashboard",href:D.b.root},{name:"Calendar"}],moreLink:"https://fullcalendar.io/docs/react",action:Object(K.jsx)(y.a,{variant:"contained",startIcon:Object(K.jsx)(j.a,{icon:h.a,width:20,height:20}),onClick:function(){t(Object(C.f)())},children:"New Event"})}),Object(K.jsx)(m.a,{children:Object(K.jsxs)(me,{children:[Object(K.jsx)(ge,{date:M,view:B,onNextDate:function(){var e=p.current;if(e){var t=e.getApi();t.next(),T(t.getDate())}},onPrevDate:function(){var e=p.current;if(e){var t=e.getApi();t.prev(),T(t.getDate())}},onToday:function(){var e=p.current;if(e){var t=e.getApi();t.today(),T(t.getDate())}},onChangeView:function(e){var t=p.current;t&&(t.getApi().changeView(e),G(e))}}),Object(K.jsx)(o.a,{weekends:!0,editable:!0,droppable:!0,selectable:!0,events:N,ref:p,rerenderDelay:10,initialDate:M,initialView:B,dayMaxEventRows:3,eventDisplay:"block",headerToolbar:!1,allDayMaintainDuration:!0,eventResizableFromStart:!0,select:function(e){var a=p.current;a&&a.getApi().unselect();t(Object(C.h)(e.start,e.end))},eventDrop:_,eventClick:function(e){t(Object(C.g)(e.event.id))},eventResize:J,height:n?"auto":720,plugins:[l.a,s.b,b.a,d.a,u.a]})]})}),Object(K.jsxs)(A.b,{open:P,onClose:H,children:[Object(K.jsx)(w.a,{children:L?"Edit Event":"Add Event"}),Object(K.jsx)(Y,{event:L,range:U,onCancel:H})]})]})})}}}]);
//# sourceMappingURL=107.d3bf874d.chunk.js.map