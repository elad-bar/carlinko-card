/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = globalThis, _t = Y.ShadowRoot && (Y.ShadyCSS === void 0 || Y.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, mt = Symbol(), At = /* @__PURE__ */ new WeakMap();
let te = class {
  constructor(t, s, i) {
    if (this._$cssResult$ = !0, i !== mt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (_t && t === void 0) {
      const i = s !== void 0 && s.length === 1;
      i && (t = At.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && At.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const me = (e) => new te(typeof e == "string" ? e : e + "", void 0, mt), b = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((i, r, n) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[n + 1], e[0]);
  return new te(s, e, mt);
}, be = (e, t) => {
  if (_t) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const i = document.createElement("style"), r = Y.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = s.cssText, e.appendChild(i);
  }
}, Ot = _t ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const i of t.cssRules) s += i.cssText;
  return me(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ye, defineProperty: $e, getOwnPropertyDescriptor: we, getOwnPropertyNames: ke, getOwnPropertySymbols: xe, getPrototypeOf: Ce } = Object, O = globalThis, Et = O.trustedTypes, Se = Et ? Et.emptyScript : "", ht = O.reactiveElementPolyfillSupport, I = (e, t) => e, et = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Se : null;
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
} }, bt = (e, t) => !ye(e, t), Pt = { attribute: !0, type: String, converter: et, reflect: !1, useDefault: !1, hasChanged: bt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), O.litPropertyMetadata ?? (O.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Z = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = Pt) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(t, i, s);
      r !== void 0 && $e(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, s, i) {
    const { get: r, set: n } = we(this.prototype, t) ?? { get() {
      return this[s];
    }, set(o) {
      this[s] = o;
    } };
    return { get: r, set(o) {
      const l = r == null ? void 0 : r.call(this);
      n == null || n.call(this, o), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Pt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(I("elementProperties"))) return;
    const t = Ce(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(I("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(I("properties"))) {
      const s = this.properties, i = [...ke(s), ...xe(s)];
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
      for (const r of i) s.unshift(Ot(r));
    } else t !== void 0 && s.push(Ot(t));
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
    return be(t, this.constructor.elementStyles), t;
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
      const o = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : et).toAttribute(s, i.type);
      this._$Em = t, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(t, s) {
    var n, o;
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const l = i.getPropertyOptions(r), h = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((n = l.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? l.converter : et;
      this._$Em = r;
      const u = h.fromAttribute(s, l.type);
      this[r] = u ?? ((o = this._$Ej) == null ? void 0 : o.get(r)) ?? u, this._$Em = null;
    }
  }
  requestUpdate(t, s, i, r = !1, n) {
    var o;
    if (t !== void 0) {
      const l = this.constructor;
      if (r === !1 && (n = this[t]), i ?? (i = l.getPropertyOptions(t)), !((i.hasChanged ?? bt)(n, s) || i.useDefault && i.reflect && n === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(l._$Eu(t, i)))) return;
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
        const { wrapped: l } = o, h = this[n];
        l !== !0 || this._$AL.has(n) || h === void 0 || this.C(n, void 0, o, h);
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
Z.elementStyles = [], Z.shadowRootOptions = { mode: "open" }, Z[I("elementProperties")] = /* @__PURE__ */ new Map(), Z[I("finalized")] = /* @__PURE__ */ new Map(), ht == null || ht({ ReactiveElement: Z }), (O.reactiveElementVersions ?? (O.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = globalThis, Ht = (e) => e, st = W.trustedTypes, Tt = st ? st.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ee = "$lit$", A = `lit$${Math.random().toFixed(9).slice(2)}$`, se = "?" + A, Ae = `<${se}>`, T = document, z = () => T.createComment(""), q = (e) => e === null || typeof e != "object" && typeof e != "function", yt = Array.isArray, Oe = (e) => yt(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", dt = `[ 	
\f\r]`, j = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Mt = /-->/g, Nt = />/g, E = RegExp(`>|${dt}(?:([^\\s"'>=/]+)(${dt}*=${dt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Zt = /'/g, Lt = /"/g, ie = /^(?:script|style|textarea|title)$/i, Ee = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), a = Ee(1), U = Symbol.for("lit-noChange"), c = Symbol.for("lit-nothing"), Ut = /* @__PURE__ */ new WeakMap(), P = T.createTreeWalker(T, 129);
function re(e, t) {
  if (!yt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Tt !== void 0 ? Tt.createHTML(t) : t;
}
const Pe = (e, t) => {
  const s = e.length - 1, i = [];
  let r, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = j;
  for (let l = 0; l < s; l++) {
    const h = e[l];
    let u, p, d = -1, v = 0;
    for (; v < h.length && (o.lastIndex = v, p = o.exec(h), p !== null); ) v = o.lastIndex, o === j ? p[1] === "!--" ? o = Mt : p[1] !== void 0 ? o = Nt : p[2] !== void 0 ? (ie.test(p[2]) && (r = RegExp("</" + p[2], "g")), o = E) : p[3] !== void 0 && (o = E) : o === E ? p[0] === ">" ? (o = r ?? j, d = -1) : p[1] === void 0 ? d = -2 : (d = o.lastIndex - p[2].length, u = p[1], o = p[3] === void 0 ? E : p[3] === '"' ? Lt : Zt) : o === Lt || o === Zt ? o = E : o === Mt || o === Nt ? o = j : (o = E, r = void 0);
    const f = o === E && e[l + 1].startsWith("/>") ? " " : "";
    n += o === j ? h + Ae : d >= 0 ? (i.push(u), h.slice(0, d) + ee + h.slice(d) + A + f) : h + A + (d === -2 ? l : f);
  }
  return [re(e, n + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class K {
  constructor({ strings: t, _$litType$: s }, i) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const l = t.length - 1, h = this.parts, [u, p] = Pe(t, s);
    if (this.el = K.createElement(u, i), P.currentNode = this.el.content, s === 2 || s === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (r = P.nextNode()) !== null && h.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const d of r.getAttributeNames()) if (d.endsWith(ee)) {
          const v = p[o++], f = r.getAttribute(d).split(A), m = /([.?@])?(.*)/.exec(v);
          h.push({ type: 1, index: n, name: m[2], strings: f, ctor: m[1] === "." ? Te : m[1] === "?" ? Me : m[1] === "@" ? Ne : nt }), r.removeAttribute(d);
        } else d.startsWith(A) && (h.push({ type: 6, index: n }), r.removeAttribute(d));
        if (ie.test(r.tagName)) {
          const d = r.textContent.split(A), v = d.length - 1;
          if (v > 0) {
            r.textContent = st ? st.emptyScript : "";
            for (let f = 0; f < v; f++) r.append(d[f], z()), P.nextNode(), h.push({ type: 2, index: ++n });
            r.append(d[v], z());
          }
        }
      } else if (r.nodeType === 8) if (r.data === se) h.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = r.data.indexOf(A, d + 1)) !== -1; ) h.push({ type: 7, index: n }), d += A.length - 1;
      }
      n++;
    }
  }
  static createElement(t, s) {
    const i = T.createElement("template");
    return i.innerHTML = t, i;
  }
}
function B(e, t, s = e, i) {
  var o, l;
  if (t === U) return t;
  let r = i !== void 0 ? (o = s._$Co) == null ? void 0 : o[i] : s._$Cl;
  const n = q(t) ? void 0 : t._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== n && ((l = r == null ? void 0 : r._$AO) == null || l.call(r, !1), n === void 0 ? r = void 0 : (r = new n(e), r._$AT(e, s, i)), i !== void 0 ? (s._$Co ?? (s._$Co = []))[i] = r : s._$Cl = r), r !== void 0 && (t = B(e, r._$AS(e, t.values), r, i)), t;
}
class He {
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
    const { el: { content: s }, parts: i } = this._$AD, r = ((t == null ? void 0 : t.creationScope) ?? T).importNode(s, !0);
    P.currentNode = r;
    let n = P.nextNode(), o = 0, l = 0, h = i[0];
    for (; h !== void 0; ) {
      if (o === h.index) {
        let u;
        h.type === 2 ? u = new G(n, n.nextSibling, this, t) : h.type === 1 ? u = new h.ctor(n, h.name, h.strings, this, t) : h.type === 6 && (u = new Ze(n, this, t)), this._$AV.push(u), h = i[++l];
      }
      o !== (h == null ? void 0 : h.index) && (n = P.nextNode(), o++);
    }
    return P.currentNode = T, r;
  }
  p(t) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, s), s += i.strings.length - 2) : i._$AI(t[s])), s++;
  }
}
class G {
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
    t = B(this, t, s), q(t) ? t === c || t == null || t === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : t !== this._$AH && t !== U && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Oe(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== c && q(this._$AH) ? this._$AA.nextSibling.data = t : this.T(T.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: s, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = K.createElement(re(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === r) this._$AH.p(s);
    else {
      const o = new He(r, this), l = o.u(this.options);
      o.p(s), this.T(l), this._$AH = o;
    }
  }
  _$AC(t) {
    let s = Ut.get(t.strings);
    return s === void 0 && Ut.set(t.strings, s = new K(t)), s;
  }
  k(t) {
    yt(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, r = 0;
    for (const n of t) r === s.length ? s.push(i = new G(this.O(z()), this.O(z()), this, this.options)) : i = s[r], i._$AI(n), r++;
    r < s.length && (this._$AR(i && i._$AB.nextSibling, r), s.length = r);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, s); t !== this._$AB; ) {
      const r = Ht(t).nextSibling;
      Ht(t).remove(), t = r;
    }
  }
  setConnected(t) {
    var s;
    this._$AM === void 0 && (this._$Cv = t, (s = this._$AP) == null || s.call(this, t));
  }
}
class nt {
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
    if (n === void 0) t = B(this, t, s, 0), o = !q(t) || t !== this._$AH && t !== U, o && (this._$AH = t);
    else {
      const l = t;
      let h, u;
      for (t = n[0], h = 0; h < n.length - 1; h++) u = B(this, l[i + h], s, h), u === U && (u = this._$AH[h]), o || (o = !q(u) || u !== this._$AH[h]), u === c ? t = c : t !== c && (t += (u ?? "") + n[h + 1]), this._$AH[h] = u;
    }
    o && !r && this.j(t);
  }
  j(t) {
    t === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Te extends nt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === c ? void 0 : t;
  }
}
class Me extends nt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== c);
  }
}
class Ne extends nt {
  constructor(t, s, i, r, n) {
    super(t, s, i, r, n), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = B(this, t, s, 0) ?? c) === U) return;
    const i = this._$AH, r = t === c && i !== c || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== c && (i === c || r);
    r && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ze {
  constructor(t, s, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    B(this, t);
  }
}
const ut = W.litHtmlPolyfillSupport;
ut == null || ut(K, G), (W.litHtmlVersions ?? (W.litHtmlVersions = [])).push("3.3.3");
const Le = (e, t, s) => {
  const i = (s == null ? void 0 : s.renderBefore) ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const n = (s == null ? void 0 : s.renderBefore) ?? null;
    i._$litPart$ = r = new G(t.insertBefore(z(), n), n, void 0, s ?? {});
  }
  return r._$AI(e), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H = globalThis;
class $ extends Z {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Le(s, this.renderRoot, this.renderOptions);
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
    return U;
  }
}
var Yt;
$._$litElement$ = !0, $.finalized = !0, (Yt = H.litElementHydrateSupport) == null || Yt.call(H, { LitElement: $ });
const pt = H.litElementPolyfillSupport;
pt == null || pt({ LitElement: $ });
(H.litElementVersions ?? (H.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const g = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ue = { attribute: !0, type: String, converter: et, reflect: !1, hasChanged: bt }, Be = (e = Ue, t, s) => {
  const { kind: i, metadata: r } = s;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(s.name, e), i === "accessor") {
    const { name: o } = s;
    return { set(l) {
      const h = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(o, h, e, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, e, l), l;
    } };
  }
  if (i === "setter") {
    const { name: o } = s;
    return function(l) {
      const h = this[o];
      t.call(this, l), this.requestUpdate(o, h, e, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function M(e) {
  return (t, s) => typeof s == "object" ? Be(e, t, s) : ((i, r, n) => {
    const o = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, i), o ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function N(e) {
  return M({ ...e, state: !0, attribute: !1 });
}
async function $t(e, t, s, i) {
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
function De(e, t) {
  return e === t || e.endsWith(`_${t}`) ? !0 : e.startsWith("carlinko_") && e.endsWith(`_${t}`);
}
function Ve(e, t) {
  return t === "defrost" || t.endsWith("_left") || t.endsWith("_right") ? [e, "switch", "binary_sensor"] : [e];
}
function Re(e, t) {
  return !!(t && e.states[t]);
}
function je(e, t, s, i) {
  const r = e.entities;
  if (!r)
    return;
  const n = [];
  for (const l of Object.values(r)) {
    if (!(l != null && l.entity_id) || !l.unique_id || l.device_id !== t || l.disabled_by || l.hidden_by)
      continue;
    const h = l.entity_id.split(".", 1)[0];
    i.includes(h) && De(l.unique_id, s) && n.push(l.entity_id);
  }
  return n.length === 0 ? void 0 : n.find((l) => Re(e, l)) ?? n[0];
}
function Ie(e, t, s) {
  var o, l;
  if (!e)
    return;
  const i = (o = t.entities) == null ? void 0 : o[s.slot];
  if (i)
    return i;
  if (s.slot === "image" && t.image_entity)
    return t.image_entity;
  const r = (l = t.device_id) == null ? void 0 : l.trim();
  if (!r)
    return;
  const n = [s.key, ...s.fallbackKeys ?? []];
  for (const h of n) {
    const u = Ve(s.domain, h), p = je(e, r, h, u);
    if (p)
      return p;
  }
}
function wt(e, t, s) {
  const i = {};
  for (const r of s)
    i[r.slot] = Ie(e, t, r);
  return i;
}
const ne = [
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
  { slot: "tyres_ok", key: "tyres_ok", domain: "binary_sensor" },
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
  ne.map((e) => [e.slot, e])
);
const We = [
  { slot: "charging", key: "charging", domain: "binary_sensor" },
  { slot: "charge_state", key: "charge_state", domain: "sensor" },
  { slot: "charge_mode", key: "charge_mode", domain: "sensor" },
  { slot: "charge_remaining", key: "charge_remaining", domain: "sensor" },
  { slot: "charge_power", key: "charge_power", domain: "sensor" },
  { slot: "charge_stop", key: "charge_stop", domain: "button" }
], ze = [
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
  { slot: "sunroof_tilt", key: "sunroof_tilt", domain: "button" }
];
function R(e, t) {
  if (!(!e || !t))
    return e.states[t];
}
function w(e, t) {
  var s;
  return (s = R(e, t)) == null ? void 0 : s.state;
}
function Bt(e, t) {
  const s = w(e, t);
  if (s === void 0 || s === "unknown" || s === "unavailable")
    return;
  const i = Number(s);
  return Number.isFinite(i) ? i : void 0;
}
function tt(e, t) {
  const s = w(e, t);
  return s === "on" || s === "open" || s === "unlocked";
}
function Dt(e, t) {
  const s = R(e, t);
  if (!s)
    return !1;
  const i = s.state === "on";
  return s.attributes.device_class === "problem" ? i : !i;
}
function k(e, t, s = "—") {
  const i = R(e, t);
  if (!i || i.state === "unknown" || i.state === "unavailable")
    return s;
  const r = i.attributes.unit_of_measurement;
  return r ? `${i.state} ${r}` : String(i.state);
}
function vt(e, t) {
  if (/^https?:\/\//i.test(t))
    return t;
  const s = ((e == null ? void 0 : e.hassUrl) || "").replace(/\/$/, "");
  return s ? t.startsWith("/") ? `${s}${t}` : `${s}/${t}` : t;
}
function oe(e, t) {
  const s = R(e, t);
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
async function y(e, t, s, i, r = {}) {
  await e.callService(t, s, { ...r, entity_id: i });
}
async function qe(e, t) {
  await y(e, "lock", "lock", t);
}
async function Ke(e, t) {
  await y(e, "lock", "unlock", t);
}
async function ae(e, t) {
  const s = t.split(".", 1)[0];
  await y(e, s, "turn_on", t);
}
async function le(e, t) {
  const s = t.split(".", 1)[0];
  await y(e, s, "turn_off", t);
}
async function Fe(e, t) {
  const s = t.split(".", 1)[0];
  await y(e, s, "toggle", t);
}
async function ft(e, t) {
  await y(e, "cover", "open_cover", t);
}
async function gt(e, t) {
  await y(e, "cover", "close_cover", t);
}
function Vt(e, t) {
  const s = w(e, t);
  return s === "open" || s === "opening";
}
async function L(e, t) {
  await y(e, "button", "press", t);
}
function J(e, t, s) {
  const i = R(e, t);
  if (!i)
    return;
  const r = i.attributes[s];
  if (r == null)
    return;
  const n = Number(r);
  return Number.isFinite(n) ? n : void 0;
}
function Rt(e, t) {
  return J(e, t, "temperature");
}
function Ge(e, t) {
  return J(e, t, "current_temperature");
}
function Je(e, t) {
  return J(e, t, "target_temp_step") ?? 1;
}
function Qe(e, t) {
  return J(e, t, "min_temp") ?? 16;
}
function Xe(e, t) {
  return J(e, t, "max_temp") ?? 30;
}
function jt(e, t) {
  const s = w(e, t);
  return s === "cool" || s === "heat" || s === "heat_cool" || s === "auto" || s === "fan_only" || s === "dry" || s === "on";
}
async function Ye(e, t, s) {
  await y(e, "climate", "set_hvac_mode", t, {
    hvac_mode: s
  });
}
async function ts(e, t, s) {
  await y(e, "climate", "set_temperature", t, {
    temperature: s
  });
}
async function es(e, t, s) {
  await y(e, "select", "select_option", t, {
    option: s
  });
}
function ss(e, t) {
  const s = R(e, t), i = s == null ? void 0 : s.attributes.options;
  return Array.isArray(i) ? i.map(String) : [];
}
function S(e, t) {
  e.dispatchEvent(
    new CustomEvent("hass-more-info", {
      bubbles: !0,
      composed: !0,
      detail: { entityId: t }
    })
  );
}
const kt = b`
  :host {
    display: block;
    --ck-accent: #0d9488;
    --ck-ok: #16a34a;
    --ck-warn: #d97706;
    --ck-info: #2563eb;
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
`, ce = b`
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
`, is = b`
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
`, he = b`
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
  .action.icon svg {
    width: 1.25rem;
    height: 1.25rem;
    display: block;
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
`;
b`
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
const rs = b`
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
  .hotspot svg {
    width: 22px;
    height: 22px;
    display: block;
  }
  .hotspot:hover:not(:disabled) {
    border-color: currentColor;
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
`, ns = b`
  .vgauge {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    min-height: 120px;
  }
  .vgauge-bar-wrap {
    width: 14px;
    height: 120px;
    border-radius: 8px;
    background: var(--ck-border);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex-shrink: 0;
  }
  .vgauge-bar {
    width: 100%;
    border-radius: 8px 8px 0 0;
    background: var(--ck-ok);
    transition: height 0.2s ease;
  }
  .vgauge.tone-info .vgauge-bar {
    background: var(--ck-info);
  }
  .vgauge.tone-info .vgauge-pct {
    color: var(--ck-info);
  }
  .vgauge.tone-ok .vgauge-pct {
    color: var(--ck-ok);
  }
  .vgauge-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    padding-top: 0;
  }
  .vgauge-primary {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--ck-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    line-height: 1.2;
  }
  .vgauge-pct {
    font-size: 1.35rem;
    font-weight: 700;
    line-height: 1.15;
  }
  .vgauge-secondary {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--ck-text);
  }
  .vgauge-meta {
    font-size: 0.75rem;
    color: var(--ck-muted);
    margin-top: 2px;
  }
`;
function X(e, t, s, i, r) {
  if (!t || !i || !t.states[i])
    return c;
  let n = k(t, i);
  return a`
    <button
      type="button"
      class="metric"
      @click=${() => S(e, i)}
    >
      <span class="metric-label">${s}</span>
      <span class="metric-value">${n}</span>
    </button>
  `;
}
function _(e) {
  const t = e.variant || "", s = e.icon ? " icon" : "";
  return a`
    <button
      type="button"
      class="action ${t}${s}"
      aria-label=${e.label}
      title=${e.label}
      ?disabled=${e.disabled}
      @click=${e.onClick}
    >
      ${e.icon ?? e.label}
    </button>
  `;
}
function os(e, t) {
  return a`<span class="chip ${t != null && t.ok ? "ok" : ""}">${e}</span>`;
}
const as = {
  lock: a`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm3 8H9V7a3 3 0 1 1 6 0v3Z"
      />
    </svg>
  `,
  unlock: a`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a5 5 0 0 0-5 5h2a3 3 0 0 1 6 0v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Z"
      />
    </svg>
  `,
  engine: a`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 9V7h4v2h1.5l1-2H17v2h1a2 2 0 0 1 2 2v1h1v2h-1v1a2 2 0 0 1-2 2h-1.5l-1 2H11v-2H8.5L7 17H5v-2H3v-2h2v-1a2 2 0 0 1 2-2h0Zm2 2H7v4h2v-4Zm4 0h-2v4h2v-4Zm4 0h-2v4h2v-4Z"
      />
    </svg>
  `,
  defog: a`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 18h16v2H4v-2Zm2.5-3.5 1.4-1.4 2.1 2.1 1.4-1.4-2.1-2.1 2.1-2.1-1.4-1.4-2.1 2.1-2.1-2.1-1.4 1.4 2.1 2.1-2.1 2.1 1.4 1.4Zm9 0 1.4-1.4 2.1 2.1 1.4-1.4-2.1-2.1 2.1-2.1-1.4-1.4-2.1 2.1-2.1-2.1-1.4 1.4 2.1 2.1-2.1 2.1 1.4 1.4ZM4 4h16v2H4V4Z"
      />
    </svg>
  `,
  trunk: a`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M5 14h14l-1.5-5H6.5L5 14Zm-1 2v3h2v-1h12v1h2v-3H4Zm3.5-8h9l.8 2.5H6.7L8.5 8Z"
      />
    </svg>
  `,
  charge: a`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M11 2h2v5h3l-4 7h3l-5 8v-7H7l4-8V2Z"
      />
    </svg>
  `,
  signal: a`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-4.2-3.2 1.4 1.4a4 4 0 0 1 5.6 0l1.4-1.4a6 6 0 0 0-8.4 0Zm-2.8-2.8 1.4 1.4a8 8 0 0 1 11.2 0l1.4-1.4a10 10 0 0 0-14 0Z"
      />
    </svg>
  `,
  hv: a`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.92 2.01C18.72 1.42 18.16 1 17.5 1h-11c-.66 0-1.21.42-1.42 1.01L3 8v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1V8l-2.08-5.99ZM6.5 15c-.83 0-1.5-.67-1.5-1.5S5.67 12 6.5 12s1.5.67 1.5 1.5S7.33 15 6.5 15Zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5ZM5 7l1.5-4.5h11L19 7H5Zm8.5 1.5-4 6h2V18l4-6h-2V8.5Z"
      />
    </svg>
  `,
  tyre: a`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2a8 8 0 0 1 8 8 8 8 0 0 1-8 8 8 8 0 0 1-8-8 8 8 0 0 1 8-8Zm0 2.5A5.5 5.5 0 0 0 6.5 12 5.5 5.5 0 0 0 12 17.5 5.5 5.5 0 0 0 17.5 12 5.5 5.5 0 0 0 12 6.5Zm0 2A3.5 3.5 0 0 1 15.5 12 3.5 3.5 0 0 1 12 15.5 3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5Z"
      />
    </svg>
  `
};
function C(e) {
  const t = e.tone ?? "muted";
  return a`
    <button
      type="button"
      class="hotspot tone-${t}"
      aria-label=${e.label}
      title=${e.label}
      ?disabled=${e.disabled}
      @click=${e.onClick}
    >
      ${as[e.icon]}
    </button>
  `;
}
function It(e) {
  const { percent: t, primary: s, secondary: i, meta: r } = e;
  if (t === void 0 && !s && !i && !r)
    return c;
  const n = e.tone ?? "ok", o = t === void 0 || Number.isNaN(t) ? void 0 : Math.max(0, Math.min(100, t));
  return a`
    <div class="vgauge tone-${n}">
      <div
        class="vgauge-bar-wrap"
        aria-hidden=${o === void 0 ? "true" : "false"}
      >
        ${o !== void 0 ? a`<div class="vgauge-bar" style="height:${o}%"></div>` : c}
      </div>
      <div class="vgauge-text">
        ${s ? a`<div class="vgauge-primary">${s}</div>` : c}
        ${o !== void 0 ? a`<div class="vgauge-pct">${Math.round(o)}%</div>` : c}
        ${i ? a`<div class="vgauge-secondary">${i}</div>` : c}
        ${r ? a`<div class="vgauge-meta">${r}</div>` : c}
      </div>
    </div>
  `;
}
var ls = Object.defineProperty, cs = Object.getOwnPropertyDescriptor, de = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? cs(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (i ? o(t, s, r) : o(r)) || r);
  return i && r && ls(t, s, r), r;
};
let it = class extends $ {
  render() {
    const e = !!this.src;
    return a`
      <div class="wrap ${e ? "has-img" : ""}">
        ${e ? a`<img class="car-img" src=${this.src} alt="Vehicle top" />` : a`
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
      </div>
    `;
  }
};
it.styles = b`
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
      top: 54%;
    }
    .seat-rr {
      right: 18%;
      top: 54%;
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
    .windows {
      left: 50%;
      top: 29%;
      transform: translateX(-50%);
    }
    .sunroof {
      left: 50%;
      top: 58%;
      transform: translateX(-50%);
    }
  `;
de([
  M({ type: String })
], it.prototype, "src", 2);
it = de([
  g("carlinko-car-outline")
], it);
var hs = Object.defineProperty, ds = Object.getOwnPropertyDescriptor, ue = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? ds(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (i ? o(t, s, r) : o(r)) || r);
  return i && r && hs(t, s, r), r;
};
let rt = class extends $ {
  render() {
    const e = !!this.src;
    return a`
      <div class="wrap ${e ? "has-img" : ""}">
        ${e ? a`<img class="car-img" src=${this.src} alt="Vehicle" />` : a`<div class="placeholder"><slot name="placeholder">No image</slot></div>`}
        <div class="region engine"><slot name="engine"></slot></div>
        <div class="region lock"><slot name="lock"></slot></div>
        <div class="region online"><slot name="online"></slot></div>
        <div class="region hv"><slot name="hv"></slot></div>
        <div class="region tyres"><slot name="tyres"></slot></div>
        <div class="region defog"><slot name="defog"></slot></div>
        <div class="region charge"><slot name="charge"></slot></div>
        <div class="region trunk"><slot name="trunk"></slot></div>
      </div>
    `;
  }
};
rt.styles = b`
    :host {
      display: block;
      width: 100%;
    }
    .wrap {
      position: relative;
      width: 100%;
      min-height: 120px;
      border-radius: var(--ha-card-border-radius, 12px);
      overflow: visible;
      background: var(--ha-card-background, linear-gradient(145deg, #e8eef2, #f7fafc));
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
      color: var(--ck-muted, #667);
      font-size: 0.9rem;
      padding: 24px;
    }
    .region {
      position: absolute;
      transform: translate(-50%, -50%);
      z-index: 1;
      pointer-events: auto;
    }
    /* Status row: online, HV, tyres */
    .online {
      left: 5%;
      top: 11%;
    }
    .hv {
      left: 16%;
      top: 11%;
    }
    .tyres {
      left: 27%;
      top: 11%;
    }
    .engine {
      left: 34%;
      top: 47%;
    }
    .defog {
      left: 45%;
      top: 32%;
    }
    .lock {
      left: 69%;
      top: 52%;
    }
    .charge {
      left: 84%;
      top: 41%;
    }
    .trunk {
      left: 80%;
      top: 18%;
    }
  `;
ue([
  M({ type: String })
], rt.prototype, "src", 2);
rt = ue([
  g("carlinko-vehicle-stage")
], rt);
var us = Object.defineProperty, ps = Object.getOwnPropertyDescriptor, ot = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? ps(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (i ? o(t, s, r) : o(r)) || r);
  return i && r && us(t, s, r), r;
};
function vs(e) {
  switch ((e || "unknown").toLowerCase()) {
    case "ready":
      return { label: "HV ready", tone: "ok" };
    case "lv":
      return { label: "HV LV", tone: "info" };
    case "off":
      return { label: "HV off", tone: "muted" };
    default:
      return { label: "HV unknown", tone: "warn" };
  }
}
let D = class extends $ {
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
    return this._config ? wt(this.hass, this._config, ne) : {};
  }
  _run(e) {
    this.hass && $t(
      () => this._busy,
      (t) => {
        this._busy = t;
      },
      e,
      (t) => console.error("carlinko-overview action failed", t)
    );
  }
  render() {
    var Ct, St;
    if (!this._config)
      return a`<ha-card><div class="pad">Not configured</div></ha-card>`;
    if (!((Ct = this._config.device_id) != null && Ct.trim()))
      return a`<ha-card
        ><div class="pad">Select a CarLinko vehicle device</div></ha-card
      >`;
    if (!this.hass)
      return a`<ha-card><div class="pad">Waiting for Home Assistant…</div></ha-card>`;
    const e = this._slots(), t = oe(this.hass, e.image), i = w(this.hass, e.lock) === "locked", r = tt(this.hass, e.engine), n = tt(this.hass, e.defog), o = w(this.hass, e.trunk) === "open", l = tt(this.hass, e.online), h = Bt(this.hass, e.battery), u = Bt(this.hass, e.fuel), p = !!((St = e.defog) != null && St.startsWith("binary_sensor.")), d = e.odometer && this.hass.states[e.odometer] ? k(this.hass, e.odometer) : void 0, v = e.total_range && this.hass.states[e.total_range] ? k(this.hass, e.total_range) : void 0, f = r && e.engine && e.speed && this.hass.states[e.speed] ? k(this.hass, e.speed) : void 0, m = e.range && this.hass.states[e.range] ? k(this.hass, e.range) : void 0, xt = e.fuel_range && this.hass.states[e.fuel_range] ? k(this.hass, e.fuel_range) : void 0, ve = w(this.hass, e.hv_state), ct = e.hv_state ? vs(ve) : void 0, fe = e.consumption && this.hass.states[e.consumption] ? k(this.hass, e.consumption) : void 0, ge = e.fuel_consumption && this.hass.states[e.fuel_consumption] ? k(this.hass, e.fuel_consumption) : void 0, _e = !!(d || v || f);
    return a`
      <ha-card>
        ${this._config.title ? a`<div class="header">${this._config.title}</div>` : c}
        <div class="body">
          <div class="hero">
            <carlinko-vehicle-stage .src=${t}>
              ${e.engine ? a`<div slot="engine">
                    ${C({
      icon: "engine",
      label: r ? "Turn engine off" : "Turn engine on",
      tone: r ? "ok" : "muted",
      disabled: this._busy,
      onClick: () => this._run(
        () => r ? le(this.hass, e.engine) : ae(this.hass, e.engine)
      )
    })}
                  </div>` : c}
              ${e.lock ? a`<div slot="lock">
                    ${C({
      icon: i ? "lock" : "unlock",
      label: i ? "Unlock doors" : "Lock doors",
      tone: i ? "muted" : "danger",
      disabled: this._busy,
      onClick: () => this._run(
        () => i ? Ke(this.hass, e.lock) : qe(this.hass, e.lock)
      )
    })}
                  </div>` : c}
              ${e.online ? a`<div slot="online">
                    ${C({
      icon: "signal",
      label: l ? "Online" : "Offline",
      tone: l ? "ok" : "muted",
      onClick: () => S(this, e.online)
    })}
                  </div>` : c}
              ${e.hv_state && ct ? a`<div slot="hv">
                    ${C({
      icon: "hv",
      label: ct.label,
      tone: ct.tone,
      onClick: () => S(this, e.hv_state)
    })}
                  </div>` : c}
              ${e.tyres_ok ? a`<div slot="tyres">
                    ${C({
      icon: "tyre",
      label: Dt(this.hass, e.tyres_ok) ? "Tyre problem" : "Tyres OK",
      tone: Dt(this.hass, e.tyres_ok) ? "danger" : "ok",
      onClick: () => S(this, e.tyres_ok)
    })}
                  </div>` : c}
              ${e.defog ? a`<div slot="defog">
                    ${C({
      icon: "defog",
      label: n ? "Turn defog off" : "Turn defog on",
      tone: n ? "warn" : "muted",
      disabled: this._busy || p,
      onClick: () => this._run(() => Fe(this.hass, e.defog))
    })}
                  </div>` : c}
              ${e.charge_stop ? a`<div slot="charge">
                    ${C({
      icon: "charge",
      label: "Stop charge",
      tone: "info",
      disabled: this._busy,
      onClick: () => this._run(
        () => L(this.hass, e.charge_stop)
      )
    })}
                  </div>` : c}
              ${e.trunk ? a`<div slot="trunk">
                    ${C({
      icon: "trunk",
      label: o ? "Close trunk" : "Open trunk",
      tone: o ? "warn" : "muted",
      disabled: this._busy,
      onClick: () => this._run(
        () => o ? gt(this.hass, e.trunk) : ft(this.hass, e.trunk)
      )
    })}
                  </div>` : c}
            </carlinko-vehicle-stage>
          </div>
          <div class="vitals">
            ${_e ? a`
                  <div class="headline">
                    ${d ? a`<button
                          type="button"
                          class="odo"
                          @click=${() => S(this, e.odometer)}
                        >
                          <span class="odo-label">Odometer</span>
                          <span class="odo-value">${d}</span>
                        </button>` : c}
                    ${v ? a`<button
                          type="button"
                          class="range-total"
                          @click=${() => S(this, e.total_range)}
                        >
                          <span class="range-label">Total range</span>
                          <span class="range-value">${v}</span>
                        </button>` : c}
                    ${f ? a`<button
                          type="button"
                          class="speed"
                          @click=${() => S(this, e.speed)}
                        >
                          <span class="speed-label">Speed</span>
                          <span class="speed-value">${f}</span>
                        </button>` : c}
                  </div>
                ` : c}
            <div class="gauges">
              ${It({
      percent: h,
      primary: h !== void 0 || m ? "SOC" : void 0,
      secondary: m,
      meta: fe,
      tone: "ok"
    })}
              ${It({
      percent: u,
      primary: u !== void 0 || xt ? "Fuel" : void 0,
      secondary: xt,
      meta: ge,
      tone: "info"
    })}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
D.styles = [
  kt,
  rs,
  ns,
  b`
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
      }
      .odo-value,
      .range-value,
      .speed-value {
        font-size: 1.35rem;
        font-weight: 700;
        letter-spacing: 0.02em;
        line-height: 1.2;
      }
      .gauges {
        display: flex;
        flex-wrap: wrap;
        gap: 24px;
      }
    `
];
ot([
  M({ attribute: !1 })
], D.prototype, "hass", 2);
ot([
  N()
], D.prototype, "_config", 2);
ot([
  N()
], D.prototype, "_busy", 2);
D = ot([
  g("carlinko-overview")
], D);
var fs = Object.defineProperty, pe = (e, t, s, i) => {
  for (var r = void 0, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = o(t, s, r) || r);
  return r && fs(t, s, r), r;
};
const gs = [
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
], _s = {
  name: "image_entity",
  label: "Image override (optional)",
  selector: {
    entity: {
      domain: "image",
      filter: { integration: "carlinko" }
    }
  }
}, ms = {
  name: "image_entity",
  label: "Top image override (optional)",
  selector: {
    entity: {
      domain: "image",
      filter: { integration: "carlinko" }
    }
  }
};
class Q extends $ {
  setConfig(t) {
    this._config = { ...t };
  }
  /** Extra fields after device_id + title. */
  extraSchema() {
    return [];
  }
  _schema() {
    return [...gs, ...this.extraSchema()];
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
    return !this.hass || !this._config ? c : a`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema()}
        .computeLabel=${(t) => t.label || t.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
}
pe([
  M({ attribute: !1 })
], Q.prototype, "hass");
pe([
  N()
], Q.prototype, "_config");
var bs = Object.getOwnPropertyDescriptor, ys = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? bs(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = o(r) || r);
  return r;
};
let Wt = class extends Q {
  extraSchema() {
    return [_s];
  }
};
Wt = ys([
  g("carlinko-overview-editor")
], Wt);
var $s = Object.defineProperty, ws = Object.getOwnPropertyDescriptor, at = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? ws(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (i ? o(t, s, r) : o(r)) || r);
  return i && r && $s(t, s, r), r;
};
let V = class extends $ {
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
    return this._config ? wt(this.hass, this._config, We) : {};
  }
  _run(e) {
    this.hass && $t(
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
      return a`<ha-card><div class="pad">Not configured</div></ha-card>`;
    if (!((s = this._config.device_id) != null && s.trim()))
      return a`<ha-card
        ><div class="pad">Select a CarLinko vehicle device</div></ha-card
      >`;
    if (!this.hass)
      return a`<ha-card><div class="pad">Waiting for Home Assistant…</div></ha-card>`;
    const e = this._slots(), t = tt(this.hass, e.charging);
    return a`
      <ha-card>
        ${this._config.title ? a`<div class="header">${this._config.title}</div>` : c}
        <div class="body-pad">
          <div class="chips">
            ${e.charging && this.hass.states[e.charging] ? os(t ? "Charging" : "Not charging", {
      ok: t
    }) : c}
          </div>
          ${X(this, this.hass, "Charge state", e.charge_state)}
          ${X(this, this.hass, "Mode", e.charge_mode)}
          ${X(this, this.hass, "Remaining", e.charge_remaining)}
          ${X(this, this.hass, "Power", e.charge_power)}
        </div>
        ${e.charge_stop ? a`
              <div class="actions">
                ${_({
      label: "Stop charging",
      disabled: this._busy,
      onClick: () => this._run(() => L(this.hass, e.charge_stop))
    })}
              </div>
            ` : c}
      </ha-card>
    `;
  }
};
V.styles = [
  kt,
  ce,
  is,
  he
];
at([
  M({ attribute: !1 })
], V.prototype, "hass", 2);
at([
  N()
], V.prototype, "_config", 2);
at([
  N()
], V.prototype, "_busy", 2);
V = at([
  g("carlinko-charging")
], V);
var ks = Object.getOwnPropertyDescriptor, xs = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? ks(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = o(r) || r);
  return r;
};
let zt = class extends Q {
};
zt = xs([
  g("carlinko-charging-editor")
], zt);
var Cs = Object.defineProperty, Ss = Object.getOwnPropertyDescriptor, lt = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? Ss(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (i ? o(t, s, r) : o(r)) || r);
  return i && r && Cs(t, s, r), r;
};
const qt = [
  { slot: "seat-fl", heat: "seat_heat_l", vent: "seat_vent_l" },
  { slot: "seat-fr", heat: "seat_heat_r", vent: "seat_vent_r" },
  { slot: "seat-rl", heat: "seat_heat_lr", vent: "seat_vent_lr" },
  { slot: "seat-rr", heat: "seat_heat_rr", vent: "seat_vent_rr" }
], As = [
  { slot: "wheel-fl", pressure: "tyre_fl", temp: "tyre_fl_temp" },
  { slot: "wheel-fr", pressure: "tyre_fr", temp: "tyre_fr_temp" },
  { slot: "wheel-rl", pressure: "tyre_rl", temp: "tyre_rl_temp" },
  { slot: "wheel-rr", pressure: "tyre_rr", temp: "tyre_rr_temp" }
], Os = ["tyre_fl", "tyre_fr", "tyre_rl", "tyre_rr"], Es = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M13 3h-2v10h2V3Zm4.83 2.17-1.42 1.42A6.92 6.92 0 0 1 19 12a7 7 0 1 1-14 0c0-2.12.95-4.03 2.47-5.32L6.05 5.17A8.96 8.96 0 0 0 3 12a9 9 0 1 0 18 0c0-2.74-1.22-5.2-3.17-6.83Z"
    />
  </svg>
`, Ps = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5Z" />
  </svg>
`, Hs = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M5 11h14v2H5v-2Z" />
  </svg>
`, Ts = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2v3.5l1.5-1.5 1 1L12 8l-2.5-2.5 1-1L12 5.5V2Zm0 20v-3.5l-1.5 1.5-1-1L12 16l2.5 2.5-1 1L12 18.5V22Zm10-10h-3.5l1.5 1.5-1 1L16 12l2.5-2.5 1 1L18.5 12H22ZM2 12h3.5L4 10.5l1-1L8 12l-2.5 2.5-1-1L5.5 12H2Zm14.95-6.36-1.41 1.41.71.71L14.83 9.5l-1.41-1.41.71-.71 1.41 1.41ZM9.17 14.5l1.41 1.41-.71.71-1.41-1.41.71-.71ZM9.17 9.5l.71.71-1.41 1.41-.71-.71L9.17 9.5Zm5.66 5.66.71.71-1.41 1.41-.71-.71 1.41-1.41Z"
    />
  </svg>
`, Ms = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M17.66 11.2c.03 1.6-1.02 2.96-2.28 4.05C15.31 16.1 14 17.45 13.15 19c-.55.9-.98 1.93-.85 3h.85c.22-1.19.78-2.2 1.4-3.08.68-.96 1.43-1.86 2.07-2.85.89-1.38 1.53-2.9 1.34-4.52-.11-.94-.5-1.86-1.1-2.62.55.9.9 1.97.8 3.07ZM12 2S9 7 9 11c0 2.4 1.34 4.37 3 5.6 1.66-1.23 3-3.2 3-5.6 0-4-3-9-3-9Zm0 12.5c-.83-.9-1.5-2.1-1.5-3.5 0-1.8.9-4.1 1.5-5.7.6 1.6 1.5 3.9 1.5 5.7 0 1.4-.67 2.6-1.5 3.5Z"
    />
  </svg>
`, Ns = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 4h16v16H4V4Zm2 2v12h5V6H6Zm7 0v5h5V6h-5Zm0 7v5h5v-5h-5Z"
    />
  </svg>
`, Zs = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 4h16v16H4V4Zm2 2v12h12V6H6Z"
    />
  </svg>
`, Ls = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 4h16v16H4V4Zm2 2v5h12V6H6Zm0 7v5h12v-5H6Z"
    />
  </svg>
`, Us = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M3 6h18v3H3V6Zm2 5h14v8H5v-8Zm3 2v4h8v-4H8Z"
    />
  </svg>
`, Bs = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M3 6h18v3H3V6Zm2 5h14v8H5v-8Z"
    />
  </svg>
`, Ds = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M3 8h18v2H3V8Zm2 4 14 2v6H5v-8Zm2 3.3V18h10v-2.3l-10-1.4Z"
    />
  </svg>
`;
function Vs(e) {
  return e.split(".", 1)[0];
}
function Rs(e) {
  return !e || e === "unknown" || e === "unavailable" ? "—" : e === "off" || e === "on" ? e : e.replace(/^level_?/i, "l").slice(0, 4);
}
let x = class extends $ {
  constructor() {
    super(...arguments), this._busy = !1;
  }
  setConfig(e) {
    if (!e || typeof e.device_id != "string")
      throw new Error("device_id is required");
    this._config = { ...e };
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
      title: "Cabin"
    };
  }
  _slots() {
    return this._config ? wt(this.hass, this._config, ze) : {};
  }
  _run(e) {
    this.hass && $t(
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
    const s = Rt(this.hass, t);
    if (s === void 0)
      return;
    const i = Je(this.hass, t), r = Qe(this.hass, t), n = Xe(this.hass, t), o = Math.min(n, Math.max(r, s + e * i));
    this._run(() => ts(this.hass, t, o));
  }
  _toggleClimate() {
    const e = this._slots().climate;
    if (!this.hass || !e)
      return;
    const t = jt(this.hass, e);
    this._run(
      () => Ye(this.hass, e, t ? "off" : "cool")
    );
  }
  _cycleSelect(e) {
    if (!this.hass)
      return;
    const t = ss(this.hass, e);
    if (t.length === 0)
      return;
    const s = w(this.hass, e) ?? t[0], i = t.indexOf(s), r = t[(i + 1) % t.length];
    this._run(() => es(this.hass, e, r));
  }
  _toggleBinary(e) {
    if (!this.hass)
      return;
    const t = w(this.hass, e) === "on";
    this._run(
      () => t ? le(this.hass, e) : ae(this.hass, e)
    );
  }
  _hasDirectTpms(e) {
    return this.hass ? Os.some((t) => {
      const s = e[t];
      return !!(s && this.hass.states[s]);
    }) : !1;
  }
  _hasSeats(e) {
    return this.hass ? qt.some((t) => {
      const s = t.heat ? e[t.heat] : void 0, i = t.vent ? e[t.vent] : void 0;
      return s && this.hass.states[s] || i && this.hass.states[i];
    }) : !1;
  }
  _seatControl(e, t) {
    var o;
    if (!e || !((o = this.hass) != null && o.states[e]))
      return c;
    const s = w(this.hass, e), i = Vs(e), r = `${t}:${Rs(s)}`, n = i === "select" ? () => this._cycleSelect(e) : () => this._toggleBinary(e);
    return a`
      <button
        type="button"
        class="seat-btn"
        ?disabled=${this._busy}
        title=${s ?? ""}
        @click=${n}
      >
        ${r}
      </button>
    `;
  }
  _seatZone(e, t) {
    var r, n;
    const s = e.heat ? t[e.heat] : void 0, i = e.vent ? t[e.vent] : void 0;
    return (!s || !((r = this.hass) != null && r.states[s])) && (!i || !((n = this.hass) != null && n.states[i])) ? c : a`
      <div slot=${e.slot} class="seat-zone">
        ${this._seatControl(s, "H")} ${this._seatControl(i, "V")}
      </div>
    `;
  }
  _sensorBtn(e, t) {
    if (!this.hass || !e || !this.hass.states[e])
      return c;
    const s = k(this.hass, e);
    return a`
      <button
        type="button"
        class=${t}
        @click=${() => S(this, e)}
      >
        ${s}
      </button>
    `;
  }
  _wheelZone(e, t) {
    var o, l;
    const s = t[e.pressure], i = t[e.temp], r = !!(s && ((o = this.hass) != null && o.states[s])), n = !!(i && ((l = this.hass) != null && l.states[i]));
    return !r && !n ? c : a`
      <div slot=${e.slot} class="wheel-zone">
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
  _windowsCluster(e) {
    const t = e.windows, s = e.windows_vent, i = this._entityExists(t), r = this._entityExists(s);
    if (!i && !r)
      return c;
    const n = i && Vt(this.hass, t);
    return a`
      <div slot="windows" class="map-actions">
        ${i ? _(n ? {
      label: "Close windows",
      icon: Zs,
      disabled: this._busy,
      onClick: () => this._run(() => gt(this.hass, t))
    } : {
      label: "Open windows",
      icon: Ns,
      disabled: this._busy,
      onClick: () => this._run(() => ft(this.hass, t))
    }) : c}
        ${r ? _({
      label: "Vent windows",
      icon: Ls,
      disabled: this._busy,
      onClick: () => this._run(() => L(this.hass, s))
    }) : c}
      </div>
    `;
  }
  _sunroofCluster(e) {
    const t = e.sunroof, s = e.sunroof_tilt, i = this._entityExists(t), r = this._entityExists(s);
    if (!i && !r)
      return c;
    const n = i && Vt(this.hass, t);
    return a`
      <div slot="sunroof" class="map-actions">
        ${i ? _(n ? {
      label: "Close sunroof",
      icon: Bs,
      disabled: this._busy,
      onClick: () => this._run(() => gt(this.hass, t))
    } : {
      label: "Open sunroof",
      icon: Us,
      disabled: this._busy,
      onClick: () => this._run(() => ft(this.hass, t))
    }) : c}
        ${r ? _({
      label: "Tilt sunroof",
      icon: Ds,
      disabled: this._busy,
      onClick: () => this._run(() => L(this.hass, s))
    }) : c}
      </div>
    `;
  }
  render() {
    var f;
    if (!this._config)
      return a`<ha-card><div class="pad">Not configured</div></ha-card>`;
    if (!((f = this._config.device_id) != null && f.trim()))
      return a`<ha-card
        ><div class="pad">Select a CarLinko vehicle device</div></ha-card
      >`;
    if (!this.hass)
      return a`<ha-card><div class="pad">Waiting for Home Assistant…</div></ha-card>`;
    const e = this._slots(), t = e.climate, s = t ? this.hass.states[t] : void 0, i = jt(this.hass, t), r = Rt(this.hass, t), n = Ge(this.hass, t), o = (typeof (s == null ? void 0 : s.attributes.temperature_unit) == "string" ? s.attributes.temperature_unit : void 0) || (typeof (s == null ? void 0 : s.attributes.unit_of_measurement) == "string" ? s.attributes.unit_of_measurement : "°C"), l = this._hasSeats(e), h = this._hasDirectTpms(e), u = this._hasWindowsControls(e), p = oe(this.hass, e.image), d = l || h || u, v = !!(s || e.quick_cool && this.hass.states[e.quick_cool] || e.quick_heat && this.hass.states[e.quick_heat]);
    return a`
      <ha-card>
        ${this._config.title ? a`<div class="header">${this._config.title}</div>` : c}
        <div class="body-pad">
          ${v ? a`
                <div class="controls-row">
                  <div class="controls-left">
                    ${s ? a`
                          ${_({
      label: i ? "Climate off" : "Climate on",
      icon: Es,
      disabled: this._busy,
      variant: i ? "ok" : "",
      onClick: () => this._toggleClimate()
    })}
                          ${_({
      label: "Increase temperature",
      icon: Ps,
      disabled: this._busy || r === void 0,
      onClick: () => this._nudgeTemp(1)
    })}
                          <span class="setpoint-value" title="Setpoint"
                            >${r !== void 0 ? `${r}${o}` : "—"}</span
                          >
                          ${_({
      label: "Decrease temperature",
      icon: Hs,
      disabled: this._busy || r === void 0,
      onClick: () => this._nudgeTemp(-1)
    })}
                        ` : c}
                  </div>
                  <div class="controls-right">
                    ${e.quick_cool && this.hass.states[e.quick_cool] ? _({
      label: "Quick cool",
      icon: Ts,
      disabled: this._busy,
      onClick: () => this._run(
        () => L(this.hass, e.quick_cool)
      )
    }) : c}
                    ${e.quick_heat && this.hass.states[e.quick_heat] ? _({
      label: "Quick heat",
      icon: Ms,
      disabled: this._busy,
      onClick: () => this._run(
        () => L(this.hass, e.quick_heat)
      )
    }) : c}
                  </div>
                </div>
              ` : c}
          ${s && n !== void 0 ? a`
                <div class="current-row">
                  <span class="metric-label">Current</span>
                  <span class="metric-value">${n}${o}</span>
                </div>
              ` : c}
          ${d ? a`
                <carlinko-car-outline .src=${p}>
                  ${this._windowsCluster(e)} ${this._sunroofCluster(e)}
                  ${qt.map((m) => this._seatZone(m, e))}
                  ${h ? As.map((m) => this._wheelZone(m, e)) : c}
                </carlinko-car-outline>
              ` : c}
        </div>
      </ha-card>
    `;
  }
};
x.styles = [
  kt,
  ce,
  he,
  b`
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
      .wheel-pressure {
        font-weight: 600;
      }
      .wheel-temp {
        color: var(--ck-muted);
      }
      .seat-btn:hover:not(:disabled),
      .wheel-pressure:hover,
      .wheel-temp:hover {
        border-color: var(--ck-accent);
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
      .map-actions .action.icon {
        width: 2rem;
        height: 2rem;
        min-width: 2rem;
        background: color-mix(in srgb, var(--ck-bg) 88%, transparent);
        backdrop-filter: blur(2px);
      }
      .map-actions .action.icon svg {
        width: 1.05rem;
        height: 1.05rem;
      }
      carlinko-car-outline {
        margin-top: 12px;
        max-width: 320px;
      }
    `
];
lt([
  M({ attribute: !1 })
], x.prototype, "hass", 2);
lt([
  N()
], x.prototype, "_config", 2);
lt([
  N()
], x.prototype, "_busy", 2);
x = lt([
  g("carlinko-cabin")
], x);
var js = Object.getOwnPropertyDescriptor, Is = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? js(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = o(r) || r);
  return r;
};
let F = class extends Q {
  extraSchema() {
    return [ms];
  }
};
F = Is([
  g("carlinko-cabin-editor")
], F);
var Ws = Object.getOwnPropertyDescriptor, zs = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? Ws(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = o(r) || r);
  return r;
};
let Kt = class extends x {
  static getConfigElement() {
    return document.createElement("carlinko-climate-editor");
  }
  static getStubConfig() {
    return {
      device_id: "",
      title: "Climate"
    };
  }
};
Kt = zs([
  g("carlinko-climate")
], Kt);
var qs = Object.getOwnPropertyDescriptor, Ks = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? qs(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = o(r) || r);
  return r;
};
let Ft = class extends F {
};
Ft = Ks([
  g("carlinko-climate-editor")
], Ft);
var Fs = Object.getOwnPropertyDescriptor, Gs = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? Fs(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = o(r) || r);
  return r;
};
let Gt = class extends x {
  static getConfigElement() {
    return document.createElement("carlinko-tpms-editor");
  }
  static getStubConfig() {
    return {
      device_id: "",
      title: "TPMS"
    };
  }
};
Gt = Gs([
  g("carlinko-tpms")
], Gt);
var Js = Object.getOwnPropertyDescriptor, Qs = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? Js(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = o(r) || r);
  return r;
};
let Jt = class extends F {
};
Jt = Qs([
  g("carlinko-tpms-editor")
], Jt);
var Xs = Object.getOwnPropertyDescriptor, Ys = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? Xs(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = o(r) || r);
  return r;
};
let Qt = class extends x {
  static getConfigElement() {
    return document.createElement("carlinko-windows-editor");
  }
  static getStubConfig() {
    return {
      device_id: "",
      title: "Windows"
    };
  }
};
Qt = Ys([
  g("carlinko-windows")
], Qt);
var ti = Object.getOwnPropertyDescriptor, ei = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? ti(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = o(r) || r);
  return r;
};
let Xt = class extends F {
};
Xt = ei([
  g("carlinko-windows-editor")
], Xt);
window.customCards = window.customCards || [];
window.customCards.push(
  {
    type: "carlinko-overview",
    name: "CarLinko Overview",
    description: "Vehicle overview: hotspot controls on the car image, visual ranges/vitals for ha-carlinko.",
    preview: !0
  },
  {
    type: "carlinko-charging",
    name: "CarLinko Charging",
    description: "Charging status, mode, remaining time, power, and stop charging.",
    preview: !0
  },
  {
    type: "carlinko-cabin",
    name: "CarLinko Cabin",
    description: "Climate, seats, TPMS, and windows/sunroof controls on a top-down vehicle map.",
    preview: !0
  }
);
console.info(
  "%c CARLINKO-CARD %c 0.1.0 ",
  "color:#fff;background:#0d9488;font-weight:700",
  "color:#0d9488;background:transparent;font-weight:700"
);
//# sourceMappingURL=carlinko-card.js.map
