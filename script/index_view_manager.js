import { getPosts, postPost } from "./api.js";
import ScrollHandler from "./scroll_handler.js";
import { createPostEl } from "./html_create_el.js";
import InvalidMessageAlert from "./invalid_message_alert.js";

const formElemntsIDs = [
  "create-post-box",
  "create-post-headline",
  "create-post-content",
  "create-post-action-buttons",
  "create-post-submit-button",
  "create-post-cancel-button",
];

export default class IndexViewManager {
  isLoading = true;
  view_el = null;
  form = null;
  scrollHandler = null;
  lastPostID = null;
  alert_el = null;

  async setup() {
    this.isLoading = true;

    const posts = await getPosts();
    this.showPosts(posts);
    if (posts.length) {
      this.lastPostID = posts[posts.length - 1]["id"];
    }

    this.scrollHandler.register();

    this.isLoading = false;
  }

  async loadMorePosts() {
    this.isLoading = true;

    const start = this.lastPostID - 1;
    const posts = await getPosts(start);

    if (posts.length) {
      this.showPosts(posts);
      this.lastPostID = posts[posts.length - 1]["id"];
    }

    this.isLoading = false;
    return posts.length;
  }

  showPosts(posts) {
    for (const post of posts) {
      const post_el = createPostEl(
        post,
        ["bordered", "background-grey"],
        true,
        600
      );
      this.view_el.appendChild(post_el);
    }
  }

  expandForm() {
    this.form.headline.placeholder.innerText = "Headline (max 100 characters)";
    this.form.content_el.style.display = "block";
    this.form.buttons_el.style.display = "block";
  }

  collapseForm() {
    this.form.headline.placeholder.innerText = "Create post";
    this.form.content_el.style.display = "none";
    this.form.buttons_el.style.display = "none";
  }

  formSetup() {
    const f = document.getElementById("create-post-box");
    this.form = {
      form_el: f,
      headline_el: f.querySelector("#headline-input"),
      headline: {
        placeholder: f.querySelector("#headline-placeholder"),
        input: f.querySelector("#create-post-headline"),
      },
      content_el: f.querySelector("#content-input"),
      content: {
        placeholder: f.querySelector("#content-placeholder"),
        input: f.querySelector("#create-post-content"),
      },
      buttons_el: f.querySelector("#create-post-action-buttons"),
      buttons: {
        cancel: f.querySelector("#create-post-cancel-button"),
        submit: f.querySelector("#create-post-submit-button"),
      },
    };

    this.form.form_el.onsubmit = this.createPost.bind(this);

    this.form.headline.input.onclick = this.expandForm.bind(this);
    this.form.headline.input.oninput = () => {
      this.form.headline.placeholder.style.display =
        this.form.headline.input.innerText.length == 0 ? "inline" : "none";
    };

    this.form.content.input.oninput = () => {
      this.form.content.placeholder.style.display =
        this.form.content.input.innerText.length == 0 ? "inline" : "none";
    };

    this.form.buttons.cancel.onclick = () => {
      this.form.headline.input.innerText = "";
      this.form.content.input.innerText = "";
      this.form.headline.placeholder.style.display = "inline";
      this.form.content.placeholder.style.display = "inline";
      this.collapseForm();
    };

    document.onclick = ev => {
      if (
        !formElemntsIDs.includes(ev.target.id) &&
        !this.form.headline.input.innerText &&
        !this.form.content.input.innerText
      ) {
        this.collapseForm();
      }
    };
  }

  createPost(ev) {
    ev.preventDefault();

    const headline = this.form.headline.input.innerText.trim();
    const content = this.form.content.input.innerText.trim();

    if (!headline.length || !content.length || headline.length > 100) {
      this.alert_el.show();
      return;
    }

    postPost(headline, content).then(
      () => location.reload(),
      () => this.alert_el.show()
    );
  }

  constructor(view_el) {
    this.view_el = view_el;
    this.alert_el = new InvalidMessageAlert();

    this.formSetup();

    this.scrollHandler = new ScrollHandler(
      () => {
        return !this.isLoading;
      },
      async () => {
        const loadedPostsCount = await this.loadMorePosts();
        return loadedPostsCount < 10;
      }
    );
  }
}
