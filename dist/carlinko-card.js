/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const it = globalThis, Ct = it.ShadowRoot && (it.ShadyCSS === void 0 || it.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, St = Symbol(), Ht = /* @__PURE__ */ new WeakMap();
let ie = class {
  constructor(t, s, r) {
    if (this._$cssResult$ = !0, r !== St) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (Ct && t === void 0) {
      const r = s !== void 0 && s.length === 1;
      r && (t = Ht.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && Ht.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ye = (e) => new ie(typeof e == "string" ? e : e + "", void 0, St), b = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((r, i, o) => r + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + e[o + 1], e[0]);
  return new ie(s, e, St);
}, $e = (e, t) => {
  if (Ct) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const r = document.createElement("style"), i = it.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = s.cssText, e.appendChild(r);
  }
}, Mt = Ct ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const r of t.cssRules) s += r.cssText;
  return ye(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: we, defineProperty: ke, getOwnPropertyDescriptor: xe, getOwnPropertyNames: Ce, getOwnPropertySymbols: Se, getPrototypeOf: Oe } = Object, O = globalThis, Nt = O.trustedTypes, Ae = Nt ? Nt.emptyScript : "", yt = O.reactiveElementPolyfillSupport, K = (e, t) => e, rt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Ae : null;
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
} }, Ot = (e, t) => !we(e, t), Zt = { attribute: !0, type: String, converter: rt, reflect: !1, useDefault: !1, hasChanged: Ot };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), O.litPropertyMetadata ?? (O.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let U = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = Zt) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(t, r, s);
      i !== void 0 && ke(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, s, r) {
    const { get: i, set: o } = xe(this.prototype, t) ?? { get() {
      return this[s];
    }, set(n) {
      this[s] = n;
    } };
    return { get: i, set(n) {
      const c = i == null ? void 0 : i.call(this);
      o == null || o.call(this, n), this.requestUpdate(t, c, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Zt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(K("elementProperties"))) return;
    const t = Oe(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(K("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(K("properties"))) {
      const s = this.properties, r = [...Ce(s), ...Se(s)];
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
      for (const i of r) s.unshift(Mt(i));
    } else t !== void 0 && s.push(Mt(t));
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
    return $e(t, this.constructor.elementStyles), t;
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
    var o;
    const r = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, r);
    if (i !== void 0 && r.reflect === !0) {
      const n = (((o = r.converter) == null ? void 0 : o.toAttribute) !== void 0 ? r.converter : rt).toAttribute(s, r.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, s) {
    var o, n;
    const r = this.constructor, i = r._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const c = r.getPropertyOptions(i), h = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((o = c.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? c.converter : rt;
      this._$Em = i;
      const u = h.fromAttribute(s, c.type);
      this[i] = u ?? ((n = this._$Ej) == null ? void 0 : n.get(i)) ?? u, this._$Em = null;
    }
  }
  requestUpdate(t, s, r, i = !1, o) {
    var n;
    if (t !== void 0) {
      const c = this.constructor;
      if (i === !1 && (o = this[t]), r ?? (r = c.getPropertyOptions(t)), !((r.hasChanged ?? Ot)(o, s) || r.useDefault && r.reflect && o === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(c._$Eu(t, r)))) return;
      this.C(t, s, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: r, reflect: i, wrapped: o }, n) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? s ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (s = void 0), this._$AL.set(t, s)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [o, n] of this._$Ep) this[o] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, n] of i) {
        const { wrapped: c } = n, h = this[o];
        c !== !0 || this._$AL.has(o) || h === void 0 || this.C(o, void 0, n, h);
      }
    }
    let t = !1;
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s), t ? (this.willUpdate(s), (r = this._$EO) == null || r.forEach((i) => {
        var o;
        return (o = i.hostUpdate) == null ? void 0 : o.call(i);
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
U.elementStyles = [], U.shadowRootOptions = { mode: "open" }, U[K("elementProperties")] = /* @__PURE__ */ new Map(), U[K("finalized")] = /* @__PURE__ */ new Map(), yt == null || yt({ ReactiveElement: U }), (O.reactiveElementVersions ?? (O.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F = globalThis, Lt = (e) => e, ot = F.trustedTypes, Ut = ot ? ot.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, re = "$lit$", C = `lit$${Math.random().toFixed(9).slice(2)}$`, oe = "?" + C, Ee = `<${oe}>`, Z = document, G = () => Z.createComment(""), J = (e) => e === null || typeof e != "object" && typeof e != "function", At = Array.isArray, Pe = (e) => At(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", $t = `[ 	
\f\r]`, q = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Bt = /-->/g, Dt = />/g, P = RegExp(`>|${$t}(?:([^\\s"'>=/]+)(${$t}*=${$t}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Vt = /'/g, Rt = /"/g, ne = /^(?:script|style|textarea|title)$/i, Te = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), a = Te(1), D = Symbol.for("lit-noChange"), l = Symbol.for("lit-nothing"), jt = /* @__PURE__ */ new WeakMap(), H = Z.createTreeWalker(Z, 129);
function ae(e, t) {
  if (!At(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ut !== void 0 ? Ut.createHTML(t) : t;
}
const He = (e, t) => {
  const s = e.length - 1, r = [];
  let i, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = q;
  for (let c = 0; c < s; c++) {
    const h = e[c];
    let u, p, d = -1, v = 0;
    for (; v < h.length && (n.lastIndex = v, p = n.exec(h), p !== null); ) v = n.lastIndex, n === q ? p[1] === "!--" ? n = Bt : p[1] !== void 0 ? n = Dt : p[2] !== void 0 ? (ne.test(p[2]) && (i = RegExp("</" + p[2], "g")), n = P) : p[3] !== void 0 && (n = P) : n === P ? p[0] === ">" ? (n = i ?? q, d = -1) : p[1] === void 0 ? d = -2 : (d = n.lastIndex - p[2].length, u = p[1], n = p[3] === void 0 ? P : p[3] === '"' ? Rt : Vt) : n === Rt || n === Vt ? n = P : n === Bt || n === Dt ? n = q : (n = P, i = void 0);
    const f = n === P && e[c + 1].startsWith("/>") ? " " : "";
    o += n === q ? h + Ee : d >= 0 ? (r.push(u), h.slice(0, d) + re + h.slice(d) + C + f) : h + C + (d === -2 ? c : f);
  }
  return [ae(e, o + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class Q {
  constructor({ strings: t, _$litType$: s }, r) {
    let i;
    this.parts = [];
    let o = 0, n = 0;
    const c = t.length - 1, h = this.parts, [u, p] = He(t, s);
    if (this.el = Q.createElement(u, r), H.currentNode = this.el.content, s === 2 || s === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = H.nextNode()) !== null && h.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(re)) {
          const v = p[n++], f = i.getAttribute(d).split(C), m = /([.?@])?(.*)/.exec(v);
          h.push({ type: 1, index: o, name: m[2], strings: f, ctor: m[1] === "." ? Ne : m[1] === "?" ? Ze : m[1] === "@" ? Le : dt }), i.removeAttribute(d);
        } else d.startsWith(C) && (h.push({ type: 6, index: o }), i.removeAttribute(d));
        if (ne.test(i.tagName)) {
          const d = i.textContent.split(C), v = d.length - 1;
          if (v > 0) {
            i.textContent = ot ? ot.emptyScript : "";
            for (let f = 0; f < v; f++) i.append(d[f], G()), H.nextNode(), h.push({ type: 2, index: ++o });
            i.append(d[v], G());
          }
        }
      } else if (i.nodeType === 8) if (i.data === oe) h.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = i.data.indexOf(C, d + 1)) !== -1; ) h.push({ type: 7, index: o }), d += C.length - 1;
      }
      o++;
    }
  }
  static createElement(t, s) {
    const r = Z.createElement("template");
    return r.innerHTML = t, r;
  }
}
function V(e, t, s = e, r) {
  var n, c;
  if (t === D) return t;
  let i = r !== void 0 ? (n = s._$Co) == null ? void 0 : n[r] : s._$Cl;
  const o = J(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== o && ((c = i == null ? void 0 : i._$AO) == null || c.call(i, !1), o === void 0 ? i = void 0 : (i = new o(e), i._$AT(e, s, r)), r !== void 0 ? (s._$Co ?? (s._$Co = []))[r] = i : s._$Cl = i), i !== void 0 && (t = V(e, i._$AS(e, t.values), i, r)), t;
}
class Me {
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
    const { el: { content: s }, parts: r } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? Z).importNode(s, !0);
    H.currentNode = i;
    let o = H.nextNode(), n = 0, c = 0, h = r[0];
    for (; h !== void 0; ) {
      if (n === h.index) {
        let u;
        h.type === 2 ? u = new X(o, o.nextSibling, this, t) : h.type === 1 ? u = new h.ctor(o, h.name, h.strings, this, t) : h.type === 6 && (u = new Ue(o, this, t)), this._$AV.push(u), h = r[++c];
      }
      n !== (h == null ? void 0 : h.index) && (o = H.nextNode(), n++);
    }
    return H.currentNode = Z, i;
  }
  p(t) {
    let s = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, s), s += r.strings.length - 2) : r._$AI(t[s])), s++;
  }
}
class X {
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
    t = V(this, t, s), J(t) ? t === l || t == null || t === "" ? (this._$AH !== l && this._$AR(), this._$AH = l) : t !== this._$AH && t !== D && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Pe(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== l && J(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Z.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: s, _$litType$: r } = t, i = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = Q.createElement(ae(r.h, r.h[0]), this.options)), r);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === i) this._$AH.p(s);
    else {
      const n = new Me(i, this), c = n.u(this.options);
      n.p(s), this.T(c), this._$AH = n;
    }
  }
  _$AC(t) {
    let s = jt.get(t.strings);
    return s === void 0 && jt.set(t.strings, s = new Q(t)), s;
  }
  k(t) {
    At(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let r, i = 0;
    for (const o of t) i === s.length ? s.push(r = new X(this.O(G()), this.O(G()), this, this.options)) : r = s[i], r._$AI(o), i++;
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
class dt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, r, i, o) {
    this.type = 1, this._$AH = l, this._$AN = void 0, this.element = t, this.name = s, this._$AM = i, this.options = o, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = l;
  }
  _$AI(t, s = this, r, i) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = V(this, t, s, 0), n = !J(t) || t !== this._$AH && t !== D, n && (this._$AH = t);
    else {
      const c = t;
      let h, u;
      for (t = o[0], h = 0; h < o.length - 1; h++) u = V(this, c[r + h], s, h), u === D && (u = this._$AH[h]), n || (n = !J(u) || u !== this._$AH[h]), u === l ? t = l : t !== l && (t += (u ?? "") + o[h + 1]), this._$AH[h] = u;
    }
    n && !i && this.j(t);
  }
  j(t) {
    t === l ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ne extends dt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === l ? void 0 : t;
  }
}
class Ze extends dt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== l);
  }
}
class Le extends dt {
  constructor(t, s, r, i, o) {
    super(t, s, r, i, o), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = V(this, t, s, 0) ?? l) === D) return;
    const r = this._$AH, i = t === l && r !== l || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, o = t !== l && (r === l || i);
    i && this.element.removeEventListener(this.name, this, r), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ue {
  constructor(t, s, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    V(this, t);
  }
}
const wt = F.litHtmlPolyfillSupport;
wt == null || wt(Q, X), (F.litHtmlVersions ?? (F.litHtmlVersions = [])).push("3.3.3");
const Be = (e, t, s) => {
  const r = (s == null ? void 0 : s.renderBefore) ?? t;
  let i = r._$litPart$;
  if (i === void 0) {
    const o = (s == null ? void 0 : s.renderBefore) ?? null;
    r._$litPart$ = i = new X(t.insertBefore(G(), o), o, void 0, s ?? {});
  }
  return i._$AI(e), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis;
class $ extends U {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Be(s, this.renderRoot, this.renderOptions);
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
    return D;
  }
}
var se;
$._$litElement$ = !0, $.finalized = !0, (se = N.litElementHydrateSupport) == null || se.call(N, { LitElement: $ });
const kt = N.litElementPolyfillSupport;
kt == null || kt({ LitElement: $ });
(N.litElementVersions ?? (N.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _ = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const De = { attribute: !0, type: String, converter: rt, reflect: !1, hasChanged: Ot }, Ve = (e = De, t, s) => {
  const { kind: r, metadata: i } = s;
  let o = globalThis.litPropertyMetadata.get(i);
  if (o === void 0 && globalThis.litPropertyMetadata.set(i, o = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(s.name, e), r === "accessor") {
    const { name: n } = s;
    return { set(c) {
      const h = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(n, h, e, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(n, void 0, e, c), c;
    } };
  }
  if (r === "setter") {
    const { name: n } = s;
    return function(c) {
      const h = this[n];
      t.call(this, c), this.requestUpdate(n, h, e, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function E(e) {
  return (t, s) => typeof s == "object" ? Ve(e, t, s) : ((r, i, o) => {
    const n = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, r), n ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function x(e) {
  return E({ ...e, state: !0, attribute: !1 });
}
async function ut(e, t, s, r) {
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
function Re(e, t) {
  return e === t || e.endsWith(`_${t}`) ? !0 : e.startsWith("carlinko_") && e.endsWith(`_${t}`);
}
function je(e, t) {
  return t === "defrost" || t.endsWith("_left") || t.endsWith("_right") ? [e, "switch", "binary_sensor"] : [e];
}
function We(e, t) {
  return !!(t && e.states[t]);
}
function Ie(e, t, s, r) {
  const i = e.entities;
  if (!i)
    return;
  const o = [];
  for (const c of Object.values(i)) {
    if (!(c != null && c.entity_id) || !c.unique_id || c.device_id !== t || c.disabled_by || c.hidden_by)
      continue;
    const h = c.entity_id.split(".", 1)[0];
    r.includes(h) && Re(c.unique_id, s) && o.push(c.entity_id);
  }
  return o.length === 0 ? void 0 : o.find((c) => We(e, c)) ?? o[0];
}
function ze(e, t, s) {
  var n, c;
  if (!e)
    return;
  const r = (n = t.entities) == null ? void 0 : n[s.slot];
  if (r)
    return r;
  if (s.slot === "image" && t.image_entity)
    return t.image_entity;
  const i = (c = t.device_id) == null ? void 0 : c.trim();
  if (!i)
    return;
  const o = [s.key, ...s.fallbackKeys ?? []];
  for (const h of o) {
    const u = je(s.domain, h), p = Ie(e, i, h, u);
    if (p)
      return p;
  }
}
function pt(e, t, s) {
  const r = {};
  for (const i of s)
    r[i.slot] = ze(e, t, i);
  return r;
}
const le = [
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
  le.map((e) => [e.slot, e])
);
const qe = [
  { slot: "charging", key: "charging", domain: "binary_sensor" },
  { slot: "charge_state", key: "charge_state", domain: "sensor" },
  { slot: "charge_mode", key: "charge_mode", domain: "sensor" },
  { slot: "charge_remaining", key: "charge_remaining", domain: "sensor" },
  { slot: "charge_power", key: "charge_power", domain: "sensor" },
  { slot: "charge_stop", key: "charge_stop", domain: "button" }
], Ke = [
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
  { slot: "tyre_status", key: "tyre_status", domain: "sensor" },
  { slot: "tyres_ok", key: "tyres_ok", domain: "binary_sensor" },
  { slot: "windows", key: "windows", domain: "cover" },
  { slot: "windows_vent", key: "windows_vent", domain: "button" },
  { slot: "sunroof", key: "sunroof", domain: "cover" },
  { slot: "sunroof_tilt", key: "sunroof_tilt", domain: "button" }
], Fe = [
  { slot: "windows", key: "windows", domain: "cover" },
  { slot: "windows_vent", key: "windows_vent", domain: "button" },
  { slot: "sunroof", key: "sunroof", domain: "cover" },
  { slot: "sunroof_tilt", key: "sunroof_tilt", domain: "button" }
];
function Y(e, t) {
  if (!(!e || !t))
    return e.states[t];
}
function k(e, t) {
  var s;
  return (s = Y(e, t)) == null ? void 0 : s.state;
}
function Wt(e, t) {
  const s = k(e, t);
  if (s === void 0 || s === "unknown" || s === "unavailable")
    return;
  const r = Number(s);
  return Number.isFinite(r) ? r : void 0;
}
function B(e, t) {
  const s = k(e, t);
  return s === "on" || s === "open" || s === "unlocked";
}
function y(e, t, s = "—") {
  const r = Y(e, t);
  if (!r || r.state === "unknown" || r.state === "unavailable")
    return s;
  const i = r.attributes.unit_of_measurement;
  return i ? `${r.state} ${i}` : String(r.state);
}
function xt(e, t) {
  if (/^https?:\/\//i.test(t))
    return t;
  const s = ((e == null ? void 0 : e.hassUrl) || "").replace(/\/$/, "");
  return s ? t.startsWith("/") ? `${s}${t}` : `${s}/${t}` : t;
}
function ce(e, t) {
  const s = Y(e, t);
  if (!s)
    return;
  const r = s.attributes.entity_picture;
  if (typeof r == "string" && r)
    return xt(e, r);
  const i = s.attributes.access_token;
  return typeof i == "string" && i ? xt(
    e,
    `/api/image_proxy/${t}?token=${encodeURIComponent(i)}`
  ) : xt(e, `/api/image_proxy/${t}`);
}
async function w(e, t, s, r, i = {}) {
  await e.callService(t, s, { ...i, entity_id: r });
}
async function Ge(e, t) {
  await w(e, "lock", "lock", t);
}
async function Je(e, t) {
  await w(e, "lock", "unlock", t);
}
async function he(e, t) {
  const s = t.split(".", 1)[0];
  await w(e, s, "turn_on", t);
}
async function de(e, t) {
  const s = t.split(".", 1)[0];
  await w(e, s, "turn_off", t);
}
async function Qe(e, t) {
  const s = t.split(".", 1)[0];
  await w(e, s, "toggle", t);
}
async function nt(e, t) {
  await w(e, "cover", "open_cover", t);
}
async function at(e, t) {
  await w(e, "cover", "close_cover", t);
}
function It(e, t) {
  const s = k(e, t);
  return s === "open" || s === "opening";
}
async function M(e, t) {
  await w(e, "button", "press", t);
}
function tt(e, t, s) {
  const r = Y(e, t);
  if (!r)
    return;
  const i = r.attributes[s];
  if (i == null)
    return;
  const o = Number(i);
  return Number.isFinite(o) ? o : void 0;
}
function zt(e, t) {
  return tt(e, t, "temperature");
}
function Xe(e, t) {
  return tt(e, t, "current_temperature");
}
function Ye(e, t) {
  return tt(e, t, "target_temp_step") ?? 1;
}
function ts(e, t) {
  return tt(e, t, "min_temp") ?? 16;
}
function es(e, t) {
  return tt(e, t, "max_temp") ?? 30;
}
function qt(e, t) {
  const s = k(e, t);
  return s === "cool" || s === "heat" || s === "heat_cool" || s === "auto" || s === "fan_only" || s === "dry" || s === "on";
}
async function ss(e, t, s) {
  await w(e, "climate", "set_hvac_mode", t, {
    hvac_mode: s
  });
}
async function is(e, t, s) {
  await w(e, "climate", "set_temperature", t, {
    temperature: s
  });
}
async function rs(e, t, s) {
  await w(e, "select", "select_option", t, {
    option: s
  });
}
function os(e, t) {
  const s = Y(e, t), r = s == null ? void 0 : s.attributes.options;
  return Array.isArray(r) ? r.map(String) : [];
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
const vt = b`
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
`, ue = b`
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
`, pe = b`
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
`, Et = b`
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
const ns = b`
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
`, as = b`
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
function st(e, t, s, r, i) {
  if (!t || !r || !t.states[r])
    return l;
  let o = y(t, r);
  return a`
    <button
      type="button"
      class="metric"
      @click=${() => S(e, r)}
    >
      <span class="metric-label">${s}</span>
      <span class="metric-value">${o}</span>
    </button>
  `;
}
function g(e) {
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
function ve(e, t) {
  return e ? a`<span class="chip ${t != null && t.ok ? "ok" : ""}">${e}</span>` : l;
}
const ls = {
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
  `
};
function T(e) {
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
      ${ls[e.icon]}
    </button>
  `;
}
function Kt(e) {
  const { percent: t, primary: s, secondary: r, meta: i } = e;
  if (t === void 0 && !s && !r && !i)
    return l;
  const o = e.tone ?? "ok", n = t === void 0 || Number.isNaN(t) ? void 0 : Math.max(0, Math.min(100, t));
  return a`
    <div class="vgauge tone-${o}">
      <div
        class="vgauge-bar-wrap"
        aria-hidden=${n === void 0 ? "true" : "false"}
      >
        ${n !== void 0 ? a`<div class="vgauge-bar" style="height:${n}%"></div>` : l}
      </div>
      <div class="vgauge-text">
        ${s ? a`<div class="vgauge-primary">${s}</div>` : l}
        ${n !== void 0 ? a`<div class="vgauge-pct">${Math.round(n)}%</div>` : l}
        ${r ? a`<div class="vgauge-secondary">${r}</div>` : l}
        ${i ? a`<div class="vgauge-meta">${i}</div>` : l}
      </div>
    </div>
  `;
}
var cs = Object.defineProperty, hs = Object.getOwnPropertyDescriptor, fe = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? hs(t, s) : t, o = e.length - 1, n; o >= 0; o--)
    (n = e[o]) && (i = (r ? n(t, s, i) : n(i)) || i);
  return r && i && cs(t, s, i), i;
};
let lt = class extends $ {
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
lt.styles = b`
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
      top: 24%;
      transform: translateX(-50%);
    }
    .sunroof {
      left: 50%;
      top: 46%;
      transform: translateX(-50%);
    }
  `;
fe([
  E({ type: String })
], lt.prototype, "src", 2);
lt = fe([
  _("carlinko-car-outline")
], lt);
var ds = Object.defineProperty, us = Object.getOwnPropertyDescriptor, ge = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? us(t, s) : t, o = e.length - 1, n; o >= 0; o--)
    (n = e[o]) && (i = (r ? n(t, s, i) : n(i)) || i);
  return r && i && ds(t, s, i), i;
};
let ct = class extends $ {
  render() {
    const e = !!this.src;
    return a`
      <div class="wrap ${e ? "has-img" : ""}">
        ${e ? a`<img class="car-img" src=${this.src} alt="Vehicle" />` : a`<div class="placeholder"><slot name="placeholder">No image</slot></div>`}
        <div class="region engine"><slot name="engine"></slot></div>
        <div class="region lock"><slot name="lock"></slot></div>
        <div class="region online"><slot name="online"></slot></div>
        <div class="region hv"><slot name="hv"></slot></div>
        <div class="region defog"><slot name="defog"></slot></div>
        <div class="region charge"><slot name="charge"></slot></div>
        <div class="region trunk"><slot name="trunk"></slot></div>
      </div>
    `;
  }
};
ct.styles = b`
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
    /* Anchors from annotated vehicle_front map (1–6) + HV status beside online */
    .online {
      left: 5%;
      top: 11%;
    }
    .hv {
      left: 16%;
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
ge([
  E({ type: String })
], ct.prototype, "src", 2);
ct = ge([
  _("carlinko-vehicle-stage")
], ct);
var ps = Object.defineProperty, vs = Object.getOwnPropertyDescriptor, ft = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? vs(t, s) : t, o = e.length - 1, n; o >= 0; o--)
    (n = e[o]) && (i = (r ? n(t, s, i) : n(i)) || i);
  return r && i && ps(t, s, i), i;
};
function fs(e) {
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
let R = class extends $ {
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
    return this._config ? pt(this.hass, this._config, le) : {};
  }
  _run(e) {
    this.hass && ut(
      () => this._busy,
      (t) => {
        this._busy = t;
      },
      e,
      (t) => console.error("carlinko-overview action failed", t)
    );
  }
  render() {
    var Pt, Tt;
    if (!this._config)
      return a`<ha-card><div class="pad">Not configured</div></ha-card>`;
    if (!((Pt = this._config.device_id) != null && Pt.trim()))
      return a`<ha-card
        ><div class="pad">Select a CarLinko vehicle device</div></ha-card
      >`;
    if (!this.hass)
      return a`<ha-card><div class="pad">Waiting for Home Assistant…</div></ha-card>`;
    const e = this._slots(), t = ce(this.hass, e.image), r = k(this.hass, e.lock) === "locked", i = B(this.hass, e.engine), o = B(this.hass, e.defog), n = k(this.hass, e.trunk) === "open", c = B(this.hass, e.online), h = Wt(this.hass, e.battery), u = Wt(this.hass, e.fuel), p = !!((Tt = e.defog) != null && Tt.startsWith("binary_sensor.")), d = e.odometer && this.hass.states[e.odometer] ? y(this.hass, e.odometer) : void 0, v = e.total_range && this.hass.states[e.total_range] ? y(this.hass, e.total_range) : void 0, f = i && e.engine && e.speed && this.hass.states[e.speed] ? y(this.hass, e.speed) : void 0, m = e.range && this.hass.states[e.range] ? y(this.hass, e.range) : void 0, et = e.fuel_range && this.hass.states[e.fuel_range] ? y(this.hass, e.fuel_range) : void 0, bt = k(this.hass, e.hv_state), L = e.hv_state ? fs(bt) : void 0, z = e.consumption && this.hass.states[e.consumption] ? y(this.hass, e.consumption) : void 0, me = e.fuel_consumption && this.hass.states[e.fuel_consumption] ? y(this.hass, e.fuel_consumption) : void 0, be = !!(d || v || f);
    return a`
      <ha-card>
        ${this._config.title ? a`<div class="header">${this._config.title}</div>` : l}
        <div class="body">
          <div class="hero">
            <carlinko-vehicle-stage .src=${t}>
              ${e.engine ? a`<div slot="engine">
                    ${T({
      icon: "engine",
      label: i ? "Turn engine off" : "Turn engine on",
      tone: i ? "ok" : "muted",
      disabled: this._busy,
      onClick: () => this._run(
        () => i ? de(this.hass, e.engine) : he(this.hass, e.engine)
      )
    })}
                  </div>` : l}
              ${e.lock ? a`<div slot="lock">
                    ${T({
      icon: r ? "lock" : "unlock",
      label: r ? "Unlock doors" : "Lock doors",
      tone: r ? "muted" : "danger",
      disabled: this._busy,
      onClick: () => this._run(
        () => r ? Je(this.hass, e.lock) : Ge(this.hass, e.lock)
      )
    })}
                  </div>` : l}
              ${e.online ? a`<div slot="online">
                    ${T({
      icon: "signal",
      label: c ? "Online" : "Offline",
      tone: c ? "ok" : "muted",
      onClick: () => S(this, e.online)
    })}
                  </div>` : l}
              ${e.hv_state && L ? a`<div slot="hv">
                    ${T({
      icon: "hv",
      label: L.label,
      tone: L.tone,
      onClick: () => S(this, e.hv_state)
    })}
                  </div>` : l}
              ${e.defog ? a`<div slot="defog">
                    ${T({
      icon: "defog",
      label: o ? "Turn defog off" : "Turn defog on",
      tone: o ? "warn" : "muted",
      disabled: this._busy || p,
      onClick: () => this._run(() => Qe(this.hass, e.defog))
    })}
                  </div>` : l}
              ${e.charge_stop ? a`<div slot="charge">
                    ${T({
      icon: "charge",
      label: "Stop charge",
      tone: "info",
      disabled: this._busy,
      onClick: () => this._run(
        () => M(this.hass, e.charge_stop)
      )
    })}
                  </div>` : l}
              ${e.trunk ? a`<div slot="trunk">
                    ${T({
      icon: "trunk",
      label: n ? "Close trunk" : "Open trunk",
      tone: n ? "warn" : "muted",
      disabled: this._busy,
      onClick: () => this._run(
        () => n ? at(this.hass, e.trunk) : nt(this.hass, e.trunk)
      )
    })}
                  </div>` : l}
            </carlinko-vehicle-stage>
          </div>
          <div class="vitals">
            ${be ? a`
                  <div class="headline">
                    ${d ? a`<button
                          type="button"
                          class="odo"
                          @click=${() => S(this, e.odometer)}
                        >
                          <span class="odo-label">Odometer</span>
                          <span class="odo-value">${d}</span>
                        </button>` : l}
                    ${v ? a`<button
                          type="button"
                          class="range-total"
                          @click=${() => S(this, e.total_range)}
                        >
                          <span class="range-label">Total range</span>
                          <span class="range-value">${v}</span>
                        </button>` : l}
                    ${f ? a`<button
                          type="button"
                          class="speed"
                          @click=${() => S(this, e.speed)}
                        >
                          <span class="speed-label">Speed</span>
                          <span class="speed-value">${f}</span>
                        </button>` : l}
                  </div>
                ` : l}
            <div class="gauges">
              ${Kt({
      percent: h,
      primary: h !== void 0 || m ? "SOC" : void 0,
      secondary: m,
      meta: z,
      tone: "ok"
    })}
              ${Kt({
      percent: u,
      primary: u !== void 0 || et ? "Fuel" : void 0,
      secondary: et,
      meta: me,
      tone: "info"
    })}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
R.styles = [
  vt,
  ns,
  as,
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
ft([
  E({ attribute: !1 })
], R.prototype, "hass", 2);
ft([
  x()
], R.prototype, "_config", 2);
ft([
  x()
], R.prototype, "_busy", 2);
R = ft([
  _("carlinko-overview")
], R);
var gs = Object.defineProperty, _e = (e, t, s, r) => {
  for (var i = void 0, o = e.length - 1, n; o >= 0; o--)
    (n = e[o]) && (i = n(t, s, i) || i);
  return i && gs(t, s, i), i;
};
const _s = [
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
], ms = {
  name: "image_entity",
  label: "Image override (optional)",
  selector: {
    entity: {
      domain: "image",
      filter: { integration: "carlinko" }
    }
  }
}, bs = {
  name: "image_entity",
  label: "Top image override (optional)",
  selector: {
    entity: {
      domain: "image",
      filter: { integration: "carlinko" }
    }
  }
};
class I extends $ {
  setConfig(t) {
    this._config = { ...t };
  }
  /** Extra fields after device_id + title. */
  extraSchema() {
    return [];
  }
  _schema() {
    return [..._s, ...this.extraSchema()];
  }
  _valueChanged(t) {
    var r;
    t.stopPropagation();
    const s = (r = t.detail) == null ? void 0 : r.value;
    s && (this._config = { ...s }, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  render() {
    return !this.hass || !this._config ? l : a`
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
_e([
  E({ attribute: !1 })
], I.prototype, "hass");
_e([
  x()
], I.prototype, "_config");
var ys = Object.getOwnPropertyDescriptor, $s = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? ys(t, s) : t, o = e.length - 1, n; o >= 0; o--)
    (n = e[o]) && (i = n(i) || i);
  return i;
};
let Ft = class extends I {
  extraSchema() {
    return [ms];
  }
};
Ft = $s([
  _("carlinko-overview-editor")
], Ft);
var ws = Object.defineProperty, ks = Object.getOwnPropertyDescriptor, gt = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? ks(t, s) : t, o = e.length - 1, n; o >= 0; o--)
    (n = e[o]) && (i = (r ? n(t, s, i) : n(i)) || i);
  return r && i && ws(t, s, i), i;
};
let j = class extends $ {
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
    return this._config ? pt(this.hass, this._config, qe) : {};
  }
  _run(e) {
    this.hass && ut(
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
    const e = this._slots(), t = B(this.hass, e.charging);
    return a`
      <ha-card>
        ${this._config.title ? a`<div class="header">${this._config.title}</div>` : l}
        <div class="body-pad">
          <div class="chips">
            ${e.charging && this.hass.states[e.charging] ? ve(t ? "Charging" : "Not charging", {
      ok: t
    }) : l}
          </div>
          ${st(this, this.hass, "Charge state", e.charge_state)}
          ${st(this, this.hass, "Mode", e.charge_mode)}
          ${st(this, this.hass, "Remaining", e.charge_remaining)}
          ${st(this, this.hass, "Power", e.charge_power)}
        </div>
        ${e.charge_stop ? a`
              <div class="actions">
                ${g({
      label: "Stop charging",
      disabled: this._busy,
      onClick: () => this._run(() => M(this.hass, e.charge_stop))
    })}
              </div>
            ` : l}
      </ha-card>
    `;
  }
};
j.styles = [
  vt,
  ue,
  pe,
  Et
];
gt([
  E({ attribute: !1 })
], j.prototype, "hass", 2);
gt([
  x()
], j.prototype, "_config", 2);
gt([
  x()
], j.prototype, "_busy", 2);
j = gt([
  _("carlinko-charging")
], j);
var xs = Object.getOwnPropertyDescriptor, Cs = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? xs(t, s) : t, o = e.length - 1, n; o >= 0; o--)
    (n = e[o]) && (i = n(i) || i);
  return i;
};
let Gt = class extends I {
};
Gt = Cs([
  _("carlinko-charging-editor")
], Gt);
var Ss = Object.defineProperty, Os = Object.getOwnPropertyDescriptor, _t = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Os(t, s) : t, o = e.length - 1, n; o >= 0; o--)
    (n = e[o]) && (i = (r ? n(t, s, i) : n(i)) || i);
  return r && i && Ss(t, s, i), i;
};
const Jt = [
  { slot: "seat-fl", heat: "seat_heat_l", vent: "seat_vent_l" },
  { slot: "seat-fr", heat: "seat_heat_r", vent: "seat_vent_r" },
  { slot: "seat-rl", heat: "seat_heat_lr", vent: "seat_vent_lr" },
  { slot: "seat-rr", heat: "seat_heat_rr", vent: "seat_vent_rr" }
], As = [
  { slot: "wheel-fl", pressure: "tyre_fl", temp: "tyre_fl_temp" },
  { slot: "wheel-fr", pressure: "tyre_fr", temp: "tyre_fr_temp" },
  { slot: "wheel-rl", pressure: "tyre_rl", temp: "tyre_rl_temp" },
  { slot: "wheel-rr", pressure: "tyre_rr", temp: "tyre_rr_temp" }
], Es = ["tyre_fl", "tyre_fr", "tyre_rl", "tyre_rr"], Ps = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M13 3h-2v10h2V3Zm4.83 2.17-1.42 1.42A6.92 6.92 0 0 1 19 12a7 7 0 1 1-14 0c0-2.12.95-4.03 2.47-5.32L6.05 5.17A8.96 8.96 0 0 0 3 12a9 9 0 1 0 18 0c0-2.74-1.22-5.2-3.17-6.83Z"
    />
  </svg>
`, Ts = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5Z" />
  </svg>
`, Hs = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M5 11h14v2H5v-2Z" />
  </svg>
`, Ms = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2v3.5l1.5-1.5 1 1L12 8l-2.5-2.5 1-1L12 5.5V2Zm0 20v-3.5l-1.5 1.5-1-1L12 16l2.5 2.5-1 1L12 18.5V22Zm10-10h-3.5l1.5 1.5-1 1L16 12l2.5-2.5 1 1L18.5 12H22ZM2 12h3.5L4 10.5l1-1L8 12l-2.5 2.5-1-1L5.5 12H2Zm14.95-6.36-1.41 1.41.71.71L14.83 9.5l-1.41-1.41.71-.71 1.41 1.41ZM9.17 14.5l1.41 1.41-.71.71-1.41-1.41.71-.71ZM9.17 9.5l.71.71-1.41 1.41-.71-.71L9.17 9.5Zm5.66 5.66.71.71-1.41 1.41-.71-.71 1.41-1.41Z"
    />
  </svg>
`, Ns = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M17.66 11.2c.03 1.6-1.02 2.96-2.28 4.05C15.31 16.1 14 17.45 13.15 19c-.55.9-.98 1.93-.85 3h.85c.22-1.19.78-2.2 1.4-3.08.68-.96 1.43-1.86 2.07-2.85.89-1.38 1.53-2.9 1.34-4.52-.11-.94-.5-1.86-1.1-2.62.55.9.9 1.97.8 3.07ZM12 2S9 7 9 11c0 2.4 1.34 4.37 3 5.6 1.66-1.23 3-3.2 3-5.6 0-4-3-9-3-9Zm0 12.5c-.83-.9-1.5-2.1-1.5-3.5 0-1.8.9-4.1 1.5-5.7.6 1.6 1.5 3.9 1.5 5.7 0 1.4-.67 2.6-1.5 3.5Z"
    />
  </svg>
`, Zs = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 4h16v16H4V4Zm2 2v12h5V6H6Zm7 0v5h5V6h-5Zm0 7v5h5v-5h-5Z"
    />
  </svg>
`, Ls = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 4h16v16H4V4Zm2 2v12h12V6H6Z"
    />
  </svg>
`, Us = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 4h16v16H4V4Zm2 2v5h12V6H6Zm0 7v5h12v-5H6Z"
    />
  </svg>
`, Bs = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M3 6h18v3H3V6Zm2 5h14v8H5v-8Zm3 2v4h8v-4H8Z"
    />
  </svg>
`, Ds = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M3 6h18v3H3V6Zm2 5h14v8H5v-8Z"
    />
  </svg>
`, Vs = a`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M3 8h18v2H3V8Zm2 4 14 2v6H5v-8Zm2 3.3V18h10v-2.3l-10-1.4Z"
    />
  </svg>
`;
function Rs(e) {
  return e.split(".", 1)[0];
}
function js(e) {
  return !e || e === "unknown" || e === "unavailable" ? "—" : e === "off" || e === "on" ? e : e.replace(/^level_?/i, "l").slice(0, 4);
}
let A = class extends $ {
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
    return this._config ? pt(this.hass, this._config, Ke) : {};
  }
  _run(e) {
    this.hass && ut(
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
    const s = zt(this.hass, t);
    if (s === void 0)
      return;
    const r = Ye(this.hass, t), i = ts(this.hass, t), o = es(this.hass, t), n = Math.min(o, Math.max(i, s + e * r));
    this._run(() => is(this.hass, t, n));
  }
  _toggleClimate() {
    const e = this._slots().climate;
    if (!this.hass || !e)
      return;
    const t = qt(this.hass, e);
    this._run(
      () => ss(this.hass, e, t ? "off" : "cool")
    );
  }
  _cycleSelect(e) {
    if (!this.hass)
      return;
    const t = os(this.hass, e);
    if (t.length === 0)
      return;
    const s = k(this.hass, e) ?? t[0], r = t.indexOf(s), i = t[(r + 1) % t.length];
    this._run(() => rs(this.hass, e, i));
  }
  _toggleBinary(e) {
    if (!this.hass)
      return;
    const t = k(this.hass, e) === "on";
    this._run(
      () => t ? de(this.hass, e) : he(this.hass, e)
    );
  }
  _hasDirectTpms(e) {
    return this.hass ? Es.some((t) => {
      const s = e[t];
      return !!(s && this.hass.states[s]);
    }) : !1;
  }
  _hasSeats(e) {
    return this.hass ? Jt.some((t) => {
      const s = t.heat ? e[t.heat] : void 0, r = t.vent ? e[t.vent] : void 0;
      return s && this.hass.states[s] || r && this.hass.states[r];
    }) : !1;
  }
  _seatControl(e, t) {
    var n;
    if (!e || !((n = this.hass) != null && n.states[e]))
      return l;
    const s = k(this.hass, e), r = Rs(e), i = `${t}:${js(s)}`, o = r === "select" ? () => this._cycleSelect(e) : () => this._toggleBinary(e);
    return a`
      <button
        type="button"
        class="seat-btn"
        ?disabled=${this._busy}
        title=${s ?? ""}
        @click=${o}
      >
        ${i}
      </button>
    `;
  }
  _seatZone(e, t) {
    var i, o;
    const s = e.heat ? t[e.heat] : void 0, r = e.vent ? t[e.vent] : void 0;
    return (!s || !((i = this.hass) != null && i.states[s])) && (!r || !((o = this.hass) != null && o.states[r])) ? l : a`
      <div slot=${e.slot} class="seat-zone">
        ${this._seatControl(s, "H")} ${this._seatControl(r, "V")}
      </div>
    `;
  }
  _sensorBtn(e, t) {
    if (!this.hass || !e || !this.hass.states[e])
      return l;
    const s = y(this.hass, e);
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
    var n, c;
    const s = t[e.pressure], r = t[e.temp], i = !!(s && ((n = this.hass) != null && n.states[s])), o = !!(r && ((c = this.hass) != null && c.states[r]));
    return !i && !o ? l : a`
      <div slot=${e.slot} class="wheel-zone">
        ${this._sensorBtn(s, "wheel-pressure")}
        ${this._sensorBtn(r, "wheel-temp")}
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
    const t = e.windows, s = e.windows_vent, r = this._entityExists(t), i = this._entityExists(s);
    if (!r && !i)
      return l;
    const o = r && It(this.hass, t);
    return a`
      <div slot="windows" class="map-actions">
        ${r ? g(o ? {
      label: "Close windows",
      icon: Ls,
      disabled: this._busy,
      onClick: () => this._run(() => at(this.hass, t))
    } : {
      label: "Open windows",
      icon: Zs,
      disabled: this._busy,
      onClick: () => this._run(() => nt(this.hass, t))
    }) : l}
        ${i ? g({
      label: "Vent windows",
      icon: Us,
      disabled: this._busy,
      onClick: () => this._run(() => M(this.hass, s))
    }) : l}
      </div>
    `;
  }
  _sunroofCluster(e) {
    const t = e.sunroof, s = e.sunroof_tilt, r = this._entityExists(t), i = this._entityExists(s);
    if (!r && !i)
      return l;
    const o = r && It(this.hass, t);
    return a`
      <div slot="sunroof" class="map-actions">
        ${r ? g(o ? {
      label: "Close sunroof",
      icon: Ds,
      disabled: this._busy,
      onClick: () => this._run(() => at(this.hass, t))
    } : {
      label: "Open sunroof",
      icon: Bs,
      disabled: this._busy,
      onClick: () => this._run(() => nt(this.hass, t))
    }) : l}
        ${i ? g({
      label: "Tilt sunroof",
      icon: Vs,
      disabled: this._busy,
      onClick: () => this._run(() => M(this.hass, s))
    }) : l}
      </div>
    `;
  }
  render() {
    var L;
    if (!this._config)
      return a`<ha-card><div class="pad">Not configured</div></ha-card>`;
    if (!((L = this._config.device_id) != null && L.trim()))
      return a`<ha-card
        ><div class="pad">Select a CarLinko vehicle device</div></ha-card
      >`;
    if (!this.hass)
      return a`<ha-card><div class="pad">Waiting for Home Assistant…</div></ha-card>`;
    const e = this._slots(), t = e.climate, s = t ? this.hass.states[t] : void 0, r = qt(this.hass, t), i = zt(this.hass, t), o = Xe(this.hass, t), n = (typeof (s == null ? void 0 : s.attributes.temperature_unit) == "string" ? s.attributes.temperature_unit : void 0) || (typeof (s == null ? void 0 : s.attributes.unit_of_measurement) == "string" ? s.attributes.unit_of_measurement : "°C"), c = this._hasSeats(e), h = this._hasDirectTpms(e), u = this._hasWindowsControls(e), p = ce(this.hass, e.image), d = c || h || u, v = e.tyres_ok, f = v && this.hass.states[v] ? v : void 0, m = e.tyre_status && this.hass.states[e.tyre_status] ? e.tyre_status : void 0, et = !!(f || m), bt = !!(s || e.quick_cool && this.hass.states[e.quick_cool] || e.quick_heat && this.hass.states[e.quick_heat]);
    return a`
      <ha-card>
        ${this._config.title ? a`<div class="header">${this._config.title}</div>` : l}
        <div class="body-pad">
          ${bt ? a`
                <div class="controls-row">
                  <div class="controls-left">
                    ${s ? a`
                          ${g({
      label: r ? "Climate off" : "Climate on",
      icon: Ps,
      disabled: this._busy,
      variant: r ? "ok" : "",
      onClick: () => this._toggleClimate()
    })}
                          ${g({
      label: "Increase temperature",
      icon: Ts,
      disabled: this._busy || i === void 0,
      onClick: () => this._nudgeTemp(1)
    })}
                          <span class="setpoint-value" title="Setpoint"
                            >${i !== void 0 ? `${i}${n}` : "—"}</span
                          >
                          ${g({
      label: "Decrease temperature",
      icon: Hs,
      disabled: this._busy || i === void 0,
      onClick: () => this._nudgeTemp(-1)
    })}
                        ` : l}
                  </div>
                  <div class="controls-right">
                    ${e.quick_cool && this.hass.states[e.quick_cool] ? g({
      label: "Quick cool",
      icon: Ms,
      disabled: this._busy,
      onClick: () => this._run(
        () => M(this.hass, e.quick_cool)
      )
    }) : l}
                    ${e.quick_heat && this.hass.states[e.quick_heat] ? g({
      label: "Quick heat",
      icon: Ns,
      disabled: this._busy,
      onClick: () => this._run(
        () => M(this.hass, e.quick_heat)
      )
    }) : l}
                  </div>
                </div>
              ` : l}
          ${s && o !== void 0 ? a`
                <div class="current-row">
                  <span class="metric-label">Current</span>
                  <span class="metric-value">${o}${n}</span>
                </div>
              ` : l}
          ${et ? a`
                <div class="chips">
                  ${f ? ve(
      B(this.hass, f) ? "Tyres OK" : "Tyre problem",
      { ok: B(this.hass, f) }
    ) : l}
                  ${m ? a`
                        <button
                          type="button"
                          class="chip chip-btn"
                          @click=${() => S(this, m)}
                        >
                          ${y(this.hass, m)}
                        </button>
                      ` : l}
                </div>
              ` : l}
          ${d ? a`
                <carlinko-car-outline .src=${p}>
                  ${this._windowsCluster(e)} ${this._sunroofCluster(e)}
                  ${Jt.map((z) => this._seatZone(z, e))}
                  ${h ? As.map((z) => this._wheelZone(z, e)) : l}
                </carlinko-car-outline>
              ` : l}
        </div>
      </ha-card>
    `;
  }
};
A.styles = [
  vt,
  ue,
  pe,
  Et,
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
      .chip-btn {
        font: inherit;
        cursor: pointer;
        color: inherit;
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
_t([
  E({ attribute: !1 })
], A.prototype, "hass", 2);
_t([
  x()
], A.prototype, "_config", 2);
_t([
  x()
], A.prototype, "_busy", 2);
A = _t([
  _("carlinko-cabin")
], A);
var Ws = Object.getOwnPropertyDescriptor, Is = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Ws(t, s) : t, o = e.length - 1, n; o >= 0; o--)
    (n = e[o]) && (i = n(i) || i);
  return i;
};
let ht = class extends I {
  extraSchema() {
    return [bs];
  }
};
ht = Is([
  _("carlinko-cabin-editor")
], ht);
var zs = Object.getOwnPropertyDescriptor, qs = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? zs(t, s) : t, o = e.length - 1, n; o >= 0; o--)
    (n = e[o]) && (i = n(i) || i);
  return i;
};
let Qt = class extends A {
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
Qt = qs([
  _("carlinko-climate")
], Qt);
var Ks = Object.getOwnPropertyDescriptor, Fs = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Ks(t, s) : t, o = e.length - 1, n; o >= 0; o--)
    (n = e[o]) && (i = n(i) || i);
  return i;
};
let Xt = class extends ht {
};
Xt = Fs([
  _("carlinko-climate-editor")
], Xt);
var Gs = Object.getOwnPropertyDescriptor, Js = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Gs(t, s) : t, o = e.length - 1, n; o >= 0; o--)
    (n = e[o]) && (i = n(i) || i);
  return i;
};
let Yt = class extends A {
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
Yt = Js([
  _("carlinko-tpms")
], Yt);
var Qs = Object.getOwnPropertyDescriptor, Xs = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Qs(t, s) : t, o = e.length - 1, n; o >= 0; o--)
    (n = e[o]) && (i = n(i) || i);
  return i;
};
let te = class extends ht {
};
te = Xs([
  _("carlinko-tpms-editor")
], te);
var Ys = Object.defineProperty, ti = Object.getOwnPropertyDescriptor, mt = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? ti(t, s) : t, o = e.length - 1, n; o >= 0; o--)
    (n = e[o]) && (i = (r ? n(t, s, i) : n(i)) || i);
  return r && i && Ys(t, s, i), i;
};
let W = class extends $ {
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
    return document.createElement("carlinko-windows-editor");
  }
  static getStubConfig() {
    return {
      device_id: "",
      title: "Windows"
    };
  }
  _slots() {
    return this._config ? pt(this.hass, this._config, Fe) : {};
  }
  _run(e) {
    this.hass && ut(
      () => this._busy,
      (t) => {
        this._busy = t;
      },
      e,
      (t) => console.error("carlinko-windows action failed", t)
    );
  }
  _entityExists(e) {
    var t;
    return !!(e && ((t = this.hass) != null && t.states[e]));
  }
  _section(e, t, s, r) {
    const i = this._entityExists(t), o = this._entityExists(s);
    return !i && !o ? l : a`
      <div class="section">
        <div class="section-head">
          <span class="section-title">${e}</span>
          ${i ? a`<span class="section-state"
                >${y(this.hass, t)}</span
              >` : l}
        </div>
        <div class="section-actions">
          ${i ? a`
                ${g({
      label: "Open",
      disabled: this._busy,
      onClick: () => this._run(() => nt(this.hass, t))
    })}
                ${g({
      label: "Close",
      disabled: this._busy,
      onClick: () => this._run(() => at(this.hass, t))
    })}
              ` : l}
          ${o ? g({
      label: r,
      disabled: this._busy,
      onClick: () => this._run(() => M(this.hass, s))
    }) : l}
        </div>
      </div>
    `;
  }
  render() {
    var r;
    if (!this._config)
      return a`<ha-card><div class="pad">Not configured</div></ha-card>`;
    if (!((r = this._config.device_id) != null && r.trim()))
      return a`<ha-card
        ><div class="pad">Select a CarLinko vehicle device</div></ha-card
      >`;
    if (!this.hass)
      return a`<ha-card><div class="pad">Waiting for Home Assistant…</div></ha-card>`;
    const e = this._slots(), t = this._section(
      "Windows",
      e.windows,
      e.windows_vent,
      "Vent"
    ), s = this._section(
      "Sunroof",
      e.sunroof,
      e.sunroof_tilt,
      "Tilt"
    );
    return t === l && s === l ? a`<ha-card
        ><div class="pad">No window or sunroof entities for this vehicle</div></ha-card
      >` : a`
      <ha-card>
        ${this._config.title ? a`<div class="header">${this._config.title}</div>` : l}
        <div class="body-pad">
          ${t} ${s}
        </div>
      </ha-card>
    `;
  }
};
W.styles = [
  vt,
  Et,
  b`
      .section {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .section + .section {
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid var(--ck-border);
      }
      .section-head {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 8px;
      }
      .section-title {
        font-weight: 600;
      }
      .section-state {
        color: var(--ck-muted);
        font-size: 0.85rem;
      }
      .section-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
    `
];
mt([
  E({ attribute: !1 })
], W.prototype, "hass", 2);
mt([
  x()
], W.prototype, "_config", 2);
mt([
  x()
], W.prototype, "_busy", 2);
W = mt([
  _("carlinko-windows")
], W);
var ei = Object.getOwnPropertyDescriptor, si = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? ei(t, s) : t, o = e.length - 1, n; o >= 0; o--)
    (n = e[o]) && (i = n(i) || i);
  return i;
};
let ee = class extends I {
};
ee = si([
  _("carlinko-windows-editor")
], ee);
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
  },
  {
    type: "carlinko-windows",
    name: "CarLinko Windows",
    description: "Whole-car windows open/close/vent and sunroof open/close/tilt.",
    preview: !0
  }
);
console.info(
  "%c CARLINKO-CARD %c 0.1.0 ",
  "color:#fff;background:#0d9488;font-weight:700",
  "color:#0d9488;background:transparent;font-weight:700"
);
//# sourceMappingURL=carlinko-card.js.map
