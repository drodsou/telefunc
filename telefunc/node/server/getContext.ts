import { getContext_sync, provideTelefuncContext_sync } from './getContext/sync'
import { assert, assertUsage, isObject } from '../utils'
import type { Telefunc } from './getContext/TelefuncNamespace'

export { getContext }
export { getContextOptional }
export { provideTelefuncContext }
export { Telefunc }

export { installAsyncMode }
installSyncMode()

function getContext<Context extends object = Telefunc.Context>(): Context {
  const context = _getContext()
  assertUsage(
    context !== undefined,
    [
      `\`getContext()\`: no context found${!isSSR() ? '' : ' (SSR)'}.`,
      'Make sure to properly call `provideTelefuncContext()`,',
      `see https://telefunc.com/provideTelefuncContext${isSSR() ? '#ssr' : ''}`,
    ].join(' '),
  )
  assert(isObject(context))
  return context as Context
}

function getContextOptional() {
  const context = _getContext()
  return context
}

function provideTelefuncContext<Context extends object = Telefunc.Context>(context: Context) {
  _provideTelefuncContext(context)
}

var _getContext: () => Telefunc.Context | undefined
var _provideTelefuncContext: (context: Telefunc.Context) => void

function installSyncMode() {
  _getContext = getContext_sync
  _provideTelefuncContext = provideTelefuncContext_sync
}
async function installAsyncMode({
  getContext_async,
  provideTelefuncContext_async,
}: {
  getContext_async: typeof _getContext
  provideTelefuncContext_async: typeof _provideTelefuncContext
}) {
  _getContext = getContext_async
  _provideTelefuncContext = provideTelefuncContext_async
}

function isSSR(): boolean {
  // TODO
  return false
}
