import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links/Link';
import { PhoneNumbers } from '/imports/api/phonenumber/PhoneNumber';
import { Seals } from '/imports/api/seal/Seal';
import { Turtles } from '/imports/api/turtle/Turtle';
import { Birds } from '/imports/api/bird/Bird';
import { Others } from '/imports/api/other/Other';
import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/Mongo';

function insertLink({ title, url }) {
  LinksCollection.insert({title, url, createdAt: new Date()});
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (LinksCollection.find().count() === 0) {
    insertLink({
      title: 'Do the Tutorial',
      url: 'https://www.meteor.com/tutorials/react/creating-an-app'
    });

    insertLink({
      title: 'Follow the Guide',
      url: 'http://guide.meteor.com'
    });

    insertLink({
      title: 'Read the Docs',
      url: 'https://docs.meteor.com'
    });

    insertLink({
      title: 'Discussions',
      url: 'https://forums.meteor.com'
    });
  }
});
