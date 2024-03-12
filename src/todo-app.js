/**
 * Sample OpenUI5 Progressive Web Application
 * Simple TODO list
 */
// const webpush = require('web-push');
sap.ui.getCore().attachInit(function todoApp() {





	//
	// Model
	//

	// 6060: Persisting the own status:
	var status = {};
	if (JSON.parse(localStorage.getItem("status")) === null) {
		status[0] = 0;
		localStorage.setItem("status", 0);
	}
	function swapStatus() {
		console.log("Checked-In Status: " + JSON.parse(localStorage.getItem("status")));
		status[0] = (JSON.parse(localStorage.getItem("status")) + 1) % 2;
		localStorage.setItem("status", status[0]);
		console.log("Checked-In Status: " + JSON.parse(localStorage.getItem("status")));
	}
	function setStatusCheckedIn() {
		console.log("Checked-In Status: " + JSON.parse(localStorage.getItem("status")));
		status[0] = 1;
		localStorage.setItem("status", 1);
		console.log("Checked-In Status: " + JSON.parse(localStorage.getItem("status")));
	}
	function setStatusCheckedOut() {
		console.log("Checked-In Status: " + JSON.parse(localStorage.getItem("status")));
		status[0] = 0;
		localStorage.setItem("status", 0);
		console.log("Checked-In Status: " + JSON.parse(localStorage.getItem("status")));
	}





	//
	// Controller
	//

	// 6057: Notification is sent at fixed times
	function releaseNotification() {
		navigator.serviceWorker.ready.then(registration => {
			registration.showNotification(
				'Hey Q_Peri!', {
					body: "Click to START recording Your working hours!",
					data: { number: 1 },
					tag: "startRecording",
					icon: "/icons/icon-128x128.png",
					requireInteraction: true
				})
		})
	}
	function sendNotification() {
		if (Notification.permission === "granted") {
			releaseNotification();
		} else {
			Notification.requestPermission().then(function (permission) {
				if (permission === "granted") {
					console.log("user has permitted to send notifications; notification will be sent");
					releaseNotification();
				} else {
					console.log("user has NOT permitted to send notifications");
				}
			})
		}
	}
	function timeoutInfoA() {
		localStorage.setItem("timeout", 1);
		releaseNotification();
		console.log("Timeout A executed -> " + JSON.parse(localStorage.getItem("timeout")));
	}
	function timeoutInfoB() {
		localStorage.setItem("timeout", 2);
		releaseNotification();
		console.log("Timeout B executed -> " + JSON.parse(localStorage.getItem("timeout")));
	}
	function timeoutInfoC() {
		localStorage.setItem("timeout", 3);
		releaseNotification();
		console.log("Timeout C executed -> " + JSON.parse(localStorage.getItem("timeout")));
	}
	var now = new Date();
	var milliSecondsTill10a = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 54, 0, 0) - now;
	if (milliSecondsTill10a < 0) {
		milliSecondsTill10a += 86400000; // it's after 10am, try 10am tomorrow.
	}
	var milliSecondsTill10b = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 54, 30, 0) - now;
	if (milliSecondsTill10b < 0) {
		milliSecondsTill10b += 86400000; // it's after 10am, try 10am tomorrow.
	}
	var milliSecondsTill10c = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 55, 0, 0) - now;
	if (milliSecondsTill10c < 0) {
		milliSecondsTill10c += 86400000; // it's after 10am, try 10am tomorrow.
	}
	setTimeout(timeoutInfoA, milliSecondsTill10a);
	console.log("setTimeout A: " + milliSecondsTill10a);
	setTimeout(timeoutInfoB, milliSecondsTill10b);
	console.log("setTimeout B: " + milliSecondsTill10b);
	setTimeout(timeoutInfoC, milliSecondsTill10c);
	console.log("setTimeout C: " + milliSecondsTill10c);

	/*
	 TO-DO:
	 0) install cf cli for windows to enable cf deployment as done in dev space
	 1) request notification permission when opening the app
	 2) implement for-loop to set notification-sending timouts at every full minute of a day
	 */





	//
	// View
	//

	var app = new sap.m.App("myApp");

	// 6055: Recording of start and end events:
	var startEventButton = new sap.m.Button("startEventButton", {
		text: "Start-Event",
		enabled: true,
		press: setStatusCheckedIn
	});
	var endEventButton = new sap.m.Button("endEventButton", {
		text: "End-Event",
		enabled: true,
		press: setStatusCheckedOut
	});
	var swapEventButton = new sap.m.Button("swapEventButton", {
		text: "Swap-Event",
		enabled: true,
		press: swapStatus
	});
	var sendNotificationButton = new sap.m.Button("sendNotificationButton", {
		text: "Send",
		enabled: true,
		press: sendNotification
	});
	var eventButtonFlexBox = new sap.m.FlexBox("eventButtonFlexBox", {
		height: "200px",
		alignItems: "Center",
		justifyContent: "Center",
		items: [startEventButton, endEventButton, swapEventButton, sendNotificationButton]
	});

	// 6060: Persisting the own status:
	var statusInfoButton = new sap.m.Button("statusInfoButton", {
		text: "Checked-In Status: " + JSON.parse(localStorage.getItem("status")),
		enabled: false
	});

	// 6057: Notification is sent at fixed times
	var timeoutInfoButton = new sap.m.Button("timeoutInfoButton", {
		text: "Time-Out Status: " + JSON.parse(localStorage.getItem("timeout")),
		enabled: false
	});

	var infoButtonFlexBox = new sap.m.FlexBox("infoButtonFlexBox", {
		height: "200px",
		alignItems: "Center",
		justifyContent: "Center",
		items: [statusInfoButton, timeoutInfoButton]
	});
	var todoPage = new sap.m.Page("todoPage", {
		title: "Q_Peri - Stamper",
		showNavButton: false,
		showFooter: false,
		floatingFooter: true,
		content: [eventButtonFlexBox, infoButtonFlexBox]
	});




	
	// Start application

	app.addPage(todoPage);
	app.setInitialPage("todoPage");

	document.getElementById("splash-screen").remove(); // delete the splash screen
	app.placeAt("body", "only");
}); 
