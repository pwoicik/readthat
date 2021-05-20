async function scrollHandler() {
    if (isLoading) return;

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        const lastCommentID = getLastCommentID();
        const loadedCommentsCount = await loadComments(lastCommentID - 1);
        if (loadedCommentsCount < 10) {
            window.removeEventListener("scroll", scrollHandler, { passive: true });
        }
    }
}

window.addEventListener("scroll", scrollHandler, { passive: true });
