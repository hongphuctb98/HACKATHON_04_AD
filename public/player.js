const form = document.querySelector(".create-form");
const listGroup = document.querySelector(".list-group");

const baseUrl = "http://localhost:3000/api/v1/players";

fetch(baseUrl)
  .then((res) => res.json())
  .then((data) => {
    listGroup.innerHTML = "";
    data.players.forEach(
      (player) =>
        (listGroup.innerHTML += `<li class="list-group-item">${player.name}</li>`)
    );
  });
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let player = {
    name: form.name.value,
  };
  console.log(player);
  let res = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(player),
  });
  const data = await res.json();
  listGroup.innerHTML += `<li class="list-group-item">${data.player.name}</li>`;
  form.name.value = "";
  let players = await fetch(baseUrl)
    .then((res) => res.json())
    .then((data) => {
      return data.players;
    });
  if (players.length == 4) window.location.href = "http://localhost:3000/score";
});
