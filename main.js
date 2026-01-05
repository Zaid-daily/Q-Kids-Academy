function handleForm(formId, endpoint) {
  const form = document.getElementById(formId);
  const status = form.querySelector(".success");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "Sending...";

    const data = new FormData(form);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        form.reset();
        status.textContent = "Thank you, we will get back to you soon.";
      } else {
        status.textContent = "Something went wrong. Please try again.";
      }
    } catch (error) {
      status.textContent = "Network error. Please try again.";
    }
  });
}

/* USE TWO DIFFERENT FORMS IN FORMSPREE */
handleForm("generalForm", "https://formspree.io/f/xgovdbnb");
handleForm("courseForm", "https://formspree.io/f/xkogyaqd");

function openForm(courseName) {
  const modal = document.getElementById("modal");
  const courseTitle = document.getElementById("courseTitle");
  const courseInput = document.getElementById("courseInput");

  courseTitle.textContent = courseName;
  courseInput.value = courseName;
  modal.style.display = "flex";
}

function closeForm() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}



// main.js - minimal on-scroll animation controller

document.addEventListener('DOMContentLoaded', function () {
  const observerOptions = { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting) {
        // apply delay if provided
        const delay = parseFloat(el.datasetDelay || el.getAttribute('data-delay') || 0);
        if (delay) el.style.transitionDelay = `${delay}s`;
        el.classList.add('in-view');
        observer.unobserve(el); // animate once; remove this line to animate repeatedly
      }
    });
  }, observerOptions);

  // Select elements to animate
  const reveals = document.querySelectorAll('.reveal, .reveal-up, .reveal-scale');
  reveals.forEach((el, i) => {
    // default small stagger if no data-delay
    if (!el.datasetDelay && !el.hasAttribute('data-delay')) {
      el.datasetDelay = (i * 0.06).toFixed(2);
    }
    observer.observe(el);
  });
});
