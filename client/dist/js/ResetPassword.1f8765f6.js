(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["ResetPassword"],{"0813":function(e,t,r){"use strict";r.r(t);var s=r("5c40"),a=r("830f"),n=r("6690"),o={class:"row align-items-center"},c={class:"col-10 offset-1 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-xl-4 offset-xl-4"},i={class:"center-container mx-lg-5 mx-xl-0"},u=Object(s["j"])("h4",{class:"h4 title","data-test-id":"title"},"Choose your new password",-1),d={class:"red","data-test-id":"reset-password-password-error"},p={class:"red","data-test-id":"reset-password-confirm-password-error"},w=Object(s["j"])("button",{class:"button mt-5",type:"submit"},"Update Password",-1);function l(e,t,r,l,f,b){return Object(s["y"])(),Object(s["e"])("div",o,[Object(s["j"])("div",c,[Object(s["j"])("div",i,[u,Object(s["j"])("form",{onSubmit:t[3]||(t[3]=Object(a["e"])((function(){return l.updatePassword.apply(l,arguments)}),["prevent"]))},[Object(s["M"])(Object(s["j"])("input",{class:"input",type:"password",placeholder:"New password","onUpdate:modelValue":t[1]||(t[1]=function(e){return l.password=e}),"data-test-id":"reset-password-password-input"},null,512),[[a["d"],l.password]]),Object(s["j"])("div",d,Object(n["C"])(l.passwordError),1),Object(s["M"])(Object(s["j"])("input",{class:"input input-mt",type:"password",placeholder:"Confirm password","onUpdate:modelValue":t[2]||(t[2]=function(e){return l.passwordConfirmation=e}),"data-test-id":"reset-password-confirm-password-input"},null,512),[[a["d"],l.passwordConfirmation]]),Object(s["j"])("div",p,Object(n["C"])(l.passwordConfirmationError),1),w],32)])])])}var f=r("1da1"),b=(r("96cf"),r("6c02")),m=r("7bb1"),j=r("5f37"),O=r("1c7ea"),v=r("a9c7"),h={setup:function(){var e=Object(b["d"])(),t=Object(b["c"])(),r=Object(m["b"])(),s=r.handleSubmit,a=Object(m["a"])("password",j["c"]),n=a.errorMessage,o=a.value,c=Object(m["a"])("passwordConfirmation",(function(e){return e===o.value||"Passwords are not the same."})),i=c.errorMessage,u=c.value,d=s(function(){var r=Object(f["a"])(regeneratorRuntime.mark((function r(s){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,O["a"].validateResetPasswordToken(t.params.token,s);case 3:v["a"].fire({icon:"success",title:"Password changed successfully. You can now login"}),e.push({name:"Login"}),r.next=11;break;case 7:r.prev=7,r.t0=r["catch"](0),v["a"].fire({icon:"error",title:"Link has expired"}),e.push({name:"Login"});case 11:case"end":return r.stop()}}),r,null,[[0,7]])})));return function(e){return r.apply(this,arguments)}}());return{password:o,passwordError:n,passwordConfirmation:u,passwordConfirmationError:i,updatePassword:d}}};h.render=l;t["default"]=h},"1c7ea":function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));var s=r("1da1"),a=r("d4ec"),n=r("bee2"),o=(r("96cf"),r("9841")),c=function(){function e(){Object(a["a"])(this,e)}return Object(n["a"])(e,[{key:"createResetPasswordToken",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o["a"].post("/reset-password/",t);case 2:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"validateResetPasswordToken",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t,r){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o["a"].put("/reset-password/".concat(t),r);case 2:case"end":return e.stop()}}),e)})));function t(t,r){return e.apply(this,arguments)}return t}()}]),e}(),i=new c}}]);
//# sourceMappingURL=ResetPassword.1f8765f6.js.map