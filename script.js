const userInput = document.querySelector("#userInput");
const searchBtn = document.querySelector("#searchBtn");
const logo = document.querySelector("#logo");
const name = document.querySelector("#name");
const userName = document.querySelector("#userName");
const userInfo = document.querySelector("#userInfo");
const followers = document.querySelector("#followers");
const following = document.querySelector("#following");
const repo = document.querySelector("#repo");
const joined = document.querySelector("#joined");
const followBox = document.querySelector(".follow-box");
const repoJoinBox = document.querySelector(".repo-join-box");
const viewProfileBtn = document.querySelector("#viewProfileBtn");
const viewProfile = document.querySelector("#viewProfile");
const errorMessage = document.querySelector("#errorMessage");

logo.style.display = "none";
followBox.style.display = "none";
repoJoinBox.style.display = "none";
viewProfileBtn.style.display = "none";

searchBtn.addEventListener("click", () => {
  if (userInput.value.trim() === "") {
    alert("Enter your username.");
    return;
  }
  const inputValue = userInput.value.trim();

  const url = `https://api.github.com/users/${inputValue}`;

  searchBtn.textContent = "Loading...";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Profile not found!");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      logo.style.display = "block";
      followBox.style.display = "flex";
      repoJoinBox.style.display = "flex";
      viewProfileBtn.style.display = "block";
      logo.src = data.avatar_url;
      name.textContent = data.name;
      userName.textContent = data.login;
      userInfo.textContent = data.bio;
      followers.textContent = data.followers;
      following.textContent = data.following;
      repo.textContent = data.public_repos;
      joined.textContent = data.created_at;
      viewProfile.href = data.html_url;
    })
    .catch((error) => {
      errorMessage.textContent = error.message;
      name.textContent = "";
      userName.textContent = "";
      userInfo.textContent = "";
      logo.style.display = "none";
      followBox.style.display = "none";
      repoJoinBox.style.display = "none";
      viewProfileBtn.style.display = "none";
    })
    .finally(() => {
      searchBtn.textContent = "Search";
    });

  userInput.value = "";
  errorMessage.textContent = "";
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});
