import "./style.css";
import { AdServer } from "./index";

const addSeg = document.getElementById("add-seg");
addSeg.addEventListener("click", (e) => {
  e.preventDefault();
  addSegment();
});

function removeUserSegment(e, selector) {
  const parent = e.target.closest(`#${selector}`);
  parent.remove();
}

function createRemoveButton(selector) {
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "X";
  removeBtn.addEventListener("click", (e) => removeUserSegment(e, selector));
  return removeBtn;
}

function addSegment() {
  const container = document.getElementById("segment-container");
  addNewSegment(container, "user-segment");
}

function addNewSegment(container, selector) {
  const newCount = Number(container.dataset.count) + 1;
  container.dataset.count = newCount;
  const inputGroup = document.getElementById(selector);
  const clone = cloneInputGroup(inputGroup, newCount, selector);
  container.appendChild(clone);
}

function removeValue() {
  [...arguments].forEach((el) => {
    const [input] = el.children;
    input.value = "";
  });
}

function increment(node, count) {
  const [input] = node.children;
  input.id = input.id + count;
}

function cloneInputGroup(inputGroup, count, selector) {
  const clone = inputGroup.cloneNode(true);
  const [key, value] = clone.children;
  increment(key, count);
  increment(value, count);
  removeValue(key, value);
  const removeBtn = createRemoveButton(selector);
  clone.appendChild(removeBtn);
  return clone;
}

function getUserSegments() {
  const userSegmentKeys = [...document.querySelectorAll(".us-key")].map(
    (el) => el.value
  );
  const userSegmentValues = [...document.querySelectorAll(".us-val")].map(
    (el) => el.value
  );
  return userSegmentKeys.map((key, index) => [key, userSegmentValues[index]]);
}

function getMixpanelEvents(formData) {
  const events = [];
  if (formData.has("membership_block")) {
    formData
      .getAll("membership_block")
      .map((el) => events.push(["Membership Block", el]));
  }
  if (formData.has("email_capture")) {
    formData
      .getAll("email_capture")
      .map((el) => events.push(["Email Capture", el]));
  }
  return events.map(([action, status]) => {
    const acc = {
      action,
      status,
      service: "mixpanel",
    };
    return acc;
  });
}

function getTags() {
  const tags = document.getElementById("tags").value;
  if (tags != "") {
    return tags.split(",");
  }
}

const myForm = document.getElementById("template-form");

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(myForm);
  const userSegments = getUserSegments();
  const mixpanelEvents = getMixpanelEvents(formData);
  const tags = getTags();
  launchAd(userSegments, mixpanelEvents, tags);
});

function sanitize(obj) {
  return Object.entries(obj).reduce((accumulator, [k, v]) => {
    if (Array.isArray(v) && v.length === 1 && v.includes("")) {
      return accumulator;
    } else {
      if (v === null) return accumulator;
      accumulator[k] = v;
      return accumulator;
    }
  }, {});
}

function launchAd(userSegments, mixpanelEvents, tags) {
  const config = {
    matchers: userSegments,
    thirdPartyCallbacks: mixpanelEvents,
    tags: [tags],
    adServicer: "piano",
  };
  const advert = new AdServer(sanitize(config));
  advert.dispatchAd();
  console.log(advert);
}
