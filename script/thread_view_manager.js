import { getPost, getComments, postComment } from "./api.js";
import ScrollHandler from "./scroll_handler.js";
import { createCommentEl, createThreadEl } from "./html_create_el.js";
import InvalidMessageAlert from "./invalid_message_alert.js";

export default class ThreadViewManager {
  isLoading = true;
  view_el = null;
  commentsSection_el = null;
  scrollHandler = null;
  postID = null;
  lastCommentID = null;
  alert_el = null;

  static getPostID() {
    const query = new URLSearchParams(location.search);
    return query.get("id");
  }

  async setup() {
    this.isLoading = true;

    const post = await this.fetchPost();
    this.showThread(post);
    this.commentsSection_el = this.view_el.querySelector("#comments-section");
    if (post.comments.length) {
      this.lastCommentID = post.comments[post.comments.length - 1]["id"];
    }

    this.scrollHandler.register();

    this.isLoading = false;
  }

  async loadMoreComments() {
    this.isLoading = true;

    const start = this.lastCommentID - 1;
    const comments = await getComments(this.postID, start);

    if (comments.length) {
      this.showComments(comments);
      this.lastCommentID = comments[comments.length - 1]["id"];
    }

    this.isLoading = false;
    return comments.length;
  }

  async fetchPost() {
    const post = await getPost(this.postID);
    const comments = await getComments(this.postID);
    return { post, comments };
  }

  showThread({ post, comments }) {
    const thread_el = createThreadEl(
      post,
      comments,
      this.createComment.bind(this)
    );
    this.view_el.appendChild(thread_el);
  }

  showComments(comments) {
    for (const comment of comments) {
      const comment_el = createCommentEl(comment);
      this.commentsSection_el.appendChild(comment_el);
    }
  }

  createComment(ev) {
    ev.preventDefault();

    const form_el = ev.target;
    const comment = form_el.firstChild.lastChild.innerText.trim();
    if (!comment.length) {
      this.alert_el.show();
      return;
    }

    postComment(this.postID, comment).then(() => location.reload());
  }

  constructor(view_el) {
    this.postID = ThreadViewManager.getPostID();
    this.view_el = view_el;
    this.alert_el = new InvalidMessageAlert();

    this.scrollHandler = new ScrollHandler(
      () => {
        return !this.isLoading;
      },
      async () => {
        const loadedCommentsCount = await this.loadMoreComments();
        return loadedCommentsCount < 15;
      }
    );
  }
}
