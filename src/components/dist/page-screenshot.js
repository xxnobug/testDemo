! function(A, e) { "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.PageScreenshot = e() : A.PageScreenshot = e() }(window, function() {
    return function(T) {
        var t = window.webpackHotUpdatePageScreenshot;
        window.webpackHotUpdatePageScreenshot = function(A, e) {
            ! function(A, e) {
                if (!D[A] || !u[A]) return;
                for (var t in u[A] = !1, e) Object.prototype.hasOwnProperty.call(e, t) && (_[t] = e[t]);
                0 == --B && 0 === c && w()
            }(A, e), t && t(A, e)
        };
        var o, r = !0,
            N = "de3052d76e32af959281",
            e = 1e4,
            b = {},
            K = [],
            n = [];

        function s(e) {
            var t = R[e];
            if (!t) return P;
            var r = function(A) { return t.hot.active ? (R[A] ? -1 === R[A].parents.indexOf(e) && R[A].parents.push(e) : (K = [e], o = A), -1 === t.children.indexOf(A) && t.children.push(A)) : (console.warn("[HMR] unexpected require(" + A + ") from disposed module " + e), K = []), P(A) },
                A = function(e) { return { configurable: !0, enumerable: !0, get: function() { return P[e] }, set: function(A) { P[e] = A } } };
            for (var n in P) Object.prototype.hasOwnProperty.call(P, n) && "e" !== n && "t" !== n && Object.defineProperty(r, n, A(n));
            return r.e = function(A) {
                return "ready" === S && L("prepare"), c++, P.e(A).then(e, function(A) { throw e(), A });

                function e() { c--, "prepare" === S && (l[A] || d(A), 0 === c && 0 === B && w()) }
            }, r.t = function(A, e) { return 1 & e && (A = r(A)), P.t(A, -2 & e) }, r
        }
        var i = [],
            S = "idle";

        function L(A) { S = A; for (var e = 0; e < i.length; e++) i[e].call(null, A) }
        var a, _, M, B = 0,
            c = 0,
            l = {},
            u = {},
            D = {};

        function O(A) { return +A + "" === A ? +A : A }

        function Q(A) {
            if ("idle" !== S) throw new Error("check() is only allowed in idle status");
            return r = A, L("check"), (o = e, o = o || 1e4, new Promise(function(e, t) {
                if ("undefined" == typeof XMLHttpRequest) return t(new Error("No browser support"));
                try {
                    var r = new XMLHttpRequest,
                        n = P.p + "" + N + ".hot-update.json";
                    r.open("GET", n, !0), r.timeout = o, r.send(null)
                } catch (A) { return t(A) }
                r.onreadystatechange = function() {
                    if (4 === r.readyState)
                        if (0 === r.status) t(new Error("Manifest request to " + n + " timed out."));
                        else if (404 === r.status) e();
                    else if (200 !== r.status && 304 !== r.status) t(new Error("Manifest request to " + n + " failed."));
                    else {
                        try { var A = JSON.parse(r.responseText) } catch (A) { return void t(A) }
                        e(A)
                    }
                }
            })).then(function(A) {
                if (!A) return L("idle"), null;
                u = {}, l = {}, D = A.c, M = A.h, L("prepare");
                var e = new Promise(function(A, e) { a = { resolve: A, reject: e } });
                _ = {};
                return d(0), "prepare" === S && 0 === c && 0 === B && w(), e
            });
            var o
        }

        function d(A) {
            var e, t;
            D[A] ? (u[A] = !0, B++, e = A, (t = document.createElement("script")).charset = "utf-8", t.src = P.p + "" + e + "." + N + ".hot-update.js", document.head.appendChild(t)) : l[A] = !0
        }

        function w() {
            L("ready");
            var e = a;
            if (a = null, e)
                if (r) Promise.resolve().then(function() { return h(r) }).then(function(A) { e.resolve(A) }, function(A) { e.reject(A) });
                else {
                    var A = [];
                    for (var t in _) Object.prototype.hasOwnProperty.call(_, t) && A.push(O(t));
                    e.resolve(A)
                }
        }

        function h(t) {
            if ("ready" !== S) throw new Error("apply() is only allowed in ready status");
            var A, e, r, c, n;

            function o(A) {
                for (var e = [A], t = {}, r = e.slice().map(function(A) { return { chain: [A], id: A } }); 0 < r.length;) {
                    var n = r.pop(),
                        o = n.id,
                        s = n.chain;
                    if ((c = R[o]) && !c.hot._selfAccepted) {
                        if (c.hot._selfDeclined) return { type: "self-declined", chain: s, moduleId: o };
                        if (c.hot._main) return { type: "unaccepted", chain: s, moduleId: o };
                        for (var i = 0; i < c.parents.length; i++) {
                            var a = c.parents[i],
                                B = R[a];
                            if (B) { if (B.hot._declinedDependencies[o]) return { type: "declined", chain: s.concat([a]), moduleId: o, parentId: a }; - 1 === e.indexOf(a) && (B.hot._acceptedDependencies[o] ? (t[a] || (t[a] = []), l(t[a], [o])) : (delete t[a], e.push(a), r.push({ chain: s.concat([a]), id: a }))) }
                        }
                    }
                }
                return { type: "accepted", moduleId: A, outdatedModules: e, outdatedDependencies: t }
            }

            function l(A, e) { for (var t = 0; t < e.length; t++) { var r = e[t]; - 1 === A.indexOf(r) && A.push(r) } }
            t = t || {};
            var s = {},
                i = [],
                a = {},
                B = function() { console.warn("[HMR] unexpected require(" + Q.moduleId + ") to disposed module") };
            for (var u in _)
                if (Object.prototype.hasOwnProperty.call(_, u)) {
                    var Q;
                    n = O(u);
                    var d = !1,
                        w = !1,
                        h = !1,
                        g = "";
                    switch ((Q = _[u] ? o(n) : { type: "disposed", moduleId: u }).chain && (g = "\nUpdate propagation: " + Q.chain.join(" -> ")), Q.type) {
                        case "self-declined":
                            t.onDeclined && t.onDeclined(Q), t.ignoreDeclined || (d = new Error("Aborted because of self decline: " + Q.moduleId + g));
                            break;
                        case "declined":
                            t.onDeclined && t.onDeclined(Q), t.ignoreDeclined || (d = new Error("Aborted because of declined dependency: " + Q.moduleId + " in " + Q.parentId + g));
                            break;
                        case "unaccepted":
                            t.onUnaccepted && t.onUnaccepted(Q), t.ignoreUnaccepted || (d = new Error("Aborted because " + n + " is not accepted" + g));
                            break;
                        case "accepted":
                            t.onAccepted && t.onAccepted(Q), w = !0;
                            break;
                        case "disposed":
                            t.onDisposed && t.onDisposed(Q), h = !0;
                            break;
                        default:
                            throw new Error("Unexception type " + Q.type)
                    }
                    if (d) return L("abort"), Promise.reject(d);
                    if (w)
                        for (n in a[n] = _[n], l(i, Q.outdatedModules), Q.outdatedDependencies) Object.prototype.hasOwnProperty.call(Q.outdatedDependencies, n) && (s[n] || (s[n] = []), l(s[n], Q.outdatedDependencies[n]));
                    h && (l(i, [Q.moduleId]), a[n] = B)
                }
            var U, f = [];
            for (e = 0; e < i.length; e++) n = i[e], R[n] && R[n].hot._selfAccepted && f.push({ module: n, errorHandler: R[n].hot._selfAccepted });
            L("dispose"), Object.keys(D).forEach(function(A) {!1 === D[A] && delete installedChunks[A] });
            for (var C, F, E = i.slice(); 0 < E.length;)
                if (n = E.pop(), c = R[n]) {
                    var p = {},
                        H = c.hot._disposeHandlers;
                    for (r = 0; r < H.length; r++)(A = H[r])(p);
                    for (b[n] = p, c.hot.active = !1, delete R[n], delete s[n], r = 0; r < c.children.length; r++) {
                        var v = R[c.children[r]];
                        v && (0 <= (U = v.parents.indexOf(n)) && v.parents.splice(U, 1))
                    }
                }
            for (n in s)
                if (Object.prototype.hasOwnProperty.call(s, n) && (c = R[n]))
                    for (F = s[n], r = 0; r < F.length; r++) C = F[r], 0 <= (U = c.children.indexOf(C)) && c.children.splice(U, 1);
            for (n in L("apply"), N = M, a) Object.prototype.hasOwnProperty.call(a, n) && (T[n] = a[n]);
            var m = null;
            for (n in s)
                if (Object.prototype.hasOwnProperty.call(s, n) && (c = R[n])) {
                    F = s[n];
                    var y = [];
                    for (e = 0; e < F.length; e++)
                        if (C = F[e], A = c.hot._acceptedDependencies[C]) {
                            if (-1 !== y.indexOf(A)) continue;
                            y.push(A)
                        }
                    for (e = 0; e < y.length; e++) { A = y[e]; try { A(F) } catch (A) { t.onErrored && t.onErrored({ type: "accept-errored", moduleId: n, dependencyId: F[e], error: A }), t.ignoreErrored || m || (m = A) } }
                }
            for (e = 0; e < f.length; e++) {
                var I = f[e];
                n = I.module, K = [n];
                try { P(n) } catch (e) { if ("function" == typeof I.errorHandler) try { I.errorHandler(e) } catch (A) { t.onErrored && t.onErrored({ type: "self-accept-error-handler-errored", moduleId: n, error: A, originalError: e }), t.ignoreErrored || m || (m = A), m || (m = e) } else t.onErrored && t.onErrored({ type: "self-accept-errored", moduleId: n, error: e }), t.ignoreErrored || m || (m = e) }
            }
            return m ? (L("fail"), Promise.reject(m)) : (L("idle"), new Promise(function(A) { A(i) }))
        }
        var R = {};

        function P(A) {
            if (R[A]) return R[A].exports;
            var e, r, t = R[A] = {
                i: A,
                l: !1,
                exports: {},
                hot: (e = A, r = {
                    _acceptedDependencies: {},
                    _declinedDependencies: {},
                    _selfAccepted: !1,
                    _selfDeclined: !1,
                    _disposeHandlers: [],
                    _main: o !== e,
                    active: !0,
                    accept: function(A, e) {
                        if (void 0 === A) r._selfAccepted = !0;
                        else if ("function" == typeof A) r._selfAccepted = A;
                        else if ("object" == typeof A)
                            for (var t = 0; t < A.length; t++) r._acceptedDependencies[A[t]] = e || function() {};
                        else r._acceptedDependencies[A] = e || function() {}
                    },
                    decline: function(A) {
                        if (void 0 === A) r._selfDeclined = !0;
                        else if ("object" == typeof A)
                            for (var e = 0; e < A.length; e++) r._declinedDependencies[A[e]] = !0;
                        else r._declinedDependencies[A] = !0
                    },
                    dispose: function(A) { r._disposeHandlers.push(A) },
                    addDisposeHandler: function(A) { r._disposeHandlers.push(A) },
                    removeDisposeHandler: function(A) {
                        var e = r._disposeHandlers.indexOf(A);
                        0 <= e && r._disposeHandlers.splice(e, 1)
                    },
                    check: Q,
                    apply: h,
                    status: function(A) {
                        if (!A) return S;
                        i.push(A)
                    },
                    addStatusHandler: function(A) { i.push(A) },
                    removeStatusHandler: function(A) {
                        var e = i.indexOf(A);
                        0 <= e && i.splice(e, 1)
                    },
                    data: b[e]
                }, o = void 0, r),
                parents: (n = K, K = [], n),
                children: []
            };
            return T[A].call(t.exports, t, t.exports, s(A)), t.l = !0, t.exports
        }
        return P.m = T, P.c = R, P.d = function(A, e, t) { P.o(A, e) || Object.defineProperty(A, e, { enumerable: !0, get: t }) }, P.r = function(A) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(A, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(A, "__esModule", { value: !0 }) }, P.t = function(e, A) {
            if (1 & A && (e = P(e)), 8 & A) return e;
            if (4 & A && "object" == typeof e && e && e.__esModule) return e;
            var t = Object.create(null);
            if (P.r(t), Object.defineProperty(t, "default", { enumerable: !0, value: e }), 2 & A && "string" != typeof e)
                for (var r in e) P.d(t, r, function(A) { return e[A] }.bind(null, r));
            return t
        }, P.n = function(A) { var e = A && A.__esModule ? function() { return A.default } : function() { return A }; return P.d(e, "a", e), e }, P.o = function(A, e) { return Object.prototype.hasOwnProperty.call(A, e) }, P.p = "", P.h = function() { return N }, s(27)(P.s = 27)
    }([function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var Q = function(A, e) {
                if (Array.isArray(A)) return A;
                if (Symbol.iterator in Object(A)) return function(A, e) {
                    var t = [],
                        r = !0,
                        n = !1,
                        o = void 0;
                    try { for (var s, i = A[Symbol.iterator](); !(r = (s = i.next()).done) && (t.push(s.value), !e || t.length !== e); r = !0); } catch (A) { n = !0, o = A } finally { try {!r && i.return && i.return() } finally { if (n) throw o } }
                    return t
                }(A, e);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            },
            r = function() {
                function r(A, e) {
                    for (var t = 0; t < e.length; t++) {
                        var r = e[t];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
                    }
                }
                return function(A, e, t) { return e && r(A.prototype, e), t && r(A, t), A }
            }();
        var d = /^#([a-f0-9]{3})$/i,
            w = /^#([a-f0-9]{6})$/i,
            h = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
            g = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?\.?\d+)\s*\)$/,
            n = function() {
                function u(A) {
                    ! function(A, e) { if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, u);
                    var e, t, r, n, o, s = Array.isArray(A) ? (o = A, [Math.min(o[0], 255), Math.min(o[1], 255), Math.min(o[2], 255), 3 < o.length ? o[3] : null]) : !!(n = A.match(d)) && [parseInt(n[1][0] + n[1][0], 16), parseInt(n[1][1] + n[1][1], 16), parseInt(n[1][2] + n[1][2], 16), null] || !!(r = A.match(h)) && [Number(r[1]), Number(r[2]), Number(r[3]), null] || !!((t = A.match(g)) && 4 < t.length) && [Number(t[1]), Number(t[2]), Number(t[3]), Number(t[4])] || (U[A.toLowerCase()] || !1) || !!(e = A.match(w)) && [parseInt(e[1].substring(0, 2), 16), parseInt(e[1].substring(2, 4), 16), parseInt(e[1].substring(4, 6), 16), null] || [0, 0, 0, null],
                        i = Q(s, 4),
                        a = i[0],
                        B = i[1],
                        c = i[2],
                        l = i[3];
                    this.r = a, this.g = B, this.b = c, this.a = l
                }
                return r(u, [{ key: "isTransparent", value: function() { return 0 === this.a } }, { key: "toString", value: function() { return null !== this.a && 1 !== this.a ? "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")" : "rgb(" + this.r + "," + this.g + "," + this.b + ")" } }]), u
            }();
        e.default = n;
        var U = { transparent: [0, 0, 0, 0], aliceblue: [240, 248, 255, null], antiquewhite: [250, 235, 215, null], aqua: [0, 255, 255, null], aquamarine: [127, 255, 212, null], azure: [240, 255, 255, null], beige: [245, 245, 220, null], bisque: [255, 228, 196, null], black: [0, 0, 0, null], blanchedalmond: [255, 235, 205, null], blue: [0, 0, 255, null], blueviolet: [138, 43, 226, null], brown: [165, 42, 42, null], burlywood: [222, 184, 135, null], cadetblue: [95, 158, 160, null], chartreuse: [127, 255, 0, null], chocolate: [210, 105, 30, null], coral: [255, 127, 80, null], cornflowerblue: [100, 149, 237, null], cornsilk: [255, 248, 220, null], crimson: [220, 20, 60, null], cyan: [0, 255, 255, null], darkblue: [0, 0, 139, null], darkcyan: [0, 139, 139, null], darkgoldenrod: [184, 134, 11, null], darkgray: [169, 169, 169, null], darkgreen: [0, 100, 0, null], darkgrey: [169, 169, 169, null], darkkhaki: [189, 183, 107, null], darkmagenta: [139, 0, 139, null], darkolivegreen: [85, 107, 47, null], darkorange: [255, 140, 0, null], darkorchid: [153, 50, 204, null], darkred: [139, 0, 0, null], darksalmon: [233, 150, 122, null], darkseagreen: [143, 188, 143, null], darkslateblue: [72, 61, 139, null], darkslategray: [47, 79, 79, null], darkslategrey: [47, 79, 79, null], darkturquoise: [0, 206, 209, null], darkviolet: [148, 0, 211, null], deeppink: [255, 20, 147, null], deepskyblue: [0, 191, 255, null], dimgray: [105, 105, 105, null], dimgrey: [105, 105, 105, null], dodgerblue: [30, 144, 255, null], firebrick: [178, 34, 34, null], floralwhite: [255, 250, 240, null], forestgreen: [34, 139, 34, null], fuchsia: [255, 0, 255, null], gainsboro: [220, 220, 220, null], ghostwhite: [248, 248, 255, null], gold: [255, 215, 0, null], goldenrod: [218, 165, 32, null], gray: [128, 128, 128, null], green: [0, 128, 0, null], greenyellow: [173, 255, 47, null], grey: [128, 128, 128, null], honeydew: [240, 255, 240, null], hotpink: [255, 105, 180, null], indianred: [205, 92, 92, null], indigo: [75, 0, 130, null], ivory: [255, 255, 240, null], khaki: [240, 230, 140, null], lavender: [230, 230, 250, null], lavenderblush: [255, 240, 245, null], lawngreen: [124, 252, 0, null], lemonchiffon: [255, 250, 205, null], lightblue: [173, 216, 230, null], lightcoral: [240, 128, 128, null], lightcyan: [224, 255, 255, null], lightgoldenrodyellow: [250, 250, 210, null], lightgray: [211, 211, 211, null], lightgreen: [144, 238, 144, null], lightgrey: [211, 211, 211, null], lightpink: [255, 182, 193, null], lightsalmon: [255, 160, 122, null], lightseagreen: [32, 178, 170, null], lightskyblue: [135, 206, 250, null], lightslategray: [119, 136, 153, null], lightslategrey: [119, 136, 153, null], lightsteelblue: [176, 196, 222, null], lightyellow: [255, 255, 224, null], lime: [0, 255, 0, null], limegreen: [50, 205, 50, null], linen: [250, 240, 230, null], magenta: [255, 0, 255, null], maroon: [128, 0, 0, null], mediumaquamarine: [102, 205, 170, null], mediumblue: [0, 0, 205, null], mediumorchid: [186, 85, 211, null], mediumpurple: [147, 112, 219, null], mediumseagreen: [60, 179, 113, null], mediumslateblue: [123, 104, 238, null], mediumspringgreen: [0, 250, 154, null], mediumturquoise: [72, 209, 204, null], mediumvioletred: [199, 21, 133, null], midnightblue: [25, 25, 112, null], mintcream: [245, 255, 250, null], mistyrose: [255, 228, 225, null], moccasin: [255, 228, 181, null], navajowhite: [255, 222, 173, null], navy: [0, 0, 128, null], oldlace: [253, 245, 230, null], olive: [128, 128, 0, null], olivedrab: [107, 142, 35, null], orange: [255, 165, 0, null], orangered: [255, 69, 0, null], orchid: [218, 112, 214, null], palegoldenrod: [238, 232, 170, null], palegreen: [152, 251, 152, null], paleturquoise: [175, 238, 238, null], palevioletred: [219, 112, 147, null], papayawhip: [255, 239, 213, null], peachpuff: [255, 218, 185, null], peru: [205, 133, 63, null], pink: [255, 192, 203, null], plum: [221, 160, 221, null], powderblue: [176, 224, 230, null], purple: [128, 0, 128, null], rebeccapurple: [102, 51, 153, null], red: [255, 0, 0, null], rosybrown: [188, 143, 143, null], royalblue: [65, 105, 225, null], saddlebrown: [139, 69, 19, null], salmon: [250, 128, 114, null], sandybrown: [244, 164, 96, null], seagreen: [46, 139, 87, null], seashell: [255, 245, 238, null], sienna: [160, 82, 45, null], silver: [192, 192, 192, null], skyblue: [135, 206, 235, null], slateblue: [106, 90, 205, null], slategray: [112, 128, 144, null], slategrey: [112, 128, 144, null], snow: [255, 250, 250, null], springgreen: [0, 255, 127, null], steelblue: [70, 130, 180, null], tan: [210, 180, 140, null], teal: [0, 128, 128, null], thistle: [216, 191, 216, null], tomato: [255, 99, 71, null], turquoise: [64, 224, 208, null], violet: [238, 130, 238, null], wheat: [245, 222, 179, null], white: [255, 255, 255, null], whitesmoke: [245, 245, 245, null], yellow: [255, 255, 0, null], yellowgreen: [154, 205, 50, null] };
        e.TRANSPARENT = new n([0, 0, 0, 0])
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), e.calculateLengthFromValueWithUnit = e.LENGTH_TYPE = void 0;
        var r, n = function() {
                function r(A, e) {
                    for (var t = 0; t < e.length; t++) {
                        var r = e[t];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
                    }
                }
                return function(A, e, t) { return e && r(A.prototype, e), t && r(A, t), A }
            }(),
            o = t(3);
        (r = o) && r.__esModule;
        var s = e.LENGTH_TYPE = { PX: 0, PERCENTAGE: 1 },
            i = function() {
                function t(A) {
                    ! function(A, e) { if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, t), this.type = "%" === A.substr(A.length - 1) ? s.PERCENTAGE : s.PX;
                    var e = parseFloat(A);
                    this.value = isNaN(e) ? 0 : e
                }
                return n(t, [{ key: "isPercentage", value: function() { return this.type === s.PERCENTAGE } }, { key: "getAbsoluteValue", value: function(A) { return this.isPercentage() ? A * (this.value / 100) : this.value } }], [{ key: "create", value: function(A) { return new t(A) } }]), t
            }();
        e.default = i;
        e.calculateLengthFromValueWithUnit = function(A, e, t) {
            switch (t) {
                case "px":
                case "%":
                    return new i(e + t);
                case "em":
                case "rem":
                    var r = new i(e);
                    return r.value *= "em" === t ? parseFloat(A.style.font.fontSize) : function A(e) { var t = e.parent; return t ? A(t) : parseFloat(e.style.font.fontSize) }(A), r;
                default:
                    return new i("0")
            }
        }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), e.parseBoundCurves = e.calculatePaddingBoxPath = e.calculateBorderBoxPath = e.parsePathForBorder = e.parseDocumentSize = e.calculateContentBox = e.calculatePaddingBox = e.parseBounds = e.Bounds = void 0;
        var r = function() {
                function r(A, e) {
                    for (var t = 0; t < e.length; t++) {
                        var r = e[t];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
                    }
                }
                return function(A, e, t) { return e && r(A.prototype, e), t && r(A, t), A }
            }(),
            g = n(t(7)),
            c = n(t(37));

        function n(A) { return A && A.__esModule ? A : { default: A } }
        var i = e.Bounds = function() {
                function n(A, e, t, r) {! function(A, e) { if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, n), this.left = A, this.top = e, this.width = t, this.height = r }
                return r(n, null, [{ key: "fromClientRect", value: function(A, e, t) { return new n(A.left + e, A.top + t, A.width, A.height) } }]), n
            }(),
            o = (e.parseBounds = function(A, e, t) { return i.fromClientRect(A.getBoundingClientRect(), e, t) }, e.calculatePaddingBox = function(A, e) { return new i(A.left + e[3].borderWidth, A.top + e[0].borderWidth, A.width - (e[1].borderWidth + e[3].borderWidth), A.height - (e[0].borderWidth + e[2].borderWidth)) }, e.calculateContentBox = function(A, e, t) {
                var r = e[0].value,
                    n = e[1].value,
                    o = e[2].value,
                    s = e[3].value;
                return new i(A.left + s + t[3].borderWidth, A.top + r + t[0].borderWidth, A.width - (t[1].borderWidth + t[3].borderWidth + s + n), A.height - (t[0].borderWidth + t[2].borderWidth + r + o))
            }, e.parseDocumentSize = function(A) {
                var e = A.body,
                    t = A.documentElement;
                if (!e || !t) throw new Error("");
                var r = Math.max(Math.max(e.scrollWidth, t.scrollWidth), Math.max(e.offsetWidth, t.offsetWidth), Math.max(e.clientWidth, t.clientWidth)),
                    n = Math.max(Math.max(e.scrollHeight, t.scrollHeight), Math.max(e.offsetHeight, t.offsetHeight), Math.max(e.clientHeight, t.clientHeight));
                return new i(0, 0, r, n)
            }, e.parsePathForBorder = function(A, e) {
                switch (e) {
                    case 0:
                        return o(A.topLeftOuter, A.topLeftInner, A.topRightOuter, A.topRightInner);
                    case 1:
                        return o(A.topRightOuter, A.topRightInner, A.bottomRightOuter, A.bottomRightInner);
                    case 2:
                        return o(A.bottomRightOuter, A.bottomRightInner, A.bottomLeftOuter, A.bottomLeftInner);
                    case 3:
                    default:
                        return o(A.bottomLeftOuter, A.bottomLeftInner, A.topLeftOuter, A.topLeftInner)
                }
            }, function(A, e, t, r) { var n = []; return A instanceof c.default ? n.push(A.subdivide(.5, !1)) : n.push(A), t instanceof c.default ? n.push(t.subdivide(.5, !0)) : n.push(t), r instanceof c.default ? n.push(r.subdivide(.5, !0).reverse()) : n.push(r), e instanceof c.default ? n.push(e.subdivide(.5, !1).reverse()) : n.push(e), n }),
            U = (e.calculateBorderBoxPath = function(A) { return [A.topLeftOuter, A.topRightOuter, A.bottomRightOuter, A.bottomLeftOuter] }, e.calculatePaddingBoxPath = function(A) { return [A.topLeftInner, A.topRightInner, A.bottomRightInner, A.bottomLeftInner] }, e.parseBoundCurves = function(A, e, t) {
                var r = t[U.TOP_LEFT][0].getAbsoluteValue(A.width),
                    n = t[U.TOP_LEFT][1].getAbsoluteValue(A.height),
                    o = t[U.TOP_RIGHT][0].getAbsoluteValue(A.width),
                    s = t[U.TOP_RIGHT][1].getAbsoluteValue(A.height),
                    i = t[U.BOTTOM_RIGHT][0].getAbsoluteValue(A.width),
                    a = t[U.BOTTOM_RIGHT][1].getAbsoluteValue(A.height),
                    B = t[U.BOTTOM_LEFT][0].getAbsoluteValue(A.width),
                    c = t[U.BOTTOM_LEFT][1].getAbsoluteValue(A.height),
                    l = [];
                l.push((r + o) / A.width), l.push((B + i) / A.width), l.push((n + c) / A.height), l.push((s + a) / A.height);
                var u = Math.max.apply(Math, l);
                1 < u && (r /= u, n /= u, o /= u, s /= u, i /= u, a /= u, B /= u, c /= u);
                var Q = A.width - o,
                    d = A.height - a,
                    w = A.width - i,
                    h = A.height - c;
                return { topLeftOuter: 0 < r || 0 < n ? f(A.left, A.top, r, n, U.TOP_LEFT) : new g.default(A.left, A.top), topLeftInner: 0 < r || 0 < n ? f(A.left + e[3].borderWidth, A.top + e[0].borderWidth, Math.max(0, r - e[3].borderWidth), Math.max(0, n - e[0].borderWidth), U.TOP_LEFT) : new g.default(A.left + e[3].borderWidth, A.top + e[0].borderWidth), topRightOuter: 0 < o || 0 < s ? f(A.left + Q, A.top, o, s, U.TOP_RIGHT) : new g.default(A.left + A.width, A.top), topRightInner: 0 < o || 0 < s ? f(A.left + Math.min(Q, A.width + e[3].borderWidth), A.top + e[0].borderWidth, Q > A.width + e[3].borderWidth ? 0 : o - e[3].borderWidth, s - e[0].borderWidth, U.TOP_RIGHT) : new g.default(A.left + A.width - e[1].borderWidth, A.top + e[0].borderWidth), bottomRightOuter: 0 < i || 0 < a ? f(A.left + w, A.top + d, i, a, U.BOTTOM_RIGHT) : new g.default(A.left + A.width, A.top + A.height), bottomRightInner: 0 < i || 0 < a ? f(A.left + Math.min(w, A.width - e[3].borderWidth), A.top + Math.min(d, A.height + e[0].borderWidth), Math.max(0, i - e[1].borderWidth), a - e[2].borderWidth, U.BOTTOM_RIGHT) : new g.default(A.left + A.width - e[1].borderWidth, A.top + A.height - e[2].borderWidth), bottomLeftOuter: 0 < B || 0 < c ? f(A.left, A.top + h, B, c, U.BOTTOM_LEFT) : new g.default(A.left, A.top + A.height), bottomLeftInner: 0 < B || 0 < c ? f(A.left + e[3].borderWidth, A.top + h, Math.max(0, B - e[3].borderWidth), c - e[2].borderWidth, U.BOTTOM_LEFT) : new g.default(A.left + e[3].borderWidth, A.top + A.height - e[2].borderWidth) }
            }, { TOP_LEFT: 0, TOP_RIGHT: 1, BOTTOM_RIGHT: 2, BOTTOM_LEFT: 3 }),
            f = function(A, e, t, r, n) {
                var o = (Math.sqrt(2) - 1) / 3 * 4,
                    s = t * o,
                    i = r * o,
                    a = A + t,
                    B = e + r;
                switch (n) {
                    case U.TOP_LEFT:
                        return new c.default(new g.default(A, B), new g.default(A, B - i), new g.default(a - s, e), new g.default(a, e));
                    case U.TOP_RIGHT:
                        return new c.default(new g.default(A, e), new g.default(A + s, e), new g.default(a, B - i), new g.default(a, B));
                    case U.BOTTOM_RIGHT:
                        return new c.default(new g.default(a, e), new g.default(a, e + i), new g.default(A + s, B), new g.default(A, B));
                    case U.BOTTOM_LEFT:
                    default:
                        return new c.default(new g.default(a, B), new g.default(a - s, B), new g.default(A, e + i), new g.default(A, e))
                }
            }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r, n = function() {
                function r(A, e) {
                    for (var t = 0; t < e.length; t++) {
                        var r = e[t];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
                    }
                }
                return function(A, e, t) { return e && r(A.prototype, e), t && r(A, t), A }
            }(),
            o = t(0),
            w = (r = o) && r.__esModule ? r : { default: r },
            s = t(4),
            h = t(5),
            g = t(12),
            U = t(38),
            f = t(39),
            C = t(40),
            F = t(41),
            E = t(42),
            p = t(43),
            H = t(8),
            v = t(44),
            m = t(45),
            y = t(18),
            I = t(17),
            T = t(19),
            N = t(11),
            b = t(46),
            K = t(20),
            S = t(47),
            L = t(48),
            _ = t(49),
            M = t(50),
            D = t(2),
            O = t(21),
            R = t(14);
        var P = ["INPUT", "TEXTAREA", "SELECT"],
            i = function() {
                function d(A, e, t, r) {
                    var n = this;
                    ! function(A, e) { if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, d), this.parent = e, this.tagName = A.tagName, this.index = r, this.childNodes = [], this.listItems = [], "number" == typeof A.start && (this.listStart = A.start);
                    var o = A.ownerDocument.defaultView,
                        s = o.pageXOffset,
                        i = o.pageYOffset,
                        a = o.getComputedStyle(A, null),
                        B = (0, f.parseDisplay)(a.display),
                        c = "radio" === A.type || "checkbox" === A.type,
                        l = (0, T.parsePosition)(a.position);
                    if (this.style = { background: c ? O.INPUT_BACKGROUND : (0, h.parseBackground)(a, t), border: c ? O.INPUT_BORDERS : (0, g.parseBorder)(a), borderRadius: (A instanceof o.HTMLInputElement || A instanceof HTMLInputElement) && c ? (0, O.getInputBorderRadius)(A) : (0, U.parseBorderRadius)(a), color: c ? O.INPUT_COLOR : new w.default(a.color), display: B, float: (0, C.parseCSSFloat)(a.float), font: (0, F.parseFont)(a), letterSpacing: (0, E.parseLetterSpacing)(a.letterSpacing), listStyle: B === f.DISPLAY.LIST_ITEM ? (0, H.parseListStyle)(a) : null, lineBreak: (0, p.parseLineBreak)(a.lineBreak), margin: (0, v.parseMargin)(a), opacity: parseFloat(a.opacity), overflow: -1 === P.indexOf(A.tagName) ? (0, m.parseOverflow)(a.overflow) : m.OVERFLOW.HIDDEN, overflowWrap: (0, y.parseOverflowWrap)(a.overflowWrap ? a.overflowWrap : a.wordWrap), padding: (0, I.parsePadding)(a), position: l, textDecoration: (0, N.parseTextDecoration)(a), textShadow: (0, b.parseTextShadow)(a.textShadow), textTransform: (0, K.parseTextTransform)(a.textTransform), transform: (0, S.parseTransform)(a), visibility: (0, L.parseVisibility)(a.visibility), wordBreak: (0, _.parseWordBreak)(a.wordBreak), zIndex: (0, M.parseZIndex)(l !== T.POSITION.STATIC ? a.zIndex : "auto") }, this.isTransformed() && (A.style.transform = "matrix(1,0,0,1,0,0)"), B === f.DISPLAY.LIST_ITEM) {
                        var u = (0, R.getListOwner)(this);
                        if (u) {
                            var Q = u.listItems.length;
                            u.listItems.push(this), this.listIndex = A.hasAttribute("value") && "number" == typeof A.value ? A.value : 0 === Q ? "number" == typeof u.listStart ? u.listStart : 1 : u.listItems[Q - 1].listIndex + 1
                        }
                    }
                    "IMG" === A.tagName && A.addEventListener("load", function() { n.bounds = (0, D.parseBounds)(A, s, i), n.curvedBounds = (0, D.parseBoundCurves)(n.bounds, n.style.border, n.style.borderRadius) }), this.image = x(A, t), this.bounds = c ? (0, O.reformatInputBounds)((0, D.parseBounds)(A, s, i)) : (0, D.parseBounds)(A, s, i), this.curvedBounds = (0, D.parseBoundCurves)(this.bounds, this.style.border, this.style.borderRadius)
                }
                return n(d, [{ key: "getClipPaths", value: function() { var A = this.parent ? this.parent.getClipPaths() : []; return this.style.overflow !== m.OVERFLOW.VISIBLE ? A.concat([(0, D.calculatePaddingBoxPath)(this.curvedBounds)]) : A } }, { key: "isInFlow", value: function() { return this.isRootElement() && !this.isFloating() && !this.isAbsolutelyPositioned() } }, { key: "isVisible", value: function() { return !(0, s.contains)(this.style.display, f.DISPLAY.NONE) && 0 < this.style.opacity && this.style.visibility === L.VISIBILITY.VISIBLE } }, { key: "isAbsolutelyPositioned", value: function() { return this.style.position !== T.POSITION.STATIC && this.style.position !== T.POSITION.RELATIVE } }, { key: "isPositioned", value: function() { return this.style.position !== T.POSITION.STATIC } }, { key: "isFloating", value: function() { return this.style.float !== C.FLOAT.NONE } }, { key: "isRootElement", value: function() { return null === this.parent } }, { key: "isTransformed", value: function() { return null !== this.style.transform } }, { key: "isPositionedWithZIndex", value: function() { return this.isPositioned() && !this.style.zIndex.auto } }, { key: "isInlineLevel", value: function() { return (0, s.contains)(this.style.display, f.DISPLAY.INLINE) || (0, s.contains)(this.style.display, f.DISPLAY.INLINE_BLOCK) || (0, s.contains)(this.style.display, f.DISPLAY.INLINE_FLEX) || (0, s.contains)(this.style.display, f.DISPLAY.INLINE_GRID) || (0, s.contains)(this.style.display, f.DISPLAY.INLINE_LIST_ITEM) || (0, s.contains)(this.style.display, f.DISPLAY.INLINE_TABLE) } }, { key: "isInlineBlockOrInlineTable", value: function() { return (0, s.contains)(this.style.display, f.DISPLAY.INLINE_BLOCK) || (0, s.contains)(this.style.display, f.DISPLAY.INLINE_TABLE) } }]), d
            }();
        e.default = i;
        var x = function(A, e) {
            if (A instanceof A.ownerDocument.defaultView.SVGSVGElement || A instanceof SVGSVGElement) { var t = new XMLSerializer; return e.loadImage("data:image/svg+xml," + encodeURIComponent(t.serializeToString(A))) }
            switch (A.tagName) {
                case "IMG":
                    var r = A;
                    return e.loadImage(r.currentSrc || r.src);

                case "CANVAS":
                    var n = A;
                    return e.loadCanvas(n);
                case "IFRAME":
                    var o = A.getAttribute("data-html2canvas-internal-iframe-key");
                    if (o) return o
            }
            return null
        }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        e.contains = function(A, e) { return 0 != (A & e) }, e.distance = function(A, e) { return Math.sqrt(A * A + e * e) }, e.copyCSSStyles = function(A, e) { for (var t = A.length - 1; 0 <= t; t--) { var r = A.item(t); "content" !== r && e.style.setProperty(r, A.getPropertyValue(r)) } return e }, e.SMALL_IMAGE = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), e.parseBackgroundImage = e.parseBackground = e.calculateBackgroundRepeatPath = e.calculateBackgroundPosition = e.calculateBackgroungPositioningArea = e.calculateBackgroungPaintingArea = e.calculateGradientBackgroundSize = e.calculateBackgroundSize = e.BACKGROUND_ORIGIN = e.BACKGROUND_CLIP = e.BACKGROUND_SIZE = e.BACKGROUND_REPEAT = void 0;
        var r = s(t(0)),
            n = s(t(1)),
            a = s(t(36)),
            o = s(t(7)),
            B = t(2),
            c = t(17);

        function s(A) { return A && A.__esModule ? A : { default: A } }
        var i = e.BACKGROUND_REPEAT = { REPEAT: 0, NO_REPEAT: 1, REPEAT_X: 2, REPEAT_Y: 3 },
            l = e.BACKGROUND_SIZE = { AUTO: 0, CONTAIN: 1, COVER: 2, LENGTH: 3 },
            u = e.BACKGROUND_CLIP = { BORDER_BOX: 0, PADDING_BOX: 1, CONTENT_BOX: 2 },
            Q = e.BACKGROUND_ORIGIN = u,
            d = "auto",
            w = function A(e) {
                switch (function(A, e) { if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, A), e) {
                    case "contain":
                        this.size = l.CONTAIN;
                        break;
                    case "cover":
                        this.size = l.COVER;
                        break;
                    case "auto":
                        this.size = l.AUTO;
                        break;
                    default:
                        this.value = new n.default(e)
                }
            },
            h = (e.calculateBackgroundSize = function(A, e, t) {
                var r = 0,
                    n = 0,
                    o = A.size;
                if (o[0].size !== l.CONTAIN && o[0].size !== l.COVER) return o[0].value && (r = o[0].value.getAbsoluteValue(t.width)), o[0].size === l.AUTO && o[1].size === l.AUTO ? n = e.height : o[1].size === l.AUTO ? n = r / e.width * e.height : o[1].value && (n = o[1].value.getAbsoluteValue(t.height)), o[0].size === l.AUTO && (r = n / e.height * e.width), new a.default(r, n);
                var s = t.width / t.height,
                    i = e.width / e.height;
                return s < i != (o[0].size === l.COVER) ? new a.default(t.width, t.width / i) : new a.default(t.height * i, t.height)
            }, e.calculateGradientBackgroundSize = function(A, e) {
                var t = A.size,
                    r = t[0].value ? t[0].value.getAbsoluteValue(e.width) : e.width,
                    n = t[1].value ? t[1].value.getAbsoluteValue(e.height) : t[0].value ? r : e.height;
                return new a.default(r, n)
            }, new w(d)),
            g = (e.calculateBackgroungPaintingArea = function(A, e) {
                switch (e) {
                    case u.BORDER_BOX:
                        return (0, B.calculateBorderBoxPath)(A);
                    case u.PADDING_BOX:
                    default:
                        return (0, B.calculatePaddingBoxPath)(A)
                }
            }, e.calculateBackgroungPositioningArea = function(A, e, t, r) {
                var n = (0, B.calculatePaddingBox)(e, r);
                switch (A) {
                    case Q.BORDER_BOX:
                        return e;
                    case Q.CONTENT_BOX:
                        var o = t[c.PADDING_SIDES.LEFT].getAbsoluteValue(e.width),
                            s = t[c.PADDING_SIDES.RIGHT].getAbsoluteValue(e.width),
                            i = t[c.PADDING_SIDES.TOP].getAbsoluteValue(e.width),
                            a = t[c.PADDING_SIDES.BOTTOM].getAbsoluteValue(e.width);
                        return new B.Bounds(n.left + o, n.top + i, n.width - o - s, n.height - i - a);
                    case Q.PADDING_BOX:
                    default:
                        return n
                }
            }, e.calculateBackgroundPosition = function(A, e, t) { return new o.default(A[0].getAbsoluteValue(t.width - e.width), A[1].getAbsoluteValue(t.height - e.height)) }, e.calculateBackgroundRepeatPath = function(A, e, t, r, n) {
                switch (A.repeat) {
                    case i.REPEAT_X:
                        return [new o.default(Math.round(n.left), Math.round(r.top + e.y)), new o.default(Math.round(n.left + n.width), Math.round(r.top + e.y)), new o.default(Math.round(n.left + n.width), Math.round(t.height + r.top + e.y)), new o.default(Math.round(n.left), Math.round(t.height + r.top + e.y))];
                    case i.REPEAT_Y:
                        return [new o.default(Math.round(r.left + e.x), Math.round(n.top)), new o.default(Math.round(r.left + e.x + t.width), Math.round(n.top)), new o.default(Math.round(r.left + e.x + t.width), Math.round(n.height + n.top)), new o.default(Math.round(r.left + e.x), Math.round(n.height + n.top))];
                    case i.NO_REPEAT:
                        return [new o.default(Math.round(r.left + e.x), Math.round(r.top + e.y)), new o.default(Math.round(r.left + e.x + t.width), Math.round(r.top + e.y)), new o.default(Math.round(r.left + e.x + t.width), Math.round(r.top + e.y + t.height)), new o.default(Math.round(r.left + e.x), Math.round(r.top + e.y + t.height))];
                    default:
                        return [new o.default(Math.round(n.left), Math.round(n.top)), new o.default(Math.round(n.left + n.width), Math.round(n.top)), new o.default(Math.round(n.left + n.width), Math.round(n.height + n.top)), new o.default(Math.round(n.left), Math.round(n.height + n.top))]
                }
            }, e.parseBackground = function(A, e) { return { backgroundColor: new r.default(A.backgroundColor), backgroundImage: f(A, e), backgroundClip: g(A.backgroundClip), backgroundOrigin: U(A.backgroundOrigin) } }, function(A) {
                switch (A) {
                    case "padding-box":
                        return u.PADDING_BOX;
                    case "content-box":
                        return u.CONTENT_BOX
                }
                return u.BORDER_BOX
            }),
            U = function(A) {
                switch (A) {
                    case "padding-box":
                        return Q.PADDING_BOX;
                    case "content-box":
                        return Q.CONTENT_BOX
                }
                return Q.BORDER_BOX
            },
            f = function(A, t) {
                var e = E(A.backgroundImage).map(function(A) {
                        if ("url" === A.method) {
                            var e = t.loadImage(A.args[0]);
                            A.args = e ? [e] : []
                        }
                        return A
                    }),
                    n = A.backgroundPosition.split(","),
                    o = A.backgroundRepeat.split(","),
                    s = A.backgroundSize.split(",");
                return e.map(function(A, e) {
                    var t = (s[e] || d).trim().split(" ").map(C),
                        r = (n[e] || d).trim().split(" ").map(F);
                    return {
                        source: A,
                        repeat: function(A) {
                            switch (A.trim()) {
                                case "no-repeat":
                                    return i.NO_REPEAT;
                                case "repeat-x":
                                case "repeat no-repeat":
                                    return i.REPEAT_X;
                                case "repeat-y":
                                case "no-repeat repeat":
                                    return i.REPEAT_Y;
                                case "repeat":
                                    return i.REPEAT
                            }
                            return i.REPEAT
                        }("string" == typeof o[e] ? o[e] : o[0]),
                        size: t.length < 2 ? [t[0], h] : [t[0], t[1]],
                        position: r.length < 2 ? [r[0], r[0]] : [r[0], r[1]]
                    }
                })
            },
            C = function(A) { return "auto" === A ? h : new w(A) },
            F = function(A) {
                switch (A) {
                    case "bottom":
                    case "right":
                        return new n.default("100%");
                    case "left":
                    case "top":
                        return new n.default("0%");
                    case "auto":
                        return new n.default("0")
                }
                return new n.default(A)
            },
            E = e.parseBackgroundImage = function(A) {
                var e = /^\s$/,
                    t = [],
                    r = [],
                    n = "",
                    o = null,
                    s = "",
                    i = 0,
                    a = 0,
                    B = function() {
                        var A = "";
                        if (n) { '"' === s.substr(0, 1) && (s = s.substr(1, s.length - 2)), s && r.push(s.trim()); var e = n.indexOf("-", 1) + 1; "-" === n.substr(0, 1) && 0 < e && (A = n.substr(0, e).toLowerCase(), n = n.substr(e)), "none" !== (n = n.toLowerCase()) && t.push({ prefix: A, method: n, args: r }) }
                        r = [], n = s = ""
                    };
                return A.split("").forEach(function(A) {
                    if (0 !== i || !e.test(A)) {
                        switch (A) {
                            case '"':
                                o ? o === A && (o = null) : o = A;
                                break;
                            case "(":
                                if (o) break;
                                if (0 === i) return void(i = 1);
                                a++;
                                break;
                            case ")":
                                if (o) break;
                                if (1 === i) {
                                    if (0 === a) return i = 0, void B();
                                    a--
                                }
                                break;
                            case ",":
                                if (o) break;
                                if (0 === i) return void B();
                                if (1 === i && 0 === a && !n.match(/^url$/i)) return r.push(s.trim()), void(s = "")
                        }
                        0 === i ? n += A : s += A
                    }
                }), B(), t
            }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        e.PATH = { VECTOR: 0, BEZIER_CURVE: 1, CIRCLE: 2 }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r = t(6);
        e.default = function A(e, t) {! function(A, e) { if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, A), this.type = r.PATH.VECTOR, this.x = e, this.y = t }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), e.parseListStyle = e.parseListStyleType = e.LIST_STYLE_TYPE = e.LIST_STYLE_POSITION = void 0;
        var r = t(5),
            n = e.LIST_STYLE_POSITION = { INSIDE: 0, OUTSIDE: 1 },
            o = e.LIST_STYLE_TYPE = { NONE: -1, DISC: 0, CIRCLE: 1, SQUARE: 2, DECIMAL: 3, CJK_DECIMAL: 4, DECIMAL_LEADING_ZERO: 5, LOWER_ROMAN: 6, UPPER_ROMAN: 7, LOWER_GREEK: 8, LOWER_ALPHA: 9, UPPER_ALPHA: 10, ARABIC_INDIC: 11, ARMENIAN: 12, BENGALI: 13, CAMBODIAN: 14, CJK_EARTHLY_BRANCH: 15, CJK_HEAVENLY_STEM: 16, CJK_IDEOGRAPHIC: 17, DEVANAGARI: 18, ETHIOPIC_NUMERIC: 19, GEORGIAN: 20, GUJARATI: 21, GURMUKHI: 22, HEBREW: 22, HIRAGANA: 23, HIRAGANA_IROHA: 24, JAPANESE_FORMAL: 25, JAPANESE_INFORMAL: 26, KANNADA: 27, KATAKANA: 28, KATAKANA_IROHA: 29, KHMER: 30, KOREAN_HANGUL_FORMAL: 31, KOREAN_HANJA_FORMAL: 32, KOREAN_HANJA_INFORMAL: 33, LAO: 34, LOWER_ARMENIAN: 35, MALAYALAM: 36, MONGOLIAN: 37, MYANMAR: 38, ORIYA: 39, PERSIAN: 40, SIMP_CHINESE_FORMAL: 41, SIMP_CHINESE_INFORMAL: 42, TAMIL: 43, TELUGU: 44, THAI: 45, TIBETAN: 46, TRAD_CHINESE_FORMAL: 47, TRAD_CHINESE_INFORMAL: 48, UPPER_ARMENIAN: 49, DISCLOSURE_OPEN: 50, DISCLOSURE_CLOSED: 51 },
            s = e.parseListStyleType = function(A) {
                switch (A) {
                    case "disc":
                        return o.DISC;
                    case "circle":
                        return o.CIRCLE;
                    case "square":
                        return o.SQUARE;
                    case "decimal":
                        return o.DECIMAL;
                    case "cjk-decimal":
                        return o.CJK_DECIMAL;
                    case "decimal-leading-zero":
                        return o.DECIMAL_LEADING_ZERO;
                    case "lower-roman":
                        return o.LOWER_ROMAN;
                    case "upper-roman":
                        return o.UPPER_ROMAN;
                    case "lower-greek":
                        return o.LOWER_GREEK;
                    case "lower-alpha":
                        return o.LOWER_ALPHA;
                    case "upper-alpha":
                        return o.UPPER_ALPHA;
                    case "arabic-indic":
                        return o.ARABIC_INDIC;
                    case "armenian":
                        return o.ARMENIAN;
                    case "bengali":
                        return o.BENGALI;
                    case "cambodian":
                        return o.CAMBODIAN;
                    case "cjk-earthly-branch":
                        return o.CJK_EARTHLY_BRANCH;
                    case "cjk-heavenly-stem":
                        return o.CJK_HEAVENLY_STEM;
                    case "cjk-ideographic":
                        return o.CJK_IDEOGRAPHIC;
                    case "devanagari":
                        return o.DEVANAGARI;
                    case "ethiopic-numeric":
                        return o.ETHIOPIC_NUMERIC;
                    case "georgian":
                        return o.GEORGIAN;
                    case "gujarati":
                        return o.GUJARATI;
                    case "gurmukhi":
                        return o.GURMUKHI;
                    case "hebrew":
                        return o.HEBREW;
                    case "hiragana":
                        return o.HIRAGANA;
                    case "hiragana-iroha":
                        return o.HIRAGANA_IROHA;
                    case "japanese-formal":
                        return o.JAPANESE_FORMAL;
                    case "japanese-informal":
                        return o.JAPANESE_INFORMAL;
                    case "kannada":
                        return o.KANNADA;
                    case "katakana":
                        return o.KATAKANA;
                    case "katakana-iroha":
                        return o.KATAKANA_IROHA;
                    case "khmer":
                        return o.KHMER;
                    case "korean-hangul-formal":
                        return o.KOREAN_HANGUL_FORMAL;
                    case "korean-hanja-formal":
                        return o.KOREAN_HANJA_FORMAL;
                    case "korean-hanja-informal":
                        return o.KOREAN_HANJA_INFORMAL;
                    case "lao":
                        return o.LAO;
                    case "lower-armenian":
                        return o.LOWER_ARMENIAN;
                    case "malayalam":
                        return o.MALAYALAM;
                    case "mongolian":
                        return o.MONGOLIAN;
                    case "myanmar":
                        return o.MYANMAR;
                    case "oriya":
                        return o.ORIYA;
                    case "persian":
                        return o.PERSIAN;
                    case "simp-chinese-formal":
                        return o.SIMP_CHINESE_FORMAL;
                    case "simp-chinese-informal":
                        return o.SIMP_CHINESE_INFORMAL;
                    case "tamil":
                        return o.TAMIL;
                    case "telugu":
                        return o.TELUGU;
                    case "thai":
                        return o.THAI;
                    case "tibetan":
                        return o.TIBETAN;
                    case "trad-chinese-formal":
                        return o.TRAD_CHINESE_FORMAL;
                    case "trad-chinese-informal":
                        return o.TRAD_CHINESE_INFORMAL;
                    case "upper-armenian":
                        return o.UPPER_ARMENIAN;
                    case "disclosure-open":
                        return o.DISCLOSURE_OPEN;
                    case "disclosure-closed":
                        return o.DISCLOSURE_CLOSED;
                    case "none":
                    default:
                        return o.NONE
                }
            },
            i = (e.parseListStyle = function(A) { var e = (0, r.parseBackgroundImage)(A.getPropertyValue("list-style-image")); return { listStyleType: s(A.getPropertyValue("list-style-type")), listStyleImage: e.length ? e[0] : null, listStylePosition: i(A.getPropertyValue("list-style-position")) } }, function(A) {
                switch (A) {
                    case "inside":
                        return n.INSIDE;
                    case "outside":
                    default:
                        return n.OUTSIDE
                }
            })
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var n = function() {
                function r(A, e) {
                    for (var t = 0; t < e.length; t++) {
                        var r = e[t];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
                    }
                }
                return function(A, e, t) { return e && r(A.prototype, e), t && r(A, t), A }
            }(),
            r = t(20),
            o = t(22);
        var s = function() {
            function r(A, e, t) {! function(A, e) { if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, r), this.text = A, this.parent = e, this.bounds = t }
            return n(r, null, [{ key: "fromTextNode", value: function(A, e) { var t = a(A.data, e.style.textTransform); return new r(t, e, (0, o.parseTextBounds)(t, e, A)) } }]), r
        }();
        e.default = s;
        var i = /(^|\s|:|-|\(|\))([a-z])/g,
            a = function(A, e) {
                switch (e) {
                    case r.TEXT_TRANSFORM.LOWERCASE:
                        return A.toLowerCase();
                    case r.TEXT_TRANSFORM.CAPITALIZE:
                        return A.replace(i, B);
                    case r.TEXT_TRANSFORM.UPPERCASE:
                        return A.toUpperCase();
                    default:
                        return A
                }
            };

        function B(A, e, t) { return 0 < A.length ? e + t.toUpperCase() : A }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var i = t(23),
            a = function(A) { return 0 === A[0] && 255 === A[1] && 0 === A[2] && 255 === A[3] },
            B = {
                get SUPPORT_RANGE_BOUNDS() {
                    var A = function(A) {
                        if (A.createRange) {
                            var e = A.createRange();
                            if (e.getBoundingClientRect) {
                                var t = A.createElement("boundtest");
                                t.style.height = "123px", t.style.display = "block", A.body.appendChild(t), e.selectNode(t);
                                var r = e.getBoundingClientRect(),
                                    n = Math.round(r.height);
                                if (A.body.removeChild(t), 123 === n) return !0
                            }
                        }
                        return !1
                    }(document);
                    return Object.defineProperty(B, "SUPPORT_RANGE_BOUNDS", { value: A }), A
                },
                get SUPPORT_SVG_DRAWING() {
                    var A = function(A) {
                        var e = new Image,
                            t = A.createElement("canvas"),
                            r = t.getContext("2d");
                        e.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
                        e.crossOrigin = "Anonymous"
                        console.log('我截取图片去')
                        try { r.drawImage(e, 0, 0), t.toDataURL() } catch (A) { return !1 }
                        return !0
                    }(document);
                    return Object.defineProperty(B, "SUPPORT_SVG_DRAWING", { value: A }), A
                },
                get SUPPORT_BASE64_DRAWING() {
                    return function(A) {
                        var e, t, r, n, o, s = (e = document, t = A, r = new Image, n = e.createElement("canvas"), o = n.getContext("2d"), new Promise(function(e) {
                            r.src = t;
                            var A = function() { try { o.drawImage(r, 0, 0), n.toDataURL() } catch (A) { return e(!1) } return e(!0) };
                            r.onload = A, r.onerror = function() { return e(!1) }, !0 === r.complete && setTimeout(function() { A() }, 500)
                        }));
                        return Object.defineProperty(B, "SUPPORT_BASE64_DRAWING", { value: function() { return s } }), s
                    }
                },
                get SUPPORT_FOREIGNOBJECT_DRAWING() {
                    var A = "function" == typeof Array.from && "function" == typeof window.fetch ? function(r) {
                        var A = r.createElement("canvas"),
                            n = 100;
                        A.width = n, A.height = n;
                        var o = A.getContext("2d");
                        o.fillStyle = "rgb(0, 255, 0)", o.fillRect(0, 0, n, n);
                        o.useCORS = true


                        var e = new Image,
                            s = A.toDataURL();
                        e.crossOrigin = "Anonymous"
                        console.log('我截取图片去1')
                        e.src = s;
                        var t = (0, i.createForeignObjectSVG)(n, n, 0, 0, e);
                        return o.fillStyle = "red", o.fillRect(0, 0, n, n), (0, i.loadSerializedSVG)(t).then(function(A) {
                            o.drawImage(A, 0, 0);
                            var e = o.getImageData(0, 0, n, n).data;
                            o.fillStyle = "red", o.fillRect(0, 0, n, n);
                            var t = r.createElement("div");
                            return t.style.backgroundImage = "url(" + s + ")", t.style.height = "100px", a(e) ? (0, i.loadSerializedSVG)((0, i.createForeignObjectSVG)(n, n, 0, 0, t)) : Promise.reject(!1)
                        }).then(function(A) { return o.drawImage(A, 0, 0), a(o.getImageData(0, 0, n, n).data) }).catch(function(A) { return !1 })
                    }(document) : Promise.resolve(!1);
                    return Object.defineProperty(B, "SUPPORT_FOREIGNOBJECT_DRAWING", { value: A }), A
                },
                get SUPPORT_CORS_IMAGES() { var A = void 0 !== (new Image).crossOrigin; return Object.defineProperty(B, "SUPPORT_CORS_IMAGES", { value: A }), A },
                get SUPPORT_RESPONSE_TYPE() { var A = "string" == typeof(new XMLHttpRequest).responseType; return Object.defineProperty(B, "SUPPORT_RESPONSE_TYPE", { value: A }), A },
                get SUPPORT_CORS_XHR() { var A = "withCredentials" in new XMLHttpRequest; return Object.defineProperty(B, "SUPPORT_CORS_XHR", { value: A }), A }
            };
        e.default = B
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), e.parseTextDecoration = e.TEXT_DECORATION_LINE = e.TEXT_DECORATION = e.TEXT_DECORATION_STYLE = void 0;
        var r, n = t(0),
            o = (r = n) && r.__esModule ? r : { default: r };
        var s = e.TEXT_DECORATION_STYLE = { SOLID: 0, DOUBLE: 1, DOTTED: 2, DASHED: 3, WAVY: 4 },
            i = e.TEXT_DECORATION = { NONE: null },
            a = e.TEXT_DECORATION_LINE = { UNDERLINE: 1, OVERLINE: 2, LINE_THROUGH: 3, BLINK: 4 },
            B = function(A) {
                switch (A) {
                    case "underline":
                        return a.UNDERLINE;
                    case "overline":
                        return a.OVERLINE;
                    case "line-through":
                        return a.LINE_THROUGH
                }
                return a.BLINK
            };
        e.parseTextDecoration = function(A) {
            var e, t = "none" === (e = A.textDecorationLine ? A.textDecorationLine : A.textDecoration) ? null : e.split(" ").map(B);
            return null === t ? i.NONE : {
                textDecorationLine: t,
                textDecorationColor: A.textDecorationColor ? new o.default(A.textDecorationColor) : null,
                textDecorationStyle: function(A) {
                    switch (A) {
                        case "double":
                            return s.DOUBLE;
                        case "dotted":
                            return s.DOTTED;
                        case "dashed":
                            return s.DASHED;
                        case "wavy":
                            return s.WAVY
                    }
                    return s.SOLID
                }(A.textDecorationStyle)
            }
        }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), e.parseBorder = e.BORDER_SIDES = e.BORDER_STYLE = void 0;
        var r, n = t(0),
            o = (r = n) && r.__esModule ? r : { default: r };
        var s = e.BORDER_STYLE = { NONE: 0, SOLID: 1 },
            i = e.BORDER_SIDES = { TOP: 0, RIGHT: 1, BOTTOM: 2, LEFT: 3 },
            a = Object.keys(i).map(function(A) { return A.toLowerCase() });
        e.parseBorder = function(n) {
            return a.map(function(A) {
                var e = new o.default(n.getPropertyValue("border-" + A + "-color")),
                    t = function(A) {
                        switch (A) {
                            case "none":
                                return s.NONE
                        }
                        return s.SOLID
                    }(n.getPropertyValue("border-" + A + "-style")),
                    r = parseFloat(n.getPropertyValue("border-" + A + "-width"));
                return { borderColor: e, borderStyle: t, borderWidth: isNaN(r) ? 0 : r }
            })
        }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        e.toCodePoints = function(A) {
            for (var e = [], t = 0, r = A.length; t < r;) {
                var n = A.charCodeAt(t++);
                if (55296 <= n && n <= 56319 && t < r) {
                    var o = A.charCodeAt(t++);
                    56320 == (64512 & o) ? e.push(((1023 & n) << 10) + (1023 & o) + 65536) : (e.push(n), t--)
                } else e.push(n)
            }
            return e
        }, e.fromCodePoint = function() {
            if (String.fromCodePoint) return String.fromCodePoint.apply(String, arguments);
            var A = arguments.length;
            if (!A) return "";
            for (var e = [], t = -1, r = ""; ++t < A;) {
                var n = arguments.length <= t ? void 0 : arguments[t];
                n <= 65535 ? e.push(n) : (n -= 65536, e.push(55296 + (n >> 10), n % 1024 + 56320)), (t + 1 === A || 16384 < e.length) && (r += String.fromCharCode.apply(String, e), e.length = 0)
            }
            return r
        };
        for (var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", l = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256), n = 0; n < r.length; n++) l[r.charCodeAt(n)] = n;
        e.decode = function(A) {
            var e = .75 * A.length,
                t = A.length,
                r = void 0,
                n = 0,
                o = void 0,
                s = void 0,
                i = void 0,
                a = void 0;
            "=" === A[A.length - 1] && (e--, "=" === A[A.length - 2] && e--);
            var B = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array && void 0 !== Uint8Array.prototype.slice ? new ArrayBuffer(e) : new Array(e),
                c = Array.isArray(B) ? B : new Uint8Array(B);
            for (r = 0; r < t; r += 4) o = l[A.charCodeAt(r)], s = l[A.charCodeAt(r + 1)], i = l[A.charCodeAt(r + 2)], a = l[A.charCodeAt(r + 3)], c[n++] = o << 2 | s >> 4, c[n++] = (15 & s) << 4 | i >> 2, c[n++] = (3 & i) << 6 | 63 & a;
            return B
        }, e.polyUint16Array = function(A) { for (var e = A.length, t = [], r = 0; r < e; r += 2) t.push(A[r + 1] << 8 | A[r]); return t }, e.polyUint32Array = function(A) { for (var e = A.length, t = [], r = 0; r < e; r += 4) t.push(A[r + 3] << 24 | A[r + 2] << 16 | A[r + 1] << 8 | A[r]); return t }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), e.createCounterText = e.inlineListItemElement = e.getListOwner = void 0;
        var u = t(4),
            Q = r(t(3)),
            d = r(t(9)),
            w = t(8),
            s = t(24);

        function r(A) { return A && A.__esModule ? A : { default: A } }
        var n = ["OL", "UL", "MENU"],
            i = (e.getListOwner = function(A) {
                var e = A.parent;
                if (!e) return null;
                do {
                    if (-1 !== n.indexOf(e.tagName)) return e;
                    e = e.parent
                } while (e);
                return A.parent
            }, e.inlineListItemElement = function(A, e, t) {
                var r = e.style.listStyle;
                if (r) {
                    var n = A.ownerDocument.defaultView.getComputedStyle(A, null),
                        o = A.ownerDocument.createElement("html2canvaswrapper");
                    switch ((0, u.copyCSSStyles)(n, o), o.style.position = "absolute", o.style.bottom = "auto", o.style.display = "block", o.style.letterSpacing = "normal", r.listStylePosition) {
                        case w.LIST_STYLE_POSITION.OUTSIDE:
                            o.style.left = "auto", o.style.right = A.ownerDocument.defaultView.innerWidth - e.bounds.left - e.style.margin[1].getAbsoluteValue(e.bounds.width) + 7 + "px", o.style.textAlign = "right";
                            break;
                        case w.LIST_STYLE_POSITION.INSIDE:
                            o.style.left = e.bounds.left - e.style.margin[3].getAbsoluteValue(e.bounds.width) + "px", o.style.right = "auto", o.style.textAlign = "left"
                    }
                    var s = void 0,
                        i = e.style.margin[0].getAbsoluteValue(e.bounds.width),
                        a = r.listStyleImage;
                    if (a)
                        if ("url" === a.method) {
                            var B = A.ownerDocument.createElement("img");
                            B.src = a.args[0], o.style.top = e.bounds.top - i + "px", o.style.width = "auto", o.style.height = "auto", o.appendChild(B)
                        } else {
                            var c = .5 * parseFloat(e.style.font.fontSize);
                            o.style.top = e.bounds.top - i + e.bounds.height - 1.5 * c + "px", o.style.width = c + "px", o.style.height = c + "px", o.style.backgroundImage = n.listStyleImage
                        }
                    else "number" == typeof e.listIndex && (s = A.ownerDocument.createTextNode(F(e.listIndex, r.listStyleType, !0)), o.appendChild(s), o.style.top = e.bounds.top - i + "px");
                    var l = A.ownerDocument.body;
                    l.appendChild(o), s ? (e.childNodes.push(d.default.fromTextNode(s, e)), l.removeChild(o)) : e.childNodes.push(new Q.default(o, e, t, 0))
                }
            }, { integers: [1e3, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1], values: ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"] }),
            a = { integers: [9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 900, 800, 700, 600, 500, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], values: ["Ք", "Փ", "Ւ", "Ց", "Ր", "Տ", "Վ", "Ս", "Ռ", "Ջ", "Պ", "Չ", "Ո", "Շ", "Ն", "Յ", "Մ", "Ճ", "Ղ", "Ձ", "Հ", "Կ", "Ծ", "Խ", "Լ", "Ի", "Ժ", "Թ", "Ը", "Է", "Զ", "Ե", "Դ", "Գ", "Բ", "Ա"] },
            B = { integers: [1e4, 9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 19, 18, 17, 16, 15, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], values: ["י׳", "ט׳", "ח׳", "ז׳", "ו׳", "ה׳", "ד׳", "ג׳", "ב׳", "א׳", "ת", "ש", "ר", "ק", "צ", "פ", "ע", "ס", "נ", "מ", "ל", "כ", "יט", "יח", "יז", "טז", "טו", "י", "ט", "ח", "ז", "ו", "ה", "ד", "ג", "ב", "א"] },
            c = { integers: [1e4, 9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 900, 800, 700, 600, 500, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], values: ["ჵ", "ჰ", "ჯ", "ჴ", "ხ", "ჭ", "წ", "ძ", "ც", "ჩ", "შ", "ყ", "ღ", "ქ", "ფ", "ჳ", "ტ", "ს", "რ", "ჟ", "პ", "ო", "ჲ", "ნ", "მ", "ლ", "კ", "ი", "თ", "ჱ", "ზ", "ვ", "ე", "დ", "გ", "ბ", "ა"] },
            l = function(r, A, e, n, t, o) { return r < A || e < r ? F(r, t, 0 < o.length) : n.integers.reduce(function(A, e, t) { for (; e <= r;) r -= e, A += n.values[t]; return A }, "") + o },
            h = function(A, e, t, r) { for (var n = ""; t || A--, n = r(A) + n, e <= (A /= e) * e;); return n },
            g = function(A, e, t, r, n) { var o = t - e + 1; return (A < 0 ? "-" : "") + (h(Math.abs(A), o, r, function(A) { return (0, s.fromCodePoint)(Math.floor(A % o) + e) }) + n) },
            U = function(A, e) {
                var t = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : ". ",
                    r = e.length;
                return h(Math.abs(A), r, !1, function(A) { return e[Math.floor(A % r)] }) + t
            },
            f = function(A, e, t, r, n, o) {
                if (A < -9999 || 9999 < A) return F(A, w.LIST_STYLE_TYPE.CJK_DECIMAL, 0 < n.length);
                var s = Math.abs(A),
                    i = n;
                if (0 === s) return e[0] + i;
                for (var a = 0; 0 < s && a <= 4; a++) {
                    var B = s % 10;
                    0 === B && (0, u.contains)(o, 1) && "" !== i ? i = e[B] + i : 1 < B || 1 === B && 0 === a || 1 === B && 1 === a && (0, u.contains)(o, 2) || 1 === B && 1 === a && (0, u.contains)(o, 4) && 100 < A || 1 === B && 1 < a && (0, u.contains)(o, 8) ? i = e[B] + (0 < a ? t[a - 1] : "") + i : 1 === B && 0 < a && (i = t[a - 1] + i), s = Math.floor(s / 10)
                }
                return (A < 0 ? r : "") + i
            },
            C = "마이너스 ",
            F = e.createCounterText = function(A, e, t) {
                var r = t ? ". " : "",
                    n = t ? "、" : "",
                    o = t ? ", " : "";
                switch (e) {
                    case w.LIST_STYLE_TYPE.DISC:
                        return "•";
                    case w.LIST_STYLE_TYPE.CIRCLE:
                        return "◦";
                    case w.LIST_STYLE_TYPE.SQUARE:
                        return "◾";
                    case w.LIST_STYLE_TYPE.DECIMAL_LEADING_ZERO:
                        var s = g(A, 48, 57, !0, r);
                        return s.length < 4 ? "0" + s : s;
                    case w.LIST_STYLE_TYPE.CJK_DECIMAL:
                        return U(A, "〇一二三四五六七八九", n);
                    case w.LIST_STYLE_TYPE.LOWER_ROMAN:
                        return l(A, 1, 3999, i, w.LIST_STYLE_TYPE.DECIMAL, r).toLowerCase();
                    case w.LIST_STYLE_TYPE.UPPER_ROMAN:
                        return l(A, 1, 3999, i, w.LIST_STYLE_TYPE.DECIMAL, r);
                    case w.LIST_STYLE_TYPE.LOWER_GREEK:
                        return g(A, 945, 969, !1, r);
                    case w.LIST_STYLE_TYPE.LOWER_ALPHA:
                        return g(A, 97, 122, !1, r);
                    case w.LIST_STYLE_TYPE.UPPER_ALPHA:
                        return g(A, 65, 90, !1, r);
                    case w.LIST_STYLE_TYPE.ARABIC_INDIC:
                        return g(A, 1632, 1641, !0, r);
                    case w.LIST_STYLE_TYPE.ARMENIAN:
                    case w.LIST_STYLE_TYPE.UPPER_ARMENIAN:
                        return l(A, 1, 9999, a, w.LIST_STYLE_TYPE.DECIMAL, r);
                    case w.LIST_STYLE_TYPE.LOWER_ARMENIAN:
                        return l(A, 1, 9999, a, w.LIST_STYLE_TYPE.DECIMAL, r).toLowerCase();
                    case w.LIST_STYLE_TYPE.BENGALI:
                        return g(A, 2534, 2543, !0, r);
                    case w.LIST_STYLE_TYPE.CAMBODIAN:
                    case w.LIST_STYLE_TYPE.KHMER:
                        return g(A, 6112, 6121, !0, r);
                    case w.LIST_STYLE_TYPE.CJK_EARTHLY_BRANCH:
                        return U(A, "子丑寅卯辰巳午未申酉戌亥", n);
                    case w.LIST_STYLE_TYPE.CJK_HEAVENLY_STEM:
                        return U(A, "甲乙丙丁戊己庚辛壬癸", n);
                    case w.LIST_STYLE_TYPE.CJK_IDEOGRAPHIC:
                    case w.LIST_STYLE_TYPE.TRAD_CHINESE_INFORMAL:
                        return f(A, "零一二三四五六七八九", "十百千萬", "負", n, 14);
                    case w.LIST_STYLE_TYPE.TRAD_CHINESE_FORMAL:
                        return f(A, "零壹貳參肆伍陸柒捌玖", "拾佰仟萬", "負", n, 15);
                    case w.LIST_STYLE_TYPE.SIMP_CHINESE_INFORMAL:
                        return f(A, "零一二三四五六七八九", "十百千萬", "负", n, 14);
                    case w.LIST_STYLE_TYPE.SIMP_CHINESE_FORMAL:
                        return f(A, "零壹贰叁肆伍陆柒捌玖", "拾佰仟萬", "负", n, 15);
                    case w.LIST_STYLE_TYPE.JAPANESE_INFORMAL:
                        return f(A, "〇一二三四五六七八九", "十百千万", "マイナス", n, 0);
                    case w.LIST_STYLE_TYPE.JAPANESE_FORMAL:
                        return f(A, "零壱弐参四伍六七八九", "拾百千万", "マイナス", n, 7);
                    case w.LIST_STYLE_TYPE.KOREAN_HANGUL_FORMAL:
                        return f(A, "영일이삼사오육칠팔구", "십백천만", C, o, 7);
                    case w.LIST_STYLE_TYPE.KOREAN_HANJA_INFORMAL:
                        return f(A, "零一二三四五六七八九", "十百千萬", C, o, 0);
                    case w.LIST_STYLE_TYPE.KOREAN_HANJA_FORMAL:
                        return f(A, "零壹貳參四五六七八九", "拾百千", C, o, 7);
                    case w.LIST_STYLE_TYPE.DEVANAGARI:
                        return g(A, 2406, 2415, !0, r);
                    case w.LIST_STYLE_TYPE.GEORGIAN:
                        return l(A, 1, 19999, c, w.LIST_STYLE_TYPE.DECIMAL, r);
                    case w.LIST_STYLE_TYPE.GUJARATI:
                        return g(A, 2790, 2799, !0, r);
                    case w.LIST_STYLE_TYPE.GURMUKHI:
                        return g(A, 2662, 2671, !0, r);
                    case w.LIST_STYLE_TYPE.HEBREW:
                        return l(A, 1, 10999, B, w.LIST_STYLE_TYPE.DECIMAL, r);
                    case w.LIST_STYLE_TYPE.HIRAGANA:
                        return U(A, "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん");
                    case w.LIST_STYLE_TYPE.HIRAGANA_IROHA:
                        return U(A, "いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす");
                    case w.LIST_STYLE_TYPE.KANNADA:
                        return g(A, 3302, 3311, !0, r);
                    case w.LIST_STYLE_TYPE.KATAKANA:
                        return U(A, "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン", n);
                    case w.LIST_STYLE_TYPE.KATAKANA_IROHA:
                        return U(A, "イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス", n);
                    case w.LIST_STYLE_TYPE.LAO:
                        return g(A, 3792, 3801, !0, r);
                    case w.LIST_STYLE_TYPE.MONGOLIAN:
                        return g(A, 6160, 6169, !0, r);
                    case w.LIST_STYLE_TYPE.MYANMAR:
                        return g(A, 4160, 4169, !0, r);
                    case w.LIST_STYLE_TYPE.ORIYA:
                        return g(A, 2918, 2927, !0, r);
                    case w.LIST_STYLE_TYPE.PERSIAN:
                        return g(A, 1776, 1785, !0, r);
                    case w.LIST_STYLE_TYPE.TAMIL:
                        return g(A, 3046, 3055, !0, r);
                    case w.LIST_STYLE_TYPE.TELUGU:
                        return g(A, 3174, 3183, !0, r);
                    case w.LIST_STYLE_TYPE.THAI:
                        return g(A, 3664, 3673, !0, r);
                    case w.LIST_STYLE_TYPE.TIBETAN:
                        return g(A, 3872, 3881, !0, r);
                    case w.LIST_STYLE_TYPE.DECIMAL:
                    default:
                        return g(A, 48, 57, !0, r)
                }
            }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r = function() {
                function r(A, e) {
                    for (var t = 0; t < e.length; t++) {
                        var r = e[t];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
                    }
                }
                return function(A, e, t) { return e && r(A.prototype, e), t && r(A, t), A }
            }(),
            n = t(6),
            a = t(11);
        var c = function(A, e) {
                var t = Math.max.apply(null, A.colorStops.map(function(A) { return A.stop })),
                    r = 1 / Math.max(1, t);
                A.colorStops.forEach(function(A) { e.addColorStop(r * A.stop, A.color.toString()) })
            },
            o = function() {
                function e(A) {! function(A, e) { if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, e), this.canvas = A || document.createElement("canvas") }
                return r(e, [
                    { key: "render", value: function(A) { this.ctx = this.canvas.getContext("2d"), this.options = A, this.canvas.width = Math.floor(A.width * A.scale), this.canvas.height = Math.floor(A.height * A.scale), this.canvas.style.width = A.width + "px", this.canvas.style.height = A.height + "px", this.ctx.scale(this.options.scale, this.options.scale), this.ctx.translate(-A.x, -A.y), this.ctx.textBaseline = "bottom", A.logger.log("Canvas renderer initialized (" + A.width + "x" + A.height + " at " + A.x + "," + A.y + ") with scale " + this.options.scale) } },
                    {
                        key: "clip",
                        value: function(A, e) {
                            var t = this;
                            A.length && (this.ctx.save(), A.forEach(function(A) { t.path(A), t.ctx.clip() })), e(), A.length && this.ctx.restore()
                        }
                    },
                    { key: "drawImage", value: function(A, e, t) { this.ctx.drawImage(A, e.left, e.top, e.width, e.height, t.left, t.top, t.width, t.height) } },
                    { key: "drawShape", value: function(A, e) { this.path(A), this.ctx.fillStyle = e.toString(), this.ctx.fill() } }, { key: "fill", value: function(A) { this.ctx.fillStyle = A.toString(), this.ctx.fill() } }, { key: "getTarget", value: function() { return this.canvas.getContext("2d").setTransform(1, 0, 0, 1, 0, 0), Promise.resolve(this.canvas) } }, {
                        key: "path",
                        value: function(A) {
                            var r = this;
                            this.ctx.beginPath(), Array.isArray(A) ? A.forEach(function(A, e) {
                                var t = A.type === n.PATH.VECTOR ? A : A.start;
                                0 === e ? r.ctx.moveTo(t.x, t.y) : r.ctx.lineTo(t.x, t.y), A.type === n.PATH.BEZIER_CURVE && r.ctx.bezierCurveTo(A.startControl.x, A.startControl.y, A.endControl.x, A.endControl.y, A.end.x, A.end.y)
                            }) : this.ctx.arc(A.x + A.radius, A.y + A.radius, A.radius, 0, 2 * Math.PI, !0), this.ctx.closePath()
                        }
                    },
                    { key: "rectangle", value: function(A, e, t, r, n) { this.ctx.fillStyle = n.toString(), this.ctx.fillRect(A, e, t, r) } }, {
                        key: "renderLinearGradient",
                        value: function(A, e) {
                            var t = this.ctx.createLinearGradient(A.left + e.direction.x1, A.top + e.direction.y1, A.left + e.direction.x0, A.top + e.direction.y0);
                            c(e, t), this.ctx.fillStyle = t, this.ctx.fillRect(A.left, A.top, A.width, A.height)
                        }
                    },
                    {
                        key: "renderRadialGradient",
                        value: function(A, e) {
                            var t = this,
                                r = A.left + e.center.x,
                                n = A.top + e.center.y,
                                o = this.ctx.createRadialGradient(r, n, 0, r, n, e.radius.x);
                            if (o)
                                if (c(e, o), this.ctx.fillStyle = o, e.radius.x !== e.radius.y) {
                                    var s = A.left + .5 * A.width,
                                        i = A.top + .5 * A.height,
                                        a = e.radius.y / e.radius.x,
                                        B = 1 / a;
                                    this.transform(s, i, [1, 0, 0, a, 0, 0], function() { return t.ctx.fillRect(A.left, B * (A.top - i) + i, A.width, A.height * B) })
                                } else this.ctx.fillRect(A.left, A.top, A.width, A.height)
                        }
                    },
                    { key: "renderRepeat", value: function(A, e, t, r, n) { this.path(A), this.ctx.fillStyle = this.ctx.createPattern(this.resizeImage(e, t), "repeat"), this.ctx.translate(r, n), this.ctx.fill(), this.ctx.translate(-r, -n) } }, {
                        key: "renderTextNode",
                        value: function(A, e, o, t, s) {
                            var i = this;
                            this.ctx.font = [o.fontStyle, o.fontVariant, o.fontWeight, o.fontSize, o.fontFamily].join(" "), A.forEach(function(r) {
                                if (i.ctx.fillStyle = e.toString(), s && r.text.trim().length ? s.slice(0).reverse().forEach(function(A) { i.ctx.shadowColor = A.color.toString(), i.ctx.shadowOffsetX = A.offsetX * i.options.scale, i.ctx.shadowOffsetY = A.offsetY * i.options.scale, i.ctx.shadowBlur = A.blur, i.ctx.fillText(r.text, r.bounds.left, r.bounds.top + r.bounds.height) }) : i.ctx.fillText(r.text, r.bounds.left, r.bounds.top + r.bounds.height), null !== t) {
                                    var n = t.textDecorationColor || e;
                                    t.textDecorationLine.forEach(function(A) {
                                        switch (A) {
                                            case a.TEXT_DECORATION_LINE.UNDERLINE:
                                                var e = i.options.fontMetrics.getMetrics(o).baseline;
                                                i.rectangle(r.bounds.left, Math.round(r.bounds.top + e), r.bounds.width, 1, n);
                                                break;
                                            case a.TEXT_DECORATION_LINE.OVERLINE:
                                                i.rectangle(r.bounds.left, Math.round(r.bounds.top), r.bounds.width, 1, n);
                                                break;
                                            case a.TEXT_DECORATION_LINE.LINE_THROUGH:
                                                var t = i.options.fontMetrics.getMetrics(o).middle;
                                                i.rectangle(r.bounds.left, Math.ceil(r.bounds.top + t), r.bounds.width, 1, n)
                                        }
                                    })
                                }
                            })
                        }
                    }, { key: "resizeImage", value: function(A, e) { if (A.width === e.width && A.height === e.height) return A; var t = this.canvas.ownerDocument.createElement("canvas"); return t.width = e.width, t.height = e.height, t.getContext("2d").drawImage(A, 0, 0, A.width, A.height, 0, 0, e.width, e.height), t } }, { key: "setOpacity", value: function(A) { this.ctx.globalAlpha = A } }, { key: "transform", value: function(A, e, t, r) { this.ctx.save(), this.ctx.translate(A, e), this.ctx.transform(t[0], t[1], t[2], t[3], t[4], t[5]), this.ctx.translate(-A, -e), r(), this.ctx.restore() } }
                ]), e
            }();
        e.default = o
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var n = function() {
            function r(A, e) {
                for (var t = 0; t < e.length; t++) {
                    var r = e[t];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
                }
            }
            return function(A, e, t) { return e && r(A.prototype, e), t && r(A, t), A }
        }();
        var r = function() {
            function r(A, e, t) {! function(A, e) { if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, r), this.enabled = "undefined" != typeof window && A, this.start = t || Date.now(), this.id = e }
            return n(r, [{ key: "child", value: function(A) { return new r(this.enabled, A, this.start) } }, {
                key: "log",
                value: function() {
                    if (this.enabled && window.console && window.console.log) {
                        for (var A = arguments.length, e = Array(A), t = 0; t < A; t++) e[t] = arguments[t];
                        Function.prototype.bind.call(window.console.log, window.console).apply(window.console, [Date.now() - this.start + "ms", this.id ? "html2canvas (" + this.id + "):" : "html2canvas:"].concat([].slice.call(e, 0)))
                    }
                }
            }, {
                key: "error",
                value: function() {
                    if (this.enabled && window.console && window.console.error) {
                        for (var A = arguments.length, e = Array(A), t = 0; t < A; t++) e[t] = arguments[t];
                        Function.prototype.bind.call(window.console.error, window.console).apply(window.console, [Date.now() - this.start + "ms", this.id ? "html2canvas (" + this.id + "):" : "html2canvas:"].concat([].slice.call(e, 0)))
                    }
                }
            }]), r
        }();
        e.default = r
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), e.parsePadding = e.PADDING_SIDES = void 0;
        var r, n = t(1),
            o = (r = n) && r.__esModule ? r : { default: r };
        e.PADDING_SIDES = { TOP: 0, RIGHT: 1, BOTTOM: 2, LEFT: 3 };
        var s = ["top", "right", "bottom", "left"];
        e.parsePadding = function(e) { return s.map(function(A) { return new o.default(e.getPropertyValue("padding-" + A)) }) }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r = e.OVERFLOW_WRAP = { NORMAL: 0, BREAK_WORD: 1 };
        e.parseOverflowWrap = function(A) {
            switch (A) {
                case "break-word":
                    return r.BREAK_WORD;
                case "normal":
                default:
                    return r.NORMAL
            }
        }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r = e.POSITION = { STATIC: 0, RELATIVE: 1, ABSOLUTE: 2, FIXED: 3, STICKY: 4 };
        e.parsePosition = function(A) {
            switch (A) {
                case "relative":
                    return r.RELATIVE;
                case "absolute":
                    return r.ABSOLUTE;
                case "fixed":
                    return r.FIXED;
                case "sticky":
                    return r.STICKY
            }
            return r.STATIC
        }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r = e.TEXT_TRANSFORM = { NONE: 0, LOWERCASE: 1, UPPERCASE: 2, CAPITALIZE: 3 };
        e.parseTextTransform = function(A) {
            switch (A) {
                case "uppercase":
                    return r.UPPERCASE;
                case "lowercase":
                    return r.LOWERCASE;
                case "capitalize":
                    return r.CAPITALIZE
            }
            return r.NONE
        }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), e.reformatInputBounds = e.inlineSelectElement = e.inlineTextAreaElement = e.inlineInputElement = e.getInputBorderRadius = e.INPUT_BACKGROUND = e.INPUT_BORDERS = e.INPUT_COLOR = void 0;
        var i = l(t(9)),
            r = t(5),
            n = t(12),
            o = l(t(55)),
            s = l(t(7)),
            a = l(t(0)),
            B = l(t(1)),
            c = (t(2), t(22), t(4));

        function l(A) { return A && A.__esModule ? A : { default: A } }
        e.INPUT_COLOR = new a.default([42, 42, 42]);
        var u = new a.default([165, 165, 165]),
            Q = new a.default([222, 222, 222]),
            d = { borderWidth: 1, borderColor: u, borderStyle: n.BORDER_STYLE.SOLID },
            w = (e.INPUT_BORDERS = [d, d, d, d], e.INPUT_BACKGROUND = { backgroundColor: Q, backgroundImage: [], backgroundClip: r.BACKGROUND_CLIP.PADDING_BOX, backgroundOrigin: r.BACKGROUND_ORIGIN.PADDING_BOX }, new B.default("50%")),
            h = [w, w],
            g = [h, h, h, h],
            U = new B.default("3px"),
            f = [U, U],
            C = [f, f, f, f],
            F = (e.getInputBorderRadius = function(A) { return "radio" === A.type ? g : C }, e.inlineInputElement = function(A, e) {
                if ("radio" === A.type || "checkbox" === A.type) {
                    if (A.checked) {
                        var t = Math.min(e.bounds.width, e.bounds.height);
                        e.childNodes.push("checkbox" === A.type ? [new s.default(e.bounds.left + .39363 * t, e.bounds.top + .79 * t), new s.default(e.bounds.left + .16 * t, e.bounds.top + .5549 * t), new s.default(e.bounds.left + .27347 * t, e.bounds.top + .44071 * t), new s.default(e.bounds.left + .39694 * t, e.bounds.top + .5649 * t), new s.default(e.bounds.left + .72983 * t, e.bounds.top + .23 * t), new s.default(e.bounds.left + .84 * t, e.bounds.top + .34085 * t), new s.default(e.bounds.left + .39363 * t, e.bounds.top + .79 * t)] : new o.default(e.bounds.left + t / 4, e.bounds.top + t / 4, t / 4))
                    }
                } else F(E(A), A, e, !1)
            }, e.inlineTextAreaElement = function(A, e) { F(A.value, A, e, !0) }, e.inlineSelectElement = function(A, e) {
                var t = A.options[A.selectedIndex || 0];
                F(t && t.text || "", A, e, !1)
            }, e.reformatInputBounds = function(A) { return A.width > A.height ? (A.left += (A.width - A.height) / 2, A.width = A.height) : A.width < A.height && (A.top += (A.height - A.width) / 2, A.height = A.width), A }, function(A, e, t, r) {
                var n = e.ownerDocument.body;
                if (0 < A.length && n) {
                    var o = e.ownerDocument.createElement("html2canvaswrapper");
                    (0, c.copyCSSStyles)(e.ownerDocument.defaultView.getComputedStyle(e, null), o), o.style.position = "absolute", o.style.left = t.bounds.left + "px", o.style.top = t.bounds.top + "px", r || (o.style.whiteSpace = "nowrap");
                    var s = e.ownerDocument.createTextNode(A);
                    o.appendChild(s), n.appendChild(o), t.childNodes.push(i.default.fromTextNode(s, t)), n.removeChild(o)
                }
            }),
            E = function(A) { var e = "password" === A.type ? new Array(A.value.length + 1).join("•") : A.value; return 0 === e.length ? A.placeholder || "" : e }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), e.parseTextBounds = e.TextBounds = void 0;
        var r, s = t(2),
            Q = t(11),
            n = t(10),
            d = (r = n) && r.__esModule ? r : { default: r },
            w = t(24);
        var h = e.TextBounds = function A(e, t) {! function(A, e) { if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, A), this.text = e, this.bounds = t },
            g = (e.parseTextBounds = function(A, e, t) {
                for (var r = 0 !== e.style.letterSpacing ? (0, w.toCodePoints)(A).map(function(A) { return (0, w.fromCodePoint)(A) }) : (0, w.breakWords)(A, e), n = r.length, o = t.parentNode ? t.parentNode.ownerDocument.defaultView : null, s = o ? o.pageXOffset : 0, i = o ? o.pageYOffset : 0, a = [], B = 0, c = 0; c < n; c++) {
                    var l = r[c];
                    if (e.style.textDecoration !== Q.TEXT_DECORATION.NONE || 0 < l.trim().length)
                        if (d.default.SUPPORT_RANGE_BOUNDS) a.push(new h(l, U(t, B, l.length, s, i)));
                        else {
                            var u = t.splitText(l.length);
                            a.push(new h(l, g(t, s, i))), t = u
                        }
                    else d.default.SUPPORT_RANGE_BOUNDS || (t = t.splitText(l.length));
                    B += l.length
                }
                return a
            }, function(A, e, t) {
                var r = A.ownerDocument.createElement("html2canvaswrapper");
                r.appendChild(A.cloneNode(!0));
                var n = A.parentNode;
                if (n) { n.replaceChild(r, A); var o = (0, s.parseBounds)(r, e, t); return r.firstChild && n.replaceChild(r.firstChild, r), o }
                return new s.Bounds(0, 0, 0, 0)
            }),
            U = function(A, e, t, r, n) { var o = A.ownerDocument.createRange(); return o.setStart(A, e), o.setEnd(A, e + t), s.Bounds.fromClientRect(o.getBoundingClientRect(), r, n) }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r = function() {
            function r(A, e) {
                for (var t = 0; t < e.length; t++) {
                    var r = e[t];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
                }
            }
            return function(A, e, t) { return e && r(A.prototype, e), t && r(A, t), A }
        }();
        var n = function() {
            function e(A) {! function(A, e) { if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, e), this.element = A }
            return r(e, [{
                key: "render",
                value: function(e) {
                    var t = this;
                    this.options = e, this.canvas = document.createElement("canvas"), this.ctx = this.canvas.getContext("2d"), this.canvas.width = Math.floor(e.width) * e.scale, this.canvas.height = Math.floor(e.height) * e.scale, this.canvas.style.width = e.width + "px", this.canvas.style.height = e.height + "px", e.logger.log("ForeignObject renderer initialized (" + e.width + "x" + e.height + " at " + e.x + "," + e.y + ") with scale " + e.scale);
                    var A = o(Math.max(e.windowWidth, e.width) * e.scale, Math.max(e.windowHeight, e.height) * e.scale, e.scrollX * e.scale, e.scrollY * e.scale, this.element);
                    return s(A).then(function(A) { return e.backgroundColor && (t.ctx.fillStyle = e.backgroundColor.toString(), t.ctx.fillRect(0, 0, e.width * e.scale, e.height * e.scale)), t.ctx.drawImage(A, -e.x * e.scale, -e.y * e.scale), t.canvas })
                }
            }]), e
        }();
        e.default = n;
        var o = e.createForeignObjectSVG = function(A, e, t, r, n) {
                var o = "http://www.w3.org/2000/svg",
                    s = document.createElementNS(o, "svg"),
                    i = document.createElementNS(o, "foreignObject");
                return s.setAttributeNS(null, "width", A), s.setAttributeNS(null, "height", e), i.setAttributeNS(null, "width", "100%"), i.setAttributeNS(null, "height", "100%"), i.setAttributeNS(null, "x", t), i.setAttributeNS(null, "y", r), i.setAttributeNS(null, "externalResourcesRequired", "true"), s.appendChild(i), i.appendChild(n), s
            },
            s = e.loadSerializedSVG = function(r) {
                return new Promise(function(A, e) {
                    var t = new Image;
                    t.onload = function() { return A(t) }, t.onerror = e, t.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent((new XMLSerializer).serializeToString(r))
                })
            }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), e.breakWords = e.fromCodePoint = e.toCodePoints = void 0;
        var o = t(51);
        Object.defineProperty(e, "toCodePoints", { enumerable: !0, get: function() { return o.toCodePoints } }), Object.defineProperty(e, "fromCodePoint", { enumerable: !0, get: function() { return o.fromCodePoint } });
        var r, n = t(3),
            s = ((r = n) && r.__esModule, t(18));
        e.breakWords = function(A, e) { for (var t = (0, o.LineBreaker)(A, { lineBreak: e.style.lineBreak, wordBreak: e.style.overflowWrap === s.OVERFLOW_WRAP.BREAK_WORD ? "break-word" : e.style.wordBreak }), r = [], n = void 0; !(n = t.next()).done;) r.push(n.value.slice()); return r }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), e.FontMetrics = void 0;
        var r = function() {
                function r(A, e) {
                    for (var t = 0; t < e.length; t++) {
                        var r = e[t];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
                    }
                }
                return function(A, e, t) { return e && r(A.prototype, e), t && r(A, t), A }
            }(),
            i = t(4);
        var a = "Hidden Text";
        e.FontMetrics = function() {
            function e(A) {! function(A, e) { if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, e), this._data = {}, this._document = A }
            return r(e, [{
                key: "_parseMetrics",
                value: function(A) {
                    var e = this._document.createElement("div"),
                        t = this._document.createElement("img"),
                        r = this._document.createElement("span"),
                        n = this._document.body;
                    if (!n) throw new Error("");
                    e.style.visibility = "hidden", e.style.fontFamily = A.fontFamily, e.style.fontSize = A.fontSize, e.style.margin = "0", e.style.padding = "0", n.appendChild(e), t.src = i.SMALL_IMAGE, t.width = 1, t.height = 1, t.style.margin = "0", t.style.padding = "0", t.style.verticalAlign = "baseline", r.style.fontFamily = A.fontFamily, r.style.fontSize = A.fontSize, r.style.margin = "0", r.style.padding = "0", r.appendChild(this._document.createTextNode(a)), e.appendChild(r), e.appendChild(t);
                    var o = t.offsetTop - r.offsetTop + 2;
                    e.removeChild(r), e.appendChild(this._document.createTextNode(a)), e.style.lineHeight = "normal", t.style.verticalAlign = "super";
                    var s = t.offsetTop - e.offsetTop + 2;
                    return n.removeChild(e), { baseline: o, middle: s }
                }
            }, { key: "getMetrics", value: function(A) { var e = A.fontFamily + " " + A.fontSize; return void 0 === this._data[e] && (this._data[e] = this._parseMetrics(A)), this._data[e] } }]), e
        }()
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), e.Proxy = void 0;
        var r, n = t(10),
            a = (r = n) && r.__esModule ? r : { default: r };
        e.Proxy = function(o, s) {
            if (!s.proxy) return Promise.reject(null);
            var i = s.proxy;
            return new Promise(function(e, t) {
                var r = a.default.SUPPORT_CORS_XHR && a.default.SUPPORT_RESPONSE_TYPE ? "blob" : "text",
                    n = a.default.SUPPORT_CORS_XHR ? new XMLHttpRequest : new XDomainRequest;
                if (n.onload = function() {
                        if (n instanceof XMLHttpRequest)
                            if (200 === n.status)
                                if ("text" === r) e(n.response);
                                else {
                                    var A = new FileReader;
                                    A.addEventListener("load", function() { return e(A.result) }, !1), A.addEventListener("error", function(A) { return t(A) }, !1), A.readAsDataURL(n.response)
                                }
                        else t("");
                        else e(n.responseText)
                    }, n.onerror = t, n.open("GET", i + "?url=" + encodeURIComponent(o) + "&responseType=" + r), "text" !== r && n instanceof XMLHttpRequest && (n.responseType = r), s.imageTimeout) {
                    var A = s.imageTimeout;
                    n.timeout = A, n.ontimeout = function() { return t("") }
                }
                n.send()
            })
        }
    }, function(A, e, t) {
        "use strict";
        var r = this && this.__assign || function() {
                return (r = Object.assign || function(A) {
                    for (var e, t = 1, r = arguments.length; t < r; t++)
                        for (var n in e = arguments[t]) Object.prototype.hasOwnProperty.call(e, n) && (A[n] = e[n]);
                    return A
                }).apply(this, arguments)
            },
            o = this && this.__awaiter || function(o, s, i, a) {
                return new(i || (i = Promise))(function(A, e) {
                    function t(A) { try { n(a.next(A)) } catch (A) { e(A) } }

                    function r(A) { try { n(a.throw(A)) } catch (A) { e(A) } }

                    function n(e) { e.done ? A(e.value) : new i(function(A) { A(e.value) }).then(t, r) }
                    n((a = a.apply(o, s || [])).next())
                })
            },
            u = this && this.__generator || function(t, r) {
                var n, o, s, A, i = { label: 0, sent: function() { if (1 & s[0]) throw s[1]; return s[1] }, trys: [], ops: [] };
                return A = { next: e(0), throw: e(1), return: e(2) }, "function" == typeof Symbol && (A[Symbol.iterator] = function() { return this }), A;

                function e(e) {
                    return function(A) {
                        return function(e) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; i;) try {
                                if (n = 1, o && (s = 2 & e[0] ? o.return : e[0] ? o.throw || ((s = o.return) && s.call(o), 0) : o.next) && !(s = s.call(o, e[1])).done) return s;
                                switch (o = 0, s && (e = [2 & e[0], s.value]), e[0]) {
                                    case 0:
                                    case 1:
                                        s = e;
                                        break;
                                    case 4:
                                        return i.label++, { value: e[1], done: !1 };
                                    case 5:
                                        i.label++, o = e[1], e = [0];
                                        continue;
                                    case 7:
                                        e = i.ops.pop(), i.trys.pop();
                                        continue;
                                    default:
                                        if (!(s = 0 < (s = i.trys).length && s[s.length - 1]) && (6 === e[0] || 2 === e[0])) { i = 0; continue }
                                        if (3 === e[0] && (!s || e[1] > s[0] && e[1] < s[3])) { i.label = e[1]; break }
                                        if (6 === e[0] && i.label < s[1]) { i.label = s[1], s = e; break }
                                        if (s && i.label < s[2]) { i.label = s[2], i.ops.push(e); break }
                                        s[2] && i.ops.pop(), i.trys.pop();
                                        continue
                                }
                                e = r.call(t, i)
                            } catch (A) { e = [6, A], o = 0 } finally { n = s = 0 }
                            if (5 & e[0]) throw e[1];
                            return { value: e[0] ? e[1] : void 0, done: !0 }
                        }([e, A])
                    }
                }
            },
            n = this && this.__importDefault || function(A) { return A && A.__esModule ? A : { default: A } };
        Object.defineProperty(e, "__esModule", { value: !0 });
        var U, s, f, i, a = n(t(28)),
            B = n(t(29)),
            c = n(t(32)),
            l = n(t(62));
        t(64), (s = U || (U = {}))[s.TOP = 0] = "TOP", s[s.BOOTM = 1] = "BOOTM", s[s.LEFT = 2] = "LEFT", s[s.RIGHT = 3] = "RIGHT", s[s.LEFT_TOP = 4] = "LEFT_TOP", s[s.LEFT_BOTTOM = 5] = "LEFT_BOTTOM", s[s.RIGHT_TOP = 6] = "RIGHT_TOP", s[s.RIGHT_BOTTOM = 7] = "RIGHT_BOTTOM", (i = f || (f = {})).EW_RESIZE = "ew-resize", i.NW_RESIZE = "nw-resize", i.NE_RESIZE = "ne-resize", i.NS_RESIZE = "ns-resize";
        var Q = function() {
            function A(A) {
                this.options = { dotRadius: 3, borderColor: "red", saveFileName: "截图", zIndex: 5e3, ignoreElements: function() { return !1 } }, this.loadingDom = document.createElement("div"), this.maskCanvas = document.createElement("canvas"), this.maskCtx = this.maskCanvas.getContext("2d"), this.startPoint = { x: 0, y: 0 }, this.isClipDrag = !1, this.isDotDrag = !1, this.options = r({}, this.options, A);
                var e = this.options.zIndex;
                this.tools = new a.default(e), this.paint = new B.default(e), this.loadingDom.className = "page-screenshot-spinner", this.loadingDom.style.zIndex = e + "", this.loadingDom.setAttribute("data-html2canvas-ignore", "true"), this.loadingDom.innerHTML = '\n        <div class="spinner">\n            <div class="spinner-container container1">\n                <div class="circle1"></div>\n                <div class="circle2"></div>\n                <div class="circle3"></div>\n                <div class="circle4"></div>\n            </div>\n            <div class="spinner-container container2">\n                <div class="circle1"></div>\n                <div class="circle2"></div>\n                <div class="circle3"></div>\n                <div class="circle4"></div>\n            </div>\n            <div class="spinner-container container3">\n                <div class="circle1"></div>\n                <div class="circle2"></div>\n                <div class="circle3"></div>\n                <div class="circle4"></div>\n            </div>\n        </div>', this.initMask()
            }
            return A.prototype.initMask = function() {
                    var A = window.innerWidth,
                        e = window.innerHeight;
                    this.maskCanvas.style.position = "fixed", this.maskCanvas.style.top = "0px", this.maskCanvas.style.left = "0px", this.maskCanvas.style.right = "0px", this.maskCanvas.style.bottom = "0px", this.maskCanvas.style.zIndex = this.options.zIndex + "", this.maskCanvas.width = A, this.maskCanvas.height = e
                },

                A.prototype.addEventListener = function() {
                    var n = this;
                    this.maskCanvas.addEventListener("mousedown", this.onMousedown.bind(this)), this.maskCanvas.addEventListener("mousemove", this.onMousemove.bind(this)), window.addEventListener("mouseup", this.onMouseup.bind(this)), this.maskCanvas.oncontextmenu = function(A) {

                        var canvas1 = document.getElementById("canvas1"); //canvas画布 
                        var canvas2 = document.getElementById("canvas2"); //canvas画布 
                        var videoEle1 = document.getElementById("video1");
                        var videoEle2 = document.getElementById("video2");
                        videoEle1.style.display = 'block'
                        videoEle2.style.display = 'block'
                        canvas1.style.display = 'none'
                        canvas2.style.display = 'none'
                        console.log('我被取消了')
                        return n.end(), !1
                    }, this.tools.onSave(function() {
                        return o(n, void 0, void 0, function() {
                            var e;
                            return u(this, function(A) {
                                switch (A.label) {
                                    case 0:
                                        return [4, this.drawClip()];
                                    case 1:
                                        return e = A.sent().blob, l.default.saveAs(e, this.options.saveFileName + ".jpg"), [2]
                                }
                            })
                        })
                    }), this.tools.onUndo(function() { n.paint.undo(), 0 == n.paint.getStackSize() && (n.paint.removeFromBody(), n.tools.reset()) }), this.tools.onItemClick(function(A) {
                        if (n.calculateToolsPosition(), A) {
                            var e = A.option,
                                t = e.size,
                                r = e.color;
                            n.paint.setPaintType({ size: t, color: r, type: A.type }), n.paint.addToBody(), "text" == A.type ? n.paint.updateTextareaStatus(A.option) : n.paint.showTextarea(!1)
                        } else 0 == n.paint.getStackSize() && n.paint.removeFromBody()
                    })
                },
                A.prototype.removeEventListener = function() { this.maskCanvas.removeEventListener("mousedown", this.onMousedown), this.maskCanvas.removeEventListener("mousemove", this.onMousemove), this.maskCanvas.removeEventListener("mouseup", this.onMouseup) }, A.prototype.onMousedown = function(A) {
                    var e = A.clientX,
                        t = A.clientY;
                    if (!this.points) return this.isClipDrag = !0, void(this.startPoint = { x: e, y: t });
                    var r = this.mouseInPoints(e, t);
                    return r ? (this.isDotDrag = !0, this.startPoint = { x: e, y: t }, void(this.dotDirection = 1 == r ? r : r.direction)) : void 0
                },
                A.prototype.onMousemove = function(A) {
                    var e = A.clientX,
                        t = A.clientY;
                    if (this.isClipDrag) {
                        var r = this.startPoint,
                            n = r.x,
                            o = r.y;
                        return this.clipInfo = { x: Math.min(n, e), y: Math.min(o, t), w: Math.abs(e - n), h: Math.abs(t - o) }, void this.drawMask()
                    }
                    if (this.clipInfo) {
                        var s = this.mouseInPoints(e, t);
                        if (1 == s ? this.maskCanvas.style.cursor = "move" : s && s.cursor ? this.maskCanvas.style.cursor = s.cursor : this.maskCanvas.style.cursor = "default", this.isDotDrag) {
                            var i = this.startPoint;
                            n = i.x, o = i.y;
                            if (!0 === this.dotDirection) {
                                var a = this.clipInfo,
                                    B = a.w,
                                    c = a.h,
                                    l = document.documentElement.clientHeight,
                                    u = document.documentElement.clientWidth,
                                    Q = this.clipInfo.x + (e - n),
                                    d = this.clipInfo.y + (t - o);
                                Q < 0 && (Q = 0), d < 0 && (d = 0), u < Q + B && (Q = u - B), l < d + c && (d = l - c), this.clipInfo.x = Q, this.clipInfo.y = d
                            } else U.LEFT_TOP == this.dotDirection ? (this.clipInfo.x += e - n, this.clipInfo.y += t - o, this.clipInfo.w -= e - n, this.clipInfo.h -= t - o) : U.TOP == this.dotDirection ? (this.clipInfo.y += t - o, this.clipInfo.h -= t - o) : U.RIGHT_TOP == this.dotDirection ? (this.clipInfo.y += t - o, this.clipInfo.w += e - n, this.clipInfo.h -= t - o) : U.RIGHT == this.dotDirection ? this.clipInfo.w += e - n : U.RIGHT_BOTTOM == this.dotDirection ? (this.clipInfo.w += e - n, this.clipInfo.h += t - o) : U.BOOTM == this.dotDirection ? this.clipInfo.h += t - o : U.LEFT_BOTTOM == this.dotDirection ? (this.clipInfo.x += e - n, this.clipInfo.w -= e - n, this.clipInfo.h += t - o) : U.LEFT == this.dotDirection && (this.clipInfo.x += e - n, this.clipInfo.w -= e - n);
                            return this.startPoint = { x: e, y: t }, this.drawMask(), void this.calculateToolsPosition()
                        }
                    }
                },
                A.prototype.onMouseup = function() {
                    if ((this.isClipDrag || this.isDotDrag) && (this.isClipDrag = !1, this.isDotDrag = !1, this.clipInfo)) {
                        var A = this.clipInfo,
                            e = A.w,
                            t = A.h;
                        e < 0 && (this.clipInfo.x -= Math.abs(e), this.clipInfo.w = Math.abs(e)), t < 0 && (this.clipInfo.y -= Math.abs(t), this.clipInfo.h = Math.abs(t)), this.drawMask(), this.tools.show(), this.calculateToolsPosition(), this.calculatePaintPosition()
                    }
                },
                A.prototype.calculateToolsPosition = function() {
                    var A = this.clipInfo,
                        e = A.x,
                        t = A.y,
                        r = A.w,
                        n = A.h,
                        o = this.tools.size(),
                        s = this.options.dotRadius,
                        i = void 0 === s ? 3 : s,
                        a = document.documentElement.clientHeight,
                        B = t + n + i,
                        c = "bottom";
                    B + o.th + o.toh > a && (c = "top", (B = t - i - o.th) - o.toh < 0 && (B = t + n - i - o.th));
                    var l = e + r - o.width - i;
                    l < 0 && (l = 0), this.tools.setPosition(c, { left: l, top: B })
                },
                A.prototype.calculatePaintPosition = function() {
                    var A = this.clipInfo,
                        e = A.x,
                        t = A.y,
                        r = A.w,
                        n = A.h;
                    this.paint.updateCanvasPosition(e, t, r, n)
                },
                A.prototype.mouseInPoints = function(r, n) {
                    if (!this.points) throw new Error("points为空！");
                    var A = this.options.dotRadius,
                        o = void 0 === A ? 3 : A;
                    if (this.clipInfo && 0 == this.paint.getStackSize()) {
                        var e = this.clipInfo,
                            t = e.x,
                            s = e.y,
                            i = e.w,
                            a = e.h,
                            B = this.points.find(function(A) {
                                var e = A.x,
                                    t = A.y;
                                return e - o < r && r < e + o && n < t + o && t - o < n
                            });
                        return B || t < r && r < t + i && s < n && n < s + a
                    }
                    return !1
                },
                A.prototype.drawMask = function() {
                    var A = this.maskCtx,
                        e = window.innerWidth,
                        t = window.innerHeight,
                        r = this.options,
                        n = r.dotRadius,
                        o = void 0 === n ? 3 : n,
                        s = r.borderColor,
                        i = void 0 === s ? "red" : s;
                    if (A.clearRect(0, 0, e, t), A.beginPath(), A.save(), A.rect(0, 0, e, t), A.fillStyle = "rgba(0,0,0,.4)", A.fill(), A.restore(), this.clipInfo) {
                        var a = this.clipInfo,
                            B = a.x,
                            c = a.y,
                            l = a.w,
                            u = a.h;
                        A.beginPath(), A.save(), A.clearRect(B, c, l, u), A.rect(B, c, l, u), A.strokeStyle = i, A.stroke(), A.restore(), this.points = [{ direction: U.LEFT_TOP, cursor: f.NW_RESIZE, x: B, y: c }, { direction: U.TOP, cursor: f.NS_RESIZE, x: B + .5 * l, y: c }, { direction: U.RIGHT_TOP, cursor: f.NE_RESIZE, x: B + l, y: c }, { direction: U.LEFT, cursor: f.EW_RESIZE, x: B, y: c + .5 * u }, { direction: U.LEFT_BOTTOM, cursor: f.NE_RESIZE, x: B, y: c + u }, { direction: U.RIGHT, cursor: f.EW_RESIZE, x: B + l, y: c + .5 * u }, { direction: U.BOOTM, cursor: f.NS_RESIZE, x: B + .5 * l, y: c + u }, { direction: U.RIGHT_BOTTOM, cursor: f.NW_RESIZE, x: B + l, y: c + u }];
                        for (var Q = 0, d = this.points; Q < d.length; Q++) {
                            var w = d[Q],
                                h = w.x,
                                g = w.y;
                            A.beginPath(), A.save(), A.arc(h, g, o, 0, 2 * Math.PI), A.fillStyle = i, A.fill(), A.restore()
                        }
                    }
                },
                A.prototype.detectZoom = function() {
                    var A = 1,
                        e = window.screen,
                        t = navigator.userAgent.toLowerCase();
                    return void 0 !== window.devicePixelRatio ? A = window.devicePixelRatio : ~t.indexOf("msie") ? e.deviceXDPI && e.logicalXDPI && (A = e.deviceXDPI / e.logicalXDPI) : void 0 !== window.outerWidth && void 0 !== window.innerWidth && (A = window.outerWidth / window.innerWidth), A
                },
                A.prototype.getScrollPosition = function() {
                    var A = 0,
                        e = 0;
                    return document.documentElement && document.documentElement.scrollTop ? A = document.documentElement.scrollTop : document.body && (A = document.body.scrollTop), document.documentElement && document.documentElement.scrollLeft ? e = document.documentElement.scrollLeft : document.body && (e = document.body.scrollLeft), { scrollTop: A, scrollLeft: e }
                },
                A.prototype.drawClip = function() { return o(this, void 0, void 0, function() { var r, e, t, n, o, s, i, a, B, c, l; return u(this, function(A) { if (!this.bodyCanvas || !this.clipInfo) throw new Error("bodyCanvas or clipInfo is not undefined"); return r = document.createElement("canvas"), e = this.clipInfo, t = e.x, n = e.y, o = e.w, s = e.h, i = this.getScrollPosition(), a = i.scrollLeft, B = i.scrollTop, c = this.detectZoom(), r.width = o * c, r.height = s * c, (l = r.getContext("2d")).beginPath(), l.save(), l.drawImage(this.bodyCanvas, -(t + a) * c, -(n + B) * c), l.drawImage(this.paint.getCanvas(), 0, 0, o * c, s * c), l.restore(), [2, new Promise(function(e, t) { r.toBlob(function(A) { A || t("截图失败！"), e({ dataURL: r.toDataURL(), blob: A, canvas: r }) }, "image/jpeg", .95) })] }) }) }, A.prototype.end = function() { document.body.style.userSelect = "auto", document.body.removeChild(this.maskCanvas), document.body.removeChild(this.bodyCanvas), this.tools.hide(), this.tools.removeFromBody(), this.paint.removeFromBody(), this.removeEventListener(), this.clipInfo = void 0, this.dotDirection = void 0, this.points = void 0 }, A.prototype.generateBodySnapshot = function() {
                    return o(this, void 0, void 0, function() {
                        var e, t, r, n;
                        return u(this, function(A) {
                            switch (A.label) {
                                case 0:
                                    return document.body.appendChild(this.loadingDom), e = window.innerHeight, t = document.body.style.height, document.body.offsetHeight < e && (document.body.style.height = e + "px"), r = this.options.ignoreElements, n = this, [4, c.default(document.body, { logging: !1, ignoreElements: r, type: "view" })];
                                case 1:
                                    if (n.bodyCanvas = A.sent(), document.body.style.height = t, document.body.removeChild(this.loadingDom), !this.bodyCanvas) throw new Error("生成body快照失败！");
                                    return this.bodyCanvas.style.position = "absolute", this.bodyCanvas.style.top = "0px", this.bodyCanvas.style.left = "0px", document.body.appendChild(this.bodyCanvas), [2]
                            }
                        })
                    })
                },
                A.prototype.screenshot = function() {
                    return o(this, void 0, void 0, function() {
                        var e = this;
                        var canvas1 = document.getElementById("canvas1"); //canvas画布 
                        var canvas2 = document.getElementById("canvas2"); //canvas画布 
                        // var canvas = document.getElementsByTagName('canvas'); //canvas画布 

                        var videoEle1 = document.getElementById("video1");
                        var videoEle2 = document.getElementById("video2");

                        var style1 = getComputedStyle(videoEle1);
                        var style2 = getComputedStyle(videoEle2);
                        var wid1 = Number(style1.width.slice(0, -2))
                        var hei1 = Number(style1.height.slice(0, -2))
                        var wid2 = Number(style2.width.slice(0, -2))
                        var hei2 = Number(style2.height.slice(0, -2))
                        canvas1.getContext("2d").drawImage(videoEle1, 0, 0, wid1, hei1)
                        canvas2.getContext("2d").drawImage(videoEle2, 0, 0, wid2, hei2)
                            // var dataURL = canvas.toDataURL();
                            // console.log(dataURL)
                        console.log('我是宽和高')
                            // console.log(0)
                        videoEle1.style.display = 'none'
                        videoEle2.style.display = 'none'
                        canvas1.style.display = 'block'
                        canvas2.style.display = 'block'



                        return u(this, function(A) {
                            switch (A.label) {
                                case 0:
                                    return document.body.style.userSelect = "none", [4, this.generateBodySnapshot()];
                                case 1:
                                    return A.sent(), this.maskCanvas.style.cursor = "crosshair", document.body.appendChild(this.maskCanvas), this.addEventListener(), this.tools.addToBody(), this.drawMask(), [2, new Promise(function(t) {
                                        e.tools.onOk(function() {
                                            return o(e, void 0, void 0, function() {
                                                var e;
                                                return u(this, function(A) {
                                                    switch (A.label) {
                                                        case 0:
                                                            return e = t, [4, this.drawClip()];
                                                        case 1:
                                                            return e.apply(void 0, [A.sent()]), this.end(), [2]
                                                    }
                                                })
                                            })
                                        }), e.tools.onCancel(function() { t(!1), e.end() })
                                    })]
                            }

                        })
                    })
                }, A
        }();
        e.default = Q, window.PageScreenshot = Q
    }, function(A, e, t) {
        "use strict";
        var r, n, o, s;
        Object.defineProperty(e, "__esModule", { value: !0 }), (n = r || (r = {}))[n.SMALL = 1] = "SMALL", n[n.MIDDLE = 2] = "MIDDLE", n[n.LARGE = 3] = "LARGE", (s = o || (o = {}))[s.SMALL = 14] = "SMALL", s[s.MIDDLE = 18] = "MIDDLE", s[s.LARGE = 22] = "LARGE";
        var i = function() {
            function A(A) { this.tools = document.createElement("div"), this.toolOption = document.createElement("div"), this.children = [{ type: "rect", title: "矩形工具", dom: document.createElement("div"), option: { size: r.MIDDLE, color: "red" } }, { type: "arrow", title: "箭头工具", dom: document.createElement("div"), option: { size: r.MIDDLE, color: "red" } }, { type: "brush", title: "画笔工具", dom: document.createElement("div"), option: { size: r.MIDDLE, color: "red" } }, { type: "undo", title: "撤销", dom: document.createElement("div") }, { type: "save", title: "保存", dom: document.createElement("div") }, { type: "cancel", title: "取消", dom: document.createElement("div") }, { type: "ok", title: "确认", dom: document.createElement("div") }], this.commonSizes = [{ size: r.SMALL, dom: document.createElement("div") }, { size: r.MIDDLE, dom: document.createElement("div") }, { size: r.LARGE, dom: document.createElement("div") }], this.textSizes = [{ size: o.SMALL, dom: document.createElement("div") }, { size: o.MIDDLE, dom: document.createElement("div") }, { size: o.LARGE, dom: document.createElement("div") }], this.colors = [{ color: "black", dom: document.createElement("div") }, { color: "red", dom: document.createElement("div") }, { color: "green", dom: document.createElement("div") }, { color: "brown", dom: document.createElement("div") }, { color: "purple", dom: document.createElement("div") }], this.initTools(A) }
            return A.prototype.initTools = function(A) {
                var n = this;
                this.tools.className = "page-screenshot-tools hide", this.tools.style.top = "0px", this.tools.style.left = "0px", this.tools.style.zIndex = this.toolOption.style.zIndex = A + 300 + "", this.children.forEach(function(A) {
                    var e = A.type,
                        t = (A.title, A.dom),
                        r = A.option;
                    "divider" != e ? (t.className = "item " + e, t.innerHTML = '<i class="psfont icon-' + e + '"></i>', t.addEventListener("click", function() {
                        console.log('查看触发的条件' + e)
                            // if (e == "cancel" || e == "save" || e == "ok") {
                        var canvas1 = document.getElementById("canvas1"); //canvas画布 
                        var canvas2 = document.getElementById("canvas2"); //canvas画布 
                        var videoEle1 = document.getElementById("video1");
                        var videoEle2 = document.getElementById("video2");
                        videoEle1.style.display = 'block'
                        videoEle2.style.display = 'block'
                        canvas1.style.display = 'none'
                        canvas2.style.display = 'none'
                            // }
                        "ok" != e ? "cancel" != e ? "save" != e ? "undo" != e ? (n.currentTool && (n.currentTool.dom.className = "item " + n.currentTool.type), n.currentTool !== A ? (t.className = "item " + e + " active", n.currentTool = A, r && n.showToolOption(r.size, r.color, "text" == A.type ? "text" : "common"), n.callbackItem && n.callbackItem(A)) : (n.currentTool = void 0, n.hideToolOption(), n.callbackItem && n.callbackItem())) : n.callbackUndo && n.callbackUndo() : n.callbackSave && n.callbackSave() : n.callbackCancel && n.callbackCancel() : n.callbackOk && n.callbackOk()
                    })) : t.className = "" + e, n.tools.appendChild(t)
                }), this.commonSizes.forEach(function(A) {
                    var e = A.dom;
                    e.addEventListener("click", function() { n.currentSize && (n.currentSize.dom.className = "size"), e.className = "size active", n.currentSize = A, n.currentTool.option.size = A.size, n.callbackItem && n.callbackItem(n.currentTool) });
                    var t = document.createElement("div");
                    t.style.height = A.size + "px", e.style.display = "none", e.appendChild(t), n.toolOption.appendChild(e)
                }), this.textSizes.forEach(function(A) {
                    var e = A.dom;
                    e.addEventListener("click", function() { n.currentSize && (n.currentSize.dom.className = "size"), e.className = "size active", n.currentSize = A, n.currentTool.option.size = A.size, n.callbackItem && n.callbackItem(n.currentTool) }), e.style.fontSize = A.size + "px", e.style.display = "none", e.innerText = "A", n.toolOption.appendChild(e)
                });
                var e = document.createElement("div");
                e.className = "divider", this.toolOption.appendChild(e), this.colors.forEach(function(A) {
                    var e = A.dom;
                    e.addEventListener("click", function() { n.currentColor && (n.currentColor.dom.className = "color"), e.className = "color active", n.currentColor = A, n.currentTool.option.color = A.color, n.callbackItem && n.callbackItem(n.currentTool) }), e.style.background = A.color, n.toolOption.appendChild(e)
                })
            }, A.prototype.showToolOption = function(e, t, r) {
                // 画笔大小
                // this.commonSizes.forEach(function(A) { A.dom.style.display = "", "text" == r ? A.dom.style.display = "none" : e == A.size ? (A.dom.className = "size active", n.currentSize = A) : A.dom.className = "size active" }), 
                // 选择颜色
                var n = this;
                this.toolOption.className = "page-screenshot-tool-option", this.textSizes.forEach(function(A) { A.dom.style.display = "", "common" == r ? A.dom.style.display = "none" : e == A.size ? (A.dom.className = "size active", n.currentSize = A) : A.dom.className = "size" }), this.colors.forEach(function(A) { t == A.color ? (A.dom.className = "color active", n.currentColor = A) : A.dom.className = "color" }), this.setToolOptionPosition()
            }, A.prototype.hideToolOption = function() { this.toolOption.className = "page-screenshot-tool-option hide" }, A.prototype.setToolOptionPosition = function() {
                var A = this.tools.clientHeight,
                    e = this.toolOption.clientHeight,
                    t = this.tools.offsetTop;
                "bottom" == this.direction ? this.toolOption.style.top = A + t + 1 + "px" : this.toolOption.style.top = t - e - 1 + "px"
            }, A.prototype.reset = function() {
                this.hideToolOption(), this.children.forEach(function(A) {
                    var e = A.dom,
                        t = A.type;
                    e.className = "item " + t
                }), this.currentColor = void 0, this.currentSize = void 0, this.currentTool = void 0
            }, A.prototype.addToBody = function() { document.body.appendChild(this.tools), document.body.appendChild(this.toolOption) }, A.prototype.removeFromBody = function() { document.body.removeChild(this.tools), document.body.removeChild(this.toolOption), this.reset() }, A.prototype.size = function() { return { width: this.tools.clientWidth, th: this.tools.offsetHeight, toh: this.toolOption.clientHeight } }, A.prototype.setPosition = function(A, e) {
                var t = e.top,
                    r = e.left;
                this.tools.style.top = t + "px", this.tools.style.left = r + "px", this.toolOption.style.left = r + "px", this.direction = A, this.setToolOptionPosition()
            }, A.prototype.hide = function() { this.tools.className = "page-screenshot-tools hide" }, A.prototype.show = function() { this.tools.className = "page-screenshot-tools" }, A.prototype.onItemClick = function(A) { this.callbackItem = A }, A.prototype.onOk = function(A) { this.callbackOk = A }, A.prototype.onCancel = function(A) { this.callbackCancel = A }, A.prototype.onSave = function(A) { this.callbackSave = A }, A.prototype.onUndo = function(A) { this.callbackUndo = A }, A
        }();
        e.default = i
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), t(30), t(31);
        var r = function() {
            function C(A) { this.canvas = document.createElement("canvas"), this.textarea = document.createElement("textarea"), this.stack = [], this.isDrag = !1, this.isAddToBody = !1, this.isShowTextarea = !1, this.canvas.style.position = "fixed", this.canvas.style.zIndex = A + 100 + "", this.canvas.style.cursor = "crosshair", this.textarea.style.position = "fixed", this.textarea.style.zIndex = A + 200 + "", this.textarea.style.display = "none", this.textarea.style.resize = "none", this.textarea.style.overflow = "hidden", this.textarea.style.background = "transparent", this.textarea.style.padding = "0px", this.textarea.style.fontFamily = C.FONT_FAMILY, this.textarea.style.outline = "none", this.textarea.style.border = "2px dotted #ccc", this.textarea.style.lineHeight = "initial", this.addEventListener() }
            return C.prototype.addEventListener = function() { this.canvas.addEventListener("mousedown", this.onMousedown.bind(this)), this.canvas.addEventListener("mousemove", this.onMousemove.bind(this)), window.addEventListener("mouseup", this.onMouseup.bind(this)), this.textarea.addEventListener("input", this.updateTextareaWH.bind(this)) }, C.prototype.getStackTop = function() { return this.stack[this.stack.length - 1] }, C.prototype.onMousedown = function(A) {
                var e = this,
                    t = A.offsetX,
                    r = A.offsetY,
                    n = A.clientX,
                    o = A.clientY;
                if (this.paintType) {
                    var s = this.paintType,
                        i = s.size,
                        a = s.color,
                        B = s.type,
                        c = this.canvas,
                        l = c.width,
                        u = c.height;
                    if (this.isShowTextarea) {
                        var Q = this.textarea.value;
                        if (0 == Q.trim().length) return this.stack.pop(), void this.showTextarea(!1);
                        var d = this.getStackTop().cache,
                            w = this.startPoint,
                            h = w.x,
                            g = w.y,
                            U = d.getContext("2d");
                        return U.save(), U.beginPath(), U.fillStyle = a, U.font = i + "px " + C.FONT_FAMILY, U.textBaseline = "top", U.fillMultilineText(Q, h + 1, g + 1, l - h - 3, 3), U.restore(), this.draw(), void this.showTextarea(!1)
                    }
                    this.isDrag = !0;
                    var f = document.createElement("canvas");
                    f.width = l, f.height = u, this.stack.push({ cache: f, size: i, color: a }), this.startPoint = { x: t, y: r }, "text" == B && (this.showTextarea(!0), this.textarea.style.left = n + "px", this.textarea.style.top = o + "px", setTimeout(function() { e.textarea.focus() }, 50), this.isDrag = !1)
                }
            }, C.prototype.onMousemove = function(A) {
                var e = A.offsetX,
                    t = A.offsetY,
                    r = this.getStackTop();
                if (!this.isShowTextarea && this.isDrag && this.paintType && r && this.startPoint) {
                    var n = this.paintType,
                        o = n.size,
                        s = n.color,
                        i = n.type,
                        a = this.canvas,
                        B = a.width,
                        c = a.height,
                        l = r.cache.getContext("2d"),
                        u = this.startPoint,
                        Q = u.x,
                        d = u.y;
                    if ("brush" != i && l.clearRect(0, 0, B, c), l.beginPath(), l.save(), l.fillStyle = l.strokeStyle = s, l.lineWidth = o, "rect" == i) l.rect(Q, d, e - Q, t - d), l.stroke();
                    else if ("arrow" == i) {
                        var w = 3;
                        2 == o ? w = 5 : 3 == o && (w = 7), l.fillArrow(Q, d, e, t, w)
                    } else if ("brush" == i) l.moveTo(Q, d), l.lineTo(e, t), l.stroke(), this.startPoint = { x: e, y: t };
                    else if ("ellipse" == i) {
                        var h = Math.abs(e - Q),
                            g = Math.abs(t - d),
                            U = Math.max(h, g);
                        l.save(), l.scale(h / U, g / U);
                        var f = .5 * (Q + e) / (h / U),
                            C = .5 * (d + t) / (g / U);
                        l.arc(f, C, .5 * U, 0, 2 * Math.PI), l.closePath(), l.restore(), l.stroke()
                    }
                    l.restore(), this.draw()
                }
            }, C.prototype.onMouseup = function() { this.isShowTextarea || (this.isDrag = !1) }, C.prototype.updateTextareaWH = function() {
                if (this.paintType) {
                    var A = this.textarea.value,
                        e = this.paintType.size;
                    if (0 == A.length) this.textarea.style.width = e + "px", this.textarea.style.height = e + 4 + "px";
                    else if (this.startPoint) {
                        var t = this.canvas.getContext("2d");
                        t.font = e + "px " + C.FONT_FAMILY;
                        var r = (A.split("\n") || []).map(function(A) { return t.measureText(A).width }),
                            n = Math.min(Math.max.apply(Math, r) + 10, this.canvas.width - this.startPoint.x - 4);
                        this.textarea.style.width = n + "px";
                        var o = Math.min(this.textarea.scrollHeight, this.canvas.height - this.startPoint.y - 4);
                        this.textarea.style.height = o + "px"
                    }
                }
            }, C.prototype.draw = function() {
                var t = this.canvas.getContext("2d"),
                    A = this.canvas,
                    e = A.width,
                    r = A.height;
                t.clearRect(0, 0, e, r), this.stack.forEach(function(A) {
                    var e = A.cache;
                    t.drawImage(e, 0, 0)
                })
            }, C.prototype.showTextarea = function(A) { this.isShowTextarea = A, this.textarea.style.display = A ? "" : "none", this.textarea.value = "", A && this.updateTextareaWH() }, C.prototype.updateTextareaStatus = function(A) {
                var e = A.size,
                    t = A.color;
                this.textarea.style.fontSize = e + "px", this.textarea.style.color = t, this.textarea.focus(), this.updateTextareaWH()
            }, C.prototype.getStackSize = function() { return this.stack.length }, C.prototype.getCanvas = function() { return this.canvas }, C.prototype.addToBody = function() { this.isAddToBody || (document.body.appendChild(this.canvas), document.body.appendChild(this.textarea), this.isAddToBody = !0) }, C.prototype.removeFromBody = function() { this.isAddToBody && (document.body.removeChild(this.canvas), document.body.removeChild(this.textarea), this.stack = [], this.draw(), this.isAddToBody = !1, this.showTextarea(!1)) }, C.prototype.updateCanvasPosition = function(A, e, t, r) {
                if (0 < this.stack.length) throw Error("stack 不为空，不能改变画布尺寸！");
                this.canvas.style.top = e + "px", this.canvas.style.left = A + "px", this.canvas.width = t, this.canvas.height = r
            }, C.prototype.setPaintType = function(A) { this.paintType = A }, C.prototype.undo = function() { this.stack.pop(), this.draw() }, C.FONT_FAMILY = "Arial", C
        }();
        e.default = r
    }, function(A, e, t) {
        "use strict";
        CanvasRenderingContext2D.prototype.arrow = CanvasRenderingContext2D.prototype.drawArrow = function(A, e, t, r, n) {
            void 0 === n && (n = 3), n < 3 && (n = 3);
            var o = function(A, e, t, r) {
                    var n = t * Math.cos(r),
                        o = t * Math.sin(r);
                    return { x: n += A, y: o += e }
                },
                s = Math.sqrt((r - e) * (r - e) + (t - A) * (t - A)),
                i = Math.asin(Math.abs(r - e) / s);
            t < A && e < r ? i = Math.PI - i : t < A && r < e ? i += Math.PI : A < t && r < e && (i = 2 * Math.PI - i);
            var a = o(A, e, s - 2 * n, i),
                B = a.x,
                c = a.y,
                l = o(B, c, n, i - .5 * Math.PI),
                u = o(B, c, 2 * n, i - .5 * Math.PI),
                Q = o(B, c, n, i + .5 * Math.PI),
                d = o(B, c, 2 * n, i + .5 * Math.PI);
            this.moveTo(A, e), this.lineTo(l.x, l.y), this.lineTo(u.x, u.y), this.lineTo(t, r), this.lineTo(d.x, d.y), this.lineTo(Q.x, Q.y), this.closePath()
        }, CanvasRenderingContext2D.prototype.strokeArrow = function(A, e, t, r, n) { void 0 === n && (n = 3), this.save(), this.beginPath(), this.arrow(A, e, t, r, n), this.stroke(), this.restore() }, CanvasRenderingContext2D.prototype.fillArrow = function(A, e, t, r, n) { void 0 === n && (n = 3), this.save(), this.beginPath(), this.arrow(A, e, t, r, n), this.fill(), this.restore() }
    }, function(A, e, t) {
        "use strict";
        CanvasRenderingContext2D.prototype.multilineText = function(A, e, t, r, n, o) {
            void 0 === n && (n = Number.MAX_VALUE), void 0 === o && (o = 0);
            for (var s = [], i = 0, a = e.split("\n").map(function(A) { return A.match(/([a-zA-Z'"]+|.)/g) || [] }); i < a.length; i++) {
                var B = a[i],
                    c = 0;
                s.push("");
                for (var l = 0, u = B; l < u.length; l++) {
                    var Q = u[l],
                        d = this.measureText(Q);
                    if (d.width > n)
                        for (var w = 0, h = Q; w < h.length; w++) {
                            var g = h[w],
                                U = this.measureText(g);
                            (c += U.width) < n ? s[s.length - 1] += g : (c = U.width, s.push(g))
                        } else(c += d.width) < n ? s[s.length - 1] += Q : " " != Q && (c = d.width, s.push(Q))
                }
            }
            for (var f = this.font.match(/(\d+)px/), C = (f[0], f[1]), F = parseInt(C) + o, E = "fill" == A ? this.fillText.bind(this) : this.strokeText.bind(this), p = 0; p < s.length; p++) { E(s[p], t, r + F * p) }
        }, CanvasRenderingContext2D.prototype.fillMultilineText = function(A, e, t, r, n) { void 0 === r && (r = Number.MAX_VALUE), void 0 === n && (n = 0), this.multilineText("fill", A, e, t, r, n) }, CanvasRenderingContext2D.prototype.strokeMultilineText = function(A, e, t, r, n) { void 0 === r && (r = Number.MAX_VALUE), void 0 === n && (n = 0), this.multilineText("stroke", A, e, t, r, n) }
    }, function(A, e, t) {
        "use strict";
        var i = Object.assign || function(A) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (A[r] = t[r]) } return A },
            a = r(t(15)),
            B = r(t(16)),
            c = t(33);

        function r(A) { return A && A.__esModule ? A : { default: A } }
        var n = function(A, e) {
            var t = e || {},
                r = new B.default("boolean" != typeof t.logging || t.logging);
            r.log("html2canvas $npm_package_version");
            var n = A.ownerDocument;
            if (!n) return Promise.reject("Provided element is not within a Document");
            var o = n.defaultView,
                s = {
                    async: true,
                    allowTaint: !1,
                    backgroundColor: "#ffffff",
                    imageTimeout: 15e3,
                    logging: !0,
                    proxy: 'http://assetp.tgyc.com/',
                    removeContainer: !0,
                    foreignObjectRendering: !1,
                    scale: o.devicePixelRatio || 1,
                    target: new a.default(t.canvas),
                    useCORS: true,
                    windowWidth: o.innerWidth,
                    windowHeight: o.innerHeight,
                    scrollX: o.pageXOffset,
                    scrollY: o.pageYOffset,

                };
            return (0, c.renderElement)(A, i({}, s, t), r)
        };
        n.CanvasRenderer = a.default, A.exports = n
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), e.renderElement = void 0;
        var n = function(A, e) {
                if (Array.isArray(A)) return A;
                if (Symbol.iterator in Object(A)) return function(A, e) {
                    var t = [],
                        r = !0,
                        n = !1,
                        o = void 0;
                    try { for (var s, i = A[Symbol.iterator](); !(r = (s = i.next()).done) && (t.push(s.value), !e || t.length !== e); r = !0); } catch (A) { n = !0, o = A } finally { try {!r && i.return && i.return() } finally { if (n) throw o } }
                    return t
                }(A, e);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            },
            o = (r(t(16)), t(34)),
            C = r(t(56)),
            l = r(t(23)),
            s = r(t(10)),
            F = t(2),
            i = t(59),
            E = t(25),
            a = t(0),
            B = r(a);

        function r(A) { return A && A.__esModule ? A : { default: A } }
        e.renderElement = function e(c, h, g) {
            var U = c.ownerDocument,
                t = new F.Bounds(h.scrollX, h.scrollY, h.windowWidth, h.windowHeight),
                A = U.documentElement ? new B.default(getComputedStyle(U.documentElement).backgroundColor) : a.TRANSPARENT,
                r = U.body ? new B.default(getComputedStyle(U.body).backgroundColor) : a.TRANSPARENT,
                f = c === U.documentElement ? A.isTransparent() ? r.isTransparent() ? h.backgroundColor ? new B.default(h.backgroundColor) : null : r : A : h.backgroundColor ? new B.default(h.backgroundColor) : null;
            return (h.foreignObjectRendering ? s.default.SUPPORT_FOREIGNOBJECT_DRAWING : Promise.resolve(!1)).then(function(A) {
                return A ? (B = new i.DocumentCloner(c, h, g, !0, e)).inlineFonts(U).then(function() { return B.resourceLoader.ready() }).then(function() {
                    var A = new l.default(B.documentElement),
                        e = U.defaultView,
                        t = e.pageXOffset,
                        r = e.pageYOffset,
                        n = "HTML" === c.tagName || "BODY" === c.tagName ? (0, F.parseDocumentSize)(U) : (0, F.parseBounds)(c, t, r),
                        o = n.width,
                        s = n.height,
                        i = n.left,
                        a = n.top;
                    return A.render({ backgroundColor: f, logger: g, scale: h.scale, x: "number" == typeof h.x ? h.x : i, y: "number" == typeof h.y ? h.y : a, width: "number" == typeof h.width ? h.width : Math.ceil(o), height: "number" == typeof h.height ? h.height : Math.ceil(s), windowWidth: h.windowWidth, windowHeight: h.windowHeight, scrollX: h.scrollX, scrollY: h.scrollY })
                }) : (0, i.cloneWindow)(U, t, c, h, g, e).then(function(A) {
                    var e = n(A, 3),
                        u = e[0],
                        Q = e[1],
                        t = e[2];
                    var d = (0, o.NodeParser)(Q, t, g),
                        w = Q.ownerDocument;
                    return f === d.container.style.background.backgroundColor && (d.container.style.background.backgroundColor = a.TRANSPARENT), t.ready().then(function(A) {
                        var e = new E.FontMetrics(w);
                        var t = w.defaultView,
                            r = t.pageXOffset,
                            n = t.pageYOffset,
                            o = "HTML" === Q.tagName || "BODY" === Q.tagName ? (0, F.parseDocumentSize)(U) : (0, F.parseBounds)(Q, r, n),
                            s = o.width,
                            i = o.height,
                            a = o.left,
                            B = o.top,
                            c = { backgroundColor: f, fontMetrics: e, imageStore: A, logger: g, scale: h.scale, x: "number" == typeof h.x ? h.x : a, y: "number" == typeof h.y ? h.y : B, width: "number" == typeof h.width ? h.width : Math.ceil(s), height: "number" == typeof h.height ? h.height : Math.ceil(i) };
                        if (Array.isArray(h.target)) return Promise.all(h.target.map(function(A) { return new C.default(A, c).render(d) }));
                        var l = new C.default(h.target, c).render(d);
                        return !0 === h.removeContainer && u.parentNode && u.parentNode.removeChild(u), l
                    })
                });
                var B
            })
        }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), e.NodeParser = void 0;
        var U = r(t(35)),
            f = r(t(3)),
            C = r(t(9)),
            F = t(21),
            E = t(14),
            p = t(8);

        function r(A) { return A && A.__esModule ? A : { default: A } }
        e.NodeParser = function(A, e, t) {
            var r = 0,
                n = new f.default(A, null, e, r++),
                o = new U.default(n, null, !0);
            return s(A, n, o, e, 1), o
        };
        var H = ["SCRIPT", "HEAD", "TITLE", "OBJECT", "BR", "OPTION"],
            s = function A(e, t, r, n, o) {
                for (var s, i = e.firstChild; i; i = s) {
                    s = i.nextSibling;
                    var a = i.ownerDocument.defaultView;
                    if (i instanceof a.Text || i instanceof Text || a.parent && i instanceof a.parent.Text) 0 < i.data.trim().length && t.childNodes.push(C.default.fromTextNode(i, t));
                    else if (i instanceof a.HTMLElement || i instanceof HTMLElement || a.parent && i instanceof a.parent.HTMLElement) {
                        if (-1 === H.indexOf(i.nodeName)) {
                            var B = new f.default(i, t, n, o++);
                            if (B.isVisible()) {
                                "INPUT" === i.tagName ? (0, F.inlineInputElement)(i, B) : "TEXTAREA" === i.tagName ? (0, F.inlineTextAreaElement)(i, B) : "SELECT" === i.tagName ? (0, F.inlineSelectElement)(i, B) : B.style.listStyle && B.style.listStyle.listStyleType !== p.LIST_STYLE_TYPE.NONE && (0, E.inlineListItemElement)(i, B, n);
                                var c = "TEXTAREA" !== i.tagName,
                                    l = v(B, i);
                                if (l || m(B)) {
                                    var u = l || B.isPositioned() ? r.getRealParentStackingContext() : r,
                                        Q = new U.default(B, u, l);
                                    u.contexts.push(Q), c && A(i, B, Q, n, o)
                                } else r.children.push(B), c && A(i, B, r, n, o)
                            }
                        }
                    } else if (i instanceof a.SVGSVGElement || i instanceof SVGSVGElement || a.parent && i instanceof a.parent.SVGSVGElement) {
                        var d = new f.default(i, t, n, o++),
                            w = v(d, i);
                        if (w || m(d)) {
                            var h = w || d.isPositioned() ? r.getRealParentStackingContext() : r,
                                g = new U.default(d, h, w);
                            h.contexts.push(g)
                        } else r.children.push(d)
                    }
                }
            },
            v = function(A, e) { return A.isRootElement() || A.isPositionedWithZIndex() || A.style.opacity < 1 || A.isTransformed() || n(A, e) },
            m = function(A) { return A.isPositioned() || A.isFloating() },
            n = function(A, e) { return "BODY" === e.nodeName && A.parent instanceof f.default && A.parent.style.background.backgroundColor.isTransparent() }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r, n = function() {
                function r(A, e) {
                    for (var t = 0; t < e.length; t++) {
                        var r = e[t];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
                    }
                }
                return function(A, e, t) { return e && r(A.prototype, e), t && r(A, t), A }
            }(),
            o = t(3);
        (r = o) && r.__esModule, t(19);
        var s = function() {
            function r(A, e, t) {! function(A, e) { if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, r), this.container = A, this.parent = e, this.contexts = [], this.children = [], this.treatAsRealStackingContext = t }
            return n(r, [{ key: "getOpacity", value: function() { return this.parent ? this.container.style.opacity * this.parent.getOpacity() : this.container.style.opacity } }, { key: "getRealParentStackingContext", value: function() { return !this.parent || this.treatAsRealStackingContext ? this : this.parent.getRealParentStackingContext() } }]), r
        }();
        e.default = s
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        e.default = function A(e, t) {! function(A, e) { if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, A), this.width = e, this.height = t }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r, n = function() {
                function r(A, e) {
                    for (var t = 0; t < e.length; t++) {
                        var r = e[t];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
                    }
                }
                return function(A, e, t) { return e && r(A.prototype, e), t && r(A, t), A }
            }(),
            o = t(6),
            s = t(7),
            i = (r = s) && r.__esModule ? r : { default: r };
        var B = function(A, e, t) { return new i.default(A.x + (e.x - A.x) * t, A.y + (e.y - A.y) * t) },
            a = function() {
                function a(A, e, t, r) {! function(A, e) { if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, a), this.type = o.PATH.BEZIER_CURVE, this.start = A, this.startControl = e, this.endControl = t, this.end = r }
                return n(a, [{
                    key: "subdivide",
                    value: function(A, e) {
                        var t = B(this.start, this.startControl, A),
                            r = B(this.startControl, this.endControl, A),
                            n = B(this.endControl, this.end, A),
                            o = B(t, r, A),
                            s = B(r, n, A),
                            i = B(o, s, A);
                        return e ? new a(this.start, t, o, i) : new a(i, s, n, this.end)
                    }
                }, { key: "reverse", value: function() { return new a(this.end, this.endControl, this.startControl, this.start) } }]), a
            }();
        e.default = a
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), e.parseBorderRadius = void 0;
        var r, s = function(A, e) {
                if (Array.isArray(A)) return A;
                if (Symbol.iterator in Object(A)) return function(A, e) {
                    var t = [],
                        r = !0,
                        n = !1,
                        o = void 0;
                    try { for (var s, i = A[Symbol.iterator](); !(r = (s = i.next()).done) && (t.push(s.value), !e || t.length !== e); r = !0); } catch (A) { n = !0, o = A } finally { try {!r && i.return && i.return() } finally { if (n) throw o } }
                    return t
                }(A, e);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            },
            n = t(1),
            i = (r = n) && r.__esModule ? r : { default: r };
        var a = ["top-left", "top-right", "bottom-right", "bottom-left"];
        e.parseBorderRadius = function(o) {
            return a.map(function(A) {
                var e = o.getPropertyValue("border-" + A + "-radius").split(" ").map(i.default.create),
                    t = s(e, 2),
                    r = t[0],
                    n = t[1];
                return void 0 === n ? [r, r] : [r, n]
            })
        }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r = e.DISPLAY = { NONE: 1, BLOCK: 2, INLINE: 4, RUN_IN: 8, FLOW: 16, FLOW_ROOT: 32, TABLE: 64, FLEX: 128, GRID: 256, RUBY: 512, SUBGRID: 1024, LIST_ITEM: 2048, TABLE_ROW_GROUP: 4096, TABLE_HEADER_GROUP: 8192, TABLE_FOOTER_GROUP: 16384, TABLE_ROW: 32768, TABLE_CELL: 65536, TABLE_COLUMN_GROUP: 1 << 17, TABLE_COLUMN: 1 << 18, TABLE_CAPTION: 1 << 19, RUBY_BASE: 1 << 20, RUBY_TEXT: 1 << 21, RUBY_BASE_CONTAINER: 1 << 22, RUBY_TEXT_CONTAINER: 1 << 23, CONTENTS: 1 << 24, INLINE_BLOCK: 1 << 25, INLINE_LIST_ITEM: 1 << 26, INLINE_TABLE: 1 << 27, INLINE_FLEX: 1 << 28, INLINE_GRID: 1 << 29 },
            n = function(A, e) {
                return A | function(A) {
                    switch (A) {
                        case "block":
                            return r.BLOCK;
                        case "inline":
                            return r.INLINE;
                        case "run-in":
                            return r.RUN_IN;
                        case "flow":
                            return r.FLOW;
                        case "flow-root":
                            return r.FLOW_ROOT;
                        case "table":
                            return r.TABLE;
                        case "flex":
                            return r.FLEX;
                        case "grid":
                            return r.GRID;
                        case "ruby":
                            return r.RUBY;
                        case "subgrid":
                            return r.SUBGRID;
                        case "list-item":
                            return r.LIST_ITEM;
                        case "table-row-group":
                            return r.TABLE_ROW_GROUP;
                        case "table-header-group":
                            return r.TABLE_HEADER_GROUP;
                        case "table-footer-group":
                            return r.TABLE_FOOTER_GROUP;
                        case "table-row":
                            return r.TABLE_ROW;
                        case "table-cell":
                            return r.TABLE_CELL;
                        case "table-column-group":
                            return r.TABLE_COLUMN_GROUP;
                        case "table-column":
                            return r.TABLE_COLUMN;
                        case "table-caption":
                            return r.TABLE_CAPTION;
                        case "ruby-base":
                            return r.RUBY_BASE;
                        case "ruby-text":
                            return r.RUBY_TEXT;
                        case "ruby-base-container":
                            return r.RUBY_BASE_CONTAINER;
                        case "ruby-text-container":
                            return r.RUBY_TEXT_CONTAINER;
                        case "contents":
                            return r.CONTENTS;
                        case "inline-block":
                            return r.INLINE_BLOCK;
                        case "inline-list-item":
                            return r.INLINE_LIST_ITEM;
                        case "inline-table":
                            return r.INLINE_TABLE;
                        case "inline-flex":
                            return r.INLINE_FLEX;
                        case "inline-grid":
                            return r.INLINE_GRID
                    }
                    return r.NONE
                }(e)
            };
        e.parseDisplay = function(A) { return A.split(" ").reduce(n, 0) }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r = e.FLOAT = { NONE: 0, LEFT: 1, RIGHT: 2, INLINE_START: 3, INLINE_END: 4 };
        e.parseCSSFloat = function(A) {
            switch (A) {
                case "left":
                    return r.LEFT;
                case "right":
                    return r.RIGHT;
                case "inline-start":
                    return r.INLINE_START;
                case "inline-end":
                    return r.INLINE_END
            }
            return r.NONE
        }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        e.parseFont = function(A) {
            return {
                fontFamily: A.fontFamily,
                fontSize: A.fontSize,
                fontStyle: A.fontStyle,
                fontVariant: A.fontVariant,
                fontWeight: function(A) {
                    switch (A) {
                        case "normal":
                            return 400;
                        case "bold":
                            return 700
                    }
                    var e = parseInt(A, 10);
                    return isNaN(e) ? 400 : e
                }(A.fontWeight)
            }
        }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        e.parseLetterSpacing = function(A) { if ("normal" === A) return 0; var e = parseFloat(A); return isNaN(e) ? 0 : e }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r = e.LINE_BREAK = { NORMAL: "normal", STRICT: "strict" };
        e.parseLineBreak = function(A) {
            switch (A) {
                case "strict":
                    return r.STRICT;
                case "normal":
                default:
                    return r.NORMAL
            }
        }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), e.parseMargin = void 0;
        var r, n = t(1),
            o = (r = n) && r.__esModule ? r : { default: r };
        var s = ["top", "right", "bottom", "left"];
        e.parseMargin = function(e) { return s.map(function(A) { return new o.default(e.getPropertyValue("margin-" + A)) }) }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r = e.OVERFLOW = { VISIBLE: 0, HIDDEN: 1, SCROLL: 2, AUTO: 3 };
        e.parseOverflow = function(A) {
            switch (A) {
                case "hidden":
                    return r.HIDDEN;
                case "scroll":
                    return r.SCROLL;
                case "auto":
                    return r.AUTO;
                case "visible":
                default:
                    return r.VISIBLE
            }
        }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), e.parseTextShadow = void 0;
        var r, n = t(0),
            l = (r = n) && r.__esModule ? r : { default: r };
        var u = /^([+-]|\d|\.)$/i;
        e.parseTextShadow = function(A) {
            if ("none" === A || "string" != typeof A) return null;
            for (var e = "", t = !1, r = [], n = [], o = 0, s = null, i = function() { e.length && (t ? r.push(parseFloat(e)) : s = new l.default(e)), t = !1, e = "" }, a = function() { r.length && null !== s && n.push({ color: s, offsetX: r[0] || 0, offsetY: r[1] || 0, blur: r[2] || 0 }), r.splice(0, r.length), s = null }, B = 0; B < A.length; B++) {
                var c = A[B];
                switch (c) {
                    case "(":
                        e += c, o++;
                        break;
                    case ")":
                        e += c, o--;
                        break;
                    case ",":
                        0 === o ? (i(), a()) : e += c;
                        break;
                    case " ":
                        0 === o ? i() : e += c;
                        break;
                    default:
                        0 === e.length && u.test(c) && (t = !0), e += c
                }
            }
            return i(), a(), 0 === n.length ? null : n
        }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), e.parseTransform = void 0;
        var r, n = t(1),
            o = (r = n) && r.__esModule ? r : { default: r };
        var s = function(A) { return parseFloat(A.trim()) },
            i = /(matrix|matrix3d)\((.+)\)/,
            a = (e.parseTransform = function(A) { var e = B(A.transform || A.webkitTransform || A.mozTransform || A.msTransform || A.oTransform); return null === e ? null : { transform: e, transformOrigin: a(A.transformOrigin || A.webkitTransformOrigin || A.mozTransformOrigin || A.msTransformOrigin || A.oTransformOrigin) } }, function(A) { if ("string" != typeof A) { var e = new o.default("0"); return [e, e] } var t = A.split(" ").map(o.default.create); return [t[0], t[1]] }),
            B = function(A) { if ("none" === A || "string" != typeof A) return null; var e = A.match(i); if (e) { if ("matrix" === e[1]) { var t = e[2].split(",").map(s); return [t[0], t[1], t[2], t[3], t[4], t[5]] } var r = e[2].split(",").map(s); return [r[0], r[1], r[4], r[5], r[12], r[13]] } return null }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r = e.VISIBILITY = { VISIBLE: 0, HIDDEN: 1, COLLAPSE: 2 };
        e.parseVisibility = function(A) {
            switch (A) {
                case "hidden":
                    return r.HIDDEN;
                case "collapse":
                    return r.COLLAPSE;
                case "visible":
                default:
                    return r.VISIBLE
            }
        }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r = e.WORD_BREAK = { NORMAL: "normal", BREAK_ALL: "break-all", KEEP_ALL: "keep-all" };
        e.parseWordBreak = function(A) {
            switch (A) {
                case "break-all":
                    return r.BREAK_ALL;
                case "keep-all":
                    return r.KEEP_ALL;
                case "normal":
                default:
                    return r.NORMAL
            }
        }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        e.parseZIndex = function(A) { var e = "auto" === A; return { auto: e, order: e ? 0 : parseInt(A, 10) } }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r = t(13);
        Object.defineProperty(e, "toCodePoints", { enumerable: !0, get: function() { return r.toCodePoints } }), Object.defineProperty(e, "fromCodePoint", { enumerable: !0, get: function() { return r.fromCodePoint } });
        var n = t(52);
        Object.defineProperty(e, "LineBreaker", { enumerable: !0, get: function() { return n.LineBreaker } })
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), e.LineBreaker = e.inlineBreakOpportunities = e.lineBreakAtIndex = e.codePointsToCharacterClasses = e.UnicodeTrie = e.BREAK_ALLOWED = e.BREAK_NOT_ALLOWED = e.BREAK_MANDATORY = e.classes = e.LETTER_NUMBER_MODIFIER = void 0;
        var r, o = function() {
                function r(A, e) {
                    for (var t = 0; t < e.length; t++) {
                        var r = e[t];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
                    }
                }
                return function(A, e, t) { return e && r(A.prototype, e), t && r(A, t), A }
            }(),
            l = function(A, e) {
                if (Array.isArray(A)) return A;
                if (Symbol.iterator in Object(A)) return function(A, e) {
                    var t = [],
                        r = !0,
                        n = !1,
                        o = void 0;
                    try { for (var s, i = A[Symbol.iterator](); !(r = (s = i.next()).done) && (t.push(s.value), !e || t.length !== e); r = !0); } catch (A) { n = !0, o = A } finally { try {!r && i.return && i.return() } finally { if (n) throw o } }
                    return t
                }(A, e);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            },
            n = t(53),
            s = t(54),
            i = (r = s) && r.__esModule ? r : { default: r },
            u = t(13);
        var a = e.LETTER_NUMBER_MODIFIER = 50,
            g = 10,
            U = 13,
            f = 15,
            C = 17,
            F = 18,
            E = 19,
            p = 20,
            H = 21,
            v = 22,
            m = 24,
            y = 25,
            I = 26,
            T = 27,
            N = 28,
            B = 30,
            b = 32,
            K = 33,
            S = 34,
            L = 35,
            _ = 37,
            M = 38,
            D = 39,
            O = 40,
            c = 42,
            R = (e.classes = { BK: 1, CR: 2, LF: 3, CM: 4, NL: 5, SG: 6, WJ: 7, ZW: 8, GL: 9, SP: g, ZWJ: 11, B2: 12, BA: U, BB: 14, HY: f, CB: 16, CL: C, CP: F, EX: E, IN: p, NS: H, OP: v, QU: 23, IS: m, NU: y, PO: I, PR: T, SY: N, AI: 29, AL: B, CJ: 31, EB: b, EM: K, H2: S, H3: L, HL: 36, ID: _, JL: M, JV: D, JT: O, RI: 41, SA: c, XX: 43 }, e.BREAK_MANDATORY = "!"),
            P = e.BREAK_NOT_ALLOWED = "×",
            x = e.BREAK_ALLOWED = "÷",
            k = e.UnicodeTrie = (0, n.createTrieFromBase64)(i.default),
            z = [B, 36],
            X = [1, 2, 3, 5],
            V = [g, 8],
            G = [T, I],
            Q = X.concat(V),
            J = [M, D, O, S, L],
            Y = [f, U],
            d = e.codePointsToCharacterClasses = function(A) {
                var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "strict",
                    o = [],
                    s = [],
                    i = [];
                return A.forEach(function(A, e) { var t = k.get(A); if (a < t ? (i.push(!0), t -= a) : i.push(!1), -1 !== ["normal", "auto", "loose"].indexOf(n) && -1 !== [8208, 8211, 12316, 12448].indexOf(A)) return s.push(e), o.push(16); if (4 !== t && 11 !== t) return s.push(e), 31 === t ? o.push("strict" === n ? H : _) : t === c ? o.push(B) : 29 === t ? o.push(B) : 43 === t ? 131072 <= A && A <= 196605 || 196608 <= A && A <= 262141 ? o.push(_) : o.push(B) : void o.push(t); if (0 === e) return s.push(e), o.push(B); var r = o[e - 1]; return -1 === Q.indexOf(r) ? (s.push(s[e - 1]), o.push(r)) : (s.push(e), o.push(B)) }), [s, o, i]
            },
            W = function(A, e, t, r) {
                var n = r[t];
                if (Array.isArray(A) ? -1 !== A.indexOf(n) : A === n)
                    for (var o = t; o <= r.length;) { var s = r[++o]; if (s === e) return !0; if (s !== g) break }
                if (n === g)
                    for (var i = t; 0 < i;) {
                        var a = r[--i];
                        if (Array.isArray(A) ? -1 !== A.indexOf(a) : A === a)
                            for (var B = t; B <= r.length;) { var c = r[++B]; if (c === e) return !0; if (c !== g) break }
                        if (a !== g) break
                    }
                return !1
            },
            j = function(A, e) {
                for (var t = A; 0 <= t;) {
                    var r = e[t];
                    if (r !== g) return r;
                    t--
                }
                return 0
            },
            w = function(A, e, t, r, n) {
                if (0 === t[r]) return P;
                var o = r - 1;
                if (Array.isArray(n) && !0 === n[o]) return P;
                var s = o - 1,
                    i = o + 1,
                    a = e[o],
                    B = 0 <= s ? e[s] : 0,
                    c = e[i];
                if (2 === a && 3 === c) return P;
                if (-1 !== X.indexOf(a)) return R;
                if (-1 !== X.indexOf(c)) return P;
                if (-1 !== V.indexOf(c)) return P;
                if (8 === j(o, e)) return x;
                if (11 === k.get(A[o]) && (c === _ || c === b || c === K)) return P;
                if (7 === a || 7 === c) return P;
                if (9 === a) return P;
                if (-1 === [g, U, f].indexOf(a) && 9 === c) return P;
                if (-1 !== [C, F, E, m, N].indexOf(c)) return P;
                if (j(o, e) === v) return P;
                if (W(23, v, o, e)) return P;
                if (W([C, F], H, o, e)) return P;
                if (W(12, 12, o, e)) return P;
                if (a === g) return x;
                if (23 === a || 23 === c) return P;
                if (16 === c || 16 === a) return x;
                if (-1 !== [U, f, H].indexOf(c) || 14 === a) return P;
                if (36 === B && -1 !== Y.indexOf(a)) return P;
                if (a === N && 36 === c) return P;
                if (c === p && -1 !== z.concat(p, E, y, _, b, K).indexOf(a)) return P;
                if (-1 !== z.indexOf(c) && a === y || -1 !== z.indexOf(a) && c === y) return P;
                if (a === T && -1 !== [_, b, K].indexOf(c) || -1 !== [_, b, K].indexOf(a) && c === I) return P;
                if (-1 !== z.indexOf(a) && -1 !== G.indexOf(c) || -1 !== G.indexOf(a) && -1 !== z.indexOf(c)) return P;
                if (-1 !== [T, I].indexOf(a) && (c === y || -1 !== [v, f].indexOf(c) && e[i + 1] === y) || -1 !== [v, f].indexOf(a) && c === y || a === y && -1 !== [y, N, m].indexOf(c)) return P;
                if (-1 !== [y, N, m, C, F].indexOf(c))
                    for (var l = o; 0 <= l;) {
                        var u = e[l];
                        if (u === y) return P;
                        if (-1 === [N, m].indexOf(u)) break;
                        l--
                    }
                if (-1 !== [T, I].indexOf(c))
                    for (var Q = -1 !== [C, F].indexOf(a) ? s : o; 0 <= Q;) {
                        var d = e[Q];
                        if (d === y) return P;
                        if (-1 === [N, m].indexOf(d)) break;
                        Q--
                    }
                if (M === a && -1 !== [M, D, S, L].indexOf(c) || -1 !== [D, S].indexOf(a) && -1 !== [D, O].indexOf(c) || -1 !== [O, L].indexOf(a) && c === O) return P;
                if (-1 !== J.indexOf(a) && -1 !== [p, I].indexOf(c) || -1 !== J.indexOf(c) && a === T) return P;
                if (-1 !== z.indexOf(a) && -1 !== z.indexOf(c)) return P;
                if (a === m && -1 !== z.indexOf(c)) return P;
                if (-1 !== z.concat(y).indexOf(a) && c === v || -1 !== z.concat(y).indexOf(c) && a === F) return P;
                if (41 === a && 41 === c) { for (var w = t[o], h = 1; 0 < w && 41 === e[--w];) h++; if (h % 2 != 0) return P }
                return a === b && c === K ? P : x
            },
            h = (e.lineBreakAtIndex = function(A, e) {
                if (0 === e) return P;
                if (e >= A.length) return R;
                var t = d(A),
                    r = l(t, 2),
                    n = r[0],
                    o = r[1];
                return w(A, o, n, e)
            }, function(t, A) {
                A || (A = { lineBreak: "normal", wordBreak: "normal" });
                var e = d(t, A.lineBreak),
                    r = l(e, 3),
                    n = r[0],
                    o = r[1],
                    s = r[2];
                return "break-all" !== A.wordBreak && "break-word" !== A.wordBreak || (o = o.map(function(A) { return -1 !== [y, B, c].indexOf(A) ? _ : A })), [n, o, "keep-all" === A.wordBreak ? s.map(function(A, e) { return A && 19968 <= t[e] && t[e] <= 40959 }) : null]
            }),
            q = (e.inlineBreakOpportunities = function(A, e) {
                var t = (0, u.toCodePoints)(A),
                    r = P,
                    n = h(t, e),
                    o = l(n, 3),
                    s = o[0],
                    i = o[1],
                    a = o[2];
                return t.forEach(function(A, e) { r += (0, u.fromCodePoint)(A) + (e >= t.length - 1 ? R : w(t, i, s, e + 1, a)) }), r
            }, function() {
                function n(A, e, t, r) {! function(A, e) { if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, n), this._codePoints = A, this.required = e === R, this.start = t, this.end = r }
                return o(n, [{ key: "slice", value: function() { return u.fromCodePoint.apply(void 0, function(A) { if (Array.isArray(A)) { for (var e = 0, t = Array(A.length); e < A.length; e++) t[e] = A[e]; return t } return Array.from(A) }(this._codePoints.slice(this.start, this.end))) } }]), n
            }());
        e.LineBreaker = function(A, e) {
            var t = (0, u.toCodePoints)(A),
                r = h(t, e),
                n = l(r, 3),
                o = n[0],
                s = n[1],
                i = n[2],
                a = t.length,
                B = 0,
                c = 0;
            return { next: function() { if (a <= c) return { done: !0 }; for (var A = P; c < a && (A = w(t, s, o, ++c, i)) === P;); if (A === P && c !== a) return { done: !0 }; var e = new q(t, A, B, c); return B = c, { value: e, done: !1 } } }
        }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), e.Trie = e.createTrieFromBase64 = e.UTRIE2_INDEX_2_MASK = e.UTRIE2_INDEX_2_BLOCK_LENGTH = e.UTRIE2_OMITTED_BMP_INDEX_1_LENGTH = e.UTRIE2_INDEX_1_OFFSET = e.UTRIE2_UTF8_2B_INDEX_2_LENGTH = e.UTRIE2_UTF8_2B_INDEX_2_OFFSET = e.UTRIE2_INDEX_2_BMP_LENGTH = e.UTRIE2_LSCP_INDEX_2_LENGTH = e.UTRIE2_DATA_MASK = e.UTRIE2_DATA_BLOCK_LENGTH = e.UTRIE2_LSCP_INDEX_2_OFFSET = e.UTRIE2_SHIFT_1_2 = e.UTRIE2_INDEX_SHIFT = e.UTRIE2_SHIFT_1 = e.UTRIE2_SHIFT_2 = void 0;
        var r = function() {
                function r(A, e) {
                    for (var t = 0; t < e.length; t++) {
                        var r = e[t];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
                    }
                }
                return function(A, e, t) { return e && r(A.prototype, e), t && r(A, t), A }
            }(),
            s = t(13);
        var n = e.UTRIE2_SHIFT_2 = 5,
            o = e.UTRIE2_SHIFT_1 = 11,
            i = e.UTRIE2_INDEX_SHIFT = 2,
            a = e.UTRIE2_SHIFT_1_2 = o - n,
            B = e.UTRIE2_LSCP_INDEX_2_OFFSET = 65536 >> n,
            c = e.UTRIE2_DATA_BLOCK_LENGTH = 1 << n,
            l = e.UTRIE2_DATA_MASK = c - 1,
            u = e.UTRIE2_LSCP_INDEX_2_LENGTH = 1024 >> n,
            Q = e.UTRIE2_INDEX_2_BMP_LENGTH = B + u,
            d = e.UTRIE2_UTF8_2B_INDEX_2_OFFSET = Q,
            w = e.UTRIE2_UTF8_2B_INDEX_2_LENGTH = 32,
            h = e.UTRIE2_INDEX_1_OFFSET = d + w,
            g = e.UTRIE2_OMITTED_BMP_INDEX_1_LENGTH = 65536 >> o,
            U = e.UTRIE2_INDEX_2_BLOCK_LENGTH = 1 << a,
            f = e.UTRIE2_INDEX_2_MASK = U - 1,
            C = (e.createTrieFromBase64 = function(A) {
                var e = (0, s.decode)(A),
                    t = Array.isArray(e) ? (0, s.polyUint32Array)(e) : new Uint32Array(e),
                    r = Array.isArray(e) ? (0, s.polyUint16Array)(e) : new Uint16Array(e),
                    n = r.slice(12, t[4] / 2),
                    o = 2 === t[5] ? r.slice((24 + t[4]) / 2) : t.slice(Math.ceil((24 + t[4]) / 4));
                return new C(t[0], t[1], t[2], t[3], n, o)
            }, e.Trie = function() {
                function s(A, e, t, r, n, o) {! function(A, e) { if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, s), this.initialValue = A, this.errorValue = e, this.highStart = t, this.highValueIndex = r, this.index = n, this.data = o }
                return r(s, [{ key: "get", value: function(A) { var e = void 0; if (0 <= A) { if (A < 55296 || 56319 < A && A <= 65535) return e = ((e = this.index[A >> n]) << i) + (A & l), this.data[e]; if (A <= 65535) return e = ((e = this.index[B + (A - 55296 >> n)]) << i) + (A & l), this.data[e]; if (A < this.highStart) return e = h - g + (A >> o), e = this.index[e], e += A >> n & f, e = ((e = this.index[e]) << i) + (A & l), this.data[e]; if (A <= 1114111) return this.data[this.highValueIndex] } return this.errorValue } }]), s
            }())
    }, function(A, e, t) {
        "use strict";
        A.exports = "KwAAAAAAAAAACA4AIDoAAPAfAAACAAAAAAAIABAAGABAAEgAUABYAF4AZgBeAGYAYABoAHAAeABeAGYAfACEAIAAiACQAJgAoACoAK0AtQC9AMUAXgBmAF4AZgBeAGYAzQDVAF4AZgDRANkA3gDmAOwA9AD8AAQBDAEUARoBIgGAAIgAJwEvATcBPwFFAU0BTAFUAVwBZAFsAXMBewGDATAAiwGTAZsBogGkAawBtAG8AcIBygHSAdoB4AHoAfAB+AH+AQYCDgIWAv4BHgImAi4CNgI+AkUCTQJTAlsCYwJrAnECeQKBAk0CiQKRApkCoQKoArACuALAAsQCzAIwANQC3ALkAjAA7AL0AvwCAQMJAxADGAMwACADJgMuAzYDPgOAAEYDSgNSA1IDUgNaA1oDYANiA2IDgACAAGoDgAByA3YDfgOAAIQDgACKA5IDmgOAAIAAogOqA4AAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAK8DtwOAAIAAvwPHA88D1wPfAyAD5wPsA/QD/AOAAIAABAQMBBIEgAAWBB4EJgQuBDMEIAM7BEEEXgBJBCADUQRZBGEEaQQwADAAcQQ+AXkEgQSJBJEEgACYBIAAoASoBK8EtwQwAL8ExQSAAIAAgACAAIAAgACgAM0EXgBeAF4AXgBeAF4AXgBeANUEXgDZBOEEXgDpBPEE+QQBBQkFEQUZBSEFKQUxBTUFPQVFBUwFVAVcBV4AYwVeAGsFcwV7BYMFiwWSBV4AmgWgBacFXgBeAF4AXgBeAKsFXgCyBbEFugW7BcIFwgXIBcIFwgXQBdQF3AXkBesF8wX7BQMGCwYTBhsGIwYrBjMGOwZeAD8GRwZNBl4AVAZbBl4AXgBeAF4AXgBeAF4AXgBeAF4AXgBeAGMGXgBqBnEGXgBeAF4AXgBeAF4AXgBeAF4AXgB5BoAG4wSGBo4GkwaAAIADHgR5AF4AXgBeAJsGgABGA4AAowarBrMGswagALsGwwbLBjAA0wbaBtoG3QbaBtoG2gbaBtoG2gblBusG8wb7BgMHCwcTBxsHCwcjBysHMAc1BzUHOgdCB9oGSgdSB1oHYAfaBloHaAfaBlIH2gbaBtoG2gbaBtoG2gbaBjUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHbQdeAF4ANQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQd1B30HNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B4MH2gaKB68EgACAAIAAgACAAIAAgACAAI8HlwdeAJ8HpweAAIAArwe3B14AXgC/B8UHygcwANAH2AfgB4AA6AfwBz4B+AcACFwBCAgPCBcIogEYAR8IJwiAAC8INwg/CCADRwhPCFcIXwhnCEoDGgSAAIAAgABvCHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIhAiLCI4IMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAANQc1BzUHNQc1BzUHNQc1BzUHNQc1B54INQc1B6II2gaqCLIIugiAAIAAvgjGCIAAgACAAIAAgACAAIAAgACAAIAAywiHAYAA0wiAANkI3QjlCO0I9Aj8CIAAgACAAAIJCgkSCRoJIgknCTYHLwk3CZYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiAAIAAAAFAAXgBeAGAAcABeAHwAQACQAKAArQC9AJ4AXgBeAE0A3gBRAN4A7AD8AMwBGgEAAKcBNwEFAUwBXAF4QkhCmEKnArcCgAHHAsABz4LAAcABwAHAAd+C6ABoAG+C/4LAAcABwAHAAc+DF4MAAcAB54M3gweDV4Nng3eDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEeDqABVg6WDqABoQ6gAaABoAHXDvcONw/3DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DncPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB7cPPwlGCU4JMACAAIAAgABWCV4JYQmAAGkJcAl4CXwJgAkwADAAMAAwAIgJgACLCZMJgACZCZ8JowmrCYAAswkwAF4AXgB8AIAAuwkABMMJyQmAAM4JgADVCTAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAqwYWBNkIMAAwADAAMADdCeAJ6AnuCR4E9gkwAP4JBQoNCjAAMACAABUK0wiAAB0KJAosCjQKgAAwADwKQwqAAEsKvQmdCVMKWwowADAAgACAALcEMACAAGMKgABrCjAAMAAwADAAMAAwADAAMAAwADAAMAAeBDAAMAAwADAAMAAwADAAMAAwADAAMAAwAIkEPQFzCnoKiQSCCooKkAqJBJgKoAqkCokEGAGsCrQKvArBCjAAMADJCtEKFQHZCuEK/gHpCvEKMAAwADAAMACAAIwE+QowAIAAPwEBCzAAMAAwADAAMACAAAkLEQswAIAAPwEZCyELgAAOCCkLMAAxCzkLMAAwADAAMAAwADAAXgBeAEELMAAwADAAMAAwADAAMAAwAEkLTQtVC4AAXAtkC4AAiQkwADAAMAAwADAAMAAwADAAbAtxC3kLgAuFC4sLMAAwAJMLlwufCzAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAApwswADAAMACAAIAAgACvC4AAgACAAIAAgACAALcLMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAvwuAAMcLgACAAIAAgACAAIAAyguAAIAAgACAAIAA0QswADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAANkLgACAAIAA4AswADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACJCR4E6AswADAAhwHwC4AA+AsADAgMEAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMACAAIAAGAwdDCUMMAAwAC0MNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQw1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHPQwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADUHNQc1BzUHNQc1BzUHNQc2BzAAMAA5DDUHNQc1BzUHNQc1BzUHNQc1BzUHNQdFDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAATQxSDFoMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAF4AXgBeAF4AXgBeAF4AYgxeAGoMXgBxDHkMfwxeAIUMXgBeAI0MMAAwADAAMAAwAF4AXgCVDJ0MMAAwADAAMABeAF4ApQxeAKsMswy7DF4Awgy9DMoMXgBeAF4AXgBeAF4AXgBeAF4AXgDRDNkMeQBqCeAM3Ax8AOYM7Az0DPgMXgBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgCgAAANoAAHDQ4NFg0wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAeDSYNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAC4NMABeAF4ANg0wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAD4NRg1ODVYNXg1mDTAAbQ0wADAAMAAwADAAMAAwADAA2gbaBtoG2gbaBtoG2gbaBnUNeg3CBYANwgWFDdoGjA3aBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gaUDZwNpA2oDdoG2gawDbcNvw3HDdoG2gbPDdYN3A3fDeYN2gbsDfMN2gbaBvoN/g3aBgYODg7aBl4AXgBeABYOXgBeACUG2gYeDl4AJA5eACwO2w3aBtoGMQ45DtoG2gbaBtoGQQ7aBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gZJDjUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B1EO2gY1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQdZDjUHNQc1BzUHNQc1B2EONQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHaA41BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B3AO2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gY1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B2EO2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gZJDtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBkkOeA6gAKAAoAAwADAAMAAwAKAAoACgAKAAoACgAKAAgA4wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAD//wQABAAEAAQABAAEAAQABAAEAA0AAwABAAEAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAKABMAFwAeABsAGgAeABcAFgASAB4AGwAYAA8AGAAcAEsASwBLAEsASwBLAEsASwBLAEsAGAAYAB4AHgAeABMAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAFgAbABIAHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYADQARAB4ABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkAFgAaABsAGwAbAB4AHQAdAB4ATwAXAB4ADQAeAB4AGgAbAE8ATwAOAFAAHQAdAB0ATwBPABcATwBPAE8AFgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwArAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAAQABAANAA0ASwBLAEsASwBLAEsASwBLAEsASwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUAArACsABABQAAQABAAEAAQABAAEAAQAKwArAAQABAArACsABAAEAAQAUAArACsAKwArACsAKwArACsABAArACsAKwArAFAAUAArAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAGgAaAFAAUABQAFAAUABMAB4AGwBQAB4AKwArACsABAAEAAQAKwBQAFAAUABQAFAAUAArACsAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUAArAFAAUAArACsABAArAAQABAAEAAQABAArACsAKwArAAQABAArACsABAAEAAQAKwArACsABAArACsAKwArACsAKwArAFAAUABQAFAAKwBQACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwAEAAQAUABQAFAABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUAArACsABABQAAQABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQAKwArAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwAeABsAKwArACsAKwArACsAKwBQAAQABAAEAAQABAAEACsABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwArAAQABAArACsABAAEAAQAKwArACsAKwArACsAKwArAAQABAArACsAKwArAFAAUAArAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwAeAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwAEAFAAKwBQAFAAUABQAFAAUAArACsAKwBQAFAAUAArAFAAUABQAFAAKwArACsAUABQACsAUAArAFAAUAArACsAKwBQAFAAKwArACsAUABQAFAAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQAKwArACsABAAEAAQAKwAEAAQABAAEACsAKwBQACsAKwArACsAKwArAAQAKwArACsAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAB4AHgAeAB4AHgAeABsAHgArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABAArACsAKwArACsAKwArAAQABAArAFAAUABQACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAB4AUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABAArACsAKwArACsAKwArAAQABAArACsAKwArACsAKwArAFAAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwArAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAKwBcAFwAKwBcACsAKwBcACsAKwArACsAKwArAFwAXABcAFwAKwBcAFwAXABcAFwAXABcACsAXABcAFwAKwBcACsAXAArACsAXABcACsAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgArACoAKgBcACsAKwBcAFwAXABcAFwAKwBcACsAKgAqACoAKgAqACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAFwAXABcAFwAUAAOAA4ADgAOAB4ADgAOAAkADgAOAA0ACQATABMAEwATABMACQAeABMAHgAeAB4ABAAEAB4AHgAeAB4AHgAeAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUAANAAQAHgAEAB4ABAAWABEAFgARAAQABABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAAQABAAEAAQABAANAAQABABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsADQANAB4AHgAeAB4AHgAeAAQAHgAeAB4AHgAeAB4AKwAeAB4ADgAOAA0ADgAeAB4AHgAeAB4ACQAJACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgAeAB4AHgBcAFwAXABcAFwAXAAqACoAKgAqAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAKgAqACoAKgAqACoAKgBcAFwAXAAqACoAKgAqAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAXAAqAEsASwBLAEsASwBLAEsASwBLAEsAKgAqACoAKgAqACoAUABQAFAAUABQAFAAKwBQACsAKwArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQACsAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwAEAAQABAAeAA0AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAEQArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAADQANAA0AUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAA0ADQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoADQANABUAXAANAB4ADQAbAFwAKgArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAB4AHgATABMADQANAA4AHgATABMAHgAEAAQABAAJACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAUABQAFAAUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwAeACsAKwArABMAEwBLAEsASwBLAEsASwBLAEsASwBLAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwBcAFwAXABcAFwAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcACsAKwArACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwAeAB4AXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgArACsABABLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKgAqACoAKgAqACoAKgBcACoAKgAqACoAKgAqACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAUABQAFAAUABQAFAAUAArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4ADQANAA0ADQAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAHgAeAB4AHgBQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwANAA0ADQANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwBQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsABAAEAAQAHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAABABQAFAAUABQAAQABAAEAFAAUAAEAAQABAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAKwBQACsAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAKwArAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAKwAeAB4AHgAeAB4AHgAeAA4AHgArAA0ADQANAA0ADQANAA0ACQANAA0ADQAIAAQACwAEAAQADQAJAA0ADQAMAB0AHQAeABcAFwAWABcAFwAXABYAFwAdAB0AHgAeABQAFAAUAA0AAQABAAQABAAEAAQABAAJABoAGgAaABoAGgAaABoAGgAeABcAFwAdABUAFQAeAB4AHgAeAB4AHgAYABYAEQAVABUAFQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgANAB4ADQANAA0ADQAeAA0ADQANAAcAHgAeAB4AHgArAAQABAAEAAQABAAEAAQABAAEAAQAUABQACsAKwBPAFAAUABQAFAAUAAeAB4AHgAWABEATwBQAE8ATwBPAE8AUABQAFAAUABQAB4AHgAeABYAEQArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAGwAbABsAGwAbABsAGwAaABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAaABsAGwAbABsAGgAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgBQABoAHgAdAB4AUAAeABoAHgAeAB4AHgAeAB4AHgAeAB4ATwAeAFAAGwAeAB4AUABQAFAAUABQAB4AHgAeAB0AHQAeAFAAHgBQAB4AUAAeAFAATwBQAFAAHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AUABQAFAAUABPAE8AUABQAFAAUABQAE8AUABQAE8AUABPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAE8ATwBPAE8ATwBPAE8ATwBPAE8AUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAATwAeAB4AKwArACsAKwAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB0AHQAeAB4AHgAdAB0AHgAeAB0AHgAeAB4AHQAeAB0AGwAbAB4AHQAeAB4AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB0AHgAdAB4AHQAdAB0AHQAdAB0AHgAdAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAdAB0AHQAdAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAlACUAHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB0AHQAeAB4AHgAeAB0AHQAdAB4AHgAdAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB0AHQAeAB4AHQAeAB4AHgAeAB0AHQAeAB4AHgAeACUAJQAdAB0AJQAeACUAJQAlACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAHgAeAB4AHgAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHQAdAB0AHgAdACUAHQAdAB4AHQAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHQAdAB0AHQAlAB4AJQAlACUAHQAlACUAHQAdAB0AJQAlAB0AHQAlAB0AHQAlACUAJQAeAB0AHgAeAB4AHgAdAB0AJQAdAB0AHQAdAB0AHQAlACUAJQAlACUAHQAlACUAIAAlAB0AHQAlACUAJQAlACUAJQAlACUAHgAeAB4AJQAlACAAIAAgACAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeABcAFwAXABcAFwAXAB4AEwATACUAHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwArACUAJQBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAKwArACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAE8ATwBPAE8ATwBPAE8ATwAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeACsAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUAArACsAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQBQAFAAUABQACsAKwArACsAUABQAFAAUABQAFAAUABQAA0AUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQACsAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgBQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAABAAEAAQAKwAEAAQAKwArACsAKwArAAQABAAEAAQAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsABAAEAAQAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsADQANAA0ADQANAA0ADQANAB4AKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AUABQAFAAUABQAFAAUABQAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAUABQAFAAUABQAA0ADQANAA0ADQANABQAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwANAA0ADQANAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAeAAQABAAEAB4AKwArAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLACsADQArAB4AKwArAAQABAAEAAQAUABQAB4AUAArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwAEAAQABAAEAAQABAAEAAQABAAOAA0ADQATABMAHgAeAB4ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0AUABQAFAAUAAEAAQAKwArAAQADQANAB4AUAArACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXABcAA0ADQANACoASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUAArACsAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANACsADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEcARwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQACsAKwAeAAQABAANAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAEAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUAArACsAUAArACsAUABQACsAKwBQAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AKwArAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAeAB4ADQANAA0ADQAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAArAAQABAArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAEAAQABAAEAAQABAAEACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAFgAWAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAKwBQACsAKwArACsAKwArAFAAKwArACsAKwBQACsAUAArAFAAKwBQAFAAUAArAFAAUAArAFAAKwArAFAAKwBQACsAUAArAFAAKwBQACsAUABQACsAUAArACsAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAUABQAFAAUAArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUAArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAlACUAJQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeACUAJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeACUAJQAlACUAJQAeACUAJQAlACUAJQAgACAAIAAlACUAIAAlACUAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIQAhACEAIQAhACUAJQAgACAAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACAAIAAlACUAJQAlACAAJQAgACAAIAAgACAAIAAgACAAIAAlACUAJQAgACUAJQAlACUAIAAgACAAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeACUAHgAlAB4AJQAlACUAJQAlACAAJQAlACUAJQAeACUAHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAIAAgACAAJQAlACUAIAAgACAAIAAgAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFwAXABcAFQAVABUAHgAeAB4AHgAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACAAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAlACAAIAAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsA"
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var n = t(6);
        e.default = function A(e, t, r) {! function(A, e) { if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, A), this.type = n.PATH.CIRCLE, this.x = e, this.y = t, this.radius = r }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r, u = function(A, e) {
                if (Array.isArray(A)) return A;
                if (Symbol.iterator in Object(A)) return function(A, e) {
                    var t = [],
                        r = !0,
                        n = !1,
                        o = void 0;
                    try { for (var s, i = A[Symbol.iterator](); !(r = (s = i.next()).done) && (t.push(s.value), !e || t.length !== e); r = !0); } catch (A) { n = !0, o = A } finally { try {!r && i.return && i.return() } finally { if (n) throw o } }
                    return t
                }(A, e);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            },
            n = function() {
                function r(A, e) {
                    for (var t = 0; t < e.length; t++) {
                        var r = e[t];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
                    }
                }
                return function(A, e, t) { return e && r(A.prototype, e), t && r(A, t), A }
            }(),
            i = t(2),
            a = (t(25), t(57)),
            o = t(9),
            s = (r = o) && r.__esModule ? r : { default: r },
            B = t(5),
            c = t(12);
        var l = function() {
            function t(A, e) {! function(A, e) { if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, t), this.target = A, this.options = e, A.render(e) }
            return n(t, [{ key: "renderNode", value: function(A) { A.isVisible() && (this.renderNodeBackgroundAndBorders(A), this.renderNodeContent(A)) } }, {
                key: "renderNodeContent",
                value: function(n) {
                    var o = this,
                        A = function() {
                            if (n.childNodes.length && n.childNodes.forEach(function(A) {
                                    if (A instanceof s.default) {
                                        var e = A.parent.style;
                                        o.target.renderTextNode(A.bounds, e.color, e.font, e.textDecoration, e.textShadow)
                                    } else o.target.drawShape(A, n.style.color)
                                }), n.image) {
                                var A = o.options.imageStore.get(n.image);
                                if (A) {
                                    var e = (0, i.calculateContentBox)(n.bounds, n.style.padding, n.style.border),
                                        t = "number" == typeof A.width && 0 < A.width ? A.width : e.width,
                                        r = "number" == typeof A.height && 0 < A.height ? A.height : e.height;
                                    0 < t && 0 < r && o.target.clip([(0, i.calculatePaddingBoxPath)(n.curvedBounds)], function() { o.target.drawImage(A, new i.Bounds(0, 0, t, r), e) })
                                }
                            }
                        },
                        e = n.getClipPaths();
                    e.length ? this.target.clip(e, A) : A()
                }
            }, {
                key: "renderNodeBackgroundAndBorders",
                value: function(t) {
                    var r = this,
                        e = !t.style.background.backgroundColor.isTransparent() || t.style.background.backgroundImage.length,
                        A = t.style.border.some(function(A) { return A.borderStyle !== c.BORDER_STYLE.NONE && !A.borderColor.isTransparent() }),
                        n = function() {
                            var A = (0, B.calculateBackgroungPaintingArea)(t.curvedBounds, t.style.background.backgroundClip);
                            e && r.target.clip([A], function() { t.style.background.backgroundColor.isTransparent() || r.target.fill(t.style.background.backgroundColor), r.renderBackgroundImage(t) }), t.style.border.forEach(function(A, e) { A.borderStyle === c.BORDER_STYLE.NONE || A.borderColor.isTransparent() || r.renderBorder(A, e, t.curvedBounds) })
                        };
                    if (e || A) {
                        var o = t.parent ? t.parent.getClipPaths() : [];
                        o.length ? this.target.clip(o, n) : n()
                    }
                }
            }, {
                key: "renderBackgroundImage",
                value: function(e) {
                    var t = this;
                    e.style.background.backgroundImage.slice(0).reverse().forEach(function(A) { "url" === A.source.method && A.source.args.length ? t.renderBackgroundRepeat(e, A) : /gradient/i.test(A.source.method) && t.renderBackgroundGradient(e, A) })
                }
            }, {
                key: "renderBackgroundRepeat",
                value: function(A, e) {
                    var t = this.options.imageStore.get(e.source.args[0]);
                    if (t) {
                        var r = (0, B.calculateBackgroungPositioningArea)(A.style.background.backgroundOrigin, A.bounds, A.style.padding, A.style.border),
                            n = (0, B.calculateBackgroundSize)(e, t, r),
                            o = (0, B.calculateBackgroundPosition)(e.position, n, r),
                            s = (0, B.calculateBackgroundRepeatPath)(e, o, n, r, A.bounds),
                            i = Math.round(r.left + o.x),
                            a = Math.round(r.top + o.y);
                        this.target.renderRepeat(s, t, n, i, a)
                    }
                }
            }, {
                key: "renderBackgroundGradient",
                value: function(A, e) {
                    var t = (0, B.calculateBackgroungPositioningArea)(A.style.background.backgroundOrigin, A.bounds, A.style.padding, A.style.border),
                        r = (0, B.calculateGradientBackgroundSize)(e, t),
                        n = (0, B.calculateBackgroundPosition)(e.position, r, t),
                        o = new i.Bounds(Math.round(t.left + n.x), Math.round(t.top + n.y), r.width, r.height),
                        s = (0, a.parseGradient)(A, e.source, o);
                    if (s) switch (s.type) {
                        case a.GRADIENT_TYPE.LINEAR_GRADIENT:
                            this.target.renderLinearGradient(o, s);
                            break;
                        case a.GRADIENT_TYPE.RADIAL_GRADIENT:
                            this.target.renderRadialGradient(o, s)
                    }
                }
            }, { key: "renderBorder", value: function(A, e, t) { this.target.drawShape((0, i.parsePathForBorder)(t, e), A.borderColor) } }, {
                key: "renderStack",
                value: function(A) {
                    var e = this;
                    if (A.container.isVisible()) {
                        var t = A.getOpacity();
                        t !== this._opacity && (this.target.setOpacity(A.getOpacity()), this._opacity = t);
                        var r = A.container.style.transform;
                        null !== r ? this.target.transform(A.container.bounds.left + r.transformOrigin[0].value, A.container.bounds.top + r.transformOrigin[1].value, r.transform, function() { return e.renderStackContent(A) }) : this.renderStackContent(A)
                    }
                }
            }, {
                key: "renderStackContent",
                value: function(A) {
                    var e = d(A),
                        t = u(e, 5),
                        r = t[0],
                        n = t[1],
                        o = t[2],
                        s = t[3],
                        i = t[4],
                        a = Q(A),
                        B = u(a, 2),
                        c = B[0],
                        l = B[1];
                    this.renderNodeBackgroundAndBorders(A.container), r.sort(w).forEach(this.renderStack, this), this.renderNodeContent(A.container), l.forEach(this.renderNode, this), s.forEach(this.renderStack, this), i.forEach(this.renderStack, this), c.forEach(this.renderNode, this), n.forEach(this.renderStack, this), o.sort(w).forEach(this.renderStack, this)
                }
            }, { key: "render", value: function(A) { return this.options.backgroundColor && this.target.rectangle(this.options.x, this.options.y, this.options.width, this.options.height, this.options.backgroundColor), this.renderStack(A), this.target.getTarget() } }]), t
        }();
        e.default = l;
        var Q = function(A) {
                for (var e = [], t = [], r = A.children.length, n = 0; n < r; n++) {
                    var o = A.children[n];
                    o.isInlineLevel() ? e.push(o) : t.push(o)
                }
                return [e, t]
            },
            d = function(A) {
                for (var e = [], t = [], r = [], n = [], o = [], s = A.contexts.length, i = 0; i < s; i++) {
                    var a = A.contexts[i];
                    a.container.isPositioned() || a.container.style.opacity < 1 || a.container.isTransformed() ? a.container.style.zIndex.order < 0 ? e.push(a) : 0 < a.container.style.zIndex.order ? r.push(a) : t.push(a) : a.container.isFloating() ? n.push(a) : o.push(a)
                }
                return [e, t, r, n, o]
            },
            w = function(A, e) { return A.container.style.zIndex.order > e.container.style.zIndex.order ? 1 : A.container.style.zIndex.order < e.container.style.zIndex.order ? -1 : A.container.index > e.container.index ? 1 : -1 }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), e.transformWebkitRadialGradientArgs = e.parseGradient = e.RadialGradient = e.LinearGradient = e.RADIAL_GRADIENT_SHAPE = e.GRADIENT_TYPE = void 0;
        var i = function(A, e) {
                if (Array.isArray(A)) return A;
                if (Symbol.iterator in Object(A)) return function(A, e) {
                    var t = [],
                        r = !0,
                        n = !1,
                        o = void 0;
                    try { for (var s, i = A[Symbol.iterator](); !(r = (s = i.next()).done) && (t.push(s.value), !e || t.length !== e); r = !0); } catch (A) { n = !0, o = A } finally { try {!r && i.return && i.return() } finally { if (n) throw o } }
                    return t
                }(A, e);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            },
            B = (r(t(3)), t(58)),
            g = r(t(0)),
            c = t(1),
            U = r(c),
            Q = t(4);

        function r(A) { return A && A.__esModule ? A : { default: A } }

        function o(A, e) { if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function") }
        var l = /^(to )?(left|top|right|bottom)( (left|top|right|bottom))?$/i,
            u = /^([+-]?\d*\.?\d+)% ([+-]?\d*\.?\d+)%$/i,
            f = /(px)|%|( 0)$/i,
            n = /^(from|to|color-stop)\((?:([\d.]+)(%)?,\s*)?(.+?)\)$/i,
            d = /^\s*(circle|ellipse)?\s*((?:([\d.]+)(px|r?em|%)\s*(?:([\d.]+)(px|r?em|%))?)|closest-side|closest-corner|farthest-side|farthest-corner)?\s*(?:at\s*(?:(left|center|right)|([\d.]+)(px|r?em|%))\s+(?:(top|center|bottom)|([\d.]+)(px|r?em|%)))?(?:\s|$)/i,
            s = e.GRADIENT_TYPE = { LINEAR_GRADIENT: 0, RADIAL_GRADIENT: 1 },
            w = e.RADIAL_GRADIENT_SHAPE = { CIRCLE: 0, ELLIPSE: 1 },
            h = { left: new U.default("0%"), top: new U.default("0%"), center: new U.default("50%"), right: new U.default("100%"), bottom: new U.default("100%") },
            C = e.LinearGradient = function A(e, t) { o(this, A), this.type = s.LINEAR_GRADIENT, this.colorStops = e, this.direction = t },
            F = e.RadialGradient = function A(e, t, r, n) { o(this, A), this.type = s.RADIAL_GRADIENT, this.colorStops = e, this.shape = t, this.center = r, this.radius = n },
            E = (e.parseGradient = function(A, e, t) {
                var r = e.args,
                    n = e.method,
                    o = e.prefix;
                return "linear-gradient" === n ? a(r, t, !!o) : "gradient" === n && "linear" === r[0] ? a(["to bottom"].concat(b(r.slice(3))), t, !!o) : "radial-gradient" === n ? p(A, "-webkit-" === o ? N(r) : r, t) : "gradient" === n && "radial" === r[0] ? p(A, b(N(r.slice(1))), t) : void 0
            }, function(A, e, r) {
                for (var t = [], n = e; n < A.length; n++) {
                    var o = A[n],
                        s = f.test(o),
                        i = o.lastIndexOf(" "),
                        a = new g.default(s ? o.substring(0, i) : o),
                        B = s ? new U.default(o.substring(i + 1)) : n === e ? new U.default("0%") : n === A.length - 1 ? new U.default("100%") : null;
                    t.push({ color: a, stop: B })
                }
                for (var c = t.map(function(A) {
                        var e = A.color,
                            t = A.stop;
                        return { color: e, stop: 0 === r ? 0 : t ? t.getAbsoluteValue(r) / r : null }
                    }), l = c[0].stop, u = 0; u < c.length; u++)
                    if (null !== l) { var Q = c[u].stop; if (null === Q) { for (var d = u; null === c[d].stop;) d++; for (var w = d - u + 1, h = (c[d].stop - l) / w; u < d; u++) l = c[u].stop = l + h } else l = Q }
                return c
            }),
            a = function(A, e, t) {
                var r = (0, B.parseAngle)(A[0]),
                    n = l.test(A[0]),
                    o = n || null !== r || u.test(A[0]),
                    s = o ? null !== r ? H(t ? r - .5 * Math.PI : r, e) : n ? m(A[0], e) : y(A[0], e) : H(Math.PI, e),
                    i = o ? 1 : 0,
                    a = Math.min((0, Q.distance)(Math.abs(s.x0) + Math.abs(s.x1), Math.abs(s.y0) + Math.abs(s.y1)), 2 * e.width, 2 * e.height);
                return new C(E(A, i, a), s)
            },
            p = function(A, e, t) {
                var r = e[0].match(d),
                    n = r && ("circle" === r[1] || void 0 !== r[3] && void 0 === r[5]) ? w.CIRCLE : w.ELLIPSE,
                    o = {},
                    s = {};
                r && (void 0 !== r[3] && (o.x = (0, c.calculateLengthFromValueWithUnit)(A, r[3], r[4]).getAbsoluteValue(t.width)), void 0 !== r[5] && (o.y = (0, c.calculateLengthFromValueWithUnit)(A, r[5], r[6]).getAbsoluteValue(t.height)), r[7] ? s.x = h[r[7].toLowerCase()] : void 0 !== r[8] && (s.x = (0, c.calculateLengthFromValueWithUnit)(A, r[8], r[9])), r[10] ? s.y = h[r[10].toLowerCase()] : void 0 !== r[11] && (s.y = (0, c.calculateLengthFromValueWithUnit)(A, r[11], r[12])));
                var i = { x: void 0 === s.x ? t.width / 2 : s.x.getAbsoluteValue(t.width), y: void 0 === s.y ? t.height / 2 : s.y.getAbsoluteValue(t.height) },
                    a = T(r && r[2] || "farthest-corner", n, i, o, t);
                return new F(E(e, r ? 1 : 0, Math.min(a.x, a.y)), n, i, a)
            },
            H = function(A, e) {
                var t = e.width,
                    r = e.height,
                    n = .5 * t,
                    o = .5 * r,
                    s = (Math.abs(t * Math.sin(A)) + Math.abs(r * Math.cos(A))) / 2,
                    i = n + Math.sin(A) * s,
                    a = o - Math.cos(A) * s;
                return { x0: i, x1: t - i, y0: a, y1: r - a }
            },
            v = function(A) { return Math.acos(A.width / 2 / ((0, Q.distance)(A.width, A.height) / 2)) },
            m = function(A, e) {
                switch (A) {
                    case "bottom":
                    case "to top":
                        return H(0, e);
                    case "left":
                    case "to right":
                        return H(Math.PI / 2, e);
                    case "right":
                    case "to left":
                        return H(3 * Math.PI / 2, e);
                    case "top right":
                    case "right top":
                    case "to bottom left":
                    case "to left bottom":
                        return H(Math.PI + v(e), e);
                    case "top left":
                    case "left top":
                    case "to bottom right":
                    case "to right bottom":
                        return H(Math.PI - v(e), e);
                    case "bottom left":
                    case "left bottom":
                    case "to top right":
                    case "to right top":
                        return H(v(e), e);
                    case "bottom right":
                    case "right bottom":
                    case "to top left":
                    case "to left top":
                        return H(2 * Math.PI - v(e), e);
                    case "top":
                    case "to bottom":
                    default:
                        return H(Math.PI, e)
                }
            },
            y = function(A, e) {
                var t = A.split(" ").map(parseFloat),
                    r = i(t, 2),
                    n = r[0],
                    o = r[1],
                    s = n / 100 * e.width / (o / 100 * e.height);
                return H(Math.atan(isNaN(s) ? 1 : s) + Math.PI / 2, e)
            },
            I = function(A, r, n, o) { return [{ x: 0, y: 0 }, { x: 0, y: A.height }, { x: A.width, y: 0 }, { x: A.width, y: A.height }].reduce(function(A, e) { var t = (0, Q.distance)(r - e.x, n - e.y); return (o ? t < A.optimumDistance : t > A.optimumDistance) ? { optimumCorner: e, optimumDistance: t } : A }, { optimumDistance: o ? 1 / 0 : -1 / 0, optimumCorner: null }).optimumCorner },
            T = function(A, e, t, r, n) {
                var o = t.x,
                    s = t.y,
                    i = 0,
                    a = 0;
                switch (A) {
                    case "closest-side":
                        e === w.CIRCLE ? i = a = Math.min(Math.abs(o), Math.abs(o - n.width), Math.abs(s), Math.abs(s - n.height)) : e === w.ELLIPSE && (i = Math.min(Math.abs(o), Math.abs(o - n.width)), a = Math.min(Math.abs(s), Math.abs(s - n.height)));
                        break;
                    case "closest-corner":
                        if (e === w.CIRCLE) i = a = Math.min((0, Q.distance)(o, s), (0, Q.distance)(o, s - n.height), (0, Q.distance)(o - n.width, s), (0, Q.distance)(o - n.width, s - n.height));
                        else if (e === w.ELLIPSE) {
                            var B = Math.min(Math.abs(s), Math.abs(s - n.height)) / Math.min(Math.abs(o), Math.abs(o - n.width)),
                                c = I(n, o, s, !0);
                            a = B * (i = (0, Q.distance)(c.x - o, (c.y - s) / B))
                        }
                        break;
                    case "farthest-side":
                        e === w.CIRCLE ? i = a = Math.max(Math.abs(o), Math.abs(o - n.width), Math.abs(s), Math.abs(s - n.height)) : e === w.ELLIPSE && (i = Math.max(Math.abs(o), Math.abs(o - n.width)), a = Math.max(Math.abs(s), Math.abs(s - n.height)));
                        break;
                    case "farthest-corner":
                        if (e === w.CIRCLE) i = a = Math.max((0, Q.distance)(o, s), (0, Q.distance)(o, s - n.height), (0, Q.distance)(o - n.width, s), (0, Q.distance)(o - n.width, s - n.height));
                        else if (e === w.ELLIPSE) {
                            var l = Math.max(Math.abs(s), Math.abs(s - n.height)) / Math.max(Math.abs(o), Math.abs(o - n.width)),
                                u = I(n, o, s, !1);
                            a = l * (i = (0, Q.distance)(u.x - o, (u.y - s) / l))
                        }
                        break;
                    default:
                        i = r.x || 0, a = void 0 !== r.y ? r.y : i
                }
                return { x: i, y: a }
            },
            N = e.transformWebkitRadialGradientArgs = function(A) {
                var e = "",
                    t = "",
                    r = "",
                    n = "",
                    o = 0,
                    s = /^(left|center|right|\d+(?:px|r?em|%)?)(?:\s+(top|center|bottom|\d+(?:px|r?em|%)?))?$/i,
                    i = /^\d+(px|r?em|%)?(?:\s+\d+(px|r?em|%)?)?$/i,
                    a = A[o].match(s);
                a && o++;
                var B = A[o].match(/^(circle|ellipse)?\s*(closest-side|closest-corner|farthest-side|farthest-corner|contain|cover)?$/i);
                B && (e = B[1] || "", "contain" === (r = B[2] || "") ? r = "closest-side" : "cover" === r && (r = "farthest-corner"), o++);
                var c = A[o].match(i);
                c && o++;
                var l = A[o].match(s);
                l && o++;
                var u = A[o].match(i);
                u && o++;
                var Q = l || a;
                Q && Q[1] && (n = Q[1] + (/^\d+$/.test(Q[1]) ? "px" : ""), Q[2] && (n += " " + Q[2] + (/^\d+$/.test(Q[2]) ? "px" : "")));
                var d = u || c;
                return d && (t = d[0], d[1] || (t += "px")), !n || e || t || r || (t = n, n = ""), n && (n = "at " + n), [
                    [e, r, t, n].filter(function(A) { return !!A }).join(" ")
                ].concat(A.slice(o))
            },
            b = function(t) {
                return t.map(function(A) { return A.match(n) }).map(function(A, e) {
                    if (!A) return t[e];
                    switch (A[1]) {
                        case "from":
                            return A[4] + " 0%";
                        case "to":
                            return A[4] + " 100%";
                        case "color-stop":
                            return "%" === A[3] ? A[4] + " " + A[2] : A[4] + " " + 100 * parseFloat(A[2]) + "%"
                    }
                })
            }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r = /([+-]?\d*\.?\d+)(deg|grad|rad|turn)/i;
        e.parseAngle = function(A) {
            var e = A.match(r);
            if (e) {
                var t = parseFloat(e[1]);
                switch (e[2].toLowerCase()) {
                    case "deg":
                        return Math.PI * t / 180;
                    case "grad":
                        return Math.PI / 200 * t;
                    case "rad":
                        return t;
                    case "turn":
                        return 2 * Math.PI * t
                }
            }
            return null
        }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), e.cloneWindow = e.DocumentCloner = void 0;
        var o = function(A, e) {
                if (Array.isArray(A)) return A;
                if (Symbol.iterator in Object(A)) return function(A, e) {
                    var t = [],
                        r = !0,
                        n = !1,
                        o = void 0;
                    try { for (var s, i = A[Symbol.iterator](); !(r = (s = i.next()).done) && (t.push(s.value), !e || t.length !== e); r = !0); } catch (A) { n = !0, o = A } finally { try {!r && i.return && i.return() } finally { if (n) throw o } }
                    return t
                }(A, e);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            },
            r = function() {
                function r(A, e) {
                    for (var t = 0; t < e.length; t++) {
                        var r = e[t];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
                    }
                }
                return function(A, e, t) { return e && r(A.prototype, e), t && r(A, t), A }
            }(),
            c = t(2),
            n = t(26),
            s = i(t(60)),
            l = t(4),
            u = t(5),
            Q = i(t(15)),
            d = t(61);

        function i(A) { return A && A.__esModule ? A : { default: A } }
        var w = "data-html2canvas-ignore",
            h = e.DocumentCloner = function() {
                function o(A, e, t, r, n) {! function(A, e) { if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, o), this.referenceElement = A, this.scrolledElements = [], this.copyStyles = r, this.inlineImages = r, this.logger = t, this.options = e, this.renderer = n, this.resourceLoader = new s.default(e, t, window), this.pseudoContentData = { counters: {}, quoteDepth: 0 }, this.documentElement = this.cloneNode(A.ownerDocument.documentElement) }
                return r(o, [{
                    key: "inlineAllImages",
                    value: function(r) {
                        var e = this;
                        if (this.inlineImages && r) {
                            var t = r.style;
                            Promise.all((0, u.parseBackgroundImage)(t.backgroundImage).map(function(A) { return "url" === A.method ? e.resourceLoader.inlineImage(A.args[0]).then(function(A) { return A && "string" == typeof A.src ? 'url("' + A.src + '")' : "none" }).catch(function(A) { 0 }) : Promise.resolve("" + A.prefix + A.method + "(" + A.args.join(",") + ")") })).then(function(A) { 1 < A.length && (t.backgroundColor = ""), t.backgroundImage = A.join(",") }), r instanceof HTMLImageElement && this.resourceLoader.inlineImage(r.src).then(function(A) {
                                if (A && r instanceof HTMLImageElement && r.parentNode) {
                                    var e = r.parentNode,
                                        t = (0, l.copyCSSStyles)(r.style, A.cloneNode(!1));
                                    e.replaceChild(t, r)
                                }
                            }).catch(function(A) { 0 })
                        }
                    }
                }, {
                    key: "inlineFonts",
                    value: function(t) {
                        var r = this;
                        return Promise.all(Array.from(t.styleSheets).map(function(e) { return e.href ? fetch(e.href).then(function(A) { return A.text() }).then(function(A) { return B(A, e.href) }).catch(function(A) { return [] }) : a(e, t) })).then(function(A) { return A.reduce(function(A, e) { return A.concat(e) }, []) }).then(function(A) {
                            return Promise.all(A.map(function(e) {
                                return fetch(e.formats[0].src).then(function(A) { return A.blob() }).then(function(r) {
                                    return new Promise(function(e, A) {
                                        var t = new FileReader;
                                        t.onerror = A, t.onload = function() {
                                            var A = t.result;
                                            e(A)
                                        }, t.readAsDataURL(r)
                                    })
                                }).then(function(A) { return e.fontFace.setProperty("src", 'url("' + A + '")'), "@font-face {" + e.fontFace.cssText + " " })
                            }))
                        }).then(function(A) {
                            var e = t.createElement("style");
                            e.textContent = A.join("\n"), r.documentElement.appendChild(e)
                        })
                    }
                }, {
                    key: "createElementClone",
                    value: function(n) {
                        var r = this;
                        if (this.copyStyles && n instanceof HTMLCanvasElement) {
                            var A = n.ownerDocument.createElement("img");

                            try { return A.src = n.toDataURL(), A } catch (A) { 0 }

                        }
                        if (n instanceof HTMLIFrameElement) {


                            var o = n.cloneNode(!1),
                                e = y();
                            o.setAttribute("data-html2canvas-internal-iframe-key", e);
                            var t = (0, c.parseBounds)(n, 0, 0),
                                s = t.width,
                                i = t.height;
                            return this.resourceLoader.cache[e] = T(n, this.options).then(function(A) {
                                return r.renderer(A, {
                                    async: true,
                                    allowTaint: r.options.allowTaint,
                                    backgroundColor: "#ffffff",
                                    canvas: null,
                                    imageTimeout: r.options.imageTimeout,
                                    logging: r.options.logging,
                                    proxy: r.options.proxy,
                                    removeContainer: r.options.removeContainer,
                                    scale: r.options.scale,
                                    foreignObjectRendering: r.options.foreignObjectRendering,
                                    useCORS: true,

                                    target: new Q.default,
                                    // width: s,
                                    // height: i,
                                    x: 0,
                                    y: 0,
                                    windowWidth: A.ownerDocument.defaultView.innerWidth,
                                    windowHeight: A.ownerDocument.defaultView.innerHeight,
                                    scrollX: A.ownerDocument.defaultView.pageXOffset,
                                    scrollY: A.ownerDocument.defaultView.pageYOffset
                                }, r.logger.child(e))
                            }).then(function(r) {
                                return new Promise(function(A, e) {
                                    var t = document.createElement("img");


                                    t.onload = function() { return A(r) }, t.onerror = e, t.src = r.toDataURL(), o.parentNode && o.parentNode.replaceChild((0, l.copyCSSStyles)(n.ownerDocument.defaultView.getComputedStyle(n), t), o)
                                })
                            }), o



                        }
                        if (n instanceof HTMLStyleElement && n.sheet && n.sheet.cssRules) {
                            var a = [].slice.call(n.sheet.cssRules, 0).reduce(function(e, t) { try { return t && t.cssText ? e + t.cssText : e } catch (A) { return r.logger.log("Unable to access cssText property", t.name), e } }, ""),
                                B = n.cloneNode(!1);
                            return B.textContent = a, B
                        }
                        return n.cloneNode(!1)
                    }
                }, {
                    key: "cloneNode",
                    value: function(A) {
                        var e = A.nodeType === Node.TEXT_NODE ? document.createTextNode(A.nodeValue) : this.createElementClone(A),
                            t = A.ownerDocument.defaultView,
                            r = A instanceof t.HTMLElement ? t.getComputedStyle(A) : null,
                            n = A instanceof t.HTMLElement ? t.getComputedStyle(A, ":before") : null,
                            o = A instanceof t.HTMLElement ? t.getComputedStyle(A, ":after") : null;
                        this.referenceElement === A && e instanceof t.HTMLElement && (this.clonedReferenceElement = e), e instanceof t.HTMLBodyElement && H(e);
                        for (var s = (0, d.parseCounterReset)(r, this.pseudoContentData), i = (0, d.resolvePseudoContent)(A, n, this.pseudoContentData), a = A.firstChild; a; a = a.nextSibling) a.nodeType === Node.ELEMENT_NODE && ("SCRIPT" === a.nodeName || a.hasAttribute(w) || "function" == typeof this.options.ignoreElements && this.options.ignoreElements(a)) || this.copyStyles && "STYLE" === a.nodeName || e.appendChild(this.cloneNode(a));
                        var B = (0, d.resolvePseudoContent)(A, o, this.pseudoContentData);
                        if ((0, d.popCounters)(s, this.pseudoContentData), A instanceof t.HTMLElement && e instanceof t.HTMLElement) switch (n && this.inlineAllImages(U(A, e, n, i, f)), o && this.inlineAllImages(U(A, e, o, B, C)), !r || !this.copyStyles || A instanceof HTMLIFrameElement || (0, l.copyCSSStyles)(r, e), this.inlineAllImages(e), 0 === A.scrollTop && 0 === A.scrollLeft || this.scrolledElements.push([e, A.scrollLeft, A.scrollTop]), A.nodeName) {
                            case "CANVAS":
                                this.copyStyles || g(A, e);
                                break;
                            case "TEXTAREA":
                            case "SELECT":
                                e.value = A.value
                        }
                        return e
                    }
                }]), o
            }(),
            a = function(A, s) {
                return (A.cssRules ? Array.from(A.cssRules) : []).filter(function(A) { return A.type === CSSRule.FONT_FACE_RULE }).map(function(A) {
                    for (var e = (0, u.parseBackgroundImage)(A.style.getPropertyValue("src")), t = [], r = 0; r < e.length; r++)
                        if ("url" === e[r].method && e[r + 1] && "format" === e[r + 1].method) {
                            var n = s.createElement("a");
                            n.href = e[r].args[0], s.body && s.body.appendChild(n);
                            var o = { src: n.href, format: e[r + 1].args[0] };
                            t.push(o)
                        }
                    return { formats: t.filter(function(A) { return /^woff/i.test(A.format) }), fontFace: A.style }
                }).filter(function(A) { return A.formats.length })
            },
            B = function(A, e) {
                var t = document.implementation.createHTMLDocument(""),
                    r = document.createElement("base");
                r.href = e;
                var n = document.createElement("style");
                return n.textContent = A, t.head && t.head.appendChild(r), t.body && t.body.appendChild(n), n.sheet ? a(n.sheet, t) : []
            },
            g = function(A, e) {
                try {
                    if (e) {
                        e.width = A.width, e.height = A.height;
                        var t = A.getContext("2d"),
                            r = e.getContext("2d");
                        t ? r.putImageData(t.getImageData(0, 0, A.width, A.height), 0, 0) : r.drawImage(A, 0, 0)
                    }
                } catch (A) {}
            },
            U = function(A, e, t, r, n) {
                if (t && t.content && "none" !== t.content && "-moz-alt-content" !== t.content && "none" !== t.display) {
                    var o = e.ownerDocument.createElement("html2canvaspseudoelement");
                    if ((0, l.copyCSSStyles)(t, o), r)
                        for (var s = r.length, i = 0; i < s; i++) {
                            var a = r[i];
                            switch (a.type) {
                                case d.PSEUDO_CONTENT_ITEM_TYPE.IMAGE:
                                    var B = e.ownerDocument.createElement("img");
                                    B.src = (0, u.parseBackgroundImage)("url(" + a.value + ")")[0].args[0], B.style.opacity = "1", o.appendChild(B);
                                    break;
                                case d.PSEUDO_CONTENT_ITEM_TYPE.TEXT:
                                    o.appendChild(e.ownerDocument.createTextNode(a.value))
                            }
                        }
                    return o.className = F + " " + E, e.className += n === f ? " " + F : " " + E, n === f ? e.insertBefore(o, e.firstChild) : e.appendChild(o), o
                }
            },
            f = ":before",
            C = ":after",
            F = "___html2canvas___pseudoelement_before",
            E = "___html2canvas___pseudoelement_after",
            p = '{\n    content: "" !important;\n    display: none !important;\n}',
            H = function(A) { v(A, "." + F + f + p + "\n         ." + E + C + p) },
            v = function(A, e) {
                var t = A.ownerDocument.createElement("style");
                t.innerHTML = e, A.appendChild(t)
            },
            m = function(A) {
                var e = o(A, 3),
                    t = e[0],
                    r = e[1],
                    n = e[2];
                t.scrollLeft = r, t.scrollTop = n
            },
            y = function() { return Math.ceil(Date.now() + 1e7 * Math.random()).toString(16) },
            I = /^data:text\/(.+);(base64)?,(.*)$/i,
            T = function(e, t) {
                try { return Promise.resolve(e.contentWindow.document.documentElement) } catch (A) {
                    return t.proxy ? (0, n.Proxy)(e.src, t).then(function(A) { var e = A.match(I); return e ? "base64" === e[2] ? window.atob(decodeURIComponent(e[3])) : decodeURIComponent(e[3]) : Promise.reject() }).then(function(r) {
                        return N(e.ownerDocument, (0, c.parseBounds)(e, 0, 0)).then(function(A) {
                            var e = A.contentWindow.document;
                            e.open(), e.write(r);
                            var t = b(A).then(function() { return e.documentElement });
                            return e.close(), t
                        })
                    }) : Promise.reject()
                }
            },
            N = function(A, e) { var t = A.createElement("iframe"); return t.className = "html2canvas-container", t.style.visibility = "hidden", t.style.position = "fixed", t.style.left = "-10000px", t.style.top = "0px", t.style.border = "0", t.width = e.width.toString(), t.height = e.height.toString(), t.scrolling = "no", t.setAttribute(w, "true"), A.body ? (A.body.appendChild(t), Promise.resolve(t)) : Promise.reject("") },
            b = function(t) {
                var r = t.contentWindow,
                    n = r.document;
                return new Promise(function(e, A) { r.onload = t.onload = n.onreadystatechange = function() { var A = setInterval(function() { 0 < n.body.childNodes.length && "complete" === n.readyState && (clearInterval(A), e(t)) }, 50) } })
            },
            K = (e.cloneWindow = function(i, a, B, c, A, e) {
                var l = new h(B, c, A, !1, e),
                    u = i.defaultView.pageXOffset,
                    Q = i.defaultView.pageYOffset;
                return N(i, a).then(function(t) {
                    var A, e, r, n = t.contentWindow,
                        o = n.document,
                        s = b(t).then(function() {
                            l.scrolledElements.forEach(m), n.scrollTo(a.left, a.top), !/(iPad|iPhone|iPod)/g.test(navigator.userAgent) || n.scrollY === a.top && n.scrollX === a.left || (o.documentElement.style.top = -a.top + "px", o.documentElement.style.left = -a.left + "px", o.documentElement.style.position = "absolute");
                            var A = Promise.resolve([t, l.clonedReferenceElement, l.resourceLoader]),
                                e = c.onclone;
                            return l.clonedReferenceElement instanceof n.HTMLElement || l.clonedReferenceElement instanceof i.defaultView.HTMLElement || l.clonedReferenceElement instanceof HTMLElement ? "function" == typeof e ? Promise.resolve().then(function() { return e(o) }).then(function() { return A }) : A : Promise.reject("")
                        });
                    return o.open(), o.write(K(document.doctype) + "<html></html>"), A = B.ownerDocument, e = u, r = Q, !A.defaultView || e === A.defaultView.pageXOffset && r === A.defaultView.pageYOffset || A.defaultView.scrollTo(e, r), o.replaceChild(o.adoptNode(l.documentElement), o.documentElement), o.close(), s
                })
            }, function(A) { var e = ""; return A && (e += "<!DOCTYPE ", A.name && (e += A.name), A.internalSubset && (e += A.internalSubset), A.publicId && (e += '"' + A.publicId + '"'), A.systemId && (e += '"' + A.systemId + '"'), e += ">"), e })
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), e.ResourceStore = void 0;
        var r, n = function() {
                function r(A, e) {
                    for (var t = 0; t < e.length; t++) {
                        var r = e[t];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
                    }
                }
                return function(A, e, t) { return e && r(A.prototype, e), t && r(A, t), A }
            }(),
            o = t(10),
            a = (r = o) && r.__esModule ? r : { default: r },
            s = t(26);

        function i(A, e) { if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function") }
        var B = function() {
            function r(A, e, t) { i(this, r), this.options = A, this._window = t, this.origin = this.getOrigin(t.location.href), this.cache = {}, this.logger = e, this._index = 0 }
            return n(r, [{ key: "loadImage", value: function(A) { var e = this; if (this.hasResourceInCache(A)) return A; if (h(A)) return this.cache[A] = U(A, this.options.imageTimeout || 0), A; if (!g(A) || a.default.SUPPORT_SVG_DRAWING) { if (!0 === this.options.allowTaint || d(A) || this.isSameOrigin(A)) return this.addImage(A, A, !1); if (!this.isSameOrigin(A)) { if ("string" == typeof this.options.proxy) return this.cache[A] = (0, s.Proxy)(A, this.options).then(function(A) { return U(A, e.options.imageTimeout || 0) }), A; if (!0 === this.options.useCORS && a.default.SUPPORT_CORS_IMAGES) return this.addImage(A, A, !0) } } } }, { key: "inlineImage", value: function(A) { var e = this; return d(A) ? U(A, this.options.imageTimeout || 0) : this.hasResourceInCache(A) ? this.cache[A] : this.isSameOrigin(A) || "string" != typeof this.options.proxy ? this.xhrImage(A) : this.cache[A] = (0, s.Proxy)(A, this.options).then(function(A) { return U(A, e.options.imageTimeout || 0) }) } }, {
                key: "xhrImage",
                value: function(n) {
                    var o = this;
                    return this.cache[n] = new Promise(function(t, r) {
                        var A = new XMLHttpRequest;
                        if (A.onreadystatechange = function() {
                                if (4 === A.readyState)
                                    if (200 !== A.status) r("Failed to fetch image " + n.substring(0, 256) + " with status code " + A.status);
                                    else {
                                        var e = new FileReader;
                                        e.addEventListener("load", function() {
                                            var A = e.result;
                                            t(A)
                                        }, !1), e.addEventListener("error", function(A) { return r(A) }, !1), e.readAsDataURL(A.response)
                                    }
                            }, A.responseType = "blob", o.options.imageTimeout) {
                            var e = o.options.imageTimeout;
                            A.timeout = e, A.ontimeout = function() { return r("") }
                        }
                        A.open("GET", n, !0), A.send()
                    }).then(function(A) { return U(A, o.options.imageTimeout || 0) }), this.cache[n]
                }
            }, { key: "loadCanvas", value: function(A) { var e = String(this._index++); return this.cache[e] = Promise.resolve(A), e } }, { key: "hasResourceInCache", value: function(A) { return void 0 !== this.cache[A] } }, {
                key: "addImage",
                value: function(A, o, s) {
                    var i = this;
                    var e = function(n) {
                        return new Promise(function(A, e) {
                            var t = new Image;
                            if (t.onload = function() { return A(t) }, n && !s || (t.crossOrigin = "anonymous"), t.onerror = e, t.src = o, !0 === t.complete && setTimeout(function() { A(t) }, 500), i.options.imageTimeout) {
                                var r = i.options.imageTimeout;
                                setTimeout(function() { return e("") }, r)
                            }
                        })
                    };
                    return this.cache[A] = w(o) && !g(o) ? a.default.SUPPORT_BASE64_DRAWING(o).then(e) : e(!0), A
                }
            }, { key: "isSameOrigin", value: function(A) { return this.getOrigin(A) === this.origin } }, { key: "getOrigin", value: function(A) { var e = this._link || (this._link = this._window.document.createElement("a")); return e.href = A, e.href = e.href, e.protocol + e.hostname + e.port } }, {
                key: "ready",
                value: function() {
                    var e = this,
                        t = Object.keys(this.cache),
                        A = t.map(function(A) { return e.cache[A].catch(function(A) { return null }) });
                    return Promise.all(A).then(function(A) { return new c(t, A) })
                }
            }]), r
        }();
        e.default = B;
        var c = e.ResourceStore = function() {
                function t(A, e) { i(this, t), this._keys = A, this._resources = e }
                return n(t, [{ key: "get", value: function(A) { var e = this._keys.indexOf(A); return -1 === e ? null : this._resources[e] } }]), t
            }(),
            l = /^data:image\/svg\+xml/i,
            u = /^data:image\/.*;base64,/i,
            Q = /^data:image\/.*/i,
            d = function(A) { return Q.test(A) },
            w = function(A) { return u.test(A) },
            h = function(A) { return "blob" === A.substr(0, 4) },
            g = function(A) { return "svg" === A.substr(-3).toLowerCase() || l.test(A) },
            U = function(r, n) {
                return new Promise(function(A, e) {
                    var t = new Image;
                    t.onload = function() { return A(t) }, t.onerror = e, t.src = r, !0 === t.complete && setTimeout(function() { A(t) }, 500), n && setTimeout(function() { return e("") }, n)
                })
            }
    }, function(A, e, t) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), e.parseContent = e.resolvePseudoContent = e.popCounters = e.parseCounterReset = e.TOKEN_TYPE = e.PSEUDO_CONTENT_ITEM_TYPE = void 0;
        var g = function(A, e) {
                if (Array.isArray(A)) return A;
                if (Symbol.iterator in Object(A)) return function(A, e) {
                    var t = [],
                        r = !0,
                        n = !1,
                        o = void 0;
                    try { for (var s, i = A[Symbol.iterator](); !(r = (s = i.next()).done) && (t.push(s.value), !e || t.length !== e); r = !0); } catch (A) { n = !0, o = A } finally { try {!r && i.return && i.return() } finally { if (n) throw o } }
                    return t
                }(A, e);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            },
            s = t(14),
            i = t(8),
            U = e.PSEUDO_CONTENT_ITEM_TYPE = { TEXT: 0, IMAGE: 1 },
            f = e.TOKEN_TYPE = { STRING: 0, ATTRIBUTE: 1, URL: 2, COUNTER: 3, COUNTERS: 4, OPENQUOTE: 5, CLOSEQUOTE: 6 },
            C = (e.parseCounterReset = function(A, e) {
                if (!A || !A.counterReset || "none" === A.counterReset) return [];
                for (var t = [], r = A.counterReset.split(/\s*,\s*/), n = r.length, o = 0; o < n; o++) {
                    var s = r[o].split(/\s+/),
                        i = g(s, 2),
                        a = i[0],
                        B = i[1];
                    t.push(a);
                    var c = e.counters[a];
                    c || (c = e.counters[a] = []), c.push(parseInt(B || 0, 10))
                }
                return t
            }, e.popCounters = function(A, e) { for (var t = A.length, r = 0; r < t; r++) e.counters[A[r]].pop() }, e.resolvePseudoContent = function(A, e, t) {
                if (!e || !e.content || "none" === e.content || "-moz-alt-content" === e.content || "none" === e.display) return null;
                var r = C(e.content),
                    n = r.length,
                    o = [],
                    s = "",
                    i = e.counterIncrement;
                if (i && "none" !== i) {
                    var a = i.split(/\s+/),
                        B = g(a, 2),
                        c = B[0],
                        l = B[1],
                        u = t.counters[c];
                    u && (u[u.length - 1] += void 0 === l ? 1 : parseInt(l, 10))
                }
                for (var Q = 0; Q < n; Q++) {
                    var d = r[Q];
                    switch (d.type) {
                        case f.STRING:
                            s += d.value || "";
                            break;
                        case f.ATTRIBUTE:
                            A instanceof HTMLElement && d.value && (s += A.getAttribute(d.value) || "");
                            break;
                        case f.COUNTER:
                            var w = t.counters[d.name || ""];
                            w && (s += E([w[w.length - 1]], "", d.format));
                            break;
                        case f.COUNTERS:
                            var h = t.counters[d.name || ""];
                            h && (s += E(h, d.glue, d.format));
                            break;
                        case f.OPENQUOTE:
                            s += F(e, !0, t.quoteDepth), t.quoteDepth++;
                            break;
                        case f.CLOSEQUOTE:
                            t.quoteDepth--, s += F(e, !1, t.quoteDepth);
                            break;
                        case f.URL:
                            s && (o.push({ type: U.TEXT, value: s }), s = ""), o.push({ type: U.IMAGE, value: d.value || "" })
                    }
                }
                return s && o.push({ type: U.TEXT, value: s }), o
            }, e.parseContent = function(A, e) {
                if (e && e[A]) return e[A];
                for (var t = [], r = A.length, n = !1, o = !1, s = !1, i = "", a = "", B = [], c = 0; c < r; c++) {
                    var l = A.charAt(c);
                    switch (l) {
                        case "'":
                        case '"':
                            o ? i += l : (n = !n, s || n || (t.push({ type: f.STRING, value: i }), i = ""));
                            break;
                        case "\\":
                            o = !o || (i += l, !1);
                            break;
                        case "(":
                            n ? i += l : (s = !0, a = i, i = "", B = []);
                            break;
                        case ")":
                            if (n) i += l;
                            else if (s) {
                                switch (i && B.push(i), a) {
                                    case "attr":
                                        0 < B.length && t.push({ type: f.ATTRIBUTE, value: B[0] });
                                        break;
                                    case "counter":
                                        if (0 < B.length) {
                                            var u = { type: f.COUNTER, name: B[0] };
                                            1 < B.length && (u.format = B[1]), t.push(u)
                                        }
                                        break;
                                    case "counters":
                                        if (0 < B.length) {
                                            var Q = { type: f.COUNTERS, name: B[0] };
                                            1 < B.length && (Q.glue = B[1]), 2 < B.length && (Q.format = B[2]), t.push(Q)
                                        }
                                        break;
                                    case "url":
                                        0 < B.length && t.push({ type: f.URL, value: B[0] })
                                }
                                s = !1, i = ""
                            }
                            break;
                        case ",":
                            n ? i += l : s && (B.push(i), i = "");
                            break;
                        case " ":
                        case "\t":
                            n ? i += l : i && (d(t, i), i = "");
                            break;
                        default:
                            i += l
                    }
                    "\\" !== l && (o = !1)
                }
                return i && d(t, i), e && (e[A] = t), t
            }),
            d = function(A, e) {
                switch (e) {
                    case "open-quote":
                        A.push({ type: f.OPENQUOTE });
                        break;
                    case "close-quote":
                        A.push({ type: f.CLOSEQUOTE })
                }
            },
            F = function(A, e, t) {
                var r = A.quotes ? A.quotes.split(/\s+/) : ["'\"'", "'\"'"],
                    n = 2 * t;
                return n >= r.length && (n = r.length - 2), e || ++n, r[n].replace(/^["']|["']$/g, "")
            },
            E = function(A, e, t) { for (var r = A.length, n = "", o = 0; o < r; o++) 0 < o && (n += e || ""), n += (0, s.createCounterText)(A[o], (0, i.parseListStyleType)(t || "decimal"), !1); return n }
    }, function(o, n, A) {
        (function(A) {
            var e, t, r;
            t = [], void 0 === (r = "function" == typeof(e = function() {
                "use strict";

                function c(A, e, t) {
                    var r = new XMLHttpRequest;
                    r.open("GET", A), r.responseType = "blob", r.onload = function() { n(r.response, e, t) }, r.onerror = function() { console.error("could not download file") }, r.send()
                }

                function s(A) { var e = new XMLHttpRequest; return e.open("HEAD", A, !1), e.send(), 200 <= e.status && e.status <= 299 }

                function i(e) {
                    try { e.dispatchEvent(new MouseEvent("click")) } catch (A) {
                        var t = document.createEvent("MouseEvents");
                        t.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(t)
                    }
                }
                var l = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof A && A.global === A ? A : void 0,
                    n = l.saveAs || "object" != typeof window || window !== l ? function() {} : "download" in HTMLAnchorElement.prototype ? function(A, e, t) {
                        var r = l.URL || l.webkitURL,
                            n = document.createElement("a");
                        e = e || A.name || "download", n.download = e, n.rel = "noopener", "string" == typeof A ? (n.href = A, n.origin === location.origin ? i(n) : s(n.href) ? c(A, e, t) : i(n, n.target = "_blank")) : (n.href = r.createObjectURL(A), setTimeout(function() { r.revokeObjectURL(n.href) }, 4e4), setTimeout(function() { i(n) }, 0))
                    } : "msSaveOrOpenBlob" in navigator ? function(A, e, t) {
                        if (e = e || A.name || "download", "string" != typeof A) navigator.msSaveOrOpenBlob((n = A, void 0 === (o = t) ? o = { autoBom: !1 } : "object" != typeof o && (console.warn("Depricated: Expected third argument to be a object"), o = { autoBom: !o }), o.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(n.type) ? new Blob(["\ufeff", n], { type: n.type }) : n), e);
                        else if (s(A)) c(A, e, t);
                        else {
                            var r = document.createElement("a");
                            r.href = A, r.target = "_blank", setTimeout(function() { i(r) })
                        }
                        var n, o
                    } : function(A, e, t, r) {
                        if ((r = r || open("", "_blank")) && (r.document.title = r.document.body.innerText = "downloading..."), "string" == typeof A) return c(A, e, t);
                        var n = "application/octet-stream" === A.type,
                            o = /constructor/i.test(l.HTMLElement) || l.safari,
                            s = /CriOS\/[\d]+/.test(navigator.userAgent);
                        if ((s || n && o) && "object" == typeof FileReader) {
                            var i = new FileReader;
                            i.onloadend = function() {
                                var A = i.result;
                                A = s ? A : A.replace(/^data:[^;]*;/, "data:attachment/file;"), r ? r.location.href = A : location = A, r = null
                            }, i.readAsDataURL(A)
                        } else {
                            var a = l.URL || l.webkitURL,
                                B = a.createObjectURL(A);
                            r ? r.location = B : location.href = B, r = null, setTimeout(function() { a.revokeObjectURL(B) }, 4e4)
                        }
                    };
                l.saveAs = n.saveAs = n, o.exports = n
            }) ? e.apply(n, t) : e) || (o.exports = r)
        }).call(this, A(63))
    }, function(A, e) {
        var t;
        t = function() { return this }();
        try { t = t || new Function("return this")() } catch (A) { "object" == typeof window && (t = window) }
        A.exports = t
    }, function(A, e, t) {}])
});