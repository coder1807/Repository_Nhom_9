// script.js - Mã JavaScript cho trang Portfolio

// Chờ cho tài liệu HTML được tải hoàn toàn trước khi thực thi JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // 1. Hiệu ứng cuộn mượt khi nhấp vào menu
  const menuLinks = document.querySelectorAll("nav a");

  menuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      window.scrollTo({
        top: targetSection.offsetTop - 70,
        behavior: "smooth",
      });
    });
  });

  // 2. Hiệu ứng hiển thị header animation khi cuộn trang
  const header = document.querySelector("header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  });

  // 3. Hiệu ứng hiển thị từng mục khi cuộn đến
  const sections = document.querySelectorAll("section");

  function checkVisible() {
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.8) {
        section.classList.add("section-visible");
      }
    });
  }

  // Kiểm tra lần đầu khi tải trang
  checkVisible();

  // Kiểm tra mỗi khi cuộn trang
  window.addEventListener("scroll", checkVisible);

  // 4. Hiệu ứng typing cho title trong header
  const title = document.querySelector("header h1");
  const originalText = title.textContent;
  title.textContent = "";

  function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
      title.textContent = text.substring(0, i + 1);

      setTimeout(function () {
        typeWriter(text, i + 1, fnCallback);
      }, 100);
    } else if (typeof fnCallback === "function") {
      setTimeout(fnCallback, 700);
    }
  }

  // Bắt đầu hiệu ứng typing sau 1 giây
  setTimeout(function () {
    typeWriter(originalText, 0, function () {
      title.classList.add("typed");
    });
  }, 1000);

  // 5. Hiệu ứng hover cho project cards
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.classList.add("card-hover");
    });

    card.addEventListener("mouseleave", function () {
      this.classList.remove("card-hover");
    });
  });

  // 6. Hiển thị skill bars với animation
  const progressBars = document.querySelectorAll(".progress-bar");

  function animateProgressBars() {
    progressBars.forEach((bar) => {
      const targetWidth = bar.getAttribute("data-width") || bar.style.width;
      bar.style.width = "0%";

      setTimeout(() => {
        bar.style.width = targetWidth;
        bar.style.transition = "width 1.5s ease-in-out";
      }, 200);
    });
  }

  // Gọi hàm animateProgressBars khi cuộn đến phần Skills
  const skillsSection = document.getElementById("skills");

  function checkSkillsVisible() {
    if (skillsSection) {
      const skillsTop = skillsSection.getBoundingClientRect().top;

      if (skillsTop < window.innerHeight * 0.8) {
        animateProgressBars();
        // Gỡ bỏ event listener sau khi đã chạy animation
        window.removeEventListener("scroll", checkSkillsVisible);
      }
    }
  }

  window.addEventListener("scroll", checkSkillsVisible);
  checkSkillsVisible(); // Kiểm tra lần đầu khi tải trang

  // 7. Menu active khi cuộn đến section tương ứng
  function setActiveMenuItem() {
    const fromTop = window.scrollY + 100;

    menuLinks.forEach((link) => {
      const section = document.querySelector(link.getAttribute("href"));

      if (
        section.offsetTop <= fromTop &&
        section.offsetTop + section.offsetHeight > fromTop
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveMenuItem);
  setActiveMenuItem(); // Thiết lập lần đầu khi tải trang

  // 8. Hiệu ứng phóng to ảnh khi click
  const images = document.querySelectorAll(".project-img");

  images.forEach((img) => {
    img.addEventListener("click", function () {
      // Tạo overlay để hiển thị ảnh phóng to
      const overlay = document.createElement("div");
      overlay.className = "img-overlay";

      const imgClone = document.createElement("img");
      imgClone.src = this.src;

      overlay.appendChild(imgClone);
      document.body.appendChild(overlay);

      // Đóng overlay khi click
      overlay.addEventListener("click", function () {
        this.remove();
      });
    });
  });

  // 9. Thêm nút scroll to top
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.className = "scroll-top-btn";
  scrollTopBtn.innerHTML = "&uarr;";
  document.body.appendChild(scrollTopBtn);

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  // 10. Form validation cho phần liên hệ (nếu có form)
  const contactForm = document.querySelector("form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Kiểm tra các trường form
      let valid = true;
      const requiredFields = contactForm.querySelectorAll("[required]");

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          valid = false;
          field.classList.add("error");
        } else {
          field.classList.remove("error");
        }
      });

      if (valid) {
        // Hiển thị thông báo thành công
        const successMsg = document.createElement("div");
        successMsg.className = "success-message";
        successMsg.textContent = "Tin nhắn của bạn đã được gửi thành công!";
        contactForm.appendChild(successMsg);

        // Reset form
        contactForm.reset();

        // Xóa thông báo sau 3 giây
        setTimeout(() => {
          successMsg.remove();
        }, 3000);
      }
    });
  }
});
