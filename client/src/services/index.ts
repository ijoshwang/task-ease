import dayjs from 'dayjs'

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
): Promise<T | null> {
  // Allow the return type to be null
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
  console.log('🚀 ~ response:', response)

  if (response.status === 401) {
    // Use postMessage to notify components of unauthorized status
    globalThis.postMessage({ type: 'UNAUTHORIZED' }, '*')

    return Promise.reject(new Error('Unauthorized'))
  }

  if (response.status === 204) {
    return null // Explicitly return null for No Content responses
  }

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Request failed')
  }

  return response.json() // Parse JSON only if the response is OK and not a 204
}

export async function signIn(
  credentials: UserCredentials
): Promise<SignInResponse> {
  const response = await sendRequest<SignInResponse>(
    ENDPOINT.SIGNIN,
    'POST',
    credentials
  )

  if (!response) {
    throw new Error('Sign-in failed')
  }

  return response
}

export function signOut() {
  globalThis.localStorage.removeItem(AUTH_TOKEN) // Removes the token from localStorage
  // Additional cleanup can be performed here if necessary
}

export async function getTodos(
  filterStatus?: string,
  sortBy?: string,
  sortOrder?: string
): Promise<Todo[]> {
  const query = new URLSearchParams()
  if (filterStatus) query.append('status', filterStatus)
  if (sortBy) query.append('sortBy', sortBy)
  if (sortOrder) query.append('sortOrder', sortOrder)

  const todos = await sendRequest<Todo[]>(
    `${ENDPOINT.TODOS}?${query.toString()}`
  )

  return todos || [] // Return an empty array if the response is null
}

export async function getTodoById(todoId: string): Promise<Todo | null> {
  // Allow null as a return type
  const endpoint = ENDPOINT.TODO.replace(':todoId', todoId)

  return await sendRequest<Todo>(endpoint)
}

export async function createTodo(todo: Todo): Promise<Todo | null> {
  todo.dueDate = dayjs(todo.dueDate).format()

  return await sendRequest<Todo>(ENDPOINT.TODOS, 'POST', todo)
}

export async function updateTodo(todoId: string, todo: Todo): Promise<void> {
  const endpoint = ENDPOINT.TODO.replace(':todoId', todoId)
  todo.dueDate = dayjs(todo.dueDate).format()
  await sendRequest<void>(endpoint, 'PUT', todo)
}

export async function deleteTodo(todoId: string): Promise<void> {
  const endpoint = ENDPOINT.TODO.replace(':todoId', todoId)
  await sendRequest<void>(endpoint, 'DELETE')
}
