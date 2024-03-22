"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
// Cwiczenie napisz dekorator zapamietujacy wyniki przez okreslony czas (np. @timeCache(10))
{
    // dekorator cache metody
    function cache(originalMethod, context) {
        console.log(context.name);
        const cacheStore = {}; // albo np. mapa
        return function cacheData(...args) {
            let cacheKey = String(context.name) + '/' + args.join("/");
            let ret;
            if (cacheStore[cacheKey]) {
                ret = cacheStore[cacheKey];
                console.log('FROM CACHE!', args, ret);
            }
            else {
                console.log('FROM FN!', args, ret);
                ret = originalMethod.apply(this, args);
                cacheStore[cacheKey] = ret;
            }
            return ret;
        };
    }
    function timeCache(expirationTime) {
        return function (originalMethod, context) {
            console.warn(`Cache for ${String(context.name)}`);
            const cacheStore = new Map();
            return function cacheData(...args) {
                let cacheKey = String(context.name) + '/' + args.join("/");
                const hasCache = cacheStore.has(cacheKey);
                if (!hasCache) {
                    console.log('No cache - get data from fn!', args);
                    const ret = originalMethod.apply(this, args);
                    const cacheData = {
                        value: ret,
                        date: Date.now()
                    };
                    cacheStore.set(cacheKey, cacheData);
                    return ret;
                }
                const dataFromCache = cacheStore.get(cacheKey);
                const cacheExpired = dataFromCache.date < Date.now() - expirationTime * 1000;
                if (cacheExpired) {
                    console.log('Cache expired - refresh from fn!', args);
                    console.log(Date.now() - dataFromCache.date);
                    const ret = originalMethod.apply(this, args);
                    const cacheData = {
                        value: ret,
                        date: Date.now()
                    };
                    cacheStore.set(cacheKey, cacheData);
                    return ret;
                }
                else {
                    console.log('FROM CACHE!', args, dataFromCache);
                    return dataFromCache.value;
                }
            };
        };
    }
    // wykorzystanie dekoratorów
    let Calculate = (() => {
        let _instanceExtraInitializers = [];
        let _add_decorators;
        let _multiply_decorators;
        let _power_decorators;
        return class Calculate {
            static {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _add_decorators = [timeCache(2)];
                _multiply_decorators = [timeCache(4)];
                _power_decorators = [timeCache(6)];
                __esDecorate(this, null, _add_decorators, { kind: "method", name: "add", static: false, private: false, access: { has: obj => "add" in obj, get: obj => obj.add }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(this, null, _multiply_decorators, { kind: "method", name: "multiply", static: false, private: false, access: { has: obj => "multiply" in obj, get: obj => obj.multiply }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(this, null, _power_decorators, { kind: "method", name: "power", static: false, private: false, access: { has: obj => "power" in obj, get: obj => obj.power }, metadata: _metadata }, null, _instanceExtraInitializers);
                if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            }
            add(a, b) {
                return a + b;
            }
            multiply(a, b) {
                return a * b;
            }
            power(base, exp) {
                return base ** exp;
            }
            constructor() {
                __runInitializers(this, _instanceExtraInitializers);
            }
        };
    })();
    let calculator = new Calculate();
    const add1 = calculator.add(10, 6);
    const add2 = calculator.add(5, 2);
    const add3 = calculator.add(10, 6);
    const multiply1 = calculator.multiply(10, 6);
    const multiply2 = calculator.multiply(5, 2);
    const multiply3 = calculator.multiply(10, 6);
    const power1 = calculator.power(10, 6);
    const power2 = calculator.power(5, 2);
    const power3 = calculator.power(10, 6);
    console.warn('Wait for a moment...');
    setTimeout(() => {
        const add2 = calculator.add(5, 2);
        const add3 = calculator.add(10, 6);
        const multiply2 = calculator.multiply(5, 2);
        const multiply3 = calculator.multiply(10, 6);
        const power2 = calculator.power(5, 2);
        const power3 = calculator.power(10, 6);
    }, 5000);
}
