// const AUTH_TOKEN = 'AUTH_TOKEN'

// const baseURL = `${process.env.TASK_EASE_DOMAIN!}${process.env
//   .TASK_EASE_ENDPOINT!}`

// const ENDPOINT = {
//   SIGNIN: '/Auth/login',
//   TODOS: '/Todos',
//   TODO: '/Todos/:todoId',
// }

// async function sendRequest(
//   endpoint: string,
//   method = 'GET',
//   payload: object | null = null
// ) {
//   const url = `${baseURL}${endpoint}`
//   let token = globalThis.localStorage?.getItem(AUTH_TOKEN) || ''
//   // token =
//   //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3ZWJwaWxvdCIsInN1YiI6IjRjZjFlY2ZiLThiMDMtNDU5NC1iMWExLTQ2MzkzZGU0MzYxMSIsImF1ZCI6WyJjaHIiLCJ3ZWIiXSwiZXhwIjoxNjk1NzI2Nzg4LCJpYXQiOjE2OTMxMzQ3ODgsInN0ayI6IjE1OTZkNzhlLWMwMGYtNGZhYS05OGNjLTMwNTc3ZjViZWI4MyJ9.-CWhvM19s3u2G0bauJhtfL5AqSGYvxz0ZK3YXaHUeBk'

//   const options = {
//     method,
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//       // 'Auth-Token':
//       //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwbGF6YSIsInN1YiI6IjYwN2Q5YWZkLTk4N2EtNGM0Mi1iOTAxLWM0ZjUzMGE4MDllMSIsImV4cCI6MTY5MTU1OTk0MCwiaWF0IjoxNjkxNDczNTQwLCJhaWQiOiI2MDdkOWFmZC05ODdhLTRjNDItYjkwMS1jNGY1MzBhODA5ZTEiLCJlbWFpbCI6IjYwN2Q5YWZkLTk4N2EtNGM0Mi1iOTAxLWM0ZjUzMGE4MDllMSIsInR5cGUiOiJvcmciLCJzdGF0dXMiOiJhY3RpdmUifQ.eF2wOkytc6C9kA9zqwRJMRFncnydC3vvDTZoftdZkio',
//     },
//     body: payload ? JSON.stringify(payload) : null,
//     // cache: <RequestCache>'no-store',
//     next: { revalidate: 0 },
//   }

//   try {
//     const response = await fetch(url, options)

//     if (response.status === 403) {
//       const responseData = await response.json()
//       const { code, message } = responseData
//       let error = new Error('Unauthorized')
//       const { origin } = globalThis.location

//       if (code === 10005) {
//         error = new Error('PermissionDenied')
//       }

//       if (code === 10003 || code === 10004) {
//         localStorage.removeItem(AUTH_TOKEN)
//       }

//       globalThis.postMessage(error, origin)

//       return { error }
//     }

//     // todo: 服务端会返回不规则json,如： '{"code":10009,"message":"exceeded plan usage"}{"code":10006,"message":"request too large"}'
//     if (response.status === 400) {
//       const responseData = await response.json()

//       const { code, message } = responseData

//       if (code === 10006) {
//         let errMsg = 'The input is too long , please short down .'
//         document.dispatchEvent(
//           new CustomEvent('toastEvent', { detail: errMsg })
//         )
//         throw new Error(errMsg)
//       }

//       if (code === 10009) {
//         document.dispatchEvent(new CustomEvent('exceeded', { detail: 's' }))

//         return {}
//       }
//     }

//     const isStreaming = response.headers
//       .get('content-type')
//       ?.includes('event-stream')

//     if (isStreaming) {
//       const streamReader = response.body?.getReader()

//       // if (response.status === 400) {
//       //   const decoder = new TextDecoder()
//       //   const stream = await streamReader!.read()
//       //   const chunk = decoder.decode(stream.value, { stream: true })

//       //   // todo: 服务端会返回不规则json,如： '{"code":10009,"message":"exceeded plan usage"}{"code":10006,"message":"request too large"}'
//       //   if (!chunk.startsWith('event')) {
//       //     const jsonData = JSON.parse(chunk)

//       //     if (jsonData.code === 10006) {
//       //       let errMsg = 'The input is too long , please short down .'
//       //       document.dispatchEvent(
//       //         new CustomEvent('toastEvent', { detail: errMsg }),
//       //       )
//       //       throw new Error(errMsg)
//       //     }
//       //   }
//       // }
//       //       if (!response.ok) {
//       //         const decoder = new TextDecoder()
//       //         const result = await streamReader.read()
//       //         const { value } = result
//       //         const text = decoder.decode(value, { stream: true })

