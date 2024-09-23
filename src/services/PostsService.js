import { logger } from "@/utils/Logger"
import { api } from "./AxiosService"
import { Post } from "@/models/Post"
import { AppState } from "@/AppState"

class PostsService{
  async changeProfilePage(pageNum, profileId) {
    const res = await api.get(`/api/posts?creatorId=${profileId}&page=${pageNum}`)
    logger.log(res.data)
    this.handleResData(res.data)
  }
  // setPostToEdit(postProp) {
  //   throw new Error('Method not implemented.')
  // }
  // editPost(postData) {
  //   throw new Error('Method not implemented.')
  // }
  async deletePost(postId) {
    const res = await api.delete(`/api/posts/${postId}`)
    const postIndex = AppState.posts.findIndex(post => post.id == postId)
    AppState.posts.splice(postIndex, 1)
  }

  clearPosts() {
    AppState.posts = []
    AppState.currentPage = 0
    AppState.totalPages = 0
  }

  clearSearchQuery() {
    AppState.postQuery = ''
  }

  async searchPosts(postQuery) {
    const res = await api.get(`/api/posts?query=${postQuery}`)
    AppState.postQuery = postQuery
    this.handleResData(res.data)
  }

  async changeSearchPage(pageNum, postQuery) {
    const res = await api.get(`api/posts?page=${pageNum}&query=${postQuery}`)
    this.handleResData(res.data)
  }
    
  async changeHomePage(pageNum) {
    const res = await api.get(`api/posts?page=${pageNum}`)
    this.handleResData(res.data)
  }
    
  handleResData(resData) {
    const newPosts = resData.posts.map(post => new Post(post))
      AppState.posts = newPosts
      AppState.currentPage = resData.page
      AppState.totalPages = resData.totalPages
  }
    
  async createPost(postData) {
    const res = await api.post('api/posts', postData)
    const newPost = new Post(res.data)
    AppState.posts.push(newPost)
    this.handleResData(res.data)
  }
    
  async likePost(postId) {
    AppState.posts
    const res = await api.post(`api/posts/${postId}/like`, postId)
    logger.log(res.data)
    this.handleResData
  }

  async getPostsByCreatorId(profileId) {
    const res = await api.get(`api/profiles/${profileId}/posts`)
    this.handleResData(res.data)
  }

  async getAllPosts() {
    const res = await api.get('api/posts')
    logger.log(res.data)
    this.handleResData(res.data)
  }

}

export const postsService = new PostsService()