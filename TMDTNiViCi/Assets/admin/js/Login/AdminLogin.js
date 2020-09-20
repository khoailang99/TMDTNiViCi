/*document.addEventListener("DOMContentLoaded",function(){
},false);*/

function reset_input() {
	$("#inputAcc").val("");
	$("#inputPwd").val("");
}

$(document).ready(function () {
	reset_input();

	let input_account = $("#inputAcc");
	let input_pw = $("#inputPwd");
	let acc_err_msg = $("#login-account-sm-err");
	let pw_err_msg = $("#login-pw-sm-err");
	let icon_eye_show_null = $(".icon_eye_show_null");
	let icon_eye_show = $(".icon_eye_show");
	let icon_eye_hide = $(".icon_eye_hide");
	let icon_eye_show_actived = false;
	let icon_eye_hide_actived = false;
	let pass_length = 6;

	let account_err = true, pw_err = true;
	let regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; /*kiểm tra email có hợp lệ không*/
	let regexpForAccount = /^[0-9a-zA-Z]+$/;

	input_account.focusout(function (event) {
		account_is_empty(event);
	});
	input_account.keyup(function () {
		let error_msg;
		let accountName = input_account.val().trim();
		if (regexpForAccount.test(accountName)) {
			account_err = false;
			error_msg = "";
		} else {
			account_err = true;
			error_msg = "Không được chứa dấu tiếng việt và kí tự đặc biệt!";
		}
		error_msg = (accountName.length > 0) ? error_msg : "Không được để trống"
		acc_err_msg.text(error_msg);
		check_input();
	});

	input_pw.focusout(function (event) {
		pw_is_empty(event);
	});
	input_pw.keyup(function () {
		let value_inpass = input_pw.val().trim();
		if (value_inpass.length < pass_length) {
			pw_err_msg.text(`Độ dài của mật khẩu phải lớn hơn ${pass_length} kí tự`);
			pw_err = true;
		} else {
			if (pass_check_f(value_inpass)) {
				pw_err_msg.text("Mật khẩu không được chứa dấu tiếng việt hoặc dấu cách");
				pw_err = true;
			} else {
				pw_err_msg.text('');
				pw_err = false;
			}
		}
		if (value_inpass != "") {
			icon_eye_show_null.css("display", "none");
			if (!(icon_eye_show_actived != icon_eye_hide_actived) || input_pw.val().trim().length == 1) {
				icon_eye_show.css("display", "block");
			}

		} else {
			initial_state_icon_eye();
			input_pw.attr('type', 'password');
		}
		check_input();
	});

	icon_eye_show.click(function (event) {
		icon_eye_show_actived = false;
		icon_eye_hide_actived = true;
		input_pw.attr('type', 'text');
		icon_eye_show.css("display", "none");
		icon_eye_hide.css("display", "block");
	});

	icon_eye_hide.click(function () {
		icon_eye_show_actived = true;
		icon_eye_hide_actived = false;
		input_pw.attr('type', 'password');
		icon_eye_hide.css("display", "none");
		icon_eye_show.css("display", "block");
	});

	$("#login-btn-sm").click(function () {
		if (input_pw.val().trim().length == 0) {
			pw_is_empty(null);
		}
		if (input_account.val().trim().length == 0) {
			account_is_empty(null);
		}

		if (!check_input()) {
			return false;
		}
	});
	// End event handle section

	// Processing function
	function pass_check_f(str_pass) {
		let regexp_in_input_pass = /[" "`~ạảãàáâậầấẩẫăắằặẳẵóòọõỏôộổỗồốơờớợởỡéèẻẹẽêếềệểễúùụủũưựữửừứíìịỉĩýỳỷỵỹđẠẢÃÀÁÂẬẦẤẨẪĂẮẰẶẲẴÓÒỌÕỎÔỘỔỖỒỐƠỜỚỢỞỠÉÈẺẸẼÊẾỀỆỂỄÚÙỤỦŨƯỰỮỬỪỨÍÌỊỈĨÝỲỶỴỸĐ]/g;
		let result = str_pass.match(regexp_in_input_pass);
		if (result != null) {
			return true;
		}
		return false;
	}

	function check_input() {
		if (!account_err && !pw_err) {
			bool_satisfactory_input = true;
			$("#login-btn-sm").css("opacity", 1);
			return true;
		}
		bool_satisfactory_input = false;
		$("#login-btn-sm").css("opacity", 0.4);
		return false;
	}

	function initial_state_icon_eye() {
		icon_eye_show_null.css("display", "block");
		icon_eye_show.css("display", "none");
		icon_eye_hide.css("display", "none");
	}

	function account_is_empty(event) {
		if (input_account.val().trim().length == 0) {
			acc_err_msg.text("Không được để trống");
		}
	}

	function pw_is_empty(event) {
		if (input_pw.val().trim().length == 0) {
			pw_err_msg.text("Hãy nhập mật khẩu");
		}
	}

	// End processing function
});
