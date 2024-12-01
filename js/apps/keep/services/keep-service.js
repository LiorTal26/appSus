import { utilService } from '../../../services/utils-service.js'
import { storageService } from "../../../services/async-storage-service.js"

const NOTES_KEY = 'notes'

export const keepService = {
    query,
    get,
    post,
    postMany,
    remove,
    save,
    getById,
    createNote,
    createFirstNotes,
    toggleIsDone,
    togglePinNode,
    getNotesToShow
}

function query() {
    return storageService.query(NOTES_KEY)
        .then(res => {
            if (res.length) {
                return res
            } else {
                return postMany(createFirstNotes())
                    .then(res => {
                        return res
                    })
            }
        })
}

function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}

function post(note) {
    return storageService.post(NOTES_KEY, note)
}

function postMany(mails) {
    return storageService.postMany(NOTES_KEY, mails)
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

function save(note) {
    if (note.id) return storageService.put(NOTES_KEY, note)
    else return storageService.post(NOTES_KEY, note)
}

function togglePinNode(note) {
    note.isPinned = !note.isPinned
    return save(note)
        .then(() => {
            return query()
        })
}

function getById(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}

function createNote(type, isPinned, info) {
    return {
        type,
        isPinned,
        info
    }
}

function createFirstNotes() {
    const notes = [{
            "id": "yq6ao",
            "type": "noteVideo",
            "isPinned": false,
            "info": {
                "title": "",
                "txt": "",
                "todos": [],
                "imgUrl": "",
                "videoUrl": "7zhga7DLloI"
            },
            "categories": [
                "videos",
                "media",
                "general:color"
            ],
            "bgc": "#ffff88"
        },
        {
            "id": "MZp2QUQYNL",
            "type": "noteTodos",
            "isPinned": true,
            "info": {
                "title": "My Note",
                "txt": "My fullstack baby",
                "todos": [{
                        "txt": "Buy running shoes",
                        "isDone": false
                    },
                    {
                        "txt": "Clean grill",
                        "isDone": true
                    },
                    {
                        "txt": "Change T-shirt",
                        "isDone": false
                    }
                ],
                "imgUrl": "",
                "videoUrl": ""
            },
            "categories": [
                "notes",
                "todos",
                "cars:color"
            ],
            "bgc": "rgb(255, 204, 136)"
        },
        {
            "id": "rv9HfqhetE",
            "type": "noteTxt",
            "isPinned": false,
            "info": {
                "title": "My Note",
                "txt": "My fullstack baby",
                "todos": [],
                "imgUrl": "",
                "videoUrl": ""
            },
            "categories": [
                "notes",
                "general:color"
            ],
            "bgc": "#ffff88"
        },
        {
            "id": "DwTbAE9Luh",
            "type": "noteImg",
            "isPinned": true,
            "info": {
                "title": "",
                "txt": "",
                "todos": [],
                "imgUrl": LIOR,
                "videoUrl": ""
            },
            "categories": [
                "photos",
                "media",
                "work:color"
            ],
            "bgc": "rgb(255, 136, 136)"
        },
        {
            "id": "yHje3U2e5G",
            "type": "noteTodos",
            "isPinned": false,
            "info": {
                "title": "Shopping friday",
                "txt": "",
                "todos": [{
                        "txt": "LOUIS VUITTON shoes",
                        "isDone": false
                    },
                    {
                        "txt": "Full Stack Course",
                        "isDone": false
                    },
                    {
                        "txt": "Developer Paycheck",
                        "isDone": false
                    },
                    {
                        "txt": "Self Confidence",
                        "isDone": true
                    }
                ],
                "imgUrl": "",
                "videoUrl": ""
            },
            "categories": [
                "notes",
                "todos",
                "cars:color"
            ],
            "bgc": "rgb(255, 204, 136)"
        },
        {
            "id": "UpkZGv3xdK",
            "type": "noteTxt",
            "isPinned": true,
            "info": {
                "title": "Poem",
                "txt": "Roses are red, Violets are blue, I love JS BUT hate Vue too!",
                "todos": [],
                "imgUrl": "",
                "videoUrl": ""
            },
            "categories": [
                "notes",
                "insurance:color"
            ],
            "bgc": "rgb(204, 255, 153)"
        },
        {
            "id": "7HsUFm8iGp",
            "type": "noteTxt",
            "isPinned": false,
            "info": {
                "title": "My Note",
                "txt": "My fullstack baby",
                "todos": [],
                "imgUrl": "",
                "videoUrl": ""
            },
            "categories": [
                "notes",
                "work:color"
            ],
            "bgc": "rgb(255, 136, 136)"
        },
        {
            "id": "1TAlCHfvOW",
            "type": "noteTxt",
            "isPinned": false,
            "info": {
                "title": "My Note",
                "txt": "My fullstack baby",
                "todos": [],
                "imgUrl": "",
                "videoUrl": ""
            },
            "categories": [
                "notes",
                "general:color"
            ],
            "bgc": "#ffff88"
        },
        {
            "id": "VwaDwfzXqE",
            "type": "noteTxt",
            "isPinned": false,
            "info": {
                "title": "My Note",
                "txt": "My fullstack baby",
                "todos": [],
                "imgUrl": "",
                "videoUrl": ""
            },
            "categories": [
                "notes",
                "family:color"
            ],
            "bgc": "rgb(136, 187, 255)"
        },
        {
            "id": "IgdzSP4Bfv",
            "type": "noteTxt",
            "isPinned": false,
            "info": {
                "title": "My Note",
                "txt": "My fullstack baby",
                "todos": [],
                "imgUrl": "",
                "videoUrl": ""
            },
            "categories": [
                "notes",
                "diet:color"
            ],
            "bgc": "rgb(255, 255, 255)"
        }
    ]

    return notes
}

function toggleIsDone({ noteId, todoIdx }) {
    return query()
        .then(res => {
            const note = res.find(note => (note.id === noteId))
            note.info.todos[todoIdx].isDone = !(note.info.todos[todoIdx].isDone)
            save(note)
            return res
        })
}

function getNotesToShow(notes, searchStr, filterStr) {
    searchStr = searchStr.toLowerCase()
    filterStr = filterStr.toLowerCase()
    if (filterStr === 'all') return notes
    return notes.filter(note => {
        return (note.info.title.toLowerCase().includes(searchStr) ||
                note.info.txt.toLowerCase().includes(searchStr) ||
                note.info.todos.some(todo => todo.txt.toLowerCase().includes(searchStr))) &&
            (note.categories.some(category => category.toLowerCase().includes(filterStr)))
    })
}

const LIOR = `./img/lior.jpg`