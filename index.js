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

  // Clear the form
  document.getElementById("eventReservationForm").reset()

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
    fullName: document.getElementById("res-fullName").value,
    email: document.getElementById("res-email").value,
    mobile: document.getElementById("res-mobile").value,
    address: document.getElementById("res-address").value,
    receiveConfirmation: document.getElementById("res-receive-confirmation").checked,
  }
}

function restoreReservationData(data) {
  document.getElementById("res-fullName").value = data.fullName
  document.getElementById("res-email").value = data.email
  document.getElementById("res-mobile").value = data.mobile
  document.getElementById("res-address").value = data.address || ""
  document.getElementById("res-receive-confirmation").checked = data.receiveConfirmation || false
}

function handleReservationSubmit(event) {
  event.preventDefault()

  const eventName = document.getElementById("display-event-name").textContent
  const eventDateTime = document.getElementById("display-event-datetime").textContent
  const eventVenue = document.getElementById("display-event-venue").textContent
  const ticketType = document.getElementById("display-ticket-type").textContent

  // Get client information
  const fullName = document.getElementById("res-fullName").value
  const email = document.getElementById("res-email").value
  const mobile = document.getElementById("res-mobile").value
  const address = document.getElementById("res-address").value
  const acknowledged = document.getElementById("res-acknowledge").checked
  const receiveConfirmation = document.getElementById("res-receive-confirmation").checked

  if (!acknowledged) {
    showToast("Please acknowledge the on-site collection terms.", "error")
    return
  }

  // Generate reservation ID
  const reservationId = generateReservationId()

  const formData = {
    reservationId: reservationId,
    status: "Confirmed",
    bookingType: isUserLoggedIn ? "registered" : "guest",
    userId: isUserLoggedIn ? currentUserInfo.id : null,
    userEmail: isUserLoggedIn ? currentUserInfo.email : email,
    eventDetails: {
      eventName: eventName,
      dateTime: eventDateTime,
      venue: eventVenue,
      ticketType: ticketType,
    },
    clientInfo: {
      fullName: fullName,
      email: email,
      mobile: mobile,
      address: address || "N/A",
    },
    receiveConfirmation: receiveConfirmation,
    submittedAt: new Date().toISOString(),
    isDownloaded: false,
  }

  console.log("Reservation submitted:", formData)

  saveReservationToStorage(formData)

  closeReservationModal()
  showReservationConfirmation(formData)

  // Reset form
  document.getElementById("eventReservationForm").reset()
}

function saveReservationToStorage(reservation) {
  const reservations = JSON.parse(localStorage.getItem("reservations") || "[]")
  reservations.push(reservation)
  localStorage.setItem("reservations", JSON.stringify(reservations))
}

function getUserReservations() {
  if (!isUserLoggedIn) return []

  const reservations = JSON.parse(localStorage.getItem("reservations") || "[]")
  return reservations.filter((r) => r.userId === currentUserInfo.id)
}

function getReservationById(reservationId) {
  const reservations = JSON.parse(localStorage.getItem("reservations") || "[]")
  return reservations.find((r) => r.reservationId === reservationId)
}

function updateReservationInStorage(reservationId, updates) {
  const reservations = JSON.parse(localStorage.getItem("reservations") || "[]")
  const index = reservations.findIndex((r) => r.reservationId === reservationId)

  if (index !== -1) {
    reservations[index] = { ...reservations[index], ...updates }
    localStorage.setItem("reservations", JSON.stringify(reservations))
    return true
  }
  return false
}

