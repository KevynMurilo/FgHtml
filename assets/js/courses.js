document.addEventListener("DOMContentLoaded", function () {
  const courseListContainer = document.querySelector("#course-list");
  const categoryButtons = document.querySelectorAll("[data-category]");

  fetch("assets/mocks/courses.json")
    .then((response) => response.json())
    .then((courses) => {
      displayCourses(courses); 

      categoryButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const category = button.getAttribute("data-category");

          categoryButtons.forEach((btn) => btn.classList.remove("active"));
          button.classList.add("active");

          const filteredCourses =
            category === "all"
              ? courses
              : courses.filter((course) => course.category === category);
          displayCourses(filteredCourses);
        });
      });
    })
    .catch((error) => console.error("Erro ao carregar cursos:", error));

  function displayCourses(courses) {
    courseListContainer.innerHTML = courses
      .map((course) => createCourseHTML(course))
      .join("");
  }

  function createCourseHTML(course) {
    return `
      <div class="col-lg-4 col-md-6">
        <div class="course-item">
          <div class="course-thumb-wrap">
            <div class="course-thumb">
              <img src="${course.image}" alt="${course.title}">
            </div>
          </div>
          <div class="course-content">
            <span class="offer">${course.price}</span>
            <h3 class="title">
              <a href="${course.redirect_link}?id=${course.id}">${course.title}</a>
            </h3>
            <ul class="course-list">
              <li><i class="fa-light fa-file"></i>Aulas: ${course.lessons}</li>
              <li><i class="fa-light fa-user"></i>Alunos: ${course.students}</li>
              <li><i class="fa-light fa-eye"></i>Visualizações: ${course.views}</li>
            </ul>
            <div class="course-author-box">
              <div class="course-author">
                <div class="author-img">
                  <img src="${course.author_image}" alt="${course.author}">
                </div>
                <div class="author-info">
                  <h4 class="name">${course.author}</h4>
                  <span>Instrutor</span>
                </div>
              </div>
              <ul class="course-review">
                ${getStarsHTML(course.rating)}
                <li class="point">(${course.rating.toFixed(1)})</li>
              </ul>
            </div>
          </div>
          <div class="bottom-content">
            <span class="price">${course.price}</span>
            <a href="${course.redirect_link}?id=${course.id}" class="course-btn">Ver Detalhes</a>
          </div>
        </div>
      </div>
    `;
  }

  function getStarsHTML(rating) {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return (
      "★".repeat(fullStars) +
      "☆".repeat(emptyStars)
    )
      .split("")
      .map((star) => `<li>${star}</li>`)
      .join("");
  }
});
