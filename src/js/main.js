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


function getAllCourierDatas() {
    // Get all stored corier datas which are avaliable in localStorage
    const courierData = localStorage.getItem(localStorageKey)

    const courierDataArr = JSON.parse(courierData)

    // Write those values into the table UI
    const tableEL = document.getElementById("courierDataTable")

    const fragment = document.createDocumentFragment()

    if (courierDataArr) {

        const courierCardEl = document.querySelector("#courierCard");
        courierCardEl.classList.remove("hidden");

        const finalData = courierDataArr.map((courierData) => {

            const trEl = document.createElement("tr");
            const tdCoustomerEL = document.createElement("td");
            const tdEl = document.createElement("td");
            const td2El = document.createElement("td");
            const td3El = document.createElement("td");
            const td4El = document.createElement("td");
            const td5El = document.createElement("td");
            const deleteBtnEl = document.createElement("button")

            trEl.classList.add("px-2", "py-1", "border");

            // tdCoustomerEL.classList.add("px-2", "py-1", "border");
            // tdCoustomerEL.textContent = index + 1;

            tdEl.classList.add("px-2", "py-1", "border");
            tdEl.textContent = courierData.name

            td2El.classList.add("px-2", "py-1", "border");
            td2El.textContent = courierData.number

            td3El.classList.add("px-2", "py-1", "border");
            td3El.textContent = courierData["pickup-date"]

            td4El.classList.add("px-2", "py-1", "border");
            td4El.textContent = courierData["pickup-area"]

            deleteBtnEl.className = "px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm";
            deleteBtnEl.textContent = "Delete";

            td5El.classList.add("px-2", "py-1", "border");
            td5El.append(deleteBtnEl);


            trEl.append(tdEl, td2El, td3El, td4El, td5El)
            fragment.append(trEl)
        });
        tableEL.append(fragment);

    } else {
        console.log("No value available on localStorage");
    };



    // display the UI with those datas


}
getAllCourierDatas()
