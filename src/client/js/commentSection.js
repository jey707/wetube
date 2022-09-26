import { async } from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const deleteBtn = document.querySelectorAll(".comment__delete");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.id = id;
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.className = "comment__delete";
  span2.innerText = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
  span2.addEventListener("click", handleDeleteComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

const handleDeleteComment = async (event) => {
  const comment = event.target.parentNode;
  const commentId = comment.dataset.id;
  const videoId = videoContainer.dataset.id;
  const response = await fetch(`/api/comment/${commentId}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      videoId,
    }),
  });
  if (response.status === 403) {
    return alert("잘못된 접근입니다.");
  }
  if (response.status === 201) {
    deleteCommentEl(event);
  }
};
const deleteCommentEl = (event) => {
  const commentList = event.target.parentNode;
  commentList.remove();
};
for (let i = 0; i < deleteBtn.length; i++) {
  deleteBtn[i].addEventListener("click", handleDeleteComment);
}
