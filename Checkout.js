document.addEventListener("DOMContentLoaded", () => {
    const cardNumberInput = document.getElementById("card-number");
    const expiryDateInput = document.getElementById("expiry-date");
    const cardNameInput = document.getElementById("card-name");
    const cvvInput = document.getElementById("cvv");

    const cardNumberDisplay = document.querySelector(".card-number-display");
    const cardHolderName = document.querySelector(".card-holder-name");
    const expiryDateDisplay = document.querySelector(".expiry-date");

   
    cardNumberInput.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, ""); 
        value = value.substring(0, 16);
        let formattedValue = value.match(/.{1,4}/g)?.join(" ") || value; 
        e.target.value = formattedValue;
        cardNumberDisplay.textContent = formattedValue || "•••• •••• •••• ••••";
    });

 
    cardNameInput.addEventListener("input", (e) => {
        cardHolderName.textContent = e.target.value || "Filan Fisteku";
    });


    expiryDateInput.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, ""); 
        value = value.substring(0, 4); 
        if (value.length >= 3) {
            value = value.substring(0, 2) + "/" + value.substring(2, 4);
        }
        e.target.value = value;
        expiryDateDisplay.textContent = value || "MM/YY";
    });

    // Form submission
    const form = document.getElementById("card-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();


        const cardNumber = cardNumberInput.value.replace(/\s/g, " "); 
        const expiryDate = expiryDateInput.value;
        const cardName = cardNameInput.value;
        const cvv = cvvInput.value;

        if (cardNumber.length === 16 && expiryDate.length === 5 && cardName.trim() !== "" && cvv.length === 3) {
            alert("Card details submitted successfully!");
            window.location.href = "success.html"; 
        } else {
            alert("Please fill in all the fields correctly.");
        }
    });
});



