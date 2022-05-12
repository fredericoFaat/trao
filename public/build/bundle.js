
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function (sveltestrap, BABYLON) {
    'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var BABYLON__namespace = /*#__PURE__*/_interopNamespace(BABYLON);

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function set_store_value(store, ret, value) {
        store.set(value);
        return ret;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.48.0' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const babylonStore = writable({
        engine: null,
        canvas: null
    });

    const geralState = writable({
        disciplina: 'Introdução ao Blender',
        objetivo: "Conhecer as principais funções do Blender na elaboração de Objetos de Aprendizagem",
        roteiros: [
            { unidade: "" },
            { unidade: "1. O que é o Blender" },
            { unidade: "2. Principais funções" },
            { unidade: "3. Primeiro Projeto" },
            { unidade: "4. Segundo Projeto" },
            { unidade: "5. Terceiro Projeto" },
            { unidade: "6. Quarto Projeto" },
            { unidade: "7. Quinto Projeto" },
            { unidade: "8. Sexto Projeto" },
            { unidade: "9. Sétimo Projeto" },
            { unidade: "10. Oitavo Projeto" },
        ]
    });

    /* src/components/layout/2layoutVisaoGeral.svelte generated by Svelte v3.48.0 */
    const file$e = "src/components/layout/2layoutVisaoGeral.svelte";
    const get_roteiro_slot_changes = dirty => ({});
    const get_roteiro_slot_context = ctx => ({});
    const get_objetivo_slot_changes = dirty => ({});
    const get_objetivo_slot_context = ctx => ({});

    // (9:6) <Col>
    function create_default_slot_3$4(ctx) {
    	let h2;
    	let t1;
    	let div1;
    	let h3;
    	let t2;
    	let div0;
    	let current;
    	const objetivo_slot_template = /*#slots*/ ctx[0].objetivo;
    	const objetivo_slot = create_slot(objetivo_slot_template, ctx, /*$$scope*/ ctx[1], get_objetivo_slot_context);

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "OBJETIVO";
    			t1 = space();
    			div1 = element("div");
    			h3 = element("h3");
    			if (objetivo_slot) objetivo_slot.c();
    			t2 = space();
    			div0 = element("div");
    			add_location(h2, file$e, 9, 8, 165);
    			add_location(h3, file$e, 11, 10, 224);
    			attr_dev(div0, "class", "vl");
    			add_location(div0, file$e, 12, 10, 268);
    			attr_dev(div1, "class", "objetivo");
    			add_location(div1, file$e, 10, 8, 191);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, h3);

    			if (objetivo_slot) {
    				objetivo_slot.m(h3, null);
    			}

    			append_dev(div1, t2);
    			append_dev(div1, div0);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (objetivo_slot) {
    				if (objetivo_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						objetivo_slot,
    						objetivo_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(objetivo_slot_template, /*$$scope*/ ctx[1], dirty, get_objetivo_slot_changes),
    						get_objetivo_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(objetivo_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(objetivo_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (objetivo_slot) objetivo_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$4.name,
    		type: "slot",
    		source: "(9:6) <Col>",
    		ctx
    	});

    	return block;
    }

    // (16:6) <Col>
    function create_default_slot_2$5(ctx) {
    	let h2;
    	let t1;
    	let div;
    	let current;
    	const roteiro_slot_template = /*#slots*/ ctx[0].roteiro;
    	const roteiro_slot = create_slot(roteiro_slot_template, ctx, /*$$scope*/ ctx[1], get_roteiro_slot_context);

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "ROTEIRO";
    			t1 = space();
    			div = element("div");
    			if (roteiro_slot) roteiro_slot.c();
    			add_location(h2, file$e, 16, 8, 335);
    			attr_dev(div, "class", "roteiro");
    			add_location(div, file$e, 17, 8, 360);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div, anchor);

    			if (roteiro_slot) {
    				roteiro_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (roteiro_slot) {
    				if (roteiro_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						roteiro_slot,
    						roteiro_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(roteiro_slot_template, /*$$scope*/ ctx[1], dirty, get_roteiro_slot_changes),
    						get_roteiro_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(roteiro_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(roteiro_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div);
    			if (roteiro_slot) roteiro_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$5.name,
    		type: "slot",
    		source: "(16:6) <Col>",
    		ctx
    	});

    	return block;
    }

    // (8:4) <Row>
    function create_default_slot_1$a(ctx) {
    	let col0;
    	let t;
    	let col1;
    	let current;

    	col0 = new sveltestrap.Col({
    			props: {
    				$$slots: { default: [create_default_slot_3$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	col1 = new sveltestrap.Col({
    			props: {
    				$$slots: { default: [create_default_slot_2$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(col0.$$.fragment);
    			t = space();
    			create_component(col1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(col0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(col1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const col0_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				col0_changes.$$scope = { dirty, ctx };
    			}

    			col0.$set(col0_changes);
    			const col1_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				col1_changes.$$scope = { dirty, ctx };
    			}

    			col1.$set(col1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col0.$$.fragment, local);
    			transition_in(col1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col0.$$.fragment, local);
    			transition_out(col1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(col0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(col1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$a.name,
    		type: "slot",
    		source: "(8:4) <Row>",
    		ctx
    	});

    	return block;
    }

    // (7:2) <Container>
    function create_default_slot$c(ctx) {
    	let row;
    	let current;

    	row = new sveltestrap.Row({
    			props: {
    				$$slots: { default: [create_default_slot_1$a] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(row.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(row, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const row_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				row_changes.$$scope = { dirty, ctx };
    			}

    			row.$set(row_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(row, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$c.name,
    		type: "slot",
    		source: "(7:2) <Container>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$e(ctx) {
    	let div;
    	let h1;
    	let t1;
    	let container;
    	let current;

    	container = new sveltestrap.Container({
    			props: {
    				$$slots: { default: [create_default_slot$c] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "VISÃO GERAL";
    			t1 = space();
    			create_component(container.$$.fragment);
    			add_location(h1, file$e, 5, 2, 100);
    			attr_dev(div, "class", "visaoGeral");
    			add_location(div, file$e, 4, 0, 73);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			mount_component(container, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const container_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				container_changes.$$scope = { dirty, ctx };
    			}

    			container.$set(container_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(container.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(container.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(container);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('_2layoutVisaoGeral', slots, ['objetivo','roteiro']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<_2layoutVisaoGeral> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ Col: sveltestrap.Col, Container: sveltestrap.Container, Row: sveltestrap.Row });
    	return [slots, $$scope];
    }

    class _2layoutVisaoGeral extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "_2layoutVisaoGeral",
    			options,
    			id: create_fragment$e.name
    		});
    	}
    }

    /* src/components/layout/7layout1.svelte generated by Svelte v3.48.0 */
    const file$d = "src/components/layout/7layout1.svelte";
    const get_parte2_slot_changes = dirty => ({});
    const get_parte2_slot_context = ctx => ({});
    const get_parte1_slot_changes = dirty => ({});
    const get_parte1_slot_context = ctx => ({});

    // (7:4) <Row>
    function create_default_slot_2$4(ctx) {
    	let current;
    	const parte1_slot_template = /*#slots*/ ctx[0].parte1;
    	const parte1_slot = create_slot(parte1_slot_template, ctx, /*$$scope*/ ctx[1], get_parte1_slot_context);

    	const block = {
    		c: function create() {
    			if (parte1_slot) parte1_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (parte1_slot) {
    				parte1_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (parte1_slot) {
    				if (parte1_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						parte1_slot,
    						parte1_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(parte1_slot_template, /*$$scope*/ ctx[1], dirty, get_parte1_slot_changes),
    						get_parte1_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(parte1_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(parte1_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (parte1_slot) parte1_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$4.name,
    		type: "slot",
    		source: "(7:4) <Row>",
    		ctx
    	});

    	return block;
    }

    // (10:4) <Row>
    function create_default_slot_1$9(ctx) {
    	let current;
    	const parte2_slot_template = /*#slots*/ ctx[0].parte2;
    	const parte2_slot = create_slot(parte2_slot_template, ctx, /*$$scope*/ ctx[1], get_parte2_slot_context);

    	const block = {
    		c: function create() {
    			if (parte2_slot) parte2_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (parte2_slot) {
    				parte2_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (parte2_slot) {
    				if (parte2_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						parte2_slot,
    						parte2_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(parte2_slot_template, /*$$scope*/ ctx[1], dirty, get_parte2_slot_changes),
    						get_parte2_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(parte2_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(parte2_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (parte2_slot) parte2_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$9.name,
    		type: "slot",
    		source: "(10:4) <Row>",
    		ctx
    	});

    	return block;
    }

    // (6:2) <Col>
    function create_default_slot$b(ctx) {
    	let row0;
    	let t;
    	let row1;
    	let current;

    	row0 = new sveltestrap.Row({
    			props: {
    				$$slots: { default: [create_default_slot_2$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row1 = new sveltestrap.Row({
    			props: {
    				$$slots: { default: [create_default_slot_1$9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(row0.$$.fragment);
    			t = space();
    			create_component(row1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(row0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(row1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const row0_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				row0_changes.$$scope = { dirty, ctx };
    			}

    			row0.$set(row0_changes);
    			const row1_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				row1_changes.$$scope = { dirty, ctx };
    			}

    			row1.$set(row1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row0.$$.fragment, local);
    			transition_in(row1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row0.$$.fragment, local);
    			transition_out(row1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(row0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(row1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$b.name,
    		type: "slot",
    		source: "(6:2) <Col>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let div;
    	let col;
    	let current;

    	col = new sveltestrap.Col({
    			props: {
    				$$slots: { default: [create_default_slot$b] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(col.$$.fragment);
    			attr_dev(div, "class", "slide svelte-1qcv6t5");
    			add_location(div, file$d, 4, 0, 62);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(col, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const col_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				col_changes.$$scope = { dirty, ctx };
    			}

    			col.$set(col_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(col);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('_7layout1', slots, ['parte1','parte2']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<_7layout1> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ Col: sveltestrap.Col, Row: sveltestrap.Row });
    	return [slots, $$scope];
    }

    class _7layout1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "_7layout1",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    /* src/cenas/u01s01i05.svelte generated by Svelte v3.48.0 */
    const file$c = "src/cenas/u01s01i05.svelte";

    // (14:1) <Button   class="anterior"   size="lg"   color="danger"   on:click={() => ($storeCenas = scene4)}  >
    function create_default_slot_1$8(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Anterior");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$8.name,
    		type: "slot",
    		source: "(14:1) <Button   class=\\\"anterior\\\"   size=\\\"lg\\\"   color=\\\"danger\\\"   on:click={() => ($storeCenas = scene4)}  >",
    		ctx
    	});

    	return block;
    }

    // (22:1) <Button   class="proximo"   size="lg"   color="primary"   on:click={() => ($storeCenas = inicioGeral)}  >
    function create_default_slot$a(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Próximo");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$a.name,
    		type: "slot",
    		source: "(22:1) <Button   class=\\\"proximo\\\"   size=\\\"lg\\\"   color=\\\"primary\\\"   on:click={() => ($storeCenas = inicioGeral)}  >",
    		ctx
    	});

    	return block;
    }

    // (35:2) 
    function create_parte1_slot$1(ctx) {
    	let div;
    	let h1;
    	let t1;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "Titulo 1";
    			t1 = space();
    			p = element("p");
    			p.textContent = "textoo 11";
    			add_location(h1, file$c, 35, 3, 612);
    			add_location(p, file$c, 36, 3, 633);
    			attr_dev(div, "slot", "parte1");
    			add_location(div, file$c, 34, 2, 589);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			append_dev(div, p);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_parte1_slot$1.name,
    		type: "slot",
    		source: "(35:2) ",
    		ctx
    	});

    	return block;
    }

    // (39:2) 
    function create_parte2_slot$1(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "texto 222";
    			add_location(p, file$c, 39, 3, 684);
    			attr_dev(div, "slot", "parte2");
    			add_location(div, file$c, 38, 2, 661);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_parte2_slot$1.name,
    		type: "slot",
    		source: "(39:2) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let div0;
    	let button0;
    	let t0;
    	let button1;
    	let t1;
    	let div1;
    	let layout1;
    	let current;

    	button0 = new sveltestrap.Button({
    			props: {
    				class: "anterior",
    				size: "lg",
    				color: "danger",
    				$$slots: { default: [create_default_slot_1$8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button0.$on("click", /*click_handler*/ ctx[1]);

    	button1 = new sveltestrap.Button({
    			props: {
    				class: "proximo",
    				size: "lg",
    				color: "primary",
    				$$slots: { default: [create_default_slot$a] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1.$on("click", /*click_handler_1*/ ctx[2]);

    	layout1 = new _7layout1({
    			props: {
    				$$slots: {
    					parte2: [create_parte2_slot$1],
    					parte1: [create_parte1_slot$1]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			create_component(button0.$$.fragment);
    			t0 = space();
    			create_component(button1.$$.fragment);
    			t1 = space();
    			div1 = element("div");
    			create_component(layout1.$$.fragment);
    			add_location(div0, file$c, 12, 0, 290);
    			add_location(div1, file$c, 32, 0, 570);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			mount_component(button0, div0, null);
    			append_dev(div0, t0);
    			mount_component(button1, div0, null);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			mount_component(layout1, div1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const button0_changes = {};

    			if (dirty & /*$$scope*/ 8) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty & /*$$scope*/ 8) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    			const layout1_changes = {};

    			if (dirty & /*$$scope*/ 8) {
    				layout1_changes.$$scope = { dirty, ctx };
    			}

    			layout1.$set(layout1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			transition_in(layout1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			transition_out(layout1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			destroy_component(button0);
    			destroy_component(button1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			destroy_component(layout1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let $storeCenas;
    	validate_store(cenas, 'storeCenas');
    	component_subscribe($$self, cenas, $$value => $$invalidate(0, $storeCenas = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('U01s01i05', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<U01s01i05> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => set_store_value(cenas, $storeCenas = U01s01i04, $storeCenas);
    	const click_handler_1 = () => set_store_value(cenas, $storeCenas = _1InicioGeral, $storeCenas);

    	$$self.$capture_state = () => ({
    		Button: sveltestrap.Button,
    		storeCenas: cenas,
    		scene4: U01s01i04,
    		inicioGeral: _1InicioGeral,
    		Layout1: _7layout1,
    		$storeCenas
    	});

    	return [$storeCenas, click_handler, click_handler_1];
    }

    class U01s01i05 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "U01s01i05",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    /* src/cenas/u01s01i04.svelte generated by Svelte v3.48.0 */
    const file$b = "src/cenas/u01s01i04.svelte";

    // (15:1) <Button   class="anterior"   size="lg"   color="danger"   on:click={() => ($storeCenas = scene3)}  >
    function create_default_slot_1$7(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Anterior");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$7.name,
    		type: "slot",
    		source: "(15:1) <Button   class=\\\"anterior\\\"   size=\\\"lg\\\"   color=\\\"danger\\\"   on:click={() => ($storeCenas = scene3)}  >",
    		ctx
    	});

    	return block;
    }

    // (23:1) <Button   class="proximo"   size="lg"   color="primary"   on:click={() => ($storeCenas = scene5)}  >
    function create_default_slot$9(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Próximo");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$9.name,
    		type: "slot",
    		source: "(23:1) <Button   class=\\\"proximo\\\"   size=\\\"lg\\\"   color=\\\"primary\\\"   on:click={() => ($storeCenas = scene5)}  >",
    		ctx
    	});

    	return block;
    }

    // (36:2) 
    function create_parte1_slot(ctx) {
    	let div;
    	let h1;
    	let t1;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "Titulo 1";
    			t1 = space();
    			p = element("p");
    			p.textContent = "textoo 11";
    			add_location(h1, file$b, 36, 3, 591);
    			add_location(p, file$b, 37, 3, 612);
    			attr_dev(div, "slot", "parte1");
    			add_location(div, file$b, 35, 2, 568);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			append_dev(div, p);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_parte1_slot.name,
    		type: "slot",
    		source: "(36:2) ",
    		ctx
    	});

    	return block;
    }

    // (40:2) 
    function create_parte2_slot(ctx) {
    	let div;
    	let h1;
    	let t1;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "Titulo 2";
    			t1 = space();
    			p = element("p");
    			p.textContent = "texto 222";
    			add_location(h1, file$b, 40, 3, 663);
    			add_location(p, file$b, 41, 3, 684);
    			attr_dev(div, "slot", "parte2");
    			add_location(div, file$b, 39, 2, 640);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			append_dev(div, p);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_parte2_slot.name,
    		type: "slot",
    		source: "(40:2) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let div0;
    	let button0;
    	let t0;
    	let button1;
    	let t1;
    	let div1;
    	let layout1;
    	let current;

    	button0 = new sveltestrap.Button({
    			props: {
    				class: "anterior",
    				size: "lg",
    				color: "danger",
    				$$slots: { default: [create_default_slot_1$7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button0.$on("click", /*click_handler*/ ctx[1]);

    	button1 = new sveltestrap.Button({
    			props: {
    				class: "proximo",
    				size: "lg",
    				color: "primary",
    				$$slots: { default: [create_default_slot$9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1.$on("click", /*click_handler_1*/ ctx[2]);

    	layout1 = new _7layout1({
    			props: {
    				$$slots: {
    					parte2: [create_parte2_slot],
    					parte1: [create_parte1_slot]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			create_component(button0.$$.fragment);
    			t0 = space();
    			create_component(button1.$$.fragment);
    			t1 = space();
    			div1 = element("div");
    			create_component(layout1.$$.fragment);
    			add_location(div0, file$b, 13, 0, 274);
    			add_location(div1, file$b, 33, 0, 549);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			mount_component(button0, div0, null);
    			append_dev(div0, t0);
    			mount_component(button1, div0, null);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			mount_component(layout1, div1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const button0_changes = {};

    			if (dirty & /*$$scope*/ 8) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty & /*$$scope*/ 8) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    			const layout1_changes = {};

    			if (dirty & /*$$scope*/ 8) {
    				layout1_changes.$$scope = { dirty, ctx };
    			}

    			layout1.$set(layout1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			transition_in(layout1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			transition_out(layout1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			destroy_component(button0);
    			destroy_component(button1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			destroy_component(layout1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let $storeCenas;
    	validate_store(cenas, 'storeCenas');
    	component_subscribe($$self, cenas, $$value => $$invalidate(0, $storeCenas = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('U01s01i04', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<U01s01i04> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => set_store_value(cenas, $storeCenas = U01s01i03, $storeCenas);
    	const click_handler_1 = () => set_store_value(cenas, $storeCenas = U01s01i05, $storeCenas);

    	$$self.$capture_state = () => ({
    		Button: sveltestrap.Button,
    		storeCenas: cenas,
    		scene3: U01s01i03,
    		scene5: U01s01i05,
    		Layout1: _7layout1,
    		$storeCenas
    	});

    	return [$storeCenas, click_handler, click_handler_1];
    }

    class U01s01i04 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "U01s01i04",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    const questoes = writable([
        {
            questao:
                "Which of the following special symbol allowed in a variable name?",
            opcoes: [
                "* (asterisk)",
                "| (pipeline)",
                "- (hyphen)",
                "_ (underscore)",
            ],
            indexCorreto: 3,
        },
        {
            questao:
                "Which of the following correctly shows the hierarchy of arithmetic operations in C?",
            opcoes: ["/ + * -", "* - / +", "+ - / *", "/ * + -"],
            indexCorreto: 3,
        },
        {
            questao:
                "Which header file should be included to use functions like malloc() and calloc()?",
            opcoes: ["memory.h", "stdlib.h", "string.h", "dos.h"],
            indexCorreto: 1,
        },
        {
            questao:
                "Which bitwise operator is suitable for turning off a particular bit in a number?",
            opcoes: ["&& operator", "& operator", "|| operator", "! operator"],
            indexCorreto: 1,
        },
        {
            questao:
                "What function should be used to free the memory allocated by calloc() ?",
            opcoes: [
                "dealloc();",
                "malloc(variable_name, 0)",
                "free();",
                "memalloc(variable_name, 0)",
            ],
            indexCorreto: 2,
        },
    ]
    );

    /* src/components/layout/6layoutQuiz.svelte generated by Svelte v3.48.0 */
    const file$a = "src/components/layout/6layoutQuiz.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i];
    	child_ctx[11] = i;
    	return child_ctx;
    }

    // (96:2) {:else}
    function create_else_block(ctx) {
    	let div;
    	let h1;
    	let t2;
    	let button;
    	let current;

    	button = new sveltestrap.Button({
    			props: {
    				$$slots: { default: [create_default_slot_6$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*reiniciarQuestionario*/ ctx[4]);

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = `Seu resultado: ${/*obterResultado*/ ctx[3]()}`;
    			t2 = space();
    			create_component(button.$$.fragment);
    			attr_dev(h1, "class", "svelte-6xpfq0");
    			add_location(h1, file$a, 97, 6, 2597);
    			attr_dev(div, "class", "tela-resultado svelte-6xpfq0");
    			add_location(div, file$a, 96, 4, 2562);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t2);
    			mount_component(button, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 4096) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(96:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (38:54) 
    function create_if_block_1$1(ctx) {
    	let div4;
    	let col;
    	let t0;
    	let div3;
    	let div1;
    	let div0;
    	let t1;
    	let div2;
    	let button0;
    	let t2;
    	let button1;
    	let current;

    	col = new sveltestrap.Col({
    			props: {
    				$$slots: { default: [create_default_slot_3$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button0 = new sveltestrap.Button({
    			props: {
    				color: "danger",
    				disabled: /*questaoApontada*/ ctx[2] == 0,
    				$$slots: { default: [create_default_slot_2$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button0.$on("click", /*click_handler_2*/ ctx[7]);

    	button1 = new sveltestrap.Button({
    			props: {
    				color: "primary",
    				$$slots: { default: [create_default_slot_1$6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1.$on("click", /*click_handler_3*/ ctx[8]);

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			create_component(col.$$.fragment);
    			t0 = space();
    			div3 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			t1 = space();
    			div2 = element("div");
    			create_component(button0.$$.fragment);
    			t2 = space();
    			create_component(button1.$$.fragment);
    			set_style(div0, "width", /*questaoApontada*/ ctx[2] / /*questoes*/ ctx[0].length * 100 + "%");
    			attr_dev(div0, "class", "svelte-6xpfq0");
    			add_location(div0, file$a, 72, 10, 2009);
    			attr_dev(div1, "class", "barra-progresso svelte-6xpfq0");
    			add_location(div1, file$a, 71, 8, 1969);
    			attr_dev(div2, "class", "botoes svelte-6xpfq0");
    			add_location(div2, file$a, 74, 8, 2099);
    			attr_dev(div3, "class", "rodape svelte-6xpfq0");
    			add_location(div3, file$a, 70, 6, 1940);
    			attr_dev(div4, "class", "tela-perguntas svelte-6xpfq0");
    			add_location(div4, file$a, 38, 4, 958);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			mount_component(col, div4, null);
    			append_dev(div4, t0);
    			append_dev(div4, div3);
    			append_dev(div3, div1);
    			append_dev(div1, div0);
    			append_dev(div3, t1);
    			append_dev(div3, div2);
    			mount_component(button0, div2, null);
    			append_dev(div2, t2);
    			mount_component(button1, div2, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const col_changes = {};

    			if (dirty & /*$$scope, questoes, questaoApontada, respostas*/ 4103) {
    				col_changes.$$scope = { dirty, ctx };
    			}

    			col.$set(col_changes);

    			if (!current || dirty & /*questaoApontada, questoes*/ 5) {
    				set_style(div0, "width", /*questaoApontada*/ ctx[2] / /*questoes*/ ctx[0].length * 100 + "%");
    			}

    			const button0_changes = {};
    			if (dirty & /*questaoApontada*/ 4) button0_changes.disabled = /*questaoApontada*/ ctx[2] == 0;

    			if (dirty & /*$$scope*/ 4096) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty & /*$$scope*/ 4096) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col.$$.fragment, local);
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col.$$.fragment, local);
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			destroy_component(col);
    			destroy_component(button0);
    			destroy_component(button1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(38:54) ",
    		ctx
    	});

    	return block;
    }

    // (26:2) {#if questaoApontada == -1}
    function create_if_block$1(ctx) {
    	let div;
    	let button;
    	let current;

    	button = new sveltestrap.Button({
    			props: {
    				size: "lg",
    				color: "primary",
    				$$slots: { default: [create_default_slot$8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*click_handler*/ ctx[5]);

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(button.$$.fragment);
    			attr_dev(div, "class", "tela-inicio svelte-6xpfq0");
    			add_location(div, file$a, 26, 4, 683);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(button, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 4096) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(26:2) {#if questaoApontada == -1}",
    		ctx
    	});

    	return block;
    }

    // (101:6) <Button on:click={reiniciarQuestionario}>
    function create_default_slot_6$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Reiniciar o questionário");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6$1.name,
    		type: "slot",
    		source: "(101:6) <Button on:click={reiniciarQuestionario}>",
    		ctx
    	});

    	return block;
    }

    // (41:8) <Row>
    function create_default_slot_5$1(ctx) {
    	let div;
    	let h2;
    	let t_value = /*questoes*/ ctx[0][/*questaoApontada*/ ctx[2]].questao + "";
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h2 = element("h2");
    			t = text(t_value);
    			add_location(h2, file$a, 42, 12, 1058);
    			attr_dev(div, "class", "pergunta svelte-6xpfq0");
    			add_location(div, file$a, 41, 10, 1023);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h2);
    			append_dev(h2, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*questoes, questaoApontada*/ 5 && t_value !== (t_value = /*questoes*/ ctx[0][/*questaoApontada*/ ctx[2]].questao + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5$1.name,
    		type: "slot",
    		source: "(41:8) <Row>",
    		ctx
    	});

    	return block;
    }

    // (50:12) {#each questoes[questaoApontada].opcoes as opc, i}
    function create_each_block$2(ctx) {
    	let button;
    	let t0_value = /*opc*/ ctx[9] + "";
    	let t0;
    	let t1;
    	let button_class_value;
    	let mounted;
    	let dispose;

    	function click_handler_1() {
    		return /*click_handler_1*/ ctx[6](/*i*/ ctx[11]);
    	}

    	const block = {
    		c: function create() {
    			button = element("button");
    			t0 = text(t0_value);
    			t1 = space();

    			attr_dev(button, "class", button_class_value = "" + (null_to_empty(/*respostas*/ ctx[1][/*questaoApontada*/ ctx[2]] == /*i*/ ctx[11] && /*respostas*/ ctx[1][/*questaoApontada*/ ctx[2]] !== /*questoes*/ ctx[0][/*questaoApontada*/ ctx[2]].indexCorreto
    			? "errada"
    			: /*respostas*/ ctx[1][/*questaoApontada*/ ctx[2]] == /*i*/ ctx[11] && /*respostas*/ ctx[1][/*questaoApontada*/ ctx[2]] == /*questoes*/ ctx[0][/*questaoApontada*/ ctx[2]].indexCorreto
    				? "correta"
    				: "") + " svelte-6xpfq0"));

    			add_location(button, file$a, 50, 14, 1285);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, t0);
    			append_dev(button, t1);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", click_handler_1, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*questoes, questaoApontada*/ 5 && t0_value !== (t0_value = /*opc*/ ctx[9] + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*respostas, questaoApontada, questoes*/ 7 && button_class_value !== (button_class_value = "" + (null_to_empty(/*respostas*/ ctx[1][/*questaoApontada*/ ctx[2]] == /*i*/ ctx[11] && /*respostas*/ ctx[1][/*questaoApontada*/ ctx[2]] !== /*questoes*/ ctx[0][/*questaoApontada*/ ctx[2]].indexCorreto
    			? "errada"
    			: /*respostas*/ ctx[1][/*questaoApontada*/ ctx[2]] == /*i*/ ctx[11] && /*respostas*/ ctx[1][/*questaoApontada*/ ctx[2]] == /*questoes*/ ctx[0][/*questaoApontada*/ ctx[2]].indexCorreto
    				? "correta"
    				: "") + " svelte-6xpfq0"))) {
    				attr_dev(button, "class", button_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(50:12) {#each questoes[questaoApontada].opcoes as opc, i}",
    		ctx
    	});

    	return block;
    }

    // (48:8) <Row>
    function create_default_slot_4$1(ctx) {
    	let div;
    	let each_value = /*questoes*/ ctx[0][/*questaoApontada*/ ctx[2]].opcoes;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "opcoes svelte-6xpfq0");
    			add_location(div, file$a, 48, 10, 1187);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*respostas, questaoApontada, questoes*/ 7) {
    				each_value = /*questoes*/ ctx[0][/*questaoApontada*/ ctx[2]].opcoes;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$1.name,
    		type: "slot",
    		source: "(48:8) <Row>",
    		ctx
    	});

    	return block;
    }

    // (40:6) <Col>
    function create_default_slot_3$3(ctx) {
    	let row0;
    	let t;
    	let row1;
    	let current;

    	row0 = new sveltestrap.Row({
    			props: {
    				$$slots: { default: [create_default_slot_5$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row1 = new sveltestrap.Row({
    			props: {
    				$$slots: { default: [create_default_slot_4$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(row0.$$.fragment);
    			t = space();
    			create_component(row1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(row0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(row1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const row0_changes = {};

    			if (dirty & /*$$scope, questoes, questaoApontada*/ 4101) {
    				row0_changes.$$scope = { dirty, ctx };
    			}

    			row0.$set(row0_changes);
    			const row1_changes = {};

    			if (dirty & /*$$scope, questoes, questaoApontada, respostas*/ 4103) {
    				row1_changes.$$scope = { dirty, ctx };
    			}

    			row1.$set(row1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row0.$$.fragment, local);
    			transition_in(row1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row0.$$.fragment, local);
    			transition_out(row1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(row0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(row1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$3.name,
    		type: "slot",
    		source: "(40:6) <Col>",
    		ctx
    	});

    	return block;
    }

    // (76:10) <Button             color="danger"             disabled={questaoApontada == 0}             on:click={() => {               questaoApontada--;             }}           >
    function create_default_slot_2$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("<");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$3.name,
    		type: "slot",
    		source: "(76:10) <Button             color=\\\"danger\\\"             disabled={questaoApontada == 0}             on:click={() => {               questaoApontada--;             }}           >",
    		ctx
    	});

    	return block;
    }

    // (85:10) <Button             color="primary"             on:click={() => {               questaoApontada++;             }}           >
    function create_default_slot_1$6(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(">");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$6.name,
    		type: "slot",
    		source: "(85:10) <Button             color=\\\"primary\\\"             on:click={() => {               questaoApontada++;             }}           >",
    		ctx
    	});

    	return block;
    }

    // (28:6) <Button         size="lg"         color="primary"         on:click={() => {           questaoApontada = 0;         }}       >
    function create_default_slot$8(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Iniciar o questionário");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$8.name,
    		type: "slot",
    		source: "(28:6) <Button         size=\\\"lg\\\"         color=\\\"primary\\\"         on:click={() => {           questaoApontada = 0;         }}       >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let div;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block$1, create_if_block_1$1, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*questaoApontada*/ ctx[2] == -1) return 0;
    		if (!(/*questaoApontada*/ ctx[2] > /*respostas*/ ctx[1].length - 1)) return 1;
    		return 2;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if_block.c();
    			attr_dev(div, "class", "questinario svelte-6xpfq0");
    			add_location(div, file$a, 24, 0, 623);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if_blocks[current_block_type_index].m(div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('_6layoutQuiz', slots, []);
    	let { questoes } = $$props;
    	let respostas = new Array(questoes.length).fill(null);
    	let questaoApontada = -1;

    	function obterResultado() {
    		let resultado = respostas.reduce(
    			(acc, val, index) => {
    				if (questoes[index].indexCorreto == val) {
    					return acc + 1;
    				}

    				return acc;
    			},
    			0
    		);

    		return resultado / questoes.length * 100 + "%";
    	}

    	function reiniciarQuestionario() {
    		$$invalidate(1, respostas = new Array(questoes.length).fill(null));
    		$$invalidate(2, questaoApontada = 0);
    	}

    	const writable_props = ['questoes'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<_6layoutQuiz> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		$$invalidate(2, questaoApontada = 0);
    	};

    	const click_handler_1 = i => {
    		$$invalidate(1, respostas[questaoApontada] = i, respostas);
    	};

    	const click_handler_2 = () => {
    		$$invalidate(2, questaoApontada--, questaoApontada);
    	};

    	const click_handler_3 = () => {
    		$$invalidate(2, questaoApontada++, questaoApontada);
    	};

    	$$self.$$set = $$props => {
    		if ('questoes' in $$props) $$invalidate(0, questoes = $$props.questoes);
    	};

    	$$self.$capture_state = () => ({
    		Button: sveltestrap.Button,
    		Col: sveltestrap.Col,
    		Row: sveltestrap.Row,
    		questoes,
    		respostas,
    		questaoApontada,
    		obterResultado,
    		reiniciarQuestionario
    	});

    	$$self.$inject_state = $$props => {
    		if ('questoes' in $$props) $$invalidate(0, questoes = $$props.questoes);
    		if ('respostas' in $$props) $$invalidate(1, respostas = $$props.respostas);
    		if ('questaoApontada' in $$props) $$invalidate(2, questaoApontada = $$props.questaoApontada);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		questoes,
    		respostas,
    		questaoApontada,
    		obterResultado,
    		reiniciarQuestionario,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3
    	];
    }

    class _6layoutQuiz extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { questoes: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "_6layoutQuiz",
    			options,
    			id: create_fragment$a.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*questoes*/ ctx[0] === undefined && !('questoes' in props)) {
    			console.warn("<_6layoutQuiz> was created without expected prop 'questoes'");
    		}
    	}

    	get questoes() {
    		throw new Error("<_6layoutQuiz>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set questoes(value) {
    		throw new Error("<_6layoutQuiz>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/cenas/u01s01i03.svelte generated by Svelte v3.48.0 */
    const file$9 = "src/cenas/u01s01i03.svelte";

    // (17:1) <Button   class="anterior"   size="lg"   color="danger"   on:click={() => ($storeCenas = scene2)}  >
    function create_default_slot_1$5(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Anterior");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$5.name,
    		type: "slot",
    		source: "(17:1) <Button   class=\\\"anterior\\\"   size=\\\"lg\\\"   color=\\\"danger\\\"   on:click={() => ($storeCenas = scene2)}  >",
    		ctx
    	});

    	return block;
    }

    // (25:1) <Button   class="proximo"   size="lg"   color="primary"   on:click={() => ($storeCenas = scene4)}  >
    function create_default_slot$7(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Próximo");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$7.name,
    		type: "slot",
    		source: "(25:1) <Button   class=\\\"proximo\\\"   size=\\\"lg\\\"   color=\\\"primary\\\"   on:click={() => ($storeCenas = scene4)}  >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let div0;
    	let button0;
    	let t0;
    	let button1;
    	let t1;
    	let div1;
    	let layoutquiz;
    	let current;

    	button0 = new sveltestrap.Button({
    			props: {
    				class: "anterior",
    				size: "lg",
    				color: "danger",
    				$$slots: { default: [create_default_slot_1$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button0.$on("click", /*click_handler*/ ctx[2]);

    	button1 = new sveltestrap.Button({
    			props: {
    				class: "proximo",
    				size: "lg",
    				color: "primary",
    				$$slots: { default: [create_default_slot$7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1.$on("click", /*click_handler_1*/ ctx[3]);

    	layoutquiz = new _6layoutQuiz({
    			props: { questoes: /*questoes*/ ctx[1] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			create_component(button0.$$.fragment);
    			t0 = space();
    			create_component(button1.$$.fragment);
    			t1 = space();
    			div1 = element("div");
    			create_component(layoutquiz.$$.fragment);
    			add_location(div0, file$9, 15, 0, 371);
    			add_location(div1, file$9, 35, 0, 646);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			mount_component(button0, div0, null);
    			append_dev(div0, t0);
    			mount_component(button1, div0, null);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			mount_component(layoutquiz, div1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const button0_changes = {};

    			if (dirty & /*$$scope*/ 32) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty & /*$$scope*/ 32) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			transition_in(layoutquiz.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			transition_out(layoutquiz.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			destroy_component(button0);
    			destroy_component(button1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			destroy_component(layoutquiz);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let $storeExercicios;
    	let $storeCenas;
    	validate_store(questoes, 'storeExercicios');
    	component_subscribe($$self, questoes, $$value => $$invalidate(4, $storeExercicios = $$value));
    	validate_store(cenas, 'storeCenas');
    	component_subscribe($$self, cenas, $$value => $$invalidate(0, $storeCenas = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('U01s01i03', slots, []);
    	let questoes$1 = $storeExercicios;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<U01s01i03> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => set_store_value(cenas, $storeCenas = U01s01i02, $storeCenas);
    	const click_handler_1 = () => set_store_value(cenas, $storeCenas = U01s01i04, $storeCenas);

    	$$self.$capture_state = () => ({
    		Button: sveltestrap.Button,
    		storeCenas: cenas,
    		scene2: U01s01i02,
    		scene4: U01s01i04,
    		storeExercicios: questoes,
    		LayoutQuiz: _6layoutQuiz,
    		questoes: questoes$1,
    		$storeExercicios,
    		$storeCenas
    	});

    	$$self.$inject_state = $$props => {
    		if ('questoes' in $$props) $$invalidate(1, questoes$1 = $$props.questoes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [$storeCenas, questoes$1, click_handler, click_handler_1];
    }

    class U01s01i03 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "U01s01i03",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src/cenas/teste.svelte generated by Svelte v3.48.0 */

    const gltf = `
  {
    "asset" : {
        "generator" : "Khronos glTF Blender I/O v1.7.33",
        "version" : "2.0"
    },
    "scene" : 0,
    "scenes" : [
        {
            "name" : "Scene",
            "nodes" : [
                0,
                1,
                2,
                3,
                4
            ]
        }
    ],
    "nodes" : [
        {
            "mesh" : 0,
            "name" : "btn1",
            "translation" : [
                0,
                -0.32789725065231323,
                1.512547492980957
            ]
        },
        {
            "mesh" : 1,
            "name" : "clickBtn1",
            "scale" : [
                0.5560250878334045,
                0.19343355298042297,
                0.5560250878334045
            ],
            "translation" : [
                0,
                0.9698383212089539,
                1.512547492980957
            ]
        },
        {
            "mesh" : 2,
            "name" : "btn2",
            "translation" : [
                0,
                -0.32789725065231323,
                -1.4032068252563477
            ]
        },
        {
            "mesh" : 3,
            "name" : "clickBtn2",
            "scale" : [
                0.5560250878334045,
                0.19343355298042297,
                0.5560250878334045
            ],
            "translation" : [
                0,
                0.9698383212089539,
                -1.4032068252563477
            ]
        },
        {
            "mesh" : 4,
            "name" : "led",
            "scale" : [
                0.31288468837738037,
                0.31288468837738037,
                0.31288468837738037
            ],
            "translation" : [
                3.862229347229004,
                0.5067557096481323,
                0
            ]
        }
    ],
    "animations" : [
        {
            "channels" : [
                {
                    "sampler" : 0,
                    "target" : {
                        "node" : 1,
                        "path" : "translation"
                    }
                }
            ],
            "name" : "clickBtn1",
            "samplers" : [
                {
                    "input" : 18,
                    "interpolation" : "LINEAR",
                    "output" : 19
                }
            ]
        },
        {
            "channels" : [
                {
                    "sampler" : 0,
                    "target" : {
                        "node" : 3,
                        "path" : "translation"
                    }
                }
            ],
            "name" : "clickBtn2",
            "samplers" : [
                {
                    "input" : 20,
                    "interpolation" : "LINEAR",
                    "output" : 21
                }
            ]
        }
    ],
    "materials" : [
        {
            "doubleSided" : true,
            "name" : "baseBtn",
            "pbrMetallicRoughness" : {
                "baseColorFactor" : [
                    0,
                    0,
                    0,
                    1
                ],
                "metallicFactor" : 0,
                "roughnessFactor" : 0.5
            }
        },
        {
            "doubleSided" : true,
            "name" : "clickBtn",
            "pbrMetallicRoughness" : {
                "baseColorFactor" : [
                    0.043634843081235886,
                    0.15742181241512299,
                    0.07780115306377411,
                    1
                ],
                "metallicFactor" : 0,
                "roughnessFactor" : 0.5
            }
        },
        {
            "doubleSided" : true,
            "name" : "led",
            "pbrMetallicRoughness" : {
                "baseColorFactor" : [
                    0.8000000715255737,
                    0.0031378951389342546,
                    0,
                    1
                ],
                "metallicFactor" : 0,
                "roughnessFactor" : 0.4000000059604645
            }
        }
    ],
    "meshes" : [
        {
            "name" : "Cube.001",
            "primitives" : [
                {
                    "attributes" : {
                        "POSITION" : 0,
                        "NORMAL" : 1,
                        "TEXCOORD_0" : 2
                    },
                    "indices" : 3,
                    "material" : 0
                }
            ]
        },
        {
            "name" : "Cube.002",
            "primitives" : [
                {
                    "attributes" : {
                        "POSITION" : 4,
                        "NORMAL" : 5,
                        "TEXCOORD_0" : 6
                    },
                    "indices" : 7,
                    "material" : 1
                }
            ]
        },
        {
            "name" : "Cube.004",
            "primitives" : [
                {
                    "attributes" : {
                        "POSITION" : 8,
                        "NORMAL" : 9,
                        "TEXCOORD_0" : 10
                    },
                    "indices" : 3,
                    "material" : 0
                }
            ]
        },
        {
            "name" : "Cube.003",
            "primitives" : [
                {
                    "attributes" : {
                        "POSITION" : 11,
                        "NORMAL" : 12,
                        "TEXCOORD_0" : 13
                    },
                    "indices" : 7,
                    "material" : 1
                }
            ]
        },
        {
            "name" : "Cylinder",
            "primitives" : [
                {
                    "attributes" : {
                        "POSITION" : 14,
                        "NORMAL" : 15,
                        "TEXCOORD_0" : 16
                    },
                    "indices" : 17,
                    "material" : 2
                }
            ]
        }
    ],
    "accessors" : [
        {
            "bufferView" : 0,
            "componentType" : 5126,
            "count" : 40,
            "max" : [
                1,
                1.2253754138946533,
                1
            ],
            "min" : [
                -1,
                0.34216225147247314,
                -1
            ],
            "type" : "VEC3"
        },
        {
            "bufferView" : 1,
            "componentType" : 5126,
            "count" : 40,
            "type" : "VEC3"
        },
        {
            "bufferView" : 2,
            "componentType" : 5126,
            "count" : 40,
            "type" : "VEC2"
        },
        {
            "bufferView" : 3,
            "componentType" : 5123,
            "count" : 60,
            "type" : "SCALAR"
        },
        {
            "bufferView" : 4,
            "componentType" : 5126,
            "count" : 24,
            "max" : [
                1,
                1,
                1
            ],
            "min" : [
                -1,
                -1,
                -1
            ],
            "type" : "VEC3"
        },
        {
            "bufferView" : 5,
            "componentType" : 5126,
            "count" : 24,
            "type" : "VEC3"
        },
        {
            "bufferView" : 6,
            "componentType" : 5126,
            "count" : 24,
            "type" : "VEC2"
        },
        {
            "bufferView" : 7,
            "componentType" : 5123,
            "count" : 36,
            "type" : "SCALAR"
        },
        {
            "bufferView" : 8,
            "componentType" : 5126,
            "count" : 40,
            "max" : [
                1,
                1.2253754138946533,
                1
            ],
            "min" : [
                -1,
                0.34216225147247314,
                -1
            ],
            "type" : "VEC3"
        },
        {
            "bufferView" : 9,
            "componentType" : 5126,
            "count" : 40,
            "type" : "VEC3"
        },
        {
            "bufferView" : 10,
            "componentType" : 5126,
            "count" : 40,
            "type" : "VEC2"
        },
        {
            "bufferView" : 11,
            "componentType" : 5126,
            "count" : 24,
            "max" : [
                1,
                1,
                1
            ],
            "min" : [
                -1,
                -1,
                -1
            ],
            "type" : "VEC3"
        },
        {
            "bufferView" : 12,
            "componentType" : 5126,
            "count" : 24,
            "type" : "VEC3"
        },
        {
            "bufferView" : 13,
            "componentType" : 5126,
            "count" : 24,
            "type" : "VEC2"
        },
        {
            "bufferView" : 14,
            "componentType" : 5126,
            "count" : 1146,
            "max" : [
                1.4711627960205078,
                1.2450824975967407,
                1.5002449750900269
            ],
            "min" : [
                -1.452655553817749,
                -1.5904344320297241,
                -1.42357337474823
            ],
            "type" : "VEC3"
        },
        {
            "bufferView" : 15,
            "componentType" : 5126,
            "count" : 1146,
            "type" : "VEC3"
        },
        {
            "bufferView" : 16,
            "componentType" : 5126,
            "count" : 1146,
            "type" : "VEC2"
        },
        {
            "bufferView" : 17,
            "componentType" : 5123,
            "count" : 1722,
            "type" : "SCALAR"
        },
        {
            "bufferView" : 18,
            "componentType" : 5126,
            "count" : 31,
            "max" : [
                1.25
            ],
            "min" : [
                0
            ],
            "type" : "SCALAR"
        },
        {
            "bufferView" : 19,
            "componentType" : 5126,
            "count" : 31,
            "type" : "VEC3"
        },
        {
            "bufferView" : 20,
            "componentType" : 5126,
            "count" : 30,
            "max" : [
                1.25
            ],
            "min" : [
                0.041666666666666664
            ],
            "type" : "SCALAR"
        },
        {
            "bufferView" : 21,
            "componentType" : 5126,
            "count" : 30,
            "type" : "VEC3"
        }
    ],
    "bufferViews" : [
        {
            "buffer" : 0,
            "byteLength" : 480,
            "byteOffset" : 0
        },
        {
            "buffer" : 0,
            "byteLength" : 480,
            "byteOffset" : 480
        },
        {
            "buffer" : 0,
            "byteLength" : 320,
            "byteOffset" : 960
        },
        {
            "buffer" : 0,
            "byteLength" : 120,
            "byteOffset" : 1280
        },
        {
            "buffer" : 0,
            "byteLength" : 288,
            "byteOffset" : 1400
        },
        {
            "buffer" : 0,
            "byteLength" : 288,
            "byteOffset" : 1688
        },
        {
            "buffer" : 0,
            "byteLength" : 192,
            "byteOffset" : 1976
        },
        {
            "buffer" : 0,
            "byteLength" : 72,
            "byteOffset" : 2168
        },
        {
            "buffer" : 0,
            "byteLength" : 480,
            "byteOffset" : 2240
        },
        {
            "buffer" : 0,
            "byteLength" : 480,
            "byteOffset" : 2720
        },
        {
            "buffer" : 0,
            "byteLength" : 320,
            "byteOffset" : 3200
        },
        {
            "buffer" : 0,
            "byteLength" : 288,
            "byteOffset" : 3520
        },
        {
            "buffer" : 0,
            "byteLength" : 288,
            "byteOffset" : 3808
        },
        {
            "buffer" : 0,
            "byteLength" : 192,
            "byteOffset" : 4096
        },
        {
            "buffer" : 0,
            "byteLength" : 13752,
            "byteOffset" : 4288
        },
        {
            "buffer" : 0,
            "byteLength" : 13752,
            "byteOffset" : 18040
        },
        {
            "buffer" : 0,
            "byteLength" : 9168,
            "byteOffset" : 31792
        },
        {
            "buffer" : 0,
            "byteLength" : 3444,
            "byteOffset" : 40960
        },
        {
            "buffer" : 0,
            "byteLength" : 124,
            "byteOffset" : 44404
        },
        {
            "buffer" : 0,
            "byteLength" : 372,
            "byteOffset" : 44528
        },
        {
            "buffer" : 0,
            "byteLength" : 120,
            "byteOffset" : 44900
        },
        {
            "buffer" : 0,
            "byteLength" : 360,
            "byteOffset" : 45020
        }
    ],
    "buffers" : [
        {
            "byteLength" : 45380,
            "uri" : "data:application/octet-stream;base64,AACAv+Qvrz4AAIA/AACAv+Qvrz4AAIA/AACAv+Qvrz4AAIA/AACAvwAAgD8AAIA/AACAvwAAgD8AAIA/AACAvwAAgD8AAIA/AACAvwAAgD8AAIA/AACAv+Qvrz4AAIC/AACAv+Qvrz4AAIC/AACAv+Qvrz4AAIC/AACAvwAAgD8AAIC/AACAvwAAgD8AAIC/AACAvwAAgD8AAIC/AACAvwAAgD8AAIC/AACAP+Qvrz4AAIA/AACAP+Qvrz4AAIA/AACAP+Qvrz4AAIA/AACAPwAAgD8AAIA/AACAPwAAgD8AAIA/AACAPwAAgD8AAIA/AACAPwAAgD8AAIA/AACAP+Qvrz4AAIC/AACAP+Qvrz4AAIC/AACAP+Qvrz4AAIC/AACAPwAAgD8AAIC/AACAPwAAgD8AAIC/AACAPwAAgD8AAIC/AACAPwAAgD8AAIC/B4U8vxrZnD8HhTw/B4U8vxrZnD8HhTw/B4U8vxrZnD8HhTw/B4U8vxrZnD8HhTy/B4U8vxrZnD8HhTy/B4U8vxrZnD8HhTy/B4U8PxrZnD8HhTy/B4U8PxrZnD8HhTy/B4U8PxrZnD8HhTy/B4U8PxrZnD8HhTw/B4U8PxrZnD8HhTw/B4U8PxrZnD8HhTw/AACAvwAAAAAAAACAAAAAAAAAgL8AAACAAAAAAAAAAAAAAIA/AACAvwAAAAAAAACA3FwmvzSTQj8AAACAAAAAAAAAAAAAAIA/AAAAADOTQj/dXCY/AACAvwAAAAAAAACAAAAAAAAAgL8AAACAAAAAAAAAAAAAAIC/AACAvwAAAAAAAACA3FwmvzSTQj8AAACAAAAAAAAAAAAAAIC/AAAAADOTQj/dXCa/AAAAAAAAgL8AAACAAAAAAAAAAAAAAIA/AACAPwAAAAAAAACAAAAAAAAAAAAAAIA/AAAAADOTQj/dXCY/3FwmPzSTQj8AAACAAACAPwAAAAAAAACAAAAAAAAAgL8AAACAAAAAAAAAAAAAAIC/AACAPwAAAAAAAACAAAAAAAAAAAAAAIC/AAAAADOTQj/dXCa/3FwmPzSTQj8AAACAAACAPwAAAAAAAACA3FwmvzSTQj8AAACAAAAAADOTQj/dXCY/AAAAAAAAgD8AAACA3FwmvzSTQj8AAACAAAAAADOTQj/dXCa/AAAAAAAAgD8AAACAAAAAADOTQj/dXCa/AAAAAAAAgD8AAACA3FwmPzSTQj8AAACAAAAAADOTQj/dXCY/AAAAAAAAgD8AAACA3FwmPzSTQj8AAACAAADAPgAAgD8AAAA+AACAPgAAwD4AAAAAAAAgPwAAgD8AACA/AACAPwAAID8AAAAAAAAgPwAAAAAAAMA+AABAPwAAAD4AAAA/AADAPgAAQD8AACA/AABAPwAAID8AAEA/AAAgPwAAQD8AACA/AABAPwAAwD4AAIA+AADAPgAAgD4AAMA+AACAPgAAID8AAIA+AAAgPwAAgD4AACA/AACAPgAAID8AAIA+AADAPgAAAD8AAMA+AAAAPwAAwD4AAAA/AAAgPwAAAD8AACA/AAAAPwAAID8AAAA/AAAgPwAAAD8AACA/AACAPwAAID8AAAAAAABgPwAAgD4AACA/AABAPwAAID8AAEA/AABgPwAAAD8AACA/AAAAPwAAID8AAAA/AAAgPwAAAD8AACA/AACAPgAAID8AAIA+AAAgPwAAgD4AAAMACgAAAAoABwAJAAwAGAAJABgAFgAXABsAFAAXABQAEAAPABEABQAPAAUAAgAIABUADgAIAA4AAQALAAQAHAALABwAHwAjACEAHgAjAB4AJgAGABIAJQAGACUAHQAZAA0AIAAZACAAIgATABoAJAATACQAJwAAAIC/AACAvwAAgD8AAIC/AACAvwAAgD8AAIC/AACAvwAAgD8AAIC/AACAPwAAgD8AAIC/AACAPwAAgD8AAIC/AACAPwAAgD8AAIC/AACAvwAAgL8AAIC/AACAvwAAgL8AAIC/AACAvwAAgL8AAIC/AACAPwAAgL8AAIC/AACAPwAAgL8AAIC/AACAPwAAgL8AAIA/AACAvwAAgD8AAIA/AACAvwAAgD8AAIA/AACAvwAAgD8AAIA/AACAPwAAgD8AAIA/AACAPwAAgD8AAIA/AACAPwAAgD8AAIA/AACAvwAAgL8AAIA/AACAvwAAgL8AAIA/AACAvwAAgL8AAIA/AACAPwAAgL8AAIA/AACAPwAAgL8AAIA/AACAPwAAgL8AAIC/AAAAAAAAAIAAAAAAAACAvwAAAIAAAAAAAAAAAAAAgD8AAIC/AAAAAAAAAIAAAAAAAAAAAAAAgD8AAAAAAACAPwAAAIAAAIC/AAAAAAAAAIAAAAAAAACAvwAAAIAAAAAAAAAAAAAAgL8AAIC/AAAAAAAAAIAAAAAAAAAAAAAAgL8AAAAAAACAPwAAAIAAAAAAAACAvwAAAIAAAAAAAAAAAAAAgD8AAIA/AAAAAAAAAIAAAAAAAAAAAAAAgD8AAAAAAACAPwAAAIAAAIA/AAAAAAAAAIAAAAAAAACAvwAAAIAAAAAAAAAAAAAAgL8AAIA/AAAAAAAAAIAAAAAAAAAAAAAAgL8AAAAAAACAPwAAAIAAAIA/AAAAAAAAAIAAAMA+AACAPwAAAD4AAIA+AADAPgAAAAAAACA/AACAPwAAID8AAAAAAABgPwAAgD4AAMA+AABAPwAAAD4AAAA/AADAPgAAQD8AACA/AABAPwAAID8AAEA/AABgPwAAAD8AAMA+AACAPgAAwD4AAIA+AADAPgAAgD4AACA/AACAPgAAID8AAIA+AAAgPwAAgD4AAMA+AAAAPwAAwD4AAAA/AADAPgAAAD8AACA/AAAAPwAAID8AAAA/AAAgPwAAAD8AAAMACQAAAAkABgAIAAoAFQAIABUAEwAUABcAEQAUABEADgANAA8ABAANAAQAAgAHABIADAAHAAwAAQAWAAsABQAWAAUAEAAAAIC/5C+vPgAAgD8AAIC/5C+vPgAAgD8AAIC/5C+vPgAAgD8AAIC/AACAPwAAgD8AAIC/AACAPwAAgD8AAIC/AACAPwAAgD8AAIC/AACAPwAAgD8AAIC/5C+vPgAAgL8AAIC/5C+vPgAAgL8AAIC/5C+vPgAAgL8AAIC/AACAPwAAgL8AAIC/AACAPwAAgL8AAIC/AACAPwAAgL8AAIC/AACAPwAAgL8AAIA/5C+vPgAAgD8AAIA/5C+vPgAAgD8AAIA/5C+vPgAAgD8AAIA/AACAPwAAgD8AAIA/AACAPwAAgD8AAIA/AACAPwAAgD8AAIA/AACAPwAAgD8AAIA/5C+vPgAAgL8AAIA/5C+vPgAAgL8AAIA/5C+vPgAAgL8AAIA/AACAPwAAgL8AAIA/AACAPwAAgL8AAIA/AACAPwAAgL8AAIA/AACAPwAAgL8HhTy/GtmcPweFPD8HhTy/GtmcPweFPD8HhTy/GtmcPweFPD8HhTy/GtmcPweFPL8HhTy/GtmcPweFPL8HhTy/GtmcPweFPL8HhTw/GtmcPweFPL8HhTw/GtmcPweFPL8HhTw/GtmcPweFPL8HhTw/GtmcPweFPD8HhTw/GtmcPweFPD8HhTw/GtmcPweFPD8AAIC/AAAAAAAAAIAAAAAAAACAvwAAAIAAAAAAAAAAAAAAgD8AAIC/AAAAAAAAAIDcXCa/NJNCPwAAAIAAAAAAAAAAAAAAgD8AAAAAM5NCP91cJj8AAIC/AAAAAAAAAIAAAAAAAACAvwAAAIAAAAAAAAAAAAAAgL8AAIC/AAAAAAAAAIDcXCa/NJNCPwAAAIAAAAAAAAAAAAAAgL8AAAAAM5NCP91cJr8AAAAAAACAvwAAAIAAAAAAAAAAAAAAgD8AAIA/AAAAAAAAAIAAAAAAAAAAAAAAgD8AAAAAM5NCP91cJj/cXCY/NJNCPwAAAIAAAIA/AAAAAAAAAIAAAAAAAACAvwAAAIAAAAAAAAAAAAAAgL8AAIA/AAAAAAAAAIAAAAAAAAAAAAAAgL8AAAAAM5NCP91cJr/cXCY/NJNCPwAAAIAAAIA/AAAAAAAAAIDcXCa/NJNCPwAAAIAAAAAAM5NCP91cJj8AAAAAAACAPwAAAIDcXCa/NJNCPwAAAIAAAAAAM5NCP91cJr8AAAAAAACAPwAAAIAAAAAAM5NCP91cJr8AAAAAAACAPwAAAIDcXCY/NJNCPwAAAIAAAAAAM5NCP91cJj8AAAAAAACAPwAAAIDcXCY/NJNCPwAAAIAAAMA+AACAPwAAAD4AAIA+AADAPgAAAAAAACA/AACAPwAAID8AAIA/AAAgPwAAAAAAACA/AAAAAAAAwD4AAEA/AAAAPgAAAD8AAMA+AABAPwAAID8AAEA/AAAgPwAAQD8AACA/AABAPwAAID8AAEA/AADAPgAAgD4AAMA+AACAPgAAwD4AAIA+AAAgPwAAgD4AACA/AACAPgAAID8AAIA+AAAgPwAAgD4AAMA+AAAAPwAAwD4AAAA/AADAPgAAAD8AACA/AAAAPwAAID8AAAA/AAAgPwAAAD8AACA/AAAAPwAAID8AAIA/AAAgPwAAAAAAAGA/AACAPgAAID8AAEA/AAAgPwAAQD8AAGA/AAAAPwAAID8AAAA/AAAgPwAAAD8AACA/AAAAPwAAID8AAIA+AAAgPwAAgD4AACA/AACAPgAAgL8AAIC/AACAPwAAgL8AAIC/AACAPwAAgL8AAIC/AACAPwAAgL8AAIA/AACAPwAAgL8AAIA/AACAPwAAgL8AAIA/AACAPwAAgL8AAIC/AACAvwAAgL8AAIC/AACAvwAAgL8AAIC/AACAvwAAgL8AAIA/AACAvwAAgL8AAIA/AACAvwAAgL8AAIA/AACAvwAAgD8AAIC/AACAPwAAgD8AAIC/AACAPwAAgD8AAIC/AACAPwAAgD8AAIA/AACAPwAAgD8AAIA/AACAPwAAgD8AAIA/AACAPwAAgD8AAIC/AACAvwAAgD8AAIC/AACAvwAAgD8AAIC/AACAvwAAgD8AAIA/AACAvwAAgD8AAIA/AACAvwAAgD8AAIA/AACAvwAAgL8AAAAAAAAAgAAAAAAAAIC/AAAAgAAAAAAAAAAAAACAPwAAgL8AAAAAAAAAgAAAAAAAAAAAAACAPwAAAAAAAIA/AAAAgAAAgL8AAAAAAAAAgAAAAAAAAIC/AAAAgAAAAAAAAAAAAACAvwAAgL8AAAAAAAAAgAAAAAAAAAAAAACAvwAAAAAAAIA/AAAAgAAAAAAAAIC/AAAAgAAAAAAAAAAAAACAPwAAgD8AAAAAAAAAgAAAAAAAAAAAAACAPwAAAAAAAIA/AAAAgAAAgD8AAAAAAAAAgAAAAAAAAIC/AAAAgAAAAAAAAAAAAACAvwAAgD8AAAAAAAAAgAAAAAAAAAAAAACAvwAAAAAAAIA/AAAAgAAAgD8AAAAAAAAAgAAAwD4AAIA/AAAAPgAAgD4AAMA+AAAAAAAAID8AAIA/AAAgPwAAAAAAAGA/AACAPgAAwD4AAEA/AAAAPgAAAD8AAMA+AABAPwAAID8AAEA/AAAgPwAAQD8AAGA/AAAAPwAAwD4AAIA+AADAPgAAgD4AAMA+AACAPgAAID8AAIA+AAAgPwAAgD4AACA/AACAPgAAwD4AAAA/AADAPgAAAD8AAMA+AAAAPwAAID8AAAA/AAAgPwAAAD8AACA/AAAAPwAAAAA7Qn+/AACAvwAAAAA7Qn+/AACAvwAAAAA7Qn+/AACAvwAAAAA7Qn+/AACAv0rvqLqCBjo/aDEzv0rvqLqCBjo/aDEzv0rvqLqCBjo/aDEzv0rvqLqCBjo/aDEzv8LFRz47Qn+/vhR7v8LFRz47Qn+/vhR7v8LFRz47Qn+/vhR7v8LFRz47Qn+/vhR7v/aDCj6CBjo/9b8vv/aDCj6CBjo/9b8vv/aDCj6CBjo/9b8vv/aDCj6CBjo/9b8vvxbvwz47Qn+/XoNsvxbvwz47Qn+/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AADwPgAAwD4AADg/AAAAAAAAMD8AAAA/AAAwPwAAAD8AADA/AAAAPwAAMD8AAAA/AADgPgAAwD4AADA/AAAAAAAA4D4AAMA+AAAwPwAAAAAAACg/AAAAPwAAKD8AAAA/AAAoPwAAAD8AACg/AAAAPwAA0D4AAMA+AAAoPwAAAAAAANA+AADAPgAAKD8AAAAAAAAgPwAAAD8AACA/AAAAPwAAID8AAAA/AAAgPwAAAD8AAMA+AADAPgAAID8AAAAAAADAPgAAwD4AACA/AAAAAAAAGD8AAAA/AAAYPwAAAD8AABg/AAAAPwAAGD8AAAA/AACwPgAAwD4AABg/AAAAAAAAsD4AAMA+AAAYPwAAAAAAABA/AAAAPwAAED8AAAA/AAAQPwAAAD8AABA/AAAAPwAAoD4AAMA+AAAQPwAAAAAAAKA+AADAPgAAED8AAAAAAAAIPwAAAD8AAAg/AAAAPwAACD8AAAA/AAAIPwAAAD8AAJA+AADAPgAACD8AAAAAAACQPgAAwD4AAAg/AAAAAAAAAD8AAAA/AAAAPwAAAD8AAAA/AAAAPwAAAD8AAAA/AAAAPwAAAAAAAIA+/v+/PgAAgD7+/78+AAAAPwAAAAAAAPA+AAAAPwAA8D4AAAA/AADwPgAAAD8AAPA+AAAAPwAA8D4AAAAAAABgPv7/vz4AAPA+AAAAAAAAYD7+/78+AADgPgAAAD8AAOA+AAAAPwAA4D4AAAA/AADgPgAAAD8AAOA+AAAAAAAAQD7+/78+AADgPgAAAAAAAEA+/v+/PgAA0D4AAAA/AADQPgAAAD8AANA+AAAAPwAA0D4AAAA/AADQPgAAAAACACA+/v+/PgAA0D4AAAAAAgAgPv7/vz4AAMA+AAAAPwAAwD4AAAA/AADAPgAAAD8AAMA+AAAAPwAAwD4AAAAAAAAAPv7/vz4AAMA+AAAAAAAAAD7+/78+AACwPgAAAD8AALA+AAAAPwAAsD4AAAA/AACwPgAAAD8AALA+AAAAAAAAwD3+/78+AACwPgAAAAAAAMA9/v+/PgAAoD4AAAA/AACgPgAAAD8AAKA+AAAAPwAAoD4AAAAABACAPf7/vz4AAKA+AAAAAAQAgD3+/78+AACQPgAAAD8AAJA+AAAAPwAAkD4AAAA/AACQPgAAAD8AAJA+AAAAAAAAAD3+/78+AACQPgAAAAAAAAA9/v+/PgAAgD4AAAA/AACAPgAAAD8AAIA+AAAAPwAAgD4AAAA/AACAPgAAAAAAAIA+AAAAAAAAgD/+/78+AAAAAP7/vz4AAGA+AAAAPwAAYD4AAAA/AABgPgAAAD8AAGA+AAAAPwAAYD4AAAAAAAB4P/7/vz4AAGA+AAAAAAAAeD/+/78+AABAPgAAAD8AAEA+AAAAPwAAQD4AAAA/AABAPgAAAD8AAEA+AAAAAAAAcD/+/78+AABAPgAAAAAAAHA//v+/PgAAID4AAAA/AAAgPgAAAD8AACA+AAAAPwAAID4AAAA/AAAgPgAAAAAAAGg//v+/PgAAID4AAAAAAABoP/7/vz4AAAA+AAAAPwAAAD4AAAA/AAAAPgAAAD8AAAA+AAAAPwAAAD4AAAAAAABgP/7/vz4AAAA+AAAAAAAAYD/+/78+AADAPQAAAD8AAMA9AAAAPwAAwD0AAAA/AADAPQAAAD8AAMA9AAAAAAAAWD/+/78+AADAPQAAAAAAAFg//v+/PgAAgD0AAAA/AACAPQAAAD8AAIA9AAAAPwAAgD0AAAA/AACAPQAAAAAAAFA//v+/PgAAgD0AAAAAAABQP/7/vz4AAAA9AAAAPwAAAD0AAAA/AAAAPQAAAD8AAAA9AAAAPwAAAD0AAAAAAABIP/7/vz4AAAA9AAAAAAAASD/+/78+AABAP/D/fz0AAEA/8P9/PQAAQD/w/389AABAP/D/fz0AAEA/AAAAPgAAQD8AAAA+AABAPwAAAD4AAEA/AAAAPgAAQD8AAEA+AABAPwAAQD4AAEA/AABAPgAAQD8AAEA+AABAPwAAgD4AAEA/AACAPgAAQD8AAIA+AABAPwAAgD4AAEA/AACgPgAAQD8AAKA+AABAPwAAoD4AAEA/AACgPgAAWD8AAAA/AABYPwAAAD8AAFg/AAAAPwAAWD8AAAA/AAA4P/D/fz0AADg/8P9/PQAAOD/w/389AAA4P/D/fz0AADg/AAAAPgAAOD8AAAA+AAA4PwAAAD4AADg/AAAAPgAAOD8AAEA+AAA4PwAAQD4AADg/AABAPgAAOD8AAEA+AAA4PwAAgD4AADg/AACAPgAAOD8AAIA+AAA4PwAAgD4AADg/AACgPgAAOD8AAKA+AAA4PwAAoD4AADg/AACgPgAAAAAAAAA/AAAAAAAAAD8AAIA/AAAAPwAAgD8AAAA/AAAwP/D/fz0AADA/8P9/PQAAMD/w/389AAAwP/D/fz0AADA/AAAAPgAAMD8AAAA+AAAwPwAAAD4AADA/AAAAPgAAMD8AAEA+AAAwPwAAQD4AADA/AABAPgAAMD8AAEA+AAAwPwAAgD4AADA/AACAPgAAMD8AAIA+AAAwPwAAgD4AADA/AACgPgAAMD8AAKA+AAAwPwAAoD4AADA/AACgPgAAeD8AAAA/AAB4PwAAAD8AAHg/AAAAPwAAeD8AAAA/AAAoP/D/fz0AACg/8P9/PQAAKD/w/389AAAoP/D/fz0AACg/AAAAPgAAKD8AAAA+AAAoPwAAAD4AACg/AAAAPgAAKD8AAEA+AAAoPwAAQD4AACg/AABAPgAAKD8AAEA+AAAoPwAAgD4AACg/AACAPgAAKD8AAIA+AAAoPwAAgD4AACg/AACgPgAAKD8AAKA+AAAoPwAAoD4AACg/AACgPgAAcD8AAAA/AABwPwAAAD8AAHA/AAAAPwAAcD8AAAA///8fP/D/fz3//x8/8P9/Pf//Hz/w/389//8fP/D/fz3//x8/AAAAPv//Hz8AAAA+//8fPwAAAD7//x8/AAAAPgAAID8AAEA+AAAgPwAAQD4AACA/AABAPgAAID8AAEA+AAAgPwAAgD4AACA/AACAPgAAID8AAIA+AAAgPwAAgD4AACA//v+fPgAAID/+/58+AAAgP/7/nz4AACA//v+fPgAAaD8AAAA/AABoPwAAAD8AAGg/AAAAPwAAaD8AAAA///8XP/D/fz3//xc/8P9/Pf//Fz/w/389//8XP/D/fz3//xc/AAAAPv//Fz8AAAA+//8XPwAAAD7//xc/AAAAPgAAGD8AAEA+AAAYPwAAQD4AABg/AABAPgAAGD8AAEA+AAAYPwAAgD4AABg/AACAPgAAGD8AAIA+AAAYPwAAgD4AABg/AACgPgAAGD8AAKA+AAAYPwAAoD4AABg/AACgPgAAYD8AAAA/AABgPwAAAD8AAGA/AAAAPwAAYD8AAAA///8PP/D/fz3//w8/8P9/Pf//Dz/w/389//8PP/D/fz3//w8/AAAAPv//Dz8AAAA+//8PPwAAAD7//w8/AAAAPv//Dz8AAEA+//8PPwAAQD7//w8/AABAPv//Dz8AAEA+AAAQPwAAgD4AABA/AACAPgAAED8AAIA+AAAQPwAAgD4AABA/AACgPgAAED8AAKA+AAAQPwAAoD4AABA/AACgPgAAAD0AAAA/AAAAPQAAAD8AAAA9AAAAPwAAAD0AAAA///8HP/D/fz3//wc/8P9/Pf//Bz/w/389//8HP/D/fz3//wc/AAAAPv//Bz8AAAA+//8HPwAAAD7//wc/AAAAPv//Bz8AAEA+//8HPwAAQD7//wc/AABAPv//Bz8AAEA+AAAIPwAAgD4AAAg/AACAPgAACD8AAIA+AAAIPwAAgD4AAAg//v+fPgAACD/+/58+AAAIP/7/nz4AAAg//v+fPgAAgD0AAAA/AACAPQAAAD8AAIA9AAAAPwAAgD0AAAA//v//PvD/fz3+//8+8P9/Pf7//z7w/389/v//PvD/fz3+//8+AAAAPv7//z4AAAA+/v//PgAAAD7+//8+AAAAPv///z4AAEA+////PgAAQD7///8+AABAPv///z4AAEA+AAAAPwAAgD4AAAA/AACAPgAAAD8AAIA+AAAAPwAAgD7///8+/v+fPv///z7+/58+////Pv7/nz7///8+/v+fPgAAwD0AAAA/AADAPQAAAD8AAMA9AAAAPwAAwD0AAAA//v/vPvD/fz3+/+8+8P9/Pf7/7z7w/389/v/vPvD/fz3+/+8+AAAAPv7/7z4AAAA+/v/vPgAAAD7+/+8+AAAAPv//7z4AAEA+///vPgAAQD7//+8+AABAPv//7z4AAEA+AADwPgAAgD4AAPA+AACAPgAA8D4AAIA+AADwPgAAgD4AAPA+/v+fPgAA8D7+/58+AADwPv7/nz4AAPA+/v+fPgAAAD4AAAA/AAAAPgAAAD8AAAA+AAAAPwAAAD4AAAA//v/fPvD/fz3+/98+8P9/Pf7/3z7w/389/v/fPvD/fz3+/98+AAAAPv7/3z4AAAA+/v/fPgAAAD7+/98+AAAAPv//3z78/z8+///fPvz/Pz7//98+/P8/Pv//3z78/z8+AADgPgAAgD4AAOA+AACAPgAA4D4AAIA+AADgPgAAgD7//98+/v+fPv//3z7+/58+///fPv7/nz7//98+/v+fPgAAID4AAAA/AAAgPgAAAD8AACA+AAAAPwAAID4AAAA////PPvD/fz3//88+8P9/Pf//zz7w/389///PPvD/fz3//88+AAAAPv//zz4AAAA+///PPgAAAD7//88+AAAAPv//zz78/z8+///PPvz/Pz7//88+/P8/Pv//zz78/z8+AADQPgAAgD4AANA+AACAPgAA0D4AAIA+AADQPgAAgD4AANA+/v+fPgAA0D7+/58+AADQPv7/nz4AANA+/v+fPgAAQD4AAAA/AABAPgAAAD8AAEA+AAAAPwAAQD4AAAA//v+/PvD/fz3+/78+8P9/Pf7/vz7w/389/v+/PvD/fz3+/78+AAAAPv7/vz4AAAA+/v+/PgAAAD7+/78+AAAAPv//vz4AAEA+//+/PgAAQD7//78+AABAPv//vz4AAEA+AADAPgAAgD4AAMA+AACAPgAAwD4AAIA+AADAPgAAgD4AAMA+/v+fPgAAwD7+/58+AADAPv7/nz4AAMA+/v+fPgAAYD4AAAA/AABgPgAAAD8AAGA+AAAAPwAAYD4AAAA///+vPvD/fz3//68+8P9/Pf//rz7w/389//+vPvD/fz0AALA+AAAAPgAAsD4AAAA+AACwPgAAAD4AALA+AAAAPgAAsD4AAEA+AACwPgAAQD4AALA+AABAPgAAsD4AAEA+AACwPgAAgD4AALA+AACAPgAAsD4AAIA+AACwPgAAgD4AALA+/v+fPgAAsD7+/58+AACwPv7/nz4AALA+/v+fPgAAgD4AAAA/AACAPgAAAD8AAIA+AAAAPwAAgD4AAAA/AACgPvD/fz0AAKA+8P9/PQAAoD7w/389AACgPvD/fz0AAKA+AAAAPgAAoD4AAAA+AACgPgAAAD4AAKA+AAAAPgAAoD4AAEA+AACgPgAAQD4AAKA+AABAPgAAoD4AAEA+AACgPgAAgD4AAKA+AACAPgAAoD4AAIA+AACgPgAAgD4AAKA+/v+fPgAAoD7+/58+AACgPv7/nz4AAKA+/v+fPgAAkD4AAAA/AACQPgAAAD8AAJA+AAAAPwAAkD4AAAA/AACQPvD/fz0AAJA+8P9/PQAAkD7w/389AACQPvD/fz0AAJA+AAAAPgAAkD4AAAA+AACQPgAAAD4AAJA+AAAAPgAAkD4AAEA+AACQPgAAQD4AAJA+AABAPgAAkD4AAEA+AACQPgAAgD4AAJA+AACAPgAAkD4AAIA+AACQPgAAgD4AAJA+/v+fPgAAkD7+/58+AACQPv7/nz4AAJA+/v+fPgAAoD4AAAA/AACgPgAAAD8AAKA+AAAAPwAAgD7w/389AACAPvD/fz0AAIA+8P9/PQAAgD7w/389AACAPgAAAD4AAIA+AAAAPgAAgD4AAAA+AACAPgAAAD4AAIA+AABAPgAAgD4AAEA+AACAPgAAQD4AAIA+AABAPgAAgD4AAIA+AACAPgAAgD4AAIA+AACAPgAAgD4AAIA+AACAPv7/nz4AAIA+/v+fPgAAgD7+/58+AACAPv7/nz4AALA+AAAAPwAAsD4AAAA/AACwPgAAAD8AALA+AAAAPwIAYD7w/389AgBgPvD/fz0CAGA+8P9/PQIAYD7w/389AABgPgAAAD4AAGA+AAAAPgAAYD4AAAA+AABgPgAAAD4AAGA+AABAPgAAYD4AAEA+AABgPgAAQD4AAGA+AABAPgIAYD4AAIA+AgBgPgAAgD4CAGA+AACAPgIAYD4AAIA+AABgPv7/nz4AAGA+/v+fPgAAYD7+/58+AABgPv7/nz4AAMA+AAAAPwAAwD4AAAA/AADAPgAAAD8AAMA+AAAAPwQAQD7w/389BABAPvD/fz0EAEA+8P9/PQQAQD7w/389AABAPgAAAD4AAEA+AAAAPgAAQD4AAAA+AABAPgAAAD4AAEA+/P8/PgAAQD78/z8+AABAPvz/Pz4AAEA+/P8/PgIAQD4AAIA+AgBAPgAAgD4CAEA+AACAPgIAQD4AAIA+AABAPv7/nz4AAEA+/v+fPgAAQD7+/58+AABAPv7/nz4AANA+AAAAPwAA0D4AAAA/AADQPgAAAD8AANA+AAAAPwQAID7w/389BAAgPvD/fz0EACA+8P9/PQQAID7w/389AgAgPgAAAD4CACA+AAAAPgIAID4AAAA+AgAgPgAAAD7+/x8+/P8/Pv7/Hz78/z8+/v8fPvz/Pz7+/x8+/P8/PgIAID4AAIA+AgAgPgAAgD4CACA+AACAPgIAID4AAIA+AgAgPv7/nz4CACA+/v+fPgIAID7+/58+AgAgPv7/nz4AAOA+AAAAPwAA4D4AAAA/AADgPgAAAD8AAOA+AAAAPwQAAD7w/389BAAAPvD/fz0EAAA+8P9/PQQAAD7w/389AAAAPgAAAD4AAAA+AAAAPgAAAD4AAAA+AAAAPgAAAD4AAAA+/P8/PgAAAD78/z8+AAAAPvz/Pz4AAAA+/P8/PgQAAD78/38+BAAAPvz/fz4EAAA+/P9/PgQAAD78/38+AAAAPv7/nz4AAAA+/v+fPgAAAD7+/58+AAAAPv7/nz4AAPA+AAAAPwAA8D4AAAA/AADwPgAAAD8AAPA+AAAAPwgAwD3w/389CADAPfD/fz0IAMA98P9/PQgAwD3w/389AADAPQAAAD4AAMA9AAAAPgAAwD0AAAA+AADAPQAAAD4AAMA9/P8/PgAAwD38/z8+AADAPfz/Pz4AAMA9/P8/PgQAwD38/38+BADAPfz/fz4EAMA9/P9/PgQAwD38/38+BADAPf7/nz4EAMA9/v+fPgQAwD3+/58+BADAPf7/nz4AAAA/AAAAPwAAAD8AAAA/AAAAPwAAAD8AAAA/AAAAP0AAgDwAAAAAAgB8PwAAAAACAHQ/AAAAABgAQD0AAAAAEACgPQAAAAACAGw/AAAAAAEAZD8AAAAADADgPQAAAAABAFw/AAAAAAQAED4AAAAABAAwPgAAAAABAFQ/AAAAAAAATD8AAAAAAgBQPgAAAAAAAEQ/AAAAAAAAcD4AAAAA//+HPgAAAAAAADw/AAAAAAAAND8AAAAA/v+XPgAAAAD9/6c+AAAAAAAALD8AAAAA/v+3PgAAAAD//yM/AAAAAP//Gz8AAAAA/f/HPgAAAAD//xM/AAAAAP3/1z4AAAAA/P/nPgAAAAD+/ws/AAAAAPz/9z4AAAAA/v8DPwAAAAAIAIA98P9/PQgAgD3w/389CACAPfD/fz0IAIA98P9/PQQAgD0AAAA+BACAPQAAAD4EAIA9AAAAPgQAgD0AAAA+BACAPfz/Pz4EAIA9/P8/PgQAgD38/z8+BACAPfz/Pz4EAIA9/P9/PgQAgD38/38+BACAPfz/fz4EAIA9/P9/PgQAgD3+/58+BACAPf7/nz4EAIA9/v+fPgQAgD3+/58+AAAIPwAAAD8AAAg/AAAAPwAACD8AAAA/AAAIPwAAAD8YAAA98P9/PRgAAD3w/389GAAAPfD/fz0YAAA98P9/PRAAAD0AAAA+EAAAPQAAAD4QAAA9AAAAPhAAAD0AAAA+AAAAPfz/Pz4AAAA9/P8/PgAAAD38/z8+AAAAPfz/Pz4QAAA9/P9/PhAAAD38/38+EAAAPfz/fz4QAAA9/P9/PgAAAD3+/58+AAAAPf7/nz4AAAA9/v+fPgAAAD3+/58+AAAQPwAAAD8AABA/AAAAPwAAED8AAAA/AAAQPwAAAD8BAIA/8P9/PQAAwDPw/389AADAM/D/fz0BAIA/8P9/PQAAgD8AAAA+AAAAMwAAAD4AAIA/AAAAPgAAADMAAAA+AACAP/z/Pz4AAAAA/P8/PgAAgD/8/z8+AAAAAPz/Pz4AAAAz/P9/PgAAgD/8/38+AACAP/z/fz4AAAAz/P9/PgAAgD/+/58+AAAAM/7/nz4AAAAz/v+fPgAAgD/+/58+AAAYPwAAAD8AABg/AAAAPwAAGD8AAAA/AAAYPwAAAD8AAHg/8P9/PQAAeD/w/389AAB4P/D/fz0AAHg/8P9/PQAAeD8AAAA+AAB4PwAAAD4AAHg/AAAAPgAAeD8AAAA+AAB4P/j/Pz4AAHg/+P8/PgAAeD/4/z8+AAB4P/j/Pz4AAHg//P9/PgAAeD/8/38+AAB4P/z/fz4AAHg//P9/PgAAeD/8/58+AAB4P/z/nz4AAHg//P+fPgAAeD/8/58+AAAgPwAAAD8AACA/AAAAPwAAID8AAAA/AAAgPwAAAD8AAHA/8P9/PQAAcD/w/389AABwP/D/fz0AAHA/8P9/PQAAcD/4//89AABwP/j//z0AAHA/+P//PQAAcD/4//89AABwP/j/Pz4AAHA/+P8/PgAAcD/4/z8+AABwP/j/Pz4AAHA//P9/PgAAcD/8/38+AABwP/z/fz4AAHA//P9/PgAAcD/8/58+AABwP/z/nz4AAHA//P+fPgAAcD/8/58+AAAoPwAAAD8AACg/AAAAPwAAKD8AAAA/AAAoPwAAAD8AAGg/8P9/PQAAaD/w/389AABoP/D/fz0AAGg/8P9/PQAAaD/4//89AABoP/j//z0AAGg/+P//PQAAaD/4//89AABoP/j/Pz4AAGg/+P8/PgAAaD/4/z8+AABoP/j/Pz4AAGg//P9/PgAAaD/8/38+AABoP/z/fz4AAGg//P9/PgAAaD/8/58+AABoP/z/nz4AAGg//P+fPgAAaD/8/58+AAAwPwAAAD8AADA/AAAAPwAAMD8AAAA/AAAwPwAAAD8AAGA/8P9/PQAAYD/w/389AABgP/D/fz0AAGA/8P9/PQAAYD/4//89AABgP/j//z0AAGA/+P//PQAAYD/4//89AABgP/j/Pz4AAGA/+P8/PgAAYD/4/z8+AABgP/j/Pz4AAGA//P9/PgAAYD/8/38+AABgP/z/fz4AAGA//P9/PgAAYD/8/58+AABgP/z/nz4AAGA//P+fPgAAYD/8/58+AAA4PwAAAD8AADg/AAAAPwAAOD8AAAA/AAA4PwAAAD8AAFg/8P9/PQAAWD/w/389AABYP/D/fz0AAFg/8P9/PQAAWD/4//89AABYP/j//z0AAFg/+P//PQAAWD/4//89AABYP/j/Pz4AAFg/+P8/PgAAWD/4/z8+AABYP/j/Pz4AAFg/+P9/PgAAWD/4/38+AABYP/j/fz4AAFg/+P9/PgAAWD/8/58+AABYP/z/nz4AAFg//P+fPgAAWD/8/58+AABAPwAAAD8AAEA/AAAAPwAAQD8AAAA/AABAPwAAAD8AAFA/8P9/PQAAUD/w/389AABQP/D/fz0AAFA/8P9/PQAAUD/4//89AABQP/j//z0AAFA/+P//PQAAUD/4//89//9PP/j/Pz7//08/+P8/Pv//Tz/4/z8+//9PP/j/Pz4AAFA/+P9/PgAAUD/4/38+AABQP/j/fz4AAFA/+P9/PgAAUD/8/58+AABQP/z/nz4AAFA//P+fPgAAUD/8/58+AABIPwAAAD8AAEg/AAAAPwAASD8AAAA/AABIP/D/fz0AAEg/8P9/PQAASD/w/389AABIP/D/fz3//0c/+P//Pf//Rz/4//89//9HP/j//z3//0c/+P//Pf//Rz/4/z8+//9HP/j/Pz7//0c/+P8/Pv//Rz/4/z8+AABIP/z/fz4AAEg//P9/PgAASD/8/38+AABIP/z/fz4AAEg//P+fPgAASD/8/58+AABIP/z/nz4AAEg//P+fPgAAUD8AAAA/AABQPwAAAD8AAFA/AAAAPwAAQD8AAAA/AABAPwAAAD8AAEA/AAAAPwAAOD8AAAA/AAA4PwAAAD8AADg/AAAAPwAAcD8AAAA/AABwPwAAAD8AAHA/AAAAPwAAaD8AAAA/AABoPwAAAD8AAGg/AAAAPwAAUD8AAAA/AABQPwAAAD8AAFA/AAAAPwAASD8AAAA/AABIPwAAAD8AAEg/AAAAPwAAYD8AAAA/AABgPwAAAD8AAGA/AAAAPwAAWD8AAAA/AABYPwAAAD8AAFg/AAAAPwAAeD8AAAA/AAB4PwAAAD8AAHg/AAAAPwAAgD0AAAA/AACAPQAAAD8AAIA9AAAAPwAAAD0AAAA/AAAAPQAAAD8AAAA9AAAAPwAAAAAAAAA/AACAPwAAAD8AAIA/AAAAPwAAwD0AAAA/AADAPQAAAD8AAMA9AAAAPwAAAD4AAAA/AAAAPgAAAD8AAAA+AAAAPwAAID4AAAA/AAAgPgAAAD8AACA+AAAAPwAAQD4AAAA/AABAPgAAAD8AAEA+AAAAPwAAYD4AAAA/AABgPgAAAD8AAGA+AAAAPwAAgD4AAAA/AACAPgAAAD8AAIA+AAAAPwAAkD4AAAA/AACQPgAAAD8AAJA+AAAAPwAAoD4AAAA/AACgPgAAAD8AAKA+AAAAPwAAsD4AAAA/AACwPgAAAD8AALA+AAAAPwAAwD4AAAA/AADAPgAAAD8AAMA+AAAAPwAA0D4AAAA/AADQPgAAAD8AANA+AAAAPwAA4D4AAAA/AADgPgAAAD8AAOA+AAAAPwAA8D4AAAA/AADwPgAAAD8AAPA+AAAAPwAAAD8AAAA/AAAAPwAAAD8AAAA/AAAAPwAACD8AAAA/AAAIPwAAAD8AAAg/AAAAPwAAED8AAAA/AAAQPwAAAD8AABA/AAAAPwAAGD8AAAA/AAAYPwAAAD8AABg/AAAAPwAAID8AAAA/AAAgPwAAAD8AACA/AAAAPwAAKD8AAAA/AAAoPwAAAD8AACg/AAAAPwAAMD8AAAA/AAAwPwAAAD8AADA/AAAAPwMABwANAAMADQAKAAsADwAVAAsAFQASABMAFwAdABMAHQAaABsAHwAlABsAJQAiACMAJwAtACMALQAqACsALwA0ACsANAAxADIANgA7ADIAOwA4ADkAPQBEADkARABAAEEARQBNAEEATQBJAEgASwBVAEgAVQBRAFAAUwBdAFAAXQBZAFgAWwBlAFgAZQBhAGAAYwBtAGAAbQBpAGgAawB1AGgAdQBxAHAAcwB9AHAAfQB5AHgAewCFAHgAhQCBAH4AggCMAH4AjACHAIYAigCUAIYAlACPAI4AkgCcAI4AnACXAJYAmgCkAJYApACfAJ4AogCsAJ4ArACnAKYAqgCzAKYAswCvAK4AsQC7AK4AuwC2ALUAuQDCALUAwgC+AL0AwQDJAL0AyQDFAMYAywDRAMYA0QDNAM4A0wDZAM4A2QDVANYA2wDhANYA4QDdAN4A4wDpAN4A6QDlAOYA6wDxAOYA8QDtAO4A8wD5AO4A+QD1APYA+wAEAPYABAAAABgAIACJARgAiQFxAQ8BDAEiAQ8BIgElAQYAEAEmAQYAJgEMAP8AHQMVAQMBAAEWAQMBFgEZAQcBBAEaAQcBGgEdAQsBCAEeAQsBHgEhASMBIAE2ASMBNgE5AScBJAE6AScBOgE9AQ4AKAE+AQ4APgEUABcBHgMtARsBGAEvARsBLwExAR8BHAEyAR8BMgE1AS4BIQNFATMBMAFHATMBRwFJATcBNAFLATcBSwFNATsBOAFOATsBTgFRAT8BPAFSAT8BUgFVARYAQAFWARYAVgEcAFMBUAFnAVMBZwFpAVcBVAFqAVcBagFtAR4AWAFvAR4AbwEkAEYBIwNdAUoBSAFfAUoBXwFhAU8BTAFjAU8BYwFlAV4BJAN1AWIBYAF3AWIBdwF5AWYBZAF7AWYBewF9AWsBaAF/AWsBfwGBAW4BbAGDAW4BgwGFASYAcAGHASYAhwEsAIYBhAGbAYYBmwGdAS4AiAGfAS4AnwEzAHYBJgONAXoBeAGPAXoBjwGRAX4BfAGTAX4BkwGVAYIBgAGXAYIBlwGZAZIBkAGnAZIBpwGpAZYBlAGrAZYBqwGtAZoBmAGvAZoBrwGxAZ4BnAGzAZ4BswG1ATUAoAG3ATUAtwE6AI4BKQOlATwAuAHQATwA0AFDAKYBKwO+AaoBqAHAAaoBwAHCAa4BrAHDAa4BwwHFAbIBsAHIAbIByAHKAbYBtAHLAbYBywHNAcEBvwHYAcEB2AHaAcYBxAHcAcYB3AHeAckBxwHgAckB4AHiAc4BzAHkAc4B5AHmAUIAzwHoAUIA6AFMAL0BKgPWAUoA5wEAAkoAAAJUANUBKAPuAdkB1wHwAdkB8AHyAd0B2wH0Ad0B9AH2AeEB3wH4AeEB+AH6AeUB4wH8AeUB/AH+AfUB8wEMAvUBDAIOAvkB9wEQAvkBEAISAv0B+wEUAv0BFAIWAlIA/wEYAlIAGAJcAO0BJwMGAvEB7wEIAvEBCAIKAgUCJQMeAgkCBwIgAgkCIAIiAg0CCwIkAg0CJAImAhECDwIoAhECKAIrAhUCEwIsAhUCLAIuAloAFwIwAloAMAJkACUCIwI8AiUCPAI/AikCJwJAAikCQAJDAi0CKgJEAi0CRAJHAmIALwJIAmIASAJsAB0CIgM2AiECHwI4AiECOAI6AjUCIANOAjkCNwJQAjkCUAJTAj0COwJUAj0CVAJXAkECPgJYAkECWAJbAkUCQgJcAkUCXAJfAmoARgJgAmoAYAJ0AFkCVgJwAlkCcAJzAl0CWgJ0Al0CdAJ3AnIAXgJ4AnIAeAJ8AE0CHwNnAlECTwJoAlECaAJrAlUCUgJsAlUCbAJvAmUCHAN+AmkCZgJ/AmkCfwKCAm0CagKDAm0CgwKGAnECbgKHAnEChwKKAnUCcgKLAnUCiwKOAnoAdgKPAnoAjwKEAI0CiAKiAo0CogKnAoMAjAKmAoMApgKNAH0CGwOXAoECfAKWAoEClgKbAoUCgAKaAoUCmgKfAokChAKeAokCngKjApUCGQOvApkClAKtApkCrQKzAp0CmAKyAp0CsgK3AqECnAK2AqECtgK7AqUCoAK6AqUCugK/AosApAK+AosAvgKVAL0CuALSAr0C0gLXApMAvALWApMA1gKdAK4CFgPHArECrALFArECxQLLArUCsALJArUCyQLPArkCtALOArkCzgLTAsoCxALdAsoC3QLjAs0CyALhAs0C4QLnAtECzALlAtEC5QLrAtUC0ALqAtUC6gLvApsA1ALtApsA7QKlAMYCFQPfAqMA7AIFA6MABQOtAN4CEwP3AuIC3AL1AuIC9QL7AuYC4AL5AuYC+QL/AukC5AL9AukC/QIDA+4C6AIBA+4CAQMHA/oC9AItA/oCLQMzA/4C+AIxA/4CMQM3AwID/AI1AwIDNQM7AwYDAAM5AwYDOQM/A6sABAM9A6sAPQO0APYCEAMvA7IAPANVA7IAVQO8AC4DDwNHAzIDLANFAzIDRQNLAzYDMANJAzYDSQNPAzoDNANNAzoDTQNTAz4DOANRAz4DUQNXA04DSANhA04DYQNnA1IDTANlA1IDZQNrA1YDUANoA1YDaANuA7oAVANtA7oAbQPEAEYDDANeA0oDRANdA0oDXQNjA18DDQN2A2IDXAN0A2IDdAN6A2YDYAN4A2YDeAN+A2oDZAN8A2oDfAOCA28DaQOAA28DgAOGA8MAbAOEA8MAhAPKAIMDfQOUA4MDlAOaA4cDgQOYA4cDmAOeA8wAhQOcA8wAnAPSAHcDDgOOA3sDdQOMA3sDjAOSA38DeQOQA38DkAOWA48DEQOmA5MDjQOkA5MDpAOqA5cDkQOoA5cDqAOuA5sDlQOsA5sDrAOyA58DmQOwA58DsAO2A9QAnQO0A9QAtAPaALMDrQPEA7MDxAPJA7cDsQPIA7cDyAPOA9wAtQPMA9wAzAPiAKcDEgO+A6sDpQO8A6sDvAPCA68DqQPAA68DwAPGA78DFAPWA8MDvQPUA8MD1APaA8cDwQPYA8cD2APdA8sDxQPcA8sD3APhA88DygPgA88D4APlA+QAzQPkA+QA5APqAOcD4gP4A+cD+AP9A+wA5gP8A+wA/APyANcDFwPuA9sD1QPsA9sD7APxA98D2QPwA98D8AP1A+MD3gP0A+MD9AP5A+8DGAMEBPMD7QMDBPMDAwQIBPcD8gMHBPcDBwQMBPsD9gMLBPsDCwQQBP8D+gMPBP8DDwQUBPQA/gMTBPQAEwT6ABYEEQQJARYECQEOAfwAFQQNAfwADQEFAAYEGgP+AAoEBQT9AAoE/QACAQ4ECQQBAQ4EAQEGARIEDQQFARIEBQEKAVoDQwNqBFoDagRsBF4AZgBwA14AcAOIA6kAsAB7AqkAewKTAvAA+ACkAfAApAG8AT8ARwDRAz8A0QPpA4kAkQDbAokA2wLzAs8A2AAEAs8ABAIbAiEAKQASASEAEgGKAWcAbwBZA2cAWQNxA7AAtwBjArAAYwJ7AgIACQBCAQIAQgErAfcAAQAqAfcAKgGjAUYATgC4A0YAuAPQA5AAmADCApAAwgLaAtcA3wDrAdcA6wEDAigAMAAXBCgAFwQRAW4AdgBAA24AQANYA7gAwABMArgATAJkAggAEABZAQgAWQFBAU8AVwChA08AoQO5A5kAoQCrApkAqwLDAuAA6ADUAeAA1AHsATAANwAABDAAAAQXBHcAgAAKA3cACgNBA78AxwAzAr8AMwJLAhEAGQByAREAcgFaAVYAXwCJA1YAiQOgA6AAqACSAqAAkgKqAucA7wC7AecAuwHTATcAPgDoAzcA6AMABH8AiADyAn8A8gIJA8gA0AAcAsgAHAI0AjoEPAQyBDIEIAQjBCMELAQvBC8EJgQpBCkEGgQdBB0EdwR0BHQEcQRuBG4EawRoBGgEZgRkBGQEYQReBF4EWwRYBFgEVQRSBFIETwRMBEwESQRGBEYEQwRABEAENwQ6BDoEMgQjBCMELwQpBCkEHQR0BHQEbgRoBGgEZAReBF4EWARSBFIETARGBEYEQAQ6BDoEIwQpBCkEdARoBGgEXgRSBFIERgQ6BDoEKQRoBGgEUgQ6BKgCkQJXBKgCVwRZBFwBcwEkBFwBJAQiBBoCAQJEBBoCRARIBNIDuwN5BNIDeQQeBEQBWwEhBEQBIQQ0BHQBiwEtBHQBLQQlBEIDCwNnBEIDZwRpBJACegJUBJACVARWBAIC6QFBBAICQQRFBBkEAQQqBBkEKgQoBLoDowN2BLoDdgR4BAIE6wMcBAIEHAQrBAgD8QJjBAgDYwRlBHkCYgJRBHkCUQRTBOoB0QE+BOoBPgRCBKIDiwNzBKIDcwR1BPAC2QJgBPACYARiBGECSgJOBGECTgRQBNIBuQE1BNIBNQQ/BIoDcwNwBIoDcARyBNgCwQJdBNgCXQRfBOoD0wMfBOoDHwQbBBQBGAQnBBQBJwQxBEkCMQJKBEkCSgRNBCwBQwEzBCwBMwQ9BLoBoQE4BLoBOAQ2BHIDWwNtBHIDbQRvBMACqQJaBMACWgRcBIwBEwEwBIwBMAQuBKIBKQE7BKIBOwQ5BDICGQJHBDICRwRLBAAAAACrqio9q6qqPQAAAD6rqio+VVVVPgAAgD5VVZU+q6qqPgAAwD5VVdU+q6rqPgAAAD+rqgo/VVUVPwAAID+rqio/VVU1PwAAQD+rqko/VVVVPwAAYD+rqmo/VVV1PwAAgD9VVYU/q6qKPwAAkD9VVZU/q6qaPwAAoD8AAAAAU0d4PyibwT8AAAAAVgt4PyibwT8AAAAA0lx3PyibwT8AAAAA90N2PyibwT8AAAAA8ch0PyibwT8AAAAA7/NyPyibwT8AAAAAIc1wPyibwT8AAAAAslxuPyibwT8AAAAA06prPyibwT8AAAAAsL9oPyibwT8AAAAAd6NlPyibwT8AAAAAWV5iPyibwT8AAAAAgvhePyibwT8AAAAAIHpbPyibwT8AAAAAYutXPyibwT8AAAAAdlRUPyibwT8AAAAAib1QPyibwT8AAAAAyy5NPyibwT8AAAAAabBJPyibwT8AAAAAkUpGPyibwT8AAAAAcwVDPyibwT8AAAAAPOk/PyibwT8AAAAAGP48PyibwT8AAAAAOUw6PyibwT8AAAAAyts3PyibwT8AAAAA+7Q1PyibwT8AAAAA+d8zPyibwT8AAAAA9GQyPyibwT8AAAAAGUwxPyibwT8AAAAAlZ0wPyibwT8AAAAAmGEwPyibwT+rqio9q6qqPQAAAD6rqio+VVVVPgAAgD5VVZU+q6qqPgAAwD5VVdU+q6rqPgAAAD+rqgo/VVUVPwAAID+rqio/VVU1PwAAQD+rqko/VVVVPwAAYD+rqmo/VVV1PwAAgD9VVYU/q6qKPwAAkD9VVZU/q6qaPwAAoD8AAAAAU0d4P0ics78AAAAADwN4P0ics78AAAAArzx3P0ics78AAAAA1/11P0ics78AAAAAKFB0P0ics78AAAAAST1yP0ics78AAAAA2s5vP0ics78AAAAAgA5tP0ics78AAAAA3QVqP0ics78AAAAAlr5mP0ics78AAAAATUJjP0ics78AAAAApJpfP0ics78AAAAAQdFbP0ics78AAAAAxu9XP0ics78AAAAA1v9TP0ics78AAAAAEwtQP0ics78AAAAAIxtMP0ics78AAAAAqDlIP0ics78AAAAARHBEP0ics78AAAAAnMhAP0ics78AAAAAU0w9P0ics78AAAAADAU6P0ics78AAAAAafw2P0ics78AAAAADzw0P0ics78AAAAAoM0xP0ics78AAAAAwbovP0ics78AAAAAEw0uP0ics78AAAAAOs4sP0ics78AAAAA2gcsP0ics78AAAAAlsMrP0ics78="
        }
    ]
}
`;

    /* src/cenas/u01s01i02.svelte generated by Svelte v3.48.0 */

    const { console: console_1$1 } = globals;
    const file$8 = "src/cenas/u01s01i02.svelte";

    // (209:4) <Button         class="anterior"         size="lg"         color="danger"         on:click={() => ($storeCenas = scene1)}     >
    function create_default_slot_3$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Anterior");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$2.name,
    		type: "slot",
    		source: "(209:4) <Button         class=\\\"anterior\\\"         size=\\\"lg\\\"         color=\\\"danger\\\"         on:click={() => ($storeCenas = scene1)}     >",
    		ctx
    	});

    	return block;
    }

    // (217:4) <Button         class="proximo"         size="lg"         color="primary"         on:click={() => ($storeCenas = scene3)}     >
    function create_default_slot_2$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Próximo");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$2.name,
    		type: "slot",
    		source: "(217:4) <Button         class=\\\"proximo\\\"         size=\\\"lg\\\"         color=\\\"primary\\\"         on:click={() => ($storeCenas = scene3)}     >",
    		ctx
    	});

    	return block;
    }

    // (229:4) {#if tag1}
    function create_if_block_1(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "TEste1";
    			attr_dev(div, "class", "tag svelte-s5bjh3");
    			attr_dev(div, "id", "tag1");
    			add_location(div, file$8, 229, 8, 7716);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(229:4) {#if tag1}",
    		ctx
    	});

    	return block;
    }

    // (232:4) {#if tag2}
    function create_if_block(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "TEste2";
    			attr_dev(div, "class", "tag svelte-s5bjh3");
    			attr_dev(div, "id", "tag2");
    			add_location(div, file$8, 232, 8, 7789);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(232:4) {#if tag2}",
    		ctx
    	});

    	return block;
    }

    // (237:8) <Button size="lg" color="warning" on:click={() => camera.useAutoRotationBehavior = !camera.useAutoRotationBehavior }>
    function create_default_slot_1$4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("anim1");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$4.name,
    		type: "slot",
    		source: "(237:8) <Button size=\\\"lg\\\" color=\\\"warning\\\" on:click={() => camera.useAutoRotationBehavior = !camera.useAutoRotationBehavior }>",
    		ctx
    	});

    	return block;
    }

    // (238:8) <Button size="lg" color="warning" on:click={teste2}>
    function create_default_slot$6(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("anim2");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$6.name,
    		type: "slot",
    		source: "(238:8) <Button size=\\\"lg\\\" color=\\\"warning\\\" on:click={teste2}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let div0;
    	let button0;
    	let t0;
    	let button1;
    	let t1;
    	let div2;
    	let t2;
    	let t3;
    	let div1;
    	let button2;
    	let t4;
    	let button3;
    	let current;

    	button0 = new sveltestrap.Button({
    			props: {
    				class: "anterior",
    				size: "lg",
    				color: "danger",
    				$$slots: { default: [create_default_slot_3$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button0.$on("click", /*click_handler*/ ctx[5]);

    	button1 = new sveltestrap.Button({
    			props: {
    				class: "proximo",
    				size: "lg",
    				color: "primary",
    				$$slots: { default: [create_default_slot_2$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1.$on("click", /*click_handler_1*/ ctx[6]);
    	let if_block0 = /*tag1*/ ctx[1] && create_if_block_1(ctx);
    	let if_block1 = /*tag2*/ ctx[2] && create_if_block(ctx);

    	button2 = new sveltestrap.Button({
    			props: {
    				size: "lg",
    				color: "warning",
    				$$slots: { default: [create_default_slot_1$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button2.$on("click", /*click_handler_2*/ ctx[7]);

    	button3 = new sveltestrap.Button({
    			props: {
    				size: "lg",
    				color: "warning",
    				$$slots: { default: [create_default_slot$6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button3.$on("click", /*teste2*/ ctx[4]);

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			create_component(button0.$$.fragment);
    			t0 = space();
    			create_component(button1.$$.fragment);
    			t1 = space();
    			div2 = element("div");
    			if (if_block0) if_block0.c();
    			t2 = space();
    			if (if_block1) if_block1.c();
    			t3 = space();
    			div1 = element("div");
    			create_component(button2.$$.fragment);
    			t4 = space();
    			create_component(button3.$$.fragment);
    			add_location(div0, file$8, 207, 0, 7334);
    			set_style(div1, "margin", "0.5rem");
    			add_location(div1, file$8, 235, 4, 7844);
    			add_location(div2, file$8, 227, 0, 7687);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			mount_component(button0, div0, null);
    			append_dev(div0, t0);
    			mount_component(button1, div0, null);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div2, anchor);
    			if (if_block0) if_block0.m(div2, null);
    			append_dev(div2, t2);
    			if (if_block1) if_block1.m(div2, null);
    			append_dev(div2, t3);
    			append_dev(div2, div1);
    			mount_component(button2, div1, null);
    			append_dev(div1, t4);
    			mount_component(button3, div1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const button0_changes = {};

    			if (dirty & /*$$scope*/ 4194304) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty & /*$$scope*/ 4194304) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);

    			if (/*tag1*/ ctx[1]) {
    				if (if_block0) ; else {
    					if_block0 = create_if_block_1(ctx);
    					if_block0.c();
    					if_block0.m(div2, t2);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*tag2*/ ctx[2]) {
    				if (if_block1) ; else {
    					if_block1 = create_if_block(ctx);
    					if_block1.c();
    					if_block1.m(div2, t3);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			const button2_changes = {};

    			if (dirty & /*$$scope*/ 4194304) {
    				button2_changes.$$scope = { dirty, ctx };
    			}

    			button2.$set(button2_changes);
    			const button3_changes = {};

    			if (dirty & /*$$scope*/ 4194304) {
    				button3_changes.$$scope = { dirty, ctx };
    			}

    			button3.$set(button3_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			transition_in(button2.$$.fragment, local);
    			transition_in(button3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			transition_out(button2.$$.fragment, local);
    			transition_out(button3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			destroy_component(button0);
    			destroy_component(button1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div2);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			destroy_component(button2);
    			destroy_component(button3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let $storeBabylon;
    	let $storeCenas;
    	validate_store(babylonStore, 'storeBabylon');
    	component_subscribe($$self, babylonStore, $$value => $$invalidate(18, $storeBabylon = $$value));
    	validate_store(cenas, 'storeCenas');
    	component_subscribe($$self, cenas, $$value => $$invalidate(3, $storeCenas = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('U01s01i02', slots, []);
    	let btnAzul;
    	let btnAmarelo;
    	let led;
    	let btnAmareloClicado;
    	let btnAzulClicado;
    	var glowLayer;
    	var highLightLayer;
    	var light;
    	var scene;
    	var camera;
    	let tag1 = false;
    	let tag2 = false;
    	let users = [];

    	const createScene = (canvas, engine) => {
    		scene = new BABYLON.Scene(engine);
    		scene.clearColor = new BABYLON.Color4(1, 1, 1, 1);
    		$$invalidate(0, camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 0, -20), scene));
    		camera.setTarget(BABYLON.Vector3.Zero());
    		camera.attachControl(canvas, true);
    		$$invalidate(0, camera.useAutoRotationBehavior = true, camera);
    		$$invalidate(0, camera.autoRotationBehavior.idleRotationSpeed = 1, camera);
    		light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, -15), scene);
    		light.intensity = 0.7;
    		glowLayer = new BABYLON.GlowLayer("glow", scene);
    		highLightLayer = new BABYLON.HighlightLayer("highlight", scene);

    		// Import the .env file as a CubeTexture
    		const texture = new BABYLON__namespace.CubeTexture('../assets/environment.env', scene);

    		// Create a skybox mesh using this texture
    		scene.createDefaultSkybox(texture, true, 10000, 0.1);

    		BABYLON__namespace.SceneLoader.ShowLoadingScreen = false;

    		new BABYLON__namespace.SceneLoader.Append("",
    		"data:" + gltf,
    		scene,
    		function () {
    				scene.stopAllAnimations();
    				btnAzul = scene.meshes[2];
    				btnAmarelo = scene.meshes[4];
    				led = scene.meshes[6];
    				btnAmareloClicado = false;
    				btnAzulClicado = false;
    				btnAzul.visibility = 0.3;
    				btnAmarelo.visibility = 0.2;
    				led.visibility = 0.2;
    				led.checkCollisions = true;
    				btnAzul.checkCollisions = true;

    				let opt = {
    					dragPlaneNormal: new BABYLON__namespace.Vector3(0, 1, 0)
    				};

    				let drag = new BABYLON__namespace.PointerDragBehavior(opt);
    				drag.enabled = true;
    				led.addBehavior(drag);

    				scene.onKeyboardObservable.add(keyInfo => {
    					switch (keyInfo.type) {
    						case BABYLON__namespace.KeyboardEventTypes.KEYDOWN:
    							switch (keyInfo.event.key) {
    								case "a":
    								case "A":
    									led.moveWithCollisions(new BABYLON__namespace.Vector3(-0.1, 0, 0));
    									break;
    								case "d":
    								case "D":
    									led.moveWithCollisions(new BABYLON__namespace.Vector3(0.1, 0, 0));
    									break;
    								case "w":
    								case "W":
    									led.moveWithCollisions(new BABYLON__namespace.Vector3(0, 0, 0.1));
    									break;
    								case "s":
    								case "S":
    									led.moveWithCollisions(new BABYLON__namespace.Vector3(0, 0, -0.1));
    									break;
    								case "q":
    								case "Q":
    									led.moveWithCollisions(new BABYLON__namespace.Vector3(0, 0.1, 0));
    									break;
    								case "e":
    								case "E":
    									led.moveWithCollisions(new BABYLON__namespace.Vector3(0, -0.1, 0));
    									break;
    							}
    							break;
    					}
    				});

    				led.onCollideObservable.add(function (m, evt) {
    					let msg = "Collision with: " + m.name;
    					console.log(msg);
    					highLightLayer.addMesh(btnAmarelo, BABYLON.Color3.Green());
    				});

    				btnAmarelo.actionManager = new BABYLON.ActionManager(scene);

    				btnAmarelo.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickDownTrigger,
    				function () {
    						$$invalidate(1, tag1 = true);
    						$$invalidate(2, tag2 = false);
    						highLightLayer.addMesh(btnAmarelo, BABYLON.Color3.Green());
    						btnAmareloClicado = true;
    						scene.getAnimationGroupByName("clickBtn2").play();

    						if (btnAmareloClicado && btnAzulClicado) {
    							led.material.emissiveColor = BABYLON.Color3.Red();
    						}
    					}));

    				btnAzul.actionManager = new BABYLON.ActionManager(scene);

    				btnAzul.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickDownTrigger,
    				function () {
    						$$invalidate(1, tag1 = false);
    						$$invalidate(2, tag2 = true);
    						highLightLayer.addMesh(btnAzul, BABYLON.Color3.Green());
    						scene.getAnimationGroupByName("clickBtn1").play();
    						btnAzulClicado = true;

    						if (btnAmareloClicado && btnAzulClicado) {
    							led.material.emissiveColor = BABYLON.Color3.Red();
    						}
    					}));
    			});

    		engine.runRenderLoop(() => {
    			scene.render();
    		});

    		window.addEventListener("resize", () => {
    			engine.resize();
    		});

    		return scene;
    	};

    	onMount(() => {
    		createScene($storeBabylon.canvas, $storeBabylon.engine);
    	});

    	function teste1() {
    		$$invalidate(1, tag1 = true);
    		$$invalidate(2, tag2 = false);
    		highLightLayer.addMesh(btnAmarelo, BABYLON.Color3.Green());
    		btnAmareloClicado = true;
    		scene.getAnimationGroupByName("clickBtn2").play();

    		if (btnAmareloClicado && btnAzulClicado) {
    			led.material.emissiveColor = BABYLON.Color3.Red();
    		}
    	}

    	function teste2() {
    		$$invalidate(1, tag1 = false);
    		$$invalidate(2, tag2 = true);
    		highLightLayer.addMesh(btnAzul, BABYLON.Color3.Green());
    		scene.getAnimationGroupByName("clickBtn1").play();
    		btnAzulClicado = true;

    		if (btnAmareloClicado && btnAzulClicado) {
    			led.material.emissiveColor = BABYLON.Color3.Red();
    		}
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<U01s01i02> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => set_store_value(cenas, $storeCenas = U01s01i01, $storeCenas);
    	const click_handler_1 = () => set_store_value(cenas, $storeCenas = U01s01i03, $storeCenas);
    	const click_handler_2 = () => $$invalidate(0, camera.useAutoRotationBehavior = !camera.useAutoRotationBehavior, camera);

    	$$self.$capture_state = () => ({
    		onMount,
    		Scene: BABYLON.Scene,
    		ArcRotateCamera: BABYLON.ArcRotateCamera,
    		Color4: BABYLON.Color4,
    		Color3: BABYLON.Color3,
    		Vector3: BABYLON.Vector3,
    		HemisphericLight: BABYLON.HemisphericLight,
    		ActionManager: BABYLON.ActionManager,
    		ExecuteCodeAction: BABYLON.ExecuteCodeAction,
    		GlowLayer: BABYLON.GlowLayer,
    		HighlightLayer: BABYLON.HighlightLayer,
    		BABYLON: BABYLON__namespace,
    		storeBabylon: babylonStore,
    		storeCenas: cenas,
    		scene1: U01s01i01,
    		scene3: U01s01i03,
    		Button: sveltestrap.Button,
    		gltf,
    		btnAzul,
    		btnAmarelo,
    		led,
    		btnAmareloClicado,
    		btnAzulClicado,
    		glowLayer,
    		highLightLayer,
    		light,
    		scene,
    		camera,
    		tag1,
    		tag2,
    		users,
    		createScene,
    		teste1,
    		teste2,
    		$storeBabylon,
    		$storeCenas
    	});

    	$$self.$inject_state = $$props => {
    		if ('btnAzul' in $$props) btnAzul = $$props.btnAzul;
    		if ('btnAmarelo' in $$props) btnAmarelo = $$props.btnAmarelo;
    		if ('led' in $$props) led = $$props.led;
    		if ('btnAmareloClicado' in $$props) btnAmareloClicado = $$props.btnAmareloClicado;
    		if ('btnAzulClicado' in $$props) btnAzulClicado = $$props.btnAzulClicado;
    		if ('glowLayer' in $$props) glowLayer = $$props.glowLayer;
    		if ('highLightLayer' in $$props) highLightLayer = $$props.highLightLayer;
    		if ('light' in $$props) light = $$props.light;
    		if ('scene' in $$props) scene = $$props.scene;
    		if ('camera' in $$props) $$invalidate(0, camera = $$props.camera);
    		if ('tag1' in $$props) $$invalidate(1, tag1 = $$props.tag1);
    		if ('tag2' in $$props) $$invalidate(2, tag2 = $$props.tag2);
    		if ('users' in $$props) users = $$props.users;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		camera,
    		tag1,
    		tag2,
    		$storeCenas,
    		teste2,
    		click_handler,
    		click_handler_1,
    		click_handler_2
    	];
    }

    class U01s01i02 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "U01s01i02",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/cenas/u01s01i01.svelte generated by Svelte v3.48.0 */

    const { Error: Error_1, Object: Object_1, console: console_1 } = globals;
    const file$7 = "src/cenas/u01s01i01.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    // (88:4) <Button         class="anterior"         size="lg"         color="danger"         on:click={() => ($storeCenas = u01Inicio)}     >
    function create_default_slot_3$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Anterior");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$1.name,
    		type: "slot",
    		source: "(88:4) <Button         class=\\\"anterior\\\"         size=\\\"lg\\\"         color=\\\"danger\\\"         on:click={() => ($storeCenas = u01Inicio)}     >",
    		ctx
    	});

    	return block;
    }

    // (96:4) <Button         class="proximo"         size="lg"         color="primary"         on:click={() => ($storeCenas = scene2)}     >
    function create_default_slot_2$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Próximo");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(96:4) <Button         class=\\\"proximo\\\"         size=\\\"lg\\\"         color=\\\"primary\\\"         on:click={() => ($storeCenas = scene2)}     >",
    		ctx
    	});

    	return block;
    }

    // (108:4) <Button size="lg" color="warning" on:click={adduser}>
    function create_default_slot_1$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("anim1");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$3.name,
    		type: "slot",
    		source: "(108:4) <Button size=\\\"lg\\\" color=\\\"warning\\\" on:click={adduser}>",
    		ctx
    	});

    	return block;
    }

    // (109:4) <Button size="lg" color="warning" on:click={getuser}>
    function create_default_slot$5(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("anim2");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$5.name,
    		type: "slot",
    		source: "(109:4) <Button size=\\\"lg\\\" color=\\\"warning\\\" on:click={getuser}>",
    		ctx
    	});

    	return block;
    }

    // (115:1) {#each users as user}
    function create_each_block$1(ctx) {
    	let li;
    	let t_value = /*user*/ ctx[5].username + "";
    	let t;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t = text(t_value);
    			add_location(li, file$7, 115, 2, 2514);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*users*/ 1 && t_value !== (t_value = /*user*/ ctx[5].username + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(115:1) {#each users as user}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let div0;
    	let button0;
    	let t0;
    	let button1;
    	let t1;
    	let div1;
    	let button2;
    	let t2;
    	let button3;
    	let t3;
    	let div2;
    	let ul;
    	let current;

    	button0 = new sveltestrap.Button({
    			props: {
    				class: "anterior",
    				size: "lg",
    				color: "danger",
    				$$slots: { default: [create_default_slot_3$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button0.$on("click", /*click_handler*/ ctx[3]);

    	button1 = new sveltestrap.Button({
    			props: {
    				class: "proximo",
    				size: "lg",
    				color: "primary",
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1.$on("click", /*click_handler_1*/ ctx[4]);

    	button2 = new sveltestrap.Button({
    			props: {
    				size: "lg",
    				color: "warning",
    				$$slots: { default: [create_default_slot_1$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button2.$on("click", adduser);

    	button3 = new sveltestrap.Button({
    			props: {
    				size: "lg",
    				color: "warning",
    				$$slots: { default: [create_default_slot$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button3.$on("click", /*getuser*/ ctx[2]);
    	let each_value = /*users*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			create_component(button0.$$.fragment);
    			t0 = space();
    			create_component(button1.$$.fragment);
    			t1 = space();
    			div1 = element("div");
    			create_component(button2.$$.fragment);
    			t2 = space();
    			create_component(button3.$$.fragment);
    			t3 = space();
    			div2 = element("div");
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(div0, file$7, 86, 0, 1926);
    			set_style(div1, "margin", "0.5rem");
    			add_location(div1, file$7, 106, 0, 2282);
    			add_location(ul, file$7, 113, 0, 2484);
    			attr_dev(div2, "class", "palco svelte-1pty78g");
    			add_location(div2, file$7, 111, 0, 2463);
    		},
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			mount_component(button0, div0, null);
    			append_dev(div0, t0);
    			mount_component(button1, div0, null);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			mount_component(button2, div1, null);
    			append_dev(div1, t2);
    			mount_component(button3, div1, null);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const button0_changes = {};

    			if (dirty & /*$$scope*/ 256) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty & /*$$scope*/ 256) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    			const button2_changes = {};

    			if (dirty & /*$$scope*/ 256) {
    				button2_changes.$$scope = { dirty, ctx };
    			}

    			button2.$set(button2_changes);
    			const button3_changes = {};

    			if (dirty & /*$$scope*/ 256) {
    				button3_changes.$$scope = { dirty, ctx };
    			}

    			button3.$set(button3_changes);

    			if (dirty & /*users*/ 1) {
    				each_value = /*users*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			transition_in(button2.$$.fragment, local);
    			transition_in(button3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			transition_out(button2.$$.fragment, local);
    			transition_out(button3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			destroy_component(button0);
    			destroy_component(button1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			destroy_component(button2);
    			destroy_component(button3);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div2);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function adduser() {
    	let user = { username: "kk", password: 555 };

    	fetch("http://localhost:3000/users", {
    		method: "POST",
    		body: JSON.stringify(user),
    		headers: { "Content-Type": "application/json" }
    	}).then(res => {
    		if (!res.ok) {
    			throw new Error("Failed");
    		}
    	}).catch(err => {
    		console.log(err);
    	});
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let $storeCenas;
    	validate_store(cenas, 'storeCenas');
    	component_subscribe($$self, cenas, $$value => $$invalidate(1, $storeCenas = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('U01s01i01', slots, []);

    	onMount(() => {
    		
    	});

    	let users = [];

    	function getuser() {
    		fetch("http://192.168.0.116:3000/users").then(res => {
    			if (!res.ok) {
    				throw new Error("Failed");
    			}

    			return res.json();
    		}).then(data => {
    			$$invalidate(0, users = Object.values(data));
    			console.log(users);
    		}).catch(err => {
    			console.log(err);
    		});
    	}

    	const writable_props = [];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<U01s01i01> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => set_store_value(cenas, $storeCenas = U01Inicio, $storeCenas);
    	const click_handler_1 = () => set_store_value(cenas, $storeCenas = U01s01i02, $storeCenas);

    	$$self.$capture_state = () => ({
    		onMount,
    		Button: sveltestrap.Button,
    		storeCenas: cenas,
    		u01Inicio: U01Inicio,
    		scene2: U01s01i02,
    		users,
    		adduser,
    		getuser,
    		$storeCenas
    	});

    	$$self.$inject_state = $$props => {
    		if ('users' in $$props) $$invalidate(0, users = $$props.users);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [users, $storeCenas, getuser, click_handler, click_handler_1];
    }

    class U01s01i01 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "U01s01i01",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src/components/layout/5layoutInicioUnidade.svelte generated by Svelte v3.48.0 */
    const file$6 = "src/components/layout/5layoutInicioUnidade.svelte";
    const get_unidade_slot_changes = dirty => ({});
    const get_unidade_slot_context = ctx => ({});
    const get_assuntos_slot_changes = dirty => ({});
    const get_assuntos_slot_context = ctx => ({});

    // (9:8) <Col class="azulBrancoImgEsquerda1">
    function create_default_slot_8(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "width", "200");
    			attr_dev(img, "height", "300");
    			if (!src_url_equal(img.src, img_src_value = "./assets/imagens/LogoEEAR.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "img1");
    			add_location(img, file$6, 9, 10, 241);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8.name,
    		type: "slot",
    		source: "(9:8) <Col class=\\\"azulBrancoImgEsquerda1\\\">",
    		ctx
    	});

    	return block;
    }

    // (17:8) <Col class="azulBrancoImgEsquerda2">
    function create_default_slot_7(ctx) {
    	let img;
    	let img_src_value;
    	let t0;
    	let h2;

    	const block = {
    		c: function create() {
    			img = element("img");
    			t0 = space();
    			h2 = element("h2");
    			h2.textContent = "FORÇA AÉREA BRASILEIRA";
    			attr_dev(img, "width", "350");
    			attr_dev(img, "height", "250");
    			if (!src_url_equal(img.src, img_src_value = "./assets/imagens/gladioAlado.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "img2");
    			add_location(img, file$6, 17, 10, 449);
    			add_location(h2, file$6, 23, 10, 600);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, h2, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(h2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7.name,
    		type: "slot",
    		source: "(17:8) <Col class=\\\"azulBrancoImgEsquerda2\\\">",
    		ctx
    	});

    	return block;
    }

    // (8:6) <Row class="azulBrancoContainer">
    function create_default_slot_6(ctx) {
    	let col0;
    	let t;
    	let col1;
    	let current;

    	col0 = new sveltestrap.Col({
    			props: {
    				class: "azulBrancoImgEsquerda1",
    				$$slots: { default: [create_default_slot_8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	col1 = new sveltestrap.Col({
    			props: {
    				class: "azulBrancoImgEsquerda2",
    				$$slots: { default: [create_default_slot_7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(col0.$$.fragment);
    			t = space();
    			create_component(col1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(col0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(col1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const col0_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				col0_changes.$$scope = { dirty, ctx };
    			}

    			col0.$set(col0_changes);
    			const col1_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				col1_changes.$$scope = { dirty, ctx };
    			}

    			col1.$set(col1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col0.$$.fragment, local);
    			transition_in(col1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col0.$$.fragment, local);
    			transition_out(col1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(col0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(col1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6.name,
    		type: "slot",
    		source: "(8:6) <Row class=\\\"azulBrancoContainer\\\">",
    		ctx
    	});

    	return block;
    }

    // (7:4) <Col class="azulBrancoEsquerda">
    function create_default_slot_5(ctx) {
    	let row;
    	let current;

    	row = new sveltestrap.Row({
    			props: {
    				class: "azulBrancoContainer",
    				$$slots: { default: [create_default_slot_6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(row.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(row, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const row_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				row_changes.$$scope = { dirty, ctx };
    			}

    			row.$set(row_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(row, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(7:4) <Col class=\\\"azulBrancoEsquerda\\\">",
    		ctx
    	});

    	return block;
    }

    // (29:8) <Row>
    function create_default_slot_4(ctx) {
    	let h1;
    	let current;
    	const assuntos_slot_template = /*#slots*/ ctx[0].assuntos;
    	const assuntos_slot = create_slot(assuntos_slot_template, ctx, /*$$scope*/ ctx[1], get_assuntos_slot_context);

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			if (assuntos_slot) assuntos_slot.c();
    			add_location(h1, file$6, 29, 10, 731);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);

    			if (assuntos_slot) {
    				assuntos_slot.m(h1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (assuntos_slot) {
    				if (assuntos_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						assuntos_slot,
    						assuntos_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(assuntos_slot_template, /*$$scope*/ ctx[1], dirty, get_assuntos_slot_changes),
    						get_assuntos_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(assuntos_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(assuntos_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (assuntos_slot) assuntos_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(29:8) <Row>",
    		ctx
    	});

    	return block;
    }

    // (32:8) <Row>
    function create_default_slot_3(ctx) {
    	let h1;
    	let current;
    	const unidade_slot_template = /*#slots*/ ctx[0].unidade;
    	const unidade_slot = create_slot(unidade_slot_template, ctx, /*$$scope*/ ctx[1], get_unidade_slot_context);

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			if (unidade_slot) unidade_slot.c();
    			add_location(h1, file$6, 32, 10, 804);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);

    			if (unidade_slot) {
    				unidade_slot.m(h1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (unidade_slot) {
    				if (unidade_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						unidade_slot,
    						unidade_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(unidade_slot_template, /*$$scope*/ ctx[1], dirty, get_unidade_slot_changes),
    						get_unidade_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(unidade_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(unidade_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (unidade_slot) unidade_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(32:8) <Row>",
    		ctx
    	});

    	return block;
    }

    // (28:4) <Col class="azulBrancoDireita">
    function create_default_slot_2(ctx) {
    	let row0;
    	let t;
    	let row1;
    	let current;

    	row0 = new sveltestrap.Row({
    			props: {
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row1 = new sveltestrap.Row({
    			props: {
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(row0.$$.fragment);
    			t = space();
    			create_component(row1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(row0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(row1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const row0_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				row0_changes.$$scope = { dirty, ctx };
    			}

    			row0.$set(row0_changes);
    			const row1_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				row1_changes.$$scope = { dirty, ctx };
    			}

    			row1.$set(row1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row0.$$.fragment, local);
    			transition_in(row1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row0.$$.fragment, local);
    			transition_out(row1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(row0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(row1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(28:4) <Col class=\\\"azulBrancoDireita\\\">",
    		ctx
    	});

    	return block;
    }

    // (6:2) <Row>
    function create_default_slot_1$2(ctx) {
    	let col0;
    	let t;
    	let col1;
    	let current;

    	col0 = new sveltestrap.Col({
    			props: {
    				class: "azulBrancoEsquerda",
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	col1 = new sveltestrap.Col({
    			props: {
    				class: "azulBrancoDireita",
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(col0.$$.fragment);
    			t = space();
    			create_component(col1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(col0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(col1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const col0_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				col0_changes.$$scope = { dirty, ctx };
    			}

    			col0.$set(col0_changes);
    			const col1_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				col1_changes.$$scope = { dirty, ctx };
    			}

    			col1.$set(col1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col0.$$.fragment, local);
    			transition_in(col1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col0.$$.fragment, local);
    			transition_out(col1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(col0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(col1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$2.name,
    		type: "slot",
    		source: "(6:2) <Row>",
    		ctx
    	});

    	return block;
    }

    // (5:0) <Container class="unidade">
    function create_default_slot$4(ctx) {
    	let row;
    	let current;

    	row = new sveltestrap.Row({
    			props: {
    				$$slots: { default: [create_default_slot_1$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(row.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(row, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const row_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				row_changes.$$scope = { dirty, ctx };
    			}

    			row.$set(row_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(row, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(5:0) <Container class=\\\"unidade\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let container;
    	let current;

    	container = new sveltestrap.Container({
    			props: {
    				class: "unidade",
    				$$slots: { default: [create_default_slot$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(container.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(container, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const container_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				container_changes.$$scope = { dirty, ctx };
    			}

    			container.$set(container_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(container.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(container.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(container, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('_5layoutInicioUnidade', slots, ['assuntos','unidade']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<_5layoutInicioUnidade> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ Col: sveltestrap.Col, Container: sveltestrap.Container, Row: sveltestrap.Row });
    	return [slots, $$scope];
    }

    class _5layoutInicioUnidade extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "_5layoutInicioUnidade",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/cenas/u01Inicio.svelte generated by Svelte v3.48.0 */
    const file$5 = "src/cenas/u01Inicio.svelte";

    // (13:4) <Button         class="anterior"         size="lg"         color="danger"         on:click={() => ($storeCenas = visaoGeral)}     >
    function create_default_slot_1$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Anterior");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(13:4) <Button         class=\\\"anterior\\\"         size=\\\"lg\\\"         color=\\\"danger\\\"         on:click={() => ($storeCenas = visaoGeral)}     >",
    		ctx
    	});

    	return block;
    }

    // (21:4) <Button         class="proximo"         size="lg"         color="primary"         on:click={() => ($storeCenas = scene1)}     >
    function create_default_slot$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Próximo");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(21:4) <Button         class=\\\"proximo\\\"         size=\\\"lg\\\"         color=\\\"primary\\\"         on:click={() => ($storeCenas = scene1)}     >",
    		ctx
    	});

    	return block;
    }

    // (34:4) 
    function create_assuntos_slot(ctx) {
    	let h1;
    	let t_value = /*$geralState*/ ctx[1].roteiros[1]["unidade"] + "";
    	let t;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			t = text(t_value);
    			attr_dev(h1, "slot", "assuntos");
    			add_location(h1, file$5, 33, 4, 759);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			append_dev(h1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$geralState*/ 2 && t_value !== (t_value = /*$geralState*/ ctx[1].roteiros[1]["unidade"] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_assuntos_slot.name,
    		type: "slot",
    		source: "(34:4) ",
    		ctx
    	});

    	return block;
    }

    // (35:4) 
    function create_unidade_slot(ctx) {
    	let h2;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "UNIDADE 1";
    			attr_dev(h2, "slot", "unidade");
    			add_location(h2, file$5, 34, 4, 827);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_unidade_slot.name,
    		type: "slot",
    		source: "(35:4) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let div;
    	let button0;
    	let t0;
    	let button1;
    	let t1;
    	let layoutiniciounidade;
    	let current;

    	button0 = new sveltestrap.Button({
    			props: {
    				class: "anterior",
    				size: "lg",
    				color: "danger",
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button0.$on("click", /*click_handler*/ ctx[2]);

    	button1 = new sveltestrap.Button({
    			props: {
    				class: "proximo",
    				size: "lg",
    				color: "primary",
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1.$on("click", /*click_handler_1*/ ctx[3]);

    	layoutiniciounidade = new _5layoutInicioUnidade({
    			props: {
    				$$slots: {
    					unidade: [create_unidade_slot],
    					assuntos: [create_assuntos_slot]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(button0.$$.fragment);
    			t0 = space();
    			create_component(button1.$$.fragment);
    			t1 = space();
    			create_component(layoutiniciounidade.$$.fragment);
    			add_location(div, file$5, 11, 0, 375);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(button0, div, null);
    			append_dev(div, t0);
    			mount_component(button1, div, null);
    			insert_dev(target, t1, anchor);
    			mount_component(layoutiniciounidade, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const button0_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    			const layoutiniciounidade_changes = {};

    			if (dirty & /*$$scope, $geralState*/ 18) {
    				layoutiniciounidade_changes.$$scope = { dirty, ctx };
    			}

    			layoutiniciounidade.$set(layoutiniciounidade_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			transition_in(layoutiniciounidade.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			transition_out(layoutiniciounidade.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(button0);
    			destroy_component(button1);
    			if (detaching) detach_dev(t1);
    			destroy_component(layoutiniciounidade, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let $storeCenas;
    	let $geralState;
    	validate_store(cenas, 'storeCenas');
    	component_subscribe($$self, cenas, $$value => $$invalidate(0, $storeCenas = $$value));
    	validate_store(geralState, 'geralState');
    	component_subscribe($$self, geralState, $$value => $$invalidate(1, $geralState = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('U01Inicio', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<U01Inicio> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => set_store_value(cenas, $storeCenas = _2visaoGeral, $storeCenas);
    	const click_handler_1 = () => set_store_value(cenas, $storeCenas = U01s01i01, $storeCenas);

    	$$self.$capture_state = () => ({
    		Button: sveltestrap.Button,
    		geralState,
    		storeCenas: cenas,
    		visaoGeral: _2visaoGeral,
    		scene1: U01s01i01,
    		LayoutInicioUnidade: _5layoutInicioUnidade,
    		$storeCenas,
    		$geralState
    	});

    	return [$storeCenas, $geralState, click_handler, click_handler_1];
    }

    class U01Inicio extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "U01Inicio",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/cenas/iniciais/2visaoGeral.svelte generated by Svelte v3.48.0 */
    const file$4 = "src/cenas/iniciais/2visaoGeral.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    // (13:2) <Button     class="anterior"     size="lg"     color="danger"     on:click={() => ($storeCenas = inicioGeral)} >
    function create_default_slot_1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Anterior");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(13:2) <Button     class=\\\"anterior\\\"     size=\\\"lg\\\"     color=\\\"danger\\\"     on:click={() => ($storeCenas = inicioGeral)} >",
    		ctx
    	});

    	return block;
    }

    // (21:0) <Button     class="proximo"     size="lg"     color="primary"     on:click={() => (       $storeCenas = u01Inicio       )} >
    function create_default_slot$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Próximo");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(21:0) <Button     class=\\\"proximo\\\"     size=\\\"lg\\\"     color=\\\"primary\\\"     on:click={() => (       $storeCenas = u01Inicio       )} >",
    		ctx
    	});

    	return block;
    }

    // (34:4) 
    function create_objetivo_slot(ctx) {
    	let span;
    	let t_value = /*$storeGeral*/ ctx[1].objetivo + "";
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(t_value);
    			attr_dev(span, "class", "objetivo");
    			attr_dev(span, "slot", "objetivo");
    			add_location(span, file$4, 33, 4, 685);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$storeGeral*/ 2 && t_value !== (t_value = /*$storeGeral*/ ctx[1].objetivo + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_objetivo_slot.name,
    		type: "slot",
    		source: "(34:4) ",
    		ctx
    	});

    	return block;
    }

    // (37:8) {#each $storeGeral.roteiros as roteiro}
    function create_each_block(ctx) {
    	let li;
    	let t0_value = /*roteiro*/ ctx[4].unidade + "";
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t0 = text(t0_value);
    			t1 = space();
    			add_location(li, file$4, 37, 8, 846);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t0);
    			append_dev(li, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$storeGeral*/ 2 && t0_value !== (t0_value = /*roteiro*/ ctx[4].unidade + "")) set_data_dev(t0, t0_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(37:8) {#each $storeGeral.roteiros as roteiro}",
    		ctx
    	});

    	return block;
    }

    // (35:4) 
    function create_roteiro_slot(ctx) {
    	let div;
    	let ol;
    	let each_value = /*$storeGeral*/ ctx[1].roteiros;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			ol = element("ol");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(ol, file$4, 35, 6, 785);
    			attr_dev(div, "slot", "roteiro");
    			add_location(div, file$4, 34, 4, 758);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, ol);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ol, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$storeGeral*/ 2) {
    				each_value = /*$storeGeral*/ ctx[1].roteiros;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ol, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_roteiro_slot.name,
    		type: "slot",
    		source: "(35:4) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let div;
    	let button0;
    	let t0;
    	let button1;
    	let t1;
    	let layoutvisaogeral;
    	let current;

    	button0 = new sveltestrap.Button({
    			props: {
    				class: "anterior",
    				size: "lg",
    				color: "danger",
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button0.$on("click", /*click_handler*/ ctx[2]);

    	button1 = new sveltestrap.Button({
    			props: {
    				class: "proximo",
    				size: "lg",
    				color: "primary",
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1.$on("click", /*click_handler_1*/ ctx[3]);

    	layoutvisaogeral = new _2layoutVisaoGeral({
    			props: {
    				$$slots: {
    					roteiro: [create_roteiro_slot],
    					objetivo: [create_objetivo_slot]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(button0.$$.fragment);
    			t0 = space();
    			create_component(button1.$$.fragment);
    			t1 = space();
    			create_component(layoutvisaogeral.$$.fragment);
    			add_location(div, file$4, 11, 0, 359);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(button0, div, null);
    			append_dev(div, t0);
    			mount_component(button1, div, null);
    			insert_dev(target, t1, anchor);
    			mount_component(layoutvisaogeral, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const button0_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    			const layoutvisaogeral_changes = {};

    			if (dirty & /*$$scope, $storeGeral*/ 130) {
    				layoutvisaogeral_changes.$$scope = { dirty, ctx };
    			}

    			layoutvisaogeral.$set(layoutvisaogeral_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			transition_in(layoutvisaogeral.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			transition_out(layoutvisaogeral.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(button0);
    			destroy_component(button1);
    			if (detaching) detach_dev(t1);
    			destroy_component(layoutvisaogeral, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let $storeCenas;
    	let $storeGeral;
    	validate_store(cenas, 'storeCenas');
    	component_subscribe($$self, cenas, $$value => $$invalidate(0, $storeCenas = $$value));
    	validate_store(geralState, 'storeGeral');
    	component_subscribe($$self, geralState, $$value => $$invalidate(1, $storeGeral = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('_2visaoGeral', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<_2visaoGeral> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => set_store_value(cenas, $storeCenas = _1InicioGeral, $storeCenas);
    	const click_handler_1 = () => set_store_value(cenas, $storeCenas = U01Inicio, $storeCenas);

    	$$self.$capture_state = () => ({
    		Button: sveltestrap.Button,
    		LayoutVisaoGeral: _2layoutVisaoGeral,
    		storeCenas: cenas,
    		inicioGeral: _1InicioGeral,
    		storeGeral: geralState,
    		u01Inicio: U01Inicio,
    		$storeCenas,
    		$storeGeral
    	});

    	return [$storeCenas, $storeGeral, click_handler, click_handler_1];
    }

    class _2visaoGeral extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "_2visaoGeral",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/components/layout/1LayoutInicioGeral.svelte generated by Svelte v3.48.0 */

    const file$3 = "src/components/layout/1LayoutInicioGeral.svelte";
    const get_disciplina_slot_changes = dirty => ({});
    const get_disciplina_slot_context = ctx => ({});

    function create_fragment$3(ctx) {
    	let div;
    	let h5;
    	let t1;
    	let current;
    	const disciplina_slot_template = /*#slots*/ ctx[1].disciplina;
    	const disciplina_slot = create_slot(disciplina_slot_template, ctx, /*$$scope*/ ctx[0], get_disciplina_slot_context);

    	const block = {
    		c: function create() {
    			div = element("div");
    			h5 = element("h5");
    			h5.textContent = "Pressione F11 para Tela Cheia";
    			t1 = space();
    			if (disciplina_slot) disciplina_slot.c();
    			add_location(h5, file$3, 1, 3, 29);
    			attr_dev(div, "class", "inicioGeral");
    			add_location(div, file$3, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h5);
    			append_dev(div, t1);

    			if (disciplina_slot) {
    				disciplina_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (disciplina_slot) {
    				if (disciplina_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						disciplina_slot,
    						disciplina_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(disciplina_slot_template, /*$$scope*/ ctx[0], dirty, get_disciplina_slot_changes),
    						get_disciplina_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(disciplina_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(disciplina_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (disciplina_slot) disciplina_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('_1LayoutInicioGeral', slots, ['disciplina']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<_1LayoutInicioGeral> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class _1LayoutInicioGeral extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "_1LayoutInicioGeral",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/cenas/iniciais/1InicioGeral.svelte generated by Svelte v3.48.0 */
    const file$2 = "src/cenas/iniciais/1InicioGeral.svelte";

    // (12:4) 
    function create_disciplina_slot(ctx) {
    	let h1;
    	let t_value = /*$geralState*/ ctx[0].disciplina + "";
    	let t;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			t = text(t_value);
    			attr_dev(h1, "slot", "disciplina");
    			add_location(h1, file$2, 11, 4, 318);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			append_dev(h1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$geralState*/ 1 && t_value !== (t_value = /*$geralState*/ ctx[0].disciplina + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_disciplina_slot.name,
    		type: "slot",
    		source: "(12:4) ",
    		ctx
    	});

    	return block;
    }

    // (15:0) <Button     class="proximo"     size="lg"     color="primary"     on:click={() => ($storeCenas = visaoGeral)} >
    function create_default_slot$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Próximo");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(15:0) <Button     class=\\\"proximo\\\"     size=\\\"lg\\\"     color=\\\"primary\\\"     on:click={() => ($storeCenas = visaoGeral)} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let layoutinicio;
    	let t;
    	let button;
    	let current;

    	layoutinicio = new _1LayoutInicioGeral({
    			props: {
    				$$slots: { disciplina: [create_disciplina_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button = new sveltestrap.Button({
    			props: {
    				class: "proximo",
    				size: "lg",
    				color: "primary",
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*click_handler*/ ctx[2]);

    	const block = {
    		c: function create() {
    			create_component(layoutinicio.$$.fragment);
    			t = space();
    			create_component(button.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(layoutinicio, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const layoutinicio_changes = {};

    			if (dirty & /*$$scope, $geralState*/ 9) {
    				layoutinicio_changes.$$scope = { dirty, ctx };
    			}

    			layoutinicio.$set(layoutinicio_changes);
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 8) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(layoutinicio.$$.fragment, local);
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(layoutinicio.$$.fragment, local);
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(layoutinicio, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(button, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let $geralState;
    	let $storeCenas;
    	validate_store(geralState, 'geralState');
    	component_subscribe($$self, geralState, $$value => $$invalidate(0, $geralState = $$value));
    	validate_store(cenas, 'storeCenas');
    	component_subscribe($$self, cenas, $$value => $$invalidate(1, $storeCenas = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('_1InicioGeral', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<_1InicioGeral> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => set_store_value(cenas, $storeCenas = _2visaoGeral, $storeCenas);

    	$$self.$capture_state = () => ({
    		storeCenas: cenas,
    		geralState,
    		visaoGeral: _2visaoGeral,
    		LayoutInicio: _1LayoutInicioGeral,
    		Button: sveltestrap.Button,
    		$geralState,
    		$storeCenas
    	});

    	return [$geralState, $storeCenas, click_handler];
    }

    class _1InicioGeral extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "_1InicioGeral",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    const cenas = writable(_1InicioGeral);

    /* src/components/layout/layoutVidro.svelte generated by Svelte v3.48.0 */

    const file$1 = "src/components/layout/layoutVidro.svelte";
    const get_meio_slot_changes = dirty => ({});
    const get_meio_slot_context = ctx => ({});
    const get_cabecalhoDireita_slot_changes = dirty => ({});
    const get_cabecalhoDireita_slot_context = ctx => ({});
    const get_cabecalhoEsquerda_slot_changes = dirty => ({});
    const get_cabecalhoEsquerda_slot_context = ctx => ({});

    function create_fragment$1(ctx) {
    	let div5;
    	let div0;
    	let t0;
    	let div1;
    	let t1;
    	let div2;
    	let t2;
    	let div3;
    	let t3;
    	let div4;
    	let current;
    	const cabecalhoEsquerda_slot_template = /*#slots*/ ctx[1].cabecalhoEsquerda;
    	const cabecalhoEsquerda_slot = create_slot(cabecalhoEsquerda_slot_template, ctx, /*$$scope*/ ctx[0], get_cabecalhoEsquerda_slot_context);
    	const cabecalhoDireita_slot_template = /*#slots*/ ctx[1].cabecalhoDireita;
    	const cabecalhoDireita_slot = create_slot(cabecalhoDireita_slot_template, ctx, /*$$scope*/ ctx[0], get_cabecalhoDireita_slot_context);
    	const meio_slot_template = /*#slots*/ ctx[1].meio;
    	const meio_slot = create_slot(meio_slot_template, ctx, /*$$scope*/ ctx[0], get_meio_slot_context);

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			if (cabecalhoEsquerda_slot) cabecalhoEsquerda_slot.c();
    			t1 = space();
    			div2 = element("div");
    			if (cabecalhoDireita_slot) cabecalhoDireita_slot.c();
    			t2 = space();
    			div3 = element("div");
    			if (meio_slot) meio_slot.c();
    			t3 = space();
    			div4 = element("div");
    			attr_dev(div0, "class", "");
    			add_location(div0, file$1, 1, 4, 21);
    			attr_dev(div1, "class", "cabecalho");
    			add_location(div1, file$1, 2, 4, 43);
    			add_location(div2, file$1, 5, 4, 124);
    			attr_dev(div3, "class", "meio");
    			add_location(div3, file$1, 9, 4, 187);
    			attr_dev(div4, "class", "rodape");
    			add_location(div4, file$1, 12, 4, 250);
    			attr_dev(div5, "id", "fundo");
    			add_location(div5, file$1, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div0);
    			append_dev(div5, t0);
    			append_dev(div5, div1);

    			if (cabecalhoEsquerda_slot) {
    				cabecalhoEsquerda_slot.m(div1, null);
    			}

    			append_dev(div5, t1);
    			append_dev(div5, div2);

    			if (cabecalhoDireita_slot) {
    				cabecalhoDireita_slot.m(div2, null);
    			}

    			append_dev(div5, t2);
    			append_dev(div5, div3);

    			if (meio_slot) {
    				meio_slot.m(div3, null);
    			}

    			append_dev(div5, t3);
    			append_dev(div5, div4);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (cabecalhoEsquerda_slot) {
    				if (cabecalhoEsquerda_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						cabecalhoEsquerda_slot,
    						cabecalhoEsquerda_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(cabecalhoEsquerda_slot_template, /*$$scope*/ ctx[0], dirty, get_cabecalhoEsquerda_slot_changes),
    						get_cabecalhoEsquerda_slot_context
    					);
    				}
    			}

    			if (cabecalhoDireita_slot) {
    				if (cabecalhoDireita_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						cabecalhoDireita_slot,
    						cabecalhoDireita_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(cabecalhoDireita_slot_template, /*$$scope*/ ctx[0], dirty, get_cabecalhoDireita_slot_changes),
    						get_cabecalhoDireita_slot_context
    					);
    				}
    			}

    			if (meio_slot) {
    				if (meio_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						meio_slot,
    						meio_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(meio_slot_template, /*$$scope*/ ctx[0], dirty, get_meio_slot_changes),
    						get_meio_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(cabecalhoEsquerda_slot, local);
    			transition_in(cabecalhoDireita_slot, local);
    			transition_in(meio_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(cabecalhoEsquerda_slot, local);
    			transition_out(cabecalhoDireita_slot, local);
    			transition_out(meio_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    			if (cabecalhoEsquerda_slot) cabecalhoEsquerda_slot.d(detaching);
    			if (cabecalhoDireita_slot) cabecalhoDireita_slot.d(detaching);
    			if (meio_slot) meio_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('LayoutVidro', slots, ['cabecalhoEsquerda','cabecalhoDireita','meio']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<LayoutVidro> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class LayoutVidro extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LayoutVidro",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.48.0 */
    const file = "src/App.svelte";

    // (23:0) <Button  on:click={() => ($storeCenas = inicioGeral)}  class="menuInicio"  size="lg"  color="primary"  >
    function create_default_slot(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("INÍCIO");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(23:0) <Button  on:click={() => ($storeCenas = inicioGeral)}  class=\\\"menuInicio\\\"  size=\\\"lg\\\"  color=\\\"primary\\\"  >",
    		ctx
    	});

    	return block;
    }

    // (31:1) 
    function create_meio_slot(ctx) {
    	let div;
    	let canvas_1;
    	let t;
    	let switch_instance;
    	let current;
    	var switch_value = /*$storeCenas*/ ctx[1];

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			canvas_1 = element("canvas");
    			t = space();
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			attr_dev(canvas_1, "class", "svelte-13fw65h");
    			add_location(canvas_1, file, 31, 2, 803);
    			attr_dev(div, "slot", "meio");
    			attr_dev(div, "class", "svelte-13fw65h");
    			add_location(div, file, 30, 1, 783);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, canvas_1);
    			/*canvas_1_binding*/ ctx[3](canvas_1);
    			append_dev(div, t);

    			if (switch_instance) {
    				mount_component(switch_instance, div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (switch_value !== (switch_value = /*$storeCenas*/ ctx[1])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, div, null);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			/*canvas_1_binding*/ ctx[3](null);
    			if (switch_instance) destroy_component(switch_instance);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_meio_slot.name,
    		type: "slot",
    		source: "(31:1) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let button;
    	let t;
    	let layoutvidro;
    	let current;

    	button = new sveltestrap.Button({
    			props: {
    				class: "menuInicio",
    				size: "lg",
    				color: "primary",
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*click_handler*/ ctx[2]);

    	layoutvidro = new LayoutVidro({
    			props: {
    				$$slots: { meio: [create_meio_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(button.$$.fragment);
    			t = space();
    			create_component(layoutvidro.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(button, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(layoutvidro, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 32) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    			const layoutvidro_changes = {};

    			if (dirty & /*$$scope, $storeCenas, canvas*/ 35) {
    				layoutvidro_changes.$$scope = { dirty, ctx };
    			}

    			layoutvidro.$set(layoutvidro_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			transition_in(layoutvidro.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			transition_out(layoutvidro.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(button, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(layoutvidro, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let $babylonStore;
    	let $storeCenas;
    	validate_store(babylonStore, 'babylonStore');
    	component_subscribe($$self, babylonStore, $$value => $$invalidate(4, $babylonStore = $$value));
    	validate_store(cenas, 'storeCenas');
    	component_subscribe($$self, cenas, $$value => $$invalidate(1, $storeCenas = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let canvas;

    	onMount(() => {
    		const createScene = canvas => {
    			const engine = new BABYLON__namespace.Engine(canvas, true);
    			set_store_value(babylonStore, $babylonStore.engine = engine, $babylonStore);
    			set_store_value(babylonStore, $babylonStore.canvas = canvas, $babylonStore);
    		};

    		createScene(canvas);
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => set_store_value(cenas, $storeCenas = _1InicioGeral, $storeCenas);

    	function canvas_1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			canvas = $$value;
    			$$invalidate(0, canvas);
    		});
    	}

    	$$self.$capture_state = () => ({
    		onMount,
    		babylonStore,
    		storeCenas: cenas,
    		BABYLON: BABYLON__namespace,
    		LayoutVidro,
    		inicioGeral: _1InicioGeral,
    		Button: sveltestrap.Button,
    		canvas,
    		$babylonStore,
    		$storeCenas
    	});

    	$$self.$inject_state = $$props => {
    		if ('canvas' in $$props) $$invalidate(0, canvas = $$props.canvas);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [canvas, $storeCenas, click_handler, canvas_1_binding];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    });

    return app;

})(sveltestrap, BABYLON);
//# sourceMappingURL=bundle.js.map
