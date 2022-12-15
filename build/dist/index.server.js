var $i = "1.13.6", ci = typeof self == "object" && self.self === self && self || typeof global == "object" && global.global === global && global || Function("return this")() || {}, Ye = Array.prototype, qn = Object.prototype, ui = typeof Symbol < "u" ? Symbol.prototype : null, Mo = Ye.push, fe = Ye.slice, oe = qn.toString, Ko = qn.hasOwnProperty, Gi = typeof ArrayBuffer < "u", qo = typeof DataView < "u", Wo = Array.isArray, li = Object.keys, fi = Object.create, hi = Gi && ArrayBuffer.isView, Jo = isNaN, Xo = isFinite, Di = !{ toString: null }.propertyIsEnumerable("toString"), gi = [
  "valueOf",
  "isPrototypeOf",
  "toString",
  "propertyIsEnumerable",
  "hasOwnProperty",
  "toLocaleString"
], Qo = Math.pow(2, 53) - 1;
function M(t, e) {
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
function Ot(t) {
  var e = typeof t;
  return e === "function" || e === "object" && !!t;
}
function Yo(t) {
  return t === null;
}
function zi(t) {
  return t === void 0;
}
function Mi(t) {
  return t === !0 || t === !1 || oe.call(t) === "[object Boolean]";
}
function jo(t) {
  return !!(t && t.nodeType === 1);
}
function y(t) {
  var e = "[object " + t + "]";
  return function(n) {
    return oe.call(n) === e;
  };
}
const Wn = y("String"), Ki = y("Number"), Zo = y("Date"), tc = y("RegExp"), ec = y("Error"), qi = y("Symbol"), Wi = y("ArrayBuffer");
var Ji = y("Function"), nc = ci.document && ci.document.childNodes;
typeof /./ != "function" && typeof Int8Array != "object" && typeof nc != "function" && (Ji = function(t) {
  return typeof t == "function" || !1;
});
const L = Ji, Xi = y("Object");
var Qi = qo && Xi(new DataView(new ArrayBuffer(8))), Jn = typeof Map < "u" && Xi(/* @__PURE__ */ new Map()), rc = y("DataView");
function ic(t) {
  return t != null && L(t.getInt8) && Wi(t.buffer);
}
const $e = Qi ? ic : rc, yt = Wo || y("Array");
function bt(t, e) {
  return t != null && Ko.call(t, e);
}
var An = y("Arguments");
(function() {
  An(arguments) || (An = function(t) {
    return bt(t, "callee");
  });
})();
const Xn = An;
function sc(t) {
  return !qi(t) && Xo(t) && !isNaN(parseFloat(t));
}
function Yi(t) {
  return Ki(t) && Jo(t);
}
function ji(t) {
  return function() {
    return t;
  };
}
function Zi(t) {
  return function(e) {
    var n = t(e);
    return typeof n == "number" && n >= 0 && n <= Qo;
  };
}
function ts(t) {
  return function(e) {
    return e == null ? void 0 : e[t];
  };
}
const Ge = ts("byteLength"), ac = Zi(Ge);
var oc = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
function cc(t) {
  return hi ? hi(t) && !$e(t) : ac(t) && oc.test(oe.call(t));
}
const es = Gi ? cc : ji(!1), K = ts("length");
function uc(t) {
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
function ns(t, e) {
  e = uc(e);
  var n = gi.length, r = t.constructor, i = L(r) && r.prototype || qn, s = "constructor";
  for (bt(t, s) && !e.contains(s) && e.push(s); n--; )
    s = gi[n], s in t && t[s] !== i[s] && !e.contains(s) && e.push(s);
}
function P(t) {
  if (!Ot(t))
    return [];
  if (li)
    return li(t);
  var e = [];
  for (var n in t)
    bt(t, n) && e.push(n);
  return Di && ns(t, e), e;
}
function lc(t) {
  if (t == null)
    return !0;
  var e = K(t);
  return typeof e == "number" && (yt(t) || Wn(t) || Xn(t)) ? e === 0 : K(P(t)) === 0;
}
function rs(t, e) {
  var n = P(e), r = n.length;
  if (t == null)
    return !r;
  for (var i = Object(t), s = 0; s < r; s++) {
    var a = n[s];
    if (e[a] !== i[a] || !(a in i))
      return !1;
  }
  return !0;
}
function S(t) {
  if (t instanceof S)
    return t;
  if (!(this instanceof S))
    return new S(t);
  this._wrapped = t;
}
S.VERSION = $i;
S.prototype.value = function() {
  return this._wrapped;
};
S.prototype.valueOf = S.prototype.toJSON = S.prototype.value;
S.prototype.toString = function() {
  return String(this._wrapped);
};
function di(t) {
  return new Uint8Array(
    t.buffer || t,
    t.byteOffset || 0,
    Ge(t)
  );
}
var pi = "[object DataView]";
function On(t, e, n, r) {
  if (t === e)
    return t !== 0 || 1 / t === 1 / e;
  if (t == null || e == null)
    return !1;
  if (t !== t)
    return e !== e;
  var i = typeof t;
  return i !== "function" && i !== "object" && typeof e != "object" ? !1 : is(t, e, n, r);
}
function is(t, e, n, r) {
  t instanceof S && (t = t._wrapped), e instanceof S && (e = e._wrapped);
  var i = oe.call(t);
  if (i !== oe.call(e))
    return !1;
  if (Qi && i == "[object Object]" && $e(t)) {
    if (!$e(e))
      return !1;
    i = pi;
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
      return ui.valueOf.call(t) === ui.valueOf.call(e);
    case "[object ArrayBuffer]":
    case pi:
      return is(di(t), di(e), n, r);
  }
  var s = i === "[object Array]";
  if (!s && es(t)) {
    var a = Ge(t);
    if (a !== Ge(e))
      return !1;
    if (t.buffer === e.buffer && t.byteOffset === e.byteOffset)
      return !0;
    s = !0;
  }
  if (!s) {
    if (typeof t != "object" || typeof e != "object")
      return !1;
    var o = t.constructor, l = e.constructor;
    if (o !== l && !(L(o) && o instanceof o && L(l) && l instanceof l) && "constructor" in t && "constructor" in e)
      return !1;
  }
  n = n || [], r = r || [];
  for (var u = n.length; u--; )
    if (n[u] === t)
      return r[u] === e;
  if (n.push(t), r.push(e), s) {
    if (u = t.length, u !== e.length)
      return !1;
    for (; u--; )
      if (!On(t[u], e[u], n, r))
        return !1;
  } else {
    var g = P(t), h;
    if (u = g.length, P(e).length !== u)
      return !1;
    for (; u--; )
      if (h = g[u], !(bt(e, h) && On(t[h], e[h], n, r)))
        return !1;
  }
  return n.pop(), r.pop(), !0;
}
function fc(t, e) {
  return On(t, e);
}
function he(t) {
  if (!Ot(t))
    return [];
  var e = [];
  for (var n in t)
    e.push(n);
  return Di && ns(t, e), e;
}
function Qn(t) {
  var e = K(t);
  return function(n) {
    if (n == null)
      return !1;
    var r = he(n);
    if (K(r))
      return !1;
    for (var i = 0; i < e; i++)
      if (!L(n[t[i]]))
        return !1;
    return t !== os || !L(n[Yn]);
  };
}
var Yn = "forEach", ss = "has", jn = ["clear", "delete"], as = ["get", ss, "set"], hc = jn.concat(Yn, as), os = jn.concat(as), gc = ["add"].concat(jn, Yn, ss);
const dc = Jn ? Qn(hc) : y("Map"), pc = Jn ? Qn(os) : y("WeakMap"), mc = Jn ? Qn(gc) : y("Set"), vc = y("WeakSet");
function Jt(t) {
  for (var e = P(t), n = e.length, r = Array(n), i = 0; i < n; i++)
    r[i] = t[e[i]];
  return r;
}
function bc(t) {
  for (var e = P(t), n = e.length, r = Array(n), i = 0; i < n; i++)
    r[i] = [e[i], t[e[i]]];
  return r;
}
function cs(t) {
  for (var e = {}, n = P(t), r = 0, i = n.length; r < i; r++)
    e[t[n[r]]] = n[r];
  return e;
}
function yn(t) {
  var e = [];
  for (var n in t)
    L(t[n]) && e.push(n);
  return e.sort();
}
function Zn(t, e) {
  return function(n) {
    var r = arguments.length;
    if (e && (n = Object(n)), r < 2 || n == null)
      return n;
    for (var i = 1; i < r; i++)
      for (var s = arguments[i], a = t(s), o = a.length, l = 0; l < o; l++) {
        var u = a[l];
        (!e || n[u] === void 0) && (n[u] = s[u]);
      }
    return n;
  };
}
const us = Zn(he), De = Zn(P), ls = Zn(he, !0);
function wc() {
  return function() {
  };
}
function fs(t) {
  if (!Ot(t))
    return {};
  if (fi)
    return fi(t);
  var e = wc();
  e.prototype = t;
  var n = new e();
  return e.prototype = null, n;
}
function Sc(t, e) {
  var n = fs(t);
  return e && De(n, e), n;
}
function kc(t) {
  return Ot(t) ? yt(t) ? t.slice() : us({}, t) : t;
}
function Cc(t, e) {
  return e(t), t;
}
function hs(t) {
  return yt(t) ? t : [t];
}
S.toPath = hs;
function ge(t) {
  return S.toPath(t);
}
function tr(t, e) {
  for (var n = e.length, r = 0; r < n; r++) {
    if (t == null)
      return;
    t = t[e[r]];
  }
  return n ? t : void 0;
}
function gs(t, e, n) {
  var r = tr(t, ge(e));
  return zi(r) ? n : r;
}
function Ic(t, e) {
  e = ge(e);
  for (var n = e.length, r = 0; r < n; r++) {
    var i = e[r];
    if (!bt(t, i))
      return !1;
    t = t[i];
  }
  return !!n;
}
function er(t) {
  return t;
}
function ce(t) {
  return t = De({}, t), function(e) {
    return rs(e, t);
  };
}
function nr(t) {
  return t = ge(t), function(e) {
    return tr(e, t);
  };
}
function de(t, e, n) {
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
function ds(t, e, n) {
  return t == null ? er : L(t) ? de(t, e, n) : Ot(t) && !yt(t) ? ce(t) : nr(t);
}
function rr(t, e) {
  return ds(t, e, 1 / 0);
}
S.iteratee = rr;
function q(t, e, n) {
  return S.iteratee !== rr ? S.iteratee(t, e) : ds(t, e, n);
}
function _c(t, e, n) {
  e = q(e, n);
  for (var r = P(t), i = r.length, s = {}, a = 0; a < i; a++) {
    var o = r[a];
    s[o] = e(t[o], o, t);
  }
  return s;
}
function ps() {
}
function xc(t) {
  return t == null ? ps : function(e) {
    return gs(t, e);
  };
}
function Ec(t, e, n) {
  var r = Array(Math.max(0, t));
  e = de(e, n, 1);
  for (var i = 0; i < t; i++)
    r[i] = e(i);
  return r;
}
function Vn(t, e) {
  return e == null && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1));
}
const ue = Date.now || function() {
  return new Date().getTime();
};
function ms(t) {
  var e = function(s) {
    return t[s];
  }, n = "(?:" + P(t).join("|") + ")", r = RegExp(n), i = RegExp(n, "g");
  return function(s) {
    return s = s == null ? "" : "" + s, r.test(s) ? s.replace(i, e) : s;
  };
}
const vs = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
}, Tc = ms(vs), Pc = cs(vs), Nc = ms(Pc), Ac = S.templateSettings = {
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  escape: /<%-([\s\S]+?)%>/g
};
var Sn = /(.)^/, Oc = {
  "'": "'",
  "\\": "\\",
  "\r": "r",
  "\n": "n",
  "\u2028": "u2028",
  "\u2029": "u2029"
}, yc = /\\|'|\r|\n|\u2028|\u2029/g;
function Vc(t) {
  return "\\" + Oc[t];
}
var Rc = /^\s*(\w|\$)+\s*$/;
function Fc(t, e, n) {
  !e && n && (e = n), e = ls({}, e, S.templateSettings);
  var r = RegExp([
    (e.escape || Sn).source,
    (e.interpolate || Sn).source,
    (e.evaluate || Sn).source
  ].join("|") + "|$", "g"), i = 0, s = "__p+='";
  t.replace(r, function(u, g, h, p, v) {
    return s += t.slice(i, v).replace(yc, Vc), i = v + u.length, g ? s += `'+
((__t=(` + g + `))==null?'':_.escape(__t))+
'` : h ? s += `'+
((__t=(` + h + `))==null?'':__t)+
'` : p && (s += `';
` + p + `
__p+='`), u;
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
  } catch (u) {
    throw u.source = s, u;
  }
  var l = function(u) {
    return o.call(this, u, S);
  };
  return l.source = "function(" + a + `){
` + s + "}", l;
}
function Bc(t, e, n) {
  e = ge(e);
  var r = e.length;
  if (!r)
    return L(n) ? n.call(t) : n;
  for (var i = 0; i < r; i++) {
    var s = t == null ? void 0 : t[e[i]];
    s === void 0 && (s = n, i = r), t = L(s) ? s.call(t) : s;
  }
  return t;
}
var Uc = 0;
function Lc(t) {
  var e = ++Uc + "";
  return t ? t + e : e;
}
function Hc(t) {
  var e = S(t);
  return e._chain = !0, e;
}
function bs(t, e, n, r, i) {
  if (!(r instanceof e))
    return t.apply(n, i);
  var s = fs(t.prototype), a = t.apply(s, i);
  return Ot(a) ? a : s;
}
var Xt = M(function(t, e) {
  var n = Xt.placeholder, r = function() {
    for (var i = 0, s = e.length, a = Array(s), o = 0; o < s; o++)
      a[o] = e[o] === n ? arguments[i++] : e[o];
    for (; i < arguments.length; )
      a.push(arguments[i++]);
    return bs(t, r, this, this, a);
  };
  return r;
});
Xt.placeholder = S;
const ws = M(function(t, e, n) {
  if (!L(t))
    throw new TypeError("Bind must be called on a function");
  var r = M(function(i) {
    return bs(t, r, e, this, n.concat(i));
  });
  return r;
}), W = Zi(K);
function Vt(t, e, n, r) {
  if (r = r || [], !e && e !== 0)
    e = 1 / 0;
  else if (e <= 0)
    return r.concat(t);
  for (var i = r.length, s = 0, a = K(t); s < a; s++) {
    var o = t[s];
    if (W(o) && (yt(o) || Xn(o)))
      if (e > 1)
        Vt(o, e - 1, n, r), i = r.length;
      else
        for (var l = 0, u = o.length; l < u; )
          r[i++] = o[l++];
    else
      n || (r[i++] = o);
  }
  return r;
}
const $c = M(function(t, e) {
  e = Vt(e, !1, !1);
  var n = e.length;
  if (n < 1)
    throw new Error("bindAll must be passed function names");
  for (; n--; ) {
    var r = e[n];
    t[r] = ws(t[r], t);
  }
  return t;
});
function Gc(t, e) {
  var n = function(r) {
    var i = n.cache, s = "" + (e ? e.apply(this, arguments) : r);
    return bt(i, s) || (i[s] = t.apply(this, arguments)), i[s];
  };
  return n.cache = {}, n;
}
const Ss = M(function(t, e, n) {
  return setTimeout(function() {
    return t.apply(null, n);
  }, e);
}), Dc = Xt(Ss, S, 1);
function zc(t, e, n) {
  var r, i, s, a, o = 0;
  n || (n = {});
  var l = function() {
    o = n.leading === !1 ? 0 : ue(), r = null, a = t.apply(i, s), r || (i = s = null);
  }, u = function() {
    var g = ue();
    !o && n.leading === !1 && (o = g);
    var h = e - (g - o);
    return i = this, s = arguments, h <= 0 || h > e ? (r && (clearTimeout(r), r = null), o = g, a = t.apply(i, s), r || (i = s = null)) : !r && n.trailing !== !1 && (r = setTimeout(l, h)), a;
  };
  return u.cancel = function() {
    clearTimeout(r), o = 0, r = i = s = null;
  }, u;
}
function Mc(t, e, n) {
  var r, i, s, a, o, l = function() {
    var g = ue() - i;
    e > g ? r = setTimeout(l, e - g) : (r = null, n || (a = t.apply(o, s)), r || (s = o = null));
  }, u = M(function(g) {
    return o = this, s = g, i = ue(), r || (r = setTimeout(l, e), n && (a = t.apply(o, s))), a;
  });
  return u.cancel = function() {
    clearTimeout(r), r = s = o = null;
  }, u;
}
function Kc(t, e) {
  return Xt(e, t);
}
function ir(t) {
  return function() {
    return !t.apply(this, arguments);
  };
}
function qc() {
  var t = arguments, e = t.length - 1;
  return function() {
    for (var n = e, r = t[e].apply(this, arguments); n--; )
      r = t[n].call(this, r);
    return r;
  };
}
function Wc(t, e) {
  return function() {
    if (--t < 1)
      return e.apply(this, arguments);
  };
}
function ks(t, e) {
  var n;
  return function() {
    return --t > 0 && (n = e.apply(this, arguments)), t <= 1 && (e = null), n;
  };
}
const Jc = Xt(ks, 2);
function Cs(t, e, n) {
  e = q(e, n);
  for (var r = P(t), i, s = 0, a = r.length; s < a; s++)
    if (i = r[s], e(t[i], i, t))
      return i;
}
function Is(t) {
  return function(e, n, r) {
    n = q(n, r);
    for (var i = K(e), s = t > 0 ? 0 : i - 1; s >= 0 && s < i; s += t)
      if (n(e[s], s, e))
        return s;
    return -1;
  };
}
const qt = Is(1), _s = Is(-1);
function xs(t, e, n, r) {
  n = q(n, r, 1);
  for (var i = n(e), s = 0, a = K(t); s < a; ) {
    var o = Math.floor((s + a) / 2);
    n(t[o]) < i ? s = o + 1 : a = o;
  }
  return s;
}
function Es(t, e, n) {
  return function(r, i, s) {
    var a = 0, o = K(r);
    if (typeof s == "number")
      t > 0 ? a = s >= 0 ? s : Math.max(s + o, a) : o = s >= 0 ? Math.min(s + 1, o) : s + o + 1;
    else if (n && s && o)
      return s = n(r, i), r[s] === i ? s : -1;
    if (i !== i)
      return s = e(fe.call(r, a, o), Yi), s >= 0 ? s + a : -1;
    for (s = t > 0 ? a : o - 1; s >= 0 && s < o; s += t)
      if (r[s] === i)
        return s;
    return -1;
  };
}
const Ts = Es(1, qt, xs), Xc = Es(-1, _s);
function ze(t, e, n) {
  var r = W(t) ? qt : Cs, i = r(t, e, n);
  if (i !== void 0 && i !== -1)
    return t[i];
}
function Qc(t, e) {
  return ze(t, ce(e));
}
function ut(t, e, n) {
  e = de(e, n);
  var r, i;
  if (W(t))
    for (r = 0, i = t.length; r < i; r++)
      e(t[r], r, t);
  else {
    var s = P(t);
    for (r = 0, i = s.length; r < i; r++)
      e(t[s[r]], s[r], t);
  }
  return t;
}
function Nt(t, e, n) {
  e = q(e, n);
  for (var r = !W(t) && P(t), i = (r || t).length, s = Array(i), a = 0; a < i; a++) {
    var o = r ? r[a] : a;
    s[a] = e(t[o], o, t);
  }
  return s;
}
function Ps(t) {
  var e = function(n, r, i, s) {
    var a = !W(n) && P(n), o = (a || n).length, l = t > 0 ? 0 : o - 1;
    for (s || (i = n[a ? a[l] : l], l += t); l >= 0 && l < o; l += t) {
      var u = a ? a[l] : l;
      i = r(i, n[u], u, n);
    }
    return i;
  };
  return function(n, r, i, s) {
    var a = arguments.length >= 3;
    return e(n, de(r, s, 4), i, a);
  };
}
const kn = Ps(1), mi = Ps(-1);
function Wt(t, e, n) {
  var r = [];
  return e = q(e, n), ut(t, function(i, s, a) {
    e(i, s, a) && r.push(i);
  }), r;
}
function Yc(t, e, n) {
  return Wt(t, ir(q(e)), n);
}
function vi(t, e, n) {
  e = q(e, n);
  for (var r = !W(t) && P(t), i = (r || t).length, s = 0; s < i; s++) {
    var a = r ? r[s] : s;
    if (!e(t[a], a, t))
      return !1;
  }
  return !0;
}
function bi(t, e, n) {
  e = q(e, n);
  for (var r = !W(t) && P(t), i = (r || t).length, s = 0; s < i; s++) {
    var a = r ? r[s] : s;
    if (e(t[a], a, t))
      return !0;
  }
  return !1;
}
function ct(t, e, n, r) {
  return W(t) || (t = Jt(t)), (typeof n != "number" || r) && (n = 0), Ts(t, e, n) >= 0;
}
const jc = M(function(t, e, n) {
  var r, i;
  return L(e) ? i = e : (e = ge(e), r = e.slice(0, -1), e = e[e.length - 1]), Nt(t, function(s) {
    var a = i;
    if (!a) {
      if (r && r.length && (s = tr(s, r)), s == null)
        return;
      a = s[e];
    }
    return a == null ? a : a.apply(s, n);
  });
});
function sr(t, e) {
  return Nt(t, nr(e));
}
function Zc(t, e) {
  return Wt(t, ce(e));
}
function Ns(t, e, n) {
  var r = -1 / 0, i = -1 / 0, s, a;
  if (e == null || typeof e == "number" && typeof t[0] != "object" && t != null) {
    t = W(t) ? t : Jt(t);
    for (var o = 0, l = t.length; o < l; o++)
      s = t[o], s != null && s > r && (r = s);
  } else
    e = q(e, n), ut(t, function(u, g, h) {
      a = e(u, g, h), (a > i || a === -1 / 0 && r === -1 / 0) && (r = u, i = a);
    });
  return r;
}
function tu(t, e, n) {
  var r = 1 / 0, i = 1 / 0, s, a;
  if (e == null || typeof e == "number" && typeof t[0] != "object" && t != null) {
    t = W(t) ? t : Jt(t);
    for (var o = 0, l = t.length; o < l; o++)
      s = t[o], s != null && s < r && (r = s);
  } else
    e = q(e, n), ut(t, function(u, g, h) {
      a = e(u, g, h), (a < i || a === 1 / 0 && r === 1 / 0) && (r = u, i = a);
    });
  return r;
}
var eu = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
function As(t) {
  return t ? yt(t) ? fe.call(t) : Wn(t) ? t.match(eu) : W(t) ? Nt(t, er) : Jt(t) : [];
}
function Os(t, e, n) {
  if (e == null || n)
    return W(t) || (t = Jt(t)), t[Vn(t.length - 1)];
  var r = As(t), i = K(r);
  e = Math.max(Math.min(e, i), 0);
  for (var s = i - 1, a = 0; a < e; a++) {
    var o = Vn(a, s), l = r[a];
    r[a] = r[o], r[o] = l;
  }
  return r.slice(0, e);
}
function nu(t) {
  return Os(t, 1 / 0);
}
function ru(t, e, n) {
  var r = 0;
  return e = q(e, n), sr(Nt(t, function(i, s, a) {
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
function je(t, e) {
  return function(n, r, i) {
    var s = e ? [[], []] : {};
    return r = q(r, i), ut(n, function(a, o) {
      var l = r(a, o, n);
      t(s, a, l);
    }), s;
  };
}
const iu = je(function(t, e, n) {
  bt(t, n) ? t[n].push(e) : t[n] = [e];
}), su = je(function(t, e, n) {
  t[n] = e;
}), au = je(function(t, e, n) {
  bt(t, n) ? t[n]++ : t[n] = 1;
}), ou = je(function(t, e, n) {
  t[n ? 0 : 1].push(e);
}, !0);
function cu(t) {
  return t == null ? 0 : W(t) ? t.length : P(t).length;
}
function uu(t, e, n) {
  return e in n;
}
const ys = M(function(t, e) {
  var n = {}, r = e[0];
  if (t == null)
    return n;
  L(r) ? (e.length > 1 && (r = de(r, e[1])), e = he(t)) : (r = uu, e = Vt(e, !1, !1), t = Object(t));
  for (var i = 0, s = e.length; i < s; i++) {
    var a = e[i], o = t[a];
    r(o, a, t) && (n[a] = o);
  }
  return n;
}), lu = M(function(t, e) {
  var n = e[0], r;
  return L(n) ? (n = ir(n), e.length > 1 && (r = e[1])) : (e = Nt(Vt(e, !1, !1), String), n = function(i, s) {
    return !ct(e, s);
  }), ys(t, n, r);
});
function Vs(t, e, n) {
  return fe.call(t, 0, Math.max(0, t.length - (e == null || n ? 1 : e)));
}
function Cn(t, e, n) {
  return t == null || t.length < 1 ? e == null || n ? void 0 : [] : e == null || n ? t[0] : Vs(t, t.length - e);
}
function Le(t, e, n) {
  return fe.call(t, e == null || n ? 1 : e);
}
function fu(t, e, n) {
  return t == null || t.length < 1 ? e == null || n ? void 0 : [] : e == null || n ? t[t.length - 1] : Le(t, Math.max(0, t.length - e));
}
function hu(t) {
  return Wt(t, Boolean);
}
function gu(t, e) {
  return Vt(t, e, !1);
}
const Rs = M(function(t, e) {
  return e = Vt(e, !0, !0), Wt(t, function(n) {
    return !ct(e, n);
  });
}), du = M(function(t, e) {
  return Rs(t, e);
});
function Rn(t, e, n, r) {
  Mi(e) || (r = n, n = e, e = !1), n != null && (n = q(n, r));
  for (var i = [], s = [], a = 0, o = K(t); a < o; a++) {
    var l = t[a], u = n ? n(l, a, t) : l;
    e && !n ? ((!a || s !== u) && i.push(l), s = u) : n ? ct(s, u) || (s.push(u), i.push(l)) : ct(i, l) || i.push(l);
  }
  return i;
}
const pu = M(function(t) {
  return Rn(Vt(t, !0, !0));
});
function mu(t) {
  for (var e = [], n = arguments.length, r = 0, i = K(t); r < i; r++) {
    var s = t[r];
    if (!ct(e, s)) {
      var a;
      for (a = 1; a < n && ct(arguments[a], s); a++)
        ;
      a === n && e.push(s);
    }
  }
  return e;
}
function Fn(t) {
  for (var e = t && Ns(t, K).length || 0, n = Array(e), r = 0; r < e; r++)
    n[r] = sr(t, r);
  return n;
}
const vu = M(Fn);
function bu(t, e) {
  for (var n = {}, r = 0, i = K(t); r < i; r++)
    e ? n[t[r]] = e[r] : n[t[r][0]] = t[r][1];
  return n;
}
function wu(t, e, n) {
  e == null && (e = t || 0, t = 0), n || (n = e < t ? -1 : 1);
  for (var r = Math.max(Math.ceil((e - t) / n), 0), i = Array(r), s = 0; s < r; s++, t += n)
    i[s] = t;
  return i;
}
function Su(t, e) {
  if (e == null || e < 1)
    return [];
  for (var n = [], r = 0, i = t.length; r < i; )
    n.push(fe.call(t, r, r += e));
  return n;
}
function ar(t, e) {
  return t._chain ? S(e).chain() : e;
}
function Fs(t) {
  return ut(yn(t), function(e) {
    var n = S[e] = t[e];
    S.prototype[e] = function() {
      var r = [this._wrapped];
      return Mo.apply(r, arguments), ar(this, n.apply(S, r));
    };
  }), S;
}
ut(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(t) {
  var e = Ye[t];
  S.prototype[t] = function() {
    var n = this._wrapped;
    return n != null && (e.apply(n, arguments), (t === "shift" || t === "splice") && n.length === 0 && delete n[0]), ar(this, n);
  };
});
ut(["concat", "join", "slice"], function(t) {
  var e = Ye[t];
  S.prototype[t] = function() {
    var n = this._wrapped;
    return n != null && (n = e.apply(n, arguments)), ar(this, n);
  };
});
const ku = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VERSION: $i,
  restArguments: M,
  isObject: Ot,
  isNull: Yo,
  isUndefined: zi,
  isBoolean: Mi,
  isElement: jo,
  isString: Wn,
  isNumber: Ki,
  isDate: Zo,
  isRegExp: tc,
  isError: ec,
  isSymbol: qi,
  isArrayBuffer: Wi,
  isDataView: $e,
  isArray: yt,
  isFunction: L,
  isArguments: Xn,
  isFinite: sc,
  isNaN: Yi,
  isTypedArray: es,
  isEmpty: lc,
  isMatch: rs,
  isEqual: fc,
  isMap: dc,
  isWeakMap: pc,
  isSet: mc,
  isWeakSet: vc,
  keys: P,
  allKeys: he,
  values: Jt,
  pairs: bc,
  invert: cs,
  functions: yn,
  methods: yn,
  extend: us,
  extendOwn: De,
  assign: De,
  defaults: ls,
  create: Sc,
  clone: kc,
  tap: Cc,
  get: gs,
  has: Ic,
  mapObject: _c,
  identity: er,
  constant: ji,
  noop: ps,
  toPath: hs,
  property: nr,
  propertyOf: xc,
  matcher: ce,
  matches: ce,
  times: Ec,
  random: Vn,
  now: ue,
  escape: Tc,
  unescape: Nc,
  templateSettings: Ac,
  template: Fc,
  result: Bc,
  uniqueId: Lc,
  chain: Hc,
  iteratee: rr,
  partial: Xt,
  bind: ws,
  bindAll: $c,
  memoize: Gc,
  delay: Ss,
  defer: Dc,
  throttle: zc,
  debounce: Mc,
  wrap: Kc,
  negate: ir,
  compose: qc,
  after: Wc,
  before: ks,
  once: Jc,
  findKey: Cs,
  findIndex: qt,
  findLastIndex: _s,
  sortedIndex: xs,
  indexOf: Ts,
  lastIndexOf: Xc,
  find: ze,
  detect: ze,
  findWhere: Qc,
  each: ut,
  forEach: ut,
  map: Nt,
  collect: Nt,
  reduce: kn,
  foldl: kn,
  inject: kn,
  reduceRight: mi,
  foldr: mi,
  filter: Wt,
  select: Wt,
  reject: Yc,
  every: vi,
  all: vi,
  some: bi,
  any: bi,
  contains: ct,
  includes: ct,
  include: ct,
  invoke: jc,
  pluck: sr,
  where: Zc,
  max: Ns,
  min: tu,
  shuffle: nu,
  sample: Os,
  sortBy: ru,
  groupBy: iu,
  indexBy: su,
  countBy: au,
  partition: ou,
  toArray: As,
  size: cu,
  pick: ys,
  omit: lu,
  first: Cn,
  head: Cn,
  take: Cn,
  initial: Vs,
  last: fu,
  rest: Le,
  tail: Le,
  drop: Le,
  compact: hu,
  flatten: gu,
  without: du,
  uniq: Rn,
  unique: Rn,
  union: pu,
  intersection: mu,
  difference: Rs,
  unzip: Fn,
  transpose: Fn,
  zip: vu,
  object: bu,
  range: wu,
  chunk: Su,
  mixin: Fs,
  default: S
}, Symbol.toStringTag, { value: "Module" }));
var O = Fs(ku);
O._ = O;
let Ze = (t = 21) => crypto.getRandomValues(new Uint8Array(t)).reduce((e, n) => (n &= 63, n < 36 ? e += n.toString(36) : n < 62 ? e += (n - 26).toString(36).toUpperCase() : n > 62 ? e += "-" : e += "_", e), "");
class Bs {
  instanceIdInternal = Bs.generatePluginIdInternal();
  enabledInternal = !0;
  paramsResultInternal = {};
  generatedTrackIdsInternal = [];
  isRollbackable = !1;
  songCacheInternal;
  progress = null;
  isExecuting = !1;
  static providerId() {
    throw new Error("providerId() should be overwritten.");
  }
  static pluginId() {
    throw new Error("pluginId() should be overwritten.");
  }
  static providerDisplayName() {
    throw new Error("providerDisplayName() should be overwritten.");
  }
  static pluginDisplayName() {
    throw new Error("pluginDisplayName() should be overwritten.");
  }
  static pluginDescription() {
    return null;
  }
  static pluginInfo() {
    return null;
  }
  static allowReset() {
    return !0;
  }
  async init(e, n) {
  }
  params() {
    return {};
  }
  songAccess() {
    return {};
  }
  allowManualApplyAdjust() {
    return !1;
  }
  async run(e, n, r) {
  }
  static async create(e, n) {
    const r = new this();
    return r.resetInternal(), await r.init(e, n), r;
  }
  get instanceId() {
    return this.instanceIdInternal;
  }
  getParam(e, n) {
    return e[n];
  }
  hasAllParamsSet() {
    for (const e of P(this.params()))
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
      case F.Input:
      case F.Pitch:
      case F.Slider:
      case F.TrackSelector:
      case F.Select:
      case F.SelectList:
      case F.Switch:
      case F.InputNumber:
      case F.FileSelector:
        return !0;
      case F.MultiTrackSelector:
        return n.length > 0;
      case F.TrackPitchSelector:
        return n.track !== void 0 && n.track !== null && n.pitch !== void 0 && n.pitch !== null;
      case F.InstrumentSelector:
        return n.program !== void 0 && n.program !== null && n.isDrum !== void 0 && n.isDrum !== null;
      case F.MultiSourceAudioSelector:
        return n != null && n.audioInfo !== void 0 && n.audioInfo !== null;
      case F.None:
        return n != null;
      default:
        throw new Error(
          `Param nullness check needs to be implemented for widget type ${i}. Either use default nullness check or define custom logic.`
        );
    }
  }
  static id() {
    return `${this.providerId()}^_^${this.pluginId()}`;
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
  setParamsInternal(e) {
    this.paramsResultInternal = e, this.maybeSyncEnabledWithParamsReadiness();
  }
  getParamsInternal() {
    return this.paramsResultInternal;
  }
  resetParamsInternal() {
    for (const e of P(this.params())) {
      const n = this.params()[e];
      this.paramsResultInternal[e] = n.defaultValue;
    }
    this.maybeSyncEnabledWithParamsReadiness();
  }
  resetInternal() {
    this.resetParamsInternal(), this.allowManualApplyAdjust() && (this.enabledInternal = !1);
  }
  setEnabledInternal(e) {
    this.enabledInternal = e;
  }
  maybeSyncEnabledWithParamsReadiness() {
    this.allowManualApplyAdjust() && !this.hasAllParamsSet() && this.setEnabledInternal(!1);
  }
  static generatePluginIdInternal() {
    return Ze(10);
  }
}
class Th {
  plugins = [];
  threwErrorInLastRun = !1;
  maxNumPluginsToKeep = 50;
  originalSong;
  cloneSongFnInternal;
  readApisInternal;
  activePluginIndex = -1;
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
  async run(e = 0) {
    if (!this.originalSong)
      return this.threwErrorInLastRun = !0, null;
    e = Math.max(0, e), this.setActivePluginIndex(e), this.threwErrorInLastRun = !1;
    const n = this.getIndexOfLatestPluginWithCacheBeforeIndex(e), r = await this.cloneCachedSongAtPluginIndex(n);
    for (let i = e; i < this.plugins.length; i += 1)
      delete this.plugins[i].songCacheInternal;
    for (let i = 0; i < this.plugins.length; i += 1)
      this.plugins[i].isRollbackable = i <= n;
    for (let i = n >= 0 ? n + 1 : 0; i < this.plugins.length; i += 1) {
      const s = this.plugins[i];
      if (!s.enabledInternal || !s.hasAllParamsSet())
        return r;
      r.setPluginContextInternal(s);
      try {
        s.isExecuting = !0, s.setProgress(null), await s.run(r, s.getParamsInternal(), this.readApisInternal), r.clearPluginContextInternal(), s.isExecuting = !1;
      } catch {
        this.threwErrorInLastRun = !0, r.clearPluginContextInternal(), s.isExecuting = !1;
        const o = this.getIndexOfLatestPluginWithCacheBeforeIndex(i);
        return o >= 0 ? await this.cloneSong(this.plugins[o].songCacheInternal) : await this.cloneSong(this.originalSong);
      }
      s.songCacheInternal = await this.cloneSong(r), s.isRollbackable = !0;
    }
    return r;
  }
  restoreCachedPlugin(e) {
    return this.setActivePluginIndex(e), this.cloneCachedSongAtPluginIndex(e);
  }
  async cloneSong(e) {
    if (!this.cloneSongFnInternal)
      throw new Error("Pipeline is not provided with a clone song function.");
    return this.cloneSongFnInternal(e);
  }
  getActivePluginIndex() {
    return this.activePluginIndex;
  }
  setActivePluginIndex(e) {
    this.activePluginIndex = e;
  }
  async cloneCachedSongAtPluginIndex(e) {
    if (e >= 0)
      return await this.cloneSong(this.plugins[e].songCacheInternal);
    if (!this.originalSong)
      throw new Error("Original song is not avaiable to clone.");
    return await this.cloneSong(this.originalSong);
  }
  reset() {
    this.plugins.splice(0, this.plugins.length), this.originalSong = void 0, this.activePluginIndex = -1, this.threwErrorInLastRun = !1;
  }
  isPluginFunctioning(e) {
    return !!e.songCacheInternal;
  }
  getPluginIndexByPluginInstanceId(e) {
    return qt(this.plugins, (n) => n.instanceId === e);
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
}
var Y = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Cu(t, e, n, r, i) {
  for (var s = i + 1; r <= i; ) {
    var a = r + i >>> 1, o = t[a], l = n !== void 0 ? n(o, e) : o - e;
    l >= 0 ? (s = a, i = a - 1) : r = a + 1;
  }
  return s;
}
function Iu(t, e, n, r, i) {
  for (var s = i + 1; r <= i; ) {
    var a = r + i >>> 1, o = t[a], l = n !== void 0 ? n(o, e) : o - e;
    l > 0 ? (s = a, i = a - 1) : r = a + 1;
  }
  return s;
}
function _u(t, e, n, r, i) {
  for (var s = r - 1; r <= i; ) {
    var a = r + i >>> 1, o = t[a], l = n !== void 0 ? n(o, e) : o - e;
    l < 0 ? (s = a, r = a + 1) : i = a - 1;
  }
  return s;
}
function xu(t, e, n, r, i) {
  for (var s = r - 1; r <= i; ) {
    var a = r + i >>> 1, o = t[a], l = n !== void 0 ? n(o, e) : o - e;
    l <= 0 ? (s = a, r = a + 1) : i = a - 1;
  }
  return s;
}
function Eu(t, e, n, r, i) {
  for (; r <= i; ) {
    var s = r + i >>> 1, a = t[s], o = n !== void 0 ? n(a, e) : a - e;
    if (o === 0)
      return s;
    o <= 0 ? r = s + 1 : i = s - 1;
  }
  return -1;
}
function Zt(t, e, n, r, i, s) {
  return typeof n == "function" ? s(t, e, n, r === void 0 ? 0 : r | 0, i === void 0 ? t.length - 1 : i | 0) : s(t, e, void 0, n === void 0 ? 0 : n | 0, r === void 0 ? t.length - 1 : r | 0);
}
var _ = {
  ge: function(t, e, n, r, i) {
    return Zt(t, e, n, r, i, Cu);
  },
  gt: function(t, e, n, r, i) {
    return Zt(t, e, n, r, i, Iu);
  },
  lt: function(t, e, n, r, i) {
    return Zt(t, e, n, r, i, _u);
  },
  le: function(t, e, n, r, i) {
    return Zt(t, e, n, r, i, xu);
  },
  eq: function(t, e, n, r, i) {
    return Zt(t, e, n, r, i, Eu);
  }
}, Bn = { exports: {} };
(function(t, e) {
  var n = 200, r = "__lodash_hash_undefined__", i = 9007199254740991, s = "[object Arguments]", a = "[object Array]", o = "[object Boolean]", l = "[object Date]", u = "[object Error]", g = "[object Function]", h = "[object GeneratorFunction]", p = "[object Map]", v = "[object Number]", b = "[object Object]", w = "[object Promise]", Z = "[object RegExp]", x = "[object Set]", cn = "[object String]", I = "[object Symbol]", Qt = "[object WeakMap]", be = "[object ArrayBuffer]", we = "[object DataView]", Pr = "[object Float32Array]", Nr = "[object Float64Array]", Ar = "[object Int8Array]", Or = "[object Int16Array]", yr = "[object Int32Array]", Vr = "[object Uint8Array]", Rr = "[object Uint8ClampedArray]", Fr = "[object Uint16Array]", Br = "[object Uint32Array]", wa = /[\\^$.*+?()[\]{}|]/g, Sa = /\w*$/, ka = /^\[object .+?Constructor\]$/, Ca = /^(?:0|[1-9]\d*)$/, C = {};
  C[s] = C[a] = C[be] = C[we] = C[o] = C[l] = C[Pr] = C[Nr] = C[Ar] = C[Or] = C[yr] = C[p] = C[v] = C[b] = C[Z] = C[x] = C[cn] = C[I] = C[Vr] = C[Rr] = C[Fr] = C[Br] = !0, C[u] = C[g] = C[Qt] = !1;
  var Ia = typeof Y == "object" && Y && Y.Object === Object && Y, _a = typeof self == "object" && self && self.Object === Object && self, at = Ia || _a || Function("return this")(), Ur = e && !e.nodeType && e, Lr = Ur && !0 && t && !t.nodeType && t, xa = Lr && Lr.exports === Ur;
  function Ea(c, f) {
    return c.set(f[0], f[1]), c;
  }
  function Ta(c, f) {
    return c.add(f), c;
  }
  function Pa(c, f) {
    for (var d = -1, m = c ? c.length : 0; ++d < m && f(c[d], d, c) !== !1; )
      ;
    return c;
  }
  function Na(c, f) {
    for (var d = -1, m = f.length, A = c.length; ++d < m; )
      c[A + d] = f[d];
    return c;
  }
  function Hr(c, f, d, m) {
    var A = -1, V = c ? c.length : 0;
    for (m && V && (d = c[++A]); ++A < V; )
      d = f(d, c[A], A, c);
    return d;
  }
  function Aa(c, f) {
    for (var d = -1, m = Array(c); ++d < c; )
      m[d] = f(d);
    return m;
  }
  function Oa(c, f) {
    return c == null ? void 0 : c[f];
  }
  function $r(c) {
    var f = !1;
    if (c != null && typeof c.toString != "function")
      try {
        f = !!(c + "");
      } catch {
      }
    return f;
  }
  function Gr(c) {
    var f = -1, d = Array(c.size);
    return c.forEach(function(m, A) {
      d[++f] = [A, m];
    }), d;
  }
  function un(c, f) {
    return function(d) {
      return c(f(d));
    };
  }
  function Dr(c) {
    var f = -1, d = Array(c.size);
    return c.forEach(function(m) {
      d[++f] = m;
    }), d;
  }
  var ya = Array.prototype, Va = Function.prototype, Se = Object.prototype, ln = at["__core-js_shared__"], zr = function() {
    var c = /[^.]+$/.exec(ln && ln.keys && ln.keys.IE_PROTO || "");
    return c ? "Symbol(src)_1." + c : "";
  }(), Mr = Va.toString, lt = Se.hasOwnProperty, ke = Se.toString, Ra = RegExp(
    "^" + Mr.call(lt).replace(wa, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Kr = xa ? at.Buffer : void 0, qr = at.Symbol, Wr = at.Uint8Array, Fa = un(Object.getPrototypeOf, Object), Ba = Object.create, Ua = Se.propertyIsEnumerable, La = ya.splice, Jr = Object.getOwnPropertySymbols, Ha = Kr ? Kr.isBuffer : void 0, $a = un(Object.keys, Object), fn = Bt(at, "DataView"), Yt = Bt(at, "Map"), hn = Bt(at, "Promise"), gn = Bt(at, "Set"), dn = Bt(at, "WeakMap"), jt = Bt(Object, "create"), Ga = kt(fn), Da = kt(Yt), za = kt(hn), Ma = kt(gn), Ka = kt(dn), Xr = qr ? qr.prototype : void 0, Qr = Xr ? Xr.valueOf : void 0;
  function wt(c) {
    var f = -1, d = c ? c.length : 0;
    for (this.clear(); ++f < d; ) {
      var m = c[f];
      this.set(m[0], m[1]);
    }
  }
  function qa() {
    this.__data__ = jt ? jt(null) : {};
  }
  function Wa(c) {
    return this.has(c) && delete this.__data__[c];
  }
  function Ja(c) {
    var f = this.__data__;
    if (jt) {
      var d = f[c];
      return d === r ? void 0 : d;
    }
    return lt.call(f, c) ? f[c] : void 0;
  }
  function Xa(c) {
    var f = this.__data__;
    return jt ? f[c] !== void 0 : lt.call(f, c);
  }
  function Qa(c, f) {
    var d = this.__data__;
    return d[c] = jt && f === void 0 ? r : f, this;
  }
  wt.prototype.clear = qa, wt.prototype.delete = Wa, wt.prototype.get = Ja, wt.prototype.has = Xa, wt.prototype.set = Qa;
  function ot(c) {
    var f = -1, d = c ? c.length : 0;
    for (this.clear(); ++f < d; ) {
      var m = c[f];
      this.set(m[0], m[1]);
    }
  }
  function Ya() {
    this.__data__ = [];
  }
  function ja(c) {
    var f = this.__data__, d = Ce(f, c);
    if (d < 0)
      return !1;
    var m = f.length - 1;
    return d == m ? f.pop() : La.call(f, d, 1), !0;
  }
  function Za(c) {
    var f = this.__data__, d = Ce(f, c);
    return d < 0 ? void 0 : f[d][1];
  }
  function to(c) {
    return Ce(this.__data__, c) > -1;
  }
  function eo(c, f) {
    var d = this.__data__, m = Ce(d, c);
    return m < 0 ? d.push([c, f]) : d[m][1] = f, this;
  }
  ot.prototype.clear = Ya, ot.prototype.delete = ja, ot.prototype.get = Za, ot.prototype.has = to, ot.prototype.set = eo;
  function Rt(c) {
    var f = -1, d = c ? c.length : 0;
    for (this.clear(); ++f < d; ) {
      var m = c[f];
      this.set(m[0], m[1]);
    }
  }
  function no() {
    this.__data__ = {
      hash: new wt(),
      map: new (Yt || ot)(),
      string: new wt()
    };
  }
  function ro(c) {
    return Ie(this, c).delete(c);
  }
  function io(c) {
    return Ie(this, c).get(c);
  }
  function so(c) {
    return Ie(this, c).has(c);
  }
  function ao(c, f) {
    return Ie(this, c).set(c, f), this;
  }
  Rt.prototype.clear = no, Rt.prototype.delete = ro, Rt.prototype.get = io, Rt.prototype.has = so, Rt.prototype.set = ao;
  function Ft(c) {
    this.__data__ = new ot(c);
  }
  function oo() {
    this.__data__ = new ot();
  }
  function co(c) {
    return this.__data__.delete(c);
  }
  function uo(c) {
    return this.__data__.get(c);
  }
  function lo(c) {
    return this.__data__.has(c);
  }
  function fo(c, f) {
    var d = this.__data__;
    if (d instanceof ot) {
      var m = d.__data__;
      if (!Yt || m.length < n - 1)
        return m.push([c, f]), this;
      d = this.__data__ = new Rt(m);
    }
    return d.set(c, f), this;
  }
  Ft.prototype.clear = oo, Ft.prototype.delete = co, Ft.prototype.get = uo, Ft.prototype.has = lo, Ft.prototype.set = fo;
  function ho(c, f) {
    var d = vn(c) || Uo(c) ? Aa(c.length, String) : [], m = d.length, A = !!m;
    for (var V in c)
      (f || lt.call(c, V)) && !(A && (V == "length" || Vo(V, m))) && d.push(V);
    return d;
  }
  function Yr(c, f, d) {
    var m = c[f];
    (!(lt.call(c, f) && ei(m, d)) || d === void 0 && !(f in c)) && (c[f] = d);
  }
  function Ce(c, f) {
    for (var d = c.length; d--; )
      if (ei(c[d][0], f))
        return d;
    return -1;
  }
  function go(c, f) {
    return c && jr(f, bn(f), c);
  }
  function pn(c, f, d, m, A, V, J) {
    var G;
    if (m && (G = V ? m(c, A, V, J) : m(c)), G !== void 0)
      return G;
    if (!_e(c))
      return c;
    var ii = vn(c);
    if (ii) {
      if (G = Ao(c), !f)
        return To(c, G);
    } else {
      var Ut = St(c), si = Ut == g || Ut == h;
      if (Ho(c))
        return So(c, f);
      if (Ut == b || Ut == s || si && !V) {
        if ($r(c))
          return V ? c : {};
        if (G = Oo(si ? {} : c), !f)
          return Po(c, go(G, c));
      } else {
        if (!C[Ut])
          return V ? c : {};
        G = yo(c, Ut, pn, f);
      }
    }
    J || (J = new Ft());
    var ai = J.get(c);
    if (ai)
      return ai;
    if (J.set(c, G), !ii)
      var oi = d ? No(c) : bn(c);
    return Pa(oi || c, function(wn, xe) {
      oi && (xe = wn, wn = c[xe]), Yr(G, xe, pn(wn, f, d, m, xe, c, J));
    }), G;
  }
  function po(c) {
    return _e(c) ? Ba(c) : {};
  }
  function mo(c, f, d) {
    var m = f(c);
    return vn(c) ? m : Na(m, d(c));
  }
  function vo(c) {
    return ke.call(c);
  }
  function bo(c) {
    if (!_e(c) || Fo(c))
      return !1;
    var f = ri(c) || $r(c) ? Ra : ka;
    return f.test(kt(c));
  }
  function wo(c) {
    if (!ti(c))
      return $a(c);
    var f = [];
    for (var d in Object(c))
      lt.call(c, d) && d != "constructor" && f.push(d);
    return f;
  }
  function So(c, f) {
    if (f)
      return c.slice();
    var d = new c.constructor(c.length);
    return c.copy(d), d;
  }
  function mn(c) {
    var f = new c.constructor(c.byteLength);
    return new Wr(f).set(new Wr(c)), f;
  }
  function ko(c, f) {
    var d = f ? mn(c.buffer) : c.buffer;
    return new c.constructor(d, c.byteOffset, c.byteLength);
  }
  function Co(c, f, d) {
    var m = f ? d(Gr(c), !0) : Gr(c);
    return Hr(m, Ea, new c.constructor());
  }
  function Io(c) {
    var f = new c.constructor(c.source, Sa.exec(c));
    return f.lastIndex = c.lastIndex, f;
  }
  function _o(c, f, d) {
    var m = f ? d(Dr(c), !0) : Dr(c);
    return Hr(m, Ta, new c.constructor());
  }
  function xo(c) {
    return Qr ? Object(Qr.call(c)) : {};
  }
  function Eo(c, f) {
    var d = f ? mn(c.buffer) : c.buffer;
    return new c.constructor(d, c.byteOffset, c.length);
  }
  function To(c, f) {
    var d = -1, m = c.length;
    for (f || (f = Array(m)); ++d < m; )
      f[d] = c[d];
    return f;
  }
  function jr(c, f, d, m) {
    d || (d = {});
    for (var A = -1, V = f.length; ++A < V; ) {
      var J = f[A], G = m ? m(d[J], c[J], J, d, c) : void 0;
      Yr(d, J, G === void 0 ? c[J] : G);
    }
    return d;
  }
  function Po(c, f) {
    return jr(c, Zr(c), f);
  }
  function No(c) {
    return mo(c, bn, Zr);
  }
  function Ie(c, f) {
    var d = c.__data__;
    return Ro(f) ? d[typeof f == "string" ? "string" : "hash"] : d.map;
  }
  function Bt(c, f) {
    var d = Oa(c, f);
    return bo(d) ? d : void 0;
  }
  var Zr = Jr ? un(Jr, Object) : Do, St = vo;
  (fn && St(new fn(new ArrayBuffer(1))) != we || Yt && St(new Yt()) != p || hn && St(hn.resolve()) != w || gn && St(new gn()) != x || dn && St(new dn()) != Qt) && (St = function(c) {
    var f = ke.call(c), d = f == b ? c.constructor : void 0, m = d ? kt(d) : void 0;
    if (m)
      switch (m) {
        case Ga:
          return we;
        case Da:
          return p;
        case za:
          return w;
        case Ma:
          return x;
        case Ka:
          return Qt;
      }
    return f;
  });
  function Ao(c) {
    var f = c.length, d = c.constructor(f);
    return f && typeof c[0] == "string" && lt.call(c, "index") && (d.index = c.index, d.input = c.input), d;
  }
  function Oo(c) {
    return typeof c.constructor == "function" && !ti(c) ? po(Fa(c)) : {};
  }
  function yo(c, f, d, m) {
    var A = c.constructor;
    switch (f) {
      case be:
        return mn(c);
      case o:
      case l:
        return new A(+c);
      case we:
        return ko(c, m);
      case Pr:
      case Nr:
      case Ar:
      case Or:
      case yr:
      case Vr:
      case Rr:
      case Fr:
      case Br:
        return Eo(c, m);
      case p:
        return Co(c, m, d);
      case v:
      case cn:
        return new A(c);
      case Z:
        return Io(c);
      case x:
        return _o(c, m, d);
      case I:
        return xo(c);
    }
  }
  function Vo(c, f) {
    return f = f ?? i, !!f && (typeof c == "number" || Ca.test(c)) && c > -1 && c % 1 == 0 && c < f;
  }
  function Ro(c) {
    var f = typeof c;
    return f == "string" || f == "number" || f == "symbol" || f == "boolean" ? c !== "__proto__" : c === null;
  }
  function Fo(c) {
    return !!zr && zr in c;
  }
  function ti(c) {
    var f = c && c.constructor, d = typeof f == "function" && f.prototype || Se;
    return c === d;
  }
  function kt(c) {
    if (c != null) {
      try {
        return Mr.call(c);
      } catch {
      }
      try {
        return c + "";
      } catch {
      }
    }
    return "";
  }
  function Bo(c) {
    return pn(c, !0, !0);
  }
  function ei(c, f) {
    return c === f || c !== c && f !== f;
  }
  function Uo(c) {
    return Lo(c) && lt.call(c, "callee") && (!Ua.call(c, "callee") || ke.call(c) == s);
  }
  var vn = Array.isArray;
  function ni(c) {
    return c != null && $o(c.length) && !ri(c);
  }
  function Lo(c) {
    return Go(c) && ni(c);
  }
  var Ho = Ha || zo;
  function ri(c) {
    var f = _e(c) ? ke.call(c) : "";
    return f == g || f == h;
  }
  function $o(c) {
    return typeof c == "number" && c > -1 && c % 1 == 0 && c <= i;
  }
  function _e(c) {
    var f = typeof c;
    return !!c && (f == "object" || f == "function");
  }
  function Go(c) {
    return !!c && typeof c == "object";
  }
  function bn(c) {
    return ni(c) ? ho(c) : wo(c);
  }
  function Do() {
    return [];
  }
  function zo() {
    return !1;
  }
  t.exports = Bo;
})(Bn, Bn.exports);
const wi = Bn.exports;
class Ee {
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
class Si {
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
function Tu(t, e) {
  const n = /* @__PURE__ */ Object.create(null), r = t.split(",");
  for (let i = 0; i < r.length; i++)
    n[r[i]] = !0;
  return e ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
function or(t) {
  if (E(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const r = t[n], i = nt(r) ? Ou(r) : or(r);
      if (i)
        for (const s in i)
          e[s] = i[s];
    }
    return e;
  } else {
    if (nt(t))
      return t;
    if (z(t))
      return t;
  }
}
const Pu = /;(?![^(]*\))/g, Nu = /:([^]+)/, Au = /\/\*.*?\*\//gs;
function Ou(t) {
  const e = {};
  return t.replace(Au, "").split(Pu).forEach((n) => {
    if (n) {
      const r = n.split(Nu);
      r.length > 1 && (e[r[0].trim()] = r[1].trim());
    }
  }), e;
}
function cr(t) {
  let e = "";
  if (nt(t))
    e = t;
  else if (E(t))
    for (let n = 0; n < t.length; n++) {
      const r = cr(t[n]);
      r && (e += r + " ");
    }
  else if (z(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const st = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {};
process.env.NODE_ENV !== "production" && Object.freeze([]);
const ur = () => {
}, yu = () => !1, Vu = /^on[^a-z]/, Ru = (t) => Vu.test(t), et = Object.assign, Fu = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, Bu = Object.prototype.hasOwnProperty, T = (t, e) => Bu.call(t, e), E = Array.isArray, Dt = (t) => tn(t) === "[object Map]", Uu = (t) => tn(t) === "[object Set]", H = (t) => typeof t == "function", nt = (t) => typeof t == "string", lr = (t) => typeof t == "symbol", z = (t) => t !== null && typeof t == "object", Lu = (t) => z(t) && H(t.then) && H(t.catch), Hu = Object.prototype.toString, tn = (t) => Hu.call(t), Us = (t) => tn(t).slice(8, -1), $u = (t) => tn(t) === "[object Object]", fr = (t) => nt(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Gu = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, Ph = Gu((t) => t.charAt(0).toUpperCase() + t.slice(1)), Me = (t, e) => !Object.is(t, e), Du = (t, e, n) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, zu = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
};
let ki;
const Mu = () => ki || (ki = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ci(t, ...e) {
}
let Ku;
function qu(t, e = Ku) {
  e && e.active && e.effects.push(t);
}
const Un = (t) => {
  const e = new Set(t);
  return e.w = 0, e.n = 0, e;
}, Ls = (t) => (t.w & mt) > 0, Hs = (t) => (t.n & mt) > 0, Wu = ({ deps: t }) => {
  if (t.length)
    for (let e = 0; e < t.length; e++)
      t[e].w |= mt;
}, Ju = (t) => {
  const { deps: e } = t;
  if (e.length) {
    let n = 0;
    for (let r = 0; r < e.length; r++) {
      const i = e[r];
      Ls(i) && !Hs(i) ? i.delete(t) : e[n++] = i, i.w &= ~mt, i.n &= ~mt;
    }
    e.length = n;
  }
}, Ln = /* @__PURE__ */ new WeakMap();
let ee = 0, mt = 1;
const Hn = 30;
let D;
const _t = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), $n = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class Xu {
  constructor(e, n = null, r) {
    this.fn = e, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, qu(this, r);
  }
  run() {
    if (!this.active)
      return this.fn();
    let e = D, n = xt;
    for (; e; ) {
      if (e === this)
        return;
      e = e.parent;
    }
    try {
      return this.parent = D, D = this, xt = !0, mt = 1 << ++ee, ee <= Hn ? Wu(this) : Ii(this), this.fn();
    } finally {
      ee <= Hn && Ju(this), mt = 1 << --ee, D = this.parent, xt = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    D === this ? this.deferStop = !0 : this.active && (Ii(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Ii(t) {
  const { deps: e } = t;
  if (e.length) {
    for (let n = 0; n < e.length; n++)
      e[n].delete(t);
    e.length = 0;
  }
}
let xt = !0;
const $s = [];
function Gs() {
  $s.push(xt), xt = !1;
}
function Ds() {
  const t = $s.pop();
  xt = t === void 0 ? !0 : t;
}
function j(t, e, n) {
  if (xt && D) {
    let r = Ln.get(t);
    r || Ln.set(t, r = /* @__PURE__ */ new Map());
    let i = r.get(n);
    i || r.set(n, i = Un());
    const s = process.env.NODE_ENV !== "production" ? { effect: D, target: t, type: e, key: n } : void 0;
    Qu(i, s);
  }
}
function Qu(t, e) {
  let n = !1;
  ee <= Hn ? Hs(t) || (t.n |= mt, n = !Ls(t)) : n = !t.has(D), n && (t.add(D), D.deps.push(t), process.env.NODE_ENV !== "production" && D.onTrack && D.onTrack(Object.assign({ effect: D }, e)));
}
function vt(t, e, n, r, i, s) {
  const a = Ln.get(t);
  if (!a)
    return;
  let o = [];
  if (e === "clear")
    o = [...a.values()];
  else if (n === "length" && E(t)) {
    const u = zu(r);
    a.forEach((g, h) => {
      (h === "length" || h >= u) && o.push(g);
    });
  } else
    switch (n !== void 0 && o.push(a.get(n)), e) {
      case "add":
        E(t) ? fr(n) && o.push(a.get("length")) : (o.push(a.get(_t)), Dt(t) && o.push(a.get($n)));
        break;
      case "delete":
        E(t) || (o.push(a.get(_t)), Dt(t) && o.push(a.get($n)));
        break;
      case "set":
        Dt(t) && o.push(a.get(_t));
        break;
    }
  const l = process.env.NODE_ENV !== "production" ? { target: t, type: e, key: n, newValue: r, oldValue: i, oldTarget: s } : void 0;
  if (o.length === 1)
    o[0] && (process.env.NODE_ENV !== "production" ? Te(o[0], l) : Te(o[0]));
  else {
    const u = [];
    for (const g of o)
      g && u.push(...g);
    process.env.NODE_ENV !== "production" ? Te(Un(u), l) : Te(Un(u));
  }
}
function Te(t, e) {
  const n = E(t) ? t : [...t];
  for (const r of n)
    r.computed && _i(r, e);
  for (const r of n)
    r.computed || _i(r, e);
}
function _i(t, e) {
  (t !== D || t.allowRecurse) && (process.env.NODE_ENV !== "production" && t.onTrigger && t.onTrigger(et({ effect: t }, e)), t.scheduler ? t.scheduler() : t.run());
}
const Yu = /* @__PURE__ */ Tu("__proto__,__v_isRef,__isVue"), zs = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(lr)
), ju = /* @__PURE__ */ hr(), Zu = /* @__PURE__ */ hr(!0), tl = /* @__PURE__ */ hr(!0, !0), xi = /* @__PURE__ */ el();
function el() {
  const t = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    t[e] = function(...n) {
      const r = k(this);
      for (let s = 0, a = this.length; s < a; s++)
        j(r, "get", s + "");
      const i = r[e](...n);
      return i === -1 || i === !1 ? r[e](...n.map(k)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    t[e] = function(...n) {
      Gs();
      const r = k(this)[e].apply(this, n);
      return Ds(), r;
    };
  }), t;
}
function hr(t = !1, e = !1) {
  return function(r, i, s) {
    if (i === "__v_isReactive")
      return !t;
    if (i === "__v_isReadonly")
      return t;
    if (i === "__v_isShallow")
      return e;
    if (i === "__v_raw" && s === (t ? e ? Js : Ws : e ? vl : qs).get(r))
      return r;
    const a = E(r);
    if (!t && a && T(xi, i))
      return Reflect.get(xi, i, s);
    const o = Reflect.get(r, i, s);
    return (lr(i) ? zs.has(i) : Yu(i)) || (t || j(r, "get", i), e) ? o : U(o) ? a && fr(i) ? o : o.value : z(o) ? t ? Qs(o) : Xs(o) : o;
  };
}
const nl = /* @__PURE__ */ rl();
function rl(t = !1) {
  return function(n, r, i, s) {
    let a = n[r];
    if (At(a) && U(a) && !U(i))
      return !1;
    if (!t && (!Gn(i) && !At(i) && (a = k(a), i = k(i)), !E(n) && U(a) && !U(i)))
      return a.value = i, !0;
    const o = E(n) && fr(r) ? Number(r) < n.length : T(n, r), l = Reflect.set(n, r, i, s);
    return n === k(s) && (o ? Me(i, a) && vt(n, "set", r, i, a) : vt(n, "add", r, i)), l;
  };
}
function il(t, e) {
  const n = T(t, e), r = t[e], i = Reflect.deleteProperty(t, e);
  return i && n && vt(t, "delete", e, void 0, r), i;
}
function sl(t, e) {
  const n = Reflect.has(t, e);
  return (!lr(e) || !zs.has(e)) && j(t, "has", e), n;
}
function al(t) {
  return j(t, "iterate", E(t) ? "length" : _t), Reflect.ownKeys(t);
}
const ol = {
  get: ju,
  set: nl,
  deleteProperty: il,
  has: sl,
  ownKeys: al
}, Ms = {
  get: Zu,
  set(t, e) {
    return process.env.NODE_ENV !== "production" && Ci(`Set operation on key "${String(e)}" failed: target is readonly.`, t), !0;
  },
  deleteProperty(t, e) {
    return process.env.NODE_ENV !== "production" && Ci(`Delete operation on key "${String(e)}" failed: target is readonly.`, t), !0;
  }
}, cl = /* @__PURE__ */ et({}, Ms, {
  get: tl
}), gr = (t) => t, en = (t) => Reflect.getPrototypeOf(t);
function Pe(t, e, n = !1, r = !1) {
  t = t.__v_raw;
  const i = k(t), s = k(e);
  n || (e !== s && j(i, "get", e), j(i, "get", s));
  const { has: a } = en(i), o = r ? gr : n ? vr : mr;
  if (a.call(i, e))
    return o(t.get(e));
  if (a.call(i, s))
    return o(t.get(s));
  t !== i && t.get(e);
}
function Ne(t, e = !1) {
  const n = this.__v_raw, r = k(n), i = k(t);
  return e || (t !== i && j(r, "has", t), j(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
}
function Ae(t, e = !1) {
  return t = t.__v_raw, !e && j(k(t), "iterate", _t), Reflect.get(t, "size", t);
}
function Ei(t) {
  t = k(t);
  const e = k(this);
  return en(e).has.call(e, t) || (e.add(t), vt(e, "add", t, t)), this;
}
function Ti(t, e) {
  e = k(e);
  const n = k(this), { has: r, get: i } = en(n);
  let s = r.call(n, t);
  s ? process.env.NODE_ENV !== "production" && Ks(n, r, t) : (t = k(t), s = r.call(n, t));
  const a = i.call(n, t);
  return n.set(t, e), s ? Me(e, a) && vt(n, "set", t, e, a) : vt(n, "add", t, e), this;
}
function Pi(t) {
  const e = k(this), { has: n, get: r } = en(e);
  let i = n.call(e, t);
  i ? process.env.NODE_ENV !== "production" && Ks(e, n, t) : (t = k(t), i = n.call(e, t));
  const s = r ? r.call(e, t) : void 0, a = e.delete(t);
  return i && vt(e, "delete", t, void 0, s), a;
}
function Ni() {
  const t = k(this), e = t.size !== 0, n = process.env.NODE_ENV !== "production" ? Dt(t) ? new Map(t) : new Set(t) : void 0, r = t.clear();
  return e && vt(t, "clear", void 0, void 0, n), r;
}
function Oe(t, e) {
  return function(r, i) {
    const s = this, a = s.__v_raw, o = k(a), l = e ? gr : t ? vr : mr;
    return !t && j(o, "iterate", _t), a.forEach((u, g) => r.call(i, l(u), l(g), s));
  };
}
function ye(t, e, n) {
  return function(...r) {
    const i = this.__v_raw, s = k(i), a = Dt(s), o = t === "entries" || t === Symbol.iterator && a, l = t === "keys" && a, u = i[t](...r), g = n ? gr : e ? vr : mr;
    return !e && j(s, "iterate", l ? $n : _t), {
      next() {
        const { value: h, done: p } = u.next();
        return p ? { value: h, done: p } : {
          value: o ? [g(h[0]), g(h[1])] : g(h),
          done: p
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function ft(t) {
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
      return Pe(this, s);
    },
    get size() {
      return Ae(this);
    },
    has: Ne,
    add: Ei,
    set: Ti,
    delete: Pi,
    clear: Ni,
    forEach: Oe(!1, !1)
  }, e = {
    get(s) {
      return Pe(this, s, !1, !0);
    },
    get size() {
      return Ae(this);
    },
    has: Ne,
    add: Ei,
    set: Ti,
    delete: Pi,
    clear: Ni,
    forEach: Oe(!1, !0)
  }, n = {
    get(s) {
      return Pe(this, s, !0);
    },
    get size() {
      return Ae(this, !0);
    },
    has(s) {
      return Ne.call(this, s, !0);
    },
    add: ft("add"),
    set: ft("set"),
    delete: ft("delete"),
    clear: ft("clear"),
    forEach: Oe(!0, !1)
  }, r = {
    get(s) {
      return Pe(this, s, !0, !0);
    },
    get size() {
      return Ae(this, !0);
    },
    has(s) {
      return Ne.call(this, s, !0);
    },
    add: ft("add"),
    set: ft("set"),
    delete: ft("delete"),
    clear: ft("clear"),
    forEach: Oe(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
    t[s] = ye(s, !1, !1), n[s] = ye(s, !0, !1), e[s] = ye(s, !1, !0), r[s] = ye(s, !0, !0);
  }), [
    t,
    n,
    e,
    r
  ];
}
const [ll, fl, hl, gl] = /* @__PURE__ */ ul();
function dr(t, e) {
  const n = e ? t ? gl : hl : t ? fl : ll;
  return (r, i, s) => i === "__v_isReactive" ? !t : i === "__v_isReadonly" ? t : i === "__v_raw" ? r : Reflect.get(T(n, i) && i in r ? n : r, i, s);
}
const dl = {
  get: /* @__PURE__ */ dr(!1, !1)
}, pl = {
  get: /* @__PURE__ */ dr(!0, !1)
}, ml = {
  get: /* @__PURE__ */ dr(!0, !0)
};
function Ks(t, e, n) {
  const r = k(n);
  if (r !== n && e.call(t, r)) {
    const i = Us(t);
  }
}
const qs = /* @__PURE__ */ new WeakMap(), vl = /* @__PURE__ */ new WeakMap(), Ws = /* @__PURE__ */ new WeakMap(), Js = /* @__PURE__ */ new WeakMap();
function bl(t) {
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
function wl(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : bl(Us(t));
}
function Xs(t) {
  return At(t) ? t : pr(t, !1, ol, dl, qs);
}
function Qs(t) {
  return pr(t, !0, Ms, pl, Ws);
}
function Ve(t) {
  return pr(t, !0, cl, ml, Js);
}
function pr(t, e, n, r, i) {
  if (!z(t))
    return process.env.NODE_ENV, t;
  if (t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const s = i.get(t);
  if (s)
    return s;
  const a = wl(t);
  if (a === 0)
    return t;
  const o = new Proxy(t, a === 2 ? r : n);
  return i.set(t, o), o;
}
function Et(t) {
  return At(t) ? Et(t.__v_raw) : !!(t && t.__v_isReactive);
}
function At(t) {
  return !!(t && t.__v_isReadonly);
}
function Gn(t) {
  return !!(t && t.__v_isShallow);
}
function Ke(t) {
  return Et(t) || At(t);
}
function k(t) {
  const e = t && t.__v_raw;
  return e ? k(e) : t;
}
function Sl(t) {
  return Du(t, "__v_skip", !0), t;
}
const mr = (t) => z(t) ? Xs(t) : t, vr = (t) => z(t) ? Qs(t) : t;
function U(t) {
  return !!(t && t.__v_isRef === !0);
}
function kl(t) {
  return U(t) ? t.value : t;
}
const Cl = {
  get: (t, e, n) => kl(Reflect.get(t, e, n)),
  set: (t, e, n, r) => {
    const i = t[e];
    return U(i) && !U(n) ? (i.value = n, !0) : Reflect.set(t, e, n, r);
  }
};
function Il(t) {
  return Et(t) ? t : new Proxy(t, Cl);
}
const Tt = [];
function _l(t) {
  Tt.push(t);
}
function xl() {
  Tt.pop();
}
function B(t, ...e) {
  if (process.env.NODE_ENV === "production")
    return;
  Gs();
  const n = Tt.length ? Tt[Tt.length - 1].component : null, r = n && n.appContext.config.warnHandler, i = El();
  if (r)
    Pt(r, n, 11, [
      t + e.join(""),
      n && n.proxy,
      i.map(({ vnode: s }) => `at <${fa(n, s.type)}>`).join(`
`),
      i
    ]);
  else {
    const s = [`[Vue warn]: ${t}`, ...e];
    i.length && s.push(`
`, ...Tl(i));
  }
  Ds();
}
function El() {
  let t = Tt[Tt.length - 1];
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
function Tl(t) {
  const e = [];
  return t.forEach((n, r) => {
    e.push(...r === 0 ? [] : [`
`], ...Pl(n));
  }), e;
}
function Pl({ vnode: t, recurseCount: e }) {
  const n = e > 0 ? `... (${e} recursive calls)` : "", r = t.component ? t.component.parent == null : !1, i = ` at <${fa(t.component, t.type, r)}`, s = ">" + n;
  return t.props ? [i, ...Nl(t.props), s] : [i + s];
}
function Nl(t) {
  const e = [], n = Object.keys(t);
  return n.slice(0, 3).forEach((r) => {
    e.push(...Ys(r, t[r]));
  }), n.length > 3 && e.push(" ..."), e;
}
function Ys(t, e, n) {
  return nt(e) ? (e = JSON.stringify(e), n ? e : [`${t}=${e}`]) : typeof e == "number" || typeof e == "boolean" || e == null ? n ? e : [`${t}=${e}`] : U(e) ? (e = Ys(t, k(e.value), !0), n ? e : [`${t}=Ref<`, e, ">"]) : H(e) ? [`${t}=fn${e.name ? `<${e.name}>` : ""}`] : (e = k(e), n ? e : [`${t}=`, e]);
}
const js = {
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
function Pt(t, e, n, r) {
  let i;
  try {
    i = r ? t(...r) : t();
  } catch (s) {
    Zs(s, e, n);
  }
  return i;
}
function Dn(t, e, n, r) {
  if (H(t)) {
    const s = Pt(t, e, n, r);
    return s && Lu(s) && s.catch((a) => {
      Zs(a, e, n);
    }), s;
  }
  const i = [];
  for (let s = 0; s < t.length; s++)
    i.push(Dn(t[s], e, n, r));
  return i;
}
function Zs(t, e, n, r = !0) {
  const i = e ? e.vnode : null;
  if (e) {
    let s = e.parent;
    const a = e.proxy, o = process.env.NODE_ENV !== "production" ? js[n] : n;
    for (; s; ) {
      const u = s.ec;
      if (u) {
        for (let g = 0; g < u.length; g++)
          if (u[g](t, a, o) === !1)
            return;
      }
      s = s.parent;
    }
    const l = e.appContext.config.errorHandler;
    if (l) {
      Pt(l, null, 10, [t, a, o]);
      return;
    }
  }
  Al(t, n, i, r);
}
function Al(t, e, n, r = !0) {
  if (process.env.NODE_ENV !== "production") {
    const i = js[e];
    if (n && _l(n), B(`Unhandled error${i ? ` during execution of ${i}` : ""}`), n && xl(), r)
      throw t;
  }
}
let qe = !1, zn = !1;
const tt = [];
let gt = 0;
const zt = [];
let it = null, ht = 0;
const ta = /* @__PURE__ */ Promise.resolve();
let br = null;
const Ol = 100;
function yl(t) {
  const e = br || ta;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function Vl(t) {
  let e = gt + 1, n = tt.length;
  for (; e < n; ) {
    const r = e + n >>> 1;
    le(tt[r]) < t ? e = r + 1 : n = r;
  }
  return e;
}
function wr(t) {
  (!tt.length || !tt.includes(t, qe && t.allowRecurse ? gt + 1 : gt)) && (t.id == null ? tt.push(t) : tt.splice(Vl(t.id), 0, t), ea());
}
function ea() {
  !qe && !zn && (zn = !0, br = ta.then(ra));
}
function na(t) {
  E(t) ? zt.push(...t) : (!it || !it.includes(t, t.allowRecurse ? ht + 1 : ht)) && zt.push(t), ea();
}
function Rl(t) {
  if (zt.length) {
    const e = [...new Set(zt)];
    if (zt.length = 0, it) {
      it.push(...e);
      return;
    }
    for (it = e, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), it.sort((n, r) => le(n) - le(r)), ht = 0; ht < it.length; ht++)
      process.env.NODE_ENV !== "production" && ia(t, it[ht]) || it[ht]();
    it = null, ht = 0;
  }
}
const le = (t) => t.id == null ? 1 / 0 : t.id, Fl = (t, e) => {
  const n = le(t) - le(e);
  if (n === 0) {
    if (t.pre && !e.pre)
      return -1;
    if (e.pre && !t.pre)
      return 1;
  }
  return n;
};
function ra(t) {
  zn = !1, qe = !0, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), tt.sort(Fl);
  const e = process.env.NODE_ENV !== "production" ? (n) => ia(t, n) : ur;
  try {
    for (gt = 0; gt < tt.length; gt++) {
      const n = tt[gt];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && e(n))
          continue;
        Pt(n, null, 14);
      }
    }
  } finally {
    gt = 0, tt.length = 0, Rl(t), qe = !1, br = null, (tt.length || zt.length) && ra(t);
  }
}
function ia(t, e) {
  if (!t.has(e))
    t.set(e, 1);
  else {
    const n = t.get(e);
    if (n > Ol) {
      const r = e.ownerInstance, i = r && la(r.type);
      return B(`Maximum recursive updates exceeded${i ? ` in component <${i}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`), !0;
    } else
      t.set(e, n + 1);
  }
}
const te = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (Mu().__VUE_HMR_RUNTIME__ = {
  createRecord: In(Bl),
  rerender: In(Ul),
  reload: In(Ll)
});
const We = /* @__PURE__ */ new Map();
function Bl(t, e) {
  return We.has(t) ? !1 : (We.set(t, {
    initialDef: ie(e),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function ie(t) {
  return ha(t) ? t.__vccOpts : t;
}
function Ul(t, e) {
  const n = We.get(t);
  !n || (n.initialDef.render = e, [...n.instances].forEach((r) => {
    e && (r.render = e, ie(r.type).render = e), r.renderCache = [], r.update();
  }));
}
function Ll(t, e) {
  const n = We.get(t);
  if (!n)
    return;
  e = ie(e), Ai(n.initialDef, e);
  const r = [...n.instances];
  for (const i of r) {
    const s = ie(i.type);
    te.has(s) || (s !== n.initialDef && Ai(s, e), te.add(s)), i.appContext.optionsCache.delete(i.type), i.ceReload ? (te.add(s), i.ceReload(e.styles), te.delete(s)) : i.parent ? wr(i.parent.update) : i.appContext.reload ? i.appContext.reload() : typeof window < "u" && window.location.reload();
  }
  na(() => {
    for (const i of r)
      te.delete(ie(i.type));
  });
}
function Ai(t, e) {
  et(t, e);
  for (const n in t)
    n !== "__file" && !(n in e) && delete t[n];
}
function In(t) {
  return (e, n) => {
    try {
      return t(e, n);
    } catch {
    }
  };
}
let dt = null, Hl = null;
const $l = (t) => t.__isSuspense;
function Gl(t, e) {
  e && e.pendingBranch ? E(t) ? e.effects.push(...t) : e.effects.push(t) : na(t);
}
const Re = {};
function Dl(t, e, { immediate: n, deep: r, flush: i, onTrack: s, onTrigger: a } = st) {
  process.env.NODE_ENV !== "production" && !e && (n !== void 0 && B('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), r !== void 0 && B('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const o = (I) => {
    B("Invalid watch source: ", I, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, l = Mt;
  let u, g = !1, h = !1;
  if (U(t) ? (u = () => t.value, g = Gn(t)) : Et(t) ? (u = () => t, r = !0) : E(t) ? (h = !0, g = t.some((I) => Et(I) || Gn(I)), u = () => t.map((I) => {
    if (U(I))
      return I.value;
    if (Et(I))
      return Ht(I);
    if (H(I))
      return Pt(I, l, 2);
    process.env.NODE_ENV !== "production" && o(I);
  })) : H(t) ? e ? u = () => Pt(t, l, 2) : u = () => {
    if (!(l && l.isUnmounted))
      return p && p(), Dn(t, l, 3, [v]);
  } : (u = ur, process.env.NODE_ENV !== "production" && o(t)), e && r) {
    const I = u;
    u = () => Ht(I());
  }
  let p, v = (I) => {
    p = x.onStop = () => {
      Pt(I, l, 4);
    };
  }, b = h ? new Array(t.length).fill(Re) : Re;
  const w = () => {
    if (!!x.active)
      if (e) {
        const I = x.run();
        (r || g || (h ? I.some((Qt, be) => Me(Qt, b[be])) : Me(I, b))) && (p && p(), Dn(e, l, 3, [
          I,
          b === Re ? void 0 : h && b[0] === Re ? [] : b,
          v
        ]), b = I);
      } else
        x.run();
  };
  w.allowRecurse = !!e;
  let Z;
  i === "sync" ? Z = w : i === "post" ? Z = () => Vi(w, l && l.suspense) : (w.pre = !0, l && (w.id = l.uid), Z = () => wr(w));
  const x = new Xu(u, Z);
  return process.env.NODE_ENV !== "production" && (x.onTrack = s, x.onTrigger = a), e ? n ? w() : b = x.run() : i === "post" ? Vi(x.run.bind(x), l && l.suspense) : x.run(), () => {
    x.stop(), l && l.scope && Fu(l.scope.effects, x);
  };
}
function zl(t, e, n) {
  const r = this.proxy, i = nt(t) ? t.includes(".") ? Ml(r, t) : () => r[t] : t.bind(r, r);
  let s;
  H(e) ? s = e : (s = e.handler, n = e);
  const a = Mt;
  Ri(this);
  const o = Dl(i, s.bind(r), n);
  return a ? Ri(a) : ff(), o;
}
function Ml(t, e) {
  const n = e.split(".");
  return () => {
    let r = t;
    for (let i = 0; i < n.length && r; i++)
      r = r[n[i]];
    return r;
  };
}
function Ht(t, e) {
  if (!z(t) || t.__v_skip || (e = e || /* @__PURE__ */ new Set(), e.has(t)))
    return t;
  if (e.add(t), U(t))
    Ht(t.value, e);
  else if (E(t))
    for (let n = 0; n < t.length; n++)
      Ht(t[n], e);
  else if (Uu(t) || Dt(t))
    t.forEach((n) => {
      Ht(n, e);
    });
  else if ($u(t))
    for (const n in t)
      Ht(t[n], e);
  return t;
}
const Kl = Symbol(), Mn = (t) => t ? hf(t) ? gf(t) || t.proxy : Mn(t.parent) : null, se = /* @__PURE__ */ et(/* @__PURE__ */ Object.create(null), {
  $: (t) => t,
  $el: (t) => t.vnode.el,
  $data: (t) => t.data,
  $props: (t) => process.env.NODE_ENV !== "production" ? Ve(t.props) : t.props,
  $attrs: (t) => process.env.NODE_ENV !== "production" ? Ve(t.attrs) : t.attrs,
  $slots: (t) => process.env.NODE_ENV !== "production" ? Ve(t.slots) : t.slots,
  $refs: (t) => process.env.NODE_ENV !== "production" ? Ve(t.refs) : t.refs,
  $parent: (t) => Mn(t.parent),
  $root: (t) => Mn(t.root),
  $emit: (t) => t.emit,
  $options: (t) => __VUE_OPTIONS_API__ ? Xl(t) : t.type,
  $forceUpdate: (t) => t.f || (t.f = () => wr(t.update)),
  $nextTick: (t) => t.n || (t.n = yl.bind(t.proxy)),
  $watch: (t) => __VUE_OPTIONS_API__ ? zl.bind(t) : ur
}), ql = (t) => t === "_" || t === "$", _n = (t, e) => t !== st && !t.__isScriptSetup && T(t, e), Wl = {
  get({ _: t }, e) {
    const { ctx: n, setupState: r, data: i, props: s, accessCache: a, type: o, appContext: l } = t;
    if (process.env.NODE_ENV !== "production" && e === "__isVue")
      return !0;
    let u;
    if (e[0] !== "$") {
      const v = a[e];
      if (v !== void 0)
        switch (v) {
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
        if (_n(r, e))
          return a[e] = 1, r[e];
        if (i !== st && T(i, e))
          return a[e] = 2, i[e];
        if ((u = t.propsOptions[0]) && T(u, e))
          return a[e] = 3, s[e];
        if (n !== st && T(n, e))
          return a[e] = 4, n[e];
        (!__VUE_OPTIONS_API__ || Jl) && (a[e] = 0);
      }
    }
    const g = se[e];
    let h, p;
    if (g)
      return e === "$attrs" && (j(t, "get", e), process.env.NODE_ENV !== "production" && void 0), g(t);
    if ((h = o.__cssModules) && (h = h[e]))
      return h;
    if (n !== st && T(n, e))
      return a[e] = 4, n[e];
    if (p = l.config.globalProperties, T(p, e))
      return p[e];
    process.env.NODE_ENV !== "production" && dt && (!nt(e) || e.indexOf("__v") !== 0) && (i !== st && ql(e[0]) && T(i, e) ? B(`Property ${JSON.stringify(e)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : t === dt && B(`Property ${JSON.stringify(e)} was accessed during render but is not defined on instance.`));
  },
  set({ _: t }, e, n) {
    const { data: r, setupState: i, ctx: s } = t;
    return _n(i, e) ? (i[e] = n, !0) : process.env.NODE_ENV !== "production" && i.__isScriptSetup && T(i, e) ? (B(`Cannot mutate <script setup> binding "${e}" from Options API.`), !1) : r !== st && T(r, e) ? (r[e] = n, !0) : T(t.props, e) ? (process.env.NODE_ENV !== "production" && B(`Attempting to mutate prop "${e}". Props are readonly.`), !1) : e[0] === "$" && e.slice(1) in t ? (process.env.NODE_ENV !== "production" && B(`Attempting to mutate public property "${e}". Properties starting with $ are reserved and readonly.`), !1) : (process.env.NODE_ENV !== "production" && e in t.appContext.config.globalProperties ? Object.defineProperty(s, e, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : s[e] = n, !0);
  },
  has({ _: { data: t, setupState: e, accessCache: n, ctx: r, appContext: i, propsOptions: s } }, a) {
    let o;
    return !!n[a] || t !== st && T(t, a) || _n(e, a) || (o = s[0]) && T(o, a) || T(r, a) || T(se, a) || T(i.config.globalProperties, a);
  },
  defineProperty(t, e, n) {
    return n.get != null ? t._.accessCache[e] = 0 : T(n, "value") && this.set(t, e, n.value, null), Reflect.defineProperty(t, e, n);
  }
};
process.env.NODE_ENV !== "production" && (Wl.ownKeys = (t) => (B("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(t)));
let Jl = !0;
function Xl(t) {
  const e = t.type, { mixins: n, extends: r } = e, { mixins: i, optionsCache: s, config: { optionMergeStrategies: a } } = t.appContext, o = s.get(e);
  let l;
  return o ? l = o : !i.length && !n && !r ? l = e : (l = {}, i.length && i.forEach((u) => Je(l, u, a, !0)), Je(l, e, a)), z(e) && s.set(e, l), l;
}
function Je(t, e, n, r = !1) {
  const { mixins: i, extends: s } = e;
  s && Je(t, s, n, !0), i && i.forEach((a) => Je(t, a, n, !0));
  for (const a in e)
    if (r && a === "expose")
      process.env.NODE_ENV !== "production" && B('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const o = Ql[a] || n && n[a];
      t[a] = o ? o(t[a], e[a]) : e[a];
    }
  return t;
}
const Ql = {
  data: Oi,
  props: It,
  emits: It,
  methods: It,
  computed: It,
  beforeCreate: R,
  created: R,
  beforeMount: R,
  mounted: R,
  beforeUpdate: R,
  updated: R,
  beforeDestroy: R,
  beforeUnmount: R,
  destroyed: R,
  unmounted: R,
  activated: R,
  deactivated: R,
  errorCaptured: R,
  serverPrefetch: R,
  components: It,
  directives: It,
  watch: jl,
  provide: Oi,
  inject: Yl
};
function Oi(t, e) {
  return e ? t ? function() {
    return et(H(t) ? t.call(this, this) : t, H(e) ? e.call(this, this) : e);
  } : e : t;
}
function Yl(t, e) {
  return It(yi(t), yi(e));
}
function yi(t) {
  if (E(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++)
      e[t[n]] = t[n];
    return e;
  }
  return t;
}
function R(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function It(t, e) {
  return t ? et(et(/* @__PURE__ */ Object.create(null), t), e) : e;
}
function jl(t, e) {
  if (!t)
    return e;
  if (!e)
    return t;
  const n = et(/* @__PURE__ */ Object.create(null), t);
  for (const r in e)
    n[r] = R(t[r], e[r]);
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
const Vi = Gl, tf = (t) => t.__isTeleport, sa = Symbol(process.env.NODE_ENV !== "production" ? "Fragment" : void 0), ef = Symbol(process.env.NODE_ENV !== "production" ? "Text" : void 0), nf = Symbol(process.env.NODE_ENV !== "production" ? "Comment" : void 0);
Symbol(process.env.NODE_ENV !== "production" ? "Static" : void 0);
let $t = null;
function rf(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
const sf = (...t) => ca(...t), aa = "__vInternal", oa = ({ key: t }) => t ?? null, He = ({ ref: t, ref_key: e, ref_for: n }) => t != null ? nt(t) || U(t) || H(t) ? { i: dt, r: t, k: e, f: !!n } : t : null;
function af(t, e = null, n = null, r = 0, i = null, s = t === sa ? 0 : 1, a = !1, o = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && oa(e),
    ref: e && He(e),
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
    ctx: dt
  };
  return o ? (Sr(l, n), s & 128 && t.normalize(l)) : n && (l.shapeFlag |= nt(n) ? 8 : 16), process.env.NODE_ENV !== "production" && l.key !== l.key && B("VNode created with invalid key (NaN). VNode type:", l.type), !a && $t && (l.patchFlag > 0 || s & 6) && l.patchFlag !== 32 && $t.push(l), l;
}
const of = process.env.NODE_ENV !== "production" ? sf : ca;
function ca(t, e = null, n = null, r = 0, i = null, s = !1) {
  if ((!t || t === Kl) && (process.env.NODE_ENV !== "production" && !t && B(`Invalid vnode type when creating vnode: ${t}.`), t = nf), rf(t)) {
    const o = Xe(t, e, !0);
    return n && Sr(o, n), !s && $t && (o.shapeFlag & 6 ? $t[$t.indexOf(t)] = o : $t.push(o)), o.patchFlag |= -2, o;
  }
  if (ha(t) && (t = t.__vccOpts), e) {
    e = cf(e);
    let { class: o, style: l } = e;
    o && !nt(o) && (e.class = cr(o)), z(l) && (Ke(l) && !E(l) && (l = et({}, l)), e.style = or(l));
  }
  const a = nt(t) ? 1 : $l(t) ? 128 : tf(t) ? 64 : z(t) ? 4 : H(t) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && a & 4 && Ke(t) && (t = k(t), B("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `
Component that was made reactive: `, t)), af(t, e, n, r, i, a, s, !0);
}
function cf(t) {
  return t ? Ke(t) || aa in t ? et({}, t) : t : null;
}
function Xe(t, e, n = !1) {
  const { props: r, ref: i, patchFlag: s, children: a } = t, o = e ? lf(r || {}, e) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: o,
    key: o && oa(o),
    ref: e && e.ref ? n && i ? E(i) ? i.concat(He(e)) : [i, He(e)] : He(e) : i,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && s === -1 && E(a) ? a.map(ua) : a,
    target: t.target,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    patchFlag: e && t.type !== sa ? s === -1 ? 16 : s | 16 : s,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: t.transition,
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && Xe(t.ssContent),
    ssFallback: t.ssFallback && Xe(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx
  };
}
function ua(t) {
  const e = Xe(t);
  return E(t.children) && (e.children = t.children.map(ua)), e;
}
function uf(t = " ", e = 0) {
  return of(ef, null, t, e);
}
function Sr(t, e) {
  let n = 0;
  const { shapeFlag: r } = t;
  if (e == null)
    e = null;
  else if (E(e))
    n = 16;
  else if (typeof e == "object")
    if (r & 65) {
      const i = e.default;
      i && (i._c && (i._d = !1), Sr(t, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = e._;
      !i && !(aa in e) ? e._ctx = dt : i === 3 && dt && (dt.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else
    H(e) ? (e = { default: e, _ctx: dt }, n = 32) : (e = String(e), r & 64 ? (n = 16, e = [uf(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function lf(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    for (const i in r)
      if (i === "class")
        e.class !== r.class && (e.class = cr([e.class, r.class]));
      else if (i === "style")
        e.style = or([e.style, r.style]);
      else if (Ru(i)) {
        const s = e[i], a = r[i];
        a && s !== a && !(E(s) && s.includes(a)) && (e[i] = s ? [].concat(s, a) : a);
      } else
        i !== "" && (e[i] = r[i]);
  }
  return e;
}
Zl();
let Mt = null;
const Ri = (t) => {
  Mt = t, t.scope.on();
}, ff = () => {
  Mt && Mt.scope.off(), Mt = null;
};
function hf(t) {
  return t.vnode.shapeFlag & 4;
}
function gf(t) {
  if (t.exposed)
    return t.exposeProxy || (t.exposeProxy = new Proxy(Il(Sl(t.exposed)), {
      get(e, n) {
        if (n in e)
          return e[n];
        if (n in se)
          return se[n](t);
      },
      has(e, n) {
        return n in e || n in se;
      }
    }));
}
const df = /(?:^|[-_])(\w)/g, pf = (t) => t.replace(df, (e) => e.toUpperCase()).replace(/[-_]/g, "");
function la(t, e = !0) {
  return H(t) ? t.displayName || t.name : t.name || e && t.__name;
}
function fa(t, e, n = !1) {
  let r = la(e);
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
function ha(t) {
  return H(t) && "__vccOpts" in t;
}
Symbol(process.env.NODE_ENV !== "production" ? "ssrContext" : "");
function xn(t) {
  return !!(t && t.__v_isShallow);
}
function mf() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const t = { style: "color:#3ba776" }, e = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, r = { style: "color:#9d288c" }, i = {
    header(h) {
      return z(h) ? h.__isVue ? ["div", t, "VueInstance"] : U(h) ? [
        "div",
        {},
        ["span", t, g(h)],
        "<",
        o(h.value),
        ">"
      ] : Et(h) ? [
        "div",
        {},
        ["span", t, xn(h) ? "ShallowReactive" : "Reactive"],
        "<",
        o(h),
        `>${At(h) ? " (readonly)" : ""}`
      ] : At(h) ? [
        "div",
        {},
        ["span", t, xn(h) ? "ShallowReadonly" : "Readonly"],
        "<",
        o(h),
        ">"
      ] : null : null;
    },
    hasBody(h) {
      return h && h.__isVue;
    },
    body(h) {
      if (h && h.__isVue)
        return [
          "div",
          {},
          ...s(h.$)
        ];
    }
  };
  function s(h) {
    const p = [];
    h.type.props && h.props && p.push(a("props", k(h.props))), h.setupState !== st && p.push(a("setup", h.setupState)), h.data !== st && p.push(a("data", k(h.data)));
    const v = l(h, "computed");
    v && p.push(a("computed", v));
    const b = l(h, "inject");
    return b && p.push(a("injected", b)), p.push([
      "div",
      {},
      [
        "span",
        {
          style: r.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: h }]
    ]), p;
  }
  function a(h, p) {
    return p = et({}, p), Object.keys(p).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        h
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(p).map((v) => [
          "div",
          {},
          ["span", r, v + ": "],
          o(p[v], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function o(h, p = !0) {
    return typeof h == "number" ? ["span", e, h] : typeof h == "string" ? ["span", n, JSON.stringify(h)] : typeof h == "boolean" ? ["span", r, h] : z(h) ? ["object", { object: p ? k(h) : h }] : ["span", n, String(h)];
  }
  function l(h, p) {
    const v = h.type;
    if (H(v))
      return;
    const b = {};
    for (const w in h.ctx)
      u(v, w, p) && (b[w] = h.ctx[w]);
    return b;
  }
  function u(h, p, v) {
    const b = h[v];
    if (E(b) && b.includes(p) || z(b) && p in b || h.extends && u(h.extends, p, v) || h.mixins && h.mixins.some((w) => u(w, p, v)))
      return !0;
  }
  function g(h) {
    return xn(h) ? "ShallowRef" : h.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(i) : window.devtoolsFormatters = [i];
}
function vf() {
  mf();
}
process.env.NODE_ENV !== "production" && vf();
function bf(t) {
  const e = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"], n = t % 12;
  return e[n];
}
function Nh(t) {
  const e = Math.floor(t / 12) - 2;
  return bf(t) + e.toString();
}
const wf = /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i, Sf = {
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
function Ah(t) {
  const e = wf.exec(t);
  if (!e)
    return -1;
  const n = e[1], r = e[2];
  return Sf[n.toLowerCase()] + (parseInt(r, 10) + 2) * 12;
}
function Fi(t, e, n, r) {
  return `${t} // ${e} // ${n} // ${r}`;
}
function kf(t, e, n) {
  return `${t} // ${e} // ${n}`;
}
function Oh(t) {
  const e = Qe(t);
  return kf(
    e.manufacturerName,
    e.pluginFormatName,
    e.name
  );
}
function Qe(t) {
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
  const n = Qe(t), r = Qe(e);
  if (O.keys(n).length !== O.keys(r).length)
    return !1;
  for (const i of O.keys(n))
    if (i !== "pluginVersion" && n[i] !== r[i])
      return !1;
  return !0;
}
class yh {
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
function _f(t) {
  return t > -100 ? Math.exp((t - 6) * (1 / 20)) : 0;
}
function Vh(t) {
  return t <= 0 ? -100 : 20 * Math.log10(t);
}
function Rh(t) {
  return t > 0 ? 20 * Math.log(t) + 6 : -100;
}
function Fh(t) {
  return t > 0 ? Math.pow(10, (20 * Math.log(t) + 6) * (1 / 20)) : 0;
}
function Bh(t) {
  return t > 0 ? Math.exp((20 * Math.log10(t) - 6) * (1 / 20)) : 0;
}
function Uh(t, e, n, r, i) {
  return (t - e) / (n - e) * (i - r) + r;
}
function Lh(t) {
  return 440 * Math.pow(2, (t - 69) / 12);
}
function Hh(t) {
  return Ke(t) || U(t) ? k(t) : t;
}
var xf = /* @__PURE__ */ ((t) => (t[t.BassDrum2 = 35] = "BassDrum2", t[t.BassDrum1 = 36] = "BassDrum1", t[t.SideStick = 37] = "SideStick", t[t.SnareDrum1 = 38] = "SnareDrum1", t[t.HandClap = 39] = "HandClap", t[t.SnareDrum2 = 40] = "SnareDrum2", t[t.LowTom2 = 41] = "LowTom2", t[t.ClosedHiHat = 42] = "ClosedHiHat", t[t.LowTom1 = 43] = "LowTom1", t[t.PedalHiHat = 44] = "PedalHiHat", t[t.MidTom2 = 45] = "MidTom2", t[t.OpenHiHat = 46] = "OpenHiHat", t[t.MidTom1 = 47] = "MidTom1", t[t.HighTom2 = 48] = "HighTom2", t[t.CrashCymbal1 = 49] = "CrashCymbal1", t[t.HighTom1 = 50] = "HighTom1", t[t.RideCymbal1 = 51] = "RideCymbal1", t[t.ChineseCymbal = 52] = "ChineseCymbal", t[t.RideBell = 53] = "RideBell", t[t.Tambourine = 54] = "Tambourine", t[t.SplashCymbal = 55] = "SplashCymbal", t[t.Cowbell = 56] = "Cowbell", t[t.CrashCymbal2 = 57] = "CrashCymbal2", t[t.VibraSlap = 58] = "VibraSlap", t[t.RideCymbal2 = 59] = "RideCymbal2", t[t.HighBongo = 60] = "HighBongo", t[t.LowBongo = 61] = "LowBongo", t[t.MuteHighConga = 62] = "MuteHighConga", t[t.OpenHighConga = 63] = "OpenHighConga", t[t.LowConga = 64] = "LowConga", t[t.HighTimbale = 65] = "HighTimbale", t[t.LowTimbale = 66] = "LowTimbale", t[t.HighAgogo = 67] = "HighAgogo", t[t.LowAgogo = 68] = "LowAgogo", t[t.Cabasa = 69] = "Cabasa", t[t.Maracas = 70] = "Maracas", t[t.ShortWhistle = 71] = "ShortWhistle", t[t.LongWhistle = 72] = "LongWhistle", t[t.ShortGuiro = 73] = "ShortGuiro", t[t.LongGuiro = 74] = "LongGuiro", t[t.Claves = 75] = "Claves", t[t.HighWoodBlock = 76] = "HighWoodBlock", t[t.LowWoodBlock = 77] = "LowWoodBlock", t[t.MuteCuica = 78] = "MuteCuica", t[t.OpenCuica = 79] = "OpenCuica", t[t.MuteTriangle = 80] = "MuteTriangle", t[t.OpenTriangle = 81] = "OpenTriangle", t[t.Shaker = 82] = "Shaker", t))(xf || {});
class nn {
  name;
  manufacturerName;
  pluginFormatName;
  pluginVersion;
  isEnabled = !0;
  localInstanceIdInternal;
  base64StatesInternal;
  constructor(e, n, r, i) {
    this.name = e, this.manufacturerName = n, this.pluginFormatName = r, this.pluginVersion = i, this.localInstanceIdInternal = nn.generateAudioPluginInstanceIdInternal();
  }
  getTuneflowId() {
    return Fi(
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
    return Ze(10);
  }
  static DEFAULT_SYNTH_TFID = Fi("TuneFlow", "VST3", "TFSynth", "1.0.0");
}
class pt {
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
    if (!pt.isValidPitch(e))
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
    this.startTick = e;
  }
  setEndTick(e) {
    this.endTick = e;
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
    return pt.isNoteRangeValid(this.startTick, this.endTick);
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
    this.pitch = this.pitch + e, pt.isValidPitch(this.pitch) || this.deleteFromParent();
  }
  getId() {
    return this.idInternal;
  }
}
var ne = /* @__PURE__ */ ((t) => (t[t.MIDI_CLIP = 1] = "MIDI_CLIP", t[t.AUDIO_CLIP = 2] = "AUDIO_CLIP", t))(ne || {});
class Q {
  song;
  track;
  id;
  notes;
  clipStartTick = 0;
  clipEndTick = 0;
  nextNoteIdInternal = 1;
  type;
  audioClipData;
  constructor({
    song: e,
    type: n,
    clipStartTick: r,
    id: i = Q.generateClipIdInternal(),
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
        duration: o.duration
      }, r = O.isNumber(r) ? Math.max(r, o.startTick) : o.startTick;
      const l = this.getAudioEndTick();
      (!O.isNumber(a) || l < a) && (a = l), this.clipStartTick = r, this.clipEndTick = a;
    } else if (n === 1) {
      if (this.clipStartTick = r, !O.isNumber(a))
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
    this.audioClipData ? (this.audioClipData.audioFilePath = e, this.audioClipData.startTick = n, this.audioClipData.duration = r) : this.audioClipData = {
      audioFilePath: e,
      startTick: n,
      duration: r
    };
  }
  getNotes() {
    return Q.getNotesInRange(this.notes, this.clipStartTick, this.clipEndTick);
  }
  getRawNotes() {
    return this.notes;
  }
  getDuration() {
    return this.song.tickToSeconds(this.clipEndTick) - this.song.tickToSeconds(this.clipStartTick);
  }
  getAudioDuration() {
    if (!(this.type !== 2 || !this.audioClipData))
      return this.audioClipData.duration;
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
    if (this.type !== 1 || !pt.isValidPitch(e) || !pt.isNoteRangeValid(r, i) || !pt.isNoteVelocityValid(n))
      return null;
    const o = new pt({
      pitch: e,
      velocity: n,
      startTick: r,
      endTick: i,
      id: this.getNextNoteIdInternal()
    });
    return r < this.clipStartTick && s && this.adjustClipLeft(r, a), i > this.clipEndTick && s && this.adjustClipRight(i, a), this.orderedInsertNote(this.notes, o), o;
  }
  getNoteIndexInternal(e) {
    const n = _.lt(
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
    const r = _.ge(
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
      O.isNumber(r) && (e = Math.min(e, r));
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
      const o = this.song, l = o.tickToSeconds(this.audioClipData.startTick), u = o.tickToSeconds(s), h = o.tickToSeconds(a) - u, p = u - l, v = o.tickToSeconds(this.clipStartTick + e), b = v - p, w = v + h;
      if (this.clipStartTick = r, this.clipEndTick = o.secondsToTick(w), this.audioClipData.startTick = o.secondsToTick(b), this.clipEndTick < 0) {
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
  getAudioEndTick() {
    if (this.type !== 2 || !this.audioClipData)
      return;
    const e = this.getAudioDuration();
    if (!O.isNumber(e))
      return;
    const n = this.song.tickToSeconds(this.audioClipData.startTick);
    return this.song.secondsToTick(n + e);
  }
  static getNotesInRange(e, n, r) {
    return Q.getNotesInRangeImpl(
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
      _.lt(
        e,
        i(n),
        (u, g) => s(u) - s(g)
      )
    );
    for (; e[o] && !Q.isNoteInClip(
      s(e[o]),
      a(e[o]),
      n,
      r
    ); )
      o += 1;
    if (o >= e.length)
      return [];
    let l = Math.min(
      e.length - 1,
      _.gt(
        e,
        i(r),
        (u, g) => s(u) - s(g)
      )
    );
    for (; e[l] && !Q.isNoteInClip(
      s(e[l]),
      a(e[l]),
      n,
      r
    ); )
      l -= 1;
    return l < 0 ? [] : l < o ? [] : e.slice(o, l + 1);
  }
  static getOverlappingNotesWithinRangeImpl(e, n, r, i, s) {
    const a = [];
    for (const o of e) {
      const l = i(o);
      if (l > r)
        break;
      const u = s(o);
      (l >= n && l <= r || u >= n && u <= r) && a.push(o);
    }
    return a;
  }
  static isNoteInClip(e, n, r, i) {
    return (e >= r || r === 0 && e <= 0) && e < i && n > e;
  }
  static getNotePlayableRange(e, n, r, i) {
    if (!Q.isNoteInClip(e, n, r, i))
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
            }), l = Q.getNotesInRange(this.notes, s, a);
            for (const u of l)
              o.createNote({
                pitch: u.getPitch(),
                velocity: u.getVelocity(),
                startTick: u.getStartTick(),
                endTick: u.getEndTick(),
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
    return Ze(10);
  }
}
var Kn = /* @__PURE__ */ ((t) => (t[t.UNDEFINED = 0] = "UNDEFINED", t[t.VOLUME = 1] = "VOLUME", t[t.PAN = 2] = "PAN", t[t.AUDIO_PLUGIN = 3] = "AUDIO_PLUGIN", t))(Kn || {});
class X {
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
    return X.areAutomationTargetsEqual(
      this.getType(),
      e.getType(),
      this.getPluginInstanceId(),
      e.getPluginInstanceId(),
      this.getParamId(),
      e.getParamId()
    );
  }
  clone() {
    return new X(this.type, this.pluginInstanceId, this.paramId);
  }
  toTfAutomationTargetId() {
    return X.encodeAutomationTarget(this.type, this.pluginInstanceId, this.paramId);
  }
  static fromTfAutomationTargetId(e) {
    return X.decodeAutomationTarget(e);
  }
  static encodeAutomationTarget(e, n, r) {
    return e === 3 ? `${e}^^${n}^^${r}` : `${e}`;
  }
  static decodeAutomationTarget(e) {
    const n = e.split("^^");
    if (n.length === 0)
      throw new Error(`Invalid automation target id: ${e}`);
    const r = Number(n[0]);
    return n.length > 2 ? new X(r, n[1], n[2]) : new X(r);
  }
  static areAutomationTargetsEqual(e, n, r, i, s, a) {
    return X.encodeAutomationTarget(e, r, s) === X.encodeAutomationTarget(n, i, a);
  }
}
class Kt {
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
    return Kt.getPointsInRangeImpl(this.points, e, n);
  }
  static getPointsInRangeImpl(e, n, r) {
    const i = _.ge(
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
    return Kt.orderedInsertPointInternal(this.points, i, r), i;
  }
  removePoints(e) {
    const n = new Set(e);
    for (let r = this.points.length - 1; r >= 0; r -= 1) {
      const i = this.points[r];
      n.has(i.id) && this.points.splice(r, 1);
    }
  }
  removePointsInRange(e, n) {
    const r = _.ge(
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
    const l = [];
    for (let u = 0; u < this.points.length; u += 1) {
      const g = this.points[u];
      !s.has(g.id) || (l.push(g), a === void 0 && (a = u), o = u);
    }
    if (!(a === void 0 || o === void 0)) {
      if (i) {
        if (n < 0) {
          const u = Math.max(
            0,
            this.points[a].tick + n
          ), g = _.gt(
            this.points,
            { tick: u },
            (h, p) => h.tick - p.tick
          );
          g < a && this.points.splice(g, a - g);
        } else if (n > 0) {
          const u = this.points[o].tick + n, g = _.lt(
            this.points,
            { tick: u },
            (h, p) => h.tick - p.tick
          );
          g > o && this.points.splice(o + 1, g - o);
        }
      }
      for (const u of l)
        u.tick = Math.max(0, u.tick + n), u.value = Math.max(0, Math.min(1, u.value + r));
      Math.abs(n) > 0 && this.points.sort((u, g) => u.tick - g.tick);
    }
  }
  clone() {
    const e = new Kt();
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
    const i = _.ge(
      e,
      n,
      (s, a) => s.tick - a.tick
    );
    for (; r && e[i] && e[i].tick === n.tick; )
      e.splice(i, 1);
    e.splice(i, 0, n);
  }
}
class kr {
  targets = [];
  targetValues = {};
  getAutomationTargets() {
    return this.targets;
  }
  getAutomationTargetValues() {
    return this.targetValues;
  }
  getOrCreateAutomationValueById(e) {
    return this.targetValues[e] || (this.targetValues[e] = new Kt()), this.targetValues[e];
  }
  getAutomationValueById(e) {
    return this.targetValues[e];
  }
  getAutomationValueByTarget(e) {
    const n = e.toTfAutomationTargetId();
    return this.getAutomationValueById(n);
  }
  addAutomation(e, n = 0) {
    O.isNumber(n) || (n = 0), this.targets.splice(n, 0, e);
    const r = e.toTfAutomationTargetId();
    this.getAutomationValueById(r) || (this.targetValues[r] = new Kt());
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
    for (const n of O.keys(this.targetValues)) {
      const r = X.decodeAutomationTarget(n);
      r.getPluginInstanceId() === e && this.removeAutomation(r);
    }
  }
  removeAllPointsWithinRange(e, n) {
    for (const r of O.keys(this.targetValues))
      this.targetValues[r].removePointsInRange(e, n);
  }
  moveAllPointsWithinRange(e, n, r, i) {
    for (const s of O.keys(this.targetValues))
      this.targetValues[s].movePointsInRange(
        e,
        n,
        r,
        i,
        !1
      );
  }
  clone() {
    const e = new kr();
    for (const n of this.targets)
      e.addAutomation(n.clone());
    for (const n of O.keys(this.targetValues)) {
      const r = this.targetValues[n];
      e.targetValues[n] = r.clone();
    }
    return e;
  }
}
var re = /* @__PURE__ */ ((t) => (t[t.MIDI_TRACK = 1] = "MIDI_TRACK", t[t.AUDIO_TRACK = 2] = "AUDIO_TRACK", t[t.MASTER_TRACK = 3] = "MASTER_TRACK", t))(re || {});
const Bi = 5;
class Gt {
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
  audioPlugins = [];
  song;
  automation;
  type;
  constructor({
    type: e,
    song: n,
    uuid: r = Gt.generateTrackIdInternal(),
    clips: i = [],
    instrument: s,
    suggestedInstruments: a = [],
    volume: o = _f(0),
    solo: l = !1,
    muted: u = !1,
    rank: g = 0,
    pan: h = 0
  }) {
    this.song = n, this.type = e, s ? this.insturment = s : e === 1 && (this.insturment = new ae({
      program: 0,
      isDrum: !1
    })), this.clips = [...i], this.suggestedInstruments = [...a], this.uuid = r, this.volume = o, this.solo = l, this.muted = u, this.rank = g, this.pan = h, this.automation = new kr();
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
    this.type === 1 && (this.insturment = new ae({ program: e, isDrum: n }));
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
    const r = new ae({ program: e, isDrum: n });
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
    const n = Qe(e);
    return new nn(
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
  getAudioPlugins() {
    return this.audioPlugins;
  }
  getAudioPluginAt(e) {
    return this.audioPlugins[e];
  }
  setAudioPluginAt(e, n, r = !0) {
    if (e > Bi - 1)
      throw new Error(
        `The maximum number of effects plugin per track is ${Bi}`
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
    if (this.audioPlugins) {
      for (const n of this.audioPlugins)
        if (!!n && n.getInstanceId() === e)
          return n;
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
    const r = [], i = _.lt(
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
    if (!O.isNumber(e))
      throw new Error("clipStartTick must be specified when creating a clip.");
    const i = n ?? e + 1;
    if (i < e)
      throw new Error(
        `clipEndTick must be greater or equal to clipStartTick, got clipStartTick: ${e}, clipEndTick: ${n}`
      );
    const s = new Q({
      id: Q.generateClipIdInternal(),
      type: ne.MIDI_CLIP,
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
    if (!O.isNumber(e))
      throw new Error("clipStartTick must be specified when creating a clip.");
    const s = new Q({
      id: Q.generateClipIdInternal(),
      type: ne.AUDIO_CLIP,
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
    if (e.getType() === ne.MIDI_CLIP) {
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
      if (e.getType() === ne.AUDIO_CLIP)
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
    const n = _.le(
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
    return this.automation.getAutomationTargets().length > 0 && !O.isEmpty(this.automation.getAutomationTargetValues());
  }
  getVisibleNotes() {
    const e = [];
    for (const n of this.getClips())
      for (const r of n.getNotes())
        e.push(r);
    return e.sort((n, r) => n.getStartTick() - r.getStartTick());
  }
  static generateTrackIdInternal() {
    return Ze();
  }
  resolveClipConflictInternal(e, n, r) {
    const i = this.getClipsOverlappingWith(n, r);
    for (const s of i)
      s.getId() !== e && s.trimConflictPartInternal(n, r);
  }
  orderedInsertClipInternal(e) {
    const n = _.ge(
      this.clips,
      e,
      (r, i) => r.getClipStartTick() - i.getClipStartTick()
    );
    this.clips.splice(n, 0, e);
  }
}
class ae {
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
    return new ae({
      program: this.program,
      isDrum: this.isDrum
    });
  }
}
var Ef = /* @__PURE__ */ ((t) => (t[t.AcousticGrandPiano = 0] = "AcousticGrandPiano", t[t.BrightAcousticPiano = 1] = "BrightAcousticPiano", t[t.ElectricGrandPiano = 2] = "ElectricGrandPiano", t[t.HonkyTonkPiano = 3] = "HonkyTonkPiano", t[t.ElectricPiano1 = 4] = "ElectricPiano1", t[t.ElectricPiano2 = 5] = "ElectricPiano2", t[t.Harpsichord = 6] = "Harpsichord", t[t.Clavinet = 7] = "Clavinet", t[t.Celesta = 8] = "Celesta", t[t.Glockenspiel = 9] = "Glockenspiel", t[t.Musicalbox = 10] = "Musicalbox", t[t.Vibraphone = 11] = "Vibraphone", t[t.Marimba = 12] = "Marimba", t[t.Xylophone = 13] = "Xylophone", t[t.TubularBell = 14] = "TubularBell", t[t.Dulcimer = 15] = "Dulcimer", t[t.DrawbarOrgan = 16] = "DrawbarOrgan", t[t.PercussiveOrgan = 17] = "PercussiveOrgan", t[t.RockOrgan = 18] = "RockOrgan", t[t.Churchorgan = 19] = "Churchorgan", t[t.Reedorgan = 20] = "Reedorgan", t[t.Accordion = 21] = "Accordion", t[t.Harmonica = 22] = "Harmonica", t[t.TangoAccordion = 23] = "TangoAccordion", t[t.AcousticGuitarNylon = 24] = "AcousticGuitarNylon", t[t.AcousticGuitarSteel = 25] = "AcousticGuitarSteel", t[t.ElectricGuitarJazz = 26] = "ElectricGuitarJazz", t[t.ElectricGuitarClean = 27] = "ElectricGuitarClean", t[t.ElectricGuitarMuted = 28] = "ElectricGuitarMuted", t[t.OverdrivenGuitar = 29] = "OverdrivenGuitar", t[t.DistortionGuitar = 30] = "DistortionGuitar", t[t.Guitarharmonics = 31] = "Guitarharmonics", t[t.AcousticBass = 32] = "AcousticBass", t[t.ElectricBassFinger = 33] = "ElectricBassFinger", t[t.ElectricBassPick = 34] = "ElectricBassPick", t[t.FretlessBass = 35] = "FretlessBass", t[t.SlapBass1 = 36] = "SlapBass1", t[t.SlapBass2 = 37] = "SlapBass2", t[t.SynthBass1 = 38] = "SynthBass1", t[t.SynthBass2 = 39] = "SynthBass2", t[t.Violin = 40] = "Violin", t[t.Viola = 41] = "Viola", t[t.Cello = 42] = "Cello", t[t.Contrabass = 43] = "Contrabass", t[t.TremoloStrings = 44] = "TremoloStrings", t[t.PizzicatoStrings = 45] = "PizzicatoStrings", t[t.OrchestralHarp = 46] = "OrchestralHarp", t[t.Timpani = 47] = "Timpani", t[t.StringEnsemble1 = 48] = "StringEnsemble1", t[t.StringEnsemble2 = 49] = "StringEnsemble2", t[t.SynthStrings1 = 50] = "SynthStrings1", t[t.SynthStrings2 = 51] = "SynthStrings2", t[t.VoiceAahs = 52] = "VoiceAahs", t[t.VoiceOohs = 53] = "VoiceOohs", t[t.SynthVoice = 54] = "SynthVoice", t[t.OrchestraHit = 55] = "OrchestraHit", t[t.Trumpet = 56] = "Trumpet", t[t.Trombone = 57] = "Trombone", t[t.Tuba = 58] = "Tuba", t[t.MutedTrumpet = 59] = "MutedTrumpet", t[t.Frenchhorn = 60] = "Frenchhorn", t[t.BrassSection = 61] = "BrassSection", t[t.SynthBrass1 = 62] = "SynthBrass1", t[t.SynthBrass2 = 63] = "SynthBrass2", t[t.SopranoSax = 64] = "SopranoSax", t[t.AltoSax = 65] = "AltoSax", t[t.TenorSax = 66] = "TenorSax", t[t.BaritoneSax = 67] = "BaritoneSax", t[t.Oboe = 68] = "Oboe", t[t.EnglishHorn = 69] = "EnglishHorn", t[t.Bassoon = 70] = "Bassoon", t[t.Clarinet = 71] = "Clarinet", t[t.Piccolo = 72] = "Piccolo", t[t.Flute = 73] = "Flute", t[t.Recorder = 74] = "Recorder", t[t.PanFlute = 75] = "PanFlute", t[t.BlownBottle = 76] = "BlownBottle", t[t.Shakuhachi = 77] = "Shakuhachi", t[t.Whistle = 78] = "Whistle", t[t.Ocarina = 79] = "Ocarina", t[t.Lead1Square = 80] = "Lead1Square", t[t.Lead2Sawtooth = 81] = "Lead2Sawtooth", t[t.Lead3Calliope = 82] = "Lead3Calliope", t[t.Lead4Chiff = 83] = "Lead4Chiff", t[t.Lead5Charang = 84] = "Lead5Charang", t[t.Lead6Voice = 85] = "Lead6Voice", t[t.Lead7Fifths = 86] = "Lead7Fifths", t[t.Lead8BassLead = 87] = "Lead8BassLead", t[t.Pad1NewAge = 88] = "Pad1NewAge", t[t.Pad2Warm = 89] = "Pad2Warm", t[t.Pad3PolySynth = 90] = "Pad3PolySynth", t[t.Pad4Choir = 91] = "Pad4Choir", t[t.Pad5Bowed = 92] = "Pad5Bowed", t[t.Pad6Metallic = 93] = "Pad6Metallic", t[t.Pad7Halo = 94] = "Pad7Halo", t[t.Pad8Sweep = 95] = "Pad8Sweep", t[t.FX1Rain = 96] = "FX1Rain", t[t.FX2Soundtrack = 97] = "FX2Soundtrack", t[t.FX3Crystal = 98] = "FX3Crystal", t[t.FX4Atmosphere = 99] = "FX4Atmosphere", t[t.FX5Brightness = 100] = "FX5Brightness", t[t.FX6Goblins = 101] = "FX6Goblins", t[t.FX7Echoes = 102] = "FX7Echoes", t[t.FX8SciFi = 103] = "FX8SciFi", t[t.Sitar = 104] = "Sitar", t[t.Banjo = 105] = "Banjo", t[t.Shamisen = 106] = "Shamisen", t[t.Guzheng = 107] = "Guzheng", t[t.Kalimba = 108] = "Kalimba", t[t.Bagpipe = 109] = "Bagpipe", t[t.Fiddle = 110] = "Fiddle", t[t.Shanai = 111] = "Shanai", t[t.TinkleBell = 112] = "TinkleBell", t[t.Agogo = 113] = "Agogo", t[t.SteelDrums = 114] = "SteelDrums", t[t.Woodblock = 115] = "Woodblock", t[t.TaikoDrum = 116] = "TaikoDrum", t[t.MelodicTom = 117] = "MelodicTom", t[t.SynthDrum = 118] = "SynthDrum", t[t.ReverseCymbal = 119] = "ReverseCymbal", t[t.GuitarFretNoise = 120] = "GuitarFretNoise", t[t.BreathNoise = 121] = "BreathNoise", t[t.Seashore = 122] = "Seashore", t[t.BirdTweet = 123] = "BirdTweet", t[t.TelephoneRing = 124] = "TelephoneRing", t[t.Helicopter = 125] = "Helicopter", t[t.Applause = 126] = "Applause", t[t.Gunshot = 127] = "Gunshot", t))(Ef || {}), Tf = /* @__PURE__ */ ((t) => (t[t.BassDrum2 = 35] = "BassDrum2", t[t.BassDrum1 = 36] = "BassDrum1", t[t.SideStick = 37] = "SideStick", t[t.SnareDrum1 = 38] = "SnareDrum1", t[t.HandClap = 39] = "HandClap", t[t.SnareDrum2 = 40] = "SnareDrum2", t[t.LowTom2 = 41] = "LowTom2", t[t.ClosedHiHat = 42] = "ClosedHiHat", t[t.LowTom1 = 43] = "LowTom1", t[t.PedalHiHat = 44] = "PedalHiHat", t[t.MidTom2 = 45] = "MidTom2", t[t.OpenHiHat = 46] = "OpenHiHat", t[t.MidTom1 = 47] = "MidTom1", t[t.HighTom2 = 48] = "HighTom2", t[t.CrashCymbal1 = 49] = "CrashCymbal1", t[t.HighTom1 = 50] = "HighTom1", t[t.RideCymbal1 = 51] = "RideCymbal1", t[t.ChineseCymbal = 52] = "ChineseCymbal", t[t.RideBell = 53] = "RideBell", t[t.Tambourine = 54] = "Tambourine", t[t.SplashCymbal = 55] = "SplashCymbal", t[t.Cowbell = 56] = "Cowbell", t[t.CrashCymbal2 = 57] = "CrashCymbal2", t[t.VibraSlap = 58] = "VibraSlap", t[t.RideCymbal2 = 59] = "RideCymbal2", t[t.HighBongo = 60] = "HighBongo", t[t.LowBongo = 61] = "LowBongo", t[t.MuteHighConga = 62] = "MuteHighConga", t[t.OpenHighConga = 63] = "OpenHighConga", t[t.LowConga = 64] = "LowConga", t[t.HighTimbale = 65] = "HighTimbale", t[t.LowTimbale = 66] = "LowTimbale", t[t.HighAgogo = 67] = "HighAgogo", t[t.LowAgogo = 68] = "LowAgogo", t[t.Cabasa = 69] = "Cabasa", t[t.Maracas = 70] = "Maracas", t[t.ShortWhistle = 71] = "ShortWhistle", t[t.LongWhistle = 72] = "LongWhistle", t[t.ShortGuiro = 73] = "ShortGuiro", t[t.LongGuiro = 74] = "LongGuiro", t[t.Claves = 75] = "Claves", t[t.HighWoodBlock = 76] = "HighWoodBlock", t[t.LowWoodBlock = 77] = "LowWoodBlock", t[t.MuteCuica = 78] = "MuteCuica", t[t.OpenCuica = 79] = "OpenCuica", t[t.MuteTriangle = 80] = "MuteTriangle", t[t.OpenTriangle = 81] = "OpenTriangle", t[t.Shaker = 82] = "Shaker", t))(Tf || {}), rn = {}, sn = {};
function Pf(t) {
  var e = new $(t), n = e.readChunk();
  if (n.id != "MThd")
    throw "Bad MIDI file.  Expected 'MHdr', got: '" + n.id + "'";
  for (var r = Nf(n.data), i = [], s = 0; !e.eof() && s < r.numTracks; s++) {
    var a = e.readChunk();
    if (a.id != "MTrk")
      throw "Bad MIDI file.  Expected 'MTrk', got: '" + a.id + "'";
    var o = Af(a.data);
    i.push(o);
  }
  return {
    header: r,
    tracks: i
  };
}
function Nf(t) {
  var e = new $(t), n = e.readUInt16(), r = e.readUInt16(), i = {
    format: n,
    numTracks: r
  }, s = e.readUInt16();
  return s & 32768 ? (i.framesPerSecond = 256 - (s >> 8), i.ticksPerFrame = s & 255) : i.ticksPerBeat = s, i;
}
function Af(t) {
  for (var e = new $(t), n = []; !e.eof(); ) {
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
        var l = e.readUInt8(), u = e.readVarInt();
        switch (l) {
          case 0:
            if (a.type = "sequenceNumber", u !== 2)
              throw "Expected length for sequenceNumber event is 2, got " + u;
            return a.number = e.readUInt16(), a;
          case 1:
            return a.type = "text", a.text = e.readString(u), a;
          case 2:
            return a.type = "copyrightNotice", a.text = e.readString(u), a;
          case 3:
            return a.type = "trackName", a.text = e.readString(u), a;
          case 4:
            return a.type = "instrumentName", a.text = e.readString(u), a;
          case 5:
            return a.type = "lyrics", a.text = e.readString(u), a;
          case 6:
            return a.type = "marker", a.text = e.readString(u), a;
          case 7:
            return a.type = "cuePoint", a.text = e.readString(u), a;
          case 32:
            if (a.type = "channelPrefix", u != 1)
              throw "Expected length for channelPrefix event is 1, got " + u;
            return a.channel = e.readUInt8(), a;
          case 33:
            if (a.type = "portPrefix", u != 1)
              throw "Expected length for portPrefix event is 1, got " + u;
            return a.port = e.readUInt8(), a;
          case 47:
            if (a.type = "endOfTrack", u != 0)
              throw "Expected length for endOfTrack event is 0, got " + u;
            return a;
          case 81:
            if (a.type = "setTempo", u != 3)
              throw "Expected length for setTempo event is 3, got " + u;
            return a.microsecondsPerBeat = e.readUInt24(), a;
          case 84:
            if (a.type = "smpteOffset", u != 5)
              throw "Expected length for smpteOffset event is 5, got " + u;
            var g = e.readUInt8(), h = { 0: 24, 32: 25, 64: 29, 96: 30 };
            return a.frameRate = h[g & 96], a.hour = g & 31, a.min = e.readUInt8(), a.sec = e.readUInt8(), a.frame = e.readUInt8(), a.subFrame = e.readUInt8(), a;
          case 88:
            if (a.type = "timeSignature", u != 4)
              throw "Expected length for timeSignature event is 4, got " + u;
            return a.numerator = e.readUInt8(), a.denominator = 1 << e.readUInt8(), a.metronome = e.readUInt8(), a.thirtyseconds = e.readUInt8(), a;
          case 89:
            if (a.type = "keySignature", u != 2)
              throw "Expected length for keySignature event is 2, got " + u;
            return a.key = e.readInt8(), a.scale = e.readUInt8(), a;
          case 127:
            return a.type = "sequencerSpecific", a.data = e.readBytes(u), a;
          default:
            return a.type = "unknownMeta", a.data = e.readBytes(u), a.metatypeByte = l, a;
        }
      } else if (o == 240) {
        a.type = "sysEx";
        var u = e.readVarInt();
        return a.data = e.readBytes(u), a;
      } else if (o == 247) {
        a.type = "endSysEx";
        var u = e.readVarInt();
        return a.data = e.readBytes(u), a;
      } else
        throw "Unrecognised MIDI event type byte: " + o;
    else {
      var p;
      if ((o & 128) === 0) {
        if (i === null)
          throw "Running status byte encountered before status byte";
        p = o, o = i, a.running = !0;
      } else
        p = e.readUInt8(), i = o;
      var v = o >> 4;
      switch (a.channel = o & 15, v) {
        case 8:
          return a.type = "noteOff", a.noteNumber = p, a.velocity = e.readUInt8(), a;
        case 9:
          var b = e.readUInt8();
          return a.type = b === 0 ? "noteOff" : "noteOn", a.noteNumber = p, a.velocity = b, b === 0 && (a.byte9 = !0), a;
        case 10:
          return a.type = "noteAftertouch", a.noteNumber = p, a.amount = e.readUInt8(), a;
        case 11:
          return a.type = "controller", a.controllerType = p, a.value = e.readUInt8(), a;
        case 12:
          return a.type = "programChange", a.programNumber = p, a;
        case 13:
          return a.type = "channelAftertouch", a.amount = p, a;
        case 14:
          return a.type = "pitchBend", a.value = p + (e.readUInt8() << 7) - 8192, a;
        default:
          throw "Unrecognised MIDI event type: " + v;
      }
    }
  }
}
function $(t) {
  this.buffer = t, this.bufferLen = this.buffer.length, this.pos = 0;
}
$.prototype.eof = function() {
  return this.pos >= this.bufferLen;
};
$.prototype.readUInt8 = function() {
  var t = this.buffer[this.pos];
  return this.pos += 1, t;
};
$.prototype.readInt8 = function() {
  var t = this.readUInt8();
  return t & 128 ? t - 256 : t;
};
$.prototype.readUInt16 = function() {
  var t = this.readUInt8(), e = this.readUInt8();
  return (t << 8) + e;
};
$.prototype.readInt16 = function() {
  var t = this.readUInt16();
  return t & 32768 ? t - 65536 : t;
};
$.prototype.readUInt24 = function() {
  var t = this.readUInt8(), e = this.readUInt8(), n = this.readUInt8();
  return (t << 16) + (e << 8) + n;
};
$.prototype.readInt24 = function() {
  var t = this.readUInt24();
  return t & 8388608 ? t - 16777216 : t;
};
$.prototype.readUInt32 = function() {
  var t = this.readUInt8(), e = this.readUInt8(), n = this.readUInt8(), r = this.readUInt8();
  return (t << 24) + (e << 16) + (n << 8) + r;
};
$.prototype.readBytes = function(t) {
  var e = this.buffer.slice(this.pos, this.pos + t);
  return this.pos += t, e;
};
$.prototype.readString = function(t) {
  var e = this.readBytes(t);
  return String.fromCharCode.apply(null, e);
};
$.prototype.readVarInt = function() {
  for (var t = 0; !this.eof(); ) {
    var e = this.readUInt8();
    if (e & 128)
      t += e & 127, t <<= 7;
    else
      return t + e;
  }
  return t;
};
$.prototype.readChunk = function() {
  var t = this.readString(4), e = this.readUInt32(), n = this.readBytes(e);
  return {
    id: t,
    length: e,
    data: n
  };
};
var Of = Pf;
function yf(t, e) {
  if (typeof t != "object")
    throw "Invalid MIDI data";
  e = e || {};
  var n = t.header || {}, r = t.tracks || [], i, s = r.length, a = new N();
  for (Vf(a, n, s), i = 0; i < s; i++)
    Rf(a, r[i], e);
  return a.buffer;
}
function Vf(t, e, n) {
  var r = e.format == null ? 1 : e.format, i = 128;
  e.timeDivision ? i = e.timeDivision : e.ticksPerFrame && e.framesPerSecond ? i = -(e.framesPerSecond & 255) << 8 | e.ticksPerFrame & 255 : e.ticksPerBeat && (i = e.ticksPerBeat & 32767);
  var s = new N();
  s.writeUInt16(r), s.writeUInt16(n), s.writeUInt16(i), t.writeChunk("MThd", s.buffer);
}
function Rf(t, e, n) {
  var r = new N(), i, s = e.length, a = null;
  for (i = 0; i < s; i++)
    (n.running === !1 || !n.running && !e[i].running) && (a = null), a = Ff(r, e[i], a, n.useByte9ForNoteOff);
  t.writeChunk("MTrk", r.buffer);
}
function Ff(t, e, n, r) {
  var i = e.type, s = e.deltaTime, a = e.text || "", o = e.data || [], l = null;
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
      var u = { 24: 0, 25: 32, 29: 64, 30: 96 }, g = e.hour & 31 | u[e.frameRate];
      t.writeUInt8(g), t.writeUInt8(e.min), t.writeUInt8(e.sec), t.writeUInt8(e.frame), t.writeUInt8(e.subFrame);
      break;
    case "timeSignature":
      t.writeUInt8(255), t.writeUInt8(88), t.writeVarInt(4), t.writeUInt8(e.numerator);
      var h = Math.floor(Math.log(e.denominator) / Math.LN2) & 255;
      t.writeUInt8(h), t.writeUInt8(e.metronome), t.writeUInt8(e.thirtyseconds || 8);
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
      var p = r !== !1 && e.byte9 || r && e.velocity == 0 ? 144 : 128;
      l = p | e.channel, l !== n && t.writeUInt8(l), t.writeUInt8(e.noteNumber), t.writeUInt8(e.velocity);
      break;
    case "noteOn":
      l = 144 | e.channel, l !== n && t.writeUInt8(l), t.writeUInt8(e.noteNumber), t.writeUInt8(e.velocity);
      break;
    case "noteAftertouch":
      l = 160 | e.channel, l !== n && t.writeUInt8(l), t.writeUInt8(e.noteNumber), t.writeUInt8(e.amount);
      break;
    case "controller":
      l = 176 | e.channel, l !== n && t.writeUInt8(l), t.writeUInt8(e.controllerType), t.writeUInt8(e.value);
      break;
    case "programChange":
      l = 192 | e.channel, l !== n && t.writeUInt8(l), t.writeUInt8(e.programNumber);
      break;
    case "channelAftertouch":
      l = 208 | e.channel, l !== n && t.writeUInt8(l), t.writeUInt8(e.amount);
      break;
    case "pitchBend":
      l = 224 | e.channel, l !== n && t.writeUInt8(l);
      var v = 8192 + e.value, b = v & 127, w = v >> 7 & 127;
      t.writeUInt8(b), t.writeUInt8(w);
      break;
    default:
      throw "Unrecognized event type: " + i;
  }
  return l;
}
function N() {
  this.buffer = [];
}
N.prototype.writeUInt8 = function(t) {
  this.buffer.push(t & 255);
};
N.prototype.writeInt8 = N.prototype.writeUInt8;
N.prototype.writeUInt16 = function(t) {
  var e = t >> 8 & 255, n = t & 255;
  this.writeUInt8(e), this.writeUInt8(n);
};
N.prototype.writeInt16 = N.prototype.writeUInt16;
N.prototype.writeUInt24 = function(t) {
  var e = t >> 16 & 255, n = t >> 8 & 255, r = t & 255;
  this.writeUInt8(e), this.writeUInt8(n), this.writeUInt8(r);
};
N.prototype.writeInt24 = N.prototype.writeUInt24;
N.prototype.writeUInt32 = function(t) {
  var e = t >> 24 & 255, n = t >> 16 & 255, r = t >> 8 & 255, i = t & 255;
  this.writeUInt8(e), this.writeUInt8(n), this.writeUInt8(r), this.writeUInt8(i);
};
N.prototype.writeInt32 = N.prototype.writeUInt32;
N.prototype.writeBytes = function(t) {
  this.buffer = this.buffer.concat(Array.prototype.slice.call(t, 0));
};
N.prototype.writeString = function(t) {
  var e, n = t.length, r = [];
  for (e = 0; e < n; e++)
    r.push(t.codePointAt(e));
  this.writeBytes(r);
};
N.prototype.writeVarInt = function(t) {
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
N.prototype.writeChunk = function(t, e) {
  this.writeString(t), this.writeUInt32(e.length), this.writeBytes(e);
};
var Bf = yf;
sn.parseMidi = Of;
sn.writeMidi = Bf;
var Cr = {}, an = {}, pe = {};
Object.defineProperty(pe, "__esModule", { value: !0 });
function ga(t, e, n) {
  n === void 0 && (n = "ticks");
  var r = 0, i = t.length, s = i;
  if (i > 0 && t[i - 1][n] <= e)
    return i - 1;
  for (; r < s; ) {
    var a = Math.floor(r + (s - r) / 2), o = t[a], l = t[a + 1];
    if (o[n] === e) {
      for (var u = a; u < t.length; u++) {
        var g = t[u];
        g[n] === e && (a = u);
      }
      return a;
    } else {
      if (o[n] < e && l[n] > e)
        return a;
      o[n] > e ? s = a : o[n] < e && (r = a + 1);
    }
  }
  return -1;
}
pe.search = ga;
function Uf(t, e, n) {
  if (n === void 0 && (n = "ticks"), t.length) {
    var r = ga(t, e[n], n);
    t.splice(r + 1, 0, e);
  } else
    t.push(e);
}
pe.insert = Uf;
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  var e = pe, n = /* @__PURE__ */ new WeakMap();
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
      this.tempos = [], this.timeSignatures = [], this.keySignatures = [], this.meta = [], this.name = "", n.set(this, 480), s && (n.set(this, s.header.ticksPerBeat), s.tracks.forEach(function(o) {
        return o.forEach(function(l) {
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
      }), s.tracks[0].forEach(function(o) {
        o.meta && (o.type === "trackName" ? a.name = o.text : (o.type === "text" || o.type === "cuePoint" || o.type === "marker" || o.type === "lyrics") && a.meta.push({
          text: o.text,
          ticks: o.absoluteTime,
          type: o.type
        }));
      }), this.update());
    }
    return i.prototype.update = function() {
      var s = this, a = 0, o = 0;
      this.tempos.sort(function(l, u) {
        return l.ticks - u.ticks;
      }), this.tempos.forEach(function(l, u) {
        var g = u > 0 ? s.tempos[u - 1].bpm : s.tempos[0].bpm, h = l.ticks / s.ppq - o, p = 60 / g * h;
        l.time = p + a, a = l.time, o += h;
      }), this.timeSignatures.sort(function(l, u) {
        return l.ticks - u.ticks;
      }), this.timeSignatures.forEach(function(l, u) {
        var g = u > 0 ? s.timeSignatures[u - 1] : s.timeSignatures[0], h = (l.ticks - g.ticks) / s.ppq, p = h / g.timeSignature[0] / (g.timeSignature[1] / 4);
        g.measures = g.measures || 0, l.measures = p + g.measures;
      });
    }, i.prototype.ticksToSeconds = function(s) {
      var a = e.search(this.tempos, s);
      if (a !== -1) {
        var o = this.tempos[a], l = o.time, u = (s - o.ticks) / this.ppq;
        return l + 60 / o.bpm * u;
      } else {
        var g = s / this.ppq;
        return 60 / 120 * g;
      }
    }, i.prototype.ticksToMeasures = function(s) {
      var a = e.search(this.timeSignatures, s);
      if (a !== -1) {
        var o = this.timeSignatures[a], l = (s - o.ticks) / this.ppq;
        return o.measures + l / (o.timeSignature[0] / o.timeSignature[1]) / 4;
      } else
        return s / this.ppq / 4;
    }, Object.defineProperty(i.prototype, "ppq", {
      get: function() {
        return n.get(this);
      },
      enumerable: !0,
      configurable: !0
    }), i.prototype.secondsToTicks = function(s) {
      var a = e.search(this.tempos, s, "time");
      if (a !== -1) {
        var o = this.tempos[a], l = o.time, u = s - l, g = u / (60 / o.bpm);
        return Math.round(o.ticks + g * this.ppq);
      } else {
        var h = s / 0.5;
        return Math.round(h * this.ppq);
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
})(an);
var me = { exports: {} };
me.exports = Lf;
me.exports.from = da;
me.exports.depth = Hf;
me.exports.fromDepth = pa;
function Lf(t) {
  if (!Array.isArray(t))
    throw new TypeError("Expected value to be an array");
  return da(t);
}
function da(t) {
  return ma(t, []);
}
function Hf(t, e) {
  if (!Array.isArray(t))
    throw new TypeError("Expected value to be an array");
  return pa(t, e);
}
function pa(t, e) {
  if (typeof e != "number")
    throw new TypeError("Expected the depth to be a number");
  return va(t, [], e);
}
function ma(t, e) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    Array.isArray(r) ? ma(r, e) : e.push(r);
  }
  return e;
}
function va(t, e, n) {
  n--;
  for (var r = 0; r < t.length; r++) {
    var i = t[r];
    n > -1 && Array.isArray(i) ? va(i, e, n) : e.push(i);
  }
  return e;
}
var En = Y && Y.__spreadArrays || function() {
  for (var t = 0, e = 0, n = arguments.length; e < n; e++)
    t += arguments[e].length;
  for (var r = Array(t), i = 0, e = 0; e < n; e++)
    for (var s = arguments[e], a = 0, o = s.length; a < o; a++, i++)
      r[i] = s[a];
  return r;
}, $f = Y && Y.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(Cr, "__esModule", { value: !0 });
var Gf = sn, Df = an, zf = $f(me.exports);
function Mf(t, e) {
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
function Kf(t) {
  return zf.default(t.notes.map(function(e) {
    return Mf(e, t.channel);
  }));
}
function qf(t, e) {
  return {
    absoluteTime: t.ticks,
    channel: e,
    controllerType: t.number,
    deltaTime: 0,
    type: "controller",
    value: Math.floor(t.value * 127)
  };
}
function Wf(t) {
  for (var e = [], n = 0; n < 127; n++)
    t.controlChanges.hasOwnProperty(n) && t.controlChanges[n].forEach(function(r) {
      e.push(qf(r, t.channel));
    });
  return e;
}
function Jf(t, e) {
  return {
    absoluteTime: t.ticks,
    channel: e,
    deltaTime: 0,
    type: "pitchBend",
    value: t.value
  };
}
function Xf(t) {
  var e = [];
  return t.pitchBends.forEach(function(n) {
    e.push(Jf(n, t.channel));
  }), e;
}
function Qf(t) {
  return {
    absoluteTime: 0,
    channel: t.channel,
    deltaTime: 0,
    programNumber: t.instrument.number,
    type: "programChange"
  };
}
function Yf(t) {
  return {
    absoluteTime: 0,
    deltaTime: 0,
    meta: !0,
    text: t,
    type: "trackName"
  };
}
function jf(t) {
  return {
    absoluteTime: t.ticks,
    deltaTime: 0,
    meta: !0,
    microsecondsPerBeat: Math.floor(6e7 / t.bpm),
    type: "setTempo"
  };
}
function Zf(t) {
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
function th(t) {
  var e = Df.keySignatureKeys.indexOf(t.key);
  return {
    absoluteTime: t.ticks,
    deltaTime: 0,
    key: e + 7,
    meta: !0,
    scale: t.scale === "major" ? 0 : 1,
    type: "keySignature"
  };
}
function eh(t) {
  return {
    absoluteTime: t.ticks,
    deltaTime: 0,
    meta: !0,
    text: t.text,
    type: t.type
  };
}
function nh(t) {
  var e = {
    header: {
      format: 1,
      numTracks: t.tracks.length + 1,
      ticksPerBeat: t.header.ppq
    },
    tracks: En([
      En([
        {
          absoluteTime: 0,
          deltaTime: 0,
          meta: !0,
          text: t.header.name,
          type: "trackName"
        }
      ], t.header.keySignatures.map(function(n) {
        return th(n);
      }), t.header.meta.map(function(n) {
        return eh(n);
      }), t.header.tempos.map(function(n) {
        return jf(n);
      }), t.header.timeSignatures.map(function(n) {
        return Zf(n);
      }))
    ], t.tracks.map(function(n) {
      return En([
        Yf(n.name),
        Qf(n)
      ], Kf(n), Wf(n), Xf(n));
    }))
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
  }), new Uint8Array(Gf.writeMidi(e));
}
Cr.encode = nh;
var on = {}, Ir = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.controlChangeNames = {
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
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(i.prototype, "name", {
      get: function() {
        return t.controlChangeNames[this.number] ? t.controlChangeNames[this.number] : null;
      },
      enumerable: !0,
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
      enumerable: !0,
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
})(Ir);
var _r = {};
Object.defineProperty(_r, "__esModule", { value: !0 });
var Fe = Ir;
function rh() {
  return new Proxy({}, {
    get: function(t, e) {
      if (t[e])
        return t[e];
      if (Fe.controlChangeIds.hasOwnProperty(e))
        return t[Fe.controlChangeIds[e]];
    },
    set: function(t, e, n) {
      return Fe.controlChangeIds.hasOwnProperty(e) ? t[Fe.controlChangeIds[e]] = n : t[e] = n, !0;
    }
  });
}
_r.createControlChanges = rh;
var xr = {};
Object.defineProperty(xr, "__esModule", { value: !0 });
var Tn = /* @__PURE__ */ new WeakMap(), ih = function() {
  function t(e, n) {
    Tn.set(this, n), this.ticks = e.absoluteTime, this.value = e.value;
  }
  return Object.defineProperty(t.prototype, "time", {
    get: function() {
      var e = Tn.get(this);
      return e.ticksToSeconds(this.ticks);
    },
    set: function(e) {
      var n = Tn.get(this);
      this.ticks = n.secondsToTicks(e);
    },
    enumerable: !0,
    configurable: !0
  }), t.prototype.toJSON = function() {
    return {
      ticks: this.ticks,
      time: this.time,
      value: this.value
    };
  }, t;
}();
xr.PitchBend = ih;
var Er = {}, ve = {};
Object.defineProperty(ve, "__esModule", { value: !0 });
ve.instrumentByPatchID = [
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
ve.InstrumentFamilyByID = [
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
ve.DrumKitByPatchID = {
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
Object.defineProperty(Er, "__esModule", { value: !0 });
var Be = ve, Ui = /* @__PURE__ */ new WeakMap(), sh = function() {
  function t(e, n) {
    if (this.number = 0, Ui.set(this, n), this.number = 0, e) {
      var r = e.find(function(i) {
        return i.type === "programChange";
      });
      r && (this.number = r.programNumber);
    }
  }
  return Object.defineProperty(t.prototype, "name", {
    get: function() {
      return this.percussion ? Be.DrumKitByPatchID[this.number] : Be.instrumentByPatchID[this.number];
    },
    set: function(e) {
      var n = Be.instrumentByPatchID.indexOf(e);
      n !== -1 && (this.number = n);
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(t.prototype, "family", {
    get: function() {
      return this.percussion ? "drums" : Be.InstrumentFamilyByID[Math.floor(this.number / 8)];
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(t.prototype, "percussion", {
    get: function() {
      var e = Ui.get(this);
      return e.channel === 9;
    },
    enumerable: !0,
    configurable: !0
  }), t.prototype.toJSON = function() {
    return {
      family: this.family,
      name: this.name,
      number: this.number
    };
  }, t.prototype.fromJSON = function(e) {
    this.number = e.number;
  }, t;
}();
Er.Instrument = sh;
var Tr = {};
Object.defineProperty(Tr, "__esModule", { value: !0 });
function ah(t) {
  var e = Math.floor(t / 12) - 1;
  return ba(t) + e.toString();
}
function ba(t) {
  var e = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"], n = t % 12;
  return e[n];
}
function oh(t) {
  var e = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  return e.indexOf(t);
}
var ch = function() {
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
}(), Lt = /* @__PURE__ */ new WeakMap(), uh = function() {
  function t(e, n, r) {
    Lt.set(this, r), this.midi = e.midi, this.velocity = e.velocity, this.noteOffVelocity = n.velocity, this.ticks = e.ticks, this.durationTicks = n.ticks - e.ticks;
  }
  return Object.defineProperty(t.prototype, "name", {
    get: function() {
      return ah(this.midi);
    },
    set: function(e) {
      this.midi = ch(e);
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(t.prototype, "octave", {
    get: function() {
      return Math.floor(this.midi / 12) - 1;
    },
    set: function(e) {
      var n = e - this.octave;
      this.midi += n * 12;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(t.prototype, "pitch", {
    get: function() {
      return ba(this.midi);
    },
    set: function(e) {
      this.midi = 12 * (this.octave + 1) + oh(e);
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(t.prototype, "duration", {
    get: function() {
      var e = Lt.get(this);
      return e.ticksToSeconds(this.ticks + this.durationTicks) - e.ticksToSeconds(this.ticks);
    },
    set: function(e) {
      var n = Lt.get(this), r = n.secondsToTicks(this.time + e);
      this.durationTicks = r - this.ticks;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(t.prototype, "time", {
    get: function() {
      var e = Lt.get(this);
      return e.ticksToSeconds(this.ticks);
    },
    set: function(e) {
      var n = Lt.get(this);
      this.ticks = n.secondsToTicks(e);
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(t.prototype, "bars", {
    get: function() {
      var e = Lt.get(this);
      return e.ticksToMeasures(this.ticks);
    },
    enumerable: !0,
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
Tr.Note = uh;
Object.defineProperty(on, "__esModule", { value: !0 });
var Pn = pe, lh = Ir, fh = _r, hh = xr, Li = Er, gh = Tr, Ue = /* @__PURE__ */ new WeakMap(), dh = function() {
  function t(e, n) {
    var r = this;
    if (this.name = "", this.notes = [], this.controlChanges = fh.createControlChanges(), this.pitchBends = [], Ue.set(this, n), e) {
      var i = e.find(function(p) {
        return p.type === "trackName";
      });
      this.name = i ? i.text : "";
    }
    if (this.instrument = new Li.Instrument(e, this), this.channel = 0, e) {
      for (var s = e.filter(function(p) {
        return p.type === "noteOn";
      }), a = e.filter(function(p) {
        return p.type === "noteOff";
      }), o = function() {
        var p = s.shift();
        l.channel = p.channel;
        var v = a.findIndex(function(w) {
          return w.noteNumber === p.noteNumber && w.absoluteTime >= p.absoluteTime;
        });
        if (v !== -1) {
          var b = a.splice(v, 1)[0];
          l.addNote({
            durationTicks: b.absoluteTime - p.absoluteTime,
            midi: p.noteNumber,
            noteOffVelocity: b.velocity / 127,
            ticks: p.absoluteTime,
            velocity: p.velocity / 127
          });
        }
      }, l = this; s.length; )
        o();
      var u = e.filter(function(p) {
        return p.type === "controller";
      });
      u.forEach(function(p) {
        r.addCC({
          number: p.controllerType,
          ticks: p.absoluteTime,
          value: p.value / 127
        });
      });
      var g = e.filter(function(p) {
        return p.type === "pitchBend";
      });
      g.forEach(function(p) {
        r.addPitchBend({
          ticks: p.absoluteTime,
          value: p.value / Math.pow(2, 13)
        });
      });
      var h = e.find(function(p) {
        return p.type === "endOfTrack";
      });
      this.endOfTrackTicks = h !== void 0 ? h.absoluteTime : void 0;
    }
  }
  return t.prototype.addNote = function(e) {
    var n = Ue.get(this), r = new gh.Note({
      midi: 0,
      ticks: 0,
      velocity: 1
    }, {
      ticks: 0,
      velocity: 0
    }, n);
    return Object.assign(r, e), Pn.insert(this.notes, r, "ticks"), this;
  }, t.prototype.addCC = function(e) {
    var n = Ue.get(this), r = new lh.ControlChange({
      controllerType: e.number
    }, n);
    return delete e.number, Object.assign(r, e), Array.isArray(this.controlChanges[r.number]) || (this.controlChanges[r.number] = []), Pn.insert(this.controlChanges[r.number], r, "ticks"), this;
  }, t.prototype.addPitchBend = function(e) {
    var n = Ue.get(this), r = new hh.PitchBend({}, n);
    return Object.assign(r, e), Pn.insert(this.pitchBends, r, "ticks"), this;
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
    enumerable: !0,
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
    enumerable: !0,
    configurable: !0
  }), t.prototype.fromJSON = function(e) {
    var n = this;
    this.name = e.name, this.channel = e.channel, this.instrument = new Li.Instrument(void 0, this), this.instrument.fromJSON(e.instrument), e.endOfTrackTicks !== void 0 && (this.endOfTrackTicks = e.endOfTrackTicks);
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
on.Track = dh;
var ph = Y && Y.__awaiter || function(t, e, n, r) {
  function i(s) {
    return s instanceof n ? s : new n(function(a) {
      a(s);
    });
  }
  return new (n || (n = Promise))(function(s, a) {
    function o(g) {
      try {
        u(r.next(g));
      } catch (h) {
        a(h);
      }
    }
    function l(g) {
      try {
        u(r.throw(g));
      } catch (h) {
        a(h);
      }
    }
    function u(g) {
      g.done ? s(g.value) : i(g.value).then(o, l);
    }
    u((r = r.apply(t, e || [])).next());
  });
}, mh = Y && Y.__generator || function(t, e) {
  var n = { label: 0, sent: function() {
    if (s[0] & 1)
      throw s[1];
    return s[1];
  }, trys: [], ops: [] }, r, i, s, a;
  return a = { next: o(0), throw: o(1), return: o(2) }, typeof Symbol == "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function o(u) {
    return function(g) {
      return l([u, g]);
    };
  }
  function l(u) {
    if (r)
      throw new TypeError("Generator is already executing.");
    for (; n; )
      try {
        if (r = 1, i && (s = u[0] & 2 ? i.return : u[0] ? i.throw || ((s = i.return) && s.call(i), 0) : i.next) && !(s = s.call(i, u[1])).done)
          return s;
        switch (i = 0, s && (u = [u[0] & 2, s.value]), u[0]) {
          case 0:
          case 1:
            s = u;
            break;
          case 4:
            return n.label++, { value: u[1], done: !1 };
          case 5:
            n.label++, i = u[1], u = [0];
            continue;
          case 7:
            u = n.ops.pop(), n.trys.pop();
            continue;
          default:
            if (s = n.trys, !(s = s.length > 0 && s[s.length - 1]) && (u[0] === 6 || u[0] === 2)) {
              n = 0;
              continue;
            }
            if (u[0] === 3 && (!s || u[1] > s[0] && u[1] < s[3])) {
              n.label = u[1];
              break;
            }
            if (u[0] === 6 && n.label < s[1]) {
              n.label = s[1], s = u;
              break;
            }
            if (s && n.label < s[2]) {
              n.label = s[2], n.ops.push(u);
              break;
            }
            s[2] && n.ops.pop(), n.trys.pop();
            continue;
        }
        u = e.call(t, n);
      } catch (g) {
        u = [6, g], i = 0;
      } finally {
        r = s = 0;
      }
    if (u[0] & 5)
      throw u[1];
    return { value: u[0] ? u[1] : void 0, done: !0 };
  }
};
Object.defineProperty(rn, "__esModule", { value: !0 });
var vh = sn, bh = Cr, Hi = an, Nn = on, wh = function() {
  function t(e) {
    var n = this, r = null;
    e && (e instanceof ArrayBuffer && (e = new Uint8Array(e)), r = vh.parseMidi(e), r.tracks.forEach(function(i) {
      var s = 0;
      i.forEach(function(a) {
        s += a.deltaTime, a.absoluteTime = s;
      });
    }), r.tracks = Ih(r.tracks)), this.header = new Hi.Header(r), this.tracks = [], e && (this.tracks = r.tracks.map(function(i) {
      return new Nn.Track(i, n.header);
    }), r.header.format === 1 && this.tracks[0].duration === 0 && this.tracks.shift());
  }
  return t.fromUrl = function(e) {
    return ph(this, void 0, void 0, function() {
      var n, r;
      return mh(this, function(i) {
        switch (i.label) {
          case 0:
            return [4, fetch(e)];
          case 1:
            return n = i.sent(), n.ok ? [4, n.arrayBuffer()] : [3, 3];
          case 2:
            return r = i.sent(), [2, new t(r)];
          case 3:
            throw new Error("could not load " + e);
        }
      });
    });
  }, Object.defineProperty(t.prototype, "name", {
    get: function() {
      return this.header.name;
    },
    set: function(e) {
      this.header.name = e;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(t.prototype, "duration", {
    get: function() {
      var e = this.tracks.map(function(n) {
        return n.duration;
      });
      return Math.max.apply(Math, e);
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(t.prototype, "durationTicks", {
    get: function() {
      var e = this.tracks.map(function(n) {
        return n.durationTicks;
      });
      return Math.max.apply(Math, e);
    },
    enumerable: !0,
    configurable: !0
  }), t.prototype.addTrack = function() {
    var e = new Nn.Track(void 0, this.header);
    return this.tracks.push(e), e;
  }, t.prototype.toArray = function() {
    return bh.encode(this);
  }, t.prototype.toJSON = function() {
    return {
      header: this.header.toJSON(),
      tracks: this.tracks.map(function(e) {
        return e.toJSON();
      })
    };
  }, t.prototype.fromJSON = function(e) {
    var n = this;
    this.header = new Hi.Header(), this.header.fromJSON(e.header), this.tracks = e.tracks.map(function(r) {
      var i = new Nn.Track(void 0, n.header);
      return i.fromJSON(r), i;
    });
  }, t.prototype.clone = function() {
    var e = new t();
    return e.fromJSON(this.toJSON()), e;
  }, t;
}(), Sh = rn.Midi = wh, kh = on;
rn.Track = kh.Track;
var Ch = an;
rn.Header = Ch.Header;
function Ih(t) {
  for (var e = [], n = 0; n < t.length; n++)
    for (var r = e.length, i = /* @__PURE__ */ new Map(), s = Array(16).fill(0), a = 0, o = t[n]; a < o.length; a++) {
      var l = o[a], u = r, g = l.channel;
      if (g !== void 0) {
        l.type === "programChange" && (s[g] = l.programNumber);
        var h = s[g], p = h + " " + g;
        i.has(p) ? u = i.get(p) : (u = r + i.size, i.set(p, u));
      }
      e[u] || e.push([]), e[u].push(l);
    }
  return e;
}
var _h = /* @__PURE__ */ ((t) => (t[t.UNKNOWN = 0] = "UNKNOWN", t[t.INTRO = 1] = "INTRO", t[t.VERSE = 2] = "VERSE", t[t.CHORUS = 3] = "CHORUS", t[t.BRIDGE = 4] = "BRIDGE", t[t.OUTRO = 5] = "OUTRO", t))(_h || {});
class xh {
  tick;
  type;
  constructor({ tick: e, type: n }) {
    this.tick = e, this.type = n;
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
}
class rt {
  static DEFAULT_PPQ = 480;
  masterTrack;
  tracks;
  PPQ;
  tempos;
  timeSignatures;
  structures;
  pluginContext;
  nextTrackRank = 1;
  constructor() {
    this.tracks = [], this.PPQ = 0, this.tempos = [], this.timeSignatures = [], this.structures = [];
  }
  getMasterTrack() {
    return this.masterTrack || (this.masterTrack = new Gt({
      type: re.MASTER_TRACK,
      song: this,
      uuid: Gt.generateTrackIdInternal()
    })), this.masterTrack;
  }
  getTracks() {
    return this.tracks;
  }
  getTrackById(e) {
    return ze(this.tracks, (n) => n.getId() === e);
  }
  getTracksByIds(e) {
    if (!this.tracks)
      return [];
    const n = new Set(e);
    return this.tracks.filter((r) => n.has(r.getId()));
  }
  getTrackIndex(e) {
    return qt(this.tracks, (n) => n.getId() === e);
  }
  createTrack({
    type: e,
    index: n,
    rank: r,
    assignDefaultSamplerPlugin: i = !1
  }) {
    this.checkAccess("createTrack"), r == null || r === null ? r = this.getNextTrackRank() : this.nextTrackRank = Math.max(r + 1, this.nextTrackRank);
    const s = new Gt({
      type: e,
      song: this,
      uuid: this.getNextTrackId(),
      rank: r == null || r === null ? this.getNextTrackRank() : r
    });
    return i && e === re.MIDI_TRACK && s.setSamplerPlugin(s.createAudioPlugin(nn.DEFAULT_SYNTH_TFID)), n != null ? this.tracks.splice(n, 0, s) : this.tracks.push(s), s;
  }
  cloneTrack(e) {
    let n = this.getTrackIndex(e.getId());
    n < 0 && (n = void 0);
    const r = this.createTrack({
      type: e.getType(),
      index: n
    });
    if (r.setVolume(e.getVolume()), r.setPan(e.getPan()), r.setSolo(e.getSolo()), r.setMuted(e.getMuted()), e.getType() === re.MIDI_TRACK) {
      const i = e.getInstrument();
      i && r.setInstrument({
        program: i.getProgram(),
        isDrum: i.getIsDrum()
      });
      for (const a of e.getSuggestedInstruments())
        r.createSuggestedInstrument({
          program: a.getProgram(),
          isDrum: a.getIsDrum()
        });
      const s = e.getSamplerPlugin();
      s && r.setSamplerPlugin(s.clone(r));
    }
    for (let i = 0; i < e.getAudioPlugins().length; i += 1) {
      const s = e.getAudioPluginAt(i);
      !s || r.setAudioPluginAt(i, s.clone(r));
    }
    for (const i of e.getClips()) {
      const s = r.cloneClip(i);
      r.insertClip(s);
    }
    return e.hasAnyAutomation() && r.setAutomation(e.getAutomation()), r;
  }
  removeTrack(e) {
    this.checkAccess("removeTrack");
    const n = this.getTrackById(e);
    return n ? (this.tracks.splice(
      qt(this.tracks, (r) => r.getId() === e),
      1
    ), n) : null;
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
    let r = _.le(n, { tick: e }, (i, s) => i.tick - s.tick);
    for (; r > 0 && n[r].beat !== 1; )
      r -= 1;
    return n[r];
  }
  static getLeadingBeat(e, n) {
    if (!n || n.length === 0)
      return null;
    if (e < 0)
      return n[0];
    const r = _.le(n, { tick: e }, (i, s) => i.tick - s.tick);
    return n[r];
  }
  static getTrailingBeat(e, n) {
    if (!n || n.length === 0)
      return null;
    if (e < 0)
      return n[0];
    const r = _.ge(n, { tick: e }, (i, s) => i.tick - s.tick);
    return r > n.length - 1 ? n[n.length - 1] : n[r];
  }
  static getClosestBeat(e, n) {
    if (!n || n.length === 0)
      return null;
    if (e < 0)
      return n[0];
    const r = _.le(n, { tick: e }, (i, s) => i.tick - s.tick);
    return r >= n.length - 1 ? n[r] : Math.abs(n[r].tick - e) > Math.abs(n[r + 1].tick - e) ? n[r + 1] : n[r];
  }
  getBarBeats(e) {
    return rt.getBarBeatsImpl(
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
    for (let h = 0; h < r.length; h += 1)
      if (s.length === 0)
        s.push(r[h]);
      else {
        const p = i(r[h]), v = i(
          s[s.length - 1]
        );
        (p.numerator !== v.numerator || p.denominator !== v.denominator) && s.push(r[h]);
      }
    const a = [];
    let o = 0, l = 0, u = 1, g = 1;
    for (; o <= e; ) {
      if (l < s.length - 1) {
        const v = i(
          s[l + 1]
        ).tick;
        o >= v && (o = v, l += 1, g > 1 && (g = 1, u += 1));
      }
      const h = i(
        s[l]
      );
      a.push({
        bar: u,
        beat: g,
        tick: o,
        numerator: g === 1 ? h.numerator : void 0,
        denominator: g === 1 ? h.denominator : void 0,
        ticksPerBeat: g === 1 ? n * 4 / h.denominator : void 0
      }), g >= h.numerator ? (g = 1, u += 1) : g += 1, o += n * 4 / h.denominator;
    }
    return a;
  }
  getTempoChanges() {
    return this.tempos;
  }
  getTempoAtTick(e) {
    return rt.getTempoAtTickImpl(
      e,
      this.tempos,
      (n) => ({
        getTicks: () => n
      }),
      (n) => n.getTicks()
    );
  }
  static getTempoAtTickImpl(e, n, r, i) {
    let s = _.le(
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
    const r = new Ee({ ticks: e, bpm: n, time: this.tickToSeconds(e) }), i = _.ge(
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
    const n = wi(e);
    n.sort((i, s) => i.getTicks() - s.getTicks());
    const r = n[0];
    if (r.getTicks() > 0)
      throw new Error("The first tempo event needs to start from tick 0");
    this.tempos = [
      new Ee({
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
    this.timeSignatures = wi(e);
  }
  createTimeSignature({
    ticks: e,
    numerator: n,
    denominator: r
  }) {
    const i = new Si({ ticks: e, numerator: n, denominator: r }), s = _.ge(
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
    return rt.getStructureAtTickImpl(
      e,
      this.structures,
      (n) => ({ getTick: () => n }),
      (n) => n.getTick()
    );
  }
  static getStructureAtTickImpl(e, n, r, i) {
    let s = _.le(
      n,
      r(e),
      (a, o) => i(a) - i(o)
    );
    return s < 0 && (s = 0), s >= n.length && (s = n.length - 1), n[s];
  }
  createStructure({ tick: e, type: n }) {
    const r = new xh({
      tick: e,
      type: n
    });
    this.structures.push(r), this.structures.length === 1 && r.setTick(0), this.structures.sort((i, s) => i.getTick() - s.getTick());
  }
  moveStructure(e, n) {
    const r = this.getStructures()[e];
    if (!r || e <= 0)
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
    return rt.getTimeSignatureAtTickImpl(
      e,
      this.timeSignatures,
      (n) => ({
        getTicks: () => n
      }),
      (n) => n.getTicks()
    );
  }
  static getTimeSignatureAtTickImpl(e, n, r, i) {
    let s = _.le(
      n,
      r(e),
      (a, o) => i(a) - i(o)
    );
    return s < 0 && (s = 0), s >= n.length && (s = n.length - 1), n[s];
  }
  tickToSeconds(e) {
    return rt.tickToSecondsImpl(
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
    let o = _.lt(
      n,
      i(e),
      (p, v) => s(p) - s(v)
    );
    o == -1 && (o = 0);
    const l = n[o], u = a(l), g = e - u.tick, h = rt.tempoBPMToTicksPerSecond(
      u.bpm,
      r
    );
    return u.time + g / h;
  }
  secondsToTick(e) {
    return rt.secondsToTickImpl(
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
    let s = _.le(
      i,
      { tick: e },
      (l, u) => l.tick - u.tick
    );
    const a = i[s < 0 ? 0 : s];
    if (!a)
      return null;
    for (; s < i.length; s += 1) {
      const l = i[s];
      if (l.bar - a.bar >= n && (l.bar - a.bar > n || l.beat >= r + 1))
        break;
    }
    const o = i[s];
    return o ? o.tick : null;
  }
  static secondsToTickImpl(e, n, r, i, s, a) {
    if (e === 0)
      return 0;
    let o = _.lt(
      r,
      i(e),
      (p, v) => s(p) - s(v)
    );
    o == -1 && (o = 0);
    const l = r[o], u = a(l), g = e - u.time, h = rt.tempoBPMToTicksPerSecond(
      u.bpm,
      n
    );
    return Math.round(u.tick + g * h);
  }
  static importMIDI(e, n, r = 0, i = !1) {
    const s = new Sh(n), a = r, o = rt.DEFAULT_PPQ / s.header.ppq;
    if (i) {
      const u = [];
      for (const h of s.header.timeSignatures)
        u.push(
          new Si({
            ticks: a + Ct(h.ticks, o),
            numerator: h.timeSignature[0],
            denominator: h.timeSignature[1]
          })
        );
      e.overwriteTimeSignatures(u);
      const g = [];
      a > 0 && g.push(
        new Ee({
          ticks: 0,
          time: 0,
          bpm: 120
        })
      );
      for (const h of s.header.tempos)
        g.push(
          new Ee({
            ticks: a + Ct(h.ticks, o),
            time: h.time,
            bpm: h.bpm
          })
        );
      e.overwriteTempoChanges(g);
    }
    const l = [];
    for (const u of s.tracks) {
      const g = e.createTrack({
        type: re.MIDI_TRACK,
        assignDefaultSamplerPlugin: !0
      });
      l.push(g), g.setInstrument({
        program: u.instrument.number,
        isDrum: u.instrument.percussion
      });
      const h = g.createMIDIClip({ clipStartTick: a });
      let p = Number.MAX_SAFE_INTEGER;
      for (const w of u.notes)
        h.createNote({
          pitch: w.midi,
          velocity: Math.round(w.velocity * 127),
          startTick: a + Ct(w.ticks, o),
          endTick: a + Ct(w.ticks + w.durationTicks, o)
        }), p = Math.min(
          p,
          a + Ct(w.ticks, o)
        );
      const v = u.controlChanges[7];
      if (v)
        if (v.length === 1)
          g.setVolume(v[0].value);
        else {
          const w = new X(Kn.VOLUME);
          g.getAutomation().addAutomation(w);
          const Z = g.getAutomation().getAutomationValueByTarget(w);
          for (const x of v)
            Z.addPoint(
              a + Ct(x.ticks, o),
              x.value
            );
        }
      const b = u.controlChanges[10];
      if (b)
        if (b.length === 1) {
          const w = Math.round(b[0].value * 127 - 64);
          g.setPan(w);
        } else {
          const w = new X(Kn.PAN);
          g.getAutomation().addAutomation(w);
          const Z = g.getAutomation().getAutomationValueByTarget(w);
          for (const x of b)
            Z.addPoint(a + Ct(x.ticks, o), x.value);
        }
      p !== Number.MAX_SAFE_INTEGER && h.adjustClipLeft(p);
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
      n.push(Gt.generateTrackIdInternal());
    else if (e.numTracksCreatedByPlugin > n.length)
      throw new Error("Plugin generated track ids out of sync.");
    const r = n[e.numTracksCreatedByPlugin];
    return e.numTracksCreatedByPlugin += 1, r;
  }
  getNextTrackRank() {
    const e = this.nextTrackRank;
    return this.nextTrackRank += 1, e;
  }
  checkAccess(e) {
    if (!this.pluginContext)
      throw new Error(
        "Song needs to be accessed in a plugin context in order to use privileged methods."
      );
    if (!this.pluginContext.plugin.songAccess()[e])
      throw new Error(
        `Plugin ${this.pluginContext.plugin.constructor.id()} requires access ${e} in order to run.`
      );
  }
  static tempoBPMToTicksPerSecond(e, n) {
    return e * n / 60;
  }
  retimingTempoEvents() {
    this.tempos.sort((e, n) => e.getTicks() - n.getTicks());
    for (const e of this.tempos)
      e.setTimeInternal(this.tickToSeconds(e.getTicks()));
  }
}
function Ct(t, e) {
  return Math.round(t * e);
}
var F = /* @__PURE__ */ ((t) => (t[t.Slider = 1] = "Slider", t[t.Input = 2] = "Input", t[t.TrackSelector = 3] = "TrackSelector", t[t.Pitch = 4] = "Pitch", t[t.TrackPitchSelector = 5] = "TrackPitchSelector", t[t.InstrumentSelector = 6] = "InstrumentSelector", t[t.Select = 7] = "Select", t[t.Switch = 8] = "Switch", t[t.InputNumber = 9] = "InputNumber", t[t.MultiTrackSelector = 10] = "MultiTrackSelector", t[t.None = 11] = "None", t[t.FileSelector = 12] = "FileSelector", t[t.MultiSourceAudioSelector = 13] = "MultiSourceAudioSelector", t[t.AudioRecorder = 14] = "AudioRecorder", t[t.SelectList = 15] = "SelectList", t[t.Descriptions = 16] = "Descriptions", t))(F || {});
async function $h(t) {
  return t.arrayBuffer();
}
var Eh = /* @__PURE__ */ ((t) => (t[t.SelectedTrackIds = 1] = "SelectedTrackIds", t[t.SelectedClipInfos = 2] = "SelectedClipInfos", t[t.TickAtPlayhead = 3] = "TickAtPlayhead", t[t.EditingClipInfo = 4] = "EditingClipInfo", t[t.EditingNoteIds = 5] = "EditingNoteIds", t[t.TickAtPlayheadSnappedToBeat = 6] = "TickAtPlayheadSnappedToBeat", t))(Eh || {});
export {
  nn as AudioPlugin,
  kr as AutomationData,
  X as AutomationTarget,
  Kn as AutomationTargetType,
  Kt as AutomationValue,
  Q as Clip,
  ne as ClipType,
  Tf as DrumInstrumentType,
  xf as DrumPitch,
  Eh as InjectSource,
  Ef as MelodicInstrumentType,
  pt as Note,
  rt as Song,
  xh as StructureMarker,
  _h as StructureType,
  Ee as TempoEvent,
  yh as TickToSecondStepper,
  Si as TimeSignatureEvent,
  Gt as Track,
  re as TrackType,
  Th as TuneflowPipeline,
  Bs as TuneflowPlugin,
  F as WidgetType,
  Cf as areTuneflowIdsEqual,
  If as areTuneflowIdsEqualIgnoreVersion,
  _f as dbToVolumeValue,
  Qe as decodeAudioPluginTuneflowId,
  Vh as gainToDb,
  Bh as gainToVolumeValue,
  Fi as getAudioPluginTuneflowId,
  kf as getAudioPluginVersionlessTuneflowId,
  $h as getFileContentFromFileSelector,
  Hh as maybeToRaw,
  Nh as midiNumberToPitch,
  Lh as pitchToHz,
  Ah as pitchToMidiNumber,
  Uh as remapRange,
  Oh as toVersionlessTfId,
  Rh as volumeValueToDb,
  Fh as volumeValueToGain
};
