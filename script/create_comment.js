function createComment(ev) {
    ev.preventDefault();

    const form_el = ev.target;
    const comment = form_el.firstChild.lastChild.innerText.trim();
    if (!comment.length) {
        showInvalidMessageAlert();
        return;
    }

    const postData = new FormData();
    postData.append("post_id", getPostID());
    postData.append("content", comment);

    fetch("../php/create_comment.php", { method: "POST", body: postData }).then(() => location.reload());
}
