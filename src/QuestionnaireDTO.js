/*class QuestionnaireDTO {
  constructor(data) {
    this.resourceType = data.resourceType || '';
    this.id = data.id || '';
    this.url = data.url || '';
    this.identifier = data.identifier ? data.identifier.map(id => new IdentifierDTO(id)) : [];
    this.version = data.version || '';
    this.name = data.name || '';
    this.title = data.title || '';
    this.status = data.status || '';
    this.date = data.date || '';
    this.publisher = data.publisher || '';
    this.description = data.description || '';
    this.purpose = data.purpose || '';
    this.subjectType = data.subjectType || [];
    this.item = data.item ? data.item.map(item => new QuestionnaireItemDTO(item)) : [];
  }
}

class IdentifierDTO {
  constructor(data) {
    this.system = data.system || '';
    this.value = data.value || '';
  }
}

class QuestionnaireItemDTO {
  constructor(data) {
    this.linkId = data.linkId || '';
    this.text = data.text || '';
    this.type = data.type || '';
    this.repeats = data.repeats || false;
    this.item = data.item ? data.item.map(subItem => new QuestionnaireItemDTO(subItem)) : [];
  }
}
*/
class QuestionnaireDTO {
  constructor(id, url, identifier, version, name, title, status, date, publisher, description, purpose, subjectType, item) {
    this.id = id;
    this.url = url;
    this.identifier = identifier;
    this.version = version;
    this.name = name;
    this.title = title;
    this.status = status;
    this.date = date;
    this.publisher = publisher;
    this.description = description;
    this.purpose = purpose;
    this.subjectType = subjectType;
    this.item = item;
  }
}
