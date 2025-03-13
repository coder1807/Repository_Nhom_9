// Hiệu ứng scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section")
  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top
    if (sectionTop < window.innerHeight - 100) {
      section.style.opacity = 1
      section.style.transform = "translateY(0)"
    } else {
      section.style.opacity = 0
      section.style.transform = "translateY(50px)"
    }
  })
})

// Khởi tạo opacity ban đầu
document.querySelectorAll("section").forEach((section) => {
  section.style.transition = "opacity 0.5s ease, transform 0.5s ease"
  section.style.opacity = 0
  section.style.transform = "translateY(50px)"
})
