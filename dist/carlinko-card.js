/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ee = globalThis, me = ee.ShadowRoot && (ee.ShadyCSS === void 0 || ee.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, be = Symbol(), Ee = /* @__PURE__ */ new WeakMap();
let st = class {
  constructor(e, s, r) {
    if (this._$cssResult$ = !0, r !== be) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = s;
  }
  get styleSheet() {
    let e = this.o;
    const s = this.t;
    if (me && e === void 0) {
      const r = s !== void 0 && s.length === 1;
      r && (e = Ee.get(s)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && Ee.set(s, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const $t = (t) => new st(typeof t == "string" ? t : t + "", void 0, be), y = (t, ...e) => {
  const s = t.length === 1 ? t[0] : e.reduce((r, i, o) => r + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + t[o + 1], t[0]);
  return new st(s, t, be);
}, kt = (t, e) => {
  if (me) t.adoptedStyleSheets = e.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of e) {
    const r = document.createElement("style"), i = ee.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = s.cssText, t.appendChild(r);
  }
}, Pe = me ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let s = "";
  for (const r of e.cssRules) s += r.cssText;
  return $t(s);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: xt, defineProperty: Ct, getOwnPropertyDescriptor: At, getOwnPropertyNames: St, getOwnPropertySymbols: Ot, getPrototypeOf: Et } = Object, O = globalThis, He = O.trustedTypes, Pt = He ? He.emptyScript : "", de = O.reactiveElementPolyfillSupport, z = (t, e) => t, se = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Pt : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let s = t;
  switch (e) {
    case Boolean:
      s = t !== null;
      break;
    case Number:
      s = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(t);
      } catch {
        s = null;
      }
  }
  return s;
} }, ye = (t, e) => !xt(t, e), Te = { attribute: !0, type: String, converter: se, reflect: !1, useDefault: !1, hasChanged: ye };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), O.litPropertyMetadata ?? (O.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Z = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, s = Te) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(e, s), !s.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(e, r, s);
      i !== void 0 && Ct(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, s, r) {
    const { get: i, set: o } = At(this.prototype, e) ?? { get() {
      return this[s];
    }, set(n) {
      this[s] = n;
    } };
    return { get: i, set(n) {
      const l = i == null ? void 0 : i.call(this);
      o == null || o.call(this, n), this.requestUpdate(e, l, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Te;
  }
  static _$Ei() {
    if (this.hasOwnProperty(z("elementProperties"))) return;
    const e = Et(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(z("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(z("properties"))) {
      const s = this.properties, r = [...St(s), ...Ot(s)];
      for (const i of r) this.createProperty(i, s[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const s = litPropertyMetadata.get(e);
      if (s !== void 0) for (const [r, i] of s) this.elementProperties.set(r, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, r] of this.elementProperties) {
      const i = this._$Eu(s, r);
      i !== void 0 && this._$Eh.set(i, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const s = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const i of r) s.unshift(Pe(i));
    } else e !== void 0 && s.push(Pe(e));
    return s;
  }
  static _$Eu(e, s) {
    const r = s.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((s) => this.enableUpdating = s), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((s) => s(this));
  }
  addController(e) {
    var s;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((s = e.hostConnected) == null || s.call(e));
  }
  removeController(e) {
    var s;
    (s = this._$EO) == null || s.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), s = this.constructor.elementProperties;
    for (const r of s.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return kt(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((s) => {
      var r;
      return (r = s.hostConnected) == null ? void 0 : r.call(s);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var r;
      return (r = s.hostDisconnected) == null ? void 0 : r.call(s);
    });
  }
  attributeChangedCallback(e, s, r) {
    this._$AK(e, r);
  }
  _$ET(e, s) {
    var o;
    const r = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, r);
    if (i !== void 0 && r.reflect === !0) {
      const n = (((o = r.converter) == null ? void 0 : o.toAttribute) !== void 0 ? r.converter : se).toAttribute(s, r.type);
      this._$Em = e, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(e, s) {
    var o, n;
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const l = r.getPropertyOptions(i), c = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((o = l.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? l.converter : se;
      this._$Em = i;
      const u = c.fromAttribute(s, l.type);
      this[i] = u ?? ((n = this._$Ej) == null ? void 0 : n.get(i)) ?? u, this._$Em = null;
    }
  }
  requestUpdate(e, s, r, i = !1, o) {
    var n;
    if (e !== void 0) {
      const l = this.constructor;
      if (i === !1 && (o = this[e]), r ?? (r = l.getPropertyOptions(e)), !((r.hasChanged ?? ye)(o, s) || r.useDefault && r.reflect && o === ((n = this._$Ej) == null ? void 0 : n.get(e)) && !this.hasAttribute(l._$Eu(e, r)))) return;
      this.C(e, s, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, s, { useDefault: r, reflect: i, wrapped: o }, n) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, n ?? s ?? this[e]), o !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (s = void 0), this._$AL.set(e, s)), i === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (s) {
      Promise.reject(s);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var r;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, n] of this._$Ep) this[o] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, n] of i) {
        const { wrapped: l } = n, c = this[o];
        l !== !0 || this._$AL.has(o) || c === void 0 || this.C(o, void 0, n, c);
      }
    }
    let e = !1;
    const s = this._$AL;
    try {
      e = this.shouldUpdate(s), e ? (this.willUpdate(s), (r = this._$EO) == null || r.forEach((i) => {
        var o;
        return (o = i.hostUpdate) == null ? void 0 : o.call(i);
      }), this.update(s)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(s);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var s;
    (s = this._$EO) == null || s.forEach((r) => {
      var i;
      return (i = r.hostUpdated) == null ? void 0 : i.call(r);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((s) => this._$ET(s, this[s]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
Z.elementStyles = [], Z.shadowRootOptions = { mode: "open" }, Z[z("elementProperties")] = /* @__PURE__ */ new Map(), Z[z("finalized")] = /* @__PURE__ */ new Map(), de == null || de({ ReactiveElement: Z }), (O.reactiveElementVersions ?? (O.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = globalThis, Me = (t) => t, re = I.trustedTypes, Ne = re ? re.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, rt = "$lit$", S = `lit$${Math.random().toFixed(9).slice(2)}$`, it = "?" + S, Ht = `<${it}>`, T = document, W = () => T.createComment(""), q = (t) => t === null || typeof t != "object" && typeof t != "function", we = Array.isArray, Tt = (t) => we(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", ue = `[ 	
\f\r]`, j = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ze = /-->/g, Le = />/g, E = RegExp(`>|${ue}(?:([^\\s"'>=/]+)(${ue}*=${ue}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ue = /'/g, Be = /"/g, ot = /^(?:script|style|textarea|title)$/i, Mt = (t) => (e, ...s) => ({ _$litType$: t, strings: e, values: s }), a = Mt(1), U = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), Ve = /* @__PURE__ */ new WeakMap(), P = T.createTreeWalker(T, 129);
function nt(t, e) {
  if (!we(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ne !== void 0 ? Ne.createHTML(e) : e;
}
const Nt = (t, e) => {
  const s = t.length - 1, r = [];
  let i, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = j;
  for (let l = 0; l < s; l++) {
    const c = t[l];
    let u, p, d = -1, v = 0;
    for (; v < c.length && (n.lastIndex = v, p = n.exec(c), p !== null); ) v = n.lastIndex, n === j ? p[1] === "!--" ? n = Ze : p[1] !== void 0 ? n = Le : p[2] !== void 0 ? (ot.test(p[2]) && (i = RegExp("</" + p[2], "g")), n = E) : p[3] !== void 0 && (n = E) : n === E ? p[0] === ">" ? (n = i ?? j, d = -1) : p[1] === void 0 ? d = -2 : (d = n.lastIndex - p[2].length, u = p[1], n = p[3] === void 0 ? E : p[3] === '"' ? Be : Ue) : n === Be || n === Ue ? n = E : n === Ze || n === Le ? n = j : (n = E, i = void 0);
    const g = n === E && t[l + 1].startsWith("/>") ? " " : "";
    o += n === j ? c + Ht : d >= 0 ? (r.push(u), c.slice(0, d) + rt + c.slice(d) + S + g) : c + S + (d === -2 ? l : g);
  }
  return [nt(t, o + (t[s] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class K {
  constructor({ strings: e, _$litType$: s }, r) {
    let i;
    this.parts = [];
    let o = 0, n = 0;
    const l = e.length - 1, c = this.parts, [u, p] = Nt(e, s);
    if (this.el = K.createElement(u, r), P.currentNode = this.el.content, s === 2 || s === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = P.nextNode()) !== null && c.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(rt)) {
          const v = p[n++], g = i.getAttribute(d).split(S), m = /([.?@])?(.*)/.exec(v);
          c.push({ type: 1, index: o, name: m[2], strings: g, ctor: m[1] === "." ? Lt : m[1] === "?" ? Ut : m[1] === "@" ? Bt : ne }), i.removeAttribute(d);
        } else d.startsWith(S) && (c.push({ type: 6, index: o }), i.removeAttribute(d));
        if (ot.test(i.tagName)) {
          const d = i.textContent.split(S), v = d.length - 1;
          if (v > 0) {
            i.textContent = re ? re.emptyScript : "";
            for (let g = 0; g < v; g++) i.append(d[g], W()), P.nextNode(), c.push({ type: 2, index: ++o });
            i.append(d[v], W());
          }
        }
      } else if (i.nodeType === 8) if (i.data === it) c.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = i.data.indexOf(S, d + 1)) !== -1; ) c.push({ type: 7, index: o }), d += S.length - 1;
      }
      o++;
    }
  }
  static createElement(e, s) {
    const r = T.createElement("template");
    return r.innerHTML = e, r;
  }
}
function B(t, e, s = t, r) {
  var n, l;
  if (e === U) return e;
  let i = r !== void 0 ? (n = s._$Co) == null ? void 0 : n[r] : s._$Cl;
  const o = q(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== o && ((l = i == null ? void 0 : i._$AO) == null || l.call(i, !1), o === void 0 ? i = void 0 : (i = new o(t), i._$AT(t, s, r)), r !== void 0 ? (s._$Co ?? (s._$Co = []))[r] = i : s._$Cl = i), i !== void 0 && (e = B(t, i._$AS(t, e.values), i, r)), e;
}
class Zt {
  constructor(e, s) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: s }, parts: r } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? T).importNode(s, !0);
    P.currentNode = i;
    let o = P.nextNode(), n = 0, l = 0, c = r[0];
    for (; c !== void 0; ) {
      if (n === c.index) {
        let u;
        c.type === 2 ? u = new G(o, o.nextSibling, this, e) : c.type === 1 ? u = new c.ctor(o, c.name, c.strings, this, e) : c.type === 6 && (u = new Vt(o, this, e)), this._$AV.push(u), c = r[++l];
      }
      n !== (c == null ? void 0 : c.index) && (o = P.nextNode(), n++);
    }
    return P.currentNode = T, i;
  }
  p(e) {
    let s = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, s), s += r.strings.length - 2) : r._$AI(e[s])), s++;
  }
}
class G {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, s, r, i) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = e, this._$AB = s, this._$AM = r, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const s = this._$AM;
    return s !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = s.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, s = this) {
    e = B(this, e, s), q(e) ? e === h || e == null || e === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : e !== this._$AH && e !== U && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Tt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== h && q(this._$AH) ? this._$AA.nextSibling.data = e : this.T(T.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: s, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = K.createElement(nt(r.h, r.h[0]), this.options)), r);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === i) this._$AH.p(s);
    else {
      const n = new Zt(i, this), l = n.u(this.options);
      n.p(s), this.T(l), this._$AH = n;
    }
  }
  _$AC(e) {
    let s = Ve.get(e.strings);
    return s === void 0 && Ve.set(e.strings, s = new K(e)), s;
  }
  k(e) {
    we(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let r, i = 0;
    for (const o of e) i === s.length ? s.push(r = new G(this.O(W()), this.O(W()), this, this.options)) : r = s[i], r._$AI(o), i++;
    i < s.length && (this._$AR(r && r._$AB.nextSibling, i), s.length = i);
  }
  _$AR(e = this._$AA.nextSibling, s) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, s); e !== this._$AB; ) {
      const i = Me(e).nextSibling;
      Me(e).remove(), e = i;
    }
  }
  setConnected(e) {
    var s;
    this._$AM === void 0 && (this._$Cv = e, (s = this._$AP) == null || s.call(this, e));
  }
}
class ne {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, s, r, i, o) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = e, this.name = s, this._$AM = i, this.options = o, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = h;
  }
  _$AI(e, s = this, r, i) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) e = B(this, e, s, 0), n = !q(e) || e !== this._$AH && e !== U, n && (this._$AH = e);
    else {
      const l = e;
      let c, u;
      for (e = o[0], c = 0; c < o.length - 1; c++) u = B(this, l[r + c], s, c), u === U && (u = this._$AH[c]), n || (n = !q(u) || u !== this._$AH[c]), u === h ? e = h : e !== h && (e += (u ?? "") + o[c + 1]), this._$AH[c] = u;
    }
    n && !i && this.j(e);
  }
  j(e) {
    e === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Lt extends ne {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === h ? void 0 : e;
  }
}
class Ut extends ne {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== h);
  }
}
class Bt extends ne {
  constructor(e, s, r, i, o) {
    super(e, s, r, i, o), this.type = 5;
  }
  _$AI(e, s = this) {
    if ((e = B(this, e, s, 0) ?? h) === U) return;
    const r = this._$AH, i = e === h && r !== h || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, o = e !== h && (r === h || i);
    i && this.element.removeEventListener(this.name, this, r), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Vt {
  constructor(e, s, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    B(this, e);
  }
}
const pe = I.litHtmlPolyfillSupport;
pe == null || pe(K, G), (I.litHtmlVersions ?? (I.litHtmlVersions = [])).push("3.3.3");
const Dt = (t, e, s) => {
  const r = (s == null ? void 0 : s.renderBefore) ?? e;
  let i = r._$litPart$;
  if (i === void 0) {
    const o = (s == null ? void 0 : s.renderBefore) ?? null;
    r._$litPart$ = i = new G(e.insertBefore(W(), o), o, void 0, s ?? {});
  }
  return i._$AI(t), i;
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
    const e = super.createRenderRoot();
    return (s = this.renderOptions).renderBefore ?? (s.renderBefore = e.firstChild), e;
  }
  update(e) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Dt(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return U;
  }
}
var tt;
$._$litElement$ = !0, $.finalized = !0, (tt = H.litElementHydrateSupport) == null || tt.call(H, { LitElement: $ });
const ve = H.litElementPolyfillSupport;
ve == null || ve({ LitElement: $ });
(H.litElementVersions ?? (H.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const f = (t) => (e, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Rt = { attribute: !0, type: String, converter: se, reflect: !1, hasChanged: ye }, jt = (t = Rt, e, s) => {
  const { kind: r, metadata: i } = s;
  let o = globalThis.litPropertyMetadata.get(i);
  if (o === void 0 && globalThis.litPropertyMetadata.set(i, o = /* @__PURE__ */ new Map()), r === "setter" && ((t = Object.create(t)).wrapped = !0), o.set(s.name, t), r === "accessor") {
    const { name: n } = s;
    return { set(l) {
      const c = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(n, c, t, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(n, void 0, t, l), l;
    } };
  }
  if (r === "setter") {
    const { name: n } = s;
    return function(l) {
      const c = this[n];
      e.call(this, l), this.requestUpdate(n, c, t, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function M(t) {
  return (e, s) => typeof s == "object" ? jt(t, e, s) : ((r, i, o) => {
    const n = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, r), n ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(t, e, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function N(t) {
  return M({ ...t, state: !0, attribute: !1 });
}
async function $e(t, e, s, r) {
  if (t())
    return !1;
  e(!0);
  try {
    return await s(), !0;
  } catch (i) {
    return r == null || r(i), !1;
  } finally {
    e(!1);
  }
}
function zt(t, e) {
  return t === e || t.endsWith(`_${e}`) ? !0 : t.startsWith("carlinko_") && t.endsWith(`_${e}`);
}
function It(t, e) {
  return e === "defrost" || e.endsWith("_left") || e.endsWith("_right") ? [t, "switch", "binary_sensor"] : [t];
}
function Wt(t, e) {
  return !!(e && t.states[e]);
}
function qt(t, e, s, r) {
  const i = t.entities;
  if (!i)
    return;
  const o = [];
  for (const l of Object.values(i)) {
    if (!(l != null && l.entity_id) || !l.unique_id || l.device_id !== e || l.disabled_by || l.hidden_by)
      continue;
    const c = l.entity_id.split(".", 1)[0];
    r.includes(c) && zt(l.unique_id, s) && o.push(l.entity_id);
  }
  return o.length === 0 ? void 0 : o.find((l) => Wt(t, l)) ?? o[0];
}
function Kt(t, e, s) {
  var n, l;
  if (!t)
    return;
  const r = (n = e.entities) == null ? void 0 : n[s.slot];
  if (r)
    return r;
  if (s.slot === "image" && e.image_entity)
    return e.image_entity;
  const i = (l = e.device_id) == null ? void 0 : l.trim();
  if (!i)
    return;
  const o = [s.key, ...s.fallbackKeys ?? []];
  for (const c of o) {
    const u = It(s.domain, c), p = qt(t, i, c, u);
    if (p)
      return p;
  }
}
function ke(t, e, s) {
  const r = {};
  for (const i of s)
    r[i.slot] = Kt(t, e, i);
  return r;
}
const at = [
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
  { slot: "tyre_status", key: "tyre_status", domain: "sensor" },
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
  at.map((t) => [t.slot, t])
);
const Ft = [
  { slot: "charging", key: "charging", domain: "binary_sensor" },
  { slot: "charge_state", key: "charge_state", domain: "sensor" },
  { slot: "charge_mode", key: "charge_mode", domain: "sensor" },
  { slot: "charge_remaining", key: "charge_remaining", domain: "sensor" },
  { slot: "charge_power", key: "charge_power", domain: "sensor" },
  { slot: "charge_stop", key: "charge_stop", domain: "button" }
], Gt = [
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
  { slot: "sunroof_tilt", key: "sunroof_tilt", domain: "button" }
];
function R(t, e) {
  if (!(!t || !e))
    return t.states[e];
}
function b(t, e) {
  var s;
  return (s = R(t, e)) == null ? void 0 : s.state;
}
function De(t, e) {
  const s = b(t, e);
  if (s === void 0 || s === "unknown" || s === "unavailable")
    return;
  const r = Number(s);
  return Number.isFinite(r) ? r : void 0;
}
function te(t, e) {
  const s = b(t, e);
  return s === "on" || s === "open" || s === "unlocked";
}
function Jt(t, e) {
  const s = R(t, e);
  if (!s)
    return !1;
  const r = s.state === "on";
  return s.attributes.device_class === "problem" ? r : !r;
}
function lt(t, e, s) {
  return Jt(t, e) ? "danger" : b(t, s) === "check_tyres" ? "warn" : "ok";
}
function k(t, e, s = "—") {
  const r = R(t, e);
  if (!r || r.state === "unknown" || r.state === "unavailable")
    return s;
  const i = r.attributes.unit_of_measurement;
  return i ? `${r.state} ${i}` : String(r.state);
}
function ge(t, e) {
  if (/^https?:\/\//i.test(e))
    return e;
  const s = ((t == null ? void 0 : t.hassUrl) || "").replace(/\/$/, "");
  return s ? e.startsWith("/") ? `${s}${e}` : `${s}/${e}` : e;
}
function ct(t, e) {
  const s = R(t, e);
  if (!s)
    return;
  const r = s.attributes.entity_picture;
  if (typeof r == "string" && r)
    return ge(t, r);
  const i = s.attributes.access_token;
  return typeof i == "string" && i ? ge(
    t,
    `/api/image_proxy/${e}?token=${encodeURIComponent(i)}`
  ) : ge(t, `/api/image_proxy/${e}`);
}
async function w(t, e, s, r, i = {}) {
  await t.callService(e, s, { ...i, entity_id: r });
}
async function Qt(t, e) {
  await w(t, "lock", "lock", e);
}
async function Xt(t, e) {
  await w(t, "lock", "unlock", e);
}
async function ht(t, e) {
  const s = e.split(".", 1)[0];
  await w(t, s, "turn_on", e);
}
async function dt(t, e) {
  const s = e.split(".", 1)[0];
  await w(t, s, "turn_off", e);
}
async function Yt(t, e) {
  const s = e.split(".", 1)[0];
  await w(t, s, "toggle", e);
}
async function fe(t, e) {
  await w(t, "cover", "open_cover", e);
}
async function _e(t, e) {
  await w(t, "cover", "close_cover", e);
}
function Re(t, e) {
  const s = b(t, e);
  return s === "open" || s === "opening";
}
async function L(t, e) {
  await w(t, "button", "press", e);
}
function J(t, e, s) {
  const r = R(t, e);
  if (!r)
    return;
  const i = r.attributes[s];
  if (i == null)
    return;
  const o = Number(i);
  return Number.isFinite(o) ? o : void 0;
}
function je(t, e) {
  return J(t, e, "temperature");
}
function es(t, e) {
  return J(t, e, "current_temperature");
}
function ts(t, e) {
  return J(t, e, "target_temp_step") ?? 1;
}
function ss(t, e) {
  return J(t, e, "min_temp") ?? 16;
}
function rs(t, e) {
  return J(t, e, "max_temp") ?? 30;
}
function ze(t, e) {
  const s = b(t, e);
  return s === "cool" || s === "heat" || s === "heat_cool" || s === "auto" || s === "fan_only" || s === "dry" || s === "on";
}
async function is(t, e, s) {
  await w(t, "climate", "set_hvac_mode", e, {
    hvac_mode: s
  });
}
async function os(t, e, s) {
  await w(t, "climate", "set_temperature", e, {
    temperature: s
  });
}
async function ns(t, e, s) {
  await w(t, "select", "select_option", e, {
    option: s
  });
}
function as(t, e) {
  const s = R(t, e), r = s == null ? void 0 : s.attributes.options;
  return Array.isArray(r) ? r.map(String) : [];
}
function A(t, e) {
  t.dispatchEvent(
    new CustomEvent("hass-more-info", {
      bubbles: !0,
      composed: !0,
      detail: { entityId: e }
    })
  );
}
const xe = y`
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
`, ut = y`
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
`, ls = y`
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
`, pt = y`
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
y`
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
const cs = y`
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
`, hs = y`
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
function Y(t, e, s, r, i) {
  if (!e || !r || !e.states[r])
    return h;
  let o = k(e, r);
  return a`
    <button
      type="button"
      class="metric"
      @click=${() => A(t, r)}
    >
      <span class="metric-label">${s}</span>
      <span class="metric-value">${o}</span>
    </button>
  `;
}
function _(t) {
  const e = t.variant || "", s = t.icon ? " icon" : "";
  return a`
    <button
      type="button"
      class="action ${e}${s}"
      aria-label=${t.label}
      title=${t.label}
      ?disabled=${t.disabled}
      @click=${t.onClick}
    >
      ${t.icon ?? t.label}
    </button>
  `;
}
function ds(t, e) {
  return a`<span class="chip ${e != null && e.ok ? "ok" : ""}">${t}</span>`;
}
const us = {
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
function C(t) {
  const e = t.tone ?? "muted";
  return a`
    <button
      type="button"
      class="hotspot tone-${e}"
      aria-label=${t.label}
      title=${t.label}
      ?disabled=${t.disabled}
      @click=${t.onClick}
    >
      ${us[t.icon]}
    </button>
  `;
}
function Ie(t) {
  const { percent: e, primary: s, secondary: r, meta: i } = t;
  if (e === void 0 && !s && !r && !i)
    return h;
  const o = t.tone ?? "ok", n = e === void 0 || Number.isNaN(e) ? void 0 : Math.max(0, Math.min(100, e));
  return a`
    <div class="vgauge tone-${o}">
      <div
        class="vgauge-bar-wrap"
        aria-hidden=${n === void 0 ? "true" : "false"}
      >
        ${n !== void 0 ? a`<div class="vgauge-bar" style="height:${n}%"></div>` : h}
      </div>
      <div class="vgauge-text">
        ${s ? a`<div class="vgauge-primary">${s}</div>` : h}
        ${n !== void 0 ? a`<div class="vgauge-pct">${Math.round(n)}%</div>` : h}
        ${r ? a`<div class="vgauge-secondary">${r}</div>` : h}
        ${i ? a`<div class="vgauge-meta">${i}</div>` : h}
      </div>
    </div>
  `;
}
var ps = Object.defineProperty, vs = Object.getOwnPropertyDescriptor, vt = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? vs(e, s) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (i = (r ? n(e, s, i) : n(i)) || i);
  return r && i && ps(e, s, i), i;
};
let ie = class extends $ {
  render() {
    const t = !!this.src;
    return a`
      <div class="wrap ${t ? "has-img" : ""}">
        ${t ? a`<img class="car-img" src=${this.src} alt="Vehicle top" />` : a`
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
ie.styles = y`
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
vt([
  M({ type: String })
], ie.prototype, "src", 2);
ie = vt([
  f("carlinko-car-outline")
], ie);
var gs = Object.defineProperty, fs = Object.getOwnPropertyDescriptor, gt = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? fs(e, s) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (i = (r ? n(e, s, i) : n(i)) || i);
  return r && i && gs(e, s, i), i;
};
let oe = class extends $ {
  render() {
    const t = !!this.src;
    return a`
      <div class="wrap ${t ? "has-img" : ""}">
        ${t ? a`<img class="car-img" src=${this.src} alt="Vehicle" />` : a`<div class="placeholder"><slot name="placeholder">No image</slot></div>`}
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
oe.styles = y`
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
gt([
  M({ type: String })
], oe.prototype, "src", 2);
oe = gt([
  f("carlinko-vehicle-stage")
], oe);
var _s = Object.defineProperty, ms = Object.getOwnPropertyDescriptor, ae = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? ms(e, s) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (i = (r ? n(e, s, i) : n(i)) || i);
  return r && i && _s(e, s, i), i;
};
function bs(t) {
  switch ((t || "unknown").toLowerCase()) {
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
let V = class extends $ {
  constructor() {
    super(...arguments), this._busy = !1;
  }
  setConfig(t) {
    if (!t || typeof t.device_id != "string")
      throw new Error("device_id is required");
    this._config = { ...t };
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
    return this._config ? ke(this.hass, this._config, at) : {};
  }
  _run(t) {
    this.hass && $e(
      () => this._busy,
      (e) => {
        this._busy = e;
      },
      t,
      (e) => console.error("carlinko-overview action failed", e)
    );
  }
  render() {
    var Se, Oe;
    if (!this._config)
      return a`<ha-card><div class="pad">Not configured</div></ha-card>`;
    if (!((Se = this._config.device_id) != null && Se.trim()))
      return a`<ha-card
        ><div class="pad">Select a CarLinko vehicle device</div></ha-card
      >`;
    if (!this.hass)
      return a`<ha-card><div class="pad">Waiting for Home Assistant…</div></ha-card>`;
    const t = this._slots(), e = ct(this.hass, t.image), r = b(this.hass, t.lock) === "locked", i = te(this.hass, t.engine), o = te(this.hass, t.defog), n = b(this.hass, t.trunk) === "open", l = te(this.hass, t.online), c = De(this.hass, t.battery), u = De(this.hass, t.fuel), p = !!((Oe = t.defog) != null && Oe.startsWith("binary_sensor.")), d = t.odometer && this.hass.states[t.odometer] ? k(this.hass, t.odometer) : void 0, v = t.total_range && this.hass.states[t.total_range] ? k(this.hass, t.total_range) : void 0, g = i && t.engine && t.speed && this.hass.states[t.speed] ? k(this.hass, t.speed) : void 0, m = t.range && this.hass.states[t.range] ? k(this.hass, t.range) : void 0, Ce = t.fuel_range && this.hass.states[t.fuel_range] ? k(this.hass, t.fuel_range) : void 0, _t = b(this.hass, t.hv_state), he = t.hv_state ? bs(_t) : void 0, mt = t.consumption && this.hass.states[t.consumption] ? k(this.hass, t.consumption) : void 0, bt = t.fuel_consumption && this.hass.states[t.fuel_consumption] ? k(this.hass, t.fuel_consumption) : void 0, yt = !!(d || v || g), X = t.tyres_ok || t.tyre_status ? lt(this.hass, t.tyres_ok, t.tyre_status) : void 0, wt = X === "danger" ? "Tyre problem" : X === "warn" ? "Check tyres" : "Tyres OK", Ae = t.tyres_ok ?? t.tyre_status;
    return a`
      <ha-card>
        ${this._config.title ? a`<div class="header">${this._config.title}</div>` : h}
        <div class="body">
          <div class="hero">
            <carlinko-vehicle-stage .src=${e}>
              ${t.engine ? a`<div slot="engine">
                    ${C({
      icon: "engine",
      label: i ? "Turn engine off" : "Turn engine on",
      tone: i ? "ok" : "muted",
      disabled: this._busy,
      onClick: () => this._run(
        () => i ? dt(this.hass, t.engine) : ht(this.hass, t.engine)
      )
    })}
                  </div>` : h}
              ${t.lock ? a`<div slot="lock">
                    ${C({
      icon: r ? "lock" : "unlock",
      label: r ? "Unlock doors" : "Lock doors",
      tone: r ? "muted" : "danger",
      disabled: this._busy,
      onClick: () => this._run(
        () => r ? Xt(this.hass, t.lock) : Qt(this.hass, t.lock)
      )
    })}
                  </div>` : h}
              ${t.online ? a`<div slot="online">
                    ${C({
      icon: "signal",
      label: l ? "Online" : "Offline",
      tone: l ? "ok" : "muted",
      onClick: () => A(this, t.online)
    })}
                  </div>` : h}
              ${t.hv_state && he ? a`<div slot="hv">
                    ${C({
      icon: "hv",
      label: he.label,
      tone: he.tone,
      onClick: () => A(this, t.hv_state)
    })}
                  </div>` : h}
              ${X && Ae ? a`<div slot="tyres">
                    ${C({
      icon: "tyre",
      label: wt,
      tone: X,
      onClick: () => A(this, Ae)
    })}
                  </div>` : h}
              ${t.defog ? a`<div slot="defog">
                    ${C({
      icon: "defog",
      label: o ? "Turn defog off" : "Turn defog on",
      tone: o ? "warn" : "muted",
      disabled: this._busy || p,
      onClick: () => this._run(() => Yt(this.hass, t.defog))
    })}
                  </div>` : h}
              ${t.charge_stop ? a`<div slot="charge">
                    ${C({
      icon: "charge",
      label: "Stop charge",
      tone: "info",
      disabled: this._busy,
      onClick: () => this._run(
        () => L(this.hass, t.charge_stop)
      )
    })}
                  </div>` : h}
              ${t.trunk ? a`<div slot="trunk">
                    ${C({
      icon: "trunk",
      label: n ? "Close trunk" : "Open trunk",
      tone: n ? "warn" : "muted",
      disabled: this._busy,
      onClick: () => this._run(
        () => n ? _e(this.hass, t.trunk) : fe(this.hass, t.trunk)
      )
    })}
                  </div>` : h}
            </carlinko-vehicle-stage>
          </div>
          <div class="vitals">
            ${yt ? a`
                  <div class="headline">
                    ${d ? a`<button
                          type="button"
                          class="odo"
                          @click=${() => A(this, t.odometer)}
                        >
                          <span class="odo-label">Odometer</span>
                          <span class="odo-value">${d}</span>
                        </button>` : h}
                    ${v ? a`<button
                          type="button"
                          class="range-total"
                          @click=${() => A(this, t.total_range)}
                        >
                          <span class="range-label">Total range</span>
                          <span class="range-value">${v}</span>
                        </button>` : h}
                    ${g ? a`<button
                          type="button"
                          class="speed"
                          @click=${() => A(this, t.speed)}
                        >
                          <span class="speed-label">Speed</span>
                          <span class="speed-value">${g}</span>
                        </button>` : h}
                  </div>
                ` : h}
            <div class="gauges">
              ${Ie({
      percent: c,
      primary: c !== void 0 || m ? "SOC" : void 0,
      secondary: m,
      meta: mt,
      tone: "ok"
    })}
              ${Ie({
      percent: u,
      primary: u !== void 0 || Ce ? "Fuel" : void 0,
      secondary: Ce,
      meta: bt,
      tone: "info"
    })}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
V.styles = [
  xe,
  cs,
  hs,
  y`
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
ae([
  M({ attribute: !1 })
], V.prototype, "hass", 2);
ae([
  N()
], V.prototype, "_config", 2);
ae([
  N()
], V.prototype, "_busy", 2);
V = ae([
  f("carlinko-overview")
], V);
var ys = Object.defineProperty, ft = (t, e, s, r) => {
  for (var i = void 0, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (i = n(e, s, i) || i);
  return i && ys(e, s, i), i;
};
const ws = [
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
], $s = {
  name: "image_entity",
  label: "Image override (optional)",
  selector: {
    entity: {
      domain: "image",
      filter: { integration: "carlinko" }
    }
  }
}, ks = {
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
  setConfig(e) {
    this._config = { ...e };
  }
  /** Extra fields after device_id + title. */
  extraSchema() {
    return [];
  }
  _schema() {
    return [...ws, ...this.extraSchema()];
  }
  _valueChanged(e) {
    var r;
    e.stopPropagation();
    const s = (r = e.detail) == null ? void 0 : r.value;
    s && (this._config = { ...s }, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  render() {
    return !this.hass || !this._config ? h : a`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema()}
        .computeLabel=${(e) => e.label || e.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
}
ft([
  M({ attribute: !1 })
], Q.prototype, "hass");
ft([
  N()
], Q.prototype, "_config");
var xs = Object.getOwnPropertyDescriptor, Cs = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? xs(e, s) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (i = n(i) || i);
  return i;
};
let We = class extends Q {
  extraSchema() {
    return [$s];
  }
};
We = Cs([
  f("carlinko-overview-editor")
], We);
var As = Object.defineProperty, Ss = Object.getOwnPropertyDescriptor, le = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Ss(e, s) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (i = (r ? n(e, s, i) : n(i)) || i);
  return r && i && As(e, s, i), i;
};
let D = class extends $ {
  constructor() {
    super(...arguments), this._busy = !1;
  }
  setConfig(t) {
    if (!t || typeof t.device_id != "string")
      throw new Error("device_id is required");
    this._config = { ...t };
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
    return this._config ? ke(this.hass, this._config, Ft) : {};
  }
  _run(t) {
    this.hass && $e(
      () => this._busy,
      (e) => {
        this._busy = e;
      },
      t,
      (e) => console.error("carlinko-charging action failed", e)
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
    const t = this._slots(), e = te(this.hass, t.charging);
    return a`
      <ha-card>
        ${this._config.title ? a`<div class="header">${this._config.title}</div>` : h}
        <div class="body-pad">
          <div class="chips">
            ${t.charging && this.hass.states[t.charging] ? ds(e ? "Charging" : "Not charging", {
      ok: e
    }) : h}
          </div>
          ${Y(this, this.hass, "Charge state", t.charge_state)}
          ${Y(this, this.hass, "Mode", t.charge_mode)}
          ${Y(this, this.hass, "Remaining", t.charge_remaining)}
          ${Y(this, this.hass, "Power", t.charge_power)}
        </div>
        ${t.charge_stop ? a`
              <div class="actions">
                ${_({
      label: "Stop charging",
      disabled: this._busy,
      onClick: () => this._run(() => L(this.hass, t.charge_stop))
    })}
              </div>
            ` : h}
      </ha-card>
    `;
  }
};
D.styles = [
  xe,
  ut,
  ls,
  pt
];
le([
  M({ attribute: !1 })
], D.prototype, "hass", 2);
le([
  N()
], D.prototype, "_config", 2);
le([
  N()
], D.prototype, "_busy", 2);
D = le([
  f("carlinko-charging")
], D);
var Os = Object.getOwnPropertyDescriptor, Es = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Os(e, s) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (i = n(i) || i);
  return i;
};
let qe = class extends Q {
};
qe = Es([
  f("carlinko-charging-editor")
], qe);
var Ps = Object.defineProperty, Hs = Object.getOwnPropertyDescriptor, ce = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Hs(e, s) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (i = (r ? n(e, s, i) : n(i)) || i);
  return r && i && Ps(e, s, i), i;
};
const Ke = [
  { slot: "seat-fl", heat: "seat_heat_l", vent: "seat_vent_l" },
  { slot: "seat-fr", heat: "seat_heat_r", vent: "seat_vent_r" },
  { slot: "seat-rl", heat: "seat_heat_lr", vent: "seat_vent_lr" },
  { slot: "seat-rr", heat: "seat_heat_rr", vent: "seat_vent_rr" }
], Ts = [
  { slot: "wheel-fl", pressure: "tyre_fl", temp: "tyre_fl_temp" },
  { slot: "wheel-fr", pressure: "tyre_fr", temp: "tyre_fr_temp" },
  { slot: "wheel-rl", pressure: "tyre_rl", temp: "tyre_rl_temp" },
  { slot: "wheel-rr", pressure: "tyre_rr", temp: "tyre_rr_temp" }
], Ms = ["tyre_fl", "tyre_fr", "tyre_rl", "tyre_rr"], Ns = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M13 3h-2v10h2V3Zm4.83 2.17-1.42 1.42A6.92 6.92 0 0 1 19 12a7 7 0 1 1-14 0c0-2.12.95-4.03 2.47-5.32L6.05 5.17A8.96 8.96 0 0 0 3 12a9 9 0 1 0 18 0c0-2.74-1.22-5.2-3.17-6.83Z"
    />
  </svg>
`, Zs = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5Z" />
  </svg>
`, Ls = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M5 11h14v2H5v-2Z" />
  </svg>
`, Us = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2v3.5l1.5-1.5 1 1L12 8l-2.5-2.5 1-1L12 5.5V2Zm0 20v-3.5l-1.5 1.5-1-1L12 16l2.5 2.5-1 1L12 18.5V22Zm10-10h-3.5l1.5 1.5-1 1L16 12l2.5-2.5 1 1L18.5 12H22ZM2 12h3.5L4 10.5l1-1L8 12l-2.5 2.5-1-1L5.5 12H2Zm14.95-6.36-1.41 1.41.71.71L14.83 9.5l-1.41-1.41.71-.71 1.41 1.41ZM9.17 14.5l1.41 1.41-.71.71-1.41-1.41.71-.71ZM9.17 9.5l.71.71-1.41 1.41-.71-.71L9.17 9.5Zm5.66 5.66.71.71-1.41 1.41-.71-.71 1.41-1.41Z"
    />
  </svg>
`, Fe = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M17.66 11.2c.03 1.6-1.02 2.96-2.28 4.05C15.31 16.1 14 17.45 13.15 19c-.55.9-.98 1.93-.85 3h.85c.22-1.19.78-2.2 1.4-3.08.68-.96 1.43-1.86 2.07-2.85.89-1.38 1.53-2.9 1.34-4.52-.11-.94-.5-1.86-1.1-2.62.55.9.9 1.97.8 3.07ZM12 2S9 7 9 11c0 2.4 1.34 4.37 3 5.6 1.66-1.23 3-3.2 3-5.6 0-4-3-9-3-9Zm0 12.5c-.83-.9-1.5-2.1-1.5-3.5 0-1.8.9-4.1 1.5-5.7.6 1.6 1.5 3.9 1.5 5.7 0 1.4-.67 2.6-1.5 3.5Z"
    />
  </svg>
`, Bs = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm4.5-5.5c-1.4 0-2.6.8-3.2 2A3.5 3.5 0 0 1 16 11.5c0 .2 0 .4-.05.6 1.3.5 2.3 1.7 2.3 3.1 0 1.9-1.6 3.4-3.5 3.4-.7 0-1.35-.2-1.9-.55A3.5 3.5 0 0 1 12 20.5a3.5 3.5 0 0 1-.85-6.85A3.5 3.5 0 0 1 8.25 18c-1.9 0-3.5-1.5-3.5-3.4 0-1.4 1-2.6 2.3-3.1A3.5 3.5 0 0 1 7 11.5c0-1.6 1.1-3 2.7-3.4A3.48 3.48 0 0 1 6.5 5.5C4.6 5.5 3 7 3 8.9c0 1.4 1 2.6 2.3 3.1A3.5 3.5 0 0 1 8 8.5c.7 0 1.35.2 1.9.55A3.5 3.5 0 0 1 12 3.5c.9 0 1.75.35 2.4.95A3.48 3.48 0 0 1 16.5 5.5c1.9 0 3.5 1.5 3.5 3.4 0 1.4-1 2.6-2.3 3.1.05-.2.05-.4.05-.6A3.5 3.5 0 0 1 16.5 5.5Z"
    />
  </svg>
`, Vs = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 4h16v16H4V4Zm2 2v12h5V6H6Zm7 0v5h5V6h-5Zm0 7v5h5v-5h-5Z"
    />
  </svg>
`, Ds = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 4h16v16H4V4Zm2 2v12h12V6H6Z"
    />
  </svg>
`, Rs = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 4h16v16H4V4Zm2 2v5h12V6H6Zm0 7v5h12v-5H6Z"
    />
  </svg>
`, js = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M3 6h18v3H3V6Zm2 5h14v8H5v-8Zm3 2v4h8v-4H8Z"
    />
  </svg>
`, zs = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M3 6h18v3H3V6Zm2 5h14v8H5v-8Z"
    />
  </svg>
`, Is = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M3 8h18v2H3V8Zm2 4 14 2v6H5v-8Zm2 3.3V18h10v-2.3l-10-1.4Z"
    />
  </svg>
`;
function Ws(t) {
  return t.split(".", 1)[0];
}
function qs(t) {
  return !t || t === "unknown" || t === "unavailable" ? "—" : t === "off" || t === "on" ? t : t.replace(/^level_?/i, "l").slice(0, 4);
}
let x = class extends $ {
  constructor() {
    super(...arguments), this._busy = !1;
  }
  setConfig(t) {
    if (!t || typeof t.device_id != "string")
      throw new Error("device_id is required");
    this._config = { ...t };
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
    return this._config ? ke(this.hass, this._config, Gt) : {};
  }
  _run(t) {
    this.hass && $e(
      () => this._busy,
      (e) => {
        this._busy = e;
      },
      t,
      (e) => console.error("carlinko-cabin action failed", e)
    );
  }
  _nudgeTemp(t) {
    const e = this._slots().climate;
    if (!this.hass || !e)
      return;
    const s = je(this.hass, e);
    if (s === void 0)
      return;
    const r = ts(this.hass, e), i = ss(this.hass, e), o = rs(this.hass, e), n = Math.min(o, Math.max(i, s + t * r));
    this._run(() => os(this.hass, e, n));
  }
  _toggleClimate() {
    const t = this._slots().climate;
    if (!this.hass || !t)
      return;
    const e = ze(this.hass, t);
    this._run(
      () => is(this.hass, t, e ? "off" : "cool")
    );
  }
  _cycleSelect(t) {
    if (!this.hass)
      return;
    const e = as(this.hass, t);
    if (e.length === 0)
      return;
    const s = b(this.hass, t) ?? e[0], r = e.indexOf(s), i = e[(r + 1) % e.length];
    this._run(() => ns(this.hass, t, i));
  }
  _toggleBinary(t) {
    if (!this.hass)
      return;
    const e = b(this.hass, t) === "on";
    this._run(
      () => e ? dt(this.hass, t) : ht(this.hass, t)
    );
  }
  _hasDirectTpms(t) {
    return this.hass ? Ms.some((e) => {
      const s = t[e];
      return !!(s && this.hass.states[s]);
    }) : !1;
  }
  _hasSeats(t) {
    return this.hass ? Ke.some((e) => {
      const s = e.heat ? t[e.heat] : void 0, r = e.vent ? t[e.vent] : void 0;
      return s && this.hass.states[s] || r && this.hass.states[r];
    }) : !1;
  }
  _seatControl(t, e) {
    var c;
    if (!t || !((c = this.hass) != null && c.states[t]))
      return h;
    const s = b(this.hass, t), r = Ws(t), i = e === "H" ? "heat" : "vent", o = e === "H" ? "Heat" : "Vent", n = qs(s), l = r === "select" ? () => this._cycleSelect(t) : () => this._toggleBinary(t);
    return a`
      <button
        type="button"
        class="seat-btn ${i}"
        ?disabled=${this._busy}
        title=${`${o}: ${s ?? "—"}`}
        aria-label=${`${o}: ${s ?? "—"}`}
        @click=${l}
      >
        ${e === "H" ? Fe : Bs}
        <span class="seat-state">${n}</span>
      </button>
    `;
  }
  _seatZone(t, e) {
    var i, o;
    const s = t.heat ? e[t.heat] : void 0, r = t.vent ? e[t.vent] : void 0;
    return (!s || !((i = this.hass) != null && i.states[s])) && (!r || !((o = this.hass) != null && o.states[r])) ? h : a`
      <div slot=${t.slot} class="seat-zone">
        ${this._seatControl(s, "H")} ${this._seatControl(r, "V")}
      </div>
    `;
  }
  _sensorBtn(t, e) {
    if (!this.hass || !t || !this.hass.states[t])
      return h;
    const s = k(this.hass, t);
    return a`
      <button
        type="button"
        class=${e}
        @click=${() => A(this, t)}
      >
        ${s}
      </button>
    `;
  }
  _wheelZone(t, e) {
    var l, c;
    const s = e[t.pressure], r = e[t.temp], i = !!(s && ((l = this.hass) != null && l.states[s])), o = !!(r && ((c = this.hass) != null && c.states[r]));
    if (!i && !o)
      return h;
    const n = lt(this.hass, e.tyres_ok, e.tyre_status);
    return a`
      <div slot=${t.slot} class="wheel-zone tone-${n}">
        ${this._sensorBtn(s, "wheel-pressure")}
        ${this._sensorBtn(r, "wheel-temp")}
      </div>
    `;
  }
  _entityExists(t) {
    var e;
    return !!(t && ((e = this.hass) != null && e.states[t]));
  }
  _hasWindowsControls(t) {
    return this._entityExists(t.windows) || this._entityExists(t.windows_vent) || this._entityExists(t.sunroof) || this._entityExists(t.sunroof_tilt);
  }
  _windowsCluster(t) {
    const e = t.windows, s = t.windows_vent, r = this._entityExists(e), i = this._entityExists(s);
    if (!r && !i)
      return h;
    const o = r && Re(this.hass, e);
    return a`
      <div slot="windows" class="map-actions">
        ${r ? _(o ? {
      label: "Close windows",
      icon: Ds,
      disabled: this._busy,
      onClick: () => this._run(() => _e(this.hass, e))
    } : {
      label: "Open windows",
      icon: Vs,
      disabled: this._busy,
      onClick: () => this._run(() => fe(this.hass, e))
    }) : h}
        ${i ? _({
      label: "Vent windows",
      icon: Rs,
      disabled: this._busy,
      onClick: () => this._run(() => L(this.hass, s))
    }) : h}
      </div>
    `;
  }
  _sunroofCluster(t) {
    const e = t.sunroof, s = t.sunroof_tilt, r = this._entityExists(e), i = this._entityExists(s);
    if (!r && !i)
      return h;
    const o = r && Re(this.hass, e);
    return a`
      <div slot="sunroof" class="map-actions">
        ${r ? _(o ? {
      label: "Close sunroof",
      icon: zs,
      disabled: this._busy,
      onClick: () => this._run(() => _e(this.hass, e))
    } : {
      label: "Open sunroof",
      icon: js,
      disabled: this._busy,
      onClick: () => this._run(() => fe(this.hass, e))
    }) : h}
        ${i ? _({
      label: "Tilt sunroof",
      icon: Is,
      disabled: this._busy,
      onClick: () => this._run(() => L(this.hass, s))
    }) : h}
      </div>
    `;
  }
  render() {
    var g;
    if (!this._config)
      return a`<ha-card><div class="pad">Not configured</div></ha-card>`;
    if (!((g = this._config.device_id) != null && g.trim()))
      return a`<ha-card
        ><div class="pad">Select a CarLinko vehicle device</div></ha-card
      >`;
    if (!this.hass)
      return a`<ha-card><div class="pad">Waiting for Home Assistant…</div></ha-card>`;
    const t = this._slots(), e = t.climate, s = e ? this.hass.states[e] : void 0, r = ze(this.hass, e), i = je(this.hass, e), o = es(this.hass, e), n = (typeof (s == null ? void 0 : s.attributes.temperature_unit) == "string" ? s.attributes.temperature_unit : void 0) || (typeof (s == null ? void 0 : s.attributes.unit_of_measurement) == "string" ? s.attributes.unit_of_measurement : "°C"), l = this._hasSeats(t), c = this._hasDirectTpms(t), u = this._hasWindowsControls(t), p = ct(this.hass, t.image), d = l || c || u, v = !!(s || t.quick_cool && this.hass.states[t.quick_cool] || t.quick_heat && this.hass.states[t.quick_heat]);
    return a`
      <ha-card>
        ${this._config.title ? a`<div class="header">${this._config.title}</div>` : h}
        <div class="body-pad">
          ${v ? a`
                <div class="controls-row">
                  <div class="controls-left">
                    ${s ? a`
                          ${_({
      label: r ? "Climate off" : "Climate on",
      icon: Ns,
      disabled: this._busy,
      variant: r ? "ok" : "",
      onClick: () => this._toggleClimate()
    })}
                          ${_({
      label: "Increase temperature",
      icon: Zs,
      disabled: this._busy || i === void 0,
      onClick: () => this._nudgeTemp(1)
    })}
                          <span class="setpoint-value" title="Setpoint"
                            >${i !== void 0 ? `${i}${n}` : "—"}</span
                          >
                          ${_({
      label: "Decrease temperature",
      icon: Ls,
      disabled: this._busy || i === void 0,
      onClick: () => this._nudgeTemp(-1)
    })}
                        ` : h}
                  </div>
                  <div class="controls-right">
                    ${t.quick_cool && this.hass.states[t.quick_cool] ? _({
      label: "Quick cool",
      icon: Us,
      disabled: this._busy,
      onClick: () => this._run(
        () => L(this.hass, t.quick_cool)
      )
    }) : h}
                    ${t.quick_heat && this.hass.states[t.quick_heat] ? _({
      label: "Quick heat",
      icon: Fe,
      disabled: this._busy,
      onClick: () => this._run(
        () => L(this.hass, t.quick_heat)
      )
    }) : h}
                  </div>
                </div>
              ` : h}
          ${s && o !== void 0 ? a`
                <div class="current-row">
                  <span class="metric-label">Current</span>
                  <span class="metric-value">${o}${n}</span>
                </div>
              ` : h}
          ${d ? a`
                <carlinko-car-outline .src=${p}>
                  ${this._windowsCluster(t)} ${this._sunroofCluster(t)}
                  ${Ke.map((m) => this._seatZone(m, t))}
                  ${c ? Ts.map((m) => this._wheelZone(m, t)) : h}
                </carlinko-car-outline>
              ` : h}
        </div>
      </ha-card>
    `;
  }
};
x.styles = [
  xe,
  ut,
  pt,
  y`
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
        --ck-seat-heat: #d64545;
        --ck-seat-vent: #3b82c4;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 5px 8px;
        font-size: 0.8rem;
      }
      .seat-btn svg {
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
      }
      .wheel-pressure {
        font-weight: 600;
      }
      .wheel-temp {
        color: var(--ck-muted);
      }
      .wheel-zone {
        --ck-tyre-ok: #3d9a5f;
        --ck-tyre-warn: #d97706;
        --ck-tyre-danger: #d64545;
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
      .seat-btn.heat:hover:not(:disabled) {
        border-color: var(--ck-seat-heat);
        color: var(--ck-seat-heat);
      }
      .seat-btn.vent:hover:not(:disabled) {
        border-color: var(--ck-seat-vent);
        color: var(--ck-seat-vent);
      }
      .wheel-zone.tone-ok .wheel-pressure:hover,
      .wheel-zone.tone-ok .wheel-temp:hover {
        border-color: var(--ck-tyre-ok);
      }
      .wheel-zone.tone-warn .wheel-pressure:hover,
      .wheel-zone.tone-warn .wheel-temp:hover {
        border-color: var(--ck-tyre-warn);
      }
      .wheel-zone.tone-danger .wheel-pressure:hover,
      .wheel-zone.tone-danger .wheel-temp:hover {
        border-color: var(--ck-tyre-danger);
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
ce([
  M({ attribute: !1 })
], x.prototype, "hass", 2);
ce([
  N()
], x.prototype, "_config", 2);
ce([
  N()
], x.prototype, "_busy", 2);
x = ce([
  f("carlinko-cabin")
], x);
var Ks = Object.getOwnPropertyDescriptor, Fs = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Ks(e, s) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (i = n(i) || i);
  return i;
};
let F = class extends Q {
  extraSchema() {
    return [ks];
  }
};
F = Fs([
  f("carlinko-cabin-editor")
], F);
var Gs = Object.getOwnPropertyDescriptor, Js = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Gs(e, s) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (i = n(i) || i);
  return i;
};
let Ge = class extends x {
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
Ge = Js([
  f("carlinko-climate")
], Ge);
var Qs = Object.getOwnPropertyDescriptor, Xs = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Qs(e, s) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (i = n(i) || i);
  return i;
};
let Je = class extends F {
};
Je = Xs([
  f("carlinko-climate-editor")
], Je);
var Ys = Object.getOwnPropertyDescriptor, er = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Ys(e, s) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (i = n(i) || i);
  return i;
};
let Qe = class extends x {
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
Qe = er([
  f("carlinko-tpms")
], Qe);
var tr = Object.getOwnPropertyDescriptor, sr = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? tr(e, s) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (i = n(i) || i);
  return i;
};
let Xe = class extends F {
};
Xe = sr([
  f("carlinko-tpms-editor")
], Xe);
var rr = Object.getOwnPropertyDescriptor, ir = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? rr(e, s) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (i = n(i) || i);
  return i;
};
let Ye = class extends x {
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
Ye = ir([
  f("carlinko-windows")
], Ye);
var or = Object.getOwnPropertyDescriptor, nr = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? or(e, s) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (i = n(i) || i);
  return i;
};
let et = class extends F {
};
et = nr([
  f("carlinko-windows-editor")
], et);
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
