export const getLoginApiUrl =(path: string): string => {
    return `${import.meta.env.VITE_NODE_ENV_URL}${path}`
}