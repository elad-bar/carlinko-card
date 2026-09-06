/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt = globalThis, Pt = dt.ShadowRoot && (dt.ShadyCSS === void 0 || dt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Tt = Symbol(), zt = /* @__PURE__ */ new WeakMap();
let pe = class {
  constructor(t, s, i) {
    if (this._$cssResult$ = !0, i !== Tt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (Pt && t === void 0) {
      const i = s !== void 0 && s.length === 1;
      i && (t = zt.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && zt.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Pe = (e) => new pe(typeof e == "string" ? e : e + "", void 0, Tt), C = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((i, n, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[o + 1], e[0]);
  return new pe(s, e, Tt);
}, Te = (e, t) => {
  if (Pt) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const i = document.createElement("style"), n = dt.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = s.cssText, e.appendChild(i);
  }
}, It = Pt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const i of t.cssRules) s += i.cssText;
  return Pe(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Me, defineProperty: Le, getOwnPropertyDescriptor: Re, getOwnPropertyNames: Ne, getOwnPropertySymbols: Ue, getPrototypeOf: Be } = Object, L = globalThis, qt = L.trustedTypes, He = qt ? qt.emptyScript : "", bt = L.reactiveElementPolyfillSupport, Y = (e, t) => e, pt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? He : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let s = e;
  switch (t) {
    case Boolean:
      s = e !== null;
      break;
    case Number:
      s = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(e);
      } catch {
        s = null;
      }
  }
  return s;
} }, Mt = (e, t) => !Me(e, t), Wt = { attribute: !0, type: String, converter: pt, reflect: !1, useDefault: !1, hasChanged: Mt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), L.litPropertyMetadata ?? (L.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let W = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = Wt) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(t, i, s);
      n !== void 0 && Le(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, s, i) {
    const { get: n, set: o } = Re(this.prototype, t) ?? { get() {
      return this[s];
    }, set(r) {
      this[s] = r;
    } };
    return { get: n, set(r) {
      const h = n == null ? void 0 : n.call(this);
      o == null || o.call(this, r), this.requestUpdate(t, h, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Wt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Y("elementProperties"))) return;
    const t = Be(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Y("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Y("properties"))) {
      const s = this.properties, i = [...Ne(s), ...Ue(s)];
      for (const n of i) this.createProperty(n, s[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const s = litPropertyMetadata.get(t);
      if (s !== void 0) for (const [i, n] of s) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, i] of this.elementProperties) {
      const n = this._$Eu(s, i);
      n !== void 0 && this._$Eh.set(n, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const s = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const n of i) s.unshift(It(n));
    } else t !== void 0 && s.push(It(t));
    return s;
  }
  static _$Eu(t, s) {
    const i = s.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((s) => this.enableUpdating = s), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((s) => s(this));
  }
  addController(t) {
    var s;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((s = t.hostConnected) == null || s.call(t));
  }
  removeController(t) {
    var s;
    (s = this._$EO) == null || s.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), s = this.constructor.elementProperties;
    for (const i of s.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Te(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((s) => {
      var i;
      return (i = s.hostConnected) == null ? void 0 : i.call(s);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((s) => {
      var i;
      return (i = s.hostDisconnected) == null ? void 0 : i.call(s);
    });
  }
  attributeChangedCallback(t, s, i) {
    this._$AK(t, i);
  }
  _$ET(t, s) {
    var o;
    const i = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, i);
    if (n !== void 0 && i.reflect === !0) {
      const r = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : pt).toAttribute(s, i.type);
      this._$Em = t, r == null ? this.removeAttribute(n) : this.setAttribute(n, r), this._$Em = null;
    }
  }
  _$AK(t, s) {
    var o, r;
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const h = i.getPropertyOptions(n), a = typeof h.converter == "function" ? { fromAttribute: h.converter } : ((o = h.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? h.converter : pt;
      this._$Em = n;
      const d = a.fromAttribute(s, h.type);
      this[n] = d ?? ((r = this._$Ej) == null ? void 0 : r.get(n)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, s, i, n = !1, o) {
    var r;
    if (t !== void 0) {
      const h = this.constructor;
      if (n === !1 && (o = this[t]), i ?? (i = h.getPropertyOptions(t)), !((i.hasChanged ?? Mt)(o, s) || i.useDefault && i.reflect && o === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(h._$Eu(t, i)))) return;
      this.C(t, s, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: i, reflect: n, wrapped: o }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? s ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (s = void 0), this._$AL.set(t, s)), n === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (s) {
      Promise.reject(s);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, r] of this._$Ep) this[o] = r;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, r] of n) {
        const { wrapped: h } = r, a = this[o];
        h !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, r, a);
      }
    }
    let t = !1;
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s), t ? (this.willUpdate(s), (i = this._$EO) == null || i.forEach((n) => {
        var o;
        return (o = n.hostUpdate) == null ? void 0 : o.call(n);
      }), this.update(s)) : this._$EM();
    } catch (n) {
      throw t = !1, this._$EM(), n;
    }
    t && this._$AE(s);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var s;
    (s = this._$EO) == null || s.forEach((i) => {
      var n;
      return (n = i.hostUpdated) == null ? void 0 : n.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((s) => this._$ET(s, this[s]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
W.elementStyles = [], W.shadowRootOptions = { mode: "open" }, W[Y("elementProperties")] = /* @__PURE__ */ new Map(), W[Y("finalized")] = /* @__PURE__ */ new Map(), bt == null || bt({ ReactiveElement: W }), (L.reactiveElementVersions ?? (L.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Q = globalThis, Vt = (e) => e, ft = Q.trustedTypes, Kt = ft ? ft.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, fe = "$lit$", M = `lit$${Math.random().toFixed(9).slice(2)}$`, ge = "?" + M, De = `<${ge}>`, j = document, X = () => j.createComment(""), tt = (e) => e === null || typeof e != "object" && typeof e != "function", Lt = Array.isArray, je = (e) => Lt(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", yt = `[ 	
\f\r]`, G = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ft = /-->/g, Zt = />/g, N = RegExp(`>|${yt}(?:([^\\s"'>=/]+)(${yt}*=${yt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Jt = /'/g, Gt = /"/g, me = /^(?:script|style|textarea|title)$/i, ze = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), l = ze(1), z = Symbol.for("lit-noChange"), c = Symbol.for("lit-nothing"), Yt = /* @__PURE__ */ new WeakMap(), H = j.createTreeWalker(j, 129);
function _e(e, t) {
  if (!Lt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Kt !== void 0 ? Kt.createHTML(t) : t;
}
const Ie = (e, t) => {
  const s = e.length - 1, i = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = G;
  for (let h = 0; h < s; h++) {
    const a = e[h];
    let d, p, u = -1, g = 0;
    for (; g < a.length && (r.lastIndex = g, p = r.exec(a), p !== null); ) g = r.lastIndex, r === G ? p[1] === "!--" ? r = Ft : p[1] !== void 0 ? r = Zt : p[2] !== void 0 ? (me.test(p[2]) && (n = RegExp("</" + p[2], "g")), r = N) : p[3] !== void 0 && (r = N) : r === N ? p[0] === ">" ? (r = n ?? G, u = -1) : p[1] === void 0 ? u = -2 : (u = r.lastIndex - p[2].length, d = p[1], r = p[3] === void 0 ? N : p[3] === '"' ? Gt : Jt) : r === Gt || r === Jt ? r = N : r === Ft || r === Zt ? r = G : (r = N, n = void 0);
    const m = r === N && e[h + 1].startsWith("/>") ? " " : "";
    o += r === G ? a + De : u >= 0 ? (i.push(d), a.slice(0, u) + fe + a.slice(u) + M + m) : a + M + (u === -2 ? h : m);
  }
  return [_e(e, o + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class et {
  constructor({ strings: t, _$litType$: s }, i) {
    let n;
    this.parts = [];
    let o = 0, r = 0;
    const h = t.length - 1, a = this.parts, [d, p] = Ie(t, s);
    if (this.el = et.createElement(d, i), H.currentNode = this.el.content, s === 2 || s === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (n = H.nextNode()) !== null && a.length < h; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const u of n.getAttributeNames()) if (u.endsWith(fe)) {
          const g = p[r++], m = n.getAttribute(u).split(M), v = /([.?@])?(.*)/.exec(g);
          a.push({ type: 1, index: o, name: v[2], strings: m, ctor: v[1] === "." ? We : v[1] === "?" ? Ve : v[1] === "@" ? Ke : mt }), n.removeAttribute(u);
        } else u.startsWith(M) && (a.push({ type: 6, index: o }), n.removeAttribute(u));
        if (me.test(n.tagName)) {
          const u = n.textContent.split(M), g = u.length - 1;
          if (g > 0) {
            n.textContent = ft ? ft.emptyScript : "";
            for (let m = 0; m < g; m++) n.append(u[m], X()), H.nextNode(), a.push({ type: 2, index: ++o });
            n.append(u[g], X());
          }
        }
      } else if (n.nodeType === 8) if (n.data === ge) a.push({ type: 2, index: o });
      else {
        let u = -1;
        for (; (u = n.data.indexOf(M, u + 1)) !== -1; ) a.push({ type: 7, index: o }), u += M.length - 1;
      }
      o++;
    }
  }
  static createElement(t, s) {
    const i = j.createElement("template");
    return i.innerHTML = t, i;
  }
}
function V(e, t, s = e, i) {
  var r, h;
  if (t === z) return t;
  let n = i !== void 0 ? (r = s._$Co) == null ? void 0 : r[i] : s._$Cl;
  const o = tt(t) ? void 0 : t._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== o && ((h = n == null ? void 0 : n._$AO) == null || h.call(n, !1), o === void 0 ? n = void 0 : (n = new o(e), n._$AT(e, s, i)), i !== void 0 ? (s._$Co ?? (s._$Co = []))[i] = n : s._$Cl = n), n !== void 0 && (t = V(e, n._$AS(e, t.values), n, i)), t;
}
class qe {
  constructor(t, s) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: s }, parts: i } = this._$AD, n = ((t == null ? void 0 : t.creationScope) ?? j).importNode(s, !0);
    H.currentNode = n;
    let o = H.nextNode(), r = 0, h = 0, a = i[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let d;
        a.type === 2 ? d = new ot(o, o.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (d = new Fe(o, this, t)), this._$AV.push(d), a = i[++h];
      }
      r !== (a == null ? void 0 : a.index) && (o = H.nextNode(), r++);
    }
    return H.currentNode = j, n;
  }
  p(t) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, s), s += i.strings.length - 2) : i._$AI(t[s])), s++;
  }
}
class ot {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, s, i, n) {
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = i, this.options = n, this._$Cv = (n == null ? void 0 : n.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const s = this._$AM;
    return s !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = s.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, s = this) {
    t = V(this, t, s), tt(t) ? t === c || t == null || t === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : t !== this._$AH && t !== z && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : je(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== c && tt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(j.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: s, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = et.createElement(_e(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === n) this._$AH.p(s);
    else {
      const r = new qe(n, this), h = r.u(this.options);
      r.p(s), this.T(h), this._$AH = r;
    }
  }
  _$AC(t) {
    let s = Yt.get(t.strings);
    return s === void 0 && Yt.set(t.strings, s = new et(t)), s;
  }
  k(t) {
    Lt(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, n = 0;
    for (const o of t) n === s.length ? s.push(i = new ot(this.O(X()), this.O(X()), this, this.options)) : i = s[n], i._$AI(o), n++;
    n < s.length && (this._$AR(i && i._$AB.nextSibling, n), s.length = n);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, s); t !== this._$AB; ) {
      const n = Vt(t).nextSibling;
      Vt(t).remove(), t = n;
    }
  }
  setConnected(t) {
    var s;
    this._$AM === void 0 && (this._$Cv = t, (s = this._$AP) == null || s.call(this, t));
  }
}
class mt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, i, n, o) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = t, this.name = s, this._$AM = n, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = c;
  }
  _$AI(t, s = this, i, n) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = V(this, t, s, 0), r = !tt(t) || t !== this._$AH && t !== z, r && (this._$AH = t);
    else {
      const h = t;
      let a, d;
      for (t = o[0], a = 0; a < o.length - 1; a++) d = V(this, h[i + a], s, a), d === z && (d = this._$AH[a]), r || (r = !tt(d) || d !== this._$AH[a]), d === c ? t = c : t !== c && (t += (d ?? "") + o[a + 1]), this._$AH[a] = d;
    }
    r && !n && this.j(t);
  }
  j(t) {
    t === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class We extends mt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === c ? void 0 : t;
  }
}
class Ve extends mt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== c);
  }
}
class Ke extends mt {
  constructor(t, s, i, n, o) {
    super(t, s, i, n, o), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = V(this, t, s, 0) ?? c) === z) return;
    const i = this._$AH, n = t === c && i !== c || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== c && (i === c || n);
    n && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Fe {
  constructor(t, s, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    V(this, t);
  }
}
const wt = Q.litHtmlPolyfillSupport;
wt == null || wt(et, ot), (Q.litHtmlVersions ?? (Q.litHtmlVersions = [])).push("3.3.3");
const Ze = (e, t, s) => {
  const i = (s == null ? void 0 : s.renderBefore) ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const o = (s == null ? void 0 : s.renderBefore) ?? null;
    i._$litPart$ = n = new ot(t.insertBefore(X(), o), o, void 0, s ?? {});
  }
  return n._$AI(e), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis;
