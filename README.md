# Server-application for [Notes-app](https://github.com/dm-rybalchenko/notes-app)

* Creating, editing, removing and getting notes to a database

* Uploading, updating and removing files to a cloud

* Set file-filters by mime-format and size

* Created with Express.js, MongoDB, Cloudinary and Mongoose.


# API

Description API methods and endpoints.

## Note-service endpoints:

### Get all notes. Endpoint `/`, method `GET`.
request: none

response: array of notes

    [
    	{
            _id: '',
            title: '',
            body: '',
            tags: [''],
            date: '',
    		file?: '',
            __v: 0
        },
    ]
errors: plain text or Error odject with 500 status

### Create a new note. Endpoint `/`, method `POST`.
request: in body should be provided a new note

    {
        title: '',
        body: '',
        tags: [''],
        date: '',
    	file?: '',
    }
response: created note

    {
        _id: '',
        title: '',
        body: '',
        tags: [''],
        date: '',
    	file?: '',
        __v: 0
    }
errors: plain text or Error odject with 500 status

### Update note. Endpoint `/`, method `PUT`.
request: in body should be provided an edited note

    {
        _id: '',
        title: '',
        body: '',
        tags: [''],
        date: '',
    	file?: '',
        __v: 0
    }
response: updated note

    {
        _id: '',
        title: '',
        body: '',
        tags: [''],
        date: '',
    	file?: '',
        __v: 0
    }
errors: plain text or Error odject with 500 status

### Delete note. Endpoint `/:id`, method `DELETE`.
request: id of a note in params

response: deleted note

    {
        _id: '',
        title: '',
        body: '',
        tags: [''],
        date: '',
    	file?: '',
        __v: 0
    }
errors: plain text or Error odject with 500 status


## File-service endpoints:

### Upload file. Endpoint `/upload`, method `POST`.
request: form-data with a file in field `file`

response: file-info object

    {
    	id: '',
    	url: '',
    	name: ''
    }
errors: plain text or Error odject with 500 status

### Update file. Endpoint `/upload/:id`, method `PUT`.
request: id of an old file in params, form-data with a new file in field `file`

response: file-info object

    {
    	id: '',
    	url: '',
    	name: ''
    }
errors: plain text or Error odject with 500 status

### Delete file. Endpoint `/upload/:id`, method `DELETE`.
request: id of a file in params

response: file-info object

    {
    	id: '',
    	sucsess: ''
    }
errors: plain text or Error odject with 500 status