//       //         try {
//       //           response.data = JSON.parse(text)
//       //         } catch (e) {}

//       //         // eslint-disable-next-line prefer-promise-reject-errors
//       //         return Promise.reject({ response })
//       //       }

//       return streamReader
//     } else {
//       const responseData = await response.json()

//       if (!response.ok) {
//         const { code, message } = responseData
//         throw new Error(message || code || 'Request failed')
//       }

//       return {
//         // code: responseData.code,
//         ...responseData,
//         isSignedIn: true,
//       }
//     }
//   } catch (error) {
//     throw error
//   }
// }

// export async function getAdvised() {
//   const endpoint = ENDPOINT.ADVISED

//   try {
//     const response = await sendRequest(endpoint)
//     // if (response.isSignedIn === false) {
//     //   return response
//     // }
//     const { pages } = response

//     return { pages }
//   } catch (error) {
//     throw error
//   }
// }

// export async function getServerStatus() {
//   const endpoint = ENDPOINT.SERVER_STATUS

//   try {
//     const response = await sendRequest(endpoint)
//     // if (response.isSignedIn === false) {
//     //   return response
//     // }
//     const { status } = response

//     return status
//   } catch (error) {
//     throw new Error('Failed to getServerStatus')
//   }
// }

// export async function ask(payload: { question: string; pageId?: string }) {
//   const endpoint = ENDPOINT.ASK
//   const params: { user_input: string; page_id?: string } = {
//     user_input: payload.question,
//   }

//   if (payload.pageId) {
//     params.page_id = payload.pageId
//   }

//   try {
//     const streamReader = await sendRequest(endpoint, 'POST', params)

//     return streamReader

//     // if (response.isSignedIn === false) {
//     //   return response
//     // }
//     // const {
//     //   page_id: pageId,
//     //   card: { id, title, blocks },
//     // } = response

//     // return { pageId, id, title, blocks }
//   } catch (error) {
//     throw error
//   }
// }

// export async function getCard(
//   id: string,
//   isStream: boolean = true,
//   lastStreamMsgId = ''
// ) {
//   const streamId = lastStreamMsgId ? `&stream_msg_id=${lastStreamMsgId}` : ''
//   const endpoint = `${ENDPOINT.PAGE_CARD}/${id}?stream=${isStream}${streamId}`

//   try {
//     const response = await sendRequest(endpoint)

//     if (isStream) {
//       return response
//     }

//     const {
//       id,
//       user_input: title,
//       content,
//       related_questions: related,
//       creator,
//       page_id: pageId,
//       create_time: createTime,
//     } = response

//     return { id, title, content, related, creator, createTime, pageId }
//   } catch (error) {
//     throw error
//   }
// }

// export async function updateCard(params: {
//   id: string
//   userInput?: string
//   title?: string
//   status?: string
//   content?: string
//   user_input?: string
// }) {
//   const endpoint = `${ENDPOINT.PAGE_CARD}/${params.id}`

//   try {
//     if (params.userInput) {
//       params.user_input = params.userInput
//       delete params.userInput
//       const streamReader = await sendRequest(endpoint, 'PUT', params)

//       return streamReader
//     } else {
//       const response = await sendRequest(endpoint, 'PUT', params)

//       const { id, title, content } = response

//       return { id, title, content }
//     }
//   } catch (error) {
//     throw new Error('Failed to update card')
//   }
// }

// export async function regenerateCard(id: string, userInput: string) {
//   const endpoint = ENDPOINT.UPDATE_CARD_INPUT.replace(':cardId', id)

//   try {
//     const streamReader = await sendRequest(endpoint, 'PUT', {
//       user_input: userInput,
//     })

//     return streamReader
//   } catch (error) {
//     throw new Error('Failed to update card Input')
//   }
// }

// export async function cloneCard(id: string) {
//   const endpoint = ENDPOINT.CLONE_CARD

//   try {
//     const response = await sendRequest(endpoint, 'POST', { id })

//     const { id: pageId } = response

//     return { pageId }
//   } catch (error) {
//     throw new Error('Failed to clone card')
//   }
// }

// export async function aiWrite(params: { prompt: string; content: string }) {
//   const endpoint = ENDPOINT.AI_WRITE

//   try {
//     const streamReader = await sendRequest(endpoint, 'POST', {
//       ...params,
//       stream: true,
//     })

//     return streamReader
//   } catch (error) {
//     throw new Error('Failed to ai rewrite')
//   }
// }

