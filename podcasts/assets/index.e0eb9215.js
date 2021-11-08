import {s as t, r as e, c as s, a as n, u as o, d as r, o as a, b as l, e as i, t as c, f as d, g as u, w as p, h, i as m, j as g, k as f, l as b, m as v, n as w, p as x, q as y, v as k, x as C, y as _, z as j, F as S, A as M, T as R, B as O, C as T, D as L, E as A, G as P, H as z, V as$} from "vendor.79db57bd.js";
const W = t=>{
    if (!t.ok)
        throw new Error("Failed to fetch docs data file from GitHub");
    return t.json()
}
;
class E {
    constructor(t) {
        var e, s, n, o, r;
        this.options = t,
        this.id = this.options.id,
        this.name = this.options.name,
        this.global = this.options.global,
        this.repo = this.options.repo,
        this.defaultTag = null != (e = this.options.defaultTag) ? e : "main",
        this.defaultFile = null != (s = this.options.defaultFile) ? s : {
            category: "general",
            id: "welcome"
        },
        this.source = null != (n = this.options.source) ? n : `https://github.com/${this.repo}/blob/`,
        this.branchFilter = null != (o = this.options.branchFilter) ? o : t=>"main" !== t,
        this.tagFilter = null != (r = this.options.tagFilter) ? r : ()=>!0,
        this.tags = null,
        this.recentTag = null
    }
    fetchTags() {
        return this.tags ? Promise.resolve(this.tags) : Promise.all([fetch(`https://api.github.com/repos/${this.repo}/branches`).then(W), fetch(`https://api.github.com/repos/${this.repo}/tags`).then(W)]).catch((t=>{
            if (localStorage[`source-${this.id}`]) {
                console.error(t);
                const e = JSON.parse(localStorage[`source-${this.id}`]);
                return [e.branches, e.tags]
            }
            throw t
        }
        )).then((e=>{
            const [s,n] = e;
            this.tags = [this.defaultTag],
            localStorage[`source-${this.id}`] = JSON.stringify({
                branches: s,
                tags: n
            });
            for (const t of s)
                t.name !== this.defaultTag && this.branchFilter(t.name) && this.tags.push(t.name);
            const o = {};
            for (const r of n)
                if (t.valid(r.name)) {
                    const e = `${t.major(r.name)}.${t.minor(r.name)}`
                      , s = t.patch(r.name);
                    if (s < o[e])
                        continue;
                    o[e] = s
                }
            for (const r of n)
                if (r.name !== this.defaultTag && this.tagFilter(r.name)) {
                    if (t.valid(r.name)) {
                        const e = `${t.major(r.name)}.${t.minor(r.name)}`;
                        if (t.patch(r.name) < o[e])
                            continue
                    }
                    this.tags.push(r.name)
                }
            return this.tags
        }
        ))
    }
    async fetchDocs(t) {
        const e = await fetch(`https://raw.githubusercontent.com/${this.repo}/docs/${t}.json`);
        return W(e)
    }
}
const D = new Set(["docs", "webpack", "v8"]);
var F = new E({
    id: "main",
    name: "Main library",
    global: "Discord",
    repo: "discordjs/discord.js",
    defaultTag: "stable",
    branchFilter: t=>!D.has(t) && !t.startsWith("dependabot/"),
    tagFilter: e=>t.gte(e.replace(/^v/, ""), "9.0.0")
});
const G = new Set(["docs"]);
var I = new E({
    id: "collection",
    name: "Collection",
    global: "Collection",
    repo: "discordjs/collection",
    defaultTag: "stable",
    branchFilter: t=>!G.has(t) && !t.startsWith("dependabot/"),
    tagFilter: e=>t.gte(e.replace(/^v/, ""), "0.3.1")
});
const V = new Set(["docs"]);
var H = new E({
    id: "builders",
    name: "Builders",
    global: "Builders",
    repo: "discordjs/builders",
    defaultTag: "stable",
    branchFilter: t=>!V.has(t) && !t.startsWith("dependabot/"),
    tagFilter: e=>t.gte(e.replace(/^v/, ""), "0.8.1")
});
const U = new Set(["docs"]);
var J = new E({
    id: "voice",
    name: "Voice",
    global: "Voice",
    repo: "discordjs/voice",
    defaultTag: "stable",
    branchFilter: t=>!U.has(t) && !t.startsWith("dependabot/"),
    tagFilter: e=>t.gte(e.replace(/^v/, ""), "0.7.0")
});
const N = new Set(["gh-pages", "docs"]);
var B = new E({
    id: "commando",
    name: "Commando",
    global: "Commando",
    repo: "discordjs/Commando",
    defaultTag: "master",
    branchFilter: t=>!N.has(t) && !t.startsWith("dependabot/"),
    tagFilter: e=>t.gt(e.replace(/^v/, ""), "0.4.1")
})
  , Z = new E({
    id: "rpc",
    name: "RPC",
    global: "RPC",
    repo: "discordjs/RPC",
    defaultTag: "master",
    branchFilter: t=>"docs" !== t && !t.includes("greenkeeper"),
    tagFilter: e=>t.gte(e.replace(/^v/, ""), "3.0.0")
});
const Y = e(!1);
class q {
    constructor(t, e) {
        this.name = t.toLowerCase(),
        this.related = new Set([e])
    }
    addRelated(t) {
        this.related.add(t)
    }
    matches(t) {
        return t.includes(this.name)
    }
}
var K, Q;
(Q = K || (K = {}))[Q.Class = 0] = "Class",
Q[Q.Method = 1] = "Method",
Q[Q.Property = 2] = "Property",
Q[Q.Events = 3] = "Events",
Q[Q.Typedefs = 4] = "Typedefs";
class X {
    constructor(t, e, s, n, o, r) {
        switch (this.name = t,
        this.type = e,
        this.parentName = s,
        this.parentType = n,
        this.access = o,
        this.scope = r,
        e) {
        case 0:
        case 4:
            this.computedName = t;
            break;
        case 1:
            this.computedName = `${null != s ? s : ""}.${t}()`;
            break;
        case 2:
            this.computedName = `${null != s ? s : ""}.${t}`;
            break;
        case 3:
            this.computedName = `${null != s ? s : ""}#${t}`
        }
        this.nameLowerCase = t.toLowerCase(),
        this.cleanedComputedName = this.computedName.replace(/[().#]/, "").toLowerCase()
    }
    get isPriority() {
        return 0 === this.type || 4 === this.type
    }
    getLinkPath() {
        var t, e;
        if (4 === this.type || 4 === this.parentType)
            return {
                name: "docs-source-tag-typedef-typedef",
                params: {
                    typedef: null != (t = this.parentName) ? t : this.name
                }
            };
        const s = {
            name: "docs-source-tag-class-class",
            params: {
                class: null != (e = this.parentName) ? e : this.name
            }
        };
        return 1 !== this.type && 2 !== this.type || (s.query = {
            scrollTo: `${"static" === this.scope ? "s-" : ""}${this.name}`
        }),
        3 === this.type && (s.query = {
            scrollTo: `e-${this.name}`
        }),
        s
    }
}
const tt = s((()=>rt.state.searchIndex))
  , et = s((()=>rt.state.searchRef));
function st(t) {
    const e = t.replace(/[\s().#]/g, "").toLowerCase();
    if ("" === e)
        return [];
    let s = tt.value.reduce(((t,s)=>{
        if (e.includes(s.name))
            for (const e of s.related) {
                const n = t.get(e);
                n ? (n.numMatches += 1,
                n.lengthMatches += s.name.length) : t.set(e, {
                    numMatches: 1,
                    lengthMatches: s.name.length
                })
            }
        return t
    }
    ), new Map);
    0 === s.size && e.length < 10 && (s = tt.value.reduce(((t,s)=>{
        if (s.name.includes(e))
            for (const e of s.related) {
                const n = t.get(e);
                n ? (n.numMatches += 1,
                n.lengthMatches += s.name.length) : t.set(e, {
                    numMatches: 1,
                    lengthMatches: s.name.length
                })
            }
        return t
    }
    ), new Map));
    return Array.from(s.entries()).map((([t,e])=>[et.value[t], e])).filter((([t])=>"private" !== t.access || Y.value)).sort((([t,s],[n,o])=>{
        let r = 0;
        return t.nameLowerCase === e ? r += t.isPriority ? -10 : -4 : n.nameLowerCase === e && (r += n.isPriority ? 10 : 4),
        e.length >= 7 && (t.cleanedComputedName.includes(e) && (r -= 30),
        n.cleanedComputedName.includes(e) && (r += 30)),
        s.numMatches === o.numMatches && (t.isPriority && (r -= 6),
        n.isPriority && (r += 6),
        s.numMatches > 1 && (r += Math.abs(e.length - t.computedName.length) - Math.abs(e.length - n.computedName.length)),
        r += o.lengthMatches - s.lengthMatches),
        o.numMatches - s.numMatches + r
    }
    )).map((([t,e])=>t))
}
const nt = e(null)
  , ot = Symbol("docs")
  , rt = n({
    state: {
        sources: [{
            source: F,
            name: F.name,
            id: F.id
        }, {
            source: I,
            name: I.name,
            id: I.id
        }, {
            source: H,
            name: H.name,
            id: H.id
        }, {
            source: J,
            name: J.name,
            id: J.id
        }, {
            source: B,
            name: B.name,
            id: B.id
        }, {
            source: Z,
            name: Z.name,
            id: Z.id
        }],
        source: F,
        tag: F.defaultTag,
        docs: null,
        branches: [],
        file: null,
        stats: {
            downloads: `${225e6.toLocaleString()}+`,
            stars: `${11e3.toLocaleString()}+`,
            contributors: `${100..toLocaleString()}+`
        },
        searchIndex: [],
        searchRef: []
    },
    mutations: {
        setSource(t, {source: e}) {
            t.source = e
        },
        setTag(t, {tag: e}) {
            t.tag = e
        },
        setDocs(t, {docs: e}) {
            t.docs = e
        },
        setBranches(t, {branches: e}) {
            t.branches = e
        },
        setFile(t, {file: e}) {
            t.file = e
        },
        setStats(t, {stats: e}) {
            t.stats = e
        },
        setSearchIndex(t, {searchIndex: e, searchRef: s}) {
            t.searchIndex = e,
            t.searchRef = s
        }
    },
    actions: {
        fetchStats: async({commit: t})=>{
            let e = 0
              , s = 0
              , n = 0;
            const o = t=>t.json()
              , r = ()=>{}
              , [a,l,i] = await Promise.all([fetch("https://api.npmjs.org/downloads/range/2013-08-21:2100-08-21/discord.js").then(o, r), fetch("https://api.github.com/repos/discordjs/discord.js").then(o, r), fetch("https://api.github.com/repos/discordjs/discord.js/stats/contributors").then(o, r)]);
            if (a) {
                e = 0;
                for (const t of a.downloads)
                    e += t.downloads
            }
            l && (s = l.stargazers_count),
            i && (n = i.length),
            t({
                type: "setStats",
                stats: {
                    downloads: `${e.toLocaleString()}+`,
                    stars: `${s.toLocaleString()}+`,
                    contributors: `${n.toLocaleString()}+`
                }
            })
        }
        ,
        fetchDocs: async({commit: t},{inputSource: e, inputTag: s=e.defaultTag})=>{
            var n, o, r, a;
            let l;
            try {
                l = await e.fetchDocs(s)
            } catch (p) {
                return t({
                    type: "setDocs",
                    docs: null
                }),
                t({
                    type: "setTag",
                    docs: null
                }),
                void (nt.value = p)
            }
            const i = []
              , c = [];
            let d = 0;
            const u = (t,e,s,n,o,r)=>{
                const a = function(t) {
                    var e, s;
                    return /^[_A-Z]+$/.test(t) ? null != (e = t.match(/[A-Z]+/g)) ? e : [] : null != (s = t.match(/(([A-Z]{2,})(?=[A-Z]))|[A-Z][a-z]+|[a-z]+/g)) ? s : []
                }(t)
                  , l = new X(t,e,s,n,o,r);
                i.push(l);
                const u = [];
                for (const i of a) {
                    const t = i.toLowerCase();
                    let e = c.findIndex((e=>e.name === t));
                    e > -1 ? c[e].addRelated(d) : e = c.push(new q(t,d)) - 1,
                    u.push(e)
                }
                return d += 1,
                u
            }
            ;
            for (const h of l.classes) {
                const t = u(h.name, K.Class, void 0, void 0, h.access, h.scope)
                  , e = [];
                for (const s of null != (n = h.methods) ? n : [])
                    u(s.name, K.Method, h.name, K.Class, s.access, s.scope),
                    e.push(d - 1);
                for (const s of null != (o = h.props) ? o : [])
                    u(s.name, K.Property, h.name, K.Class, s.access, s.scope),
                    e.push(d - 1);
                for (const s of null != (r = h.events) ? r : [])
                    u(s.name, K.Events, h.name, K.Class, s.access, s.scope),
                    e.push(d - 1);
                for (const s of t)
                    for (const t of e)
                        c[s].related.add(t)
            }
            for (const h of l.typedefs) {
                const t = u(h.name, K.Typedefs, void 0, void 0, h.access, h.scope)
                  , e = [];
                for (const s of null != (a = h.props) ? a : [])
                    u(s.name, K.Property, h.name, K.Typedefs, s.access, s.scope),
                    e.push(d - 1);
                for (const s of t)
                    for (const t of e)
                        c[s].related.add(t)
            }
            t({
                type: "setSearchIndex",
                searchIndex: c,
                searchRef: i
            }),
            l.classes.sort(((t,e)=>t.name.localeCompare(e.name))),
            l.typedefs.sort(((t,e)=>t.name.localeCompare(e.name)));
            for (const h of l.classes)
                h.props && h.props.sort(((t,e)=>t.name.localeCompare(e.name))),
                h.methods && h.methods.sort(((t,e)=>t.name.localeCompare(e.name))),
                h.events && h.events.sort(((t,e)=>t.name.localeCompare(e.name)));
            l.links = {
                string: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
                number: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
                bigint: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt",
                boolean: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean",
                true: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean",
                false: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean",
                symbol: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol",
                void: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined",
                undefined: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined",
                null: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null",
                Object: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object",
                object: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object",
                Function: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function",
                function: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function",
                Array: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
                Set: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set",
                Map: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",
                Date: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date",
                RegExp: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp",
                Promise: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
                Error: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error",
                EventEmitter: "https://nodejs.org/dist/latest/docs/api/events.html#events_class_eventemitter",
                Timeout: "https://nodejs.org/dist/latest/docs/api/timers.html#timers_class_timeout",
                Immediate: "https://nodejs.org/dist/latest/docs/api/timers.html#timers_class_immediate",
                Buffer: "https://nodejs.org/dist/latest/docs/api/buffer.html#buffer_class_buffer",
                ReadableStream: "https://nodejs.org/dist/latest/docs/api/stream.html#stream_class_stream_readable",
                ChildProcess: "https://nodejs.org/dist/latest/docs/api/child_process.html#child_process_class_childprocess",
                Worker: "https://nodejs.org/api/worker_threads.html#worker_threads_class_worker",
                MessagePort: "https://nodejs.org/api/worker_threads.html#worker_threads_class_messageport",
                any: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any",
                unknown: "https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown",
                readonly: "https://www.typescriptlang.org/docs/handbook/2/classes.html#readonly",
                Record: "https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type",
                Exclude: "https://www.typescriptlang.org/docs/handbook/utility-types.html#excludetype-excludedunion",
                Omit: "https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys",
                IterableIterator: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols"
            },
            l.externals = l.externals || [],
            l.classes = l.classes || [],
            l.typedefs = l.typedefs || [];
            for (const h of l.externals)
                l.links[h.name] = h.see[0].replace(/\{@link\s+(.+?)\s*\}/i, "$1");
            for (const h of l.classes)
                l.links[h.name] = {
                    name: "docs-source-tag-class-class",
                    params: {
                        class: h.name
                    }
                };
            for (const h of l.typedefs)
                l.links[h.name] = {
                    name: "docs-source-tag-typedef-typedef",
                    params: {
                        typedef: h.name
                    }
                };
            "commando" === e.id && (l.links.Message = {
                name: "docs-source-tag-class-class",
                params: {
                    source: "main",
                    tag: "master",
                    class: "Message"
                }
            }),
            l.global = e.global,
            l.source = e.source,
            l.id = e.id,
            l.tag = s,
            t({
                type: "setDocs",
                docs: l
            })
        }
        ,
        fetchTags: async({commit: t},{currentSource: e})=>{
            t({
                type: "setBranches",
                branches: await e.fetchTags()
            })
        }
    }
});
function at() {
    return o(ot)
}
var lt = r({
    setup(t) {
        const e = at()
          , n = s((()=>e.state.stats.downloads))
          , o = s((()=>e.state.stats.stars))
          , r = s((()=>e.state.stats.contributors));
        return (t,e)=>(a(),
        l("ul", null, [i("li", null, c(d(n)) + " downloads", 1), i("li", null, c(d(o)) + " stars", 1), i("li", null, c(d(r)) + " contributors", 1)]))
    }
});
const it = {
    class: "bg-discord-blurple-560"
}
  , ct = {
    class: "max-w-3xl mx-auto text-center px-16 pt-10 pb-4 text-gray-200"
}
  , dt = h("discord.js")
  , ut = i("p", {
    class: "mb-4"
}, "A powerful library for interacting with the Discord API", -1)
  , pt = {
    class: "text-xs break-words-legacy"
}
  , ht = i("br", null, null, -1);
var mt = r({
    setup(t) {
        const s = e("a2f2e0657d980ca1c760442449dc3b1640a030bd")
          , n = e(new Date(1635579714901).toUTCString());
        return (t,e)=>{
            const o = u("router-link");
            return a(),
            l("footer", it, [i("div", ct, [i("strong", null, [i(o, {
                to: "/"
            }, {
                default: p((()=>[dt])),
                _: 1
            })]), ut, i(lt, {
                class: "mb-4"
            }), i("p", pt, [h(" commit: " + c(s.value), 1), ht, h(" built at: " + c(n.value), 1)])])])
        }
    }
});
const gt = {
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    width: "1.2em",
    height: "1.2em",
    preserveAspectRatio: "xMidYMid meet",
    viewBox: "0 0 24 24"
}
  , ft = i("g", {
    fill: "none"
}, [i("path", {
    d: "M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
})], -1);
var bt = {
    name: "heroicons-outline-external-link",
    render: function(t, e) {
        return a(),
        l("svg", gt, [ft])
    }
};
const vt = {
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    width: "1.2em",
    height: "1.2em",
    preserveAspectRatio: "xMidYMid meet",
    viewBox: "0 0 24 24"
}
  , wt = i("g", {
    fill: "none"
}, [i("path", {
    d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0a4 4 0 0 1 8 0z",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
})], -1);
var xt = {
    name: "heroicons-outline-sun",
    render: function(t, e) {
        return a(),
        l("svg", vt, [wt])
    }
};
const yt = {
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    width: "1.2em",
    height: "1.2em",
    preserveAspectRatio: "xMidYMid meet",
    viewBox: "0 0 24 24"
}
  , kt = i("g", {
    fill: "none"
}, [i("path", {
    d: "M20.354 15.354A9 9 0 0 1 8.646 3.646A9.003 9.003 0 0 0 12 21a9.003 9.003 0 0 0 8.354-5.646z",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
})], -1);
var Ct = {
    name: "heroicons-outline-moon",
    render: function(t, e) {
        return a(),
        l("svg", yt, [kt])
    }
};
const _t = {
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    width: "1.2em",
    height: "1.2em",
    preserveAspectRatio: "xMidYMid meet",
    viewBox: "0 0 24 24"
}
  , jt = i("g", {
    fill: "none"
}, [i("path", {
    d: "M21 21l-6-6m2-5a7 7 0 1 1-14 0a7 7 0 0 1 14 0z",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
})], -1);
var St = {
    name: "heroicons-outline-search",
    render: function(t, e) {
        return a(),
        l("svg", _t, [jt])
    }
};
const Mt = {
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    width: "1.2em",
    height: "1.2em",
    preserveAspectRatio: "xMidYMid meet",
    viewBox: "0 0 24 24"
}
  , Rt = i("g", {
    fill: "none"
}, [i("path", {
    d: "M14 5l7 7m0 0l-7 7m7-7H3",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
})], -1);
var Ot = {
    name: "heroicons-outline-arrow-right",
    render: function(t, e) {
        return a(),
        l("svg", Mt, [Rt])
    }
};
const Tt = {
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    width: "1.2em",
    height: "1.2em",
    preserveAspectRatio: "xMidYMid meet",
    viewBox: "0 0 24 24"
}
  , Lt = i("g", {
    fill: "none"
}, [i("path", {
    d: "M4 6h16M4 12h16M4 18h16",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
})], -1);
var At = {
    name: "heroicons-outline-menu",
    render: function(t, e) {
        return a(),
        l("svg", Tt, [Lt])
    }
};
const Pt = {
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    width: "1.2em",
    height: "1.2em",
    preserveAspectRatio: "xMidYMid meet",
    viewBox: "0 0 24 24"
}
  , zt = i("g", {
    fill: "none"
}, [i("path", {
    d: "M6 18L18 6M6 6l12 12",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
})], -1);
var $t = {
    name: "heroicons-outline-x",
    render: function(t, e) {
        return a(),
        l("svg", Pt, [zt])
    }
};
const Wt = m({
    storageKey: "theme"
})
  , Et = g(Wt)
  , Dt = {
    class: "sticky top-0 z-20"
}
  , Ft = {
    class: "bg-discord-blurple-560"
}
  , Gt = {
    class: "max-w-7xl mx-auto px-2 sm:px-4 md:flex md:justify-between lg:px-8"
}
  , It = {
    class: "hidden md:flex md:py-2 md:space-x-4 lg:space-x-8",
    "aria-label": "Global navigation"
}
  , Vt = h(" discord.js ")
  , Ht = h(" Documentation ")
  , Ut = i("span", {
    class: "mr-2"
}, "GitHub", -1)
  , Jt = {
    href: "https://discordjs.guide",
    class: "\n\t\t\t\t\t\t\ttext-gray-200\n\t\t\t\t\t\t\thover:bg-discord-blurple-630 hover:text-white\n\t\t\t\t\t\t\trounded-md\n\t\t\t\t\t\t\tpy-2\n\t\t\t\t\t\t\tpx-3\n\t\t\t\t\t\t\tinline-flex\n\t\t\t\t\t\t\titems-center\n\t\t\t\t\t\t\ttext-sm\n\t\t\t\t\t\t\tfont-semibold\n\t\t\t\t\t\t\tfocus:outline-none\n\t\t\t\t\t\t\tfocus-visible:ring-1 focus-visible:ring-white\n\t\t\t\t\t\t",
    target: "_blank",
    rel: "noopener"
}
  , Nt = i("span", {
    class: "mr-2"
}, "Guide", -1)
  , Bt = {
    class: "relative h-16 flex md:max-w-md md:w-full lg:max-w-lg"
}
  , Zt = {
    class: "relative z-10 flex items-center md:hidden"
}
  , Yt = {
    class: "relative z-0 flex-1 px-2 flex lg:gap-2 items-center justify-center md:justify-end"
}
  , qt = i("label", {
    for: "search",
    class: "sr-only"
}, "Search", -1)
  , Kt = {
    class: "relative"
}
  , Qt = {
    class: "pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center",
    "aria-hidden": "true"
}
  , Xt = {
    class: "relative z-10 flex items-center md:hidden"
}
  , te = i("span", {
    class: "sr-only"
}, "Open menu", -1)
  , ee = {
    key: 0,
    id: "mobile-menu",
    class: "md:hidden",
    "aria-label": "Global navigation"
}
  , se = {
    class: "pt-2 pb-3 px-2 space-y-1"
}
  , ne = h("discord.js")
  , oe = h("Documentation")
  , re = i("span", {
    class: "mr-2"
}, "Github", -1)
  , ae = i("span", {
    class: "mr-2"
}, "Guide", -1);
var le = r({
    setup(t) {
        const n = f()
          , o = b()
          , r = at()
          , m = v(w).greater("md")
          , g = e(!1)
          , O = e()
          , T = e("")
          , L = e(!1)
          , A = e(-1)
          , P = s((()=>{
            var t;
            return null == (t = r.state.source) ? void 0 : t.repo
        }
        ))
          , z = s((()=>(A.value = -1,
        st(T.value).slice(0, 7))))
          , $ = ()=>{
            if (z.value.length)
                return L.value = !1,
                A.value >= 0 ? (n.push(z.value[A.value].getLinkPath()),
                void (A.value = -1)) : n.push({
                    name: "docs-source-tag-search",
                    query: {
                        query: T.value
                    }
                })
        }
          , W = t=>{
            A.value += 1,
            A.value > Math.min(6, z.value.length - 1) && (A.value = 0),
            t.preventDefault()
        }
          , E = t=>{
            A.value -= 1,
            A.value < 0 && (A.value = Math.min(6, z.value.length - 1)),
            t.preventDefault()
        }
          , D = t=>{
            if (!t.target)
                return;
            const e = t.target.getAttribute("data-index");
            e && (A.value = parseInt(e, 10))
        }
        ;
        return x(m, (()=>g.value = !1)),
        y(O, (()=>{
            L.value = !1,
            A.value = -1
        }
        )),
        (t,e)=>{
            const s = u("router-link")
              , n = bt
              , r = xt
              , m = Ct
              , f = St
              , b = Ot
              , v = At
              , w = $t;
            return a(),
            l("div", Dt, [i("header", Ft, [i("div", Gt, [i("nav", It, [i(s, {
                to: "/",
                class: "\n\t\t\t\t\t\t\ttext-gray-200\n\t\t\t\t\t\t\thover:bg-discord-blurple-630 hover:text-white\n\t\t\t\t\t\t\trounded-md\n\t\t\t\t\t\t\tpy-2\n\t\t\t\t\t\t\tpx-3\n\t\t\t\t\t\t\tinline-flex\n\t\t\t\t\t\t\titems-center\n\t\t\t\t\t\t\ttext-sm\n\t\t\t\t\t\t\tfont-semibold\n\t\t\t\t\t\t\tfocus:outline-none\n\t\t\t\t\t\t\tfocus-visible:ring-1 focus-visible:ring-white\n\t\t\t\t\t\t",
                "active-class": "bg-discord-blurple-600"
            }, {
                default: p((()=>[Vt])),
                _: 1
            }), i(s, {
                to: "/docs",
                class: "\n\t\t\t\t\t\t\ttext-gray-200\n\t\t\t\t\t\t\thover:bg-discord-blurple-630 hover:text-white\n\t\t\t\t\t\t\trounded-md\n\t\t\t\t\t\t\tpy-2\n\t\t\t\t\t\t\tpx-3\n\t\t\t\t\t\t\tinline-flex\n\t\t\t\t\t\t\titems-center\n\t\t\t\t\t\t\ttext-sm\n\t\t\t\t\t\t\tfont-semibold\n\t\t\t\t\t\t\tfocus:outline-none\n\t\t\t\t\t\t\tfocus-visible:ring-1 focus-visible:ring-white\n\t\t\t\t\t\t",
                "active-class": "bg-discord-blurple-600"
            }, {
                default: p((()=>[Ht])),
                _: 1
            }), i("a", {
                href: `https://github.com/${d(P)}`,
                class: "\n\t\t\t\t\t\t\ttext-gray-200\n\t\t\t\t\t\t\thover:bg-discord-blurple-630 hover:text-white\n\t\t\t\t\t\t\trounded-md\n\t\t\t\t\t\t\tpy-2\n\t\t\t\t\t\t\tpx-3\n\t\t\t\t\t\t\tinline-flex\n\t\t\t\t\t\t\titems-center\n\t\t\t\t\t\t\ttext-sm\n\t\t\t\t\t\t\tfont-semibold\n\t\t\t\t\t\t\tfocus:outline-none\n\t\t\t\t\t\t\tfocus-visible:ring-1 focus-visible:ring-white\n\t\t\t\t\t\t",
                target: "_blank",
                rel: "noopener"
            }, [Ut, i(n, {
                class: "h-5 w-5"
            })], 8, ["href"]), i("a", Jt, [Nt, i(n, {
                class: "h-5 w-5"
            })])]), i("div", Bt, [i("div", Zt, [i("button", {
                class: "\n\t\t\t\t\t\t\t\trounded-md\n\t\t\t\t\t\t\t\tp-2\n\t\t\t\t\t\t\t\tinline-flex\n\t\t\t\t\t\t\t\titems-center\n\t\t\t\t\t\t\t\tjustify-center\n\t\t\t\t\t\t\t\thover:bg-discord-blurple-630\n\t\t\t\t\t\t\t\tfocus:outline-none focus:ring-2 focus:ring-inset focus:ring-white focus:bg-discord-blurple-630\n\t\t\t\t\t\t\t",
                "aria-label": "Switch to " + (d(Wt) ? "light theme" : "dark theme"),
                onClick: e[1] || (e[1] = t=>d(Et)())
            }, [d(Wt) ? (a(),
            l(m, {
                key: 1,
                class: "fill-current text-gray-200 hover:text-white h-6 w-6",
                "aria-hidden": "true"
            })) : (a(),
            l(r, {
                key: 0,
                class: "fill-current text-gray-200 hover:text-white h-6 w-6",
                "aria-hidden": "true"
            }))], 8, ["aria-label"])]), i("div", Yt, [i("button", {
                class: "\n\t\t\t\t\t\t\t\thidden\n\t\t\t\t\t\t\t\tmd:block\n\t\t\t\t\t\t\t\trounded-md\n\t\t\t\t\t\t\t\tp-2\n\t\t\t\t\t\t\t\thover:bg-discord-blurple-630\n\t\t\t\t\t\t\t\tfocus:outline-none focus:ring-1 focus:ring-inset focus:ring-white\n\t\t\t\t\t\t\t",
                "aria-label": "Switch to " + (d(Wt) ? "light theme" : "dark theme"),
                onClick: e[2] || (e[2] = t=>d(Et)())
            }, [d(Wt) ? (a(),
            l(m, {
                key: 1,
                class: "fill-current text-gray-200 hover:text-white h-6 w-6",
                "aria-hidden": "true"
            })) : (a(),
            l(r, {
                key: 0,
                class: "fill-current text-gray-200 hover:text-white h-6 w-6",
                "aria-hidden": "true"
            }))], 8, ["aria-label"]), "/" !== d(o).path ? (a(),
            l("div", {
                key: 0,
                ref: O,
                class: "w-full sm:max-w-lg lg:max-w-xs"
            }, [qt, i("div", Kt, [i("div", Qt, [i(f, {
                class: "h-5 w-5 text-gray-200"
            })]), k(i("input", {
                id: "search",
                "onUpdate:modelValue": e[3] || (e[3] = t=>T.value = t),
                name: "search",
                class: "\n\t\t\t\t\t\t\t\t\t\tblock\n\t\t\t\t\t\t\t\t\t\tw-full\n\t\t\t\t\t\t\t\t\t\tbg-discord-blurple-600\n\t\t\t\t\t\t\t\t\t\tborder border-transparent\n\t\t\t\t\t\t\t\t\t\trounded-md\n\t\t\t\t\t\t\t\t\t\tpy-2\n\t\t\t\t\t\t\t\t\t\tpl-10\n\t\t\t\t\t\t\t\t\t\tpr-3\n\t\t\t\t\t\t\t\t\t\ttext-base text-white\n\t\t\t\t\t\t\t\t\t\tplaceholder-gray-200\n\t\t\t\t\t\t\t\t\t\tfocus:outline-none\n\t\t\t\t\t\t\t\t\t\tfocus:bg-discord-blurple-630\n\t\t\t\t\t\t\t\t\t\tfocus:text-gray-200\n\t\t\t\t\t\t\t\t\t\tfocus:placeholder-gray-200\n\t\t\t\t\t\t\t\t\t\tfocus:ring-2\n\t\t\t\t\t\t\t\t\t\tfocus:ring-inset\n\t\t\t\t\t\t\t\t\t\tfocus:ring-white\n\t\t\t\t\t\t\t\t\t\tlg:focus:ring-1\n\t\t\t\t\t\t\t\t\t",
                placeholder: "Search",
                type: "search",
                autocomplete: "off",
                autocapitalize: "off",
                autocorrect: "off",
                onFocus: e[4] || (e[4] = t=>L.value = !0),
                onInput: e[5] || (e[5] = t=>L.value = !0),
                onKeyup: _($, ["enter"]),
                onKeydown: [_(E, ["up"]), _(W, ["down"])]
            }, null, 40, ["onKeyup", "onKeydown"]), [[C, T.value]]), L.value && T.value && d(z).length ? (a(),
            l("div", {
                key: 0,
                class: "absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center",
                "aria-hidden": "true",
                onClick: $
            }, [i(b, {
                class: "h-5 w-5 text-gray-200"
            })])) : j("", !0), L.value && T.value && d(z).length ? (a(),
            l("div", {
                key: 1,
                class: "absolute mt-1 w-full break-words-legacy border bg-discord-blurple-600 rounded-md",
                onMouseover: D
            }, [i("ul", null, [(a(!0),
            l(S, null, M(d(z), ((t,n)=>(a(),
            l("li", {
                key: t.computedName,
                class: ["\n\t\t\t\t\t\t\t\t\t\t\t\teven:bg-discord-blurple-560\n\t\t\t\t\t\t\t\t\t\t\t\tdark:even:bg-discord-blurple-630\n\t\t\t\t\t\t\t\t\t\t\t\thover:bg-discord-blurple-630\n\t\t\t\t\t\t\t\t\t\t\t\tdark:hover:bg-discord-blurple-660\n\t\t\t\t\t\t\t\t\t\t\t\trounded-md\n\t\t\t\t\t\t\t\t\t\t\t\ttext-gray-200\n\t\t\t\t\t\t\t\t\t\t\t", {
                    "ring-1 ring-gray-200 even:bg-discord-blurple-630 dark:even:bg-discord-blurple-660 bg-discord-blurple-630 dark:bg-discord-blurple-660": n === A.value
                }]
            }, [i(s, {
                class: "\n\t\t\t\t\t\t\t\t\t\t\t\t\tblock\n\t\t\t\t\t\t\t\t\t\t\t\t\tfocus:outline-none\n\t\t\t\t\t\t\t\t\t\t\t\t\tpy-3\n\t\t\t\t\t\t\t\t\t\t\t\t\tpx-4\n\t\t\t\t\t\t\t\t\t\t\t\t\tfocus-visible:ring-1\n\t\t\t\t\t\t\t\t\t\t\t\t\tfocus-visible:ring-gray-200\n\t\t\t\t\t\t\t\t\t\t\t\t\tfocus-visible:rounded-md\n\t\t\t\t\t\t\t\t\t\t\t\t\tfocus-visible:bg-discord-blurple-630\n\t\t\t\t\t\t\t\t\t\t\t\t\tdark:focus-visible:bg-discord-blurple-660\n\t\t\t\t\t\t\t\t\t\t\t\t",
                exact: "",
                to: t.getLinkPath(),
                "data-index": n,
                onClick: e[6] || (e[6] = t=>L.value = !1)
            }, {
                default: p((()=>[h(c(t.computedName), 1)])),
                _: 2
            }, 1032, ["to", "data-index"])], 2)))), 128))])], 32)) : j("", !0)])], 512)) : j("", !0)]), i("div", Xt, [i("button", {
                type: "button",
                class: "\n\t\t\t\t\t\t\t\trounded-md\n\t\t\t\t\t\t\t\tp-2\n\t\t\t\t\t\t\t\tinline-flex\n\t\t\t\t\t\t\t\titems-center\n\t\t\t\t\t\t\t\tjustify-center\n\t\t\t\t\t\t\t\ttext-gray-200\n\t\t\t\t\t\t\t\thover:bg-discord-blurple-630 hover:text-white\n\t\t\t\t\t\t\t\tfocus:outline-none focus:ring-2 focus:ring-inset focus:ring-white\n\t\t\t\t\t\t\t",
                "aria-controls": "mobile-menu",
                "aria-expanded": g.value,
                onClick: e[7] || (e[7] = t=>g.value = !g.value)
            }, [te, i(v, {
                class: {
                    hidden: g.value,
                    block: !g.value
                },
                "aria-hidden": "true"
            }, null, 8, ["class"]), i(w, {
                class: {
                    block: g.value,
                    hidden: !g.value
                },
                "aria-hidden": "true"
            }, null, 8, ["class"])], 8, ["aria-expanded"])])])]), i(R, {
                "enter-active-class": "transition transform-gpu duration-300 ease-out",
                "enter-from-class": "translate-x-12 opacity-0",
                "enter-to-class": "translate-x-0 opacity-100"
            }, {
                default: p((()=>[g.value ? (a(),
                l("nav", ee, [i("div", se, [i(s, {
                    to: "/",
                    class: "\n\t\t\t\t\t\t\t\ttext-gray-200\n\t\t\t\t\t\t\t\thover:bg-discord-blurple-630 hover:text-white\n\t\t\t\t\t\t\t\tblock\n\t\t\t\t\t\t\t\trounded-md\n\t\t\t\t\t\t\t\tpy-2\n\t\t\t\t\t\t\t\tpx-3\n\t\t\t\t\t\t\t\ttext-base\n\t\t\t\t\t\t\t\tfont-semibold\n\t\t\t\t\t\t\t",
                    onClick: e[8] || (e[8] = t=>g.value = !g.value)
                }, {
                    default: p((()=>[ne])),
                    _: 1
                }), i(s, {
                    to: "/docs",
                    class: "\n\t\t\t\t\t\t\t\ttext-gray-200\n\t\t\t\t\t\t\t\thover:bg-discord-blurple-630 hover:text-white\n\t\t\t\t\t\t\t\tblock\n\t\t\t\t\t\t\t\trounded-md\n\t\t\t\t\t\t\t\tpy-2\n\t\t\t\t\t\t\t\tpx-3\n\t\t\t\t\t\t\t\ttext-base\n\t\t\t\t\t\t\t\tfont-semibold\n\t\t\t\t\t\t\t",
                    onClick: e[9] || (e[9] = t=>g.value = !g.value)
                }, {
                    default: p((()=>[oe])),
                    _: 1
                }), i("a", {
                    href: `https://github.com/${d(P)}`,
                    class: "\n\t\t\t\t\t\t\t\ttext-gray-200\n\t\t\t\t\t\t\t\thover:bg-discord-blurple-630 hover:text-white\n\t\t\t\t\t\t\t\tblock\n\t\t\t\t\t\t\t\trounded-md\n\t\t\t\t\t\t\t\tpy-2\n\t\t\t\t\t\t\t\tpx-3\n\t\t\t\t\t\t\t\ttext-base\n\t\t\t\t\t\t\t\tfont-semibold\n\t\t\t\t\t\t\t",
                    target: "_blank",
                    rel: "noopener",
                    onClick: e[10] || (e[10] = t=>g.value = !g.value)
                }, [re, i(n, {
                    class: "h-5 w-5 inline-block"
                })], 8, ["href"]), i("a", {
                    href: "https://discordjs.guide",
                    class: "\n\t\t\t\t\t\t\t\ttext-gray-200\n\t\t\t\t\t\t\t\thover:bg-discord-blurple-630 hover:text-white\n\t\t\t\t\t\t\t\tblock\n\t\t\t\t\t\t\t\trounded-md\n\t\t\t\t\t\t\t\tpy-2\n\t\t\t\t\t\t\t\tpx-3\n\t\t\t\t\t\t\t\ttext-base\n\t\t\t\t\t\t\t\tfont-semibold\n\t\t\t\t\t\t\t",
                    target: "_blank",
                    rel: "noopener",
                    onClick: e[11] || (e[11] = t=>g.value = !g.value)
                }, [ae, i(n, {
                    class: "h-5 w-5 inline-block"
                })])])])) : j("", !0)])),
                _: 1
            })])])
        }
    }
});
const ie = {
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    width: "1.2em",
    height: "1.2em",
    preserveAspectRatio: "xMidYMid meet",
    viewBox: "0 0 24 24"
}
  , ce = i("g", {
    fill: "none"
}, [i("path", {
    d: "M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
})], -1);
var de = {
    name: "heroicons-outline-download",
    render: function(t, e) {
        return a(),
        l("svg", ie, [ce])
    }
};
function ue(t={}) {
    const {immediate: s=!0, onNeedRefresh: n, onOfflineReady: o} = t
      , r = e(!1)
      , a = e(!1);
    return {
        updateServiceWorker: function(t={}) {
            const {immediate: e=!1, onNeedRefresh: s, onOfflineReady: n} = t;
            let o;
            return "serviceWorker"in navigator && (o = new O("/sw.js",{
                scope: "/"
            }),
            o.addEventListener("activated", (t=>{
                t.isUpdate ? window.location.reload() : null == n || n()
            }
            )),
            o.register({
                immediate: e
            }).then((t=>t))),
            async(t=!0)=>{}
        }({
            immediate: s,
            onNeedRefresh() {
                r.value = !0,
                null == n || n()
            },
            onOfflineReady() {
                a.value = !0,
                null == o || o()
            }
        }),
        offlineReady: a,
        needRefresh: r
    }
}
const pe = {
    key: 0,
    class: "fixed bottom-0 inset-x-0 pb-2 sm:pb-5 z-20"
}
  , he = {
    class: "max-w-7xl mx-auto px-2 sm:px-6 lg:px-8"
}
  , me = {
    class: "p-2 rounded-lg bg-discord-blurple-600 dark:bg-discord-blurple-700 shadow-lg sm:p-3"
}
  , ge = {
    class: "flex items-center justify-between flex-wrap"
}
  , fe = {
    class: "w-0 flex-1 flex items-center"
}
  , be = {
    class: "flex p-2 rounded-lg bg-discord-blurple-530 dark:bg-discord-blurple-630"
}
  , ve = {
    class: "ml-3 font-medium text-white truncate"
}
  , we = {
    class: "sm:hidden"
}
  , xe = {
    class: "hidden sm:inline"
}
  , ye = {
    key: 0,
    class: "order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto"
}
  , ke = {
    class: "order-2 flex-shrink-0 sm:order-3 sm:ml-2"
}
  , Ce = i("span", {
    class: "sr-only"
}, "Dismiss", -1);
var _e = r({
    setup(t) {
        const {offlineReady: e, needRefresh: s, updateServiceWorker: n} = ue()
          , o = ()=>{
            e.value = !1,
            s.value = !1
        }
        ;
        return (t,r)=>{
            const u = de
              , p = $t;
            return d(e) || d(s) ? (a(),
            l("div", pe, [i("div", he, [i("div", me, [i("div", ge, [i("div", fe, [i("span", be, [i(u, {
                class: "fill-current text-gray-200 h-6 w-6",
                "aria-hidden": "true"
            })]), i("p", ve, [i("span", we, c(d(e) ? "App ready to work offline." : "New content available."), 1), i("span", xe, c(d(e) ? "App ready to work offline." : "New content available, click refresh to update."), 1)])]), d(s) ? (a(),
            l("div", ye, [i("button", {
                class: "\n\t\t\t\t\t\t\t\tflex\n\t\t\t\t\t\t\t\titems-center\n\t\t\t\t\t\t\t\tjustify-center\n\t\t\t\t\t\t\t\tpx-4\n\t\t\t\t\t\t\t\tpy-2\n\t\t\t\t\t\t\t\tborder border-transparent\n\t\t\t\t\t\t\t\trounded-md\n\t\t\t\t\t\t\t\ttext-sm\n\t\t\t\t\t\t\t\tfont-medium\n\t\t\t\t\t\t\t\ttext-gray-200\n\t\t\t\t\t\t\t\tbg-discord-blurple-530\n\t\t\t\t\t\t\t\tdark:bg-discord-blurple-630\n\t\t\t\t\t\t\t\thover:bg-discord-blurple-460\n\t\t\t\t\t\t\t\tdark:hover:bg-discord-blurple-600\n\t\t\t\t\t\t\t\tfocus:outline-none\n\t\t\t\t\t\t\t\tfocus-visible:ring-1 focus-visible:ring-white\n\t\t\t\t\t\t\t",
                onClick: r[1] || (r[1] = t=>d(n)(!0))
            }, " Refresh ")])) : j("", !0), i("div", ke, [i("button", {
                type: "button",
                class: "-mr-1 flex p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white",
                onClick: o
            }, [Ce, i(p, {
                class: "fill-current text-gray-200 h-6 w-6",
                "aria-hidden": "true"
            })])])])])])])) : j("", !0)
        }
    }
});
const je = {
    class: "min-h-full grid grid-layout"
}
  , Se = {
    id: "container",
    class: "grid grid-layout-container lg:custom-scroll"
}
  , Me = {
    class: "bg-white dark:bg-[#1d1d1d]"
};
var Re = r({
    setup: t=>(at().dispatch("fetchStats"),
    (t,e)=>{
        const s = u("router-view")
          , n = mt;
        return a(),
        l(S, null, [i("div", je, [i(le), i("div", Se, [i("div", Me, [i(s)]), i(n)])]), i(_e)], 64)
    }
    )
});
let Oe;
const Te = {}
  , Le = function(t, e) {
    if (!e || 0 === e.length)
        return t();
    if (void 0 === Oe) {
        const t = document.createElement("link").relList;
        Oe = t && t.supports && t.supports("modulepreload") ? "modulepreload" : "preload"
    }
    return Promise.all(e.map((t=>{
        if ((t = `/${t}`)in Te)
            return;
        Te[t] = !0;
        const e = t.endsWith(".css")
          , s = e ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${t}"]${s}`))
            return;
        const n = document.createElement("link");
        return n.rel = e ? "stylesheet" : Oe,
        e || (n.as = "script",
        n.crossOrigin = ""),
        n.href = t,
        document.head.appendChild(n),
        e ? new Promise(((t,e)=>{
            n.addEventListener("load", t),
            n.addEventListener("error", e)
        }
        )) : void 0
    }
    ))).then((()=>t()))
}
  , Ae = {}
  , Pe = {
    width: "100%",
    height: "100%",
    viewBox: "0 0 5216 927",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
}
  , ze = i("g", {
    "clip-path": "url(#clip0)"
}, [i("path", {
    d: "M4677.1 692.37C4739.89 751.167 4824.06 791.257 4905.55 791.257C5003.09 791.257 5057.87 747.156 5057.87 679.006C5057.87 606.85 5001.75 584.134 4921.59 550.728L4802.68 498.614C4715.84 462.533 4626.33 394.383 4626.33 266.097C4626.33 127.126 4749.25 20.2217 4918.92 20.2217C5021.79 20.2217 5120.66 62.9858 5188.8 131.136L5108.63 230.019C5053.85 183.252 4993.74 155.187 4918.92 155.187C4836.08 155.187 4782.64 193.941 4782.64 258.082C4782.64 326.232 4849.44 351.623 4921.59 381.019L5039.16 430.464C5143.37 474.558 5215.51 540.035 5215.51 666.98C5215.51 808.627 5097.94 926.221 4901.56 926.221C4783.98 926.221 4670.42 879.451 4587.59 797.937L4677.1 692.37Z",
    fill: "white"
}), i("path", {
    d: "M4354.62 20.2217H4506.42V625.218C4506.42 785.559 4411.32 925.689 4228.89 925.689C4104.78 933.776 3998.36 848.244 3971.19 761.134C3993.8 757.707 4015.81 754.196 4043.3 745.549C4065.15 738.673 4097.83 723.903 4097.83 723.903C4122.43 763.127 4165.98 789.193 4215.6 789.193C4292.39 789.193 4354.64 726.761 4354.64 649.746L4354.62 20.2217Z",
    fill: "white"
}), i("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M4256.21 348.906C4256.21 282.978 4243.78 225.648 4218.94 175.965C4193.14 127.234 4155.88 89.0164 4106.19 61.3076C4056.51 33.5989 3996.32 20.2217 3924.65 20.2217H3659.03V689.056H3884.98H3912.23C3978.6 689.056 4029.45 678.548 4076.65 654.747C4076.59 653.088 4076.57 651.421 4076.57 649.746C4076.57 572.732 4138.82 510.3 4215.61 510.3C4217.89 510.3 4220.16 510.355 4222.41 510.464C4246.5 461.424 4256.21 412.805 4256.21 348.906ZM3819.55 163.544V545.734H3910.32C3968.61 545.734 4012.56 528.534 4042.18 493.183C4071.8 458.785 4087.08 411.967 4087.08 351.772C4087.08 292.533 4072.75 246.67 4044.09 213.229C4015.42 179.786 3972.43 163.544 3916.05 163.544H3819.55Z",
    fill: "white"
}), i("path", {
    d: "M4303.87 649.747C4303.87 698.271 4264.53 737.606 4216.01 737.606C4167.49 737.606 4128.15 698.271 4128.15 649.747C4128.15 601.222 4167.49 561.887 4216.01 561.887C4264.53 561.887 4303.87 601.222 4303.87 649.747Z",
    fill: "white"
}), i("path", {
    d: "M253.386 689.469C327.011 689.469 390.119 675.125 441.752 645.481C493.386 616.793 532.589 576.63 558.405 524.991C584.222 474.309 597.609 415.02 597.609 349.038C597.609 283.055 585.178 225.679 560.318 175.953C534.501 127.184 497.21 88.933 447.489 61.2012C397.768 33.4694 337.529 20.0816 265.816 20.0816H0V689.469H253.386ZM160.637 546.029V163.522H257.211C313.625 163.522 356.653 179.778 385.338 213.248C414.023 246.717 428.366 292.618 428.366 351.907C428.366 412.152 413.067 459.009 383.426 493.434C353.784 528.816 309.8 546.029 251.474 546.029H160.637ZM870.299 20.0816H709.662V689.469H870.299V20.0816ZM1229.12 709.551C1308.48 709.551 1371.59 690.426 1417.48 651.219C1462.42 612.968 1485.37 560.373 1485.37 494.391C1485.37 444.665 1471.03 403.545 1442.34 371.032C1413.66 339.475 1367.76 312.7 1303.7 292.618L1234.85 270.624C1209.04 260.105 1190.87 249.586 1179.4 239.067C1166.97 228.548 1161.23 216.117 1161.23 199.86C1161.23 159.697 1192.78 139.615 1256.85 139.615C1324.74 139.615 1389.76 161.609 1452.86 206.554V59.2886C1385.93 20.0816 1315.17 0 1239.64 0C1162.19 0 1100.99 18.1691 1057.01 54.5072C1013.02 91.8017 991.031 141.528 991.031 205.598C991.031 253.411 1004.42 292.618 1030.23 323.219C1056.05 354.775 1098.12 379.638 1155.49 399.72L1233.9 425.539C1261.63 437.014 1280.75 447.534 1291.27 458.052C1301.79 468.571 1306.57 482.915 1306.57 499.172C1306.57 545.073 1275.01 568.023 1210.95 568.023C1172.7 568.023 1134.46 560.373 1095.25 546.029C1056.05 531.685 1021.63 513.516 991.031 489.609V638.787C1062.74 685.644 1142.11 709.551 1229.12 709.551ZM1913.29 708.595C1954.43 708.595 1994.57 702.857 2031.85 692.338C2069.17 681.819 2101.67 667.475 2129.39 649.306V502.997C2104.53 520.21 2076.8 533.598 2045.26 544.116C2013.69 554.635 1982.15 560.373 1949.64 560.373C1904.69 560.373 1864.53 551.767 1831.06 533.598C1797.6 516.385 1771.78 492.478 1753.61 460.921C1735.45 429.364 1725.89 393.982 1725.89 353.819C1725.89 313.656 1735.45 278.274 1753.61 246.717C1771.78 215.16 1797.6 191.254 1831.06 174.041C1864.53 156.828 1902.77 148.221 1947.72 148.221C2012.73 148.221 2072.02 168.303 2126.54 207.51V55.4635C2064.39 19.1253 1994.57 0.956277 1915.22 0.956277C1843.49 0.956277 1780.39 16.2564 1726.84 46.857C1672.34 77.4576 1631.22 119.533 1601.58 174.041C1571.94 228.548 1557.6 289.749 1557.6 358.601C1557.6 423.627 1571.94 482.915 1599.67 535.51C1627.4 589.061 1668.51 631.137 1722.06 661.737C1775.61 693.294 1839.67 708.595 1913.29 708.595ZM2553.67 708.595C2621.56 708.595 2681.82 693.294 2735.34 663.65C2787.93 634.006 2830.02 591.93 2859.64 538.379C2889.29 484.828 2903.63 423.627 2903.63 355.732C2903.63 287.837 2889.29 226.635 2859.64 172.128C2830.02 118.577 2787.93 76.5013 2735.34 45.9007C2681.82 16.2564 2621.56 0.956277 2553.67 0.956277C2486.73 0.956277 2426.51 16.2564 2373.92 45.9007C2321.33 76.5013 2280.22 118.577 2250.58 172.128C2220.93 226.635 2205.63 287.837 2205.63 355.732C2205.63 423.627 2220.93 484.828 2250.58 538.379C2280.22 591.93 2321.33 634.006 2373.92 663.65C2426.51 693.294 2486.73 708.595 2553.67 708.595ZM2553.67 556.548C2517.34 556.548 2485.8 547.942 2459.01 530.729C2431.29 513.516 2410.24 489.609 2395.9 459.009C2381.56 429.364 2373.92 394.939 2373.92 356.688C2373.92 318.437 2381.56 284.012 2395.9 252.455C2410.24 221.854 2431.29 197.948 2459.01 179.778C2485.8 161.609 2517.34 153.003 2553.67 153.003C2590.98 153.003 2622.52 161.609 2650.25 179.778C2677.97 197.948 2699.02 221.854 2713.36 252.455C2727.7 284.012 2734.41 318.437 2734.41 356.688C2734.41 394.939 2726.74 429.364 2712.4 459.009C2698.05 489.609 2677.04 513.516 2650.25 530.729C2622.52 547.942 2590.98 556.548 2553.67 556.548ZM3365.13 419.802C3423.46 413.108 3467.42 392.07 3499 357.644C3530.54 323.219 3545.84 279.23 3545.84 226.635C3545.84 162.565 3524.8 112.84 3481.77 75.5452C3438.74 38.2507 3380.44 20.0816 3307.76 20.0816H3013.24V689.469H3173.9V407.37L3371.81 689.469H3564L3365.13 419.802ZM3173.9 154.915H3277.15C3308.72 154.915 3332.63 162.566 3348.87 176.91C3365.13 192.21 3373.73 214.204 3373.73 241.936C3373.73 271.58 3364.17 293.574 3346.01 309.831C3327.85 326.087 3301.06 333.738 3265.7 333.738H3173.9V154.915Z",
    fill: "white"
})], -1)
  , $e = i("defs", null, [i("clipPath", {
    id: "clip0"
}, [i("rect", {
    width: "5215.51",
    height: "926.222",
    fill: "white"
})])], -1);
Ae.render = function(t, e) {
    return a(),
    l("svg", Pe, [ze, $e])
}
;
const We = {
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    width: "1.2em",
    height: "1.2em",
    preserveAspectRatio: "xMidYMid meet",
    viewBox: "0 0 24 24"
}
  , Ee = i("g", {
    fill: "none"
}, [i("path", {
    d: "M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1M8 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M8 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m0 0h2a2 2 0 0 1 2 2v3m2 4H10m0 0l3-3m-3 3l3 3",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
})], -1);
var De = {
    name: "heroicons-outline-clipboard-copy",
    render: function(t, e) {
        return a(),
        l("svg", We, [Ee])
    }
};
const Fe = {
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    width: "1.2em",
    height: "1.2em",
    preserveAspectRatio: "xMidYMid meet",
    viewBox: "0 0 24 24"
}
  , Ge = i("g", {
    fill: "none"
}, [i("path", {
    d: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9l2 2l4-4",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
})], -1);
var Ie = {
    name: "heroicons-outline-clipboard-check",
    render: function(t, e) {
        return a(),
        l("svg", Fe, [Ge])
    }
};
const Ve = {
    class: "text-gray-200 bg-discord-blurple-560 p-4 md:text-lg mx-auto rounded-md shadow flex items-center"
}
  , He = i("span", {
    class: "hover:text-white mr-2"
}, "npm install discord.js", -1);
var Ue = r({
    setup(t) {
        const s = e()
          , n = e(!1)
          , o = T((t=>{
            t(),
            n.value = !1
        }
        ), 1e3)
          , {show: r, hide: c} = L(s, {
            theme: "discord",
            content: "Copied",
            trigger: "manual",
            hideOnClick: !1
        })
          , d = async()=>{
            try {
                await navigator.clipboard.writeText("npm install discord.js"),
                r()
            } catch {}
            n.value = !0,
            o(c)
        }
        ;
        return (t,e)=>{
            const o = De
              , r = Ie;
            return a(),
            l("code", Ve, [He, i("button", {
                ref: s,
                class: "focus:outline-none",
                "aria-label": "Copy install command"
            }, [n.value ? (a(),
            l(r, {
                key: 1,
                class: "inline-block fill-current text-discord-green-500 cursor-pointer mb-1",
                "aria-hidden": "true",
                onClick: d
            })) : (a(),
            l(o, {
                key: 0,
                class: "inline-block fill-current text-gray-200 cursor-pointer hover:text-white mb-1",
                "aria-hidden": "true",
                onClick: d
            }))], 512)])
        }
    }
});
const Je = {
    class: "bg-discord-blurple-500 py-20"
}
  , Ne = {
    class: "max-w-3xl sm:mx-auto text-center px-8 sm:px-16 flex flex-col gap-10 md:px-12"
}
  , Be = {
    class: "\n\t\t\tprose prose-discord\n\t\t\tdark:prose-light\n\t\t\tlg:prose-lg\n\t\t\tpx-6\n\t\t\tmx-auto\n\t\t\tpb-8\n\t\t\tw-full\n\t\t\txl:grid xl:grid-cols-2 xl:gap-x-12 xl:max-w-7xl\n\t\t"
}
  , Ze = {
    class: "col-span-full"
}
  , Ye = i("h2", null, "About", -1)
  , qe = i("h3", null, "Imagine a bot", -1)
  , Ke = h(" discord.js is a powerful ")
  , Qe = {
    href: "https://nodejs.org",
    target: "_blank",
    rel: "noopener"
}
  , Xe = h("Node.js ")
  , ts = h(" module that allows you to interact with the ")
  , es = {
    href: "https://discord.com/developers/docs/intro",
    target: "_blank",
    rel: "noopener"
}
  , ss = h("Discord API ")
  , ns = h(" very easily. It takes a much more object-oriented approach than most other JS Discord libraries, making your bot's code significantly tidier and easier to comprehend. ")
  , os = i("p", null, " Usability, consistency, and performance are key focuses of discord.js, and it also has nearly 100% coverage of the Discord API. It receives new Discord features shortly after they arrive in the API. ", -1)
  , rs = i("div", null, [i("h2", null, "Why?"), i("ul", null, [i("li", null, "Object-oriented"), i("li", null, "Speedy and efficient"), i("li", null, "Feature-rich"), i("li", null, "Flexible"), i("li", null, "100% Promise-based")])], -1)
  , as = i("h2", null, "Statistics", -1)
  , ls = i("p", {
    class: "text-center"
}, "... and growing!", -1);
const is = [{
    name: "index",
    path: "/",
    component: r({
        setup(t) {
            const e = at();
            return s((()=>e.state.docs)).value || (e.dispatch("fetchDocs", {
                inputSource: F
            }),
            e.dispatch("fetchTags", {
                currentSource: F
            })),
            (t,e)=>{
                const s = bt;
                return a(),
                l(S, null, [i("div", Je, [i("div", Ne, [i(Ae, {
                    class: "filter drop-shadow-lg my-6"
                }), i(Ue)])]), i("div", Be, [i("div", Ze, [Ye, qe, i("p", null, [Ke, i("a", Qe, [Xe, i(s, {
                    class: "h-5 w-5 inline-block mb-1",
                    "aria-hidden": "true"
                })]), ts, i("a", es, [ss, i(s, {
                    class: "h-5 w-5 inline-block mb-1",
                    "aria-hidden": "true"
                })]), ns]), os]), rs, i("div", null, [as, i(lt), ls])])], 64)
            }
        }
    }),
    props: !0
}, {
    path: "/docs",
    component: ()=>Le((()=>import("./docs.3c5b1683.js")), ["assets/docs.3c5b1683.js", "assets/docs.675be814.css", "assets/vendor.79db57bd.js", "assets/chevron-down.046bf525.js", "assets/headlessui.esm.5f2b3dc4.js", "assets/Spinner.c85b1c37.js", "assets/Spinner.af24072b.css"]),
    children: [{
        name: "docs-source",
        path: ":source",
        component: ()=>Le((()=>import("./index.3fe4ef3d.js")), ["assets/index.3fe4ef3d.js", "assets/Spinner.c85b1c37.js", "assets/Spinner.af24072b.css", "assets/vendor.79db57bd.js"]),
        props: !0
    }, {
        name: "docs-source-tag-search",
        path: ":source/:tag/search",
        component: ()=>Le((()=>import("./search.3f397337.js")), ["assets/search.3f397337.js", "assets/search.055dc457.css", "assets/vendor.79db57bd.js"]),
        props: !0
    }, {
        name: "docs-source-tag-category-file",
        path: ":source/:tag/:category/:file",
        component: ()=>Le((()=>import("./[file].a0e5e2f0.js")), ["assets/[file].a0e5e2f0.js", "assets/vendor.79db57bd.js", "assets/SourceButton.vue_vue&type=script&setup=true&lang.a0edd75c.js"]),
        props: !0
    }, {
        name: "docs-source-tag-class-class",
        path: ":source/:tag/class/:class",
        component: ()=>Le((()=>import("./[class].6184defe.js")), ["assets/[class].6184defe.js", "assets/[class].32241939.css", "assets/vendor.79db57bd.js", "assets/SourceButton.vue_vue&type=script&setup=true&lang.a0edd75c.js", "assets/See.vue_vue&type=script&setup=true&lang.a1e42551.js", "assets/See.vue_vue&type=script&setup=true&lang.9c59f874.css", "assets/chevron-down.046bf525.js", "assets/headlessui.esm.5f2b3dc4.js"]),
        props: !0
    }, {
        name: "docs-source-tag-typedef-typedef",
        path: ":source/:tag/typedef/:typedef",
        component: ()=>Le((()=>import("./[typedef].5e74e50b.js")), ["assets/[typedef].5e74e50b.js", "assets/vendor.79db57bd.js", "assets/SourceButton.vue_vue&type=script&setup=true&lang.a0edd75c.js", "assets/See.vue_vue&type=script&setup=true&lang.a1e42551.js", "assets/See.vue_vue&type=script&setup=true&lang.9c59f874.css", "assets/headlessui.esm.5f2b3dc4.js"]),
        props: !0
    }],
    props: !0
}, {
    name: "all",
    path: "/:all(.*)*",
    component: ()=>Le((()=>import("./[...all].92bc89af.js")), ["assets/[...all].92bc89af.js", "assets/vendor.79db57bd.js"]),
    props: !0
}];
var cs = A({
    history: P(),
    routes: is
});
const ds = z(Re);
ds.use(rt, ot),
ds.use(cs),
ds.use($),
ds.mount("#app");
export {H as B, I as C, K as D, F as M, Z as R, J as V, De as _, B as a, Ie as b, bt as c, nt as f, Y as i, st as s, at as u};
