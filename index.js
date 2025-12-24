// Carousel functionality
let currentSlide = 0
const slides = document.querySelectorAll(".carousel-slide")
const dots = document.querySelectorAll(".dot")

function showSlide(index) {
  if (index >= slides.length) currentSlide = 0
  if (index < 0) currentSlide = slides.length - 1

  const carousel = document.getElementById("carousel")
  carousel.style.transform = `translateX(-${currentSlide * 100}%)`

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide)
  })
}

function changeSlide(direction) {
  currentSlide += direction
  showSlide(currentSlide)
}

function goToSlide(index) {
  currentSlide = index
  showSlide(currentSlide)
}

// Auto-advance carousel
setInterval(() => {
  currentSlide++
  showSlide(currentSlide)
}, 5000)

// Mobile menu toggle
function toggleMobileMenu() {
  const navMenu = document.getElementById("navMenu")
  navMenu.classList.toggle("active")
}

// Event filtering
function filterEvents(category) {
  const events = document.querySelectorAll(".event-category")
  const filterButtons = document.querySelectorAll(".filter-button")

  filterButtons.forEach((btn) => {
    btn.classList.remove("active")
    if (btn.dataset.category === category) {
      btn.classList.add("active")
    }
  })

  events.forEach((event) => {
    if (category === "all") {
      event.classList.remove("hidden")
    } else {
      if (event.dataset.category === category) {
        event.classList.remove("hidden")
      } else {
        event.classList.add("hidden")
      }
    }
  })
}

// Search functionality
const searchData = [
  { title: "Shakespeare's Hamlet", category: "Theater", date: "June 15, 2024" },
  { title: "Symphony Night", category: "Music", date: "June 22, 2024" },
  { title: "Swan Lake Ballet", category: "Dance", date: "July 1, 2024" },
  { title: "Annual Cultural Gala", category: "Special Event", date: "July 15, 2024" },
  { title: "Jazz Under the Stars", category: "Music", date: "July 20, 2024" },
  { title: "Contemporary Voices", category: "Theater", date: "August 5, 2024" },
]

function handleSearch() {
  const searchInput = document.getElementById("searchInput")
  const searchResults = document.getElementById("searchResults")
  const query = searchInput.value.toLowerCase()

  if (query.length === 0) {
    searchResults.classList.remove("active")
    return
  }

  const results = searchData.filter(
    (item) => item.title.toLowerCase().includes(query) || item.category.toLowerCase().includes(query),
  )

  if (results.length === 0) {
    searchResults.innerHTML = '<div class="search-no-results">No events found</div>'
  } else {
    searchResults.innerHTML = results
      .map(
        (result) => `
            <div class="search-result-item" onclick="selectSearchResult('${result.title}')">
                <div class="search-result-title">${result.title}</div>
                <div class="search-result-meta">${result.category} • ${result.date}</div>
            </div>
        `,
      )
      .join("")
  }

  searchResults.classList.add("active")
}

function selectSearchResult(title) {
  const searchResults = document.getElementById("searchResults")
  searchResults.classList.remove("active")
  document.getElementById("searchInput").value = title
  showToast(`Selected: ${title}`, "success")
}

// Close search results when clicking outside
document.addEventListener("click", (event) => {
  const searchContainer = document.querySelector(".search-container")
  if (!searchContainer.contains(event.target)) {
    document.getElementById("searchResults").classList.remove("active")
  }
})

