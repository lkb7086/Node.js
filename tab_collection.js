let tab_collection = {
	init : function() {
		$('#register_receipt_btn_register').on("click",function(e) {
            const id_type = $('#register_receipt_id_type').val();
            const id = $('#register_receipt_input_id').val();
			const sku = $('#register_receipt_input_sku').val();
			const order_id = $('#register_receipt_input_order_id').val();
			const season = $('#register_receipt_input_season').val();

			if(id.length == 0 || sku.length == 0 || order_id.length == 0) {
				let live_toast = document.getElementById("live_toast");
				let toast = new bootstrap.Toast(live_toast)
				document.getElementById("toast_title").innerHTML = "정보";
				document.getElementById("toast_message").innerHTML = "빈칸을 모두 입력해주세요.";
				toast.show();
				return;				
			}

			if(isNaN(id) || isNaN(season)) {
				let live_toast = document.getElementById("live_toast");
				let toast = new bootstrap.Toast(live_toast)
				document.getElementById("toast_title").innerHTML = "정보";
				document.getElementById("toast_message").innerHTML = "항목에 문자가 들어있습니다. 숫자만 기입해주세요.";
				toast.show();
				return;
			}

			let jsonData = {
				"id_type" : id_type,
				"id" : id,
				"sku" : sku,
                "order_id" : order_id,
				"season" : season,
			};

			$.ajax({
    			url: domain_url + "/register_receipt/create",
    			data: JSON.stringify(jsonData),
    			type: "POST",
    			async: false,
    			timeout: 5000,
    			dataType: "JSON",
    			contentType: "application/json; charset=utf-8",
    			    			
    			success: function(response) {
					console.log("register_receipt/create | [requestPostBodyJson] : [response] : " + response.error_code);
					
					let live_toast = document.getElementById("live_toast");
					let toast = new bootstrap.Toast(live_toast)
					if (response.error_code == 0) {
						document.getElementById("toast_title").innerHTML = "성공";
						document.getElementById("toast_message").innerHTML = "성공했습니다.";
					}
					else {
						document.getElementById("toast_title").innerHTML = "실패: " + response.error_code;
						document.getElementById("toast_message").innerHTML = "실패했습니다.";
					}

					toast.show();
    			}.bind(this),
    			error: function(xhr) {
    				console.log("");
    				console.log("tab_collection.register_receipt | [requestPostBodyJson] : [error] : " + JSON.stringify(xhr));
    				console.log("");
    			},
    			complete:function(data,textStatus) {
    				console.log("");
    				console.log("tab_collection.register_receipt | [requestPostBodyJson] : [complete] : " + textStatus);
    				console.log("");    				
    			}
    		});
        })

		$('#login_key_generater_btn_register').on("click",function(e) {
			const id_type = $('#login_key_generater_id_type').val();
            const id = $('#login_key_generater_input_id').val();
            const expire_day = $('#login_key_generater_input_expire_day').val();

			if (id.length == 0 || expire_day.length == 0) {
				let live_toast = document.getElementById("live_toast");
				let toast = new bootstrap.Toast(live_toast)
				document.getElementById("toast_title").innerHTML = "정보";
				document.getElementById("toast_message").innerHTML = "빈칸을 모두 입력해주세요.";
				toast.show();
				return;
			}

			if (isNaN(id)) {
				let live_toast = document.getElementById("live_toast");
				let toast = new bootstrap.Toast(live_toast)
				document.getElementById("toast_title").innerHTML = "정보";
				document.getElementById("toast_message").innerHTML = "항목에 문자가 들어있습니다. 숫자만 기입해주세요.";
				toast.show();
				return;
			}

			let jsonData = {
				"id_type" : id_type,
				"id" : id,
				"expire_day" : expire_day,				
			};

			$.ajax({
    			url: domain_url + "/login_Key_generater/create",
    			data: JSON.stringify(jsonData),
    			type: "POST",
    			async: false,
    			timeout: 5000,
    			dataType: "JSON",
    			contentType: "application/json; charset=utf-8",
    			    			
    			success: function(response) {
					console.log("login_Key_generater/create | [requestPostBodyJson] : [response] : " + response.error_code);
					
					let live_toast = document.getElementById("live_toast");
					let toast = new bootstrap.Toast(live_toast)
					if (response.error_code == 0) {
						$('#login_key_generater_text_guid').text(response.guid);

						document.getElementById("toast_title").innerHTML = "성공";
						document.getElementById("toast_message").innerHTML = "성공했습니다.";
					}
					else {
						$('#login_key_generater_text_guid').text('');

						document.getElementById("toast_title").innerHTML = "실패: " + response.error_code;
						document.getElementById("toast_message").innerHTML = "실패했습니다.";
					}

					toast.show();

    			}.bind(this),
    			error: function(xhr) {
					$('#login_key_generater_text_guid').text('');

    				console.log("");
    				console.log("tab_collection.login_Key_generater | [requestPostBodyJson] : [error] : " + JSON.stringify(xhr));
    				console.log("");
    			},
    			complete:function(data,textStatus) {
    				console.log("");
    				console.log("tab_collection.login_Key_generater | [requestPostBodyJson] : [complete] : " + textStatus);
    				console.log("");    				
    			}
    		});
        })

		$('#login_key_generater_btn_copy').on("click", function (e) {
            const text = $('#login_key_generater_text_guid').text();
			window.navigator.clipboard.writeText(text);
		})

		$('#set_seed_state_btn_execute').on("click",function(e) {
			const id_type = $('#set_seed_state_id_type').val();
			let id = $('#finding_factor_set_seed_state_id').val();
			let seed_number = $('#finding_factor_set_seed_state_seed_number').val();
			let state = $('#finding_factor_set_seed_state_state').val();

			if(id.length == 0 || seed_number.length == 0 || state.length == 0) {
				let live_toast = document.getElementById("live_toast");
				let toast = new bootstrap.Toast(live_toast)
				document.getElementById("toast_title").innerHTML = "정보";
				document.getElementById("toast_message").innerHTML = "빈칸을 모두 입력해주세요.";
				toast.show();
				return;				
			}

			if(isNaN(id) || isNaN(seed_number) || isNaN(state)) {
				let live_toast = document.getElementById("live_toast");
				let toast = new bootstrap.Toast(live_toast)
				document.getElementById("toast_title").innerHTML = "정보";
				document.getElementById("toast_message").innerHTML = "항목에 문자가 들어있습니다. 숫자만 기입해주세요.";
				toast.show();
				return;
			}
			
			let jsonData = {
				"id_type" : id_type,
				"id" : id,
				"seed_number" : seed_number,
				"state" : state,
			};

			$.ajax({
    			// [요청 시작 부분]
    			url: domain_url + "/set_seed_state/update", //주소
    			data: JSON.stringify(jsonData), //전송 데이터
    			type: "POST", //전송 타입
    			async: false, //비동기 여부
    			timeout: 5000, //타임 아웃 설정
    			dataType: "JSON", //응답받을 데이터 타입 (XML,JSON,TEXT,HTML,JSONP)    			
    			contentType: "application/json; charset=utf-8", //헤더의 Content-Type을 설정
    			    			
    			// [응답 확인 부분 - json 데이터를 받습니다]
    			success: function(response) {
    				//console.log("tab_collection.set_seed_state / [requestPostBodyJson] : [response] : " + JSON.stringify(response).);
					console.log("tab_collection.set_seed_state / [requestPostBodyJson] : [response] : " + response.error_code);
					
					let live_toast = document.getElementById("live_toast");
					let toast = new bootstrap.Toast(live_toast)

					if(response.error_code == 0) {
						document.getElementById("toast_title").innerHTML = "성공";
						document.getElementById("toast_message").innerHTML = "씨앗 수정을 성공했습니다.";		
					}
					else { 
						document.getElementById("toast_title").innerHTML = "실패: " + response.error_code;
						document.getElementById("toast_message").innerHTML = "씨앗 수정을 실패했습니다.";
					}

					toast.show();
    			}.bind(this),
    			    			
    			// [에러 확인 부분]
    			error: function(xhr) {
    				console.log("");
    				console.log("tab_collection.set_seed_state / [requestPostBodyJson] : [error] : " + JSON.stringify(xhr));
    				console.log("");
    			},
    			    			
    			// [완료 확인 부분]
    			complete:function(data,textStatus) {
    				console.log("");
    				console.log("tab_collection.set_seed_state / [requestPostBodyJson] : [complete] : " + textStatus);
    				console.log("");
    			}
    		});
        })

		$('#product_recall_btn_execute').on("click",function(e) {
			const id_type = $('#product_recall_id_type').val();
			const id = $('#product_recall_input_id').val();
			const item_type = $('#product_recall_input_item_type').val();
			const item_id = $('#product_recall_input_item_id').val();
			const amount = $('#product_recall_input_amount').val();

			if(id.length == 0 || item_type.length == 0 || item_id.length == 0 || amount.length == 0) {
				let live_toast = document.getElementById("live_toast");
				let toast = new bootstrap.Toast(live_toast)
				document.getElementById("toast_title").innerHTML = "정보";
				document.getElementById("toast_message").innerHTML = "빈칸을 모두 입력해주세요.";
				toast.show();
				return;				
			}

			if(isNaN(id) || isNaN(item_type) || isNaN(item_id) || isNaN(amount)) {
				let live_toast = document.getElementById("live_toast");
				let toast = new bootstrap.Toast(live_toast)
				document.getElementById("toast_title").innerHTML = "정보";
				document.getElementById("toast_message").innerHTML = "항목에 문자가 들어있습니다. 숫자만 기입해주세요.";
				toast.show();
				return;
			}
			
			let jsonData = {
				"id_type" : id_type,
				"id" : id,
				"item_type" : item_type,
				"item_id" : item_id,
				"amount" : amount,
			};

			$.ajax({
    			url: domain_url + "/product_recall/update",
    			data: JSON.stringify(jsonData),
    			type: "POST",
    			async: false,
    			timeout: 5000,
    			dataType: "JSON",
    			contentType: "application/json; charset=utf-8",
    			    			
    			success: function(response) {
					console.log("tab_collection.product_recall / [requestPostBodyJson] : [response] : " + response.error_code);
					
					let live_toast = document.getElementById("live_toast");
					let toast = new bootstrap.Toast(live_toast)

					if(response.error_code == 0) {
						document.getElementById("toast_title").innerHTML = "성공";
						document.getElementById("toast_message").innerHTML = "수정을 성공했습니다.";		
					}
					else { 
						document.getElementById("toast_title").innerHTML = "실패: " + response.error_code;
						document.getElementById("toast_message").innerHTML = "수정을 실패했습니다.";
					}

					toast.show();
    			}.bind(this),
    			error: function(xhr) {
    				console.log("");
    				console.log("tab_collection.product_recall / [requestPostBodyJson] : [error] : " + JSON.stringify(xhr));
    				console.log("");
    			},
    			complete:function(data,textStatus) {
    				console.log("");
    				console.log("tab_collection.product_recall / [requestPostBodyJson] : [complete] : " + textStatus);
    				console.log("");
    			}
    		});
        })
    }
}