// export async function getPages() {
//   const endpoint = ENDPOINT.GET_PAGES

//   try {
//     const response = await sendRequest(endpoint)
//     // if (response.isSignedIn === false) {
//     //   return response
//     // }
//     const { pages } = response

//     return { pages: pages || [] }
//   } catch (error) {
//     throw new Error('Failed to get pages')
//   }
// }

// export async function getPage(id: string) {
//   const endpoint = `${ENDPOINT.GET_PAGE}/${id}`

//   try {
//     const response = await sendRequest(endpoint)
//     const { card_list: cardList, cards, error } = response

//     if (error) {
//       return { cardList: [], cards, relatedQuestions: {} }
//     }

//     return { cardList, ...transformer.cards(cards) }
//   } catch (error) {
//     throw error
//   }
// }

// export async function getPageTitle(id: string) {
//   const endpoint = ENDPOINT.GET_PAGE_TITLE.replace(':pageId', id)

//   try {
//     const response = await sendRequest(endpoint)

//     const { status, title } = response

//     return { status, title }
//   } catch (error) {
//     throw new Error('Failed to get page title')
//   }
// }

// export async function updatePage(params: { id: string; title: string }) {
//   const endpoint = `${ENDPOINT.GET_PAGE}/${params.id}`

//   try {
//     const response = await sendRequest(endpoint, 'PUT', params)
//     // if (response.isSignedIn === false) {
//     //   return response
//     // }
//     const { ok } = response

//     return { ok }
//   } catch (error) {
//     throw new Error('Failed to get page')
//   }
// }

// export async function getRelated(cardId: string) {
//   const endpoint = ENDPOINT.RELATED.replace(':cardId', cardId)

//   try {
//     const response = await sendRequest(endpoint)

//     const { status, related_questions: related } = response

//     return { status, related }
//   } catch (error) {
//     throw new Error('Failed to get related')
//   }
// }

// export async function getUser() {
//   const endpoint = ENDPOINT.USER

//   try {
//     const response = await sendRequest(endpoint)

//     if (response.error) {
//       return response
//     }

//     const {
//       id,
//       name,
//       avatar,
//       api_usage: { current_amount: current, total_amount: total },
//       membership: { valid_util: endTime },
//     } = response
//     const remain = Math.max(total - current, 0)
//     // const user = {
//     //   id: 'user_id', // string
//     //   membership: {
//     //     status: 'xx', // enum: 试用 - "trial", 付费 - "premium"
//     //     valid_until: '', // membership 结束时间，如空则表示无结束时间
//     //   },
//     //   api_usage: {
//     //     total_amount: 100, // int
//     //     current_used: 10, // int
//     //   },
//     // }

//     return {
//       id,
//       name,
//       avatar,
//       usage: {
//         remain,
//         total,
//         endTime,
//       },
//     }
//   } catch (error) {
//     throw new Error('Failed to get user')
//   }
// }

// export async function handleCredentialResponse(response: any) {
//   // const baseURL = 'https://api.webpilotai.com/hyrule/v1'
//   const endpoint = ENDPOINT.SIGNIN
//   const { clientId, credential } = response
//   const google = {
//     client_id: clientId,
//     credential: credential,
//   }
//   const payload = {
//     method: 'google',
//     google,
//   }

//   try {
//     const response = await sendRequest(endpoint, 'POST', payload)

//     const { id, name, avatar, email, token } = response

//     localStorage.setItem(AUTH_TOKEN, token)

//     return { id, name, avatar, email, token }
//   } catch (error) {
//     // Handle network errors
//     throw error
//   }
// }

// // export async function testOpenAI() {
// //   const abortController = new AbortController()

// //   const model = {
// //     model: 'gpt-3.5-turbo-16k',
// //     temperature: 1,
// //     top_p: 0.9,
// //     frequency_penalty: 0,
// //     presence_penalty: 0,
// //     stop: '<|endoftext|>',
// //     stream: true,
// //     messages: [
// //       {
// //         role: 'assistant',
// //         content: `For your next input, I will do without any explanation: summarize`,
// //       },
// //       {
// //         role: 'user',
// //         content: `From the beginning… Edit on GitHub
// //         I’ve done a lot of things with computers, but I’ve always had a gap in my knowledge: what exactly happens when you run a program on your computer? I thought about this gap — I had most of the requisite low-level knowledge, but I was struggling to piece everything together. Are programs really executing directly on the CPU, or is something else going on? I’ve used syscalls, but how do they work? What are they, really? How do multiple programs run at the same time?

