var $i = "1.13.6", li = typeof self == "object" && self.self === self && self || typeof global == "object" && global.global === global && global || Function("return this")() || {}, nn = Array.prototype, Yn = Object.prototype, fi = typeof Symbol < "u" ? Symbol.prototype : null, $o = nn.push, Se = nn.slice, pe = Yn.toString, Do = Yn.hasOwnProperty, Di = typeof ArrayBuffer < "u", Mo = typeof DataView < "u", Go = Array.isArray, hi = Object.keys, gi = Object.create, di = Di && ArrayBuffer.isView, zo = isNaN, Ko = isFinite, Mi = !{ toString: null }.propertyIsEnumerable("toString"), pi = [
  "valueOf",
  "isPrototypeOf",
  "toString",
  "propertyIsEnumerable",
  "hasOwnProperty",
  "toLocaleString"
], qo = Math.pow(2, 53) - 1;
function J(t, e) {
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
function $t(t) {
  var e = typeof t;
  return e === "function" || e === "object" && !!t;
}
function Wo(t) {
  return t === null;
}
function Gi(t) {
  return t === void 0;
}
function zi(t) {
  return t === !0 || t === !1 || pe.call(t) === "[object Boolean]";
}
function Xo(t) {
  return !!(t && t.nodeType === 1);
}
function L(t) {
  var e = "[object " + t + "]";
  return function(n) {
    return pe.call(n) === e;
  };
}
const Zn = L("String"), tr = L("Number"), Jo = L("Date"), jo = L("RegExp"), Qo = L("Error"), Ki = L("Symbol"), qi = L("ArrayBuffer");
var Wi = L("Function"), Yo = li.document && li.document.childNodes;
typeof /./ != "function" && typeof Int8Array != "object" && typeof Yo != "function" && (Wi = function(t) {
  return typeof t == "function" || !1;
});
const G = Wi, Xi = L("Object");
var Ji = Mo && Xi(new DataView(new ArrayBuffer(8))), er = typeof Map < "u" && Xi(/* @__PURE__ */ new Map()), Zo = L("DataView");
function tc(t) {
  return t != null && G(t.getInt8) && qi(t.buffer);
}
const Ge = Ji ? tc : Zo, Dt = Go || L("Array");
function Et(t, e) {
  return t != null && Do.call(t, e);
}
var Bn = L("Arguments");
(function() {
  Bn(arguments) || (Bn = function(t) {
    return Et(t, "callee");
  });
})();
const nr = Bn;
function ec(t) {
  return !Ki(t) && Ko(t) && !isNaN(parseFloat(t));
}
function ji(t) {
  return tr(t) && zo(t);
}
function Qi(t) {
  return function() {
    return t;
  };
}
function Yi(t) {
  return function(e) {
    var n = t(e);
    return typeof n == "number" && n >= 0 && n <= qo;
  };
}
function Zi(t) {
  return function(e) {
    return e == null ? void 0 : e[t];
  };
}
const ze = Zi("byteLength"), nc = Yi(ze);
var rc = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
function ic(t) {
  return di ? di(t) && !Ge(t) : nc(t) && rc.test(pe.call(t));
}
const ts = Di ? ic : Qi(!1), j = Zi("length");
function sc(t) {
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
function es(t, e) {
  e = sc(e);
  var n = pi.length, r = t.constructor, i = G(r) && r.prototype || Yn, s = "constructor";
  for (Et(t, s) && !e.contains(s) && e.push(s); n--; )
    s = pi[n], s in t && t[s] !== i[s] && !e.contains(s) && e.push(s);
}
function F(t) {
  if (!$t(t))
    return [];
  if (hi)
    return hi(t);
  var e = [];
  for (var n in t)
    Et(t, n) && e.push(n);
  return Mi && es(t, e), e;
}
function ac(t) {
  if (t == null)
    return !0;
  var e = j(t);
  return typeof e == "number" && (Dt(t) || Zn(t) || nr(t)) ? e === 0 : j(F(t)) === 0;
}
function ns(t, e) {
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
function _(t) {
  if (t instanceof _)
    return t;
  if (!(this instanceof _))
    return new _(t);
  this._wrapped = t;
}
_.VERSION = $i;
_.prototype.value = function() {
  return this._wrapped;
};
_.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
_.prototype.toString = function() {
  return String(this._wrapped);
};
function mi(t) {
  return new Uint8Array(
    t.buffer || t,
    t.byteOffset || 0,
    ze(t)
  );
}
var vi = "[object DataView]";
function Un(t, e, n, r) {
  if (t === e)
    return t !== 0 || 1 / t === 1 / e;
  if (t == null || e == null)
    return !1;
  if (t !== t)
    return e !== e;
  var i = typeof t;
  return i !== "function" && i !== "object" && typeof e != "object" ? !1 : rs(t, e, n, r);
}
function rs(t, e, n, r) {
  t instanceof _ && (t = t._wrapped), e instanceof _ && (e = e._wrapped);
  var i = pe.call(t);
  if (i !== pe.call(e))
    return !1;
  if (Ji && i == "[object Object]" && Ge(t)) {
    if (!Ge(e))
      return !1;
    i = vi;
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
      return fi.valueOf.call(t) === fi.valueOf.call(e);
    case "[object ArrayBuffer]":
    case vi:
      return rs(mi(t), mi(e), n, r);
  }
  var s = i === "[object Array]";
  if (!s && ts(t)) {
    var a = ze(t);
    if (a !== ze(e))
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
      if (!Un(t[l], e[l], n, r))
        return !1;
  } else {
    var d = F(t), f;
    if (l = d.length, F(e).length !== l)
      return !1;
    for (; l--; )
      if (f = d[l], !(Et(e, f) && Un(t[f], e[f], n, r)))
        return !1;
  }
  return n.pop(), r.pop(), !0;
}
function oc(t, e) {
  return Un(t, e);
}
function we(t) {
  if (!$t(t))
    return [];
  var e = [];
  for (var n in t)
    e.push(n);
  return Mi && es(t, e), e;
}
function rr(t) {
  var e = j(t);
  return function(n) {
    if (n == null)
      return !1;
    var r = we(n);
    if (j(r))
      return !1;
    for (var i = 0; i < e; i++)
      if (!G(n[t[i]]))
        return !1;
    return t !== as || !G(n[ir]);
  };
}
var ir = "forEach", is = "has", sr = ["clear", "delete"], ss = ["get", is, "set"], cc = sr.concat(ir, ss), as = sr.concat(ss), uc = ["add"].concat(sr, ir, is);
const lc = er ? rr(cc) : L("Map"), fc = er ? rr(as) : L("WeakMap"), hc = er ? rr(uc) : L("Set"), gc = L("WeakSet");
function ie(t) {
  for (var e = F(t), n = e.length, r = Array(n), i = 0; i < n; i++)
    r[i] = t[e[i]];
  return r;
}
function dc(t) {
  for (var e = F(t), n = e.length, r = Array(n), i = 0; i < n; i++)
    r[i] = [e[i], t[e[i]]];
  return r;
}
function os(t) {
  for (var e = {}, n = F(t), r = 0, i = n.length; r < i; r++)
    e[t[n[r]]] = n[r];
  return e;
}
function Vn(t) {
  var e = [];
  for (var n in t)
    G(t[n]) && e.push(n);
  return e.sort();
}
function ar(t, e) {
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
const cs = ar(we), Ke = ar(F), us = ar(we, !0);
function pc() {
  return function() {
  };
}
function ls(t) {
  if (!$t(t))
    return {};
  if (gi)
    return gi(t);
  var e = pc();
  e.prototype = t;
  var n = new e();
  return e.prototype = null, n;
}
function mc(t, e) {
  var n = ls(t);
  return e && Ke(n, e), n;
}
function vc(t) {
  return $t(t) ? Dt(t) ? t.slice() : cs({}, t) : t;
}
function kc(t, e) {
  return e(t), t;
}
function fs(t) {
  return Dt(t) ? t : [t];
}
_.toPath = fs;
function Ce(t) {
  return _.toPath(t);
}
function or(t, e) {
  for (var n = e.length, r = 0; r < n; r++) {
    if (t == null)
      return;
    t = t[e[r]];
  }
  return n ? t : void 0;
}
function hs(t, e, n) {
  var r = or(t, Ce(e));
  return Gi(r) ? n : r;
}
function bc(t, e) {
  e = Ce(e);
  for (var n = e.length, r = 0; r < n; r++) {
    var i = e[r];
    if (!Et(t, i))
      return !1;
    t = t[i];
  }
  return !!n;
}
function cr(t) {
  return t;
}
function me(t) {
  return t = Ke({}, t), function(e) {
    return ns(e, t);
  };
}
function ur(t) {
  return t = Ce(t), function(e) {
    return or(e, t);
  };
}
function Ie(t, e, n) {
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
function gs(t, e, n) {
  return t == null ? cr : G(t) ? Ie(t, e, n) : $t(t) && !Dt(t) ? me(t) : ur(t);
}
function lr(t, e) {
  return gs(t, e, 1 / 0);
}
_.iteratee = lr;
function Q(t, e, n) {
  return _.iteratee !== lr ? _.iteratee(t, e) : gs(t, e, n);
}
function Sc(t, e, n) {
  e = Q(e, n);
  for (var r = F(t), i = r.length, s = {}, a = 0; a < i; a++) {
    var o = r[a];
    s[o] = e(t[o], o, t);
  }
  return s;
}
function ds() {
}
function wc(t) {
  return t == null ? ds : function(e) {
    return hs(t, e);
  };
}
function Cc(t, e, n) {
  var r = Array(Math.max(0, t));
  e = Ie(e, n, 1);
  for (var i = 0; i < t; i++)
    r[i] = e(i);
  return r;
}
function Ln(t, e) {
  return e == null && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1));
}
const ve = Date.now || function() {
  return new Date().getTime();
};
function ps(t) {
  var e = function(s) {
    return t[s];
  }, n = "(?:" + F(t).join("|") + ")", r = RegExp(n), i = RegExp(n, "g");
  return function(s) {
    return s = s == null ? "" : "" + s, r.test(s) ? s.replace(i, e) : s;
  };
}
const ms = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
}, Ic = ps(ms), _c = os(ms), Ec = ps(_c), Tc = _.templateSettings = {
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  escape: /<%-([\s\S]+?)%>/g
};
var Tn = /(.)^/, xc = {
  "'": "'",
  "\\": "\\",
  "\r": "r",
  "\n": "n",
  "\u2028": "u2028",
  "\u2029": "u2029"
}, Ac = /\\|'|\r|\n|\u2028|\u2029/g;
function Pc(t) {
  return "\\" + xc[t];
}
var Nc = /^\s*(\w|\$)+\s*$/;
function Oc(t, e, n) {
  !e && n && (e = n), e = us({}, e, _.templateSettings);
  var r = RegExp([
    (e.escape || Tn).source,
    (e.interpolate || Tn).source,
    (e.evaluate || Tn).source
  ].join("|") + "|$", "g"), i = 0, s = "__p+='";
  t.replace(r, function(l, d, f, h, m) {
    return s += t.slice(i, m).replace(Ac, Pc), i = m + l.length, d ? s += `'+
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
    if (!Nc.test(a))
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
    return o.call(this, l, _);
  };
  return u.source = "function(" + a + `){
` + s + "}", u;
}
function yc(t, e, n) {
  e = Ce(e);
  var r = e.length;
  if (!r)
    return G(n) ? n.call(t) : n;
  for (var i = 0; i < r; i++) {
    var s = t == null ? void 0 : t[e[i]];
    s === void 0 && (s = n, i = r), t = G(s) ? s.call(t) : s;
  }
  return t;
}
var Rc = 0;
function Fc(t) {
  var e = ++Rc + "";
  return t ? t + e : e;
}
function Bc(t) {
  var e = _(t);
  return e._chain = !0, e;
}
function vs(t, e, n, r, i) {
  if (!(r instanceof e))
    return t.apply(n, i);
  var s = ls(t.prototype), a = t.apply(s, i);
  return $t(a) ? a : s;
}
var se = J(function(t, e) {
  var n = se.placeholder, r = function() {
    for (var i = 0, s = e.length, a = Array(s), o = 0; o < s; o++)
      a[o] = e[o] === n ? arguments[i++] : e[o];
    for (; i < arguments.length; )
      a.push(arguments[i++]);
    return vs(t, r, this, this, a);
  };
  return r;
});
se.placeholder = _;
const ks = J(function(t, e, n) {
  if (!G(t))
    throw new TypeError("Bind must be called on a function");
  var r = J(function(i) {
    return vs(t, r, e, this, n.concat(i));
  });
  return r;
}), Y = Yi(j);
function Mt(t, e, n, r) {
  if (r = r || [], !e && e !== 0)
    e = 1 / 0;
  else if (e <= 0)
    return r.concat(t);
  for (var i = r.length, s = 0, a = j(t); s < a; s++) {
    var o = t[s];
    if (Y(o) && (Dt(o) || nr(o)))
      if (e > 1)
        Mt(o, e - 1, n, r), i = r.length;
      else
        for (var u = 0, l = o.length; u < l; )
          r[i++] = o[u++];
    else
      n || (r[i++] = o);
  }
  return r;
}
const Uc = J(function(t, e) {
  e = Mt(e, !1, !1);
  var n = e.length;
  if (n < 1)
    throw new Error("bindAll must be passed function names");
  for (; n--; ) {
    var r = e[n];
    t[r] = ks(t[r], t);
  }
  return t;
});
function Vc(t, e) {
  var n = function(r) {
    var i = n.cache, s = "" + (e ? e.apply(this, arguments) : r);
    return Et(i, s) || (i[s] = t.apply(this, arguments)), i[s];
  };
  return n.cache = {}, n;
}
const bs = J(function(t, e, n) {
  return setTimeout(function() {
    return t.apply(null, n);
  }, e);
}), Lc = se(bs, _, 1);
function Hc(t, e, n) {
  var r, i, s, a, o = 0;
  n || (n = {});
  var u = function() {
    o = n.leading === !1 ? 0 : ve(), r = null, a = t.apply(i, s), r || (i = s = null);
  }, l = function() {
    var d = ve();
    !o && n.leading === !1 && (o = d);
    var f = e - (d - o);
    return i = this, s = arguments, f <= 0 || f > e ? (r && (clearTimeout(r), r = null), o = d, a = t.apply(i, s), r || (i = s = null)) : !r && n.trailing !== !1 && (r = setTimeout(u, f)), a;
  };
  return l.cancel = function() {
    clearTimeout(r), o = 0, r = i = s = null;
  }, l;
}
function $c(t, e, n) {
  var r, i, s, a, o, u = function() {
    var d = ve() - i;
    e > d ? r = setTimeout(u, e - d) : (r = null, n || (a = t.apply(o, s)), r || (s = o = null));
  }, l = J(function(d) {
    return o = this, s = d, i = ve(), r || (r = setTimeout(u, e), n && (a = t.apply(o, s))), a;
  });
  return l.cancel = function() {
    clearTimeout(r), r = s = o = null;
  }, l;
}
function Dc(t, e) {
  return se(e, t);
}
function fr(t) {
  return function() {
    return !t.apply(this, arguments);
  };
}
function Mc() {
  var t = arguments, e = t.length - 1;
  return function() {
    for (var n = e, r = t[e].apply(this, arguments); n--; )
      r = t[n].call(this, r);
    return r;
  };
}
function Gc(t, e) {
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
const zc = se(Ss, 2);
function ws(t, e, n) {
  e = Q(e, n);
  for (var r = F(t), i, s = 0, a = r.length; s < a; s++)
    if (i = r[s], e(t[i], i, t))
      return i;
}
function Cs(t) {
  return function(e, n, r) {
    n = Q(n, r);
    for (var i = j(e), s = t > 0 ? 0 : i - 1; s >= 0 && s < i; s += t)
      if (n(e[s], s, e))
        return s;
    return -1;
  };
}
const ne = Cs(1), Is = Cs(-1);
function _s(t, e, n, r) {
  n = Q(n, r, 1);
  for (var i = n(e), s = 0, a = j(t); s < a; ) {
    var o = Math.floor((s + a) / 2);
    n(t[o]) < i ? s = o + 1 : a = o;
  }
  return s;
}
function Es(t, e, n) {
  return function(r, i, s) {
    var a = 0, o = j(r);
    if (typeof s == "number")
      t > 0 ? a = s >= 0 ? s : Math.max(s + o, a) : o = s >= 0 ? Math.min(s + 1, o) : s + o + 1;
    else if (n && s && o)
      return s = n(r, i), r[s] === i ? s : -1;
    if (i !== i)
      return s = e(Se.call(r, a, o), ji), s >= 0 ? s + a : -1;
    for (s = t > 0 ? a : o - 1; s >= 0 && s < o; s += t)
      if (r[s] === i)
        return s;
    return -1;
  };
}
const Ts = Es(1, ne, _s), Kc = Es(-1, Is);
function qe(t, e, n) {
  var r = Y(t) ? ne : ws, i = r(t, e, n);
  if (i !== void 0 && i !== -1)
    return t[i];
}
function qc(t, e) {
  return qe(t, me(e));
}
function dt(t, e, n) {
  e = Ie(e, n);
  var r, i;
  if (Y(t))
    for (r = 0, i = t.length; r < i; r++)
      e(t[r], r, t);
  else {
    var s = F(t);
    for (r = 0, i = s.length; r < i; r++)
      e(t[s[r]], s[r], t);
  }
  return t;
}
function Vt(t, e, n) {
  e = Q(e, n);
  for (var r = !Y(t) && F(t), i = (r || t).length, s = Array(i), a = 0; a < i; a++) {
    var o = r ? r[a] : a;
    s[a] = e(t[o], o, t);
  }
  return s;
}
function xs(t) {
  var e = function(n, r, i, s) {
    var a = !Y(n) && F(n), o = (a || n).length, u = t > 0 ? 0 : o - 1;
    for (s || (i = n[a ? a[u] : u], u += t); u >= 0 && u < o; u += t) {
      var l = a ? a[u] : u;
      i = r(i, n[l], l, n);
    }
    return i;
  };
  return function(n, r, i, s) {
    var a = arguments.length >= 3;
    return e(n, Ie(r, s, 4), i, a);
  };
}
const xn = xs(1), ki = xs(-1);
function re(t, e, n) {
  var r = [];
  return e = Q(e, n), dt(t, function(i, s, a) {
    e(i, s, a) && r.push(i);
  }), r;
}
function Wc(t, e, n) {
  return re(t, fr(Q(e)), n);
}
function bi(t, e, n) {
  e = Q(e, n);
  for (var r = !Y(t) && F(t), i = (r || t).length, s = 0; s < i; s++) {
    var a = r ? r[s] : s;
    if (!e(t[a], a, t))
      return !1;
  }
  return !0;
}
function Si(t, e, n) {
  e = Q(e, n);
  for (var r = !Y(t) && F(t), i = (r || t).length, s = 0; s < i; s++) {
    var a = r ? r[s] : s;
    if (e(t[a], a, t))
      return !0;
  }
  return !1;
}
function gt(t, e, n, r) {
  return Y(t) || (t = ie(t)), (typeof n != "number" || r) && (n = 0), Ts(t, e, n) >= 0;
}
const Xc = J(function(t, e, n) {
  var r, i;
  return G(e) ? i = e : (e = Ce(e), r = e.slice(0, -1), e = e[e.length - 1]), Vt(t, function(s) {
    var a = i;
    if (!a) {
      if (r && r.length && (s = or(s, r)), s == null)
        return;
      a = s[e];
    }
    return a == null ? a : a.apply(s, n);
  });
});
function hr(t, e) {
  return Vt(t, ur(e));
}
function Jc(t, e) {
  return re(t, me(e));
}
function As(t, e, n) {
  var r = -1 / 0, i = -1 / 0, s, a;
  if (e == null || typeof e == "number" && typeof t[0] != "object" && t != null) {
    t = Y(t) ? t : ie(t);
    for (var o = 0, u = t.length; o < u; o++)
      s = t[o], s != null && s > r && (r = s);
  } else
    e = Q(e, n), dt(t, function(l, d, f) {
      a = e(l, d, f), (a > i || a === -1 / 0 && r === -1 / 0) && (r = l, i = a);
    });
  return r;
}
function jc(t, e, n) {
  var r = 1 / 0, i = 1 / 0, s, a;
  if (e == null || typeof e == "number" && typeof t[0] != "object" && t != null) {
    t = Y(t) ? t : ie(t);
    for (var o = 0, u = t.length; o < u; o++)
      s = t[o], s != null && s < r && (r = s);
  } else
    e = Q(e, n), dt(t, function(l, d, f) {
      a = e(l, d, f), (a < i || a === 1 / 0 && r === 1 / 0) && (r = l, i = a);
    });
  return r;
}
var Qc = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
function Ps(t) {
  return t ? Dt(t) ? Se.call(t) : Zn(t) ? t.match(Qc) : Y(t) ? Vt(t, cr) : ie(t) : [];
}
function Ns(t, e, n) {
  if (e == null || n)
    return Y(t) || (t = ie(t)), t[Ln(t.length - 1)];
  var r = Ps(t), i = j(r);
  e = Math.max(Math.min(e, i), 0);
  for (var s = i - 1, a = 0; a < e; a++) {
    var o = Ln(a, s), u = r[a];
    r[a] = r[o], r[o] = u;
  }
  return r.slice(0, e);
}
function Yc(t) {
  return Ns(t, 1 / 0);
}
function Zc(t, e, n) {
  var r = 0;
  return e = Q(e, n), hr(Vt(t, function(i, s, a) {
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
function rn(t, e) {
  return function(n, r, i) {
    var s = e ? [[], []] : {};
    return r = Q(r, i), dt(n, function(a, o) {
      var u = r(a, o, n);
      t(s, a, u);
    }), s;
  };
}
const tu = rn(function(t, e, n) {
  Et(t, n) ? t[n].push(e) : t[n] = [e];
}), eu = rn(function(t, e, n) {
  t[n] = e;
}), nu = rn(function(t, e, n) {
  Et(t, n) ? t[n]++ : t[n] = 1;
}), ru = rn(function(t, e, n) {
  t[n ? 0 : 1].push(e);
}, !0);
function iu(t) {
  return t == null ? 0 : Y(t) ? t.length : F(t).length;
}
function su(t, e, n) {
  return e in n;
}
const Os = J(function(t, e) {
  var n = {}, r = e[0];
  if (t == null)
    return n;
  G(r) ? (e.length > 1 && (r = Ie(r, e[1])), e = we(t)) : (r = su, e = Mt(e, !1, !1), t = Object(t));
  for (var i = 0, s = e.length; i < s; i++) {
    var a = e[i], o = t[a];
    r(o, a, t) && (n[a] = o);
  }
  return n;
}), au = J(function(t, e) {
  var n = e[0], r;
  return G(n) ? (n = fr(n), e.length > 1 && (r = e[1])) : (e = Vt(Mt(e, !1, !1), String), n = function(i, s) {
    return !gt(e, s);
  }), Os(t, n, r);
});
function ys(t, e, n) {
  return Se.call(t, 0, Math.max(0, t.length - (e == null || n ? 1 : e)));
}
function An(t, e, n) {
  return t == null || t.length < 1 ? e == null || n ? void 0 : [] : e == null || n ? t[0] : ys(t, t.length - e);
}
function De(t, e, n) {
  return Se.call(t, e == null || n ? 1 : e);
}
function ou(t, e, n) {
  return t == null || t.length < 1 ? e == null || n ? void 0 : [] : e == null || n ? t[t.length - 1] : De(t, Math.max(0, t.length - e));
}
function cu(t) {
  return re(t, Boolean);
}
function uu(t, e) {
  return Mt(t, e, !1);
}
const Rs = J(function(t, e) {
  return e = Mt(e, !0, !0), re(t, function(n) {
    return !gt(e, n);
  });
}), lu = J(function(t, e) {
  return Rs(t, e);
});
function Hn(t, e, n, r) {
  zi(e) || (r = n, n = e, e = !1), n != null && (n = Q(n, r));
  for (var i = [], s = [], a = 0, o = j(t); a < o; a++) {
    var u = t[a], l = n ? n(u, a, t) : u;
    e && !n ? ((!a || s !== l) && i.push(u), s = l) : n ? gt(s, l) || (s.push(l), i.push(u)) : gt(i, u) || i.push(u);
  }
  return i;
}
const fu = J(function(t) {
  return Hn(Mt(t, !0, !0));
});
function hu(t) {
  for (var e = [], n = arguments.length, r = 0, i = j(t); r < i; r++) {
    var s = t[r];
    if (!gt(e, s)) {
      var a;
      for (a = 1; a < n && gt(arguments[a], s); a++)
        ;
      a === n && e.push(s);
    }
  }
  return e;
}
function $n(t) {
  for (var e = t && As(t, j).length || 0, n = Array(e), r = 0; r < e; r++)
    n[r] = hr(t, r);
  return n;
}
const gu = J($n);
function du(t, e) {
  for (var n = {}, r = 0, i = j(t); r < i; r++)
    e ? n[t[r]] = e[r] : n[t[r][0]] = t[r][1];
  return n;
}
function pu(t, e, n) {
  e == null && (e = t || 0, t = 0), n || (n = e < t ? -1 : 1);
  for (var r = Math.max(Math.ceil((e - t) / n), 0), i = Array(r), s = 0; s < r; s++, t += n)
    i[s] = t;
  return i;
}
function mu(t, e) {
  if (e == null || e < 1)
    return [];
  for (var n = [], r = 0, i = t.length; r < i; )
    n.push(Se.call(t, r, r += e));
  return n;
}
function gr(t, e) {
  return t._chain ? _(e).chain() : e;
}
function Fs(t) {
  return dt(Vn(t), function(e) {
    var n = _[e] = t[e];
    _.prototype[e] = function() {
      var r = [this._wrapped];
      return $o.apply(r, arguments), gr(this, n.apply(_, r));
    };
  }), _;
}
dt(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(t) {
  var e = nn[t];
  _.prototype[t] = function() {
    var n = this._wrapped;
    return n != null && (e.apply(n, arguments), (t === "shift" || t === "splice") && n.length === 0 && delete n[0]), gr(this, n);
  };
});
dt(["concat", "join", "slice"], function(t) {
  var e = nn[t];
  _.prototype[t] = function() {
    var n = this._wrapped;
    return n != null && (n = e.apply(n, arguments)), gr(this, n);
  };
});
const vu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VERSION: $i,
  restArguments: J,
  isObject: $t,
  isNull: Wo,
  isUndefined: Gi,
  isBoolean: zi,
  isElement: Xo,
  isString: Zn,
  isNumber: tr,
  isDate: Jo,
  isRegExp: jo,
  isError: Qo,
  isSymbol: Ki,
  isArrayBuffer: qi,
  isDataView: Ge,
  isArray: Dt,
  isFunction: G,
  isArguments: nr,
  isFinite: ec,
  isNaN: ji,
  isTypedArray: ts,
  isEmpty: ac,
  isMatch: ns,
  isEqual: oc,
  isMap: lc,
  isWeakMap: fc,
  isSet: hc,
  isWeakSet: gc,
  keys: F,
  allKeys: we,
  values: ie,
  pairs: dc,
  invert: os,
  functions: Vn,
  methods: Vn,
  extend: cs,
  extendOwn: Ke,
  assign: Ke,
  defaults: us,
  create: mc,
  clone: vc,
  tap: kc,
  get: hs,
  has: bc,
  mapObject: Sc,
  identity: cr,
  constant: Qi,
  noop: ds,
  toPath: fs,
  property: ur,
  propertyOf: wc,
  matcher: me,
  matches: me,
  times: Cc,
  random: Ln,
  now: ve,
  escape: Ic,
  unescape: Ec,
  templateSettings: Tc,
  template: Oc,
  result: yc,
  uniqueId: Fc,
  chain: Bc,
  iteratee: lr,
  partial: se,
  bind: ks,
  bindAll: Uc,
  memoize: Vc,
  delay: bs,
  defer: Lc,
  throttle: Hc,
  debounce: $c,
  wrap: Dc,
  negate: fr,
  compose: Mc,
  after: Gc,
  before: Ss,
  once: zc,
  findKey: ws,
  findIndex: ne,
  findLastIndex: Is,
  sortedIndex: _s,
  indexOf: Ts,
  lastIndexOf: Kc,
  find: qe,
  detect: qe,
  findWhere: qc,
  each: dt,
  forEach: dt,
  map: Vt,
  collect: Vt,
  reduce: xn,
  foldl: xn,
  inject: xn,
  reduceRight: ki,
  foldr: ki,
  filter: re,
  select: re,
  reject: Wc,
  every: bi,
  all: bi,
  some: Si,
  any: Si,
  contains: gt,
  includes: gt,
  include: gt,
  invoke: Xc,
  pluck: hr,
  where: Jc,
  max: As,
  min: jc,
  shuffle: Yc,
  sample: Ns,
  sortBy: Zc,
  groupBy: tu,
  indexBy: eu,
  countBy: nu,
  partition: ru,
  toArray: Ps,
  size: iu,
  pick: Os,
  omit: au,
  first: An,
  head: An,
  take: An,
  initial: ys,
  last: ou,
  rest: De,
  tail: De,
  drop: De,
  compact: cu,
  flatten: uu,
  without: lu,
  uniq: Hn,
  unique: Hn,
  union: fu,
  intersection: hu,
  difference: Rs,
  unzip: $n,
  transpose: $n,
  zip: gu,
  object: du,
  range: pu,
  chunk: mu,
  mixin: Fs,
  default: _
}, Symbol.toStringTag, { value: "Module" }));
var A = Fs(vu);
A._ = A;
let sn = (t = 21) => crypto.getRandomValues(new Uint8Array(t)).reduce((e, n) => (n &= 63, n < 36 ? e += n.toString(36) : n < 62 ? e += (n - 26).toString(36).toUpperCase() : n > 62 ? e += "-" : e += "_", e), "");
class Dn {
  instanceIdInternal = Dn.generatePluginIdInternal();
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
    return Dn.getPluginFullId(this.providerId(), this.pluginId());
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
    this.enabledInternal = e;
  }
  maybeSyncEnabledWithParamsReadiness() {
    this.allowManualApplyAdjust && !this.hasAllParamsSet() && this.setEnabledInternal(!1);
  }
  static generatePluginIdInternal() {
    return sn(10);
  }
}
class Nt {
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
      if (!Nt.isPluginRunnable(i))
        return e;
      e.setPluginContextInternal(i);
      try {
        i.isExecuting = !0, i.setProgress(null), await i.run(e, i.getParamsInternal(), Nt.readApisInternal), e.clearPluginContextInternal(), await Nt.materializeSongFnInternal(e, r), i.isExecuting = !1;
      } catch (s) {
        throw e.clearPluginContextInternal(), i.isExecuting = !1, s;
      }
      i.songCacheInternal = await Nt.cloneSongFnInternal(e), i.isRollbackable = !0;
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
      return await Nt.cloneSongFnInternal(
        this.plugins[e].songCacheInternal
      );
    if (!this.originalSong)
      throw new Error("Original song is not avaiable to clone.");
    return await Nt.cloneSongFnInternal(this.originalSong);
  }
  reset() {
    this.plugins.splice(0, this.plugins.length), this.originalSong = void 0, this.activePluginIndex = -1, this.threwErrorInLastRun = !1;
  }
  isPluginFunctioning(e) {
    return !!e.songCacheInternal;
  }
  getPluginIndexByPluginInstanceId(e) {
    return ne(this.plugins, (n) => n.instanceId === e);
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
var lt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ku(t) {
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
function bu(t, e, n, r, i) {
  for (var s = i + 1; r <= i; ) {
    var a = r + i >>> 1, o = t[a], u = n !== void 0 ? n(o, e) : o - e;
    u >= 0 ? (s = a, i = a - 1) : r = a + 1;
  }
  return s;
}
function Su(t, e, n, r, i) {
  for (var s = i + 1; r <= i; ) {
    var a = r + i >>> 1, o = t[a], u = n !== void 0 ? n(o, e) : o - e;
    u > 0 ? (s = a, i = a - 1) : r = a + 1;
  }
  return s;
}
function wu(t, e, n, r, i) {
  for (var s = r - 1; r <= i; ) {
    var a = r + i >>> 1, o = t[a], u = n !== void 0 ? n(o, e) : o - e;
    u < 0 ? (s = a, r = a + 1) : i = a - 1;
  }
  return s;
}
function Cu(t, e, n, r, i) {
  for (var s = r - 1; r <= i; ) {
    var a = r + i >>> 1, o = t[a], u = n !== void 0 ? n(o, e) : o - e;
    u <= 0 ? (s = a, r = a + 1) : i = a - 1;
  }
  return s;
}
function Iu(t, e, n, r, i) {
  for (; r <= i; ) {
    var s = r + i >>> 1, a = t[s], o = n !== void 0 ? n(a, e) : a - e;
    if (o === 0)
      return s;
    o <= 0 ? r = s + 1 : i = s - 1;
  }
  return -1;
}
function ce(t, e, n, r, i, s) {
  return typeof n == "function" ? s(t, e, n, r === void 0 ? 0 : r | 0, i === void 0 ? t.length - 1 : i | 0) : s(t, e, void 0, n === void 0 ? 0 : n | 0, r === void 0 ? t.length - 1 : r | 0);
}
var P = {
  ge: function(t, e, n, r, i) {
    return ce(t, e, n, r, i, bu);
  },
  gt: function(t, e, n, r, i) {
    return ce(t, e, n, r, i, Su);
  },
  lt: function(t, e, n, r, i) {
    return ce(t, e, n, r, i, wu);
  },
  le: function(t, e, n, r, i) {
    return ce(t, e, n, r, i, Cu);
  },
  eq: function(t, e, n, r, i) {
    return ce(t, e, n, r, i, Iu);
  }
}, Mn = { exports: {} };
(function(t, e) {
  var n = 200, r = "__lodash_hash_undefined__", i = 9007199254740991, s = "[object Arguments]", a = "[object Array]", o = "[object Boolean]", u = "[object Date]", l = "[object Error]", d = "[object Function]", f = "[object GeneratorFunction]", h = "[object Map]", m = "[object Number]", v = "[object Object]", S = "[object Promise]", k = "[object RegExp]", C = "[object Set]", O = "[object String]", I = "[object Symbol]", w = "[object WeakMap]", y = "[object ArrayBuffer]", ot = "[object DataView]", Gt = "[object Float32Array]", Or = "[object Float64Array]", yr = "[object Int8Array]", Rr = "[object Int16Array]", Fr = "[object Int32Array]", Br = "[object Uint8Array]", Ur = "[object Uint8ClampedArray]", Vr = "[object Uint16Array]", Lr = "[object Uint32Array]", pa = /[\\^$.*+?()[\]{}|]/g, ma = /\w*$/, va = /^\[object .+?Constructor\]$/, ka = /^(?:0|[1-9]\d*)$/, T = {};
  T[s] = T[a] = T[y] = T[ot] = T[o] = T[u] = T[Gt] = T[Or] = T[yr] = T[Rr] = T[Fr] = T[h] = T[m] = T[v] = T[k] = T[C] = T[O] = T[I] = T[Br] = T[Ur] = T[Vr] = T[Lr] = !0, T[l] = T[d] = T[w] = !1;
  var ba = typeof lt == "object" && lt && lt.Object === Object && lt, Sa = typeof self == "object" && self && self.Object === Object && self, ft = ba || Sa || Function("return this")(), Hr = e && !e.nodeType && e, $r = Hr && !0 && t && !t.nodeType && t, wa = $r && $r.exports === Hr;
  function Ca(c, g) {
    return c.set(g[0], g[1]), c;
  }
  function Ia(c, g) {
    return c.add(g), c;
  }
  function _a(c, g) {
    for (var p = -1, b = c ? c.length : 0; ++p < b && g(c[p], p, c) !== !1; )
      ;
    return c;
  }
  function Ea(c, g) {
    for (var p = -1, b = g.length, U = c.length; ++p < b; )
      c[U + p] = g[p];
    return c;
  }
  function Dr(c, g, p, b) {
    var U = -1, H = c ? c.length : 0;
    for (b && H && (p = c[++U]); ++U < H; )
      p = g(p, c[U], U, c);
    return p;
  }
  function Ta(c, g) {
    for (var p = -1, b = Array(c); ++p < c; )
      b[p] = g(p);
    return b;
  }
  function xa(c, g) {
    return c == null ? void 0 : c[g];
  }
  function Mr(c) {
    var g = !1;
    if (c != null && typeof c.toString != "function")
      try {
        g = !!(c + "");
      } catch {
      }
    return g;
  }
  function Gr(c) {
    var g = -1, p = Array(c.size);
    return c.forEach(function(b, U) {
      p[++g] = [U, b];
    }), p;
  }
  function pn(c, g) {
    return function(p) {
      return c(g(p));
    };
  }
  function zr(c) {
    var g = -1, p = Array(c.size);
    return c.forEach(function(b) {
      p[++g] = b;
    }), p;
  }
  var Aa = Array.prototype, Pa = Function.prototype, _e = Object.prototype, mn = ft["__core-js_shared__"], Kr = function() {
    var c = /[^.]+$/.exec(mn && mn.keys && mn.keys.IE_PROTO || "");
    return c ? "Symbol(src)_1." + c : "";
  }(), qr = Pa.toString, pt = _e.hasOwnProperty, Ee = _e.toString, Na = RegExp(
    "^" + qr.call(pt).replace(pa, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Wr = wa ? ft.Buffer : void 0, Xr = ft.Symbol, Jr = ft.Uint8Array, Oa = pn(Object.getPrototypeOf, Object), ya = Object.create, Ra = _e.propertyIsEnumerable, Fa = Aa.splice, jr = Object.getOwnPropertySymbols, Ba = Wr ? Wr.isBuffer : void 0, Ua = pn(Object.keys, Object), vn = qt(ft, "DataView"), ae = qt(ft, "Map"), kn = qt(ft, "Promise"), bn = qt(ft, "Set"), Sn = qt(ft, "WeakMap"), oe = qt(Object, "create"), Va = At(vn), La = At(ae), Ha = At(kn), $a = At(bn), Da = At(Sn), Qr = Xr ? Xr.prototype : void 0, Yr = Qr ? Qr.valueOf : void 0;
  function Tt(c) {
    var g = -1, p = c ? c.length : 0;
    for (this.clear(); ++g < p; ) {
      var b = c[g];
      this.set(b[0], b[1]);
    }
  }
  function Ma() {
    this.__data__ = oe ? oe(null) : {};
  }
  function Ga(c) {
    return this.has(c) && delete this.__data__[c];
  }
  function za(c) {
    var g = this.__data__;
    if (oe) {
      var p = g[c];
      return p === r ? void 0 : p;
    }
    return pt.call(g, c) ? g[c] : void 0;
  }
  function Ka(c) {
    var g = this.__data__;
    return oe ? g[c] !== void 0 : pt.call(g, c);
  }
  function qa(c, g) {
    var p = this.__data__;
    return p[c] = oe && g === void 0 ? r : g, this;
  }
  Tt.prototype.clear = Ma, Tt.prototype.delete = Ga, Tt.prototype.get = za, Tt.prototype.has = Ka, Tt.prototype.set = qa;
  function ht(c) {
    var g = -1, p = c ? c.length : 0;
    for (this.clear(); ++g < p; ) {
      var b = c[g];
      this.set(b[0], b[1]);
    }
  }
  function Wa() {
    this.__data__ = [];
  }
  function Xa(c) {
    var g = this.__data__, p = Te(g, c);
    if (p < 0)
      return !1;
    var b = g.length - 1;
    return p == b ? g.pop() : Fa.call(g, p, 1), !0;
  }
  function Ja(c) {
    var g = this.__data__, p = Te(g, c);
    return p < 0 ? void 0 : g[p][1];
  }
  function ja(c) {
    return Te(this.__data__, c) > -1;
  }
  function Qa(c, g) {
    var p = this.__data__, b = Te(p, c);
    return b < 0 ? p.push([c, g]) : p[b][1] = g, this;
  }
  ht.prototype.clear = Wa, ht.prototype.delete = Xa, ht.prototype.get = Ja, ht.prototype.has = ja, ht.prototype.set = Qa;
  function zt(c) {
    var g = -1, p = c ? c.length : 0;
    for (this.clear(); ++g < p; ) {
      var b = c[g];
      this.set(b[0], b[1]);
    }
  }
  function Ya() {
    this.__data__ = {
      hash: new Tt(),
      map: new (ae || ht)(),
      string: new Tt()
    };
  }
  function Za(c) {
    return xe(this, c).delete(c);
  }
  function to(c) {
    return xe(this, c).get(c);
  }
  function eo(c) {
    return xe(this, c).has(c);
  }
  function no(c, g) {
    return xe(this, c).set(c, g), this;
  }
  zt.prototype.clear = Ya, zt.prototype.delete = Za, zt.prototype.get = to, zt.prototype.has = eo, zt.prototype.set = no;
  function Kt(c) {
    this.__data__ = new ht(c);
  }
  function ro() {
    this.__data__ = new ht();
  }
  function io(c) {
    return this.__data__.delete(c);
  }
  function so(c) {
    return this.__data__.get(c);
  }
  function ao(c) {
    return this.__data__.has(c);
  }
  function oo(c, g) {
    var p = this.__data__;
    if (p instanceof ht) {
      var b = p.__data__;
      if (!ae || b.length < n - 1)
        return b.push([c, g]), this;
      p = this.__data__ = new zt(b);
    }
    return p.set(c, g), this;
  }
  Kt.prototype.clear = ro, Kt.prototype.delete = io, Kt.prototype.get = so, Kt.prototype.has = ao, Kt.prototype.set = oo;
  function co(c, g) {
    var p = In(c) || Ro(c) ? Ta(c.length, String) : [], b = p.length, U = !!b;
    for (var H in c)
      (g || pt.call(c, H)) && !(U && (H == "length" || Po(H, b))) && p.push(H);
    return p;
  }
  function Zr(c, g, p) {
    var b = c[g];
    (!(pt.call(c, g) && ri(b, p)) || p === void 0 && !(g in c)) && (c[g] = p);
  }
  function Te(c, g) {
    for (var p = c.length; p--; )
      if (ri(c[p][0], g))
        return p;
    return -1;
  }
  function uo(c, g) {
    return c && ti(g, _n(g), c);
  }
  function wn(c, g, p, b, U, H, Z) {
    var q;
    if (b && (q = H ? b(c, U, H, Z) : b(c)), q !== void 0)
      return q;
    if (!Ae(c))
      return c;
    var ai = In(c);
    if (ai) {
      if (q = To(c), !g)
        return Io(c, q);
    } else {
      var Wt = xt(c), oi = Wt == d || Wt == f;
      if (Bo(c))
        return mo(c, g);
      if (Wt == v || Wt == s || oi && !H) {
        if (Mr(c))
          return H ? c : {};
        if (q = xo(oi ? {} : c), !g)
          return _o(c, uo(q, c));
      } else {
        if (!T[Wt])
          return H ? c : {};
        q = Ao(c, Wt, wn, g);
      }
    }
    Z || (Z = new Kt());
    var ci = Z.get(c);
    if (ci)
      return ci;
    if (Z.set(c, q), !ai)
      var ui = p ? Eo(c) : _n(c);
    return _a(ui || c, function(En, Pe) {
      ui && (Pe = En, En = c[Pe]), Zr(q, Pe, wn(En, g, p, b, Pe, c, Z));
    }), q;
  }
  function lo(c) {
    return Ae(c) ? ya(c) : {};
  }
  function fo(c, g, p) {
    var b = g(c);
    return In(c) ? b : Ea(b, p(c));
  }
  function ho(c) {
    return Ee.call(c);
  }
  function go(c) {
    if (!Ae(c) || Oo(c))
      return !1;
    var g = si(c) || Mr(c) ? Na : va;
    return g.test(At(c));
  }
  function po(c) {
    if (!ni(c))
      return Ua(c);
    var g = [];
    for (var p in Object(c))
      pt.call(c, p) && p != "constructor" && g.push(p);
    return g;
  }
  function mo(c, g) {
    if (g)
      return c.slice();
    var p = new c.constructor(c.length);
    return c.copy(p), p;
  }
  function Cn(c) {
    var g = new c.constructor(c.byteLength);
    return new Jr(g).set(new Jr(c)), g;
  }
  function vo(c, g) {
    var p = g ? Cn(c.buffer) : c.buffer;
    return new c.constructor(p, c.byteOffset, c.byteLength);
  }
  function ko(c, g, p) {
    var b = g ? p(Gr(c), !0) : Gr(c);
    return Dr(b, Ca, new c.constructor());
  }
  function bo(c) {
    var g = new c.constructor(c.source, ma.exec(c));
    return g.lastIndex = c.lastIndex, g;
  }
  function So(c, g, p) {
    var b = g ? p(zr(c), !0) : zr(c);
    return Dr(b, Ia, new c.constructor());
  }
  function wo(c) {
    return Yr ? Object(Yr.call(c)) : {};
  }
  function Co(c, g) {
    var p = g ? Cn(c.buffer) : c.buffer;
    return new c.constructor(p, c.byteOffset, c.length);
  }
  function Io(c, g) {
    var p = -1, b = c.length;
    for (g || (g = Array(b)); ++p < b; )
      g[p] = c[p];
    return g;
  }
  function ti(c, g, p, b) {
    p || (p = {});
    for (var U = -1, H = g.length; ++U < H; ) {
      var Z = g[U], q = b ? b(p[Z], c[Z], Z, p, c) : void 0;
      Zr(p, Z, q === void 0 ? c[Z] : q);
    }
    return p;
  }
  function _o(c, g) {
    return ti(c, ei(c), g);
  }
  function Eo(c) {
    return fo(c, _n, ei);
  }
  function xe(c, g) {
    var p = c.__data__;
    return No(g) ? p[typeof g == "string" ? "string" : "hash"] : p.map;
  }
  function qt(c, g) {
    var p = xa(c, g);
    return go(p) ? p : void 0;
  }
  var ei = jr ? pn(jr, Object) : Lo, xt = ho;
  (vn && xt(new vn(new ArrayBuffer(1))) != ot || ae && xt(new ae()) != h || kn && xt(kn.resolve()) != S || bn && xt(new bn()) != C || Sn && xt(new Sn()) != w) && (xt = function(c) {
    var g = Ee.call(c), p = g == v ? c.constructor : void 0, b = p ? At(p) : void 0;
    if (b)
      switch (b) {
        case Va:
          return ot;
        case La:
          return h;
        case Ha:
          return S;
        case $a:
          return C;
        case Da:
          return w;
      }
    return g;
  });
  function To(c) {
    var g = c.length, p = c.constructor(g);
    return g && typeof c[0] == "string" && pt.call(c, "index") && (p.index = c.index, p.input = c.input), p;
  }
  function xo(c) {
    return typeof c.constructor == "function" && !ni(c) ? lo(Oa(c)) : {};
  }
  function Ao(c, g, p, b) {
    var U = c.constructor;
    switch (g) {
      case y:
        return Cn(c);
      case o:
      case u:
        return new U(+c);
      case ot:
        return vo(c, b);
      case Gt:
      case Or:
      case yr:
      case Rr:
      case Fr:
      case Br:
      case Ur:
      case Vr:
      case Lr:
        return Co(c, b);
      case h:
        return ko(c, b, p);
      case m:
      case O:
        return new U(c);
      case k:
        return bo(c);
      case C:
        return So(c, b, p);
      case I:
        return wo(c);
    }
  }
  function Po(c, g) {
    return g = g ?? i, !!g && (typeof c == "number" || ka.test(c)) && c > -1 && c % 1 == 0 && c < g;
  }
  function No(c) {
    var g = typeof c;
    return g == "string" || g == "number" || g == "symbol" || g == "boolean" ? c !== "__proto__" : c === null;
  }
  function Oo(c) {
    return !!Kr && Kr in c;
  }
  function ni(c) {
    var g = c && c.constructor, p = typeof g == "function" && g.prototype || _e;
    return c === p;
  }
  function At(c) {
    if (c != null) {
      try {
        return qr.call(c);
      } catch {
      }
      try {
        return c + "";
      } catch {
      }
    }
    return "";
  }
  function yo(c) {
    return wn(c, !0, !0);
  }
  function ri(c, g) {
    return c === g || c !== c && g !== g;
  }
  function Ro(c) {
    return Fo(c) && pt.call(c, "callee") && (!Ra.call(c, "callee") || Ee.call(c) == s);
  }
  var In = Array.isArray;
  function ii(c) {
    return c != null && Uo(c.length) && !si(c);
  }
  function Fo(c) {
    return Vo(c) && ii(c);
  }
  var Bo = Ba || Ho;
  function si(c) {
    var g = Ae(c) ? Ee.call(c) : "";
    return g == d || g == f;
  }
  function Uo(c) {
    return typeof c == "number" && c > -1 && c % 1 == 0 && c <= i;
  }
  function Ae(c) {
    var g = typeof c;
    return !!c && (g == "object" || g == "function");
  }
  function Vo(c) {
    return !!c && typeof c == "object";
  }
  function _n(c) {
    return ii(c) ? co(c) : po(c);
  }
  function Lo() {
    return [];
  }
  function Ho() {
    return !1;
  }
  t.exports = yo;
})(Mn, Mn.exports);
const wi = Mn.exports;
class Pn {
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
class Ci {
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
function _u(t, e) {
  const n = /* @__PURE__ */ Object.create(null), r = t.split(",");
  for (let i = 0; i < r.length; i++)
    n[r[i]] = !0;
  return e ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
function dr(t) {
  if (N(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const r = t[n], i = at(r) ? Au(r) : dr(r);
      if (i)
        for (const s in i)
          e[s] = i[s];
    }
    return e;
  } else {
    if (at(t))
      return t;
    if (X(t))
      return t;
  }
}
const Eu = /;(?![^(]*\))/g, Tu = /:([^]+)/, xu = /\/\*.*?\*\//gs;
function Au(t) {
  const e = {};
  return t.replace(xu, "").split(Eu).forEach((n) => {
    if (n) {
      const r = n.split(Tu);
      r.length > 1 && (e[r[0].trim()] = r[1].trim());
    }
  }), e;
}
function pr(t) {
  let e = "";
  if (at(t))
    e = t;
  else if (N(t))
    for (let n = 0; n < t.length; n++) {
      const r = pr(t[n]);
      r && (e += r + " ");
    }
  else if (X(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const ut = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {};
process.env.NODE_ENV !== "production" && Object.freeze([]);
const mr = () => {
}, Pu = () => !1, Nu = /^on[^a-z]/, Ou = (t) => Nu.test(t), st = Object.assign, yu = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, Ru = Object.prototype.hasOwnProperty, R = (t, e) => Ru.call(t, e), N = Array.isArray, Yt = (t) => an(t) === "[object Map]", Fu = (t) => an(t) === "[object Set]", z = (t) => typeof t == "function", at = (t) => typeof t == "string", vr = (t) => typeof t == "symbol", X = (t) => t !== null && typeof t == "object", Bu = (t) => X(t) && z(t.then) && z(t.catch), Uu = Object.prototype.toString, an = (t) => Uu.call(t), Bs = (t) => an(t).slice(8, -1), Vu = (t) => an(t) === "[object Object]", kr = (t) => at(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Lu = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, bh = Lu((t) => t.charAt(0).toUpperCase() + t.slice(1)), We = (t, e) => !Object.is(t, e), Hu = (t, e, n) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, $u = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
};
let Ii;
const Du = () => Ii || (Ii = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function _i(t, ...e) {
}
let Mu;
function Gu(t, e = Mu) {
  e && e.active && e.effects.push(t);
}
const Gn = (t) => {
  const e = new Set(t);
  return e.w = 0, e.n = 0, e;
}, Us = (t) => (t.w & It) > 0, Vs = (t) => (t.n & It) > 0, zu = ({ deps: t }) => {
  if (t.length)
    for (let e = 0; e < t.length; e++)
      t[e].w |= It;
}, Ku = (t) => {
  const { deps: e } = t;
  if (e.length) {
    let n = 0;
    for (let r = 0; r < e.length; r++) {
      const i = e[r];
      Us(i) && !Vs(i) ? i.delete(t) : e[n++] = i, i.w &= ~It, i.n &= ~It;
    }
    e.length = n;
  }
}, zn = /* @__PURE__ */ new WeakMap();
let le = 0, It = 1;
const Kn = 30;
let W;
const yt = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), qn = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class qu {
  constructor(e, n = null, r) {
    this.fn = e, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Gu(this, r);
  }
  run() {
    if (!this.active)
      return this.fn();
    let e = W, n = Rt;
    for (; e; ) {
      if (e === this)
        return;
      e = e.parent;
    }
    try {
      return this.parent = W, W = this, Rt = !0, It = 1 << ++le, le <= Kn ? zu(this) : Ei(this), this.fn();
    } finally {
      le <= Kn && Ku(this), It = 1 << --le, W = this.parent, Rt = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    W === this ? this.deferStop = !0 : this.active && (Ei(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Ei(t) {
  const { deps: e } = t;
  if (e.length) {
    for (let n = 0; n < e.length; n++)
      e[n].delete(t);
    e.length = 0;
  }
}
let Rt = !0;
const Ls = [];
function Hs() {
  Ls.push(Rt), Rt = !1;
}
function $s() {
  const t = Ls.pop();
  Rt = t === void 0 ? !0 : t;
}
function rt(t, e, n) {
  if (Rt && W) {
    let r = zn.get(t);
    r || zn.set(t, r = /* @__PURE__ */ new Map());
    let i = r.get(n);
    i || r.set(n, i = Gn());
    const s = process.env.NODE_ENV !== "production" ? { effect: W, target: t, type: e, key: n } : void 0;
    Wu(i, s);
  }
}
function Wu(t, e) {
  let n = !1;
  le <= Kn ? Vs(t) || (t.n |= It, n = !Us(t)) : n = !t.has(W), n && (t.add(W), W.deps.push(t), process.env.NODE_ENV !== "production" && W.onTrack && W.onTrack(Object.assign({ effect: W }, e)));
}
function _t(t, e, n, r, i, s) {
  const a = zn.get(t);
  if (!a)
    return;
  let o = [];
  if (e === "clear")
    o = [...a.values()];
  else if (n === "length" && N(t)) {
    const l = $u(r);
    a.forEach((d, f) => {
      (f === "length" || f >= l) && o.push(d);
    });
  } else
    switch (n !== void 0 && o.push(a.get(n)), e) {
      case "add":
        N(t) ? kr(n) && o.push(a.get("length")) : (o.push(a.get(yt)), Yt(t) && o.push(a.get(qn)));
        break;
      case "delete":
        N(t) || (o.push(a.get(yt)), Yt(t) && o.push(a.get(qn)));
        break;
      case "set":
        Yt(t) && o.push(a.get(yt));
        break;
    }
  const u = process.env.NODE_ENV !== "production" ? { target: t, type: e, key: n, newValue: r, oldValue: i, oldTarget: s } : void 0;
  if (o.length === 1)
    o[0] && (process.env.NODE_ENV !== "production" ? Ne(o[0], u) : Ne(o[0]));
  else {
    const l = [];
    for (const d of o)
      d && l.push(...d);
    process.env.NODE_ENV !== "production" ? Ne(Gn(l), u) : Ne(Gn(l));
  }
}
function Ne(t, e) {
  const n = N(t) ? t : [...t];
  for (const r of n)
    r.computed && Ti(r, e);
  for (const r of n)
    r.computed || Ti(r, e);
}
function Ti(t, e) {
  (t !== W || t.allowRecurse) && (process.env.NODE_ENV !== "production" && t.onTrigger && t.onTrigger(st({ effect: t }, e)), t.scheduler ? t.scheduler() : t.run());
}
const Xu = /* @__PURE__ */ _u("__proto__,__v_isRef,__isVue"), Ds = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(vr)
), Ju = /* @__PURE__ */ br(), ju = /* @__PURE__ */ br(!0), Qu = /* @__PURE__ */ br(!0, !0), xi = /* @__PURE__ */ Yu();
function Yu() {
  const t = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    t[e] = function(...n) {
      const r = E(this);
      for (let s = 0, a = this.length; s < a; s++)
        rt(r, "get", s + "");
      const i = r[e](...n);
      return i === -1 || i === !1 ? r[e](...n.map(E)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    t[e] = function(...n) {
      Hs();
      const r = E(this)[e].apply(this, n);
      return $s(), r;
    };
  }), t;
}
function br(t = !1, e = !1) {
  return function(r, i, s) {
    if (i === "__v_isReactive")
      return !t;
    if (i === "__v_isReadonly")
      return t;
    if (i === "__v_isShallow")
      return e;
    if (i === "__v_raw" && s === (t ? e ? qs : Ks : e ? dl : zs).get(r))
      return r;
    const a = N(r);
    if (!t && a && R(xi, i))
      return Reflect.get(xi, i, s);
    const o = Reflect.get(r, i, s);
    return (vr(i) ? Ds.has(i) : Xu(i)) || (t || rt(r, "get", i), e) ? o : M(o) ? a && kr(i) ? o : o.value : X(o) ? t ? Xs(o) : Ws(o) : o;
  };
}
const Zu = /* @__PURE__ */ tl();
function tl(t = !1) {
  return function(n, r, i, s) {
    let a = n[r];
    if (Lt(a) && M(a) && !M(i))
      return !1;
    if (!t && (!Wn(i) && !Lt(i) && (a = E(a), i = E(i)), !N(n) && M(a) && !M(i)))
      return a.value = i, !0;
    const o = N(n) && kr(r) ? Number(r) < n.length : R(n, r), u = Reflect.set(n, r, i, s);
    return n === E(s) && (o ? We(i, a) && _t(n, "set", r, i, a) : _t(n, "add", r, i)), u;
  };
}
function el(t, e) {
  const n = R(t, e), r = t[e], i = Reflect.deleteProperty(t, e);
  return i && n && _t(t, "delete", e, void 0, r), i;
}
function nl(t, e) {
  const n = Reflect.has(t, e);
  return (!vr(e) || !Ds.has(e)) && rt(t, "has", e), n;
}
function rl(t) {
  return rt(t, "iterate", N(t) ? "length" : yt), Reflect.ownKeys(t);
}
const il = {
  get: Ju,
  set: Zu,
  deleteProperty: el,
  has: nl,
  ownKeys: rl
}, Ms = {
  get: ju,
  set(t, e) {
    return process.env.NODE_ENV !== "production" && _i(`Set operation on key "${String(e)}" failed: target is readonly.`, t), !0;
  },
  deleteProperty(t, e) {
    return process.env.NODE_ENV !== "production" && _i(`Delete operation on key "${String(e)}" failed: target is readonly.`, t), !0;
  }
}, sl = /* @__PURE__ */ st({}, Ms, {
  get: Qu
}), Sr = (t) => t, on = (t) => Reflect.getPrototypeOf(t);
function Oe(t, e, n = !1, r = !1) {
  t = t.__v_raw;
  const i = E(t), s = E(e);
  n || (e !== s && rt(i, "get", e), rt(i, "get", s));
  const { has: a } = on(i), o = r ? Sr : n ? _r : Ir;
  if (a.call(i, e))
    return o(t.get(e));
  if (a.call(i, s))
    return o(t.get(s));
  t !== i && t.get(e);
}
function ye(t, e = !1) {
  const n = this.__v_raw, r = E(n), i = E(t);
  return e || (t !== i && rt(r, "has", t), rt(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
}
function Re(t, e = !1) {
  return t = t.__v_raw, !e && rt(E(t), "iterate", yt), Reflect.get(t, "size", t);
}
function Ai(t) {
  t = E(t);
  const e = E(this);
  return on(e).has.call(e, t) || (e.add(t), _t(e, "add", t, t)), this;
}
function Pi(t, e) {
  e = E(e);
  const n = E(this), { has: r, get: i } = on(n);
  let s = r.call(n, t);
  s ? process.env.NODE_ENV !== "production" && Gs(n, r, t) : (t = E(t), s = r.call(n, t));
  const a = i.call(n, t);
  return n.set(t, e), s ? We(e, a) && _t(n, "set", t, e, a) : _t(n, "add", t, e), this;
}
function Ni(t) {
  const e = E(this), { has: n, get: r } = on(e);
  let i = n.call(e, t);
  i ? process.env.NODE_ENV !== "production" && Gs(e, n, t) : (t = E(t), i = n.call(e, t));
  const s = r ? r.call(e, t) : void 0, a = e.delete(t);
  return i && _t(e, "delete", t, void 0, s), a;
}
function Oi() {
  const t = E(this), e = t.size !== 0, n = process.env.NODE_ENV !== "production" ? Yt(t) ? new Map(t) : new Set(t) : void 0, r = t.clear();
  return e && _t(t, "clear", void 0, void 0, n), r;
}
function Fe(t, e) {
  return function(r, i) {
    const s = this, a = s.__v_raw, o = E(a), u = e ? Sr : t ? _r : Ir;
    return !t && rt(o, "iterate", yt), a.forEach((l, d) => r.call(i, u(l), u(d), s));
  };
}
function Be(t, e, n) {
  return function(...r) {
    const i = this.__v_raw, s = E(i), a = Yt(s), o = t === "entries" || t === Symbol.iterator && a, u = t === "keys" && a, l = i[t](...r), d = n ? Sr : e ? _r : Ir;
    return !e && rt(s, "iterate", u ? qn : yt), {
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
function mt(t) {
  return function(...e) {
    if (process.env.NODE_ENV !== "production") {
      const n = e[0] ? `on key "${e[0]}" ` : "";
    }
    return t === "delete" ? !1 : this;
  };
}
function al() {
  const t = {
    get(s) {
      return Oe(this, s);
    },
    get size() {
      return Re(this);
    },
    has: ye,
    add: Ai,
    set: Pi,
    delete: Ni,
    clear: Oi,
    forEach: Fe(!1, !1)
  }, e = {
    get(s) {
      return Oe(this, s, !1, !0);
    },
    get size() {
      return Re(this);
    },
    has: ye,
    add: Ai,
    set: Pi,
    delete: Ni,
    clear: Oi,
    forEach: Fe(!1, !0)
  }, n = {
    get(s) {
      return Oe(this, s, !0);
    },
    get size() {
      return Re(this, !0);
    },
    has(s) {
      return ye.call(this, s, !0);
    },
    add: mt("add"),
    set: mt("set"),
    delete: mt("delete"),
    clear: mt("clear"),
    forEach: Fe(!0, !1)
  }, r = {
    get(s) {
      return Oe(this, s, !0, !0);
    },
    get size() {
      return Re(this, !0);
    },
    has(s) {
      return ye.call(this, s, !0);
    },
    add: mt("add"),
    set: mt("set"),
    delete: mt("delete"),
    clear: mt("clear"),
    forEach: Fe(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
    t[s] = Be(s, !1, !1), n[s] = Be(s, !0, !1), e[s] = Be(s, !1, !0), r[s] = Be(s, !0, !0);
  }), [
    t,
    n,
    e,
    r
  ];
}
const [ol, cl, ul, ll] = /* @__PURE__ */ al();
function wr(t, e) {
  const n = e ? t ? ll : ul : t ? cl : ol;
  return (r, i, s) => i === "__v_isReactive" ? !t : i === "__v_isReadonly" ? t : i === "__v_raw" ? r : Reflect.get(R(n, i) && i in r ? n : r, i, s);
}
const fl = {
  get: /* @__PURE__ */ wr(!1, !1)
}, hl = {
  get: /* @__PURE__ */ wr(!0, !1)
}, gl = {
  get: /* @__PURE__ */ wr(!0, !0)
};
function Gs(t, e, n) {
  const r = E(n);
  if (r !== n && e.call(t, r)) {
    const i = Bs(t);
  }
}
const zs = /* @__PURE__ */ new WeakMap(), dl = /* @__PURE__ */ new WeakMap(), Ks = /* @__PURE__ */ new WeakMap(), qs = /* @__PURE__ */ new WeakMap();
function pl(t) {
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
function ml(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : pl(Bs(t));
}
function Ws(t) {
  return Lt(t) ? t : Cr(t, !1, il, fl, zs);
}
function Xs(t) {
  return Cr(t, !0, Ms, hl, Ks);
}
function Ue(t) {
  return Cr(t, !0, sl, gl, qs);
}
function Cr(t, e, n, r, i) {
  if (!X(t))
    return process.env.NODE_ENV, t;
  if (t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const s = i.get(t);
  if (s)
    return s;
  const a = ml(t);
  if (a === 0)
    return t;
  const o = new Proxy(t, a === 2 ? r : n);
  return i.set(t, o), o;
}
function Ft(t) {
  return Lt(t) ? Ft(t.__v_raw) : !!(t && t.__v_isReactive);
}
function Lt(t) {
  return !!(t && t.__v_isReadonly);
}
function Wn(t) {
  return !!(t && t.__v_isShallow);
}
function Xe(t) {
  return Ft(t) || Lt(t);
}
function E(t) {
  const e = t && t.__v_raw;
  return e ? E(e) : t;
}
function vl(t) {
  return Hu(t, "__v_skip", !0), t;
}
const Ir = (t) => X(t) ? Ws(t) : t, _r = (t) => X(t) ? Xs(t) : t;
function M(t) {
  return !!(t && t.__v_isRef === !0);
}
function kl(t) {
  return M(t) ? t.value : t;
}
const bl = {
  get: (t, e, n) => kl(Reflect.get(t, e, n)),
  set: (t, e, n, r) => {
    const i = t[e];
    return M(i) && !M(n) ? (i.value = n, !0) : Reflect.set(t, e, n, r);
  }
};
function Sl(t) {
  return Ft(t) ? t : new Proxy(t, bl);
}
const Bt = [];
function wl(t) {
  Bt.push(t);
}
function Cl() {
  Bt.pop();
}
function D(t, ...e) {
  if (process.env.NODE_ENV === "production")
    return;
  Hs();
  const n = Bt.length ? Bt[Bt.length - 1].component : null, r = n && n.appContext.config.warnHandler, i = Il();
  if (r)
    Ut(r, n, 11, [
      t + e.join(""),
      n && n.proxy,
      i.map(({ vnode: s }) => `at <${ua(n, s.type)}>`).join(`
`),
      i
    ]);
  else {
    const s = [`[Vue warn]: ${t}`, ...e];
    i.length && s.push(`
`, ..._l(i));
  }
  $s();
}
function Il() {
  let t = Bt[Bt.length - 1];
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
function _l(t) {
  const e = [];
  return t.forEach((n, r) => {
    e.push(...r === 0 ? [] : [`
`], ...El(n));
  }), e;
}
function El({ vnode: t, recurseCount: e }) {
  const n = e > 0 ? `... (${e} recursive calls)` : "", r = t.component ? t.component.parent == null : !1, i = ` at <${ua(t.component, t.type, r)}`, s = ">" + n;
  return t.props ? [i, ...Tl(t.props), s] : [i + s];
}
function Tl(t) {
  const e = [], n = Object.keys(t);
  return n.slice(0, 3).forEach((r) => {
    e.push(...Js(r, t[r]));
  }), n.length > 3 && e.push(" ..."), e;
}
function Js(t, e, n) {
  return at(e) ? (e = JSON.stringify(e), n ? e : [`${t}=${e}`]) : typeof e == "number" || typeof e == "boolean" || e == null ? n ? e : [`${t}=${e}`] : M(e) ? (e = Js(t, E(e.value), !0), n ? e : [`${t}=Ref<`, e, ">"]) : z(e) ? [`${t}=fn${e.name ? `<${e.name}>` : ""}`] : (e = E(e), n ? e : [`${t}=`, e]);
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
function Ut(t, e, n, r) {
  let i;
  try {
    i = r ? t(...r) : t();
  } catch (s) {
    Qs(s, e, n);
  }
  return i;
}
function Xn(t, e, n, r) {
  if (z(t)) {
    const s = Ut(t, e, n, r);
    return s && Bu(s) && s.catch((a) => {
      Qs(a, e, n);
    }), s;
  }
  const i = [];
  for (let s = 0; s < t.length; s++)
    i.push(Xn(t[s], e, n, r));
  return i;
}
function Qs(t, e, n, r = !0) {
  const i = e ? e.vnode : null;
  if (e) {
    let s = e.parent;
    const a = e.proxy, o = process.env.NODE_ENV !== "production" ? js[n] : n;
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
      Ut(u, null, 10, [t, a, o]);
      return;
    }
  }
  xl(t, n, i, r);
}
function xl(t, e, n, r = !0) {
  if (process.env.NODE_ENV !== "production") {
    const i = js[e];
    if (n && wl(n), D(`Unhandled error${i ? ` during execution of ${i}` : ""}`), n && Cl(), r)
      throw t;
  }
}
let Je = !1, Jn = !1;
const it = [];
let bt = 0;
const Zt = [];
let ct = null, kt = 0;
const Ys = /* @__PURE__ */ Promise.resolve();
let Er = null;
const Al = 100;
function Pl(t) {
  const e = Er || Ys;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function Nl(t) {
  let e = bt + 1, n = it.length;
  for (; e < n; ) {
    const r = e + n >>> 1;
    ke(it[r]) < t ? e = r + 1 : n = r;
  }
  return e;
}
function Tr(t) {
  (!it.length || !it.includes(t, Je && t.allowRecurse ? bt + 1 : bt)) && (t.id == null ? it.push(t) : it.splice(Nl(t.id), 0, t), Zs());
}
function Zs() {
  !Je && !Jn && (Jn = !0, Er = Ys.then(ea));
}
function ta(t) {
  N(t) ? Zt.push(...t) : (!ct || !ct.includes(t, t.allowRecurse ? kt + 1 : kt)) && Zt.push(t), Zs();
}
function Ol(t) {
  if (Zt.length) {
    const e = [...new Set(Zt)];
    if (Zt.length = 0, ct) {
      ct.push(...e);
      return;
    }
    for (ct = e, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), ct.sort((n, r) => ke(n) - ke(r)), kt = 0; kt < ct.length; kt++)
      process.env.NODE_ENV !== "production" && na(t, ct[kt]) || ct[kt]();
    ct = null, kt = 0;
  }
}
const ke = (t) => t.id == null ? 1 / 0 : t.id, yl = (t, e) => {
  const n = ke(t) - ke(e);
  if (n === 0) {
    if (t.pre && !e.pre)
      return -1;
    if (e.pre && !t.pre)
      return 1;
  }
  return n;
};
function ea(t) {
  Jn = !1, Je = !0, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), it.sort(yl);
  const e = process.env.NODE_ENV !== "production" ? (n) => na(t, n) : mr;
  try {
    for (bt = 0; bt < it.length; bt++) {
      const n = it[bt];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && e(n))
          continue;
        Ut(n, null, 14);
      }
    }
  } finally {
    bt = 0, it.length = 0, Ol(t), Je = !1, Er = null, (it.length || Zt.length) && ea(t);
  }
}
function na(t, e) {
  if (!t.has(e))
    t.set(e, 1);
  else {
    const n = t.get(e);
    if (n > Al) {
      const r = e.ownerInstance, i = r && ca(r.type);
      return D(`Maximum recursive updates exceeded${i ? ` in component <${i}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`), !0;
    } else
      t.set(e, n + 1);
  }
}
const ue = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (Du().__VUE_HMR_RUNTIME__ = {
  createRecord: Nn(Rl),
  rerender: Nn(Fl),
  reload: Nn(Bl)
});
const je = /* @__PURE__ */ new Map();
function Rl(t, e) {
  return je.has(t) ? !1 : (je.set(t, {
    initialDef: he(e),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function he(t) {
  return la(t) ? t.__vccOpts : t;
}
function Fl(t, e) {
  const n = je.get(t);
  !n || (n.initialDef.render = e, [...n.instances].forEach((r) => {
    e && (r.render = e, he(r.type).render = e), r.renderCache = [], r.update();
  }));
}
function Bl(t, e) {
  const n = je.get(t);
  if (!n)
    return;
  e = he(e), yi(n.initialDef, e);
  const r = [...n.instances];
  for (const i of r) {
    const s = he(i.type);
    ue.has(s) || (s !== n.initialDef && yi(s, e), ue.add(s)), i.appContext.optionsCache.delete(i.type), i.ceReload ? (ue.add(s), i.ceReload(e.styles), ue.delete(s)) : i.parent ? Tr(i.parent.update) : i.appContext.reload ? i.appContext.reload() : typeof window < "u" && window.location.reload();
  }
  ta(() => {
    for (const i of r)
      ue.delete(he(i.type));
  });
}
function yi(t, e) {
  st(t, e);
  for (const n in t)
    n !== "__file" && !(n in e) && delete t[n];
}
function Nn(t) {
  return (e, n) => {
    try {
      return t(e, n);
    } catch {
    }
  };
}
let St = null, Ul = null;
const Vl = (t) => t.__isSuspense;
function Ll(t, e) {
  e && e.pendingBranch ? N(t) ? e.effects.push(...t) : e.effects.push(t) : ta(t);
}
const Ve = {};
function Hl(t, e, { immediate: n, deep: r, flush: i, onTrack: s, onTrigger: a } = ut) {
  process.env.NODE_ENV !== "production" && !e && (n !== void 0 && D('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), r !== void 0 && D('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const o = (I) => {
    D("Invalid watch source: ", I, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, u = te;
  let l, d = !1, f = !1;
  if (M(t) ? (l = () => t.value, d = Wn(t)) : Ft(t) ? (l = () => t, r = !0) : N(t) ? (f = !0, d = t.some((I) => Ft(I) || Wn(I)), l = () => t.map((I) => {
    if (M(I))
      return I.value;
    if (Ft(I))
      return jt(I);
    if (z(I))
      return Ut(I, u, 2);
    process.env.NODE_ENV !== "production" && o(I);
  })) : z(t) ? e ? l = () => Ut(t, u, 2) : l = () => {
    if (!(u && u.isUnmounted))
      return h && h(), Xn(t, u, 3, [m]);
  } : (l = mr, process.env.NODE_ENV !== "production" && o(t)), e && r) {
    const I = l;
    l = () => jt(I());
  }
  let h, m = (I) => {
    h = C.onStop = () => {
      Ut(I, u, 4);
    };
  }, v = f ? new Array(t.length).fill(Ve) : Ve;
  const S = () => {
    if (!!C.active)
      if (e) {
        const I = C.run();
        (r || d || (f ? I.some((w, y) => We(w, v[y])) : We(I, v))) && (h && h(), Xn(e, u, 3, [
          I,
          v === Ve ? void 0 : f && v[0] === Ve ? [] : v,
          m
        ]), v = I);
      } else
        C.run();
  };
  S.allowRecurse = !!e;
  let k;
  i === "sync" ? k = S : i === "post" ? k = () => Bi(S, u && u.suspense) : (S.pre = !0, u && (S.id = u.uid), k = () => Tr(S));
  const C = new qu(l, k);
  return process.env.NODE_ENV !== "production" && (C.onTrack = s, C.onTrigger = a), e ? n ? S() : v = C.run() : i === "post" ? Bi(C.run.bind(C), u && u.suspense) : C.run(), () => {
    C.stop(), u && u.scope && yu(u.scope.effects, C);
  };
}
function $l(t, e, n) {
  const r = this.proxy, i = at(t) ? t.includes(".") ? Dl(r, t) : () => r[t] : t.bind(r, r);
  let s;
  z(e) ? s = e : (s = e.handler, n = e);
  const a = te;
  Ui(this);
  const o = Hl(i, s.bind(r), n);
  return a ? Ui(a) : cf(), o;
}
function Dl(t, e) {
  const n = e.split(".");
  return () => {
    let r = t;
    for (let i = 0; i < n.length && r; i++)
      r = r[n[i]];
    return r;
  };
}
function jt(t, e) {
  if (!X(t) || t.__v_skip || (e = e || /* @__PURE__ */ new Set(), e.has(t)))
    return t;
  if (e.add(t), M(t))
    jt(t.value, e);
  else if (N(t))
    for (let n = 0; n < t.length; n++)
      jt(t[n], e);
  else if (Fu(t) || Yt(t))
    t.forEach((n) => {
      jt(n, e);
    });
  else if (Vu(t))
    for (const n in t)
      jt(t[n], e);
  return t;
}
const Ml = Symbol(), jn = (t) => t ? uf(t) ? lf(t) || t.proxy : jn(t.parent) : null, ge = /* @__PURE__ */ st(/* @__PURE__ */ Object.create(null), {
  $: (t) => t,
  $el: (t) => t.vnode.el,
  $data: (t) => t.data,
  $props: (t) => process.env.NODE_ENV !== "production" ? Ue(t.props) : t.props,
  $attrs: (t) => process.env.NODE_ENV !== "production" ? Ue(t.attrs) : t.attrs,
  $slots: (t) => process.env.NODE_ENV !== "production" ? Ue(t.slots) : t.slots,
  $refs: (t) => process.env.NODE_ENV !== "production" ? Ue(t.refs) : t.refs,
  $parent: (t) => jn(t.parent),
  $root: (t) => jn(t.root),
  $emit: (t) => t.emit,
  $options: (t) => __VUE_OPTIONS_API__ ? ql(t) : t.type,
  $forceUpdate: (t) => t.f || (t.f = () => Tr(t.update)),
  $nextTick: (t) => t.n || (t.n = Pl.bind(t.proxy)),
  $watch: (t) => __VUE_OPTIONS_API__ ? $l.bind(t) : mr
}), Gl = (t) => t === "_" || t === "$", On = (t, e) => t !== ut && !t.__isScriptSetup && R(t, e), zl = {
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
        if (On(r, e))
          return a[e] = 1, r[e];
        if (i !== ut && R(i, e))
          return a[e] = 2, i[e];
        if ((l = t.propsOptions[0]) && R(l, e))
          return a[e] = 3, s[e];
        if (n !== ut && R(n, e))
          return a[e] = 4, n[e];
        (!__VUE_OPTIONS_API__ || Kl) && (a[e] = 0);
      }
    }
    const d = ge[e];
    let f, h;
    if (d)
      return e === "$attrs" && (rt(t, "get", e), process.env.NODE_ENV !== "production" && void 0), d(t);
    if ((f = o.__cssModules) && (f = f[e]))
      return f;
    if (n !== ut && R(n, e))
      return a[e] = 4, n[e];
    if (h = u.config.globalProperties, R(h, e))
      return h[e];
    process.env.NODE_ENV !== "production" && St && (!at(e) || e.indexOf("__v") !== 0) && (i !== ut && Gl(e[0]) && R(i, e) ? D(`Property ${JSON.stringify(e)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : t === St && D(`Property ${JSON.stringify(e)} was accessed during render but is not defined on instance.`));
  },
  set({ _: t }, e, n) {
    const { data: r, setupState: i, ctx: s } = t;
    return On(i, e) ? (i[e] = n, !0) : process.env.NODE_ENV !== "production" && i.__isScriptSetup && R(i, e) ? (D(`Cannot mutate <script setup> binding "${e}" from Options API.`), !1) : r !== ut && R(r, e) ? (r[e] = n, !0) : R(t.props, e) ? (process.env.NODE_ENV !== "production" && D(`Attempting to mutate prop "${e}". Props are readonly.`), !1) : e[0] === "$" && e.slice(1) in t ? (process.env.NODE_ENV !== "production" && D(`Attempting to mutate public property "${e}". Properties starting with $ are reserved and readonly.`), !1) : (process.env.NODE_ENV !== "production" && e in t.appContext.config.globalProperties ? Object.defineProperty(s, e, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : s[e] = n, !0);
  },
  has({ _: { data: t, setupState: e, accessCache: n, ctx: r, appContext: i, propsOptions: s } }, a) {
    let o;
    return !!n[a] || t !== ut && R(t, a) || On(e, a) || (o = s[0]) && R(o, a) || R(r, a) || R(ge, a) || R(i.config.globalProperties, a);
  },
  defineProperty(t, e, n) {
    return n.get != null ? t._.accessCache[e] = 0 : R(n, "value") && this.set(t, e, n.value, null), Reflect.defineProperty(t, e, n);
  }
};
process.env.NODE_ENV !== "production" && (zl.ownKeys = (t) => (D("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(t)));
let Kl = !0;
function ql(t) {
  const e = t.type, { mixins: n, extends: r } = e, { mixins: i, optionsCache: s, config: { optionMergeStrategies: a } } = t.appContext, o = s.get(e);
  let u;
  return o ? u = o : !i.length && !n && !r ? u = e : (u = {}, i.length && i.forEach((l) => Qe(u, l, a, !0)), Qe(u, e, a)), X(e) && s.set(e, u), u;
}
function Qe(t, e, n, r = !1) {
  const { mixins: i, extends: s } = e;
  s && Qe(t, s, n, !0), i && i.forEach((a) => Qe(t, a, n, !0));
  for (const a in e)
    if (r && a === "expose")
      process.env.NODE_ENV !== "production" && D('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const o = Wl[a] || n && n[a];
      t[a] = o ? o(t[a], e[a]) : e[a];
    }
  return t;
}
const Wl = {
  data: Ri,
  props: Ot,
  emits: Ot,
  methods: Ot,
  computed: Ot,
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
  components: Ot,
  directives: Ot,
  watch: Jl,
  provide: Ri,
  inject: Xl
};
function Ri(t, e) {
  return e ? t ? function() {
    return st(z(t) ? t.call(this, this) : t, z(e) ? e.call(this, this) : e);
  } : e : t;
}
function Xl(t, e) {
  return Ot(Fi(t), Fi(e));
}
function Fi(t) {
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
function Ot(t, e) {
  return t ? st(st(/* @__PURE__ */ Object.create(null), t), e) : e;
}
function Jl(t, e) {
  if (!t)
    return e;
  if (!e)
    return t;
  const n = st(/* @__PURE__ */ Object.create(null), t);
  for (const r in e)
    n[r] = $(t[r], e[r]);
  return n;
}
function jl() {
  return {
    app: null,
    config: {
      isNativeTag: Pu,
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
const Bi = Ll, Ql = (t) => t.__isTeleport, ra = Symbol(process.env.NODE_ENV !== "production" ? "Fragment" : void 0), Yl = Symbol(process.env.NODE_ENV !== "production" ? "Text" : void 0), Zl = Symbol(process.env.NODE_ENV !== "production" ? "Comment" : void 0);
Symbol(process.env.NODE_ENV !== "production" ? "Static" : void 0);
let Qt = null;
function tf(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
const ef = (...t) => aa(...t), ia = "__vInternal", sa = ({ key: t }) => t ?? null, Me = ({ ref: t, ref_key: e, ref_for: n }) => t != null ? at(t) || M(t) || z(t) ? { i: St, r: t, k: e, f: !!n } : t : null;
function nf(t, e = null, n = null, r = 0, i = null, s = t === ra ? 0 : 1, a = !1, o = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && sa(e),
    ref: e && Me(e),
    scopeId: Ul,
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
    ctx: St
  };
  return o ? (xr(u, n), s & 128 && t.normalize(u)) : n && (u.shapeFlag |= at(n) ? 8 : 16), process.env.NODE_ENV !== "production" && u.key !== u.key && D("VNode created with invalid key (NaN). VNode type:", u.type), !a && Qt && (u.patchFlag > 0 || s & 6) && u.patchFlag !== 32 && Qt.push(u), u;
}
const rf = process.env.NODE_ENV !== "production" ? ef : aa;
function aa(t, e = null, n = null, r = 0, i = null, s = !1) {
  if ((!t || t === Ml) && (process.env.NODE_ENV !== "production" && !t && D(`Invalid vnode type when creating vnode: ${t}.`), t = Zl), tf(t)) {
    const o = Ye(t, e, !0);
    return n && xr(o, n), !s && Qt && (o.shapeFlag & 6 ? Qt[Qt.indexOf(t)] = o : Qt.push(o)), o.patchFlag |= -2, o;
  }
  if (la(t) && (t = t.__vccOpts), e) {
    e = sf(e);
    let { class: o, style: u } = e;
    o && !at(o) && (e.class = pr(o)), X(u) && (Xe(u) && !N(u) && (u = st({}, u)), e.style = dr(u));
  }
  const a = at(t) ? 1 : Vl(t) ? 128 : Ql(t) ? 64 : X(t) ? 4 : z(t) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && a & 4 && Xe(t) && (t = E(t), D("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `
Component that was made reactive: `, t)), nf(t, e, n, r, i, a, s, !0);
}
function sf(t) {
  return t ? Xe(t) || ia in t ? st({}, t) : t : null;
}
function Ye(t, e, n = !1) {
  const { props: r, ref: i, patchFlag: s, children: a } = t, o = e ? of(r || {}, e) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: o,
    key: o && sa(o),
    ref: e && e.ref ? n && i ? N(i) ? i.concat(Me(e)) : [i, Me(e)] : Me(e) : i,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && s === -1 && N(a) ? a.map(oa) : a,
    target: t.target,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    patchFlag: e && t.type !== ra ? s === -1 ? 16 : s | 16 : s,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: t.transition,
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && Ye(t.ssContent),
    ssFallback: t.ssFallback && Ye(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx
  };
}
function oa(t) {
  const e = Ye(t);
  return N(t.children) && (e.children = t.children.map(oa)), e;
}
function af(t = " ", e = 0) {
  return rf(Yl, null, t, e);
}
function xr(t, e) {
  let n = 0;
  const { shapeFlag: r } = t;
  if (e == null)
    e = null;
  else if (N(e))
    n = 16;
  else if (typeof e == "object")
    if (r & 65) {
      const i = e.default;
      i && (i._c && (i._d = !1), xr(t, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = e._;
      !i && !(ia in e) ? e._ctx = St : i === 3 && St && (St.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else
    z(e) ? (e = { default: e, _ctx: St }, n = 32) : (e = String(e), r & 64 ? (n = 16, e = [af(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function of(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    for (const i in r)
      if (i === "class")
        e.class !== r.class && (e.class = pr([e.class, r.class]));
      else if (i === "style")
        e.style = dr([e.style, r.style]);
      else if (Ou(i)) {
        const s = e[i], a = r[i];
        a && s !== a && !(N(s) && s.includes(a)) && (e[i] = s ? [].concat(s, a) : a);
      } else
        i !== "" && (e[i] = r[i]);
  }
  return e;
}
jl();
let te = null;
const Ui = (t) => {
  te = t, t.scope.on();
}, cf = () => {
  te && te.scope.off(), te = null;
};
function uf(t) {
  return t.vnode.shapeFlag & 4;
}
function lf(t) {
  if (t.exposed)
    return t.exposeProxy || (t.exposeProxy = new Proxy(Sl(vl(t.exposed)), {
      get(e, n) {
        if (n in e)
          return e[n];
        if (n in ge)
          return ge[n](t);
      },
      has(e, n) {
        return n in e || n in ge;
      }
    }));
}
const ff = /(?:^|[-_])(\w)/g, hf = (t) => t.replace(ff, (e) => e.toUpperCase()).replace(/[-_]/g, "");
function ca(t, e = !0) {
  return z(t) ? t.displayName || t.name : t.name || e && t.__name;
}
function ua(t, e, n = !1) {
  let r = ca(e);
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
  return r ? hf(r) : n ? "App" : "Anonymous";
}
function la(t) {
  return z(t) && "__vccOpts" in t;
}
Symbol(process.env.NODE_ENV !== "production" ? "ssrContext" : "");
function yn(t) {
  return !!(t && t.__v_isShallow);
}
function gf() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const t = { style: "color:#3ba776" }, e = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, r = { style: "color:#9d288c" }, i = {
    header(f) {
      return X(f) ? f.__isVue ? ["div", t, "VueInstance"] : M(f) ? [
        "div",
        {},
        ["span", t, d(f)],
        "<",
        o(f.value),
        ">"
      ] : Ft(f) ? [
        "div",
        {},
        ["span", t, yn(f) ? "ShallowReactive" : "Reactive"],
        "<",
        o(f),
        `>${Lt(f) ? " (readonly)" : ""}`
      ] : Lt(f) ? [
        "div",
        {},
        ["span", t, yn(f) ? "ShallowReadonly" : "Readonly"],
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
    f.type.props && f.props && h.push(a("props", E(f.props))), f.setupState !== ut && h.push(a("setup", f.setupState)), f.data !== ut && h.push(a("data", E(f.data)));
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
    return h = st({}, h), Object.keys(h).length ? [
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
    return typeof f == "number" ? ["span", e, f] : typeof f == "string" ? ["span", n, JSON.stringify(f)] : typeof f == "boolean" ? ["span", r, f] : X(f) ? ["object", { object: h ? E(f) : f }] : ["span", n, String(f)];
  }
  function u(f, h) {
    const m = f.type;
    if (z(m))
      return;
    const v = {};
    for (const S in f.ctx)
      l(m, S, h) && (v[S] = f.ctx[S]);
    return v;
  }
  function l(f, h, m) {
    const v = f[m];
    if (N(v) && v.includes(h) || X(v) && h in v || f.extends && l(f.extends, h, m) || f.mixins && f.mixins.some((S) => l(S, h, m)))
      return !0;
  }
  function d(f) {
    return yn(f) ? "ShallowRef" : f.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(i) : window.devtoolsFormatters = [i];
}
function df() {
  gf();
}
process.env.NODE_ENV !== "production" && df();
function pf(t) {
  const e = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"], n = t % 12;
  return e[n];
}
function Sh(t) {
  const e = Math.floor(t / 12) - 2;
  return pf(t) + e.toString();
}
const mf = /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i, vf = {
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
function wh(t) {
  const e = mf.exec(t);
  if (!e)
    return -1;
  const n = e[1], r = e[2];
  return vf[n.toLowerCase()] + (parseInt(r, 10) + 2) * 12;
}
function Vi(t, e, n, r) {
  return `${t} // ${e} // ${n} // ${r}`;
}
function kf(t, e, n) {
  return `${t} // ${e} // ${n}`;
}
function Ch(t) {
  const e = Ze(t);
  return kf(
    e.manufacturerName,
    e.pluginFormatName,
    e.name
  );
}
function Ze(t) {
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
function bf(t, e) {
  return t === e;
}
function Sf(t, e) {
  const n = Ze(t), r = Ze(e);
  if (A.keys(n).length !== A.keys(r).length)
    return !1;
  for (const i of A.keys(n))
    if (i !== "pluginVersion" && n[i] !== r[i])
      return !1;
  return !0;
}
class Ih {
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
function wf(t) {
  return t > -100 ? Math.exp((t - 6) * (1 / 20)) : 0;
}
function _h(t) {
  return t <= 0 ? -100 : 20 * Math.log10(t);
}
function Eh(t) {
  return t > 0 ? 20 * Math.log(t) + 6 : -100;
}
function Th(t) {
  return t > 0 ? Math.pow(10, (20 * Math.log(t) + 6) * (1 / 20)) : 0;
}
function xh(t) {
  return t > 0 ? Math.exp((20 * Math.log10(t) - 6) * (1 / 20)) : 0;
}
function Ah(t, e, n, r, i) {
  return (t - e) / (n - e) * (i - r) + r;
}
function Ph(t) {
  return 440 * Math.pow(2, (t - 69) / 12);
}
function Nh(t) {
  return Xe(t) || M(t) ? E(t) : t;
}
var Cf = /* @__PURE__ */ ((t) => (t[t.BassDrum2 = 35] = "BassDrum2", t[t.BassDrum1 = 36] = "BassDrum1", t[t.SideStick = 37] = "SideStick", t[t.SnareDrum1 = 38] = "SnareDrum1", t[t.HandClap = 39] = "HandClap", t[t.SnareDrum2 = 40] = "SnareDrum2", t[t.LowTom2 = 41] = "LowTom2", t[t.ClosedHiHat = 42] = "ClosedHiHat", t[t.LowTom1 = 43] = "LowTom1", t[t.PedalHiHat = 44] = "PedalHiHat", t[t.MidTom2 = 45] = "MidTom2", t[t.OpenHiHat = 46] = "OpenHiHat", t[t.MidTom1 = 47] = "MidTom1", t[t.HighTom2 = 48] = "HighTom2", t[t.CrashCymbal1 = 49] = "CrashCymbal1", t[t.HighTom1 = 50] = "HighTom1", t[t.RideCymbal1 = 51] = "RideCymbal1", t[t.ChineseCymbal = 52] = "ChineseCymbal", t[t.RideBell = 53] = "RideBell", t[t.Tambourine = 54] = "Tambourine", t[t.SplashCymbal = 55] = "SplashCymbal", t[t.Cowbell = 56] = "Cowbell", t[t.CrashCymbal2 = 57] = "CrashCymbal2", t[t.VibraSlap = 58] = "VibraSlap", t[t.RideCymbal2 = 59] = "RideCymbal2", t[t.HighBongo = 60] = "HighBongo", t[t.LowBongo = 61] = "LowBongo", t[t.MuteHighConga = 62] = "MuteHighConga", t[t.OpenHighConga = 63] = "OpenHighConga", t[t.LowConga = 64] = "LowConga", t[t.HighTimbale = 65] = "HighTimbale", t[t.LowTimbale = 66] = "LowTimbale", t[t.HighAgogo = 67] = "HighAgogo", t[t.LowAgogo = 68] = "LowAgogo", t[t.Cabasa = 69] = "Cabasa", t[t.Maracas = 70] = "Maracas", t[t.ShortWhistle = 71] = "ShortWhistle", t[t.LongWhistle = 72] = "LongWhistle", t[t.ShortGuiro = 73] = "ShortGuiro", t[t.LongGuiro = 74] = "LongGuiro", t[t.Claves = 75] = "Claves", t[t.HighWoodBlock = 76] = "HighWoodBlock", t[t.LowWoodBlock = 77] = "LowWoodBlock", t[t.MuteCuica = 78] = "MuteCuica", t[t.OpenCuica = 79] = "OpenCuica", t[t.MuteTriangle = 80] = "MuteTriangle", t[t.OpenTriangle = 81] = "OpenTriangle", t[t.Shaker = 82] = "Shaker", t))(Cf || {});
const Oh = ["wav", "mp3", "aiff", "flac", "ogg"];
class cn {
  name;
  manufacturerName;
  pluginFormatName;
  pluginVersion;
  isEnabled = !0;
  localInstanceIdInternal;
  base64StatesInternal;
  constructor(e, n, r, i) {
    this.name = e, this.manufacturerName = n, this.pluginFormatName = r, this.pluginVersion = i, this.localInstanceIdInternal = cn.generateAudioPluginInstanceIdInternal();
  }
  getTuneflowId() {
    return Vi(
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
    return bf(e, this.getTuneflowId());
  }
  matchesTfIdIgnoreVersion(e) {
    return Sf(e, this.getTuneflowId());
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
    return sn(10);
  }
  static DEFAULT_SYNTH_TFID = Vi("TuneFlow", "VST3", "TFSynth", "1.0.0");
}
class wt {
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
    if (!wt.isValidPitch(e))
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
    return wt.isNoteRangeValid(this.startTick, this.endTick);
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
    this.pitch = this.pitch + e, wt.isValidPitch(this.pitch) || this.deleteFromParent();
  }
  getId() {
    return this.idInternal;
  }
}
var fe = /* @__PURE__ */ ((t) => (t[t.MIDI_CLIP = 1] = "MIDI_CLIP", t[t.AUDIO_CLIP = 2] = "AUDIO_CLIP", t))(fe || {});
class x {
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
    id: i = x.generateClipIdInternal(),
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
      }, r = A.isNumber(r) ? Math.max(r, o.startTick) : o.startTick;
      const u = this.getAudioEndTick();
      (!A.isNumber(a) || u < a) && (a = u), this.clipStartTick = r, this.clipEndTick = a;
    } else if (n === 1) {
      if (this.clipStartTick = r, !A.isNumber(a))
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
    return x.getNotesInRange(this.notes, this.clipStartTick, this.clipEndTick);
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
        x.calculateScaledNewTick(r.getStartTick(), n, e)
      ), r.setEndTick(x.calculateScaledNewTick(r.getEndTick(), n, e));
    this.clipStartTick = x.calculateScaledNewTick(
      this.clipStartTick,
      n,
      e
    ), this.clipEndTick = x.calculateScaledNewTick(this.clipEndTick, n, e);
  }
  timeStretchAudioClipImpl(e, n, r) {
    if (this.type !== 2)
      return;
    const i = this.audioClipData, s = A.isNumber(i.speedRatio) && i.speedRatio ? i.speedRatio : 1, a = this.song.tickToSeconds(this.clipEndTick) - this.song.tickToSeconds(this.clipStartTick), u = (this.song.tickToSeconds(n) - this.song.tickToSeconds(e)) / a, l = s / u;
    x.validateAudioSpeedRatio(l);
    const d = this.song.tickToSeconds(i.startTick), f = this.song.tickToSeconds(r), h = (f - d) * u, m = f - h, v = this.song.secondsToTick(m);
    i.speedRatio = l, i.startTick = v, this.clipStartTick = e, this.clipEndTick = n;
  }
  static validateAudioSpeedRatio(e) {
    if (!A.isNumber(e) || e < x.MIN_AUDIO_SPEED_RATIO || e > x.MAX_AUDIO_SPEED_RATIO)
      throw new Error(
        `Speed ratio must be >= ${x.MIN_AUDIO_SPEED_RATIO} and <= ${x.MAX_AUDIO_SPEED_RATIO}, you are changing to ${e}`
      );
  }
  static calculateScaledNewTick(e, n, r) {
    const i = (n - e) * r;
    return Math.round(n - i);
  }
  getAudioPitchOffset() {
    return this.type !== 2 || !this.audioClipData || !A.isNumber(this.audioClipData.pitchOffset) ? 0 : this.audioClipData.pitchOffset;
  }
  setAudioPitchOffset(e) {
    this.type === 2 && (x.validateAudioPitchOffset(e), this.audioClipData.pitchOffset = e);
  }
  static validateAudioPitchOffset(e) {
    if (!A.isNumber(e) || e < x.MIN_AUDIO_PITCH_OFFSET || e > x.MAX_AUDIO_PITCH_OFFSET)
      throw new Error(
        `Pitch offset must be >= ${x.MIN_AUDIO_PITCH_OFFSET} and <= ${x.MAX_AUDIO_PITCH_OFFSET}, you are setting to ${e}`
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
    if (this.type !== 1 || !wt.isValidPitch(e) || !wt.isNoteRangeValid(r, i) || !wt.isNoteVelocityValid(n))
      return null;
    const o = new wt({
      pitch: e,
      velocity: n,
      startTick: r,
      endTick: i,
      id: this.getNextNoteIdInternal()
    });
    return r < this.clipStartTick && s && this.adjustClipLeft(r, a), i > this.clipEndTick && s && this.adjustClipRight(i, a), this.orderedInsertNote(this.notes, o), o;
  }
  getNoteIndexInternal(e) {
    const n = P.lt(
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
    const r = P.ge(
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
      A.isNumber(r) && (e = Math.min(e, r));
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
      const o = this.song, u = o.tickToSeconds(this.audioClipData.startTick), l = o.tickToSeconds(s), f = o.tickToSeconds(a) - l, h = l - u, m = o.tickToSeconds(this.clipStartTick + e), v = m - h, S = m + f;
      if (this.clipStartTick = r, this.clipEndTick = o.secondsToTick(S), this.audioClipData.startTick = o.secondsToTick(v), this.clipEndTick < 0) {
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
    if (!A.isNumber(e))
      return;
    const n = this.song.tickToSeconds(this.audioClipData.startTick);
    return this.song.secondsToTick(n + e);
  }
  static getNotesInRange(e, n, r) {
    return x.getNotesInRangeImpl(
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
      P.lt(
        e,
        i(n),
        (l, d) => s(l) - s(d)
      )
    );
    for (; e[o] && !x.isNoteInClip(
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
      P.gt(
        e,
        i(r),
        (l, d) => s(l) - s(d)
      )
    );
    for (; e[u] && !x.isNoteInClip(
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
    if (!x.isNoteInClip(e, n, r, i))
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
            }), u = x.getNotesInRange(this.notes, s, a);
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
    return sn(10);
  }
}
var Qn = /* @__PURE__ */ ((t) => (t[t.UNDEFINED = 0] = "UNDEFINED", t[t.VOLUME = 1] = "VOLUME", t[t.PAN = 2] = "PAN", t[t.AUDIO_PLUGIN = 3] = "AUDIO_PLUGIN", t))(Qn || {});
class et {
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
    return et.areAutomationTargetsEqual(
      this.getType(),
      e.getType(),
      this.getPluginInstanceId(),
      e.getPluginInstanceId(),
      this.getParamId(),
      e.getParamId()
    );
  }
  clone() {
    return new et(this.type, this.pluginInstanceId, this.paramId);
  }
  toTfAutomationTargetId() {
    return et.encodeAutomationTarget(this.type, this.pluginInstanceId, this.paramId);
  }
  static fromTfAutomationTargetId(e) {
    return et.decodeAutomationTarget(e);
  }
  static encodeAutomationTarget(e, n, r) {
    return e === 3 ? `${e}^^${n}^^${r}` : `${e}`;
  }
  static decodeAutomationTarget(e) {
    const n = e.split("^^");
    if (n.length === 0)
      throw new Error(`Invalid automation target id: ${e}`);
    const r = Number(n[0]);
    return n.length > 2 ? new et(r, n[1], n[2]) : new et(r);
  }
  static areAutomationTargetsEqual(e, n, r, i, s, a) {
    return et.encodeAutomationTarget(e, r, s) === et.encodeAutomationTarget(n, i, a);
  }
}
class ee {
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
    return ee.getPointsInRangeImpl(this.points, e, n);
  }
  static getPointsInRangeImpl(e, n, r) {
    const i = P.ge(
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
    return ee.orderedInsertPointInternal(this.points, i, r), i;
  }
  removePoints(e) {
    const n = new Set(e);
    for (let r = this.points.length - 1; r >= 0; r -= 1) {
      const i = this.points[r];
      n.has(i.id) && this.points.splice(r, 1);
    }
  }
  removePointsInRange(e, n) {
    const r = P.ge(
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
          ), d = P.gt(
            this.points,
            { tick: l },
            (f, h) => f.tick - h.tick
          );
          d < a && this.points.splice(d, a - d);
        } else if (n > 0) {
          const l = this.points[o].tick + n, d = P.lt(
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
    const e = new ee();
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
    const i = P.ge(
      e,
      n,
      (s, a) => s.tick - a.tick
    );
    for (; r && e[i] && e[i].tick === n.tick; )
      e.splice(i, 1);
    e.splice(i, 0, n);
  }
}
class Ar {
  targets = [];
  targetValues = {};
  getAutomationTargets() {
    return this.targets;
  }
  getAutomationTargetValues() {
    return this.targetValues;
  }
  getOrCreateAutomationValueById(e) {
    return this.targetValues[e] || (this.targetValues[e] = new ee()), this.targetValues[e];
  }
  getAutomationValueById(e) {
    return this.targetValues[e];
  }
  getAutomationValueByTarget(e) {
    const n = e.toTfAutomationTargetId();
    return this.getAutomationValueById(n);
  }
  addAutomation(e, n = 0) {
    A.isNumber(n) || (n = 0), this.targets.splice(n, 0, e);
    const r = e.toTfAutomationTargetId();
    this.getAutomationValueById(r) || (this.targetValues[r] = new ee());
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
    for (const n of A.keys(this.targetValues)) {
      const r = et.decodeAutomationTarget(n);
      r.getPluginInstanceId() === e && this.removeAutomation(r);
    }
  }
  removeAllPointsWithinRange(e, n) {
    for (const r of A.keys(this.targetValues))
      this.targetValues[r].removePointsInRange(e, n);
  }
  moveAllPointsWithinRange(e, n, r, i) {
    for (const s of A.keys(this.targetValues))
      this.targetValues[s].movePointsInRange(
        e,
        n,
        r,
        i,
        !1
      );
  }
  clone() {
    const e = new Ar();
    for (const n of this.targets)
      e.addAutomation(n.clone());
    for (const n of A.keys(this.targetValues)) {
      const r = this.targetValues[n];
      e.targetValues[n] = r.clone();
    }
    return e;
  }
}
var Jt = /* @__PURE__ */ ((t) => (t[t.MIDI_TRACK = 1] = "MIDI_TRACK", t[t.AUDIO_TRACK = 2] = "AUDIO_TRACK", t[t.MASTER_TRACK = 3] = "MASTER_TRACK", t[t.AUX_TRACK = 4] = "AUX_TRACK", t))(Jt || {});
class nt {
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
    uuid: r = nt.generateTrackIdInternal(),
    clips: i = [],
    instrument: s,
    suggestedInstruments: a = [],
    volume: o = wf(0),
    solo: u = !1,
    muted: l = !1,
    rank: d = 0,
    pan: f = 0
  }) {
    this.song = n, this.type = e, s ? this.insturment = s : e === 1 && (this.insturment = new de({
      program: 0,
      isDrum: !1
    })), e === 4 && (this.auxTrackData = new _f(), this.auxTrackData.setInputBusRank(1)), this.clips = [...i], this.suggestedInstruments = [...a], this.uuid = r, this.volume = o, this.solo = u, this.muted = l, this.rank = d, this.pan = f, this.automation = new Ar();
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
    this.type === 1 && (this.insturment = new de({ program: e, isDrum: n }));
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
    const r = new de({ program: e, isDrum: n });
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
    const n = Ze(e);
    return new cn(
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
    return A.keys(this.audioPlugins).length;
  }
  getAudioPluginAt(e) {
    return this.audioPlugins[e];
  }
  setAudioPluginAt(e, n, r = !0) {
    if (e > nt.MAX_NUM_EFFECTS_PLUGINS - 1)
      throw new Error(
        `The maximum number of effects plugin per track is ${nt.MAX_NUM_EFFECTS_PLUGINS}`
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
      for (const n of A.keys(this.audioPlugins)) {
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
    const r = [], i = P.lt(
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
    if (!A.isNumber(e))
      throw new Error("clipStartTick must be specified when creating a clip.");
    const i = n ?? e + 1;
    if (i < e)
      throw new Error(
        `clipEndTick must be greater or equal to clipStartTick, got clipStartTick: ${e}, clipEndTick: ${n}`
      );
    const s = new x({
      id: x.generateClipIdInternal(),
      type: fe.MIDI_CLIP,
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
    if (!A.isNumber(e))
      throw new Error("clipStartTick must be specified when creating a clip.");
    const s = new x({
      id: x.generateClipIdInternal(),
      type: fe.AUDIO_CLIP,
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
    if (e.getType() === fe.MIDI_CLIP) {
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
      if (e.getType() === fe.AUDIO_CLIP)
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
    const n = P.le(
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
    return this.automation.getAutomationTargets().length > 0 && !A.isEmpty(this.automation.getAutomationTargetValues());
  }
  getAuxTrackData() {
    return this.auxTrackData;
  }
  getSendCount() {
    return A.keys(this.sends).length;
  }
  getSendAt(e) {
    return this.sends[e];
  }
  removeSendAt(e) {
    delete this.sends[e];
  }
  setSendAt(e, n) {
    if (e >= nt.MAX_NUM_SENDS)
      throw new Error(`Maximum of supported sends is ${nt.MAX_NUM_SENDS}`);
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
    if (e !== Pr.Track)
      throw new Error("Non-track output type is not supported yet.");
    if (n === this.getId())
      throw new Error("Cannot set output to the track itself.");
    this.output = new Ef({
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
    return sn();
  }
  resolveClipConflictInternal(e, n, r) {
    const i = this.getClipsOverlappingWith(n, r);
    for (const s of i)
      s.getId() !== e && s.trimConflictPartInternal(n, r);
  }
  orderedInsertClipInternal(e) {
    const n = P.ge(
      this.clips,
      e,
      (r, i) => r.getClipStartTick() - i.getClipStartTick()
    );
    this.clips.splice(n, 0, e);
  }
}
var If = /* @__PURE__ */ ((t) => (t[t.Undefined = 0] = "Undefined", t[t.PreFader = 1] = "PreFader", t[t.PostFader = 2] = "PostFader", t))(If || {});
class tn {
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
    this.outputBusRank = e, this.gainLevel = tn.checkGainLevel(n), this.position = r, this.muted = A.isBoolean(i) ? i : !1;
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
    this.gainLevel = tn.checkGainLevel(e);
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
class de {
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
    return new de({
      program: this.program,
      isDrum: this.isDrum
    });
  }
}
class _f {
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
var Pr = /* @__PURE__ */ ((t) => (t[t.Undefined = 0] = "Undefined", t[t.Device = 1] = "Device", t[t.Track = 2] = "Track", t))(Pr || {});
class Ef {
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
var Tf = /* @__PURE__ */ ((t) => (t[t.AcousticGrandPiano = 0] = "AcousticGrandPiano", t[t.BrightAcousticPiano = 1] = "BrightAcousticPiano", t[t.ElectricGrandPiano = 2] = "ElectricGrandPiano", t[t.HonkyTonkPiano = 3] = "HonkyTonkPiano", t[t.ElectricPiano1 = 4] = "ElectricPiano1", t[t.ElectricPiano2 = 5] = "ElectricPiano2", t[t.Harpsichord = 6] = "Harpsichord", t[t.Clavinet = 7] = "Clavinet", t[t.Celesta = 8] = "Celesta", t[t.Glockenspiel = 9] = "Glockenspiel", t[t.Musicalbox = 10] = "Musicalbox", t[t.Vibraphone = 11] = "Vibraphone", t[t.Marimba = 12] = "Marimba", t[t.Xylophone = 13] = "Xylophone", t[t.TubularBell = 14] = "TubularBell", t[t.Dulcimer = 15] = "Dulcimer", t[t.DrawbarOrgan = 16] = "DrawbarOrgan", t[t.PercussiveOrgan = 17] = "PercussiveOrgan", t[t.RockOrgan = 18] = "RockOrgan", t[t.Churchorgan = 19] = "Churchorgan", t[t.Reedorgan = 20] = "Reedorgan", t[t.Accordion = 21] = "Accordion", t[t.Harmonica = 22] = "Harmonica", t[t.TangoAccordion = 23] = "TangoAccordion", t[t.AcousticGuitarNylon = 24] = "AcousticGuitarNylon", t[t.AcousticGuitarSteel = 25] = "AcousticGuitarSteel", t[t.ElectricGuitarJazz = 26] = "ElectricGuitarJazz", t[t.ElectricGuitarClean = 27] = "ElectricGuitarClean", t[t.ElectricGuitarMuted = 28] = "ElectricGuitarMuted", t[t.OverdrivenGuitar = 29] = "OverdrivenGuitar", t[t.DistortionGuitar = 30] = "DistortionGuitar", t[t.Guitarharmonics = 31] = "Guitarharmonics", t[t.AcousticBass = 32] = "AcousticBass", t[t.ElectricBassFinger = 33] = "ElectricBassFinger", t[t.ElectricBassPick = 34] = "ElectricBassPick", t[t.FretlessBass = 35] = "FretlessBass", t[t.SlapBass1 = 36] = "SlapBass1", t[t.SlapBass2 = 37] = "SlapBass2", t[t.SynthBass1 = 38] = "SynthBass1", t[t.SynthBass2 = 39] = "SynthBass2", t[t.Violin = 40] = "Violin", t[t.Viola = 41] = "Viola", t[t.Cello = 42] = "Cello", t[t.Contrabass = 43] = "Contrabass", t[t.TremoloStrings = 44] = "TremoloStrings", t[t.PizzicatoStrings = 45] = "PizzicatoStrings", t[t.OrchestralHarp = 46] = "OrchestralHarp", t[t.Timpani = 47] = "Timpani", t[t.StringEnsemble1 = 48] = "StringEnsemble1", t[t.StringEnsemble2 = 49] = "StringEnsemble2", t[t.SynthStrings1 = 50] = "SynthStrings1", t[t.SynthStrings2 = 51] = "SynthStrings2", t[t.VoiceAahs = 52] = "VoiceAahs", t[t.VoiceOohs = 53] = "VoiceOohs", t[t.SynthVoice = 54] = "SynthVoice", t[t.OrchestraHit = 55] = "OrchestraHit", t[t.Trumpet = 56] = "Trumpet", t[t.Trombone = 57] = "Trombone", t[t.Tuba = 58] = "Tuba", t[t.MutedTrumpet = 59] = "MutedTrumpet", t[t.Frenchhorn = 60] = "Frenchhorn", t[t.BrassSection = 61] = "BrassSection", t[t.SynthBrass1 = 62] = "SynthBrass1", t[t.SynthBrass2 = 63] = "SynthBrass2", t[t.SopranoSax = 64] = "SopranoSax", t[t.AltoSax = 65] = "AltoSax", t[t.TenorSax = 66] = "TenorSax", t[t.BaritoneSax = 67] = "BaritoneSax", t[t.Oboe = 68] = "Oboe", t[t.EnglishHorn = 69] = "EnglishHorn", t[t.Bassoon = 70] = "Bassoon", t[t.Clarinet = 71] = "Clarinet", t[t.Piccolo = 72] = "Piccolo", t[t.Flute = 73] = "Flute", t[t.Recorder = 74] = "Recorder", t[t.PanFlute = 75] = "PanFlute", t[t.BlownBottle = 76] = "BlownBottle", t[t.Shakuhachi = 77] = "Shakuhachi", t[t.Whistle = 78] = "Whistle", t[t.Ocarina = 79] = "Ocarina", t[t.Lead1Square = 80] = "Lead1Square", t[t.Lead2Sawtooth = 81] = "Lead2Sawtooth", t[t.Lead3Calliope = 82] = "Lead3Calliope", t[t.Lead4Chiff = 83] = "Lead4Chiff", t[t.Lead5Charang = 84] = "Lead5Charang", t[t.Lead6Voice = 85] = "Lead6Voice", t[t.Lead7Fifths = 86] = "Lead7Fifths", t[t.Lead8BassLead = 87] = "Lead8BassLead", t[t.Pad1NewAge = 88] = "Pad1NewAge", t[t.Pad2Warm = 89] = "Pad2Warm", t[t.Pad3PolySynth = 90] = "Pad3PolySynth", t[t.Pad4Choir = 91] = "Pad4Choir", t[t.Pad5Bowed = 92] = "Pad5Bowed", t[t.Pad6Metallic = 93] = "Pad6Metallic", t[t.Pad7Halo = 94] = "Pad7Halo", t[t.Pad8Sweep = 95] = "Pad8Sweep", t[t.FX1Rain = 96] = "FX1Rain", t[t.FX2Soundtrack = 97] = "FX2Soundtrack", t[t.FX3Crystal = 98] = "FX3Crystal", t[t.FX4Atmosphere = 99] = "FX4Atmosphere", t[t.FX5Brightness = 100] = "FX5Brightness", t[t.FX6Goblins = 101] = "FX6Goblins", t[t.FX7Echoes = 102] = "FX7Echoes", t[t.FX8SciFi = 103] = "FX8SciFi", t[t.Sitar = 104] = "Sitar", t[t.Banjo = 105] = "Banjo", t[t.Shamisen = 106] = "Shamisen", t[t.Guzheng = 107] = "Guzheng", t[t.Kalimba = 108] = "Kalimba", t[t.Bagpipe = 109] = "Bagpipe", t[t.Fiddle = 110] = "Fiddle", t[t.Shanai = 111] = "Shanai", t[t.TinkleBell = 112] = "TinkleBell", t[t.Agogo = 113] = "Agogo", t[t.SteelDrums = 114] = "SteelDrums", t[t.Woodblock = 115] = "Woodblock", t[t.TaikoDrum = 116] = "TaikoDrum", t[t.MelodicTom = 117] = "MelodicTom", t[t.SynthDrum = 118] = "SynthDrum", t[t.ReverseCymbal = 119] = "ReverseCymbal", t[t.GuitarFretNoise = 120] = "GuitarFretNoise", t[t.BreathNoise = 121] = "BreathNoise", t[t.Seashore = 122] = "Seashore", t[t.BirdTweet = 123] = "BirdTweet", t[t.TelephoneRing = 124] = "TelephoneRing", t[t.Helicopter = 125] = "Helicopter", t[t.Applause = 126] = "Applause", t[t.Gunshot = 127] = "Gunshot", t))(Tf || {}), xf = /* @__PURE__ */ ((t) => (t[t.BassDrum2 = 35] = "BassDrum2", t[t.BassDrum1 = 36] = "BassDrum1", t[t.SideStick = 37] = "SideStick", t[t.SnareDrum1 = 38] = "SnareDrum1", t[t.HandClap = 39] = "HandClap", t[t.SnareDrum2 = 40] = "SnareDrum2", t[t.LowTom2 = 41] = "LowTom2", t[t.ClosedHiHat = 42] = "ClosedHiHat", t[t.LowTom1 = 43] = "LowTom1", t[t.PedalHiHat = 44] = "PedalHiHat", t[t.MidTom2 = 45] = "MidTom2", t[t.OpenHiHat = 46] = "OpenHiHat", t[t.MidTom1 = 47] = "MidTom1", t[t.HighTom2 = 48] = "HighTom2", t[t.CrashCymbal1 = 49] = "CrashCymbal1", t[t.HighTom1 = 50] = "HighTom1", t[t.RideCymbal1 = 51] = "RideCymbal1", t[t.ChineseCymbal = 52] = "ChineseCymbal", t[t.RideBell = 53] = "RideBell", t[t.Tambourine = 54] = "Tambourine", t[t.SplashCymbal = 55] = "SplashCymbal", t[t.Cowbell = 56] = "Cowbell", t[t.CrashCymbal2 = 57] = "CrashCymbal2", t[t.VibraSlap = 58] = "VibraSlap", t[t.RideCymbal2 = 59] = "RideCymbal2", t[t.HighBongo = 60] = "HighBongo", t[t.LowBongo = 61] = "LowBongo", t[t.MuteHighConga = 62] = "MuteHighConga", t[t.OpenHighConga = 63] = "OpenHighConga", t[t.LowConga = 64] = "LowConga", t[t.HighTimbale = 65] = "HighTimbale", t[t.LowTimbale = 66] = "LowTimbale", t[t.HighAgogo = 67] = "HighAgogo", t[t.LowAgogo = 68] = "LowAgogo", t[t.Cabasa = 69] = "Cabasa", t[t.Maracas = 70] = "Maracas", t[t.ShortWhistle = 71] = "ShortWhistle", t[t.LongWhistle = 72] = "LongWhistle", t[t.ShortGuiro = 73] = "ShortGuiro", t[t.LongGuiro = 74] = "LongGuiro", t[t.Claves = 75] = "Claves", t[t.HighWoodBlock = 76] = "HighWoodBlock", t[t.LowWoodBlock = 77] = "LowWoodBlock", t[t.MuteCuica = 78] = "MuteCuica", t[t.OpenCuica = 79] = "OpenCuica", t[t.MuteTriangle = 80] = "MuteTriangle", t[t.OpenTriangle = 81] = "OpenTriangle", t[t.Shaker = 82] = "Shaker", t))(xf || {}), fa = {}, un = {};
function Af(t) {
  var e = new K(t), n = e.readChunk();
  if (n.id != "MThd")
    throw "Bad MIDI file.  Expected 'MHdr', got: '" + n.id + "'";
  for (var r = Pf(n.data), i = [], s = 0; !e.eof() && s < r.numTracks; s++) {
    var a = e.readChunk();
    if (a.id != "MTrk")
      throw "Bad MIDI file.  Expected 'MTrk', got: '" + a.id + "'";
    var o = Nf(a.data);
    i.push(o);
  }
  return {
    header: r,
    tracks: i
  };
}
function Pf(t) {
  var e = new K(t), n = e.readUInt16(), r = e.readUInt16(), i = {
    format: n,
    numTracks: r
  }, s = e.readUInt16();
  return s & 32768 ? (i.framesPerSecond = 256 - (s >> 8), i.ticksPerFrame = s & 255) : i.ticksPerBeat = s, i;
}
function Nf(t) {
  for (var e = new K(t), n = []; !e.eof(); ) {
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
function K(t) {
  this.buffer = t, this.bufferLen = this.buffer.length, this.pos = 0;
}
K.prototype.eof = function() {
  return this.pos >= this.bufferLen;
};
K.prototype.readUInt8 = function() {
  var t = this.buffer[this.pos];
  return this.pos += 1, t;
};
K.prototype.readInt8 = function() {
  var t = this.readUInt8();
  return t & 128 ? t - 256 : t;
};
K.prototype.readUInt16 = function() {
  var t = this.readUInt8(), e = this.readUInt8();
  return (t << 8) + e;
};
K.prototype.readInt16 = function() {
  var t = this.readUInt16();
  return t & 32768 ? t - 65536 : t;
};
K.prototype.readUInt24 = function() {
  var t = this.readUInt8(), e = this.readUInt8(), n = this.readUInt8();
  return (t << 16) + (e << 8) + n;
};
K.prototype.readInt24 = function() {
  var t = this.readUInt24();
  return t & 8388608 ? t - 16777216 : t;
};
K.prototype.readUInt32 = function() {
  var t = this.readUInt8(), e = this.readUInt8(), n = this.readUInt8(), r = this.readUInt8();
  return (t << 24) + (e << 16) + (n << 8) + r;
};
K.prototype.readBytes = function(t) {
  var e = this.buffer.slice(this.pos, this.pos + t);
  return this.pos += t, e;
};
K.prototype.readString = function(t) {
  var e = this.readBytes(t);
  return String.fromCharCode.apply(null, e);
};
K.prototype.readVarInt = function() {
  for (var t = 0; !this.eof(); ) {
    var e = this.readUInt8();
    if (e & 128)
      t += e & 127, t <<= 7;
    else
      return t + e;
  }
  return t;
};
K.prototype.readChunk = function() {
  var t = this.readString(4), e = this.readUInt32(), n = this.readBytes(e);
  return {
    id: t,
    length: e,
    data: n
  };
};
var Of = Af;
function yf(t, e) {
  if (typeof t != "object")
    throw "Invalid MIDI data";
  e = e || {};
  var n = t.header || {}, r = t.tracks || [], i, s = r.length, a = new B();
  for (Rf(a, n, s), i = 0; i < s; i++)
    Ff(a, r[i], e);
  return a.buffer;
}
function Rf(t, e, n) {
  var r = e.format == null ? 1 : e.format, i = 128;
  e.timeDivision ? i = e.timeDivision : e.ticksPerFrame && e.framesPerSecond ? i = -(e.framesPerSecond & 255) << 8 | e.ticksPerFrame & 255 : e.ticksPerBeat && (i = e.ticksPerBeat & 32767);
  var s = new B();
  s.writeUInt16(r), s.writeUInt16(n), s.writeUInt16(i), t.writeChunk("MThd", s.buffer);
}
function Ff(t, e, n) {
  var r = new B(), i, s = e.length, a = null;
  for (i = 0; i < s; i++)
    (n.running === !1 || !n.running && !e[i].running) && (a = null), a = Bf(r, e[i], a, n.useByte9ForNoteOff);
  t.writeChunk("MTrk", r.buffer);
}
function Bf(t, e, n, r) {
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
      var m = 8192 + e.value, v = m & 127, S = m >> 7 & 127;
      t.writeUInt8(v), t.writeUInt8(S);
      break;
    default:
      throw "Unrecognized event type: " + i;
  }
  return u;
}
function B() {
  this.buffer = [];
}
B.prototype.writeUInt8 = function(t) {
  this.buffer.push(t & 255);
};
B.prototype.writeInt8 = B.prototype.writeUInt8;
B.prototype.writeUInt16 = function(t) {
  var e = t >> 8 & 255, n = t & 255;
  this.writeUInt8(e), this.writeUInt8(n);
};
B.prototype.writeInt16 = B.prototype.writeUInt16;
B.prototype.writeUInt24 = function(t) {
  var e = t >> 16 & 255, n = t >> 8 & 255, r = t & 255;
  this.writeUInt8(e), this.writeUInt8(n), this.writeUInt8(r);
};
B.prototype.writeInt24 = B.prototype.writeUInt24;
B.prototype.writeUInt32 = function(t) {
  var e = t >> 24 & 255, n = t >> 16 & 255, r = t >> 8 & 255, i = t & 255;
  this.writeUInt8(e), this.writeUInt8(n), this.writeUInt8(r), this.writeUInt8(i);
};
B.prototype.writeInt32 = B.prototype.writeUInt32;
B.prototype.writeBytes = function(t) {
  this.buffer = this.buffer.concat(Array.prototype.slice.call(t, 0));
};
B.prototype.writeString = function(t) {
  var e, n = t.length, r = [];
  for (e = 0; e < n; e++)
    r.push(t.codePointAt(e));
  this.writeBytes(r);
};
B.prototype.writeVarInt = function(t) {
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
B.prototype.writeChunk = function(t, e) {
  this.writeString(t), this.writeUInt32(e.length), this.writeBytes(e);
};
var Uf = yf;
un.parseMidi = Of;
un.writeMidi = Uf;
var en = {}, Ht = {};
Object.defineProperty(Ht, "__esModule", { value: !0 });
Ht.insert = Ht.search = void 0;
function ha(t, e, n) {
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
Ht.search = ha;
function Vf(t, e, n) {
  if (n === void 0 && (n = "ticks"), t.length) {
    var r = ha(t, e[n], n);
    t.splice(r + 1, 0, e);
  } else
    t.push(e);
}
Ht.insert = Vf;
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.Header = t.keySignatureKeys = void 0;
  var e = Ht, n = /* @__PURE__ */ new WeakMap();
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
})(en);
var be = {}, Nr = {};
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
})(Nr);
var ln = {};
Object.defineProperty(ln, "__esModule", { value: !0 });
ln.createControlChanges = void 0;
var Le = Nr;
function Lf() {
  return new Proxy({}, {
    get: function(t, e) {
      if (t[e])
        return t[e];
      if (Le.controlChangeIds.hasOwnProperty(e))
        return t[Le.controlChangeIds[e]];
    },
    set: function(t, e, n) {
      return Le.controlChangeIds.hasOwnProperty(e) ? t[Le.controlChangeIds[e]] = n : t[e] = n, !0;
    }
  });
}
ln.createControlChanges = Lf;
var fn = {};
Object.defineProperty(fn, "__esModule", { value: !0 });
fn.PitchBend = void 0;
var Rn = /* @__PURE__ */ new WeakMap(), Hf = function() {
  function t(e, n) {
    Rn.set(this, n), this.ticks = e.absoluteTime, this.value = e.value;
  }
  return Object.defineProperty(t.prototype, "time", {
    get: function() {
      var e = Rn.get(this);
      return e.ticksToSeconds(this.ticks);
    },
    set: function(e) {
      var n = Rn.get(this);
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
fn.PitchBend = Hf;
var hn = {}, Ct = {};
Object.defineProperty(Ct, "__esModule", { value: !0 });
Ct.DrumKitByPatchID = Ct.InstrumentFamilyByID = Ct.instrumentByPatchID = void 0;
Ct.instrumentByPatchID = [
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
Ct.InstrumentFamilyByID = [
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
Ct.DrumKitByPatchID = {
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
Object.defineProperty(hn, "__esModule", { value: !0 });
hn.Instrument = void 0;
var He = Ct, Li = /* @__PURE__ */ new WeakMap(), $f = function() {
  function t(e, n) {
    if (this.number = 0, Li.set(this, n), this.number = 0, e) {
      var r = e.find(function(i) {
        return i.type === "programChange";
      });
      r && (this.number = r.programNumber);
    }
  }
  return Object.defineProperty(t.prototype, "name", {
    get: function() {
      return this.percussion ? He.DrumKitByPatchID[this.number] : He.instrumentByPatchID[this.number];
    },
    set: function(e) {
      var n = He.instrumentByPatchID.indexOf(e);
      n !== -1 && (this.number = n);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "family", {
    get: function() {
      return this.percussion ? "drums" : He.InstrumentFamilyByID[Math.floor(this.number / 8)];
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "percussion", {
    get: function() {
      var e = Li.get(this);
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
hn.Instrument = $f;
var gn = {};
Object.defineProperty(gn, "__esModule", { value: !0 });
gn.Note = void 0;
function Df(t) {
  var e = Math.floor(t / 12) - 1;
  return ga(t) + e.toString();
}
function ga(t) {
  var e = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"], n = t % 12;
  return e[n];
}
function Mf(t) {
  var e = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  return e.indexOf(t);
}
var Gf = function() {
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
}(), Xt = /* @__PURE__ */ new WeakMap(), zf = function() {
  function t(e, n, r) {
    Xt.set(this, r), this.midi = e.midi, this.velocity = e.velocity, this.noteOffVelocity = n.velocity, this.ticks = e.ticks, this.durationTicks = n.ticks - e.ticks;
  }
  return Object.defineProperty(t.prototype, "name", {
    get: function() {
      return Df(this.midi);
    },
    set: function(e) {
      this.midi = Gf(e);
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
      return ga(this.midi);
    },
    set: function(e) {
      this.midi = 12 * (this.octave + 1) + Mf(e);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "duration", {
    get: function() {
      var e = Xt.get(this);
      return e.ticksToSeconds(this.ticks + this.durationTicks) - e.ticksToSeconds(this.ticks);
    },
    set: function(e) {
      var n = Xt.get(this), r = n.secondsToTicks(this.time + e);
      this.durationTicks = r - this.ticks;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "time", {
    get: function() {
      var e = Xt.get(this);
      return e.ticksToSeconds(this.ticks);
    },
    set: function(e) {
      var n = Xt.get(this);
      this.ticks = n.secondsToTicks(e);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "bars", {
    get: function() {
      var e = Xt.get(this);
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
gn.Note = zf;
Object.defineProperty(be, "__esModule", { value: !0 });
be.Track = void 0;
var Fn = Ht, Kf = Nr, qf = ln, Wf = fn, Hi = hn, Xf = gn, $e = /* @__PURE__ */ new WeakMap(), Jf = function() {
  function t(e, n) {
    var r = this;
    if (this.name = "", this.notes = [], this.controlChanges = (0, qf.createControlChanges)(), this.pitchBends = [], $e.set(this, n), e) {
      var i = e.find(function(h) {
        return h.type === "trackName";
      });
      this.name = i ? i.text : "";
    }
    if (this.instrument = new Hi.Instrument(e, this), this.channel = 0, e) {
      for (var s = e.filter(function(h) {
        return h.type === "noteOn";
      }), a = e.filter(function(h) {
        return h.type === "noteOff";
      }), o = function() {
        var h = s.shift();
        u.channel = h.channel;
        var m = a.findIndex(function(S) {
          return S.noteNumber === h.noteNumber && S.absoluteTime >= h.absoluteTime;
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
    var n = $e.get(this), r = new Xf.Note({
      midi: 0,
      ticks: 0,
      velocity: 1
    }, {
      ticks: 0,
      velocity: 0
    }, n);
    return Object.assign(r, e), (0, Fn.insert)(this.notes, r, "ticks"), this;
  }, t.prototype.addCC = function(e) {
    var n = $e.get(this), r = new Kf.ControlChange({
      controllerType: e.number
    }, n);
    return delete e.number, Object.assign(r, e), Array.isArray(this.controlChanges[r.number]) || (this.controlChanges[r.number] = []), (0, Fn.insert)(this.controlChanges[r.number], r, "ticks"), this;
  }, t.prototype.addPitchBend = function(e) {
    var n = $e.get(this), r = new Wf.PitchBend({}, n);
    return Object.assign(r, e), (0, Fn.insert)(this.pitchBends, r, "ticks"), this;
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
    this.name = e.name, this.channel = e.channel, this.instrument = new Hi.Instrument(void 0, this), this.instrument.fromJSON(e.instrument), e.endOfTrackTicks !== void 0 && (this.endOfTrackTicks = e.endOfTrackTicks);
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
be.Track = Jf;
var dn = {};
function jf(t) {
  var e = [];
  return da(t, e), e;
}
function da(t, e) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    Array.isArray(r) ? da(r, e) : e.push(r);
  }
}
const Qf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  flatten: jf
}, Symbol.toStringTag, { value: "Module" })), Yf = /* @__PURE__ */ ku(Qf);
var vt = lt && lt.__spreadArray || function(t, e, n) {
  if (n || arguments.length === 2)
    for (var r = 0, i = e.length, s; r < i; r++)
      (s || !(r in e)) && (s || (s = Array.prototype.slice.call(e, 0, r)), s[r] = e[r]);
  return t.concat(s || Array.prototype.slice.call(e));
};
Object.defineProperty(dn, "__esModule", { value: !0 });
dn.encode = void 0;
var Zf = un, th = en, eh = Yf;
function nh(t, e) {
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
function rh(t) {
  return (0, eh.flatten)(t.notes.map(function(e) {
    return nh(e, t.channel);
  }));
}
function ih(t, e) {
  return {
    absoluteTime: t.ticks,
    channel: e,
    controllerType: t.number,
    deltaTime: 0,
    type: "controller",
    value: Math.floor(t.value * 127)
  };
}
function sh(t) {
  for (var e = [], n = 0; n < 127; n++)
    t.controlChanges.hasOwnProperty(n) && t.controlChanges[n].forEach(function(r) {
      e.push(ih(r, t.channel));
    });
  return e;
}
function ah(t, e) {
  return {
    absoluteTime: t.ticks,
    channel: e,
    deltaTime: 0,
    type: "pitchBend",
    value: t.value
  };
}
function oh(t) {
  var e = [];
  return t.pitchBends.forEach(function(n) {
    e.push(ah(n, t.channel));
  }), e;
}
function ch(t) {
  return {
    absoluteTime: 0,
    channel: t.channel,
    deltaTime: 0,
    programNumber: t.instrument.number,
    type: "programChange"
  };
}
function uh(t) {
  return {
    absoluteTime: 0,
    deltaTime: 0,
    meta: !0,
    text: t,
    type: "trackName"
  };
}
function lh(t) {
  return {
    absoluteTime: t.ticks,
    deltaTime: 0,
    meta: !0,
    microsecondsPerBeat: Math.floor(6e7 / t.bpm),
    type: "setTempo"
  };
}
function fh(t) {
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
function hh(t) {
  var e = th.keySignatureKeys.indexOf(t.key);
  return {
    absoluteTime: t.ticks,
    deltaTime: 0,
    key: e + 7,
    meta: !0,
    scale: t.scale === "major" ? 0 : 1,
    type: "keySignature"
  };
}
function gh(t) {
  return {
    absoluteTime: t.ticks,
    deltaTime: 0,
    meta: !0,
    text: t.text,
    type: t.type
  };
}
function dh(t) {
  var e = {
    header: {
      format: 1,
      numTracks: t.tracks.length + 1,
      ticksPerBeat: t.header.ppq
    },
    tracks: vt([
      vt(vt(vt(vt([
        {
          absoluteTime: 0,
          deltaTime: 0,
          meta: !0,
          text: t.header.name,
          type: "trackName"
        }
      ], t.header.keySignatures.map(function(n) {
        return hh(n);
      }), !0), t.header.meta.map(function(n) {
        return gh(n);
      }), !0), t.header.tempos.map(function(n) {
        return lh(n);
      }), !0), t.header.timeSignatures.map(function(n) {
        return fh(n);
      }), !0)
    ], t.tracks.map(function(n) {
      return vt(vt(vt([
        uh(n.name),
        ch(n)
      ], rh(n), !0), sh(n), !0), oh(n), !0);
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
  }), new Uint8Array((0, Zf.writeMidi)(e));
}
dn.encode = dh;
(function(t) {
  var e = lt && lt.__awaiter || function(f, h, m, v) {
    function S(k) {
      return k instanceof m ? k : new m(function(C) {
        C(k);
      });
    }
    return new (m || (m = Promise))(function(k, C) {
      function O(y) {
        try {
          w(v.next(y));
        } catch (ot) {
          C(ot);
        }
      }
      function I(y) {
        try {
          w(v.throw(y));
        } catch (ot) {
          C(ot);
        }
      }
      function w(y) {
        y.done ? k(y.value) : S(y.value).then(O, I);
      }
      w((v = v.apply(f, h || [])).next());
    });
  }, n = lt && lt.__generator || function(f, h) {
    var m = { label: 0, sent: function() {
      if (k[0] & 1)
        throw k[1];
      return k[1];
    }, trys: [], ops: [] }, v, S, k, C;
    return C = { next: O(0), throw: O(1), return: O(2) }, typeof Symbol == "function" && (C[Symbol.iterator] = function() {
      return this;
    }), C;
    function O(w) {
      return function(y) {
        return I([w, y]);
      };
    }
    function I(w) {
      if (v)
        throw new TypeError("Generator is already executing.");
      for (; m; )
        try {
          if (v = 1, S && (k = w[0] & 2 ? S.return : w[0] ? S.throw || ((k = S.return) && k.call(S), 0) : S.next) && !(k = k.call(S, w[1])).done)
            return k;
          switch (S = 0, k && (w = [w[0] & 2, k.value]), w[0]) {
            case 0:
            case 1:
              k = w;
              break;
            case 4:
              return m.label++, { value: w[1], done: !1 };
            case 5:
              m.label++, S = w[1], w = [0];
              continue;
            case 7:
              w = m.ops.pop(), m.trys.pop();
              continue;
            default:
              if (k = m.trys, !(k = k.length > 0 && k[k.length - 1]) && (w[0] === 6 || w[0] === 2)) {
                m = 0;
                continue;
              }
              if (w[0] === 3 && (!k || w[1] > k[0] && w[1] < k[3])) {
                m.label = w[1];
                break;
              }
              if (w[0] === 6 && m.label < k[1]) {
                m.label = k[1], k = w;
                break;
              }
              if (k && m.label < k[2]) {
                m.label = k[2], m.ops.push(w);
                break;
              }
              k[2] && m.ops.pop(), m.trys.pop();
              continue;
          }
          w = h.call(f, m);
        } catch (y) {
          w = [6, y], S = 0;
        } finally {
          v = k = 0;
        }
      if (w[0] & 5)
        throw w[1];
      return { value: w[0] ? w[1] : void 0, done: !0 };
    }
  };
  Object.defineProperty(t, "__esModule", { value: !0 }), t.Header = t.Track = t.Midi = void 0;
  var r = un, i = en, s = be, a = dn, o = function() {
    function f(h) {
      var m = this, v = null;
      if (h) {
        var S = h instanceof ArrayBuffer ? new Uint8Array(h) : h;
        v = (0, r.parseMidi)(S), v.tracks.forEach(function(k) {
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
        return n(this, function(S) {
          switch (S.label) {
            case 0:
              return [4, fetch(h)];
            case 1:
              return m = S.sent(), m.ok ? [4, m.arrayBuffer()] : [3, 3];
            case 2:
              return v = S.sent(), [2, new f(v)];
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
        var S = new s.Track(void 0, m.header);
        return S.fromJSON(v), S;
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
  var l = en;
  Object.defineProperty(t, "Header", { enumerable: !0, get: function() {
    return l.Header;
  } });
  function d(f) {
    for (var h = [], m = 0; m < f.length; m++)
      for (var v = h.length, S = /* @__PURE__ */ new Map(), k = Array(16).fill(0), C = 0, O = f[m]; C < O.length; C++) {
        var I = O[C], w = v, y = I.channel;
        if (y !== void 0) {
          I.type === "programChange" && (k[y] = I.programNumber);
          var ot = k[y], Gt = "".concat(ot, " ").concat(y);
          S.has(Gt) ? w = S.get(Gt) : (w = v + S.size, S.set(Gt, w));
        }
        h[w] || h.push([]), h[w].push(I);
      }
    return h;
  }
})(fa);
var ph = /* @__PURE__ */ ((t) => (t[t.UNKNOWN = 0] = "UNKNOWN", t[t.INTRO = 1] = "INTRO", t[t.VERSE = 2] = "VERSE", t[t.CHORUS = 3] = "CHORUS", t[t.BRIDGE = 4] = "BRIDGE", t[t.OUTRO = 5] = "OUTRO", t[t.PRE_CHORUS = 6] = "PRE_CHORUS", t[t.POST_CHORUS = 7] = "POST_CHORUS", t[t.FILL = 8] = "FILL", t[t.CUSTOM = 9] = "CUSTOM", t))(ph || {});
class mh {
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
class tt {
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
    if (e > tt.NUM_BUSES)
      throw new Error(`Only ${tt.NUM_BUSES} buses are supported.`);
    const r = e - 1;
    this.buses[r] ? this.buses[r].setName(n) : this.buses[r] = new vh({ rank: e, name: n });
  }
  getMasterTrack() {
    return this.masterTrack || (this.masterTrack = new nt({
      type: Jt.MASTER_TRACK,
      song: this,
      uuid: nt.generateTrackIdInternal()
    })), this.masterTrack;
  }
  getTracks() {
    return this.tracks;
  }
  getTrackById(e) {
    return qe(this.tracks, (n) => n.getId() === e);
  }
  getTracksByIds(e) {
    if (!this.tracks)
      return [];
    const n = new Set(e);
    return this.tracks.filter((r) => n.has(r.getId()));
  }
  getTrackIndex(e) {
    return ne(this.tracks, (n) => n.getId() === e);
  }
  createTrack({
    type: e,
    index: n,
    rank: r,
    assignDefaultSamplerPlugin: i = !1
  }) {
    r == null || r === null ? r = this.getNextTrackRank() : this.nextTrackRank = Math.max(r + 1, this.nextTrackRank);
    const s = new nt({
      type: e,
      song: this,
      uuid: this.getNextTrackId(),
      rank: r == null || r === null ? this.getNextTrackRank() : r
    });
    return i && e === Jt.MIDI_TRACK && s.setSamplerPlugin(s.createAudioPlugin(cn.DEFAULT_SYNTH_TFID)), e === Jt.AUX_TRACK && s.getAuxTrackData().setInputBusRank(1), n != null ? this.tracks.splice(n, 0, s) : this.tracks.push(s), s;
  }
  cloneTrack(e) {
    let n = this.getTrackIndex(e.getId());
    n < 0 && (n = void 0);
    const r = this.createTrack({
      type: e.getType(),
      index: n
    });
    if (r.setVolume(e.getVolume()), r.setPan(e.getPan()), r.setSolo(e.getSolo()), r.setMuted(e.getMuted()), e.getType() === Jt.MIDI_TRACK) {
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
    for (let s = 0; s < nt.MAX_NUM_EFFECTS_PLUGINS; s += 1) {
      const a = e.getAudioPluginAt(s);
      !a || r.setAudioPluginAt(s, a.clone(r));
    }
    for (const s of e.getClips()) {
      const a = r.cloneClip(s);
      r.insertClip(a);
    }
    const i = e.getAuxTrackData();
    i && tr(i.getInputBusRank()) && i.getInputBusRank() > 0 && r.getAuxTrackData().setInputBusRank(
      i.getInputBusRank()
    );
    for (let s = 0; s < nt.MAX_NUM_SENDS; s += 1) {
      const a = e.getSendAt(s);
      !a || r.setSendAt(
        s,
        new tn({
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
      ne(this.tracks, (r) => r.getId() === e),
      1
    );
    for (const r of this.tracks) {
      const i = r.getOutput();
      i && i.getType() === Pr.Track && i.getTrackId() === e && r.removeOutput();
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
    let r = P.le(n, { tick: e }, (i, s) => i.tick - s.tick);
    for (; r > 0 && n[r].beat !== 1; )
      r -= 1;
    return n[r];
  }
  static getLeadingBeat(e, n) {
    if (!n || n.length === 0)
      return null;
    if (e < 0)
      return n[0];
    const r = P.le(n, { tick: e }, (i, s) => i.tick - s.tick);
    return n[r];
  }
  static getTrailingBeat(e, n) {
    if (!n || n.length === 0)
      return null;
    if (e < 0)
      return n[0];
    const r = P.ge(n, { tick: e }, (i, s) => i.tick - s.tick);
    return r > n.length - 1 ? n[n.length - 1] : n[r];
  }
  static getClosestBeat(e, n) {
    if (!n || n.length === 0)
      return null;
    if (e < 0)
      return n[0];
    const r = P.le(n, { tick: e }, (i, s) => i.tick - s.tick);
    return r >= n.length - 1 ? n[r] : Math.abs(n[r].tick - e) > Math.abs(n[r + 1].tick - e) ? n[r + 1] : n[r];
  }
  getBarBeats(e) {
    return tt.getBarBeatsImpl(
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
    return tt.getTempoAtTickImpl(
      e,
      this.tempos,
      (n) => ({
        getTicks: () => n
      }),
      (n) => n.getTicks()
    );
  }
  static getTempoAtTickImpl(e, n, r, i) {
    let s = P.le(
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
    const r = new Pn({ ticks: e, bpm: n, time: this.tickToSeconds(e) }), i = P.ge(
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
      new Pn({
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
    this.timeSignatures = wi(e);
  }
  createTimeSignature({
    ticks: e,
    numerator: n,
    denominator: r
  }) {
    const i = new Ci({ ticks: e, numerator: n, denominator: r }), s = P.ge(
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
    return tt.getStructureAtTickImpl(
      e,
      this.structures,
      (n) => ({ getTick: () => n }),
      (n) => n.getTick()
    );
  }
  static getStructureAtTickImpl(e, n, r, i) {
    let s = P.le(
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
    const i = new mh({
      tick: e,
      type: n,
      customName: r
    });
    this.structures.push(i), this.structures.length === 1 && i.setTick(0), this.structures.sort((s, a) => s.getTick() - a.getTick());
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
    return tt.getTimeSignatureAtTickImpl(
      e,
      this.timeSignatures,
      (n) => ({
        getTicks: () => n
      }),
      (n) => n.getTicks()
    );
  }
  static getTimeSignatureAtTickImpl(e, n, r, i) {
    let s = P.le(
      n,
      r(e),
      (a, o) => i(a) - i(o)
    );
    return s < 0 && (s = 0), s >= n.length && (s = n.length - 1), n[s];
  }
  tickToSeconds(e) {
    return tt.tickToSecondsImpl(
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
    let o = P.lt(
      n,
      i(e),
      (h, m) => s(h) - s(m)
    );
    o == -1 && (o = 0);
    const u = n[o], l = a(u), d = e - l.tick, f = tt.tempoBPMToTicksPerSecond(
      l.bpm,
      r
    );
    return l.time + d / f;
  }
  secondsToTick(e) {
    return tt.secondsToTickImpl(
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
    let s = P.le(
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
    let o = P.lt(
      r,
      i(e),
      (h, m) => s(h) - s(m)
    );
    o == -1 && (o = 0);
    const u = r[o], l = a(u), d = e - l.time, f = tt.tempoBPMToTicksPerSecond(
      l.bpm,
      n
    );
    return Math.round(l.tick + d * f);
  }
  static importMIDI(e, n, r = 0, i = !1, s = -1) {
    const a = new fa.Midi(n), o = r, u = tt.DEFAULT_PPQ / a.header.ppq;
    if (i) {
      const d = [];
      for (const h of a.header.timeSignatures)
        d.push(
          new Ci({
            ticks: o + Pt(h.ticks, u),
            numerator: h.timeSignature[0],
            denominator: h.timeSignature[1]
          })
        );
      d.length > 0 && (o > 0 && d[0].setTicks(0), e.overwriteTimeSignatures(d));
      const f = [];
      for (const h of a.header.tempos)
        f.push(
          new Pn({
            ticks: o + Pt(h.ticks, u),
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
        type: Jt.MIDI_TRACK,
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
          startTick: o + Pt(k.ticks, u),
          endTick: o + Pt(k.ticks + k.durationTicks, u)
        }), m = Math.min(
          m,
          o + Pt(k.ticks, u)
        );
      const v = d.controlChanges[7];
      if (v)
        if (v.length === 1)
          f.setVolume(v[0].value);
        else {
          const k = new et(Qn.VOLUME);
          f.getAutomation().addAutomation(k);
          const C = f.getAutomation().getAutomationValueByTarget(k);
          for (const O of v)
            C.addPoint(
              o + Pt(O.ticks, u),
              O.value
            );
        }
      const S = d.controlChanges[10];
      if (S)
        if (S.length === 1) {
          const k = Math.round(S[0].value * 127 - 64);
          f.setPan(k);
        } else {
          const k = new et(Qn.PAN);
          f.getAutomation().addAutomation(k);
          const C = f.getAutomation().getAutomationValueByTarget(k);
          for (const O of S)
            C.addPoint(o + Pt(O.ticks, u), O.value);
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
      n.push(nt.generateTrackIdInternal());
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
}
function Pt(t, e) {
  return Math.round(t * e);
}
class vh {
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
async function yh(t) {
  return t.arrayBuffer();
}
var kh = /* @__PURE__ */ ((t) => (t[t.SelectedTrackIds = 1] = "SelectedTrackIds", t[t.SelectedClipInfos = 2] = "SelectedClipInfos", t[t.TickAtPlayhead = 3] = "TickAtPlayhead", t[t.EditingClipInfo = 4] = "EditingClipInfo", t[t.EditingNoteIds = 5] = "EditingNoteIds", t[t.TickAtPlayheadSnappedToBeat = 6] = "TickAtPlayheadSnappedToBeat", t[t.ClipAudioData = 7] = "ClipAudioData", t))(kh || {});
const Rh = {
  Generate: "generate",
  Transcribe: "transcribe",
  SeparateSource: "separate_source",
  Import: "import"
};
export {
  cn as AudioPlugin,
  Ar as AutomationData,
  et as AutomationTarget,
  Qn as AutomationTargetType,
  ee as AutomationValue,
  _f as AuxTrackData,
  x as Clip,
  fe as ClipType,
  xf as DrumInstrumentType,
  Cf as DrumPitch,
  kh as InjectSource,
  Tf as MelodicInstrumentType,
  wt as Note,
  Oh as SUPPORTED_AUDIO_FORMATS,
  tt as Song,
  mh as StructureMarker,
  ph as StructureType,
  Pn as TempoEvent,
  Ih as TickToSecondStepper,
  Ci as TimeSignatureEvent,
  nt as Track,
  Ef as TrackOutput,
  Pr as TrackOutputType,
  tn as TrackSend,
  If as TrackSendPosition,
  Jt as TrackType,
  Nt as TuneflowPipeline,
  Dn as TuneflowPlugin,
  Rh as TuneflowPluginCategory,
  V as WidgetType,
  bf as areTuneflowIdsEqual,
  Sf as areTuneflowIdsEqualIgnoreVersion,
  wf as dbToVolumeValue,
  Ze as decodeAudioPluginTuneflowId,
  _h as gainToDb,
  xh as gainToVolumeValue,
  Vi as getAudioPluginTuneflowId,
  kf as getAudioPluginVersionlessTuneflowId,
  yh as getFileContentFromFileSelector,
  Nh as maybeToRaw,
  Sh as midiNumberToPitch,
  Ph as pitchToHz,
  wh as pitchToMidiNumber,
  Ah as remapRange,
  Ch as toVersionlessTfId,
  Eh as volumeValueToDb,
  Th as volumeValueToGain
};
