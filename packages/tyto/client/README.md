# Tyto Client

This is a [facade](https://refactoring.guru/design-patterns/facade) for the [Resources](https://www.w3schools.in/restful-web-services/rest-resources) in Tyto

This package provides a near turn-key solution for making requests to, and otherwise getting data from **Tyto**, the `.NET` `REST API` for all **Mocaworks** Applications.

_This library was generated with [Nx](https://nx.dev)._

## High Level Concepts about the Package

The Core of the Package is a `class` called `TytoClient` which manages its own **Axios** `Instance` that it uses internally make Network Requests to **Tyto**.

## Basic Usage

> ℹ️ For the most up-to-date usage please the tests.

The intended work flow for using this package is through `A)` The **React** `Context Provider`, and `B)` The `useTytoClient` hook.

First you would want to wrap the application in the Provider, passing it axios (`AxiosStatic`), and _optionally_ an axiosConfig (`AxiosRequestConfig`) like so:

```TS
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

import { TytoClientProvider } from '@tyto/client'

import App from './app/app'

const AXIOS_CONFIG = {
    baseURL: process.env.BASE_URL || `https://api.mocaworks.com/tyto/api`
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <TytoClientProvider
     axios={axios}
     // * OPTIONAL
     axiosConfig={AXIOS_CONFIG}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TytoClientProvider>
  </StrictMode>
)

```

Alternatively, if you have your own existing instance of axios (`AxiosInstance`) you can pass that in in leiu of `AxiosStatic` and TytoClient will use it instead of creating its own instance:

```TS
const SOME_GLOBAL_AXIOS_INSTANCE = useAxiosInstance()
...
    <TytoClientProvider
      axiosInstance={SOME_GLOBAL_AXIOS_INSTANCE}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TytoClientProvider>
...
```

You should then be able to use the Client through the Application via the `useTytoClient` hook:

```TS
import { useQuery } from 'react-query'
import { useTytoClient, TYTO_ENDPOINT_PATHS } from '@tyto/client'

...
function MyComponent<Props> {
    const {
        isLoading,
        data
    } = useConversationsQuery({})

    return (
        <div>
            ....
            {isLoading ? (
                <span>Loading...</span>
            ) : (
                {data?.notices?.notices?.map(notice => (
                    <li>
                        {notice.presentationText}
                    </li>
                ))}
            )}
        </div>
    );
}
...

function useConversationsQuery({}) {
    const tytoClient = useTytoClient();

    return useQuery(
        [TYTO_ENDPOINT_PATHS.PERSON_NOTICES],
        async () => {
            const responseData = await tytoClient['Person/Notices'].get({})

            return responseData
        },
        { // * Some Hypothetical Config Options }
    )
}
```

It is also possible to manage the whole thing yourself if you wanted to, something along the lines of

```TS
import axios from 'axios'
import { TytoClient } from '@tyto/client'

export const client = TytoClient({
    axios,
    axiosConfig: {
        baseURL: 'https://api.mocaworks.com/tyto/api'
    }
})

// Each client creates and manages its own instance of axios
export const client2 = TytoClient({
    axios,
    axiosConfig: {
        baseURL: 'https://somewhere-else.azureedge.net/tyto/api'
    }
})

// Then whatever you want to do with any instance(s) of Tyto
```

## Running unit tests

Run `nx test tyto-client` to execute the unit tests via [Vitest](https://vitest.dev/).
