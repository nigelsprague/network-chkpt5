import { reactive } from 'vue'
import { Ad } from './models/Ad.js'
import { Post } from './models/Post.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  /** @type {Ad[]} */
  ads: [],
  /** @type {Post[]} */
  posts: []
})

