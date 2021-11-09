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
import { getLocationName } from '../imports/api/maps/Maps';


// int days : the number of days to go forward or back. Positive number for forward; negative for backward
// int minutes : the number of minutes to go forward or back. Positive number for forward; negative for backward
//               can go beyond 60 mins
function chooseTime (days = 0, minutes = 0) {
  let time = new Date();
  time.setDate(time.getDate() + days); // Change the date
  time.setMinutes(time.getMinutes() + minutes); // Change the time
  return time;
}


function insertLink({ title, url }) {
  LinksCollection.insert({title, url, createdAt: new Date()});
}

function insertSeal({ artificialTime, ObserverName, ObserverPhone, ObserverInitials, ObserverType, Sector, LocationName, LocationNotes, SealPresent,	Size,	Sex,	BeachPosition,	MainIdentification,	BleachNumber,	TagNumber,	TagSide,	TagColor,	MomPup,	SealDepart,	SealDepartDate,	SealDepartTime,	OtherNotes,	xTagYN,	xLatitude,	xLongitude,	xNumHundredFt,	xAnimalBehavior,	xBandYN,	xBandColor,	xBleachMarkYN,	xScarsYN,	xScarsLocation,	xImages,	xIsland, TicketNumber,	HotlineOpInitials,	TicketType,	IDPerm,	Molt,	AdditionalNotesOnID,	IDVerifiedBy,	SealLogging,	SRASetBy,	NumVolunteers,	NumCalls,	xSightings,	xRelated,	xConfirmRelated,}) {
  let aDate = artificialTime;
  let month = String(aDate.getMonth() + 1) 
  let day = String(aDate.getDate())
  if (day.length === 1){
      day = "0" + day
  }
  let year = String(aDate.getFullYear()).slice(-2)
  let date = month + day + year;
  let time = (aDate.toTimeString()).slice(0,5);

  Seals.insert({Animal: "Seal", ObserverName, ObserverPhone, ObserverInitials, ObserverType, Sector, LocationName, LocationNotes, SealPresent,	Size,	Sex,	BeachPosition,	MainIdentification,	BleachNumber,	TagNumber,	TagSide,	TagColor,	MomPup,	SealDepart,	SealDepartDate,	SealDepartTime,	OtherNotes,	xTagYN,	xLatitude,	xLongitude,	xNumHundredFt,	xAnimalBehavior,	xBandYN,	xBandColor,	xBleachMarkYN,	xScarsYN,	xScarsLocation,	xImages,	xIsland, DateObjectObserved: aDate,	DateObserved: date,	TimeObserved: time, TicketNumber,	HotlineOpInitials,	TicketType,	IDPerm,	Molt,	AdditionalNotesOnID,	IDVerifiedBy,	SealLogging,	SRASetBy,	NumVolunteers,	NumCalls,	xSightings,	xRelated,	xConfirmRelated});
}
 
function insertTurtle ({ artificialTime, ObserverName,	ObserverPhone,	ObserverInitials,	ObserverType,	Island,	Sector,	LocationName,	LocationNotes,	TurtleType,	Size,	Status,	OtherNotes,	xTagYN,	xLatitude,	xLongitude,	xNumHundredFt,	xAnimalBehavior,	xTagNumber,	xTagSide,	xTagColor,	xBandYN,	xBandColor,	xBleachMarkYN,	xBleachMarkNum,	xScarsYN,	xScarsLocation,	xAmpFlipper,	xWhichFlipper,	xImages,	MainIdentification, xSightings}) {
  let aDate = artificialTime;
  let month = String(aDate.getMonth() + 1) 
  let day = String(aDate.getDate())
  if (day.length === 1){
      day = "0" + day
  }
  let year = String(aDate.getFullYear()).slice(-2)
  let date = month + day + year;
  let time = (aDate.toTimeString()).slice(0,5);

  Turtles.insert({Animal: "Turtle", DateObjectObserved: aDate,	DateObserved: date,	TimeObserved: time,	ObserverName,	ObserverPhone,	ObserverInitials,	ObserverType,	Island,	Sector,	LocationName,	LocationNotes,	TurtleType,	Size,	Status,	OtherNotes,	xTagYN,	xLatitude,	xLongitude,	xNumHundredFt,	xAnimalBehavior,	xTagNumber,	xTagSide,	xTagColor,	xBandYN,	xBandColor,	xBleachMarkYN,	xBleachMarkNum,	xScarsYN,	xScarsLocation,	xAmpFlipper,	xWhichFlipper,	xImages,	MainIdentification, xSightings})
}