function generateReservationId() {
  const prefix = "RES"
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substr(2, 4).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

function showReservationConfirmation(data) {
  const isDownloaded = downloadedTickets.has(data.reservationId)
  const downloadButtonHTML = isDownloaded
    ? `<button disabled style="flex: 1; padding: 1rem 2rem; background: #ccc; color: #666; border: none; border-radius: 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; cursor: not-allowed;">
         Downloaded
       </button>`
    : `<button onclick="downloadTicket('${data.reservationId}')" style="flex: 1; padding: 1rem 2rem; background: linear-gradient(135deg, #2c5530, #3d7040); color: white; border: none; border-radius: 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; transition: all 0.3s ease;">
         Download Ticket
       </button>`

  const accountTypeMessage =
    data.bookingType === "guest"
      ? '<div style="background-color: #fff3cd; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #ffc107;"><p style="margin: 0; color: #856404; font-size: 0.9375rem;"><strong>Guest Booking:</strong> To track your tickets and manage bookings, consider creating an account.</p></div>'
      : ""

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
          <h2 style="font-family: 'Playfair Display', serif; font-size: 2rem; color: #1a1a1a; margin-bottom: 0.5rem;">Booking Confirmed!</h2>
          <p style="color: #6b6b6b; font-size: 1rem;">Your ticket reservation has been confirmed</p>
        </div>

        ${accountTypeMessage}

        <div style="background-color: #fdfcfb; padding: 1.5rem; border-radius: 8px; border: 2px solid #d4af37; margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(0,0,0,0.08);">
            <span style="font-weight: 600; color: #1a1a1a; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">Reservation ID</span>
            <span style="font-family: monospace; font-size: 1.125rem; font-weight: 700; color: #d4af37;">${data.reservationId}</span>
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 600; color: #1a1a1a; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">Status</span>
            <span style="display: inline-block; padding: 0.5rem 1rem; background-color: #d4edda; color: #155724; border-radius: 20px; font-size: 0.875rem; font-weight: 600;">✓ ${data.status}</span>
          </div>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h3 style="font-weight: 600; color: #1a1a1a; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem;">Booking Details</h3>
          
          <div style="display: grid; gap: 0.75rem;">
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #6b6b6b;">Event</span>
              <span style="font-weight: 600; color: #1a1a1a; text-align: right;">${data.eventDetails.eventName}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #6b6b6b;">Date & Time</span>
              <span style="font-weight: 600; color: #1a1a1a; text-align: right;">${data.eventDetails.dateTime}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #6b6b6b;">Venue</span>
              <span style="font-weight: 600; color: #1a1a1a; text-align: right;">${data.eventDetails.venue}</span>
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
          </div>
        </div>

        <div style="background-color: #e8f5e9; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #2c5530;">
          <p style="margin: 0; color: #1a1a1a; font-size: 0.9375rem; line-height: 1.6;">
            <strong>Important Reminder:</strong><br>
            Please bring this confirmation email to claim your ticket at the venue. Tickets are free / payment will be made on-site.
            ${data.receiveConfirmation ? "<br><br>You will receive an SMS/email confirmation shortly." : ""}
          </p>
        </div>

        ${isDownloaded ? '<div style="background-color: #d1ecf1; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #0c5460;"><p style="margin: 0; color: #0c5460; font-size: 0.9375rem;"><strong>Note:</strong> This ticket has been downloaded and can no longer be modified.</p></div>' : ""}

        <div style="display: flex; gap: 1rem;">
          <button onclick="closeConfirmationModal()" style="flex: 1; padding: 1rem 2rem; background: linear-gradient(135deg, #d4af37, #b8941f); color: white; border: none; border-radius: 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; transition: all 0.3s ease;">
            Done
          </button>
          ${downloadButtonHTML}
        </div>
      </div>
    </div>
  `

  // Append to body
  document.body.insertAdjacentHTML("beforeend", confirmationHTML)
}

function downloadTicket(reservationId) {
  const reservation = getReservationById(reservationId)

  if (!reservation) {
    showToast("Reservation not found", "error")
    return
  }

  downloadedTickets.add(reservationId)
  saveDownloadedTickets()

  updateReservationInStorage(reservationId, { isDownloaded: true })

  const ticketHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Ticket Receipt - ${reservation.reservationId}</title>
      <meta charset="UTF-8">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Courier New', monospace;
          background: #f5f5f5;
          padding: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }
        .receipt {
          background: white;
          width: 100%;
          max-width: 400px;
          padding: 30px 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          border: 3px solid #d4af37;
        }
        .receipt-header {
          text-align: center;
          border-bottom: 2px dashed #333;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
        .receipt-header h1 {
          font-size: 24px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 5px;
        }
        .receipt-header p {
          font-size: 12px;
          color: #666;
          margin: 3px 0;
        }
        .ticket-id {
          text-align: center;
          font-size: 18px;
          font-weight: bold;
          background: #000;
          color: #fff;
          padding: 10px;
          margin: 20px 0;
          letter-spacing: 2px;
        }
        .section {
          margin: 20px 0;
        }
        .section-title {
          font-size: 14px;
          font-weight: bold;
          text-transform: uppercase;
          border-bottom: 1px solid #333;
          padding-bottom: 5px;
          margin-bottom: 10px;
          letter-spacing: 1px;
        }
        .row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 13px;
          border-bottom: 1px dotted #ddd;
        }
        .row:last-child {
          border-bottom: none;
        }
        .label {
          font-weight: bold;
          color: #333;
        }
        .value {
          text-align: right;
          color: #000;
          max-width: 60%;
          word-wrap: break-word;
        }
        .status-badge {
          display: inline-block;
          background: #2c5530;
          color: white;
          padding: 5px 15px;
          border-radius: 3px;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .instructions {
          background: #f9f9f9;
          border: 1px solid #ddd;
          padding: 15px;
          margin: 20px 0;
          font-size: 11px;
          line-height: 1.6;
        }
        .instructions-title {
          font-weight: bold;
          font-size: 12px;
          margin-bottom: 8px;
          text-transform: uppercase;
        }
        .instructions ul {
          margin-left: 15px;
        }
        .instructions li {
          margin: 5px 0;
        }
        .footer {
          text-align: center;
          margin-top: 25px;
          padding-top: 20px;
          border-top: 2px dashed #333;
          font-size: 11px;
          color: #666;
        }
        .footer p {
          margin: 5px 0;
        }
        .thank-you {
          font-size: 16px;
          font-weight: bold;
          margin-top: 15px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .print-btn {
          display: block;
          width: 100%;
          padding: 15px;
          background: #2c5530;
          color: white;
          border: none;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          margin-top: 20px;
          border-radius: 3px;
        }
        .print-btn:hover {
          background: #3d7040;
        }
        @media print {
          body {
            background: white;
            padding: 0;
          }
          .receipt {
            box-shadow: none;
            max-width: 100%;
          }
          .no-print {
            display: none !important;
          }
        }
      </style>
    </head>
    <body>
      <div class="receipt">
        <div class="receipt-header">
          <h1>🎭 TICKET</h1>
          <p>CULTURAL SHOW</p>
          <p>━━━━━━━━━━━━━━━━━━━━</p>
        </div>

        <div class="ticket-id">
          ${reservation.reservationId}
        </div>

        <div class="section">
          <div class="section-title">Event Information</div>
          <div class="row">
            <span class="label">Event:</span>
            <span class="value">${reservation.eventDetails.eventName}</span>
          </div>
          <div class="row">
            <span class="label">Date/Time:</span>
            <span class="value">${reservation.eventDetails.dateTime}</span>
          </div>
          <div class="row">
            <span class="label">Venue:</span>
            <span class="value">${reservation.eventDetails.venue}</span>
          </div>
          <div class="row">
            <span class="label">Type:</span>
            <span class="value">${reservation.eventDetails.ticketType}</span>
          </div>
          <div class="row">
            <span class="label">Status:</span>
            <span class="value"><span class="status-badge">${reservation.status}</span></span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Attendee Information</div>
          <div class="row">
            <span class="label">Name:</span>
            <span class="value">${reservation.clientInfo.fullName}</span>
          </div>
          <div class="row">
            <span class="label">Email:</span>
            <span class="value">${reservation.clientInfo.email}</span>
          </div>
          <div class="row">
            <span class="label">Mobile:</span>
            <span class="value">${reservation.clientInfo.mobile}</span>
          </div>
          ${
            reservation.clientInfo.address && reservation.clientInfo.address !== "N/A"
              ? `<div class="row">
            <span class="label">Address:</span>
            <span class="value">${reservation.clientInfo.address}</span>
          </div>`
              : ""
          }
        </div>

        <div class="instructions">
          <div class="instructions-title">⚠️ Important Instructions</div>
          <ul>
            <li>Bring this ticket (printed or on mobile)</li>
            <li>Arrive 15 minutes before start time</li>
            <li>Entry is free / Pay at venue if applicable</li>
            <li>Ticket cannot be modified after download</li>
            <li>Show this confirmation at venue entrance</li>
          </ul>
        </div>

        <div class="footer">
          <p>BOOKING DATE: ${new Date(reservation.submittedAt).toLocaleString()}</p>
          <p>TYPE: ${reservation.bookingType === "guest" ? "GUEST BOOKING" : "REGISTERED USER"}</p>
          <p class="thank-you">Thank You!</p>
          <p>━━━━━━━━━━━━━━━━━━━━</p>
        </div>

        <button onclick="window.print()" class="print-btn no-print">Print Ticket</button>
      </div>
    </body>
    </html>
  `

  const blob = new Blob([ticketHTML], { type: "text/html" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `ticket-${reservationId}.html`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)

  showToast("Ticket downloaded successfully! You can no longer edit this booking.", "success")

  closeConfirmationModal()
}

let downloadedTickets = new Set()

// Load downloaded tickets from localStorage on startup
function loadDownloadedTickets() {
  const saved = localStorage.getItem("downloadedTickets")
  if (saved) {
    downloadedTickets = new Set(JSON.parse(saved))
  }
}

function saveDownloadedTickets() {
  localStorage.setItem("downloadedTickets", JSON.stringify([...downloadedTickets]))
}

function closeConfirmationModal() {
  const modal = document.getElementById("confirmationModal")
  if (modal) {
    modal.remove()
  }
}

function printReservation(reservationId) {
  window.print()
}

document.addEventListener("DOMContentLoaded", () => {
  loadDownloadedTickets()
})
