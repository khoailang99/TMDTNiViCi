document.addEventListener('DOMContentLoaded', function () {
    //Hiển thị các textarea thông qua CKEditor
    CKEDITOR.replace("Description");
    CKEDITOR.replace("Content");

    // Hiển thị thông số kỹ thuật
    $("#PC-ac__product-type-ddl").change(function () {
        $.ajax({
            url: '/Product/GetSpecificationsPC',
            type: "GET",
            data: { PCId: $(this).children("option:selected").val() },
            success: function (partialViewResult) {
                $(".PC-ac__container-specification-category").html(partialViewResult);
            },
            error: function (err) {
                console.log(err)
            }
        });
    });

    // Thêm sự kiện click cho nút chọn nhiều ảnh
    document.querySelector(".box__select-many-images>label").addEventListener("click", (e) => {
        if ($("#PC-ac__product-image").val() == "") {
            showNotification("error", "Bạn phải chọn hình ảnh chính trước!");
            e.preventDefault();
        }
    }, false);

    // reset lại các trường form khi người dùng click vào nút reset
    $(".bsr__btn-reset").click((e) => {
        let arrOriginalValueSelectTag = [...arrConstOriginalValueSelectTag, ...arrOriginalValueSelectTagPV];
        document.querySelectorAll("select").forEach((elem, index) => {
            $(elem).val(arrOriginalValueSelectTag[index]).selectpicker("refresh");
            $(elem).next().css("background", "#ea9a3b");
        });
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

    //Lưu danh sách ảnh đc tải lên vào server
    //Lưu danh sách ảnh đc tải lên vào server
    $(".bsr__btn-submit").click((e) => {
        if (!validateFormElements()) {
            showNotification("error", "Bạn phải điền hoặc chọn các thông tin bắt buộc!", 5);
            e.preventDefault(); //e.stopPropagation();
            return;
        }

        document.querySelectorAll(".ip-contain-only-numb").forEach((elem) => {
            elem.value = elem.value.replace(/,/g, "");
        });

        let pathFolderContainImg = $("#PC-ac__product-image").val().split("/");
        pathFolderContainImg.pop();
        formdata.append('directoryPath', pathFolderContainImg.join("/"));
        activationOverloading("flex");
        $.ajax({
            url: '/Product/UploadFiles',
            type: "POST",
            contentType: false,
            processData: false,
            data: formdata,
            async: false,
            success: function (result) {
                return;
            },
            error: function (err) {
                console.log("Lỗi lưu ảnh vào server");
            }
        });
    });
}, false)