// Event details modal
const eventDetails = {
  Hamlet: {
    title: "Shakespeare's Hamlet",
    dateTime: "June 15, 2024 at 7:30 PM",
    venue: "Main Hall",
    description:
      "Experience Shakespeare's timeless tragedy brought to life by our talented ensemble. This production features stunning set design, period costumes, and powerful performances that capture the depth and complexity of this masterpiece.",
    prices: "General Admission: $35 | Students/Seniors: $25 | VIP Seating: $50",
  },
  Symphony: {
    title: "Symphony Night",
    dateTime: "June 22, 2024 at 8:00 PM",
    venue: "Concert Hall",
    description:
      "An evening of classical masterpieces performed by the UPAO Symphony Orchestra. The program features Beethoven's Symphony No. 5 and Mozart's Symphony No. 40, conducted by renowned maestro.",
    prices: "General Admission: $40 | Students/Seniors: $30 | Premium Seating: $60",
  },
  "Swan Lake": {
    title: "Swan Lake Ballet",
    dateTime: "July 1, 2024 at 7:00 PM",
    venue: "Grand Theater",
    description:
      "Tchaikovsky's beloved ballet returns with stunning choreography and breathtaking performances. This production features world-class dancers and a live orchestra performing the iconic score.",
    prices: "General Admission: $45 | Students/Seniors: $35 | Orchestra Seating: $75",
  },
  Gala: {
    title: "Annual Cultural Gala",
    dateTime: "July 15, 2024 at 6:00 PM",
    venue: "All Venues",
    description:
      "Join us for our signature annual event celebrating arts and culture. The evening includes performances across multiple venues, art exhibitions, cocktail reception, and special guest appearances.",
    prices: "General Admission: $100 | VIP Package: $250 (includes dinner and meet & greet)",
  },
  Jazz: {
    title: "Jazz Under the Stars",
    dateTime: "July 20, 2024 at 9:00 PM",
    venue: "Outdoor Pavilion",
    description:
      "Smooth jazz melodies under the night sky. An intimate evening featuring renowned jazz artists in an outdoor setting. Cocktails and light refreshments available for purchase.",
    prices: "General Admission: $30 | VIP Table Seating: $120 (seats 4)",
  },
  Contemporary: {
    title: "Contemporary Voices",
    dateTime: "August 5, 2024 at 7:30 PM",
    venue: "Studio Theater",
    description:
      "A collection of modern one-act plays exploring contemporary themes. This innovative production pushes theatrical boundaries and features emerging playwrights and directors.",
    prices: "General Admission: $25 | Students: $15",
  },
}

function openEventDetails(eventKey) {
  const event = eventDetails[eventKey]
  if (!event) return

  document.getElementById("eventTitle").textContent = event.title
  document.getElementById("eventDateTime").textContent = event.dateTime
  document.getElementById("eventVenue").textContent = event.venue
  document.getElementById("eventDescription").textContent = event.description
  document.getElementById("eventPrices").textContent = event.prices

  document.getElementById("eventModal").classList.add("show")
}

function closeEventModal() {
  document.getElementById("eventModal").classList.remove("show")
}

// Login modal - Updated to work with new login form
let currentLoginRole = null
let isUserLoggedIn = false
let currentUserInfo = null
let savedReservationData = null

function openLoginModal(role) {
  currentLoginRole = role
  const modal = document.getElementById("loginModal")
  modal.classList.add("show")
  // Reset to login tab by default
  showForm("login")
}

function closeLoginModal() {
  document.getElementById("loginModal").classList.remove("show")
  currentLoginRole = null
}

function showForm(formType) {
  const loginForm = document.getElementById("login-form")
  const registerForm = document.getElementById("register-form")
  const tabs = document.querySelectorAll(".tab")

  if (formType === "login") {
    loginForm.classList.add("active")
    registerForm.classList.remove("active")
    tabs[0].classList.add("active")
    tabs[1].classList.remove("active")
  } else {
    loginForm.classList.remove("active")
    registerForm.classList.add("active")
    tabs[0].classList.remove("active")
    tabs[1].classList.add("active")
  }
}

function handleLogin(event) {
  event.preventDefault()

  const id = document.getElementById("login-id").value
  const password = document.getElementById("login-password").value
  const messageDiv = document.getElementById("login-message")

  // Simple validation (replace with actual authentication)
  if (id && password) {
    isUserLoggedIn = true
    currentUserInfo = {
      id: id,
      email: id.includes("@") ? id : `${id}@student.upao.edu`,
    }

    closeLoginModal()
    showToast(`Welcome back! Logged in successfully.`, "success")

    if (currentLoginRole === "reservation") {
      setTimeout(() => {
        openReservationModal()
        if (savedReservationData) {
          restoreReservationData(savedReservationData)
          savedReservationData = null
        }
      }, 500)
    }
  } else {
    messageDiv.textContent = "Please enter both ID/Email and password."
    messageDiv.className = "message error"
    messageDiv.style.display = "block"
  }
}

