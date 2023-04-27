export default class Project {
    
    constructor(name, description, photo, notes, domainId, projectId) {
        this.name = name
        this.description = description
        this.photo = photo
        this.notes = notes
        this.domainId = domainId
        this.projectId = projectId
    }

    setName(name) {
        this.name = name
    }

    setDescription(description) {
        this.description = description
    }
    
    setPhoto(photo) {
        this.photo = photo
    }

    setNotes(notes) {
        this.notes = notes
    }
    setDomains(domainId) {
        this.domainId = domainId
    }
    setProjectId(projectId) {
        this.projectId = projectId
    }

    getDescription() {
        return this.description
    }
    getName() {
        return this.name
    }
    getJSON() {
        return {
            name: this.name,
            description: this.description,
            photo: this.photo,
            notes: this.notes,
            domainId: this.domainId,
            projectId: this.projectId
        }
    }
}
