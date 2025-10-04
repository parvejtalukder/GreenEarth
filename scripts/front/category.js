
// const catID = `cat${idNo}`;
//     const cat = document.getElementById(catID);
//     // console.log(cat);
//     removeActive();
//     cat.classList.add("active");

const AllTrees = () => {
    document.getElementById('loadingGif').classList.remove('hidden');
    document.getElementById('cardsID').classList.add('hidden');
    fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((json) => {
        document.getElementById('loadingGif').classList.add('hidden');
        document.getElementById('cardsID').classList.remove('hidden');
        showTrees(json.plants);
    });
    removeActive();
    const allCat = document.getElementById("cat0").classList.add("active");
}

const Category = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then((json) => {
        const categories = json.categories;
        CategoryDisplay(categories);
    });
}

const CategoryDisplay = (cats) => {
    const buttonsDiv = document.getElementById("categoryID");
    // buttonsDiv.innerHTML = "";
    for(const cat of cats) {
        const buttonEle = document.createElement("div");
        buttonEle.innerHTML = `
            <button id="cat${cat.id}" onclick="categoryPlants(${cat.id})" class="catCl w-full h-[35px] flex flex-row justify-start items-center px-[10px] py-2 rounded-sm text-black hover:text-white hover:bg-[#34e277]">
                ${cat.category_name}
            </button>
        `;
        buttonsDiv.appendChild(buttonEle);  
    }
}
const removeActive = () => {
    const find = document.querySelectorAll(".catCl");
    find.forEach(got => got.classList.remove("active"));
}
const categoryPlants = (idNo) => {
    // console.log(idNo);
    const catID = `cat${idNo}`;
    const cat = document.getElementById(catID);
    // console.log(cat);
    removeActive();
    cat.classList.add("active");
    document.getElementById('loadingGif').classList.remove('hidden');
    document.getElementById('cardsID').classList.add('hidden');
    const url = `https://openapi.programming-hero.com/api/category/${idNo}`;
    // btnClicked = true;
    fetch(url)
    .then((res) => res.json())
    .then((json) => {
        document.getElementById('loadingGif').classList.add('hidden');
        document.getElementById('cardsID').classList.remove('hidden');
        showTrees(json.plants);
    });
}

const showTrees = (plants) => {
    const treesCard = document.getElementById("cardsID");
    treesCard.innerHTML = " ";
    for(const tree of plants) {
        const plant = document.createElement("div");
        const firstFewWords = tree.description.substring(0, 100);
        plant.innerHTML = `
            <div class="w-auto h-auto flex flex-col justify-center items-center p-4 rounded-md bg-white">
                            <img src="${tree.image}" alt="frute" class="rounded-md w-full h-[185px]">
                            <div class="flex flex-col gap-3">
                                <h2 class="mt-3 text-gray-900 text-[14px] font-semibold" onclick="showPopUp(${tree.id})">${tree.name}</h2>
                                <p class="text-gray-800 text-[12px] font-normal">${firstFewWords}...</p>
                                <div class="flex justify-between items-center">
                                    <div class="w-auto h-[28px] flex justify-center items-center rounded-full px-2 pb-0.5 bg-[#dcfce7] text-[#157c3d] text-[14px] font-medium">${tree.category}</div>
                                    <p class="text-gray-900 text-[14px] font-semibold text-right">৳<span id="priceID">${tree.price}</span></p>
                                </div>
                                <button class="w-full h-[43px] flex flex-row justify-center items-center py-3 px-5 rounded-full bg-[rgba(21,128,61,1)] text-white text-[16px] font-medium" onclick="cartBtn('${tree.name}', ${tree.price})">Add to Cart</button>
                            </div>
            </div>
        `;
        treesCard.appendChild(plant);
    }
}

