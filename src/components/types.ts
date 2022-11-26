export interface ArticleDuck {
  _id: string

  type: 'card' | 'normal' | 'about' // default normal
  labels: string[]

  title: string
  content: string // markdown text

  createAt: string
  updateAt: string

  comments: Array<{
    name: string
    url: string

    ip: string
    browser: string
    createAt: string
  }>
}