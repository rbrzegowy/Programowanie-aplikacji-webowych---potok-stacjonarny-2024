// Cwiczenie napisz dekorator zapamietujacy wyniki przez okreslony czas (np. @timeCache(10))
{
    type Second = number & {}
    type CacheData = {
        value: any
        date: number
    }
    // dekorator cache metody
    function cache(originalMethod: any, context: ClassMethodDecoratorContext) {
        console.log(context.name)
        const cacheStore = new Map()
        return function cacheData(this: any, ...args: number[]) {
            let cacheKey = String(context.name) + '/' + args.join("/") //add/3/4
            let ret: any
            if (cacheStore.has(cacheKey)) {
                ret = cacheStore.get(cacheKey)
                console.log('FROM CACHE!', args, ret)
            } else {
                console.log('FROM FN!', args, ret)
                ret = originalMethod.apply(this, args)
                cacheStore.set(cacheKey, ret)
            }
            return ret
        }
    }
    function timeCache(expirationTime: Second) {
        return function (originalMethod: any, context: ClassMethodDecoratorContext) {
            console.warn(`Cache for ${String(context.name)}`)

            const cacheStore = new Map<string, CacheData>()
            return function cacheData(this: any, ...args: number[]) {
                let cacheKey = String(context.name) + '/' + args.join("/")
                const hasCache = cacheStore.has(cacheKey)
                if (!hasCache) {
                    console.log('No cache - get data from fn!', args)
                    const ret = originalMethod.apply(this, args)
                    const cacheData = {
                        value: ret,
                        date: Date.now()
                    }
                    cacheStore.set(cacheKey, cacheData)
                    return ret
                }
                const dataFromCache = cacheStore.get(cacheKey) as CacheData
                const cacheExpired = dataFromCache.date < Date.now() - expirationTime * 1000

                if (cacheExpired) {
                    console.log('Cache expired - refresh from fn!', args)
                    console.log(Date.now() - dataFromCache.date)
                    const ret = originalMethod.apply(this, args)
                    const cacheData = {
                        value: ret,
                        date: Date.now()
                    }
                    cacheStore.set(cacheKey, cacheData)
                    return ret
                } else {
                    console.log('FROM CACHE!', args, dataFromCache)
                    return dataFromCache.value
                }
            }
        }
    }


    // wykorzystanie dekoratorów
    class Calculate {
        @timeCache(2)
        add(a: number, b: number): number {
            return a + b
        }
        @timeCache(4)
        multiply(a: number, b: number): number {
            return a * b
        }
        @timeCache(6)
        power(base: number, exp: number): number {
            return base ** exp
        }
    }

    let calculator = new Calculate()
    const add1 = calculator.add(10, 6)
    const add2 = calculator.add(5, 2)
    const add3 = calculator.add(10, 6)

    const multiply1 = calculator.multiply(10, 6)
    const multiply2 = calculator.multiply(5, 2)
    const multiply3 = calculator.multiply(10, 6)

    const power1 = calculator.power(10, 6)
    const power2 = calculator.power(5, 2)
    const power3 = calculator.power(10, 6)

    console.warn('Wait for a moment...')
    setTimeout(() => {
        const add2 = calculator.add(5, 2)
        const add3 = calculator.add(10, 6)

        const multiply2 = calculator.multiply(5, 2)
        const multiply3 = calculator.multiply(10, 6)

        const power2 = calculator.power(5, 2)
        const power3 = calculator.power(10, 6)
    }, 5000)
}