function insertBird ({ artificialTime, Animal,	TicketNumber,	HotlineOpInitials,	TicketType,	ObserverName,	ObserverPhone,	ObserverInitials,	ObserverType,	Sector,	LocationName,	LocationNotes,	Size,	BirdType,	ResponderName,	Delivered,	WhereTo,	OutreachProvided,	NumCallsReceived,	OtherNotes,	xLatitude,	xLongitude,	xNumHundredFt,	xAnimalBehavior,	xTagYN,	xBandYN,	xBandColor,	xBleachMarkYN,	xBleachMarkNum,	xTagNumber,	xTagSide,	xTagColor,	xScarsYN,	xScarsLocation,	xImages,	MainIdentification,	xSightings,	xRelated,	xIsland,	xConfirmRelated,	xChecked}) {
  let aDate = artificialTime;
  let month = String(aDate.getMonth() + 1) 
  let day = String(aDate.getDate())
  if (day.length === 1){
      day = "0" + day
  }
  let year = String(aDate.getFullYear()).slice(-2)
  let date = month + day + year;
  let time = (aDate.toTimeString()).slice(0,5);

  Birds.insert({DateObjectObserved: aDate,	DateObserved: date,	TimeObserved: time, Animal,	TicketNumber,	HotlineOpInitials,	TicketType,	ObserverName,	ObserverPhone,	ObserverInitials,	ObserverType,	Sector,	LocationName,	LocationNotes,	Size,	BirdType,	ResponderName,	Delivered,	WhereTo,	OutreachProvided,	NumCallsReceived,	OtherNotes,	xLatitude,	xLongitude,	xNumHundredFt,	xAnimalBehavior,	xTagYN,	xBandYN,	xBandColor,	xBleachMarkYN,	xBleachMarkNum,	xTagNumber,	xTagSide,	xTagColor,	xScarsYN,	xScarsLocation,	xImages,	MainIdentification,	xSightings,	xRelated,	xIsland,	xConfirmRelated,	xChecked})
}

