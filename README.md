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
