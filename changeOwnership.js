/*
Note: Never worked for jim@willeke.com
changeOwnership.gs
Script to iterate through Files/Folders in Google Drive and change Ownership.
Will only attempt change after getting the current Owner and checking for match
from 'Welcome' sheet.


> Current Owner will become an Editor - include option to remove them?
> New Owner will get an email for each item.
*/

function changeOwnership() {
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var activeSheet = ss.getActiveSheet();
  
  // source folder
  var sourceID = activeSheet.getRange(2,2).getValue();
  
  // email address of current owner
  var currentOwner = activeSheet.getRange(3,2).getValue();
  
  // email address of new owner
  var newOwner = activeSheet.getRange(4,2).getValue();
  
  // Function to get sub-folders/files
  folderAndFiles(sourceID, ss, currentOwner, newOwner);
  
}


function folderAndFiles(folderID, ss, currentOwner, newOwner) {
  
  // get folder
  var folder = DriveApp.getFolderById(folderID);
  
  // get all the files
  var files = folder.getFiles();
  
  while(files.hasNext()) {
    
    try {
      // get the next file in the folder. 
      var file = files.next();
      
      // get the name of the source file
      var fileName = file.getName();
      Logger.log('File name: ' + fileName);
      
      ss.toast(fileName, 'Current file is:');
      
      // get current file Owner
      var currentFileOwner = file.getOwner().getEmail();
      
      // check for match before attempting to change
      if (currentFileOwner == currentOwner) {
        // change 'Owner' of source file
        file.setOwner(newOwner);
        
        ss.toast(fileName, 'Changed File:');
      }
      else {
        // do nothing as file Ownership already correct
      }
    }
    catch(e) {
      Logger.log('Problem with file: ' + e);
    }
    
  }
  
  
  // get all the folders
  var childFolders = folder.getFolders();
  
  while(childFolders.hasNext()) {
    
    try {
      // get the next folder
      var child = childFolders.next();
      
      // get folder name
      var childName = child.getName();
      Logger.log('Folder name: ' + childName);
      
      // get folder Id
      var childId = child.getId();
      
      // get current folder Owner
      var currentChildOwner = child.getOwner().getEmail();
      
      // check for match before attempting to change
      if (currentChildOwner == currentOwner) {
        // change 'Owner' of folder
        child.setOwner(newOwner);
        
        ss.toast(childName, 'Changed Folder:');
      }
      else {
        // do nothing as folder Ownership already correct
      }
      
      // pass through folder to Function to get sub-files
      folderAndFiles(childId, ss, currentOwner, newOwner);
    }
    catch(e) {
      Logger.log('Problem with folder: ' + e); 
    }
    
  }
  
}