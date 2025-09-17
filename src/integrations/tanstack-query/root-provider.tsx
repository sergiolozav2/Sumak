import { QueryClient } from '@tanstack/react-query'
import superjson from 'superjson'
import {
  createTRPCClient,
  httpBatchStreamLink,
  httpLink,
  splitLink,
  isNonJsonSerializable,
} from '@trpc/client'

import type { TRPCRouter } from '@/integrations/trpc/router'

import { TRPCProvider } from '@/integrations/trpc/react'
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

export type RouterInput = inferRouterInputs<TRPCRouter>
export type RouterOutput = inferRouterOutputs<TRPCRouter>

function getUrl() {
  const base = (() => {
    if (typeof window !== 'undefined') return ''
    return `http://localhost:${process.env.PORT ?? 3000}`
  })()
  return `${base}/api/trpc`
}

export const trpcClient = createTRPCClient<TRPCRouter>({
  links: [
    splitLink({
      condition: (op) => isNonJsonSerializable(op.input),
      true: httpLink({
        url: getUrl(),
        transformer: {
          // request - convert data before sending to the tRPC server
          serialize: (data) => data,
          // response - convert the tRPC response before using it in client
          deserialize: superjson.deserialize,
        },
      }),
      false: httpBatchStreamLink({
        transformer: superjson,
        url: getUrl(),
      }),
    }),
  ],
})

export function getContext() {
  const queryClient = new QueryClient({
    defaultOptions: {
      dehydrate: { serializeData: superjson.serialize },
      hydrate: { deserializeData: superjson.deserialize },
    },
  })

  return {
    queryClient,
    trpc: trpcClient,
  }
}

export function Provider({
  children,
  queryClient,
}: {
  children: React.ReactNode
  queryClient: QueryClient
}) {
  return (
    <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
      {children}
    </TRPCProvider>
  )
}
