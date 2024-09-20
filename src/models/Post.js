export class Post {
  constructor(data){
    this.id = data.id
    this.body = data.body
    this.createdAt = data.createdAt
    this.creator = data.creator
    this.creatorId = data.creatorId
    this.imgUrl = data.imgUrl
    this.likes = data.likes
    this.likeIds = data.likeIds
    this.updatedAt = data.updatedAt
  }

  get publishedOn() {
    const publishDate = new Date(this.createdAt).toLocaleDateString()
    const publishTime = new Date(this.createdAt).toLocaleTimeString()
    return publishDate + " " + publishTime
  }

  get lastUpdated() {
    const updateDate = new Date(this.updatedAt).toLocaleDateString()
    const updateTime = new Date(this.updatedAt).toLocaleTimeString()
    return updateDate + " " +  updateTime
  }
}