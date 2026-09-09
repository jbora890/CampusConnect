/* ========================================
   CAMPUSCONNECT JAVASCRIPT
======================================== */


/* ========================================
   EVENT DATA
======================================== */

const defaultEvents = [

    {
        id: 1,
        title: "Annual Sports Fest",
        category: "Sports",
        date: "Sept 15",
        location: "Main Ground",
        icon: "🏆",
        description:
            "Competitive games, teamwork and a day full of energy."
    },

    {
        id: 2,
        title: "Cultural Night",
        category: "Cultural",
        date: "Sept 20",
        location: "Auditorium",
        icon: "🎭",
        description:
            "Music, dance and performances celebrating campus talent."
    },

    {
        id: 3,
        title: "Tech Workshop",
        category: "Technical",
        date: "Sept 25",
        location: "Lab 3",
        icon: "💻",
        description:
            "Learn practical web development and modern technologies."
    },

    {
        id: 4,
        title: "Photography Walk",
        category: "Workshop",
        date: "Sept 28",
        location: "North Gate",
        icon: "📷",
        description:
            "Explore campus photography techniques with fellow students."
    },

    {
        id: 5,
        title: "Coding Challenge",
        category: "Technical",
        date: "Oct 02",
        location: "Innovation Lab",
        icon: "⌨️",
        description:
            "Solve programming problems and test your problem-solving skills."
    },

    {
        id: 6,
        title: "Open Mic Evening",
        category: "Cultural",
        date: "Oct 05",
        location: "Student Centre",
        icon: "🎤",
        description:
            "Share music, poetry, comedy and other creative performances."
    },

    {
        id: 7,
        title: "Badminton Doubles",
        category: "Sports",
        date: "Oct 10",
        location: "Indoor Court",
        icon: "🏸",
        description:
            "Team up and compete in a friendly doubles tournament."
    },

    {
        id: 8,
        title: "Career Workshop",
        category: "Workshop",
        date: "Oct 14",
        location: "Seminar Hall",
        icon: "🎓",
        description:
            "Learn practical skills for internships, interviews and careers."
    }

];


/* ========================================
   LOCAL STORAGE
======================================== */

const savedEvents =
    localStorage.getItem("campusEvents");

let events = savedEvents
    ? JSON.parse(savedEvents)
    : defaultEvents;


function saveEvents() {

    localStorage.setItem(
        "campusEvents",
        JSON.stringify(events)
    );

}


/* ========================================
   PAGE LOADING
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupMenu();

        setupEventsPage();

        setupRegistrationPage();

        updateHomeEventCount();

    }
);


/* ========================================
   MOBILE MENU
======================================== */

function setupMenu() {

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.getElementById("navLinks");


    if (!menuToggle || !navLinks) {
        return;
    }


    menuToggle.addEventListener(
        "click",
        function () {

            navLinks.classList.toggle("open");

        }
    );

}


/* ========================================
   HOME EVENT COUNT
======================================== */

function updateHomeEventCount() {

    const count =
        document.getElementById(
            "homeEventCount"
        );


    if (count) {

        count.textContent =
            events.length + "+";

    }

}


/* ========================================
   CATEGORY ICON
======================================== */

function getIconClass(category) {

    if (category === "Sports") {

        return "sports";

    }

    if (category === "Cultural") {

        return "culture";

    }

    return "tech";

}


/* ========================================
   ESCAPE HTML
======================================== */

