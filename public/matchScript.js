const ignoreBtns = document.querySelectorAll(".btn-ignore");
const saveBtns = document.querySelectorAll(".btn-save");
const cvList = document.querySelector(".cv-list");

cvList.classList.add("animated-scroll");

const updateSeen = async (id) => {
  const res = await axios
    .post(`/api/update-seen/${id}`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const updateSaved = async (id) => {
  const res = await axios
    .post(`/api/update-saved/${id}`, {
      id: id,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const skipToNextApplication = (index) => {
  const translateAmount = (parseInt(index) + 1) * -90 + "dvh";
  cvList.style.transform = `translateY(${translateAmount})`;
};

ignoreBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const userId = btn.getAttribute("data-id");
    const userIndex = btn.getAttribute("data-index");
    skipToNextApplication(userIndex);
    updateSeen(userId);
  });
});

saveBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const userId = btn.getAttribute("data-id");
    const userIndex = btn.getAttribute("data-index");
    skipToNextApplication(userIndex);
    updateSaved(userId);
  });
});
