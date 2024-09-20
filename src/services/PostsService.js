import { logger } from "@/utils/Logger"
import { api } from "./AxiosService"
import { Post } from "@/models/Post"
import { AppState } from "@/AppState"

class PostsService{
  async likePost(postId) {
    const res = await api.post(`api/posts/${postId}/like`, postId)
    logger.log(res.data)
  }
  async getAllPosts() {
    const res = await api.get('api/posts')
    logger.log(res.data)
    const newPosts = res.data.posts.map(post => new Post(post))
    AppState.posts = newPosts
  }

}

export const postsService = new PostsService()