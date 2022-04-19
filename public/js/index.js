// Variables
const loginForm = $("#login-form");
const signupForm = $("#signup-form");
const profileCard = $("#profile-card");
const searchStartBtn = $("#search-start-btn");
const restartContainer = $("#restart-container");
const updateModalContainer = $(".updateModal-container");
const logout = $("#logout");
const deleteUserMatchBtn = $("#delete-user-match");
const updateBtn = $('button[name="updateBtn"]');
var currentData = {};
const backBtn = $("#back-to-profile");

// SIGN UP
// Errors - Create the conditions for information entered
const getSignUpErrors = ({
  name,
  email,
  password,
  confirmPassword,
  location,
  age,
  build,
  height,
  seriousness,
  gender,
  sexuality,
  about,
  interests,
  img,
}) => {
  const errors = {};

  // Validity checkers for each field
  // Email address
  if (!email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errors.email = "Invalid email address";
  }

  // Password
  if (
    !password ||
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      password
    )
  ) {
    errors.password = "password invalid";
  }

  // Passwords need to match
  if (!confirmPassword || password !== confirmPassword) {
    errors.confirmPassword = "Password does not match original";
  }

  // Location
  if (!location) {
    errors.location = "Location name needed";
  }

  // name
  if (!name) {
    errors.name = "Username needed";
  }

  // Height
  if (!height || +height <= 1) {
    errors.height = "Height needed";
  }

  // Build
  if (!build) {
    errors.build = "Build needed";
  }

  // Age
  if (!age || +age <= 17) {
    errors.age = "Age is required and cannot be under 18";
  }

  // Seriousness
  if (!seriousness) {
    errors.seriousness = "Seriousness needed";
  }

  // Gender
  if (!gender) {
    errors.gender = "Gender needed";
  }

  // Sexuality
  if (!sexuality) {
    errors.sexuality = "sexual preference needed";
  }

  // About
  if (!about) {
    errors.about = "Description needed";
  }

  // Interests
  if (!interests) {
    errors.interests = "Enter your interests";
  }

  // Image
  if (!img) {
    errors.img = "Image needed";
  }

  return errors;
};

// Display the error messages for each field on the page
const showErrorMessages = (errors) => {
  const fields = [
    "name",
    "email",
    "password",
    "confirmPassword",
    "location",
    "age",
    "build",
    "height",
    "seriousness",
    "gender",
    "sexuality",
    "about",
    "interests",
    "img",
  ];

  fields.forEach((field) => {
    const errorDiv = $(`#${field}-error`);

    if (errors[field]) {
      errorDiv.text(errors[field]);
    } else {
      errorDiv.text("");
    }
  });
};

// LOGIN
// When the user logs in, check for a valid email and password
const loginHandler = async (event) => {
  event.preventDefault();

  const email = $("#email-input").val();
  const password = $("#password-input").val();

  $("#login-error").text("");

  if (!email || !password) {
    $("#login-error").text("Please enter email and password");
  } else {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    // If successful, then redirect the user to their profile
    if (data.success) {
      window.location.assign("/profile");
    } else {
      $("#login-error").text("Invalid username or password");
    }
  }
};

// SIGNUP
const signupHandler = async (event) => {
  event.preventDefault();

  const name = $("#name-input").val().trim();
  const email = $("#email-input").val().trim();
  const password = $("#password-input").val();
  const confirmPassword = $("#confirmPassword-input").val();
  const age = $("#age-input").val();
  const location = $("#location-input").val().trim();
  const build = $("#build-input").find(":selected").val();
  const height = $("#height-input").val();
  const seriousness = $("#seriousness-input").find(":selected").val();
  const gender = $("#gender-input").find(":selected").text();
  const sexuality = $("#sexuality-input").find(":selected").text();
  const about = $("#about-input").val();
  const interests = $("#interests-input").val();
  const img = $("#img-input").val();

  const errorMessages = getSignUpErrors({
    name,
    email,
    password,
    confirmPassword,
    location,
    age,
    build,
    height,
    seriousness,
    gender,
    sexuality,
    about,
    interests,
    img,
  });

  showErrorMessages(errorMessages);

  if (!Object.keys(errorMessages).length) {
    const response = await fetch("/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        location,
        age,
        build,
        height,
        seriousness,
        gender,
        sexuality,
        about,
        interests,
        img,
      }),
    });

    const data = await response.json();

    if (data.success) {
      window.location.replace("/login");
    }
  }
};

