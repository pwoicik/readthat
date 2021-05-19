const query = new URLSearchParams(location.search);
const postID = query.get("id");

fetch(`../php/get_posts.php?id=${postID}`).then(data => data.json()).then(console.log);
