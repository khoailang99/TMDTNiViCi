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

// Hàm trả về chuỗi các cụm số được phân cách nhau bằng dấu dot.
function PartitionResult(strNumbs) {
	let arrStrNumb = strNumbs.split("");
	let len = arrStrNumb.length - 1;
	for (let i = len - 1; i >= 0; i--) {
		arrStrNumb[i] = ((len - i) % 3 == 0) ? arrStrNumb[i] + "." : arrStrNumb[i];
	}
	return arrStrNumb.join("");
}

// Chỉ cho phép nhập số
function setInputFilter(textbox, inputFilter) {
    let val = "";
	["input", "keydown", "keyup", "mousedown", "mouseup", "select", "drop"].forEach(function (event) {
		textbox.addEventListener(event, function (e) {
			val = this.value.replace(/\./g, '');
			if (inputFilter(val) && val[0] != "0") {
				if (!(this.getAttribute("data-divide-numb") == "false")) {
					this.value = (e.target.value != "") ? PartitionResult(val) : "";
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
function activeOnlyAllowEnterNumb(elem) {
	setInputFilter(elem, function (value) {
		return /^-?\d*$/.test(value);
	});
}
document.querySelectorAll(".ip-contain-only-numb").forEach((elem) => {
    setInputFilter(elem, function (value) {
        return /^-?\d*$/.test(value);
	});
	if (elem.value.trim() != "" && !isNaN(elem.value)) {
		elem.value = PartitionResult(Number(elem.value).toString());
	}
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

// Trả về một chuỗi không chứa dấu chấm. 
function stringNotContainDots(str) {
	return str.replace(/\./g, "");
}
