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

  Turtles.insert({Animal: "Turtle", DateObjectObserved: aDate,	DateObserved: date,	TimeObserved: time,	ObserverName,	ObserverPhone,	ObserverInitials,	ObserverType,	Island,	Sector,	LocationName,	LocationNotes,	TurtleType,	Size,	Status,	OtherNotes,	xTagYN,	xLatitude,	xLongitude,	xNumHundredFt,	xAnimalBehavior,	xTagNumber,	xTagSide,	xTagColor,	xBandYN,	xBandColor,	xBleachMarkYN,	xBleachMarkNum,	xScarsYN,	xScarsLocation,	xAmpFlipper,	xWhichFlipper,	xImages,	MainIdentification})
}

function insertBird ({Animal,	TicketNumber,	HotlineOpInitials,	TicketType,	ObserverName,	ObserverPhone,	ObserverInitials,	ObserverType,	Sector,	LocationName,	LocationNotes,	Size,	BirdType,	ResponderName,	Delivered,	WhereTo,	OutreachProvided,	NumCallsReceived,	OtherNotes,	xLatitude,	xLongitude,	xNumHundredFt,	xAnimalBehavior,	xTagYN,	xBandYN,	xBandColor,	xBleachMarkYN,	xBleachMarkNum,	xTagNumber,	xTagSide,	xTagColor,	xScarsYN,	xScarsLocation,	xImages,	MainIdentification,	xSightings,	xRelated,	xIsland,	xConfirmRelated,	xChecked}) {
  let aDate = new Date();
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

function insertOther ({Animal, TicketNumber,	HotlineOpInitials,	TicketType,	ObserverName,	ObserverPhone,	ObserverInitials,	ObserverType,	Sector,	Size,	LocationName,	LocationNotes,	NumHundredFt,	xAnimalBehavior,	TagYN,	BandYN,	BandColor,	BleachMarkYN,	BleachMarkNum,	TagNumber,	TagSide,	TagColor,	ScarsYN,	ScarsLocation,	Images,	Island,	MainIdentification,	OtherNotes,	xSightings,	xLatitude,	xLongitude,	xChecked}) {
  let aDate = new Date();
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
      SealDepart: "No",
      SealDepartDate: "",
      SealDepartTime: "",
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
      SealDepart: "N",
      SealDepartDate: "",
      SealDepartTime: "",
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
      xLatitude: "21.582583",
      xLongitude: "-158.124545",
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

    // insertBird({
      
    // });
  }

  // If the Others collection is empty, add some data.
  if (Others.find().count() === 0) {
    console.log("Seeding Others collection");
    insertOther({
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

});