function escapeHtml(text) {

    return String(text).replace(
        /[&<>"']/g,

        function (character) {

            const characters = {

                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"

            };

            return characters[character];

        }
    );

}


/* ========================================
   RENDER EVENTS
======================================== */

function renderEvents() {

    const container =
        document.getElementById(
            "eventsContainer"
        );


    if (!container) {
        return;
    }


    const searchInput =
        document.getElementById(
            "searchInput"
        );


    const categoryFilter =
        document.getElementById(
            "categoryFilter"
        );


    const search =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    const category =
        categoryFilter
            ? categoryFilter.value
            : "all";


    const filteredEvents =
        events.filter(

            function (event) {

                const matchesCategory =
                    category === "all" ||
                    event.category === category;


                const searchableText =
                    (
                        event.title +
                        " " +
                        event.description +
                        " " +
                        event.location
                    ).toLowerCase();


                const matchesSearch =
                    searchableText.includes(search);


                return (
                    matchesCategory &&
                    matchesSearch
                );

            }

        );


    container.innerHTML = "";


    filteredEvents.forEach(

        function (event) {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "event-card";


            const badgeClass =
                event.category === "Sports"
                    ? "sports-badge"
                    : event.category === "Cultural"
                        ? "culture-badge"
                        : "tech-badge";


            card.innerHTML = `

                <div class="card-icon ${getIconClass(event.category)}">
                    ${event.icon || "📌"}
                </div>

                <span class="badge ${badgeClass}">
                    ${escapeHtml(event.category)}
                </span>

                <h3>
                    ${escapeHtml(event.title)}
                </h3>

                <p>
                    ${escapeHtml(event.description)}
                </p>

                <div class="card-meta">
                    📅 ${escapeHtml(event.date)}
                    &nbsp; • &nbsp;
                    📍 ${escapeHtml(event.location)}
                </div>

                <a
                    class="btn btn-small"
                    href="register.html?event=${encodeURIComponent(event.title)}">

                    Register

                </a>

                <button
                    class="delete-event"
                    data-id="${event.id}">

                    Delete

                </button>

            `;


            container.appendChild(card);

        }

    );


    setupDeleteButtons();


    const resultCount =
        document.getElementById(
            "resultCount"
        );


    if (resultCount) {

        resultCount.textContent =
            `Showing ${filteredEvents.length} of ${events.length} events`;

    }


    const emptyState =
        document.getElementById(
            "emptyState"
        );


    if (emptyState) {

        emptyState.classList.toggle(
            "hidden",
            filteredEvents.length !== 0
        );

    }

}


/* ========================================
   DELETE EVENTS
======================================== */

function setupDeleteButtons() {

    const buttons =
        document.querySelectorAll(
            ".delete-event"
        );


    buttons.forEach(

        function (button) {

            button.addEventListener(
                "click",

                function () {

                    const id =
                        Number(
                            button.dataset.id
                        );


                    deleteEvent(id);

                }

            );

        }

    );

}


function deleteEvent(id) {

    const event =
        events.find(
            function (item) {
                return item.id === id;
            }
        );


    if (!event) {
        return;
    }


    const confirmed =
        confirm(
            `Delete "${event.title}"?`
        );


    if (!confirmed) {
        return;
    }


    events =
        events.filter(
            function (item) {
                return item.id !== id;
            }
        );


    saveEvents();

    renderEvents();

    updateHomeEventCount();

}


/* ========================================
   EVENTS PAGE
======================================== */

function setupEventsPage() {

    const container =
        document.getElementById(
            "eventsContainer"
        );


    if (!container) {
        return;
    }


    const searchInput =
        document.getElementById(
            "searchInput"
        );


    const categoryFilter =
        document.getElementById(
            "categoryFilter"
        );


    searchInput.addEventListener(
        "input",
        renderEvents
    );


    categoryFilter.addEventListener(
        "change",
        renderEvents
    );


    const panel =
        document.getElementById(
            "addEventPanel"
        );


    const showAddForm =
        document.getElementById(
            "showAddForm"
        );


    const cancelAdd =
        document.getElementById(
            "cancelAdd"
        );


    showAddForm.addEventListener(
        "click",

        function () {

            panel.classList.toggle(
                "hidden"
            );

        }

    );


    cancelAdd.addEventListener(
        "click",

        function () {

            panel.classList.add(
                "hidden"
            );

        }

    );


    const addEventForm =
        document.getElementById(
            "addEventForm"
        );


    addEventForm.addEventListener(
        "submit",

        function (event) {

            event.preventDefault();


            const title =
                document.getElementById(
                    "newTitle"
                ).value.trim();


            const category =
                document.getElementById(
                    "newCategory"
                ).value;


            const date =
                document.getElementById(
                    "newDate"
                ).value.trim();


            const location =
                document.getElementById(
                    "newLocation"
                ).value.trim();


            if (
                !title ||
                !category ||
                !date ||
                !location
            ) {

                alert(
                    "Please fill all event fields."
                );

                return;

            }


            const newEvent = {

                id: Date.now(),

                title: title,

                category: category,

                date: date,

                location: location,

                icon:
                    category === "Sports"
                        ? "🏅"
                        : category === "Cultural"
                            ? "🎨"
                            : category === "Technical"
                                ? "🧑‍💻"
                                : "🛠️",

                description:
                    "A newly added campus event."

            };


            events.push(newEvent);


            saveEvents();


            addEventForm.reset();


            panel.classList.add(
                "hidden"
            );


            renderEvents();


            updateHomeEventCount();

        }

    );


    renderEvents();

}


/* ========================================
   REGISTRATION PAGE
======================================== */

function setupRegistrationPage() {

    const form =
        document.getElementById(
            "registrationForm"
        );


    if (!form) {
        return;
    }


    const eventSelect =
        document.getElementById(
            "event"
        );


    events.forEach(

        function (event) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                event.title;


            option.textContent =
                event.title;


            eventSelect.appendChild(
                option
            );

        }

    );


    const queryParams =
        new URLSearchParams(
            window.location.search
        );


    const selectedEvent =
        queryParams.get("event");


    if (
        selectedEvent &&
        events.some(
            function (event) {
                return event.title === selectedEvent;
            }
        )
    ) {

        eventSelect.value =
            selectedEvent;

    }


    form.addEventListener(
        "submit",

        function (event) {

            event.preventDefault();


            validateRegistration();

        }

    );


    renderRegistrations();

}


