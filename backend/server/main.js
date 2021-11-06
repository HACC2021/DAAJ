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

function insertSeal({ ObserverName, ObserverPhone, ObserverInitials, ObserverType, Sector, LocationName, LocationNotes, SealPresent,	Size,	Sex,	BeachPosition,	MainIdentification,	BleachNumber,	TagNumber,	TagSide,	TagColor,	MomPup,	SealDepart,	SealDepartDate,	SealDepartTime,	OtherNotes,	xTagYN,	xLatitude,	xLongitude,	xNumHundredFt,	xAnimalBehavior,	xBandYN,	xBandColor,	xBleachMarkYN,	xScarsYN,	xScarsLocation,	xImages,	xIsland}) {
  let aDate = new Date();
  let month = String(aDate.getMonth() + 1)  // 10 (PS: +1 since Month is 0-based)
  let day = String(aDate.getDate())       // 30
  let year = String(aDate.getFullYear()).slice(-2)   // 2020
  let date = month + day + year;
  let time = (aDate.toTimeString()).slice(5);

  Seals.insert({ObserverName, ObserverPhone, ObserverInitials, ObserverType, Sector, LocationName, LocationNotes, SealPresent,	Size,	Sex,	BeachPosition,	MainIdentification,	BleachNumber,	TagNumber,	TagSide,	TagColor,	MomPup,	SealDepart,	SealDepartDate,	SealDepartTime,	OtherNotes,	xTagYN,	xLatitude,	xLongitude,	xNumHundredFt,	xAnimalBehavior,	xBandYN,	xBandColor,	xBleachMarkYN,	xScarsYN,	xScarsLocation,	xImages,	xIsland, DateObjectObserved: aDate,	DateObserved: date,	TimeObserved: time});
}


Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (LinksCollection.find().count() === 0) {
    console.log("Seeding Links collection");
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

  // If the Seals collection is empty, add some data.
  if (Seals.find().count() === 0) {
    console.log("Seeding Seals collection");
    insertSeal({
      "ObserverName": "John", 
      "ObserverPhone": "808-123-4567", 
      "ObserverInitials": "JD", 
      "ObserverType": "P", 
      "Sector": "N", 
      "LocationName": "Hanauma Bay", 
      "LocationNotes": "", 
      "SealPresent": "Y", 
      "Size": "2ft", 
      "Sex": "F", 
      "BeachPosition": "1", 
      "MainIdentification": "T", 
      "BleachNumber": "", 
      "TagNumber": "H193", 
      "TagSide": "Right side", 
      "TagColor": "R", 
      "MomPup": "", 
      "SealDepart": "No", 
      "SealDepartDate": "", 
      "SealDepartTime": "", 
      "OtherNotes": "", 
      "xTagYN": "Yes", 
      "xLatitude": 21.27518, 
      "xLongitude": -157.69368, 
      "xNumHundredFt": 5, 
      "xAnimalBehavior": "Sleeping", 
      "xBandYN": "N", 
      "xBandColor": "", 
      "xBleachMarkYN": "N", 
      "xScarsYN": "Y", 
      "xScarsLocation": "Bottom of the left front Flipper", 
      "xImages": ["laksjdhfkasdfhakjsdfasdfj.jpeg", "as;odfijosdfhajksdhflasf.jpg"], 
      "xIsland": "Oahu"
    });

    insertSeal({
     
    });

  }
});