function handleRegister(event) {
  event.preventDefault()

  const password = document.getElementById("password").value
  const confirmPassword = document.getElementById("confirmPassword").value
  const messageDiv = document.getElementById("register-message")
  const email = document.getElementById("email").value
  const studentId = document.getElementById("studentId").value

  if (password !== confirmPassword) {
    messageDiv.textContent = "Passwords do not match."
    messageDiv.className = "message error"
    messageDiv.style.display = "block"
    return
  }

  // Success message
  messageDiv.textContent = "Registration submitted successfully!"
  messageDiv.className = "message success"
  messageDiv.style.display = "block"

  setTimeout(() => {
    isUserLoggedIn = true
    currentUserInfo = {
      id: studentId,
      email: email,
    }

    closeLoginModal()
    showToast("Registration successful! You are now logged in.", "success")

    if (currentLoginRole === "reservation") {
      setTimeout(() => {
        openReservationModal()
        if (savedReservationData) {
          restoreReservationData(savedReservationData)
          savedReservationData = null
        }
      }, 500)
    }
  }, 2000)
}

// Calendar functionality
let currentMonth = new Date().getMonth()
let currentYear = new Date().getFullYear()

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const calendarEvents = {
  "2024-6-15": ["Hamlet"],
  "2024-6-22": ["Symphony Night"],
  "2024-7-1": ["Swan Lake"],
  "2024-7-15": ["Cultural Gala"],
  "2024-7-20": ["Jazz Night"],
  "2024-8-5": ["Contemporary Voices"],
}

function openCalendarModal() {
  renderCalendar()
  document.getElementById("calendarModal").classList.add("show")
}

function closeCalendarModal() {
  document.getElementById("calendarModal").classList.remove("show")
}

function changeMonth(direction) {
  currentMonth += direction
  if (currentMonth > 11) {
    currentMonth = 0
    currentYear++
  }
  if (currentMonth < 0) {
    currentMonth = 11
    currentYear--
  }
  renderCalendar()
}

