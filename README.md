# wish-list-app

  The web app is using NodeJS with Express framework and Typescript for server and VueJs for the client side. For the database I used MongoDB with a cluster in cloud that you can access via the connection string sent in the email. In that email, I've also included the credentials of an account on which you can test and explore the app, as well as all the environment variables necessary for running the app locally.
  For the mailer service that sends the activation and reset passwords links I've used Ethereal Email, a virtual mail service. The credential for the ethereal account are included in the environment variables.

Heroku link -> https://wish-list-tdg.herokuapp.com/

Below you have some screenshots of how I implemented the requirements.

# Mandatory requirements

* Ability to add, edit or delete a wish list.

<img width="1440" alt="Screenshot 2022-05-10 at 23 10 18" src="https://user-images.githubusercontent.com/61846679/167723406-d1710695-cea7-4c1b-98a2-3f363eb073ff.png">

You can edit or delete a wish list by clicking on view more button and the edit icon ner the wish list title.
<img width="1440" alt="Screenshot 2022-05-10 at 23 11 01" src="https://user-images.githubusercontent.com/61846679/167723527-4d6aacdd-0689-4ac7-bd7b-acf1704d57ac.png">


* Ability to add or delete products to/from a wish list.

<img width="1440" alt="Screenshot 2022-05-10 at 23 11 26" src="https://user-images.githubusercontent.com/61846679/167723585-1067abdd-ee0d-494b-95a6-b2f033ba94f7.png">
<img width="1440" alt="Screenshot 2022-05-10 at 23 11 53" src="https://user-images.githubusercontent.com/61846679/167723618-262943d6-021a-46e7-adb2-3192d0a018cf.png">


* Adding a product to a list should be done by providing an URL for a product from an online store and the application should extract the name, picture and description of the product from that web page (See Open Graphs). At least one online store should be supported (e.g. Emag, PC Garage, Amazon etc)
The scraper in the API extracts the open graph metadata, so the majority of websites that contains that data should work.

* Display all wish lists for a user.

<img width="1440" alt="Screenshot 2022-05-10 at 23 12 43" src="https://user-images.githubusercontent.com/61846679/167723667-fdbe438e-b513-4ed1-a56f-d542e61b3ba1.png">

* Display all the products with their name, picture and description from a certain list.

<img width="1440" alt="Screenshot 2022-05-10 at 23 10 47" src="https://user-images.githubusercontent.com/61846679/167723715-f59644ec-468d-4afa-a93e-7f32c16c3e03.png">

* Ability to mark a product as purchased. A marked product should be visually easily distinguishable from a non-marked one.

<img width="1440" alt="Screenshot 2022-05-10 at 23 39 06" src="https://user-images.githubusercontent.com/61846679/167723751-e21b3653-8f31-4f8d-9529-9f0c41137788.png">

# Optional requirements

* Support at least two online stores.
The stores on which I tested the app so far are: Emag, Ebay, Aliexpress, Alibaba, Walmart, Fashion Days, Footshop, Notino, Leroy Merlin.
* Most recent lists should be added at the top (descending order).
You can sort wish lists by date or title in ascending or descending order. Default is descending order.
* Newly added products should be added at the bottom (ascending order).
You can sort the products in a wishlist by date or name in ascending or descending order. Default is ascending order.
* Search by list name, product name and description.
On the home page there is a separate search bar for wish lists. On the navigation bar there is a search bar for product where you can search a product by name, description or the wishlist which contains it.
<img width="1440" alt="Screenshot 2022-05-10 at 23 38 40" src="https://user-images.githubusercontent.com/61846679/167724425-9b2d7d60-acce-4a47-8619-54f961101e8e.png">
* Ability to share a wish list with its own products.
Right next to a wishlist title there is an icon where you can export all the json data from that wishlist.

