const acceptBtn = document.querySelector(".btn-accept");
const ignoreBtn = document.querySelector(".btn-ignore");
const dataset = document.getElementById("page").textContent;
const user = JSON.parse(dataset);
let apiUser;
console.log(user);

axios
  .get(`/api/user/1`)
  .then((response) => {
    apiUser = response.data;
  })
  .catch((error) => {
    console.log(error);
  });

acceptBtn.addEventListener("click", () => {
  console.log("yay");
  if (user.user_id === "3") return;
  const newId = parseInt(user.user_id) + 1;
  location.href = `/${newId}`;
});

ignoreBtn.addEventListener("click", () => {
  console.log("nooooo");
  if (user.user_id === "1") return;
  const newId = parseInt(user.user_id) - 1;
  location.href = `/${newId}`;
});