// YES
// If user clicks yes, add to matches
const yesHandler = async (event) => {
  const target = $(event.target);
  const selectedUserId = target.attr("data-id");

  const response = await fetch("/api/match", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ selectedUserId }),
  });

  const { data } = await response.json();

  if (data.status === "MATCHED") {
    renderModal();
  }

  $("#profile-card").remove();
  startSearch();
};

// UPDATE
const updateUser = async (event) => {
  event.preventDefault();

  const updatedUser = {
    name: $("#name-input").val(),
    location: $("#location-input").val(),
    age: $("#age-input").val(),
    build: $("#build-input").find(":selected").val(),
    height: $("#height-input").val(),
    gender: $("#gender-input").find(":selected").val(),
    sexuality: $("#sexuality-input").find(":selected").val(),
    // seriousness: $("#seriousness-input").find(":selected").val(),
    about: $("#about-input").val(),
    interests: $("#interests-input").val(),
    img: $("#img-input").val(),
  };

  console.log(updatedUser);
  const id = $("#update-form").attr("data-userId");
  const response = await fetch(`/api/profile/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });

  const { success } = await response.json();

  if (success) {
    window.location.reload();
  }
};

// UPDATE profile handler
const renderUpdateModal = async (event) => {
  const userId = $(event.target).attr("id");
  const response = await fetch(`/api/profile/${userId}`);

  const { user } = await response.json();
  if (user) {
    const modal = `<div class="container">
    <div class="modal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body text-center">
            <h1 class="text-center">Update Information</h1>
            <hr />
            <form id="update-form" data-userId=${user.id} class="p-4">
              <div class="row">
                <div class="mb-3 col-md-6 col-12">
                  <label for="name-input" class="form-label">Name</label>
                  <input type="text" class="form-control" value="${
                    user.name
                  }" id="name-input" />
                  <div class="form-text error" id="name-error"></div>
                </div>
                <div class="mb-3 col-md-6 col-12">
                  <label for="img-input" class="form-label">Image</label>
                  <input type="text" class="form-control" value=${
                    user.img
                  } id="img-input" />
                  <div class="form-text error" id="img-error"></div>
                </div>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6 col-12">
                  <label for="age-input" class="form-label">Age</label>
                  <input type="number" class="form-control" value="${
                    user.age
                  }" id="age-input" />
                  <div class="form-text error" id="age-error"></div>
                </div>
                <div class="mb-3 col-md-6 col-12">
                  <label for="location-input" class="form-label">Location</label>
                  <input type="text" value="${
                    user.location
                  }" class="form-control" id="location-input" />
                  <div class="form-text error" id="location-error"></div>
                </div>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6 col-12">
                  <label class="form-label" for="build-input">Build</label>
                  <select class="form-select" id="build-input">
                    <option disabled> Build </option>
                    <option value="Slim" ${
                      user.build == "Slim" ? "selected" : ""
                    }>Slim</option>
                    <option value="Athletic" ${
                      user.build == "Athletic" ? "selected" : ""
                    }>Athletic</option>
                    <option value="Medium" ${
                      user.build == "Medium" ? "selected" : ""
                    }>Medium</option>
                    <option value="Curvy" ${
                      user.build == "Curvy" ? "selected" : ""
                    }>Curvy</option>
                    <option value="Large" ${
                      user.build == "Large" ? "selected" : ""
                    }>Large</option>
                  </select>
                  <div class="form-text error" id="build-error"></div>
                </div>
                <div class="mb-3 col-md-6 col-12">
                  <label for="height-input" class="form-label">Height (M)</label>
                  <input type="number" step="0.01" value=${
                    user.height
                  } min="0" class="form-control" id="height-input" />
                  <div class="form-text error" id="height-error"></div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 col-12">
                  <label class="visually-hidden" for="autoSizingSelect">Gender</label>
                  <select class="form-select" id="gender-input">
                    <option disabled>Gender</option>
                    <option value="Male" ${
                      user.gender == "Male" ? "selected" : ""
                    }>Male</option>
                    <option value="Female" ${
                      user.gender == "Female" ? "selected" : ""
                    }>Female</option>
                    <option value="Other" ${
                      user.gender == "Other" ? "selected" : ""
                    }>Other</option>
                  </select>
                  <div class="form-text error" id="gender-error"></div>
                </div>
                <div class="col-md-4 col-12">
                  <label class="visually-hidden" for="autoSizingSelect">Sexuality</label>
                  <select class="form-select" id="sexuality-input">
                    <option disabled>Sexuality</option>
                    <option value="Straight" ${
                      user.sexuality == "Straight" ? "selected" : ""
                    }>Straight</option>
                    <option value="Bisexual" ${
                      user.sexuality == "Bisexual" ? "selected" : ""
                    }>Bisexual</option>
                    <option value="Gay" ${
                      user.sexuality == "Gay" ? "selected" : ""
                    }>Gay</option>
                    <option value="Other" ${
                      user.sexuality == "Other" ? "selected" : ""
                    }>Other</option>
                  </select>
                  <div class="form-text error" id="sexuality-error"></div>
                </div>
                <div class="col-md-4 col-12">
                  <label class="visually-hidden" for="autoSizingSelect">Seriousness</label>
                  <select class="form-select" id="seriousness-input">
                    <option disabled>Seriousness</option>
                    <option value="Relationship" ${
                      user.seriousness == "Relationship" ? "selected" : ""
                    }>Relationship</option>
                    <option value="Casual" ${
                      user.seriousness == "Casual" ? "selected" : ""
                    }>Casual
                    </option>
                    <option value="Friendship" ${
                      user.seriousness == "Friendship" ? "selected" : ""
                    }>Friendship</option>
                  </select>
                  <div class="form-text error" id="seriousness-error"></div>
                </div>
              </div>
              <div class="row">
                <div class="mb-3">
                  <label for="about-input" class="form-label mt-4">About Me </label>
                  <textarea cols="30" rows="10" type="text" class="form-control"
                    id="about-input">${user.about}</textarea>
                  <div class="form-text error" id="about-error"></div>
                </div>
                <div class="row">
                <div class="mb-3">
                  <label for="interests-input" class="form-label mt-4"> Interests </label>
                  <textarea cols="30" rows="10" type="text" class="form-control"
                    id="interests-input">${user.about}</textarea>
                  <div class="form-text error" id="interests-error"></div>
                </div>
              </div>
              <button type="submit" class="btn btn-styling" data-bs-dismiss="modal" id="update-btn">
                Update Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>`;
    updateModalContainer.append(modal);
    $(".modal").modal("show");
  }

  $("#update-form").on("submit", updateUser);
};

// If the user receives a match
const renderModal = () => {
  const loadModal = `<div class="modal fade is-active" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-body text-center">
        It's a MATCH!
      </div>
      <div class="d-flex justify-content-center">
        <button type="button" class="btn btn-styling mb-2" data-bs-dismiss="modal">Keep Browsing?</button>
      </div>
    </div>
  </div>
