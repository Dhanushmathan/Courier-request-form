import JustValidate from 'just-validate';
import { rule } from 'postcss';

const formEl = document.getElementById("courierRequestForm")

const validateForm = new JustValidate(formEl);

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
        rule: "minNumber",
        value: 10,
    },
    {
        rule: "maxNumber",
        value: 100,
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