/* ========================================
   FORM VALIDATION
======================================== */

function validateRegistration() {

    const name =
        document.getElementById(
            "name"
        ).value.trim();


    const email =
        document.getElementById(
            "email"
        ).value.trim();


    const phone =
        document.getElementById(
            "phone"
        ).value.trim();


    const department =
        document.getElementById(
            "department"
        ).value;


    const event =
        document.getElementById(
            "event"
        ).value;


    document
        .querySelectorAll(".error")
        .forEach(

            function (error) {

                error.textContent = "";

            }

        );


    let valid = true;


    if (name.length < 3) {

        document.getElementById(
            "nameError"
        ).textContent =
            "Enter at least 3 characters.";

        valid = false;

    }


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
        !emailPattern.test(email)
    ) {

        document.getElementById(
            "emailError"
        ).textContent =
            "Enter a valid email address.";

        valid = false;

    }


    const phonePattern =
        /^\d{10}$/;


    if (
        !phonePattern.test(phone)
    ) {

        document.getElementById(
            "phoneError"
        ).textContent =
            "Enter a 10-digit phone number.";

        valid = false;

    }


    if (!department) {

        document.getElementById(
            "departmentError"
        ).textContent =
            "Select your department.";

        valid = false;

    }


    if (!event) {

        document.getElementById(
            "eventError"
        ).textContent =
            "Select an event.";

        valid = false;

    }


    const message =
        document.getElementById(
            "formMessage"
        );


    if (!valid) {

        message.className =
            "form-message";

        message.textContent =
            "Please correct the highlighted fields.";

        return;

    }


    saveRegistration(
        name,
        email,
        phone,
        department,
        event
    );


    message.className =
        "form-message success";


    message.textContent =
        `Registration successful! ${name}, you are registered for ${event}.`;


    document
        .getElementById(
            "registrationForm"
        )
        .reset();


    renderRegistrations();

}


/* ========================================
   SAVE REGISTRATION
======================================== */

function saveRegistration(
    name,
    email,
    phone,
    department,
    event
) {

    const registrations =
        JSON.parse(
            localStorage.getItem(
                "campusRegistrations"
            ) || "[]"
        );


    registrations.push({

        name: name,

        email: email,

        phone: phone,

        department: department,

        event: event,

        date:
            new Date().toLocaleString()

    });


    localStorage.setItem(
        "campusRegistrations",
        JSON.stringify(
            registrations
        )
    );

}


/* ========================================
   DISPLAY REGISTRATIONS
======================================== */

function renderRegistrations() {

    const list =
        document.getElementById(
            "registrationsList"
        );


    if (!list) {
        return;
    }


    const registrations =
        JSON.parse(
            localStorage.getItem(
                "campusRegistrations"
            ) || "[]"
        );


    const recent =
        registrations
            .slice(-5)
            .reverse();


    if (recent.length === 0) {

        list.innerHTML =
            "<p class='empty-state'>No registrations yet.</p>";

        return;

    }


    list.innerHTML =
        recent.map(

            function (registration) {

                return `

                    <div class="registration-item">

                        <div>

                            <strong>
                                ${escapeHtml(
                                    registration.name
                                )}
                            </strong>

                            <br>

                            <small>

                                ${escapeHtml(
                                    registration.event
                                )}

                                •
                                
                                ${escapeHtml(
                                    registration.department
                                )}

                            </small>

                        </div>

                        <small>

                            ${escapeHtml(
                                registration.date
                            )}

                        </small>

                    </div>

                `;

            }

        ).join("");

}