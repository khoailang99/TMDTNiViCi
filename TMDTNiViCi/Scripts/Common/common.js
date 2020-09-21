// Chỉ cho nhập số trong input
//function setInputFilter(textbox, inputFilter) {
//    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
//        textbox.addEventListener(event, function () { 
//            if (inputFilter(this.value)) {
//                this.oldValue = this.value;
//                this.oldSelectionStart = this.selectionStart;
//                this.oldSelectionEnd = this.selectionEnd;
//            } else if (this.hasOwnProperty("oldValue")) {
//                this.value = this.oldValue;
//                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
//            } else {
//                this.value = "";
//            }
//        });
//    });
//}
//setInputFilter(document.querySelector(".cc"), function (value) {
//    return /^-?\d*$/.test(value);
//});

// Chỉ cho phép nhập số
function setInputFilter(textbox, inputFilter) {
    let len = 0, val = "";
    ["input", "keyup"].forEach(function (event) {
        textbox.addEventListener(event, function (e) {
            val = this.value.replace(/,/g, "");
            if (inputFilter(val)) {
                if (e.target.value != "") {
                    arrStr = val.split("");
                    len = arrStr.length - 1;
                    for (let i = len - 1; i >= 0; i--) {
                        if ((len - i) % 3 == 0) {
                            arrStr[i] += ",";
                            this.value = arrStr.join("");
                        }
                    }
                }
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;

            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}
document.querySelectorAll(".ip-contain-only-numb").forEach((elem) => {
    setInputFilter(elem, function (value) {
        return /^-?\d*$/.test(value);
    });
});

// Không cho người dùng nhập các kí tự đặc biệt vào input cụ thể
$('.ip-contain-only-letter-numb').on('keypress', function (event) {
    var regex = new RegExp("^[a-zA-Z0-9]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
});

// Kiểm tra form trước khi submit
function validateFormElements() {
    let inputsAreChecked = document.querySelectorAll("input.form-elem-tested");
    for (let i = 0; i < inputsAreChecked.length; i++) {
        if (inputsAreChecked[i].value.trim() == "") {
            return false;
        }
    }
    return true;
}

// Hiển thị thông báo thành công, thất bại
function showNotification(typeNotice, txtMessage, time = 4) {
    alertify.set('notifier', 'position', 'top-right');
    alertify.notify(txtMessage, typeNotice, time);
}

//Hiển thị or ẩn overloading
function activationOverloading(displayValue) {
    $(".backdrop__body-backdrop___1rvky").css("display", displayValue);
}