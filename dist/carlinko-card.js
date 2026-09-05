/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const K = globalThis, at = K.ShadowRoot && (K.ShadyCSS === void 0 || K.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ct = Symbol(), ft = /* @__PURE__ */ new WeakMap();
let Ct = class {
  constructor(t, s, i) {
    if (this._$cssResult$ = !0, i !== ct) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (at && t === void 0) {
      const i = s !== void 0 && s.length === 1;
      i && (t = ft.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ft.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const zt = (e) => new Ct(typeof e == "string" ? e : e + "", void 0, ct), C = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((i, r, n) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[n + 1], e[0]);
  return new Ct(s, e, ct);
}, Bt = (e, t) => {
  if (at) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const i = document.createElement("style"), r = K.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = s.cssText, e.appendChild(i);
  }
}, gt = at ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const i of t.cssRules) s += i.cssText;
  return zt(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Wt, defineProperty: Vt, getOwnPropertyDescriptor: qt, getOwnPropertyNames: It, getOwnPropertySymbols: Kt, getPrototypeOf: Ft } = Object, $ = globalThis, _t = $.trustedTypes, Zt = _t ? _t.emptyScript : "", et = $.reactiveElementPolyfillSupport, j = (e, t) => e, F = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Zt : null;
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
} }, lt = (e, t) => !Wt(e, t), vt = { attribute: !0, type: String, converter: F, reflect: !1, useDefault: !1, hasChanged: lt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), $.litPropertyMetadata ?? ($.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let S = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = vt) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(t, i, s);
      r !== void 0 && Vt(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, s, i) {
    const { get: r, set: n } = qt(this.prototype, t) ?? { get() {
      return this[s];
    }, set(o) {
      this[s] = o;
    } };
    return { get: r, set(o) {
      const a = r == null ? void 0 : r.call(this);
      n == null || n.call(this, o), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? vt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(j("elementProperties"))) return;
    const t = Ft(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(j("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(j("properties"))) {
      const s = this.properties, i = [...It(s), ...Kt(s)];
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
      for (const r of i) s.unshift(gt(r));
    } else t !== void 0 && s.push(gt(t));
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
    return Bt(t, this.constructor.elementStyles), t;
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
      const o = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : F).toAttribute(s, i.type);
      this._$Em = t, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(t, s) {
    var n, o;
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const a = i.getPropertyOptions(r), c = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : F;
      this._$Em = r;
      const h = c.fromAttribute(s, a.type);
      this[r] = h ?? ((o = this._$Ej) == null ? void 0 : o.get(r)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, s, i, r = !1, n) {
    var o;
    if (t !== void 0) {
      const a = this.constructor;
      if (r === !1 && (n = this[t]), i ?? (i = a.getPropertyOptions(t)), !((i.hasChanged ?? lt)(n, s) || i.useDefault && i.reflect && n === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(a._$Eu(t, i)))) return;
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
        const { wrapped: a } = o, c = this[n];
        a !== !0 || this._$AL.has(n) || c === void 0 || this.C(n, void 0, o, c);
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
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[j("elementProperties")] = /* @__PURE__ */ new Map(), S[j("finalized")] = /* @__PURE__ */ new Map(), et == null || et({ ReactiveElement: S }), ($.reactiveElementVersions ?? ($.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis, mt = (e) => e, Z = L.trustedTypes, $t = Z ? Z.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, St = "$lit$", m = `lit$${Math.random().toFixed(9).slice(2)}$`, Et = "?" + m, Gt = `<${Et}>`, x = document, D = () => x.createComment(""), z = (e) => e === null || typeof e != "object" && typeof e != "function", ht = Array.isArray, Jt = (e) => ht(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", st = `[ 	
\f\r]`, R = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, yt = /-->/g, bt = />/g, b = RegExp(`>|${st}(?:([^\\s"'>=/]+)(${st}*=${st}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), wt = /'/g, kt = /"/g, Ot = /^(?:script|style|textarea|title)$/i, Qt = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), u = Qt(1), U = Symbol.for("lit-noChange"), l = Symbol.for("lit-nothing"), At = /* @__PURE__ */ new WeakMap(), k = x.createTreeWalker(x, 129);
function Pt(e, t) {
  if (!ht(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return $t !== void 0 ? $t.createHTML(t) : t;
}
const Xt = (e, t) => {
  const s = e.length - 1, i = [];
  let r, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = R;
  for (let a = 0; a < s; a++) {
    const c = e[a];
    let h, p, d = -1, f = 0;
    for (; f < c.length && (o.lastIndex = f, p = o.exec(c), p !== null); ) f = o.lastIndex, o === R ? p[1] === "!--" ? o = yt : p[1] !== void 0 ? o = bt : p[2] !== void 0 ? (Ot.test(p[2]) && (r = RegExp("</" + p[2], "g")), o = b) : p[3] !== void 0 && (o = b) : o === b ? p[0] === ">" ? (o = r ?? R, d = -1) : p[1] === void 0 ? d = -2 : (d = o.lastIndex - p[2].length, h = p[1], o = p[3] === void 0 ? b : p[3] === '"' ? kt : wt) : o === kt || o === wt ? o = b : o === yt || o === bt ? o = R : (o = b, r = void 0);
    const v = o === b && e[a + 1].startsWith("/>") ? " " : "";
    n += o === R ? c + Gt : d >= 0 ? (i.push(h), c.slice(0, d) + St + c.slice(d) + m + v) : c + m + (d === -2 ? a : v);
  }
  return [Pt(e, n + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class B {
  constructor({ strings: t, _$litType$: s }, i) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const a = t.length - 1, c = this.parts, [h, p] = Xt(t, s);
    if (this.el = B.createElement(h, i), k.currentNode = this.el.content, s === 2 || s === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (r = k.nextNode()) !== null && c.length < a; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const d of r.getAttributeNames()) if (d.endsWith(St)) {
          const f = p[o++], v = r.getAttribute(d).split(m), I = /([.?@])?(.*)/.exec(f);
          c.push({ type: 1, index: n, name: I[2], strings: v, ctor: I[1] === "." ? te : I[1] === "?" ? ee : I[1] === "@" ? se : X }), r.removeAttribute(d);
        } else d.startsWith(m) && (c.push({ type: 6, index: n }), r.removeAttribute(d));
        if (Ot.test(r.tagName)) {
          const d = r.textContent.split(m), f = d.length - 1;
          if (f > 0) {
            r.textContent = Z ? Z.emptyScript : "";
            for (let v = 0; v < f; v++) r.append(d[v], D()), k.nextNode(), c.push({ type: 2, index: ++n });
            r.append(d[f], D());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Et) c.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = r.data.indexOf(m, d + 1)) !== -1; ) c.push({ type: 7, index: n }), d += m.length - 1;
      }
      n++;
    }
  }
  static createElement(t, s) {
    const i = x.createElement("template");
    return i.innerHTML = t, i;
  }
}
function N(e, t, s = e, i) {
  var o, a;
  if (t === U) return t;
  let r = i !== void 0 ? (o = s._$Co) == null ? void 0 : o[i] : s._$Cl;
  const n = z(t) ? void 0 : t._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== n && ((a = r == null ? void 0 : r._$AO) == null || a.call(r, !1), n === void 0 ? r = void 0 : (r = new n(e), r._$AT(e, s, i)), i !== void 0 ? (s._$Co ?? (s._$Co = []))[i] = r : s._$Cl = r), r !== void 0 && (t = N(e, r._$AS(e, t.values), r, i)), t;
}
class Yt {
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
    const { el: { content: s }, parts: i } = this._$AD, r = ((t == null ? void 0 : t.creationScope) ?? x).importNode(s, !0);
    k.currentNode = r;
    let n = k.nextNode(), o = 0, a = 0, c = i[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let h;
        c.type === 2 ? h = new W(n, n.nextSibling, this, t) : c.type === 1 ? h = new c.ctor(n, c.name, c.strings, this, t) : c.type === 6 && (h = new ie(n, this, t)), this._$AV.push(h), c = i[++a];
      }
      o !== (c == null ? void 0 : c.index) && (n = k.nextNode(), o++);
    }
    return k.currentNode = x, r;
  }
  p(t) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, s), s += i.strings.length - 2) : i._$AI(t[s])), s++;
  }
}
class W {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, s, i, r) {
    this.type = 2, this._$AH = l, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = i, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
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
    t = N(this, t, s), z(t) ? t === l || t == null || t === "" ? (this._$AH !== l && this._$AR(), this._$AH = l) : t !== this._$AH && t !== U && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Jt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== l && z(this._$AH) ? this._$AA.nextSibling.data = t : this.T(x.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: s, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = B.createElement(Pt(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === r) this._$AH.p(s);
    else {
      const o = new Yt(r, this), a = o.u(this.options);
      o.p(s), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let s = At.get(t.strings);
    return s === void 0 && At.set(t.strings, s = new B(t)), s;
  }
  k(t) {
    ht(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, r = 0;
    for (const n of t) r === s.length ? s.push(i = new W(this.O(D()), this.O(D()), this, this.options)) : i = s[r], i._$AI(n), r++;
    r < s.length && (this._$AR(i && i._$AB.nextSibling, r), s.length = r);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, s); t !== this._$AB; ) {
      const r = mt(t).nextSibling;
      mt(t).remove(), t = r;
    }
  }
  setConnected(t) {
    var s;
    this._$AM === void 0 && (this._$Cv = t, (s = this._$AP) == null || s.call(this, t));
  }
}
class X {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, i, r, n) {
    this.type = 1, this._$AH = l, this._$AN = void 0, this.element = t, this.name = s, this._$AM = r, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = l;
  }
  _$AI(t, s = this, i, r) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = N(this, t, s, 0), o = !z(t) || t !== this._$AH && t !== U, o && (this._$AH = t);
    else {
      const a = t;
      let c, h;
      for (t = n[0], c = 0; c < n.length - 1; c++) h = N(this, a[i + c], s, c), h === U && (h = this._$AH[c]), o || (o = !z(h) || h !== this._$AH[c]), h === l ? t = l : t !== l && (t += (h ?? "") + n[c + 1]), this._$AH[c] = h;
    }
    o && !r && this.j(t);
  }
  j(t) {
    t === l ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class te extends X {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === l ? void 0 : t;
  }
}
class ee extends X {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== l);
  }
}
class se extends X {
  constructor(t, s, i, r, n) {
    super(t, s, i, r, n), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = N(this, t, s, 0) ?? l) === U) return;
    const i = this._$AH, r = t === l && i !== l || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== l && (i === l || r);
    r && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ie {
  constructor(t, s, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    N(this, t);
  }
}
const it = L.litHtmlPolyfillSupport;
it == null || it(B, W), (L.litHtmlVersions ?? (L.litHtmlVersions = [])).push("3.3.3");
const re = (e, t, s) => {
  const i = (s == null ? void 0 : s.renderBefore) ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const n = (s == null ? void 0 : s.renderBefore) ?? null;
    i._$litPart$ = r = new W(t.insertBefore(D(), n), n, void 0, s ?? {});
  }
  return r._$AI(e), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A = globalThis;
class _ extends S {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = re(s, this.renderRoot, this.renderOptions);
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
var xt;
_._$litElement$ = !0, _.finalized = !0, (xt = A.litElementHydrateSupport) == null || xt.call(A, { LitElement: _ });
const rt = A.litElementPolyfillSupport;
rt == null || rt({ LitElement: _ });
(A.litElementVersions ?? (A.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const V = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ne = { attribute: !0, type: String, converter: F, reflect: !1, hasChanged: lt }, oe = (e = ne, t, s) => {
  const { kind: i, metadata: r } = s;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(s.name, e), i === "accessor") {
    const { name: o } = s;
    return { set(a) {
      const c = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(o, c, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, e, a), a;
    } };
  }
  if (i === "setter") {
    const { name: o } = s;
    return function(a) {
      const c = this[o];
      t.call(this, a), this.requestUpdate(o, c, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function q(e) {
  return (t, s) => typeof s == "object" ? oe(e, t, s) : ((i, r, n) => {
    const o = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, i), o ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function T(e) {
  return q({ ...e, state: !0, attribute: !1 });
}
async function Ut(e, t, s, i) {
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
function ae(e, t) {
  return e === t || e.endsWith(`_${t}`) ? !0 : e.startsWith("carlinko_") && e.endsWith(`_${t}`);
}
function ce(e, t) {
  return t === "defrost" || t.endsWith("_left") || t.endsWith("_right") ? [e, "binary_sensor"] : [e];
}
function le(e, t) {
  return !!(t && e.states[t]);
}
function he(e, t, s, i) {
  const r = e.entities;
  if (!r)
    return;
  const n = [];
  for (const a of Object.values(r)) {
    if (!(a != null && a.entity_id) || !a.unique_id || a.device_id !== t || a.disabled_by || a.hidden_by)
      continue;
    const c = a.entity_id.split(".", 1)[0];
    i.includes(c) && ae(a.unique_id, s) && n.push(a.entity_id);
  }
  return n.length === 0 ? void 0 : n.find((a) => le(e, a)) ?? n[0];
}
function de(e, t, s) {
  var o, a;
  if (!e)
    return;
  const i = (o = t.entities) == null ? void 0 : o[s.slot];
  if (i)
    return i;
  if (s.slot === "image" && t.image_entity)
    return t.image_entity;
  const r = (a = t.device_id) == null ? void 0 : a.trim();
  if (!r)
    return;
  const n = [s.key, ...s.fallbackKeys ?? []];
  for (const c of n) {
    const h = ce(s.domain, c), p = he(e, r, c, h);
    if (p)
      return p;
  }
}
function Nt(e, t, s) {
  const i = {};
  for (const r of s)
    i[r.slot] = de(e, t, r);
  return i;
}
const Mt = [
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
  Mt.map((e) => [e.slot, e])
);
const ue = [
  { slot: "charging", key: "charging", domain: "binary_sensor" },
  { slot: "charge_state", key: "charge_state", domain: "sensor" },
  { slot: "charge_mode", key: "charge_mode", domain: "sensor" },
  { slot: "charge_remaining", key: "charge_remaining", domain: "sensor" },
  { slot: "charge_power", key: "charge_power", domain: "sensor" },
  { slot: "charge_stop", key: "charge_stop", domain: "button" }
];
function dt(e, t) {
  if (!(!e || !t))
    return e.states[t];
}
function G(e, t) {
  var s;
  return (s = dt(e, t)) == null ? void 0 : s.state;
}
function Ht(e, t) {
  const s = G(e, t);
  if (s === void 0 || s === "unknown" || s === "unavailable")
    return;
  const i = Number(s);
  return Number.isFinite(i) ? i : void 0;
}
function E(e, t) {
  const s = G(e, t);
  return s === "on" || s === "open" || s === "unlocked";
}
function O(e, t, s = "—") {
  const i = dt(e, t);
  if (!i || i.state === "unknown" || i.state === "unavailable")
    return s;
  const r = i.attributes.unit_of_measurement;
  return r ? `${i.state} ${r}` : String(i.state);
}
function nt(e, t) {
  if (/^https?:\/\//i.test(t))
    return t;
  const s = ((e == null ? void 0 : e.hassUrl) || "").replace(/\/$/, "");
  return s ? t.startsWith("/") ? `${s}${t}` : `${s}/${t}` : t;
}
function pe(e, t) {
  const s = dt(e, t);
  if (!s)
    return;
  const i = s.attributes.entity_picture;
  if (typeof i == "string" && i)
    return nt(e, i);
  const r = s.attributes.access_token;
  return typeof r == "string" && r ? nt(
    e,
    `/api/image_proxy/${t}?token=${encodeURIComponent(r)}`
  ) : nt(e, `/api/image_proxy/${t}`);
}
async function y(e, t, s, i, r = {}) {
  await e.callService(t, s, { ...r, entity_id: i });
}
async function fe(e, t) {
  await y(e, "lock", "lock", t);
}
async function ge(e, t) {
  await y(e, "lock", "unlock", t);
}
async function _e(e, t) {
  const s = t.split(".", 1)[0];
  await y(e, s, "turn_on", t);
}
async function ve(e, t) {
  const s = t.split(".", 1)[0];
  await y(e, s, "turn_off", t);
}
async function me(e, t) {
  const s = t.split(".", 1)[0];
  await y(e, s, "toggle", t);
}
async function $e(e, t) {
  await y(e, "cover", "open_cover", t);
}
async function ye(e, t) {
  await y(e, "cover", "close_cover", t);
}
async function Tt(e, t) {
  await y(e, "button", "press", t);
}
function be(e, t) {
  e.dispatchEvent(
    new CustomEvent("hass-more-info", {
      bubbles: !0,
      composed: !0,
      detail: { entityId: t }
    })
  );
}
const Rt = C`
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
`, jt = C`
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
`, Lt = C`
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
`, Dt = C`
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
`, we = C`
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
function g(e, t, s, i, r) {
  if (!t || !i || !t.states[i])
    return l;
  let n = O(t, i);
  if (r != null && r.numeric) {
    const o = Ht(t, i);
    if (o === void 0)
      return l;
    n = r.suffix ? `${o}${r.suffix}` : String(o);
  }
  return u`
    <button
      type="button"
      class="metric"
      @click=${() => be(e, i)}
    >
      <span class="metric-label">${s}</span>
      <span class="metric-value">${n}</span>
    </button>
  `;
}
function P(e) {
  const t = e.variant || "";
  return u`
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
function w(e, t) {
  return e ? u`<span class="chip ${t != null && t.ok ? "ok" : ""}">${e}</span>` : l;
}
function ke(e, t) {
  if (e === void 0 || Number.isNaN(e))
    return l;
  const s = Math.max(0, Math.min(100, e));
  return u`
    <div class="bar-wrap" title=${t ?? `${s}%`}>
      <div class="bar" style="width:${s}%"></div>
    </div>
  `;
}
var Ae = Object.getOwnPropertyDescriptor, xe = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? Ae(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = o(r) || r);
  return r;
};
let ot = class extends _ {
  render() {
    return u`
      <div class="wrap">
        <svg viewBox="0 0 120 200" class="outline" aria-hidden="true">
          <rect
            x="25"
            y="20"
            width="70"
            height="160"
            rx="18"
            class="body"
          />
          <rect x="35" y="35" width="50" height="28" rx="4" class="glass" />
          <rect x="35" y="140" width="50" height="22" rx="4" class="glass" />
        </svg>
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
ot.styles = C`
    :host {
      display: block;
      width: 100%;
      max-width: 220px;
      margin: 0 auto;
    }
    .wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 120 / 200;
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
      left: 8%;
      top: 28%;
    }
    .seat-fr {
      right: 8%;
      top: 28%;
    }
    .seat-rl {
      left: 8%;
      top: 55%;
    }
    .seat-rr {
      right: 8%;
      top: 55%;
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
ot = xe([
  V("carlinko-car-outline")
], ot);
var Ce = Object.defineProperty, Se = Object.getOwnPropertyDescriptor, Y = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? Se(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (i ? o(t, s, r) : o(r)) || r);
  return i && r && Ce(t, s, r), r;
};
let M = class extends _ {
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
    return this._config ? Nt(this.hass, this._config, Mt) : {};
  }
  _run(e) {
    this.hass && Ut(
      () => this._busy,
      (t) => {
        this._busy = t;
      },
      e,
      (t) => console.error("carlinko-overview action failed", t)
    );
  }
  render() {
    var h;
    if (!this._config)
      return u`<ha-card><div class="pad">Not configured</div></ha-card>`;
    if (!((h = this._config.device_id) != null && h.trim()))
      return u`<ha-card
        ><div class="pad">Select a CarLinko vehicle device</div></ha-card
      >`;
    if (!this.hass)
      return u`<ha-card><div class="pad">Waiting for Home Assistant…</div></ha-card>`;
    const e = this._slots(), t = E(this.hass, e.moving), s = pe(this.hass, e.image), r = G(this.hass, e.lock) === "locked", n = E(this.hass, e.engine), o = E(this.hass, e.defog), a = G(this.hass, e.trunk) === "open", c = Ht(this.hass, e.battery);
    return u`
      <ha-card>
        ${this._config.title ? u`<div class="header">${this._config.title}</div>` : l}
        <div class="body">
          <div class="hero">
            ${s ? u`<img class="car-img" src=${s} alt="Vehicle" />` : u`<div class="car-placeholder">No image</div>`}
          </div>
          <div class="vitals">
            ${g(this, this.hass, "Battery", e.battery, {
      numeric: !0,
      suffix: "%"
    })}
            ${ke(
      c,
      c !== void 0 ? `Battery ${c}%` : void 0
    )}
            ${g(this, this.hass, "EV range", e.range)}
            ${g(this, this.hass, "Fuel", e.fuel, {
      numeric: !0,
      suffix: "%"
    })}
            ${g(this, this.hass, "Fuel range", e.fuel_range)}
            ${g(this, this.hass, "Total range", e.total_range)}
            <div class="chips">
              ${e.hv_state && this.hass.states[e.hv_state] ? w(`HV ${O(this.hass, e.hv_state)}`) : l}
              ${e.odometer && this.hass.states[e.odometer] ? w(O(this.hass, e.odometer)) : l}
              ${e.consumption && this.hass.states[e.consumption] ? w(O(this.hass, e.consumption)) : l}
              ${e.fuel_consumption && this.hass.states[e.fuel_consumption] ? w(O(this.hass, e.fuel_consumption)) : l}
              ${e.online && this.hass.states[e.online] ? w(E(this.hass, e.online) ? "Online" : "Offline", {
      ok: E(this.hass, e.online)
    }) : l}
              ${t && e.speed && this.hass.states[e.speed] ? w(O(this.hass, e.speed)) : l}
            </div>
          </div>
        </div>
        <div class="actions">
          ${e.lock ? P({
      label: r ? "Unlock" : "Lock",
      disabled: this._busy,
      variant: r ? "danger" : "ok",
      onClick: () => this._run(
        () => r ? ge(this.hass, e.lock) : fe(this.hass, e.lock)
      )
    }) : l}
          ${e.engine ? P({
      label: `Engine ${n ? "Off" : "On"}`,
      disabled: this._busy,
      variant: n ? "ok" : "",
      onClick: () => this._run(
        () => n ? ve(this.hass, e.engine) : _e(this.hass, e.engine)
      )
    }) : l}
          ${e.defog ? P({
      label: `Defog ${o ? "On" : "Off"}`,
      disabled: this._busy || e.defog.startsWith("binary_sensor."),
      variant: o ? "ok" : "",
      onClick: () => this._run(() => me(this.hass, e.defog))
    }) : l}
          ${e.charge_stop ? P({
      label: "Stop charge",
      disabled: this._busy,
      onClick: () => this._run(() => Tt(this.hass, e.charge_stop))
    }) : l}
          ${e.trunk ? P({
      label: `Trunk ${a ? "Close" : "Open"}`,
      disabled: this._busy,
      variant: a ? "ok" : "",
      onClick: () => this._run(
        () => a ? ye(this.hass, e.trunk) : $e(this.hass, e.trunk)
      )
    }) : l}
        </div>
      </ha-card>
    `;
  }
};
M.styles = [
  Rt,
  jt,
  Lt,
  Dt,
  we,
  C`
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
Y([
  q({ attribute: !1 })
], M.prototype, "hass", 2);
Y([
  T()
], M.prototype, "_config", 2);
Y([
  T()
], M.prototype, "_busy", 2);
M = Y([
  V("carlinko-overview")
], M);
var Ee = Object.defineProperty, Oe = Object.getOwnPropertyDescriptor, ut = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? Oe(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (i ? o(t, s, r) : o(r)) || r);
  return i && r && Ee(t, s, r), r;
};
let J = class extends _ {
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
    return !this.hass || !this._config ? l : u`
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
ut([
  q({ attribute: !1 })
], J.prototype, "hass", 2);
ut([
  T()
], J.prototype, "_config", 2);
J = ut([
  V("carlinko-overview-editor")
], J);
var Pe = Object.defineProperty, Ue = Object.getOwnPropertyDescriptor, tt = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? Ue(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (i ? o(t, s, r) : o(r)) || r);
  return i && r && Pe(t, s, r), r;
};
let H = class extends _ {
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
    return this._config ? Nt(this.hass, this._config, ue) : {};
  }
  _run(e) {
    this.hass && Ut(
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
      return u`<ha-card><div class="pad">Not configured</div></ha-card>`;
    if (!((s = this._config.device_id) != null && s.trim()))
      return u`<ha-card
        ><div class="pad">Select a CarLinko vehicle device</div></ha-card
      >`;
    if (!this.hass)
      return u`<ha-card><div class="pad">Waiting for Home Assistant…</div></ha-card>`;
    const e = this._slots(), t = E(this.hass, e.charging);
    return u`
      <ha-card>
        ${this._config.title ? u`<div class="header">${this._config.title}</div>` : l}
        <div class="body-pad">
          <div class="chips">
            ${e.charging && this.hass.states[e.charging] ? w(t ? "Charging" : "Not charging", {
      ok: t
    }) : l}
          </div>
          ${g(this, this.hass, "Charge state", e.charge_state)}
          ${g(this, this.hass, "Mode", e.charge_mode)}
          ${g(this, this.hass, "Remaining", e.charge_remaining)}
          ${g(this, this.hass, "Power", e.charge_power)}
        </div>
        ${e.charge_stop ? u`
              <div class="actions">
                ${P({
      label: "Stop charging",
      disabled: this._busy,
      onClick: () => this._run(() => Tt(this.hass, e.charge_stop))
    })}
              </div>
            ` : l}
      </ha-card>
    `;
  }
};
H.styles = [
  Rt,
  jt,
  Lt,
  Dt
];
tt([
  q({ attribute: !1 })
], H.prototype, "hass", 2);
tt([
  T()
], H.prototype, "_config", 2);
tt([
  T()
], H.prototype, "_busy", 2);
H = tt([
  V("carlinko-charging")
], H);
var Ne = Object.defineProperty, Me = Object.getOwnPropertyDescriptor, pt = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? Me(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (i ? o(t, s, r) : o(r)) || r);
  return i && r && Ne(t, s, r), r;
};
let Q = class extends _ {
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
    return !this.hass || !this._config ? l : u`
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
pt([
  q({ attribute: !1 })
], Q.prototype, "hass", 2);
pt([
  T()
], Q.prototype, "_config", 2);
Q = pt([
  V("carlinko-charging-editor")
], Q);
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
  }
);
console.info(
  "%c CARLINKO-CARD %c 0.1.0 ",
  "color:#fff;background:#0d9488;font-weight:700",
  "color:#0d9488;background:transparent;font-weight:700"
);
//# sourceMappingURL=carlinko-card.js.map
