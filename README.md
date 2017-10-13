## FileDumpling Back-end README
---

* The deployed client-side web application can be found [here](https://4knclone.github.io/FileBucket-Front-End/)
* The README and repository for the front-end of this project can be found [here](https://github.com/4KnClone/FileBucket-Front-End)
* This repo is deployed using Heroku and can be found [here](https://enigmatic-beach-10306.herokuapp.com/)

### Overview
FileDumpling is a single page web application built by Katherine Wu, Aaron Vale, Vitorio Paulo, and Matthew Goldman. The app allows users to upload and share their files. Files uploaded can be seen by anyone but can be deleted or edited **only** by the user who uploads them.
An uploaded file will display in a table that shows the specified file name, the user who uploaded it, the date uploaded and modified, as well as a download button. If the logged in user is the original uploader, an edit button and a delete button will also display.

## Development Process
---
### Planning
The planning proccess for the back end was centered on the below diagram.
![Entity Relationship Diagram](https://av-wdi-20.s3.amazonaws.com/filebucket/2017-10-13/c2c37034323adeee52627563a9f8430b.png)
Here we see that our data model involves two entities -- users and files (uploads). Users have the attributes of email (or username) and password. Files have the attributes of owner, extension, name, tags, date modified, and date added. Ultimately, extension was not included in the schema.
Another large part of the back-end development process was integrating our back end with the Amazon Web Services storage system, where the uploaded files are kept. This involved building code that would allow our app to upload files to AWS and retrieve and store information about those files.

### Process
Much of the proccess involved working cohesively as a group. We commonly practiced both pair programming, where two developers would work on one computer solving a problem together. For more challenging problems, we worked as a whole group to solve the problems on one local repository and then push the changes to the remote repo. Nightly, each developer would work independantly on an issue identified at the end of that day. Each morning our first order of business was to review what we worked on independently and then merge the changes into our remote repository, working out any conflicts as we went.

#### Technologies used
* Node.js
* express
* mongoose
* mongoDB
* Curl

### API end-points

| Verb | URI Pattern | Controller#Action |
| ---- | ----------- | ----------------- |
| POST   | `/sign-up`  | `users#signup` |
| POST   | `/sign-in`  | `users#signin` |
| DELETE | `/sign-out/:id` | `users#signout`  |
| PATCH   | `/change-password/:id`  | `users#changepw` |
| GET   | `/uploads`  | `uploads#index` |
| POST   | `/uploads`  | `uploads#create`  |
| PATCH   | `/uploads/:id`  | `uploads#update` |
| DELETE   | `/uploads/:id`  | `uploads#destroy` |

all data returned is in JSON.

## Future additions
In future iterations of this application, we would like to add a permissions system that allows an original uploader to specify other users that will be able to edit and/ or delete files.
