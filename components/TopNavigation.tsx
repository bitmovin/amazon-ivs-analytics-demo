import { Suspense } from 'react'
import * as Client from './client/TopNavigation'

export function TopNavigation<R extends string>(props: Client.Props<R>) {
    return (
        <Suspense fallback={<Client.TopNavigation {...props} />}>
            <Client.TopNavigation {...props} />
        </Suspense>
    )
}