const menuBtn = document.querySelectorAll("header nav button");
const menu = document.querySelector("header nav ul");
const generateBtn = document.getElementById("generate-applicants");
const deleteSaved = document.querySelectorAll("#delete-saved");
const matchesNumber = document.getElementById("matches-number");
const funnyFact = document.querySelector(".funny-fact");

const dataset = document.getElementById("page").textContent;
let pageData;
try {
  pageData = JSON.parse(dataset);
} catch (error) {
  console.log(error);
}

console.log(pageData ?? "no data");

const generateFact = async (number) => {
  const res = await axios
    .get(`http://numbersapi.com/${number}`)
    .then((response) => {
      funnyFact.textContent = `(${response.data})`;
      funnyFact.classList.remove("empty");
    })
    .catch((error) => {
      console.log(error);
    });
};

if (funnyFact) {
  generateFact(matchesNumber.textContent);
}

generateBtn?.addEventListener("click", async (e) => {
  e.preventDefault();
  await Notification.requestPermission();
  new Notification("Added 5 new applicants");
  axios
    .post(`/api/generate-applicants/5`)
    .then((response) => {
      const currentNumber = matchesNumber.textContent;
      const newNumber = parseInt(currentNumber) + response.data.data.length;
      matchesNumber.textContent = newNumber;
      generateFact(newNumber);
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
        btn.closest(".cv").remove();
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