let O = class extends W {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var s;
    const t = super.createRenderRoot();
    return (s = this.renderOptions).renderBefore ?? (s.renderBefore = t.firstChild), t;
  }
  update(t) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ze(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return z;
  }
};
var ue;
O._$litElement$ = !0, O.finalized = !0, (ue = D.litElementHydrateSupport) == null || ue.call(D, { LitElement: O });
const kt = D.litElementPolyfillSupport;
kt == null || kt({ LitElement: O });
(D.litElementVersions ?? (D.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Je = { attribute: !0, type: String, converter: pt, reflect: !1, hasChanged: Mt }, Ge = (e = Je, t, s) => {
  const { kind: i, metadata: n } = s;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(s.name, e), i === "accessor") {
    const { name: r } = s;
    return { set(h) {
      const a = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(r, a, e, !0, h);
    }, init(h) {
      return h !== void 0 && this.C(r, void 0, e, h), h;
    } };
  }
  if (i === "setter") {
    const { name: r } = s;
    return function(h) {
      const a = this[r];
      t.call(this, h), this.requestUpdate(r, a, e, !0, h);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function q(e) {
  return (t, s) => typeof s == "object" ? Ge(e, t, s) : ((i, n, o) => {
    const r = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, i), r ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function P(e) {
  return q({ ...e, state: !0, attribute: !1 });
}
const Ye = {
  chrome: {
    not_configured: "Not configured",
    select_device: "Select a CarLinko vehicle device",
    waiting_hass: "Waiting for Home Assistant…"
  },
  editor: {
    device: "Vehicle device",
    title: "Title",
    image_override: "Image override (optional)",
    top_image_override: "Top image override (optional)"
  },
  status: {
    offline: "Offline",
    tyres_ok: "Tyres OK",
    not_charging: "Not charging",
    plugged: "Plugged",
    soc: "SoC",
    power: "Power",
    time: "Time",
    mode: "Mode",
    hv_prefix: "HV",
    heat: "Heat",
    vent: "Vent"
  },
  climate: {
    on: "Climate on",
    off: "Climate off",
    increase_temp: "Increase temperature",
    decrease_temp: "Decrease temperature",
    setpoint: "Setpoint",
    current: "Current"
  },
  action: {
    engine_on: "Turn engine on",
    engine_off: "Turn engine off",
    unlock_doors: "Unlock doors",
    lock_doors: "Lock doors",
    defog_on: "Turn defog on",
    defog_off: "Turn defog off",
    open_trunk: "Open trunk",
    close_trunk: "Close trunk",
    open_windows: "Open windows",
    close_windows: "Close windows",
    vent_windows: "Vent windows",
    open_sunroof: "Open sunroof",
    close_sunroof: "Close sunroof",
    tilt_sunroof: "Tilt sunroof"
  },
  stub: {
    overview: "CarLinko",
    charging: "Charging",
    cabin: "Cabin"
  }
}, Qe = {
  sensor: {
    battery: "Battery",
    range: "Range",
    odometer: "Odometer",
    speed: "Speed",
    charge_power: "Charge Power",
    consumption: "Consumption",
    charge_remaining: "Charge remaining",
    charge_mode: "Charge mode",
    charge_state: "Charge state",
    hv_state: "HV state",
    tyre_status: "Tyre status",
    fuel: "Fuel",
    fuel_range: "Fuel range",
    total_range: "Total range",
    fuel_consumption: "Fuel consumption"
  },
  binary_sensor: {
    charging: "Charging",
    online: "Online",
    tyres_ok: "Tyre problem"
  },
  button: {
    charge_stop: "Stop charging",
    windows_vent: "Windows vent",
    sunroof_tilt: "Sunroof tilt",
    quick_cool: "Quick cool",
    quick_heat: "Quick heat",
    find: "Find car"
  },
  switch: {
    engine: "Engine",
    defrost_cmd: "Defog"
  },
  lock: {
    lock: "Lock"
  },
  climate: {
    climate: "Climate"
  },
  cover: {
    windows: "Windows",
    sunroof: "Sunroof",
    liftgate: "Liftgate"
  }
}, T = {
  off: "Off",
  l1: "Low",
  l2: "Medium",
  l3: "High"
}, Xe = {
  sensor: {
    hv_state: {
      off: "Off",
      lv: "LV",
      ready: "Ready",
      unknown: "Unknown"
    },
    tyre_status: {
      normal: "Normal",
      check_tyres: "Check tyres"
    },
    charge_state: {
      idle: "Idle",
      charging: "Charging",
      complete: "Complete",
      canceled: "Canceled",
      hot: "Hot",
      stop: "Stop"
    },
    charge_mode: {
      none: "None",
      ac: "AC",
      dc: "DC"
    }
  },
  select: {
    seat_heat_l: T,
    seat_heat_r: T,
    seat_heat_lr: T,
    seat_heat_rr: T,
    seat_vent_l: T,
    seat_vent_r: T,
    seat_vent_lr: T,
    seat_vent_rr: T
  }
}, Rt = "carlinko";
let Qt = !1, ht;
function ts(e) {
  const [t, s] = e.split(".", 2), i = Ye[t];
  return (i == null ? void 0 : i[s]) ?? e;
}
function ve(e, t) {
  var i;
  const s = (i = e == null ? void 0 : e.localize) == null ? void 0 : i.call(e, t);
  if (!(typeof s != "string" || !s.trim()) && !(s === t || s.startsWith("component.carlinko.")))
    return s;
}
function f(e, t) {
  return ts(t);
}
function k(e, t, s) {
  var o;
  const i = `component.${Rt}.entity.${t}.${s}.name`, n = ve(e, i);
  return n || (((o = Qe[t]) == null ? void 0 : o[s]) ?? s);
}
function B(e, t, s, i) {
  var h, a;
  if (!i)
    return "—";
  const n = i.toLowerCase(), o = `component.${Rt}.entity.${t}.${s}.state.${n}`, r = ve(e, o);
  return r || (((a = (h = Xe[t]) == null ? void 0 : h[s]) == null ? void 0 : a[n]) ?? i);
}
function es(e, t) {
  const s = f(e, "status.hv_prefix"), i = B(
    e,
    "sensor",
    "hv_state",
    t || "unknown"
  );
  return `${s} ${i}`;
}
async function Nt(e) {
  return !(e != null && e.loadBackendTranslation) || Qt ? !1 : (ht || (ht = e.loadBackendTranslation("entity", Rt).then(() => (Qt = !0, !0)).catch((t) => (console.warn("carlinko-card: failed to load entity translations", t), ht = void 0, !1))), ht);
}
const Xt = "carlinko";
function ss(e, t) {
  if (e.translation_key === t)
    return !0;
  const s = e.unique_id;
  if (s && (s === t || s.endsWith(`_${t}`) || s.startsWith("carlinko_") && s.endsWith(`_${t}`)))
    return !0;
  const i = e.entity_id.split(".", 2)[1] ?? "";
  return i === t || i.endsWith(`_${t}`);
}
function is(e, t) {
  return t === "defrost" || t.endsWith("_left") || t.endsWith("_right") ? [e, "switch", "binary_sensor"] : [e];
}
function ns(e, t) {
  return !!(t && e.states[t]);
}
function os(e) {
  return !!(e.disabled_by || e.hidden_by || e.hidden);
}
function rs(e, t, s, i) {
  const n = e.entities;
  if (!n)
    return;
  const o = [];
  for (const a of Object.values(n)) {
    if (!(a != null && a.entity_id) || a.device_id !== t || os(a))
      continue;
    const d = a.entity_id.split(".", 1)[0];
    i.includes(d) && ss(a, s) && o.push(a);
  }
  if (o.length === 0)
    return;
  const r = [...o].sort((a, d) => {
    const p = a.platform === Xt ? 0 : 1, u = d.platform === Xt ? 0 : 1;
    return p - u;
  });
  return (r.find((a) => ns(e, a.entity_id)) ?? r[0]).entity_id;
}
function as(e, t, s) {
  var r, h;
  if (!e)
    return;
  const i = (r = t.entities) == null ? void 0 : r[s.slot];
  if (i)
    return i;
  if (s.slot === "image" && t.image_entity)
    return t.image_entity;
  const n = (h = t.device_id) == null ? void 0 : h.trim();
  if (!n)
    return;
  const o = [s.key, ...s.fallbackKeys ?? []];
  for (const a of o) {
    const d = is(s.domain, a), p = rs(e, n, a, d);
    if (p)
      return p;
  }
}
function cs(e, t, s) {
  const i = {};
  for (const n of s)
    i[n.slot] = as(e, t, n);
  return i;
}
function Ut(e, t, s) {
  if (e === t)
    return !1;
  if (!e || !t)
    return !0;
  for (const i of s)
    if (i && e.states[i] !== t.states[i])
      return !0;
  return !1;
}
class Bt {
  invalidate() {
    this._map = void 0, this._deviceId = void 0, this._imageEntity = void 0, this._entitiesJson = void 0, this._entitiesRef = void 0;
  }
  /** Last resolved map, if any (for shouldUpdate without re-resolve). */
  peek() {
    return this._map;
  }
  get(t, s, i) {
    const n = s.device_id ?? "", o = s.image_entity ?? "", r = JSON.stringify(s.entities ?? null), h = t == null ? void 0 : t.entities;
    return this._map && this._deviceId === n && this._imageEntity === o && this._entitiesJson === r && this._entitiesRef === h ? this._map : (this._map = cs(t, s, i), this._deviceId = n, this._imageEntity = o, this._entitiesJson = r, this._entitiesRef = h, this._map);
  }
}
const ls = [
  { slot: "image", key: "vehicle_front", domain: "image" },
  { slot: "battery", key: "battery", domain: "sensor" },
  { slot: "range", key: "range", domain: "sensor" },
  { slot: "fuel", key: "fuel", domain: "sensor" },
  { slot: "fuel_range", key: "fuel_range", domain: "sensor" },
  { slot: "total_range", key: "total_range", domain: "sensor" },
  { slot: "hv_state", key: "hv_state", domain: "sensor" },
  { slot: "odometer", key: "odometer", domain: "sensor" },
  { slot: "consumption", key: "consumption", domain: "sensor" },
  { slot: "fuel_consumption", key: "fuel_consumption", domain: "sensor" },
  { slot: "speed", key: "speed", domain: "sensor" },
  { slot: "online", key: "online", domain: "binary_sensor" },
  { slot: "tyres_ok", key: "tyres_ok", domain: "binary_sensor" },
  { slot: "tyre_status", key: "tyre_status", domain: "sensor" },
  { slot: "engine", key: "engine", domain: "switch" }
], hs = [
  { slot: "battery", key: "battery", domain: "sensor" },
  { slot: "charging", key: "charging", domain: "binary_sensor" },
  { slot: "charge_state", key: "charge_state", domain: "sensor" },
  { slot: "charge_mode", key: "charge_mode", domain: "sensor" },
  { slot: "charge_remaining", key: "charge_remaining", domain: "sensor" },
  { slot: "charge_power", key: "charge_power", domain: "sensor" },
  { slot: "charge_stop", key: "charge_stop", domain: "button" }
], ds = [
  { slot: "image", key: "vehicle_top", domain: "image" },
  { slot: "climate", key: "climate", domain: "climate" },
  { slot: "quick_cool", key: "quick_cool", domain: "button" },
  { slot: "quick_heat", key: "quick_heat", domain: "button" },
  {
    slot: "seat_heat_l",
    key: "seat_heat_l",
    domain: "select",
    fallbackKeys: ["seat_heat_left"]
  },
  {
    slot: "seat_vent_l",
    key: "seat_vent_l",
    domain: "select",
    fallbackKeys: ["seat_vent_left"]
  },
  {
    slot: "seat_heat_r",
    key: "seat_heat_r",
    domain: "select",
    fallbackKeys: ["seat_heat_right"]
  },
  {
    slot: "seat_vent_r",
    key: "seat_vent_r",
    domain: "select",
    fallbackKeys: ["seat_vent_right"]
  },
  { slot: "seat_heat_lr", key: "seat_heat_lr", domain: "select" },
  { slot: "seat_vent_lr", key: "seat_vent_lr", domain: "select" },
  { slot: "seat_heat_rr", key: "seat_heat_rr", domain: "select" },
  { slot: "seat_vent_rr", key: "seat_vent_rr", domain: "select" },
  { slot: "tyres_ok", key: "tyres_ok", domain: "binary_sensor" },
  { slot: "tyre_status", key: "tyre_status", domain: "sensor" },
  { slot: "tyre_fl", key: "tyre_fl", domain: "sensor" },
  { slot: "tyre_fl_temp", key: "tyre_fl_temp", domain: "sensor" },
  { slot: "tyre_fr", key: "tyre_fr", domain: "sensor" },
  { slot: "tyre_fr_temp", key: "tyre_fr_temp", domain: "sensor" },
  { slot: "tyre_rl", key: "tyre_rl", domain: "sensor" },
  { slot: "tyre_rl_temp", key: "tyre_rl_temp", domain: "sensor" },
  { slot: "tyre_rr", key: "tyre_rr", domain: "sensor" },
  { slot: "tyre_rr_temp", key: "tyre_rr_temp", domain: "sensor" },
  { slot: "windows", key: "windows", domain: "cover" },
  { slot: "windows_vent", key: "windows_vent", domain: "button" },
  { slot: "sunroof", key: "sunroof", domain: "cover" },
  { slot: "sunroof_tilt", key: "sunroof_tilt", domain: "button" },
  { slot: "lock", key: "lock", domain: "lock" },
  { slot: "engine", key: "engine", domain: "switch" },
  { slot: "find", key: "find", domain: "button" },
  {
    slot: "defog",
    key: "defrost_cmd",
    domain: "switch",
    fallbackKeys: ["defrost"]
  },
  { slot: "charge_mode", key: "charge_mode", domain: "sensor" },
  { slot: "charge_stop", key: "charge_stop", domain: "button" },
  { slot: "trunk", key: "liftgate", domain: "cover" }
];
function Z(e, t) {
  if (!(!e || !t))
    return e.states[t];
}
function x(e, t) {
  var s;
  return (s = Z(e, t)) == null ? void 0 : s.state;
}
function gt(e, t) {
  const s = x(e, t);
  if (s === void 0 || s === "unknown" || s === "unavailable")
    return;
  const i = Number(s);
  return Number.isFinite(i) ? i : void 0;
}
function st(e, t) {
  const s = x(e, t);
  return s === "on" || s === "open" || s === "unlocked";
}
function be(e, t) {
  const s = x(e, t);
  return s === "ac" || s === "dc";
}
function us(e, t) {
  const s = Z(e, t);
  if (!s)
    return !1;
  const i = s.state === "on";
  return s.attributes.device_class === "problem" ? i : !i;
}
function ye(e, t, s) {
  return us(e, t) ? "danger" : x(e, s) === "check_tyres" ? "warn" : "ok";
}
function S(e, t, s = "—") {
  const i = Z(e, t);
  if (!i || i.state === "unknown" || i.state === "unavailable")
    return s;
  const n = i.attributes.unit_of_measurement;
  return n ? `${i.state} ${n}` : String(i.state);
}
function ps(e, t, s = "—") {
  const i = gt(e, t);
  if (i === void 0 || i < 0)
    return s;
  const n = Math.round(i), o = Math.floor(n / 60), r = n % 60;
  return o <= 0 ? `${r}m` : r <= 0 ? `${o}h` : `${o}h ${r}m`;
}
function $t(e, t) {
  if (/^https?:\/\//i.test(t))
    return t;
  try {
    const s = e == null ? void 0 : e.hassUrl;
    if (typeof s == "function")
      return s(t);
    if (typeof s == "string" && s) {
      const i = s.replace(/\/$/, "");
      return t.startsWith("/") ? `${i}${t}` : `${i}/${t}`;
    }
  } catch (s) {
    console.warn("carlinko-card: withHassBase failed", s);
  }
  return t;
}
function we(e, t) {
  const s = Z(e, t);
  if (!s)
    return;
  const i = s.attributes.entity_picture;
  if (typeof i == "string" && i)
    return $t(e, i);
  const n = s.attributes.access_token;
  return typeof n == "string" && n ? $t(
    e,
    `/api/image_proxy/${t}?token=${encodeURIComponent(n)}`
  ) : $t(e, `/api/image_proxy/${t}`);
}
async function A(e, t, s, i, n = {}) {
  await e.callService(t, s, { ...n, entity_id: i });
}
async function fs(e, t) {
  await A(e, "lock", "lock", t);
}
async function gs(e, t) {
  await A(e, "lock", "unlock", t);
}
async function te(e, t) {
  const s = t.split(".", 1)[0];
  await A(e, s, "turn_on", t);
}
async function xt(e, t) {
  const s = t.split(".", 1)[0];
  await A(e, s, "turn_off", t);
}
async function ms(e, t) {
  const s = t.split(".", 1)[0];
  await A(e, s, "toggle", t);
}
async function Ct(e, t) {
  await A(e, "cover", "open_cover", t);
}
async function St(e, t) {
  await A(e, "cover", "close_cover", t);
}
function ee(e, t) {
  const s = x(e, t);
  return s === "open" || s === "opening";
}
async function U(e, t) {
  await A(e, "button", "press", t);
}
function rt(e, t, s) {
  const i = Z(e, t);
  if (!i)
    return;
  const n = i.attributes[s];
  if (n == null)
    return;
  const o = Number(n);
  return Number.isFinite(o) ? o : void 0;
}
function se(e, t) {
  return rt(e, t, "temperature");
}
function _s(e, t) {
  return rt(e, t, "current_temperature");
}
function vs(e, t) {
  return rt(e, t, "target_temp_step") ?? 1;
}
function bs(e, t) {
  return rt(e, t, "min_temp") ?? 16;
}
function ys(e, t) {
  return rt(e, t, "max_temp") ?? 30;
}
function ie(e, t) {
  const s = x(e, t);
  return s === "cool" || s === "heat" || s === "heat_cool" || s === "auto" || s === "fan_only" || s === "dry" || s === "on";
}
async function ws(e, t, s) {
  await A(e, "climate", "set_hvac_mode", t, {
    hvac_mode: s
  });
}
async function ks(e, t, s) {
  await A(e, "climate", "set_temperature", t, {
    temperature: s
  });
}
async function ne(e, t, s) {
  await A(e, "select", "select_option", t, {
    option: s
  });
}
function oe(e, t) {
  const s = Z(e, t), i = s == null ? void 0 : s.attributes.options;
  return Array.isArray(i) ? i.map(String) : [];
}
function w(e, t) {
  e.dispatchEvent(
    new CustomEvent("hass-more-info", {
      bubbles: !0,
      composed: !0,
      detail: { entityId: t }
    })
  );
}
const Ht = C`
  :host {
    display: block;
    container-type: inline-size;
    container-name: ck-card;
    --ck-accent: var(--primary-color, #0d9488);
    --ck-ok: var(--success-color, #16a34a);
    --ck-warn: var(--warning-color, #d97706);
    --ck-info: var(--info-color, #2563eb);
    --ck-danger: var(--error-color, #b91c1c);
    --ck-bg: var(--card-background-color, #fff);
    --ck-text: var(--primary-text-color, #1a1a1a);
    --ck-muted: var(--secondary-text-color, #667);
    --ck-border: var(--divider-color, #e2e8f0);
    --ck-track: var(--divider-color, #e2e8f0);
    --ck-surface-muted: color-mix(
      in srgb,
      var(--ck-accent) 8%,
      var(--ck-bg)
    );
    --ck-seat-heat: #d64545;
    --ck-seat-vent: #3b82c4;
    --ck-tyre-ok: var(--ck-ok);
    --ck-tyre-warn: var(--ck-warn);
    --ck-tyre-danger: var(--ck-danger);
    --ck-on-accent: #fff;
  }
  ha-card {
    background: var(--ck-bg);
    color: var(--ck-text);
    overflow: hidden;
  }
  .header {
    font-size: 1.1rem;
    font-weight: 600;
    padding: 12px 16px 0;
  }
  .pad {
    padding: 16px;
  }
  .body-pad {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 8px;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 12px 16px 16px;
    border-top: 1px solid var(--ck-border);
  }
`, ke = C`
  .metric {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    border: none;
    background: transparent;
    color: inherit;
    padding: 4px 0;
    cursor: pointer;
    font: inherit;
    text-align: left;
    width: 100%;
  }
  .metric-label {
    color: var(--ck-muted);
    font-size: 0.85rem;
  }
  .metric-value {
    font-weight: 600;
  }
`, $e = C`
  .action {
    border: 1px solid var(--ck-border);
    background: var(--ck-bg);
    color: var(--ck-text);
    border-radius: 8px;
    padding: 8px 12px;
    font: inherit;
    font-size: 0.85rem;
    cursor: pointer;
  }
  .action.icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    min-width: 2.5rem;
    padding: 0;
  }
  .action.icon ha-icon {
    --mdc-icon-size: 1.25rem;
    width: 1.25rem;
    height: 1.25rem;
    display: block;
  }
  .action:hover:not(:disabled) {
    background: color-mix(in srgb, currentColor 14%, var(--ck-bg));
    border-color: currentColor;
  }
  .action:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .action.ok {
    border-color: var(--ck-ok);
    color: var(--ck-ok);
  }
  .action.danger {
    border-color: var(--ck-danger);
    color: var(--ck-danger);
  }
  .action.cool {
    border-color: var(--ck-seat-vent);
    color: var(--ck-seat-vent);
  }
  .action.heat {
    border-color: var(--ck-seat-heat);
    color: var(--ck-seat-heat);
  }
`, $s = C`
  .hotspot {
    width: 44px;
    height: 44px;
    min-width: 44px;
    min-height: 44px;
    border-radius: 50%;
    border: 2px solid var(--ck-border);
    background: color-mix(in srgb, var(--ck-bg) 88%, transparent);
    color: var(--ck-muted);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    cursor: pointer;
    box-shadow: 0 0 0 0 transparent;
    backdrop-filter: blur(2px);
  }
  .hotspot ha-icon {
    --mdc-icon-size: 22px;
    width: 22px;
    height: 22px;
    display: block;
  }
  .hotspot:hover:not(:disabled) {
    border-color: currentColor;
    background: color-mix(in srgb, currentColor 14%, var(--ck-bg));
  }
  .hotspot:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .hotspot.tone-muted {
    color: var(--ck-muted);
    border-color: var(--ck-border);
  }
  .hotspot.tone-ok {
    color: var(--ck-ok);
    border-color: var(--ck-ok);
    box-shadow: 0 0 12px color-mix(in srgb, var(--ck-ok) 45%, transparent);
  }
  .hotspot.tone-danger {
    color: var(--ck-danger);
    border-color: var(--ck-danger);
    box-shadow: 0 0 12px color-mix(in srgb, var(--ck-danger) 45%, transparent);
  }
  .hotspot.tone-warn {
    color: var(--ck-warn);
    border-color: var(--ck-warn);
    box-shadow: 0 0 12px color-mix(in srgb, var(--ck-warn) 45%, transparent);
  }
  .hotspot.tone-info {
    color: var(--ck-info);
    border-color: var(--ck-info);
    box-shadow: 0 0 12px color-mix(in srgb, var(--ck-info) 45%, transparent);
  }
  @container ck-card (max-width: 360px) {
    .hotspot {
      width: 36px;
      height: 36px;
      min-width: 36px;
      min-height: 36px;
    }
    .hotspot ha-icon {
      --mdc-icon-size: 18px;
      width: 18px;
      height: 18px;
    }
  }
`, xs = C`
  .hlevel {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    flex: 1 1 140px;
  }
  .hlevel-primary {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--ck-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    line-height: 1.2;
  }
  .hlevel-percent {
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 100%;
    border: none;
    background: transparent;
    color: inherit;
    padding: 0;
    margin: 0;
    cursor: pointer;
    font: inherit;
    text-align: left;
  }
  .hlevel-pct {
    font-size: 1.35rem;
    font-weight: 700;
    line-height: 1.15;
  }
  .hlevel.tone-ok .hlevel-pct {
    color: var(--ck-ok);
  }
  .hlevel.tone-info .hlevel-pct {
    color: var(--ck-info);
  }
  .hlevel-bar-wrap {
    height: 8px;
    margin: 4px 0 2px;
    border-radius: 999px;
    background: var(--ck-track);
    overflow: hidden;
  }
  .hlevel-bar {
    height: 100%;
    border-radius: 999px;
    background: var(--ck-ok);
    transition: width 0.2s ease;
  }
  .hlevel.tone-info .hlevel-bar {
    background: var(--ck-info);
  }
  .hlevel-details {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 4px 12px;
  }
  .hlevel-secondary,
  .hlevel-meta {
    border: none;
    background: transparent;
    padding: 0;
    margin: 0;
    font: inherit;
    text-align: left;
  }
  button.hlevel-secondary,
  button.hlevel-meta {
    cursor: pointer;
  }
  .hlevel-secondary {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--ck-text);
  }
  .hlevel-meta {
    font-size: 0.75rem;
    color: var(--ck-muted);
  }
`, Cs = C`
  .soc-ring {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 112px;
    height: 112px;
    flex-shrink: 0;
    padding: 0;
    border: none;
    background: transparent;
    color: inherit;
    font: inherit;
  }
  button.soc-ring {
    cursor: pointer;
  }
  button.soc-ring:hover .soc-ring-meter {
    filter: brightness(0.95);
  }
  .soc-ring-meter {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: conic-gradient(
      from -90deg,
      var(--ck-ok) 0% var(--ck-soc-pct, 0%),
      var(--ck-track) var(--ck-soc-pct, 0%) 100%
    );
    /* Donut hole — keep green arc visible as a thick ring */
    -webkit-mask: radial-gradient(
      farthest-side,
      transparent calc(100% - 12px),
      #000 calc(100% - 12px)
    );
    mask: radial-gradient(
      farthest-side,
      transparent calc(100% - 12px),
      #000 calc(100% - 12px)
    );
  }
  .soc-ring-meter.empty {
    background: conic-gradient(from -90deg, var(--ck-track) 0% 100%);
  }
  .soc-ring-center {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0;
    pointer-events: none;
  }
  .soc-ring-pct {
    font-size: 1.45rem;
    font-weight: 700;
    line-height: 1.1;
    color: var(--ck-ok);
  }
  .soc-ring-pct.muted {
    color: var(--ck-muted);
  }
  .soc-ring-label {
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--ck-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  @container ck-card (max-width: 360px) {
    .soc-ring {
      width: 96px;
      height: 96px;
    }
    .soc-ring-pct {
      font-size: 1.25rem;
    }
  }
`, Ss = C`
  .charge-power {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2.5px solid currentColor;
    color: var(--ck-muted);
    transition:
      color 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease;
  }
  .charge-power.is-charging {
    color: var(--ck-ok);
    box-shadow: 0 0 12px color-mix(in srgb, var(--ck-ok) 40%, transparent);
  }
  .charge-power-bolt {
    display: inline-flex;
    width: 22px;
    height: 22px;
  }
  .charge-power-bolt ha-icon {
    --mdc-icon-size: 22px;
    width: 22px;
    height: 22px;
    display: block;
  }
`, As = C`
  .charge-hero {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px 16px;
  }
  .charge-hero-link {
    width: 16px;
    height: 2px;
    background: var(--ck-track);
    flex-shrink: 0;
  }
  .charge-hero-meta {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
    flex: 1 1 120px;
  }
  .charge-meta-row {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 4px 6px;
    border: none;
    background: transparent;
    color: inherit;
    padding: 0;
    font: inherit;
    text-align: left;
    cursor: pointer;
  }
  .charge-meta-row:disabled {
    cursor: default;
  }
  .charge-meta-label {
    color: var(--ck-muted);
    font-size: 0.85rem;
  }
  .charge-meta-value {
    font-weight: 600;
    font-size: 0.95rem;
  }
  .charge-meta-value.ok {
    color: var(--ck-ok);
  }
  .charge-meta-value.muted {
    color: var(--ck-muted);
    font-weight: 500;
  }
  .charge-secondary {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 12px;
    padding-top: 10px;
    border-top: 1px solid var(--ck-border);
  }
  .actions .action.with-icon {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .actions .action.with-icon ha-icon {
    --mdc-icon-size: 14px;
    width: 14px;
    height: 14px;
    display: block;
    flex-shrink: 0;
  }
`;
function re(e, t, s, i, n) {
  if (!t || !i || !t.states[i])
    return c;
  let o = S(t, i);
  return l`
    <button
      type="button"
      class="metric"
      @click=${() => w(e, i)}
    >
      <span class="metric-label">${s}</span>
      <span class="metric-value">${o}</span>
    </button>
  `;
}
function b(e) {
  const t = e.variant || "", s = !!(e.icon && e.showLabel), i = !!(e.icon && !e.showLabel), n = [
    "action",
    t,
    i ? "icon" : "",
    s ? "with-icon" : ""
  ].filter(Boolean).join(" ");
  return l`
    <button
      type="button"
      class=${n}
      aria-label=${e.label}
      title=${e.label}
      ?disabled=${e.disabled}
      @click=${e.onClick}
    >
      ${e.icon ?? c}${s || !e.icon ? e.label : c}
    </button>
  `;
}
function _(e) {
  return l`<ha-icon .icon=${e}></ha-icon>`;
}
const Es = {
  signal: "mdi:car-wireless",
  hv: "mdi:car-electric",
  tyre: "mdi:tire"
};
function At(e) {
  const t = e.tone ?? "muted";
  return l`
    <button
      type="button"
      class="hotspot tone-${t}"
      aria-label=${e.label}
      title=${e.label}
      ?disabled=${e.disabled}
      @click=${e.onClick}
    >
      ${_(Es[e.icon])}
    </button>
  `;
}
function ae(e) {
  const {
    percent: t,
    primary: s,
    secondary: i,
    meta: n,
    onPercentClick: o,
    onSecondaryClick: r,
    onMetaClick: h
  } = e;
  if (t === void 0 && !s && !i && !n)
    return c;
  const a = e.tone ?? "ok", d = t === void 0 || Number.isNaN(t) ? void 0 : Math.max(0, Math.min(100, t)), p = d !== void 0 ? `${Math.round(d)}%` : void 0, u = l`
    <div
      class="hlevel-bar-wrap"
      aria-hidden=${d === void 0 ? "true" : "false"}
    >
      ${d !== void 0 ? l`<div class="hlevel-bar" style="width:${d}%"></div>` : c}
    </div>
  `, g = o && (p !== void 0 || d !== void 0) ? l`<button
          type="button"
          class="hlevel-percent"
          aria-label=${p ?? s ?? "level"}
          @click=${o}
        >
          ${p !== void 0 ? l`<div class="hlevel-pct">${p}</div>` : c}
          ${u}
        </button>` : l`
          ${p !== void 0 ? l`<div class="hlevel-pct">${p}</div>` : c}
          ${u}
        `, m = i ? r ? l`<button
          type="button"
          class="hlevel-secondary"
          @click=${r}
        >
          ${i}
        </button>` : l`<span class="hlevel-secondary">${i}</span>` : c, v = n ? h ? l`<button type="button" class="hlevel-meta" @click=${h}>
          ${n}
        </button>` : l`<span class="hlevel-meta">${n}</span>` : c;
  return l`
    <div class="hlevel tone-${a}">
      ${s ? l`<div class="hlevel-primary">${s}</div>` : c}
      ${g}
      ${i || n ? l`<div class="hlevel-details">${m}${v}</div>` : c}
    </div>
  `;
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Os = { ATTRIBUTE: 1 }, Ps = (e) => (...t) => ({ _$litDirective$: e, values: t });
let Ts = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, s, i) {
    this._$Ct = t, this._$AM = s, this._$Ci = i;
  }
  _$AS(t, s) {
    return this.update(t, s);
  }
  update(t, s) {
    return this.render(...s);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xe = "important", Ms = " !" + xe, Ls = Ps(class extends Ts {
  constructor(e) {
    var t;
    if (super(e), e.type !== Os.ATTRIBUTE || e.name !== "style" || ((t = e.strings) == null ? void 0 : t.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(e) {
    return Object.keys(e).reduce((t, s) => {
      const i = e[s];
      return i == null ? t : t + `${s = s.includes("-") ? s : s.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${i};`;
    }, "");
  }
  update(e, [t]) {
    const { style: s } = e.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
    for (const i of this.ft) t[i] == null && (this.ft.delete(i), i.includes("-") ? s.removeProperty(i) : s[i] = null);
    for (const i in t) {
      const n = t[i];
      if (n != null) {
        this.ft.add(i);
        const o = typeof n == "string" && n.endsWith(Ms);
        i.includes("-") || o ? s.setProperty(i, o ? n.slice(0, -11) : n, o ? xe : "") : s[i] = n;
      }
    }
    return z;
  }
});
function Rs(e) {
  const { percent: t, onClick: s } = e, i = e.socLabel ?? "SoC";
  if (t === void 0 && !s)
    return c;
  const n = t === void 0 || Number.isNaN(t) ? void 0 : Math.max(0, Math.min(100, t)), o = n === void 0 ? 0 : Math.round(n), r = n !== void 0 ? `${o}% ${i}` : i, h = n !== void 0 ? Ls({ "--ck-soc-pct": `${o}%` }) : c, a = l`
    <div
      class="soc-ring-meter ${n === void 0 ? "empty" : ""}"
      style=${h}
      aria-hidden="true"
    ></div>
    <div class="soc-ring-center">
      ${n !== void 0 ? l`<span class="soc-ring-pct">${o}%</span>` : l`<span class="soc-ring-pct muted">—</span>`}
      <span class="soc-ring-label">${i}</span>
    </div>
  `;
  return s ? l`
      <button
        type="button"
        class="soc-ring"
        aria-label=${r}
        @click=${s}
      >
        ${a}
      </button>
    ` : l`<div class="soc-ring">${a}</div>`;
}
function Ns(e) {
  const t = e.charging ?? !1, s = e.batteryLabel ?? "Battery", i = e.chargingLabel ?? "charging", n = e.percent === void 0 || Number.isNaN(e.percent) ? void 0 : Math.max(0, Math.min(100, e.percent));
  return l`
    <div
      class="charge-power ${t ? "is-charging" : "is-idle"}"
      role="img"
      aria-label=${t ? `${i}${n !== void 0 ? `, ${s} ${Math.round(n)}%` : ""}` : `${i}: off`}
    >
      <span class="charge-power-bolt"
        >${_("mdi:lightning-bolt")}</span
      >
    </div>
  `;
}
var Us = Object.defineProperty, Bs = Object.getOwnPropertyDescriptor, _t = (e, t, s, i) => {
  for (var n = i > 1 ? void 0 : i ? Bs(t, s) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && Us(t, s, n), n;
};
let K = class extends O {
  constructor() {
    super(...arguments), this._imageReady = !1, this._imageFailed = !1;
  }
  willUpdate(e) {
    e.has("src") && (this._imageReady = !1, this._imageFailed = !1);
  }
  _onImageLoad() {
    this._imageReady = !0;
  }
  _onImageError() {
    this._imageFailed = !0, this._imageReady = !0;
  }
  updated(e) {
    if (!e.has("src") && !e.has("_imageFailed"))
      return;
    const t = this.renderRoot.querySelector(
      "img.car-img"
    );
    t != null && t.complete && t.naturalWidth > 0 && (this._imageReady = !0);
  }
  render() {
    const e = !!this.src && !this._imageFailed, t = !e || this._imageReady, s = [
      e ? "has-img" : "",
      t ? "ready" : ""
    ].filter(Boolean).join(" ");
    return l`
      <div class="wrap ${s}">
        ${e ? l`<img
              class="car-img"
              src=${this.src}
              alt="Vehicle top"
              @load=${this._onImageLoad}
              @error=${this._onImageError}
            />` : l`
              <svg viewBox="0 0 120 200" class="outline" aria-hidden="true">
                <rect
                  x="25"
                  y="20"
                  width="70"
                  height="160"
                  rx="18"
                  class="body"
                />
                <rect
                  x="35"
                  y="35"
                  width="50"
                  height="28"
                  rx="4"
                  class="glass"
                />
                <rect
                  x="35"
                  y="140"
                  width="50"
                  height="22"
                  rx="4"
                  class="glass"
                />
              </svg>
            `}
        <div class="region seat-fl"><slot name="seat-fl"></slot></div>
        <div class="region seat-fr"><slot name="seat-fr"></slot></div>
        <div class="region seat-rl"><slot name="seat-rl"></slot></div>
        <div class="region seat-rr"><slot name="seat-rr"></slot></div>
        <div class="region wheel-fl"><slot name="wheel-fl"></slot></div>
        <div class="region wheel-fr"><slot name="wheel-fr"></slot></div>
        <div class="region wheel-rl"><slot name="wheel-rl"></slot></div>
        <div class="region wheel-rr"><slot name="wheel-rr"></slot></div>
        <div class="region windows"><slot name="windows"></slot></div>
        <div class="region sunroof"><slot name="sunroof"></slot></div>
        <div class="region trunk"><slot name="trunk"></slot></div>
        <div class="region charge"><slot name="charge"></slot></div>
        <div class="region lock"><slot name="lock"></slot></div>
        <div class="region defog"><slot name="defog"></slot></div>
        <div class="region engine"><slot name="engine"></slot></div>
      </div>
    `;
  }
};
K.styles = C`
    :host {
      display: block;
      width: 100%;
      max-width: 280px;
      margin: 0 auto;
      container-type: inline-size;
      container-name: ck-outline;
    }
    .wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 120 / 200;
    }
    .wrap.has-img.ready {
      aspect-ratio: auto;
    }
    .wrap.has-img:not(.ready) .region {
      visibility: hidden;
      pointer-events: none;
    }
    .car-img {
      width: 100%;
      height: auto;
      display: block;
      border-radius: 8px;
    }
    .outline {
      width: 100%;
      height: 100%;
      display: block;
    }
    .body {
      fill: color-mix(
        in srgb,
        var(--ck-accent, var(--primary-color, #0d9488)) 12%,
        var(--ck-bg, var(--card-background-color, #fff))
      );
      stroke: var(--ck-border, var(--divider-color, #e2e8f0));
      stroke-width: 2;
    }
    .glass {
      fill: var(
        --ck-surface-muted,
        color-mix(
          in srgb,
          var(--ck-accent, var(--primary-color, #0d9488)) 8%,
          var(--ck-bg, var(--card-background-color, #fff))
        )
      );
      stroke: none;
    }
    .region {
      position: absolute;
      min-width: 4px;
      min-height: 4px;
      pointer-events: auto;
    }
    /*
     * Regions paint in DOM order, so a popover in an earlier region (seat level
     * menu) would sit under later regions. Raise the active region instead.
     */
    .region:hover,
    .region:focus-within {
      z-index: 20;
    }
    /* Cabin seats: inset, clear of wheel TPMS */
    .seat-fl {
      left: 18%;
      top: 40%;
    }
    .seat-fr {
      right: 18%;
      top: 40%;
    }
    .seat-rl {
      left: 18%;
      top: 65%;
    }
    .seat-rr {
      right: 18%;
      top: 65%;
    }
    /* TPMS: front near mirrors/wheels; rear aligned with rear wheels */
    .wheel-fl {
      left: 0;
      top: 18%;
    }
    .wheel-fr {
      right: 0;
      top: 18%;
    }
    .wheel-rl {
      left: 0;
      top: 78%;
    }
    .wheel-rr {
      right: 0;
      top: 78%;
    }
    /* Stack under lock, same left edge — vertical window then vent */
    .windows {
      left: 3%;
      top: 60%;
      transform: translate(-50%, -50%);
    }
    .sunroof {
      left: 50%;
      top: 54%;
      transform: translateX(-50%);
    }
    /* Body / access: trunk rear, charge rear-left, lock mid-side, defog windshield, engine/find hood */
    .trunk {
      left: 50%;
      top: 93%;
      transform: translate(-50%, -50%);
    }
    .charge {
      left: 14%;
      top: 94%;
      transform: translate(-50%, -50%);
    }
    .lock {
      left: 3%;
      top: 45%;
      transform: translate(-50%, -50%);
    }
    .defog {
      left: 50%;
      top: 29%;
      transform: translate(-50%, -50%);
    }
    .engine {
      left: 50%;
      top: 12%;
      transform: translate(-50%, -50%);
    }
  `;
_t([
  q({ type: String })
], K.prototype, "src", 2);
_t([
  P()
], K.prototype, "_imageReady", 2);
_t([
  P()
], K.prototype, "_imageFailed", 2);
K = _t([
  R("carlinko-car-outline")
], K);
var Hs = Object.defineProperty, Ds = Object.getOwnPropertyDescriptor, Dt = (e, t, s, i) => {
  for (var n = i > 1 ? void 0 : i ? Ds(t, s) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && Hs(t, s, n), n;
};
let it = class extends O {
  constructor() {
    super(...arguments), this._imageReady = !1;
  }
  willUpdate(e) {
    e.has("src") && (this._imageReady = !1);
  }
  _onImageLoad() {
    this._imageReady = !0;
  }
  _onImageError() {
    this._imageReady = !0;
  }
  updated(e) {
    if (!e.has("src"))
      return;
    const t = this.renderRoot.querySelector(
      "img.car-img"
    );
    t != null && t.complete && t.naturalWidth > 0 && (this._imageReady = !0);
  }
  render() {
    const e = !!this.src, t = !e || this._imageReady, s = [
      e ? "has-img" : "",
      t ? "ready" : ""
    ].filter(Boolean).join(" ");
    return l`
      <div class="wrap ${s}">
        ${e ? l`<img
              class="car-img"
              src=${this.src}
              alt="Vehicle"
              @load=${this._onImageLoad}
              @error=${this._onImageError}
            />` : l`<div class="placeholder">
              <slot name="placeholder">No image</slot>
            </div>`}
        <div class="region headline"><slot name="headline"></slot></div>
        <div class="region online"><slot name="online"></slot></div>
        <div class="region hv"><slot name="hv"></slot></div>
        <div class="region tyres"><slot name="tyres"></slot></div>
      </div>
    `;
  }
};
it.styles = C`
    :host {
      display: block;
      width: 100%;
      container-type: inline-size;
      container-name: ck-stage;
    }
    .wrap {
      position: relative;
      width: 100%;
      min-height: 120px;
      border-radius: var(--ha-card-border-radius, 12px);
      overflow: visible;
      background: var(
        --ha-card-background,
        var(--ck-bg, var(--card-background-color, #fff))
      );
    }
    /* Leave room above the vehicle so odometer / range / speed do not sit on the roof */
    .wrap.has-img {
      padding-top: 4.5rem;
    }
    .wrap.has-img:not(.ready) .region {
      visibility: hidden;
      pointer-events: none;
    }
    .car-img {
      display: block;
      width: 100%;
      height: auto;
      border-radius: var(--ha-card-border-radius, 12px);
    }
    .placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 160px;
      color: var(--ck-muted, var(--secondary-text-color, #667));
      font-size: 0.9rem;
      padding: 24px;
    }
    .region {
      position: absolute;
      transform: translate(-50%, -50%);
      z-index: 1;
      pointer-events: auto;
    }
    /* Mileage text: top-left in the padding band (no centered transform) */
    .headline {
      left: 3%;
      top: 0.35rem;
      transform: none;
      max-width: calc(100% - 6%);
    }
    /* Spread status hotspots so they do not overlap on narrow cards */
    .online {
      left: 94%;
      top: 1.4rem;
      transform: translate(-50%, 0);
    }
    .hv {
      left: 8%;
      top: 88%;
    }
    .tyres {
      left: 94%;
      top: 88%;
    }
    @container ck-stage (max-width: 360px) {
      .wrap.has-img {
        padding-top: 4rem;
      }
      .online {
        left: 92%;
        top: 1.15rem;
      }
      .hv {
        left: 10%;
      }
      .tyres {
        left: 92%;
      }
    }
  `;
Dt([
  q({ type: String })
], it.prototype, "src", 2);
Dt([
  P()
], it.prototype, "_imageReady", 2);
it = Dt([
  R("carlinko-vehicle-stage")
], it);
var js = Object.defineProperty, zs = Object.getOwnPropertyDescriptor, jt = (e, t, s, i) => {
  for (var n = i > 1 ? void 0 : i ? zs(t, s) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && js(t, s, n), n;
};
function Is(e, t) {
  const s = (t || "unknown").toLowerCase(), i = es(e, s);
  switch (s) {
    case "ready":
      return { label: i, tone: "ok" };
    case "lv":
      return { label: i, tone: "info" };
    case "off":
      return { label: i, tone: "muted" };
    default:
      return { label: i, tone: "warn" };
  }
}
let nt = class extends O {
  constructor() {
    super(...arguments), this._slotCache = new Bt();
  }
  setConfig(e) {
    if (!e || typeof e.device_id != "string")
      throw new Error("device_id is required");
    this._slotCache.invalidate(), this._config = { ...e };
  }
  getCardSize() {
    return 6;
  }
  static getConfigElement() {
    return document.createElement("carlinko-overview-editor");
  }
  static getStubConfig() {
    return {
      device_id: "",
      title: f(void 0, "stub.overview")
    };
  }
  shouldUpdate(e) {
    if (e.has("_config"))
      return !0;
    if (e.has("hass")) {
      const t = e.get("hass");
      if (!t || !this.hass)
        return !0;
      if (t.entities !== this.hass.entities)
        return this._slotCache.invalidate(), !0;
      const s = this._slotCache.peek();
      return s ? Ut(t, this.hass, Object.values(s)) : !0;
    }
    return !0;
  }
  updated(e) {
    e.has("hass") && this.hass && Nt(this.hass).then((t) => {
      t && this.requestUpdate();
    });
  }
  _slots() {
    return this._config ? this._slotCache.get(this.hass, this._config, ls) : {};
  }
  render() {
    var lt;
    if (!this._config)
      return l`<ha-card
        ><div class="pad">${f(this.hass, "chrome.not_configured")}</div></ha-card
      >`;
    if (!((lt = this._config.device_id) != null && lt.trim()))
      return l`<ha-card
        ><div class="pad">${f(this.hass, "chrome.select_device")}</div></ha-card
      >`;
    if (!this.hass)
      return l`<ha-card
        ><div class="pad">${f(void 0, "chrome.waiting_hass")}</div></ha-card
      >`;
    const e = this._slots(), t = we(this.hass, e.image), s = st(this.hass, e.engine), i = st(this.hass, e.online), n = gt(this.hass, e.battery), o = gt(this.hass, e.fuel), r = e.odometer && this.hass.states[e.odometer] ? S(this.hass, e.odometer) : void 0, h = e.total_range && this.hass.states[e.total_range] ? S(this.hass, e.total_range) : void 0, a = s && e.engine && e.speed && this.hass.states[e.speed] ? S(this.hass, e.speed) : void 0, d = e.range && this.hass.states[e.range] ? S(this.hass, e.range) : void 0, p = e.fuel_range && this.hass.states[e.fuel_range] ? S(this.hass, e.fuel_range) : void 0, u = x(this.hass, e.hv_state), g = e.hv_state ? Is(this.hass, u) : void 0, m = e.consumption && this.hass.states[e.consumption] ? S(this.hass, e.consumption) : void 0, v = e.fuel_consumption && this.hass.states[e.fuel_consumption] ? S(this.hass, e.fuel_consumption) : void 0, $ = !!(r || h || a), y = e.tyres_ok || e.tyre_status ? ye(this.hass, e.tyres_ok, e.tyre_status) : void 0, E = y === "danger" ? k(this.hass, "binary_sensor", "tyres_ok") : y === "warn" ? B(this.hass, "sensor", "tyre_status", "check_tyres") : f(this.hass, "status.tyres_ok"), J = e.tyres_ok ?? e.tyre_status;
    return l`
      <ha-card>
        ${this._config.title ? l`<div class="header">${this._config.title}</div>` : c}
        <div class="body">
          <div class="hero">
            <carlinko-vehicle-stage .src=${t}>
              ${$ ? l`<div slot="headline" class="headline">
                    ${r ? l`<button
                          type="button"
                          class="odo"
                          @click=${() => w(this, e.odometer)}
                        >
                          <span class="odo-label"
                            >${k(
      this.hass,
      "sensor",
      "odometer"
    )}</span
                          >
                          <span class="odo-value">${r}</span>
                        </button>` : c}
                    ${h ? l`<button
                          type="button"
                          class="range-total"
                          @click=${() => w(this, e.total_range)}
                        >
                          <span class="range-label"
                            >${k(
      this.hass,
      "sensor",
      "total_range"
    )}</span
                          >
                          <span class="range-value">${h}</span>
                        </button>` : c}
                    ${a ? l`<button
                          type="button"
                          class="speed"
                          @click=${() => w(this, e.speed)}
                        >
                          <span class="speed-label"
                            >${k(this.hass, "sensor", "speed")}</span
                          >
                          <span class="speed-value">${a}</span>
                        </button>` : c}
                  </div>` : c}
              ${e.online ? l`<div slot="online">
                    ${At({
      icon: "signal",
      label: i ? k(this.hass, "binary_sensor", "online") : f(this.hass, "status.offline"),
      tone: i ? "ok" : "muted",
      onClick: () => w(this, e.online)
    })}
                  </div>` : c}
              ${e.hv_state && g ? l`<div slot="hv">
                    ${At({
      icon: "hv",
      label: g.label,
      tone: g.tone,
      onClick: () => w(this, e.hv_state)
    })}
                  </div>` : c}
              ${y && J ? l`<div slot="tyres">
                    ${At({
      icon: "tyre",
      label: E,
      tone: y,
      onClick: () => w(this, J)
    })}
                  </div>` : c}
            </carlinko-vehicle-stage>
          </div>
          <div class="vitals">
            <div class="levels">
              ${ae({
      percent: n,
      primary: n !== void 0 || d ? f(this.hass, "status.soc") : void 0,
      secondary: d,
      meta: m,
      tone: "ok",
      onPercentClick: e.battery && this.hass.states[e.battery] ? () => w(this, e.battery) : void 0,
      onSecondaryClick: e.range && this.hass.states[e.range] ? () => w(this, e.range) : void 0,
      onMetaClick: e.consumption && this.hass.states[e.consumption] ? () => w(this, e.consumption) : void 0
    })}
              ${ae({
      percent: o,
      primary: o !== void 0 || p ? k(this.hass, "sensor", "fuel") : void 0,
      secondary: p,
      meta: v,
      tone: "info",
      onPercentClick: e.fuel && this.hass.states[e.fuel] ? () => w(this, e.fuel) : void 0,
      onSecondaryClick: e.fuel_range && this.hass.states[e.fuel_range] ? () => w(this, e.fuel_range) : void 0,
      onMetaClick: e.fuel_consumption && this.hass.states[e.fuel_consumption] ? () => w(this, e.fuel_consumption) : void 0
    })}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
nt.styles = [
  Ht,
  $s,
  xs,
  C`
      .body {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px;
      }
      .hero {
        min-width: 0;
        width: 100%;
      }
      .vitals {
        display: flex;
        flex-direction: column;
        gap: 12px;
        min-width: 0;
      }
      .levels {
        display: flex;
        flex-wrap: wrap;
        gap: 16px 24px;
      }
      .headline {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        gap: 12px 20px;
      }
      .odo,
      .range-total,
      .speed {
        border: none;
        background: transparent;
        color: inherit;
        padding: 0;
        cursor: pointer;
        font: inherit;
        text-align: left;
        min-width: 0;
      }
      .odo-label,
      .range-label,
      .speed-label {
        display: block;
        color: var(--ck-muted);
        font-size: 0.75rem;
        text-shadow:
          0 1px 2px rgba(0, 0, 0, 0.55),
          0 0 8px rgba(0, 0, 0, 0.35),
          0 1px 2px rgba(255, 255, 255, 0.75),
          0 0 8px rgba(255, 255, 255, 0.45);
      }
      .odo-value,
      .range-value,
      .speed-value {
        font-size: 1.35rem;
        font-weight: 700;
        letter-spacing: 0.02em;
        line-height: 1.2;
        text-shadow:
          0 1px 2px rgba(0, 0, 0, 0.55),
          0 0 8px rgba(0, 0, 0, 0.35),
          0 1px 2px rgba(255, 255, 255, 0.75),
          0 0 8px rgba(255, 255, 255, 0.45);
      }
      @container ck-card (max-width: 360px) {
        .body {
          gap: 12px;
          padding: 12px;
        }
        .vitals {
          gap: 8px;
        }
        .levels {
          gap: 12px 16px;
        }
        .headline {
          gap: 8px 12px;
        }
        .odo-value,
        .range-value,
        .speed-value {
          font-size: 1.15rem;
        }
      }
    `
];
jt([
  q({ attribute: !1 })
], nt.prototype, "hass", 2);
jt([
  P()
], nt.prototype, "_config", 2);
nt = jt([
  R("carlinko-overview")
], nt);
var qs = Object.defineProperty, Ce = (e, t, s, i) => {
  for (var n = void 0, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = r(t, s, n) || n);
  return n && qs(t, s, n), n;
};
const Ws = {
  name: "image_entity",
  selector: {
    entity: {
      domain: "image",
      filter: { integration: "carlinko" }
    }
  }
}, Se = {
  name: "image_entity",
  selector: {
    entity: {
      domain: "image",
      filter: { integration: "carlinko" }
    }
  }
};
class at extends O {
  constructor() {
    super(...arguments), this._computeLabel = (t) => t.label || t.name;
  }
  setConfig(t) {
    this._config = { ...t };
  }
  /** Extra fields after device_id + title. */
  extraSchema() {
    return [];
  }
  /**
   * Skip hass-only updates after the first paint. Lovelace assigns a new hass
   * on every state_changed; re-rendering ha-form re-runs expensive device /
   * entity selector filters.
   */
  shouldUpdate(t) {
    return t.has("_config") ? !0 : t.has("hass") ? t.get("hass") === void 0 : !0;
  }
  _buildSchema() {
    return [
      {
        name: "device_id",
        label: f(this.hass, "editor.device"),
        selector: {
          device: {
            filter: { integration: "carlinko" }
          }
        }
      },
      {
        name: "title",
        label: f(this.hass, "editor.title"),
        selector: { text: {} }
      },
      ...this.extraSchema().map((t) => {
        if (t.name !== "image_entity" || t.label)
          return t;
        const s = t === Se;
        return {
          ...t,
          label: f(
            this.hass,
            s ? "editor.top_image_override" : "editor.image_override"
          )
        };
      })
    ];
  }
  _valueChanged(t) {
    var i;
    t.stopPropagation();
    const s = (i = t.detail) == null ? void 0 : i.value;
    s && (this._config = { ...s }, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  render() {
    return !this.hass || !this._config ? c : (this._cachedSchema ?? (this._cachedSchema = this._buildSchema()), l`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._cachedSchema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `);
  }
}
Ce([
  q({ attribute: !1 })
], at.prototype, "hass");
Ce([
  P()
], at.prototype, "_config");
var Vs = Object.getOwnPropertyDescriptor, Ks = (e, t, s, i) => {
  for (var n = i > 1 ? void 0 : i ? Vs(t, s) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = r(n) || n);
  return n;
};
let ce = class extends at {
  extraSchema() {
    return [Ws];
  }
};
ce = Ks([
  R("carlinko-overview-editor")
], ce);
async function Ae(e, t, s, i) {
  if (e())
    return !1;
  t(!0);
  try {
    return await s(), !0;
  } catch (n) {
    return i == null || i(n), !1;
  } finally {
    t(!1);
  }
}
var Fs = Object.defineProperty, Zs = Object.getOwnPropertyDescriptor, vt = (e, t, s, i) => {
  for (var n = i > 1 ? void 0 : i ? Zs(t, s) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && Fs(t, s, n), n;
};
let F = class extends O {
  constructor() {
    super(...arguments), this._busy = !1, this._slotCache = new Bt();
  }
  setConfig(e) {
    if (!e || typeof e.device_id != "string")
      throw new Error("device_id is required");
    this._slotCache.invalidate(), this._config = { ...e };
  }
  getCardSize() {
    return 4;
  }
  static getConfigElement() {
    return document.createElement("carlinko-charging-editor");
  }
  static getStubConfig() {
    return {
      device_id: "",
      title: f(void 0, "stub.charging")
    };
  }
  shouldUpdate(e) {
    if (e.has("_config") || e.has("_busy"))
      return !0;
    if (e.has("hass")) {
      const t = e.get("hass");
      if (!t || !this.hass)
        return !0;
      if (t.entities !== this.hass.entities)
        return this._slotCache.invalidate(), !0;
      const s = this._slotCache.peek();
      return s ? Ut(t, this.hass, Object.values(s)) : !0;
    }
    return !0;
  }
  updated(e) {
    e.has("hass") && this.hass && Nt(this.hass).then((t) => {
      t && this.requestUpdate();
    });
  }
  _slots() {
    return this._config ? this._slotCache.get(this.hass, this._config, hs) : {};
  }
  _run(e) {
    this.hass && Ae(
      () => this._busy,
      (t) => {
        this._busy = t;
      },
      e,
      (t) => console.error("carlinko-charging action failed", t)
    );
  }
  _metaRow(e, t, s, i) {
    var n;
    return !s || !((n = this.hass) != null && n.states[s]) ? c : l`
      <button
        type="button"
        class="charge-meta-row"
        @click=${() => w(this, s)}
      >
        <span class="charge-meta-label">${e}:</span>
        <span class="charge-meta-value${i ? ` ${i}` : ""}"
          >${t}</span
        >
      </button>
    `;
  }
  render() {
    var y;
    if (!this._config)
      return l`<ha-card
        ><div class="pad">${f(this.hass, "chrome.not_configured")}</div></ha-card
      >`;
    if (!((y = this._config.device_id) != null && y.trim()))
      return l`<ha-card
        ><div class="pad">${f(this.hass, "chrome.select_device")}</div></ha-card
      >`;
    if (!this.hass)
      return l`<ha-card
        ><div class="pad">${f(void 0, "chrome.waiting_hass")}</div></ha-card
      >`;
    const e = this._slots(), t = st(this.hass, e.charging), s = gt(this.hass, e.battery), i = !!(e.battery && this.hass.states[e.battery]), n = !!(e.charging && this.hass.states[e.charging]), o = !!(e.charge_power && this.hass.states[e.charge_power]), r = !!(e.charge_remaining && this.hass.states[e.charge_remaining]), h = e.charge_state && this.hass.states[e.charge_state] || e.charge_mode && this.hass.states[e.charge_mode], a = !!(e.charge_stop && this.hass.states[e.charge_stop]) && be(this.hass, e.charge_mode), d = i || n || o || r, p = t ? k(this.hass, "binary_sensor", "charging") : f(this.hass, "status.not_charging"), u = t ? "ok" : "muted", g = S(this.hass, e.charge_power), m = ps(this.hass, e.charge_remaining), v = k(this.hass, "sensor", "battery"), $ = f(this.hass, "status.soc");
    return l`
      <ha-card>
        ${this._config.title ? l`<div class="header">${this._config.title}</div>` : c}
        <div class="body-pad">
          ${d ? l`
                <div class="charge-hero">
                  ${i ? Rs({
      percent: s,
      socLabel: $,
      onClick: () => w(this, e.battery)
    }) : c}
                  ${i ? l`<div class="charge-hero-link" aria-hidden="true"></div>
                        ${Ns({
      percent: s,
      charging: t,
      batteryLabel: v,
      chargingLabel: k(
        this.hass,
        "binary_sensor",
        "charging"
      )
    })}` : c}
                  <div class="charge-hero-meta">
                    ${n ? this._metaRow(
      f(this.hass, "status.plugged"),
      p,
      e.charging,
      u
    ) : c}
                    ${o ? this._metaRow(
      f(this.hass, "status.power"),
      g,
      e.charge_power
    ) : c}
                    ${r ? this._metaRow(
      f(this.hass, "status.time"),
      m,
      e.charge_remaining
    ) : c}
                  </div>
                </div>
              ` : c}
          ${h ? l`
                <div class="charge-secondary">
                  ${re(
      this,
      this.hass,
      k(this.hass, "sensor", "charge_state"),
      e.charge_state
    )}
                  ${re(
      this,
      this.hass,
      f(this.hass, "status.mode"),
      e.charge_mode
    )}
                </div>
              ` : c}
        </div>
        ${a ? l`
              <div class="actions">
                ${b({
      label: k(this.hass, "button", "charge_stop"),
      icon: _("mdi:stop"),
      showLabel: !0,
      disabled: this._busy,
      variant: "danger",
      onClick: () => this._run(() => U(this.hass, e.charge_stop))
    })}
              </div>
            ` : c}
      </ha-card>
    `;
  }
};
F.styles = [
  Ht,
  ke,
  $e,
  Cs,
  Ss,
  As
];
vt([
  q({ attribute: !1 })
], F.prototype, "hass", 2);
vt([
  P()
], F.prototype, "_config", 2);
vt([
  P()
], F.prototype, "_busy", 2);
F = vt([
  R("carlinko-charging")
], F);
var Js = Object.getOwnPropertyDescriptor, Gs = (e, t, s, i) => {
  for (var n = i > 1 ? void 0 : i ? Js(t, s) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = r(n) || n);
  return n;
};
let le = class extends at {
};
le = Gs([
  R("carlinko-charging-editor")
], le);
var Ys = Object.defineProperty, Qs = Object.getOwnPropertyDescriptor, ct = (e, t, s, i) => {
  for (var n = i > 1 ? void 0 : i ? Qs(t, s) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && Ys(t, s, n), n;
};
const he = [
  { slot: "seat-fl", heat: "seat_heat_l", vent: "seat_vent_l" },
  { slot: "seat-fr", heat: "seat_heat_r", vent: "seat_vent_r" },
  { slot: "seat-rl", heat: "seat_heat_lr", vent: "seat_vent_lr" },
  { slot: "seat-rr", heat: "seat_heat_rr", vent: "seat_vent_rr" }
], Xs = [
  { slot: "wheel-fl", pressure: "tyre_fl", temp: "tyre_fl_temp" },
  { slot: "wheel-fr", pressure: "tyre_fr", temp: "tyre_fr_temp" },
  { slot: "wheel-rl", pressure: "tyre_rl", temp: "tyre_rl_temp" },
  { slot: "wheel-rr", pressure: "tyre_rr", temp: "tyre_rr_temp" }
], ti = ["tyre_fl", "tyre_fr", "tyre_rl", "tyre_rr"];
function Et(e) {
  return e.split(".", 1)[0];
}
function ei(e) {
  if (!e)
    return !0;
  const t = e.toLowerCase();
  return t === "off" || t === "unavailable";
}
function ut(e) {
  return (e == null ? void 0 : e.toLowerCase()) === "unknown";
}
function Ot(e) {
  return !!e && !ei(e) && !ut(e);
}
let I = class extends O {
  constructor() {
    super(...arguments), this._busy = !1, this._openSeatMenu = null, this._slotCache = new Bt(), this._onDocPointerDown = (e) => {
      if (!this._openSeatMenu)
        return;
      e.composedPath().some(
        (i) => i instanceof HTMLElement && (i.classList.contains("seat-icon") || i.classList.contains("seat-menu"))
      ) || this._closeSeatMenu();
    }, this._onDocKeyDown = (e) => {
      e.key === "Escape" && this._openSeatMenu && this._closeSeatMenu();
    };
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("pointerdown", this._onDocPointerDown, !0), document.addEventListener("keydown", this._onDocKeyDown);
  }
  disconnectedCallback() {
    document.removeEventListener("pointerdown", this._onDocPointerDown, !0), document.removeEventListener("keydown", this._onDocKeyDown), super.disconnectedCallback();
  }
  setConfig(e) {
    if (!e || typeof e.device_id != "string")
      throw new Error("device_id is required");
    this._slotCache.invalidate(), this._config = { ...e };
  }
  getCardSize() {
    return 7;
  }
  static getConfigElement() {
    return document.createElement("carlinko-cabin-editor");
  }
  static getStubConfig() {
    return {
      device_id: "",
      title: f(void 0, "stub.cabin")
    };
  }
  shouldUpdate(e) {
    if (e.has("_config") || e.has("_busy") || e.has("_openSeatMenu"))
      return !0;
    if (e.has("hass")) {
      const t = e.get("hass");
      if (!t || !this.hass)
        return !0;
      if (t.entities !== this.hass.entities)
        return this._slotCache.invalidate(), !0;
      const s = this._slotCache.peek();
      return s ? Ut(t, this.hass, Object.values(s)) : !0;
    }
    return !0;
  }
  updated(e) {
    e.has("hass") && this.hass && Nt(this.hass).then((t) => {
      t && this.requestUpdate();
    });
  }
  _slots() {
    return this._config ? this._slotCache.get(this.hass, this._config, ds) : {};
  }
  _run(e) {
    this.hass && Ae(
      () => this._busy,
      (t) => {
        this._busy = t;
      },
      e,
      (t) => console.error("carlinko-cabin action failed", t)
    );
  }
  _nudgeTemp(e) {
    const t = this._slots().climate;
    if (!this.hass || !t)
      return;
    const s = se(this.hass, t);
    if (s === void 0)
      return;
    const i = vs(this.hass, t), n = bs(this.hass, t), o = ys(this.hass, t), r = Math.min(o, Math.max(n, s + e * i));
    this._run(() => ks(this.hass, t, r));
  }
  _toggleClimate() {
    const e = this._slots().climate;
    if (!this.hass || !e)
      return;
    const t = ie(this.hass, e);
    this._run(
      () => ws(this.hass, e, t ? "off" : "cool")
    );
  }
  _closeSeatMenu() {
    this._openSeatMenu && (this._openSeatMenu = null);
  }
  _toggleSeatMenu(e, t) {
    const s = this._openSeatMenu;
    if (s && s.slot === e && s.kind === t) {
      this._openSeatMenu = null;
      return;
    }
    this._openSeatMenu = { slot: e, kind: t };
  }
  _offSelectOption(e) {
    return oe(this.hass, e).find(
      (t) => t.toLowerCase() === "off"
    );
  }
  async _turnSeatOff(e) {
    var s;
    if (!((s = this.hass) != null && s.states[e]))
      return;
    const t = x(this.hass, e);
    if (Ot(t)) {
      if (Et(e) === "select") {
        const i = this._offSelectOption(e);
        if (!i)
          return;
        await ne(this.hass, e, i);
        return;
      }
      await xt(this.hass, e);
    }
  }
  _setSeatLevel(e, t, s) {
    this.hass && this._run(async () => {
      t.toLowerCase() !== "off" && s && await this._turnSeatOff(s), await ne(this.hass, e, t);
    });
  }
  _toggleSeatBinary(e, t) {
    if (!this.hass)
      return;
    const s = x(this.hass, e) === "on";
    this._run(async () => {
      !s && t && await this._turnSeatOff(t), s ? await xt(this.hass, e) : await te(this.hass, e);
    });
  }
  _seatStateLabel(e, t, s) {
    return Et(e) === "select" ? B(this.hass, "select", t, s) : s === "on" ? "On" : B(this.hass, "select", t, "off");
  }
  _hasDirectTpms(e) {
    return this.hass ? ti.some((t) => {
      const s = e[t];
      return !!(s && this.hass.states[s]);
    }) : !1;
  }
  _hasSeats(e) {
    return this.hass ? he.some((t) => {
      const s = t.heat ? e[t.heat] : void 0, i = t.vent ? e[t.vent] : void 0;
      return s && this.hass.states[s] || i && this.hass.states[i];
    }) : !1;
  }
  _seatIcon(e, t, s, i, n, o) {
    var y;
    const r = x(this.hass, s), h = Et(s), a = t === "heat" ? f(this.hass, "status.heat") : f(this.hass, "status.vent"), d = this._seatStateLabel(s, i, r), p = ((y = this._openSeatMenu) == null ? void 0 : y.slot) === e.slot && this._openSeatMenu.kind === t, u = h === "select", g = u ? (E) => {
      E.stopPropagation(), this._toggleSeatMenu(e.slot, t);
    } : () => this._toggleSeatBinary(s, n), m = e.slot === "seat-rl" || e.slot === "seat-rr", v = e.slot === "seat-fr" || e.slot === "seat-rr", $ = u ? oe(this.hass, s) : [];
    return l`
      <div
        class="seat-icon-wrap"
        @mouseenter=${() => {
      u && !this._busy && (this._openSeatMenu = { slot: e.slot, kind: t });
    }}
        @mouseleave=${() => {
      u && this._closeSeatMenu();
    }}
      >
        <button
          type="button"
          class="seat-icon ${t}${o ? " active" : ""}${p ? " open" : ""}"
          ?disabled=${this._busy}
          title=${`${a}: ${d}`}
          aria-label=${`${a}: ${d}`}
          aria-haspopup=${u ? "listbox" : c}
          aria-expanded=${u ? String(p) : c}
          @click=${g}
        >
          ${_(t === "heat" ? "mdi:car-seat-heater" : "mdi:car-seat-cooler")}
        </button>
        ${p && u ? l`
              <div
                class="seat-menu ${t}${m ? " up" : ""}${v ? " end" : ""}"
                role="listbox"
                aria-label=${a}
              >
                ${$.map((E) => {
      const J = E === r, lt = E.toLowerCase() === "off", Ee = B(
        this.hass,
        "select",
        i,
        E
      );
      return l`
                    <button
                      type="button"
                      class="seat-option${lt ? " off" : ""}${J ? " current" : ""}"
                      role="option"
                      aria-selected=${String(J)}
                      ?disabled=${this._busy}
                      @click=${(Oe) => {
        Oe.stopPropagation(), this._closeSeatMenu(), this._setSeatLevel(s, E, n);
      }}
                    >
                      ${Ee}
                    </button>
                  `;
    })}
              </div>
            ` : c}
      </div>
    `;
  }
  _seatZone(e, t) {
    var m, v, $;
    const s = e.heat ? t[e.heat] : void 0, i = e.vent ? t[e.vent] : void 0, n = s && ((m = this.hass) != null && m.states[s]) ? s : void 0, o = i && ((v = this.hass) != null && v.states[i]) ? i : void 0;
    if (!n && !o)
      return c;
    const r = n ? x(this.hass, n) : void 0, h = o ? x(this.hass, o) : void 0, a = Ot(r), d = Ot(h);
    let p = "off", u = B(this.hass, "select", "seat_heat_l", "off");
    if (a && e.heat)
      p = "heat", u = this._seatStateLabel(n, e.heat, r);
    else if (d && e.vent)
      p = "vent", u = this._seatStateLabel(o, e.vent, h);
    else if (ut(r) || ut(h)) {
      p = "unknown";
      const y = e.heat ?? e.vent ?? "seat_heat_l", E = ut(r) ? r : h;
      u = B(this.hass, "select", y, E);
    }
    const g = (($ = this._openSeatMenu) == null ? void 0 : $.slot) === e.slot;
    return l`
      <div
        slot=${e.slot}
        class="seat-chip${g ? " menu-open" : ""}"
      >
        <div class="seat-icons">
          ${n && e.heat ? this._seatIcon(e, "heat", n, e.heat, o, a) : c}
          ${o && e.vent ? this._seatIcon(e, "vent", o, e.vent, n, d) : c}
        </div>
        <span class="seat-state ${p}">${u}</span>
      </div>
    `;
  }
  _wheelChip(e, t, s) {
    if (!this.hass)
      return c;
    const i = !!(e && this.hass.states[e]), n = !!(t && this.hass.states[t]);
    if (!i && !n)
      return c;
    const o = i ? S(this.hass, e) : void 0, r = n ? S(this.hass, t) : void 0, h = i ? e : t, a = [o, r].filter(Boolean).join(", ");
    return l`
      <button
        type="button"
        class="wheel-chip tone-${s}"
        title=${a}
        aria-label=${a}
        @click=${() => w(this, h)}
      >
        ${_("mdi:tire")}
        <span class="wheel-chip-text">
          ${o ? l`<span class="wheel-pressure">${o}</span>` : c}
          ${r ? l`<span class="wheel-temp">${r}</span>` : c}
        </span>
      </button>
    `;
  }
  _wheelZone(e, t) {
    var h, a;
    const s = t[e.pressure], i = t[e.temp], n = !!(s && ((h = this.hass) != null && h.states[s])), o = !!(i && ((a = this.hass) != null && a.states[i]));
    if (!n && !o)
      return c;
    const r = ye(this.hass, t.tyres_ok, t.tyre_status);
    return l`
      <div slot=${e.slot} class="wheel-zone">
        ${this._wheelChip(s, i, r)}
      </div>
    `;
  }
  _entityExists(e) {
    var t;
    return !!(e && ((t = this.hass) != null && t.states[e]));
  }
  _hasWindowsControls(e) {
    return this._entityExists(e.windows) || this._entityExists(e.windows_vent) || this._entityExists(e.sunroof) || this._entityExists(e.sunroof_tilt);
  }
  _chargerConnected(e) {
    return be(this.hass, e.charge_mode);
  }
  _hasBodyControls(e) {
    return this._entityExists(e.lock) || this._entityExists(e.engine) || this._entityExists(e.find) || this._entityExists(e.defog) || this._entityExists(e.charge_stop) && this._chargerConnected(e) || this._entityExists(e.trunk);
  }
  _bodyActions(e) {
    const t = e.lock, s = e.engine, i = e.find, n = e.defog, o = e.charge_stop, r = e.trunk, h = this._chargerConnected(e), a = this._entityExists(o) && h, d = this._entityExists(s), p = this._entityExists(i);
    if (!t && !d && !p && !n && !a && !r)
      return c;
    const g = x(this.hass, t) === "locked", m = st(this.hass, s), v = st(this.hass, n), $ = !!(n != null && n.startsWith("binary_sensor.")), y = x(this.hass, r) === "open";
    return l`
      ${d || p ? l`<div slot="engine" class="map-actions">
            ${d ? b({
      label: m ? f(this.hass, "action.engine_off") : f(this.hass, "action.engine_on"),
      icon: _("mdi:engine"),
      disabled: this._busy,
      variant: m ? "ok" : "danger",
      onClick: () => this._run(
        () => m ? xt(this.hass, s) : te(this.hass, s)
      )
    }) : c}
            ${p ? b({
      label: k(this.hass, "button", "find"),
      icon: _("mdi:map-marker"),
      disabled: this._busy,
      onClick: () => this._run(() => U(this.hass, i))
    }) : c}
          </div>` : c}
      ${this._entityExists(t) ? l`<div slot="lock" class="map-actions">
            ${b({
      label: g ? f(this.hass, "action.unlock_doors") : f(this.hass, "action.lock_doors"),
      icon: _(g ? "mdi:car-door-lock" : "mdi:lock-open-variant"),
      disabled: this._busy,
      variant: g ? "ok" : "danger",
      onClick: () => this._run(
        () => g ? gs(this.hass, t) : fs(this.hass, t)
      )
    })}
          </div>` : c}
      ${this._entityExists(n) ? l`<div slot="defog" class="map-actions">
            ${b({
      label: v ? f(this.hass, "action.defog_off") : f(this.hass, "action.defog_on"),
      icon: _("mdi:car-defrost-front"),
      disabled: this._busy || $,
      variant: v ? "danger" : "",
      onClick: () => this._run(() => ms(this.hass, n))
    })}
          </div>` : c}
      ${a ? l`<div slot="charge" class="map-actions">
            ${b({
      label: k(this.hass, "button", "charge_stop"),
      icon: _("mdi:ev-station"),
      disabled: this._busy,
      variant: "danger",
      onClick: () => this._run(() => U(this.hass, o))
    })}
          </div>` : c}
      ${this._entityExists(r) ? l`<div slot="trunk" class="map-actions">
            ${b({
      label: y ? f(this.hass, "action.close_trunk") : f(this.hass, "action.open_trunk"),
      icon: _("mdi:car-back"),
      disabled: this._busy,
      variant: y ? "danger" : "ok",
      onClick: () => this._run(
        () => y ? St(this.hass, r) : Ct(this.hass, r)
      )
    })}
          </div>` : c}
    `;
  }
  _windowsCluster(e) {
    const t = e.windows, s = e.windows_vent, i = this._entityExists(t), n = this._entityExists(s);
    if (!i && !n)
      return c;
    const o = i && ee(this.hass, t);
    return l`
      <div slot="windows" class="map-actions map-actions-stack">
        ${i ? b(o ? {
      label: f(this.hass, "action.close_windows"),
      icon: _("mdi:window-closed"),
      disabled: this._busy,
      variant: "danger",
      onClick: () => this._run(() => St(this.hass, t))
    } : {
      label: f(this.hass, "action.open_windows"),
      icon: _("mdi:window-open"),
      disabled: this._busy,
      variant: "ok",
      onClick: () => this._run(() => Ct(this.hass, t))
    }) : c}
        ${n ? b({
      label: f(this.hass, "action.vent_windows"),
      icon: _("mdi:window-open-variant"),
      disabled: this._busy,
      onClick: () => this._run(() => U(this.hass, s))
    }) : c}
      </div>
    `;
  }
  _sunroofCluster(e) {
    const t = e.sunroof, s = e.sunroof_tilt, i = this._entityExists(t), n = this._entityExists(s);
    if (!i && !n)
      return c;
    const o = i && ee(this.hass, t);
    return l`
      <div slot="sunroof" class="map-actions">
        ${i ? b(o ? {
      label: f(this.hass, "action.close_sunroof"),
      icon: _("mdi:window-closed"),
      disabled: this._busy,
      variant: "danger",
      onClick: () => this._run(() => St(this.hass, t))
    } : {
      label: f(this.hass, "action.open_sunroof"),
      icon: _("mdi:window-open"),
      disabled: this._busy,
      variant: "ok",
      onClick: () => this._run(() => Ct(this.hass, t))
    }) : c}
        ${n ? b({
      label: f(this.hass, "action.tilt_sunroof"),
      icon: _("mdi:angle-acute"),
      disabled: this._busy,
      onClick: () => this._run(() => U(this.hass, s))
    }) : c}
      </div>
    `;
  }
  render() {
    var v;
    if (!this._config)
      return l`<ha-card
        ><div class="pad">${f(this.hass, "chrome.not_configured")}</div></ha-card
      >`;
    if (!((v = this._config.device_id) != null && v.trim()))
      return l`<ha-card
        ><div class="pad">${f(this.hass, "chrome.select_device")}</div></ha-card
      >`;
    if (!this.hass)
      return l`<ha-card
        ><div class="pad">${f(void 0, "chrome.waiting_hass")}</div></ha-card
      >`;
    const e = this._slots(), t = e.climate, s = t ? this.hass.states[t] : void 0, i = ie(this.hass, t), n = se(this.hass, t), o = _s(this.hass, t), r = (typeof (s == null ? void 0 : s.attributes.temperature_unit) == "string" ? s.attributes.temperature_unit : void 0) || (typeof (s == null ? void 0 : s.attributes.unit_of_measurement) == "string" ? s.attributes.unit_of_measurement : "°C"), h = this._hasSeats(e), a = this._hasDirectTpms(e), d = this._hasWindowsControls(e), p = this._hasBodyControls(e), u = we(this.hass, e.image), g = h || a || d || p, m = !!(s || e.quick_cool && this.hass.states[e.quick_cool] || e.quick_heat && this.hass.states[e.quick_heat]);
    return l`
      <ha-card>
        ${this._config.title ? l`<div class="header">${this._config.title}</div>` : c}
        <div class="body-pad">
          ${m ? l`
                <div class="controls-row">
                  <div class="controls-left">
                    ${s ? l`
                          ${b({
      label: i ? f(this.hass, "climate.off") : f(this.hass, "climate.on"),
      icon: _("mdi:power"),
      disabled: this._busy,
      variant: i ? "ok" : "",
      onClick: () => this._toggleClimate()
    })}
                          ${b({
      label: f(this.hass, "climate.increase_temp"),
      icon: _("mdi:plus"),
      disabled: this._busy || n === void 0,
      variant: "heat",
      onClick: () => this._nudgeTemp(1)
    })}
                          <span
                            class="setpoint-value"
                            title=${f(this.hass, "climate.setpoint")}
                            >${n !== void 0 ? `${n}${r}` : "—"}</span
                          >
                          ${b({
      label: f(this.hass, "climate.decrease_temp"),
      icon: _("mdi:minus"),
      disabled: this._busy || n === void 0,
      variant: "cool",
      onClick: () => this._nudgeTemp(-1)
    })}
                        ` : c}
                  </div>
                  <div class="controls-right">
                    ${e.quick_cool && this.hass.states[e.quick_cool] ? b({
      label: k(this.hass, "button", "quick_cool"),
      icon: _("mdi:snowflake"),
      disabled: this._busy,
      variant: "cool",
      onClick: () => this._run(
        () => U(this.hass, e.quick_cool)
      )
    }) : c}
                    ${e.quick_heat && this.hass.states[e.quick_heat] ? b({
      label: k(this.hass, "button", "quick_heat"),
      icon: _("mdi:fire"),
      disabled: this._busy,
      variant: "heat",
      onClick: () => this._run(
        () => U(this.hass, e.quick_heat)
      )
    }) : c}
                  </div>
                </div>
              ` : c}
          ${s && o !== void 0 ? l`
                <div class="current-row">
                  <span class="metric-label"
                    >${f(this.hass, "climate.current")}</span
                  >
                  <span class="metric-value">${o}${r}</span>
                </div>
              ` : c}
          ${g ? l`
                <carlinko-car-outline .src=${u}>
                  ${this._bodyActions(e)} ${this._windowsCluster(e)}
                  ${this._sunroofCluster(e)}
                  ${he.map(($) => this._seatZone($, e))}
                  ${a ? Xs.map(($) => this._wheelZone($, e)) : c}
                </carlinko-car-outline>
              ` : c}
        </div>
      </ha-card>
    `;
  }
};
I.styles = [
  Ht,
  ke,
  $e,
  C`
      ha-card {
        overflow: visible;
      }
      .controls-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .controls-left,
      .controls-right {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
      }
      .setpoint-value {
        font-weight: 600;
        font-size: 1.15rem;
        min-width: 3.25rem;
        text-align: center;
        font-variant-numeric: tabular-nums;
      }
      .current-row {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        padding: 4px 0;
      }
      .seat-chip,
      .wheel-zone {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .wheel-zone {
        align-items: flex-start;
      }
      /*
       * No backdrop-filter here: it would create a stacking context and trap
       * the open level menu behind the other seat/map regions.
       */
      .seat-chip {
        position: relative;
        align-items: center;
        gap: 3px;
        border: 1px solid var(--ck-border);
        background: var(--ck-bg);
        border-radius: 8px;
        padding: 5px 7px 4px;
      }
      .seat-chip.menu-open {
        z-index: 30;
      }
      .seat-icons {
        display: inline-flex;
        gap: 4px;
      }
      .seat-icon-wrap {
        position: relative;
      }
      .seat-icon,
      .wheel-chip {
        border: 1px solid var(--ck-border);
        background: color-mix(in srgb, var(--ck-bg) 88%, transparent);
        color: var(--ck-text);
        border-radius: 6px;
        padding: 4px 6px;
        font: inherit;
        font-size: 0.7rem;
        line-height: 1.2;
        cursor: pointer;
        white-space: nowrap;
        backdrop-filter: blur(2px);
      }
      .seat-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.7rem;
        height: 1.7rem;
        padding: 0;
        color: var(--ck-muted);
        backdrop-filter: none;
      }
      .seat-icon ha-icon {
        --mdc-icon-size: 1rem;
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
      }
      .seat-icon.heat {
        border-color: color-mix(in srgb, var(--ck-seat-heat) 45%, transparent);
        color: color-mix(
          in srgb,
          var(--ck-seat-heat) 62%,
          var(--ck-muted)
        );
      }
      .seat-icon.vent {
        border-color: color-mix(in srgb, var(--ck-seat-vent) 45%, transparent);
        color: color-mix(
          in srgb,
          var(--ck-seat-vent) 62%,
          var(--ck-muted)
        );
      }
      .seat-icon.heat.active,
      .seat-icon.heat.open {
        color: var(--ck-seat-heat);
        border-color: var(--ck-seat-heat);
        background: color-mix(in srgb, var(--ck-seat-heat) 20%, transparent);
      }
      .seat-icon.vent.active,
      .seat-icon.vent.open {
        color: var(--ck-seat-vent);
        border-color: var(--ck-seat-vent);
        background: color-mix(in srgb, var(--ck-seat-vent) 20%, transparent);
      }
      .seat-icon.open {
        box-shadow: 0 0 0 2px color-mix(in srgb, currentColor 40%, transparent);
      }
      .seat-state {
        font-size: 0.72rem;
        font-weight: 600;
        white-space: nowrap;
        line-height: 1.1;
      }
      .seat-state.off,
      .seat-state.unknown {
        color: var(--ck-muted);
        font-weight: 500;
      }
      .seat-state.heat {
        color: var(--ck-seat-heat);
      }
      .seat-state.vent {
        color: var(--ck-seat-vent);
      }
      .seat-menu {
        position: absolute;
        top: calc(100% + 6px);
        left: 0;
        z-index: 8;
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 92px;
        padding: 4px;
        border: 1px solid var(--ck-border);
        border-radius: 8px;
        background: color-mix(in srgb, var(--ck-bg) 94%, var(--ck-text) 6%);
        box-shadow: 0 8px 20px color-mix(in srgb, #000 45%, transparent);
      }
      /* Keep pointer inside the wrap while moving icon -> menu (hover open). */
      .seat-menu::before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: -8px;
        height: 8px;
      }
      .seat-menu.up::before {
        top: auto;
        bottom: -8px;
      }
      .seat-menu.up {
        top: auto;
        bottom: calc(100% + 6px);
      }
      .seat-menu.end {
        left: auto;
        right: 0;
      }
      .seat-menu.heat {
        border-color: color-mix(
          in srgb,
          var(--ck-seat-heat) 50%,
          var(--ck-border)
        );
      }
      .seat-menu.vent {
        border-color: color-mix(
          in srgb,
          var(--ck-seat-vent) 50%,
          var(--ck-border)
        );
      }
      .seat-option {
        display: block;
        width: 100%;
        border: 0;
        background: transparent;
        color: var(--ck-text);
        font: inherit;
        font-size: 0.74rem;
        text-align: left;
        padding: 5px 8px;
        border-radius: 5px;
        cursor: pointer;
        white-space: nowrap;
      }
      .seat-menu.heat .seat-option {
        color: color-mix(in srgb, var(--ck-seat-heat) 78%, var(--ck-text));
      }
      .seat-menu.vent .seat-option {
        color: color-mix(in srgb, var(--ck-seat-vent) 78%, var(--ck-text));
      }
      .seat-option.off {
        color: var(--ck-muted);
      }
      .seat-option.current {
        background: color-mix(in srgb, currentColor 18%, transparent);
        font-weight: 700;
      }
      .seat-option:hover:not(:disabled) {
        background: color-mix(in srgb, currentColor 26%, transparent);
      }
      .wheel-chip {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 4px 7px;
      }
      .wheel-chip ha-icon {
        --mdc-icon-size: 0.95rem;
        width: 0.95rem;
        height: 0.95rem;
        flex-shrink: 0;
      }
      .wheel-chip-text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0;
        line-height: 1.15;
      }
      .wheel-pressure {
        font-weight: 600;
      }
      .wheel-temp {
        color: var(--ck-muted);
        font-size: 0.65rem;
      }
      .wheel-chip.tone-ok {
        border-color: var(--ck-tyre-ok);
        color: var(--ck-tyre-ok);
      }
      .wheel-chip.tone-warn {
        border-color: var(--ck-tyre-warn);
        color: var(--ck-tyre-warn);
      }
      .wheel-chip.tone-danger {
        border-color: var(--ck-tyre-danger);
        color: var(--ck-tyre-danger);
      }
      .wheel-chip.tone-ok .wheel-temp,
      .wheel-chip.tone-warn .wheel-temp,
      .wheel-chip.tone-danger .wheel-temp {
        color: var(--ck-muted);
      }
      .seat-icon:hover:not(:disabled),
      .wheel-chip:hover {
        background: color-mix(in srgb, currentColor 14%, var(--ck-bg));
        border-color: currentColor;
      }
      .seat-icon:disabled,
      .seat-option:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .map-actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 4px;
      }
      .map-actions-stack {
        flex-direction: column;
        flex-wrap: nowrap;
        align-items: center;
      }
      .map-actions .action.icon {
        width: 2.35rem;
        height: 2.35rem;
        min-width: 2.35rem;
        background: color-mix(in srgb, var(--ck-bg) 88%, transparent);
        backdrop-filter: blur(2px);
      }
      .map-actions .action.icon:hover:not(:disabled) {
        background: color-mix(in srgb, currentColor 14%, var(--ck-bg));
        border-color: currentColor;
      }
      .map-actions .action.icon ha-icon {
        --mdc-icon-size: 1.35rem;
        width: 1.35rem;
        height: 1.35rem;
      }
      carlinko-car-outline {
        margin-top: 12px;
        max-width: 320px;
        overflow: visible;
      }
      @container ck-card (max-width: 360px) {
        .seat-chip {
          padding: 4px 5px 3px;
        }
        .seat-icon {
          width: 1.45rem;
          height: 1.45rem;
        }
        .seat-icon ha-icon {
          --mdc-icon-size: 0.85rem;
          width: 0.85rem;
          height: 0.85rem;
        }
        .seat-state {
          font-size: 0.65rem;
        }
        .seat-menu {
          min-width: 80px;
        }
        .wheel-chip {
          padding: 3px 5px;
          font-size: 0.65rem;
          gap: 4px;
        }
        .wheel-chip ha-icon {
          --mdc-icon-size: 0.85rem;
          width: 0.85rem;
          height: 0.85rem;
        }
        .wheel-temp {
          font-size: 0.6rem;
        }
        .map-actions .action.icon {
          width: 2.1rem;
          height: 2.1rem;
          min-width: 2.1rem;
        }
        .map-actions .action.icon ha-icon {
          --mdc-icon-size: 1.15rem;
          width: 1.15rem;
          height: 1.15rem;
        }
        carlinko-car-outline {
          max-width: 100%;
        }
      }
    `
];
ct([
  q({ attribute: !1 })
], I.prototype, "hass", 2);
ct([
  P()
], I.prototype, "_config", 2);
ct([
  P()
], I.prototype, "_busy", 2);
ct([
  P()
], I.prototype, "_openSeatMenu", 2);
I = ct([
  R("carlinko-cabin")
], I);
var si = Object.getOwnPropertyDescriptor, ii = (e, t, s, i) => {
  for (var n = i > 1 ? void 0 : i ? si(t, s) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = r(n) || n);
  return n;
};
let de = class extends at {
  extraSchema() {
    return [Se];
  }
};
de = ii([
  R("carlinko-cabin-editor")
], de);
window.customCards = window.customCards || [];
window.customCards.push(
  {
    type: "carlinko-overview",
    name: "CarLinko Overview",
    description: "Vehicle overview: status hotspots on the car image, visual ranges/vitals for ha-carlinko.",
    preview: !0
  },
  {
    type: "carlinko-charging",
    name: "CarLinko Charging",
    description: "SoC ring, charging status, remaining time, power, and stop charging.",
    preview: !0
  },
  {
    type: "carlinko-cabin",
    name: "CarLinko Cabin",
    description: "Climate, seats, TPMS, windows/sunroof, and body/access controls on a top-down vehicle map.",
    preview: !0
  }
);
console.info(
  "%c CARLINKO-CARD %c 0.1.8 ",
  "color:#fff;background:#0d9488;font-weight:700",
  "color:#0d9488;background:transparent;font-weight:700"
);
//# sourceMappingURL=carlinko-card.js.map
