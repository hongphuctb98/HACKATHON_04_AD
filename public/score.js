const playerList = document.querySelector(".playerList");
const tbody = document.querySelector("tbody");
const addroundBtn = document.querySelector(".addroundBtn");
const listRound = document.querySelector(".listRound");
const scoreList = document.querySelectorAll(".score");

const baseUrl = "http://localhost:3000/api/v1/players";

fetch(baseUrl)
  .then((res) => res.json())
  .then((data) => {
    playerList.innerHTML = `<th scope="col">#</th>`;
    data.players.forEach(
      (player) =>
        (playerList.innerHTML += `<th scope="col">${player.name}</th>`)
    );
  })
  .catch((err) => console.log(err));

addroundBtn.addEventListener("click", () => {});

listRound.addEventListener("click", handleInputChange);

function handleInputChange(event) {
  const target = event.target;
  const listScores = [];
  if (target.type === "number") {
    let inputValue = target.value;
    scoreList[target.dataset.Id].innerHTML = +inputValue;
  }
  scoreList.forEach((score, i) => {
    listScores[i] = +score.innerHTML;
  });
  console.log(listScores);
}
