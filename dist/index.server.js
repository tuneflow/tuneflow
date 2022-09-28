var $i = "1.13.4", ci = typeof self == "object" && self.self === self && self || typeof global == "object" && global.global === global && global || Function("return this")() || {}, rn = Array.prototype, Qn = Object.prototype, ui = typeof Symbol < "u" ? Symbol.prototype : null, Ha = rn.push, be = rn.slice, me = Qn.toString, qa = Qn.hasOwnProperty, Di = typeof ArrayBuffer < "u", Ka = typeof DataView < "u", za = Array.isArray, li = Object.keys, fi = Object.create, hi = Di && ArrayBuffer.isView, Ga = isNaN, Ja = isFinite, Li = !{ toString: null }.propertyIsEnumerable("toString"), pi = [
  "valueOf",
  "isPrototypeOf",
  "toString",
  "propertyIsEnumerable",
  "hasOwnProperty",
  "toLocaleString"
], Wa = Math.pow(2, 53) - 1;
function G(t, e) {
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
function Bt(t) {
  var e = typeof t;
  return e === "function" || e === "object" && !!t;
}
function ja(t) {
  return t === null;
}
function Hi(t) {
  return t === void 0;
}
function qi(t) {
  return t === !0 || t === !1 || me.call(t) === "[object Boolean]";
}
function Ya(t) {
  return !!(t && t.nodeType === 1);
}
function R(t) {
  var e = "[object " + t + "]";
  return function(n) {
    return me.call(n) === e;
  };
}
const Xn = R("String"), Ki = R("Number"), Qa = R("Date"), Xa = R("RegExp"), Za = R("Error"), zi = R("Symbol"), Gi = R("ArrayBuffer");
var Ji = R("Function"), tc = ci.document && ci.document.childNodes;
typeof /./ != "function" && typeof Int8Array != "object" && typeof tc != "function" && (Ji = function(t) {
  return typeof t == "function" || !1;
});
const D = Ji, Wi = R("Object");
var ji = Ka && Wi(new DataView(new ArrayBuffer(8))), Zn = typeof Map < "u" && Wi(/* @__PURE__ */ new Map()), ec = R("DataView");
function nc(t) {
  return t != null && D(t.getInt8) && Gi(t.buffer);
}
const Ke = ji ? nc : ec, $t = za || R("Array");
function bt(t, e) {
  return t != null && qa.call(t, e);
}
var Vn = R("Arguments");
(function() {
  Vn(arguments) || (Vn = function(t) {
    return bt(t, "callee");
  });
})();
const tr = Vn;
function rc(t) {
  return !zi(t) && Ja(t) && !isNaN(parseFloat(t));
}
function Yi(t) {
  return Ki(t) && Ga(t);
}
function Qi(t) {
  return function() {
    return t;
  };
}
function Xi(t) {
  return function(e) {
    var n = t(e);
    return typeof n == "number" && n >= 0 && n <= Wa;
  };
}
function Zi(t) {
  return function(e) {
    return e == null ? void 0 : e[t];
  };
}
const ze = Zi("byteLength"), ic = Xi(ze);
var sc = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
function oc(t) {
  return hi ? hi(t) && !Ke(t) : ic(t) && sc.test(me.call(t));
}
const ts = Di ? oc : Qi(!1), J = Zi("length");
function ac(t) {
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
  e = ac(e);
  var n = pi.length, r = t.constructor, i = D(r) && r.prototype || Qn, s = "constructor";
  for (bt(t, s) && !e.contains(s) && e.push(s); n--; )
    s = pi[n], s in t && t[s] !== i[s] && !e.contains(s) && e.push(s);
}
function N(t) {
  if (!Bt(t))
    return [];
  if (li)
    return li(t);
  var e = [];
  for (var n in t)
    bt(t, n) && e.push(n);
  return Li && es(t, e), e;
}
function cc(t) {
  if (t == null)
    return !0;
  var e = J(t);
  return typeof e == "number" && ($t(t) || Xn(t) || tr(t)) ? e === 0 : J(N(t)) === 0;
}
function ns(t, e) {
  var n = N(e), r = n.length;
  if (t == null)
    return !r;
  for (var i = Object(t), s = 0; s < r; s++) {
    var o = n[s];
    if (e[o] !== i[o] || !(o in i))
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
  return new Uint8Array(t.buffer || t, t.byteOffset || 0, ze(t));
}
var gi = "[object DataView]";
function Rn(t, e, n, r) {
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
  t instanceof S && (t = t._wrapped), e instanceof S && (e = e._wrapped);
  var i = me.call(t);
  if (i !== me.call(e))
    return !1;
  if (ji && i == "[object Object]" && Ke(t)) {
    if (!Ke(e))
      return !1;
    i = gi;
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
    case gi:
      return rs(di(t), di(e), n, r);
  }
  var s = i === "[object Array]";
  if (!s && ts(t)) {
    var o = ze(t);
    if (o !== ze(e))
      return !1;
    if (t.buffer === e.buffer && t.byteOffset === e.byteOffset)
      return !0;
    s = !0;
  }
  if (!s) {
    if (typeof t != "object" || typeof e != "object")
      return !1;
    var a = t.constructor, u = e.constructor;
    if (a !== u && !(D(a) && a instanceof a && D(u) && u instanceof u) && "constructor" in t && "constructor" in e)
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
      if (!Rn(t[l], e[l], n, r))
        return !1;
  } else {
    var g = N(t), h;
    if (l = g.length, N(e).length !== l)
      return !1;
    for (; l--; )
      if (h = g[l], !(bt(e, h) && Rn(t[h], e[h], n, r)))
        return !1;
  }
  return n.pop(), r.pop(), !0;
}
function uc(t, e) {
  return Rn(t, e);
}
function we(t) {
  if (!Bt(t))
    return [];
  var e = [];
  for (var n in t)
    e.push(n);
  return Li && es(t, e), e;
}
function er(t) {
  var e = J(t);
  return function(n) {
    if (n == null)
      return !1;
    var r = we(n);
    if (J(r))
      return !1;
    for (var i = 0; i < e; i++)
      if (!D(n[t[i]]))
        return !1;
    return t !== os || !D(n[nr]);
  };
}
var nr = "forEach", is = "has", rr = ["clear", "delete"], ss = ["get", is, "set"], lc = rr.concat(nr, ss), os = rr.concat(ss), fc = ["add"].concat(rr, nr, is);
const hc = Zn ? er(lc) : R("Map"), pc = Zn ? er(os) : R("WeakMap"), dc = Zn ? er(fc) : R("Set"), gc = R("WeakSet");
function re(t) {
  for (var e = N(t), n = e.length, r = Array(n), i = 0; i < n; i++)
    r[i] = t[e[i]];
  return r;
}
function mc(t) {
  for (var e = N(t), n = e.length, r = Array(n), i = 0; i < n; i++)
    r[i] = [e[i], t[e[i]]];
  return r;
}
function as(t) {
  for (var e = {}, n = N(t), r = 0, i = n.length; r < i; r++)
    e[t[n[r]]] = n[r];
  return e;
}
function Fn(t) {
  var e = [];
  for (var n in t)
    D(t[n]) && e.push(n);
  return e.sort();
}
function ir(t, e) {
  return function(n) {
    var r = arguments.length;
    if (e && (n = Object(n)), r < 2 || n == null)
      return n;
    for (var i = 1; i < r; i++)
      for (var s = arguments[i], o = t(s), a = o.length, u = 0; u < a; u++) {
        var l = o[u];
        (!e || n[l] === void 0) && (n[l] = s[l]);
      }
    return n;
  };
}
const cs = ir(we), Ge = ir(N), us = ir(we, !0);
function Ic() {
  return function() {
  };
}
function ls(t) {
  if (!Bt(t))
    return {};
  if (fi)
    return fi(t);
  var e = Ic();
  e.prototype = t;
  var n = new e();
  return e.prototype = null, n;
}
function vc(t, e) {
  var n = ls(t);
  return e && Ge(n, e), n;
}
function yc(t) {
  return Bt(t) ? $t(t) ? t.slice() : cs({}, t) : t;
}
function Tc(t, e) {
  return e(t), t;
}
function fs(t) {
  return $t(t) ? t : [t];
}
S.toPath = fs;
function ke(t) {
  return S.toPath(t);
}
function sr(t, e) {
  for (var n = e.length, r = 0; r < n; r++) {
    if (t == null)
      return;
    t = t[e[r]];
  }
  return n ? t : void 0;
}
function hs(t, e, n) {
  var r = sr(t, ke(e));
  return Hi(r) ? n : r;
}
function bc(t, e) {
  e = ke(e);
  for (var n = e.length, r = 0; r < n; r++) {
    var i = e[r];
    if (!bt(t, i))
      return !1;
    t = t[i];
  }
  return !!n;
}
function or(t) {
  return t;
}
function Ie(t) {
  return t = Ge({}, t), function(e) {
    return ns(e, t);
  };
}
function ar(t) {
  return t = ke(t), function(e) {
    return sr(e, t);
  };
}
function Se(t, e, n) {
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
      return function(r, i, s, o) {
        return t.call(e, r, i, s, o);
      };
  }
  return function() {
    return t.apply(e, arguments);
  };
}
function ps(t, e, n) {
  return t == null ? or : D(t) ? Se(t, e, n) : Bt(t) && !$t(t) ? Ie(t) : ar(t);
}
function cr(t, e) {
  return ps(t, e, 1 / 0);
}
S.iteratee = cr;
function W(t, e, n) {
  return S.iteratee !== cr ? S.iteratee(t, e) : ps(t, e, n);
}
function wc(t, e, n) {
  e = W(e, n);
  for (var r = N(t), i = r.length, s = {}, o = 0; o < i; o++) {
    var a = r[o];
    s[a] = e(t[a], a, t);
  }
  return s;
}
function ds() {
}
function kc(t) {
  return t == null ? ds : function(e) {
    return hs(t, e);
  };
}
function Sc(t, e, n) {
  var r = Array(Math.max(0, t));
  e = Se(e, n, 1);
  for (var i = 0; i < t; i++)
    r[i] = e(i);
  return r;
}
function Un(t, e) {
  return e == null && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1));
}
const ve = Date.now || function() {
  return new Date().getTime();
};
function gs(t) {
  var e = function(s) {
    return t[s];
  }, n = "(?:" + N(t).join("|") + ")", r = RegExp(n), i = RegExp(n, "g");
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
}, _c = gs(ms), Cc = as(ms), xc = gs(Cc), Ec = S.templateSettings = {
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  escape: /<%-([\s\S]+?)%>/g
};
var xn = /(.)^/, Nc = {
  "'": "'",
  "\\": "\\",
  "\r": "r",
  "\n": "n",
  "\u2028": "u2028",
  "\u2029": "u2029"
}, Pc = /\\|'|\r|\n|\u2028|\u2029/g;
function Oc(t) {
  return "\\" + Nc[t];
}
var Ac = /^\s*(\w|\$)+\s*$/;
function Mc(t, e, n) {
  !e && n && (e = n), e = us({}, e, S.templateSettings);
  var r = RegExp([
    (e.escape || xn).source,
    (e.interpolate || xn).source,
    (e.evaluate || xn).source
  ].join("|") + "|$", "g"), i = 0, s = "__p+='";
  t.replace(r, function(l, g, h, p, m) {
    return s += t.slice(i, m).replace(Pc, Oc), i = m + l.length, g ? s += `'+
((__t=(` + g + `))==null?'':_.escape(__t))+
'` : h ? s += `'+
((__t=(` + h + `))==null?'':__t)+
'` : p && (s += `';
` + p + `
__p+='`), l;
  }), s += `';
`;
  var o = e.variable;
  if (o) {
    if (!Ac.test(o))
      throw new Error("variable is not a bare identifier: " + o);
  } else
    s = `with(obj||{}){
` + s + `}
`, o = "obj";
  s = `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
` + s + `return __p;
`;
  var a;
  try {
    a = new Function(o, "_", s);
  } catch (l) {
    throw l.source = s, l;
  }
  var u = function(l) {
    return a.call(this, l, S);
  };
  return u.source = "function(" + o + `){
` + s + "}", u;
}
function Vc(t, e, n) {
  e = ke(e);
  var r = e.length;
  if (!r)
    return D(n) ? n.call(t) : n;
  for (var i = 0; i < r; i++) {
    var s = t == null ? void 0 : t[e[i]];
    s === void 0 && (s = n, i = r), t = D(s) ? s.call(t) : s;
  }
  return t;
}
var Rc = 0;
function Fc(t) {
  var e = ++Rc + "";
  return t ? t + e : e;
}
function Uc(t) {
  var e = S(t);
  return e._chain = !0, e;
}
function Is(t, e, n, r, i) {
  if (!(r instanceof e))
    return t.apply(n, i);
  var s = ls(t.prototype), o = t.apply(s, i);
  return Bt(o) ? o : s;
}
var ie = G(function(t, e) {
  var n = ie.placeholder, r = function() {
    for (var i = 0, s = e.length, o = Array(s), a = 0; a < s; a++)
      o[a] = e[a] === n ? arguments[i++] : e[a];
    for (; i < arguments.length; )
      o.push(arguments[i++]);
    return Is(t, r, this, this, o);
  };
  return r;
});
ie.placeholder = S;
const vs = G(function(t, e, n) {
  if (!D(t))
    throw new TypeError("Bind must be called on a function");
  var r = G(function(i) {
    return Is(t, r, e, this, n.concat(i));
  });
  return r;
}), X = Xi(J);
function Dt(t, e, n, r) {
  if (r = r || [], !e && e !== 0)
    e = 1 / 0;
  else if (e <= 0)
    return r.concat(t);
  for (var i = r.length, s = 0, o = J(t); s < o; s++) {
    var a = t[s];
    if (X(a) && ($t(a) || tr(a)))
      if (e > 1)
        Dt(a, e - 1, n, r), i = r.length;
      else
        for (var u = 0, l = a.length; u < l; )
          r[i++] = a[u++];
    else
      n || (r[i++] = a);
  }
  return r;
}
const Bc = G(function(t, e) {
  e = Dt(e, !1, !1);
  var n = e.length;
  if (n < 1)
    throw new Error("bindAll must be passed function names");
  for (; n--; ) {
    var r = e[n];
    t[r] = vs(t[r], t);
  }
  return t;
});
function $c(t, e) {
  var n = function(r) {
    var i = n.cache, s = "" + (e ? e.apply(this, arguments) : r);
    return bt(i, s) || (i[s] = t.apply(this, arguments)), i[s];
  };
  return n.cache = {}, n;
}
const ys = G(function(t, e, n) {
  return setTimeout(function() {
    return t.apply(null, n);
  }, e);
}), Dc = ie(ys, S, 1);
function Lc(t, e, n) {
  var r, i, s, o, a = 0;
  n || (n = {});
  var u = function() {
    a = n.leading === !1 ? 0 : ve(), r = null, o = t.apply(i, s), r || (i = s = null);
  }, l = function() {
    var g = ve();
    !a && n.leading === !1 && (a = g);
    var h = e - (g - a);
    return i = this, s = arguments, h <= 0 || h > e ? (r && (clearTimeout(r), r = null), a = g, o = t.apply(i, s), r || (i = s = null)) : !r && n.trailing !== !1 && (r = setTimeout(u, h)), o;
  };
  return l.cancel = function() {
    clearTimeout(r), a = 0, r = i = s = null;
  }, l;
}
function Hc(t, e, n) {
  var r, i, s, o, a, u = function() {
    var g = ve() - i;
    e > g ? r = setTimeout(u, e - g) : (r = null, n || (o = t.apply(a, s)), r || (s = a = null));
  }, l = G(function(g) {
    return a = this, s = g, i = ve(), r || (r = setTimeout(u, e), n && (o = t.apply(a, s))), o;
  });
  return l.cancel = function() {
    clearTimeout(r), r = s = a = null;
  }, l;
}
function qc(t, e) {
  return ie(e, t);
}
function ur(t) {
  return function() {
    return !t.apply(this, arguments);
  };
}
function Kc() {
  var t = arguments, e = t.length - 1;
  return function() {
    for (var n = e, r = t[e].apply(this, arguments); n--; )
      r = t[n].call(this, r);
    return r;
  };
}
function zc(t, e) {
  return function() {
    if (--t < 1)
      return e.apply(this, arguments);
  };
}
function Ts(t, e) {
  var n;
  return function() {
    return --t > 0 && (n = e.apply(this, arguments)), t <= 1 && (e = null), n;
  };
}
const Gc = ie(Ts, 2);
function bs(t, e, n) {
  e = W(e, n);
  for (var r = N(t), i, s = 0, o = r.length; s < o; s++)
    if (i = r[s], e(t[i], i, t))
      return i;
}
function ws(t) {
  return function(e, n, r) {
    n = W(n, r);
    for (var i = J(e), s = t > 0 ? 0 : i - 1; s >= 0 && s < i; s += t)
      if (n(e[s], s, e))
        return s;
    return -1;
  };
}
const ee = ws(1), ks = ws(-1);
function Ss(t, e, n, r) {
  n = W(n, r, 1);
  for (var i = n(e), s = 0, o = J(t); s < o; ) {
    var a = Math.floor((s + o) / 2);
    n(t[a]) < i ? s = a + 1 : o = a;
  }
  return s;
}
function _s(t, e, n) {
  return function(r, i, s) {
    var o = 0, a = J(r);
    if (typeof s == "number")
      t > 0 ? o = s >= 0 ? s : Math.max(s + a, o) : a = s >= 0 ? Math.min(s + 1, a) : s + a + 1;
    else if (n && s && a)
      return s = n(r, i), r[s] === i ? s : -1;
    if (i !== i)
      return s = e(be.call(r, o, a), Yi), s >= 0 ? s + o : -1;
    for (s = t > 0 ? o : a - 1; s >= 0 && s < a; s += t)
      if (r[s] === i)
        return s;
    return -1;
  };
}
const Cs = _s(1, ee, Ss), Jc = _s(-1, ks);
function Je(t, e, n) {
  var r = X(t) ? ee : bs, i = r(t, e, n);
  if (i !== void 0 && i !== -1)
    return t[i];
}
function Wc(t, e) {
  return Je(t, Ie(e));
}
function ht(t, e, n) {
  e = Se(e, n);
  var r, i;
  if (X(t))
    for (r = 0, i = t.length; r < i; r++)
      e(t[r], r, t);
  else {
    var s = N(t);
    for (r = 0, i = s.length; r < i; r++)
      e(t[s[r]], s[r], t);
  }
  return t;
}
function Rt(t, e, n) {
  e = W(e, n);
  for (var r = !X(t) && N(t), i = (r || t).length, s = Array(i), o = 0; o < i; o++) {
    var a = r ? r[o] : o;
    s[o] = e(t[a], a, t);
  }
  return s;
}
function xs(t) {
  var e = function(n, r, i, s) {
    var o = !X(n) && N(n), a = (o || n).length, u = t > 0 ? 0 : a - 1;
    for (s || (i = n[o ? o[u] : u], u += t); u >= 0 && u < a; u += t) {
      var l = o ? o[u] : u;
      i = r(i, n[l], l, n);
    }
    return i;
  };
  return function(n, r, i, s) {
    var o = arguments.length >= 3;
    return e(n, Se(r, s, 4), i, o);
  };
}
const En = xs(1), mi = xs(-1);
function ne(t, e, n) {
  var r = [];
  return e = W(e, n), ht(t, function(i, s, o) {
    e(i, s, o) && r.push(i);
  }), r;
}
function jc(t, e, n) {
  return ne(t, ur(W(e)), n);
}
function Ii(t, e, n) {
  e = W(e, n);
  for (var r = !X(t) && N(t), i = (r || t).length, s = 0; s < i; s++) {
    var o = r ? r[s] : s;
    if (!e(t[o], o, t))
      return !1;
  }
  return !0;
}
function vi(t, e, n) {
  e = W(e, n);
  for (var r = !X(t) && N(t), i = (r || t).length, s = 0; s < i; s++) {
    var o = r ? r[s] : s;
    if (e(t[o], o, t))
      return !0;
  }
  return !1;
}
function ft(t, e, n, r) {
  return X(t) || (t = re(t)), (typeof n != "number" || r) && (n = 0), Cs(t, e, n) >= 0;
}
const Yc = G(function(t, e, n) {
  var r, i;
  return D(e) ? i = e : (e = ke(e), r = e.slice(0, -1), e = e[e.length - 1]), Rt(t, function(s) {
    var o = i;
    if (!o) {
      if (r && r.length && (s = sr(s, r)), s == null)
        return;
      o = s[e];
    }
    return o == null ? o : o.apply(s, n);
  });
});
function lr(t, e) {
  return Rt(t, ar(e));
}
function Qc(t, e) {
  return ne(t, Ie(e));
}
function Es(t, e, n) {
  var r = -1 / 0, i = -1 / 0, s, o;
  if (e == null || typeof e == "number" && typeof t[0] != "object" && t != null) {
    t = X(t) ? t : re(t);
    for (var a = 0, u = t.length; a < u; a++)
      s = t[a], s != null && s > r && (r = s);
  } else
    e = W(e, n), ht(t, function(l, g, h) {
      o = e(l, g, h), (o > i || o === -1 / 0 && r === -1 / 0) && (r = l, i = o);
    });
  return r;
}
function Xc(t, e, n) {
  var r = 1 / 0, i = 1 / 0, s, o;
  if (e == null || typeof e == "number" && typeof t[0] != "object" && t != null) {
    t = X(t) ? t : re(t);
    for (var a = 0, u = t.length; a < u; a++)
      s = t[a], s != null && s < r && (r = s);
  } else
    e = W(e, n), ht(t, function(l, g, h) {
      o = e(l, g, h), (o < i || o === 1 / 0 && r === 1 / 0) && (r = l, i = o);
    });
  return r;
}
var Zc = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
function Ns(t) {
  return t ? $t(t) ? be.call(t) : Xn(t) ? t.match(Zc) : X(t) ? Rt(t, or) : re(t) : [];
}
function Ps(t, e, n) {
  if (e == null || n)
    return X(t) || (t = re(t)), t[Un(t.length - 1)];
  var r = Ns(t), i = J(r);
  e = Math.max(Math.min(e, i), 0);
  for (var s = i - 1, o = 0; o < e; o++) {
    var a = Un(o, s), u = r[o];
    r[o] = r[a], r[a] = u;
  }
  return r.slice(0, e);
}
function tu(t) {
  return Ps(t, 1 / 0);
}
function eu(t, e, n) {
  var r = 0;
  return e = W(e, n), lr(Rt(t, function(i, s, o) {
    return {
      value: i,
      index: r++,
      criteria: e(i, s, o)
    };
  }).sort(function(i, s) {
    var o = i.criteria, a = s.criteria;
    if (o !== a) {
      if (o > a || o === void 0)
        return 1;
      if (o < a || a === void 0)
        return -1;
    }
    return i.index - s.index;
  }), "value");
}
function sn(t, e) {
  return function(n, r, i) {
    var s = e ? [[], []] : {};
    return r = W(r, i), ht(n, function(o, a) {
      var u = r(o, a, n);
      t(s, o, u);
    }), s;
  };
}
const nu = sn(function(t, e, n) {
  bt(t, n) ? t[n].push(e) : t[n] = [e];
}), ru = sn(function(t, e, n) {
  t[n] = e;
}), iu = sn(function(t, e, n) {
  bt(t, n) ? t[n]++ : t[n] = 1;
}), su = sn(function(t, e, n) {
  t[n ? 0 : 1].push(e);
}, !0);
function ou(t) {
  return t == null ? 0 : X(t) ? t.length : N(t).length;
}
function au(t, e, n) {
  return e in n;
}
const Os = G(function(t, e) {
  var n = {}, r = e[0];
  if (t == null)
    return n;
  D(r) ? (e.length > 1 && (r = Se(r, e[1])), e = we(t)) : (r = au, e = Dt(e, !1, !1), t = Object(t));
  for (var i = 0, s = e.length; i < s; i++) {
    var o = e[i], a = t[o];
    r(a, o, t) && (n[o] = a);
  }
  return n;
}), cu = G(function(t, e) {
  var n = e[0], r;
  return D(n) ? (n = ur(n), e.length > 1 && (r = e[1])) : (e = Rt(Dt(e, !1, !1), String), n = function(i, s) {
    return !ft(e, s);
  }), Os(t, n, r);
});
function As(t, e, n) {
  return be.call(t, 0, Math.max(0, t.length - (e == null || n ? 1 : e)));
}
function Nn(t, e, n) {
  return t == null || t.length < 1 ? e == null || n ? void 0 : [] : e == null || n ? t[0] : As(t, t.length - e);
}
function He(t, e, n) {
  return be.call(t, e == null || n ? 1 : e);
}
function uu(t, e, n) {
  return t == null || t.length < 1 ? e == null || n ? void 0 : [] : e == null || n ? t[t.length - 1] : He(t, Math.max(0, t.length - e));
}
function lu(t) {
  return ne(t, Boolean);
}
function fu(t, e) {
  return Dt(t, e, !1);
}
const Ms = G(function(t, e) {
  return e = Dt(e, !0, !0), ne(t, function(n) {
    return !ft(e, n);
  });
}), hu = G(function(t, e) {
  return Ms(t, e);
});
function Bn(t, e, n, r) {
  qi(e) || (r = n, n = e, e = !1), n != null && (n = W(n, r));
  for (var i = [], s = [], o = 0, a = J(t); o < a; o++) {
    var u = t[o], l = n ? n(u, o, t) : u;
    e && !n ? ((!o || s !== l) && i.push(u), s = l) : n ? ft(s, l) || (s.push(l), i.push(u)) : ft(i, u) || i.push(u);
  }
  return i;
}
const pu = G(function(t) {
  return Bn(Dt(t, !0, !0));
});
function du(t) {
  for (var e = [], n = arguments.length, r = 0, i = J(t); r < i; r++) {
    var s = t[r];
    if (!ft(e, s)) {
      var o;
      for (o = 1; o < n && ft(arguments[o], s); o++)
        ;
      o === n && e.push(s);
    }
  }
  return e;
}
function $n(t) {
  for (var e = t && Es(t, J).length || 0, n = Array(e), r = 0; r < e; r++)
    n[r] = lr(t, r);
  return n;
}
const gu = G($n);
function mu(t, e) {
  for (var n = {}, r = 0, i = J(t); r < i; r++)
    e ? n[t[r]] = e[r] : n[t[r][0]] = t[r][1];
  return n;
}
function Iu(t, e, n) {
  e == null && (e = t || 0, t = 0), n || (n = e < t ? -1 : 1);
  for (var r = Math.max(Math.ceil((e - t) / n), 0), i = Array(r), s = 0; s < r; s++, t += n)
    i[s] = t;
  return i;
}
function vu(t, e) {
  if (e == null || e < 1)
    return [];
  for (var n = [], r = 0, i = t.length; r < i; )
    n.push(be.call(t, r, r += e));
  return n;
}
function fr(t, e) {
  return t._chain ? S(e).chain() : e;
}
function Vs(t) {
  return ht(Fn(t), function(e) {
    var n = S[e] = t[e];
    S.prototype[e] = function() {
      var r = [this._wrapped];
      return Ha.apply(r, arguments), fr(this, n.apply(S, r));
    };
  }), S;
}
ht(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(t) {
  var e = rn[t];
  S.prototype[t] = function() {
    var n = this._wrapped;
    return n != null && (e.apply(n, arguments), (t === "shift" || t === "splice") && n.length === 0 && delete n[0]), fr(this, n);
  };
});
ht(["concat", "join", "slice"], function(t) {
  var e = rn[t];
  S.prototype[t] = function() {
    var n = this._wrapped;
    return n != null && (n = e.apply(n, arguments)), fr(this, n);
  };
});
const yu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VERSION: $i,
  restArguments: G,
  isObject: Bt,
  isNull: ja,
  isUndefined: Hi,
  isBoolean: qi,
  isElement: Ya,
  isString: Xn,
  isNumber: Ki,
  isDate: Qa,
  isRegExp: Xa,
  isError: Za,
  isSymbol: zi,
  isArrayBuffer: Gi,
  isDataView: Ke,
  isArray: $t,
  isFunction: D,
  isArguments: tr,
  isFinite: rc,
  isNaN: Yi,
  isTypedArray: ts,
  isEmpty: cc,
  isMatch: ns,
  isEqual: uc,
  isMap: hc,
  isWeakMap: pc,
  isSet: dc,
  isWeakSet: gc,
  keys: N,
  allKeys: we,
  values: re,
  pairs: mc,
  invert: as,
  functions: Fn,
  methods: Fn,
  extend: cs,
  extendOwn: Ge,
  assign: Ge,
  defaults: us,
  create: vc,
  clone: yc,
  tap: Tc,
  get: hs,
  has: bc,
  mapObject: wc,
  identity: or,
  constant: Qi,
  noop: ds,
  toPath: fs,
  property: ar,
  propertyOf: kc,
  matcher: Ie,
  matches: Ie,
  times: Sc,
  random: Un,
  now: ve,
  escape: _c,
  unescape: xc,
  templateSettings: Ec,
  template: Mc,
  result: Vc,
  uniqueId: Fc,
  chain: Uc,
  iteratee: cr,
  partial: ie,
  bind: vs,
  bindAll: Bc,
  memoize: $c,
  delay: ys,
  defer: Dc,
  throttle: Lc,
  debounce: Hc,
  wrap: qc,
  negate: ur,
  compose: Kc,
  after: zc,
  before: Ts,
  once: Gc,
  findKey: bs,
  findIndex: ee,
  findLastIndex: ks,
  sortedIndex: Ss,
  indexOf: Cs,
  lastIndexOf: Jc,
  find: Je,
  detect: Je,
  findWhere: Wc,
  each: ht,
  forEach: ht,
  map: Rt,
  collect: Rt,
  reduce: En,
  foldl: En,
  inject: En,
  reduceRight: mi,
  foldr: mi,
  filter: ne,
  select: ne,
  reject: jc,
  every: Ii,
  all: Ii,
  some: vi,
  any: vi,
  contains: ft,
  includes: ft,
  include: ft,
  invoke: Yc,
  pluck: lr,
  where: Qc,
  max: Es,
  min: Xc,
  shuffle: tu,
  sample: Ps,
  sortBy: eu,
  groupBy: nu,
  indexBy: ru,
  countBy: iu,
  partition: su,
  toArray: Ns,
  size: ou,
  pick: Os,
  omit: cu,
  first: Nn,
  head: Nn,
  take: Nn,
  initial: As,
  last: uu,
  rest: He,
  tail: He,
  drop: He,
  compact: lu,
  flatten: fu,
  without: hu,
  uniq: Bn,
  unique: Bn,
  union: pu,
  intersection: du,
  difference: Ms,
  unzip: $n,
  transpose: $n,
  zip: gu,
  object: mu,
  range: Iu,
  chunk: vu,
  mixin: Vs,
  default: S
}, Symbol.toStringTag, { value: "Module" }));
var M = Vs(yu);
M._ = M;
let on = (t = 21) => crypto.getRandomValues(new Uint8Array(t)).reduce((e, n) => (n &= 63, n < 36 ? e += n.toString(36) : n < 62 ? e += (n - 26).toString(36).toUpperCase() : n > 62 ? e += "-" : e += "_", e), "");
class Rs {
  instanceIdInternal = Rs.generatePluginIdInternal();
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
    for (const e of N(this.params()))
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
      case B.Input:
      case B.Pitch:
      case B.Slider:
      case B.TrackSelector:
      case B.Select:
      case B.SelectList:
      case B.Switch:
      case B.InputNumber:
      case B.FileSelector:
        return !0;
      case B.MultiTrackSelector:
        return n.length > 0;
      case B.TrackPitchSelector:
        return n.track !== void 0 && n.track !== null && n.pitch !== void 0 && n.pitch !== null;
      case B.InstrumentSelector:
        return n.program !== void 0 && n.program !== null && n.isDrum !== void 0 && n.isDrum !== null;
      case B.MultiSourceAudioSelector:
        return n != null && n.audioInfo !== void 0 && n.audioInfo !== null;
      case B.None:
        return n != null;
      default:
        throw new Error(`Param nullness check needs to be implemented for widget type ${i}. Either use default nullness check or define custom logic.`);
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
    for (const e of N(this.params())) {
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
    return on(10);
  }
}
class fh {
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
        const a = this.getIndexOfLatestPluginWithCacheBeforeIndex(i);
        return a >= 0 ? await this.cloneSong(this.plugins[a].songCacheInternal) : await this.cloneSong(this.originalSong);
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
    return ee(this.plugins, (n) => n.instanceId === e);
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
var at = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Tu(t) {
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
    var o = r + i >>> 1, a = t[o], u = n !== void 0 ? n(a, e) : a - e;
    u >= 0 ? (s = o, i = o - 1) : r = o + 1;
  }
  return s;
}
function wu(t, e, n, r, i) {
  for (var s = i + 1; r <= i; ) {
    var o = r + i >>> 1, a = t[o], u = n !== void 0 ? n(a, e) : a - e;
    u > 0 ? (s = o, i = o - 1) : r = o + 1;
  }
  return s;
}
function ku(t, e, n, r, i) {
  for (var s = r - 1; r <= i; ) {
    var o = r + i >>> 1, a = t[o], u = n !== void 0 ? n(a, e) : a - e;
    u < 0 ? (s = o, r = o + 1) : i = o - 1;
  }
  return s;
}
function Su(t, e, n, r, i) {
  for (var s = r - 1; r <= i; ) {
    var o = r + i >>> 1, a = t[o], u = n !== void 0 ? n(a, e) : a - e;
    u <= 0 ? (s = o, r = o + 1) : i = o - 1;
  }
  return s;
}
function _u(t, e, n, r, i) {
  for (; r <= i; ) {
    var s = r + i >>> 1, o = t[s], a = n !== void 0 ? n(o, e) : o - e;
    if (a === 0)
      return s;
    a <= 0 ? r = s + 1 : i = s - 1;
  }
  return -1;
}
function ae(t, e, n, r, i, s) {
  return typeof n == "function" ? s(t, e, n, r === void 0 ? 0 : r | 0, i === void 0 ? t.length - 1 : i | 0) : s(t, e, void 0, n === void 0 ? 0 : n | 0, r === void 0 ? t.length - 1 : r | 0);
}
var V = {
  ge: function(t, e, n, r, i) {
    return ae(t, e, n, r, i, bu);
  },
  gt: function(t, e, n, r, i) {
    return ae(t, e, n, r, i, wu);
  },
  lt: function(t, e, n, r, i) {
    return ae(t, e, n, r, i, ku);
  },
  le: function(t, e, n, r, i) {
    return ae(t, e, n, r, i, Su);
  },
  eq: function(t, e, n, r, i) {
    return ae(t, e, n, r, i, _u);
  }
}, Dn = { exports: {} };
(function(t, e) {
  var n = 200, r = "__lodash_hash_undefined__", i = 9007199254740991, s = "[object Arguments]", o = "[object Array]", a = "[object Boolean]", u = "[object Date]", l = "[object Error]", g = "[object Function]", h = "[object GeneratorFunction]", p = "[object Map]", m = "[object Number]", I = "[object Object]", T = "[object Promise]", y = "[object RegExp]", k = "[object Set]", w = "[object String]", j = "[object Symbol]", b = "[object WeakMap]", P = "[object ArrayBuffer]", ot = "[object DataView]", Lt = "[object Float32Array]", Nr = "[object Float64Array]", Pr = "[object Int8Array]", Or = "[object Int16Array]", Ar = "[object Int32Array]", Mr = "[object Uint8Array]", Vr = "[object Uint8ClampedArray]", Rr = "[object Uint16Array]", Fr = "[object Uint32Array]", vo = /[\\^$.*+?()[\]{}|]/g, yo = /\w*$/, To = /^\[object .+?Constructor\]$/, bo = /^(?:0|[1-9]\d*)$/, C = {};
  C[s] = C[o] = C[P] = C[ot] = C[a] = C[u] = C[Lt] = C[Nr] = C[Pr] = C[Or] = C[Ar] = C[p] = C[m] = C[I] = C[y] = C[k] = C[w] = C[j] = C[Mr] = C[Vr] = C[Rr] = C[Fr] = !0, C[l] = C[g] = C[b] = !1;
  var wo = typeof at == "object" && at && at.Object === Object && at, ko = typeof self == "object" && self && self.Object === Object && self, ct = wo || ko || Function("return this")(), Ur = e && !e.nodeType && e, Br = Ur && !0 && t && !t.nodeType && t, So = Br && Br.exports === Ur;
  function _o(c, f) {
    return c.set(f[0], f[1]), c;
  }
  function Co(c, f) {
    return c.add(f), c;
  }
  function xo(c, f) {
    for (var d = -1, v = c ? c.length : 0; ++d < v && f(c[d], d, c) !== !1; )
      ;
    return c;
  }
  function Eo(c, f) {
    for (var d = -1, v = f.length, A = c.length; ++d < v; )
      c[A + d] = f[d];
    return c;
  }
  function $r(c, f, d, v) {
    var A = -1, F = c ? c.length : 0;
    for (v && F && (d = c[++A]); ++A < F; )
      d = f(d, c[A], A, c);
    return d;
  }
  function No(c, f) {
    for (var d = -1, v = Array(c); ++d < c; )
      v[d] = f(d);
    return v;
  }
  function Po(c, f) {
    return c == null ? void 0 : c[f];
  }
  function Dr(c) {
    var f = !1;
    if (c != null && typeof c.toString != "function")
      try {
        f = !!(c + "");
      } catch {
      }
    return f;
  }
  function Lr(c) {
    var f = -1, d = Array(c.size);
    return c.forEach(function(v, A) {
      d[++f] = [A, v];
    }), d;
  }
  function mn(c, f) {
    return function(d) {
      return c(f(d));
    };
  }
  function Hr(c) {
    var f = -1, d = Array(c.size);
    return c.forEach(function(v) {
      d[++f] = v;
    }), d;
  }
  var Oo = Array.prototype, Ao = Function.prototype, _e = Object.prototype, In = ct["__core-js_shared__"], qr = function() {
    var c = /[^.]+$/.exec(In && In.keys && In.keys.IE_PROTO || "");
    return c ? "Symbol(src)_1." + c : "";
  }(), Kr = Ao.toString, pt = _e.hasOwnProperty, Ce = _e.toString, Mo = RegExp("^" + Kr.call(pt).replace(vo, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), zr = So ? ct.Buffer : void 0, Gr = ct.Symbol, Jr = ct.Uint8Array, Vo = mn(Object.getPrototypeOf, Object), Ro = Object.create, Fo = _e.propertyIsEnumerable, Uo = Oo.splice, Wr = Object.getOwnPropertySymbols, Bo = zr ? zr.isBuffer : void 0, $o = mn(Object.keys, Object), vn = Kt(ct, "DataView"), se = Kt(ct, "Map"), yn = Kt(ct, "Promise"), Tn = Kt(ct, "Set"), bn = Kt(ct, "WeakMap"), oe = Kt(Object, "create"), Do = St(vn), Lo = St(se), Ho = St(yn), qo = St(Tn), Ko = St(bn), jr = Gr ? Gr.prototype : void 0, Yr = jr ? jr.valueOf : void 0;
  function wt(c) {
    var f = -1, d = c ? c.length : 0;
    for (this.clear(); ++f < d; ) {
      var v = c[f];
      this.set(v[0], v[1]);
    }
  }
  function zo() {
    this.__data__ = oe ? oe(null) : {};
  }
  function Go(c) {
    return this.has(c) && delete this.__data__[c];
  }
  function Jo(c) {
    var f = this.__data__;
    if (oe) {
      var d = f[c];
      return d === r ? void 0 : d;
    }
    return pt.call(f, c) ? f[c] : void 0;
  }
  function Wo(c) {
    var f = this.__data__;
    return oe ? f[c] !== void 0 : pt.call(f, c);
  }
  function jo(c, f) {
    var d = this.__data__;
    return d[c] = oe && f === void 0 ? r : f, this;
  }
  wt.prototype.clear = zo, wt.prototype.delete = Go, wt.prototype.get = Jo, wt.prototype.has = Wo, wt.prototype.set = jo;
  function ut(c) {
    var f = -1, d = c ? c.length : 0;
    for (this.clear(); ++f < d; ) {
      var v = c[f];
      this.set(v[0], v[1]);
    }
  }
  function Yo() {
    this.__data__ = [];
  }
  function Qo(c) {
    var f = this.__data__, d = xe(f, c);
    if (d < 0)
      return !1;
    var v = f.length - 1;
    return d == v ? f.pop() : Uo.call(f, d, 1), !0;
  }
  function Xo(c) {
    var f = this.__data__, d = xe(f, c);
    return d < 0 ? void 0 : f[d][1];
  }
  function Zo(c) {
    return xe(this.__data__, c) > -1;
  }
  function ta(c, f) {
    var d = this.__data__, v = xe(d, c);
    return v < 0 ? d.push([c, f]) : d[v][1] = f, this;
  }
  ut.prototype.clear = Yo, ut.prototype.delete = Qo, ut.prototype.get = Xo, ut.prototype.has = Zo, ut.prototype.set = ta;
  function Ht(c) {
    var f = -1, d = c ? c.length : 0;
    for (this.clear(); ++f < d; ) {
      var v = c[f];
      this.set(v[0], v[1]);
    }
  }
  function ea() {
    this.__data__ = {
      hash: new wt(),
      map: new (se || ut)(),
      string: new wt()
    };
  }
  function na(c) {
    return Ee(this, c).delete(c);
  }
  function ra(c) {
    return Ee(this, c).get(c);
  }
  function ia(c) {
    return Ee(this, c).has(c);
  }
  function sa(c, f) {
    return Ee(this, c).set(c, f), this;
  }
  Ht.prototype.clear = ea, Ht.prototype.delete = na, Ht.prototype.get = ra, Ht.prototype.has = ia, Ht.prototype.set = sa;
  function qt(c) {
    this.__data__ = new ut(c);
  }
  function oa() {
    this.__data__ = new ut();
  }
  function aa(c) {
    return this.__data__.delete(c);
  }
  function ca(c) {
    return this.__data__.get(c);
  }
  function ua(c) {
    return this.__data__.has(c);
  }
  function la(c, f) {
    var d = this.__data__;
    if (d instanceof ut) {
      var v = d.__data__;
      if (!se || v.length < n - 1)
        return v.push([c, f]), this;
      d = this.__data__ = new Ht(v);
    }
    return d.set(c, f), this;
  }
  qt.prototype.clear = oa, qt.prototype.delete = aa, qt.prototype.get = ca, qt.prototype.has = ua, qt.prototype.set = la;
  function fa(c, f) {
    var d = Sn(c) || Ra(c) ? No(c.length, String) : [], v = d.length, A = !!v;
    for (var F in c)
      (f || pt.call(c, F)) && !(A && (F == "length" || Oa(F, v))) && d.push(F);
    return d;
  }
  function Qr(c, f, d) {
    var v = c[f];
    (!(pt.call(c, f) && ei(v, d)) || d === void 0 && !(f in c)) && (c[f] = d);
  }
  function xe(c, f) {
    for (var d = c.length; d--; )
      if (ei(c[d][0], f))
        return d;
    return -1;
  }
  function ha(c, f) {
    return c && Xr(f, _n(f), c);
  }
  function wn(c, f, d, v, A, F, Z) {
    var q;
    if (v && (q = F ? v(c, A, F, Z) : v(c)), q !== void 0)
      return q;
    if (!Ne(c))
      return c;
    var ii = Sn(c);
    if (ii) {
      if (q = Ea(c), !f)
        return _a(c, q);
    } else {
      var zt = kt(c), si = zt == g || zt == h;
      if (Ua(c))
        return va(c, f);
      if (zt == I || zt == s || si && !F) {
        if (Dr(c))
          return F ? c : {};
        if (q = Na(si ? {} : c), !f)
          return Ca(c, ha(q, c));
      } else {
        if (!C[zt])
          return F ? c : {};
        q = Pa(c, zt, wn, f);
      }
    }
    Z || (Z = new qt());
    var oi = Z.get(c);
    if (oi)
      return oi;
    if (Z.set(c, q), !ii)
      var ai = d ? xa(c) : _n(c);
    return xo(ai || c, function(Cn, Pe) {
      ai && (Pe = Cn, Cn = c[Pe]), Qr(q, Pe, wn(Cn, f, d, v, Pe, c, Z));
    }), q;
  }
  function pa(c) {
    return Ne(c) ? Ro(c) : {};
  }
  function da(c, f, d) {
    var v = f(c);
    return Sn(c) ? v : Eo(v, d(c));
  }
  function ga(c) {
    return Ce.call(c);
  }
  function ma(c) {
    if (!Ne(c) || Ma(c))
      return !1;
    var f = ri(c) || Dr(c) ? Mo : To;
    return f.test(St(c));
  }
  function Ia(c) {
    if (!ti(c))
      return $o(c);
    var f = [];
    for (var d in Object(c))
      pt.call(c, d) && d != "constructor" && f.push(d);
    return f;
  }
  function va(c, f) {
    if (f)
      return c.slice();
    var d = new c.constructor(c.length);
    return c.copy(d), d;
  }
  function kn(c) {
    var f = new c.constructor(c.byteLength);
    return new Jr(f).set(new Jr(c)), f;
  }
  function ya(c, f) {
    var d = f ? kn(c.buffer) : c.buffer;
    return new c.constructor(d, c.byteOffset, c.byteLength);
  }
  function Ta(c, f, d) {
    var v = f ? d(Lr(c), !0) : Lr(c);
    return $r(v, _o, new c.constructor());
  }
  function ba(c) {
    var f = new c.constructor(c.source, yo.exec(c));
    return f.lastIndex = c.lastIndex, f;
  }
  function wa(c, f, d) {
    var v = f ? d(Hr(c), !0) : Hr(c);
    return $r(v, Co, new c.constructor());
  }
  function ka(c) {
    return Yr ? Object(Yr.call(c)) : {};
  }
  function Sa(c, f) {
    var d = f ? kn(c.buffer) : c.buffer;
    return new c.constructor(d, c.byteOffset, c.length);
  }
  function _a(c, f) {
    var d = -1, v = c.length;
    for (f || (f = Array(v)); ++d < v; )
      f[d] = c[d];
    return f;
  }
  function Xr(c, f, d, v) {
    d || (d = {});
    for (var A = -1, F = f.length; ++A < F; ) {
      var Z = f[A], q = v ? v(d[Z], c[Z], Z, d, c) : void 0;
      Qr(d, Z, q === void 0 ? c[Z] : q);
    }
    return d;
  }
  function Ca(c, f) {
    return Xr(c, Zr(c), f);
  }
  function xa(c) {
    return da(c, _n, Zr);
  }
  function Ee(c, f) {
    var d = c.__data__;
    return Aa(f) ? d[typeof f == "string" ? "string" : "hash"] : d.map;
  }
  function Kt(c, f) {
    var d = Po(c, f);
    return ma(d) ? d : void 0;
  }
  var Zr = Wr ? mn(Wr, Object) : Da, kt = ga;
  (vn && kt(new vn(new ArrayBuffer(1))) != ot || se && kt(new se()) != p || yn && kt(yn.resolve()) != T || Tn && kt(new Tn()) != k || bn && kt(new bn()) != b) && (kt = function(c) {
    var f = Ce.call(c), d = f == I ? c.constructor : void 0, v = d ? St(d) : void 0;
    if (v)
      switch (v) {
        case Do:
          return ot;
        case Lo:
          return p;
        case Ho:
          return T;
        case qo:
          return k;
        case Ko:
          return b;
      }
    return f;
  });
  function Ea(c) {
    var f = c.length, d = c.constructor(f);
    return f && typeof c[0] == "string" && pt.call(c, "index") && (d.index = c.index, d.input = c.input), d;
  }
  function Na(c) {
    return typeof c.constructor == "function" && !ti(c) ? pa(Vo(c)) : {};
  }
  function Pa(c, f, d, v) {
    var A = c.constructor;
    switch (f) {
      case P:
        return kn(c);
      case a:
      case u:
        return new A(+c);
      case ot:
        return ya(c, v);
      case Lt:
      case Nr:
      case Pr:
      case Or:
      case Ar:
      case Mr:
      case Vr:
      case Rr:
      case Fr:
        return Sa(c, v);
      case p:
        return Ta(c, v, d);
      case m:
      case w:
        return new A(c);
      case y:
        return ba(c);
      case k:
        return wa(c, v, d);
      case j:
        return ka(c);
    }
  }
  function Oa(c, f) {
    return f = f ?? i, !!f && (typeof c == "number" || bo.test(c)) && c > -1 && c % 1 == 0 && c < f;
  }
  function Aa(c) {
    var f = typeof c;
    return f == "string" || f == "number" || f == "symbol" || f == "boolean" ? c !== "__proto__" : c === null;
  }
  function Ma(c) {
    return !!qr && qr in c;
  }
  function ti(c) {
    var f = c && c.constructor, d = typeof f == "function" && f.prototype || _e;
    return c === d;
  }
  function St(c) {
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
  function Va(c) {
    return wn(c, !0, !0);
  }
  function ei(c, f) {
    return c === f || c !== c && f !== f;
  }
  function Ra(c) {
    return Fa(c) && pt.call(c, "callee") && (!Fo.call(c, "callee") || Ce.call(c) == s);
  }
  var Sn = Array.isArray;
  function ni(c) {
    return c != null && Ba(c.length) && !ri(c);
  }
  function Fa(c) {
    return $a(c) && ni(c);
  }
  var Ua = Bo || La;
  function ri(c) {
    var f = Ne(c) ? Ce.call(c) : "";
    return f == g || f == h;
  }
  function Ba(c) {
    return typeof c == "number" && c > -1 && c % 1 == 0 && c <= i;
  }
  function Ne(c) {
    var f = typeof c;
    return !!c && (f == "object" || f == "function");
  }
  function $a(c) {
    return !!c && typeof c == "object";
  }
  function _n(c) {
    return ni(c) ? fa(c) : Ia(c);
  }
  function Da() {
    return [];
  }
  function La() {
    return !1;
  }
  t.exports = Va;
})(Dn, Dn.exports);
const yi = Dn.exports;
class Oe {
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
class Ti {
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
function Cu(t, e) {
  const n = /* @__PURE__ */ Object.create(null), r = t.split(",");
  for (let i = 0; i < r.length; i++)
    n[r[i]] = !0;
  return e ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
function hr(t) {
  if (E(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const r = t[n], i = st(r) ? Nu(r) : hr(r);
      if (i)
        for (const s in i)
          e[s] = i[s];
    }
    return e;
  } else {
    if (st(t))
      return t;
    if (Q(t))
      return t;
  }
}
const xu = /;(?![^(]*\))/g, Eu = /:(.+)/;
function Nu(t) {
  const e = {};
  return t.split(xu).forEach((n) => {
    if (n) {
      const r = n.split(Eu);
      r.length > 1 && (e[r[0].trim()] = r[1].trim());
    }
  }), e;
}
function pr(t) {
  let e = "";
  if (st(t))
    e = t;
  else if (E(t))
    for (let n = 0; n < t.length; n++) {
      const r = pr(t[n]);
      r && (e += r + " ");
    }
  else if (Q(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const Y = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {};
process.env.NODE_ENV !== "production" && Object.freeze([]);
const dr = () => {
}, Pu = () => !1, Ou = /^on[^a-z]/, Au = (t) => Ou.test(t), it = Object.assign, Mu = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, Vu = Object.prototype.hasOwnProperty, x = (t, e) => Vu.call(t, e), E = Array.isArray, Xt = (t) => an(t) === "[object Map]", Ru = (t) => an(t) === "[object Set]", L = (t) => typeof t == "function", st = (t) => typeof t == "string", gr = (t) => typeof t == "symbol", Q = (t) => t !== null && typeof t == "object", Fu = (t) => Q(t) && L(t.then) && L(t.catch), Uu = Object.prototype.toString, an = (t) => Uu.call(t), Fs = (t) => an(t).slice(8, -1), Bu = (t) => an(t) === "[object Object]", mr = (t) => st(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, $u = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, hh = $u((t) => t.charAt(0).toUpperCase() + t.slice(1)), We = (t, e) => !Object.is(t, e), Du = (t, e, n) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
};
let bi;
const Lu = () => bi || (bi = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function wi(t, ...e) {
}
let Hu;
function qu(t, e = Hu) {
  e && e.active && e.effects.push(t);
}
const Ln = (t) => {
  const e = new Set(t);
  return e.w = 0, e.n = 0, e;
}, Us = (t) => (t.w & yt) > 0, Bs = (t) => (t.n & yt) > 0, Ku = ({ deps: t }) => {
  if (t.length)
    for (let e = 0; e < t.length; e++)
      t[e].w |= yt;
}, zu = (t) => {
  const { deps: e } = t;
  if (e.length) {
    let n = 0;
    for (let r = 0; r < e.length; r++) {
      const i = e[r];
      Us(i) && !Bs(i) ? i.delete(t) : e[n++] = i, i.w &= ~yt, i.n &= ~yt;
    }
    e.length = n;
  }
}, Hn = /* @__PURE__ */ new WeakMap();
let ue = 0, yt = 1;
const qn = 30;
let K;
const Pt = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), Kn = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class Gu {
  constructor(e, n = null, r) {
    this.fn = e, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, qu(this, r);
  }
  run() {
    if (!this.active)
      return this.fn();
    let e = K, n = Ot;
    for (; e; ) {
      if (e === this)
        return;
      e = e.parent;
    }
    try {
      return this.parent = K, K = this, Ot = !0, yt = 1 << ++ue, ue <= qn ? Ku(this) : ki(this), this.fn();
    } finally {
      ue <= qn && zu(this), yt = 1 << --ue, K = this.parent, Ot = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    K === this ? this.deferStop = !0 : this.active && (ki(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function ki(t) {
  const { deps: e } = t;
  if (e.length) {
    for (let n = 0; n < e.length; n++)
      e[n].delete(t);
    e.length = 0;
  }
}
let Ot = !0;
const $s = [];
function Ds() {
  $s.push(Ot), Ot = !1;
}
function Ls() {
  const t = $s.pop();
  Ot = t === void 0 ? !0 : t;
}
function nt(t, e, n) {
  if (Ot && K) {
    let r = Hn.get(t);
    r || Hn.set(t, r = /* @__PURE__ */ new Map());
    let i = r.get(n);
    i || r.set(n, i = Ln());
    const s = process.env.NODE_ENV !== "production" ? { effect: K, target: t, type: e, key: n } : void 0;
    Ju(i, s);
  }
}
function Ju(t, e) {
  let n = !1;
  ue <= qn ? Bs(t) || (t.n |= yt, n = !Us(t)) : n = !t.has(K), n && (t.add(K), K.deps.push(t), process.env.NODE_ENV !== "production" && K.onTrack && K.onTrack(Object.assign({ effect: K }, e)));
}
function Tt(t, e, n, r, i, s) {
  const o = Hn.get(t);
  if (!o)
    return;
  let a = [];
  if (e === "clear")
    a = [...o.values()];
  else if (n === "length" && E(t))
    o.forEach((l, g) => {
      (g === "length" || g >= r) && a.push(l);
    });
  else
    switch (n !== void 0 && a.push(o.get(n)), e) {
      case "add":
        E(t) ? mr(n) && a.push(o.get("length")) : (a.push(o.get(Pt)), Xt(t) && a.push(o.get(Kn)));
        break;
      case "delete":
        E(t) || (a.push(o.get(Pt)), Xt(t) && a.push(o.get(Kn)));
        break;
      case "set":
        Xt(t) && a.push(o.get(Pt));
        break;
    }
  const u = process.env.NODE_ENV !== "production" ? { target: t, type: e, key: n, newValue: r, oldValue: i, oldTarget: s } : void 0;
  if (a.length === 1)
    a[0] && (process.env.NODE_ENV !== "production" ? Ae(a[0], u) : Ae(a[0]));
  else {
    const l = [];
    for (const g of a)
      g && l.push(...g);
    process.env.NODE_ENV !== "production" ? Ae(Ln(l), u) : Ae(Ln(l));
  }
}
function Ae(t, e) {
  const n = E(t) ? t : [...t];
  for (const r of n)
    r.computed && Si(r, e);
  for (const r of n)
    r.computed || Si(r, e);
}
function Si(t, e) {
  (t !== K || t.allowRecurse) && (process.env.NODE_ENV !== "production" && t.onTrigger && t.onTrigger(it({ effect: t }, e)), t.scheduler ? t.scheduler() : t.run());
}
const Wu = /* @__PURE__ */ Cu("__proto__,__v_isRef,__isVue"), Hs = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(gr)), ju = /* @__PURE__ */ Ir(), Yu = /* @__PURE__ */ Ir(!0), Qu = /* @__PURE__ */ Ir(!0, !0), _i = /* @__PURE__ */ Xu();
function Xu() {
  const t = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    t[e] = function(...n) {
      const r = _(this);
      for (let s = 0, o = this.length; s < o; s++)
        nt(r, "get", s + "");
      const i = r[e](...n);
      return i === -1 || i === !1 ? r[e](...n.map(_)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    t[e] = function(...n) {
      Ds();
      const r = _(this)[e].apply(this, n);
      return Ls(), r;
    };
  }), t;
}
function Ir(t = !1, e = !1) {
  return function(r, i, s) {
    if (i === "__v_isReactive")
      return !t;
    if (i === "__v_isReadonly")
      return t;
    if (i === "__v_isShallow")
      return e;
    if (i === "__v_raw" && s === (t ? e ? Js : Gs : e ? dl : zs).get(r))
      return r;
    const o = E(r);
    if (!t && o && x(_i, i))
      return Reflect.get(_i, i, s);
    const a = Reflect.get(r, i, s);
    return (gr(i) ? Hs.has(i) : Wu(i)) || (t || nt(r, "get", i), e) ? a : $(a) ? o && mr(i) ? a : a.value : Q(a) ? t ? js(a) : Ws(a) : a;
  };
}
const Zu = /* @__PURE__ */ tl();
function tl(t = !1) {
  return function(n, r, i, s) {
    let o = n[r];
    if (Ft(o) && $(o) && !$(i))
      return !1;
    if (!t && !Ft(i) && (zn(i) || (i = _(i), o = _(o)), !E(n) && $(o) && !$(i)))
      return o.value = i, !0;
    const a = E(n) && mr(r) ? Number(r) < n.length : x(n, r), u = Reflect.set(n, r, i, s);
    return n === _(s) && (a ? We(i, o) && Tt(n, "set", r, i, o) : Tt(n, "add", r, i)), u;
  };
}
function el(t, e) {
  const n = x(t, e), r = t[e], i = Reflect.deleteProperty(t, e);
  return i && n && Tt(t, "delete", e, void 0, r), i;
}
function nl(t, e) {
  const n = Reflect.has(t, e);
  return (!gr(e) || !Hs.has(e)) && nt(t, "has", e), n;
}
function rl(t) {
  return nt(t, "iterate", E(t) ? "length" : Pt), Reflect.ownKeys(t);
}
const il = {
  get: ju,
  set: Zu,
  deleteProperty: el,
  has: nl,
  ownKeys: rl
}, qs = {
  get: Yu,
  set(t, e) {
    return process.env.NODE_ENV !== "production" && wi(`Set operation on key "${String(e)}" failed: target is readonly.`, t), !0;
  },
  deleteProperty(t, e) {
    return process.env.NODE_ENV !== "production" && wi(`Delete operation on key "${String(e)}" failed: target is readonly.`, t), !0;
  }
}, sl = /* @__PURE__ */ it({}, qs, {
  get: Qu
}), vr = (t) => t, cn = (t) => Reflect.getPrototypeOf(t);
function Me(t, e, n = !1, r = !1) {
  t = t.__v_raw;
  const i = _(t), s = _(e);
  n || (e !== s && nt(i, "get", e), nt(i, "get", s));
  const { has: o } = cn(i), a = r ? vr : n ? wr : br;
  if (o.call(i, e))
    return a(t.get(e));
  if (o.call(i, s))
    return a(t.get(s));
  t !== i && t.get(e);
}
function Ve(t, e = !1) {
  const n = this.__v_raw, r = _(n), i = _(t);
  return e || (t !== i && nt(r, "has", t), nt(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
}
function Re(t, e = !1) {
  return t = t.__v_raw, !e && nt(_(t), "iterate", Pt), Reflect.get(t, "size", t);
}
function Ci(t) {
  t = _(t);
  const e = _(this);
  return cn(e).has.call(e, t) || (e.add(t), Tt(e, "add", t, t)), this;
}
function xi(t, e) {
  e = _(e);
  const n = _(this), { has: r, get: i } = cn(n);
  let s = r.call(n, t);
  s ? process.env.NODE_ENV !== "production" && Ks(n, r, t) : (t = _(t), s = r.call(n, t));
  const o = i.call(n, t);
  return n.set(t, e), s ? We(e, o) && Tt(n, "set", t, e, o) : Tt(n, "add", t, e), this;
}
function Ei(t) {
  const e = _(this), { has: n, get: r } = cn(e);
  let i = n.call(e, t);
  i ? process.env.NODE_ENV !== "production" && Ks(e, n, t) : (t = _(t), i = n.call(e, t));
  const s = r ? r.call(e, t) : void 0, o = e.delete(t);
  return i && Tt(e, "delete", t, void 0, s), o;
}
function Ni() {
  const t = _(this), e = t.size !== 0, n = process.env.NODE_ENV !== "production" ? Xt(t) ? new Map(t) : new Set(t) : void 0, r = t.clear();
  return e && Tt(t, "clear", void 0, void 0, n), r;
}
function Fe(t, e) {
  return function(r, i) {
    const s = this, o = s.__v_raw, a = _(o), u = e ? vr : t ? wr : br;
    return !t && nt(a, "iterate", Pt), o.forEach((l, g) => r.call(i, u(l), u(g), s));
  };
}
function Ue(t, e, n) {
  return function(...r) {
    const i = this.__v_raw, s = _(i), o = Xt(s), a = t === "entries" || t === Symbol.iterator && o, u = t === "keys" && o, l = i[t](...r), g = n ? vr : e ? wr : br;
    return !e && nt(s, "iterate", u ? Kn : Pt), {
      next() {
        const { value: h, done: p } = l.next();
        return p ? { value: h, done: p } : {
          value: a ? [g(h[0]), g(h[1])] : g(h),
          done: p
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function dt(t) {
  return function(...e) {
    if (process.env.NODE_ENV !== "production") {
      const n = e[0] ? `on key "${e[0]}" ` : "";
    }
    return t === "delete" ? !1 : this;
  };
}
function ol() {
  const t = {
    get(s) {
      return Me(this, s);
    },
    get size() {
      return Re(this);
    },
    has: Ve,
    add: Ci,
    set: xi,
    delete: Ei,
    clear: Ni,
    forEach: Fe(!1, !1)
  }, e = {
    get(s) {
      return Me(this, s, !1, !0);
    },
    get size() {
      return Re(this);
    },
    has: Ve,
    add: Ci,
    set: xi,
    delete: Ei,
    clear: Ni,
    forEach: Fe(!1, !0)
  }, n = {
    get(s) {
      return Me(this, s, !0);
    },
    get size() {
      return Re(this, !0);
    },
    has(s) {
      return Ve.call(this, s, !0);
    },
    add: dt("add"),
    set: dt("set"),
    delete: dt("delete"),
    clear: dt("clear"),
    forEach: Fe(!0, !1)
  }, r = {
    get(s) {
      return Me(this, s, !0, !0);
    },
    get size() {
      return Re(this, !0);
    },
    has(s) {
      return Ve.call(this, s, !0);
    },
    add: dt("add"),
    set: dt("set"),
    delete: dt("delete"),
    clear: dt("clear"),
    forEach: Fe(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
    t[s] = Ue(s, !1, !1), n[s] = Ue(s, !0, !1), e[s] = Ue(s, !1, !0), r[s] = Ue(s, !0, !0);
  }), [
    t,
    n,
    e,
    r
  ];
}
const [al, cl, ul, ll] = /* @__PURE__ */ ol();
function yr(t, e) {
  const n = e ? t ? ll : ul : t ? cl : al;
  return (r, i, s) => i === "__v_isReactive" ? !t : i === "__v_isReadonly" ? t : i === "__v_raw" ? r : Reflect.get(x(n, i) && i in r ? n : r, i, s);
}
const fl = {
  get: /* @__PURE__ */ yr(!1, !1)
}, hl = {
  get: /* @__PURE__ */ yr(!0, !1)
}, pl = {
  get: /* @__PURE__ */ yr(!0, !0)
};
function Ks(t, e, n) {
  const r = _(n);
  if (r !== n && e.call(t, r)) {
    const i = Fs(t);
  }
}
const zs = /* @__PURE__ */ new WeakMap(), dl = /* @__PURE__ */ new WeakMap(), Gs = /* @__PURE__ */ new WeakMap(), Js = /* @__PURE__ */ new WeakMap();
function gl(t) {
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
  return t.__v_skip || !Object.isExtensible(t) ? 0 : gl(Fs(t));
}
function Ws(t) {
  return Ft(t) ? t : Tr(t, !1, il, fl, zs);
}
function js(t) {
  return Tr(t, !0, qs, hl, Gs);
}
function Be(t) {
  return Tr(t, !0, sl, pl, Js);
}
function Tr(t, e, n, r, i) {
  if (!Q(t))
    return process.env.NODE_ENV, t;
  if (t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const s = i.get(t);
  if (s)
    return s;
  const o = ml(t);
  if (o === 0)
    return t;
  const a = new Proxy(t, o === 2 ? r : n);
  return i.set(t, a), a;
}
function At(t) {
  return Ft(t) ? At(t.__v_raw) : !!(t && t.__v_isReactive);
}
function Ft(t) {
  return !!(t && t.__v_isReadonly);
}
function zn(t) {
  return !!(t && t.__v_isShallow);
}
function je(t) {
  return At(t) || Ft(t);
}
function _(t) {
  const e = t && t.__v_raw;
  return e ? _(e) : t;
}
function Il(t) {
  return Du(t, "__v_skip", !0), t;
}
const br = (t) => Q(t) ? Ws(t) : t, wr = (t) => Q(t) ? js(t) : t;
function $(t) {
  return !!(t && t.__v_isRef === !0);
}
function vl(t) {
  return $(t) ? t.value : t;
}
const yl = {
  get: (t, e, n) => vl(Reflect.get(t, e, n)),
  set: (t, e, n, r) => {
    const i = t[e];
    return $(i) && !$(n) ? (i.value = n, !0) : Reflect.set(t, e, n, r);
  }
};
function Tl(t) {
  return At(t) ? t : new Proxy(t, yl);
}
const Mt = [];
function bl(t) {
  Mt.push(t);
}
function wl() {
  Mt.pop();
}
function z(t, ...e) {
  Ds();
  const n = Mt.length ? Mt[Mt.length - 1].component : null, r = n && n.appContext.config.warnHandler, i = kl();
  if (r)
    Vt(r, n, 11, [
      t + e.join(""),
      n && n.proxy,
      i.map(({ vnode: s }) => `at <${fo(n, s.type)}>`).join(`
`),
      i
    ]);
  else {
    const s = [`[Vue warn]: ${t}`, ...e];
    i.length && s.push(`
`, ...Sl(i));
  }
  Ls();
}
function kl() {
  let t = Mt[Mt.length - 1];
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
function Sl(t) {
  const e = [];
  return t.forEach((n, r) => {
    e.push(...r === 0 ? [] : [`
`], ..._l(n));
  }), e;
}
function _l({ vnode: t, recurseCount: e }) {
  const n = e > 0 ? `... (${e} recursive calls)` : "", r = t.component ? t.component.parent == null : !1, i = ` at <${fo(t.component, t.type, r)}`, s = ">" + n;
  return t.props ? [i, ...Cl(t.props), s] : [i + s];
}
function Cl(t) {
  const e = [], n = Object.keys(t);
  return n.slice(0, 3).forEach((r) => {
    e.push(...Ys(r, t[r]));
  }), n.length > 3 && e.push(" ..."), e;
}
function Ys(t, e, n) {
  return st(e) ? (e = JSON.stringify(e), n ? e : [`${t}=${e}`]) : typeof e == "number" || typeof e == "boolean" || e == null ? n ? e : [`${t}=${e}`] : $(e) ? (e = Ys(t, _(e.value), !0), n ? e : [`${t}=Ref<`, e, ">"]) : L(e) ? [`${t}=fn${e.name ? `<${e.name}>` : ""}`] : (e = _(e), n ? e : [`${t}=`, e]);
}
const Qs = {
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
function Vt(t, e, n, r) {
  let i;
  try {
    i = r ? t(...r) : t();
  } catch (s) {
    Xs(s, e, n);
  }
  return i;
}
function Gn(t, e, n, r) {
  if (L(t)) {
    const s = Vt(t, e, n, r);
    return s && Fu(s) && s.catch((o) => {
      Xs(o, e, n);
    }), s;
  }
  const i = [];
  for (let s = 0; s < t.length; s++)
    i.push(Gn(t[s], e, n, r));
  return i;
}
function Xs(t, e, n, r = !0) {
  const i = e ? e.vnode : null;
  if (e) {
    let s = e.parent;
    const o = e.proxy, a = process.env.NODE_ENV !== "production" ? Qs[n] : n;
    for (; s; ) {
      const l = s.ec;
      if (l) {
        for (let g = 0; g < l.length; g++)
          if (l[g](t, o, a) === !1)
            return;
      }
      s = s.parent;
    }
    const u = e.appContext.config.errorHandler;
    if (u) {
      Vt(u, null, 10, [t, o, a]);
      return;
    }
  }
  xl(t, n, i, r);
}
function xl(t, e, n, r = !0) {
  if (process.env.NODE_ENV !== "production") {
    const i = Qs[e];
    if (n && bl(n), z(`Unhandled error${i ? ` during execution of ${i}` : ""}`), n && wl(), r)
      throw t;
  }
}
let Ye = !1, Jn = !1;
const rt = [];
let mt = 0;
const he = [];
let Jt = null, Ct = 0;
const pe = [];
let lt = null, xt = 0;
const Zs = /* @__PURE__ */ Promise.resolve();
let kr = null, Wn = null;
const El = 100;
function Nl(t) {
  const e = kr || Zs;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function Pl(t) {
  let e = mt + 1, n = rt.length;
  for (; e < n; ) {
    const r = e + n >>> 1;
    ye(rt[r]) < t ? e = r + 1 : n = r;
  }
  return e;
}
function to(t) {
  (!rt.length || !rt.includes(t, Ye && t.allowRecurse ? mt + 1 : mt)) && t !== Wn && (t.id == null ? rt.push(t) : rt.splice(Pl(t.id), 0, t), eo());
}
function eo() {
  !Ye && !Jn && (Jn = !0, kr = Zs.then(io));
}
function no(t, e, n, r) {
  E(t) ? n.push(...t) : (!e || !e.includes(t, t.allowRecurse ? r + 1 : r)) && n.push(t), eo();
}
function Ol(t) {
  no(t, Jt, he, Ct);
}
function ro(t) {
  no(t, lt, pe, xt);
}
function Sr(t, e = null) {
  if (he.length) {
    for (Wn = e, Jt = [...new Set(he)], he.length = 0, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), Ct = 0; Ct < Jt.length; Ct++)
      process.env.NODE_ENV !== "production" && _r(t, Jt[Ct]) || Jt[Ct]();
    Jt = null, Ct = 0, Wn = null, Sr(t, e);
  }
}
function Al(t) {
  if (Sr(), pe.length) {
    const e = [...new Set(pe)];
    if (pe.length = 0, lt) {
      lt.push(...e);
      return;
    }
    for (lt = e, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), lt.sort((n, r) => ye(n) - ye(r)), xt = 0; xt < lt.length; xt++)
      process.env.NODE_ENV !== "production" && _r(t, lt[xt]) || lt[xt]();
    lt = null, xt = 0;
  }
}
const ye = (t) => t.id == null ? 1 / 0 : t.id;
function io(t) {
  Jn = !1, Ye = !0, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), Sr(t), rt.sort((n, r) => ye(n) - ye(r));
  const e = process.env.NODE_ENV !== "production" ? (n) => _r(t, n) : dr;
  try {
    for (mt = 0; mt < rt.length; mt++) {
      const n = rt[mt];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && e(n))
          continue;
        Vt(n, null, 14);
      }
    }
  } finally {
    mt = 0, rt.length = 0, Al(t), Ye = !1, kr = null, (rt.length || he.length || pe.length) && io(t);
  }
}
function _r(t, e) {
  if (!t.has(e))
    t.set(e, 1);
  else {
    const n = t.get(e);
    if (n > El) {
      const r = e.ownerInstance, i = r && lo(r.type);
      return z(`Maximum recursive updates exceeded${i ? ` in component <${i}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`), !0;
    } else
      t.set(e, n + 1);
  }
}
const ce = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (Lu().__VUE_HMR_RUNTIME__ = {
  createRecord: Pn(Ml),
  rerender: Pn(Vl),
  reload: Pn(Rl)
});
const Qe = /* @__PURE__ */ new Map();
function Ml(t, e) {
  return Qe.has(t) ? !1 : (Qe.set(t, {
    initialDef: de(e),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function de(t) {
  return ho(t) ? t.__vccOpts : t;
}
function Vl(t, e) {
  const n = Qe.get(t);
  !n || (n.initialDef.render = e, [...n.instances].forEach((r) => {
    e && (r.render = e, de(r.type).render = e), r.renderCache = [], r.update();
  }));
}
function Rl(t, e) {
  const n = Qe.get(t);
  if (!n)
    return;
  e = de(e), Pi(n.initialDef, e);
  const r = [...n.instances];
  for (const i of r) {
    const s = de(i.type);
    ce.has(s) || (s !== n.initialDef && Pi(s, e), ce.add(s)), i.appContext.optionsCache.delete(i.type), i.ceReload ? (ce.add(s), i.ceReload(e.styles), ce.delete(s)) : i.parent ? (to(i.parent.update), i.parent.type.__asyncLoader && i.parent.ceReload && i.parent.ceReload(e.styles)) : i.appContext.reload ? i.appContext.reload() : typeof window < "u" && window.location.reload();
  }
  ro(() => {
    for (const i of r)
      ce.delete(de(i.type));
  });
}
function Pi(t, e) {
  it(t, e);
  for (const n in t)
    n !== "__file" && !(n in e) && delete t[n];
}
function Pn(t) {
  return (e, n) => {
    try {
      return t(e, n);
    } catch {
    }
  };
}
let Nt = null, Fl = null;
const Ul = (t) => t.__isSuspense;
function Bl(t, e) {
  e && e.pendingBranch ? E(t) ? e.effects.push(...t) : e.effects.push(t) : ro(t);
}
const Oi = {};
function $l(t, e, { immediate: n, deep: r, flush: i, onTrack: s, onTrigger: o } = Y) {
  process.env.NODE_ENV !== "production" && !e && (n !== void 0 && z('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), r !== void 0 && z('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const a = (w) => {
    z("Invalid watch source: ", w, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, u = Zt;
  let l, g = !1, h = !1;
  if ($(t) ? (l = () => t.value, g = zn(t)) : At(t) ? (l = () => t, r = !0) : E(t) ? (h = !0, g = t.some((w) => At(w) || zn(w)), l = () => t.map((w) => {
    if ($(w))
      return w.value;
    if (At(w))
      return jt(w);
    if (L(w))
      return Vt(w, u, 2);
    process.env.NODE_ENV !== "production" && a(w);
  })) : L(t) ? e ? l = () => Vt(t, u, 2) : l = () => {
    if (!(u && u.isUnmounted))
      return p && p(), Gn(t, u, 3, [m]);
  } : (l = dr, process.env.NODE_ENV !== "production" && a(t)), e && r) {
    const w = l;
    l = () => jt(w());
  }
  let p, m = (w) => {
    p = k.onStop = () => {
      Vt(w, u, 4);
    };
  }, I = h ? [] : Oi;
  const T = () => {
    if (!!k.active)
      if (e) {
        const w = k.run();
        (r || g || (h ? w.some((j, b) => We(j, I[b])) : We(w, I))) && (p && p(), Gn(e, u, 3, [
          w,
          I === Oi ? void 0 : I,
          m
        ]), I = w);
      } else
        k.run();
  };
  T.allowRecurse = !!e;
  let y;
  i === "sync" ? y = T : i === "post" ? y = () => Vi(T, u && u.suspense) : y = () => Ol(T);
  const k = new Gu(l, y);
  return process.env.NODE_ENV !== "production" && (k.onTrack = s, k.onTrigger = o), e ? n ? T() : I = k.run() : i === "post" ? Vi(k.run.bind(k), u && u.suspense) : k.run(), () => {
    k.stop(), u && u.scope && Mu(u.scope.effects, k);
  };
}
function Dl(t, e, n) {
  const r = this.proxy, i = st(t) ? t.includes(".") ? Ll(r, t) : () => r[t] : t.bind(r, r);
  let s;
  L(e) ? s = e : (s = e.handler, n = e);
  const o = Zt;
  Ri(this);
  const a = $l(i, s.bind(r), n);
  return o ? Ri(o) : cf(), a;
}
function Ll(t, e) {
  const n = e.split(".");
  return () => {
    let r = t;
    for (let i = 0; i < n.length && r; i++)
      r = r[n[i]];
    return r;
  };
}
function jt(t, e) {
  if (!Q(t) || t.__v_skip || (e = e || /* @__PURE__ */ new Set(), e.has(t)))
    return t;
  if (e.add(t), $(t))
    jt(t.value, e);
  else if (E(t))
    for (let n = 0; n < t.length; n++)
      jt(t[n], e);
  else if (Ru(t) || Xt(t))
    t.forEach((n) => {
      jt(n, e);
    });
  else if (Bu(t))
    for (const n in t)
      jt(t[n], e);
  return t;
}
const Hl = Symbol(), jn = (t) => t ? uf(t) ? lf(t) || t.proxy : jn(t.parent) : null, Xe = /* @__PURE__ */ it(/* @__PURE__ */ Object.create(null), {
  $: (t) => t,
  $el: (t) => t.vnode.el,
  $data: (t) => t.data,
  $props: (t) => process.env.NODE_ENV !== "production" ? Be(t.props) : t.props,
  $attrs: (t) => process.env.NODE_ENV !== "production" ? Be(t.attrs) : t.attrs,
  $slots: (t) => process.env.NODE_ENV !== "production" ? Be(t.slots) : t.slots,
  $refs: (t) => process.env.NODE_ENV !== "production" ? Be(t.refs) : t.refs,
  $parent: (t) => jn(t.parent),
  $root: (t) => jn(t.root),
  $emit: (t) => t.emit,
  $options: (t) => __VUE_OPTIONS_API__ ? Gl(t) : t.type,
  $forceUpdate: (t) => t.f || (t.f = () => to(t.update)),
  $nextTick: (t) => t.n || (t.n = Nl.bind(t.proxy)),
  $watch: (t) => __VUE_OPTIONS_API__ ? Dl.bind(t) : dr
}), ql = (t) => t === "_" || t === "$", Kl = {
  get({ _: t }, e) {
    const { ctx: n, setupState: r, data: i, props: s, accessCache: o, type: a, appContext: u } = t;
    if (process.env.NODE_ENV !== "production" && e === "__isVue")
      return !0;
    if (process.env.NODE_ENV !== "production" && r !== Y && r.__isScriptSetup && x(r, e))
      return r[e];
    let l;
    if (e[0] !== "$") {
      const m = o[e];
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
        if (r !== Y && x(r, e))
          return o[e] = 1, r[e];
        if (i !== Y && x(i, e))
          return o[e] = 2, i[e];
        if ((l = t.propsOptions[0]) && x(l, e))
          return o[e] = 3, s[e];
        if (n !== Y && x(n, e))
          return o[e] = 4, n[e];
        (!__VUE_OPTIONS_API__ || zl) && (o[e] = 0);
      }
    }
    const g = Xe[e];
    let h, p;
    if (g)
      return e === "$attrs" && (nt(t, "get", e), process.env.NODE_ENV !== "production" && void 0), g(t);
    if ((h = a.__cssModules) && (h = h[e]))
      return h;
    if (n !== Y && x(n, e))
      return o[e] = 4, n[e];
    if (p = u.config.globalProperties, x(p, e))
      return p[e];
    process.env.NODE_ENV !== "production" && Nt && (!st(e) || e.indexOf("__v") !== 0) && (i !== Y && ql(e[0]) && x(i, e) ? z(`Property ${JSON.stringify(e)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : t === Nt && z(`Property ${JSON.stringify(e)} was accessed during render but is not defined on instance.`));
  },
  set({ _: t }, e, n) {
    const { data: r, setupState: i, ctx: s } = t;
    return i !== Y && x(i, e) ? (i[e] = n, !0) : r !== Y && x(r, e) ? (r[e] = n, !0) : x(t.props, e) ? (process.env.NODE_ENV !== "production" && z(`Attempting to mutate prop "${e}". Props are readonly.`, t), !1) : e[0] === "$" && e.slice(1) in t ? (process.env.NODE_ENV !== "production" && z(`Attempting to mutate public property "${e}". Properties starting with $ are reserved and readonly.`, t), !1) : (process.env.NODE_ENV !== "production" && e in t.appContext.config.globalProperties ? Object.defineProperty(s, e, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : s[e] = n, !0);
  },
  has({ _: { data: t, setupState: e, accessCache: n, ctx: r, appContext: i, propsOptions: s } }, o) {
    let a;
    return !!n[o] || t !== Y && x(t, o) || e !== Y && x(e, o) || (a = s[0]) && x(a, o) || x(r, o) || x(Xe, o) || x(i.config.globalProperties, o);
  },
  defineProperty(t, e, n) {
    return n.get != null ? t._.accessCache[e] = 0 : x(n, "value") && this.set(t, e, n.value, null), Reflect.defineProperty(t, e, n);
  }
};
process.env.NODE_ENV !== "production" && (Kl.ownKeys = (t) => (z("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(t)));
let zl = !0;
function Gl(t) {
  const e = t.type, { mixins: n, extends: r } = e, { mixins: i, optionsCache: s, config: { optionMergeStrategies: o } } = t.appContext, a = s.get(e);
  let u;
  return a ? u = a : !i.length && !n && !r ? u = e : (u = {}, i.length && i.forEach((l) => Ze(u, l, o, !0)), Ze(u, e, o)), s.set(e, u), u;
}
function Ze(t, e, n, r = !1) {
  const { mixins: i, extends: s } = e;
  s && Ze(t, s, n, !0), i && i.forEach((o) => Ze(t, o, n, !0));
  for (const o in e)
    if (r && o === "expose")
      process.env.NODE_ENV !== "production" && z('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const a = Jl[o] || n && n[o];
      t[o] = a ? a(t[o], e[o]) : e[o];
    }
  return t;
}
const Jl = {
  data: Ai,
  props: Et,
  emits: Et,
  methods: Et,
  computed: Et,
  beforeCreate: U,
  created: U,
  beforeMount: U,
  mounted: U,
  beforeUpdate: U,
  updated: U,
  beforeDestroy: U,
  beforeUnmount: U,
  destroyed: U,
  unmounted: U,
  activated: U,
  deactivated: U,
  errorCaptured: U,
  serverPrefetch: U,
  components: Et,
  directives: Et,
  watch: jl,
  provide: Ai,
  inject: Wl
};
function Ai(t, e) {
  return e ? t ? function() {
    return it(L(t) ? t.call(this, this) : t, L(e) ? e.call(this, this) : e);
  } : e : t;
}
function Wl(t, e) {
  return Et(Mi(t), Mi(e));
}
function Mi(t) {
  if (E(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++)
      e[t[n]] = t[n];
    return e;
  }
  return t;
}
function U(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function Et(t, e) {
  return t ? it(it(/* @__PURE__ */ Object.create(null), t), e) : e;
}
function jl(t, e) {
  if (!t)
    return e;
  if (!e)
    return t;
  const n = it(/* @__PURE__ */ Object.create(null), t);
  for (const r in e)
    n[r] = U(t[r], e[r]);
  return n;
}
function Yl() {
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
const Vi = Bl, Ql = (t) => t.__isTeleport, so = Symbol(process.env.NODE_ENV !== "production" ? "Fragment" : void 0), Xl = Symbol(process.env.NODE_ENV !== "production" ? "Text" : void 0), Zl = Symbol(process.env.NODE_ENV !== "production" ? "Comment" : void 0);
Symbol(process.env.NODE_ENV !== "production" ? "Static" : void 0);
let Yt = null;
function tf(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
const ef = (...t) => co(...t), oo = "__vInternal", ao = ({ key: t }) => t ?? null, qe = ({ ref: t, ref_key: e, ref_for: n }) => t != null ? st(t) || $(t) || L(t) ? { i: Nt, r: t, k: e, f: !!n } : t : null;
function nf(t, e = null, n = null, r = 0, i = null, s = t === so ? 0 : 1, o = !1, a = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && ao(e),
    ref: e && qe(e),
    scopeId: Fl,
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
    appContext: null
  };
  return a ? (Cr(u, n), s & 128 && t.normalize(u)) : n && (u.shapeFlag |= st(n) ? 8 : 16), process.env.NODE_ENV !== "production" && u.key !== u.key && z("VNode created with invalid key (NaN). VNode type:", u.type), !o && Yt && (u.patchFlag > 0 || s & 6) && u.patchFlag !== 32 && Yt.push(u), u;
}
const rf = process.env.NODE_ENV !== "production" ? ef : co;
function co(t, e = null, n = null, r = 0, i = null, s = !1) {
  if ((!t || t === Hl) && (process.env.NODE_ENV !== "production" && !t && z(`Invalid vnode type when creating vnode: ${t}.`), t = Zl), tf(t)) {
    const a = tn(t, e, !0);
    return n && Cr(a, n), !s && Yt && (a.shapeFlag & 6 ? Yt[Yt.indexOf(t)] = a : Yt.push(a)), a.patchFlag |= -2, a;
  }
  if (ho(t) && (t = t.__vccOpts), e) {
    e = sf(e);
    let { class: a, style: u } = e;
    a && !st(a) && (e.class = pr(a)), Q(u) && (je(u) && !E(u) && (u = it({}, u)), e.style = hr(u));
  }
  const o = st(t) ? 1 : Ul(t) ? 128 : Ql(t) ? 64 : Q(t) ? 4 : L(t) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && o & 4 && je(t) && (t = _(t), z("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `
Component that was made reactive: `, t)), nf(t, e, n, r, i, o, s, !0);
}
function sf(t) {
  return t ? je(t) || oo in t ? it({}, t) : t : null;
}
function tn(t, e, n = !1) {
  const { props: r, ref: i, patchFlag: s, children: o } = t, a = e ? af(r || {}, e) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: a,
    key: a && ao(a),
    ref: e && e.ref ? n && i ? E(i) ? i.concat(qe(e)) : [i, qe(e)] : qe(e) : i,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && s === -1 && E(o) ? o.map(uo) : o,
    target: t.target,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    patchFlag: e && t.type !== so ? s === -1 ? 16 : s | 16 : s,
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
    anchor: t.anchor
  };
}
function uo(t) {
  const e = tn(t);
  return E(t.children) && (e.children = t.children.map(uo)), e;
}
function of(t = " ", e = 0) {
  return rf(Xl, null, t, e);
}
function Cr(t, e) {
  let n = 0;
  const { shapeFlag: r } = t;
  if (e == null)
    e = null;
  else if (E(e))
    n = 16;
  else if (typeof e == "object")
    if (r & 65) {
      const i = e.default;
      i && (i._c && (i._d = !1), Cr(t, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = e._;
      !i && !(oo in e) ? e._ctx = Nt : i === 3 && Nt && (Nt.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else
    L(e) ? (e = { default: e, _ctx: Nt }, n = 32) : (e = String(e), r & 64 ? (n = 16, e = [of(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function af(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    for (const i in r)
      if (i === "class")
        e.class !== r.class && (e.class = pr([e.class, r.class]));
      else if (i === "style")
        e.style = hr([e.style, r.style]);
      else if (Au(i)) {
        const s = e[i], o = r[i];
        o && s !== o && !(E(s) && s.includes(o)) && (e[i] = s ? [].concat(s, o) : o);
      } else
        i !== "" && (e[i] = r[i]);
  }
  return e;
}
Yl();
let Zt = null;
const Ri = (t) => {
  Zt = t, t.scope.on();
}, cf = () => {
  Zt && Zt.scope.off(), Zt = null;
};
function uf(t) {
  return t.vnode.shapeFlag & 4;
}
function lf(t) {
  if (t.exposed)
    return t.exposeProxy || (t.exposeProxy = new Proxy(Tl(Il(t.exposed)), {
      get(e, n) {
        if (n in e)
          return e[n];
        if (n in Xe)
          return Xe[n](t);
      }
    }));
}
const ff = /(?:^|[-_])(\w)/g, hf = (t) => t.replace(ff, (e) => e.toUpperCase()).replace(/[-_]/g, "");
function lo(t, e = !0) {
  return L(t) ? t.displayName || t.name : t.name || e && t.__name;
}
function fo(t, e, n = !1) {
  let r = lo(e);
  if (!r && e.__file) {
    const i = e.__file.match(/([^/\\]+)\.\w+$/);
    i && (r = i[1]);
  }
  if (!r && t && t.parent) {
    const i = (s) => {
      for (const o in s)
        if (s[o] === e)
          return o;
    };
    r = i(t.components || t.parent.type.components) || i(t.appContext.components);
  }
  return r ? hf(r) : n ? "App" : "Anonymous";
}
function ho(t) {
  return L(t) && "__vccOpts" in t;
}
Symbol(process.env.NODE_ENV !== "production" ? "ssrContext" : "");
function On(t) {
  return !!(t && t.__v_isShallow);
}
function pf() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const t = { style: "color:#3ba776" }, e = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, r = { style: "color:#9d288c" }, i = {
    header(h) {
      return Q(h) ? h.__isVue ? ["div", t, "VueInstance"] : $(h) ? [
        "div",
        {},
        ["span", t, g(h)],
        "<",
        a(h.value),
        ">"
      ] : At(h) ? [
        "div",
        {},
        ["span", t, On(h) ? "ShallowReactive" : "Reactive"],
        "<",
        a(h),
        `>${Ft(h) ? " (readonly)" : ""}`
      ] : Ft(h) ? [
        "div",
        {},
        ["span", t, On(h) ? "ShallowReadonly" : "Readonly"],
        "<",
        a(h),
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
    h.type.props && h.props && p.push(o("props", _(h.props))), h.setupState !== Y && p.push(o("setup", h.setupState)), h.data !== Y && p.push(o("data", _(h.data)));
    const m = u(h, "computed");
    m && p.push(o("computed", m));
    const I = u(h, "inject");
    return I && p.push(o("injected", I)), p.push([
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
  function o(h, p) {
    return p = it({}, p), Object.keys(p).length ? [
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
        ...Object.keys(p).map((m) => [
          "div",
          {},
          ["span", r, m + ": "],
          a(p[m], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function a(h, p = !0) {
    return typeof h == "number" ? ["span", e, h] : typeof h == "string" ? ["span", n, JSON.stringify(h)] : typeof h == "boolean" ? ["span", r, h] : Q(h) ? ["object", { object: p ? _(h) : h }] : ["span", n, String(h)];
  }
  function u(h, p) {
    const m = h.type;
    if (L(m))
      return;
    const I = {};
    for (const T in h.ctx)
      l(m, T, p) && (I[T] = h.ctx[T]);
    return I;
  }
  function l(h, p, m) {
    const I = h[m];
    if (E(I) && I.includes(p) || Q(I) && p in I || h.extends && l(h.extends, p, m) || h.mixins && h.mixins.some((T) => l(T, p, m)))
      return !0;
  }
  function g(h) {
    return On(h) ? "ShallowRef" : h.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(i) : window.devtoolsFormatters = [i];
}
function df() {
  pf();
}
process.env.NODE_ENV !== "production" && df();
function gf(t) {
  const e = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"], n = t % 12;
  return e[n];
}
function ph(t) {
  const e = Math.floor(t / 12) - 2;
  return gf(t) + e.toString();
}
const mf = /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i, If = {
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
function dh(t) {
  const e = mf.exec(t);
  if (!e)
    return -1;
  const n = e[1], r = e[2];
  return If[n.toLowerCase()] + (parseInt(r, 10) + 2) * 12;
}
function Fi(t, e, n, r) {
  return `${t} // ${e} // ${n} // ${r}`;
}
function vf(t, e, n) {
  return `${t} // ${e} // ${n}`;
}
function gh(t) {
  const e = en(t);
  return vf(e.manufacturerName, e.pluginFormatName, e.name);
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
function yf(t, e) {
  return t === e;
}
function Tf(t, e) {
  const n = en(t), r = en(e);
  if (M.keys(n).length !== M.keys(r).length)
    return !1;
  for (const i of M.keys(n))
    if (i !== "pluginVersion" && n[i] !== r[i])
      return !1;
  return !0;
}
class mh {
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
function bf(t) {
  return t > -100 ? Math.exp((t - 6) * (1 / 20)) : 0;
}
function Ih(t) {
  return t <= 0 ? -100 : 20 * Math.log10(t);
}
function vh(t) {
  return t > 0 ? 20 * Math.log(t) + 6 : -100;
}
function yh(t) {
  return t > 0 ? Math.pow(10, (20 * Math.log(t) + 6) * (1 / 20)) : 0;
}
function Th(t) {
  return t > 0 ? Math.exp((20 * Math.log10(t) - 6) * (1 / 20)) : 0;
}
function bh(t, e, n, r, i) {
  return (t - e) / (n - e) * (i - r) + r;
}
function wh(t) {
  return 440 * Math.pow(2, (t - 69) / 12);
}
function kh(t) {
  return je(t) || $(t) ? _(t) : t;
}
var wf = /* @__PURE__ */ ((t) => (t[t.BassDrum2 = 35] = "BassDrum2", t[t.BassDrum1 = 36] = "BassDrum1", t[t.SideStick = 37] = "SideStick", t[t.SnareDrum1 = 38] = "SnareDrum1", t[t.HandClap = 39] = "HandClap", t[t.SnareDrum2 = 40] = "SnareDrum2", t[t.LowTom2 = 41] = "LowTom2", t[t.ClosedHiHat = 42] = "ClosedHiHat", t[t.LowTom1 = 43] = "LowTom1", t[t.PedalHiHat = 44] = "PedalHiHat", t[t.MidTom2 = 45] = "MidTom2", t[t.OpenHiHat = 46] = "OpenHiHat", t[t.MidTom1 = 47] = "MidTom1", t[t.HighTom2 = 48] = "HighTom2", t[t.CrashCymbal1 = 49] = "CrashCymbal1", t[t.HighTom1 = 50] = "HighTom1", t[t.RideCymbal1 = 51] = "RideCymbal1", t[t.ChineseCymbal = 52] = "ChineseCymbal", t[t.RideBell = 53] = "RideBell", t[t.Tambourine = 54] = "Tambourine", t[t.SplashCymbal = 55] = "SplashCymbal", t[t.Cowbell = 56] = "Cowbell", t[t.CrashCymbal2 = 57] = "CrashCymbal2", t[t.VibraSlap = 58] = "VibraSlap", t[t.RideCymbal2 = 59] = "RideCymbal2", t[t.HighBongo = 60] = "HighBongo", t[t.LowBongo = 61] = "LowBongo", t[t.MuteHighConga = 62] = "MuteHighConga", t[t.OpenHighConga = 63] = "OpenHighConga", t[t.LowConga = 64] = "LowConga", t[t.HighTimbale = 65] = "HighTimbale", t[t.LowTimbale = 66] = "LowTimbale", t[t.HighAgogo = 67] = "HighAgogo", t[t.LowAgogo = 68] = "LowAgogo", t[t.Cabasa = 69] = "Cabasa", t[t.Maracas = 70] = "Maracas", t[t.ShortWhistle = 71] = "ShortWhistle", t[t.LongWhistle = 72] = "LongWhistle", t[t.ShortGuiro = 73] = "ShortGuiro", t[t.LongGuiro = 74] = "LongGuiro", t[t.Claves = 75] = "Claves", t[t.HighWoodBlock = 76] = "HighWoodBlock", t[t.LowWoodBlock = 77] = "LowWoodBlock", t[t.MuteCuica = 78] = "MuteCuica", t[t.OpenCuica = 79] = "OpenCuica", t[t.MuteTriangle = 80] = "MuteTriangle", t[t.OpenTriangle = 81] = "OpenTriangle", t[t.Shaker = 82] = "Shaker", t))(wf || {});
class un {
  name;
  manufacturerName;
  pluginFormatName;
  pluginVersion;
  isEnabled = !0;
  localInstanceIdInternal;
  base64StatesInternal;
  constructor(e, n, r, i) {
    this.name = e, this.manufacturerName = n, this.pluginFormatName = r, this.pluginVersion = i, this.localInstanceIdInternal = un.generateAudioPluginInstanceIdInternal();
  }
  getTuneflowId() {
    return Fi(this.manufacturerName, this.pluginFormatName, this.name, this.pluginVersion);
  }
  clone(e) {
    const n = e.createAudioPlugin(this.getTuneflowId());
    return n.setIsEnabled(this.isEnabled), n;
  }
  matchesTfId(e) {
    return yf(e, this.getTuneflowId());
  }
  matchesTfIdIgnoreVersion(e) {
    return Tf(e, this.getTuneflowId());
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
  static DEFAULT_SYNTH_TFID = Fi("TuneFlow", "VST3", "TFSynth", "1.0.0");
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
    clip: o
  }) {
    this.pitch = e, this.velocity = n, this.startTick = r, this.endTick = i, this.idInternal = s, this.clipInternal = o;
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
    return It.isNoteRangeValid(this.startTick, this.endTick);
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
var le = /* @__PURE__ */ ((t) => (t[t.MIDI_CLIP = 1] = "MIDI_CLIP", t[t.AUDIO_CLIP = 2] = "AUDIO_CLIP", t))(le || {});
class et {
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
    id: i = et.generateClipIdInternal(),
    track: s = void 0,
    clipEndTick: o = void 0,
    audioClipData: a = void 0
  }) {
    if (this.song = e, this.track = s, this.id = i, this.type = n, this.notes = [], n === 2) {
      if (!a)
        throw new Error("Audio clip data must be provided for audio clips.");
      this.audioClipData = {
        audioFilePath: a.audioFilePath,
        startTick: a.startTick,
        duration: a.duration
      }, r = M.isNumber(r) ? Math.max(r, a.startTick) : a.startTick;
      const u = this.getAudioEndTick();
      (!M.isNumber(o) || u < o) && (o = u), this.clipStartTick = r, this.clipEndTick = o;
    } else if (n === 1) {
      if (this.clipStartTick = r, !M.isNumber(o))
        throw new Error("clip end tick must be provided when creating MIDI clip.");
      this.clipEndTick = o;
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
    return et.getNotesInRange(this.notes, this.clipStartTick, this.clipEndTick);
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
    resolveClipConflict: o = !0
  }) {
    if (this.type !== 1 || !It.isValidPitch(e) || !It.isNoteRangeValid(r, i) || !It.isNoteVelocityValid(n))
      return null;
    const a = new It({
      pitch: e,
      velocity: n,
      startTick: r,
      endTick: i,
      id: this.getNextNoteIdInternal()
    });
    return r < this.clipStartTick && s && this.adjustClipLeft(r, o), i > this.clipEndTick && s && this.adjustClipRight(i, o), this.orderedInsertNote(this.notes, a), a;
  }
  getNoteIndexInternal(e) {
    const n = V.lt(this.notes, e, (r, i) => r.getStartTick() - i.getStartTick());
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
    const r = V.ge(e, n, (i, s) => i.getStartTick() - s.getStartTick());
    r < 0 ? e.push(n) : e.splice(r, 0, n), n.clipInternal = this;
  }
  adjustClipLeft(e, n = !0) {
    e = Math.max(0, e), this.type === 2 && this.audioClipData && (e = Math.max(e, this.audioClipData.startTick)), e > this.clipEndTick ? this.deleteFromParent(!0) : (n && this.track && this.track.resolveClipConflictInternal(this.getId(), Math.min(this.clipStartTick, e), this.clipEndTick), this.clipStartTick = e);
  }
  adjustClipRight(e, n = !0) {
    if (this.type === 2) {
      const r = this.getAudioEndTick();
      M.isNumber(r) && (e = Math.min(e, r));
    }
    e < this.clipStartTick || e < 0 ? this.deleteFromParent(!0) : (n && this.track && this.track.resolveClipConflictInternal(this.getId(), this.clipStartTick, Math.max(this.clipEndTick, e)), this.clipEndTick = e);
  }
  moveClip(e, n) {
    const r = Math.max(0, this.clipStartTick + e), i = this.clipEndTick + e;
    if (i < 0) {
      this.deleteFromParent(!0);
      return;
    }
    if (this.track && this.track.resolveClipConflictInternal(this.getId(), r, i), this.track) {
      const a = this.track.getClipIndex(this);
      this.track.deleteClipAt(a, !1);
    }
    const s = this.clipStartTick, o = this.clipEndTick;
    if (this.type === 1) {
      this.clipStartTick = r, this.clipEndTick = i;
      for (const a of this.notes)
        a.setStartTick(a.getStartTick() + e), a.setEndTick(a.getEndTick() + e);
    } else if (this.type === 2) {
      if (!this.audioClipData)
        throw new Error("Cannot move audio clip without audio data");
      const a = this.song, u = a.tickToSeconds(this.audioClipData.startTick), l = a.tickToSeconds(s), h = a.tickToSeconds(o) - l, p = l - u, m = a.tickToSeconds(this.clipStartTick + e), I = m - p, T = m + h;
      if (this.clipStartTick = r, this.clipEndTick = a.secondsToTick(T), this.audioClipData.startTick = a.secondsToTick(I), this.clipEndTick < 0) {
        this.deleteFromParent(!0);
        return;
      }
    }
    this.track && (this.track.orderedInsertClipInternal(this), n && this.track.getAutomation().moveAllPointsWithinRange(s, o, e, 0));
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
    if (!M.isNumber(e))
      return;
    const n = this.song.tickToSeconds(this.audioClipData.startTick);
    return this.song.secondsToTick(n + e);
  }
  static getNotesInRange(e, n, r) {
    return et.getNotesInRangeImpl(e, n, r, (i) => ({ getStartTick: () => i }), (i) => i.getStartTick(), (i) => i.getEndTick());
  }
  static getNotesInRangeImpl(e, n, r, i, s, o) {
    let a = Math.max(0, V.lt(e, i(n), (l, g) => s(l) - s(g)));
    for (; e[a] && !et.isNoteInClip(s(e[a]), o(e[a]), n, r); )
      a += 1;
    if (a >= e.length)
      return [];
    let u = Math.min(e.length - 1, V.gt(e, i(r), (l, g) => s(l) - s(g)));
    for (; e[u] && !et.isNoteInClip(s(e[u]), o(e[u]), n, r); )
      u -= 1;
    return u < 0 ? [] : u < a ? [] : e.slice(a, u + 1);
  }
  static isNoteInClip(e, n, r, i) {
    return (e >= r || r === 0 && e <= 0) && e < i && n > e;
  }
  static getNotePlayableRange(e, n, r, i) {
    if (!et.isNoteInClip(e, n, r, i))
      return null;
    const s = Math.max(e, r), o = Math.min(n, i);
    return s > o ? null : {
      startTick: s,
      endTick: o
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
        const s = i + 1, o = this.getClipEndTick();
        if (this.adjustClipRight(r - 1, !1), this.track) {
          if (this.type === 1) {
            const a = this.track.createMIDIClip({
              clipStartTick: s,
              clipEndTick: o
            }), u = et.getNotesInRange(this.notes, s, o);
            for (const l of u)
              a.createNote({
                pitch: l.getPitch(),
                velocity: l.getVelocity(),
                startTick: l.getStartTick(),
                endTick: l.getEndTick(),
                updateClipRange: !1,
                resolveClipConflict: !1
              });
          } else if (this.type === 2) {
            const a = this.audioClipData;
            this.track.createAudioClip({
              clipStartTick: s,
              clipEndTick: o,
              audioClipData: {
                audioFilePath: a.audioFilePath,
                startTick: a.startTick,
                duration: a.duration
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
var Yn = /* @__PURE__ */ ((t) => (t[t.UNDEFINED = 0] = "UNDEFINED", t[t.VOLUME = 1] = "VOLUME", t[t.PAN = 2] = "PAN", t[t.AUDIO_PLUGIN = 3] = "AUDIO_PLUGIN", t))(Yn || {});
class tt {
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
    return tt.areAutomationTargetsEqual(this.getType(), e.getType(), this.getPluginInstanceId(), e.getPluginInstanceId(), this.getParamId(), e.getParamId());
  }
  clone() {
    return new tt(this.type, this.pluginInstanceId, this.paramId);
  }
  toTfAutomationTargetId() {
    return tt.encodeAutomationTarget(this.type, this.pluginInstanceId, this.paramId);
  }
  static fromTfAutomationTargetId(e) {
    return tt.decodeAutomationTarget(e);
  }
  static encodeAutomationTarget(e, n, r) {
    return e === 3 ? `${e}^^${n}^^${r}` : `${e}`;
  }
  static decodeAutomationTarget(e) {
    const n = e.split("^^");
    if (n.length === 0)
      throw new Error(`Invalid automation target id: ${e}`);
    const r = Number(n[0]);
    return n.length > 2 ? new tt(r, n[1], n[2]) : new tt(r);
  }
  static areAutomationTargetsEqual(e, n, r, i, s, o) {
    return tt.encodeAutomationTarget(e, r, s) === tt.encodeAutomationTarget(n, i, o);
  }
}
class te {
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
    return te.getPointsInRangeImpl(this.points, e, n);
  }
  static getPointsInRangeImpl(e, n, r) {
    const i = V.ge(e, { tick: n }, (o, a) => o.tick - a.tick), s = [];
    for (let o = i; o < e.length; o += 1) {
      const a = e[o];
      if (a.tick > r)
        break;
      s.push(a);
    }
    return s;
  }
  addPoint(e, n, r = !1) {
    const i = {
      tick: e,
      value: Math.max(0, Math.min(1, n)),
      id: this.getNextPointIdInternal()
    };
    return te.orderedInsertPointInternal(this.points, i, r), i;
  }
  removePoints(e) {
    const n = new Set(e);
    for (let r = this.points.length - 1; r >= 0; r -= 1) {
      const i = this.points[r];
      n.has(i.id) && this.points.splice(r, 1);
    }
  }
  removePointsInRange(e, n) {
    const r = V.ge(this.points, { tick: e }, (s, o) => s.tick - o.tick);
    if (r >= this.points.length)
      return;
    let i = r;
    for (; i + 1 < this.points.length && this.points[i + 1].tick <= n; )
      i += 1;
    this.points.splice(r, i - r + 1);
  }
  movePointsInRange(e, n, r, i, s = !0) {
    const o = this.getPointsInRange(e, n);
    this.movePoints(o.map((a) => a.id), r, i, s);
  }
  moveAllPoints(e, n, r = !0) {
    this.movePoints(this.points.map((i) => i.id), e, n, r);
  }
  movePoints(e, n, r, i = !0) {
    if (e.length === 0)
      return;
    const s = new Set(e);
    let o, a;
    const u = [];
    for (let l = 0; l < this.points.length; l += 1) {
      const g = this.points[l];
      !s.has(g.id) || (u.push(g), o === void 0 && (o = l), a = l);
    }
    if (!(o === void 0 || a === void 0)) {
      if (i) {
        if (n < 0) {
          const l = Math.max(0, this.points[o].tick + n), g = V.gt(this.points, { tick: l }, (h, p) => h.tick - p.tick);
          g < o && this.points.splice(g, o - g);
        } else if (n > 0) {
          const l = this.points[a].tick + n, g = V.lt(this.points, { tick: l }, (h, p) => h.tick - p.tick);
          g > a && this.points.splice(a + 1, g - a);
        }
      }
      for (const l of u)
        l.tick = Math.max(0, l.tick + n), l.value = Math.max(0, Math.min(1, l.value + r));
      Math.abs(n) > 0 && this.points.sort((l, g) => l.tick - g.tick);
    }
  }
  clone() {
    const e = new te();
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
    const i = V.ge(e, n, (s, o) => s.tick - o.tick);
    for (; r && e[i] && e[i].tick === n.tick; )
      e.splice(i, 1);
    e.splice(i, 0, n);
  }
}
class xr {
  targets = [];
  targetValues = {};
  getAutomationTargets() {
    return this.targets;
  }
  getAutomationTargetValues() {
    return this.targetValues;
  }
  getOrCreateAutomationValueById(e) {
    return this.targetValues[e] || (this.targetValues[e] = new te()), this.targetValues[e];
  }
  getAutomationValueById(e) {
    return this.targetValues[e];
  }
  getAutomationValueByTarget(e) {
    const n = e.toTfAutomationTargetId();
    return this.getAutomationValueById(n);
  }
  addAutomation(e, n = 0) {
    M.isNumber(n) || (n = 0), this.targets.splice(n, 0, e);
    const r = e.toTfAutomationTargetId();
    this.getAutomationValueById(r) || (this.targetValues[r] = new te());
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
    for (const n of M.keys(this.targetValues)) {
      const r = tt.decodeAutomationTarget(n);
      r.getPluginInstanceId() === e && this.removeAutomation(r);
    }
  }
  removeAllPointsWithinRange(e, n) {
    for (const r of M.keys(this.targetValues))
      this.targetValues[r].removePointsInRange(e, n);
  }
  moveAllPointsWithinRange(e, n, r, i) {
    for (const s of M.keys(this.targetValues))
      this.targetValues[s].movePointsInRange(e, n, r, i, !1);
  }
  clone() {
    const e = new xr();
    for (const n of this.targets)
      e.addAutomation(n.clone());
    for (const n of M.keys(this.targetValues)) {
      const r = this.targetValues[n];
      e.targetValues[n] = r.clone();
    }
    return e;
  }
}
var Wt = /* @__PURE__ */ ((t) => (t[t.MIDI_TRACK = 1] = "MIDI_TRACK", t[t.AUDIO_TRACK = 2] = "AUDIO_TRACK", t[t.MASTER_TRACK = 3] = "MASTER_TRACK", t))(Wt || {});
class Qt {
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
    uuid: r = Qt.generateTrackIdInternal(),
    clips: i = [],
    instrument: s,
    suggestedInstruments: o = [],
    volume: a = bf(0),
    solo: u = !1,
    muted: l = !1,
    rank: g = 0,
    pan: h = 0
  }) {
    this.song = n, this.type = e, s ? this.insturment = s : e === 1 && (this.insturment = new ge({
      program: 0,
      isDrum: !1
    })), this.clips = [...i], this.suggestedInstruments = [...o], this.uuid = r, this.volume = a, this.solo = u, this.muted = l, this.rank = g, this.pan = h, this.automation = new xr();
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
    this.type === 1 && (this.insturment = new ge({ program: e, isDrum: n }));
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
    const r = new ge({ program: e, isDrum: n });
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
    return new un(n.name, n.manufacturerName, n.pluginFormatName, n.pluginVersion);
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
  addAudioPlugin(e) {
    this.audioPlugins.push(e);
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
    const r = [], i = V.lt(this.clips, { getClipStartTick: () => e }, (s, o) => s.getClipStartTick() - o.getClipStartTick());
    for (let s = Math.max(i, 0); s < this.clips.length; s += 1) {
      const o = this.clips[s];
      if (!(o.getClipEndTick() < e)) {
        if (o.getClipStartTick() > n)
          break;
        r.push(o);
      }
    }
    return r;
  }
  createMIDIClip({
    clipStartTick: e,
    clipEndTick: n = void 0,
    insertClip: r = !0
  }) {
    if (!M.isNumber(e))
      throw new Error("clipStartTick must be specified when creating a clip.");
    const i = n ?? e + 1;
    if (i < e)
      throw new Error(`clipEndTick must be greater or equal to clipStartTick, got clipStartTick: ${e}, clipEndTick: ${n}`);
    const s = new et({
      id: et.generateClipIdInternal(),
      type: le.MIDI_CLIP,
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
    if (!M.isNumber(e))
      throw new Error("clipStartTick must be specified when creating a clip.");
    const s = new et({
      id: et.generateClipIdInternal(),
      type: le.AUDIO_CLIP,
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
    if (e.getType() === le.MIDI_CLIP) {
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
      if (e.getType() === le.AUDIO_CLIP)
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
    const n = V.le(this.clips, e, (r, i) => r.getClipStartTick() - i.getClipStartTick());
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
    return this.automation.getAutomationTargets().length > 0 && !M.isEmpty(this.automation.getAutomationTargetValues());
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
    const n = V.ge(this.clips, e, (r, i) => r.getClipStartTick() - i.getClipStartTick());
    this.clips.splice(n, 0, e);
  }
}
class ge {
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
    return new ge({
      program: this.program,
      isDrum: this.isDrum
    });
  }
}
var po = {}, ln = {};
function kf(t) {
  var e = new H(t), n = e.readChunk();
  if (n.id != "MThd")
    throw "Bad MIDI file.  Expected 'MHdr', got: '" + n.id + "'";
  for (var r = Sf(n.data), i = [], s = 0; !e.eof() && s < r.numTracks; s++) {
    var o = e.readChunk();
    if (o.id != "MTrk")
      throw "Bad MIDI file.  Expected 'MTrk', got: '" + o.id + "'";
    var a = _f(o.data);
    i.push(a);
  }
  return {
    header: r,
    tracks: i
  };
}
function Sf(t) {
  var e = new H(t), n = e.readUInt16(), r = e.readUInt16(), i = {
    format: n,
    numTracks: r
  }, s = e.readUInt16();
  return s & 32768 ? (i.framesPerSecond = 256 - (s >> 8), i.ticksPerFrame = s & 255) : i.ticksPerBeat = s, i;
}
function _f(t) {
  for (var e = new H(t), n = []; !e.eof(); ) {
    var r = s();
    n.push(r);
  }
  return n;
  var i;
  function s() {
    var o = {};
    o.deltaTime = e.readVarInt();
    var a = e.readUInt8();
    if ((a & 240) === 240)
      if (a === 255) {
        o.meta = !0;
        var u = e.readUInt8(), l = e.readVarInt();
        switch (u) {
          case 0:
            if (o.type = "sequenceNumber", l !== 2)
              throw "Expected length for sequenceNumber event is 2, got " + l;
            return o.number = e.readUInt16(), o;
          case 1:
            return o.type = "text", o.text = e.readString(l), o;
          case 2:
            return o.type = "copyrightNotice", o.text = e.readString(l), o;
          case 3:
            return o.type = "trackName", o.text = e.readString(l), o;
          case 4:
            return o.type = "instrumentName", o.text = e.readString(l), o;
          case 5:
            return o.type = "lyrics", o.text = e.readString(l), o;
          case 6:
            return o.type = "marker", o.text = e.readString(l), o;
          case 7:
            return o.type = "cuePoint", o.text = e.readString(l), o;
          case 32:
            if (o.type = "channelPrefix", l != 1)
              throw "Expected length for channelPrefix event is 1, got " + l;
            return o.channel = e.readUInt8(), o;
          case 33:
            if (o.type = "portPrefix", l != 1)
              throw "Expected length for portPrefix event is 1, got " + l;
            return o.port = e.readUInt8(), o;
          case 47:
            if (o.type = "endOfTrack", l != 0)
              throw "Expected length for endOfTrack event is 0, got " + l;
            return o;
          case 81:
            if (o.type = "setTempo", l != 3)
              throw "Expected length for setTempo event is 3, got " + l;
            return o.microsecondsPerBeat = e.readUInt24(), o;
          case 84:
            if (o.type = "smpteOffset", l != 5)
              throw "Expected length for smpteOffset event is 5, got " + l;
            var g = e.readUInt8(), h = { 0: 24, 32: 25, 64: 29, 96: 30 };
            return o.frameRate = h[g & 96], o.hour = g & 31, o.min = e.readUInt8(), o.sec = e.readUInt8(), o.frame = e.readUInt8(), o.subFrame = e.readUInt8(), o;
          case 88:
            if (o.type = "timeSignature", l != 2 && l != 4)
              throw "Expected length for timeSignature event is 4 or 2, got " + l;
            return o.numerator = e.readUInt8(), o.denominator = 1 << e.readUInt8(), l === 4 ? (o.metronome = e.readUInt8(), o.thirtyseconds = e.readUInt8()) : (o.metronome = 36, o.thirtyseconds = 8), o;
          case 89:
            if (o.type = "keySignature", l != 2)
              throw "Expected length for keySignature event is 2, got " + l;
            return o.key = e.readInt8(), o.scale = e.readUInt8(), o;
          case 127:
            return o.type = "sequencerSpecific", o.data = e.readBytes(l), o;
          default:
            return o.type = "unknownMeta", o.data = e.readBytes(l), o.metatypeByte = u, o;
        }
      } else if (a == 240) {
        o.type = "sysEx";
        var l = e.readVarInt();
        return o.data = e.readBytes(l), o;
      } else if (a == 247) {
        o.type = "endSysEx";
        var l = e.readVarInt();
        return o.data = e.readBytes(l), o;
      } else
        throw "Unrecognised MIDI event type byte: " + a;
    else {
      var p;
      if ((a & 128) === 0) {
        if (i === null)
          throw "Running status byte encountered before status byte";
        p = a, a = i, o.running = !0;
      } else
        p = e.readUInt8(), i = a;
      var m = a >> 4;
      switch (o.channel = a & 15, m) {
        case 8:
          return o.type = "noteOff", o.noteNumber = p, o.velocity = e.readUInt8(), o;
        case 9:
          var I = e.readUInt8();
          return o.type = I === 0 ? "noteOff" : "noteOn", o.noteNumber = p, o.velocity = I, I === 0 && (o.byte9 = !0), o;
        case 10:
          return o.type = "noteAftertouch", o.noteNumber = p, o.amount = e.readUInt8(), o;
        case 11:
          return o.type = "controller", o.controllerType = p, o.value = e.readUInt8(), o;
        case 12:
          return o.type = "programChange", o.programNumber = p, o;
        case 13:
          return o.type = "channelAftertouch", o.amount = p, o;
        case 14:
          return o.type = "pitchBend", o.value = p + (e.readUInt8() << 7) - 8192, o;
        default:
          throw "Unrecognised MIDI event type: " + m;
      }
    }
  }
}
function H(t) {
  this.buffer = t, this.bufferLen = this.buffer.length, this.pos = 0;
}
H.prototype.eof = function() {
  return this.pos >= this.bufferLen;
};
H.prototype.readUInt8 = function() {
  var t = this.buffer[this.pos];
  return this.pos += 1, t;
};
H.prototype.readInt8 = function() {
  var t = this.readUInt8();
  return t & 128 ? t - 256 : t;
};
H.prototype.readUInt16 = function() {
  var t = this.readUInt8(), e = this.readUInt8();
  return (t << 8) + e;
};
H.prototype.readInt16 = function() {
  var t = this.readUInt16();
  return t & 32768 ? t - 65536 : t;
};
H.prototype.readUInt24 = function() {
  var t = this.readUInt8(), e = this.readUInt8(), n = this.readUInt8();
  return (t << 16) + (e << 8) + n;
};
H.prototype.readInt24 = function() {
  var t = this.readUInt24();
  return t & 8388608 ? t - 16777216 : t;
};
H.prototype.readUInt32 = function() {
  var t = this.readUInt8(), e = this.readUInt8(), n = this.readUInt8(), r = this.readUInt8();
  return (t << 24) + (e << 16) + (n << 8) + r;
};
H.prototype.readBytes = function(t) {
  var e = this.buffer.slice(this.pos, this.pos + t);
  return this.pos += t, e;
};
H.prototype.readString = function(t) {
  var e = this.readBytes(t);
  return String.fromCharCode.apply(null, e);
};
H.prototype.readVarInt = function() {
  for (var t = 0; !this.eof(); ) {
    var e = this.readUInt8();
    if (e & 128)
      t += e & 127, t <<= 7;
    else
      return t + e;
  }
  return t;
};
H.prototype.readChunk = function() {
  var t = this.readString(4), e = this.readUInt32(), n = this.readBytes(e);
  return {
    id: t,
    length: e,
    data: n
  };
};
var Cf = kf;
function xf(t, e) {
  if (typeof t != "object")
    throw "Invalid MIDI data";
  e = e || {};
  var n = t.header || {}, r = t.tracks || [], i, s = r.length, o = new O();
  for (Ef(o, n, s), i = 0; i < s; i++)
    Nf(o, r[i], e);
  return o.buffer;
}
function Ef(t, e, n) {
  var r = e.format == null ? 1 : e.format, i = 128;
  e.timeDivision ? i = e.timeDivision : e.ticksPerFrame && e.framesPerSecond ? i = -(e.framesPerSecond & 255) << 8 | e.ticksPerFrame & 255 : e.ticksPerBeat && (i = e.ticksPerBeat & 32767);
  var s = new O();
  s.writeUInt16(r), s.writeUInt16(n), s.writeUInt16(i), t.writeChunk("MThd", s.buffer);
}
function Nf(t, e, n) {
  var r = new O(), i, s = e.length, o = null;
  for (i = 0; i < s; i++)
    (n.running === !1 || !n.running && !e[i].running) && (o = null), o = Pf(r, e[i], o, n.useByte9ForNoteOff);
  t.writeChunk("MTrk", r.buffer);
}
function Pf(t, e, n, r) {
  var i = e.type, s = e.deltaTime, o = e.text || "", a = e.data || [], u = null;
  switch (t.writeVarInt(s), i) {
    case "sequenceNumber":
      t.writeUInt8(255), t.writeUInt8(0), t.writeVarInt(2), t.writeUInt16(e.number);
      break;
    case "text":
      t.writeUInt8(255), t.writeUInt8(1), t.writeVarInt(o.length), t.writeString(o);
      break;
    case "copyrightNotice":
      t.writeUInt8(255), t.writeUInt8(2), t.writeVarInt(o.length), t.writeString(o);
      break;
    case "trackName":
      t.writeUInt8(255), t.writeUInt8(3), t.writeVarInt(o.length), t.writeString(o);
      break;
    case "instrumentName":
      t.writeUInt8(255), t.writeUInt8(4), t.writeVarInt(o.length), t.writeString(o);
      break;
    case "lyrics":
      t.writeUInt8(255), t.writeUInt8(5), t.writeVarInt(o.length), t.writeString(o);
      break;
    case "marker":
      t.writeUInt8(255), t.writeUInt8(6), t.writeVarInt(o.length), t.writeString(o);
      break;
    case "cuePoint":
      t.writeUInt8(255), t.writeUInt8(7), t.writeVarInt(o.length), t.writeString(o);
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
      var l = { 24: 0, 25: 32, 29: 64, 30: 96 }, g = e.hour & 31 | l[e.frameRate];
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
      t.writeUInt8(255), t.writeUInt8(127), t.writeVarInt(a.length), t.writeBytes(a);
      break;
    case "unknownMeta":
      e.metatypeByte != null && (t.writeUInt8(255), t.writeUInt8(e.metatypeByte), t.writeVarInt(a.length), t.writeBytes(a));
      break;
    case "sysEx":
      t.writeUInt8(240), t.writeVarInt(a.length), t.writeBytes(a);
      break;
    case "endSysEx":
      t.writeUInt8(247), t.writeVarInt(a.length), t.writeBytes(a);
      break;
    case "noteOff":
      var p = r !== !1 && e.byte9 || r && e.velocity == 0 ? 144 : 128;
      u = p | e.channel, u !== n && t.writeUInt8(u), t.writeUInt8(e.noteNumber), t.writeUInt8(e.velocity);
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
      var m = 8192 + e.value, I = m & 127, T = m >> 7 & 127;
      t.writeUInt8(I), t.writeUInt8(T);
      break;
    default:
      throw "Unrecognized event type: " + i;
  }
  return u;
}
function O() {
  this.buffer = [];
}
O.prototype.writeUInt8 = function(t) {
  this.buffer.push(t & 255);
};
O.prototype.writeInt8 = O.prototype.writeUInt8;
O.prototype.writeUInt16 = function(t) {
  var e = t >> 8 & 255, n = t & 255;
  this.writeUInt8(e), this.writeUInt8(n);
};
O.prototype.writeInt16 = O.prototype.writeUInt16;
O.prototype.writeUInt24 = function(t) {
  var e = t >> 16 & 255, n = t >> 8 & 255, r = t & 255;
  this.writeUInt8(e), this.writeUInt8(n), this.writeUInt8(r);
};
O.prototype.writeInt24 = O.prototype.writeUInt24;
O.prototype.writeUInt32 = function(t) {
  var e = t >> 24 & 255, n = t >> 16 & 255, r = t >> 8 & 255, i = t & 255;
  this.writeUInt8(e), this.writeUInt8(n), this.writeUInt8(r), this.writeUInt8(i);
};
O.prototype.writeInt32 = O.prototype.writeUInt32;
O.prototype.writeBytes = function(t) {
  this.buffer = this.buffer.concat(Array.prototype.slice.call(t, 0));
};
O.prototype.writeString = function(t) {
  var e, n = t.length, r = [];
  for (e = 0; e < n; e++)
    r.push(t.codePointAt(e));
  this.writeBytes(r);
};
O.prototype.writeVarInt = function(t) {
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
O.prototype.writeChunk = function(t, e) {
  this.writeString(t), this.writeUInt32(e.length), this.writeBytes(e);
};
var Of = xf;
ln.parseMidi = Cf;
ln.writeMidi = Of;
var nn = {}, Ut = {};
Object.defineProperty(Ut, "__esModule", { value: !0 });
Ut.insert = Ut.search = void 0;
function go(t, e, n) {
  n === void 0 && (n = "ticks");
  var r = 0, i = t.length, s = i;
  if (i > 0 && t[i - 1][n] <= e)
    return i - 1;
  for (; r < s; ) {
    var o = Math.floor(r + (s - r) / 2), a = t[o], u = t[o + 1];
    if (a[n] === e) {
      for (var l = o; l < t.length; l++) {
        var g = t[l];
        g[n] === e && (o = l);
      }
      return o;
    } else {
      if (a[n] < e && u[n] > e)
        return o;
      a[n] > e ? s = o : a[n] < e && (r = o + 1);
    }
  }
  return -1;
}
Ut.search = go;
function Af(t, e, n) {
  if (n === void 0 && (n = "ticks"), t.length) {
    var r = go(t, e[n], n);
    t.splice(r + 1, 0, e);
  } else
    t.push(e);
}
Ut.insert = Af;
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.Header = t.keySignatureKeys = void 0;
  var e = Ut, n = /* @__PURE__ */ new WeakMap();
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
      var o = this;
      if (this.tempos = [], this.timeSignatures = [], this.keySignatures = [], this.meta = [], this.name = "", n.set(this, 480), s) {
        n.set(this, s.header.ticksPerBeat), s.tracks.forEach(function(u) {
          u.forEach(function(l) {
            l.meta && (l.type === "timeSignature" ? o.timeSignatures.push({
              ticks: l.absoluteTime,
              timeSignature: [
                l.numerator,
                l.denominator
              ]
            }) : l.type === "setTempo" ? o.tempos.push({
              bpm: 6e7 / l.microsecondsPerBeat,
              ticks: l.absoluteTime
            }) : l.type === "keySignature" && o.keySignatures.push({
              key: t.keySignatureKeys[l.key + 7],
              scale: l.scale === 0 ? "major" : "minor",
              ticks: l.absoluteTime
            }));
          });
        });
        var a = 0;
        s.tracks[0].forEach(function(u) {
          a += u.deltaTime, u.meta && (u.type === "trackName" ? o.name = u.text : (u.type === "text" || u.type === "cuePoint" || u.type === "marker" || u.type === "lyrics") && o.meta.push({
            text: u.text,
            ticks: a,
            type: u.type
          }));
        }), this.update();
      }
    }
    return i.prototype.update = function() {
      var s = this, o = 0, a = 0;
      this.tempos.sort(function(u, l) {
        return u.ticks - l.ticks;
      }), this.tempos.forEach(function(u, l) {
        var g = l > 0 ? s.tempos[l - 1].bpm : s.tempos[0].bpm, h = u.ticks / s.ppq - a, p = 60 / g * h;
        u.time = p + o, o = u.time, a += h;
      }), this.timeSignatures.sort(function(u, l) {
        return u.ticks - l.ticks;
      }), this.timeSignatures.forEach(function(u, l) {
        var g = l > 0 ? s.timeSignatures[l - 1] : s.timeSignatures[0], h = (u.ticks - g.ticks) / s.ppq, p = h / g.timeSignature[0] / (g.timeSignature[1] / 4);
        g.measures = g.measures || 0, u.measures = p + g.measures;
      });
    }, i.prototype.ticksToSeconds = function(s) {
      var o = (0, e.search)(this.tempos, s);
      if (o !== -1) {
        var a = this.tempos[o], u = a.time, l = (s - a.ticks) / this.ppq;
        return u + 60 / a.bpm * l;
      } else {
        var g = s / this.ppq;
        return 60 / 120 * g;
      }
    }, i.prototype.ticksToMeasures = function(s) {
      var o = (0, e.search)(this.timeSignatures, s);
      if (o !== -1) {
        var a = this.timeSignatures[o], u = (s - a.ticks) / this.ppq;
        return a.measures + u / (a.timeSignature[0] / a.timeSignature[1]) / 4;
      } else
        return s / this.ppq / 4;
    }, Object.defineProperty(i.prototype, "ppq", {
      get: function() {
        return n.get(this);
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.secondsToTicks = function(s) {
      var o = (0, e.search)(this.tempos, s, "time");
      if (o !== -1) {
        var a = this.tempos[o], u = a.time, l = s - u, g = l / (60 / a.bpm);
        return Math.round(a.ticks + g * this.ppq);
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
      this.name = s.name, this.tempos = s.tempos.map(function(o) {
        return Object.assign({}, o);
      }), this.timeSignatures = s.timeSignatures.map(function(o) {
        return Object.assign({}, o);
      }), this.keySignatures = s.keySignatures.map(function(o) {
        return Object.assign({}, o);
      }), this.meta = s.meta.map(function(o) {
        return Object.assign({}, o);
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
})(nn);
var Te = {}, Er = {};
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
    function i(s, o) {
      e.set(this, o), n.set(this, s.controllerType), this.ticks = s.absoluteTime, this.value = s.value;
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
        var o = e.get(this);
        this.ticks = o.secondsToTicks(s);
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
})(Er);
var fn = {};
Object.defineProperty(fn, "__esModule", { value: !0 });
fn.createControlChanges = void 0;
var $e = Er;
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
fn.createControlChanges = Mf;
var hn = {};
Object.defineProperty(hn, "__esModule", { value: !0 });
hn.PitchBend = void 0;
var An = /* @__PURE__ */ new WeakMap(), Vf = function() {
  function t(e, n) {
    An.set(this, n), this.ticks = e.absoluteTime, this.value = e.value;
  }
  return Object.defineProperty(t.prototype, "time", {
    get: function() {
      var e = An.get(this);
      return e.ticksToSeconds(this.ticks);
    },
    set: function(e) {
      var n = An.get(this);
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
hn.PitchBend = Vf;
var pn = {}, vt = {};
Object.defineProperty(vt, "__esModule", { value: !0 });
vt.DrumKitByPatchID = vt.InstrumentFamilyByID = vt.instrumentByPatchID = void 0;
vt.instrumentByPatchID = [
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
vt.InstrumentFamilyByID = [
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
vt.DrumKitByPatchID = {
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
Object.defineProperty(pn, "__esModule", { value: !0 });
pn.Instrument = void 0;
var De = vt, Ui = /* @__PURE__ */ new WeakMap(), Rf = function() {
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
      var e = Ui.get(this);
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
pn.Instrument = Rf;
var dn = {};
Object.defineProperty(dn, "__esModule", { value: !0 });
dn.Note = void 0;
function Ff(t) {
  var e = Math.floor(t / 12) - 1;
  return mo(t) + e.toString();
}
function mo(t) {
  var e = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"], n = t % 12;
  return e[n];
}
function Uf(t) {
  var e = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  return e.indexOf(t);
}
var Bf = function() {
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
    var r = t.exec(n), i = r[1], s = r[2], o = e[i.toLowerCase()];
    return o + (parseInt(s, 10) + 1) * 12;
  };
}(), Gt = /* @__PURE__ */ new WeakMap(), $f = function() {
  function t(e, n, r) {
    Gt.set(this, r), this.midi = e.midi, this.velocity = e.velocity, this.noteOffVelocity = n.velocity, this.ticks = e.ticks, this.durationTicks = n.ticks - e.ticks;
  }
  return Object.defineProperty(t.prototype, "name", {
    get: function() {
      return Ff(this.midi);
    },
    set: function(e) {
      this.midi = Bf(e);
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
      return mo(this.midi);
    },
    set: function(e) {
      this.midi = 12 * (this.octave + 1) + Uf(e);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "duration", {
    get: function() {
      var e = Gt.get(this);
      return e.ticksToSeconds(this.ticks + this.durationTicks) - e.ticksToSeconds(this.ticks);
    },
    set: function(e) {
      var n = Gt.get(this), r = n.secondsToTicks(this.time + e);
      this.durationTicks = r - this.ticks;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "time", {
    get: function() {
      var e = Gt.get(this);
      return e.ticksToSeconds(this.ticks);
    },
    set: function(e) {
      var n = Gt.get(this);
      this.ticks = n.secondsToTicks(e);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "bars", {
    get: function() {
      var e = Gt.get(this);
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
dn.Note = $f;
Object.defineProperty(Te, "__esModule", { value: !0 });
Te.Track = void 0;
var Mn = Ut, Df = Er, Lf = fn, Hf = hn, Bi = pn, qf = dn, Le = /* @__PURE__ */ new WeakMap(), Kf = function() {
  function t(e, n) {
    var r = this;
    if (this.name = "", this.notes = [], this.controlChanges = (0, Lf.createControlChanges)(), this.pitchBends = [], Le.set(this, n), e) {
      var i = e.find(function(p) {
        return p.type === "trackName";
      });
      this.name = i ? i.text : "";
    }
    if (this.instrument = new Bi.Instrument(e, this), this.channel = 0, e) {
      for (var s = e.filter(function(p) {
        return p.type === "noteOn";
      }), o = e.filter(function(p) {
        return p.type === "noteOff";
      }), a = function() {
        var p = s.shift();
        u.channel = p.channel;
        var m = o.findIndex(function(T) {
          return T.noteNumber === p.noteNumber && T.absoluteTime >= p.absoluteTime;
        });
        if (m !== -1) {
          var I = o.splice(m, 1)[0];
          u.addNote({
            durationTicks: I.absoluteTime - p.absoluteTime,
            midi: p.noteNumber,
            noteOffVelocity: I.velocity / 127,
            ticks: p.absoluteTime,
            velocity: p.velocity / 127
          });
        }
      }, u = this; s.length; )
        a();
      var l = e.filter(function(p) {
        return p.type === "controller";
      });
      l.forEach(function(p) {
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
    var n = Le.get(this), r = new qf.Note({
      midi: 0,
      ticks: 0,
      velocity: 1
    }, {
      ticks: 0,
      velocity: 0
    }, n);
    return Object.assign(r, e), (0, Mn.insert)(this.notes, r, "ticks"), this;
  }, t.prototype.addCC = function(e) {
    var n = Le.get(this), r = new Df.ControlChange({
      controllerType: e.number
    }, n);
    return delete e.number, Object.assign(r, e), Array.isArray(this.controlChanges[r.number]) || (this.controlChanges[r.number] = []), (0, Mn.insert)(this.controlChanges[r.number], r, "ticks"), this;
  }, t.prototype.addPitchBend = function(e) {
    var n = Le.get(this), r = new Hf.PitchBend({}, n);
    return Object.assign(r, e), (0, Mn.insert)(this.pitchBends, r, "ticks"), this;
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
    this.name = e.name, this.channel = e.channel, this.instrument = new Bi.Instrument(void 0, this), this.instrument.fromJSON(e.instrument), e.endOfTrackTicks !== void 0 && (this.endOfTrackTicks = e.endOfTrackTicks);
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
Te.Track = Kf;
var gn = {};
function zf(t) {
  var e = [];
  return Io(t, e), e;
}
function Io(t, e) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    Array.isArray(r) ? Io(r, e) : e.push(r);
  }
}
const Gf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  flatten: zf
}, Symbol.toStringTag, { value: "Module" })), Jf = /* @__PURE__ */ Tu(Gf);
var gt = at && at.__spreadArray || function(t, e, n) {
  if (n || arguments.length === 2)
    for (var r = 0, i = e.length, s; r < i; r++)
      (s || !(r in e)) && (s || (s = Array.prototype.slice.call(e, 0, r)), s[r] = e[r]);
  return t.concat(s || Array.prototype.slice.call(e));
};
Object.defineProperty(gn, "__esModule", { value: !0 });
gn.encode = void 0;
var Wf = ln, jf = nn, Yf = Jf;
function Qf(t, e) {
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
function Xf(t) {
  return (0, Yf.flatten)(t.notes.map(function(e) {
    return Qf(e, t.channel);
  }));
}
function Zf(t, e) {
  return {
    absoluteTime: t.ticks,
    channel: e,
    controllerType: t.number,
    deltaTime: 0,
    type: "controller",
    value: Math.floor(t.value * 127)
  };
}
function th(t) {
  for (var e = [], n = 0; n < 127; n++)
    t.controlChanges.hasOwnProperty(n) && t.controlChanges[n].forEach(function(r) {
      e.push(Zf(r, t.channel));
    });
  return e;
}
function eh(t, e) {
  return {
    absoluteTime: t.ticks,
    channel: e,
    deltaTime: 0,
    type: "pitchBend",
    value: t.value
  };
}
function nh(t) {
  var e = [];
  return t.pitchBends.forEach(function(n) {
    e.push(eh(n, t.channel));
  }), e;
}
function rh(t) {
  return {
    absoluteTime: 0,
    channel: t.channel,
    deltaTime: 0,
    programNumber: t.instrument.number,
    type: "programChange"
  };
}
function ih(t) {
  return {
    absoluteTime: 0,
    deltaTime: 0,
    meta: !0,
    text: t,
    type: "trackName"
  };
}
function sh(t) {
  return {
    absoluteTime: t.ticks,
    deltaTime: 0,
    meta: !0,
    microsecondsPerBeat: Math.floor(6e7 / t.bpm),
    type: "setTempo"
  };
}
function oh(t) {
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
function ah(t) {
  var e = jf.keySignatureKeys.indexOf(t.key);
  return {
    absoluteTime: t.ticks,
    deltaTime: 0,
    key: e + 7,
    meta: !0,
    scale: t.scale === "major" ? 0 : 1,
    type: "keySignature"
  };
}
function ch(t) {
  return {
    absoluteTime: t.ticks,
    deltaTime: 0,
    meta: !0,
    text: t.text,
    type: t.type
  };
}
function uh(t) {
  var e = {
    header: {
      format: 1,
      numTracks: t.tracks.length + 1,
      ticksPerBeat: t.header.ppq
    },
    tracks: gt([
      gt(gt(gt(gt([
        {
          absoluteTime: 0,
          deltaTime: 0,
          meta: !0,
          text: t.header.name,
          type: "trackName"
        }
      ], t.header.keySignatures.map(function(n) {
        return ah(n);
      }), !0), t.header.meta.map(function(n) {
        return ch(n);
      }), !0), t.header.tempos.map(function(n) {
        return sh(n);
      }), !0), t.header.timeSignatures.map(function(n) {
        return oh(n);
      }), !0)
    ], t.tracks.map(function(n) {
      return gt(gt(gt([
        ih(n.name),
        rh(n)
      ], Xf(n), !0), th(n), !0), nh(n), !0);
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
  }), new Uint8Array((0, Wf.writeMidi)(e));
}
gn.encode = uh;
(function(t) {
  var e = at && at.__awaiter || function(h, p, m, I) {
    function T(y) {
      return y instanceof m ? y : new m(function(k) {
        k(y);
      });
    }
    return new (m || (m = Promise))(function(y, k) {
      function w(P) {
        try {
          b(I.next(P));
        } catch (ot) {
          k(ot);
        }
      }
      function j(P) {
        try {
          b(I.throw(P));
        } catch (ot) {
          k(ot);
        }
      }
      function b(P) {
        P.done ? y(P.value) : T(P.value).then(w, j);
      }
      b((I = I.apply(h, p || [])).next());
    });
  }, n = at && at.__generator || function(h, p) {
    var m = { label: 0, sent: function() {
      if (y[0] & 1)
        throw y[1];
      return y[1];
    }, trys: [], ops: [] }, I, T, y, k;
    return k = { next: w(0), throw: w(1), return: w(2) }, typeof Symbol == "function" && (k[Symbol.iterator] = function() {
      return this;
    }), k;
    function w(b) {
      return function(P) {
        return j([b, P]);
      };
    }
    function j(b) {
      if (I)
        throw new TypeError("Generator is already executing.");
      for (; m; )
        try {
          if (I = 1, T && (y = b[0] & 2 ? T.return : b[0] ? T.throw || ((y = T.return) && y.call(T), 0) : T.next) && !(y = y.call(T, b[1])).done)
            return y;
          switch (T = 0, y && (b = [b[0] & 2, y.value]), b[0]) {
            case 0:
            case 1:
              y = b;
              break;
            case 4:
              return m.label++, { value: b[1], done: !1 };
            case 5:
              m.label++, T = b[1], b = [0];
              continue;
            case 7:
              b = m.ops.pop(), m.trys.pop();
              continue;
            default:
              if (y = m.trys, !(y = y.length > 0 && y[y.length - 1]) && (b[0] === 6 || b[0] === 2)) {
                m = 0;
                continue;
              }
              if (b[0] === 3 && (!y || b[1] > y[0] && b[1] < y[3])) {
                m.label = b[1];
                break;
              }
              if (b[0] === 6 && m.label < y[1]) {
                m.label = y[1], y = b;
                break;
              }
              if (y && m.label < y[2]) {
                m.label = y[2], m.ops.push(b);
                break;
              }
              y[2] && m.ops.pop(), m.trys.pop();
              continue;
          }
          b = p.call(h, m);
        } catch (P) {
          b = [6, P], T = 0;
        } finally {
          I = y = 0;
        }
      if (b[0] & 5)
        throw b[1];
      return { value: b[0] ? b[1] : void 0, done: !0 };
    }
  };
  Object.defineProperty(t, "__esModule", { value: !0 }), t.Header = t.Track = t.Midi = void 0;
  var r = ln, i = nn, s = Te, o = gn, a = function() {
    function h(p) {
      var m = this, I = null;
      if (p) {
        var T = p instanceof ArrayBuffer ? new Uint8Array(p) : p;
        I = (0, r.parseMidi)(T), I.tracks.forEach(function(y) {
          var k = 0;
          y.forEach(function(w) {
            k += w.deltaTime, w.absoluteTime = k;
          });
        }), I.tracks = g(I.tracks);
      }
      this.header = new i.Header(I), this.tracks = [], p && (this.tracks = I.tracks.map(function(y) {
        return new s.Track(y, m.header);
      }), I.header.format === 1 && this.tracks[0].duration === 0 && this.tracks.shift());
    }
    return h.fromUrl = function(p) {
      return e(this, void 0, void 0, function() {
        var m, I;
        return n(this, function(T) {
          switch (T.label) {
            case 0:
              return [4, fetch(p)];
            case 1:
              return m = T.sent(), m.ok ? [4, m.arrayBuffer()] : [3, 3];
            case 2:
              return I = T.sent(), [2, new h(I)];
            case 3:
              throw new Error("Could not load '".concat(p, "'"));
          }
        });
      });
    }, Object.defineProperty(h.prototype, "name", {
      get: function() {
        return this.header.name;
      },
      set: function(p) {
        this.header.name = p;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(h.prototype, "duration", {
      get: function() {
        var p = this.tracks.map(function(m) {
          return m.duration;
        });
        return Math.max.apply(Math, p);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(h.prototype, "durationTicks", {
      get: function() {
        var p = this.tracks.map(function(m) {
          return m.durationTicks;
        });
        return Math.max.apply(Math, p);
      },
      enumerable: !1,
      configurable: !0
    }), h.prototype.addTrack = function() {
      var p = new s.Track(void 0, this.header);
      return this.tracks.push(p), p;
    }, h.prototype.toArray = function() {
      return (0, o.encode)(this);
    }, h.prototype.toJSON = function() {
      return {
        header: this.header.toJSON(),
        tracks: this.tracks.map(function(p) {
          return p.toJSON();
        })
      };
    }, h.prototype.fromJSON = function(p) {
      var m = this;
      this.header = new i.Header(), this.header.fromJSON(p.header), this.tracks = p.tracks.map(function(I) {
        var T = new s.Track(void 0, m.header);
        return T.fromJSON(I), T;
      });
    }, h.prototype.clone = function() {
      var p = new h();
      return p.fromJSON(this.toJSON()), p;
    }, h;
  }();
  t.Midi = a;
  var u = Te;
  Object.defineProperty(t, "Track", { enumerable: !0, get: function() {
    return u.Track;
  } });
  var l = nn;
  Object.defineProperty(t, "Header", { enumerable: !0, get: function() {
    return l.Header;
  } });
  function g(h) {
    for (var p = [], m = 0; m < h.length; m++)
      for (var I = p.length, T = /* @__PURE__ */ new Map(), y = Array(16).fill(0), k = 0, w = h[m]; k < w.length; k++) {
        var j = w[k], b = I, P = j.channel;
        if (P !== void 0) {
          j.type === "programChange" && (y[P] = j.programNumber);
          var ot = y[P], Lt = "".concat(ot, " ").concat(P);
          T.has(Lt) ? b = T.get(Lt) : (b = I + T.size, T.set(Lt, b));
        }
        p[b] || p.push([]), p[b].push(j);
      }
    return p;
  }
})(po);
class fe {
  static DEFAULT_PPQ = 480;
  masterTrack;
  tracks;
  PPQ;
  tempos;
  timeSignatures;
  pluginContext;
  nextTrackRank = 1;
  constructor() {
    this.tracks = [], this.PPQ = 0, this.tempos = [], this.timeSignatures = [];
  }
  getMasterTrack() {
    return this.masterTrack || (this.masterTrack = new Qt({
      type: Wt.MASTER_TRACK,
      song: this,
      uuid: Qt.generateTrackIdInternal()
    })), this.masterTrack;
  }
  getTracks() {
    return this.tracks;
  }
  getTrackById(e) {
    return Je(this.tracks, (n) => n.getId() === e);
  }
  getTracksByIds(e) {
    if (!this.tracks)
      return [];
    const n = new Set(e);
    return this.tracks.filter((r) => n.has(r.getId()));
  }
  getTrackIndex(e) {
    return ee(this.tracks, (n) => n.getId() === e);
  }
  createTrack({
    type: e,
    index: n,
    rank: r,
    assignDefaultSamplerPlugin: i = !1
  }) {
    this.checkAccess("createTrack"), r == null || r === null ? r = this.getNextTrackRank() : this.nextTrackRank = Math.max(r + 1, this.nextTrackRank);
    const s = new Qt({
      type: e,
      song: this,
      uuid: this.getNextTrackId(),
      rank: r == null || r === null ? this.getNextTrackRank() : r
    });
    return i && e === Wt.MIDI_TRACK && s.setSamplerPlugin(s.createAudioPlugin(un.DEFAULT_SYNTH_TFID)), n != null ? this.tracks.splice(n, 0, s) : this.tracks.push(s), s;
  }
  cloneTrack(e) {
    let n = this.getTrackIndex(e.getId());
    n < 0 && (n = void 0);
    const r = this.createTrack({
      type: e.getType(),
      index: n
    });
    if (r.setVolume(e.getVolume()), r.setPan(e.getPan()), r.setSolo(e.getSolo()), r.setMuted(e.getMuted()), e.getType() === Wt.MIDI_TRACK) {
      const i = e.getInstrument();
      i && r.setInstrument({
        program: i.getProgram(),
        isDrum: i.getIsDrum()
      });
      for (const o of e.getSuggestedInstruments())
        r.createSuggestedInstrument({
          program: o.getProgram(),
          isDrum: o.getIsDrum()
        });
      const s = e.getSamplerPlugin();
      s && r.setSamplerPlugin(s.clone(r));
    } else
      e.getType(), Wt.AUDIO_TRACK;
    for (const i of e.getAudioPlugins())
      r.addAudioPlugin(i.clone(r));
    for (const i of e.getClips()) {
      const s = r.cloneClip(i);
      r.insertClip(s);
    }
    return e.hasAnyAutomation() && r.setAutomation(e.getAutomation()), r;
  }
  removeTrack(e) {
    this.checkAccess("removeTrack");
    const n = this.getTrackById(e);
    return n ? (this.tracks.splice(ee(this.tracks, (r) => r.getId() === e), 1), n) : null;
  }
  getResolution() {
    return this.PPQ;
  }
  getBeatsPerBar() {
    return this.getTimeSignatures()[0].getNumerator();
  }
  getTicksPerBar() {
    return this.getBeatsPerBar() * this.getResolution();
  }
  setResolution(e) {
    this.PPQ = e;
  }
  getTempoChanges() {
    return this.tempos;
  }
  createTempoChange({
    ticks: e,
    bpm: n
  }) {
    if (this.PPQ <= 0)
      throw new Error("Song resolution must be provided before creating tempo changes.");
    if (this.tempos.length === 0 && e !== 0)
      throw new Error("The first tempo event must be at tick 0");
    const r = new Oe({ ticks: e, bpm: n, time: this.tickToSeconds(e) }), i = V.ge(this.tempos, r, (s, o) => s.getTicks() - o.getTicks());
    return i < 0 ? this.tempos.push(r) : this.tempos.splice(i, 0, r), this.retimingTempoEvents(), r;
  }
  overwriteTempoChanges(e) {
    if (e.length === 0)
      throw new Error("Cannot clear all the tempo events.");
    const n = yi(e);
    n.sort((i, s) => i.getTicks() - s.getTicks());
    const r = n[0];
    if (r.getTicks() > 0)
      throw new Error("The first tempo event needs to start from tick 0");
    this.tempos = [
      new Oe({
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
  }
  overwriteTimeSignatures(e) {
    this.timeSignatures = yi(e);
  }
  updateTempo(e, n) {
    e.setBpmInternal(n), this.retimingTempoEvents();
  }
  getTimeSignatures() {
    return this.timeSignatures;
  }
  createTimeSignature({
    ticks: e,
    numerator: n,
    denominator: r
  }) {
    const i = new Ti({ ticks: e, numerator: n, denominator: r }), s = V.ge(this.timeSignatures, i, (o, a) => o.getTicks() - a.getTicks());
    return s < 0 ? this.timeSignatures.push(i) : this.timeSignatures.splice(s, 0, i), i;
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
  getTicksPerBeat() {
    return this.getResolution() * (4 / this.getTimeSignatures()[0].getDenominator());
  }
  tickToSeconds(e) {
    return fe.tickToSecondsImpl(e, this.getTempoChanges(), this.getResolution());
  }
  static tickToSecondsImpl(e, n, r) {
    if (e === 0)
      return 0;
    let i = V.lt(n, { getTicks: () => e }, (u, l) => u.getTicks() - l.getTicks());
    i == -1 && (i = 0);
    const s = n[i], o = e - s.getTicks(), a = fe.tempoBPMToTicksPerSecond(s.getBpm(), r);
    return s.getTime() + o / a;
  }
  secondsToTick(e) {
    if (e === 0)
      return 0;
    let n = V.lt(this.getTempoChanges(), { getTime: () => e }, (o, a) => o.getTime() - a.getTime());
    n == -1 && (n = 0);
    const r = this.getTempoChanges()[n], i = e - r.getTime(), s = fe.tempoBPMToTicksPerSecond(r.getBpm(), this.getResolution());
    return Math.round(r.getTicks() + i * s);
  }
  static importMIDI(e, n, r = 0, i = !1) {
    const s = new po.Midi(n), o = r, a = fe.DEFAULT_PPQ / s.header.ppq;
    if (i) {
      const u = [];
      for (const g of s.header.timeSignatures)
        u.push(new Ti({
          ticks: o + _t(g.ticks, a),
          numerator: g.timeSignature[0],
          denominator: g.timeSignature[1]
        }));
      e.overwriteTimeSignatures(u);
      const l = [];
      o > 0 && l.push(new Oe({
        ticks: 0,
        time: 0,
        bpm: 120
      }));
      for (const g of s.header.tempos)
        l.push(new Oe({
          ticks: o + _t(g.ticks, a),
          time: g.time,
          bpm: g.bpm
        }));
      e.overwriteTempoChanges(l);
    }
    for (const u of s.tracks) {
      const l = e.createTrack({
        type: Wt.MIDI_TRACK,
        assignDefaultSamplerPlugin: !0
      });
      l.setInstrument({
        program: u.instrument.number,
        isDrum: u.instrument.percussion
      });
      const g = l.createMIDIClip({ clipStartTick: o });
      let h = Number.MAX_SAFE_INTEGER;
      for (const I of u.notes)
        g.createNote({
          pitch: I.midi,
          velocity: Math.round(I.velocity * 127),
          startTick: o + _t(I.ticks, a),
          endTick: o + _t(I.ticks + I.durationTicks, a)
        }), h = Math.min(h, o + _t(I.ticks, a));
      const p = u.controlChanges[7];
      if (p)
        if (p.length === 1)
          l.setVolume(p[0].value);
        else {
          const I = new tt(Yn.VOLUME);
          l.getAutomation().addAutomation(I);
          const T = l.getAutomation().getAutomationValueByTarget(I);
          for (const y of p)
            T.addPoint(o + _t(y.ticks, a), y.value);
        }
      const m = u.controlChanges[10];
      if (m)
        if (m.length === 1) {
          const I = Math.round(m[0].value * 127 - 64);
          l.setPan(I);
        } else {
          const I = new tt(Yn.PAN);
          l.getAutomation().addAutomation(I);
          const T = l.getAutomation().getAutomationValueByTarget(I);
          for (const y of m)
            T.addPoint(o + _t(y.ticks, a), y.value);
        }
      h !== Number.MAX_SAFE_INTEGER && g.adjustClipLeft(h);
    }
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
      n.push(Qt.generateTrackIdInternal());
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
      throw new Error("Song needs to be accessed in a plugin context in order to use privileged methods.");
    if (!this.pluginContext.plugin.songAccess()[e])
      throw new Error(`Plugin ${this.pluginContext.plugin.constructor.id()} requires access ${e} in order to run.`);
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
function _t(t, e) {
  return Math.round(t * e);
}
var B = /* @__PURE__ */ ((t) => (t[t.Slider = 1] = "Slider", t[t.Input = 2] = "Input", t[t.TrackSelector = 3] = "TrackSelector", t[t.Pitch = 4] = "Pitch", t[t.TrackPitchSelector = 5] = "TrackPitchSelector", t[t.InstrumentSelector = 6] = "InstrumentSelector", t[t.Select = 7] = "Select", t[t.Switch = 8] = "Switch", t[t.InputNumber = 9] = "InputNumber", t[t.MultiTrackSelector = 10] = "MultiTrackSelector", t[t.None = 11] = "None", t[t.FileSelector = 12] = "FileSelector", t[t.MultiSourceAudioSelector = 13] = "MultiSourceAudioSelector", t[t.AudioRecorder = 14] = "AudioRecorder", t[t.SelectList = 15] = "SelectList", t))(B || {});
async function Sh(t) {
  return t.arrayBuffer();
}
var lh = /* @__PURE__ */ ((t) => (t[t.SelectedTrackIds = 1] = "SelectedTrackIds", t[t.SelectedClipInfos = 2] = "SelectedClipInfos", t[t.TickAtPlayhead = 3] = "TickAtPlayhead", t[t.EditingClipInfo = 4] = "EditingClipInfo", t[t.EditingNoteIds = 5] = "EditingNoteIds", t[t.TickAtPlayheadSnappedToBeat = 6] = "TickAtPlayheadSnappedToBeat", t))(lh || {});
export {
  un as AudioPlugin,
  xr as AutomationData,
  tt as AutomationTarget,
  Yn as AutomationTargetType,
  te as AutomationValue,
  et as Clip,
  le as ClipType,
  wf as DrumPitch,
  lh as InjectSource,
  It as Note,
  fe as Song,
  Oe as TempoEvent,
  mh as TickToSecondStepper,
  Ti as TimeSignatureEvent,
  Qt as Track,
  Wt as TrackType,
  fh as TuneflowPipeline,
  Rs as TuneflowPlugin,
  B as WidgetType,
  yf as areTuneflowIdsEqual,
  Tf as areTuneflowIdsEqualIgnoreVersion,
  bf as dbToVolumeValue,
  en as decodeAudioPluginTuneflowId,
  Ih as gainToDb,
  Th as gainToVolumeValue,
  Fi as getAudioPluginTuneflowId,
  vf as getAudioPluginVersionlessTuneflowId,
  Sh as getFileContentFromFileSelector,
  kh as maybeToRaw,
  ph as midiNumberToPitch,
  wh as pitchToHz,
  dh as pitchToMidiNumber,
  bh as remapRange,
  gh as toVersionlessTfId,
  vh as volumeValueToDb,
  yh as volumeValueToGain
};
