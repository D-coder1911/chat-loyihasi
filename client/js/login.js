import socket from "./main.js";

const elForm = document.querySelector(".login-form");
const elMessageForm = document.querySelector(".message-form");
const elMessagesList = document.querySelector(".messages");

let userName;

elForm.addEventListener("submit", (e) => {
  e.preventDefault();
  userName = e.target.name.value;
  localStorage.setItem("name", userName);
  socket.emit("login", userName);
});

elMessageForm.addEventListener("input", () => {
  socket.emit("typing", userName);
});

elMessageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = e.target.message.value;
  socket.emit("message", { userName, message });
  e.target.message.value = "";
});

socket.on("message", ({ userName, message }) => {
  const newMessage = document.createElement("li");
  newMessage.textContent = `${userName}: ${message}`;
  elMessagesList.appendChild(newMessage);
});

socket.on("typing", (userName) => {
  document.querySelector(".typing-indicator").textContent = `${userName} yozmoqda...`;
  setTimeout(() => (document.querySelector(".typing-indicator").textContent = ""), 3000);
});

socket.on("userJoined", (name) => {
  const newMessage = document.createElement("li");
  newMessage.textContent = `${name} chatga qo'shildi!`;
  elMessagesList.appendChild(newMessage);
});
