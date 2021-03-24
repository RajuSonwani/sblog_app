const LikeDislike = require("../models/thumbs");
const Users = require("../models/users");

module.exports = class LikeDislikeService {
  async createLike(like) {
    console.log(like)
    const user = await LikeDislike.query()
    // console.log(user);
    if (user == undefined) return await LikeDislike.query().insertGraph();
  }

  async createDislike(dislike) {
    const user = await LikeDislike.query().where("user_id","==",like.user_id).where("blog_id","==","like.blog_id");
    if (user == undefined) return await LikeDislike.query().insertGraph(like);

  }

  async findAllLikes(like) {
    // return await LikeDislike.query(like).where({like: "true"});
    const likes = await LikeDislike.query()
      .where("like", 1)
      // .withGraphFetched("users");
    // console.log(likes, likes[0].users.password, "service likes")
      return likes;
  }

  async findAllDislikes(dislike) {
    // return await LikeDislike.query(dislike).where({ dislike: "true" });
    const dislikes = await LikeDislike.query()
    .where("dislike", 1)
    // .withGraphFetched("users");
    return dislikes;
  }
};
