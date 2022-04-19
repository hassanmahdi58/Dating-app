const User = require("../models/User");

const userData = [
  {
    name: "Ronaldo",
    email: "ronaldo@example.com",
    password: "Hello",
    age: 26,
    img: "https://i2-prod.manchestereveningnews.co.uk/sport/article23234083.ece/ALTERNATES/s615/0_GettyImages-1238782208.jpg",
    gender: "Male",
    sexuality: "Straight",
    about: "I like football!",
    interests: "Football",
    location: "Madrid",
    height: 1.6,
    build: "Slim",
    seriousness: "Casual",
  },
  {
    name: "Sarah",
    email: "Sarah@example.com",
    password: "Hello",
    age: 25,
    img: "https://images.theconversation.com/files/443350/original/file-20220131-15-1ndq1m6.jpg?ixlib=rb-1.1.0&rect=0%2C0%2C3354%2C2464&q=45&auto=format&w=926&fit=clip",
    gender: "Female",
    sexuality: "Straight",
    about: "I like coding!",
    interests: "Computers",
    location: "Yerevan",
    height: 1.7,
    build: "Slim",
    seriousness: "Dating"
}
,
{
  name: "Bob",
  email: "bob@example.com",
  password: "Hello",
  age: 25,
  img: "https://pbs.twimg.com/profile_images/1028301966085107712/MRDSpXIc_400x400.jpg",
  gender: "Female",
  sexuality: "Straight",
  about:
    "I like coding!",
  interests: "Computers",
  location: "Birmingham",
  height: 1.6,
  build: "Slim",
  seriousness: "Dating"
}
,
{
  name: "Liam",
  email: "liam@example.com",
  password: "Hello",
  age: 27,
  img: "https://i2-prod.mirror.co.uk/incoming/article13555103.ece/ALTERNATES/s615/0_Perfect-beach-view-Summer-holiday-and-vacation-design-Inspirational-tropical-beach-palm-trees-and.jpg",
  gender: "Male",
  sexuality: "Gay",
  about:
    "I like running!",
  interests: "Sports",
  location: "Coventry",
  height: 1.6,
  build: "Slim",
  seriousness: "Dating"
}
,
{
  name: "Jonathon",
  email: "jonathon@example.com",
  password: "Hello",
  age: 35,
  img: "https://www.baincapital.com/sites/default/files/team/JP_Plain%20White%20Background%20-%20square.jpg",
  gender: "Male",
  sexuality: "Straight",
  about:
    "I am serious about dating!",
  interests: "Reading",
  location: "Manchester",
  height: 1.7,
  build: "Slim",
  seriousness: "Relationship"
}
,
{
  name: "Rhys",
  email: "Rhys@example.com",
  password: "Hello",
  age: 28,
  img: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2012/09/07/22/5452477.jpg?quality=75&width=640&height=614&fit=bounds&format=pjpg&crop=16%3A9%2Coffset-y0.5&auto=webp",
  gender: "Male",
  sexuality: "Straight",
  about:
    "Dating!",
  interests: "Coding",
  location: "Manchester",
  height: 1.7,
  build: "Slim",
  seriousness: "Friendship"
}
,
{
  name: "Elliott",
  email: "elliott@example.com",
  password: "Hello",
  age: 26,
  img: "https://hips.hearstapps.com/hmg-prod/images/love-and-care-my-city-royalty-free-image-1616634469.",
  gender: "Female",
  sexuality: "Straight",
  about:
    "Dating!",
  interests: "Coding",
  location: "Birmingham",
  height: 1.7,
  build: "Slim",
  seriousness: "Dating"
}
,
{
  name: "Mai",
  email: "Mai@example.com",
  password: "Hello",
  age: 20,
  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Mai_Tai_Trader_Vics_Emeryville.jpg/1200px-Mai_Tai_Trader_Vics_Emeryville.jpg",
  gender: "Female",
  sexuality: "Straight",
  about:
    "Dating!",
  interests: "Cooking",
  location: "Bolton",
  height: 1.7,
  build: "Slim",
  seriousness: "Dating"
}
, 
{
  name: "Messi",
  email: "Messi@example.com",
  password: "Hello",
  age: 30,
  img: "https://hips.hearstapps.com/esquireuk.cdnds.net/15/37/original/original-lionel-messi-esquire-feature-5-43-jpg-ff13c833.jpg",
  gender: "Male",
  sexuality: "Straight",
  about:
    "Dating!",
  interests: "Football",
  location: "Paris",
  height: 1.7,
  build: "Slim",
  seriousness: "Dating"
}
, 
{
  name: "Liza",
  email: "Liza@example.com",
  password: "Hello",
  age: 26,
  img: "https://upload.wikimedia.org/wikipedia/commons/d/d5/20200303%E2%80%94Liza_Koshy%2C_interview%2C_%22Pretty_Big_Deal%22_screenshot_%2801m11s%29.jpg",
  gender: "Female",
  sexuality: "Straight",
  about:
    "YouTuber!",
  interests: "Movies",
  location: "Miami",
  height: 1.7,
  build: "Slim",
  seriousness: "Dating"
}
,
{
  name: "Gigi",
  email: "Gigi@example.com",
  password: "Hello",
  age: 28,
  img: "https://www.arcticseatours.is/media/1820/2018-08-21-102420-1-2.jpg",
  gender: "Female",
  sexuality: "Straight",
  about:
    "Dating!",
  interests: "Model",
  location: "New York",
  height: 1.5,
  build: "Slim",
  seriousness: "Dating"
}
,

{
  name: "Lisa",
  email: "lisa@example.com",
  password: "Hello",
  age: 29,
  img: "https://img.buzzfeed.com/buzzfeed-static/static/2021-07/15/13/asset/9b5ec48cc2a5/sub-buzz-1335-1626357193-46.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto",
  gender: "Female",
  sexuality: "Straight",
  about:
    "Dating!",
  interests: "Tennis",
  location: "Leicester",
  height: 1.7,
  build: "Slim",
  seriousness: "Dating"
}
];

const seedUsers = async () => {
  const promises = userData.map((user) => User.create(user));
  await Promise.all(promises);
};

module.exports = seedUsers;
