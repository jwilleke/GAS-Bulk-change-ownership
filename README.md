# GAS-Bulk-change-ownership

Code used for GAS-Bulk-change-ownership system.

When Google started using "Pooled Stoarge" for Google Workspaces.

GAS-Bulk-change-ownership has two areas of interest

- Moving files from one Google Drive User to another
- Downloading Google Drive Files


## Repositories use GitHub and CLASP

For use of GitHub and CLASP, you will need YOUR Sheet scriptID.

Go to [https://script.google.com/] and find the desired project.

Obtain the "Project ID" from the URL.

Then to initialize Clasp for the project within the "empty" cloned GitHub Repository folder

```bash
  clasp login
  clasp clone {Project ID}
```

When using Clasp Always use:

```bash
clasp pull
clasp push
# then
git push
```

Running code is within <https://script.google.com/u/1/home/projects/1ouw1hdB7KJqImsJX7fMkduQ1NpPg7tmuY4l-UigaQlcH_h-qFIiDGYKZ/edit>

## Codeing notes from Codeproject

[Codeproject Sheet](https://docs.google.com/spreadsheets/d/1_aL5HOiEVUCf9Zz_qocSRdnd9ZSqBDT9tdke6V4rH_I/edit#gid=1036087669)

[Codeproject Script](https://script.google.com/u/0/home/projects/1HwK90MxJ8bNSfrrwsGKTbsvAfBSghCsSM7LtSzzyw8wTBtSz1PJQ3obG/edit)

There is ONLY one row for each request within the Requests Sheet.

There maybe more than one response row for each request wituin the Response Sheet.

### Dealng with Range

What the numbers mean.

[Google's Documnets.](https://developers.google.com/apps-script/reference/spreadsheet/sheet#getrangerow,-column,-numrows,-numcolumns)

``` js
Sheet.getRange(1,1,1,12)
```

- row --- int --- top row of the range
- column --- int--- leftmost column of the range
- NumRows (optional) --- int --- number of rows in the range.
- optNumColumns  (optional) --- int --- number of columns in the range

Passing only two arguments returns a "range" with a single cell.

``` js
var range = sheet.getRange(1, 1);
```

Get one row:

``` js
var headers = requestSheet.getDataRange().offset(0, 0, 1).getValues()[0];
```

### Headers

This will get the first row in an array.

``` js
var headers = requestSheet.getDataRange().offset(0, 0, 1).getValues()[0];
```

## Request Row Header (0 based)

- 0 - A - REQUEST
- 1 - B - Timestamp
- 2 - C - Name
- 3 - D - Phone number
- 4 - E - Urgency
- 5 - F - Address
- 6 - G - Request Type
- 7 - H - Nature of Request
- 8 - I - xEmail Addressx
- 9 - J - Email Address
- 10 - K - Do you have Photos or Documents to Upload?
- 11 - L - Upload files if desired
- 12 - M - Email (not used)
- 13 - N - Last Response
- 14 - O - Response Description
- 15 - P - Response Status
- 16 - Q - EditRequestURL (NOt always there)
- 17 - R - NOT USED
- 18 - S - Last Request Number

## Response Row Headers (0 based)

Sometime between 11/17/2022 and 1/16/2022 the order of columns changed.

- 0 - A - Timestamp: Thu Sep 23 2021 09:31:45 GMT-0400 (Eastern Daylight Time)
- 1 - B - Email Address: Jim Willeke
- 2 - C - Name : Jim Willeke
- 3 - D - Phone number: 4195647692
- 4 - E - REQ#: 438
- 5 - F - Request for this Response: 48 Fairway DR, Mount Vernon, OH 43050
- 6 - G - Response Date: Thu Sep 23 2021 00:00:00 GMT-0400 (Eastern Daylight Time)
- 7 - H - Response Type: Pending Review
- 8 - I - Details of Response: TESTING PLEASE IGNORE
- 9 - J - Category of Request: TESTING ONLY
- 10 - K - Amount of Estimate:
- 11 - L - Estimated Completion Date :
- 12 - M - Upload Photo or PDF Document:
- 13 - N - Payment Amount:
- 14 - O - Upload Invoice (PDF Only Please):
- 15 - P - TESTING ONLY
- 16 - Q - TESTING ONLY

2023-01-20

Sheets have changed columns.

Effected

- updateRequestSheetWithRowStatus(responseNumber)

6:18:24 AM Info responseRowIndex: 316
6:18:24 AM Info getColumnIndexByName: from Sheet Sheet REQUEST is: 1
6:18:24 AM Info Request from ResponseSheet is: 653
6:18:24 AM Info respRequestNumber 653 respsoneDescription: Completed responseStatus: GUTTERS-DOWNSPOUT respsoneCategory:
6:18:25 AM Info { columnIndex: 0, rowIndex: 653 }
6:18:25 AM Info request Number Row is: 654

## ISSUES

2023-09-07 Exception: Invalid email #4

``` bash
Sep 7, 2023, 10:02:52 AM Debug Starting determineWhichSheetTriggered
Sep 7, 2023, 10:02:52 AM Debug Sheet determineWhichSheetTriggered from Event: Responses
Sep 7, 2023, 10:02:53 AM Info responseRowIndex: 536
Sep 7, 2023, 10:02:53 AM Info getColumnIndexByName: from Sheet Sheet REQUEST is: 1
Sep 7, 2023, 10:02:53 AM Info Request from ResponseSheet is: 96
Sep 7, 2023, 10:02:53 AM Info respRequestNumber 96 respsoneDescription: Completed with 2023 Concrete work project. responseStatus: Completed respsoneCategory: DRIVEWAY
Sep 7, 2023, 10:02:54 AM Debug { columnIndex: 0, rowIndex: 96 }
Sep 7, 2023, 10:02:54 AM Info request Number is: 96/97
Sep 7, 2023, 10:02:54 AM Debug RequestSheet responseStatus N97 to: Completed
Sep 7, 2023, 10:02:54 AM Info RequestSheet respsoneDescription O97 to: Completed with 2023 Concrete work project.
Sep 7, 2023, 10:02:54 AM Info RequestSheet respsoneCategory P97 to: DRIVEWAY
Sep 7, 2023, 10:02:54 AM Info RequestSheet Last Response Number S97 to: 536
Sep 7, 2023, 10:02:54 AM Debug Looks like updateRequestSheetWithCurrentStatus(responseRowIndex) worked
Sep 7, 2023, 10:02:54 AM Info Calling sendResponseEmail: Responses
Sep 7, 2023, 10:02:55 AM Info notifyRequestor: 
Sep 7, 2023, 10:02:56 AM Debug { columnIndex: 0, rowIndex: 96 }
Sep 7, 2023, 10:02:56 AM Info useRequestRow: 97
Sep 7, 2023, 10:02:56 AM Info Date: Fri Sep 01 2023 00:00:00 GMT-0400 (Eastern Daylight Time)
Sep 7, 2023, 10:02:56 AM Info rrSheet.getSpreadsheetTimeZone: America/New_York
Sep 7, 2023, 10:02:56 AM Info responseResponse Completed with 2023 Concrete work project.
Sep 7, 2023, 10:02:56 AM Info requestorsEmail: 
Sep 7, 2023, 10:02:56 AM Info Email Addresses: ,jim@willeke.com, fairwayscondos-maintenance@googlegroups.com, fairwayscondos-board@googlegroups.com
Sep 7, 2023, 10:02:56 AM Info Subject [Fairways Response] to RequestNumber 96 for 70 FAIRWAY DR
Sep 7, 2023, 10:02:56 AM Info The Email Message: A Response for Request Number 96 from: Jim Willeke about:
  Concrete at drive drain needs raised.
  
  A response was entered September 01, 2023, 12:00 AM with a status of Completed: 
  Completed with 2023 Concrete work project. 
  
  If further contact is required we will use the phone number 419-564-7692 
  
  Should you need to contact the Maintenance Provider Reply to this email or call 419-564-7692
Sep 7, 2023, 10:02:56 AM Info SendResponseEmail is disabled for requestor

Sep 7, 2023, 10:02:56 AM Error Exception: Invalid email: 
    at sendResponseEmail(code:280:11)
    at determineWhichSheetTriggered(code:160:9)
```

## Prfiled Response

``` bash
https://docs.google.com/forms/d/e/1FAIpQLSfqW9CrYAJ49gXlWWAaa_ddFb3O8oLGi5HdFpFXglJufHmfkg/viewform?usp=pp_url&entry.1065046570=3&entry.2005620554=Jim+Willeke&entry.970125098=2023-11-04&entry.1166974658=4195647692&entry.839337160=Completed!&entry.1220141231=TESTING&entry.1165080490=Completed&entry.803083604=No



https://docs.google.com/forms/d/e/1FAIpQLSfqW9CrYAJ49gXlWWAaa_ddFb3O8oLGi5HdFpFXglJufHmfkg/viewform?usp=pp_url&entry.2005620554=Jim+Willeke&entry.970125098=2021-12-31&entry.803083604=No&entry.1166974658=4195647692&entry.839337160=This+is+Duplicate+of+Request+44&entry.1220141231=OTHER&entry.1165080490=Completed&entry.1065046570=7

```

## newCode.js

## reports.js

function reportOnRequestNumber(reqNumber, sendEmails, writeToFile)

Puts each request

- followed by each response to that request

response match for column

1 -> to NONE
2 -> 9
3 -> SAME
4 -> 2
5 -> 4
6 -> REQ
7 -> 8
8 -> 15
9 -> 13

## Temp Code tests

``` bash
# Current code 
/**
 * Gets a "Short" Address 
 * @address: 24 FAIRWAY DR, Mount Vernon, OH 43050
 * return 24 FAIRWAY DR
 */
function getShortAddress(address) {
  var temp = address.substring(0, temp.indexOf(","))
  return temp;
}


May 19, 2024, 5:14:24 AM Error TypeError: Cannot read properties of undefined (reading 'indexOf')
    at getShortAddress(code:303:40)
    at sendResponseEmail(code:132:24)
    at determineWhichSheetTriggered(code:60:9)

# New code
/**
 * Gets a "Short" Address 
 * @address: 24 FAIRWAY DR, Mount Vernon, OH 43050
 * return 24 FAIRWAY DR
 */
function getShortAddress(address) {
  var shortAddress = address.substring(0, address.indexOf(","))
  return shortAddress;
}



```

## Getting Form Question IDs

Add function to form script editor

``` js
function dumpFormIDs() {
  var form = FormApp.getActiveForm();
  var items = form.getItems();
  for (var i in items) {
    Logger.log(items[i].getTitle() + ': ' + items[i].getId());
  }
}
```

## Response Form IDs  

  ``` bash
# IDs from form 2024-05-20
Name : 1633920210
Response Date: 1520144872
Notify Requestor: 1191921016
Phone number: 1770822543
REQ#: 790080973
Details of Response: 1846923513
Category of Request: 1399999558
Response Type: 1375733000
Upload Photo or PDF Document: 631801747
Payment Request: 847723225
Payment Amount: 419621181
Upload Invoice (PDF Only Please): 471315762
Estimate Details: 1489742643
Amount of Estimate: 1525753873
Estimated Completion Date : 1341786348

```

## Request Form IDs

``` bash
# IDs from form 2024-05-20
7:12:47 AM Info Name : 1633920210
7:12:47 AM Info Phone number: 1770822543
7:12:47 AM Info Urgency: 1694607032
7:12:48 AM Info Address: 790080973
7:12:48 AM Info Request Type: 1375733000
7:12:48 AM Info Nature of Request: 1846923513
7:12:48 AM Info Do you have Photos or Documents to Upload?: 1306957757
7:12:48 AM Info Uploads: 1983786381
7:12:48 AM Info Upload files if desired: 668361112
```
