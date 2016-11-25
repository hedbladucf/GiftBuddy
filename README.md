# GiftBuddy

GiftBuddy is a full-stack project that implenets "Secret Santa" funcionality. Users can login/register, then create, edit, or join a group in which they automatically gets assigned a "gift-giving" partner and a set spending amount. The user will then send a gift to that user, and recieve a gift from that user. 



Instructions on using Gift Buddy:

1) Have everyone in your circle create an account.

2) Only once everyone in the group has signed up, have one person in your circle create a new group. It is important to add everyone to the group that is going to participate before submitting because you will not be able to add new members once the group has been created.

3) Go to your account settings and fill out your wishlist and home address if needed.

4) When you're ready to send your gift, go to your groups page and click the 'Send Gift' button on the nav bar. Send them a message letting them know that their gift is on the way!



To run this app locally:

1) Clone or download the git repository.

2) Install Node.js with NPM ( https://nodejs.org/en/download/ ).

3) Install MySQL ( https://www.mysql.com/downloads/ ). Read online how to set up a local connection.

4) Go to GiftBuddy/config/config.json and type in your MySQL database username and password in the "development" object. Do the same for connection.js.

5) On your MySQL editor ( http://www.mysql.com/products/workbench/ for Windows) and run the schema.sql file in GiftBuddy/db.

6) In your terminal run the command ( npm install ).

7) Now run the command (node server.js) and open your browser to localhost:/3002
