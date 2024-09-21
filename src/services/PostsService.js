import { logger } from "@/utils/Logger"
import { api } from "./AxiosService"
import { Post } from "@/models/Post"
import { AppState } from "@/AppState"

class PostsService{
  changeSearchPage(pageNum, postQuery) {
    throw new Error('Method not implemented.')
  }
  // setActiveProfile(postId) {
  //   AppState.activeProfile = profile
  // }

  async changePage(pageNum) {
    const res = await api.get(`api/posts?page=${pageNum}`)
    this.handleResData(res.data)
  }

  handleResData(resData) {
    const newPosts = resData.posts.map(post => new Post(post))
    AppState.posts = newPosts
    AppState.currentPage = resData.page
    AppState.totalPages = resData.totalPages
  }

  getProfilePosts() {
    throw new Error('Method not implemented.')
  }

  async createPost(postData) {
    const res = await api.post('api/posts', postData)
    const newPost = new Post(res.data)
    AppState.posts.push(newPost)
  }

  async likePost(postId) {
    const res = await api.post(`api/posts/${postId}/like`, postId)
    logger.log(res.data)
  }

  async getAllPosts() {
    const res = await api.get('api/posts')
    logger.log(res.data)
    this.handleResData(res.data)
  }

}

export const postsService = new PostsService()