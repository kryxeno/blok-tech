const menuBtn = document.querySelectorAll("header nav button");
const menu = document.querySelector("header nav ul");
const generateBtn = document.getElementById("generate-applicants");

const dataset = document.getElementById("page").textContent;
let pageData;
try {
  pageData = JSON.parse(dataset);
} catch (error) {
  console.log(error);
}

console.log(pageData ?? "no data");

generateBtn?.addEventListener("click", () => {
  console.log("clicked");
  axios
    .post(`/api/generate-applicants/5`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

menuBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    menu.classList.toggle("closed");
  });
});
