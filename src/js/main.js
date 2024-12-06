import JustValidate from 'just-validate';
import { rule } from 'postcss';

const formEl = document.getElementById("courierRequestForm")

const localStorageKey = "courierData";

const validateForm = new JustValidate(formEl,
    { validateBeforeSubmitting: true },
);

validateForm.addField("#name", [
    {
        rule: "required",
    },
    {
        rule: "minLength",
        value: 3,
    },
    {
        rule: "maxLength",
        value: 20,
    },
],
    { errorLabelCssClass: ["form-error"] },    // "text-sm", "mt-2" This format accessing Error Code
)

validateForm.addField("#number", [
    {
        rule: "required",
    },
    {
        rule: 'number',
    },
    {
        rule: "minLength",
        value: 10,
    },
    {
        rule: "maxLength",
        value: 10,
    },
],
    { errorLabelCssClass: ["form-error"] },
)

validateForm.addField("#pickupDate", [
    {
        rule: "required",
    },
],
    { errorLabelCssClass: ["form-error"] },
)

validateForm.addField("#pickupArea", [
    {
        rule: "required"
    },
],
    { errorLabelCssClass: ["form-error"] },
)


validateForm.onSuccess(() => {

    const formData = new FormData(formEl);

    const formValObj = Object.fromEntries(formData.entries());

    let newCorierData = [];

    // Get existing LocalStorage value, if its exist
    const existingCourierData = localStorage.getItem(localStorageKey);

    // Parse that string into JavaScript value
    const existingCourierArray = JSON.parse(existingCourierData);

    if (existingCourierArray) {
        // Create a new array and push the existing localstorage value into new array
        existingCourierArray.push(formValObj);

        // Push the new array (which has all the info to the localstorage)
        localStorage.setItem(localStorageKey, JSON.stringify(existingCourierArray));

    } else {
        newCorierData.push(formValObj)

        localStorage.setItem(localStorageKey, JSON.stringify(newCorierData));
    }

    alert("Corier Request submitted successfully!");
    formEl.reset();
});

