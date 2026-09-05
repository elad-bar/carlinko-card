/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = globalThis, $t = ot.ShadowRoot && (ot.ShadyCSS === void 0 || ot.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, kt = Symbol(), Ut = /* @__PURE__ */ new WeakMap();
let ae = class {
  constructor(t, s, i) {
    if (this._$cssResult$ = !0, i !== kt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if ($t && t === void 0) {
      const i = s !== void 0 && s.length === 1;
      i && (t = Ut.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Ut.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ke = (e) => new ae(typeof e == "string" ? e : e + "", void 0, kt), k = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((i, r, n) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[n + 1], e[0]);
  return new ae(s, e, kt);
}, xe = (e, t) => {
  if ($t) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const i = document.createElement("style"), r = ot.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = s.cssText, e.appendChild(i);
  }
}, zt = $t ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const i of t.cssRules) s += i.cssText;
  return ke(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ce, defineProperty: Se, getOwnPropertyDescriptor: Ae, getOwnPropertyNames: Ee, getOwnPropertySymbols: Oe, getPrototypeOf: Te } = Object, M = globalThis, Ht = M.trustedTypes, Pe = Ht ? Ht.emptyScript : "", gt = M.reactiveElementPolyfillSupport, Z = (e, t) => e, at = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Pe : null;
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
} }, xt = (e, t) => !Ce(e, t), Bt = { attribute: !0, type: String, converter: at, reflect: !1, useDefault: !1, hasChanged: xt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), M.litPropertyMetadata ?? (M.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let I = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = Bt) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(t, i, s);
      r !== void 0 && Se(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, s, i) {
    const { get: r, set: n } = Ae(this.prototype, t) ?? { get() {
      return this[s];
    }, set(o) {
      this[s] = o;
    } };
    return { get: r, set(o) {
      const h = r == null ? void 0 : r.call(this);
      n == null || n.call(this, o), this.requestUpdate(t, h, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Bt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Z("elementProperties"))) return;
    const t = Te(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Z("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Z("properties"))) {
      const s = this.properties, i = [...Ee(s), ...Oe(s)];
      for (const r of i) this.createProperty(r, s[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const s = litPropertyMetadata.get(t);
      if (s !== void 0) for (const [i, r] of s) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, i] of this.elementProperties) {
      const r = this._$Eu(s, i);
      r !== void 0 && this._$Eh.set(r, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const s = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const r of i) s.unshift(zt(r));
    } else t !== void 0 && s.push(zt(t));
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
    return xe(t, this.constructor.elementStyles), t;
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
    var n;
    const i = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const o = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : at).toAttribute(s, i.type);
      this._$Em = t, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(t, s) {
    var n, o;
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const h = i.getPropertyOptions(r), a = typeof h.converter == "function" ? { fromAttribute: h.converter } : ((n = h.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? h.converter : at;
      this._$Em = r;
      const d = a.fromAttribute(s, h.type);
      this[r] = d ?? ((o = this._$Ej) == null ? void 0 : o.get(r)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, s, i, r = !1, n) {
    var o;
    if (t !== void 0) {
      const h = this.constructor;
      if (r === !1 && (n = this[t]), i ?? (i = h.getPropertyOptions(t)), !((i.hasChanged ?? xt)(n, s) || i.useDefault && i.reflect && n === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(h._$Eu(t, i)))) return;
      this.C(t, s, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: i, reflect: r, wrapped: n }, o) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? s ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (s = void 0), this._$AL.set(t, s)), r === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [n, o] of r) {
        const { wrapped: h } = o, a = this[n];
        h !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, o, a);
      }
    }
    let t = !1;
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s), t ? (this.willUpdate(s), (i = this._$EO) == null || i.forEach((r) => {
        var n;
        return (n = r.hostUpdate) == null ? void 0 : n.call(r);
      }), this.update(s)) : this._$EM();
    } catch (r) {
      throw t = !1, this._$EM(), r;
    }
    t && this._$AE(s);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var s;
    (s = this._$EO) == null || s.forEach((i) => {
      var r;
      return (r = i.hostUpdated) == null ? void 0 : r.call(i);
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
I.elementStyles = [], I.shadowRootOptions = { mode: "open" }, I[Z("elementProperties")] = /* @__PURE__ */ new Map(), I[Z("finalized")] = /* @__PURE__ */ new Map(), gt == null || gt({ ReactiveElement: I }), (M.reactiveElementVersions ?? (M.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const J = globalThis, jt = (e) => e, ct = J.trustedTypes, It = ct ? ct.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ce = "$lit$", P = `lit$${Math.random().toFixed(9).slice(2)}$`, le = "?" + P, Me = `<${le}>`, H = document, G = () => H.createComment(""), Y = (e) => e === null || typeof e != "object" && typeof e != "function", Ct = Array.isArray, Re = (e) => Ct(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", ft = `[ 	
\f\r]`, K = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Dt = /-->/g, qt = />/g, L = RegExp(`>|${ft}(?:([^\\s"'>=/]+)(${ft}*=${ft}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Wt = /'/g, Vt = /"/g, he = /^(?:script|style|textarea|title)$/i, Le = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), l = Le(1), B = Symbol.for("lit-noChange"), c = Symbol.for("lit-nothing"), Ft = /* @__PURE__ */ new WeakMap(), U = H.createTreeWalker(H, 129);
function de(e, t) {
  if (!Ct(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return It !== void 0 ? It.createHTML(t) : t;
}
const Ne = (e, t) => {
  const s = e.length - 1, i = [];
  let r, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = K;
  for (let h = 0; h < s; h++) {
    const a = e[h];
    let d, p, g = -1, f = 0;
    for (; f < a.length && (o.lastIndex = f, p = o.exec(a), p !== null); ) f = o.lastIndex, o === K ? p[1] === "!--" ? o = Dt : p[1] !== void 0 ? o = qt : p[2] !== void 0 ? (he.test(p[2]) && (r = RegExp("</" + p[2], "g")), o = L) : p[3] !== void 0 && (o = L) : o === L ? p[0] === ">" ? (o = r ?? K, g = -1) : p[1] === void 0 ? g = -2 : (g = o.lastIndex - p[2].length, d = p[1], o = p[3] === void 0 ? L : p[3] === '"' ? Vt : Wt) : o === Vt || o === Wt ? o = L : o === Dt || o === qt ? o = K : (o = L, r = void 0);
    const m = o === L && e[h + 1].startsWith("/>") ? " " : "";
    n += o === K ? a + Me : g >= 0 ? (i.push(d), a.slice(0, g) + ce + a.slice(g) + P + m) : a + P + (g === -2 ? h : m);
  }
  return [de(e, n + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class Q {
  constructor({ strings: t, _$litType$: s }, i) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const h = t.length - 1, a = this.parts, [d, p] = Ne(t, s);
    if (this.el = Q.createElement(d, i), U.currentNode = this.el.content, s === 2 || s === 3) {
      const g = this.el.content.firstChild;
      g.replaceWith(...g.childNodes);
    }
    for (; (r = U.nextNode()) !== null && a.length < h; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const g of r.getAttributeNames()) if (g.endsWith(ce)) {
          const f = p[o++], m = r.getAttribute(g).split(P), b = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: n, name: b[2], strings: m, ctor: b[1] === "." ? ze : b[1] === "?" ? He : b[1] === "@" ? Be : ht }), r.removeAttribute(g);
        } else g.startsWith(P) && (a.push({ type: 6, index: n }), r.removeAttribute(g));
        if (he.test(r.tagName)) {
          const g = r.textContent.split(P), f = g.length - 1;
          if (f > 0) {
            r.textContent = ct ? ct.emptyScript : "";
            for (let m = 0; m < f; m++) r.append(g[m], G()), U.nextNode(), a.push({ type: 2, index: ++n });
            r.append(g[f], G());
          }
        }
      } else if (r.nodeType === 8) if (r.data === le) a.push({ type: 2, index: n });
      else {
        let g = -1;
        for (; (g = r.data.indexOf(P, g + 1)) !== -1; ) a.push({ type: 7, index: n }), g += P.length - 1;
      }
      n++;
    }
  }
  static createElement(t, s) {
    const i = H.createElement("template");
    return i.innerHTML = t, i;
  }
}
function D(e, t, s = e, i) {
  var o, h;
  if (t === B) return t;
  let r = i !== void 0 ? (o = s._$Co) == null ? void 0 : o[i] : s._$Cl;
  const n = Y(t) ? void 0 : t._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== n && ((h = r == null ? void 0 : r._$AO) == null || h.call(r, !1), n === void 0 ? r = void 0 : (r = new n(e), r._$AT(e, s, i)), i !== void 0 ? (s._$Co ?? (s._$Co = []))[i] = r : s._$Cl = r), r !== void 0 && (t = D(e, r._$AS(e, t.values), r, i)), t;
}
class Ue {
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
    const { el: { content: s }, parts: i } = this._$AD, r = ((t == null ? void 0 : t.creationScope) ?? H).importNode(s, !0);
    U.currentNode = r;
    let n = U.nextNode(), o = 0, h = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let d;
        a.type === 2 ? d = new st(n, n.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (d = new je(n, this, t)), this._$AV.push(d), a = i[++h];
      }
      o !== (a == null ? void 0 : a.index) && (n = U.nextNode(), o++);
    }
    return U.currentNode = H, r;
  }
  p(t) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, s), s += i.strings.length - 2) : i._$AI(t[s])), s++;
  }
}
class st {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, s, i, r) {
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = i, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
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
    t = D(this, t, s), Y(t) ? t === c || t == null || t === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : t !== this._$AH && t !== B && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Re(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== c && Y(this._$AH) ? this._$AA.nextSibling.data = t : this.T(H.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: s, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Q.createElement(de(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === r) this._$AH.p(s);
    else {
      const o = new Ue(r, this), h = o.u(this.options);
      o.p(s), this.T(h), this._$AH = o;
    }
  }
  _$AC(t) {
    let s = Ft.get(t.strings);
    return s === void 0 && Ft.set(t.strings, s = new Q(t)), s;
  }
  k(t) {
    Ct(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, r = 0;
    for (const n of t) r === s.length ? s.push(i = new st(this.O(G()), this.O(G()), this, this.options)) : i = s[r], i._$AI(n), r++;
    r < s.length && (this._$AR(i && i._$AB.nextSibling, r), s.length = r);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, s); t !== this._$AB; ) {
      const r = jt(t).nextSibling;
      jt(t).remove(), t = r;
    }
  }
  setConnected(t) {
    var s;
    this._$AM === void 0 && (this._$Cv = t, (s = this._$AP) == null || s.call(this, t));
  }
}
class ht {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, i, r, n) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = t, this.name = s, this._$AM = r, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = c;
  }
  _$AI(t, s = this, i, r) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = D(this, t, s, 0), o = !Y(t) || t !== this._$AH && t !== B, o && (this._$AH = t);
    else {
      const h = t;
      let a, d;
      for (t = n[0], a = 0; a < n.length - 1; a++) d = D(this, h[i + a], s, a), d === B && (d = this._$AH[a]), o || (o = !Y(d) || d !== this._$AH[a]), d === c ? t = c : t !== c && (t += (d ?? "") + n[a + 1]), this._$AH[a] = d;
    }
    o && !r && this.j(t);
  }
  j(t) {
    t === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ze extends ht {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === c ? void 0 : t;
  }
}
class He extends ht {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== c);
  }
}
class Be extends ht {
  constructor(t, s, i, r, n) {
    super(t, s, i, r, n), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = D(this, t, s, 0) ?? c) === B) return;
    const i = this._$AH, r = t === c && i !== c || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== c && (i === c || r);
    r && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class je {
  constructor(t, s, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    D(this, t);
  }
}
const _t = J.litHtmlPolyfillSupport;
_t == null || _t(Q, st), (J.litHtmlVersions ?? (J.litHtmlVersions = [])).push("3.3.3");
const Ie = (e, t, s) => {
  const i = (s == null ? void 0 : s.renderBefore) ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const n = (s == null ? void 0 : s.renderBefore) ?? null;
    i._$litPart$ = r = new st(t.insertBefore(G(), n), n, void 0, s ?? {});
  }
  return r._$AI(e), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = globalThis;
