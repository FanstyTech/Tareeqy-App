(this["webpackJsonp@minimal/minimal-kit-react"]=this["webpackJsonp@minimal/minimal-kit-react"]||[]).push([[141],{2662:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return q}));var i=a(17),r=a(1),n=a(32),s=a(8),c=a(1313),l=a(417),o=a(206),m=a(418),u=a(452),j=a(22),d=a(419),b=a(3),h=a(15),x=a.n(h),O=a(24),p=a(251),f=a(249),g=a(1208),v=a(1288),y=a(1319),S=a(1328),w=a(57),k=a(174),E=a(0);function P(e){var t=e.onSent,a=e.onGetEmail,i=Object(w.a)().resetPassword,r=Object(k.a)(),n=p.f().shape({email:p.h().email("Email must be a valid email address").required("Email is required")}),s=Object(f.d)({initialValues:{email:"demo@minimals.cc"},validationSchema:n,onSubmit:function(){var e=Object(O.a)(x.a.mark((function e(n,c){var l,o;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l=c.setErrors,o=c.setSubmitting,e.prev=1,e.next=4,i(n.email);case 4:r.current&&(t(),a(s.values.email),o(!1)),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(1),console.error(e.t0),r.current&&(l({afterSubmit:e.t0.message}),o(!1));case 11:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t,a){return e.apply(this,arguments)}}()}),c=s.errors,l=s.touched,o=s.isSubmitting,m=s.handleSubmit,u=s.getFieldProps;return Object(E.jsx)(f.b,{value:s,children:Object(E.jsx)(f.a,{autoComplete:"off",noValidate:!0,onSubmit:m,children:Object(E.jsxs)(g.a,{spacing:3,children:[c.afterSubmit&&Object(E.jsx)(v.a,{severity:"error",children:c.afterSubmit}),Object(E.jsx)(y.a,Object(b.a)(Object(b.a)({fullWidth:!0},u("email")),{},{type:"email",label:"Email address",error:Boolean(l.email&&c.email),helperText:l.email&&c.email})),Object(E.jsx)(S.a,{fullWidth:!0,size:"large",type:"submit",variant:"contained",loading:o,children:"Reset Password"})]})})})}var W=a(420),B=Object(s.a)(d.a)((function(e){return{display:"flex",minHeight:"100%",alignItems:"center",justifyContent:"center",padding:e.theme.spacing(12,0)}}));function q(){var e=Object(r.useState)(""),t=Object(i.a)(e,2),a=t[0],s=t[1],d=Object(r.useState)(!1),b=Object(i.a)(d,2),h=b[0],x=b[1];return Object(E.jsxs)(B,{title:"Reset Password | Minimal UI",children:[Object(E.jsx)(u.a,{}),Object(E.jsx)(c.a,{children:Object(E.jsx)(l.a,{sx:{maxWidth:480,mx:"auto"},children:h?Object(E.jsxs)(l.a,{sx:{textAlign:"center"},children:[Object(E.jsx)(W.m,{sx:{mb:5,mx:"auto",height:160}}),Object(E.jsx)(o.a,{variant:"h3",gutterBottom:!0,children:"Request sent successfully"}),Object(E.jsxs)(o.a,{children:["We have sent a confirmation email to \xa0",Object(E.jsx)("strong",{children:a}),Object(E.jsx)("br",{}),"Please check your email."]}),Object(E.jsx)(m.a,{size:"large",variant:"contained",component:n.b,to:j.a.login,sx:{mt:5},children:"Back"})]}):Object(E.jsxs)(E.Fragment,{children:[Object(E.jsx)(o.a,{variant:"h3",paragraph:!0,children:"Forgot your password?"}),Object(E.jsx)(o.a,{sx:{color:"text.secondary",mb:5},children:"Please enter the email address associated with your account and We will email you a link to reset your password."}),Object(E.jsx)(P,{onSent:function(){return x(!0)},onGetEmail:function(e){return s(e)}}),Object(E.jsx)(m.a,{fullWidth:!0,size:"large",component:n.b,to:j.a.login,sx:{mt:1},children:"Back"})]})})})]})}}}]);
//# sourceMappingURL=141.550b574a.chunk.js.map