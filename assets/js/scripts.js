(()=>{
    var h = (s,e)=>()=>(e || s((e = {
        exports: {}
    }).exports, e),
    e.exports);
    var pe = h((Xr,je)=>{
        var hs = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
          , us = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
        je.exports = function(e) {
            var t = e
              , r = e.indexOf("[")
              , n = e.indexOf("]");
            r != -1 && n != -1 && (e = e.substring(0, r) + e.substring(r, n).replace(/:/g, ";") + e.substring(n, e.length));
            for (var o = hs.exec(e || ""), i = {}, u = 14; u--; )
                i[us[u]] = o[u] || "";
            return r != -1 && n != -1 && (i.source = t,
            i.host = i.host.substring(1, i.host.length - 1).replace(/;/g, ":"),
            i.authority = i.authority.replace("[", "").replace("]", "").replace(/;/g, ":"),
            i.ipv6uri = !0),
            i.pathNames = ls(i, i.path),
            i.queryKey = ps(i, i.query),
            i
        }
        ;
        function ls(s, e) {
            var t = /\/{2,9}/g
              , r = e.replace(t, "/").split("/");
            return (e.substr(0, 1) == "/" || e.length === 0) && r.splice(0, 1),
            e.substr(e.length - 1, 1) == "/" && r.splice(r.length - 1, 1),
            r
        }
        function ps(s, e) {
            var t = {};
            return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(r, n, o) {
                n && (t[n] = o)
            }),
            t
        }
    }
    );
    var Ue = h((Yr,Ve)=>{
        var F = 1e3
          , L = F * 60
          , I = L * 60
          , O = I * 24
          , fs = O * 7
          , ds = O * 365.25;
        Ve.exports = function(s, e) {
            e = e || {};
            var t = typeof s;
            if (t === "string" && s.length > 0)
                return ms(s);
            if (t === "number" && isFinite(s))
                return e.long ? gs(s) : ys(s);
            throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(s))
        }
        ;
        function ms(s) {
            if (s = String(s),
            !(s.length > 100)) {
                var e = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(s);
                if (!!e) {
                    var t = parseFloat(e[1])
                      , r = (e[2] || "ms").toLowerCase();
                    switch (r) {
                    case "years":
                    case "year":
                    case "yrs":
                    case "yr":
                    case "y":
                        return t * ds;
                    case "weeks":
                    case "week":
                    case "w":
                        return t * fs;
                    case "days":
                    case "day":
                    case "d":
                        return t * O;
                    case "hours":
                    case "hour":
                    case "hrs":
                    case "hr":
                    case "h":
                        return t * I;
                    case "minutes":
                    case "minute":
                    case "mins":
                    case "min":
                    case "m":
                        return t * L;
                    case "seconds":
                    case "second":
                    case "secs":
                    case "sec":
                    case "s":
                        return t * F;
                    case "milliseconds":
                    case "millisecond":
                    case "msecs":
                    case "msec":
                    case "ms":
                        return t;
                    default:
                        return
                    }
                }
            }
        }
        function ys(s) {
            var e = Math.abs(s);
            return e >= O ? Math.round(s / O) + "d" : e >= I ? Math.round(s / I) + "h" : e >= L ? Math.round(s / L) + "m" : e >= F ? Math.round(s / F) + "s" : s + "ms"
        }
        function gs(s) {
            var e = Math.abs(s);
            return e >= O ? z(s, e, O, "day") : e >= I ? z(s, e, I, "hour") : e >= L ? z(s, e, L, "minute") : e >= F ? z(s, e, F, "second") : s + " ms"
        }
        function z(s, e, t, r) {
            var n = e >= t * 1.5;
            return Math.round(s / t) + " " + r + (n ? "s" : "")
        }
    }
    );
    var Xe = h((Wr,Ke)=>{
        function bs(s) {
            t.debug = t,
            t.default = t,
            t.coerce = m,
            t.disable = o,
            t.enable = n,
            t.enabled = i,
            t.humanize = Ue(),
            t.destroy = B,
            Object.keys(s).forEach(a=>{
                t[a] = s[a]
            }
            ),
            t.names = [],
            t.skips = [],
            t.formatters = {};
            function e(a) {
                let c = 0;
                for (let l = 0; l < a.length; l++)
                    c = (c << 5) - c + a.charCodeAt(l),
                    c |= 0;
                return t.colors[Math.abs(c) % t.colors.length]
            }
            t.selectColor = e;
            function t(a) {
                let c, l = null;
                function w(...C) {
                    if (!w.enabled)
                        return;
                    let N = w
                      , Y = Number(new Date)
                      , os = Y - (c || Y);
                    N.diff = os,
                    N.prev = c,
                    N.curr = Y,
                    c = Y,
                    C[0] = t.coerce(C[0]),
                    typeof C[0] != "string" && C.unshift("%O");
                    let W = 0;
                    C[0] = C[0].replace(/%([a-zA-Z%])/g, (le,cs)=>{
                        if (le === "%%")
                            return "%";
                        W++;
                        let He = t.formatters[cs];
                        if (typeof He == "function") {
                            let as = C[W];
                            le = He.call(N, as),
                            C.splice(W, 1),
                            W--
                        }
                        return le
                    }
                    ),
                    t.formatArgs.call(N, C),
                    (N.log || t.log).apply(N, C)
                }
                return w.namespace = a,
                w.useColors = t.useColors(),
                w.color = t.selectColor(a),
                w.extend = r,
                w.destroy = t.destroy,
                Object.defineProperty(w, "enabled", {
                    enumerable: !0,
                    configurable: !1,
                    get: ()=>l === null ? t.enabled(a) : l,
                    set: C=>{
                        l = C
                    }
                }),
                typeof t.init == "function" && t.init(w),
                w
            }
            function r(a, c) {
                let l = t(this.namespace + (typeof c == "undefined" ? ":" : c) + a);
                return l.log = this.log,
                l
            }
            function n(a) {
                t.save(a),
                t.names = [],
                t.skips = [];
                let c, l = (typeof a == "string" ? a : "").split(/[\s,]+/), w = l.length;
                for (c = 0; c < w; c++)
                    !l[c] || (a = l[c].replace(/\*/g, ".*?"),
                    a[0] === "-" ? t.skips.push(new RegExp("^" + a.substr(1) + "$")) : t.names.push(new RegExp("^" + a + "$")))
            }
            function o() {
                let a = [...t.names.map(u), ...t.skips.map(u).map(c=>"-" + c)].join(",");
                return t.enable(""),
                a
            }
            function i(a) {
                if (a[a.length - 1] === "*")
                    return !0;
                let c, l;
                for (c = 0,
                l = t.skips.length; c < l; c++)
                    if (t.skips[c].test(a))
                        return !1;
                for (c = 0,
                l = t.names.length; c < l; c++)
                    if (t.names[c].test(a))
                        return !0;
                return !1
            }
            function u(a) {
                return a.toString().substring(2, a.toString().length - 2).replace(/\.\*\?$/, "*")
            }
            function m(a) {
                return a instanceof Error ? a.stack || a.message : a
            }
            function B() {
                console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")
            }
            return t.enable(t.load()),
            t
        }
        Ke.exports = bs
    }
    );
    var _ = h((g,J)=>{
        g.formatArgs = Cs;
        g.save = ks;
        g.load = vs;
        g.useColors = ws;
        g.storage = Es();
        g.destroy = (()=>{
            let s = !1;
            return ()=>{
                s || (s = !0,
                console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))
            }
        }
        )();
        g.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"];
        function ws() {
            return typeof window != "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs) ? !0 : typeof navigator != "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? !1 : typeof document != "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window != "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator != "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator != "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)
        }
        function Cs(s) {
            if (s[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + s[0] + (this.useColors ? "%c " : " ") + "+" + J.exports.humanize(this.diff),
            !this.useColors)
                return;
            let e = "color: " + this.color;
            s.splice(1, 0, e, "color: inherit");
            let t = 0
              , r = 0;
            s[0].replace(/%[a-zA-Z%]/g, n=>{
                n !== "%%" && (t++,
                n === "%c" && (r = t))
            }
            ),
            s.splice(r, 0, e)
        }
        g.log = console.debug || console.log || (()=>{}
        );
        function ks(s) {
            try {
                s ? g.storage.setItem("debug", s) : g.storage.removeItem("debug")
            } catch (e) {}
        }
        function vs() {
            let s;
            try {
                s = g.storage.getItem("debug")
            } catch (e) {}
            return !s && typeof process != "undefined" && "env"in process && (s = process.env.DEBUG),
            s
        }
        function Es() {
            try {
                return localStorage
            } catch (s) {}
        }
        J.exports = Xe()(g);
        var {formatters: _s} = J.exports;
        _s.j = function(s) {
            try {
                return JSON.stringify(s)
            } catch (e) {
                return "[UnexpectedJSONParseError]: " + e.message
            }
        }
    }
    );
    var We = h($=>{
        "use strict";
        Object.defineProperty($, "__esModule", {
            value: !0
        });
        $.url = void 0;
        var xs = pe()
          , Ye = _()("socket.io-client:url");
        function qs(s, e="", t) {
            let r = s;
            t = t || typeof location != "undefined" && location,
            s == null && (s = t.protocol + "//" + t.host),
            typeof s == "string" && (s.charAt(0) === "/" && (s.charAt(1) === "/" ? s = t.protocol + s : s = t.host + s),
            /^(https?|wss?):\/\//.test(s) || (Ye("protocol-less url %s", s),
            typeof t != "undefined" ? s = t.protocol + "//" + s : s = "https://" + s),
            Ye("parse %s", s),
            r = xs(s)),
            r.port || (/^(http|ws)$/.test(r.protocol) ? r.port = "80" : /^(http|ws)s$/.test(r.protocol) && (r.port = "443")),
            r.path = r.path || "/";
            let o = r.host.indexOf(":") !== -1 ? "[" + r.host + "]" : r.host;
            return r.id = r.protocol + "://" + o + ":" + r.port + e,
            r.href = r.protocol + "://" + o + (t && t.port === r.port ? "" : ":" + r.port),
            r
        }
        $.url = qs
    }
    );
    var ze = h((Jr,fe)=>{
        try {
            fe.exports = typeof XMLHttpRequest != "undefined" && "withCredentials"in new XMLHttpRequest
        } catch (s) {
            fe.exports = !1
        }
    }
    );
    var U = h(($r,Je)=>{
        Je.exports = (()=>typeof self != "undefined" ? self : typeof window != "undefined" ? window : Function("return this")())()
    }
    );
    var de = h((Gr,$e)=>{
        var Ts = ze()
          , As = U();
        $e.exports = function(s) {
            let e = s.xdomain
              , t = s.xscheme
              , r = s.enablesXDR;
            try {
                if (typeof XMLHttpRequest != "undefined" && (!e || Ts))
                    return new XMLHttpRequest
            } catch (n) {}
            try {
                if (typeof XDomainRequest != "undefined" && !t && r)
                    return new XDomainRequest
            } catch (n) {}
            if (!e)
                try {
                    return new As[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")
                } catch (n) {}
        }
    }
    );
    var me = h((Zr,Ze)=>{
        var T = Object.create(null);
        T.open = "0";
        T.close = "1";
        T.ping = "2";
        T.pong = "3";
        T.message = "4";
        T.upgrade = "5";
        T.noop = "6";
        var Ge = Object.create(null);
        Object.keys(T).forEach(s=>{
            Ge[T[s]] = s
        }
        );
        var Ss = {
            type: "error",
            data: "parser error"
        };
        Ze.exports = {
            PACKET_TYPES: T,
            PACKET_TYPES_REVERSE: Ge,
            ERROR_PACKET: Ss
        }
    }
    );
    var tt = h((Qr,et)=>{
        var {PACKET_TYPES: Bs} = me()
          , Ns = typeof Blob == "function" || typeof Blob != "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]"
          , Os = typeof ArrayBuffer == "function"
          , Rs = s=>typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(s) : s && s.buffer instanceof ArrayBuffer
          , Ps = ({type: s, data: e},t,r)=>Ns && e instanceof Blob ? t ? r(e) : Qe(e, r) : Os && (e instanceof ArrayBuffer || Rs(e)) ? t ? r(e instanceof ArrayBuffer ? e : e.buffer) : Qe(new Blob([e]), r) : r(Bs[s] + (e || ""))
          , Qe = (s,e)=>{
            let t = new FileReader;
            return t.onload = function() {
                let r = t.result.split(",")[1];
                e("b" + r)
            }
            ,
            t.readAsDataURL(s)
        }
        ;
        et.exports = Ps
    }
    );
    var st = h(ye=>{
        (function(s) {
            "use strict";
            ye.encode = function(e) {
                var t = new Uint8Array(e), r, n = t.length, o = "";
                for (r = 0; r < n; r += 3)
                    o += s[t[r] >> 2],
                    o += s[(t[r] & 3) << 4 | t[r + 1] >> 4],
                    o += s[(t[r + 1] & 15) << 2 | t[r + 2] >> 6],
                    o += s[t[r + 2] & 63];
                return n % 3 == 2 ? o = o.substring(0, o.length - 1) + "=" : n % 3 == 1 && (o = o.substring(0, o.length - 2) + "=="),
                o
            }
            ,
            ye.decode = function(e) {
                var t = e.length * .75, r = e.length, n, o = 0, i, u, m, B;
                e[e.length - 1] === "=" && (t--,
                e[e.length - 2] === "=" && t--);
                var a = new ArrayBuffer(t)
                  , c = new Uint8Array(a);
                for (n = 0; n < r; n += 4)
                    i = s.indexOf(e[n]),
                    u = s.indexOf(e[n + 1]),
                    m = s.indexOf(e[n + 2]),
                    B = s.indexOf(e[n + 3]),
                    c[o++] = i << 2 | u >> 4,
                    c[o++] = (u & 15) << 4 | m >> 2,
                    c[o++] = (m & 3) << 6 | B & 63;
                return a
            }
        }
        )("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")
    }
    );
    var it = h((tn,nt)=>{
        var {PACKET_TYPES_REVERSE: ge, ERROR_PACKET: Fs} = me(), Ls = typeof ArrayBuffer == "function", be;
        Ls && (be = st());
        var Is = (s,e)=>{
            if (typeof s != "string")
                return {
                    type: "message",
                    data: rt(s, e)
                };
            let t = s.charAt(0);
            return t === "b" ? {
                type: "message",
                data: Ms(s.substring(1), e)
            } : ge[t] ? s.length > 1 ? {
                type: ge[t],
                data: s.substring(1)
            } : {
                type: ge[t]
            } : Fs
        }
          , Ms = (s,e)=>{
            if (be) {
                let t = be.decode(s);
                return rt(t, e)
            } else
                return {
                    base64: !0,
                    data: s
                }
        }
          , rt = (s,e)=>{
            switch (e) {
            case "blob":
                return s instanceof ArrayBuffer ? new Blob([s]) : s;
            case "arraybuffer":
            default:
                return s
            }
        }
        ;
        nt.exports = Is
    }
    );
    var M = h((sn,ht)=>{
        var ot = tt()
          , ct = it()
          , at = String.fromCharCode(30)
          , Ds = (s,e)=>{
            let t = s.length
              , r = new Array(t)
              , n = 0;
            s.forEach((o,i)=>{
                ot(o, !1, u=>{
                    r[i] = u,
                    ++n === t && e(r.join(at))
                }
                )
            }
            )
        }
          , Hs = (s,e)=>{
            let t = s.split(at)
              , r = [];
            for (let n = 0; n < t.length; n++) {
                let o = ct(t[n], e);
                if (r.push(o),
                o.type === "error")
                    break
            }
            return r
        }
        ;
        ht.exports = {
            protocol: 4,
            encodePacket: ot,
            encodePayload: Ds,
            decodePacket: ct,
            decodePayload: Hs
        }
    }
    );
    var D = h((rn,we)=>{
        typeof we != "undefined" && (we.exports = b);
        function b(s) {
            if (s)
                return js(s)
        }
        function js(s) {
            for (var e in b.prototype)
                s[e] = b.prototype[e];
            return s
        }
        b.prototype.on = b.prototype.addEventListener = function(s, e) {
            return this._callbacks = this._callbacks || {},
            (this._callbacks["$" + s] = this._callbacks["$" + s] || []).push(e),
            this
        }
        ;
        b.prototype.once = function(s, e) {
            function t() {
                this.off(s, t),
                e.apply(this, arguments)
            }
            return t.fn = e,
            this.on(s, t),
            this
        }
        ;
        b.prototype.off = b.prototype.removeListener = b.prototype.removeAllListeners = b.prototype.removeEventListener = function(s, e) {
            if (this._callbacks = this._callbacks || {},
            arguments.length == 0)
                return this._callbacks = {},
                this;
            var t = this._callbacks["$" + s];
            if (!t)
                return this;
            if (arguments.length == 1)
                return delete this._callbacks["$" + s],
                this;
            for (var r, n = 0; n < t.length; n++)
                if (r = t[n],
                r === e || r.fn === e) {
                    t.splice(n, 1);
                    break
                }
            return t.length === 0 && delete this._callbacks["$" + s],
            this
        }
        ;
        b.prototype.emit = function(s) {
            this._callbacks = this._callbacks || {};
            for (var e = new Array(arguments.length - 1), t = this._callbacks["$" + s], r = 1; r < arguments.length; r++)
                e[r - 1] = arguments[r];
            if (t) {
                t = t.slice(0);
                for (var r = 0, n = t.length; r < n; ++r)
                    t[r].apply(this, e)
            }
            return this
        }
        ;
        b.prototype.listeners = function(s) {
            return this._callbacks = this._callbacks || {},
            this._callbacks["$" + s] || []
        }
        ;
        b.prototype.hasListeners = function(s) {
            return !!this.listeners(s).length
        }
    }
    );
    var G = h((nn,lt)=>{
        var Vs = M()
          , Us = D()
          , Ks = _()("engine.io-client:transport")
          , ut = class extends Us {
            constructor(e) {
                super();
                this.opts = e,
                this.query = e.query,
                this.readyState = "",
                this.socket = e.socket
            }
            onError(e, t) {
                let r = new Error(e);
                return r.type = "TransportError",
                r.description = t,
                this.emit("error", r),
                this
            }
            open() {
                return (this.readyState === "closed" || this.readyState === "") && (this.readyState = "opening",
                this.doOpen()),
                this
            }
            close() {
                return (this.readyState === "opening" || this.readyState === "open") && (this.doClose(),
                this.onClose()),
                this
            }
            send(e) {
                this.readyState === "open" ? this.write(e) : Ks("transport is not open, discarding packets")
            }
            onOpen() {
                this.readyState = "open",
                this.writable = !0,
                this.emit("open")
            }
            onData(e) {
                let t = Vs.decodePacket(e, this.socket.binaryType);
                this.onPacket(t)
            }
            onPacket(e) {
                this.emit("packet", e)
            }
            onClose() {
                this.readyState = "closed",
                this.emit("close")
            }
        }
        ;
        lt.exports = ut
    }
    );
    var Z = h(Ce=>{
        Ce.encode = function(s) {
            var e = "";
            for (var t in s)
                s.hasOwnProperty(t) && (e.length && (e += "&"),
                e += encodeURIComponent(t) + "=" + encodeURIComponent(s[t]));
            return e
        }
        ;
        Ce.decode = function(s) {
            for (var e = {}, t = s.split("&"), r = 0, n = t.length; r < n; r++) {
                var o = t[r].split("=");
                e[decodeURIComponent(o[0])] = decodeURIComponent(o[1])
            }
            return e
        }
    }
    );
    var Ee = h((cn,yt)=>{
        "use strict";
        var pt = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), Q = 64, ft = {}, dt = 0, S = 0, mt;
        function ke(s) {
            var e = "";
            do
                e = pt[s % Q] + e,
                s = Math.floor(s / Q);
            while (s > 0);
            return e
        }
        function Xs(s) {
            var e = 0;
            for (S = 0; S < s.length; S++)
                e = e * Q + ft[s.charAt(S)];
            return e
        }
        function ve() {
            var s = ke(+new Date);
            return s !== mt ? (dt = 0,
            mt = s) : s + "." + ke(dt++)
        }
        for (; S < Q; S++)
            ft[pt[S]] = S;
        ve.encode = ke;
        ve.decode = Xs;
        yt.exports = ve
    }
    );
    var _e = h((an,wt)=>{
        var Ys = G()
          , Ws = Z()
          , gt = M()
          , zs = Ee()
          , x = _()("engine.io-client:polling")
          , bt = class extends Ys {
            get name() {
                return "polling"
            }
            doOpen() {
                this.poll()
            }
            pause(e) {
                this.readyState = "pausing";
                let t = ()=>{
                    x("paused"),
                    this.readyState = "paused",
                    e()
                }
                ;
                if (this.polling || !this.writable) {
                    let r = 0;
                    this.polling && (x("we are currently polling - waiting to pause"),
                    r++,
                    this.once("pollComplete", function() {
                        x("pre-pause polling complete"),
                        --r || t()
                    })),
                    this.writable || (x("we are currently writing - waiting to pause"),
                    r++,
                    this.once("drain", function() {
                        x("pre-pause writing complete"),
                        --r || t()
                    }))
                } else
                    t()
            }
            poll() {
                x("polling"),
                this.polling = !0,
                this.doPoll(),
                this.emit("poll")
            }
            onData(e) {
                x("polling got data %s", e);
                let t = r=>{
                    if (this.readyState === "opening" && r.type === "open" && this.onOpen(),
                    r.type === "close")
                        return this.onClose(),
                        !1;
                    this.onPacket(r)
                }
                ;
                gt.decodePayload(e, this.socket.binaryType).forEach(t),
                this.readyState !== "closed" && (this.polling = !1,
                this.emit("pollComplete"),
                this.readyState === "open" ? this.poll() : x('ignoring poll - transport state "%s"', this.readyState))
            }
            doClose() {
                let e = ()=>{
                    x("writing close packet"),
                    this.write([{
                        type: "close"
                    }])
                }
                ;
                this.readyState === "open" ? (x("transport open - closing"),
                e()) : (x("transport not open - deferring close"),
                this.once("open", e))
            }
            write(e) {
                this.writable = !1,
                gt.encodePayload(e, t=>{
                    this.doWrite(t, ()=>{
                        this.writable = !0,
                        this.emit("drain")
                    }
                    )
                }
                )
            }
            uri() {
                let e = this.query || {}
                  , t = this.opts.secure ? "https" : "http"
                  , r = "";
                this.opts.timestampRequests !== !1 && (e[this.opts.timestampParam] = zs()),
                !this.supportsBinary && !e.sid && (e.b64 = 1),
                e = Ws.encode(e),
                this.opts.port && (t === "https" && Number(this.opts.port) !== 443 || t === "http" && Number(this.opts.port) !== 80) && (r = ":" + this.opts.port),
                e.length && (e = "?" + e);
                let n = this.opts.hostname.indexOf(":") !== -1;
                return t + "://" + (n ? "[" + this.opts.hostname + "]" : this.opts.hostname) + r + this.opts.path + e
            }
        }
        ;
        wt.exports = bt
    }
    );
    var xe = h((hn,Ct)=>{
        Ct.exports.pick = (s,...e)=>e.reduce((t,r)=>(s.hasOwnProperty(r) && (t[r] = s[r]),
        t), {})
    }
    );
    var xt = h((un,Te)=>{
        var kt = de()
          , Js = _e()
          , $s = D()
          , {pick: Gs} = xe()
          , Zs = U()
          , qe = _()("engine.io-client:polling-xhr");
        function vt() {}
        var Qs = function() {
            return new kt({
                xdomain: !1
            }).responseType != null
        }()
          , Et = class extends Js {
            constructor(e) {
                super(e);
                if (typeof location != "undefined") {
                    let r = location.protocol === "https:"
                      , n = location.port;
                    n || (n = r ? 443 : 80),
                    this.xd = typeof location != "undefined" && e.hostname !== location.hostname || n !== e.port,
                    this.xs = e.secure !== r
                }
                let t = e && e.forceBase64;
                this.supportsBinary = Qs && !t
            }
            request(e={}) {
                return Object.assign(e, {
                    xd: this.xd,
                    xs: this.xs
                }, this.opts),
                new k(this.uri(),e)
            }
            doWrite(e, t) {
                let r = this.request({
                    method: "POST",
                    data: e
                });
                r.on("success", t),
                r.on("error", n=>{
                    this.onError("xhr post error", n)
                }
                )
            }
            doPoll() {
                qe("xhr poll");
                let e = this.request();
                e.on("data", this.onData.bind(this)),
                e.on("error", t=>{
                    this.onError("xhr poll error", t)
                }
                ),
                this.pollXhr = e
            }
        }
          , k = class extends $s {
            constructor(e, t) {
                super();
                this.opts = t,
                this.method = t.method || "GET",
                this.uri = e,
                this.async = t.async !== !1,
                this.data = t.data !== void 0 ? t.data : null,
                this.create()
            }
            create() {
                let e = Gs(this.opts, "agent", "enablesXDR", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
                e.xdomain = !!this.opts.xd,
                e.xscheme = !!this.opts.xs;
                let t = this.xhr = new kt(e);
                try {
                    qe("xhr open %s: %s", this.method, this.uri),
                    t.open(this.method, this.uri, this.async);
                    try {
                        if (this.opts.extraHeaders) {
                            t.setDisableHeaderCheck && t.setDisableHeaderCheck(!0);
                            for (let r in this.opts.extraHeaders)
                                this.opts.extraHeaders.hasOwnProperty(r) && t.setRequestHeader(r, this.opts.extraHeaders[r])
                        }
                    } catch (r) {}
                    if (this.method === "POST")
                        try {
                            t.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
                        } catch (r) {}
                    try {
                        t.setRequestHeader("Accept", "*/*")
                    } catch (r) {}
                    "withCredentials"in t && (t.withCredentials = this.opts.withCredentials),
                    this.opts.requestTimeout && (t.timeout = this.opts.requestTimeout),
                    this.hasXDR() ? (t.onload = ()=>{
                        this.onLoad()
                    }
                    ,
                    t.onerror = ()=>{
                        this.onError(t.responseText)
                    }
                    ) : t.onreadystatechange = ()=>{
                        t.readyState === 4 && (t.status === 200 || t.status === 1223 ? this.onLoad() : setTimeout(()=>{
                            this.onError(typeof t.status == "number" ? t.status : 0)
                        }
                        , 0))
                    }
                    ,
                    qe("xhr data %s", this.data),
                    t.send(this.data)
                } catch (r) {
                    setTimeout(()=>{
                        this.onError(r)
                    }
                    , 0);
                    return
                }
                typeof document != "undefined" && (this.index = k.requestsCount++,
                k.requests[this.index] = this)
            }
            onSuccess() {
                this.emit("success"),
                this.cleanup()
            }
            onData(e) {
                this.emit("data", e),
                this.onSuccess()
            }
            onError(e) {
                this.emit("error", e),
                this.cleanup(!0)
            }
            cleanup(e) {
                if (!(typeof this.xhr == "undefined" || this.xhr === null)) {
                    if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = vt : this.xhr.onreadystatechange = vt,
                    e)
                        try {
                            this.xhr.abort()
                        } catch (t) {}
                    typeof document != "undefined" && delete k.requests[this.index],
                    this.xhr = null
                }
            }
            onLoad() {
                let e = this.xhr.responseText;
                e !== null && this.onData(e)
            }
            hasXDR() {
                return typeof XDomainRequest != "undefined" && !this.xs && this.enablesXDR
            }
            abort() {
                this.cleanup()
            }
        }
        ;
        k.requestsCount = 0;
        k.requests = {};
        if (typeof document != "undefined") {
            if (typeof attachEvent == "function")
                attachEvent("onunload", _t);
            else if (typeof addEventListener == "function") {
                let s = "onpagehide"in Zs ? "pagehide" : "unload";
                addEventListener(s, _t, !1)
            }
        }
        function _t() {
            for (let s in k.requests)
                k.requests.hasOwnProperty(s) && k.requests[s].abort()
        }
        Te.exports = Et;
        Te.exports.Request = k
    }
    );
    var St = h((ln,At)=>{
        var er = _e(), qt = U(), tr = /\n/g, sr = /\\n/g, ee, Tt = class extends er {
            constructor(e) {
                super(e);
                this.query = this.query || {},
                ee || (ee = qt.___eio = qt.___eio || []),
                this.index = ee.length,
                ee.push(this.onData.bind(this)),
                this.query.j = this.index
            }
            get supportsBinary() {
                return !1
            }
            doClose() {
                this.script && (this.script.onerror = ()=>{}
                ,
                this.script.parentNode.removeChild(this.script),
                this.script = null),
                this.form && (this.form.parentNode.removeChild(this.form),
                this.form = null,
                this.iframe = null),
                super.doClose()
            }
            doPoll() {
                let e = document.createElement("script");
                this.script && (this.script.parentNode.removeChild(this.script),
                this.script = null),
                e.async = !0,
                e.src = this.uri(),
                e.onerror = n=>{
                    this.onError("jsonp poll error", n)
                }
                ;
                let t = document.getElementsByTagName("script")[0];
                t ? t.parentNode.insertBefore(e, t) : (document.head || document.body).appendChild(e),
                this.script = e,
                typeof navigator != "undefined" && /gecko/i.test(navigator.userAgent) && setTimeout(function() {
                    let n = document.createElement("iframe");
                    document.body.appendChild(n),
                    document.body.removeChild(n)
                }, 100)
            }
            doWrite(e, t) {
                let r;
                if (!this.form) {
                    let i = document.createElement("form")
                      , u = document.createElement("textarea")
                      , m = this.iframeId = "eio_iframe_" + this.index;
                    i.className = "socketio",
                    i.style.position = "absolute",
                    i.style.top = "-1000px",
                    i.style.left = "-1000px",
                    i.target = m,
                    i.method = "POST",
                    i.setAttribute("accept-charset", "utf-8"),
                    u.name = "d",
                    i.appendChild(u),
                    document.body.appendChild(i),
                    this.form = i,
                    this.area = u
                }
                this.form.action = this.uri();
                function n() {
                    o(),
                    t()
                }
                let o = ()=>{
                    if (this.iframe)
                        try {
                            this.form.removeChild(this.iframe)
                        } catch (i) {
                            this.onError("jsonp polling iframe removal error", i)
                        }
                    try {
                        let i = '<iframe src="javascript:0" name="' + this.iframeId + '">';
                        r = document.createElement(i)
                    } catch (i) {
                        r = document.createElement("iframe"),
                        r.name = this.iframeId,
                        r.src = "javascript:0"
                    }
                    r.id = this.iframeId,
                    this.form.appendChild(r),
                    this.iframe = r
                }
                ;
                o(),
                e = e.replace(sr, `\\
`),
                this.area.value = e.replace(tr, "\\n");
                try {
                    this.form.submit()
                } catch (i) {}
                this.iframe.attachEvent ? this.iframe.onreadystatechange = ()=>{
                    this.iframe.readyState === "complete" && n()
                }
                : this.iframe.onload = n
            }
        }
        ;
        At.exports = Tt
    }
    );
    var Ot = h((pn,Nt)=>{
        var Bt = U();
        Nt.exports = {
            WebSocket: Bt.WebSocket || Bt.MozWebSocket,
            usingBrowserWebSocket: !0,
            defaultBinaryType: "arraybuffer"
        }
    }
    );
    var Lt = h((fn,Ft)=>{
        var Rt = G()
          , rr = M()
          , nr = Z()
          , ir = Ee()
          , {pick: or} = xe()
          , {WebSocket: K, usingBrowserWebSocket: Ae, defaultBinaryType: cr} = Ot()
          , ar = _()("engine.io-client:websocket")
          , Pt = typeof navigator != "undefined" && typeof navigator.product == "string" && navigator.product.toLowerCase() === "reactnative"
          , te = class extends Rt {
            constructor(e) {
                super(e);
                this.supportsBinary = !e.forceBase64
            }
            get name() {
                return "websocket"
            }
            doOpen() {
                if (!this.check())
                    return;
                let e = this.uri()
                  , t = this.opts.protocols
                  , r = Pt ? {} : or(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
                this.opts.extraHeaders && (r.headers = this.opts.extraHeaders);
                try {
                    this.ws = Ae && !Pt ? t ? new K(e,t) : new K(e) : new K(e,t,r)
                } catch (n) {
                    return this.emit("error", n)
                }
                this.ws.binaryType = this.socket.binaryType || cr,
                this.addEventListeners()
            }
            addEventListeners() {
                this.ws.onopen = ()=>{
                    this.opts.autoUnref && this.ws._socket.unref(),
                    this.onOpen()
                }
                ,
                this.ws.onclose = this.onClose.bind(this),
                this.ws.onmessage = e=>this.onData(e.data),
                this.ws.onerror = e=>this.onError("websocket error", e)
            }
            write(e) {
                this.writable = !1;
                for (let t = 0; t < e.length; t++) {
                    let r = e[t]
                      , n = t === e.length - 1;
                    rr.encodePacket(r, this.supportsBinary, o=>{
                        let i = {};
                        Ae || (r.options && (i.compress = r.options.compress),
                        this.opts.perMessageDeflate && (typeof o == "string" ? Buffer.byteLength(o) : o.length) < this.opts.perMessageDeflate.threshold && (i.compress = !1));
                        try {
                            Ae ? this.ws.send(o) : this.ws.send(o, i)
                        } catch (u) {
                            ar("websocket closed before onclose event")
                        }
                        n && setTimeout(()=>{
                            this.writable = !0,
                            this.emit("drain")
                        }
                        , 0)
                    }
                    )
                }
            }
            onClose() {
                Rt.prototype.onClose.call(this)
            }
            doClose() {
                typeof this.ws != "undefined" && (this.ws.close(),
                this.ws = null)
            }
            uri() {
                let e = this.query || {}
                  , t = this.opts.secure ? "wss" : "ws"
                  , r = "";
                this.opts.port && (t === "wss" && Number(this.opts.port) !== 443 || t === "ws" && Number(this.opts.port) !== 80) && (r = ":" + this.opts.port),
                this.opts.timestampRequests && (e[this.opts.timestampParam] = ir()),
                this.supportsBinary || (e.b64 = 1),
                e = nr.encode(e),
                e.length && (e = "?" + e);
                let n = this.opts.hostname.indexOf(":") !== -1;
                return t + "://" + (n ? "[" + this.opts.hostname + "]" : this.opts.hostname) + r + this.opts.path + e
            }
            check() {
                return !!K && !("__initialize"in K && this.name === te.prototype.name)
            }
        }
        ;
        Ft.exports = te
    }
    );
    var Be = h(Se=>{
        var hr = de()
          , ur = xt()
          , lr = St()
          , pr = Lt();
        Se.polling = fr;
        Se.websocket = pr;
        function fr(s) {
            let e, t = !1, r = !1, n = s.jsonp !== !1;
            if (typeof location != "undefined") {
                let o = location.protocol === "https:"
                  , i = location.port;
                i || (i = o ? 443 : 80),
                t = s.hostname !== location.hostname || i !== s.port,
                r = s.secure !== o
            }
            if (s.xdomain = t,
            s.xscheme = r,
            e = new hr(s),
            "open"in e && !s.forceJSONP)
                return new ur(s);
            if (!n)
                throw new Error("JSONP disabled");
            return new lr(s)
        }
    }
    );
    var Ht = h((mn,Dt)=>{
        var dr = Be()
          , mr = D()
          , p = _()("engine.io-client:socket")
          , It = M()
          , Mt = pe()
          , yr = Z()
          , A = class extends mr {
            constructor(e, t={}) {
                super();
                e && typeof e == "object" && (t = e,
                e = null),
                e ? (e = Mt(e),
                t.hostname = e.host,
                t.secure = e.protocol === "https" || e.protocol === "wss",
                t.port = e.port,
                e.query && (t.query = e.query)) : t.host && (t.hostname = Mt(t.host).host),
                this.secure = t.secure != null ? t.secure : typeof location != "undefined" && location.protocol === "https:",
                t.hostname && !t.port && (t.port = this.secure ? "443" : "80"),
                this.hostname = t.hostname || (typeof location != "undefined" ? location.hostname : "localhost"),
                this.port = t.port || (typeof location != "undefined" && location.port ? location.port : this.secure ? 443 : 80),
                this.transports = t.transports || ["polling", "websocket"],
                this.readyState = "",
                this.writeBuffer = [],
                this.prevBufferLen = 0,
                this.opts = Object.assign({
                    path: "/engine.io",
                    agent: !1,
                    withCredentials: !1,
                    upgrade: !0,
                    jsonp: !0,
                    timestampParam: "t",
                    rememberUpgrade: !1,
                    rejectUnauthorized: !0,
                    perMessageDeflate: {
                        threshold: 1024
                    },
                    transportOptions: {},
                    closeOnBeforeunload: !0
                }, t),
                this.opts.path = this.opts.path.replace(/\/$/, "") + "/",
                typeof this.opts.query == "string" && (this.opts.query = yr.decode(this.opts.query)),
                this.id = null,
                this.upgrades = null,
                this.pingInterval = null,
                this.pingTimeout = null,
                this.pingTimeoutTimer = null,
                typeof addEventListener == "function" && (this.opts.closeOnBeforeunload && addEventListener("beforeunload", ()=>{
                    this.transport && (this.transport.removeAllListeners(),
                    this.transport.close())
                }
                , !1),
                this.hostname !== "localhost" && (this.offlineEventListener = ()=>{
                    this.onClose("transport close")
                }
                ,
                addEventListener("offline", this.offlineEventListener, !1))),
                this.open()
            }
            createTransport(e) {
                p('creating transport "%s"', e);
                let t = gr(this.opts.query);
                t.EIO = It.protocol,
                t.transport = e,
                this.id && (t.sid = this.id);
                let r = Object.assign({}, this.opts.transportOptions[e], this.opts, {
                    query: t,
                    socket: this,
                    hostname: this.hostname,
                    secure: this.secure,
                    port: this.port
                });
                return p("options: %j", r),
                new dr[e](r)
            }
            open() {
                let e;
                if (this.opts.rememberUpgrade && A.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1)
                    e = "websocket";
                else if (this.transports.length === 0) {
                    setTimeout(()=>{
                        this.emit("error", "No transports available")
                    }
                    , 0);
                    return
                } else
                    e = this.transports[0];
                this.readyState = "opening";
                try {
                    e = this.createTransport(e)
                } catch (t) {
                    p("error while creating transport: %s", t),
                    this.transports.shift(),
                    this.open();
                    return
                }
                e.open(),
                this.setTransport(e)
            }
            setTransport(e) {
                p("setting transport %s", e.name),
                this.transport && (p("clearing existing transport %s", this.transport.name),
                this.transport.removeAllListeners()),
                this.transport = e,
                e.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", ()=>{
                    this.onClose("transport close")
                }
                )
            }
            probe(e) {
                p('probing transport "%s"', e);
                let t = this.createTransport(e, {
                    probe: 1
                })
                  , r = !1;
                A.priorWebsocketSuccess = !1;
                let n = ()=>{
                    r || (p('probe transport "%s" opened', e),
                    t.send([{
                        type: "ping",
                        data: "probe"
                    }]),
                    t.once("packet", c=>{
                        if (!r)
                            if (c.type === "pong" && c.data === "probe") {
                                if (p('probe transport "%s" pong', e),
                                this.upgrading = !0,
                                this.emit("upgrading", t),
                                !t)
                                    return;
                                A.priorWebsocketSuccess = t.name === "websocket",
                                p('pausing current transport "%s"', this.transport.name),
                                this.transport.pause(()=>{
                                    r || this.readyState !== "closed" && (p("changing transport and sending upgrade packet"),
                                    a(),
                                    this.setTransport(t),
                                    t.send([{
                                        type: "upgrade"
                                    }]),
                                    this.emit("upgrade", t),
                                    t = null,
                                    this.upgrading = !1,
                                    this.flush())
                                }
                                )
                            } else {
                                p('probe transport "%s" failed', e);
                                let l = new Error("probe error");
                                l.transport = t.name,
                                this.emit("upgradeError", l)
                            }
                    }
                    ))
                }
                ;
                function o() {
                    r || (r = !0,
                    a(),
                    t.close(),
                    t = null)
                }
                let i = c=>{
                    let l = new Error("probe error: " + c);
                    l.transport = t.name,
                    o(),
                    p('probe transport "%s" failed because of error: %s', e, c),
                    this.emit("upgradeError", l)
                }
                ;
                function u() {
                    i("transport closed")
                }
                function m() {
                    i("socket closed")
                }
                function B(c) {
                    t && c.name !== t.name && (p('"%s" works - aborting "%s"', c.name, t.name),
                    o())
                }
                let a = ()=>{
                    t.removeListener("open", n),
                    t.removeListener("error", i),
                    t.removeListener("close", u),
                    this.removeListener("close", m),
                    this.removeListener("upgrading", B)
                }
                ;
                t.once("open", n),
                t.once("error", i),
                t.once("close", u),
                this.once("close", m),
                this.once("upgrading", B),
                t.open()
            }
            onOpen() {
                if (p("socket open"),
                this.readyState = "open",
                A.priorWebsocketSuccess = this.transport.name === "websocket",
                this.emit("open"),
                this.flush(),
                this.readyState === "open" && this.opts.upgrade && this.transport.pause) {
                    p("starting upgrade probes");
                    let e = 0
                      , t = this.upgrades.length;
                    for (; e < t; e++)
                        this.probe(this.upgrades[e])
                }
            }
            onPacket(e) {
                if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing")
                    switch (p('socket receive: type "%s", data "%s"', e.type, e.data),
                    this.emit("packet", e),
                    this.emit("heartbeat"),
                    e.type) {
                    case "open":
                        this.onHandshake(JSON.parse(e.data));
                        break;
                    case "ping":
                        this.resetPingTimeout(),
                        this.sendPacket("pong"),
                        this.emit("pong");
                        break;
                    case "error":
                        let t = new Error("server error");
                        t.code = e.data,
                        this.onError(t);
                        break;
                    case "message":
                        this.emit("data", e.data),
                        this.emit("message", e.data);
                        break
                    }
                else
                    p('packet received with socket readyState "%s"', this.readyState)
            }
            onHandshake(e) {
                this.emit("handshake", e),
                this.id = e.sid,
                this.transport.query.sid = e.sid,
                this.upgrades = this.filterUpgrades(e.upgrades),
                this.pingInterval = e.pingInterval,
                this.pingTimeout = e.pingTimeout,
                this.onOpen(),
                this.readyState !== "closed" && this.resetPingTimeout()
            }
            resetPingTimeout() {
                clearTimeout(this.pingTimeoutTimer),
                this.pingTimeoutTimer = setTimeout(()=>{
                    this.onClose("ping timeout")
                }
                , this.pingInterval + this.pingTimeout),
                this.opts.autoUnref && this.pingTimeoutTimer.unref()
            }
            onDrain() {
                this.writeBuffer.splice(0, this.prevBufferLen),
                this.prevBufferLen = 0,
                this.writeBuffer.length === 0 ? this.emit("drain") : this.flush()
            }
            flush() {
                this.readyState !== "closed" && this.transport.writable && !this.upgrading && this.writeBuffer.length && (p("flushing %d packets in socket", this.writeBuffer.length),
                this.transport.send(this.writeBuffer),
                this.prevBufferLen = this.writeBuffer.length,
                this.emit("flush"))
            }
            write(e, t, r) {
                return this.sendPacket("message", e, t, r),
                this
            }
            send(e, t, r) {
                return this.sendPacket("message", e, t, r),
                this
            }
            sendPacket(e, t, r, n) {
                if (typeof t == "function" && (n = t,
                t = void 0),
                typeof r == "function" && (n = r,
                r = null),
                this.readyState === "closing" || this.readyState === "closed")
                    return;
                r = r || {},
                r.compress = r.compress !== !1;
                let o = {
                    type: e,
                    data: t,
                    options: r
                };
                this.emit("packetCreate", o),
                this.writeBuffer.push(o),
                n && this.once("flush", n),
                this.flush()
            }
            close() {
                let e = ()=>{
                    this.onClose("forced close"),
                    p("socket closing - telling transport to close"),
                    this.transport.close()
                }
                  , t = ()=>{
                    this.removeListener("upgrade", t),
                    this.removeListener("upgradeError", t),
                    e()
                }
                  , r = ()=>{
                    this.once("upgrade", t),
                    this.once("upgradeError", t)
                }
                ;
                return (this.readyState === "opening" || this.readyState === "open") && (this.readyState = "closing",
                this.writeBuffer.length ? this.once("drain", ()=>{
                    this.upgrading ? r() : e()
                }
                ) : this.upgrading ? r() : e()),
                this
            }
            onError(e) {
                p("socket error %j", e),
                A.priorWebsocketSuccess = !1,
                this.emit("error", e),
                this.onClose("transport error", e)
            }
            onClose(e, t) {
                (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing") && (p('socket close with reason: "%s"', e),
                clearTimeout(this.pingIntervalTimer),
                clearTimeout(this.pingTimeoutTimer),
                this.transport.removeAllListeners("close"),
                this.transport.close(),
                this.transport.removeAllListeners(),
                typeof removeEventListener == "function" && removeEventListener("offline", this.offlineEventListener, !1),
                this.readyState = "closed",
                this.id = null,
                this.emit("close", e, t),
                this.writeBuffer = [],
                this.prevBufferLen = 0)
            }
            filterUpgrades(e) {
                let t = []
                  , r = 0
                  , n = e.length;
                for (; r < n; r++)
                    ~this.transports.indexOf(e[r]) && t.push(e[r]);
                return t
            }
        }
        ;
        A.priorWebsocketSuccess = !1;
        A.protocol = It.protocol;
        function gr(s) {
            let e = {};
            for (let t in s)
                s.hasOwnProperty(t) && (e[t] = s[t]);
            return e
        }
        Dt.exports = A
    }
    );
    var jt = h((yn,R)=>{
        var Ne = Ht();
        R.exports = (s,e)=>new Ne(s,e);
        R.exports.Socket = Ne;
        R.exports.protocol = Ne.protocol;
        R.exports.Transport = G();
        R.exports.transports = Be();
        R.exports.parser = M()
    }
    );
    var Oe = h(H=>{
        "use strict";
        Object.defineProperty(H, "__esModule", {
            value: !0
        });
        H.hasBinary = H.isBinary = void 0;
        var br = typeof ArrayBuffer == "function"
          , wr = s=>typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(s) : s.buffer instanceof ArrayBuffer
          , Vt = Object.prototype.toString
          , Cr = typeof Blob == "function" || typeof Blob != "undefined" && Vt.call(Blob) === "[object BlobConstructor]"
          , kr = typeof File == "function" || typeof File != "undefined" && Vt.call(File) === "[object FileConstructor]";
        function Ut(s) {
            return br && (s instanceof ArrayBuffer || wr(s)) || Cr && s instanceof Blob || kr && s instanceof File
        }
        H.isBinary = Ut;
        function se(s, e) {
            if (!s || typeof s != "object")
                return !1;
            if (Array.isArray(s)) {
                for (let t = 0, r = s.length; t < r; t++)
                    if (se(s[t]))
                        return !0;
                return !1
            }
            if (Ut(s))
                return !0;
            if (s.toJSON && typeof s.toJSON == "function" && arguments.length === 1)
                return se(s.toJSON(), !0);
            for (let t in s)
                if (Object.prototype.hasOwnProperty.call(s, t) && se(s[t]))
                    return !0;
            return !1
        }
        H.hasBinary = se
    }
    );
    var Kt = h(j=>{
        "use strict";
        Object.defineProperty(j, "__esModule", {
            value: !0
        });
        j.reconstructPacket = j.deconstructPacket = void 0;
        var vr = Oe();
        function Er(s) {
            let e = []
              , t = s.data
              , r = s;
            return r.data = Re(t, e),
            r.attachments = e.length,
            {
                packet: r,
                buffers: e
            }
        }
        j.deconstructPacket = Er;
        function Re(s, e) {
            if (!s)
                return s;
            if (vr.isBinary(s)) {
                let t = {
                    _placeholder: !0,
                    num: e.length
                };
                return e.push(s),
                t
            } else if (Array.isArray(s)) {
                let t = new Array(s.length);
                for (let r = 0; r < s.length; r++)
                    t[r] = Re(s[r], e);
                return t
            } else if (typeof s == "object" && !(s instanceof Date)) {
                let t = {};
                for (let r in s)
                    s.hasOwnProperty(r) && (t[r] = Re(s[r], e));
                return t
            }
            return s
        }
        function _r(s, e) {
            return s.data = Pe(s.data, e),
            s.attachments = void 0,
            s
        }
        j.reconstructPacket = _r;
        function Pe(s, e) {
            if (!s)
                return s;
            if (s && s._placeholder)
                return e[s.num];
            if (Array.isArray(s))
                for (let t = 0; t < s.length; t++)
                    s[t] = Pe(s[t], e);
            else if (typeof s == "object")
                for (let t in s)
                    s.hasOwnProperty(t) && (s[t] = Pe(s[t], e));
            return s
        }
    }
    );
    var ne = h(q=>{
        "use strict";
        Object.defineProperty(q, "__esModule", {
            value: !0
        });
        q.Decoder = q.Encoder = q.PacketType = q.protocol = void 0;
        var xr = D()
          , Xt = Kt()
          , Yt = Oe()
          , Fe = _()("socket.io-parser");
        q.protocol = 5;
        var f;
        (function(s) {
            s[s.CONNECT = 0] = "CONNECT",
            s[s.DISCONNECT = 1] = "DISCONNECT",
            s[s.EVENT = 2] = "EVENT",
            s[s.ACK = 3] = "ACK",
            s[s.CONNECT_ERROR = 4] = "CONNECT_ERROR",
            s[s.BINARY_EVENT = 5] = "BINARY_EVENT",
            s[s.BINARY_ACK = 6] = "BINARY_ACK"
        }
        )(f = q.PacketType || (q.PacketType = {}));
        var Wt = class {
            encode(e) {
                return Fe("encoding packet %j", e),
                (e.type === f.EVENT || e.type === f.ACK) && Yt.hasBinary(e) ? (e.type = e.type === f.EVENT ? f.BINARY_EVENT : f.BINARY_ACK,
                this.encodeAsBinary(e)) : [this.encodeAsString(e)]
            }
            encodeAsString(e) {
                let t = "" + e.type;
                return (e.type === f.BINARY_EVENT || e.type === f.BINARY_ACK) && (t += e.attachments + "-"),
                e.nsp && e.nsp !== "/" && (t += e.nsp + ","),
                e.id != null && (t += e.id),
                e.data != null && (t += JSON.stringify(e.data)),
                Fe("encoded %j as %s", e, t),
                t
            }
            encodeAsBinary(e) {
                let t = Xt.deconstructPacket(e)
                  , r = this.encodeAsString(t.packet)
                  , n = t.buffers;
                return n.unshift(r),
                n
            }
        }
        ;
        q.Encoder = Wt;
        var re = class extends xr {
            constructor() {
                super()
            }
            add(e) {
                let t;
                if (typeof e == "string")
                    t = this.decodeString(e),
                    t.type === f.BINARY_EVENT || t.type === f.BINARY_ACK ? (this.reconstructor = new zt(t),
                    t.attachments === 0 && super.emit("decoded", t)) : super.emit("decoded", t);
                else if (Yt.isBinary(e) || e.base64)
                    if (this.reconstructor)
                        t = this.reconstructor.takeBinaryData(e),
                        t && (this.reconstructor = null,
                        super.emit("decoded", t));
                    else
                        throw new Error("got binary data when not reconstructing a packet");
                else
                    throw new Error("Unknown type: " + e)
            }
            decodeString(e) {
                let t = 0
                  , r = {
                    type: Number(e.charAt(0))
                };
                if (f[r.type] === void 0)
                    throw new Error("unknown packet type " + r.type);
                if (r.type === f.BINARY_EVENT || r.type === f.BINARY_ACK) {
                    let o = t + 1;
                    for (; e.charAt(++t) !== "-" && t != e.length; )
                        ;
                    let i = e.substring(o, t);
                    if (i != Number(i) || e.charAt(t) !== "-")
                        throw new Error("Illegal attachments");
                    r.attachments = Number(i)
                }
                if (e.charAt(t + 1) === "/") {
                    let o = t + 1;
                    for (; ++t && !(e.charAt(t) === "," || t === e.length); )
                        ;
                    r.nsp = e.substring(o, t)
                } else
                    r.nsp = "/";
                let n = e.charAt(t + 1);
                if (n !== "" && Number(n) == n) {
                    let o = t + 1;
                    for (; ++t; ) {
                        let i = e.charAt(t);
                        if (i == null || Number(i) != i) {
                            --t;
                            break
                        }
                        if (t === e.length)
                            break
                    }
                    r.id = Number(e.substring(o, t + 1))
                }
                if (e.charAt(++t)) {
                    let o = qr(e.substr(t));
                    if (re.isPayloadValid(r.type, o))
                        r.data = o;
                    else
                        throw new Error("invalid payload")
                }
                return Fe("decoded %s as %j", e, r),
                r
            }
            static isPayloadValid(e, t) {
                switch (e) {
                case f.CONNECT:
                    return typeof t == "object";
                case f.DISCONNECT:
                    return t === void 0;
                case f.CONNECT_ERROR:
                    return typeof t == "string" || typeof t == "object";
                case f.EVENT:
                case f.BINARY_EVENT:
                    return Array.isArray(t) && t.length > 0;
                case f.ACK:
                case f.BINARY_ACK:
                    return Array.isArray(t)
                }
            }
            destroy() {
                this.reconstructor && this.reconstructor.finishedReconstruction()
            }
        }
        ;
        q.Decoder = re;
        function qr(s) {
            try {
                return JSON.parse(s)
            } catch (e) {
                return !1
            }
        }
        var zt = class {
            constructor(e) {
                this.packet = e,
                this.buffers = [],
                this.reconPack = e
            }
            takeBinaryData(e) {
                if (this.buffers.push(e),
                this.buffers.length === this.reconPack.attachments) {
                    let t = Xt.reconstructPacket(this.reconPack, this.buffers);
                    return this.finishedReconstruction(),
                    t
                }
                return null
            }
            finishedReconstruction() {
                this.reconPack = null,
                this.buffers = []
            }
        }
    }
    );
    var Le = h(ie=>{
        "use strict";
        Object.defineProperty(ie, "__esModule", {
            value: !0
        });
        ie.on = void 0;
        function Tr(s, e, t) {
            return s.on(e, t),
            function() {
                s.off(e, t)
            }
        }
        ie.on = Tr
    }
    );
    var Ie = h(oe=>{
        "use strict";
        Object.defineProperty(oe, "__esModule", {
            value: !0
        });
        oe.StrictEventEmitter = void 0;
        var Ar = D()
          , Jt = class extends Ar {
            on(e, t) {
                return super.on(e, t),
                this
            }
            once(e, t) {
                return super.once(e, t),
                this
            }
            emit(e, ...t) {
                return super.emit(e, ...t),
                this
            }
            emitReserved(e, ...t) {
                return super.emit(e, ...t),
                this
            }
            listeners(e) {
                return super.listeners(e)
            }
        }
        ;
        oe.StrictEventEmitter = Jt
    }
    );
    var Me = h(ae=>{
        "use strict";
        Object.defineProperty(ae, "__esModule", {
            value: !0
        });
        ae.Socket = void 0;
        var v = ne()
          , ce = Le()
          , Sr = Ie()
          , E = _()("socket.io-client:socket")
          , Br = Object.freeze({
            connect: 1,
            connect_error: 1,
            disconnect: 1,
            disconnecting: 1,
            newListener: 1,
            removeListener: 1
        })
          , $t = class extends Sr.StrictEventEmitter {
            constructor(e, t, r) {
                super();
                this.receiveBuffer = [],
                this.sendBuffer = [],
                this.ids = 0,
                this.acks = {},
                this.flags = {},
                this.io = e,
                this.nsp = t,
                this.ids = 0,
                this.acks = {},
                this.receiveBuffer = [],
                this.sendBuffer = [],
                this.connected = !1,
                this.disconnected = !0,
                this.flags = {},
                r && r.auth && (this.auth = r.auth),
                this.io._autoConnect && this.open()
            }
            subEvents() {
                if (this.subs)
                    return;
                let e = this.io;
                this.subs = [ce.on(e, "open", this.onopen.bind(this)), ce.on(e, "packet", this.onpacket.bind(this)), ce.on(e, "error", this.onerror.bind(this)), ce.on(e, "close", this.onclose.bind(this))]
            }
            get active() {
                return !!this.subs
            }
            connect() {
                return this.connected ? this : (this.subEvents(),
                this.io._reconnecting || this.io.open(),
                this.io._readyState === "open" && this.onopen(),
                this)
            }
            open() {
                return this.connect()
            }
            send(...e) {
                return e.unshift("message"),
                this.emit.apply(this, e),
                this
            }
            emit(e, ...t) {
                if (Br.hasOwnProperty(e))
                    throw new Error('"' + e + '" is a reserved event name');
                t.unshift(e);
                let r = {
                    type: v.PacketType.EVENT,
                    data: t
                };
                r.options = {},
                r.options.compress = this.flags.compress !== !1,
                typeof t[t.length - 1] == "function" && (E("emitting packet with ack id %d", this.ids),
                this.acks[this.ids] = t.pop(),
                r.id = this.ids++);
                let n = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
                return this.flags.volatile && (!n || !this.connected) ? E("discard packet as the transport is not currently writable") : this.connected ? this.packet(r) : this.sendBuffer.push(r),
                this.flags = {},
                this
            }
            packet(e) {
                e.nsp = this.nsp,
                this.io._packet(e)
            }
            onopen() {
                E("transport is open - connecting"),
                typeof this.auth == "function" ? this.auth(e=>{
                    this.packet({
                        type: v.PacketType.CONNECT,
                        data: e
                    })
                }
                ) : this.packet({
                    type: v.PacketType.CONNECT,
                    data: this.auth
                })
            }
            onerror(e) {
                this.connected || this.emitReserved("connect_error", e)
            }
            onclose(e) {
                E("close (%s)", e),
                this.connected = !1,
                this.disconnected = !0,
                delete this.id,
                this.emitReserved("disconnect", e)
            }
            onpacket(e) {
                if (e.nsp === this.nsp)
                    switch (e.type) {
                    case v.PacketType.CONNECT:
                        if (e.data && e.data.sid) {
                            let n = e.data.sid;
                            this.onconnect(n)
                        } else
                            this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
                        break;
                    case v.PacketType.EVENT:
                        this.onevent(e);
                        break;
                    case v.PacketType.BINARY_EVENT:
                        this.onevent(e);
                        break;
                    case v.PacketType.ACK:
                        this.onack(e);
                        break;
                    case v.PacketType.BINARY_ACK:
                        this.onack(e);
                        break;
                    case v.PacketType.DISCONNECT:
                        this.ondisconnect();
                        break;
                    case v.PacketType.CONNECT_ERROR:
                        let r = new Error(e.data.message);
                        r.data = e.data.data,
                        this.emitReserved("connect_error", r);
                        break
                    }
            }
            onevent(e) {
                let t = e.data || [];
                E("emitting event %j", t),
                e.id != null && (E("attaching ack callback to event"),
                t.push(this.ack(e.id))),
                this.connected ? this.emitEvent(t) : this.receiveBuffer.push(Object.freeze(t))
            }
            emitEvent(e) {
                if (this._anyListeners && this._anyListeners.length) {
                    let t = this._anyListeners.slice();
                    for (let r of t)
                        r.apply(this, e)
                }
                super.emit.apply(this, e)
            }
            ack(e) {
                let t = this
                  , r = !1;
                return function(...n) {
                    r || (r = !0,
                    E("sending ack %j", n),
                    t.packet({
                        type: v.PacketType.ACK,
                        id: e,
                        data: n
                    }))
                }
            }
            onack(e) {
                let t = this.acks[e.id];
                typeof t == "function" ? (E("calling ack %s with %j", e.id, e.data),
                t.apply(this, e.data),
                delete this.acks[e.id]) : E("bad ack %s", e.id)
            }
            onconnect(e) {
                E("socket connected with id %s", e),
                this.id = e,
                this.connected = !0,
                this.disconnected = !1,
                this.emitBuffered(),
                this.emitReserved("connect")
            }
            emitBuffered() {
                this.receiveBuffer.forEach(e=>this.emitEvent(e)),
                this.receiveBuffer = [],
                this.sendBuffer.forEach(e=>this.packet(e)),
                this.sendBuffer = []
            }
            ondisconnect() {
                E("server disconnect (%s)", this.nsp),
                this.destroy(),
                this.onclose("io server disconnect")
            }
            destroy() {
                this.subs && (this.subs.forEach(e=>e()),
                this.subs = void 0),
                this.io._destroy(this)
            }
            disconnect() {
                return this.connected && (E("performing disconnect (%s)", this.nsp),
                this.packet({
                    type: v.PacketType.DISCONNECT
                })),
                this.destroy(),
                this.connected && this.onclose("io client disconnect"),
                this
            }
            close() {
                return this.disconnect()
            }
            compress(e) {
                return this.flags.compress = e,
                this
            }
            get volatile() {
                return this.flags.volatile = !0,
                this
            }
            onAny(e) {
                return this._anyListeners = this._anyListeners || [],
                this._anyListeners.push(e),
                this
            }
            prependAny(e) {
                return this._anyListeners = this._anyListeners || [],
                this._anyListeners.unshift(e),
                this
            }
            offAny(e) {
                if (!this._anyListeners)
                    return this;
                if (e) {
                    let t = this._anyListeners;
                    for (let r = 0; r < t.length; r++)
                        if (e === t[r])
                            return t.splice(r, 1),
                            this
                } else
                    this._anyListeners = [];
                return this
            }
            listenersAny() {
                return this._anyListeners || []
            }
        }
        ;
        ae.Socket = $t
    }
    );
    var Zt = h((En,Gt)=>{
        Gt.exports = V;
        function V(s) {
            s = s || {},
            this.ms = s.min || 100,
            this.max = s.max || 1e4,
            this.factor = s.factor || 2,
            this.jitter = s.jitter > 0 && s.jitter <= 1 ? s.jitter : 0,
            this.attempts = 0
        }
        V.prototype.duration = function() {
            var s = this.ms * Math.pow(this.factor, this.attempts++);
            if (this.jitter) {
                var e = Math.random()
                  , t = Math.floor(e * this.jitter * s);
                s = (Math.floor(e * 10) & 1) == 0 ? s - t : s + t
            }
            return Math.min(s, this.max) | 0
        }
        ;
        V.prototype.reset = function() {
            this.attempts = 0
        }
        ;
        V.prototype.setMin = function(s) {
            this.ms = s
        }
        ;
        V.prototype.setMax = function(s) {
            this.max = s
        }
        ;
        V.prototype.setJitter = function(s) {
            this.jitter = s
        }
    }
    );
    var De = h(he=>{
        "use strict";
        Object.defineProperty(he, "__esModule", {
            value: !0
        });
        he.Manager = void 0;
        var Nr = jt()
          , Or = Me()
          , Rr = ne()
          , P = Le()
          , Pr = Zt()
          , Fr = Ie()
          , d = _()("socket.io-client:manager")
          , Qt = class extends Fr.StrictEventEmitter {
            constructor(e, t) {
                super();
                this.nsps = {},
                this.subs = [],
                e && typeof e == "object" && (t = e,
                e = void 0),
                t = t || {},
                t.path = t.path || "/socket.io",
                this.opts = t,
                this.reconnection(t.reconnection !== !1),
                this.reconnectionAttempts(t.reconnectionAttempts || Infinity),
                this.reconnectionDelay(t.reconnectionDelay || 1e3),
                this.reconnectionDelayMax(t.reconnectionDelayMax || 5e3),
                this.randomizationFactor(t.randomizationFactor || .5),
                this.backoff = new Pr({
                    min: this.reconnectionDelay(),
                    max: this.reconnectionDelayMax(),
                    jitter: this.randomizationFactor()
                }),
                this.timeout(t.timeout == null ? 2e4 : t.timeout),
                this._readyState = "closed",
                this.uri = e;
                let r = t.parser || Rr;
                this.encoder = new r.Encoder,
                this.decoder = new r.Decoder,
                this._autoConnect = t.autoConnect !== !1,
                this._autoConnect && this.open()
            }
            reconnection(e) {
                return arguments.length ? (this._reconnection = !!e,
                this) : this._reconnection
            }
            reconnectionAttempts(e) {
                return e === void 0 ? this._reconnectionAttempts : (this._reconnectionAttempts = e,
                this)
            }
            reconnectionDelay(e) {
                var t;
                return e === void 0 ? this._reconnectionDelay : (this._reconnectionDelay = e,
                (t = this.backoff) === null || t === void 0 || t.setMin(e),
                this)
            }
            randomizationFactor(e) {
                var t;
                return e === void 0 ? this._randomizationFactor : (this._randomizationFactor = e,
                (t = this.backoff) === null || t === void 0 || t.setJitter(e),
                this)
            }
            reconnectionDelayMax(e) {
                var t;
                return e === void 0 ? this._reconnectionDelayMax : (this._reconnectionDelayMax = e,
                (t = this.backoff) === null || t === void 0 || t.setMax(e),
                this)
            }
            timeout(e) {
                return arguments.length ? (this._timeout = e,
                this) : this._timeout
            }
            maybeReconnectOnOpen() {
                !this._reconnecting && this._reconnection && this.backoff.attempts === 0 && this.reconnect()
            }
            open(e) {
                if (d("readyState %s", this._readyState),
                ~this._readyState.indexOf("open"))
                    return this;
                d("opening %s", this.uri),
                this.engine = Nr(this.uri, this.opts);
                let t = this.engine
                  , r = this;
                this._readyState = "opening",
                this.skipReconnect = !1;
                let n = P.on(t, "open", function() {
                    r.onopen(),
                    e && e()
                })
                  , o = P.on(t, "error", i=>{
                    d("error"),
                    r.cleanup(),
                    r._readyState = "closed",
                    this.emitReserved("error", i),
                    e ? e(i) : r.maybeReconnectOnOpen()
                }
                );
                if (this._timeout !== !1) {
                    let i = this._timeout;
                    d("connect attempt will timeout after %d", i),
                    i === 0 && n();
                    let u = setTimeout(()=>{
                        d("connect attempt timed out after %d", i),
                        n(),
                        t.close(),
                        t.emit("error", new Error("timeout"))
                    }
                    , i);
                    this.opts.autoUnref && u.unref(),
                    this.subs.push(function() {
                        clearTimeout(u)
                    })
                }
                return this.subs.push(n),
                this.subs.push(o),
                this
            }
            connect(e) {
                return this.open(e)
            }
            onopen() {
                d("open"),
                this.cleanup(),
                this._readyState = "open",
                this.emitReserved("open");
                let e = this.engine;
                this.subs.push(P.on(e, "ping", this.onping.bind(this)), P.on(e, "data", this.ondata.bind(this)), P.on(e, "error", this.onerror.bind(this)), P.on(e, "close", this.onclose.bind(this)), P.on(this.decoder, "decoded", this.ondecoded.bind(this)))
            }
            onping() {
                this.emitReserved("ping")
            }
            ondata(e) {
                this.decoder.add(e)
            }
            ondecoded(e) {
                this.emitReserved("packet", e)
            }
            onerror(e) {
                d("error", e),
                this.emitReserved("error", e)
            }
            socket(e, t) {
                let r = this.nsps[e];
                return r || (r = new Or.Socket(this,e,t),
                this.nsps[e] = r),
                r
            }
            _destroy(e) {
                let t = Object.keys(this.nsps);
                for (let r of t)
                    if (this.nsps[r].active) {
                        d("socket %s is still active, skipping close", r);
                        return
                    }
                this._close()
            }
            _packet(e) {
                d("writing packet %j", e);
                let t = this.encoder.encode(e);
                for (let r = 0; r < t.length; r++)
                    this.engine.write(t[r], e.options)
            }
            cleanup() {
                d("cleanup"),
                this.subs.forEach(e=>e()),
                this.subs.length = 0,
                this.decoder.destroy()
            }
            _close() {
                d("disconnect"),
                this.skipReconnect = !0,
                this._reconnecting = !1,
                this._readyState === "opening" && this.cleanup(),
                this.backoff.reset(),
                this._readyState = "closed",
                this.engine && this.engine.close()
            }
            disconnect() {
                return this._close()
            }
            onclose(e) {
                d("onclose"),
                this.cleanup(),
                this.backoff.reset(),
                this._readyState = "closed",
                this.emitReserved("close", e),
                this._reconnection && !this.skipReconnect && this.reconnect()
            }
            reconnect() {
                if (this._reconnecting || this.skipReconnect)
                    return this;
                let e = this;
                if (this.backoff.attempts >= this._reconnectionAttempts)
                    d("reconnect failed"),
                    this.backoff.reset(),
                    this.emitReserved("reconnect_failed"),
                    this._reconnecting = !1;
                else {
                    let t = this.backoff.duration();
                    d("will wait %dms before reconnect attempt", t),
                    this._reconnecting = !0;
                    let r = setTimeout(()=>{
                        e.skipReconnect || (d("attempting reconnect"),
                        this.emitReserved("reconnect_attempt", e.backoff.attempts),
                        !e.skipReconnect && e.open(n=>{
                            n ? (d("reconnect attempt error"),
                            e._reconnecting = !1,
                            e.reconnect(),
                            this.emitReserved("reconnect_error", n)) : (d("reconnect success"),
                            e.onreconnect())
                        }
                        ))
                    }
                    , t);
                    this.opts.autoUnref && r.unref(),
                    this.subs.push(function() {
                        clearTimeout(r)
                    })
                }
            }
            onreconnect() {
                let e = this.backoff.attempts;
                this._reconnecting = !1,
                this.backoff.reset(),
                this.emitReserved("reconnect", e)
            }
        }
        ;
        he.Manager = Qt
    }
    );
    var rs = h((y,ss)=>{
        "use strict";
        Object.defineProperty(y, "__esModule", {
            value: !0
        });
        y.io = y.Socket = y.Manager = y.protocol = void 0;
        var Lr = We()
          , es = De()
          , ts = _()("socket.io-client");
        ss.exports = y = ue;
        var X = y.managers = {};
        function ue(s, e) {
            typeof s == "object" && (e = s,
            s = void 0),
            e = e || {};
            let t = Lr.url(s, e.path || "/socket.io"), r = t.source, n = t.id, o = t.path, i = X[n] && o in X[n].nsps, u = e.forceNew || e["force new connection"] || e.multiplex === !1 || i, m;
            return u ? (ts("ignoring socket cache for %s", r),
            m = new es.Manager(r,e)) : (X[n] || (ts("new io instance for %s", r),
            X[n] = new es.Manager(r,e)),
            m = X[n]),
            t.query && !e.query && (e.query = t.queryKey),
            m.socket(t.path, e)
        }
        y.io = ue;
        var Ir = ne();
        Object.defineProperty(y, "protocol", {
            enumerable: !0,
            get: function() {
                return Ir.protocol
            }
        });
        y.connect = ue;
        var Mr = De();
        Object.defineProperty(y, "Manager", {
            enumerable: !0,
            get: function() {
                return Mr.Manager
            }
        });
        var Dr = Me();
        Object.defineProperty(y, "Socket", {
            enumerable: !0,
            get: function() {
                return Dr.Socket
            }
        });
        y.default = ue
    }
    );
    var is = h((xn,ns)=>{
        ns.exports = s=>{
            let e = ["What's beautiful about the internet is you don't know who I am and I don't know either.", "Oh, so you're a node dev, huh? List every NPM package.", "WHICH TAB IS THAT MUSIC COMING FROM?!?!", "I know for a *fact* that all of my parentheses are in the righ- oh wait, found the problem.", "I'm not antisocial, I'm just not user friendly.", "while :; do rm -rf node_modules && npm install; done;", "Roses are red, violets are blue, unexpected { on line 232.", "I'm not a robot, I'm a human.", "Wait really? That's so cool!", "You have got to be kidding me, it was that all along?", "Turns out that if you don't escape these quotes properly it breaks the whole website."]
              , t = e[Math.floor(Math.random() * e.length)];
            for (let r = 0; r < t.length; r++)
                setTimeout(()=>{
                    document.getElementById("quote").innerHTML = `"${t.substring(0, r + 1)}"`
                }
                , r * 50);
            s.on("currentVisitors", r=>{
                document.getElementById("current-visitors").innerHTML = r
            }
            ),
            s.on("totalVisitors", r=>{
                document.getElementById("total-visitors").innerHTML = r
            }
            ),
            s.on("visitorsToday", r=>{
                document.getElementById("visitors-today").innerHTML = r
            }
            ),
            document.getElementById("make-it-hell").addEventListener("click", ()=>{
                document.getElementById("make-it-hell").innerHTML = "Hmm... Maybe nothing happens?",
                setTimeout(()=>{
                    makeItHell()
                }
                , 3e3)
            }
            )
        }
    }
    );
    var Hr = rs()
      , jr = Hr()
      , Vr = is();
    window.location.pathname === "/" && Vr(jr);
}
)();