function renderCalendar() {
  const calendarTitle = document.getElementById("calendarTitle")
  const calendarGrid = document.getElementById("calendarGrid")

  calendarTitle.textContent = `${monthNames[currentMonth]} ${currentYear}`

  const firstDay = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate()

  let calendarHTML = ""

  // Day headers
  dayNames.forEach((day) => {
    calendarHTML += `<div class="calendar-day-header">${day}</div>`
  })

  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    calendarHTML += `<div class="calendar-day other-month">
            <div class="day-number">${daysInPrevMonth - i}</div>
        </div>`
  }

  // Current month days
  const today = new Date()
  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${currentYear}-${currentMonth + 1}-${day}`
    const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()

    const events = calendarEvents[dateKey] || []
    const eventHTML = events.map((e) => `<div class="day-events"><span class="event-dot"></span>${e}</div>`).join("")

    calendarHTML += `<div class="calendar-day ${isToday ? "today" : ""}">
            <div class="day-number">${day}</div>
            ${eventHTML}
        </div>`
  }

  // Next month days
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7
  const remainingCells = totalCells - (firstDay + daysInMonth)
  for (let i = 1; i <= remainingCells; i++) {
    calendarHTML += `<div class="calendar-day other-month">
            <div class="day-number">${i}</div>
        </div>`
  }

  calendarGrid.innerHTML = calendarHTML
}

// Toast notification
function showToast(message, type = "success") {
  const toast = document.getElementById("toast")
  const toastMessage = document.getElementById("toastMessage")

  toastMessage.textContent = message
  toast.className = `toast ${type} show`

  setTimeout(() => {
    toast.classList.remove("show")
  }, 3000)
}

// Close modals when clicking outside
window.onclick = (event) => {
  const eventModal = document.getElementById("eventModal")
  const loginModal = document.getElementById("loginModal")
  const calendarModal = document.getElementById("calendarModal")
  const reservationModal = document.getElementById("reservationModal")
  const confirmationModal = document.getElementById("confirmationModal")

  if (event.target === eventModal) {
    closeEventModal()
  }
  if (event.target === loginModal) {
    closeLoginModal()
  }
  if (event.target === calendarModal) {
    closeCalendarModal()
  }
  if (event.target === reservationModal) {
    closeReservationModal()
  }
  if (event.target === confirmationModal) {
    closeConfirmationModal()
  }
}

// Event Reservation functionality

function openReservationModal() {
  const modal = document.getElementById("reservationModal")
  modal.classList.add("show")

  // Pre-fill email if user is logged in
  if (isUserLoggedIn && currentUserInfo && currentUserInfo.email) {
    document.getElementById("res-email").value = currentUserInfo.email
  }
}

function closeReservationModal() {
  document.getElementById("reservationModal").classList.remove("show")
}

function saveReservationData() {
  return {
    eventName: document.getElementById("res-event-name").value,
    eventDate: document.getElementById("res-event-date").value,
    eventVenue: document.getElementById("res-event-venue").value,
    firstName: document.getElementById("res-firstName").value,
    lastName: document.getElementById("res-lastName").value,
    email: document.getElementById("res-email").value,
    mobile: document.getElementById("res-mobile").value,
    organization: document.getElementById("res-organization").value,
    notes: document.getElementById("res-notes").value,
    categories: Array.from(document.querySelectorAll('input[name="artCategory"]:checked')).map((cb) => cb.value),
  }
}

function restoreReservationData(data) {
  document.getElementById("res-event-name").value = data.eventName
  document.getElementById("res-event-date").value = data.eventDate
  document.getElementById("res-event-venue").value = data.eventVenue
  document.getElementById("res-firstName").value = data.firstName
  document.getElementById("res-lastName").value = data.lastName
  document.getElementById("res-email").value = data.email
  document.getElementById("res-mobile").value = data.mobile
  document.getElementById("res-organization").value = data.organization
  document.getElementById("res-notes").value = data.notes

  // Restore checkboxes
  data.categories.forEach((cat) => {
    const checkbox = document.querySelector(`input[name="artCategory"][value="${cat}"]`)
    if (checkbox) checkbox.checked = true
  })
}

function handleReservationSubmit(event) {
  event.preventDefault()

  if (!isUserLoggedIn) {
    // Save the form data
    savedReservationData = saveReservationData()

    // Close reservation modal
    closeReservationModal()

    // Show message and prompt login
    showToast("Please login or create an account to submit your reservation.", "error")

    setTimeout(() => {
      currentLoginRole = "reservation"
      openLoginModal("reservation")
    }, 500)
    return
  }

  // Get event details
  const eventName = document.getElementById("res-event-name").value
  const eventDate = document.getElementById("res-event-date").value
  const eventVenue = document.getElementById("res-event-venue").value

  // Get client information
  const firstName = document.getElementById("res-firstName").value
  const lastName = document.getElementById("res-lastName").value
  const email = document.getElementById("res-email").value
  const mobile = document.getElementById("res-mobile").value
  const organization = document.getElementById("res-organization").value
  const notes = document.getElementById("res-notes").value
  const documents = document.getElementById("res-documents").files

  // Get selected art categories
  const categories = Array.from(document.querySelectorAll('input[name="artCategory"]:checked')).map((cb) => cb.value)

  if (categories.length === 0) {
    showToast("Please select at least one art category.", "error")
    return
  }

  const reservationId = generateReservationId()

  const formData = {
    reservationId: reservationId,
    status: "Pending Verification",
    userId: currentUserInfo.id,
    userEmail: currentUserInfo.email,
    eventDetails: {
      eventName,
      eventDate,
      eventVenue,
    },
    clientInfo: {
      fullName: `${firstName} ${lastName}`,
      firstName,
      lastName,
      email,
      mobile,
      organization,
    },
    artCategories: categories,
    notes,
    documents:
      documents.length > 0
        ? Array.from(documents)
            .map((f) => f.name)
            .join(", ")
        : "None",
    submittedAt: new Date().toISOString(),
  }

  console.log("Reservation submitted:", formData)

  closeReservationModal()
  showReservationConfirmation(formData)

  // Reset form
  document.getElementById("eventReservationForm").reset()
}

function generateReservationId() {
  const prefix = "RES"
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substr(2, 4).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

function showReservationConfirmation(data) {
  // Create confirmation modal HTML
  const confirmationHTML = `
    <div id="confirmationModal" class="modal show">
      <div class="modal-content" style="max-width: 600px;">
        <div style="text-align: center; margin-bottom: 2rem;">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 80px; height: 80px; background: linear-gradient(135deg, #2c5530, #3d7040); border-radius: 50%; margin-bottom: 1.5rem;">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h2 style="font-family: 'Playfair Display', serif; font-size: 2rem; color: #1a1a1a; margin-bottom: 0.5rem;">Reservation Submitted Successfully!</h2>
          <p style="color: #6b6b6b; font-size: 1rem;">Your ticket reservation is now pending verification</p>
        </div>

        <div style="background-color: #fdfcfb; padding: 1.5rem; border-radius: 8px; border: 2px solid #d4af37; margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(0,0,0,0.08);">
            <span style="font-weight: 600; color: #1a1a1a; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">Reservation ID</span>
            <span style="font-family: monospace; font-size: 1.125rem; font-weight: 700; color: #d4af37;">${data.reservationId}</span>
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 600; color: #1a1a1a; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">Status</span>
            <span style="display: inline-block; padding: 0.5rem 1rem; background-color: #fff3cd; color: #856404; border-radius: 20px; font-size: 0.875rem; font-weight: 600;">⏳ ${data.status}</span>
          </div>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h3 style="font-weight: 600; color: #1a1a1a; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem;">Reservation Details</h3>
          
          <div style="display: grid; gap: 0.75rem;">
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #6b6b6b;">Event</span>
              <span style="font-weight: 600; color: #1a1a1a; text-align: right;">${data.eventDetails.eventName}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #6b6b6b;">Name</span>
              <span style="font-weight: 600; color: #1a1a1a;">${data.clientInfo.fullName}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #6b6b6b;">Email</span>
              <span style="font-weight: 600; color: #1a1a1a;">${data.clientInfo.email}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #6b6b6b;">Mobile</span>
              <span style="font-weight: 600; color: #1a1a1a;">${data.clientInfo.mobile}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #6b6b6b;">Categories</span>
              <span style="font-weight: 600; color: #1a1a1a; text-align: right;">${data.artCategories.join(", ")}</span>
            </div>
          </div>
        </div>

        <div style="background-color: #e8f5e9; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #2c5530;">
          <p style="margin: 0; color: #1a1a1a; font-size: 0.9375rem; line-height: 1.6;">
            <strong>What's Next?</strong><br>
            Your reservation is being reviewed by our team. You will receive a confirmation email at <strong>${data.clientInfo.email}</strong> once your reservation has been verified. Please check your email regularly for updates.
          </p>
        </div>

        <div style="display: flex; gap: 1rem;">
          <button onclick="closeConfirmationModal()" style="flex: 1; padding: 1rem 2rem; background: linear-gradient(135deg, #d4af37, #b8941f); color: white; border: none; border-radius: 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; transition: all 0.3s ease;">
            Done
          </button>
          <button onclick="printReservation('${data.reservationId}')" style="flex: 1; padding: 1rem 2rem; background: white; color: #1a1a1a; border: 2px solid #d4af37; border-radius: 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; transition: all 0.3s ease;">
            Print
          </button>
        </div>
      </div>
    </div>
  `

  // Append to body
  document.body.insertAdjacentHTML("beforeend", confirmationHTML)
}

function closeConfirmationModal() {
  const modal = document.getElementById("confirmationModal")
  if (modal) {
    modal.remove()
  }
}

function printReservation(reservationId) {
  showToast(`Printing reservation ${reservationId}...`, "success")
  // In a real application, this would trigger a print dialog with formatted reservation details
  window.print()
}
