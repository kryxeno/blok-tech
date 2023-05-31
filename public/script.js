const menuBtn = document.querySelectorAll("header nav button");
const menu = document.querySelector("header nav ul");
const generateBtn = document.getElementById("generate-applicants");
const deleteSaved = document.querySelectorAll("#delete-saved");
const matchesNumber = document.getElementById("matches-number");

const dataset = document.getElementById("page").textContent;
let pageData;
try {
  pageData = JSON.parse(dataset);
} catch (error) {
  console.log(error);
}

console.log(pageData ?? "no data");

generateBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  axios
    .post(`/api/generate-applicants/5`)
    .then((response) => {
      const currentNumber = matchesNumber.textContent;
      const newNumber = parseInt(currentNumber) + response.data.data.length;
      matchesNumber.textContent = newNumber;
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

deleteSaved?.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const userId = btn.getAttribute("data-id");
    axios
      .post(`/api/delete-applicant/${userId}`)
      .then((response) => {
        document.querySelector(".cv").remove();
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
