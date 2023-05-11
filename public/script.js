const acceptBtn = document.querySelector(".btn-accept");
const ignoreBtn = document.querySelector(".btn-ignore");

var user;

axios
  .get(`/api/user/1`)
  .then((response) => {
    user = response.data;
    console.log(user);
  })
  .catch((error) => {
    console.log(error);
  });

acceptBtn.addEventListener("click", () => {
  console.log("yay");
  const newId = user.id < 3 ? user.id + 1 : null;
  location.href = `/${newId}`;
});

ignoreBtn.addEventListener("click", () => {
  console.log("nooooo");
  const newId = user.id < 3 ? user.id + 1 : null;
  location.href = `/${newId}`;
});
