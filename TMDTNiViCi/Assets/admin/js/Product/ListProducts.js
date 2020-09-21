document.addEventListener('DOMContentLoaded', function () {
    // Điều kiện cho giá trị biểu thị số sản phẩm được hiển thị
    $(".pnd__ip-prod-numb").focusin(function () {
        $(this).parent().attr('data-pro-numb-displayed', '(Giá trị phải nhỏ hơn 100 và lớn hơn 7)');
        $(this).attr('data-invalid', '0');
    });
    $(".pnd__ip-prod-numb").focusout(function () {
        let val = Number($(this).val());
        if (val >= 8 && val < 100) {
            $(this).parent().attr('data-pro-numb-displayed', '(Thỏa mãn)');
            $(this).attr('data-invalid', '1');
        }
    });

}, false)