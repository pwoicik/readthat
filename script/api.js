export function getPost(id) {
  return fetch(`php/get_posts.php?id=${id}`).then(data => data.json());
}

export function getPosts(start) {
  if (typeof start !== "undefined") {
    return fetch(`php/get_posts.php?start=${start}`).then(data => data.json());
  }
  return fetch("php/get_posts.php").then(data => data.json());
}

export function getComments(postID, start) {
  if (typeof start !== "undefined") {
    return fetch(`php/get_comments.php?post_id=${postID}&start=${start}`).then(
      data => data.json()
    );
  }
  return fetch(`php/get_comments.php?post_id=${postID}`).then(data =>
    data.json()
  );
}

export function postComment(postID, content) {
  const postData = new FormData();
  postData.append("post_id", this.postID);
  postData.append("content", comment);

  return fetch("./php/create_comment.php", { method: "POST", body: postData });
}

export function postPost(headline, content) {
  const postData = new FormData();
  postData.append("headline", headline);
  postData.append("content", content);

  return fetch("./php/create_post.php", { method: "POST", body: postData });
}
