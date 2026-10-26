/**
 * El Grimorio Errante - Dados y Bandejas
 * Frontend Interactions & Social Direct Ordering
 */

// BRAND CONFIGURATION
const BRAND_CONFIG = {
  name: "El Grimorio Errante - Dados y Bandejas",
  whatsappNumber: "5493794636696", // Formato WhatsApp internacional para Corrientes, Argentina
  whatsappBaseUrl: "https://wa.me/5493794636696",
  instagramUrl: "https://www.instagram.com/elgrimorioerrante/",
  currencySymbol: "$"
};

document.addEventListener("DOMContentLoaded", () => {
  initMobileNavigation();
  initProductInquiries();
  initMysteryBagAction();
  syncBrandLinks();
});

/**
 * Mobile Navigation Toggle
 */
function initMobileNavigation() {
  const toggleBtn = document.getElementById("mobileToggle");
  const navLinks = document.getElementById("navLinks");

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener("click", () => {
    const isExpanded = navLinks.classList.toggle("mobile-active");
    toggleBtn.setAttribute("aria-expanded", isExpanded);
  });

  // Close when clicking an anchor link
  navLinks.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("mobile-active");
      toggleBtn.setAttribute("aria-expanded", "false");
    });
  });
}

/**
 * Pre-filled WhatsApp Direct Order for Product Cards
 */
function initProductInquiries() {
  const orderButtons = document.querySelectorAll(".btn-order-product");

  orderButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const card = button.closest(".product-card");
      const productName = card.querySelector(".product-name")?.innerText || "Accesorio TTRPG";
      const productPrice = card.querySelector(".product-price")?.innerText || "";

      const text = `¡Hola, artesanos de El Grimorio Errante! 🎲✨\n\nMe gustaría encargar o consultar disponibilidad de:\n• Producto: *${productName}*\n• Precio de referencia: *${productPrice}*\n\n¿Tienen disponibilidad para coordinar el envío? ¡Muchas gracias!`;

      const encodedMessage = encodeURIComponent(text);
      const url = `${BRAND_CONFIG.whatsappBaseUrl}?text=${encodedMessage}`;

      showNotification(`Conectando con WhatsApp para consultar: ${productName}`);
      window.open(url, "_blank");
    });
  });
}

/**
 * Action for the "Sobre Sorpresa de Dados" Special Highlight
 */
function initMysteryBagAction() {
  const mysteryBtn = document.getElementById("btnOrderMystery");
  if (!mysteryBtn) return;

  mysteryBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const text = `¡Saludos, forjadores de El Grimorio Errante! 🎲✨\n\n¡Quiero desafiar al destino y pedir mi *Sobre Sorpresa de Dados (Edición Limitada)*!\n\n¿Podrían indicarme los métodos de pago y costo de envío?`;

    const encoded = encodeURIComponent(text);
    const url = `${BRAND_CONFIG.whatsappBaseUrl}?text=${encoded}`;

    showNotification("¡Conjurando la suerte! Abriendo WhatsApp...");
    setTimeout(() => {
      window.open(url, "_blank");
    }, 400);
  });
}

/**
 * Sync social URLs across all anchors
 */
function syncBrandLinks() {
  const waLinks = document.querySelectorAll(".btn-wa-direct");
  const igLinks = document.querySelectorAll(".btn-ig-direct");

  waLinks.forEach(link => {
    link.href = `${BRAND_CONFIG.whatsappBaseUrl}?text=${encodeURIComponent("¡Hola! Me gustaría hacer una consulta sobre dados y accesorios para rol de El Grimorio Errante.")}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  igLinks.forEach(link => {
    link.href = BRAND_CONFIG.instagramUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

/**
 * Toast Notification Feedback
 */
function showNotification(message) {
  let toast = document.getElementById("toastMsg");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toastMsg";
    toast.className = "toast-msg";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}
