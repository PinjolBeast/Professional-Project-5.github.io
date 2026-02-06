// 1. Non-Wood Furniture Product Data (Consistent)
const products = [
  {
    id: 1,
    name: "Steel Minimalist Chair",
    price: "Rp 850.000",
    category: "metal",
    image: "https://images.unsplash.com",
  },
  {
    id: 2,
    name: "Glass Dining Table",
    price: "Rp 2.400.000",
    category: "glass",
    image: "https://images.unsplash.com",
  },
  {
    id: 3,
    name: "Industrial Metal Shelf",
    price: "Rp 1.200.000",
    category: "metal",
    image: "https://images.unsplash.com",
  },
  {
    id: 4,
    name: "Acrylic Modern Desk",
    price: "Rp 3.100.000",
    category: "carbon", // Assumption that acrylic material falls into carbon/modern category
    image: "https://images.unsplash.com",
  },
];

// 2. Function to display products with Filter feature
function displayProducts(filterValue = 'all') {
  const container = document.getElementById("full-product-container");
  if(!container) return; // Prevent error if id is not found

  container.innerHTML = ""; // Clear container before re-rendering

  const filteredProducts = filterValue === 'all' 
    ? products 
    : products.filter(p => p.category === filterValue);

  filteredProducts.forEach((product) => {
    const card = `
            <div class="product-card">
                <span class="material-badge">${product.category}</span>
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p style="color: #B97A56; font-weight: bold; margin: 10px 0;">${product.price}</p>
                <button style="margin-top:10px; padding: 8px 15px; cursor:pointer; background: #1A374D; color: white; border: none; border-radius: 5px;">
                   <i class="fa-solid fa-cart-shopping"></i> Detail
                </button>
            </div>
        `;
    container.innerHTML += card;
  });
}

// 3. Initialize Event Listener when DOM is Ready
document.addEventListener('DOMContentLoaded', () => {
    // Run initial render
    displayProducts('all');

    // Filter Button Logic
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            displayProducts(filterValue);
        });
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if(target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Animation appears on scroll (Scroll Reveal)
    const observerOptions = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(30px)";
        section.style.transition = "all 0.8s ease-out";
        observer.observe(section);
    });
});
