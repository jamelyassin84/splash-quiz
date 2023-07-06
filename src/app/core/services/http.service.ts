import axios, {AxiosError} from 'axios'

export type RequestOptions = {
    headers?: Record<string, string>
    params?: Record<string, string>
}

export class HttpService {
    protected static instance?: HttpService
    protected url: string
    protected lastStatusCode = 200

    constructor() {
        this.url = 'http://localhost:8000'
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new this()
        }

        return this.instance
    }

    public setUrl(url: string) {
        this.url = url
    }

    public getLastStatusCode() {
        return this.lastStatusCode
    }

    public async get<T = any>(path: string, options?: RequestOptions) {
        try {
            const fullUrl = this.resolvePath(path)
            const params = this.resolveParams(options)

            const {data, status} = await axios.get<T>(`${fullUrl}${params}`, {
                headers: options?.headers,
            })

            this.lastStatusCode = status

            return data
        } catch (error: any) {
            throw error
        }
    }

    public async post<T = any>(
        path: string,
        payload?: any,
        options?: RequestOptions,
    ) {
        try {
            const fullUrl = this.resolvePath(path)
            const params = this.resolveParams(options)

            const {data, status} = await axios.post<T>(
                `${fullUrl}${params}`,
                payload,
                {
                    headers: options?.headers,
                },
            )

            this.lastStatusCode = status

            return data
        } catch (error: any) {
            throw error
        }
    }

    public async put<T = any>(
        path: string,
        payload?: any,
        options?: RequestOptions,
    ) {
        try {
            const fullUrl = this.resolvePath(path)
            const params = this.resolveParams(options)

            const {data, status} = await axios.put<T>(
                `${fullUrl}${params}`,
                payload,
                {
                    headers: options?.headers,
                },
            )

            this.lastStatusCode = status

            return data
        } catch (error: any) {
            throw error
        }
    }

    public async patch<T = any>(
        path: string,
        payload?: any,
        options?: RequestOptions,
    ) {
        try {
            const fullUrl = this.resolvePath(path)
            const params = this.resolveParams(options)

            const {data, status} = await axios.patch<T>(
                `${fullUrl}${params}`,
                payload,
                {
                    headers: options?.headers,
                },
            )

            this.lastStatusCode = status

            return data
        } catch (error: any) {
            throw error
        }
    }

    public async delete<T = any>(path: string, options?: RequestOptions) {
        try {
            const fullUrl = this.resolvePath(path)
            const params = this.resolveParams(options)

            const {data, status} = await axios.delete<T>(
                `${fullUrl}${params}`,
                {
                    headers: options?.headers,
                },
            )

            this.lastStatusCode = status

            return data
        } catch (error: any) {
            throw error
        }
    }

    protected resolvePath(path: string) {
        return `${this.url}${path}`
    }

    protected resolveParams(options?: RequestOptions) {
        return options?.params
            ? `?${new URLSearchParams(options.params).toString()}`
            : ''
    }
}

export const httpService = HttpService.getInstance()