// //         A scrawled digital drawing. Someone with long hair is confused as they peer down at a computer ingesting binary. Suddenly, they have an idea! They start researching on a desktop computer with bad posture.
// //         I cracked and started figuring as much out as possible. There aren’t many comprehensive systems resources if you aren’t going to college, so I had to sift through tons of different sources of varying quality and sometimes conflicting information. A couple weeks of research and almost 40 pages of notes later, I think I have a much better idea of how computers work from startup to program execution. I would’ve killed for one solid article explaining what I learned, so I’m writing the article that I wished I had.

// //         And you know what they say… you only truly understand something if you can explain it to someone else.`,
// //       },
// //     ],
// //   }

// //   const url = `https://ai.api.moblin.net/api/openai/v1/chat/completions`

// //   const key = 'D9HURth82X6vxafT7DwyZdYrGLHDhq6Vzi2toHt4vR7VLwFbgcEyZVWBBmGeBmTm'

// //   return fetch(url, {
// //     method: 'POST',
// //     headers: {
// //       'Content-Type': 'application/json',
// //       Authorization: `Bearer ${key}`,
// //     },
// //     body: JSON.stringify(model),
// //     signal: abortController.signal,
// //   })
// //     .then(async (response) => {
// //       const streamReader = response.body.getReader()

// //       if (!response.ok) {
// //         const decoder = new TextDecoder()
// //         const result = await streamReader.read()
// //         const { value } = result
// //         const text = decoder.decode(value, { stream: true })

// //         try {
// //           response.data = JSON.parse(text)
// //         } catch (e) {}

// //         // eslint-disable-next-line prefer-promise-reject-errors
// //         return Promise.reject({ response })
// //       }

// //       return streamReader

// //       // const result = await response.json()
// //     })
// //     .then((streamReader) => {
// //       parseStream(streamReader, (reqResult) => {
// //         const result = reqResult.text
// //         const done = reqResult.done

// //         if (done) {
// //           const generating = false
// //         }
// //       })
// //     })
// //     .catch((err) => {
// //       if (err instanceof DOMException && /aborted/.test(err.message)) return

// //       if (err.response && err.response.status === 401) {
// //         const message = err.response?.data?.error?.message

// //         throw err
// //       } else {
// //         let errorMsg = err.message || ''

// //         if (err?.response?.data?.error?.message) {
// //           // eslint-disable-next-line
// //           errorMsg = `OpenAI: ${err.response.data.error.message}`
// //         }
// //       }

// //       throw err
// //     })
// // }

// // async function parseStream(streamReader, onUpdate) {
// //   const decoder = new TextDecoder()
// //   let text = ''

// // data sample
// // b'event:open'
// // b'data:69472535-17d9-4385-92d3-47553dd3097e'
// // b''
// // b'event:message'
// // b'data:{"page_id":"3561ad24-3b61-4b3b-951a-581bee9e0aa4","card":{"id":"69472535-17d9-4385-92d3-47553dd3097e","title":"","status":"normal","streaming":true,"user_input":"What is python? answer in one sentence","create_time":"2023-08-27T21:51:31.941384199+08:00","update_time":"2023-08-27T21:51:31.941384489+08:00","content":""}}'
// // b''
// // b'event:message'
// // b'data:{"id":"1693144292886-0","content":"Python"}'
// // b''
// // b'event:message'
// // b'data:{"id":"1693144292906-0","content":" is"}'
// // b''
// // b'event:close'
// // b'data:69472535-17d9-4385-92d3-47553dd3097e'
// // b''

// //   while (true) {
// //     let done = false
// //     let value: BufferSource

// //     try {
// //       const stream = await streamReader.read()
// //       done = stream.done
// //       value = stream.value
// //     } catch (e) {
// //       return onUpdate({ done, text })
// //     }

// //     if (done) {
// //       return onUpdate({ done, text })
// //     }

// //     const chunk = decoder.decode(value, { stream: true })
// //     const dataStrList = chunk.split('event:message\n')

// //     dataStrList.forEach((dataStr) => {
// //       if (
// //         dataStr.startsWith('event:open') ||
// //         dataStr.startsWith('event:close')
// //       ) {
// //         return
// //       }

// //       const dataJson = dataStr.replace(/^data:/, '').trim()

// //       try {
// //         const data = JSON.parse(dataJson)
// //         const content = data.content

// //         if (!content) {
// //           return
// //         }

// //         text += content

// //         onUpdate({ done, text })
// //       } catch (e) {}
// //     })
// //   }
// // }
