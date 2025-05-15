import { menu } from "./main.js";

menu;



const inputs = {
    nameInput: /^[A-Za-z ]+$/,
    emailInput: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phoneInput: /^(\+?\d{1,3})?\d{10}$/,
    ageInput: /^(1[89]|[2-9]\d)$/, // 18+
    passwordInput: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
};


function validateInput(id, regex) {
    const value = $("#" + id).val();
    const isValid = regex.test(value);
    $("#" + id.replace("Input", "Alert")).toggleClass("d-none", isValid);
    return isValid;
}


function validateRepassword() {
    const match = $("#passwordInput").val() === $("#repasswordInput").val();
    $("#repasswordAlert").toggleClass("d-none", match);
    return match;
}


function checkAllValid() {
    let allValid = true;

    for (let id in inputs) {
        if (!validateInput(id, inputs[id])) {
        allValid = false;
        }
    }

    if (!validateRepassword()) {
        allValid = false;
    }

    $("#submitBtn").prop("disabled", !allValid);
}


for (let id in inputs) {
    $("#" + id).on("input", function () {
        validateInput(id, inputs[id]);
        checkAllValid();
    });
}

$("#repasswordInput").on("input", function () {
    validateRepassword();
    checkAllValid();
});
