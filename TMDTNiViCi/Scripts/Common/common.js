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

// Phân trang
class Pagination {
	constructor(totalPages, defaultPageNumbs) {
		this.totalPages = totalPages;
		this.defaultPageNumbs = defaultPageNumbs;
		this.numbPages = this.totalPages > this.defaultPageNumbs ? this.defaultPageNumbs : this.totalPages;;
		this.breakPSTS = Math.ceil(this.numbPages / 2) - 2; // Điểm ngắt sử dụng trong biểu thức để xác định khi nào hiển thị 2 phân cách (2 dấu breakPSTS chấm) trên phân trang.
	}

	f_runPagination() {
		this.pagingInit();
		// Thêm sự kiện click cho các nút phân trang
		document.querySelectorAll(".pa__list-page-numbers button").forEach((elem) => {
			elem.addEventListener("click", (e) => {
				let valTargetBtn = Number(elem.getAttribute('data-page'));
				let prevPage = Number(document.querySelector("button.active").getAttribute('data-page'));
				if (valTargetBtn == 0 || valTargetBtn > this.totalPages || valTargetBtn < 1 || prevPage == valTargetBtn) { return; }
				document.querySelector("button.active").classList.remove("active");
				if (this.totalPages > this.numbPages) {
					this.handlePagin(valTargetBtn);
				} else {
					this.updatePagingBtnPrevNext(valTargetBtn);
					document.querySelectorAll(".lpn__pagin-btn").forEach((elem, index) => {
						this.updatePagingBtn(elem, valTargetBtn, index + 1);
					});
				}
				this.getProductsFromDb(valTargetBtn);
			}, false);
		});
	}

	getProductsFromDb(page) {
		activeProgressBar();
		$.ajax({
			url: '/Product/GetProductList',
			type: "GET",
			data: { numbProd: Number(document.querySelector('.pnd__ip-prod-numb').value.trim()), pageNumb: page },
			success: function (partialViewResult) {
				$("#aap__wrap-prod-list").html(partialViewResult);
				finishProgressBar();
			},
			error: function (err) {
				console.log(err);
				showNotification("error", "Lỗi khi tải ảnh từ Server!");
			}
		});
    }

	refreshUlToDefault() {
		let ulContainPagingBtn = document.querySelector('.pa__list-page-numbers');
		let allChildUl = document.querySelectorAll('.pa__list-page-numbers li');
		let numbChildrenUl = ulContainPagingBtn.childElementCount;
		if (numbChildrenUl > 2) {
			ulContainPagingBtn.innerHTML = allChildUl[0].outerHTML + allChildUl[numbChildrenUl - 1].outerHTML;
		}
	}

	pagingInit() {
		this.refreshUlToDefault();
		let strPagingBtnHTML = "";
		let txtPagingBtn = 0;
		for (let i = 1; i <= this.numbPages; i++) {
			txtPagingBtn = (i == this.numbPages) ? this.totalPages : ((i == this.numbPages - 1 && this.totalPages > this.numbPages) ? "..." : i);
			strPagingBtnHTML += `<li><button class="disable-btn-default-bootstrap padding-tb-lf-5-20 lpn__pagin-btn ${i == 1 ? "active" : ""}" data-page="${isNaN(txtPagingBtn) ? 0 : txtPagingBtn}"> ${txtPagingBtn}</button></li>`;
		}
		$(strPagingBtnHTML).insertAfter('.pa__list-page-numbers .left-arow');
	}

	handlePagin(page) {
		let txtPagingBtn = 0, count = 0;
		let pagingBtns = document.querySelectorAll(".lpn__pagin-btn");
		let middleIndex = Math.ceil(this.numbPages / 2);
		if ((page - 1) <= this.breakPSTS) {
			pagingBtns.forEach((elem) => {
				txtPagingBtn = (++count == this.numbPages - 1) ? "..." : ((count == this.numbPages) ? this.totalPages : count);
				this.updatePagingBtn(elem, page, txtPagingBtn);
			});
		} else if ((this.totalPages - page) <= this.breakPSTS) {
			let lastPages = this.totalPages + 3 - this.numbPages;
			pagingBtns.forEach((elem) => {
				txtPagingBtn = (++count == 2) ? "..." : ((count == 1) ? 1 : lastPages++);
				this.updatePagingBtn(elem, page, txtPagingBtn);
			});
		} else {
			pagingBtns.forEach((elem) => {
				txtPagingBtn = (++count == 1 || count == this.numbPages) ? ((count == 1) ? 1 : this.totalPages) : ((Math.abs(middleIndex - count) > this.breakPSTS - 1) ? "..." : page - (middleIndex - count));
				this.updatePagingBtn(elem, page, txtPagingBtn);
			});
		}
		this.updatePagingBtnPrevNext(page);
	}

	updatePagingBtnPrevNext(page) {
		document.querySelector(".lf__prev-page").setAttribute('data-page', page - 1);
		document.querySelector(".rr__next-page").setAttribute('data-page', page + 1);
	}

	updatePagingBtn(elemBtn, page, txtPagingBtn) {
		elemBtn.innerHTML = txtPagingBtn;
		elemBtn.setAttribute('data-page', isNaN(txtPagingBtn) ? 0 : txtPagingBtn);
		if (page == txtPagingBtn) {
			elemBtn.classList.add("active");
		}
	}
}