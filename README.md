# Server-application for [Notes-app](https://github.com/dm-rybalchenko/notes-app)

Created with Node, Express, MongoDB, Mongoose, JWT, Cloudinary, nodeMailer

### Functionality

* User registration with email.

* Verification with link is sending to user's email.

* Used 2 JWT tokens.

* Creating, deleting and editing notes and saving to the database.

* Notes available only it's creators - users.

* Uploading, updating and removing files to the cloud. Pinned them to notes.

* Set file-filters by mime-format and size.

* Set validating incoming emails and passwords.



# API

Description API methods and endpoints.

## User-service endpoints:

### Registration a new user. Endpoint `/registration`, method `POST`.
request: in body should be provided registration data

    {
    	email: '',
    	password: '',
    }

response: user with a new token

    {
        user: {
			id: ''
			email: '',
			isActivated: false,
		},
        accessToken: '',
        refreshToken: '',
    }
also set in cookies: { refreshToken: '' }

errors: { message: '', errors: [] }

### Login. Endpoint `/login`, method `POST`.
request: in body should be provided login data, in cookies refresh-token

    {
    	email: '',
    	password: '',
    }

response: user with token

    {
        user: {
			id: ''
			email: '',
			isActivated: false,
		},
        accessToken: '',
        refreshToken: '',
    }
also set in cookies: { refreshToken: '' }

errors: { message: '', errors: [] }

### Logout. Endpoint `/logout`, method `POST`.
request: in cookies should be provided refresh-token

response: deleted token

    {
        user: '',
        refreshToken: '',
    }
errors: { message: '', errors: [] }

### Refresh JWT token. Endpoint `/refresh`, method `GET`.
request: in cookies should be provided refresh-token

response: user with updated token

    {
        user: {
			id: ''
			email: '',
			isActivated: false,
		},
        accessToken: '',
        refreshToken: '',
    }
also set in cookies: { refreshToken: '' }

errors: { message: '', errors: [] }

### Activate a new user. Endpoint `/activate/:link`, method `GET`.
request: none

response: redirect to the client main page

errors: { message: '', errors: [] }

## Note-service endpoints:

### Get one note. Endpoint `/:id`, method `GET`.
request: id of a note in params, in cookies should be provided refresh-token

response: note object

    {
        id: '',
        title: '',
        body: '',
        date: '',
    	pinned: false,
    	favorite: false,
        tags: [''],
    	file?: {
    		id: '',
    		name: '',
    		url: ''
    	},
    },
errors: { message: '', errors: [] }
### Get all notes. Endpoint `/`, method `GET`.
request: in cookies should be provided refresh-token

response: array of notes

    [
    	{
            id: '',
            title: '',
            body: '',
            date: '',
			pinned: false,
			favorite: false,
            tags: [''],
    		file?: {
				id: '',
				name: '',
				url: ''
			},
        },
    ]
errors: { message: '', errors: [] }

### Create a new note. Endpoint `/`, method `POST`.
request: in body should be provided a new note, in cookies refresh-token

    {
        id: '',
        title: '',
        body: '',
        date: '',
    	pinned: false,
    	favorite: false,
        tags: [''],
    	file?: {
    		id: '',
    		name: '',
    		url: ''
    	},
    },
response: created note

    {
        id: '',
        title: '',
        body: '',
        date: '',
    	pinned: false,
    	favorite: false,
        tags: [''],
    	file?: {
    		id: '',
    		name: '',
    		url: ''
    	},
    },
errors: { message: '', errors: [] }

### Update note. Endpoint `/`, method `PUT`.
request: in body should be provided an edited note, in cookies refresh-token

    {
        id: '',
        title: '',
        body: '',
        date: '',
    	pinned: false,
    	favorite: false,
        tags: [''],
    	file?: {
    		id: '',
    		name: '',
    		url: ''
    	},
    },
response: updated note

    {
        id: '',
        title: '',
        body: '',
        date: '',
    	pinned: false,
    	favorite: false,
        tags: [''],
    	file?: {
    		id: '',
    		name: '',
    		url: ''
    	},
    },
errors: { message: '', errors: [] }

### Delete note. Endpoint `/:id`, method `DELETE`.
request: id of a note in params, in cookies should be provided refresh-token

response: deleted note

    {
        id: '',
        title: '',
        body: '',
        date: '',
    	pinned: false,
    	favorite: false,
        tags: [''],
    	file?: {
    		id: '',
    		name: '',
    		url: ''
    	},
    },
errors: { message: '', errors: [] }


## File-service endpoints:

### Upload file. Endpoint `/upload`, method `POST`.
request: form-data with a file in field `file`, in cookies refresh-token

response: file-info object

    {
    	id: '',
    	url: '',
    	name: ''
    }
errors: { message: '', errors: [] }

### Update file. Endpoint `/upload/:id`, method `PUT`.
request: id of an old file in params, form-data with a new file in field `file`, in cookies refresh-token

response: file-info object

    {
    	id: '',
    	url: '',
    	name: ''
    }
errors: { message: '', errors: [] }

### Delete file. Endpoint `/upload/:id`, method `DELETE`.
request: id of a file in params, in cookies refresh-token

response: file-info object

    {
    	id: '',
    	sucsess: ''
    }
errors: { message: '', errors: [] }
