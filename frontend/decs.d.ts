declare module 'credential-handler-polyfill' {
    export async function load(mediatorUrl?: string)
    export async function loadOnce(mediatorUrl?: string)
}

declare module 'react-stomp';