import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios'

class ApiClient {
  private readonly client: AxiosInstance

  constructor(baseURL = '') {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  private mapError(error: unknown): Error {
    if (error instanceof AxiosError) {
      const apiMessage = error.response?.data?.error

      if (typeof apiMessage === 'string' && apiMessage.length > 0) {
        return new Error(apiMessage)
      }

      return new Error(error.message)
    }

    if (error instanceof Error) {
      return error
    }

    return new Error('Unexpected request error')
  }

  async get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.get<T>(path, config)
      return response.data
    } catch (error) {
      throw this.mapError(error)
    }
  }

  async post<T>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.post<T>(path, data, config)
      return response.data
    } catch (error) {
      throw this.mapError(error)
    }
  }
}

export const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_BASE_URL ?? '')