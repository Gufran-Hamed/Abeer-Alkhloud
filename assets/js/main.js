// مودل تأكيد الطلب
 document.addEventListener("DOMContentLoaded", () => {
    const confirmBtn = document.getElementById("confirmBtn");
    const successModal = document.getElementById("successModal");
    const closeModal = document.getElementById("closeModal");

    confirmBtn.addEventListener("click", () => {
      successModal.classList.remove("hidden");
    });

    closeModal.addEventListener("click", () => {
      successModal.classList.add("hidden");
    });
  });


// اراء العملاء
 document.addEventListener("DOMContentLoaded", () => {
    let index = 0;
    const slides = document.querySelectorAll("#testimonial .slide");

    function showSlide(i) {
      slides.forEach(slide => slide.classList.add("hidden"));
      slides[i].classList.remove("hidden");
    }
    showSlide(index);
    setInterval(() => {
      index = (index + 1) % slides.length;
      showSlide(index);
    }, 4000);
  });


// دوال الأختبار
let selectedScents = [];
let selectedTime = "";

function showStep1() {
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('step1').classList.remove('hidden');
}

function selectScent(element, scent, imgPath) {
  element.classList.toggle("border-yellow-400");

  if (!selectedScents.includes(scent)) {
    selectedScents.push(scent);
  } else {
    selectedScents = selectedScents.filter(s => s !== scent);
  }

  document.body.style.backgroundImage = `url('${imgPath}')`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
}

function showStep2() {
  if (selectedScents.length === 0) {
    return;
  }
  document.getElementById('step1').classList.add('hidden');
  document.getElementById('step2').classList.remove('hidden');
}

function finishQuiz(time) {
  localStorage.setItem('selectedTime', time);
  window.location.href = 'assets/pages/perfourm.html';
}


//  دوال تحفظ الاختيار وتنقل للصفحة الرئيسيه
document.addEventListener("DOMContentLoaded", () => {
  const selectedTime = localStorage.getItem('selectedTime');

  document.getElementById("day-products").classList.add("hidden");
  document.getElementById("night-products").classList.add("hidden");
  document.getElementById("special-products").classList.add("hidden");

  if (selectedTime === "نهار") {
    document.getElementById("day-products").classList.remove("hidden");
  } else if (selectedTime === "ليل") {
    document.getElementById("night-products").classList.remove("hidden");
  } else if (selectedTime === "مناسبات خاصة") {
    document.getElementById("special-products").classList.remove("hidden");
  }
  localStorage.removeItem('selectedTime');
});

// يقوم بتتغير لون خلفية شريط التنقل
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.style.backgroundColor = window.scrollY > 50 
    ? 'rgba(255, 255, 255, 0.3)' 
    : 'transparent';
    
  navbar.style.backdropFilter = window.scrollY > 50 ? 'blur(10px)' : 'none';
});

// دالة ملخص الطلب
document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cartData')) || [];
  const orderSummary = document.getElementById('order-summary');
  const shippingCost = 50;

  const subtotalSpan = document.querySelector('.mt-4 .flex:nth-child(1) span:last-child');
  const shippingSpan = document.querySelector('.mt-4 .flex:nth-child(2) span:last-child');
  const totalSpan = document.querySelector('.mt-4 .font-bold.text-lg span:last-child');

  let subtotal = 0; 
  orderSummary.innerHTML = cart.map(item => {
    subtotal += item.price * item.quantity;
    return `
      <div class="flex flex-row-reverse items-center gap-4 bg-gray-800 p-4 rounded-lg text-right js-item">
        <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded-lg">
        <div class="flex-1 flex flex-col gap-2">
          <h3 class="text-gray-200 text-md">${item.name}</h3>
          <span class="text-[#FFD700]">${item.price} ج.م × ${item.quantity}</span>
        </div>
      </div>
    `;
  }).join(''); 
  subtotalSpan.textContent = subtotal + ' ج.م';
  shippingSpan.textContent = shippingCost + ' ج.م';
  totalSpan.textContent = (subtotal + shippingCost) + ' ج.م';
});


