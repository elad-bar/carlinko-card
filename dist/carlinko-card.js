/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Q = globalThis, $t = Q.ShadowRoot && (Q.ShadyCSS === void 0 || Q.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, yt = Symbol(), Mt = /* @__PURE__ */ new WeakMap();
let It = class {
  constructor(t, s, r) {
    if (this._$cssResult$ = !0, r !== yt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if ($t && t === void 0) {
      const r = s !== void 0 && s.length === 1;
      r && (t = Mt.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && Mt.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ie = (e) => new It(typeof e == "string" ? e : e + "", void 0, yt), b = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((r, i, n) => r + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + e[n + 1], e[0]);
  return new It(s, e, yt);
}, re = (e, t) => {
  if ($t) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const r = document.createElement("style"), i = Q.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = s.cssText, e.appendChild(r);
  }
}, Nt = $t ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const r of t.cssRules) s += r.cssText;
  return ie(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ne, defineProperty: oe, getOwnPropertyDescriptor: ae, getOwnPropertyNames: ce, getOwnPropertySymbols: le, getPrototypeOf: he } = Object, E = globalThis, Ut = E.trustedTypes, de = Ut ? Ut.emptyScript : "", pt = E.reactiveElementPolyfillSupport, q = (e, t) => e, X = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? de : null;
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
} }, bt = (e, t) => !ne(e, t), Ht = { attribute: !0, type: String, converter: X, reflect: !1, useDefault: !1, hasChanged: bt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), E.litPropertyMetadata ?? (E.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let U = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = Ht) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(t, r, s);
      i !== void 0 && oe(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, s, r) {
    const { get: i, set: n } = ae(this.prototype, t) ?? { get() {
      return this[s];
    }, set(o) {
      this[s] = o;
    } };
    return { get: i, set(o) {
      const a = i == null ? void 0 : i.call(this);
      n == null || n.call(this, o), this.requestUpdate(t, a, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ht;
  }
  static _$Ei() {
    if (this.hasOwnProperty(q("elementProperties"))) return;
    const t = he(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(q("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(q("properties"))) {
      const s = this.properties, r = [...ce(s), ...le(s)];
      for (const i of r) this.createProperty(i, s[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const s = litPropertyMetadata.get(t);
      if (s !== void 0) for (const [r, i] of s) this.elementProperties.set(r, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, r] of this.elementProperties) {
      const i = this._$Eu(s, r);
      i !== void 0 && this._$Eh.set(i, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const s = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const i of r) s.unshift(Nt(i));
    } else t !== void 0 && s.push(Nt(t));
    return s;
  }
  static _$Eu(t, s) {
    const r = s.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const r of s.keys()) this.hasOwnProperty(r) && (t.set(r, this[r]), delete this[r]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return re(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((s) => {
      var r;
      return (r = s.hostConnected) == null ? void 0 : r.call(s);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((s) => {
      var r;
      return (r = s.hostDisconnected) == null ? void 0 : r.call(s);
    });
  }
  attributeChangedCallback(t, s, r) {
    this._$AK(t, r);
  }
  _$ET(t, s) {
    var n;
    const r = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, r);
    if (i !== void 0 && r.reflect === !0) {
      const o = (((n = r.converter) == null ? void 0 : n.toAttribute) !== void 0 ? r.converter : X).toAttribute(s, r.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, s) {
    var n, o;
    const r = this.constructor, i = r._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const a = r.getPropertyOptions(i), c = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : X;
      this._$Em = i;
      const d = c.fromAttribute(s, a.type);
      this[i] = d ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, s, r, i = !1, n) {
    var o;
    if (t !== void 0) {
      const a = this.constructor;
      if (i === !1 && (n = this[t]), r ?? (r = a.getPropertyOptions(t)), !((r.hasChanged ?? bt)(n, s) || r.useDefault && r.reflect && n === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(a._$Eu(t, r)))) return;
      this.C(t, s, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: r, reflect: i, wrapped: n }, o) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? s ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (s = void 0), this._$AL.set(t, s)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
    var r;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, o] of i) {
        const { wrapped: a } = o, c = this[n];
        a !== !0 || this._$AL.has(n) || c === void 0 || this.C(n, void 0, o, c);
      }
    }
    let t = !1;
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s), t ? (this.willUpdate(s), (r = this._$EO) == null || r.forEach((i) => {
        var n;
        return (n = i.hostUpdate) == null ? void 0 : n.call(i);
      }), this.update(s)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(s);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var s;
    (s = this._$EO) == null || s.forEach((r) => {
      var i;
      return (i = r.hostUpdated) == null ? void 0 : i.call(r);
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
U.elementStyles = [], U.shadowRootOptions = { mode: "open" }, U[q("elementProperties")] = /* @__PURE__ */ new Map(), U[q("finalized")] = /* @__PURE__ */ new Map(), pt == null || pt({ ReactiveElement: U }), (E.reactiveElementVersions ?? (E.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = globalThis, Lt = (e) => e, Y = z.trustedTypes, jt = Y ? Y.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Ft = "$lit$", C = `lit$${Math.random().toFixed(9).slice(2)}$`, Gt = "?" + C, ue = `<${Gt}>`, N = document, V = () => N.createComment(""), W = (e) => e === null || typeof e != "object" && typeof e != "function", wt = Array.isArray, pe = (e) => wt(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", ft = `[ 	
\f\r]`, B = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Rt = /-->/g, Dt = />/g, P = RegExp(`>|${ft}(?:([^\\s"'>=/]+)(${ft}*=${ft}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Bt = /'/g, qt = /"/g, Jt = /^(?:script|style|textarea|title)$/i, fe = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), h = fe(1), H = Symbol.for("lit-noChange"), l = Symbol.for("lit-nothing"), zt = /* @__PURE__ */ new WeakMap(), T = N.createTreeWalker(N, 129);
function Qt(e, t) {
  if (!wt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return jt !== void 0 ? jt.createHTML(t) : t;
}
const _e = (e, t) => {
  const s = e.length - 1, r = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = B;
  for (let a = 0; a < s; a++) {
    const c = e[a];
    let d, p, u = -1, _ = 0;
    for (; _ < c.length && (o.lastIndex = _, p = o.exec(c), p !== null); ) _ = o.lastIndex, o === B ? p[1] === "!--" ? o = Rt : p[1] !== void 0 ? o = Dt : p[2] !== void 0 ? (Jt.test(p[2]) && (i = RegExp("</" + p[2], "g")), o = P) : p[3] !== void 0 && (o = P) : o === P ? p[0] === ">" ? (o = i ?? B, u = -1) : p[1] === void 0 ? u = -2 : (u = o.lastIndex - p[2].length, d = p[1], o = p[3] === void 0 ? P : p[3] === '"' ? qt : Bt) : o === qt || o === Bt ? o = P : o === Rt || o === Dt ? o = B : (o = P, i = void 0);
    const k = o === P && e[a + 1].startsWith("/>") ? " " : "";
    n += o === B ? c + ue : u >= 0 ? (r.push(d), c.slice(0, u) + Ft + c.slice(u) + C + k) : c + C + (u === -2 ? a : k);
  }
  return [Qt(e, n + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class K {
  constructor({ strings: t, _$litType$: s }, r) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const a = t.length - 1, c = this.parts, [d, p] = _e(t, s);
    if (this.el = K.createElement(d, r), T.currentNode = this.el.content, s === 2 || s === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (i = T.nextNode()) !== null && c.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const u of i.getAttributeNames()) if (u.endsWith(Ft)) {
          const _ = p[o++], k = i.getAttribute(u).split(C), J = /([.?@])?(.*)/.exec(_);
          c.push({ type: 1, index: n, name: J[2], strings: k, ctor: J[1] === "." ? me : J[1] === "?" ? ve : J[1] === "@" ? $e : ot }), i.removeAttribute(u);
        } else u.startsWith(C) && (c.push({ type: 6, index: n }), i.removeAttribute(u));
        if (Jt.test(i.tagName)) {
          const u = i.textContent.split(C), _ = u.length - 1;
          if (_ > 0) {
            i.textContent = Y ? Y.emptyScript : "";
            for (let k = 0; k < _; k++) i.append(u[k], V()), T.nextNode(), c.push({ type: 2, index: ++n });
            i.append(u[_], V());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Gt) c.push({ type: 2, index: n });
      else {
        let u = -1;
        for (; (u = i.data.indexOf(C, u + 1)) !== -1; ) c.push({ type: 7, index: n }), u += C.length - 1;
      }
      n++;
    }
  }
  static createElement(t, s) {
    const r = N.createElement("template");
    return r.innerHTML = t, r;
  }
}
function L(e, t, s = e, r) {
  var o, a;
  if (t === H) return t;
  let i = r !== void 0 ? (o = s._$Co) == null ? void 0 : o[r] : s._$Cl;
  const n = W(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((a = i == null ? void 0 : i._$AO) == null || a.call(i, !1), n === void 0 ? i = void 0 : (i = new n(e), i._$AT(e, s, r)), r !== void 0 ? (s._$Co ?? (s._$Co = []))[r] = i : s._$Cl = i), i !== void 0 && (t = L(e, i._$AS(e, t.values), i, r)), t;
}
class ge {
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
    const { el: { content: s }, parts: r } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? N).importNode(s, !0);
    T.currentNode = i;
    let n = T.nextNode(), o = 0, a = 0, c = r[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let d;
        c.type === 2 ? d = new I(n, n.nextSibling, this, t) : c.type === 1 ? d = new c.ctor(n, c.name, c.strings, this, t) : c.type === 6 && (d = new ye(n, this, t)), this._$AV.push(d), c = r[++a];
      }
      o !== (c == null ? void 0 : c.index) && (n = T.nextNode(), o++);
    }
    return T.currentNode = N, i;
  }
  p(t) {
    let s = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, s), s += r.strings.length - 2) : r._$AI(t[s])), s++;
  }
}
class I {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, s, r, i) {
    this.type = 2, this._$AH = l, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = r, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    t = L(this, t, s), W(t) ? t === l || t == null || t === "" ? (this._$AH !== l && this._$AR(), this._$AH = l) : t !== this._$AH && t !== H && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : pe(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== l && W(this._$AH) ? this._$AA.nextSibling.data = t : this.T(N.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: s, _$litType$: r } = t, i = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = K.createElement(Qt(r.h, r.h[0]), this.options)), r);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(s);
    else {
      const o = new ge(i, this), a = o.u(this.options);
      o.p(s), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let s = zt.get(t.strings);
    return s === void 0 && zt.set(t.strings, s = new K(t)), s;
  }
  k(t) {
    wt(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let r, i = 0;
    for (const n of t) i === s.length ? s.push(r = new I(this.O(V()), this.O(V()), this, this.options)) : r = s[i], r._$AI(n), i++;
    i < s.length && (this._$AR(r && r._$AB.nextSibling, i), s.length = i);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, s); t !== this._$AB; ) {
      const i = Lt(t).nextSibling;
      Lt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var s;
    this._$AM === void 0 && (this._$Cv = t, (s = this._$AP) == null || s.call(this, t));
  }
}
class ot {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, r, i, n) {
    this.type = 1, this._$AH = l, this._$AN = void 0, this.element = t, this.name = s, this._$AM = i, this.options = n, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = l;
  }
  _$AI(t, s = this, r, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = L(this, t, s, 0), o = !W(t) || t !== this._$AH && t !== H, o && (this._$AH = t);
    else {
      const a = t;
      let c, d;
      for (t = n[0], c = 0; c < n.length - 1; c++) d = L(this, a[r + c], s, c), d === H && (d = this._$AH[c]), o || (o = !W(d) || d !== this._$AH[c]), d === l ? t = l : t !== l && (t += (d ?? "") + n[c + 1]), this._$AH[c] = d;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === l ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class me extends ot {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === l ? void 0 : t;
  }
}
class ve extends ot {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== l);
  }
}
class $e extends ot {
  constructor(t, s, r, i, n) {
    super(t, s, r, i, n), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = L(this, t, s, 0) ?? l) === H) return;
    const r = this._$AH, i = t === l && r !== l || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, n = t !== l && (r === l || i);
    i && this.element.removeEventListener(this.name, this, r), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ye {
  constructor(t, s, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    L(this, t);
  }
}
const _t = z.litHtmlPolyfillSupport;
_t == null || _t(K, I), (z.litHtmlVersions ?? (z.litHtmlVersions = [])).push("3.3.3");
const be = (e, t, s) => {
  const r = (s == null ? void 0 : s.renderBefore) ?? t;
  let i = r._$litPart$;
  if (i === void 0) {
    const n = (s == null ? void 0 : s.renderBefore) ?? null;
    r._$litPart$ = i = new I(t.insertBefore(V(), n), n, void 0, s ?? {});
  }
  return i._$AI(e), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis;
class f extends U {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = be(s, this.renderRoot, this.renderOptions);
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
    return H;
  }
}
var Zt;
f._$litElement$ = !0, f.finalized = !0, (Zt = M.litElementHydrateSupport) == null || Zt.call(M, { LitElement: f });
const gt = M.litElementPolyfillSupport;
gt == null || gt({ LitElement: f });
(M.litElementVersions ?? (M.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const we = { attribute: !0, type: String, converter: X, reflect: !1, hasChanged: bt }, ke = (e = we, t, s) => {
  const { kind: r, metadata: i } = s;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(s.name, e), r === "accessor") {
    const { name: o } = s;
    return { set(a) {
      const c = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(o, c, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, e, a), a;
    } };
  }
  if (r === "setter") {
    const { name: o } = s;
    return function(a) {
      const c = this[o];
      t.call(this, a), this.requestUpdate(o, c, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function v(e) {
  return (t, s) => typeof s == "object" ? ke(e, t, s) : ((r, i, n) => {
    const o = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, r), o ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function g(e) {
  return v({ ...e, state: !0, attribute: !1 });
}
async function kt(e, t, s, r) {
  if (e())
    return !1;
  t(!0);
  try {
    return await s(), !0;
  } catch (i) {
    return r == null || r(i), !1;
  } finally {
    t(!1);
  }
}
function xe(e, t) {
  return e === t || e.endsWith(`_${t}`) ? !0 : e.startsWith("carlinko_") && e.endsWith(`_${t}`);
}
function Ce(e, t) {
  return t === "defrost" || t.endsWith("_left") || t.endsWith("_right") ? [e, "switch", "binary_sensor"] : [e];
}
function Ae(e, t) {
  return !!(t && e.states[t]);
}
function Se(e, t, s, r) {
  const i = e.entities;
  if (!i)
    return;
  const n = [];
  for (const a of Object.values(i)) {
    if (!(a != null && a.entity_id) || !a.unique_id || a.device_id !== t || a.disabled_by || a.hidden_by)
      continue;
    const c = a.entity_id.split(".", 1)[0];
    r.includes(c) && xe(a.unique_id, s) && n.push(a.entity_id);
  }
  return n.length === 0 ? void 0 : n.find((a) => Ae(e, a)) ?? n[0];
}
function Ee(e, t, s) {
  var o, a;
  if (!e)
    return;
  const r = (o = t.entities) == null ? void 0 : o[s.slot];
  if (r)
    return r;
  if (s.slot === "image" && t.image_entity)
    return t.image_entity;
  const i = (a = t.device_id) == null ? void 0 : a.trim();
  if (!i)
    return;
  const n = [s.key, ...s.fallbackKeys ?? []];
  for (const c of n) {
    const d = Ce(s.domain, c), p = Se(e, i, c, d);
    if (p)
      return p;
  }
}
function at(e, t, s) {
  const r = {};
  for (const i of s)
    r[i.slot] = Ee(e, t, i);
  return r;
}
const Xt = [
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
  { slot: "moving", key: "moving", domain: "binary_sensor" },
  { slot: "online", key: "online", domain: "binary_sensor" },
  { slot: "lock", key: "lock", domain: "lock" },
  { slot: "engine", key: "engine", domain: "switch" },
  {
    slot: "defog",
    key: "defrost_cmd",
    domain: "switch",
    fallbackKeys: ["defrost"]
  },
  { slot: "charge_stop", key: "charge_stop", domain: "button" },
  { slot: "trunk", key: "liftgate", domain: "cover" }
];
new Map(
  Xt.map((e) => [e.slot, e])
);
const Oe = [
  { slot: "charging", key: "charging", domain: "binary_sensor" },
  { slot: "charge_state", key: "charge_state", domain: "sensor" },
  { slot: "charge_mode", key: "charge_mode", domain: "sensor" },
  { slot: "charge_remaining", key: "charge_remaining", domain: "sensor" },
  { slot: "charge_power", key: "charge_power", domain: "sensor" },
  { slot: "charge_stop", key: "charge_stop", domain: "button" }
], Pe = [
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
  { slot: "seat_vent_rr", key: "seat_vent_rr", domain: "select" }
], Te = [
  { slot: "image", key: "vehicle_top", domain: "image" },
  { slot: "tyre_fl", key: "tyre_fl", domain: "sensor" },
  { slot: "tyre_fl_temp", key: "tyre_fl_temp", domain: "sensor" },
  { slot: "tyre_fr", key: "tyre_fr", domain: "sensor" },
  { slot: "tyre_fr_temp", key: "tyre_fr_temp", domain: "sensor" },
  { slot: "tyre_rl", key: "tyre_rl", domain: "sensor" },
  { slot: "tyre_rl_temp", key: "tyre_rl_temp", domain: "sensor" },
  { slot: "tyre_rr", key: "tyre_rr", domain: "sensor" },
  { slot: "tyre_rr_temp", key: "tyre_rr_temp", domain: "sensor" },
  { slot: "tyre_status", key: "tyre_status", domain: "sensor" },
  { slot: "tyres_ok", key: "tyres_ok", domain: "binary_sensor" }
];
function F(e, t) {
  if (!(!e || !t))
    return e.states[t];
}
function O(e, t) {
  var s;
  return (s = F(e, t)) == null ? void 0 : s.state;
}
function Yt(e, t) {
  const s = O(e, t);
  if (s === void 0 || s === "unknown" || s === "unavailable")
    return;
  const r = Number(s);
  return Number.isFinite(r) ? r : void 0;
}
function A(e, t) {
  const s = O(e, t);
  return s === "on" || s === "open" || s === "unlocked";
}
function S(e, t, s = "—") {
  const r = F(e, t);
  if (!r || r.state === "unknown" || r.state === "unavailable")
    return s;
  const i = r.attributes.unit_of_measurement;
  return i ? `${r.state} ${i}` : String(r.state);
}
function mt(e, t) {
  if (/^https?:\/\//i.test(t))
    return t;
  const s = ((e == null ? void 0 : e.hassUrl) || "").replace(/\/$/, "");
  return s ? t.startsWith("/") ? `${s}${t}` : `${s}/${t}` : t;
}
function xt(e, t) {
  const s = F(e, t);
  if (!s)
    return;
  const r = s.attributes.entity_picture;
  if (typeof r == "string" && r)
    return mt(e, r);
  const i = s.attributes.access_token;
  return typeof i == "string" && i ? mt(
    e,
    `/api/image_proxy/${t}?token=${encodeURIComponent(i)}`
  ) : mt(e, `/api/image_proxy/${t}`);
}
async function m(e, t, s, r, i = {}) {
  await e.callService(t, s, { ...i, entity_id: r });
}
async function Me(e, t) {
  await m(e, "lock", "lock", t);
}
async function Ne(e, t) {
  await m(e, "lock", "unlock", t);
}
async function te(e, t) {
  const s = t.split(".", 1)[0];
  await m(e, s, "turn_on", t);
}
async function ee(e, t) {
  const s = t.split(".", 1)[0];
  await m(e, s, "turn_off", t);
}
async function Ue(e, t) {
  const s = t.split(".", 1)[0];
  await m(e, s, "toggle", t);
}
async function He(e, t) {
  await m(e, "cover", "open_cover", t);
}
async function Le(e, t) {
  await m(e, "cover", "close_cover", t);
}
async function tt(e, t) {
  await m(e, "button", "press", t);
}
function G(e, t, s) {
  const r = F(e, t);
  if (!r)
    return;
  const i = r.attributes[s];
  if (i == null)
    return;
  const n = Number(i);
  return Number.isFinite(n) ? n : void 0;
}
function Vt(e, t) {
  return G(e, t, "temperature");
}
function je(e, t) {
  return G(e, t, "current_temperature");
}
function Re(e, t) {
  return G(e, t, "target_temp_step") ?? 1;
}
function De(e, t) {
  return G(e, t, "min_temp") ?? 16;
}
function Be(e, t) {
  return G(e, t, "max_temp") ?? 30;
}
function Wt(e, t) {
  const s = O(e, t);
  return s === "cool" || s === "heat" || s === "heat_cool" || s === "auto" || s === "fan_only" || s === "dry" || s === "on";
}
async function qe(e, t, s) {
  await m(e, "climate", "set_hvac_mode", t, {
    hvac_mode: s
  });
}
async function ze(e, t, s) {
  await m(e, "climate", "set_temperature", t, {
    temperature: s
  });
}
async function Ve(e, t, s) {
  await m(e, "select", "select_option", t, {
    option: s
  });
}
function We(e, t) {
  const s = F(e, t), r = s == null ? void 0 : s.attributes.options;
  return Array.isArray(r) ? r.map(String) : [];
}
function vt(e, t) {
  e.dispatchEvent(
    new CustomEvent("hass-more-info", {
      bubbles: !0,
      composed: !0,
      detail: { entityId: t }
    })
  );
}
const ct = b`
  :host {
    display: block;
    --ck-accent: #0d9488;
    --ck-bg: var(--card-background-color, #fff);
    --ck-text: var(--primary-text-color, #1a1a1a);
    --ck-muted: var(--secondary-text-color, #667);
    --ck-border: var(--divider-color, #e2e8f0);
    --ck-danger: #b91c1c;
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
`, Ct = b`
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
`, lt = b`
  .chip {
    font-size: 0.75rem;
    padding: 4px 8px;
    border-radius: 6px;
    background: color-mix(in srgb, var(--ck-accent) 12%, transparent);
    border: 1px solid var(--ck-border);
  }
  .chip.ok {
    border-color: var(--ck-accent);
  }
`, At = b`
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
  .action:hover:not(:disabled) {
    border-color: var(--ck-accent);
  }
  .action:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .action.ok {
    border-color: var(--ck-accent);
    color: var(--ck-accent);
  }
  .action.danger {
    border-color: var(--ck-danger);
    color: var(--ck-danger);
  }
`, Ke = b`
  .bar-wrap {
    height: 6px;
    background: var(--ck-border);
    border-radius: 999px;
    overflow: hidden;
    margin: 2px 0 8px;
  }
  .bar {
    height: 100%;
    background: var(--ck-accent);
    border-radius: 999px;
  }
`;
function $(e, t, s, r, i) {
  if (!t || !r || !t.states[r])
    return l;
  let n = S(t, r);
  if (i != null && i.numeric) {
    const o = Yt(t, r);
    if (o === void 0)
      return l;
    n = i.suffix ? `${o}${i.suffix}` : String(o);
  }
  return h`
    <button
      type="button"
      class="metric"
      @click=${() => vt(e, r)}
    >
      <span class="metric-label">${s}</span>
      <span class="metric-value">${n}</span>
    </button>
  `;
}
function y(e) {
  const t = e.variant || "";
  return h`
    <button
      type="button"
      class="action ${t}"
      ?disabled=${e.disabled}
      @click=${e.onClick}
    >
      ${e.label}
    </button>
  `;
}
function x(e, t) {
  return e ? h`<span class="chip ${t != null && t.ok ? "ok" : ""}">${e}</span>` : l;
}
function Ze(e, t) {
  if (e === void 0 || Number.isNaN(e))
    return l;
  const s = Math.max(0, Math.min(100, e));
  return h`
    <div class="bar-wrap" title=${t ?? `${s}%`}>
      <div class="bar" style="width:${s}%"></div>
    </div>
  `;
}
var Ie = Object.defineProperty, Fe = Object.getOwnPropertyDescriptor, se = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Fe(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (i = (r ? o(t, s, i) : o(i)) || i);
  return r && i && Ie(t, s, i), i;
};
let et = class extends f {
  render() {
    const e = !!this.src;
    return h`
      <div class="wrap ${e ? "has-img" : ""}">
        ${e ? h`<img class="car-img" src=${this.src} alt="Vehicle top" />` : h`
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
      </div>
    `;
  }
};
et.styles = b`
    :host {
      display: block;
      width: 100%;
      max-width: 280px;
      margin: 0 auto;
    }
    .wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 120 / 200;
    }
    .wrap.has-img {
      aspect-ratio: auto;
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
      fill: color-mix(in srgb, var(--ck-accent, #0d9488) 12%, #fff);
      stroke: var(--ck-border, #e2e8f0);
      stroke-width: 2;
    }
    .glass {
      fill: color-mix(in srgb, var(--ck-accent, #0d9488) 8%, #e8eef2);
      stroke: none;
    }
    .region {
      position: absolute;
      min-width: 4px;
      min-height: 4px;
      pointer-events: auto;
    }
    .seat-fl {
      left: 10%;
      top: 30%;
    }
    .seat-fr {
      right: 10%;
      top: 30%;
    }
    .seat-rl {
      left: 10%;
      top: 52%;
    }
    .seat-rr {
      right: 10%;
      top: 52%;
    }
    .wheel-fl {
      left: 0;
      top: 22%;
    }
    .wheel-fr {
      right: 0;
      top: 22%;
    }
    .wheel-rl {
      left: 0;
      top: 68%;
    }
    .wheel-rr {
      right: 0;
      top: 68%;
    }
  `;
se([
  v({ type: String })
], et.prototype, "src", 2);
et = se([
  w("carlinko-car-outline")
], et);
var Ge = Object.defineProperty, Je = Object.getOwnPropertyDescriptor, ht = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Je(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (i = (r ? o(t, s, i) : o(i)) || i);
  return r && i && Ge(t, s, i), i;
};
let j = class extends f {
  constructor() {
    super(...arguments), this._busy = !1;
  }
  setConfig(e) {
    if (!e || typeof e.device_id != "string")
      throw new Error("device_id is required");
    this._config = { ...e };
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
      title: "CarLinko"
    };
  }
  _slots() {
    return this._config ? at(this.hass, this._config, Xt) : {};
  }
  _run(e) {
    this.hass && kt(
      () => this._busy,
      (t) => {
        this._busy = t;
      },
      e,
      (t) => console.error("carlinko-overview action failed", t)
    );
  }
  render() {
    var d;
    if (!this._config)
      return h`<ha-card><div class="pad">Not configured</div></ha-card>`;
    if (!((d = this._config.device_id) != null && d.trim()))
      return h`<ha-card
        ><div class="pad">Select a CarLinko vehicle device</div></ha-card
      >`;
    if (!this.hass)
      return h`<ha-card><div class="pad">Waiting for Home Assistant…</div></ha-card>`;
    const e = this._slots(), t = A(this.hass, e.moving), s = xt(this.hass, e.image), i = O(this.hass, e.lock) === "locked", n = A(this.hass, e.engine), o = A(this.hass, e.defog), a = O(this.hass, e.trunk) === "open", c = Yt(this.hass, e.battery);
    return h`
      <ha-card>
        ${this._config.title ? h`<div class="header">${this._config.title}</div>` : l}
        <div class="body">
          <div class="hero">
            ${s ? h`<img class="car-img" src=${s} alt="Vehicle" />` : h`<div class="car-placeholder">No image</div>`}
          </div>
          <div class="vitals">
            ${$(this, this.hass, "Battery", e.battery, {
      numeric: !0,
      suffix: "%"
    })}
            ${Ze(
      c,
      c !== void 0 ? `Battery ${c}%` : void 0
    )}
            ${$(this, this.hass, "EV range", e.range)}
            ${$(this, this.hass, "Fuel", e.fuel, {
      numeric: !0,
      suffix: "%"
    })}
            ${$(this, this.hass, "Fuel range", e.fuel_range)}
            ${$(this, this.hass, "Total range", e.total_range)}
            <div class="chips">
              ${e.hv_state && this.hass.states[e.hv_state] ? x(`HV ${S(this.hass, e.hv_state)}`) : l}
              ${e.odometer && this.hass.states[e.odometer] ? x(S(this.hass, e.odometer)) : l}
              ${e.consumption && this.hass.states[e.consumption] ? x(S(this.hass, e.consumption)) : l}
              ${e.fuel_consumption && this.hass.states[e.fuel_consumption] ? x(S(this.hass, e.fuel_consumption)) : l}
              ${e.online && this.hass.states[e.online] ? x(A(this.hass, e.online) ? "Online" : "Offline", {
      ok: A(this.hass, e.online)
    }) : l}
              ${t && e.speed && this.hass.states[e.speed] ? x(S(this.hass, e.speed)) : l}
            </div>
          </div>
        </div>
        <div class="actions">
          ${e.lock ? y({
      label: i ? "Unlock" : "Lock",
      disabled: this._busy,
      variant: i ? "danger" : "ok",
      onClick: () => this._run(
        () => i ? Ne(this.hass, e.lock) : Me(this.hass, e.lock)
      )
    }) : l}
          ${e.engine ? y({
      label: `Engine ${n ? "Off" : "On"}`,
      disabled: this._busy,
      variant: n ? "ok" : "",
      onClick: () => this._run(
        () => n ? ee(this.hass, e.engine) : te(this.hass, e.engine)
      )
    }) : l}
          ${e.defog ? y({
      label: `Defog ${o ? "On" : "Off"}`,
      disabled: this._busy || e.defog.startsWith("binary_sensor."),
      variant: o ? "ok" : "",
      onClick: () => this._run(() => Ue(this.hass, e.defog))
    }) : l}
          ${e.charge_stop ? y({
      label: "Stop charge",
      disabled: this._busy,
      onClick: () => this._run(() => tt(this.hass, e.charge_stop))
    }) : l}
          ${e.trunk ? y({
      label: `Trunk ${a ? "Close" : "Open"}`,
      disabled: this._busy,
      variant: a ? "ok" : "",
      onClick: () => this._run(
        () => a ? Le(this.hass, e.trunk) : He(this.hass, e.trunk)
      )
    }) : l}
        </div>
      </ha-card>
    `;
  }
};
j.styles = [
  ct,
  Ct,
  lt,
  At,
  Ke,
  b`
      .body {
        display: grid;
        grid-template-columns: minmax(140px, 1fr) 1.2fr;
        gap: 16px;
        padding: 16px;
        align-items: start;
      }
      @media (max-width: 520px) {
        .body {
          grid-template-columns: 1fr;
        }
      }
      .hero {
        border-radius: 8px;
        overflow: hidden;
        background: linear-gradient(145deg, #e8eef2, #f7fafc);
        min-height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .car-img {
        width: 100%;
        height: auto;
        display: block;
        object-fit: contain;
        max-height: 180px;
      }
      .car-placeholder {
        color: var(--ck-muted);
        font-size: 0.9rem;
        padding: 24px;
      }
      .vitals {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
    `
];
ht([
  v({ attribute: !1 })
], j.prototype, "hass", 2);
ht([
  g()
], j.prototype, "_config", 2);
ht([
  g()
], j.prototype, "_busy", 2);
j = ht([
  w("carlinko-overview")
], j);
var Qe = Object.defineProperty, Xe = Object.getOwnPropertyDescriptor, St = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Xe(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (i = (r ? o(t, s, i) : o(i)) || i);
  return r && i && Qe(t, s, i), i;
};
let st = class extends f {
  setConfig(e) {
    this._config = { ...e };
  }
  _schema() {
    return [
      {
        name: "device_id",
        label: "Vehicle device",
        selector: {
          device: {
            filter: { integration: "carlinko" }
          }
        }
      },
      {
        name: "title",
        label: "Title",
        selector: { text: {} }
      },
      {
        name: "image_entity",
        label: "Image override (optional)",
        selector: {
          entity: {
            domain: "image",
            filter: { integration: "carlinko" }
          }
        }
      }
    ];
  }
  _valueChanged(e) {
    var s;
    e.stopPropagation();
    const t = (s = e.detail) == null ? void 0 : s.value;
    t && (this._config = { ...t }, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  render() {
    return !this.hass || !this._config ? l : h`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema()}
        .computeLabel=${(e) => e.label || e.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
};
St([
  v({ attribute: !1 })
], st.prototype, "hass", 2);
St([
  g()
], st.prototype, "_config", 2);
st = St([
  w("carlinko-overview-editor")
], st);
var Ye = Object.defineProperty, ts = Object.getOwnPropertyDescriptor, dt = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? ts(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (i = (r ? o(t, s, i) : o(i)) || i);
  return r && i && Ye(t, s, i), i;
};
let R = class extends f {
  constructor() {
    super(...arguments), this._busy = !1;
  }
  setConfig(e) {
    if (!e || typeof e.device_id != "string")
      throw new Error("device_id is required");
    this._config = { ...e };
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
      title: "Charging"
    };
  }
  _slots() {
    return this._config ? at(this.hass, this._config, Oe) : {};
  }
  _run(e) {
    this.hass && kt(
      () => this._busy,
      (t) => {
        this._busy = t;
      },
      e,
      (t) => console.error("carlinko-charging action failed", t)
    );
  }
  render() {
    var s;
    if (!this._config)
      return h`<ha-card><div class="pad">Not configured</div></ha-card>`;
    if (!((s = this._config.device_id) != null && s.trim()))
      return h`<ha-card
        ><div class="pad">Select a CarLinko vehicle device</div></ha-card
      >`;
    if (!this.hass)
      return h`<ha-card><div class="pad">Waiting for Home Assistant…</div></ha-card>`;
    const e = this._slots(), t = A(this.hass, e.charging);
    return h`
      <ha-card>
        ${this._config.title ? h`<div class="header">${this._config.title}</div>` : l}
        <div class="body-pad">
          <div class="chips">
            ${e.charging && this.hass.states[e.charging] ? x(t ? "Charging" : "Not charging", {
      ok: t
    }) : l}
          </div>
          ${$(this, this.hass, "Charge state", e.charge_state)}
          ${$(this, this.hass, "Mode", e.charge_mode)}
          ${$(this, this.hass, "Remaining", e.charge_remaining)}
          ${$(this, this.hass, "Power", e.charge_power)}
        </div>
        ${e.charge_stop ? h`
              <div class="actions">
                ${y({
      label: "Stop charging",
      disabled: this._busy,
      onClick: () => this._run(() => tt(this.hass, e.charge_stop))
    })}
              </div>
            ` : l}
      </ha-card>
    `;
  }
};
R.styles = [
  ct,
  Ct,
  lt,
  At
];
dt([
  v({ attribute: !1 })
], R.prototype, "hass", 2);
dt([
  g()
], R.prototype, "_config", 2);
dt([
  g()
], R.prototype, "_busy", 2);
R = dt([
  w("carlinko-charging")
], R);
var es = Object.defineProperty, ss = Object.getOwnPropertyDescriptor, Et = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? ss(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (i = (r ? o(t, s, i) : o(i)) || i);
  return r && i && es(t, s, i), i;
};
let it = class extends f {
  setConfig(e) {
    this._config = { ...e };
  }
  _schema() {
    return [
      {
        name: "device_id",
        label: "Vehicle device",
        selector: {
          device: {
            filter: { integration: "carlinko" }
          }
        }
      },
      {
        name: "title",
        label: "Title",
        selector: { text: {} }
      }
    ];
  }
  _valueChanged(e) {
    var s;
    e.stopPropagation();
    const t = (s = e.detail) == null ? void 0 : s.value;
    t && (this._config = { ...t }, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  render() {
    return !this.hass || !this._config ? l : h`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema()}
        .computeLabel=${(e) => e.label || e.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
};
Et([
  v({ attribute: !1 })
], it.prototype, "hass", 2);
Et([
  g()
], it.prototype, "_config", 2);
it = Et([
  w("carlinko-charging-editor")
], it);
var is = Object.defineProperty, rs = Object.getOwnPropertyDescriptor, ut = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? rs(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (i = (r ? o(t, s, i) : o(i)) || i);
  return r && i && is(t, s, i), i;
};
const Kt = [
  { slot: "seat-fl", heat: "seat_heat_l", vent: "seat_vent_l" },
  { slot: "seat-fr", heat: "seat_heat_r", vent: "seat_vent_r" },
  { slot: "seat-rl", heat: "seat_heat_lr", vent: "seat_vent_lr" },
  { slot: "seat-rr", heat: "seat_heat_rr", vent: "seat_vent_rr" }
];
function ns(e) {
  return e.split(".", 1)[0];
}
function os(e) {
  return !e || e === "unknown" || e === "unavailable" ? "—" : e === "off" || e === "on" ? e : e.replace(/^level_?/i, "l").slice(0, 4);
}
let D = class extends f {
  constructor() {
    super(...arguments), this._busy = !1;
  }
  setConfig(e) {
    if (!e || typeof e.device_id != "string")
      throw new Error("device_id is required");
    this._config = { ...e };
  }
  getCardSize() {
    return 6;
  }
  static getConfigElement() {
    return document.createElement("carlinko-climate-editor");
  }
  static getStubConfig() {
    return {
      device_id: "",
      title: "Climate"
    };
  }
  _slots() {
    return this._config ? at(this.hass, this._config, Pe) : {};
  }
  _run(e) {
    this.hass && kt(
      () => this._busy,
      (t) => {
        this._busy = t;
      },
      e,
      (t) => console.error("carlinko-climate action failed", t)
    );
  }
  _nudgeTemp(e) {
    const t = this._slots().climate;
    if (!this.hass || !t)
      return;
    const s = Vt(this.hass, t);
    if (s === void 0)
      return;
    const r = Re(this.hass, t), i = De(this.hass, t), n = Be(this.hass, t), o = Math.min(n, Math.max(i, s + e * r));
    this._run(() => ze(this.hass, t, o));
  }
  _toggleClimate() {
    const e = this._slots().climate;
    if (!this.hass || !e)
      return;
    const t = Wt(this.hass, e);
    this._run(
      () => qe(this.hass, e, t ? "off" : "cool")
    );
  }
  _cycleSelect(e) {
    if (!this.hass)
      return;
    const t = We(this.hass, e);
    if (t.length === 0)
      return;
    const s = O(this.hass, e) ?? t[0], r = t.indexOf(s), i = t[(r + 1) % t.length];
    this._run(() => Ve(this.hass, e, i));
  }
  _toggleBinary(e) {
    if (!this.hass)
      return;
    const t = O(this.hass, e) === "on";
    this._run(
      () => t ? ee(this.hass, e) : te(this.hass, e)
    );
  }
  _seatControl(e, t) {
    var o;
    if (!e || !((o = this.hass) != null && o.states[e]))
      return l;
    const s = O(this.hass, e), r = ns(e), i = `${t}:${os(s)}`, n = r === "select" ? () => this._cycleSelect(e) : () => this._toggleBinary(e);
    return h`
      <button
        type="button"
        class="seat-btn"
        ?disabled=${this._busy}
        title=${s ?? ""}
        @click=${n}
      >
        ${i}
      </button>
    `;
  }
  _seatZone(e, t) {
    var i, n;
    const s = e.heat ? t[e.heat] : void 0, r = e.vent ? t[e.vent] : void 0;
    return (!s || !((i = this.hass) != null && i.states[s])) && (!r || !((n = this.hass) != null && n.states[r])) ? l : h`
      <div slot=${e.slot} class="seat-zone">
        ${this._seatControl(s, "H")} ${this._seatControl(r, "V")}
      </div>
    `;
  }
  render() {
    var d;
    if (!this._config)
      return h`<ha-card><div class="pad">Not configured</div></ha-card>`;
    if (!((d = this._config.device_id) != null && d.trim()))
      return h`<ha-card
        ><div class="pad">Select a CarLinko vehicle device</div></ha-card
      >`;
    if (!this.hass)
      return h`<ha-card><div class="pad">Waiting for Home Assistant…</div></ha-card>`;
    const e = this._slots(), t = e.climate, s = t ? this.hass.states[t] : void 0, r = Wt(this.hass, t), i = Vt(this.hass, t), n = je(this.hass, t), o = (typeof (s == null ? void 0 : s.attributes.temperature_unit) == "string" ? s.attributes.temperature_unit : void 0) || (typeof (s == null ? void 0 : s.attributes.unit_of_measurement) == "string" ? s.attributes.unit_of_measurement : "°C"), a = Kt.some((p) => {
      const u = p.heat ? e[p.heat] : void 0, _ = p.vent ? e[p.vent] : void 0;
      return u && this.hass.states[u] || _ && this.hass.states[_];
    }), c = xt(this.hass, e.image);
    return h`
      <ha-card>
        ${this._config.title ? h`<div class="header">${this._config.title}</div>` : l}
        <div class="body-pad">
          ${s || e.quick_cool || e.quick_heat ? h`
                <div class="actions-top">
                  ${s ? y({
      label: r ? "Climate off" : "Climate on",
      disabled: this._busy,
      variant: r ? "ok" : "",
      onClick: () => this._toggleClimate()
    }) : l}
                  ${e.quick_cool && this.hass.states[e.quick_cool] ? y({
      label: "Quick cool",
      disabled: this._busy,
      onClick: () => this._run(
        () => tt(this.hass, e.quick_cool)
      )
    }) : l}
                  ${e.quick_heat && this.hass.states[e.quick_heat] ? y({
      label: "Quick heat",
      disabled: this._busy,
      onClick: () => this._run(
        () => tt(this.hass, e.quick_heat)
      )
    }) : l}
                </div>
              ` : l}
          ${s ? h`
                <div class="setpoint-row">
                  <div class="setpoint">
                    <span class="setpoint-label">Setpoint</span>
                    <span class="setpoint-value"
                      >${i !== void 0 ? `${i}${o}` : "—"}</span
                    >
                    <div class="nudge">
                      <button
                        type="button"
                        class="action"
                        ?disabled=${this._busy || i === void 0}
                        @click=${() => this._nudgeTemp(-1)}
                      >
                        −
                      </button>
                      <button
                        type="button"
                        class="action"
                        ?disabled=${this._busy || i === void 0}
                        @click=${() => this._nudgeTemp(1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                ${n !== void 0 ? h`
                      <div class="current-row">
                        <span class="metric-label">Current</span>
                        <span class="metric-value">${n}${o}</span>
                      </div>
                    ` : l}
              ` : l}
          ${a ? h`
                <carlinko-car-outline .src=${c}>
                  ${Kt.map((p) => this._seatZone(p, e))}
                </carlinko-car-outline>
              ` : l}
        </div>
      </ha-card>
    `;
  }
};
D.styles = [
  ct,
  Ct,
  lt,
  At,
  b`
      .setpoint-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 12px;
      }
      .actions-top {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .setpoint {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
      }
      .setpoint-label {
        color: var(--ck-muted);
        font-size: 0.85rem;
      }
      .setpoint-value {
        font-weight: 600;
        font-size: 1.15rem;
        min-width: 3.5rem;
      }
      .nudge {
        display: flex;
        gap: 6px;
      }
      .nudge .action {
        min-width: 2.25rem;
        padding: 8px 10px;
        font-size: 1rem;
        font-weight: 600;
      }
      .current-row {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        padding: 4px 0;
      }
      .seat-zone {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .seat-btn {
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
      .seat-btn:hover:not(:disabled) {
        border-color: var(--ck-accent);
      }
      .seat-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      carlinko-car-outline {
        margin-top: 12px;
      }
    `
];
ut([
  v({ attribute: !1 })
], D.prototype, "hass", 2);
ut([
  g()
], D.prototype, "_config", 2);
ut([
  g()
], D.prototype, "_busy", 2);
D = ut([
  w("carlinko-climate")
], D);
var as = Object.defineProperty, cs = Object.getOwnPropertyDescriptor, Ot = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? cs(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (i = (r ? o(t, s, i) : o(i)) || i);
  return r && i && as(t, s, i), i;
};
let rt = class extends f {
  setConfig(e) {
    this._config = { ...e };
  }
  _schema() {
    return [
      {
        name: "device_id",
        label: "Vehicle device",
        selector: {
          device: {
            filter: { integration: "carlinko" }
          }
        }
      },
      {
        name: "title",
        label: "Title",
        selector: { text: {} }
      }
    ];
  }
  _valueChanged(e) {
    var s;
    e.stopPropagation();
    const t = (s = e.detail) == null ? void 0 : s.value;
    t && (this._config = { ...t }, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  render() {
    return !this.hass || !this._config ? l : h`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema()}
        .computeLabel=${(e) => e.label || e.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
};
Ot([
  v({ attribute: !1 })
], rt.prototype, "hass", 2);
Ot([
  g()
], rt.prototype, "_config", 2);
rt = Ot([
  w("carlinko-climate-editor")
], rt);
var ls = Object.defineProperty, hs = Object.getOwnPropertyDescriptor, Pt = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? hs(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (i = (r ? o(t, s, i) : o(i)) || i);
  return r && i && ls(t, s, i), i;
};
const ds = [
  { slot: "wheel-fl", pressure: "tyre_fl", temp: "tyre_fl_temp" },
  { slot: "wheel-fr", pressure: "tyre_fr", temp: "tyre_fr_temp" },
  { slot: "wheel-rl", pressure: "tyre_rl", temp: "tyre_rl_temp" },
  { slot: "wheel-rr", pressure: "tyre_rr", temp: "tyre_rr_temp" }
], us = ["tyre_fl", "tyre_fr", "tyre_rl", "tyre_rr"];
let Z = class extends f {
  setConfig(e) {
    if (!e || typeof e.device_id != "string")
      throw new Error("device_id is required");
    this._config = { ...e };
  }
  getCardSize() {
    return 5;
  }
  static getConfigElement() {
    return document.createElement("carlinko-tpms-editor");
  }
  static getStubConfig() {
    return {
      device_id: "",
      title: "TPMS"
    };
  }
  _slots() {
    return this._config ? at(this.hass, this._config, Te) : {};
  }
  _hasDirectTpms(e) {
    return this.hass ? us.some((t) => {
      const s = e[t];
      return !!(s && this.hass.states[s]);
    }) : !1;
  }
  _sensorBtn(e, t) {
    if (!this.hass || !e || !this.hass.states[e])
      return l;
    const s = S(this.hass, e);
    return h`
      <button
        type="button"
        class=${t}
        @click=${() => vt(this, e)}
      >
        ${s}
      </button>
    `;
  }
  _wheelZone(e, t) {
    var o, a;
    const s = t[e.pressure], r = t[e.temp], i = !!(s && ((o = this.hass) != null && o.states[s])), n = !!(r && ((a = this.hass) != null && a.states[r]));
    return !i && !n ? l : h`
      <div slot=${e.slot} class="wheel-zone">
        ${this._sensorBtn(s, "wheel-pressure")}
        ${this._sensorBtn(r, "wheel-temp")}
      </div>
    `;
  }
  render() {
    var a;
    if (!this._config)
      return h`<ha-card><div class="pad">Not configured</div></ha-card>`;
    if (!((a = this._config.device_id) != null && a.trim()))
      return h`<ha-card
        ><div class="pad">Select a CarLinko vehicle device</div></ha-card
      >`;
    if (!this.hass)
      return h`<ha-card><div class="pad">Waiting for Home Assistant…</div></ha-card>`;
    const e = this._slots(), t = this._hasDirectTpms(e), s = xt(this.hass, e.image), r = e.tyres_ok, i = r && this.hass.states[r] ? r : void 0, n = e.tyre_status && this.hass.states[e.tyre_status] ? e.tyre_status : void 0;
    return !(i || n || t) ? h`<ha-card
        ><div class="pad">No TPMS entities for this vehicle</div></ha-card
      >` : h`
      <ha-card>
        ${this._config.title ? h`<div class="header">${this._config.title}</div>` : l}
        <div class="body-pad">
          <div class="chips">
            ${i ? x(
      A(this.hass, i) ? "Tyres OK" : "Tyre problem",
      { ok: A(this.hass, i) }
    ) : l}
            ${n ? h`
                  <button
                    type="button"
                    class="chip chip-btn"
                    @click=${() => vt(this, n)}
                  >
                    ${S(this.hass, n)}
                  </button>
                ` : l}
          </div>
          ${t ? h`
                <carlinko-car-outline .src=${s}>
                  ${ds.map((c) => this._wheelZone(c, e))}
                </carlinko-car-outline>
              ` : l}
        </div>
      </ha-card>
    `;
  }
};
Z.styles = [
  ct,
  lt,
  b`
      .chip-btn {
        font: inherit;
        cursor: pointer;
        color: inherit;
      }
      .wheel-zone {
        display: flex;
        flex-direction: column;
        gap: 2px;
        align-items: flex-start;
      }
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
      .wheel-pressure {
        font-weight: 600;
      }
      .wheel-temp {
        color: var(--ck-muted);
      }
      .wheel-pressure:hover,
      .wheel-temp:hover {
        border-color: var(--ck-accent);
      }
      carlinko-car-outline {
        margin-top: 12px;
        max-width: 320px;
      }
    `
];
Pt([
  v({ attribute: !1 })
], Z.prototype, "hass", 2);
Pt([
  g()
], Z.prototype, "_config", 2);
Z = Pt([
  w("carlinko-tpms")
], Z);
var ps = Object.defineProperty, fs = Object.getOwnPropertyDescriptor, Tt = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? fs(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (i = (r ? o(t, s, i) : o(i)) || i);
  return r && i && ps(t, s, i), i;
};
let nt = class extends f {
  setConfig(e) {
    this._config = { ...e };
  }
  _schema() {
    return [
      {
        name: "device_id",
        label: "Vehicle device",
        selector: {
          device: {
            filter: { integration: "carlinko" }
          }
        }
      },
      {
        name: "title",
        label: "Title",
        selector: { text: {} }
      }
    ];
  }
  _valueChanged(e) {
    var s;
    e.stopPropagation();
    const t = (s = e.detail) == null ? void 0 : s.value;
    t && (this._config = { ...t }, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  render() {
    return !this.hass || !this._config ? l : h`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema()}
        .computeLabel=${(e) => e.label || e.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
};
Tt([
  v({ attribute: !1 })
], nt.prototype, "hass", 2);
Tt([
  g()
], nt.prototype, "_config", 2);
nt = Tt([
  w("carlinko-tpms-editor")
], nt);
window.customCards = window.customCards || [];
window.customCards.push(
  {
    type: "carlinko-overview",
    name: "CarLinko Overview",
    description: "Vehicle overview: image, ranges, vitals, and quick controls for ha-carlinko.",
    preview: !0
  },
  {
    type: "carlinko-charging",
    name: "CarLinko Charging",
    description: "Charging status, mode, remaining time, power, and stop charging.",
    preview: !0
  },
  {
    type: "carlinko-climate",
    name: "CarLinko Climate",
    description: "Cabin climate setpoint, on/off, quick cool/heat, and seat heat/vent.",
    preview: !0
  },
  {
    type: "carlinko-tpms",
    name: "CarLinko TPMS",
    description: "Tyre pressure and temperature per wheel, or overall status for indirect TPMS.",
    preview: !0
  }
);
console.info(
  "%c CARLINKO-CARD %c 0.1.0 ",
  "color:#fff;background:#0d9488;font-weight:700",
  "color:#0d9488;background:transparent;font-weight:700"
);
//# sourceMappingURL=carlinko-card.js.map