let A = class extends I {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ie(s, this.renderRoot, this.renderOptions);
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
    return B;
  }
};
var oe;
A._$litElement$ = !0, A.finalized = !0, (oe = z.litElementHydrateSupport) == null || oe.call(z, { LitElement: A });
const mt = z.litElementPolyfillSupport;
mt == null || mt({ LitElement: A });
(z.litElementVersions ?? (z.litElementVersions = [])).push("4.2.2");
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
const De = { attribute: !0, type: String, converter: at, reflect: !1, hasChanged: xt }, qe = (e = De, t, s) => {
  const { kind: i, metadata: r } = s;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(s.name, e), i === "accessor") {
    const { name: o } = s;
    return { set(h) {
      const a = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(o, a, e, !0, h);
    }, init(h) {
      return h !== void 0 && this.C(o, void 0, e, h), h;
    } };
  }
  if (i === "setter") {
    const { name: o } = s;
    return function(h) {
      const a = this[o];
      t.call(this, h), this.requestUpdate(o, a, e, !0, h);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function j(e) {
  return (t, s) => typeof s == "object" ? qe(e, t, s) : ((i, r, n) => {
    const o = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, i), o ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function O(e) {
  return j({ ...e, state: !0, attribute: !1 });
}
const We = {
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
}, Ve = {
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
}, Fe = {
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
}, St = "carlinko";
let Kt = !1, nt;
function Ke(e) {
  const [t, s] = e.split(".", 2), i = We[t];
  return (i == null ? void 0 : i[s]) ?? e;
}
function ue(e, t) {
  var i;
  const s = (i = e == null ? void 0 : e.localize) == null ? void 0 : i.call(e, t);
  if (!(typeof s != "string" || !s.trim()) && !(s === t || s.startsWith("component.carlinko.")))
    return s;
}
function u(e, t) {
  return Ke(t);
}
function w(e, t, s) {
  var n;
  const i = `component.${St}.entity.${t}.${s}.name`, r = ue(e, i);
  return r || (((n = Ve[t]) == null ? void 0 : n[s]) ?? s);
}
function At(e, t, s, i) {
  var h, a;
  if (!i)
    return "—";
  const r = i.toLowerCase(), n = `component.${St}.entity.${t}.${s}.state.${r}`, o = ue(e, n);
  return o || (((a = (h = Fe[t]) == null ? void 0 : h[s]) == null ? void 0 : a[r]) ?? i);
}
function Ze(e, t) {
  const s = u(e, "status.hv_prefix"), i = At(
    e,
    "sensor",
    "hv_state",
    t || "unknown"
  );
  return `${s} ${i}`;
}
async function Et(e) {
  return !(e != null && e.loadBackendTranslation) || Kt ? !1 : (nt || (nt = e.loadBackendTranslation("entity", St).then(() => (Kt = !0, !0)).catch((t) => (console.warn("carlinko-card: failed to load entity translations", t), nt = void 0, !1))), nt);
}
const Zt = "carlinko";
function Je(e, t) {
  if (e.translation_key === t)
    return !0;
  const s = e.unique_id;
  if (s && (s === t || s.endsWith(`_${t}`) || s.startsWith("carlinko_") && s.endsWith(`_${t}`)))
    return !0;
  const i = e.entity_id.split(".", 2)[1] ?? "";
  return i === t || i.endsWith(`_${t}`);
}
function Ge(e, t) {
  return t === "defrost" || t.endsWith("_left") || t.endsWith("_right") ? [e, "switch", "binary_sensor"] : [e];
}
function Ye(e, t) {
  return !!(t && e.states[t]);
}
function Qe(e) {
  return !!(e.disabled_by || e.hidden_by || e.hidden);
}
function Xe(e, t, s, i) {
  const r = e.entities;
  if (!r)
    return;
  const n = [];
  for (const a of Object.values(r)) {
    if (!(a != null && a.entity_id) || a.device_id !== t || Qe(a))
      continue;
    const d = a.entity_id.split(".", 1)[0];
    i.includes(d) && Je(a, s) && n.push(a);
  }
  if (n.length === 0)
    return;
  const o = [...n].sort((a, d) => {
    const p = a.platform === Zt ? 0 : 1, g = d.platform === Zt ? 0 : 1;
    return p - g;
  });
  return (o.find((a) => Ye(e, a.entity_id)) ?? o[0]).entity_id;
}
function ts(e, t, s) {
  var o, h;
  if (!e)
    return;
  const i = (o = t.entities) == null ? void 0 : o[s.slot];
  if (i)
    return i;
  if (s.slot === "image" && t.image_entity)
    return t.image_entity;
  const r = (h = t.device_id) == null ? void 0 : h.trim();
  if (!r)
    return;
  const n = [s.key, ...s.fallbackKeys ?? []];
  for (const a of n) {
    const d = Ge(s.domain, a), p = Xe(e, r, a, d);
    if (p)
      return p;
  }
}
function es(e, t, s) {
  const i = {};
  for (const r of s)
    i[r.slot] = ts(e, t, r);
  return i;
}
function Ot(e, t, s) {
  if (e === t)
    return !1;
  if (!e || !t)
    return !0;
  for (const i of s)
    if (i && e.states[i] !== t.states[i])
      return !0;
  return !1;
}
class Tt {
  invalidate() {
    this._map = void 0, this._deviceId = void 0, this._imageEntity = void 0, this._entitiesJson = void 0, this._entitiesRef = void 0;
  }
  /** Last resolved map, if any (for shouldUpdate without re-resolve). */
  peek() {
    return this._map;
  }
  get(t, s, i) {
    const r = s.device_id ?? "", n = s.image_entity ?? "", o = JSON.stringify(s.entities ?? null), h = t == null ? void 0 : t.entities;
    return this._map && this._deviceId === r && this._imageEntity === n && this._entitiesJson === o && this._entitiesRef === h ? this._map : (this._map = es(t, s, i), this._deviceId = r, this._imageEntity = n, this._entitiesJson = o, this._entitiesRef = h, this._map);
  }
}
const ss = [
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
], is = [
  { slot: "battery", key: "battery", domain: "sensor" },
  { slot: "charging", key: "charging", domain: "binary_sensor" },
  { slot: "charge_state", key: "charge_state", domain: "sensor" },
  { slot: "charge_mode", key: "charge_mode", domain: "sensor" },
  { slot: "charge_remaining", key: "charge_remaining", domain: "sensor" },
  { slot: "charge_power", key: "charge_power", domain: "sensor" },
  { slot: "charge_stop", key: "charge_stop", domain: "button" }
], rs = [
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
function F(e, t) {
  if (!(!e || !t))
    return e.states[t];
}
function $(e, t) {
  var s;
  return (s = F(e, t)) == null ? void 0 : s.state;
}
function lt(e, t) {
  const s = $(e, t);
  if (s === void 0 || s === "unknown" || s === "unavailable")
    return;
  const i = Number(s);
  return Number.isFinite(i) ? i : void 0;
}
function X(e, t) {
  const s = $(e, t);
  return s === "on" || s === "open" || s === "unlocked";
}
function pe(e, t) {
  const s = $(e, t);
  return s === "ac" || s === "dc";
}
function ns(e, t) {
  const s = F(e, t);
  if (!s)
    return !1;
  const i = s.state === "on";
  return s.attributes.device_class === "problem" ? i : !i;
}
function ge(e, t, s) {
  return ns(e, t) ? "danger" : $(e, s) === "check_tyres" ? "warn" : "ok";
}
function S(e, t, s = "—") {
  const i = F(e, t);
  if (!i || i.state === "unknown" || i.state === "unavailable")
    return s;
  const r = i.attributes.unit_of_measurement;
  return r ? `${i.state} ${r}` : String(i.state);
}
function os(e, t, s = "—") {
  const i = lt(e, t);
  if (i === void 0 || i < 0)
    return s;
  const r = Math.round(i), n = Math.floor(r / 60), o = r % 60;
  return n <= 0 ? `${o}m` : o <= 0 ? `${n}h` : `${n}h ${o}m`;
}
function vt(e, t) {
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
function fe(e, t) {
  const s = F(e, t);
  if (!s)
    return;
  const i = s.attributes.entity_picture;
  if (typeof i == "string" && i)
    return vt(e, i);
  const r = s.attributes.access_token;
  return typeof r == "string" && r ? vt(
    e,
    `/api/image_proxy/${t}?token=${encodeURIComponent(r)}`
  ) : vt(e, `/api/image_proxy/${t}`);
}
async function C(e, t, s, i, r = {}) {
  await e.callService(t, s, { ...r, entity_id: i });
}
async function as(e, t) {
  await C(e, "lock", "lock", t);
}
async function cs(e, t) {
  await C(e, "lock", "unlock", t);
}
async function Jt(e, t) {
  const s = t.split(".", 1)[0];
  await C(e, s, "turn_on", t);
}
async function Gt(e, t) {
  const s = t.split(".", 1)[0];
  await C(e, s, "turn_off", t);
}
async function ls(e, t) {
  const s = t.split(".", 1)[0];
  await C(e, s, "toggle", t);
}
async function bt(e, t) {
  await C(e, "cover", "open_cover", t);
}
async function yt(e, t) {
  await C(e, "cover", "close_cover", t);
}
function Yt(e, t) {
  const s = $(e, t);
  return s === "open" || s === "opening";
}
async function N(e, t) {
  await C(e, "button", "press", t);
}
function it(e, t, s) {
  const i = F(e, t);
  if (!i)
    return;
  const r = i.attributes[s];
  if (r == null)
    return;
  const n = Number(r);
  return Number.isFinite(n) ? n : void 0;
}
function Qt(e, t) {
  return it(e, t, "temperature");
}
function hs(e, t) {
  return it(e, t, "current_temperature");
}
function ds(e, t) {
  return it(e, t, "target_temp_step") ?? 1;
}
function us(e, t) {
  return it(e, t, "min_temp") ?? 16;
}
function ps(e, t) {
  return it(e, t, "max_temp") ?? 30;
}
function Xt(e, t) {
  const s = $(e, t);
  return s === "cool" || s === "heat" || s === "heat_cool" || s === "auto" || s === "fan_only" || s === "dry" || s === "on";
}
async function gs(e, t, s) {
  await C(e, "climate", "set_hvac_mode", t, {
    hvac_mode: s
  });
}
async function fs(e, t, s) {
  await C(e, "climate", "set_temperature", t, {
    temperature: s
  });
}
async function _s(e, t, s) {
  await C(e, "select", "select_option", t, {
    option: s
  });
}
function ms(e, t) {
  const s = F(e, t), i = s == null ? void 0 : s.attributes.options;
  return Array.isArray(i) ? i.map(String) : [];
}
function y(e, t) {
  e.dispatchEvent(
    new CustomEvent("hass-more-info", {
      bubbles: !0,
      composed: !0,
      detail: { entityId: t }
    })
  );
}
const Pt = k`
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
`, _e = k`
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
`, me = k`
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
`, vs = k`
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
`, bs = k`
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
`, ys = k`
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
`, ws = k`
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
`, $s = k`
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
function te(e, t, s, i, r) {
  if (!t || !i || !t.states[i])
    return c;
  let n = S(t, i);
  return l`
    <button
      type="button"
      class="metric"
      @click=${() => y(e, i)}
    >
      <span class="metric-label">${s}</span>
      <span class="metric-value">${n}</span>
    </button>
  `;
}
function v(e) {
  const t = e.variant || "", s = !!(e.icon && e.showLabel), i = !!(e.icon && !e.showLabel), r = [
    "action",
    t,
    i ? "icon" : "",
    s ? "with-icon" : ""
  ].filter(Boolean).join(" ");
  return l`
    <button
      type="button"
      class=${r}
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
const ks = {
  signal: "mdi:car-wireless",
  hv: "mdi:car-electric",
  tyre: "mdi:tire"
};
function wt(e) {
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
      ${_(ks[e.icon])}
    </button>
  `;
}
function ee(e) {
  const {
    percent: t,
    primary: s,
    secondary: i,
    meta: r,
    onPercentClick: n,
    onSecondaryClick: o,
    onMetaClick: h
  } = e;
  if (t === void 0 && !s && !i && !r)
    return c;
  const a = e.tone ?? "ok", d = t === void 0 || Number.isNaN(t) ? void 0 : Math.max(0, Math.min(100, t)), p = d !== void 0 ? `${Math.round(d)}%` : void 0, g = l`
    <div
      class="hlevel-bar-wrap"
      aria-hidden=${d === void 0 ? "true" : "false"}
    >
      ${d !== void 0 ? l`<div class="hlevel-bar" style="width:${d}%"></div>` : c}
    </div>
  `, f = n && (p !== void 0 || d !== void 0) ? l`<button
          type="button"
          class="hlevel-percent"
          aria-label=${p ?? s ?? "level"}
          @click=${n}
        >
          ${p !== void 0 ? l`<div class="hlevel-pct">${p}</div>` : c}
          ${g}
        </button>` : l`
          ${p !== void 0 ? l`<div class="hlevel-pct">${p}</div>` : c}
          ${g}
        `, m = i ? o ? l`<button
          type="button"
          class="hlevel-secondary"
          @click=${o}
        >
          ${i}
        </button>` : l`<span class="hlevel-secondary">${i}</span>` : c, b = r ? h ? l`<button type="button" class="hlevel-meta" @click=${h}>
          ${r}
        </button>` : l`<span class="hlevel-meta">${r}</span>` : c;
  return l`
    <div class="hlevel tone-${a}">
      ${s ? l`<div class="hlevel-primary">${s}</div>` : c}
      ${f}
      ${i || r ? l`<div class="hlevel-details">${m}${b}</div>` : c}
    </div>
  `;
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xs = { ATTRIBUTE: 1 }, Cs = (e) => (...t) => ({ _$litDirective$: e, values: t });
let Ss = class {
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
const ve = "important", As = " !" + ve, Es = Cs(class extends Ss {
  constructor(e) {
    var t;
    if (super(e), e.type !== xs.ATTRIBUTE || e.name !== "style" || ((t = e.strings) == null ? void 0 : t.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
      const r = t[i];
      if (r != null) {
        this.ft.add(i);
        const n = typeof r == "string" && r.endsWith(As);
        i.includes("-") || n ? s.setProperty(i, n ? r.slice(0, -11) : r, n ? ve : "") : s[i] = r;
      }
    }
    return B;
  }
});
function Os(e) {
  const { percent: t, onClick: s } = e, i = e.socLabel ?? "SoC";
  if (t === void 0 && !s)
    return c;
  const r = t === void 0 || Number.isNaN(t) ? void 0 : Math.max(0, Math.min(100, t)), n = r === void 0 ? 0 : Math.round(r), o = r !== void 0 ? `${n}% ${i}` : i, h = r !== void 0 ? Es({ "--ck-soc-pct": `${n}%` }) : c, a = l`
    <div
      class="soc-ring-meter ${r === void 0 ? "empty" : ""}"
      style=${h}
      aria-hidden="true"
    ></div>
    <div class="soc-ring-center">
      ${r !== void 0 ? l`<span class="soc-ring-pct">${n}%</span>` : l`<span class="soc-ring-pct muted">—</span>`}
      <span class="soc-ring-label">${i}</span>
    </div>
  `;
  return s ? l`
      <button
        type="button"
        class="soc-ring"
        aria-label=${o}
        @click=${s}
      >
        ${a}
      </button>
    ` : l`<div class="soc-ring">${a}</div>`;
}
function Ts(e) {
  const t = e.charging ?? !1, s = e.batteryLabel ?? "Battery", i = e.chargingLabel ?? "charging", r = e.percent === void 0 || Number.isNaN(e.percent) ? void 0 : Math.max(0, Math.min(100, e.percent));
  return l`
    <div
      class="charge-power ${t ? "is-charging" : "is-idle"}"
      role="img"
      aria-label=${t ? `${i}${r !== void 0 ? `, ${s} ${Math.round(r)}%` : ""}` : `${i}: off`}
    >
      <span class="charge-power-bolt"
        >${_("mdi:lightning-bolt")}</span
      >
    </div>
  `;
}
var Ps = Object.defineProperty, Ms = Object.getOwnPropertyDescriptor, dt = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? Ms(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (i ? o(t, s, r) : o(r)) || r);
  return i && r && Ps(t, s, r), r;
};
let q = class extends A {
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
q.styles = k`
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
dt([
  j({ type: String })
], q.prototype, "src", 2);
dt([
  O()
], q.prototype, "_imageReady", 2);
dt([
  O()
], q.prototype, "_imageFailed", 2);
q = dt([
  R("carlinko-car-outline")
], q);
var Rs = Object.defineProperty, Ls = Object.getOwnPropertyDescriptor, Mt = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? Ls(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (i ? o(t, s, r) : o(r)) || r);
  return i && r && Rs(t, s, r), r;
};
let tt = class extends A {
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
tt.styles = k`
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
Mt([
  j({ type: String })
], tt.prototype, "src", 2);
Mt([
  O()
], tt.prototype, "_imageReady", 2);
tt = Mt([
  R("carlinko-vehicle-stage")
], tt);
var Ns = Object.defineProperty, Us = Object.getOwnPropertyDescriptor, Rt = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? Us(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (i ? o(t, s, r) : o(r)) || r);
  return i && r && Ns(t, s, r), r;
};
function zs(e, t) {
  const s = (t || "unknown").toLowerCase(), i = Ze(e, s);
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
let et = class extends A {
  constructor() {
    super(...arguments), this._slotCache = new Tt();
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
      title: u(void 0, "stub.overview")
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
      return s ? Ot(t, this.hass, Object.values(s)) : !0;
    }
    return !0;
  }
  updated(e) {
    e.has("hass") && this.hass && Et(this.hass).then((t) => {
      t && this.requestUpdate();
    });
  }
  _slots() {
    return this._config ? this._slotCache.get(this.hass, this._config, ss) : {};
  }
  render() {
    var Nt;
    if (!this._config)
      return l`<ha-card
        ><div class="pad">${u(this.hass, "chrome.not_configured")}</div></ha-card
      >`;
    if (!((Nt = this._config.device_id) != null && Nt.trim()))
      return l`<ha-card
        ><div class="pad">${u(this.hass, "chrome.select_device")}</div></ha-card
      >`;
    if (!this.hass)
      return l`<ha-card
        ><div class="pad">${u(void 0, "chrome.waiting_hass")}</div></ha-card
      >`;
    const e = this._slots(), t = fe(this.hass, e.image), s = X(this.hass, e.engine), i = X(this.hass, e.online), r = lt(this.hass, e.battery), n = lt(this.hass, e.fuel), o = e.odometer && this.hass.states[e.odometer] ? S(this.hass, e.odometer) : void 0, h = e.total_range && this.hass.states[e.total_range] ? S(this.hass, e.total_range) : void 0, a = s && e.engine && e.speed && this.hass.states[e.speed] ? S(this.hass, e.speed) : void 0, d = e.range && this.hass.states[e.range] ? S(this.hass, e.range) : void 0, p = e.fuel_range && this.hass.states[e.fuel_range] ? S(this.hass, e.fuel_range) : void 0, g = $(this.hass, e.hv_state), f = e.hv_state ? zs(this.hass, g) : void 0, m = e.consumption && this.hass.states[e.consumption] ? S(this.hass, e.consumption) : void 0, b = e.fuel_consumption && this.hass.states[e.fuel_consumption] ? S(this.hass, e.fuel_consumption) : void 0, E = !!(o || h || a), x = e.tyres_ok || e.tyre_status ? ge(this.hass, e.tyres_ok, e.tyre_status) : void 0, $e = x === "danger" ? w(this.hass, "binary_sensor", "tyres_ok") : x === "warn" ? At(this.hass, "sensor", "tyre_status", "check_tyres") : u(this.hass, "status.tyres_ok"), Lt = e.tyres_ok ?? e.tyre_status;
    return l`
      <ha-card>
        ${this._config.title ? l`<div class="header">${this._config.title}</div>` : c}
        <div class="body">
          <div class="hero">
            <carlinko-vehicle-stage .src=${t}>
              ${E ? l`<div slot="headline" class="headline">
                    ${o ? l`<button
                          type="button"
                          class="odo"
                          @click=${() => y(this, e.odometer)}
                        >
                          <span class="odo-label"
                            >${w(
      this.hass,
      "sensor",
      "odometer"
    )}</span
                          >
                          <span class="odo-value">${o}</span>
                        </button>` : c}
                    ${h ? l`<button
                          type="button"
                          class="range-total"
                          @click=${() => y(this, e.total_range)}
                        >
                          <span class="range-label"
                            >${w(
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
                          @click=${() => y(this, e.speed)}
                        >
                          <span class="speed-label"
                            >${w(this.hass, "sensor", "speed")}</span
                          >
                          <span class="speed-value">${a}</span>
                        </button>` : c}
                  </div>` : c}
              ${e.online ? l`<div slot="online">
                    ${wt({
      icon: "signal",
      label: i ? w(this.hass, "binary_sensor", "online") : u(this.hass, "status.offline"),
      tone: i ? "ok" : "muted",
      onClick: () => y(this, e.online)
    })}
                  </div>` : c}
              ${e.hv_state && f ? l`<div slot="hv">
                    ${wt({
      icon: "hv",
      label: f.label,
      tone: f.tone,
      onClick: () => y(this, e.hv_state)
    })}
                  </div>` : c}
              ${x && Lt ? l`<div slot="tyres">
                    ${wt({
      icon: "tyre",
      label: $e,
      tone: x,
      onClick: () => y(this, Lt)
    })}
                  </div>` : c}
            </carlinko-vehicle-stage>
          </div>
          <div class="vitals">
            <div class="levels">
              ${ee({
      percent: r,
      primary: r !== void 0 || d ? u(this.hass, "status.soc") : void 0,
      secondary: d,
      meta: m,
      tone: "ok",
      onPercentClick: e.battery && this.hass.states[e.battery] ? () => y(this, e.battery) : void 0,
      onSecondaryClick: e.range && this.hass.states[e.range] ? () => y(this, e.range) : void 0,
      onMetaClick: e.consumption && this.hass.states[e.consumption] ? () => y(this, e.consumption) : void 0
    })}
              ${ee({
      percent: n,
      primary: n !== void 0 || p ? w(this.hass, "sensor", "fuel") : void 0,
      secondary: p,
      meta: b,
      tone: "info",
      onPercentClick: e.fuel && this.hass.states[e.fuel] ? () => y(this, e.fuel) : void 0,
      onSecondaryClick: e.fuel_range && this.hass.states[e.fuel_range] ? () => y(this, e.fuel_range) : void 0,
      onMetaClick: e.fuel_consumption && this.hass.states[e.fuel_consumption] ? () => y(this, e.fuel_consumption) : void 0
    })}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
et.styles = [
  Pt,
  vs,
  bs,
  k`
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
Rt([
  j({ attribute: !1 })
], et.prototype, "hass", 2);
Rt([
  O()
], et.prototype, "_config", 2);
et = Rt([
  R("carlinko-overview")
], et);
var Hs = Object.defineProperty, be = (e, t, s, i) => {
  for (var r = void 0, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = o(t, s, r) || r);
  return r && Hs(t, s, r), r;
};
const Bs = {
  name: "image_entity",
  selector: {
    entity: {
      domain: "image",
      filter: { integration: "carlinko" }
    }
  }
}, ye = {
  name: "image_entity",
  selector: {
    entity: {
      domain: "image",
      filter: { integration: "carlinko" }
    }
  }
};
class rt extends A {
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
        label: u(this.hass, "editor.device"),
        selector: {
          device: {
            filter: { integration: "carlinko" }
          }
        }
      },
      {
        name: "title",
        label: u(this.hass, "editor.title"),
        selector: { text: {} }
      },
      ...this.extraSchema().map((t) => {
        if (t.name !== "image_entity" || t.label)
          return t;
        const s = t === ye;
        return {
          ...t,
          label: u(
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
be([
  j({ attribute: !1 })
], rt.prototype, "hass");
be([
  O()
], rt.prototype, "_config");
var js = Object.getOwnPropertyDescriptor, Is = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? js(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = o(r) || r);
  return r;
};
let se = class extends rt {
  extraSchema() {
    return [Bs];
  }
};
se = Is([
  R("carlinko-overview-editor")
], se);
async function we(e, t, s, i) {
  if (e())
    return !1;
  t(!0);
  try {
    return await s(), !0;
  } catch (r) {
    return i == null || i(r), !1;
  } finally {
    t(!1);
  }
}
var Ds = Object.defineProperty, qs = Object.getOwnPropertyDescriptor, ut = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? qs(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (i ? o(t, s, r) : o(r)) || r);
  return i && r && Ds(t, s, r), r;
};
let W = class extends A {
  constructor() {
    super(...arguments), this._busy = !1, this._slotCache = new Tt();
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
      title: u(void 0, "stub.charging")
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
      return s ? Ot(t, this.hass, Object.values(s)) : !0;
    }
    return !0;
  }
  updated(e) {
    e.has("hass") && this.hass && Et(this.hass).then((t) => {
      t && this.requestUpdate();
    });
  }
  _slots() {
    return this._config ? this._slotCache.get(this.hass, this._config, is) : {};
  }
  _run(e) {
    this.hass && we(
      () => this._busy,
      (t) => {
        this._busy = t;
      },
      e,
      (t) => console.error("carlinko-charging action failed", t)
    );
  }
  _metaRow(e, t, s, i) {
    var r;
    return !s || !((r = this.hass) != null && r.states[s]) ? c : l`
      <button
        type="button"
        class="charge-meta-row"
        @click=${() => y(this, s)}
      >
        <span class="charge-meta-label">${e}:</span>
        <span class="charge-meta-value${i ? ` ${i}` : ""}"
          >${t}</span
        >
      </button>
    `;
  }
  render() {
    var x;
    if (!this._config)
      return l`<ha-card
        ><div class="pad">${u(this.hass, "chrome.not_configured")}</div></ha-card
      >`;
    if (!((x = this._config.device_id) != null && x.trim()))
      return l`<ha-card
        ><div class="pad">${u(this.hass, "chrome.select_device")}</div></ha-card
      >`;
    if (!this.hass)
      return l`<ha-card
        ><div class="pad">${u(void 0, "chrome.waiting_hass")}</div></ha-card
      >`;
    const e = this._slots(), t = X(this.hass, e.charging), s = lt(this.hass, e.battery), i = !!(e.battery && this.hass.states[e.battery]), r = !!(e.charging && this.hass.states[e.charging]), n = !!(e.charge_power && this.hass.states[e.charge_power]), o = !!(e.charge_remaining && this.hass.states[e.charge_remaining]), h = e.charge_state && this.hass.states[e.charge_state] || e.charge_mode && this.hass.states[e.charge_mode], a = !!(e.charge_stop && this.hass.states[e.charge_stop]) && pe(this.hass, e.charge_mode), d = i || r || n || o, p = t ? w(this.hass, "binary_sensor", "charging") : u(this.hass, "status.not_charging"), g = t ? "ok" : "muted", f = S(this.hass, e.charge_power), m = os(this.hass, e.charge_remaining), b = w(this.hass, "sensor", "battery"), E = u(this.hass, "status.soc");
    return l`
      <ha-card>
        ${this._config.title ? l`<div class="header">${this._config.title}</div>` : c}
        <div class="body-pad">
          ${d ? l`
                <div class="charge-hero">
                  ${i ? Os({
      percent: s,
      socLabel: E,
      onClick: () => y(this, e.battery)
    }) : c}
                  ${i ? l`<div class="charge-hero-link" aria-hidden="true"></div>
                        ${Ts({
      percent: s,
      charging: t,
      batteryLabel: b,
      chargingLabel: w(
        this.hass,
        "binary_sensor",
        "charging"
      )
    })}` : c}
                  <div class="charge-hero-meta">
                    ${r ? this._metaRow(
      u(this.hass, "status.plugged"),
      p,
      e.charging,
      g
    ) : c}
                    ${n ? this._metaRow(
      u(this.hass, "status.power"),
      f,
      e.charge_power
    ) : c}
                    ${o ? this._metaRow(
      u(this.hass, "status.time"),
      m,
      e.charge_remaining
    ) : c}
                  </div>
                </div>
              ` : c}
          ${h ? l`
                <div class="charge-secondary">
                  ${te(
      this,
      this.hass,
      w(this.hass, "sensor", "charge_state"),
      e.charge_state
    )}
                  ${te(
      this,
      this.hass,
      u(this.hass, "status.mode"),
      e.charge_mode
    )}
                </div>
              ` : c}
        </div>
        ${a ? l`
              <div class="actions">
                ${v({
      label: w(this.hass, "button", "charge_stop"),
      icon: _("mdi:stop"),
      showLabel: !0,
      disabled: this._busy,
      variant: "danger",
      onClick: () => this._run(() => N(this.hass, e.charge_stop))
    })}
              </div>
            ` : c}
      </ha-card>
    `;
  }
};
W.styles = [
  Pt,
  _e,
  me,
  ys,
  ws,
  $s
];
ut([
  j({ attribute: !1 })
], W.prototype, "hass", 2);
ut([
  O()
], W.prototype, "_config", 2);
ut([
  O()
], W.prototype, "_busy", 2);
W = ut([
  R("carlinko-charging")
], W);
var Ws = Object.getOwnPropertyDescriptor, Vs = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? Ws(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = o(r) || r);
  return r;
};
let ie = class extends rt {
};
ie = Vs([
  R("carlinko-charging-editor")
], ie);
var Fs = Object.defineProperty, Ks = Object.getOwnPropertyDescriptor, pt = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? Ks(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (i ? o(t, s, r) : o(r)) || r);
  return i && r && Fs(t, s, r), r;
};
const re = [
  { slot: "seat-fl", heat: "seat_heat_l", vent: "seat_vent_l" },
  { slot: "seat-fr", heat: "seat_heat_r", vent: "seat_vent_r" },
  { slot: "seat-rl", heat: "seat_heat_lr", vent: "seat_vent_lr" },
  { slot: "seat-rr", heat: "seat_heat_rr", vent: "seat_vent_rr" }
], Zs = [
  { slot: "wheel-fl", pressure: "tyre_fl", temp: "tyre_fl_temp" },
  { slot: "wheel-fr", pressure: "tyre_fr", temp: "tyre_fr_temp" },
  { slot: "wheel-rl", pressure: "tyre_rl", temp: "tyre_rl_temp" },
  { slot: "wheel-rr", pressure: "tyre_rr", temp: "tyre_rr_temp" }
], Js = ["tyre_fl", "tyre_fr", "tyre_rl", "tyre_rr"];
function Gs(e) {
  return e.split(".", 1)[0];
}
let V = class extends A {
  constructor() {
    super(...arguments), this._busy = !1, this._slotCache = new Tt();
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
      title: u(void 0, "stub.cabin")
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
      return s ? Ot(t, this.hass, Object.values(s)) : !0;
    }
    return !0;
  }
  updated(e) {
    e.has("hass") && this.hass && Et(this.hass).then((t) => {
      t && this.requestUpdate();
    });
  }
  _slots() {
    return this._config ? this._slotCache.get(this.hass, this._config, rs) : {};
  }
  _run(e) {
    this.hass && we(
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
    const s = Qt(this.hass, t);
    if (s === void 0)
      return;
    const i = ds(this.hass, t), r = us(this.hass, t), n = ps(this.hass, t), o = Math.min(n, Math.max(r, s + e * i));
    this._run(() => fs(this.hass, t, o));
  }
  _toggleClimate() {
    const e = this._slots().climate;
    if (!this.hass || !e)
      return;
    const t = Xt(this.hass, e);
    this._run(
      () => gs(this.hass, e, t ? "off" : "cool")
    );
  }
  _cycleSelect(e) {
    if (!this.hass)
      return;
    const t = ms(this.hass, e);
    if (t.length === 0)
      return;
    const s = $(this.hass, e) ?? t[0], i = t.indexOf(s), r = t[(i + 1) % t.length];
    this._run(() => _s(this.hass, e, r));
  }
  _toggleBinary(e) {
    if (!this.hass)
      return;
    const t = $(this.hass, e) === "on";
    this._run(
      () => t ? Gt(this.hass, e) : Jt(this.hass, e)
    );
  }
  _hasDirectTpms(e) {
    return this.hass ? Js.some((t) => {
      const s = e[t];
      return !!(s && this.hass.states[s]);
    }) : !1;
  }
  _hasSeats(e) {
    return this.hass ? re.some((t) => {
      const s = t.heat ? e[t.heat] : void 0, i = t.vent ? e[t.vent] : void 0;
      return s && this.hass.states[s] || i && this.hass.states[i];
    }) : !1;
  }
  _seatControl(e, t, s) {
    var d;
    if (!e || !t || !((d = this.hass) != null && d.states[e]))
      return c;
    const i = $(this.hass, e), r = Gs(e), n = s === "H" ? "heat" : "vent", o = s === "H" ? u(this.hass, "status.heat") : u(this.hass, "status.vent"), h = At(this.hass, "select", t, i), a = r === "select" ? () => this._cycleSelect(e) : () => this._toggleBinary(e);
    return l`
      <button
        type="button"
        class="seat-btn ${n}"
        ?disabled=${this._busy}
        title=${`${o}: ${h}`}
        aria-label=${`${o}: ${h}`}
        @click=${a}
      >
        ${_(s === "H" ? "mdi:car-seat-heater" : "mdi:car-seat-cooler")}
        <span class="seat-state">${h}</span>
      </button>
    `;
  }
  _seatZone(e, t) {
    var r, n;
    const s = e.heat ? t[e.heat] : void 0, i = e.vent ? t[e.vent] : void 0;
    return (!s || !((r = this.hass) != null && r.states[s])) && (!i || !((n = this.hass) != null && n.states[i])) ? c : l`
      <div slot=${e.slot} class="seat-zone">
        ${this._seatControl(s, e.heat, "H")}
        ${this._seatControl(i, e.vent, "V")}
      </div>
    `;
  }
  _sensorBtn(e, t) {
    if (!this.hass || !e || !this.hass.states[e])
      return c;
    const s = S(this.hass, e);
    return l`
      <button
        type="button"
        class=${t}
        @click=${() => y(this, e)}
      >
        ${s}
      </button>
    `;
  }
  _wheelZone(e, t) {
    var h, a;
    const s = t[e.pressure], i = t[e.temp], r = !!(s && ((h = this.hass) != null && h.states[s])), n = !!(i && ((a = this.hass) != null && a.states[i]));
    if (!r && !n)
      return c;
    const o = ge(this.hass, t.tyres_ok, t.tyre_status);
    return l`
      <div slot=${e.slot} class="wheel-zone tone-${o}">
        ${this._sensorBtn(s, "wheel-pressure")}
        ${this._sensorBtn(i, "wheel-temp")}
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
    return pe(this.hass, e.charge_mode);
  }
  _hasBodyControls(e) {
    return this._entityExists(e.lock) || this._entityExists(e.engine) || this._entityExists(e.find) || this._entityExists(e.defog) || this._entityExists(e.charge_stop) && this._chargerConnected(e) || this._entityExists(e.trunk);
  }
  _bodyActions(e) {
    const t = e.lock, s = e.engine, i = e.find, r = e.defog, n = e.charge_stop, o = e.trunk, h = this._chargerConnected(e), a = this._entityExists(n) && h, d = this._entityExists(s), p = this._entityExists(i);
    if (!t && !d && !p && !r && !a && !o)
      return c;
    const f = $(this.hass, t) === "locked", m = X(this.hass, s), b = X(this.hass, r), E = !!(r != null && r.startsWith("binary_sensor.")), x = $(this.hass, o) === "open";
    return l`
      ${d || p ? l`<div slot="engine" class="map-actions">
            ${d ? v({
      label: m ? u(this.hass, "action.engine_off") : u(this.hass, "action.engine_on"),
      icon: _("mdi:engine"),
      disabled: this._busy,
      variant: m ? "ok" : "danger",
      onClick: () => this._run(
        () => m ? Gt(this.hass, s) : Jt(this.hass, s)
      )
    }) : c}
            ${p ? v({
      label: w(this.hass, "button", "find"),
      icon: _("mdi:map-marker"),
      disabled: this._busy,
      onClick: () => this._run(() => N(this.hass, i))
    }) : c}
          </div>` : c}
      ${this._entityExists(t) ? l`<div slot="lock" class="map-actions">
            ${v({
      label: f ? u(this.hass, "action.unlock_doors") : u(this.hass, "action.lock_doors"),
      icon: _(f ? "mdi:car-door-lock" : "mdi:lock-open-variant"),
      disabled: this._busy,
      variant: f ? "ok" : "danger",
      onClick: () => this._run(
        () => f ? cs(this.hass, t) : as(this.hass, t)
      )
    })}
          </div>` : c}
      ${this._entityExists(r) ? l`<div slot="defog" class="map-actions">
            ${v({
      label: b ? u(this.hass, "action.defog_off") : u(this.hass, "action.defog_on"),
      icon: _("mdi:car-defrost-front"),
      disabled: this._busy || E,
      variant: b ? "danger" : "",
      onClick: () => this._run(() => ls(this.hass, r))
    })}
          </div>` : c}
      ${a ? l`<div slot="charge" class="map-actions">
            ${v({
      label: w(this.hass, "button", "charge_stop"),
      icon: _("mdi:ev-station"),
      disabled: this._busy,
      variant: "danger",
      onClick: () => this._run(() => N(this.hass, n))
    })}
          </div>` : c}
      ${this._entityExists(o) ? l`<div slot="trunk" class="map-actions">
            ${v({
      label: x ? u(this.hass, "action.close_trunk") : u(this.hass, "action.open_trunk"),
      icon: _("mdi:car-back"),
      disabled: this._busy,
      variant: x ? "danger" : "ok",
      onClick: () => this._run(
        () => x ? yt(this.hass, o) : bt(this.hass, o)
      )
    })}
          </div>` : c}
    `;
  }
  _windowsCluster(e) {
    const t = e.windows, s = e.windows_vent, i = this._entityExists(t), r = this._entityExists(s);
    if (!i && !r)
      return c;
    const n = i && Yt(this.hass, t);
    return l`
      <div slot="windows" class="map-actions map-actions-stack">
        ${i ? v(n ? {
      label: u(this.hass, "action.close_windows"),
      icon: _("mdi:window-closed"),
      disabled: this._busy,
      variant: "danger",
      onClick: () => this._run(() => yt(this.hass, t))
    } : {
      label: u(this.hass, "action.open_windows"),
      icon: _("mdi:window-open"),
      disabled: this._busy,
      variant: "ok",
      onClick: () => this._run(() => bt(this.hass, t))
    }) : c}
        ${r ? v({
      label: u(this.hass, "action.vent_windows"),
      icon: _("mdi:window-open-variant"),
      disabled: this._busy,
      onClick: () => this._run(() => N(this.hass, s))
    }) : c}
      </div>
    `;
  }
  _sunroofCluster(e) {
    const t = e.sunroof, s = e.sunroof_tilt, i = this._entityExists(t), r = this._entityExists(s);
    if (!i && !r)
      return c;
    const n = i && Yt(this.hass, t);
    return l`
      <div slot="sunroof" class="map-actions">
        ${i ? v(n ? {
      label: u(this.hass, "action.close_sunroof"),
      icon: _("mdi:window-closed"),
      disabled: this._busy,
      variant: "danger",
      onClick: () => this._run(() => yt(this.hass, t))
    } : {
      label: u(this.hass, "action.open_sunroof"),
      icon: _("mdi:window-open"),
      disabled: this._busy,
      variant: "ok",
      onClick: () => this._run(() => bt(this.hass, t))
    }) : c}
        ${r ? v({
      label: u(this.hass, "action.tilt_sunroof"),
      icon: _("mdi:angle-acute"),
      disabled: this._busy,
      onClick: () => this._run(() => N(this.hass, s))
    }) : c}
      </div>
    `;
  }
  render() {
    var b;
    if (!this._config)
      return l`<ha-card
        ><div class="pad">${u(this.hass, "chrome.not_configured")}</div></ha-card
      >`;
    if (!((b = this._config.device_id) != null && b.trim()))
      return l`<ha-card
        ><div class="pad">${u(this.hass, "chrome.select_device")}</div></ha-card
      >`;
    if (!this.hass)
      return l`<ha-card
        ><div class="pad">${u(void 0, "chrome.waiting_hass")}</div></ha-card
      >`;
    const e = this._slots(), t = e.climate, s = t ? this.hass.states[t] : void 0, i = Xt(this.hass, t), r = Qt(this.hass, t), n = hs(this.hass, t), o = (typeof (s == null ? void 0 : s.attributes.temperature_unit) == "string" ? s.attributes.temperature_unit : void 0) || (typeof (s == null ? void 0 : s.attributes.unit_of_measurement) == "string" ? s.attributes.unit_of_measurement : "°C"), h = this._hasSeats(e), a = this._hasDirectTpms(e), d = this._hasWindowsControls(e), p = this._hasBodyControls(e), g = fe(this.hass, e.image), f = h || a || d || p, m = !!(s || e.quick_cool && this.hass.states[e.quick_cool] || e.quick_heat && this.hass.states[e.quick_heat]);
    return l`
      <ha-card>
        ${this._config.title ? l`<div class="header">${this._config.title}</div>` : c}
        <div class="body-pad">
          ${m ? l`
                <div class="controls-row">
                  <div class="controls-left">
                    ${s ? l`
                          ${v({
      label: i ? u(this.hass, "climate.off") : u(this.hass, "climate.on"),
      icon: _("mdi:power"),
      disabled: this._busy,
      variant: i ? "ok" : "",
      onClick: () => this._toggleClimate()
    })}
                          ${v({
      label: u(this.hass, "climate.increase_temp"),
      icon: _("mdi:plus"),
      disabled: this._busy || r === void 0,
      variant: "heat",
      onClick: () => this._nudgeTemp(1)
    })}
                          <span
                            class="setpoint-value"
                            title=${u(this.hass, "climate.setpoint")}
                            >${r !== void 0 ? `${r}${o}` : "—"}</span
                          >
                          ${v({
      label: u(this.hass, "climate.decrease_temp"),
      icon: _("mdi:minus"),
      disabled: this._busy || r === void 0,
      variant: "cool",
      onClick: () => this._nudgeTemp(-1)
    })}
                        ` : c}
                  </div>
                  <div class="controls-right">
                    ${e.quick_cool && this.hass.states[e.quick_cool] ? v({
      label: w(this.hass, "button", "quick_cool"),
      icon: _("mdi:snowflake"),
      disabled: this._busy,
      variant: "cool",
      onClick: () => this._run(
        () => N(this.hass, e.quick_cool)
      )
    }) : c}
                    ${e.quick_heat && this.hass.states[e.quick_heat] ? v({
      label: w(this.hass, "button", "quick_heat"),
      icon: _("mdi:fire"),
      disabled: this._busy,
      variant: "heat",
      onClick: () => this._run(
        () => N(this.hass, e.quick_heat)
      )
    }) : c}
                  </div>
                </div>
              ` : c}
          ${s && n !== void 0 ? l`
                <div class="current-row">
                  <span class="metric-label"
                    >${u(this.hass, "climate.current")}</span
                  >
                  <span class="metric-value">${n}${o}</span>
                </div>
              ` : c}
          ${f ? l`
                <carlinko-car-outline .src=${g}>
                  ${this._bodyActions(e)} ${this._windowsCluster(e)}
                  ${this._sunroofCluster(e)}
                  ${re.map((E) => this._seatZone(E, e))}
                  ${a ? Zs.map((E) => this._wheelZone(E, e)) : c}
                </carlinko-car-outline>
              ` : c}
        </div>
      </ha-card>
    `;
  }
};
V.styles = [
  Pt,
  _e,
  me,
  k`
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
      .seat-zone,
      .wheel-zone {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .wheel-zone {
        gap: 2px;
        align-items: flex-start;
      }
      .seat-btn,
      .wheel-pressure,
      .wheel-temp {
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
      .seat-btn {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 5px 8px;
        font-size: 0.8rem;
      }
      .seat-btn ha-icon {
        --mdc-icon-size: 1rem;
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
      }
      .seat-btn.heat {
        border-color: var(--ck-seat-heat);
        color: var(--ck-seat-heat);
      }
      .seat-btn.vent {
        border-color: var(--ck-seat-vent);
        color: var(--ck-seat-vent);
      }
      .seat-btn .seat-state {
        color: var(--ck-text);
        font-size: 0.72rem;
        white-space: nowrap;
        line-height: 1.1;
      }
      .wheel-pressure {
        font-weight: 600;
      }
      .wheel-temp {
        color: var(--ck-muted);
      }
      .wheel-zone.tone-ok .wheel-pressure,
      .wheel-zone.tone-ok .wheel-temp {
        border-color: var(--ck-tyre-ok);
      }
      .wheel-zone.tone-ok .wheel-pressure {
        color: var(--ck-tyre-ok);
      }
      .wheel-zone.tone-warn .wheel-pressure,
      .wheel-zone.tone-warn .wheel-temp {
        border-color: var(--ck-tyre-warn);
      }
      .wheel-zone.tone-warn .wheel-pressure {
        color: var(--ck-tyre-warn);
      }
      .wheel-zone.tone-danger .wheel-pressure,
      .wheel-zone.tone-danger .wheel-temp {
        border-color: var(--ck-tyre-danger);
      }
      .wheel-zone.tone-danger .wheel-pressure {
        color: var(--ck-tyre-danger);
      }
      .seat-btn:hover:not(:disabled),
      .wheel-pressure:hover,
      .wheel-temp:hover {
        background: color-mix(in srgb, currentColor 14%, var(--ck-bg));
        border-color: currentColor;
      }
      .seat-btn:disabled {
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
      }
      @container ck-card (max-width: 360px) {
        .seat-btn {
          padding: 4px 6px;
          font-size: 0.7rem;
          gap: 2px;
        }
        .seat-btn ha-icon {
          --mdc-icon-size: 0.85rem;
          width: 0.85rem;
          height: 0.85rem;
        }
        .wheel-pressure,
        .wheel-temp {
          padding: 3px 5px;
          font-size: 0.65rem;
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
pt([
  j({ attribute: !1 })
], V.prototype, "hass", 2);
pt([
  O()
], V.prototype, "_config", 2);
pt([
  O()
], V.prototype, "_busy", 2);
V = pt([
  R("carlinko-cabin")
], V);
var Ys = Object.getOwnPropertyDescriptor, Qs = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? Ys(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = o(r) || r);
  return r;
};
let ne = class extends rt {
  extraSchema() {
    return [ye];
  }
};
ne = Qs([
  R("carlinko-cabin-editor")
], ne);
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
  "%c CARLINKO-CARD %c 0.1.6 ",
  "color:#fff;background:#0d9488;font-weight:700",
  "color:#0d9488;background:transparent;font-weight:700"
);
//# sourceMappingURL=carlinko-card.js.map