function insertOther ({ artificialTime, Animal, TicketNumber,	HotlineOpInitials,	TicketType,	ObserverName,	ObserverPhone,	ObserverInitials,	ObserverType,	Sector,	Size,	LocationName,	LocationNotes,	NumHundredFt,	xAnimalBehavior,	TagYN,	BandYN,	BandColor,	BleachMarkYN,	BleachMarkNum,	TagNumber,	TagSide,	TagColor,	ScarsYN,	ScarsLocation,	Images,	Island,	MainIdentification,	OtherNotes,	xSightings,	xLatitude,	xLongitude,	xChecked}) {
  let aDate = artificialTime;
  let month = String(aDate.getMonth() + 1) 
  let day = String(aDate.getDate())
  if (day.length === 1){
      day = "0" + day
  }
  let year = String(aDate.getFullYear()).slice(-2)
  let date = month + day + year;
  let time = (aDate.toTimeString()).slice(0,5);

  Others.insert({Animal, DateObjectObserved: aDate,	DateObserved: date,	TimeObserved: time, TicketNumber,	HotlineOpInitials,	TicketType,	ObserverName,	ObserverPhone,	ObserverInitials,	ObserverType,	Sector,	Size,	LocationName,	LocationNotes,	NumHundredFt,	xAnimalBehavior,	TagYN,	BandYN,	BandColor,	BleachMarkYN,	BleachMarkNum,	TagNumber,	TagSide,	TagColor,	ScarsYN,	ScarsLocation,	Images,	Island,	MainIdentification,	OtherNotes,	xSightings,	xLatitude,	xLongitude,	xChecked})
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
      artificialTime: chooseTime(0, 0),
      Animal: "Seal",
      TicketNumber: "",
      HotlineOpInitials: "",
      TicketType: "",
      ObserverName: "John",
      ObserverPhone: "808-123-4567",
      ObserverInitials: "JD",
      ObserverType: "P",
      Sector: "East",
      LocationName: "Hanauma Bay Nature Preserve and State Underwater Park",
      LocationNotes: "",
      SealPresent: "Y",
      Size: "3ft",
      Sex: "F",
      BeachPosition: "On land",
      MainIdentification: "T",
      BleachNumber: "",
      TagNumber: "H1923",
      TagSide: "Right flipper",
      TagColor: "R",
      IDPerm: "",
      Molt: "",
      AdditionalNotesOnID: "",
      IDVerifiedBy: "",
      SealLogging: "",
      MomPup: "N",
      SRASetBy: "",
      NumVolunteers: "",
      NumCalls: "",
      OtherNotes: "",
      xLatitude: 21.27518,
      xLongitude:	-157.69368,
      xNumHundredFt: "10",
      xAnimalBehavior: "Sleeping",
      xTagYN: "Y",
      xBandYN: "Y",
      xBandColor: "N",
      xBleachMarkYN: "N",
      xScarsYN: "N",
      xScarsLocation: "",
      xImages: ["askfajhienxfbiq.jpeg", "hbetysdfihqwjeh.jpeg"],
      xIsland: "_Oahu__",
      xSightings: 1,
      xRelated: "",
      xConfirmRelated: "",
      xChecked: "0",
    });

    insertSeal({
      artificialTime: chooseTime(0, 30),
      Animal: "Seal",
      TicketNumber: "",
      HotlineOpInitials: "",
      TicketType: "",
      ObserverName: "Abdullah",
      ObserverPhone: "808-123-4567",
      ObserverInitials: "AQ",
      ObserverType: "P",
      Sector: "East",
      LocationName: "Hanauma Bay Nature Preserve and State Underwater Park",
      LocationNotes: "",
      SealPresent: "Y",
      Size: "3ft",
      Sex: "F",
      BeachPosition: "On land",
      MainIdentification: "T",
      BleachNumber: "",
      TagNumber: "H1923",
      TagSide: "Right flipper",
      TagColor: "R",
      IDPerm: "",
      Molt: "",
      AdditionalNotesOnID: "",
      IDVerifiedBy: "",
      SealLogging: "",
      MomPup: "N",
      SRASetBy: "",
      NumVolunteers: "",
      NumCalls: "",
      OtherNotes: "",
      xLatitude: 21.37518,
      xLongitude:	-157.49368,
      xNumHundredFt: "5",
      xAnimalBehavior: "Resting",
      xTagYN: "Y",
      xBandYN: "Y",
      xBandColor: "N",
      xBleachMarkYN: "N",
      xScarsYN: "N",
      xScarsLocation: "",
      xImages: ["askfajhienxfbiq.jpeg", "hbetysdfihqwjeh.jpeg"],
      xIsland: "_Oahu__",
      xSightings: 1,
      xRelated: "",
      xConfirmRelated: "",
      xChecked: "0",
    });

    insertSeal({
      artificialTime: chooseTime(0, -180),
      Animal: "Seal",
      TicketNumber: "",
      HotlineOpInitials: "",
      TicketType: "", 
      ObserverName: "Rachel",
      ObserverPhone: "808-343-4849",
      ObserverInitials: "RG",
      ObserverType: "P",
      Sector: "East",
      LocationName: "Waimanalo Beach Park",
      LocationNotes: "",
      SealPresent: "Y",
      Size: "4ft",
      Sex: "M",
      BeachPosition: "In-water",
      MainIdentification: "A",
      BleachNumber: "J123",
      TagNumber: "W0123",
      TagSide: "On the tail",
      TagColor: "R",
      IDPerm: "",
      Molt: "",
      AdditionalNotesOnID: "",
      IDVerifiedBy: "",
      SealLogging: "",
      MomPup: "N",
      SRASetBy: "",
      NumVolunteers: "",
      NumCalls: "",
      OtherNotes: "",
      xLatitude: 21.33246,
      xLongitude: -157.69364,
      xNumHundredFt: "15",
      xAnimalBehavior: "Violently barking at dogs",
      xTagYN: "Y",
      xBandYN: "N",
      xBandColor: "N",
      xBleachMarkYN: "Y",
      xScarsYN: "N",
      xScarsLocation: "",
      xImages: ["lkjhgfdwertyui.jpeg", "kjhxcvrtyuicvb.jpeg"],
      xIsland: "Oahu",
      xSightings: 1,
      xRelated: "",
      xConfirmRelated: "",
      xChecked: "0",
    });

    insertSeal({
      artificialTime: chooseTime(0, -50),
      Animal: "Seal",
      TicketNumber: "",
      HotlineOpInitials: "",
      TicketType: "", 
      ObserverName: "Rachel",
      ObserverPhone: "808-343-4849",
      ObserverInitials: "RG",
      ObserverType: "P",
      Sector: "East",
      LocationName: "Army Beach",
      LocationNotes: "",
      SealPresent: "Y",
      Size: "2ft",
      Sex: "F",
      BeachPosition: "On beach",
      MainIdentification: "B",
      BleachNumber: "A263",
      TagNumber: "H235",
      TagSide: "On the fin",
      TagColor: "L",
      IDPerm: "",
      Molt: "",
      AdditionalNotesOnID: "",
      IDVerifiedBy: "",
      SealLogging: "",
      MomPup: "N",
      SRASetBy: "",
      NumVolunteers: "",
      NumCalls: "",
      OtherNotes: "",
      xLatitude: 21.33246,
      xLongitude: -157.69364,
      xNumHundredFt: "15",
      xAnimalBehavior: "Resting on beach",
      xTagYN: "Y",
      xBandYN: "Y",
      xBandColor: "N",
      xBleachMarkYN: "Y",
      xScarsYN: "N",
      xScarsLocation: "",
      xImages: ["lkjhgfdwertyui.jpeg", "kjhxcvrtyuicvb.jpeg"],
      xIsland: "Oahu",
      xSightings: 1,
      xRelated: "",
      xConfirmRelated: "",
      xChecked: "0",
    });

    // insertSeal({
      // Animal: "Seal",
      // TicketNumber: "",
      // HotlineOpInitials: "",
      // TicketType: "", 
      // ObserverName: "___",
      // ObserverPhone: "___",
      // ObserverInitials: "___",
      // ObserverType: "___",
      // Sector: "___",
      // LocationName: "___",
      // LocationNotes: "___",
      // SealPresent: "___",
      // Size: "___",
      // Sex: "___",
      // BeachPosition: "___",
      // MainIdentification: "___",
      // BleachNumber: "___",
      // TagNumber: "___",
      // TagSide: "___",
      // TagColor: "___",
      // IDPerm: "",
      // Molt: "",
      // AdditionalNotesOnID: "",
      // IDVerifiedBy: "",
      // SealLogging: "",
      // MomPup: "___",
      // SRASetBy: "",
      // NumVolunteers: "",
      // SealDepart: "___",
      // SealDepartDate: "___",
      // SealDepartTime: "___",
      // NumCalls: "",
      // OtherNotes: "___",
      // xLatitude: "___",
      // xLongitude: "___",
      // xNumHundredFt: "___",
      // xAnimalBehavior: "___",
      // xTagYN: "___",
      // xBandYN: "___",
      // xBandColor: "___",
      // xBleachMarkYN: "___",
      // xScarsYN: "___",
      // xScarsLocation: "___",
      // xImages: "___",
      // xIsland: "___",
      // xSightings: 1,
      // xRelated: "",
      // xConfirmRelated: "",
      // xChecked: "0",
    // });

  }

  // If the Turtles collection is empty, add some data.
  if (Turtles.find().count() === 0) {
    console.log("Seeding Turtles collection");
    insertTurtle({
      artificialTime: chooseTime(0, -25),
      Animal: "Turtle",
      TicketNumber: "",
      HotlineOpInitials: "",
      TicketType: "",
      ObserverName: "Mary",
      ObserverPhone: "808-123-4889",
      ObserverInitials: "MJ",
      ObserverType: "P",
      Island: "Oahu",
      Sector: "East",
      LocationName: "Kualoa Regional Park",
      LocationNotes: "",
      TurtleType: "Cm",
      Size: "3ft",
      Status: "Alive",
      PrimaryIssue: "",
      Response: "",
      TimeResponderLeft: "",
      ResponderArrivalTime: "",
      OutreachProvided: "",
      FAST: "",
      NumCallsReceived: "",
      OtherNotes: "",
      xLatitude: 21.516933,
      xLongitude: -157.837617,
      xNumHundredFt: "2",
      xAnimalBehavior: "Resting on sand",
      xTagYN: "Y",
      xTagNumber: "L123",
      xTagSide: "Left hind flipper",
      xTagColor: "R",
      xBandYN: "N",
      xBandColor: "",
      xBleachMarkYN: "",
      xBleachMarkNum: "",
      xScarsYN: "Y",
      xScarsLocation: "Middle of shell",
      xAmpFlipper: "N",
      xWhichFlipper: "",
      xImages: ["a;sdkjfasda.jpeg", "uwerhbcukasjdhf.jpg"],
      MainIdentification: "S",
      xSightings: 1,
      xRelated: "",
      xConfirmRelated: "",
      xChecked: 0,
    });

    insertTurtle({
      artificialTime: chooseTime(0, -30),
      Animal: "Turtle",
      TicketNumber: "",
      HotlineOpInitials: "",
      TicketType: "",
      ObserverName: "Alyssia",
      ObserverPhone: "808-422-4242",
      ObserverInitials: "AC",
      ObserverType: "P",
      Island: "Oahu",
      Sector: "East",
      LocationName: "Kualoa Regional Park",
      LocationNotes: "",
      TurtleType: "Cm",
      Size: "3ft",
      Status: "Alive",
      PrimaryIssue: "",
      Response: "",
      TimeResponderLeft: "",
      ResponderArrivalTime: "",
      OutreachProvided: "",
      FAST: "",
      NumCallsReceived: "",
      OtherNotes: "",
      xLatitude: 21.526933,
      xLongitude: -157.839617,
      xNumHundredFt: "5",
      xAnimalBehavior: "Resting on sand",
      xTagYN: "Y",
      xTagNumber: "L123",
      xTagSide: "Left hind flipper",
      xTagColor: "R",
      xBandYN: "N",
      xBandColor: "",
      xBleachMarkYN: "",
      xBleachMarkNum: "",
      xScarsYN: "Y",
      xScarsLocation: "Middle of shell",
      xAmpFlipper: "N",
      xWhichFlipper: "",
      xImages: ["a;sdkjfasda.jpeg", "uwerhbcukasjdhf.jpg"],
      MainIdentification: "S",
      xSightings: 1,
      xRelated: "",
      xConfirmRelated: "1",
      xChecked: 0,
    });

    insertTurtle({
      artificialTime: chooseTime(0, -40),
      Animal: "Turtle",
      TicketNumber: "",
      HotlineOpInitials: "",
      TicketType: "",
      ObserverName: "Ken",
      ObserverPhone: "808-424-4839",
      ObserverInitials: "LI",
      ObserverType: "P",
      Island: "Mayu",
      Sector: "West",
      LocationName: "Laniakea",
      LocationNotes: "In water",
      TurtleType: "Unknown",
      Size: "2ft",
      Status: "Alive",
      PrimaryIssue: "",
      Response: "",
      TimeResponderLeft: "1225",
      ResponderArrivalTime: "1316",
      OutreachProvided: "Y",
      FAST: "",
      NumCallsReceived: "",
      OtherNotes: "Public caller Kenneth  reporting an injured turtle at Laniakea Beach. Turtle is missing its left fore flipper and has bone or tendon coming out but appears partially healded. 2nd caller sent photos and stated it is about 2ft in size. No active bleeding at this time. Photos show same partial healing. Possible blood on neck. 3rd caller reporting same. ",
      xLatitude: 21.6188,
      xLongitude: -158.0854,
      xNumHundredFt: "4",
      xAnimalBehavior: "Resting",
      xTagYN: "N",
      xTagNumber: "L123",
      xTagSide: "Left hind flipper",
      xTagColor: "R",
      xBandYN: "N",
      xBandColor: "",
      xBleachMarkYN: "",
      xBleachMarkNum: "",
      xScarsYN: "N",
      xScarsLocation: "",
      xAmpFlipper: "Y",
      xWhichFlipper: "Left",
      xImages: ["a;sdkjfasda.jpeg", "uwerhbcukasjdhf.jpg"],
      MainIdentification: "S",
      xSightings: 1,
      xRelated: "",
      xConfirmRelated: "",
      xChecked: 0,
    });

    insertTurtle({
      artificialTime: chooseTime(0, -10),
      Animal: "Turtle",
      TicketNumber: "",
      HotlineOpInitials: "",
      TicketType: "",
      ObserverName: "Ken",
      ObserverPhone: "808-424-4839",
      ObserverInitials: "KI",
      ObserverType: "P",
      Island: "Mayu",
      Sector: "West",
      LocationName: "Laniakea",
      LocationNotes: "In water",
      TurtleType: "Unknown",
      Size: "2ft",
      Status: "Alive",
      PrimaryIssue: "",
      Response: "",
      TimeResponderLeft: "1225",
      ResponderArrivalTime: "1316",
      OutreachProvided: "Y",
      FAST: "",
      NumCallsReceived: "",
      OtherNotes: "",
      xLatitude: 21.6188,
      xLongitude: -158.0854,
      xNumHundredFt: "2",
      xAnimalBehavior: "Resting",
      xTagYN: "N",
      xTagNumber: "L123",
      xTagSide: "Right front flipper",
      xTagColor: "R",
      xBandYN: "Y",
      xBandColor: "R",
      xBleachMarkYN: "",
      xBleachMarkNum: "",
      xScarsYN: "Y",
      xScarsLocation: "On shell",
      xAmpFlipper: "Y",
      xWhichFlipper: "Left",
      xImages: ["a;sdkjfasda.jpeg", "uwerhbcukasjdhf.jpg"],
      MainIdentification: "S",
      xSightings: 1,
      xRelated: "",
      xConfirmRelated: "",
      xChecked: 0,
    });


    // insertTurtle({
      // Animal: "Turtle",
      // TicketNumber: "",
      // HotlineOpInitials: "",
      // TicketType: "",
      // ObserverName: "___",
      // ObserverPhone: "___",
      // ObserverInitials: "___",
      // ObserverType: "___",
      // Island: "___",
      // Sector: "___",
      // LocationName: "___",
      // LocationNotes: "___",
      // TurtleType: "___",
      // Size: "___",
      // Status: "___",
      // PrimaryIssue: "",
      // Response: "",
      // TimeResponderLeft: "",
      // ResponderArrivalTime: "",
      // OutreachProvided: "",
      // FAST: "",
      // NumCallsReceived: "",
      // OtherNotes: "___",
      // xLatitude: "___",
      // xLongitude: "___",
      // xNumHundredFt: "___",
      // xAnimalBehavior: "___",
      // xTagYN: "___",
      // xTagNumber: "___",
      // xTagSide: "___",
      // xTagColor: "___",
      // xBandYN: "___",
      // xBandColor: "___",
      // xBleachMarkYN: "___",
      // xBleachMarkNum: "___",
      // xScarsYN: "___",
      // xScarsLocation: "___",
      // xAmpFlipper: "___",
      // xWhichFlipper: "___",
      // xImages: "___",
      // MainIdentification: "___",
      // xSightings: 1,
      // xRelated: "",
      // xConfirmRelated: "",
      // xChecked: 0,
    // });

  }

  // If the Birds collection is empty, add some data.
  if (Birds.find().count() === 0) {
    console.log("Seeding Birds collection");
    insertBird({
      artificialTime: chooseTime(0, -5),
      Animal: "Bird",
      TicketNumber: "",
      HotlineOpInitials: "",
      TicketType: "",
      ObserverName: "Marty",
      ObserverPhone: "808-123-1230",
      ObserverInitials: "MD",
      ObserverType: "P",
      Sector: "South",
      LocationName: "Kaiaka Bay Beach Park",
      LocationNotes: "",
      Size: "N/A",
      BirdType: "LAAL",
      ResponderName: "",
      Delivered: "",
      WhereTo: "",
      OutreachProvided: "",
      NumCallsReceived: "",
      OtherNotes: "",
      xLatitude: 21.582583,
      xLongitude: -158.124545,
      xNumHundredFt: "2",
      xAnimalBehavior: "Flying around in circles",
      xTagYN: "Y",
      xBandYN: "N",
      xBandColor: "",
      xBleachMarkYN: "N",
      xBleachMarkNum: "",
      xTagNumber: "H102",
      xTagSide: "Right wing",
      xTagColor: "R",
      xScarsYN: "N",
      xScarsLocation: "",
      xImages: ["a;sdkjfasda.jpeg", "uwerhbcukasjdhf.jpg"],
      MainIdentification: "T",
      xSightings: 1,
      xRelated: "",
      xIsland: "Oahu",
      xConfirmRelated: "",
      xChecked: 0,
    });

    insertBird({
      artificialTime: chooseTime(0, -18),
      Animal: "Bird",
      TicketNumber: "",
      HotlineOpInitials: "",
      TicketType: "",
      ObserverName: "Dylan",
      ObserverPhone: "808-222-1430",
      ObserverInitials: "DD",
      ObserverType: "P",
      Sector: "South",
      LocationName: "Turtle Bay",
      LocationNotes: "",
      Size: "N/A",
      BirdType: "BRBO",
      ResponderName: "",
      Delivered: "",
      WhereTo: "",
      OutreachProvided: "",
      NumCallsReceived: "",
      OtherNotes: "",
      xLatitude: 21.7023,
      xLongitude: -158.000,
      xNumHundredFt: "2",
      xAnimalBehavior: "Eating a fish",
      xTagYN: "N",
      xBandYN: "Y",
      xBandColor: "B",
      xBleachMarkYN: "N",
      xBleachMarkNum: "",
      xTagNumber: "",
      xTagSide: "Left wing",
      xTagColor: "B",
      xScarsYN: "N",
      xScarsLocation: "",
      xImages: ["a;sdkjfasda.jpeg", "uwerhbcukasjdhf.jpg"],
      MainIdentification: "T",
      xSightings: 1,
      xRelated: "",
      xIsland: "Oahu",
      xConfirmRelated: "",
      xChecked: 0,
    });

    insertBird({
      artificialTime: chooseTime(0, -30),
      Animal: "Bird",
      TicketNumber: "",
      HotlineOpInitials: "",
      TicketType: "",
      ObserverName: "Mirabela",
      ObserverPhone: "808-842-643",
      ObserverInitials: "MM",
      ObserverType: "P",
      Sector: "South",
      LocationName: "Turtle Bay",
      LocationNotes: "",
      Size: "N/A",
      BirdType: "BRBO",
      ResponderName: "",
      Delivered: "",
      WhereTo: "",
      OutreachProvided: "",
      NumCallsReceived: "",
      OtherNotes: "",
      xLatitude: 21.8023,
      xLongitude: -158.000,
      xNumHundredFt: "8",
      xAnimalBehavior: "Sitting down",
      xTagYN: "N",
      xBandYN: "N",
      xBandColor: "",
      xBleachMarkYN: "N",
      xBleachMarkNum: "",
      xTagNumber: "",
      xTagSide: "Left wing",
      xTagColor: "B",
      xScarsYN: "N",
      xScarsLocation: "",
      xImages: ["a;sdkjfasda.jpeg", "uwerhbcukasjdhf.jpg"],
      MainIdentification: "T",
      xSightings: 1,
      xRelated: "",
      xIsland: "Oahu",
      xConfirmRelated: "",
      xChecked: 0,
    });

    // insertBird({
      
    // });
  }

  // If the Others collection is empty, add some data.
  if (Others.find().count() === 0) {
    console.log("Seeding Others collection");
    insertOther({
      artificialTime: chooseTime(0, -80),
      Animal: "Dolphin",
      TicketNumber: "",
      HotlineOpInitials: "",
      TicketType: "",
      ObserverName: "Bob",
      ObserverPhone: "808-563-5234",
      ObserverInitials: "BB",
      ObserverType: "P",
      Sector: "West",
      Size: "N/A",
      LocationName: "Hanauma Bay Nature Preserve and State Underwater Park",
      LocationNotes: "",
      NumHundredFt: "20",
      xAnimalBehavior: "Begging for food",
      TagYN: "Y",
      BandYN: "N",
      BandColor: "",
      BleachMarkYN: "N",
      BleachMarkNum: "",
      TagNumber: "L1029",
      TagSide: "Dorsal fin",
      TagColor: "R",
      ScarsYN: "N",
      ScarsLocation: "",
      Images: ["qwertyuiop.jpeg", "zxcvbnmsdfghj.jpg"],
      Island: "Oahu",
      MainIdentification: "T",
      OtherNotes: "",
      xSightings: 1,
      xLatitude: 21.27518,
      xLongitude: -157.69368,
      xChecked: 0,
    });

    insertOther({
      artificialTime: chooseTime(0, 83),
      Animal: "Whale",
      TicketNumber: "",
      HotlineOpInitials: "",
      TicketType: "",
      ObserverName: "Jolie",
      ObserverPhone: "808-253-2663",
      ObserverInitials: "JC",
      ObserverType: "P",
      Sector: "East",
      Size: "N/A",
      LocationName: "Shark's Cove",
      LocationNotes: "",
      NumHundredFt: "20",
      xAnimalBehavior: "Chilling",
      TagYN: "N",
      BandYN: "N",
      BandColor: "",
      BleachMarkYN: "N",
      BleachMarkNum: "",
      TagNumber: "",
      TagSide: "",
      TagColor: "R",
      ScarsYN: "N",
      ScarsLocation: "",
      Images: ["qwertyuiop.jpeg", "zxcvbnmsdfghj.jpg"],
      Island: "Oahu",
      MainIdentification: "T",
      OtherNotes: "",
      xSightings: 1,
      xLatitude: 21.6500,
      xLongitude: -158.0628,
      xChecked: 0,
    });

    // insertOther({
      // Animal: "___",
      // TicketNumber: "",
      // HotlineOpInitials: "",
      // TicketType: "",
      // ObserverName: "___",
      // ObserverPhone: "___",
      // ObserverInitials: "___",
      // ObserverType: "___",
      // Sector: "___",
      // Size: "N/A",
      // LocationName: "___",
      // LocationNotes: "___",
      // Latitude: "___",
      // Longitude: "___",
      // NumHundredFt: "___",
      // xAnimalBehavior: "___",
      // TagYN: "___",
      // BandYN: "___",
      // BandColor: "___",
      // BleachMarkYN: "___",
      // BleachMarkNum: "___",
      // TagNumber: "___",
      // TagSide: "___",
      // TagColor: "___",
      // ScarsYN: "___",
      // ScarsLocation: "___",
      // Images: "___",
      // Island: "___",
      // MainIdentification: "___",
      // OtherNotes: "___",
      // xSightings: 1,
      // xLatitude: "___",
      // xLongitude: "___",
      // xChecked: 0,
    // });
  }

  let result = getLocationName(21.2911, -157.8435);
  result.then(v => console.log("Location Name: " + v.data.result.name));
  // result.then((v) => {
  //   let filteredData = v.data.results.filter(obj => obj.geometry.location_type == "APPROXIMATE")[0].place_id;
  //   console.log(filteredData);
  // });
});

