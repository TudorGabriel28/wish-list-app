(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["AccountActivation"],{"3afb":function(e,t,n){},ac7c:function(e,t,n){"use strict";n("3afb")},ba96:function(e,t,n){"use strict";n.r(t);var r=n("5c40"),c=Object(r["N"])("data-v-4e96704c"),a=c((function(e,t,n,r,c,a){return null})),u=n("1da1"),i=(n("96cf"),n("6c02")),o=n("c6d8"),s=n("a9c7"),p={setup:function(){var e=Object(i["d"])(),t=Object(i["c"])();Object(r["v"])(Object(u["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,o["a"].activateAccount(t.params.token);case 3:s["a"].fire({icon:"success",title:"Your account has been activated successfully"}),e.push({name:"Login"}),n.next=11;break;case 7:n.prev=7,n.t0=n["catch"](0),s["a"].fire({icon:"error",title:"Link has expired"}),e.push({name:"Login"});case 11:case"end":return n.stop()}}),n,null,[[0,7]])}))))}};n("ac7c");p.render=a,p.__scopeId="data-v-4e96704c";t["default"]=p},c6d8:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n("1da1"),c=n("d4ec"),a=n("bee2"),u=(n("96cf"),n("9841")),i=function(){function e(){Object(c["a"])(this,e)}return Object(a["a"])(e,[{key:"authenticate",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u["a"].post("/account/authenticate",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"registerAccount",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u["a"].post("/account/",t);case 2:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getAllAccounts",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u["a"].get("/account/");case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()},{key:"getAccount",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u["a"].get("/account/".concat(t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"editAccount",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u["a"].put("/account/",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"deleteAccount",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u["a"].delete("/account/");case 2:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()},{key:"activateAccount",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u["a"].get("/account/verify-email/".concat(t));case 2:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()}]),e}(),o=new i}}]);
//# sourceMappingURL=AccountActivation.b1e49dc7.js.map