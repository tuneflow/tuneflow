var $i = "1.13.6", ui = typeof self == "object" && self.self === self && self || typeof global == "object" && global.global === global && global || Function("return this")() || {}, Ye = Array.prototype, Wn = Object.prototype, li = typeof Symbol < "u" ? Symbol.prototype : null, zo = Ye.push, fe = Ye.slice, oe = Wn.toString, Ko = Wn.hasOwnProperty, Gi = typeof ArrayBuffer < "u", qo = typeof DataView < "u", Wo = Array.isArray, fi = Object.keys, hi = Object.create, gi = Gi && ArrayBuffer.isView, Jo = isNaN, Xo = isFinite, Di = !{ toString: null }.propertyIsEnumerable("toString"), di = [
  "valueOf",
  "isPrototypeOf",
  "toString",
  "propertyIsEnumerable",
  "hasOwnProperty",
  "toLocaleString"
], Qo = Math.pow(2, 53) - 1;
function z(t, e) {
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
function yt(t) {
  var e = typeof t;
  return e === "function" || e === "object" && !!t;
}
function Yo(t) {
  return t === null;
}
function Mi(t) {
  return t === void 0;
}
function zi(t) {
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
const Jn = y("String"), Ki = y("Number"), Zo = y("Date"), tc = y("RegExp"), ec = y("Error"), qi = y("Symbol"), Wi = y("ArrayBuffer");
var Ji = y("Function"), nc = ui.document && ui.document.childNodes;
typeof /./ != "function" && typeof Int8Array != "object" && typeof nc != "function" && (Ji = function(t) {
  return typeof t == "function" || !1;
});
const L = Ji, Xi = y("Object");
var Qi = qo && Xi(new DataView(new ArrayBuffer(8))), Xn = typeof Map < "u" && Xi(/* @__PURE__ */ new Map()), rc = y("DataView");
function ic(t) {
  return t != null && L(t.getInt8) && Wi(t.buffer);
}
const $e = Qi ? ic : rc, Rt = Wo || y("Array");
function wt(t, e) {
  return t != null && Ko.call(t, e);
}
var An = y("Arguments");
(function() {
  An(arguments) || (An = function(t) {
    return wt(t, "callee");
  });
})();
const Qn = An;
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
  return gi ? gi(t) && !$e(t) : ac(t) && oc.test(oe.call(t));
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
  var n = di.length, r = t.constructor, i = L(r) && r.prototype || Wn, s = "constructor";
  for (wt(t, s) && !e.contains(s) && e.push(s); n--; )
    s = di[n], s in t && t[s] !== i[s] && !e.contains(s) && e.push(s);
}
function P(t) {
  if (!yt(t))
    return [];
  if (fi)
    return fi(t);
  var e = [];
  for (var n in t)
    wt(t, n) && e.push(n);
  return Di && ns(t, e), e;
}
function lc(t) {
  if (t == null)
    return !0;
  var e = K(t);
  return typeof e == "number" && (Rt(t) || Jn(t) || Qn(t)) ? e === 0 : K(P(t)) === 0;
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
function k(t) {
  if (t instanceof k)
    return t;
  if (!(this instanceof k))
    return new k(t);
  this._wrapped = t;
}
k.VERSION = $i;
k.prototype.value = function() {
  return this._wrapped;
};
k.prototype.valueOf = k.prototype.toJSON = k.prototype.value;
k.prototype.toString = function() {
  return String(this._wrapped);
};
function pi(t) {
  return new Uint8Array(
    t.buffer || t,
    t.byteOffset || 0,
    Ge(t)
  );
}
var mi = "[object DataView]";
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
  t instanceof k && (t = t._wrapped), e instanceof k && (e = e._wrapped);
  var i = oe.call(t);
  if (i !== oe.call(e))
    return !1;
  if (Qi && i == "[object Object]" && $e(t)) {
    if (!$e(e))
      return !1;
    i = mi;
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
      return li.valueOf.call(t) === li.valueOf.call(e);
    case "[object ArrayBuffer]":
    case mi:
      return is(pi(t), pi(e), n, r);
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
      if (h = g[u], !(wt(e, h) && On(t[h], e[h], n, r)))
        return !1;
  }
  return n.pop(), r.pop(), !0;
}
function fc(t, e) {
  return On(t, e);
}
function he(t) {
  if (!yt(t))
    return [];
  var e = [];
  for (var n in t)
    e.push(n);
  return Di && ns(t, e), e;
}
function Yn(t) {
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
    return t !== os || !L(n[jn]);
  };
}
var jn = "forEach", ss = "has", Zn = ["clear", "delete"], as = ["get", ss, "set"], hc = Zn.concat(jn, as), os = Zn.concat(as), gc = ["add"].concat(Zn, jn, ss);
const dc = Xn ? Yn(hc) : y("Map"), pc = Xn ? Yn(os) : y("WeakMap"), mc = Xn ? Yn(gc) : y("Set"), vc = y("WeakSet");
function Xt(t) {
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
function tr(t, e) {
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
const us = tr(he), De = tr(P), ls = tr(he, !0);
function wc() {
  return function() {
  };
}
function fs(t) {
  if (!yt(t))
    return {};
  if (hi)
    return hi(t);
  var e = wc();
  e.prototype = t;
  var n = new e();
  return e.prototype = null, n;
}
function kc(t, e) {
  var n = fs(t);
  return e && De(n, e), n;
}
function Sc(t) {
  return yt(t) ? Rt(t) ? t.slice() : us({}, t) : t;
}
function Cc(t, e) {
  return e(t), t;
}
function hs(t) {
  return Rt(t) ? t : [t];
}
k.toPath = hs;
function ge(t) {
  return k.toPath(t);
}
function er(t, e) {
  for (var n = e.length, r = 0; r < n; r++) {
    if (t == null)
      return;
    t = t[e[r]];
  }
  return n ? t : void 0;
}
function gs(t, e, n) {
  var r = er(t, ge(e));
  return Mi(r) ? n : r;
}
function Ic(t, e) {
  e = ge(e);
  for (var n = e.length, r = 0; r < n; r++) {
    var i = e[r];
    if (!wt(t, i))
      return !1;
    t = t[i];
  }
  return !!n;
}
function nr(t) {
  return t;
}
function ce(t) {
  return t = De({}, t), function(e) {
    return rs(e, t);
  };
}
function rr(t) {
  return t = ge(t), function(e) {
    return er(e, t);
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
  return t == null ? nr : L(t) ? de(t, e, n) : yt(t) && !Rt(t) ? ce(t) : rr(t);
}
function ir(t, e) {
  return ds(t, e, 1 / 0);
}
k.iteratee = ir;
function q(t, e, n) {
  return k.iteratee !== ir ? k.iteratee(t, e) : ds(t, e, n);
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
function Rn(t, e) {
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
}, Tc = ms(vs), Nc = cs(vs), Pc = ms(Nc), Ac = k.templateSettings = {
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  escape: /<%-([\s\S]+?)%>/g
};
var kn = /(.)^/, Oc = {
  "'": "'",
  "\\": "\\",
  "\r": "r",
  "\n": "n",
  "\u2028": "u2028",
  "\u2029": "u2029"
}, yc = /\\|'|\r|\n|\u2028|\u2029/g;
function Rc(t) {
  return "\\" + Oc[t];
}
var Bc = /^\s*(\w|\$)+\s*$/;
function Vc(t, e, n) {
  !e && n && (e = n), e = ls({}, e, k.templateSettings);
  var r = RegExp([
    (e.escape || kn).source,
    (e.interpolate || kn).source,
    (e.evaluate || kn).source
  ].join("|") + "|$", "g"), i = 0, s = "__p+='";
  t.replace(r, function(u, g, h, p, v) {
    return s += t.slice(i, v).replace(yc, Rc), i = v + u.length, g ? s += `'+
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
    if (!Bc.test(a))
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
    return o.call(this, u, k);
  };
  return l.source = "function(" + a + `){
` + s + "}", l;
}
function Fc(t, e, n) {
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
  var e = k(t);
  return e._chain = !0, e;
}
function bs(t, e, n, r, i) {
  if (!(r instanceof e))
    return t.apply(n, i);
  var s = fs(t.prototype), a = t.apply(s, i);
  return yt(a) ? a : s;
}
var Qt = z(function(t, e) {
  var n = Qt.placeholder, r = function() {
    for (var i = 0, s = e.length, a = Array(s), o = 0; o < s; o++)
      a[o] = e[o] === n ? arguments[i++] : e[o];
    for (; i < arguments.length; )
      a.push(arguments[i++]);
    return bs(t, r, this, this, a);
  };
  return r;
});
Qt.placeholder = k;
const ws = z(function(t, e, n) {
  if (!L(t))
    throw new TypeError("Bind must be called on a function");
  var r = z(function(i) {
    return bs(t, r, e, this, n.concat(i));
  });
  return r;
}), W = Zi(K);
function Bt(t, e, n, r) {
  if (r = r || [], !e && e !== 0)
    e = 1 / 0;
  else if (e <= 0)
    return r.concat(t);
  for (var i = r.length, s = 0, a = K(t); s < a; s++) {
    var o = t[s];
    if (W(o) && (Rt(o) || Qn(o)))
      if (e > 1)
        Bt(o, e - 1, n, r), i = r.length;
      else
        for (var l = 0, u = o.length; l < u; )
          r[i++] = o[l++];
    else
      n || (r[i++] = o);
  }
  return r;
}
const $c = z(function(t, e) {
  e = Bt(e, !1, !1);
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
    return wt(i, s) || (i[s] = t.apply(this, arguments)), i[s];
  };
  return n.cache = {}, n;
}
const ks = z(function(t, e, n) {
  return setTimeout(function() {
    return t.apply(null, n);
  }, e);
}), Dc = Qt(ks, k, 1);
function Mc(t, e, n) {
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
function zc(t, e, n) {
  var r, i, s, a, o, l = function() {
    var g = ue() - i;
    e > g ? r = setTimeout(l, e - g) : (r = null, n || (a = t.apply(o, s)), r || (s = o = null));
  }, u = z(function(g) {
    return o = this, s = g, i = ue(), r || (r = setTimeout(l, e), n && (a = t.apply(o, s))), a;
  });
  return u.cancel = function() {
    clearTimeout(r), r = s = o = null;
  }, u;
}
function Kc(t, e) {
  return Qt(e, t);
}
function sr(t) {
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
function Ss(t, e) {
  var n;
  return function() {
    return --t > 0 && (n = e.apply(this, arguments)), t <= 1 && (e = null), n;
  };
}
const Jc = Qt(Ss, 2);
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
const Wt = Is(1), _s = Is(-1);
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
const Ts = Es(1, Wt, xs), Xc = Es(-1, _s);
function Me(t, e, n) {
  var r = W(t) ? Wt : Cs, i = r(t, e, n);
  if (i !== void 0 && i !== -1)
    return t[i];
}
function Qc(t, e) {
  return Me(t, ce(e));
}
function lt(t, e, n) {
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
function At(t, e, n) {
  e = q(e, n);
  for (var r = !W(t) && P(t), i = (r || t).length, s = Array(i), a = 0; a < i; a++) {
    var o = r ? r[a] : a;
    s[a] = e(t[o], o, t);
  }
  return s;
}
function Ns(t) {
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
const Sn = Ns(1), vi = Ns(-1);
function Jt(t, e, n) {
  var r = [];
  return e = q(e, n), lt(t, function(i, s, a) {
    e(i, s, a) && r.push(i);
  }), r;
}
function Yc(t, e, n) {
  return Jt(t, sr(q(e)), n);
}
function bi(t, e, n) {
  e = q(e, n);
  for (var r = !W(t) && P(t), i = (r || t).length, s = 0; s < i; s++) {
    var a = r ? r[s] : s;
    if (!e(t[a], a, t))
      return !1;
  }
  return !0;
}
function wi(t, e, n) {
  e = q(e, n);
  for (var r = !W(t) && P(t), i = (r || t).length, s = 0; s < i; s++) {
    var a = r ? r[s] : s;
    if (e(t[a], a, t))
      return !0;
  }
  return !1;
}
function ut(t, e, n, r) {
  return W(t) || (t = Xt(t)), (typeof n != "number" || r) && (n = 0), Ts(t, e, n) >= 0;
}
const jc = z(function(t, e, n) {
  var r, i;
  return L(e) ? i = e : (e = ge(e), r = e.slice(0, -1), e = e[e.length - 1]), At(t, function(s) {
    var a = i;
    if (!a) {
      if (r && r.length && (s = er(s, r)), s == null)
        return;
      a = s[e];
    }
    return a == null ? a : a.apply(s, n);
  });
});
function ar(t, e) {
  return At(t, rr(e));
}
function Zc(t, e) {
  return Jt(t, ce(e));
}
function Ps(t, e, n) {
  var r = -1 / 0, i = -1 / 0, s, a;
  if (e == null || typeof e == "number" && typeof t[0] != "object" && t != null) {
    t = W(t) ? t : Xt(t);
    for (var o = 0, l = t.length; o < l; o++)
      s = t[o], s != null && s > r && (r = s);
  } else
    e = q(e, n), lt(t, function(u, g, h) {
      a = e(u, g, h), (a > i || a === -1 / 0 && r === -1 / 0) && (r = u, i = a);
    });
  return r;
}
function tu(t, e, n) {
  var r = 1 / 0, i = 1 / 0, s, a;
  if (e == null || typeof e == "number" && typeof t[0] != "object" && t != null) {
    t = W(t) ? t : Xt(t);
    for (var o = 0, l = t.length; o < l; o++)
      s = t[o], s != null && s < r && (r = s);
  } else
    e = q(e, n), lt(t, function(u, g, h) {
      a = e(u, g, h), (a < i || a === 1 / 0 && r === 1 / 0) && (r = u, i = a);
    });
  return r;
}
var eu = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
function As(t) {
  return t ? Rt(t) ? fe.call(t) : Jn(t) ? t.match(eu) : W(t) ? At(t, nr) : Xt(t) : [];
}
function Os(t, e, n) {
  if (e == null || n)
    return W(t) || (t = Xt(t)), t[Rn(t.length - 1)];
  var r = As(t), i = K(r);
  e = Math.max(Math.min(e, i), 0);
  for (var s = i - 1, a = 0; a < e; a++) {
    var o = Rn(a, s), l = r[a];
    r[a] = r[o], r[o] = l;
  }
  return r.slice(0, e);
}
function nu(t) {
  return Os(t, 1 / 0);
}
function ru(t, e, n) {
  var r = 0;
  return e = q(e, n), ar(At(t, function(i, s, a) {
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
    return r = q(r, i), lt(n, function(a, o) {
      var l = r(a, o, n);
      t(s, a, l);
    }), s;
  };
}
const iu = je(function(t, e, n) {
  wt(t, n) ? t[n].push(e) : t[n] = [e];
}), su = je(function(t, e, n) {
  t[n] = e;
}), au = je(function(t, e, n) {
  wt(t, n) ? t[n]++ : t[n] = 1;
}), ou = je(function(t, e, n) {
  t[n ? 0 : 1].push(e);
}, !0);
function cu(t) {
  return t == null ? 0 : W(t) ? t.length : P(t).length;
}
function uu(t, e, n) {
  return e in n;
}
const ys = z(function(t, e) {
  var n = {}, r = e[0];
  if (t == null)
    return n;
  L(r) ? (e.length > 1 && (r = de(r, e[1])), e = he(t)) : (r = uu, e = Bt(e, !1, !1), t = Object(t));
  for (var i = 0, s = e.length; i < s; i++) {
    var a = e[i], o = t[a];
    r(o, a, t) && (n[a] = o);
  }
  return n;
}), lu = z(function(t, e) {
  var n = e[0], r;
  return L(n) ? (n = sr(n), e.length > 1 && (r = e[1])) : (e = At(Bt(e, !1, !1), String), n = function(i, s) {
    return !ut(e, s);
  }), ys(t, n, r);
});
function Rs(t, e, n) {
  return fe.call(t, 0, Math.max(0, t.length - (e == null || n ? 1 : e)));
}
function Cn(t, e, n) {
  return t == null || t.length < 1 ? e == null || n ? void 0 : [] : e == null || n ? t[0] : Rs(t, t.length - e);
}
function Le(t, e, n) {
  return fe.call(t, e == null || n ? 1 : e);
}
function fu(t, e, n) {
  return t == null || t.length < 1 ? e == null || n ? void 0 : [] : e == null || n ? t[t.length - 1] : Le(t, Math.max(0, t.length - e));
}
function hu(t) {
  return Jt(t, Boolean);
}
function gu(t, e) {
  return Bt(t, e, !1);
}
const Bs = z(function(t, e) {
  return e = Bt(e, !0, !0), Jt(t, function(n) {
    return !ut(e, n);
  });
}), du = z(function(t, e) {
  return Bs(t, e);
});
function Bn(t, e, n, r) {
  zi(e) || (r = n, n = e, e = !1), n != null && (n = q(n, r));
  for (var i = [], s = [], a = 0, o = K(t); a < o; a++) {
    var l = t[a], u = n ? n(l, a, t) : l;
    e && !n ? ((!a || s !== u) && i.push(l), s = u) : n ? ut(s, u) || (s.push(u), i.push(l)) : ut(i, l) || i.push(l);
  }
  return i;
}
const pu = z(function(t) {
  return Bn(Bt(t, !0, !0));
});
function mu(t) {
  for (var e = [], n = arguments.length, r = 0, i = K(t); r < i; r++) {
    var s = t[r];
    if (!ut(e, s)) {
      var a;
      for (a = 1; a < n && ut(arguments[a], s); a++)
        ;
      a === n && e.push(s);
    }
  }
  return e;
}
function Vn(t) {
  for (var e = t && Ps(t, K).length || 0, n = Array(e), r = 0; r < e; r++)
    n[r] = ar(t, r);
  return n;
}
const vu = z(Vn);
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
function ku(t, e) {
  if (e == null || e < 1)
    return [];
  for (var n = [], r = 0, i = t.length; r < i; )
    n.push(fe.call(t, r, r += e));
  return n;
}
function or(t, e) {
  return t._chain ? k(e).chain() : e;
}
function Vs(t) {
  return lt(yn(t), function(e) {
    var n = k[e] = t[e];
    k.prototype[e] = function() {
      var r = [this._wrapped];
      return zo.apply(r, arguments), or(this, n.apply(k, r));
    };
  }), k;
}
lt(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(t) {
  var e = Ye[t];
  k.prototype[t] = function() {
    var n = this._wrapped;
    return n != null && (e.apply(n, arguments), (t === "shift" || t === "splice") && n.length === 0 && delete n[0]), or(this, n);
  };
});
lt(["concat", "join", "slice"], function(t) {
  var e = Ye[t];
  k.prototype[t] = function() {
    var n = this._wrapped;
    return n != null && (n = e.apply(n, arguments)), or(this, n);
  };
});
const Su = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VERSION: $i,
  restArguments: z,
  isObject: yt,
  isNull: Yo,
  isUndefined: Mi,
  isBoolean: zi,
  isElement: jo,
  isString: Jn,
  isNumber: Ki,
  isDate: Zo,
  isRegExp: tc,
  isError: ec,
  isSymbol: qi,
  isArrayBuffer: Wi,
  isDataView: $e,
  isArray: Rt,
  isFunction: L,
  isArguments: Qn,
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
  values: Xt,
  pairs: bc,
  invert: cs,
  functions: yn,
  methods: yn,
  extend: us,
  extendOwn: De,
  assign: De,
  defaults: ls,
  create: kc,
  clone: Sc,
  tap: Cc,
  get: gs,
  has: Ic,
  mapObject: _c,
  identity: nr,
  constant: ji,
  noop: ps,
  toPath: hs,
  property: rr,
  propertyOf: xc,
  matcher: ce,
  matches: ce,
  times: Ec,
  random: Rn,
  now: ue,
  escape: Tc,
  unescape: Pc,
  templateSettings: Ac,
  template: Vc,
  result: Fc,
  uniqueId: Lc,
  chain: Hc,
  iteratee: ir,
  partial: Qt,
  bind: ws,
  bindAll: $c,
  memoize: Gc,
  delay: ks,
  defer: Dc,
  throttle: Mc,
  debounce: zc,
  wrap: Kc,
  negate: sr,
  compose: qc,
  after: Wc,
  before: Ss,
  once: Jc,
  findKey: Cs,
  findIndex: Wt,
  findLastIndex: _s,
  sortedIndex: xs,
  indexOf: Ts,
  lastIndexOf: Xc,
  find: Me,
  detect: Me,
  findWhere: Qc,
  each: lt,
  forEach: lt,
  map: At,
  collect: At,
  reduce: Sn,
  foldl: Sn,
  inject: Sn,
  reduceRight: vi,
  foldr: vi,
  filter: Jt,
  select: Jt,
  reject: Yc,
  every: bi,
  all: bi,
  some: wi,
  any: wi,
  contains: ut,
  includes: ut,
  include: ut,
  invoke: jc,
  pluck: ar,
  where: Zc,
  max: Ps,
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
  initial: Rs,
  last: fu,
  rest: Le,
  tail: Le,
  drop: Le,
  compact: hu,
  flatten: gu,
  without: du,
  uniq: Bn,
  unique: Bn,
  union: pu,
  intersection: mu,
  difference: Bs,
  unzip: Vn,
  transpose: Vn,
  zip: vu,
  object: bu,
  range: wu,
  chunk: ku,
  mixin: Vs,
  default: k
}, Symbol.toStringTag, { value: "Module" }));
var N = Vs(Su);
N._ = N;
let Ze = (t = 21) => crypto.getRandomValues(new Uint8Array(t)).reduce((e, n) => (n &= 63, n < 36 ? e += n.toString(36) : n < 62 ? e += (n - 26).toString(36).toUpperCase() : n > 62 ? e += "-" : e += "_", e), "");
class Fs {
  instanceIdInternal = Fs.generatePluginIdInternal();
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
class Ah {
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
    return Wt(this.plugins, (n) => n.instanceId === e);
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
var j = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
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
function te(t, e, n, r, i, s) {
  return typeof n == "function" ? s(t, e, n, r === void 0 ? 0 : r | 0, i === void 0 ? t.length - 1 : i | 0) : s(t, e, void 0, n === void 0 ? 0 : n | 0, r === void 0 ? t.length - 1 : r | 0);
}
var _ = {
  ge: function(t, e, n, r, i) {
    return te(t, e, n, r, i, Cu);
  },
  gt: function(t, e, n, r, i) {
    return te(t, e, n, r, i, Iu);
  },
  lt: function(t, e, n, r, i) {
    return te(t, e, n, r, i, _u);
  },
  le: function(t, e, n, r, i) {
    return te(t, e, n, r, i, xu);
  },
  eq: function(t, e, n, r, i) {
    return te(t, e, n, r, i, Eu);
  }
}, Fn = { exports: {} };
(function(t, e) {
  var n = 200, r = "__lodash_hash_undefined__", i = 9007199254740991, s = "[object Arguments]", a = "[object Array]", o = "[object Boolean]", l = "[object Date]", u = "[object Error]", g = "[object Function]", h = "[object GeneratorFunction]", p = "[object Map]", v = "[object Number]", b = "[object Object]", w = "[object Promise]", tt = "[object RegExp]", x = "[object Set]", cn = "[object String]", I = "[object Symbol]", Yt = "[object WeakMap]", be = "[object ArrayBuffer]", we = "[object DataView]", Pr = "[object Float32Array]", Ar = "[object Float64Array]", Or = "[object Int8Array]", yr = "[object Int16Array]", Rr = "[object Int32Array]", Br = "[object Uint8Array]", Vr = "[object Uint8ClampedArray]", Fr = "[object Uint16Array]", Ur = "[object Uint32Array]", wa = /[\\^$.*+?()[\]{}|]/g, ka = /\w*$/, Sa = /^\[object .+?Constructor\]$/, Ca = /^(?:0|[1-9]\d*)$/, C = {};
  C[s] = C[a] = C[be] = C[we] = C[o] = C[l] = C[Pr] = C[Ar] = C[Or] = C[yr] = C[Rr] = C[p] = C[v] = C[b] = C[tt] = C[x] = C[cn] = C[I] = C[Br] = C[Vr] = C[Fr] = C[Ur] = !0, C[u] = C[g] = C[Yt] = !1;
  var Ia = typeof j == "object" && j && j.Object === Object && j, _a = typeof self == "object" && self && self.Object === Object && self, ot = Ia || _a || Function("return this")(), Lr = e && !e.nodeType && e, Hr = Lr && !0 && t && !t.nodeType && t, xa = Hr && Hr.exports === Lr;
  function Ea(c, f) {
    return c.set(f[0], f[1]), c;
  }
  function Ta(c, f) {
    return c.add(f), c;
  }
  function Na(c, f) {
    for (var d = -1, m = c ? c.length : 0; ++d < m && f(c[d], d, c) !== !1; )
      ;
    return c;
  }
  function Pa(c, f) {
    for (var d = -1, m = f.length, O = c.length; ++d < m; )
      c[O + d] = f[d];
    return c;
  }
  function $r(c, f, d, m) {
    var O = -1, R = c ? c.length : 0;
    for (m && R && (d = c[++O]); ++O < R; )
      d = f(d, c[O], O, c);
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
  function Gr(c) {
    var f = !1;
    if (c != null && typeof c.toString != "function")
      try {
        f = !!(c + "");
      } catch {
      }
    return f;
  }
  function Dr(c) {
    var f = -1, d = Array(c.size);
    return c.forEach(function(m, O) {
      d[++f] = [O, m];
    }), d;
  }
  function un(c, f) {
    return function(d) {
      return c(f(d));
    };
  }
  function Mr(c) {
    var f = -1, d = Array(c.size);
    return c.forEach(function(m) {
      d[++f] = m;
    }), d;
  }
  var ya = Array.prototype, Ra = Function.prototype, ke = Object.prototype, ln = ot["__core-js_shared__"], zr = function() {
    var c = /[^.]+$/.exec(ln && ln.keys && ln.keys.IE_PROTO || "");
    return c ? "Symbol(src)_1." + c : "";
  }(), Kr = Ra.toString, ft = ke.hasOwnProperty, Se = ke.toString, Ba = RegExp(
    "^" + Kr.call(ft).replace(wa, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), qr = xa ? ot.Buffer : void 0, Wr = ot.Symbol, Jr = ot.Uint8Array, Va = un(Object.getPrototypeOf, Object), Fa = Object.create, Ua = ke.propertyIsEnumerable, La = ya.splice, Xr = Object.getOwnPropertySymbols, Ha = qr ? qr.isBuffer : void 0, $a = un(Object.keys, Object), fn = Ut(ot, "DataView"), jt = Ut(ot, "Map"), hn = Ut(ot, "Promise"), gn = Ut(ot, "Set"), dn = Ut(ot, "WeakMap"), Zt = Ut(Object, "create"), Ga = Ct(fn), Da = Ct(jt), Ma = Ct(hn), za = Ct(gn), Ka = Ct(dn), Qr = Wr ? Wr.prototype : void 0, Yr = Qr ? Qr.valueOf : void 0;
  function kt(c) {
    var f = -1, d = c ? c.length : 0;
    for (this.clear(); ++f < d; ) {
      var m = c[f];
      this.set(m[0], m[1]);
    }
  }
  function qa() {
    this.__data__ = Zt ? Zt(null) : {};
  }
  function Wa(c) {
    return this.has(c) && delete this.__data__[c];
  }
  function Ja(c) {
    var f = this.__data__;
    if (Zt) {
      var d = f[c];
      return d === r ? void 0 : d;
    }
    return ft.call(f, c) ? f[c] : void 0;
  }
  function Xa(c) {
    var f = this.__data__;
    return Zt ? f[c] !== void 0 : ft.call(f, c);
  }
  function Qa(c, f) {
    var d = this.__data__;
    return d[c] = Zt && f === void 0 ? r : f, this;
  }
  kt.prototype.clear = qa, kt.prototype.delete = Wa, kt.prototype.get = Ja, kt.prototype.has = Xa, kt.prototype.set = Qa;
  function ct(c) {
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
  ct.prototype.clear = Ya, ct.prototype.delete = ja, ct.prototype.get = Za, ct.prototype.has = to, ct.prototype.set = eo;
  function Vt(c) {
    var f = -1, d = c ? c.length : 0;
    for (this.clear(); ++f < d; ) {
      var m = c[f];
      this.set(m[0], m[1]);
    }
  }
  function no() {
    this.__data__ = {
      hash: new kt(),
      map: new (jt || ct)(),
      string: new kt()
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
  Vt.prototype.clear = no, Vt.prototype.delete = ro, Vt.prototype.get = io, Vt.prototype.has = so, Vt.prototype.set = ao;
  function Ft(c) {
    this.__data__ = new ct(c);
  }
  function oo() {
    this.__data__ = new ct();
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
    if (d instanceof ct) {
      var m = d.__data__;
      if (!jt || m.length < n - 1)
        return m.push([c, f]), this;
      d = this.__data__ = new Vt(m);
    }
    return d.set(c, f), this;
  }
  Ft.prototype.clear = oo, Ft.prototype.delete = co, Ft.prototype.get = uo, Ft.prototype.has = lo, Ft.prototype.set = fo;
  function ho(c, f) {
    var d = vn(c) || Uo(c) ? Aa(c.length, String) : [], m = d.length, O = !!m;
    for (var R in c)
      (f || ft.call(c, R)) && !(O && (R == "length" || Ro(R, m))) && d.push(R);
    return d;
  }
  function jr(c, f, d) {
    var m = c[f];
    (!(ft.call(c, f) && ni(m, d)) || d === void 0 && !(f in c)) && (c[f] = d);
  }
  function Ce(c, f) {
    for (var d = c.length; d--; )
      if (ni(c[d][0], f))
        return d;
    return -1;
  }
  function go(c, f) {
    return c && Zr(f, bn(f), c);
  }
  function pn(c, f, d, m, O, R, J) {
    var G;
    if (m && (G = R ? m(c, O, R, J) : m(c)), G !== void 0)
      return G;
    if (!_e(c))
      return c;
    var si = vn(c);
    if (si) {
      if (G = Ao(c), !f)
        return To(c, G);
    } else {
      var Lt = St(c), ai = Lt == g || Lt == h;
      if (Ho(c))
        return ko(c, f);
      if (Lt == b || Lt == s || ai && !R) {
        if (Gr(c))
          return R ? c : {};
        if (G = Oo(ai ? {} : c), !f)
          return No(c, go(G, c));
      } else {
        if (!C[Lt])
          return R ? c : {};
        G = yo(c, Lt, pn, f);
      }
    }
    J || (J = new Ft());
    var oi = J.get(c);
    if (oi)
      return oi;
    if (J.set(c, G), !si)
      var ci = d ? Po(c) : bn(c);
    return Na(ci || c, function(wn, xe) {
      ci && (xe = wn, wn = c[xe]), jr(G, xe, pn(wn, f, d, m, xe, c, J));
    }), G;
  }
  function po(c) {
    return _e(c) ? Fa(c) : {};
  }
  function mo(c, f, d) {
    var m = f(c);
    return vn(c) ? m : Pa(m, d(c));
  }
  function vo(c) {
    return Se.call(c);
  }
  function bo(c) {
    if (!_e(c) || Vo(c))
      return !1;
    var f = ii(c) || Gr(c) ? Ba : Sa;
    return f.test(Ct(c));
  }
  function wo(c) {
    if (!ei(c))
      return $a(c);
    var f = [];
    for (var d in Object(c))
      ft.call(c, d) && d != "constructor" && f.push(d);
    return f;
  }
  function ko(c, f) {
    if (f)
      return c.slice();
    var d = new c.constructor(c.length);
    return c.copy(d), d;
  }
  function mn(c) {
    var f = new c.constructor(c.byteLength);
    return new Jr(f).set(new Jr(c)), f;
  }
  function So(c, f) {
    var d = f ? mn(c.buffer) : c.buffer;
    return new c.constructor(d, c.byteOffset, c.byteLength);
  }
  function Co(c, f, d) {
    var m = f ? d(Dr(c), !0) : Dr(c);
    return $r(m, Ea, new c.constructor());
  }
  function Io(c) {
    var f = new c.constructor(c.source, ka.exec(c));
    return f.lastIndex = c.lastIndex, f;
  }
  function _o(c, f, d) {
    var m = f ? d(Mr(c), !0) : Mr(c);
    return $r(m, Ta, new c.constructor());
  }
  function xo(c) {
    return Yr ? Object(Yr.call(c)) : {};
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
  function Zr(c, f, d, m) {
    d || (d = {});
    for (var O = -1, R = f.length; ++O < R; ) {
      var J = f[O], G = m ? m(d[J], c[J], J, d, c) : void 0;
      jr(d, J, G === void 0 ? c[J] : G);
    }
    return d;
  }
  function No(c, f) {
    return Zr(c, ti(c), f);
  }
  function Po(c) {
    return mo(c, bn, ti);
  }
  function Ie(c, f) {
    var d = c.__data__;
    return Bo(f) ? d[typeof f == "string" ? "string" : "hash"] : d.map;
  }
  function Ut(c, f) {
    var d = Oa(c, f);
    return bo(d) ? d : void 0;
  }
  var ti = Xr ? un(Xr, Object) : Do, St = vo;
  (fn && St(new fn(new ArrayBuffer(1))) != we || jt && St(new jt()) != p || hn && St(hn.resolve()) != w || gn && St(new gn()) != x || dn && St(new dn()) != Yt) && (St = function(c) {
    var f = Se.call(c), d = f == b ? c.constructor : void 0, m = d ? Ct(d) : void 0;
    if (m)
      switch (m) {
        case Ga:
          return we;
        case Da:
          return p;
        case Ma:
          return w;
        case za:
          return x;
        case Ka:
          return Yt;
      }
    return f;
  });
  function Ao(c) {
    var f = c.length, d = c.constructor(f);
    return f && typeof c[0] == "string" && ft.call(c, "index") && (d.index = c.index, d.input = c.input), d;
  }
  function Oo(c) {
    return typeof c.constructor == "function" && !ei(c) ? po(Va(c)) : {};
  }
  function yo(c, f, d, m) {
    var O = c.constructor;
    switch (f) {
      case be:
        return mn(c);
      case o:
      case l:
        return new O(+c);
      case we:
        return So(c, m);
      case Pr:
      case Ar:
      case Or:
      case yr:
      case Rr:
      case Br:
      case Vr:
      case Fr:
      case Ur:
        return Eo(c, m);
      case p:
        return Co(c, m, d);
      case v:
      case cn:
        return new O(c);
      case tt:
        return Io(c);
      case x:
        return _o(c, m, d);
      case I:
        return xo(c);
    }
  }
  function Ro(c, f) {
    return f = f ?? i, !!f && (typeof c == "number" || Ca.test(c)) && c > -1 && c % 1 == 0 && c < f;
  }
  function Bo(c) {
    var f = typeof c;
    return f == "string" || f == "number" || f == "symbol" || f == "boolean" ? c !== "__proto__" : c === null;
  }
  function Vo(c) {
    return !!zr && zr in c;
  }
  function ei(c) {
    var f = c && c.constructor, d = typeof f == "function" && f.prototype || ke;
    return c === d;
  }
  function Ct(c) {
    if (c != null) {
      try {
        return Kr.call(c);
      } catch {
      }
      try {
        return c + "";
      } catch {
      }
    }
    return "";
  }
  function Fo(c) {
    return pn(c, !0, !0);
  }
  function ni(c, f) {
    return c === f || c !== c && f !== f;
  }
  function Uo(c) {
    return Lo(c) && ft.call(c, "callee") && (!Ua.call(c, "callee") || Se.call(c) == s);
  }
  var vn = Array.isArray;
  function ri(c) {
    return c != null && $o(c.length) && !ii(c);
  }
  function Lo(c) {
    return Go(c) && ri(c);
  }
  var Ho = Ha || Mo;
  function ii(c) {
    var f = _e(c) ? Se.call(c) : "";
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
    return ri(c) ? ho(c) : wo(c);
  }
  function Do() {
    return [];
  }
  function Mo() {
    return !1;
  }
  t.exports = Fo;
})(Fn, Fn.exports);
const ki = Fn.exports;
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
function cr(t) {
  if (E(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const r = t[n], i = rt(r) ? Ou(r) : cr(r);
      if (i)
        for (const s in i)
          e[s] = i[s];
    }
    return e;
  } else {
    if (rt(t))
      return t;
    if (M(t))
      return t;
  }
}
const Nu = /;(?![^(]*\))/g, Pu = /:([^]+)/, Au = /\/\*.*?\*\//gs;
function Ou(t) {
  const e = {};
  return t.replace(Au, "").split(Nu).forEach((n) => {
    if (n) {
      const r = n.split(Pu);
      r.length > 1 && (e[r[0].trim()] = r[1].trim());
    }
  }), e;
}
function ur(t) {
  let e = "";
  if (rt(t))
    e = t;
  else if (E(t))
    for (let n = 0; n < t.length; n++) {
      const r = ur(t[n]);
      r && (e += r + " ");
    }
  else if (M(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const st = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {};
process.env.NODE_ENV !== "production" && Object.freeze([]);
const lr = () => {
}, yu = () => !1, Ru = /^on[^a-z]/, Bu = (t) => Ru.test(t), nt = Object.assign, Vu = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, Fu = Object.prototype.hasOwnProperty, T = (t, e) => Fu.call(t, e), E = Array.isArray, Mt = (t) => tn(t) === "[object Map]", Uu = (t) => tn(t) === "[object Set]", H = (t) => typeof t == "function", rt = (t) => typeof t == "string", fr = (t) => typeof t == "symbol", M = (t) => t !== null && typeof t == "object", Lu = (t) => M(t) && H(t.then) && H(t.catch), Hu = Object.prototype.toString, tn = (t) => Hu.call(t), Us = (t) => tn(t).slice(8, -1), $u = (t) => tn(t) === "[object Object]", hr = (t) => rt(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Gu = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, Oh = Gu((t) => t.charAt(0).toUpperCase() + t.slice(1)), ze = (t, e) => !Object.is(t, e), Du = (t, e, n) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Mu = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
};
let Ci;
const zu = () => Ci || (Ci = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ii(t, ...e) {
}
let Ku;
function qu(t, e = Ku) {
  e && e.active && e.effects.push(t);
}
const Un = (t) => {
  const e = new Set(t);
  return e.w = 0, e.n = 0, e;
}, Ls = (t) => (t.w & vt) > 0, Hs = (t) => (t.n & vt) > 0, Wu = ({ deps: t }) => {
  if (t.length)
    for (let e = 0; e < t.length; e++)
      t[e].w |= vt;
}, Ju = (t) => {
  const { deps: e } = t;
  if (e.length) {
    let n = 0;
    for (let r = 0; r < e.length; r++) {
      const i = e[r];
      Ls(i) && !Hs(i) ? i.delete(t) : e[n++] = i, i.w &= ~vt, i.n &= ~vt;
    }
    e.length = n;
  }
}, Ln = /* @__PURE__ */ new WeakMap();
let ne = 0, vt = 1;
const Hn = 30;
let D;
const xt = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), $n = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class Xu {
  constructor(e, n = null, r) {
    this.fn = e, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, qu(this, r);
  }
  run() {
    if (!this.active)
      return this.fn();
    let e = D, n = Et;
    for (; e; ) {
      if (e === this)
        return;
      e = e.parent;
    }
    try {
      return this.parent = D, D = this, Et = !0, vt = 1 << ++ne, ne <= Hn ? Wu(this) : _i(this), this.fn();
    } finally {
      ne <= Hn && Ju(this), vt = 1 << --ne, D = this.parent, Et = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    D === this ? this.deferStop = !0 : this.active && (_i(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function _i(t) {
  const { deps: e } = t;
  if (e.length) {
    for (let n = 0; n < e.length; n++)
      e[n].delete(t);
    e.length = 0;
  }
}
let Et = !0;
const $s = [];
function Gs() {
  $s.push(Et), Et = !1;
}
function Ds() {
  const t = $s.pop();
  Et = t === void 0 ? !0 : t;
}
function Z(t, e, n) {
  if (Et && D) {
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
  ne <= Hn ? Hs(t) || (t.n |= vt, n = !Ls(t)) : n = !t.has(D), n && (t.add(D), D.deps.push(t), process.env.NODE_ENV !== "production" && D.onTrack && D.onTrack(Object.assign({ effect: D }, e)));
}
function bt(t, e, n, r, i, s) {
  const a = Ln.get(t);
  if (!a)
    return;
  let o = [];
  if (e === "clear")
    o = [...a.values()];
  else if (n === "length" && E(t)) {
    const u = Mu(r);
    a.forEach((g, h) => {
      (h === "length" || h >= u) && o.push(g);
    });
  } else
    switch (n !== void 0 && o.push(a.get(n)), e) {
      case "add":
        E(t) ? hr(n) && o.push(a.get("length")) : (o.push(a.get(xt)), Mt(t) && o.push(a.get($n)));
        break;
      case "delete":
        E(t) || (o.push(a.get(xt)), Mt(t) && o.push(a.get($n)));
        break;
      case "set":
        Mt(t) && o.push(a.get(xt));
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
    r.computed && xi(r, e);
  for (const r of n)
    r.computed || xi(r, e);
}
function xi(t, e) {
  (t !== D || t.allowRecurse) && (process.env.NODE_ENV !== "production" && t.onTrigger && t.onTrigger(nt({ effect: t }, e)), t.scheduler ? t.scheduler() : t.run());
}
const Yu = /* @__PURE__ */ Tu("__proto__,__v_isRef,__isVue"), Ms = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(fr)
), ju = /* @__PURE__ */ gr(), Zu = /* @__PURE__ */ gr(!0), tl = /* @__PURE__ */ gr(!0, !0), Ei = /* @__PURE__ */ el();
function el() {
  const t = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    t[e] = function(...n) {
      const r = S(this);
      for (let s = 0, a = this.length; s < a; s++)
        Z(r, "get", s + "");
      const i = r[e](...n);
      return i === -1 || i === !1 ? r[e](...n.map(S)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    t[e] = function(...n) {
      Gs();
      const r = S(this)[e].apply(this, n);
      return Ds(), r;
    };
  }), t;
}
function gr(t = !1, e = !1) {
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
    if (!t && a && T(Ei, i))
      return Reflect.get(Ei, i, s);
    const o = Reflect.get(r, i, s);
    return (fr(i) ? Ms.has(i) : Yu(i)) || (t || Z(r, "get", i), e) ? o : U(o) ? a && hr(i) ? o : o.value : M(o) ? t ? Qs(o) : Xs(o) : o;
  };
}
const nl = /* @__PURE__ */ rl();
function rl(t = !1) {
  return function(n, r, i, s) {
    let a = n[r];
    if (Ot(a) && U(a) && !U(i))
      return !1;
    if (!t && (!Gn(i) && !Ot(i) && (a = S(a), i = S(i)), !E(n) && U(a) && !U(i)))
      return a.value = i, !0;
    const o = E(n) && hr(r) ? Number(r) < n.length : T(n, r), l = Reflect.set(n, r, i, s);
    return n === S(s) && (o ? ze(i, a) && bt(n, "set", r, i, a) : bt(n, "add", r, i)), l;
  };
}
function il(t, e) {
  const n = T(t, e), r = t[e], i = Reflect.deleteProperty(t, e);
  return i && n && bt(t, "delete", e, void 0, r), i;
}
function sl(t, e) {
  const n = Reflect.has(t, e);
  return (!fr(e) || !Ms.has(e)) && Z(t, "has", e), n;
}
function al(t) {
  return Z(t, "iterate", E(t) ? "length" : xt), Reflect.ownKeys(t);
}
const ol = {
  get: ju,
  set: nl,
  deleteProperty: il,
  has: sl,
  ownKeys: al
}, zs = {
  get: Zu,
  set(t, e) {
    return process.env.NODE_ENV !== "production" && Ii(`Set operation on key "${String(e)}" failed: target is readonly.`, t), !0;
  },
  deleteProperty(t, e) {
    return process.env.NODE_ENV !== "production" && Ii(`Delete operation on key "${String(e)}" failed: target is readonly.`, t), !0;
  }
}, cl = /* @__PURE__ */ nt({}, zs, {
  get: tl
}), dr = (t) => t, en = (t) => Reflect.getPrototypeOf(t);
function Ne(t, e, n = !1, r = !1) {
  t = t.__v_raw;
  const i = S(t), s = S(e);
  n || (e !== s && Z(i, "get", e), Z(i, "get", s));
  const { has: a } = en(i), o = r ? dr : n ? br : vr;
  if (a.call(i, e))
    return o(t.get(e));
  if (a.call(i, s))
    return o(t.get(s));
  t !== i && t.get(e);
}
function Pe(t, e = !1) {
  const n = this.__v_raw, r = S(n), i = S(t);
  return e || (t !== i && Z(r, "has", t), Z(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
}
function Ae(t, e = !1) {
  return t = t.__v_raw, !e && Z(S(t), "iterate", xt), Reflect.get(t, "size", t);
}
function Ti(t) {
  t = S(t);
  const e = S(this);
  return en(e).has.call(e, t) || (e.add(t), bt(e, "add", t, t)), this;
}
function Ni(t, e) {
  e = S(e);
  const n = S(this), { has: r, get: i } = en(n);
  let s = r.call(n, t);
  s ? process.env.NODE_ENV !== "production" && Ks(n, r, t) : (t = S(t), s = r.call(n, t));
  const a = i.call(n, t);
  return n.set(t, e), s ? ze(e, a) && bt(n, "set", t, e, a) : bt(n, "add", t, e), this;
}
function Pi(t) {
  const e = S(this), { has: n, get: r } = en(e);
  let i = n.call(e, t);
  i ? process.env.NODE_ENV !== "production" && Ks(e, n, t) : (t = S(t), i = n.call(e, t));
  const s = r ? r.call(e, t) : void 0, a = e.delete(t);
  return i && bt(e, "delete", t, void 0, s), a;
}
function Ai() {
  const t = S(this), e = t.size !== 0, n = process.env.NODE_ENV !== "production" ? Mt(t) ? new Map(t) : new Set(t) : void 0, r = t.clear();
  return e && bt(t, "clear", void 0, void 0, n), r;
}
function Oe(t, e) {
  return function(r, i) {
    const s = this, a = s.__v_raw, o = S(a), l = e ? dr : t ? br : vr;
    return !t && Z(o, "iterate", xt), a.forEach((u, g) => r.call(i, l(u), l(g), s));
  };
}
function ye(t, e, n) {
  return function(...r) {
    const i = this.__v_raw, s = S(i), a = Mt(s), o = t === "entries" || t === Symbol.iterator && a, l = t === "keys" && a, u = i[t](...r), g = n ? dr : e ? br : vr;
    return !e && Z(s, "iterate", l ? $n : xt), {
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
function ht(t) {
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
      return Ne(this, s);
    },
    get size() {
      return Ae(this);
    },
    has: Pe,
    add: Ti,
    set: Ni,
    delete: Pi,
    clear: Ai,
    forEach: Oe(!1, !1)
  }, e = {
    get(s) {
      return Ne(this, s, !1, !0);
    },
    get size() {
      return Ae(this);
    },
    has: Pe,
    add: Ti,
    set: Ni,
    delete: Pi,
    clear: Ai,
    forEach: Oe(!1, !0)
  }, n = {
    get(s) {
      return Ne(this, s, !0);
    },
    get size() {
      return Ae(this, !0);
    },
    has(s) {
      return Pe.call(this, s, !0);
    },
    add: ht("add"),
    set: ht("set"),
    delete: ht("delete"),
    clear: ht("clear"),
    forEach: Oe(!0, !1)
  }, r = {
    get(s) {
      return Ne(this, s, !0, !0);
    },
    get size() {
      return Ae(this, !0);
    },
    has(s) {
      return Pe.call(this, s, !0);
    },
    add: ht("add"),
    set: ht("set"),
    delete: ht("delete"),
    clear: ht("clear"),
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
function pr(t, e) {
  const n = e ? t ? gl : hl : t ? fl : ll;
  return (r, i, s) => i === "__v_isReactive" ? !t : i === "__v_isReadonly" ? t : i === "__v_raw" ? r : Reflect.get(T(n, i) && i in r ? n : r, i, s);
}
const dl = {
  get: /* @__PURE__ */ pr(!1, !1)
}, pl = {
  get: /* @__PURE__ */ pr(!0, !1)
}, ml = {
  get: /* @__PURE__ */ pr(!0, !0)
};
function Ks(t, e, n) {
  const r = S(n);
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
  return Ot(t) ? t : mr(t, !1, ol, dl, qs);
}
function Qs(t) {
  return mr(t, !0, zs, pl, Ws);
}
function Re(t) {
  return mr(t, !0, cl, ml, Js);
}
function mr(t, e, n, r, i) {
  if (!M(t))
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
function Tt(t) {
  return Ot(t) ? Tt(t.__v_raw) : !!(t && t.__v_isReactive);
}
function Ot(t) {
  return !!(t && t.__v_isReadonly);
}
function Gn(t) {
  return !!(t && t.__v_isShallow);
}
function Ke(t) {
  return Tt(t) || Ot(t);
}
function S(t) {
  const e = t && t.__v_raw;
  return e ? S(e) : t;
}
function kl(t) {
  return Du(t, "__v_skip", !0), t;
}
const vr = (t) => M(t) ? Xs(t) : t, br = (t) => M(t) ? Qs(t) : t;
function U(t) {
  return !!(t && t.__v_isRef === !0);
}
function Sl(t) {
  return U(t) ? t.value : t;
}
const Cl = {
  get: (t, e, n) => Sl(Reflect.get(t, e, n)),
  set: (t, e, n, r) => {
    const i = t[e];
    return U(i) && !U(n) ? (i.value = n, !0) : Reflect.set(t, e, n, r);
  }
};
function Il(t) {
  return Tt(t) ? t : new Proxy(t, Cl);
}
const Nt = [];
function _l(t) {
  Nt.push(t);
}
function xl() {
  Nt.pop();
}
function F(t, ...e) {
  if (process.env.NODE_ENV === "production")
    return;
  Gs();
  const n = Nt.length ? Nt[Nt.length - 1].component : null, r = n && n.appContext.config.warnHandler, i = El();
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
  let t = Nt[Nt.length - 1];
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
`], ...Nl(n));
  }), e;
}
function Nl({ vnode: t, recurseCount: e }) {
  const n = e > 0 ? `... (${e} recursive calls)` : "", r = t.component ? t.component.parent == null : !1, i = ` at <${fa(t.component, t.type, r)}`, s = ">" + n;
  return t.props ? [i, ...Pl(t.props), s] : [i + s];
}
function Pl(t) {
  const e = [], n = Object.keys(t);
  return n.slice(0, 3).forEach((r) => {
    e.push(...Ys(r, t[r]));
  }), n.length > 3 && e.push(" ..."), e;
}
function Ys(t, e, n) {
  return rt(e) ? (e = JSON.stringify(e), n ? e : [`${t}=${e}`]) : typeof e == "number" || typeof e == "boolean" || e == null ? n ? e : [`${t}=${e}`] : U(e) ? (e = Ys(t, S(e.value), !0), n ? e : [`${t}=Ref<`, e, ">"]) : H(e) ? [`${t}=fn${e.name ? `<${e.name}>` : ""}`] : (e = S(e), n ? e : [`${t}=`, e]);
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
    if (n && _l(n), F(`Unhandled error${i ? ` during execution of ${i}` : ""}`), n && xl(), r)
      throw t;
  }
}
let qe = !1, Mn = !1;
const et = [];
let dt = 0;
const zt = [];
let it = null, gt = 0;
const ta = /* @__PURE__ */ Promise.resolve();
let wr = null;
const Ol = 100;
function yl(t) {
  const e = wr || ta;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function Rl(t) {
  let e = dt + 1, n = et.length;
  for (; e < n; ) {
    const r = e + n >>> 1;
    le(et[r]) < t ? e = r + 1 : n = r;
  }
  return e;
}
function kr(t) {
  (!et.length || !et.includes(t, qe && t.allowRecurse ? dt + 1 : dt)) && (t.id == null ? et.push(t) : et.splice(Rl(t.id), 0, t), ea());
}
function ea() {
  !qe && !Mn && (Mn = !0, wr = ta.then(ra));
}
function na(t) {
  E(t) ? zt.push(...t) : (!it || !it.includes(t, t.allowRecurse ? gt + 1 : gt)) && zt.push(t), ea();
}
function Bl(t) {
  if (zt.length) {
    const e = [...new Set(zt)];
    if (zt.length = 0, it) {
      it.push(...e);
      return;
    }
    for (it = e, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), it.sort((n, r) => le(n) - le(r)), gt = 0; gt < it.length; gt++)
      process.env.NODE_ENV !== "production" && ia(t, it[gt]) || it[gt]();
    it = null, gt = 0;
  }
}
const le = (t) => t.id == null ? 1 / 0 : t.id, Vl = (t, e) => {
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
  Mn = !1, qe = !0, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), et.sort(Vl);
  const e = process.env.NODE_ENV !== "production" ? (n) => ia(t, n) : lr;
  try {
    for (dt = 0; dt < et.length; dt++) {
      const n = et[dt];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && e(n))
          continue;
        Pt(n, null, 14);
      }
    }
  } finally {
    dt = 0, et.length = 0, Bl(t), qe = !1, wr = null, (et.length || zt.length) && ra(t);
  }
}
function ia(t, e) {
  if (!t.has(e))
    t.set(e, 1);
  else {
    const n = t.get(e);
    if (n > Ol) {
      const r = e.ownerInstance, i = r && la(r.type);
      return F(`Maximum recursive updates exceeded${i ? ` in component <${i}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`), !0;
    } else
      t.set(e, n + 1);
  }
}
const ee = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (zu().__VUE_HMR_RUNTIME__ = {
  createRecord: In(Fl),
  rerender: In(Ul),
  reload: In(Ll)
});
const We = /* @__PURE__ */ new Map();
function Fl(t, e) {
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
  e = ie(e), Oi(n.initialDef, e);
  const r = [...n.instances];
  for (const i of r) {
    const s = ie(i.type);
    ee.has(s) || (s !== n.initialDef && Oi(s, e), ee.add(s)), i.appContext.optionsCache.delete(i.type), i.ceReload ? (ee.add(s), i.ceReload(e.styles), ee.delete(s)) : i.parent ? kr(i.parent.update) : i.appContext.reload ? i.appContext.reload() : typeof window < "u" && window.location.reload();
  }
  na(() => {
    for (const i of r)
      ee.delete(ie(i.type));
  });
}
function Oi(t, e) {
  nt(t, e);
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
let pt = null, Hl = null;
const $l = (t) => t.__isSuspense;
function Gl(t, e) {
  e && e.pendingBranch ? E(t) ? e.effects.push(...t) : e.effects.push(t) : na(t);
}
const Be = {};
function Dl(t, e, { immediate: n, deep: r, flush: i, onTrack: s, onTrigger: a } = st) {
  process.env.NODE_ENV !== "production" && !e && (n !== void 0 && F('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), r !== void 0 && F('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const o = (I) => {
    F("Invalid watch source: ", I, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, l = Kt;
  let u, g = !1, h = !1;
  if (U(t) ? (u = () => t.value, g = Gn(t)) : Tt(t) ? (u = () => t, r = !0) : E(t) ? (h = !0, g = t.some((I) => Tt(I) || Gn(I)), u = () => t.map((I) => {
    if (U(I))
      return I.value;
    if (Tt(I))
      return Gt(I);
    if (H(I))
      return Pt(I, l, 2);
    process.env.NODE_ENV !== "production" && o(I);
  })) : H(t) ? e ? u = () => Pt(t, l, 2) : u = () => {
    if (!(l && l.isUnmounted))
      return p && p(), Dn(t, l, 3, [v]);
  } : (u = lr, process.env.NODE_ENV !== "production" && o(t)), e && r) {
    const I = u;
    u = () => Gt(I());
  }
  let p, v = (I) => {
    p = x.onStop = () => {
      Pt(I, l, 4);
    };
  }, b = h ? new Array(t.length).fill(Be) : Be;
  const w = () => {
    if (!!x.active)
      if (e) {
        const I = x.run();
        (r || g || (h ? I.some((Yt, be) => ze(Yt, b[be])) : ze(I, b))) && (p && p(), Dn(e, l, 3, [
          I,
          b === Be ? void 0 : h && b[0] === Be ? [] : b,
          v
        ]), b = I);
      } else
        x.run();
  };
  w.allowRecurse = !!e;
  let tt;
  i === "sync" ? tt = w : i === "post" ? tt = () => Bi(w, l && l.suspense) : (w.pre = !0, l && (w.id = l.uid), tt = () => kr(w));
  const x = new Xu(u, tt);
  return process.env.NODE_ENV !== "production" && (x.onTrack = s, x.onTrigger = a), e ? n ? w() : b = x.run() : i === "post" ? Bi(x.run.bind(x), l && l.suspense) : x.run(), () => {
    x.stop(), l && l.scope && Vu(l.scope.effects, x);
  };
}
function Ml(t, e, n) {
  const r = this.proxy, i = rt(t) ? t.includes(".") ? zl(r, t) : () => r[t] : t.bind(r, r);
  let s;
  H(e) ? s = e : (s = e.handler, n = e);
  const a = Kt;
  Vi(this);
  const o = Dl(i, s.bind(r), n);
  return a ? Vi(a) : ff(), o;
}
function zl(t, e) {
  const n = e.split(".");
  return () => {
    let r = t;
    for (let i = 0; i < n.length && r; i++)
      r = r[n[i]];
    return r;
  };
}
function Gt(t, e) {
  if (!M(t) || t.__v_skip || (e = e || /* @__PURE__ */ new Set(), e.has(t)))
    return t;
  if (e.add(t), U(t))
    Gt(t.value, e);
  else if (E(t))
    for (let n = 0; n < t.length; n++)
      Gt(t[n], e);
  else if (Uu(t) || Mt(t))
    t.forEach((n) => {
      Gt(n, e);
    });
  else if ($u(t))
    for (const n in t)
      Gt(t[n], e);
  return t;
}
const Kl = Symbol(), zn = (t) => t ? hf(t) ? gf(t) || t.proxy : zn(t.parent) : null, se = /* @__PURE__ */ nt(/* @__PURE__ */ Object.create(null), {
  $: (t) => t,
  $el: (t) => t.vnode.el,
  $data: (t) => t.data,
  $props: (t) => process.env.NODE_ENV !== "production" ? Re(t.props) : t.props,
  $attrs: (t) => process.env.NODE_ENV !== "production" ? Re(t.attrs) : t.attrs,
  $slots: (t) => process.env.NODE_ENV !== "production" ? Re(t.slots) : t.slots,
  $refs: (t) => process.env.NODE_ENV !== "production" ? Re(t.refs) : t.refs,
  $parent: (t) => zn(t.parent),
  $root: (t) => zn(t.root),
  $emit: (t) => t.emit,
  $options: (t) => __VUE_OPTIONS_API__ ? Xl(t) : t.type,
  $forceUpdate: (t) => t.f || (t.f = () => kr(t.update)),
  $nextTick: (t) => t.n || (t.n = yl.bind(t.proxy)),
  $watch: (t) => __VUE_OPTIONS_API__ ? Ml.bind(t) : lr
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
      return e === "$attrs" && (Z(t, "get", e), process.env.NODE_ENV !== "production" && void 0), g(t);
    if ((h = o.__cssModules) && (h = h[e]))
      return h;
    if (n !== st && T(n, e))
      return a[e] = 4, n[e];
    if (p = l.config.globalProperties, T(p, e))
      return p[e];
    process.env.NODE_ENV !== "production" && pt && (!rt(e) || e.indexOf("__v") !== 0) && (i !== st && ql(e[0]) && T(i, e) ? F(`Property ${JSON.stringify(e)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : t === pt && F(`Property ${JSON.stringify(e)} was accessed during render but is not defined on instance.`));
  },
  set({ _: t }, e, n) {
    const { data: r, setupState: i, ctx: s } = t;
    return _n(i, e) ? (i[e] = n, !0) : process.env.NODE_ENV !== "production" && i.__isScriptSetup && T(i, e) ? (F(`Cannot mutate <script setup> binding "${e}" from Options API.`), !1) : r !== st && T(r, e) ? (r[e] = n, !0) : T(t.props, e) ? (process.env.NODE_ENV !== "production" && F(`Attempting to mutate prop "${e}". Props are readonly.`), !1) : e[0] === "$" && e.slice(1) in t ? (process.env.NODE_ENV !== "production" && F(`Attempting to mutate public property "${e}". Properties starting with $ are reserved and readonly.`), !1) : (process.env.NODE_ENV !== "production" && e in t.appContext.config.globalProperties ? Object.defineProperty(s, e, {
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
process.env.NODE_ENV !== "production" && (Wl.ownKeys = (t) => (F("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(t)));
let Jl = !0;
function Xl(t) {
  const e = t.type, { mixins: n, extends: r } = e, { mixins: i, optionsCache: s, config: { optionMergeStrategies: a } } = t.appContext, o = s.get(e);
  let l;
  return o ? l = o : !i.length && !n && !r ? l = e : (l = {}, i.length && i.forEach((u) => Je(l, u, a, !0)), Je(l, e, a)), M(e) && s.set(e, l), l;
}
function Je(t, e, n, r = !1) {
  const { mixins: i, extends: s } = e;
  s && Je(t, s, n, !0), i && i.forEach((a) => Je(t, a, n, !0));
  for (const a in e)
    if (r && a === "expose")
      process.env.NODE_ENV !== "production" && F('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const o = Ql[a] || n && n[a];
      t[a] = o ? o(t[a], e[a]) : e[a];
    }
  return t;
}
const Ql = {
  data: yi,
  props: _t,
  emits: _t,
  methods: _t,
  computed: _t,
  beforeCreate: B,
  created: B,
  beforeMount: B,
  mounted: B,
  beforeUpdate: B,
  updated: B,
  beforeDestroy: B,
  beforeUnmount: B,
  destroyed: B,
  unmounted: B,
  activated: B,
  deactivated: B,
  errorCaptured: B,
  serverPrefetch: B,
  components: _t,
  directives: _t,
  watch: jl,
  provide: yi,
  inject: Yl
};
function yi(t, e) {
  return e ? t ? function() {
    return nt(H(t) ? t.call(this, this) : t, H(e) ? e.call(this, this) : e);
  } : e : t;
}
function Yl(t, e) {
  return _t(Ri(t), Ri(e));
}
function Ri(t) {
  if (E(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++)
      e[t[n]] = t[n];
    return e;
  }
  return t;
}
function B(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function _t(t, e) {
  return t ? nt(nt(/* @__PURE__ */ Object.create(null), t), e) : e;
}
function jl(t, e) {
  if (!t)
    return e;
  if (!e)
    return t;
  const n = nt(/* @__PURE__ */ Object.create(null), t);
  for (const r in e)
    n[r] = B(t[r], e[r]);
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
const Bi = Gl, tf = (t) => t.__isTeleport, sa = Symbol(process.env.NODE_ENV !== "production" ? "Fragment" : void 0), ef = Symbol(process.env.NODE_ENV !== "production" ? "Text" : void 0), nf = Symbol(process.env.NODE_ENV !== "production" ? "Comment" : void 0);
Symbol(process.env.NODE_ENV !== "production" ? "Static" : void 0);
let Dt = null;
function rf(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
const sf = (...t) => ca(...t), aa = "__vInternal", oa = ({ key: t }) => t ?? null, He = ({ ref: t, ref_key: e, ref_for: n }) => t != null ? rt(t) || U(t) || H(t) ? { i: pt, r: t, k: e, f: !!n } : t : null;
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
    ctx: pt
  };
  return o ? (Sr(l, n), s & 128 && t.normalize(l)) : n && (l.shapeFlag |= rt(n) ? 8 : 16), process.env.NODE_ENV !== "production" && l.key !== l.key && F("VNode created with invalid key (NaN). VNode type:", l.type), !a && Dt && (l.patchFlag > 0 || s & 6) && l.patchFlag !== 32 && Dt.push(l), l;
}
const of = process.env.NODE_ENV !== "production" ? sf : ca;
function ca(t, e = null, n = null, r = 0, i = null, s = !1) {
  if ((!t || t === Kl) && (process.env.NODE_ENV !== "production" && !t && F(`Invalid vnode type when creating vnode: ${t}.`), t = nf), rf(t)) {
    const o = Xe(t, e, !0);
    return n && Sr(o, n), !s && Dt && (o.shapeFlag & 6 ? Dt[Dt.indexOf(t)] = o : Dt.push(o)), o.patchFlag |= -2, o;
  }
  if (ha(t) && (t = t.__vccOpts), e) {
    e = cf(e);
    let { class: o, style: l } = e;
    o && !rt(o) && (e.class = ur(o)), M(l) && (Ke(l) && !E(l) && (l = nt({}, l)), e.style = cr(l));
  }
  const a = rt(t) ? 1 : $l(t) ? 128 : tf(t) ? 64 : M(t) ? 4 : H(t) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && a & 4 && Ke(t) && (t = S(t), F("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `
Component that was made reactive: `, t)), af(t, e, n, r, i, a, s, !0);
}
function cf(t) {
  return t ? Ke(t) || aa in t ? nt({}, t) : t : null;
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
      !i && !(aa in e) ? e._ctx = pt : i === 3 && pt && (pt.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else
    H(e) ? (e = { default: e, _ctx: pt }, n = 32) : (e = String(e), r & 64 ? (n = 16, e = [uf(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function lf(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    for (const i in r)
      if (i === "class")
        e.class !== r.class && (e.class = ur([e.class, r.class]));
      else if (i === "style")
        e.style = cr([e.style, r.style]);
      else if (Bu(i)) {
        const s = e[i], a = r[i];
        a && s !== a && !(E(s) && s.includes(a)) && (e[i] = s ? [].concat(s, a) : a);
      } else
        i !== "" && (e[i] = r[i]);
  }
  return e;
}
Zl();
let Kt = null;
const Vi = (t) => {
  Kt = t, t.scope.on();
}, ff = () => {
  Kt && Kt.scope.off(), Kt = null;
};
function hf(t) {
  return t.vnode.shapeFlag & 4;
}
function gf(t) {
  if (t.exposed)
    return t.exposeProxy || (t.exposeProxy = new Proxy(Il(kl(t.exposed)), {
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
      return M(h) ? h.__isVue ? ["div", t, "VueInstance"] : U(h) ? [
        "div",
        {},
        ["span", t, g(h)],
        "<",
        o(h.value),
        ">"
      ] : Tt(h) ? [
        "div",
        {},
        ["span", t, xn(h) ? "ShallowReactive" : "Reactive"],
        "<",
        o(h),
        `>${Ot(h) ? " (readonly)" : ""}`
      ] : Ot(h) ? [
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
    h.type.props && h.props && p.push(a("props", S(h.props))), h.setupState !== st && p.push(a("setup", h.setupState)), h.data !== st && p.push(a("data", S(h.data)));
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
    return p = nt({}, p), Object.keys(p).length ? [
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
    return typeof h == "number" ? ["span", e, h] : typeof h == "string" ? ["span", n, JSON.stringify(h)] : typeof h == "boolean" ? ["span", r, h] : M(h) ? ["object", { object: p ? S(h) : h }] : ["span", n, String(h)];
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
    if (E(b) && b.includes(p) || M(b) && p in b || h.extends && u(h.extends, p, v) || h.mixins && h.mixins.some((w) => u(w, p, v)))
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
function yh(t) {
  const e = Math.floor(t / 12) - 2;
  return bf(t) + e.toString();
}
const wf = /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i, kf = {
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
function Rh(t) {
  const e = wf.exec(t);
  if (!e)
    return -1;
  const n = e[1], r = e[2];
  return kf[n.toLowerCase()] + (parseInt(r, 10) + 2) * 12;
}
function Fi(t, e, n, r) {
  return `${t} // ${e} // ${n} // ${r}`;
}
function Sf(t, e, n) {
  return `${t} // ${e} // ${n}`;
}
function Bh(t) {
  const e = Qe(t);
  return Sf(
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
  if (N.keys(n).length !== N.keys(r).length)
    return !1;
  for (const i of N.keys(n))
    if (i !== "pluginVersion" && n[i] !== r[i])
      return !1;
  return !0;
}
class Vh {
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
function Fh(t) {
  return t <= 0 ? -100 : 20 * Math.log10(t);
}
function Uh(t) {
  return t > 0 ? 20 * Math.log(t) + 6 : -100;
}
function Lh(t) {
  return t > 0 ? Math.pow(10, (20 * Math.log(t) + 6) * (1 / 20)) : 0;
}
function Hh(t) {
  return t > 0 ? Math.exp((20 * Math.log10(t) - 6) * (1 / 20)) : 0;
}
function $h(t, e, n, r, i) {
  return (t - e) / (n - e) * (i - r) + r;
}
function Gh(t) {
  return 440 * Math.pow(2, (t - 69) / 12);
}
function Dh(t) {
  return Ke(t) || U(t) ? S(t) : t;
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
class mt {
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
    if (!mt.isValidPitch(e))
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
    return mt.isNoteRangeValid(this.startTick, this.endTick);
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
    this.pitch = this.pitch + e, mt.isValidPitch(this.pitch) || this.deleteFromParent();
  }
  getId() {
    return this.idInternal;
  }
}
var re = /* @__PURE__ */ ((t) => (t[t.MIDI_CLIP = 1] = "MIDI_CLIP", t[t.AUDIO_CLIP = 2] = "AUDIO_CLIP", t))(re || {});
class Y {
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
    id: i = Y.generateClipIdInternal(),
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
      }, r = N.isNumber(r) ? Math.max(r, o.startTick) : o.startTick;
      const l = this.getAudioEndTick();
      (!N.isNumber(a) || l < a) && (a = l), this.clipStartTick = r, this.clipEndTick = a;
    } else if (n === 1) {
      if (this.clipStartTick = r, !N.isNumber(a))
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
    return Y.getNotesInRange(this.notes, this.clipStartTick, this.clipEndTick);
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
    if (this.type !== 1 || !mt.isValidPitch(e) || !mt.isNoteRangeValid(r, i) || !mt.isNoteVelocityValid(n))
      return null;
    const o = new mt({
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
      N.isNumber(r) && (e = Math.min(e, r));
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
    if (!N.isNumber(e))
      return;
    const n = this.song.tickToSeconds(this.audioClipData.startTick);
    return this.song.secondsToTick(n + e);
  }
  static getNotesInRange(e, n, r) {
    return Y.getNotesInRangeImpl(
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
    for (; e[o] && !Y.isNoteInClip(
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
    for (; e[l] && !Y.isNoteInClip(
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
    if (!Y.isNoteInClip(e, n, r, i))
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
            }), l = Y.getNotesInRange(this.notes, s, a);
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
class Q {
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
    return Q.areAutomationTargetsEqual(
      this.getType(),
      e.getType(),
      this.getPluginInstanceId(),
      e.getPluginInstanceId(),
      this.getParamId(),
      e.getParamId()
    );
  }
  clone() {
    return new Q(this.type, this.pluginInstanceId, this.paramId);
  }
  toTfAutomationTargetId() {
    return Q.encodeAutomationTarget(this.type, this.pluginInstanceId, this.paramId);
  }
  static fromTfAutomationTargetId(e) {
    return Q.decodeAutomationTarget(e);
  }
  static encodeAutomationTarget(e, n, r) {
    return e === 3 ? `${e}^^${n}^^${r}` : `${e}`;
  }
  static decodeAutomationTarget(e) {
    const n = e.split("^^");
    if (n.length === 0)
      throw new Error(`Invalid automation target id: ${e}`);
    const r = Number(n[0]);
    return n.length > 2 ? new Q(r, n[1], n[2]) : new Q(r);
  }
  static areAutomationTargetsEqual(e, n, r, i, s, a) {
    return Q.encodeAutomationTarget(e, r, s) === Q.encodeAutomationTarget(n, i, a);
  }
}
class qt {
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
    return qt.getPointsInRangeImpl(this.points, e, n);
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
    return qt.orderedInsertPointInternal(this.points, i, r), i;
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
    const e = new qt();
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
class Cr {
  targets = [];
  targetValues = {};
  getAutomationTargets() {
    return this.targets;
  }
  getAutomationTargetValues() {
    return this.targetValues;
  }
  getOrCreateAutomationValueById(e) {
    return this.targetValues[e] || (this.targetValues[e] = new qt()), this.targetValues[e];
  }
  getAutomationValueById(e) {
    return this.targetValues[e];
  }
  getAutomationValueByTarget(e) {
    const n = e.toTfAutomationTargetId();
    return this.getAutomationValueById(n);
  }
  addAutomation(e, n = 0) {
    N.isNumber(n) || (n = 0), this.targets.splice(n, 0, e);
    const r = e.toTfAutomationTargetId();
    this.getAutomationValueById(r) || (this.targetValues[r] = new qt());
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
    for (const n of N.keys(this.targetValues)) {
      const r = Q.decodeAutomationTarget(n);
      r.getPluginInstanceId() === e && this.removeAutomation(r);
    }
  }
  removeAllPointsWithinRange(e, n) {
    for (const r of N.keys(this.targetValues))
      this.targetValues[r].removePointsInRange(e, n);
  }
  moveAllPointsWithinRange(e, n, r, i) {
    for (const s of N.keys(this.targetValues))
      this.targetValues[s].movePointsInRange(
        e,
        n,
        r,
        i,
        !1
      );
  }
  clone() {
    const e = new Cr();
    for (const n of this.targets)
      e.addAutomation(n.clone());
    for (const n of N.keys(this.targetValues)) {
      const r = this.targetValues[n];
      e.targetValues[n] = r.clone();
    }
    return e;
  }
}
var $t = /* @__PURE__ */ ((t) => (t[t.MIDI_TRACK = 1] = "MIDI_TRACK", t[t.AUDIO_TRACK = 2] = "AUDIO_TRACK", t[t.MASTER_TRACK = 3] = "MASTER_TRACK", t[t.AUX_TRACK = 4] = "AUX_TRACK", t))($t || {});
class at {
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
  audioPlugins = [];
  song;
  automation;
  type;
  auxTrackData;
  sends = [];
  constructor({
    type: e,
    song: n,
    uuid: r = at.generateTrackIdInternal(),
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
    })), e === 4 && (this.auxTrackData = new Tf(), this.auxTrackData.setInputBusRank(1)), this.clips = [...i], this.suggestedInstruments = [...a], this.uuid = r, this.volume = o, this.solo = l, this.muted = u, this.rank = g, this.pan = h, this.automation = new Cr();
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
    if (e > at.MAX_NUM_EFFECTS_PLUGINS - 1)
      throw new Error(
        `The maximum number of effects plugin per track is ${at.MAX_NUM_EFFECTS_PLUGINS}`
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
    if (!N.isNumber(e))
      throw new Error("clipStartTick must be specified when creating a clip.");
    const i = n ?? e + 1;
    if (i < e)
      throw new Error(
        `clipEndTick must be greater or equal to clipStartTick, got clipStartTick: ${e}, clipEndTick: ${n}`
      );
    const s = new Y({
      id: Y.generateClipIdInternal(),
      type: re.MIDI_CLIP,
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
    if (!N.isNumber(e))
      throw new Error("clipStartTick must be specified when creating a clip.");
    const s = new Y({
      id: Y.generateClipIdInternal(),
      type: re.AUDIO_CLIP,
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
    if (e.getType() === re.MIDI_CLIP) {
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
      if (e.getType() === re.AUDIO_CLIP)
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
    return this.automation.getAutomationTargets().length > 0 && !N.isEmpty(this.automation.getAutomationTargetValues());
  }
  getAuxTrackData() {
    return this.auxTrackData;
  }
  getSendCount() {
    return N.keys(this.sends).length;
  }
  getSendAt(e) {
    return this.sends[e];
  }
  removeSendAt(e) {
    delete this.sends[e];
  }
  setSendAt(e, n) {
    if (e >= at.MAX_NUM_SENDS)
      throw new Error(`Maximum of supported sends is ${at.MAX_NUM_SENDS}`);
    if (this.type === 3)
      throw new Error("Cannot add send for master track");
    this.sends[e] = n;
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
var Ef = /* @__PURE__ */ ((t) => (t[t.Undefined = 0] = "Undefined", t[t.PreFader = 1] = "PreFader", t[t.PostFader = 2] = "PostFader", t))(Ef || {});
class qn {
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
    this.outputBusRank = e, this.gainLevel = qn.checkGainLevel(n), this.position = r, this.muted = N.isBoolean(i) ? i : !1;
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
    this.gainLevel = qn.checkGainLevel(e);
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
class Tf {
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
var Nf = /* @__PURE__ */ ((t) => (t[t.AcousticGrandPiano = 0] = "AcousticGrandPiano", t[t.BrightAcousticPiano = 1] = "BrightAcousticPiano", t[t.ElectricGrandPiano = 2] = "ElectricGrandPiano", t[t.HonkyTonkPiano = 3] = "HonkyTonkPiano", t[t.ElectricPiano1 = 4] = "ElectricPiano1", t[t.ElectricPiano2 = 5] = "ElectricPiano2", t[t.Harpsichord = 6] = "Harpsichord", t[t.Clavinet = 7] = "Clavinet", t[t.Celesta = 8] = "Celesta", t[t.Glockenspiel = 9] = "Glockenspiel", t[t.Musicalbox = 10] = "Musicalbox", t[t.Vibraphone = 11] = "Vibraphone", t[t.Marimba = 12] = "Marimba", t[t.Xylophone = 13] = "Xylophone", t[t.TubularBell = 14] = "TubularBell", t[t.Dulcimer = 15] = "Dulcimer", t[t.DrawbarOrgan = 16] = "DrawbarOrgan", t[t.PercussiveOrgan = 17] = "PercussiveOrgan", t[t.RockOrgan = 18] = "RockOrgan", t[t.Churchorgan = 19] = "Churchorgan", t[t.Reedorgan = 20] = "Reedorgan", t[t.Accordion = 21] = "Accordion", t[t.Harmonica = 22] = "Harmonica", t[t.TangoAccordion = 23] = "TangoAccordion", t[t.AcousticGuitarNylon = 24] = "AcousticGuitarNylon", t[t.AcousticGuitarSteel = 25] = "AcousticGuitarSteel", t[t.ElectricGuitarJazz = 26] = "ElectricGuitarJazz", t[t.ElectricGuitarClean = 27] = "ElectricGuitarClean", t[t.ElectricGuitarMuted = 28] = "ElectricGuitarMuted", t[t.OverdrivenGuitar = 29] = "OverdrivenGuitar", t[t.DistortionGuitar = 30] = "DistortionGuitar", t[t.Guitarharmonics = 31] = "Guitarharmonics", t[t.AcousticBass = 32] = "AcousticBass", t[t.ElectricBassFinger = 33] = "ElectricBassFinger", t[t.ElectricBassPick = 34] = "ElectricBassPick", t[t.FretlessBass = 35] = "FretlessBass", t[t.SlapBass1 = 36] = "SlapBass1", t[t.SlapBass2 = 37] = "SlapBass2", t[t.SynthBass1 = 38] = "SynthBass1", t[t.SynthBass2 = 39] = "SynthBass2", t[t.Violin = 40] = "Violin", t[t.Viola = 41] = "Viola", t[t.Cello = 42] = "Cello", t[t.Contrabass = 43] = "Contrabass", t[t.TremoloStrings = 44] = "TremoloStrings", t[t.PizzicatoStrings = 45] = "PizzicatoStrings", t[t.OrchestralHarp = 46] = "OrchestralHarp", t[t.Timpani = 47] = "Timpani", t[t.StringEnsemble1 = 48] = "StringEnsemble1", t[t.StringEnsemble2 = 49] = "StringEnsemble2", t[t.SynthStrings1 = 50] = "SynthStrings1", t[t.SynthStrings2 = 51] = "SynthStrings2", t[t.VoiceAahs = 52] = "VoiceAahs", t[t.VoiceOohs = 53] = "VoiceOohs", t[t.SynthVoice = 54] = "SynthVoice", t[t.OrchestraHit = 55] = "OrchestraHit", t[t.Trumpet = 56] = "Trumpet", t[t.Trombone = 57] = "Trombone", t[t.Tuba = 58] = "Tuba", t[t.MutedTrumpet = 59] = "MutedTrumpet", t[t.Frenchhorn = 60] = "Frenchhorn", t[t.BrassSection = 61] = "BrassSection", t[t.SynthBrass1 = 62] = "SynthBrass1", t[t.SynthBrass2 = 63] = "SynthBrass2", t[t.SopranoSax = 64] = "SopranoSax", t[t.AltoSax = 65] = "AltoSax", t[t.TenorSax = 66] = "TenorSax", t[t.BaritoneSax = 67] = "BaritoneSax", t[t.Oboe = 68] = "Oboe", t[t.EnglishHorn = 69] = "EnglishHorn", t[t.Bassoon = 70] = "Bassoon", t[t.Clarinet = 71] = "Clarinet", t[t.Piccolo = 72] = "Piccolo", t[t.Flute = 73] = "Flute", t[t.Recorder = 74] = "Recorder", t[t.PanFlute = 75] = "PanFlute", t[t.BlownBottle = 76] = "BlownBottle", t[t.Shakuhachi = 77] = "Shakuhachi", t[t.Whistle = 78] = "Whistle", t[t.Ocarina = 79] = "Ocarina", t[t.Lead1Square = 80] = "Lead1Square", t[t.Lead2Sawtooth = 81] = "Lead2Sawtooth", t[t.Lead3Calliope = 82] = "Lead3Calliope", t[t.Lead4Chiff = 83] = "Lead4Chiff", t[t.Lead5Charang = 84] = "Lead5Charang", t[t.Lead6Voice = 85] = "Lead6Voice", t[t.Lead7Fifths = 86] = "Lead7Fifths", t[t.Lead8BassLead = 87] = "Lead8BassLead", t[t.Pad1NewAge = 88] = "Pad1NewAge", t[t.Pad2Warm = 89] = "Pad2Warm", t[t.Pad3PolySynth = 90] = "Pad3PolySynth", t[t.Pad4Choir = 91] = "Pad4Choir", t[t.Pad5Bowed = 92] = "Pad5Bowed", t[t.Pad6Metallic = 93] = "Pad6Metallic", t[t.Pad7Halo = 94] = "Pad7Halo", t[t.Pad8Sweep = 95] = "Pad8Sweep", t[t.FX1Rain = 96] = "FX1Rain", t[t.FX2Soundtrack = 97] = "FX2Soundtrack", t[t.FX3Crystal = 98] = "FX3Crystal", t[t.FX4Atmosphere = 99] = "FX4Atmosphere", t[t.FX5Brightness = 100] = "FX5Brightness", t[t.FX6Goblins = 101] = "FX6Goblins", t[t.FX7Echoes = 102] = "FX7Echoes", t[t.FX8SciFi = 103] = "FX8SciFi", t[t.Sitar = 104] = "Sitar", t[t.Banjo = 105] = "Banjo", t[t.Shamisen = 106] = "Shamisen", t[t.Guzheng = 107] = "Guzheng", t[t.Kalimba = 108] = "Kalimba", t[t.Bagpipe = 109] = "Bagpipe", t[t.Fiddle = 110] = "Fiddle", t[t.Shanai = 111] = "Shanai", t[t.TinkleBell = 112] = "TinkleBell", t[t.Agogo = 113] = "Agogo", t[t.SteelDrums = 114] = "SteelDrums", t[t.Woodblock = 115] = "Woodblock", t[t.TaikoDrum = 116] = "TaikoDrum", t[t.MelodicTom = 117] = "MelodicTom", t[t.SynthDrum = 118] = "SynthDrum", t[t.ReverseCymbal = 119] = "ReverseCymbal", t[t.GuitarFretNoise = 120] = "GuitarFretNoise", t[t.BreathNoise = 121] = "BreathNoise", t[t.Seashore = 122] = "Seashore", t[t.BirdTweet = 123] = "BirdTweet", t[t.TelephoneRing = 124] = "TelephoneRing", t[t.Helicopter = 125] = "Helicopter", t[t.Applause = 126] = "Applause", t[t.Gunshot = 127] = "Gunshot", t))(Nf || {}), Pf = /* @__PURE__ */ ((t) => (t[t.BassDrum2 = 35] = "BassDrum2", t[t.BassDrum1 = 36] = "BassDrum1", t[t.SideStick = 37] = "SideStick", t[t.SnareDrum1 = 38] = "SnareDrum1", t[t.HandClap = 39] = "HandClap", t[t.SnareDrum2 = 40] = "SnareDrum2", t[t.LowTom2 = 41] = "LowTom2", t[t.ClosedHiHat = 42] = "ClosedHiHat", t[t.LowTom1 = 43] = "LowTom1", t[t.PedalHiHat = 44] = "PedalHiHat", t[t.MidTom2 = 45] = "MidTom2", t[t.OpenHiHat = 46] = "OpenHiHat", t[t.MidTom1 = 47] = "MidTom1", t[t.HighTom2 = 48] = "HighTom2", t[t.CrashCymbal1 = 49] = "CrashCymbal1", t[t.HighTom1 = 50] = "HighTom1", t[t.RideCymbal1 = 51] = "RideCymbal1", t[t.ChineseCymbal = 52] = "ChineseCymbal", t[t.RideBell = 53] = "RideBell", t[t.Tambourine = 54] = "Tambourine", t[t.SplashCymbal = 55] = "SplashCymbal", t[t.Cowbell = 56] = "Cowbell", t[t.CrashCymbal2 = 57] = "CrashCymbal2", t[t.VibraSlap = 58] = "VibraSlap", t[t.RideCymbal2 = 59] = "RideCymbal2", t[t.HighBongo = 60] = "HighBongo", t[t.LowBongo = 61] = "LowBongo", t[t.MuteHighConga = 62] = "MuteHighConga", t[t.OpenHighConga = 63] = "OpenHighConga", t[t.LowConga = 64] = "LowConga", t[t.HighTimbale = 65] = "HighTimbale", t[t.LowTimbale = 66] = "LowTimbale", t[t.HighAgogo = 67] = "HighAgogo", t[t.LowAgogo = 68] = "LowAgogo", t[t.Cabasa = 69] = "Cabasa", t[t.Maracas = 70] = "Maracas", t[t.ShortWhistle = 71] = "ShortWhistle", t[t.LongWhistle = 72] = "LongWhistle", t[t.ShortGuiro = 73] = "ShortGuiro", t[t.LongGuiro = 74] = "LongGuiro", t[t.Claves = 75] = "Claves", t[t.HighWoodBlock = 76] = "HighWoodBlock", t[t.LowWoodBlock = 77] = "LowWoodBlock", t[t.MuteCuica = 78] = "MuteCuica", t[t.OpenCuica = 79] = "OpenCuica", t[t.MuteTriangle = 80] = "MuteTriangle", t[t.OpenTriangle = 81] = "OpenTriangle", t[t.Shaker = 82] = "Shaker", t))(Pf || {}), rn = {}, sn = {};
function Af(t) {
  var e = new $(t), n = e.readChunk();
  if (n.id != "MThd")
    throw "Bad MIDI file.  Expected 'MHdr', got: '" + n.id + "'";
  for (var r = Of(n.data), i = [], s = 0; !e.eof() && s < r.numTracks; s++) {
    var a = e.readChunk();
    if (a.id != "MTrk")
      throw "Bad MIDI file.  Expected 'MTrk', got: '" + a.id + "'";
    var o = yf(a.data);
    i.push(o);
  }
  return {
    header: r,
    tracks: i
  };
}
function Of(t) {
  var e = new $(t), n = e.readUInt16(), r = e.readUInt16(), i = {
    format: n,
    numTracks: r
  }, s = e.readUInt16();
  return s & 32768 ? (i.framesPerSecond = 256 - (s >> 8), i.ticksPerFrame = s & 255) : i.ticksPerBeat = s, i;
}
function yf(t) {
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
var Rf = Af;
function Bf(t, e) {
  if (typeof t != "object")
    throw "Invalid MIDI data";
  e = e || {};
  var n = t.header || {}, r = t.tracks || [], i, s = r.length, a = new A();
  for (Vf(a, n, s), i = 0; i < s; i++)
    Ff(a, r[i], e);
  return a.buffer;
}
function Vf(t, e, n) {
  var r = e.format == null ? 1 : e.format, i = 128;
  e.timeDivision ? i = e.timeDivision : e.ticksPerFrame && e.framesPerSecond ? i = -(e.framesPerSecond & 255) << 8 | e.ticksPerFrame & 255 : e.ticksPerBeat && (i = e.ticksPerBeat & 32767);
  var s = new A();
  s.writeUInt16(r), s.writeUInt16(n), s.writeUInt16(i), t.writeChunk("MThd", s.buffer);
}
function Ff(t, e, n) {
  var r = new A(), i, s = e.length, a = null;
  for (i = 0; i < s; i++)
    (n.running === !1 || !n.running && !e[i].running) && (a = null), a = Uf(r, e[i], a, n.useByte9ForNoteOff);
  t.writeChunk("MTrk", r.buffer);
}
function Uf(t, e, n, r) {
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
function A() {
  this.buffer = [];
}
A.prototype.writeUInt8 = function(t) {
  this.buffer.push(t & 255);
};
A.prototype.writeInt8 = A.prototype.writeUInt8;
A.prototype.writeUInt16 = function(t) {
  var e = t >> 8 & 255, n = t & 255;
  this.writeUInt8(e), this.writeUInt8(n);
};
A.prototype.writeInt16 = A.prototype.writeUInt16;
A.prototype.writeUInt24 = function(t) {
  var e = t >> 16 & 255, n = t >> 8 & 255, r = t & 255;
  this.writeUInt8(e), this.writeUInt8(n), this.writeUInt8(r);
};
A.prototype.writeInt24 = A.prototype.writeUInt24;
A.prototype.writeUInt32 = function(t) {
  var e = t >> 24 & 255, n = t >> 16 & 255, r = t >> 8 & 255, i = t & 255;
  this.writeUInt8(e), this.writeUInt8(n), this.writeUInt8(r), this.writeUInt8(i);
};
A.prototype.writeInt32 = A.prototype.writeUInt32;
A.prototype.writeBytes = function(t) {
  this.buffer = this.buffer.concat(Array.prototype.slice.call(t, 0));
};
A.prototype.writeString = function(t) {
  var e, n = t.length, r = [];
  for (e = 0; e < n; e++)
    r.push(t.codePointAt(e));
  this.writeBytes(r);
};
A.prototype.writeVarInt = function(t) {
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
A.prototype.writeChunk = function(t, e) {
  this.writeString(t), this.writeUInt32(e.length), this.writeBytes(e);
};
var Lf = Bf;
sn.parseMidi = Rf;
sn.writeMidi = Lf;
var Ir = {}, an = {}, pe = {};
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
function Hf(t, e, n) {
  if (n === void 0 && (n = "ticks"), t.length) {
    var r = ga(t, e[n], n);
    t.splice(r + 1, 0, e);
  } else
    t.push(e);
}
pe.insert = Hf;
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
me.exports = $f;
me.exports.from = da;
me.exports.depth = Gf;
me.exports.fromDepth = pa;
function $f(t) {
  if (!Array.isArray(t))
    throw new TypeError("Expected value to be an array");
  return da(t);
}
function da(t) {
  return ma(t, []);
}
function Gf(t, e) {
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
var En = j && j.__spreadArrays || function() {
  for (var t = 0, e = 0, n = arguments.length; e < n; e++)
    t += arguments[e].length;
  for (var r = Array(t), i = 0, e = 0; e < n; e++)
    for (var s = arguments[e], a = 0, o = s.length; a < o; a++, i++)
      r[i] = s[a];
  return r;
}, Df = j && j.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(Ir, "__esModule", { value: !0 });
var Mf = sn, zf = an, Kf = Df(me.exports);
function qf(t, e) {
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
function Wf(t) {
  return Kf.default(t.notes.map(function(e) {
    return qf(e, t.channel);
  }));
}
function Jf(t, e) {
  return {
    absoluteTime: t.ticks,
    channel: e,
    controllerType: t.number,
    deltaTime: 0,
    type: "controller",
    value: Math.floor(t.value * 127)
  };
}
function Xf(t) {
  for (var e = [], n = 0; n < 127; n++)
    t.controlChanges.hasOwnProperty(n) && t.controlChanges[n].forEach(function(r) {
      e.push(Jf(r, t.channel));
    });
  return e;
}
function Qf(t, e) {
  return {
    absoluteTime: t.ticks,
    channel: e,
    deltaTime: 0,
    type: "pitchBend",
    value: t.value
  };
}
function Yf(t) {
  var e = [];
  return t.pitchBends.forEach(function(n) {
    e.push(Qf(n, t.channel));
  }), e;
}
function jf(t) {
  return {
    absoluteTime: 0,
    channel: t.channel,
    deltaTime: 0,
    programNumber: t.instrument.number,
    type: "programChange"
  };
}
function Zf(t) {
  return {
    absoluteTime: 0,
    deltaTime: 0,
    meta: !0,
    text: t,
    type: "trackName"
  };
}
function th(t) {
  return {
    absoluteTime: t.ticks,
    deltaTime: 0,
    meta: !0,
    microsecondsPerBeat: Math.floor(6e7 / t.bpm),
    type: "setTempo"
  };
}
function eh(t) {
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
function nh(t) {
  var e = zf.keySignatureKeys.indexOf(t.key);
  return {
    absoluteTime: t.ticks,
    deltaTime: 0,
    key: e + 7,
    meta: !0,
    scale: t.scale === "major" ? 0 : 1,
    type: "keySignature"
  };
}
function rh(t) {
  return {
    absoluteTime: t.ticks,
    deltaTime: 0,
    meta: !0,
    text: t.text,
    type: t.type
  };
}
function ih(t) {
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
        return nh(n);
      }), t.header.meta.map(function(n) {
        return rh(n);
      }), t.header.tempos.map(function(n) {
        return th(n);
      }), t.header.timeSignatures.map(function(n) {
        return eh(n);
      }))
    ], t.tracks.map(function(n) {
      return En([
        Zf(n.name),
        jf(n)
      ], Wf(n), Xf(n), Yf(n));
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
  }), new Uint8Array(Mf.writeMidi(e));
}
Ir.encode = ih;
var on = {}, _r = {};
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
})(_r);
var xr = {};
Object.defineProperty(xr, "__esModule", { value: !0 });
var Ve = _r;
function sh() {
  return new Proxy({}, {
    get: function(t, e) {
      if (t[e])
        return t[e];
      if (Ve.controlChangeIds.hasOwnProperty(e))
        return t[Ve.controlChangeIds[e]];
    },
    set: function(t, e, n) {
      return Ve.controlChangeIds.hasOwnProperty(e) ? t[Ve.controlChangeIds[e]] = n : t[e] = n, !0;
    }
  });
}
xr.createControlChanges = sh;
var Er = {};
Object.defineProperty(Er, "__esModule", { value: !0 });
var Tn = /* @__PURE__ */ new WeakMap(), ah = function() {
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
Er.PitchBend = ah;
var Tr = {}, ve = {};
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
Object.defineProperty(Tr, "__esModule", { value: !0 });
var Fe = ve, Ui = /* @__PURE__ */ new WeakMap(), oh = function() {
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
      return this.percussion ? Fe.DrumKitByPatchID[this.number] : Fe.instrumentByPatchID[this.number];
    },
    set: function(e) {
      var n = Fe.instrumentByPatchID.indexOf(e);
      n !== -1 && (this.number = n);
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(t.prototype, "family", {
    get: function() {
      return this.percussion ? "drums" : Fe.InstrumentFamilyByID[Math.floor(this.number / 8)];
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
Tr.Instrument = oh;
var Nr = {};
Object.defineProperty(Nr, "__esModule", { value: !0 });
function ch(t) {
  var e = Math.floor(t / 12) - 1;
  return ba(t) + e.toString();
}
function ba(t) {
  var e = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"], n = t % 12;
  return e[n];
}
function uh(t) {
  var e = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  return e.indexOf(t);
}
var lh = function() {
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
}(), Ht = /* @__PURE__ */ new WeakMap(), fh = function() {
  function t(e, n, r) {
    Ht.set(this, r), this.midi = e.midi, this.velocity = e.velocity, this.noteOffVelocity = n.velocity, this.ticks = e.ticks, this.durationTicks = n.ticks - e.ticks;
  }
  return Object.defineProperty(t.prototype, "name", {
    get: function() {
      return ch(this.midi);
    },
    set: function(e) {
      this.midi = lh(e);
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
      this.midi = 12 * (this.octave + 1) + uh(e);
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(t.prototype, "duration", {
    get: function() {
      var e = Ht.get(this);
      return e.ticksToSeconds(this.ticks + this.durationTicks) - e.ticksToSeconds(this.ticks);
    },
    set: function(e) {
      var n = Ht.get(this), r = n.secondsToTicks(this.time + e);
      this.durationTicks = r - this.ticks;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(t.prototype, "time", {
    get: function() {
      var e = Ht.get(this);
      return e.ticksToSeconds(this.ticks);
    },
    set: function(e) {
      var n = Ht.get(this);
      this.ticks = n.secondsToTicks(e);
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(t.prototype, "bars", {
    get: function() {
      var e = Ht.get(this);
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
Nr.Note = fh;
Object.defineProperty(on, "__esModule", { value: !0 });
var Nn = pe, hh = _r, gh = xr, dh = Er, Li = Tr, ph = Nr, Ue = /* @__PURE__ */ new WeakMap(), mh = function() {
  function t(e, n) {
    var r = this;
    if (this.name = "", this.notes = [], this.controlChanges = gh.createControlChanges(), this.pitchBends = [], Ue.set(this, n), e) {
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
    var n = Ue.get(this), r = new ph.Note({
      midi: 0,
      ticks: 0,
      velocity: 1
    }, {
      ticks: 0,
      velocity: 0
    }, n);
    return Object.assign(r, e), Nn.insert(this.notes, r, "ticks"), this;
  }, t.prototype.addCC = function(e) {
    var n = Ue.get(this), r = new hh.ControlChange({
      controllerType: e.number
    }, n);
    return delete e.number, Object.assign(r, e), Array.isArray(this.controlChanges[r.number]) || (this.controlChanges[r.number] = []), Nn.insert(this.controlChanges[r.number], r, "ticks"), this;
  }, t.prototype.addPitchBend = function(e) {
    var n = Ue.get(this), r = new dh.PitchBend({}, n);
    return Object.assign(r, e), Nn.insert(this.pitchBends, r, "ticks"), this;
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
on.Track = mh;
var vh = j && j.__awaiter || function(t, e, n, r) {
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
}, bh = j && j.__generator || function(t, e) {
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
var wh = sn, kh = Ir, Hi = an, Pn = on, Sh = function() {
  function t(e) {
    var n = this, r = null;
    e && (e instanceof ArrayBuffer && (e = new Uint8Array(e)), r = wh.parseMidi(e), r.tracks.forEach(function(i) {
      var s = 0;
      i.forEach(function(a) {
        s += a.deltaTime, a.absoluteTime = s;
      });
    }), r.tracks = xh(r.tracks)), this.header = new Hi.Header(r), this.tracks = [], e && (this.tracks = r.tracks.map(function(i) {
      return new Pn.Track(i, n.header);
    }), r.header.format === 1 && this.tracks[0].duration === 0 && this.tracks.shift());
  }
  return t.fromUrl = function(e) {
    return vh(this, void 0, void 0, function() {
      var n, r;
      return bh(this, function(i) {
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
    var e = new Pn.Track(void 0, this.header);
    return this.tracks.push(e), e;
  }, t.prototype.toArray = function() {
    return kh.encode(this);
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
      var i = new Pn.Track(void 0, n.header);
      return i.fromJSON(r), i;
    });
  }, t.prototype.clone = function() {
    var e = new t();
    return e.fromJSON(this.toJSON()), e;
  }, t;
}(), Ch = rn.Midi = Sh, Ih = on;
rn.Track = Ih.Track;
var _h = an;
rn.Header = _h.Header;
function xh(t) {
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
var Eh = /* @__PURE__ */ ((t) => (t[t.UNKNOWN = 0] = "UNKNOWN", t[t.INTRO = 1] = "INTRO", t[t.VERSE = 2] = "VERSE", t[t.CHORUS = 3] = "CHORUS", t[t.BRIDGE = 4] = "BRIDGE", t[t.OUTRO = 5] = "OUTRO", t))(Eh || {});
class Th {
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
class X {
  static DEFAULT_PPQ = 480;
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
  constructor() {
    this.tracks = [], this.PPQ = 0, this.tempos = [], this.timeSignatures = [], this.structures = [];
  }
  getBusByRank(e) {
    return this.buses[e - 1];
  }
  setBus(e, n) {
    if (e > X.NUM_BUSES)
      throw new Error(`Only ${X.NUM_BUSES} buses are supported.`);
    const r = e - 1;
    this.buses[r] ? this.buses[r].setName(n) : this.buses[r] = new Nh({ rank: e, name: n });
  }
  getMasterTrack() {
    return this.masterTrack || (this.masterTrack = new at({
      type: $t.MASTER_TRACK,
      song: this,
      uuid: at.generateTrackIdInternal()
    })), this.masterTrack;
  }
  getTracks() {
    return this.tracks;
  }
  getTrackById(e) {
    return Me(this.tracks, (n) => n.getId() === e);
  }
  getTracksByIds(e) {
    if (!this.tracks)
      return [];
    const n = new Set(e);
    return this.tracks.filter((r) => n.has(r.getId()));
  }
  getTrackIndex(e) {
    return Wt(this.tracks, (n) => n.getId() === e);
  }
  createTrack({
    type: e,
    index: n,
    rank: r,
    assignDefaultSamplerPlugin: i = !1
  }) {
    this.checkAccess("createTrack"), r == null || r === null ? r = this.getNextTrackRank() : this.nextTrackRank = Math.max(r + 1, this.nextTrackRank);
    const s = new at({
      type: e,
      song: this,
      uuid: this.getNextTrackId(),
      rank: r == null || r === null ? this.getNextTrackRank() : r
    });
    return i && e === $t.MIDI_TRACK && s.setSamplerPlugin(s.createAudioPlugin(nn.DEFAULT_SYNTH_TFID)), e === $t.AUX_TRACK && s.getAuxTrackData().setInputBusRank(1), n != null ? this.tracks.splice(n, 0, s) : this.tracks.push(s), s;
  }
  cloneTrack(e) {
    let n = this.getTrackIndex(e.getId());
    n < 0 && (n = void 0);
    const r = this.createTrack({
      type: e.getType(),
      index: n
    });
    if (r.setVolume(e.getVolume()), r.setPan(e.getPan()), r.setSolo(e.getSolo()), r.setMuted(e.getMuted()), e.getType() === $t.MIDI_TRACK) {
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
      Wt(this.tracks, (r) => r.getId() === e),
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
    return X.getBarBeatsImpl(
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
    return X.getTempoAtTickImpl(
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
    const n = ki(e);
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
    this.timeSignatures = ki(e);
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
    return X.getStructureAtTickImpl(
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
    const r = new Th({
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
    return X.getTimeSignatureAtTickImpl(
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
    return X.tickToSecondsImpl(
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
    const l = n[o], u = a(l), g = e - u.tick, h = X.tempoBPMToTicksPerSecond(
      u.bpm,
      r
    );
    return u.time + g / h;
  }
  secondsToTick(e) {
    return X.secondsToTickImpl(
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
    const l = r[o], u = a(l), g = e - u.time, h = X.tempoBPMToTicksPerSecond(
      u.bpm,
      n
    );
    return Math.round(u.tick + g * h);
  }
  static importMIDI(e, n, r = 0, i = !1) {
    const s = new Ch(n), a = r, o = X.DEFAULT_PPQ / s.header.ppq;
    if (i) {
      const u = [];
      for (const h of s.header.timeSignatures)
        u.push(
          new Si({
            ticks: a + It(h.ticks, o),
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
            ticks: a + It(h.ticks, o),
            time: h.time,
            bpm: h.bpm
          })
        );
      e.overwriteTempoChanges(g);
    }
    const l = [];
    for (const u of s.tracks) {
      const g = e.createTrack({
        type: $t.MIDI_TRACK,
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
          startTick: a + It(w.ticks, o),
          endTick: a + It(w.ticks + w.durationTicks, o)
        }), p = Math.min(
          p,
          a + It(w.ticks, o)
        );
      const v = u.controlChanges[7];
      if (v)
        if (v.length === 1)
          g.setVolume(v[0].value);
        else {
          const w = new Q(Kn.VOLUME);
          g.getAutomation().addAutomation(w);
          const tt = g.getAutomation().getAutomationValueByTarget(w);
          for (const x of v)
            tt.addPoint(
              a + It(x.ticks, o),
              x.value
            );
        }
      const b = u.controlChanges[10];
      if (b)
        if (b.length === 1) {
          const w = Math.round(b[0].value * 127 - 64);
          g.setPan(w);
        } else {
          const w = new Q(Kn.PAN);
          g.getAutomation().addAutomation(w);
          const tt = g.getAutomation().getAutomationValueByTarget(w);
          for (const x of b)
            tt.addPoint(a + It(x.ticks, o), x.value);
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
      n.push(at.generateTrackIdInternal());
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
function It(t, e) {
  return Math.round(t * e);
}
class Nh {
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
var V = /* @__PURE__ */ ((t) => (t[t.Slider = 1] = "Slider", t[t.Input = 2] = "Input", t[t.TrackSelector = 3] = "TrackSelector", t[t.Pitch = 4] = "Pitch", t[t.TrackPitchSelector = 5] = "TrackPitchSelector", t[t.InstrumentSelector = 6] = "InstrumentSelector", t[t.Select = 7] = "Select", t[t.Switch = 8] = "Switch", t[t.InputNumber = 9] = "InputNumber", t[t.MultiTrackSelector = 10] = "MultiTrackSelector", t[t.None = 11] = "None", t[t.FileSelector = 12] = "FileSelector", t[t.MultiSourceAudioSelector = 13] = "MultiSourceAudioSelector", t[t.AudioRecorder = 14] = "AudioRecorder", t[t.SelectList = 15] = "SelectList", t[t.Descriptions = 16] = "Descriptions", t))(V || {});
async function Mh(t) {
  return t.arrayBuffer();
}
var Ph = /* @__PURE__ */ ((t) => (t[t.SelectedTrackIds = 1] = "SelectedTrackIds", t[t.SelectedClipInfos = 2] = "SelectedClipInfos", t[t.TickAtPlayhead = 3] = "TickAtPlayhead", t[t.EditingClipInfo = 4] = "EditingClipInfo", t[t.EditingNoteIds = 5] = "EditingNoteIds", t[t.TickAtPlayheadSnappedToBeat = 6] = "TickAtPlayheadSnappedToBeat", t))(Ph || {});
export {
  nn as AudioPlugin,
  Cr as AutomationData,
  Q as AutomationTarget,
  Kn as AutomationTargetType,
  qt as AutomationValue,
  Tf as AuxTrackData,
  Y as Clip,
  re as ClipType,
  Pf as DrumInstrumentType,
  xf as DrumPitch,
  Ph as InjectSource,
  Nf as MelodicInstrumentType,
  mt as Note,
  X as Song,
  Th as StructureMarker,
  Eh as StructureType,
  Ee as TempoEvent,
  Vh as TickToSecondStepper,
  Si as TimeSignatureEvent,
  at as Track,
  qn as TrackSend,
  Ef as TrackSendPosition,
  $t as TrackType,
  Ah as TuneflowPipeline,
  Fs as TuneflowPlugin,
  V as WidgetType,
  Cf as areTuneflowIdsEqual,
  If as areTuneflowIdsEqualIgnoreVersion,
  _f as dbToVolumeValue,
  Qe as decodeAudioPluginTuneflowId,
  Fh as gainToDb,
  Hh as gainToVolumeValue,
  Fi as getAudioPluginTuneflowId,
  Sf as getAudioPluginVersionlessTuneflowId,
  Mh as getFileContentFromFileSelector,
  Dh as maybeToRaw,
  yh as midiNumberToPitch,
  Gh as pitchToHz,
  Rh as pitchToMidiNumber,
  $h as remapRange,
  Bh as toVersionlessTfId,
  Uh as volumeValueToDb,
  Lh as volumeValueToGain
};