</div>`;
  $("#modal-container").append(loadModal);
  $(".modal").modal("show");
};

const noHandler = (event) => {
  const target = $(event.target);
  const id = target.data("id");
  $("#profile-card").remove();
  startSearch();
};

// Begin the search by taking the fetching the user profiles
const startSearch = async () => {
  const userIdsToSkip = JSON.parse(localStorage.getItem("userIdsToSkip")) || [];
  const response = await fetch("/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userIdsToSkip }),
  });

  const { data } = await response.json();

  if (data) {
    currentData = data;
    const profileCard = `<div class="quote-summary">
      <h3 class="pink-text"> Find a match </h3>
     </div><div class="profile-card card mx-auto m-5"style="width: 18rem;" id="profile-card">
        <div class="card-summary">
          <h5 class="profile-name">${data.name}, <b>${data.age}</b></h5>
          <h6 class="profile-location"><small>${data.location}</small></h6>
        </div>

          <img class="card-img-top" src="${data.img}" alt="Card image cap" onclick="renderFullProfile()"/>

        <div class="card-body">
          <div class="row">
            <div class="col-6"><b>Height:</b></div>
            <div class="col-6">${data.height} m</div>
            <div class="w-100"></div>
            <div class="col-6"><b>Build:</b></div>
            <div class="col-6">${data.build}</div>
            <div class="w-100"></div>
            <div class="col-6"><b>Intention:</b></div>
            <div class="col-6">${data.seriousness}</div>
          </div>
          <hr>
           <div class="profile-bio mt-2">  About me: ${data.about}</div>
           <div class="profile-bio mt-2"> My interests: ${data.interests}</div>
          <hr>
          <div class="profile-links">
            <button type="button" id="no" data-id=${data.id} class="btn btn-style text-danger" ><i class="fas fa-times"></i></button>
            <button type="button" id="yes" data-id=${data.id} class="btn btn-style text-success"><i data-id=${data.id} class="fas fa-check"></i></button>
          </div>
        </div>
      </div>`;

    $("#search-container").empty();

    $("#search-container").append(profileCard);

    $("#no").on("click", noHandler);
    $("#yes").on("click", yesHandler);

    userIdsToSkip.push(data.id);
    localStorage.setItem("userIdsToSkip", JSON.stringify(userIdsToSkip));
  } else {
    $("#search-container").empty();

    // When the profiles are all seen, display a message prompting the user to try again
    const renderCard = `<div class="jumbotron-styling m-3" id="start-search">
          <h1 class="display-4 pink-text">Hello again!</h1>
          <p class="lead"> You've reached the end!
          </p>
          <hr class="my-4" />
          <h5> Oh no! You've seen them all! </h5>
          <button class="btn btn-styling mt-2" id="search-start-btn">  Try Again?
          </button>`;

    $("#search-container").append(renderCard);

    const clearLocalStorage = () => {
      localStorage.clear();
      startSearch();
    };

    $("#search-start-btn").on("click", clearLocalStorage);
  }
};

function renderFullProfile(data) {
  console.log(currentData);
  $("#search-container").empty();
  const profileCard = `<main class="container mt-4">
  <section class="jumbotron-styling">
    <div class="row">
      <div class="col-sm">
        <div class="p-2">
          <img src="${currentData.img}" alt="" class="profile-img" />
        </div>
        <div class="p-2 text-center">
          <h2>${currentData.name}, ${currentData.age}</h2>
          <h3 class="fs-5">${currentData.location}</h3>
          <div><h4 class="fs-5"> Intention: ${currentData.seriousness}</h4></div>
        </div>
      </div>
      <div class="col-sm pt-4 px-4">
        <div class="p-2">
          <h3 class="pb-4">My Details</h3>
          <p><strong>Height: </strong>${currentData.height} m</p>
          <p><strong>Body Shape: </strong>${currentData.build}</p>
          <p><strong>Gender: </strong>${currentData.gender}</p>
          <p><strong>Sexuality: </strong>${currentData.sexuality}</p>
        </div>
        <div class="p-2">
          <h3 class="mt-4 pb-4">About Me</h3>
          <p>${currentData.about}</p>
           <h3 class="mt-4 pb-4">My Interests</h3>
           <p>${currentData.interests}</p>
        </div>
      </div>
    </div>
  </section>
  <br>
  <div class="profile-links">
          <button type="button" id="no" data-id=${currentData.id} class="btn text-danger btn-custom" ><i class="fas fa-times"></i></button>
          <button type="button" id="yes" data-id=${currentData.id} class="btn text-success btn-custom"><i data-id=${currentData.id} class="fas fa-check"></i></button>
    </div>
  </main>`;
  $("#search-container").empty();

  $("#search-container").append(profileCard);

  $("#no").on("click", noHandler);
  $("#yes").on("click", yesHandler);
}

const deleteMatch = async (event) => {
  const id = $(event.target).attr("data-matchId");
  const response = await fetch(`/api/match/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { success } = await response.json();
  if (success) {
    window.location.reload();
  }
};

// Logs the user out of the application by destroying the session
const handleLogout = async () => {
  localStorage.removeItem("userIdsToSkip");
  const response = await fetch("/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.success) {
    window.location.replace("/");
  }
};

const backToProfile = () => {
  console.log("back");
  window.location.assign("/profile");
};
// Button Handlers
loginForm.on("submit", loginHandler);
signupForm.on("submit", signupHandler);
searchStartBtn.on("click", startSearch);
logout.on("click", handleLogout);
deleteUserMatchBtn.on("click", deleteMatch);
updateBtn.on("click", renderUpdateModal);
backBtn.on("click", backToProfile);
