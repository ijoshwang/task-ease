export const AUTH_TOKEN = 'AUTH_TOKEN'

const baseURL = `${process.env.NEXT_PUBLIC_API_DOMAIN!}${process.env
  .NEXT_PUBLIC_API_ENDPOINT!}`

const ENDPOINT = {
  SIGNIN: '/Auth/login',
  TODOS: '/Todos',
  TODO: '/Todos/:todoId',
}

export interface UserCredentials {
  name: string // Ensure it matches backend field
  password: string
}

export interface Todo {
  id?: string
  name: string
  description: string
  dueDate: string
  status?: number
  userId?: string
  createTime?: string
}

export interface SignInResponse {
  token: string
  isSignedIn: boolean
}

async function sendRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  payload: object | null = null
): Promise<T> {
  const url = `${baseURL}${endpoint}`
  const token = globalThis.localStorage?.getItem(AUTH_TOKEN) || ''

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: payload ? JSON.stringify(payload) : null,
  }

  const response = await fetch(url, options)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Request failed')
  }

  return response.json()
}

export async function signIn(
  credentials: UserCredentials
): Promise<SignInResponse> {
  return sendRequest<SignInResponse>(ENDPOINT.SIGNIN, 'POST', credentials)
}

export async function getTodos(
  status?: string,
  sortBy?: string,
  sortOrder?: string
): Promise<Todo[]> {
  const params = new URLSearchParams()
  if (status) params.append('status', status)
  if (sortBy) params.append('sortBy', sortBy)
  if (sortOrder) params.append('sortOrder', sortOrder)

  const endpoint = `${ENDPOINT.TODOS}?${params.toString()}`

  return sendRequest<Todo[]>(endpoint)
}

export async function getTodoById(todoId: string): Promise<Todo> {
  const endpoint = ENDPOINT.TODO.replace(':todoId', todoId)

  return sendRequest<Todo>(endpoint)
}

export async function createTodo(todo: Todo): Promise<Todo> {
  return sendRequest<Todo>(ENDPOINT.TODOS, 'POST', todo)
}

export async function updateTodo(todoId: string, todo: Todo): Promise<void> {
  const endpoint = ENDPOINT.TODO.replace(':todoId', todoId)
  await sendRequest<void>(endpoint, 'PUT', todo)
}

export async function deleteTodo(todoId: string): Promise<void> {
  const endpoint = ENDPOINT.TODO.replace(':todoId', todoId)
  await sendRequest<void>(endpoint, 'DELETE')
}