// تفاصيل الدفع
document.addEventListener("DOMContentLoaded", () => {
  const shippingFields = {
    fullname: { 
      validator: v => /^[أ-يA-Za-z\s]{3,}$/.test(v.trim()), 
      message: "الاسم يجب أن يكون حروف فقط"
    },
    street: { 
      validator: v => /^[أ-يA-Za-z\s]{3,}$/.test(v.trim()), 
      message: "العنوان يجب أن يحتوي على حروف فقط" 
    },
    houseNumber: { 
      validator: v => /^[0-9]+$/.test(v.trim()), 
      message: "أدخل رقم العمارة بالأرقام فقط" 
    },
    email: { 
      validator: v => v.includes("@") && v.includes("."), 
      message: "أدخل بريد إلكتروني صحيح" 
    },
    phone: { 
      validator: v => {
        let n = v.replace(/\D/g,"").slice(0,11);
        return n.length === 11 && n.startsWith("01");
      }, 
      message: "أدخل رقم هاتف 11 رقم يبدأ بـ 01"
    },
    card: { 
      validator: v => v.replace(/\D/g,"").slice(0,16).length === 16, 
      message: "أدخل 16 رقم لرقم البطاقة" 
    }
  };

  function showStatus(input, valid, msg) {
    input.parentElement.querySelectorAll(".status-icon, .status-error").forEach(el => el.remove());
    if (!input.value.trim()) return;
    if (valid) {
      const icon = document.createElement("span");
      icon.className = "status-icon absolute left-3 top-10 text-green-500";
      icon.textContent = "✔️";
      input.parentElement.appendChild(icon);
    } else {
      const error = document.createElement("small");
      error.className = "status-error text-red-500 block mt-1";
      error.textContent = msg;
      input.parentElement.appendChild(error);
    }
  }

  Object.entries(shippingFields).forEach(([id, {validator, message}]) => {
    const input = document.getElementById(id);

    input.addEventListener("input", () => {
    
      if (["fullname","street"].includes(id)) input.value = input.value.replace(/[0-9]/g, "");
      if (["houseNumber","phone","card"].includes(id)) input.value = input.value.replace(/\D/g,"");

      
      if (id === "card") {
        let digits = input.value.slice(0,16);
        input.value = digits.replace(/(.{4})(?=\d)/g,"$1 ");
      }

      showStatus(input, validator(input.value), message);
    });

    input.addEventListener("blur", (e) => {
      if (!validator(input.value)) e.target.focus();
      else input.parentElement.querySelectorAll(".status-icon").forEach(el => el.remove());
    });
  });
});

// اظهار واخفاء القائمة عند الضغط
const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');
const closeSidebar = document.getElementById('close-sidebar');

menuBtn.addEventListener('click', () => {
  sidebar.classList.remove('translate-x-full');
});

closeSidebar.addEventListener('click', () => {
  sidebar.classList.add('translate-x-full');
});


//  الوجوه الخلفية قابلة للضغط فليب
const cardElements = document.querySelectorAll(".perfume-card img, .perfume-card > div:last-child");

cardElements.forEach(el => {
  el.addEventListener("click", () => {
    const card = el.closest(".perfume-card");
    const items = card.querySelectorAll(".perfume-item"); 

    card.classList.add("rotate-y-180");     

    items.forEach(item => {
      item.classList.add("hidden");
      item.classList.remove("show");
    });

    let current = 0;

    function showNextItem() {
      if (current < items.length) {
        const item = items[current];
        item.classList.remove("hidden");
        item.classList.add("transition-all", "duration-500", "opacity-100");

        setTimeout(() => {
          item.classList.add("hidden");
          item.classList.remove("opacity-100");
          current++;
          showNextItem();
        }, 3000); 
      } else {
        card.classList.remove("rotate-y-180");
      }
    }

    showNextItem(); 
  });
});

// دالة للكاروسيل
const carousel = document.getElementById('carousel');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const cardWidth = carousel.children[0].offsetWidth; 
next.addEventListener('click', () => {
  carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
});

prev.addEventListener('click', () => {
  carousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
});

// زيادة عداد السلة
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartIcon = document.getElementById('cart-icon');
let count = 0;

