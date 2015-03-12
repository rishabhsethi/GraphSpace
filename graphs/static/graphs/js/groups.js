$(document).ready(function() {

	$("#create_group").click(function(e) {
		e.preventDefault();

		var groupName = $("#group_name").val();

		if (groupName.length == 0 || !groupName) {
			return alert("Please enter in a valid group name!");
		}

		var relURL = "";

		if (location.pathname.split('/').length == 4) {
			relURL = '../../add/' + groupName + '/'
		} else {
			relURL = '../add/' + groupName + '/'
		}

		$.post(relURL, {
			"groupname": groupName,
			"username": $("#username").text()
		}, function (data) {
			if ("Error" in data) {
				alert(data['Error']);
				return;
			} else {
				alert("Group Created!");
				location.reload();
			}
		});
	});

	$(".delete").click(function (e) {
		var groupInfo = $(this).attr("id").split('concat_val_buffer');
		var groupOwner = groupInfo[1];
		var groupName = groupInfo[0];
		$.post('../delete/group/', {
			"groupOwner": groupOwner,
			"groupName": groupName,
			"username": $("#username").text()
		}, function (data) {
			if ("Error" in data) {
				alert(data['Error']);
				return;
			} else {
				location.reload();
			}
		});
	});

	$(".remove").click(function (e) {
		var groupInfo = $(this).attr("id").split('concat_val_buffer');
		var groupOwner = groupInfo[1];
		var groupName = groupInfo[0];
		$.post('../../unsubscribe/group/', {
			"groupOwner": groupOwner,
			"groupName": groupName,
			"username": $("#username").text()
		}, function (data) {
			if ("Error" in data) {
				alert(data['Error']);
				return;
			} else {
				alert(data['Unsubscribe']);
				location.reload();
			}
		});
	});
});