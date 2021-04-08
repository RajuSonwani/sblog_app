const Thumbs = require("../models/thumbs");
const Users = require("../models/users");

module.exports = class ThumbsService {
  async createLike(like) {
    const user = await Thumbs.query().where("user_id",like.user_id).where("blog_id",like.blog_id);
    if(user.length==0){
      return await Thumbs.query().insertGraph(like).where("user_id",like.user_id).where("blog_id",like.blog_id)
    }else{
      return await Thumbs.query()
      .patch({
        "like": 1
      }).where("user_id",like.user_id).where("blog_id",like.blog_id);

    }
  }

  async createDislike(dislike) {
    // console.log(dislike);
    const user = await Thumbs.query().where("user_id",dislike.user_id).where("blog_id",dislike.blog_id);
    // console.log(user);
    if(user.length==0){
      return await Thumbs.query().insertGraph(dislike).where("user_id",dislike.user_id).where("blog_id",dislike.blog_id)
    }else{
      return await Thumbs.query()
      .patch({
        "dislike": 0
      }).where("user_id",dislike.user_id).where("blog_id",dislike.blog_id);
    }
  }

  async findAllLikes(like) {
    const likes = await Thumbs.query().withGraphFetched('blogs').where("like", 1);
    return likes;
  }

  async findAllDislikes(dislike) {
    const dislikes = await Thumbs.query().where("dislike", 0).where("like",null)
    return dislikes;
  }
};
