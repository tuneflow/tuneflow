var Gi = "1.13.6", gi = typeof self == "object" && self.self === self && self || typeof global == "object" && global.global === global && global || Function("return this")() || {}, sn = Array.prototype, er = Object.prototype, di = typeof Symbol < "u" ? Symbol.prototype : null, Go = sn.push, Ce = sn.slice, ve = er.toString, Wo = er.hasOwnProperty, Wi = typeof ArrayBuffer < "u", zo = typeof DataView < "u", Ko = Array.isArray, pi = Object.keys, mi = Object.create, vi = Wi && ArrayBuffer.isView, qo = isNaN, Xo = isFinite, zi = !{ toString: null }.propertyIsEnumerable("toString"), ki = [
  "valueOf",
  "isPrototypeOf",
  "toString",
  "propertyIsEnumerable",
  "hasOwnProperty",
  "toLocaleString"
], Jo = Math.pow(2, 53) - 1;
function j(t, e) {
  return e = e == null ? t.length - 1 : +e, function() {
    for (var n = Math.max(arguments.length - e, 0), r = Array(n), i = 0; i < n; i++)
      r[i] = arguments[i + e];
    switch (e) {
      case 0:
        return t.call(this, r);
      case 1:
        return t.call(this, arguments[0], r);
      case 2:
        return t.call(this, arguments[0], arguments[1], r);
    }
    var s = Array(e + 1);
    for (i = 0; i < e; i++)
      s[i] = arguments[i];
    return s[e] = r, t.apply(this, s);
  };
}
function Mt(t) {
  var e = typeof t;
  return e === "function" || e === "object" && !!t;
}
function jo(t) {
  return t === null;
}
function Ki(t) {
  return t === void 0;
}
function qi(t) {
  return t === !0 || t === !1 || ve.call(t) === "[object Boolean]";
}
function Qo(t) {
  return !!(t && t.nodeType === 1);
}
function L(t) {
  var e = "[object " + t + "]";
  return function(n) {
    return ve.call(n) === e;
  };
}
const nr = L("String"), rr = L("Number"), Yo = L("Date"), Zo = L("RegExp"), tc = L("Error"), Xi = L("Symbol"), Ji = L("ArrayBuffer");
var ji = L("Function"), ec = gi.document && gi.document.childNodes;
typeof /./ != "function" && typeof Int8Array != "object" && typeof ec != "function" && (ji = function(t) {
  return typeof t == "function" || !1;
});
const G = ji, Qi = L("Object");
var Yi = zo && Qi(new DataView(new ArrayBuffer(8))), ir = typeof Map < "u" && Qi(/* @__PURE__ */ new Map()), nc = L("DataView");
function rc(t) {
  return t != null && G(t.getInt8) && Ji(t.buffer);
}
const ze = Yi ? rc : nc, Gt = Ko || L("Array");
function Pt(t, e) {
  return t != null && Wo.call(t, e);
}
var Vn = L("Arguments");
(function() {
  Vn(arguments) || (Vn = function(t) {
    return Pt(t, "callee");
  });
})();
const sr = Vn;
function ic(t) {
  return !Xi(t) && Xo(t) && !isNaN(parseFloat(t));
}
function Zi(t) {
  return rr(t) && qo(t);
}
function ts(t) {
  return function() {
    return t;
  };
}
function es(t) {
  return function(e) {
    var n = t(e);
    return typeof n == "number" && n >= 0 && n <= Jo;
  };
}
function ns(t) {
  return function(e) {
    return e == null ? void 0 : e[t];
  };
}
const Ke = ns("byteLength"), sc = es(Ke);
var ac = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
function oc(t) {
  return vi ? vi(t) && !ze(t) : sc(t) && ac.test(ve.call(t));
}
const rs = Wi ? oc : ts(!1), Q = ns("length");
function cc(t) {
  for (var e = {}, n = t.length, r = 0; r < n; ++r)
    e[t[r]] = !0;
  return {
    contains: function(i) {
      return e[i] === !0;
    },
    push: function(i) {
      return e[i] = !0, t.push(i);
    }
  };
}
function is(t, e) {
  e = cc(e);
  var n = ki.length, r = t.constructor, i = G(r) && r.prototype || er, s = "constructor";
  for (Pt(t, s) && !e.contains(s) && e.push(s); n--; )
    s = ki[n], s in t && t[s] !== i[s] && !e.contains(s) && e.push(s);
}
function F(t) {
  if (!Mt(t))
    return [];
  if (pi)
    return pi(t);
  var e = [];
  for (var n in t)
    Pt(t, n) && e.push(n);
  return zi && is(t, e), e;
}
function uc(t) {
  if (t == null)
    return !0;
  var e = Q(t);
  return typeof e == "number" && (Gt(t) || nr(t) || sr(t)) ? e === 0 : Q(F(t)) === 0;
}
function ss(t, e) {
  var n = F(e), r = n.length;
  if (t == null)
    return !r;
  for (var i = Object(t), s = 0; s < r; s++) {
    var a = n[s];
    if (e[a] !== i[a] || !(a in i))
      return !1;
  }
  return !0;
}
function T(t) {
  if (t instanceof T)
    return t;
  if (!(this instanceof T))
    return new T(t);
  this._wrapped = t;
}
T.VERSION = Gi;
T.prototype.value = function() {
  return this._wrapped;
};
T.prototype.valueOf = T.prototype.toJSON = T.prototype.value;
T.prototype.toString = function() {
  return String(this._wrapped);
};
function Si(t) {
  return new Uint8Array(
    t.buffer || t,
    t.byteOffset || 0,
    Ke(t)
  );
}
var wi = "[object DataView]";
function Ln(t, e, n, r) {
  if (t === e)
    return t !== 0 || 1 / t === 1 / e;
  if (t == null || e == null)
    return !1;
  if (t !== t)
    return e !== e;
  var i = typeof t;
  return i !== "function" && i !== "object" && typeof e != "object" ? !1 : as(t, e, n, r);
}
function as(t, e, n, r) {
  t instanceof T && (t = t._wrapped), e instanceof T && (e = e._wrapped);
  var i = ve.call(t);
  if (i !== ve.call(e))
    return !1;
  if (Yi && i == "[object Object]" && ze(t)) {
    if (!ze(e))
      return !1;
    i = wi;
  }
  switch (i) {
    case "[object RegExp]":
    case "[object String]":
      return "" + t == "" + e;
    case "[object Number]":
      return +t != +t ? +e != +e : +t == 0 ? 1 / +t === 1 / e : +t == +e;
    case "[object Date]":
    case "[object Boolean]":
      return +t == +e;
    case "[object Symbol]":
      return di.valueOf.call(t) === di.valueOf.call(e);
    case "[object ArrayBuffer]":
    case wi:
      return as(Si(t), Si(e), n, r);
  }
  var s = i === "[object Array]";
  if (!s && rs(t)) {
    var a = Ke(t);
    if (a !== Ke(e))
      return !1;
    if (t.buffer === e.buffer && t.byteOffset === e.byteOffset)
      return !0;
    s = !0;
  }
  if (!s) {
    if (typeof t != "object" || typeof e != "object")
      return !1;
    var o = t.constructor, u = e.constructor;
    if (o !== u && !(G(o) && o instanceof o && G(u) && u instanceof u) && "constructor" in t && "constructor" in e)
      return !1;
  }
  n = n || [], r = r || [];
  for (var l = n.length; l--; )
    if (n[l] === t)
      return r[l] === e;
  if (n.push(t), r.push(e), s) {
    if (l = t.length, l !== e.length)
      return !1;
    for (; l--; )
      if (!Ln(t[l], e[l], n, r))
        return !1;
  } else {
    var d = F(t), f;
    if (l = d.length, F(e).length !== l)
      return !1;
    for (; l--; )
      if (f = d[l], !(Pt(e, f) && Ln(t[f], e[f], n, r)))
        return !1;
  }
  return n.pop(), r.pop(), !0;
}
function lc(t, e) {
  return Ln(t, e);
}
function Ie(t) {
  if (!Mt(t))
    return [];
  var e = [];
  for (var n in t)
    e.push(n);
  return zi && is(t, e), e;
}
function ar(t) {
  var e = Q(t);
  return function(n) {
    if (n == null)
      return !1;
    var r = Ie(n);
    if (Q(r))
      return !1;
    for (var i = 0; i < e; i++)
      if (!G(n[t[i]]))
        return !1;
    return t !== us || !G(n[or]);
  };
}
var or = "forEach", os = "has", cr = ["clear", "delete"], cs = ["get", os, "set"], fc = cr.concat(or, cs), us = cr.concat(cs), hc = ["add"].concat(cr, or, os);
const gc = ir ? ar(fc) : L("Map"), dc = ir ? ar(us) : L("WeakMap"), pc = ir ? ar(hc) : L("Set"), mc = L("WeakSet");
function ae(t) {
  for (var e = F(t), n = e.length, r = Array(n), i = 0; i < n; i++)
    r[i] = t[e[i]];
  return r;
}
function vc(t) {
  for (var e = F(t), n = e.length, r = Array(n), i = 0; i < n; i++)
    r[i] = [e[i], t[e[i]]];
  return r;
}
function ls(t) {
  for (var e = {}, n = F(t), r = 0, i = n.length; r < i; r++)
    e[t[n[r]]] = n[r];
  return e;
}
function Hn(t) {
  var e = [];
  for (var n in t)
    G(t[n]) && e.push(n);
  return e.sort();
}
function ur(t, e) {
  return function(n) {
    var r = arguments.length;
    if (e && (n = Object(n)), r < 2 || n == null)
      return n;
    for (var i = 1; i < r; i++)
      for (var s = arguments[i], a = t(s), o = a.length, u = 0; u < o; u++) {
        var l = a[u];
        (!e || n[l] === void 0) && (n[l] = s[l]);
      }
    return n;
  };
}
const fs = ur(Ie), qe = ur(F), hs = ur(Ie, !0);
function kc() {
  return function() {
  };
}
function gs(t) {
  if (!Mt(t))
    return {};
  if (mi)
    return mi(t);
  var e = kc();
  e.prototype = t;
  var n = new e();
  return e.prototype = null, n;
}
function Sc(t, e) {
  var n = gs(t);
  return e && qe(n, e), n;
}
function wc(t) {
  return Mt(t) ? Gt(t) ? t.slice() : fs({}, t) : t;
}
function bc(t, e) {
  return e(t), t;
}
function ds(t) {
  return Gt(t) ? t : [t];
}
T.toPath = ds;
function Te(t) {
  return T.toPath(t);
}
function lr(t, e) {
  for (var n = e.length, r = 0; r < n; r++) {
    if (t == null)
      return;
    t = t[e[r]];
  }
  return n ? t : void 0;
}
function ps(t, e, n) {
  var r = lr(t, Te(e));
  return Ki(r) ? n : r;
}
function Cc(t, e) {
  e = Te(e);
  for (var n = e.length, r = 0; r < n; r++) {
    var i = e[r];
    if (!Pt(t, i))
      return !1;
    t = t[i];
  }
  return !!n;
}
function fr(t) {
  return t;
}
function ke(t) {
  return t = qe({}, t), function(e) {
    return ss(e, t);
  };
}
function hr(t) {
  return t = Te(t), function(e) {
    return lr(e, t);
  };
}
function Ee(t, e, n) {
  if (e === void 0)
    return t;
  switch (n ?? 3) {
    case 1:
      return function(r) {
        return t.call(e, r);
      };
    case 3:
      return function(r, i, s) {
        return t.call(e, r, i, s);
      };
    case 4:
      return function(r, i, s, a) {
        return t.call(e, r, i, s, a);
      };
  }
  return function() {
    return t.apply(e, arguments);
  };
}
function ms(t, e, n) {
  return t == null ? fr : G(t) ? Ee(t, e, n) : Mt(t) && !Gt(t) ? ke(t) : hr(t);
}
function gr(t, e) {
  return ms(t, e, 1 / 0);
}
T.iteratee = gr;
function Y(t, e, n) {
  return T.iteratee !== gr ? T.iteratee(t, e) : ms(t, e, n);
}
function Ic(t, e, n) {
  e = Y(e, n);
  for (var r = F(t), i = r.length, s = {}, a = 0; a < i; a++) {
    var o = r[a];
    s[o] = e(t[o], o, t);
  }
  return s;
}
function vs() {
}
function Tc(t) {
  return t == null ? vs : function(e) {
    return ps(t, e);
  };
}
function Ec(t, e, n) {
  var r = Array(Math.max(0, t));
  e = Ee(e, n, 1);
  for (var i = 0; i < t; i++)
    r[i] = e(i);
  return r;
}
function $n(t, e) {
  return e == null && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1));
}
const Se = Date.now || function() {
  return new Date().getTime();
};
function ks(t) {
  var e = function(s) {
    return t[s];
  }, n = "(?:" + F(t).join("|") + ")", r = RegExp(n), i = RegExp(n, "g");
  return function(s) {
    return s = s == null ? "" : "" + s, r.test(s) ? s.replace(i, e) : s;
  };
}
const Ss = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
}, _c = ks(Ss), Pc = ls(Ss), Ac = ks(Pc), xc = T.templateSettings = {
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  escape: /<%-([\s\S]+?)%>/g
};
var An = /(.)^/, Nc = {
  "'": "'",
  "\\": "\\",
  "\r": "r",
  "\n": "n",
  "\u2028": "u2028",
  "\u2029": "u2029"
}, Oc = /\\|'|\r|\n|\u2028|\u2029/g;
function yc(t) {
  return "\\" + Nc[t];
}
var Rc = /^\s*(\w|\$)+\s*$/;
function Fc(t, e, n) {
  !e && n && (e = n), e = hs({}, e, T.templateSettings);
  var r = RegExp([
    (e.escape || An).source,
    (e.interpolate || An).source,
    (e.evaluate || An).source
  ].join("|") + "|$", "g"), i = 0, s = "__p+='";
  t.replace(r, function(l, d, f, h, m) {
    return s += t.slice(i, m).replace(Oc, yc), i = m + l.length, d ? s += `'+
((__t=(` + d + `))==null?'':_.escape(__t))+
'` : f ? s += `'+
((__t=(` + f + `))==null?'':__t)+
'` : h && (s += `';
` + h + `
__p+='`), l;
  }), s += `';
`;
  var a = e.variable;
  if (a) {
    if (!Rc.test(a))
      throw new Error(
        "variable is not a bare identifier: " + a
      );
  } else
    s = `with(obj||{}){
` + s + `}
`, a = "obj";
  s = `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
` + s + `return __p;
`;
  var o;
  try {
    o = new Function(a, "_", s);
  } catch (l) {
    throw l.source = s, l;
  }
  var u = function(l) {
    return o.call(this, l, T);
  };
  return u.source = "function(" + a + `){
` + s + "}", u;
}
function Uc(t, e, n) {
  e = Te(e);
  var r = e.length;
  if (!r)
    return G(n) ? n.call(t) : n;
  for (var i = 0; i < r; i++) {
    var s = t == null ? void 0 : t[e[i]];
    s === void 0 && (s = n, i = r), t = G(s) ? s.call(t) : s;
  }
  return t;
}
var Bc = 0;
function Vc(t) {
  var e = ++Bc + "";
  return t ? t + e : e;
}
function Lc(t) {
  var e = T(t);
  return e._chain = !0, e;
}
function ws(t, e, n, r, i) {
  if (!(r instanceof e))
    return t.apply(n, i);
  var s = gs(t.prototype), a = t.apply(s, i);
  return Mt(a) ? a : s;
}
var oe = j(function(t, e) {
  var n = oe.placeholder, r = function() {
    for (var i = 0, s = e.length, a = Array(s), o = 0; o < s; o++)
      a[o] = e[o] === n ? arguments[i++] : e[o];
    for (; i < arguments.length; )
      a.push(arguments[i++]);
    return ws(t, r, this, this, a);
  };
  return r;
});
oe.placeholder = T;
const bs = j(function(t, e, n) {
  if (!G(t))
    throw new TypeError("Bind must be called on a function");
  var r = j(function(i) {
    return ws(t, r, e, this, n.concat(i));
  });
  return r;
}), tt = es(Q);
function Wt(t, e, n, r) {
  if (r = r || [], !e && e !== 0)
    e = 1 / 0;
  else if (e <= 0)
    return r.concat(t);
  for (var i = r.length, s = 0, a = Q(t); s < a; s++) {
    var o = t[s];
    if (tt(o) && (Gt(o) || sr(o)))
      if (e > 1)
        Wt(o, e - 1, n, r), i = r.length;
      else
        for (var u = 0, l = o.length; u < l; )
          r[i++] = o[u++];
    else
      n || (r[i++] = o);
  }
  return r;
}
const Hc = j(function(t, e) {
  e = Wt(e, !1, !1);
  var n = e.length;
  if (n < 1)
    throw new Error("bindAll must be passed function names");
  for (; n--; ) {
    var r = e[n];
    t[r] = bs(t[r], t);
  }
  return t;
});
function $c(t, e) {
  var n = function(r) {
    var i = n.cache, s = "" + (e ? e.apply(this, arguments) : r);
    return Pt(i, s) || (i[s] = t.apply(this, arguments)), i[s];
  };
  return n.cache = {}, n;
}
const Cs = j(function(t, e, n) {
  return setTimeout(function() {
    return t.apply(null, n);
  }, e);
}), Dc = oe(Cs, T, 1);
function Mc(t, e, n) {
  var r, i, s, a, o = 0;
  n || (n = {});
  var u = function() {
    o = n.leading === !1 ? 0 : Se(), r = null, a = t.apply(i, s), r || (i = s = null);
  }, l = function() {
    var d = Se();
    !o && n.leading === !1 && (o = d);
    var f = e - (d - o);
    return i = this, s = arguments, f <= 0 || f > e ? (r && (clearTimeout(r), r = null), o = d, a = t.apply(i, s), r || (i = s = null)) : !r && n.trailing !== !1 && (r = setTimeout(u, f)), a;
  };
  return l.cancel = function() {
    clearTimeout(r), o = 0, r = i = s = null;
  }, l;
}
function Gc(t, e, n) {
  var r, i, s, a, o, u = function() {
    var d = Se() - i;
    e > d ? r = setTimeout(u, e - d) : (r = null, n || (a = t.apply(o, s)), r || (s = o = null));
  }, l = j(function(d) {
    return o = this, s = d, i = Se(), r || (r = setTimeout(u, e), n && (a = t.apply(o, s))), a;
  });
  return l.cancel = function() {
    clearTimeout(r), r = s = o = null;
  }, l;
}
function Wc(t, e) {
  return oe(e, t);
}
function dr(t) {
  return function() {
    return !t.apply(this, arguments);
  };
}
function zc() {
  var t = arguments, e = t.length - 1;
  return function() {
    for (var n = e, r = t[e].apply(this, arguments); n--; )
      r = t[n].call(this, r);
    return r;
  };
}
function Kc(t, e) {
  return function() {
    if (--t < 1)
      return e.apply(this, arguments);
  };
}
function Is(t, e) {
  var n;
  return function() {
    return --t > 0 && (n = e.apply(this, arguments)), t <= 1 && (e = null), n;
  };
}
const qc = oe(Is, 2);
function Ts(t, e, n) {
  e = Y(e, n);
  for (var r = F(t), i, s = 0, a = r.length; s < a; s++)
    if (i = r[s], e(t[i], i, t))
      return i;
}
function Es(t) {
  return function(e, n, r) {
    n = Y(n, r);
    for (var i = Q(e), s = t > 0 ? 0 : i - 1; s >= 0 && s < i; s += t)
      if (n(e[s], s, e))
        return s;
    return -1;
  };
}
const ie = Es(1), _s = Es(-1);
function Ps(t, e, n, r) {
  n = Y(n, r, 1);
  for (var i = n(e), s = 0, a = Q(t); s < a; ) {
    var o = Math.floor((s + a) / 2);
    n(t[o]) < i ? s = o + 1 : a = o;
  }
  return s;
}
function As(t, e, n) {
  return function(r, i, s) {
    var a = 0, o = Q(r);
    if (typeof s == "number")
      t > 0 ? a = s >= 0 ? s : Math.max(s + o, a) : o = s >= 0 ? Math.min(s + 1, o) : s + o + 1;
    else if (n && s && o)
      return s = n(r, i), r[s] === i ? s : -1;
    if (i !== i)
      return s = e(Ce.call(r, a, o), Zi), s >= 0 ? s + a : -1;
    for (s = t > 0 ? a : o - 1; s >= 0 && s < o; s += t)
      if (r[s] === i)
        return s;
    return -1;
  };
}
const xs = As(1, ie, Ps), Xc = As(-1, _s);
function Xe(t, e, n) {
  var r = tt(t) ? ie : Ts, i = r(t, e, n);
  if (i !== void 0 && i !== -1)
    return t[i];
}
function Jc(t, e) {
  return Xe(t, ke(e));
}
function pt(t, e, n) {
  e = Ee(e, n);
  var r, i;
  if (tt(t))
    for (r = 0, i = t.length; r < i; r++)
      e(t[r], r, t);
  else {
    var s = F(t);
    for (r = 0, i = s.length; r < i; r++)
      e(t[s[r]], s[r], t);
  }
  return t;
}
function Ht(t, e, n) {
  e = Y(e, n);
  for (var r = !tt(t) && F(t), i = (r || t).length, s = Array(i), a = 0; a < i; a++) {
    var o = r ? r[a] : a;
    s[a] = e(t[o], o, t);
  }
  return s;
}
function Ns(t) {
  var e = function(n, r, i, s) {
    var a = !tt(n) && F(n), o = (a || n).length, u = t > 0 ? 0 : o - 1;
    for (s || (i = n[a ? a[u] : u], u += t); u >= 0 && u < o; u += t) {
      var l = a ? a[u] : u;
      i = r(i, n[l], l, n);
    }
    return i;
  };
  return function(n, r, i, s) {
    var a = arguments.length >= 3;
    return e(n, Ee(r, s, 4), i, a);
  };
}
const xn = Ns(1), bi = Ns(-1);
function se(t, e, n) {
  var r = [];
  return e = Y(e, n), pt(t, function(i, s, a) {
    e(i, s, a) && r.push(i);
  }), r;
}
function jc(t, e, n) {
  return se(t, dr(Y(e)), n);
}
function Ci(t, e, n) {
  e = Y(e, n);
  for (var r = !tt(t) && F(t), i = (r || t).length, s = 0; s < i; s++) {
    var a = r ? r[s] : s;
    if (!e(t[a], a, t))
      return !1;
  }
  return !0;
}
function Ii(t, e, n) {
  e = Y(e, n);
  for (var r = !tt(t) && F(t), i = (r || t).length, s = 0; s < i; s++) {
    var a = r ? r[s] : s;
    if (e(t[a], a, t))
      return !0;
  }
  return !1;
}
function dt(t, e, n, r) {
  return tt(t) || (t = ae(t)), (typeof n != "number" || r) && (n = 0), xs(t, e, n) >= 0;
}
const Qc = j(function(t, e, n) {
  var r, i;
  return G(e) ? i = e : (e = Te(e), r = e.slice(0, -1), e = e[e.length - 1]), Ht(t, function(s) {
    var a = i;
    if (!a) {
      if (r && r.length && (s = lr(s, r)), s == null)
        return;
      a = s[e];
    }
    return a == null ? a : a.apply(s, n);
  });
});
function pr(t, e) {
  return Ht(t, hr(e));
}
function Yc(t, e) {
  return se(t, ke(e));
}
function Os(t, e, n) {
  var r = -1 / 0, i = -1 / 0, s, a;
  if (e == null || typeof e == "number" && typeof t[0] != "object" && t != null) {
    t = tt(t) ? t : ae(t);
    for (var o = 0, u = t.length; o < u; o++)
      s = t[o], s != null && s > r && (r = s);
  } else
    e = Y(e, n), pt(t, function(l, d, f) {
      a = e(l, d, f), (a > i || a === -1 / 0 && r === -1 / 0) && (r = l, i = a);
    });
  return r;
}
function Zc(t, e, n) {
  var r = 1 / 0, i = 1 / 0, s, a;
  if (e == null || typeof e == "number" && typeof t[0] != "object" && t != null) {
    t = tt(t) ? t : ae(t);
    for (var o = 0, u = t.length; o < u; o++)
      s = t[o], s != null && s < r && (r = s);
  } else
    e = Y(e, n), pt(t, function(l, d, f) {
      a = e(l, d, f), (a < i || a === 1 / 0 && r === 1 / 0) && (r = l, i = a);
    });
  return r;
}
var tu = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
function ys(t) {
  return t ? Gt(t) ? Ce.call(t) : nr(t) ? t.match(tu) : tt(t) ? Ht(t, fr) : ae(t) : [];
}
function Rs(t, e, n) {
  if (e == null || n)
    return tt(t) || (t = ae(t)), t[$n(t.length - 1)];
  var r = ys(t), i = Q(r);
  e = Math.max(Math.min(e, i), 0);
  for (var s = i - 1, a = 0; a < e; a++) {
    var o = $n(a, s), u = r[a];
    r[a] = r[o], r[o] = u;
  }
  return r.slice(0, e);
}
function eu(t) {
  return Rs(t, 1 / 0);
}
function nu(t, e, n) {
  var r = 0;
  return e = Y(e, n), pr(Ht(t, function(i, s, a) {
    return {
      value: i,
      index: r++,
      criteria: e(i, s, a)
    };
  }).sort(function(i, s) {
    var a = i.criteria, o = s.criteria;
    if (a !== o) {
      if (a > o || a === void 0)
        return 1;
      if (a < o || o === void 0)
        return -1;
    }
    return i.index - s.index;
  }), "value");
}
function an(t, e) {
  return function(n, r, i) {
    var s = e ? [[], []] : {};
    return r = Y(r, i), pt(n, function(a, o) {
      var u = r(a, o, n);
      t(s, a, u);
    }), s;
  };
}
const ru = an(function(t, e, n) {
  Pt(t, n) ? t[n].push(e) : t[n] = [e];
}), iu = an(function(t, e, n) {
  t[n] = e;
}), su = an(function(t, e, n) {
  Pt(t, n) ? t[n]++ : t[n] = 1;
}), au = an(function(t, e, n) {
  t[n ? 0 : 1].push(e);
}, !0);
function ou(t) {
  return t == null ? 0 : tt(t) ? t.length : F(t).length;
}
function cu(t, e, n) {
  return e in n;
}
const Fs = j(function(t, e) {
  var n = {}, r = e[0];
  if (t == null)
    return n;
  G(r) ? (e.length > 1 && (r = Ee(r, e[1])), e = Ie(t)) : (r = cu, e = Wt(e, !1, !1), t = Object(t));
  for (var i = 0, s = e.length; i < s; i++) {
    var a = e[i], o = t[a];
    r(o, a, t) && (n[a] = o);
  }
  return n;
}), uu = j(function(t, e) {
  var n = e[0], r;
  return G(n) ? (n = dr(n), e.length > 1 && (r = e[1])) : (e = Ht(Wt(e, !1, !1), String), n = function(i, s) {
    return !dt(e, s);
  }), Fs(t, n, r);
});
function Us(t, e, n) {
  return Ce.call(t, 0, Math.max(0, t.length - (e == null || n ? 1 : e)));
}
function Nn(t, e, n) {
  return t == null || t.length < 1 ? e == null || n ? void 0 : [] : e == null || n ? t[0] : Us(t, t.length - e);
}
function Ge(t, e, n) {
  return Ce.call(t, e == null || n ? 1 : e);
}
function lu(t, e, n) {
  return t == null || t.length < 1 ? e == null || n ? void 0 : [] : e == null || n ? t[t.length - 1] : Ge(t, Math.max(0, t.length - e));
}
function fu(t) {
  return se(t, Boolean);
}
function hu(t, e) {
  return Wt(t, e, !1);
}
const Bs = j(function(t, e) {
  return e = Wt(e, !0, !0), se(t, function(n) {
    return !dt(e, n);
  });
}), gu = j(function(t, e) {
  return Bs(t, e);
});
function Dn(t, e, n, r) {
  qi(e) || (r = n, n = e, e = !1), n != null && (n = Y(n, r));
  for (var i = [], s = [], a = 0, o = Q(t); a < o; a++) {
    var u = t[a], l = n ? n(u, a, t) : u;
    e && !n ? ((!a || s !== l) && i.push(u), s = l) : n ? dt(s, l) || (s.push(l), i.push(u)) : dt(i, u) || i.push(u);
  }
  return i;
}
const du = j(function(t) {
  return Dn(Wt(t, !0, !0));
});
function pu(t) {
  for (var e = [], n = arguments.length, r = 0, i = Q(t); r < i; r++) {
    var s = t[r];
    if (!dt(e, s)) {
      var a;
      for (a = 1; a < n && dt(arguments[a], s); a++)
        ;
      a === n && e.push(s);
    }
  }
  return e;
}
function Mn(t) {
  for (var e = t && Os(t, Q).length || 0, n = Array(e), r = 0; r < e; r++)
    n[r] = pr(t, r);
  return n;
}
const mu = j(Mn);
function vu(t, e) {
  for (var n = {}, r = 0, i = Q(t); r < i; r++)
    e ? n[t[r]] = e[r] : n[t[r][0]] = t[r][1];
  return n;
}
function ku(t, e, n) {
  e == null && (e = t || 0, t = 0), n || (n = e < t ? -1 : 1);
  for (var r = Math.max(Math.ceil((e - t) / n), 0), i = Array(r), s = 0; s < r; s++, t += n)
    i[s] = t;
  return i;
}
function Su(t, e) {
  if (e == null || e < 1)
    return [];
  for (var n = [], r = 0, i = t.length; r < i; )
    n.push(Ce.call(t, r, r += e));
  return n;
}
function mr(t, e) {
  return t._chain ? T(e).chain() : e;
}
function Vs(t) {
  return pt(Hn(t), function(e) {
    var n = T[e] = t[e];
    T.prototype[e] = function() {
      var r = [this._wrapped];
      return Go.apply(r, arguments), mr(this, n.apply(T, r));
    };
  }), T;
}
pt(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(t) {
  var e = sn[t];
  T.prototype[t] = function() {
    var n = this._wrapped;
    return n != null && (e.apply(n, arguments), (t === "shift" || t === "splice") && n.length === 0 && delete n[0]), mr(this, n);
  };
});
pt(["concat", "join", "slice"], function(t) {
  var e = sn[t];
  T.prototype[t] = function() {
    var n = this._wrapped;
    return n != null && (n = e.apply(n, arguments)), mr(this, n);
  };
});
const wu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VERSION: Gi,
  restArguments: j,
  isObject: Mt,
  isNull: jo,
  isUndefined: Ki,
  isBoolean: qi,
  isElement: Qo,
  isString: nr,
  isNumber: rr,
  isDate: Yo,
  isRegExp: Zo,
  isError: tc,
  isSymbol: Xi,
  isArrayBuffer: Ji,
  isDataView: ze,
  isArray: Gt,
  isFunction: G,
  isArguments: sr,
  isFinite: ic,
  isNaN: Zi,
  isTypedArray: rs,
  isEmpty: uc,
  isMatch: ss,
  isEqual: lc,
  isMap: gc,
  isWeakMap: dc,
  isSet: pc,
  isWeakSet: mc,
  keys: F,
  allKeys: Ie,
  values: ae,
  pairs: vc,
  invert: ls,
  functions: Hn,
  methods: Hn,
  extend: fs,
  extendOwn: qe,
  assign: qe,
  defaults: hs,
  create: Sc,
  clone: wc,
  tap: bc,
  get: ps,
  has: Cc,
  mapObject: Ic,
  identity: fr,
  constant: ts,
  noop: vs,
  toPath: ds,
  property: hr,
  propertyOf: Tc,
  matcher: ke,
  matches: ke,
  times: Ec,
  random: $n,
  now: Se,
  escape: _c,
  unescape: Ac,
  templateSettings: xc,
  template: Fc,
  result: Uc,
  uniqueId: Vc,
  chain: Lc,
  iteratee: gr,
  partial: oe,
  bind: bs,
  bindAll: Hc,
  memoize: $c,
  delay: Cs,
  defer: Dc,
  throttle: Mc,
  debounce: Gc,
  wrap: Wc,
  negate: dr,
  compose: zc,
  after: Kc,
  before: Is,
  once: qc,
  findKey: Ts,
  findIndex: ie,
  findLastIndex: _s,
  sortedIndex: Ps,
  indexOf: xs,
  lastIndexOf: Xc,
  find: Xe,
  detect: Xe,
  findWhere: Jc,
  each: pt,
  forEach: pt,
  map: Ht,
  collect: Ht,
  reduce: xn,
  foldl: xn,
  inject: xn,
  reduceRight: bi,
  foldr: bi,
  filter: se,
  select: se,
  reject: jc,
  every: Ci,
  all: Ci,
  some: Ii,
  any: Ii,
  contains: dt,
  includes: dt,
  include: dt,
  invoke: Qc,
  pluck: pr,
  where: Yc,
  max: Os,
  min: Zc,
  shuffle: eu,
  sample: Rs,
  sortBy: nu,
  groupBy: ru,
  indexBy: iu,
  countBy: su,
  partition: au,
  toArray: ys,
  size: ou,
  pick: Fs,
  omit: uu,
  first: Nn,
  head: Nn,
  take: Nn,
  initial: Us,
  last: lu,
  rest: Ge,
  tail: Ge,
  drop: Ge,
  compact: fu,
  flatten: hu,
  without: gu,
  uniq: Dn,
  unique: Dn,
  union: du,
  intersection: pu,
  difference: Bs,
  unzip: Mn,
  transpose: Mn,
  zip: mu,
  object: vu,
  range: ku,
  chunk: Su,
  mixin: Vs,
  default: T
}, Symbol.toStringTag, { value: "Module" }));
var _ = Vs(wu);
_._ = _;
let on = (t = 21) => crypto.getRandomValues(new Uint8Array(t)).reduce((e, n) => (n &= 63, n < 36 ? e += n.toString(36) : n < 62 ? e += (n - 26).toString(36).toUpperCase() : n > 62 ? e += "-" : e += "_", e), "");
class Gn {
  instanceIdInternal = Gn.generatePluginIdInternal();
  enabledInternal = !0;
  paramsResultInternal = {};
  generatedTrackIdsInternal = [];
  isRollbackable = !1;
  songCacheInternal;
  allowManualApplyAdjust = !1;
  allowReset = !1;
  trigger = void 0;
  progress = null;
  isExecuting = !1;
  isPreparingForRunInternal = !1;
  static providerId() {
    throw new Error("providerId() should be overwritten.");
  }
  static pluginId() {
    throw new Error("pluginId() should be overwritten.");
  }
  async init(e, n) {
  }
  params() {
    return {};
  }
  async run(e, n, r) {
  }
  onCancel() {
  }
  static async create(e, n, r, i, s) {
    const a = new this();
    return a.allowManualApplyAdjust = r.allowManualApplyAdjust, a.allowReset = r.allowReset, a.trigger = i ? {
      type: i,
      entities: s
    } : void 0, a.resetInternal(), await a.init(e, n), a;
  }
  get instanceId() {
    return this.instanceIdInternal;
  }
  getParam(e, n) {
    return e[n];
  }
  hasAllParamsSet() {
    for (const e of F(this.params()))
      if (!this.isParamProvided(e))
        return !1;
    return !0;
  }
  isParamProvided(e) {
    if (this.params()[e].optional)
      return !0;
    const n = this.paramsResultInternal[e];
    if (n == null)
      return !1;
    const i = this.params()[e].widget.type;
    switch (i) {
      case V.Input:
      case V.Pitch:
      case V.Slider:
      case V.TrackSelector:
      case V.Select:
      case V.SelectList:
      case V.Switch:
      case V.InputNumber:
      case V.FileSelector:
        return !0;
      case V.MultiTrackSelector:
        return n.length > 0;
      case V.TrackPitchSelector:
        return n.track !== void 0 && n.track !== null && n.pitch !== void 0 && n.pitch !== null;
      case V.InstrumentSelector:
        return n.program !== void 0 && n.program !== null && n.isDrum !== void 0 && n.isDrum !== null;
      case V.MultiSourceAudioSelector:
        return n != null && n.audioInfo !== void 0 && n.audioInfo !== null;
      case V.None:
        return n != null;
      case V.TextArea:
        return n !== "";
      default:
        throw new Error(
          `Param nullness check needs to be implemented for widget type ${i}. Either use default nullness check or define custom logic.`
        );
    }
  }
  static id() {
    return Gn.getPluginFullId(this.providerId(), this.pluginId());
  }
  static getPluginFullId(e, n) {
    return `${e}^_^${n}`;
  }
  static getPrefixedArtifactId(e) {
    return `${this.id()}.${e}`;
  }
  setProgress(e) {
    this.progress = e;
  }
  getProgress() {
    return this.progress;
  }
  getIsExecuting() {
    return this.isExecuting;
  }
  getIsPreparingForRun() {
    return this.isPreparingForRunInternal;
  }
  setParamsInternal(e) {
    this.paramsResultInternal = e, this.maybeSyncEnabledWithParamsReadiness();
  }
  getParamsInternal() {
    return this.paramsResultInternal;
  }
  resetParamsInternal() {
    for (const e of F(this.params())) {
      const n = this.params()[e];
      n.injectFrom && this.isParamProvided(e) || (this.paramsResultInternal[e] = n.defaultValue);
    }
    this.maybeSyncEnabledWithParamsReadiness();
  }
  resetInternal() {
    this.resetParamsInternal(), this.allowManualApplyAdjust && (this.enabledInternal = !1);
  }
  setEnabledInternal(e) {
    const n = this.enabledInternal;
    if (this.enabledInternal = e, n && !e)
      try {
        this.onCancel();
      } catch {
      }
  }
  maybeSyncEnabledWithParamsReadiness() {
    this.allowManualApplyAdjust && !this.hasAllParamsSet() && this.setEnabledInternal(!1);
  }
  static generatePluginIdInternal() {
    return on(10);
  }
}
class yt {
  plugins = [];
  threwErrorInLastRun = !1;
  maxNumPluginsToKeep = 50;
  originalSong;
  activePluginIndex = -1;
  static cloneSongFnInternal;
  static materializeSongFnInternal;
  static readApisInternal;
  addAsOrReplaceActivePlugin(e) {
    let n;
    return this.activePluginIndex <= -1 ? n = 0 : this.plugins[this.activePluginIndex].isRollbackable ? n = this.activePluginIndex + 1 : n = this.activePluginIndex, this.plugins.length > 0 && this.plugins.splice(n, this.plugins.length - n), this.addPluginAt(e, n), this.getPluginIndexByPluginInstanceId(e.instanceId);
  }
  getPlugins() {
    return this.plugins;
  }
  resetCache() {
    for (const e of this.plugins)
      delete e.songCacheInternal;
  }
  setOriginalSong(e) {
    this.originalSong = e;
  }
  hasOriginalSong() {
    return !!this.originalSong;
  }
  async prepareRun(e = 0) {
    if (!this.originalSong)
      return this.threwErrorInLastRun = !0, null;
    e = Math.max(0, e), this.setActivePluginIndex(e), this.threwErrorInLastRun = !1;
    const n = this.getIndexOfLatestPluginWithCacheBeforeIndex(e), r = await this.cloneCachedSongAtPluginIndex(n);
    for (let i = e; i < this.plugins.length; i += 1)
      delete this.plugins[i].songCacheInternal;
    for (let i = 0; i < this.plugins.length; i += 1)
      this.plugins[i].isRollbackable = i <= n;
    return {
      inputSong: r,
      plugins: this.plugins.slice(n >= 0 ? n + 1 : 0)
    };
  }
  static async run(e, n, r) {
    for (const i of n) {
      if (!yt.isPluginRunnable(i))
        return e;
      e.setPluginContextInternal(i);
      try {
        i.isExecuting = !0, i.setProgress(null), await i.run(e, i.getParamsInternal(), yt.readApisInternal), e.clearPluginContextInternal(), await yt.materializeSongFnInternal(e, r), i.isExecuting = !1;
      } catch (s) {
        throw e.clearPluginContextInternal(), i.isExecuting = !1, s;
      }
      i.songCacheInternal = await yt.cloneSongFnInternal(e), i.isRollbackable = !0;
    }
    return e;
  }
  restoreCachedPlugin(e) {
    return this.setActivePluginIndex(e), this.cloneCachedSongAtPluginIndex(e);
  }
  getActivePluginIndex() {
    return this.activePluginIndex;
  }
  setActivePluginIndex(e) {
    this.activePluginIndex = e;
  }
  async cloneCachedSongAtPluginIndex(e) {
    if (e >= 0)
      return await yt.cloneSongFnInternal(
        this.plugins[e].songCacheInternal
      );
    if (!this.originalSong)
      throw new Error("Original song is not avaiable to clone.");
    return await yt.cloneSongFnInternal(this.originalSong);
  }
  reset() {
    this.plugins.splice(0, this.plugins.length), this.originalSong = void 0, this.activePluginIndex = -1, this.threwErrorInLastRun = !1;
  }
  isPluginFunctioning(e) {
    return !!e.songCacheInternal;
  }
  getPluginIndexByPluginInstanceId(e) {
    return ie(this.plugins, (n) => n.instanceId === e);
  }
  getThrewErrorInLastRun() {
    return this.threwErrorInLastRun;
  }
  getPluginCache(e) {
    return e.songCacheInternal;
  }
  setMaxNumPluginsToKeep(e) {
    this.maxNumPluginsToKeep = e, this.maintainPluginListSize();
  }
  getIndexOfLatestPluginWithCacheBeforeIndex(e) {
    for (let n = e - 1; n >= 0; n -= 1)
      if (this.getPluginCache(this.plugins[n]))
        return n;
    return -1;
  }
  maintainPluginListSize() {
    for (; this.plugins.length > this.maxNumPluginsToKeep && this.plugins.length > 0; )
      this.plugins.shift();
  }
  addPluginAt(e, n) {
    this.plugins.splice(n, 0, e), this.maintainPluginListSize();
  }
  static isPluginRunnable(e) {
    return e.enabledInternal && e.hasAllParamsSet();
  }
}
var ft = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function bu(t) {
  var e = t.default;
  if (typeof e == "function") {
    var n = function() {
      return e.apply(this, arguments);
    };
    n.prototype = e.prototype;
  } else
    n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(t).forEach(function(r) {
    var i = Object.getOwnPropertyDescriptor(t, r);
    Object.defineProperty(n, r, i.get ? i : {
      enumerable: !0,
      get: function() {
        return t[r];
      }
    });
  }), n;
}
function Cu(t, e, n, r, i) {
  for (var s = i + 1; r <= i; ) {
    var a = r + i >>> 1, o = t[a], u = n !== void 0 ? n(o, e) : o - e;
    u >= 0 ? (s = a, i = a - 1) : r = a + 1;
  }
  return s;
}
function Iu(t, e, n, r, i) {
  for (var s = i + 1; r <= i; ) {
    var a = r + i >>> 1, o = t[a], u = n !== void 0 ? n(o, e) : o - e;
    u > 0 ? (s = a, i = a - 1) : r = a + 1;
  }
  return s;
}
function Tu(t, e, n, r, i) {
  for (var s = r - 1; r <= i; ) {
    var a = r + i >>> 1, o = t[a], u = n !== void 0 ? n(o, e) : o - e;
    u < 0 ? (s = a, r = a + 1) : i = a - 1;
  }
  return s;
}
function Eu(t, e, n, r, i) {
  for (var s = r - 1; r <= i; ) {
    var a = r + i >>> 1, o = t[a], u = n !== void 0 ? n(o, e) : o - e;
    u <= 0 ? (s = a, r = a + 1) : i = a - 1;
  }
  return s;
}
function _u(t, e, n, r, i) {
  for (; r <= i; ) {
    var s = r + i >>> 1, a = t[s], o = n !== void 0 ? n(a, e) : a - e;
    if (o === 0)
      return s;
    o <= 0 ? r = s + 1 : i = s - 1;
  }
  return -1;
}
function le(t, e, n, r, i, s) {
  return typeof n == "function" ? s(t, e, n, r === void 0 ? 0 : r | 0, i === void 0 ? t.length - 1 : i | 0) : s(t, e, void 0, n === void 0 ? 0 : n | 0, r === void 0 ? t.length - 1 : r | 0);
}
var x = {
  ge: function(t, e, n, r, i) {
    return le(t, e, n, r, i, Cu);
  },
  gt: function(t, e, n, r, i) {
    return le(t, e, n, r, i, Iu);
  },
  lt: function(t, e, n, r, i) {
    return le(t, e, n, r, i, Tu);
  },
  le: function(t, e, n, r, i) {
    return le(t, e, n, r, i, Eu);
  },
  eq: function(t, e, n, r, i) {
    return le(t, e, n, r, i, _u);
  }
}, Wn = { exports: {} };
(function(t, e) {
  var n = 200, r = "__lodash_hash_undefined__", i = 9007199254740991, s = "[object Arguments]", a = "[object Array]", o = "[object Boolean]", u = "[object Date]", l = "[object Error]", d = "[object Function]", f = "[object GeneratorFunction]", h = "[object Map]", m = "[object Number]", v = "[object Object]", w = "[object Promise]", k = "[object RegExp]", C = "[object Set]", O = "[object String]", I = "[object Symbol]", b = "[object WeakMap]", y = "[object ArrayBuffer]", ct = "[object DataView]", zt = "[object Float32Array]", Fr = "[object Float64Array]", Ur = "[object Int8Array]", Br = "[object Int16Array]", Vr = "[object Int32Array]", Lr = "[object Uint8Array]", Hr = "[object Uint8ClampedArray]", $r = "[object Uint16Array]", Dr = "[object Uint32Array]", ka = /[\\^$.*+?()[\]{}|]/g, Sa = /\w*$/, wa = /^\[object .+?Constructor\]$/, ba = /^(?:0|[1-9]\d*)$/, P = {};
  P[s] = P[a] = P[y] = P[ct] = P[o] = P[u] = P[zt] = P[Fr] = P[Ur] = P[Br] = P[Vr] = P[h] = P[m] = P[v] = P[k] = P[C] = P[O] = P[I] = P[Lr] = P[Hr] = P[$r] = P[Dr] = !0, P[l] = P[d] = P[b] = !1;
  var Ca = typeof ft == "object" && ft && ft.Object === Object && ft, Ia = typeof self == "object" && self && self.Object === Object && self, ht = Ca || Ia || Function("return this")(), Mr = e && !e.nodeType && e, Gr = Mr && !0 && t && !t.nodeType && t, Ta = Gr && Gr.exports === Mr;
  function Ea(c, g) {
    return c.set(g[0], g[1]), c;
  }
  function _a(c, g) {
    return c.add(g), c;
  }
  function Pa(c, g) {
    for (var p = -1, S = c ? c.length : 0; ++p < S && g(c[p], p, c) !== !1; )
      ;
    return c;
  }
  function Aa(c, g) {
    for (var p = -1, S = g.length, B = c.length; ++p < S; )
      c[B + p] = g[p];
    return c;
  }
  function Wr(c, g, p, S) {
    var B = -1, H = c ? c.length : 0;
    for (S && H && (p = c[++B]); ++B < H; )
      p = g(p, c[B], B, c);
    return p;
  }
  function xa(c, g) {
    for (var p = -1, S = Array(c); ++p < c; )
      S[p] = g(p);
    return S;
  }
  function Na(c, g) {
    return c == null ? void 0 : c[g];
  }
  function zr(c) {
    var g = !1;
    if (c != null && typeof c.toString != "function")
      try {
        g = !!(c + "");
      } catch {
      }
    return g;
  }
  function Kr(c) {
    var g = -1, p = Array(c.size);
    return c.forEach(function(S, B) {
      p[++g] = [B, S];
    }), p;
  }
  function vn(c, g) {
    return function(p) {
      return c(g(p));
    };
  }
  function qr(c) {
    var g = -1, p = Array(c.size);
    return c.forEach(function(S) {
      p[++g] = S;
    }), p;
  }
  var Oa = Array.prototype, ya = Function.prototype, _e = Object.prototype, kn = ht["__core-js_shared__"], Xr = function() {
    var c = /[^.]+$/.exec(kn && kn.keys && kn.keys.IE_PROTO || "");
    return c ? "Symbol(src)_1." + c : "";
  }(), Jr = ya.toString, mt = _e.hasOwnProperty, Pe = _e.toString, Ra = RegExp(
    "^" + Jr.call(mt).replace(ka, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), jr = Ta ? ht.Buffer : void 0, Qr = ht.Symbol, Yr = ht.Uint8Array, Fa = vn(Object.getPrototypeOf, Object), Ua = Object.create, Ba = _e.propertyIsEnumerable, Va = Oa.splice, Zr = Object.getOwnPropertySymbols, La = jr ? jr.isBuffer : void 0, Ha = vn(Object.keys, Object), Sn = Xt(ht, "DataView"), ce = Xt(ht, "Map"), wn = Xt(ht, "Promise"), bn = Xt(ht, "Set"), Cn = Xt(ht, "WeakMap"), ue = Xt(Object, "create"), $a = Nt(Sn), Da = Nt(ce), Ma = Nt(wn), Ga = Nt(bn), Wa = Nt(Cn), ti = Qr ? Qr.prototype : void 0, ei = ti ? ti.valueOf : void 0;
  function At(c) {
    var g = -1, p = c ? c.length : 0;
    for (this.clear(); ++g < p; ) {
      var S = c[g];
      this.set(S[0], S[1]);
    }
  }
  function za() {
    this.__data__ = ue ? ue(null) : {};
  }
  function Ka(c) {
    return this.has(c) && delete this.__data__[c];
  }
  function qa(c) {
    var g = this.__data__;
    if (ue) {
      var p = g[c];
      return p === r ? void 0 : p;
    }
    return mt.call(g, c) ? g[c] : void 0;
  }
  function Xa(c) {
    var g = this.__data__;
    return ue ? g[c] !== void 0 : mt.call(g, c);
  }
  function Ja(c, g) {
    var p = this.__data__;
    return p[c] = ue && g === void 0 ? r : g, this;
  }
  At.prototype.clear = za, At.prototype.delete = Ka, At.prototype.get = qa, At.prototype.has = Xa, At.prototype.set = Ja;
  function gt(c) {
    var g = -1, p = c ? c.length : 0;
    for (this.clear(); ++g < p; ) {
      var S = c[g];
      this.set(S[0], S[1]);
    }
  }
  function ja() {
    this.__data__ = [];
  }
  function Qa(c) {
    var g = this.__data__, p = Ae(g, c);
    if (p < 0)
      return !1;
    var S = g.length - 1;
    return p == S ? g.pop() : Va.call(g, p, 1), !0;
  }
  function Ya(c) {
    var g = this.__data__, p = Ae(g, c);
    return p < 0 ? void 0 : g[p][1];
  }
  function Za(c) {
    return Ae(this.__data__, c) > -1;
  }
  function to(c, g) {
    var p = this.__data__, S = Ae(p, c);
    return S < 0 ? p.push([c, g]) : p[S][1] = g, this;
  }
  gt.prototype.clear = ja, gt.prototype.delete = Qa, gt.prototype.get = Ya, gt.prototype.has = Za, gt.prototype.set = to;
  function Kt(c) {
    var g = -1, p = c ? c.length : 0;
    for (this.clear(); ++g < p; ) {
      var S = c[g];
      this.set(S[0], S[1]);
    }
  }
  function eo() {
    this.__data__ = {
      hash: new At(),
      map: new (ce || gt)(),
      string: new At()
    };
  }
  function no(c) {
    return xe(this, c).delete(c);
  }
  function ro(c) {
    return xe(this, c).get(c);
  }
  function io(c) {
    return xe(this, c).has(c);
  }
  function so(c, g) {
    return xe(this, c).set(c, g), this;
  }
  Kt.prototype.clear = eo, Kt.prototype.delete = no, Kt.prototype.get = ro, Kt.prototype.has = io, Kt.prototype.set = so;
  function qt(c) {
    this.__data__ = new gt(c);
  }
  function ao() {
    this.__data__ = new gt();
  }
  function oo(c) {
    return this.__data__.delete(c);
  }
  function co(c) {
    return this.__data__.get(c);
  }
  function uo(c) {
    return this.__data__.has(c);
  }
  function lo(c, g) {
    var p = this.__data__;
    if (p instanceof gt) {
      var S = p.__data__;
      if (!ce || S.length < n - 1)
        return S.push([c, g]), this;
      p = this.__data__ = new Kt(S);
    }
    return p.set(c, g), this;
  }
  qt.prototype.clear = ao, qt.prototype.delete = oo, qt.prototype.get = co, qt.prototype.has = uo, qt.prototype.set = lo;
  function fo(c, g) {
    var p = En(c) || Bo(c) ? xa(c.length, String) : [], S = p.length, B = !!S;
    for (var H in c)
      (g || mt.call(c, H)) && !(B && (H == "length" || yo(H, S))) && p.push(H);
    return p;
  }
  function ni(c, g, p) {
    var S = c[g];
    (!(mt.call(c, g) && ai(S, p)) || p === void 0 && !(g in c)) && (c[g] = p);
  }
  function Ae(c, g) {
    for (var p = c.length; p--; )
      if (ai(c[p][0], g))
        return p;
    return -1;
  }
  function ho(c, g) {
    return c && ri(g, _n(g), c);
  }
  function In(c, g, p, S, B, H, et) {
    var K;
    if (S && (K = H ? S(c, B, H, et) : S(c)), K !== void 0)
      return K;
    if (!Ne(c))
      return c;
    var ui = En(c);
    if (ui) {
      if (K = xo(c), !g)
        return _o(c, K);
    } else {
      var Jt = xt(c), li = Jt == d || Jt == f;
      if (Lo(c))
        return So(c, g);
      if (Jt == v || Jt == s || li && !H) {
        if (zr(c))
          return H ? c : {};
        if (K = No(li ? {} : c), !g)
          return Po(c, ho(K, c));
      } else {
        if (!P[Jt])
          return H ? c : {};
        K = Oo(c, Jt, In, g);
      }
    }
    et || (et = new qt());
    var fi = et.get(c);
    if (fi)
      return fi;
    if (et.set(c, K), !ui)
      var hi = p ? Ao(c) : _n(c);
    return Pa(hi || c, function(Pn, Oe) {
      hi && (Oe = Pn, Pn = c[Oe]), ni(K, Oe, In(Pn, g, p, S, Oe, c, et));
    }), K;
  }
  function go(c) {
    return Ne(c) ? Ua(c) : {};
  }
  function po(c, g, p) {
    var S = g(c);
    return En(c) ? S : Aa(S, p(c));
  }
  function mo(c) {
    return Pe.call(c);
  }
  function vo(c) {
    if (!Ne(c) || Fo(c))
      return !1;
    var g = ci(c) || zr(c) ? Ra : wa;
    return g.test(Nt(c));
  }
  function ko(c) {
    if (!si(c))
      return Ha(c);
    var g = [];
    for (var p in Object(c))
      mt.call(c, p) && p != "constructor" && g.push(p);
    return g;
  }
  function So(c, g) {
    if (g)
      return c.slice();
    var p = new c.constructor(c.length);
    return c.copy(p), p;
  }
  function Tn(c) {
    var g = new c.constructor(c.byteLength);
    return new Yr(g).set(new Yr(c)), g;
  }
  function wo(c, g) {
    var p = g ? Tn(c.buffer) : c.buffer;
    return new c.constructor(p, c.byteOffset, c.byteLength);
  }
  function bo(c, g, p) {
    var S = g ? p(Kr(c), !0) : Kr(c);
    return Wr(S, Ea, new c.constructor());
  }
  function Co(c) {
    var g = new c.constructor(c.source, Sa.exec(c));
    return g.lastIndex = c.lastIndex, g;
  }
  function Io(c, g, p) {
    var S = g ? p(qr(c), !0) : qr(c);
    return Wr(S, _a, new c.constructor());
  }
  function To(c) {
    return ei ? Object(ei.call(c)) : {};
  }
  function Eo(c, g) {
    var p = g ? Tn(c.buffer) : c.buffer;
    return new c.constructor(p, c.byteOffset, c.length);
  }
  function _o(c, g) {
    var p = -1, S = c.length;
    for (g || (g = Array(S)); ++p < S; )
      g[p] = c[p];
    return g;
  }
  function ri(c, g, p, S) {
    p || (p = {});
    for (var B = -1, H = g.length; ++B < H; ) {
      var et = g[B], K = S ? S(p[et], c[et], et, p, c) : void 0;
      ni(p, et, K === void 0 ? c[et] : K);
    }
    return p;
  }
  function Po(c, g) {
    return ri(c, ii(c), g);
  }
  function Ao(c) {
    return po(c, _n, ii);
  }
  function xe(c, g) {
    var p = c.__data__;
    return Ro(g) ? p[typeof g == "string" ? "string" : "hash"] : p.map;
  }
  function Xt(c, g) {
    var p = Na(c, g);
    return vo(p) ? p : void 0;
  }
  var ii = Zr ? vn(Zr, Object) : Do, xt = mo;
  (Sn && xt(new Sn(new ArrayBuffer(1))) != ct || ce && xt(new ce()) != h || wn && xt(wn.resolve()) != w || bn && xt(new bn()) != C || Cn && xt(new Cn()) != b) && (xt = function(c) {
    var g = Pe.call(c), p = g == v ? c.constructor : void 0, S = p ? Nt(p) : void 0;
    if (S)
      switch (S) {
        case $a:
          return ct;
        case Da:
          return h;
        case Ma:
          return w;
        case Ga:
          return C;
        case Wa:
          return b;
      }
    return g;
  });
  function xo(c) {
    var g = c.length, p = c.constructor(g);
    return g && typeof c[0] == "string" && mt.call(c, "index") && (p.index = c.index, p.input = c.input), p;
  }
  function No(c) {
    return typeof c.constructor == "function" && !si(c) ? go(Fa(c)) : {};
  }
  function Oo(c, g, p, S) {
    var B = c.constructor;
    switch (g) {
      case y:
        return Tn(c);
      case o:
      case u:
        return new B(+c);
      case ct:
        return wo(c, S);
      case zt:
      case Fr:
      case Ur:
      case Br:
      case Vr:
      case Lr:
      case Hr:
      case $r:
      case Dr:
        return Eo(c, S);
      case h:
        return bo(c, S, p);
      case m:
      case O:
        return new B(c);
      case k:
        return Co(c);
      case C:
        return Io(c, S, p);
      case I:
        return To(c);
    }
  }
  function yo(c, g) {
    return g = g ?? i, !!g && (typeof c == "number" || ba.test(c)) && c > -1 && c % 1 == 0 && c < g;
  }
  function Ro(c) {
    var g = typeof c;
    return g == "string" || g == "number" || g == "symbol" || g == "boolean" ? c !== "__proto__" : c === null;
  }
  function Fo(c) {
    return !!Xr && Xr in c;
  }
  function si(c) {
    var g = c && c.constructor, p = typeof g == "function" && g.prototype || _e;
    return c === p;
  }
  function Nt(c) {
    if (c != null) {
      try {
        return Jr.call(c);
      } catch {
      }
      try {
        return c + "";
      } catch {
      }
    }
    return "";
  }
  function Uo(c) {
    return In(c, !0, !0);
  }
  function ai(c, g) {
    return c === g || c !== c && g !== g;
  }
  function Bo(c) {
    return Vo(c) && mt.call(c, "callee") && (!Ba.call(c, "callee") || Pe.call(c) == s);
  }
  var En = Array.isArray;
  function oi(c) {
    return c != null && Ho(c.length) && !ci(c);
  }
  function Vo(c) {
    return $o(c) && oi(c);
  }
  var Lo = La || Mo;
  function ci(c) {
    var g = Ne(c) ? Pe.call(c) : "";
    return g == d || g == f;
  }
  function Ho(c) {
    return typeof c == "number" && c > -1 && c % 1 == 0 && c <= i;
  }
  function Ne(c) {
    var g = typeof c;
    return !!c && (g == "object" || g == "function");
  }
  function $o(c) {
    return !!c && typeof c == "object";
  }
  function _n(c) {
    return oi(c) ? fo(c) : ko(c);
  }
  function Do() {
    return [];
  }
  function Mo() {
    return !1;
  }
  t.exports = Uo;
})(Wn, Wn.exports);
const Ti = Wn.exports;
class On {
  ticks;
  bpm;
  time;
  constructor({
    ticks: e,
    bpm: n,
    time: r
  }) {
    this.ticks = e, this.bpm = n, this.time = r;
  }
  getTicks() {
    return this.ticks;
  }
  getBpm() {
    return this.bpm;
  }
  setBpmInternal(e) {
    this.bpm = e;
  }
  getTime() {
    return this.time;
  }
  setTimeInternal(e) {
    this.time = e;
  }
}
class Ei {
  ticks;
  numerator;
  denominator;
  constructor({
    ticks: e,
    numerator: n,
    denominator: r
  }) {
    this.ticks = e, this.numerator = n, this.denominator = r;
  }
  getTicks() {
    return this.ticks;
  }
  setTicks(e) {
    this.ticks = e;
  }
  getNumerator() {
    return this.numerator;
  }
  setNumerator(e) {
    this.numerator = e;
  }
  getDenominator() {
    return this.denominator;
  }
  setDenominator(e) {
    this.denominator = e;
  }
}
function Pu(t, e) {
  const n = /* @__PURE__ */ Object.create(null), r = t.split(",");
  for (let i = 0; i < r.length; i++)
    n[r[i]] = !0;
  return e ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
function vr(t) {
  if (N(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const r = t[n], i = ot(r) ? Ou(r) : vr(r);
      if (i)
        for (const s in i)
          e[s] = i[s];
    }
    return e;
  } else {
    if (ot(t))
      return t;
    if (J(t))
      return t;
  }
}
const Au = /;(?![^(]*\))/g, xu = /:([^]+)/, Nu = /\/\*.*?\*\//gs;
function Ou(t) {
  const e = {};
  return t.replace(Nu, "").split(Au).forEach((n) => {
    if (n) {
      const r = n.split(xu);
      r.length > 1 && (e[r[0].trim()] = r[1].trim());
    }
  }), e;
}
function kr(t) {
  let e = "";
  if (ot(t))
    e = t;
  else if (N(t))
    for (let n = 0; n < t.length; n++) {
      const r = kr(t[n]);
      r && (e += r + " ");
    }
  else if (J(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const lt = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {};
process.env.NODE_ENV !== "production" && Object.freeze([]);
const Sr = () => {
}, yu = () => !1, Ru = /^on[^a-z]/, Fu = (t) => Ru.test(t), at = Object.assign, Uu = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, Bu = Object.prototype.hasOwnProperty, R = (t, e) => Bu.call(t, e), N = Array.isArray, te = (t) => cn(t) === "[object Map]", Vu = (t) => cn(t) === "[object Set]", W = (t) => typeof t == "function", ot = (t) => typeof t == "string", wr = (t) => typeof t == "symbol", J = (t) => t !== null && typeof t == "object", Lu = (t) => J(t) && W(t.then) && W(t.catch), Hu = Object.prototype.toString, cn = (t) => Hu.call(t), Ls = (t) => cn(t).slice(8, -1), $u = (t) => cn(t) === "[object Object]", br = (t) => ot(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Du = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, Th = Du((t) => t.charAt(0).toUpperCase() + t.slice(1)), Je = (t, e) => !Object.is(t, e), Mu = (t, e, n) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Gu = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
};
let _i;
const Wu = () => _i || (_i = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Pi(t, ...e) {
}
let zu;
function Ku(t, e = zu) {
  e && e.active && e.effects.push(t);
}
const zn = (t) => {
  const e = new Set(t);
  return e.w = 0, e.n = 0, e;
}, Hs = (t) => (t.w & Et) > 0, $s = (t) => (t.n & Et) > 0, qu = ({ deps: t }) => {
  if (t.length)
    for (let e = 0; e < t.length; e++)
      t[e].w |= Et;
}, Xu = (t) => {
  const { deps: e } = t;
  if (e.length) {
    let n = 0;
    for (let r = 0; r < e.length; r++) {
      const i = e[r];
      Hs(i) && !$s(i) ? i.delete(t) : e[n++] = i, i.w &= ~Et, i.n &= ~Et;
    }
    e.length = n;
  }
}, Kn = /* @__PURE__ */ new WeakMap();
let he = 0, Et = 1;
const qn = 30;
let X;
const Ft = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), Xn = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class Ju {
  constructor(e, n = null, r) {
    this.fn = e, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Ku(this, r);
  }
  run() {
    if (!this.active)
      return this.fn();
    let e = X, n = Ut;
    for (; e; ) {
      if (e === this)
        return;
      e = e.parent;
    }
    try {
      return this.parent = X, X = this, Ut = !0, Et = 1 << ++he, he <= qn ? qu(this) : Ai(this), this.fn();
    } finally {
      he <= qn && Xu(this), Et = 1 << --he, X = this.parent, Ut = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    X === this ? this.deferStop = !0 : this.active && (Ai(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Ai(t) {
  const { deps: e } = t;
  if (e.length) {
    for (let n = 0; n < e.length; n++)
      e[n].delete(t);
    e.length = 0;
  }
}
let Ut = !0;
const Ds = [];
function Ms() {
  Ds.push(Ut), Ut = !1;
}
function Gs() {
  const t = Ds.pop();
  Ut = t === void 0 ? !0 : t;
}
function it(t, e, n) {
  if (Ut && X) {
    let r = Kn.get(t);
    r || Kn.set(t, r = /* @__PURE__ */ new Map());
    let i = r.get(n);
    i || r.set(n, i = zn());
    const s = process.env.NODE_ENV !== "production" ? { effect: X, target: t, type: e, key: n } : void 0;
    ju(i, s);
  }
}
function ju(t, e) {
  let n = !1;
  he <= qn ? $s(t) || (t.n |= Et, n = !Hs(t)) : n = !t.has(X), n && (t.add(X), X.deps.push(t), process.env.NODE_ENV !== "production" && X.onTrack && X.onTrack(Object.assign({ effect: X }, e)));
}
function _t(t, e, n, r, i, s) {
  const a = Kn.get(t);
  if (!a)
    return;
  let o = [];
  if (e === "clear")
    o = [...a.values()];
  else if (n === "length" && N(t)) {
    const l = Gu(r);
    a.forEach((d, f) => {
      (f === "length" || f >= l) && o.push(d);
    });
  } else
    switch (n !== void 0 && o.push(a.get(n)), e) {
      case "add":
        N(t) ? br(n) && o.push(a.get("length")) : (o.push(a.get(Ft)), te(t) && o.push(a.get(Xn)));
        break;
      case "delete":
        N(t) || (o.push(a.get(Ft)), te(t) && o.push(a.get(Xn)));
        break;
      case "set":
        te(t) && o.push(a.get(Ft));
        break;
    }
  const u = process.env.NODE_ENV !== "production" ? { target: t, type: e, key: n, newValue: r, oldValue: i, oldTarget: s } : void 0;
  if (o.length === 1)
    o[0] && (process.env.NODE_ENV !== "production" ? ye(o[0], u) : ye(o[0]));
  else {
    const l = [];
    for (const d of o)
      d && l.push(...d);
    process.env.NODE_ENV !== "production" ? ye(zn(l), u) : ye(zn(l));
  }
}
function ye(t, e) {
  const n = N(t) ? t : [...t];
  for (const r of n)
    r.computed && xi(r, e);
  for (const r of n)
    r.computed || xi(r, e);
}
function xi(t, e) {
  (t !== X || t.allowRecurse) && (process.env.NODE_ENV !== "production" && t.onTrigger && t.onTrigger(at({ effect: t }, e)), t.scheduler ? t.scheduler() : t.run());
}
const Qu = /* @__PURE__ */ Pu("__proto__,__v_isRef,__isVue"), Ws = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(wr)
), Yu = /* @__PURE__ */ Cr(), Zu = /* @__PURE__ */ Cr(!0), tl = /* @__PURE__ */ Cr(!0, !0), Ni = /* @__PURE__ */ el();
function el() {
  const t = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    t[e] = function(...n) {
      const r = E(this);
      for (let s = 0, a = this.length; s < a; s++)
        it(r, "get", s + "");
      const i = r[e](...n);
      return i === -1 || i === !1 ? r[e](...n.map(E)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    t[e] = function(...n) {
      Ms();
      const r = E(this)[e].apply(this, n);
      return Gs(), r;
    };
  }), t;
}
function Cr(t = !1, e = !1) {
  return function(r, i, s) {
    if (i === "__v_isReactive")
      return !t;
    if (i === "__v_isReadonly")
      return t;
    if (i === "__v_isShallow")
      return e;
    if (i === "__v_raw" && s === (t ? e ? Js : Xs : e ? vl : qs).get(r))
      return r;
    const a = N(r);
    if (!t && a && R(Ni, i))
      return Reflect.get(Ni, i, s);
    const o = Reflect.get(r, i, s);
    return (wr(i) ? Ws.has(i) : Qu(i)) || (t || it(r, "get", i), e) ? o : M(o) ? a && br(i) ? o : o.value : J(o) ? t ? Qs(o) : js(o) : o;
  };
}
const nl = /* @__PURE__ */ rl();
function rl(t = !1) {
  return function(n, r, i, s) {
    let a = n[r];
    if ($t(a) && M(a) && !M(i))
      return !1;
    if (!t && (!Jn(i) && !$t(i) && (a = E(a), i = E(i)), !N(n) && M(a) && !M(i)))
      return a.value = i, !0;
    const o = N(n) && br(r) ? Number(r) < n.length : R(n, r), u = Reflect.set(n, r, i, s);
    return n === E(s) && (o ? Je(i, a) && _t(n, "set", r, i, a) : _t(n, "add", r, i)), u;
  };
}
function il(t, e) {
  const n = R(t, e), r = t[e], i = Reflect.deleteProperty(t, e);
  return i && n && _t(t, "delete", e, void 0, r), i;
}
function sl(t, e) {
  const n = Reflect.has(t, e);
  return (!wr(e) || !Ws.has(e)) && it(t, "has", e), n;
}
function al(t) {
  return it(t, "iterate", N(t) ? "length" : Ft), Reflect.ownKeys(t);
}
const ol = {
  get: Yu,
  set: nl,
  deleteProperty: il,
  has: sl,
  ownKeys: al
}, zs = {
  get: Zu,
  set(t, e) {
    return process.env.NODE_ENV !== "production" && Pi(`Set operation on key "${String(e)}" failed: target is readonly.`, t), !0;
  },
  deleteProperty(t, e) {
    return process.env.NODE_ENV !== "production" && Pi(`Delete operation on key "${String(e)}" failed: target is readonly.`, t), !0;
  }
}, cl = /* @__PURE__ */ at({}, zs, {
  get: tl
}), Ir = (t) => t, un = (t) => Reflect.getPrototypeOf(t);
function Re(t, e, n = !1, r = !1) {
  t = t.__v_raw;
  const i = E(t), s = E(e);
  n || (e !== s && it(i, "get", e), it(i, "get", s));
  const { has: a } = un(i), o = r ? Ir : n ? Pr : _r;
  if (a.call(i, e))
    return o(t.get(e));
  if (a.call(i, s))
    return o(t.get(s));
  t !== i && t.get(e);
}
function Fe(t, e = !1) {
  const n = this.__v_raw, r = E(n), i = E(t);
  return e || (t !== i && it(r, "has", t), it(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
}
function Ue(t, e = !1) {
  return t = t.__v_raw, !e && it(E(t), "iterate", Ft), Reflect.get(t, "size", t);
}
function Oi(t) {
  t = E(t);
  const e = E(this);
  return un(e).has.call(e, t) || (e.add(t), _t(e, "add", t, t)), this;
}
function yi(t, e) {
  e = E(e);
  const n = E(this), { has: r, get: i } = un(n);
  let s = r.call(n, t);
  s ? process.env.NODE_ENV !== "production" && Ks(n, r, t) : (t = E(t), s = r.call(n, t));
  const a = i.call(n, t);
  return n.set(t, e), s ? Je(e, a) && _t(n, "set", t, e, a) : _t(n, "add", t, e), this;
}
function Ri(t) {
  const e = E(this), { has: n, get: r } = un(e);
  let i = n.call(e, t);
  i ? process.env.NODE_ENV !== "production" && Ks(e, n, t) : (t = E(t), i = n.call(e, t));
  const s = r ? r.call(e, t) : void 0, a = e.delete(t);
  return i && _t(e, "delete", t, void 0, s), a;
}
function Fi() {
  const t = E(this), e = t.size !== 0, n = process.env.NODE_ENV !== "production" ? te(t) ? new Map(t) : new Set(t) : void 0, r = t.clear();
  return e && _t(t, "clear", void 0, void 0, n), r;
}
function Be(t, e) {
  return function(r, i) {
    const s = this, a = s.__v_raw, o = E(a), u = e ? Ir : t ? Pr : _r;
    return !t && it(o, "iterate", Ft), a.forEach((l, d) => r.call(i, u(l), u(d), s));
  };
}
function Ve(t, e, n) {
  return function(...r) {
    const i = this.__v_raw, s = E(i), a = te(s), o = t === "entries" || t === Symbol.iterator && a, u = t === "keys" && a, l = i[t](...r), d = n ? Ir : e ? Pr : _r;
    return !e && it(s, "iterate", u ? Xn : Ft), {
      next() {
        const { value: f, done: h } = l.next();
        return h ? { value: f, done: h } : {
          value: o ? [d(f[0]), d(f[1])] : d(f),
          done: h
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function vt(t) {
  return function(...e) {
    if (process.env.NODE_ENV !== "production") {
      const n = e[0] ? `on key "${e[0]}" ` : "";
    }
    return t === "delete" ? !1 : this;
  };
}
function ul() {
  const t = {
    get(s) {
      return Re(this, s);
    },
    get size() {
      return Ue(this);
    },
    has: Fe,
    add: Oi,
    set: yi,
    delete: Ri,
    clear: Fi,
    forEach: Be(!1, !1)
  }, e = {
    get(s) {
      return Re(this, s, !1, !0);
    },
    get size() {
      return Ue(this);
    },
    has: Fe,
    add: Oi,
    set: yi,
    delete: Ri,
    clear: Fi,
    forEach: Be(!1, !0)
  }, n = {
    get(s) {
      return Re(this, s, !0);
    },
    get size() {
      return Ue(this, !0);
    },
    has(s) {
      return Fe.call(this, s, !0);
    },
    add: vt("add"),
    set: vt("set"),
    delete: vt("delete"),
    clear: vt("clear"),
    forEach: Be(!0, !1)
  }, r = {
    get(s) {
      return Re(this, s, !0, !0);
    },
    get size() {
      return Ue(this, !0);
    },
    has(s) {
      return Fe.call(this, s, !0);
    },
    add: vt("add"),
    set: vt("set"),
    delete: vt("delete"),
    clear: vt("clear"),
    forEach: Be(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
    t[s] = Ve(s, !1, !1), n[s] = Ve(s, !0, !1), e[s] = Ve(s, !1, !0), r[s] = Ve(s, !0, !0);
  }), [
    t,
    n,
    e,
    r
  ];
}
const [ll, fl, hl, gl] = /* @__PURE__ */ ul();
function Tr(t, e) {
  const n = e ? t ? gl : hl : t ? fl : ll;
  return (r, i, s) => i === "__v_isReactive" ? !t : i === "__v_isReadonly" ? t : i === "__v_raw" ? r : Reflect.get(R(n, i) && i in r ? n : r, i, s);
}
const dl = {
  get: /* @__PURE__ */ Tr(!1, !1)
}, pl = {
  get: /* @__PURE__ */ Tr(!0, !1)
}, ml = {
  get: /* @__PURE__ */ Tr(!0, !0)
};
function Ks(t, e, n) {
  const r = E(n);
  if (r !== n && e.call(t, r)) {
    const i = Ls(t);
  }
}
const qs = /* @__PURE__ */ new WeakMap(), vl = /* @__PURE__ */ new WeakMap(), Xs = /* @__PURE__ */ new WeakMap(), Js = /* @__PURE__ */ new WeakMap();
function kl(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Sl(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : kl(Ls(t));
}
function js(t) {
  return $t(t) ? t : Er(t, !1, ol, dl, qs);
}
function Qs(t) {
  return Er(t, !0, zs, pl, Xs);
}
function Le(t) {
  return Er(t, !0, cl, ml, Js);
}
function Er(t, e, n, r, i) {
  if (!J(t))
    return process.env.NODE_ENV, t;
  if (t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const s = i.get(t);
  if (s)
    return s;
  const a = Sl(t);
  if (a === 0)
    return t;
  const o = new Proxy(t, a === 2 ? r : n);
  return i.set(t, o), o;
}
function Bt(t) {
  return $t(t) ? Bt(t.__v_raw) : !!(t && t.__v_isReactive);
}
function $t(t) {
  return !!(t && t.__v_isReadonly);
}
function Jn(t) {
  return !!(t && t.__v_isShallow);
}
function je(t) {
  return Bt(t) || $t(t);
}
function E(t) {
  const e = t && t.__v_raw;
  return e ? E(e) : t;
}
function wl(t) {
  return Mu(t, "__v_skip", !0), t;
}
const _r = (t) => J(t) ? js(t) : t, Pr = (t) => J(t) ? Qs(t) : t;
function M(t) {
  return !!(t && t.__v_isRef === !0);
}
function bl(t) {
  return M(t) ? t.value : t;
}
const Cl = {
  get: (t, e, n) => bl(Reflect.get(t, e, n)),
  set: (t, e, n, r) => {
    const i = t[e];
    return M(i) && !M(n) ? (i.value = n, !0) : Reflect.set(t, e, n, r);
  }
};
function Il(t) {
  return Bt(t) ? t : new Proxy(t, Cl);
}
const Vt = [];
function Tl(t) {
  Vt.push(t);
}
function El() {
  Vt.pop();
}
function D(t, ...e) {
  if (process.env.NODE_ENV === "production")
    return;
  Ms();
  const n = Vt.length ? Vt[Vt.length - 1].component : null, r = n && n.appContext.config.warnHandler, i = _l();
  if (r)
    Lt(r, n, 11, [
      t + e.join(""),
      n && n.proxy,
      i.map(({ vnode: s }) => `at <${ha(n, s.type)}>`).join(`
`),
      i
    ]);
  else {
    const s = [`[Vue warn]: ${t}`, ...e];
    i.length && s.push(`
`, ...Pl(i));
  }
  Gs();
}
function _l() {
  let t = Vt[Vt.length - 1];
  if (!t)
    return [];
  const e = [];
  for (; t; ) {
    const n = e[0];
    n && n.vnode === t ? n.recurseCount++ : e.push({
      vnode: t,
      recurseCount: 0
    });
    const r = t.component && t.component.parent;
    t = r && r.vnode;
  }
  return e;
}
function Pl(t) {
  const e = [];
  return t.forEach((n, r) => {
    e.push(...r === 0 ? [] : [`
`], ...Al(n));
  }), e;
}
function Al({ vnode: t, recurseCount: e }) {
  const n = e > 0 ? `... (${e} recursive calls)` : "", r = t.component ? t.component.parent == null : !1, i = ` at <${ha(t.component, t.type, r)}`, s = ">" + n;
  return t.props ? [i, ...xl(t.props), s] : [i + s];
}
function xl(t) {
  const e = [], n = Object.keys(t);
  return n.slice(0, 3).forEach((r) => {
    e.push(...Ys(r, t[r]));
  }), n.length > 3 && e.push(" ..."), e;
}
function Ys(t, e, n) {
  return ot(e) ? (e = JSON.stringify(e), n ? e : [`${t}=${e}`]) : typeof e == "number" || typeof e == "boolean" || e == null ? n ? e : [`${t}=${e}`] : M(e) ? (e = Ys(t, E(e.value), !0), n ? e : [`${t}=Ref<`, e, ">"]) : W(e) ? [`${t}=fn${e.name ? `<${e.name}>` : ""}`] : (e = E(e), n ? e : [`${t}=`, e]);
}
const Zs = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function Lt(t, e, n, r) {
  let i;
  try {
    i = r ? t(...r) : t();
  } catch (s) {
    ta(s, e, n);
  }
  return i;
}
function jn(t, e, n, r) {
  if (W(t)) {
    const s = Lt(t, e, n, r);
    return s && Lu(s) && s.catch((a) => {
      ta(a, e, n);
    }), s;
  }
  const i = [];
  for (let s = 0; s < t.length; s++)
    i.push(jn(t[s], e, n, r));
  return i;
}
function ta(t, e, n, r = !0) {
  const i = e ? e.vnode : null;
  if (e) {
    let s = e.parent;
    const a = e.proxy, o = process.env.NODE_ENV !== "production" ? Zs[n] : n;
    for (; s; ) {
      const l = s.ec;
      if (l) {
        for (let d = 0; d < l.length; d++)
          if (l[d](t, a, o) === !1)
            return;
      }
      s = s.parent;
    }
    const u = e.appContext.config.errorHandler;
    if (u) {
      Lt(u, null, 10, [t, a, o]);
      return;
    }
  }
  Nl(t, n, i, r);
}
function Nl(t, e, n, r = !0) {
  if (process.env.NODE_ENV !== "production") {
    const i = Zs[e];
    if (n && Tl(n), D(`Unhandled error${i ? ` during execution of ${i}` : ""}`), n && El(), r)
      throw t;
  }
}
let Qe = !1, Qn = !1;
const st = [];
let bt = 0;
const ee = [];
let ut = null, wt = 0;
const ea = /* @__PURE__ */ Promise.resolve();
let Ar = null;
const Ol = 100;
function yl(t) {
  const e = Ar || ea;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function Rl(t) {
  let e = bt + 1, n = st.length;
  for (; e < n; ) {
    const r = e + n >>> 1;
    we(st[r]) < t ? e = r + 1 : n = r;
  }
  return e;
}
function xr(t) {
  (!st.length || !st.includes(t, Qe && t.allowRecurse ? bt + 1 : bt)) && (t.id == null ? st.push(t) : st.splice(Rl(t.id), 0, t), na());
}
function na() {
  !Qe && !Qn && (Qn = !0, Ar = ea.then(ia));
}
function ra(t) {
  N(t) ? ee.push(...t) : (!ut || !ut.includes(t, t.allowRecurse ? wt + 1 : wt)) && ee.push(t), na();
}
function Fl(t) {
  if (ee.length) {
    const e = [...new Set(ee)];
    if (ee.length = 0, ut) {
      ut.push(...e);
      return;
    }
    for (ut = e, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), ut.sort((n, r) => we(n) - we(r)), wt = 0; wt < ut.length; wt++)
      process.env.NODE_ENV !== "production" && sa(t, ut[wt]) || ut[wt]();
    ut = null, wt = 0;
  }
}
const we = (t) => t.id == null ? 1 / 0 : t.id, Ul = (t, e) => {
  const n = we(t) - we(e);
  if (n === 0) {
    if (t.pre && !e.pre)
      return -1;
    if (e.pre && !t.pre)
      return 1;
  }
  return n;
};
function ia(t) {
  Qn = !1, Qe = !0, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), st.sort(Ul);
  const e = process.env.NODE_ENV !== "production" ? (n) => sa(t, n) : Sr;
  try {
    for (bt = 0; bt < st.length; bt++) {
      const n = st[bt];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && e(n))
          continue;
        Lt(n, null, 14);
      }
    }
  } finally {
    bt = 0, st.length = 0, Fl(t), Qe = !1, Ar = null, (st.length || ee.length) && ia(t);
  }
}
function sa(t, e) {
  if (!t.has(e))
    t.set(e, 1);
  else {
    const n = t.get(e);
    if (n > Ol) {
      const r = e.ownerInstance, i = r && fa(r.type);
      return D(`Maximum recursive updates exceeded${i ? ` in component <${i}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`), !0;
    } else
      t.set(e, n + 1);
  }
}
const fe = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (Wu().__VUE_HMR_RUNTIME__ = {
  createRecord: yn(Bl),
  rerender: yn(Vl),
  reload: yn(Ll)
});
const Ye = /* @__PURE__ */ new Map();
function Bl(t, e) {
  return Ye.has(t) ? !1 : (Ye.set(t, {
    initialDef: de(e),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function de(t) {
  return ga(t) ? t.__vccOpts : t;
}
function Vl(t, e) {
  const n = Ye.get(t);
  !n || (n.initialDef.render = e, [...n.instances].forEach((r) => {
    e && (r.render = e, de(r.type).render = e), r.renderCache = [], r.update();
  }));
}
function Ll(t, e) {
  const n = Ye.get(t);
  if (!n)
    return;
  e = de(e), Ui(n.initialDef, e);
  const r = [...n.instances];
  for (const i of r) {
    const s = de(i.type);
    fe.has(s) || (s !== n.initialDef && Ui(s, e), fe.add(s)), i.appContext.optionsCache.delete(i.type), i.ceReload ? (fe.add(s), i.ceReload(e.styles), fe.delete(s)) : i.parent ? xr(i.parent.update) : i.appContext.reload ? i.appContext.reload() : typeof window < "u" && window.location.reload();
  }
  ra(() => {
    for (const i of r)
      fe.delete(de(i.type));
  });
}
function Ui(t, e) {
  at(t, e);
  for (const n in t)
    n !== "__file" && !(n in e) && delete t[n];
}
function yn(t) {
  return (e, n) => {
    try {
      return t(e, n);
    } catch {
    }
  };
}
let Ct = null, Hl = null;
const $l = (t) => t.__isSuspense;
function Dl(t, e) {
  e && e.pendingBranch ? N(t) ? e.effects.push(...t) : e.effects.push(t) : ra(t);
}
const He = {};
function Ml(t, e, { immediate: n, deep: r, flush: i, onTrack: s, onTrigger: a } = lt) {
  process.env.NODE_ENV !== "production" && !e && (n !== void 0 && D('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), r !== void 0 && D('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const o = (I) => {
    D("Invalid watch source: ", I, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, u = ne;
  let l, d = !1, f = !1;
  if (M(t) ? (l = () => t.value, d = Jn(t)) : Bt(t) ? (l = () => t, r = !0) : N(t) ? (f = !0, d = t.some((I) => Bt(I) || Jn(I)), l = () => t.map((I) => {
    if (M(I))
      return I.value;
    if (Bt(I))
      return Yt(I);
    if (W(I))
      return Lt(I, u, 2);
    process.env.NODE_ENV !== "production" && o(I);
  })) : W(t) ? e ? l = () => Lt(t, u, 2) : l = () => {
    if (!(u && u.isUnmounted))
      return h && h(), jn(t, u, 3, [m]);
  } : (l = Sr, process.env.NODE_ENV !== "production" && o(t)), e && r) {
    const I = l;
    l = () => Yt(I());
  }
  let h, m = (I) => {
    h = C.onStop = () => {
      Lt(I, u, 4);
    };
  }, v = f ? new Array(t.length).fill(He) : He;
  const w = () => {
    if (!!C.active)
      if (e) {
        const I = C.run();
        (r || d || (f ? I.some((b, y) => Je(b, v[y])) : Je(I, v))) && (h && h(), jn(e, u, 3, [
          I,
          v === He ? void 0 : f && v[0] === He ? [] : v,
          m
        ]), v = I);
      } else
        C.run();
  };
  w.allowRecurse = !!e;
  let k;
  i === "sync" ? k = w : i === "post" ? k = () => Li(w, u && u.suspense) : (w.pre = !0, u && (w.id = u.uid), k = () => xr(w));
  const C = new Ju(l, k);
  return process.env.NODE_ENV !== "production" && (C.onTrack = s, C.onTrigger = a), e ? n ? w() : v = C.run() : i === "post" ? Li(C.run.bind(C), u && u.suspense) : C.run(), () => {
    C.stop(), u && u.scope && Uu(u.scope.effects, C);
  };
}
function Gl(t, e, n) {
  const r = this.proxy, i = ot(t) ? t.includes(".") ? Wl(r, t) : () => r[t] : t.bind(r, r);
  let s;
  W(e) ? s = e : (s = e.handler, n = e);
  const a = ne;
  Hi(this);
  const o = Ml(i, s.bind(r), n);
  return a ? Hi(a) : ff(), o;
}
function Wl(t, e) {
  const n = e.split(".");
  return () => {
    let r = t;
    for (let i = 0; i < n.length && r; i++)
      r = r[n[i]];
    return r;
  };
}
function Yt(t, e) {
  if (!J(t) || t.__v_skip || (e = e || /* @__PURE__ */ new Set(), e.has(t)))
    return t;
  if (e.add(t), M(t))
    Yt(t.value, e);
  else if (N(t))
    for (let n = 0; n < t.length; n++)
      Yt(t[n], e);
  else if (Vu(t) || te(t))
    t.forEach((n) => {
      Yt(n, e);
    });
  else if ($u(t))
    for (const n in t)
      Yt(t[n], e);
  return t;
}
const zl = Symbol(), Yn = (t) => t ? hf(t) ? gf(t) || t.proxy : Yn(t.parent) : null, pe = /* @__PURE__ */ at(/* @__PURE__ */ Object.create(null), {
  $: (t) => t,
  $el: (t) => t.vnode.el,
  $data: (t) => t.data,
  $props: (t) => process.env.NODE_ENV !== "production" ? Le(t.props) : t.props,
  $attrs: (t) => process.env.NODE_ENV !== "production" ? Le(t.attrs) : t.attrs,
  $slots: (t) => process.env.NODE_ENV !== "production" ? Le(t.slots) : t.slots,
  $refs: (t) => process.env.NODE_ENV !== "production" ? Le(t.refs) : t.refs,
  $parent: (t) => Yn(t.parent),
  $root: (t) => Yn(t.root),
  $emit: (t) => t.emit,
  $options: (t) => __VUE_OPTIONS_API__ ? Jl(t) : t.type,
  $forceUpdate: (t) => t.f || (t.f = () => xr(t.update)),
  $nextTick: (t) => t.n || (t.n = yl.bind(t.proxy)),
  $watch: (t) => __VUE_OPTIONS_API__ ? Gl.bind(t) : Sr
}), Kl = (t) => t === "_" || t === "$", Rn = (t, e) => t !== lt && !t.__isScriptSetup && R(t, e), ql = {
  get({ _: t }, e) {
    const { ctx: n, setupState: r, data: i, props: s, accessCache: a, type: o, appContext: u } = t;
    if (process.env.NODE_ENV !== "production" && e === "__isVue")
      return !0;
    let l;
    if (e[0] !== "$") {
      const m = a[e];
      if (m !== void 0)
        switch (m) {
          case 1:
            return r[e];
          case 2:
            return i[e];
          case 4:
            return n[e];
          case 3:
            return s[e];
        }
      else {
        if (Rn(r, e))
          return a[e] = 1, r[e];
        if (i !== lt && R(i, e))
          return a[e] = 2, i[e];
        if ((l = t.propsOptions[0]) && R(l, e))
          return a[e] = 3, s[e];
        if (n !== lt && R(n, e))
          return a[e] = 4, n[e];
        (!__VUE_OPTIONS_API__ || Xl) && (a[e] = 0);
      }
    }
    const d = pe[e];
    let f, h;
    if (d)
      return e === "$attrs" && (it(t, "get", e), process.env.NODE_ENV !== "production" && void 0), d(t);
    if ((f = o.__cssModules) && (f = f[e]))
      return f;
    if (n !== lt && R(n, e))
      return a[e] = 4, n[e];
    if (h = u.config.globalProperties, R(h, e))
      return h[e];
    process.env.NODE_ENV !== "production" && Ct && (!ot(e) || e.indexOf("__v") !== 0) && (i !== lt && Kl(e[0]) && R(i, e) ? D(`Property ${JSON.stringify(e)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : t === Ct && D(`Property ${JSON.stringify(e)} was accessed during render but is not defined on instance.`));
  },
  set({ _: t }, e, n) {
    const { data: r, setupState: i, ctx: s } = t;
    return Rn(i, e) ? (i[e] = n, !0) : process.env.NODE_ENV !== "production" && i.__isScriptSetup && R(i, e) ? (D(`Cannot mutate <script setup> binding "${e}" from Options API.`), !1) : r !== lt && R(r, e) ? (r[e] = n, !0) : R(t.props, e) ? (process.env.NODE_ENV !== "production" && D(`Attempting to mutate prop "${e}". Props are readonly.`), !1) : e[0] === "$" && e.slice(1) in t ? (process.env.NODE_ENV !== "production" && D(`Attempting to mutate public property "${e}". Properties starting with $ are reserved and readonly.`), !1) : (process.env.NODE_ENV !== "production" && e in t.appContext.config.globalProperties ? Object.defineProperty(s, e, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : s[e] = n, !0);
  },
  has({ _: { data: t, setupState: e, accessCache: n, ctx: r, appContext: i, propsOptions: s } }, a) {
    let o;
    return !!n[a] || t !== lt && R(t, a) || Rn(e, a) || (o = s[0]) && R(o, a) || R(r, a) || R(pe, a) || R(i.config.globalProperties, a);
  },
  defineProperty(t, e, n) {
    return n.get != null ? t._.accessCache[e] = 0 : R(n, "value") && this.set(t, e, n.value, null), Reflect.defineProperty(t, e, n);
  }
};
process.env.NODE_ENV !== "production" && (ql.ownKeys = (t) => (D("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(t)));
let Xl = !0;
function Jl(t) {
  const e = t.type, { mixins: n, extends: r } = e, { mixins: i, optionsCache: s, config: { optionMergeStrategies: a } } = t.appContext, o = s.get(e);
  let u;
  return o ? u = o : !i.length && !n && !r ? u = e : (u = {}, i.length && i.forEach((l) => Ze(u, l, a, !0)), Ze(u, e, a)), J(e) && s.set(e, u), u;
}
function Ze(t, e, n, r = !1) {
  const { mixins: i, extends: s } = e;
  s && Ze(t, s, n, !0), i && i.forEach((a) => Ze(t, a, n, !0));
  for (const a in e)
    if (r && a === "expose")
      process.env.NODE_ENV !== "production" && D('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const o = jl[a] || n && n[a];
      t[a] = o ? o(t[a], e[a]) : e[a];
    }
  return t;
}
const jl = {
  data: Bi,
  props: Rt,
  emits: Rt,
  methods: Rt,
  computed: Rt,
  beforeCreate: $,
  created: $,
  beforeMount: $,
  mounted: $,
  beforeUpdate: $,
  updated: $,
  beforeDestroy: $,
  beforeUnmount: $,
  destroyed: $,
  unmounted: $,
  activated: $,
  deactivated: $,
  errorCaptured: $,
  serverPrefetch: $,
  components: Rt,
  directives: Rt,
  watch: Yl,
  provide: Bi,
  inject: Ql
};
function Bi(t, e) {
  return e ? t ? function() {
    return at(W(t) ? t.call(this, this) : t, W(e) ? e.call(this, this) : e);
  } : e : t;
}
function Ql(t, e) {
  return Rt(Vi(t), Vi(e));
}
function Vi(t) {
  if (N(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++)
      e[t[n]] = t[n];
    return e;
  }
  return t;
}
function $(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function Rt(t, e) {
  return t ? at(at(/* @__PURE__ */ Object.create(null), t), e) : e;
}
function Yl(t, e) {
  if (!t)
    return e;
  if (!e)
    return t;
  const n = at(/* @__PURE__ */ Object.create(null), t);
  for (const r in e)
    n[r] = $(t[r], e[r]);
  return n;
}
function Zl() {
  return {
    app: null,
    config: {
      isNativeTag: yu,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
const Li = Dl, tf = (t) => t.__isTeleport, aa = Symbol(process.env.NODE_ENV !== "production" ? "Fragment" : void 0), ef = Symbol(process.env.NODE_ENV !== "production" ? "Text" : void 0), nf = Symbol(process.env.NODE_ENV !== "production" ? "Comment" : void 0);
Symbol(process.env.NODE_ENV !== "production" ? "Static" : void 0);
let Zt = null;
function rf(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
const sf = (...t) => ua(...t), oa = "__vInternal", ca = ({ key: t }) => t ?? null, We = ({ ref: t, ref_key: e, ref_for: n }) => t != null ? ot(t) || M(t) || W(t) ? { i: Ct, r: t, k: e, f: !!n } : t : null;
function af(t, e = null, n = null, r = 0, i = null, s = t === aa ? 0 : 1, a = !1, o = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && ca(e),
    ref: e && We(e),
    scopeId: Hl,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: r,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: Ct
  };
  return o ? (Nr(u, n), s & 128 && t.normalize(u)) : n && (u.shapeFlag |= ot(n) ? 8 : 16), process.env.NODE_ENV !== "production" && u.key !== u.key && D("VNode created with invalid key (NaN). VNode type:", u.type), !a && Zt && (u.patchFlag > 0 || s & 6) && u.patchFlag !== 32 && Zt.push(u), u;
}
const of = process.env.NODE_ENV !== "production" ? sf : ua;
function ua(t, e = null, n = null, r = 0, i = null, s = !1) {
  if ((!t || t === zl) && (process.env.NODE_ENV !== "production" && !t && D(`Invalid vnode type when creating vnode: ${t}.`), t = nf), rf(t)) {
    const o = tn(t, e, !0);
    return n && Nr(o, n), !s && Zt && (o.shapeFlag & 6 ? Zt[Zt.indexOf(t)] = o : Zt.push(o)), o.patchFlag |= -2, o;
  }
  if (ga(t) && (t = t.__vccOpts), e) {
    e = cf(e);
    let { class: o, style: u } = e;
    o && !ot(o) && (e.class = kr(o)), J(u) && (je(u) && !N(u) && (u = at({}, u)), e.style = vr(u));
  }
  const a = ot(t) ? 1 : $l(t) ? 128 : tf(t) ? 64 : J(t) ? 4 : W(t) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && a & 4 && je(t) && (t = E(t), D("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `
Component that was made reactive: `, t)), af(t, e, n, r, i, a, s, !0);
}
function cf(t) {
  return t ? je(t) || oa in t ? at({}, t) : t : null;
}
function tn(t, e, n = !1) {
  const { props: r, ref: i, patchFlag: s, children: a } = t, o = e ? lf(r || {}, e) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: o,
    key: o && ca(o),
    ref: e && e.ref ? n && i ? N(i) ? i.concat(We(e)) : [i, We(e)] : We(e) : i,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && s === -1 && N(a) ? a.map(la) : a,
    target: t.target,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    patchFlag: e && t.type !== aa ? s === -1 ? 16 : s | 16 : s,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: t.transition,
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && tn(t.ssContent),
    ssFallback: t.ssFallback && tn(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx
  };
}
function la(t) {
  const e = tn(t);
  return N(t.children) && (e.children = t.children.map(la)), e;
}
function uf(t = " ", e = 0) {
  return of(ef, null, t, e);
}
function Nr(t, e) {
  let n = 0;
  const { shapeFlag: r } = t;
  if (e == null)
    e = null;
  else if (N(e))
    n = 16;
  else if (typeof e == "object")
    if (r & 65) {
      const i = e.default;
      i && (i._c && (i._d = !1), Nr(t, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = e._;
      !i && !(oa in e) ? e._ctx = Ct : i === 3 && Ct && (Ct.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else
    W(e) ? (e = { default: e, _ctx: Ct }, n = 32) : (e = String(e), r & 64 ? (n = 16, e = [uf(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function lf(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    for (const i in r)
      if (i === "class")
        e.class !== r.class && (e.class = kr([e.class, r.class]));
      else if (i === "style")
        e.style = vr([e.style, r.style]);
      else if (Fu(i)) {
        const s = e[i], a = r[i];
        a && s !== a && !(N(s) && s.includes(a)) && (e[i] = s ? [].concat(s, a) : a);
      } else
        i !== "" && (e[i] = r[i]);
  }
  return e;
}
Zl();
let ne = null;
const Hi = (t) => {
  ne = t, t.scope.on();
}, ff = () => {
  ne && ne.scope.off(), ne = null;
};
function hf(t) {
  return t.vnode.shapeFlag & 4;
}
function gf(t) {
  if (t.exposed)
    return t.exposeProxy || (t.exposeProxy = new Proxy(Il(wl(t.exposed)), {
      get(e, n) {
        if (n in e)
          return e[n];
        if (n in pe)
          return pe[n](t);
      },
      has(e, n) {
        return n in e || n in pe;
      }
    }));
}
const df = /(?:^|[-_])(\w)/g, pf = (t) => t.replace(df, (e) => e.toUpperCase()).replace(/[-_]/g, "");
function fa(t, e = !0) {
  return W(t) ? t.displayName || t.name : t.name || e && t.__name;
}
function ha(t, e, n = !1) {
  let r = fa(e);
  if (!r && e.__file) {
    const i = e.__file.match(/([^/\\]+)\.\w+$/);
    i && (r = i[1]);
  }
  if (!r && t && t.parent) {
    const i = (s) => {
      for (const a in s)
        if (s[a] === e)
          return a;
    };
    r = i(t.components || t.parent.type.components) || i(t.appContext.components);
  }
  return r ? pf(r) : n ? "App" : "Anonymous";
}
function ga(t) {
  return W(t) && "__vccOpts" in t;
}
Symbol(process.env.NODE_ENV !== "production" ? "ssrContext" : "");
function Fn(t) {
  return !!(t && t.__v_isShallow);
}
function mf() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const t = { style: "color:#3ba776" }, e = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, r = { style: "color:#9d288c" }, i = {
    header(f) {
      return J(f) ? f.__isVue ? ["div", t, "VueInstance"] : M(f) ? [
        "div",
        {},
        ["span", t, d(f)],
        "<",
        o(f.value),
        ">"
      ] : Bt(f) ? [
        "div",
        {},
        ["span", t, Fn(f) ? "ShallowReactive" : "Reactive"],
        "<",
        o(f),
        `>${$t(f) ? " (readonly)" : ""}`
      ] : $t(f) ? [
        "div",
        {},
        ["span", t, Fn(f) ? "ShallowReadonly" : "Readonly"],
        "<",
        o(f),
        ">"
      ] : null : null;
    },
    hasBody(f) {
      return f && f.__isVue;
    },
    body(f) {
      if (f && f.__isVue)
        return [
          "div",
          {},
          ...s(f.$)
        ];
    }
  };
  function s(f) {
    const h = [];
    f.type.props && f.props && h.push(a("props", E(f.props))), f.setupState !== lt && h.push(a("setup", f.setupState)), f.data !== lt && h.push(a("data", E(f.data)));
    const m = u(f, "computed");
    m && h.push(a("computed", m));
    const v = u(f, "inject");
    return v && h.push(a("injected", v)), h.push([
      "div",
      {},
      [
        "span",
        {
          style: r.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: f }]
    ]), h;
  }
  function a(f, h) {
    return h = at({}, h), Object.keys(h).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        f
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(h).map((m) => [
          "div",
          {},
          ["span", r, m + ": "],
          o(h[m], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function o(f, h = !0) {
    return typeof f == "number" ? ["span", e, f] : typeof f == "string" ? ["span", n, JSON.stringify(f)] : typeof f == "boolean" ? ["span", r, f] : J(f) ? ["object", { object: h ? E(f) : f }] : ["span", n, String(f)];
  }
  function u(f, h) {
    const m = f.type;
    if (W(m))
      return;
    const v = {};
    for (const w in f.ctx)
      l(m, w, h) && (v[w] = f.ctx[w]);
    return v;
  }
  function l(f, h, m) {
    const v = f[m];
    if (N(v) && v.includes(h) || J(v) && h in v || f.extends && l(f.extends, h, m) || f.mixins && f.mixins.some((w) => l(w, h, m)))
      return !0;
  }
  function d(f) {
    return Fn(f) ? "ShallowRef" : f.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(i) : window.devtoolsFormatters = [i];
}
function vf() {
  mf();
}
process.env.NODE_ENV !== "production" && vf();
function kf(t) {
  const e = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"], n = t % 12;
  return e[n];
}
function Eh(t) {
  const e = Math.floor(t / 12) - 2;
  return kf(t) + e.toString();
}
const Sf = /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i, wf = {
  cbb: -2,
  cb: -1,
  c: 0,
  "c#": 1,
  cx: 2,
  dbb: 0,
  db: 1,
  d: 2,
  "d#": 3,
  dx: 4,
  ebb: 2,
  eb: 3,
  e: 4,
  "e#": 5,
  ex: 6,
  fbb: 3,
  fb: 4,
  f: 5,
  "f#": 6,
  fx: 7,
  gbb: 5,
  gb: 6,
  g: 7,
  "g#": 8,
  gx: 9,
  abb: 7,
  ab: 8,
  a: 9,
  "a#": 10,
  ax: 11,
  bbb: 9,
  bb: 10,
  b: 11,
  "b#": 12,
  bx: 13
};
function _h(t) {
  const e = Sf.exec(t);
  if (!e)
    return -1;
  const n = e[1], r = e[2];
  return wf[n.toLowerCase()] + (parseInt(r, 10) + 2) * 12;
}
function $i(t, e, n, r) {
  return `${t} // ${e} // ${n} // ${r}`;
}
function bf(t, e, n) {
  return `${t} // ${e} // ${n}`;
}
function Ph(t) {
  const e = en(t);
  return bf(
    e.manufacturerName,
    e.pluginFormatName,
    e.name
  );
}
function en(t) {
  const e = t.split(" // ");
  if (e.length < 4)
    throw new Error("Invalid audio plugin tuneflow id.");
  return {
    name: e[2],
    manufacturerName: e[0],
    pluginFormatName: e[1],
    pluginVersion: e[3]
  };
}
function Cf(t, e) {
  return t === e;
}
function If(t, e) {
  const n = en(t), r = en(e);
  if (_.keys(n).length !== _.keys(r).length)
    return !1;
  for (const i of _.keys(n))
    if (i !== "pluginVersion" && n[i] !== r[i])
      return !1;
  return !0;
}
class Ah {
  tempoInfos = [];
  currentTempoIndex = 0;
  ticksPerSecondAtTempoTick = {};
  constructor(e, n) {
    for (const r of e)
      this.tempoInfos.push({
        ticks: r.getTicks(),
        time: r.getTime()
      }), this.ticksPerSecondAtTempoTick[r.getTicks()] = r.getBpm() * n / 60;
  }
  secondsToTick(e) {
    let n = this.tempoInfos[this.currentTempoIndex];
    for (; this.tempoInfos[this.currentTempoIndex + 1] && this.tempoInfos[this.currentTempoIndex + 1].time <= e; )
      this.currentTempoIndex += 1, n = this.tempoInfos[this.currentTempoIndex];
    for (; n.time > e && this.currentTempoIndex > 0; )
      this.currentTempoIndex -= 1, n = this.tempoInfos[this.currentTempoIndex];
    n.time > e && (n = this.tempoInfos[0]);
    const r = e - n.time, i = this.ticksPerSecondAtTempoTick[n.ticks];
    return Math.round(n.ticks + r * i);
  }
  tickToSeconds(e) {
    let n = this.tempoInfos[this.currentTempoIndex];
    for (; this.tempoInfos[this.currentTempoIndex + 1] && this.tempoInfos[this.currentTempoIndex + 1].ticks <= e; )
      this.currentTempoIndex += 1, n = this.tempoInfos[this.currentTempoIndex];
    for (; n.ticks > e && this.currentTempoIndex > 0; )
      this.currentTempoIndex -= 1, n = this.tempoInfos[this.currentTempoIndex];
    n.ticks > e && (n = this.tempoInfos[0]);
    const r = e - n.ticks, i = this.ticksPerSecondAtTempoTick[n.ticks];
    return n.time + r / i;
  }
}
function Tf(t) {
  return t > -100 ? Math.exp((t - 6) * (1 / 20)) : 0;
}
function xh(t) {
  return t <= 0 ? -100 : 20 * Math.log10(t);
}
function Nh(t) {
  return t > 0 ? 20 * Math.log(t) + 6 : -100;
}
function Oh(t) {
  return t > 0 ? Math.pow(10, (20 * Math.log(t) + 6) * (1 / 20)) : 0;
}
function yh(t) {
  return t > 0 ? Math.exp((20 * Math.log10(t) - 6) * (1 / 20)) : 0;
}
function Rh(t, e, n, r, i) {
  return (t - e) / (n - e) * (i - r) + r;
}
function Fh(t) {
  return 440 * Math.pow(2, (t - 69) / 12);
}
function Uh(t) {
  return je(t) || M(t) ? E(t) : t;
}
var Ef = /* @__PURE__ */ ((t) => (t[t.BassDrum2 = 35] = "BassDrum2", t[t.BassDrum1 = 36] = "BassDrum1", t[t.SideStick = 37] = "SideStick", t[t.SnareDrum1 = 38] = "SnareDrum1", t[t.HandClap = 39] = "HandClap", t[t.SnareDrum2 = 40] = "SnareDrum2", t[t.LowTom2 = 41] = "LowTom2", t[t.ClosedHiHat = 42] = "ClosedHiHat", t[t.LowTom1 = 43] = "LowTom1", t[t.PedalHiHat = 44] = "PedalHiHat", t[t.MidTom2 = 45] = "MidTom2", t[t.OpenHiHat = 46] = "OpenHiHat", t[t.MidTom1 = 47] = "MidTom1", t[t.HighTom2 = 48] = "HighTom2", t[t.CrashCymbal1 = 49] = "CrashCymbal1", t[t.HighTom1 = 50] = "HighTom1", t[t.RideCymbal1 = 51] = "RideCymbal1", t[t.ChineseCymbal = 52] = "ChineseCymbal", t[t.RideBell = 53] = "RideBell", t[t.Tambourine = 54] = "Tambourine", t[t.SplashCymbal = 55] = "SplashCymbal", t[t.Cowbell = 56] = "Cowbell", t[t.CrashCymbal2 = 57] = "CrashCymbal2", t[t.VibraSlap = 58] = "VibraSlap", t[t.RideCymbal2 = 59] = "RideCymbal2", t[t.HighBongo = 60] = "HighBongo", t[t.LowBongo = 61] = "LowBongo", t[t.MuteHighConga = 62] = "MuteHighConga", t[t.OpenHighConga = 63] = "OpenHighConga", t[t.LowConga = 64] = "LowConga", t[t.HighTimbale = 65] = "HighTimbale", t[t.LowTimbale = 66] = "LowTimbale", t[t.HighAgogo = 67] = "HighAgogo", t[t.LowAgogo = 68] = "LowAgogo", t[t.Cabasa = 69] = "Cabasa", t[t.Maracas = 70] = "Maracas", t[t.ShortWhistle = 71] = "ShortWhistle", t[t.LongWhistle = 72] = "LongWhistle", t[t.ShortGuiro = 73] = "ShortGuiro", t[t.LongGuiro = 74] = "LongGuiro", t[t.Claves = 75] = "Claves", t[t.HighWoodBlock = 76] = "HighWoodBlock", t[t.LowWoodBlock = 77] = "LowWoodBlock", t[t.MuteCuica = 78] = "MuteCuica", t[t.OpenCuica = 79] = "OpenCuica", t[t.MuteTriangle = 80] = "MuteTriangle", t[t.OpenTriangle = 81] = "OpenTriangle", t[t.Shaker = 82] = "Shaker", t))(Ef || {});
const _f = ["wav", "mp3", "aiff", "flac", "ogg"], Bh = ["mid", "midi", "lrc", ..._f], Zn = 480;
class ln {
  name;
  manufacturerName;
  pluginFormatName;
  pluginVersion;
  isEnabled = !0;
  localInstanceIdInternal;
  base64StatesInternal;
  constructor(e, n, r, i) {
    this.name = e, this.manufacturerName = n, this.pluginFormatName = r, this.pluginVersion = i, this.localInstanceIdInternal = ln.generateAudioPluginInstanceIdInternal();
  }
  getTuneflowId() {
    return $i(
      this.manufacturerName,
      this.pluginFormatName,
      this.name,
      this.pluginVersion
    );
  }
  clone(e) {
    const n = e.createAudioPlugin(this.getTuneflowId());
    return n.setIsEnabled(this.isEnabled), n;
  }
  matchesTfId(e) {
    return Cf(e, this.getTuneflowId());
  }
  matchesTfIdIgnoreVersion(e) {
    return If(e, this.getTuneflowId());
  }
  getInstanceId() {
    return this.localInstanceIdInternal;
  }
  toJSON() {
    return {
      name: this.name,
      manufacturerName: this.manufacturerName,
      pluginFormatName: this.pluginFormatName,
      pluginVersion: this.pluginVersion,
      isEnabled: this.isEnabled
    };
  }
  setIsEnabled(e) {
    this.isEnabled = e;
  }
  getIsEnabled() {
    return this.isEnabled;
  }
  setBase64States(e) {
    this.base64StatesInternal = e;
  }
  getBase64States() {
    return this.base64StatesInternal;
  }
  static generateAudioPluginInstanceIdInternal() {
    return on(10);
  }
  static DEFAULT_SYNTH_TFID = $i("TuneFlow", "VST3", "TFSynth", "1.0.0");
}
class It {
  pitch;
  velocity;
  startTick;
  endTick;
  idInternal;
  clipInternal;
  constructor({
    pitch: e,
    velocity: n,
    startTick: r,
    endTick: i,
    id: s,
    clip: a
  }) {
    this.pitch = e, this.velocity = n, this.startTick = r, this.endTick = i, this.idInternal = s, this.clipInternal = a;
  }
  getPitch() {
    return this.pitch;
  }
  setPitch(e) {
    if (!It.isValidPitch(e))
      throw new Error(`Invalid pitch ${e}`);
    this.pitch = e;
  }
  getVelocity() {
    return this.velocity;
  }
  setVelocity(e) {
    this.velocity = Math.max(Math.min(e, 127), 0);
  }
  getStartTick() {
    return this.startTick;
  }
  getEndTick() {
    return this.endTick;
  }
  setStartTick(e) {
    this.startTick = Math.round(e);
  }
  setEndTick(e) {
    this.endTick = Math.round(e);
  }
  equals(e) {
    return this.startTick === e.getStartTick() && this.endTick === e.getEndTick() && this.pitch === e.getPitch() && this.velocity === e.getVelocity();
  }
  deleteFromParent() {
    !this.clipInternal || this.clipInternal.deleteNote(this);
  }
  moveNote(e) {
    if (e === 0)
      return;
    const n = this.clipInternal;
    n && n.deleteNote(this), this.startTick = Math.max(0, this.startTick + e), this.endTick = this.endTick + e, !!this.isRangeValid() && n && n.orderedInsertNote(n.getRawNotes(), this);
  }
  adjustLeft(e) {
    if (e === 0)
      return;
    const n = this.clipInternal;
    n && n.deleteNote(this), this.startTick += e, !!this.isRangeValid() && n && n.orderedInsertNote(n.getRawNotes(), this);
  }
  adjustLeftTo(e) {
    this.adjustLeft(e - this.startTick);
  }
  adjustRight(e) {
    this.endTick += e, this.isRangeValid() || this.deleteFromParent();
  }
  adjustRightTo(e) {
    this.adjustRight(e - this.endTick);
  }
  isRangeValid() {
    return It.isNoteRangeValid(this.startTick, this.endTick);
  }
  transpose(e) {
    this.setPitch(Math.min(127, Math.max(0, this.pitch + e)));
  }
  static isValidPitch(e) {
    return e >= 0 && e <= 127 && Number.isInteger(e);
  }
  static isNoteRangeValid(e, n) {
    return n >= 0 && e <= n && Number.isInteger(e) && Number.isInteger(n);
  }
  static isNoteVelocityValid(e) {
    return e >= 0 && e <= 127 && Number.isInteger(e);
  }
  getClip() {
    return this.clipInternal;
  }
  adjustPitch(e) {
    this.pitch = this.pitch + e, It.isValidPitch(this.pitch) || this.deleteFromParent();
  }
  getId() {
    return this.idInternal;
  }
}
var ge = /* @__PURE__ */ ((t) => (t[t.MIDI_CLIP = 1] = "MIDI_CLIP", t[t.AUDIO_CLIP = 2] = "AUDIO_CLIP", t))(ge || {});
class A {
  song;
  track;
  id;
  notes;
  clipStartTick = 0;
  clipEndTick = 0;
  nextNoteIdInternal = 1;
  type;
  audioClipData;
  static MIN_AUDIO_SPEED_RATIO = 0.05;
  static MAX_AUDIO_SPEED_RATIO = 20;
  static MIN_AUDIO_PITCH_OFFSET = -24;
  static MAX_AUDIO_PITCH_OFFSET = 24;
  constructor({
    song: e,
    type: n,
    clipStartTick: r,
    id: i = A.generateClipIdInternal(),
    track: s = void 0,
    clipEndTick: a = void 0,
    audioClipData: o = void 0
  }) {
    if (this.song = e, this.track = s, this.id = i, this.type = n, this.notes = [], n === 2) {
      if (!o)
        throw new Error("Audio clip data must be provided for audio clips.");
      this.audioClipData = {
        audioFilePath: o.audioFilePath,
        startTick: o.startTick,
        duration: o.duration,
        audioData: o.audioData && o.audioData.data ? {
          ...o.audioData
        } : void 0,
        pitchOffset: o.pitchOffset,
        speedRatio: o.speedRatio
      }, r = _.isNumber(r) ? Math.max(r, o.startTick) : o.startTick;
      const u = this.getAudioEndTick();
      (!_.isNumber(a) || u < a) && (a = u), this.clipStartTick = r, this.clipEndTick = a;
    } else if (n === 1) {
      if (this.clipStartTick = r, !_.isNumber(a))
        throw new Error("clip end tick must be provided when creating MIDI clip.");
      this.clipEndTick = a;
    }
  }
  getId() {
    return this.id;
  }
  getType() {
    return this.type;
  }
  getAudioClipData() {
    return this.audioClipData;
  }
  setAudioFile(e, n, r) {
    this.audioClipData ? (this.audioClipData.audioFilePath = e, this.audioClipData.startTick = n, this.audioClipData.duration = r, this.audioClipData.speedRatio = 1, this.audioClipData.pitchOffset = 0) : this.audioClipData = {
      audioFilePath: e,
      startTick: n,
      duration: r
    };
  }
  getNotes() {
    return A.getNotesInRange(this.notes, this.clipStartTick, this.clipEndTick);
  }
  getRawNotes() {
    return this.notes;
  }
  clearNotes() {
    this.notes = [], this.nextNoteIdInternal = 1;
  }
  getDuration() {
    return this.song.tickToSeconds(this.clipEndTick) - this.song.tickToSeconds(this.clipStartTick);
  }
  getAudioDuration() {
    if (!(this.type !== 2 || !this.audioClipData))
      return this.audioClipData.duration / this.getAudioSpeedRatio();
  }
  getRawAudioDuration() {
    if (!(this.type !== 2 || !this.audioClipData))
      return this.audioClipData.duration;
  }
  getAudioSpeedRatio() {
    return this.type !== 2 || !this.audioClipData || !this.audioClipData.speedRatio ? 1 : this.audioClipData.speedRatio;
  }
  timeStretchFromClipLeft(e, n = !0) {
    if (e >= this.clipEndTick) {
      this.deleteFromParent(!0);
      return;
    }
    const r = (this.clipEndTick - e) / (this.clipEndTick - this.clipStartTick);
    n && this.track && this.track.resolveClipConflictInternal(
      this.getId(),
      Math.min(this.clipStartTick, e),
      this.clipEndTick
    ), this.getType() === 1 ? (this.timeStretchMidiClipImpl(r, this.clipEndTick), this.moveClipTo(e, !1)) : this.getType() === 2 && this.timeStretchAudioClipImpl(e, this.clipEndTick, this.clipEndTick);
  }
  timeStretchFromClipRight(e, n = !0) {
    if (e <= this.clipStartTick) {
      this.deleteFromParent(!0);
      return;
    }
    if (n && this.track && this.track.resolveClipConflictInternal(
      this.getId(),
      this.clipStartTick,
      Math.max(this.clipEndTick, e)
    ), this.getType() === 1) {
      const r = (e - this.clipStartTick) / (this.clipEndTick - this.clipStartTick);
      this.timeStretchMidiClipImpl(r, this.clipStartTick);
    } else
      this.getType() === 2 && this.timeStretchAudioClipImpl(this.clipStartTick, e, this.clipStartTick);
  }
  timeStretchMidiClipImpl(e, n) {
    for (const r of this.getRawNotes())
      r.setStartTick(
        A.calculateScaledNewTick(r.getStartTick(), n, e)
      ), r.setEndTick(A.calculateScaledNewTick(r.getEndTick(), n, e));
    this.clipStartTick = A.calculateScaledNewTick(
      this.clipStartTick,
      n,
      e
    ), this.clipEndTick = A.calculateScaledNewTick(this.clipEndTick, n, e);
  }
  timeStretchAudioClipImpl(e, n, r) {
    if (this.type !== 2)
      return;
    const i = this.audioClipData, s = _.isNumber(i.speedRatio) && i.speedRatio ? i.speedRatio : 1, a = this.song.tickToSeconds(this.clipEndTick) - this.song.tickToSeconds(this.clipStartTick), u = (this.song.tickToSeconds(n) - this.song.tickToSeconds(e)) / a, l = s / u;
    A.validateAudioSpeedRatio(l);
    const d = this.song.tickToSeconds(i.startTick), f = this.song.tickToSeconds(r), h = (f - d) * u, m = f - h, v = this.song.secondsToTick(m);
    i.speedRatio = l, i.startTick = v, this.clipStartTick = e, this.clipEndTick = n;
  }
  static validateAudioSpeedRatio(e) {
    if (!_.isNumber(e) || e < A.MIN_AUDIO_SPEED_RATIO || e > A.MAX_AUDIO_SPEED_RATIO)
      throw new Error(
        `Speed ratio must be >= ${A.MIN_AUDIO_SPEED_RATIO} and <= ${A.MAX_AUDIO_SPEED_RATIO}, you are changing to ${e}`
      );
  }
  static calculateScaledNewTick(e, n, r) {
    const i = (n - e) * r;
    return Math.round(n - i);
  }
  getAudioPitchOffset() {
    return this.type !== 2 || !this.audioClipData || !_.isNumber(this.audioClipData.pitchOffset) ? 0 : this.audioClipData.pitchOffset;
  }
  setAudioPitchOffset(e) {
    this.type === 2 && (A.validateAudioPitchOffset(e), this.audioClipData.pitchOffset = e);
  }
  static validateAudioPitchOffset(e) {
    if (!_.isNumber(e) || e < A.MIN_AUDIO_PITCH_OFFSET || e > A.MAX_AUDIO_PITCH_OFFSET)
      throw new Error(
        `Pitch offset must be >= ${A.MIN_AUDIO_PITCH_OFFSET} and <= ${A.MAX_AUDIO_PITCH_OFFSET}, you are setting to ${e}`
      );
  }
  getClipStartTick() {
    return this.clipStartTick;
  }
  getClipEndTick() {
    return this.clipEndTick;
  }
  getTrack() {
    return this.track;
  }
  createNote({
    pitch: e,
    velocity: n,
    startTick: r,
    endTick: i,
    updateClipRange: s = !0,
    resolveClipConflict: a = !0
  }) {
    if (this.type !== 1 || !It.isValidPitch(e) || !It.isNoteRangeValid(r, i) || !It.isNoteVelocityValid(n))
      return null;
    const o = new It({
      pitch: e,
      velocity: n,
      startTick: r,
      endTick: i,
      id: this.getNextNoteIdInternal()
    });
    return r < this.clipStartTick && s && this.adjustClipLeft(r, a), i > this.clipEndTick && s && this.adjustClipRight(i, a), this.orderedInsertNote(this.notes, o), o;
  }
  getNoteIndexInternal(e) {
    const n = x.lt(
      this.notes,
      e,
      (r, i) => r.getStartTick() - i.getStartTick()
    );
    for (let r = Math.max(0, n); r < this.notes.length; r += 1) {
      const i = this.notes[r];
      if (i && i === e)
        return r;
      if (i && i.getStartTick() > e.getStartTick())
        break;
    }
    return -1;
  }
  deleteNote(e) {
    const n = this.getNoteIndexInternal(e);
    n >= 0 && this.deleteNoteAt(n);
  }
  deleteNoteAt(e) {
    const n = this.notes[e];
    n && (n.clipInternal = null, this.notes.splice(e, 1));
  }
  orderedInsertNote(e, n) {
    if (this.type !== 1 || n.getClip() === this)
      return;
    const r = x.ge(
      e,
      n,
      (i, s) => i.getStartTick() - s.getStartTick()
    );
    r < 0 ? e.push(n) : e.splice(r, 0, n), n.clipInternal = this;
  }
  adjustClipLeft(e, n = !0) {
    e = Math.max(0, e), this.type === 2 && this.audioClipData && (e = Math.max(e, this.audioClipData.startTick)), e > this.clipEndTick ? this.deleteFromParent(!0) : (n && this.track && this.track.resolveClipConflictInternal(
      this.getId(),
      Math.min(this.clipStartTick, e),
      this.clipEndTick
    ), this.clipStartTick = e);
  }
  adjustClipRight(e, n = !0) {
    if (this.type === 2) {
      const r = this.getAudioEndTick();
      _.isNumber(r) && (e = Math.min(e, r));
    }
    e < this.clipStartTick || e < 0 ? this.deleteFromParent(!0) : (n && this.track && this.track.resolveClipConflictInternal(
      this.getId(),
      this.clipStartTick,
      Math.max(this.clipEndTick, e)
    ), this.clipEndTick = e);
  }
  moveClip(e, n) {
    const r = Math.max(0, this.clipStartTick + e), i = this.clipEndTick + e;
    if (i < 0) {
      this.deleteFromParent(!0);
      return;
    }
    if (this.track && this.track.resolveClipConflictInternal(this.getId(), r, i), this.track) {
      const o = this.track.getClipIndex(this);
      this.track.deleteClipAt(o, !1);
    }
    const s = this.clipStartTick, a = this.clipEndTick;
    if (this.type === 1) {
      this.clipStartTick = r, this.clipEndTick = i;
      for (const o of this.notes)
        o.setStartTick(o.getStartTick() + e), o.setEndTick(o.getEndTick() + e);
    } else if (this.type === 2) {
      if (!this.audioClipData)
        throw new Error("Cannot move audio clip without audio data");
      const o = this.song, u = o.tickToSeconds(this.audioClipData.startTick), l = o.tickToSeconds(s), f = o.tickToSeconds(a) - l, h = l - u, m = o.tickToSeconds(this.clipStartTick + e), v = m - h, w = m + f;
      if (this.clipStartTick = r, this.clipEndTick = o.secondsToTick(w), this.audioClipData.startTick = o.secondsToTick(v), this.clipEndTick < 0) {
        this.deleteFromParent(!0);
        return;
      }
    }
    this.track && (this.track.orderedInsertClipInternal(this), n && this.track.getAutomation().moveAllPointsWithinRange(
      s,
      a,
      e,
      0
    ));
  }
  moveClipTo(e, n) {
    const r = e - this.getClipStartTick();
    this.moveClip(r, n);
  }
  deleteFromParent(e) {
    this.track && (this.track.deleteClip(this, e), this.track = void 0);
  }
  getNotesByIds(e) {
    const n = new Set(e), r = [];
    for (const i of this.notes)
      n.has(i.getId()) && r.push(i);
    return r;
  }
  getAudioStartTick() {
    if (!(this.type !== 2 || !this.audioClipData))
      return this.audioClipData.startTick;
  }
  getAudioEndTick() {
    if (this.type !== 2 || !this.audioClipData)
      return;
    const e = this.getAudioDuration();
    if (!_.isNumber(e))
      return;
    const n = this.song.tickToSeconds(this.audioClipData.startTick);
    return this.song.secondsToTick(n + e);
  }
  static getNotesInRange(e, n, r) {
    return A.getNotesInRangeImpl(
      e,
      n,
      r,
      (i) => ({ getStartTick: () => i }),
      (i) => i.getStartTick(),
      (i) => i.getEndTick()
    );
  }
  static getNotesInRangeImpl(e, n, r, i, s, a) {
    let o = Math.max(
      0,
      x.lt(
        e,
        i(n),
        (l, d) => s(l) - s(d)
      )
    );
    for (; e[o] && !A.isNoteInClip(
      s(e[o]),
      a(e[o]),
      n,
      r
    ); )
      o += 1;
    if (o >= e.length)
      return [];
    let u = Math.min(
      e.length - 1,
      x.gt(
        e,
        i(r),
        (l, d) => s(l) - s(d)
      )
    );
    for (; e[u] && !A.isNoteInClip(
      s(e[u]),
      a(e[u]),
      n,
      r
    ); )
      u -= 1;
    return u < 0 ? [] : u < o ? [] : e.slice(o, u + 1);
  }
  static getOverlappingNotesWithinRangeImpl(e, n, r, i, s) {
    const a = [];
    for (const o of e) {
      const u = i(o);
      if (u > r)
        break;
      s(o) > n && u < r && a.push(o);
    }
    return a;
  }
  static isNoteInClip(e, n, r, i) {
    return (e >= r || r === 0 && e <= 0) && e < i && n > e;
  }
  static getNotePlayableRange(e, n, r, i) {
    if (!A.isNoteInClip(e, n, r, i))
      return null;
    const s = Math.max(e, r), a = Math.min(n, i);
    return s > a ? null : {
      startTick: s,
      endTick: a
    };
  }
  trimConflictPartInternal(e, n) {
    const r = Math.max(e, this.getClipStartTick()), i = Math.min(n, this.getClipEndTick());
    if (!(r > i) && !(r > this.getClipEndTick() || i < this.getClipStartTick())) {
      if (i >= this.getClipEndTick() && r <= this.getClipStartTick()) {
        this.deleteFromParent(!0);
        return;
      }
      if (i < this.getClipEndTick() && r > this.getClipStartTick()) {
        const s = i + 1, a = this.getClipEndTick();
        if (this.adjustClipRight(r - 1, !1), this.track) {
          if (this.type === 1) {
            const o = this.track.createMIDIClip({
              clipStartTick: s,
              clipEndTick: a
            }), u = A.getNotesInRange(this.notes, s, a);
            for (const l of u)
              o.createNote({
                pitch: l.getPitch(),
                velocity: l.getVelocity(),
                startTick: l.getStartTick(),
                endTick: l.getEndTick(),
                updateClipRange: !1,
                resolveClipConflict: !1
              });
          } else if (this.type === 2) {
            const o = this.audioClipData;
            this.track.createAudioClip({
              clipStartTick: s,
              clipEndTick: a,
              audioClipData: {
                audioFilePath: o.audioFilePath,
                startTick: o.startTick,
                duration: o.duration
              }
            });
          }
        }
        return;
      }
      r > this.getClipStartTick() && r <= this.getClipEndTick() ? this.adjustClipRight(r - 1, !1) : i < this.getClipEndTick() && i >= this.getClipStartTick() && this.adjustClipLeft(i + 1, !1);
    }
  }
  getNextNoteIdInternal() {
    const e = this.nextNoteIdInternal;
    return this.nextNoteIdInternal >= 2147483647 ? this.nextNoteIdInternal = 1 : this.nextNoteIdInternal += 1, e;
  }
  static generateClipIdInternal() {
    return on(10);
  }
}
var tr = /* @__PURE__ */ ((t) => (t[t.UNDEFINED = 0] = "UNDEFINED", t[t.VOLUME = 1] = "VOLUME", t[t.PAN = 2] = "PAN", t[t.AUDIO_PLUGIN = 3] = "AUDIO_PLUGIN", t))(tr || {});
class nt {
  type;
  pluginInstanceId;
  paramId;
  constructor(e, n, r) {
    this.type = e, this.pluginInstanceId = n, this.paramId = r;
  }
  getType() {
    return this.type;
  }
  setType(e) {
    this.type = e;
  }
  getPluginInstanceId() {
    return this.pluginInstanceId;
  }
  setPluginInstanceId(e) {
    this.pluginInstanceId = e;
  }
  getParamId() {
    return this.paramId;
  }
  setParamId(e) {
    this.paramId = e;
  }
  equals(e) {
    return nt.areAutomationTargetsEqual(
      this.getType(),
      e.getType(),
      this.getPluginInstanceId(),
      e.getPluginInstanceId(),
      this.getParamId(),
      e.getParamId()
    );
  }
  clone() {
    return new nt(this.type, this.pluginInstanceId, this.paramId);
  }
  toTfAutomationTargetId() {
    return nt.encodeAutomationTarget(this.type, this.pluginInstanceId, this.paramId);
  }
  static fromTfAutomationTargetId(e) {
    return nt.decodeAutomationTarget(e);
  }
  static encodeAutomationTarget(e, n, r) {
    return e === 3 ? `${e}^^${n}^^${r}` : `${e}`;
  }
  static decodeAutomationTarget(e) {
    const n = e.split("^^");
    if (n.length === 0)
      throw new Error(`Invalid automation target id: ${e}`);
    const r = Number(n[0]);
    return n.length > 2 ? new nt(r, n[1], n[2]) : new nt(r);
  }
  static areAutomationTargetsEqual(e, n, r, i, s, a) {
    return nt.encodeAutomationTarget(e, r, s) === nt.encodeAutomationTarget(n, i, a);
  }
}
class re {
  points = [];
  disabled = !1;
  nextPointIdInternal = 1;
  getDisabled() {
    return this.disabled;
  }
  setDisabled(e) {
    this.disabled = e;
  }
  getPoints() {
    return this.points;
  }
  getPointsInRange(e, n) {
    return re.getPointsInRangeImpl(this.points, e, n);
  }
  static getPointsInRangeImpl(e, n, r) {
    const i = x.ge(
      e,
      { tick: n },
      (a, o) => a.tick - o.tick
    ), s = [];
    for (let a = i; a < e.length; a += 1) {
      const o = e[a];
      if (o.tick > r)
        break;
      s.push(o);
    }
    return s;
  }
  addPoint(e, n, r = !1) {
    const i = {
      tick: e,
      value: Math.max(0, Math.min(1, n)),
      id: this.getNextPointIdInternal()
    };
    return re.orderedInsertPointInternal(this.points, i, r), i;
  }
  removePoints(e) {
    const n = new Set(e);
    for (let r = this.points.length - 1; r >= 0; r -= 1) {
      const i = this.points[r];
      n.has(i.id) && this.points.splice(r, 1);
    }
  }
  removePointsInRange(e, n) {
    const r = x.ge(
      this.points,
      { tick: e },
      (s, a) => s.tick - a.tick
    );
    if (r >= this.points.length)
      return;
    let i = r;
    for (; i + 1 < this.points.length && this.points[i + 1].tick <= n; )
      i += 1;
    this.points.splice(r, i - r + 1);
  }
  movePointsInRange(e, n, r, i, s = !0) {
    const a = this.getPointsInRange(e, n);
    this.movePoints(
      a.map((o) => o.id),
      r,
      i,
      s
    );
  }
  moveAllPoints(e, n, r = !0) {
    this.movePoints(
      this.points.map((i) => i.id),
      e,
      n,
      r
    );
  }
  movePoints(e, n, r, i = !0) {
    if (e.length === 0)
      return;
    const s = new Set(e);
    let a, o;
    const u = [];
    for (let l = 0; l < this.points.length; l += 1) {
      const d = this.points[l];
      !s.has(d.id) || (u.push(d), a === void 0 && (a = l), o = l);
    }
    if (!(a === void 0 || o === void 0)) {
      if (i) {
        if (n < 0) {
          const l = Math.max(
            0,
            this.points[a].tick + n
          ), d = x.gt(
            this.points,
            { tick: l },
            (f, h) => f.tick - h.tick
          );
          d < a && this.points.splice(d, a - d);
        } else if (n > 0) {
          const l = this.points[o].tick + n, d = x.lt(
            this.points,
            { tick: l },
            (f, h) => f.tick - h.tick
          );
          d > o && this.points.splice(o + 1, d - o);
        }
      }
      for (const l of u)
        l.tick = Math.max(0, l.tick + n), l.value = Math.max(0, Math.min(1, l.value + r));
      Math.abs(n) > 0 && this.points.sort((l, d) => l.tick - d.tick);
    }
  }
  clone() {
    const e = new re();
    e.setDisabled(this.disabled);
    for (const n of this.points)
      e.addPoint(n.tick, n.value, !1);
    return e;
  }
  getNextPointIdInternal() {
    const e = this.nextPointIdInternal;
    return this.nextPointIdInternal >= 2147483647 ? this.nextPointIdInternal = 1 : this.nextPointIdInternal += 1, e;
  }
  static orderedInsertPointInternal(e, n, r = !1) {
    const i = x.ge(
      e,
      n,
      (s, a) => s.tick - a.tick
    );
    for (; r && e[i] && e[i].tick === n.tick; )
      e.splice(i, 1);
    e.splice(i, 0, n);
  }
}
class Or {
  targets = [];
  targetValues = {};
  getAutomationTargets() {
    return this.targets;
  }
  getAutomationTargetValues() {
    return this.targetValues;
  }
  getOrCreateAutomationValueById(e) {
    return this.targetValues[e] || (this.targetValues[e] = new re()), this.targetValues[e];
  }
  getAutomationValueById(e) {
    return this.targetValues[e];
  }
  getAutomationValueByTarget(e) {
    const n = e.toTfAutomationTargetId();
    return this.getAutomationValueById(n);
  }
  addAutomation(e, n = 0) {
    _.isNumber(n) || (n = 0), this.targets.splice(n, 0, e);
    const r = e.toTfAutomationTargetId();
    this.getAutomationValueById(r) || (this.targetValues[r] = new re());
  }
  removeAutomation(e) {
    for (let r = this.targets.length - 1; r >= 0; r -= 1)
      this.targets[r].equals(e) && this.targets.splice(r, 1);
    const n = e.toTfAutomationTargetId();
    delete this.targetValues[n];
  }
  removeAutomationOfPlugin(e) {
    for (let n = this.targets.length - 1; n >= 0; n -= 1) {
      const r = this.targets[n];
      r.getPluginInstanceId() === e && this.removeAutomation(r);
    }
    for (const n of _.keys(this.targetValues)) {
      const r = nt.decodeAutomationTarget(n);
      r.getPluginInstanceId() === e && this.removeAutomation(r);
    }
  }
  removeAllPointsWithinRange(e, n) {
    for (const r of _.keys(this.targetValues))
      this.targetValues[r].removePointsInRange(e, n);
  }
  moveAllPointsWithinRange(e, n, r, i) {
    for (const s of _.keys(this.targetValues))
      this.targetValues[s].movePointsInRange(
        e,
        n,
        r,
        i,
        !1
      );
  }
  clone() {
    const e = new Or();
    for (const n of this.targets)
      e.addAutomation(n.clone());
    for (const n of _.keys(this.targetValues)) {
      const r = this.targetValues[n];
      e.targetValues[n] = r.clone();
    }
    return e;
  }
}
var Qt = /* @__PURE__ */ ((t) => (t[t.MIDI_TRACK = 1] = "MIDI_TRACK", t[t.AUDIO_TRACK = 2] = "AUDIO_TRACK", t[t.MASTER_TRACK = 3] = "MASTER_TRACK", t[t.AUX_TRACK = 4] = "AUX_TRACK", t))(Qt || {});
class rt {
  static MAX_NUM_EFFECTS_PLUGINS = 5;
  static MAX_NUM_SENDS = 5;
  insturment;
  clips;
  suggestedInstruments;
  uuid;
  volume;
  solo;
  muted;
  rank;
  pan;
  samplerPlugin;
  audioPlugins = {};
  song;
  automation;
  type;
  auxTrackData;
  sends = {};
  output;
  constructor({
    type: e,
    song: n,
    uuid: r = rt.generateTrackIdInternal(),
    clips: i = [],
    instrument: s,
    suggestedInstruments: a = [],
    volume: o = Tf(0),
    solo: u = !1,
    muted: l = !1,
    rank: d = 0,
    pan: f = 0
  }) {
    this.song = n, this.type = e, s ? this.insturment = s : e === 1 && (this.insturment = new me({
      program: 0,
      isDrum: !1
    })), e === 4 && (this.auxTrackData = new Af(), this.auxTrackData.setInputBusRank(1)), this.clips = [...i], this.suggestedInstruments = [...a], this.uuid = r, this.volume = o, this.solo = u, this.muted = l, this.rank = d, this.pan = f, this.automation = new Or();
  }
  getType() {
    return this.type;
  }
  getSong() {
    return this.song;
  }
  getInstrument() {
    return this.insturment;
  }
  setInstrument({
    program: e,
    isDrum: n
  }) {
    this.type === 1 && (this.insturment = new me({ program: e, isDrum: n }));
  }
  getSuggestedInstruments() {
    return this.suggestedInstruments;
  }
  createSuggestedInstrument({
    program: e,
    isDrum: n
  }) {
    if (this.type !== 1)
      return;
    const r = new me({ program: e, isDrum: n });
    return this.suggestedInstruments.push(r), r;
  }
  clearSuggestedInstruments() {
    this.suggestedInstruments = [];
  }
  getId() {
    return this.uuid;
  }
  setId(e) {
    this.uuid = e;
  }
  getVolume() {
    return this.volume;
  }
  setVolume(e) {
    this.volume = e;
  }
  setPan(e) {
    this.pan = e;
  }
  getPan() {
    return this.pan;
  }
  getSolo() {
    return this.solo;
  }
  setSolo(e) {
    this.solo = e, e && this.muted && (this.muted = !1);
  }
  getMuted() {
    return this.muted;
  }
  setMuted(e) {
    this.muted = e;
  }
  getRank() {
    return this.rank;
  }
  createAudioPlugin(e) {
    const n = en(e);
    return new ln(
      n.name,
      n.manufacturerName,
      n.pluginFormatName,
      n.pluginVersion
    );
  }
  getSamplerPlugin() {
    return this.samplerPlugin;
  }
  setSamplerPlugin(e, n = !0) {
    if (this.type !== 1)
      return;
    const r = !this.samplerPlugin && !!e || !e && !!this.samplerPlugin || !!e && !!this.samplerPlugin && !e.matchesTfId(this.samplerPlugin.getTuneflowId()), i = this.samplerPlugin;
    this.samplerPlugin = e, r && i && n && this.automation.removeAutomationOfPlugin(i.getInstanceId());
  }
  getAudioPluginCount() {
    return _.keys(this.audioPlugins).length;
  }
  getAudioPluginAt(e) {
    return this.audioPlugins[e];
  }
  setAudioPluginAt(e, n, r = !0) {
    if (e > rt.MAX_NUM_EFFECTS_PLUGINS - 1)
      throw new Error(
        `The maximum number of effects plugin per track is ${rt.MAX_NUM_EFFECTS_PLUGINS}`
      );
    const i = this.audioPlugins ? this.audioPlugins[e] : void 0, s = !i && !!n || !n && !!i || !!n && !!i && !n.matchesTfId(i.getTuneflowId());
    this.audioPlugins[e] = n, s && i && r && this.automation.removeAutomationOfPlugin(i.getInstanceId());
  }
  removeAudioPluginAt(e) {
    const n = this.audioPlugins ? this.audioPlugins[e] : void 0;
    delete this.audioPlugins[e], n && this.automation.removeAutomationOfPlugin(n.getInstanceId());
  }
  getPluginByInstanceId(e) {
    if (this.samplerPlugin && this.samplerPlugin.getInstanceId() === e)
      return this.samplerPlugin;
    if (this.audioPlugins)
      for (const n of _.keys(this.audioPlugins)) {
        const r = this.audioPlugins[n];
        if (!!r && r.getInstanceId() === e)
          return r;
      }
    return null;
  }
  getTrackStartTick() {
    return !this.clips || this.clips.length === 0 ? 0 : this.clips[0].getClipStartTick();
  }
  getTrackEndTick() {
    return !this.clips || this.clips.length === 0 ? 0 : this.clips[this.clips.length - 1].getClipEndTick();
  }
  getClipById(e) {
    for (const n of this.clips)
      if (n.getId() === e)
        return n;
    return null;
  }
  getClips() {
    return this.clips;
  }
  getClipsOverlappingWith(e, n) {
    const r = [], i = x.lt(
      this.clips,
      { getClipStartTick: () => e },
      (s, a) => s.getClipStartTick() - a.getClipStartTick()
    );
    for (let s = Math.max(i, 0); s < this.clips.length; s += 1) {
      const a = this.clips[s];
      if (!(a.getClipEndTick() < e)) {
        if (a.getClipStartTick() > n)
          break;
        r.push(a);
      }
    }
    return r;
  }
  createMIDIClip({
    clipStartTick: e,
    clipEndTick: n = void 0,
    insertClip: r = !0
  }) {
    if (!_.isNumber(e))
      throw new Error("clipStartTick must be specified when creating a clip.");
    const i = n ?? e + 1;
    if (i < e)
      throw new Error(
        `clipEndTick must be greater or equal to clipStartTick, got clipStartTick: ${e}, clipEndTick: ${n}`
      );
    const s = new A({
      id: A.generateClipIdInternal(),
      type: ge.MIDI_CLIP,
      song: this.song,
      track: void 0,
      clipStartTick: e,
      clipEndTick: i
    });
    return r && this.insertClip(s), s;
  }
  createAudioClip({
    clipStartTick: e,
    audioClipData: n,
    clipEndTick: r,
    insertClip: i = !0
  }) {
    if (!_.isNumber(e))
      throw new Error("clipStartTick must be specified when creating a clip.");
    const s = new A({
      id: A.generateClipIdInternal(),
      type: ge.AUDIO_CLIP,
      song: this.song,
      track: void 0,
      clipStartTick: e,
      clipEndTick: r,
      audioClipData: n
    });
    return i && this.insertClip(s), s;
  }
  insertClip(e) {
    if (e.getTrack() !== this)
      e.getTrack() && e.deleteFromParent(!1), e.track = this;
    else
      return;
    this.resolveClipConflictInternal(e.getId(), e.getClipStartTick(), e.getClipEndTick()), this.orderedInsertClipInternal(e);
  }
  cloneClip(e) {
    if (e.getType() === ge.MIDI_CLIP) {
      const n = this.createMIDIClip({
        clipStartTick: e.getClipStartTick(),
        clipEndTick: e.getClipEndTick(),
        insertClip: !1
      });
      for (const r of e.getRawNotes())
        n.createNote({
          pitch: r.getPitch(),
          velocity: r.getVelocity(),
          startTick: r.getStartTick(),
          endTick: r.getEndTick(),
          updateClipRange: !1,
          resolveClipConflict: !1
        });
      return n;
    } else {
      if (e.getType() === ge.AUDIO_CLIP)
        return this.createAudioClip({
          clipStartTick: e.getClipStartTick(),
          clipEndTick: e.getClipEndTick(),
          audioClipData: e.getAudioClipData(),
          insertClip: !1
        });
      throw new Error(`Unsupported clip type ${e.getType()}`);
    }
  }
  getClipIndex(e) {
    const n = x.le(
      this.clips,
      e,
      (r, i) => r.getClipStartTick() - i.getClipStartTick()
    );
    return this.clips.indexOf(e, n);
  }
  deleteClip(e, n) {
    const r = this.getClipIndex(e);
    this.deleteClipAt(r, n);
  }
  deleteClipAt(e, n) {
    if (!(e < 0)) {
      if (n) {
        const r = this.clips[e];
        if (!r)
          return;
        this.automation.removeAllPointsWithinRange(r.getClipStartTick(), r.getClipEndTick());
      }
      this.clips.splice(e, 1);
    }
  }
  deleteFromParent() {
    this.song.removeTrack(this.getId());
  }
  getAutomation() {
    return this.automation;
  }
  setAutomation(e) {
    this.automation = e.clone();
  }
  hasAnyAutomation() {
    return this.automation.getAutomationTargets().length > 0 && !_.isEmpty(this.automation.getAutomationTargetValues());
  }
  getAuxTrackData() {
    return this.auxTrackData;
  }
  getSendCount() {
    return _.keys(this.sends).length;
  }
  getSendAt(e) {
    return this.sends[e];
  }
  removeSendAt(e) {
    delete this.sends[e];
  }
  setSendAt(e, n) {
    if (e >= rt.MAX_NUM_SENDS)
      throw new Error(`Maximum of supported sends is ${rt.MAX_NUM_SENDS}`);
    if (this.type === 3)
      throw new Error("Cannot add send for master track");
    this.sends[e] = n;
  }
  getOutput() {
    return this.output;
  }
  setOutput({ type: e, trackId: n = void 0 }) {
    if (this.type === 3)
      throw new Error("Master track can only output to the default device.");
    if (e !== yr.Track)
      throw new Error("Non-track output type is not supported yet.");
    if (n === this.getId())
      throw new Error("Cannot set output to the track itself.");
    this.output = new xf({
      type: e,
      trackId: n
    });
  }
  removeOutput() {
    delete this.output;
  }
  getVisibleNotes() {
    const e = [];
    for (const n of this.getClips())
      for (const r of n.getNotes())
        e.push(r);
    return e.sort((n, r) => n.getStartTick() - r.getStartTick());
  }
  static generateTrackIdInternal() {
    return on();
  }
  resolveClipConflictInternal(e, n, r) {
    const i = this.getClipsOverlappingWith(n, r);
    for (const s of i)
      s.getId() !== e && s.trimConflictPartInternal(n, r);
  }
  orderedInsertClipInternal(e) {
    const n = x.ge(
      this.clips,
      e,
      (r, i) => r.getClipStartTick() - i.getClipStartTick()
    );
    this.clips.splice(n, 0, e);
  }
}
var Pf = /* @__PURE__ */ ((t) => (t[t.Undefined = 0] = "Undefined", t[t.PreFader = 1] = "PreFader", t[t.PostFader = 2] = "PostFader", t))(Pf || {});
class nn {
  outputBusRank;
  gainLevel;
  position;
  muted;
  constructor({
    outputBusRank: e,
    gainLevel: n,
    position: r = 2,
    muted: i = !1
  }) {
    this.outputBusRank = e, this.gainLevel = nn.checkGainLevel(n), this.position = r, this.muted = _.isBoolean(i) ? i : !1;
  }
  static checkGainLevel(e) {
    if (e < 0 || e > 1)
      throw new Error(`Send gain level ${e} out of valid range 0 - 1.`);
    return e;
  }
  getOutputBusRank() {
    return this.outputBusRank;
  }
  setOutputBusRank(e) {
    this.outputBusRank = e;
  }
  getGainLevel() {
    return this.gainLevel;
  }
  setGainLevel(e) {
    this.gainLevel = nn.checkGainLevel(e);
  }
  getPosition() {
    return this.position;
  }
  setPosition(e) {
    this.position = e;
  }
  getMuted() {
    return this.muted;
  }
  setMuted(e) {
    this.muted = e;
  }
}
class me {
  program;
  isDrum;
  constructor({
    program: e,
    isDrum: n
  }) {
    this.program = e, this.isDrum = n;
  }
  getProgram() {
    return this.program;
  }
  getIsDrum() {
    return this.isDrum;
  }
  clone() {
    return new me({
      program: this.program,
      isDrum: this.isDrum
    });
  }
}
class Af {
  inputBusRank;
  setInputBusRank(e) {
    this.inputBusRank = e;
  }
  getInputBusRank() {
    return this.inputBusRank;
  }
  removeInputBus() {
    delete this.inputBusRank;
  }
}
var yr = /* @__PURE__ */ ((t) => (t[t.Undefined = 0] = "Undefined", t[t.Device = 1] = "Device", t[t.Track = 2] = "Track", t))(yr || {});
class xf {
  type;
  trackId;
  constructor({ type: e, trackId: n = void 0 }) {
    this.type = e, this.trackId = n;
  }
  getType() {
    return this.type;
  }
  getTrackId() {
    return this.trackId;
  }
}
var Nf = /* @__PURE__ */ ((t) => (t[t.AcousticGrandPiano = 0] = "AcousticGrandPiano", t[t.BrightAcousticPiano = 1] = "BrightAcousticPiano", t[t.ElectricGrandPiano = 2] = "ElectricGrandPiano", t[t.HonkyTonkPiano = 3] = "HonkyTonkPiano", t[t.ElectricPiano1 = 4] = "ElectricPiano1", t[t.ElectricPiano2 = 5] = "ElectricPiano2", t[t.Harpsichord = 6] = "Harpsichord", t[t.Clavinet = 7] = "Clavinet", t[t.Celesta = 8] = "Celesta", t[t.Glockenspiel = 9] = "Glockenspiel", t[t.Musicalbox = 10] = "Musicalbox", t[t.Vibraphone = 11] = "Vibraphone", t[t.Marimba = 12] = "Marimba", t[t.Xylophone = 13] = "Xylophone", t[t.TubularBell = 14] = "TubularBell", t[t.Dulcimer = 15] = "Dulcimer", t[t.DrawbarOrgan = 16] = "DrawbarOrgan", t[t.PercussiveOrgan = 17] = "PercussiveOrgan", t[t.RockOrgan = 18] = "RockOrgan", t[t.Churchorgan = 19] = "Churchorgan", t[t.Reedorgan = 20] = "Reedorgan", t[t.Accordion = 21] = "Accordion", t[t.Harmonica = 22] = "Harmonica", t[t.TangoAccordion = 23] = "TangoAccordion", t[t.AcousticGuitarNylon = 24] = "AcousticGuitarNylon", t[t.AcousticGuitarSteel = 25] = "AcousticGuitarSteel", t[t.ElectricGuitarJazz = 26] = "ElectricGuitarJazz", t[t.ElectricGuitarClean = 27] = "ElectricGuitarClean", t[t.ElectricGuitarMuted = 28] = "ElectricGuitarMuted", t[t.OverdrivenGuitar = 29] = "OverdrivenGuitar", t[t.DistortionGuitar = 30] = "DistortionGuitar", t[t.Guitarharmonics = 31] = "Guitarharmonics", t[t.AcousticBass = 32] = "AcousticBass", t[t.ElectricBassFinger = 33] = "ElectricBassFinger", t[t.ElectricBassPick = 34] = "ElectricBassPick", t[t.FretlessBass = 35] = "FretlessBass", t[t.SlapBass1 = 36] = "SlapBass1", t[t.SlapBass2 = 37] = "SlapBass2", t[t.SynthBass1 = 38] = "SynthBass1", t[t.SynthBass2 = 39] = "SynthBass2", t[t.Violin = 40] = "Violin", t[t.Viola = 41] = "Viola", t[t.Cello = 42] = "Cello", t[t.Contrabass = 43] = "Contrabass", t[t.TremoloStrings = 44] = "TremoloStrings", t[t.PizzicatoStrings = 45] = "PizzicatoStrings", t[t.OrchestralHarp = 46] = "OrchestralHarp", t[t.Timpani = 47] = "Timpani", t[t.StringEnsemble1 = 48] = "StringEnsemble1", t[t.StringEnsemble2 = 49] = "StringEnsemble2", t[t.SynthStrings1 = 50] = "SynthStrings1", t[t.SynthStrings2 = 51] = "SynthStrings2", t[t.VoiceAahs = 52] = "VoiceAahs", t[t.VoiceOohs = 53] = "VoiceOohs", t[t.SynthVoice = 54] = "SynthVoice", t[t.OrchestraHit = 55] = "OrchestraHit", t[t.Trumpet = 56] = "Trumpet", t[t.Trombone = 57] = "Trombone", t[t.Tuba = 58] = "Tuba", t[t.MutedTrumpet = 59] = "MutedTrumpet", t[t.Frenchhorn = 60] = "Frenchhorn", t[t.BrassSection = 61] = "BrassSection", t[t.SynthBrass1 = 62] = "SynthBrass1", t[t.SynthBrass2 = 63] = "SynthBrass2", t[t.SopranoSax = 64] = "SopranoSax", t[t.AltoSax = 65] = "AltoSax", t[t.TenorSax = 66] = "TenorSax", t[t.BaritoneSax = 67] = "BaritoneSax", t[t.Oboe = 68] = "Oboe", t[t.EnglishHorn = 69] = "EnglishHorn", t[t.Bassoon = 70] = "Bassoon", t[t.Clarinet = 71] = "Clarinet", t[t.Piccolo = 72] = "Piccolo", t[t.Flute = 73] = "Flute", t[t.Recorder = 74] = "Recorder", t[t.PanFlute = 75] = "PanFlute", t[t.BlownBottle = 76] = "BlownBottle", t[t.Shakuhachi = 77] = "Shakuhachi", t[t.Whistle = 78] = "Whistle", t[t.Ocarina = 79] = "Ocarina", t[t.Lead1Square = 80] = "Lead1Square", t[t.Lead2Sawtooth = 81] = "Lead2Sawtooth", t[t.Lead3Calliope = 82] = "Lead3Calliope", t[t.Lead4Chiff = 83] = "Lead4Chiff", t[t.Lead5Charang = 84] = "Lead5Charang", t[t.Lead6Voice = 85] = "Lead6Voice", t[t.Lead7Fifths = 86] = "Lead7Fifths", t[t.Lead8BassLead = 87] = "Lead8BassLead", t[t.Pad1NewAge = 88] = "Pad1NewAge", t[t.Pad2Warm = 89] = "Pad2Warm", t[t.Pad3PolySynth = 90] = "Pad3PolySynth", t[t.Pad4Choir = 91] = "Pad4Choir", t[t.Pad5Bowed = 92] = "Pad5Bowed", t[t.Pad6Metallic = 93] = "Pad6Metallic", t[t.Pad7Halo = 94] = "Pad7Halo", t[t.Pad8Sweep = 95] = "Pad8Sweep", t[t.FX1Rain = 96] = "FX1Rain", t[t.FX2Soundtrack = 97] = "FX2Soundtrack", t[t.FX3Crystal = 98] = "FX3Crystal", t[t.FX4Atmosphere = 99] = "FX4Atmosphere", t[t.FX5Brightness = 100] = "FX5Brightness", t[t.FX6Goblins = 101] = "FX6Goblins", t[t.FX7Echoes = 102] = "FX7Echoes", t[t.FX8SciFi = 103] = "FX8SciFi", t[t.Sitar = 104] = "Sitar", t[t.Banjo = 105] = "Banjo", t[t.Shamisen = 106] = "Shamisen", t[t.Guzheng = 107] = "Guzheng", t[t.Kalimba = 108] = "Kalimba", t[t.Bagpipe = 109] = "Bagpipe", t[t.Fiddle = 110] = "Fiddle", t[t.Shanai = 111] = "Shanai", t[t.TinkleBell = 112] = "TinkleBell", t[t.Agogo = 113] = "Agogo", t[t.SteelDrums = 114] = "SteelDrums", t[t.Woodblock = 115] = "Woodblock", t[t.TaikoDrum = 116] = "TaikoDrum", t[t.MelodicTom = 117] = "MelodicTom", t[t.SynthDrum = 118] = "SynthDrum", t[t.ReverseCymbal = 119] = "ReverseCymbal", t[t.GuitarFretNoise = 120] = "GuitarFretNoise", t[t.BreathNoise = 121] = "BreathNoise", t[t.Seashore = 122] = "Seashore", t[t.BirdTweet = 123] = "BirdTweet", t[t.TelephoneRing = 124] = "TelephoneRing", t[t.Helicopter = 125] = "Helicopter", t[t.Applause = 126] = "Applause", t[t.Gunshot = 127] = "Gunshot", t))(Nf || {}), Of = /* @__PURE__ */ ((t) => (t[t.BassDrum2 = 35] = "BassDrum2", t[t.BassDrum1 = 36] = "BassDrum1", t[t.SideStick = 37] = "SideStick", t[t.SnareDrum1 = 38] = "SnareDrum1", t[t.HandClap = 39] = "HandClap", t[t.SnareDrum2 = 40] = "SnareDrum2", t[t.LowTom2 = 41] = "LowTom2", t[t.ClosedHiHat = 42] = "ClosedHiHat", t[t.LowTom1 = 43] = "LowTom1", t[t.PedalHiHat = 44] = "PedalHiHat", t[t.MidTom2 = 45] = "MidTom2", t[t.OpenHiHat = 46] = "OpenHiHat", t[t.MidTom1 = 47] = "MidTom1", t[t.HighTom2 = 48] = "HighTom2", t[t.CrashCymbal1 = 49] = "CrashCymbal1", t[t.HighTom1 = 50] = "HighTom1", t[t.RideCymbal1 = 51] = "RideCymbal1", t[t.ChineseCymbal = 52] = "ChineseCymbal", t[t.RideBell = 53] = "RideBell", t[t.Tambourine = 54] = "Tambourine", t[t.SplashCymbal = 55] = "SplashCymbal", t[t.Cowbell = 56] = "Cowbell", t[t.CrashCymbal2 = 57] = "CrashCymbal2", t[t.VibraSlap = 58] = "VibraSlap", t[t.RideCymbal2 = 59] = "RideCymbal2", t[t.HighBongo = 60] = "HighBongo", t[t.LowBongo = 61] = "LowBongo", t[t.MuteHighConga = 62] = "MuteHighConga", t[t.OpenHighConga = 63] = "OpenHighConga", t[t.LowConga = 64] = "LowConga", t[t.HighTimbale = 65] = "HighTimbale", t[t.LowTimbale = 66] = "LowTimbale", t[t.HighAgogo = 67] = "HighAgogo", t[t.LowAgogo = 68] = "LowAgogo", t[t.Cabasa = 69] = "Cabasa", t[t.Maracas = 70] = "Maracas", t[t.ShortWhistle = 71] = "ShortWhistle", t[t.LongWhistle = 72] = "LongWhistle", t[t.ShortGuiro = 73] = "ShortGuiro", t[t.LongGuiro = 74] = "LongGuiro", t[t.Claves = 75] = "Claves", t[t.HighWoodBlock = 76] = "HighWoodBlock", t[t.LowWoodBlock = 77] = "LowWoodBlock", t[t.MuteCuica = 78] = "MuteCuica", t[t.OpenCuica = 79] = "OpenCuica", t[t.MuteTriangle = 80] = "MuteTriangle", t[t.OpenTriangle = 81] = "OpenTriangle", t[t.Shaker = 82] = "Shaker", t))(Of || {}), da = {}, fn = {};
function yf(t) {
  var e = new z(t), n = e.readChunk();
  if (n.id != "MThd")
    throw "Bad MIDI file.  Expected 'MHdr', got: '" + n.id + "'";
  for (var r = Rf(n.data), i = [], s = 0; !e.eof() && s < r.numTracks; s++) {
    var a = e.readChunk();
    if (a.id != "MTrk")
      throw "Bad MIDI file.  Expected 'MTrk', got: '" + a.id + "'";
    var o = Ff(a.data);
    i.push(o);
  }
  return {
    header: r,
    tracks: i
  };
}
function Rf(t) {
  var e = new z(t), n = e.readUInt16(), r = e.readUInt16(), i = {
    format: n,
    numTracks: r
  }, s = e.readUInt16();
  return s & 32768 ? (i.framesPerSecond = 256 - (s >> 8), i.ticksPerFrame = s & 255) : i.ticksPerBeat = s, i;
}
function Ff(t) {
  for (var e = new z(t), n = []; !e.eof(); ) {
    var r = s();
    n.push(r);
  }
  return n;
  var i;
  function s() {
    var a = {};
    a.deltaTime = e.readVarInt();
    var o = e.readUInt8();
    if ((o & 240) === 240)
      if (o === 255) {
        a.meta = !0;
        var u = e.readUInt8(), l = e.readVarInt();
        switch (u) {
          case 0:
            if (a.type = "sequenceNumber", l !== 2)
              throw "Expected length for sequenceNumber event is 2, got " + l;
            return a.number = e.readUInt16(), a;
          case 1:
            return a.type = "text", a.text = e.readString(l), a;
          case 2:
            return a.type = "copyrightNotice", a.text = e.readString(l), a;
          case 3:
            return a.type = "trackName", a.text = e.readString(l), a;
          case 4:
            return a.type = "instrumentName", a.text = e.readString(l), a;
          case 5:
            return a.type = "lyrics", a.text = e.readString(l), a;
          case 6:
            return a.type = "marker", a.text = e.readString(l), a;
          case 7:
            return a.type = "cuePoint", a.text = e.readString(l), a;
          case 32:
            if (a.type = "channelPrefix", l != 1)
              throw "Expected length for channelPrefix event is 1, got " + l;
            return a.channel = e.readUInt8(), a;
          case 33:
            if (a.type = "portPrefix", l != 1)
              throw "Expected length for portPrefix event is 1, got " + l;
            return a.port = e.readUInt8(), a;
          case 47:
            if (a.type = "endOfTrack", l != 0)
              throw "Expected length for endOfTrack event is 0, got " + l;
            return a;
          case 81:
            if (a.type = "setTempo", l != 3)
              throw "Expected length for setTempo event is 3, got " + l;
            return a.microsecondsPerBeat = e.readUInt24(), a;
          case 84:
            if (a.type = "smpteOffset", l != 5)
              throw "Expected length for smpteOffset event is 5, got " + l;
            var d = e.readUInt8(), f = { 0: 24, 32: 25, 64: 29, 96: 30 };
            return a.frameRate = f[d & 96], a.hour = d & 31, a.min = e.readUInt8(), a.sec = e.readUInt8(), a.frame = e.readUInt8(), a.subFrame = e.readUInt8(), a;
          case 88:
            if (a.type = "timeSignature", l != 2 && l != 4)
              throw "Expected length for timeSignature event is 4 or 2, got " + l;
            return a.numerator = e.readUInt8(), a.denominator = 1 << e.readUInt8(), l === 4 ? (a.metronome = e.readUInt8(), a.thirtyseconds = e.readUInt8()) : (a.metronome = 36, a.thirtyseconds = 8), a;
          case 89:
            if (a.type = "keySignature", l != 2)
              throw "Expected length for keySignature event is 2, got " + l;
            return a.key = e.readInt8(), a.scale = e.readUInt8(), a;
          case 127:
            return a.type = "sequencerSpecific", a.data = e.readBytes(l), a;
          default:
            return a.type = "unknownMeta", a.data = e.readBytes(l), a.metatypeByte = u, a;
        }
      } else if (o == 240) {
        a.type = "sysEx";
        var l = e.readVarInt();
        return a.data = e.readBytes(l), a;
      } else if (o == 247) {
        a.type = "endSysEx";
        var l = e.readVarInt();
        return a.data = e.readBytes(l), a;
      } else
        throw "Unrecognised MIDI event type byte: " + o;
    else {
      var h;
      if ((o & 128) === 0) {
        if (i === null)
          throw "Running status byte encountered before status byte";
        h = o, o = i, a.running = !0;
      } else
        h = e.readUInt8(), i = o;
      var m = o >> 4;
      switch (a.channel = o & 15, m) {
        case 8:
          return a.type = "noteOff", a.noteNumber = h, a.velocity = e.readUInt8(), a;
        case 9:
          var v = e.readUInt8();
          return a.type = v === 0 ? "noteOff" : "noteOn", a.noteNumber = h, a.velocity = v, v === 0 && (a.byte9 = !0), a;
        case 10:
          return a.type = "noteAftertouch", a.noteNumber = h, a.amount = e.readUInt8(), a;
        case 11:
          return a.type = "controller", a.controllerType = h, a.value = e.readUInt8(), a;
        case 12:
          return a.type = "programChange", a.programNumber = h, a;
        case 13:
          return a.type = "channelAftertouch", a.amount = h, a;
        case 14:
          return a.type = "pitchBend", a.value = h + (e.readUInt8() << 7) - 8192, a;
        default:
          throw "Unrecognised MIDI event type: " + m;
      }
    }
  }
}
function z(t) {
  this.buffer = t, this.bufferLen = this.buffer.length, this.pos = 0;
}
z.prototype.eof = function() {
  return this.pos >= this.bufferLen;
};
z.prototype.readUInt8 = function() {
  var t = this.buffer[this.pos];
  return this.pos += 1, t;
};
z.prototype.readInt8 = function() {
  var t = this.readUInt8();
  return t & 128 ? t - 256 : t;
};
z.prototype.readUInt16 = function() {
  var t = this.readUInt8(), e = this.readUInt8();
  return (t << 8) + e;
};
z.prototype.readInt16 = function() {
  var t = this.readUInt16();
  return t & 32768 ? t - 65536 : t;
};
z.prototype.readUInt24 = function() {
  var t = this.readUInt8(), e = this.readUInt8(), n = this.readUInt8();
  return (t << 16) + (e << 8) + n;
};
z.prototype.readInt24 = function() {
  var t = this.readUInt24();
  return t & 8388608 ? t - 16777216 : t;
};
z.prototype.readUInt32 = function() {
  var t = this.readUInt8(), e = this.readUInt8(), n = this.readUInt8(), r = this.readUInt8();
  return (t << 24) + (e << 16) + (n << 8) + r;
};
z.prototype.readBytes = function(t) {
  var e = this.buffer.slice(this.pos, this.pos + t);
  return this.pos += t, e;
};
z.prototype.readString = function(t) {
  var e = this.readBytes(t);
  return String.fromCharCode.apply(null, e);
};
z.prototype.readVarInt = function() {
  for (var t = 0; !this.eof(); ) {
    var e = this.readUInt8();
    if (e & 128)
      t += e & 127, t <<= 7;
    else
      return t + e;
  }
  return t;
};
z.prototype.readChunk = function() {
  var t = this.readString(4), e = this.readUInt32(), n = this.readBytes(e);
  return {
    id: t,
    length: e,
    data: n
  };
};
var Uf = yf;
function Bf(t, e) {
  if (typeof t != "object")
    throw "Invalid MIDI data";
  e = e || {};
  var n = t.header || {}, r = t.tracks || [], i, s = r.length, a = new U();
  for (Vf(a, n, s), i = 0; i < s; i++)
    Lf(a, r[i], e);
  return a.buffer;
}
function Vf(t, e, n) {
  var r = e.format == null ? 1 : e.format, i = 128;
  e.timeDivision ? i = e.timeDivision : e.ticksPerFrame && e.framesPerSecond ? i = -(e.framesPerSecond & 255) << 8 | e.ticksPerFrame & 255 : e.ticksPerBeat && (i = e.ticksPerBeat & 32767);
  var s = new U();
  s.writeUInt16(r), s.writeUInt16(n), s.writeUInt16(i), t.writeChunk("MThd", s.buffer);
}
function Lf(t, e, n) {
  var r = new U(), i, s = e.length, a = null;
  for (i = 0; i < s; i++)
    (n.running === !1 || !n.running && !e[i].running) && (a = null), a = Hf(r, e[i], a, n.useByte9ForNoteOff);
  t.writeChunk("MTrk", r.buffer);
}
function Hf(t, e, n, r) {
  var i = e.type, s = e.deltaTime, a = e.text || "", o = e.data || [], u = null;
  switch (t.writeVarInt(s), i) {
    case "sequenceNumber":
      t.writeUInt8(255), t.writeUInt8(0), t.writeVarInt(2), t.writeUInt16(e.number);
      break;
    case "text":
      t.writeUInt8(255), t.writeUInt8(1), t.writeVarInt(a.length), t.writeString(a);
      break;
    case "copyrightNotice":
      t.writeUInt8(255), t.writeUInt8(2), t.writeVarInt(a.length), t.writeString(a);
      break;
    case "trackName":
      t.writeUInt8(255), t.writeUInt8(3), t.writeVarInt(a.length), t.writeString(a);
      break;
    case "instrumentName":
      t.writeUInt8(255), t.writeUInt8(4), t.writeVarInt(a.length), t.writeString(a);
      break;
    case "lyrics":
      t.writeUInt8(255), t.writeUInt8(5), t.writeVarInt(a.length), t.writeString(a);
      break;
    case "marker":
      t.writeUInt8(255), t.writeUInt8(6), t.writeVarInt(a.length), t.writeString(a);
      break;
    case "cuePoint":
      t.writeUInt8(255), t.writeUInt8(7), t.writeVarInt(a.length), t.writeString(a);
      break;
    case "channelPrefix":
      t.writeUInt8(255), t.writeUInt8(32), t.writeVarInt(1), t.writeUInt8(e.channel);
      break;
    case "portPrefix":
      t.writeUInt8(255), t.writeUInt8(33), t.writeVarInt(1), t.writeUInt8(e.port);
      break;
    case "endOfTrack":
      t.writeUInt8(255), t.writeUInt8(47), t.writeVarInt(0);
      break;
    case "setTempo":
      t.writeUInt8(255), t.writeUInt8(81), t.writeVarInt(3), t.writeUInt24(e.microsecondsPerBeat);
      break;
    case "smpteOffset":
      t.writeUInt8(255), t.writeUInt8(84), t.writeVarInt(5);
      var l = { 24: 0, 25: 32, 29: 64, 30: 96 }, d = e.hour & 31 | l[e.frameRate];
      t.writeUInt8(d), t.writeUInt8(e.min), t.writeUInt8(e.sec), t.writeUInt8(e.frame), t.writeUInt8(e.subFrame);
      break;
    case "timeSignature":
      t.writeUInt8(255), t.writeUInt8(88), t.writeVarInt(4), t.writeUInt8(e.numerator);
      var f = Math.floor(Math.log(e.denominator) / Math.LN2) & 255;
      t.writeUInt8(f), t.writeUInt8(e.metronome), t.writeUInt8(e.thirtyseconds || 8);
      break;
    case "keySignature":
      t.writeUInt8(255), t.writeUInt8(89), t.writeVarInt(2), t.writeInt8(e.key), t.writeUInt8(e.scale);
      break;
    case "sequencerSpecific":
      t.writeUInt8(255), t.writeUInt8(127), t.writeVarInt(o.length), t.writeBytes(o);
      break;
    case "unknownMeta":
      e.metatypeByte != null && (t.writeUInt8(255), t.writeUInt8(e.metatypeByte), t.writeVarInt(o.length), t.writeBytes(o));
      break;
    case "sysEx":
      t.writeUInt8(240), t.writeVarInt(o.length), t.writeBytes(o);
      break;
    case "endSysEx":
      t.writeUInt8(247), t.writeVarInt(o.length), t.writeBytes(o);
      break;
    case "noteOff":
      var h = r !== !1 && e.byte9 || r && e.velocity == 0 ? 144 : 128;
      u = h | e.channel, u !== n && t.writeUInt8(u), t.writeUInt8(e.noteNumber), t.writeUInt8(e.velocity);
      break;
    case "noteOn":
      u = 144 | e.channel, u !== n && t.writeUInt8(u), t.writeUInt8(e.noteNumber), t.writeUInt8(e.velocity);
      break;
    case "noteAftertouch":
      u = 160 | e.channel, u !== n && t.writeUInt8(u), t.writeUInt8(e.noteNumber), t.writeUInt8(e.amount);
      break;
    case "controller":
      u = 176 | e.channel, u !== n && t.writeUInt8(u), t.writeUInt8(e.controllerType), t.writeUInt8(e.value);
      break;
    case "programChange":
      u = 192 | e.channel, u !== n && t.writeUInt8(u), t.writeUInt8(e.programNumber);
      break;
    case "channelAftertouch":
      u = 208 | e.channel, u !== n && t.writeUInt8(u), t.writeUInt8(e.amount);
      break;
    case "pitchBend":
      u = 224 | e.channel, u !== n && t.writeUInt8(u);
      var m = 8192 + e.value, v = m & 127, w = m >> 7 & 127;
      t.writeUInt8(v), t.writeUInt8(w);
      break;
    default:
      throw "Unrecognized event type: " + i;
  }
  return u;
}
function U() {
  this.buffer = [];
}
U.prototype.writeUInt8 = function(t) {
  this.buffer.push(t & 255);
};
U.prototype.writeInt8 = U.prototype.writeUInt8;
U.prototype.writeUInt16 = function(t) {
  var e = t >> 8 & 255, n = t & 255;
  this.writeUInt8(e), this.writeUInt8(n);
};
U.prototype.writeInt16 = U.prototype.writeUInt16;
U.prototype.writeUInt24 = function(t) {
  var e = t >> 16 & 255, n = t >> 8 & 255, r = t & 255;
  this.writeUInt8(e), this.writeUInt8(n), this.writeUInt8(r);
};
U.prototype.writeInt24 = U.prototype.writeUInt24;
U.prototype.writeUInt32 = function(t) {
  var e = t >> 24 & 255, n = t >> 16 & 255, r = t >> 8 & 255, i = t & 255;
  this.writeUInt8(e), this.writeUInt8(n), this.writeUInt8(r), this.writeUInt8(i);
};
U.prototype.writeInt32 = U.prototype.writeUInt32;
U.prototype.writeBytes = function(t) {
  this.buffer = this.buffer.concat(Array.prototype.slice.call(t, 0));
};
U.prototype.writeString = function(t) {
  var e, n = t.length, r = [];
  for (e = 0; e < n; e++)
    r.push(t.codePointAt(e));
  this.writeBytes(r);
};
U.prototype.writeVarInt = function(t) {
  if (t < 0)
    throw "Cannot write negative variable-length integer";
  if (t <= 127)
    this.writeUInt8(t);
  else {
    var e = t, n = [];
    for (n.push(e & 127), e >>= 7; e; ) {
      var r = e & 127 | 128;
      n.push(r), e >>= 7;
    }
    this.writeBytes(n.reverse());
  }
};
U.prototype.writeChunk = function(t, e) {
  this.writeString(t), this.writeUInt32(e.length), this.writeBytes(e);
};
var $f = Bf;
fn.parseMidi = Uf;
fn.writeMidi = $f;
var rn = {}, Dt = {};
Object.defineProperty(Dt, "__esModule", { value: !0 });
Dt.insert = Dt.search = void 0;
function pa(t, e, n) {
  n === void 0 && (n = "ticks");
  var r = 0, i = t.length, s = i;
  if (i > 0 && t[i - 1][n] <= e)
    return i - 1;
  for (; r < s; ) {
    var a = Math.floor(r + (s - r) / 2), o = t[a], u = t[a + 1];
    if (o[n] === e) {
      for (var l = a; l < t.length; l++) {
        var d = t[l];
        d[n] === e && (a = l);
      }
      return a;
    } else {
      if (o[n] < e && u[n] > e)
        return a;
      o[n] > e ? s = a : o[n] < e && (r = a + 1);
    }
  }
  return -1;
}
Dt.search = pa;
function Df(t, e, n) {
  if (n === void 0 && (n = "ticks"), t.length) {
    var r = pa(t, e[n], n);
    t.splice(r + 1, 0, e);
  } else
    t.push(e);
}
Dt.insert = Df;
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.Header = t.keySignatureKeys = void 0;
  var e = Dt, n = /* @__PURE__ */ new WeakMap();
  t.keySignatureKeys = [
    "Cb",
    "Gb",
    "Db",
    "Ab",
    "Eb",
    "Bb",
    "F",
    "C",
    "G",
    "D",
    "A",
    "E",
    "B",
    "F#",
    "C#"
  ];
  var r = function() {
    function i(s) {
      var a = this;
      if (this.tempos = [], this.timeSignatures = [], this.keySignatures = [], this.meta = [], this.name = "", n.set(this, 480), s) {
        n.set(this, s.header.ticksPerBeat), s.tracks.forEach(function(u) {
          u.forEach(function(l) {
            l.meta && (l.type === "timeSignature" ? a.timeSignatures.push({
              ticks: l.absoluteTime,
              timeSignature: [
                l.numerator,
                l.denominator
              ]
            }) : l.type === "setTempo" ? a.tempos.push({
              bpm: 6e7 / l.microsecondsPerBeat,
              ticks: l.absoluteTime
            }) : l.type === "keySignature" && a.keySignatures.push({
              key: t.keySignatureKeys[l.key + 7],
              scale: l.scale === 0 ? "major" : "minor",
              ticks: l.absoluteTime
            }));
          });
        });
        var o = 0;
        s.tracks[0].forEach(function(u) {
          o += u.deltaTime, u.meta && (u.type === "trackName" ? a.name = u.text : (u.type === "text" || u.type === "cuePoint" || u.type === "marker" || u.type === "lyrics") && a.meta.push({
            text: u.text,
            ticks: o,
            type: u.type
          }));
        }), this.update();
      }
    }
    return i.prototype.update = function() {
      var s = this, a = 0, o = 0;
      this.tempos.sort(function(u, l) {
        return u.ticks - l.ticks;
      }), this.tempos.forEach(function(u, l) {
        var d = l > 0 ? s.tempos[l - 1].bpm : s.tempos[0].bpm, f = u.ticks / s.ppq - o, h = 60 / d * f;
        u.time = h + a, a = u.time, o += f;
      }), this.timeSignatures.sort(function(u, l) {
        return u.ticks - l.ticks;
      }), this.timeSignatures.forEach(function(u, l) {
        var d = l > 0 ? s.timeSignatures[l - 1] : s.timeSignatures[0], f = (u.ticks - d.ticks) / s.ppq, h = f / d.timeSignature[0] / (d.timeSignature[1] / 4);
        d.measures = d.measures || 0, u.measures = h + d.measures;
      });
    }, i.prototype.ticksToSeconds = function(s) {
      var a = (0, e.search)(this.tempos, s);
      if (a !== -1) {
        var o = this.tempos[a], u = o.time, l = (s - o.ticks) / this.ppq;
        return u + 60 / o.bpm * l;
      } else {
        var d = s / this.ppq;
        return 60 / 120 * d;
      }
    }, i.prototype.ticksToMeasures = function(s) {
      var a = (0, e.search)(this.timeSignatures, s);
      if (a !== -1) {
        var o = this.timeSignatures[a], u = (s - o.ticks) / this.ppq;
        return o.measures + u / (o.timeSignature[0] / o.timeSignature[1]) / 4;
      } else
        return s / this.ppq / 4;
    }, Object.defineProperty(i.prototype, "ppq", {
      get: function() {
        return n.get(this);
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.secondsToTicks = function(s) {
      var a = (0, e.search)(this.tempos, s, "time");
      if (a !== -1) {
        var o = this.tempos[a], u = o.time, l = s - u, d = l / (60 / o.bpm);
        return Math.round(o.ticks + d * this.ppq);
      } else {
        var f = s / 0.5;
        return Math.round(f * this.ppq);
      }
    }, i.prototype.toJSON = function() {
      return {
        keySignatures: this.keySignatures,
        meta: this.meta,
        name: this.name,
        ppq: this.ppq,
        tempos: this.tempos.map(function(s) {
          return {
            bpm: s.bpm,
            ticks: s.ticks
          };
        }),
        timeSignatures: this.timeSignatures
      };
    }, i.prototype.fromJSON = function(s) {
      this.name = s.name, this.tempos = s.tempos.map(function(a) {
        return Object.assign({}, a);
      }), this.timeSignatures = s.timeSignatures.map(function(a) {
        return Object.assign({}, a);
      }), this.keySignatures = s.keySignatures.map(function(a) {
        return Object.assign({}, a);
      }), this.meta = s.meta.map(function(a) {
        return Object.assign({}, a);
      }), n.set(this, s.ppq), this.update();
    }, i.prototype.setTempo = function(s) {
      this.tempos = [
        {
          bpm: s,
          ticks: 0
        }
      ], this.update();
    }, i;
  }();
  t.Header = r;
})(rn);
var be = {}, Rr = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.ControlChange = t.controlChangeIds = t.controlChangeNames = void 0, t.controlChangeNames = {
    1: "modulationWheel",
    2: "breath",
    4: "footController",
    5: "portamentoTime",
    7: "volume",
    8: "balance",
    10: "pan",
    64: "sustain",
    65: "portamentoTime",
    66: "sostenuto",
    67: "softPedal",
    68: "legatoFootswitch",
    84: "portamentoControl"
  }, t.controlChangeIds = Object.keys(t.controlChangeNames).reduce(function(i, s) {
    return i[t.controlChangeNames[s]] = s, i;
  }, {});
  var e = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), r = function() {
    function i(s, a) {
      e.set(this, a), n.set(this, s.controllerType), this.ticks = s.absoluteTime, this.value = s.value;
    }
    return Object.defineProperty(i.prototype, "number", {
      get: function() {
        return n.get(this);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "name", {
      get: function() {
        return t.controlChangeNames[this.number] ? t.controlChangeNames[this.number] : null;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "time", {
      get: function() {
        var s = e.get(this);
        return s.ticksToSeconds(this.ticks);
      },
      set: function(s) {
        var a = e.get(this);
        this.ticks = a.secondsToTicks(s);
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.toJSON = function() {
      return {
        number: this.number,
        ticks: this.ticks,
        time: this.time,
        value: this.value
      };
    }, i;
  }();
  t.ControlChange = r;
})(Rr);
var hn = {};
Object.defineProperty(hn, "__esModule", { value: !0 });
hn.createControlChanges = void 0;
var $e = Rr;
function Mf() {
  return new Proxy({}, {
    get: function(t, e) {
      if (t[e])
        return t[e];
      if ($e.controlChangeIds.hasOwnProperty(e))
        return t[$e.controlChangeIds[e]];
    },
    set: function(t, e, n) {
      return $e.controlChangeIds.hasOwnProperty(e) ? t[$e.controlChangeIds[e]] = n : t[e] = n, !0;
    }
  });
}
hn.createControlChanges = Mf;
var gn = {};
Object.defineProperty(gn, "__esModule", { value: !0 });
gn.PitchBend = void 0;
var Un = /* @__PURE__ */ new WeakMap(), Gf = function() {
  function t(e, n) {
    Un.set(this, n), this.ticks = e.absoluteTime, this.value = e.value;
  }
  return Object.defineProperty(t.prototype, "time", {
    get: function() {
      var e = Un.get(this);
      return e.ticksToSeconds(this.ticks);
    },
    set: function(e) {
      var n = Un.get(this);
      this.ticks = n.secondsToTicks(e);
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype.toJSON = function() {
    return {
      ticks: this.ticks,
      time: this.time,
      value: this.value
    };
  }, t;
}();
gn.PitchBend = Gf;
var dn = {}, Tt = {};
Object.defineProperty(Tt, "__esModule", { value: !0 });
Tt.DrumKitByPatchID = Tt.InstrumentFamilyByID = Tt.instrumentByPatchID = void 0;
Tt.instrumentByPatchID = [
  "acoustic grand piano",
  "bright acoustic piano",
  "electric grand piano",
  "honky-tonk piano",
  "electric piano 1",
  "electric piano 2",
  "harpsichord",
  "clavi",
  "celesta",
  "glockenspiel",
  "music box",
  "vibraphone",
  "marimba",
  "xylophone",
  "tubular bells",
  "dulcimer",
  "drawbar organ",
  "percussive organ",
  "rock organ",
  "church organ",
  "reed organ",
  "accordion",
  "harmonica",
  "tango accordion",
  "acoustic guitar (nylon)",
  "acoustic guitar (steel)",
  "electric guitar (jazz)",
  "electric guitar (clean)",
  "electric guitar (muted)",
  "overdriven guitar",
  "distortion guitar",
  "guitar harmonics",
  "acoustic bass",
  "electric bass (finger)",
  "electric bass (pick)",
  "fretless bass",
  "slap bass 1",
  "slap bass 2",
  "synth bass 1",
  "synth bass 2",
  "violin",
  "viola",
  "cello",
  "contrabass",
  "tremolo strings",
  "pizzicato strings",
  "orchestral harp",
  "timpani",
  "string ensemble 1",
  "string ensemble 2",
  "synthstrings 1",
  "synthstrings 2",
  "choir aahs",
  "voice oohs",
  "synth voice",
  "orchestra hit",
  "trumpet",
  "trombone",
  "tuba",
  "muted trumpet",
  "french horn",
  "brass section",
  "synthbrass 1",
  "synthbrass 2",
  "soprano sax",
  "alto sax",
  "tenor sax",
  "baritone sax",
  "oboe",
  "english horn",
  "bassoon",
  "clarinet",
  "piccolo",
  "flute",
  "recorder",
  "pan flute",
  "blown bottle",
  "shakuhachi",
  "whistle",
  "ocarina",
  "lead 1 (square)",
  "lead 2 (sawtooth)",
  "lead 3 (calliope)",
  "lead 4 (chiff)",
  "lead 5 (charang)",
  "lead 6 (voice)",
  "lead 7 (fifths)",
  "lead 8 (bass + lead)",
  "pad 1 (new age)",
  "pad 2 (warm)",
  "pad 3 (polysynth)",
  "pad 4 (choir)",
  "pad 5 (bowed)",
  "pad 6 (metallic)",
  "pad 7 (halo)",
  "pad 8 (sweep)",
  "fx 1 (rain)",
  "fx 2 (soundtrack)",
  "fx 3 (crystal)",
  "fx 4 (atmosphere)",
  "fx 5 (brightness)",
  "fx 6 (goblins)",
  "fx 7 (echoes)",
  "fx 8 (sci-fi)",
  "sitar",
  "banjo",
  "shamisen",
  "koto",
  "kalimba",
  "bag pipe",
  "fiddle",
  "shanai",
  "tinkle bell",
  "agogo",
  "steel drums",
  "woodblock",
  "taiko drum",
  "melodic tom",
  "synth drum",
  "reverse cymbal",
  "guitar fret noise",
  "breath noise",
  "seashore",
  "bird tweet",
  "telephone ring",
  "helicopter",
  "applause",
  "gunshot"
];
Tt.InstrumentFamilyByID = [
  "piano",
  "chromatic percussion",
  "organ",
  "guitar",
  "bass",
  "strings",
  "ensemble",
  "brass",
  "reed",
  "pipe",
  "synth lead",
  "synth pad",
  "synth effects",
  "world",
  "percussive",
  "sound effects"
];
Tt.DrumKitByPatchID = {
  0: "standard kit",
  8: "room kit",
  16: "power kit",
  24: "electronic kit",
  25: "tr-808 kit",
  32: "jazz kit",
  40: "brush kit",
  48: "orchestra kit",
  56: "sound fx kit"
};
Object.defineProperty(dn, "__esModule", { value: !0 });
dn.Instrument = void 0;
var De = Tt, Di = /* @__PURE__ */ new WeakMap(), Wf = function() {
  function t(e, n) {
    if (this.number = 0, Di.set(this, n), this.number = 0, e) {
      var r = e.find(function(i) {
        return i.type === "programChange";
      });
      r && (this.number = r.programNumber);
    }
  }
  return Object.defineProperty(t.prototype, "name", {
    get: function() {
      return this.percussion ? De.DrumKitByPatchID[this.number] : De.instrumentByPatchID[this.number];
    },
    set: function(e) {
      var n = De.instrumentByPatchID.indexOf(e);
      n !== -1 && (this.number = n);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "family", {
    get: function() {
      return this.percussion ? "drums" : De.InstrumentFamilyByID[Math.floor(this.number / 8)];
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "percussion", {
    get: function() {
      var e = Di.get(this);
      return e.channel === 9;
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype.toJSON = function() {
    return {
      family: this.family,
      number: this.number,
      name: this.name
    };
  }, t.prototype.fromJSON = function(e) {
    this.number = e.number;
  }, t;
}();
dn.Instrument = Wf;
var pn = {};
Object.defineProperty(pn, "__esModule", { value: !0 });
pn.Note = void 0;
function zf(t) {
  var e = Math.floor(t / 12) - 1;
  return ma(t) + e.toString();
}
function ma(t) {
  var e = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"], n = t % 12;
  return e[n];
}
function Kf(t) {
  var e = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  return e.indexOf(t);
}
var qf = function() {
  var t = /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i, e = {
    cbb: -2,
    cb: -1,
    c: 0,
    "c#": 1,
    cx: 2,
    dbb: 0,
    db: 1,
    d: 2,
    "d#": 3,
    dx: 4,
    ebb: 2,
    eb: 3,
    e: 4,
    "e#": 5,
    ex: 6,
    fbb: 3,
    fb: 4,
    f: 5,
    "f#": 6,
    fx: 7,
    gbb: 5,
    gb: 6,
    g: 7,
    "g#": 8,
    gx: 9,
    abb: 7,
    ab: 8,
    a: 9,
    "a#": 10,
    ax: 11,
    bbb: 9,
    bb: 10,
    b: 11,
    "b#": 12,
    bx: 13
  };
  return function(n) {
    var r = t.exec(n), i = r[1], s = r[2], a = e[i.toLowerCase()];
    return a + (parseInt(s, 10) + 1) * 12;
  };
}(), jt = /* @__PURE__ */ new WeakMap(), Xf = function() {
  function t(e, n, r) {
    jt.set(this, r), this.midi = e.midi, this.velocity = e.velocity, this.noteOffVelocity = n.velocity, this.ticks = e.ticks, this.durationTicks = n.ticks - e.ticks;
  }
  return Object.defineProperty(t.prototype, "name", {
    get: function() {
      return zf(this.midi);
    },
    set: function(e) {
      this.midi = qf(e);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "octave", {
    get: function() {
      return Math.floor(this.midi / 12) - 1;
    },
    set: function(e) {
      var n = e - this.octave;
      this.midi += n * 12;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "pitch", {
    get: function() {
      return ma(this.midi);
    },
    set: function(e) {
      this.midi = 12 * (this.octave + 1) + Kf(e);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "duration", {
    get: function() {
      var e = jt.get(this);
      return e.ticksToSeconds(this.ticks + this.durationTicks) - e.ticksToSeconds(this.ticks);
    },
    set: function(e) {
      var n = jt.get(this), r = n.secondsToTicks(this.time + e);
      this.durationTicks = r - this.ticks;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "time", {
    get: function() {
      var e = jt.get(this);
      return e.ticksToSeconds(this.ticks);
    },
    set: function(e) {
      var n = jt.get(this);
      this.ticks = n.secondsToTicks(e);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "bars", {
    get: function() {
      var e = jt.get(this);
      return e.ticksToMeasures(this.ticks);
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype.toJSON = function() {
    return {
      duration: this.duration,
      durationTicks: this.durationTicks,
      midi: this.midi,
      name: this.name,
      ticks: this.ticks,
      time: this.time,
      velocity: this.velocity
    };
  }, t;
}();
pn.Note = Xf;
Object.defineProperty(be, "__esModule", { value: !0 });
be.Track = void 0;
var Bn = Dt, Jf = Rr, jf = hn, Qf = gn, Mi = dn, Yf = pn, Me = /* @__PURE__ */ new WeakMap(), Zf = function() {
  function t(e, n) {
    var r = this;
    if (this.name = "", this.notes = [], this.controlChanges = (0, jf.createControlChanges)(), this.pitchBends = [], Me.set(this, n), e) {
      var i = e.find(function(h) {
        return h.type === "trackName";
      });
      this.name = i ? i.text : "";
    }
    if (this.instrument = new Mi.Instrument(e, this), this.channel = 0, e) {
      for (var s = e.filter(function(h) {
        return h.type === "noteOn";
      }), a = e.filter(function(h) {
        return h.type === "noteOff";
      }), o = function() {
        var h = s.shift();
        u.channel = h.channel;
        var m = a.findIndex(function(w) {
          return w.noteNumber === h.noteNumber && w.absoluteTime >= h.absoluteTime;
        });
        if (m !== -1) {
          var v = a.splice(m, 1)[0];
          u.addNote({
            durationTicks: v.absoluteTime - h.absoluteTime,
            midi: h.noteNumber,
            noteOffVelocity: v.velocity / 127,
            ticks: h.absoluteTime,
            velocity: h.velocity / 127
          });
        }
      }, u = this; s.length; )
        o();
      var l = e.filter(function(h) {
        return h.type === "controller";
      });
      l.forEach(function(h) {
        r.addCC({
          number: h.controllerType,
          ticks: h.absoluteTime,
          value: h.value / 127
        });
      });
      var d = e.filter(function(h) {
        return h.type === "pitchBend";
      });
      d.forEach(function(h) {
        r.addPitchBend({
          ticks: h.absoluteTime,
          value: h.value / Math.pow(2, 13)
        });
      });
      var f = e.find(function(h) {
        return h.type === "endOfTrack";
      });
      this.endOfTrackTicks = f !== void 0 ? f.absoluteTime : void 0;
    }
  }
  return t.prototype.addNote = function(e) {
    var n = Me.get(this), r = new Yf.Note({
      midi: 0,
      ticks: 0,
      velocity: 1
    }, {
      ticks: 0,
      velocity: 0
    }, n);
    return Object.assign(r, e), (0, Bn.insert)(this.notes, r, "ticks"), this;
  }, t.prototype.addCC = function(e) {
    var n = Me.get(this), r = new Jf.ControlChange({
      controllerType: e.number
    }, n);
    return delete e.number, Object.assign(r, e), Array.isArray(this.controlChanges[r.number]) || (this.controlChanges[r.number] = []), (0, Bn.insert)(this.controlChanges[r.number], r, "ticks"), this;
  }, t.prototype.addPitchBend = function(e) {
    var n = Me.get(this), r = new Qf.PitchBend({}, n);
    return Object.assign(r, e), (0, Bn.insert)(this.pitchBends, r, "ticks"), this;
  }, Object.defineProperty(t.prototype, "duration", {
    get: function() {
      if (!this.notes.length)
        return 0;
      for (var e = this.notes[this.notes.length - 1].time + this.notes[this.notes.length - 1].duration, n = 0; n < this.notes.length - 1; n++) {
        var r = this.notes[n].time + this.notes[n].duration;
        e < r && (e = r);
      }
      return e;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "durationTicks", {
    get: function() {
      if (!this.notes.length)
        return 0;
      for (var e = this.notes[this.notes.length - 1].ticks + this.notes[this.notes.length - 1].durationTicks, n = 0; n < this.notes.length - 1; n++) {
        var r = this.notes[n].ticks + this.notes[n].durationTicks;
        e < r && (e = r);
      }
      return e;
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype.fromJSON = function(e) {
    var n = this;
    this.name = e.name, this.channel = e.channel, this.instrument = new Mi.Instrument(void 0, this), this.instrument.fromJSON(e.instrument), e.endOfTrackTicks !== void 0 && (this.endOfTrackTicks = e.endOfTrackTicks);
    for (var r in e.controlChanges)
      e.controlChanges[r] && e.controlChanges[r].forEach(function(i) {
        n.addCC({
          number: i.number,
          ticks: i.ticks,
          value: i.value
        });
      });
    e.notes.forEach(function(i) {
      n.addNote({
        durationTicks: i.durationTicks,
        midi: i.midi,
        ticks: i.ticks,
        velocity: i.velocity
      });
    });
  }, t.prototype.toJSON = function() {
    for (var e = {}, n = 0; n < 127; n++)
      this.controlChanges.hasOwnProperty(n) && (e[n] = this.controlChanges[n].map(function(i) {
        return i.toJSON();
      }));
    var r = {
      channel: this.channel,
      controlChanges: e,
      pitchBends: this.pitchBends.map(function(i) {
        return i.toJSON();
      }),
      instrument: this.instrument.toJSON(),
      name: this.name,
      notes: this.notes.map(function(i) {
        return i.toJSON();
      })
    };
    return this.endOfTrackTicks !== void 0 && (r.endOfTrackTicks = this.endOfTrackTicks), r;
  }, t;
}();
be.Track = Zf;
var mn = {};
function th(t) {
  var e = [];
  return va(t, e), e;
}
function va(t, e) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    Array.isArray(r) ? va(r, e) : e.push(r);
  }
}
const eh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  flatten: th
}, Symbol.toStringTag, { value: "Module" })), nh = /* @__PURE__ */ bu(eh);
var kt = ft && ft.__spreadArray || function(t, e, n) {
  if (n || arguments.length === 2)
    for (var r = 0, i = e.length, s; r < i; r++)
      (s || !(r in e)) && (s || (s = Array.prototype.slice.call(e, 0, r)), s[r] = e[r]);
  return t.concat(s || Array.prototype.slice.call(e));
};
Object.defineProperty(mn, "__esModule", { value: !0 });
mn.encode = void 0;
var rh = fn, ih = rn, sh = nh;
function ah(t, e) {
  return [
    {
      absoluteTime: t.ticks,
      channel: e,
      deltaTime: 0,
      noteNumber: t.midi,
      type: "noteOn",
      velocity: Math.floor(t.velocity * 127)
    },
    {
      absoluteTime: t.ticks + t.durationTicks,
      channel: e,
      deltaTime: 0,
      noteNumber: t.midi,
      type: "noteOff",
      velocity: Math.floor(t.noteOffVelocity * 127)
    }
  ];
}
function oh(t) {
  return (0, sh.flatten)(t.notes.map(function(e) {
    return ah(e, t.channel);
  }));
}
function ch(t, e) {
  return {
    absoluteTime: t.ticks,
    channel: e,
    controllerType: t.number,
    deltaTime: 0,
    type: "controller",
    value: Math.floor(t.value * 127)
  };
}
function uh(t) {
  for (var e = [], n = 0; n < 127; n++)
    t.controlChanges.hasOwnProperty(n) && t.controlChanges[n].forEach(function(r) {
      e.push(ch(r, t.channel));
    });
  return e;
}
function lh(t, e) {
  return {
    absoluteTime: t.ticks,
    channel: e,
    deltaTime: 0,
    type: "pitchBend",
    value: t.value
  };
}
function fh(t) {
  var e = [];
  return t.pitchBends.forEach(function(n) {
    e.push(lh(n, t.channel));
  }), e;
}
function hh(t) {
  return {
    absoluteTime: 0,
    channel: t.channel,
    deltaTime: 0,
    programNumber: t.instrument.number,
    type: "programChange"
  };
}
function gh(t) {
  return {
    absoluteTime: 0,
    deltaTime: 0,
    meta: !0,
    text: t,
    type: "trackName"
  };
}
function dh(t) {
  return {
    absoluteTime: t.ticks,
    deltaTime: 0,
    meta: !0,
    microsecondsPerBeat: Math.floor(6e7 / t.bpm),
    type: "setTempo"
  };
}
function ph(t) {
  return {
    absoluteTime: t.ticks,
    deltaTime: 0,
    denominator: t.timeSignature[1],
    meta: !0,
    metronome: 24,
    numerator: t.timeSignature[0],
    thirtyseconds: 8,
    type: "timeSignature"
  };
}
function mh(t) {
  var e = ih.keySignatureKeys.indexOf(t.key);
  return {
    absoluteTime: t.ticks,
    deltaTime: 0,
    key: e + 7,
    meta: !0,
    scale: t.scale === "major" ? 0 : 1,
    type: "keySignature"
  };
}
function vh(t) {
  return {
    absoluteTime: t.ticks,
    deltaTime: 0,
    meta: !0,
    text: t.text,
    type: t.type
  };
}
function kh(t) {
  var e = {
    header: {
      format: 1,
      numTracks: t.tracks.length + 1,
      ticksPerBeat: t.header.ppq
    },
    tracks: kt([
      kt(kt(kt(kt([
        {
          absoluteTime: 0,
          deltaTime: 0,
          meta: !0,
          text: t.header.name,
          type: "trackName"
        }
      ], t.header.keySignatures.map(function(n) {
        return mh(n);
      }), !0), t.header.meta.map(function(n) {
        return vh(n);
      }), !0), t.header.tempos.map(function(n) {
        return dh(n);
      }), !0), t.header.timeSignatures.map(function(n) {
        return ph(n);
      }), !0)
    ], t.tracks.map(function(n) {
      return kt(kt(kt([
        gh(n.name),
        hh(n)
      ], oh(n), !0), uh(n), !0), fh(n), !0);
    }), !0)
  };
  return e.tracks = e.tracks.map(function(n) {
    n = n.sort(function(i, s) {
      return i.absoluteTime - s.absoluteTime;
    });
    var r = 0;
    return n.forEach(function(i) {
      i.deltaTime = i.absoluteTime - r, r = i.absoluteTime, delete i.absoluteTime;
    }), n.push({
      deltaTime: 0,
      meta: !0,
      type: "endOfTrack"
    }), n;
  }), new Uint8Array((0, rh.writeMidi)(e));
}
mn.encode = kh;
(function(t) {
  var e = ft && ft.__awaiter || function(f, h, m, v) {
    function w(k) {
      return k instanceof m ? k : new m(function(C) {
        C(k);
      });
    }
    return new (m || (m = Promise))(function(k, C) {
      function O(y) {
        try {
          b(v.next(y));
        } catch (ct) {
          C(ct);
        }
      }
      function I(y) {
        try {
          b(v.throw(y));
        } catch (ct) {
          C(ct);
        }
      }
      function b(y) {
        y.done ? k(y.value) : w(y.value).then(O, I);
      }
      b((v = v.apply(f, h || [])).next());
    });
  }, n = ft && ft.__generator || function(f, h) {
    var m = { label: 0, sent: function() {
      if (k[0] & 1)
        throw k[1];
      return k[1];
    }, trys: [], ops: [] }, v, w, k, C;
    return C = { next: O(0), throw: O(1), return: O(2) }, typeof Symbol == "function" && (C[Symbol.iterator] = function() {
      return this;
    }), C;
    function O(b) {
      return function(y) {
        return I([b, y]);
      };
    }
    function I(b) {
      if (v)
        throw new TypeError("Generator is already executing.");
      for (; m; )
        try {
          if (v = 1, w && (k = b[0] & 2 ? w.return : b[0] ? w.throw || ((k = w.return) && k.call(w), 0) : w.next) && !(k = k.call(w, b[1])).done)
            return k;
          switch (w = 0, k && (b = [b[0] & 2, k.value]), b[0]) {
            case 0:
            case 1:
              k = b;
              break;
            case 4:
              return m.label++, { value: b[1], done: !1 };
            case 5:
              m.label++, w = b[1], b = [0];
              continue;
            case 7:
              b = m.ops.pop(), m.trys.pop();
              continue;
            default:
              if (k = m.trys, !(k = k.length > 0 && k[k.length - 1]) && (b[0] === 6 || b[0] === 2)) {
                m = 0;
                continue;
              }
              if (b[0] === 3 && (!k || b[1] > k[0] && b[1] < k[3])) {
                m.label = b[1];
                break;
              }
              if (b[0] === 6 && m.label < k[1]) {
                m.label = k[1], k = b;
                break;
              }
              if (k && m.label < k[2]) {
                m.label = k[2], m.ops.push(b);
                break;
              }
              k[2] && m.ops.pop(), m.trys.pop();
              continue;
          }
          b = h.call(f, m);
        } catch (y) {
          b = [6, y], w = 0;
        } finally {
          v = k = 0;
        }
      if (b[0] & 5)
        throw b[1];
      return { value: b[0] ? b[1] : void 0, done: !0 };
    }
  };
  Object.defineProperty(t, "__esModule", { value: !0 }), t.Header = t.Track = t.Midi = void 0;
  var r = fn, i = rn, s = be, a = mn, o = function() {
    function f(h) {
      var m = this, v = null;
      if (h) {
        var w = h instanceof ArrayBuffer ? new Uint8Array(h) : h;
        v = (0, r.parseMidi)(w), v.tracks.forEach(function(k) {
          var C = 0;
          k.forEach(function(O) {
            C += O.deltaTime, O.absoluteTime = C;
          });
        }), v.tracks = d(v.tracks);
      }
      this.header = new i.Header(v), this.tracks = [], h && (this.tracks = v.tracks.map(function(k) {
        return new s.Track(k, m.header);
      }), v.header.format === 1 && this.tracks[0].duration === 0 && this.tracks.shift());
    }
    return f.fromUrl = function(h) {
      return e(this, void 0, void 0, function() {
        var m, v;
        return n(this, function(w) {
          switch (w.label) {
            case 0:
              return [4, fetch(h)];
            case 1:
              return m = w.sent(), m.ok ? [4, m.arrayBuffer()] : [3, 3];
            case 2:
              return v = w.sent(), [2, new f(v)];
            case 3:
              throw new Error("Could not load '".concat(h, "'"));
          }
        });
      });
    }, Object.defineProperty(f.prototype, "name", {
      get: function() {
        return this.header.name;
      },
      set: function(h) {
        this.header.name = h;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(f.prototype, "duration", {
      get: function() {
        var h = this.tracks.map(function(m) {
          return m.duration;
        });
        return Math.max.apply(Math, h);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(f.prototype, "durationTicks", {
      get: function() {
        var h = this.tracks.map(function(m) {
          return m.durationTicks;
        });
        return Math.max.apply(Math, h);
      },
      enumerable: !1,
      configurable: !0
    }), f.prototype.addTrack = function() {
      var h = new s.Track(void 0, this.header);
      return this.tracks.push(h), h;
    }, f.prototype.toArray = function() {
      return (0, a.encode)(this);
    }, f.prototype.toJSON = function() {
      return {
        header: this.header.toJSON(),
        tracks: this.tracks.map(function(h) {
          return h.toJSON();
        })
      };
    }, f.prototype.fromJSON = function(h) {
      var m = this;
      this.header = new i.Header(), this.header.fromJSON(h.header), this.tracks = h.tracks.map(function(v) {
        var w = new s.Track(void 0, m.header);
        return w.fromJSON(v), w;
      });
    }, f.prototype.clone = function() {
      var h = new f();
      return h.fromJSON(this.toJSON()), h;
    }, f;
  }();
  t.Midi = o;
  var u = be;
  Object.defineProperty(t, "Track", { enumerable: !0, get: function() {
    return u.Track;
  } });
  var l = rn;
  Object.defineProperty(t, "Header", { enumerable: !0, get: function() {
    return l.Header;
  } });
  function d(f) {
    for (var h = [], m = 0; m < f.length; m++)
      for (var v = h.length, w = /* @__PURE__ */ new Map(), k = Array(16).fill(0), C = 0, O = f[m]; C < O.length; C++) {
        var I = O[C], b = v, y = I.channel;
        if (y !== void 0) {
          I.type === "programChange" && (k[y] = I.programNumber);
          var ct = k[y], zt = "".concat(ct, " ").concat(y);
          w.has(zt) ? b = w.get(zt) : (b = v + w.size, w.set(zt, b));
        }
        h[b] || h.push([]), h[b].push(I);
      }
    return h;
  }
})(da);
var Sh = /* @__PURE__ */ ((t) => (t[t.UNKNOWN = 0] = "UNKNOWN", t[t.INTRO = 1] = "INTRO", t[t.VERSE = 2] = "VERSE", t[t.CHORUS = 3] = "CHORUS", t[t.BRIDGE = 4] = "BRIDGE", t[t.OUTRO = 5] = "OUTRO", t[t.PRE_CHORUS = 6] = "PRE_CHORUS", t[t.POST_CHORUS = 7] = "POST_CHORUS", t[t.FILL = 8] = "FILL", t[t.CUSTOM = 9] = "CUSTOM", t))(Sh || {});
class wh {
  tick;
  type;
  customName;
  constructor({ tick: e, type: n, customName: r }) {
    this.tick = e, this.type = n, n === 9 && (this.customName = r);
  }
  getTick() {
    return this.tick;
  }
  setTick(e) {
    this.tick = e;
  }
  getType() {
    return this.type;
  }
  setType(e) {
    this.type = e;
  }
  getCustomName() {
    return this.customName;
  }
  setCustomName(e) {
    this.customName = e;
  }
}
class bh {
  song;
  lines;
  constructor({ song: e, lines: n }) {
    this.song = e, this.lines = n || [];
  }
  getLines() {
    return this.lines;
  }
  getIndexOfLineAtTick(e) {
    if (this.lines.length <= 0)
      return -1;
    const n = x.le(
      this.lines,
      {
        getStartTick: () => e
      },
      (r, i) => r.getStartTick() - i.getStartTick()
    );
    for (let r = n; r >= 0; r -= 1) {
      const i = this.lines[r];
      if (e >= i.getStartTick() && e <= i.getEndTick())
        return r;
    }
    return -1;
  }
  createLine({ startTick: e, resolveOrder: n = !0 }) {
    const r = new Z({ lyrics: this, startTick: e });
    return this.lines.push(r), n && this.sortLinesInternal(), r;
  }
  async createLineFromString({
    input: e,
    startTick: n,
    endTick: r,
    tokenizer: i = Z.DEFAULT_TOKENIZER
  }) {
    const s = this.createLine({ startTick: n });
    return e && await Z.createWordsFromString(s, e, n, r, i), s;
  }
  removeLineAtIndex(e) {
    e < 0 || e >= this.lines.length || this.lines.splice(e, 1);
  }
  cloneLine(e) {
    const n = new Z({
      lyrics: this,
      startTick: e.getStartTick()
    });
    for (const r of e.getWords())
      n.createWord({
        word: r.getWord(),
        startTick: r.getStartTick(),
        endTick: r.getEndTick()
      });
    return this.lines.push(n), n;
  }
  sortLinesInternal() {
    this.lines.sort((e, n) => e.getStartTick() - n.getStartTick());
  }
}
class Z {
  lyrics;
  words;
  constructor({ lyrics: e, startTick: n }) {
    this.lyrics = e, this.words = [
      new St({
        line: this,
        word: St.PLACEHOLDER_WORD,
        startTick: n,
        endTick: n + Zn
      })
    ];
  }
  getStartTick() {
    if (this.words.length === 0)
      throw new Error("Words cannot be empty");
    return Z.getLineStartTickImpl(this.words, (e) => e.getStartTick());
  }
  getEndTick() {
    if (this.words.length === 0)
      throw new Error("Words cannot be empty");
    return Z.getLineEndTickImpl(this.words, (e) => e.getEndTick());
  }
  static getLineStartTickImpl(e, n) {
    return !e || e.length === 0 ? 0 : n(e[0]);
  }
  static getLineEndTickImpl(e, n) {
    return n(_.max(e, n));
  }
  getWords() {
    return this.words;
  }
  moveTo(e, n) {
    const r = this.getStartTick(), i = this.getEndTick();
    if (!_.isNumber(r) || !_.isNumber(i))
      return;
    e = Math.max(e, 0);
    const s = (n - e) / (i - r);
    for (const a of this.getWords())
      a.setStartTick(
        Z.relativeMovePoint(
          a.getStartTick(),
          r,
          e,
          s
        ),
        !1
      ), a.setEndTick(
        Z.relativeMovePoint(a.getEndTick(), r, e, s),
        !1
      );
    this.lyrics.sortLinesInternal();
  }
  clear() {
    this.words = [this.createPlaceholderWord()];
  }
  async replaceWithString(e, n = Z.DEFAULT_TOKENIZER) {
    const r = this.getStartTick(), i = this.getEndTick();
    this.words = [this.createPlaceholderWord()], e && await Z.createWordsFromString(this, e, r, i, n);
  }
  static async createWordsFromString(e, n, r, i, s) {
    if (!n)
      return;
    const a = s ? await s(n) : n.split(""), o = (i - r) / a.length;
    for (let u = 0; u < a.length; u += 1) {
      const l = a[u], d = r + o * u, f = r + o * (u + 1);
      e.createWord({
        word: l,
        startTick: d,
        endTick: f,
        resolveOrder: !1
      });
    }
    e.sortWordsInternal();
  }
  createWord({
    word: e,
    startTick: n,
    endTick: r,
    resolveOrder: i = !0
  }) {
    const s = new St({ line: this, word: e, startTick: n, endTick: r });
    return this.isEmpty() ? this.words = [s] : this.words.push(s), i && this.sortWordsInternal(), s;
  }
  deleteWord(e) {
    let n = x.le(this.words, e, (r, i) => r.getStartTick() - i.getStartTick());
    for (; n >= 0 && this.words[n]; ) {
      const r = this.words[n];
      if (r.equals(e))
        return this.words.length === 1 ? this.clear() : this.words.splice(n, 1), r;
      n -= 1;
    }
    return null;
  }
  getSentence() {
    return this.isEmpty() ? "" : Z.getSentenceImpl(this.words, (e) => e.getWord());
  }
  isEmpty() {
    return Z.hasOnlyPlaceholderImpl(this.words, (e) => e.getWord());
  }
  cloneWord(e) {
    return new St({
      line: this,
      word: e.getWord(),
      startTick: e.getStartTick(),
      endTick: e.getEndTick()
    });
  }
  static getSentenceImpl(e, n) {
    return e.length === 1 && n(e[0]) === St.PLACEHOLDER_WORD ? "\u266A" : e.map(n).join("");
  }
  static hasOnlyPlaceholderImpl(e, n) {
    return e ? e.length === 1 && n(e[0]) === St.PLACEHOLDER_WORD : !0;
  }
  sortWordsInternal() {
    const e = this.getStartTick();
    this.words.sort((n, r) => n.getStartTick() - r.getStartTick()), this.getStartTick() !== e && this.lyrics.sortLinesInternal();
  }
  createPlaceholderWord() {
    return new St({
      line: this,
      word: St.PLACEHOLDER_WORD,
      startTick: this.getStartTick(),
      endTick: this.getStartTick() + Zn * 4 * 2
    });
  }
  static async DEFAULT_TOKENIZER(e) {
    const n = [];
    let r = "";
    for (const i of e)
      i === " " || /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/.test(i) ? (r && (n.push(r), r = ""), n.push(i)) : /[\p{P}]/u.test(i) ? r ? /^[']+$/.test(i) && /^[A-Za-z0-9]+$/.test(r) ? r += i : (n.push(r), n.push(i), r = "") : n.push(i) : r += i;
    return r && n.push(r), n;
  }
  static relativeMovePoint(e, n, r, i) {
    return r + (e - n) * i;
  }
}
class St {
  line;
  startTick;
  endTick;
  word;
  constructor({
    line: e,
    word: n,
    startTick: r,
    endTick: i
  }) {
    this.line = e, this.word = n, this.startTick = r, this.endTick = i;
  }
  getStartTick() {
    return this.startTick;
  }
  setStartTick(e, n = !0) {
    if (e >= this.endTick && n) {
      this.deleteFromParent();
      return;
    }
    this.startTick = e, n && this.line.sortWordsInternal();
  }
  getEndTick() {
    return this.endTick;
  }
  setEndTick(e, n = !0) {
    if (e <= this.startTick && n) {
      this.deleteFromParent();
      return;
    }
    this.endTick = e;
  }
  getWord() {
    return this.word;
  }
  setWord(e) {
    if (!e)
      throw new Error("Cannot set to empty word.");
    this.word = e;
  }
  deleteFromParent() {
    this.line.deleteWord(this);
  }
  equals(e) {
    return this.startTick === e.startTick && this.endTick === e.getEndTick() && this.word === e.getWord();
  }
  static PLACEHOLDER_WORD = "^%%^";
}
class q {
  static DEFAULT_PPQ = Zn;
  static NUM_BUSES = 32;
  masterTrack;
  tracks;
  PPQ;
  tempos;
  timeSignatures;
  structures;
  pluginContext;
  nextTrackRank = 1;
  buses = [];
  lyrics;
  constructor() {
    this.tracks = [], this.PPQ = 0, this.tempos = [], this.timeSignatures = [], this.structures = [], this.lyrics = new bh({ song: this });
  }
  static create() {
    const e = new q();
    return e.setResolution(q.DEFAULT_PPQ), e.createTempoChange({ ticks: 0, bpm: 120 }), e.createTimeSignature({ ticks: 0, numerator: 4, denominator: 4 }), e;
  }
  getBusByRank(e) {
    return this.buses[e - 1];
  }
  setBus(e, n) {
    if (e > q.NUM_BUSES)
      throw new Error(`Only ${q.NUM_BUSES} buses are supported.`);
    const r = e - 1;
    this.buses[r] ? this.buses[r].setName(n) : this.buses[r] = new Ch({ rank: e, name: n });
  }
  getMasterTrack() {
    return this.masterTrack || (this.masterTrack = new rt({
      type: Qt.MASTER_TRACK,
      song: this,
      uuid: rt.generateTrackIdInternal()
    })), this.masterTrack;
  }
  getTracks() {
    return this.tracks;
  }
  getTrackById(e) {
    return Xe(this.tracks, (n) => n.getId() === e);
  }
  getTracksByIds(e) {
    if (!this.tracks)
      return [];
    const n = new Set(e);
    return this.tracks.filter((r) => n.has(r.getId()));
  }
  getTrackIndex(e) {
    return ie(this.tracks, (n) => n.getId() === e);
  }
  createTrack({
    type: e,
    index: n,
    rank: r,
    assignDefaultSamplerPlugin: i = !1
  }) {
    r == null || r === null ? r = this.getNextTrackRank() : this.nextTrackRank = Math.max(r + 1, this.nextTrackRank);
    const s = new rt({
      type: e,
      song: this,
      uuid: this.getNextTrackId(),
      rank: r == null || r === null ? this.getNextTrackRank() : r
    });
    return i && e === Qt.MIDI_TRACK && s.setSamplerPlugin(s.createAudioPlugin(ln.DEFAULT_SYNTH_TFID)), e === Qt.AUX_TRACK && s.getAuxTrackData().setInputBusRank(1), n != null ? this.tracks.splice(n, 0, s) : this.tracks.push(s), s;
  }
  cloneTrack(e) {
    let n = this.getTrackIndex(e.getId());
    n < 0 && (n = void 0);
    const r = this.createTrack({
      type: e.getType(),
      index: n
    });
    if (r.setVolume(e.getVolume()), r.setPan(e.getPan()), r.setSolo(e.getSolo()), r.setMuted(e.getMuted()), e.getType() === Qt.MIDI_TRACK) {
      const s = e.getInstrument();
      s && r.setInstrument({
        program: s.getProgram(),
        isDrum: s.getIsDrum()
      });
      for (const o of e.getSuggestedInstruments())
        r.createSuggestedInstrument({
          program: o.getProgram(),
          isDrum: o.getIsDrum()
        });
      const a = e.getSamplerPlugin();
      a && r.setSamplerPlugin(a.clone(r));
    }
    for (let s = 0; s < rt.MAX_NUM_EFFECTS_PLUGINS; s += 1) {
      const a = e.getAudioPluginAt(s);
      !a || r.setAudioPluginAt(s, a.clone(r));
    }
    for (const s of e.getClips()) {
      const a = r.cloneClip(s);
      r.insertClip(a);
    }
    const i = e.getAuxTrackData();
    i && rr(i.getInputBusRank()) && i.getInputBusRank() > 0 && r.getAuxTrackData().setInputBusRank(
      i.getInputBusRank()
    );
    for (let s = 0; s < rt.MAX_NUM_SENDS; s += 1) {
      const a = e.getSendAt(s);
      !a || r.setSendAt(
        s,
        new nn({
          outputBusRank: a.getOutputBusRank(),
          gainLevel: a.getGainLevel(),
          position: a.getPosition(),
          muted: a.getMuted()
        })
      );
    }
    if (e.hasAnyAutomation() && r.setAutomation(e.getAutomation()), e.getOutput()) {
      const s = e.getOutput();
      r.setOutput({
        type: s.getType(),
        trackId: s.getTrackId()
      });
    }
    return r;
  }
  removeTrack(e) {
    const n = this.getTrackById(e);
    if (!n)
      return null;
    this.tracks.splice(
      ie(this.tracks, (r) => r.getId() === e),
      1
    );
    for (const r of this.tracks) {
      const i = r.getOutput();
      i && i.getType() === yr.Track && i.getTrackId() === e && r.removeOutput();
    }
    return n;
  }
  getResolution() {
    return this.PPQ;
  }
  setResolution(e) {
    this.PPQ = e;
  }
  static getLeadingBar(e, n) {
    if (!n || n.length === 0)
      return null;
    if (e < 0)
      return n[0];
    let r = x.le(n, { tick: e }, (i, s) => i.tick - s.tick);
    for (; r > 0 && n[r].beat !== 1; )
      r -= 1;
    return n[r];
  }
  static getLeadingBeat(e, n) {
    if (!n || n.length === 0)
      return null;
    if (e < 0)
      return n[0];
    const r = x.le(n, { tick: e }, (i, s) => i.tick - s.tick);
    return n[r];
  }
  static getTrailingBeat(e, n) {
    if (!n || n.length === 0)
      return null;
    if (e < 0)
      return n[0];
    const r = x.ge(n, { tick: e }, (i, s) => i.tick - s.tick);
    return r > n.length - 1 ? n[n.length - 1] : n[r];
  }
  static getClosestBeat(e, n) {
    if (!n || n.length === 0)
      return null;
    if (e < 0)
      return n[0];
    const r = x.le(n, { tick: e }, (i, s) => i.tick - s.tick);
    return r >= n.length - 1 ? n[r] : Math.abs(n[r].tick - e) > Math.abs(n[r + 1].tick - e) ? n[r + 1] : n[r];
  }
  getBarBeats(e) {
    return q.getBarBeatsImpl(
      e,
      this.PPQ,
      this.timeSignatures,
      (n) => ({
        tick: n.getTicks(),
        numerator: n.getNumerator(),
        denominator: n.getDenominator()
      })
    );
  }
  static getBarBeatsImpl(e, n, r, i) {
    if (r.length === 0)
      return [];
    const s = [];
    for (let f = 0; f < r.length; f += 1)
      if (s.length === 0)
        s.push(r[f]);
      else {
        const h = i(r[f]), m = i(
          s[s.length - 1]
        );
        (h.numerator !== m.numerator || h.denominator !== m.denominator) && s.push(r[f]);
      }
    const a = [];
    let o = 0, u = 0, l = 1, d = 1;
    for (; o <= e; ) {
      if (u < s.length - 1) {
        const m = i(
          s[u + 1]
        ).tick;
        o >= m && (o = m, u += 1, d > 1 && (d = 1, l += 1));
      }
      const f = i(
        s[u]
      );
      a.push({
        bar: l,
        beat: d,
        tick: o,
        numerator: d === 1 ? f.numerator : void 0,
        denominator: d === 1 ? f.denominator : void 0,
        ticksPerBeat: d === 1 ? n * 4 / f.denominator : void 0
      }), d >= f.numerator ? (d = 1, l += 1) : d += 1, o += n * 4 / f.denominator;
    }
    return a;
  }
  getTempoChanges() {
    return this.tempos;
  }
  getTempoAtTick(e) {
    return q.getTempoAtTickImpl(
      e,
      this.tempos,
      (n) => ({
        getTicks: () => n
      }),
      (n) => n.getTicks()
    );
  }
  static getTempoAtTickImpl(e, n, r, i) {
    let s = x.le(
      n,
      r(e),
      (a, o) => i(a) - i(o)
    );
    return s < 0 && (s = 0), s >= n.length && (s = n.length - 1), n[s];
  }
  createTempoChange({
    ticks: e,
    bpm: n
  }) {
    if (this.PPQ <= 0)
      throw new Error("Song resolution must be provided before creating tempo changes.");
    if (this.tempos.length === 0 && e !== 0)
      throw new Error("The first tempo event must be at tick 0");
    const r = new On({ ticks: e, bpm: n, time: this.tickToSeconds(e) }), i = x.ge(
      this.tempos,
      r,
      (s, a) => s.getTicks() - a.getTicks()
    );
    return i < 0 ? this.tempos.push(r) : this.tempos.splice(i, 0, r), this.retimingTempoEvents(), r;
  }
  removeTempoChange(e) {
    if (this.getTempoChanges().length <= 1)
      throw new Error("Song has to have at least one tempo change.");
    if (e === 0)
      throw new Error("Cannot remove the first tempo.");
    this.getTempoChanges().splice(e, 1), this.retimingTempoEvents();
  }
  overwriteTempoChanges(e) {
    if (e.length === 0)
      throw new Error("Cannot clear all the tempo events.");
    const n = Ti(e);
    n.sort((i, s) => i.getTicks() - s.getTicks());
    const r = n[0];
    r.getTicks() > 0 && (r.ticks = 0, r.setTimeInternal(0)), this.tempos = [
      new On({
        ticks: 0,
        time: 0,
        bpm: r.getBpm()
      })
    ];
    for (let i = 1; i < n.length; i += 1) {
      const s = n[i];
      this.createTempoChange({
        ticks: s.getTicks(),
        bpm: s.getBpm()
      });
    }
    this.retimingTempoEvents();
  }
  updateTempo(e, n) {
    e.setBpmInternal(n), this.retimingTempoEvents();
  }
  moveTempo(e, n) {
    const r = this.getTempoChanges()[e];
    if (!r || e === 0)
      return;
    if (this.getTempoChanges()[e - 1].getTicks() === n)
      this.removeTempoChange(e - 1);
    else if (e < this.getTempoChanges().length - 1) {
      const s = this.getTempoChanges()[e + 1];
      s && s.getTicks() === n && this.removeTempoChange(e + 1);
    }
    r.ticks = n, this.retimingTempoEvents();
  }
  updateTempoAtTick(e, n) {
    const r = this.getTempoAtTick(e);
    r ? this.updateTempo(r, n) : this.createTempoChange({
      ticks: e,
      bpm: n
    });
  }
  getTimeSignatures() {
    return this.timeSignatures;
  }
  overwriteTimeSignatures(e) {
    if (e.length === 0)
      throw new Error("At least one time signature needs to be present.");
    this.timeSignatures = Ti(e);
  }
  createTimeSignature({
    ticks: e,
    numerator: n,
    denominator: r
  }) {
    const i = new Ei({ ticks: e, numerator: n, denominator: r }), s = x.ge(
      this.timeSignatures,
      i,
      (a, o) => a.getTicks() - o.getTicks()
    );
    return s < 0 ? this.timeSignatures.push(i) : this.timeSignatures.splice(s, 0, i), i;
  }
  removeTimeSignature(e) {
    if (this.getTimeSignatures().length <= 1)
      throw new Error("Song has to have at least one time signature change.");
    if (e === 0)
      throw new Error("Cannot remove the first time signature.");
    this.getTimeSignatures().splice(e, 1);
  }
  updateTimeSignatureAtTick(e, n, r) {
    const i = this.getTimeSignatureAtTick(e);
    i ? (i.setNumerator(n), i.setDenominator(r)) : this.createTimeSignature({
      ticks: e,
      numerator: n,
      denominator: r
    });
  }
  moveTimeSignature(e, n) {
    const r = this.getTimeSignatures()[e];
    if (!r || e == 0)
      return;
    if (this.getTimeSignatures()[e - 1].getTicks() === n)
      this.removeTimeSignature(e - 1);
    else if (e < this.getTimeSignatures().length - 1) {
      const s = this.getTimeSignatures()[e + 1];
      s && s.getTicks() === n && this.removeTimeSignature(e + 1);
    }
    r.ticks = n, this.timeSignatures.sort((s, a) => s.getTicks() - a.getTicks());
  }
  getStructures() {
    return this.structures;
  }
  getStructureAtIndex(e) {
    return this.structures[e];
  }
  getStructureAtTick(e) {
    return q.getStructureAtTickImpl(
      e,
      this.structures,
      (n) => ({ getTick: () => n }),
      (n) => n.getTick()
    );
  }
  static getStructureAtTickImpl(e, n, r, i) {
    let s = x.le(
      n,
      r(e),
      (a, o) => i(a) - i(o)
    );
    return s < 0 && (s = 0), s >= n.length && (s = n.length - 1), n[s];
  }
  createStructure({
    tick: e,
    type: n,
    customName: r
  }) {
    const i = new wh({
      tick: e,
      type: n,
      customName: r
    });
    this.structures.push(i), this.structures.length === 1 && i.setTick(0), this.structures.sort((s, a) => s.getTick() - a.getTick());
  }
  moveStructure(e, n) {
    if (e <= 0)
      return;
    const r = this.getStructures()[e];
    if (!r)
      return;
    if (this.getStructures()[e - 1].getTick() === n)
      this.removeStructure(e - 1);
    else if (e < this.getStructures().length - 1) {
      const s = this.getStructures()[e + 1];
      s && s.getTick() === n && this.removeStructure(e + 1);
    }
    r.tick = n, this.structures.sort((s, a) => s.getTick() - a.getTick());
  }
  updateStructureAtTick(e, n) {
    const r = this.getStructureAtTick(e);
    r ? r.setType(n) : this.createStructure({
      tick: e,
      type: n
    });
  }
  removeStructure(e) {
    e < 0 || e >= this.structures.length || (this.getStructures().splice(e, 1), this.structures.length > 0 && this.structures[0].getTick() > 0 && this.structures[0].setTick(0), this.structures.sort((n, r) => n.getTick() - r.getTick()));
  }
  getLastTick() {
    let e = 0;
    for (const n of this.tracks)
      e = Math.max(e, n.getTrackEndTick());
    return e;
  }
  getDuration() {
    return this.tickToSeconds(this.getLastTick());
  }
  getTicksPerBeatAtTick(e) {
    const n = this.getTimeSignatureAtTick(e);
    return this.getResolution() * (4 / n.getDenominator());
  }
  getTimeSignatureAtTick(e) {
    return q.getTimeSignatureAtTickImpl(
      e,
      this.timeSignatures,
      (n) => ({
        getTicks: () => n
      }),
      (n) => n.getTicks()
    );
  }
  static getTimeSignatureAtTickImpl(e, n, r, i) {
    let s = x.le(
      n,
      r(e),
      (a, o) => i(a) - i(o)
    );
    return s < 0 && (s = 0), s >= n.length && (s = n.length - 1), n[s];
  }
  tickToSeconds(e) {
    return q.tickToSecondsImpl(
      e,
      this.getTempoChanges(),
      this.getResolution(),
      (n) => ({
        getTicks: () => n
      }),
      (n) => n.getTicks(),
      (n) => ({
        tick: n.getTicks(),
        bpm: n.getBpm(),
        time: n.getTime()
      })
    );
  }
  static tickToSecondsImpl(e, n, r, i, s, a) {
    if (e === 0)
      return 0;
    let o = x.lt(
      n,
      i(e),
      (h, m) => s(h) - s(m)
    );
    o == -1 && (o = 0);
    const u = n[o], l = a(u), d = e - l.tick, f = q.tempoBPMToTicksPerSecond(
      l.bpm,
      r
    );
    return l.time + d / f;
  }
  secondsToTick(e) {
    return q.secondsToTickImpl(
      e,
      this.PPQ,
      this.tempos,
      (n) => ({ getTime: () => n }),
      (n) => n.getTime(),
      (n) => ({
        tick: n.getTicks(),
        bpm: n.getBpm(),
        time: n.getTime()
      })
    );
  }
  advanceTickByBars(e, n, r, i) {
    if (e < 0 || n < 0 || r < 0)
      return null;
    let s = x.le(
      i,
      { tick: e },
      (u, l) => u.tick - l.tick
    );
    const a = i[s < 0 ? 0 : s];
    if (!a)
      return null;
    for (; s < i.length; s += 1) {
      const u = i[s];
      if (u.bar - a.bar >= n && (u.bar - a.bar > n || u.beat >= r + 1))
        break;
    }
    const o = i[s];
    return o ? o.tick : null;
  }
  static secondsToTickImpl(e, n, r, i, s, a) {
    if (e === 0)
      return 0;
    let o = x.lt(
      r,
      i(e),
      (h, m) => s(h) - s(m)
    );
    o == -1 && (o = 0);
    const u = r[o], l = a(u), d = e - l.time, f = q.tempoBPMToTicksPerSecond(
      l.bpm,
      n
    );
    return Math.round(l.tick + d * f);
  }
  static importMIDI(e, n, r = 0, i = !1, s = -1) {
    const a = new da.Midi(n), o = r, u = q.DEFAULT_PPQ / a.header.ppq;
    if (i) {
      const d = [];
      for (const h of a.header.timeSignatures)
        d.push(
          new Ei({
            ticks: o + Ot(h.ticks, u),
            numerator: h.timeSignature[0],
            denominator: h.timeSignature[1]
          })
        );
      d.length > 0 && (o > 0 && d[0].setTicks(0), e.overwriteTimeSignatures(d));
      const f = [];
      for (const h of a.header.tempos)
        f.push(
          new On({
            ticks: o + Ot(h.ticks, u),
            time: h.time,
            bpm: h.bpm
          })
        );
      f.length > 0 && (o > 0 && (f[0].ticks = 0), e.overwriteTempoChanges(f));
    }
    s < 0 && (s = e.getTracks().length);
    const l = [];
    for (const d of a.tracks) {
      let f;
      s < e.getTracks().length ? f = e.getTracks()[s] : f = e.createTrack({
        type: Qt.MIDI_TRACK,
        assignDefaultSamplerPlugin: !0
      }), l.push(f), s += 1, f.setInstrument({
        program: d.instrument.number,
        isDrum: d.instrument.percussion
      });
      const h = f.createMIDIClip({ clipStartTick: o });
      let m = Number.MAX_SAFE_INTEGER;
      for (const k of d.notes)
        h.createNote({
          pitch: k.midi,
          velocity: Math.round(k.velocity * 127),
          startTick: o + Ot(k.ticks, u),
          endTick: o + Ot(k.ticks + k.durationTicks, u)
        }), m = Math.min(
          m,
          o + Ot(k.ticks, u)
        );
      const v = d.controlChanges[7];
      if (v)
        if (v.length === 1)
          f.setVolume(v[0].value);
        else {
          const k = new nt(tr.VOLUME);
          f.getAutomation().addAutomation(k);
          const C = f.getAutomation().getAutomationValueByTarget(k);
          for (const O of v)
            C.addPoint(
              o + Ot(O.ticks, u),
              O.value
            );
        }
      const w = d.controlChanges[10];
      if (w)
        if (w.length === 1) {
          const k = Math.round(w[0].value * 127 - 64);
          f.setPan(k);
        } else {
          const k = new nt(tr.PAN);
          f.getAutomation().addAutomation(k);
          const C = f.getAutomation().getAutomationValueByTarget(k);
          for (const O of w)
            C.addPoint(o + Ot(O.ticks, u), O.value);
        }
      m !== Number.MAX_SAFE_INTEGER && h.adjustClipLeft(m);
    }
    return l;
  }
  setPluginContextInternal(e) {
    this.pluginContext = {
      plugin: e,
      numTracksCreatedByPlugin: 0
    };
  }
  clearPluginContextInternal() {
    this.pluginContext = void 0;
  }
  getNextTrackId() {
    const e = this.pluginContext, n = e.plugin.generatedTrackIdsInternal;
    if (e.numTracksCreatedByPlugin === n.length)
      n.push(rt.generateTrackIdInternal());
    else if (e.numTracksCreatedByPlugin > n.length)
      throw new Error("Plugin generated track ids out of sync.");
    const r = n[e.numTracksCreatedByPlugin];
    return e.numTracksCreatedByPlugin += 1, r;
  }
  getNextTrackRank() {
    const e = this.nextTrackRank;
    return this.nextTrackRank += 1, e;
  }
  static tempoBPMToTicksPerSecond(e, n) {
    return e * n / 60;
  }
  retimingTempoEvents() {
    this.tempos.sort((e, n) => e.getTicks() - n.getTicks());
    for (const e of this.tempos)
      e.setTimeInternal(this.tickToSeconds(e.getTicks()));
  }
  getLyrics() {
    return this.lyrics;
  }
}
function Ot(t, e) {
  return Math.round(t * e);
}
class Ch {
  rank;
  name;
  constructor({
    rank: e,
    name: n
  }) {
    this.rank = e, this.name = n;
  }
  getRank() {
    return this.rank;
  }
  getName() {
    return this.name;
  }
  setName(e) {
    this.name = e;
  }
}
var V = /* @__PURE__ */ ((t) => (t[t.Slider = 1] = "Slider", t[t.Input = 2] = "Input", t[t.TrackSelector = 3] = "TrackSelector", t[t.Pitch = 4] = "Pitch", t[t.TrackPitchSelector = 5] = "TrackPitchSelector", t[t.InstrumentSelector = 6] = "InstrumentSelector", t[t.Select = 7] = "Select", t[t.Switch = 8] = "Switch", t[t.InputNumber = 9] = "InputNumber", t[t.MultiTrackSelector = 10] = "MultiTrackSelector", t[t.None = 11] = "None", t[t.FileSelector = 12] = "FileSelector", t[t.MultiSourceAudioSelector = 13] = "MultiSourceAudioSelector", t[t.AudioRecorder = 14] = "AudioRecorder", t[t.SelectList = 15] = "SelectList", t[t.Descriptions = 16] = "Descriptions", t[t.TextArea = 17] = "TextArea", t))(V || {});
async function Vh(t) {
  return t.arrayBuffer();
}
var Ih = /* @__PURE__ */ ((t) => (t[t.SelectedTrackIds = 1] = "SelectedTrackIds", t[t.SelectedClipInfos = 2] = "SelectedClipInfos", t[t.TickAtPlayhead = 3] = "TickAtPlayhead", t[t.EditingClipInfo = 4] = "EditingClipInfo", t[t.EditingNoteIds = 5] = "EditingNoteIds", t[t.TickAtPlayheadSnappedToBeat = 6] = "TickAtPlayheadSnappedToBeat", t[t.ClipAudioData = 7] = "ClipAudioData", t[t.Language = 8] = "Language", t))(Ih || {});
const Lh = {
  Generate: "generate",
  Transcribe: "transcribe",
  SeparateSource: "separate_source",
  Import: "import"
};
export {
  ln as AudioPlugin,
  Or as AutomationData,
  nt as AutomationTarget,
  tr as AutomationTargetType,
  re as AutomationValue,
  Af as AuxTrackData,
  A as Clip,
  ge as ClipType,
  Zn as DEFAULT_PPQ,
  Of as DrumInstrumentType,
  Ef as DrumPitch,
  Ih as InjectSource,
  Z as LyricLine,
  St as LyricWord,
  bh as Lyrics,
  Nf as MelodicInstrumentType,
  It as Note,
  _f as SUPPORTED_AUDIO_FORMATS,
  Bh as SUPPORTED_IMPORT_FILE_FORMATS,
  q as Song,
  wh as StructureMarker,
  Sh as StructureType,
  On as TempoEvent,
  Ah as TickToSecondStepper,
  Ei as TimeSignatureEvent,
  rt as Track,
  xf as TrackOutput,
  yr as TrackOutputType,
  nn as TrackSend,
  Pf as TrackSendPosition,
  Qt as TrackType,
  yt as TuneflowPipeline,
  Gn as TuneflowPlugin,
  Lh as TuneflowPluginCategory,
  V as WidgetType,
  Cf as areTuneflowIdsEqual,
  If as areTuneflowIdsEqualIgnoreVersion,
  Tf as dbToVolumeValue,
  en as decodeAudioPluginTuneflowId,
  xh as gainToDb,
  yh as gainToVolumeValue,
  $i as getAudioPluginTuneflowId,
  bf as getAudioPluginVersionlessTuneflowId,
  Vh as getFileContentFromFileSelector,
  Uh as maybeToRaw,
  Eh as midiNumberToPitch,
  Fh as pitchToHz,
  _h as pitchToMidiNumber,
  Rh as remapRange,
  Ph as toVersionlessTfId,
  Nh as volumeValueToDb,
  Oh as volumeValueToGain
};
