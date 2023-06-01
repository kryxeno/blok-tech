const ignoreBtns = document.querySelectorAll(".btn-ignore");
const saveBtns = document.querySelectorAll(".btn-save");
const cvList = document.querySelector(".cv-list");
const hiddenCvs = document.querySelectorAll(".cv:not(:first-of-type)");

cvList.classList.add("animated-scroll");

const onVisible = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("hidden");
      observer.unobserve(entry.target);
    }
  });
};

let options = {
  root: document.querySelector("body"),
  rootMargin: "0px",
  threshold: 0.3,
};
let observer = new IntersectionObserver(onVisible, options);

hiddenCvs.forEach((cv) => {
  cv.classList.add("hidden");
  observer.observe(cv);
});

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
