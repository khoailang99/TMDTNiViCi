export default class AddProduct {
    constructor() {
        this.arrConstOriginalValueSelectTag = [];
        this.arrOriginalValueSelectTagPV = [];
        this.formdata = new FormData();
    }

    // Xử lý responsive
    handleResponsive() {
        let browserWindow = window.matchMedia("(min-width: 450px)");
        // Lấy html của các phần tử html mà hiển thị hình ảnh chính và các hình ảnh liên quan và thêm đến vị trí tg ứng trong responsive
        let cardContainerProImgHTML = document.querySelector(".opi__card-container-pro-img .PC-ac__grid-container");
        let arrElemDeleted = [], arrElemDeletedRps = [];

        function rpsAddRemoveElemFromDom(wd) {
            if (wd.matches) {
                if (cardContainerProImgHTML.childElementCount == 0 && $(".tc__detail-info-product .rps__product-image").length > 0) {
                    console.log(" > 450 roi em e!")
                    arrElemDeleted.splice(0, arrElemDeleted.length);
                    Array.prototype.forEach.call(document.querySelectorAll(".rps__product-image"), function (elem) {
                        arrElemDeleted.push(elem.parentNode.removeChild(elem));
                    });
                    arrElemDeleted.forEach(elem => { cardContainerProImgHTML.appendChild(elem) })
                }
            } else {
                if ($(".tc__detail-info-product .rps__product-image").length == 0 && cardContainerProImgHTML.childElementCount > 0) {
                    arrElemDeletedRps.splice(0, arrElemDeletedRps.length);
                    while (cardContainerProImgHTML.firstElementChild) {
                        arrElemDeletedRps.push(cardContainerProImgHTML.removeChild(cardContainerProImgHTML.firstElementChild));
                    }
                    $(".tc__detail-info-product .PC-ac__grid-container").append(arrElemDeletedRps[0].outerHTML + arrElemDeletedRps[1].outerHTML);
                    $(".tc__orther-product-info .opi__card-contain-seo-info .PC-ac__grid-container").append(arrElemDeletedRps[2]);
                }
            }
        }
        rpsAddRemoveElemFromDom(browserWindow);
        browserWindow.addListener(rpsAddRemoveElemFromDom);
    }

    // Đánh dấu các phần tử ko đc để trống
    marksElemsNonBlank() {
        Array.prototype.forEach.call(document.querySelectorAll(".form-elem-tested"), function (elem) {
            $(elem).parent().prev().children(".requied-fields").text("*");
        });
    }

    // Lấy các giá trị ban đầu của các phần tử select
    getOriginalValueSelectTag() {
        let objAddProduct = this;
        document.querySelectorAll(".selectpicker-constant").forEach((elem, index) => {
            $(elem).on('loaded.bs.select', function (e, clickedIndex, isSelected, previousValue) {
                $(elem).parent().prev().css({ "z-index": "0" });
                objAddProduct.arrConstOriginalValueSelectTag.push(elem.value);
                if (index == 3) {
                    finishProgressBar();
                }
            });
        });
    }

    // Lấy các giá trị ban đầu của các phần tử seclect loại thông số kĩ thuật
    getOriginalValueSelectTagPV() {
        let objAddProduct = this;
        this.arrOriginalValueSelectTagPV.splice(0);
        document.querySelectorAll(".selectpicker-partialView").forEach((elem) => {
            $(elem).on('loaded.bs.select', function (e, clickedIndex, isSelected, previousValue) {
                changeBackgroundSpeType(elem);
                objAddProduct.arrOriginalValueSelectTagPV.push(elem.value);
            });
        });
    }

    // Thêm inline editor trên phần nhập thông số kĩ thuật
    triggerInlineEditor() {
        tinymce.init({
            selector: '.tbs__value-specification',
            element_format: 'html',
            inline: true,
            language: 'vi',
            skin: 'oxide-dark',
            plugins: 'advlist anchor autolink charmap code codesample directionality fullpage help hr image imagetools insertdatetime link lists media nonbreaking pagebreak preview print searchreplace table template textpattern toc visualblocks visualchars wordcount',
            toolbar: 'undo redo | formatselect | bold italic strikethrough forecolor backcolor blockquote | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat'
        });
    }

    // Hiển thị thông số kĩ thuật của và các danh mục loại sản phẩm tương ứng
    triggerChangeEvProdType() {
        let objAddProduct = this;
        $("#PC-ac__product-type-ddl").change(function () {
            activeProgressBar();
            activationOverloading("block");
            $.ajax({
                url: '/Product/GetPVCategorySpecificationsPC',
                type: "GET",
                data: { PCId: $(this).children("option:selected").val(), ProdId: 0 },
                success: function (partialViewResult) {
                    $(".PC-ac__container-specification-category").html(partialViewResult);

                    $('.ts__list-specifications-type').selectpicker();
                    objAddProduct.marksElemsNonBlank();
                    objAddProduct.getOriginalValueSelectTagPV();
                    objAddProduct.triggerInlineEditor();

                    // Thêm caption (Text của loại sản phẩm) cho bảng danh mục 
                    // Ko sử dụng jquery: document.getElementById("Supplier").options[e.selectedIndex].value or .text;
                    $(".cpc__lpc__caption").text($("#PC-ac__product-type-ddl").children("option:selected").text());   
                    objAddProduct.triggerClickEvMCloseBtnSC();

                    finishProgressBar();
                    activationOverloading("none");
                },
                error: function (err) {
                    console.log(err)
                }
            });
        });
    }

    // Thêm sự kiện click cho nút đóng modal chọn danh mục sản phẩm
    triggerClickEvMCloseBtnSC() {
        $('#modal__prod-category').on('shown.bs.modal', function (e) {
            $(".modal__btn-close-modal-pc").click((e) => { // Hiển thị số danh mục đc chọn
                let count = 0, listCategories = ',';
                document.querySelectorAll(".cpc__list-prod-categories tbody input").forEach((elem) => {
                    if (elem.checked) {
                        ++count;
                        listCategories += elem.value + ',';
                    }
                });

                document.querySelector("#Category").value = listCategories == ',' ? "" : listCategories;
                document.querySelector(".cpc__bcm__notice-selected-ctg").innerHTML = count + " danh mục được chọn";
            });
        });
    }

    // Thêm sự kiện click cho các nút chọn hình ảnh chính và seo
    triggerClickEvImgSelectBtns() {
        document.querySelectorAll(".PC-ac__btn-select-image").forEach((elem) => {
            elem.addEventListener("click", (e) => {
                e.preventDefault();
                let ckfilder = new CKFinder();
                ckfilder.selectActionFunction = function (url) {
                    $(elem).parent().parent().prev().val(url);
                    $(elem).parent().next().html(`<img src="${url}" />`);
                };
                ckfilder.popup();
            });
        });
    }

    // Thêm sự kiện change cho input[type="file"] khi tải nhiều ảnh lên
    triggerChangeEvIUploadMulImgs() {
        $("#PC-ac__ip-many-product-images").click(function (e) {
            if ($("#PC-ac__product-image").val() == "") {
                showNotification("error", "Bạn phải chọn hình ảnh chính trước!");
                return false;
            }
        }).change(function (e) {
            this.handleDSMulImages(e);
        }.bind(this));
    }

    //Xử lý hiển thị và lưu trữ hình ảnh khi người dùng upload nhiều ảnh lên
    handleDSMulImages(e) {
        let uploadedPhotoList = "";
        let htmlBoxContaintManyPicture = $(event.target).parent().next();
        let numbOriginalImg = htmlBoxContaintManyPicture.children().length;
        let numbPhoto = numbOriginalImg + event.target.files.length;
        let len = (numbPhoto > 10) ? 10 - numbOriginalImg : event.target.files.length;
        let promisePhotoDisplay = new Promise(resolve => {
            for (let i = 0; i < len; i++) {
                this.formdata.append(event.target.files[i].name, e.target.files[i]);
                uploadedPhotoList += e.target.files[i].name + ",";
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[i]);
                reader.onload = function (evOnload) {
                    $(e.target).parent().next().append(`<img src="${evOnload.target.result}" alt="${e.target.files[i].name}" />`);
                    if (i == len - 1) { resolve(); }
                };
            }
        });
        promisePhotoDisplay.then(() => {
            if (numbPhoto > 10) {
                document.querySelector(".box__display-image-list").innerHTML += "<span style='font-size: 18px; font-weight: 600;'> .... </span>";
            }
        });
        $("#MoreImages").val(($("#MoreImages").val() == "" ? "" : ($("#MoreImages").val() + ',')) + uploadedPhotoList.substring(0, uploadedPhotoList.length - 1));
        this.updateNotiAfterUploadPhoto(numbPhoto);
        this.triggerClickEvUploadedImgs();
        $('[data-toggle="tooltip"]').tooltip();
    }

    // Thêm sự kiện click cho nút submit form thêm sản phẩm
    triggerClickEvSubmitBtnAPF() {
        $(".bsr__btn-submit").click(function(e) {
            if (!validateFormElements()) {
                showNotification("error", "Bạn phải điền hoặc chọn các thông tin bắt buộc!", 4);
                e.preventDefault(); //e.stopPropagation();
                return;
            }

            document.querySelectorAll(".ip-contain-only-numb").forEach((elem) => {
                elem.value = elem.value.replace(/\./g, "");
            });

            let pathFolderContainImg = $("#PC-ac__product-image").val().split("/");
            pathFolderContainImg.pop();
            this.formdata.append('directoryPath', pathFolderContainImg.join("/"));
            activationOverloading("flex");
            $.ajax({ //Lưu danh sách ảnh đc tải lên vào server
                url: '/Product/UploadFiles',
                type: "POST",
                contentType: false,
                processData: false,
                data: this.formdata,
                async: false,
                success: function (result) {
                    return;
                },
                error: function (err) {
                    console.log("Lỗi lưu ảnh vào server");
                }
            });
        }.bind(this));
    }
    
    // Cập nhật thông báo về số ảnh đc tải lên
    updateNotiAfterUploadPhoto(numbPhoto) {
        $('.box__select-many-images span').html(numbPhoto + " ảnh được chọn");
        $(".impi__display-numb-image").attr("data-original-title", numbPhoto + " ảnh được chọn");
        $(".impi__display-numb-image").attr("data-numb-image", numbPhoto);
    }

    // Thêm sự kiện click cho mỗi hình ảnh đc tải lên
    triggerClickEvUploadedImgs() {
        // Xử lý xóa trên mỗi ảnh đc tải lên khi click
        $(".box__display-image-list").click(function(e) {
            if (e.target !== e.currentTarget) {
                e.currentTarget.removeChild(e.target);
                let photoName = e.target.getAttribute("alt");
                let arrImages = $("#MoreImages").val().split(',');
                
                this.updateNotiAfterUploadPhoto(parseInt($(".impi__display-numb-image").attr("data-numb-image")) - 1);
                
                arrImages.splice(arrImages.indexOf(photoName), 1);
                $("#MoreImages").val(arrImages.join(","));
                if (this.formdata.has(photoName)) {
                    this.formdata.delete(photoName);
                }
            }
        }.bind(this));
    }

    // Tạo đối tượng thông số kĩ thuật
    Specification(SpecificationID, ProductID, Value, Status, IsDeleted = 0, TypeSpecifications) {
        return { SpecificationID, ProductID, Value, Status, IsDeleted, TypeSpecifications};
    }

    //Thêm thông số kỹ thuật vào db khi nhận đc ID của sản phẩm
    onSuccessWAddProdKeyInfo(productID) {
        let objAddProduct = this;
        let arrSpecification = [];
        if (productID == 0) {
            activationOverloading("none");
            showNotification("error", "Lỗi khi thêm sản phẩm!");
            return;
        }
                
        $(".PC-ac__table-specifications tbody tr").each(function (index, el) {
            let vs = $(this).find('.tbs__value-specification');
            
            arrSpecification.push(objAddProduct.Specification(
                parseInt(vs.attr('data-specification-id')),
                productID,
                vs.html(),
                $(this).find('.tbs__cb-display-specification').is(':checked') ? 1 : 0,
                $(this).find('.tbs__cb-delete-specification').is(':checked') ? 1 : 0,
                $(this).find(".ts__list-specifications-type").children("option:selected").val())
            );
        });

        $.ajax({
            url: "/Specification/InsertSpecificationsSC",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify({ specificationListParam: arrSpecification }),
            traditional: true,
            success: function (response) {
                activationOverloading("none");
                if (response) {
                    showNotification("success", "Thành công và đang chuyển hướng", 3);
                    setTimeout(() => {
                        window.location.href = "/Admin/Product/Index";
                    }, 1500)
                } else {
                    showNotification("error", "Lỗi khi thêm thông số kĩ thuật!");
                }
            },
            error: function (err) {
                console.log(err)
                activationOverloading("none");
                showNotification("error", "Lỗi đường dẫn!");
            }
        });
        //Đọc thêm ở đây: https://www.codeproject.com/Questions/1139322/Javascript-array-to-MVC-controller
    }

    // Lỗi khi ko nhận đc ID sản phẩm
    onFailureWAddProdKeyInfo() {
        activationOverloading("none");
        showNotification("error", "Lỗi hệ thống");
    }

    // Phần cập nhật sản phẩm
    // Thêm checked cho các input danh mục đã được chọn từ trước
    addCheckedToCategoryInput() {
        let strCategories = document.querySelector("#Category").value;
        if (strCategories.trim() == "") { return; }
        document.querySelector(".cpc__bcm__category-select-btn").addEventListener("click", (e) => {
            document.querySelectorAll(".cpc__list-prod-categories input").forEach((elem) => {
                if (elem.value != "" && strCategories.search(elem.value) > 0) {
                    elem.setAttribute("checked", "checked");
                }
            });
        }, false);
        document.querySelector(".cpc__bcm__notice-selected-ctg").innerHTML = strCategories.split(",").length - 2 + " danh mục được chọn";
    }

    // Hiển thị các hình ảnh chính, liên quan và seo
    displayMainARelatedImg() {
        if ($("#PC-ac__product-image").val().trim() == "") { return; }
        // Hiển thị hình ảnh chính
        $("#PC-ac__product-image").next().find(".ui__display-image").html(`<img src= ${$("#PC-ac__product-image").val()} />`);
        // Hiển thị hình ảnh seo
        $("#PC-ac__seo-image").next().find(".ui__display-image").html($("#PC-ac__seo-image").val() == "" ? "" : `<img src= ${$("#PC-ac__seo-image").val()} />`);

        // Hiển thị các hình ảnh liên quan
        let arrAssociatedImages = $("#MoreImages").val().split(',');
        let photoPath = $("#PC-ac__product-image").val().split('/');
        photoPath = photoPath.slice(1, photoPath.length - 1);
        arrAssociatedImages.forEach((value) => {
            $("#MoreImages").parent().next().append(`<img src="${'/' + photoPath.join('/') + '/' + value}" alt="${value}" />`);
        });
        this.updateNotiAfterUploadPhoto(arrAssociatedImages.length);
        $('[data-toggle="tooltip"]').tooltip();
    }

    changeBackgroundSpeTypeAP() {
        let elemTableSpecification = document.querySelector(".PC-ac__table-specifications");
        if (typeof (elemTableSpecification) != 'undefined' && elemTableSpecification != null) {
            document.querySelectorAll(".csc__part-specification select").forEach((elem, index) => {
                $(elem).on('loaded.bs.select', function (e, clickedIndex, isSelected, previousValue) {
                    changeBackgroundSpeType(elem);
                });
            });
        }
        
    }
    // Kết thúc phần cập nhật sản phẩm

    // Thêm sự kiện click cho nút reset form thêm sản phẩm
    triggerClickEvBtnResetProdAddF() {
        let objAddProduct = this;
        $(".bsr__btn-reset").click((e) => {
            //let arrOriginalValueSelectTag = [...arrConstOriginalValueSelectTag, ...arrOriginalValueSelectTagPV];
            document.querySelectorAll(".csc__part-specification select").forEach((elem, index) => {
                $(elem).val(objAddProduct.arrOriginalValueSelectTagPV[index]).selectpicker("refresh");
                changeBackgroundSpeType(elem);
            });
            $(".tc__detail-info-product>.PC-ac__grid-container .selectpicker").val("").selectpicker("refresh");
            for (let key in CKEDITOR.instances) {
                CKEDITOR.instances[key].setData('', function () { this.updateElement(); })
            }
            $(".ui__display-image").html("");
            updateNotiAfterUploadPhoto(0);
            document.querySelector(".opi__related-images .box__display-image-list").innerHTML = "";
            const keys = [];
            for (const key of formdata.keys()) {
                keys.push(key);
            }
            for (const idx in keys) {
                formdata.delete(keys[idx]);
            }
        });
    }
}