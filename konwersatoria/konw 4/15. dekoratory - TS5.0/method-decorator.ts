function measurePerformance(target: Function, context: ClassMethodDecoratorContext) {
  console.log('MeasurePerf fired')
  console.log(target)
  console.log(context)
  return function (...args: any) {
    const start = performance.now()
    const ret = target()
    const end = performance.now()
    const executionTime = end - start
    console.log(`Execution time of ${String(context.name)}: ${executionTime}`)
    return ret
  }
}
class Table {
  pilotHasParachute = true

  @measurePerformance
  prepareData() {
    console.log('Prepare data')
    let x = 0
    do {
      x++
      const y = Math.sqrt(x)
    } while (x < 1_000_000)
  }
}

setTimeout(() => {
  const users = new Table()
  users.prepareData()
}, 2000)