const showPopUp = (idNo) => {
  const url = `https://openapi.programming-hero.com/api/plant/${idNo}`;
  fetch(url)
    .then((res) => res.json())  
    .then((json) => {
      const tree = json.plants;  

      if (!tree) {
        console.error("No data found for this plant id");
        return;
      }

      const container = document.getElementById("popCardContainer");

      // Clear previous content (set to empty string, not via innerHTML on new div)
      container.innerHTML = "";

      // Create a div element to hold the card content
      const cardDiv = document.createElement("div");
      cardDiv.className = "w-auto h-auto flex flex-col justify-center items-center p-4 rounded-md bg-white";

      // Generate card HTML content
      cardDiv.innerHTML = `
        <img src="${tree.image}" alt="frute" class="rounded-[12px] w-[400px] h-[185px]">
        <div class="flex flex-col gap-3">
            <h2 class="mt-3 text-gray-900 text-[14px] font-semibold">${tree.name}</h2>
            <div class="flex justify-between items-center">
                <div class="w-auto h-[28px] flex justify-center items-center rounded-full px-2 pb-0.5 bg-[#dcfce7] text-[#157c3d] text-[14px] font-medium">${tree.category}</div>
                <p class="text-gray-900 text-[14px] font-semibold text-right">৳<span id="priceID">${tree.price}</span></p>
            </div>
            <p class="text-gray-800 text-[12px] font-normal">${tree.description}</p>
        </div>
      `;

      container.appendChild(cardDiv);

      // Show the modal container
      const modalElem = document.getElementById("popupModal");
      modalElem.classList.remove("hidden");

      // Close modal button event
      document.getElementById("closeBtn").onclick = () => {
        modalElem.classList.add("hidden");
        container.innerHTML = "";  // Clear popup content on close
      };

      // Close modal on backdrop click
      modalElem.onclick = (event) => {
        if (event.target === modalElem) {
          modalElem.classList.add("hidden");
          container.innerHTML = "";
        }
      };
    })
    .catch(error => {
      console.error("Failed to fetch plant data:", error);
    });
};




const allBtn = () => {
    document.getElementById("categoryID").addEventListener("click", (event) => {
        event.preventDefault();
        document.getElementById("alltrees").style.background = "bg-[#157c3d]";
    })
}

let cartData = [];
let cartNo = 1;
const cartBtn = (name, price) => {
    let cartInfo = {
        No: cartNo++, 
        Name: name,
        Price: price
    }
    cartData.push(cartInfo);
    // console.log(cartInfo);
    ShowCart();
}

const ShowCart = () => {
    const cartList = document.getElementById("cartList");
    cartList.innerHTML = "";
    for(const cart of cartData) {
        console.log(cart);
        const cartDiv = document.createElement("div");
        cartDiv.innerHTML = `
            <div class="w-full h-[64px] flex flex-row justify-between items-center p-2 rounded-md bg-[#F0FDF4]">
                            <div class="flex flex-col justify-items-start">
                                <h2 class="text-gray-900 font-sans text-sm font-semibold leading-5 text-left">${cart.Name}</h2>
                                <p class="text-gray-600 text-[16px] font-normal text-left">৳ ${cart.Price} x 1</p>
                            </div>
                    <i class="fa-solid fa-xmark" onclick="removeCart('${cart.No}')"></i>
            </div>
        `;
        cartList.appendChild(cartDiv);
    }
    totalPrice()
}

const removeCart = (no) => {
  no = Number(no); 
    let newCart = []; 
    for (let i = 0; i < cartData.length; i++) {
        if (cartData[i].No !== no) {
        newCart.push(cartData[i]);
        }
    }
    cartData = newCart;
    ShowCart();
    totalPrice()
}

const totalPrice = () => {
    const TotalPr = document.getElementById("totalShowCase");
    TotalPr.innerText = "";
    let sum = 0; 
    for (const each of cartData) {
    sum += each.Price; 
  }
  TotalPr.innerText = sum;
}

AllTrees();
Category();
totalPrice();
// showPopUp();