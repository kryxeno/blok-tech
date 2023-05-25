# Database Structure

My user objects have a large amount of data, including integers, objects, array's, strings, etc...

I just looked at what I needed for my datamodels and made them accordingly.

I have a users collection and a viewer collection. The users collection is for all the people the viewer will see. The viewer collection keeps track of what users it has seen, and updates everything accordingly.

![ja](./images/users.png)