document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.perfume-card');
        const name = card.querySelector('h3').innerText;

        const pPrice = card.querySelector('p');
        const spanPrice = card.querySelector('span.text-yellow-400');
        let price = '';
        if (pPrice) {
            price = pPrice.innerText.replace('السعر: ', '');
        } else if (spanPrice) {
            price = spanPrice.innerText;
        }

        const img = card.querySelector('img');
        const imgSrc = img?.src;

        count++;
        cartCount.innerText = count;
        const li = document.createElement('li');
        li.className = 'flex items-center gap-2';
        li.innerHTML = `
            <img src="${imgSrc}" class="w-12 h-12 object-cover rounded">
            <div class="text-sm">
                <p class="font-semibold">${name}</p>
                <p class="text-gray-600">${price}</p>
            </div>
        `;
        cartItems.appendChild(li);


        // حركة الصورة
        if(imgSrc){
            const fly = img.cloneNode();
            fly.style.position = 'fixed';
            fly.style.width = '50px';
            fly.style.height = '50px';
            fly.style.left = img.getBoundingClientRect().left + 'px';
            fly.style.top = img.getBoundingClientRect().top + 'px';
            fly.style.zIndex = 1000;
            fly.style.transition = 'all 1.5s ease-in-out';
            document.body.appendChild(fly);

            const rect = cartIcon.getBoundingClientRect();
            requestAnimationFrame(() => {
                fly.style.left = rect.left + 'px';
                fly.style.top = rect.top + 'px';
            });

            fly.addEventListener('transitionend', () => {
                fly.style.transition = 'transform 0.3s ease-in-out';
                fly.style.transform = 'scale(0.5)';
                setTimeout(() => fly.remove(), 300);
            });
        }
    });
});


// العناصر في صفحة السلة
document.addEventListener('DOMContentLoaded', () => {
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const paymentBtn = document.getElementById('payment-btn');
  let cart = JSON.parse(localStorage.getItem('cartData')) || [];

  renderCart();

  document.getElementById('cart-icon').addEventListener('click', () => {
    cartSidebar.classList.remove('translate-x-full');
  });
  document.getElementById('close-cart').addEventListener('click', () => {
    cartSidebar.classList.add('translate-x-full');
  });

  
  document.querySelectorAll('.product').forEach(button => {
    const addBtn = button.querySelector('.add-to-cart');
    if (!addBtn) return;
    
    addBtn.addEventListener('click', () => {
      const id = button.dataset.id;
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price);
      const image = button.dataset.image;

      const existingItem = cart.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ id, name, price, quantity: 1, image });
      }

      saveCart();
      renderCart();
    });
  });

  paymentBtn.addEventListener('click', () => {
    saveCart(); 
    window.location.href = '../../assets/pages/payment.html';
  });

  function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
      total += item.price * item.quantity;

      const li = document.createElement('li');
      li.className = 'flex flex-row-reverse items-center gap-3 border-b border-gray-700 py-2';
      li.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
        <div class="flex-1 text-right">
          <h4 class="font-semibold text-gray-200">${item.name}</h4>
          <p class="text-gray-400">${item.price} ج.م</p>
          <div class="flex flex-row-reverse items-center gap-2 mt-1">
            <button class="decrease bg-gray-700 px-2 rounded">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="increase bg-gray-700 px-2 rounded">+</button>
          </div>
        </div>
      `;

      li.querySelector('.increase').addEventListener('click', () => {
        item.quantity += 1;
        saveCart();
        renderCart();
      });
   
      li.querySelector('.decrease').addEventListener('click', () => {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          cart = cart.filter(i => i.id !== item.id);
        }
        saveCart();
        renderCart();
      });

      cartItemsContainer.appendChild(li);
    });

    cartTotal.textContent = total.toFixed(2) + ' ج.م';
  }

  function saveCart() {
    localStorage.setItem('cartData', JSON.stringify(cart));
  }
});


// كود خاص بأحدث الاصدارات

document.addEventListener('DOMContentLoaded', () => {
  function setupGallery(trackId, dotsId) {
    const track = document.getElementById(trackId);    
    const dots = document.querySelectorAll(`#${dotsId} .dot`); 
    const pages = track ? track.children : [];      

    if (!track || !dots.length || !pages.length) return;
  
    function showSlide(index) {
      const slideWidth = pages[0].offsetWidth; 
      track.style.transform = `translateX(-${slideWidth * index}px)`;

      dots.forEach(dot => dot.classList.remove('bg-yellow-400', 'bg-gray-400'));
      dots.forEach(dot => dot.classList.add('bg-gray-400'));
      dots[index].classList.replace('bg-gray-400', 'bg-yellow-400');
    }

   
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => showSlide(i));
    });

    
    window.addEventListener('resize', () => {
      const activeIndex = [...dots].findIndex(dot => dot.classList.contains('bg-yellow-400'));
      if (activeIndex >= 0) showSlide(activeIndex);
    });
  }

 
  setupGallery('gallery-track', 'gallery-dots');
  setupGallery('mini-gallery-track', 'mini-gallery-dots');
});

 
  


  

  
