const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2602-james";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

let events = [];
let selectedEvent;

async function getEvents() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    console.log(result);
    events = result.data;
  } catch (error) {
    console.error(error);
  }
}

async function getEvent(id) {
  try {
    const response = await fetch(API + "/" + id);
    const result = await response.json();
    selectedEvent = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

function EventList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("event-list");

  const $events = events.map(EventListItem);
  $ul.replaceChildren(...$events);

  return $ul;
}

function EventListItem(event) {
  const $li = document.createElement("li");
  $li.innerHTML = `<a href="#selected">${event.name}</a>`;
  $li.addEventListener("click", () => {
    getEvent(event.id);
  });
}

function EventDetails() {
  if (!selectedEvent) {
    const $p = document.createElement("p");
    $p.textContent = "Select an event to see details.";
    return $p;
  }

  const $event = document.createElement("section");
  $event.classList.add("event-details");
  $event.innerHTML = `
    <h3>${selectedEvent.name} #${selectedEvent.id}</h3>
    <p>${selectedEvent.date} #${selectedEvent.location}</p>
    <p>${selectedEvent.description}</p>
  `;

  return $event;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
      <section>
        <h2>Events</h2>
        <EventList></EventList>
      </section>
      <section id="selected">
        <h2>Event Details</h2>
        <EventDetails></EventDetails>
      </section>
    </main>
  `;

  $app.querySelector("EventList").replaceWith(EventList());
  $app.querySelector("EventDetails").replaceWith(EventDetails());
}

async function init() {
  await getEvents();

  render();
}

init();