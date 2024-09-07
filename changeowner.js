/**
 * changeowner.gs
 * Works with
 *  https://docs.google.com/spreadsheets/d/1BoW5UYDxweB04enuUrDvm0ZnzPAqikqeJGu6z0Pl0dU/
 */
const SHEET_FOR_FILES = '1BoW5UYDxweB04enuUrDvm0ZnzPAqikqeJGu6z0Pl0dU';

function myFunction() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); // Replace 'spreadsheetId' with your spreadsheet's ID

  var sheetName = 'SS';
  var sheetName = 'FORMs';
  //var sheetName = 'DOCs';
  // https://developers.google.com/apps-script/reference/base/mime-type 
  //var mime_type = MimeType.GOOGLE_DOCS;
  var mime_type = MimeType.GOOGLE_FORMS
  //var mime_type = MimeType.GOOGLE_SHEETS;
  var sheet = getOrCreateSheet(spreadsheet, sheetName);

  //countAllPdfsWithDriveApi(mime_type, "");
  writeFilesToSheetOptimized(sheet, mime_type);
}

/**
 * Fills out a sheet with the files from the drive of the specified mimetype
 * @param {*} sheet 
 * @param {*} mimetype 
 */
function writeFilesToSheetOptimized(sheet, mimetype) {
  const headers = ['ID', 'Name', 'Link', 'Parent Folder', 'Owner', 'Modified Time'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  var data = []; // Initialize outside the loop
  var pageToken = null; // Initialize pageToken for pagination
  do {
    var options = {
      q: "mimeType='" + mimetype + "'",
      fields: "nextPageToken, files(id,name,webViewLink,parents,owners,modifiedTime)",
      pageToken: pageToken
    };
    // Query Drive for files matchin Qurey options
    var response = Drive.Files.list(options);
    pageToken = response.nextPageToken;
    var files = response.files;
    // Loop through files and push into data array
    files.forEach(function (file) {
      var fileID = file.id;
      var thisFile = DriveApp.getFileById(fileID);
      var parents = thisFile.getParents();
      //var parentFolderName = parents.hasNext() ? parents.next().getName() : 'No parent folder';
      var parentFolderURL = parents.hasNext() ? parents.next().getUrl() : 'No parent folder';
      var owner = file.owners[0];
      var ownerEmail = owner ? owner.emailAddress : 'Unknown';
      //var ownerEmail = file.owners[0].emailAddress;
      data.push([file.id, file.name, file.webViewLink, parentFolderURL, ownerEmail, file.modifiedTime]);
    });
  } while (pageToken);

  // Write data in batches to avoid hitting limits
  var batchSize = 100; // Adjust based on your observation of execution times
  for (var i = 0; i < data.length; i += batchSize) {
    var batch = data.slice(i, i + batchSize);
    var range = sheet.getRange(i + 2, 1, batch.length, batch[0].length); // Adjust range to match data
    range.setValues(batch);
    SpreadsheetApp.flush(); // Force the spreadsheet to update
  }
}




//###############################################################################
// Utilities related to changing ownership
//###############################################################################

/**
 * Counts files using token as we encountered timeouts.
 */
function countAllPdfsWithDriveApi(mimetype, pageToken) {
  var options = {
    fields: "files(mimeType,name)",
    pageToken: pageToken || "" // Include pageToken if provided
  };
  var files = Drive.Files.list(options);
  var count = 0;

  for (var i = 0; i < files.files.length; i++) {
    var file = files.files[i];
    if (file.mimeType === mimetype) {
      count++;
    }
  }

  if (files.nextPageToken) {
    count += countAllPdfsWithDriveApi(files.nextPageToken); // Recursive call for next page
  }
  Logger.log(`Total Files of: ${mimetype} count: ${count}`);
  return count;
}

/**
 * 
 */
function trashAllFilesByType(mimetype) {
  Logger.log("Trashing PDF Trashed: ");
  var files = DriveApp.getRootFolder().getFilesByType(mimetype);
  while (files.hasNext()) {
    Logger.log("Trashing PDF Trashed: ");
    var file = files.next();
    file.setTrashed(true);
    Logger.log("PDF Trashed: " + file.getId());
  }
}
/**
 * 
 */
function countAllPdfsWithDriveApi(mimetype, pageToken) {
  var options = {
    fields: "files(mimeType,name)",
    pageToken: pageToken || "" // Include pageToken if provided
  };
  var files = Drive.Files.list(options);
  var count = 0;

  for (var i = 0; i < files.files.length; i++) {
    var file = files.files[i];
    if (file.mimeType === mimetype) {
      count++;
    }
  }

  if (files.nextPageToken) {
    count += countAllPdfsWithDriveApi(files.nextPageToken); // Recursive call for next page
  }
  Logger.log(`Total Files of: ${mimetype} count: ${count}`);
  return count;
}


/**
 * Copies a document and moves the original to the trash if the user is the owner
 * If the user is not the owner, the original file is renamed to the owner's email address 
 * @param fileId 
 * @param trashit 
 */
function copyDocumentAndTrashOriginal(fileId, trashit) {

  var sourceFile = DriveApp.getFileById(fileId);
  var sourceFileOwner = sourceFile.getOwner().getEmail();
  var isOwner = sourceFile.getOwner().getEmail() === Session.getActiveUser().getEmail();
  var oldName = sourceFile.getName();
  var newName = `${oldName}`;
  var newFile = sourceFile.makeCopy(newName);
  Logger.log(`Copied document ID: ${newFile.getId()} as newName: ${newName}`);

  if (isOwner) {
    // Move the original file to the trash if the user is the owner
    sourceFile.setTrashed(true);
    Logger.log(`Original file ${oldName} moved to trash.`);
  } else {
    // Inform the user they are not the owner
    sourceFile.setName(`${sourceFileOwner}-${oldName}`);
    Logger.log(`Original file ${oldName} renamed to ${sourceFile.getName()} as you are not the Owner`);

  }
}

//###############################################################################
// Utilities
//###############################################################################
/**
 * 
 * @param {*} spreadsheet Existing SpreadSheet
 * @param {*} sheetName  Desired name of sheet 
 * @returns sheet with the name provided
 */
function getOrCreateSheet(spreadsheet, sheetName) {
  var sheet = spreadsheet.getSheetByName(sheetName);

  if (sheet === null) {
    spreadsheet.insertSheet(sheetName);
    sheet = spreadsheet.getSheetByName(sheetName);
  }

  return sheet;
}


/**
 * As near as I know, this only works if you are the owner of the file
 * there is no method I could find in app script OR Drive API to "Remove" a file shared with you
 * You do this from the mentu in the drive web interface
 * @param {*} fileId 
 */
function moveToTrash(fileId) {
  var file = DriveApp.getFileById(fileId);
  file.setTrashed(true);
  Logger.log("File with ID " + fileId + " moved to trash.");
}


