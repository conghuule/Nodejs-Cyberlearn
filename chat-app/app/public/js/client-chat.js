const socket = io();

document.getElementById("form-messages").addEventListener("submit", (e) => {
  e.preventDefault();
  const messageText = document.getElementById("input-messages").value;
  const acknowledgements = (err) => {
    if (err) {
      return alert("tin nhan khong hop le");
    }
    console.log("tin nhan thanh cong");
  };
  socket.emit(
    "send message from client to server",
    messageText,
    acknowledgements
  );
});

socket.on("send message from server to client", (messageText) => {
  console.log("messageText :", messageText);
});

document.getElementById("btn-share-location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Trinh duyet khong ho tro tim vi tri");
  }
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    const { latitude, longitude } = position.coords;
    socket.emit("share location from client to sever", {
      latitude,
      longitude,
    });
  });
});

socket.on("share location from server to client", (linklocation) => {
  console.log(linklocation);
});

const queryString = location.search;
const params = Qs.parse(queryString, {
  ignoreQueryPrefix: true,
});
const { username, room } = params;
socket.emit("send room from client to server", { username, room });
