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
  let month = String(aDate.getMonth() + 1) 
  let day = String(aDate.getDate())
  if (day.length === 1){
      day = "0" + day
  }
  let year = String(aDate.getFullYear()).slice(-2)
  let date = month + day + year;
  let time = (aDate.toTimeString()).slice(0,5);

  Seals.insert({ObserverName, ObserverPhone, ObserverInitials, ObserverType, Sector, LocationName, LocationNotes, SealPresent,	Size,	Sex,	BeachPosition,	MainIdentification,	BleachNumber,	TagNumber,	TagSide,	TagColor,	MomPup,	SealDepart,	SealDepartDate,	SealDepartTime,	OtherNotes,	xTagYN,	xLatitude,	xLongitude,	xNumHundredFt,	xAnimalBehavior,	xBandYN,	xBandColor,	xBleachMarkYN,	xScarsYN,	xScarsLocation,	xImages,	xIsland, DateObjectObserved: aDate,	DateObserved: date,	TimeObserved: time});
}
 
function insertTurtle ({ObserverName,	ObserverPhone,	ObserverInitials,	ObserverType,	Island,	Sector,	LocationName,	LocationNotes,	TurtleType,	Size,	Status,	OtherNotes,	xTagYN,	xLatitude,	xLongitude,	xNumHundredFt,	xAnimalBehavior,	xTagNumber,	xTagSide,	xTagColor,	xBandYN,	xBandColor,	xBleachMarkYN,	xBleachMarkNum,	xScarsYN,	xScarsLocation,	xAmpFlipper,	xWhichFlipper,	xImages,	MainIdentification}) {
  let aDate = new Date();
  let month = String(aDate.getMonth() + 1) 
  let day = String(aDate.getDate())
  if (day.length === 1){
      day = "0" + day
  }
  let year = String(aDate.getFullYear()).slice(-2)
  let date = month + day + year;
  let time = (aDate.toTimeString()).slice(0,5);

  Turtles.insert({DateObjectObserved: aDate,	DateObserved: date,	TimeObserved: time,	ObserverName,	ObserverPhone,	ObserverInitials,	ObserverType,	Island,	Sector,	LocationName,	LocationNotes,	TurtleType,	Size,	Status,	OtherNotes,	xTagYN,	xLatitude,	xLongitude,	xNumHundredFt,	xAnimalBehavior,	xTagNumber,	xTagSide,	xTagColor,	xBandYN,	xBandColor,	xBleachMarkYN,	xBleachMarkNum,	xScarsYN,	xScarsLocation,	xAmpFlipper,	xWhichFlipper,	xImages,	MainIdentification})
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

  // If the Turtles collection is empty, add some data.
  if (Turtles.find().count() === 0) {
    console.log("Seeding Turtles collection");
    insertTurtle({
      "ObserverName": "Mary",
      "ObserverPhone": "808-938-1284",
      "ObserverInitials": "MJ",
      "ObserverType": "P",
      "Island": "Oahu",
      "Sector": "West",
      "LocationName": "Kualoa Regional Park",
      "LocationNotes": "",
      "TurtleType": "Cm",
      "Size": "1ft",
      "Status": "Alive",
      "OtherNotes": "",
      "xTagYN": "Y",
      "xLatitude": "21.516933",
      "xLongitude": "-157.837617",
      "xNumHundredFt": "1",
      "xAnimalBehavior": "Swimming",
      "xTagNumber": "D9102",
      "xTagSide": "Left hind flipper",
      "xTagColor": "N",
      "xBandYN": "Y",
      "xBandColor": "R",
      "xBleachMarkYN": "N",
      "xBleachMarkNum": "",
      "xScarsYN": "N",
      "xScarsLocation": "",
      "xAmpFlipper": "",
      "xWhichFlipper": "",
      "xImages": ["a;sdkjfasda.jpeg", "uwerhbcukasjdhf.jpg"],
      "MainIdentification": "T",
    });

    insertTurtle({
     
    });

  }

});
