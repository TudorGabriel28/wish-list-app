(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["AddWishlist"],{"245b":function(t,e,s){"use strict";s("ae70")},ae70:function(t,e,s){},d7b8:function(t,e,s){"use strict";s.r(e);var c=s("5c40"),a=s("830f"),i=Object(c["N"])("data-v-7f23fd1e");Object(c["B"])("data-v-7f23fd1e");var n={class:"mx-3"},r={class:"row pt-5 mt-5 offset-sm-1 offset-lg-2"},l=Object(c["j"])("h4",{class:"h4 pb-3"},"Pick a name for the wishlist:",-1),o={class:"col-9 col-sm-8 col-lg-6"};Object(c["z"])();var u=i((function(t,e,s,i,u,d){return Object(c["y"])(),Object(c["e"])("div",n,[Object(c["j"])("div",r,[l,Object(c["j"])("div",o,[Object(c["M"])(Object(c["j"])("input",{class:"input mt-0",type:"text",placeholder:"Wishlist name","onUpdate:modelValue":e[1]||(e[1]=function(t){return i.wishlistName=t})},null,512),[[a["d"],i.wishlistName]])]),Object(c["j"])("button",{class:"button col-3 col-sm-2",onClick:e[2]||(e[2]=function(){return i.addWishlist.apply(i,arguments)})},"Create")])])})),d=s("1da1"),f=(s("96cf"),s("00b3")),b=s("a1e9"),p=s("a9c7"),h={setup:function(){var t=Object(b["l"])(""),e=function(){var e=Object(d["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f["a"].addWishlist({title:t.value});case 3:p["a"].fire({icon:"success",title:"Wishlist added successfully"}),e.next=10;break;case 6:e.prev=6,e.t0=e["catch"](0),console.log(e.t0),p["a"].fire({icon:"error",title:"Failed to add wishlist"});case 10:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(){return e.apply(this,arguments)}}();return{addWishlist:e,wishlistName:t}}};s("245b");h.render=u,h.__scopeId="data-v-7f23fd1e";e["default"]=h}}]);
//# sourceMappingURL=AddWishlist.42f0dd19.js.map