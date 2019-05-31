# AIDS/LifeCycle Check-in S.P.A.

## Summary

The goal of the application is to quickly verify participant information and check-in ALC participants at events either on PC or mobile device.

For events other than Orientation Day, the app should be hosted on Blackbaud servers. Currently the site resides on the tofighthiv.org server.

On Orientation Day, the app should be hosted and run via a local server. A local server is required to allow admins to fetch fundraising results.

## Installation

1.  Install the [required software](#required-software).

2.  Clone or download this repo.

3.  Run `npm install`.

4.  [Prepare and upload the participant roster](#update-the-participant-roster)

5.  Update (overwrite) the participant roster by running `npm run [fetch-parts-win | fetch-parts-mac]` (see [Tools and Dependencies](#tools-and-dependencies)). Or, manually place a copy in `js/participants.json`. The win/mac `npm run ...` commands are for convenience when 50+ machines require an update on Orientation Day.

6.  In the `config` directory, create the `luminate.config.js` file - [see below](#luminate-api-key).

7.  Orientation Day:

    * Make Firefox the default browser.
    * Run `npm start` to open the app.
    * Make sure [CORS Everywhere (Firefox addon)](https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/) is enabled - it's enabled if the icon is green.

8.  Pre-Orientation Day:
    * Upload FTP to a directory on `​​customerftp.convio.net`.

## Required Software

1.  [Node.js](https://nodejs.org/en/) - Needed to install dependencies and run the local server.
2.  [Git](https://git-scm.com/) - Needed to clone the project. It's best to clone so you can fetch updates.
3.  [Firefox](https://www.mozilla.org/en-US/firefox/) - Required for Orientation Day
4.  [CORS Everywhere (Firefox addon)](https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/) - Required for Orientation Day

## Luminate API Key

```javascript
var luminate_config = {
	// Luminate API Key
	api_key: 'XXXXXXXXXXXXXXXXXX',
	// The text saved to the body of the Luminate interaction
	interaction_body: 'Text for the body interaction.',
	// Initialize a username and password
	username: 'LUMINATE ONLINE USERNAME',
	password: 'LUMINATE ONLINE PASSWORD'
};
```

## Update the Participant Roster

First, run the _***ALC Event Check-In (Build CSV to JSON)***_ located in the _***Report Writer***_ in Luminate Online.

> _You may edit the report to change the TeamRaiser event and the name of the report - ***DO NOT*** edit the column names in step 3 of the report builder._

![Run check-in report](https://raw.githubusercontent.com/jeffreylowy/aidslifecycle-checkin/master/readme/001_run_report.png)

Download the report as `.csv`. Open the file in a plain-text editor (not Excel or another spreadsheet app). Use [Mr. Data Converter](https://shancarter.github.io/mr-data-converter) to convert the file to `json` format.

The shape of the output data from [Mr. Data Converter](https://shancarter.github.io/mr-data-converter) should be an array of javascript objects.

Example:

```json
[
	{
		"consId": 123456,
		"first": "Jane",
		"last": "Smith",
		"alcnum": 8000,
		"team": "Super Cool Team",
		"type": "Roadie",
		"city": "San Francisco",
		"med": "false"
	}
]
```

## Blackbaud Server

#### Scripts and Stylesheets

Blackbaud servers will not serve mixed content (files server from http and https). Scripts and style sheets must be loaded in the head of the page as `js/file_name.js` not `/js/file_name.js`. The later will cause the application to break.

```html
<head>
....
  <!-- AngularJS -->
  <script src="node_modules/angular/angular.min.js"></script>
  <script src="node_modules/angular-route/angular-route.min.js"></script>
  <script src="node_modules/angular-cookies/angular-cookies.min.js"></script>
  <script src="node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.min.js"></script>
  <!-- ALC Application -->
  <link rel="stylesheet" href="css/custom.css">
...
</head>
```

#### Server Caching

Blackbaud's server may take up to 15 minutes to see the changes for CSS and JS files.

## Tools and Dependencies

[Installing PowerShell Core on macOS](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-core-on-macos?view=powershell-6)

## Docs

[Firebase - Read and Write Data on the Web](https://firebase.google.com/docs/database/web/read-and-write)

[Invoke-RestMethod (PowerShell utility)](https://docs.microsoft.com/en-us/powershell/module/Microsoft.PowerShell.Utility/Invoke-RestMethod?view=powershell-6)

[Using Visual Studio Code for PowerShell Development](https://docs.microsoft.com/en-us/powershell/scripting/components/vscode/using-vscode?view=powershell-6)

## FAQ

**_Why do we use a report and not Blackbaud's Convio API to pull in the participant data?_**
The Convio API returns a max of 1000 constituent records in an API. ALC TeamRaisers average 5000+ registered participants. While not impossible for the check-in app to use the Convio API, it would slow down the line and require a constant internet connection, which is not always available at ALC events.
