var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Callout = new keystone.List('Callout', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true }
});

Callout.add({
    title: { type: String, required: true },
    slug: { type: String, index: true },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    author: { type: Types.Relationship, ref: 'User', index: true },
    publishedDate: { type: Types.Date, index: true },
    image: { type: Types.CloudinaryImage },
    content: {
        brief: { type: Types.Html, wysiwyg: true, height: 150 },
        extended: { type: Types.Html, wysiwyg: true, height: 400 }
    },
    categories: { type: Types.Relationship, ref: 'PostCategory', many: true }
});

Callout.schema.virtual('content.full').get(function() {
    return this.content.extended || this.content.brief;
});

Callout.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Callout.register();
